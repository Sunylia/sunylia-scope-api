export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');               // à restreindre plus tard
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let { domain, queries } = req.body || {};
  if (typeof queries === 'string') {
    queries = queries.split(',').map(s => s.trim()).filter(Boolean);
  }
  if (!domain || !Array.isArray(queries) || queries.length === 0) {
    return res.status(400).json({ error: 'domain and queries[] required' });
  }

  const host = String(domain).replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');
  return res.status(200).json({
    status: 'done',
    visibility_score: 72,
    engines: [
      { name: 'Perplexity',  found: true,  citations: [`https://${host}/guide`] },
      { name: 'Copilot/Bing', found: true, citations: [`https://${host}/blog`] }
    ],
    recommendations: [
      'Add a 100–120 word summary at the top.',
      'Use FAQ schema (schema.org).',
      'Add 1–2 authoritative outbound links.'
    ]
  });
}
