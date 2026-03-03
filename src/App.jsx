import { useState, useEffect, useRef } from "react";

// ============================================================
//  CREATOR CONFIGURATION
// ============================================================

const BRO_EXERCISE_BANK = {
  Back: [
    { name: "Dumbbell Row",           sets: "4", reps: "8-10",  note: "", intensity: 6 },
    { name: "Chest Supported Row",    sets: "4", reps: "8-10",  note: "", intensity: 6 },
    { name: "Lat Pulldown",           sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Pull Up",                sets: "4", reps: "6-8",   note: "", intensity: 7 },
    { name: "Straight Arm Pulldown",  sets: "4", reps: "8-10",  note: "", intensity: 4 },
    { name: "Seated Cable Row",       sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Rack Pull",              sets: "4", reps: "6-8",   note: "", intensity: 9 },
    { name: "Seated Row Machine",     sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Barbell Row",            sets: "4", reps: "6-8",   note: "", intensity: 8 },
    { name: "Face Pull",              sets: "4", reps: "10",    note: "", intensity: 3 },
  ],
  Chest: [
    { name: "Flat Bench Press",    sets: "4", reps: "6-8",   note: "", intensity: 9 },
    { name: "Incline Bench Press", sets: "4", reps: "6-8",   note: "", intensity: 8 },
    { name: "Decline Bench Press", sets: "4", reps: "6-8",   note: "", intensity: 7 },
    { name: "Dumbbell Fly",        sets: "4", reps: "8-10",  note: "", intensity: 4 },
    { name: "Push Up",             sets: "4", reps: "8-10",  note: "", intensity: 4 },
  ],
  Shoulders: [
    { name: "Upright Row",                    sets: "4", reps: "8-10",  note: "", intensity: 6 },
    { name: "Shrug",                          sets: "4", reps: "8-10",  note: "", intensity: 3 },
    { name: "Lateral Raise",                  sets: "4", reps: "8-10",  note: "", intensity: 4 },
    { name: "Rear Delt Fly",                  sets: "4", reps: "8-10",  note: "", intensity: 4 },
    { name: "Standing Barbell Press",         sets: "4", reps: "6-8",   note: "", intensity: 9 },
    { name: "Dumbbell Press",                 sets: "4", reps: "6-8",   note: "", intensity: 7 },
    { name: "Arnold Press",                   sets: "4", reps: "6-8",   note: "", intensity: 7 },
    { name: "Front Raise",                    sets: "4", reps: "8-10",  note: "", intensity: 4 },
    { name: "Side to Front Raise",            sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Cable Single Arm Lateral Raise", sets: "4", reps: "8-10",  note: "", intensity: 3 },
  ],
  Triceps: [
    { name: "V-Handle Pushdown",      sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Rope Pulldown",          sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Straight Bar Pushdown",  sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Reverse Grip Pulldown",  sets: "4", reps: "8-10",  note: "", intensity: 4 },
    { name: "Skullcrusher",           sets: "4", reps: "6-8",   note: "", intensity: 7 },
    { name: "Overhead Rope Pull",     sets: "4", reps: "8-10",  note: "", intensity: 6 },
    { name: "Close Grip Bench Press", sets: "4", reps: "6-8",   note: "", intensity: 8 },
    { name: "Dips",                   sets: "4", reps: "6-8",   note: "", intensity: 7 },
  ],
  Biceps: [
    { name: "Dumbbell Curl",      sets: "4", reps: "8-10",  note: "", intensity: 6 },
    { name: "Preacher Curl",      sets: "4", reps: "8-10",  note: "", intensity: 6 },
    { name: "Hammer Curl",        sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Concentration Curl", sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Reverse Grip Curl",  sets: "4", reps: "8-10",  note: "", intensity: 4 },
    { name: "21s",                sets: "4", reps: "21",    note: "", intensity: 6 },
    { name: "EZ Bar Curl",        sets: "4", reps: "6-8",   note: "", intensity: 7 },
    { name: "Seated EZ Bar Curl", sets: "4", reps: "6-8",   note: "", intensity: 7 },
  ],
  "Legs (Compound)": [
    { name: "Calf Raises",           sets: "4", reps: "10",    note: "", intensity: 3 },
    { name: "Step Ups",              sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Hack Squat",            sets: "4", reps: "6-8",   note: "", intensity: 8 },
    { name: "Pendulum Squat",        sets: "4", reps: "6-8",   note: "", intensity: 9 },
    { name: "RDL",                   sets: "4", reps: "6-8",   note: "", intensity: 7 },
    { name: "Box Squat",             sets: "4", reps: "6-8",   note: "", intensity: 8 },
    { name: "Barbell Squat",         sets: "4", reps: "6-8",   note: "", intensity: 9 },
    { name: "Bulgarian Split Squat", sets: "4", reps: "8-10",  note: "", intensity: 7 },
    { name: "Elevated Lunges",       sets: "4", reps: "8-10",  note: "", intensity: 6 },
    { name: "Walking Lunges",        sets: "4", reps: "8-10",  note: "", intensity: 6 },
    { name: "Static Lunges",         sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Leg Press",             sets: "4", reps: "6-8",   note: "", intensity: 7 },
  ],
  "Legs (Isolated)": [
    { name: "Leg Extension",   sets: "4", reps: "8-10",  note: "", intensity: 4 },
    { name: "Seated Leg Curl", sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Lying Leg Curl",  sets: "4", reps: "8-10",  note: "", intensity: 5 },
    { name: "Single Leg Curl", sets: "4", reps: "8-10",  note: "", intensity: 4 },
    { name: "Calf Raises",     sets: "4", reps: "10",    note: "", intensity: 3 },
    { name: "Adductor",        sets: "4", reps: "10",    note: "", intensity: 3 },
    { name: "Abductor",        sets: "4", reps: "10",    note: "", intensity: 3 },
  ],
};

const BRO_SPLITS = [
  { id: "chest-tri",      label: "Chest / Triceps",  img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=120&h=120&fit=crop", groups: ["Chest","Triceps"],                                    color: "#FF3D00", fullBody: false },
  { id: "legs",           label: "Legs",             img: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=120&h=120&fit=crop", groups: ["Legs (Compound)"],                                    color: "#FFB300", fullBody: false },
  { id: "back-bi",        label: "Back / Biceps",    img: "https://images.unsplash.com/photo-1597347343908-2937e7dcc560?w=120&h=120&fit=crop", groups: ["Back","Biceps"],                                      color: "#00E5FF", fullBody: false },
  { id: "shoulders-legs", label: "Shoulders / Legs", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=120&h=120&fit=crop", groups: ["Shoulders","Legs (Isolated)"],                        color: "#D500F9", fullBody: false },
  { id: "full-body",      label: "Full Body",        img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=120&h=120&fit=crop", groups: ["Chest","Back","Legs (Compound)","Shoulders"],          color: "#76FF03", fullBody: true  },
];

const WIFEY_COLOR = "#FF6B9D";

const WIFEY_FULL_BODY_BANK = {
  Chest: [
    { name: "Dumbbell Fly",        sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Incline Bench Press", sets: "3", reps: "12-15", note: "", intensity: 6 },
    { name: "Push Up",             sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Flat Bench Press",    sets: "3", reps: "12-15", note: "", intensity: 7 },
    { name: "Decline Bench Press", sets: "3", reps: "12-15", note: "", intensity: 5 },
  ],
  Back: [
    { name: "Lat Pulldown",          sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Seated Cable Row",      sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Dumbbell Row",          sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Chest Supported Row",   sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Straight Arm Pulldown", sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Face Pull",             sets: "3", reps: "15",    note: "", intensity: 3 },
  ],
  Shoulders: [
    { name: "Lateral Raise",  sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Front Raise",    sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Rear Delt Fly",  sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Dumbbell Press", sets: "3", reps: "12-15", note: "", intensity: 6 },
    { name: "Arnold Press",   sets: "3", reps: "12-15", note: "", intensity: 6 },
    { name: "Upright Row",    sets: "3", reps: "12-15", note: "", intensity: 5 },
  ],
  Legs: [
    { name: "Leg Press",             sets: "3", reps: "12-15", note: "", intensity: 6 },
    { name: "RDL",                   sets: "3", reps: "12-15", note: "", intensity: 6 },
    { name: "Walking Lunges",        sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Bulgarian Split Squat", sets: "3", reps: "12-15", note: "", intensity: 6 },
    { name: "Leg Extension",         sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Seated Leg Curl",       sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Calf Raises",           sets: "3", reps: "15",    note: "", intensity: 3 },
    { name: "Abductor",              sets: "3", reps: "15",    note: "", intensity: 3 },
    { name: "Adductor",              sets: "3", reps: "15",    note: "", intensity: 3 },
    { name: "Step Ups",              sets: "3", reps: "12-15", note: "", intensity: 4 },
  ],
  Core: [
    { name: "Plank",            sets: "3", reps: "30-45 sec", note: "", intensity: 4 },
    { name: "Bicycle Crunches", sets: "3", reps: "15-20",     note: "", intensity: 4 },
    { name: "Leg Raises",       sets: "3", reps: "12-15",     note: "", intensity: 5 },
    { name: "Russian Twists",   sets: "3", reps: "15-20",     note: "", intensity: 4 },
    { name: "Dead Bug",         sets: "3", reps: "10-12",     note: "", intensity: 3 },
  ],
};

const WIFEY_CABLE_BANK = {
  "Upper Body": [
    { name: "Cable Lat Pulldown",            sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Seated Row",              sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Face Pull",               sets: "3", reps: "15",    note: "", intensity: 3 },
    { name: "Cable Single Arm Row",          sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Straight Arm Pulldown",   sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Fly Low to High",         sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Fly High to Low",         sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Chest Press",             sets: "3", reps: "12-15", note: "", intensity: 6 },
    { name: "Cable Lateral Raise",           sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Front Raise",             sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Rear Delt Fly",           sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Overhead Press",          sets: "3", reps: "12-15", note: "", intensity: 6 },
    { name: "Cable Upright Row",             sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Shrug",                   sets: "3", reps: "12-15", note: "", intensity: 3 },
  ],
  Arms: [
    { name: "Cable Bicep Curl",                sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Hammer Curl",               sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Reverse Curl",              sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Overhead Tricep Extension", sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Tricep Rope Pushdown",      sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Tricep Kickback",           sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Single Arm Curl",           sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Bar Curl",                  sets: "3", reps: "12-15", note: "", intensity: 5 },
  ],
  "Lower Body": [
    { name: "Cable Squat",            sets: "3", reps: "12-15", note: "", intensity: 6 },
    { name: "Cable Romanian Deadlift",sets: "3", reps: "12-15", note: "", intensity: 6 },
    { name: "Cable Glute Kickback",   sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Hip Abduction",    sets: "3", reps: "15",    note: "", intensity: 3 },
    { name: "Cable Hip Adduction",    sets: "3", reps: "15",    note: "", intensity: 3 },
    { name: "Cable Pull Through",     sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Leg Curl",         sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Calf Raise",       sets: "3", reps: "15",    note: "", intensity: 3 },
    { name: "Cable Lateral Lunge",    sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Step Through Lunge",sets:"3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Sumo Squat",       sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Good Morning",     sets: "3", reps: "12-15", note: "", intensity: 5 },
  ],
  Core: [
    { name: "Cable Crunch",             sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Woodchop High-Low",  sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Woodchop Low-High",  sets: "3", reps: "12-15", note: "", intensity: 5 },
    { name: "Cable Pallof Press",       sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Oblique Twist",      sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Seated Crunch",      sets: "3", reps: "12-15", note: "", intensity: 4 },
    { name: "Cable Kneeling Crunch",    sets: "3", reps: "12-15", note: "", intensity: 4 },
  ],
};

const CARDIO_OPTIONS = [
  { id: "stair-stepper",   label: "Stair Stepper",   emoji: "🪜" },
  { id: "incline-walking", label: "Incline Walking",  emoji: "⛰️" },
  { id: "flat-walking",    label: "Flat Walking",     emoji: "🚶" },
  { id: "running",         label: "Running",          emoji: "🏃" },
  { id: "jogging",         label: "Jogging",          emoji: "🏃" },
  { id: "pilates",         label: "Pilates",          emoji: "🧘" },
];

const MIN_PER_GROUP = 3;
const DEFAULT_TOTAL = 7;
const REST_DURATION = 90;
// ============================================================
//  END OF CONFIGURATION
// ============================================================

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function distributeExercises(bank, groups, total, minPer) {
  const counts = groups.reduce((acc, g) => ({ ...acc, [g]: minPer }), {});
  let remaining = Math.max(0, total - minPer * groups.length);
  let attempts = 0;
  while (remaining > 0 && attempts < 1000) {
    attempts++;
    const pick = groups[Math.floor(Math.random() * groups.length)];
    if (counts[pick] < bank[pick].length) { counts[pick]++; remaining--; }
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
    if (i < peaks.length - 1 && mi < mediums.length) { result.push(mediums[mi++]); used.add(mediums[mi - 1].name); }
  });
  mediums.forEach(e => { if (!used.has(e.name)) result.push(e); });
  light.forEach(e => result.push(e));
  return result;
}

function generateBroWorkout(split, total) {
  const minPer = split.fullBody ? 1 : MIN_PER_GROUP;
  const counts = distributeExercises(BRO_EXERCISE_BANK, split.groups, total, minPer);
  const sections = split.groups.map(group => {
    let pool = split.fullBody
      ? [...shuffle(BRO_EXERCISE_BANK[group].filter(e => COMPOUND_NAMES.includes(e.name))), ...shuffle(BRO_EXERCISE_BANK[group].filter(e => !COMPOUND_NAMES.includes(e.name)))]
      : shuffle(BRO_EXERCISE_BANK[group]);
    const ordered = orderByIntensity(pool.slice(0, counts[group]), total);
    const displayGroup = group.startsWith("Legs") ? "Leg" : group;
    return { group, displayGroup, exercises: ordered };
  });
  return { sections, startTime: Date.now() };
}

function generateWifeyWorkout(bank, total) {
  const groups = Object.keys(bank);
  const counts = distributeExercises(bank, groups, total, 1);
  const sections = groups.map(group => {
    const pool = shuffle(bank[group]);
    const ordered = orderByIntensity(pool.slice(0, counts[group]), total);
    return { group, displayGroup: group, exercises: ordered };
  });
  return { sections, startTime: Date.now() };
}

function getWeekKey(ts) {
  const d = new Date(ts);
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((day + 6) % 7));
  return monday.toISOString().slice(0, 10);
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
function formatDuration(ms) {
  const m = Math.floor(ms / 60000);
  return m < 1 ? "< 1 min" : `${m} min`;
}
function formatWeekLabel(weekKey) {
  const d = new Date(weekKey + "T12:00:00");
  const end = new Date(d); end.setDate(d.getDate() + 6);
  return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}
function loadStorage(key) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } catch { return null; }
}
function saveStorage(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

const BASE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing:border-box; margin:0; padding:0; }
  ::-webkit-scrollbar { display:none; }
  .sc { animation: scIn 0.3s cubic-bezier(0.22,1,0.36,1); }
  @keyframes scIn { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
  .tc { cursor:pointer; transition:transform 0.12s; }
  .tc:active { transform:scale(0.97); }
  .cntbtn { background:#161616; border:1px solid #2a2a2a; color:#fff; width:52px; height:52px; border-radius:14px; font-size:24px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.15s; font-family:'Barlow Condensed',sans-serif; }
  .cntbtn:disabled { opacity:0.2; cursor:not-allowed; }
  .cntbtn:not(:disabled):hover { background:#222; border-color:#444; }
  .mbtn { border:none; cursor:pointer; border-radius:4px; font-family:'Barlow Condensed',sans-serif; font-size:20px; font-weight:800; letter-spacing:3px; padding:16px 0; width:100%; transition:transform 0.1s,filter 0.15s; text-transform:uppercase; }
  .mbtn:active { transform:scale(0.98); filter:brightness(0.88); }
  .mbtn:disabled { opacity:0.4; cursor:not-allowed; }
  .bk { background:none; border:none; color:#444; font-size:12px; font-weight:700; letter-spacing:2px; cursor:pointer; display:flex; align-items:center; gap:6px; font-family:'Barlow Condensed',sans-serif; padding:0; text-transform:uppercase; }
  .exc { position:relative; transition:opacity 0.3s; border-radius:4px; overflow:hidden; }
  .exc.pop { animation:snap 0.45s cubic-bezier(0.22,1,0.36,1); }
  @keyframes snap { 0%{transform:scale(1);}35%{transform:scale(1.04);}65%{transform:scale(0.98);}100%{transform:scale(1);} }
  .chk { width:30px; height:30px; border-radius:4px; border:2px solid #2a2a2a; cursor:pointer; flex-shrink:0; display:flex; align-items:center; justify-content:center; transition:all 0.2s; font-family:'Barlow Condensed',sans-serif; font-weight:800; }
  .swpbtn { background:none; border:1px solid #2a2a2a; border-radius:4px; color:#3a3a3a; font-size:13px; font-family:'Barlow Condensed',sans-serif; font-weight:700; letter-spacing:1px; padding:4px 9px; cursor:pointer; transition:all 0.15s; }
  .swpbtn:hover { border-color:#555; color:#888; }
  .prbtn { background:none; border:1px solid #2a2a2a; border-radius:4px; color:#3a3a3a; font-size:13px; padding:4px 8px; cursor:pointer; transition:all 0.15s; }
  .prbtn.got { border-color:#FFB30040; color:#FFB300; }
  .prbtn:hover { border-color:#FFB300; color:#FFB300; }
  .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.88); z-index:100; display:flex; align-items:flex-end; justify-content:center; }
  .sheet { background:#111; border-top:1px solid #222; padding:32px 24px 44px; width:100%; max-width:430px; animation:shUp 0.3s cubic-bezier(0.22,1,0.36,1); }
  @keyframes shUp { from{transform:translateY(100%);}to{transform:translateY(0);} }
  .minput { background:#161616; border:1px solid #2a2a2a; border-radius:4px; color:#fff; font-size:18px; font-family:'Barlow Condensed',sans-serif; font-weight:600; padding:14px 16px; width:100%; outline:none; }
  .minput:focus { border-color:#FFB300; }
  .sov { position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:99; display:flex; align-items:center; justify-content:center; padding:20px; animation:fi 0.3s ease; }
  @keyframes fi { from{opacity:0;}to{opacity:1;} }
  .wkrow { border-bottom:1px solid #141414; }
  .wkrow:last-child { border-bottom:none; }
  .caopt { cursor:pointer; background:#0f0f0f; border:1px solid #1a1a1a; border-radius:4px; padding:14px 18px; display:flex; align-items:center; gap:14px; transition:all 0.15s; }
  .caopt.sel { border-color:#76FF03; background:#76FF0310; }
`;

function Wrap({ children, extraCss }) {
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#080808", minHeight:"100vh", minWidth:"100vw", maxWidth:430, margin:"0 auto", color:"#fff", position:"relative", overflowX:"hidden" }}>
      <style>{BASE_STYLES}{extraCss || ""}</style>
      {children}
    </div>
  );
}

// ── WORKOUT SCREEN ────────────────────────────────────────────────────────
function WorkoutScreen({ workout, setWorkout, splitLabel, color, bank, onBack, onRegenerate, prs, onSavePr, onComplete }) {
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({});
  const [justChecked, setJustChecked] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerLeft, setTimerLeft] = useState(REST_DURATION);
  const [prModal, setPrModal] = useState(null);
  const [prWeight, setPrWeight] = useState("");
  const [prReps, setPrReps] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const timerRef = useRef(null);
  const completedRef = useRef(false);

  const { sections } = workout;
  const allKeys = sections.flatMap((s, si) => s.exercises.map((_, ei) => `${si}-${ei}`));
  const completedCount = allKeys.filter(k => checked[k]).length;
  const totalCount = allKeys.length;
  const allDone = totalCount > 0 && completedCount === totalCount;
  const timerPct = (timerLeft / REST_DURATION) * 100;
  const timerColor = timerLeft > 30 ? "#76FF03" : timerLeft > 10 ? "#FFB300" : "#FF3D00";

  useEffect(() => {
    completedRef.current = false;
    setChecked({}); setExpanded({}); setShowSummary(false); setSummaryData(null);
  }, [workout]);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimerLeft(t => { if (t <= 1) { clearInterval(timerRef.current); setTimerActive(false); return REST_DURATION; } return t - 1; });
      }, 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  useEffect(() => {
    if (allDone && !completedRef.current) {
      completedRef.current = true;
      const duration = workout.startTime ? Date.now() - workout.startTime : 0;
      const data = { split: splitLabel, color, date: Date.now(), duration, exercises: sections.flatMap(s => s.exercises.map(e => e.name)), total: totalCount, type: "workout" };
      setSummaryData(data);
      onComplete(data);
      setTimeout(() => setShowSummary(true), 700);
    }
  }, [allDone]);

  function handleCheck(key) {
    const nowDone = !checked[key];
    setChecked(c => ({ ...c, [key]: nowDone }));
    if (nowDone) { setJustChecked(key); setTimeout(() => setJustChecked(null), 600); setTimerLeft(REST_DURATION); setTimerActive(true); }
  }

  function swapExercise(si, ei) {
    const section = sections[si];
    const current = section.exercises[ei];
    const usedNames = new Set(section.exercises.map(e => e.name));
    const groupBank = bank[section.group] || [];
    const candidates = groupBank.filter(e => e.name !== current.name && !usedNames.has(e.name));
    if (!candidates.length) return;
    const preferred = candidates.filter(e => Math.abs(e.intensity - current.intensity) <= 2);
    const pool = preferred.length ? preferred : candidates;
    const replacement = pool[Math.floor(Math.random() * pool.length)];
    setWorkout(w => ({ ...w, sections: w.sections.map((s, sI) => sI !== si ? s : { ...s, exercises: s.exercises.map((ex, eI) => eI !== ei ? ex : replacement) }) }));
    setChecked(c => { const n = { ...c }; delete n[`${si}-${ei}`]; return n; });
    setExpanded(e => { const n = { ...e }; delete n[`${si}-${ei}`]; return n; });
  }

  function openPr(name) {
    setPrModal(name);
    setPrWeight(prs[name]?.weight || "");
    setPrReps(prs[name]?.reps || "");
  }

  function savePr() {
    if (!prWeight || !prReps) return;
    onSavePr(prModal, { weight: prWeight, reps: prReps, date: Date.now() });
    setPrModal(null);
  }

  return (
    <>
      {prModal && (
        <div className="overlay" onClick={() => setPrModal(null)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color:"#FFB300", marginBottom:4, fontWeight:700 }}>PERSONAL RECORD</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:26, fontWeight:900, marginBottom:18, lineHeight:1 }}>{prModal}</div>
            {prs[prModal] && <div style={{ background:"#FFB30010", borderLeft:"3px solid #FFB300", padding:"10px 14px", marginBottom:16, fontSize:13, color:"#FFB300", fontFamily:"'Barlow Condensed'", fontWeight:600, letterSpacing:1 }}>CURRENT — {prs[prModal].weight} LBS x {prs[prModal].reps} REPS</div>}
            <div style={{ display:"flex", gap:12, marginBottom:20 }}>
              <div style={{ flex:1 }}>
                <div style={{ color:"#444", fontSize:11, letterSpacing:2, marginBottom:8, fontFamily:"'Barlow Condensed'", fontWeight:700 }}>WEIGHT (LBS)</div>
                <input className="minput" type="number" placeholder="135" value={prWeight} onChange={e => setPrWeight(e.target.value)} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ color:"#444", fontSize:11, letterSpacing:2, marginBottom:8, fontFamily:"'Barlow Condensed'", fontWeight:700 }}>REPS</div>
                <input className="minput" type="number" placeholder="12" value={prReps} onChange={e => setPrReps(e.target.value)} />
              </div>
            </div>
            <button className="mbtn" style={{ background:"#FFB300", color:"#000", marginBottom:10 }} onClick={savePr}>SAVE PR</button>
            <button className="mbtn" style={{ background:"transparent", color:"#333", border:"1px solid #1e1e1e" }} onClick={() => setPrModal(null)}>CANCEL</button>
          </div>
        </div>
      )}

      {showSummary && summaryData && (
        <div className="sov">
          <div style={{ background:"#0e0e0e", border:`1px solid ${summaryData.color}30`, borderRadius:4, padding:28, width:"100%", maxWidth:390, maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:64, fontWeight:900, color:summaryData.color, lineHeight:1, letterSpacing:2 }}>DONE.</div>
              <div style={{ color:"#333", fontSize:12, fontFamily:"'Barlow Condensed'", letterSpacing:2, marginTop:4 }}>{formatDate(summaryData.date)}</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
              {[{label:"SPLIT",value:summaryData.split},{label:"TIME",value:formatDuration(summaryData.duration)},{label:"EXERCISES",value:summaryData.total},{label:"SETS",value:summaryData.total*3}].map(({label,value}) => (
                <div key={label} style={{ background:"#141414", borderLeft:`3px solid ${summaryData.color}`, padding:"12px 14px" }}>
                  <div style={{ color:"#444", fontSize:10, letterSpacing:2, fontFamily:"'Barlow Condensed'", fontWeight:700, marginBottom:3 }}>{label}</div>
                  <div style={{ fontFamily:"'Barlow Condensed'", fontSize:24, fontWeight:900, color:"#fff", lineHeight:1 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"#141414", padding:14, marginBottom:18 }}>
              <div style={{ color:"#333", fontSize:10, letterSpacing:2, fontFamily:"'Barlow Condensed'", fontWeight:700, marginBottom:10 }}>EXERCISES</div>
              {summaryData.exercises.map((name, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, paddingBottom:7, marginBottom:7, borderBottom: i < summaryData.exercises.length-1?"1px solid #1a1a1a":"none" }}>
                  <span style={{ fontFamily:"'Barlow Condensed'", fontWeight:900, fontSize:15, color:summaryData.color, minWidth:20 }}>{i+1}</span>
                  <span style={{ color:"#888", fontSize:13, fontFamily:"'Barlow Condensed'", fontWeight:600 }}>{name}</span>
                </div>
              ))}
            </div>
            <button className="mbtn" style={{ background:summaryData.color, color:"#000", marginBottom:10 }} onClick={() => { setShowSummary(false); onBack(); }}>BACK TO HOME</button>
            <button className="mbtn" style={{ background:"transparent", color:"#333", border:"1px solid #1e1e1e" }} onClick={() => setShowSummary(false)}>KEEP VIEWING</button>
          </div>
        </div>
      )}

      {timerActive && (
        <div style={{ position:"fixed", top:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, zIndex:50, background:"#0d0d0d", borderBottom:"1px solid #1a1a1a", padding:"10px 20px", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#333", fontWeight:700 }}>REST</div>
          <div style={{ flex:1, background:"#161616", borderRadius:2, height:5, overflow:"hidden" }}>
            <div style={{ background:timerColor, height:"100%", width:`${timerPct}%`, borderRadius:2, transition:"width 1s linear, background 0.5s" }} />
          </div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:22, fontWeight:900, color:timerColor, minWidth:44, textAlign:"right" }}>{timerLeft}s</div>
          <button onClick={() => { setTimerActive(false); setTimerLeft(REST_DURATION); }} style={{ background:"none", border:"none", color:"#2a2a2a", cursor:"pointer", fontSize:16, padding:0 }}>x</button>
        </div>
      )}

      <div className="sc" style={{ padding:`${timerActive?78:56}px 20px 120px` }}>
        <button className="bk" onClick={onBack}>BACK</button>
        <div style={{ marginTop:20, marginBottom:6 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color, fontWeight:700 }}>{splitLabel.toUpperCase()} DAY</div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:52, fontWeight:900, lineHeight:0.9, letterSpacing:1, marginTop:2 }}>YOUR<br/>WORKOUT</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12, margin:"18px 0 28px" }}>
          <div style={{ flex:1, background:"#161616", borderRadius:2, height:4, overflow:"hidden" }}>
            <div style={{ background:color, height:"100%", width:`${totalCount?(completedCount/totalCount)*100:0}%`, borderRadius:2, transition:"width 0.4s ease" }} />
          </div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, fontWeight:800, color:"#333", letterSpacing:1 }}>{completedCount}<span style={{ color:"#222" }}>/{totalCount}</span></div>
        </div>

        {(() => {
          let num = 0;
          return sections.map((section, si) => (
            <div key={si} style={{ marginBottom:32 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color:"#2a2a2a", fontWeight:700 }}>{section.displayGroup.toUpperCase()}</div>
                <div style={{ flex:1, height:1, background:"#1a1a1a" }} />
                <div style={{ width:6, height:6, borderRadius:"50%", background:color }} />
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {section.exercises.map((ex, ei) => {
                  num++;
                  const n = num; const key = `${si}-${ei}`;
                  const done = checked[key]; const isExp = expanded[key]; const isPop = justChecked === key; const hasPr = !!prs[ex.name];
                  return (
                    <div key={key} className={`exc${isPop?" pop":""}`} style={{ background:done?"#090909":"#0f0f0f", border:"1px solid #161616", borderLeft:`3px solid ${done?"#1e1e1e":color}`, opacity:done?0.4:1 }}>
                      <div style={{ padding:"14px 14px", display:"flex", alignItems:"center", gap:12 }}>
                        <div className="chk" onClick={() => handleCheck(key)} style={{ background:done?color:"transparent", borderColor:done?color:"#252525" }}>
                          {done ? <span style={{ fontSize:14, color:"#000", fontWeight:900 }}>v</span> : <span style={{ fontSize:13, color:"#2e2e2e", fontWeight:900 }}>{n}</span>}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontFamily:"'Barlow Condensed'", fontWeight:800, fontSize:18, letterSpacing:0.5, textDecoration:done?"line-through":"none", color:done?"#2a2a2a":"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{ex.name.toUpperCase()}</div>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:3, flexWrap:"wrap" }}>
                            {(ex.sets||ex.reps) && <span style={{ fontFamily:"'Barlow Condensed'", color:"#3a3a3a", fontSize:13, fontWeight:700, letterSpacing:1 }}>{ex.sets&&`${ex.sets} SETS`}{ex.sets&&ex.reps&&" . "}{ex.reps&&`${ex.reps} REPS`}</span>}
                            {hasPr && <span style={{ fontFamily:"'Barlow Condensed'", fontSize:11, fontWeight:700, letterSpacing:1, color:"#FFB300", background:"#FFB30012", padding:"2px 7px", borderRadius:2 }}>PR {prs[ex.name].weight}x{prs[ex.name].reps}</span>}
                          </div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
                          {!done && <button className="swpbtn" onClick={() => swapExercise(si, ei)}>swap</button>}
                          <button className={`prbtn${hasPr?" got":""}`} onClick={() => openPr(ex.name)}>PR</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ));
        })()}

        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, padding:"16px 20px 28px", background:"linear-gradient(transparent, #080808 45%)" }}>
          <button className="mbtn" style={{ background:"#111", color:"#333", border:"1px solid #1a1a1a" }} onClick={onRegenerate}>REGENERATE</button>
        </div>
      </div>
    </>
  );
}

// ── HISTORY SCREEN ────────────────────────────────────────────────────────
function HistoryScreen({ history, profileColor, onBack, onClear }) {
  const weeks = {};
  history.forEach(h => { const wk = getWeekKey(h.date); if (!weeks[wk]) weeks[wk] = []; weeks[wk].push(h); });
  const weekKeys = Object.keys(weeks).sort((a, b) => b.localeCompare(a));
  return (
    <div className="sc" style={{ padding:"56px 20px 40px" }}>
      <button className="bk" onClick={onBack}>BACK</button>
      <div style={{ marginTop:28, marginBottom:32 }}>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, lineHeight:0.9, letterSpacing:1 }}>WORKOUT<br/><span style={{ color:profileColor }}>HISTORY</span></div>
      </div>
      {weekKeys.length === 0
        ? <div style={{ textAlign:"center", color:"#222", padding:"60px 0", fontFamily:"'Barlow Condensed'", fontSize:16, letterSpacing:2, fontWeight:700 }}>NO WORKOUTS YET</div>
        : weekKeys.map(wk => {
          const entries = weeks[wk];
          const workouts = entries.filter(e => e.type !== "cardio");
          const cardios = entries.filter(e => e.type === "cardio");
          return (
            <div key={wk} style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderRadius:4, marginBottom:12, overflow:"hidden" }}>
              <div style={{ padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed'", fontSize:14, fontWeight:800, letterSpacing:1 }}>{formatWeekLabel(wk)}</div>
                  <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#444", letterSpacing:2, marginTop:3, fontWeight:700 }}>
                    {workouts.length > 0 && `${workouts.length} WORKOUT${workouts.length>1?"S":""}`}
                    {workouts.length > 0 && cardios.length > 0 && "  /  "}
                    {cardios.length > 0 && `${cardios.length} CARDIO`}
                  </div>
                </div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", justifyContent:"flex-end", maxWidth:120 }}>
                  {entries.map((e, i) => <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:e.type==="cardio"?"#555":e.color }} />)}
                </div>
              </div>
              <div style={{ borderTop:"1px solid #1a1a1a" }}>
                {entries.map((h, i) => (
                  <div key={i} className="wkrow" style={{ padding:"11px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:16, fontWeight:800, letterSpacing:0.5 }}>{h.type==="cardio" ? h.cardioType?.toUpperCase() : h.split?.toUpperCase()}</div>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#444", letterSpacing:1, marginTop:2, fontWeight:600 }}>
                        {formatDate(h.date).toUpperCase()}
                        {h.duration ? ` . ${formatDuration(h.duration)}` : ""}
                        {h.durationMins ? ` . ${h.durationMins} MIN` : ""}
                      </div>
                    </div>
                    <div style={{ width:3, height:30, background:h.type==="cardio"?"#444":h.color, borderRadius:2, flexShrink:0 }} />
                  </div>
                ))}
              </div>
            </div>
          );
        })
      }
      {history.length > 0 && (
        <button onClick={onClear} style={{ marginTop:16, background:"none", border:"1px solid #1e1e1e", borderRadius:4, color:"#2a2a2a", fontSize:12, fontFamily:"'Barlow Condensed'", fontWeight:700, letterSpacing:2, padding:"12px 20px", cursor:"pointer", width:"100%" }}>
          CLEAR HISTORY
        </button>
      )}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [broSplit, setBroSplit] = useState(null);
  const [broTotal, setBroTotal] = useState(DEFAULT_TOTAL);
  const [broWorkout, setBroWorkout] = useState({ sections:[], startTime:null });
  const [broPrs, setBroPrs] = useState({});
  const [broHistory, setBroHistory] = useState([]);
  const [wifeyMode, setWifeyMode] = useState(null);
  const [wifeyTotal, setWifeyTotal] = useState(6);
  const [wifeyWorkout, setWifeyWorkout] = useState({ sections:[], startTime:null });
  const [wifeyPrs, setWifeyPrs] = useState({});
  const [wifeyHistory, setWifeyHistory] = useState([]);
  const [cardioType, setCardioType] = useState(null);
  const [cardioDuration, setCardioDuration] = useState("");
  const [cardioLogged, setCardioLogged] = useState(false);

  useEffect(() => {
    const bp = loadStorage("dg-prs"); if (bp) setBroPrs(bp);
    const bh = loadStorage("dg-history"); if (bh) setBroHistory(bh);
    const wp = loadStorage("wy-prs"); if (wp) setWifeyPrs(wp);
    const wh = loadStorage("wy-history"); if (wh) setWifeyHistory(wh);
  }, []);

  const broMin = broSplit ? (broSplit.fullBody ? 6 : MIN_PER_GROUP * broSplit.groups.length) : MIN_PER_GROUP;
  const broMax = broSplit ? (broSplit.fullBody ? 8 : broSplit.groups.reduce((s, g) => s + BRO_EXERCISE_BANK[g].length, 0)) : 20;
  const wifeyBank = wifeyMode === "cables" ? WIFEY_CABLE_BANK : WIFEY_FULL_BODY_BANK;
  const wifeyMin = 4;
  const wifeyMax = Object.values(wifeyBank).reduce((s, arr) => s + arr.length, 0);
  const wColor = wifeyMode === "cables" ? "#00E5FF" : WIFEY_COLOR;

  function saveBroPr(name, data) {
    const u = { ...broPrs, [name]: data };
    setBroPrs(u); saveStorage("dg-prs", u);
  }
  function saveWifeyPr(name, data) {
    const u = { ...wifeyPrs, [name]: data };
    setWifeyPrs(u); saveStorage("wy-prs", u);
  }
  function addBroHistory(entry) {
    const n = [entry, ...broHistory].slice(0, 60);
    setBroHistory(n); saveStorage("dg-history", n);
  }
  function addWifeyHistory(entry) {
    const n = [entry, ...wifeyHistory].slice(0, 60);
    setWifeyHistory(n); saveStorage("wy-history", n);
  }
  function logCardio() {
    if (!cardioType || !cardioDuration) return;
    const entry = { type:"cardio", cardioType:cardioType.label, durationMins:cardioDuration, date:Date.now(), color:"#888" };
    addWifeyHistory(entry);
    setCardioLogged(true);
  }

  // ── LANDING ──────────────────────────────────────────────────────────────
  if (screen === "landing") return (
    <Wrap>
      <div className="sc" style={{ padding:"60px 20px 40px", display:"flex", flexDirection:"column", minHeight:"100vh" }}>
        <div style={{ marginBottom:52 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:72, fontWeight:900, lineHeight:0.88, letterSpacing:-1 }}>DAILY<br/><span style={{ color:"#FF3D00" }}>GRIND</span></div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, letterSpacing:4, color:"#333", marginTop:10, fontWeight:700 }}>WHO'S TRAINING TODAY?</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12, flex:1 }}>
          <div className="tc" onClick={() => setScreen("bro-home")} style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:"4px solid #FF3D00", padding:"28px 24px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", right:-10, top:"50%", transform:"translateY(-50%)", fontFamily:"'Barlow Condensed'", fontSize:90, fontWeight:900, color:"#FF3D0010", lineHeight:1 }}>BRO</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:32, fontWeight:900, letterSpacing:1 }}>THE BRO SPLIT</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:12, letterSpacing:3, color:"#FF3D00", marginTop:6, fontWeight:700 }}>STRENGTH . MASS . POWER</div>
          </div>
          <div className="tc" onClick={() => setScreen("wifey-home")} style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:`4px solid ${WIFEY_COLOR}`, padding:"28px 24px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", right:-10, top:"50%", transform:"translateY(-50%)", fontFamily:"'Barlow Condensed'", fontSize:64, fontWeight:900, color:`${WIFEY_COLOR}10`, lineHeight:1 }}>WIFEY</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:32, fontWeight:900, letterSpacing:1 }}>THE WIFEY WORKOUT</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:12, letterSpacing:3, color:WIFEY_COLOR, marginTop:6, fontWeight:700 }}>TONE . CABLES . CARDIO</div>
          </div>
        </div>
        <div style={{ textAlign:"center", color:"#1a1a1a", fontSize:10, letterSpacing:3, fontFamily:"'Barlow Condensed'", fontWeight:700, marginTop:40 }}>DAILY GRIND . FULL GYM</div>
      </div>
    </Wrap>
  );

  // ── BRO HOME ─────────────────────────────────────────────────────────────
  if (screen === "bro-home") return (
    <Wrap>
      <div className="sc" style={{ padding:"56px 20px 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:40 }}>
          <div>
            <button className="bk" onClick={() => setScreen("landing")} style={{ marginBottom:12 }}>BACK</button>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:64, fontWeight:900, lineHeight:0.88, letterSpacing:-1 }}>THE BRO<br/><span style={{ color:"#FF3D00" }}>SPLIT</span></div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, letterSpacing:4, color:"#333", marginTop:10, fontWeight:700 }}>SELECT YOUR SPLIT</div>
          </div>
          <button onClick={() => setScreen("bro-history")} style={{ background:"#111", border:"1px solid #1e1e1e", borderRadius:4, padding:"8px 14px", color:"#444", fontSize:11, cursor:"pointer", fontFamily:"'Barlow Condensed'", fontWeight:700, letterSpacing:2, marginTop:32 }}>HISTORY</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {BRO_SPLITS.map((s, idx) => (
            <div key={s.id} className="tc" onClick={() => { setBroSplit(s); setBroTotal(s.fullBody ? 7 : Math.max(DEFAULT_TOTAL, MIN_PER_GROUP * s.groups.length)); setScreen("bro-configure"); }}
              style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:`4px solid ${s.color}`, padding:"20px", position:"relative", overflow:"hidden", animation:`scIn 0.3s cubic-bezier(0.22,1,0.36,1) ${idx*0.05}s both` }}>
              <div style={{ position:"absolute", top:0, right:0, width:80, height:"100%", background:`linear-gradient(to left, ${s.color}08, transparent)` }} />
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ width:56, height:56, borderRadius:4, overflow:"hidden", flexShrink:0, border:`1px solid ${s.color}30`, background:s.color+"15" }}>
                  <img src={s.img} alt={s.label} onError={e => { e.target.style.display="none"; }} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.8) contrast(1.1)" }} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Barlow Condensed'", fontSize:24, fontWeight:900, letterSpacing:1, lineHeight:1 }}>{s.label.toUpperCase()}</div>
                  <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
                    {s.groups.map(g => <span key={g} style={{ fontFamily:"'Barlow Condensed'", fontWeight:700, fontSize:10, letterSpacing:2, color:s.color, background:s.color+"12", padding:"2px 8px", borderRadius:2 }}>{g.replace(" (Compound)","").replace(" (Isolated)","")}</span>)}
                  </div>
                </div>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, color:"#222", fontWeight:900 }}>></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  );

  // ── BRO CONFIGURE ─────────────────────────────────────────────────────────
  if (screen === "bro-configure" && broSplit) {
    const color = broSplit.color;
    return (
      <Wrap>
        <div className="sc" style={{ padding:"56px 20px 40px" }}>
          <button className="bk" onClick={() => setScreen("bro-home")}>BACK</button>
          <div style={{ marginTop:28, marginBottom:36 }}>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color, fontWeight:700, marginBottom:4 }}>TODAY'S SPLIT</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:58, fontWeight:900, lineHeight:0.9, letterSpacing:1 }}>
              {broSplit.label.split("/").map((p,i) => <div key={i} style={{ color:i===0?"#fff":color }}>{p.trim().toUpperCase()}</div>)}
            </div>
          </div>
          <div style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:`4px solid ${color}`, padding:"28px 24px", marginBottom:28 }}>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#333", fontWeight:700, marginBottom:20 }}>TOTAL EXERCISES</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <button className="cntbtn" disabled={broTotal <= broMin} onClick={() => setBroTotal(t => t-1)}>-</button>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:96, fontWeight:900, lineHeight:1, color }}>{broTotal}</div>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#333", fontWeight:700, marginTop:2 }}>EXERCISES</div>
              </div>
              <button className="cntbtn" disabled={broTotal >= broMax} onClick={() => setBroTotal(t => t+1)}>+</button>
            </div>
          </div>
          <button className="mbtn" style={{ background:color, color:"#000" }} onClick={() => { setBroWorkout(generateBroWorkout(broSplit, broTotal)); setScreen("bro-workout"); }}>GENERATE WORKOUT</button>
        </div>
      </Wrap>
    );
  }

  // ── BRO WORKOUT ───────────────────────────────────────────────────────────
  if (screen === "bro-workout" && broSplit) return (
    <Wrap>
      <WorkoutScreen workout={broWorkout} setWorkout={setBroWorkout} splitLabel={broSplit.label} color={broSplit.color} bank={BRO_EXERCISE_BANK}
        onBack={() => setScreen("bro-home")}
        onRegenerate={() => setBroWorkout(generateBroWorkout(broSplit, broTotal))}
        prs={broPrs} onSavePr={saveBroPr} onComplete={addBroHistory} />
    </Wrap>
  );

  // ── BRO HISTORY ───────────────────────────────────────────────────────────
  if (screen === "bro-history") return (
    <Wrap>
      <HistoryScreen history={broHistory} profileColor="#FF3D00" onBack={() => setScreen("bro-home")} onClear={() => { setBroHistory([]); saveStorage("dg-history", []); }} />
    </Wrap>
  );

  // ── WIFEY HOME ────────────────────────────────────────────────────────────
  if (screen === "wifey-home") return (
    <Wrap>
      <div className="sc" style={{ padding:"56px 20px 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:40 }}>
          <div>
            <button className="bk" onClick={() => setScreen("landing")} style={{ marginBottom:12 }}>BACK</button>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, lineHeight:0.88, letterSpacing:-1 }}>THE WIFEY<br/><span style={{ color:WIFEY_COLOR }}>WORKOUT</span></div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, letterSpacing:4, color:"#333", marginTop:10, fontWeight:700 }}>WHAT'S THE PLAN TODAY?</div>
          </div>
          <button onClick={() => setScreen("wifey-history")} style={{ background:"#111", border:"1px solid #1e1e1e", borderRadius:4, padding:"8px 14px", color:"#444", fontSize:11, cursor:"pointer", fontFamily:"'Barlow Condensed'", fontWeight:700, letterSpacing:2, marginTop:32 }}>HISTORY</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            { id:"fullbody", label:"Full Body",  sub:"DUMBBELLS . MACHINES . FREE WEIGHTS", color:WIFEY_COLOR },
            { id:"cables",   label:"All Cables", sub:"CABLE MACHINE ONLY",                  color:"#00E5FF"   },
            { id:"cardio",   label:"Cardio Day", sub:"LOG YOUR SESSION",                    color:"#76FF03"   },
          ].map((opt, idx) => (
            <div key={opt.id} className="tc"
              onClick={() => {
                if (opt.id === "cardio") { setCardioType(null); setCardioDuration(""); setCardioLogged(false); setScreen("cardio"); }
                else { setWifeyMode(opt.id); setWifeyTotal(opt.id==="cables"?8:6); setScreen("wifey-configure"); }
              }}
              style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:`4px solid ${opt.color}`, padding:"24px 20px", position:"relative", overflow:"hidden", animation:`scIn 0.3s cubic-bezier(0.22,1,0.36,1) ${idx*0.05}s both` }}>
              <div style={{ position:"absolute", top:0, right:0, width:80, height:"100%", background:`linear-gradient(to left, ${opt.color}08, transparent)` }} />
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, fontWeight:900, letterSpacing:1 }}>{opt.label.toUpperCase()}</div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:opt.color, marginTop:6, fontWeight:700 }}>{opt.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  );

  // ── WIFEY CONFIGURE ───────────────────────────────────────────────────────
  if (screen === "wifey-configure") return (
    <Wrap>
      <div className="sc" style={{ padding:"56px 20px 40px" }}>
        <button className="bk" onClick={() => setScreen("wifey-home")}>BACK</button>
        <div style={{ marginTop:28, marginBottom:36 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color:wColor, fontWeight:700, marginBottom:4 }}>TODAY'S WORKOUT</div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:58, fontWeight:900, lineHeight:0.9, letterSpacing:1 }}>{wifeyMode==="cables"?"ALL CABLES":"FULL BODY"}</div>
        </div>
        <div style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:`4px solid ${wColor}`, padding:"28px 24px", marginBottom:28 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#333", fontWeight:700, marginBottom:20 }}>TOTAL EXERCISES</div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <button className="cntbtn" disabled={wifeyTotal <= wifeyMin} onClick={() => setWifeyTotal(t => t-1)}>-</button>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:96, fontWeight:900, lineHeight:1, color:wColor }}>{wifeyTotal}</div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#333", fontWeight:700, marginTop:2 }}>EXERCISES</div>
            </div>
            <button className="cntbtn" disabled={wifeyTotal >= wifeyMax} onClick={() => setWifeyTotal(t => t+1)}>+</button>
          </div>
        </div>
        <button className="mbtn" style={{ background:wColor, color:"#000" }} onClick={() => { setWifeyWorkout(generateWifeyWorkout(wifeyBank, wifeyTotal)); setScreen("wifey-workout"); }}>GENERATE WORKOUT</button>
      </div>
    </Wrap>
  );

  // ── WIFEY WORKOUT ─────────────────────────────────────────────────────────
  if (screen === "wifey-workout") return (
    <Wrap>
      <WorkoutScreen workout={wifeyWorkout} setWorkout={setWifeyWorkout}
        splitLabel={wifeyMode==="cables"?"All Cables":"Full Body"} color={wColor} bank={wifeyBank}
        onBack={() => setScreen("wifey-home")}
        onRegenerate={() => setWifeyWorkout(generateWifeyWorkout(wifeyBank, wifeyTotal))}
        prs={wifeyPrs} onSavePr={saveWifeyPr} onComplete={addWifeyHistory} />
    </Wrap>
  );

  // ── WIFEY HISTORY ─────────────────────────────────────────────────────────
  if (screen === "wifey-history") return (
    <Wrap>
      <HistoryScreen history={wifeyHistory} profileColor={WIFEY_COLOR} onBack={() => setScreen("wifey-home")} onClear={() => { setWifeyHistory([]); saveStorage("wy-history", []); }} />
    </Wrap>
  );

  // ── CARDIO ────────────────────────────────────────────────────────────────
  if (screen === "cardio") return (
    <Wrap>
      <div className="sc" style={{ padding:"56px 20px 40px" }}>
        <button className="bk" onClick={() => setScreen("wifey-home")}>BACK</button>
        <div style={{ marginTop:28, marginBottom:32 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color:"#76FF03", fontWeight:700, marginBottom:4 }}>LOG SESSION</div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:58, fontWeight:900, lineHeight:0.9 }}>CARDIO<br/><span style={{ color:"#76FF03" }}>DAY</span></div>
        </div>
        {cardioLogged ? (
          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, color:"#76FF03", lineHeight:1 }}>LOGGED.</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:14, color:"#444", letterSpacing:2, marginTop:8 }}>{cardioType?.label?.toUpperCase()} . {cardioDuration} MIN</div>
            <button className="mbtn" style={{ background:"#76FF03", color:"#000", marginTop:32 }} onClick={() => setScreen("wifey-home")}>BACK TO HOME</button>
          </div>
        ) : (
          <>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:12 }}>SELECT ACTIVITY</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:28 }}>
              {CARDIO_OPTIONS.map(opt => (
                <div key={opt.id} className={`caopt${cardioType?.id===opt.id?" sel":""}`} onClick={() => setCardioType(opt)}>
                  <span style={{ fontSize:18 }}>{opt.emoji}</span>
                  <span style={{ fontFamily:"'Barlow Condensed'", fontSize:20, fontWeight:800, letterSpacing:1 }}>{opt.label.toUpperCase()}</span>
                </div>
              ))}
            </div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:10 }}>DURATION (MINUTES)</div>
            <input className="minput" type="number" placeholder="e.g. 30" value={cardioDuration} onChange={e => setCardioDuration(e.target.value)}
              style={{ marginBottom:24, borderColor:cardioDuration?"#76FF03":"#2a2a2a" }} />
            <button className="mbtn" style={{ background:cardioType&&cardioDuration?"#76FF03":"#161616", color:cardioType&&cardioDuration?"#000":"#333" }}
              disabled={!cardioType||!cardioDuration} onClick={logCardio}>LOG CARDIO</button>
          </>
        )}
      </div>
    </Wrap>
  );

  return null;
}
