"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../../services/api"
import "./UserStyles.css"

function UsersForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id
  const [loading, setLoading] = useState(isEditing)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    nom: "",
    role: "",
    email: "",
    phone: "",
    droit_acces: "",
    password: "",
  })

  // Charger les données de l'utilisateur en mode édition
  useEffect(() => {
    if (isEditing) fetchUser()
  }, [id])

  // Récupérer les données de l'utilisateur
  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await API.get(`/auth/users/${id}`)
      setFormData({ ...response.data, password: "" })
    } catch (err) {
      setError("Impossible de charger les données de l'utilisateur")
    } finally {
      setLoading(false)
    }
  }

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      // Adapter les données pour l'API
      const apiData = {
        ...formData,
        mot_de_passe: formData.password,
      }
      delete apiData.password

      if (isEditing) {
        await API.put(`/auth/${id}`, apiData)
      } else {
        await API.post("/auth/", apiData)
      }
      navigate("/dashboard/users")
    } catch (err) {
      setError("Erreur lors de l'enregistrement")
      setSaving(false)
    }
  }

  // Générer un champ de formulaire
  const Field = ({ name, label, type = "text", icon, required = false, options = [], placeholder }) => (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="input-wrapper">
        <i className={`fas fa-${icon}`}></i>
        {type === "select" ? (
          <select id={name} name={name} value={formData[name]} onChange={handleChange} required={required}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
          />
        )}
      </div>
    </div>
  )

  // Afficher l'état de chargement
  if (loading) {
    return (
      <div className="u-loading">
        <div className="u-spinner"></div>
        <p>Chargement des données...</p>
      </div>
    )
  }

  return (
    <div className="u-container">
      {/* En-tête */}
      <div className="u-header">
        <div>
          <h1>
            <i className={`fas ${isEditing ? "fa-user-edit" : "fa-user-plus"} me-3`}></i>
            {isEditing ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
          </h1>
          <p>{isEditing ? "Mettre à jour les informations" : "Créer un nouveau compte"}</p>
        </div>
        <button className="u-btn u-btn-secondary" onClick={() => navigate("/dashboard/users")}>
          <i className="fas fa-arrow-left me-2"></i>Retour
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="u-error-message">
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </div>
      )}

      {/* Formulaire */}
      <div className="u-card">
        <form onSubmit={handleSubmit} className="u-form">
          <div className="form-grid">
            {/* Colonne 1 */}
            <div className="form-column">
              <div className="form-section">
                <h3>
                  <i className="fas fa-user-circle me-2"></i>Informations
                </h3>

                <Field name="nom" label="Nom" icon="user" required placeholder="Nom complet" />

                <Field
                  name="role"
                  label="Rôle"
                  type="select"
                  icon="briefcase"
                  required
                  options={[
                    { value: "", label: "Sélectionner un rôle" },
                    { value: "CEO", label: "CEO" },
                    { value: "CTO", label: "CTO" },
                    { value: "Commercial", label: "Commercial" },
                    { value: "Comptable", label: "Comptable" },
                    { value: "Technicien", label: "Technicien" },
                  ]}
                />

                <Field
                  name="droit_acces"
                  label="Droits d'accès"
                  type="select"
                  icon="lock"
                  required
                  options={[
                    { value: "", label: "Sélectionner un niveau d'accès" },
                    { value: "Admin", label: "Admin" },
                    { value: "Commercial", label: "Commercial" },
                    { value: "Technique", label: "Technique" },
                    { value: "Lecture seule", label: "Lecture seule" },
                  ]}
                />
              </div>
            </div>

            {/* Colonne 2 */}
            <div className="form-column">
              <div className="form-section">
                <h3>
                  <i className="fas fa-address-card me-2"></i>Contact et authentification
                </h3>

                <Field
                  name="email"
                  label="Email"
                  type="email"
                  icon="envelope"
                  required
                  placeholder="exemple@domaine.com"
                />

                <Field name="phone" label="Téléphone" icon="phone" required placeholder="+212 XXXXXXXXX" />

                <Field
                  name="password"
                  label={isEditing ? "Nouveau mot de passe (laisser vide pour ne pas changer)" : "Mot de passe"}
                  type="password"
                  icon="key"
                  required={!isEditing}
                  placeholder={isEditing ? "Nouveau mot de passe" : "Mot de passe"}
                />
              </div>

              <div className="form-tips">
                <h3>
                  <i className="fas fa-info-circle me-2"></i>Informations
                </h3>
                <ul>
                  <li>
                    <i className="fas fa-check-circle"></i>Les droits déterminent les fonctionnalités accessibles
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>Mot de passe: minimum 8 caractères
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>Email unique requis pour chaque utilisateur
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="form-actions">
            <button
              type="button"
              className="u-btn u-btn-secondary"
              onClick={() => navigate("/dashboard/users")}
              disabled={saving}
            >
              <i className="fas fa-times me-2"></i>Annuler
            </button>
            <button type="submit" className="u-btn u-btn-primary" disabled={saving}>
              {saving ? (
                <>
                  <div className="u-spinner-sm"></div>
                  {isEditing ? "Mise à jour..." : "Création..."}
                </>
              ) : (
                <>
                  <i className={`fas ${isEditing ? "fa-save" : "fa-user-plus"} me-2`}></i>
                  {isEditing ? "Mettre à jour" : "Créer"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UsersForm