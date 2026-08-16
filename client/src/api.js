const API = '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('mindcare_token');
  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  get:    (url) => request(url),
  post:   (url, body) => request(url, { method: 'POST', body: JSON.stringify(body) }),
  delete: (url) => request(url, { method: 'DELETE' }),
};
