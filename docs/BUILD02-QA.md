# Borjão Fitness — Build 02 / etapa 01 — QA e divergências

16/10/2026 · branch `build-02-base-visual-borjao` · base `b2aceb50db1d9f0965428bb6ab2f1df27605b21b`.

**Status: limpeza e slots preparados para revisão da estrutura. Não é aprovação final da direção de arte.** Nenhuma nova imagem gerada ou integrada; sem merge na main.

## Resultado técnico

- `npm run lint`: passou — sintaxe JS/MJS de fontes, registro de slots e scripts.
- `npm run build`: passou — HTML estático e módulos de runtime resolvidos, sem arquivo de mídia faltante.
- `GEOMETRY_BASELINE=qa/build02/geometry-base.json CHROMIUM_PATH=… npm run test:e2e`: passou nos tamanhos exigidos.
- Os **17 arquivos de public**, incluindo as 12 fotografias, 2 logos, mascote, fonte e licença, foram comparados por hash Git com a base: **intactos**. Nenhuma exclusão ou substituição em `public/assets`.
- Zero requisições das fotos documentais na navegação, no scroll e nas trocas de modalidades. Nenhum futuro nome de arquivo vira `src`, `srcset` ou URL de CSS.
- Permanecem somente os PNGs verificados de identidade/mascote como imagens carregadas. Nenhuma imagem quebrada e nenhuma exceção JavaScript.
- Dezoito slots registrados, dezessete no DOM por vez: as duas modalidades compartilham o mesmo painel e mudam texto, identificação e placeholder sem carregar foto.
- Planos, benefícios, reviews, contatos, navegação e registro original das fotos foram comparados com a base sem mudanças de conteúdo. O header, a função de avaliações e o Footer permanecem textualmente idênticos.

## Preservação de geometria e estilos

Antes da limpeza, foram capturadas medições da base em cinco tamanhos. A comparação usa 49 grupos de seletores (com as duas exceções internas de mapa descritas abaixo) — seções, headings, wrappers de mídia, grids, cards, botões, planos, logos e Footer — incluindo posições, dimensões, fonte computada, cor, background do container e clip-path. Há elementos repetidos entre grupos; a contagem abaixo representa medições, não elementos únicos.

| Viewport | Medições | Maior desvio nos frames/elementos medidos | Overflow lateral | Fotos antigas solicitadas |
| --- | ---: | ---: | ---: | ---: |
| 1440 px | 109 | 0 px | 0 px | 0 |
| 768 px | 109 | 0 px | 0 px | 0 |
| 390 px | 109 | 0 px | 0 px | 0 |
| 360 px | 109 | 0 px | 0 px | 0 |
| 320 px | 109 | 0 px | 0 px | 0 |

Os valores das declarações CSS preexistentes foram preservados; os seletores de foto foram estendidos para alcançar os slots. Os novos estilos pintam placeholders neutros e reservam a camada humana da Hero sem participar do fluxo. Isso comprova preservação da **base de implementação**, não equivalência fotográfica ou aprovação das referências PNG.

**Microajuste deliberado de QA:** no mobile, o link auxiliar de mapa foi levantado de `bottom:15px` para `43px`, dentro do mesmo frame, para não ficar parcialmente encoberto pela diagonal da fachada. A posição desse link auxiliar não faz parte da comparação de botões principais; a área do mapa, fachada, cartão, CTAs e altura da seção seguem intactos. O sapinho do mapa mobile foi deslocado para o canto superior esquerdo livre, para não cobrir o título do link em 320 px. Suas coordenadas x/y são a única exceção na comparação de posições dos mascotes; largura/altura e os outros três mascotes permanecem comparados. Identificações internas dos slots foram afastadas das áreas de texto/recorte.

## Interações verificadas

- Menu mobile: abrir, fechar por Escape, retorno de foco ao botão e fechamento ao navegar.
- Modalidades: clique e setas sincronizam nome, descrição, contador, seleção ARIA e slot. Sem criação de `img` ou URL vazia.
- Avaliações: anterior/próximo, Home/End e swipe mantêm os autores e as sínteses existentes. Sem novas estrelas ou transcrições.
- Todos os destinos de âncoras existem; WhatsApp mantém telefone correto, mensagem por contexto e preço correspondente em cada plano.
- Google Maps: links de abrir localização e traçar rota preservados. Visual do mapa temporariamente neutro; iframe removido nesta etapa para não depender de mídia externa.
- Foco visível, modo de movimento reduzido e decodificação das logos/mascote permanecem válidos.
- Não houve envio de mensagem, contratação, alteração de preço ou edição em outros projetos.

## Conferência visual por seção

| Área | Resultado desta etapa | Pendência para a próxima fase |
| --- | --- | --- |
| 01 Hero | Cinza-claro, fachada/cidade/ambiente como camadas de geometria preservada; espaço humano reservado atrás da fachada | Quatro mídias tratadas/recortes aprovados; nenhuma imagem humana adicionada |
| 02 Academia | Dark, salão/escada em diagonais, indicadores neutros e faixa urbana preservados | Três mídias tratadas |
| 03 Estrutura | Protagonista grande + duas secundárias, legendas, setas e quatro ícones preservados | Salão, pesos e cardio finais |
| 04 Modalidades | Faixa imersiva e seletor funcional, geometria do painel igual à base | Duas mídias finais no painel compartilhado |
| 05 Expansão | Grande slot editorial, EM BREVE em HTML, três grupos e sapinho na borda interna mobile | Cena de expansão, sem afirmar obra concluída |
| 06 Experiência | Fundo e slot humano preservados, ícones/copy intactos, sem avaliações | Profissional orientando aluno e ambientação derivável |
| 07 Avaliações | Sem mudança visual ou editorial na seção | Capturas/transcrições originais continuam pendentes; não inventadas |
| 08 Planos | Composição diagonal, cinco painéis, valores, benefícios e WhatsApp preservados | Cena humana tratada para o frame de fundo existente |
| 09 Localização | Fachada em slot diagonal, mapa neutro com sapinho, endereço/cartão/CTAs intactos | Fachada tratada e mapa real validado ou apoio conceitual identificado |
| Footer | Mesmo HTML, organização, dados, marcas e fade mineral→grafite | Sem nova foto obrigatória |

## Divergências e limites conhecidos

1. Os gradientes não reproduzem a iluminação, personagens e montagem das artes aprovadas. Esta etapa recupera a **base de mídia**, sem declarar fidelidade visual final.
2. O frame humano da Hero foi explicitado em camada absoluta porque não havia retrato na Build 01. Sua presença e recorte final precisam de direção de arte; não há rosto, nome atribuído ou nova pessoa fictícia.
3. Em Planos, a cena humana usará o frame de fundo atual; não foram abertas colunas novas nem movidos os planos para acomodá-la.
4. Expansão e Experiência mantêm placeholders herdados e o texto que informa a mídia ainda pendente. Não representam obras prontas ou equipe real.
5. O apoio visual do mapa está neutro, sem ruas, coordenadas ou pin geográfico inventados. Os links reais funcionam independentemente dele. O ponto no serviço ainda precisa de validação antes da etapa final.
6. Avaliações continuam em síntese editorial identificada, conforme registro V0.1; original literal/estrelas não comprovados não foram adicionados.
7. Logos e mascote preservados ainda têm as limitações de resolução/recorte da base. Crédito AVERO STUDIO permanece textual.

## Arquivos alterados

- `src/render.mjs`: troca das camadas fotográficas por slots, reserva humana da Hero, anotação dos slots já existentes e mapa temporariamente neutro.
- `src/styles.css`: extensão de seletores e placeholders; mesmas regras de geometria/tipografia, mais ajuste interno do link auxiliar do mapa.
- `src/content.mjs` e `src/main.js`: modalidades desacopladas de foto e atualização de slot/ARIA. Dados comerciais preservados.
- `src/media-slots.mjs`: novo registro estável de 18 mídias pendentes, 36 variantes planejadas, fontes nulas.
- `scripts/build.mjs`, `scripts/verify.mjs`, `package.json`: publicação do módulo, lint e testes da etapa.
- `docs/BUILD02-BASE-VISUAL-CHECKPOINT.md`, este relatório e `docs/MAPA_DE_MIDIAS_FINAL.md`: checkpoint, evidências e inventário. Documentos da Build 01 mantidos como histórico.

## Capturas e reprodução

Capturas por seção e página completa em 1440, 768, 390, 360 e 320 px, mais resultados JSON em `qa/build02/` (fora do git). O pacote de entrega contém essas capturas, as medições da base e os relatórios. `npm run test:e2e` precisa de Playwright e Chromium no ambiente; `GEOMETRY_BASELINE` é opcional para comparação com as medições capturadas antes da alteração.

**Aguardar aprovação da estrutura para iniciar geração ou integração de cenas tratadas.**
