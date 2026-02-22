---
title: "CPU Upgrade: Am5x86-P75"
description: "Upgrading from IBM Blue Lightning DX2-66 to AMD Am5x86-P75 at 133 MHz"
date: 2026-02-21
---

## Original CPU — IBM Blue Lightning DX2

The Compaq Portable 486c I had came with an **IBM Blue Lightning DX2** (486-V266GA) processor. This is a clock-doubled 486-class CPU running at 66 MHz (33 MHz bus, 2x multiplier). This Compaq wasn't branded as the 66 MHz model, so it must have been upgraded at some point. The Blue Lightning was IBM's own take on the 486 architecture — it uses a write-back 16 KB internal cache and is pin-compatible with the Intel 486DX2-66.

![Original IBM Blue Lightning DX2 on the Compaq motherboard](/images/compaq-486c/cpu-upgrade/01-original-cpu.jpg)

## Upgrade — AMD Am5x86-P75 (AMD-X5-133ADZ)

The Am5x86 is a drop-in Socket 3 upgrade that delivers Pentium-75 equivalent performance (hence the "P75" marketing name) while remaining fully compatible with 486 motherboards. It runs at 133 MHz using a 4x internal clock multiplier on a 33 MHz bus, features a 16 KB write-back L1 cache, and draws only ~3W. See [AM5x86 Datasheet (PDF)](/docs/compaq-486c/AM5x86_Datasheet.pdf).

![AMD Am5x86-P75 ADZ variant](/images/compaq-486c/cpu-upgrade/02-am5x86-adz.jpg)

### Why the ADZ Variant

The Am5x86 came in several variants, all running at 133 MHz but with different maximum case temperature ratings:

| Variant | Part Number | Max Case Temp | Notes |
|---------|-------------|---------------|-------|
| **ADW** | AMD-X5-133ADW | 55° C | Earliest production, requires active cooling |
| **ADY** | AMD-X5-133ADY | 75° C | Mid-range thermal rating, rare |
| **ADZ** | AMD-X5-133ADZ | 85° C | Later production, preferred for compact builds |

The **ADZ is the right choice for the Compaq Portable 486c** because the compact luggable case has very limited airflow and no room for a CPU fan — only a heatsink will fit. The ADW's 55°C limit could easily be exceeded in this enclosure, while the ADZ's 85°C rating provides comfortable thermal headroom for passive cooling.

You can see the difference on the chips themselves — the ADW is stamped "HEATSINK AND FAN REQD" while the ADZ has no such warning:

![AMD Am5x86-P75 ADW variant — note "HEATSINK AND FAN REQD"](/images/compaq-486c/cpu-upgrade/03-am5x86-adw.jpg)

The temperature suffix also hints at the chip's true capability. Enthusiasts found that the suffix corresponds to the speed the chip was actually designed to support:

| Suffix | Marketed Speed | Actual Capability |
|--------|---------------|-------------------|
| ADW | 133 MHz (33 x 4) | 133 MHz |
| ADY | 133 MHz | 150 MHz (50 x 3) |
| ADZ | 133 MHz | 160 MHz (40 x 4) |

AMD never officially released a 160 MHz part because they felt it would cannibalize sales of their upcoming Pentium-class K5 (a.k.a. 5K86) processor. The K5 ended up being a total flop, and most people who bought the ADZ "133 MHz" ran it at 160 MHz anyway.

![AMD Am5x86-P75 ADZ installed on the Compaq Portable 486c motherboard](/images/compaq-486c/cpu-upgrade/04-am5x86-installed.jpg)

### Enabling the 4x Multiplier — CLKMUL Pin R17

Socket 3 was designed for 486-class processors that only supported 2x and 3x clock multipliers. AMD cleverly engineered the Am5x86 to reinterpret the 2x multiplier setting as 4x internally. The multiplier is controlled by the **CLKMUL pin** at position **R-17** on the 168-pin PGA package:

| CLKMUL (R17) State | Multiplier |
|---------------------|-----------|
| High (Vcc) or floating | 3x (99 MHz on 33 MHz bus) |
| Low (Vss / ground) | 4x (133 MHz on 33 MHz bus) |

On motherboards with a clock multiplier jumper, you simply set it to "2x" — the board grounds pin R17, and the Am5x86 internally quadruples the clock instead. **The Compaq Portable 486c has no multiplier jumper**, so the CLKMUL pin floats and the CPU defaults to 3x (99 MHz) — noticeably slower than its full 133 MHz.

The fix is to **manually ground pin R17** on the CPU. I soldered a thin wire from pin R17 to a nearby Vss (ground) pin directly on the chip. Without this mod, the CPU will boot and run but only at 99 MHz.

**TODO:** Add photo of the R17 pin ground mod.
