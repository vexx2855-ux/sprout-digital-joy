import { Globe, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LANGUAGES, useT, type LangCode } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/5 px-3 py-2 text-xs font-medium hover:bg-black/10 transition"
        aria-label={t("lang.label")}
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{current.native}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 max-h-[70vh] w-56 overflow-y-auto rounded-2xl border border-black/10 bg-background/95 p-1.5 shadow-xl backdrop-blur-xl z-50"
          >
            {LANGUAGES.map((l) => {
              const active = l.code === lang;
              return (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code as LangCode); setOpen(false); }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                    active ? "bg-primary/15 text-foreground" : "hover:bg-black/5 text-muted-foreground"
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="font-medium text-foreground">{l.native}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{l.label}</span>
                  </span>
                  {active && <Check className="h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
