import React, { useState } from "react";
import { Carrinho, Container, Filtros, DisplayProdutos, CardProdutos } from "./styles";
import trajes from "../../Trajes/trajes.json"

export const Body = () => {

    const [pesquisa, setPesquisa] = useState("")
    const [valorMinimo, setValorMinimo] = useState("")
    const [valorMaximo, setValorMaximo] = useState("")
    const [ordem, setOrdem] = useState("")
    const [cesta, setCesta] = useState([])
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")

    const onChangeOrdem = (event) => {
        setOrdem(event.target.value)
    }

    const onChangeCarrinho = (event) => {
        setCesta(event.target.value)
    }

    const compraProduto = (produtos) => {
        const novoCarrinho = [...cesta]
        const produtoAdicionado = produtos
        const produtoExistente = novoCarrinho.find((produtos) => {
            return produtos.id === produtoAdicionado.id
        })
        if (produtoExistente) {
            produtoExistente.quantidade++
            produtoExistente.precototal = produtoExistente.quantidade * produtoExistente.price
        } else {
            novoCarrinho.push({ ...produtoAdicionado, quantidade: 1, precototal: produtoAdicionado.price })
        }
        setCesta(novoCarrinho)
    }

    let totalCarrinho = 0

    const somaCarrinho = () => {
        for (let i = 0; i < cesta.length; i++) {
            totalCarrinho += cesta[i].precototal
        }
        return
    }

    const removeItem = (trajes) => {
        const buscaItem = cesta.filter((item) => item !== trajes)
        setCesta(buscaItem)
    }

    somaCarrinho()

    const handleSearchId = (event) => {
        setId(event.target.value)
    }

    const handleSearchNome = (event) => {
        setNome(event.target.value)
    }

    return (
        <>
            <Filtros
            >
                <input type="number" placeholder="Pesquisar Por Id" value={id} onChange={handleSearchId} />
                <input placeholder="Pesquisar Por Nome" value={nome} onChange={handleSearchNome} />
                <select value={ordem} onChange={onChangeOrdem} className="ordenar-price">
                    <option value="">Ordenar</option>
                    <option value="Barato">Mais Barato</option>
                    <option value="Caro">Mais Caro</option>
                </select>
            </Filtros>
            <Container>
                <DisplayProdutos>
                    {trajes
                        .filter((trajes) => trajes.name.includes(pesquisa))
                        .filter((trajes) => trajes.price >= valorMinimo)
                        .filter((trajes) => {
                            return valorMaximo ? trajes.price <= valorMaximo : trajes
                        })
                        .sort((a, b) => {
                            switch (ordem) {
                                case "Barato":
                                    if (a.preco < b.preco) {
                                        return -1
                                    } else {
                                        return 1
                                    }
                                case "Caro":
                                    if (a.preco < b.preco) {
                                        return 1
                                    } else {
                                        return -1
                                    }
                            }
                        })
                        .filter((trajes) => {
                            return trajes.id.includes(id)
                        })
                        .filter((trajes) => {
                            return trajes.name.toLocaleLowerCase().includes(nome.toLocaleLowerCase())
                        })
                        .map((trajes, index) => {
                            return (
                                <CardProdutos key={index}>
                                    <div>
                                        <img src={trajes.imageUrl} alt="Imagem de capa do card" />
                                        <div>
                                            <h6>Id {trajes.id}</h6>
                                            <h5>{trajes.name}</h5>
                                            <h5>R$ {trajes.price},00</h5>
                                            <button onClick={() => compraProduto(trajes)} onChange={onChangeCarrinho}>Comprar</button>
                                        </div>
                                    </div>
                                </CardProdutos>)
                        })
                    }
                </DisplayProdutos>
                <Carrinho>
                    <h2>Carrinho:</h2>
                    {cesta
                        .map((trajes, index) => {
                            return (
                                <div key={index}>
                                    <p><span>X{trajes.quantidade} </span><span>{trajes.name} </span><span><b>R$ {trajes.precototal.toFixed(2)}</b></span><button onClick={() => removeItem(trajes)}>Remover</button></p>
                                </div>
                            )
                        })}
                    <p><b>Valor total: R$ {totalCarrinho.toFixed(2)}</b></p>
                </Carrinho>
            </Container>
        </>
    )
}