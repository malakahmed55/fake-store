import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}