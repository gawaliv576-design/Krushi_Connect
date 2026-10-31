/**
 * Krushi Seva Kendra - Supabase Integration Client
 * Project URL: https://lejybyuqbqgxvxxncwlm.supabase.co
 * Project ID: lejybyuqbqgxvxxncwlm1
 */

const SUPABASE_CONFIG = {
  url: 'https://lejybyuqbqgxvxxncwlm.supabase.co',
  anonKey: 'sb_publishable_YGfa9rUX_U6eI0UT9tSBPA_kGyCa4y2',
  enabled: true
};

// Initialize Supabase JS Client if library is available
let supabase = null;
if (window.supabase && typeof window.supabase.createClient === 'function') {
  try {
    supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('✅ Supabase Client Initialized Successfully');
  } catch (err) {
    console.warn('⚠️ Supabase init warning:', err);
  }
}

// Universal REST Helper for Supabase (works with or without SDK CDN)
const SupabaseAPI = {
  headers() {
    return {
      'apikey': SUPABASE_CONFIG.anonKey,
      'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };
  },

  async get(table, query = '') {
    try {
      const url = `${SUPABASE_CONFIG.url}/rest/v1/${table}${query ? '?' + query : ''}`;
      const res = await fetch(url, { headers: this.headers() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[Supabase GET ${table}] Error, using local fallback:`, err.message);
      return null;
    }
  },

  async insert(table, data) {
    try {
      const url = `${SUPABASE_CONFIG.url}/rest/v1/${table}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[Supabase INSERT ${table}] Error:`, err.message);
      return null;
    }
  },

  async update(table, filterCol, filterVal, data) {
    try {
      const url = `${SUPABASE_CONFIG.url}/rest/v1/${table}?${filterCol}=eq.${encodeURIComponent(filterVal)}`;
      const res = await fetch(url, {
        method: 'PATCH',
        headers: this.headers(),
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[Supabase UPDATE ${table}] Error:`, err.message);
      return null;
    }
  },

  async upsert(table, data) {
    try {
      const url = `${SUPABASE_CONFIG.url}/rest/v1/${table}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          ...this.headers(),
          'Prefer': 'resolution=merge-duplicates,return=representation'
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[Supabase UPSERT ${table}] Error:`, err.message);
      return null;
    }
  }
};

window.SUPABASE_CONFIG = SUPABASE_CONFIG;
window.SupabaseAPI = SupabaseAPI;
