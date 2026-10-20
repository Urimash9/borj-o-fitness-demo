# BORJÃO FITNESS — BUILD 03A / REFINO DE FIDELIDADE DESKTOP
Data: 2026-10-19 (horário local do projeto a confirmar)
Branch de trabalho: `build-03a-refino-fidelidade-desktop`
Base preservada: `build-03-assets-aprovados`
Estado: alterações de código aplicadas e deployment Vercel READY; **sem homologação visual**, sem merge em main.

## Escopo: refino cirúrgico, não redesign
Apenas `src/styles.css` e `src/render.mjs` modificados.
Assets WebP, logos, cards de planos, conteúdo, links, layout mobile, JS e interações não foram substituídos.

### Hero (01)
- Composição original preservada e ocupando todo o quadro.
- Reposicionamento vertical da cópia para se aproximar da referência.
- Redução controlada da faixa de máscara mineral sobre a foto e ajuste do CTA/badge.
- Retoques limitados a >= 1101 px para não desorganizar mobile.

### Estrutura & Ambientes (03)
- Revisão da proporção do grid (2:1), gap 11px e alturas equilibradas.
- Ajuste das diagonais e alinhamento de cards secundários.
- Bordas arredondadas no topo do card protagonista e base da tipografia preservada.
- Somente >= 1101 px.

### Localização e Contato (09)
- Causa identificada: `mask-image` final ocultava os 22% superiores inteiramente e só revelava toda a composição após 47% da altura; frame anterior com 590 px distorcia o enquadramento de um asset de 1536×1024.
- Removida a máscara integralmente em desktop, aumentado o espaço útil e ajustada a posição do asset sem gerar imagem adicional.
- Reposicionamento do card branco e selo do mapa.
- Selo agora mostra `Coromandel · MG` com link e `aria-label` para abrir Google Maps.
- Mobile <= 760 px preservado.

## Validação realizada
Deployment Vercel id: `dpl_9BetbtkNWf9s3oTYk6T2o6DSDfiY`.
URL de preview: https://borj-o-fitness-demo-5smtcfi8z-john-e7bd.vercel.app
Status READY. Build Vercel executou `node scripts/build.mjs` sem falha; os nove blocos e referências HTML a imagens locais foram resolvidos.

**PENDENTE:** revisão visual do preview desktop nas larguras 1440 e 1280 e QA mobile em 390/360. Não afirmar pixel match nem aprovação. Se a Hero e Localização ainda destoarem, corrigir apenas enquadramento/tamanho/camadas atuais sem refazer artes.

## Próximo passo, após análise visual do usuário
Rodada 03B: Modalidades (letreiro arte, previews), Expansão (mascote PNG validado), Planos (sobreposição pessoa/cards), avaliações e footer, sem redesenhos desnecessários.

## Restrições
Não fazer merge na main sem aceite. Não inventar logos, dados, planos, comentários ou obras concluídas. Imagens geradas são composições conceituais; conferir marca e identidades antes de uso comercial.
