# Block Blitz — Asset Replacement Guide (1-by-1)

Replace each asset below. Current = what's in-game now. Needed = what to create.

---

## 1. APP ICON
| | Details |
|---|---|
| Current | No app icon exists |
| Needed | `Assets/app-icon-512.png` |
| Size | 512×512 PNG |
| Style | Block Blitz logo on dark gradient background, rounded corners |
| Used in | App stores, browser tab favicon |

---

## 2. UI ICONS (16 total)
All icons: **48×48 PNG, transparent background, flat style with subtle drop shadow**

| # | Name | Current (Emoji) | Filename | Where Used | Description |
|---|------|-----------------|----------|------------|-------------|
| 1 | Coin | 🪙 | `Icons/coin.png` | Top bar, shop, game over, rewards | Gold coin, shiny, front-facing |
| 2 | Star gem | ⭐ | `Icons/star.png` | Board (gold star cell), objectives | 5-pointed yellow star on gold block |
| 3 | Diamond gem | 🔶 | `Icons/diamond.png` | Board (penta cell), objectives | Orange diamond/pentagon shape |
| 4 | Bomb | 💣 | `Icons/bomb.png` | Power-up bar button, shop | Round black bomb with lit fuse |
| 5 | Row blast | ➡️ | `Icons/row-blast.png` | Power-up bar button, shop | Horizontal arrow with blast effect |
| 6 | Column blast | ⬇️ | `Icons/col-blast.png` | Power-up bar button, shop | Vertical arrow with blast effect |
| 7 | Undo | ↩️ | `Icons/undo.png` | Power-up bar button, shop | Curved arrow going back |
| 8 | Shuffle | 🔀 | `Icons/shuffle.png` | Tray shuffle button | Two crossing arrows |
| 9 | Lock | 🔒 | `Icons/lock.png` | Locked levels, locked items | Padlock, closed |
| 10 | Shopping cart | 🛒 | `Icons/cart.png` | Top bar shop button | Simple cart icon |
| 11 | Music on | 🎵 | `Icons/music-on.png` | Top bar music toggle (on state) | Music note |
| 12 | Music off | 🎵❌ | `Icons/music-off.png` | Top bar music toggle (off state) | Music note with X |
| 13 | Calendar | 📅 | `Icons/calendar.png` | Daily challenge button | Calendar page |
| 14 | Spin wheel | 🎰 | `Icons/spin.png` | Spin & Win button | Prize wheel or slot icon |
| 15 | Fire/streak | 🔥 | `Icons/fire.png` | Combo badge, streak display | Flame, orange-red |
| 16 | Trophy | 🏆 | `Icons/trophy.png` | Leaderboard, Blitz League | Gold trophy cup |
| 17 | Crown | 👑 | `Icons/crown.png` | Pro badge, premium items | Gold crown |

---

## 3. BLOCK PIECES (7 colors)
All blocks: **64×64 PNG, rounded corners (~12px radius), glossy 3D look with highlight shine on top 40%**

| # | Color | Hex | Filename | Visual Description |
|---|-------|-----|----------|-------------------|
| 1 | Red | #e53935 | `Blocks/red.png` | Bright red, white shine top-left, dark red shadow bottom |
| 2 | Blue | #1e88e5 | `Blocks/blue.png` | Medium blue, white shine top-left, navy shadow bottom |
| 3 | Purple | #ab47bc | `Blocks/purple.png` | Vibrant purple, white shine top-left, dark purple shadow |
| 4 | Cyan | #00acc1 | `Blocks/cyan.png` | Teal/cyan, white shine top-left, dark teal shadow |
| 5 | Green | #43a047 | `Blocks/green.png` | Forest green, white shine top-left, dark green shadow |
| 6 | Amber | #ff8f00 | `Blocks/amber.png` | Orange-amber, white shine top-left, dark orange shadow |
| 7 | Indigo | #5c6bc0 | `Blocks/indigo.png` | Blue-indigo, white shine top-left, dark indigo shadow |

**Current look (CSS-generated):**
```
Each block = solid color background
+ top 40% = linear-gradient white-to-transparent overlay (the "shine")
+ bottom = 4px darker color box-shadow (the "depth")
+ border-radius: 8px
```

---

## 4. SOUND EFFECTS (14 total)
All sounds: **OGG or WAV, 44.1kHz, mono or stereo, 1-3 seconds max**

| # | Sound | Filename | Duration | Current (Web Audio) | What to Create |
|---|-------|----------|----------|-------------------|----------------|
| 1 | Block pickup | `Sounds/pickup.ogg` | 0.3s | Bandpass noise burst at 3kHz | Soft "whoosh" or "swish" — airy, light |
| 2 | Block place | `Sounds/place.ogg` | 0.2s | 330Hz sine + 220Hz triangle + 165Hz sine | Satisfying "snap" or "click-thud" — like placing a wooden piece |
| 3 | Line clear (single) | `Sounds/clear-1.ogg` | 0.5s | Rising chord (261Hz base + chimes) | Bright ascending chime — "ding-sparkle" |
| 4 | Line clear (combo 2-3) | `Sounds/clear-2.ogg` | 0.7s | Higher pitched version + more chimes | Stronger chime cascade — more notes, more sparkle |
| 5 | Line clear (mega 4+) | `Sounds/clear-mega.ogg` | 1.0s | Highest pitch + sawtooth harmonics | Epic explosion + triumphant chord — glass shatter + brass |
| 6 | Gem collect | `Sounds/gem-collect.ogg` | 0.4s | 1568Hz→2093Hz→2637Hz sine cascade | Magical "ting-ting-ting" — crystalline, ascending |
| 7 | Stage/level win | `Sounds/stage-win.ogg` | 2.0s | 7-note ascending scale (C5→C7) | Victory fanfare — trumpet-like ascending phrase |
| 8 | Game over | `Sounds/game-over.ogg` | 1.5s | 440Hz→349Hz→277Hz descending + low sweep | Sad descending tones — like deflating, losing |
| 9 | Spin wheel tick | `Sounds/spin-tick.ogg` | 0.1s | 660Hz short sine burst | Quick mechanical "click" — like a roulette tick |
| 10 | Spin wheel win | `Sounds/spin-win.ogg` | 1.5s | Bell chimes 784Hz→1568Hz | Celebration bells — slot machine jackpot feel |
| 11 | Button tap | `Sounds/button-tap.ogg` | 0.1s | (not implemented yet) | Soft "pop" or "tap" — subtle, non-distracting |
| 12 | Streak lost | `Sounds/streak-lost.ogg` | 0.5s | (not implemented yet) | Sad "womp" — descending two notes |
| 13 | Danger warning | `Sounds/danger.ogg` | 1.0s | (not implemented yet) | Heartbeat pulse — "thump-thump", loopable |
| 14 | Blitz mode activate | `Sounds/blitz-activate.ogg` | 0.8s | (not implemented yet) | Power-up "whoooosh" with energy charge |

---

## 5. BACKGROUND MUSIC (4 tracks)
All music: **MP3 or OGG, 128-192kbps, seamlessly loopable, 60-90 seconds**

| # | Track | Filename | Current | Mood / Reference |
|---|-------|----------|---------|-----------------|
| 1 | Peaceful Garden | `Music/peaceful-garden.mp3` | Generative pentatonic piano + filtered wind noise | Gentle piano, birdsong, breeze — like Vita Mahjong menu music |
| 2 | Rainy Evening | `Music/rainy-evening.mp3` | Generative piano + bandpass rain noise | Soft rain on roof, distant low thunder, cozy — lo-fi study vibes |
| 3 | Ocean Calm | `Music/ocean-calm.mp3` | Generative piano + low-pass wave noise | Rolling waves, deep ambient drone — beach meditation |
| 4 | Starlit Night | `Music/starlit-night.mp3` | Generative piano + filtered wind | Minimal ambient drone, warm textures, no rhythm — pure calm |

**Reference style:** Vita Mahjong, Monument Valley, Alto's Odyssey ambient tracks

---

## 6. MASCOT — HAMSTER (Primary character, 6 sprites)
Size: **128×128 PNG, transparent background**
Style: **Cute, chibi, round body, big eyes, small limbs**

| # | Emotion | Filename | Current (SVG) | Visual Description |
|---|---------|----------|---------------|-------------------|
| 1 | Happy | `Mascots/Hamster/happy.png` | Round body, dot eyes, small smile | Gentle smile, soft eyes, content look |
| 2 | Excited | `Mascots/Hamster/excited.png` | Open mouth, wide eyes | Big open smile, sparkly eyes, bouncy pose |
| 3 | Amazed | `Mascots/Hamster/amazed.png` | Star eyes, O mouth | Star-shaped pupils, mouth wide open, "WOW!" |
| 4 | Celebrating | `Mascots/Hamster/celebrating.png` | Stars around, happy face | Arms up, confetti/stars around, huge grin |
| 5 | Shocked | `Mascots/Hamster/shocked.png` | Wide eyes, open mouth | Eyes popping, mouth open, "OH NO!" |
| 6 | Worried | `Mascots/Hamster/worried.png` | Sweat drop, frown | Brow furrowed, sweat drop, nervous look |

**Current hamster colors:**
- Body: #f5d0a9 (light tan)
- Belly: #fff3e0 (cream)
- Cheeks: #ffb6a3 (pink blush)
- Ears inner: #f8b0c0 (pink)

**Repeat this same format for all 22 animals** (same 6 emotions each)

---

## 7. BOARD SKINS (10 themes)
Per skin: **1 board background (512×512 tileable) + 1 empty cell texture (64×64)**

| # | Skin Name | Board BG Color | Cell Border | Filename Prefix | Vibe |
|---|-----------|---------------|-------------|-----------------|------|
| 1 | Pastel Dream | #1e0930 (dark purple) | #ffb6c1 (pink) | `BoardSkins/Pastel/` | Soft, dreamy, cotton candy |
| 2 | Ice Crystal | #021a25 (dark blue) | #64dcf0 (cyan) | `BoardSkins/Ice/` | Frozen, crystalline, winter |
| 3 | Sunset Blaze | #2a1000 (dark brown) | #ff7043 (orange) | `BoardSkins/Sunset/` | Warm, sunset glow, fire |
| 4 | Crystal Purple | #1e0a42 (deep purple) | #ce93d8 (violet) | `BoardSkins/Crystal/` | Mystical, amethyst cave |
| 5 | Golden Fortress | #251800 (dark gold) | #ffd700 (gold) | `BoardSkins/Gold/` | Royal, palace, treasure |
| 6 | Midnight Dark | #05051a (near black) | #5c6bc0 (indigo) | `BoardSkins/Midnight/` | Sleek, modern, dark mode |
| 7 | Galaxy | #10023a (space dark) | #7c4dff (neon purple) | `BoardSkins/Galaxy/` | Space, nebula, stars |
| 8 | Arctic White | #062535 (dark teal) | #80deea (light teal) | `BoardSkins/Arctic/` | Clean, icy, minimal |
| 9 | Obsidian Black | #111111 (pure dark) | #9e9e9e (grey) | `BoardSkins/Obsidian/` | Minimalist, sharp, sleek |
| 10 | Legendary Rainbow | #150835 (dark) | animated multicolor | `BoardSkins/Rainbow/` | Animated rainbow border glow |

Each skin folder needs:
- `board-bg.png` — 512×512, tileable subtle pattern/texture
- `cell-empty.png` — 64×64, empty cell with themed border/glow

---

## 8. COSMETIC ITEMS

### Hats (13 items) — 64×64 PNG, transparent bg, sits on top of mascot head
| # | Hat | Current | Filename | Cost |
|---|-----|---------|----------|------|
| 1 | Gamer | 🎮 | `Cosmetics/Hats/gamer.png` | Free |
| 2 | Cap | 🧢 | `Cosmetics/Hats/cap.png` | 100 coins |
| 3 | Top Hat | 🎩 | `Cosmetics/Hats/top-hat.png` | 150 coins |
| 4 | Cowboy | 🤠 | `Cosmetics/Hats/cowboy.png` | 150 coins |
| 5 | Santa | 🎅 | `Cosmetics/Hats/santa.png` | 200 coins |
| 6 | Halo | 😇 | `Cosmetics/Hats/halo.png` | 200 coins |
| 7 | Flower | 🌸 | `Cosmetics/Hats/flower.png` | 100 coins |
| 8 | Straw Hat | 👒 | `Cosmetics/Hats/straw-hat.png` | 150 coins |
| 9 | Rainbow | 🌈 | `Cosmetics/Hats/rainbow.png` | 250 coins |
| 10 | Crown | 👑 | `Cosmetics/Hats/crown.png` | World 5 |
| 11 | Grad Cap | 🎓 | `Cosmetics/Hats/grad-cap.png` | World 7 |
| 12 | Trophy | 🏆 | `Cosmetics/Hats/trophy.png` | World 9 |
| 13 | Party Hat | 🎊 | `Cosmetics/Hats/party-hat.png` | World 10 |

### Accessories (15 items) — 64×64 PNG, transparent bg, overlay on mascot
| # | Item | Current | Filename | Cost |
|---|------|---------|----------|------|
| 1 | Bow | 🎀 | `Cosmetics/Accessories/bow.png` | 80 coins |
| 2 | Music Note | 🎵 | `Cosmetics/Accessories/music-note.png` | 80 coins |
| 3 | Clover | 🍀 | `Cosmetics/Accessories/clover.png` | 100 coins |
| 4 | Gem | 💎 | `Cosmetics/Accessories/gem.png` | 120 coins |
| 5 | Magic Wand | 🪄 | `Cosmetics/Accessories/magic-wand.png` | 150 coins |
| 6 | Guitar | 🎸 | `Cosmetics/Accessories/guitar.png` | 150 coins |
| 7 | Balloon | 🎈 | `Cosmetics/Accessories/balloon.png` | 80 coins |
| 8 | Cool Shades | 🕶️ | `Cosmetics/Accessories/cool-shades.png` | 200 coins |
| 9 | Medal | 🏅 | `Cosmetics/Accessories/medal.png` | World 2 |
| 10 | Star | ⭐ | `Cosmetics/Accessories/star.png` | World 3 |
| 11 | Sword | ⚔️ | `Cosmetics/Accessories/sword.png` | World 4 |
| 12 | Butterfly | 🦋 | `Cosmetics/Accessories/butterfly.png` | World 5 |
| 13 | Lightning | ⚡ | `Cosmetics/Accessories/lightning.png` | World 6 |
| 14 | Fire | 🔥 | `Cosmetics/Accessories/fire.png` | World 8 |
| 15 | Rainbow | 🌈 | `Cosmetics/Accessories/rainbow.png` | World 10 |

### Outfits (14 items) — 64×64 PNG, transparent bg, worn on mascot body
| # | Item | Current | Filename | Cost |
|---|------|---------|----------|------|
| 1 | T-Shirt | 👕 | `Cosmetics/Outfits/t-shirt.png` | 100 coins |
| 2 | Dress | 👗 | `Cosmetics/Outfits/dress.png` | 120 coins |
| 3 | Sports Top | 🎽 | `Cosmetics/Outfits/sports-top.png` | 100 coins |
| 4 | Safety Vest | 🦺 | `Cosmetics/Outfits/safety-vest.png` | 80 coins |
| 5 | Coat | 🧥 | `Cosmetics/Outfits/coat.png` | 150 coins |
| 6 | Kimono | 👘 | `Cosmetics/Outfits/kimono.png` | 200 coins |
| 7 | Karate Gi | 🥋 | `Cosmetics/Outfits/karate-gi.png` | 150 coins |
| 8 | Lab Coat | 🥼 | `Cosmetics/Outfits/lab-coat.png` | 150 coins |
| 9 | Swimwear | 👙 | `Cosmetics/Outfits/swimwear.png` | 100 coins |
| 10 | Santa Suit | 🎅 | `Cosmetics/Outfits/santa-suit.png` | 250 coins |
| 11 | Shield | 🛡️ | `Cosmetics/Outfits/shield.png` | World 4 |
| 12 | Space Suit | 🚀 | `Cosmetics/Outfits/space-suit.png` | World 7 |
| 13 | Crystal Ball | 🔮 | `Cosmetics/Outfits/crystal-ball.png` | World 8 |
| 14 | Trophy | 🏆 | `Cosmetics/Outfits/trophy.png` | World 10 |

---

## REPLACEMENT PRIORITY ORDER

### Do These First (biggest visual impact):
1. ☐ `Icons/coin.png` — seen everywhere
2. ☐ `Icons/bomb.png` — power-up bar
3. ☐ `Icons/row-blast.png` — power-up bar
4. ☐ `Icons/col-blast.png` — power-up bar
5. ☐ `Icons/undo.png` — power-up bar
6. ☐ `Icons/shuffle.png` — tray button
7. ☐ `Icons/fire.png` — combos/streaks
8. ☐ `Icons/trophy.png` — leaderboard
9. ☐ `Blocks/red.png` through `Blocks/indigo.png` (7 blocks)
10. ☐ `Mascots/Hamster/happy.png` through `worried.png` (6 emotions)

### Do These Next (audio upgrade):
11. ☐ `Sounds/pickup.ogg`
12. ☐ `Sounds/place.ogg`
13. ☐ `Sounds/clear-1.ogg`
14. ☐ `Sounds/clear-2.ogg`
15. ☐ `Sounds/clear-mega.ogg`
16. ☐ `Music/peaceful-garden.mp3`

### Do These Later (content expansion):
17. ☐ Remaining mascot animals (21 × 6 = 126 sprites)
18. ☐ All cosmetic items (43 total)
19. ☐ Board skin textures (10 × 2 = 20 files)
20. ☐ Remaining sounds and music
