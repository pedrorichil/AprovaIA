// src/features/dashboard/ProgressColumn.jsx
import React, { useState } from 'react';
import { Award as AwardIcon, BarChart3, Flame, Star, TrendingUp, User as UserIcon, Users as UsersIcon } from 'lucide-react';
import Card from '../../components/Card'; // Importa o Card reutilizável

// Mock de dados para amigos no ranking
const friendsRankingData = [
    { id: 'friend1', name: "Ana Beatriz", xp: 2850, level: 9, avatar: "/placeholder-avatar.png" },
    { id: 'friend2', name: "Carlos Silva", xp: 2650, level: 8, avatar: "/placeholder-avatar.png" },
    // Usuário atual será inserido dinamicamente
    { id: 'friend3', name: "Mariana Costa", xp: 2300, level: 7, avatar: "/placeholder-avatar.png" },
    { id: 'friend4', name: "Lucas Almeida", xp: 2150, level: 6, avatar: "/placeholder-avatar.png" },
    { id: 'friend5', name: "Beatriz Lima", xp: 1900, level: 5, avatar: "/placeholder-avatar.png" },
];

// Mock de dados para medalhas
const userMedalsData = [
    { id: 1, name: "Maratonista", description: "Estudou por 7 dias seguidos!", icon: Flame, date: "03/06/2025", color: "text-orange-400" },
    { id: 2, name: "Mestre Álgebra", description: "Acertou 10 questões de Álgebra.", icon: BarChart3, date: "01/06/2025", color: "text-green-400" },
    { id: 3, name: "Primeiro Foco", description: "Completou uma sessão no Modo Foco.", icon: TrendingUp, date: "28/05/2025", color: "text-purple-400" },
    { id: 4, name: "Explorador", description: "Visitou 5 seções diferentes.", icon: AwardIcon, date: "25/05/2025", color: "text-yellow-400" },
];


const ProgressColumn = ({ user }) => {
  const xpForNextLevel = (user.nivel * 150) + 300;
  const currentLevelXpStart = ((user.nivel - 1) * 150) + 300;
  const xpIntoCurrentLevel = user.xp_total - currentLevelXpStart;
  const xpNeededForLevelUp = xpForNextLevel - currentLevelXpStart;
  const xpProgressPercent = xpNeededForLevelUp > 0 ? (xpIntoCurrentLevel / xpNeededForLevelUp) * 100 : 0;

  const currentUserForRanking = { 
    id: user.id || 'currentUser', name: "Você", xp: user.xp_total, level: user.nivel, 
    isCurrentUser: true, avatar: user.avatar || "/placeholder-avatar.png" 
  };
  const fullRanking = [...friendsRankingData, currentUserForRanking].sort((a, b) => b.xp - a.xp);
  const currentUserIndexInFull = fullRanking.findIndex(u => u.isCurrentUser);
  const rankingSliceStart = Math.max(0, currentUserIndexInFull - 2);
  const rankingSliceEnd = Math.min(fullRanking.length, currentUserIndexInFull + 3);
  const displayRanking = fullRanking.slice(rankingSliceStart, rankingSliceEnd);

  return (
    <div className="space-y-6 lg:space-y-8">
      <Card title="Meu Desempenho" icon={Star} className="shadow-sky-500/10">
        <div className="flex items-center mb-4">
            <img src={user.avatar || "/placeholder-avatar.png"} alt="Avatar do usuário" className="w-16 h-16 text-sky-300 mr-4 rounded-full bg-slate-700 p-1 border-2 border-slate-600" />
            <div>
                <p className="text-xl font-bold text-slate-100">{user.nome_completo}</p>
                <p className="text-sm text-sky-400 font-medium">Nível {user.nivel} - Sargento ⭐⭐</p>
            </div>
        </div>
        <div className="mb-1">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>XP Atual: {user.xp_total}</span>
                <span className="text-sky-300">Próximo Nível: {xpForNextLevel} XP</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 border border-slate-600">
                <div 
                    className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${xpProgressPercent}%` }}
                ></div>
            </div>
             <p className="text-xs text-slate-500 mt-1 text-right">
                {xpNeededForLevelUp - xpIntoCurrentLevel > 0 ? `${xpNeededForLevelUp - xpIntoCurrentLevel} XP para o Nível ${user.nivel + 1}` : "Nível Máximo Atingido!"}
            </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <Card title="Ofensiva de Estudos" icon={Flame}>
          <div className="flex items-center justify-around p-2">
            <Flame className={`w-20 h-20 sm:w-24 sm:h-24 transition-all duration-500 ${user.ofensiva_dias > 0 ? 'text-orange-500 animate-pulse' : 'text-slate-600'}`} 
                   style={{animationDuration: user.ofensiva_dias > 0 ? `${Math.max(0.5, 2 - user.ofensiva_dias * 0.1)}s` : 'none'}}
            />
            <div className="text-center">
              <p className="text-5xl sm:text-6xl font-bold text-slate-100 tracking-tight">{user.ofensiva_dias}</p>
              <p className="text-slate-400 text-sm -mt-1">dias seguidos!</p>
            </div>
          </div>
          {user.ofensiva_dias === 0 && (
            <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 px-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Retome sua ofensiva hoje!
            </button>
          )}
           {user.ofensiva_dias > 0 && user.ofensiva_dias % 5 === 0 && (
                <p className="text-xs text-center mt-2 text-yellow-400 font-semibold">Sua chama está mais forte!</p>
            )}
        </Card>

        <Card title="Minhas Conquistas" icon={AwardIcon}>
          {userMedalsData.length > 0 ? (
            <div className="flex space-x-3 overflow-x-auto pb-2 custom-scrollbar-horizontal -mx-1 px-1">
              {userMedalsData.slice(0, 4).map(medal => { 
                const MedalIcon = medal.icon;
                return (
                  <div key={medal.id} title={`${medal.name} - ${medal.description}\nConquistada em: ${medal.date}`}
                       className="flex-shrink-0 flex flex-col items-center justify-center p-3 bg-slate-700/70 rounded-lg w-24 h-28 cursor-pointer hover:bg-slate-700 transition-colors group border border-slate-600 hover:border-sky-500">
                    <MedalIcon className={`w-10 h-10 ${medal.color || 'text-yellow-400'} group-hover:scale-110 transition-transform mb-1`} />
                    <p className="text-xs text-center font-medium text-slate-200 truncate w-full">{medal.name}</p>
                    <p className="text-xs text-slate-500">{medal.date}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center py-4">Continue estudando para ganhar medalhas!</p>
          )}
        </Card>
      </div>

      <Card title="Ranking de Amigos" icon={UsersIcon}>
        <ul className="space-y-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
          {displayRanking.length > 0 ? displayRanking.map((friend, indexInDisplay) => {
            const globalRank = fullRanking.findIndex(u => u.id === friend.id) + 1;
            return (
                <li key={friend.id || `rank-${indexInDisplay}`} 
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors
                                ${friend.isCurrentUser ? 'bg-sky-600/40 border-2 border-sky-500 shadow-lg' : 'bg-slate-700/60 hover:bg-slate-700 border border-slate-600'}`}>
                <div className="flex items-center">
                    <span className={`w-7 text-center font-semibold mr-3 ${friend.isCurrentUser ? 'text-sky-300' : 'text-slate-400'}`}>{globalRank}.</span>
                    <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full mr-3 bg-slate-600 border border-slate-500"/>
                    <span className={`${friend.isCurrentUser ? 'font-bold text-sky-200' : 'text-slate-200'}`}>{friend.name}</span>
                </div>
                <span className={`font-semibold ${friend.isCurrentUser ? 'text-sky-200' : 'text-slate-300'}`}>{friend.xp} XP</span>
                </li>
            );
            }) : (
                <p className="text-slate-400 text-sm text-center py-4">Adicione amigos para comparar seu progresso!</p>
            )}
        </ul>
      </Card>
    </div>
  );
};

export default ProgressColumn;
