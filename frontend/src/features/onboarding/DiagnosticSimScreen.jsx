// src/features/onboarding/DiagnosticSimScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { CheckSquare, FastForward, Loader2, AlertCircleIcon } from 'lucide-react'; 

const questionsData = [
  { id: 1, text: "Qual a capital da França?", type: "mcq", options: ["Londres", "Berlim", "Paris", "Madri"], answer: "Paris" },
  { id: 2, text: "Resolva: 2 + 2 * 2 = ?", type: "mcq", options: ["6", "8", "4", "10"], answer: "6" },
  { id: 3, text: "Quem descobriu o Brasil?", type: "mcq", options: ["Cristóvão Colombo", "Pedro Álvares Cabral", "Vasco da Gama", "Fernão de Magalhães"], answer: "Pedro Álvares Cabral" },
  { id: 4, text: "Qual o maior planeta do sistema solar?", type: "mcq", options: ["Terra", "Marte", "Júpiter", "Saturno"], answer: "Júpiter" },
  { id: 5, text: "Em que ano começou a Segunda Guerra Mundial?", type: "mcq", options: ["1914", "1939", "1941", "1945"], answer: "1939" },
];


const DiagnosticSimScreen = ({ navigate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const localQuestionsData = questionsData || []; 
  const totalQuestions = localQuestionsData.length;
  const currentQuestion = localQuestionsData[currentQuestionIndex];
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  const handleSubmit = useCallback(async () => { 
    if(isSubmitting) return; 
    setIsSubmitting(true);
    setError('');
    console.log("Respostas do diagnóstico:", answers);
    await new Promise(resolve => setTimeout(resolve, 2500)); 
    setIsSubmitting(false);
    localStorage.setItem('userDiagnosticCompleted', 'true');
    navigate('dashboard'); 
  }, [isSubmitting, answers, navigate]); 

  useEffect(() => { 
    if (isSubmitting) return; 

    const handleTimeUp = () => {
        if (currentQuestionIndex < totalQuestions && timeLeft <= 0 && !isSubmitting) {
            handleSubmit();
        }
    };
    
    if (timeLeft <= 0 || currentQuestionIndex >= totalQuestions) {
        handleTimeUp(); 
        return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentQuestionIndex, totalQuestions, handleSubmit, isSubmitting]); 

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, answer) => {
    if (isSubmitting || !currentQuestion) return; 
    setAnswers({ ...answers, [questionId]: answer });
    const optionButton = document.querySelector(`button[data-option-id="${answer}"][data-question-id="${questionId}"]`);
    if(optionButton) {
        optionButton.classList.add('ring-2', 'ring-sky-400', 'scale-105');
        setTimeout(() => {
            optionButton.classList.remove('ring-2', 'ring-sky-400', 'scale-105');
        }, 300)
    }
  };

  const handleNext = () => {
    if (!currentQuestion || !answers[currentQuestion.id]) { 
        setError("Por favor, selecione uma resposta antes de avançar.");
        return;
    }
    setError('');
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6">
        <Loader2 className="w-20 h-20 text-sky-400 animate-spin mb-6" />
        <h1 className="text-3xl font-semibold mb-3">Analisando seus superpoderes...</h1>
        <p className="text-slate-300 max-w-md text-center">Nossa IA está preparando seu plano de ataque personalizado. Aguarde um momento!</p>
         <div className="w-full max-w-md bg-slate-800 rounded-full h-2.5 overflow-hidden mt-8">
            <div className="h-full bg-sky-500 animate-pulse" style={{ width: `100%`, animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }
  
  if (!currentQuestion && !isSubmitting) { 
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6">
            <CheckSquare className="w-20 h-20 text-green-400 mb-6" />
            <h1 className="text-3xl font-semibold mb-3">Diagnóstico Finalizado!</h1>
            <p className="text-slate-300 mb-6">Redirecionando para seu Centro de Comando...</p>
        </div>
    );
  }
  if (!currentQuestion) {
      return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Carregando questão...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-6 text-white">
      <header className="w-full max-w-3xl mb-6 mt-4">
        <p className="text-sky-400 text-lg font-semibold text-center">Vamos mapear seus superpoderes!</p>
        <div className="mt-3 bg-slate-700 rounded-full h-3 w-full overflow-hidden border border-slate-600">
          <div
            className="bg-gradient-to-r from-sky-500 to-green-400 h-full rounded-full transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>Questão {currentQuestionIndex + 1} de {totalQuestions}</span>
          <span className={`font-mono tabular-nums ${timeLeft <= 60 ? 'text-red-400 font-semibold' : ''}`}>{formatTime(timeLeft)}</span>
        </div>
      </header>

      <main className="w-full max-w-3xl bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700">
        {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-md flex items-center text-sm">
                <AlertCircleIcon size={18} className="mr-2"/> {error}
            </div>
        )}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-1">Questão {currentQuestion.id}:</h2>
          <p className="text-slate-300 leading-relaxed">{currentQuestion.text}</p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              data-question-id={currentQuestion.id}
              data-option-id={option}
              onClick={() => handleAnswer(currentQuestion.id, option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ease-in-out
                          ${answers[currentQuestion.id] === option 
                            ? 'bg-sky-600 border-sky-400 text-white font-semibold ring-2 ring-sky-300 ring-offset-2 ring-offset-slate-800' 
                            : 'bg-slate-700 border-slate-600 hover:bg-slate-600/70 hover:border-sky-500'}`}
            >
              <span className="mr-2 font-medium">{(String.fromCharCode(65 + index))} )</span> {option}
            </button>
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!currentQuestion || !answers[currentQuestion.id] || isSubmitting} 
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex < totalQuestions - 1 ? 'Próxima' : 'Finalizar Diagnóstico'}
            <FastForward className="ml-2 h-5 w-5" />
          </button>
        </div>
      </main>
       <footer className="mt-auto pt-8 text-slate-500 text-sm">
            Simulado de Diagnóstico - AprovaIA
        </footer>
    </div>
  );
};

export default DiagnosticSimScreen;
