import styled from "styled-components";

export function NavCategoriaEstoque() {

    const Container = styled.section`
        display: grid;
        box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
        margin-top: 2rem;
        padding: 2rem;
        border-radius: 1rem;

        .cards{
            display: flex;
            justify-content: space-around;
        }
    `;

    const Card = styled.div`
        display: grid;
        height: 5.9rem;
        width: 20rem;
        border-radius: 0.5rem;
        background-color: #ffffff;
        padding: 0.8rem;
        border: 0.2px solid #E6E6E6FF;
        place-items: start;    
        
    `;

    const Title = styled.div`
        display: flex;
        padding: 0 0 2rem 2.2rem;
    `;

    return (
        <Container>
            <Title>
                <p>Estoque por Categoria</p>
            </Title>
            <div className="cards">

                <Card>
                    <p>Smartphones</p>
                    <p>23 unidades</p>
                    <p>2 produto(s)</p>
                </Card>

                <Card>
                    <p>Smartphones</p>
                    <p>23 unidades</p>
                    <p>2 produto(s)</p>
                </Card>

                <Card>
                    <p>Smartphones</p>
                    <p>23 unidades</p>
                    <p>2 produto(s)</p>
                </Card>

            </div>


        </Container>
    );
}