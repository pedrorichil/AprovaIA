// src/features/dashboard/DashboardScreen.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AttackPlanColumn from './AttackPlanColumn';
import ProgressColumn from './ProgressColumn';
import Navbar from '../../components/Navbar'; // Importa o Navbar

const DashboardScreen = ({ navigate }) => {
  const { user } = useAuth(); 

  if (!user) {
    console.warn("DashboardScreen: Usuário não encontrado, redirecionando para login.");
    return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Carregando ou redirecionando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <Navbar navigate={navigate} /> 
      
      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 pt-20"> 
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-sky-400 text-center">
            Seu Centro de Comando, {user.nome_completo.split(' ')[0]}!
          </h1>
          <p className="text-slate-400 text-center mt-2 text-sm sm:text-base">Acompanhe seu progresso e planeje seus estudos com inteligência.</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <AttackPlanColumn userName={user.nome_completo.split(' ')[0]} />
          </div>
          <div className="lg:col-span-2">
            <ProgressColumn user={user} />
          </div>
        </div>
         <footer className="text-center text-slate-500 mt-12 py-6 border-t border-slate-700">
            AprovaIA &copy; {new Date().getFullYear()} - Rumo à aprovação!
        </footer>
      </main>
    </div>
  );
};

export default DashboardScreen;