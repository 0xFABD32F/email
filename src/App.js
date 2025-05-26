import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import "./components/outlook/outlook-style.css";

// Layouts
import DashboardLayout from "./components/layouts/DashboardLayout";

// Pages
import HomePage from "./pages/home/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/users/UsersList";
import UsersForm from "./pages/users/UsersForm";
import LeadsList from "./pages/leads/LeadsList";
import LeadsForm from "./pages/leads/LeadsForm";
import HardwareList from "./pages/hardware/HardwareList";
import HardwareForm from "./pages/hardware/HardwareForm";
import ClientsList from "./pages/clients/ClientsList";
import ClientsForm from "./pages/clients/ClientsForm";
import SuppliersList from "./pages/suppliers/SuppliersList";
import SuppliersForm from "./pages/suppliers/SuppliersForm";
import OpportunitiesList from "./pages/opportunities/OpportunitiesList";
import OpportunitiesForm from "./pages/opportunities/OpportunitiesForm";
import QuotesList from "./pages/quotes/QuotesList";
import QuotesForm from "./pages/quotes/QuotesForm";
import SuppliesList from "./pages/supplies/SuppliesList";
import SuppliesForm from "./pages/supplies/SuppliesForm";
import Communication from "./pages/Communication";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Page Home publique */}
        <Route path="/" element={<HomePage />} />
        
        {/* Dashboard et ses sous-pages protégés */}
        <Route path="/dashboard" element={
          
            <DashboardLayout />
          
        }>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/new" element={<UsersForm />} />
          <Route path="users/edit/:id" element={<UsersForm />} />
          <Route path="leads" element={<LeadsList />} />
          <Route path="leads/new" element={<LeadsForm />} />
          <Route path="leads/edit/:id" element={<LeadsForm />} />
          <Route path="hardware" element={<HardwareList />} />
          <Route path="hardware/new" element={<HardwareForm />} />
          <Route path="hardware/edit/:id" element={<HardwareForm />} />
          <Route path="clients" element={<ClientsList />} />
          <Route path="clients/new" element={<ClientsForm />} />
          <Route path="clients/edit/:id" element={<ClientsForm />} />
          <Route path="suppliers" element={<SuppliersList />} />
          <Route path="suppliers/new" element={<SuppliersForm />} />
          <Route path="suppliers/edit/:id" element={<SuppliersForm />} />
          <Route path="opportunities" element={<OpportunitiesList />} />
          <Route path="opportunities/new" element={<OpportunitiesForm />} />
          <Route path="opportunities/edit/:id" element={<OpportunitiesForm />} />
          <Route path="quotes" element={<QuotesList />} />
          <Route path="quotes/new" element={<QuotesForm />} />
          <Route path="quotes/edit/:id" element={<QuotesForm />} />
          <Route path="supplies" element={<SuppliesList />} />
          <Route path="supplies/new" element={<SuppliesForm />} />
          <Route path="supplies/edit/:id" element={<SuppliesForm />} />
          <Route path="communication" element={<Communication />} />
        </Route>

        {/* Pages publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;