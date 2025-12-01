import { TriangleAlert  } from 'lucide-react'
import styled from 'styled-components';

export function Alerta(){
    const Content = styled.div.attrs({
        role: "alert",
        "aria-live": "assertive"
    })`
        display: grid;
        background-color: #EB76762D;

        margin-top: 3rem;
        padding: 1.2rem;
        gap: 1rem;
        border-left: 5px solid red;
        border-radius: 0.5rem;
    `;

    const Title = styled.div`
        display: flex;
        gap: 0.9rem;
        align-items: center;
    `;

    const Alertas = styled.div`
        diplay: grid;
    `;
    

    return(
        <Content>
            <Title>
                <TriangleAlert color='red'/>
                <p>Alerta de Estoque Baixo</p>
            </Title>

            <Alertas>
                <p>• Galaxy S24 Ultra - Estoque atual: 8 (mínimo: 10)</p>
                <p>• Dell XPS 15 - Estoque atual: 3 (mínimo: 5)</p>
                <p>• LG OLED 77" - Estoque atual: 4 (mínimo: 6)</p>
            </Alertas>
        </Content>
    );
}