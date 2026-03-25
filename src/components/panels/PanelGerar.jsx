import { useState } from 'react'
import StepsBar from '../StepsBar.jsx'
import Step1Professor from '../steps/Step1Professor.jsx'
import Step2Turma from '../steps/Step2Turma.jsx'
import Step3Contexto from '../steps/Step3Contexto.jsx'
import Step4Bloom from '../steps/Step4Bloom.jsx'
import Step5Estrategia from '../steps/Step5Estrategia.jsx'
import Step6Gerar from '../steps/Step6Gerar.jsx'
import { UC_MAP, CURSO_LABELS } from '../../data/constants.js'

// ── Helpers ─────────────────────────────────────────────────────────────────
function getDisciplina(fd) { return UC_MAP[fd.curso] ? fd.uc : fd.disciplina }
function getCursoLabel(fd) {
  const { curso, cursoCustom } = fd
  if (curso === 'outro') return cursoCustom || 'Curso personalizado'
  if (UC_MAP[curso]) return 'Aprendizagem Industrial — Embalagens de Papel | ' + UC_MAP[curso].label
  return CURSO_LABELS[curso] || curso
}

// ── System prompt estático (cacheado pela Anthropic) ─────────────────────────
const PLAN_SYSTEM_PROMPT = `Você é o Agente Pedagógico SENAI. Gere planos de aula completos e técnicos no padrão SGN, alinhados à Metodologia SENAI de Educação Profissional (MSEP) e à Taxonomia de Bloom nas três dimensões (cognitiva, psicomotora, afetiva). Use terminologia técnica real do setor e sugira materiais e referências concretas e reais.

FORMATO OBRIGATÓRIO — use exatamente estes marcadores [CAMPO: Nome]:

[CAMPO: Identificação]
Preencha com os dados fornecidos: Professor, Formação, Disciplina/UC, Curso, Módulo, Alunos, Duração, Bloom, Estratégia, Data: (a preencher).

[CAMPO: Situação de Aprendizagem]
Crie um título criativo e uma narrativa de 4-6 linhas contextualizada no mundo real da ocupação, usando a estratégia MSEP informada. Desperte curiosidade e motivação nos alunos.

[CAMPO: Competências e habilidades]
Liste 3-5 competências com verbos de Bloom nas três dimensões. Inclua ao menos 1 competência socioemocional.

[CAMPO: Objetivos de aprendizagem]
Liste 4-6 objetivos mensuráveis com verbos de Bloom nas três dimensões (cognitiva, psicomotora, afetiva).

[CAMPO: Conteúdos programáticos]
Lista técnica detalhada com terminologia real do setor. Inclua subítens organizados hierarquicamente.

[CAMPO: Cronograma]
Blocos coerentes com a duração e a estratégia MSEP informadas. Formato obrigatório para cada linha: LINHA: tempo | etapa | atividade | estratégia de ensino

[CAMPO: Desenvolvimento da Situação de Aprendizagem]
Roteiro completo: abertura com avaliação diagnóstica, perguntas mobilizadoras, mediação de cada etapa, encerramento com síntese. Inclua dicas práticas para o professor substituto.

[CAMPO: Recursos didáticos]
Liste os recursos disponíveis e descreva como usá-los em cada momento da aula.

[CAMPO: Material de apoio sugerido]
Mínimo 5 itens específicos e reais: livros com autor e editora, vídeos com nome do canal, sites técnicos, normas ABNT/NR, apostilas SENAI. Seja concreto e verificável.

[CAMPO: Avaliação da aprendizagem]
Descreva os instrumentos nas funções diagnóstica, formativa e somativa (MSEP). Defina critérios nas três dimensões de Bloom.

[CAMPO: Orientações ao professor substituto]
Dicas específicas: como se preparar em 4h, o que enfatizar, como conectar o conteúdo com a formação e experiência profissional do professor.`

// ── Prompt dinâmico (dados da aula) ──────────────────────────────────────────
function buildPrompt(formData, bloom, stratData, memoriaCtx) {
  const nome = formData.nome || 'não informado'
  const formacao = formData.formacao || 'não informado'
  const disciplina = getDisciplina(formData) || 'não informado'
  const curso = getCursoLabel(formData) || 'não informado'
  const modulo = formData.modulo || '1º módulo'
  const alunos = formData.alunos || '20'
  const duracao = formData.duracao || '4h'
  const nivel = formData.nivel || 'Avançado'
  const estrategia = stratData.estrategia || 'Situação-Problema'
  const ensino = (stratData.ensino || []).join(', ')
  const instrumentos = (stratData.avaliacao || []).join(', ')
  const extras = (stratData.extras || []).join(', ')

  return `DADOS DA AULA:

PROFESSOR: ${nome} | Formação: ${formacao}
Especialidades: ${formData.especialidades || 'não informado'}
Experiência: ${formData.experiencia || 'não informado'}
Familiaridade com a disciplina: ${nivel}

TURMA: ${curso} | Disciplina/UC: ${disciplina}
Módulo: ${modulo} | Alunos: ${alunos} | Duração: ${duracao}

CONTEXTO:
Conteúdo anterior: ${formData.conteudoAnterior || 'não informado — inicie com avaliação diagnóstica'}
Recursos disponíveis: ${(formData.recursos || []).join(', ') || 'não informado'}
Observações: ${formData.observacoes || 'nenhuma'}

BLOOM: ${bloom.cog} (cognitivo) / ${bloom.psi} (psicomotor) / ${bloom.afe} (afetivo)
ESTRATÉGIA MSEP: ${estrategia}
ESTRATÉGIAS DE ENSINO: ${ensino}
AVALIAÇÃO: ${instrumentos}
EXTRAS: ${extras || 'nenhum'}${memoriaCtx}

Gere o plano completo conforme as instruções do sistema.`
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function PanelGerar({ memory, generate, genState }) {
  const [step, setStep] = useState(1)

  // Form state
  const [formData, setFormData] = useState({
    nome: '', formacao: '', especialidades: '', experiencia: '',
    curso: '', uc: '', disciplina: '', cursoCustom: '',
    modulo: '1º módulo', alunos: '20', duracao: '4h',
    nivel: 'Avançado', conteudoAnterior: '', recursos: ['Projetor / TV', 'Quadro branco'], observacoes: '',
    planoCursoPdf: null,
  })
  const [bloom, setBloom] = useState({ cog: 'Aplicar', psi: 'Realizar', afe: 'Valorizar' })
  const [stratData, setStratData] = useState({
    estrategia: 'Situação-Problema',
    ensino: ['Exposição dialogada', 'Atividade prática'],
    avaliacao: ['Observação / participação', 'Questões orais'],
    extras: [],
  })

  const handleGenerate = () => {
    const disciplina = getDisciplina(formData)
    const curso = getCursoLabel(formData)
    const memoriaCtx = memory.getContext(disciplina, curso)
    const prompt = buildPrompt(formData, bloom, stratData, memoriaCtx)

    generate(prompt, formData.planoCursoPdf, PLAN_SYSTEM_PROMPT)

    // Save to memory
    memory.save({
      nome: formData.nome,
      formacao: formData.formacao,
      especialidades: formData.especialidades,
      experiencia: formData.experiencia,
      curso,
      disciplina,
      modulo: formData.modulo,
      alunos: formData.alunos,
      duracao: formData.duracao,
      nivel: formData.nivel,
      estrategia: stratData.estrategia,
      bloom: `${bloom.cog}/${bloom.psi}/${bloom.afe}`,
      instrumentos: (stratData.avaliacao || []).join(', '),
      data: new Date().toISOString(),
    })
  }

  const handleReset = () => {
    genState.reset()
    setStep(1)
  }

  const stepProps = { onNext: () => setStep(s => s + 1), onPrev: () => setStep(s => s - 1) }

  return (
    <div>
      {/* Steps bar only before generation */}
      {genState.status === 'idle' && step < 6 && (
        <StepsBar current={step} onGoTo={setStep} />
      )}
      {genState.status !== 'idle' && (
        <StepsBar current={6} onGoTo={setStep} />
      )}

      {/* Step panels */}
      {genState.status === 'idle' && step === 1 && (
        <Step1Professor data={formData} onChange={setFormData} {...stepProps} memory={memory} />
      )}
      {genState.status === 'idle' && step === 2 && (
        <Step2Turma data={formData} onChange={setFormData} {...stepProps} memory={memory} />
      )}
      {genState.status === 'idle' && step === 3 && (
        <Step3Contexto data={formData} onChange={setFormData} {...stepProps} />
      )}
      {genState.status === 'idle' && step === 4 && (
        <Step4Bloom bloom={bloom} onChange={setBloom} {...stepProps} />
      )}
      {genState.status === 'idle' && step === 5 && (
        <Step5Estrategia data={stratData} onChange={setStratData} {...stepProps} onNext={() => setStep(6)} />
      )}
      {(genState.status !== 'idle' || step === 6) && (
        <Step6Gerar
          formData={formData}
          bloom={bloom}
          stratData={stratData}
          generate={handleGenerate}
          status={genState.status}
          dots={genState.dots}
          loadingMsg={genState.loadingMsg}
          result={genState.result}
          promptFallback={genState.promptFallback}
          onPrev={() => setStep(5)}
          onReset={handleReset}
        />
      )}
    </div>
  )
}
