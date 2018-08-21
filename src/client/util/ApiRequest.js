import axios from 'axios';
import History from 'client/util/History';
import { getAuthHeaders } from 'client/util/Auth';

const API_URL = 'http://localhost:8000/api';

export default {
  get(url) {
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
      if (err.response.status === 403) {
        console.log('Unauthorized, please sign in.');
        History.replace('/login');
      } else {
        console.log(err.response.data);
      }
    } else {
      console.log(err.message.toString());
    }
    throw err;
  },
};
