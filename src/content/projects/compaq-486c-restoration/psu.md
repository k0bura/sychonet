---
title: "PSU Rebuild"
description: "Full recap and voltage verification of the original power supply"
date: 2024-10-18
---

## Overview

The original power supply in the Compaq Portable 486c is a common failure point. Aging electrolytic capacitors dry out and lose capacitance, leading to voltage droop, ripple, and eventually failure to start. A full recap restores the PSU to reliable operation.

## Recap

The PSU board was removed from its enclosure and all electrolytic capacitors were replaced. The board was cleaned of any electrolyte residue before installing the new caps.

![PSU board removed and recapped on the workbench](../../../assets/images/compaq-486c/psu-rebuild/01-psu-board-recapped.jpg)

## Voltage Verification

After recapping, the PSU was tested with a multimeter to verify clean output on all rails before reconnecting to the motherboard.

**12V rail** — Reading 12.11V, and **5V rail** — Reading 5.085V, well within spec.

![Multimeter reading 12.11V on the 12V rail](../../../assets/images/compaq-486c/psu-rebuild/02-12v-rail-test.jpg)
![Multimeter reading 5.085V on the 5V rail](../../../assets/images/compaq-486c/psu-rebuild/03-5v-rail-test.jpg)

## Reassembly

The rebuilt PSU board reinstalled in its metal enclosure, ready to go back into the case.

![Rebuilt PSU reassembled in its enclosure](../../../assets/images/compaq-486c/psu-rebuild/04-psu-reassembled.jpg)
