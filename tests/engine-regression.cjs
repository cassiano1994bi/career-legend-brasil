// Compare five full seasons against the credited upstream commit with identical RNG.
const vm = require('node:vm');
const fs = require('node:fs');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const UPSTREAM = 'b04970d573a12c365674e725e5db37af7ba1f99a';
const files = ['util.js','data_clubs.js','data_world.js','data_press.js','data_skills.js','data_brands.js','data_dms.js','data_badevents.js','player.js','engine.js','career.js'];
async function simulate(original, pos) {
  const context = vm.createContext({ console });
  vm.runInContext('let seed = 123456; Math.random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);',context);
  for (const file of files) vm.runInContext(original ? cp.execFileSync('git',['show',`${UPSTREAM}:${file}`],{encoding:'utf8'}).toString() : fs.readFileSync(file,'utf8'),context,{filename:file});
  return JSON.parse(await vm.runInContext(`(async () => {
    const st = newCareer({name:'Regressão', pos:${JSON.stringify(pos)},nat:'BRA',diff:'normal',academy:ACADEMIES.find(a=>a.club==='Santos')});
    for (let i=0;i<240;i++) await advanceWeek(st, {
      lifeEvent: async () => 0,
      seasonReview: async (s,r) => {
        for (const d of r.decisions || []) { s.academy=null; s.contract={wage:d.wage,until:s.year+1+d.years,role:s.contract?.role||'prospect'}; }
        if (r.freeAgent && s.offers.length) acceptOffer(s,s.offers[0]);
        if (r.mustRetire) doRetire(s);
      }
    });
    // Formatting changes in display-only news are intentionally excluded.
    delete st.news; delete st.pendingToasts;
    return JSON.stringify(st);
  })()`,context));
}
(async()=>{for (const pos of ['ST','GK']) {const a=await simulate(true,pos),b=await simulate(false,pos);assert.deepEqual(b,a);console.log(`PASS: ${pos}, 240 weeks, age ${b.player.age}, all gameplay/save data identical`);}})().catch(e=>{console.error(e);process.exitCode=1});
