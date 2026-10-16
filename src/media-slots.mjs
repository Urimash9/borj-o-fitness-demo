// BUILD 02 / etapa 01: metadata only. No pending filename is a requested URL.
// Sources remain null until the next art-direction phase is explicitly approved.
const definitions = [
 ['hero-ambiente','01','Ambiente interno','Documental tratado ou conceito identificado','21:9','16:9','Fade lateral e inferior; camada de fundo da Hero.'],
 ['hero-cidade','01','Cidade de Coromandel','Documental tratado','21:9','4:3','Recorte diagonal e fade superior; preservar contexto local.'],
 ['hero-fachada','01','Fachada protagonista','Documental tratado','4:3','4:3','Diagonal herdada; preservar forma arquitetônica e logo.'],
 ['hero-humano','01','Composição humana','Retrato autorizado ou conceito identificado, sem falsa identidade','3:4','3:4','Camada sobreposta atrás da fachada; recorte humano futuro.'],
 ['academia-salao','02','Salão institucional','Documental tratado ou conceito identificado','4:3','3:4','Escurecimento, fade à esquerda e moldura herdada.'],
 ['academia-escada','02','Escada e mural','Documental tratado','3:4','3:4','Corte lateral diagonal; não modificar circulação real.'],
 ['academia-cidade','02','Faixa da cidade','Documental tratado','21:9','16:9','Faixa inferior inclinada e escurecimento neutro.'],
 ['estrutura-principal','03','Salão protagonista','Documental tratado ou conceito identificado','16:10','4:3','Imagem dominante; diagonal desktop e frame mobile próprio.'],
 ['estrutura-pesos','03','Pesos livres','Documental tratado','16:9','4:5','Área secundária superior; gradiente para legenda HTML.'],
 ['estrutura-cardio','03','Área de cardio','Documental tratado','16:9','4:5','Área secundária inferior; gradiente para legenda HTML.'],
 ['modalidade-musculacao','04','Musculação','Documental tratado ou conceito identificado','3:2','4:3','Painel imersivo de corte diagonal, sincronizado ao seletor.'],
 ['modalidade-cardio','04','Cardio','Documental tratado','3:2','4:3','Mesmo painel e geometria; conteúdo sincronizado ao seletor.'],
 ['expansao-cena','05','Cena futura da expansão','Conceitual ilustrativo; não é registro de obra concluída','4:3','5:4','Grande recorte editorial; EM BREVE e demais letras em HTML.'],
 ['experiencia-ambiente','06','Ambientação do acolhimento','Documental tratado ou conceito identificado','16:9','9:16','Plano de fundo com baixa opacidade; pode derivar da cena humana.'],
 ['experiencia-humana','06','Profissional orientando aluno','Cena humana autorizada ou conceito identificado','4:3','4:5','Cena principal obrigatória; recorte assimétrico, sem avaliações.'],
 ['planos-humano','08','Cena humana dos planos','Cena humana autorizada ou conceito identificado','3:4','4:5','Sob o trilho diagonal e benefícios; área segura para texto independente.'],
 ['localizacao-fachada','09','Fachada integrada à localização','Documental tratado','4:3','4:3','Diagonal desktop; integração acima do cartão de contato no mobile.'],
 ['localizacao-mapa','09','Apoio visual de localização','Mapa real ou apoio gráfico conceitual identificado','4:3','3:2','Área do mapa preservada; links reais independentes do visual.']
];
const referenceNames = {'01':'01_hero','02':'02_a_academia','03':'03_estrutura','04':'04_modalidades','05':'05_expansao','06':'06_experiencia','08':'08_planos','09':'09_localizacao'};
export const mediaSlots = Object.fromEntries(definitions.map(([id,section,label,origin,desktopRatio,mobileRatio,treatment])=>{
 const stem=`borjao-${id}`;
 return [id,{
  id,section,label,origin,treatment,status:'awaiting-art-direction',
  desktop:{source:null,plannedFile:`${stem}-desktop.${id==='localizacao-mapa'?'svg':'webp'}`,masterRatio:desktopRatio},
  mobile:{source:null,plannedFile:`${stem}-mobile.${id==='localizacao-mapa'?'svg':'webp'}`,masterRatio:mobileRatio},
  references:{desktop:`01_REFERENCIAS_VISUAIS/desktop/${referenceNames[section]}.png`,mobile:`01_REFERENCIAS_VISUAIS/mobile/${referenceNames[section]}.png`}
 }];
}));
