---
title: "Connecting to Display Servers"
---


## Connecting to Display Servers

In WATCHOUT 7, display servers are discovered nodes running Runner/renderer services. Producer uses discovered node metadata to route displays and monitor service health.

### Discovery and Visibility

Nodes are discovered automatically over multicast and shown in the **Network** window with:

- Host alias
- Address
- Running services
- Version and status indicators

### Typical Connection Workflow

1. Open **Network** window.
2. Confirm target nodes are visible and not stale.
3. Assign display devices to correct host aliases.
4. Connect Producer to the intended Director.

### If a Node Is Missing

- Verify subnet/routing and multicast handling.
- Check local firewall policy.
- Confirm process-manager services are running on the node.
- Ensure host aliases are unique (except planned fallback scenarios).
