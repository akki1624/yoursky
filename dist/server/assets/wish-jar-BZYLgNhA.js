import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { S as StarField, a as SparkleCanvas, N as Navbar, F as Footer } from "./Footer-BkOHYz-R.js";
import { useRef, useState, useCallback, useEffect } from "react";
import "@tanstack/react-router";
import "lucide-react";
const wishJarQuestion = {
  question: `Tell me... What is the most amazing thing I like about you?`,
  hint: `Think carefully, my love... ♡`,
  options: [
    { id: "A", label: "A", text: `Your Smile` },
    { id: "B", label: "B", text: `Your Body` },
    { id: "C", label: "C", text: `Your Nature` },
    { id: "D", label: "D", text: `All of the Above` }
  ],
  correctAnswer: "D"
  // Change this to the correct option ID
};
const wishes = [
  {
    id: "wish1",
    emoji: "❤️",
    text: `5 pictures of me as you want to see me, whatever you want, I shall do`
  },
  {
    id: "wish2",
    emoji: "🌙",
    text: `1 Video of me as you want to see me for 15 seconds`
  },
  {
    id: "wish3",
    emoji: "💌",
    text: `2 Ice Creams whenever you want just text me.`
  },
  {
    id: "wish4",
    emoji: "🎵",
    text: `A song of your choice with my voice on guitar sent to you`
  },
  {
    id: "wish5",
    emoji: "🌸",
    text: `A material gift of your choice`
  },
  {
    id: "wish6",
    emoji: "📚",
    text: `You want me to say something I will say that, 1 statement only`
  }
];
function WishJarGame() {
  const containerRef = useRef(null);
  const [flies, setFlies] = useState([]);
  const [phase, setPhase] = useState("catching");
  const [attempts, setAttempts] = useState(2);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedWishes, setSelectedWishes] = useState([]);
  const [saved, setSaved] = useState(false);
  const animRef = useRef(0);
  const timeRef = useRef(0);
  const initFlies = useCallback(() => {
    const w = containerRef.current?.clientWidth || 320;
    const h = containerRef.current?.clientHeight || 360;
    const newFlies = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * (w - 20) + 10,
      y: Math.random() * (h - 20) + 10,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      special: i === 11,
      caught: false
    }));
    setFlies(newFlies);
  }, []);
  useEffect(() => {
    initFlies();
    return () => cancelAnimationFrame(animRef.current);
  }, [initFlies]);
  useEffect(() => {
    if (phase !== "catching") return;
    const animate = (ts) => {
      timeRef.current = ts;
      const w = containerRef.current?.clientWidth || 320;
      const h = containerRef.current?.clientHeight || 360;
      setFlies((prev) => prev.map((f) => {
        if (f.caught) return f;
        let nx = f.x + f.vx + Math.sin(ts * 1e-3 * (f.id + 1)) * 0.8;
        let ny = f.y + f.vy + Math.cos(ts * 13e-4 * (f.id + 1)) * 0.8;
        let nvx = f.vx + (Math.random() - 0.5) * 0.05;
        let nvy = f.vy + (Math.random() - 0.5) * 0.05;
        nvx = Math.max(-2, Math.min(2, nvx));
        nvy = Math.max(-2, Math.min(2, nvy));
        if (nx < 10 || nx > w - 10) nvx *= -1;
        if (ny < 10 || ny > h - 10) nvy *= -1;
        nx = Math.max(10, Math.min(w - 10, nx));
        ny = Math.max(10, Math.min(h - 10, ny));
        return { ...f, x: nx, y: ny, vx: nvx, vy: nvy };
      }));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase]);
  const catchFly = (fly) => {
    if (fly.caught || phase !== "catching") return;
    cancelAnimationFrame(animRef.current);
    setFlies((prev) => prev.map((f) => f.id === fly.id ? { ...f, caught: true } : f));
    if (fly.special) {
      setTimeout(() => setPhase("question"), 600);
    } else {
      setTimeout(() => {
        setFlies((prev) => prev.map((f) => f.id === fly.id ? { ...f, caught: false } : f));
      }, 1e3);
    }
  };
  const submitAnswer = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === wishJarQuestion.correctAnswer) {
      setPhase("success");
    } else {
      const left = attempts - 1;
      setAttempts(left);
      if (left <= 0) {
        setPhase("outOfAttempts");
      } else {
        setPhase("wrong");
        setSelectedAnswer(null);
      }
    }
  };
  const toggleWish = (id) => {
    setSelectedWishes(
      (prev) => prev.includes(id) ? prev.filter((w) => w !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };
  const saveWishes = async () => {
    setSaved(true);
    setPhase("done");
    try {
      await fetch("/api/wish-jar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: selectedAnswer, wishes: selectedWishes, ts: Date.now() })
      });
    } catch {
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative mx-auto rounded-3xl overflow-hidden",
      style: {
        width: "100%",
        maxWidth: "380px",
        height: "380px",
        background: "linear-gradient(180deg, rgba(168,85,247,0.08) 0%, rgba(13,5,32,0.6) 100%)",
        border: "2px solid rgba(168,85,247,0.35)",
        boxShadow: "0 0 40px rgba(168,85,247,0.15), inset 0 0 40px rgba(168,85,247,0.05)"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-4 left-6 w-8 h-24 rounded-full opacity-20 pointer-events-none",
            style: { background: "linear-gradient(180deg, rgba(255,255,255,0.8), transparent)" }
          }
        ),
        phase === "catching" && /* @__PURE__ */ jsxs(Fragment, { children: [
          flies.filter((f) => !f.caught).map((fly) => /* @__PURE__ */ jsx(
            "button",
            {
              className: fly.special ? "firefly-special" : "firefly-dot",
              style: {
                left: fly.x,
                top: fly.y,
                transform: "translate(-50%, -50%)",
                animationDelay: `${fly.id * 0.3}s`
              },
              onClick: () => catchFly(fly),
              title: fly.special ? "Click me!" : "Catch the fireflies!"
            },
            fly.id
          )),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute bottom-4 left-0 right-0 text-center font-script text-sm pointer-events-none",
              style: { color: "rgba(192,132,252,0.6)" },
              children: "Catch the golden one ✨"
            }
          )
        ] }),
        (phase === "question" || phase === "wrong") && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center p-6", style: { background: "rgba(5,2,13,0.92)" }, children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsx("p", { className: "font-script text-center text-lg mb-1", style: { color: "#fbbf24" }, children: "A question appears..." }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-center text-sm mb-4", style: { color: "rgba(196,181,253,0.5)" }, children: wishJarQuestion.hint }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-center text-base mb-4", style: { color: "#e9d5ff" }, children: wishJarQuestion.question }),
          phase === "wrong" && /* @__PURE__ */ jsxs("p", { className: "text-center text-xs mb-3 font-body", style: { color: "#f87171" }, children: [
            "Not quite... ",
            attempts,
            " attempt",
            attempts !== 1 ? "s" : "",
            " remaining."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: wishJarQuestion.options.map((opt) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setSelectedAnswer(opt.id),
              className: "p-2.5 rounded-xl text-xs font-body text-left transition-all duration-200",
              style: {
                background: selectedAnswer === opt.id ? "rgba(168,85,247,0.3)" : "rgba(168,85,247,0.08)",
                border: selectedAnswer === opt.id ? "1px solid rgba(168,85,247,0.6)" : "1px solid rgba(168,85,247,0.2)",
                color: selectedAnswer === opt.id ? "#e9d5ff" : "rgba(196,181,253,0.6)"
              },
              children: [
                /* @__PURE__ */ jsxs("span", { style: { color: "#fbbf24", fontWeight: 600 }, children: [
                  opt.id,
                  "."
                ] }),
                " ",
                opt.text
              ]
            },
            opt.id
          )) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: submitAnswer,
              disabled: !selectedAnswer,
              className: "w-full mt-3 py-2 rounded-xl font-body text-sm transition-all duration-200",
              style: {
                background: selectedAnswer ? "linear-gradient(135deg, #7c3aed, #ec4899)" : "rgba(168,85,247,0.1)",
                color: selectedAnswer ? "white" : "rgba(196,181,253,0.4)",
                cursor: selectedAnswer ? "pointer" : "not-allowed",
                border: "1px solid rgba(168,85,247,0.3)"
              },
              children: "Confirm ♡"
            }
          )
        ] }) }),
        phase === "outOfAttempts" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center p-6", style: { background: "rgba(5,2,13,0.92)" }, children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl mb-3", children: "💔" }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-base", style: { color: "#f87171" }, children: "Out of attempts..." }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm mt-2", style: { color: "rgba(196,181,253,0.5)" }, children: "Come back tomorrow and try again, my love." })
        ] }) }),
        phase === "success" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center p-5", style: { background: "rgba(5,2,13,0.92)" }, children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsx("p", { className: "font-script text-center text-lg mb-1", style: { color: "#86efac" }, children: "✓ You got it right! ♡" }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-center text-xs mb-4", style: { color: "rgba(196,181,253,0.5)" }, children: "Choose 3 wishes to keep in the jar..." }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: wishes.map((wish) => {
            const sel = selectedWishes.includes(wish.id);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => toggleWish(wish.id),
                className: "w-full p-2.5 rounded-xl text-xs font-body text-left transition-all duration-200 flex items-start gap-2",
                style: {
                  background: sel ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.06)",
                  border: sel ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(168,85,247,0.15)",
                  color: sel ? "#e9d5ff" : "rgba(196,181,253,0.5)"
                },
                children: [
                  /* @__PURE__ */ jsx("span", { children: wish.emoji }),
                  /* @__PURE__ */ jsx("span", { children: wish.text })
                ]
              },
              wish.id
            );
          }) }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: saveWishes,
              disabled: selectedWishes.length !== 3,
              className: "w-full mt-3 py-2 rounded-xl font-body text-sm transition-all duration-200",
              style: {
                background: selectedWishes.length === 3 ? "linear-gradient(135deg, #f59e0b, #ec4899)" : "rgba(168,85,247,0.1)",
                color: selectedWishes.length === 3 ? "white" : "rgba(196,181,253,0.4)",
                cursor: selectedWishes.length === 3 ? "pointer" : "not-allowed"
              },
              children: [
                selectedWishes.length,
                "/3 — Save Wishes ✨"
              ]
            }
          )
        ] }) }),
        phase === "done" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center p-6", style: { background: "rgba(5,2,13,0.92)" }, children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl mb-3", children: "🌟" }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-base", style: { color: "#fbbf24", textShadow: "0 0 15px rgba(251,191,36,0.5)" }, children: "Your wishes are sealed" }),
          /* @__PURE__ */ jsx("p", { className: "font-script text-sm mt-2", style: { color: "#f472b6" }, children: "in the sky, for you ♡" }),
          saved && /* @__PURE__ */ jsx("p", { className: "text-xs font-body mt-3", style: { color: "rgba(134,239,172,0.7)" }, children: "✓ Saved to the stars" })
        ] }) })
      ]
    }
  ) });
}
function WishJarPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen relative", style: {
    background: "radial-gradient(ellipse at 50% 30%, #1a0535 0%, #0d0520 50%, #05020d 100%)"
  }, children: [
    /* @__PURE__ */ jsx(StarField, {}),
    /* @__PURE__ */ jsx(SparkleCanvas, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 pt-24 pb-16 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("p", { className: "font-script text-base mb-2", style: {
          color: "#fbbf24"
        }, children: "A magical mini-game" }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif font-bold mb-3", style: {
          fontSize: "clamp(2rem, 5vw, 3rem)",
          background: "linear-gradient(135deg, #fbbf24, #c084fc, #f472b6)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientShift 4s ease infinite"
        }, children: "The Wish Jar ✨" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px w-16", style: {
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4))"
          } }),
          /* @__PURE__ */ jsx("span", { style: {
            color: "#fbbf24"
          }, children: "✦" }),
          /* @__PURE__ */ jsx("div", { className: "h-px w-16", style: {
            background: "linear-gradient(90deg, rgba(251,191,36,0.4), transparent)"
          } })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-body max-w-md mx-auto mb-2", style: {
          color: "rgba(196,181,253,0.6)",
          lineHeight: "1.7"
        }, children: "Inside this jar, fireflies carry wishes. One golden firefly is special." }),
        /* @__PURE__ */ jsx("p", { className: "font-body max-w-md mx-auto", style: {
          color: "rgba(196,181,253,0.5)",
          lineHeight: "1.7",
          fontSize: "0.9rem"
        }, children: "Catch it → Answer a question about us → Choose 3 wishes to seal in the sky." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-2xl p-5 mb-8 grid grid-cols-3 gap-3 text-center", style: {
        background: "rgba(13,5,32,0.6)",
        border: "1px solid rgba(251,191,36,0.15)"
      }, children: [{
        step: "1",
        icon: "🪲",
        text: "Catch the golden firefly"
      }, {
        step: "2",
        icon: "💭",
        text: "Answer a question about us"
      }, {
        step: "3",
        icon: "✨",
        text: "Choose 3 wishes"
      }].map(({
        step,
        icon,
        text
      }) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 font-body text-xs", style: {
          background: "rgba(251,191,36,0.15)",
          border: "1px solid rgba(251,191,36,0.3)",
          color: "#fbbf24"
        }, children: step }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl mb-1", children: icon }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-xs", style: {
          color: "rgba(196,181,253,0.5)"
        }, children: text })
      ] }, step)) }),
      /* @__PURE__ */ jsx(WishJarGame, {}),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsx("p", { className: "font-script text-sm", style: {
        color: "rgba(251,191,36,0.5)"
      }, children: "Hint: the golden one glows a little differently ✨" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  WishJarPage as component
};
