# ⚽ Career Legend Brasil

Edição independente em **português brasileiro** de [Career Legend](https://github.com/RandomProjects1234/career-legend), de RandomProjects1234 e colaboradores. Simulador de carreira no futebol, da base à aposentadoria, inteiramente no navegador.

**Publicação no GitHub Pages pendente:** o ambiente conectado não recebeu permissão para criar o repositório `cassiano1994bi/career-legend-brasil`. Não há endereço publicado e verificado nesta entrega local.

## Jogar localmente

Não é necessário compilar nem instalar dependências para jogar:

```sh
python -m http.server 3999
```

Abra `http://localhost:3999`. O jogo também pode ser aberto pelo arquivo `index.html`, mas o servidor local é recomendado para um salvamento consistente.

## Tradução e compatibilidade

- Interface, criação de jogador, notícias, treinos, partidas, contratos, transferências, entrevistas, mensagens, vida pessoal, premiações e aposentadoria recebem tradução local.
- O dicionário `pt-BR.json` tem a fonte das traduções; `locale-data.js` contém a mesma tabela para funcionar inclusive sem conexão. `locale.js` traduz apenas a apresentação, preservando os identificadores internos e os textos originais salvos.
- A tradução inicial foi auxiliada por tradução automática, com revisão de interface e terminologia do futebol. A grande variedade de textos narrativos pode se beneficiar de revisão editorial adicional.
- Nomes de jogadores, clubes e marcas são preservados. A moeda original continua sendo o euro.
- As regras, probabilidades, progressão e dados da simulação foram mantidos.
- Cinco espaços de carreira, salvamento automático semanal e migração do formato original permanecem disponíveis. Os dados ficam neste navegador e dispositivo, em `localStorage`, sob `career_legend_brasil_slot_1` até `career_legend_brasil_slot_5`. Isso evita sobrescrever o jogo original ou outros projetos do mesmo domínio. Salvos de outro site não são transferidos automaticamente entre domínios.

## Testes

O jogo não depende de Node.js. Ele é usado apenas nos testes:

```sh
npm ci
npx playwright install chromium
npm test
```

- Regressão contra o commit original: cinco temporadas completas para um atacante e um goleiro, com a mesma sequência aleatória. Comparação de todos os dados do jogo e salvamento, exceto notícias/notificações que têm formatação localizada.
- Navegador Chromium: criação, simulação, recarregamento do salvamento, isolamento de dados, contratos, transferência, mensagens, treino, redes sociais e partidas interativas.
- Telas em 1280, 390 e 320 pixels; caminhos relativos sob `/career-legend-brasil/`, como no GitHub Pages.

Consulte [TESTES.md](TESTES.md) e as capturas em `artifacts/`.

## Publicar no GitHub Pages

Use um repositório **novo e separado** chamado `career-legend-brasil`. Depois de enviar os arquivos para `main`, em **Settings → Pages**, selecione **Deploy from a branch → main → / (root)**. O arquivo `.nojekyll` já está incluído. Não é necessário processo de build.

O endereço esperado após publicação é `https://cassiano1994bi.github.io/career-legend-brasil/`; isso é uma previsão do endereço, não uma confirmação de que ele esteja publicado.

## Origem, licença e créditos

Base: `RandomProjects1234/career-legend`, commit `b04970d573a12c365674e725e5db37af7ba1f99a`.

**MIT License — Copyright (c) 2026 Career Legend contributors.** O arquivo [LICENSE](LICENSE) original foi preservado integralmente. A licença permite uso, cópia, modificação e distribuição, exigindo a manutenção do aviso de copyright e da permissão. O README original está em [README.upstream.md](README.upstream.md).

Nomes de clubes, competições e marcas são usados para identificação. Este é um projeto de fãs, sem afiliação ou endosso de clubes, ligas ou empresas.
