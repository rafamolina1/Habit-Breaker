import React, { useState, useEffect } from 'react';
import { Heart, Wind, Zap, Smile, Shield, Activity, Award, Lock, CheckCircle, Clock, Battery, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

const milestones = [
    {
        id: 1,
        title: 'Pressão Normalizada',
        description: 'Sua pressão arterial e pulsação voltam ao normal.',
        duration: 20 * 60 * 1000, // 20 minutes
        icon: <Activity className="w-6 h-6" />,
        color: 'bg-red-50 text-red-600',
    },
    {
        id: 2,
        title: 'Oxigênio no Sangue',
        description: 'Níveis de monóxido de carbono caem ao normal.',
        duration: 12 * 60 * 60 * 1000, // 12 hours
        icon: <Wind className="w-6 h-6" />,
        color: 'bg-blue-50 text-blue-600',
    },
    {
        id: 3,
        title: 'Coração Mais Seguro',
        description: 'A chance de um ataque cardíaco já começa a diminuir.',
        duration: 24 * 60 * 60 * 1000, // 24 hours
        icon: <Heart className="w-6 h-6" />,
        color: 'bg-rose-50 text-rose-600',
    },
    {
        id: 4,
        title: 'Olfato e Paladar',
        description: 'Terminações nervosas regeneram; a comida tem gosto de novo!',
        duration: 48 * 60 * 60 * 1000, // 48 hours
        icon: <Smile className="w-6 h-6" />,
        color: 'bg-orange-50 text-orange-600',
    },
    {
        id: 5,
        title: 'Livre de Nicotina',
        description: 'A nicotina foi totalmente eliminada do seu corpo.',
        duration: 3 * 24 * 60 * 60 * 1000, // 3 days
        icon: <Droplet className="w-6 h-6" />,
        color: 'bg-purple-50 text-purple-600',
    },
    {
        id: 6,
        title: 'Energia Renovada',
        description: 'A circulação sanguínea melhora; caminhar fica mais fácil.',
        duration: 14 * 24 * 60 * 60 * 1000, // 2 weeks
        icon: <Zap className="w-6 h-6" />,
        color: 'bg-yellow-50 text-yellow-600',
    },
    {
        id: 7,
        title: 'Adeus Abstinência',
        description: 'Sintomas físicos de abstinência e raiva desaparecem.',
        duration: 30 * 24 * 60 * 60 * 1000, // 1 month
        icon: <Battery className="w-6 h-6" />,
        color: 'bg-green-50 text-green-600',
    },
    {
        id: 8,
        title: 'Pulmões Fortes',
        description: 'Função pulmonar aumenta em até 30%.',
        duration: 3 * 30 * 24 * 60 * 60 * 1000, // 3 months
        icon: <Wind className="w-6 h-6" />,
        color: 'bg-cyan-50 text-cyan-600',
    },
    {
        id: 9,
        title: 'Cura Profunda',
        description: 'Tosse e falta de ar diminuem drasticamente.',
        duration: 6 * 30 * 24 * 60 * 60 * 1000, // 6 months
        icon: <Shield className="w-6 h-6" />,
        color: 'bg-indigo-50 text-indigo-600',
    },
    {
        id: 10,
        title: 'Limpeza Total',
        description: 'Cílios pulmonares recuperados; risco de infecção cai.',
        duration: 9 * 30 * 24 * 60 * 60 * 1000, // 9 months
        icon: <Activity className="w-6 h-6" />,
        color: 'bg-teal-50 text-teal-600',
    },
    {
        id: 11,
        title: 'Risco Cardíaco 50%',
        description: 'Risco de doença coronariana cai pela metade.',
        duration: 365 * 24 * 60 * 60 * 1000, // 1 year
        icon: <Heart className="w-6 h-6" />,
        color: 'bg-red-50 text-red-600',
    },
    {
        id: 12,
        title: 'Coração Blindado',
        description: 'Risco de derrame cai ao nível de um não-fumante.',
        duration: 3 * 365 * 24 * 60 * 60 * 1000, // 3 years (approx 5 often cited, using 3 as user req max)
        icon: <Shield className="w-6 h-6" />,
        color: 'bg-emerald-50 text-emerald-600',
    },
];

const Achievements = ({ quitDate }) => {
    const [timeSinceQuit, setTimeSinceQuit] = useState(0);

    useEffect(() => {
        const calculateTime = () => {
            const start = new Date(quitDate).getTime();
            const now = new Date().getTime();
            setTimeSinceQuit(Math.max(0, now - start));
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000); // Live countdown needs second precision
        return () => clearInterval(timer);
    }, [quitDate]);

    const formatTimeLeft = (ms) => {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));

        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m ${seconds}s`;
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" /> Conquistas de Saúde
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {milestones.map((milestone) => {
                    const isUnlocked = timeSinceQuit >= milestone.duration;
                    const progress = Math.min(100, (timeSinceQuit / milestone.duration) * 100);
                    const timeLeft = milestone.duration - timeSinceQuit;

                    return (
                        <motion.div
                            key={milestone.id}
                            whileHover={{ scale: 1.02 }}
                            className={`p-5 rounded-xl border relative overflow-hidden transition-all ${isUnlocked
                                    ? 'bg-white border-green-100 shadow-sm'
                                    : 'bg-gray-50 border-gray-100 opacity-90'
                                }`}
                        >
                            {/* Progress Bar Background */}
                            {!isUnlocked && (
                                <div
                                    className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-1000"
                                    style={{ width: `${progress}%` }}
                                />
                            )}

                            <div className="flex items-start gap-4 z-10 relative">
                                <div className={`p-3 rounded-full ${isUnlocked ? milestone.color : 'bg-gray-200 text-gray-400'}`}>
                                    {isUnlocked ? milestone.icon : <Lock className="w-6 h-6" />}
                                </div>

                                <div className="flex-1">
                                    <h3 className={`font-semibold ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                                        {milestone.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 leading-snug">
                                        {milestone.description}
                                    </p>

                                    {isUnlocked ? (
                                        <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                            <CheckCircle className="w-3 h-3" /> Conquistado
                                        </div>
                                    ) : (
                                        <div className="mt-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-medium text-gray-500">
                                                    {progress.toFixed(0)}%
                                                </span>
                                                <span className="text-xs font-medium text-amber-600 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {formatTimeLeft(timeLeft)}
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-teal-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Achievements;
