import { useCallback } from 'react';
import styles from './Card.module.css';

function useRipple() {
  return useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = styles.ripple;
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }, []);
}

export default function Card({
  badge = 'Available',
  title = 'Verdhana Design System',
  description = 'A clean, accessible component library built for speed and consistency across every screen size.',
  primaryLabel = 'Get Started',
  ghostLabel = 'Learn More',
  onPrimary,
  onGhost,
  imageSrc,
  imageAlt = 'Card image',
}) {
  const addRipple = useRipple();

  return (
    <article className={styles.card} aria-label="Product card">
      {imageSrc ? (
        <img className={styles.image} src={imageSrc} alt={imageAlt} />
      ) : (
        <div className={styles.image} role="img" aria-label={imageAlt} />
      )}

      <div className={styles.body}>
        {badge && <span className={styles.badge}>{badge}</span>}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={(e) => { addRipple(e); onPrimary?.(); }}
          >
            {primaryLabel}
          </button>
          <button
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={(e) => { addRipple(e); onGhost?.(); }}
          >
            {ghostLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
