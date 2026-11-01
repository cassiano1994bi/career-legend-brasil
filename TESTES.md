# Validação local — 1º de novembro de 2026

## Resultado

`npm test` passou. Nenhum erro de JavaScript foi registrado no Chromium durante o roteiro automatizado.

- **Simulação:** 240 semanas com atacante e 240 com goleiro. Comparação integral do estado do jogo contra o commit original com gerador aleatório idêntico. Foram excluídos somente os textos de notícias e notificações, cuja formatação de números/ordinais mudou. Todos os demais dados foram iguais.
- **Salvamento:** criação de carreira, avanço de 154 semanas, recarga da página e reabertura da carreira. Idade, temporada, semana, contrato, resultados e caixa de entrada foram preservados. Uma chave de outro projeto foi mantida intacta.
- **Interações:** contratação profissional, aceitação de transferência, definição de treino de habilidade, publicação social dentro do jogo, resposta a mensagem e partidas com escolhas interativas. O teste final encontrou três partidas e treze escolhas interativas.
- **Navegação:** todas as oito abas em 1280 × 844, 390 × 844 e 320 × 844. Sem rolagem horizontal do documento. Testes adicionais de configurações e revisão de temporada/renovação.
- **Hospedagem:** recursos relativos carregados no caminho `/career-legend-brasil/` em servidor local, imitando a estrutura do Pages.
- **Licença:** arquivo MIT original sem alterações, copyright e créditos incluídos no rodapé e documentação.

Capturas: [desktop](artifacts/desktop-home.png), [celular — início](artifacts/mobile-home.png), [celular — contratos](artifacts/mobile-transfers.png), [celular — temporada](artifacts/mobile-season.png).

## Limites

Os testes de celular usam emulação de viewport no Chromium, não aparelhos físicos. A tradução de textos narrativos extensos foi auxiliada por tradução automática e pode precisar de refinamento editorial. As regras e dados internos continuam em seu formato original.

**GitHub Pages não publicado nem verificado:** tanto `gh repo create` (GraphQL) quanto `POST /user/repos` (REST) foram recusados pela credencial conectada com `Resource not accessible by integration`; a chamada REST retornou HTTP 403. A conta foi identificada como `cassiano1994bi`. Nenhum projeto remoto existente foi alterado.

## Reprodução

```sh
npm ci
npx playwright install chromium
npm test
```

O teste de regressão usa o histórico Git herdado do original (`b04970d573a12c365674e725e5db37af7ba1f99a`); execute-o a partir de um clone completo, não do ZIP sem histórico. O teste de navegador (`npm run test:browser`) funciona também no ZIP e inicia seu próprio servidor local.
