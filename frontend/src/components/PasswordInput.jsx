// src/components/PasswordInput.jsx
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ id, name, value, onChange, required = true, placeholder = "********", className = "" }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                minLength={required ? 8 : undefined}
                className={`block w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 ${className}`}
                placeholder={placeholder}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-slate-400 hover:text-sky-400 focus:outline-none"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} 
            </button>
        </div>
    );
};

export default PasswordInput;