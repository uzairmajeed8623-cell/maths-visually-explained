// Shared by the browser and the catalogue checks. Every active filter must match.
export function matchesCatalog(item, query = '', filters = {}) {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.every(word => (item.search || '').toLocaleLowerCase().includes(word))) return false;
  return Object.entries(filters).every(([key, value]) => !value || value === 'all' ||
    String(item[key] || '').split('|').includes(String(value)));
}
