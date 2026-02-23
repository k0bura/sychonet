---
title: "GRiDCASE 1520 Restoration"
description: "Full restoration of a 1988 GRiD GRiDCASE 1520 286 laptop with gas plasma display"
date: 2026-02-22
---

A documentation project tracking the restoration of a GRiDCASE 1520 — a rugged 286-class laptop from 1988 built in a magnesium alloy case with a red gas plasma display. Originally designed for military and field use, these machines were built to survive things that would kill lesser hardware.

This restoration was built from parts across three separate GRiDCASE 1520 units. The first mainboard refused to recognise the CF adapter. The second had a Dallas CMOS/RTC chip replacement that later developed CMOS write errors. The third — an early revision with a separate RTC battery — turned out to be the one that worked. The case came from a dual-floppy configuration unit in excellent condition, the plasma screen from another donor. Frankenstein's laptop, assembled from the best organs of its fallen siblings.

## Machine Specifications

| Component | Original | Restored |
|-----------|----------|----------|
| **CPU** | 80C286 @ 10 MHz | — |
| **RAM** | 1 MB | — |
| **Hard Drive** | 20 MB 2.5" | StarTech 35BAYCF2IDE CF adapter + 32 MB CF card |
| **Display** | CGA red gas plasma | Replacement plasma panel (donor 1520) |
| **Floppy** | 3.5" 720K | Gotek USB floppy emulator |
| **RTC** | Dallas CMOS (dead) | New RTC battery (early revision board) |
| **BIOS** | GRiD/Phoenix 10/25/89 | Patched ROM via Dagwood's RomBuster |
| **Backplane** | Dual floppy | HDD + Floppy backplane |
| **Modem** | — | WiModem232 Pro |
| **OS** | — | Grid MS-DOS 3.2 |
| **Case** | Magnesium alloy | Dual-floppy config case |
| **Ports** | Serial, Parallel, Keyboard, Video Out, Phone Line, External Peripheral | — |

## Restoration Log

### 1. RTC Replacement

The Dallas CMOS/RTC module has a sealed internal battery that dies after ~10 years. These are potted modules — the battery is entombed in epoxy alongside the oscillator and SRAM. When the battery dies, the machine loses all BIOS settings on every power cycle. The second board sourced for this project had a replaced Dallas chip that later developed CMOS write errors. The solution was an early revision mainboard that uses a separate RTC battery — no potted module, no sealed fate.

**[Full RTC replacement documentation →](/projects/gridcase-1520-restoration/rtc/)**

### 2. Plasma Screen Swap

The red gas plasma display — that glow that makes every character look like it was written in fire. The original panel was defective, so a flawless replacement was pulled from a donor GRiDCASE 1520.

**[Full plasma screen swap documentation →](/projects/gridcase-1520-restoration/plasma/)**

### 3. Custom BIOS Burn

The stock GRiD/Phoenix BIOS has no support for non-standard hard drive geometries, and the Phoenix high-speed drive access routines don't play nice with CF adapters. A patched 10/25/89 BIOS ROM was burned using Dagwood's RomBuster program, adding support for any HDD geometry and fast access with CF cards. A critical fix was later applied — address `$9763` corrected to `$97DD` to avoid overwriting part of the Int 18h boot error handler.

**[Full custom BIOS burn documentation →](/projects/gridcase-1520-restoration/bios/)**

### 4. CF-to-IDE Adapter

A **StarTech 35BAYCF2IDE** IDE-to-CompactFlash adapter with a 32 MB CF card replaces the original hard drive. The HDD + Floppy backplane was used instead of the dual-floppy backplane, allowing direct access to the CF card. Dead silent, no moving parts, and the card can be swapped out on a modern machine for easy file transfers.

**[Full CF-IDE adapter documentation →](/projects/gridcase-1520-restoration/cf-ide/)**

### 5. Gotek Floppy Replacement

The original 720K 3.5" floppy drive is replaced with a Gotek USB floppy emulator. The backplane floppy connectors are positioned on top, which means the Gotek doesn't fit cleanly with the HDD backplane — a known quirk of this configuration.

**[Full Gotek floppy replacement documentation →](/projects/gridcase-1520-restoration/gotek/)**

## Beyond Restoration

### Building GRiDCASE ROMs

The GRiDCASE supports Flash EEPROM via an offboard AppROM adapter, opening up the possibility of custom firmware, boot ROMs, and diagnostic tools burned directly into the machine.

**[Full ROM building documentation →](/projects/gridcase-1520-restoration/roms/)**

---

## References

- [Reddit: Welcome to the Grid](https://www.reddit.com/r/retrobattlestations/comments/1e1sw42/welcome_to_the_grid/) — Original post on r/retrobattlestations
- [VCFed Forum: Finished restoring my GridCase 1520](https://forum.vcfed.org/index.php?threads/finished-restoring-my-gridcase-1520.1248950/) — Full restoration thread with discussion
- [Hacking the GRiDCASE 1520 and 1530 (ClassicBits.net)](https://classicbits.net/vintage-computing/grid/hacking-the-grid-gridcase-1520-and-1530/) — Technical reference for BIOS patching, CF card support, and ROM tools
- [GRiDCASE 1520 Information (ClassicBits.net)](https://classicbits.net/library/?opt=133&dev=1144&class1=Portable&desc=Grid_GridCase_1520) — Hardware specs and documentation
- [GridCase — Wikipedia](https://en.wikipedia.org/wiki/GridCase) — General history
