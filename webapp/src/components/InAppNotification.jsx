import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const InAppNotification = ({ message, onClose }) => {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 20 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px]"
                >
                    <Heart className="w-6 h-6 text-teal-100 animate-pulse" />
                    <div className="flex-1">
                        <p className="font-semibold text-sm">Habit Breaker</p>
                        <p className="text-white/90">{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InAppNotification;
