import { User, BookOpen, Brain, Layers, Zap, FileText, ChevronRight } from 'lucide-react'
import Logo from '../Logo.jsx'

const STEPS = [
  {
    icon: User,
    num: '1',
    title: 'Perfil do Professor',
    color: 'text-senai-blue',
    bg: 'bg-senai-blue-lt',
    fields: ['Nome completo e formação principal', 'Especialidades técnicas', 'Experiência profissional'],
    tip: 'Quanto mais detalhada a experiência, mais o agente adapta o conteúdo ao seu perfil.',
  },
  {
    icon: BookOpen,
    num: '2',
    title: 'Dados da Turma',
    color: 'text-senai-orange',
    bg: 'bg-senai-orange-lt',
    fields: ['Curso e disciplina/UC', 'Módulo, número de alunos e duração', 'PDF do plano de curso (opcional)'],
    tip: 'Anexar o PDF do plano de curso ajuda o agente a alinhar o conteúdo com o que foi planejado.',
  },
  {
    icon: FileText,
    num: '3',
    title: 'Contexto da Aula',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    fields: ['Conteúdo já visto pela turma', 'Recursos disponíveis (projetor, laboratório…)', 'Observações sobre a turma'],
    tip: 'Informar o conteúdo anterior evita repetições e garante progressão pedagógica.',
  },
  {
    icon: Brain,
    num: '4',
    title: 'Taxonomia de Bloom',
    color: 'text-green-700',
    bg: 'bg-green-50',
    fields: ['Dimensão cognitiva (ex: Aplicar, Analisar)', 'Dimensão psicomotora (ex: Realizar, Executar)', 'Dimensão afetiva (ex: Valorizar, Participar)'],
    tip: 'Selecione um nível por dimensão. O agente usará os verbos corretos de Bloom em todo o plano.',
  },
  {
    icon: Layers,
    num: '5',
    title: 'Estratégia MSEP',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    fields: ['Estratégia principal (Situação-Problema, Projeto, etc.)', 'Estratégias de ensino (exposição, prática, dinâmica…)', 'Instrumentos de avaliação'],
    tip: 'A estratégia escolhida define a estrutura da Situação de Aprendizagem e o cronograma gerado.',
  },
  {
    icon: Zap,
    num: '6',
    title: 'Gerar Plano',
    color: 'text-senai-blue',
    bg: 'bg-senai-blue-lt',
    fields: ['Revise o resumo de tudo que foi preenchido', 'Clique em "Gerar plano de aula"', 'Copie, exporte para PDF ou gere o roteiro de slides'],
    tip: 'Após gerar, use "Voltar e editar" para ajustar qualquer campo e gerar novamente.',
  },
]

export default function PanelSobre() {
  return (
    <div className="animate-slide-up space-y-5">

      {/* Hero */}
      <div className="bg-gradient-to-br from-senai-blue-dk via-senai-blue to-senai-blue-mid rounded-3xl p-7 text-white">
        <Logo white className="mb-4" />
        <h2 className="text-xl font-bold mt-3 mb-2">Agente Pedagógico SENAI</h2>
        <p className="text-white/70 text-sm leading-relaxed max-w-xl">
          Ferramenta de inteligência artificial desenvolvida para o SENAI/SC — Lages para apoiar professores substitutos
          na criação de planos de aula completos, alinhados ao padrão SGN e à Metodologia SENAI de Educação Profissional (MSEP),
          com Taxonomia de Bloom integrada nas três dimensões.
        </p>
        <div className="flex gap-2 mt-4 flex-wrap">
          {['MSEP', 'Bloom', 'SGN', 'IA Generativa', 'v1.0'].map(tag => (
            <span key={tag} className="bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* O que é */}
      <div className="card space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-gray-400">O que é este software</div>
        <p className="text-sm text-gray-700 leading-relaxed">
          O Agente Pedagógico automatiza a criação de planos de aula para professores substitutos do SENAI.
          Ao preencher o perfil do professor, os dados da turma e as preferências pedagógicas, a inteligência artificial
          gera um plano completo com todos os campos exigidos pelo SGN — incluindo Situação de Aprendizagem, cronograma,
          competências com verbos de Bloom, avaliação diagnóstica/formativa/somativa e materiais de apoio.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          O sistema também guarda um histórico das aulas geradas para garantir progressão pedagógica e evitar
          repetição de estratégias, e permite exportar o plano em PDF pronto para revisão e lançamento no SGN.
        </p>
      </div>

      {/* Manual por aba */}
      <div className="card">
        <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Como usar — passo a passo</div>
        <div className="space-y-3">
          {STEPS.map(({ icon: Icon, num, title, color, bg, fields, tip }) => (
            <div key={num} className="border border-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">
                <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={15} className={color} />
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xs font-bold text-gray-400">PASSO {num}</span>
                  <ChevronRight size={12} className="text-gray-300" />
                  <span className="text-sm font-bold text-gray-800">{title}</span>
                </div>
              </div>
              <div className="px-4 py-3 space-y-1.5">
                {fields.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className={`w-1.5 h-1.5 rounded-full ${bg.replace('bg-', 'bg-').replace('-lt', '')} mt-1.5 flex-shrink-0`} style={{backgroundColor: 'currentColor'}} />
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${color.replace('text-', 'bg-')}`} />
                    <span>{f}</span>
                  </div>
                ))}
                <div className="mt-2 pt-2 border-t border-gray-50">
                  <p className="text-xs text-gray-400 italic">{tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dicas gerais */}
      <div className="card space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Dicas importantes</div>
        {[
          'Você pode navegar entre as abas a qualquer momento sem perder o que foi preenchido.',
          'Após gerar o plano, revise o conteúdo antes de lançar no SGN — a IA pode cometer erros técnicos pontuais.',
          'O histórico de aulas é salvo automaticamente no navegador e usado para evitar repetição pedagógica.',
          'O botão "Roteiro de Slides" gera um roteiro estruturado slide a slide com base no plano gerado.',
          'A exportação em PDF está formatada no padrão visual SENAI e pronta para impressão.',
        ].map((tip, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-senai-blue-lt text-senai-blue text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
            <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>

      {/* Rodapé */}
      <div className="text-center text-xs text-gray-300 pb-2">
        SENAI/SC · Lages · 2026 · MSEP · Bloom · SGN
      </div>
    </div>
  )
}
