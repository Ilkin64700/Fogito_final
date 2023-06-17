import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/index";
import sidebarnavs from "./components/layout/LeftDrawer";
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customers/Customers";
import Products from "./pages/products/Products";
import Statistics from "./pages/statistics/Statistics";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/customers" element={<Customers/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/statistics" element={<Statistics/>} />
      </Routes>
    </Layout>
  );
}

export default App;
