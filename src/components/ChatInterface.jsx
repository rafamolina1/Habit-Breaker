import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Bot, User, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInterface = ({ userName = '', userPronoun = 'ele/dele' }) => {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('chatHistory');
        return saved ? JSON.parse(saved) : [
            { role: 'assistant', content: "Olá! Estou aqui para te apoiar na sua jornada sem fumar. Como você está se sentindo hoje?", timestamp: new Date().toISOString() }
        ];
    });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const apiKey = import.meta.env.VITE_GROQ_API_KEY || "";

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(messages));
        scrollToBottom();
    }, [messages]);

    const clearChat = () => {
        if (window.confirm("Deseja apagar todo o histórico da conversa?")) {
            const initialMsg = [{ role: 'assistant', content: "Histórico limpo. Como posso te ajudar agora?", timestamp: new Date().toISOString() }];
            setMessages(initialMsg);
            localStorage.setItem('chatHistory', JSON.stringify(initialMsg));
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/groq/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: `Você é um coach de apoio, empático e motivacional para parar de fumar. Seu objetivo é ajudar o usuário a ficar sem fumar, oferecer dicas para controlar a vontade e celebrar marcos. Mantenha as respostas concisas e encorajadoras. Fale em Português do Brasil e lembre de perguntar o nome e sexo do usuário, para tratar de maneira correta.${userName ? ` O nome do usuário é ${userName} e os pronomes são ${userPronoun}. Use o nome e os pronomes corretos ao se dirigir ao usuário.` : ''}`
                        },
                        ...messages.map(({ role, content }) => ({ role, content })),
                        { role: userMsg.role, content: userMsg.content }
                    ],
                    model: 'llama-3.1-8b-instant',
                    temperature: 0.7
                })
            });

            if (!response.ok) throw new Error('Failed to fetch from Groq');

            const data = await response.json();
            const assistantMsg = {
                role: data.choices[0].message.role,
                content: data.choices[0].message.content,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            console.error("Groq API Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Estou com problemas para me conectar ao meu cérebro agora. Verifique sua conexão com a internet.", timestamp: new Date().toISOString() }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-teal-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                                    }`}
                            >
                                {msg.content}
                                <div className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-teal-100' : 'text-gray-400'}`}>
                                    {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Digite uma mensagem..."
                        className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
