# 🌿 Habit Breaker

**Your personal companion to quit smoking and reclaim your health.**

Habit Breaker is a modern, motivational web application designed to help you track your smoke-free journey, celebrate milestones, and stay motivated with AI-powered coaching support.

---

## ✨ Features

### 📊 **Real-Time Progress Tracking**
- **Time Smoke-Free**: Live countdown showing days, hours, minutes, and seconds since you quit
- **Money Saved**: Track how much money you've saved by not buying cigarettes
- **Cigarettes Avoided**: See exactly how many cigarettes you haven't smoked
- **Life Regained**: Calculate time of life you're gaining back (based on UCL study: 20 minutes per cigarette)

### 🎯 **Health Achievements System**
Unlock 9 progressive health milestones as your body recovers:
- ✅ Pressão Normalizada (20 minutes)
- ✅ Oxigênio no Sangue (8 hours)
- ✅ Coração Mais Seguro (24 hours)
- ✅ Olfato e Paladar (48 hours)
- ✅ Livre de Nicotina (72 hours)
- ✅ Energia Renovada (2 weeks)
- ✅ Adeus Abstinência (1 month)
- ✅ Pulmões Fortes (3 months)
- ✅ Risco Cardíaco 50% (1 year)

### 🤖 **AI-Powered Coach**
- Personalized support using Groq's LLaMA 3.1 model
- Empathetic, motivational responses in Brazilian Portuguese
- Addresses you by name with correct pronouns
- Chat history persistence with timestamps
- Expandable sidebar interface

### 🔔 **Smart Notifications**
- **In-app notifications** every 15 minutes with motivational quotes
- **System notifications** when tab is inactive
- Customizable reminder messages

### 👤 **Personalization**
- Set your name and pronouns (ele/dele, ela/dela, elu/delu)
- Personalized dashboard greeting
- AI coach uses your name and pronouns
- Protected date picker with save confirmation

### 🎨 **Beautiful UI/UX**
- Modern gradient design with teal/emerald color scheme
- Smooth animations with Framer Motion
- Responsive layout (mobile & desktop)
- Glassmorphism effects
- Interactive splash screen

---

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Groq API (LLaMA 3.1-8b-instant)
- **State Management**: React Hooks + LocalStorage
- **Proxy**: Vite proxy for CORS handling

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Groq API key ([Get one here](https://console.groq.com))

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/rafamolina1/Breaker.git
cd Breaker/webapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the `webapp` directory:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

---

## 🏗️ Project Structure

```
webapp/
├── src/
│   ├── components/
│   │   ├── Achievements.jsx       # Health milestone cards
│   │   ├── ChatInterface.jsx      # AI coach chat
│   │   ├── Dashboard.jsx          # Main dashboard with stats
│   │   ├── InAppNotification.jsx  # Toast notifications
│   │   └── SplashScreen.jsx       # Welcome animation
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── vite.config.js                 # Vite configuration + proxy
├── tailwind.config.js             # Tailwind CSS config
└── package.json
```

---

## ⚙️ Configuration

### Tracking Modes
Choose between two tracking modes in settings:
- **Pack Mode**: Track by packs per day + pack cost
- **Cigarette Mode**: Track by cigarettes per day + cigarette cost

### Customization
- **Quit Date**: Set your exact quit date and time (with save confirmation)
- **Name & Pronouns**: Personalize your experience
- **Notification Interval**: 15 minutes (configurable in code)

---

## 🔒 Privacy & Data

All data is stored **locally** in your browser using `localStorage`:
- No server-side storage
- No user tracking
- Chat history stays on your device
- API key never exposed to client

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **University College London** - Life expectancy research (20 min per cigarette)
- **Groq** - AI infrastructure
- **Lucide** - Beautiful icon set
- **Tailwind Labs** - CSS framework

---

## 📞 Support

If you need help or have questions:
- Open an issue on GitHub
- Check the [Wiki](../../wiki) for detailed guides

---

**Made with ❤️ to help people quit smoking and live healthier lives.**

🌿 **Stay strong. You've got this!** 💪
