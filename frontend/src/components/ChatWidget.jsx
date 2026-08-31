// import { useState, useRef, useEffect, useCallback } from "react";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const SUGGESTIONS = [
//   "What are his technical skills?",
//   "Tell me about his work experience",
//   "What projects has he built?",
//   "How can I get in touch?",
// ];

// function genSessionId() {
//   if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
//   return `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
// }

// const GREETING =
//   "Hey! I'm Abhinaba's portfolio assistant. Ask me about his skills, experience, or projects — I only talk shop about him.";

// export default function ChatWidget() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sessionId = useRef(genSessionId());
//   const listRef = useRef(null);
//   const inputRef = useRef(null);

//   // Auto-scroll to newest message
//   useEffect(() => {
//     if (listRef.current) {
//       listRef.current.scrollTop = listRef.current.scrollHeight;
//     }
//   }, [messages, loading, open]);

//   // Focus input when panel opens
//   useEffect(() => {
//     if (open) {
//       const t = setTimeout(() => inputRef.current?.focus(), 320);
//       return () => clearTimeout(t);
//     }
//   }, [open]);

//   const send = useCallback(
//     async (text) => {
//       const trimmed = text.trim();
//       if (!trimmed || loading) return;

//       const priorMessages = messages; // history BEFORE this new user message
//       setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
//       setInput("");
//       setLoading(true);

//       try {
//         const history = priorMessages
//           .filter((m) => m.role === "user" || m.role === "assistant")
//           .map((m) => ({ role: m.role, content: m.content }));

//         const res = await fetch(`${API_URL}/api/chat`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ message: trimmed, history, sessionId: sessionId.current }),
//         });

//         const data = await res.json();

//         if (res.ok && data.success) {
//           setMessages((prev) => [...prev, { role: "assistant", content: data.data.reply }]);
//         } else {
//           setMessages((prev) => [
//             ...prev,
//             {
//               role: "assistant",
//               content: data.message || "Sorry, something went wrong. Please try the contact form instead.",
//             },
//           ]);
//         }
//       } catch {
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: "Network error — please check your connection and try again." },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [messages, loading]
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     send(input);
//   };

//   const showSuggestions = messages.length === 1 && !loading;

//   return (
//     <>
//       <style>{`
//         .chat-fab {
//           position: fixed;
//           bottom: 24px; right: 24px;
//           width: 58px; height: 58px;
//           border-radius: 50%;
//           border: 1px solid var(--cyan-dim);
//           background: var(--bg2);
//           color: var(--cyan);
//           font-family: var(--font-mono);
//           font-size: 0.65rem;
//           letter-spacing: 0.05em;
//           display: flex; align-items: center; justify-content: center;
//           cursor: none;
//           z-index: 200;
//           transition: all 0.3s ease;
//           box-shadow: 0 4px 24px rgba(0,0,0,0.5), 0 0 0 0 rgba(0,229,255,0.4);
//         }
//         .chat-fab:hover {
//           border-color: var(--cyan);
//           box-shadow: var(--glow), 0 4px 24px rgba(0,0,0,0.5);
//           transform: translateY(-2px);
//         }
//         .chat-fab.open {
//           background: var(--cyan);
//           color: var(--bg);
//           border-color: var(--cyan);
//         }
//         .fab-ping {
//           position: absolute;
//           inset: 0;
//           border-radius: 50%;
//           border: 1px solid var(--cyan);
//           animation: fabPing 2.4s infinite ease-out;
//           pointer-events: none;
//         }
//         @keyframes fabPing {
//           0%   { transform: scale(1);   opacity: 0.6; }
//           100% { transform: scale(1.6); opacity: 0; }
//         }

//         .chat-panel {
//           position: fixed;
//           bottom: 96px; right: 24px;
//           width: 380px;
//           height: 560px;
//           max-height: calc(100vh - 130px);
//           background: linear-gradient(180deg, rgba(10,10,18,0.98) 0%, rgba(5,5,10,0.99) 100%);
//           border: 1px solid var(--gray2);
//           box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,229,255,0.06);
//           z-index: 199;
//           display: flex;
//           flex-direction: column;
//           overflow: hidden;
//           opacity: 0;
//           transform: translateY(16px) scale(0.97);
//           pointer-events: none;
//           transition: opacity 0.3s ease, transform 0.3s ease;
//         }
//         .chat-panel.open {
//           opacity: 1;
//           transform: translateY(0) scale(1);
//           pointer-events: auto;
//         }

//         .chat-header {
//           display: flex; align-items: center; justify-content: space-between;
//           padding: 16px 18px;
//           border-bottom: 1px solid var(--gray2);
//           background: rgba(0,229,255,0.03);
//           flex-shrink: 0;
//         }
//         .chat-header-left { display: flex; align-items: center; gap: 10px; }
//         .chat-dot {
//           width: 8px; height: 8px; border-radius: 50%;
//           background: #00ff88;
//           box-shadow: 0 0 8px #00ff88, 0 0 16px #00ff8850;
//           animation: pulse 2s infinite;
//           flex-shrink: 0;
//         }
//         .chat-title {
//           font-family: var(--font-mono);
//           font-size: 0.75rem;
//           letter-spacing: 0.15em;
//           color: var(--white);
//         }
//         .chat-subtitle {
//           font-family: var(--font-mono);
//           font-size: 0.62rem;
//           color: var(--gray);
//           margin-top: 2px;
//         }
//         .chat-close {
//           background: none; border: none;
//           color: var(--gray);
//           font-size: 0.9rem;
//           cursor: none;
//           padding: 4px 8px;
//           transition: color 0.2s;
//         }
//         .chat-close:hover { color: var(--magenta); }

//         .chat-messages {
//           flex: 1;
//           overflow-y: auto;
//           padding: 18px;
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }

//         .chat-bubble-row { display: flex; }
//         .chat-bubble-row.user { justify-content: flex-end; }
//         .chat-bubble-row.assistant { justify-content: flex-start; }

//         .chat-bubble {
//           max-width: 84%;
//           padding: 11px 14px;
//           font-size: 0.82rem;
//           line-height: 1.6;
//           font-family: var(--font-body);
//         }
//         .chat-bubble.user {
//           background: rgba(0,229,255,0.08);
//           border: 1px solid rgba(0,229,255,0.25);
//           color: var(--white);
//           border-radius: 12px 12px 2px 12px;
//         }
//         .chat-bubble.assistant {
//           background: rgba(255,255,255,0.03);
//           border: 1px solid var(--gray2);
//           color: #d8d8e2;
//           border-radius: 12px 12px 12px 2px;
//         }

//         .chat-bubble.typing {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           padding: 14px 16px;
//         }
//         .chat-bubble.typing .dot {
//           width: 5px; height: 5px; border-radius: 50%;
//           background: var(--cyan);
//           animation: typingDot 1.2s infinite ease-in-out;
//         }
//         .chat-bubble.typing .dot:nth-child(2) { animation-delay: 0.15s; }
//         .chat-bubble.typing .dot:nth-child(3) { animation-delay: 0.3s; }
//         @keyframes typingDot {
//           0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
//           30% { opacity: 1; transform: translateY(-3px); }
//         }

//         .chat-suggestions {
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//           margin-top: 4px;
//         }
//         .suggestion-chip {
//           text-align: left;
//           padding: 9px 12px;
//           font-family: var(--font-mono);
//           font-size: 0.7rem;
//           letter-spacing: 0.02em;
//           color: var(--cyan-dim);
//           background: rgba(0,229,255,0.03);
//           border: 1px solid rgba(0,229,255,0.15);
//           cursor: none;
//           transition: all 0.2s ease;
//         }
//         .suggestion-chip:hover {
//           border-color: var(--cyan);
//           background: rgba(0,229,255,0.08);
//           color: var(--cyan);
//         }

//         .chat-input-row {
//           display: flex;
//           gap: 8px;
//           padding: 14px;
//           border-top: 1px solid var(--gray2);
//           flex-shrink: 0;
//         }
//         .chat-input {
//           flex: 1;
//           padding: 10px 14px;
//           background: rgba(255,255,255,0.02);
//           border: 1px solid var(--gray2);
//           color: var(--white);
//           font-family: var(--font-body);
//           font-size: 0.82rem;
//           outline: none;
//           transition: border-color 0.2s;
//         }
//         .chat-input:focus { border-color: var(--cyan-dim); }
//         .chat-input::placeholder { color: var(--gray); }

//         .chat-send {
//           width: 40px; height: 40px;
//           flex-shrink: 0;
//           background: var(--cyan);
//           border: 1px solid var(--cyan);
//           color: var(--bg);
//           font-size: 0.9rem;
//           cursor: none;
//           transition: all 0.2s ease;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .chat-send:disabled {
//           background: transparent;
//           color: var(--gray2);
//           border-color: var(--gray2);
//           cursor: default;
//         }
//         .chat-send:not(:disabled):hover {
//           box-shadow: var(--glow);
//         }

//         @media (max-width: 480px) {
//           .chat-panel {
//             right: 12px; left: 12px;
//             bottom: 88px;
//             width: auto;
//             height: calc(100vh - 160px);
//           }
//           .chat-fab { bottom: 16px; right: 16px; }
//         }
//       `}</style>

//       {/* Floating toggle button */}
//       <button
//         className={`chat-fab${open ? " open" : ""}`}
//         onClick={() => setOpen((o) => !o)}
//         aria-label="Toggle AI chat assistant"
//       >
//         {open ? "✕" : (
//           <>
//             AI
//             <span className="fab-ping" />
//           </>
//         )}
//       </button>

//       {/* Chat panel */}
//       <div className={`chat-panel${open ? " open" : ""}`} role="dialog" aria-label="Portfolio AI assistant">
//         <div className="chat-header">
//           <div className="chat-header-left">
//             <span className="chat-dot" />
//             <div>
//               <div className="chat-title">PORTFOLIO AI</div>
//               <div className="chat-subtitle">Ask about Abhinaba's work</div>
//             </div>
//           </div>
//           <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
//         </div>

//         <div className="chat-messages" ref={listRef}>
//           {messages.map((m, i) => (
//             <div key={i} className={`chat-bubble-row ${m.role}`}>
//               <div className={`chat-bubble ${m.role}`}>{m.content}</div>
//             </div>
//           ))}

//           {loading && (
//             <div className="chat-bubble-row assistant">
//               <div className="chat-bubble assistant typing">
//                 <span className="dot" /><span className="dot" /><span className="dot" />
//               </div>
//             </div>
//           )}

//           {showSuggestions && (
//             <div className="chat-suggestions">
//               {SUGGESTIONS.map((s) => (
//                 <button key={s} className="suggestion-chip" onClick={() => send(s)}>
//                   {s}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         <form className="chat-input-row" onSubmit={handleSubmit}>
//           <input
//             ref={inputRef}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask about skills, experience, projects..."
//             maxLength={500}
//             className="chat-input"
//           />
//           <button type="submit" className="chat-send" disabled={loading || !input.trim()} aria-label="Send message">
//             ➤
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }


































import { useState, useRef, useEffect, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SUGGESTIONS = [
  "What are his technical skills?",
  "Tell me about his work experience",
  "What projects has he built?",
  "How can I get in touch?",
];

function genSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

const GREETING =
  "Hey! I'm Abhinaba's portfolio assistant. Ask me about his skills, experience, or projects — I only talk shop about him.";

/** Remove model reasoning / think blocks that leak into the reply */
function cleanReply(text) {
  if (!text) return "";
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<\/?think>/gi, "")
    .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "")
    .replace(/<\/?reasoning>/gi, "")
    // strip the numbered analysis the model is currently leaking
    .replace(
      /(?:^|\n)\s*(?:\d+\.\s*)?(?:Analyze User Input|Check Constraints|Extract Relevant Data|Extract Data|Draft Response(?:\s*\([^)]*\))?|Mental Refinement|Thinking Process|Here's a thinking process)[:\s]*[\s\S]*?(?=(?:\n\s*(?:\d+\.\s*)?(?:Analyze|Check|Extract|Draft|Final|Abhinaba|He |His )|$))/gi,
      "\n"
    )
    .replace(/(?:^|\n)\s*-\s*(?:Role|Dates?|Responsibilities?):[\s\S]*?(?=\n\s*(?:Abhinaba|He |His |\d+\.|$))/gi, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Very light markdown → React nodes (no extra library needed) */
function renderMarkdown(text) {
  const cleaned = cleanReply(text);
  if (!cleaned) return null;

  // split into paragraphs / list blocks
  const blocks = cleaned.split(/\n{2,}/);

  return blocks.map((block, bi) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);

    // bullet list
    if (lines.every((l) => /^[-•*]\s+/.test(l) || /^\d+\.\s+/.test(l))) {
      return (
        <ul key={bi} className="md-list">
          {lines.map((l, li) => (
            <li key={li}>{inlineFormat(l.replace(/^[-•*]\s+/, "").replace(/^\d+\.\s+/, ""))}</li>
          ))}
        </ul>
      );
    }

    // normal paragraph (preserve single newlines as <br>)
    return (
      <p key={bi} className="md-p">
        {lines.map((line, li) => (
          <span key={li}>
            {inlineFormat(line)}
            {li < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

/** Bold + italic */
function inlineFormat(text) {
  // **bold** and *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sessionId = useRef(genSessionId());
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  const send = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const priorMessages = messages;
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setInput("");
      setLoading(true);

      try {
        const history = priorMessages
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history, sessionId: sessionId.current }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setMessages((prev) => [...prev, { role: "assistant", content: data.data.reply }]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.message || "Sorry, something went wrong. Please try the contact form instead.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Network error — please check your connection and try again." },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      <style>{`
        .chat-fab {
          position: fixed;
          bottom: 24px; right: 24px;
          width: 58px; height: 58px;
          border-radius: 50%;
          border: 1px solid var(--cyan-dim);
          background: var(--bg2);
          color: var(--cyan);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          display: flex; align-items: center; justify-content: center;
          cursor: none;
          z-index: 200;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5), 0 0 0 0 rgba(0,229,255,0.4);
        }
        .chat-fab:hover {
          border-color: var(--cyan);
          box-shadow: var(--glow), 0 4px 24px rgba(0,0,0,0.5);
          transform: translateY(-2px);
        }
        .chat-fab.open {
          background: var(--cyan);
          color: var(--bg);
          border-color: var(--cyan);
        }
        .fab-ping {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid var(--cyan);
          animation: fabPing 2.4s infinite ease-out;
          pointer-events: none;
        }
        @keyframes fabPing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .chat-panel {
          position: fixed;
          bottom: 96px; right: 24px;
          width: 380px;
          height: 560px;
          max-height: calc(100vh - 130px);
          background: linear-gradient(180deg, rgba(10,10,18,0.98) 0%, rgba(5,5,10,0.99) 100%);
          border: 1px solid var(--gray2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,229,255,0.06);
          z-index: 199;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          transform: translateY(16px) scale(0.97);
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .chat-panel.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .chat-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 18px;
          border-bottom: 1px solid var(--gray2);
          background: rgba(0,229,255,0.03);
          flex-shrink: 0;
        }
        .chat-header-left { display: flex; align-items: center; gap: 10px; }
        .chat-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #00ff88;
          box-shadow: 0 0 8px #00ff88, 0 0 16px #00ff8850;
          animation: pulse 2s infinite;
          flex-shrink: 0;
        }
        .chat-title {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: var(--white);
        }
        .chat-subtitle {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--gray);
          margin-top: 2px;
        }
        .chat-close {
          background: none; border: none;
          color: var(--gray);
          font-size: 0.9rem;
          cursor: none;
          padding: 4px 8px;
          transition: color 0.2s;
        }
        .chat-close:hover { color: var(--magenta); }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chat-bubble-row { display: flex; }
        .chat-bubble-row.user { justify-content: flex-end; }
        .chat-bubble-row.assistant { justify-content: flex-start; }

        .chat-bubble {
          max-width: 84%;
          padding: 11px 14px;
          font-size: 0.82rem;
          line-height: 1.55;
          font-family: var(--font-body);
        }
        .chat-bubble.user {
          background: rgba(0,229,255,0.08);
          border: 1px solid rgba(0,229,255,0.25);
          color: var(--white);
          border-radius: 12px 12px 2px 12px;
          white-space: pre-wrap;
        }
        .chat-bubble.assistant {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--gray2);
          color: #d8d8e2;
          border-radius: 12px 12px 12px 2px;
        }

        /* markdown helpers inside assistant bubbles */
        .chat-bubble.assistant .md-p {
          margin: 0 0 0.55em 0;
        }
        .chat-bubble.assistant .md-p:last-child {
          margin-bottom: 0;
        }
        .chat-bubble.assistant .md-list {
          margin: 0.3em 0 0.55em 0;
          padding-left: 1.15em;
        }
        .chat-bubble.assistant .md-list li {
          margin-bottom: 0.25em;
        }
        .chat-bubble.assistant strong {
          color: #e8e8f0;
          font-weight: 600;
        }
        .chat-bubble.assistant em {
          color: var(--cyan-dim);
          font-style: italic;
        }

        .chat-bubble.typing {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 14px 16px;
        }
        .chat-bubble.typing .dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--cyan);
          animation: typingDot 1.2s infinite ease-in-out;
        }
        .chat-bubble.typing .dot:nth-child(2) { animation-delay: 0.15s; }
        .chat-bubble.typing .dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }

        .chat-suggestions {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 4px;
        }
        .suggestion-chip {
          text-align: left;
          padding: 9px 12px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.02em;
          color: var(--cyan-dim);
          background: rgba(0,229,255,0.03);
          border: 1px solid rgba(0,229,255,0.15);
          cursor: none;
          transition: all 0.2s ease;
        }
        .suggestion-chip:hover {
          border-color: var(--cyan);
          background: rgba(0,229,255,0.08);
          color: var(--cyan);
        }

        .chat-input-row {
          display: flex;
          gap: 8px;
          padding: 14px;
          border-top: 1px solid var(--gray2);
          flex-shrink: 0;
        }
        .chat-input {
          flex: 1;
          padding: 10px 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--gray2);
          color: var(--white);
          font-family: var(--font-body);
          font-size: 0.82rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .chat-input:focus { border-color: var(--cyan-dim); }
        .chat-input::placeholder { color: var(--gray); }

        .chat-send {
          width: 40px; height: 40px;
          flex-shrink: 0;
          background: var(--cyan);
          border: 1px solid var(--cyan);
          color: var(--bg);
          font-size: 0.9rem;
          cursor: none;
          transition: all 0.2s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .chat-send:disabled {
          background: transparent;
          color: var(--gray2);
          border-color: var(--gray2);
          cursor: default;
        }
        .chat-send:not(:disabled):hover {
          box-shadow: var(--glow);
        }

        @media (max-width: 480px) {
          .chat-panel {
            right: 12px; left: 12px;
            bottom: 88px;
            width: auto;
            height: calc(100vh - 160px);
          }
          .chat-fab { bottom: 16px; right: 16px; }
        }
      `}</style>

      <button
        className={`chat-fab${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle AI chat assistant"
      >
        {open ? "✕" : (
          <>
            AI
            <span className="fab-ping" />
          </>
        )}
      </button>

      <div className={`chat-panel${open ? " open" : ""}`} role="dialog" aria-label="Portfolio AI assistant">
        <div className="chat-header">
          <div className="chat-header-left">
            <span className="chat-dot" />
            <div>
              <div className="chat-title">PORTFOLIO AI</div>
              <div className="chat-subtitle">Ask about Abhinaba's work</div>
            </div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </div>

        <div className="chat-messages" ref={listRef}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble-row ${m.role}`}>
              <div className={`chat-bubble ${m.role}`}>
                {m.role === "assistant" ? renderMarkdown(m.content) : m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-bubble-row assistant">
              <div className="chat-bubble assistant typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            </div>
          )}

          {showSuggestions && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="suggestion-chip" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about skills, experience, projects..."
            maxLength={500}
            className="chat-input"
          />
          <button type="submit" className="chat-send" disabled={loading || !input.trim()} aria-label="Send message">
            ➤
          </button>
        </form>
      </div>
    </>
  );
}