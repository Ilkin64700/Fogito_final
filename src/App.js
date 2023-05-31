import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
  );
}

export default App;
