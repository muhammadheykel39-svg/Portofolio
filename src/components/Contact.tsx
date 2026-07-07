import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Linkedin, MapPin, Send, Copy, Check, Terminal, Server, ArrowRight } from 'lucide-react';
import { Language, translations } from '../types';

interface ContactProps {
  currentLanguage: Language;
}

interface QueueMsg {
  id: string;
  senderName: string;
  senderEmail: string;
  text: string;
  timestamp: string;
  status: 'PENDING' | 'ACK';
}

export default function Contact({ currentLanguage }: ContactProps) {
  const t = translations[currentLanguage].contact;
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  
  // Interactions
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [inboxQueue, setInboxQueue] = useState<QueueMsg[]>([
    {
      id: 'MSG-001',
      senderName: 'Sistem Kredensial',
      senderEmail: 'sys@heykel.sys',
      text: currentLanguage === 'id' 
        ? 'Sistem pesan lokal siap menerima paket payload Anda.' 
        : 'Local messaging queue ready to acknowledge your connection payloads.',
      timestamp: '08:45 AM',
      status: 'ACK'
    }
  ]);

  const queueConsoleEndRef = useRef<HTMLDivElement | null>(null);

  const contactInfo = {
    email: 'muhammadheykel39@gmail.com',
    phone: '+6282261854287',
    linkedin: 'https://www.linkedin.com/in/muhammad-heykel/',
    location: 'Jakarta, Indonesia'
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSendForm = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !messageText) return;

    setIsSending(true);
    setLogs([]);

    // Simulate network socket connection and TCP handshake
    const steps = [
      `[TCP] Connecting to heykel.sys:5060...`,
      `[TCP] Syn sent. awaiting Ack...`,
      `[TCP] Connection established! SSL_TLS_v1.3 handshake successful.`,
      `[QUEUE] Buffering incoming text stream payload (${messageText.length} bytes)...`,
      `[QUEUE] Analyzing message headers: From: "${name}" <${email}>`,
      `[DB] Appending message payload to LOCAL_INDEXED_STOR_QUEUE...`,
      `[DB] ACK response sent successfully.`
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs(curr => [...curr, step]);
        
        // Final step actions
        if (idx === steps.length - 1) {
          const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const newMsg: QueueMsg = {
            id: 'MSG-' + Math.floor(Math.random() * 900 + 100),
            senderName: name,
            senderEmail: email,
            text: messageText,
            timestamp: timestamp,
            status: 'ACK'
          };
          
          setInboxQueue(curr => [newMsg, ...curr]);
          setIsSending(false);
          setName('');
          setEmail('');
          setMessageText('');
        }
      }, (idx + 1) * 450);
    });
  };

  useEffect(() => {
    if (queueConsoleEndRef.current) {
      queueConsoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background designs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px]"></div>
        <div className="absolute top-1/4 right-10 w-80 h-80 rounded-full bg-violet-500/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-4xl tracking-tight relative inline-block">
            {t.title}
            <span className="absolute -bottom-2 left-1/3 right-1/3 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"></span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base font-sans">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards & Copiers */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-bold text-slate-900 text-lg flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <span>{t.infoTitle}</span>
            </h3>

            {/* Email Card */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-center justify-between group shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-slate-450 block uppercase font-bold">Email Address</span>
                  <a href={`mailto:${contactInfo.email}`} className="text-sm text-slate-700 font-sans font-medium hover:text-indigo-600 transition-colors block truncate">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(contactInfo.email, 'email')}
                className="h-8 w-8 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-450 hover:text-slate-800 transition-all cursor-pointer shrink-0"
                title="Copy email"
              >
                {copiedField === 'email' ? <Check size={13} className="text-indigo-600" /> : <Copy size={13} />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-center justify-between group shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-slate-450 block uppercase font-bold">WhatsApp / Phone</span>
                  <a 
                    href={`https://wa.me/${contactInfo.phone.replace('+', '')}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-sm text-slate-700 font-sans font-medium hover:text-indigo-600 transition-colors block truncate"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                className="h-8 w-8 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-450 hover:text-slate-800 transition-all cursor-pointer shrink-0"
                title="Copy phone"
              >
                {copiedField === 'phone' ? <Check size={13} className="text-indigo-600" /> : <Copy size={13} />}
              </button>
            </div>

            {/* LinkedIn Card */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-center justify-between group shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 shrink-0">
                  <Linkedin size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-slate-450 block uppercase font-bold">LinkedIn Connect</span>
                  <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="text-sm text-slate-700 font-sans font-medium hover:text-indigo-600 transition-colors block truncate">
                    /in/muhammad-heykel
                  </a>
                </div>
              </div>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-450 hover:text-indigo-600 transition-all shrink-0"
                title="Visit profile"
              >
                <ArrowRight size={13} />
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-center justify-start gap-4 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-450 block uppercase font-bold">Location Hub</span>
                <span className="text-sm text-slate-700 font-sans font-medium block">
                  {contactInfo.location}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact form & Server Message queue log */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-bold text-slate-900 text-lg flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <span>{t.formTitle}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Form card */}
              <form onSubmit={handleSendForm} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 shadow-sm">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wide font-bold">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSending}
                    placeholder="E.g., John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 disabled:opacity-40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wide font-bold">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSending}
                    placeholder="E.g., john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 disabled:opacity-40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wide font-bold">
                    {t.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    required
                    disabled={isSending}
                    placeholder="Write your connection payload..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 resize-none disabled:opacity-40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-md shadow-indigo-100 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Send size={13} fill="currentColor" />
                  <span>{isSending ? 'Sending Network Packet...' : t.sendBtn}</span>
                </button>
              </form>

              {/* Server Message Queue feed */}
              <div className="space-y-4 flex flex-col justify-between h-full">
                
                {/* Console Socket Logs */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col h-[180px] overflow-hidden justify-between shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-1.5 shrink-0">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <Terminal size={12} className="text-indigo-400 animate-pulse" />
                      <span>TCP/Socket Handshake Stream</span>
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-1 font-mono text-[9px] text-slate-400 space-y-1 py-2">
                    {logs.map((log, idx) => (
                      <div key={idx} className={log.includes('[TCP]') ? 'text-cyan-400' : 'text-indigo-400'}>
                        {log}
                      </div>
                    ))}
                    {logs.length === 0 && (
                      <span className="text-slate-600 block py-10 text-center italic">Waiting for connection payload packet...</span>
                    )}
                    <div ref={queueConsoleEndRef} />
                  </div>
                </div>

                {/* Simulated Local Inbox Drawer */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex-1 max-h-[220px] flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-slate-450 uppercase tracking-wider block font-bold pb-2 border-b border-slate-250">
                    Local Message Buffer ({inboxQueue.length})
                  </span>

                  <div className="overflow-y-auto max-h-[140px] space-y-2.5 mt-2.5 pr-1 flex-1">
                    {inboxQueue.map((item) => (
                      <div key={item.id} className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1 font-sans shadow-sm">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-800 font-bold">{item.senderName}</span>
                          <span className="text-slate-400 font-mono text-[9px]">{item.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">{item.text}</p>
                        <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-100 mt-1">
                          <span>{item.senderEmail}</span>
                          <span className="text-indigo-600 font-bold bg-indigo-50 px-1 rounded">ACK_OK</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
