import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  // Vérifier s'il y a un utilisateur valide dans le localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.email) {
    // Si pas connecté (pas de user stocké ou email manquant) ➔ Redirige vers login
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
