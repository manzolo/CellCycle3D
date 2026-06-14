import { useStore } from '../../store/useStore';
import { t } from '../../i18n/ui';

export function Controls() {
  const { playing, speed, lang, disturb } = useStore();
  const { prev, next, togglePlay, restart, setSpeed, toggleDisturb } = useStore();

  return (
    <div className="controls">
      <div className="transport">
        <button className="ctl" onClick={restart} title={t('restart', lang)}>
          ⏮
        </button>
        <button className="ctl" onClick={prev} title={t('prev', lang)}>
          ◀◀
        </button>
        <button className="ctl primary" onClick={togglePlay} title={playing ? t('pause', lang) : t('play', lang)}>
          {playing ? '❚❚' : '►'}
        </button>
        <button className="ctl" onClick={next} title={t('next', lang)}>
          ▶▶
        </button>
      </div>

      <label className="speed">
        <span>{t('speed', lang)}</span>
        <input
          type="range"
          min={0.25}
          max={3}
          step={0.25}
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        />
        <b>{speed.toFixed(2)}×</b>
      </label>

      <button className={`disturb ${disturb ? 'on' : ''}`} onClick={toggleDisturb} title={t('disturbHint', lang)}>
        ⚠ {disturb ? t('disturbOn', lang) : t('disturb', lang)}
      </button>
    </div>
  );
}
