import axios from 'axios';
import { getAuthHeaders } from 'client/util/Auth';
import { showMessage } from 'client/components/Message/Message';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'http://pickleleaf.herokuapp.com/api' : 'http://localhost:8000/api';

export default {
  get(url) {
    console.log(API_URL);
    return axios.get(`${API_URL}${url}`, {
      headers: getAuthHeaders(),
    }).catch(this._handleError);
  },
  post(url, data) {
    return axios.post(`${API_URL}${url}`, data || {}, { headers: getAuthHeaders() })
      .catch(this._handleError);
  },
  put(url, data) {
    return axios.put(`${API_URL}${url}`, data || {}, { headers: getAuthHeaders() })
      .catch(this._handleError);
  },
  delete(url) {
    return axios.delete(`${API_URL}${url}`, { headers: getAuthHeaders() })
      .catch(this._handleError);
  },

  _handleError(err) {
    if (err && err.response) {
      if (err.response.status === 401) {
        showMessage('Error', err.response.data.message || 'Authentication failed, not signed in');
      } else {
        showMessage('Error', err.response.data.message);
      }
    } else {
      console.log(err.message.toString());
    }

    throw err;
  },
};
