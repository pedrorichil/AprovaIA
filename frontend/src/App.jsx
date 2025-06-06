// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Importa de contexts
import WelcomeScreen from './features/onboarding/WelcomeScreen';
import ObjectiveSelectionScreen from './features/onboarding/ObjectiveSelectionScreen';
import DiagnosticSimScreen from './features/onboarding/DiagnosticSimScreen';
import DashboardScreen from './features/dashboard/DashboardScreen';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';

// API_BASE_URL agora é importado de config.js dentro de AuthContext.jsx

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('welcome'); 
  const { user, loadingAuth } = useAuth(); 

  const navigate = useCallback((page) => { 
    setCurrentPage(page);
  }, []); 

  useEffect(() => {
    console.log("AppContent useEffect: user, currentPage, loadingAuth mudou", {user, currentPage, loadingAuth});
    if (loadingAuth) {
        console.log("AppContent: Autenticação ainda a carregar.");
        return; 
    }

    if (user) { 
      if (currentPage === 'welcome' || currentPage === 'login' || currentPage === 'register') {
        const hasSelectedObjective = localStorage.getItem('userFinalObjectiveId'); 
        const hasCompletedDiagnostic = localStorage.getItem('userDiagnosticCompleted');
        
        console.log("AppContent: Usuário logado. Onboarding check:", {hasSelectedObjective, hasCompletedDiagnostic});

        if (!hasSelectedObjective) {
          navigate('selectObjective');
        } else if (!hasCompletedDiagnostic) {
          navigate('diagnostic');
        } else {
          navigate('dashboard');
        }
      }
    } else { 
      if (currentPage !== 'welcome' && currentPage !== 'login' && currentPage !== 'register') {
        console.log("AppContent: Usuário não logado, redirecionando para welcome. Página atual era:", currentPage);
        navigate('welcome'); 
      }
    }
  }, [user, currentPage, loadingAuth, navigate]); 

  if (loadingAuth && currentPage !== 'welcome' && currentPage !== 'login' && currentPage !== 'register') {
    return <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white text-xl">A carregar aplicação...</div>;
  }

  switch (currentPage) {
    case 'welcome': return <WelcomeScreen navigate={navigate} />;
    case 'login': return <LoginPage navigate={navigate} />;
    case 'register': return <RegisterPage navigate={navigate} />;
    case 'selectObjective':
      if (!user && !loadingAuth) { navigate('login'); return null; } 
      return <ObjectiveSelectionScreen navigate={navigate} />;
    case 'diagnostic':
      if (!user && !loadingAuth) { navigate('login'); return null; } 
      return <DiagnosticSimScreen navigate={navigate} />;
    case 'dashboard':
      if (!user && !loadingAuth) { navigate('login'); return null; } 
      return <DashboardScreen navigate={navigate} />;
    default:
      console.log("AppContent: Rota desconhecida, fallback para welcome:", currentPage);
      return <WelcomeScreen navigate={navigate} />;
  }
};

// Esta deve ser a ÚNICA exportação default no ficheiro.
export default function App() {
  return (
    // AuthProvider é definido neste ficheiro
    <AuthProvider> 
      <AppContent />
    </AuthProvider>
  );
}
