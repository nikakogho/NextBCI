"use client";

import { useSyncExternalStore } from "react";

/* Shared 1s clock so every countdown ticks off one timer. getSnapshot returns a
   cached value (stable within a render); getServerSnapshot returns null so the
   server renders a neutral placeholder and the client fills it in after hydration. */
let now = Date.now();
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (timer === null) {
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function useClock(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => now,
    () => null
  );
}

function diff(target: number, current: number) {
  const ms = target - current;
  const abs = Math.abs(ms);
  return {
    ms,
    days: Math.floor(abs / 86400000),
    hours: Math.floor((abs % 86400000) / 3600000),
    minutes: Math.floor((abs % 3600000) / 60000),
    seconds: Math.floor((abs % 60000) / 1000)
  };
}

/** Live countdown to an ISO date (YYYY-MM-DD). */
export function Countdown({ sortDate }: { sortDate: string }) {
  const target = new Date(`${sortDate}T00:00:00Z`).getTime();
  const current = useClock();

  if (current === null) {
    return (
      <div className="countdown" aria-hidden="true">
        {["Days", "Hrs", "Min", "Sec"].map((u) => (
          <div className="unit" key={u}>
            <b>--</b>
            <span>{u}</span>
          </div>
        ))}
      </div>
    );
  }

  const { ms, days, hours, minutes, seconds } = diff(target, current);
  const past = ms < 0;
  const units: Array<[number, string]> = [
    [days, "Days"],
    [hours, "Hrs"],
    [minutes, "Min"],
    [seconds, "Sec"]
  ];

  return (
    <div className={`countdown ${past ? "past" : ""}`} role="timer" aria-label={past ? "time elapsed" : "time remaining"}>
      {units.map(([value, label]) => (
        <div className="unit" key={label}>
          <b>{String(value).padStart(2, "0")}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/** Compact T-minus / T-plus string, e.g. "T- 214d" or "T+ 46d elapsed". */
export function TMinus({ sortDate }: { sortDate: string }) {
  const target = new Date(`${sortDate}T00:00:00Z`).getTime();
  const current = useClock();
  if (current === null) return <span className="tminus">T-minus …</span>;
  const { ms, days } = diff(target, current);
  const past = ms < 0;
  return <span className={`tminus ${past ? "elapsed" : ""}`}>{past ? `T+ ${days}d elapsed` : `T- ${days}d`}</span>;
}
