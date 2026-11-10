---
title: "Enhanced Options Slot Pinout"
description: "Complete 50-pin connector pinout for the Compaq Portable 486c Enhanced Options Slot, with 16C550 and ESP32 wiring"
date: 2025-02-16
---

## 50-Pin Connector Pinout

"Dir" is from the card's point of view. In means the system drives it. A trailing `-` means active low.

The first name is what the 486c manual calls the pin. The second is the LTE Lite guide's name, which is where the direction and function come from. See the [options slot reference](/projects/compaq-wifimodem/options-slot/) for why I trust the second column.

Pins are numbered odd and even across the two rows. 1 and 2 are side by side at one end, 49 and 50 at the other.

### Pins 1-25

| Pin | 486c name | LTE Lite name | Dir | Function |
|-----|-----------|---------------|-----|----------|
| 1 | Ground | GND | - | Ground |
| 2 | Data Bit 0 | DB00 | I/O | Data, low byte |
| 3 | Data Bit 1 | DB01 | I/O | |
| 4 | Data Bit 2 | DB02 | I/O | |
| 5 | Data Bit 3 | DB03 | I/O | |
| 6 | Data Bit 4 | DB04 | I/O | |
| 7 | Data Bit 5 | DB05 | I/O | |
| 8 | Data Bit 6 | DB06 | I/O | |
| 9 | Data Bit 7 | DB07 | I/O | |
| 10 | Select | SLOT CS- | In | System has decoded a valid I/O address |
| 11 | IOW | SIOWC- | In | I/O write strobe |
| 12 | IOR | SIORC- | In | I/O read strobe |
| 13 | IRQ | SLOT IRQA | Out | Interrupt, mapped to IRQ3 or IRQ4 |
| 14 | Bus Ready | BUSRDY- | Out | Pull low for wait states. Open collector, 2.5us max |
| 15 | +5V | +5 VDC | - | Power, 350mA total with pin 16 |
| 16 | +5V | +5 VDC | - | |
| 17 | RST | SLOT RST | In | Reset |
| 18 | XA08 | SA0 | In | Address bit 0 |
| 19 | Add 1 | SA1 | In | Address bit 1 |
| 20 | Add 2 | SA2 | In | Address bit 2 |
| 21 | Mclock | COMMCLK | In | 1.8432 MHz UART clock |
| 22 | Reserve 1 | Reserved | - | Not used |
| 23 | Reserve 2 | WAKEUP- | Out | Wakes the system from standby. Leave open |
| 24 | Slot-on | SLOT ON | In | Card low-power control |
| 25 | SPKDRV | MSPKDRV | Out | Audio to system speaker |

### Pins 26-50

| Pin | 486c name | LTE Lite name | Dir | Function |
|-----|-----------|---------------|-----|----------|
| 26 | Ground | GND | - | Ground |
| 27 | Ground | GND | - | Ground |
| 28 | DMA | DMA | In | High during a DMA cycle |
| 29 | Data Bit 15 | DB15 | I/O | Data, high byte (16-bit devices) |
| 30 | Data Bit 14 | DB14 | I/O | |
| 31 | Data Bit 13 | DB13 | I/O | |
| 32 | Data Bit 12 | DB12 | I/O | |
| 33 | Data Bit 11 | DB11 | I/O | |
| 34 | Data Bit 10 | DB10 | I/O | |
| 35 | Data Bit 9 | DB09 | I/O | |
| 36 | Data Bit 8 | DB08 | I/O | |
| 37 | Add 3 | SA3 | In | Address bit 3 |
| 38 | Add 4 | SA4 | In | Address bit 4 |
| 39 | Add 5 | SA5 | In | Address bit 5 |
| 40 | Add 6 | SA6 | In | Address bit 6 |
| 41 | Add 7 | SA7 | In | Address bit 7 |
| 42 | Add 8 | SA8 | In | Address bit 8 |
| 43 | Add 9 | SA9 | In | Address bit 9 |
| 44 | SLOT-DMA- | SLOT DMA- | Out | Card can do DMA. Open collector |
| 45 | T-C | T-C | In | DMA terminal count |
| 46 | SLOT-IRQB | SLOT IRQB | Out | Second interrupt: IRQ3, 4, 5, 7, or 9 |
| 47 | IO16 | I/O16- | Out | Card supports 16-bit transfers. Open collector |
| 48 | SLOT-DRQ | SLOT DRQ | Out | DMA request |
| 49 | SLOT-IOEN | SLOT IOEN- | Out | Card has a valid I/O address decode |
| 50 | SLOT-DAK | SLOT DAK | In | DMA acknowledge |

The scan of the 486c manual actually reads "SLOT-IR08", "SLOT-OMA-", "SLOT-ORO", "SLOT-OAK", and "1016" for pins 46, 44, 48, 50, and 47. That is OCR turning Q into 0 and D into O. The names above are the corrected ones.

## 16C550 Wiring

The UART runs at 5V and connects straight to the slot. No level shifters on the bus side.

| 16550 pin | Goes to | Notes |
|-----------|---------|-------|
| D0-D7 | Slot 2-9 | Direct |
| A0, A1, A2 | Slot 18, 19, 20 | |
| CS2- | Slot 10 (SLOT CS-) | If the system pre-decodes. Otherwise from my own decoder |
| CS0, CS1 | +5V | |
| RD- | Slot 12 (IOR-) | |
| WR- | Slot 11 (IOW-) | |
| RD, WR, ADS- | GND | Unused alternate strobes |
| MR | Slot 17 (SLOT RST) | Active high. Invert if the slot's reset turns out active low |
| XIN | Slot 21 (COMMCLK) | Fallback is a 1.8432 MHz oscillator on the card |
| BAUDOUT- | RCLK | Also to the ESP32, for baud tracking |
| INTRPT | Slot 13, through a 74HCT125 | Buffer enabled by OUT2-, same as every PC serial card |

Glue is one 74HCT125. One section gates the interrupt. One section drives IOEN- (pin 49) low whenever the card is selected.

If Select turns out not to be pre-decoded on the 486c, add a 74HCT688 comparing A3 through A9 against 0x2F8, qualified by pin 28 low.

## ESP32 Wiring

The ESP32 hangs off the UART's serial side. TTL levels, not inverted, idle high. Matches an ESP32 UART directly. No RS-232 transceiver anywhere.

Every signal going into the ESP32 passes through a 74AHC125 powered at 3.3V. Its inputs tolerate 5V and it outputs 3.3V. Signals going the other way need nothing. 3.3V is a valid high for the 16550's TTL inputs.

| Signal | ESP32 | Dir | Level shift |
|--------|-------|-----|-------------|
| SOUT | UART RX | In | 74AHC125 |
| SIN | UART TX | Out | None |
| RTS- | UART CTS | In | 74AHC125 |
| CTS- | UART RTS | Out | None |
| DTR- | GPIO | In | 74AHC125 |
| DCD- | GPIO | Out | None |
| RI- | GPIO | Out | None |
| BAUDOUT- | GPIO, pulse counter | In | 74AHC125 |

DSR- is tied low. 8 GPIOs total.

BAUDOUT- is 16 times whatever baud rate DOS programmed. The ESP32 counts it and sets its own UART to match. Tops out at 115200 with the 1.8432 MHz clock.

## Power

- Feed the dev board's 5V pin from slot pins 15 and 16.
- Take power and ground from the odd-numbered pins on the breakout (15, 1, 27). Their traces are twice as wide as the even ones.
- Bulk cap near the ESP32, 470uF or more. WiFi transmit bursts can exceed the slot's 350mA.
- Never plug USB into the dev board while it is powered from the slot. It backfeeds the Compaq's 5V rail.
