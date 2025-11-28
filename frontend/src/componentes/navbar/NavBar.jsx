import styled from "styled-components";

export default function NavBar(){
    
    const NavBar = styled.nav`
        background-color: blue;
        width: clamp(400px, 95%, 1200px);
        margin: 0 auto;
    `;

    return(
        <>
            <NavBar>
                <h3>oi :)</h3>
            </NavBar>     
        </>
    );
}