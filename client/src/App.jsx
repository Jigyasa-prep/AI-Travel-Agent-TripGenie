import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}

export default App;