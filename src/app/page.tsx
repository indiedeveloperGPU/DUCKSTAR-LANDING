"use client";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function DuckstarLanding() {
  const getDailyBonusStart = () => {
    const base = 900;
    const today = new Date();
    const seed = today.getDate() + today.getMonth() + today.getFullYear();
    const variation = seed % 100;
    return base + variation;
  };

  const [bonusLeft, setBonusLeft] = useState(() => {
    const start = getDailyBonusStart();
    const offset = Math.floor(Math.random() * 20);
    return start - offset;
  });

  const [contestSlots, setContestSlots] = useState(847); // Posti rimasti per il contest
  const [timeLeft, setTimeLeft] = useState(300);
  const [showProof, setShowProof] = useState<null | { name: string; amount: string; time: string; referrals?: number }>(null);
  const [showContestAlert, setShowContestAlert] = useState(false);
  
  const getBaseUserCount = () => {
    const base = 2500;
    const startDate = new Date("2025-06-01");
    const today = new Date();
    const daysSince = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return base + daysSince * 150;
  };

  const [userCount, setUserCount] = useState(() => {
    const dailyBase = getBaseUserCount();
    const randomOffset = Math.floor(Math.random() * 30);
    return dailyBase + randomOffset;
  });

  const fakeProofs = useMemo(() => [
    { name: "Marco", amount: "50€", time: "Ora", referrals: 3 },
    { name: "Sara", amount: "25€", time: "2 min fa" },
    { name: "Luca", amount: "50€", time: "5 min fa", referrals: 7 },
    { name: "Giulia", amount: "30€", time: "1 min fa" },
    { name: "Andrea", amount: "50€", time: "3 min fa", referrals: 5 },
    { name: "Valentina", amount: "40€", time: "4 min fa" },
    { name: "Francesco", amount: "50€", time: "Adesso", referrals: 12 },
  ], []);

  useEffect(() => {
    document.title = "🔥 50€ GRATIS + CONTEST 2000€ | ULTIMI POSTI!";

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);

    const bonusInterval = setInterval(() => {
      setBonusLeft((prev) => (prev > 0 ? prev - Math.floor(Math.random() * 3) + 1 : 0));
    }, 8000);

    const contestInterval = setInterval(() => {
      setContestSlots((prev) => {
        const newValue = prev - Math.floor(Math.random() * 5) + 1;
        if (newValue < 100 && !showContestAlert) {
          setShowContestAlert(true);
          setTimeout(() => setShowContestAlert(false), 5000);
        }
        return newValue > 0 ? newValue : 0;
      });
    }, 12000);

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
      clearInterval(contestInterval);
      clearInterval(userInterval);
      clearInterval(proofInterval);
    };
  }, [fakeProofs, showContestAlert]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 via-yellow-50 to-green-50 text-center font-sans overflow-x-hidden">
      {/* Contest Alert Banner */}
      <AnimatePresence>
        {showContestAlert && (
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 text-sm font-bold fixed top-0 left-0 right-0 z-[60]"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
          >
            <div className="flex items-center justify-center gap-2 animate-pulse">
              <span>💎</span>
              <span>MENO DI 100 POSTI PER IL CONTEST DA 2000€!</span>
              <span>💎</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 text-sm font-bold shadow-lg sticky top-0 z-50 animate-pulse">
        <div className="flex items-center justify-center gap-2 px-2">
          <span className="animate-bounce">🚨</span>
          <span className="text-xs sm:text-sm">
            {bonusLeft} BONUS DA 50€ | MANCANO {contestSlots} AL CONTEST 2000€ | SCADE: {formatTime(timeLeft)}
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
        <div className="absolute top-40 right-8 animate-bounce delay-1500">💎</div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Urgent Badge */}
          <div className="inline-block bg-gradient-to-r from-purple-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold mb-4 animate-pulse">
            ⚡ DOPPIA OFFERTA FOLLE ⚡
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
              50€ SUBITO
            </span>
            <br />
            <span className="text-2xl sm:text-4xl text-purple-800">
              + CONTEST 2000€ 💎
            </span>
          </h1>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-2xl font-bold text-lg mb-6 inline-block shadow-xl animate-pulse">
            PIÙ INVITI = PIÙ POSSIBILITÀ DI VINCERE 2000€
          </div>

          <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-md mx-auto leading-relaxed">
            <span className="font-bold text-green-600">{userCount}+ persone</span> stanno gareggiando per il JACKPOT!
          </p>

          {/* Contest Progress Bar */}
          <div className="max-w-sm mx-auto mb-6">
            <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${((1000 - contestSlots) / 1000) * 100}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {1000 - contestSlots} ISCRITTI | MANCANO {contestSlots} AL JACKPOT!
              </span>
            </div>
            <p className="text-xs text-red-600 font-bold mt-2 animate-pulse">
              ⚠️ AL 1000° ISCRITTO SI ESTRAE IL VINCITORE!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 mb-8">
            <a
              href={process.env.NEXT_PUBLIC_REFERRAL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="w-full max-w-sm bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-2xl text-xl font-bold shadow-2xl transform transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">🚀 ENTRA ORA (30 sec)</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-30 transition-opacity" />
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
                📝 COMPLETA E VINCI
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
            <span>+{userCount} in gara per 2000€</span>
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
                {showProof.referrals && (
                  <p className="text-xs text-purple-600 font-bold">
                    🎯 {showProof.referrals} punti contest!
                  </p>
                )}
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

      {/* Contest Explainer */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-12 px-4">
        <motion.h2 
          className="text-3xl sm:text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💎 CONTEST 2000€ CASH 💎
        </motion.h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-200">
            <h3 className="font-bold text-xl mb-4 text-purple-800">COME VINCERE I 2000€?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                <div>
                  <p className="font-bold text-purple-800">ISCRIVITI = 1 PUNTO</p>
                  <p className="text-sm text-gray-600">Parti subito con 1 possibilità di vincita</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                <div>
                  <p className="font-bold text-purple-800">INVITA AMICI = +1 PUNTO CIASCUNO</p>
                  <p className="text-sm text-gray-600">Più inviti, più aumenti le tue chance!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                <div>
                  <p className="font-bold text-purple-800">AL 1000° ISCRITTO → ESTRAZIONE!</p>
                  <p className="text-sm text-gray-600">Chi ha più punti ha più probabilità di vincere</p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl">
              <p className="font-bold text-center">
                🎰 MANCANO SOLO {contestSlots} POSTI! 🎰
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="bg-white py-12 px-4 shadow-inner">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">
          DOPPIO GUADAGNO IN 3 CLICK 💰
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 text-left">
            {[
              { 
                step: "1", 
                title: "REGISTRATI & ATTIVA", 
                desc: "30 secondi per attivare 50€ + entrare nel contest 2000€",
                icon: "🚀",
                color: "bg-green-500"
              },
              { 
                step: "2", 
                title: "INVITA & MOLTIPLICA", 
                desc: "Ogni amico = +1 punto contest + loro ricevono 50€",
                icon: "🎯",
                color: "bg-purple-500"
              },
              { 
                step: "3", 
                title: "INCASSA TUTTO", 
                desc: "50€ immediati + possibilità di vincere 2000€",
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
      <section className="bg-gradient-to-r from-red-500 to-purple-600 text-white py-8 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4">⏰ DOPPIA SCADENZA!</h2>
          <div className="space-y-4">
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <p className="font-bold text-lg">🔥 BONUS 50€</p>
              <p className="text-2xl font-black">{bonusLeft} POSTI RIMASTI</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <p className="font-bold text-lg">💎 CONTEST 2000€</p>
              <p className="text-2xl font-black">MANCANO {contestSlots} ISCRITTI!</p>
            </div>
          </div>
          <motion.button
            className="w-full bg-white text-red-600 py-4 px-8 rounded-2xl text-xl font-bold shadow-xl mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏃‍♂️ PRENDI TUTTO PRIMA CHE FINISCA!
          </motion.button>
        </div>
      </section>

      {/* Testimonianze */}
      <section className="bg-yellow-50 py-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">
          CHI VINCE DAVVERO! 🔥
        </h2>
        <div className="max-w-4xl mx-auto grid gap-4">
          {[
            { 
              name: "Martina", 
              age: "24", 
              text: "50€ ricevuti + ho invitato 8 amici... spero di vincere i 2000€!", 
              verified: true,
              amount: "50€",
              time: "12 min",
              contest: "8 punti contest"
            },
            { 
              name: "Luca", 
              age: "30", 
              text: "Ho già 15 punti per il contest! Sto invitando tutti 😂", 
              verified: true,
              amount: "50€",
              time: "8 min",
              contest: "15 punti contest"
            },
            { 
              name: "Giulia", 
              age: "21", 
              text: "I miei 10 amici hanno preso i 50€ e io sono in testa per i 2000€!", 
              verified: true,
              amount: "50€",
              time: "15 min",
              contest: "10 punti contest"
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
                  <p className="text-gray-700 text-sm italic">{`"${testimonial.text}"`}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">Ricevuto in {testimonial.time}</p>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-bold">
                      🎯 {testimonial.contest}
                    </span>
                  </div>
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
            { q: "🤔 È legale?", a: "SÌ! Bonus da affiliazioni ufficiali + contest regolare con estrazione." },
            { q: "💳 Serve la carta?", a: "NO! Zero carte, zero depositi, zero rischi." },
            { q: "⏱️ Quanto tempo?", a: "2 minuti per registrarsi + 5-30 min per ricevere i 50€." },
            { q: "💰 I 2000€?", a: "Estrazione automatica al 1000° iscritto. Più inviti = più chance!" },
            { q: "🎯 Come aumento le possibilità?", a: "Ogni amico che si iscrive = +1 punto per te nel contest!" }
          ].map((faq, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-1">{faq.q}</h3>
              <p className="text-gray-700 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contest Countdown Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-12 px-4">
        <div className="max-w-lg mx-auto text-white text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="text-4xl font-black mb-4">
              💎 {contestSlots} POSTI AL JACKPOT 💎
            </h2>
          </motion.div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6">
            <p className="text-2xl font-bold mb-2">STRATEGIA VINCENTE:</p>
            <ol className="text-left space-y-2">
              <li>1️⃣ Iscriviti ORA = 50€ garantiti</li>
              <li>2️⃣ Invita più amici possibile</li>
              <li>3️⃣ Ogni amico = +1 chance per i 2000€</li>
              <li>4️⃣ Al 1000° iscritto → TU POTRESTI VINCERE!</li>
            </ol>
          </div>
          <p className="text-sm opacity-90 italic">
            {`"Chi ha invitato 20+ amici ha il 95% di probabilità di vincere!"`}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-green-500 to-yellow-500 py-12 px-4">
        <div className="max-w-md mx-auto text-white">
          <h2 className="text-3xl font-bold mb-4">ULTIMO AVVISO! 🚨</h2>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-6">
            <p className="text-lg mb-2">
              ⏰ Bonus 50€ scade in: {formatTime(timeLeft)}
            </p>
            <p className="text-lg">
              🎰 Contest 2000€: solo {contestSlots} posti!
            </p>
          </div>
          <a href={process.env.NEXT_PUBLIC_REFERRAL_URL} target="_blank" rel="noopener noreferrer">
            <motion.button
              className="w-full bg-white text-green-600 py-4 px-8 rounded-2xl text-xl font-bold shadow-2xl mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💰 VOGLIO 50€ + CHANCE PER 2000€!
            </motion.button>
          </a>
          <div className="text-sm opacity-90 space-y-1">
            <p>✅ 50€ garantiti in 30 minuti</p>
            <p>✅ Partecipazione automatica al contest 2000€</p>
            <p>✅ Più inviti = Più possibilità di vincere</p>
            <p>✅ Nessun costo nascosto</p>
          </div>
        </div>
      </section>

      {/* Live Ticker */}
      <div className="bg-black text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-4">🔥 Marco ha invitato 12 amici e guida la classifica!</span>
          <span className="mx-4">💎 Solo {contestSlots} posti rimasti per il contest 2000€</span>
          <span className="mx-4">🎯 Francesco con 15 referral è in top 3!</span>
          <span className="mx-4">⚡ Ultimi {bonusLeft} bonus da 50€ disponibili</span>
          <span className="mx-4">🏆 Sara ha appena superato i 10 punti contest!</span>
          <span className="mx-4">🚨 Il contest si chiude al 1000° iscritto!</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-xs py-6 px-4">
        <p className="opacity-75 max-w-lg mx-auto leading-relaxed mb-2">
          Disclaimer: Non siamo affiliati con Amazon, Shein, o altri marchi. 
          I pagamenti sono elaborati da terze parti autorizzate.
        </p>
        <p className="opacity-75 max-w-lg mx-auto leading-relaxed">
          Contest 2000€: estrazione casuale ponderata in base ai punti accumulati. 
          Regolamento completo disponibile dopo la registrazione.
        </p>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </main>
  );
}
