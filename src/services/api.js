// SmartPort AI Live API Client Service

const API_BASE = "/api";

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`API Error [${endpoint}]:`, err);
    throw err;
  }
}

// ==================== AUTH ====================
export async function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}

export async function getCurrentUser() {
  return request("/auth/me");
}

export async function logout() {
  return request("/auth/logout", { method: "POST" });
}

// ==================== DASHBOARD ====================
export async function getDashboardData() {
  return request("/dashboard/summary");
}

// ==================== VESSELS ====================
export async function getVessels({ q = "", status = "" } = {}) {
  const params = new URLSearchParams();
  if (q) params.append("q", q);
  if (status && status !== "All Status") params.append("status", status);
  const queryStr = params.toString() ? `?${params.toString()}` : "";
  return request(`/vessels${queryStr}`);
}

export async function getVesselById(id) {
  return request(`/vessels/${id}`);
}

export async function createVessel(vesselData) {
  return request("/vessels", {
    method: "POST",
    body: JSON.stringify(vesselData)
  });
}

export async function updateVessel(id, vesselData) {
  return request(`/vessels/${id}`, {
    method: "PUT",
    body: JSON.stringify(vesselData)
  });
}

export async function deleteVessel(id) {
  return request(`/vessels/${id}`, {
    method: "DELETE"
  });
}

// ==================== BERTHS & CRANES ====================
export async function getBerths() {
  return request("/berths");
}

export async function getCranes() {
  return request("/berths/cranes");
}

export async function assignBerth(id, berthData) {
  return request(`/berths/${id}/assign`, {
    method: "PUT",
    body: JSON.stringify(berthData)
  });
}

// ==================== PREDICTION ====================
export async function predictCongestion(input) {
  return request("/prediction/predict", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export async function getForecast() {
  return request("/prediction/forecast");
}

// ==================== ALERTS ====================
export async function getAlerts(severity = "All") {
  const query = severity && severity !== "All" ? `?severity=${encodeURIComponent(severity)}` : "";
  return request(`/alerts${query}`);
}

export async function createAlert(alertData) {
  return request("/alerts", {
    method: "POST",
    body: JSON.stringify(alertData)
  });
}

export async function resolveAlert(id) {
  return request(`/alerts/${id}/resolve`, {
    method: "PUT"
  });
}

export async function deleteAlert(id) {
  return request(`/alerts/${id}`, {
    method: "DELETE"
  });
}

// ==================== ANALYTICS ====================
export async function getAnalyticsKPIs() {
  return request("/analytics/kpis");
}

export async function getAnalyticsHistory(range = "7d") {
  return request(`/analytics/history?range=${range}`);
}

export function exportReportUrl() {
  return `${API_BASE}/analytics/export`;
}

// ==================== SETTINGS ====================
export async function getSettings() {
  return request("/settings");
}

export async function updateSettings(settingsData) {
  return request("/settings", {
    method: "PUT",
    body: JSON.stringify(settingsData)
  });
}