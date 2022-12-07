import GlobalStyle from "./GlobalStyle";
import { Body } from "./components/Body/Body";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";


function App() {
  return (
    <>
    <GlobalStyle />
    <Header/>
    <Body/>
    <Footer/>
    </>
  )
};

export default App;