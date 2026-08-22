'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Phone, ArrowUp, MessageSquare, X, Send, Bot } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hello! I'm the Elvina AI Assistant. How can I help you with your construction needs today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [faqs, setFaqs] = useState<{id: number, question: string, answer: string}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen && faqs.length === 0) {
      fetch('/api/faqs')
        .then(res => res.json())
        .then(data => setFaqs(data))
        .catch(console.error);
    }
  }, [chatOpen, faqs.length]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response for custom messages
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        text: "Thank you for your message. Currently, I am a demonstration AI. Please use the contact page to get in touch with our actual team!",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleFaqClick = (faq: {id: number, question: string, answer: string}) => {
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: faq.question,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        text: faq.answer,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  return (
    <>
      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed right-6 bottom-24 z-50 w-80 sm:w-96 bg-[#0E223D] border border-[#1B4D89]/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col h-[500px] max-h-[70vh]">
          {/* Chat Header */}
          <div className="bg-[#3B82F6] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <h3 className="font-bold">Elvina AI Assistant</h3>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 bg-[#050C16]">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#3B82F6] text-white rounded-tr-none' 
                    : 'bg-[#1B4D89]/30 text-neutral-200 border border-[#1B4D89]/50 rounded-tl-none whitespace-pre-wrap'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Quick Replies for FAQs */}
            {faqs.length > 0 && messages[messages.length - 1].sender === 'bot' && (
              <div className="flex flex-col gap-2 mt-2 items-start">
                {faqs.map(faq => (
                  <button
                    key={faq.id}
                    onClick={() => handleFaqClick(faq)}
                    className="text-left text-xs bg-[#1B4D89]/20 hover:bg-[#3B82F6] border border-[#3B82F6]/50 text-[#3B82F6] hover:text-white px-3 py-2 rounded-xl transition-colors max-w-[90%]"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#0E223D] border-t border-[#1B4D89]/50 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-[#050C16] border border-[#1B4D89]/40 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]"
            />
            <button 
              type="submit"
              className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white hover:bg-[#2563EB] transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
        {/* WhatsApp */}
        <a
          href="https://wa.me/916369049059"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:scale-110 transition-transform duration-300"
          title="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
        </a>
        {/* Call Us */}
        <a
          href="tel:+916369049059"
          className="w-14 h-14 bg-[#3B82F6] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#3B82F6]/40 hover:scale-110 transition-transform duration-300"
          title="Call Us"
        >
          <Phone className="w-7 h-7" />
        </a>
        
        {/* AI Chatbot Toggle */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-14 h-14 bg-[#8B5CF6] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#8B5CF6]/40 hover:scale-110 transition-transform duration-300 ${chatOpen ? 'scale-110 ring-4 ring-[#8B5CF6]/30' : ''}`}
          title="AI Assistant"
        >
          {chatOpen ? <X className="w-7 h-7" /> : <Bot className="w-7 h-7" />}
        </button>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className={`w-14 h-14 bg-[#0E223D] border border-[#1B4D89] text-white rounded-full flex items-center justify-center shadow-lg shadow-black/40 hover:scale-110 hover:bg-[#3B82F6] transition-all duration-300 ${
            isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          title="Back to Top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
