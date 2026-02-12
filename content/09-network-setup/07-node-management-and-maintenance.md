---
title: "Node Management and Maintenance"
---


## Node Management and Maintenance

Node maintenance actions are available in host/device properties under **Network Actions**.

### Accessing Node Actions

1. Open **Window → Devices**.
2. Select a host in the Network pane.
3. Open **Properties**.
4. Use the **Actions** section.

Some actions are restricted to single-node selection.

### Service and Startup Actions

Available workflows include:

- **Restart Services** (resets WATCHOUT services and returns to splash-ready state)
- **Startup Action** configuration
- Upload/remove local startup show entries

Startup action modes:

| Mode | Behavior |
| --- | --- |
| **No Show** | Node starts without loading a local show |
| **Last Show** | Node starts with the most recently active local show |
| **Specific Show** | Node starts with a selected uploaded show |

### Asset Cache Maintenance

Use **Local Asset Cache** to:

- Inspect cached local asset copies on a node
- Remove assets not used by the current show (**Remove Unused Local Assets**)

Use cleanup carefully in multi-show environments to avoid breaking other productions sharing the same node.

### Sync and Software Operations

Node actions also include:

- **Sync Settings** (WATCHOUT-managed vs user-managed sync mode)
- **Update Software** to match Producer version
- **Restart** / **Shutdown**
- **Switch to WATCHOUT 6** (where supported)

### Identity and Storage Actions

Maintenance tools include:

- **Rename** node alias
- **Change Working Directory**

Changing working directory can invalidate local asset availability until assets are redistributed.

### Recommended Maintenance Sequence

1. Confirm node identity and version.
2. Apply startup action and sync policy.
3. Clean cache only when safe for all shows on the node.
4. Perform updates/restarts during controlled downtime.
5. Re-check node status and show assignment after reboot.
