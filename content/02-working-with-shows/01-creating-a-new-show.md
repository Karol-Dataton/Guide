---
title: "Creating a New Show"
---


## Creating a New Show

Every WATCHOUT project begins with creating a show. A show is the container for all your displays, timelines, cues, and media references—essentially your entire production wrapped into a single document that can be saved, shared, and deployed across your network.

When you create a new show, WATCHOUT prepares a fresh workspace with an empty Stage canvas and at least one Timeline ready for programming. No displays are defined yet, no media has been imported, and the stage coordinates default to a neutral origin point. This blank slate approach means you have complete control over how your production takes shape from the very beginning.

### Starting a New Show

You can create a new show in two ways. From the **Welcome Screen** that appears when you first launch Producer, click **New Show** to begin immediately. Alternatively, if you're already working in the application, choose **File → New** from the menu bar.

If you have unsaved changes in a currently open show, WATCHOUT will ask whether you want to save your work before proceeding. This safeguard ensures you never accidentally lose edits by starting fresh.

### What a New Show Contains

A freshly created show includes the fundamental structures you need to begin production work. The **Stage** window displays an empty canvas where you'll eventually position displays and arrange visual content. A default **Timeline** is created so you can start adding cues right away. The show also inherits default settings for frame rate, timing resolution, and network routing that you can adjust later through Show Properties.

At this point, nothing is connected—no display servers, no Director, no Asset Manager. The show exists purely as a local document on your Producer workstation until you choose to connect it to network resources.

### Organizing Your Project Files

Consider where you'll store your show file before you begin programming. Keeping your show file alongside its associated media assets in a dedicated project folder simplifies collaboration and makes packaging the show for transport much easier. A typical structure might place the show file in a project root folder with subfolders for video assets, images, and audio.

When multiple team members work on the same production, consistent folder conventions prevent confusion about which version of the show is current and where media files should be located.

### Network Considerations

If you create a show while already connected to network nodes, WATCHOUT remains aware of the Director's state. Should you attempt to deploy your new show to a Director that's already running a different production, you'll receive a warning about overriding the existing show. This protection helps prevent accidental interruptions to live systems.

