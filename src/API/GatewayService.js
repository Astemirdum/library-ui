import axios from 'axios';
import { config } from '../Constants';


export const apiClient = axios.create({
    baseURL: config.url.API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});


export function setAuthToken(token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
  

export function removeAuthToken() {
delete apiClient.defaults.headers.common['Authorization'];
}

export default class GatewayService {
  static async registerUser(userData) {
    try {
      const response = await apiClient.post('/api/v1/register', userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  }

  static async authorizeUser(authData) {
    try {
      const response = await apiClient.post('/api/v1/authorize', authData);
      setAuthToken(response.data.access_token);
      return response;
    } catch (error) {
      console.error('Authorization error:', error.response?.data || error.message);
      throw error;
    }
  }

  static async fetchLibraries(city, size, page) {
    try {
      const response = await apiClient.get('/api/v1/libraries', { 
        params: {city, page, size }
      });
      console.log('fetchLibraries data:', response.data);
      return response;
    } catch (error) {
      console.error('Fetch Libraries error:', error.response?.data || error.message);
      throw error;
    }
  }

  static async fetchBooks(libraryUid,  size = 10, page = 0, showAll = false) {
    try {
      const response = await apiClient.get(`/api/v1/libraries/${libraryUid}/books`, {
        params: { page, size, showAll }
      });
      return response;
    } catch (error) {
      console.error('Fetch Books error:', error.response?.data || error.message);
      throw error;
    }
  }

  static async makeReservation(reservationData) {
    try {
      const response = await apiClient.post('/api/v1/reservations', reservationData);
      return response;
    } catch (error) {
      console.error('Make Reservation error:', error.response?.data || error.message);
      throw error;
    }
  }


  static async fetchReservations() {
    try {
      const response = await apiClient.get('/api/v1/reservations');
      return response;
    } catch (error) {
      console.error('Fetching reservations error:', error.response?.data || error.message);
      throw error;
    }
  }

  static async returnReservation(reservationUid, returnData) {
    try {
      const url = `/api/v1/reservations/${reservationUid}/return`;
      const response = await apiClient.post(url, returnData);
      return response; 
    } catch (error) {
      console.error('Return reservation error:', error.response?.data || error.message);
      throw error;
    }
  }

  static async fetchUserRating() {
    try {
      const response = await apiClient.get('/api/v1/rating');
      return response; 
    } catch (error) {
      console.error('Fetching user rating error:', error.response?.data || error.message);
      throw error;
    }
  }

  static async fetchStatistics() {
    try {
      const response = await apiClient.get('/api/v1/stats');
      return response; 
    } catch (error) {
      console.error('Fetching statistics error:', error.response?.data || error.message);
      throw error;
    }
  }
}
  