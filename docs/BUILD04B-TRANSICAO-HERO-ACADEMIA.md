# Borjão Fitness — transição Hero / A Academia

Data: 2026-10-22.

## Base e isolamento

- Repositório: `Urimash9/borj-o-fitness-demo`.
- Base mais recente confirmada após `git fetch origin`: `build-04a-refino-final-mobile`, SHA `55544b227b7428b624dfb1676d7b4f5ea9d58025`, checkout limpo e preview READY correspondente.
- Branch independente: `build-04b-transicao-hero-academia`.
- Commit de implementação: `fbaf884da7aeb0f55218f80d289987a73e48b25c`.
- Main preservada em `be80fed33551e8ef5f52aa56776d44bd399bf5ad`. Sem merge e sem publicação em produção.

## Alteração pontual

O encontro direto entre as duas fotografias não tinha uma transição gráfica. Foi acrescentado um pseudo-elemento decorativo na borda superior da Academia: uma faixa de grafite `#0b1116`, igual ao fundo existente da seção, com um pequeno detalhe diagonal no azul já definido em `--blue`.

A faixa mede **32px no desktop e 24px até 760px**, dentro dos intervalos solicitados. O detalhe azul acompanha a margem editorial existente. Não há iluminação, animação, sombra, blur ou tratamento de cor novo.

A camada tem posicionamento absoluto e não participa do fluxo. Não altera a altura da Hero, da Academia ou da página, nem acrescenta uma seção. O conteúdo continua acima da decoração e a camada não intercepta cliques. As estratégias de exibição e enquadramento das imagens permanecem iguais.

Único arquivo de aplicação modificado: `src/styles.css`, seis linhas acrescentadas junto às regras da composição e à adaptação mobile da Academia. HTML, JavaScript, conteúdo, assets, CTAs, cards e demais seções não foram modificados.

## Validação

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou |
| `npm run build` | Passou; todos os assets locais resolvidos |
| `npm run test:e2e` | Passou em 1536, 1440, 1280, 1024, 980, 768, 430, 390, 360 e 320px |
| Comparação antes/depois | Capturas reais em 1440, 1280, 430, 390 e 360px |
| Geometria e estilos existentes | 2.855 elementos comparados, idênticos nas cinco larguras solicitadas |
| Imagens | Assets, fontes selecionadas e enquadramentos preservados; imagens decodificadas |
| Layout e funções | Sem overflow horizontal; navegação, modalidades, avaliações, planos e contatos aprovados pelos testes existentes |
| Console e rede | Sem exceções JavaScript ou respostas locais de erro na bateria final |

Alturas antes/depois, em CSS px:

| Largura | Hero | Academia | Página |
| --- | --- | --- | --- |
| 1440 | 810,421875 | 810,421875 | 8183 |
| 1280 | 720,375 | 720,375 | 7356 |
| 430 | 645,25 | 764,4375 | 10289 |
| 390 | 585,21875 | 693,328125 | 10004 |
| 360 | 540,203125 | 640 | 9763 |

As capturas focadas da junção foram comparadas no mesmo navegador e com as mesmas imagens decodificadas, alternando somente a presença da decoração. Nas cinco larguras, a diferença de pixels ficou integralmente dentro da faixa de 32/24px. Nenhum texto ou componente foi cortado. A comparação é entre a implementação anterior e a nova; esta solicitação não trouxe uma nova referência de imagem para a faixa.

Evidências locais em `qa/build04b/`, ignoradas pelo Git conforme convenção: `before/`, `after/`, `comparativos/`, `before-geometry.json`, `after-geometry.json`, `pixel-preservation.json`, `e2e/results.json`, `e2e.log` e `deployment-verification.json`. Comparativos principais: `comparativos/1440-antes-depois.png` e `comparativos/390-antes-depois.png`.

Validação automatizada e visual em Chromium; sem homologação em dispositivo físico ou Safari/iOS. Nenhuma pendência de implementação identificada neste escopo.

## Preview

**https://borj-o-fitness-demo-ngbqvw03c-john-e7bd.vercel.app**

Deployment `dpl_AuaBcYfH4wrjAGUFUoyFRorXbBd4`: READY, preview (`target:null`), projeto `borj-o-fitness-demo`, branch e SHA de implementação confirmados. HTML, CSS e JavaScript retornaram HTTP 200 e correspondem ao build local, descontando somente a identificação e o script de feedback acrescentados pelo Vercel ao HTML.

Este checkpoint é versionado separadamente na mesma branch e não modifica a aplicação validada.
