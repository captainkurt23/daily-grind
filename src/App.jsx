import { useState, useEffect, useRef } from "react";
import { Share2, Trophy, Settings, Star, TrendingUp, Wind, Activity, Zap, Dumbbell } from "lucide-react";

// ============================================================
//  CREATOR CONFIGURATION
// ============================================================

// eq: "machine" = fixed station, "cable" = cable machine, "barbell" = barbell needed,
//     "db" = dumbbells (portable), "ez" = EZ bar (portable), "bw" = bodyweight (portable)
const CORE_BANK = [
  { name: "Cable Crunch",       sets: "3", reps: "15-20", intensity: 6, eq: "cable" },
  { name: "Decline Sit Up",     sets: "3", reps: "15-20", intensity: 5, eq: "machine" },
  { name: "Hanging Leg Raise",  sets: "3", reps: "12-15", intensity: 7, eq: "bw" },
  { name: "Ab Wheel Rollout",   sets: "3", reps: "10-12", intensity: 8, eq: "bw" },
  { name: "Weighted Crunch",    sets: "3", reps: "15-20", intensity: 5, eq: "db" },
  { name: "Bicycle Crunch",     sets: "3", reps: "20-25", intensity: 4, eq: "bw" },
  { name: "Leg Raise",          sets: "3", reps: "15-20", intensity: 5, eq: "bw" },
  { name: "Russian Twist",      sets: "3", reps: "20-25", intensity: 4, eq: "bw" },
  { name: "Toe Touches",        sets: "3", reps: "20-25", intensity: 3, eq: "bw" },
  { name: "Mountain Climbers",  sets: "3", reps: "20-30", intensity: 5, eq: "bw" },
  { name: "Flutter Kicks",      sets: "3", reps: "20-30", intensity: 4, eq: "bw" },
  { name: "Hollow Hold",        sets: "3", reps: "30 SEC", intensity: 5, eq: "bw" },
  { name: "Dead Bug",           sets: "3", reps: "10-12", intensity: 5, eq: "bw" },
  { name: "Plank",              sets: "3", reps: "45 SEC", intensity: 4, eq: "bw" },
  { name: "Hanging Knee Raise",  sets: "3", reps: "12-15", intensity: 5, eq: "bw" },
  { name: "Side Plank",          sets: "3", reps: "30 SEC", intensity: 4, eq: "bw" },
];

const BRO_EXERCISE_BANK = {
  Back: [
    { name: "Dumbbell Row",           sets: "4", reps: "8-10",  note: "", intensity: 6, eq: "db"      },
    { name: "Chest Supported Row",    sets: "4", reps: "8-10",  note: "", intensity: 6, eq: "machine" },
    { name: "Lat Pulldown",           sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "cable"   },
    { name: "Pull Up",                sets: "4", reps: "6-10",   note: "", intensity: 7, eq: "bw"      },
    { name: "Straight Arm Pulldown",  sets: "4", reps: "8-10",  note: "", intensity: 4, eq: "cable"   },
    { name: "Seated Cable Row",       sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "cable"   },
    { name: "Rack Pull",              sets: "4", reps: "6-8",   note: "", intensity: 9, eq: "barbell" },
    { name: "Seated Row Machine",     sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "machine" },
    { name: "Barbell Row",            sets: "4", reps: "6-8",   note: "", intensity: 8, eq: "barbell" },
    { name: "Face Pull",              sets: "4", reps: "10",    note: "", intensity: 3, eq: "cable"   },
    { name: "Deadlift",                sets: "4", reps: "4-6",   note: "", intensity: 10, eq: "barbell" },
    { name: "Wide Grip Seated Cable Row", sets: "4", reps: "8-10", note: "", intensity: 6, eq: "cable"   },
    { name: "Seated High Row",            sets: "4", reps: "8-10", note: "", intensity: 6, eq: "machine" },
  ],
  Chest: [
    { name: "Flat Bench Press",      sets: "4", reps: "6-8",   note: "", intensity: 9, eq: "barbell" },
    { name: "Incline Bench Press",   sets: "4", reps: "6-8",   note: "", intensity: 8, eq: "barbell" },
    { name: "Decline Bench Press",   sets: "4", reps: "6-8",   note: "", intensity: 7, eq: "barbell" },
    { name: "Dumbbell Bench Press",  sets: "4", reps: "8-10",  note: "", intensity: 7, eq: "db"      },
    { name: "Dumbbell Fly",          sets: "4", reps: "8-10",  note: "", intensity: 4, eq: "db"      },
    { name: "Cable Fly (Upper)",     sets: "4", reps: "10-12", note: "", intensity: 5, eq: "cable"   },
    { name: "Cable Fly (Lower)",     sets: "4", reps: "10-12", note: "", intensity: 5, eq: "cable"   },
    { name: "Incline Dumbbell Press",       sets: "4", reps: "8-10",  note: "", intensity: 7, eq: "db"      },
    { name: "Pec Deck / Chest Fly Machine", sets: "4", reps: "10-12", note: "", intensity: 5, eq: "machine" },
    { name: "Push Up",               sets: "4", reps: "15-20", note: "", intensity: 4, eq: "bw", supersetOnly: true },
  ],
  Shoulders: [
    { name: "Upright Row",                    sets: "4", reps: "8-10",  note: "", intensity: 6, eq: "barbell" },
    { name: "Shoulder Shrug",                          sets: "4", reps: "8-10",  note: "", intensity: 3, eq: "db"      },
    { name: "Lateral Raise",                  sets: "4", reps: "8-10",  note: "", intensity: 4, eq: "db"      },
    { name: "Rear Delt Fly",                  sets: "4", reps: "8-10",  note: "", intensity: 4, eq: "db"      },
    { name: "Standing Barbell Shoulder Press",         sets: "4", reps: "6-8",   note: "", intensity: 9, eq: "barbell" },
    { name: "Dumbbell Shoulder Press",                 sets: "4", reps: "6-8",   note: "", intensity: 7, eq: "db"      },
    { name: "Arnold Press",                   sets: "4", reps: "6-8",   note: "", intensity: 7, eq: "db"      },
    { name: "Front Raise",                    sets: "4", reps: "8-10",  note: "", intensity: 4, eq: "db"      },
    { name: "Side to Front Raise",            sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "db"      },
    { name: "Cable Single Arm Lateral Raise", sets: "4", reps: "8-10",  note: "", intensity: 3, eq: "cable"   },
    { name: "Smith Machine Shoulder Press",   sets: "4", reps: "6-8",   note: "", intensity: 8, eq: "machine" },
    { name: "Face Pull",                      sets: "4", reps: "10",    note: "", intensity: 3, eq: "cable"   },
    { name: "Cable Y Raise",                  sets: "4", reps: "10-12", note: "", intensity: 4, eq: "cable"   },
  ],
  Triceps: [
    { name: "Single Arm Tricep Pulldown", sets: "4", reps: "10-12", note: "", intensity: 4, eq: "cable"   },
    { name: "Tricep Pushdown Machine",    sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "machine" },
    { name: "Tricep V-Bar Pushdown",      sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "cable"   },
    { name: "Tricep Rope Pulldown",          sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "cable"   },
    { name: "Tricep Straight Bar Pushdown",  sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "cable"   },
    { name: "Tricep Reverse Grip Pushdown",  sets: "4", reps: "8-10",  note: "", intensity: 4, eq: "cable"   },
    { name: "Skullcrusher",           sets: "4", reps: "6-8",   note: "", intensity: 7, eq: "ez"      },
    { name: "Tricep Overhead Rope Extension",     sets: "4", reps: "8-10",  note: "", intensity: 6, eq: "cable"   },
    { name: "Close Grip Bench Press", sets: "4", reps: "6-8",   note: "", intensity: 8, eq: "barbell" },
    { name: "Dips",                   sets: "4", reps: "15-20",   note: "", intensity: 7, eq: "bw"      },
  ],
  Biceps: [
    { name: "Dumbbell Curl",      sets: "4", reps: "8-10",  note: "", intensity: 6, eq: "db"      },
    { name: "Preacher Curl",      sets: "4", reps: "8-10",  note: "", intensity: 6, eq: "machine" },
    { name: "Hammer Curl",        sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "db"      },
    { name: "Concentration Curl", sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "db"      },
    { name: "Reverse Grip Curl",  sets: "4", reps: "8-10",  note: "", intensity: 4, eq: "db"      },
    { name: "Barbell 21s (Bicep Curl)",                sets: "4", reps: "21",    note: "", intensity: 6, eq: "db"      },
    { name: "EZ Bar Curl",        sets: "4", reps: "6-8",   note: "", intensity: 7, eq: "ez"      },
    { name: "Seated EZ Bar Curl", sets: "4", reps: "6-8",   note: "", intensity: 7, eq: "ez"      },
    { name: "Cable Bicep Curl",   sets: "4", reps: "8-10",  note: "", intensity: 5, eq: "cable"   },
    { name: "Incline Dumbbell Curl", sets: "4", reps: "8-10", note: "", intensity: 6, eq: "db"    },
    { name: "Chin Up",             sets: "4", reps: "6-10",  note: "", intensity: 7, eq: "bw"      },
    { name: "Spider Curls",          sets: "4", reps: "8-10",  note: "", intensity: 6, eq: "db"      },
  ],
  Legs: [
    { name: "Barbell Squat",         sets: "4", reps: "6-8",  note: "", intensity: 9, compound: true,  eq: "barbell" },
    { name: "Pendulum Squat",        sets: "4", reps: "6-8",  note: "", intensity: 9, compound: true,  eq: "machine" },
    { name: "Hack Squat",            sets: "4", reps: "6-8",  note: "", intensity: 8, compound: true,  eq: "machine" },
    { name: "Box Squat",             sets: "4", reps: "6-8",  note: "", intensity: 8, compound: true,  eq: "barbell" },
    { name: "Leg Press",             sets: "4", reps: "6-8",  note: "", intensity: 7, compound: true,  eq: "machine" },
    { name: "Romanian Deadlift (RDL)",                   sets: "4", reps: "6-8",  note: "", intensity: 7, compound: true,  eq: "barbell" },
    { name: "Bulgarian Split Squat", sets: "4", reps: "8-10", note: "", intensity: 7, compound: true,  eq: "db"      },
    { name: "Walking Lunges",        sets: "4", reps: "8-10", note: "", intensity: 6, compound: true,  eq: "db"      },
    { name: "Step Ups",              sets: "4", reps: "8-10", note: "", intensity: 5, compound: true,  eq: "db"      },
    { name: "Static Lunges",         sets: "4", reps: "8-10", note: "", intensity: 5, compound: true,  eq: "bw"      },
    { name: "Seated Leg Curl",       sets: "4", reps: "8-10", note: "", intensity: 5, compound: false, eq: "machine" },
    { name: "Lying Leg Curl",        sets: "4", reps: "8-10", note: "", intensity: 5, compound: false, eq: "machine" },
    { name: "Leg Extension",         sets: "4", reps: "8-10", note: "", intensity: 4, compound: false, eq: "machine" },
    { name: "Single Leg Curl",       sets: "4", reps: "8-10", note: "", intensity: 4, compound: false, eq: "machine" },
    { name: "Hip Adductor Machine",              sets: "4", reps: "10",   note: "", intensity: 3, compound: false, eq: "machine" },
    { name: "Hip Abductor Machine",              sets: "4", reps: "10",   note: "", intensity: 3, compound: false, eq: "machine" },
    { name: "Calf Raises",           sets: "4", reps: "10",   note: "", intensity: 3, compound: false, eq: "db"      },
    { name: "Deficit Reverse Lunge",        sets: "4", reps: "8-10", note: "", intensity: 7, compound: true,  eq: "db"      },
    { name: "Reverse Lunge",          sets: "4", reps: "8-10", note: "", intensity: 6, compound: true,  eq: "db"      },
    { name: "Farmer's Carry",         sets: "4", reps: "40 YDS", note: "", intensity: 6, compound: true,  eq: "db"      },
  ],
};

const BRO_SPLITS = [
  { id: "chest-tri",      label: "Chest / Triceps",  sub: "PUSH DAY . CLASSIC",            groups: ["Chest","Triceps"],                color: "#FF3D00", fullBody: false, legsMode: null,       isCore: false },
  { id: "legs",           label: "Legs",             sub: "LEG DAY . NO MERCY",            groups: ["Legs"],                           color: "#FFB300", fullBody: false, legsMode: "compound", isCore: false },
  { id: "back-bi",        label: "Back / Biceps",    sub: "PULL DAY . POWER",              groups: ["Back","Biceps"],                  color: "#00E5FF", fullBody: false, legsMode: null,       isCore: false },
  { id: "shoulders-legs", label: "Shoulders / Legs", sub: "PRESS . ACCESSORY WORK",        groups: ["Shoulders","Legs"],               color: "#D500F9", fullBody: false, legsMode: "isolated", isCore: false },
  { id: "full-body",      label: "Full Body",        sub: "COMPOUND-FOCUSED . ALL MUSCLE", groups: ["Chest","Back","Legs","Shoulders"], color: "#76FF03", fullBody: true,  legsMode: "compound", isCore: false },
  { id: "core",           label: "Core / Abs",       sub: "ABS . CORE STRENGTH",           groups: ["Core"],                           color: "#EEFF41", fullBody: false, legsMode: null,       isCore: true  },
];

const WIFEY_COLOR = "#FF6B9D";

const WIFEY_FULL_BODY_BANK = {
  Chest: [
    { name: "Dumbbell Fly",        sets: "3", reps: "12-15", note: "", intensity: 4, eq: "db"      },
    { name: "Incline Bench Press", sets: "3", reps: "12-15", note: "", intensity: 6, eq: "barbell" },
    { name: "Push Up",             sets: "3", reps: "15-20", note: "", intensity: 4, eq: "bw", supersetOnly: true },
    { name: "Flat Bench Press",    sets: "3", reps: "12-15", note: "", intensity: 7, eq: "barbell" },
    { name: "Decline Bench Press", sets: "3", reps: "12-15", note: "", intensity: 5, eq: "barbell" },
    { name: "Cable Fly High to Low", sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Fly Low to High", sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Incline Dumbbell Press",       sets: "3", reps: "12-15", note: "", intensity: 6, eq: "db"      },
    { name: "Pec Deck / Chest Fly Machine", sets: "3", reps: "12-15", note: "", intensity: 5, eq: "machine" },
  ],
  Back: [
    { name: "Lat Pulldown",          sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable"   },
    { name: "Seated Cable Row",      sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable"   },
    { name: "Dumbbell Row",          sets: "3", reps: "12-15", note: "", intensity: 5, eq: "db"      },
    { name: "Chest Supported Row",   sets: "3", reps: "12-15", note: "", intensity: 5, eq: "machine" },
    { name: "Straight Arm Pulldown", sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable"   },
    { name: "Face Pull",             sets: "3", reps: "15",    note: "", intensity: 3, eq: "cable"   },
    { name: "Single Arm Cable Row",  sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable"   },
    { name: "Seated High Row",       sets: "3", reps: "12-15", note: "", intensity: 6, eq: "machine" },
  ],
  Shoulders: [
    { name: "Lateral Raise",      sets: "3", reps: "12-15", note: "", intensity: 4, eq: "db"    },
    { name: "Front Raise",        sets: "3", reps: "12-15", note: "", intensity: 4, eq: "db"    },
    { name: "Rear Delt Fly",      sets: "3", reps: "12-15", note: "", intensity: 4, eq: "db"    },
    { name: "Dumbbell Shoulder Press",     sets: "3", reps: "12-15", note: "", intensity: 6, eq: "db"    },
    { name: "Arnold Press",       sets: "3", reps: "12-15", note: "", intensity: 6, eq: "db"    },
    { name: "Upright Row",        sets: "3", reps: "12-15", note: "", intensity: 5, eq: "db"    },
    { name: "Face Pull",          sets: "3", reps: "15",    note: "", intensity: 3, eq: "cable" },
    { name: "Cable Lateral Raise",sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Y Raise",        sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
  ],
  Legs: [
    { name: "Barbell Squat",         sets: "3", reps: "10-12", note: "", intensity: 8, compound: true,  eq: "barbell" },
    { name: "Goblet Squat",          sets: "3", reps: "12-15", note: "", intensity: 6, compound: true,  eq: "db"      },
    { name: "Leg Press",             sets: "3", reps: "12-15", note: "", intensity: 6, compound: true,  eq: "machine" },
    { name: "Romanian Deadlift (RDL)",                   sets: "3", reps: "12-15", note: "", intensity: 6, compound: true,  eq: "db"      },
    { name: "Walking Lunges",        sets: "3", reps: "12-15", note: "", intensity: 5, compound: true,  eq: "db"      },
    { name: "Bulgarian Split Squat", sets: "3", reps: "12-15", note: "", intensity: 6, compound: true,  eq: "db"      },
    { name: "Hip Thrust",            sets: "3", reps: "12-15", note: "", intensity: 8, compound: true,  eq: "barbell" },
    { name: "Cable Glute Kickback",  sets: "3", reps: "15",    note: "", intensity: 6, compound: false, eq: "cable"   },
    { name: "Leg Extension",         sets: "3", reps: "12-15", note: "", intensity: 4, compound: false, eq: "machine" },
    { name: "Seated Leg Curl",       sets: "3", reps: "12-15", note: "", intensity: 4, compound: false, eq: "machine" },
    { name: "Calf Raises",           sets: "3", reps: "15",    note: "", intensity: 3, compound: false, eq: "db"      },
    { name: "Hip Abductor Machine",              sets: "3", reps: "15",    note: "", intensity: 3, compound: false, eq: "machine" },
    { name: "Hip Adductor Machine",              sets: "3", reps: "15",    note: "", intensity: 3, compound: false, eq: "machine" },
    { name: "Step Ups",              sets: "3", reps: "12-15", note: "", intensity: 4, compound: true,  eq: "db"      },
    { name: "Cable Hip Abduction",   sets: "3", reps: "15",    note: "", intensity: 3, compound: false, eq: "cable"   },
    { name: "Sumo Squat",            sets: "3", reps: "12-15", note: "", intensity: 6, compound: true,  eq: "db"      },
    { name: "Reverse Lunge",          sets: "3", reps: "12-15", note: "", intensity: 5, compound: true,  eq: "db"      },
    { name: "Cable Pull Through",    sets: "3", reps: "12-15", note: "", intensity: 6, compound: false, eq: "cable"   },
    { name: "Farmer's Carry",         sets: "3", reps: "40 YDS", note: "", intensity: 6, compound: true,  eq: "db"      },
  ],
  Biceps: [
    { name: "Dumbbell Curl",         sets: "3", reps: "12-15", note: "", intensity: 4, eq: "db"    },
    { name: "Hammer Curl",           sets: "3", reps: "12-15", note: "", intensity: 4, eq: "db"    },
    { name: "Incline Dumbbell Curl", sets: "3", reps: "12-15", note: "", intensity: 5, eq: "db"    },
    { name: "Cable Bicep Curl",      sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Hammer Curl",     sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Preacher Curl",         sets: "3", reps: "12-15", note: "", intensity: 5, eq: "machine"},
  ],
  Triceps: [
    { name: "Tricep Pushdown Machine",    sets: "3", reps: "12-15", note: "", intensity: 5, eq: "machine" },
    { name: "Single Arm Tricep Pulldown", sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable"   },
    { name: "Tricep Pushdown",             sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable"   },
    { name: "Overhead Tricep Extension",   sets: "3", reps: "12-15", note: "", intensity: 5, eq: "db"      },
    { name: "Tricep Kickback",             sets: "3", reps: "12-15", note: "", intensity: 4, eq: "db"      },
    { name: "Cable Overhead Tricep Ext",   sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable"   },
    { name: "Skull Crushers",              sets: "3", reps: "12-15", note: "", intensity: 6, eq: "ez"      },
    { name: "Dips",                        sets: "3", reps: "12-15", note: "", intensity: 6, eq: "bw"      },
  ],
  Core: [
    { name: "Plank",            sets: "3", reps: "45 SEC", note: "", intensity: 4, eq: "bw" },
    { name: "Bicycle Crunch",   sets: "3", reps: "20-25",  note: "", intensity: 4, eq: "bw" },
    { name: "Leg Raise",        sets: "3", reps: "15-20",  note: "", intensity: 5, eq: "bw" },
    { name: "Russian Twist",    sets: "3", reps: "20-25",  note: "", intensity: 4, eq: "bw" },
    { name: "Dead Bug",         sets: "3", reps: "10-12",  note: "", intensity: 5, eq: "bw" },
    { name: "Mountain Climbers",sets: "3", reps: "20-30",  note: "", intensity: 5, eq: "bw" },
    { name: "Ab Wheel Rollout", sets: "3", reps: "10-12",  note: "", intensity: 8, eq: "bw" },
    { name: "Hollow Hold",      sets: "3", reps: "30 SEC", note: "", intensity: 5, eq: "bw" },
    { name: "Flutter Kicks",    sets: "3", reps: "20-30",  note: "", intensity: 4, eq: "bw" },
    { name: "Cable Crunch",     sets: "3", reps: "15-20",  note: "", intensity: 6, eq: "cable" },
  ],
};

const WIFEY_CABLE_BANK = {
  "Upper Body": [
    { name: "Cable Lat Pulldown",            sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Seated Row",              sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Face Pull",               sets: "3", reps: "15",    note: "", intensity: 3, eq: "cable" },
    { name: "Cable Single Arm Row",          sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Straight Arm Pulldown",   sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Fly Low to High",         sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Fly High to Low",         sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Lateral Raise",           sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Front Raise",             sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Rear Delt Fly",           sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Upright Row",             sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Shrug",                   sets: "3", reps: "12-15", note: "", intensity: 3, eq: "cable" },
  ],
  Arms: [
    { name: "Cable Bicep Curl",                sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Hammer Curl",               sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Reverse Curl",              sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Overhead Tricep Extension", sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Tricep Rope Pulldown",      sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Tricep Kickback",           sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Single Arm Curl",           sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Bar Curl",                  sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
  ],
  "Lower Body": [
    { name: "Cable Squat",             sets: "3", reps: "12-15", note: "", intensity: 6, eq: "cable" },
    { name: "Cable Romanian Deadlift", sets: "3", reps: "12-15", note: "", intensity: 6, eq: "cable" },
    { name: "Cable Glute Kickback",    sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Hip Abduction",     sets: "3", reps: "15",    note: "", intensity: 3, eq: "cable" },
    { name: "Cable Hip Adduction",     sets: "3", reps: "15",    note: "", intensity: 3, eq: "cable" },
    { name: "Cable Leg Curl",          sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Pull Through",    sets: "3", reps: "12-15", note: "", intensity: 6, eq: "cable" },
  ],
  Core: [
    { name: "Cable Woodchop High-Low",  sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Woodchop Low-High",  sets: "3", reps: "12-15", note: "", intensity: 5, eq: "cable" },
    { name: "Cable Pallof Press",       sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Oblique Twist",      sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
    { name: "Cable Kneeling Crunch",    sets: "3", reps: "12-15", note: "", intensity: 4, eq: "cable" },
  ],
};

const LOG_ONLY_EXERCISES = [];

const CARDIO_OPTIONS = [
  { id: "stair-stepper",   label: "Stair Stepper",  icon: "TrendingUp"      },
  { id: "incline-walking", label: "Incline Walking", icon: "TriangleRight"  },
  { id: "flat-walking",    label: "Flat Walking",    icon: "Activity"      },
  { id: "running",         label: "Running",         icon: "Wind"            },
  { id: "jogging",         label: "Jogging",         icon: "Zap"  },
  { id: "pilates",         label: "Pilates",         icon: "Dumbbell"           },
];

const APP_VERSION = "1.2";

const FINISH_MESSAGES = [
  "BEAST MODE.",
  "NO DAYS OFF. EVER.",
  "BUILT DIFFERENT.",
  "DONE.",
  "SEE YOU TOMORROW.",
  "ONE STEP CLOSER.",
  "YOU JUST DID THAT.",
  "LIGHT WORK.",
  "YOU BROKE A SWEAT.",
  "FUTURE YOU SAYS THANKS.",
  "LOCKED IN.",
  "ANOTHER ONE.",
  "NO EXCUSES. JUST RESULTS.",
  "THE WORK DOESN'T LIE.",
  "EARNED, NOT GIVEN.",
  "RELENTLESS.",
];
const MIN_PER_GROUP = 3;
const DEFAULT_TOTAL = 7;
const REST_DURATION = 90;

// Portable = can do right next to a fixed station. Fixed = machine/cable/barbell needs its own spot.
const PORTABLE_EQ = new Set(["db", "ez", "bw"]);
function isPortable(eq) { return PORTABLE_EQ.has(eq); }
function isFixed(eq) { return !isPortable(eq); }

// ── SUPERSET RULES ────────────────────────────────────────────────────────────
// Hardcoded valid superset definitions per muscle group.
// Each entry: { groupA, exA (optional — any if null), groupB, exB (optional) }
// For Back: any back exercise + EZ Bar Curl or Dumbbell Curl (pulled from Biceps)
// For Shoulders: any shoulder primary + Lateral Raise / Front Raise / Rear Delt Fly
// For Biceps: any 2 bicep exercises except 21s
// For Chest/Triceps: fixed pairs only

const SHOULDER_ISOLATION = ["Lateral Raise", "Front Raise", "Rear Delt Fly"];
const BICEP_SUPERSET_EXCLUDE = ["Barbell 21s (Bicep Curl)"];
const BACK_CURL_OPTIONS = ["EZ Bar Curl", "Dumbbell Curl"];

const FIXED_TRICEP_CHEST_PAIRS = [
  { a: { group: "Triceps", name: "Tricep Reverse Grip Pushdown" }, b: { group: "Triceps", name: "Tricep Straight Bar Pushdown" } },
  { a: { group: "Triceps", name: "Skullcrusher" },          b: { group: "Chest",   name: "Dumbbell Bench Press" } },
];

function injectSupersets(sections) {
  // Figure out which groups are present
  const groups = sections.map(s => s.group);
  const hasGroup = g => groups.includes(g);

  // Build candidate superset options based on present groups
  const options = [];

  if (hasGroup("Back")) options.push("back");
  if (hasGroup("Shoulders")) options.push("shoulders");
  if (hasGroup("Biceps")) options.push("biceps");
  // Tricep/Chest fixed pairs — only if relevant groups present
  FIXED_TRICEP_CHEST_PAIRS.forEach((pair, i) => {
    if (hasGroup(pair.a.group) && hasGroup(pair.b.group)) options.push("tricep_chest_" + i);
  });

  if (!options.length) return sections;

  // Pick a random valid option
  const choice = options[Math.floor(Math.random() * options.length)];
  let newSections = sections.map(s => ({ ...s, exercises: [...s.exercises] }));

  function tagPair(secA, idxA, secB, idxB) {
    const nameA = newSections[secA].exercises[idxA].name;
    const nameB = newSections[secB].exercises[idxB].name;
    newSections[secA].exercises[idxA] = { ...newSections[secA].exercises[idxA], supersetId: "ss0", supersetRole: "A", supersetPartner: nameB };
    newSections[secB].exercises[idxB] = { ...newSections[secB].exercises[idxB], supersetId: "ss0", supersetRole: "B", supersetPartner: nameA };
  }

  if (choice === "back") {
    const backIdx = sections.findIndex(s => s.group === "Back");
    const biIdx = sections.findIndex(s => s.group === "Biceps");
    const backExes = newSections[backIdx].exercises;
    if (!backExes.length) return sections;
    // Pick a random back exercise
    const anchorIdx = Math.floor(Math.random() * backExes.length);
    // Pick curl from biceps section if present, else skip
    if (biIdx !== -1) {
      const curlName = BACK_CURL_OPTIONS[Math.floor(Math.random() * BACK_CURL_OPTIONS.length)];
      const curlIdx = newSections[biIdx].exercises.findIndex(e => e.name === curlName);
      if (curlIdx !== -1) {
        tagPair(backIdx, anchorIdx, biIdx, curlIdx);
      }
    }
  } else if (choice === "shoulders") {
    const si = sections.findIndex(s => s.group === "Shoulders");
    const exes = newSections[si].exercises;
    // Pick one isolation exercise and one non-isolation exercise
    const isolationIdxs = exes.map((e,i) => SHOULDER_ISOLATION.includes(e.name) ? i : -1).filter(i => i !== -1);
    const primaryIdxs = exes.map((e,i) => !SHOULDER_ISOLATION.includes(e.name) ? i : -1).filter(i => i !== -1);
    if (!isolationIdxs.length || !primaryIdxs.length) return sections;
    const isoIdx = isolationIdxs[Math.floor(Math.random() * isolationIdxs.length)];
    const priIdx = primaryIdxs[Math.floor(Math.random() * primaryIdxs.length)];
    tagPair(si, priIdx, si, isoIdx);
  } else if (choice === "biceps") {
    const bi = sections.findIndex(s => s.group === "Biceps");
    const eligible = newSections[bi].exercises.map((e,i) => !BICEP_SUPERSET_EXCLUDE.includes(e.name) ? i : -1).filter(i => i !== -1);
    if (eligible.length < 2) return sections;
    const [i, j] = shuffle(eligible).slice(0, 2);
    tagPair(bi, i, bi, j);
  } else if (choice.startsWith("tricep_chest_")) {
    const pairIdx = parseInt(choice.split("_")[2]);
    const pair = FIXED_TRICEP_CHEST_PAIRS[pairIdx];
    const secA = sections.findIndex(s => s.group === pair.a.group);
    const secB = sections.findIndex(s => s.group === pair.b.group);
    const exA = newSections[secA].exercises.findIndex(e => e.name === pair.a.name);
    const exB = newSections[secB].exercises.findIndex(e => e.name === pair.b.name);
    // If either exercise isn't in this workout, skip
    if (exA === -1 || exB === -1) return sections;
    tagPair(secA, exA, secB, exB);
  }

  return newSections;
}
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
  "Barbell Row","Chest Supported Row","Pull Up","Seated Row Machine","Deadlift","Wide Grip Seated Cable Row",
  "Barbell Squat","Box Squat","Hack Squat","Pendulum Squat","Leg Press",
  "Bulgarian Split Squat","Deficit Reverse Lunge","Walking Lunges","Static Lunges","Step Ups","Romanian Deadlift (RDL)","Hip Thrust",
  "Standing Barbell Shoulder Press","Dumbbell Shoulder Press","Arnold Press","Chin Up",
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

// Option D: Compounds always 4. Isolations get 4 in first half, 3 in second half.
// Plus 20% random chance any isolation flips to 3 regardless of position.
const COMPOUND_MOVEMENTS = new Set([
  "Flat Bench Press","Incline Bench Press","Decline Bench Press","Close Grip Bench Press",
  "Standing Barbell Shoulder Press","Barbell Row","Rack Pull","Pull Up","Dips",
  "Barbell Squat","Pendulum Squat","Hack Squat","Box Squat","Leg Press","Romanian Deadlift (RDL)",
  "Bulgarian Split Squat","Deficit Reverse Lunge","Walking Lunges","Step Ups","Static Lunges",
  "Arnold Press","Dumbbell Shoulder Press","Upright Row","Smith Machine Shoulder Press",
]);
function assignSets(exercises, defaultSets) {
  const total = exercises.length;
  return exercises.map((ex, i) => {
    const isCompound = COMPOUND_MOVEMENTS.has(ex.name) || (ex.compound === true);
    const inSecondHalf = i >= Math.ceil(total * 0.6);
    const randomFlip = Math.random() < 0.2;
    const useFewer = !isCompound && (inSecondHalf || randomFlip);
    return { ...ex, sets: useFewer ? String(Math.max(3, parseInt(defaultSets) - 1)) : defaultSets };
  });
}

function generateCoreWorkout(total) {
  const pool = shuffle(CORE_BANK).slice(0, total);
  const ordered = [...pool].sort((a, b) => b.intensity - a.intensity);
  return { sections: [{ group: "Core", displayGroup: "CORE / ABS", exercises: ordered }], startTime: Date.now() };
}

function generateBroWorkout(split, total) {
  // Core split uses shared core generator
  if (split.isCore) return generateCoreWorkout(total);
  const minPer = split.fullBody ? 1 : MIN_PER_GROUP;
  const counts = distributeExercises(BRO_EXERCISE_BANK, split.groups, total, minPer);
  // Shoulders/Legs split: ensure shoulders always >= legs
  if (split.id === "shoulders-legs" && counts["Legs"] > counts["Shoulders"]) {
    const diff = counts["Legs"] - counts["Shoulders"];
    counts["Shoulders"] += diff;
    counts["Legs"] -= diff;
  }
  const sections = split.groups.map(group => {
    let pool;
    if (group === "Legs" && split.legsMode === "compound") {
      const compound = shuffle(BRO_EXERCISE_BANK[group].filter(e => e.compound && !e.supersetOnly));
      const isolated = shuffle(BRO_EXERCISE_BANK[group].filter(e => !e.compound && !e.supersetOnly));
      const cCount = Math.ceil(counts[group] * 0.7);
      const iCount = counts[group] - cCount;
      pool = [...compound.slice(0, cCount), ...isolated.slice(0, iCount)];
    } else if (group === "Legs" && split.legsMode === "isolated") {
      const compound = shuffle(BRO_EXERCISE_BANK[group].filter(e => e.compound && !e.supersetOnly));
      const isolated = shuffle(BRO_EXERCISE_BANK[group].filter(e => !e.compound && !e.supersetOnly));
      const total = counts[group];
      // Always 1 compound minimum, rest isolated. Compounds never exceed isolations.
      const maxCompounds = Math.floor(total / 2); // e.g. 3->1, 4->2, 2->1
      const cCount = Math.min(Math.max(1, maxCompounds), compound.length);
      const iCount = Math.min(total - cCount, isolated.length);
      pool = [...compound.slice(0, cCount), ...isolated.slice(0, iCount)];
    } else if (split.fullBody && group === "Legs") {
      pool = [...shuffle(BRO_EXERCISE_BANK[group].filter(e => e.compound && !e.supersetOnly)), ...shuffle(BRO_EXERCISE_BANK[group].filter(e => !e.compound && !e.supersetOnly))];
    } else if (split.fullBody) {
      pool = [...shuffle(BRO_EXERCISE_BANK[group].filter(e => COMPOUND_NAMES.includes(e.name) && !e.supersetOnly)), ...shuffle(BRO_EXERCISE_BANK[group].filter(e => !COMPOUND_NAMES.includes(e.name) && !e.supersetOnly))];
    } else {
      pool = shuffle(BRO_EXERCISE_BANK[group].filter(e => !e.supersetOnly));
    }
    const ordered = orderByIntensity(pool.slice(0, counts[group]), total);
    return { group, displayGroup: group, exercises: ordered };
  });
  // Flatten all exercises, assign sets, then put back
  const allEx = sections.flatMap(s => s.exercises);
  const withSets = assignSets(allEx, "4");
  let idx = 0;
  const finalSections = sections.map(s => ({ ...s, exercises: s.exercises.map(() => withSets[idx++]) }));
  return { sections: finalSections, startTime: Date.now() };
}

function getUsedExercisesLast2Weeks(history, workoutType) {
  const cutoff = Date.now() - 14 * 24 * 60 * 60 * 1000;
  const used = new Set();
  history.forEach(h => {
    if (h.type === "workout" && h.date >= cutoff) {
      const isMatch = workoutType === "cables"
        ? h.split === "All Cables"
        : h.split === "Full Body";
      if (isMatch && h.exercises) h.exercises.forEach(name => used.add(name));
    }
  });
  return used;
}

function generateWifeyWorkout(bank, total, history, workoutType) {
  const usedRecently = getUsedExercisesLast2Weeks(history || [], workoutType);
  const groups = Object.keys(bank);
  const counts = distributeExercises(bank, groups, total, 1);
  const GLUTE_NAMES = new Set(["Hip Thrust","Cable Glute Kickback","Cable Hip Abduction","Romanian Deadlift (RDL)","Bulgarian Split Squat","Walking Lunges","Step Ups","Goblet Squat"]);
  const sections = groups.map(group => {
    let pool;
    if (group === "Legs") {
      // Glute-biased leg day: compounds first, always try to include a glute exercise
      const allLegs = bank[group].filter(e => !e.supersetOnly);
      const glutes   = shuffle(allLegs.filter(e => GLUTE_NAMES.has(e.name)));
      const compound = shuffle(allLegs.filter(e => e.compound && !GLUTE_NAMES.has(e.name)));
      const isolated = shuffle(allLegs.filter(e => !e.compound && !GLUTE_NAMES.has(e.name)));
      const n = counts[group];
      const gluteCount = Math.max(1, Math.round(n * 0.4));
      const compoundCount = Math.max(1, Math.round(n * 0.4));
      const isolatedCount = Math.max(0, n - gluteCount - compoundCount);
      pool = [
        ...glutes.slice(0, gluteCount),
        ...compound.slice(0, compoundCount),
        ...isolated.slice(0, isolatedCount),
      ].slice(0, n);
      // Backfill if we didn't get enough
      if (pool.length < n) {
        const used = new Set(pool.map(e => e.name));
        const remaining = shuffle(allLegs.filter(e => !used.has(e.name)));
        pool = [...pool, ...remaining].slice(0, n);
      }
    } else {
      const fresh = shuffle(bank[group].filter(e => !usedRecently.has(e.name) && !e.supersetOnly));
      const stale = shuffle(bank[group].filter(e => usedRecently.has(e.name) && !e.supersetOnly));
      pool = [...fresh, ...stale];
    }
    const ordered = orderByIntensity(pool.slice(0, counts[group]), total);
    return { group, displayGroup: group, exercises: ordered };
  });
  const allEx = sections.flatMap(s => s.exercises);
  const withSets = assignSets(allEx, "3");
  let idx = 0;
  const finalSections = sections.map(s => ({ ...s, exercises: s.exercises.map(() => withSets[idx++]) }));
  return { sections: finalSections, startTime: Date.now() };
}

function getWeekKey(ts) {
  const d = new Date(ts);
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((day + 6) % 7));
  const y = monday.getFullYear();
  const m = String(monday.getMonth() + 1).padStart(2, "0");
  const dd = String(monday.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
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
// ── WARMUP BANK ───────────────────────────────────────────────────────────
const WARMUP_BANK = {
  Chest: [
    { name: "Arm Circles",            cue: "Full range, slow and controlled" },
    { name: "Band Pull-Aparts",       cue: "Squeeze shoulder blades together" },
    { name: "Push Up Hold",           cue: "Hold bottom position, breathe deep" },
    { name: "Shoulder Rolls",         cue: "Forward then backward, stay loose" },
  ],
  Back: [
    { name: "Cat-Cow",                cue: "Arch and round, breathe with each rep" },
    { name: "Arm Circles",            cue: "Full range, slow and controlled" },
    { name: "Scapular Squeezes",      cue: "Pinch shoulder blades, hold 2 seconds" },
    { name: "Hip Hinge",              cue: "Soft knees, push hips back, keep back flat" },
  ],
  Shoulders: [
    { name: "Arm Circles",            cue: "Small to large, forward and back" },
    { name: "Neck Rolls",             cue: "Slow and controlled, no fast movements" },
    { name: "Cross-Body Shoulder",    cue: "Pull arm across, hold the stretch" },
    { name: "Overhead Reach",         cue: "Reach tall, alternate sides" },
  ],
  Legs: [
    { name: "Leg Swings",             cue: "Forward and back, hold wall for balance" },
    { name: "Hip Circles",            cue: "Big slow circles each direction" },
    { name: "Walking Lunges",         cue: "Controlled step, knee tracks over toe" },
    { name: "Inchworm",               cue: "Walk hands out, pause, walk back" },
    { name: "Glute Bridges",          cue: "Drive hips up, squeeze at the top" },
    { name: "Ankle Rotations",        cue: "Full circles each direction, both ankles" },
  ],
  Arms: [
    { name: "Wrist Circles",          cue: "Full circles each direction" },
    { name: "Arm Circles",            cue: "Small to large, stay relaxed" },
    { name: "Shoulder Rolls",         cue: "Forward then backward, loosen up" },
  ],
  "Full Body": [
    { name: "Jumping Jacks",          cue: "Easy pace, get the heart rate up" },
    { name: "Hip Circles",            cue: "Big slow circles each direction" },
    { name: "Inchworm",               cue: "Walk hands out, pause, walk back" },
    { name: "Leg Swings",             cue: "Forward and back, hold wall for balance" },
    { name: "Arm Circles",            cue: "Full range, forward and back" },
  ],
  "All Cables": [
    { name: "Arm Circles",            cue: "Full range, forward and back" },
    { name: "Scapular Squeezes",      cue: "Pinch shoulder blades, hold 2 seconds" },
    { name: "Hip Hinge",              cue: "Soft knees, push hips back, keep back flat" },
    { name: "Shoulder Rolls",         cue: "Forward then backward, stay loose" },
  ],
  Cardio: [
    { name: "Marching In Place",      cue: "Drive knees up, swing arms" },
    { name: "Hip Circles",            cue: "Big slow circles each direction" },
    { name: "Leg Swings",             cue: "Forward and back, hold wall for balance" },
  ],
};

const WARMUP_DURATION = 45;

// ── LOG WORKOUT FEATURE ───────────────────────────────────────────────────────
// Self-contained component. To revert: remove this block and the two "LOG WORKOUT"
// cards in bro-home / wifey-home, and the two screen handlers below (log-bro / log-wifey).
function LogWorkoutScreen({ color, profileName, allExercises, prs, onSavePr, onComplete, onBack, onSaveWorkout }) {
  const [workoutLabel, setWorkoutLabel] = useState("");
  const [exercises, setExercises] = useState([]);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [newPrNames, setNewPrNames] = useState(new Set());
  const [prModal, setPrModal] = useState(null);
  const [prWeight, setPrWeight] = useState("");
  const [prReps, setPrReps] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [isLogSaved, setIsLogSaved] = useState(false);
  const [workoutDate, setWorkoutDate] = useState(() => new Date().toISOString().slice(0, 10));
  const summaryRef = useRef(null);
  const startTime = useRef(Date.now());

  const suggestions = query.length >= 1
    ? allExercises.filter(e => e.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  function addExercise(name) {
    setExercises(ex => [...ex, { name, sets: "3", reps: "10", weight: "" }]);
    setQuery("");
    setShowSuggestions(false);
  }

  function removeExercise(i) {
    setExercises(ex => ex.filter((_, idx) => idx !== i));
  }

  function updateExercise(i, field, val) {
    setExercises(ex => ex.map((e, idx) => idx === i ? { ...e, [field]: val } : e));
  }

  function openPr(name) {
    setPrModal(name);
    setPrWeight(prs[name]?.weight || "");
    setPrReps(prs[name]?.reps || "");
  }

  function savePr() {
    if (!prWeight || !prReps) return;
    onSavePr(prModal, { weight: prWeight, reps: prReps, date: Date.now() });
    setNewPrNames(prev => new Set([...prev, prModal]));
    setPrModal(null);
  }

  function handleComplete() {
    if (!exercises.length) return;
    const FINISH_MESSAGES = ["CRUSHED IT.","DONE.","LOCKED IN.","WORK DONE.","LET'S GO."];
    const finishMsg = FINISH_MESSAGES[Math.floor(Math.random() * FINISH_MESSAGES.length)];
    const label = workoutLabel.trim() || "Custom Workout";
    const selectedDate = new Date(workoutDate + "T12:00:00").getTime();
    const data = {
      split: label, color: "#FFFFFF", date: selectedDate,
      duration: Date.now() - startTime.current,
      exercises: exercises.map(e => e.name),
      exerciseDetails: exercises.map(e => ({ name: e.name, sets: e.sets, reps: e.reps, weight: e.weight || null })),
      total: exercises.length, finishMsg, type: "workout",
      newPrs: [...newPrNames]
    };
    onComplete(data);
    setSummaryData(data);
    setSubmitted(true);
  }

  async function handleScreenshot() {
    if (!summaryRef.current) return;
    try {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      document.head.appendChild(script);
      await new Promise(res => { script.onload = res; });
      const canvas = await window.html2canvas(summaryRef.current, { backgroundColor: "#0e0e0e", scale: 3, useCORS: true, logging: false });
      canvas.toBlob(async blob => {
        if (navigator.share && navigator.canShare({ files: [new File([blob], "daily-grind.png", { type: "image/png" })] })) {
          await navigator.share({ files: [new File([blob], "daily-grind.png", { type: "image/png" })] });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a"); a.href = url; a.download = "daily-grind-workout.png"; a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (e) { console.error("Screenshot failed", e); }
  }

  // Summary view
  if (submitted && summaryData) return (
    <Wrap>
      <div className="sov">
        <div ref={summaryRef} style={{ background:"#0e0e0e", borderTop:`4px solid ${color}`, borderLeft:`4px solid ${color}`, borderRight:"1px solid #1a1a1a", borderBottom:"1px solid #1a1a1a", borderRadius:4, padding:28, width:"100%", maxWidth:390, maxHeight:"90vh", overflowY:"auto" }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:64, fontWeight:900, color, lineHeight:1, letterSpacing:2 }}>{summaryData.finishMsg}</div>
            <div style={{ color:"#333", fontSize:12, fontFamily:"'Barlow Condensed'", letterSpacing:2, marginTop:4 }}>{new Date(summaryData.date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}).toUpperCase()}</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
            {[{label:"WORKOUT",value:summaryData.split},{label:"TIME",value:summaryData.duration < 5*60*1000 ? "—" : formatDuration(summaryData.duration)},{label:"EXERCISES",value:summaryData.total},{label:"SETS",value:(summaryData.exerciseDetails||[]).reduce((acc,ex)=>acc+(parseInt(ex.sets)||0),0)}].map(({label,value}) => (
              <div key={label} style={{ background:"#141414", borderLeft:`3px solid ${color}`, padding:"12px 14px" }}>
                <div style={{ color:"#444", fontSize:10, letterSpacing:2, fontFamily:"'Barlow Condensed'", fontWeight:700, marginBottom:3 }}>{label}</div>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:24, fontWeight:900, color:"#fff", lineHeight:1 }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ background:"#141414", padding:14, marginBottom:18 }}>
            <div style={{ color:"#333", fontSize:10, letterSpacing:2, fontFamily:"'Barlow Condensed'", fontWeight:700, marginBottom:10 }}>EXERCISES</div>
            {summaryData.exercises.map((name, i) => (
              <div key={i} style={{ paddingBottom:7, marginBottom:7, borderBottom: i < summaryData.exercises.length-1?"1px solid #1a1a1a":"none" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontFamily:"'Barlow Condensed'", fontWeight:900, fontSize:15, color, minWidth:20 }}>{i+1}</span>
                  <span style={{ color:"#888", fontSize:13, fontFamily:"'Barlow Condensed'", fontWeight:600 }}>{name}</span>
                </div>
                {summaryData.newPrs.includes(name) && (
                  <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3, marginLeft:30 }}>
                    <Trophy size={11} color="#FFD700" fill="#FFD700" />
                    <span style={{ fontFamily:"'Barlow Condensed'", fontSize:11, fontWeight:800, letterSpacing:1.5, color:"#FFD700" }}>NEW PR</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="mbtn" style={{ background:color, color:"#000", marginBottom:10 }} onClick={onBack}>BACK TO HOME</button>
          {onSaveWorkout && (
            <button className="mbtn" onClick={() => { if (!isLogSaved) { onSaveWorkout(summaryData); setIsLogSaved(true); } }} style={{ background:"transparent", color: isLogSaved ? "#FFB300" : "#2a2a2a", border: isLogSaved ? "1px solid #FFB30040" : "1px solid #1e1e1e", marginBottom:8 }}>{isLogSaved ? "SAVED ★" : "SAVE WORKOUT"}</button>
          )}
          <button className="mbtn" onClick={handleScreenshot} style={{ background:"transparent", color:"#888", border:"1px solid #252525", marginTop:8, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}><Share2 size={14} color="#888" />SHARE WORKOUT</button>
        </div>
      </div>
    </Wrap>
  );

  // Logger view
  return (
    <Wrap>
      <div className="sc" style={{ padding:"56px 20px 40px" }}>
        <button className="bk" onClick={onBack}>BACK</button>
        <div style={{ marginTop:28, marginBottom:28 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color, fontWeight:700, marginBottom:4 }}>LOG YOUR WORKOUT</div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:52, fontWeight:900, lineHeight:0.9, letterSpacing:1 }}>WHAT DID<br/>YOU DO?</div>
        </div>

        {/* Workout label */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:8 }}>WORKOUT NAME (OPTIONAL)</div>
          <input className="minput" placeholder="e.g. Push Day, Chest & Tris..." value={workoutLabel} onChange={e => setWorkoutLabel(e.target.value)} style={{ borderColor: workoutLabel ? color : "#2a2a2a" }} />
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:8, marginTop:16 }}>DATE</div>
          <div style={{ background:"#161616", border:"1px solid #2a2a2a", borderRadius:4, padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <button onClick={() => { const d = new Date(workoutDate + "T12:00:00"); d.setDate(d.getDate()-1); setWorkoutDate(d.toISOString().slice(0,10)); }} style={{ background:"none", border:"none", color:"#666", fontSize:22, cursor:"pointer", padding:"0 8px", fontFamily:"'Barlow Condensed'", fontWeight:700, lineHeight:1 }}>‹</button>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:18, fontWeight:600, color:"#fff", letterSpacing:1 }}>{new Date(workoutDate + "T12:00:00").toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric", year:"numeric" }).toUpperCase()}</div>
            <button onClick={() => { const d = new Date(workoutDate + "T12:00:00"); d.setDate(d.getDate()+1); const today = new Date().toISOString().slice(0,10); if (d.toISOString().slice(0,10) <= today) setWorkoutDate(d.toISOString().slice(0,10)); }} style={{ background:"none", border:"none", color:"#666", fontSize:22, cursor:"pointer", padding:"0 8px", fontFamily:"'Barlow Condensed'", fontWeight:700, lineHeight:1 }}>›</button>
          </div>
        </div>

        {/* Exercise search */}
        <div style={{ marginBottom:20, position:"relative" }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:8 }}>ADD EXERCISES</div>
          <input className="minput" placeholder="Search exercises..." value={query}
            onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            style={{ borderColor: query ? color : "#2a2a2a" }} />
          {showSuggestions && suggestions.length > 0 && (
            <div style={{ position:"absolute", top:"100%", left:0, right:0, background:"#111", border:`1px solid ${color}40`, borderRadius:2, zIndex:10, marginTop:2 }}>
              {suggestions.map(name => (
                <div key={name} onMouseDown={() => addExercise(name)}
                  style={{ padding:"12px 14px", fontFamily:"'Barlow Condensed'", fontSize:15, fontWeight:700, color:"#ccc", borderBottom:"1px solid #1a1a1a", cursor:"pointer" }}>
                  {name.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exercise list */}
        {exercises.length > 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
            {exercises.map((ex, i) => (
              <div key={i} style={{ background:"#0f0f0f", border:`1px solid #1a1a1a`, borderLeft:`3px solid ${color}`, padding:"12px 14px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <div style={{ fontFamily:"'Barlow Condensed'", fontSize:16, fontWeight:800, letterSpacing:0.5 }}>{ex.name.toUpperCase()}</div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => openPr(ex.name)} style={{ background: newPrNames.has(ex.name) ? "#FFD70015" : "#111", border: newPrNames.has(ex.name) ? "1px solid #FFD70040" : "1px solid #1e1e1e", borderRadius:2, padding:"4px 10px", fontFamily:"'Barlow Condensed'", fontSize:11, fontWeight:800, color: newPrNames.has(ex.name) ? "#FFD700" : "#444", cursor:"pointer", letterSpacing:1 }}>
                      {newPrNames.has(ex.name) ? "PR ✓" : "PR"}
                    </button>
                    <button onClick={() => removeExercise(i)} style={{ background:"transparent", border:"1px solid #1e1e1e", borderRadius:2, padding:"4px 8px", color:"#333", cursor:"pointer", fontFamily:"'Barlow Condensed'", fontSize:13, fontWeight:800 }}>✕</button>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Barlow Condensed'", fontSize:9, letterSpacing:2, color:"#444", marginBottom:4 }}>SETS</div>
                    <input className="minput" type="number" value={ex.sets} onChange={e => updateExercise(i, "sets", e.target.value)} style={{ padding:"8px 10px", fontSize:14, borderColor:"#1e1e1e" }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Barlow Condensed'", fontSize:9, letterSpacing:2, color:"#444", marginBottom:4 }}>REPS</div>
                    <input className="minput" value={ex.reps} onChange={e => updateExercise(i, "reps", e.target.value)} style={{ padding:"8px 10px", fontSize:14, borderColor:"#1e1e1e" }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Barlow Condensed'", fontSize:9, letterSpacing:2, color:"#444", marginBottom:4 }}>WEIGHT (LBS)</div>
                    <input className="minput" type="number" placeholder="—" value={ex.weight || ""} onChange={e => updateExercise(i, "weight", e.target.value)} style={{ padding:"8px 10px", fontSize:14, borderColor: ex.weight ? color+"60" : "#1e1e1e", color: ex.weight ? "#fff" : "#555" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {exercises.length === 0 && (
          <div style={{ textAlign:"center", padding:"32px 0", color:"#222", fontFamily:"'Barlow Condensed'", fontSize:13, letterSpacing:2 }}>NO EXERCISES ADDED YET</div>
        )}

        <button className="mbtn" style={{ background: exercises.length ? color : "#161616", color: exercises.length ? "#000" : "#333" }}
          disabled={!exercises.length} onClick={handleComplete}>COMPLETE WORKOUT</button>
      </div>

      {/* PR Modal */}
      {prModal && (
        <div className="sov">
          <div style={{ background:"#111", border:"1px solid #252525", borderRadius:4, padding:24, width:"100%", maxWidth:320 }}>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:20, fontWeight:900, marginBottom:4 }}>{prModal.toUpperCase()}</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#444", letterSpacing:2, marginBottom:20 }}>LOG NEW PR</div>
            <input className="minput" type="number" placeholder="Weight (lbs)" value={prWeight} onChange={e => setPrWeight(e.target.value)} style={{ marginBottom:10 }} />
            <input className="minput" type="number" placeholder="Reps" value={prReps} onChange={e => setPrReps(e.target.value)} style={{ marginBottom:16 }} />
            <button className="mbtn" style={{ background:color, color:"#000", marginBottom:8 }} onClick={savePr}>SAVE PR</button>
            <button className="mbtn" style={{ background:"transparent", color:"#333", border:"1px solid #1e1e1e" }} onClick={() => setPrModal(null)}>CANCEL</button>
          </div>
        </div>
      )}
    </Wrap>
  );
}
// ── END LOG WORKOUT FEATURE ────────────────────────────────────────────────────

// ── CARDIO SCREEN ─────────────────────────────────────────────────────────
function CardioScreen({ color, onBack, onComplete }) {
  const [cardioType, setCardioType] = useState(null);
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [calories, setCalories] = useState("");
  const [logged, setLogged] = useState(false);

  function handleLog() {
    if (!cardioType || !duration) return;
    const entry = {
      type: "cardio",
      cardioType: cardioType.label,
      durationMins: duration,
      distanceMiles: distance || null,
      caloriesBurned: calories || null,
      date: Date.now(),
      color: "#888"
    };
    onComplete(entry);
    setLogged(true);
  }

  const summaryParts = [
    duration && `${duration} MIN`,
    distance && `${distance} MI`,
    calories && `${calories} CAL`,
  ].filter(Boolean).join(" · ");

  return (
    <Wrap>
      <div className="sc" style={{ padding:"56px 20px 40px" }}>
        <button className="bk" onClick={onBack}>BACK</button>
        <div style={{ marginTop:28, marginBottom:32 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color, fontWeight:700, marginBottom:4 }}>LOG SESSION</div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:58, fontWeight:900, lineHeight:0.9 }}>CARDIO<br/><span style={{ color }}>DAY</span></div>
        </div>
        {logged ? (
          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, color, lineHeight:1 }}>LOGGED.</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:14, color:"#444", letterSpacing:2, marginTop:8 }}>{cardioType?.label?.toUpperCase()} · {summaryParts}</div>
            <button className="mbtn" style={{ background:color, color:"#000", marginTop:32 }} onClick={onBack}>BACK TO HOME</button>
          </div>
        ) : (
          <>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:12 }}>SELECT ACTIVITY</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:28 }}>
              {CARDIO_OPTIONS.map(opt => (
                <div key={opt.id} className={`caopt${cardioType?.id===opt.id?" sel":""}`}
                  style={{ borderColor: cardioType?.id===opt.id ? color : undefined, background: cardioType?.id===opt.id ? color+"10" : undefined }}
                  onClick={() => setCardioType(opt)}>
                  {opt.icon === "TrendingUp" && <TrendingUp size={18} color={cardioType?.id===opt.id?"#000":color} />}
                  {opt.icon === "TriangleRight" && (
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={cardioType?.id===opt.id?"#000":color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 18L2 18L22 6L22 18Z" />
                    </svg>
                  )}
                  {opt.icon === "Activity"   && <Activity   size={18} color={cardioType?.id===opt.id?"#000":color} />}
                  {opt.icon === "Wind"       && <Wind       size={18} color={cardioType?.id===opt.id?"#000":color} />}
                  {opt.icon === "Zap"        && <Zap        size={18} color={cardioType?.id===opt.id?"#000":color} />}
                  {opt.icon === "Dumbbell"   && <Dumbbell   size={18} color={cardioType?.id===opt.id?"#000":color} />}
                  <span style={{ fontFamily:"'Barlow Condensed'", fontSize:20, fontWeight:800, letterSpacing:1 }}>{opt.label.toUpperCase()}</span>
                </div>
              ))}
            </div>

            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:10 }}>DURATION (MINUTES) <span style={{ color:"#2a2a2a" }}>*</span></div>
            <input className="minput" type="number" placeholder="e.g. 30" value={duration}
              onChange={e => setDuration(e.target.value)}
              style={{ marginBottom:16, borderColor:duration?color:"#2a2a2a" }} />

            <div style={{ display:"flex", gap:12, marginBottom:24 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:10 }}>DISTANCE (MILES)</div>
                <input className="minput" type="number" placeholder="e.g. 3.1" value={distance}
                  onChange={e => setDistance(e.target.value)}
                  style={{ borderColor:distance?color:"#2a2a2a" }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:10 }}>CALORIES BURNED</div>
                <input className="minput" type="number" placeholder="e.g. 350" value={calories}
                  onChange={e => setCalories(e.target.value)}
                  style={{ borderColor:calories?color:"#2a2a2a" }} />
              </div>
            </div>

            <button className="mbtn"
              style={{ background:cardioType&&duration?color:"#161616", color:cardioType&&duration?"#000":"#333" }}
              disabled={!cardioType||!duration} onClick={handleLog}>LOG CARDIO</button>
          </>
        )}
      </div>
    </Wrap>
  );
}
// ── END CARDIO SCREEN ──────────────────────────────────────────────────────

function WarmupScreen({ exercises, color, onComplete, onSkip }) {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(WARMUP_DURATION);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  function startTimer() {
    setRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setRunning(false);
          if (current + 1 < exercises.length) {
            setCurrent(c => c + 1);
            setTimeLeft(WARMUP_DURATION);
          } else {
            onComplete();
          }
          return WARMUP_DURATION;
        }
        return t - 1;
      });
    }, 1000);
  }

  function skipExercise() {
    clearInterval(timerRef.current);
    setRunning(false);
    if (current + 1 < exercises.length) {
      setCurrent(c => c + 1);
      setTimeLeft(WARMUP_DURATION);
    } else {
      onComplete();
    }
  }

  const ex = exercises[current];
  const progress = (WARMUP_DURATION - timeLeft) / WARMUP_DURATION;
  const circumference = 2 * Math.PI * 54;

  return (
    <div className="sc" style={{ padding:"56px 20px 40px", display:"flex", flexDirection:"column", minHeight:"100vh" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
        <button className="bk" onClick={onSkip}>SKIP WARMUP</button>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#333", letterSpacing:3, fontWeight:700 }}>{current + 1} / {exercises.length}</div>
      </div>

      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color, fontWeight:700, marginBottom:8 }}>WARMUP</div>
      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:48, fontWeight:900, lineHeight:0.9, letterSpacing:1, marginBottom:32 }}>{ex.name.toUpperCase()}</div>
      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:14, color:"#444", letterSpacing:1, fontWeight:600, marginBottom:48, fontStyle:"italic" }}>{ex.cue}</div>

      {/* Circular timer */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1, justifyContent:"center" }}>
        <div style={{ position:"relative", width:128, height:128, marginBottom:40 }}>
          <svg width="128" height="128" viewBox="0 0 128 128" style={{ transform:"rotate(-90deg)" }}>
            <circle cx="64" cy="64" r="54" fill="none" stroke="#1a1a1a" strokeWidth="8"/>
            <circle cx="64" cy="64" r="54" fill="none" stroke={color} strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              strokeLinecap="round"
              style={{ transition:"stroke-dashoffset 1s linear" }}/>
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:48, fontWeight:900, color: timeLeft <= 10 ? color : "#fff", lineHeight:1 }}>{timeLeft}</div>
          </div>
        </div>

        {!running
          ? <button className="mbtn" style={{ background:color, color:"#000", width:200 }} onClick={startTimer}>START</button>
          : <button className="mbtn" style={{ background:"#111", color:"#444", border:"1px solid #1a1a1a", width:200 }} onClick={skipExercise}>SKIP</button>
        }
      </div>

      {/* Exercise queue */}
      {exercises.length > 1 && (
        <div style={{ marginTop:40 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:3, color:"#222", fontWeight:700, marginBottom:10 }}>UP NEXT</div>
          {exercises.slice(current + 1, current + 3).map((e, i) => (
            <div key={i} style={{ fontFamily:"'Barlow Condensed'", fontSize:14, color:"#2a2a2a", fontWeight:700, letterSpacing:0.5, padding:"6px 0", borderTop:"1px solid #111" }}>
              {e.name.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
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
  .sov { position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:99; display:flex; align-items:center; justify-content:center; padding:20px; animation:fi 0.3s ease; overflow:hidden; touch-action:none; }
  @keyframes fi { from{opacity:0;}to{opacity:1;} }
  .wkrow { border-bottom:1px solid #141414; }
  .wkrow:last-child { border-bottom:none; }
  .caopt { cursor:pointer; background:#0f0f0f; border:1px solid #1a1a1a; border-radius:4px; padding:14px 18px; display:flex; align-items:center; gap:14px; transition:all 0.15s; }
  .caopt.sel { border-color:#76FF03; background:#76FF0310; }
  .tabbar { position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; height:68px; background:#0d0d0d; border-top:1px solid #1a1a1a; display:flex; align-items:stretch; z-index:80; }
  .tbtab { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; cursor:pointer; position:relative; border:none; background:transparent; transition:opacity 0.15s; -webkit-tap-highlight-color:transparent; }
  .tbtab::before { content:''; position:absolute; top:0; left:25%; right:25%; height:2px; border-radius:0 0 2px 2px; background:transparent; transition:background 0.2s; }
  .tbtab.active::before { background:var(--tab-color); }
  .tbtab-label { font-family:'Barlow Condensed',sans-serif; font-size:9px; letter-spacing:2px; font-weight:700; color:#2a2a2a; transition:color 0.2s; }
  .tbtab.active .tbtab-label { color:var(--tab-color); }
`;

function Wrap({ children, extraCss }) {
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#080808", minHeight:"100vh", minWidth:"100vw", maxWidth:430, margin:"0 auto", color:"#fff", position:"relative", overflowX:"hidden" }}>
      <style>{BASE_STYLES}{extraCss || ""}</style>
      {children}
    </div>
  );
}
// ── TAB BAR ───────────────────────────────────────────────────────────────
function TabBar({ active, onTab, color }) {
  const tabs = [
    { id:"train", label:"TRAIN", icon:(c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4v16M18 4v16M6 12h12M3 8h3M18 8h3M3 16h3M18 16h3"/>
      </svg>
    )},
    { id:"log", label:"LOG", icon:(c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    )},
    { id:"history", label:"HISTORY", icon:(c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )},
    { id:"stats", label:"STATS", icon:(c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="20" x2="3" y2="14"/><line x1="9" y1="20" x2="9" y2="4"/><line x1="15" y1="20" x2="15" y2="10"/><line x1="21" y1="20" x2="21" y2="7"/>
      </svg>
    )},
  ];
  return (
    <div className="tabbar" style={{ "--tab-color": color }}>
      {tabs.map(t => (
        <button key={t.id} className={`tbtab${active===t.id?" active":""}`} onClick={() => onTab(t.id)}>
          {t.icon(active===t.id ? color : "#2a2a2a")}
          <span className="tbtab-label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
// ── END TAB BAR ────────────────────────────────────────────────────────────



// ── WORKOUT SCREEN ────────────────────────────────────────────────────────
function WorkoutScreen({ workout, setWorkout, splitLabel, color, bank, onBack, onRegenerate, prs, onSavePr, onComplete, onSaveWorkout, restDuration: restDurationProp, initialChecked, initialSetsDone, onProgressSave }) {
  const REST_DUR = restDurationProp || REST_DURATION;
  const [checked, setChecked] = useState(initialChecked || {});
  const [setsDone, setSetsDone] = useState(initialSetsDone || {});
  const [expanded, setExpanded] = useState({});
  const [justChecked, setJustChecked] = useState(null);
  const [confirmSwap, setConfirmSwap] = useState(null);
  const [confirmRegen, setConfirmRegen] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerLeft, setTimerLeft] = useState(REST_DUR);
  const timerEndRef = useRef(null);
  const [prModal, setPrModal] = useState(null);
  const [prWeight, setPrWeight] = useState("");
  const [prReps, setPrReps] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [newPrNames, setNewPrNames] = useState(new Set());
  const [isSaved, setIsSaved] = useState(false);
  const timerRef = useRef(null);
  const completedRef = useRef(false);
  const summaryRef = useRef(null);

  const { sections } = workout;
  const allKeys = sections.flatMap((s, si) => s.exercises.map((_, ei) => `${si}-${ei}`));
  const completedCount = allKeys.filter(k => checked[k]).length;
  const totalCount = allKeys.length;
  const allDone = totalCount > 0 && completedCount === totalCount;
  const timerPct = (timerLeft / REST_DUR) * 100;
  const timerColor = timerLeft > 30 ? "#76FF03" : timerLeft > 10 ? "#FFB300" : "#FF3D00";

  const prevWorkoutRef = useRef(null);

  async function handleScreenshot() {
    if (!summaryRef.current) return;
    try {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      document.head.appendChild(script);
      await new Promise(res => { script.onload = res; });
      const canvas = await window.html2canvas(summaryRef.current, {
        backgroundColor: "#0e0e0e",
        scale: 3,
        useCORS: true,
        logging: false,
      });
      canvas.toBlob(async blob => {
        if (navigator.share && navigator.canShare({ files: [new File([blob], "daily-grind.png", { type: "image/png" })] })) {
          await navigator.share({ files: [new File([blob], "daily-grind.png", { type: "image/png" })] });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = "daily-grind-workout.png"; a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (e) { console.error("Screenshot failed", e); }
  }
  useEffect(() => {
    if (onProgressSave) onProgressSave(checked, setsDone);
  }, [checked, setsDone]);

  useEffect(() => {
    // Only reset if it's a genuinely new workout (startTime changed), not a swap or a restore
    const hasRestoredProgress = Object.keys(initialChecked || {}).length > 0 || Object.keys(initialSetsDone || {}).length > 0;
    if (prevWorkoutRef.current?.startTime !== workout.startTime && !hasRestoredProgress) {
      completedRef.current = false;
      setChecked({}); setSetsDone({}); setExpanded({}); setShowSummary(false); setSummaryData(null);
    }
    prevWorkoutRef.current = workout;
  }, [workout]);

  useEffect(() => {
    if (timerActive) {
      timerEndRef.current = Date.now() + timerLeft * 1000;
      timerRef.current = setInterval(() => {
        const left = Math.round((timerEndRef.current - Date.now()) / 1000);
        if (left <= 0) {
          clearInterval(timerRef.current);
          setTimerActive(false);
          setTimerLeft(REST_DUR);
        } else {
          setTimerLeft(left);
        }
      }, 500);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "visible" && timerActive && timerEndRef.current) {
        const left = Math.round((timerEndRef.current - Date.now()) / 1000);
        if (left <= 0) {
          setTimerActive(false);
          setTimerLeft(REST_DUR);
        } else {
          setTimerLeft(left);
        }
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [timerActive]);

  useEffect(() => {
    if (allDone && !completedRef.current) {
      completedRef.current = true;
      const duration = workout.startTime ? Date.now() - workout.startTime : 0;
      const finishMsg = FINISH_MESSAGES[Math.floor(Math.random() * FINISH_MESSAGES.length)];
      const liveSections = workout.sections;
      const data = { split: splitLabel, color, date: Date.now(), duration, exercises: liveSections.flatMap(s => s.exercises.map(e => e.name)), exerciseDetails: liveSections.flatMap(s => s.exercises.map(e => ({ name: e.name, sets: e.sets, reps: e.reps }))), total: liveSections.flatMap(s => s.exercises).length, finishMsg, type: "workout", newPrs: [...newPrNames] };
      setSummaryData(data);
      onComplete(data);
      setTimeout(() => setShowSummary(true), 700);
    }
  }, [allDone]);

  function handleCheck(key, totalSets) {
    const current = setsDone[key] || 0;
    const maxSets = parseInt(totalSets) || 1;
    if (current >= maxSets) return;
    const next = current + 1;
    const nowDone = next >= maxSets;
    setSetsDone(s => ({ ...s, [key]: next }));
    if (nowDone) {
      setChecked(c => ({ ...c, [key]: true }));
      setTimerActive(false);
      setTimerLeft(REST_DUR);
    } else {
      setJustChecked(key); setTimeout(() => setJustChecked(null), 600);
      setTimerActive(false);
      setTimerLeft(REST_DUR);
      setTimeout(() => setTimerActive(true), 0);
    }
  }

  function swapExercise(si, ei) {
    const section = workout.sections[si];
    const current = section.exercises[ei];
    const usedNames = new Set(section.exercises.filter((_, i) => i !== ei).map(e => e.name));
    const groupBank = Array.isArray(bank) ? bank : (bank[section.group] || []);
    const candidates = groupBank.filter(e => e.name !== current.name && !usedNames.has(e.name) && !e.supersetOnly);
    if (!candidates.length) return;
    const preferred = candidates.filter(e => Math.abs(e.intensity - current.intensity) <= 2);
    const pool = preferred.length ? preferred : candidates;
    const replacement = pool[Math.floor(Math.random() * pool.length)];
    setWorkout(w => ({ ...w, sections: w.sections.map((s, sI) => sI !== si ? s : { ...s, exercises: s.exercises.map((ex, eI) => eI !== ei ? ex : replacement) }) }));
    setChecked(c => { const n = { ...c }; delete n[`${si}-${ei}`]; return n; });
    setSetsDone(c => { const n = { ...c }; delete n[`${si}-${ei}`]; return n; });
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
    setNewPrNames(prev => new Set([...prev, prModal]));
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
          <div ref={summaryRef} style={{ background:"#0e0e0e", borderTop:`4px solid ${summaryData.color}`, borderLeft:`4px solid ${summaryData.color}`, borderRight:"1px solid #1a1a1a", borderBottom:"1px solid #1a1a1a", borderRadius:4, padding:28, width:"100%", maxWidth:390, maxHeight:"90vh", overflowY:"auto", WebkitOverflowScrolling:"touch", touchAction:"pan-y" }}>
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:64, fontWeight:900, color:summaryData.color, lineHeight:1, letterSpacing:2 }}>{summaryData.finishMsg}</div>
              <div style={{ color:"#333", fontSize:12, fontFamily:"'Barlow Condensed'", letterSpacing:2, marginTop:4 }}>{formatDate(summaryData.date)}</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
              {[{label:"SPLIT",value:summaryData.split},{label:"TIME",value:summaryData.duration < 5*60*1000 ? "—" : formatDuration(summaryData.duration)},{label:"EXERCISES",value:summaryData.total},{label:"SETS",value:(summaryData.exerciseDetails||[]).reduce((acc,ex)=>acc+(parseInt(ex.sets)||0),0)}].map(({label,value}) => (
                <div key={label} style={{ background:"#141414", borderLeft:`3px solid ${summaryData.color}`, padding:"12px 14px" }}>
                  <div style={{ color:"#444", fontSize:10, letterSpacing:2, fontFamily:"'Barlow Condensed'", fontWeight:700, marginBottom:3 }}>{label}</div>
                  <div style={{ fontFamily:"'Barlow Condensed'", fontSize:24, fontWeight:900, color:"#fff", lineHeight:1 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"#141414", padding:14, marginBottom:18 }}>
              <div style={{ color:"#333", fontSize:10, letterSpacing:2, fontFamily:"'Barlow Condensed'", fontWeight:700, marginBottom:10 }}>EXERCISES</div>
              {summaryData.exercises.map((name, i) => (
                <div key={i} style={{ paddingBottom:7, marginBottom:7, borderBottom: i < summaryData.exercises.length-1?"1px solid #1a1a1a":"none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontFamily:"'Barlow Condensed'", fontWeight:900, fontSize:15, color:summaryData.color, minWidth:20 }}>{i+1}</span>
                    <span style={{ color:"#888", fontSize:13, fontFamily:"'Barlow Condensed'", fontWeight:600 }}>{name}</span>
                  </div>
                  {(summaryData.newPrs||[]).includes(name) && (
                    <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3, marginLeft:30 }}><Trophy size={11} color="#FFD700" fill="#FFD700" /><span style={{ fontFamily:"'Barlow Condensed'", fontSize:11, fontWeight:800, letterSpacing:1.5, color:"#FFD700" }}>NEW PR</span></div>
                  )}
                </div>
              ))}
            </div>
            <button className="mbtn" style={{ background:summaryData.color, color:"#000", marginBottom:10 }} onClick={() => { setShowSummary(false); onBack(); }}>BACK TO HOME</button>
            <button className="mbtn" style={{ background:"transparent", color:"#333", border:"1px solid #1e1e1e" }} onClick={() => setShowSummary(false)}>KEEP VIEWING</button>
            <button className="mbtn" onClick={handleScreenshot} style={{ background:"transparent", color:"#888", border:"1px solid #252525", marginTop:8, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}><Share2 size={14} color="#888" />SHARE WORKOUT</button>
            <button className="mbtn" onClick={() => { onSaveWorkout(summaryData); setIsSaved(true); }} style={{ background:"transparent", color: isSaved ? "#FFB300" : "#2a2a2a", border: isSaved ? "1px solid #FFB30040" : "1px solid #1e1e1e", marginTop:8 }}>{isSaved ? "SAVED" : "SAVE WORKOUT"}</button>
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
          <button onClick={() => { setTimerActive(false); setTimerLeft(REST_DUR); }} style={{ background:"none", border:"none", color:"#2a2a2a", cursor:"pointer", fontSize:16, padding:0 }}>x</button>
        </div>
      )}

      <div className="sc" style={{ padding:`${timerActive?78:56}px 20px ${timerActive?180:140}px` }}>
        <button className="bk" onClick={() => { if (confirmExit) { onBack(); } else { setConfirmExit(true); setTimeout(() => setConfirmExit(false), 3000); } }} style={{ color: confirmExit ? color : undefined }}>{confirmExit ? "EXIT WORKOUT?" : "BACK"}</button>
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
                  const setsCompleted = setsDone[key] || 0;
                  const totalSets = parseInt(ex.sets) || 1;
                  const inProgress = setsCompleted > 0 && !done;
                  const isSSA = ex.supersetId && ex.supersetRole === "A";
                  const isSSB = ex.supersetId && ex.supersetRole === "B";
                  return (
                    <div key={key}>
                      <div className={`exc${isPop?" pop":""}`} style={{ background:done?"#090909":"#0f0f0f", border:`1px solid ${ex.supersetId ? color+"33" : "#161616"}`, borderLeft:`3px solid ${done?"#1e1e1e":color}`, opacity:done?0.4:1 }}>
                      <div style={{ padding:"14px 14px", display:"flex", alignItems:"center", gap:12 }}>
                        <div className="chk" onClick={() => handleCheck(key, ex.sets)} style={{ background:done?color:inProgress?color+"22":"transparent", borderColor:done?color:inProgress?color:"#252525", position:"relative" }}>
                          {done
                            ? <span style={{ fontSize:18, color:"#000", fontWeight:900, lineHeight:1, fontFamily:"'Barlow Condensed'" }}>X</span>
                            : inProgress
                              ? <span style={{ fontSize:11, color:color, fontWeight:900, lineHeight:1, textAlign:"center" }}>{setsCompleted}<span style={{ color:color+"66" }}>/{totalSets}</span></span>
                              : <span style={{ fontSize:13, color:"#2e2e2e", fontWeight:900 }}>{n}</span>
                          }
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontFamily:"'Barlow Condensed'", fontWeight:800, fontSize:18, letterSpacing:0.5, textDecoration:done?"line-through":"none", color:done?"#2a2a2a":"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{ex.name.toUpperCase()}</div>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:3, flexWrap:"wrap" }}>
                            {(ex.sets||ex.reps) && <span style={{ fontFamily:"'Barlow Condensed'", color:"#3a3a3a", fontSize:13, fontWeight:700, letterSpacing:1 }}>{ex.sets&&`${ex.sets} SETS`}{ex.sets&&ex.reps&&" . "}{ex.reps&&`${ex.reps} REPS`}</span>}
                            {hasPr && <span style={{ fontFamily:"'Barlow Condensed'", fontSize:11, fontWeight:700, letterSpacing:1, color:"#FFB300", background:"#FFB30012", padding:"2px 7px", borderRadius:2 }}>PR {prs[ex.name].weight}x{prs[ex.name].reps}</span>}
                          </div>
                          {ex.supersetId && ex.supersetPartner && (
                            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:2, color:color, fontWeight:800, marginTop:4, opacity:0.8 }}>SUPERSET · W/ {ex.supersetPartner.toUpperCase()}</div>
                          )}
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
                          {!done && <button className="swpbtn" onClick={() => { if (confirmSwap === key) { swapExercise(si, ei); setConfirmSwap(null); } else { setConfirmSwap(key); setTimeout(() => setConfirmSwap(null), 3000); } }} style={{ borderColor: confirmSwap === key ? color : undefined, color: confirmSwap === key ? color : undefined }}>{confirmSwap === key ? "sure?" : "swap"}</button>}
                          <button className={`prbtn${hasPr?" got":""}`} onClick={() => openPr(ex.name)}>PR</button>
                        </div>
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
          <div style={{ display:"flex", gap:8 }}>
            <button className="mbtn" style={{ background: confirmRegen ? color : "#111", color: confirmRegen ? "#000" : "#333", border: confirmRegen ? `1px solid ${color}` : "1px solid #1a1a1a", flex:3 }} onClick={() => { if (confirmRegen) { onRegenerate(); setConfirmRegen(false); } else { setConfirmRegen(true); setTimeout(() => setConfirmRegen(false), 3000); } }}>{confirmRegen ? "ARE YOU SURE?" : "REGENERATE"}</button>
            <button className="mbtn" onClick={() => { const d = { split:splitLabel, color, date:Date.now(), exercises:workout.sections.flatMap(s=>s.exercises.map(e=>e.name)), exerciseDetails:workout.sections.flatMap(s=>s.exercises.map(e=>({name:e.name,sets:e.sets,reps:e.reps}))), total:workout.sections.flatMap(s=>s.exercises).length, type:"saved" }; onSaveWorkout(d); setIsSaved(true); }} style={{ background:isSaved ? "#FFB30015" : "#111", border:isSaved ? "1px solid #FFB30040" : "1px solid #1a1a1a", flex:1, padding:0, display:"flex", alignItems:"center", justifyContent:"center" }}><Star size={18} color={isSaved ? "#FFB300" : "#444"} fill={isSaved ? "#FFB300" : "none"} /></button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── HISTORY SCREEN ────────────────────────────────────────────────────────
function HistoryScreen({ history, savedWorkouts, profileColor, onBack, onClear, onDeleteSaved, onDeleteEntry, onStartSaved, onSaveWorkout, tabBar }) {
  const [showSaved, setShowSaved] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmClear, setConfirmClear] = useState(0); // 0=idle, 1=confirming
  const [confirmStart, setConfirmStart] = useState(null);
  const [isSavedFromHistory, setIsSavedFromHistory] = useState(false);
  const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
  const weeks = {};
  history.forEach(h => { const wk = getWeekKey(h.date); if (!weeks[wk]) weeks[wk] = []; weeks[wk].push(h); });
  const weekKeys = Object.keys(weeks).sort((a, b) => b.localeCompare(a));

  if (selectedHistory) {
    const h = selectedHistory;
    return (
      <div className="sc" style={{ padding:"56px 20px 40px" }}>
        <button className="bk" onClick={() => setSelectedHistory(null)}>BACK</button>
        <div style={{ marginTop:28, marginBottom:24 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:64, fontWeight:900, color:h.color, lineHeight:1, letterSpacing:2 }}>{h.finishMsg || "DONE."}</div>
          <div style={{ color:"#333", fontSize:12, fontFamily:"'Barlow Condensed'", letterSpacing:2, marginTop:4 }}>{formatDate(h.date)}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
          {[{label:"SPLIT",value:h.split},{label:"TIME",value:h.duration && h.duration >= 5*60*1000 ? formatDuration(h.duration) : "—"},{label:"EXERCISES",value:h.total},{label:"SETS",value:(h.exerciseDetails||[]).reduce((a,e)=>a+(parseInt(e.sets)||0),0)}].map(({label,value}) => (
            <div key={label} style={{ background:"#141414", borderLeft:`3px solid ${h.color}`, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700 }}>{label}</div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:20, fontWeight:900, color:"#fff" }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:10 }}>EXERCISES</div>
        <div style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderRadius:4, padding:"8px 14px" }}>
          {(h.exerciseDetails || (h.exercises||[]).map(name => ({name, sets:"", reps:""}))).map((ex, i) => (
            <div key={i} style={{ padding:"9px 0", borderBottom: i < (h.exerciseDetails||h.exercises||[]).length-1 ? "1px solid #1a1a1a" : "none" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:15, fontWeight:700, color:"#888" }}>{(typeof ex==="string"?ex:ex.name).toUpperCase()}</div>
                {typeof ex !== "string" && ex.sets && <div style={{ fontFamily:"'Barlow Condensed'", fontSize:12, color:"#333", letterSpacing:1 }}>{ex.sets} x {ex.reps}{ex.weight ? ` · ${ex.weight} LBS` : ""}</div>}
              </div>
              {(h.newPrs||[]).includes(typeof ex==="string"?ex:ex.name) && (
                <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3 }}><Trophy size={11} color="#FFD700" fill="#FFD700" /><span style={{ fontFamily:"'Barlow Condensed'", fontSize:11, fontWeight:800, letterSpacing:1.5, color:"#FFD700" }}>NEW PR</span></div>
              )}
            </div>
          ))}
        </div>
        {onSaveWorkout && (
          <button className="mbtn" onClick={() => { if (!isSavedFromHistory) { onSaveWorkout(h); setIsSavedFromHistory(true); } }}
            style={{ background:"transparent", color: isSavedFromHistory ? "#FFB300" : "#2a2a2a", border: isSavedFromHistory ? "1px solid #FFB30040" : "1px solid #1e1e1e", marginTop:16 }}>
            {isSavedFromHistory ? "SAVED ★" : "SAVE WORKOUT"}
          </button>
        )}
      </div>
    );
  }
  return (
    <>
    <div className="sc" style={{ padding:"56px 20px 88px" }}>
      <button className="bk" onClick={onBack}>BACK</button>
      <div style={{ marginTop:28, marginBottom:32 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, lineHeight:0.9, letterSpacing:1 }}>
            {showSaved ? <>SAVED<br/><span style={{ color:profileColor }}>WORKOUTS</span></> : <>WORKOUT<br/><span style={{ color:profileColor }}>HISTORY</span></>}
          </div>
          <button onClick={() => setShowSaved(s => !s)} style={{ background:showSaved ? profileColor+"20" : "#111", border:"1px solid "+(showSaved ? profileColor+"60" : "#1e1e1e"), borderRadius:4, padding:"8px 12px", color:showSaved ? profileColor : "#444", fontSize:13, fontFamily:"'Barlow Condensed'", fontWeight:700, letterSpacing:2, cursor:"pointer", marginBottom:8 }}>
            {showSaved ? "SAVED" : "SAVED"}
          </button>
        </div>
      </div>
      {showSaved ? (
        savedWorkouts && savedWorkouts.length > 0 ? savedWorkouts.map((w, idx) => (
          <div key={idx} style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:"3px solid "+w.color, borderRadius:4, marginBottom:10, padding:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:20, fontWeight:900, letterSpacing:1 }}>{w.split?.toUpperCase()}</div>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#444", letterSpacing:1, fontWeight:600, marginTop:2 }}>{formatDate(w.date).toUpperCase()} . {w.total} EXERCISES</div>
              </div>
              <div style={{ color:"#FFB300", fontSize:16, fontFamily:"'Barlow Condensed'", fontWeight:800, letterSpacing:1, display:"flex", alignItems:"center", gap:8 }}>
                <span>SAVED</span>
                <button onClick={() => onDeleteSaved(idx)} style={{ background:"transparent", border:"1px solid #2a2a2a", borderRadius:3, color:"#444", fontFamily:"'Barlow Condensed'", fontSize:11, fontWeight:700, letterSpacing:1, padding:"3px 8px", cursor:"pointer" }}>✕</button>
              </div>
            </div>
            {(w.exerciseDetails || (w.exercises||[]).map(name => ({name, sets:"", reps:""}))).map((ex, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom: i<(w.exerciseDetails||w.exercises||[]).length-1 ? "1px solid #1a1a1a" : "none" }}>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:15, fontWeight:700, color:"#888" }}>{(typeof ex==="string" ? ex : ex.name).toUpperCase()}</div>
                {typeof ex !== "string" && ex.sets && <div style={{ fontFamily:"'Barlow Condensed'", fontSize:12, color:"#333", letterSpacing:1 }}>{ex.sets} x {ex.reps}{ex.weight ? ` · ${ex.weight} LBS` : ""}</div>}
              </div>
            ))}
            {onStartSaved && (
              <button onClick={() => {
                if (confirmStart === idx) { onStartSaved(w); setConfirmStart(null); }
                else { setConfirmStart(idx); setTimeout(() => setConfirmStart(c => c === idx ? null : c), 3000); }
              }} style={{ marginTop:12, width:"100%", background: confirmStart === idx ? profileColor : "transparent", color: confirmStart === idx ? "#000" : profileColor, border:`1px solid ${confirmStart === idx ? profileColor : profileColor+"40"}`, borderRadius:4, fontFamily:"'Barlow Condensed'", fontSize:14, fontWeight:800, letterSpacing:2, padding:"10px 0", cursor:"pointer" }}>
                {confirmStart === idx ? "CONFIRM START" : "START WORKOUT"}
              </button>
            )}
          </div>
        )) : <div style={{ textAlign:"center", color:"#222", padding:"60px 0", fontFamily:"'Barlow Condensed'", fontSize:14, letterSpacing:2, fontWeight:700 }}>NO SAVED WORKOUTS YET</div>
      ) : (
        weekKeys.length === 0
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
                      {workouts.length > 0 && workouts.length+" WORKOUT"+(workouts.length>1?"S":"")}
                      {workouts.length > 0 && cardios.length > 0 && "  /  "}
                      {cardios.length > 0 && cardios.length+" CARDIO"}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap", justifyContent:"flex-end", maxWidth:120 }}>
                    {entries.map((e, i) => <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:e.type==="cardio"?"#555":e.color }} />)}
                  </div>
                </div>
                <div style={{ borderTop:"1px solid #1a1a1a" }}>
                  {entries.map((h, i) => {
                    const viewable = h.type !== "cardio" && h.exerciseDetails && (Date.now() - h.date) < ONE_MONTH;
                    return (
                      <div key={i} className="wkrow" onClick={() => { if (viewable) { setSelectedHistory(h); setIsSavedFromHistory(false); } }} style={{ padding:"11px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor: viewable ? "pointer" : "default" }}>
                        <div>
                          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:16, fontWeight:800, letterSpacing:0.5 }}>{h.type==="cardio" ? h.cardioType?.toUpperCase() : h.split?.toUpperCase()}</div>
                          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#444", letterSpacing:1, marginTop:2, fontWeight:600 }}>
                            {formatDate(h.date).toUpperCase()}
                            {h.duration ? ` . ${formatDuration(h.duration)}` : ""}
                            {h.durationMins ? ` . ${h.durationMins} MIN` : ""}
                            {h.distanceMiles ? ` . ${h.distanceMiles} MI` : ""}
                            {h.caloriesBurned ? ` . ${h.caloriesBurned} CAL` : ""}
                          </div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                          {viewable && <span style={{ fontFamily:"'Barlow Condensed'", fontSize:18, color:"#2a2a2a", fontWeight:900 }}>›</span>}
                          <button
                            onClick={e => { e.stopPropagation(); const key = `${wk}-${i}`; if (confirmDelete === key) { onDeleteEntry(h); setConfirmDelete(null); } else { setConfirmDelete(key); setTimeout(() => setConfirmDelete(null), 3000); } }}
                            style={{ background:"transparent", border:`1px solid ${confirmDelete===`${wk}-${i}`?profileColor:"#1e1e1e"}`, borderRadius:3, color:confirmDelete===`${wk}-${i}`?profileColor:"#2a2a2a", fontFamily:"'Barlow Condensed'", fontSize:11, fontWeight:700, letterSpacing:1, padding:"3px 8px", cursor:"pointer", flexShrink:0 }}>
                            {confirmDelete===`${wk}-${i}` ? "sure?" : "✕"}
                          </button>
                          <div style={{ width:3, height:30, background:h.type==="cardio"?"#444":h.color, borderRadius:2 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
      )}
      {!showSaved && history.length > 0 && (
        confirmClear === 0 ? (
          <button onClick={() => setConfirmClear(1)} style={{ marginTop:16, background:"none", border:"1px solid #1e1e1e", borderRadius:4, color:"#2a2a2a", fontSize:12, fontFamily:"'Barlow Condensed'", fontWeight:700, letterSpacing:2, padding:"12px 20px", cursor:"pointer", width:"100%" }}>
            CLEAR HISTORY
          </button>
        ) : (
          <div style={{ marginTop:16, background:"#1a0000", border:`1px solid ${profileColor}`, borderRadius:4, padding:"16px 20px" }}>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, letterSpacing:2, color:profileColor, fontWeight:700, marginBottom:12, textAlign:"center" }}>THIS WILL DELETE ALL YOUR HISTORY. ARE YOU SURE?</div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => setConfirmClear(0)} style={{ flex:1, background:"none", border:"1px solid #2a2a2a", borderRadius:4, color:"#666", fontSize:12, fontFamily:"'Barlow Condensed'", fontWeight:700, letterSpacing:2, padding:"12px 0", cursor:"pointer" }}>CANCEL</button>
              <button onClick={() => { onClear(); setConfirmClear(0); }} style={{ flex:1, background:profileColor, border:"none", borderRadius:4, color:"#000", fontSize:12, fontFamily:"'Barlow Condensed'", fontWeight:700, letterSpacing:2, padding:"12px 0", cursor:"pointer" }}>DELETE ALL</button>
            </div>
          </div>
        )
      )}
    </div>
    {tabBar}
    </>
  );
}

// ── STATS SCREEN ─────────────────────────────────────────────────────────────
function timeAgo(ts) {
  const days = Math.floor((Date.now() - ts) / 86400000);
  if (days === 0) return "TODAY";
  if (days === 1) return "YESTERDAY";
  if (days < 7) return days + "D AGO";
  if (days < 30) return Math.floor(days/7) + "W AGO";
  return Math.floor(days/30) + "MO AGO";
}

function StatsScreen({ history, weightLog, onSaveWeight, profileColor, profileName, onBack, goalWeight, onSaveGoalWeight, tabBar, prs, onDeletePr }) {
  const [weightInput, setWeightInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [goalInput, setGoalInput] = useState("");
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [confirmDeletePr, setConfirmDeletePr] = useState(null);

  // ── Streak calculation ────────────────────────────────────────────────────
  function calcStreak(hist) {
    if (!hist.length) return { current: 0, best: 0 };
    // Count sessions per week
    const weekSessions = {};
    hist.forEach(h => {
      const k = getWeekKey(h.date);
      weekSessions[k] = (weekSessions[k] || 0) + 1;
    });
    // Weeks with 4+ sessions qualify
    const activeWeeks = new Set(Object.entries(weekSessions).filter(([,v]) => v >= 4).map(([k]) => k));
    const sortedWeeks = Array.from(activeWeeks).sort();

    const currentWeekKey = getWeekKey(Date.now());
    const prevWeekDate = new Date(); prevWeekDate.setDate(prevWeekDate.getDate() - 7);
    const prevWeekKey = getWeekKey(prevWeekDate.getTime());

    // Current streak: walk backwards week by week
    let current = 0;
    const startKey = activeWeeks.has(currentWeekKey) ? currentWeekKey : activeWeeks.has(prevWeekKey) ? prevWeekKey : null;
    if (startKey) {
      let checkDate = new Date();
      if (startKey === prevWeekKey) checkDate.setDate(checkDate.getDate() - 7);
      checkDate.setHours(0,0,0,0);
      while (true) {
        const k = getWeekKey(checkDate.getTime());
        if (activeWeeks.has(k)) { current++; checkDate.setDate(checkDate.getDate() - 7); }
        else break;
      }
    }

    // Best streak: longest consecutive run of qualifying weeks
    let best = 0; let run = 0;
    for (let i = 0; i < sortedWeeks.length; i++) {
      if (i === 0) { run = 1; }
      else {
        const [py, pw] = sortedWeeks[i-1].split('-').map(Number);
        const [cy, cw] = sortedWeeks[i].split('-').map(Number);
        const consecutive = (cy === py && cw === pw + 1) || (cy === py + 1 && pw >= 52 && cw === 1);
        run = consecutive ? run + 1 : 1;
      }
      if (run > best) best = run;
    }
    if (current > best) best = current;
    return { current, best };
  }

  function calcWeeklyCount(hist) {
    const currentWeekKey = getWeekKey(Date.now());
    return hist.filter(h => getWeekKey(h.date) === currentWeekKey).length;
  }

  function saveWeight() {
    if (!weightInput) return;
    const entry = { weight: parseFloat(weightInput), date: Date.now() };
    const updated = [entry, ...(weightLog || [])].slice(0, 60);
    onSaveWeight(updated);
    setWeightInput("");
    setShowInput(false);
  }

  const { current: streak, best: bestStreak } = calcStreak(history);
  const thisWeek = calcWeeklyCount(history);
  const latestWeight = weightLog && weightLog.length ? weightLog[0] : null;
  const oldestWeight = weightLog && weightLog.length > 1 ? weightLog[weightLog.length-1] : null;
  const weightChange = latestWeight && oldestWeight ? (latestWeight.weight - oldestWeight.weight).toFixed(1) : null;

  // Chart: last 10 weight entries reversed so oldest left
  const chartData = weightLog ? [...weightLog].reverse().slice(-10) : [];
  const chartMin = chartData.length ? Math.min(...chartData.map(e => e.weight)) - 3 : 0;
  const chartMax = chartData.length ? Math.max(...chartData.map(e => e.weight)) + 3 : 100;
  const chartH = 120; const chartW = 280;

  function toX(i) { return chartData.length < 2 ? chartW/2 : (i / (chartData.length-1)) * chartW; }
  function toY(w) { return chartH - ((w - chartMin) / (chartMax - chartMin)) * chartH; }

  const polyline = chartData.map((e,i) => `${toX(i)},${toY(e.weight)}`).join(" ");

  return (
    <>
    <div className="sc" style={{ padding:"56px 20px 88px" }}>
      <button className="bk" onClick={onBack}>BACK</button>
      <div style={{ marginTop:28, marginBottom:32 }}>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, lineHeight:0.9, letterSpacing:1 }}>
          STATS<br/><span style={{ color:profileColor }}>{profileName.toUpperCase()}</span>
        </div>
      </div>

      {/* Streak block */}
      <div style={{ marginBottom:12 }}>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:10 }}>TRAINING STREAK</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
          {[
            { label:"CURRENT", value: streak, unit: streak === 1 ? "WEEK" : "WEEKS", highlight: true },
            { label:"BEST",    value: bestStreak, unit: bestStreak === 1 ? "WEEK" : "WEEKS", highlight: false },
            { label:"THIS WEEK", value: thisWeek, unit: thisWeek === 1 ? "SESSION" : "SESSIONS", highlight: false },
          ].map(({ label, value, unit, highlight }) => (
            <div key={label} style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:`3px solid ${highlight && streak > 0 ? profileColor : "#1a1a1a"}`, padding:"16px 14px" }}>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:2, color:"#444", fontWeight:700, marginBottom:6 }}>{label}</div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:36, fontWeight:900, lineHeight:1, color: highlight && streak > 0 ? profileColor : "#fff" }}>{value}</div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:2, color:"#333", fontWeight:700, marginTop:3 }}>{unit}</div>
            </div>
          ))}
        </div>
        {streak > 0 && (
          <div style={{ marginTop:8, background: profileColor+"12", border:`1px solid ${profileColor}30`, borderRadius:4, padding:"10px 14px", fontFamily:"'Barlow Condensed'", fontSize:13, fontWeight:700, color:profileColor, letterSpacing:1 }}>
            {streak >= 7 ? "BEAST MODE. KEEP IT GOING." : streak >= 3 ? "LOCKED IN. DON'T BREAK IT." : "GOOD START. BUILD THE HABIT."}
          </div>
        )}
      </div>

      {/* Body weight block */}
      <div style={{ marginTop:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700 }}>BODY WEIGHT</div>
          <button onClick={() => setShowInput(s => !s)} style={{ background:"none", border:`1px solid ${profileColor}40`, borderRadius:4, color:profileColor, fontSize:11, fontFamily:"'Barlow Condensed'", fontWeight:700, letterSpacing:2, padding:"6px 12px", cursor:"pointer" }}>
            {showInput ? "CANCEL" : "+ LOG WEIGHT"}
          </button>
        </div>

        {showInput && (
          <div style={{ display:"flex", gap:10, marginBottom:14 }}>
            <input className="minput" type="number" placeholder="e.g. 185" value={weightInput}
              onChange={e => setWeightInput(e.target.value)}
              style={{ flex:1, borderColor: weightInput ? profileColor : "#2a2a2a" }} />
            <button className="mbtn" onClick={saveWeight}
              style={{ background: weightInput ? profileColor : "#161616", color: weightInput ? "#000" : "#333", width:"auto", padding:"0 20px", fontSize:16 }}>
              SAVE
            </button>
          </div>
        )}

        {showGoalInput && (
          <div style={{ display:"flex", gap:8, marginBottom:12 }}>
            <input className="minput" type="number" placeholder="e.g. 175" value={goalInput}
              onChange={e => setGoalInput(e.target.value)}
              style={{ flex:1, borderColor: goalInput ? profileColor : "#2a2a2a" }} />
            <button className="mbtn" onClick={() => { if (!goalInput) return; onSaveGoalWeight(parseFloat(goalInput)); setGoalInput(""); setShowGoalInput(false); }}
              style={{ background: goalInput ? profileColor : "#161616", color: goalInput ? "#000" : "#333", width:"auto", padding:"0 20px", fontSize:16 }}>
              SAVE
            </button>
          </div>
        )}

        {latestWeight ? (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
              <div style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:`3px solid ${profileColor}`, padding:"16px 14px" }}>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:2, color:"#444", fontWeight:700, marginBottom:6 }}>CURRENT</div>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:36, fontWeight:900, lineHeight:1, color:profileColor }}>{latestWeight.weight}<span style={{ fontSize:16, color:"#444", marginLeft:4 }}>LBS</span></div>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:1, color:"#333", fontWeight:700, marginTop:4 }}>{formatDate(latestWeight.date).toUpperCase()}</div>
              </div>
              <div onClick={() => setShowGoalInput(s => !s)} style={{ background:"#0f0f0f", border:`1px solid ${goalWeight ? profileColor+"33" : "#1a1a1a"}`, borderLeft:`3px solid ${goalWeight ? profileColor : "#1a1a1a"}`, padding:"16px 14px", cursor:"pointer" }}>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:2, color:"#444", fontWeight:700, marginBottom:6 }}>GOAL</div>
                {goalWeight
                  ? <>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:36, fontWeight:900, lineHeight:1, color:"#fff" }}>{goalWeight}<span style={{ fontSize:16, color:"#444", marginLeft:4 }}>LBS</span></div>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:1, color:"#333", fontWeight:700, marginTop:4 }}>
                        {latestWeight.weight > goalWeight
                          ? `${(latestWeight.weight - goalWeight).toFixed(1)} LBS TO GO`
                          : latestWeight.weight < goalWeight
                            ? `${(goalWeight - latestWeight.weight).toFixed(1)} LBS TO GAIN`
                            : "GOAL REACHED 🎯"}
                      </div>
                    </>
                  : <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, color:"#2a2a2a", fontWeight:700, letterSpacing:1, marginTop:4 }}>TAP TO SET</div>
                }
              </div>
            </div>

            {chartData.length >= 2 && (
              <div style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", padding:"18px 16px", borderRadius:4, overflowX:"auto" }}>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:2, color:"#444", fontWeight:700, marginBottom:14 }}>TREND</div>
                <svg width="100%" viewBox={`-10 -10 ${chartW+20} ${chartH+20}`} style={{ overflow:"visible" }}>
                  {/* Grid lines */}
                  {[0,0.25,0.5,0.75,1].map(t => (
                    <line key={t} x1={0} y1={chartH*t} x2={chartW} y2={chartH*t} stroke="#1a1a1a" strokeWidth="1" />
                  ))}
                  {/* Area fill */}
                  <polygon
                    points={`0,${chartH} ${polyline} ${chartW},${chartH}`}
                    fill={profileColor} fillOpacity="0.06" />
                  {/* Line */}
                  <polyline points={polyline} fill="none" stroke={profileColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Dots */}
                  {chartData.map((e,i) => (
                    <circle key={i} cx={toX(i)} cy={toY(e.weight)} r="3.5" fill={profileColor} />
                  ))}
                  {/* First and last labels */}
                  {chartData.length > 0 && (
                    <>
                      <text x={toX(0)} y={toY(chartData[0].weight)-10} textAnchor="middle" fill="#555" fontSize="9" fontFamily="Barlow Condensed">{chartData[0].weight}</text>
                      <text x={toX(chartData.length-1)} y={toY(chartData[chartData.length-1].weight)-10} textAnchor="middle" fill={profileColor} fontSize="9" fontFamily="Barlow Condensed">{chartData[chartData.length-1].weight}</text>
                    </>
                  )}
                </svg>
              </div>
            )}

            <div style={{ marginTop:10, background:"#0f0f0f", border:"1px solid #1a1a1a", borderRadius:4, maxHeight:180, overflowY:"auto" }}>
              <div style={{ padding:"12px 14px", borderBottom:"1px solid #1a1a1a" }}>
                <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:2, color:"#444", fontWeight:700 }}>LOG</div>
              </div>
              {weightLog.slice(0,10).map((e,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", borderBottom: i<Math.min(weightLog.length,10)-1?"1px solid #141414":"none" }}>
                  <div style={{ fontFamily:"'Barlow Condensed'", fontSize:16, fontWeight:800 }}>{e.weight} <span style={{ color:"#333", fontSize:12 }}>LBS</span></div>
                  <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#444", letterSpacing:1, fontWeight:600 }}>{formatDate(e.date).toUpperCase()}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign:"center", padding:"40px 0", color:"#222", fontFamily:"'Barlow Condensed'", fontSize:14, letterSpacing:2, fontWeight:700 }}>
            NO WEIGHT LOGGED YET
          </div>
        )}
      </div>

      {/* PR SECTION */}
      {prs && Object.keys(prs).length > 0 && (
        <div style={{ marginTop:28, paddingLeft:20, paddingRight:20, paddingBottom:8 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#444", fontWeight:700, marginBottom:10 }}>PERSONAL RECORDS</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {Object.entries(prs)
              .sort((a, b) => (b[1].date || 0) - (a[1].date || 0))
              .map(([name, pr]) => {
                const isPendingDelete = confirmDeletePr === name;
                return (
                  <div key={name} onClick={() => {
                    if (isPendingDelete) {
                      onDeletePr && onDeletePr(name);
                      setConfirmDeletePr(null);
                    } else {
                      setConfirmDeletePr(name);
                      setTimeout(() => setConfirmDeletePr(c => c === name ? null : c), 3000);
                    }
                  }} style={{ background: isPendingDelete ? "#1a0000" : "#0f0f0f", border:`1px solid ${isPendingDelete ? "#ff000040" : "#1a1a1a"}`, borderLeft:`3px solid ${isPendingDelete ? "#ff3333" : profileColor}`, padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", transition:"all 0.15s" }}>
                    <div>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:15, fontWeight:800, letterSpacing:0.5, color: isPendingDelete ? "#ff3333" : "#fff", marginBottom:3 }}>{isPendingDelete ? "DELETE?" : name.toUpperCase()}</div>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color: isPendingDelete ? "#ff333366" : "#333", letterSpacing:2, fontWeight:700 }}>{isPendingDelete ? "TAP AGAIN TO CONFIRM" : (pr.date ? timeAgo(pr.date) : "")}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, fontWeight:900, color: isPendingDelete ? "#ff333366" : profileColor, lineHeight:1 }}>{pr.weight}</div>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:2, color:"#444", fontWeight:700 }}>× {pr.reps} REPS</div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      )}
    </div>
    {tabBar}
    </>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [settings, setSettings] = useState({ restDuration: 90, supersets: false, defaultProfile: "none" });
  function updateSetting(key, val) {
    const next = { ...settings, [key]: val };
    setSettings(next);
    saveStorage("dg-settings", next);
  }
  const [broSplit, setBroSplit] = useState(null);
  const [broTotal, setBroTotal] = useState(DEFAULT_TOTAL);
  const [broWorkout, setBroWorkout] = useState({ sections:[], startTime:null });
  const [broWarmup, setBroWarmup] = useState(false);
  const [broPrs, setBroPrs] = useState({});
  const [broHistory, setBroHistory] = useState([]);
  const [wifeyMode, setWifeyMode] = useState(null);
  const [wifeyTotal, setWifeyTotal] = useState(6);
  const [wifeyWorkout, setWifeyWorkout] = useState({ sections:[], startTime:null });
  const [wifeyWarmup, setWifeyWarmup] = useState(false);
  const [wifeyPrs, setWifeyPrs] = useState({});
  const [wifeyHistory, setWifeyHistory] = useState([]);
  const [broWeightLog, setBroWeightLog] = useState([]);
  const [broSaved, setBroSaved] = useState([]);
  const [wifeySaved, setWifeySaved] = useState([]);
  const [wifeyWeightLog, setWifeyWeightLog] = useState([]);
  const [broGoalWeight, setBroGoalWeight] = useState(null);
  const [wifeyGoalWeight, setWifeyGoalWeight] = useState(null);
  const [broSessionChecked, setBroSessionChecked] = useState({});
  const [broSessionSetsDone, setBroSessionSetsDone] = useState({});
  const [wifeySessionChecked, setWifeySessionChecked] = useState({});
  const [wifeySessionSetsDone, setWifeySessionSetsDone] = useState({});


  useEffect(() => {
    const bp = loadStorage("dg-prs"); if (bp) setBroPrs(bp);
    const bh = loadStorage("dg-history"); if (bh) setBroHistory(bh);
    const wp = loadStorage("wy-prs"); if (wp) setWifeyPrs(wp);
    const wh = loadStorage("wy-history"); if (wh) setWifeyHistory(wh);
    const bwl = loadStorage("dg-weightlog"); if (bwl) setBroWeightLog(bwl);
    const wwl = loadStorage("wy-weightlog"); if (wwl) setWifeyWeightLog(wwl);
    const bs = loadStorage("dg-saved"); if (bs) setBroSaved(bs);
    const ws = loadStorage("wy-saved"); if (ws) setWifeySaved(ws);
    const st = loadStorage("dg-settings"); if (st) { setSettings(st); if (st.defaultProfile === "bro") setScreen("bro-home"); else if (st.defaultProfile === "wifey") setScreen("wifey-home"); }
    const bgw = loadStorage("dg-goalweight"); if (bgw) setBroGoalWeight(bgw);
    const wgw = loadStorage("wy-goalweight"); if (wgw) setWifeyGoalWeight(wgw);
    const seenVersion = loadStorage("dg-version");
    if (seenVersion !== APP_VERSION) setShowWhatsNew(true);
    // Restore active workout session if app was reloaded mid-workout
    const bSession = loadStorage("dg-session");
    if (bSession?.workout?.sections?.length && bSession?.screen) {
      setBroWorkout(bSession.workout);
      setBroSplit(bSession.split || null);
      setBroSessionChecked(bSession.checked || {});
      setBroSessionSetsDone(bSession.setsDone || {});
      setScreen(bSession.screen);
    }
    const wSession = loadStorage("wy-session");
    if (wSession?.workout?.sections?.length && wSession?.screen) {
      setWifeyWorkout(wSession.workout);
      setWifeyMode(wSession.mode || null);
      setWifeySessionChecked(wSession.checked || {});
      setWifeySessionSetsDone(wSession.setsDone || {});
      setScreen(wSession.screen);
    }
  }, []);

  const broMin = broSplit ? (broSplit.isCore ? 1 : broSplit.fullBody ? 6 : MIN_PER_GROUP * broSplit.groups.length) : MIN_PER_GROUP;
  const broMax = broSplit ? (broSplit.isCore ? CORE_BANK.length : broSplit.fullBody ? 8 : broSplit.groups.reduce((s, g) => s + BRO_EXERCISE_BANK[g].length, 0)) : 20;
  const wifeyIsLegs = wifeyMode === "legs";
  const wifeyBank = wifeyMode === "cables" ? WIFEY_CABLE_BANK : WIFEY_FULL_BODY_BANK;
  const wifeyIsCore = wifeyMode === "core";
  const wifeyMin = wifeyIsCore ? 1 : 4;
  const wifeyMax = wifeyIsCore ? CORE_BANK.length : wifeyIsLegs ? WIFEY_FULL_BODY_BANK["Legs"].length : Object.values(wifeyBank).reduce((s, arr) => s + arr.length, 0);
  const wColor = wifeyMode === "cables" ? "#00E5FF" : wifeyMode === "core" ? "#EEFF41" : wifeyMode === "legs" ? "#D500F9" : WIFEY_COLOR;

  function saveBroPr(name, data) {
    const u = { ...broPrs, [name]: data };
    setBroPrs(u); saveStorage("dg-prs", u);
  }
  function saveWifeyPr(name, data) {
    const u = { ...wifeyPrs, [name]: data };
    setWifeyPrs(u); saveStorage("wy-prs", u);
  }
  function deletePr(name) {
    const broU = { ...broPrs }; delete broU[name];
    setBroPrs(broU); saveStorage("dg-prs", broU);
    const wifeyU = { ...wifeyPrs }; delete wifeyU[name];
    setWifeyPrs(wifeyU); saveStorage("wy-prs", wifeyU);
  }
  function addBroHistory(entry) {
    const current = loadStorage("dg-history") || [];
    const n = [entry, ...current].slice(0, 60);
    setBroHistory(n); saveStorage("dg-history", n);
  }
  function addWifeyHistory(entry) {
    const current = loadStorage("wy-history") || [];
    const n = [entry, ...current].slice(0, 60);
    setWifeyHistory(n); saveStorage("wy-history", n);
  }
  function saveBroWeight(log) { setBroWeightLog(log); saveStorage("dg-weightlog", log); }
  function saveWifeyWeight(log) { setWifeyWeightLog(log); saveStorage("wy-weightlog", log); }
  function saveBroGoalWeight(w) { setBroGoalWeight(w); saveStorage("dg-goalweight", w); }
  function saveWifeyGoalWeight(w) { setWifeyGoalWeight(w); saveStorage("wy-goalweight", w); }
  function saveBroWorkout(w) { const n=[w,...broSaved].slice(0,20); setBroSaved(n); saveStorage("dg-saved",n); }
  function saveWifeyWorkout(w) { const n=[w,...wifeySaved].slice(0,20); setWifeySaved(n); saveStorage("wy-saved",n); }
  function deleteBroSaved(idx) { const n=broSaved.filter((_,i)=>i!==idx); setBroSaved(n); saveStorage("dg-saved",n); }
  function startBroSavedWorkout(w) {
    // Reconstruct workout sections from exerciseDetails
    const details = w.exerciseDetails || (w.exercises||[]).map(name => ({ name, sets:"4", reps:"8" }));
    const sections = [{ displayGroup: w.split || "Workout", exercises: details.map(e => ({ name: e.name, sets: e.sets || "4", reps: e.reps || "8" })) }];
    // Find a matching BRO_SPLIT or use a fallback stub
    const matchedSplit = BRO_SPLITS.find(s => s.label === w.split) || { id:"saved", label: w.split || "Saved Workout", color: w.color || "#FF3D00", groups:[], sub:"SAVED WORKOUT" };
    setBroSplit(matchedSplit);
    setBroWorkout({ sections, startTime: Date.now() });
    clearBroSession();
    setScreen("bro-workout");
  }
  function startWifeySavedWorkout(w) {
    const details = w.exerciseDetails || (w.exercises||[]).map(name => ({ name, sets:"3", reps:"12" }));
    const sections = [{ displayGroup: w.split || "Workout", exercises: details.map(e => ({ name: e.name, sets: e.sets || "3", reps: e.reps || "12" })) }];
    const matchedMode = w.split === "All Cables" ? "cables" : w.split === "Core / Abs" ? "core" : w.split === "Leg Day" ? "legs" : "full";
    setWifeyMode(matchedMode);
    setWifeyWorkout({ sections, startTime: Date.now() });
    clearWifeySession();
    setScreen("wifey-workout");
  }
  function deleteWifeySaved(idx) { const n=wifeySaved.filter((_,i)=>i!==idx); setWifeySaved(n); saveStorage("wy-saved",n); }
  function deleteBroHistory(entry) { const n=broHistory.filter(h=>h!==entry); setBroHistory(n); saveStorage("dg-history",n); }
  function deleteWifeyHistory(entry) { const n=wifeyHistory.filter(h=>h!==entry); setWifeyHistory(n); saveStorage("wy-history",n); }
  function saveBroSession(workout, split, checked, setsDone, screen) { saveStorage("dg-session", { workout, split, checked, setsDone, screen }); }
  function clearBroSession() { saveStorage("dg-session", null); setBroSessionChecked({}); setBroSessionSetsDone({}); }
  function saveWifeySession(workout, mode, checked, setsDone, screen) { saveStorage("wy-session", { workout, mode, checked, setsDone, screen }); }
  function clearWifeySession() { saveStorage("wy-session", null); setWifeySessionChecked({}); setWifeySessionSetsDone({}); }



  // ── LANDING ──────────────────────────────────────────────────────────────
  const WhatsNewModal = () => (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 24px" }}>
      <div style={{ background:"#111", border:"1px solid #2a2a2a", borderRadius:6, width:"100%", maxWidth:400, padding:"32px 28px" }}>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, fontWeight:800, letterSpacing:3, color:"#FF3D00", marginBottom:8 }}>WHAT'S NEW</div>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, fontWeight:900, letterSpacing:1, marginBottom:20 }}>v1.2 — MARCH 2026</div>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:14, color:"#888", lineHeight:1.6, marginBottom:24, fontWeight:600 }}>
          Thank you to everyone who has been using Daily Grind and sending feedback. It means everything and keeps us building.
        </div>
        <div style={{ marginBottom:28 }}>
          {[
            "Weight field added to logged workouts",
            "Personal Records now visible on Stats screen",
            "Save any workout from History and relaunch it",
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
              <div style={{ width:4, height:4, borderRadius:"50%", background:"#FF3D00", marginTop:6, flexShrink:0 }} />
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:15, fontWeight:700, color:"#fff", letterSpacing:0.5, lineHeight:1.4 }}>{item}</div>
            </div>
          ))}
        </div>
        <button className="mbtn" style={{ background:"#FF3D00", color:"#000" }} onClick={() => { saveStorage("dg-version", APP_VERSION); setShowWhatsNew(false); }}>GOT IT</button>
      </div>
    </div>
  );

  if (screen === "landing") return (
    <Wrap>{showWhatsNew && <WhatsNewModal />}
      <div className="sc" style={{ padding:"60px 20px 40px", display:"flex", flexDirection:"column", minHeight:"100vh" }}>
        <div style={{ marginBottom:52 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:72, fontWeight:900, lineHeight:0.88, letterSpacing:-1 }}>DAILY<br/><span style={{ color:"#FF3D00" }}>GRIND</span></div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, letterSpacing:4, color:"#333", marginTop:10, fontWeight:700 }}>CHOOSE YOUR PROGRAM</div>
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
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:12, letterSpacing:3, color:WIFEY_COLOR, marginTop:6, fontWeight:700 }}>TONE . CABLES . SCULPT</div>
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:40 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:3, color:"#fff", fontWeight:700 }}>DAILY GRIND&#8482;</div>
          <button onClick={() => setScreen("settings")} style={{ background:"transparent", border:"none", color:"#fff", fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:2, fontWeight:700, cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:6 }}><Settings size={11} color="#fff" />SETTINGS</button>
        </div>
      </div>
    </Wrap>
  );


  // ── BRO HOME ─────────────────────────────────────────────────────────────
  if (screen === "bro-home") return (
    <Wrap>{showWhatsNew && <WhatsNewModal />}
      <div className="sc" style={{ padding:"56px 20px 88px" }}>
        <div style={{ marginBottom:32 }}>
          <button className="bk" onClick={() => setScreen("landing")} style={{ marginBottom:12 }}>BACK</button>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, lineHeight:0.88, letterSpacing:-1 }}>THE BRO<br/><span style={{ color:"#FF3D00" }}>SPLIT</span></div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, letterSpacing:4, color:"#333", marginTop:10, fontWeight:700 }}>SELECT YOUR SPLIT</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {BRO_SPLITS.map((s, idx) => (
            <div key={s.id} className="tc" onClick={() => { setBroSplit(s); setBroTotal(s.isCore ? 4 : s.fullBody ? 7 : Math.max(DEFAULT_TOTAL, MIN_PER_GROUP * s.groups.length)); setScreen("bro-configure"); }}
              style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:`4px solid ${s.color}`, padding:"24px 20px", position:"relative", overflow:"hidden", animation:`scIn 0.3s cubic-bezier(0.22,1,0.36,1) ${idx*0.05}s both` }}>
              <div style={{ position:"absolute", top:0, right:0, width:80, height:"100%", background:`linear-gradient(to left, ${s.color}08, transparent)` }} />
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, fontWeight:900, letterSpacing:1 }}>{s.label.toUpperCase()}</div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:s.color, marginTop:6, fontWeight:700 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="train" color="#FF3D00" onTab={t => {
        if (t==="train") setScreen("bro-home");
        else if (t==="log") setScreen("log-bro");
        else if (t==="history") setScreen("bro-history");
        else if (t==="stats") setScreen("bro-stats");
      }} />
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
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:58, fontWeight:900, lineHeight:0.9, letterSpacing:1 }}>{broSplit.label.toUpperCase()}</div>
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
          <button className="mbtn" style={{ background:color, color:"#000" }} onClick={() => { const w = generateBroWorkout(broSplit, broTotal); if (settings.supersets && Math.random() < 0.25) { w.sections = injectSupersets(w.sections); } setBroWorkout(w); clearBroSession(); setScreen(broWarmup ? "bro-warmup" : "bro-workout"); }}>GENERATE WORKOUT</button>
          <div onClick={() => setBroWarmup(w => !w)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"#0f0f0f", border:`1px solid ${broWarmup ? color+"40" : "#1a1a1a"}`, borderLeft:`3px solid ${broWarmup ? color : "#1a1a1a"}`, borderRadius:4, padding:"14px 16px", marginTop:10, cursor:"pointer" }}>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:16, fontWeight:800, color: broWarmup ? "#fff" : "#444", letterSpacing:0.5 }}>INCLUDE WARMUP</div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, color:"#2a2a2a", letterSpacing:1, fontWeight:600, marginTop:2 }}>DYNAMIC STRETCHES . 45 SEC EACH</div>
            </div>
            <div style={{ width:40, height:24, borderRadius:12, background: broWarmup ? color : "#1a1a1a", border:`1px solid ${broWarmup ? color : "#333"}`, position:"relative", flexShrink:0, transition:"background 0.2s" }}>
              <div style={{ position:"absolute", top:3, left: broWarmup ? 18 : 3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
            </div>
          </div>
        </div>
      </Wrap>
    );
  }

  // ── BRO WARMUP ────────────────────────────────────────────────────────────
  if (screen === "bro-warmup" && broSplit) {
    const warmupKey = broSplit.fullBody ? "Full Body" : (broSplit.groups?.[0] || "Full Body");
    const exercises = WARMUP_BANK[warmupKey] || WARMUP_BANK["Full Body"];
    return (
      <Wrap>
        <WarmupScreen exercises={exercises} color={broSplit.color}
          onComplete={() => setScreen("bro-workout")}
          onSkip={() => setScreen("bro-workout")} />
      </Wrap>
    );
  }

  // ── BRO WORKOUT ───────────────────────────────────────────────────────────
  if (screen === "bro-workout" && broSplit) return (
    <Wrap>
      <WorkoutScreen workout={broWorkout} setWorkout={setBroWorkout} splitLabel={broSplit.label} color={broSplit.color} bank={broSplit.isCore ? CORE_BANK : BRO_EXERCISE_BANK}
        onBack={() => { clearBroSession(); setScreen("bro-home"); }}
        onRegenerate={() => { const w = generateBroWorkout(broSplit, broTotal); if (settings.supersets && Math.random() < 0.25) { w.sections = injectSupersets(w.sections); } setBroWorkout(w); clearBroSession(); }}
        prs={broPrs} onSavePr={saveBroPr}
        onComplete={entry => { addBroHistory(entry); clearBroSession(); }}
        onSaveWorkout={saveBroWorkout} restDuration={settings.restDuration}
        initialChecked={broSessionChecked} initialSetsDone={broSessionSetsDone}
        onProgressSave={(c, s) => saveBroSession(broWorkout, broSplit, c, s, "bro-workout")} />
    </Wrap>
  );

  // ── LOG WORKOUT SCREENS — remove both blocks to revert ────────────────────
  const broAllExercises = [...new Set(Object.values(BRO_EXERCISE_BANK).flat().map(e => e.name).concat(CORE_BANK.map(e => e.name)).concat(LOG_ONLY_EXERCISES))].sort();
  const wifeyAllExercises = [...new Set([...Object.values(WIFEY_FULL_BODY_BANK).flat(), ...Object.values(WIFEY_CABLE_BANK).flat()].map(e => e.name).concat(CORE_BANK.map(e => e.name)).concat(LOG_ONLY_EXERCISES))].sort();

  if (screen === "log-bro") return (
    <Wrap>
      <div className="sc" style={{ padding:"56px 20px 88px" }}>
        <div style={{ marginBottom:32 }}>
          <button className="bk" onClick={() => setScreen("landing")} style={{ marginBottom:12 }}>BACK</button>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, lineHeight:0.88, letterSpacing:-1 }}>THE BRO<br/><span style={{ color:"#FF3D00" }}>SPLIT</span></div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, letterSpacing:4, color:"#333", marginTop:10, fontWeight:700 }}>WHAT DID YOU DO?</div>
        </div>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:3, color:"#333", fontWeight:700, marginBottom:12 }}>ALREADY TRAINED?</div>
        <div className="tc" onClick={() => setScreen("log-bro-form")}
          style={{ background:"#0f0f0f", border:"1px dashed #2a2a2a", borderLeft:"4px dashed #FF3D00", padding:"24px 20px", position:"relative", overflow:"hidden", marginBottom:10 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, fontWeight:900, letterSpacing:1 }}>LOG A WORKOUT</div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#FF3D00", marginTop:6, fontWeight:700 }}>MANUALLY ENTER YOUR SESSION</div>
        </div>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:3, color:"#333", fontWeight:700, marginBottom:12, marginTop:24 }}>CARDIO SESSION</div>
        <div className="tc" onClick={() => setScreen("bro-cardio")}
          style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:"4px solid #FF1744", padding:"24px 20px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, right:0, width:80, height:"100%", background:"linear-gradient(to left, #FF174408, transparent)" }} />
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, fontWeight:900, letterSpacing:1 }}>CARDIO</div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#FF1744", marginTop:6, fontWeight:700 }}>LOG YOUR SESSION</div>
        </div>
      </div>
      <TabBar active="log" color="#FF3D00" onTab={t => {
        if (t==="train") setScreen("bro-home");
        else if (t==="log") setScreen("log-bro");
        else if (t==="history") setScreen("bro-history");
        else if (t==="stats") setScreen("bro-stats");
      }} />
    </Wrap>
  );
  if (screen === "log-bro-form") return (
    <LogWorkoutScreen color="#FF3D00" profileName="The Bro" allExercises={broAllExercises}
      prs={broPrs} onSavePr={saveBroPr} onComplete={entry => { addBroHistory(entry); }}
      onSaveWorkout={saveBroWorkout} onBack={() => setScreen("log-bro")} />
  );
  if (screen === "log-wifey") return (
    <Wrap>
      <div className="sc" style={{ padding:"56px 20px 88px" }}>
        <div style={{ marginBottom:32 }}>
          <button className="bk" onClick={() => setScreen("landing")} style={{ marginBottom:12 }}>BACK</button>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, lineHeight:0.88, letterSpacing:-1 }}>THE WIFEY<br/><span style={{ color:WIFEY_COLOR }}>WORKOUT</span></div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, letterSpacing:4, color:"#333", marginTop:10, fontWeight:700 }}>WHAT DID YOU DO?</div>
        </div>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:3, color:"#333", fontWeight:700, marginBottom:12 }}>ALREADY TRAINED?</div>
        <div className="tc" onClick={() => setScreen("log-wifey-form")}
          style={{ background:"#0f0f0f", border:"1px dashed #2a2a2a", borderLeft:`4px dashed ${WIFEY_COLOR}`, padding:"24px 20px", position:"relative", overflow:"hidden", marginBottom:10 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, fontWeight:900, letterSpacing:1 }}>LOG A WORKOUT</div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:WIFEY_COLOR, marginTop:6, fontWeight:700 }}>MANUALLY ENTER YOUR SESSION</div>
        </div>
        <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, letterSpacing:3, color:"#333", fontWeight:700, marginBottom:12, marginTop:24 }}>CARDIO SESSION</div>
        <div className="tc" onClick={() => setScreen("cardio")}
          style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:"4px solid #76FF03", padding:"24px 20px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, right:0, width:80, height:"100%", background:"linear-gradient(to left, #76FF0308, transparent)" }} />
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, fontWeight:900, letterSpacing:1 }}>CARDIO</div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:"#76FF03", marginTop:6, fontWeight:700 }}>LOG YOUR SESSION</div>
        </div>
      </div>
      <TabBar active="log" color={WIFEY_COLOR} onTab={t => {
        if (t==="train") setScreen("wifey-home");
        else if (t==="log") setScreen("log-wifey");
        else if (t==="history") setScreen("wifey-history");
        else if (t==="stats") setScreen("wifey-stats");
      }} />
    </Wrap>
  );
  if (screen === "log-wifey-form") return (
    <LogWorkoutScreen color={WIFEY_COLOR} profileName="The Wifey" allExercises={wifeyAllExercises}
      prs={wifeyPrs} onSavePr={saveWifeyPr} onComplete={entry => { addWifeyHistory(entry); }}
      onSaveWorkout={saveWifeyWorkout} onBack={() => setScreen("log-wifey")} />
  );
  // ── END LOG WORKOUT SCREENS ───────────────────────────────────────────────

  // ── BRO HISTORY ───────────────────────────────────────────────────────────
  if (screen === "bro-history") return (
    <Wrap>
      <HistoryScreen history={broHistory} savedWorkouts={broSaved} profileColor="#FF3D00" onBack={() => setScreen("bro-home")} onClear={() => { setBroHistory([]); saveStorage("dg-history", []); }}  onDeleteSaved={deleteBroSaved} onDeleteEntry={deleteBroHistory} onStartSaved={startBroSavedWorkout} onSaveWorkout={saveBroWorkout} tabBar={<TabBar active="history" color="#FF3D00" onTab={t => { if (t==="train") setScreen("bro-home"); else if (t==="log") setScreen("log-bro"); else if (t==="history") setScreen("bro-history"); else if (t==="stats") setScreen("bro-stats"); }} />} />
    </Wrap>
  );

  // ── BRO STATS ─────────────────────────────────────────────────────────────
  if (screen === "bro-stats") return (
    <Wrap>
      <StatsScreen history={broHistory} weightLog={broWeightLog} onSaveWeight={saveBroWeight}
        profileColor="#FF3D00" profileName="The Bro" onBack={() => setScreen("bro-home")} goalWeight={broGoalWeight} onSaveGoalWeight={saveBroGoalWeight} prs={{...broPrs, ...wifeyPrs}} onDeletePr={deletePr} tabBar={<TabBar active="stats" color="#FF3D00" onTab={t => { if (t==="train") setScreen("bro-home"); else if (t==="log") setScreen("log-bro"); else if (t==="history") setScreen("bro-history"); else if (t==="stats") setScreen("bro-stats"); }} />} />
    </Wrap>
  );



  // ── WIFEY HOME ────────────────────────────────────────────────────────────
  if (screen === "wifey-home") return (
    <Wrap>{showWhatsNew && <WhatsNewModal />}
      <div className="sc" style={{ padding:"56px 20px 88px" }}>
        <div style={{ marginBottom:32 }}>
          <button className="bk" onClick={() => setScreen("landing")} style={{ marginBottom:12 }}>BACK</button>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, lineHeight:0.88, letterSpacing:-1 }}>THE WIFEY<br/><span style={{ color:WIFEY_COLOR }}>WORKOUT</span></div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:13, letterSpacing:4, color:"#333", marginTop:10, fontWeight:700 }}>SELECT YOUR SPLIT</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            { id:"fullbody", label:"Full Body",  sub:"DUMBBELLS . MACHINES . FREE WEIGHTS", color:WIFEY_COLOR },
            { id:"cables",   label:"All Cables", sub:"CABLE MACHINE ONLY",                  color:"#00E5FF"   },
            { id:"core",     label:"Core / Abs", sub:"ABS . CORE STRENGTH",                 color:"#EEFF41"   },
            { id:"legs",     label:"Leg Day",    sub:"LOWER BODY . GLUTES . STRENGTH",      color:"#D500F9"   },
          ].map((opt, idx) => (
            <div key={opt.id} className="tc"
              onClick={() => { setWifeyMode(opt.id); setWifeyTotal(opt.id==="cables"?8:opt.id==="core"?4:opt.id==="legs"?6:9); setScreen("wifey-configure"); }}
              style={{ background:"#0f0f0f", border:"1px solid #1a1a1a", borderLeft:`4px solid ${opt.color}`, padding:"24px 20px", position:"relative", overflow:"hidden", animation:`scIn 0.3s cubic-bezier(0.22,1,0.36,1) ${idx*0.05}s both` }}>
              <div style={{ position:"absolute", top:0, right:0, width:80, height:"100%", background:`linear-gradient(to left, ${opt.color}08, transparent)` }} />
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, fontWeight:900, letterSpacing:1 }}>{opt.label.toUpperCase()}</div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:3, color:opt.color, marginTop:6, fontWeight:700 }}>{opt.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="train" color={WIFEY_COLOR} onTab={t => {
        if (t==="train") setScreen("wifey-home");
        else if (t==="log") setScreen("log-wifey");
        else if (t==="history") setScreen("wifey-history");
        else if (t==="stats") setScreen("wifey-stats");
      }} />
    </Wrap>
  );

  // ── WIFEY CONFIGURE ───────────────────────────────────────────────────────
  if (screen === "wifey-configure") return (
    <Wrap>
      <div className="sc" style={{ padding:"56px 20px 40px" }}>
        <button className="bk" onClick={() => setScreen("wifey-home")}>BACK</button>
        <div style={{ marginTop:28, marginBottom:36 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color:wColor, fontWeight:700, marginBottom:4 }}>TODAY'S WORKOUT</div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:58, fontWeight:900, lineHeight:0.9, letterSpacing:1 }}>{wifeyMode==="cables"?"ALL CABLES":wifeyMode==="core"?"CORE / ABS":wifeyMode==="legs"?"LEG DAY":"FULL BODY"}</div>
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
        <button className="mbtn" style={{ background:wColor, color:"#000" }} onClick={() => { const legsOnlyBank = { Legs: WIFEY_FULL_BODY_BANK["Legs"] }; const w = wifeyIsCore ? generateCoreWorkout(wifeyTotal) : generateWifeyWorkout(wifeyIsLegs ? legsOnlyBank : wifeyBank, wifeyTotal, wifeyHistory, wifeyMode); if (!wifeyIsCore && settings.supersets && Math.random() < 0.25) { w.sections = injectSupersets(w.sections); } setWifeyWorkout(w); setScreen(wifeyWarmup ? "wifey-warmup" : "wifey-workout"); }}>GENERATE WORKOUT</button>
        <div onClick={() => setWifeyWarmup(w => !w)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"#0f0f0f", border:`1px solid ${wifeyWarmup ? wColor+"40" : "#1a1a1a"}`, borderLeft:`3px solid ${wifeyWarmup ? wColor : "#1a1a1a"}`, borderRadius:4, padding:"14px 16px", marginTop:10, cursor:"pointer" }}>
          <div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:16, fontWeight:800, color: wifeyWarmup ? "#fff" : "#444", letterSpacing:0.5 }}>INCLUDE WARMUP</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:10, color:"#2a2a2a", letterSpacing:1, fontWeight:600, marginTop:2 }}>DYNAMIC STRETCHES . 45 SEC EACH</div>
          </div>
          <div style={{ width:40, height:24, borderRadius:12, background: wifeyWarmup ? wColor : "#1a1a1a", border:`1px solid ${wifeyWarmup ? wColor : "#333"}`, position:"relative", flexShrink:0, transition:"background 0.2s" }}>
            <div style={{ position:"absolute", top:3, left: wifeyWarmup ? 18 : 3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
          </div>
        </div>
      </div>
    </Wrap>
  );

  // ── WIFEY WARMUP ──────────────────────────────────────────────────────────
  if (screen === "wifey-warmup") {
    const warmupKey = wifeyMode === "cables" ? "All Cables" : wifeyMode === "cardio" ? "Cardio" : wifeyMode === "core" ? "Full Body" : "Full Body";
    const exercises = WARMUP_BANK[warmupKey] || WARMUP_BANK["Full Body"];
    const wColor2 = wifeyMode === "cables" ? "#00E5FF" : wifeyMode === "core" ? "#EEFF41" : WIFEY_COLOR;
    return (
      <Wrap>
        <WarmupScreen exercises={exercises} color={wColor2}
          onComplete={() => setScreen("wifey-workout")}
          onSkip={() => setScreen("wifey-workout")} />
      </Wrap>
    );
  }

  // ── WIFEY WORKOUT ─────────────────────────────────────────────────────────
  if (screen === "wifey-workout") return (
    <Wrap>
      <WorkoutScreen workout={wifeyWorkout} setWorkout={setWifeyWorkout}
        splitLabel={wifeyMode==="cables"?"All Cables":wifeyMode==="core"?"Core / Abs":wifeyMode==="legs"?"Leg Day":"Full Body"} color={wColor} bank={wifeyIsCore ? CORE_BANK : wifeyIsLegs ? WIFEY_FULL_BODY_BANK["Legs"] : wifeyBank}
        onBack={() => { clearWifeySession(); setScreen("wifey-home"); }}
        onRegenerate={() => { const legsOnlyBank = { Legs: WIFEY_FULL_BODY_BANK["Legs"] }; const w = wifeyIsCore ? generateCoreWorkout(wifeyTotal) : generateWifeyWorkout(wifeyIsLegs ? legsOnlyBank : wifeyBank, wifeyTotal, wifeyHistory, wifeyMode); if (!wifeyIsCore && settings.supersets && Math.random() < 0.25) { w.sections = injectSupersets(w.sections); } setWifeyWorkout(w); clearWifeySession(); }}
        prs={wifeyPrs} onSavePr={saveWifeyPr}
        onComplete={entry => { addWifeyHistory(entry); clearWifeySession(); }}
        onSaveWorkout={saveWifeyWorkout} restDuration={settings.restDuration}
        initialChecked={wifeySessionChecked} initialSetsDone={wifeySessionSetsDone}
        onProgressSave={(c, s) => saveWifeySession(wifeyWorkout, wifeyMode, c, s, "wifey-workout")} />
    </Wrap>
  );

  // ── WIFEY HISTORY ─────────────────────────────────────────────────────────
  if (screen === "wifey-history") return (
    <Wrap>
      <HistoryScreen history={wifeyHistory} savedWorkouts={wifeySaved} profileColor={WIFEY_COLOR} onBack={() => setScreen("wifey-home")} onClear={() => { setWifeyHistory([]); saveStorage("wy-history", []); }}  onDeleteSaved={deleteWifeySaved} onDeleteEntry={deleteWifeyHistory} onStartSaved={startWifeySavedWorkout} onSaveWorkout={saveWifeyWorkout} tabBar={<TabBar active="history" color={WIFEY_COLOR} onTab={t => { if (t==="train") setScreen("wifey-home"); else if (t==="log") setScreen("log-wifey"); else if (t==="history") setScreen("wifey-history"); else if (t==="stats") setScreen("wifey-stats"); }} />} />
    </Wrap>
  );

  // ── WIFEY STATS ───────────────────────────────────────────────────────────
  if (screen === "wifey-stats") return (
    <Wrap>
      <StatsScreen history={wifeyHistory} weightLog={wifeyWeightLog} onSaveWeight={saveWifeyWeight}
        profileColor={WIFEY_COLOR} profileName="The Wifey" onBack={() => setScreen("wifey-home")} goalWeight={wifeyGoalWeight} onSaveGoalWeight={saveWifeyGoalWeight} prs={{...broPrs, ...wifeyPrs}} onDeletePr={deletePr} tabBar={<TabBar active="stats" color={WIFEY_COLOR} onTab={t => { if (t==="train") setScreen("wifey-home"); else if (t==="log") setScreen("log-wifey"); else if (t==="history") setScreen("wifey-history"); else if (t==="stats") setScreen("wifey-stats"); }} />} />
    </Wrap>
  );


  // ── BRO CARDIO ────────────────────────────────────────────────────────────
  if (screen === "bro-cardio") return (
    <CardioScreen color="#FF1744" onBack={() => setScreen("log-bro")} onComplete={entry => { addBroHistory(entry); }} />
  );

  // ── WIFEY CARDIO ──────────────────────────────────────────────────────────
  if (screen === "cardio") return (
    <CardioScreen color="#76FF03" onBack={() => setScreen("log-wifey")} onComplete={entry => { addWifeyHistory(entry); }} />
  );

  // ── SETTINGS ──────────────────────────────────────────────────────────────
  if (screen === "settings") return (
    <Wrap>
      <div className="sc" style={{ padding:"56px 20px 40px" }}>
        <button className="bk" onClick={() => setScreen("landing")}>BACK</button>
        <div style={{ marginTop:28, marginBottom:36 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:56, fontWeight:900, lineHeight:0.9, letterSpacing:1 }}>WORK<br/><span style={{ color:"#FF3D00" }}>OUT</span><br/>SETTINGS</div>
        </div>

        {/* REST TIMER */}
        <div style={{ marginBottom:32 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color:"#444", fontWeight:700, marginBottom:12 }}>REST TIMER</div>
          <div style={{ display:"flex", gap:8 }}>
            {[60, 90, 120].map(s => (
              <button key={s} onClick={() => updateSetting("restDuration", s)}
                style={{ flex:1, fontFamily:"'Barlow Condensed'", fontWeight:900, fontSize:20, letterSpacing:1, padding:"14px 0", borderRadius:4, cursor:"pointer",
                  background: settings.restDuration === s ? "#FF3D00" : "#0f0f0f",
                  color: settings.restDuration === s ? "#000" : "#333",
                  border: settings.restDuration === s ? "1px solid #FF3D00" : "1px solid #1a1a1a" }}>
                {s}s
              </button>
            ))}
          </div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#2a2a2a", letterSpacing:2, marginTop:8, fontWeight:600 }}>SECONDS BETWEEN SETS</div>
        </div>

        {/* SUPERSETS */}
        <div style={{ marginBottom:32 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color:"#444", fontWeight:700, marginBottom:12 }}>SUPERSETS</div>
          <div style={{ background:"#0f0f0f", border:`1px solid ${settings.supersets ? "#FF3D0040" : "#1a1a1a"}`, borderLeft:`3px solid ${settings.supersets ? "#FF3D00" : "#1a1a1a"}`, borderRadius:4, padding:"16px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:18, fontWeight:800, letterSpacing:0.5, color: settings.supersets ? "#fff" : "#444" }}>INCLUDE SUPERSETS</div>
              <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#2a2a2a", letterSpacing:1, marginTop:3, fontWeight:600 }}>GYM-FRIENDLY PAIRINGS . 1–2 PER WORKOUT</div>
            </div>
            <div onClick={() => updateSetting("supersets", !settings.supersets)}
              style={{ width:44, height:26, borderRadius:13, background: settings.supersets ? "#FF3D00" : "#1a1a1a", border:`1px solid ${settings.supersets ? "#FF3D00" : "#333"}`, position:"relative", cursor:"pointer", transition:"background 0.2s", flexShrink:0 }}>
              <div style={{ position:"absolute", top:3, left: settings.supersets ? 21 : 3, width:18, height:18, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
            </div>
          </div>
          {settings.supersets && (
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#333", letterSpacing:1, marginTop:8, fontWeight:600 }}>
              PAIRS ONE MACHINE/BARBELL MOVE WITH A PORTABLE EXERCISE. TAKES EFFECT ON NEXT GENERATED WORKOUT.
            </div>
          )}
        </div>

        {/* DEFAULT PROFILE */}
        <div style={{ marginBottom:32 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, letterSpacing:4, color:"#444", fontWeight:700, marginBottom:12 }}>DEFAULT PROFILE</div>
          <div style={{ display:"flex", gap:8 }}>
            {[["none","NONE"],["bro","THE BRO"],["wifey","THE WIFEY"]].map(([id, label]) => (
              <button key={id} onClick={() => updateSetting("defaultProfile", id)}
                style={{ flex:1, fontFamily:"'Barlow Condensed'", fontWeight:900, fontSize:15, letterSpacing:1, padding:"14px 0", borderRadius:4, cursor:"pointer",
                  background: settings.defaultProfile === id ? "#FF3D00" : "#0f0f0f",
                  color: settings.defaultProfile === id ? "#000" : "#333",
                  border: settings.defaultProfile === id ? "1px solid #FF3D00" : "1px solid #1a1a1a" }}>
                {label}
              </button>
            ))}
          </div>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:11, color:"#2a2a2a", letterSpacing:2, marginTop:8, fontWeight:600 }}>SKIP LANDING SCREEN ON OPEN</div>
        </div>
      </div>
    </Wrap>
  );

  return null;
}
