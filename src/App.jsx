import React, { useEffect, useState } from 'react';
import { MessageSquare, X, Bot, Trash2 } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import InAppNotification from './components/InAppNotification';

const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
    return;
  }
  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }
};

const motivationalQuotes = [
  "Seja forte! Você consegue.",
  "Um dia de cada vez.",
  "Respire fundo. A vontade passa.",
  "Você é maior que o vício.",
  "Sua saúde agradece!",
  "Já bebeu água hoje?",
  "Foco na liberdade!",
  "Lembre-se de como você se sente agora.",
  "Vamos para cima, você é invencível!",
  "Cada minuto conta."
];

import SplashScreen from './components/SplashScreen';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [inAppMessage, setInAppMessage] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('smokeFreeData');
    return saved ? JSON.parse(saved) : { name: '', pronoun: 'ele/dele' };
  });

  useEffect(() => {
    const setupNotifications = async () => {
      await requestNotificationPermission();

      console.log("Notification permission:", Notification.permission);

      const interval = setInterval(() => {
        console.log("Notification interval triggered. Permission:", Notification.permission);

        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        console.log("Sending notification:", randomQuote);

        setInAppMessage(randomQuote);
        setTimeout(() => setInAppMessage(null), 5000);

        if (Notification.permission === "granted") {
          console.log("Creating system notification...");
          try {
            const notification = new Notification("Habit Breaker 💪", {
              body: randomQuote,
              icon: "/leaf-icon.png",
              requireInteraction: false,
              silent: false
            });

            notification.onclick = () => {
              window.focus();
              notification.close();
            };

            setTimeout(() => notification.close(), 5000);
            console.log("System notification created successfully");
          } catch (error) {
            console.error("Error creating notification:", error);
          }
        } else {
          console.log("Notification permission:", Notification.permission);
        }
      }, 15 * 60 * 1000); // 15 minutes

      return () => clearInterval(interval);
    };

    setupNotifications();
  }, []);

  return (
    <>
      <InAppNotification message={inAppMessage} onClose={() => setInAppMessage(null)} />

      <AnimatePresence>
        {showSplash && (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <div className="min-h-screen bg-gray-50 flex">
          <div className="flex-1 overflow-y-auto">
            <Dashboard />
          </div>

          {/* Expandable Chat Sidebar */}
          <div className={`transition-all duration-300 ${showChat ? 'w-full md:w-[450px]' : 'w-0'} overflow-hidden bg-white border-l border-gray-100`}>
            {showChat && (
              <div className="h-screen flex flex-col">
                <div className="p-4 bg-teal-600 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Bot className="w-6 h-6" />
                    <h2 className="font-semibold text-lg">Coach de Apoio</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (window.confirm("Deseja apagar todo o histórico da conversa?")) {
                          const initialMsg = [{ role: 'assistant', content: "Histórico limpo. Como posso te ajudar agora?", timestamp: new Date().toISOString() }];
                          localStorage.setItem('chatHistory', JSON.stringify(initialMsg));
                          window.location.reload();
                        }
                      }}
                      className="p-2 hover:bg-teal-700 rounded-lg transition-colors"
                      title="Limpar conversa"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowChat(false)}
                      className="p-2 hover:bg-teal-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <ChatInterface userName={userData.name} userPronoun={userData.pronoun} />
                </div>
              </div>
            )}
          </div>

          {/* Floating Chat Button */}
          {!showChat && (
            <button
              onClick={() => setShowChat(true)}
              className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-2xl hover:bg-teal-700 transition-all hover:scale-110 z-40"
            >
              <MessageSquare className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}


export default App;
