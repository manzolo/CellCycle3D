import { useStore } from '../../store/useStore';
import { t } from '../../i18n/ui';

const ITEMS = [
  { color: '#ff5d8f', it: 'Coppia omologa 1', en: 'Homolog pair 1' },
  { color: '#5fa8ff', it: 'Coppia omologa 2', en: 'Homolog pair 2' },
  { color: '#8de8c3', it: 'Fuso / microtubuli', en: 'Spindle / microtubules' },
  { color: '#ffd166', it: 'Centrosoma', en: 'Centrosome' },
  { color: '#7b8cff', it: 'Nucleo', en: 'Nucleus' },
];

export function Legend() {
  const lang = useStore((s) => s.lang);
  return (
    <div className="legend">
      <span className="legend-title">{t('legend', lang)}</span>
      <div className="legend-items">
        {ITEMS.map((i) => (
          <span key={i.color} className="legend-item">
            <span className="swatch" style={{ background: i.color }} />
            {lang === 'it' ? i.it : i.en}
          </span>
        ))}
      </div>
      <span className="hint">{t('controls3d', lang)}</span>
    </div>
  );
}
