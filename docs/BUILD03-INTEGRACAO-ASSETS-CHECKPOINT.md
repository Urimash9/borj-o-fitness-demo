# AVERO STUDIO — BORJÃO FITNESS · BUILD 03
## Integração de mídia tratada às referências aprovadas

**Branch:** `build-03-assets-aprovados` (criada de `build-02-base-visual-borjao`).
**Estado:** pacote local curado para transferência ao Work/Codex; **as imagens ainda não foram enviadas ao GitHub**. Não declarar implantação nem preview concluídos.

O pacote ZIP `BORJAO_BUILD03_ASSETS_APROVADOS.zip` foi criado com 11 mídias WebP (desktop), duas variantes de logo pré-existentes, `MANIFESTO_ASSETS_BUILD03.json`, `LEIA-PRIMEIRO.md` e `PROMPT_WORK_BUILD03.txt`. O usuário deve anexá-lo à tarefa do Work para copiar binários para `public/assets/borjao/final-v1/`.

## Mapeamento de arte
| Seção | Asset primário | Regra |
|---|---|---|
| 01 Hero | `borjao-s01-hero-composicao-desktop.webp` | Imagem de fundo ÚNICA; HTML de textos e CTAs; não duplicar diagonal |
| 02 Academia | `borjao-s02-academia-composicao-desktop.webp` | Composição ÚNICA; cards/títulos em HTML |
| 03 Estrutura | `borjao-s03-estrutura-salao-desktop.webp` | Card grande |
| 03 Estrutura | `borjao-s03-estrutura-pesos-desktop.webp` | Card superior secundário |
| 03 Estrutura | `borjao-s03-estrutura-cardio-desktop.webp` | Card inferior secundário |
| 04 Modalidades | `borjao-s04-modalidade-musculacao-desktop.webp` | Painel interativo de Musculação |
| 04 Modalidades | `borjao-s04-modalidade-cardio-desktop.webp` | Painel interativo de Cardio |
| 05 Expansão | `borjao-s05-expansao-obra-desktop.webp` | **Somente** dentro do frame da obra, fade lateral por CSS; texto EM BREVE em HTML |
| 06 Experiência | `borjao-s06-experiencia-acolhimento-desktop.webp` | Composição de fundo com área segura à esquerda |
| 08 Planos | `borjao-s08-planos-composicao-desktop.webp` | Base única; cinco cards e benefícios em HTML |
| 09 Localização | `borjao-s09-localizacao-composicao-desktop.webp` | Fachada/mapa ilustrativo numa composição; card branco e rotas reais em HTML |

**07 Avaliações e Footer:** permanecer em HTML; não há mídia fotográfica obrigatória nesta rodada. Logos oficiais atuais não podem ser recriadas. A fonte do sapinho antigo tinha fundo preto, por isso **não** embutir nem substituir automaticamente por um recorte ruim; corrigir somente mediante PNG com transparência validada.

### Fidelidade e segurança editorial
- A referência aprovada é a fonte visual; não redesenhar a Home nem achatá-la num screenshot.
- A arte é ilustrativa/conceitual, não fotografia documental de uma reforma concluída ou retrato autorizado de pessoas reais. Verificar uso público com a academia antes da publicação comercial.
- Reavaliar eventuais letreiros gerados incorretamente dentro das fotos; não inventar marcas, iniciais, ponto vermelho ou texto de parede.
- Manter endereço, Instagram, telefone, WhatsApp, horários, preços e cobrança recorrente exatamente como no conteúdo atual, sem inventar.
- A versão mobile **não está homologada** com os novos backgrounds: usar recorte inteligente como primeira aproximação e produzir variantes verticais quando necessário, seguindo as referências mobile já aprovadas.
- QA a 1440, 1280, 768, 390, 360 e 320px; sem 404, overflow, texto não clicável ou duplicação de diagonais.
- Revisar e obter aceite no preview da branch antes de merge na main.

### Execução
1. Anexar ZIP ao Work/Codex e ler o `PROMPT_WORK_BUILD03.txt` e `MANIFESTO_ASSETS_BUILD03.json`.
2. Transferir todos os arquivos para `public/assets/borjao/final-v1/`.
3. Vincular CSS/render/mediaSlots e atualizar seletor de Modalidades sem quebra de ARIA, transições e links.
4. Executar lint, build, QA visual desktop/mobile e publicar preview de **Build 03**.
5. Documentar divergências e aguardar aceite antes de merge.
