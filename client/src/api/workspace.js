import axios from 'axios';

export const purge = urlList => axios.post('/api/purge', {
  data: urlList
});