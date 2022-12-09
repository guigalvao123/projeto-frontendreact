import GlobalStyle from "./GlobalStyle";
import { Body } from "./components/Body/Body";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { useState } from "react";


function App() {

  const [nome, setNome] = useState("")
  const [id, setId] = useState("")
  const [ordem, setOrdem] = useState("")
  const [pesquisa] = useState("")
  const [valorMinimo] = useState("")
  const [valorMaximo] = useState("")
  const [cesta, setCesta] = useState([])

  const handleSearchNome = (event) => {
    setNome(event.target.value)
  }

  const handleSearchId = (event) => {
    setId(event.target.value)
  }

  const onChangeOrdem = (event) => {
    setOrdem(event.target.value)
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Body
        nome={nome}
        setNome={setNome}
        handleSearchNome={handleSearchNome}
        id={id}
        setId={setId}
        handleSearchId={handleSearchId}
        ordem={ordem}
        setOrdem={setOrdem}
        onChangeOrdem={onChangeOrdem}
        pesquisa={pesquisa}
        valorMinimo={valorMinimo}
        valorMaximo={valorMaximo}
        cesta={cesta}
        setCesta={setCesta}
      />
      <Footer />
    </>
  )
};

export default App;