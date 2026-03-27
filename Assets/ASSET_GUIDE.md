# Block Blitz — Asset Creation Guide

## Folder Structure
```
Assets/
  Title_logo.png          (exists)
  Bb_background1.png      (exists)
  app-icon-512.png        (NEEDED - 512x512)

  Icons/                  (48x48 PNG, transparent bg)
    coin.png
    star.png
    diamond.png
    bomb.png
    row-blast.png
    col-blast.png
    undo.png
    shuffle.png
    lock.png
    cart.png
    music-on.png
    music-off.png
    calendar.png
    spin.png
    fire.png
    trophy.png
    crown.png

  Sounds/                 (WAV or OGG, 1-3 seconds)
    pickup.ogg            - soft swish when dragging block
    place.ogg             - satisfying snap/thud on placement
    clear-1.ogg           - bright chime for single line
    clear-2.ogg           - escalating chimes for 2 lines
    clear-mega.ogg        - explosive crescendo for 4+ lines
    gem-collect.ogg       - sparkle ding
    stage-win.ogg         - victory fanfare (2-3 sec)
    game-over.ogg         - sad descending tone
    spin-tick.ogg         - click tick per wheel slot
    spin-win.ogg          - celebration bells
    button-tap.ogg        - soft UI click
    streak-lost.ogg       - sad tone
    danger.ogg            - heartbeat/tension loop
    blitz-activate.ogg    - power-up whoosh

  Music/                  (MP3 or OGG, 60-90 sec, seamlessly loopable)
    peaceful-garden.mp3   - calm, birds, breeze, piano
    rainy-evening.mp3     - cozy rain, soft thunder
    ocean-calm.mp3        - waves, deep ambient drone
    starlit-night.mp3     - minimal, meditative, ethereal

  Mascots/
    Hamster/              (128x128 PNG, transparent bg)
      happy.png
      excited.png
      amazed.png
      celebrating.png
      shocked.png
      worried.png
    Cat/
      happy.png ... (same 6 emotions)
    Dog/
      happy.png ... (same 6 emotions)
    (... same for all 22 animals)

  Cosmetics/
    Hats/                 (64x64 PNG, transparent bg)
      gamer.png
      cap.png
      top-hat.png
      cowboy.png
      santa.png
      halo.png
      flower.png
      straw-hat.png
      rainbow.png
      crown.png
      grad-cap.png
      trophy.png
      party-hat.png

    Accessories/          (64x64 PNG, transparent bg)
      bow.png
      music-note.png
      clover.png
      gem.png
      magic-wand.png
      guitar.png
      balloon.png
      cool-shades.png
      medal.png
      star.png
      sword.png
      butterfly.png
      lightning.png
      fire.png
      rainbow.png

    Outfits/              (64x64 PNG, transparent bg)
      t-shirt.png
      dress.png
      sports-top.png
      safety-vest.png
      coat.png
      kimono.png
      karate-gi.png
      lab-coat.png
      swimwear.png
      santa-suit.png
      shield.png
      space-suit.png
      crystal-ball.png
      trophy.png

  Blocks/                 (64x64 PNG, rounded corners, glossy 3D look)
    red.png               - #e53935
    blue.png              - #1e88e5
    purple.png            - #ab47bc
    cyan.png              - #00acc1
    green.png             - #43a047
    amber.png             - #ff8f00
    indigo.png            - #5c6bc0

  BoardSkins/
    Pastel/               (board bg tile + 7 block variants)
      board-bg.png        - 512x512 tileable background
      cell-empty.png      - 64x64 empty cell look
    Ice/
      board-bg.png
      cell-empty.png
    (... same for all 10 skins)
```

---

## Design Specifications

### Color Palette (Block Colors)
| Color   | Hex     | Use         |
|---------|---------|-------------|
| Red     | #e53935 | Block piece |
| Blue    | #1e88e5 | Block piece |
| Purple  | #ab47bc | Block piece |
| Cyan    | #00acc1 | Block piece |
| Green   | #43a047 | Block piece |
| Amber   | #ff8f00 | Block piece |
| Indigo  | #5c6bc0 | Block piece |

### UI Color Palette
| Element      | Hex     |
|-------------|---------|
| Background  | #0a1628 |
| Board dark  | #0d1a40 |
| Gold/coin   | #ffd700 |
| XP cyan     | #00e5ff |
| Danger red  | #ff1744 |
| Success     | #00e676 |

### Typography
- Titles: **Fredoka One** (bold, rounded)
- Body: **Nunito** (700, 800, 900 weights)

### Style Guide
- Blocks: Glossy 3D look with highlight shine on top 40%
- Icons: Flat design with subtle shadow, vibrant colors
- Mascots: Cute, round, chibi-style with big eyes
- Board: Dark space/night theme as base

---

## Priority Checklist

### Phase 1 (Launch Critical)
- [ ] App icon (512x512)
- [ ] 16 UI icons
- [ ] 14 sound effects
- [ ] 4 music tracks

### Phase 2 (Visual Polish)
- [ ] Hamster mascot (6 emotions)
- [ ] 7 block textures
- [ ] Default board skin

### Phase 3 (Content Expansion)
- [ ] Remaining 21 mascots (126 sprites)
- [ ] 43 cosmetic items
- [ ] 10 board skin sets (80 textures)

---

## Recommended Tools
- **Mascots/Icons**: Midjourney, DALL-E, or Procreate
- **Sound Effects**: freesound.org, Pixabay Sounds, or BFXR
- **Music**: Suno.ai, Pixabay Music, or Epidemic Sound
- **Block Textures**: Figma or Photoshop with bevel/emboss
