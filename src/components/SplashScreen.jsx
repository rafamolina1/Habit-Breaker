import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
    const [step, setStep] = useState(1);

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(2), 3000);
        const timer2 = setTimeout(() => onComplete(), 5500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-teal-600 to-emerald-900 text-white overflow-hidden"
        >
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
                            className="mb-6 bg-white/10 backdrop-blur-md p-8 rounded-full shadow-2xl border border-white/20"
                        >
                            <Leaf className="w-20 h-20 text-white drop-shadow-lg" />
                        </motion.div>

                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200 drop-shadow-sm"
                        >
                            Habit Breaker
                        </motion.h1>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 150 }}
                            transition={{ delay: 1, duration: 1.5 }}
                            className="mt-6 h-1 bg-white/30 rounded-full overflow-hidden"
                        >
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                                className="h-full bg-white"
                            />
                        </motion.div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-light text-white mb-2">
                            Bem-vindo(a)
                        </h2>
                        <p className="text-xl text-teal-100 font-light">
                            à sua nova vida.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SplashScreen;
