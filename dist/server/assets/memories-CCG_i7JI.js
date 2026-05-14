import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { S as StarField, a as SparkleCanvas, N as Navbar, F as Footer } from "./Footer-BkOHYz-R.js";
import "@tanstack/react-router";
import "lucide-react";
function MemoryCard({ memory }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "polaroid cursor-pointer relative",
        style: {
          transform: `rotate(${memory.rotation}deg)`,
          background: memory.color,
          maxWidth: "180px",
          zIndex: open ? 20 : 1
        },
        onClick: () => setOpen(true),
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "w-full aspect-square flex items-center justify-center mb-2 overflow-hidden relative",
              style: {
                background: "linear-gradient(135deg, #1a0535, #2e0d5e)",
                minHeight: "120px"
              },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "text-center px-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-3xl mb-1", children: "📷" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-body", style: { color: "rgba(196,181,253,0.6)", fontSize: "0.65rem" }, children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: memory.imagePlaceholder,
                      alt: memory.title,
                      className: "w-full h-full object-cover"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300",
                    style: { background: "rgba(168,85,247,0.4)" },
                    children: /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-body", children: "Open ♡" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { style: { minHeight: "44px", padding: "0 2px" }, children: [
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "font-script text-center leading-tight",
                style: { color: "#1a0535", fontSize: "0.75rem" },
                children: memory.title
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-center font-body",
                style: { color: "rgba(30,10,60,0.5)", fontSize: "0.6rem", marginTop: "2px" },
                children: memory.date
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mt-1 justify-center", children: memory.tags.map((tag) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "text-xs px-1 rounded",
              style: { background: "rgba(168,85,247,0.15)", color: "#7c3aed", fontSize: "0.55rem" },
              children: [
                "#",
                tag
              ]
            },
            tag
          )) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(5,2,13,0.92)", backdropFilter: "blur(8px)" },
        onClick: () => setOpen(false),
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative max-w-lg w-full rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto",
            style: {
              background: "rgba(13,5,32,0.95)",
              border: "1px solid rgba(168,85,247,0.3)",
              boxShadow: "0 20px 60px rgba(168,85,247,0.3)",
              animation: "scaleIn 0.4s ease-out"
            },
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-full flex items-center justify-center py-12",
                  style: { background: "linear-gradient(135deg, #1a0535, #2e0d5e)", minHeight: "220px" },
                  children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-5xl mb-3", children: "📷" }),
                    /* @__PURE__ */ jsx("p", { className: "font-body text-sm", style: { color: "rgba(196,181,253,0.5)" }, children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: memory.imagePlaceholder,
                        alt: memory.title,
                        className: "w-full h-full object-cover"
                      }
                    ) })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl", style: { color: "#fde68a", textShadow: "0 0 15px rgba(251,191,36,0.3)" }, children: memory.title }),
                    /* @__PURE__ */ jsx("p", { className: "font-body text-sm", style: { color: "rgba(196,181,253,0.5)" }, children: memory.date })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setOpen(false),
                      className: "text-purple-400 hover:text-purple-200 transition-colors text-xl",
                      children: "✕"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "font-body leading-relaxed",
                    style: { color: "rgba(233,213,255,0.8)", fontSize: "1rem", lineHeight: "1.8" },
                    children: memory.note
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: memory.tags.map((tag) => /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: "text-xs px-3 py-1 rounded-full font-body",
                    style: { background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)" },
                    children: [
                      "#",
                      tag
                    ]
                  },
                  tag
                )) })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
const memories = [
  {
    id: 1,
    title: "Your Family",
    date: "6th February",
    note: `You were looking very happy in this picture with your family, I hope you stay happy and they understand you better.❤️`,
    imagePlaceholder: "/memories/memory1.png",
    rotation: -3,
    color: "#fce7f3",
    tags: ["first", "beginning"]
  },
  {
    id: 2,
    title: "Our First Laugh Together",
    date: "Write the date here",
    note: `[Replace with a memory about the first time you laughed together — what was the joke, the situation, or the silly moment that started it all? Laughter is the beginning of everything.]`,
    imagePlaceholder: "/memories/memory2.png",
    rotation: 2,
    color: "#ede9fe",
    tags: ["joy", "beginning"]
  },
  {
    id: 3,
    title: "That Magical Evening",
    date: "Write the date here",
    note: `[Replace with a memory of a perfect evening — a dinner, a walk, a quiet night under the stars. Describe the atmosphere, the conversation, the feeling of not wanting it to end.]`,
    imagePlaceholder: "Add your photo here",
    rotation: -2,
    color: "#fef9c3",
    tags: ["evening", "romantic"]
  },
  {
    id: 4,
    title: "When You Made Me Feel Safe",
    date: "Write the date here",
    note: `[Replace with a memory where she made you feel completely at home, understood, or protected. The moment you stopped being careful with your heart.]`,
    imagePlaceholder: "Add your photo here",
    rotation: 4,
    color: "#dcfce7",
    tags: ["safe", "love"]
  },
  {
    id: 5,
    title: "The Unexpected Moment",
    date: "Write the date here",
    note: `[Replace with something you didn't plan — a spontaneous adventure, an unplanned late-night conversation, a drive that turned into something beautiful.]`,
    imagePlaceholder: "Add your photo here",
    rotation: -4,
    color: "#fce7f3",
    tags: ["surprise", "spontaneous"]
  },
  {
    id: 6,
    title: "Favourite Ordinary Day",
    date: "Write the date here",
    note: `[Replace with your most treasured "nothing special" day — the kind where nothing happened but everything felt right. The everyday magic of being with her.]`,
    imagePlaceholder: "Add your photo here",
    rotation: 1,
    color: "#ede9fe",
    tags: ["ordinary", "perfect"]
  },
  {
    id: 7,
    title: "The Time You Surprised Me",
    date: "Write the date here",
    note: `[Replace with a memory where she did something unexpected that made your heart explode — a gesture, a gift, a word she said that stayed with you forever.]`,
    imagePlaceholder: "Add your photo here",
    rotation: -3,
    color: "#fef9c3",
    tags: ["surprise", "love"]
  },
  {
    id: 8,
    title: "Under the Same Sky",
    date: "Write the date here",
    note: `[Replace with a night sky memory — looking at stars together, a late walk, a balcony moment, or any night where the world felt completely yours.]`,
    imagePlaceholder: "Add your photo here",
    rotation: 3,
    color: "#dbeafe",
    tags: ["night", "stars"]
  },
  {
    id: 9,
    title: "The Hardest Day You Made Better",
    date: "Write the date here",
    note: `[Replace with a memory where she showed up for you on a hard day — what was happening, what she said or did, how she made the dark feel lighter.]`,
    imagePlaceholder: "Add your photo here",
    rotation: -1,
    color: "#fce7f3",
    tags: ["strength", "love"]
  },
  {
    id: 10,
    title: "Our Inside Joke",
    date: "Write the date here",
    note: `[Replace with the story behind your inside joke — the one that no one else gets but you two. Describe the moment it was born and why it still makes you smile.]`,
    imagePlaceholder: "Add your photo here",
    rotation: 4,
    color: "#dcfce7",
    tags: ["funny", "ours"]
  },
  {
    id: 11,
    title: "The Moment I Knew",
    date: "Write the date here",
    note: `[Replace with the exact moment you realized you were falling for her — what you were doing, where you were, what made it click. This is the most important memory.]`,
    imagePlaceholder: "Add your photo here",
    rotation: -2,
    color: "#fef9c3",
    tags: ["love", "knowing"]
  },
  {
    id: 12,
    title: "Dancing in the Kitchen",
    date: "Write the date here",
    note: `[Replace with a memory about music — a song that became yours, a moment of dancing anywhere, or the first time a song made you think of her.]`,
    imagePlaceholder: "Add your photo here",
    rotation: 2,
    color: "#ede9fe",
    tags: ["music", "dance"]
  },
  {
    id: 13,
    title: "Sleepy Conversations",
    date: "Write the date here",
    note: `[Replace with a late-night conversation memory — 2am talks, tired voices, half-asleep confessions, the things you only say when the world is quiet.]`,
    imagePlaceholder: "Add your photo here",
    rotation: -3,
    color: "#dbeafe",
    tags: ["night", "intimate"]
  },
  {
    id: 14,
    title: "The Prettiest Thing I've Seen",
    date: "Write the date here",
    note: `[Replace with a memory of seeing her at her most beautiful — not necessarily dressed up, maybe completely natural, laughing, sleepy, or simply being herself.]`,
    imagePlaceholder: "Add your photo here",
    rotation: 3,
    color: "#fce7f3",
    tags: ["beauty", "love"]
  },
  {
    id: 15,
    title: "A Dream for Us",
    date: "Write the date here",
    note: `[Replace with a memory of talking about the future — a trip you planned, a dream you shared, something you said you'd do together someday. A memory of hope.]`,
    imagePlaceholder: "Add your photo here",
    rotation: -4,
    color: "#fef9c3",
    tags: ["future", "dream"]
  }
];
function StringLight({
  count
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-3 justify-center mb-2 relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1.5 left-0 right-0 h-px", style: {
      background: "rgba(180,83,9,0.4)"
    } }),
    [...Array(count)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center", style: {
      animationDelay: `${i * 0.2}s`
    }, children: [
      /* @__PURE__ */ jsx("div", { style: {
        width: "1px",
        height: "10px",
        background: "rgba(180,83,9,0.5)"
      } }),
      /* @__PURE__ */ jsx("div", { className: "string-light", style: {
        animationDelay: `${i * 0.3}s`,
        transform: `scale(${0.7 + i % 3 * 0.15})`,
        opacity: 0.6 + i % 4 * 0.1
      } })
    ] }, i))
  ] });
}
function MemoriesPage() {
  const [filter, setFilter] = useState(null);
  const allTags = [...new Set(memories.flatMap((m) => m.tags))];
  const filtered = filter ? memories.filter((m) => m.tags.includes(filter)) : memories;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen relative", style: {
    background: "radial-gradient(ellipse at 20% 10%, #1a0535 0%, #0d0520 50%, #05020d 100%)"
  }, children: [
    /* @__PURE__ */ jsx(StarField, {}),
    /* @__PURE__ */ jsx(SparkleCanvas, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 pt-24 pb-16 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("p", { className: "font-script text-base mb-2", style: {
          color: "#f472b6"
        }, children: "A scrapbook of us" }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif font-bold mb-3", style: {
          fontSize: "clamp(2rem, 5vw, 3rem)",
          background: "linear-gradient(135deg, #c084fc, #f472b6)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }, children: "Our Memories ♡" }),
        /* @__PURE__ */ jsx("p", { className: "font-body max-w-lg mx-auto", style: {
          color: "rgba(196,181,253,0.6)"
        }, children: "Click any photo to open the full memory and story behind it." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsx(StringLight, { count: 15 }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setFilter(null), className: "px-3 py-1.5 rounded-full text-xs font-body transition-all duration-200", style: {
          background: !filter ? "rgba(168,85,247,0.25)" : "rgba(168,85,247,0.08)",
          border: !filter ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(168,85,247,0.2)",
          color: !filter ? "#c084fc" : "rgba(196,181,253,0.5)"
        }, children: "All" }),
        allTags.map((tag) => /* @__PURE__ */ jsxs("button", { onClick: () => setFilter(tag === filter ? null : tag), className: "px-3 py-1.5 rounded-full text-xs font-body transition-all duration-200", style: {
          background: filter === tag ? "rgba(168,85,247,0.25)" : "rgba(168,85,247,0.08)",
          border: filter === tag ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(168,85,247,0.2)",
          color: filter === tag ? "#c084fc" : "rgba(196,181,253,0.5)"
        }, children: [
          "#",
          tag
        ] }, tag))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative py-4", style: {
        background: "rgba(13,5,32,0.4)",
        borderRadius: "24px",
        border: "1px solid rgba(168,85,247,0.12)",
        padding: "2rem"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px", style: {
          background: "linear-gradient(90deg, transparent, rgba(180,83,9,0.4), transparent)"
        } }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4 justify-center items-start", children: filtered.map((memory) => /* @__PURE__ */ jsx(MemoryCard, { memory }, memory.id)) }),
        filtered.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "font-script text-lg", style: {
          color: "rgba(196,181,253,0.5)"
        }, children: "No memories with that tag yet..." }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mt-8", children: [
        /* @__PURE__ */ jsx("p", { className: "font-script text-base", style: {
          color: "rgba(244,114,182,0.6)"
        }, children: "15 memories and counting... ♡" }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm mt-1", style: {
          color: "rgba(196,181,253,0.4)"
        }, children: "Replace the placeholders with your real photos and stories" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  MemoriesPage as component
};
