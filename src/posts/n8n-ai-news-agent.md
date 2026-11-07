---
title: From 30 minutes to 2 — my AI news agent built with n8n and Gemini
date: 2026-10-20
tags: Automation, n8n, Gemini
summary: I was spending half an hour every morning skimming AI news. So I built a workflow that reads it for me.
---

Keeping up with AI and tech news was eating my mornings: open feeds, skim headlines, click, skim, repeat. About **30 minutes a day**. So I automated it.

## The workflow

I built it in **n8n**, a visual automation tool, in four stages:

- **Collect** — pull the latest articles from several AI & tech RSS feeds on a daily schedule
- **Summarize** — send each article to **Gemini** for a short, readable summary
- **Compose** — assemble the summaries into one clean newsletter
- **Deliver** — email it to my inbox through **Gmail** every morning

## Why n8n

Wiring triggers, HTTP calls and email by hand is fine, but n8n let me see the whole pipeline as a graph, test each node on its own and change a feed in seconds.

## The result

My morning news now takes about **2 minutes** of reading. The bigger lesson: the best AI projects often aren't flashy. They quietly give you back time every single day.
