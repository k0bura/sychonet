---
title: "Sound Blaster AWE32"
description: "Creative Sound Blaster AWE32 CT3900 installation and configuration"
date: 2024-10-18
---

## Creative Sound Blaster AWE32 IDE/MKP CSP (CT3900)

The Compaq Portable 486c has no onboard audio, so one of the two EISA slots is used for a **Creative Sound Blaster AWE32 IDE/MKP CSP (CT3900)**. The AWE32 is one of the best ISA sound cards ever made — it provides Sound Blaster and AdLib compatibility for DOS games, a Yamaha OPL3 FM synthesizer (YMF262), and Creative's EMU8000 wavetable synthesizer with 512 KB of onboard sample RAM (expandable to 28 MB via SIMMs).

Pentium-class CPU, wavetable audio, DOOM at full speed — at some point this stopped being a restoration and started being the 486 gaming machine 12-year-old me always wanted.

The CT3900 variant includes an IDE interface and a CSP (Creative Signal Processor) socket, though neither is used in this build — the Compaq already has an IDE controller on the backplane.

### Why the CT3900

The CT3900 was chosen specifically because it is **not Plug and Play**. Later AWE32 and AWE64 revisions switched to ISA PnP, which requires a PnP-aware BIOS or software like Intel's ICU to assign resources. The Compaq Portable 486c's BIOS has no PnP support, so a PnP sound card would need extra configuration tools and drivers loaded before it works — and can still be unreliable under plain DOS.

The CT3900 uses **jumpers** to set IRQ, DMA, and I/O port addresses directly on the card. It works immediately at boot with no BIOS support, no TSRs, and no configuration utilities required. For a DOS gaming machine, this is the most reliable setup — the card is configured once with jumpers and just works every time.

![Sound Blaster AWE32 installed in the Compaq Portable 486c](../../../assets/images/compaq-486c/soundblaster/01-awe32-installed.jpg)

See [AWE32 Getting Started Guide (PDF)](/docs/compaq-486c/AWE32_Getting_Started.pdf) for the original Creative manual (v1.4, December 1996).

**TODO:** Add configuration details (IRQ, DMA, I/O port settings).
