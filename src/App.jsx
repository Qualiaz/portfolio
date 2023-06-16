import "./App.css";
import Nav from "./components/Nav";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";

function App() {
  return (
    <>
      <Nav />
      <div className="app flex justify-center flex-col max-w-6xl gap-10 my-24 sm:w-full">
        <Profile />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
