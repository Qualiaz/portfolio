import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Playground from "./pages/Playground";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="app flex justify-center flex-col max-w-6xl gap-10 my-24 sm:w-full">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
