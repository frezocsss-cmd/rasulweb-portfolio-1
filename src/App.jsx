import { useEffect, useRef, useState } from "react";

/* ---------- Scroll Reveal ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Animated Counter ---------- */
function CountUp({ end, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(end);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ---------- Typewriter ---------- */
function Typewriter({ words }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let delay = deleting ? 40 : 90;
    if (!deleting && text === word) delay = 1800;

    const t = setTimeout(() => {
      if (!deleting) {
        if (text === word) setDeleting(true);
        else setText(word.slice(0, text.length + 1));
      } else {
        if (text === "") {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        } else setText(word.slice(0, text.length - 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className="font-mono">
      <span className="text-teal-400">&gt; </span>
      {text}
      <span className="animate-blink text-[#46ecd5]">▍</span>
    </span>
  );
}

/* ---------- WMO Weather Code Map ---------- */
function wmoInfo(code) {
  if (code === 0) return { desc: "Ochiq osmon", icon: "☀️" };
  if (code <= 2) return { desc: "Qisman bulutli", icon: "🌤️" };
  if (code === 3) return { desc: "Bulutli", icon: "☁️" };
  if (code <= 48) return { desc: "Tuman", icon: "🌫️" };
  if (code <= 57) return { desc: "Shimol yomg'iri", icon: "🌦️" };
  if (code <= 67) return { desc: "Yomg'ir", icon: "🌧️" };
  if (code <= 77) return { desc: "Qor", icon: "🌨️" };
  if (code <= 82) return { desc: "Jala yomg'ir", icon: "🌧️" };
  if (code <= 86) return { desc: "Qor yomishi", icon: "❄️" };
  return { desc: "Chaqmoq chaqmoq", icon: "⛈️" };
}

/* ---------- Live API: Weather Card ---------- */
function WeatherCard({ darkMode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadWeather = () => {
    setLoading(true);
    setError(false);
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.311&longitude=69.2797&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=Asia%2FTashkent"
    )
      .then((r) => r.json())
      .then((d) => {
        if (!d.current) throw new Error("bad");
        setData(d.current);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadWeather();
  }, []);

  const info = data ? wmoInfo(data.weather_code) : null;

  return (
    <div
      className={`rounded-2xl border p-5 backdrop-blur-xl flex flex-col ${
        darkMode ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#00a5ef]/15 border border-[#00a5ef]/30 flex items-center justify-center text-lg">
            🌤️
          </div>
          <div>
            <h3 className="font-bold text-sm">Ob-havo</h3>
            <span className={`text-[10px] font-mono ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
              LIVE API • Toshkent
            </span>
          </div>
        </div>
        <button
          onClick={loadWeather}
          title="Yangilash"
          className={`p-2 rounded-full border text-xs transition-all duration-300 hover:rotate-180 ${
            darkMode
              ? "border-white/10 bg-white/5 hover:border-teal-500/40 text-teal-400"
              : "border-slate-200 bg-slate-100 hover:border-teal-500 text-teal-600"
          }`}
        >
          ⟳
        </button>
      </div>

      {loading && (
        <div className="space-y-3 py-4">
          <div className={`h-12 w-24 rounded-xl animate-pulse ${darkMode ? "bg-white/10" : "bg-slate-200"}`} />
          <div className={`h-4 w-full rounded animate-pulse ${darkMode ? "bg-white/5" : "bg-slate-100"}`} />
          <div className={`h-4 w-3/4 rounded animate-pulse ${darkMode ? "bg-white/5" : "bg-slate-100"}`} />
        </div>
      )}

      {error && !loading && (
        <div className="py-6 text-center">
          <p className="text-sm text-rose-400 mb-2">Ob-havo API javob bermadi</p>
          <button onClick={loadWeather} className="text-xs text-teal-400 hover:text-teal-300 underline">
            Qayta urinish
          </button>
        </div>
      )}

      {data && !loading && !error && (
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{info.icon}</span>
            <div>
              <div className="text-3xl font-bold tracking-tight">{Math.round(data.temperature_2m)}°C</div>
              <div className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"}`}>{info.desc}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { label: "His qilinadi", value: `${Math.round(data.apparent_temperature)}°` },
              { label: "Namlik", value: `${data.relative_humidity_2m}%` },
              { label: "Shamol", value: `${Math.round(data.wind_speed_10m)} km/h` },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl px-2 py-2.5 border ${
                  darkMode ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="text-xs sm:text-sm font-bold">{item.value}</div>
                <div className={`text-[9px] mt-0.5 ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Live API: Currency Converter Card ---------- */
function CurrencyCard({ darkMode }) {
  const currencies = ["USD", "EUR", "GBP", "RUB", "UZS", "KZT"];
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("UZS");
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetch(`https://open.er-api.com/v6/latest/${from}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.result !== "success" || !d.rates) throw new Error("bad");
        if (!cancelled) setRates(d.rates);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [from, retryKey]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const converted =
    rates && !isNaN(parseFloat(amount)) ? parseFloat(amount) * rates[to] : null;

  const selectCls = `w-full rounded-xl border px-3 py-2.5 text-sm font-semibold outline-none transition-all duration-300 focus:border-teal-500 appearance-none cursor-pointer ${
    darkMode
      ? "bg-white/[0.05] border-white/10 text-white"
      : "bg-white border-slate-200 text-slate-900"
  }`;

  return (
    <div
      className={`rounded-2xl border p-5 backdrop-blur-xl flex flex-col ${
        darkMode ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#00d3bd]/15 border border-[#00d3bd]/30 flex items-center justify-center text-lg">
            💱
          </div>
          <div>
            <h3 className="font-bold text-sm">Valyuta Konverter</h3>
            <span className={`text-[10px] font-mono ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
              LIVE API • ER-API
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="py-6 text-center">
          <p className="text-sm text-rose-400 mb-2">Valyuta API javob bermadi</p>
          <button onClick={() => setRetryKey((k) => k + 1)} className="text-xs text-teal-400 hover:text-teal-300 underline">
            Qayta urinish
          </button>
        </div>
      )}

      {!error && (
        <>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Summa"
            className={`w-full rounded-xl border px-4 py-3 text-lg font-bold outline-none mb-3 transition-all duration-300 focus:border-teal-500 ${
              darkMode
                ? "bg-white/[0.05] border-white/10 text-white placeholder:text-slate-600"
                : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            }`}
          />

          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center mb-3">
            <select value={from} onChange={(e) => setFrom(e.target.value)} className={selectCls}>
              {currencies.map((c) => (
                <option key={c} value={c} className="text-slate-900">
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={swap}
              title="Almashtirish"
              className={`p-2 rounded-full border text-sm transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? "border-white/10 bg-white/5 hover:border-teal-500/40 text-teal-400"
                  : "border-slate-200 bg-slate-100 hover:border-teal-500 text-teal-600"
              }`}
            >
              ⇄
            </button>
            <select value={to} onChange={(e) => setTo(e.target.value)} className={selectCls}>
              {currencies.map((c) => (
                <option key={c} value={c} className="text-slate-900">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`mt-auto rounded-xl border px-4 py-3.5 ${
              darkMode ? "border-teal-500/20 bg-teal-500/[0.08]" : "border-teal-300 bg-teal-50"
            }`}
          >
            {loading ? (
              <div className={`h-6 w-32 rounded animate-pulse ${darkMode ? "bg-white/10" : "bg-slate-200"}`} />
            ) : converted !== null ? (
              <>
                <div className="text-xl font-bold text-teal-500 tracking-tight">
                  {converted.toLocaleString("ru-RU", { maximumFractionDigits: 2 })}{" "}
                  <span className="text-sm">{to}</span>
                </div>
                <div className={`text-[10px] mt-1 ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
                  Kurs: 1 {from} = {rates ? rates[to].toFixed(2) : "..."} {to}
                </div>
              </>
            ) : (
              <span className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
                Summani kiriting...
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Live API: Scientific Calculator Card ---------- */
function CalculatorCard({ darkMode }) {
  const [expr, setExpr] = useState("");
  const [justEvaluated, setJustEvaluated] = useState(false);

  const btnCls = (accent = false) =>
    `rounded-xl py-2.5 text-sm font-semibold transition-all duration-150 active:scale-95 border ${
      accent
        ? "bg-teal-500 hover:bg-teal-400 text-white border-teal-400 shadow-lg shadow-teal-500/25"
        : darkMode
          ? "bg-white/[0.05] hover:bg-white/15 border-white/10 text-slate-200"
          : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
    }`;

  const sciBtnCls = `${darkMode ? "bg-[#00a5ef]/10 hover:bg-[#00a5ef]/25 border-[#00a5ef]/20 text-[#38bdf8]" : "bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-600"} rounded-xl py-2 text-[11px] font-mono font-bold transition-all duration-150 active:scale-95 border`;

  const press = (v) => {
    if (justEvaluated && /[0-9.]/.test(v)) {
      setExpr(v);
      setJustEvaluated(false);
      return;
    }
    setJustEvaluated(false);
    if (v === "^2") setExpr((p) => p + "^2");
    else setExpr((p) => p + v);
  };

  const clear = () => {
    setExpr("");
    setJustEvaluated(false);
  };

  const backspace = () => {
    setExpr((p) => p.slice(0, -1));
    setJustEvaluated(false);
  };

  const evaluate = () => {
    try {
      let js = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/π/g, "(Math.PI)")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/\bsin\(/g, "Math.sin(")
        .replace(/\bcos\(/g, "Math.cos(")
        .replace(/\btan\(/g, "Math.tan(")
        .replace(/\blog\(/g, "Math.log10(")
        .replace(/\bln\(/g, "Math.log(")
        .replace(/\babs\(/g, "Math.abs(")
        .replace(/\^/g, "**");

      const stripped = js.replace(/Math\.(sqrt|sin|cos|tan|log10|log|abs|PI)/g, "");
      if (!/^[0-9+\-*/().\s]*$/.test(stripped)) throw new Error("invalid");

      const val = Function(`"use strict"; return (${js})`)();
      if (typeof val !== "number" || isNaN(val) || !isFinite(val)) throw new Error("nan");
      setExpr(String(parseFloat(val.toFixed(8))));
      setJustEvaluated(true);
    } catch {
      setExpr("");
      setJustEvaluated(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border p-5 backdrop-blur-xl flex flex-col ${
        darkMode ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white shadow-lg"
      }`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-[#46ecd5]/15 border border-[#46ecd5]/30 flex items-center justify-center text-lg">
          🖩
        </div>
        <div>
          <h3 className="font-bold text-sm">Kalkulyator</h3>
          <span className={`text-[10px] font-mono ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
            SCIENTIFIC • REAL-TIME
          </span>
        </div>
      </div>

      <div
        className={`rounded-xl border px-4 py-3 mb-3 text-right overflow-x-auto ${
          darkMode ? "border-teal-500/20 bg-black/40" : "border-slate-200 bg-slate-900"
        }`}
      >
        <div className="text-teal-400/70 text-[10px] font-mono h-4 truncate">
          {expr || "\u00A0"}
        </div>
        <div className="text-xl font-bold font-mono text-[#46ecd5] truncate">
          {expr || "0"}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        {["sin(", "cos(", "tan(", "√(", "^2"].map((fn) => (
          <button key={fn} onClick={() => press(fn)} className={sciBtnCls}>
            {fn.replace("(", "")}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        {[
          { v: "log(", l: "log" },
          { v: "ln(", l: "ln" },
          { v: "π", l: "π" },
          { v: "abs(", l: "abs" },
          { v: "(", l: "( )" },
        ].map((b) => (
          <button key={b.v} onClick={() => press(b.v)} className={sciBtnCls}>
            {b.l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        <button onClick={clear} className={`${btnCls()} !bg-rose-500/15 !border-rose-500/30 !text-rose-400 hover:!bg-rose-500/30`}>
          C
        </button>
        <button onClick={backspace} className={btnCls()}>
          ⌫
        </button>
        <button onClick={() => press("(")} className={btnCls()}>
          (
        </button>
        <button onClick={() => press(")")} className={btnCls()}>
          )
        </button>

        <button onClick={() => press("7")} className={btnCls()}>7</button>
        <button onClick={() => press("8")} className={btnCls()}>8</button>
        <button onClick={() => press("9")} className={btnCls()}>9</button>
        <button onClick={() => press("÷")} className={`${btnCls()} !text-teal-400 font-bold`}>÷</button>

        <button onClick={() => press("4")} className={btnCls()}>4</button>
        <button onClick={() => press("5")} className={btnCls()}>5</button>
        <button onClick={() => press("6")} className={btnCls()}>6</button>
        <button onClick={() => press("×")} className={`${btnCls()} !text-teal-400 font-bold`}>×</button>

        <button onClick={() => press("1")} className={btnCls()}>1</button>
        <button onClick={() => press("2")} className={btnCls()}>2</button>
        <button onClick={() => press("3")} className={btnCls()}>3</button>
        <button onClick={() => press("−")} className={`${btnCls()} !text-teal-400 font-bold`}>−</button>

        <button onClick={() => press("0")} className={btnCls()}>0</button>
        <button onClick={() => press(".")} className={btnCls()}>.</button>
        <button onClick={evaluate} className={btnCls(true)}> =</button>
        <button onClick={() => press("+")} className={`${btnCls()} !text-teal-400 font-bold`}>+</button>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [time, setTime] = useState(new Date());
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const userEmail = "ravshanbekovrasul11@gmail.com";

  // Real-time Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll Detector
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(userEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Contact Form -> mailto fallback
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Yangi loyiha taklifi — ${form.name}`);
    const body = encodeURIComponent(`Ism: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${userEmail}?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const navLinks = [
    { href: "#home", label: "Bosh sahifa" },
    { href: "#about", label: "Haqimda" },
    { href: "#skills", label: "Ko'nikmalar" },
    { href: "#experience", label: "Tajriba" },
    { href: "#projects", label: "Loyihalar" },
    { href: "#apps", label: "Mini Ilovalar" },
    { href: "#contact", label: "Bog'lanish" },
  ];

  const socialLinks = [
    {
      name: "Telegram",
      url: "https://t.me/ravwanbekovvv",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.67-.55.83-1.12.51l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.22-.05-.34-.37-.13l-6.87 4.33-2.96-.92c-.64-.2-.65-.64.13-.95l11.57-4.46c.53-.19 1 .13.89.93z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/rasul-ravshanbekov-17346b422?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/rsbcvvv?igsh=MWpwdng3aWY5NmIyag==",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1M8vqGJaqK/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
  ];

  const skills = [
    { name: "HTML5 & Semantic Web", desc: "Semantik va toza struktura", level: "95%" },
    { name: "CSS3 & Tailwind CSS", desc: "Modern va responsive interfeyslar", level: "92%" },
    { name: "JavaScript (ES6+)", desc: "Interaktivlik va dinamik vaqt mantiqlari", level: "88%" },
    { name: "React.js Framework", desc: "Component-based zamonaviy arxitektura", level: "85%" },
    { name: "Git & GitHub", desc: "Loyiha versiyalarini mukammal boshqarish", level: "80%" },
    { name: "UI/UX & Responsive", desc: "Figma dizaynlarni to'liq kodga ko'chirish", level: "90%" },
  ];

  const heroStats = [
    { end: 3, suffix: "+", label: "Jonli Loyiha" },
    { end: 100, suffix: "%", label: "Responsive" },
    { end: 15, suffix: "+", label: "Texnologiya" },
    { end: 100, suffix: "%", label: "Majburiyat" },
  ];

  const typewriterWords = [
    "Frontend Developer",
    "React.js Developer",
    "Tailwind CSS Expert",
    "UI/UX Enthusiast",
    "Doim O'rganuvchi Dasturchi",
  ];

  const aboutInfos = [
    { label: "Email", value: userEmail, href: `mailto:${userEmail}` },
    { label: "Telegram", value: "@ravwanbekovvv", href: "https://t.me/ravwanbekovvv" },
    { label: "Joylashuv", value: "Toshkent, O'zbekiston 🇺🇿" },
    { label: "Ta'lim", value: "Mars IT School" },
  ];

  const processCards = [
    { value: "3+", label: "Jonli loyiha" },
    { value: "100%", label: "Responsive" },
    { value: "API", label: "Real integratsiya" },
    { value: "UI/UX", label: "Premium ko'rinish" },
  ];

  const services = [
    {
      title: "Frontend Development",
      desc: "React, JavaScript va Tailwind CSS bilan zamonaviy, tezkor interfeyslar",
      color: "#14b8a6",
    },
    {
      title: "Responsive Dizayn",
      desc: "Telefon, planshet va kompyuterda mukammal ko'rinadigan layoutlar",
      color: "#00d3bd",
    },
    {
      title: "API Integratsiya",
      desc: "REST API lar bilan ishlash va dinamik ma'lumotlarni boshqarish",
      color: "#fcbb00",
    },
    {
      title: "UI/UX Amaliyoti",
      desc: "Figma dizaynlarni pixel-perfect, animatsiyali kodga aylantirish",
      color: "#ff667f",
    },
  ];

  const techStack = [
    {
      group: "Frontend",
      color: "#00d3bd",
      items: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 / CSS3", "Vite", "CSS Modules"],
    },
    {
      group: "Backend & API",
      color: "#46ecd5",
      items: ["REST API", "Fetch / Axios", "Node.js asoslari", "JSON Server"],
    },
    {
      group: "Tools & Deploy",
      color: "#fcbb00",
      items: ["Git & GitHub", "VS Code", "Figma", "Netlify", "npm"],
    },
    {
      group: "AI Yordamchilar",
      color: "#00a5ef",
      items: ["ChatGPT", "Claude", "GitHub Copilot", "Cursor"],
    },
  ];

  const experience = [
    {
      role: "Frontend Developer",
      org: "Freelance — Mustaqil loyihalar",
      period: "2024 — Hozirgacha",
      color: "#00d3bd",
      points: [
        "Netlify'da jonli ishlaydigan 3+ real loyiha ishlab chiqdim",
        "Dashboard, contact manager va moliya tracker kabi turli yo'nalishlar",
        "Toza kod, tez yuklanadigan va to'liq responsive saytlar topshirdim",
      ],
    },
    {
      role: "Frontend yo'nalishi talabasi",
      org: "Mars IT School",
      period: "2023 — 2024",
      color: "#46ecd5",
      points: [
        "HTML5, CSS3, JavaScript va React.js bo'yicha chuqurlashtirilgan ta'lim",
        "Real loyihalar ustida amaliy mashg'ulotlar va mentor nazorati",
        "Git/GitHub, jamoada ishlash va kod review madaniyati",
      ],
    },
    {
      role: "Web texnologiyalari asoslari",
      org: "O'z-o'zini o'rganish davri",
      period: "2022 — 2023",
      color: "#fcbb00",
      points: [
        "Internet manbalari orqali mustaqil o'rganish va mashq qilish",
        "Birinchi statik sahifalar va shaxsiy mini-loyihalar",
        "Dasturlashga bo'lgan qiziqishni kasbga aylantirish qarori",
      ],
    },
  ];

  const projects = [
    {
      id: "01",
      title: "Employee Management Dashboard",
      desc: "Xodimlarni boshqarish paneli: CRUD, qidiruv, responsive layout va dashboard tajribasi.",
      tags: ["React", "JavaScript", "CRUD", "Dashboard"],
      link: "https://stellular-cassata-cd27cb.netlify.app/",
    },
    {
      id: "02",
      title: "ContactFlow",
      desc: "Kontaktlarni qo'shish, tahrirlash, o'chirish va tezkor qidirish uchun smart manager.",
      tags: ["React", "Search", "State", "Modern UI"],
      link: "https://elegant-horse-acbb73.netlify.app/",
    },
    {
      id: "03",
      title: "ExpenseFlow",
      desc: "Shaxsiy xarajatlarni kategoriyalar bilan kuzatish va umumiy summani real vaqtda ko'rish.",
      tags: ["React", "Finance", "Responsive", "UX"],
      link: "https://curious-platypus-f7373e.netlify.app/",
    },
  ];

  const aiTools = [
    {
      name: "ChatGPT",
      vendor: "OpenAI",
      mono: "GPT",
      color: "#10a37f",
      desc: "Kod yozish, debugging va yangi g'oyalar uchun kundalik yordamchi",
      tags: ["Kod yozish", "Debugging", "Tushuntirish", "Ideya"],
    },
    {
      name: "Claude",
      vendor: "Anthropic",
      mono: "CL",
      color: "#d97757",
      desc: "Murakkab mantiq, arxitektura rejalari va chuqur kod tahlili uchun",
      tags: ["Code Review", "Arxitektura", "Refactoring", "Analiz"],
    },
    {
      name: "GitHub Copilot",
      vendor: "GitHub",
      mono: "CO",
      color: "#94a3b8",
      desc: "VS Code ichida AI juftlik-dasturchi sifatida birga ishlash",
      tags: ["Autocomplete", "Boilerplate", "Testlar", "VS Code"],
    },
    {
      name: "Cursor",
      vendor: "Anysphere",
      mono: "CU",
      color: "#a78bfa",
      desc: "AI-first kod muharriri — chat orqali butun loyiha bo'yicha tahrirlar",
      tags: ["Multi-file Edit", "Chat", "Refactoring", "AI Editor"],
    },
    {
      name: "Gemini",
      vendor: "Google",
      mono: "GM",
      color: "#00a5ef",
      desc: "Dizayn ilhomlari, tadqiqot va multimodal vazifalar uchun",
      tags: ["Design Ideas", "Research", "Visual", "Multi-modal"],
    },
    {
      name: "v0.dev",
      vendor: "Vercel",
      mono: "V0",
      color: "#46ecd5",
      desc: "Zamonaviy UI komponentlarini matndan tez generatsiya qilish",
      tags: ["UI Gen", "Tailwind", "Prototip", "Komponentlar"],
    },
  ];

  const roadmapItems = [
    {
      title: "Case study sahifalari",
      desc: "Har bir loyiha uchun muammo, yechim, UI qarorlari va natija yozilgan alohida sahifa.",
      icon: "📄",
      color: "#00d3bd",
    },
    {
      title: "Admin panel",
      desc: "Xabarlar, analytics, loyihalar va blog postlarni bitta joydan boshqarish.",
      icon: "⚙️",
      color: "#fcbb00",
    },
    {
      title: "AI yordamchi",
      desc: "Sayt ichida mijoz savollariga javob beradigan kichik portfolio assistant.",
      icon: "🤖",
      color: "#ff667f",
    },
    {
      title: "PWA va offline",
      desc: "Portfolio telefon ekranida app kabi ochiladi va asosiy ma'lumotlar offline ham ko'rinadi.",
      icon: "📱",
      color: "#00a5ef",
    },
  ];

  const inputCls = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${
    darkMode
      ? "bg-white/[0.03] border-white/10 text-white placeholder:text-slate-500"
      : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
  }`;

  const sectionKicker = (num, title) => (
    <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-widest block mb-2">
      {"//"} {num} / {title}
    </span>
  );

  const customStyles = `
    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(30px, -30px) scale(1.08); }
    }
    @keyframes float-reverse {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(-30px, 30px) scale(1.05); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .animate-float-slow {
      animation: float 14s ease-in-out infinite;
    }
    .animate-float-reverse-slow {
      animation: float-reverse 18s ease-in-out infinite;
    }
    .animate-blink {
      animation: blink 1s step-end infinite;
    }
    html {
      scroll-behavior: smooth;
    }
    section[id] {
      scroll-margin-top: 90px;
    }
  `;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans selection:bg-teal-500/30 relative overflow-hidden ${
        darkMode ? "bg-[#020618] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Dynamic Animated Background + Image */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=82')",
            opacity: darkMode ? 0.14 : 0.08,
          }}
        />
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            darkMode
              ? "bg-gradient-to-b from-[#020618]/70 via-[#020618]/85 to-[#020618]"
              : "bg-gradient-to-b from-slate-50/70 via-slate-50/85 to-slate-50"
          }`}
        />
        <div
          className={`absolute -top-[20%] left-[15%] w-[600px] h-[600px] rounded-full blur-[160px] animate-float-slow ${
            darkMode ? "bg-teal-500/15" : "bg-teal-300/30"
          }`}
        />
        <div
          className={`absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full blur-[150px] animate-float-reverse-slow ${
            darkMode ? "bg-[#00a5ef]/10" : "bg-sky-300/30"
          }`}
        />
        <div
          className={`absolute -bottom-[10%] left-[30%] w-[650px] h-[650px] rounded-full blur-[170px] animate-float-slow ${
            darkMode ? "bg-[#46ecd5]/10" : "bg-emerald-300/30"
          }`}
        />
        <div
          className={`absolute inset-0 bg-[size:4rem_4rem] ${
            darkMode
              ? "bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"
              : "bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]"
          }`}
        />
      </div>

      {/* Header / Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? darkMode
              ? "py-4 bg-[#020618]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
              : "py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-lg"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="text-xl font-extrabold tracking-tight group flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 group-hover:scale-150 transition-transform duration-300" />
            <span>Rasul</span>
            <span className="text-teal-400">.dev</span>
          </a>

          {/* Desktop Nav Links */}
          <nav
            className={`hidden lg:flex items-center gap-1 border rounded-full p-1.5 backdrop-blur-md ${
              darkMode ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-black/[0.03]"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
                  darkMode
                    ? "text-slate-300 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-black hover:bg-black/5"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Real-time Clock & Dark Mode Toggle */}
          <div className="flex items-center gap-3">
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono backdrop-blur-md ${
                darkMode ? "border-white/10 bg-white/5 text-teal-300" : "border-slate-300 bg-slate-100 text-teal-600"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{time.toLocaleTimeString()}</span>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? "border-white/10 bg-white/5 text-amber-300 hover:bg-white/10"
                  : "border-slate-300 bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
              title="Mavzuni o'zgartirish"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <div
            className={`lg:hidden border-b px-6 py-6 flex flex-col gap-4 backdrop-blur-2xl ${
              darkMode ? "bg-[#020618]/95 border-white/10" : "bg-white/95 border-slate-200"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium hover:text-teal-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative z-10 pt-40 pb-20 md:pt-52 md:pb-32 px-6 max-w-5xl mx-auto text-center">
        <Reveal>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium mb-8 backdrop-blur-md ${
              darkMode
                ? "border-teal-500/20 bg-teal-500/10 text-teal-300"
                : "border-teal-300 bg-teal-50 text-teal-600"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Mars IT School — Frontend Developer
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4">
            Premium portfolio va <br />
            <span className="bg-gradient-to-r from-teal-300 via-[#46ecd5] to-[#00a5ef] bg-clip-text text-transparent">
              real API ishlaydigan web ilovalar
            </span>
          </h1>
        </Reveal>

        <Reveal delay={150}>
          <p className={`text-sm sm:text-base font-medium mb-6 ${darkMode ? "text-teal-400/90" : "text-teal-600"}`}>
            React, UX/UI va motion bilan
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div
            className={`inline-block px-5 py-3 rounded-xl border text-sm sm:text-base mb-6 backdrop-blur-md ${
              darkMode ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-black/[0.03]"
            }`}
          >
            <Typewriter words={typewriterWords} />
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal mb-10 ${
            darkMode ? "text-slate-400" : "text-slate-600"
          }`}>
            Salom, men <strong className={darkMode ? "text-slate-100" : "text-slate-900"}>Rasul Ravshanbekov</strong>. Tez, responsive, chiroyli va foydalanuvchi uchun qulay web saytlar quraman. Bu portfolio ichida ob-havo, valyuta konverter va kalkulyator real ishlaydi.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className={`px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 shadow-xl hover:scale-[1.02] ${
                darkMode
                  ? "bg-teal-500 text-white hover:bg-teal-400 shadow-teal-500/25"
                  : "bg-teal-600 text-white hover:bg-teal-500 shadow-teal-600/25"
              }`}
            >
              Loyihalarni ko'rish
            </a>
            <a
              href="#contact"
              className={`px-7 py-3.5 rounded-full border font-medium text-xs sm:text-sm transition-all duration-300 backdrop-blur-md ${
                darkMode
                  ? "border-white/15 bg-white/[0.03] hover:bg-white/10 text-slate-200"
                  : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800"
              }`}
            >
              Xabar yozish
            </a>
            <button
              onClick={copyEmail}
              className={`px-7 py-3.5 rounded-full border font-medium text-xs sm:text-sm transition-all duration-300 backdrop-blur-md ${
                darkMode
                  ? "border-white/15 bg-white/[0.03] hover:bg-white/10 text-slate-200"
                  : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800"
              }`}
            >
              {copied ? "Nusxalandi ✓" : "Email nusxalash"}
            </button>
          </div>
        </Reveal>

        {/* Stats Counter Strip */}
        <Reveal delay={500}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03] hover:border-teal-500/40"
                    : "border-slate-200 bg-white hover:border-teal-400 shadow-sm"
                }`}
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-300 to-[#00a5ef] bg-clip-text text-transparent">
                  <CountUp end={stat.end} suffix={stat.suffix} duration={1400 + i * 200} />
                </div>
                <div className={`text-[11px] mt-1 font-medium ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          {sectionKicker("01", "Qanday ishlayman")}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Kod, dizayn va foydalanuvchi tajribasini <br className="hidden sm:block" /> bitta joyda birlashtiraman.
          </h2>
        </div>

        <Reveal>
          <div
            className={`rounded-3xl border p-8 sm:p-14 backdrop-blur-2xl relative overflow-hidden transition-all duration-300 ${
              darkMode ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/60 shadow-xl"
            }`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
            <p className={`text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto font-normal ${
              darkMode ? "text-slate-300" : "text-slate-700"
            }`}>
              Frontendda asosiy e'tiborim tezlik, toza komponentlar, mobil moslashuv va ishonchli holatlarga qaratilgan. Har bir sahifada loading, error, empty va success holatlari o'ylangan bo'lishi kerak. Mars IT School'da chuqurlashtirilgan amaliy bilimlar asosida UX/UI ni eng yuqori darajada ta'minlayman.
            </p>

            {/* Process Cards Grid (rasulweb.uz) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {processCards.map((card) => (
                <div
                  key={card.label}
                  className={`rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1 ${
                    darkMode
                      ? "border-white/10 bg-white/[0.03] hover:border-teal-500/40"
                      : "border-slate-200 bg-white hover:border-teal-400 shadow-sm"
                  }`}
                >
                  <div className="text-xl font-extrabold text-teal-400">{card.value}</div>
                  <div className={`text-[11px] mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {card.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {aboutInfos.map((info) => (
                <div
                  key={info.label}
                  className={`rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1 ${
                    darkMode
                      ? "border-white/10 bg-white/[0.03] hover:border-teal-500/40"
                      : "border-slate-200 bg-white hover:border-teal-400 shadow-sm"
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-teal-400 font-bold mb-1">
                    {info.label}
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-medium hover:text-teal-400 transition-colors break-all"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <div className="text-xs sm:text-sm font-medium">{info.value}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* What I Do / Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <div
                className={`group rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    : "border-slate-200 bg-white shadow-sm hover:shadow-lg"
                }`}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ background: service.color, boxShadow: `0 0 12px ${service.color}` }}
                />
                <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ background: service.color }}
                  />
                  {service.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {service.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          {sectionKicker("02", "Stack")}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
            Texnik Ko'nikmalar
          </h2>
          <p className={darkMode ? "text-slate-400 text-sm" : "text-slate-600 text-sm"}>
            Interaktiv interfeys, state management, API bilan ishlash va professional responsive layout
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={(i % 3) * 100}>
              <div
                className={`group rounded-2xl border p-6 transition-all duration-300 backdrop-blur-xl hover:-translate-y-1 h-full ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-teal-500/40"
                    : "border-slate-200 bg-white hover:border-teal-400 hover:shadow-lg"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-base">{skill.name}</h3>
                  <span className="text-xs font-mono text-teal-400 font-bold">{skill.level}</span>
                </div>
                <p className={`text-xs mb-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {skill.desc}
                </p>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? "bg-white/10" : "bg-slate-200"}`}>
                  <div
                    className="bg-gradient-to-r from-teal-500 to-[#00a5ef] h-full rounded-full transition-all duration-1000"
                    style={{ width: skill.level }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Grouped Tech Stack Pills */}
        <Reveal>
          <div
            className={`rounded-3xl border p-6 sm:p-10 backdrop-blur-2xl ${
              darkMode ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white shadow-xl"
            }`}
          >
            <h3 className="text-lg font-bold tracking-tight mb-8 text-center">
              Ishlatadigan Texnologiyalar Steki
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {techStack.map((group) => (
                <div key={group.group}>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: group.color, boxShadow: `0 0 10px ${group.color}` }}
                    />
                    <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: group.color }}>
                      {group.group}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-105 cursor-default ${
                          darkMode
                            ? "bg-white/5 border-white/10 text-slate-300 hover:border-teal-500/40"
                            : "bg-slate-100 border-slate-200 text-slate-700 hover:border-teal-400"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          {sectionKicker("03", "Tajriba")}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">Mening Tajribam</h2>
          <p className={darkMode ? "text-slate-400 text-sm" : "text-slate-600 text-sm"}>
            Kasbiy rivojlanishimning bosqichlari
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-teal-500/60 via-[#46ecd5]/30 to-transparent md:-translate-x-1/2" />

          {experience.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 120} className="relative mb-10 last:mb-0">
              <div
                className={`flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } md:items-start`}
              >
                <div
                  className="absolute left-4 md:left-1/2 top-6 w-3.5 h-3.5 rounded-full border-2 -translate-x-1/2 z-10"
                  style={{
                    background: darkMode ? "#020618" : "#f8fafc",
                    borderColor: exp.color,
                    boxShadow: `0 0 14px ${exp.color}`,
                  }}
                />

                <div className="hidden md:block md:w-1/2" />
                <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}>
                  <div
                    className={`rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
                      darkMode
                        ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                        : "border-slate-200 bg-white shadow-sm hover:shadow-lg"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <h3 className="font-bold text-base">{exp.role}</h3>
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-mono font-bold"
                        style={{ background: `${exp.color}1a`, color: exp.color }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-xs font-semibold mb-4" style={{ color: exp.color }}>
                      {exp.org}
                    </div>
                    <ul className="space-y-2">
                      {exp.points.map((point) => (
                        <li
                          key={point}
                          className={`flex gap-2 text-xs sm:text-sm leading-relaxed ${
                            darkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          <span style={{ color: exp.color }}>▸</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          {sectionKicker("04", "Portfolio")}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
            Real Loyihalar
          </h2>
          <p className={darkMode ? "text-slate-400 text-sm" : "text-slate-600 text-sm"}>
            Amalda ishlaydigan, ko'rish mumkin bo'lgan frontend ishlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <Reveal key={proj.title} delay={i * 120}>
              <div
                className={`group rounded-3xl border p-7 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-2 ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03] hover:border-teal-500/40 hover:shadow-2xl shadow-teal-950/20"
                    : "border-slate-200 bg-white hover:border-teal-400 hover:shadow-2xl shadow-slate-200/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-teal-400 font-bold block">PROJECT //{proj.id}</span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-teal-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {proj.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium border ${
                          darkMode
                            ? "bg-white/5 text-slate-300 border-white/10"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-400 text-white text-xs font-semibold transition-all duration-300 shadow-md shadow-teal-500/25 hover:scale-105"
                  >
                    <span>Saytni ochish</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Live API Mini Apps Section (rasulweb.uz) */}
      <section id="apps" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          {sectionKicker("05", "Live API")}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
            Portfolio ichidagi real mini ilovalar
          </h2>
          <p className={`text-sm max-w-lg mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            API, foydalanuvchi holatlari va interaktiv hisob-kitoblar bitta professional blokda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          <Reveal><WeatherCard darkMode={darkMode} /></Reveal>
          <Reveal delay={120}><CurrencyCard darkMode={darkMode} /></Reveal>
          <Reveal delay={240}><CalculatorCard darkMode={darkMode} /></Reveal>
        </div>

        <Reveal delay={300}>
          <p className={`text-center text-xs font-mono mt-8 ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
            ✦ Barcha ma'lumotlar real API'lardan jonli olinadi ✦
          </p>
        </Reveal>
      </section>

      {/* Video Showcase Section */}
      <section id="showcase" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <Reveal>
          <div
            className={`rounded-3xl border p-8 sm:p-12 backdrop-blur-2xl text-center relative overflow-hidden ${
              darkMode ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white shadow-xl"
            }`}
          >
            <div className="mb-8">
              {sectionKicker("06", "Video Showcase")}
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
                Loyiha Namoyishi
              </h2>
              <p className={`text-sm max-w-md mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                Gʻoya, interfeys va kod tuzilishi haqidagi umumiy video taqdimot
              </p>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-w-3xl mx-auto bg-black">
              <iframe
                className="w-full h-full object-cover"
                src="https://www.youtube.com/embed/U--VqOqpARE"
                title="YouTube Video Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* AI Tools Section */}
      <section id="aitools" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          {sectionKicker("07", "AI Workflow")}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
            AI Tools — Kundalik Qurollarim
          </h2>
          <p className={`text-sm max-w-lg mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Ish jarayonimi tezlashtiruvchi va sifatni oshiruvchi AI qurollari
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool, i) => (
            <Reveal key={tool.name} delay={(i % 3) * 100}>
              <div
                className={`group rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 h-full ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    : "border-slate-200 bg-white shadow-sm hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-extrabold text-xs border shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${tool.color}14`,
                      borderColor: `${tool.color}44`,
                      color: tool.color,
                      boxShadow: `0 0 16px ${tool.color}33`,
                    }}
                  >
                    {tool.mono}
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight">{tool.name}</h3>
                    <span className="text-[10px] font-mono text-slate-500">{tool.vendor}</span>
                  </div>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {tool.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                        darkMode
                          ? "bg-white/5 text-slate-400 border-white/10"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className={`text-center text-sm font-mono mt-12 ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
            ✦ Inson ijodi + AI aniqligi = tezroq va aqlro natijalar ✦
          </p>
        </Reveal>
      </section>

      {/* Roadmap Section (rasulweb.uz) */}
      <section id="roadmap" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          {sectionKicker("08", "Keyingi Level")}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
            Kelajakda qo'shiladigan kuchli g'oyalar
          </h2>
          <p className={`text-sm max-w-lg mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Portfolio oddiy vitrina bo'lib qolmasin — vaqt o'tgani sari biznesga foyda beradigan platformaga aylansin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {roadmapItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div
                className={`group rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    : "border-slate-200 bg-white shadow-sm hover:shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl border shrink-0"
                    style={{
                      background: `${item.color}14`,
                      borderColor: `${item.color}33`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold" style={{ color: item.color }}>
                        NEXT //{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-bold text-base mb-1.5">{item.title}</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact & Socials Section */}
      <section id="contact" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div
          className={`rounded-3xl border p-8 sm:p-14 backdrop-blur-2xl ${
            darkMode
              ? "border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent"
              : "border-slate-200 bg-white shadow-2xl"
          }`}
        >
          <div className="text-center mb-12">
            {sectionKicker("09", "Aloqa")}
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
              Menga loyiha yoki taklif yuboring
            </h2>
            <p className={`text-sm max-w-md mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              Formani yuborsangiz xabar emailga keladi. Ijtimoiy tarmoqlarim orqali ham bevosita yozishingiz mumkin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <Reveal>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h3 className="font-bold text-lg mb-1">Xabar yuborish</h3>
                <p className="text-xs mb-4 text-slate-500">
                  Formani to'ldiring — 24 soat ichida javob beraman.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ism"
                    className={inputCls}
                  />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    className={inputCls}
                  />
                </div>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Mavzu — loyiha, taklif, hamkorlik..."
                  className={inputCls}
                />
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Xabar — loyihangiz haqida yozing..."
                  className={`${inputCls} resize-none`}
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-teal-500/25 hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {formSent ? "✓ Email client ochildi!" : "Yuborish"}
                  {!formSent && <span>✈</span>}
                </button>
              </form>
            </Reveal>

            {/* Status Card + Direct Contacts */}
            <Reveal delay={150} className="flex flex-col gap-6">
              <div
                className={`rounded-2xl border p-6 ${
                  darkMode
                    ? "border-emerald-500/20 bg-emerald-500/[0.06]"
                    : "border-emerald-300 bg-emerald-50"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-bold mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Yangi loyiha uchun ochiq
                </div>
                <h3 className="font-bold text-lg leading-snug">
                  Ajoyib loyiha yaratishga tayyormisiz?
                </h3>
                <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Freelance, full-time yoki qiziqarli loyihalar uchun ochiqman — keling, suhbatlashamiz!
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Email", value: userEmail, href: `mailto:${userEmail}` },
                  { label: "Telegram", value: "@ravwanbekovvv", href: "https://t.me/ravwanbekovvv" },
                  {
                    label: "LinkedIn",
                    value: "rasul-ravshanbekov",
                    href: socialLinks[1].url,
                  },
                  { label: "Joylashuv", value: "Toshkent, O'zbekiston 🇺🇿" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between gap-4 px-5 py-3.5 rounded-xl border transition-all duration-300 ${
                      darkMode
                        ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-slate-500">
                      {row.label}
                    </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium hover:text-teal-400 transition-colors truncate"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-xs sm:text-sm font-medium">{row.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Social Icons Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-teal-500/40 text-slate-300 hover:text-white"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-teal-400 text-slate-700 hover:text-black"
                }`}
              >
                <span className="text-teal-400">{item.icon}</span>
                <span className="text-xs sm:text-sm font-medium">{item.name}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href={`mailto:${userEmail}`}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-xl shadow-teal-500/25 hover:scale-105 text-center"
            >
              Menga xat yuboring ({userEmail})
            </a>
            <button
              onClick={copyEmail}
              className={`w-full sm:w-auto px-8 py-4 rounded-full border font-medium text-xs sm:text-sm transition-all duration-300 ${
                darkMode
                  ? "border-white/15 bg-white/[0.03] text-slate-200 hover:bg-white/10"
                  : "border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200"
              }`}
            >
              {copied ? "Nusxalandi ✓" : "Email nusxalash"}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative z-10 border-t px-6 ${
          darkMode ? "border-white/5 text-slate-500 bg-[#020618]/70" : "border-slate-200 text-slate-600 bg-white/60"
        }`}
      >
        <div className="max-w-6xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <a href="#home" className="text-lg font-extrabold tracking-tight flex items-center gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              <span className={darkMode ? "text-slate-100" : "text-slate-900"}>Rasul</span>
              <span className="text-teal-400">.dev</span>
            </a>
            <p className="text-xs leading-relaxed mb-4 text-slate-500">
              Mars IT School bitiruvchisi. React, JavaScript va Tailwind CSS bilan zamonaviy veb-saytlar yarataman.
            </p>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono font-bold ${
                darkMode
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-emerald-300 bg-emerald-50 text-emerald-600"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Yangi loyiha uchun ochiq
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${darkMode ? "text-slate-300" : "text-slate-800"}`}>
              Navigatsiya
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-xs hover:text-teal-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack Column */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${darkMode ? "text-slate-300" : "text-slate-800"}`}>
              Stack
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>React / JavaScript</li>
              <li>Tailwind CSS</li>
              <li>REST API Integration</li>
              <li>Git &amp; GitHub</li>
              <li>AI Tools Workflow</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${darkMode ? "text-slate-300" : "text-slate-800"}`}>
              Aloqa
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={`mailto:${userEmail}`} className="hover:text-teal-400 transition-colors break-all">
                  {userEmail}
                </a>
              </li>
              <li>
                <a href="https://t.me/ravwanbekovvv" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                  @ravwanbekovvv
                </a>
              </li>
              <li>Toshkent, O'zbekiston 🇺🇿</li>
            </ul>
            <div className="flex items-center gap-2 font-mono mt-4 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Toshkent: {time.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t py-6 ${darkMode ? "border-white/5" : "border-slate-200"}`}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} Rasul Ravshanbekov. Barcha huquqlar himoyalangan.</p>
            <p className="font-mono text-slate-600">React, Vite va real APIlar bilan yig'iladi.</p>
            <div className="flex gap-6">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
