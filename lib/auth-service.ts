import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth';

// Types pour les réponses et les requêtes
interface LoginResponse {
  access: string;
  refresh: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface UserInfo {
  username: string;
  email: string;
  name: string;
  avatar?: string;
}

// Service d'authentification
const AuthService = {
  // Fonction de login
  login: async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('Tentative de connexion avec:', { username, password });
      const response = await axios.post<LoginResponse>(`${API_URL}/login/`, {
        username: username,
        password: password,
      });
      
      console.log('Réponse du serveur:', response.data);
      
      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Fonction d'inscription
  register: async (userData: RegisterRequest): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/register/`, {
        email: userData.email,
        pwd: userData.password,  
        firstname: userData.firstname,
        lastname: userData.lastname
      });
      return response.status === 201;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Fonction de déconnexion
  logout: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  // Récupérer le token d'accès
  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },

  // Rafraîchir le token d'accès
  refreshToken: async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const response = await axios.post<{ access: string }>(`${API_URL}/token/refresh/`, {
        refresh: refreshToken,
      });
      
      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      // Si le refresh token est expiré, déconnexion
      AuthService.logout();
      return false;
    }
  },
  
  // Décoder le token JWT pour obtenir les informations utilisateur
  getUserInfo: (): UserInfo | null => {
    const token = localStorage.getItem('accessToken');
    console.log('Token récupéré:', token ? 'Token présent' : 'Token absent');
    if (!token) return null;
    
    try {
      // Décoder le token JWT (format: header.payload.signature)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const payload = JSON.parse(jsonPayload);
      console.log('Payload décodé:', payload);
      
      const username = payload.username || payload.email || '';
      const userInfo = {
        username: username,
        email: payload.email || payload.username || '',
        name: payload.name || username || '',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random` // Avatar dynamique basé sur le nom d'utilisateur
      };
      console.log('Informations utilisateur extraites:', userInfo);
      return userInfo;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
};

export default AuthService;
