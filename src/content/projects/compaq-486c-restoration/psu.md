---
title: "PSU Rebuild"
description: "Full recap and voltage verification of the original power supply"
date: 2024-10-18
---

## Overview

PSU worked but stank like leaking caps. Aging electrolytics dry out, lose capacitance, voltage droops, ripple gets worse, eventually it won't start. Without stable power nothing else matters. I can swap caps here and there but didn't trust myself to do the whole thing, so I sent it to [GiGaBiTe](https://forum.vcfed.org/index.php?members/gigabite.35162/) on VCFed.

## Recap

They pulled the board, replaced all electrolytic capacitors, the bridge rectifier, DPST power switch, and cooling fan. Cleaned off the electrolyte residue before installing new caps.

![PSU board removed and recapped on the workbench](../../../assets/images/compaq-486c/psu-rebuild/01-psu-board-recapped.jpg)

## Voltage Verification

Got the board back, tested with a multimeter before reconnecting to the motherboard.

**12V rail** -- 12.11V. **5V rail** -- 5.085V. Both well within spec. Rock stable.

![Multimeter reading 12.11V on the 12V rail](../../../assets/images/compaq-486c/psu-rebuild/02-12v-rail-test.jpg)
![Multimeter reading 5.085V on the 5V rail](../../../assets/images/compaq-486c/psu-rebuild/03-5v-rail-test.jpg)

## Reassembly

Back in the metal enclosure, ready for the case.

![Rebuilt PSU reassembled in its enclosure](../../../assets/images/compaq-486c/psu-rebuild/04-psu-reassembled.jpg)
