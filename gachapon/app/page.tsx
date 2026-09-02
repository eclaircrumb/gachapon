"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function asset(path: string) {
  return `${BASE_PATH}${path}`;
}

const MENUS = [
  "/art/29aug.png",
  "/art/28aug.png",
  "/art/30aug.png",
  "/art/31aug.png",
] as const;

const PRIZES = [
  {
    label: "a pink music capsule",
    color: "#ff9eb5",
    href: "https://www.youtube.com/watch?v=SIP5EfFAS3s",
  },
  {
    label: "a yellow book capsule",
    color: "#ffd166",
    href: "https://www.thalia.de/shop/home/artikeldetails/A1072022621",
  },
  {
    label: "a blue book capsule",
    color: "#8ecae6",
    href: "https://www.thalia.de/shop/home/artikeldetails/A1073686468",
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
  {
    label: "Smaragdgrün-book2",
    color: "#00B271",
    href: "https://www.thalia.de/shop/home/artikeldetails/A1007514532",
  },
] as const;

type DrawPhase = "idle" | "turning" | "ready";

export default function Home() {
  const [phase, setPhase] = useState<DrawPhase>("idle");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [drawCount, setDrawCount] = useState(0);
  const [isTagsMenuOpen, setIsTagsMenuOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMenu() {
    setIsTagsMenuOpen(true);
  }

  function showPreviousMenu() {
    setMenuIndex((currentIndex) => {
      return (currentIndex - 1 + MENUS.length) % MENUS.length;
    });
  }

  function showNextMenu() {
    setMenuIndex((currentIndex) => {
      return (currentIndex + 1) % MENUS.length;
    });
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isTagsMenuOpen) return;

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsTagsMenuOpen(false);
      if (event.key === "ArrowLeft") {
        setMenuIndex((currentIndex) => {
          return (currentIndex - 1 + MENUS.length) % MENUS.length;
        });
      }
      if (event.key === "ArrowRight") {
        setMenuIndex((currentIndex) => {
          return (currentIndex + 1) % MENUS.length;
        });
      }
    }

    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [isTagsMenuOpen]);

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

        <img
          className="art art-weather-sign drift-three"
          src={asset("/art/wetter.png")}
          alt=""
          draggable={false}
        />

        <button
          className="tags-menu-trigger drift-two"
          type="button"
          onClick={openMenu}
          aria-label="Open tags menu"
          aria-haspopup="dialog"
        >
          <img
            src={asset("/art/tagsmenu.png")}
            alt=""
            draggable={false}
          />
        </button>

        <div className={`machine-wrap ${phase === "turning" ? "is-shaking" : ""}`}>
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
              aria-label={`  ${prize.label}`}
            >
              <img
                src={asset("/art/drop-ball-original.png")}
                alt=" "
                draggable={false}
              />
            </a>
          )}

          
        </div>

        <img
          className="art art-sign"
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

        <img
          className="art art-harmonic drift-seven"
          src={asset("/art/harmonic.png")}
          alt="A hand-drawn harmonic"
          draggable={false}
        />

        <img
          className="art art-alpaca drift-six"
          src={asset("/art/alpaca.png")}
          alt="A hand-drawn alpaca beside the raccoon"
          draggable={false}
        />

         <img
          className="art art-bee drift-three"
          src={asset("/art/bee.png")}
          alt="A hand-drawn bee"
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

      {isTagsMenuOpen && (
        <div
          className="tags-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Tags menu"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsTagsMenuOpen(false);
          }}
        >
          <div className="tags-modal-paper">
            <button
              className="tags-modal-arrow tags-modal-arrow-left"
              type="button"
              onClick={showPreviousMenu}
              aria-label="Previous menu"
            >
              ‹
            </button>

            <img
              className="tags-modal-image"
              src={asset(MENUS[menuIndex])}
              alt=""
              draggable={false}
            />

            <button
              className="tags-modal-arrow tags-modal-arrow-right"
              type="button"
              onClick={showNextMenu}
              aria-label="Next menu"
            >
              ›
            </button>

            <button
              className="tags-modal-close"
              type="button"
              onClick={() => setIsTagsMenuOpen(false)}
              aria-label="Close tags menu"
              autoFocus
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
