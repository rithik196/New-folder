import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {primarytTheme} from "../src/theme";
import Layout from "../src/layout";
import LoginModal from "../src/LoginModal";
import Dashboard from "./pages/Dashboard";
import BeneficiaryList from "./pages/BeneficiaryList";
import Reports from "./pages/Reports";
import History from "./pages/History";
import Drafts from "./pages/Drafts";
import PageLayout from './components/TradeAdvImpPage/PageLayout'

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/" />;
};


function App() {
  return (
    <ThemeProvider theme={primarytTheme}>
      <Router>
        <Routes>
          {/* Default route opens the Login Page */}
          <Route path="/" element={<LoginModal />} />
          {/* Protect dashboard & other routes */}
          <Route path="/dashboard" element={<PrivateRoute element={<Layout />} />}>
            <Route index element={<Dashboard />} />
            
            <Route path="trade-advance-imports" element={<PageLayout />} /> {/* NEW PAGE */}
            <Route path="beneficiary-list" element={<BeneficiaryList />} />
            <Route path="reports" element={<Reports />} />
            <Route path="history" element={<History />} />
            <Route path="drafts" element={<Drafts />} />
          
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
