# AVERO STUDIO — BORJÃO FITNESS / BUILD 02
## Checkpoint: estrutura sem fotografias documentais, pronta para receber cenas tratadas

**Branch:** `build-02-base-visual-borjao`  
**Origem:** `build-01-home-borjao`  
**Status:** etapa 01 implementada; base sem fotos documentais aguardando revisão visual. Geração e integração de novas imagens ainda não autorizadas.

### Intenção aprovada pelo cliente interno AVERO
A primeira implementação reproduziu boa parte da estrutura da Home, porém usou as fotos originais/documentais, com aparência distinta das referências visuais tratadas e aprovadas. A intenção agora é preservar integralmente o HTML/CSS/JS aproveitável e retirar **temporariamente da renderização** as fotos documentais, mantendo espaços, recortes e geometria à espera de imagens finais com direção de arte equivalente aos estudos.

**Não confundir isso com transformar toda a Home em imagens chapadas.** Títulos, textos, botões, cards, menus, depoimentos e carrosséis devem permanecer componentes reais, acessíveis e responsivos.

### Contrato de não-regressão
- Não modificar a branch `main` nem `build-01-home-borjao`; não apagar os assets originais do Git.
- Manter nove seções e footer, mesma ordem, copy oficial, WhatsApp, endereço, preços, benefícios, navegação e interações. Nenhuma décima seção de CTA.
- Preservar a referência definitiva da Hero **cinza mineral claro** (desktop/mobile); a seção 02 continua escura, e a alternância de tons prossegue.
- Manter logo oficial claro/escuro como PNG verificado; créditos da AVERO em texto caso a arte oficial não esteja disponível. Não regenerar símbolos, marcas, retrato do proprietário, nem foto de instalações inexistentes.
- Não tratar cenas geradas por IA como registros documentais da Borjão. A futura demo deve indicar claramente quando um visual for ilustrativo/conceitual e validar com a academia o que poderá ser publicado.

### Arquivos técnicos da Build 01
- `src/render.mjs`: seções + helper `img()` e uso de `photos` em Hero, Academia, Estrutura, Modalidades, Experiência, Planos e Localização.
- `src/styles.css`: posição, corte, opacidade, overlays e responsividade de fotos.
- `src/content.mjs`: nomes de `photos`, modalidades, reviews, planos e contatos.
- `src/main.js`: o seletor de Modalidades troca o `src` de uma imagem. Adequar a interação para slots sem solicitar imagem faltante.
- `public/assets`: fotos originais, logos e mascote. Preservar fisicamente; apenas desativar referência no DOM/build de preview.
- `scripts/verify.mjs`: adaptar checagens caso necessário sem remover testes de qualidade/acessibilidade.

### Inventário de slots a preservar visualmente
| Área | Slots artísticos finais a preparar posteriormente |
| --- | --- |
| 01 Hero | salão ao fundo, cidade no recorte, fachada principal, retrato/elemento humano se houver material autorizado |
| 02 A Academia | salão de musculação, escada/mural, paisagem urbana inferior |
| 03 Estrutura | salão protagonista, pesos livres, cardio |
| 04 Modalidades | imagem principal para cada modalidade confirmada, evitando imagens quebradas durante a troca |
| 05 Expansão | imagem conceitual ilustrativa da expansão com lettering EM BREVE como HTML, mascote discreto sobre o topo interno |
| 06 Experiência | composição ilustrativa de orientação profissional/aluno, sem atribuir identidade real indevidamente |
| 07 Avaliações | sem fotografia obrigatória; manter cards editoriais e conteúdo somente de fontes verificadas |
| 08 Planos | cena tratada compatível com o layout, sem interferir com preços/benefícios renderizados em HTML |
| 09 Localização | fachada tratada, mapa estilizado como apoio visual sem suprimir links reais de rota/endereço |
| Footer | sem fotografia obrigatória; manter marcas oficiais, contato e gradiente mineral→grafite |

### Critérios de aceite da base sem fotografias
1. Cada área continua com proporção, espaço reservado, diagonais, hierarquia, ritmo visual e fundos equivalentes às referências aprovadas. Slots têm identificação discreta de uso interno, sem textos visíveis como “imagem quebrada”.
2. Nenhum request desnecessário das fotos antigas no preview. Nenhuma mídia faltante causa erro, CLS excessivo ou colapso de layout.
3. Ícones, logotipo, mascote e marcas aprovadas não são removidos indiscriminadamente. SVGs e gradientes decorativos continuam.
4. Seletor de modalidades, avaliações, CTA, links do Maps e navegação continuam funcionais.
5. Build/lint/testes passam e há preview **desta nova branch** com capturas desktop/mobile.
6. A fase futura de assets terá `docs/MAPA_DE_MIDIAS_FINAL.md` e nomes estáveis, separando concept art da fotografia documental.

### Próximo passo
Executar limpeza cirúrgica nesta branch, apresentar preview para aceite da base e **só depois** integrar cenas tratadas extraídas/reconstruídas sob direção das referências aprovadas, uma seção por vez.

### Entrega da etapa 01 — 16/10/2026
- Base preservada: `b2aceb50db1d9f0965428bb6ab2f1df27605b21b`, derivada da Build 01 `9e66eb9`.
- 18 slots de mídia registrados, com 17 ativos por vez no DOM (painel compartilhado de modalidades).
- Fotografias documentais retiradas apenas da renderização; originais, logos, mascote, textos comerciais e interações preservados.
- Inventário: [MAPA_DE_MIDIAS_FINAL.md](MAPA_DE_MIDIAS_FINAL.md).
- Evidências, escopo da comparação e divergências: [BUILD02-QA.md](BUILD02-QA.md).
- O próximo passo depende do aceite da estrutura. Nenhuma imagem nova gerada ou integrada; nenhum merge na main.
