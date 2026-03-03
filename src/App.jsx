import { useState, useEffect, useRef } from "react";

// ============================================================
//  ✏️  CREATOR CONFIGURATION
// ============================================================
const EXERCISE_BANK = {
  Back: [
    { name: "Dumbbell Row",           sets: "4", reps: "8–10", note: "", intensity: 6 },
    { name: "Chest Supported Row",    sets: "4", reps: "8–10", note: "", intensity: 6 },
    { name: "Lat Pulldown",           sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Pull Up",                sets: "4", reps: "6–8",  note: "", intensity: 7 },
    { name: "Straight Arm Pulldown",  sets: "4", reps: "8–10", note: "", intensity: 4 },
    { name: "Seated Cable Row",       sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Rack Pull",              sets: "4", reps: "6–8",  note: "", intensity: 9 },
    { name: "Seated Row Machine",     sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Barbell Row",            sets: "4", reps: "6–8",  note: "", intensity: 8 },
    { name: "Face Pull",              sets: "4", reps: "10",   note: "", intensity: 3 },
  ],
  Chest: [
    { name: "Flat Bench Press",    sets: "4", reps: "6–8",  note: "", intensity: 9 },
    { name: "Incline Bench Press", sets: "4", reps: "6–8",  note: "", intensity: 8 },
    { name: "Decline Bench Press", sets: "4", reps: "6–8",  note: "", intensity: 7 },
    { name: "Dumbbell Fly",        sets: "4", reps: "8–10", note: "", intensity: 4 },
    { name: "Push Up",             sets: "4", reps: "8–10", note: "", intensity: 4 },
  ],
  Shoulders: [
    { name: "Upright Row",                    sets: "4", reps: "8–10", note: "", intensity: 6 },
    { name: "Shrug",                          sets: "4", reps: "8–10", note: "", intensity: 3 },
    { name: "Lateral Raise",                  sets: "4", reps: "8–10", note: "", intensity: 4 },
    { name: "Rear Delt Fly",                  sets: "4", reps: "8–10", note: "", intensity: 4 },
    { name: "Standing Barbell Press",         sets: "4", reps: "6–8",  note: "", intensity: 9 },
    { name: "Dumbbell Press",                 sets: "4", reps: "6–8",  note: "", intensity: 7 },
    { name: "Arnold Press",                   sets: "4", reps: "6–8",  note: "", intensity: 7 },
    { name: "Front Raise",                    sets: "4", reps: "8–10", note: "", intensity: 4 },
    { name: "Side to Front Raise",            sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Cable Single Arm Lateral Raise", sets: "4", reps: "8–10", note: "", intensity: 3 },
  ],
  Triceps: [
    { name: "V-Handle Pushdown",      sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Rope Pulldown",          sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Straight Bar Pushdown",  sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Reverse Grip Pulldown",  sets: "4", reps: "8–10", note: "", intensity: 4 },
    { name: "Skullcrusher",           sets: "4", reps: "6–8",  note: "", intensity: 7 },
    { name: "Overhead Rope Pull",     sets: "4", reps: "8–10", note: "", intensity: 6 },
    { name: "Close Grip Bench Press", sets: "4", reps: "6–8",  note: "", intensity: 8 },
    { name: "Dips",                   sets: "4", reps: "6–8",  note: "", intensity: 7 },
  ],
  Biceps: [
    { name: "Dumbbell Curl",      sets: "4", reps: "8–10", note: "", intensity: 6 },
    { name: "Preacher Curl",      sets: "4", reps: "8–10", note: "", intensity: 6 },
    { name: "Hammer Curl",        sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Concentration Curl", sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Reverse Grip Curl",  sets: "4", reps: "8–10", note: "", intensity: 4 },
    { name: "21s",                sets: "4", reps: "21",   note: "", intensity: 6 },
    { name: "EZ Bar Curl",        sets: "4", reps: "6–8",  note: "", intensity: 7 },
    { name: "Seated EZ Bar Curl", sets: "4", reps: "6–8",  note: "", intensity: 7 },
  ],
  "Legs (Compound)": [
    { name: "Calf Raises",           sets: "4", reps: "10",   note: "", intensity: 3 },
    { name: "Step Ups",              sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Hack Squat",            sets: "4", reps: "6–8",  note: "", intensity: 8 },
    { name: "Pendulum Squat",        sets: "4", reps: "6–8",  note: "", intensity: 9 },
    { name: "RDL",                   sets: "4", reps: "6–8",  note: "", intensity: 7 },
    { name: "Box Squat",             sets: "4", reps: "6–8",  note: "", intensity: 8 },
    { name: "Barbell Squat",         sets: "4", reps: "6–8",  note: "", intensity: 9 },
    { name: "Bulgarian Split Squat", sets: "4", reps: "8–10", note: "", intensity: 7 },
    { name: "Elevated Lunges",       sets: "4", reps: "8–10", note: "", intensity: 6 },
    { name: "Walking Lunges",        sets: "4", reps: "8–10", note: "", intensity: 6 },
    { name: "Static Lunges",         sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Leg Press",             sets: "4", reps: "6–8",  note: "", intensity: 7 },
  ],
  "Legs (Isolated)": [
    { name: "Leg Extension",   sets: "4", reps: "8–10", note: "", intensity: 4 },
    { name: "Seated Leg Curl", sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Lying Leg Curl",  sets: "4", reps: "8–10", note: "", intensity: 5 },
    { name: "Single Leg Curl", sets: "4", reps: "8–10", note: "", intensity: 4 },
    { name: "Calf Raises",     sets: "4", reps: "10",   note: "", intensity: 3 },
    { name: "Adductor",        sets: "4", reps: "10",   note: "", intensity: 3 },
    { name: "Abductor",        sets: "4", reps: "10",   note: "", intensity: 3 },
  ],
};

const SPLITS = [
  { id: "chest-tri",      label: "Chest / Triceps",  img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=120&h=120&fit=crop",  groups: ["Chest", "Triceps"],                                    color: "#FF3D00", accent: "#FF7043", fullBody: false },
  { id: "legs",           label: "Legs",             img: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=120&h=120&fit=crop",  groups: ["Legs (Compound)"],                                     color: "#FFB300", accent: "#FFD54F", fullBody: false },
  { id: "back-bi",        label: "Back / Biceps",    img: "https://images.unsplash.com/photo-1597347343908-2937e7dcc560?w=120&h=120&fit=crop",  groups: ["Back", "Biceps"],                                      color: "#00E5FF", accent: "#80DEEA", fullBody: false },
  { id: "shoulders-legs", label: "Shoulders / Legs", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=120&h=120&fit=crop",  groups: ["Shoulders", "Legs (Isolated)"],                        color: "#D500F9", accent: "#EA80FC", fullBody: false },
  { id: "full-body",      label: "Full Body",        img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=120&h=120&fit=crop",  groups: ["Chest", "Back", "Legs (Compound)", "Shoulders"],       color: "#76FF03", accent: "#CCFF90", fullBody: true  },
];

const MIN_PER_GROUP = 3;
const DEFAULT_TOTAL = 7;
const REST_DURATION = 90;
// ============================================================
//  END OF CONFIGURATION
// ============================================================

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function distributeExercises(groups, total, fullBody) {
  const minPer = fullBody ? 1 : MIN_PER_GROUP;
  const counts = groups.reduce((acc, g) => ({ ...acc, [g]: minPer }), {});
  let remaining = Math.max(0, total - minPer * groups.length);
  let attempts = 0;
  while (remaining > 0 && attempts < 1000) {
    attempts++;
    const pick = groups[Math.floor(Math.random() * groups.length)];
    if (counts[pick] < EXERCISE_BANK[pick].length) { counts[pick]++; remaining--; }
  }
  return counts;
}

const COMPOUND_NAMES = [
  "Flat Bench Press","Incline Bench Press","Decline Bench Press","Push Up",
  "Barbell Row","Chest Supported Row","Pull Up","Seated Row Machine",
  "Barbell Squat","Box Squat","Hack Squat","Pendulum Squat","Leg Press",
  "Bulgarian Split Squat","Elevated Lunges","Walking Lunges","Static Lunges","Step Ups","RDL",
  "Standing Barbell Press","Dumbbell Press","Arnold Press",
];

function orderByIntensity(exercises, total) {
  const sorted = [...exercises].sort((a, b) => b.intensity - a.intensity);
  if (total <= 5) return sorted;
  const peaks = sorted.filter(e => e.intensity >= 8);
  const mediums = sorted.filter(e => e.intensity >= 5 && e.intensity < 8);
  const light = sorted.filter(e => e.intensity < 5);
  const result = []; const used = new Set(); let mi = 0;
  peaks.forEach((ex, i) => {
    result.push(ex); used.add(ex.name);
    if (i < peaks.length - 1 && mi < mediums.length) { result.push(mediums[mi++]); used.add(mediums[mi-1].name); }
  });
  mediums.forEach(e => { if (!used.has(e.name)) result.push(e); });
  light.forEach(e => result.push(e));
  return result;
}

function generateWorkout(split, total) {
  const counts = distributeExercises(split.groups, total, split.fullBody);
  const sections = split.groups.map(group => {
    let pool = split.fullBody
      ? [...shuffle(EXERCISE_BANK[group].filter(e => COMPOUND_NAMES.includes(e.name))), ...shuffle(EXERCISE_BANK[group].filter(e => !COMPOUND_NAMES.includes(e.name)))]
      : shuffle(EXERCISE_BANK[group]);
    const ordered = orderByIntensity(pool.slice(0, counts[group]), total);
    const displayGroup = group.startsWith("Legs") ? "Leg" : group;
    return { group, displayGroup, exercises: ordered };
  });
  return { sections, startTime: Date.now() };
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
function formatDuration(ms) {
  const m = Math.floor(ms / 60000);
  return m < 1 ? "< 1 min" : `${m} min`;
}

function loadStorage(key) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } catch { return null; }
}
function saveStorage(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export default function WorkoutApp() {
  const [screen, setScreen] = useState("home");
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [total, setTotal] = useState(DEFAULT_TOTAL);
  const [workout, setWorkout] = useState({ sections: [], startTime: null });
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({});
  const [justChecked, setJustChecked] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerLeft, setTimerLeft] = useState(REST_DURATION);
  const timerRef = useRef(null);
  const [prModal, setPrModal] = useState(null);
  const [prWeight, setPrWeight] = useState("");
  const [prReps, setPrReps] = useState("");
  const [prs, setPrs] = useState({});
  const [history, setHistory] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [mounted, setMounted] = useState(false);

  const color = selectedSplit?.color ?? "#FF3D00";
  const accent = selectedSplit?.accent ?? "#FF7043";
  const minTotal = selectedSplit ? (selectedSplit.fullBody ? 6 : MIN_PER_GROUP * selectedSplit.groups.length) : MIN_PER_GROUP;
  const maxTotal = selectedSplit ? (selectedSplit.fullBody ? 8 : selectedSplit.groups.reduce((s, g) => s + EXERCISE_BANK[g].length, 0)) : 20;
  const { sections } = workout;
  const allKeys = sections.flatMap((s, si) => s.exercises.map((_, ei) => `${si}-${ei}`));
  const completedCount = allKeys.filter(k => checked[k]).length;
  const totalCount = allKeys.length;
  const allDone = totalCount > 0 && completedCount === totalCount;

  useEffect(() => {
    setMounted(true);
    const savedPrs = loadStorage("dg-prs");
    if (savedPrs) setPrs(savedPrs);
    const savedHistory = loadStorage("dg-history");
    if (savedHistory) setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimerLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); setTimerActive(false); return REST_DURATION; }
          return t - 1;
        });
      }, 1000);
    } else { clearInterval(timerRef.current); }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  useEffect(() => {
    if (allDone && totalCount > 0 && !showSummary) {
      const duration = workout.startTime ? Date.now() - workout.startTime : 0;
      const exList = sections.flatMap(s => s.exercises.map(e => e.name));
      const data = { split: selectedSplit.label, color, date: Date.now(), duration, exercises: exList, total: totalCount };
      setSummaryData(data);
      const newHistory = [data, ...history].slice(0, 30);
      setHistory(newHistory);
      saveStorage("dg-history", newHistory);
      setTimeout(() => setShowSummary(true), 700);
    }
  }, [allDone]);

  function selectSplit(split) {
    setSelectedSplit(split);
    setTotal(split.fullBody ? 7 : Math.max(DEFAULT_TOTAL, MIN_PER_GROUP * split.groups.length));
    setScreen("configure");
  }

  function generate() {
    setWorkout(generateWorkout(selectedSplit, total));
    setChecked({}); setExpanded({}); setShowSummary(false); setSummaryData(null);
    setTimerActive(false); setTimerLeft(REST_DURATION);
    setScreen("workout");
  }

  function handleCheck(key) {
    const nowDone = !checked[key];
    setChecked(c => ({ ...c, [key]: nowDone }));
    if (nowDone) {
      setJustChecked(key);
      setTimeout(() => setJustChecked(null), 600);
      setTimerLeft(REST_DURATION);
      setTimerActive(true);
    }
  }

  function swapExercise(si, ei) {
    const section = sections[si];
    const current = section.exercises[ei];
    const usedNames = new Set(section.exercises.map(e => e.name));
    const candidates = EXERCISE_BANK[section.group].filter(e => e.name !== current.name && !usedNames.has(e.name));
    if (!candidates.length) return;
    const preferred = candidates.filter(e => Math.abs(e.intensity - current.intensity) <= 2);
    const pool = preferred.length > 0 ? preferred : candidates;
    const replacement = pool[Math.floor(Math.random() * pool.length)];
    const newSections = sections.map((s, sIdx) => sIdx !== si ? s : { ...s, exercises: s.exercises.map((ex, eIdx) => eIdx === ei ? replacement : ex) });
    setWorkout(w => ({ ...w, sections: newSections }));
    setChecked(c => { const n = { ...c }; delete n[`${si}-${ei}`]; return n; });
    setExpanded(e => { const n = { ...e }; delete n[`${si}-${ei}`]; return n; });
  }

  function openPrModal(exName) {
    const existing = prs[exName];
    setPrModal(exName);
    setPrWeight(existing?.weight ?? "");
    setPrReps(existing?.reps ?? "");
  }

  function savePr() {
    if (!prWeight || !prReps || !prModal) return;
    const updated = { ...prs, [prModal]: { weight: prWeight, reps: prReps, date: Date.now() } };
    setPrs(updated);
    saveStorage("dg-prs", updated);
    setPrModal(null);
  }

  const timerPct = (timerLeft / REST_DURATION) * 100;
  const timerColor = timerLeft > 30 ? "#76FF03" : timerLeft > 10 ? "#FFB300" : "#FF3D00";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#080808", minHeight: "100vh", maxWidth: 430, margin: "0 auto", color: "#fff", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }

        .screen-enter { animation: slideUp 0.3s cubic-bezier(0.22,1,0.36,1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

        .split-card {
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.12s ease;
        }
        .split-card:active { transform: scale(0.97); }

        .cnt-btn {
          background: #161616;
          border: 1px solid #2a2a2a;
          color: #fff;
          width: 52px; height: 52px;
          border-radius: 14px;
          font-size: 24px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
          font-family: 'Barlow Condensed', sans-serif;
        }
        .cnt-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        .cnt-btn:not(:disabled):hover { background: #222; border-color: #444; }

        .main-btn {
          border: none; cursor: pointer;
          border-radius: 4px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 3px;
          padding: 16px 0;
          width: 100%;
          transition: transform 0.1s, filter 0.15s;
          text-transform: uppercase;
        }
        .main-btn:active { transform: scale(0.98); filter: brightness(0.88); }

        .back {
          background: none; border: none; color: #444;
          font-size: 12px; font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          font-family: 'Barlow Condensed', sans-serif;
          padding: 0; text-transform: uppercase;
          transition: color 0.15s;
        }
        .back:hover { color: #888; }

        .ex-card {
          position: relative;
          transition: opacity 0.3s ease;
          border-radius: 4px;
          overflow: hidden;
        }
        .ex-card.just-done { animation: snapCheck 0.45s cubic-bezier(0.22,1,0.36,1); }
        @keyframes snapCheck {
          0%   { transform: scale(1); }
          35%  { transform: scale(1.04); }
          65%  { transform: scale(0.98); }
          100% { transform: scale(1); }
        }

        .chk {
          width: 30px; height: 30px;
          border-radius: 4px;
          border: 2px solid #2a2a2a;
          cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s cubic-bezier(0.22,1,0.36,1);
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
        }

        .swap-btn {
          background: none;
          border: 1px solid #2a2a2a;
          border-radius: 4px;
          color: #3a3a3a;
          font-size: 13px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 4px 9px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .swap-btn:hover { border-color: #555; color: #888; }

        .pr-btn {
          background: none;
          border: 1px solid #2a2a2a;
          border-radius: 4px;
          color: #3a3a3a;
          font-size: 13px;
          padding: 4px 8px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .pr-btn.has-pr { border-color: #FFB30040; color: #FFB300; }
        .pr-btn:hover { border-color: #FFB300; color: #FFB300; }

        .note-toggle {
          background: none; border: none;
          cursor: pointer; font-size: 11px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; letter-spacing: 1px;
          padding: 4px 0; transition: color 0.15s;
          color: #333;
        }

        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.88);
          z-index: 100;
          display: flex; align-items: flex-end; justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        .modal-sheet {
          background: #111;
          border-top: 1px solid #222;
          padding: 32px 24px 44px;
          width: 100%; max-width: 430px;
          animation: sheetUp 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .modal-input {
          background: #161616;
          border: 1px solid #2a2a2a;
          border-radius: 4px;
          color: #fff;
          font-size: 18px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          padding: 14px 16px;
          width: 100%; outline: none;
          transition: border-color 0.15s;
        }
        .modal-input:focus { border-color: #FFB300; }

        .summary-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 99;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: fadeIn 0.35s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .history-row {
          border-bottom: 1px solid #141414;
          padding: 16px 0;
        }
        .history-row:last-child { border-bottom: none; }

        .timer-bar {
          position: fixed; top: 0; left: 50%; transform: translateX(-50%);
          width: 100%; max-width: 430px; z-index: 50;
          background: #0d0d0d;
          border-bottom: 1px solid #1a1a1a;
          padding: 10px 20px;
          display: flex; align-items: center; gap: 14px;
          animation: slideDown 0.2s ease;
        }
        @keyframes slideDown { from { transform: translateX(-50%) translateY(-100%); } to { transform: translateX(-50%) translateY(0); } }

        .progress-track {
          flex: 1; background: #161616;
          border-radius: 2px; height: 5px; overflow: hidden;
        }
        .progress-fill {
          height: 100%; border-radius: 2px;
          transition: width 1s linear, background 0.5s;
        }
      `}</style>

      {/* ── PR MODAL ── */}
      {prModal && (
        <div className="modal-overlay" onClick={() => setPrModal(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 4, color: "#FFB300", marginBottom: 4, fontWeight: 700 }}>PERSONAL RECORD</div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 30, fontWeight: 900, marginBottom: 20, lineHeight: 1 }}>{prModal}</div>
            {prs[prModal] && (
              <div style={{ background: "#FFB30010", borderLeft: "3px solid #FFB300", padding: "10px 14px", marginBottom: 18, fontSize: 14, color: "#FFB300", fontFamily: "'Barlow Condensed'", fontWeight: 600, letterSpacing: 1 }}>
                CURRENT PR — {prs[prModal].weight} LBS × {prs[prModal].reps} REPS
              </div>
            )}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#444", fontSize: 11, letterSpacing: 2, marginBottom: 8, fontFamily: "'Barlow Condensed'", fontWeight: 700 }}>WEIGHT (LBS)</div>
                <input className="modal-input" type="number" placeholder="225" value={prWeight} onChange={e => setPrWeight(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#444", fontSize: 11, letterSpacing: 2, marginBottom: 8, fontFamily: "'Barlow Condensed'", fontWeight: 700 }}>REPS</div>
                <input className="modal-input" type="number" placeholder="6" value={prReps} onChange={e => setPrReps(e.target.value)} />
              </div>
            </div>
            <button className="main-btn" style={{ background: "#FFB300", color: "#000", marginBottom: 10 }} onClick={savePr}>SAVE PR</button>
            <button className="main-btn" style={{ background: "transparent", color: "#333", border: "1px solid #1e1e1e" }} onClick={() => setPrModal(null)}>CANCEL</button>
          </div>
        </div>
      )}

      {/* ── COMPLETION SUMMARY ── */}
      {showSummary && summaryData && (
        <div className="summary-overlay">
          <div style={{ background: "#0e0e0e", border: `1px solid ${summaryData.color}30`, borderRadius: 4, padding: 28, width: "100%", maxWidth: 390, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 64, fontWeight: 900, color: summaryData.color, lineHeight: 1, letterSpacing: 2 }}>DONE.</div>
              <div style={{ color: "#333", fontSize: 13, fontFamily: "'Barlow Condensed'", letterSpacing: 2, marginTop: 4 }}>{formatDate(summaryData.date)}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[
                { label: "SPLIT", value: summaryData.split },
                { label: "TIME", value: formatDuration(summaryData.duration) },
                { label: "EXERCISES", value: summaryData.total },
                { label: "SETS", value: summaryData.total * 4 },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "#141414", borderLeft: `3px solid ${summaryData.color}`, padding: "14px 16px" }}>
                  <div style={{ color: "#444", fontSize: 10, letterSpacing: 2, fontFamily: "'Barlow Condensed'", fontWeight: 700, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 26, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#141414", padding: "16px", marginBottom: 20 }}>
              <div style={{ color: "#333", fontSize: 10, letterSpacing: 2, fontFamily: "'Barlow Condensed'", fontWeight: 700, marginBottom: 12 }}>EXERCISES</div>
              {summaryData.exercises.map((name, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 8, marginBottom: 8, borderBottom: i < summaryData.exercises.length - 1 ? "1px solid #1a1a1a" : "none" }}>
                  <span style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 16, color: summaryData.color, minWidth: 22 }}>{i + 1}</span>
                  <span style={{ color: "#888", fontSize: 14, fontFamily: "'Barlow Condensed'", fontWeight: 600, letterSpacing: 0.5 }}>{name}</span>
                </div>
              ))}
            </div>
            <button className="main-btn" style={{ background: summaryData.color, color: "#000", marginBottom: 10 }} onClick={() => { setShowSummary(false); setScreen("home"); }}>BACK TO HOME</button>
            <button className="main-btn" style={{ background: "transparent", color: "#333", border: "1px solid #1e1e1e" }} onClick={() => setShowSummary(false)}>KEEP VIEWING</button>
          </div>
        </div>
      )}

      {/* ── REST TIMER ── */}
      {timerActive && (
        <div className="timer-bar">
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 3, color: "#333", fontWeight: 700, whiteSpace: "nowrap" }}>REST</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ background: timerColor, width: `${timerPct}%` }} />
          </div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 900, color: timerColor, minWidth: 44, textAlign: "right" }}>{timerLeft}s</div>
          <button onClick={() => { setTimerActive(false); setTimerLeft(REST_DURATION); }} style={{ background: "none", border: "none", color: "#2a2a2a", cursor: "pointer", fontSize: 16, padding: 0, lineHeight: 1 }}>✕</button>
        </div>
      )}

      {/* ── HOME ── */}
      {screen === "home" && (
        <div className="screen-enter" style={{ padding: "56px 20px 40px" }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 72, fontWeight: 900, lineHeight: 0.88, letterSpacing: -1, color: "#fff" }}>
                  DAILY<br />
                  <span style={{ color: "#FF3D00", WebkitTextStroke: "0px" }}>GRIND</span>
                </div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, letterSpacing: 4, color: "#333", marginTop: 10, fontWeight: 700 }}>SELECT YOUR SPLIT</div>
              </div>
              <button onClick={() => setScreen("history")} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 4, padding: "8px 14px", color: "#444", fontSize: 11, cursor: "pointer", fontFamily: "'Barlow Condensed'", fontWeight: 700, letterSpacing: 2, marginTop: 4 }}>
                HISTORY
              </button>
            </div>
          </div>

          {/* Split Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SPLITS.map((s, idx) => (
              <div
                key={s.id}
                className="split-card"
                onClick={() => selectSplit(s)}
                style={{
                  background: "#0f0f0f",
                  border: "1px solid #1a1a1a",
                  borderLeft: `4px solid ${s.color}`,
                  padding: "20px 20px",
                  animation: `slideUp 0.3s cubic-bezier(0.22,1,0.36,1) ${idx * 0.05}s both`,
                }}
              >
                {/* Color slash accent */}
                <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: "100%", background: `linear-gradient(to left, ${s.color}08, transparent)`, pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 4, overflow: "hidden", flexShrink: 0, border: `1px solid ${s.color}30`, background: s.color + "15" }}>
                    <img
                      src={s.img}
                      alt={s.label}
                      onError={e => { e.target.style.display = "none"; }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8) contrast(1.15) saturate(0.9)" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 900, letterSpacing: 1, lineHeight: 1 }}>{s.label.toUpperCase()}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                      {s.groups.map(g => (
                        <span key={g} style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 10, letterSpacing: 2, color: s.color, background: s.color + "12", padding: "2px 8px", borderRadius: 2 }}>
                          {g.replace(" (Compound)", "").replace(" (Isolated)", "")}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 28, color: "#222", fontWeight: 900 }}>›</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", color: "#1a1a1a", fontSize: 10, letterSpacing: 3, fontFamily: "'Barlow Condensed'", fontWeight: 700, marginTop: 44 }}>DAILY GRIND • FULL GYM</div>
        </div>
      )}

      {/* ── HISTORY ── */}
      {screen === "history" && (
        <div className="screen-enter" style={{ padding: "56px 20px 40px" }}>
          <button className="back" onClick={() => setScreen("home")}>← BACK</button>
          <div style={{ marginTop: 28, marginBottom: 32 }}>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 56, fontWeight: 900, lineHeight: 0.9, letterSpacing: 1 }}>WORKOUT<br /><span style={{ color: "#FF3D00" }}>HISTORY</span></div>
          </div>
          {history.length === 0 ? (
            <div style={{ textAlign: "center", color: "#222", padding: "60px 0", fontFamily: "'Barlow Condensed'", fontSize: 16, letterSpacing: 2, fontWeight: 700 }}>NO WORKOUTS YET</div>
          ) : (
            history.map((h, i) => (
              <div key={i} className="history-row">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 800, letterSpacing: 1 }}>{h.split.toUpperCase()}</div>
                    <div style={{ color: "#444", fontSize: 12, fontFamily: "'Barlow Condensed'", letterSpacing: 1, marginTop: 3, fontWeight: 600 }}>
                      {formatDate(h.date).toUpperCase()} · {formatDuration(h.duration)} · {h.total} EXERCISES
                    </div>
                  </div>
                  <div style={{ width: 3, height: 36, background: h.color, borderRadius: 2, flexShrink: 0 }} />
                </div>
              </div>
            ))
          )}
          {history.length > 0 && (
            <button onClick={() => { setHistory([]); saveStorage("dg-history", []); }} style={{ marginTop: 32, background: "none", border: "1px solid #1e1e1e", borderRadius: 4, color: "#2a2a2a", fontSize: 12, fontFamily: "'Barlow Condensed'", fontWeight: 700, letterSpacing: 2, padding: "12px 20px", cursor: "pointer", width: "100%" }}>
              CLEAR HISTORY
            </button>
          )}
        </div>
      )}

      {/* ── CONFIGURE ── */}
      {screen === "configure" && selectedSplit && (
        <div className="screen-enter" style={{ padding: "56px 20px 40px" }}>
          <button className="back" onClick={() => setScreen("home")}>← BACK</button>

          {/* Big color header */}
          <div style={{ marginTop: 28, marginBottom: 36, position: "relative" }}>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 4, color, fontWeight: 700, marginBottom: 4 }}>TODAY'S SPLIT</div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 58, fontWeight: 900, lineHeight: 0.9, letterSpacing: 1 }}>
              {selectedSplit.label.split("/").map((part, i) => (
                <div key={i} style={{ color: i === 0 ? "#fff" : color }}>{part.trim().toUpperCase()}</div>
              ))}
            </div>
          </div>

          {/* Counter */}
          <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderLeft: `4px solid ${color}`, padding: "28px 24px", marginBottom: 28 }}>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 3, color: "#333", fontWeight: 700, marginBottom: 20 }}>TOTAL EXERCISES</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button className="cnt-btn" disabled={total <= minTotal} onClick={() => setTotal(t => t - 1)}>−</button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 96, fontWeight: 900, lineHeight: 1, color }}>{total}</div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 3, color: "#333", fontWeight: 700, marginTop: 2 }}>EXERCISES</div>
              </div>
              <button className="cnt-btn" disabled={total >= maxTotal} onClick={() => setTotal(t => t + 1)}>+</button>
            </div>
          </div>

          <button className="main-btn" style={{ background: color, color: "#000" }} onClick={generate}>
            GENERATE WORKOUT
          </button>
        </div>
      )}

      {/* ── WORKOUT ── */}
      {screen === "workout" && selectedSplit && (
        <div className="screen-enter" style={{ padding: `${timerActive ? 78 : 56}px 20px 120px` }}>
          <button className="back" onClick={() => setScreen("configure")}>← BACK</button>

          {/* Workout header */}
          <div style={{ marginTop: 20, marginBottom: 6 }}>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 4, color, fontWeight: 700 }}>{selectedSplit.label.toUpperCase()} DAY</div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 52, fontWeight: 900, lineHeight: 0.9, letterSpacing: 1, marginTop: 2 }}>YOUR<br />WORKOUT</div>
          </div>

          {/* Progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0 28px" }}>
            <div style={{ flex: 1, background: "#161616", borderRadius: 2, height: 4, overflow: "hidden" }}>
              <div style={{ background: color, height: "100%", width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%`, borderRadius: 2, transition: "width 0.4s ease" }} />
            </div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, color: "#333", letterSpacing: 1, whiteSpace: "nowrap" }}>
              {completedCount}<span style={{ color: "#222" }}>/{totalCount}</span>
            </div>
          </div>

          {(() => {
            let exerciseNumber = 0;
            return sections.map((section, si) => (
              <div key={si} style={{ marginBottom: 32 }}>
                {/* Section label */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 4, color: "#2a2a2a", fontWeight: 700 }}>{section.displayGroup.toUpperCase()}</div>
                  <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {section.exercises.map((ex, ei) => {
                    exerciseNumber++;
                    const num = exerciseNumber;
                    const key = `${si}-${ei}`;
                    const done = checked[key];
                    const isExpanded = expanded[key];
                    const isPopping = justChecked === key;
                    const hasPr = !!prs[ex.name];
                    return (
                      <div key={key} className={`ex-card${isPopping ? " just-done" : ""}`}
                        style={{
                          background: done ? "#090909" : "#0f0f0f",
                          border: "1px solid #161616",
                          borderLeft: `3px solid ${done ? "#1e1e1e" : color}`,
                          opacity: done ? 0.4 : 1,
                        }}
                      >
                        <div style={{ padding: "14px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                          {/* Checkbox */}
                          <div className="chk" onClick={() => handleCheck(key)}
                            style={{ background: done ? color : "transparent", borderColor: done ? color : "#252525" }}>
                            {done
                              ? <span style={{ fontSize: 14, color: "#000", fontWeight: 900 }}>✓</span>
                              : <span style={{ fontSize: 13, color: "#2e2e2e", fontWeight: 900 }}>{num}</span>
                            }
                          </div>

                          {/* Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: 18, letterSpacing: 0.5, textDecoration: done ? "line-through" : "none", color: done ? "#2a2a2a" : "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {ex.name.toUpperCase()}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3, flexWrap: "wrap" }}>
                              {(ex.sets || ex.reps) && (
                                <span style={{ fontFamily: "'Barlow Condensed'", color: "#3a3a3a", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
                                  {ex.sets && `${ex.sets} SETS`}{ex.sets && ex.reps && " · "}{ex.reps && `${ex.reps} REPS`}
                                </span>
                              )}
                              {hasPr && (
                                <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#FFB300", background: "#FFB30012", padding: "2px 7px", borderRadius: 2 }}>
                                  PR {prs[ex.name].weight}×{prs[ex.name].reps}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                            {!done && <button className="swap-btn" onClick={() => swapExercise(si, ei)}>⟳</button>}
                            <button className={`pr-btn${hasPr ? " has-pr" : ""}`} onClick={() => openPrModal(ex.name)}>🏆</button>
                            {ex.note && (
                              <button className="note-toggle" onClick={() => setExpanded(e => ({ ...e, [key]: !e[key] }))} style={{ color: isExpanded ? color : "#2a2a2a" }}>
                                {isExpanded ? "▲" : "▼"}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Note */}
                        {ex.note && isExpanded && (
                          <div style={{ padding: "0 14px 14px 56px" }}>
                            <div style={{ borderLeft: `2px solid ${color}50`, paddingLeft: 12, color: "#555", fontSize: 13, lineHeight: 1.6, fontFamily: "'DM Sans'" }}>
                              {ex.note}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ));
          })()}

          {/* Regenerate */}
          <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "16px 20px 28px", background: "linear-gradient(transparent, #080808 45%)" }}>
            <button className="main-btn" style={{ background: "#111", color: "#333", border: "1px solid #1a1a1a" }} onClick={generate}>
              ⟳ REGENERATE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
