import { useStore } from '../../store/useStore';
import { PHASES } from '../../data/phases';

export function Timeline() {
  const { mode, phaseIndex, lang, progress } = useStore();
  const setPhase = useStore((s) => s.setPhase);
  const phases = PHASES[mode];

  return (
    <div className="timeline">
      {phases.map((p, i) => {
        const state = i < phaseIndex ? 'done' : i === phaseIndex ? 'current' : 'todo';
        return (
          <button
            key={p.id + i}
            className={`step ${state}`}
            onClick={() => setPhase(i)}
            title={p.name[lang]}
          >
            <span className="dot">
              {state === 'current' && (
                <span className="dot-fill" style={{ transform: `scale(${0.3 + progress * 0.7})` }} />
              )}
            </span>
            <span className="step-label">
              {p.group && <em className="step-group">{p.group[lang]}</em>}
              {p.name[lang]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
