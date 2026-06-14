import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { PHASES } from '../../data/phases';
import { STRUCTURES } from '../../data/structures';
import { t } from '../../i18n/ui';

export function InfoPanel() {
  const { mode, phaseIndex, lang, level, selected } = useStore();
  const select = useStore((s) => s.select);
  const phase = PHASES[mode][phaseIndex];
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [mode, phaseIndex]);

  useEffect(() => {
    if (selected) setExpanded(true);
  }, [selected]);

  return (
    <aside className={`info ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="info-head">
        <div className="info-title">
          {phase.group && <span className="tag">{phase.group[lang]}</span>}
          <h2>{phase.name[lang]}</h2>
          <span className="phase-count">
            {t('phase', lang)} {phaseIndex + 1}/{PHASES[mode].length}
          </span>
        </div>
        <button
          className="info-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls="phase-details"
          onClick={() => setExpanded((value) => !value)}
        >
          <span>{expanded ? t('hideDetails', lang) : t('showDetails', lang)}</span>
          <span aria-hidden>{expanded ? '⌃' : '⌄'}</span>
        </button>
      </div>

      <div className="info-content" id="phase-details">
        <section>
          <h3>{t('whatHappens', lang)}</h3>
          <p>{phase.summary[lang]}</p>
        </section>

        <section>
          <h3>{t('keyEvents', lang)}</h3>
          <ul className="events">
            {phase.events.map((e, i) => (
              <li key={i}>{e[lang]}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>{t('importance', lang)}</h3>
          <p>{phase.importance[lang]}</p>
        </section>

        {level === 'university' && phase.pitfalls && (
          <section className="pitfall">
            <h3>⚠ {t('pitfalls', lang)}</h3>
            <p>{phase.pitfalls[lang]}</p>
          </section>
        )}

        {selected && (
          <div className="structure-card">
            <button className="card-close" onClick={() => select(null)}>
              ✕
            </button>
            <span className="tag" style={{ background: STRUCTURES[selected].color }}>
              {t('structure', lang)}
            </span>
            <h3 style={{ color: STRUCTURES[selected].color }}>{STRUCTURES[selected].name[lang]}</h3>
            <p>{STRUCTURES[selected].description[lang]}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
