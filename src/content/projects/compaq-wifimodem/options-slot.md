---
title: "Enhanced Options Slot Reference"
description: "Signal reference for the Compaq Portable 486c's proprietary 50-pin Enhanced Options Slot, cross-checked against the LTE Lite technical guide"
date: 2025-02-16
---

## Overview

The Enhanced Options Slot is a proprietary 50-pin expansion connector on the Compaq Portable 486c's system I/O board. Separate from the two full-sized EISA slots. Designed for an internal modem or second serial port. Cards slide in from the rear and stand upright on the connector.

It is a subset of the ISA bus. 16-bit data, 10 address lines, two interrupt outputs, DMA, wait states, +5V only. It even hands the card a UART clock.

![Proprietary 50-pin connector on the Compaq system I/O board](../../../assets/images/compaq-486c/options-slot/01-connector.jpg)
![Connector side profile showing pin arrangement](../../../assets/images/compaq-486c/options-slot/02-connector-on-board.jpg)
![Connector slot on the system I/O board](../../../assets/images/compaq-486c/options-slot/03-connector-slot.jpg)

**[Full 50-pin pinout and wiring reference →](/projects/compaq-wifimodem/pinout/)**

## Where this information comes from

Two documents describe the slot.

- **Portable 486c Reference Guide**, Appendix D. Pin numbers and short names. Nothing else. The scan's OCR also confuses Q with 0 and D with O.
- **LTE Lite technical guide**, section 6.4. The same 50 pins with direction, polarity, and function, plus the system-side configuration registers.

The pin numbers in the two tables match signal for signal, so I am treating them as the same interface. That is an inference. It has not been verified on a 486c yet. The electrical numbers below (350mA, 2.5us, 20mA) are LTE Lite figures.

## Signal Descriptions

Directions are from the card's point of view. A trailing `-` means active low.

### Data Bus
- **D0-D7** (Pins 2-9): Low byte. All transfers for 8-bit devices.
- **D8-D15** (Pins 36-29): High byte, 16-bit devices only. Note the order runs backwards across the pins.

### Address Bus
- **A0** (Pin 18): The 486c manual calls this "XA08". It is address bit 0, not bit 8.
- **A1-A2** (Pins 19-20): "Add 1" and "Add 2" in the manual.
- **A3-A9** (Pins 37-43): "Add 3" through "Add 9".

Ten lines, A0 through A9. Enough to decode any standard ISA I/O port.

### Control Signals
- **SLOT CS-** (Pin 10, in): "Select" in the manual. Low when the system's slot logic has decoded a valid I/O address. On the LTE Lite the system generates this for COM1 or COM2. Whether the 486c does the same is still an open question.
- **IOW-** (Pin 11, in): I/O write strobe.
- **IOR-** (Pin 12, in): I/O read strobe.
- **BUSRDY-** (Pin 14, out): Pull low to stretch the bus cycle. Open collector, has to sink 20mA, no longer than 2.5us.
- **SLOT RST** (Pin 17, in): Reset. Also pulsed for 10ms when SLOT ON toggles.
- **I/O16-** (Pin 47, out): Card pulls low to say it does 16-bit transfers. Open collector.
- **SLOT IOEN-** (Pin 49, out): Card pulls low to say it has a valid I/O address decode.

### Interrupts
- **SLOT IRQA** (Pin 13, out): The main interrupt. System maps it to IRQ3 or IRQ4.
- **SLOT IRQB** (Pin 46, out): Second interrupt for programmable-address devices. IRQ3, 4, 5, 7, or 9. The 486c scan reads "SLOT-IR08", which is OCR damage, not IRQ8.

### DMA Signals
- **DMA** (Pin 28, in): High while a DMA cycle is in progress. Does the job of ISA's AEN.
- **SLOT DMA-** (Pin 44, out): Card says it can do DMA. Open collector.
- **T-C** (Pin 45, in): Terminal count.
- **SLOT DRQ** (Pin 48, out): DMA request. DRQ1, 3, or 5.
- **SLOT DAK** (Pin 50, in): DMA acknowledge.

### Power and Ground
- **+5V** (Pins 15, 16): 350mA total across both pins.
- **Ground** (Pins 1, 26, 27).

No 12V, no negative rails.

### Miscellaneous
- **COMMCLK** (Pin 21, in): "Mclock" in the manual. 1.8432 MHz, 50% duty. The standard UART clock, supplied by the system. Stops in standby. The 486c system I/O board has a 1.8432 MHz oscillator on it, so this is probably live on the 486c too.
- **Reserved** (Pin 22): Not used.
- **WAKEUP-** (Pin 23, out): "Reserve 2" in the 486c manual. On the LTE Lite, low brings the system out of standby. Leaving it unconnected.
- **SLOT ON** (Pin 24, in): System tells the card to power down or sleep.
- **MSPKDRV** (Pin 25, out): Audio to the system speaker. 5V RMS max into 10K.

## Pin numbering

Odd and even pins sit across from each other. Pins 1 and 2 side by side at one end, 49 and 50 at the other. That comes from the silkscreen on the original modem, which labels both of its connectors that way.

## System-side configuration

On the LTE Lite the slot's address decode and interrupt routing are set through I/O-mapped registers, and the system generates the chip select.

| Register | Address | What it does for the slot |
|----------|---------|---------------------------|
| Peripheral Configuration | 0465h | COM1 or COM2 decode, decode enable, IRQA to IRQ3 or IRQ4 |
| Option Slot Configuration | 2865h | Decode range (8, 16, 32, or 64 bytes), IRQB and DMA mapping |
| Option Slot Address Decode | 2C65h | Programmable base address |
| Miscellaneous Options | 3465h | Bit 2 is SLOT ON |

No idea yet whether the 486c has the same registers. Its manual only talks about assigning COM1 or COM2 through the EISA Configuration Utility.

## Configuration on the 486c

Options installed in the slot are configured using the **COMPAQ EISA Configuration Utility**:

- **Method 1 (Manual):** If no .CFG file exists for the board, manually set switches/jumpers based on available system resources (IRQ, port addresses) shown in the utility.
- **Method 2 (Generic Config File):** Use a generic ISA adapter definition in the EISA Configuration Utility, then manually edit port address and IRQ resources and lock the board.

A modem configured at COM1 requires IRQ4 and port addresses 3F8-3FF. COM2 requires IRQ3 and port addresses 2F8-2FF.

Worth noting: the original Compaq modem has no jumpers or switches on it at all. So "set the jumpers on the modem" is generic manual text, and the card is not picking its own COM port.

## What the diagnostics say

The LTE Lite guide's error code table tests the internal modem as a plain UART. DLAB bit, THRE bit, Data Ready bit, TX/RX buffer, interrupt on COM1 or COM2, control signals. So whatever is on the card, the host expects an ordinary 16450/16550 register set at a COM port address.

## References

- [Compaq Portable 486c Reference Guide (PDF)](/docs/compaq-wifimodem/Compaq_Portable_486C_Reference_Guide.pdf)
- [Compaq LTE Lite Expansion Options (PDF)](/docs/compaq-wifimodem/Compaq_LTE_Lite_Expansion_Options.pdf)

*Pin names from the Compaq Portable 486c Reference Guide, Part Number 128984-001, November 1991. Directions, functions, and registers from the Compaq LTE Lite guide, section 6.4.*
