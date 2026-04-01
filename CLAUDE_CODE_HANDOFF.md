# BlockBlitz — Claude Code Handoff Document

## What This Is
A fully self-contained HTML5 mobile puzzle game inspired by Block Blast.
All code lives in a single file: `BlockBlitz.html` (~49KB, ~1166 lines).
No external dependencies except Google Fonts. Works in any browser.

---

## How to Continue

1. Open `BlockBlitz.html` in your editor
2. Paste this entire document to Claude Code as context
3. Reference the **Architecture** and **Feature List** below when making changes

---

## Architecture Overview

Everything is inside one `<script>` tag as a single IIFE:
```
var BB = (function(){ ... return { public API }; })();
```

### Key Globals (inside IIFE)
| Variable | Purpose |
|---|---|
| `board` | 8×8 array of `{type, color}` objects |
| `pieces` | Array of 3 current tray pieces `{shape, color}` |
| `level` | Current level index (0–9, loops) |
| `score` | Current score |
| `starsLeft` / `pentasLeft` | Gem counters (win when both = 0) |
| `combo` | Current combo streak |
| `CS` / `GAP` / `STEP` | Cell size in px (responsive, set by `setCS()`) |

### Cell Types (`T` object)
```js
T.EMPTY    = 0  // dark navy — player places blocks here
T.GOLD     = 1  // gold 3D block — permanent wall
T.GOLD_STAR  = 2  // gold block + ⭐ gem on top
T.GOLD_PENTA = 3  // gold block + 🔶 gem on top
T.FILLED   = 4  // player-placed coloured block
```

### Core Functions
| Function | What it does |
|---|---|
| `init()` | Loads localStorage, calls `startLevel()` |
| `startLevel(lv)` | Resets board from `LEVELS[lv]`, deals pieces |
| `buildBoardDOM()` | Creates 64 cell divs, IDs = `c{r}_{c}` |
| `syncBoard()` | Re-renders all cells from `board[][]` state |
| `dealPieces()` | Generates 3 random pieces, calls `renderTray()` |
| `renderTray()` | Renders scaled-down piece previews in tray slots |
| `startDrag(e, idx)` | Mouse/touch drag start — builds ghost, adds listeners |
| `canPlace(shape, r, c)` | Returns true only if all shape cells land on T.EMPTY |
| `placePiece(p, r, c)` | Sets board cells to T.FILLED, updates DOM |
| `checkLines()` | Finds full rows/cols (no EMPTY cells), clears FILLED, collects gems, scores |
| `checkStageClear()` | Triggers celebration if starsLeft + pentasLeft = 0 |
| `doGameOver()` | Stops music, shows game over modal |
| `updateGemUI()` | Updates ⭐/🔶 counters + level label in top bar |

### Level Format (in `LEVELS` array)
Each level is an 8×8 grid where:
- `0` = empty cell (player fills these)
- `1` = gold block (permanent wall)
- `2` = gold block with ⭐ star gem
- `3` = gold block with 🔶 pentagon gem

### Drag & Drop System
- `startDrag` → creates ghost element, attaches `_move`/`_up` closures
- `refreshGhost` → repositions ghost using `cursorToSnap()` math
- `onUp` → calls `canPlace()`, then `placePiece()` if valid
- Ghost uses same CSS/size as board cells for visual consistency

### Scoring
- Each cleared row/col = `COLS × 10 × combo` pts
- Combo increments on consecutive clears without placing a non-clearing piece

---

## Visual Design

| Element | Style |
|---|---|
| Background | `#1a6dd4` bright blue |
| Board background | `#1a4fa0` darker blue |
| Empty cells | `#152d60` dark navy |
| Gold blocks | Gradient `#ffd97a → #e8a020 → #c07800` + 3D shadow |
| Filled cells | Player colour + top shine + bottom shadow (3D look) |
| Ghost | Same as filled cells, `opacity: 0.88` |
| Valid placement | `#7ec8ff` highlight + white border |
| Invalid placement | `#ff4444` red highlight |

---

## Sound Engine (`SND` object)
All sounds synthesised via Web Audio API — no audio files.
| Method | Sound |
|---|---|
| `SND.pickup()` | Light chime when picking up piece |
| `SND.place()` | Thud when placing piece |
| `SND.gem()` | Sparkle when collecting gem |
| `SND.clear(n, combo)` | Victory fanfare scaled by lines + combo |
| `SND.stageWin()` | Full ascending fanfare |
| `SND.gameOver()` | Descending sad trombone slide |

---

## Music Engine (`MUSIC` object)
Synthesised lofi/upbeat music — no audio files.
5 track variants (one per level, loops).
Each track has 4 rotating sections (A=full, B=break, C=build, D=climax) to avoid repetition.
| Method | Purpose |
|---|---|
| `MUSIC.play(levelIndex)` | Start/crossfade to track for that level |
| `MUSIC.toggle()` | Mute/unmute |
| `MUSIC.stop()` | Fade out and stop |

---

## Effects System
| Function | Effect |
|---|---|
| `spawnRings(isCombo, numLines)` | Expanding coloured rings from board centre |
| `spawnReaction(isCombo, isMulti)` | Floating emoji badges (👍⭐🔥🤩 etc.) |
| `showComboBadge(n, isMulti)` | "COMBO ×3" pill in HUD |
| `spawnConfetti(els)` | Square confetti from cleared cells |
| `flyGem(emoji, r, c)` | Gem flies upward when collected |
| `showFlyScore(txt, isCombo)` | "+320" score floats up from board |

---

## 10 Levels (Difficulty Progression)

| # | Name | Difficulty | Key Feature |
|---|---|---|---|
| 1 | Open Field | 🟢 Super Easy | Almost empty board, 4 corner golds, 2 gems |
| 2 | Side Wall | 🟢 Easy | Gold border on 2 sides, 3 gems |
| 3 | Four Pillars | 🟡 Easy-Med | 4 gold pillars divide board |
| 4 | Scattered | 🟡 Easy-Med | Light scattered gold blocks |
| 5 | H-Shape | 🟠 Medium | H-shaped gold structure |
| 6 | Cross | 🟠 Medium | Gold cross through centre |
| 7 | Zigzag | 🟠 Med-Hard | Zigzag corridor walls |
| 8 | Diamond Ring | 🔴 Hard | Dense corners, 6 gems |
| 9 | Maze | 🔴 Hard | Narrow corridor paths |
| 10 | Packed | 🔴 Very Hard | Almost fully packed board |

Levels loop after 10 (index: `lv % LEVELS.length`).

---

## Public API (what HTML buttons call)
```js
BB.retry()         // restart current level
BB.nextStage()     // advance to next level
BB.goMenu()        // reload page (back to menu)
BB.toggleMusic()   // mute/unmute
BB.purchasePro()   // unlock pro (localStorage)
```

---

## localStorage Keys
| Key | Value |
|---|---|
| `bblevel` | Last level index reached |
| `bbscore` | Best score ever |
| `bbmaxcombo` | Highest combo |
| `bbrounds` | Total games played |
| `bbpro` | `'1'` if Pro purchased |

---

## Known Working Features
- ✅ Drag & drop pieces (mouse + touch)
- ✅ Ghost piece shows valid/invalid placement
- ✅ Gold blocks as permanent walls
- ✅ Gem collection (⭐ and 🔶) via placement or row clear
- ✅ Line clearing (rows AND columns)
- ✅ Combo system with HUD badge
- ✅ Ring burst + reaction emoji on clear
- ✅ Square confetti explosion
- ✅ Synthesised sound effects (no files)
- ✅ Synthesised music with 4-section rotation (no files)
- ✅ 10 levels with proper difficulty curve
- ✅ Stage clear modal with gem stats
- ✅ Game over modal with RETRY button
- ✅ Level counter in top bar
- ✅ Responsive cell sizing for different screen widths
- ✅ localStorage persistence

---

## Suggested Next Features
- [ ] Animated intro/splash screen
- [ ] More levels (11–30) with new obstacle types
- [ ] Locked cells (walls that can't be cleared at all)
- [ ] Timer mode (countdown per level)
- [ ] Daily challenge level
- [ ] Actual leaderboard (use a backend or Firebase)
- [ ] More gem types (e.g. 💎 diamond = 3 points)
- [ ] Power-up pieces (bomb 💣, lightning ⚡, wildcard 🌈)
- [ ] AdMob integration (replace mock ad strip)
- [ ] IAP integration (replace mock Pro button)
- [ ] Wrap in Capacitor/Cordova for App Store deployment

---

## How to Run
Just open `BlockBlitz.html` in any browser. No server needed.
For mobile testing: serve with `npx serve .` and open on phone.

---

## Prompt Template for Claude Code

Paste this to Claude Code to continue development:

```
I'm continuing development of BlockBlitz, a mobile HTML5 puzzle game.
The full game is in BlockBlitz.html (single file, ~1166 lines, no dependencies).

Here is the architecture context:
[paste this entire document]

The current file is attached. Please [YOUR REQUEST HERE].

Key things to know:
- All game logic is inside a single IIFE: var BB = (function(){...})();
- Cell IDs on the board are: c{row}_{col} (e.g. c0_0, c3_5)
- Cell types: 0=empty, 1=gold, 2=gold+star, 3=gold+penta, 4=filled
- Board state is board[r][c] = {type, color}
- Always test that canPlace() only allows T.EMPTY cells
- Music and sounds are fully synthesised — no audio files needed
- The game is designed for mobile (touch) but works on desktop too
```
