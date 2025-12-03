import { useState } from "react";
import styled from "styled-components";
import { Package, Mail, Lock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const LogoBox = styled.div`
  display: grid;
  place-items: center;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 0.5rem;
  background-color: #4171c9;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.5rem;
    color: #212529;
    margin-bottom: 0.3rem;
  }

  p {
    color: #6c757d;
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #495057;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 1rem;
    color: #6c757d;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 3rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4171c9;
    box-shadow: 0 0 0 3px rgba(65, 113, 201, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background-color: #f8d7da;
  border: 1px solid #f5c2c7;
  border-radius: 0.5rem;
  color: #842029;
  font-size: 0.85rem;
`;

const Button = styled.button`
  padding: 0.9rem;
  background-color: #4171c9;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background-color: #365ba8;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
  color: #6c757d;
  font-size: 0.85rem;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      // Criar FormData para OAuth2
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", senha);

      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Email ou senha incorretos");
      }

      const data = await response.json();
      
      // Salvar token no localStorage
      localStorage.setItem("token", data.access_token);
      
      // Buscar dados do usuário
      const userResponse = await fetch("http://localhost:8000/usuarios/me", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      const userData = await userResponse.json();
      localStorage.setItem("usuario", JSON.stringify(userData));

      // Redirecionar para a página principal
      navigate("/home");
    } catch (error) {
      setErro(error.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <LogoBox>
            <Package color="white" size={30} />
          </LogoBox>
          <div>
            <h2 style={{ margin: 0, color: "#212529" }}>EstoqueFácil</h2>
          </div>
        </LogoContainer>

        <Title>
          <h1>Bem-vindo de volta!</h1>
          <p>Faça login para acessar o sistema</p>
        </Title>

        <Form onSubmit={handleSubmit}>
          {erro && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {erro}
            </ErrorMessage>
          )}

          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <InputWrapper>
              <Mail size={18} />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="senha">Senha</Label>
            <InputWrapper>
              <Lock size={18} />
              <Input
                id="senha"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                autoComplete="current-password"
              />
            </InputWrapper>
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Form>

        <Footer>
          <p>
            <strong>Usuário de teste:</strong> lin@senai.com
            <br />
            <strong>Senha:</strong> 123
          </p>
        </Footer>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;