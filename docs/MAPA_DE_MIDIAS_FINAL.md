# Borjão Fitness — Mapa de mídias final

Build 02 / etapa 01 · 16/10/2026 · branch `build-02-base-visual-borjao`.

**Status: somente slots e especificação. Nenhuma nova imagem foi gerada ou integrada.** A base aguarda aprovação antes da direção de arte.

## Contrato de integração futura

- Fonte: estudos individuais aprovados do pacote V3, preservando Hero cinza-claro. Nunca usar screenshot completo para cobrir uma seção.
- Os 18 slots têm identificação estável em `src/media-slots.mjs`; 17 ficam ativos no DOM por vez, pois Musculação e Cardio compartilham o painel. A classe `modality-image` agora pertence ao slot, não a um `img` com URL ausente.
- `desktop.source` e `mobile.source` permanecem `null`. Nomes de arquivos abaixo são **planejamento**, nunca URLs solicitadas pelo preview atual. Os nomes não devem ser vinculados até os respectivos arquivos aprovados existirem.
- Pastas futuras sugeridas: `public/assets/final/desktop/` e `public/assets/final/mobile/`. Não criadas nesta etapa.
- As proporções de **master** orientam o preparo da arte, não definem altura nova de seção. A geometria de aplicação é a dos frames existentes e varia por breakpoint. As medidas abaixo foram obtidas da base em 1440 e 390 px; o slot humano da Hero foi reservado em camada absoluta, sem alterar o fluxo.
- O tratamento deve reproduzir a direção aprovada, usando foto documental tratada ou composição conceitual identificada conforme cada caso. Uma cena sintética não é registro de fachada, equipe ou obra real. Retrato com identidade atribuída exige material autorizado.
- Títulos, preços, textos, EM BREVE, menus, botões, ícones e marcas seguem em HTML/SVG separados. Não gravar lettering ou logo novo dentro de imagens finais.
- Cortes e overlays são responsabilidade dos containers/CSS atuais; integrar mídias com `picture`/recortes por breakpoint em fase posterior, sem alterar os frames para acomodar imagens.
- A localização pode retornar ao embed real depois de validar o ponto. Um apoio gráfico é conceitual e não substitui cartografia real nem o link de rota.

## Inventário completo — 18 slots

### 01 / hero-ambiente

**Função:** Ambiente interno.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-hero-ambiente-desktop.webp` | 21:9 | 1051 × 348 px em viewport 1440 px |
| Mobile | `borjao-hero-ambiente-mobile.webp` | 16:9 | 355 × 216 px em viewport 390 px |

**Recorte, overlay e tratamento:** Fade lateral e inferior; camada de fundo da Hero.

**Origem prevista:** Documental tratado ou conceito identificado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/01_hero.png` e `01_REFERENCIAS_VISUAIS/mobile/01_hero.png`.

**Situação:** pendente de direção de arte e aprovação.

### 01 / hero-cidade

**Função:** Cidade de Coromandel.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-hero-cidade-desktop.webp` | 21:9 | 763 × 235 px em viewport 1440 px |
| Mobile | `borjao-hero-cidade-mobile.webp` | 4:3 | 281 × 209 px em viewport 390 px |

**Recorte, overlay e tratamento:** Recorte diagonal e fade superior; preservar contexto local.

**Origem prevista:** Documental tratado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/01_hero.png` e `01_REFERENCIAS_VISUAIS/mobile/01_hero.png`.

**Situação:** pendente de direção de arte e aprovação.

### 01 / hero-fachada

**Função:** Fachada protagonista.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-hero-fachada-desktop.webp` | 4:3 | 850 × 624 px em viewport 1440 px |
| Mobile | `borjao-hero-fachada-mobile.webp` | 4:3 | 359 × 281 px em viewport 390 px |

**Recorte, overlay e tratamento:** Diagonal herdada; preservar forma arquitetônica e logo.

**Origem prevista:** Documental tratado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/01_hero.png` e `01_REFERENCIAS_VISUAIS/mobile/01_hero.png`.

**Situação:** pendente de direção de arte e aprovação.

### 01 / hero-humano

**Função:** Composição humana.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-hero-humano-desktop.webp` | 3:4 | 274 × 373 px em viewport 1440 px |
| Mobile | `borjao-hero-humano-mobile.webp` | 3:4 | 105 × 231 px em viewport 390 px |

**Recorte, overlay e tratamento:** Camada sobreposta atrás da fachada; recorte humano futuro.

**Origem prevista:** Retrato autorizado ou conceito identificado, sem falsa identidade.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/01_hero.png` e `01_REFERENCIAS_VISUAIS/mobile/01_hero.png`.

**Situação:** pendente de direção de arte e aprovação. Camada reservada, não equivale a um retrato aprovado ou identificado.

### 02 / academia-salao

**Função:** Salão institucional.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-academia-salao-desktop.webp` | 4:3 | 864 × 734 px em viewport 1440 px |
| Mobile | `borjao-academia-salao-mobile.webp` | 3:4 | 254 × 737 px em viewport 390 px |

**Recorte, overlay e tratamento:** Escurecimento, fade à esquerda e moldura herdada.

**Origem prevista:** Documental tratado ou conceito identificado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/02_a_academia.png` e `01_REFERENCIAS_VISUAIS/mobile/02_a_academia.png`.

**Situação:** pendente de direção de arte e aprovação.

### 02 / academia-escada

**Função:** Escada e mural.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-academia-escada-desktop.webp` | 3:4 | 389 × 734 px em viewport 1440 px |
| Mobile | `borjao-academia-escada-mobile.webp` | 3:4 | 144 × 669 px em viewport 390 px |

**Recorte, overlay e tratamento:** Corte lateral diagonal; não modificar circulação real.

**Origem prevista:** Documental tratado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/02_a_academia.png` e `01_REFERENCIAS_VISUAIS/mobile/02_a_academia.png`.

**Situação:** pendente de direção de arte e aprovação.

### 02 / academia-cidade

**Função:** Faixa da cidade.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-academia-cidade-desktop.webp` | 21:9 | 1440 × 185 px em viewport 1440 px |
| Mobile | `borjao-academia-cidade-mobile.webp` | 16:9 | 390 × 200 px em viewport 390 px |

**Recorte, overlay e tratamento:** Faixa inferior inclinada e escurecimento neutro.

**Origem prevista:** Documental tratado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/02_a_academia.png` e `01_REFERENCIAS_VISUAIS/mobile/02_a_academia.png`.

**Situação:** pendente de direção de arte e aprovação.

### 03 / estrutura-principal

**Função:** Salão protagonista.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-estrutura-principal-desktop.webp` | 16:10 | 814 × 454 px em viewport 1440 px |
| Mobile | `borjao-estrutura-principal-mobile.webp` | 4:3 | 346 × 300 px em viewport 390 px |

**Recorte, overlay e tratamento:** Imagem dominante; diagonal desktop e frame mobile próprio.

**Origem prevista:** Documental tratado ou conceito identificado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/03_estrutura.png` e `01_REFERENCIAS_VISUAIS/mobile/03_estrutura.png`.

**Situação:** pendente de direção de arte e aprovação.

### 03 / estrutura-pesos

**Função:** Pesos livres.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-estrutura-pesos-desktop.webp` | 16:9 | 461 × 220 px em viewport 1440 px |
| Mobile | `borjao-estrutura-pesos-mobile.webp` | 4:5 | 169 × 190 px em viewport 390 px |

**Recorte, overlay e tratamento:** Área secundária superior; gradiente para legenda HTML.

**Origem prevista:** Documental tratado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/03_estrutura.png` e `01_REFERENCIAS_VISUAIS/mobile/03_estrutura.png`.

**Situação:** pendente de direção de arte e aprovação.

### 03 / estrutura-cardio

**Função:** Área de cardio.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-estrutura-cardio-desktop.webp` | 16:9 | 529 × 220 px em viewport 1440 px |
| Mobile | `borjao-estrutura-cardio-mobile.webp` | 4:5 | 169 × 190 px em viewport 390 px |

**Recorte, overlay e tratamento:** Área secundária inferior; gradiente para legenda HTML.

**Origem prevista:** Documental tratado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/03_estrutura.png` e `01_REFERENCIAS_VISUAIS/mobile/03_estrutura.png`.

**Situação:** pendente de direção de arte e aprovação.

### 04 / modalidade-musculacao

**Função:** Musculação.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-modalidade-musculacao-desktop.webp` | 3:2 | 616 × 360 px em viewport 1440 px |
| Mobile | `borjao-modalidade-musculacao-mobile.webp` | 4:3 | 362 × 250 px em viewport 390 px |

**Recorte, overlay e tratamento:** Painel imersivo de corte diagonal, sincronizado ao seletor.

**Origem prevista:** Documental tratado ou conceito identificado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/04_modalidades.png` e `01_REFERENCIAS_VISUAIS/mobile/04_modalidades.png`.

**Situação:** pendente de direção de arte e aprovação.

### 04 / modalidade-cardio

**Função:** Cardio.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-modalidade-cardio-desktop.webp` | 3:2 | 616 × 360 px em viewport 1440 px |
| Mobile | `borjao-modalidade-cardio-mobile.webp` | 4:3 | 362 × 250 px em viewport 390 px |

**Recorte, overlay e tratamento:** Mesmo painel e geometria; conteúdo sincronizado ao seletor.

**Origem prevista:** Documental tratado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/04_modalidades.png` e `01_REFERENCIAS_VISUAIS/mobile/04_modalidades.png`.

**Situação:** pendente de direção de arte e aprovação.

### 05 / expansao-cena

**Função:** Cena futura da expansão.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-expansao-cena-desktop.webp` | 4:3 | 746 × 476 px em viewport 1440 px |
| Mobile | `borjao-expansao-cena-mobile.webp` | 5:4 | 346 × 310 px em viewport 390 px |

**Recorte, overlay e tratamento:** Grande recorte editorial; EM BREVE e demais letras em HTML.

**Origem prevista:** Conceitual ilustrativo; não é registro de obra concluída.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/05_expansao.png` e `01_REFERENCIAS_VISUAIS/mobile/05_expansao.png`.

**Situação:** pendente de direção de arte e aprovação.

### 06 / experiencia-ambiente

**Função:** Ambientação do acolhimento.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-experiencia-ambiente-desktop.webp` | 16:9 | 1440 × 640 px em viewport 1440 px |
| Mobile | `borjao-experiencia-ambiente-mobile.webp` | 9:16 | 390 × 784 px em viewport 390 px |

**Recorte, overlay e tratamento:** Plano de fundo com baixa opacidade; pode derivar da cena humana.

**Origem prevista:** Documental tratado ou conceito identificado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/06_experiencia.png` e `01_REFERENCIAS_VISUAIS/mobile/06_experiencia.png`.

**Situação:** pendente de direção de arte e aprovação. Pode ser derivação da mesma cena humana, sem obrigar uma segunda criação independente.

### 06 / experiencia-humana

**Função:** Profissional orientando aluno.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-experiencia-humana-desktop.webp` | 4:3 | 672 × 430 px em viewport 1440 px |
| Mobile | `borjao-experiencia-humana-mobile.webp` | 4:5 | 346 × 330 px em viewport 390 px |

**Recorte, overlay e tratamento:** Cena principal obrigatória; recorte assimétrico, sem avaliações.

**Origem prevista:** Cena humana autorizada ou conceito identificado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/06_experiencia.png` e `01_REFERENCIAS_VISUAIS/mobile/06_experiencia.png`.

**Situação:** pendente de direção de arte e aprovação.

### 08 / planos-humano

**Função:** Cena humana dos planos.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-planos-humano-desktop.webp` | 3:4 | 907 × 823 px em viewport 1440 px |
| Mobile | `borjao-planos-humano-mobile.webp` | 4:5 | 390 × 644 px em viewport 390 px |

**Recorte, overlay e tratamento:** Sob o trilho diagonal e benefícios; área segura para texto independente.

**Origem prevista:** Cena humana autorizada ou conceito identificado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/08_planos.png` e `01_REFERENCIAS_VISUAIS/mobile/08_planos.png`.

**Situação:** pendente de direção de arte e aprovação.

### 09 / localizacao-fachada

**Função:** Fachada integrada à localização.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-localizacao-fachada-desktop.webp` | 4:3 | 950 × 454 px em viewport 1440 px |
| Mobile | `borjao-localizacao-fachada-mobile.webp` | 4:3 | 390 × 335 px em viewport 390 px |

**Recorte, overlay e tratamento:** Diagonal desktop; integração acima do cartão de contato no mobile.

**Origem prevista:** Documental tratado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/09_localizacao.png` e `01_REFERENCIAS_VISUAIS/mobile/09_localizacao.png`.

**Situação:** pendente de direção de arte e aprovação.

### 09 / localizacao-mapa

**Função:** Apoio visual de localização.

| Versão | Arquivo futuro | Proporção do master | Frame de aplicação atual |
| --- | --- | --- | --- |
| Desktop | `borjao-localizacao-mapa-desktop.svg` | 4:3 | 720 × 590 px em viewport 1440 px |
| Mobile | `borjao-localizacao-mapa-mobile.svg` | 3:2 | 362 × 245 px em viewport 390 px |

**Recorte, overlay e tratamento:** Área do mapa preservada; links reais independentes do visual.

**Origem prevista:** Mapa real ou apoio gráfico conceitual identificado.

**Referências:** `01_REFERENCIAS_VISUAIS/desktop/09_localizacao.png` e `01_REFERENCIAS_VISUAIS/mobile/09_localizacao.png`.

**Situação:** pendente de direção de arte e aprovação. Arquivos SVG são apenas uma alternativa de apoio gráfico, sem ruas ou pin inventados; um embed real validado dispensa esses arquivos.

## Seções que não exigem nova fotografia

- **07 Avaliações:** preservar papel editorial, lista, autores, sínteses e controles existentes. Não gerar estrelas, avaliações ou transcrições. Validação dos registros originais é pendência editorial herdada.
- **Footer:** preservar identidade, links e fade mineral→grafite; sem nova imagem de fundo obrigatória e sem CTA extra.

## Identidade e detalhes preservados

- `public/assets/logo-dark.png` e `logo-light.png`: aplicar os arquivos verificados, sem regenerar. Captura de baixa resolução; eventual arquivo oficial de maior qualidade deve preservar a identidade.
- `public/assets/mascote-referencia.png`: mantido na Hero, borda interna da Expansão mobile, mapa e Footer. Original parcial/transparente continua pendente para fase futura; não criar outro sapo.
- Crédito AVERO STUDIO continua textual. Nenhum símbolo ou lettering inventado.
- As 12 fotografias documentais de `public/assets` continuam intactas e não são pedidas pelo navegador nesta etapa, inclusive ao alternar modalidades. `photos` em `content.mjs` é apenas registro do acervo anterior.

## Divergências que esta etapa não resolve

Esta é uma estrutura de preparação, não uma nova aprovação visual dos estudos. Permanecem sem cena final a Hero composta, a faixa urbana, os ambientes, a cena de expansão, o profissional/aluno e os planos com imagem humana. Os fundos neutros mostram o volume/recorte reservado; não reproduzem o tratamento fotográfico final. O mapa está temporariamente estilizado, com rotas reais preservadas.

A próxima fase só começa depois do aceite desta base. Não há autorização nesta entrega para gerar, integrar imagens ou mergear na main.

## Atualização Build 03 — 19/10/2026

O inventário anterior documenta a preparação Build 02 e não representa o estado atual de renderização. O pacote aprovado reúne os antigos slots em composições únicas. Fontes efetivamente integradas e hashes: `docs/assets-build03/MANIFESTO_ASSETS_BUILD03.json` e `src/media-slots.mjs`.

| Slots anteriores | Mídia integrada Build 03 |
| --- | --- |
| hero-ambiente/cidade/fachada/humano | hero-composicao (uma imagem) |
| academia-salao/escada/cidade | academia-composicao (uma imagem) |
| estrutura-principal/pesos/cardio | três imagens dedicadas |
| modalidade-musculacao/cardio | dois assets no painel compartilhado |
| expansao-cena | expansao-obra dentro do frame |
| experiencia-ambiente/humana | experiencia-composicao (uma imagem) |
| planos-humano | planos-composicao (inclui diagonal) |
| localizacao-fachada/mapa | localizacao-composicao (uma imagem, rotas em HTML) |

Todos usam os nomes exatos do pacote em `/assets/borjao/final-v1/`. Não há variantes mobile no pacote: `mobile.source` permanece nulo como pendência documental, enquanto o navegador enquadra o master desktop existente por CSS. Não cria requests de arquivos futuros. Lista das variantes/artes ainda necessárias e comparação: [BUILD03-QA.md](BUILD03-QA.md).
