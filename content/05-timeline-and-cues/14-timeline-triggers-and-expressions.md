---
title: "Timeline Triggers and Expressions"
---


## Timeline Triggers and Expressions

Timelines can react automatically to expression-based trigger rules for play, pause, and stop.

### Where to Configure Triggers

1. Open the **Timelines** window.
2. Select a timeline (or folder context where applicable).
3. Open **Properties**.
4. Go to the **Triggers** section.
5. Edit:
   - **Play Expression**
   - **Pause Expression**
   - **Stop Expression**

### Validation and Hints

Trigger fields are validated while editing.

The editor also provides expression hints/autocomplete support based on the current token, helping you reference available inputs correctly.

If an expression references unknown inputs, validation will fail until corrected.

### How to Use This in Practice

- Use trigger expressions for predictable state transitions.
- Keep expressions simple and testable.
- Prefer explicit variable names over implicit assumptions.
- Verify trigger behavior in rehearsal with controlled input changes.

### Scope Notes

Trigger editing is intended for timeline control contexts and is not shown for composition-only contexts.

Treat trigger rules as show logic: version them, review them, and regression-test them after major timeline edits.
