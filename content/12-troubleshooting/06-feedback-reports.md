---
title: "Feedback Reports"
---


## Feedback Reports

A feedback report is a compressed diagnostic archive that bundles logs, system information, and optionally the current show file into a single package. You can send this archive to Dataton support or use it for internal analysis when troubleshooting issues.

### Creating a Report

The **Create Feedback Report** dialog is accessible from two places:

- **Help menu** → **Create Feedback Report**
- **Welcome screen** → **Your Feedback**

The dialog presents the following options:

**Director** — Select which Director to fetch logs from. The dropdown lists all discovered Directors on the network by host alias and IP address. If no Director is found, the option defaults to localhost (`127.0.0.1`). If a show is currently open, the dialog pre-selects the Director associated with that show.

**Start Time** — The beginning of the time window for log collection. Use the calendar and clock icons to pick a date and time. The start time must be within the **last 2 weeks** and cannot be in the future. By default, this is set to 8 hours before the current time.

**Duration** — How many hours of logs to collect, from **0.1 to 720 hours** (30 days). The default is 8 hours. A shorter duration produces a smaller, more focused report.

**Include Show File** — A toggle to attach the current show file to the report. This is enabled by default. Including the show file helps support reproduce issues in context, but you may want to disable it if the show contains sensitive content.

Click **Create** to generate the report.

### What the Report Contains

The feedback report is saved as a **7z archive** named `dataton_feedback.7z` in a `feedback` folder next to the Producer log directory. When the report is created, the folder opens automatically in the file explorer.

The archive contains:

- **services_log.txt** — Logs from all WATCHOUT services (Director, Runner, Operative, etc.) collected from the centralized logging service for the selected time range. Limited to 500,000 log lines.
- **error_log.txt** — A filtered extract of error-level log entries from the past 2 weeks (up to 5,000 entries), providing a quick overview of recent problems.
- **producer_log.txt** — The Producer's local log file, trimmed to the last 3 sessions for relevance.
- **asset_watcher_log.txt** — The Asset Watcher's log file, if available.
- **hosts_info.json** — Information about all discovered nodes on the network.
- **show_info.json** — Metadata about the current show.
- **show.watch** — The current show file (only if "Include Show File" was enabled).

### Size and Data Limits

The report generation process enforces several safeguards:

- **Maximum report size: 500 MB** — If the compressed archive exceeds this limit, the report is discarded and an error is shown. Reduce the duration to capture fewer logs.
- **Maximum log lines: 500,000** — If the selected time range contains more log lines than this limit, the report is still created but a warning is shown advising you to reduce the time range.
- **No data warning** — If the archive is smaller than 1 KB (essentially empty), the report is discarded with a message suggesting you try a different time range or verify that services were running during the selected period.

### The Loki Log Server

WATCHOUT uses a **Loki-based logging service** for centralized log collection across all services in the system. Every WATCHOUT service (Director, Runner, Operative, Process Manager, etc.) sends its log output to Loki, which runs on the same node as the Process Manager.

The feedback report pulls logs from Loki via its query API, which is why you need to select a Director — the report fetches logs from the Loki instance running on that node.

:::warning
If Loki fails to start or stops unexpectedly, a message will appear in the log window: "Logging service (Loki) failed to start" or "Logging service (Loki) has stopped unexpectedly and will attempt to restart." Without a running Loki instance, feedback reports will not contain service logs for the affected node.
:::

### When to Create a Report

- **After a crash or unexpected behavior** — Capture logs as soon as possible while they are still available.
- **Performance issues** — Include a time window that covers the period when the issue occurred.
- **When requested by Dataton support** — Support may ask for a feedback report with a specific time range.
- **Before making system changes** — A baseline report can be useful for comparison if issues arise later.

:::tip
Create the report promptly after an issue occurs. Loki retains logs for a limited period, and the 2-week start time limit means older logs may no longer be available.
:::
