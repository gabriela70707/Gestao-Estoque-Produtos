import styled from "styled-components";

export function Card({ text, numero, color }){
  
  const Container = styled.div`
    box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
    border-radius: 0.5rem;
    color: ${({ color }) => color};
    padding: 1rem;
    width: 100%;
  `;

  return(
    <Container color={color}>
      <p>{text}</p>
      <p>{numero}</p>

    </Container>
  );
}