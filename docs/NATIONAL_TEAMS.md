# Versão 2.3.0 — Inclusão das Seleções

## Acesso

- Entrada: selo verde atualizado e nacionalidade no cadastro de jogador.
- Menu inferior: deslize até **SELEÇÕES**. Todos podem consultar as seleções e os jogos.
- ADM: **SELEÇÕES — GERENCIAR TÉCNICOS**, dentro do Painel Administrativo.
- Técnicos nomeados: a mesma aba abre a sua seleção. O emprego no clube continua independente.

## Seleções e nacionalidade

Catálogo local de 211 associações filiadas à FIFA mais Mato Real (212). Fonte: https://inside.fifa.com/associations, consultada em 21/10/2026. Inclui Inglaterra, Escócia, País de Gales e Irlanda do Norte separadamente. Nomes exibidos em português; identificadores estáveis por região, com MTR para Mato Real.

O cadastro pede nacionalidade. Jogadores sem esse campo são tratados como Mato Real, sem migração automática no banco. O ADM pode corrigir a nacionalidade de um jogador ainda sem partidas/títulos internacionais e fora de convocação. Trocar de clube não altera a nacionalidade.

## Técnicos e convocação

Só o ADM nomeia, substitui ou remove técnicos; apenas profissionais ativos do tipo COACH. Um técnico não pode assumir duas seleções. A nomeação atualiza os dois lados em transação, preservando seu clube.

ADM ou técnico nomeado publica até 23 convocados da nacionalidade correspondente. A convocação aparece no perfil do atleta e nas notícias. O elenco tem 11 titulares distintos, com um goleiro, sem lesão ativa e com pelo menos 25 de energia. As formações são as mesmas já disponíveis no jogo. Uma convocação alterada limpa os titulares removidos e exige completar a escalação novamente.

## NPCs opcionais

Nenhum jogador é criado na instalação da atualização. No painel ADM, **Cadastros e NPCs → GERAR NPCs DE APOIO** cria um único grupo de 23 jogadores de nível inicial para a seleção selecionada, incluindo três goleiros. São agentes livres do jogo, não cópias de atletas existentes. O grupo não é regenerado por clique repetido. É preciso convocá-los e escalá-los depois.

## Amistosos e copas

O ADM agenda amistosos ou copas entre 2 e 16 seleções. A copa usa turno único de todos contra todos, uma rodada por semana. Após concluir todos os resultados, o ADM agenda a final dos dois melhores. Critérios: pontos, vitórias, saldo, gols e código da seleção. O último critério deixa empates absolutos determinísticos.

A agenda rejeita duas partidas da mesma seleção no mesmo dia e datas que já tenham jogos de clubes com data preenchida. Não altera o calendário dos clubes nem adivinha datas de partidas sem data cadastrada. Os jogos de seleção são exibidos em sua própria área. Ao criar posteriormente jogos de clubes, o ADM deve consultar também essa agenda.

A súmula é lançada pelo ADM a partir dos 11 titulares atualmente salvos de cada lado. Cada titular recebe uma partida internacional e gasta 25 de energia, como no processamento de partidas existente. Gols e assistências são informados na súmula; gols contra podem ficar sem autor. Não há simulação automática, substituições ou sorteio adicional de lesões nesta versão. Uma final empatada exige definir o vencedor dos pênaltis.

Estatísticas e títulos internacionais são separados dos clubes. O título vai aos convocados elegíveis da seleção campeã; reservas não ganham partida nem gastam energia. Não há salário, dinheiro ou overall extra por convocação. A transação impede reaplicar uma súmula concluída.

## Dados e testes

Novas coleções: `nationalTeams`, `nationalMatches`, `nationalCompetitions`, `nationalWindows`. Campos de jogador: `nationality`, `nationalTeamId`, `nationalStats`, `nationalTrophies`; campo de técnico: `nationalTeamId`. O reset ADM inclui as quatro coleções novas; a atualização não executa reset.

O catálogo é local. As inscrições novas só existem enquanto a tela de seleções está aberta; jogos recentes têm limite de 200 registros, e uma copa selecionada carrega seus próprios jogos. Nenhuma coleção real foi populada pelos testes.

Testes cobrem catálogo, nomeações concorrentes, elegibilidade, limite de convocados, escalação, preservação de contratos, NPCs sem duplicação, agenda, súmula idempotente, final e títulos. Os testes visuais antigos normalizam apenas o selo de versão e ocultam o novo cartão de carreira internacional; ambos têm verificações próprias na suíte nova.

As verificações do cliente não substituem regras do Firestore. A limitação da autenticação legada continua descrita em SECURITY_MIGRATION.md. Se as regras publicadas restringirem as novas coleções, a tela informa o erro; a configuração de servidor precisa autorizar os papéis corretos, sem liberar escritas indiscriminadas.
