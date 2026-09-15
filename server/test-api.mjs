async function runTests() {
  const endpoints = [
    '/api/health',
    '/api/dashboard',
    '/api/dashboard/summary',
    '/api/vessels',
    '/api/berths',
    '/api/alerts',
    '/api/analytics/kpis',
    '/api/settings',
    '/api/prediction/forecast'
  ];

  console.log('Testing endpoints...');
  for (const ep of endpoints) {
    try {
      const res = await fetch('http://localhost:5000' + ep);
      const data = await res.json();
      const count = Array.isArray(data) ? `(${data.length} items)` : '';
      console.log(`✅ [${res.status}] ${ep} ${count}`);
    } catch (e) {
      console.log(`❌ ${ep}: ${e.message}`);
    }
  }

  // POST tests
  try {
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'operator@smartport.ai', password: 'password123' })
    });
    const loginData = await loginRes.json();
    console.log(`✅ [${loginRes.status}] POST /api/auth/login -> User: ${loginData.user?.name}`);
  } catch (e) {
    console.log(`❌ POST /api/auth/login: ${e.message}`);
  }

  try {
    const predRes = await fetch('http://localhost:5000/api/prediction/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vessels: 15, berthUsage: 75, queue: 5, craneAvailability: 80, weather: 'Clear' })
    });
    const predData = await predRes.json();
    console.log(`✅ [${predRes.status}] POST /api/prediction/predict -> Congestion Score: ${predData.score}% (${predData.level})`);
  } catch (e) {
    console.log(`❌ POST /api/prediction/predict: ${e.message}`);
  }
}

runTests();
