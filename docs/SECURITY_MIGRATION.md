# Migração de segurança pendente

O sistema original compara senhas no cliente e inclui acesso administrativo no código público. Isso continua sendo uma vulnerabilidade crítica. Mover arquivos, minificar JavaScript ou usar variáveis de ambiente no frontend não protege segredos. A configuração pública do Firebase também não substitui regras de autorização.

Nesta alteração, o armazenamento local passou a guardar apenas tipo e ID; sessões administrativas não são restauradas automaticamente. O perfil normal é recarregado do Firestore. Essas mudanças reduzem dados armazenados, mas **não autenticam o usuário no servidor**: um ID local ainda pode ser falsificado. Transações protegem contra concorrência acidental, não contra um cliente malicioso autorizado pelas regras atuais.

Não foram disponibilizadas as regras publicadas do Firestore, Firebase Authentication, funções de servidor ou acesso administrativo ao projeto. Não foi feita migração no banco real nem foram alteradas as credenciais dos jogadores.

Para completar a proteção sem perder contas ou mecânicas:

1. Exportar um backup e criar um projeto de homologação.
2. Criar identidades no Firebase Authentication e associar cada UID ao ID legado; oferecer redefinição de senha sem divulgar senhas existentes.
3. Separar os diretórios públicos dos dados privados; remover senhas dos documentos acessíveis aos clientes.
4. Migrar privilégios administrativos para claims atribuídas somente pelo servidor.
5. Executar compras, transferências, premiações, cirurgia e viradas de semana/temporada em funções autorizadas de servidor. Usar chaves de idempotência para impedir repetições, inclusive entre dispositivos.
6. Publicar regras com acesso negado por padrão e testar contas, profissões, dono do clube e administrador no Emulator Suite.
7. Migrar os clientes e rotacionar os acessos antigos em uma janela coordenada; só então remover o login legado.

Não publique regras improvisadas negando o acesso atual antes dessa migração: isso interromperia o jogo. O banco real e o projeto Firebase precisam ser configurados para concluir essa etapa.
