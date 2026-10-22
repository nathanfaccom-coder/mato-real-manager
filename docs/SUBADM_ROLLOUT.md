# SubADMs — base em desenvolvimento, não publicada

## Estado

O proprietário informou o UID `NEXLYzsJfLPsTxzp3LKHKwaPhEZ2` após habilitar E-mail/senha no Firebase Authentication. A implementação não verificou diretamente essa conta no projeto. O UID é público e não serve como credencial: `requireAccess` só pode receber identidade extraída de um token validado pelo servidor, nunca do corpo de uma solicitação.

`server/admin/policy.js` e `service.js` implementam a política e o serviço independentes do provedor de hospedagem, com uma interface compatível com Firebase Admin Auth. Ainda NÃO há endpoint, integração ao painel ou regras de produção novas. O site continua na versão 2.3.1.

## Contrato preparado

- Somente o UID principal pode criar, listar, editar permissões e excluir subADMs.
- Cadastro: nome de exibição, login único, senha de 12 a 128 caracteres e lista explícita de permissões. Login sem e-mail real usa alias interno `login@subadmins.matoreal.invalid`, sem prometer recuperação por e-mail.
- Permissões: times, jogadores, finanças, campeonatos/partidas, seleções, imprensa/notícias, empresas, comissão e calendário. Sem seleção, nenhum acesso privilegiado.
- Reset, manutenção global e gestão dos administradores são exclusivos do principal; não são permissões delegáveis.
- Senhas seguem diretamente para Authentication; não devem ser retornadas, registradas em logs ou gravadas no Firestore.
- Permissões são mantidas em custom claims do Authentication, que só o servidor pode alterar. O serviço recarrega a conta no servidor em cada ação: token antigo não conserva permissões removidas.
- Criar primeiro desativado e habilitar somente após salvar claims. Excluir primeiro desativa e revoga sessões; falha na exclusão não reabre acesso.
- A UI deverá desativar funções não permitidas, mas toda operação precisará da mesma autorização no servidor.

## Bloqueio concreto de publicação

As capturas fornecidas mostram regras Firestore `allow read, write: if true` e plano Spark. O jogo escreve diretamente no Firestore e verifica senhas antigas no navegador. Mesmo um serviço de gestão de contas protegido NÃO protege essas escritas atuais.

Não integrar subADMs à produção antes de:

1. Definir hospedagem das operações privilegiadas. Cloud Functions for Firebase exige plano Blaze com faturamento; não ativar nem contratar sem decisão do proprietário. Outro servidor confiável é possível, mas requer integração e credenciais próprias; não é uma solução pronta no projeto atual.
2. Implementar endpoints que validem tokens Firebase e chamem `requireAccess` antes de qualquer mutação. Não confiar em UID, tipo de conta ou permissões enviados pelo cliente.
3. Migrar login e operações de jogadores/clubes para identidade autenticada e regras restritivas, preservando os fluxos econômicos existentes. Não substituir regras por bloqueio total sem adaptar o jogo.
4. Conectar o painel à gestão, login e verificações no servidor, remover a senha administrativa embutida e definir recuperação do proprietário.
5. Testar regras no emulador: anônimo, jogador, subADM sem permissão, subADM autorizado, token de conta excluída, promoção indevida, principal e mecânicas existentes.
6. Fazer backup, preparar uma publicação coordenada de código e regras e validar a conta principal antes de abrir o recurso aos auxiliares.

Esta branch NÃO altera Firebase, senhas ou dados reais, não adiciona dependências faturáveis e não contém credenciais de servidor.

## Validação executada

Cinco testes unitários com Auth simulado verificam bloqueio de não proprietários, privilégios desconhecidos, revogação de permissões, exclusão com sessão existente, proteção do principal e falhas parciais. Eles não substituem integração real ou testes de regras.

Referências oficiais:
- https://firebase.google.com/docs/auth/admin/manage-users
- https://firebase.google.com/docs/functions/get-started
- https://firebase.google.com/docs/rules/rules-behavior
