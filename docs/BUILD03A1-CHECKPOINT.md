# AVERO STUDIO — BORJÃO FITNESS
## Build 03A.1 · Correções cirúrgicas de fidelidade visual
Data: 2026-10-20
Branch: `build-03a1-ajustes-fidelidade`
Base: `build-03a-refino-fidelidade-desktop`
Preview Vercel: https://borj-o-fitness-demo-24fbpy48m-john-e7bd.vercel.app
Deployment: `dpl_GL9Jp9MxDyf1gW5HWDEMDfCLcKqT`
Commit de preview: `9766f9a4d85d0ddefa6583403fd6a6882a443f85`
Status: Vercel **READY**, build Node **PASSOU**. QA visual final / aceite **PENDENTES**.

### Mudanças executadas
1. **Hero desktop (01):** ampliação da zona cinza-clara de leitura por gradiente local (sem alterar imagem aprovada), pequeno ajuste de tamanho do H1 e do padding. O breakpoint >=761px contempla a visualização "Versão para computador" no Android, que frequentemente usa uma largura de ~980px, onde o refinamento anterior >=1101px não era aplicado.
2. **Estrutura & Ambientes (03):** proporção das colunas 2,2:1, recortes laterais com aproximação, espaço entre cards de 10px e cantos suavizados. Retidos 3 assets existentes.
3. **Modalidades (04):** imagem central mais alta no desktop; duas miniaturas selecionáveis (Musculação e Cardio, as duas opções existentes/confirmadas no conteúdo) com seleção sincronizada e `aria-pressed`. Alterações em HTML/CSS/JS; opções "em breve" não foram lançadas como ativas.
4. **Experiência & Acolhimento (06):** recuperação de destaque editorial no lado esquerdo com trecho da avaliação de Charlles Henrique já fornecido anteriormente pelo usuário: "Profissionais bem capacitados e prontos para te auxiliar a qualquer momento.". Não exibir estrelas não verificadas. Sem mudança da foto ou substituição da seção 07 (Avaliações).
5. **Localização & Contato (09):** preservação do mapa/fachada recuperados na 03A; refino sutil de sombra e alinhamento dos botões; links/endereço oficiais preservados.

### Mantido
- Todos os arquivos de mídia aprovados sem modificação.
- Navegação e menus, planos e valores, conteúdo editorial restante, URLs de contatos e mapa.
- `main` intacta; nenhum merge.
- Sem nova geração de imagens e sem retornar a fotos documentais antigas.
- Fundo/posicionamento mobile existente não refeito nesta rodada; a fala do usuário refere-se ao desktop reduzido na tela de celular.

### Pendências e limites conhecidos
- **Sapinho:** PNG de cabeça transparente foi encontrado mas não corresponde ao mascote aprovado espiando com duas mãos; não integrá-lo até ter recorte correto com alfa real. Evitar retângulo preto.
- **Homologação:** realizar comparação lado a lado com as referências aprovadas em telas desktop reais de 1440 e 1280px, além de mobile 390/360px; verificar leitura da Hero, cards da seção 03, sincronização das miniaturas e posicionamento do depoimento.
- **Imagens conceituais:** verificar eventuais letreiros incorretos nas próprias artes antes de divulgação comercial; não inferir que fotos da obra, pessoas ou instalações futuras são registros reais.
- **Modalidades futuras:** não anunciar funcionamento de serviços não confirmados.
- **Planos/Localização:** podem requerer microajustes adicionais depois da revisão visual do usuário. Não redesenhar.

### QA técnico realizado
Vercel clonou o commit `9766f9a`, executou `node scripts/build.mjs` e reportou `Build complete: nine semantic sections + footer; all local HTML asset references resolved.`.
Warnings não bloqueantes: `engines.node >=22` sujeito a futura atualização, config npm `cache-dir`.
**Sem teste E2E/browser comprovado:** build READY não implica equivalência visual perfeita.

### Próximo checkpoint
Somente após o usuário aprovar o preview: congelar 03A.1 e planejar rodada 03B (mobile dedicado, mascote correto, últimos retoques), sem merge automático.
