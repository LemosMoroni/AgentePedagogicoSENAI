<div align="center">
  <img src="public/assets/senai-azul.png" alt="SENAI" height="80" />
  <br /><br />

  # Agente Pedagógico SENAI

  Ferramenta de inteligência artificial para geração automatizada de planos de aula no padrão SGN, alinhados à Metodologia SENAI de Educação Profissional (MSEP) e à Taxonomia de Bloom.

  ![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
  ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
  ![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss)
  ![Claude](https://img.shields.io/badge/Claude-Haiku-D97706?style=flat-square)
  ![License](https://img.shields.io/badge/Uso-Interno_SENAI-003087?style=flat-square)
</div>

---

## Sobre o projeto

O **Agente Pedagógico SENAI** foi desenvolvido para apoiar professores substitutos na criação de planos de aula completos e tecnicamente fundamentados. Através de um formulário guiado em 6 etapas, a ferramenta coleta os dados do professor, da turma e das preferências pedagógicas e utiliza inteligência artificial para gerar automaticamente um plano de aula estruturado com todos os campos exigidos pelo SGN.

O plano gerado contempla:

- **Situação de Aprendizagem** contextualizada no mundo real da ocupação
- **Competências e habilidades** com verbos de Bloom nas três dimensões
- **Objetivos de aprendizagem** mensuráveis
- **Conteúdos programáticos** com terminologia técnica real do setor
- **Cronograma** detalhado com estratégias MSEP
- **Desenvolvimento da aula** com roteiro completo para o professor substituto
- **Instrumentos de avaliação** nas funções diagnóstica, formativa e somativa
- **Material de apoio** com referências reais e verificáveis
- **Orientações específicas** adaptadas ao perfil do professor

---

## Funcionalidades

- Formulário guiado em 6 etapas com navegação livre entre abas
- Seleção de Taxonomia de Bloom nas três dimensões (cognitiva, psicomotora, afetiva)
- Escolha de estratégia MSEP, métodos de ensino e instrumentos de avaliação
- Suporte a cursos técnicos e Aprendizagem Industrial (Embalagens de Papel — 18 UCs mapeadas)
- Anexo de PDF do plano de curso para contextualização adicional
- Geração de roteiro de slides estruturado a partir do plano gerado
- Exportação do plano em PDF com identidade visual SENAI
- Histórico de aulas com memória adaptativa — evita repetição de estratégias
- Autocomplete nos campos com base no histórico de uso
- Interface responsiva (mobile, tablet e desktop)

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev) | 18 | Interface de usuário |
| [Vite](https://vitejs.dev) | 5 | Build e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Estilização |
| [Lucide React](https://lucide.dev) | latest | Ícones |
| [Claude Haiku](https://anthropic.com) | claude-haiku-4-5 | Geração de planos via IA |
| [Anthropic API](https://docs.anthropic.com) | 2023-06-01 | Comunicação com o modelo |

---

## Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior
- Chave de API da Anthropic — obtenha em [console.anthropic.com](https://console.anthropic.com)

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/agente-pedagogico-senai.git
cd agente-pedagogico-senai

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

Abra o arquivo `.env` e adicione sua chave de API:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-api03-SUA-CHAVE-AQUI
```

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

---

## Build para produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

---

## Estrutura do projeto

```
src/
├── components/
│   ├── steps/               # 6 etapas do formulário
│   │   ├── Step1Professor   # Perfil do professor
│   │   ├── Step2Turma       # Dados da turma e PDF do plano de curso
│   │   ├── Step3Contexto    # Contexto pedagógico
│   │   ├── Step4Bloom       # Taxonomia de Bloom
│   │   ├── Step5Estrategia  # Estratégia MSEP
│   │   └── Step6Gerar       # Revisão, geração e resultado
│   ├── panels/
│   │   ├── PanelGerar       # Painel principal
│   │   └── PanelSobre       # Manual de uso e sobre o sistema
│   ├── AutocompleteInput    # Input com sugestões do histórico
│   ├── Logo, Sidebar, Topbar, StepsBar, TagGroup, BloomGrid
├── hooks/
│   ├── useGenerate.js       # Chamada à API com prompt caching
│   └── useMemory.js         # Histórico persistente no localStorage
├── data/
│   └── constants.js         # Cursos, UCs, Bloom, estratégias MSEP
└── config.js                # Chave de API via variável de ambiente
```

---

## Segurança

A chave de API é lida exclusivamente da variável de ambiente `VITE_ANTHROPIC_API_KEY` definida no arquivo `.env`, que está listado no `.gitignore` e **nunca é enviado ao repositório**. Nunca compartilhe ou publique sua chave de API.

---

## Metodologias integradas

**MSEP — Metodologia SENAI de Educação Profissional**
Abordagem pedagógica centrada no mundo do trabalho, com Situações de Aprendizagem desafiadoras, estratégias ativas e avaliação contínua nas funções diagnóstica, formativa e somativa.

**Taxonomia de Bloom**
Framework para definição de objetivos educacionais nas dimensões cognitiva (conhecimento), psicomotora (habilidades práticas) e afetiva (atitudes e valores).

**SGN — Sistema de Gestão SENAI**
Padrão de registro e acompanhamento pedagógico do SENAI, com campos específicos que o agente preenche automaticamente.

---

<div align="center">
  <br />

  SENAI Lages - Vitor Lemos Moroni
</div>
