export const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function apiJSON(url, options = {}) {
  const request = { credentials: 'include', ...options };

  if (request.body && typeof request.body === 'object' && !(request.body instanceof FormData)) {
    request.headers = { 'Content-Type': 'application/json', ...(request.headers || {}) };
    request.body = JSON.stringify(request.body);
  }

  const response = await fetch(url, request);
  let data = {};
  try { data = await response.json(); } catch {}

  if (!response.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}
