import './App.scss';
import Header from './component/Header'
import Footer from './component/Footer'
import Main from './component/Main'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="content-wrap">
          <Header />

          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
