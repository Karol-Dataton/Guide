---
badge: Jacquie
badge: JME
badge: Karol
---

## Quick Start Tutorial

Follow these steps to create your first simple presentation in WATCHOUT 7.

### Step 1: Create a New Show

1.  Launch **WATCHOUT Producer** from the desktop shortcut.
2.  From the **Welcome Screen**, click **New Show**.
3.  Choose a location and name for your show file (e.g., "MyFirstShow.watch").
4.  Click **Save**. Your new show opens with an empty Stage and Timeline.

### Step 2: Add a Display

<div class="video-placeholder">Video Placeholder</div>

In WATCHOUT 7, displays are added directly on the Stage canvas.

1.  Click on an empty area of the **Stage** window to make sure it's active.
2.  Go to the **Stage** menu and select **Add Display**, or right-click on the Stage and choose **Add Display**.
3.  A new display rectangle appears. It is automatically selected.
4.  In the **Properties** panel on the right, configure the display:
    *   **Name:** Give it a descriptive name (e.g., "Main Screen").
    *   **Resolution:** Set width and height to match your physical output (e.g., `1920` x `1080`).
    *   **Alias:** Enter a name or address to identify the output (this is used when routing to physical devices).
5.  Position the display on the Stage by dragging it to your desired location.

### Step 3: Import Media

@[Adding media to the Asset Manager](../media/add_media.mp4)

WATCHOUT 7 uses the **Asset Manager** to handle all media.

1.  Open the **Assets** window by going to **Window > Assets** or pressing `Ctrl+4`.
2.  Use **File > New Media File** to add media, or drag files directly from Windows Explorer into the Assets window.
3.  Select your image or video files and click **Open**.
4.  The files are now listed in the Assets window and are ready to be used.

### Step 4: Place Media on the Timeline

@[Placing media on the Timeline](../media/add_to_timeline.mp4)

1.  In the **Assets** window, select the media you want to use.
2.  Drag the media from the Assets window directly onto the **Timeline** window.
3.  This creates a new **Media Cue** on a layer.
4.  Drag the cue left or right to adjust its start time, or drag its edges to change its duration.

### Step 5: Position on Stage

@[Moving the Playhead](../media/playhead.mp4)

1.  Move the **Playhead** (the red vertical line on the Timeline) so it is positioned over your cue.
2.  Your media will now be visible in the **Stage** window.
3.  Click and drag the media directly on the Stage to position it within your display area.
4.  Use the handles to resize or rotate the media as needed.

### Step 6: Set Up a Display Node

<div class="video-placeholder">Video Placeholder</div>

Before you can see your content on a physical screen, you need to configure a **Display Node** — the computer that will render and output the visuals.

1.  On your Display Computer, launch the **WATCHOUT Manager** from the desktop shortcut.
2.  The splash screen will appear on connected displays, showing the WATCHOUT logo while waiting for a connection.
3.  Back on your Producer computer, open the **Network** window by going to **Window > Network** or pressing `Ctrl+5`.
4.  Your Display Computer should appear in the list as a node with available services. If it doesn't:
    *   Ensure both computers are on the same network subnet.
    *   Check that Windows Firewall allows WATCHOUT through (both Private and Public networks).
5.  In the **Stage** window, select your display rectangle.
6.  In the **Properties** panel, configure the **Route** to specify which device and output channel to use.
7.  Connect to a **Director** by clicking **Connect** in the Welcome Screen or using **File > Connect**. The Director coordinates playback across all your nodes.

### Step 7: Run the Show

<div class="video-placeholder">Video Placeholder</div>

1.  Press the **Spacebar** or click the **Play** button to start playback.
2.  The Timeline will play forward from the current position of the Playhead.
3.  Watch your physical screen—the content will be perfectly synchronized.

:::tip
**Tip:** Use **Ctrl+Home** to jump to the beginning of the timeline before pressing play.
:::
