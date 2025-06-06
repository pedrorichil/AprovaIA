// src/components/Card.jsx
import React from 'react';

const Card = ({ title, icon, children, className = "", onClick }) => {
    const IconComponent = icon;
    const cardBaseClasses = "bg-slate-800 p-5 md:p-6 rounded-xl shadow-xl border border-slate-700 transition-all duration-300 ease-in-out";
    const clickableClasses = onClick ? "cursor-pointer hover:border-sky-500 hover:shadow-sky-500/20 hover:-translate-y-1" : "";
    
    return (
        <div className={`${cardBaseClasses} ${clickableClasses} ${className}`} onClick={onClick}>
            {title && (
              <div className="flex items-center text-sky-400 mb-4">
                  {IconComponent && <IconComponent size={22} className="mr-3 opacity-80" />}
                  <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
              </div>
            )}
            <div className="text-slate-300 space-y-3">
                {children}
            </div>
        </div>
    );
};


export default Card;
