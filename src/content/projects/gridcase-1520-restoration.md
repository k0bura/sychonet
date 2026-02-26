---
title: "GRiDCASE 1520 Restoration"
description: "Full restoration of a 1988 GRiD GRiDCASE 1520 286 laptop with gas plasma display"
date: 2024-07-12
---

![GRiDCASE 1520 with GRiD splash screen on plasma display](../../assets/images/gridcase-1520/finished/04-grid-splash.jpg)

GRiDCASE 1520. Rugged 286 from 1988, magnesium alloy case, red gas plasma display. Designed for military and field use -- built to survive things that would kill lesser hardware.

Built mine from parts across three separate 1520 units. First mainboard refused to see the CF adapter. Second had a Dallas CMOS/RTC replacement that developed write errors. Third -- early revision with a separate RTC battery -- was the one that worked. Case from a dual-floppy unit in great condition, plasma screen from another donor. Frankenstein's laptop, best organs of its fallen siblings.

## Machine Specifications

| Component | Original | Restored |
|-----------|----------|----------|
| **CPU** | 80C286 @ 10 MHz | -- |
| **RAM** | 1 MB | -- |
| **Hard Drive** | 20 MB 2.5" | StarTech 35BAYCF2IDE CF adapter + 32 MB CF card |
| **Display** | CGA red gas plasma | Replacement plasma panel (donor 1520) |
| **Floppy** | 3.5" 720K | Gotek USB floppy emulator |
| **RTC** | Dallas CMOS (dead) | New RTC battery (early revision board) |
| **BIOS** | GRiD/Phoenix 10/25/89 | Patched ROM via Dagwood's RomBuster |
| **Backplane** | Dual floppy | HDD + Floppy backplane |
| **Modem** | -- | WiModem232 Pro |
| **OS** | -- | Grid MS-DOS 3.2 |
| **Case** | Magnesium alloy | Dual-floppy config case |
| **Ports** | Serial, Parallel, Keyboard, Video Out, Phone Line, External Peripheral | -- |

## Restoration Log

### 1. RTC Replacement

Dallas CMOS/RTC module has a sealed battery that dies after ~10 years. Potted in epoxy alongside the oscillator and SRAM. Battery dies, machine loses BIOS settings every power cycle. My second board had a replaced Dallas chip that developed write errors. Found an early revision mainboard with a separate RTC battery. No potted module, no sealed fate.

**[Full RTC replacement documentation →](/projects/gridcase-1520-restoration/rtc/)**

### 2. Plasma Screen Swap

Red gas plasma display. That glow that makes every character look like it was written in fire. My original panel wasn't  defective, but showed some dim spots. I pulled a flawless replacement from a donor 1520.

**[Full plasma screen swap documentation →](/projects/gridcase-1520-restoration/plasma/)**

### 3. Custom BIOS Burn

Stock GRiD/Phoenix BIOS doesn't support non-standard drive geometries, and the Phoenix high-speed routines don't play nice with CF adapters. Burned a patched 10/25/89 ROM using Dagwood's RomBuster. Adds support for any HDD geometry and fast CF access. Had to apply a critical fix too -- address `$9763` corrected to `$97DD` to avoid clobbering part of the Int 18h boot error handler.

**[Full custom BIOS burn documentation →](/projects/gridcase-1520-restoration/bios/)**

### 4. CF-to-IDE Adapter

Swapped the original hard drive for a **StarTech 35BAYCF2IDE** CF adapter with a 32 MB card. Used the HDD + Floppy backplane instead of dual-floppy. Dead silent, no moving parts, and I can pull the card and read it on a modern machine for file transfers.

**[Full CF-IDE adapter documentation →](/projects/gridcase-1520-restoration/cf-ide/)**

### 5. Gotek Floppy Replacement

Replaced the 720K floppy with a Gotek USB floppy emulator. Backplane floppy connectors sit on top, so the Gotek doesn't fit cleanly with the HDD backplane. Known quirk. Just had to live with it.

**[Full Gotek floppy replacement documentation →](/projects/gridcase-1520-restoration/gotek/)**

## Beyond Restoration

### Building GRiDCASE ROMs

GRiDCASE supports swapping in roms. boot ROMs, diagnostic tools -- burned directly into the machine. Been experimenting with building my own.

**[Full ROM building documentation →](/projects/gridcase-1520-restoration/roms/)**

---

**[▒▒▒ VIEW FINISHED PHOTOS →](/gallery/#gridcase-1520)**

---

## References

- [Reddit: Welcome to the Grid](https://www.reddit.com/r/retrobattlestations/comments/1e1sw42/welcome_to_the_grid/) -- Original post on r/retrobattlestations
- [VCFed Forum: Finished restoring my GridCase 1520](https://forum.vcfed.org/index.php?threads/finished-restoring-my-gridcase-1520.1248950/) -- Full restoration thread with discussion
- [Hacking the GRiDCASE 1520 and 1530 (ClassicBits.net)](https://classicbits.net/vintage-computing/grid/hacking-the-grid-gridcase-1520-and-1530/) -- Technical reference for BIOS patching, CF card support, and ROM tools
- [GRiDCASE 1520 Information (ClassicBits.net)](https://classicbits.net/library/?opt=133&dev=1144&class1=Portable&desc=Grid_GridCase_1520) -- Hardware specs and documentation
- [GridCase -- Wikipedia](https://en.wikipedia.org/wiki/GridCase) -- General history
