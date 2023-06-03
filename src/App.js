import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/index";
import sidebarnavs from "./components/layout/LeftDrawer";
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customers/Customers";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/customers" element={<Customers/>} />
      </Routes>
    </Layout>
  );
}

export default App;
