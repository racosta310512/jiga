import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Smile } from 'lucide-react';
import Picker from 'emoji-picker-react';

import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import { STORAGE_KEYS } from '../../../config/constants';
import useLocalStorage from '../../../hooks/useLocalStorage';

/**
 * Componente ChatWidget optimizado
 */
const ChatWidget = () => {
  const defaultMessage = {
    role: 'assistant',
    content: '👋 ¡Hola! Soy Jiga, tu asistente virtual. ¿En qué puedo ayudarte hoy?'
  };

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useLocalStorage(STORAGE_KEYS.CHAT_MESSAGES, [defaultMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setInput(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    try {
      setIsTyping(true);
      
      // Simular respuesta del bot (aquí integrarías con tu API de chat)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botMessage = { 
        role: 'assistant', 
        content: 'Gracias por tu mensaje. Un representante se pondrá en contacto contigo pronto.' 
      };
      
      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);
    } catch (error) {
      const errorMessage = { 
        role: 'assistant', 
        content: '⚠️ Ocurrió un error al responder. Por favor, intenta nuevamente.' 
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([defaultMessage]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-80 h-96 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] rounded-2xl shadow-2xl border border-white/20 backdrop-blur-md flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle size={20} />
                  <span className="font-semibold">Jiga Asistente</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="text-white/80 hover:text-white p-1"
                  >
                    🗑️
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white p-1"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-black/20">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white'
                        : 'bg-white/20 text-white backdrop-blur-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/20 text-white p-3 rounded-2xl text-sm backdrop-blur-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-black/30">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="pr-10 text-white placeholder:text-gray-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
                  >
                    <Smile size={16} />
                  </Button>
                </div>
                
                <Button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2"
                >
                  <Send size={16} />
                </Button>
              </div>

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-16 right-4 z-10">
                  <Picker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white shadow-lg flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;