import styled from "styled-components";
import { Package, DollarSign, CircleArrowUp, CircleArrowDown } from 'lucide-react'
import { lighten } from "polished"; //Biblioteca para manipular cor

const corPrincipal = "#3A7FFFF8";

const Content = styled.div`
    display: flex;

    margin-top: 2rem;
    justify-content: space-between;
`;

const Card = styled.div`
    display: flex;
    height: 5.9rem;
    width: 18rem;
    border-radius: 0.5rem;
    background-color: #ffffff;
    padding: 0.8rem;
    box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
    place-items: center;    
    justify-content: space-around;

`;

const Info = styled.div`
    display: grid;
    text-align: start;
    height: 3.5rem;
    align-items: center;
`;

const FundoLogo = styled.div`
    display: grid;  
    place-items: center;
    height: clamp(2rem, 3vw, 3.5rem); /*Aqui o clamp(min, preferido, max) garante que a logo nunca fique menor que 2rem nem maior que 4rem, mas cresce proporcionalmente à largura da tela.*/
    width: clamp(2rem, 3vw, 3.5rem);
    border-radius: 1rem;
    background-color: ${({ color }) => lighten(0.75, color)}; 
    /* lighten(0.4, color) deixa o fundo 40% mais claro */
`;

export function CardGeral() {
    return (
        <Content>
            <Card>
                <Info>
                    <p>Total de Produtos</p>
                    <p>6</p>
                </Info>
                 <FundoLogo color="#0C2655FF">
                    <Package color="#0C2655FF"/>
                </FundoLogo>
            </Card>

            <Card>
                <Info>
                    <p>Itens em Estoque</p>
                    <p>7</p>
                </Info>
                <FundoLogo color="#4D0650FF">
                    <DollarSign color="#4D0650FF"/>
                </FundoLogo>
            </Card>

            <Card>
                <Info>
                    <p>Entradas (7 dias)</p>
                    <p>47</p>
                </Info>
                <FundoLogo color="#014201FF">
                    <CircleArrowUp color="#014201FF"/>
                </FundoLogo>
            </Card>

            <Card>
                <Info>
                    <p>Saídas (7 dias)</p>
                    <p>2</p>
                </Info>
                <FundoLogo color="#5A1B02FF">
                    <CircleArrowDown color="#5A1B02FF"/>
                </FundoLogo>
            </Card>

        </Content>

    );
}