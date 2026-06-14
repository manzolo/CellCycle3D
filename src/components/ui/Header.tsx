import { useStore } from '../../store/useStore';
import { t } from '../../i18n/ui';
import type { CellType, Level, Mode } from '../../types';

export function Header() {
  const { mode, compare, cellType, level, lang } = useStore();
  const { setMode, toggleCompare, setCellType, setLevel, setLang } = useStore();

  const modeBtn = (m: Mode, label: string) => (
    <button
      className={`seg ${mode === m && !compare ? 'active' : ''}`}
      onClick={() => {
        if (compare) toggleCompare();
        setMode(m);
      }}
    >
      {label}
    </button>
  );

  return (
    <header className="header">
      <div className="brand">
        <span className="brand-mark" aria-hidden>
          ⬡
        </span>
        <div className="brand-text">
          <h1>{t('title', lang)}</h1>
          <p>{t('subtitle', lang)}</p>
        </div>
      </div>

      <nav className="seg-group" aria-label="mode">
        {modeBtn('mitosis', t('mitosis', lang))}
        {modeBtn('meiosis', t('meiosis', lang))}
        <button className={`seg ${compare ? 'active' : ''}`} onClick={toggleCompare}>
          {t('compare', lang)}
        </button>
      </nav>

      <div className="header-right">
        <Toggle
          options={[
            ['animal', t('animal', lang)],
            ['plant', t('plant', lang)],
          ]}
          value={cellType}
          onChange={(v) => setCellType(v as CellType)}
        />
        <Toggle
          options={[
            ['school', t('school', lang)],
            ['university', t('university', lang)],
          ]}
          value={level}
          onChange={(v) => setLevel(v as Level)}
        />
        <button className="lang" onClick={() => setLang(lang === 'it' ? 'en' : 'it')}>
          {lang === 'it' ? '🇮🇹 IT' : '🇬🇧 EN'}
        </button>
      </div>
    </header>
  );
}

function Toggle({
  options,
  value,
  onChange,
}: {
  options: [string, string][];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mini-seg">
      {options.map(([v, label]) => (
        <button key={v} className={`mini ${value === v ? 'active' : ''}`} onClick={() => onChange(v)}>
          {label}
        </button>
      ))}
    </div>
  );
}
