// src/features/onboarding/WelcomeScreen.jsx
import React from 'react';
import { Shield, LogIn, UserPlus } from 'lucide-react';

const WelcomeScreen = ({ navigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-center text-white">
      <Shield className="w-24 h-24 text-sky-400 mb-6 animate-pulse" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Bem-vindo ao <span className="text-sky-400">AprovaIA</span>!
      </h1>
      <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl">
        Pronto para transformar seu estudo e conquistar sua aprovação?
      </p>
      <div className="space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row">
        <button
          onClick={() => navigate('register')}
          className="w-full md:w-auto flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50"
        >
          <UserPlus className="mr-2 h-5 w-5" /> Criar Conta
        </button>
        <button
          onClick={() => navigate('login')}
          className="w-full md:w-auto flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold py-3 px-8 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
        >
          <LogIn className="mr-2 h-5 w-5" /> Já tenho conta
        </button>
      </div>
       <footer className="absolute bottom-8 text-slate-500 text-sm">
            AprovaIA &copy; {new Date().getFullYear()}
        </footer>
    </div>
  );
};

export default WelcomeScreen;