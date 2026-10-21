# Refatoração conservadora

Base: `9b3f279480b532650eeeb7faeed879fe367f2378`.

## Alterações

- Código antes concentrado em aproximadamente 13,8 mil linhas de HTML separado em telas, ações, regras e serviços.
- JSX compilado no build, sem Babel Standalone e sem downloads de React/Firebase por CDN em tempo de execução.
- Telas secundárias carregadas com React.lazy. O service worker também prepara os arquivos estáticos em segundo plano.
- Inscrições do Firestore ativadas por tela/perfil. No login, 7 inscrições em vez das 17 incondicionais anteriores. Os diretórios necessários ao login legado ainda são carregados integralmente.
- Referências de documentos inalterados preservadas; ofertas deixam de reiniciar sua inscrição quando outro campo do perfil muda.
- Logo de entrada em WebP: cerca de 339 KB em vez de 4,07 MB. O PNG original permanece no repositório.
- Ranking evita refazer filtros e cálculos de sócios dentro de cada comparação da ordenação.
- Compra em transação, validando estoque, saldo, preço, vendedor e limite diário de presentes com dados atuais. Consumo de itens, PIX, banco, doações e aprovação financeira rejeitam entradas desatualizadas nas operações protegidas.
- Formulário de configurações não remonta a cada atualização externa. Ordenações deixam de alterar os arrays recebidos.
- Correção de referências inexistentes: salvamento de estatísticas e encaminhamento do botão de cirurgia ao painel médico. As opções, custos e procedimentos médicos existentes foram preservados; não foi inventada uma cirurgia no hospital público.
- Histórico do chat limitado por consulta à cauda real, com no máximo 100 exclusões por limpeza.
- Cache estático versionado; requisições externas do Firebase não são interceptadas. O jogo continua exigindo conexão para operações.
- Removidos os arquivos de scaffold não utilizados, o script de emergência público que não era usado pela interface e as dependências versionadas. O reset administrativo existente permanece.

## Verificação

- 16 testes unitários aprovados, cobrindo sessão, inscrições, concorrência, presentes, saldos desatualizados, consumo repetido e limpeza de chat.
- Comparação estrutural das fórmulas e constantes em `src/game/` contra o código original: preservadas.
- Comparação de 19 telas em viewport móvel 390 × 844: login, clube, jogador, empresa, quatro profissões, imprensa, jornalista e nove áreas do jogo. Tolerância de menos de 1% dos pixels, com fontes/ícones externos bloqueados igualmente nas duas versões.
- 23 testes de navegador aprovados (19 comparações visuais e 4 interações), com inscrição/remoção de dados sociais, edição de configurações, sessão corrompida e compra completa com estoque, pagamento, entrega e fama.
- Build de produção gerado e servido estaticamente em um subdiretório; 46 arquivos de pré-cache conferidos.

## Limitações

Não há medição de FPS, latência nem custo de leituras no banco real. As reduções acima são de estrutura, tamanho e inscrições, não uma promessa de percentual de velocidade. Dados volumosos ainda exigem paginação/modelagem futura, especialmente os diretórios usados no login legado. As comparações visuais cobrem os estados listados, não todas as combinações possíveis nem o painel administrativo completo.

As regras do Firebase não foram auditadas. Segurança de servidor e idempotência global das viradas de temporada ainda exigem a migração descrita em `SECURITY_MIGRATION.md`. Nenhum teste acessa ou altera contas reais.
