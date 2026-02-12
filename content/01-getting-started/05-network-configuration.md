---
badge: Anton
badge: Jacquie
badge: JME
badge: Karol
---

## Network Configuration

Establishing a robust and properly configured network is critical for WATCHOUT 7. The system relies on the network not just for file transfer, but for frame-accurate synchronization (UDP) and system control (TCP).

### General Recommendations

*   **Dedicated Network:** The WATCHOUT network should be a closed, dedicated local area network (LAN). Do **not** connect it to the internet or a general office network alongside your show data.
*   **Wired Connections:** Always use wired Ethernet connections (Cat5e, Cat6, or fiber). Wi-Fi is not supported for show synchronization due to latency and packet loss.
*   **Quality Components:** Invest in reliable, professional-grade networking equipment. Consumer-grade hardware may introduce latency spikes or dropped packets under sustained load.

### Recommended Network Hardware

Choosing the right hardware ensures stable, low-latency communication between your Production and Display computers.

#### Network Switches

For most WATCHOUT installations, a quality unmanaged gigabit switch is sufficient. However, for larger or more demanding setups, consider managed switches that offer greater control.

| Type | Use Case | Recommended Models |
| :--- | :--- | :--- |
| **Unmanaged Gigabit** | Small to medium shows<br>(2-8 displays) | Netgear GS108, TP-Link TL-SG108,<br>Cisco CBS110 |
| **Managed Gigabit** | Medium to large shows,<br>VLANs, QoS | Cisco CBS250, Netgear GS310TP,<br>Ubiquiti UniFi Switch |
| **10GbE** | High bandwidth<br>(NDI, 4K+, many outputs) | Netgear XS508M, MikroTik CRS305,<br>Ubiquiti UniFi 10G |

:::warning
**Disable Power Saving Features:** If using managed switches, disable "Green Ethernet," "Energy Efficient Ethernet" (EEE), and any auto-sleep modes. These features can interrupt synchronization and cause stuttering.
:::

#### Network Interface Cards (NICs)

Built-in motherboard NICs (Intel I211, I225, Realtek RTL8125) are typically adequate. For demanding workflows (10GbE, NDI sources), consider dedicated add-in cards:

*   **Intel X550-T2:** Dual-port 10GbE, excellent driver support.
*   **Mellanox ConnectX-3:** High performance, often used in broadcast environments.
*   **ASUS XG-C100C:** Cost-effective 10GbE option for smaller budgets.

#### Cabling

*   **Cat5e:** Suitable for Gigabit Ethernet up to 100 meters.
*   **Cat6/Cat6a:** Recommended for 10GbE or runs approaching 100 meters with better shielding.
*   **Fiber Optic (SFP/SFP+):** Essential for long-distance runs (over 100 meters) or electrically noisy environments (near LED walls, dimmers, etc.).

### IP Addressing

WATCHOUT computers must be on the same subnet to discover each other. We recommend using static IP addresses to ensure consistent connectivity.

#### Recommended Scheme

*   **Subnet Mask:** `255.255.255.0` (Class C)
*   **Production Computer:** `192.168.1.10`
*   **Display Computers:** `192.168.1.11`, `192.168.1.12`, etc.

:::warning
**Avoid DHCP:** While WATCHOUT can technically work with auto-assigned IPs (DHCP), it is strongly discouraged for live environments. IPs can change upon reboot, potentially breaking your mapping and control links.
:::

### Windows Firewall

WATCHOUT 7 requires specific network ports to operate. Upon installation, the installer typically adds the necessary rules to the Windows Defender Firewall.

If you need to manage ports manually:

*   **TCP Port 3040:** Main communication.
*   **UDP Port 3040:** Synchronization.
*   **Asset Management:** Various ports are used for the new Asset Manager syncing; ensure the `Dataton.Watchout.exe` and `Dataton.Watchout.Display.exe` applications are fully allowed through the firewall for both Private and Public profile types.

### Advanced: Jumbo Frames

For 10GbE networks or systems pushing very high bandwidth video data (especially NDI or uncompressed streams), enabling **Jumbo Frames** (usually 9000 MTU) on all network cards and switches can improve performance. Ensure every device in the chain supports and is configured for the same MTU size.

:::info
**Testing Tip:** After changing MTU settings, use `ping -f -l 8972 <target_ip>` from a command prompt to verify jumbo frames are working end-to-end. If the ping fails, a device in the chain isn't configured correctly.
:::
