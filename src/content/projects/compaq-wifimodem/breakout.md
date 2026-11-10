---
title: "Options Slot Breakout Board"
description: "A two-layer breakout that carries the original Compaq 50-pin 1.27mm connector and fans it out to a labeled 0.1 inch header"
date: 2026-11-09
---

![Breakout board, top side, rendered from the KiCad file](../../../assets/images/compaq-wifimodem/07-breakout-render.png)

The slot connector is 1.27mm pitch and keyed. I have exactly one mating connector, pulled off an original modem. I can't hand-wire it. I tried.

![The hand-wiring attempt on a 1.27mm proto board](../../../assets/images/compaq-wifimodem/02-prototype-board.jpg)

So it gets its own board. Designed, checked, and ordered from OSH Park. Waiting on it.

## What it is

- 70.4 x 32.5mm, two layers, no vias. Three boards on order from OSH Park.
- Original Compaq receptacle on the bottom edge. 2x25 through-hole on a 1.27mm square grid, nearest row 2.55mm from the edge, body on the bottom side. Same as it sat on the modem.
- 2x25 0.1" header along the top. Every pin labeled with its number and signal name. Header pin N is slot pin N.
- Stands upright on the slot header, like the modem did.

## Why off-the-shelf didn't work

There are little fan-out adapters that take a 1.27mm socket to 0.1" pins. Right idea. Two problems. Nobody seems to make a 2x25. And the socket on those is a generic one soldered straddling the board edge. The Compaq header is keyed, so a generic socket doesn't seat. It has to be the original connector, and the original is a right-angle through-hole part.

## The routing problem

This was more interesting than I expected.

Two rows of pads, 1.27mm apart, 1.0mm pads. That leaves 0.27mm between pads. A trace can't legally pass through that. Not at any width a cheap fab will make with a proper annular ring around the hole.

The odd row is fine. It faces the rest of the board, so its traces just leave.

The even row is boxed in. Odd row on one side, board edge 2.55mm away on the other. The only ways out are the two ends of the connector.

![Both copper layers. Odd pins in red fan straight out. Even pins take the long way around.](../../../assets/images/compaq-wifimodem/08-breakout-copper.png)

So the even pins leave downward, into the 2mm strip between the pads and the board edge. Run sideways along that strip past the end of the connector. Up the side of the board. Over the top of the header. Then drop onto the header pins from above.

Half go left, half go right, split across both layers. Seven traces is the most that fit in the strip on one layer. Within each group the pin nearest the exit takes the lane nearest the pads, which keeps everything nested and nothing crosses. No vias anywhere.

The cost is that those even-pin traces are thin. 0.12mm with 0.115mm gaps, because that is what fits. And some are long. Pin 28 goes 106mm to cover about 25mm in a straight line. Fine for ISA-speed signals. Not fine for power, so power and ground come off the odd pins (15, 1, 27), which get 0.25mm traces.

## Checks

- KiCad design rule check: zero violations, zero unconnected nets.
- Read the board file back and confirmed every slot pin shares a net with the same-numbered header pin. 50 separate nets.
- Printed the copper at 1:1 and laid it over the modem's empty connector holes. Every hole lines up, pin 1 on pin 1. That is the check against a mirrored board, which is the one mistake that would be fatal with a single connector.

## Things I am watching

- **Fab limits.** The even-pin traces are 0.12mm with 0.115mm gaps. That is finer than OSH Park lists for two-layer boards (6 mil trace and space), and that is the version I ordered. So every board gets checked with a multimeter before the connector goes on. Continuity from each header pin to its slot pad, and no shorts between the even pins that run side by side. Three boards in the order, three chances.
- **Fallback is ready.** There is a four-layer version of the same board. Spreading the even-pin escape over four layers makes room for 0.16mm traces with 0.20mm gaps, inside OSH Park's four-layer rules. Same footprint, same header. If the two-layer boards come back with shorts, that one gets ordered.
- **No mounting hole.** The connector is the only thing holding the board. Support it when pushing jumper wires on.
- **Signal names on the silkscreen are not verified yet.** They come from the LTE Lite guide. The back of the board says to check ground and +5V before trusting them.
- **Outline.** It is meant to stay inside the space the modem occupied. I estimated the modem's extents from photos. Need to hold the print against the real thing.

## Why it stays a plain breakout

Thought about putting the 16550 and everything else on this board. Decided not to.

There is one connector. Whatever board it gets soldered to is the board I am stuck with. The circuit still has open questions: whether I need an address decoder, how IOEN has to be driven, whether the clock is on pin 21. Answering those needs this breakout first. If I guess, and guess wrong, I am desoldering 50 fine-pitch pins again.

So this is the permanent connector carrier. The electronics go on a second board that plugs onto the header. If that one needs a respin, the connector never moves.

## Files

Everything is in the [source repository](https://github.com/k0bura/compaq-wifimodem) under `hardware/eos-breakout/`.

- `gen_breakout.py`. The board is generated by a script through KiCad's Python API, not drawn by hand. Change a number, rerun, get a new board.
- `eos-breakout.kicad_pcb`. KiCad 10.
- `eos-breakout-gerbers.zip`. The two-layer board, as ordered.
- `eos-breakout-oshpark.kicad_pcb`. The four-layer fallback. Run the script with `oshpark` to regenerate it.
- `eos-breakout-1to1.pdf`. The paper test. Print at 100%.
