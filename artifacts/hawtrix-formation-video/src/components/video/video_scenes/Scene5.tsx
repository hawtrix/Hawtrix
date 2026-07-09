import { motion } from 'framer-motion';

const features = [
  { icon: '🪙', text: 'Crypto & Trading' },
  { icon: '💻', text: 'Programmation' },
  { icon: '📱', text: 'Apps qui rémunèrent' },
  { icon: '📈', text: 'Business en ligne' },
  { icon: '🎓', text: 'Certifications pro' },
  { icon: '🤝', text: 'Mentors experts' },
];

export function Scene5() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/scene_formation.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.93) 0%, rgba(10,22,40,0.70) 100%)' }} />

      {/* Top label */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#FF6B00',
          padding: '0.6vw 2.5vw',
          borderRadius: '100px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(0.7rem, 1.3vw, 1.2rem)',
          color: '#0A1628',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
        }}
      >
        🎓 HAWTRIX FORMATION
      </motion.div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[6vw]" style={{ paddingTop: '6vw' }}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 100 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2rem, 5.5vw, 6rem)',
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 0.95,
            letterSpacing: '0.04em',
          }}
        >
          TOUT APPRENDRE.
        </motion.div>

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7, type: 'spring', stiffness: 100 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2rem, 5.5vw, 6rem)',
            color: '#FF6B00',
            textAlign: 'center',
            lineHeight: 0.95,
            letterSpacing: '0.04em',
            marginBottom: '3vw',
          }}
        >
          TOUT GAGNER.
        </motion.div>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1vw', maxWidth: '70vw' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.text}
              initial={{ y: 20, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + i * 0.12, duration: 0.4, type: 'spring', stiffness: 150 }}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,107,0,0.4)',
                borderRadius: '100px',
                padding: '0.8vw 1.8vw',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(0.6rem, 1.2vw, 1.1rem)',
                color: '#FFFFFF',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5vw',
              }}
            >
              <span>{f.icon}</span> {f.text}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
