import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { S as StarField, a as SparkleCanvas, N as Navbar, F as Footer } from "./Footer-BkOHYz-R.js";
import "@tanstack/react-router";
import "lucide-react";
const feelings = [
  {
    id: "clingy",
    emoji: "🥺",
    label: "Clingy",
    color: "from-pink-900/40 to-purple-900/40 border-pink-500/30",
    messages: [
      `I know. Come here. I've got you. You can be as clingy as you need to be — I'm not going anywhere. ♡`,
      `Being clingy just means you love deeply. And I love that about you more than you know.`,
      `Stay close. I want you close. There is nowhere else you need to be right now.`,
      `If clinging to me means you feel safe, then cling away. I am here, always.`,
      `You never have to apologize for needing me. I'm yours. Fully, always.`,
      `The world can wait. Right now I just want to hold you close.`,
      `Clingy is just another word for "I love you so much I can't get enough of you." That's a gift.`,
      `Come here. Let me wrap around you. Nothing else matters right now.`,
      `I love being the person you run to when you feel this way. I always will be.`,
      `Your heart is so full of love that it overflows. That's not too much — that's everything.`,
      `I'll be your anchor. Whenever you feel unsteady, hold on to me.`,
      `The fact that you want me close is the most beautiful thing.`,
      `Distance feels unbearable because what we have is real. I feel it too.`,
      `You are never, ever too much for me. You are exactly right. ♡`,
      `I want you right here, by my side. That's where you belong.`
    ]
  },
  {
    id: "missing",
    emoji: "💔",
    label: "Missing You",
    color: "from-rose-900/40 to-red-900/40 border-rose-500/30",
    messages: [
      `I miss you too. Even when I'm busy, part of me is always thinking about you.`,
      `The distance doesn't change how I feel. You are always with me, even when we're apart.`,
      `Missing you means our love is real. I feel it like a quiet ache I wouldn't trade for anything.`,
      `Every time I miss you, I count the moments until I can see you again.`,
      `You exist in everything around me. Missing you is just loving you from a distance.`,
      `I know this space between us hurts. But I promise it's temporary. We always find our way back.`,
      `You are the first thing I think of when I wake and the last before I sleep. That gap is filled with you.`,
      `Right now the stars feel closer than you. But I'm under the same sky, looking up, thinking of you.`,
      `Missing you is just proof that what we have is irreplaceable.`,
      `Send me a voice note. I want to hear your voice. I'll send one back full of love.`,
      `This feeling? It's yours. Keep it. It means I love you across every mile.`,
      `Come back to me soon. Every room feels emptier without your energy in it.`,
      `I'm here. Thinking of you. Sending you warmth across the distance.`,
      `The ache of missing you is a kind of love poem I carry everywhere.`,
      `You are my favourite place to return to. I'll always come back to you.`
    ]
  },
  {
    id: "sleepy",
    emoji: "😴",
    label: "Sleepy",
    color: "from-indigo-900/40 to-blue-900/40 border-indigo-500/30",
    messages: [
      `Go to sleep, love. You've worked hard. Rest now. I'll be here when you wake. ♡`,
      `Dream something beautiful tonight. Dream of fields of flowers and warm golden light.`,
      `Sleepy you is probably the most adorable thing in the world. Go rest.`,
      `Close your eyes. You're safe. You're loved. Tomorrow will still be here.`,
      `Sleep well, my love. You deserve the softest, most peaceful rest tonight.`,
      `I hope your dreams tonight are as beautiful as you are.`,
      `Put the phone down. Close your eyes. I'll still be loving you in the morning.`,
      `You've been so strong today. Let rest find you now.`,
      `Sleep is a gift. Accept it gracefully. I'll be thinking of you.`,
      `The night is gentle. Let it hold you while I can't.`,
      `Sweet dreams, love. Tomorrow begins a new day full of magic.`,
      `The stars are watching over you. Rest under their light tonight.`,
      `You look beautiful even when you're tired. Now please sleep.`,
      `Goodnight isn't goodbye — it's just "I'll love you even in your dreams."`,
      `I wish I could tuck you in. But for now: close your eyes, breathe, and know you are loved.`
    ]
  },
  {
    id: "emotional",
    emoji: "🥹",
    label: "Emotional",
    color: "from-purple-900/40 to-violet-900/40 border-purple-500/30",
    messages: [
      `It's okay. Feel everything. Your emotions are not weakness — they are depth.`,
      `Let it out. I'm here. You don't have to hold it together for me.`,
      `Being emotional means you're alive and awake to the beauty and weight of the world. That's rare.`,
      `You feel so deeply because you love so much. That is not a flaw. It is a superpower.`,
      `Cry if you need to. Laugh if you need to. Feel whatever needs to be felt. I'm with you.`,
      `The fact that you feel things this deeply makes you extraordinary.`,
      `Some days the heart is just too full. Let it overflow. I'll be the cup that holds you.`,
      `Your emotions are valid. All of them. Every single one. ♡`,
      `There is no shame in feeling. Only in pretending not to.`,
      `I see you. I hear you. Whatever you're feeling, you're not alone in it.`,
      `The most tender hearts are the strongest ones. Remember that.`,
      `You are allowed to have a soft day. Not every day needs to be warrior energy.`,
      `I love you even more in moments like this — raw, real, and beautifully you.`,
      `Breathe. It will pass. But while it's here, let me hold it with you.`,
      `You carry so much. Let me carry a little too.`
    ]
  },
  {
    id: "overthinking",
    emoji: "💭",
    label: "Overthinking",
    color: "from-cyan-900/40 to-teal-900/40 border-cyan-500/30",
    messages: [
      `Stop. Breathe. The worst version of the story isn't the real one. Come back to now.`,
      `Your mind is a storyteller. Right now it's writing fiction. The truth is simpler and kinder.`,
      `Three deep breaths. What's real right now? Only that. Let everything else go.`,
      `Most of the things we worry about never happen. Your imagination is too dramatic for its own good.`,
      `Overthinking is your mind trying to protect you. But it needs reminding: you are safe.`,
      `I know the spiral feels endless. But it has a floor. You'll land somewhere gentle.`,
      `The thought is not the reality. You are not your worst fears.`,
      `Stillness is on the other side of this. I promise.`,
      `Talk to me. Say it out loud. Sometimes the fear loses power when it meets the air.`,
      `You are smarter and more capable than your anxious thoughts believe.`,
      `Every time you've overthought before, you've survived. This time is no different.`,
      `Give your mind something beautiful to think about instead. Think of the best moment you've ever had.`,
      `The overthinking means you care. Now redirect that care inward — toward yourself.`,
      `This thought loop ends when you step outside it. Take a walk. Drink water. Come back to your body.`,
      `You are not your thoughts. You are the quiet one watching them. Watch, don't engage.`
    ]
  },
  {
    id: "proud",
    emoji: "🌟",
    label: "Proud of You",
    color: "from-yellow-900/40 to-amber-900/40 border-yellow-500/30",
    messages: [
      `I am so, so proud of you. Everything you've become — I watched it happen and it took my breath away.`,
      `Do you know how far you've come? Look back for just a moment. Look how much ground you've covered.`,
      `The person you are today is a miracle of resilience and love. I am in awe of you.`,
      `You did that. Whatever it was — you did it. And it matters.`,
      `I don't say it enough: I am endlessly proud of you. Not for what you achieve — for who you are.`,
      `The world is better because you are in it. I genuinely believe that.`,
      `Every little step you take is worth celebrating. Don't minimize your progress.`,
      `You inspire me. Every single day, you inspire me.`,
      `Keep going. You are building something beautiful — yourself.`,
      `The courage it takes to be you in this world? That is extraordinary.`,
      `I wish you could see yourself through my eyes for just one moment.`,
      `You deserve every good thing coming your way. You've earned it.`,
      `Be proud of yourself today. You've done enough. You are enough.`,
      `The quiet battles you fight every day and win — those count too.`,
      `You are everything I didn't know I needed to look up to.`
    ]
  },
  {
    id: "grateful",
    emoji: "🙏",
    label: "Grateful",
    color: "from-green-900/40 to-emerald-900/40 border-green-500/30",
    messages: [
      `Gratitude suits you. It lives in your eyes like a soft glow.`,
      `You are the thing I'm most grateful for. Every single day.`,
      `There's magic in noticing beauty. You do it naturally and it makes the world better.`,
      `Grateful hearts attract more to be grateful for. Keep that energy close.`,
      `Today I'm grateful for the fact that you exist. That's enough.`,
      `You have a gift for finding light in places others forget to look.`,
      `Gratitude isn't about having everything — it's about seeing everything you already have.`,
      `I love that about you — the way you appreciate. It's a rare quality.`,
      `The way you love and appreciate the small things? That's a form of wisdom.`,
      `Count your blessings tonight — but also count yourself among them.`,
      `You are both the giver and receiver of so much good. Don't forget that.`,
      `Gratitude is a love language too. Thank you for speaking it so beautifully.`,
      `I'm grateful for every moment that led me to knowing you.`,
      `The universe put you in my life and I'll be grateful for that every day.`,
      `Some gifts come quietly. You are mine.`
    ]
  },
  {
    id: "attention",
    emoji: "🫂",
    label: "Need Attention",
    color: "from-pink-900/40 to-rose-900/40 border-pink-400/30",
    messages: [
      `Hey. I see you. Come here. You have my full, undivided attention right now.`,
      `You're allowed to need this. You never have to earn my attention — it's already yours.`,
      `Tell me everything. I'm listening. I want to hear all of it.`,
      `I'm putting everything down. Right now it's just you and me.`,
      `You deserve to be someone's whole focus. I want to be that for you.`,
      `Needing attention is human. Don't ever feel guilty for it.`,
      `I'm here. What do you need? A conversation? A voice note? Just to feel seen?`,
      `Sometimes the most loving thing is to say "look at me." So — look at me. I'm here.`,
      `You will always have my attention. You don't need to compete for it.`,
      `You matter. Your needs matter. This moment — you — matters.`,
      `I love when you reach out. It means you trust me. That's everything.`,
      `Tell me what's on your mind. I'm not in a hurry. I'm not anywhere but here.`,
      `Your presence in my life deserves constant acknowledgment. Consider this yours.`,
      `Ask for what you need. I want to give it to you.`,
      `I never want you to feel invisible. You shine too brightly for that.`
    ]
  },
  {
    id: "happy",
    emoji: "☀️",
    label: "Happy",
    color: "from-amber-900/40 to-orange-900/40 border-amber-400/30",
    messages: [
      `Your happiness is my favourite sound. Keep that feeling close.`,
      `Happy looks incredible on you. Wear it forever.`,
      `The world is better when you're smiling. Scientific fact.`,
      `Whatever made you happy today — give it more space in your life.`,
      `I love this version of you. I love every version, but this one? Pure magic.`,
      `You deserve to feel this. Soak every drop of it in.`,
      `Your joy radiates. People around you can feel it, even if they don't know why.`,
      `A happy you is everything I hoped for when I fell for you.`,
      `Document this feeling. Write it down. Visit it when you need a reminder.`,
      `Nothing could make me happier right now than knowing you're happy.`,
      `You are the kind of happy that makes the room warmer.`,
      `Let this be your default setting. You deserve it.`,
      `The world absolutely needed your smile today. Thank you for giving it.`,
      `I love that you let yourself feel this fully. Don't hold back.`,
      `Your happiness is contagious. You've already passed it on to me.`
    ]
  },
  {
    id: "loved",
    emoji: "💞",
    label: "Feeling Loved",
    color: "from-fuchsia-900/40 to-purple-900/40 border-fuchsia-400/30",
    messages: [
      `Good. Because you are. Completely. Irreversibly. Immeasurably loved. ♡`,
      `Let that feeling settle in your chest and stay there. You've earned it.`,
      `You are loved in the quietest, most consistent, most real way possible.`,
      `Not just today, not just when it's convenient — always. You are loved, always.`,
      `This is how it should feel. Like warmth. Like home. Like enough.`,
      `Hold onto this. The love you feel right now is real. It doesn't disappear.`,
      `You are so deeply, completely adored. Remember that on your hard days too.`,
      `To be loved and to feel it — that's the whole dream. You have it.`,
      `The love you feel? It's only a fraction of what you deserve.`,
      `Someone out there thinks about you every single day and smiles. That's real.`,
      `You are known and loved. Fully. That is everything.`,
      `You are loved beyond your comprehension. I promise.`,
      `Rest in this. You don't have to chase it — it's already yours.`,
      `What a gift, to feel loved. What a gift, that you feel it from me.`,
      `You are safe here. You are wanted here. You are loved here.`
    ]
  }
];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function MessageModal({
  text,
  onClose
}) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: {
    background: "rgba(5,2,13,0.9)",
    backdropFilter: "blur(10px)"
  }, onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-md w-full rounded-3xl p-8 text-center", style: {
    background: "rgba(13,5,32,0.95)",
    border: "1px solid rgba(244,114,182,0.3)",
    boxShadow: "0 20px 60px rgba(244,114,182,0.15), 0 0 80px rgba(168,85,247,0.1)",
    animation: "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
  }, onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -top-1 left-1/4 right-1/4 h-0.5 rounded-full", style: {
      background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.6), transparent)"
    } }),
    /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "💌" }),
    /* @__PURE__ */ jsxs("p", { className: "font-body leading-relaxed", style: {
      color: "rgba(233,213,255,0.9)",
      fontSize: "1.1rem",
      lineHeight: "1.85",
      fontStyle: "italic"
    }, children: [
      '"',
      text,
      '"'
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-px w-12", style: {
        background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.4))"
      } }),
      /* @__PURE__ */ jsx("span", { className: "text-sm", style: {
        color: "#f472b6"
      }, children: "♡" }),
      /* @__PURE__ */ jsx("div", { className: "h-px w-12", style: {
        background: "linear-gradient(90deg, rgba(244,114,182,0.4), transparent)"
      } })
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: onClose, className: "mt-5 btn-magical text-sm py-2.5 px-6", children: "Close ♡" })
  ] }) });
}
function FeelingPage() {
  const [activeMessage, setActiveMessage] = useState(null);
  const [shuffledMessages, setShuffledMessages] = useState({});
  const openFeeling = useCallback((id) => {
    const feeling = feelings.find((f) => f.id === id);
    if (!feeling) return;
    const msgs = shuffledMessages[id] || shuffle(feeling.messages);
    setShuffledMessages((prev) => ({
      ...prev,
      [id]: msgs
    }));
    setActiveMessage(msgs[0]);
    const rotated = [...msgs.slice(1), msgs[0]];
    setShuffledMessages((prev) => ({
      ...prev,
      [id]: rotated
    }));
  }, [shuffledMessages]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen relative", style: {
    background: "radial-gradient(ellipse at 40% 20%, #1e0840 0%, #0d0520 50%, #05020d 100%)"
  }, children: [
    /* @__PURE__ */ jsx(StarField, {}),
    /* @__PURE__ */ jsx(SparkleCanvas, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    activeMessage && /* @__PURE__ */ jsx(MessageModal, { text: activeMessage, onClose: () => setActiveMessage(null) }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 pt-24 pb-16 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("p", { className: "font-script text-base mb-2", style: {
          color: "#f472b6"
        }, children: "Whatever you're feeling right now..." }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif font-bold mb-3", style: {
          fontSize: "clamp(2rem, 5vw, 3rem)",
          background: "linear-gradient(135deg, #c084fc, #f472b6, #fbbf24)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientShift 4s ease infinite"
        }, children: "I Am Feeling... ♡" }),
        /* @__PURE__ */ jsx("p", { className: "font-body max-w-md mx-auto", style: {
          color: "rgba(196,181,253,0.6)",
          lineHeight: "1.7"
        }, children: "Tap how you're feeling. Get a message made just for that moment." }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-2 mt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px w-16", style: {
            background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4))"
          } }),
          /* @__PURE__ */ jsx("span", { style: {
            color: "#a855f7"
          }, children: "✦" }),
          /* @__PURE__ */ jsx("div", { className: "h-px w-16", style: {
            background: "linear-gradient(90deg, rgba(168,85,247,0.4), transparent)"
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: feelings.map((feeling) => /* @__PURE__ */ jsxs("button", { onClick: () => openFeeling(feeling.id), className: `rounded-2xl p-5 text-center transition-all duration-300 group bg-gradient-to-br ${feeling.color}`, style: {
        backdropFilter: "blur(12px)",
        cursor: "pointer"
      }, onMouseEnter: (e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-4px) scale(1.02)";
        el.style.boxShadow = "0 12px 30px rgba(168,85,247,0.2)";
      }, onMouseLeave: (e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0) scale(1)";
        el.style.boxShadow = "none";
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl mb-2 transition-transform duration-300 group-hover:scale-110", style: {
          animation: "float 4s ease-in-out infinite"
        }, children: feeling.emoji }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm font-medium", style: {
          color: "rgba(233,213,255,0.85)"
        }, children: feeling.label }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity", style: {
          color: "rgba(244,114,182,0.7)"
        }, children: "Tap ♡" })
      ] }, feeling.id)) }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsx("p", { className: "font-script text-base", style: {
        color: "rgba(244,114,182,0.5)"
      }, children: "Each tap shuffles a new message, just for you ✨" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  FeelingPage as component
};
