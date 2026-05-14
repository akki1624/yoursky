import { createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.35);
  const [minimized, setMinimized] = useState(true);
  const [currentSongName, setCurrentSongName] = useState("");
  const audioRef = useRef(null);
  const songs = [
    {
      name: "Pal Pal Dil Ke Paas",
      src: "/music/palpal.mp3"
    },
    {
      name: "Tu Tu Hai Vahi",
      src: "/music/tutuhai.mp3"
    },
    {
      name: "Chhu Kar Mere Mann Ko",
      src: "/music/chhukar.mp3"
    }
  ];
  const getRandomSong = () => {
    return songs[Math.floor(Math.random() * songs.length)];
  };
  const playRandomSong = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const randomSong = getRandomSong();
    audio.src = randomSong.src;
    audio.volume = volume;
    setCurrentSongName(randomSong.name);
    try {
      await audio.play();
      setPlaying(true);
    } catch {
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    };
    audio.addEventListener("timeupdate", update);
    return () => {
      audio.removeEventListener("timeupdate", update);
    };
  }, []);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    playRandomSong();
    audio.addEventListener("ended", playRandomSong);
    const handleFirstInteraction = () => {
      if (audio.paused) {
        playRandomSong();
      }
      window.removeEventListener("click", handleFirstInteraction);
    };
    window.addEventListener("click", handleFirstInteraction);
    return () => {
      audio.removeEventListener("ended", playRandomSong);
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, []);
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {
      });
      setPlaying(true);
    }
  };
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const val = parseFloat(e.target.value);
    audio.currentTime = val * audio.duration;
    setProgress(val);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed bottom-6 right-6 z-40 transition-all duration-500",
      style: {
        animation: "fadeInUp 0.6s ease-out"
      },
      children: [
        /* @__PURE__ */ jsx("audio", { ref: audioRef }),
        minimized ? /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setMinimized(false),
            className: "flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 group",
            style: {
              background: "rgba(13,5,32,0.9)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(168,85,247,0.3)",
              boxShadow: "0 4px 20px rgba(168,85,247,0.2)"
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-8 h-8 rounded-full vinyl ${playing ? "vinyl-spin" : ""} flex items-center justify-center`,
                  style: {
                    boxShadow: playing ? "0 0 12px rgba(168,85,247,0.5)" : "none",
                    minWidth: "32px"
                  },
                  children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: "🎵" })
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-xs font-body truncate max-w-[120px]",
                  style: {
                    color: "#c084fc"
                  },
                  children: currentSongName
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxs(
          "div",
          {
            className: "rounded-2xl p-4 w-72",
            style: {
              background: "rgba(8, 3, 20, 0.45)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(168,85,247,0.3)",
              boxShadow: "0 8px 40px rgba(168,85,247,0.2)"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `w-12 h-12 rounded-full vinyl flex items-center justify-center flex-shrink-0 ${playing ? "vinyl-spin" : ""}`,
                    style: {
                      boxShadow: playing ? "0 0 16px rgba(168,85,247,0.6)" : "0 0 8px rgba(168,85,247,0.2)"
                    },
                    children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-4 h-4 rounded-full",
                        style: {
                          background: "radial-gradient(circle, #c084fc, #7c3aed)"
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "font-serif text-sm truncate",
                      style: {
                        color: "#e9d5ff"
                      },
                      children: currentSongName
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "font-body text-xs truncate",
                      style: {
                        color: "rgba(196,181,253,0.5)"
                      },
                      children: "Playing in shuffle mode"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setMinimized(true),
                    className: "text-purple-400 hover:text-purple-200 transition-colors text-xs",
                    children: "−"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: "0",
                  max: "1",
                  step: "0.001",
                  value: progress,
                  onChange: handleSeek,
                  className: "w-full h-1 rounded-full appearance-none cursor-pointer",
                  style: {
                    background: `linear-gradient(90deg, #a855f7 ${progress * 100}%, rgba(168,85,247,0.2) ${progress * 100}%)`,
                    accentColor: "#a855f7"
                  }
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: togglePlay,
                    className: "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                    style: {
                      background: playing ? "rgba(168,85,247,0.3)" : "linear-gradient(135deg, #7c3aed, #ec4899)",
                      border: "1px solid rgba(168,85,247,0.4)",
                      boxShadow: playing ? "0 0 16px rgba(168,85,247,0.4)" : "none",
                      color: "white",
                      fontSize: "1rem"
                    },
                    children: playing ? "⏸" : "▶"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs", children: "🔊" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: "0",
                      max: "1",
                      step: "0.01",
                      value: volume,
                      onChange: (e) => setVolume(parseFloat(e.target.value)),
                      className: "w-16 h-1 rounded-full appearance-none cursor-pointer",
                      style: {
                        background: `linear-gradient(90deg, #a855f7 ${volume * 100}%, rgba(168,85,247,0.2) ${volume * 100}%)`,
                        accentColor: "#a855f7"
                      }
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
const Route$7 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Sky Kept Your Wishes ✨" },
      { name: "description", content: "An 11-day magical birthday journey — May 15 to May 25, 2026." },
      { name: "theme-color", content: "#0d0520" }
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Dancing+Script:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { style: { background: "#05020d" }, children: [
      children,
      /* @__PURE__ */ jsx(MusicPlayer, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$6 = () => import("./wish-jar-BZYLgNhA.js");
const Route$6 = createFileRoute("/wish-jar")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./memories-CCG_i7JI.js");
const Route$5 = createFileRoute("/memories")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./gift-BRWhkD_F.js");
const Route$4 = createFileRoute("/gift")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./feeling-Dnbgn7s-.js");
const Route$3 = createFileRoute("/feeling")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./birthday-BMZ3UBLw.js");
const Route$2 = createFileRoute("/birthday")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-BUfYtajl.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./birthday_._day-sqXQjNC2.js");
const Route = createFileRoute("/birthday_/$day")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WishJarRoute = Route$6.update({
  id: "/wish-jar",
  path: "/wish-jar",
  getParentRoute: () => Route$7
});
const MemoriesRoute = Route$5.update({
  id: "/memories",
  path: "/memories",
  getParentRoute: () => Route$7
});
const GiftRoute = Route$4.update({
  id: "/gift",
  path: "/gift",
  getParentRoute: () => Route$7
});
const FeelingRoute = Route$3.update({
  id: "/feeling",
  path: "/feeling",
  getParentRoute: () => Route$7
});
const BirthdayRoute = Route$2.update({
  id: "/birthday",
  path: "/birthday",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const BirthdayDayRoute = Route.update({
  id: "/birthday_/$day",
  path: "/birthday/$day",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  BirthdayRoute,
  FeelingRoute,
  GiftRoute,
  MemoriesRoute,
  WishJarRoute,
  BirthdayDayRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  router as r
};
