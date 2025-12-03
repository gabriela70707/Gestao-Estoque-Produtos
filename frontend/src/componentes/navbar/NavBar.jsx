import styled from "styled-components";
import { LayoutDashboard, Package, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

    const navigate = useNavigate();

    const NavBar = styled.nav`
        display: flex;
        background-color: #ffffff;

        padding: 3rem 0 0 0;
        gap: 3rem;
    `;

    const Options = styled.button`
        border: none;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    `;

    return (
        <>
            <NavBar>

                <Options onClick={() => navigate(`/home`)}>
                    <LayoutDashboard />
                    <p>Dashboard</p>
                </Options>

                <Options onClick={() => navigate(`/produtos`)}>
                    <Package />
                    <p>Produtos</p>
                </Options>

                <Options onClick={() => navigate(`/historico`)}>
                    <History />
                    <p>Histórico</p>
                </Options>

            </NavBar>
        </>
    );
}