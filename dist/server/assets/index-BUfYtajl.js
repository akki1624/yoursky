import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { S as StarField, a as SparkleCanvas, N as Navbar, F as Footer } from "./Footer-BkOHYz-R.js";
import { C as Countdown, T as TimelineCard } from "./Countdown-DdkBLmIE.js";
import { j as journey } from "./journey-Bo7QcI32.js";
import "lucide-react";
const heartEmojis = ["♡", "💕", "💫", "✨", "🌸", "💖"];
let hId = 0;
function FloatingHearts() {
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const spawn = () => {
      const id = ++hId;
      const heart = {
        id,
        x: Math.random() * 90 + 5,
        // percent
        y: Math.random() * 60 + 20,
        // percent
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        duration: 3 + Math.random() * 2
      };
      setHearts((prev) => [...prev.slice(-15), heart]);
      setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== id)), (heart.duration + 1) * 1e3);
    };
    const interval = setInterval(spawn, 2500);
    spawn();
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 pointer-events-none overflow-hidden", style: { zIndex: 3 }, children: hearts.map((h) => /* @__PURE__ */ jsx(
    "div",
    {
      className: "absolute text-lg",
      style: {
        left: `${h.x}%`,
        top: `${h.y}%`,
        animation: `floatHeart ${h.duration}s ease-out forwards`,
        color: ["#f472b6", "#c084fc", "#fbbf24", "#e879f9"][Math.floor(Math.random() * 4)],
        opacity: 0.4
      },
      children: h.emoji
    },
    h.id
  )) });
}
const moonPhases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
const constellations = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
const quotes = [
  "Under the same sky, I think of you.",
  "The moon keeps all my wishes for you.",
  "Stars spelled your name tonight.",
  "Every night sky leads me back to you.",
  "Even the universe is in love with you.",
  "The night is beautiful because you exist.",
  "I traced your name in constellations.",
  "The moon rose early just to see you.",
  "Somewhere out there, you're under this same sky.",
  "The stars have known your name since before I did."
];
function getMoonPhase() {
  const known = /* @__PURE__ */ new Date("2001-01-24");
  const now = /* @__PURE__ */ new Date();
  const diff = (now.getTime() - known.getTime()) / (1e3 * 60 * 60 * 24);
  const cycle = diff % 29.53;
  const idx = Math.floor(cycle / 29.53 * 8);
  const names = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
  const i = Math.min(idx, 7);
  return { phase: moonPhases[i], name: names[i], index: i };
}
function getDailyQuote() {
  const day = (/* @__PURE__ */ new Date()).getDay();
  return quotes[day % quotes.length];
}
function getDailyConstellation() {
  const month = (/* @__PURE__ */ new Date()).getMonth();
  return constellations[month];
}
function TonightsSky() {
  const [moon] = useState(getMoonPhase);
  const [quote] = useState(getDailyQuote);
  const [constellation] = useState(getDailyConstellation);
  const [sparkle, setSparkle] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setSparkle((v) => !v), 2e3);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-3xl p-6 relative overflow-hidden",
      style: {
        background: "rgba(13,5,32,0.75)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(251,191,36,0.2)",
        boxShadow: "0 4px 30px rgba(251,191,36,0.1)"
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [...Array(12)].map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute rounded-full",
            style: {
              left: `${8 + i * 8}%`,
              top: `${10 + i % 5 * 18}%`,
              width: `${i % 3 === 0 ? 3 : 2}px`,
              height: `${i % 3 === 0 ? 3 : 2}px`,
              background: "#fde68a",
              opacity: sparkle ? i % 2 === 0 ? 0.8 : 0.3 : i % 2 === 0 ? 0.3 : 0.8,
              transition: "opacity 1.5s ease",
              boxShadow: "0 0 4px #fbbf24"
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl",
                style: {
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.2)",
                  animation: "moonGlow 4s ease-in-out infinite"
                },
                children: /* @__PURE__ */ jsx("span", { className: "text-3xl", children: moon.phase })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsx("p", { className: "font-script text-base", style: { color: "#fde68a" }, children: "Tonight's Sky" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: constellation })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-body mb-2", style: { color: "rgba(251,191,36,0.5)" }, children: moon.name }),
              /* @__PURE__ */ jsxs(
                "p",
                {
                  className: "font-body italic",
                  style: { color: "rgba(233,213,255,0.7)", fontSize: "0.9rem", lineHeight: "1.5" },
                  children: [
                    '"',
                    quote,
                    '"'
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 mt-4", children: ["✦", "✧", "✦", "✧", "✦"].map((s, i) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-xs",
              style: {
                color: i % 2 === 0 ? "#fbbf24" : "rgba(251,191,36,0.3)",
                transition: "all 1s ease",
                animation: `twinkle ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              },
              children: s
            },
            i
          )) })
        ] })
      ]
    }
  );
}
function FloatingHeart({
  delay,
  x
}) {
  const emojis = ["♡", "💕", "✨", "💫"];
  const colors = ["#f472b6", "#c084fc", "#fbbf24", "#e879f9"];
  const idx = Math.floor(x / 25);
  return /* @__PURE__ */ jsx("div", { className: "absolute pointer-events-none text-lg", style: {
    left: `${x}%`,
    bottom: "10%",
    animation: `floatHeart ${4 + delay}s ease-out infinite`,
    animationDelay: `${delay}s`,
    color: colors[idx],
    opacity: 0.5
  }, children: emojis[idx] });
}
function HomePage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen night-bg relative", children: [
    /* @__PURE__ */ jsx(StarField, {}),
    /* @__PURE__ */ jsx(SparkleCanvas, {}),
    /* @__PURE__ */ jsx(FloatingHearts, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 pointer-events-none overflow-hidden", style: {
      zIndex: 2
    }, children: [10, 25, 40, 55, 70, 85].map((x, i) => /* @__PURE__ */ jsx(FloatingHeart, { x, delay: i * 1.2 }, x)) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 min-h-screen flex items-center pt-16 pb-8 px-4 sm:px-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto w-full", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-40px)",
        transition: "all 1s ease"
      }, children: [
        /* @__PURE__ */ jsx("p", { className: "font-script text-base mb-3 tracking-wide", style: {
          color: "#f472b6",
          textShadow: "0 0 15px rgba(244,114,182,0.5)"
        }, children: "✨ A love story, wrapped in starlight ✨" }),
        /* @__PURE__ */ jsxs("h1", { className: "font-serif font-bold mb-2 leading-tight", style: {
          fontSize: "clamp(2rem, 5vw, 3.5rem)"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            background: "linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #fbbf24 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientShift 4s ease infinite"
          }, children: "The Sky Kept" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: {
            background: "linear-gradient(135deg, #fbbf24 0%, #f472b6 50%, #c084fc 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientShift 4s ease infinite 1s"
          }, children: "Your Wishes ✨" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-script text-xl mt-3 mb-4", style: {
          color: "#c084fc",
          textShadow: "0 0 15px rgba(192,132,252,0.4)"
        }, children: "Every moment with you is my favourite ♡" }),
        /* @__PURE__ */ jsx("p", { className: "font-body leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0", style: {
          color: "rgba(233,213,255,0.7)",
          fontSize: "1.05rem",
          lineHeight: "1.8"
        }, children: "Eleven days of love, memories, and magic — from May 15 to May 25. This is your story, told in starlight." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start", children: [
          /* @__PURE__ */ jsx(Link, { to: "/birthday", className: "btn-magical inline-block text-center", children: "Begin Our Journey ♡" }),
          /* @__PURE__ */ jsx(Link, { to: "/memories", className: "inline-block text-center px-8 py-3 rounded-full font-body transition-all duration-300", style: {
            border: "1px solid rgba(168,85,247,0.4)",
            color: "#c084fc",
            background: "rgba(168,85,247,0.08)",
            fontSize: "1.05rem"
          }, onMouseEnter: (e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(168,85,247,0.15)";
            el.style.boxShadow = "0 0 20px rgba(168,85,247,0.3)";
          }, onMouseLeave: (e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(168,85,247,0.08)";
            el.style.boxShadow = "none";
          }, children: "Our Memories ✦" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(40px)",
        transition: "all 1s ease 0.3s"
      }, children: [
        /* @__PURE__ */ jsx(Countdown, {}),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl p-4 text-center", style: {
          background: "rgba(168,85,247,0.08)",
          border: "1px solid rgba(168,85,247,0.15)"
        }, children: [
          /* @__PURE__ */ jsx("p", { className: "font-script text-base", style: {
            color: "#c084fc"
          }, children: "May 15 → May 25" }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm mt-1", style: {
            color: "rgba(196,181,253,0.5)"
          }, children: "Eleven days of birthday magic" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1 mt-2", children: journey.map((d) => /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full", style: {
            background: d.isBirthday ? "#fbbf24" : d.color === "pink" ? "#f472b6" : "#a855f7",
            boxShadow: d.isBirthday ? "0 0 6px #fbbf24" : "none"
          } }, d.day)) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-16 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("p", { className: "font-script text-base mb-2", style: {
          color: "#f472b6"
        }, children: "Our Story, Day by Day" }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif font-bold", style: {
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          background: "linear-gradient(135deg, #c084fc, #f472b6)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }, children: "Our 11 Day Journey" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-2 mt-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px w-16", style: {
            background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5))"
          } }),
          /* @__PURE__ */ jsx("span", { style: {
            color: "#a855f7"
          }, children: "✦" }),
          /* @__PURE__ */ jsx("div", { className: "h-px w-16", style: {
            background: "linear-gradient(90deg, rgba(168,85,247,0.5), transparent)"
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4", children: journey.map((day, i) => /* @__PURE__ */ jsx(TimelineCard, { day, index: i }, day.day)) }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden flex gap-3 overflow-x-auto pb-4 no-scrollbar", children: journey.map((day, i) => /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", style: {
        width: "200px"
      }, children: /* @__PURE__ */ jsx(TimelineCard, { day, index: i }) }, day.day)) }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsx(Link, { to: "/birthday", className: "btn-magical inline-block", children: "Open All 11 Days ✨" }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-16 px-4 sm:px-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl p-8 text-center relative overflow-hidden", style: {
      background: "rgba(13,5,32,0.7)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(168,85,247,0.3)",
      boxShadow: "0 8px 40px rgba(168,85,247,0.15)"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        background: "radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxs("div", { className: "w-28 h-36 rounded-b-3xl rounded-t-lg relative flex items-center justify-center", style: {
          background: "linear-gradient(180deg, rgba(168,85,247,0.15) 0%, rgba(13,5,32,0.5) 100%)",
          border: "1.5px solid rgba(168,85,247,0.4)",
          boxShadow: "0 0 30px rgba(168,85,247,0.2), inset 0 0 20px rgba(168,85,247,0.08)"
        }, children: [
          [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "absolute w-2 h-2 rounded-full", style: {
            left: `${20 + i * 12}%`,
            top: `${25 + i % 3 * 20}%`,
            background: i === 4 ? "#fbbf24" : "#86efac",
            boxShadow: i === 4 ? "0 0 8px #fbbf24, 0 0 20px #fbbf2466" : "0 0 6px #86efac, 0 0 15px #86efac66",
            animation: `fireflyGlow ${1.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`
          } }, i)),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3 w-4 h-14 rounded-full opacity-20", style: {
            background: "linear-gradient(180deg, rgba(255,255,255,0.8), transparent)"
          } })
        ] }) }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl mb-2", style: {
          background: "linear-gradient(135deg, #c084fc, #fbbf24)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }, children: "The Wish Jar" }),
        /* @__PURE__ */ jsx("p", { className: "font-script text-base mb-2", style: {
          color: "#f472b6"
        }, children: "Catch the golden firefly, answer a question, and seal three wishes in starlight" }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm mb-6", style: {
          color: "rgba(196,181,253,0.5)"
        }, children: "One golden firefly hides among the rest — find it, answer correctly, and choose your 3 wishes." }),
        /* @__PURE__ */ jsx(Link, { to: "/wish-jar", className: "btn-magical inline-block", children: "Enter the Wish Jar ✨" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-10 px-4 sm:px-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsx(TonightsSky, {}) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  HomePage as component
};
