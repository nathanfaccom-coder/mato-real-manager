# SubADMs gratuitos — versão 2.4.0

Usa Firebase Authentication E-mail/senha e Firestore no plano Spark, dentro das cotas gratuitas. Não exige Blaze, cartão ou Cloud Functions.

## Ativar

1. Mantenha E-mail/senha ativado em Firebase Authentication.
2. O principal é a conta de UID `NEXLYzsJfLPsTxzp3LKHKwaPhEZ2`. Entre em ADMIN no jogo com o e-mail e a senha dessa conta. A antiga senha fixa não concede mais acesso.
3. Em Firestore Database → Regras, substitua TODO o conteúdo pelo arquivo `firebase/firestore-subadmins-transition.rules` deste repositório e publique. Não adicione as regras abaixo de uma regra pública: qualquer regra permissiva sobreposta prevalece.
4. No jogo, entre em GERENCIAR SUBADMS. Informe nome, login, senha de pelo menos 12 caracteres e marque os módulos permitidos.
5. O auxiliar entra em ADMIN usando o login e a senha cadastrados. O principal pode alterar as permissões ou excluir o acesso. Alterações entram em vigor no painel aberto quando recebidas pelo Firestore.

O cadastro é bloqueado enquanto o teste anônimo detectar leitura pública dos perfis administrativos. A publicação no GitHub não publica regras no Firebase automaticamente.

## Permissões e limites

Oito módulos: times/jogadores, finanças/premiações, imprensa, empresas, comissão técnica, calendário, campeonatos/partidas e seleções. Botões de módulos não permitidos ficam desabilitados. Reset, manutenção global e gerenciamento de subADMs são exclusivos do principal.

Senhas novas ficam no Firebase Authentication, nunca nos documentos de perfis. O cadastro usa uma instância isolada de Auth para preservar a sessão do principal. Recarregar exige novo login administrativo e mantém o destino anterior.

Excluir remove o documento de autorização e revoga o painel. A identidade Auth permanece, pois o SDK cliente não pode excluir outra conta. Para liberar o mesmo login, o principal deve também remover sua identidade em Authentication → Usuários; o e-mail termina em `@subadmins.matoreal.invalid`. Essas identidades não recebem e-mails; recuperação por e-mail não se aplica.

## Limitação de segurança existente

As regras de transição protegem somente `adminProfiles`: apenas o principal gerencia; auxiliares leem somente o próprio perfil; visitantes não leem nem escrevem. Elas preservam o acesso público das demais coleções para não quebrar os logins antigos do jogo.

Portanto, as permissões dos módulos são restrições do painel, NÃO uma barreira contra requisições diretas ao banco do jogo. A proteção completa depende de migrar todos os usuários antigos para autenticação e escrever regras específicas para cada operação. Não apresente essa versão como proteção completa de finanças, jogadores ou reset contra acesso externo. Não habilite nenhuma cobrança para esta implementação.

## Verificação

Testes locais usam dados e Auth simulados, sem alterar o banco real: fluxos existentes, login principal, cadastro/edição/exclusão, bloqueio de cadastro com regras públicas, permissões e revogação em tempo real. As regras precisam ser publicadas e verificadas no console do projeto antes de cadastrar usuários reais.
