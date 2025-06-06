// src/components/Navbar.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, LayoutDashboard, LogOut as LogOutIcon, Settings } from 'lucide-react'; // Ajustado LogOutIcon

const Navbar = ({ navigate }) => {
    const { user, logout } = useAuth();
    const userName = user ? user.nome_completo.split(' ')[0] : '';

    const handleLogout = () => {
        logout();
        navigate('welcome'); 
    };

    return (
        <nav className="bg-slate-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <button onClick={() => navigate(user ? 'dashboard' : 'welcome')} className="flex items-center focus:outline-none">
                        <img src="/aprovaia-logo.svg" alt="AprovaIA Logo" className="h-8 w-auto mr-2 filter invert" />
                        <span className="font-bold text-xl text-sky-400">Aprova<span className="text-slate-100">IA</span></span>
                    </button>
                    {user && (
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-slate-300 hidden sm:block">Olá, {userName}!</span>
                             <button 
                                onClick={() => navigate('dashboard')}
                                title="Painel" 
                                className="p-2 rounded-full hover:bg-slate-700 transition-colors text-slate-400 hover:text-sky-400"
                            >
                                <LayoutDashboard className="h-5 w-5"/>
                            </button>
                            <button title="Configurações" className="p-2 rounded-full hover:bg-slate-700 transition-colors text-slate-400 hover:text-sky-400">
                                <Settings className="h-5 w-5"/>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 sm:px-4 rounded-lg shadow transition-colors"
                            >
                                <LogOutIcon className="h-4 w-4 md:mr-2" /> <span className="hidden md:inline">Sair</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;