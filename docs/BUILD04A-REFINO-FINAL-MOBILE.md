# AVERO STUDIO · BORJÃO FITNESS — BUILD 04A

Data: 2026-10-22. Refino pontual mobile de Hero, rótulos, mascote da Expansão e depoimento principal.

## Base e isolamento

- Base local/remota confirmada e limpa: `build-04-integracao-assets-mobile`, SHA `0629a9c25552e792a035200ffbffc33ffaafc83f`.
- Branch de trabalho: `build-04a-refino-final-mobile`, criada diretamente da base.
- Main preservada em `be80fed33551e8ef5f52aa56776d44bd399bf5ad`. Sem merge ou publicação em produção.
- Código: [`641ef437782a8d2421c7696149a98c8c6d67a11e`](https://github.com/Urimash9/borj-o-fitness-demo/commit/641ef437782a8d2421c7696149a98c8c6d67a11e).
- Preview: **https://borj-o-fitness-demo-5z0ldnrf4-john-e7bd.vercel.app**.
- Deployment `dpl_5wD4UsJjAE8B7NEgmZ1d8yuVuYwL`: READY, preview (`target:null`), projeto, branch e SHA confirmados. Deploy automático após o push, sem mudança de configuração Vercel.

## Diagnóstico e alterações

### Hero mobile

Os três risquinhos eram spans do botão HTML real do header; não existiam no JPEG aprovado. Foram substituídos por um controle textual **Menu**, separado da arte, alinhado no header e com superfície mineral discreta. A navegação existente continua com abertura/fechamento, teclado, Escape e retorno de foco; não foi criado outro menu.

A microlegenda inferior da Hero foi ocultada somente até 760px, incluindo as duas frases solicitadas. Logo, fotografia, composição, enquadramento, título, descrição, CTAs e selo de expansão foram preservados. Nenhum pixel dos fundos aprovados foi alterado; não houve tratamento quente, filtro de cor ou nova imagem.

### Numeração das seções

O helper de eyebrow separa número e texto em spans. Somente o span numérico fica oculto no mobile; a linha gráfica, o texto, a tipografia e os espaçamentos CSS permanecem. Desktop mantém a numeração original.

A alteração alcança os oito rótulos de Academia a Localização. A Hero conserva “Há mais de 15 anos”. Paginação do carrossel, índices de modalidades/cards e grupos internos da Expansão permanecem, pois cumprem funções diferentes dos rótulos de seção.

### Mascote da Expansão

- Original recebido: `1000038298.png`, 2200 × 715, RGBA com alfa real de 0 a 255.
- Arquivo versionado: `public/assets/borjao/expansao/mascote-espiando.png`.
- SHA-256: `053336e2fb1fbcd4f844c1834ead1f86e4bcced7d508248d3554fba310b98cbf`.
- Copiado byte a byte, sem recorte, regeneração, remoção de fundo ou alteração de cor/identidade. Inspeção sobre fundo claro confirmou transparência adequada.
- Posicionado discretamente na borda superior da fotografia interna, com olhos/cabeça e mãos do próprio PNG. O componente fica oculto no desktop.
- `IntersectionObserver` observa a mídia da Expansão para a entrada acontecer quando esse trecho se torna visível. Após a primeira interseção, desconecta o observer, aguarda a imagem decodificar e executa uma entrada de 540ms.
- O estado final permanece no DOM durante a página carregada. Voltar pelo scroll ou redimensionar não repete a animação. Recarregar inicia um novo ciclo.
- Com `prefers-reduced-motion:reduce`, o mascote aparece estático. Sem IntersectionObserver, permanece visível sem animação. Nenhum storage persiste o estado entre carregamentos.

A pendência do PNG próprio para esta aplicação, registrada na Build 04, está resolvida.

### Depoimento principal

O contorno mobile da superfície branca passou a usar um caminho SVG proporcional, com diagonais contínuas e transições pequenas nas quinas. A placa grafite ganhou contorno mais limpo e deslocamento controlado para a esquerda/baixo; a sombra continua discreta.

A altura passou de 238px para um intervalo responsivo de 222–238px: em 390px fica em 222px. Foram recalibrados margem esquerda, espaço das aspas/tópico, escala e entrelinha da frase e respiro inferior. O texto e a autoria permanecem dentro dos limites do recorte nas quatro entradas do carrossel.

Autores, sínteses, legenda editorial, traço, aspas decorativas, paginação, setas e lista não foram substituídos. Controles e lista mantêm estilos e geometria interna; apenas acompanham o fluxo do card mais baixo. Os dados existentes não possuem classificação de estrelas verificada, portanto nenhuma nota foi inventada.

## Preservação e QA

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou |
| `npm run build` | Passou; todos os assets reais resolvidos |
| `npm run test:e2e` | Passou em 1536, 1440, 1280, 1024, 980, 768, 430, 390, 360 e 320px |
| Capturas antes/depois | 1440, 430, 390 e 360px |
| Numeração | Oculta apenas no mobile; linha/texto e numeração desktop preservados |
| Hero | Sem as três barras e microlegenda; menu real funcional; fundo aprovado intacto |
| Mascote | Original transparente carregado, proporção preservada, posição final visível |
| Animação | Uma entrada em 360/390/430px; duas reentradas por scroll sem repetir; resize sem repetir; reload permite nova entrada |
| Acessibilidade de movimento | Zero animações com movimento reduzido; fallback estático sem IntersectionObserver |
| Avaliações | Quatro entradas com margens de texto preservadas; altura estável entre entradas; lista, teclado e swipe funcionais |
| Assets e dados | 17 arquivos públicos originais, 11 WebPs, quatro JPGs mobile e PNGs oficiais anteriores preservados; novo PNG com hash verificado |
| Console/rede | Zero exceções JS ou respostas locais de erro na bateria final; imagens decodificadas |
| Layout | Sem overflow horizontal ou textual; CLS máximo observado 0,00167 |
| Vercel | HTML, CSS, JS e PNG HTTP 200; HTML/CSS/JS idênticos ao build local, descontando apenas metadados/feedback Vercel; PNG servido como `image/png` com 1.127.584 bytes |

**Desktop:** 502 regras fora dos breakpoints mobile foram comparadas e mantêm declarações equivalentes, normalizando somente o seletor da linha do eyebrow e excluindo os novos elementos decorativos ocultos/keyframes inativos. A geometria e os estilos computados dos elementos existentes permaneceram iguais. Das dez capturas em 1440px, sete são idênticas pixel a pixel; as outras três diferem somente em poucos pixels de glifos dos rótulos, com diferença média máxima de 0,00174 por canal em escala 0–255. Não houve alteração de layout, fotografia, componentes ou conteúdo desktop.

**Áreas protegidas:** 2.086 elementos visíveis comparados em desktop e nos três mobiles, excluindo apenas os elementos modificados pelo escopo: delta máximo de geometria 0px e estilos computados idênticos. O comparativo inclui controles/lista de avaliações em suas coordenadas internas, preservando seu desenho apesar da mudança de altura do card anterior. Estrutura, Modalidades, Experiência, Planos, Localização e footer mantêm composição, conteúdo e funções; apenas seus eyebrows perdem o número no mobile, quando aplicável.

A validação usou Chromium; não houve homologação em dispositivo físico ou Safari/iOS. O arquivo completo da referência mobile de Avaliações não acompanha esta remessa, que trouxe somente o PNG do mascote. O refino mantém a linguagem editorial já documentada e a implementação aprovada, sem alegação de comparação pixel a pixel com um arquivo mobile não disponível.

## Arquivos e evidências

- `src/render.mjs`: rótulos separáveis por breakpoint, controle real de Menu, componente do PNG e definição do recorte do depoimento.
- `src/styles.css`: alterações mobile nos pontos solicitados; linha gráfica com seletor específico; regras dos novos elementos decorativos e animação.
- `src/main.js`: entrada única do mascote, estado final e respeito a movimento reduzido/fallback.
- `scripts/verify.mjs`: verificações dos rótulos, Hero, hash do PNG, margens das quatro avaliações e ciclo real da animação.
- `public/assets/borjao/expansao/mascote-espiando.png` e `docs/assets-build04a/MASCOTE-EXPANSAO.json`: asset e origem.
- `docs/BUILD04A-REFINO-FINAL-MOBILE.md`: este checkpoint.

Evidências locais em `qa/build04a/`, ignorado pelo Git conforme convenção: `before/`, `after/`, `comparativos/`, `e2e/results.json`, `e2e.log`, `protected-css.json`, `protected-parity.json`, `desktop-raster.json` e `deployment-verification.json`.

Screenshots principais: `after/390/inicio.png`, `after/390/expansao.png`, `after/390/avaliacoes.png` e `after/390/estrutura.png`. Comparativos lado a lado em `comparativos/*-antes-depois.png`.

Este checkpoint é commitado separadamente na mesma branch e não altera a aplicação do preview validado. Nenhum merge na main.
