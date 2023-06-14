import "./App.css";
import Nav from "./components/Nav";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";

function App() {
  return (
    <>
      <Nav />
      <div className="app flex flex-col gap-10">
        <Profile />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
