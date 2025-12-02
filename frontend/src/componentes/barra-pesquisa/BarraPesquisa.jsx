import styled from "styled-components";
import { Search } from 'lucide-react';

export function BarraPesquisa(){

  const BarraPesquisa = styled.div`
    display: flex;
    padding: 0.7rem;
    width: 100%;
    border: solid 0.1rem #727272ff;
    border-radius: 1rem;
    gap: 1rem;
    align-items: center;
  `;



  return(
    <BarraPesquisa>
      <Search color="#727272ff"/>
      <p>Buscar produtos...</p>
    </BarraPesquisa>
  );
}