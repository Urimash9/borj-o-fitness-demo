# Build 01 — Contrato e decisões

Base: branch `build-01-home-borjao`, commit `c3c53e6af4d053cdd355f0a24ba3f6f6b9ba134a`. Checkpoint local `checkpoint/borjao-pre-build-01`. Main preservada (`be80fed33551e8ef5f52aa56776d44bd399bf5ad`). Pacote BORJAO_HOME_ASSETS_ORGANIZADOS_V3.zip, fonte das 20 referências examinadas antes da implementação.

## Estrutura
HTML semântico gerado no build com Node, CSS organizado por seção e JS nativo para menu, modalidades e avaliações. Sem dependências de produção: esta Home não precisa de backend ou hidratação React. A preferência por Next.js foi substituída pela stack mínima permitida no briefing. `npm run lint`, `npm run build`, `npm run preview`.

Dados em `src/content.mjs`; layout em `src/render.mjs`; tokens e breakpoints em `src/styles.css`; interações em `src/main.js`. Fontes locais e WebP. Só `dist` é publicado: ZIP e documentação não fazem parte do bundle.

## Invariantes
9 seções + Footer; Hero mineral clara; 02 escura; referências individuais prevalecem sobre colagens. Identidade original extraída, sem reconstrução; crédito textual AVERO STUDIO. Sem CTA extra após 09. Dados oficiais e cinco planos do manifesto. Atividades futuras sempre Em breve; Funcional não anunciado como disponível.

## Limitações conhecidas antes de construir
- Fotografias documentais são pequenas, com enquadramento e arquitetura diferentes das montagens. Sem reconstrução de fachada, cidade ou instalações. Retrato do proprietário ausente da Hero.
- Foto de profissional auxiliando aluna: ausente. Slot dessa cena reservado, preservando sua posição e geometria; não reutilizar pessoas de estudos como equipe real.
- Obra: não há fotografia documental da construção. Preservar campo de imagem com sinalização de registro pendente, sem inventar construção concluída.
- Mascote: apenas recorte parcial de referência; aplicar discretamente sem regenerar e registrar necessidade de original transparente.
- Logos: PNGs fiéis à captura de baixa resolução; SVG original ainda necessário para publicação final.
- Avaliações: V0.1 documenta autores e temas, mas capturas originais não acompanham o ZIP. Exibir somente sínteses editoriais explicitamente identificadas, sem aspas, estrelas, nota média ou transcrições não comprovadas. Conferência de transcrições pendente para versão definitiva.
- Mapa: busca Google por endereço oficial, link de rota real. O resultado incorporado deve ser conferido pelo responsável antes do lançamento.

## QA e comparação
Resultados e divergências por seção serão registrados em `docs/BUILD01-QA.md`. Preview é para revisão, sem aceite visual presumido e sem merge na main.
