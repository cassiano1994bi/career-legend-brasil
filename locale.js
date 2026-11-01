"use strict";
/* Presentation-only localization. Internal IDs, stored narratives, rules and
 * save migrations keep their original values for compatibility with upstream. */
const LocaleBR = (() => {
  const dictionary = { ...PT_BR };
  const countryNames = new Intl.DisplayNames(['pt-BR'], { type: 'region' });
  const iso2 = { ARG:'AR',FRA:'FR',ESP:'ES',ENG:'GB',BRA:'BR',POR:'PT',NED:'NL',GER:'DE',ITA:'IT',BEL:'BE',CRO:'HR',URU:'UY',MAR:'MA',COL:'CO',NOR:'NO',DEN:'DK',JPN:'JP',SUI:'CH',AUT:'AT',MEX:'MX',TUR:'TR',USA:'US',SEN:'SN',UKR:'UA',EGY:'EG',ECU:'EC',KOR:'KR',POL:'PL',SRB:'RS',CIV:'CI',ALG:'DZ',NGA:'NG',CAN:'CA',SWE:'SE',IRN:'IR',SCO:'GB',CZE:'CZ',GEO:'GE',CMR:'CM',GHA:'GH',PAR:'PY',HUN:'HU',GRE:'GR',TUN:'TN',CHI:'CL',AUS:'AU',ROU:'RO',WAL:'GB',MLI:'ML',PER:'PE',KSA:'SA',CRC:'CR',SVK:'SK',SVN:'SI',VEN:'VE',PAN:'PA',IRL:'IE',ALB:'AL',JAM:'JM',ISL:'IS',RSA:'ZA',FIN:'FI',QAT:'QA',UZB:'UZ',HON:'HN',BOL:'BO',CHN:'CN',IND:'IN' };
  for (const [id, name] of NATIONS) dictionary[name] = ({ENG:'Inglaterra',SCO:'Escócia',WAL:'País de Gales'})[id] || countryNames.of(iso2[id]);
  // Expand the original fan-message placeholders before compiling the matcher.
  // This also translates previously saved messages without changing their data.
  for (const template of FAN_TEMPLATES) {
    for (const [token, choices] of [['word', FAN_WORDS], ['thing', FAN_THINGS]]) {
      if (!template.includes('{'+token+'}')) continue;
      for (const choice of choices) {
        const translated = dictionary[template] || template;
        dictionary[template.replace('{'+token+'}', choice)] = translated
          .replace(/\{(?:word|palavra|thing|coisa)\}/g, dictionary[choice] || choice);
      }
    }
  }
  const protectedNames = new Set([
    ...LEAGUES.flatMap(l => l.teams.map(t => t[0])),
    ...BRANDS.map(b => b[0]), ...STARS_SEED.map(s => s[0]),
  ]);
  const quote = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const all = [...new Set([...Object.keys(dictionary), ...protectedNames])].sort((a,b) => b.length-a.length);
  const matcher = new RegExp(all.map(s => (/^[\p{L}\p{N}_]/u.test(s) ? '(?<![\\p{L}\\p{N}_])' : '') + quote(s) + (/[\p{L}\p{N}_]$/u.test(s) ? '(?![\\p{L}\\p{N}_])' : '')).join('|'), 'gu');
  const seen = new WeakMap();
  const savedNames = Array.from({length:SAVE_SLOTS}, (_,i) => Saves.meta(i+1)?.name).filter(Boolean);
  function translate(value) {
    // Protect the user's chosen name and generated teammates, including words
    // such as "Star" that would otherwise also be translatable UI labels.
    const names = [...savedNames, App.state?.player?.name, ...(App.state?.mates || []), App.wizard?.cfg?.name].filter(Boolean);
    const chunks = names.length ? value.split(new RegExp('('+names.sort((a,b)=>b.length-a.length).map(quote).join('|')+')','gu')) : [value];
    return chunks.map(s => names.includes(s) ? s : s.replace(matcher, match => protectedNames.has(match) ? match : dictionary[match])).join('');
  }
  function text(node) {
    if (!node.parentElement || node.parentElement.closest('script,style,.badge,[translate="no"]')) return;
    if (seen.get(node) === node.data) return;
    const result = translate(node.data)
      .replace(/\b(\d+)(?:st|nd|rd|th)\b/g, '$1º')
      .replace(/\b(\d+)yr\b/g, (_,n) => n + (n === '1' ? ' ano' : ' anos'))
      .replace(/\b(\d+)w\b/g, '$1 sem.');
    seen.set(node, result);
    if (node.data !== result) node.data = result;
  }
  function walk(root) {
    if (root.nodeType === Node.TEXT_NODE) { text(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE || root.closest('script,style,.badge,[translate="no"]')) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) text(node);
    for (const el of [root, ...root.querySelectorAll('[title],[placeholder],[aria-label]')]) {
      for (const attr of ['title','placeholder','aria-label']) {
        if (!el.hasAttribute(attr)) continue;
        const value = el.getAttribute(attr), key = 'localeOriginal'+attr.replace('-','');
        if (el.dataset[key] === value) continue;
        const result = translate(value);
        el.dataset[key] = result;
        if (value !== result) el.setAttribute(attr, result);
      }
    }
  }
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') text(record.target);
      else if (record.type === 'attributes') walk(record.target);
      else for (const node of record.addedNodes) walk(node);
    }
  });
  observer.observe(document.body, { subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['title','placeholder','aria-label'] });
  document.addEventListener('DOMContentLoaded', () => walk(document.body));
  return { translate, refresh: () => walk(document.body) };
})();
