# AVERO STUDIO · BORJÃO FITNESS — CHECKPOINT BUILD 03A.2
Data: 2026-10-20
Branch: `build-03a2-ajustes-finos-home`
Base intacta: `build-03a1-ajustes-fidelidade`
`main` intacta, sem merge.

Preview de revisão: https://borj-o-fitness-demo-2kz639961-john-e7bd.vercel.app
Deployment Vercel: `dpl_8SNpZ3cbbJDFbsdL4HJucTPzNxCD`
Código: `c2d7e663d760a6f53429c762ca149ab0a3ee6abd`
Estado: `READY`, build `node scripts/build.mjs` PASSOU (nove seções + footer, referências locais resolvidas). QA visual ainda PENDENTE.

## Refinos CSS aplicados, sem reconstrução e sem novos assets
1. **Hero:** mudar quadro desktop para `aspect-ratio:1672/941` igual ao master, `object-fit:contain`, removendo o `height:min 740px` que cortava os extremos da fachada, rosto de Fabrício e canto inferior. Ajuste de faixa clara atrás dos textos com máscara vertical, preservando topo e base da composição.
2. **A Academia:** os três cards ganharam superfícies grafite ~97–98% opacas, blur de 28px e contraste de texto, sem a imagem de fundo aparecendo nitidamente.
3. **Estrutura:** proporções e máscaras diagonais refinadas, card inferior direito alinhado, espaços de 8px, curvatura superior aumentada. Precisa conferir anti-alias do `clip-path:polygon` no navegador.
4. **Modalidades:** faixa inferior duplicada de duas miniaturas fica oculta no desktop; foto protagonista maior e com dissolvência nas laterais, preservando seletor funcional Musculação/Cardio e a nota Funcional a confirmar. Não inventar novas modalidades.
5. **Expansão:** `construction-slot` sem `clip-path` seco; gradiente de opacidade de 53–100% aplicado SOMENTE à imagem, sobre fundo mineral, não ao texto HTML. Verificar visualmente a transição.
6. **Planos:** cards mantidos na coluna cinza à direita com nova proporção 49/51, padding lateral, margens sem extrapolar para a esquerda, inclinação reduzida para 5°. Os cinco preços e recorrência não foram alterados.
7. **Localização:** cartão branco com borda e sombra suaves, hierarquia interna maior e posição inferior direita; composição foto/mapa e links reais mantidos.

## QA requerido
- Validar desktop em 1440,1280,980 pixels, especialmente Hero completa e fadings.
- Validar mobile em 390/360: as alterações CSS usam exclusivamente `min-width:761px` e foram pensadas para não alterar a versão mobile, mas dependem de inspeção real.
- Verificar se faixa de miniaturas de Modalidades está realmente oculta, sem eliminar navegação existente.
- Comparar card de endereço à referência mestre, sem substituir o mapa ilustrativo por dados inventados.
- Sapinho aprovado para mapa/expansão **ainda pendente**: não usar a versão antiga de cabeça apenas ou imagem com fundo preto; integrar somente PNG transparente correto.
- Não considerar equivalente ao mockup nem realizar merge até homologação visual.

## Limites
As imagens compostas continuam sendo artes conceituais (incluindo espaços/obra e pessoas). Não as apresentar como documentação oficial da academia. Dados de planos e contatos preservados.
