import React from "react";
import styled from 'styled-components'
import { Package } from 'lucide-react';

const corPrincipal = "#4171c9";

const HeaderContainer  = styled.header`
    display: flex;
    background-color: #ffffff;
    color: black;
    width: clamp(400px, 95%, 1200px);
    margin: 0 auto;
`;

const Logo = styled.div`
    display: grid;  
    place-items: center;
    height: clamp(3rem, 5vw, 4rem); /*Aqui o clamp(min, preferido, max) garante que a logo nunca fique menor que 2rem nem maior que 4rem, mas cresce proporcionalmente à largura da tela.*/
    width: clamp(3rem, 5vw, 4rem);
    border-radius: 0.2rem;
    background-color: ${corPrincipal};
`;

const Textos = styled.div`
    display: grid;
    padding-left: 1%;
    font-family: "Kedebideri", sans-serif;
    font-size: clamp(7px, 13px, 15px);
`;

export default function Header(){
    return(
        <HeaderContainer >
            <Logo>
                <Package color="white" size="50%"/>
            </Logo>
            <Textos>
                <h1>Sistema de Gestão de Equipamentos</h1>
                <h3>Equipamentos Eletrônicos</h3>
            </Textos>
            
        </HeaderContainer >
    )
}