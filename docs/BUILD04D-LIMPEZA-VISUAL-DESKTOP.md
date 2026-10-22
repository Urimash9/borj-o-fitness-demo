# Borjão Fitness — limpeza visual do desktop

Data: 2026-10-22.

## Base, branch e preview

- Base remota confirmada após fetch, com checkout limpo: `build-04c-transicao-movimento`, SHA `353e9797f38ec1b6741d149ff4c9892dc5f8174e`.
- Branch independente: `build-04d-limpeza-visual-desktop`.
- Commit da implementação: `76116d9c429f11a4cff083860b6fa17cb5986b2b`.
- Preview: **https://borj-o-fitness-demo-63l9vfg2a-john-e7bd.vercel.app**.
- Deployment `dpl_5muekhX2x7aCAeRYEiGwaYiaSxBo`: READY, preview (`target:null`); projeto, branch e SHA confirmados.
- Main preservada em `be80fed33551e8ef5f52aa56776d44bd399bf5ad`. Sem merge ou deploy em produção.

## Diagnóstico e alterações

Os oito identificadores principais compartilham o mesmo helper de HTML, com número e texto em spans separados. A regra `.eyebrow-number {display:none}` existia somente no breakpoint mobile. Essa regra foi movida para o escopo compartilhado, preservando exatamente seu comportamento mobile e aplicando a mesma ocultação ao desktop. Números de planos, modalidades, avaliações, preços e paginação não usam essa classe e permanecem intactos.

Os nomes, as linhas azuis, as fontes, as cores, os gaps e as margens não foram alterados. A largura intrínseca dos rótulos desktop diminui pela retirada do prefixo; no grupo de identificação da Expansão, o selo contíguo acompanha essa extremidade, conservando o mesmo gap e alinhamento. Não foi acrescentado ajuste de posição ou tamanho.

As duas microlegendas da Hero estavam em HTML dentro de `.hero-caption`. A inspeção direta do WebP aprovado confirmou que não estavam incorporadas na fotografia. Foi removido somente esse bloco de legendas. O helper de mascote desse bloco já retornava uma string vazia; o sapinho visível pertence ao master fotográfico e foi preservado integralmente. Nenhum asset foi editado, substituído ou gerado.

Os gradientes de leitura, enquadramento, proporções, imagens, fachada, Fabrício, cidade, interior, equipamentos, logo, mascote, conteúdo principal, CTAs e selo de expansão permanecem. Os avisos ilustrativos das demais seções não foram removidos.

A divisória mineral **MOVIMENTO QUE TRANSFORMA** não teve HTML ou CSS alterados. As regras e o conteúdo da navegação, cards, animações, demais seções e footer foram preservados.

## Arquivos modificados

- `src/styles.css`: deslocamento da regra já existente de ocultação dos prefixos para fora da media query mobile.
- `src/render.mjs`: remoção do bloco HTML das duas microlegendas da Hero.
- `scripts/verify.mjs`: atualização das expectativas antigas que exigiam números e legendas no desktop; proteção explícita da frase da divisória.
- `docs/BUILD04D-LIMPEZA-VISUAL-DESKTOP.md`: este checkpoint.

## QA

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou |
| `npm run build` | Passou; assets locais resolvidos |
| `npm run test:e2e` | Passou em 1536, 1440, 1280, 1024, 980, 768, 430, 390, 360 e 320px |
| Capturas antes/depois | Desktop 1440/1280 e mobile 430/390/360px |
| Identificadores | Oito prefixos ocultos em todos os breakpoints; nomes e linhas azuis preservados |
| Hero | Duas frases ausentes do HTML renderizado; asset e demais elementos preservados |
| Divisória | Frase visível; estilos, geometria e pixels idênticos nas cinco larguras comparadas |
| Mobile | 33 capturas de seções/footer/divisória idênticas pixel a pixel; geometria e estilos existentes iguais, excluindo apenas os três elementos das legendas que já estavam ocultos |
| Preservação | 2.850 elementos comparados; diferenças desktop restritas à retirada dos prefixos e à compactação natural do grupo do rótulo da Expansão |
| Assets e dados | 17 arquivos públicos originais, 11 WebPs, quatro JPGs mobile e PNGs oficiais com hashes preservados; dados comerciais intactos |
| Funcionalidades | Menu, teclado, modalidades, carrossel, swipe, planos, contatos e animação única do mascote passaram nos testes existentes |
| Layout e console | Sem overflow horizontal/textual, exceções JavaScript ou erros locais de rede; CLS máximo observado 0,00167 |
| Vercel | HTML/CSS/JS HTTP 200 e iguais ao build local, descontando somente metadados e script de feedback acrescentados pelo Vercel ao HTML |

Evidências em `qa/build04d/`, ignoradas pelo Git conforme convenção: `before/`, `after/`, `preservation.json`, `e2e/results.json`, `e2e.log` e `deployment-verification.json`.

Screenshots entregáveis: `after/1440/inicio.png`, `after/1440/titulos-secoes.png`, `after/1280/inicio.png` e `after/1280/titulos-secoes.png`. As folhas de rótulos reúnem recortes das capturas reais das oito seções, sem numeração acrescentada. Capturas completas de cada seção permanecem nas mesmas pastas.

Validação em Chromium, sem homologação em dispositivo físico ou Safari/iOS. Este checkpoint é versionado separadamente na mesma branch e não modifica a aplicação do preview verificado.
