import React from 'react';
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

const Alert = ({ message, type = 'error', onClose }) => {
    if (!message) return null;

    const baseClasses = "border px-4 py-3 rounded-lg relative mb-4 shadow-md flex items-center";
    const typeClasses = type === 'error' 
        ? 'bg-red-100 border-red-400 text-red-700' 
        : 'bg-green-100 border-green-400 text-green-700';
    const Icon = type === 'error' ? AlertCircleIcon : CheckCircleIcon;
    const iconColor = type === 'error' ? 'text-red-500' : 'text-green-500';

    return (
        <div className={`${baseClasses} ${typeClasses}`} role="alert" aria-live="assertive">
            <Icon className={`h-5 w-5 mr-3 ${iconColor}`} />
            <span className="flex-grow">{message}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    className={`ml-4 p-1 rounded-full hover:bg-opacity-20 ${type === 'error' ? 'hover:bg-red-200' : 'hover:bg-green-200'}`}
                    aria-label="Fechar alerta"
                >
                    <span className={`text-xl font-bold ${iconColor}`}>&times;</span>
                </button>
            )}
        </div>
    );
};

export default Alert;
