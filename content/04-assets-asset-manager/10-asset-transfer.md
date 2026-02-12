---
title: "Asset Transfer"
---


## Asset Transfer

When a show goes online, the Asset Manager distributes optimized assets to every display server (Runner) in the system. WATCHOUT handles this process automatically, but understanding how it works helps you plan for large shows and optimize transfer times.

### Transfer Process

Asset transfer follows these stages:

1. **Scanning** – the Asset Manager scans the local asset database to determine which files each Runner needs. It compares the local optimized files against what the Runner already has cached.
2. **Transferring** – new or updated files are sent over the network to each Runner. A progress indicator tracks bytes copied, files copied, and estimated time remaining.
3. **Success** – when all files have been transferred, the job is marked as complete.

The transfer system tracks detailed metrics:

- **Files total / copied / skipped** – total file count, how many were transferred, and how many already existed on the Runner.
- **Bytes total / copied / skipped** – the same breakdown by data volume.
- **ETA** – after 1 GB of data has been transferred, the system calculates an estimated completion time based on the current transfer rate.
- **Errors** – transfer errors are collected and displayed. Up to 100 unique error messages are retained per job.

A transfer can be **cancelled** at any time. Cancelled transfers can be restarted.

### Transfer States

Each transfer job moves through the following states:

- **Pending** – the job is queued but has not started.
- **Scanning** – the Asset Manager is comparing local and remote assets.
- **Transferring** – files are being sent.
- **Waiting** – the transfer is paused (e.g. waiting for the Runner to become available).
- **Success** – all files transferred successfully.
- **Cancelled** – the transfer was stopped by the user.

### Pre-Caching Assets on Runners

For large shows, you can pre-cache (pre-download) assets onto specific Runners before going fully online:

1. In the Assets window, select the assets you want to pre-cache.
2. Right-click and choose **Transfer Assets → Cache Selected Assets**.
3. Select the Runner(s) to cache the assets on.
4. Click **OK** to begin the transfer.

<!-- screenshot: Pre-download Runner Assets dialog showing runner selection -->

This is useful when you need to transfer large volumes of media (tens or hundreds of gigabytes) before a show, without waiting for the full online process.

### Optimizing Transfer Speed

- **Use high-speed networking** – 1 Gbps minimum, 10 Gbps recommended for large shows.
- **Dedicated network** – isolate WATCHOUT traffic from other network data to avoid contention.
- **Quality switches** – use managed switches with sufficient backplane bandwidth.
- **Bandwidth limit** – the Asset Manager Settings dialog allows you to set a bandwidth limit (in Mbit/s). Set to 0 for unlimited. This is useful when sharing the network with other traffic.

### Managing Disk Space

- **Asset Manager cache** – the Asset Manager stores both source and optimized files. The optimized versions can be significantly larger than the source (especially with HAP encoding).
- **Runner cache** – each Runner stores optimized assets on its local drive. When a show changes, unused cached files may remain. Consult the WATCHOUT administration guide for cache cleanup procedures.
- **Monitoring** – keep an eye on disk space on both the Asset Manager node and each Runner, particularly for shows with many large video assets.
