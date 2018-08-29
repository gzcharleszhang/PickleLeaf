import axios from 'axios';
import { getAuthHeaders } from 'client/util/Auth';
import { showMessage } from 'client/components/Message/Message';

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
      if (err.response.status === 401) {
        showMessage('Error', 'authentication failed');
      } else {
        showMessage('Error', err.response.data.message);
      }
    } else {
      console.log(err.message.toString());
    }

    throw err;
  },
};