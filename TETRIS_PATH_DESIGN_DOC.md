# Tetris Path — Game Design & Engineering Document

## 1. Executive Summary

Tetris Path is an original falling-block puzzle mode within Block Blitz. It draws inspiration from the principles that make top-tier falling block games feel satisfying: responsive controls, forgiving input systems, escalating tension, and layered visual/audio feedback.

This document extracts the **underlying design principles** from the genre, then translates them into an original implementation blueprint. No copyrighted assets, code, or branding is reproduced.

---

## 2. Gameplay Loop Breakdown

### Core Loop (5-second cycle)
```
SPAWN piece at top center
  → Player POSITIONS piece (swipe left/right, tap to rotate)
  → Piece FALLS by gravity (auto-tick)
  → Player COMMITS placement (hard drop or gravity lock)
  → LOCK piece into board
  → CHECK for completed lines
  → CLEAR lines (with effects)
  → CHECK for level-up
  → SPAWN next piece → repeat
```

### Extended Loop (per-level)
```
Start level with goal (e.g., "Clear 5 lines")
  → Play core loop repeatedly
  → Track lines cleared toward goal
  → On goal met: LEVEL UP → increase speed → show celebration
  → Continue until board tops out
```

### Session Loop
```
Menu → Select Tetris Path → Level Map
  → Choose level (or continue from last)
  → Play until game over or level clear
  → Results screen (score, lines, stars)
  → Retry / Next Level / Menu
```

### What Makes It Addictive
- **Flow state**: Speed escalates gradually, keeping challenge in the sweet spot
- **Near-miss tension**: Board fills up, creating "will I survive?" moments
- **Completion satisfaction**: Full line vanishing is inherently rewarding
- **Skill expression**: Better players can do T-Spins, Tetrises, combos
- **"One more try"**: Short sessions (2-5 minutes) with clear improvement path

---

## 3. Stage Progression Breakdown

### Level Structure (100 levels, 6 phases)

| Phase | Levels | Name | Gravity | Goal | New Mechanic |
|-------|--------|------|---------|------|-------------|
| 1 | 1-10 | Tutorial | 1000-520ms | 5-9 lines | Basic falling blocks |
| 2 | 11-20 | Warming Up | 520-270ms | 10 lines | Speed increase noticeable |
| 3 | 21-30 | Getting Serious | 270-140ms | 12 lines | Garbage rows appear (Lv31+) |
| 4 | 31-50 | Expert Zone | 140-50ms | 14-16 lines | Pre-filled boards, obstacles |
| 5 | 51-70 | Master Class | 50-38ms | 18 lines | Complex starting layouts |
| 6 | 71-100 | Legend | 38-35ms | 20 lines | Maximum pressure, all mechanics |

### Difficulty Scaling Mechanisms

1. **Gravity speed** — Primary difficulty driver. Pieces fall faster each level.
2. **Line goal increase** — More lines needed per level as you progress.
3. **Garbage rows** — Pre-filled partial rows that appear from Lv31+.
4. **Lock delay reduction** — Less time to adjust piece once it lands (500ms → 300ms).
5. **Starting board state** — Higher levels start with some cells pre-filled.

### Recommended Gravity Table

| Level | Drop Interval (ms) | Feel |
|-------|-------------------|------|
| 1 | 1000 | Relaxed, tutorial pace |
| 2 | 880 | Slightly faster |
| 3 | 760 | Comfortable |
| 4 | 640 | Moderate |
| 5 | 520 | Standard play |
| 6 | 470 | Picking up |
| 7 | 420 | Noticeable speed |
| 8 | 370 | Getting challenging |
| 9 | 320 | Fast |
| 10 | 270 | Intense |
| 11-15 | 270→140 | -26ms/level |
| 16-20 | 140→80 | -12ms/level |
| 21-30 | 80→50 | -3ms/level |
| 31-50 | 50→40 | -0.5ms/level |
| 51-70 | 40→38 | Barely perceptible |
| 71+ | 35 | Speed floor (still playable) |

### Line Goals Per Level

| Levels | Lines to Clear |
|--------|---------------|
| 1 | 5 |
| 2 | 6 |
| 3 | 7 |
| 4 | 8 |
| 5 | 9 |
| 6-10 | 10 each |
| 11-20 | 12 each |
| 21-30 | 14 each |
| 31-50 | 16 each |
| 51-70 | 18 each |
| 71-100 | 20 each |

---

## 4. Smoothness and Feel Analysis

### What Creates the "Premium Feel"

#### A. Input Responsiveness
The #1 factor. Every input must produce IMMEDIATE visual feedback.

- **DAS (Delayed Auto Shift)**: 170ms initial delay before auto-repeat starts
- **ARR (Auto Repeat Rate)**: 50ms between repeats once DAS triggers
- **Input buffering**: Accept inputs up to 50ms before they're "valid" — if a player presses left just before the piece spawns, buffer the input and apply it on spawn
- **Zero-frame response**: Piece moves on the SAME frame the input is received, not the next tick

#### B. Lock Delay
The "forgiveness window" — the time between a piece landing and it locking.

- **Duration**: 500ms at Lv1, decreasing to 300ms by Lv50
- **Reset on move/rotate**: Each successful move or rotation resets the lock timer
- **Max resets**: 15 resets maximum to prevent infinite stalling
- **Visual cue**: Piece briefly flashes or pulses when lock is about to trigger

#### C. Visual Anticipation
Players need to see WHERE a piece will land before committing.

- **Ghost piece**: Semi-transparent outline at the landing position (35% opacity)
- **Ghost updates instantly**: Every move/rotation updates the ghost with zero delay
- **Ghost color matches piece**: Same color but faded, so the brain connects them

#### D. State Transition Cleanliness
No jarring jumps between game states.

- Piece spawn: instant, no delay between lock and next spawn
- Line clear: 150-200ms flash, then lines collapse smoothly
- Level up: brief celebration overlay (1-2 seconds) that doesn't interrupt flow
- Game over: board dims gradually, pieces fall/scatter

#### E. Audio-Visual Sync
Every action has BOTH visual AND audio feedback, synchronized within 16ms.

- **Place**: Snap sound + cell bounce animation (same frame)
- **Move**: Subtle click + piece slides (not teleports)
- **Rotate**: Whoosh + brief rotation animation
- **Hard drop**: Slam sound + board shake + flash (same frame)
- **Line clear**: Rising chime + row flash + particle burst (staggered by 50ms)
- **Combo**: Escalating pitch on consecutive clears

---

## 5. Animation and Polish Breakdown

### Animation Categories

#### 5.1 Piece Spawn
- **What player sees**: New piece appears at top center, briefly scales from 90% to 100%
- **Why it feels good**: Subtle "pop in" draws attention without interrupting
- **Technical**: `transform: scale(0.9→1.0)` over 100ms, ease-out

#### 5.2 Piece Movement (horizontal)
- **What player sees**: Piece slides smoothly to new column
- **Why it feels good**: Feels physical, not digital
- **Technical**: CSS transition on position, 30-50ms duration, linear easing
- **Note**: At high speed, skip animation and snap instantly to maintain responsiveness

#### 5.3 Rotation
- **What player sees**: Piece rotates with a brief spin effect
- **Why it feels good**: Confirms the action happened, spatial clarity
- **Technical**: 60ms rotation with slight overshoot, ease-out. If wall kick triggers, brief highlight on the kicked cells

#### 5.4 Soft Drop (swipe down slowly)
- **What player sees**: Piece moves down faster than gravity, trail effect
- **Why it feels good**: Player feels in control of speed
- **Technical**: Skip gravity tick, move 1 cell per 30-50ms of touch drag

#### 5.5 Hard Drop
- **What player sees**: Piece SLAMS to bottom instantly. Board shakes. Flash at landing row. Ghost trail from original position to landing.
- **Why it feels good**: Most satisfying action in the game. Commitment moment.
- **Technical**:
  - Frame 1: Piece teleports to ghost position
  - Frame 1: Spawn vertical trail particles from start to end position
  - Frame 1-4: Board shake (translateY 3px, 150ms)
  - Frame 1: Camera flash (screen brightness +20%, 80ms)
  - Frame 1: Haptic feedback (20ms vibration)
  - Frame 2: Slam sound plays

#### 5.6 Piece Lock
- **What player sees**: Piece "settles" with a brief squish (scale Y 0.95→1.0), cells get their 3D highlight
- **Why it feels good**: Confirms piece is committed, tactile weight
- **Technical**: `scaleY(0.95→1.0)` over 100ms, bounce easing. Play "click" sound.

#### 5.7 Line Clear
This is the MOST IMPORTANT animation. It's the core reward.

**Single line (1 line)**:
- Flash row white (50ms)
- Cells scale down and fade (150ms)
- Row collapses: cells above slide down (100ms, ease-out)
- Subtle particle sparkles from cleared cells
- Sound: ascending chime

**Double (2 lines)**:
- Same as single but both rows flash simultaneously
- Stronger sparkle burst
- Sound: higher pitched double chime
- "+300" score pops up

**Triple (3 lines)**:
- Flash with golden tint
- More particles
- Brief screen shake (100ms)
- Sound: triple ascending notes
- "TRIPLE!" text flies up

**Tetris (4 lines)**:
- FULL screen flash (white, 80ms)
- Heavy screen shake (200ms)
- Massive particle explosion
- Cells shatter outward before collapsing
- Sound: epic chord + crash
- "TETRIS!" text with glow animation
- Board border pulses gold for 1 second
- Haptic: 40ms vibration

#### 5.8 Combo (consecutive clears)
- Combo counter appears: "×2", "×3", etc.
- Text size increases with combo level
- Color shifts from white → yellow → orange → red
- Sound pitch rises with each consecutive clear
- At combo ×5+: board background pulses

#### 5.9 T-Spin
- Purple flash on the T-piece cells
- Swirl particle effect
- "T-SPIN!" text with purple glow
- Sound: distinctive whoosh + chime
- Extra dramatic if T-Spin + line clear

#### 5.10 Level Up
- XP bar fills to 100% → explodes into particles
- "LEVEL X!" text scales up from center, pulses, fades
- Brief board border glow (level-appropriate color)
- Speed change happens AFTER the celebration (500ms delay)
- Sound: triumphant ascending notes (7-note fanfare)
- New level goal appears in XP bar

#### 5.11 Game Over
- Gravity stops
- Board cells turn grey from bottom to top (40ms per row) — "curtain falling" effect
- Screen dims gradually (500ms)
- "GAME OVER" text fades in
- Final score counts up
- Results modal slides up from bottom (300ms, ease-out)
- Sound: descending deflating tone

#### 5.12 Menu Transitions
- Level map fades in (not slide) from center — 250ms, ease-out
- Mode selection cards have subtle hover/press feedback (scale 0.97 on press)
- Buttons have press-down + release-up animation

### Easing Guide
| Animation | Easing | Duration |
|-----------|--------|----------|
| Piece move | linear | 30-50ms |
| Piece rotate | ease-out | 60ms |
| Hard drop | instant | 0ms (visual trail follows) |
| Cell land | cubic-bezier(.34,1.56,.64,1) | 150ms |
| Line clear flash | ease-in | 50ms |
| Line collapse | ease-out | 100ms |
| Score popup | ease-out | 300ms (float up + fade) |
| Level up text | ease-out → ease-in | 800ms (grow) + 400ms (fade) |
| Board shake | ease-out (decay) | 150-200ms |
| Menu fade | ease-out | 250ms |
| Game over curtain | linear | 40ms × rows |

---

## 6. Technical Design Document

### System Architecture
```
TetrisPath/
├── Board System      — Grid state, collision detection, line scanning
├── Piece System      — Tetromino data, SRS rotation, spawn logic
├── Input System      — Touch gestures, keyboard, DAS/ARR, buffering
├── Gravity System    — Auto-drop timer, speed progression
├── Lock System       — Lock delay timer, reset rules, max resets
├── Score System      — Points, combos, T-Spin detection, level tracking
├── Animation System  — Tween engine, particle spawner, screen effects
├── Audio System      — Sound triggers, pitch scaling, music sync
├── HUD System        — Score display, level/goal, next/hold previews
├── State Machine     — Menu → Playing → Paused → GameOver → Results
└── Level System      — Goal config, difficulty params, star ratings
```

### Game States
```
IDLE        → Menu/level map visible, no game running
SPAWNING    → Brief delay before piece appears (0-50ms)
FALLING     → Piece is active, accepting input, gravity running
LOCKING     → Piece is on ground, lock delay counting down
CLEARING    → Lines are being cleared (animation playing)
LEVELING    → Level up celebration (500ms)
GAME_OVER   → Board filling animation, then results
PAUSED      → Timers frozen, overlay visible
```

### Input System Design
```
Touch Gestures:
  TAP (< 250ms, < 15px movement)     → Rotate clockwise
  SWIPE LEFT/RIGHT (> 28px)          → Move piece (1 cell per 28px)
  SWIPE DOWN (> 30px, mostly vertical) → Hard drop (instant)
  LONG PRESS (> 350ms, no movement)   → Hold piece

Keyboard:
  Arrow Left/Right  → Move (with DAS/ARR)
  Arrow Down        → Soft drop (1 cell per press, DAS repeats)
  Arrow Up          → Rotate clockwise
  Space             → Hard drop
  C / Shift         → Hold piece
  Z                 → Rotate counter-clockwise (future)
  Escape            → Pause

DAS/ARR:
  Initial delay (DAS): 170ms
  Repeat rate (ARR): 50ms
  Implementation: On keydown, fire action immediately. Start DAS timer.
                  When DAS fires, start ARR interval.
                  On keyup, clear both timers.
```

### Board System
```
Grid: 10 columns × 24 rows (2 buffer rows hidden above visible 22)
Cell states: EMPTY, FILLED (with color), ICE, GARBAGE
Coordinate system: row 0 = top buffer, row 23 = bottom

Collision detection:
  For each cell in piece shape:
    If (row < 0 or row >= ROWS) → collision
    If (col < 0 or col >= COLS) → collision
    If board[row][col] != EMPTY → collision
```

### Piece System (7 Tetrominoes)
```
I-piece: cyan    ████
O-piece: yellow  ██
                 ██
T-piece: purple   █
                 ███
S-piece: green    ██
                 ██
Z-piece: red    ██
                 ██
L-piece: orange █
                ███
J-piece: blue     █
                ███

Rotation: SRS (Super Rotation System) with wall kick tables
Spawn: Row 0-1 (buffer), centered horizontally
7-bag randomizer: shuffle all 7 pieces, deal them, repeat
```

### Scoring System
```
Base points (before multipliers):
  Single line:    100
  Double:         300
  Triple:         500
  Tetris (4):     800

Multipliers:
  Level multiplier: 1.0 + (level - 1) × 0.15
  T-Spin bonus: 2.5× base
  Back-to-back bonus: 1.5× (consecutive Tetris or T-Spin clears)
  Combo multiplier: +50 per consecutive clear (resets on non-clear)

Drop points:
  Soft drop: +1 per cell
  Hard drop: +2 per cell dropped

Total = base × level_mult × tSpin_mult × b2b_mult + combo_bonus + drop_pts
```

### Level Progression System
```
Per-level system (not cumulative):
  Each level has a LINE GOAL (see table in Section 3)
  Track: tetLevelLinesCleared (resets on level-up)
  On level-up:
    1. tetLevel++
    2. tetLevelLinesCleared = 0
    3. Update gravity timer to new speed
    4. Play level-up celebration
    5. Spawn garbage rows (if level >= 31)
    6. Update HUD
```

---

## 7. Build Roadmap

### Phase 1: Core Board & Pieces ✅ (DONE)
- [x] 10×22 board with 2 buffer rows
- [x] 7 tetrominoes with all 4 rotation states
- [x] SRS wall kick tables
- [x] 7-bag randomizer
- [x] Collision detection
- [x] Piece spawn at top center
- [x] Basic gravity (auto-drop timer)
- [x] Lock piece into board

### Phase 2: Movement & Rotation Polish ✅ (MOSTLY DONE)
- [x] Touch gesture controls (tap/swipe)
- [x] Keyboard controls with DAS/ARR
- [x] Ghost piece preview
- [x] Hold piece system
- [x] T-Spin detection (3-corner rule)
- [ ] **TODO**: Input buffering (accept pre-spawn inputs)
- [ ] **TODO**: Counter-clockwise rotation (Z key)
- [ ] **TODO**: Smooth piece slide animation (CSS transition)

### Phase 3: Line Clear & Scoring ✅ (MOSTLY DONE)
- [x] Full row detection
- [x] Row removal + collapse
- [x] Base scoring (100/300/500/800)
- [x] T-Spin 2.5× bonus
- [x] Level multiplier
- [ ] **TODO**: Back-to-back bonus tracking
- [ ] **TODO**: Combo counter (consecutive clears)
- [ ] **TODO**: Cascading line clear animation (flash → shrink → collapse)

### Phase 4: Progression & Difficulty ✅ (DONE)
- [x] 100-level system with per-level goals
- [x] Gravity speed curve (1000ms → 35ms)
- [x] Garbage rows at Lv31+
- [x] Phase milestone toasts
- [x] Star rating on level completion

### Phase 5: Animation & Feedback 🔴 (PRIORITY — BIGGEST IMPACT)
- [ ] **Hard drop trail effect** (vertical streak from start to landing)
- [ ] **Line clear flash** (white flash → cell shrink → collapse)
- [ ] **Screen shake** on Tetris/combo
- [ ] **Score popup** floats up and fades
- [ ] **Level up celebration** (XP bar explode, text scale-up)
- [ ] **Game over curtain** (grey wash bottom-to-top)
- [ ] **Particle system** for clears and combos
- [ ] **Cell landing bounce** (squish on lock)

### Phase 6: UX & Menus ⚠️ (NEEDS WORK)
- [x] Level map with 100 levels
- [x] Tutorial overlay on first play
- [ ] **TODO**: Pause functionality
- [ ] **TODO**: Results screen with star display
- [ ] **TODO**: Smooth menu-to-game transition (fade, not slide)

### Phase 7: Balancing & Feel Tuning
- [ ] Playtest gravity curve at each level
- [ ] Tune DAS/ARR for mobile feel
- [ ] Tune lock delay per level
- [ ] Balance scoring to feel rewarding
- [ ] Adjust swipe thresholds based on user feedback

### Phase 8: Mobile Polish
- [ ] Haptic feedback on all key actions
- [ ] Touch area sizing (large enough for thumbs)
- [ ] Prevent accidental gestures
- [ ] Test on various screen sizes

---

## 8. Tuning Tables

### A. Gravity Progression
Already implemented — see Section 3 gravity table.

### B. Input Timings
| Parameter | Value | Notes |
|-----------|-------|-------|
| DAS (initial delay) | 170ms | Time before auto-repeat starts |
| ARR (repeat rate) | 50ms | Time between repeats |
| Tap threshold | 250ms / 15px | Max time and distance for "tap" |
| Swipe-down threshold | 30px | Min vertical distance for hard drop |
| Swipe direction ratio | 1.3× | Vertical must be 1.3× horizontal |
| Horizontal cell size | 28px | Pixels per column move |
| Long press | 350ms | Time to trigger hold |

### C. Lock Delay
| Level Range | Lock Delay | Max Resets |
|-------------|-----------|------------|
| 1-10 | 500ms | 15 |
| 11-20 | 450ms | 15 |
| 21-30 | 400ms | 12 |
| 31-50 | 350ms | 10 |
| 51-70 | 320ms | 8 |
| 71-100 | 300ms | 6 |

### D. Line Clear Timing
| Event | Duration | Notes |
|-------|----------|-------|
| Flash white | 50ms | Row highlights before clearing |
| Cell shrink | 150ms | Cells scale down to 0 |
| Row collapse | 100ms | Cells above slide down |
| Total clear time | ~300ms | Flash + shrink + collapse |
| Spawn delay after clear | 0ms | Next piece spawns immediately |

### E. Animation Durations
| Animation | Duration | Easing |
|-----------|----------|--------|
| Piece slide (1 cell) | 30ms | linear |
| Piece rotate | 60ms | ease-out |
| Cell lock bounce | 150ms | bounce |
| Score popup | 800ms | ease-out (float up + fade) |
| Level up text | 1200ms | scale up → hold → fade |
| Board shake | 150ms | ease-out (decay) |
| Game over curtain | 880ms | linear (40ms × 22 rows) |
| Menu transition | 250ms | ease-out |
| Hard drop trail | 200ms | ease-out (fade) |

### F. Combo Feedback Timing
| Combo Level | Text | Color | Sound Pitch | Screen Effect |
|-------------|------|-------|-------------|---------------|
| ×2 | "Combo ×2" | White | Base + 1 semitone | None |
| ×3 | "Combo ×3" | Yellow | Base + 3 semitones | Subtle glow |
| ×4 | "Combo ×4!" | Orange | Base + 5 semitones | Board pulse |
| ×5+ | "COMBO ×5!!" | Red | Base + 7 semitones | Screen shake + glow |

### G. Scoring Values
| Action | Points | Notes |
|--------|--------|-------|
| Single | 100 × level_mult | 1 line cleared |
| Double | 300 × level_mult | 2 lines at once |
| Triple | 500 × level_mult | 3 lines at once |
| Tetris | 800 × level_mult | 4 lines at once |
| T-Spin | base × 2.5 | When T-piece rotates into pocket |
| Soft drop | 1 per cell | Each cell of downward movement |
| Hard drop | 2 per cell | Each cell piece falls |
| Combo | +50 × combo_count | Per consecutive clear move |
| Back-to-back | 1.5× | Consecutive Tetris or T-Spin |
| level_mult | 1 + (lv-1) × 0.15 | Lv1=1.0, Lv10=2.35, Lv50=8.35 |

---

## 9. Pseudocode for Critical Systems

### A. Game Loop
```javascript
function gameLoop() {
  if (state !== PLAYING) return;

  processInput();       // Handle buffered inputs
  updateGravity();      // Move piece down if timer elapsed
  updateLockDelay();    // Check if piece should lock
  updateAnimations();   // Tick all active animations
  render();             // Draw board + piece + ghost + effects
}
// Run at 60fps via requestAnimationFrame or setInterval(16ms)
```

### B. Input System with DAS/ARR
```javascript
var dasTimer = null, arrInterval = null, dasKey = null;

function onKeyDown(key) {
  if (keyHeld[key]) return;  // Already held
  keyHeld[key] = true;

  // Execute immediately
  executeAction(key);

  // Start DAS timer
  clearDAS();
  dasKey = key;
  dasTimer = setTimeout(function() {
    // DAS triggered — start ARR
    arrInterval = setInterval(function() {
      executeAction(key);
    }, ARR_RATE);  // 50ms
  }, DAS_DELAY);   // 170ms
}

function onKeyUp(key) {
  delete keyHeld[key];
  if (key === dasKey) clearDAS();
}

function clearDAS() {
  clearTimeout(dasTimer);
  clearInterval(arrInterval);
  dasTimer = null; arrInterval = null; dasKey = null;
}
```

### C. Lock Delay with Reset
```javascript
var lockTimer = null, lockMoves = 0, locking = false;

function startLockDelay() {
  if (locking) return;
  locking = true;
  lockMoves = 0;
  lockTimer = setTimeout(doLock, getLockDelay(level));
}

function resetLockDelay() {
  if (!locking) return;
  if (lockMoves >= MAX_LOCK_RESETS) return;  // No more resets
  lockMoves++;
  clearTimeout(lockTimer);
  lockTimer = setTimeout(doLock, getLockDelay(level));
}

// Call resetLockDelay() after every successful move/rotate while on ground
```

### D. 7-Bag Randomizer
```javascript
var bag = [];
var PIECES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

function nextPiece() {
  if (bag.length === 0) {
    bag = PIECES.slice();
    // Fisher-Yates shuffle
    for (var i = bag.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = bag[i]; bag[i] = bag[j]; bag[j] = tmp;
    }
  }
  return bag.pop();
}
```

### E. Line Clear with Animation
```javascript
function clearLines() {
  var fullRows = findFullRows();
  if (!fullRows.length) { combo = 0; return; }

  combo++;
  var lines = fullRows.length;
  var score = calculateScore(lines, combo, tSpin, level);

  // Phase 1: Flash (50ms)
  fullRows.forEach(function(r) { highlightRow(r, 'white'); });

  setTimeout(function() {
    // Phase 2: Shrink cells (150ms)
    fullRows.forEach(function(r) { shrinkRow(r); });

    setTimeout(function() {
      // Phase 3: Remove rows and collapse
      removeRows(fullRows);
      collapseBoard();

      // Phase 4: Effects
      showScorePopup(score, lines);
      if (lines >= 4) screenShake(200);
      if (lines >= 2) spawnParticles(fullRows);

      // Check level up
      linesCleared += lines;
      if (linesCleared >= levelGoal) levelUp();

      // Spawn next piece
      spawnPiece();
    }, 150);
  }, 50);
}
```

### F. Ghost Piece Calculation
```javascript
function getGhostRow() {
  var shape = getCurrentShape();
  var ghostR = piece.row;
  while (!collides(shape, ghostR + 1, piece.col)) {
    ghostR++;
  }
  return ghostR;
}
// Call on every render frame — ghost is always accurate
```

---

## 10. Original Differentiation Ideas — "Tetris Path"

### Visual Direction
- **Neon glow aesthetic**: Dark board with glowing block edges (not flat colors)
- **Color scheme**: Deep purple/navy background with vibrant neon piece colors
- **Board border**: Animated gradient that shifts color with level phase
- **Particle system**: Small floating particles in background (subtle ambient motion)

### Progression Twist: "The Path"
- 100 levels arranged on a winding mountain path (level map)
- Every 10 levels = a new "zone" with distinct visual theme:
  - Lv1-10: Forest (green tones, leaf particles)
  - Lv11-20: Ocean (blue tones, wave effects)
  - Lv21-30: Desert (amber tones, sand particles)
  - Lv31-40: Ice (cyan tones, snowflake effects)
  - Lv41-50: Volcano (red tones, ember particles)
  - Lv51-60: Sky (light blue, cloud effects)
  - Lv61-70: Space (dark, star particles)
  - Lv71-80: Crystal (purple, prism effects)
  - Lv81-90: Shadow (dark tones, smoke effects)
  - Lv91-100: Gold (golden everything, premium feel)

### Special Mechanics (Unique to Tetris Path)
1. **Path Powers**: Earn a special power every 10 levels completed
   - Lv10: "Freeze" — pause gravity for 5 seconds
   - Lv20: "Shatter" — clear bottom 2 rows
   - Lv30: "Morph" — change current piece to any shape
   - Lv40: "Ghost Clear" — place a piece that clears itself + its row

2. **Star Challenges**: Each level has 3 stars with specific goals
   - ⭐ Complete the level
   - ⭐⭐ Complete with score above threshold
   - ⭐⭐⭐ Complete without using hold piece

3. **Daily Path Challenge**: Special level each day with unique constraints
   - Time limit
   - Pre-filled board
   - Limited piece selection

### Reward Loop
- Coins earned per level based on stars
- Coins unlock cosmetic block skins
- Streak bonus for consecutive daily plays
- Leaderboard per level (best score)

### Theme Direction
"A journey through 100 levels of increasing mastery. Each zone teaches a new skill. The path tests your limits. Can you reach the summit?"

---

## Summary

This document provides the complete blueprint for implementing Tetris Path as a polished, addictive falling-block mode. The key priorities for maximum impact are:

1. **Phase 5 (Animation & Feedback)** — This is where "good" becomes "great"
2. **Cascading line clear animation** — The single most impactful visual improvement
3. **Hard drop trail effect** — Makes the most satisfying action even better
4. **Score popup system** — Constant positive reinforcement
5. **Sound escalation** — Pitch rising with combos creates auditory momentum

The foundation (board, pieces, controls, scoring, progression) is already solid. The next step is **polish, polish, polish**.
