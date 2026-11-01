// Keep the browser bundle synchronized with the editable translation source.
const fs = require('node:fs');
const dictionary = JSON.parse(fs.readFileSync('pt-BR.json','utf8'));
fs.writeFileSync('locale-data.js', '/* Tradução pt-BR local; não usa serviços externos durante o jogo. */\nconst PT_BR = '+JSON.stringify(dictionary,null,2)+';\n');
