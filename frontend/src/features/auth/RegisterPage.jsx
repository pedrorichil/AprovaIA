// src/features/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Alert from '../../components/Alert';
import PasswordInput from '../../components/PasswordInput';
import { UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Loader2 } from "lucide-react";


const RegisterPage = ({ navigate }) => {
  const [formData, setFormData] = useState({ nome_completo: '', email: '', senha: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
        const result = await register(formData);
        if (result.success) {
          setSuccess('Conta criada com sucesso! Redirecionando para login...');
          setFormData({ nome_completo: '', email: '', senha: '' }); 
          setTimeout(() => navigate('login'), 2500);
        } else {
          setError(result.error || 'Erro ao criar conta. Tente novamente.');
        }
    } catch (err) {
        setError('Ocorreu um erro inesperado durante o registro.');
        console.error("Register Page error:", err);
    }
    setLoading(false);
  };

  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-slate-100">
      <div className="w-full max-w-md bg-slate-800 p-8 md:p-10 rounded-xl shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <UserPlus className="mx-auto h-14 w-14 text-sky-400 mb-4" />
          <h1 className="text-3xl font-bold text-sky-400">Criar Conta</h1>
          <p className="text-slate-400 mt-2">Transforme seus estudos com AprovaIA.</p>
        </div>
        <Alert message={error} type="error" onClose={() => setError('')} />
        <Alert message={success} type="success" onClose={() => setSuccess('')} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nome_completo_reg" className="block text-sm font-medium text-slate-300 mb-1">Nome Completo</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input type="text" name="nome_completo" id="nome_completo_reg" value={formData.nome_completo} onChange={handleChange} required
                    className="block w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label htmlFor="email-register-page" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input type="email" name="email" id="email-register-page" value={formData.email} onChange={handleChange} required
                    className="block w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label htmlFor="password-register-page" className="block text-sm font-medium text-slate-300 mb-1">Senha</label>
            <div className="relative flex items-center">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <PasswordInput 
                    id="password-register-page" 
                    name="senha" 
                    value={formData.senha} 
                    onChange={handleChange} 
                />
            </div>
          </div>
          <button type="submit" disabled={loading}
             className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : (
                <UserPlus size={18} className="mr-2" />
            )}
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-slate-400">
          Já tem uma conta?{' '}
          <button onClick={() => navigate('login')} className="font-medium text-sky-400 hover:text-sky-300 transition-colors">
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;