import React, { useEffect } from "react";
import { Carrinho, Container, Filtros, DisplayProdutos, CardProdutos } from "./styles";
import trajes from "../../Trajes/trajes.json"

export const Body = (props) => {

    const compraProduto = (produtos) => {
        const novaCesta = [...props.cesta]
        const produtoAdicionado = produtos
        const produtoExistente = novaCesta.find((produtos) => {
            return produtos.id === produtoAdicionado.id
        })
        if (produtoExistente) {
            produtoExistente.quantidade++
            produtoExistente.precototal = produtoExistente.quantidade * produtoExistente.price
        } else {
            novaCesta.push({ ...produtoAdicionado, quantidade: 1, precototal: produtoAdicionado.price })
        }
        props.setCesta(novaCesta)
    }

    let totalCesta = 0

    const somaCesta = () => {
        for (let i = 0; i < props.cesta.length; i++) {
            totalCesta += props.cesta[i].precototal
        }
        return
    }
    somaCesta()

    const removeItem = (trajes) => {
        const buscaItem = props.cesta.filter((item) => item !== trajes)
        props.setCesta(buscaItem)
    }

    const onChangeCarrinho = (event) => {
        props.setCesta(event.target.value)
    }

    useEffect(() => {
        if (props.cesta.length > 0) {
            const listaStringCesta = JSON.stringify(props.cesta)
            localStorage.setItem("Carrinho", listaStringCesta)
        }
    }, [props.cesta])

    useEffect(() => {
        const novaCesta = JSON.parse(localStorage.getItem("Carrinho"))
        if (novaCesta !== null) {
            props.setCesta(novaCesta)
        }
    }, [])

    return (
        <>
            <Filtros
            >
                <input type="number" placeholder="Pesquisar Por Id" value={props.id} onChange={props.handleSearchId} />
                <input placeholder="Pesquisar Por Nome" value={props.nome} onChange={props.handleSearchNome} />
                <select value={props.ordem} onChange={props.onChangeOrdem} className="ordenar-price">
                    <option value="">Ordenar</option>
                    <option value="Barato">Mais Barato</option>
                    <option value="Caro">Mais Caro</option>
                </select>
            </Filtros>
            <Container>
                <DisplayProdutos>
                    {trajes
                        .filter((trajes) => trajes.name.includes(props.pesquisa))
                        .filter((trajes) => trajes.price >= props.valorMinimo)
                        .filter((trajes) => {
                            return props.valorMaximo ? trajes.price <= props.valorMaximo : trajes
                        })
                        .sort((a, b) => {
                            switch (props.ordem) {
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
                            return trajes.id.includes(props.id)
                        })
                        .filter((trajes) => {
                            return trajes.name.toLocaleLowerCase().includes(props.nome.toLocaleLowerCase())
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
                                            <button onClick={() => compraProduto(trajes)} onChange={onChangeCarrinho}>Adicionar ao Carrinho</button>
                                        </div>
                                    </div>
                                </CardProdutos>)
                        })
                    }
                </DisplayProdutos>
                <Carrinho>
                    <h2>Carrinho:</h2>
                    {props.cesta
                        .map((trajes, index) => {
                            return (
                                <div key={index}>
                                    <p><span>X{trajes.quantidade} </span><span>{trajes.name} </span><span><b>R$ {trajes.precototal.toFixed(2)}</b></span><button onClick={() => removeItem(trajes)}>Remover</button></p>
                                </div>
                            )
                        })}
                    <p><b>Valor total: R$ {totalCesta.toFixed(2)}</b></p>
                    <p><b>Tipos de Trajes:{props.cesta.length}</b></p>
                </Carrinho>
            </Container>
        </>
    )
}