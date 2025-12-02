import styled from "styled-components";

export function Select({ descricao }){

  const SelectContainer = styled.select`
    display: flex;
    padding: 0.7rem;
    width: 100%;
    border: solid 0.1rem #727272ff;
    border-radius: 1rem;
    gap: 1rem;
    align-items: center;
    color: black;
  `;

  return(
    <>
    <SelectContainer>
      <option value="">{descricao}</option>
      <option value="1">Opção 1</option>
      <option value="2">Opção 1</option>
      <option value="3">Opção 1</option>
    </SelectContainer>
    
    </>
  );
}