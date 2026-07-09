import { motion } from 'framer-motion';

export function Scene1() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0A1628' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,107,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.06) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Orange glow center */}
      <motion.div
        className="absolute"
        style={{
          width: '60vw', height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Phone icon */}
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.7 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7, type: 'spring', stiffness: 120 }}
        style={{ fontSize: '10vw', marginBottom: '2vw', filter: 'drop-shadow(0 0 20px #FF6B00)' }}
      >
        📱
      </motion.div>

      {/* Main headline */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(3rem, 8vw, 8rem)',
          color: '#FFFFFF',
          textAlign: 'center',
          letterSpacing: '0.05em',
          lineHeight: 1,
          textShadow: '0 0 40px rgba(255,107,0,0.5)',
        }}
      >
        TON TÉLÉPHONE
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(3rem, 8vw, 8rem)',
          color: '#FF6B00',
          textAlign: 'center',
          letterSpacing: '0.05em',
          lineHeight: 1,
        }}
      >
        = TON BUREAU
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        style={{ width: '20vw', height: '3px', background: '#FF6B00', margin: '2vw 0' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(0.9rem, 2.2vw, 2rem)',
          color: 'rgba(255,255,255,0.75)',
          textAlign: 'center',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Découvre comment gagner ta vie avec ton smartphone
      </motion.p>
    </motion.div>
  );
}
