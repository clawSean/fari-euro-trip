import { useState } from "react";
import { Anchor, ArrowRight, CalendarDays, Check, Compass, MapPin, MoonStar, Plane, ShipWheel, ShoppingBag, Sparkles } from "lucide-react";
import { ChatBox } from "@/components/chat-box";

type Tab = "route" | "choose" | "spotlights";

const route = [
  { dates: "Aug 19–22", city: "London", status: "Confirmed stop", icon: "🇬🇧", copy: "Red-eye arrival, fashion, nightlife, and first-trip energy." },
  { dates: "Aug 22–26", city: "Florence", status: "Confirmed stop", icon: "🇮🇹", copy: "Renaissance streets, rooftop light, leather, wine, and late dinners." },
  { dates: "Aug 26–30", city: "Coast TBD", status: "Decision open", icon: "🛥️", copy: "Positano, Amalfi, and Cinque Terre are all still candidates." },
  { dates: "Aug 30–31", city: "Rome", status: "Flight city", icon: "🏛️", copy: "One final night, then a roughly 3 PM flight home." },
];

const choices = [
  { name: "Positano", eyebrow: "Maximum baddie energy", verdict: "Best if content, beach clubs, shopping, and a Capri boat day matter most.", strengths: ["Strongest fashion-and-coast visuals", "Easy boat access to Capri and Li Galli", "Beach clubs, sunset bars, and a real nightclub"], tradeoffs: ["Usually the priciest stay", "Stairs everywhere", "Transfers need more planning"], route: "Florence → Salerno fast train → seasonal ferry/private transfer", accent: "from-fuchsia-500 to-orange-400" },
  { name: "Amalfi", eyebrow: "Smart coastal base", verdict: "Best balance of boat access, logistics, scenery, and possible hotel value.", strengths: ["Simpler access through Salerno", "Great base for Ravello and coast ferries", "More practical for the later move to Rome"], tradeoffs: ["Less nightlife than Positano", "Content is elegant rather than clubby", "Still expensive in August"], route: "Florence → Salerno fast train → short ferry to Amalfi", accent: "from-sky-500 to-emerald-400" },
  { name: "Cinque Terre", eyebrow: "Pastel village cinema", verdict: "Best if the priority shifts toward village-hopping, hiking, and Ligurian content.", strengths: ["Fastest and easiest from Florence", "Five distinct village backdrops", "Boat, swim, pesto, and sunset potential"], tradeoffs: ["Quiet nightlife and lighter shopping", "Crowded in August", "Longer final move south to Rome"], route: "Florence → La Spezia/Monterosso by train → Rome later by rail", accent: "from-amber-400 to-rose-400" },
];

const spotlights = [
  { release: "2026-08-17", city: "London", title: "London After Dark", icon: "🇬🇧", copy: "Rooftop light, late dinners, fashion districts, and content backdrops without turning the trip into a photoshoot commute." },
  { release: "2026-08-18", city: "Florence", title: "Golden Hour Has an Address", icon: "🌇", copy: "The rooftop, piazza, leather, and wine lane—plus places that still feel good after the camera is put away." },
  { release: "2026-08-19", city: "Positano", title: "The Positano Case", icon: "🍋", copy: "What the premium buys: beach-club theater, vertical village drama, Capri access, and the strongest yacht-era fit." },
  { release: "2026-08-20", city: "Amalfi", title: "The Smarter Coast Base", icon: "⛵", copy: "Why Amalfi may win on boats, movement, Ravello access, and value without giving up the cinematic coastline." },
  { release: "2026-08-21", city: "Cinque Terre", title: "Five Villages, One Plot Twist", icon: "🎨", copy: "The wildcard: easier from Florence and wildly photogenic, at the cost of nightlife and a clean southbound route." },
  { release: "2026-08-22", city: "Rome", title: "The Finale, Not a Layover", icon: "🏛️", copy: "A one-night finish designed around dinner, one iconic walk, and a low-drama airport morning." },
];

function Heading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-rose-600">{eyebrow}</p><h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h2><p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{copy}</p></div>;
}

function RouteTab() {
  return <section className="space-y-10"><Heading eyebrow="The known shape" title="Enough structure to launch. Plenty of room to improvise." copy="Only broad public-safe details live here. Hotels, budgets, screenshots, and exact movement stay in the private planning chat." />
    <div className="grid gap-4 lg:grid-cols-4">{route.map((stop, index) => <article key={stop.city} className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><span className="text-4xl">{stop.icon}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{stop.status}</span></div><p className="mt-8 text-sm font-bold text-rose-600">{stop.dates}</p><h3 className="mt-1 font-serif text-2xl font-bold">{stop.city}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{stop.copy}</p>{index < route.length - 1 && <span className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-rose-100 bg-[#fffaf5] p-1.5 shadow-sm lg:block"><ArrowRight className="h-5 w-5 text-rose-500" /></span>}</article>)}</div>
    <div className="grid gap-4 md:grid-cols-3"><Vibe icon={ShoppingBag} title="Shopping" copy="London fashion, Florence leather, and a coast choice that earns suitcase space." /><Vibe icon={MoonStar} title="Nightlife" copy="Late dinners, rooftops, beach bars, and one or two properly chaotic nights." /><Vibe icon={Anchor} title="Yacht era" copy="Shared cruises, private charters, reputable locals, swim stops, and Capri possibilities." /></div>
  </section>;
}

function Vibe({ icon: Icon, title, copy }: { icon: typeof Anchor; title: string; copy: string }) {
  return <div className="rounded-2xl bg-slate-950 p-6 text-white"><Icon className="h-6 w-6 text-rose-300" /><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p></div>;
}

function ChooseTab() {
  return <section className="space-y-10"><Heading eyebrow="Help us choose" title="Three coast candidates. No fake certainty." copy="The best answer depends on hotel and boat budgets. This is the honest shortlist until those numbers arrive." />
    <div className="grid gap-6 lg:grid-cols-3">{choices.map(choice => <article key={choice.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className={`bg-gradient-to-br ${choice.accent} p-6 text-white`}><p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">{choice.eyebrow}</p><h3 className="mt-3 font-serif text-3xl font-bold">{choice.name}</h3><p className="mt-3 text-sm leading-6 text-white/90">{choice.verdict}</p></div><div className="space-y-6 p-6"><List title="Why it works" items={choice.strengths} positive /><List title="Reality check" items={choice.tradeoffs} /><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Route shape</p><p className="mt-2 text-sm leading-6 text-slate-700">{choice.route}</p></div></div></article>)}</div>
    <aside className="rounded-3xl border border-rose-200 bg-rose-50 p-6 sm:p-8"><div className="flex gap-4"><ShipWheel className="h-7 w-7 shrink-0 text-rose-600" /><div><h3 className="text-lg font-bold">Boat rule</h3><p className="mt-2 leading-7 text-slate-700">Shared tour, private charter, or reputable local operator are all valid. Non-negotiables: licensed skipper, insured vessel, clear pickup details, and real recent reviews.</p></div></div></aside>
  </section>;
}

function List({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return <div><p className={`text-xs font-bold uppercase tracking-wider ${positive ? "text-emerald-700" : "text-amber-700"}`}>{title}</p><ul className="mt-3 space-y-2">{items.map(item => <li key={item} className="flex gap-2 text-sm text-slate-700">{positive ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> : <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />}{item}</li>)}</ul></div>;
}

function SpotlightsTab() {
  const today = new Date().toISOString().slice(0, 10);
  return <section className="space-y-10"><Heading eyebrow="Daily drops" title="One location Spotlight every day." copy="The runway covers every named destination—including candidates—so the choice gets more informed instead of more frantic." /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{spotlights.map((item, index) => { const unlocked = item.release <= today; return <article key={item.city} className={`rounded-3xl border p-6 ${unlocked ? "border-slate-200 bg-white shadow-sm" : "border-dashed border-slate-300 bg-slate-50"}`}><div className="flex items-center justify-between"><span className="text-4xl">{item.icon}</span><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Drop {index + 1}</span></div><p className="mt-8 text-xs font-bold uppercase tracking-wider text-rose-600">{item.city} · {item.release}</p><h3 className="mt-2 font-serif text-2xl font-bold">{unlocked ? item.title : "Unlocks daily"}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{unlocked ? item.copy : "A fresh destination brief is waiting. Anticipation is free production value."}</p></article>; })}</div></section>;
}

export default function FariHome() {
  const [tab, setTab] = useState<Tab>("route");
  const tabs: Array<[Tab, string, typeof Compass]> = [["route", "Route", CalendarDays], ["choose", "Choose", Compass], ["spotlights", "Spotlights", Sparkles]];
  return <main className="min-h-screen bg-[#fffaf5] text-slate-950"><header className="relative overflow-hidden bg-slate-950 text-white"><img src="/euro/hero-baddies-lobster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-[79%_center] sm:object-[64%_center]" /><div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-slate-950/10" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/25" /><div className="relative mx-auto max-w-7xl px-5 pb-16 pt-7 sm:px-8 sm:pb-24"><nav className="flex items-center justify-between"><div className="flex items-center gap-2 font-bold"><span className="text-2xl">🍦</span><span>Euro Summer</span></div><span className="rounded-full border border-white/20 bg-slate-950/25 px-3 py-1 text-xs font-bold text-white/80 backdrop-blur-sm">Fari + Storm · 2026</span></nav><div className="mt-16 max-w-4xl sm:mt-24"><p className="text-sm font-bold uppercase tracking-[0.3em] text-rose-300">London → Florence → coast TBD → Rome</p><h1 className="mt-5 font-serif text-5xl font-bold leading-[0.95] tracking-tight drop-shadow-lg sm:text-7xl lg:text-8xl">Two friends.<br /><span className="text-rose-300">One flexible plot.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 drop-shadow">A public-safe trip companion for daily inspiration, destination decisions, nightlife, shopping, and the full yacht-era agenda.</p></div><div className="mt-10 flex flex-wrap gap-3"><Pill icon={Plane} copy="Aug 19–31" /><Pill icon={MapPin} copy="Coast decision open" /><Pill icon={Anchor} copy="Boat options welcome" /></div></div></header><div className="sticky top-0 z-40 border-b border-slate-200 bg-[#fffaf5]/95 backdrop-blur"><div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-8">{tabs.map(([id, label, Icon]) => <button key={id} onClick={() => setTab(id)} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${tab === id ? "bg-slate-950 text-white" : "bg-white text-slate-600"}`}><Icon className="h-4 w-4" />{label}</button>)}</div></div><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">{tab === "route" && <RouteTab />}{tab === "choose" && <ChooseTab />}{tab === "spotlights" && <SpotlightsTab />}</div><footer className="border-t bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-8"><p>Built for flexible plans and excellent outfits. 🍦</p><p>Open Gelato to plan, compare, and chat together.</p></div></footer><ChatBox /></main>;
}

function Pill({ icon: Icon, copy }: { icon: typeof Anchor; copy: string }) {
  return <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm"><Icon className="h-4 w-4" />{copy}</span>;
}
