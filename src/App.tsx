import { Header } from './components/ui/Header';
import { Timeline } from './components/ui/Timeline';
import { Controls } from './components/ui/Controls';
import { InfoPanel } from './components/ui/InfoPanel';
import { Legend } from './components/ui/Legend';
import { Scene } from './components/scene/Scene';
import { useStore } from './store/useStore';
import { t } from './i18n/ui';

export default function App() {
  const compare = useStore((s) => s.compare);
  const lang = useStore((s) => s.lang);
  const speed = useStore((s) => s.speed);
  const setSpeed = useStore((s) => s.setSpeed);

  return (
    <div className="app">
      <Header />

      {compare ? (
        <main className="stage compare-stage">
          <div className="compare-pane">
            <span className="compare-label mit">{t('mitosis', lang)}</span>
            <Scene forcedMode="mitosis" compact />
            <span className="compare-result">{t('mitosisResult', lang)}</span>
          </div>
          <div className="compare-pane">
            <span className="compare-label mei">{t('meiosis', lang)}</span>
            <Scene forcedMode="meiosis" compact />
            <span className="compare-result">{t('meiosisResult', lang)}</span>
          </div>
          <div className="compare-controls">
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
          </div>
        </main>
      ) : (
        <main className="stage">
          <Scene />
          <InfoPanel />
          <Legend />
          <div className="bottom-bar">
            <Timeline />
            <Controls />
          </div>
        </main>
      )}
    </div>
  );
}
