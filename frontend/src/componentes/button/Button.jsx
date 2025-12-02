import styled from "styled-components";
import { Package } from 'lucide-react'

export function Button({ text, color }){
    const Botao = styled.button`
        display: flex;
        border: none;
        background-color: ${({ color }) => color};
        color: white;
        border-radius: 0.8rem;
        padding: 1rem;
        gap: 1rem;
        place-items: center;
        margin-top: 2rem;
        cursor: pointer;
    `;
    
    return(
        <Botao color={color}>
            <Package/>
            <p>{text}</p>
        </Botao>
    );
}