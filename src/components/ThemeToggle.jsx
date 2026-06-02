import { useEffect, useState, useCallback } from 'react';
import styles from './Card.module.css';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggle = useCallback(() => {
    setDark(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
    setSpinning(true);
  }, []);

  const label = dark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      className={styles.themeToggle}
      onClick={toggle}
      aria-label={label}
      data-tooltip={label}
    >
      <span
        className={`${styles.icon} ${spinning ? styles.iconSpinning : ''}`}
        onAnimationEnd={() => setSpinning(false)}
      >
        {dark ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
