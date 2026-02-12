import React, { useState, useEffect } from 'react';
import { Leaf, DollarSign, Ban, Settings, Bell, Trash2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Achievements from './Achievements';

const Dashboard = () => {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('smokeFreeData');
    const now = new Date();
    const localIso = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);

    return saved ? JSON.parse(saved) : {
      name: '',
      pronoun: 'ele/dele', // 'ele/dele', 'ela/dela', 'elu/delu'
      quitDate: localIso,
      trackingMode: 'pack', // 'pack' or 'cigarette'
      packCost: 10,
      packsPerDay: 1,
      cigaretteCost: 0.5,
      cigarettesPerDay: 20
    };
  });

  const [time, setTime] = useState(new Date());

  const [showSettings, setShowSettings] = useState(false);
  const [tempQuitDate, setTempQuitDate] = useState(userData.quitDate);

  useEffect(() => {
    localStorage.setItem('smokeFreeData', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("Este navegador não suporta notificações de desktop");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("Notificações Ativadas", { body: "Você receberá boas vibrações agora!", icon: "/leaf-icon.png" });
    }
  };



  const resetData = () => {
    if (window.confirm("Tenha certeza que deseja resetar seu progresso? Isso definirá sua data de parada para AGORA.")) {
      const now = new Date();
      const localIso = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);

      const newData = {
        quitDate: localIso,
        trackingMode: 'pack',
        packCost: 10,
        packsPerDay: 1,
        cigaretteCost: 0.5,
        cigarettesPerDay: 20
      };


      setUserData(newData);
      localStorage.setItem('smokeFreeData', JSON.stringify(newData));
      window.location.reload(); // Reload to ensure timer shows 0
    }
  };

  const calculateStats = () => {
    const start = new Date(userData.quitDate);

    if (isNaN(start.getTime())) return { timeString: "0d 0h 0m 0s", money: "0.00", cigarettes: 0 };

    const diffTime = Math.max(0, time - start);

    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
    const seconds = Math.floor((diffTime / 1000) % 60);

    let dailyCost = 0;
    let dailyCigarettes = 0;

    if (userData.trackingMode === 'pack') {
      dailyCost = userData.packCost * userData.packsPerDay;
      dailyCigarettes = userData.packsPerDay * 20;
    } else {
      dailyCost = userData.cigaretteCost * userData.cigarettesPerDay;
      dailyCigarettes = userData.cigarettesPerDay;
    }

    const totalDaysFloat = diffTime / (1000 * 60 * 60 * 24);
    const cigarettesNotSmoked = Math.floor(totalDaysFloat * dailyCigarettes);

    // Calculate life regained: 20 minutes per cigarette (University College London study)
    const lifeMinutesRegained = cigarettesNotSmoked * 20;
    const lifeDays = Math.floor(lifeMinutesRegained / (60 * 24));
    const lifeHours = Math.floor((lifeMinutesRegained / 60) % 24);
    const lifeMinutes = Math.floor(lifeMinutesRegained % 60);

    return {
      timeString: `${days}d ${hours}h ${minutes}m ${seconds}s`,
      money: (totalDaysFloat * dailyCost).toFixed(2),
      cigarettes: cigarettesNotSmoked,
      lifeRegained: { days: lifeDays, hours: lifeHours, minutes: lifeMinutes, totalMinutes: lifeMinutesRegained }
    };
  };

  const stats = calculateStats();

  return (
    <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-100 min-h-screen">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-teal-800 flex items-center gap-2">
          <Leaf className="w-8 h-8" /> Habit Breaker {userData.name && `- ${userData.name}`}
        </h1>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full hover:bg-teal-200 transition-colors"
        >
          <Settings className="w-6 h-6 text-teal-700" />
        </button>
      </div>

      <p className="text-sm text-teal-600/70 mb-6 flex items-center gap-1">
        <Bell className="w-3.5 h-3.5" />
        Mantenha esta aba aberta para receber lembretes motivacionais
      </p>

      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Configurações
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                placeholder="Como gostaria de ser chamado(a)?"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pronome</label>
              <select
                value={userData.pronoun}
                onChange={(e) => setUserData({ ...userData, pronoun: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500"
              >
                <option value="ele/dele">Ele/Dele</option>
                <option value="ela/dela">Ela/Dela</option>
                <option value="elu/delu">Elu/Delu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora que Parou</label>
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  value={tempQuitDate}
                  max={new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16)}
                  onChange={(e) => setTempQuitDate(e.target.value)}
                  className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={() => {
                    setUserData({ ...userData, quitDate: tempQuitDate });
                    alert('Data salva com sucesso!');
                  }}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium"
                >
                  Salvar
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modo de Rastreio</label>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setUserData({ ...userData, trackingMode: 'pack' })}
                  className={`flex-1 py-1 px-3 rounded-md text-sm font-medium transition-colors ${userData.trackingMode === 'pack' ? 'bg-white shadow text-teal-700' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Por Maço
                </button>
                <button
                  onClick={() => setUserData({ ...userData, trackingMode: 'cigarette' })}
                  className={`flex-1 py-1 px-3 rounded-md text-sm font-medium transition-colors ${userData.trackingMode === 'cigarette' ? 'bg-white shadow text-teal-700' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Por Palito
                </button>
              </div>
            </div>

            {userData.trackingMode === 'pack' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço do Maço (R$)</label>
                  <input
                    type="number"
                    value={userData.packCost}
                    onChange={(e) => setUserData({ ...userData, packCost: parseFloat(e.target.value) })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maços por Dia</label>
                  <input
                    type="number"
                    value={userData.packsPerDay}
                    onChange={(e) => setUserData({ ...userData, packsPerDay: parseFloat(e.target.value) })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço do Cigarro (R$)</label>
                  <input
                    type="number"
                    value={userData.cigaretteCost}
                    onChange={(e) => setUserData({ ...userData, cigaretteCost: parseFloat(e.target.value) })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cigarros por Dia</label>
                  <input
                    type="number"
                    value={userData.cigarettesPerDay}
                    onChange={(e) => setUserData({ ...userData, cigarettesPerDay: parseInt(e.target.value) })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={requestNotificationPermission}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <Bell className="w-4 h-4" /> Ativar Notificações
              </button>

            </div>

            <button
              onClick={resetData}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Resetar Progresso
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Leaf className="w-8 h-8 text-emerald-500" />}
          title="Tempo Sem Fumar"
          value={<span className="text-2xl font-mono">{stats.timeString}</span>}
          color="bg-emerald-50"
        />
        <StatCard
          icon={<DollarSign className="w-8 h-8 text-blue-500" />}
          title="Dinheiro Economizado"
          value={`R$ ${stats.money}`}
          color="bg-blue-50"
        />
        <StatCard
          icon={<Ban className="w-8 h-8 text-red-500" />}
          title="Cigarros Evitados"
          value={stats.cigarettes}
          color="bg-red-50"
        />
        <StatCard
          icon={<Heart className="w-8 h-8 text-pink-500" />}
          title="Vida Reganhada"
          value={
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">
                {stats.lifeRegained.days > 0 && `${stats.lifeRegained.days}d `}
                {stats.lifeRegained.hours}h {stats.lifeRegained.minutes}m
              </div>
              <div className="text-xs text-gray-500 mt-1">
                ~20min por cigarro (UCL)
              </div>
            </div>
          }
          color="bg-pink-50"
        />
      </div>

      <Achievements quitDate={userData.quitDate} />
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`${color} p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4`}
  >
    <div className="p-3 bg-white rounded-full shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </motion.div>
);

export default Dashboard;
