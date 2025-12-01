import styled from "styled-components";
import { LayoutDashboard, Package, History } from 'lucide-react';

export default function NavBar() {

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

                <Options>
                    <LayoutDashboard />
                    <p>Dashboard</p>
                </Options>

                <Options>
                    <Package />
                    <p>Produtos</p>
                </Options>

                <Options>
                    <History />
                    <p>Histórico</p>
                </Options>

            </NavBar>
        </>
    );
}