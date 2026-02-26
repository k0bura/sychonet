---
title: "where the MOTD comes from"
type: post
description: "810 entries from the jargon file, unix tips, and computing history"
date: 2026-02-25
---

the message of the day on the homepage rotates daily from a local fortune file. no API calls, no external dependencies. just a text file with 810 entries separated by `%` signs, like the classic unix `fortune` format.

it started with the actual unix fortune databases but most of those are just quotes from dead authors. so I rebuilt from scratch using three sources:

**the jargon file**, the original hacker dictionary. definitions for things like `DWIM` (do what i mean), `heisenbug` (a bug that disappears when you try to observe it), and `yak shaving`. most of these read like inside jokes from 1988 which is exactly what they are.

**the art of command line**, practical unix/linux tips. things like `ctrl-r` for reverse history search, `tee` for splitting output, how to use `xargs` without losing your mind. actually useful stuff mixed in with the humor.

**computing history**, short facts about things that happened. the morris worm, the first email, why unix timestamps start in 1970. context for the machines here I like.

The client picks one at random, caches it in localStorage for 24 hours, and shows it on the homepage. no server involved. if the fetch fails you get `NO CARRIER` which feels appropriate.
