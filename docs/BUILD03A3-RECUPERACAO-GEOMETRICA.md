# AVERO STUDIO · BORJÃO FITNESS — BUILD 03A.3

Data: 2026-10-20. Recuperação geométrica desktop das seções 01, 02, 03 e 08.

## Repositório, isolamento e publicação

- Repositório confirmado: `Urimash9/borj-o-fitness-demo`.
- Base remota confirmada e inspecionada: `build-03a2-ajustes-finos-home`, commit `dcd73f6aabec39c4915e76af3a3b45f293a33e35`. Checkout inicial limpo.
- Trabalho realizado exclusivamente em `build-03a3-recuperacao-geometrica`, criada diretamente dessa base.
- Código e verificações: [`3c51dedb12c8f52f05cbc55fce09d33ba185a743`](https://github.com/Urimash9/borj-o-fitness-demo/commit/3c51dedb12c8f52f05cbc55fce09d33ba185a743).
- Preview validado: https://borj-o-fitness-demo-q81m0l55a-john-e7bd.vercel.app
- Deployment: `dpl_HjeXmiBsw3mAcWWnhsX8hq5VaaV6`, **READY**, origem Git, branch 03A.3, ambiente preview (`target: null`). Projeto `borj-o-fitness-demo`, ID `prj_xw7raJi0nGiw8LqW0B2UfH0KHCUR`, equipe `team_TXZ3o2dVA2S7isr9yDS2uAZt`.
- HTML e CSS remotos responderam HTTP 200 via acesso autenticado do conector Vercel; HTML contém nove seções e os recortes SVG, e CSS contém o cálculo da diagonal desta build.
- A publicação ocorreu pela integração Git existente; nenhuma configuração do projeto ou de proteção foi alterada.
- `main` permaneceu em `be80fed33551e8ef5f52aa56776d44bd399bf5ad`. Base 03A.2 preservada. Sem merge, promoção para produção ou alterações em outros projetos.

O preview informado no pedido (`2kz639961`) corresponde ao código `c2d7e66`. Antes da execução, o preview mais recente efetivo era `5qx9946we`, referente ao HEAD `dcd73f6` da base. Ambos foram consultados; o URL antigo não foi usado como fonte do estado atual.

## Referências e limites de fidelidade

As quatro referências desktop anexadas foram acessadas: `1000036370.jpg` (Hero), `1000036208.jpg` (Academia), `1000036209.jpg` (Estrutura) e `1000036217.jpg` (Planos). Todas foram comparadas com capturas da base e da implementação ajustada. Os três primeiros anexos têm quadro 1280×720 e o de Planos, 1280×853.

Foram lidos `src/styles.css`, `src/render.mjs`, `src/main.js`, `src/media-slots.mjs`, `src/content.mjs`, os scripts de build/serve/verificação, o checkpoint 03A.2 e o histórico 03A.1/03A relevante.

**Há diferenças nos próprios masters em relação aos anexos.** Na Hero integrada, a fachada ocupa outra posição, o retrato é maior e mais alto, a academia superior e a cidade têm outra distribuição e o sapinho no canto inferior é diferente em tamanho/enquadramento. O master de Planos também tem uma diagonal mais à direita no topo e uma dobra inferior que não coincide com a referência final. Os equipamentos e enquadramentos de algumas imagens da Estrutura também diferem.

Essas diferenças não foram corrigidas por substituição de imagens, recortes que eliminassem elementos importantes ou novas camadas fotográficas. Não há alegação de fidelidade pixel a pixel. A geometria HTML/CSS foi aproximada da referência dentro dos limites dos assets existentes. A posição do badge da Hero preserva o rosto maior do master disponível, por isso não coincide exatamente com a referência.

Referências mobile independentes não estavam anexadas. A regressão mobile foi comparada diretamente com a implementação aprovada na branch-base.

## Diagnóstico da cascata e causas

| Seção | Regras efetivas na base | Causa observada |
| --- | --- | --- |
| Hero | 03A.2 aplicava `aspect-ratio:1672/941` e `contain`; H1 4,6vw, com variação em 761–1100px; padding e gradiente redefinidos nas builds anteriores | O quadro já preservava o master. Tipografia, CTAs e faixa de leitura ainda seguiam coordenadas diferentes; badge encobria parte do retrato |
| Academia | `min-height:780px`, 850px a partir de 1600px, altura também determinada pelo conteúdo e paddings; imagem herdava `cover`; cards 97–98% opacos | A altura efetiva superava a proporção do master, aumentando o corte lateral. O alpha quase opaco anulava o blur |
| Estrutura | Grid 2,15:1, duas linhas com mínimos de 205px e regra própria em 761–1100px; margens negativas, polígonos e vários raios sobrepostos | Proporção variava entre larguras; as três máscaras não compartilhavam uma geometria de junção |
| Planos | Coluna flex vertical, grid 49/51, paddings e margens individuais 13/7/0/7/13px | Deslocamento sem relação com a diagonal; imagem em `cover` mudava a localização efetiva da área mineral |

Foram retiradas **127 ocorrências de seletores desktop históricos** dessas quatro seções e reunidas as decisões desktop em um único bloco `@media (min-width:761px)`. As regras compartilhadas de base e os ajustes mobile existentes foram preservados. Os blocos históricos das demais seções não foram refatorados.

Não foram adicionados `!important`, dependências, aplicações, assets externos ou arquivos binários.

## Correções executadas

### 01 — Hero

- Mantido quadro 1672:941 e `object-fit:contain`, sem cortar as bordas, Fabrício ou a região inferior direita.
- Texto alinhado a 5,5% da largura; início vertical proporcional ao master; H1, eyebrow, descrição e CTAs recalibrados em conjunto, inclusive em 980px.
- Gradiente de leitura localizado à esquerda, com dissolução vertical para a cidade e horizontal antes da fachada; fundo mineral do CTA secundário controlado.
- Badge reposicionado em área que libera o rosto; distância mínima do topo evita colisão com a navegação em 980px.
- Texto, links, nota conceitual e mascote já incorporado ao master preservados. Nenhum segundo sapinho inserido.

### 02 — A Academia

- Seção no mesmo quadro 1672:941, sem mínimos desktop antigos. Asset inteiro em `contain`: interior, equipamentos, escada, mural e cidade visíveis.
- Texto e três cards ancorados em coordenadas proporcionais, sem fazer o conteúdo aumentar a altura da seção.
- Cards em faixa horizontal inferior, com inclinação de conjunto de −3° e skew controlado de −9°, compensado no conteúdo.
- Vidro grafite com alpha 66–76%, blur real de 16px, saturação reduzida, borda neutra e sombra discreta. Sem duplicação de fotografia dentro dos cards.
- Hierarquia de ícones/títulos e pequenos traços de separação refinados; textos e sequência mantidos.

### 03 — Estrutura & Ambientes

- Conjunto ampliado horizontalmente, com proporção **2,83:1**, próxima dos aproximadamente 1224×432px do grid na referência de 1280px.
- Grade proporcional compartilhada, primeiro card dominante e dois laterais empilhados. Removidas as margens negativas desktop.
- Três `clipPath` SVG com `clipPathUnits="objectBoundingBox"`, curvas quadráticas discretas no topo e junções diagonais coordenadas. Sem arredondamento genérico dos quatro cantos.
- Definições SVG sem área de layout, ocultas da árvore acessível e não focáveis. Recortes novos aplicados apenas no desktop.
- Legendas, links circulares e faixa de quatro ícones continuam em HTML. Títulos e demais textos existentes preservados, inclusive onde diferem da referência ilustrada.

### 08 — Planos

- Quadro 3:2 igual ao master 1536×1024; enquadramento estável em `contain`.
- Cinco cards em área posicionada, substituindo a coluna flex desktop e as margens individuais.
- Modelo geométrico do asset: diagonal superior de aproximadamente **(1080,0) a (768,640)**; limite da dobra passa por **(832,768)**. Unidades `cqw` mantêm as coordenadas relativas à seção.
- Para cada índice de plano são calculados topo, fim vertical, compensação do skew e o limite máximo da superfície mineral naquele intervalo. Uma guia derivada do vértice da dobra e da meia inclinação mantém o deslocamento progressivo nos cards inferiores.
- Respiro nominal de 20px nas coordenadas do master, escalado com a imagem. O teste amostra 25 pontos na borda esquerda de cada card; respiro mínimo medido próximo de 19,96–19,99px do master, considerando arredondamentos do navegador.
- Cards inteiramente na superfície cinza, com rostos livres. Coluna esquerda, benefícios e CTAs realinhados às proporções da referência.
- Os cinco nomes completos, valores, recorrências, mensagens de WhatsApp e destaque anual foram preservados. A menor largura mineral no topo limita a largura do primeiro card e o tamanho tipográfico possível com o conteúdo atual.

## Alturas medidas no navegador

Valores em pixels CSS, base → 03A.3; arredondamento apenas para apresentação.

| Viewport | Hero | Academia | Estrutura (seção inteira) | Planos |
| --- | --- | --- | --- | --- |
| 1536 | 864 → 864 | 889 → 864 | 855 → 866 | 854 → 1024 |
| 1440 | 810 → 810 | 879 → 810 | 833 → 814 | 846 → 960 |
| 1280 | 720 → 720 | 861 → 720 | 767 → 727 | 825 → 853 |
| 980 | 552 → 552 | 840 → 552 | 721 → 564 | 795 → 653 |
| 390 | 722 → 722 | 970 → 970 | 882 → 882 | 1175 → 1175 |
| 360 | 705 → 705 | 925 → 925 | 825 → 825 | 1160 → 1160 |

O aumento de Planos nas maiores larguras resulta da preservação da proporção 3:2 e do quadro completo. Na Academia, a redução em 980px elimina o enquadramento estreito e alto que cortava o master.

## Verificações e evidências

- `npm run lint`: **PASSOU**, exit 0.
- `npm run build`: **PASSOU**, exit 0; nove seções e footer, referências locais resolvidas.
- Build remoto Vercel: **PASSOU**, clonou `3c51ded`, executou `node scripts/build.mjs` e publicou o preview. Avisos não bloqueantes já existentes sobre `engines.node >=22` e configuração npm `cache-dir` foram registrados, sem mudanças fora do escopo.
- `npm run test:e2e`: **PASSOU**, exit 0, em **1536, 1440, 1280, 980, 768, 390, 360 e 320px**, Chromium headless.
- Sem overflow horizontal ou de títulos, botões e preços; 11 mídias aprovadas carregadas, sem fotos documentais antigas, exceções JavaScript ou respostas locais 404.
- Cinco planos e respectivos links/preços; menu mobile, Escape e retorno de foco; modalidades por clique/teclado; avaliações por botões, Home/End e swipe; âncoras e movimento reduzido verificados.
- SHA-256 dos 11 WebP do manifesto e hashes dos 17 arquivos públicos originais preservados.
- Geometria automatizada: proporção integral de Hero/Academia, grid horizontal, limites da seção e respiro mineral dos cinco cards, com progressão estrita das bordas esquerdas.
- Comparação base/final de **430 elementos visíveis por viewport mobile**, incluindo posições relativas, dimensões, fonte, cor, fundo, clip, máscara, transform, opacidade e blur: **zero diferenças** em 390 e 360px.
- Mesma comparação de **260 elementos fora do escopo** em 1536/1440/1280 e **257 em 980px**: **zero diferenças**. Posições na página naturalmente acompanham a nova altura das seções anteriores; a composição interna permanece igual.
- Capturas iniciais/finais das nove seções e footer nas seis larguras prioritárias; comparação lado a lado referência/base/final em 1280px inspecionada para as quatro seções.

O verificador antigo falhava em `11 !== 10`: esperava dez IDs de mídia, enquanto o render da própria base `dcd73f6` já produzia onze IDs distintos. A asserção foi corrigida para conferir o conjunto completo do inventário, sem modificar conteúdo ou mídia da aplicação. As larguras 1536/980 e os testes geométricos foram incorporados ao script existente.

Artefatos locais de QA ficam em `qa/build03a3/` (diretório já ignorado pelo Git): `before/`, `final/`, `before-geometry.json`, `final-geometry.json`, `parity.json`, `e2e/results.json` e os quatro arquivos `*-comparison.png`. Capturas e assets não foram incluídos como mudanças binárias no repositório.

Para repetir o E2E neste ambiente, após o build:

```bash
CHROMIUM_PATH=/usr/bin/chromium \
CODEX_PRIMARY_RUNTIME_NODE_MODULES=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules \
QA_DIR=qa/build03a3/e2e npm run test:e2e
```

O script inicia o servidor local se `BASE_URL` não for fornecido. Em outro ambiente, Playwright e Chromium precisam estar disponíveis. Não foi adicionada dependência de produção.

## Arquivos alterados e pendências

- `src/styles.css`: consolidação desktop e geometria das quatro seções.
- `src/render.mjs`: somente os três recortes SVG da Estrutura; conteúdo e interações preservados.
- `scripts/verify.mjs`: correção da asserção antiga, larguras adicionais e verificações geométricas.
- Este documento.

`src/main.js`, `src/content.mjs`, `src/media-slots.mjs`, todos os assets, seções 04–07/09 e footer mantidos.

O resultado está pronto para revisão visual do usuário. Permanece a diferença entre os masters integrados e as referências finais, especialmente na Hero e na diagonal/dobra dos Planos; equivalência exata exigiria outra rodada autorizada de assets. Não foram inventados detalhes ausentes nem removidos avisos de composição conceitual.

A emulação em 980px cobre a geometria do desktop virtual no Android; não substitui um teste físico no navegador Android. Chrome desktop foi executado; Safari e Firefox não foram verificados nesta rodada. Pendências anteriores de arte mobile vertical e de mascote transparente fora da Hero continuam fora do escopo.
