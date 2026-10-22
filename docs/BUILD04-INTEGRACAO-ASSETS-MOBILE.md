# AVERO STUDIO · BORJÃO FITNESS — BUILD 04

Data: 2026-10-22. Integração dos quatro fundos mobile aprovados, com conteúdo funcional em HTML e desktop preservado.

## Base, branch e publicação

- Base confirmada local/remotamente: `build-03a9-mobile-localizacao-assets`, SHA `91c22180cc5d9d6d5a9889967942feb80839ca8e`.
- Preview efetivo da base consultado: https://borj-o-fitness-demo-n89d3ao8s-john-e7bd.vercel.app, READY, SHA `91c2218`.
- Branch criada diretamente da base: `build-04-integracao-assets-mobile`.
- Main preservada em `be80fed33551e8ef5f52aa56776d44bd399bf5ad`; sem merge, promoção a produção ou alteração de outros projetos.
- Código: [`52c86377ab836fc30ca16e4802ac48ee093708b9`](https://github.com/Urimash9/borj-o-fitness-demo/commit/52c86377ab836fc30ca16e4802ac48ee093708b9).
- Preview: **https://borj-o-fitness-demo-4wd9s3f7s-john-e7bd.vercel.app**.
- Deployment `dpl_BCWYwDLaUb4GQFdSpLZPZ7EjfaRa`, projeto `borj-o-fitness-demo`, READY, preview (`target:null`), branch e SHA confirmados. Publicação automática após o push; nenhuma configuração Vercel alterada.

## Inspeção e classificação dos anexos

Os quatro JPGs são fundos sem títulos, preços, botões, menus ou cards de interface. Não são screenshots completos para usar como página. A Hero inclui uma logo no canto superior e marcas/mascote na própria composição; as demais imagens incluem apenas as marcas já presentes no cenário fotográfico. Esses elementos foram preservados, sem duplicação artificial.

| Anexo original | Asset versionado em `public/assets/borjao/mobile/` | Dimensões | Uso |
| --- | --- | --- | --- |
| `1000037980.jpg` | `borjao-hero-mobile.jpg` | 853 × 1280 | Hero: cidade, academia, fachada e Fabrício |
| `1000037981.jpg` | `borjao-academia-mobile.jpg` | 720 × 1280 | Academia: salão, escadaria, mural e cidade |
| `1000038036.jpg` | `borjao-planos-mobile.jpg` | 720 × 1280 | Planos: fotografia vertical dedicada |
| `1000038255.jpg` | `borjao-localizacao-mobile.jpg` | 720 × 1280 | Localização: mapa, borda curva, folhas e fachada |

Todos foram copiados **byte a byte**, mantendo a extensão real, resolução, cores e enquadramento. Sem conversão, nova imagem, remoção de elementos ou iluminação adicionada. Hashes e origem em `docs/assets-build04/MANIFESTO_ASSETS_MOBILE.json`, verificados no E2E. Os quatro arquivos somam 483.154 bytes.

Esta remessa contém fundos limpos, sem novos mockups completos das interfaces mobile de todas as seções. A comparação visual confronta os fundos aprovados com o enquadramento implementado e os elementos HTML descritos no briefing; não constitui alegação de fidelidade pixel a pixel a um mockup completo inexistente na remessa.

## Estado inicial e causas

- Hero, Academia e Planos ainda enquadravam masters desktop no mobile; as variantes verticais estavam pendentes no registro de mídia.
- A localização da 03A.9 usava um `data-mobile-src` para um WebP ainda ausente. A ativação por preload dependia desse arquivo e mantinha o fallback anterior quando ele falhava; o fundo aprovado não estava integrado.
- Vários blocos históricos mobile controlavam Hero, Academia e footer. As regras dos componentes alterados foram consolidadas em um único bloco mobile, preservando as regras desktop e as dos componentes protegidos.
- O depoimento principal tinha altura fixa de 280px. A integração precisava reduzir essa verticalidade sem alterar avaliações nem o carrossel.

## Alterações por seção

**01 — Hero:** `<picture>` seleciona o JPG vertical até 760px. O quadro acompanha a proporção 853:1280, com imagem completa e `object-fit:contain`. Título, eyebrow, descrição, CTAs, selo de expansão e aviso conceitual permanecem em HTML. A logo do cabeçalho fica visualmente oculta no mobile para não duplicar a logo do próprio fundo; o link acessível para início e o menu único continuam presentes e funcionais. Nenhum segundo sapinho foi inserido.

**02 — A Academia:** aplicado o fundo 9:16 completo. Textos ficam à esquerda, com leitura escura neutra que conserva escadaria e mural à direita. Três cards em uma linha, com inclinação controlada, fundo grafite de alta cobertura e `backdrop-filter:blur(20px) saturate(.5)`, sem duplicar fotografias dentro dos cards. Cidade e sinalização inferior preservadas.

**03 e 04:** Estrutura e Modalidades mantêm HTML, imagens, recortes, faixa de ícones, navegação e controles. Musculação/Cardio continuam disponíveis; Funcional permanece a confirmar e as demais novidades, em breve.

**05 — Expansão:** composição, fotografia, chamadas e informações preservadas. Não foi aplicado um recorte improvisado do mascote; ver pendência de pose abaixo.

**06 — Experiência:** fotografia, conteúdo, atributos e avaliação preservados.

**07 — Avaliações:** superfície principal mobile passa de 280 para 238px, ficando mais horizontal nas larguras solicitadas. Recortes, margens internas, placa grafite deslocada e sombra refinados. Autores, sínteses editoriais e controles mantidos; nenhum texto transformado em citação literal ou nova avaliação. A altura permanece estável nas quatro entradas do carrossel.

**08 — Planos:** fonte vertical dedicada, sem recorte do master desktop. A introdução reserva área para os personagens antes dos cards. Ordem: introdução → cinco planos → benefícios → botões. Cards HTML com superfícies branca/grafite e destaque azul do Anual; sem deformação de tipografia ou ícones. Preços e condições preservados, incluindo 3 vezes por semana confirmado pelo usuário a R$149,99/mês, Semestral R$149,99/mês e Anual R$139,99/mês, ambos recorrentes no cartão.

**09 — Localização:** substituída a preparação por uma fonte real em `<picture>`, sem preload opcional, classe de prontidão ou arquivo inexistente. O JPG mantém mapa, borda curva, folhas sobrepostas e fachada. Título, descrição, selo Coromandel, PNG oficial do mascote, halo, plaquinha oficial, card e links continuam separados em HTML/CSS. O conjunto do mascote usa coordenadas relativas à área do mapa. Card generoso sobre a parte inferior, sem comprimir a fotografia; endereço e destinos reais intactos. Aviso de composição ilustrativa preservado.

**10 — Footer:** adaptação mobile da composição desktop, com marca/apresentação acima e navegação/contatos em duas colunas. Preservados logo, conteúdo, redes, contatos, links e assinatura AVERO. Sem uma segunda composição de localização ou novos dados.

## Implementação e arquivos

- `src/media-slots.mjs`: quatro variantes mobile reais, dimensões, status e hashes; fontes e hashes desktop intactos.
- `src/render.mjs`: helper de mídia com `<picture>/<source>` responsivo; retirada da imagem opcional vazia da localização. Textos, ícones, CTAs e cards existentes preservados.
- `src/main.js`: removido somente o preload da cena ausente da 03A.9. Menu, modalidades, avaliações, teclado e swipe não foram alterados.
- `src/styles.css`: regras mobile consolidadas dos componentes em escopo; sem mudança de estilos desktop. Wrapper de `<picture>` usa `display:contents` para preservar a geometria existente.
- `scripts/build.mjs`: valida também os caminhos reais dos `srcset`, impedindo build com asset ausente.
- `scripts/verify.mjs`: hashes dos anexos, seleção nativa por breakpoint, ausência de downloads dos quatro masters desktop no mobile, proporções integrais, fonte sem filtro de cor, cards da Academia, margens do depoimento, ordem dos planos e contenção do marcador. Capturas usam Chromium em renderização de software para evitar falhas intermitentes de pintura do ambiente.
- Quatro JPGs e manifesto de origem versionados. Dependências, conteúdo comercial, identidade e imagens anteriores preservados.

## QA e preservação

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou |
| `npm run build` | Passou; nove seções e todos os caminhos reais de imagens/fonts/srcset resolvidos |
| `npm run test:e2e` | Passou em 1536, 1440, 1280, 1024, 980, 768, 430, 390, 360 e 320px |
| QA solicitado | Capturas reais antes/depois em 360, 390, 430 e 1440px |
| Desktop 1440px | Dez screenshots de seções/footer idênticos pixel a pixel à base no pipeline final de captura |
| CSS desktop | 501 regras fora dos breakpoints mobile idênticas, excluindo apenas o wrapper novo e a preparação vazia removida |
| Geometria protegida | 1.258 elementos visíveis comparados: delta máximo 0px, estilos computados idênticos. Inclui desktop integral e seções 03–06 nos três mobiles |
| HTML | Idêntico à base ao normalizar apenas os wrappers `<picture>/<source>` e a imagem opcional vazia removida |
| Seleção de assets | Quatro JPGs corretos no mobile; mesmos masters desktop. Redimensionamento 390 → 1440 → 360 validado aguardando seleção/carregamento efetivos |
| Imagens | Quatro hashes de origem, dois PNGs oficiais e 11 WebPs do manifesto verificados; todas as imagens decodificadas |
| Dados | Contatos, preços, condições, avaliações e demais dados comerciais preservados |
| Layout/controles | Sem overflow horizontal/textual, controles quebrados ou sobreposição do marcador com título, selo ou card; carrossel estável e swipe/teclado funcionais |
| Console/rede local | Zero exceções JS ou respostas locais de erro na execução final |
| Estabilidade | CLS máximo observado 0,00139 |
| Vercel | READY; HTML/CSS HTTP 200 e idênticos ao build local, descontando apenas metadados/feedback Vercel. Quatro JPGs HTTP 200, `image/jpeg`, tamanhos iguais aos originais |

Comando E2E executado com `BASE_URL=http://127.0.0.1:4173`, `CHROMIUM_PATH=/usr/bin/chromium`, `CODEX_PRIMARY_RUNTIME_NODE_MODULES=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules` e `QA_DIR=qa/build04/e2e`.

A primeira execução falhou na verificação adicional de resize: comparava `currentSrc` antes da atualização do navegador. A espera foi corrigida para carregar imagens lazy e aguardar a seleção efetiva; o teste focado e a bateria completa passaram depois. As capturas iniciais também apresentaram falhas intermitentes de pintura; foram refeitas com renderização de software e espera de quadros. Não foi necessário alterar o produto por essas falhas de instrumentação. Capturas mobile das seções preservadas podem diferir no raster por seu deslocamento vertical na página; a preservação dessas áreas é comprovada por igualdade de HTML, estilos e geometria, sem alegação de igualdade pixel a pixel de todos os recortes mobile.

## Evidências e limites

Evidências locais em `qa/build04/`, ignorado pelo Git conforme a convenção do projeto:

- `home-360.png`, `home-390.png`, `home-430.png`, `home-1440.png`: páginas completas em estado neutro.
- `before/<largura>/` e `after/<largura>/`: seções e footer; a base foi capturada com HTML/CSS/JS recuperados do SHA de origem e os mesmos arquivos públicos anteriores.
- `comparativos/*-antes-depois.png`, `*-mobile-widths.png` e `*-fundo-implementacao.png`: comparativos reais sem alteração dos assets do produto.
- `e2e/results.json`, `e2e.log`, `e2e-initial.log`, `resize.json`, `protected-css.json`, `protected-html.json`, `protected-parity.json` e `deployment-verification.json`.

Sem homologação em dispositivo físico Android ou Safari/iOS nesta execução. Não foram recebidos novos layouts completos de interface de todas as seções, portanto o QA de fidelidade dos quatro anexos concentra-se na integração fiel dos fundos e no conteúdo/ordem descritos pelo usuário.

**Pendência real:** o PNG oficial disponível foi aprovado para corpo inteiro no mapa. Não há um arquivo/pose aprovado de cabeça e duas mãos espiando a borda interna da Expansão; esse detalhe ficou preservado sem improvisar recorte, pose ou personagem. Necessário arquivo apropriado para essa aplicação, caso o usuário queira incluí-lo em outra rodada.

O checkpoint é publicado em commit documental na mesma branch. Não modifica a aplicação do preview validado nem realiza merge na main.
