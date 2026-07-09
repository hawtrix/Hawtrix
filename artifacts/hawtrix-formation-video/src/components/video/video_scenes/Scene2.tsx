import { motion } from 'framer-motion';

const apps = [
  { icon: '🛒', label: 'E-Commerce', sub: 'Vends en ligne' },
  { icon: '🚴', label: 'Livraison', sub: 'Gagne par trajet' },
  { icon: '💼', label: 'Freelance', sub: 'Tes compétences = cash' },
  { icon: '💸', label: 'Cashback', sub: 'Dépense & récupère' },
  { icon: '📊', label: 'Micro-tâches', sub: 'Simple & rapide' },
  { icon: '🏪', label: 'Dropshipping', sub: 'Vends sans stock' },
];

export function Scene2() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: '-5%' }}
      transition={{ duration: 0.5 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/scene_apps.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.75) 60%, rgba(255,107,0,0.15) 100%)' }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-[6vw]">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 100 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1rem, 3vw, 2.8rem)',
            color: '#FF6B00',
            letterSpacing: '0.2em',
            marginBottom: '1vw',
          }}
        >
          — APPLICATIONS
        </motion.div>

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 100 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.5rem, 6.5vw, 7rem)',
            color: '#FFFFFF',
            letterSpacing: '0.03em',
            lineHeight: 0.95,
          }}
        >
          QUI TE FONT
        </motion.div>

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6, type: 'spring', stiffness: 100 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.5rem, 6.5vw, 7rem)',
            color: '#FF6B00',
            letterSpacing: '0.03em',
            lineHeight: 0.95,
            marginBottom: '3vw',
          }}
        >
          GAGNER
        </motion.div>

        {/* App cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2vw', maxWidth: '55vw' }}>
          {apps.map((app, i) => (
            <motion.div
              key={app.label}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 + i * 0.12, duration: 0.5, type: 'spring', stiffness: 120 }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,107,0,0.3)',
                borderRadius: '0.8vw',
                padding: '1.2vw',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.5rem)' }}>{app.icon}</div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(0.6rem, 1.2vw, 1.1rem)',
                color: '#FFFFFF',
                marginTop: '0.3vw',
              }}>{app.label}</div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(0.5rem, 0.9vw, 0.85rem)',
                color: 'rgba(255,255,255,0.55)',
              }}>{app.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
