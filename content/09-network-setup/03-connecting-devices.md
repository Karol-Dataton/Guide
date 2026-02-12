---
title: "Connecting Devices"
---


## Connecting Devices

In WATCHOUT, devices (displays, audio devices, capture sources) are bound to discovered node aliases.

### Connection Principles

- Device routing uses **host references/aliases** rather than fixed IP assumptions.
- Discovery updates dynamically as nodes appear/disappear.
- Producer can assign Director and Asset Manager roles to selected nodes.

### Best Practices

- Give each node a unique, descriptive alias.
- Keep aliases stable across rehearsals and show days.
- Reserve duplicate aliases only for intentional failover strategy.

### Validation Workflow

1. Confirm node visible in Network view.
2. Assign device host alias.
3. Verify service state on that node.
4. Run test cue and confirm physical output.
