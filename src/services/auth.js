import API from './api';

export const login = (email, password) => {
  return API.post('/auth/login', {
    email: email,
    mot_de_passe: password
  });
};

export const register = (formData) => {
  return API.post('/auth/register', {
    nom: formData.nom,
    email: formData.email,
    phone: formData.phone,
    role: formData.role,
    droit_acces: formData.droit_acces,
    mot_de_passe: formData.mot_de_passe
  });
};


