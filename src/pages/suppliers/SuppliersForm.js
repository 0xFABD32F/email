"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

// Données simulées pour les fournisseurs
const mockSuppliers = [
  {
    id: 1,
    company: "Sourcing-IT",
    domain: "Hardware IT",
    brand: "Cisco",
    country: "UK",
    address: "London, UK",
    position: "Account Manager",
    contact: "John Smith",
    phone: "+44 XX XXX XXXX",
    mail: "john@sourcing-it.com",
    currency: "USD",
    rib: "GB29NWBK60161331926819",
    payment_terms: "30 jours",
    reliability: "Élevée",
  },
  {
    id: 2,
    company: "Tech Supplies",
    domain: "Networking",
    brand: "HPE",
    country: "France",
    address: "Paris, France",
    position: "Sales Director",
    contact: "Marie Dubois",
    phone: "+33 X XX XX XX XX",
    mail: "marie@techsupplies.fr",
    currency: "EUR",
    rib: "FR1420041010050500013M02606",
    payment_terms: "45 jours",
    reliability: "Élevée",
  },
]

function SuppliersForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    company: "",
    domain: "",
    brand: "",
    country: "",
    address: "",
    position: "",
    contact: "",
    phone: "",
    mail: "",
    currency: "USD",
    rib: "",
    payment_terms: "",
    reliability: "Moyenne",
  })

  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    if (isEditing) {
      // Simuler un appel API pour récupérer les données du fournisseur
      setTimeout(() => {
        const supplier = mockSuppliers.find((s) => s.id === Number.parseInt(id))
        if (supplier) {
          setFormData(supplier)
        }
        setLoading(false)
      }, 500)
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simuler l'envoi des données
    console.log("Données du formulaire soumises:", formData)

    // Rediriger vers la liste des fournisseurs
    navigate("/suppliers")
  }

  if (loading) {
    return <div>Chargement des données...</div>
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{isEditing ? "Modifier" : "Ajouter"} un fournisseur</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="company" className="form-label">
                  Société
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-control"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="domain" className="form-label">
                  Domaine
                </label>
                <select
                  id="domain"
                  name="domain"
                  className="form-select"
                  value={formData.domain}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un domaine</option>
                  <option value="Hardware IT">Hardware IT</option>
                  <option value="Networking">Networking</option>
                  <option value="Telco">Telco</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Cloud">Cloud</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="brand" className="form-label">
                  Marque
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  className="form-control"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="country" className="form-label">
                  Pays
                </label>
                <select
                  id="country"
                  name="country"
                  className="form-select"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un pays</option>
                  <option value="Maroc">Maroc</option>
                  <option value="France">France</option>
                  <option value="UK">UK</option>
                  <option value="USA">USA</option>
                  <option value="UAE">UAE</option>
                  <option value="Espagne">Espagne</option>
                  <option value="Allemagne">Allemagne</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-8">
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Adresse
                </label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  required
                ></textarea>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="contact" className="form-label">
                  Nom du contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="form-control"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="position" className="form-label">
                  Poste du contact
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="form-control"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="mail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  className="form-control"
                  value={formData.mail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="currency" className="form-label">
                  Devise
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="form-select"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="MAD">MAD</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="payment_terms" className="form-label">
                  Conditions de paiement
                </label>
                <input
                  type="text"
                  id="payment_terms"
                  name="payment_terms"
                  className="form-control"
                  value={formData.payment_terms}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-8">
              <div className="form-group">
                <label htmlFor="rib" className="form-label">
                  RIB/IBAN
                </label>
                <input
                  type="text"
                  id="rib"
                  name="rib"
                  className="form-control"
                  value={formData.rib}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="reliability" className="form-label">
                  Fiabilité
                </label>
                <select
                  id="reliability"
                  name="reliability"
                  className="form-select"
                  value={formData.reliability}
                  onChange={handleChange}
                  required
                >
                  <option value="Élevée">Élevée</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Faible">Faible</option>
                </select>
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Mettre à jour" : "Ajouter"} le fournisseur
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/suppliers")}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SuppliersForm
