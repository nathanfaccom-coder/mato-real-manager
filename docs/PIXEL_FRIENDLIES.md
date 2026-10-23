# Mato Real TV — primeira etapa (2.5.0)

## Uso

- No painel do clube, abra **UNIFORMES** e personalize casa, fora e goleiro. Cores de camisa, detalhes, calção, meião e quatro modelos. O ADM com permissão de times também pode editar pela TV.
- No painel do atleta, abra **PERSONAGEM**. Pele, cabelo, barba, mangas, chuteiras e número preferido usam o mesmo desenho na prévia e na partida. O cadastro inicial também oferece personalização. Novos atletas começam sem clube; a prévia usa uniforme neutro até a contratação.
- Abra **MATO REAL TV — AMISTOSOS**. ADM com permissão de campeonatos escolhe os clubes, confere os titulares e inicia uma prévia local ou transmissão compartilhada.
- São necessários um goleiro e dez atletas de linha disponíveis por time. A escalação salva é respeitada quando válida; vagas são completadas por posição/overall. Lesionados e energia abaixo de 25 são excluídos. Números duplicados recebem um número livre apenas naquele jogo.
- A partida inteira tem movimentação contínua, câmera TV/campo inteiro e tela cheia. Os 90 minutos são reproduzidos em seis minutos reais. Transmissões usam o horário de início salvo e o relógio do dispositivo; relógios incorretos causam diferença entre espectadores.
- Ao terminar, o registro permite rever a partida com pausa, busca e velocidade. Súmula inclui gols, assistências, chutes, defesas, cartões, notas experimentais e melhores momentos em texto.

## Escopo e persistência

Motor determinístico versão 1: um snapshot mínimo de 22 atletas, atributos, aparências, uniformes e uma semente gera os mesmos movimentos e eventos. Replays não consultam os elencos atuais. Nenhuma senha, foto enviada ou saldo entra no snapshot. `friendlyBroadcasts` guarda somente o snapshot e metadados; não há gravações por quadro nem streaming de vídeo. A tela consulta apenas os dez registros recentes. O registro continua no banco mesmo fora dessa lista.

A prévia local não escreve no banco. Transmitir cria um registro isolado. Não altera partidas oficiais, dinheiro, energia, classificação ou overall. Não exige novos serviços ou plano pago; usa as cotas existentes de Firestore/GitHub Pages.

## Limitações desta etapa

É um motor experimental simplificado, não uma reprodução completa das regras ou da física do futebol. Ainda não há impedimento, escanteios, substituições, lesões de partida, pênaltis ou acréscimos. Finalizações para fora reiniciam com o goleiro. As notas são uma fórmula inicial e não foram integradas à progressão.

A câmera e os sprites são originais do projeto. Não há narração/áudio nem integração com vídeos externos.

Não há agendador, notificação push, alteração automática de campeonatos ou evolução oficial. A transmissão é iniciada por ADM e cada navegador reconstrói o jogo; depois de criada, pode ser revista mesmo que ninguém tenha acompanhado ao vivo. A lista de recentes permite acesso por outros usuários.

As permissões de criação continuam sendo verificações de interface dentro da arquitetura legada. As regras públicas remanescentes do banco não oferecem proteção contra gravação direta em `friendlyBroadcasts`, `teams` ou `players`. Não usar esse motor para resultados oficiais antes da migração de autenticação/regras e da validação do equilíbrio.

## Validação

Testes de determinismo, limites das posições, equivalência entre gols e eventos/súmula, escalações inválidas, snapshot sem credenciais, aparência congelada, números únicos e contraste de uniformes. Fluxos de navegador cobrem prévia completa, gravação isolada, personalização e acesso de jogadores.
