import axios from 'axios';
import AuthService from './auth-service';

// Création d'une instance axios avec une configuration de base
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Si l'erreur est 401 (non autorisé) et que la requête n'a pas déjà été retentée
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Tentative de rafraîchissement du token
        const refreshSuccess = await AuthService.refreshToken();
        
        if (refreshSuccess) {
          // Si le rafraîchissement a réussi, on met à jour le token dans la requête
          const token = AuthService.getAccessToken();
          originalRequest.headers.Authorization = `Bearer ${token}`;
          
          // On retente la requête originale avec le nouveau token
          return axiosInstance(originalRequest);
        } else {
          // Si le rafraîchissement a échoué, on redirige vers la page de connexion
          if (typeof window !== 'undefined') {
            AuthService.logout();
            window.location.href = '/login';
          }
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // En cas d'erreur lors du rafraîchissement, on déconnecte l'utilisateur
        AuthService.logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
