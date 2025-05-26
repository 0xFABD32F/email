import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth"; // 👈 attention ici c'est services/auth.js pas services/api.js
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    phone: "",
    role: "Client",
    droit_acces: "Client",
    mot_de_passe: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mot_de_passe !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    if (!formData.agreeTerms) {
      alert("Veuillez accepter les conditions d'utilisation.");
      return;
    }

    try {
      await register(formData);
      alert("Compte créé avec succès !");
      navigate("/login");
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      alert(error.response?.data?.detail || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">OddnetCRM</Link>
            <h1>Créer un compte</h1>
            <p>Inscrivez-vous pour commencer à utiliser notre solution de gestion commerciale</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nom">Nom complet</label>
              <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email professionnel</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="votre@entreprise.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="0600000000" required />
            </div>

            <div className="form-group">
              <label htmlFor="role">Rôle</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange}>
                <option value="Client">CEO</option>
                <option value="Expert">CTO</option>
                <option value="Admin">Expert</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="droit_acces">Droit d'accès</label>
              <select id="droit_acces" name="droit_acces" value={formData.droit_acces} onChange={handleChange}>
                <option value="Client">Client</option>
                <option value="Expert">Expert</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mot_de_passe">Mot de passe</label>
              <input type="password" id="mot_de_passe" name="mot_de_passe" value={formData.mot_de_passe} onChange={handleChange} placeholder="••••••••" required minLength="8" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
            </div>

            <div className="form-check">
              <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
              <label htmlFor="agreeTerms">
                J'accepte les{" "}
                <Link to="/terms" className="auth-link">conditions d'utilisation</Link> et{" "}
                <Link to="/privacy" className="auth-link">la politique de confidentialité</Link>.
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Créer un compte</button>
          </form>

          <div className="auth-footer">
            <p>Vous avez déjà un compte ? <Link to="/login" className="auth-link">Se connecter</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;