"use client";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function DuckstarLanding() {
  const getDailyBonusStart = () => {
  const base = 900; // base giornaliera
  const today = new Date();
  const seed = today.getDate() + today.getMonth() + today.getFullYear();
  const variation = seed % 100; // sempre tra 0-99
  return base + variation; // bonus iniziale tra 900 e 999
};

const [bonusLeft, setBonusLeft] = useState(() => {
  const start = getDailyBonusStart();
  const offset = Math.floor(Math.random() * 20); // simula affollamento
  return start - offset;
});

  const [timeLeft, setTimeLeft] = useState(300);
  const [showProof, setShowProof] = useState<null | { name: string; amount: string; time: string }>(null);
  const getBaseUserCount = () => {
  const base = 2500; // Numero iniziale
  const startDate = new Date("2025-06-01"); // Data di inizio
  const today = new Date();
  const daysSince = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return base + daysSince * 150; // +150 utenti al giorno
};

const [userCount, setUserCount] = useState(() => {
  const dailyBase = getBaseUserCount();
  const randomOffset = Math.floor(Math.random() * 30); // Simula variazione
  return dailyBase + randomOffset;
});


  const fakeProofs = useMemo(() => [
    { name: "Marco", amount: "50€", time: "Ora" },
    { name: "Sara", amount: "25€", time: "2 min fa" },
    { name: "Luca", amount: "50€", time: "5 min fa" },
    { name: "Giulia", amount: "30€", time: "1 min fa" },
    { name: "Andrea", amount: "50€", time: "3 min fa" },
    { name: "Valentina", amount: "40€", time: "4 min fa" },
    { name: "Francesco", amount: "50€", time: "Adesso" },
  ], []);

  useEffect(() => {
    document.title = "🔥 50€ GRATIS in 2 MINUTI | ULTIMI POSTI!";

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);

    const bonusInterval = setInterval(() => {
      setBonusLeft((prev) => (prev > 0 ? prev - Math.floor(Math.random() * 3) + 1 : 0));
    }, 8000);

    const userInterval = setInterval(() => {
      setUserCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 8000);

    const proofInterval = setInterval(() => {
      const index = Math.floor(Math.random() * fakeProofs.length);
      setShowProof(fakeProofs[index]);
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(bonusInterval);
      clearInterval(userInterval);
      clearInterval(proofInterval);
    };
  }, [fakeProofs]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 via-yellow-50 to-green-50 text-center font-sans overflow-x-hidden">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 text-sm font-bold shadow-lg sticky top-0 z-50 animate-pulse">
        <div className="flex items-center justify-center gap-2 px-2">
          <span className="animate-bounce">🚨</span>
          <span className="text-xs sm:text-sm">
            SOLO {bonusLeft} BONUS RIMASTI! SCADE TRA: {formatTime(timeLeft)}
          </span>
          <span className="animate-bounce">🚨</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 py-8 relative">
        {/* Floating elements */}
        <div className="absolute top-10 left-4 animate-bounce">💰</div>
        <div className="absolute top-20 right-4 animate-bounce delay-500">🎯</div>
        <div className="absolute top-32 left-8 animate-bounce delay-1000">💸</div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Urgent Badge */}
          <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold mb-4 animate-pulse">
            ⚡ OFFERTA LIMITATA ⚡
          </div>

          <Image
  src="/images/duck-king.png"
  alt="Duckstar mascot"
  width={180}
  height={180}
  className="mx-auto mb-6 drop-shadow-xl animate-float"
/>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            <span className="bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
              50€ GRATIS
            </span>
            <br />
            <span className="text-2xl sm:text-4xl text-gray-800">
              in 2 MINUTI 🔥
            </span>
          </h1>

          <div className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold text-lg mb-6 inline-block shadow-xl">
            NO CARTA • NO DEPOSITO • NO FREGATURE
          </div>

          <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-md mx-auto leading-relaxed">
            <span className="font-bold text-green-600">{userCount}+ persone</span> hanno già ricevuto il bonus!
          </p>

          {/* CTA Buttons */}
          <div className="space-y-4 mb-8">
  <a
    href={process.env.NEXT_PUBLIC_REFERRAL_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    <motion.button
      className="w-full max-w-sm bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-2xl text-xl font-bold shadow-2xl transform transition-all hover:scale-105 active:scale-95"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      🚀 STEP 1: REGISTRATI ORA (30 sec)
    </motion.button>
  </a>
            
            <a
    href={process.env.NEXT_PUBLIC_FORM_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    <motion.button
      className="w-full max-w-sm bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-8 rounded-2xl text-lg font-bold shadow-xl transform transition-all hover:scale-105 active:scale-95"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      📝 STEP 2: COMPILA IL MODULO BONUS
    </motion.button>
  </a>
</div>
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
              ))}
            </div>
            <span>+{userCount} persone si sono registrate</span>
          </div>
        </motion.div>
      </section>

      {/* Proof Popup */}
      <AnimatePresence>
  {showProof && (
    <motion.div
      className="fixed bottom-4 right-4 bg-white rounded-xl shadow-2xl p-4 max-w-xs z-40 border border-green-200"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xl">✓</span>
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-gray-800">{showProof.name} ha ricevuto</p>
          <p className="text-xs text-green-600 font-bold">{showProof.amount} • {showProof.time}</p>
        </div>
      </div>
      <button
        onClick={() => setShowProof(null)}
        className="absolute top-2 right-2 text-gray-400 text-sm"
      >
        ×
      </button>
    </motion.div>
  )}
</AnimatePresence>


      {/* Come Funziona */}
      <section className="bg-white py-12 px-4 shadow-inner">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">
          3 CLICK = 50€ 💰
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 text-left">
            {[
              { 
                step: "1", 
                title: "CLICCA & REGISTRATI", 
                desc: "30 secondi per attivare il bonus | Conferma la registrazione caricando i tuoi documenti",
                icon: "🚀",
                color: "bg-green-500"
              },
              { 
                step: "2", 
                title: "COMPILA MODULO", 
                desc: "I tuoi dati per ricevere i soldi",
                icon: "📝",
                color: "bg-yellow-500"
              },
              { 
                step: "3", 
                title: "RICEVI 50€", 
                desc: "Su PayPal/Conto Corrente in 30 minuti MAX",
                icon: "💸",
                color: "bg-blue-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`${item.color} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {item.icon} {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-8 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">⏰ STA FINENDO!</h2>
          <p className="text-lg mb-6">Solo {bonusLeft} bonus disponibili. Non aspettare!</p>
          <motion.button
            className="w-full bg-white text-red-600 py-4 px-8 rounded-2xl text-xl font-bold shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏃‍♂️ PRENDILO PRIMA CHE FINISCA!
          </motion.button>
        </div>
      </section>

      {/* Testimonianze */}
      <section className="bg-yellow-50 py-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">
          FUNZIONA DAVVERO! 🔥
        </h2>
        <div className="max-w-4xl mx-auto grid gap-4">
          {[
            { 
              name: "Martina", 
              age: "24", 
              text: "50€ ricevuti in 12 minuti! Pensavo fosse una truffa invece...", 
              verified: true,
              amount: "50€",
              time: "12 min"
            },
            { 
              name: "Luca", 
              age: "30", 
              text: "Ho pagato la spesa con questi soldi 😂 Grazie mille!", 
              verified: true,
              amount: "50€",
              time: "8 min"
            },
            { 
              name: "Giulia", 
              age: "21", 
              text: "Vista su TikTok, provata e FUNZIONA! I miei amici non ci credevano", 
              verified: true,
              amount: "50€",
              time: "15 min"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-800">{testimonial.name}, {testimonial.age}</span>
                    {testimonial.verified && <span className="text-blue-500 text-sm">✓ Verificato</span>}
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                      +{testimonial.amount}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm italic">&quot;{testimonial.text}&quot;</p>
                  <p className="text-xs text-gray-500 mt-1">Ricevuto in {testimonial.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Veloce */}
      <section className="bg-white py-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">FAQ RAPIDE</h2>
        <div className="max-w-2xl mx-auto space-y-4 text-left">
          {[
            { q: "🤔 È legale?", a: "SÌ! Bonus da affiliazioni ufficiali verificate." },
            { q: "💳 Serve la carta?", a: "NO! Zero carte, zero depositi, zero rischi." },
            { q: "⏱️ Quanto tempo?", a: "2 minuti per registrarsi + 5-30 min per ricevere." },
            { q: "💰 Quanto prendo?", a: "50€ REALI su PayPal, Bitcoin o bonifico." }
          ].map((faq, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-1">{faq.q}</h3>
              <p className="text-gray-700 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-green-500 to-yellow-500 py-12 px-4">
        <div className="max-w-md mx-auto text-white">
          <h2 className="text-3xl font-bold mb-4">ULTIMO AVVISO! 🚨</h2>
          <p className="text-lg mb-6">
  Tra {formatTime(timeLeft)} l&apos;offerta SCADE per sempre
</p>
<a href={process.env.NEXT_PUBLIC_REFERRAL_URL} target="_blank" rel="noopener noreferrer">
          <motion.button
            className="w-full bg-white text-green-600 py-4 px-8 rounded-2xl text-xl font-bold shadow-2xl mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💰 SÌ, VOGLIO I 50€ ORA!
          </motion.button>
          </a>
          <p className="text-sm opacity-90">
            ✅ Nessun costo nascosto • ✅ Pagamento garantito • ✅ Assistenza 24/7
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-xs py-6 px-4">
        <p className="opacity-75 max-w-lg mx-auto leading-relaxed">
        Disclaimer: Non siamo affiliati con Amazon, Shein, o altri marchi. 
        I pagamenti sono elaborati da terze parti autorizzate.
      </p>
      </footer>
    </main>
  );
}
