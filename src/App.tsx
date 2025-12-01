import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrintResume from "./pages/PrintResume";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/print" element={<PrintResume />} />
    </Routes>
  );
}
