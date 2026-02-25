# Mato Real Manager

Aplicativo web para gerenciar times da liga Mato Real, focado em simulação de finanças, elenco e campeonatos, rodando 100% no navegador com suporte a PWA.

## Como executar

- Abra o arquivo `index.html` diretamente no navegador ou sirva a pasta `mato-real-manager` em qualquer servidor estático.
- No celular, você pode adicionar o app à tela inicial para ter a experiência de aplicativo instalado.

## Estrutura do projeto

A estrutura foi organizada em pastas para separar melhor cada parte do projeto:

```text
mato-real-manager/
  index.html           # HTML principal que carrega todo o app React
  README.md

  assets/
    icon.png           # Ícone principal do aplicativo (PWA e atalho)

  styles/
    colors.css         # Paleta de cores (CSS custom properties)
    main.css           # Estilos globais da interface

  scripts/
    emergency.js       # Função de limpeza emergencial do Firestore
    pwa.js             # Registro do service worker + lógica offline/iOS

  pwa/
    manifest.json      # Configuração PWA (nome, ícone, cores, start_url)
    service-worker.js  # Service Worker que força modo sempre online
```

## Etapas principais da aplicação

- Autenticação e acesso ao time
- Gestão de elenco (jogadores, posições, overall, fama)
- Sistema econômico (salários, valor de mercado, sócio torcedor, empresas)
- Campeonatos personalizados (criação, premiações, distribuição de prêmios)
- Notícias, eventos e loja de itens
- PWA e cache controlado pelo `service-worker.js`

## Tecnologias utilizadas

- React 18 (via CDN) com JSX processado pelo Babel Standalone
- Firebase Firestore (persistência em nuvem)
- Font Awesome para ícones
- PWA (manifest, service worker e ícone customizado)
