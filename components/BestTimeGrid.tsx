"use client";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = Array.from({ length: 24 }, (_, i) => i);

function formatHour(h: number) {
  if (h === 0) return "12am";
  if (h < 12) return `${h}am`;
  if (h === 12) return "12pm";
  return `${h - 12}pm`;
}

function getDelayColor(delay: number): string {
  if (delay <= 10) return "bg-emerald-200 text-emerald-800";
  if (delay <= 18) return "bg-emerald-100 text-emerald-700";
  if (delay <= 25) return "bg-amber-100 text-amber-700";
  if (delay <= 35) return "bg-orange-100 text-orange-700";
  return "bg-rose-100 text-rose-700";
}

// Generate plausible delay data by hour & day
function generateDelayGrid(avgDelay: number, bestHour: number, worstHour: number) {
  return days.map((day, dayIdx) => {
    const dayMultiplier = dayIdx === 1 ? 0.85 : dayIdx === 2 ? 0.82 : dayIdx === 5 ? 1.25 : dayIdx === 0 ? 1.15 : 1.0;
    return hours.map((hour) => {
      const hourFactor = Math.abs(hour - bestHour) / 12;
      const worstFactor = 1 - Math.abs(hour - worstHour) / 12;
      const delay = avgDelay * dayMultiplier * (0.7 + hourFactor * 0.6 + worstFactor * 0.3);
      return Math.round(Math.max(5, Math.min(avgDelay * 2.5, delay)));
    });
  });
}

interface Props {
  avgDelay: number;
  bestHour: number;
  worstHour: number;
}

export default function BestTimeGrid({ avgDelay, bestHour, worstHour }: Props) {
  const grid = generateDelayGrid(avgDelay, bestHour, worstHour);

  // Show a 7x8 simplified grid (every 3 hours)
  const displayHours = [6, 7, 9, 12, 15, 18, 20, 22];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[500px]">
        {/* Hour labels */}
        <div className="flex items-center mb-1">
          <div className="w-12 shrink-0" />
          {displayHours.map((h) => (
            <div key={h} className="flex-1 text-center text-xs text-sky-400 font-mono">
              {formatHour(h)}
            </div>
          ))}
        </div>

        {/* Rows */}
        {days.map((day, dayIdx) => (
          <div key={day} className="flex items-center mb-1">
            <div className="w-12 shrink-0 text-xs text-sky-500 font-medium">{day}</div>
            {displayHours.map((hour) => {
              const delay = grid[dayIdx][hour];
              return (
                <div
                  key={hour}
                  className={`flex-1 mx-0.5 h-8 rounded text-xs flex items-center justify-center font-mono ${getDelayColor(delay)}`}
                  title={`${day} ${formatHour(hour)}: ~${delay} min avg delay`}
                >
                  {delay}m
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-3 mt-3 text-xs text-sky-500">
          <span>Legend:</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-emerald-200 inline-block" /> &le;10 min</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-amber-100 inline-block" /> 18-25 min</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-rose-100 inline-block" /> 35+ min</span>
        </div>
      </div>
    </div>
  );
}
