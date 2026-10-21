# AVERO STUDIO · BORJÃO FITNESS — BUILD 03A.6

Data: 2026-10-21. Escopo exclusivo: contorno/posicionamento desktop dos cinco cards de planos e geometria do card de endereço; verificação do mascote oficial.

## Base, branch e referências

- Repositório `Urimash9/borj-o-fitness-demo`.
- Base local/remota confirmada: `build-03a5-refino-secoes-07-08-09`, HEAD `eea3a854b5bf9b2bc4122a91b055591757b0947a`; checkout inicial limpo.
- Branch criada diretamente da base: `build-03a6-planos-localizacao`.
- Preview efetivo da base confirmado no Vercel: https://borj-o-fitness-demo-40kooypuo-john-e7bd.vercel.app, READY, deployment `dpl_31ZLrGTq7mjVcZj7N36ACk7mzfJM`.
- Main preservada em `be80fed33551e8ef5f52aa56776d44bd399bf5ad`; nenhum merge ou alteração em produção.

Os três anexos desta rodada foram acessados: `1000037829.jpg` (rascunho), `1000037826.jpg` (screenshot do navegador Android) e `1000036219.jpg` (referência de localização). O rascunho foi priorizado para a distribuição dos planos. Seus seis espaços foram adaptados aos **cinco planos existentes**, sem sexto card. A referência anterior de Planos permanece no histórico e no comparativo arquivado da 03A.5; seu arquivo original não foi anexado novamente nesta rodada. A comparação com as referências é visual e geométrica, sem alegação de equivalência pixel a pixel.

Foram inspecionados `src/styles.css`, `src/render.mjs`, `src/content.mjs`, `src/main.js`, `src/media-slots.mjs`, scripts de verificação/build e o checkpoint 03A.5. Não foram encontradas instruções AGENTS adicionais.

## Diagnóstico

| Área | Causa inicial | Correção |
| --- | --- | --- |
| Planos | A guia `--progress-guide` forçava uma progressão única à esquerda, mesmo depois da dobra. O teste anterior exigia que todos os cards avançassem nessa direção | Guia removida; contorno calculado por card, com inversão no Semestral e retorno do Anual |
| Card de endereço | Superfície retangular de 35,5% da largura da seção, cantos uniformes e ações com texto pequeno | Superfície editorial mais larga, lateral diagonal, cantos suaves, título e ações maiores |
| Mascote | Único arquivo do personagem não possui canal alfa | Encaixe mantido; arquivo inadequado não aplicado |

Antes de implementar, um teste de geometria reproduziu a falha esperada: o Anual continuava à esquerda do Semestral. Capturas da base foram produzidas nas sete larguras exigidas.

## Planos: geometria implementada

- Preservados cinco planos, nesta ordem: Mensal; Mensal para parentes de 1º grau; 3 vezes por semana; Semestral; Anual.
- Preservados valores, descrições, ícones, links, divisão branca/grafite, destaque anual, tipografia, benefícios, textos e fotografia da lateral esquerda.
- Mantidos altura de `10.2cqw`, passo vertical de `11.7cqw`, início em `6.4cqw` e borda direita em `2cqw` da base.
- O limite mineral real do master 1536×1024 usa os pontos `(1080,0)`, `(768,640)`, `(832,768)` e `(704,1024)`.
- Nos três primeiros cards, os extremos superior/inferior seguem a diagonal, com folga planejada de 20px nativos.
- O Semestral acompanha a dobra dentro de seu próprio recorte. Sua borda começa mais à esquerda, avança à direita junto à inflexão e acompanha a mudança do limite mineral.
- O Anual utiliza posição derivada da dobra, com retorno à direita e um recorte próprio mais suave. Não há regra monotônica única nem margens individuais arbitrárias.
- `--card-left`, `--top-inset` e `--plan-contour` controlam cada peça. Os recortes atuam na superfície; não há skew/rotação de texto, preço ou ícone.
- No mobile, o bloco existente restaura o contorno de 14px e a coluna vertical. Nenhum offset desktop participa do posicionamento mobile.

Posição horizontal do vértice superior esquerdo em pixels CSS, após a alteração:

| Viewport | Mensal | Parentes | 3 vezes | Semestral | Anual |
| --- | --- | --- | --- | --- | --- |
| 1536 | 1052,07 | 964,46 | 876,85 | 789,23 | 859,83 |
| 1440 | 986,31 | 904,18 | 822,04 | 739,91 | 806,08 |
| 1280 | 876,73 | 803,71 | 730,71 | 657,70 | 716,53 |
| 1024 | 701,37 | 642,97 | 584,56 | 526,16 | 573,21 |

O retorno final é deliberado e corresponde ao rascunho. Em 1536px, todos os cards têm 156,67px de altura, intervalo de 23,05px e borda direita em 1505,28px. A folga mínima medida contra o limite mineral, incluindo larguras adicionais de QA e arredondamento subpixel, foi **19,96px nativos**.

## Localização: card e mascote

- Largura do card passa de `35.5cqw` para `39.6cqw`, mantendo sua ancoragem inferior direita.
- Superfície branca com lateral inclinada e cantos de curvatura suave. Uma definição SVG geométrica, sem imagem, recorta apenas o fundo do card; o conteúdo continua em HTML acessível e selecionável.
- Sombra discreta aplicada ao conjunto; padding acompanha a lateral diagonal e alinha círculo, nome e endereço à referência.
- Nome passa de `2.3cqw` para `2.45cqw`; texto das ações de `.83cqw` para `1cqw`. Os botões mantêm altura e destinos existentes, lado a lado no desktop.
- Endereço completo e texto “Fácil de encontrar. Pronta para receber você.” preservados.
- Mapa, fachada, diagonal, título, enquadramento, altura da seção, fade inferior e footer não foram alterados.
- O mobile conserva fundo, padding, borda, proporções e disposição da base. A máscara editorial desktop fica desativada nessa faixa.

Em 1280px, o card passa de **454,4×260,1px em (791,1; 430,4)** para **506,9×262,3px em (738,6; 428,2)**, medidos em relação ao início da seção. Isso aproxima o limite branco e a sobreposição da referência enviada sem alterar a fotografia.

**Mascote:** a inspeção encontrou `public/assets/mascote-referencia.png`, 220×170, modo RGB, sem alfa. Os demais PNG com transparência são logos. Não foi encontrado arquivo oficial isolado adequado. `map-mascot-slot` permanece preparado e a proteção que impede usar o personagem com fundo incorporado foi mantida. Não houve recorte improvisado, remoção de fundo, geração de personagem ou alteração de binário. **Pendência: fornecer o sapinho oficial com transparência real.**

## QA e preservação

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou |
| `npm run build` | Passou; nove seções, assets locais resolvidos |
| `npm run test:e2e` | Passou em 1536, 1440, 1280, 1024, 980, 768, 430, 390, 360 e 320px |
| Geometria dos planos | Cinco cards; abertura dos quatro primeiros, retorno do Anual, alinhamento direito, alturas/intervalos uniformes e contornos dentro do mineral |
| Dados e assets | 17 arquivos originais e 11 hashes WebP preservados; conteúdo comercial, preços e links intactos |
| Interações | Navegação, teclado/foco, seletor de modalidades, avaliações e swipe preservados; ações de Maps e WhatsApp corretas |
| Console / rede / overflow | Zero exceções JS, zero falhas locais de carregamento, nenhuma imagem quebrada, nenhum overflow horizontal ou de textos |
| CLS máximo observado | 0,00171 |

Preservação verificada em relação a `eea3a85`:

- HTML integral das seções 01–08, cabeçalho e footer idêntico à base. Removendo apenas a definição decorativa de máscara do contato, o HTML completo também coincide, comprovando conteúdo e links preservados.
- **839 regras CSS fora dos seletores dos cards permitidos idênticas**, incluindo media queries e declarações.
- **3.281 elementos visíveis** comparados nas sete larguras obrigatórias: delta de geometria **0px** e zero diferenças nos estilos computados das áreas protegidas.
- Nas seções 08/09 desktop, a comparação exclui somente os cards autorizados; fotografia, mapa, cabeçalhos, textos, benefícios, CTAs laterais e limites das seções permanecem iguais.
- Nas seções 08/09 mobile, a comparação inclui todos os componentes. Os seis screenshots dessas seções em 430, 390 e 360px também são **idênticos pixel por pixel à base**. Essa igualdade se refere à preservação mobile, não à referência artística.

A checagem inicial do retorno do Anual falhou na base, reproduzindo o problema pedido. Após a correção, a bateria completa passou. Não há falha técnica aberta nos testes executados.


## Arquivos e evidências

- `src/styles.css`: substituição das regras de posicionamento dos planos e refinamento das regras existentes do card de endereço; sem nova camada de overrides no fim da folha.
- `src/render.mjs`: apenas definição SVG decorativa da máscara dentro do card de endereço.
- `scripts/verify.mjs`: mede o polígono efetivamente renderizado, chevron, retorno do Anual, alturas, intervalos e alinhamento direito; mantém os testes existentes de dados, assets e funcionalidades.
- `docs/BUILD03A6-PLANOS-LOCALIZACAO.md`: este checkpoint.

Conteúdo, JavaScript de interação, media slots, package/lockfiles e todos os assets permanecem intactos. Evidências locais em `qa/build03a6/` (ignorado pelo Git, conforme convenção existente):

- `before/` e `after/`: 70 screenshots de cada estado nas sete larguras obrigatórias.
- `comparativos/planos-rascunho-antes-depois.png`: detalhe identificado do rascunho, base e implementação. Original integral preservado em `references/rascunho.jpg`.
- `comparativos/localizacao-referencia-antes-depois.png`: referência, base e implementação.
- `comparativos/desktop-antes-depois.png` e `mobile-antes-depois.png`, além dos pares individuais por seção/largura.
- `e2e/results.json`, `e2e.log`, `protected-html.json`, `protected-css.json`, `protected-parity.json`, `before-profile.json` e `after-profile.json`.

Pendências limitadas ao arquivo transparente do mascote e à homologação visual do usuário/dispositivo físico. O teste Chromium dos viewports virtuais não substitui uma conferência em Android real. Nenhum novo dado comercial precisa de confirmação nesta rodada.

## Commit e preview

- Código: [`dc5b5a8b0b3dc81151b05eaf0a2535b870ba6ce5`](https://github.com/Urimash9/borj-o-fitness-demo/commit/dc5b5a8b0b3dc81151b05eaf0a2535b870ba6ce5).
- Preview de código validado: https://borj-o-fitness-demo-20nz7i9dz-john-e7bd.vercel.app
- Deployment `dpl_4c6igVKTP8m53XXdCZDVKfXKeUog`, projeto `borj-o-fitness-demo`, branch `build-03a6-planos-localizacao`, **READY**, ambiente preview (`target:null`).
- Log remoto confirma clone do commit `dc5b5a8`, build de nove seções e conclusão da publicação.
- HTML e CSS remotos responderam **HTTP 200** pelo conector Vercel. CSS idêntico à fonte; HTML da aplicação idêntico ao build local, descontando apenas identificação de deployment e feedback inseridos pela plataforma. Confirmados nove containers de seção, cinco cards e a definição de recorte do contato.
- Checkpoint incluído em commit documental posterior na mesma branch, sem alteração da aplicação. Main, branch de origem, produção e configurações do projeto Vercel preservadas.

