function normalizeBaseUrl(url) {
  if (!url) return url;
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

// Support both names since older docs/examples often use VITE_API_URL.
const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    'http://localhost:8081/api'
);

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  loginStudent: (payload) => request('/auth/student/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  registerStudent: (payload) => request('/auth/student/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  loginAdmin: (payload) => request('/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getStudents: () => request('/admin/users/students'),
  getResources: (type) => request(`/resources${type ? `?type=${type}` : ''}`),
  getPrograms: (type) => request(`/programs${type ? `?type=${type}` : ''}`),
  createProgram: (payload) => request('/programs', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  enrollProgram: (id) => request(`/programs/${id}/enroll`, { method: 'POST' }),
  createSupportRequest: (payload) => request('/support', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getAdminDashboard: () => request('/dashboard/admin'),
  getStudentDashboard: () => request('/dashboard/student'),
};
