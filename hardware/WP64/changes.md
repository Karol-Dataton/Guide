# Changes Applied — WATCHPAX 64 Wiki

Summary of all documentation improvements made to the WATCHPAX 64 hardware wiki.

---

## Content Changes

### 1. Technical Glossary
Added a new glossary chapter with definitions for 8 technical terms used across the wiki (Dante, EDID, GPU topology, LPCM, NVIDIA Quadro Sync II, SDI, ST2110, Wake-on-LAN). Each entry links to the relevant documentation page. Inline definitions that previously lived on the Introduction page were moved here to keep pages focused and avoid duplication.

### 2. Connectors Page
Replaced the original connectors page (which had only two images and a warning) with a full reference: front panel description, a numbered rear-panel connector table (18 entries), an optional slot mapping table, and an info callout about configurable I/O options.

### 3. Introduction Page
Expanded from 4 lines into a full overview covering specifications, GPU information, output count, and a cross-reference to the new glossary (replacing the removed inline terminology section).

### 4. Quick Start Page
Added a first-boot finalization callout (5-minute automatic reboot process), a new step confirming the startup screen, and a "Next Steps" section with cross-references to Connectors, WATCHPAX Config, Hardware Sync, and Dante License Activation.

### 5. Media Server OS Page
Expanded from a short note into a full reference with four sections: pre-installed software (WATCHOUT 7, WATCHPAX Config), the Dataton-managed system update mechanism, a strengthened warning callout, and a network security section with rationale for network isolation.

### 6. Start Up Screen Page
Removed a redundant sentence and added a structured description of what the screen actually displays: IP address, serial number, and system image version, each with links to related pages.

### 7. Installation Page — Power-On Behavior
Replaced an ambiguous single sentence with three distinct power-on scenarios: automatic start on AC power connect, front-panel button press after software shutdown, and Wake-on-LAN remote power-on.

### 8. Before Using Page — Safety Instructions
Reorganized the flat safety bullet list into three subheaded groups (Electrical Safety, Physical Installation, Maintenance & Troubleshooting). Fixed the word "inaccurately" to "improperly."

### 9. Miscellaneous Page — Rename and Deduplication
Renamed the page from "Miscellaneous" to "Audio Output and WATCHPAX Config." Condensed duplicated Dante and WATCHPAX Config descriptions into brief summaries with cross-references to the dedicated pages. Differentiated identical image alt text.

### 10. Dante License Activation Page
Added a prerequisites section, expanded all 6 activation steps with contextual explanations, and replaced a vague callout about "offline recovery" with a full "License Recovery After Factory Reset" section.

### 11. Hardware Sync Page — Terminology
Changed "ethernet cables/ports" to "CAT6 cables for sync connections" and "RJ45 ports on the Quadro Sync II card" to prevent confusion with network connections. Added a clarification that sync cables carry sync data only and a cross-reference to the Connectors page.

### 12. Specification Pages (Dimensions and Power)
Converted both pages from bullet lists to structured tables. Dimensions now includes imperial conversions and 2U rack height. Power now includes mains frequency, typical consumption range, and cross-references to the Accessories and Installation pages.

### 13. Navigation Index
Updated the Installation and Operation chapter index to reflect the renamed page title.

---

## Formatting Changes

### 14. Carousel Component
Introduced an interactive carousel for step-by-step instruction sequences. Multi-step procedures on the Synchronization pages and the Reset page now display as slide decks with numbered steps and navigation controls, instead of long scrolling lists.

### 15. Callout Boxes
Added warning and info callout boxes throughout the edited pages to highlight safety notes, first-boot behavior, and configuration caveats.

### 16. Cross-References
Added links between related pages throughout the wiki so readers can navigate to relevant content without searching. Pages that previously existed in isolation now reference each other where appropriate.
