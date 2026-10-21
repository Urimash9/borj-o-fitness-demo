# AVERO STUDIO · BORJÃO FITNESS — BUILD 03A.7

Data: 2026-10-21. Escopo: apenas contornos desktop do Semestral/Anual e profundidade dos cards da seção 08.

## Base e isolamento

- Base local/remota confirmada: `build-03a6-planos-localizacao`, `67cae63bbc28f8e5ed57681caada3a83ff61e99e`; checkout inicial limpo.
- Branch criada da base: `build-03a7-refino-planos-final`.
- Preview efetivo da base: https://borj-o-fitness-demo-hfskafmub-john-e7bd.vercel.app, READY, deployment `dpl_AXaz6pHyuYwTJZNAHKxnYAYfvSL9`.
- Main preservada em `be80fed33551e8ef5f52aa56776d44bd399bf5ad`. Sem merge, publicação em produção ou alteração de outro projeto.

## Diagnóstico e correções

**Semestral:** o polígono anterior tinha um quinto vértice perto da base, produzindo uma quebra no trecho inferior esquerdo. Esse retorno foi retirado. A lateral agora é uma reta contínua, coerente com a subida da dobra, sem alterar a posição superior do card ou seu conteúdo. O teste inicial reproduziu na base um desvio de 21,34px em relação à lateral reta; após a correção, o desvio medido é zero, dentro da precisão numérica do navegador.

**Anual:** o posicionamento anterior usava uma aproximação derivada da borda interna. A inspeção do master original 1536×1024 identificou a linha externa descendente pelos pontos `(878,876)` e `(804,1024)`, correspondentes a `x = 1316 − y/2`. O card foi alinhado paralelamente a essa linha principal, com folga de 20px nativos. A inspeção também utilizou amostras de contraste da própria imagem, incluindo aproximadamente `(876,880)`, `(856,920)` e `(806,1020)`. O fundo e sua dobra não foram alterados nem cobertos por novas formas.

**Profundidade:** o `drop-shadow` individual da base era recortado pelo `clip-path` do próprio card. A sombra efetiva agora é aplicada ao contêiner transparente dos cinco cartões, que permanece sem recorte. Usa deslocamento vertical de `.45cqw`, desfoque de `.5cqw` e grafite com 17% de opacidade, sem glow azul ou nova superfície opaca. Em 1536px isso equivale a 6,91px de deslocamento e 7,68px de desfoque. Uma amostra no fundo cinza abaixo do primeiro card, cuja geometria não mudou, passou de luminância média 225,36 para 215,65, confirmando que a sombra é efetivamente pintada fora do card.

Foram removidas as variáveis da inflexão antiga que deixaram de ser usadas. As regras existentes foram ajustadas na origem, sem acrescentar uma camada de overrides ao final do CSS. A sombra do contêiner fica desativada no mobile, preservando a adaptação aprovada.

## Preservação e QA

- HTML integral idêntico à 03A.6. Textos, preços, ordem, ícones, botões, links e todas as imagens preservados.
- Sem alteração de tipografia, blocos de benefícios, fotografia, diagonal azul ou estrutura da home.
- **873 regras CSS fora das regras de geometria/camada dos planos idênticas à base**, incluindo as regras das seções 07 e 09.
- **3.469 elementos visíveis** comparados em 1536, 1440, 1280, 1024, 430, 390 e 360px: delta de geometria 0px e zero diferenças de estilos computados nas áreas protegidas. A comparação inclui integralmente as seções 01–07, 09, cabeçalho e footer; na seção 08 desktop exclui somente os cards Semestral/Anual e inclui os três primeiros e a lateral esquerda.
- Screenshots da seção 08 em 430, 390 e 360px **idênticos pixel por pixel à base**. Essa igualdade se refere à regressão mobile, não à arte de referência.

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou |
| `npm run build` | Passou; nove seções e assets locais resolvidos |
| `npm run test:e2e` | Passou em 1536, 1440, 1280, 1024, 980, 768, 430, 390, 360 e 320px |
| Semestral | Lateral reta, sem a quina extra; dentro da área segura |
| Anual | Paralelo à linha externa; folga medida 19,98px nativos em 1536px, com arredondamento subpixel |
| Coluna de planos | Cinco cards; bordas direitas, alturas e intervalos preservados; sombra em camada sem recorte |
| Dados e assets | 17 arquivos originais e 11 hashes WebP do manifesto preservados |
| Interações e legibilidade | Navegação, modalidades, avaliações, foco/teclado, swipe e links preservados; nenhum overflow de texto ou de página |
| Console, rede e estabilidade | Zero exceções JS ou falhas locais de carregamento; todas as imagens decodificadas; CLS máximo observado 0 |

O teste da lateral reta falhou intencionalmente na base, demonstrando a regressão corrigida. A bateria completa passou após a implementação; nenhuma falha técnica ficou aberta. A validação foi feita em Chromium, sem homologação em dispositivo físico ou Safari/iOS nesta execução.

## Arquivos e evidências

- `src/styles.css`: ajustes restritos à camada da coluna e aos dois contornos.
- `scripts/verify.mjs`: verificação da lateral reta, alinhamento à linha externa e sombra no contêiner sem clipe.
- `docs/BUILD03A7-REFINO-PLANOS-FINAL.md`: este checkpoint.

`render.mjs`, conteúdo, JavaScript de interação, media slots, dependências e assets permanecem intactos. Evidências em `qa/build03a7/`, ignorado pelo Git conforme a convenção do projeto: `before/`, `after/`, `e2e/results.json`, `e2e.log`, `red.log`, relatórios `protected-*.json` e comparativos `comparativos/planos-1536.png`, `planos-1280.png` e `semestral-anual-detalhe.png`.

## Commit e preview

- Código: [`5a7ebada565765cf776f76c3e67d768dd0748f24`](https://github.com/Urimash9/borj-o-fitness-demo/commit/5a7ebada565765cf776f76c3e67d768dd0748f24).
- Preview validado: https://borj-o-fitness-demo-1v9zl93sl-john-e7bd.vercel.app
- Deployment `dpl_B4vviVeSEG8Tui3JgQAg26yM4G2e`, projeto `borj-o-fitness-demo`, **READY**, ambiente preview (`target:null`), branch 03A.7 e SHA confirmados.
- O deploy automático do push não apareceu durante a execução. O preview foi criado pelo conector Vercel usando a conexão Git existente, o projeto/time já vinculados e o SHA exato. Nenhuma configuração de integração foi alterada. A API rejeitou inicialmente o literal `preview` no campo opcional `target` (HTTP 400); a requisição foi corrigida omitindo esse campo, que usa preview por padrão. A resposta final confirma `target:null`.
- Log remoto confirma clone de `5a7ebad`, build das nove seções e publicação concluída. HTML/CSS responderam HTTP 200 pelo conector autenticado. CSS idêntico à fonte; HTML idêntico ao build local, descontando somente identificação do deployment e feedback acrescentados pelo Vercel.
- Este checkpoint é commitado separadamente na mesma branch. Seu commit documental não altera a aplicação do preview validado acima. Sem merge ou publicação sobre a versão principal.

