import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { S as StarField, a as SparkleCanvas, N as Navbar, F as Footer } from "./Footer-BkOHYz-R.js";
import { j as journey } from "./journey-Bo7QcI32.js";
import { R as Route } from "./router-D030xe1h.js";
import "lucide-react";
const EMOJIS = ["💖", "😭", "🥺", "✨", "💕", "🥹", "💫", "🌸"];
function ReactionPanel({ day }) {
  const [data, setData] = useState({ reactions: {}, replies: [] });
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState(null);
  useEffect(() => {
    fetch(`/api/reactions?day=${encodeURIComponent(day)}`).then((r) => r.json()).then((d) => setData(d || { reactions: {}, replies: [] })).catch(() => {
    });
  }, [day]);
  const react = async (emoji) => {
    setActiveEmoji(emoji);
    setData((prev) => ({
      ...prev,
      reactions: { ...prev.reactions, [emoji]: (prev.reactions[emoji] || 0) + 1 }
    }));
    try {
      await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, emoji })
      });
    } catch {
    }
  };
  const sendReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    const text = reply.trim();
    try {
      await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, reply: text })
      });
      setData((prev) => ({ ...prev, replies: [...prev.replies, text] }));
      setReply("");
      setSent(true);
      setTimeout(() => setSent(false), 3e3);
    } catch {
    }
    setSending(false);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-3xl p-6",
      style: {
        background: "rgba(13,5,32,0.6)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(244,114,182,0.2)"
      },
      children: [
        /* @__PURE__ */ jsx("h3", { className: "font-script text-xl mb-4", style: { color: "#f472b6" }, children: "How did this make you feel? ♡" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-5", children: EMOJIS.map((emoji) => /* @__PURE__ */ jsxs(
          "button",
          {
            className: "reaction-btn",
            style: {
              background: activeEmoji === emoji ? "rgba(244,114,182,0.2)" : "rgba(168,85,247,0.1)",
              border: activeEmoji === emoji ? "1px solid rgba(244,114,182,0.4)" : "1px solid rgba(168,85,247,0.2)"
            },
            onClick: () => react(emoji),
            children: [
              /* @__PURE__ */ jsx("span", { children: emoji }),
              data.reactions[emoji] ? /* @__PURE__ */ jsx("span", { className: "text-xs font-body", style: { color: "rgba(196,181,253,0.6)" }, children: data.reactions[emoji] }) : null
            ]
          },
          emoji
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm", style: { color: "rgba(196,181,253,0.6)" }, children: "Leave a little note..." }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: reply,
              onChange: (e) => setReply(e.target.value),
              placeholder: "Write something sweet... ♡",
              rows: 3,
              className: "w-full rounded-xl px-4 py-3 resize-none font-body text-sm outline-none transition-all duration-300",
              style: {
                background: "rgba(168,85,247,0.08)",
                border: "1px solid rgba(168,85,247,0.2)",
                color: "#e9d5ff",
                lineHeight: "1.6"
              },
              onFocus: (e) => {
                e.target.style.border = "1px solid rgba(244,114,182,0.4)";
                e.target.style.boxShadow = "0 0 15px rgba(244,114,182,0.1)";
              },
              onBlur: (e) => {
                e.target.style.border = "1px solid rgba(168,85,247,0.2)";
                e.target.style.boxShadow = "none";
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: sendReply,
              disabled: sending || !reply.trim(),
              className: "btn-magical text-sm py-2.5 px-6",
              style: { opacity: !reply.trim() ? 0.5 : 1 },
              children: sent ? "✓ Sent ♡" : sending ? "Sending..." : "Send ♡"
            }
          )
        ] }),
        data.replies.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "font-body text-xs uppercase tracking-widest", style: { color: "rgba(196,181,253,0.4)" }, children: "Your notes" }),
          data.replies.map((r, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "px-4 py-3 rounded-xl font-body text-sm",
              style: {
                background: "rgba(244,114,182,0.06)",
                border: "1px solid rgba(244,114,182,0.15)",
                color: "rgba(233,213,255,0.7)",
                lineHeight: "1.6"
              },
              children: [
                '"',
                r,
                '"'
              ]
            },
            i
          ))
        ] })
      ]
    }
  );
}
function LockedScreen({
  day
}) {
  const unlock = new Date(day.unlockDate);
  const now = /* @__PURE__ */ new Date();
  const diffDays = Math.max(0, Math.ceil((unlock.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24)));
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full flex items-center justify-center mb-6", style: {
      background: "rgba(168,85,247,0.1)",
      border: "1px solid rgba(168,85,247,0.3)",
      animation: "lockShake 4s ease-in-out infinite"
    }, children: /* @__PURE__ */ jsx("span", { className: "text-4xl", children: "🔒" }) }),
    /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl mb-2", style: {
      color: "#e9d5ff"
    }, children: "This Day Is Still Locked" }),
    /* @__PURE__ */ jsxs("p", { className: "font-body text-lg", style: {
      color: "rgba(196,181,253,0.6)"
    }, children: [
      "Unlocks in ",
      diffDays,
      " day",
      diffDays !== 1 ? "s" : ""
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "font-script text-sm mt-2", style: {
      color: "#f472b6"
    }, children: [
      "on ",
      day.displayDate,
      " ♡"
    ] })
  ] });
}
function DayPage() {
  const {
    day: dayParam
  } = Route.useParams();
  const [bonusOpen, setBonusOpen] = useState(false);
  const day = journey.find((d) => d.date === dayParam);
  if (!day) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen night-bg flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "font-serif text-xl", style: {
      color: "#e9d5ff"
    }, children: "Day not found." }) });
  }
  const currentIdx = journey.findIndex((d) => d.date === dayParam);
  const prev = currentIdx > 0 ? journey[currentIdx - 1] : null;
  const next = currentIdx < journey.length - 1 ? journey[currentIdx + 1] : null;
  const unlockDate = new Date(day.unlockDate);
  const isUnlocked = Date.now() >= unlockDate.getTime();
  const colorMap = {
    purple: "#a855f7",
    pink: "#f472b6",
    gold: "#fbbf24",
    birthday: "#fbbf24"
  };
  const accent = colorMap[day.color] || "#a855f7";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen relative", style: {
    background: day.isBirthday ? "radial-gradient(ellipse at top, #2d1008 0%, #1a0535 40%, #05020d 100%)" : "radial-gradient(ellipse at top, #1a0535 0%, #0d0520 40%, #05020d 100%)"
  }, children: [
    /* @__PURE__ */ jsx(StarField, {}),
    /* @__PURE__ */ jsx(SparkleCanvas, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    day.isBirthday && /* Birthday confetti glow */
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 pointer-events-none", style: {
      background: "radial-gradient(ellipse at 50% 20%, rgba(251,191,36,0.06) 0%, transparent 60%)",
      zIndex: 2
    } }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 pt-24 pb-16 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-8 text-sm font-body", children: [
        /* @__PURE__ */ jsx(Link, { to: "/birthday", style: {
          color: "rgba(196,181,253,0.5)"
        }, className: "hover:text-purple-300 transition-colors", children: "Birthday 2026" }),
        /* @__PURE__ */ jsx("span", { style: {
          color: "rgba(196,181,253,0.3)"
        }, children: "›" }),
        /* @__PURE__ */ jsx("span", { style: {
          color: accent
        }, children: day.displayDate })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 font-body text-xs uppercase tracking-widest", style: {
          background: `rgba(${accent === "#fbbf24" ? "251,191,36" : accent === "#f472b6" ? "244,114,182" : "168,85,247"},0.12)`,
          border: `1px solid ${accent}44`,
          color: accent,
          letterSpacing: "0.15em"
        }, children: [
          /* @__PURE__ */ jsx("span", { children: day.emoji }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Day ",
            day.day,
            " • ",
            day.displayDate
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif font-bold mb-3", style: {
          fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          color: day.isBirthday ? "#fde68a" : "#e9d5ff",
          textShadow: day.isBirthday ? "0 0 30px rgba(251,191,36,0.4)" : "none",
          lineHeight: 1.2
        }, children: day.title }),
        /* @__PURE__ */ jsx("p", { className: "font-script text-lg", style: {
          color: "#f472b6"
        }, children: day.subtitle })
      ] }),
      !isUnlocked ? /* @__PURE__ */ jsx(LockedScreen, { day }) : /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-3xl p-8 relative overflow-hidden", style: {
          background: "rgba(13,5,32,0.75)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${accent}44`,
          boxShadow: `0 4px 30px ${accent}18`
        }, children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 opacity-10 text-5xl pointer-events-none", children: "✦" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: accent
            }, children: "✦" }),
            /* @__PURE__ */ jsx("h2", { className: "font-serif text-lg", style: {
              color: "#e9d5ff"
            }, children: "Today's Poem" })
          ] }),
          /* @__PURE__ */ jsx("blockquote", { className: "font-body leading-relaxed mb-4", style: {
            color: "rgba(233,213,255,0.85)",
            fontSize: "1.1rem",
            lineHeight: "2",
            fontStyle: "italic",
            whiteSpace: "pre-line",
            borderLeft: `2px solid ${accent}44`,
            paddingLeft: "1.5rem"
          }, children: day.poem }),
          /* @__PURE__ */ jsxs("p", { className: "font-script text-sm text-right", style: {
            color: `${accent}aa`
          }, children: [
            "— ",
            day.poemAuthor
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-3xl p-8 relative overflow-hidden", style: {
          background: "rgba(13,5,32,0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(244,114,182,0.2)"
        }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: "#f472b6"
            }, children: "♡" }),
            /* @__PURE__ */ jsx("h2", { className: "font-serif text-lg", style: {
              color: "#e9d5ff"
            }, children: "A Memory" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden mb-6", style: {
            border: "1px solid rgba(168,85,247,0.25)",
            boxShadow: "0 0 40px rgba(168,85,247,0.12)"
          }, children: /* @__PURE__ */ jsx("img", { src: `/memories/day${day.day}.png`, alt: `Memory Day ${day.day}`, className: "w-full object-cover", style: {
            width: "100%",
            maxHeight: "750px"
          } }) }),
          /* @__PURE__ */ jsx("p", { className: "font-body leading-relaxed", style: {
            color: "rgba(233,213,255,0.75)",
            fontSize: "1rem",
            lineHeight: "1.85"
          }, children: day.memoryNote })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-3xl overflow-hidden", style: {
          border: `1px solid ${accent}44`
        }, children: [
          /* @__PURE__ */ jsxs("button", { className: "w-full p-6 flex items-center justify-between transition-all duration-300", style: {
            background: bonusOpen ? "rgba(168,85,247,0.12)" : "rgba(13,5,32,0.75)",
            backdropFilter: "blur(16px)"
          }, onClick: () => setBonusOpen((v) => !v), children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { style: {
                color: accent
              }, children: "🎁" }),
              /* @__PURE__ */ jsx("h2", { className: "font-serif text-lg", style: {
                color: "#e9d5ff"
              }, children: "Bonus Surprise" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-lg transition-transform duration-300", style: {
              color: accent,
              transform: bonusOpen ? "rotate(180deg)" : "rotate(0deg)"
            }, children: "▾" })
          ] }),
          bonusOpen && /* @__PURE__ */ jsxs("div", { className: "px-6 pb-6", style: {
            background: "rgba(13,5,32,0.75)",
            backdropFilter: "blur(16px)",
            animation: "fadeInUp 0.3s ease-out"
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "h-px w-full mb-5", style: {
              background: `linear-gradient(90deg, transparent, ${accent}44, transparent)`
            } }),
            /* @__PURE__ */ jsx("p", { className: "font-body leading-relaxed", style: {
              color: "rgba(233,213,255,0.75)",
              lineHeight: "1.85"
            }, children: day.bonusSurprise })
          ] })
        ] }),
        /* @__PURE__ */ jsx(ReactionPanel, { day: day.date }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pt-4", children: [
          prev ? /* @__PURE__ */ jsxs(Link, { to: "/birthday/$day", params: {
            day: prev.date
          }, className: "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-body text-sm group", style: {
            background: "rgba(168,85,247,0.08)",
            border: "1px solid rgba(168,85,247,0.2)",
            color: "#c084fc"
          }, onMouseEnter: (e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(168,85,247,0.15)";
          }, onMouseLeave: (e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(168,85,247,0.08)";
          }, children: [
            /* @__PURE__ */ jsx("span", { className: "group-hover:-translate-x-1 transition-transform", children: "←" }),
            /* @__PURE__ */ jsx("span", { children: prev.displayDate })
          ] }) : /* @__PURE__ */ jsx("div", {}),
          /* @__PURE__ */ jsx(Link, { to: "/birthday", className: "font-body text-xs uppercase tracking-widest transition-all duration-300", style: {
            color: "rgba(196,181,253,0.4)"
          }, onMouseEnter: (e) => {
            e.currentTarget.style.color = "#c084fc";
          }, onMouseLeave: (e) => {
            e.currentTarget.style.color = "rgba(196,181,253,0.4)";
          }, children: "All Days" }),
          next ? /* @__PURE__ */ jsxs(Link, { to: "/birthday/$day", params: {
            day: next.date
          }, className: "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-body text-sm group", style: {
            background: "rgba(168,85,247,0.08)",
            border: "1px solid rgba(168,85,247,0.2)",
            color: "#c084fc"
          }, onMouseEnter: (e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(168,85,247,0.15)";
          }, onMouseLeave: (e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(168,85,247,0.08)";
          }, children: [
            /* @__PURE__ */ jsx("span", { children: next.displayDate }),
            /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1 transition-transform", children: "→" })
          ] }) : /* @__PURE__ */ jsx("div", {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  DayPage as component
};
