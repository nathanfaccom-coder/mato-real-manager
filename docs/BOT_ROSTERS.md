# Preenchimento de elencos com bots (2.5.2)

Em ADM → Times / Elenco, selecione um clube ou todos os clubes ativos e use
**Preencher com bots**. O painel mostra a previsão e pede confirmação antes de
criar jogadores. SubADMs precisam da permissão `teams`.

O limite é 22 jogadores totais por clube. O preenchimento conta todos os jogadores
já vinculados, inclusive bots, e prioriza as posições ausentes de dois times de
11 (goleiro, laterais, zagueiros, volantes, meia, pontas e atacante). Nunca exclui
ou substitui jogadores existentes, nem modifica a escalação escolhida pelo técnico.
Times pendentes são excluídos. Elencos com 22 ou mais não são alterados.

Cada bot é um jogador normal para escalação e partidas, marcado `isBot: true` e
`[BOT]` no nome, com overall 45, atributos por posição, energia 100, aparência pixel
e número de camisa. Usa os uniformes do clube pela renderização normal. Não tem
senha e é excluído dos dois caminhos de login e da seleção de contas de jogadores.
O salário inicial é 500, sujeito aos pagamentos normais do jogo; não há compra
nem débito inicial. A criação não adiciona inteligência de gestão de conta: o
responsável pelo time continua escolhendo escalação e gerenciando o elenco.

Cada clube é salvo atomicamente por transação. Uma revisão no documento do clube
serializa duas operações simultâneas de preenchimento; em retry a consulta de
elenco é refeita no servidor. Outros fluxos legados de contratação não compartilham
esta trava: evite contratar/excluir atletas durante o preenchimento. Falha em um
clube não desfaz clubes anteriores; a mensagem informa o progresso e repetir a
operação só completa vagas restantes.

Nenhuma regra Firebase foi alterada. A verificação de permissão segue o painel
existente; coleções legadas ainda dependem das regras de segurança do projeto.
