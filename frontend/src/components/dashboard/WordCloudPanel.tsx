import type { WordCloudItem } from '../../types';

interface WordCloudPanelProps {
  items: WordCloudItem[];
}

export function WordCloudPanel({ items }: WordCloudPanelProps) {
  return (
    <div className="panel words-panel">
      <div className="panel-header">
        <h3>PALABRAS MÁS FRECUENTES</h3>
      </div>

      <div className="word-cloud">
        {items.map((item) => (
          <span
            key={item.word}
            style={{
              fontSize: `${Math.min(0.9 + item.size * 0.32, 1.15)}rem`,
              opacity: 0.92,
            }}
          >
            {item.word}
          </span>
        ))}
      </div>
    </div>
  );
}
