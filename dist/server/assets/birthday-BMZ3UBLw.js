import { jsxs, jsx } from "react/jsx-runtime";
import { S as StarField, a as SparkleCanvas, N as Navbar, F as Footer } from "./Footer-BkOHYz-R.js";
import { C as Countdown, T as TimelineCard } from "./Countdown-DdkBLmIE.js";
import { j as journey } from "./journey-Bo7QcI32.js";
import "react";
import "@tanstack/react-router";
import "lucide-react";
function BirthdayPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen night-bg-2 relative", children: [
    /* @__PURE__ */ jsx(StarField, {}),
    /* @__PURE__ */ jsx(SparkleCanvas, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 pt-24 pb-16 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("p", { className: "font-script text-base mb-2", style: {
          color: "#f472b6",
          textShadow: "0 0 10px rgba(244,114,182,0.4)"
        }, children: "From May 15 to May 25" }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif font-bold mb-3", style: {
          fontSize: "clamp(2rem, 5vw, 3rem)",
          background: "linear-gradient(135deg, #c084fc, #f472b6, #fbbf24)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientShift 4s ease infinite"
        }, children: "Birthday 2026 ✨" }),
        /* @__PURE__ */ jsx("p", { className: "font-body max-w-xl mx-auto", style: {
          color: "rgba(196,181,253,0.6)",
          lineHeight: "1.7"
        }, children: "Eleven days of magic, crafted with love. Each day unlocks a poem, a memory, a song, and a surprise — just for you." }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-3 mt-5", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px w-20", style: {
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4))"
          } }),
          /* @__PURE__ */ jsx("span", { style: {
            color: "#fbbf24",
            fontSize: "1.2rem"
          }, children: "✦" }),
          /* @__PURE__ */ jsx("div", { className: "h-px w-20", style: {
            background: "linear-gradient(90deg, rgba(251,191,36,0.4), transparent)"
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto mb-12", children: /* @__PURE__ */ jsx(Countdown, {}) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10", children: journey.map((day, i) => /* @__PURE__ */ jsx(TimelineCard, { day, index: i }, day.day)) }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-block rounded-2xl px-6 py-4", style: {
        background: "rgba(168,85,247,0.08)",
        border: "1px solid rgba(168,85,247,0.2)"
      }, children: [
        /* @__PURE__ */ jsx("p", { className: "font-script text-base", style: {
          color: "#f472b6"
        }, children: "Each card opens a full page of love ♡" }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm mt-1", style: {
          color: "rgba(196,181,253,0.5)"
        }, children: "Click any day to read its poem, memory, and surprise" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 mt-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full", style: {
            background: "#a855f7"
          } }),
          /* @__PURE__ */ jsx("span", { className: "font-body text-xs", style: {
            color: "rgba(196,181,253,0.5)"
          }, children: "Journey Days" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full", style: {
            background: "#fbbf24",
            boxShadow: "0 0 6px #fbbf24"
          } }),
          /* @__PURE__ */ jsx("span", { className: "font-body text-xs", style: {
            color: "rgba(196,181,253,0.5)"
          }, children: "Birthday (May 22)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full", style: {
            background: "#f472b6"
          } }),
          /* @__PURE__ */ jsx("span", { className: "font-body text-xs", style: {
            color: "rgba(196,181,253,0.5)"
          }, children: "Final Gift (May 25)" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  BirthdayPage as component
};
