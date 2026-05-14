import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
const colorMap = {
  purple: {
    border: "rgba(168,85,247,0.35)",
    glow: "rgba(168,85,247,0.2)",
    badge: "rgba(168,85,247,0.2)",
    icon: "#a855f7"
  },
  pink: {
    border: "rgba(244,114,182,0.35)",
    glow: "rgba(244,114,182,0.2)",
    badge: "rgba(244,114,182,0.2)",
    icon: "#f472b6"
  },
  gold: {
    border: "rgba(251,191,36,0.35)",
    glow: "rgba(251,191,36,0.2)",
    badge: "rgba(251,191,36,0.15)",
    icon: "#fbbf24"
  },
  birthday: {
    border: "rgba(251,191,36,0.5)",
    glow: "rgba(251,191,36,0.3)",
    badge: "rgba(251,191,36,0.2)",
    icon: "#fbbf24"
  }
};
function TimelineCard({ day, index: _index }) {
  const colors = colorMap[day.color] || colorMap.purple;
  const isUnlocked = !day.locked;
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: "/birthday/$day",
      params: { day: day.date },
      className: "block relative group",
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "timeline-card rounded-2xl overflow-hidden relative",
          style: {
            background: day.isBirthday ? "linear-gradient(135deg, rgba(30,10,60,0.85), rgba(60,20,5,0.85))" : "rgba(13,5,32,0.7)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${colors.border}`,
            boxShadow: `0 4px 24px ${colors.glow}, inset 0 0 20px rgba(0,0,0,0.2)`,
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          },
          onMouseEnter: (e) => {
            const el = e.currentTarget;
            el.style.boxShadow = `0 12px 40px ${colors.glow.replace("0.2", "0.5")}, inset 0 0 20px rgba(0,0,0,0.2)`;
          },
          onMouseLeave: (e) => {
            const el = e.currentTarget;
            el.style.boxShadow = `0 4px 24px ${colors.glow}, inset 0 0 20px rgba(0,0,0,0.2)`;
          },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-0.5 w-full",
                style: { background: `linear-gradient(90deg, transparent, ${colors.icon}, transparent)` }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: "text-xs font-body uppercase tracking-widest px-3 py-1 rounded-full",
                    style: {
                      background: colors.badge,
                      color: colors.icon,
                      border: `1px solid ${colors.border}`,
                      letterSpacing: "0.15em"
                    },
                    children: [
                      "Day ",
                      day.day
                    ]
                  }
                ),
                day.isBirthday && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-xs px-2 py-1 rounded-full font-body",
                    style: { background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" },
                    children: "🎂 Birthday"
                  }
                ),
                day.isFinal && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-xs px-2 py-1 rounded-full font-body",
                    style: { background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)" },
                    children: "💌 Final Gift"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-2xl", style: { filter: `drop-shadow(0 0 8px ${colors.icon})` }, children: day.emoji }),
                /* @__PURE__ */ jsx("span", { className: "font-body text-sm", style: { color: "rgba(196,181,253,0.6)" }, children: day.displayDate })
              ] }),
              /* @__PURE__ */ jsx(
                "h3",
                {
                  className: "font-serif text-lg font-semibold mb-1 leading-tight",
                  style: {
                    color: day.isBirthday ? "#fde68a" : "#e9d5ff",
                    textShadow: day.isBirthday ? "0 0 15px rgba(251,191,36,0.4)" : "none"
                  },
                  children: day.title
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "font-script text-sm", style: { color: "rgba(244,114,182,0.7)" }, children: day.subtitle }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
                isUnlocked ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-xs font-body", style: { color: "#86efac" }, children: [
                  /* @__PURE__ */ jsx("span", { children: "✦" }),
                  " Open"
                ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-xs font-body", style: { color: "rgba(196,181,253,0.4)" }, children: [
                  /* @__PURE__ */ jsx("span", { children: "🔒" }),
                  " Locked"
                ] }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-xs font-body group-hover:translate-x-1 transition-transform",
                    style: { color: colors.icon, opacity: 0.7 },
                    children: "Open →"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function getTimeLeft() {
  const target = (/* @__PURE__ */ new Date("2026-05-22T00:00:00")).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1e3 * 60 * 60 * 24)),
    hours: Math.floor(diff / (1e3 * 60 * 60) % 24),
    minutes: Math.floor(diff / (1e3 * 60) % 60),
    seconds: Math.floor(diff / 1e3 % 60)
  };
}
function Unit({ value, label }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl relative",
        style: {
          background: "rgba(168,85,247,0.12)",
          border: "1px solid rgba(168,85,247,0.3)",
          boxShadow: "0 0 20px rgba(168,85,247,0.2), inset 0 0 20px rgba(168,85,247,0.05)"
        },
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: "font-serif text-2xl sm:text-3xl font-bold",
            style: {
              color: "#fbbf24",
              textShadow: "0 0 20px rgba(251,191,36,0.7)"
            },
            children: String(value).padStart(2, "0")
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "text-xs mt-2 tracking-widest uppercase font-body",
        style: { color: "rgba(233,213,255,0.6)", letterSpacing: "0.15em" },
        children: label
      }
    )
  ] });
}
function Countdown() {
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1e3);
    return () => clearInterval(id);
  }, []);
  const isPast = Date.now() >= (/* @__PURE__ */ new Date("2026-05-22T00:00:00")).getTime();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-3xl p-6 sm:p-8 relative overflow-hidden",
      style: {
        background: "transparent"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none",
            style: { background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)" }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-10", children: isPast ? /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl mb-3", children: "🎂" }),
          /* @__PURE__ */ jsx("p", { className: "font-script text-2xl", style: { color: "#fbbf24", textShadow: "0 0 20px rgba(251,191,36,0.6)" }, children: "Today is your day! ♡" }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-purple-300 mt-1 text-sm", children: "May 22, 2026" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-5", children: [
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "font-script",
                style: {
                  color: "#f3c6ff",
                  fontSize: "2rem",
                  lineHeight: "1",
                  marginBottom: "10px",
                  textShadow: "0 0 18px rgba(255,180,220,0.35)"
                },
                children: "Counting down to"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "font-serif text-xl font-semibold", style: { color: "#fde68a", textShadow: "0 0 15px rgba(251,191,36,0.4)" }, children: "Your Birthday ♡" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-body", style: { color: "rgba(233,213,255,0.5)" }, children: "May 22, 2026" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-center gap-3 sm:gap-4", children: [
            /* @__PURE__ */ jsx(Unit, { value: time.days, label: "Days" }),
            /* @__PURE__ */ jsx("span", { className: "font-serif text-2xl sm:text-3xl mt-4", style: { color: "#a855f7" }, children: ":" }),
            /* @__PURE__ */ jsx(Unit, { value: time.hours, label: "Hours" }),
            /* @__PURE__ */ jsx("span", { className: "font-serif text-2xl sm:text-3xl mt-4", style: { color: "#a855f7" }, children: ":" }),
            /* @__PURE__ */ jsx(Unit, { value: time.minutes, label: "Minutes" }),
            /* @__PURE__ */ jsx("span", { className: "font-serif text-2xl sm:text-3xl mt-4", style: { color: "#a855f7" }, children: ":" }),
            /* @__PURE__ */ jsx(Unit, { value: time.seconds, label: "Seconds" })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Countdown as C,
  TimelineCard as T
};
