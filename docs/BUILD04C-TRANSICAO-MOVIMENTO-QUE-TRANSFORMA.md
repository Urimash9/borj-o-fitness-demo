# Borjão Fitness — transição mineral aprovada

Data: 2026-10-22.

## Base e isolamento

- Repositório: `Urimash9/borj-o-fitness-demo`.
- Base remota confirmada e limpa: `build-04b-transicao-hero-academia`, SHA `1e115eea9dd34ed6abee3aa80560141d337bbeb9`.
- Branch de refinamento: `build-04c-transicao-movimento`.
- Commit de implementação: `a40bc03ae8fb418f7d75137eacca0d7914b68ffb`.
- Main preservada em `be80fed33551e8ef5f52aa56776d44bd399bf5ad`, sem merge ou deploy em produção.

## Referência e implementação

A quarta proposta aprovada foi fornecida em `1000038340.jpg`, screenshot mobile de 720 × 1280px. A faixa de referência ocupa aproximadamente 79px nessa largura. Ela orientou as cores, o recorte diagonal discreto entre dois cinzas, o traço azul e a escala/posição da frase.

A divisória anterior `.academy::after`, incluindo sua adaptação mobile e seu detalhe azul inclinado, foi removida integralmente. Em seu lugar, um único `div.hero-academy-transition` fica entre as seções existentes. A frase **MOVIMENTO QUE TRANSFORMA** permanece em um parágrafo HTML, acessível e selecionável.

O CSS cria uma superfície `#eef0f3` e uma segunda superfície `#e4e6e9`, separadas por uma diagonal longa e discreta. Um traço azul horizontal de 3px fica centralizado acima do texto. A tipografia usa a fonte já carregada, grafite, caixa alta e espaçamento entre letras. Não há sombra, iluminação, filtros, textura acrescentada, animação ou nova imagem.

No desktop, a faixa tem 64px. No mobile, segue `clamp(40px, 11vw, 64px)`: 40px em 360px, 42,890625px em 390px e 47,296875px em 430px, próxima da proporção da referência. O texto mobile tem 6px e tracking de `.3em`; o traço azul mede aproximadamente 28–34px nas três larguras.

A faixa ocupa seu próprio espaço entre os quadros fotográficos completos, sem sobrepor imagens ou conteúdo. Hero, Academia e demais seções mantêm suas alturas individuais. A Academia e o conteúdo seguinte apenas passam a começar depois da nova faixa; sua geometria interna permanece intacta.

## Arquivos alterados

- `src/render.mjs`: inserção do único bloco da transição entre Hero e Academia; funções das seções preservadas.
- `src/styles.css`: substituição das regras antigas pela composição mineral e seus ajustes mobile, junto às regras existentes.
- `docs/BUILD04C-TRANSICAO-MOVIMENTO-QUE-TRANSFORMA.md`: este checkpoint.

Nenhum asset, texto das seções, preço, botão, card, link, JavaScript ou teste do projeto foi alterado. Permanecem nove seções semânticas e o footer.

## Validação

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou |
| `npm run build` | Passou; assets locais resolvidos |
| `npm run test:e2e` | Passou em 1536, 1440, 1280, 1024, 980, 768, 430, 390, 360 e 320px |
| Capturas antes/depois | 1440, 1280, 430, 390 e 360px |
| Preservação | 2.855 elementos existentes comparados; alturas das seções e estilos preservados, geometria interna com tolerância de 0,001px para arredondamento de transformações |
| Texto e composição | Uma frase HTML, centralizada; traço azul pequeno; dois cinzas; pseudo-elemento grafite antigo ausente |
| Responsividade | Sem overflow horizontal, frase sem corte ou conflito com conteúdo |
| Funcionalidades | Menu, modalidades, carrossel, swipe, teclado, contatos e planos passaram na bateria existente |
| Assets | Imagens decodificadas e hashes aprovados preservados |
| Console/rede | Sem exceções JS ou erros locais na bateria final |
| Preview | READY, HTML/CSS/JS HTTP 200 e iguais ao build local, descontando somente metadados/script de feedback acrescentados pelo Vercel ao HTML |

Foi produzido um comparativo do recorte da referência, normalizado para 390px, com a faixa implementada. O screenshot enviado contém somente a direção mobile; o desktop aplica a mesma composição com escala discreta. Não se declara correspondência pixel a pixel com uma referência desktop inexistente nesta remessa. Validação em Chromium; sem homologação em dispositivo físico ou Safari/iOS.

Evidências em `qa/build04c/`, ignoradas pelo Git conforme convenção: `before/`, `after/`, `comparativos/`, `preservation.json`, `transition-checks.json`, `e2e/results.json`, `e2e.log` e `deployment-verification.json`.

Screenshots principais: `after/1440/juncao.png` e `after/390/juncao.png`. Comparativos: `comparativos/1440-antes-depois.png`, `comparativos/390-antes-depois.png` e `comparativos/referencia-transicao-390.png`.

## Preview

**https://borj-o-fitness-demo-3twsy447a-john-e7bd.vercel.app**

Deployment `dpl_42aNYLh7mV8JmGeRAah3VVpFiorX`: READY, preview (`target:null`), projeto `borj-o-fitness-demo`, branch e SHA de implementação confirmados. Publicado pela integração Git existente.

Este checkpoint é commitado separadamente na mesma branch e não altera a aplicação validada. Nenhuma pendência de implementação identificada neste escopo.
