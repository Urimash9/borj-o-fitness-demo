# AVERO STUDIO · BORJÃO FITNESS — BUILD 03A.4

Data: 2026-10-20. Escopo exclusivo: 04 Modalidades, 05 Expansão e 06 Experiência e Acolhimento.

## Base e publicação

- Repositório: `Urimash9/borj-o-fitness-demo`.
- Base remota confirmada: `build-03a3-recuperacao-geometrica`, HEAD `83d838631a619723fe1790ada8db341436b3ecf8`; checkout inicial limpo.
- Branch criada diretamente dessa base: `build-03a4-refino-secoes-04-05-06`.
- Código: [`811c64078dc31a70d5f6a6447131649fe3740797`](https://github.com/Urimash9/borj-o-fitness-demo/commit/811c64078dc31a70d5f6a6447131649fe3740797).
- Preview de código verificado: https://borj-o-fitness-demo-2rcshq1l3-john-e7bd.vercel.app
- Vercel: projeto `borj-o-fitness-demo`, deployment `dpl_HTCrUXp9L1KsWByjy6ZH8BDAiNJx`, **READY**, origem Git, branch 03A.4, ambiente preview (`target: null`).
- O log remoto confirma o clone de `811c640`, a execução do build existente e nove seções com referências locais resolvidas. HTML e CSS remotos responderam HTTP 200 pelo acesso autenticado do conector; HTML contém nove seções, os quatro cards futuros e o agrupamento de máscara da obra.
- Nenhuma alteração na configuração do Vercel, proteção de acesso, produção ou outros projetos. Sem merge na `main`.

O preview efetivo da base antes desta rodada era `borj-o-fitness-demo-9is1k3auk-john-e7bd.vercel.app`, referente a `83d8386`, também confirmado no Vercel.

## Referências e estado inicial

Foram acessados os três anexos originais desta solicitação: `1000036210.jpg` (Modalidades, 1280×853), `1000036211.jpg` (Expansão, 1280×720) e `1000036213.jpg` (Experiência, 1280×720). Foram comparados com screenshots reais da base e da implementação ajustada.

Foram inspecionados `render.mjs`, `styles.css`, `content.mjs`, `main.js`, `media-slots.mjs`, scripts de build/servidor/verificação e documentação das Builds 03/03A, incluindo o checkpoint 03A.3.

| Seção | Problema inicial | Causa |
| --- | --- | --- |
| Modalidades | Fotografia isolada, título em duas linhas no desktop, apenas duas opções fotográficas ocultas na faixa inferior, lista lateral incompleta | A build 03A.1 definia a faixa como flex, mas a 03A.2 sobrescrevia `.modality-previews` com `display:none`; outra regra ocultava a faixa no mobile. Grid, altura, recorte e máscara da fotografia também eram redefinidos em vários pontos |
| Expansão | Frame estreito/arredondado, dissipação curta e borda cinza/escura na direita | A máscara atuava somente na imagem, enquanto `.construction-slot:after` ainda pintava um gradiente escuro até a borda do contêiner. A sombra permanecia visível onde a fotografia já estava transparente |
| Experiência | Altura fixa próxima de 690px nas larguras desktop, texto e foto em proporções variáveis, vidro e assinatura comprimidos; foto após todos os textos no mobile | Regras de alturas mínimas, colunas e padding históricas; a fotografia era fundo absoluto e o espaço visual mobile ficava depois do bloco que reunia apresentação, atributos e depoimento |

Foram removidas **261 ocorrências históricas de seletores** relacionados às três seções, substituídas por regras consolidadas de base e um bloco mobile, no lugar das definições anteriores. Não foi acrescentada uma camada de correções no fim da folha. Nenhuma variável global, fonte, estilo compartilhado de títulos/botões ou identidade foi alterada.

A classe `.expansion-badge` pertence à Hero e foi excluída da consolidação da Expansão. Uma colisão do filtro de nomes foi detectada durante o QA intermediário e corrigida antes do commit; suas regras finais coincidem com a base.

## Alterações por seção

### 04 — Modalidades

- Título horizontal no desktop, com espaço correto entre “Seu treino.” e “Seu ritmo.”; cabeçalho, seletor, imagem e informações usam o mesmo ambiente grafite.
- Seletor lateral, fotografia central dominante e informações à direita em grade assimétrica. Quadro fotográfico proporcional, recorte diagonal e dissipação curta nas bordas, preservando rosto, braços e equipamento do atleta.
- Musculação e Cardio utilizam exclusivamente seus assets aprovados. Os textos existentes das duas modalidades foram mantidos.
- Seis opções na lateral e seis cards horizontais inferiores, com número, nome e status explícito:

| Nº | Modalidade | Estado / comportamento |
| --- | --- | --- |
| 01 | Musculação | Disponível; selecionável |
| 02 | Cardio | Disponível; selecionável |
| 03 | Funcional | A confirmar; link para Expansão |
| 04 | Aulas coletivas | Em breve; link para Expansão |
| 05 | Piscina e natação | Em breve; link para Expansão |
| 06 | Quadra de areia | Em breve; link para Expansão |

- As quatro opções sem fotografia aprovada recebem composição editorial com fundo grafite, tipografia e ícones. Não reutilizam fotografias de outras atividades. Não há afirmação de piscina olímpica nem anúncio de abertura dessas opções.
- Apenas as duas modalidades abertas possuem semântica de tabs. As futuras são links, sem `aria-selected` ou comportamento de modalidade aberta.
- A função existente `selectModality` foi preservada: fotografia, alt, dimensões, título, descrição, índice e seleção continuam sincronizados. Foram adicionados anterior/próxima e teclado nos cards inferiores (setas, Home/End); clique, Enter/Space e teclado do seletor permanecem funcionais.
- Mobile: apresentação → fotografia → nome/descrição → opções → faixa inferior. Cards de 190×140px em rolagem horizontal contida, sem compactar as seis opções ou aumentar a largura da página.

### 05 — Expansão

- Cabeçalho e chamada final recalibrados; fotografia dominante à esquerda e três grupos com divisórias e alinhamento consistente à direita.
- Fotografia e sombra de leitura foram agrupadas em `.construction-picture`; **a mesma máscara alpha dissolve ambas**. O contêiner externo não pinta a antiga sombra até a borda.
- A imagem recebe espaço horizontal adicional para dissipar a opacidade antes dos textos. O fundo revelado é a própria superfície mineral da seção, sem um segundo gradiente para simular o fade.
- O arquivo de obra não contém transparência de borda nem “EM BREVE” incorporado. A chamada e seus complementos continuam em HTML, separados da máscara.
- Nenhum `filter:blur()` foi aplicado à fotografia ou à sua região de transição. O teste verifica `filter:none` no grupo e na imagem.
- Mobile: fotografia integral em quadro 3:2 dentro da largura interna, sem a máscara lateral desktop; sombreamento de leitura permanece junto à imagem. Título, fotografia, chamada, três grupos, botão e fechamento editorial mantidos.
- `mascote-referencia.png` é RGB, sem canal alfa. Nenhum outro PNG de mascote transparente adequado foi encontrado; os demais PNG são logos. A proteção `mascot()=>''` permaneceu intacta. Não foi inserido substituto, fundo preto, personagem novo ou desenho CSS.

### 06 — Experiência e Acolhimento

- Quadro desktop no aspecto 1672:941 do master, exibido com `contain`. Profissional, aluna e equipamento permanecem visíveis, sem deformação ou ampliação para preencher uma altura fixa.
- Área textual à esquerda dimensionada pela composição: rótulo, título, apresentação, atributos, depoimento e assinatura. Gradiente de leitura suave, sem apagar a fotografia central/direita.
- Depoimento de Charlles Henrique preservado literalmente em `blockquote`, com autoria identificada, superfície escura translúcida, blur de fundo de 9px, borda fina e detalhe azul discreto. Nenhuma avaliação, estrela ou nota foi criada.
- Um único elemento de imagem atende desktop e mobile. No mobile ele entra no fluxo após a apresentação e antes dos atributos, seguido do depoimento e assinatura; enquadramento em 76% horizontal preserva a dupla humana.
- Corpo mobile de 14px, depoimento de 14px, escala do título e espaçamentos consistentes. A fotografia não serve de espaço para sobrepor ou reduzir os textos.

## Geometria medida

Altura de cada seção em pixels CSS, base → 03A.4, arredondada para apresentação.

| Viewport | Modalidades | Expansão | Experiência |
| --- | --- | --- | --- |
| 1536 | 907 → 1025 | 873 → 877 | 690 → 864 |
| 1440 | 886 → 961 | 867 → 822 | 690 → 810 |
| 1280 | 817 → 855 | 849 → 731 | 690 → 720 |
| 980 | 761 → 655 | 822 → 564 | 690 → 552 |
| 390 | 911 → 1426 | 1234 → 1258 | 795 → 954 |
| 360 | 896 → 1424 | 1222 → 1252 | 797 → 931 |

Em 1280px, Modalidades e Experiência recuperam alturas próximas às referências fornecidas. O aumento mobile de Modalidades corresponde às seis opções agora expostas e aos cards legíveis; Experiência acomoda a fotografia antes de atributos/depoimento e textos maiores, sem comprimi-los sobre a foto.

## QA e proteção das demais seções

- `npm run lint`: **PASSOU**, exit 0.
- `npm run build`: **PASSOU**, exit 0; build original do projeto, sem dependências novas.
- `npm run test:e2e`: **PASSOU**, exit 0, em **1536, 1440, 1280, 980, 768, 390, 360 e 320px**, Chromium/Playwright.
- Sem overflow horizontal, títulos/preços/botões cortados, imagens quebradas, exceções JavaScript ou respostas locais 404. Maior layout shift observado: aproximadamente **0,00044**.
- Testes adicionais: seis nomes/status corretos, exatamente duas tabs, quatro cards futuros sem fotografia, faixa visível, seleção sincronizada por seletor/card/teclado, anterior/próxima e links futuros sem ativar modalidades inexistentes; máscara alpha desktop, ausência de blur na obra, reset da máscara no mobile, ordem vertical de Experiência e aspecto integral da fotografia desktop.
- Permaneceram os testes de navegação, menu/Escape/foco, avaliações, WhatsApp, preços, âncoras, movimento reduzido e geometria da build 03A.3.
- Na primeira execução ampliada, uma palavra longa em um título de Expansão excedeu a coluna em 320px. Foi corrigida com quebra de palavra localizada, mantendo a fonte; a execução final passou nas oito larguras.
- SHA-256 dos 11 WebP e hashes dos 17 arquivos públicos originais preservados; nenhuma imagem documental antiga solicitada.
- HTML de Hero, Academia, Estrutura, Avaliações, Planos, Localização, header e footer comparado diretamente com a base: **idêntico**.
- Geometria e estilos de **311 elementos visíveis protegidos em cada largura desktop** e **306 em cada largura mobile** comparados com a base: sem diferenças de estilo; zero diferença geométrica em 1536/1440/1280/390/360 e máximo de **0,00049px em 980**, decorrente do arredondamento de um elemento transformado de Avaliações. Tolerância usada: 0,01px. As posições internas foram comparadas relativamente às seções; as seções posteriores naturalmente acompanham a mudança de altura de 04–06.
- Contraste e foco revisados visualmente nas capturas. Isso não constitui auditoria completa WCAG.
- Screenshots das nove seções e footer nas seis larguras prioritárias; comparação referência/base/final em 1280px para 04/05/06; inspeção adicional de Cardio e rolagem da faixa em 980/390/360.

Artefatos locais, fora do commit e dos assets da aplicação, em `qa/build03a4/`: capturas `before/` e `final/`, três pranchas `*-comparison.png`, geometria inicial/final, `parity.json`, capturas adicionais de Cardio e `e2e/results.json`. As pranchas são evidências de comparação, sem criação ou substituição de referências.

Reprodução do E2E neste ambiente, após o build:

```bash
CHROMIUM_PATH=/usr/bin/chromium \
CODEX_PRIMARY_RUNTIME_NODE_MODULES=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules \
QA_DIR=qa/build03a4/e2e npm run test:e2e
```

O script inicia o servidor local quando `BASE_URL` não é informado. Em outro ambiente, Playwright e Chromium devem estar disponíveis. A verificação completa de navegador ocorreu localmente; o preview remoto teve branch/commit, build, HTML e CSS confirmados.

## Arquivos modificados

- `src/styles.css`: estilos consolidados das três seções; desktop e mobile.
- `src/render.mjs`: seis opções/cards, grupo de máscara da obra e ordem da imagem de Experiência. Demais funções de seção preservadas.
- `src/content.mjs`: inventário das seis opções, sem alterar os dois registros disponíveis ou dados comerciais.
- `src/main.js`: handlers de teclado dos cards e anterior/próxima, utilizando o seletor existente. Menu e avaliações não alterados.
- `scripts/verify.mjs`: verificações da nova interface, transparência, enquadramento e ordem mobile.
- Este documento.

`src/media-slots.mjs`, binários, logos, dados de contato, preços e condições permaneceram intactos. Nenhuma biblioteca ou aplicação foi adicionada.

## Limitações e pendências reais

- Os três anexos desktop foram acessados, mas não foram fornecidos os arquivos originais das referências mobile citadas. O mobile seguiu a direção textual desta solicitação e a base 03A.3; não se afirma comparação pixel a pixel com pranchas mobile ausentes.
- A referência de Modalidades usa fotografias de atividades futuras que não existem como assets aprovados neste repositório. Foram usados os cards editoriais expressamente solicitados. O asset de Cardio mostra esteiras, não a pessoa retratada na referência. O master de Musculação também tem enquadramento e detalhes diferentes.
- A fotografia de obra foi preservada, com recorte desktop ajustado ao quadro horizontal da referência; no mobile o master completo está visível. Não foram recriados letreiros, equipamentos ou instalações para aproximar os anexos.
- Continua pendente um PNG oficial transparente do sapinho, com cabeça e duas mãos no recorte correto. Sua ausência não foi contornada com outro personagem.
- Disponibilidade de Funcional e confirmação das instalações futuras continuam com a academia, sem novas promessas de serviços.
- QA executado em Chromium. Não houve teste físico no Android nem execução em Safari/Firefox. A largura virtual 980px foi efetivamente validada.
- O Vercel manteve avisos não bloqueantes já existentes de `engines.node >=22` e configuração npm `cache-dir`; não foram corrigidos fora do escopo.

Resultado implementado e pronto para revisão visual, sem alegação de equivalência pixel a pixel e sem merge automático.
