"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function asset(path: string) {
  return `${BASE_PATH}${path}`;
}

const PRIZES = [
  {
    label: "a pink music capsule",
    color: "#ff9eb5",
    href: "https://www.youtube.com/watch?v=SIP5EfFAS3s",
  },
  {
    label: "a yellow book capsule",
    color: "#ffd166",
    href: "https://www.thalia.de/shop/home/artikeldetails/A1072795140",
  },
  {
    label: "a blue book capsule",
    color: "#8ecae6",
    href: "https://www.thalia.de/shop/home/artikeldetails/A1062793535",
  },
  {
    label: "an aqua music capsule",
    color: "#8aeae4",
    href: "https://www.youtube.com/watch?v=48-RA4BNXVc&t=165s",
  },
  {
    label: "an orange music capsule",
    color: "#f4a261",
    href: "https://www.youtube.com/watch?v=jUl2P4fH5t8",
  },
  {
    label: "lila",
    color: "#c9a7eb",
    href: "https://byeorisim.itch.io/brush-jjaemu?utm_source=chatgpt.com",
  },
  {
    label: "Smaragdgrün",
    color: "#00B271",
    href: "https://www.thalia.de/shop/home/artikeldetails/A1073314744",
  },
] as const;

type DrawPhase = "idle" | "turning" | "ready";

export default function Home() {
  const [phase, setPhase] = useState<DrawPhase>("idle");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [drawCount, setDrawCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function draw() {
    if (phase === "turning") return;

    const choices = PRIZES.map((_, index) => index).filter(
      (index) => index !== selectedIndex,
    );
    const nextIndex = choices[Math.floor(Math.random() * choices.length)];

    setSelectedIndex(null);
    setPhase("turning");
    setDrawCount((count) => count + 1);

    timerRef.current = setTimeout(() => {
      setSelectedIndex(nextIndex);
      setPhase("ready");
    }, 1050);
  }

  const prize = selectedIndex === null ? null : PRIZES[selectedIndex];
  return (
    <main className="kiosk-page">
      <section className="kiosk-stage" aria-label="Hand-drawn link gacha kiosk">
        <img
          className="art art-logo drift-one"
          src={asset("/art/logo.png")}
          alt="Kiosk, with a small raccoon face"
          draggable={false}
        />

        <img
          className="art art-bird drift-two"
          src={asset("/art/bird-cloud.png")}
          alt="A small bird sitting on a cloud"
          draggable={false}
        />

        <small className="signature-credit">by zihui</small>

        <div className={`machine-wrap ${phase === "" ? "is-shaking" : ""}`}>
          <img
            className="machine-art"
            src={asset("/art/gacha-machine-original.png")}
            alt="A hand-drawn capsule machine"
            draggable={false}
          />

          <button
            className={`knob ${phase === "turning" ? "is-turning" : ""}`}
            type="button"
            onClick={draw}
            disabled={phase === "turning"}
            aria-label={
              phase === "ready"
                ? ""
                : ""
            }
          >
            <img
              src={asset("/art/draw-button-original.png")}
              alt=""
              draggable={false}
            />
          </button>

          {prize && (
            <a
              key={drawCount}
              className="gacha-ball"
              style={
                {
                  "--ball-color": prize.color,
                  "--ball-mask": `url(${asset("/art/drop-ball-original.png")})`,
                } as CSSProperties
              }
              href={prize.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open your gacha link: ${prize.label}`}
            >
              <img
                src={asset("/art/drop-ball-original.png")}
                alt="Open the link inside this capsule"
                draggable={false}
              />
            </a>
          )}

          {phase === "ready" && (
            <p className="knob-note">turn again?</p>
          )}
        </div>

        <img
          className="art art-sign drift-three"
          src={asset("/art/sign.png")}
          alt="A small sign showing five treats"
          draggable={false}
        />

        <img
          className="art art-raccoon drift-four"
          src={asset("/art/raccoon.png")}
          alt="A friendly raccoon mascot"
          draggable={false}
        />

        <img
          className="art art-cat drift-five"
          src={asset("/art/cat.png")}
          alt="A hand-drawn cat beside the raccoon"
          draggable={false}
        />

        <p className="screen-reader-status" aria-live="polite">
          {phase === "turning" && "The gacha machine is drawing a link."}
          {prize && `Your capsule contains ${prize.label}.`}
        </p>

        {phase === "ready" && prize && (
          <div className="tiny-instruction" aria-hidden="true">
            <span>① turn</span>
            <span>② tap the ball</span>
            <span>③ wander</span>
          </div>
        )}
      </section>
    </main>
  );
}
