import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Picker from 'emoji-picker-react';
import { sendMessageToHuggingFace } from '../services/huggingface';
import { setItem, getItem, removeItem } from '../utils/storage'; // Importa las funciones de storage.js

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    // Carga los mensajes desde localStorage al inicio
    const storedMessages = getItem('chatMessages');
    return storedMessages || [{ role: 'assistant', content: '👋 ¡Hola! Soy Jiga, tu asistente virtual. ¿En qué puedo ayudarte hoy?' }];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Handle emoji click
  const handleEmojiClick = (emoji) => {
    setInput((prevInput) => prevInput + emoji.emoji);
    setShowEmojiPicker(false);
  };

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Guardar los mensajes en el localStorage
    setItem('chatMessages', newMessages);

    try {
      setIsTyping(true);
      const response = await sendMessageToHuggingFace(input);
      const updatedMessages = [...newMessages, { role: 'assistant', content: response }];
      setMessages(updatedMessages);

      // Guardar los mensajes actualizados en el localStorage
      setItem('chatMessages', updatedMessages);

      setIsTyping(false);
    } catch (error) {
      const errorMessages = [...newMessages, { role: 'assistant', content: '⚠️ Ocurrió un error al responder.' }];
      setMessages(errorMessages);
      setItem('chatMessages', errorMessages); // Guardar los mensajes con error en localStorage
      setIsTyping(false);
    }
  };

  // Handle chat clear
  const handleClearChat = () => {
    const initialMessages = [{ role: 'assistant', content: '👋 ¡Hola! Soy Jiga, tu asistente virtual. ¿En qué puedo ayudarte hoy?' }];
    setMessages(initialMessages);
    setItem('chatMessages', initialMessages); // Guardar el estado inicial de los mensajes
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-widget-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '320px',
              height: '450px',
              background: 'linear-gradient(145deg, #0f2027, #203a43, #2c5364)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                padding: '15px',
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '16px',
              }}
            >
              💬 Jiga Asistente
            </div>

            <div
              style={{
                flex: 1,
                padding: '10px',
                overflowY: 'auto',
                backgroundColor: 'rgba(255,255,255,0.05)',
              }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <span
                    style={{
                      padding: '10px 15px',
                      borderRadius: '20px',
                      background: msg.role === 'user' ? 'linear-gradient(90deg, #00c6ff, #0072ff)' : 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      maxWidth: '75%',
                      wordWrap: 'break-word',
                      fontSize: '14px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <span
                    style={{
                      padding: '10px 15px',
                      borderRadius: '20px',
                      background: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      maxWidth: '75%',
                      wordWrap: 'break-word',
                      fontSize: '14px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                  >
                    📝 Escribiendo...
                  </span>
                </div>
              )}
            </div>

            <div
              className="clear-button-wrapper"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                opacity: 0,
                transform: 'translateY(-10px)',
                transition: 'opacity 0.3s, transform 0.3s',
              }}
            >
              <button
                onClick={handleClearChat}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '4px 10px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}
              >
                🧹 Limpiar
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', padding: '10px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                style={{
                  flex: 1,
                  padding: '10px',
                  border: 'none',
                  borderRadius: '20px',
                  outline: 'none',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  marginRight: '8px',
                  fontSize: '14px',
                }}
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '20px',
                }}
              >
                😊
              </button>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                  border: 'none',
                  borderRadius: '20px',
                  color: '#fff',
                  padding: '10px 15px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                ➤
              </button>
            </form>

            {showEmojiPicker && (
              <div style={{ position: 'absolute', bottom: '60px', left: '10px' }}>
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          cursor: 'pointer',
          fontSize: '26px',
        }}
      >
        {isOpen ? '✖' : '💬'}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
