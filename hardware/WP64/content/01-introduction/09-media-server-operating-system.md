---
title: "Media Server Operating System"
---

## Media Server Operating System

**The operating system in WATCHPAX 64 has been optimized and licensed for this specific media server configuration.**

The WATCHPAX 64 runs a locked-down operating system that has been configured, hardened, and licensed specifically for media server operation. The OS is not a general-purpose installation — it is part of a complete system image that also includes GPU drivers, hardware configuration, and a pre-installed copy of **WATCHOUT 7** with a built-in license.

### Pre-installed Software

Each WATCHPAX 64 ships ready to use with the following software pre-installed as part of the system image:

- **WATCHOUT 7** — the show-control and media playback engine (built-in license; not compatible with WATCHOUT 6).
- **WATCHPAX Config** — a browser-based configuration interface served by the unit on port 3024. See [Audio Output and WATCHPAX Config](../02-installation-and-operation/06-miscellaneous.md#watchpax-config) for details.

The current system image version number is displayed on the startup screen after the unit's serial number.

### System Updates

The WATCHPAX 64 system image — including the operating system, drivers, and WATCHOUT software — is managed by Dataton. Updates to the system image are applied through the [reset procedure](../02-installation-and-operation/05-reset-watchpax-64.md), which rewrites the system partitions and reconfigures all components. Do not attempt to update the operating system, drivers, or any other software manually.

:::warning
Do not install or attempt to install any software on the locked-down media server (such as drivers, software updates, security updates, virus protection, etc). Doing so will automatically void the unit's warranty. See [Before Using Your WATCHPAX 64](../02-installation-and-operation/01-before-using-your-watchpax-64.md) for full safety and warranty information.
:::

### Network Security

For better security, media servers are recommended to be installed and operate on a separate network, without access to other networks. Because the operating system is locked down and does not receive conventional security patches, network isolation is an important layer of protection.
