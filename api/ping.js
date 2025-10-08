export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');           // à restreindre plus tard
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({ ok: true, path: '/api/ping' });
}
