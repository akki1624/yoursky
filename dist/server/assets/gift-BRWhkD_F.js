import { jsxs, jsx } from "react/jsx-runtime";
import { S as StarField, a as SparkleCanvas, N as Navbar, F as Footer } from "./Footer-BkOHYz-R.js";
import { useState } from "react";
import "@tanstack/react-router";
import "lucide-react";
function EnvelopeReveal({ giftUrl = "#" }) {
  const [phase, setPhase] = useState("closed");
  const open = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => setPhase("open"), 1800);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative cursor-pointer select-none",
        style: { width: "280px", height: "200px", perspective: "800px" },
        onClick: open,
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "absolute inset-0 rounded-2xl",
              style: {
                background: "linear-gradient(135deg, #1a0535, #2e0d5e)",
                border: "1.5px solid rgba(251,191,36,0.4)",
                boxShadow: phase === "open" ? "0 20px 60px rgba(251,191,36,0.3), 0 0 100px rgba(168,85,247,0.2)" : "0 8px 30px rgba(168,85,247,0.2)",
                transition: "box-shadow 1s ease"
              },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute bottom-0 left-0 right-0 h-1/2 rounded-b-2xl overflow-hidden",
                    style: {
                      background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(251,191,36,0.1))"
                    },
                    children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "absolute inset-0",
                        style: {
                          background: "linear-gradient(135deg, transparent 49.5%, rgba(251,191,36,0.2) 50%, transparent 50.5%)"
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10",
                    style: {
                      background: "radial-gradient(circle, rgba(251,191,36,0.3), rgba(168,85,247,0.2))",
                      border: "1px solid rgba(251,191,36,0.4)",
                      boxShadow: "0 0 20px rgba(251,191,36,0.3)"
                    },
                    children: /* @__PURE__ */ jsx("span", { className: "text-xl", children: "💌" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute top-0 left-0 right-0 h-1/2",
                    style: {
                      background: "linear-gradient(135deg, rgba(168,85,247,0.15), transparent)",
                      clipPath: "polygon(0 0, 100% 0, 50% 60%)"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute top-0 left-0 right-0 rounded-t-2xl overflow-hidden",
              style: {
                height: "55%",
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                transform: phase === "opening" || phase === "open" ? "rotateX(-180deg)" : "rotateX(0deg)",
                transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: 5
              },
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute inset-0 rounded-t-2xl",
                  style: {
                    background: "linear-gradient(180deg, #2e0d5e, #1a0535)",
                    border: "1.5px solid rgba(251,191,36,0.3)",
                    borderBottom: "none",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    backfaceVisibility: "hidden"
                  }
                }
              )
            }
          ),
          phase === "closed" && /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute -bottom-8 left-0 right-0 text-center font-script text-sm pointer-events-none",
              style: {
                color: "rgba(251,191,36,0.7)",
                animation: "float 3s ease-in-out infinite"
              },
              children: "Click to open ♡"
            }
          )
        ]
      }
    ),
    phase === "open" && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mt-12 max-w-lg w-full rounded-3xl p-8",
        style: {
          background: "rgba(13,5,32,0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(251,191,36,0.25)",
          boxShadow: "0 16px 60px rgba(251,191,36,0.15), 0 0 80px rgba(168,85,247,0.1)",
          animation: "letterReveal 0.8s ease-out"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl", children: "💌" }),
            /* @__PURE__ */ jsx(
              "h2",
              {
                className: "font-serif text-2xl mt-3",
                style: { color: "#fde68a", textShadow: "0 0 20px rgba(251,191,36,0.4)" },
                children: "My Dearest Love,"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "font-body leading-relaxed mb-6",
              style: { color: "rgba(233,213,255,0.85)", fontSize: "1.05rem", lineHeight: "1.9" },
              children: [
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "[Replace this with your final letter. This is the most important part of the website — the letter she'll read on May 25th.]" }),
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "[Tell her everything you've wanted to say. What this year meant. What she means to you. What you're building together. Make it real, raw, and unforgettable.]" }),
                /* @__PURE__ */ jsx("p", { children: "[End with the gift reveal — a button that opens the second website you built together.]" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "text-right font-script text-lg mb-6", style: { color: "#f472b6" }, children: "— Aakash, forever yours ♡" }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: giftUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "btn-gold inline-block",
                style: { fontSize: "1rem", padding: "14px 36px" },
                children: "✨ Open Your Birthday Gift ✨"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "font-script text-sm mt-3", style: { color: "rgba(244,114,182,0.6)" }, children: "[Replace with the URL of your second website]" })
          ] })
        ]
      }
    )
  ] });
}
const GIFT_URL = "https://your-second-website.com";
function GiftPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen relative", style: {
    background: "radial-gradient(ellipse at 50% 0%, #2d1008 0%, #1a0535 30%, #0d0520 60%, #05020d 100%)"
  }, children: [
    /* @__PURE__ */ jsx(StarField, {}),
    /* @__PURE__ */ jsx(SparkleCanvas, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 pointer-events-none", style: {
      background: "radial-gradient(ellipse at 50% 20%, rgba(251,191,36,0.05) 0%, transparent 60%)",
      zIndex: 2
    } }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 pt-24 pb-16 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 mb-3", children: ["✦", "✧", "✦", "✧", "✦"].map((s, i) => /* @__PURE__ */ jsx("span", { style: {
          color: i % 2 === 0 ? "#fbbf24" : "rgba(251,191,36,0.3)",
          animation: `twinkle ${2 + i * 0.4}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`
        }, children: s }, i)) }),
        /* @__PURE__ */ jsx("p", { className: "font-script text-base mb-2", style: {
          color: "#fbbf24"
        }, children: "May 25 — The Final Day" }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif font-bold mb-3", style: {
          fontSize: "clamp(2rem, 5vw, 2.8rem)",
          background: "linear-gradient(135deg, #fde68a, #fbbf24, #f472b6)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientShift 4s ease infinite"
        }, children: "Here Is Your Gift ♡" }),
        /* @__PURE__ */ jsx("p", { className: "font-body max-w-md mx-auto", style: {
          color: "rgba(233,213,255,0.6)",
          lineHeight: "1.7"
        }, children: "Everything this journey was building toward — sealed inside this envelope, just for you." }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-3 mt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px w-20", style: {
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4))"
          } }),
          /* @__PURE__ */ jsx("span", { style: {
            color: "#fbbf24",
            fontSize: "1.1rem"
          }, children: "✦" }),
          /* @__PURE__ */ jsx("div", { className: "h-px w-20", style: {
            background: "linear-gradient(90deg, rgba(251,191,36,0.4), transparent)"
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(EnvelopeReveal, { giftUrl: GIFT_URL }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 rounded-3xl p-6 text-center", style: {
        background: "rgba(13,5,32,0.6)",
        border: "1px solid rgba(251,191,36,0.15)"
      }, children: [
        /* @__PURE__ */ jsxs("p", { className: "font-body italic", style: {
          color: "rgba(233,213,255,0.7)",
          lineHeight: "1.9",
          fontSize: "0.95rem"
        }, children: [
          '"This was never just a website,',
          /* @__PURE__ */ jsx("br", {}),
          "a countdown or a card —",
          /* @__PURE__ */ jsx("br", {}),
          "this was every night I missed you,",
          /* @__PURE__ */ jsx("br", {}),
          'every wish made from afar."'
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-script text-sm mt-3", style: {
          color: "#f472b6"
        }, children: "— with everything I have, Aakash ♡" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  GiftPage as component
};
