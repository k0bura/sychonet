---
title: "PCMCIA Expansion"
description: "SCM ISAC2PR10 ISA PCMCIA adapter with WiFi and CompactFlash"
date: 2024-10-18
---

## Overview

SCM ISAC2PR10 (FCC ID: MBPSCM-SBI-C2P, also sold as the SCM SwapBox SBI-C2P). 16-bit ISA card, adds two PCMCIA slots. Threw one in my Compaq to get access to the whole ecosystem of 1990s PC Cards -- WiFi, flash storage, modems, SCSI, you name it. Nobody said a 25-pound luggable couldn't crash the laptop party.

## Card Specifications

| Attribute | Details |
|-----------|---------|
| **Part Number** | ISAC2PR10 |
| **FCC ID** | MBPSCM-SBI-C2P |
| **Manufacturer** | SCM Microsystems (Identive) |
| **Controller chipset** | Vadem VG-469 |
| **Bus interface** | 16-bit ISA |
| **PCMCIA slots** | 2× (dual) |
| **Voltage** | 3.3 V / 5 V per socket (independent) |
| **IRQs** | 10 ISA IRQs |
| **Memory windows** | 5 mappable per socket |
| **I/O windows** | 2 per socket |
| **Intel compatibility** | Register-compatible with Intel 82365SL |
| **Plug and Play** | ISA PnP v1.0a (with EEPROM support) |
| **Hot-swap** | Hot insertion/removal supported |
| **OS support** | DOS (CardSoft/CardWare), Windows 3.1, Windows 9x |
| **PCMCIA standard** | PCMCIA Release 2.x / PC Card Standard / ExCA |

## 16-Bit PCMCIA vs 32-Bit CardBus

Uses **PCMCIA Release 2.x** with a **16-bit data bus** (Vadem VG-469, Intel 82365SL-compatible). Not 32-bit CardBus (PCMCIA 5.0) -- that's PCI-based, up to 132 MB/s. 16-bit tops out at ~20 MB/s.

Plenty for what I'm doing. WiFi, CF storage, network cards, modems -- all fine. Bandwidth only matters for 32-bit CardBus devices, and those physically won't fit anyway (different keying notch).

## Installation

Just install it into the ISA slot!

## Driver Setup

DOS was tricky because there were different CardSoft releases supporting different hardware. I went through a few dead ends before I finally got this working: [SystemSoft CardSoft Version 3.1](https://archive.org/details/cardsoft-v-3-1) -- hot swapping and everything!

Windows 3.1: [SystemSoft CardSoft v3.1 & CardView for Windows 3.1](https://archive.org/details/simpletechnology_pcmcia21cardsocket_systemsoftcardsoftv31_cardview)

*Documentation in progress.*

## References

- [Vadem VG-469 Datasheet (MIT)](https://stuff.mit.edu/afs/sipb/contrib/doc/specs/ic/bridge/vg469dm.pdf)
- [eBay listing with photos](https://www.ebay.com/itm/256634331414)
