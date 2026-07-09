import { motion } from 'framer-motion';

export function Scene6() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0A1628' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Radial burst background */}
      <motion.div
        className="absolute"
        style={{
          width: '80vw', height: '80vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.22) 0%, transparent 65%)',
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
      />

      {/* Rings */}
      {[1, 2, 3].map(ring => (
        <motion.div
          key={ring}
          className="absolute"
          style={{
            width: `${25 + ring * 20}vw`,
            height: `${25 + ring * 20}vw`,
            borderRadius: '50%',
            border: `1px solid rgba(255,107,0,${0.3 - ring * 0.08})`,
            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + ring * 0.15, duration: 0.8 }}
        />
      ))}

      {/* Logo */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/logo.png`}
        alt="Hawtrix"
        initial={{ scale: 0, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 120 }}
        style={{ width: 'clamp(60px, 12vw, 120px)', marginBottom: '2vw', filter: 'drop-shadow(0 0 30px rgba(255,107,0,0.7))' }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />

      {/* Brand name */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(3.5rem, 9vw, 10rem)',
          color: '#FFFFFF',
          letterSpacing: '0.1em',
          lineHeight: 1,
          textShadow: '0 0 60px rgba(255,107,0,0.4)',
        }}
      >
        HAWTRIX
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{ width: '25vw', height: '3px', background: '#FF6B00', margin: '1.5vw 0' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(0.8rem, 2vw, 1.8rem)',
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '3vw',
        }}
      >
        Trouvez · Apprenez · Évoluez · Gagnez
      </motion.div>

      {/* Download badge */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.5, type: 'spring', stiffness: 130 }}
        style={{
          background: '#FF6B00',
          borderRadius: '100px',
          padding: '1.2vw 3.5vw',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(0.8rem, 1.8vw, 1.6rem)',
          color: '#0A1628',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 0 40px rgba(255,107,0,0.5)',
        }}
      >
        📲 Télécharge l'app maintenant
      </motion.div>
    </motion.div>
  );
}
