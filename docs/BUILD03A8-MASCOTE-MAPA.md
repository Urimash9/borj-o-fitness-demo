# AVERO STUDIO · BORJÃO FITNESS — BUILD 03A.8

Data: 2026-10-21. Escopo: somente a identificação ilustrativa da academia sobre o mapa da seção 09.

## Base e isolamento

- Base mais recente confirmada por fetch e referências remotas: `build-03a7-refino-planos-final`, `9764b121b188a3bfae44b1cb3c23d7c8990d1d9f`. Checkout inicial limpo.
- Preview efetivo da base consultado nesta rodada: https://borj-o-fitness-demo-mru4eohbz-john-e7bd.vercel.app, READY, SHA `9764b12`.
- Nova branch criada diretamente dessa base: `build-03a8-mascote-mapa`.
- Main preservada em `be80fed33551e8ef5f52aa56776d44bd399bf5ad`. Sem merge, publicação em produção ou alteração de outro projeto.

## Arquivos oficiais recebidos

| Origem fornecida pelo usuário | Arquivo adicionado | Dimensões | Transparência |
| --- | --- | --- | --- |
| `1000037914.png` | `public/assets/borjao/localizacao/mascote-mapa.png` | 1254 × 1254 | RGBA; canal alfa real de 0 a 255 |
| `1000036233.png` | `public/assets/borjao/localizacao/logo-borjao-oficial.png` | 2172 × 724 | RGBA; canal alfa real de 0 a 255 |

Os PNGs foram copiados byte a byte, sem recorte, remoção de fundo, reamostragem, regeneração ou alteração da arte. A inspeção sobre fundo mineral e no navegador confirmou ausência de retângulo preto. Os testes verificam transparência nos quatro cantos, dimensões naturais, proporção renderizada e estes SHA-256:

- Mascote: `9d74d013a8ff2277610738a0de811fc8762f232a09ea617579db3198d33b30d7`.
- Logo: `32ff64919086e2134e372a3d8cdd705dde4a67fb118ed40cc4b9a13837acef35`.

A pose, o dedo indicador, o rosto, as cores e a perspectiva do mascote permanecem exatamente os do arquivo recebido. A própria arte oficial já inclui uma base azul com marcador. Essa base foi preservada; a elipse e o anel em CSS apenas acrescentam um apoio discreto, com baixa opacidade, sem outra grande aura, filtro de blur ou coordenadas geográficas.

## Implementação

- Reutilizado o `map-mascot-slot` vazio da seção 09 como campo de coordenadas da região do mapa. A composição fica dentro desse campo, com posicionamento e tamanho proporcionais; no mobile ele coincide com a janela de mapa existente.
- `map-brand-marker` organiza dois elementos independentes: mascote à esquerda e plaquinha à direita. Nenhuma transformação deforma ou espelha os arquivos.
- Plaquinha feita em HTML/CSS: branco, padding proporcional, cantos suaves e sombra cinza discreta. Contém exclusivamente o PNG oficial da logo centralizado.
- Contêiner decorativo com `aria-hidden="true"`, imagens com alt vazio e `pointer-events:none`. A composição não cria um mapa interativo nem interfere no link real do Google Maps.
- Regras ajustadas junto ao slot existente e ao breakpoint mobile correspondente, sem acrescentar overrides ao fim do CSS.

Em 1280px, o conjunto ocupa aproximadamente 225 × 95px e a plaquinha 131 × 53px. Em 390px, ocupa 143 × 60px, com plaquinha de 83 × 34px. As proporções deixam o mascote reconhecível e a fachada dominante.

## Fidelidade e preservação

As duas referências originais fornecidas (`1000036219.jpg`, desktop 1280 × 720; `1000036220.jpg`, mobile 720 × 1280) estavam acessíveis. Foram comparadas lado a lado com screenshots reais, além do comparativo antes/depois. A comparação localizada avaliou posição sobre o mapa, corpo inteiro, dedo indicador, relação de escala, placa branca e apoio azul. Não se declara igualdade pixel a pixel com as referências: o restante da seção mantém deliberadamente a implementação aprovada da base.

- HTML completo idêntico à base ao normalizar somente o slot reservado ao novo marcador.
- **876 regras CSS fora do marcador idênticas à base**, inclusive todos os estilos do card de endereço, mapas, fachada, Planos e footer.
- **3.773 elementos existentes comparados em sete larguras: delta máximo de geometria 0px, estilos computados idênticos.** Inclui seções 01–08, cabeçalho, footer e todos os elementos anteriores da seção 09, excluindo apenas o slot vazio substituído.
- 63 screenshots das áreas protegidas comparados: 49 idênticos pixel a pixel; os demais apresentaram pequenas variações raster de captura, com diferença média máxima de 0,483 por canal na escala 0–255. A preservação estrutural é sustentada também pela igualdade de HTML, CSS e geometria; não se declara igualdade raster de todas as capturas.
- Conteúdo, preços, ícones, destinos dos links e interações preservados. Nenhuma imagem anterior foi sobrescrita. O helper antigo do mascote continua desativado para não introduzir personagens em outras seções.

## QA

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou |
| `npm run build` | Passou; nove seções e todos os assets locais resolvidos |
| `npm run test:e2e` | Passou em 1536, 1440, 1280, 1024, 980, 768, 430, 390, 360 e 320px |
| Capturas antes/depois | 1536, 1440, 1280, 1024, 430, 390 e 360px |
| Identidade oficial | Dois hashes preservados, alfa real, imagens decodificadas e proporções mantidas |
| Encaixe | Um marcador dentro da região do mapa; nenhum conflito com título, etiqueta de cidade ou card; plaquinha sem sobrepor o mascote |
| Overflow | Nenhum overflow horizontal da página ou de textos/botões |
| Funcionalidade | Navegação, teclado, modalidades, carrossel/swipe, cinco planos, WhatsApp e Google Maps preservados |
| Console/rede local | Zero exceções JavaScript, imagens quebradas ou respostas locais de erro |
| Estabilidade | CLS máximo observado 0,00163, abaixo do limite de 0,1 |
| Assets anteriores | 17 arquivos públicos originais e 11 hashes WebP do manifesto preservados |

O QA automatizado e as capturas utilizaram Chromium. Não houve homologação em aparelho físico, Safari/iOS ou comparação pixel a pixel da seção inteira com a arte de referência. Não há pendência de arquivo do mascote/logo nesta seção nem falha técnica aberta; a homologação visual final cabe ao usuário.

## Arquivos e evidências

- `src/render.mjs`: marcação localizada do conjunto, reutilizando o slot da seção 09.
- `src/styles.css`: somente estilos do marcador e sua adaptação mobile.
- `scripts/verify.mjs`: lista explícita dos dois novos PNGs e verificações de origem, transparência, proporção, contenção e ausência de sobreposição.
- Os dois PNGs oficiais em `public/assets/borjao/localizacao/`.
- `docs/BUILD03A8-MASCOTE-MAPA.md`: este checkpoint.

Conteúdo, JS de interação, media slots, dependências e assets anteriores permanecem intactos. Evidências em `qa/build03a8/`, ignorado pelo Git conforme convenção do projeto: `before/`, `after/`, `references/`, `comparativos/`, `e2e/results.json`, `e2e.log`, `protected-css.json`, `protected-html.json` e `protected-parity.json`.

## Commit e preview

- Código: `ae3a6fc52903f56d8119aac36e0dda83d24dabc0`.
- Preview validado: https://borj-o-fitness-demo-fe8z714ju-john-e7bd.vercel.app
- Deployment `dpl_bESQapNBUkfSAmisWo2WwCNiDWth`, projeto `borj-o-fitness-demo`, **READY**, preview (`target:null`), branch e SHA do código confirmados.
- Como o deployment automático do push não apareceu nas consultas, o preview foi criado pelo conector Vercel, usando a conexão Git existente e o SHA exato. Nenhuma configuração do projeto ou de produção foi alterada.
- Log remoto confirma clone de `ae3a6fc`, build das nove seções e publicação concluída. HTML e CSS responderam HTTP 200 pelo conector autenticado. CSS idêntico à fonte e HTML idêntico ao build local, descontando somente os metadados e feedback acrescentados pelo Vercel. Os dois PNGs oficiais responderam HTTP 200 com tipo `image/png`.
- Resultado remoto registrado em `qa/build03a8/deployment-verification.json`.
- Este checkpoint será commitado separadamente na mesma branch, sem alteração adicional da aplicação.
