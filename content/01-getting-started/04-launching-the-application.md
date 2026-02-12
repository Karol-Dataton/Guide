---
badge: Jacquie
badge: JME
badge: Karol
---

## Launching the Application

Once WATCHOUT is installed, you are ready to launch the software. How you launch it depends on whether you are working on the Production Computer (designing) or a Display Computer (playback).

### On the Production Computer

Launch **WATCHOUT Producer** from the desktop shortcut or Start Menu.

#### The Welcome Screen
Upon first launch, you are greeted by the Welcome Screen, which serves as your project hub:

*   **New:** Creates a blank canvas for a new show.
*   **Open:** Browse your file system for an existing `.watch` show file.
*   **Open show from Director:** Connect to a Director on your network to open its currently running show.
*   **Learn:** Opens the WATCHOUT 7 User's Guide in your web browser.
*   **Recent Shows:** A list of your most recently accessed show files for quick entry (displayed on the right side of the Welcome Screen).

#### Layout Presets
WATCHOUT 7 allows you to save and load custom layout presets. You can save up to 9 layout presets and quickly switch between them using keyboard shortcuts or the Window menu. Use **Reset Layout** from the Window menu to return to the default layout.

### On Display Computers

On your media servers, launch the **WATCHOUT Manager** to start playback services.

1.  Look for the **WATCHOUT Manager** shortcut on the desktop.
2.  Launch the application.
3.  A splash screen will appear on connected displays, indicating the system is ready and listening for commands from a Director.
4.  **Important:** The WATCHOUT Manager must be running *before* you try to connect from the Production computer.

The WATCHOUT Manager coordinates multiple background services including the Director, Runner, and Visual Renderer components that work together to deliver synchronized playback.

#### Configuring Auto-Launch

For permanent installations, it is critical that WATCHOUT starts automatically when the computer boots. This ensures the system recovers automatically after a power cycle.

**Using Windows Task Scheduler (Recommended):**

1.  **Open Task Scheduler:**
    *   Press `Windows Key`, type **Task Scheduler**, and press **Enter**.
    *   Alternatively, press `Windows Key + R`, type `taskschd.msc`, and press **Enter**.

2.  **Import the Task File:**
    *   In the right-hand **Actions** panel, click **Import Task...**.
    *   Navigate to your WATCHOUT installation directory (e.g., `C:\WATCHOUT7\`).
    *   Select the file `wo-autostart.xml` and click **Open**.

3.  **Review Task Settings:**
    *   A dialog will appear showing the task configuration.
    *   On the **General** tab, ensure **Run with highest privileges** is checked.
    *   On the **Triggers** tab, verify the trigger is set to **At log on**.
    *   On the **Actions** tab, confirm the action points to `C:\WATCHOUT7\process-manager.exe` (adjust if you installed elsewhere).

4.  **Save the Task:**
    *   Click **OK** to create the scheduled task.
    *   If prompted for credentials, enter your Windows username and password.

5.  **Verify:** Restart the computer to confirm that WATCHOUT Manager launches automatically upon login.

:::tip
**Managing the Task:** To edit or delete the task later, open Task Scheduler and look for the task named **WATCHOUT manager** under *Task Scheduler Library > WATCHOUT*.
:::

:::tip
**Auto-Login:** Ensure your Windows user account is configured to log in automatically without a password prompt. This can be configured using the `netplwiz` Windows utility.
:::

### Troubleshooting Launch Issues

If the application fails to launch:

*   **License Error:** Check that your License Key is plugged in and the light is on. Open CodeMeter Control Center to verify it is detected.
*   **GPU Driver Error:** Ensure your GPU drivers are up to date. WATCHOUT uses OpenGL for rendering.
*   **Firewall Prompt:** If Windows asks to allow the application access to the network, check **both** "Private" and "Public" networks and click **Allow Access**.
