import { useState } from "react";
import { Anchor, ArrowRight, CalendarDays, Camera, Check, Compass, Copy, MapPin, MoonStar, Plane, ShipWheel, ShoppingBag, Sparkles } from "lucide-react";
import { ChatBox } from "@/components/chat-box";
import { euroSpotlights, getLocalDateKey } from "@/data/euro-spotlights";
import { getTripStatus, tripStops } from "@/data/euro-itinerary";

type Tab = "route" | "coast" | "spotlights";

const choices = [
  { name: "Positano", eyebrow: "Nights of Aug 27, 28, 29", badge: "Locked · 3 nights", chosen: true, verdict: "Won the weekend on nightlife, beach clubs, shopping, and boat access to Capri.", strengths: ["Strongest fashion-and-coast visuals", "Easy boat access to Capri and Li Galli", "Beach clubs, sunset bars, and a real nightclub"], tradeoffs: ["Usually the priciest stay", "Stairs everywhere", "Transfers need more planning"], route: "Amalfi → Positano ferry, roughly 25–35 minutes", accent: "from-fuchsia-500 to-orange-400" },
  { name: "Amalfi", eyebrow: "Nights of Aug 25, 26", badge: "Locked · 2 nights", chosen: true, verdict: "Won the arrival because it is the easier landing from Florence and the better base for Ravello.", strengths: ["Simpler access through Salerno", "Great base for Ravello and coast ferries", "Softer first coast nights after a travel day"], tradeoffs: ["Less nightlife than Positano", "Content is elegant rather than clubby", "Still expensive in August"], route: "Florence → Salerno fast train → short ferry to Amalfi", accent: "from-sky-500 to-emerald-400" },
  { name: "Cinque Terre", eyebrow: "Saved for next summer", badge: "Not this trip", chosen: false, verdict: "Gorgeous, but it is a different movie: soft life, quiet nights, and a longer haul back to Rome.", strengths: ["Fastest and easiest from Florence", "Five distinct village backdrops", "Boat, swim, pesto, and sunset potential"], tradeoffs: ["Quiet nightlife and lighter shopping", "No cave club, no Capri day", "Longer final move south to Rome"], route: "Filed under: the trip where we exhale", accent: "from-amber-400 to-rose-400" },
];

function copyText(value: string) {
  try {
    void navigator.clipboard?.writeText(value);
  } catch {
    /* clipboard is unavailable in some mobile browsers; the text stays visible on screen */
  }
}

function Heading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-rose-600">{eyebrow}</p><h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h2><p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{copy}</p></div>;
}

function NowStrip({ today }: { today: string }) {
  const status = getTripStatus(today);
  const drop = euroSpotlights.find(item => item.release === today);
  if (status.phase === "after") return <div className="border-b border-rose-100 bg-rose-50"><div className="mx-auto max-w-7xl px-5 py-4 text-sm font-semibold text-rose-700 sm:px-8">🍦 That's a wrap on Euro Summer 2026. The Spotlights stay up as receipts.</div></div>;
  const headline = status.phase === "before" ? `${status.daysUntilStart} day${status.daysUntilStart === 1 ? "" : "s"} until takeoff` : `Day ${status.dayNumber} of ${status.totalDays}`;
  return <div className="border-b border-rose-100 bg-gradient-to-r from-rose-50 via-[#fffaf5] to-amber-50">
    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{headline}</span>
        {status.current && <span className="text-sm font-bold text-slate-900">{status.current.icon} Currently in {status.current.city}</span>}
        {status.next && <span className="text-sm text-slate-600">Next: {status.next.city} on {status.next.dates.split("–")[0]}</span>}
      </div>
      {drop && <p className="text-sm text-slate-600">Today's drop: <span className="font-semibold text-rose-700">{drop.title}</span></p>}
    </div>
  </div>;
}

function RouteTab({ today }: { today: string }) {
  const current = getTripStatus(today).current;
  return <section className="space-y-10"><Heading eyebrow="Locked in" title="The plot is decided. The chaos is still optional." copy="Only broad public-safe details live here. Hotels, budgets, screenshots, and exact movement stay in the private planning chat." />
    <div className="grid gap-4 lg:grid-cols-5">{tripStops.map((stop, index) => { const here = current?.city === stop.city; return <article key={stop.city} className={`relative rounded-3xl border p-6 shadow-sm ${here ? "border-rose-300 bg-white ring-2 ring-rose-200" : "border-slate-200 bg-white"}`}><div className="flex items-center justify-between gap-2"><span className="text-4xl">{stop.icon}</span><span className={`rounded-full px-3 py-1 text-xs font-semibold ${here ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600"}`}>{here ? "You are here" : stop.status}</span></div><p className="mt-8 text-sm font-bold text-rose-600">{stop.dates}</p><h3 className="mt-1 font-serif text-2xl font-bold">{stop.city}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{stop.copy}</p>{index < tripStops.length - 1 && <span className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-rose-100 bg-[#fffaf5] p-1.5 shadow-sm lg:block"><ArrowRight className="h-5 w-5 text-rose-500" /></span>}</article>; })}</div>
    <div className="grid gap-4 md:grid-cols-3"><Vibe icon={ShoppingBag} title="Shopping" copy="London fashion, Florence leather, and coast boutiques that earn suitcase space." /><Vibe icon={MoonStar} title="Nightlife" copy="Late dinners, rooftops, beach bars, and a cave club with a boat shuttle home." /><Vibe icon={Anchor} title="Yacht era" copy="Licensed skippers, swim stops, Li Galli, and a proper Capri day out of Positano." /></div>
  </section>;
}

function Vibe({ icon: Icon, title, copy }: { icon: typeof Anchor; title: string; copy: string }) {
  return <div className="rounded-2xl bg-slate-950 p-6 text-white"><Icon className="h-6 w-6 text-rose-300" /><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p></div>;
}

function CoastTab() {
  return <section className="space-y-10"><Heading eyebrow="Decision made" title="Two nights in Amalfi. Three in Positano." copy="The coast question is closed. Amalfi takes the arrival because it is the easier landing, and Positano takes the weekend because that is where the weekend actually happens." />
    <div className="grid gap-6 lg:grid-cols-3">{choices.map(choice => <article key={choice.name} className={`overflow-hidden rounded-3xl border bg-white shadow-sm ${choice.chosen ? "border-slate-200" : "border-dashed border-slate-300 opacity-90"}`}><div className={`bg-gradient-to-br ${choice.accent} p-6 text-white`}><div className="flex items-start justify-between gap-3"><p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">{choice.eyebrow}</p><span className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">{choice.badge}</span></div><h3 className="mt-3 font-serif text-3xl font-bold">{choice.name}</h3><p className="mt-3 text-sm leading-6 text-white/90">{choice.verdict}</p></div><div className="space-y-6 p-6"><List title="Why it works" items={choice.strengths} positive /><List title="Reality check" items={choice.tradeoffs} /><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Route shape</p><p className="mt-2 text-sm leading-6 text-slate-700">{choice.route}</p></div></div></article>)}</div>
    <div className="grid gap-6 lg:grid-cols-2">
      <aside className="rounded-3xl border border-fuchsia-200 bg-fuchsia-50 p-6 sm:p-8"><div className="flex gap-4"><MoonStar className="h-7 w-7 shrink-0 text-fuchsia-600" /><div><h3 className="text-lg font-bold">The weekend, specifically</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700"><li><span className="font-semibold">Fri Aug 28:</span> Africana in Praiano — a nightclub inside a sea cave, doors around 11:30 PM.</li><li><span className="font-semibold">Sat Aug 29:</span> boat day into Capri, then Africana again or Music on the Rocks back in Positano.</li><li><span className="font-semibold">Getting there:</span> official sea shuttle from Positano runs about €10 round trip, with returns near 3, 3:30, and 4 AM.</li></ul><p className="mt-3 text-sm leading-6 text-slate-600">Prices and schedules come from the club's own listings and can change — confirm on the day.</p></div></div></aside>
      <aside className="rounded-3xl border border-rose-200 bg-rose-50 p-6 sm:p-8"><div className="flex gap-4"><ShipWheel className="h-7 w-7 shrink-0 text-rose-600" /><div><h3 className="text-lg font-bold">Boat rule</h3><p className="mt-2 leading-7 text-slate-700">Shared tour, private charter, or reputable local operator are all valid. Non-negotiables: licensed skipper, insured vessel, clear pickup details, and real recent reviews.</p></div></div></aside>
    </div>
  </section>;
}

function List({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return <div><p className={`text-xs font-bold uppercase tracking-wider ${positive ? "text-emerald-700" : "text-amber-700"}`}>{title}</p><ul className="mt-3 space-y-2">{items.map(item => <li key={item} className="flex gap-2 text-sm text-slate-700">{positive ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> : <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />}{item}</li>)}</ul></div>;
}

function SpotlightsTab({ today }: { today: string }) {
  const [copied, setCopied] = useState("");
  return <section className="space-y-10"><Heading eyebrow="Daily drops" title="One Spotlight a day, all the way to the flight home." copy="Every piece is already written, plus a shot idea and a caption starter for the days when the content brain is off duty. Each drop unlocks on your local calendar day." />
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{euroSpotlights.map((item, index) => {
      const unlocked = item.release <= today;
      const isToday = item.release === today;
      return <article key={item.release} className={`flex flex-col rounded-3xl border p-6 ${isToday ? "border-rose-300 bg-white shadow-md ring-2 ring-rose-200" : unlocked ? "border-slate-200 bg-white shadow-sm" : "border-dashed border-slate-300 bg-slate-50"}`}>
        <div className="flex items-center justify-between gap-2"><span className="text-4xl">{item.icon}</span><span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${isToday ? "bg-rose-600 text-white" : "text-slate-500"}`}>{isToday ? "Today" : `Drop ${index + 1}`}</span></div>
        <p className="mt-8 text-xs font-bold uppercase tracking-wider text-rose-600">{item.city} · {item.release}</p>
        <h3 className="mt-2 font-serif text-2xl font-bold">{unlocked ? item.title : "Unlocks daily"}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{unlocked ? item.copy : "A fresh destination brief is waiting. Anticipation is free production value."}</p>
        {unlocked && <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4">
          <div className="flex gap-2.5"><Camera className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /><p className="text-sm leading-6 text-slate-700"><span className="font-bold text-slate-900">Get the shot: </span>{item.shot}</p></div>
          <button type="button" onClick={() => { copyText(item.caption); setCopied(item.release); }} className="flex w-full items-start gap-2.5 rounded-xl bg-white px-3 py-2.5 text-left ring-1 ring-slate-200 transition hover:ring-rose-300"><Copy className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" /><span className="text-sm leading-6 text-slate-700"><span className="font-bold text-slate-900">{copied === item.release ? "Copied: " : "Caption: "}</span>{item.caption}</span></button>
        </div>}
      </article>;
    })}</div>
    <aside className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8"><div className="flex gap-4"><Sparkles className="h-7 w-7 shrink-0 text-rose-300" /><div><h3 className="text-lg font-bold">Want your handles on here?</h3><p className="mt-2 leading-7 text-slate-300">Drop your public creator links in Gelato and they go straight into the header and every Spotlight, credited properly. Nothing gets published without you asking for it first.</p></div></div></aside>
  </section>;
}

export default function FariHome() {
  const [tab, setTab] = useState<Tab>("route");
  const today = getLocalDateKey();
  const tabs: Array<[Tab, string, typeof Compass]> = [["route", "Route", CalendarDays], ["coast", "Coast", Compass], ["spotlights", "Spotlights", Sparkles]];
  return <main className="min-h-screen bg-[#fffaf5] text-slate-950"><header className="euro-hero relative overflow-hidden bg-slate-950 text-white"><picture><source media="(max-width: 639px)" srcSet="/euro/hero-fari-storm-mobile.jpg" /><img src="/euro/hero-fari-storm.jpg" alt="Fari and Storm celebrating on a speedboat off the Amalfi Coast with their lobster accomplice" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center sm:object-[64%_center]" /></picture><div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-slate-950/10" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/25" /><div className="relative mx-auto max-w-7xl px-5 pb-16 pt-7 sm:px-8 sm:pb-24"><nav className="flex items-center justify-between"><div className="flex items-center gap-2 font-bold"><span className="text-2xl">🍦</span><span>Euro Summer</span></div><span className="rounded-full border border-white/20 bg-slate-950/25 px-3 py-1 text-xs font-bold text-white/80 backdrop-blur-sm">Fari + Storm · 2026</span></nav><div className="mt-16 max-w-4xl sm:mt-24"><p className="text-sm font-bold uppercase tracking-[0.3em] text-rose-300">London → Florence → Amalfi → Positano → Rome</p><h1 className="mt-5 font-serif text-5xl font-bold leading-[0.95] tracking-tight drop-shadow-lg sm:text-7xl lg:text-8xl">Two friends.<br /><span className="text-rose-300">One decided plot.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 drop-shadow">A public-safe trip companion for daily inspiration, the locked route, nightlife, shopping, and the full yacht-era agenda.</p></div><div className="mt-10 flex flex-wrap gap-3"><Pill icon={Plane} copy="Aug 19–31" /><Pill icon={MapPin} copy="Coast locked" /><Pill icon={Anchor} copy="Boat day + cave club" /></div></div></header><NowStrip today={today} /><div className="sticky top-0 z-40 border-b border-slate-200 bg-[#fffaf5]/95 backdrop-blur"><div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-8">{tabs.map(([id, label, Icon]) => <button key={id} onClick={() => setTab(id)} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${tab === id ? "bg-slate-950 text-white" : "bg-white text-slate-600"}`}><Icon className="h-4 w-4" />{label}</button>)}</div></div><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">{tab === "route" && <RouteTab today={today} />}{tab === "coast" && <CoastTab />}{tab === "spotlights" && <SpotlightsTab today={today} />}</div><footer className="border-t bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-8"><p>Built for excellent outfits and non-negotiable boat days. 🍦</p><p>Open Gelato to plan, compare, and chat together.</p></div></footer><ChatBox /></main>;
}

function Pill({ icon: Icon, copy }: { icon: typeof Anchor; copy: string }) {
  return <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm"><Icon className="h-4 w-4" />{copy}</span>;
}
