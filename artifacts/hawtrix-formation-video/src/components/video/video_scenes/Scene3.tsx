import { motion } from 'framer-motion';

const stats = [
  { value: '+180%', label: 'Bitcoin en 2023' },
  { value: '24/7', label: 'Marchés ouverts' },
  { value: '100+', label: 'Cryptomonnaies' },
];

export function Scene3() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/scene_crypto.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.95) 45%, rgba(10,22,40,0.5) 100%)' }} />

      {/* Animated ticker bar at top */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          background: 'rgba(255,107,0,0.9)',
          padding: '0.8vw 2vw',
          display: 'flex',
          gap: '4vw',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(0.6rem, 1.1vw, 1rem)',
          color: '#0A1628',
          overflow: 'hidden',
        }}
      >
        {['BTC ▲ 42,500$', 'ETH ▲ 2,800$', 'BNB ▲ 380$', 'SOL ▲ 120$', 'XRP ▲ 0.65$', 'ADA ▲ 0.55$', 'DOGE ▲ 0.12$', 'BTC ▲ 42,500$', 'ETH ▲ 2,800$'].map((t, i) => (
          <span key={i} style={{ whiteSpace: 'nowrap' }}>{t}</span>
        ))}
      </motion.div>

      {/* Left content */}
      <div className="absolute inset-0 flex flex-col justify-center px-[6vw]" style={{ paddingTop: '5vw' }}>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1rem, 2.8vw, 2.5rem)',
            color: '#FF6B00',
            letterSpacing: '0.2em',
            marginBottom: '0.5vw',
          }}
        >
          — INVESTISSEMENT DIGITAL
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6, type: 'spring', stiffness: 90 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3rem, 7.5vw, 8rem)',
            color: '#FFFFFF',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
          }}
        >
          CRYPTO
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.6, type: 'spring', stiffness: 90 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3rem, 7.5vw, 8rem)',
            color: '#FF6B00',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            marginBottom: '2.5vw',
          }}
        >
          & TRADING
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '2vw', marginBottom: '2vw' }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 + i * 0.15, duration: 0.5 }}
              style={{
                background: 'rgba(255,107,0,0.12)',
                border: '1px solid rgba(255,107,0,0.4)',
                borderRadius: '0.6vw',
                padding: '1vw 1.8vw',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)',
                color: '#FF6B00',
                lineHeight: 1,
              }}>{s.value}</div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(0.55rem, 1vw, 0.9rem)',
                color: 'rgba(255,255,255,0.65)',
                marginTop: '0.3vw',
              }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.75rem, 1.5vw, 1.3rem)',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '40vw',
            lineHeight: 1.5,
          }}
        >
          Apprends à lire les marchés, analyser les tendances et faire fructifier ton capital — même en partant de zéro.
        </motion.p>
      </div>
    </motion.div>
  );
}
