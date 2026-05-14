import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import { useLocation, Link } from "@tanstack/react-router";
import { X, Menu } from "lucide-react";
function StarField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId;
    let t = 0;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.8,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2
    }));
    const lanterns = Array.from({ length: 8 }, (_, i) => ({
      x: (i + 1) * (window.innerWidth / 9),
      y: Math.random() * 200 + 100,
      size: Math.random() * 18 + 14,
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: Math.random() * 8e-3 + 5e-3,
      glowIntensity: Math.random() * 0.5 + 0.5
    }));
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.3 + 0.1,
      twinkleOffset: Math.random() * Math.PI * 2
    }));
    function drawLantern(lx, ly, size, glow, time, offset, speed) {
      const floatY = ly + Math.sin(time * speed + offset) * 12;
      const floatX = lx + Math.cos(time * speed * 0.7 + offset) * 5;
      const glowVal = glow * (0.7 + 0.3 * Math.sin(time * 2 + offset));
      const grad = ctx.createRadialGradient(
        floatX,
        floatY,
        0,
        floatX,
        floatY,
        size * 2.5
      );
      grad.addColorStop(0, `rgba(245,158,11,${glowVal * 0.35})`);
      grad.addColorStop(0.5, `rgba(245,158,11,${glowVal * 0.12})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(floatX, floatY, size * 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.save();
      ctx.shadowColor = `rgba(251,191,36,${glowVal * 0.8})`;
      ctx.shadowBlur = 15;
      const bodyGrad = ctx.createRadialGradient(
        floatX - size * 0.2,
        floatY - size * 0.2,
        0,
        floatX,
        floatY,
        size
      );
      bodyGrad.addColorStop(0, `rgba(254,243,199,${glowVal * 0.9})`);
      bodyGrad.addColorStop(0.4, `rgba(251,191,36,${glowVal * 0.8})`);
      bodyGrad.addColorStop(1, `rgba(180,83,9,${glowVal * 0.7})`);
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.ellipse(
        floatX,
        floatY,
        size * 0.55,
        size * 0.8,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.strokeStyle = `rgba(180,83,9,${glowVal * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(floatX, floatY - size * 0.8);
      ctx.lineTo(floatX, floatY - size * 1.3);
      ctx.stroke();
      ctx.restore();
    }
    function frame() {
      if (!canvas || !ctx) return;
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const tw = (Math.sin(t * s.speed * 60 + s.twinkleOffset) + 1) / 2;
        const alpha = s.opacity * (0.4 + 0.6 * tw);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,245,235,${alpha})`;
        ctx.shadowColor = `rgba(251,191,36,${alpha * 0.6})`;
        ctx.shadowBlur = s.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      lanterns.forEach((l) => {
        drawLantern(
          l.x,
          l.y,
          l.size,
          l.glowIntensity,
          t,
          l.floatOffset,
          l.floatSpeed
        );
      });
      particles.forEach((p) => {
        p.y -= p.speed * 0.5;
        p.x += Math.sin(t * 0.5 + p.twinkleOffset) * 0.3;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(t * 1.5 + p.twinkleOffset));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192,132,252,${alpha})`;
        ctx.shadowColor = `rgba(192,132,252,${alpha})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animId = requestAnimationFrame(frame);
    }
    frame();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "fixed inset-0 pointer-events-none",
      style: {
        zIndex: 0,
        opacity: 0.85
      }
    }
  );
}
const COLORS = ["#c084fc", "#f472b6", "#fbbf24", "#e879f9", "#a5f3fc", "#ffffff"];
function SparkleCanvas() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animRef = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    const spawnInterval = setInterval(() => {
      const count = 2;
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 0.8 - 0.2,
          life: 1,
          maxLife: Math.random() * 80 + 60,
          size: Math.random() * 3 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
      }
    }, 200);
    const frame = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.life > 0);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        const alpha = p.life / p.maxLife * 0.7;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3;
        const s = p.size;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - s);
        ctx.lineTo(p.x + s * 0.3, p.y - s * 0.3);
        ctx.lineTo(p.x + s, p.y);
        ctx.lineTo(p.x + s * 0.3, p.y + s * 0.3);
        ctx.lineTo(p.x, p.y + s);
        ctx.lineTo(p.x - s * 0.3, p.y + s * 0.3);
        ctx.lineTo(p.x - s, p.y);
        ctx.lineTo(p.x - s * 0.3, p.y - s * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
      animRef.current = requestAnimationFrame(frame);
    };
    animRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(spawnInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "fixed inset-0 pointer-events-none",
      style: { zIndex: 1, opacity: 0.5 }
    }
  );
}
const navLinks$1 = [
  { to: "/", label: "Home" },
  { to: "/birthday", label: "Birthday 2026" },
  { to: "/memories", label: "Memories" },
  { to: "/wish-jar", label: "Wish Jar" },
  { to: "/feeling", label: "I Am Feeling" }
];
function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: "fixed top-0 left-0 right-0 z-50",
      style: {
        background: "rgba(0,0,0,0)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(168,85,247,0.2)"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group", onClick: () => setOpen(false), children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", style: { animation: "twinkle 3s ease-in-out infinite" }, children: "✨" }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "font-script text-lg",
                style: {
                  background: "linear-gradient(135deg, #c084fc, #f472b6, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto"
                },
                children: "The Sky Kept Your Wishes"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xl", style: { animation: "twinkle 3s ease-in-out infinite 1.5s" }, children: "✨" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-1", children: navLinks$1.map((link) => {
            const active = location.pathname === link.to;
            return /* @__PURE__ */ jsx(
              Link,
              {
                to: link.to,
                className: "px-4 py-2 rounded-full text-sm transition-all duration-300 font-body",
                style: {
                  color: active ? "#fbbf24" : "rgba(255,255,255,0.75)",
                  background: active ? "rgba(168,85,247,0.15)" : "transparent",
                  border: active ? "1px solid rgba(168,85,247,0.3)" : "1px solid transparent",
                  textShadow: active ? "0 0 15px rgba(251,191,36,0.6)" : "none",
                  letterSpacing: "0.03em",
                  fontSize: "0.95rem"
                },
                onMouseEnter: (e) => {
                  if (!active) {
                    const el = e.currentTarget;
                    el.style.color = "#e9d5ff";
                    el.style.background = "rgba(168,85,247,0.1)";
                    el.style.border = "1px solid rgba(168,85,247,0.2)";
                    el.style.textShadow = "0 0 10px rgba(168,85,247,0.4)";
                  }
                },
                onMouseLeave: (e) => {
                  if (!active) {
                    const el = e.currentTarget;
                    el.style.color = "rgba(255,255,255,0.75)";
                    el.style.background = "transparent";
                    el.style.border = "1px solid transparent";
                    el.style.textShadow = "none";
                  }
                },
                children: link.label
              },
              link.to
            );
          }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "md:hidden p-2 rounded-lg text-purple-300 hover:text-purple-100 transition-colors",
              onClick: () => setOpen((v) => !v),
              "aria-label": "Toggle menu",
              children: open ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsx(
          "div",
          {
            className: "md:hidden",
            style: {
              background: "rgba(5,2,13,0.95)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(168,85,247,0.15)",
              padding: "1rem"
            },
            children: navLinks$1.map((link) => {
              const active = location.pathname === link.to;
              return /* @__PURE__ */ jsx(
                Link,
                {
                  to: link.to,
                  onClick: () => setOpen(false),
                  className: "block px-4 py-3 rounded-xl mb-1 transition-all duration-300 font-body text-center",
                  style: {
                    color: active ? "#fbbf24" : "rgba(255,255,255,0.8)",
                    background: active ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.05)",
                    border: active ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(168,85,247,0.1)",
                    letterSpacing: "0.05em"
                  },
                  children: link.label
                },
                link.to
              );
            })
          }
        )
      ]
    }
  );
}
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/birthday", label: "Birthday 2026" },
  { to: "/memories", label: "Memories" },
  { to: "/wish-jar", label: "Wish Jar" },
  { to: "/feeling", label: "I Am Feeling" }
];
function Footer() {
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: "relative z-10 mt-20 py-10 px-4",
      style: {
        background: "rgba(5,2,13,0.8)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(168,85,247,0.15)"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-0 left-1/4 right-1/4 h-px",
            style: { background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), rgba(244,114,182,0.5), transparent)" }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("span", { className: "font-script text-2xl", style: {
            background: "linear-gradient(135deg, #c084fc, #f472b6, #fbbf24)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }, children: "The Sky Kept Your Wishes ✨" }) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 mb-8", children: navLinks.map((link) => /* @__PURE__ */ jsx(
            Link,
            {
              to: link.to,
              className: "text-sm font-body transition-all duration-300",
              style: { color: "rgba(196,181,253,0.6)", letterSpacing: "0.05em" },
              onMouseEnter: (e) => {
                const el = e.currentTarget;
                el.style.color = "#c084fc";
                el.style.textShadow = "0 0 10px rgba(192,132,252,0.5)";
              },
              onMouseLeave: (e) => {
                const el = e.currentTarget;
                el.style.color = "rgba(196,181,253,0.6)";
                el.style.textShadow = "none";
              },
              children: link.label
            },
            link.to
          )) }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-3 mb-6 text-lg", children: ["✨", "♡", "🌙", "♡", "✨"].map((s, i) => /* @__PURE__ */ jsx(
            "span",
            {
              style: {
                color: i === 2 ? "#fbbf24" : i % 2 === 0 ? "#a855f7" : "#f472b6",
                opacity: 0.6,
                animation: `twinkle ${2 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              },
              children: s
            },
            i
          )) }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm", style: { color: "rgba(196,181,253,0.4)", letterSpacing: "0.08em" }, children: "All Rights Reserved — Aakash Singh" }),
          /* @__PURE__ */ jsx("p", { className: "font-script text-xs mt-1", style: { color: "rgba(196,181,253,0.3)" }, children: "Made with love, for love ♡" })
        ] })
      ]
    }
  );
}
export {
  Footer as F,
  Navbar as N,
  StarField as S,
  SparkleCanvas as a
};
