// src/contexts/AuthContext.jsx
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { API_BASE_URL } from '../config'; // Importa a URL base da API

const AuthContext = createContext(null); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem('aprovaia_token')); 
  const [loadingAuth, setLoadingAuth] = useState(true); 

  const logout = useCallback(() => { 
    setToken(null);
    setUser(null);
    localStorage.removeItem('aprovaia_token');
    localStorage.removeItem('userFinalObjectiveId'); 
    localStorage.removeItem('userDiagnosticCompleted');
  }, []); 

  const fetchCurrentUser = useCallback(async () => { 
    if (!token) {
      setLoadingAuth(false);
      setUser(null); 
      return;
    }
    setLoadingAuth(true);
    try {
      console.log("AuthProvider: Buscando usuário atual com token...");
      await new Promise(resolve => setTimeout(resolve, 500)); 
      setUser({ nome_completo: 'Usuário Mockado via AuthProvider', email: 'mock@aprova.ia', id_plano_assinatura: 1, id_mentor_escolhido: 1, xp_total: 120, nivel: 2, ofensiva_dias: 4, avatar: "/placeholder-avatar.png" }); 
    } catch (error) {
      console.error("AuthProvider: Erro ao buscar usuário:", error);
      logout();
    } finally {
      setLoadingAuth(false);
    }
  }, [token, logout]); 

  useEffect(() => { 
    if (token) {
        fetchCurrentUser();
    } else {
        setUser(null); 
        setLoadingAuth(false); 
    }
  }, [token, fetchCurrentUser]); 

  const login = async (email, password) => {
    console.log("AuthContext: Tentando login com:", email);
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockToken = `mock_jwt_token_${Date.now()}`;
    localStorage.setItem('aprovaia_token', mockToken);
    setToken(mockToken); 
    return { success: true };
  };

  const register = async (userData) => {
    console.log("AuthContext: Registrando com:", userData);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, data: { id: Date.now(), ...userData } };
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, loadingAuth, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 
