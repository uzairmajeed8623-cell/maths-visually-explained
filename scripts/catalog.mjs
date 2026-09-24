export const tiers = ['Foundation', 'Higher', 'Both'];
export function tierValues(tier) { return tier === 'Both' ? 'Foundation|Higher' : tier; }
export function tierLabel(tier) { return tier === 'Both' ? 'Foundation & Higher' : tier; }
export function gradeLabel(grades) {
  if (!grades?.length) return 'Difficulty not yet rated';
  const values = [...grades].sort((a,b)=>a-b);
  return `Approx. grade${values.length > 1 ? 's' : ''} ${values.join(', ')}`;
}
export function validateClassification(item) {
  if (!tiers.includes(item.tier)) throw Error(`${item.slug}: tier must be Foundation, Higher or Both`);
  if (!Array.isArray(item.grades) || item.grades.some(g=>!Number.isInteger(g)||g<1||g>9) || new Set(item.grades).size!==item.grades.length)
    throw Error(`${item.slug}: grades must be a unique array of numbers from 1 to 9 (or [] for unrated)`);
}
export function youtubeId(value) {
  if (!value) return '';
  let u; try { u = new URL(value); } catch { throw Error('Invalid YouTube URL: '+value); }
  if (u.protocol !== 'https:') throw Error('YouTube URLs must use HTTPS');
  const host=u.hostname.replace(/^www\./,'');
  let id='';
  if(host==='youtu.be') id=u.pathname.slice(1);
  else if(['youtube.com','m.youtube.com','youtube-nocookie.com'].includes(host))
    id=u.pathname==='/watch'?u.searchParams.get('v'):u.pathname.match(/^\/(?:embed|shorts)\/([^/]+)$/)?.[1];
  if(!/^[\w-]{11}$/.test(id||'')) throw Error('Unsupported YouTube URL: '+value);
  return id;
}
