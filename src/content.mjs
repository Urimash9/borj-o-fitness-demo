export const contact = {
 name: 'Borjão Fitness', address: 'Av. Governador Israel Pinheiro, 877', city: 'Coromandel · MG',
 phone: '(34) 99221-7673', whatsapp: '5534992217673', email: 'borjaofitness@gmail.com',
 instagram: 'https://www.instagram.com/borjaofitness_coro/', handle: '@borjaofitness_coro',
 maps: 'https://www.google.com/maps/search/?api=1&query=Av.%20Governador%20Israel%20Pinheiro%2C%20877%2C%20Coromandel%20MG',
 reviews: 'https://maps.app.goo.gl/rZAc517uVAbRsCpS9',
 embed: 'https://maps.google.com/maps?q=Academia%20Borj%C3%A3o%20Fitness%2C%20Avenida%20Governador%20Israel%20Pinheiro%20877%2C%20Coromandel%20MG&z=17&output=embed'
};
export const nav = [['inicio','Início'],['academia','A Academia'],['modalidades','Modalidades'],['planos','Planos'],['contato','Contato']];
export const footerNav = [...nav.slice(0,3),['expansao','Expansão'],['experiencia','Experiência'],['avaliacoes','Avaliações'],['planos','Planos'],['contato','Localização e Contato']];
export const photos = {
 facade:'01_fachada_frontal.webp', aerial:'02_fachada_aerea_obliqua.webp', room:'03_salao_musculacao_amplo.webp',
 activity:'04_musculacao_em_atividade.webp', weights:'05_halteres_pesos_livres.webp', cardio:'06_cardio_com_vista.webp',
 wall:'07_parede_logo_musculacao.webp', machines:'08_maquinas_perspectiva.webp', city:'09_fachada_aerea_frontal.webp', stairs:'10_escada_mural_entrada.webp', blue:'11_area_cardio_logo_azul.webp'
};
export const modalities = [
 {name:'Musculação',photo:photos.activity,alt:'Registro real da área de musculação em atividade',tagline:'Força, resistência e evolução no seu ritmo.',description:'Um ambiente preparado para acompanhar diferentes rotinas e objetivos.',icon:'dumbbell'},
 {name:'Cardio',photo:photos.cardio,alt:'Registro real do ambiente com equipamentos de cardio e vista externa',tagline:'Mais movimento para a sua rotina.',description:'Conheça a área de cardio e converse com a equipe sobre como incluir os equipamentos no seu treino.',icon:'heart'}
];
// Sínteses editoriais, não transcrições. Fonte: registro de ativos V0.1 do pacote V3.
// As capturas originais de avaliações não acompanham o ZIP; não exibir estrelas ou aspas.
export const reviews = [
 {author:'Wagner Martins',summary:'Aparelhos e ambiente agradável.',topic:'Estrutura & ambiente'},
 {author:'Eduardo Souza',summary:'Espaço, variedade de equipamentos e atendimento.',topic:'Equipamentos & atendimento'},
 {author:'Charlles Henrique',summary:'Acolhimento de iniciantes e ajuda dos profissionais.',topic:'Acolhimento & orientação'},
 {author:'Ubiratan Guimarães',summary:'Equipamentos e instrutores.',topic:'Estrutura & equipe'}
];
export const plans = [
 {name:'Mensal',price:'159,99',description:'Para incluir o treino na sua rotina.',icon:'user',message:'Olá! Gostaria de saber mais sobre o plano Mensal de R$ 159,99 da Borjão Fitness.'},
 {name:'Mensal para parentes de 1º grau',price:'149,99',description:'Mais saúde para você e sua família.',icon:'users',message:'Olá! Gostaria de conhecer as condições do plano para parentes de 1º grau de R$ 149,99.'},
 {name:'3 vezes por semana',price:'149,99',description:'Seu treino, três vezes na semana.',icon:'calendar',message:'Olá! Tenho interesse no plano de 3 vezes por semana de R$ 149,99.'},
 {name:'Semestral',price:'149,99',description:'Compromisso com seus resultados.',icon:'chart',recurring:true,message:'Olá! Quero saber mais sobre o plano Semestral de R$ 149,99/mês, recorrente no cartão.'},
 {name:'Anual',price:'139,99',description:'Uma rotina para continuar evoluindo.',icon:'star',recurring:true,featured:true,message:'Olá! Tenho interesse no plano Anual de R$ 139,99/mês, recorrente no cartão.'}
];
export const benefits = [['user','Avaliação física com nutricionista'],['clipboard','Ficha de treino personalizada'],['phone','Aplicativo para acompanhar os treinos']];
export const expansion = [
 {name:'Treino e performance',icon:'dumbbell',headline:'Mais estrutura para o seu desenvolvimento.',items:['Musculação ampliada','CrossFit','Aulas coletivas']},
 {name:'Novas experiências',icon:'waves',headline:'Novas possibilidades de movimento.',items:['Piscina e natação','Quadra de areia']},
 {name:'Espaços dedicados',icon:'users',headline:'Ambientes para diferentes fases da vida.',items:['Espaço para mulheres*','Espaço para idosos*']}
];
export const wa = (message='Olá! Quero conhecer a Borjão Fitness e saber mais sobre os treinos.') => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
