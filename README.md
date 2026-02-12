# 🌿 Habit Breaker

**Seu companheiro pessoal para parar de fumar e recuperar sua saúde.**

O Habit Breaker é uma aplicação web moderna e motivacional projetada para ajudar você a acompanhar sua jornada sem cigarro, celebrar conquistas e manter-se motivado com o apoio de um coach de IA.

---

## ✨ Funcionalidades

### 📊 **Acompanhamento em Tempo Real**
- **Tempo Sem Fumar**: Contador ao vivo mostrando dias, horas, minutos e segundos desde que você parou.
- **Dinheiro Economizado**: Acompanhe quanto dinheiro você economizou ao não comprar cigarros.
- **Cigarros Evitados**: Veja exatamente quantos cigarros você deixou de fumar.
- **Vida Reganhada**: Calcule o tempo de vida que você está recuperando (baseado no estudo da UCL: 20 minutos por cigarro).

### 🎯 **Sistema de Conquistas de Saúde**
Desbloqueie 9 marcos progressivos de saúde à medida que seu corpo se recupera:
- ✅ Pressão Normalizada (20 minutos)
- ✅ Oxigênio no Sangue (8 horas)
- ✅ Coração Mais Seguro (24 horas)
- ✅ Olfato e Paladar (48 horas)
- ✅ Livre de Nicotina (72 horas)
- ✅ Energia Renovada (2 semanas)
- ✅ Adeus Abstinência (1 mês)
- ✅ Pulmões Fortes (3 meses)
- ✅ Risco Cardíaco 50% (1 ano)

### 🤖 **Coach com Inteligência Artificial**
- Suporte personalizado utilizando o modelo LLaMA 3.1 da Groq.
- Respostas empáticas e motivacionais em Português do Brasil.
- Chama você pelo nome e utiliza os pronomes corretos.
- Persistência do histórico de chat com data e hora.
- Interface lateral expansível.

### 🔔 **Notificações Inteligentes**
- **Notificações no app** a cada 15 minutos com frases motivacionais.
- **Notificações de sistema** quando a aba do navegador não está em foco.
- Mensagens de lembrete personalizáveis.

### 👤 **Personalização**
- Configuração de nome e pronomes (ele/dele, ela/dela, elu/delu).
- Saudação personalizada no painel principal.
- O Coach de IA utiliza seu nome e pronomes.
- Seletor de data protegido com confirmação de salvamento.

### 🎨 **Interface Moderna (UI/UX)**
- Design moderno com gradientes em tons de azul-piscina e esmeralda.
- Animações suaves com Framer Motion.
- Layout responsivo (celular e desktop).
- Efeitos de Vidro (Glassmorphism).
- Tela de carregamento (Splash Screen) interativa.

---

## 🚀 Tecnologias

- **Frontend**: React 18 + Vite
- **Estilização**: Tailwind CSS
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **IA**: Groq API (LLaMA 3.1-8b-instant)
- **Gerenciamento de Estado**: React Hooks + LocalStorage
- **Proxy**: Vite proxy para lidar com CORS

---

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ e npm
- Chave da API Groq ([Obtenha aqui](https://console.groq.com))

### Configuração

1. **Clone o repositório**
```bash
git clone https://github.com/rafamolina1/Breaker.git
cd Breaker/webapp
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` no diretório `webapp`:
```env
VITE_GROQ_API_KEY=sua_chave_api_aqui
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse no navegador**
Navegue para `http://localhost:5173`

---

## 🏗️ Estrutura do Projeto

```
webapp/
├── src/
│   ├── components/
│   │   ├── Achievements.jsx       # Cards de marcos de saúde
│   │   ├── ChatInterface.jsx      # Chat do coach de IA
│   │   ├── Dashboard.jsx          # Painel principal com estatísticas
│   │   ├── InAppNotification.jsx  # Notificações tipo toast
│   │   └── SplashScreen.jsx       # Animação de boas-vindas
│   ├── App.jsx                    # Componente principal
│   ├── main.jsx                   # Ponto de entrada
│   └── index.css                  # Estilos globais
├── vite.config.js                 # Configuração do Vite + proxy
├── tailwind.config.js             # Configuração do Tailwind CSS
└── package.json
```

---

## ⚙️ Configuração

### Modos de Rastreamento
Escolha entre dois modos nas configurações:
- **Modo Maço**: Acompanhamento por maços por dia + custo do maço.
- **Modo Unidade**: Acompanhamento por cigarros por dia + custo por unidade.

### Personalização
- **Data de Parada**: Defina exatamente quando parou (com confirmação de salvamento).
- **Nome e Pronomes**: Personalize sua experiência.
- **Intervalo de Notificação**: 15 minutos (configurável no código).

---

## 🔒 Privacidade e Dados

Todos os dados são armazenados **localmente** no seu navegador usando `localStorage`:
- Sem armazenamento em servidor.
- Sem rastreamento de usuário.
- O histórico do chat permanece no seu dispositivo.
- A chave da API nunca é exposta ao cliente no build final.

---

## 📄 Licença

Este projeto é de código aberto e está disponível sob a [MIT License](LICENSE).

---

## 🙏 Agradecimentos

- **University College London** - Pesquisa sobre expectativa de vida (20 min por cigarro).
- **Groq** - Infraestrutura de IA.
- **Lucide** - Conjunto de ícones maravilhosos.
- **Tailwind Labs** - Framework CSS.

---

**Feito com ❤️ para ajudar pessoas a pararem de fumar e viverem vidas mais saudáveis.**

🌿 **Mantenha-se firme. Você consegue!** 💪
