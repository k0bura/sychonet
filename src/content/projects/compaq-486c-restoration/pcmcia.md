---
title: "PCMCIA Expansion"
description: "SCM ISAC2PR10 ISA PCMCIA adapter with WiFi and CompactFlash"
date: 2026-02-21
---

## Overview

The SCM ISAC2PR10 (FCC ID: MBPSCM-SBI-C2P, also marketed as the SCM SwapBox SBI-C2P) is a 16-bit ISA card that adds two PCMCIA (PC Card) slots to desktop machines. Installing it in the Compaq Portable 486c opens up the wide ecosystem of 1990s PC Cards — network adapters, flash storage, modems, SCSI controllers, and more — all designed for laptops of the era.

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

This adapter uses the original **PCMCIA Release 2.x** standard with a **16-bit data bus** (Intel 82365SL-compatible via the Vadem VG-469). This is the earlier ISA-based PCMCIA interface — not the 32-bit CardBus (PCMCIA 5.0) that became common in mid-to-late '90s laptops. CardBus is PCI-based and supports up to 132 MB/s, while 16-bit PCMCIA tops out around 20 MB/s.

In practice, 16-bit PCMCIA is plenty for the peripherals used here — WiFi adapters, CF storage, network cards, and modems all work fine. The bandwidth limitation only matters for high-throughput 32-bit CardBus devices designed for later laptops. A 32-bit CardBus card physically cannot be inserted into a 16-bit slot due to a different keying notch.

## Installation

Just install it into the ISA slot!

## Driver Setup

DOS: Tricky because there were different releases supporting different hardware. Finally got this working: [SystemSoft CardSoft Version 3.1](https://archive.org/details/cardsoft-v-3-1) with hot swapping!

Windows 3.1: [SystemSoft CardSoft v3.1 & CardView for Windows 3.1](https://archive.org/details/simpletechnology_pcmcia21cardsocket_systemsoftcardsoftv31_cardview)

*Documentation in progress.*

## References

- [Vadem VG-469 Datasheet (MIT)](https://stuff.mit.edu/afs/sipb/contrib/doc/specs/ic/bridge/vg469dm.pdf)
- [eBay listing with photos](https://www.ebay.com/itm/256634331414)
