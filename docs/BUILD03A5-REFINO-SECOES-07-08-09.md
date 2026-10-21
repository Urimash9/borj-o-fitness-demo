# AVERO STUDIO · BORJÃO FITNESS — BUILD 03A.5

Implementação e QA: 2026-10-20. Retomada e entrega: 2026-10-21. Escopo: 07 Avaliações e Confiança, 08 Planos e Matrícula e 09 Localização e Contato.

## Base e isolamento

- Repositório: `Urimash9/borj-o-fitness-demo`.
- Branch de origem verificada, local e remota: `build-03a4-refino-secoes-04-05-06`, HEAD `82ffc32e09345c4fe61ba05258417f1b02101ce9`; checkout inicial limpo.
- Nova branch criada diretamente dessa base: `build-03a5-refino-secoes-07-08-09`.
- Preview efetivo da base confirmado no Vercel: https://borj-o-fitness-demo-dtzja009l-john-e7bd.vercel.app, deployment `dpl_6Qj1tKbSGL9vwrbMigjz68t5FLrA`, READY, commit `82ffc32`.
- Nenhum merge, alteração na main, produção, configuração Vercel ou outro projeto.

## Evidência e diagnóstico inicial

Foram lidos `src/render.mjs`, `src/styles.css`, `src/content.mjs`, `src/main.js`, `src/media-slots.mjs`, os scripts existentes e os checkpoints das Builds 03/03A, incluindo 03A.3 e 03A.4.

Os três arquivos anexados foram acessados: `1000036215.jpg` (07, 1280×640), `1000036217.jpg` (08, 1280×853) e `1000036219.jpg` (09, 1280×720). Capturas reais antes/depois nas sete larguras obrigatórias serviram à comparação de composição e geometria. Não é uma homologação pixel a pixel. Não foram encontrados arquivos originais de referências mobile neste checkout; nessa faixa foram preservados o conteúdo e a direção descrita pelo usuário.

| Seção | Estado anterior | Causa |
| --- | --- | --- |
| 07 | Cabeçalho começava muito à esquerda e com escala menor; superfície principal alta, autoria afastada e lista desproporcional | Grid e padding históricos, altura mínima e `margin-top:auto` na autoria; regras mobile adicionais mudavam o mesmo componente |
| 08 | Progressão inferior muito pequena; preços pequenos em relação às superfícies; texto/ícones dependiam de compensar o skew do card | Offset combinava a diagonal com uma guia conservadora da dobra do master; superfície inteira inclinada e filhos com transformações inversas |
| 09 | Quadro variava de altura, escala menor do título, ações pequenas dentro do contato e composição mobile sem separar as áreas de mapa e fachada | `cover`, alturas/margens negativas em regras sucessivas e sobreposição do cabeçalho com o contêiner da imagem |

Foram retiradas **322 ocorrências de seletores históricos** das três seções e substituídas por regras consolidadas no lugar das definições antigas. A folha mantém os estilos globais e das áreas protegidas. Há um bloco de adaptação até 760px e ajustes mínimos até 370px. Não foram introduzidos `!important`, biblioteca, dependência ou arquivo de imagem.

## Correções implementadas

### 07 — Avaliações

- Cabeçalho editorial e área interna de 75% da seção no desktop, aproximando início, escala e respiro da referência.
- Superfície branca larga, com recortes assimétricos moderados, camada grafite deslocada para a esquerda e sombra discreta no conjunto. Autoria segue o texto sem distribuição vertical artificial.
- Lista direita mantém numeração, autoria, síntese e acesso em linhas, sem cards individuais. Controles ficam abaixo do depoimento principal.
- Quadro, controles e altura da lista permanecem estáveis ao percorrer os quatro registros.
- Mantidos o JavaScript e as interações existentes: anterior/próximo, indicadores, seleção na lista, setas, Home/End e swipe.
- Mobile preserva título → introdução → depoimento → controles → outras avaliações. Tipografia principal legível, menos vazio interno e recortes proporcionais.

**Autenticidade:** as quatro sínteses e autorias atuais foram preservadas, com identificação explícita de síntese editorial e link para os registros completos. Não foram criadas transcrições, avaliações, notas ou estrelas. O [registro de fontes V0.1](briefing/BORJAO_REGISTRO_DE_ATIVOS_E_FONTES_V0_1.md) cita Pedro Borges apenas como “reconhecimento local” e pede checagem de autoria/texto antes de publicar. Isso não comprova o comentário literal da referência; Ubiratan Guimarães não foi substituído. A diferença de extensão dos textos em relação à arte impede reproduzir exatamente sua mancha tipográfica sem inventar conteúdo.

### 08 — Planos

- Master 1536×1024 preservado em quadro 3:2 com `contain`; fotografia e personagens não foram alterados.
- Sistema proporcional usa unidades do contêiner, índice da linha, altura e intervalo constantes. O limite mineral foi mapeado nos pontos nativos `(1080,0)`, `(768,640)`, `(832,768)` e `(704,1024)`.
- Cada contorno considera o limite na parte superior, inferior e na dobra intermediária, além de uma guia progressiva derivada da mesma dobra. Folga mínima de 20px nativos; nenhum deslocamento por margens arbitrárias.
- A referência e o master não têm exatamente o mesmo limite: a dobra do master na altura dos planos intermediários exige uma progressão diferente de uma reta única. Os contornos respeitam a região mineral efetivamente disponível.
- Recortes diagonais nas superfícies, sem skew no link, ícone ou texto. Área branca de identificação, círculo do ícone, área grafite de preço e ação circular preservados.
- Cards mais largos, preços com maior destaque e recuos inferiores progressivos. Plano anual mantém a mesma arquitetura com borda azul discreta e fundo escuro ligeiramente mais luminoso.
- Mobile mantém cinco cartões verticais, preços e recorrência legíveis, ações próprias e inclinação limitada à decoração. Fundo fotográfico perde opacidade antes de terminar, evitando borda horizontal seca.
- Benefícios, CTAs e dados confirmados preservados em HTML. Corrigido o espaço entre “seu” e “plano” quando a quebra desktop é removida no mobile.

**Validação comercial resolvida:** o quinto plano, **3 vezes por semana — R$149,99/mês**, consta no briefing antigo e no manifesto V3. Como a instrução inicial desta rodada questionava sua confirmação, a versão intermediária o identificou como pendente. Em resposta explícita nesta execução, o usuário confirmou: **“Confirmado: R$149,99 por mês”**. A versão entregue apresenta a mensalidade normalmente; os cinco planos, valores, descrições e mensagens originais permanecem intactos. Não há pendência comercial sobre esse plano nesta entrega.

### 09 — Localização

- Quadro desktop 16:9, escala do título e posição da fachada/mapa mais próximas da referência. Imagem mantém escala uniforme e largura integral; o ajuste vertical seleciona o quadro sem deformar o master 3:2.
- Tratamento claro localizado na área textual evita palavras sobre árvore/faixa azul; a transição inferior pertence somente à seção 09. Footer não recebe estilos novos.
- Card branco generoso na região inferior direita, borda sutil, raio suave e elevação discreta. Ícone, nome/endereço, divisor, texto auxiliar e duas ações horizontais foram recalibrados.
- Mobile organiza título/introdução → mapa → fachada → contato sobreposto. Duas janelas CSS do **mesmo master aprovado** permitem essa ordem; a cópia decorativa do mapa fica oculta à acessibilidade. Não há mapa externo, iframe ou nova fotografia.
- Google Maps continua acessível no marcador e no botão Traçar rota. WhatsApp, endereço completo e dados reais foram preservados.
- O mapa é identificado como ilustrativo. Avisos de composição conceitual mantidos.

**Mascote:** o único arquivo de referência do personagem é RGB, sem alfa; os PNG transparentes disponíveis são logos. A proteção que impede usar um mascote não validado permanece intacta. O mapa possui uma área vazia preparada em HTML/CSS, sem substituto, retângulo preto ou personagem inventado.

**Limite do asset:** a arte integrada de localização tem proporção 3:2, enquanto a referência enviada é 16:9 e inclui mascote/detalhes cartográficos ausentes no master. O enquadramento recorta uma faixa superior e uma pequena faixa inferior, preservando a largura da fachada, suas entradas e o mapa. Não se declara equivalência integral entre esses arquivos nem se alterou o binário para simular detalhes ausentes.

## Validação e evidências

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou |
| `npm run build` | Passou; nove seções semânticas e referências de assets resolvidas |
| `npm run test:e2e` | Passou em 1536, 1440, 1280, 1024, 980, 768, 430, 390, 360 e 320px |
| Overflow / títulos, ações e preços | Nenhum overflow de página ou texto detectado |
| Console / rede local | Zero exceções JavaScript, zero respostas locais 4xx/5xx; todas as imagens decodificadas |
| Assets e dados | 17 arquivos originais e os 11 hashes WebP do manifesto preservados; conteúdo e dados comerciais idênticos à base |
| Avaliações | Quatro seleções, indicadores, lista, anterior/próximo, Home/End e swipe; altura do quadro, controles e lista estáveis |
| Planos | Cinco cards dentro da seção e do limite mineral, progressão de recuos, preços legíveis, mensagens e links corretos; foco de teclado conserva o recorte |
| Contato | Proporção desktop 16:9, card sobreposto inferior direito, ações alinhadas de 360px em diante, mapa precedendo fachada no mobile |
| CLS máximo observado | 0,00171; abaixo do limite 0,1 do teste |

A folga planejada dos planos é de 20px no master; o mínimo medido em todas as larguras desktop do E2E foi **19,96px nativos**, considerando arredondamento subpixel.

**Ocorrências resolvidas durante o QA:** a execução intermediária encontrou texto do WhatsApp ultrapassando o botão em 320px, largura adicional à matriz solicitada. Ações passam a quebrar em duas linhas de botões quando não há espaço; em 360px e acima permanecem lado a lado. Outra passagem detectou quatro regras residuais de `.reviews-grid`; foram removidas, restaurando proporções consistentes nas larguras intermediárias. O teste de foco foi ajustado para iniciar por Tab e avaliar foco de teclado real. A bateria completa foi repetida e passou após as correções. Não há falha técnica aberta nesses testes.

### Preservação das áreas protegidas

- HTML das seções 01–06, cabeçalho e footer **idêntico** ao da base `82ffc32`.
- Comparação via CSSOM: **654 regras fora das seções 07–09 idênticas**, incluindo suas condições de media query e declarações.
- Geometria e estilos computados de **2.433 elementos visíveis** comparados nas sete larguras obrigatórias: **delta máximo 0px e zero diferenças de estilo** nas áreas protegidas.
- Nenhuma alteração em logos, contato, imagens, conteúdo comercial, scripts de interação existentes ou estrutura do footer desktop/mobile.

### Capturas e comparação

Foram conservadas 70 capturas anteriores e 70 finais das nove seções e footer, nas sete larguras exigidas. Os comparativos abaixo usam screenshots reais; a coluna de referência desktop contém os anexos consultados durante a implementação. Após a retomada do ambiente, os caminhos temporários dos anexos originais não estavam montados, mas os comparativos já produzidos e as capturas permaneceram disponíveis.

- Desktop, referência / antes / depois: `qa/build03a5/comparativos/desktop-referencia-antes-depois.png`.
- Mobile, antes / depois: `qa/build03a5/comparativos/mobile-antes-depois.png`.
- Comparativos individuais: `qa/build03a5/comparativos/{avaliacoes,planos,contato}-{desktop,mobile}.png`.
- Relatório funcional: `qa/build03a5/e2e-final/results.json` e `e2e-final.log`.
- Paridade: `protected-html.json`, `protected-css.json` e `protected-parity.json`.

Altura das seções em pixels CSS, antes → depois. O aumento mobile em 08 preserva leitura dos cinco planos; em 09 permite a ordem mapa → fachada → card solicitada, sem comprimir os elementos.

| Viewport | Seção 07 | Seção 08 | Seção 09 |
| --- | --- | --- | --- |
| 1536 | 751 → 761 | 1024 → 1024 | 938 → 864 |
| 1440 | 745 → 714 | 960 → 960 | 877 → 810 |
| 1280 | 715 → 637 | 853 → 853 | 773 → 720 |
| 1024 | 696 → 518 | 683 → 683 | 831 → 576 |
| 430 | 993 → 1026 | 1163 → 1359 | 740 → 1038 |
| 390 | 986 → 1026 | 1175 → 1398 | 713 → 1025 |
| 360 | 982 → 1020 | 1160 → 1398 | 704 → 973 |

## Arquivos modificados

- `src/styles.css`: consolidação e geometria responsiva exclusiva das seções 07–09.
- `src/render.mjs`: superfície interna dos planos e janelas/mapa/card de contato; funções das seções protegidas mantidas.
- `scripts/verify.mjs`: amplia larguras e verifica contornos dos planos, estabilidade das avaliações e contato, mantendo a verificação dos dados e assets originais.
- `docs/BUILD03A5-REFINO-SECOES-07-08-09.md`: este checkpoint.

`src/content.mjs`, `src/main.js`, `src/media-slots.mjs`, package/lockfiles e todos os assets permanecem intactos. Screenshots e relatórios estão em `qa/build03a5/`, ignorado pelo Git, como nas builds anteriores; nenhum binário foi incluído no commit.

## Pendências e homologação

1. Receber asset oficial transparente do sapinho para o mapa.
2. Receber os comentários originais verificáveis caso se deseje substituir sínteses por citações e confirmar Pedro Borges.
3. Homologação visual do usuário e conferência em dispositivo Android real. Chromium testa os viewports virtuais; não equivale a uma sessão física Android ou Safari/iOS.
4. Referências mobile originais e diferenças de proporção/conteúdo dos masters continuam limitando a comparação exata.

## Commit e preview

- Commit de código: [`e8bd55788dc5701b34554e5b34c5eb3cb83c9e62`](https://github.com/Urimash9/borj-o-fitness-demo/commit/e8bd55788dc5701b34554e5b34c5eb3cb83c9e62).
- Preview de código: https://borj-o-fitness-demo-a1103jpyc-john-e7bd.vercel.app
- Deployment: `dpl_GWVjNoBehSdCQzMVZsqdhortWCV3`, projeto `borj-o-fitness-demo`, branch `build-03a5-refino-secoes-07-08-09`, **READY**, ambiente preview (`target:null`).
- O log remoto confirma clone do commit `e8bd557`, build das nove seções e conclusão da publicação.
- HTML e CSS remotos respondem **HTTP 200** pelo acesso autenticado do conector Vercel. CSS publicado idêntico à fonte; HTML da aplicação idêntico ao build local, excluindo somente identificação do deployment e script de feedback acrescentados pelo Vercel. Confirmados nove containers de seção, cinco superfícies de planos, janela de mapa mobile e ausência de marcador comercial pendente.
- Este checkpoint é incluído em um commit documental posterior na mesma branch. O preview acima identifica o código validado; o commit documental não altera a aplicação.
- Main permanece em `be80fed33551e8ef5f52aa56776d44bd399bf5ad`; branch-base permanece em `82ffc32e09345c4fe61ba05258417f1b02101ce9`.

