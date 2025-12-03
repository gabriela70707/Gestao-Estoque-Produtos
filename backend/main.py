from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, Text, Enum, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional, List
import enum

# Configurações
SECRET_KEY = "senha" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Database
DATABASE_URL = "mysql+pymysql://root:senai@localhost/saep_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# FastAPI app
app = FastAPI(title="SAEP - Sistema de Gestão de Equipamentos")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ MODELS (SQLAlchemy) ============

class TipoMovimentacao(str, enum.Enum):
    entrada = "entrada"
    saida = "saida"

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    senha = Column(String(255), nullable=False)
    data_criacao = Column(DateTime, default=datetime.utcnow)
    ativo = Column(Boolean, default=True)
    movimentacoes = relationship("Movimentacao", back_populates="usuario")

class Categoria(Base):
    __tablename__ = "categorias"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(50), unique=True, nullable=False)
    descricao = Column(Text)
    data_criacao = Column(DateTime, default=datetime.utcnow)
    produtos = relationship("Produto", back_populates="categoria")

class Produto(Base):
    __tablename__ = "produtos"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    descricao = Column(Text)
    categoria_id = Column(Integer, ForeignKey("categorias.id"), nullable=False)
    estoque_atual = Column(Integer, default=0)
    estoque_minimo = Column(Integer, default=0)
    tela = Column(String(50))
    armazenamento = Column(String(50))
    ram = Column(String(50))
    tensao = Column(String(50))
    data_criacao = Column(DateTime, default=datetime.utcnow)
    data_atualizacao = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    categoria = relationship("Categoria", back_populates="produtos")
    movimentacoes = relationship("Movimentacao", back_populates="produto")

class Movimentacao(Base):
    __tablename__ = "movimentacoes"
    id = Column(Integer, primary_key=True, index=True)
    produto_id = Column(Integer, ForeignKey("produtos.id"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    tipo = Column(Enum(TipoMovimentacao), nullable=False)
    quantidade = Column(Integer, nullable=False)
    observacoes = Column(Text)
    data_movimentacao = Column(DateTime, nullable=False)
    data_registro = Column(DateTime, default=datetime.utcnow)
    produto = relationship("Produto", back_populates="movimentacoes")
    usuario = relationship("Usuario", back_populates="movimentacoes")

# ============ SCHEMAS (Pydantic) ============

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UsuarioBase(BaseModel):
    nome: str
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    senha: str

class UsuarioResponse(UsuarioBase):
    id: int
    ativo: bool
    data_criacao: datetime
    
    class Config:
        from_attributes = True

class CategoriaResponse(BaseModel):
    id: int
    nome: str
    descricao: Optional[str]
    
    class Config:
        from_attributes = True

class ProdutoBase(BaseModel):
    nome: str
    descricao: Optional[str]
    categoria_id: int
    estoque_atual: int = 0
    estoque_minimo: int = 0
    tela: Optional[str] = None
    armazenamento: Optional[str] = None
    ram: Optional[str] = None
    tensao: Optional[str] = None

class ProdutoCreate(ProdutoBase):
    pass

class ProdutoUpdate(BaseModel):
    nome: Optional[str] = None
    descricao: Optional[str] = None
    categoria_id: Optional[int] = None
    estoque_minimo: Optional[int] = None
    tela: Optional[str] = None
    armazenamento: Optional[str] = None
    ram: Optional[str] = None
    tensao: Optional[str] = None

class ProdutoResponse(ProdutoBase):
    id: int
    categoria: CategoriaResponse
    data_criacao: datetime
    
    class Config:
        from_attributes = True

class MovimentacaoCreate(BaseModel):
    produto_id: int
    tipo: TipoMovimentacao
    quantidade: int
    observacoes: Optional[str] = None
    data_movimentacao: datetime

class MovimentacaoResponse(BaseModel):
    id: int
    produto_id: int
    usuario_id: int
    tipo: TipoMovimentacao
    quantidade: int
    observacoes: Optional[str]
    data_movimentacao: datetime
    produto: dict
    usuario: dict
    
    class Config:
        from_attributes = True

# ============ DEPENDENCIES ============

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = db.query(Usuario).filter(Usuario.email == token_data.email).first()
    if user is None:
        raise credentials_exception
    return user

# ============ ENDPOINTS ============

@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.senha):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/usuarios", response_model=UsuarioResponse)
def criar_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    # Gerar hash da senha
    hashed_password = get_password_hash(usuario.senha)

    # Criar objeto Usuario com senha já criptografada
    db_usuario = Usuario(
        nome=usuario.nome,
        email=usuario.email,
        senha=hashed_password
    )
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario




@app.get("/usuarios/me", response_model=UsuarioResponse)
async def read_users_me(current_user: Usuario = Depends(get_current_user)):
    return current_user

@app.get("/categorias", response_model=List[CategoriaResponse])
def listar_categorias(db: Session = Depends(get_db)):
    return db.query(Categoria).all()

@app.get("/produtos", response_model=List[ProdutoResponse])
def listar_produtos(
    skip: int = 0,
    limit: int = 100,
    busca: Optional[str] = None,
    categoria_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    query = db.query(Produto)
    if busca:
        query = query.filter(Produto.nome.contains(busca))
    if categoria_id:
        query = query.filter(Produto.categoria_id == categoria_id)
    return query.offset(skip).limit(limit).all()

@app.post("/produtos", response_model=ProdutoResponse, status_code=status.HTTP_201_CREATED)
def criar_produto(
    produto: ProdutoCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    db_produto = Produto(**produto.dict())
    db.add(db_produto)
    db.commit()
    db.refresh(db_produto)
    return db_produto

@app.put("/produtos/{produto_id}", response_model=ProdutoResponse)
def atualizar_produto(
    produto_id: int,
    produto: ProdutoUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    db_produto = db.query(Produto).filter(Produto.id == produto_id).first()
    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    for key, value in produto.dict(exclude_unset=True).items():
        setattr(db_produto, key, value)
    
    db.commit()
    db.refresh(db_produto)
    return db_produto

@app.delete("/produtos/{produto_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_produto(
    produto_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    db_produto = db.query(Produto).filter(Produto.id == produto_id).first()
    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    db.delete(db_produto)
    db.commit()
    return None

@app.post("/movimentacoes", response_model=MovimentacaoResponse, status_code=status.HTTP_201_CREATED)
def criar_movimentacao(
    movimentacao: MovimentacaoCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    # Buscar produto
    produto = db.query(Produto).filter(Produto.id == movimentacao.produto_id).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    # Atualizar estoque
    if movimentacao.tipo == TipoMovimentacao.entrada:
        produto.estoque_atual += movimentacao.quantidade
    else:  # saida
        if produto.estoque_atual < movimentacao.quantidade:
            raise HTTPException(status_code=400, detail="Estoque insuficiente")
        produto.estoque_atual -= movimentacao.quantidade
    
    # Criar movimentação
    db_movimentacao = Movimentacao(
        **movimentacao.dict(),
        usuario_id=current_user.id
    )
    db.add(db_movimentacao)
    db.commit()
    db.refresh(db_movimentacao)
    
    return db_movimentacao

@app.get("/movimentacoes", response_model=List[MovimentacaoResponse])
def listar_movimentacoes(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    return db.query(Movimentacao).order_by(Movimentacao.data_movimentacao.desc()).offset(skip).limit(limit).all()

@app.get("/produtos-estoque-baixo", response_model=List[ProdutoResponse])
def produtos_estoque_baixo(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    return db.query(Produto).filter(Produto.estoque_atual <= Produto.estoque_minimo).all()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)