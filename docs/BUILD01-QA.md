# Build 01 — QA e divergências para revisão

Data: 15/10/2026. Status: primeira implementação funcional, **aguardando revisão visual do usuário**. Não representa aprovação de fidelidade ou autorização de merge.

## Evidência técnica
- `npm run lint`: passou (verificação de sintaxe Node para JS/MJS).
- `npm run build`: passou. Todos os arquivos locais referenciados pelo HTML foram resolvidos.
- Playwright com Chromium 153: 1440, 768, 390, 360, 320 e 1920 px; sem overflow do documento, sem exceções JS e sem erros HTTP locais. Nove seções, um Footer, um H1, cinco planos.
- Testados: menu mobile, Escape e retorno de foco, fechamento por navegação; seletor de treinos por clique e setas com imagem/texto sincronizados; carrossel editorial com anterior/próximo, Home/End e swipe; âncoras; telefone e mensagem de todos os CTAs WhatsApp, preços de cada plano; decodificação das imagens; movimento reduzido.
- Capturas por seção e de página completa nos quatro tamanhos pedidos; comparação humana com os estudos individuais do V3. Sem cálculo de similaridade ou alegação de pixel-perfect.
- Logos originais derivados de captura, fonte Montserrat local com licença OFL e WebP; assets de produção ≈ 1 MB. Sem dependências de produção, rastreadores ou formulários de coleta.
- QA não inclui envio de mensagens, contratação de planos ou validação comercial de preços pela academia.

## Comparação seção a seção

| Seção | Composição preservada | Divergências / limitações |
| --- | --- | --- |
| 01 Hero | Mineral clara, logo escura/azul, título preto/azul, texto à esquerda, recorte diagonal e fachada real à direita/abaixo no mobile, ambiente ao fundo e cidade em faixa inferior | Sem retrato do dono por ausência de asset oficial. Fachada real tem poste e fiação, arquitetura e luz diferentes da montagem. Resolução das fotos limita nitidez grande. Não houve remoção generativa de elementos. Selo mobile reposicionado para não encobrir o botão. |
| 02 Academia | Escura, história à esquerda, salão e escada à direita, três indicadores cinza neutro e faixa de Coromandel | Imagens reais diferem das fotos sintéticas do estudo. Faixa usa recorte do entorno que existe na captura, não panorama inventado. Corrigido recorte que exibia céu demais. |
| 03 Estrutura | Mineral, uma foto grande e duas secundárias, cortes diagonais desktop; principal + duas menores mobile; quatro ícones | Fotos documentais e textos limitados ao acervo. Tipografia mobile ajustada para aproximar quebras. Setas reservam espaço para não cobrir descrições. |
| 04 Modalidades | Cabeçalho claro/faixa imersiva desktop, versão mobile escura, foto única e seletor sincronizado | Dois treinos verificáveis; Funcional apenas A confirmar. Removidos seis itens futuros/“olímpica” do estudo mobile. Cardio descrito como área, sem afirmar contratação separada. |
| 05 Expansão | Mineral, fotografia/slot à esquerda, índice editorial em três grupos, EM BREVE monumental, sapinho espiando a borda no mobile | Foto da obra ausente: slot gráfico claramente identificado como fotografia oficial a inserir. Cinco novidades futuras; espaços para mulheres/idosos marcados A confirmar. Sem data ou andamento percentual. |
| 06 Experiência | Escura, título e texto à esquerda, cena/slot à direita, três valores e linhas diagonais | Cena real de atendimento ausente: posição reservada, sem pessoa sintética. Ambientação com parede real. Nenhum depoimento ou estrela. |
| 07 Avaliações | Mineral, composição editorial recortada, principal e lista lateral; mobile em sequência, controles manuais | Capturas originais ausentes: apenas sínteses dos temas/autores documentados no Registro V0.1. Sem transcrições, estrelas, nota média ou contagem total. O ornamento de aspas é decorativo; os textos estão identificados como sínteses. Antes da versão final, substituir por transcrições fiéis com as capturas. |
| 08 Planos | Escura/fotográfica + trilho mineral diagonal desktop, cinco painéis recortados, versão mobile, benefícios e CTAs | Sem foto sintética de equipe, usada foto real do ambiente. Textos oficiais prevalecem sobre arte; sem “não compromete limite”, taxa zero ou fidelidade inventada. |
| 09 Localização | Mineral, fachada real, mapa/rota à direita desktop e acima da fachada mobile, contato sobreposto; último CTA | Google Maps por endereço oficial. Embed retornou `ERR_EMPTY_RESPONSE` no ambiente; link permanente para abrir mapa real e botão de rota fornecidos. Pin exato do serviço ainda precisa de conferência no Google; sapinho é decorativo, não um pin georreferenciado. |
| Footer | Três colunas desktop; mesmas colunas em sequência no mobile, fade mineral→grafite, geometria azul, contatos reais | Mantida referência desktop, mobile provisório não copiado literalmente. Sem YouTube, sem A triangular. Crédito textual AVERO STUDIO, copyright 2026. Mascote é o recorte parcial disponível, com original transparente pendente. |

## Ajustes realizados após primeira inspeção
Selo da Hero mobile separado do CTA; enquadramento da cidade na seção 02; escala do título 03 mobile; espaço para setas nas secundárias; mascote 05 limitado ao mobile e aos olhos acima da borda; rota do Maps visível mesmo sem carregamento do embed.

## Pendências para fechar fidelidade
1. Registro oficial da obra e fotografia autorizada de orientação/atendimento (slots 05 e 06).
2. Logo Borjão em alta resolução, mascote transparente e retrato oficial se a sobreposição da Hero for mantida.
3. Capturas/textos originais das avaliações e confirmação de autoria antes de substituir as sínteses.
4. Conferência do ponto no Maps e dos preços/condições com a equipe.
5. Revisão visual do usuário em desktop e mobile; sem merge na main até esse aceite.

## Reproduzir
`npm run lint`, `npm run build`, `npm run preview`.
Para os testes de navegador, disponibilizar Playwright no ambiente e executar `npm run test:e2e`; `CHROMIUM_PATH` aceita um Chromium externo. O runner inicia o servidor de teste quando `BASE_URL` não é informado. Capturas e resultado JSON são gravados em `qa/` (ignorado no git). As chamadas externas ao Google Maps são independentes da disponibilidade local.
