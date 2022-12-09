import styled from 'styled-components'

export const Container = styled.body`
display: flex;
height: 88vh;
border: 1px solid black;
`

export const Filtros = styled.section`
display: flex;
justify-content: center;
width: 100vw;
`
export const Carrinho = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 20vw;
border: 1px solid black;
`
export const DisplayProdutos = styled.section`
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
height: auto;
width: 80vw;
border: 1px solid black;
`

export const CardProdutos = styled.section`
display: flex;
border: 1px solid black;
width: auto;
height: auto;
padding: 10px;
margin: 10px;
border-radius: 5px;
box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);

    img{
        height: 180px;
        width: 180px;
        border-radius: 5px;
    }
`