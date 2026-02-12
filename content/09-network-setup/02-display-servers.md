---
title: "Display Servers"
---


## Display Servers

A display server node is typically a Runner system responsible for rendering and output.

### Runner Responsibilities

Runner-side services typically include:

- Visual rendering
- Audio rendering
- Runtime show execution received from Director

### Setup Checklist

1. Install WATCHOUT node software.
2. Confirm node appears in Network discovery.
3. Verify required services are running.
4. Route display devices to that node via host alias.

### Operational Notes

- If Director changes, runners can be reassigned by host reference.
- Keep one active show context per runner for predictable behavior.
- Mixed-show states between Director and Runner should be treated as warnings.
- Use host **Actions** for maintenance workflows such as startup action, sync mode, update, and restart.
