# BORJÃO FITNESS — CHECKPOINT BUILD 01
**Status:** referências visuais fechadas; aguardando implementação funcional e QA na branch.
**Repositório:** `Urimash9/borj-o-fitness-demo`
**Branch:** `build-01-home-borjao`
**Vercel:** `borj-o-fitness-demo`

## Referência principal atualizada
A **Hero cinza mineral claro**, desktop e mobile, substitui todas as variantes dark anteriores. Seus dois arquivos estão no pacote **BORJAO_HOME_ASSETS_ORGANIZADOS_V3.zip**:
- `01_REFERENCIAS_VISUAIS/desktop/01_hero.png`
- `01_REFERENCIAS_VISUAIS/mobile/01_hero.png`

O executor deve receber explicitamente o ZIP V3 como anexo; ele **não está armazenado neste repositório** e não deve ser simulado como disponível. O plano detalhado está em `05_PARA_WORK/PROMPT_IMPLEMENTACAO_WORK.txt` dentro do pacote.

## Escopo
Construir HOME com 9 seções: Hero, A Academia, Estrutura, Modalidades, Expansão, Experiência, Avaliações, Planos e Localização/Contato; em seguida Footer. **A seção 09 já é CTA final.** Não criar uma décima seção de conversão.

## Guardrails
- Não substituir composições aprovadas por designs genéricos, nem montar a interface como imagens planas.
- Seções 01 (cinza claro) e 02 (escura) devem alternar corretamente os tons.
- Separar fotos documentais de conceitos gerados; foto sintética não pode ser divulgada como fotografia real.
- 02: três cards cinza neutro. 05: expansão identificada como futura. 06: sem avaliações. 07: avaliações verificadas. 08: cinco planos e benefícios informados oficialmente. 09: endereço correto, mapa real, sapinho discreto. Footer: transição mineral→grafite, copyright 2026 e crédito textual AVERO se não houver logo oficial.
- Não anunciar piscina **olímpica**; não colocar Funcional como modalidade vigente sem confirmação.
- Dados: Av. Governador Israel Pinheiro, 877, Coromandel/MG; WhatsApp +55 34 99221-7673; Instagram @borjaofitness_coro.
- Nunca inventar URL de deploy; verificar na Vercel.
- Alterar só na branch e solicitar QA/aceite antes do merge para main.

## Próximo checkpoint
Primeira implementação funcional com preview desktop/mobile, comparação seção a seção e lista de pendências.
