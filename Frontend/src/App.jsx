import Navbar from "./features/components/Navbar";
import AppRouter from "./features/router/AppRouter";

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
