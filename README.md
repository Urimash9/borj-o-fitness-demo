# Borjão Fitness — Demo Institucional

Demonstração de site institucional para a **Borjão Fitness**, em Coromandel–MG, com direção visual e desenvolvimento conduzidos pela **AVERO STUDIO**.

> **Status:** Build 01 funcional na branch `build-01-home-borjao`, aguardando revisão desktop/mobile. Estudos visuais são referências de design, não fotografias ou documentação fiel de obras, equipe e instalações. A construção do site deve reproduzir a direção aprovada em componentes HTML/CSS responsivos — não colocar as telas inteiras como imagens.

## Objetivos

- Apresentar a história da academia (mais de 15 anos), sua estrutura e o atendimento.
- Divulgar modalidades **confirmadas**, distinguindo-as da expansão anunciada e ainda não concluída.
- Dar visibilidade a avaliações reais, planos oficiais e benefícios incluídos.
- Facilitar o contato por WhatsApp e o acesso à localização.

## Estrutura da Home aprovada

1. **Hero:** “A academia que movimenta Coromandel.”
2. **A Academia:** história, evolução e presença local.
3. **Estrutura e Ambientes:** musculação, pesos livres e cardio.
4. **Modalidades:** faixa imersiva, seletor de treinos e imagem sincronizada.
5. **Expansão:** novidades futuras, claramente identificadas como *em breve*.
6. **Experiência e Acolhimento:** atendimento humano e acompanhamento — **sem quadro de avaliação**.
7. **Avaliações e Confiança:** depoimentos reais reunidos em um carrossel editorial.
8. **Planos e Matrícula:** mensalidades, benefícios e contatos contextualizados.
9. **Localização e Contato:** fachada + mapa + sapinho discreto marcando a localização; também funciona como **CTA final**.
10. **Footer:** marca, navegação, contatos, mascote discreto e créditos AVERO. **Não criar outra seção independente de CTA.**

## Planos e valores informados pela equipe

| Opção | Valor |
| --- | ---: |
| Mensal | R$ 159,99 |
| Mensal com desconto para parentes de 1º grau | R$ 149,99 |
| Semestral — cobrança mensal recorrente no cartão | R$ 149,99/mês |
| Anual — cobrança mensal recorrente no cartão | R$ 139,99/mês |
| 3 vezes na semana | R$ 149,99 |

**Benefícios informados, sem custo adicional:** avaliação física com nutricionista, ficha de treino personalizada e aplicativo para acompanhar os treinos.

Não afirmar que a recorrência nunca compromete limite de cartão sem confirmação específica do meio de pagamento. Preços e condições devem ser validados novamente antes da publicação definitiva.

## Contatos

- **Endereço:** Av. Governador Israel Pinheiro, 877 — Coromandel, MG.
- **WhatsApp:** [(34) 99221-7673](https://wa.me/5534992217673).
- **Instagram:** [@borjaofitness_coro](https://www.instagram.com/borjaofitness_coro/).
- **Google Maps:** [Perfil/localização](https://maps.app.goo.gl/rZAc517uVAbRsCpS9).
- **E-mail:** borjaofitness@gmail.com.

## Guardrails de design e conteúdo

- **Preservar os estudos aprovados** de desktop e mobile. Alterações posteriores devem ser pontuais; não redesenhar seções para encaixar imagens.
- Utilizar as versões claras/escuras da **logo original**, sem recriar letras, trocar o azul da marca ou inventar outro símbolo. O mesmo se aplica à assinatura AVERO STUDIO.
- Fotos provenientes de capturas devem ser tratadas como fontes de origem: preferir fotos originais de melhor resolução e verificar uso/autorização de pessoas.
- Não apresentar montagens conceituais de IA como registro verdadeiro da fachada, funcionários, alunos ou obras.
- Não anunciar **piscina olímpica**; usar apenas “piscina”/“natação” como itens da expansão a confirmar. *Funcional* e outras atividades precisam de validação antes de serem anunciadas como modalidade disponível.
- Depoimentos devem ser fiéis às avaliações verificadas, com autoria correta; não inventar nota média.
- No mobile do **footer**, corrigir proporções e espaços diretamente no HTML, preservar a organização do desktop e usar transição de cinza mineral para grafite vindo da seção 09.
- Manter CTA e navegação funcionais, especialmente WhatsApp, mapa e seletor/carrossel, respeitando acessibilidade e movimento reduzido.

## Implementação

- **GitHub:** este repositório, branch principal `main`.
- **Vercel:** projeto conectado ao GitHub, com deploys automáticos da branch principal.
- **Implementação:** HTML/CSS/JS nativos, build estático Node, sem dependências de produção. `npm run lint`, `npm run build`, `npm run preview`.
- **Revisão:** [QA e divergências da Build 01](docs/BUILD01-QA.md) · [Decisões de implementação](docs/BUILD01-IMPLEMENTACAO.md).
- **Próxima etapa:** revisar preview desktop/mobile e completar os assets pendentes. Não mergear na `main` sem aceite visual.
- **Fonte de verdade do layout:** referências visuais aprovadas e documentação de checkpoints do projeto, separadas das fotografias e dos assets finais.

---

**AVERO STUDIO** · Demo criada para apresentação e validação comercial.