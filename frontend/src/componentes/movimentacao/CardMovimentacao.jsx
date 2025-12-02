import { TrendingUp, TrendingDown } from 'lucide-react'
import styled from "styled-components";
import { lighten } from "polished";

export function CardMovimentacao() {

    const Container = styled.section`
        display: grid;
        box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
        margin-top: 3rem;
        padding: 2rem;
        border-radius: 1rem;
        gap: 1rem;
    `;

    const Title = styled.div`
        display: flex;
        padding: 0 0 2rem 2.2rem;
    `;

    const Line = styled.div`
        display: flex;
        border: 0.2px solid #E6E6E6FF;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: 1rem;

        .monitoramento{
            display: flex;
            gap: 0.9rem;
            align-items: center;
        }

        .info-produtos{
            display: grid;
        }

        .info-cliente{
            display: grid;
        }

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

    return (
        <Container>
            <p>Últimas Movimentações</p>
            <Line>
                <div className="monitoramento">
                    <FundoLogo color='#003A0DFF'>
                        <TrendingUp color='#003A0DFF' />
                    </FundoLogo>
                    <div className="info-produtos">
                        <p>iPhone 15 Pro</p>
                        <p>Entrada de 10 unidade(s)</p>
                    </div>
                </div>
                <div className="info-cliente">
                    <p>João Silva</p>
                    <p>20/11/2024</p>
                </div>
            </Line>

            <Line>
            <div className="monitoramento">
                <FundoLogo color='#5A1B02FF'>
                    <TrendingDown color='#5A1B02FF' />
                </FundoLogo>
                <div className="info-produtos">
                    <p>iPhone 15 Pro</p>
                    <p>Entrada de 10 unidade(s)</p>
                </div>
            </div>
            <div className="info-cliente">
                <p>João Silva</p>
                <p>20/11/2024</p>
            </div>
            </Line>

        </Container>
    );
}