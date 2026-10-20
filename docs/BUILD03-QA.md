# Build 03 — integração visual para revisão

Branch exclusiva: `build-03-assets-aprovados`. Checkpoint anterior à integração: `eebbe415f1a8294e9636574711ec773a9a167be4` (inclui refinamentos de proporção `57ea658`). Pacote: `BORJAO_BUILD03_ASSETS_APROVADOS.zip`. Implementação de 19/10/2026, horário de São Paulo.

## Implementação e limites

11 WebP integrados com nomes e bytes idênticos ao manifesto. Duas logos do pacote copiadas e preservadas, sem substituir as artes oficiais já usadas no header/footer. São dez nós de mídia ativos por vez: o painel de modalidades alterna entre dois assets. Composições únicas nas seções 01, 02, 06, 08 e 09 substituem as antigas camadas, sem duplicar diagonais/cidade/fachada/mapa. Expansão dentro do frame editorial com fade lateral; EM BREVE em HTML. Nenhuma imagem nova gerada ou retocada.

`src/content.mjs` não foi editado. Nove seções e footer, H1/H2, textos comerciais, cinco preços, cobrança recorrente, benefícios, cards, ícones, botões, menu, avaliações e links continuam nativos. As pequenas identificações de arte conceitual distinguem os visuais ilustrativos da informação real. Os 17 arquivos originais de public permanecem idênticos por hash; nenhuma fotografia documental antiga é solicitada.

O mascote antigo não é renderizado: a fonte contém fundo preto e o pacote não fornece recorte transparente validado. O sapinho já embutido na composição aprovada da Hero permanece nessa imagem, sem sobreposição adicional. Não se criou logo, sapinho ou marca sobre letreiros incorretos.

## Verificação técnica

- `npm run lint`: aprovado (sintaxe dos módulos e scripts).
- `npm run build`: aprovado; saída estática e referências locais resolvidas.
- `CHROMIUM_PATH=/tmp/borjao-build03-browser/chromium npm run test:e2e`: aprovado em Chromium 153/Playwright a 1440, 1280, 768, 390, 360 e 320 px.
- Sem overflow horizontal, mídia quebrada, erro JS ou resposta local 404. Todos os 11 WebP respondem 200 e coincidem com SHA-256 do manifesto.
- Menu mobile: abrir, Escape, retorno de foco e fechar ao navegar. Modalidades: clique, teclas direcionais, imagem/alt/texto/ARIA sincronizados. Avaliações: anterior/próxima, Home/End e swipe.
- Nove seções, footer, um H1 e cinco planos. Âncoras resolvem; WhatsApp usa número oficial e mensagem contextual, incluindo preços. Google Maps e Traçar rota são links reais; o mapa ilustrado não é geografia validada.
- Texto sem overflow em títulos, botões e áreas de preço. Reduced motion respeitado. Contraste revisado visualmente nas capturas; não se afirma auditoria WCAG completa.
- Layout shift observado abaixo de 0,003 nos percursos locais. Isso não substitui métricas de campo nem validação de rede móvel real.

O teste não declara igualdade geométrica com a Build 02: os layers redundantes foram substituídos pelas composições únicas; mobile recebeu enquadramento e altura de mídia adequados para preservar a dupla humana. Geometria dos controles e identidade tipográfica continuam na base existente.

## Comparação com as referências V3

Comparação visual lado a lado entre capturas de navegador (1440 e 390, com inspeção adicional em 320/768/1280) e `01_REFERENCIAS_VISUAIS/desktop|mobile/01_hero.png` até `10_footer.png`. As pranchas de comparação acompanham as capturas. “Aproximação” é julgamento explícito, não aprovação do cliente nem pixel match.

| Seção | Desktop | Mobile | Divergência / pendência |
| --- | --- | --- | --- |
| 01 Hero | Aproximação | Depende de arte vertical | Hero mineral preservada. Composição fornecida é mais saturada; massas e escalas diferem do estudo. Overlay protege textos. Badge deslocado internamente para não cobrir o rosto. Mobile mostra a composição inteira abaixo da copy, sem reproduzir a figura humana vertical da referência. |
| 02 Academia | Aproximação | Depende de arte vertical | Fundo único com salão/escada/cidade e três indicadores HTML. No mobile a cena horizontal aparece abaixo dos indicadores; falta a versão vertical com escada atrás da copy. |
| 03 Estrutura | Aproximação | Aproximação | Três imagens e recortes preservados; curva superior suavizada. Escalas/perspectivas diferem do estudo. Versões verticais próprias dos cards melhorariam o enquadramento mobile. |
| 04 Modalidades | Aproximação | Aproximação | Seletor e painel reais, foto sincronizada. Cena de musculação difere da referência; letreiro gerado precisa revisão. Cabeçalho dark herdado do refinamento `57ea658`, embora a referência desktop V3 tenha cabeçalho claro. Não redesenhado nesta integração. |
| 05 Expansão | Aproximação | Aproximação | Imagem apenas dentro do frame, fade e EM BREVE HTML. Mascote omitido por falta de PNG validado. Obra explicitamente conceitual; itens futuros continuam Em breve/A confirmar. |
| 06 Experiência | Aproximação | Depende de arte vertical | Uma única cena, profissional e aluna preservados, texto/ícones HTML e nenhuma avaliação extra. Mobile contém a dupla inteira abaixo da copy; enquadramento e ordem dos ícones não equivalem ao estudo vertical. |
| 07 Avaliações | Igual à base HTML | Igual à base HTML | Nenhuma alteração nessa seção. Ainda diverge do estudo por manter sínteses editoriais verificáveis, sem transcrições/estrelas inventadas. Não significa igualdade com o PNG. |
| 08 Planos | Aproximação | Depende de arte vertical | Fundo único, cinco cards/preços/benefícios HTML. Desktop ainda sobrepõe parte da cena humana com os cards na geometria herdada. Mobile mantém a arte horizontal no topo; cena humana tem presença menor que no estudo. |
| 09 Localização | Aproximação | Depende de arte vertical | Uma imagem de fachada + mapa, card real embaixo à direita. Fade superior protege a copy. Mobile preserva a imagem inteira; fachada e mapa ficam lado a lado em vez da montagem vertical aprovada. Sem mascote adicional. |
| Footer | Igual à base, com exceção do mascote | Igual à base, com exceção do mascote | Estrutura/fade/dados/crédito AVERO em texto preservados; mascote antigo retirado por não ter transparência válida. Sem CTA adicional. |

## Pendências de identidade e arte

1. Lettering/monogramas gerados dentro das cenas (fachadas, parede e camisetas) diferem das artes oficiais, especialmente painel de Musculação. São parte dos WebP fornecidos: não foram retocados nem recobertos por marcas inventadas. Revisar também a coerência das fachadas entre Hero e Localização.
2. Figura humana da Hero é conceitual: não atribuir identidade ao proprietário/equipe sem validação.
3. Entregar masters verticais de Hero, Academia, Experiência, Planos e Localização; revisar enquadramentos dos cards/Modalidades/Expansão conforme a referência mobile. Nenhum arquivo mobile inexistente é solicitado.
4. Entregar PNG transparente oficial validado do mascote para recolocação em Expansão, Localização e Footer.
5. Obter revisão AVERO/Borjão do preview; não presumir homologação desktop ou mobile, nem publicação comercial aprovada.

## Arquivos alterados

- `src/render.mjs`: composições únicas, imagens reais com dimensões/alt, remoção de placeholders e mascote não validado; rótulos conceituais.
- `src/media-slots.mjs`: registro das 11 mídias aprovadas, tamanhos/hashes e pendência vertical explícita.
- `src/main.js`: imagem/alt/dimensões sincronizados com o seletor.
- `src/styles.css`: aplicação, máscaras, enquadramentos e áreas de leitura responsivas; sem fontes novas.
- `scripts/verify.mjs`: regressões funcionais e verificações de integridade/media da Build 03.
- `public/assets/borjao/final-v1/`: 11 WebP e duas logos do pacote, sem renomeação.
- `docs/assets-build03/`: instruções e manifesto originais.
- `docs/BUILD03-INTEGRACAO-ASSETS-CHECKPOINT.md`, `docs/MAPA_DE_MIDIAS_FINAL.md`: atualização de estado com histórico preservado.
- Este registro.

Sem merge. Main, Build 01 e Build 02 não modificadas pela integração.
