// ── Cursos e Unidades Curriculares ────────────────────────────────────────────
export const UC_MAP = {
  AI_Basico: {
    label: 'Módulo Básico — Educação para o Trabalho (144h)',
    ucs: [
      'Introdução a Qualidade e Produtividade (28h)',
      'Sustentabilidade nos Processos Industriais (16h)',
      'Introdução à Tecnologia da Informação e Comunicação (40h)',
      'Saúde e Segurança no Trabalho (12h)',
      'Introdução a Indústria 4.0 (24h)',
      'Desenvolvimento Socioprofissional (8h)',
      'Autoconhecimento e Planejamento Socioprofissional (8h)',
      'Mercado de Trabalho (8h)',
    ],
  },
  AI_Intro: {
    label: 'Módulo Introdutório da Ocupação (140h)',
    ucs: [
      'Processos da Produção de Embalagens de Papel (24h)',
      'Princípios de Gestão da Qualidade e Melhoria Contínua (40h)',
      'Fundamentos de Manutenção Industrial (48h)',
      'Tecnologias para Comunicação e Análise de Dados (28h)',
    ],
  },
  AI_Esp1: {
    label: 'Módulo Específico I — Processos de Produção (176h)',
    ucs: [
      'Preparação para o Processo Produtivo (32h)',
      'Processo de Impressão de Embalagens (20h)',
      'Processos de Corte e Montagem de Embalagens (36h)',
      'Processos de Costura de Embalagens (20h)',
      'Processos de Finalização e Prensagem (20h)',
      'Planejamento e Controle da Produção e Manutenção (48h)',
    ],
  },
}

export const CURSO_GROUPS = [
  {
    group: 'Tecnologia da Informação',
    options: [
      'Técnico em Informática',
      'Técnico em Redes de Computadores',
      'Técnico em Desenvolvimento de Sistemas',
    ],
  },
  {
    group: 'Indústria / Manufatura',
    options: [
      'Técnico em Eletrotécnica',
      'Técnico em Mecânica',
      'Técnico em Mecatrônica',
      'Técnico em Automação Industrial',
    ],
  },
  {
    group: 'Administração / Gestão',
    options: ['Técnico em Administração', 'Técnico em Logística'],
  },
  {
    group: 'Aprendizagem Industrial — Embalagens de Papel (460h)',
    options: ['AI_Basico', 'AI_Intro', 'AI_Esp1'],
  },
]

export const CURSO_LABELS = {
  AI_Basico: 'Módulo Básico — Educação para o Trabalho',
  AI_Intro:  'Módulo Introdutório da Ocupação',
  AI_Esp1:   'Módulo Específico I — Processos de Produção',
}

// ── Taxonomia de Bloom ────────────────────────────────────────────────────────
export const BLOOM_COG = [
  { nivel: 'Nível 1', label: 'Lembrar',  verbs: 'Reconhecer, listar, nomear, identificar' },
  { nivel: 'Nível 2', label: 'Entender', verbs: 'Descrever, explicar, classificar, resumir' },
  { nivel: 'Nível 3', label: 'Aplicar',  verbs: 'Demonstrar, empregar, calcular, praticar' },
  { nivel: 'Nível 4', label: 'Analisar', verbs: 'Comparar, diferenciar, categorizar, examinar' },
  { nivel: 'Nível 5', label: 'Avaliar',  verbs: 'Julgar, validar, justificar, criticar' },
  { nivel: 'Nível 6', label: 'Criar',    verbs: 'Propor, elaborar, construir, planejar' },
]
export const BLOOM_PSI = [
  { nivel: 'Percepção',      label: 'Observar',   verbs: 'Distinguir, localizar, perceber, captar' },
  { nivel: 'Resp. guiada',   label: 'Executar',   verbs: 'Repetir, fabricar, montar, praticar' },
  { nivel: 'Automatismo',    label: 'Realizar',   verbs: 'Produzir, operar, medir, processar' },
  { nivel: 'Resp. complexa', label: 'Construir',  verbs: 'Coordenar, reparar, solucionar, vistoriar' },
  { nivel: 'Adaptação',      label: 'Adaptar',    verbs: 'Combinar, integrar, transformar, ajustar' },
  { nivel: 'Organização',    label: 'Organizar',  verbs: 'Estruturar, planejar, sistematizar, criar' },
]
export const BLOOM_AFE = [
  { nivel: 'Percepção',      label: 'Reconhecer',       verbs: 'Apontar, nomear, identificar' },
  { nivel: 'Resposta',       label: 'Participar',        verbs: 'Descrever, discutir, expressar' },
  { nivel: 'Valorização',    label: 'Valorizar',         verbs: 'Aceitar, preferir, decidir' },
  { nivel: 'Organização',    label: 'Organizar valores', verbs: 'Relacionar, correlacionar, julgar' },
  { nivel: 'Internalização', label: 'Internalizar',      verbs: 'Influenciar, modificar, demonstrar' },
]

// ── Estratégias MSEP ──────────────────────────────────────────────────────────
export const ESTRATEGIAS = [
  {
    label: 'Situação-Problema',
    desc: 'O Aluno resolve um problema real ou hipotético da ocupação, sem resposta prévia — promovendo postura ativa e tomada de decisão.',
  },
  {
    label: 'Estudo de Caso',
    desc: 'Exposição de fatos reais ou fictícios com análise crítica, debate e proposição de alternativas pelos Alunos.',
  },
  {
    label: 'Pesquisa Aplicada',
    desc: 'Os Alunos buscam, analisam e aplicam conhecimentos em fontes confiáveis para resolver desafios práticos do mundo do trabalho.',
  },
  {
    label: 'Projeto',
    desc: 'Ações planejadas com início e fim, organizadas em etapas, resultando em algo tangível — protótipo, relatório técnico ou método.',
  },
  {
    label: 'Projeto Integrador',
    desc: 'Estratégia interdisciplinar que articula capacidades de diferentes UCs em torno de um desafio real do mundo do trabalho.',
  },
]

export const ENSINO_OPTIONS = [
  'Exposição dialogada',
  'Atividade prática',
  'Trabalho em grupo',
  'Dinâmica de grupo',
  'Sala de aula invertida',
  'Gameficação',
  'Design Thinking',
]

export const AVALIACAO_OPTIONS = [
  'Observação / participação',
  'Ficha de observação',
  'Relatório técnico',
  'Questões orais',
  'Lista de exercícios',
  'Portfólio',
  'Rubrica de desempenho',
]

export const RECURSOS_OPTIONS = [
  'Projetor / TV',
  'Lab. informática',
  'Lab. técnico / bancadas',
  'Quadro branco',
  'Kits / ferramentas',
  'Simuladores / software',
  'Post-its / flip chart',
  'Materiais impressos',
]

export const EXTRAS_OPTIONS = [
  'Slides (template SENAI)',
  'Roteiro do professor',
  'Atividade para alunos',
]

export const STEP_LABELS = ['Professor', 'Turma', 'Contexto', 'Bloom', 'Estratégia', 'Gerar']
