---
title: "how wall locations work"
type: post
description: "no logins, just datacenter codes"
date: 2026-02-26
---

no accounts on sych0net. you show up, post, leave. so how do you tag where a message came from without tracking anyone?

cloudflare, the worker I'm using, tags every request with a 3-letter datacenter code - EWR for newark, LAX for LA, NRT for tokyo. not personal data, just which building your packets passed through. but raw airport codes looked like a departure board so each one gets a generated prefix or suffix on first use. `V0id-EWR`, `LAX-inTeRfAce`. cached in KV forever so the same datacenter always gets the same name. instant bbs names!

doesn't identify you and two people in the same city get the same tag. vpn users get whatever datacenter the vpn exits through, more of a digital postmark than address. If you're posting from `Dr1ft-SIN` your packets took a detour through singapore, unless you live there.

see the system news for the commit with sourcecode
