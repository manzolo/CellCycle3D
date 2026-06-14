import { useStore } from '../../store/useStore';
import { PHASES } from '../../data/phases';
import { STRUCTURES } from '../../data/structures';
import { t } from '../../i18n/ui';

export function InfoPanel() {
  const { mode, phaseIndex, lang, level, selected } = useStore();
  const select = useStore((s) => s.select);
  const phase = PHASES[mode][phaseIndex];

  return (
    <aside className="info">
      <div className="info-head">
        {phase.group && <span className="tag">{phase.group[lang]}</span>}
        <h2>{phase.name[lang]}</h2>
        <span className="phase-count">
          {t('phase', lang)} {phaseIndex + 1}/{PHASES[mode].length}
        </span>
      </div>

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
    </aside>
  );
}
