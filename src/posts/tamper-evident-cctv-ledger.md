---
title: Making CCTV evidence tamper-evident with a SHA-256 hash chain
date: 2026-11-01
tags: Edge AI, Blockchain, YOLOv8
summary: Why our SecureEdge project chains every security event to the one before it — and how a 30-line idea makes edited evidence obvious.
---

Cloud-based surveillance has two quiet problems: **latency** (video travels to a server before anyone is alerted) and **trust** (once footage sits in a database, how do you prove nobody changed it?). In our major project, SecureEdge, we attacked both.

## Detect at the edge

A Raspberry Pi with a Pi camera runs a custom **YOLOv8** model trained to spot knives, pistols and smartphones, plus **YOLOv8n** to count people. Frames are resized and cleaned with OpenCV, and a rule-based decision matrix weighs detection confidence, crowd size and time of day before raising an alert. No round trip to the cloud.

On validation (best epoch 107 of 150) the detector reached:

- **93.83%** precision — few false alarms
- **86.50%** recall
- **93.61%** mAP@50 and **71.07%** mAP@50–95

## Seal every event

When an alert fires, the system saves evidence — a screenshot and a clip — along with metadata: class, time and a SHA-256 hash. Here's the key idea: each event block also stores the **hash of the previous block**.

```
hash_n = SHA256( index | prev_hash | class | time | evidence_hash )
```

Change a single byte in an old event and its hash changes. That breaks the link stored in the next block, and every block after it. The Flask dashboard re-walks the chain and shows **VALID**, or flags exactly where it broke.

## Try it yourself

The *Achievement Ledger* on this site uses the same technique with real SHA-256 in your browser. Hit "tamper" on any block and watch the chain turn red.

## What's next

Our paper on this work was accepted at **MCT4SD 2026 (Springer LNNS)**. Next on the list: robustness and tamper testing, and multi-camera support.
