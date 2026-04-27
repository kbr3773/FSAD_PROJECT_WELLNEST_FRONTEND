function normalizeBaseUrl(url) {
  if (!url) return url;
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function isHostedBrowser() {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host !== 'localhost' && host !== '127.0.0.1';
}

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function readLocal(key, fallback) {
  if (typeof localStorage === 'undefined') return fallback;
  const value = localStorage.getItem(key);
  return value == null ? fallback : safeJsonParse(value, fallback);
}

function writeLocal(key, value) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Support both names since older docs/examples often use VITE_API_URL.
const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    'http://localhost:8081/api'
);

// Frontend-only deployments (e.g. Vercel) can't reach localhost. Demo mode keeps the UI usable without a backend.
const DEMO_MODE = String(import.meta.env.VITE_DEMO_MODE || '').toLowerCase() === 'true';
const AUTO_DEMO_FALLBACK = isHostedBrowser() && /:\/\/(localhost|127\.0\.0\.1)(:|\/)/.test(API_BASE_URL);

function demoAuthUser(role, payload) {
  const email = payload?.email || (role === 'ADMIN' ? 'admin@wellnest.com' : 'student@university.edu');
  const name =
    payload?.name ||
    (role === 'ADMIN' ? 'Demo Admin' : email === 'student@university.edu' ? 'Demo Student' : 'Demo Student');
  return { id: Date.now(), name, email, role };
}

function demoList(key, fallback) {
  const items = readLocal(key, null);
  if (Array.isArray(items) && items.length) return items;
  writeLocal(key, fallback);
  return fallback;
}

async function demoRequest(path, options = {}) {
  const { fitnessPrograms, mentalHealthResources, nutritionPlans } = await import('../data/dummyData');
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? safeJsonParse(options.body, {}) : {};

  if (path === '/auth/student/login' && method === 'POST') return demoAuthUser('STUDENT', body);
  if (path === '/auth/student/register' && method === 'POST') {
    const created = demoAuthUser('STUDENT', body);
    const students = demoList('wellnest_demo_students', [
      { id: 1, name: 'Demo Student', email: 'student@university.edu', role: 'STUDENT' },
    ]);
    writeLocal(
      'wellnest_demo_students',
      [created, ...students.filter((s) => s.email !== created.email)].slice(0, 50)
    );
    return created;
  }
  if (path === '/auth/admin/login' && method === 'POST') return demoAuthUser('ADMIN', body);

  if (path === '/admin/users/students' && method === 'GET') {
    return demoList('wellnest_demo_students', [
      { id: 1, name: 'Demo Student', email: 'student@university.edu', role: 'STUDENT' },
    ]);
  }

  if (path.startsWith('/resources') && method === 'GET') {
    const all = [
      ...mentalHealthResources.map((r) => ({ ...r, imageUrl: r.image })),
      ...nutritionPlans.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.type,
        imageUrl: p.image,
      })),
    ];
    return all;
  }

  if (path.startsWith('/programs') && method === 'GET') {
    const defaults = fitnessPrograms.map((p) => ({
      ...p,
      imageUrl: p.image,
      type: 'FITNESS',
      status: 'Active',
    }));
    return demoList('wellnest_demo_programs', defaults);
  }

  if (path === '/programs' && method === 'POST') {
    const programs = demoList('wellnest_demo_programs', []);
    const created = {
      id: Date.now(),
      enrolled: 0,
      status: body.status || 'Active',
      ...body,
    };
    writeLocal('wellnest_demo_programs', [created, ...programs].slice(0, 100));
    return created;
  }

  if (/^\/programs\/\d+\/enroll$/.test(path) && method === 'POST') {
    const id = Number(path.split('/')[2]);
    const programs = demoList('wellnest_demo_programs', []);
    const updatedPrograms = programs.map((p) =>
      Number(p.id) === id ? { ...p, enrolled: (Number(p.enrolled) || 0) + 1 } : p
    );
    writeLocal('wellnest_demo_programs', updatedPrograms);
    const updated = updatedPrograms.find((p) => Number(p.id) === id);
    return updated || { id, enrolled: 1 };
  }

  if (path === '/support' && method === 'POST') {
    const requests = demoList('wellnest_demo_support', []);
    writeLocal('wellnest_demo_support', [{ id: Date.now(), ...body }, ...requests].slice(0, 100));
    return { ok: true };
  }

  if (path === '/dashboard/admin' && method === 'GET') {
    return {
      stats: {
        totalStudents: demoList('wellnest_demo_students', []).length || 1,
        activePrograms: demoList('wellnest_demo_programs', []).length || 4,
        totalResources: 12,
        supportRequests: demoList('wellnest_demo_support', []).length || 0,
        resourceViews: 45200,
      },
    };
  }

  if (path === '/dashboard/student' && method === 'GET') {
    return { ok: true };
  }

  throw new Error('Demo mode: endpoint not implemented');
}

async function request(path, options = {}) {
  if (DEMO_MODE || AUTO_DEMO_FALLBACK) {
    return demoRequest(path, options);
  }

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
