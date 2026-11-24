"use client";

import { useEffect, useState } from "react";

// Temporary: sliders for the Hero video look. Writes CSS variables on <html>
// that the Hero video on the tune page reads, so changes show instantly.
// Values persist in localStorage. Remove with the video-test pages.
type Values = {
  grayscale: number;
  sepia: number;
  saturate: number;
  contrast: number;
  brightness: number;
  hue: number;
  vignette: number;
  vignetteStart: number;
};

const sliders: {
  key: keyof Values;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
}[] = [
  { key: "grayscale", label: "grayscale (ч/б)", min: 0, max: 1, step: 0.01 },
  { key: "sepia", label: "sepia", min: 0, max: 1, step: 0.01 },
  { key: "saturate", label: "saturate", min: 0, max: 2, step: 0.01 },
  { key: "contrast", label: "contrast", min: 0.5, max: 1.5, step: 0.01 },
  { key: "brightness", label: "brightness", min: 0.4, max: 1.3, step: 0.01 },
  {
    key: "hue",
    label: "hue-rotate (тон)",
    min: -40,
    max: 40,
    step: 1,
    unit: "deg",
  },
  { key: "vignette", label: "виньетка: сила", min: 0, max: 1, step: 0.01 },
  {
    key: "vignetteStart",
    label: "виньетка: начало",
    min: 0,
    max: 90,
    step: 1,
    unit: "%",
  },
];

const presets: Record<string, Values> = {
  "6": {
    grayscale: 0,
    sepia: 0.35,
    saturate: 0.75,
    contrast: 1,
    brightness: 1,
    hue: 0,
    vignette: 0,
    vignetteStart: 45,
  },
  "3": {
    grayscale: 0,
    sepia: 1,
    saturate: 1.2,
    contrast: 1.05,
    brightness: 0.95,
    hue: 0,
    vignette: 0,
    vignetteStart: 45,
  },
  "10": {
    grayscale: 1,
    sepia: 1,
    saturate: 1.4,
    contrast: 1.15,
    brightness: 0.88,
    hue: 0,
    vignette: 0,
    vignetteStart: 45,
  },
  "11": {
    grayscale: 1,
    sepia: 1,
    saturate: 1.3,
    contrast: 1.05,
    brightness: 0.78,
    hue: 0,
    vignette: 0,
    vignetteStart: 45,
  },
  "12": {
    grayscale: 1,
    sepia: 1,
    saturate: 1.3,
    contrast: 1.05,
    brightness: 0.82,
    hue: 0,
    vignette: 0.55,
    vignetteStart: 45,
  },
  "0": {
    grayscale: 0,
    sepia: 0,
    saturate: 1,
    contrast: 1,
    brightness: 1,
    hue: 0,
    vignette: 0,
    vignetteStart: 45,
  },
};

const storageKey = "video-tuner";

function filterOf(v: Values) {
  const parts = [
    v.grayscale && `grayscale(${v.grayscale})`,
    v.sepia && `sepia(${v.sepia})`,
    v.saturate !== 1 && `saturate(${v.saturate})`,
    v.contrast !== 1 && `contrast(${v.contrast})`,
    v.brightness !== 1 && `brightness(${v.brightness})`,
    v.hue && `hue-rotate(${v.hue}deg)`,
  ].filter(Boolean);
  return parts.length ? parts.join(" ") : "none";
}

function overlayOf(v: Values) {
  return v.vignette
    ? `radial-gradient(ellipse at center, transparent ${v.vignetteStart}%, rgb(30 18 8 / ${v.vignette}) 100%)`
    : "none";
}

export default function VideoTuner() {
  const [values, setValues] = useState<Values>(presets["12"]);
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    // Restored after mount, not in useState, so SSR markup matches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setValues({ ...presets["12"], ...JSON.parse(saved) });
  }, []);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--video-filter", filterOf(values));
    root.setProperty("--video-overlay", overlayOf(values));
    localStorage.setItem(storageKey, JSON.stringify(values));
  }, [values]);

  const css =
    `filter: ${filterOf(values)};` +
    (values.vignette ? `\noverlay: ${overlayOf(values)};` : "");

  function copy() {
    void navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="font-text text-night fixed right-4 bottom-4 z-50 w-80 rounded-xl border border-black/15 bg-white/95 p-4 text-sm shadow-lg backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mb-2 w-full text-left font-bold"
      >
        {open ? "▾" : "▸"} Настройка видео
      </button>

      {open && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-night/60 mr-1">Пресеты:</span>
            {Object.keys(presets).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setValues(presets[name])}
                className="rounded border border-black/20 px-2 py-0.5 hover:bg-black/5"
              >
                {name === "0" ? "оригинал" : name}
              </button>
            ))}
          </div>

          {sliders.map((s) => (
            <label key={s.key} className="flex flex-col">
              <span className="flex justify-between">
                <span>{s.label}</span>
                <span className="tabular-nums">
                  {values[s.key]}
                  {s.unit}
                </span>
              </span>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={values[s.key]}
                onChange={(e) =>
                  setValues({ ...values, [s.key]: Number(e.target.value) })
                }
              />
            </label>
          ))}

          <pre className="overflow-x-auto rounded bg-black/5 p-2 text-xs whitespace-pre-wrap">
            {css}
          </pre>
          <button
            type="button"
            onClick={copy}
            className="rounded border border-black/20 px-2 py-1 hover:bg-black/5"
          >
            {copied ? "Скопировано" : "Скопировать"}
          </button>
        </div>
      )}
    </div>
  );
}
