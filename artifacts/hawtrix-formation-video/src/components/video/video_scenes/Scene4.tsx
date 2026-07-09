import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const codeLines = [
  { text: 'const revenu = skills.map(s => s.monetize());', color: '#7dd3fc' },
  { text: 'if (toi.apprends()) toi.gagne(💰);', color: '#86efac' },
  { text: 'return vie.meilleure;', color: '#FF6B00' },
];

const careers = [
  { icon: '💻', title: 'Développeur Web', salary: '500K+ FCFA/mois' },
  { icon: '🤖', title: 'IA & Machine Learning', salary: '800K+ FCFA/mois' },
  { icon: '🔒', title: 'Cybersécurité', salary: '600K+ FCFA/mois' },
  { icon: '🗄️', title: 'Administrateur Réseau', salary: '450K+ FCFA/mois' },
];

export function Scene4() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLineIndex(i => (i + 1) % codeLines.length);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: '5%' }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/scene_code.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.97) 50%, rgba(10,22,40,0.6) 100%)' }} />

      {/* Floating code dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${4 + (i % 3) * 3}px`,
            height: `${4 + (i % 3) * 3}px`,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#FF6B00' : '#7dd3fc',
            left: `${55 + (i * 7) % 42}%`,
            top: `${10 + (i * 13) % 80}%`,
            opacity: 0.4,
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-[6vw]" style={{ paddingTop: '2vw' }}>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1rem, 2.8vw, 2.5rem)',
            color: '#FF6B00',
            letterSpacing: '0.2em',
          }}
        >
          — CARRIÈRES TECH
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 90 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.5rem, 6.5vw, 7rem)',
            color: '#FFFFFF',
            lineHeight: 0.92,
          }}
        >
          DEVIENS
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6, type: 'spring', stiffness: 90 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.5rem, 6.5vw, 7rem)',
            color: '#FF6B00',
            lineHeight: 0.92,
            marginBottom: '1.5vw',
          }}
        >
          PROGRAMMEUR
        </motion.div>

        {/* Live code block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{
            background: 'rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,107,0,0.3)',
            borderRadius: '0.6vw',
            padding: '1.2vw 1.8vw',
            maxWidth: '44vw',
            marginBottom: '2vw',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.6rem, 1.2vw, 1.05rem)',
          }}
        >
          <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '0.5vw', fontSize: '0.8em' }}>// hawtrix_code.js</div>
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              animate={{ opacity: i === lineIndex ? 1 : 0.35 }}
              transition={{ duration: 0.4 }}
              style={{ color: line.color, marginBottom: '0.4vw', whiteSpace: 'nowrap' }}
            >
              {line.text}
            </motion.div>
          ))}
        </motion.div>

        {/* Career cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '1vw', width: 'fit-content' }}>
          {careers.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5vw',
                padding: '0.8vw 1.3vw',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8vw',
              }}
            >
              <span style={{ fontSize: 'clamp(1rem, 1.8vw, 1.8rem)' }}>{c.icon}</span>
              <div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.55rem, 1vw, 0.9rem)',
                  color: '#FFFFFF',
                }}>{c.title}</div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(0.5rem, 0.85vw, 0.8rem)',
                  color: '#FF6B00',
                  fontWeight: 600,
                }}>{c.salary}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
