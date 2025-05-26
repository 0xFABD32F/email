"use client"

import { useState } from "react"
import API from "../../services/api"
import "./ConvertOpportunityModal.css"

function ConvertOpportunityModal({ show, onClose, opportunityId, onSuccess }) {
  const [formData, setFormData] = useState({
    adresse: "",
    payment_terms: "30 jours",
    invoice_terms: "Sur chaque colis",
    currency: "MAD",
    zone_franche: "NO",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.adresse.trim()) {
      newErrors.adresse = "L'adresse est requise"
    }

    if (!formData.payment_terms.trim()) {
      newErrors.payment_terms = "Les conditions de paiement sont requises"
    }

    if (!formData.invoice_terms.trim()) {
      newErrors.invoice_terms = "Les conditions de facturation sont requises"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      await API.post(`/opportunities/convert-to-client/${opportunityId}`, formData)
      onSuccess()
      onClose()
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message
      alert(`Erreur: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <div className="convert-modal-backdrop">
      <div className="convert-modal-container">
        <div className="convert-modal-content">
          <div className="convert-modal-header">
            <h5 className="convert-modal-title">
              <i className="fas fa-user-plus me-2"></i>
              Convertir en client
            </h5>
            <button type="button" className="convert-modal-close" onClick={onClose} aria-label="Fermer">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="convert-modal-body">
            <p className="convert-modal-description">
              Veuillez remplir les informations suivantes pour convertir cette opportunité en client.
            </p>

            <form onSubmit={handleSubmit} id="convert-form">
              <div className="convert-form-group">
                <label htmlFor="adresse" className="convert-form-label">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  Adresse <span className="required-star">*</span>
                </label>
                <input
                  id="adresse"
                  className={`convert-form-control ${errors.adresse ? "is-invalid" : ""}`}
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  placeholder="Ex: 123 Rue du Commerce, Casablanca"
                  required
                />
                {errors.adresse && <div className="invalid-feedback">{errors.adresse}</div>}
              </div>

              <div className="convert-form-row">
                <div className="convert-form-group">
                  <label htmlFor="payment_terms" className="convert-form-label">
                    <i className="fas fa-money-check-alt me-2"></i>
                    Conditions de paiement <span className="required-star">*</span>
                  </label>
                  <select
                    id="payment_terms"
                    className={`convert-form-control ${errors.payment_terms ? "is-invalid" : ""}`}
                    name="payment_terms"
                    value={formData.payment_terms}
                    onChange={handleChange}
                    required
                  >
                    <option value="30 jours">30 jours</option>
                    <option value="45 jours">45 jours</option>
                    <option value="60 jours">60 jours</option>
                    <option value="90 jours">90 jours</option>
                    <option value="Paiement à la livraison">Paiement à la livraison</option>
                    <option value="Paiement anticipé">Paiement anticipé</option>
                  </select>
                  {errors.payment_terms && <div className="invalid-feedback">{errors.payment_terms}</div>}
                </div>

                <div className="convert-form-group">
                  <label htmlFor="invoice_terms" className="convert-form-label">
                    <i className="fas fa-file-invoice me-2"></i>
                    Conditions de facturation <span className="required-star">*</span>
                  </label>
                  <select
                    id="invoice_terms"
                    className={`convert-form-control ${errors.invoice_terms ? "is-invalid" : ""}`}
                    name="invoice_terms"
                    value={formData.invoice_terms}
                    onChange={handleChange}
                    required
                  >
                    <option value="Sur chaque colis">Sur chaque colis</option>
                    <option value="Facturation mensuelle">Facturation mensuelle</option>
                    <option value="Facturation à la livraison">Facturation à la livraison</option>
                    <option value="Facturation à l'avance">Facturation à l'avance</option>
                  </select>
                  {errors.invoice_terms && <div className="invalid-feedback">{errors.invoice_terms}</div>}
                </div>
              </div>

              <div className="convert-form-row">
                <div className="convert-form-group">
                  <label htmlFor="currency" className="convert-form-label">
                    <i className="fas fa-money-bill-wave me-2"></i>
                    Devise
                  </label>
                  <select
                    id="currency"
                    className="convert-form-control"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="MAD">MAD</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>

                <div className="convert-form-group">
                  <label htmlFor="zone_franche" className="convert-form-label">
                    <i className="fas fa-warehouse me-2"></i>
                    Zone Franche
                  </label>
                  <select
                    id="zone_franche"
                    className="convert-form-control"
                    name="zone_franche"
                    value={formData.zone_franche}
                    onChange={handleChange}
                  >
                    <option value="NO">Non</option>
                    <option value="YES">Oui</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="convert-modal-footer">
            <button type="button" className="convert-btn convert-btn-secondary" onClick={onClose} disabled={loading}>
              Annuler
            </button>
            <button type="submit" form="convert-form" className="convert-btn convert-btn-success" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin me-2"></i>
                  Traitement...
                </>
              ) : (
                <>
                  <i className="fas fa-check me-2"></i>
                  Convertir
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConvertOpportunityModal