// src/features/onboarding/ObjectiveSelectionScreen.jsx
import React, { useState } from 'react';
import {
  Target,
  BookOpen as BookOpenIcon,
  Briefcase,
  Award as AwardIcon,
  CheckCircle,
  ArrowRight,
  Globe,
  Calculator,
  Atom,
  Languages,
  Milestone,
  Scale,
  Shield,
  GraduationCap,
  Search,
  ClipboardList,
  Building,
  Edit3
} from 'lucide-react'; 

const OBJETIVOS_HIERARQUIA = {
  'ENEM': {
    titulo: 'Qual área do ENEM você quer focar?',
    icone: BookOpenIcon, 
    categorias: [
      { id: 'enem_humanas', nome: 'Ciências Humanas', icone: Globe },
      { id: 'enem_exatas', nome: 'Matemática e Exatas', icone: Calculator },
      { id: 'enem_natureza', nome: 'Ciências da Natureza', icone: Atom },
      { id: 'enem_linguagens', nome: 'Linguagens e Códigos', icone: Languages },
      { id: 'enem_geral', nome: 'Simulado Geral ENEM', icone: Milestone },
    ]
  },
  'CONCURSOS': {
    titulo: 'Qual concurso é o seu alvo?',
    icone: Briefcase, 
    categorias: [
      { id: 'concurso_oab', nome: 'OAB', icone: Scale },
      { id: 'concurso_pmmg', nome: 'PMMG', icone: Shield }, 
      { id: 'concurso_ufmg', nome: 'UFMG (Técnico)', icone: GraduationCap },
      { id: 'concurso_pf', nome: 'Polícia Federal', icone: Search },
      { id: 'concurso_pc', nome: 'Polícia Civil', icone: ClipboardList },
    ]
  },
  'VESTIBULARES': {
    titulo: 'Selecione o vestibular desejado:',
    icone: AwardIcon, 
    categorias: [
      { id: 'vest_fuvest', nome: 'FUVEST', icone: Building },
      { id: 'vest_unicamp', nome: 'UNICAMP', icone: Building },
      { id: 'vest_unesp', nome: 'UNESP', icone: Building },
      { id: 'vest_outro', nome: 'Outro Vestibular', icone: GraduationCap },
    ]
  },
  'OUTRO': { 
    titulo: 'Defina seu objetivo específico',
    icone: Target,
    categorias: [
        { id: 'outro_personalizado', nome: 'Criar Plano Personalizado', icone: Edit3 },
    ]
  }
};

const CardSelecao = ({ icone, nome, onClick, selecionado, description }) => {
  const IconComponent = icone || Target; 
  return (
    <button
      onClick={onClick}
      className={`relative p-5 md:p-6 rounded-xl shadow-lg text-left w-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none
                  ${selecionado 
                    ? 'bg-sky-600 ring-4 ring-sky-400 scale-105 text-white' 
                    : 'bg-slate-800 hover:bg-slate-700/70 border border-slate-700 text-slate-100 hover:border-sky-500'}`}
    >
      {selecionado && (
        <div className="absolute top-2 right-2 h-7 w-7 bg-white rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="h-5 w-5 text-sky-600" />
        </div>
      )}
      <div className="flex items-center mb-2.5">
        <IconComponent className={`w-8 h-8 md:w-10 md:h-10 mr-4 ${selecionado ? 'text-white' : 'text-sky-400'}`} />
        <h2 className={`text-lg md:text-xl font-semibold ${selecionado ? 'text-white' : 'text-slate-100'}`}>{nome}</h2>
      </div>
      {description && (
        <p className={`text-xs md:text-sm ${selecionado ? 'text-sky-100' : 'text-slate-400'}`}>{description}</p>
      )}
    </button>
  );
};

const ObjectiveSelectionScreen = ({ navigate }) => {
  const [objetivoPrincipal, setObjetivoPrincipal] = useState(null);
  const [categoriaFinal, setCategoriaFinal] = useState(null);
  const [step, setStep] = useState(1); 

  const handleSelecaoPrincipal = (key) => {
    setObjetivoPrincipal(key);
    setCategoriaFinal(null); 
    setStep(2); 
  };

  const handleSelecaoCategoria = (categoria) => {
    setCategoriaFinal(categoria.id);
    localStorage.setItem('userFinalObjectiveId', categoria.id); 
    console.log("Seleção Final (Categoria):", categoria.id);
    navigate('diagnostic');
  };

  const handleVoltarEtapa = () => {
    setObjetivoPrincipal(null);
    setCategoriaFinal(null);
    setStep(1);
  }

  const categoriasAtuais = objetivoPrincipal ? OBJETIVOS_HIERARQUIA[objetivoPrincipal] : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-6 text-white">
      <div className="w-full max-w-2xl">
        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <Target className="w-16 h-16 sm:w-20 sm:h-20 text-sky-400 mb-4 mx-auto" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Qual é a sua principal missão?</h1>
              <p className="text-slate-300 text-sm sm:text-base">Escolha um objetivo para começarmos a trilhar sua jornada.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {Object.keys(OBJETIVOS_HIERARQUIA).map((key) => (
                <CardSelecao
                  key={key}
                  icone={OBJETIVOS_HIERARQUIA[key].icone || Target}
                  nome={key}
                  selecionado={objetivoPrincipal === key} 
                  onClick={() => handleSelecaoPrincipal(key)}
                />
              ))}
            </div>
          </>
        )}

        {step === 2 && categoriasAtuais && (
          <div className="animate-fadeIn"> 
            <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                    {React.createElement(categoriasAtuais.icone || Target, {className: "w-16 h-16 sm:w-20 sm:h-20 text-sky-400"})}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{categoriasAtuais.titulo}</h1>
                <p className="text-slate-300 text-sm sm:text-base">Selecione a área ou concurso específico.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {categoriasAtuais.categorias.map((cat) => (
                <CardSelecao
                  key={cat.id}
                  icone={cat.icone}
                  nome={cat.nome}
                  description={cat.description}
                  selecionado={categoriaFinal === cat.id}
                  onClick={() => handleSelecaoCategoria(cat)}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <button 
                onClick={handleVoltarEtapa}
                className="text-sky-400 hover:text-sky-300 font-medium transition-colors py-2 px-4"
              >
                &larr; Voltar para objetivos principais
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ObjectiveSelectionScreen;