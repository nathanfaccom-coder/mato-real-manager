# Mato Real Manager

Jogo de gestão da liga Mato Real: clubes, jogadores, comissão técnica, empresas, imprensa, transferências, campeonatos e economia. React 18 e Firestore, com suporte a PWA.

## Desenvolvimento

Use Node.js 22.18+ e npm:

```sh
npm ci
npm run dev
```

Abra `http://localhost:5173/app.html`. O ambiente de desenvolvimento normal usa o Firebase configurado em `src/services/firebase.js`; use os testes com dados fictícios para experimentar operações sem atingir o jogo real.

## Onde editar

| Caminho | Responsabilidade |
| --- | --- |
| `app.html` | HTML fonte |
| `src/App.jsx` | Sessão, navegação e composição das telas |
| `src/components/` | Telas e componentes visuais |
| `src/actions/` | Operações por área: contas, jogadores, mercado, finanças, competições e administração |
| `src/game/` | Fórmulas, preços, tabelas e regras do jogo |
| `src/services/` | Firestore, sessões, compras, transações e chat |
| `src/hooks/` | Inscrições nos dados em tempo real |
| `styles/` | Estilos originais e complementos extraídos do HTML |
| `tests/` | Regressão de regras, operações concorrentes e comparação visual |

## Build e publicação existente

```sh
npm run build
npm run preview
```

O build gera `dist/` e também atualiza `index.html`, `build/`, `service-worker.js` e `.nojekyll` na raiz. Esses arquivos gerados são versionados para preservar a publicação atual pelo GitHub Pages. **Edite os fontes; não edite o `index.html` gerado.** Inclua os arquivos gerados no mesmo commit dos fontes.

Sirva `dist/` ou a raiz por HTTP(S). Abrir o HTML por `file://` não é suportado. Dependências são instaladas por `npm ci`, sem versionar `node_modules`.

## Testes

```sh
npm test
npx playwright install chromium
npm run test:e2e
```

Os testes visuais compilam o HTML do commit original `9b3f279480b532650eeeb7faeed879fe367f2378` e o comparam com a versão modular usando o mesmo banco fictício. É necessário manter esse commit no histórico local (`git fetch --unshallow` em clones rasos). As chamadas externas são bloqueadas nos testes; nenhum dado real é escrito. Fontes e ícones externos ficam indisponíveis nas duas versões durante a comparação.

Neste ambiente, o navegador foi executado com `PW_DISABLE_TS_ESM=1` e `PLAYWRIGHT_CHROMIUM_EXECUTABLE` apontando para um Chromium local. Essas opções não são necessárias em uma instalação normal com os navegadores do Playwright.

## Limites conhecidos

As sessões legadas ainda não constituem autenticação segura de servidor. A refatoração mantém as contas existentes funcionando. Leia [a migração de segurança pendente](docs/SECURITY_MIGRATION.md) e [o relatório técnico](docs/REFACTOR_REPORT.md).
