# WATCHPAX 30 Wiki — Content TODO

## Critical

- [x] **Connectors page** (`08-connectors.md`) — Add a full labeled table of every connector (4x HDMI outputs, USB ports, Ethernet, IEC C6 power inlet, on/off switch). Currently just two images with zero descriptive text. Use numbered callouts matching the images, mirroring the WP64 connector reference format.

## High

- [x] **Synchronization chapter index** (`03-synchronization/_index.md`) — Rename title from "EDID Emulators" to "Synchronization" (or "EDID and Display Configuration") for consistency with WP64 chapter naming. Add a bold introductory sentence summarizing the chapter.
- [x] **Reset data-retention format** (`05-reset-watchpax-30.md`) — Convert the nested bullet list of kept/reset settings into a table with checkmark/cross columns, matching the WP64 reset page format for scannability.
- [x] **Index page introductory blurbs** — Add a bold summary sentence to each `_index.md` file (Introduction, Installation and Operation, Synchronization, Conformity). WP64 does this consistently; WP30 does not.
- [x] **Introduction page** (`02-introduction-to-watchpax-30.md`) — Expand with a paragraph explaining the WP30's role in a WATCHOUT workflow and its value proposition. Currently only 4 lines of descriptive content before the spec table.

## Medium

- [x] **Installation power-off section** (`03-installation.md`) — Add step-by-step instructions for shutting down from WATCHOUT Producer software (both WO6 and WO7 paths), with screenshots. Add explicit forced-shutdown instructions. WP64 covers this thoroughly; WP30 only has a brief info block.
- [x] **styles.css comment** — Line 1 reads "WATCHPAX 64 Wiki/User Guide"; update to "WATCHPAX 30 Wiki/User Guide" (copy-paste artifact).
- [ ] **Supabase config** (`config.js`) — Supabase URL and anon key are blank. If badge tracking is intended for WP30, create the Supabase project and populate credentials.
- [x] **VS Code build task** — `.vscode/launch.json` has a "Build WP64 Wiki" task but no equivalent for WP30. Add one.
- [x] **Quick Start page** (`04-quick-start.md`) — Add first-boot finalization context (the 5-minute reboot process mentioned in Installation), expected startup behavior, and "next steps" links. Currently only 4 bare steps.

## Low

- [x] **Environmental page consistency** (`07-environmental.md`) — WP30 uses tables (good); WP64 uses bullet lists. Keep WP30's table format. No change needed here, but note this as a WP64 improvement opportunity.
- [x] **Accessories page** (`03-accessories.md`) — Consider adding a note about what each accessory is for (e.g., briefly explain what the EDID emulators do before linking to the dedicated page).
- [x] **Limited Warranty page** (`01-limited-warranty.md`) — Make the RMA URL (www.dataton.com) a clickable link. Add "approximately 2 years" alongside "730 days" for human readability.
- [x] **Before Using page** (`01-before-using-your-watchpax-30.md`) — Group the flat safety list under subheadings (Electrical Safety, Physical Installation, Maintenance) for readability. Fix "inaccurately" → "improperly."
- [ ] **Dimensions page** (`04-dimensions.md`) — Consider adding a dimensional drawing or diagram.
- [x] **Power page** (`05-power.md`) — Add typical power consumption (not just max 60W). Cross-reference the included power cord from the Accessories page.
- [x] **Media Server OS page** (`09-media-server-operating-system.md`) — Name the operating system, describe the update mechanism, mention the pre-installed WATCHOUT versions.
- [x] **Start Up Screen page** (`06-start-up-screen.md`) — Describe what information is shown on the startup screen (IP, serial number, version) in addition to the existing screenshots.
