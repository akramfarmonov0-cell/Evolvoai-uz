'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Minimize2, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: '👋 Salom! Men EvolvoAI virtual yordamchisiman. Sizga qanday yordam bera olaman?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [playingAudioIndex, setPlayingAudioIndex] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const audioRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const history = messages.map(msg => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content
      }))

      const headers = {
        'Content-Type': 'application/json'
      }
      
      if (sessionId) {
        headers['x-session-id'] = sessionId
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/chatbot/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: inputMessage,
          history: history
        })
      })

      const data = await response.json()

      if (data.success) {
        // Session ID'ni saqlash
        if (data.sessionId && !sessionId) {
          setSessionId(data.sessionId)
        }

        const botMessage = {
          role: 'bot',
          content: data.response,
          timestamp: new Date(),
          hasTTS: data.hasTTS
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Chatbot xatosi:', error)
      const errorMessage = {
        role: 'bot',
        content: '⚠️ Kechirasiz, xatolik yuz berdi. Iltimos qayta urinib ko\'ring.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    'Web sayt qilish qancha turadi?',
    'Telegram bot yaratish',
    'Xizmatlaringiz haqida',
    'Bog\'lanish'
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handlePlayAudio = async (messageIndex) => {
    try {
      // Agar audio o'ynayotgan bo'lsa, to'xtatish
      if (playingAudioIndex === messageIndex) {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
        setPlayingAudioIndex(null)
        return
      }

      // Oldingi audio'ni to'xtatish
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      setPlayingAudioIndex(messageIndex)

      const headers = {}
      if (sessionId) {
        headers['x-session-id'] = sessionId
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/chatbot/tts`, {
        method: 'POST',
        headers
      })

      if (!response.ok) {
        throw new Error('Audio yaratib bo\'lmadi')
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onended = () => {
        setPlayingAudioIndex(null)
        URL.revokeObjectURL(audioUrl)
      }

      audio.onerror = () => {
        setPlayingAudioIndex(null)
        URL.revokeObjectURL(audioUrl)
        console.error('Audio o\'ynashda xatolik')
      }

      await audio.play()

    } catch (error) {
      console.error('TTS xatosi:', error)
      setPlayingAudioIndex(null)
      alert('Audio yaratishda xatolik yuz berdi')
    }
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-primary-600 to-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 group"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '60px' : 'auto'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 sm:w-96 max-w-full bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">EvolvoAI Assistant</h3>
                  <p className="text-xs text-blue-100">Onlayn</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-[calc(100vh-280px)] sm:h-[450px] max-h-[calc(100vh-280px)]">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 ${
                          message.role === 'user'
                            ? 'bg-primary-600 text-white rounded-br-none'
                            : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                        }`}
                      >
                        <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <p className={`text-xs ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                            {message.timestamp.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {/* TTS tugmasi vaqtincha yashirilgan - API key kerak
                          {message.role === 'bot' && message.hasTTS && index > 0 && (
                            <button
                              onClick={() => handlePlayAudio(index)}
                              className={`p-1 rounded-full transition-colors ${
                                playingAudioIndex === index
                                  ? 'bg-primary-100 text-primary-600'
                                  : 'hover:bg-gray-100 text-gray-500'
                              }`}
                              title={playingAudioIndex === index ? 'To\'xtatish' : 'Ovozli eshitish'}
                            >
                              {playingAudioIndex === index ? (
                                <VolumeX className="w-4 h-4" />
                              ) : (
                                <Volume2 className="w-4 h-4" />
                              )}
                            </button>
                          )}
                          */}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 shadow-sm rounded-2xl rounded-bl-none px-3 py-2 sm:px-4 sm:py-3">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="px-3 py-2 sm:px-4 border-t bg-white">
                    <p className="text-xs text-gray-500 mb-2">Tez savollar:</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(question)}
                          className="text-xs px-2.5 py-1 sm:px-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-3 sm:p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Xabar yozing..."
                      className="flex-1 px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-primary-600 text-white p-2 sm:p-2.5 rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex-shrink-0"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
