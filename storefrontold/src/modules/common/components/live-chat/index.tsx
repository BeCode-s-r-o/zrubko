"use client"

import { useState, useEffect, useRef } from "react"
import { X, Send, MessageCircle, User, Bot, Clock, Check, CheckCheck } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: 'user' | 'admin'
  timestamp: Date
  status: 'sending' | 'sent' | 'delivered' | 'read'
}

interface LiveChatProps {
  isOpen: boolean
  onClose: () => void
}

const LiveChat = ({ isOpen, onClose }: LiveChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Vitajte v Zrubko! Som tu, aby som vám pomohol s výberom kvalitného dreva. Ako vám môžem pomôcť?',
      sender: 'admin',
      timestamp: new Date(),
      status: 'read'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [showCustomerForm, setShowCustomerForm] = useState(true)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulácia live connection
  useEffect(() => {
    if (isOpen) {
      // Simulujeme úspešné pripojenie
      const timer = setTimeout(() => {
        setIsConnected(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // Simulácia odoslania na Messenger API
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' } 
            : msg
        )
      )
    }, 500)

    // Simulácia typing indikátora
    setTimeout(() => {
      setIsTyping(true)
    }, 1000)

    // Simulácia odpovede z Messengeru (v reálnej app by prišla cez WebSocket)
    setTimeout(() => {
      setIsTyping(false)
      const adminResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Ďakujem za vašu správu! Momentálne pripravujem odpoveď na váš dotaz o drevených produktoch.',
        sender: 'admin',
        timestamp: new Date(),
        status: 'read'
      }
      setMessages(prev => [...prev, adminResponse])
    }, 2500)
  }

  const handleSubmitCustomerInfo = () => {
    if (customerInfo.name && customerInfo.email) {
      setShowCustomerForm(false)
      // Tu by sme poslali info na backend/Messenger
      console.log('Customer info:', customerInfo)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('sk-SK', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending': return <Clock className="w-3 h-3 text-gray-400" />
      case 'sent': return <Check className="w-3 h-3 text-gray-400" />
      case 'delivered': return <CheckCheck className="w-3 h-3 text-gray-400" />
      case 'read': return <CheckCheck className="w-3 h-3 text-accent" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-accent to-accent-dark p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              {isConnected && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg">Zrubko Support</h3>
              <p className="text-sm text-white/80">
                {isConnected ? 'Online' : 'Pripája sa...'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Info Form */}
        {showCustomerForm && (
          <div className="p-4 bg-amber-50 border-b border-amber-200">
            <h4 className="font-semibold text-gray-900 mb-3">Predstavte sa nám</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Vaše meno *"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent text-sm"
              />
              <input
                type="email"
                placeholder="E-mail *"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent text-sm"
              />
              <input
                type="tel"
                placeholder="Telefón (voliteľné)"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent text-sm"
              />
              <button
                onClick={handleSubmitCustomerInfo}
                disabled={!customerInfo.name || !customerInfo.email}
                className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Začať chat
              </button>
            </div>
          </div>
        )}

        {/* Messages Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                
                {/* Message Bubble */}
                <div className={`
                  px-4 py-3 rounded-2xl relative
                  ${message.sender === 'user' 
                    ? 'bg-gradient-to-r from-accent to-accent-dark text-white' 
                    : 'bg-white border border-gray-200 text-gray-900'
                  }
                `}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>

                {/* Message Meta */}
                <div className={`flex items-center gap-1 mt-1 px-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.sender === 'user' && (
                    <div className="flex items-center">
                      {getStatusIcon(message.status)}
                    </div>
                  )}
                </div>
              </div>

              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' ? 'ml-2 order-1' : 'mr-2 order-2'
              }`}>
                {message.sender === 'user' ? (
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent-dark rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent-dark rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {!showCustomerForm && (
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Napíšte správu..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="w-12 h-12 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Connection Status */}
        {!isConnected && (
          <div className="bg-yellow-50 border-t border-yellow-200 p-3 text-center">
            <p className="text-sm text-yellow-800">Pripája sa na Messenger...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LiveChat 