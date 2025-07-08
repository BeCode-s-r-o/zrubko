# Live Chat & Messenger Integration

## Implementované komponenty

✅ **LiveChat** - Kompletný chat interface s moderným dizajnom
✅ **FloatingChatButton** - Floating button v pravom dolnom rohu 
✅ **Integrácia do AccountLayout** - Chat dostupný cez "Spustiť live chat"
✅ **Globálna dostupnosť** - Floating button na všetkých stránkach

## Aktuálny stav

- **Frontend**: Kompletne implementovaný s mock dátami
- **Slovenčina**: Všetky texty preložené
- **Dizajn**: Konzistentný s domovskou stránkou (accent farby)
- **UX Features**: 
  - Customer info form
  - Typing indicators  
  - Message status (sending, sent, delivered, read)
  - Real-time scroll to bottom
  - Connection status
  - Online/offline indicators

## Potrebná Messenger API integrácia

### 1. Backend setup (Node.js/Express)

```javascript
// server.js
const express = require('express')
const { Server } = require('socket.io')
const axios = require('axios')

const app = express()
const server = require('http').createServer(app)
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL }
})

// Messenger webhook endpoint
app.post('/webhook/messenger', (req, res) => {
  const body = req.body
  
  if (body.object === 'page') {
    body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message) {
          // Správa z Messengeru -> pošli na web
          io.emit('admin_message', {
            text: event.message.text,
            senderId: event.sender.id,
            timestamp: new Date()
          })
        }
      })
    })
    res.status(200).send('OK')
  }
})

// Web správy -> Messenger
io.on('connection', (socket) => {
  socket.on('user_message', async (data) => {
    // Pošli správu na Messenger
    await sendToMessenger(data.text, data.customerId)
    
    // Broadcast ostatným klientom
    socket.broadcast.emit('user_message', data)
  })
})
```

### 2. Messenger API konfigurácia

1. **Facebook Developer Account**
   - Vytvorte Facebook App
   - Pridajte Messenger platform
   - Získajte Page Access Token

2. **Webhook setup**
   ```bash
   # Nastavte webhook URL
   https://yourserver.com/webhook/messenger
   
   # Subscribe to events: messages, messaging_postbacks
   ```

3. **Environment variables**
   ```env
   FACEBOOK_PAGE_ACCESS_TOKEN=your_token_here
   FACEBOOK_VERIFY_TOKEN=your_verify_token
   MESSENGER_PAGE_ID=your_page_id
   ```

### 3. Frontend updates

Aktualizujte `LiveChat` komponent:

```typescript
// V useEffect pridajte WebSocket connection
useEffect(() => {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL)
  
  socket.on('admin_message', (message) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: message.text,
      sender: 'admin',
      timestamp: new Date(message.timestamp),
      status: 'read'
    }])
  })
  
  return () => socket.disconnect()
}, [])

// V sendMessage funkcii
const sendMessage = () => {
  // ... existing code ...
  
  // Pošli na WebSocket namiesto mock odpovede
  socket.emit('user_message', {
    text: newMessage,
    customerId: customerInfo.email,
    customerName: customerInfo.name
  })
}
```

### 4. Databáza (MongoDB/PostgreSQL)

```sql
-- Tabuľka pre chat sessions
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY,
  customer_email VARCHAR(255),
  customer_name VARCHAR(255),
  customer_phone VARCHAR(255),
  messenger_user_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW()
);

-- Tabuľka pre správy
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id),
  text TEXT,
  sender ENUM('user', 'admin'),
  status ENUM('sending', 'sent', 'delivered', 'read'),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Výhody tohto riešenia

🚀 **Real-time komunikácia** - Okamžité správy oboma smermi  
📱 **Messenger integrácia** - Odpovedáte priamo z Messenger app  
💻 **Web interface** - Zákazníci nepotrebujú Messenger  
📊 **História správ** - Všetky konverzácie uložené v DB  
🔔 **Notifikácie** - Push notifikácie cez Messenger  
🎯 **Lead tracking** - Automatické zbieranie customer info  

## Ďalšie možnosti rozšírenia

- **AI Chatbot** - Automatické odpovede pre časté otázky
- **File upload** - Posielanie obrázkov/dokumentov
- **CRM integrácia** - Prepojenie s customer database
- **Analytics** - Štatistiky konverzácií a spokojnosti
- **Multi-agent** - Viacero operátorov súčasne
- **Mobile app** - React Native verzia pre operátorov

## Test setup

Pre testovanie môžete použiť ngrok:

```bash
# Spustite lokálny server
node server.js

# V novom terminále
ngrok http 3001

# Použite ngrok URL pre Messenger webhook
```

---

**Status**: ✅ Frontend hotový, čaká na backend integráciu  
**Estimated time**: 2-3 dni pre kompletný Messenger setup  
**Priority**: Vysoká - významne zlepší customer experience 