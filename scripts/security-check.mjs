import assert from 'node:assert/strict';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
assert.ok(url && key, 'Public Supabase env required');
async function probe(path, options = {}) {
  const r = await fetch(`${url}/rest/v1/${path}`, { ...options, headers: { apikey: key, 'Content-Type': 'application/json', Prefer: 'return=representation', ...options.headers } });
  const data = await r.json();
  return { status: r.status, data };
}
const products = await probe('products?select=slug,is_active');
assert.equal(products.status, 200);
assert.ok(products.data.length > 0);
assert.ok(products.data.every(p => p.is_active));
console.log('PASS anonymous active catalog read');
const hidden = await probe('products?select=slug&is_active=eq.false');
assert.equal(hidden.status, 200);
assert.deepEqual(hidden.data, []);
console.log('PASS anonymous inactive products hidden');
for (const table of ['orders', 'admin_users']) {
  const result = await probe(`${table}?select=*&limit=1`);
  assert.ok([401,403].includes(result.status) || (result.status === 200 && Array.isArray(result.data) && result.data.length === 0));
  console.log(`PASS anonymous ${table} read denied or empty (HTTP ${result.status}; empty alone does not prove RLS enabled)`);
}
const rpc = await probe('rpc/is_admin', { method: 'POST', body: '{}' });
assert.ok([401,403].includes(rpc.status) || (rpc.status === 200 && rpc.data === false));
console.log(`PASS anonymous is_admin does not grant access (HTTP ${rpc.status})`);
// Nonexistent negative identity filter ensures this probe cannot change a catalog row.
const write = await probe('products?id=eq.-1', { method: 'PATCH', body: JSON.stringify({ name: 'security-noop' }) });
assert.ok([401,403].includes(write.status) || (write.status === 200 && Array.isArray(write.data) && write.data.length === 0));
console.log('PASS anonymous no-op update denied or affects zero rows (not proof of insert protection)');
const base = process.env.SECURITY_BASE_URL || 'http://localhost:3000';
for (const path of ['/admin', '/admin?x=1']) {
 const r = await fetch(base + path, { redirect: 'manual' });
 assert.ok([303,307,308].includes(r.status));
 assert.equal(new URL(r.headers.get('location'), base).pathname, '/admin/login');
 assert.equal(r.headers.get('x-frame-options'), 'DENY');
 assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
 console.log(`PASS unauthenticated ${path} redirects with security headers`);
}
