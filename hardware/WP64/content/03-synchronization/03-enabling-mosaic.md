---
title: "Enabling Mosaic"
---

## Enabling Mosaic

**Create a mosaic grid to combine multiple display outputs into a single unified canvas.**

Mosaic mode merges two or more physical display outputs from a single WATCHPAX 64 into one large virtual display. Instead of each output acting as a separate screen, the GPU treats them as tiles in a larger canvas -- for example, four HD outputs can be combined into a single 4K surface. This is useful when driving video walls, panoramic projection setups, or any configuration where content needs to span seamlessly across multiple outputs without WATCHOUT having to manage each output as an individual display. The GPU handles the splitting internally, which reduces complexity and improves frame accuracy.

:::warning
Before beginning, make sure all displays have the ability to use a desired display mode (resolution + refresh rate).
:::

::: carousel

### Select Displays and Create Mosaic

In the WATCHPAX Config display overview, select all the displays you want to include in the mosaic grid. You can hold **Ctrl** and click each display to select multiple outputs. Once all desired displays are highlighted, select the **Create Mosaic** option from the toolbar. If only one display is present or selected, the option will be grayed out -- you need at least two displays to form a mosaic.

![Create Mosaic Option](../media/wp64/synchronization_09.jpg)

### Configure the Grid Dimensions

The **Create Mosaic Grid** window will open. Start by setting the number of **rows** and **columns** to match your physical display arrangement. For example, a 2x2 video wall uses 2 rows and 2 columns, while four displays stacked horizontally in a panorama configuration would use 1 row and 4 columns (1x4). The grid dimensions must match the actual physical layout of your displays.

![Create Mosaic Grid Window](../media/wp64/synchronization_10.jpg)

### Set the Resolution

Specify the **Custom Width** and **Custom Height** for each individual display in the mosaic -- not the total mosaic resolution. For example, to create a 4K mosaic from four HD outputs, enter 1920 for the width and 1080 for the height. Each display in the grid will render at this resolution, and the GPU will combine them into the full mosaic canvas automatically.

### Set the Refresh Rate

Select the desired refresh rate for the mosaic displays. Enter the rate using the **Numerator** and **Denominator** fields. For standard 60 Hz, use a numerator of 60000 and a denominator of 1000. All displays in the mosaic must support the chosen refresh rate.

:::info
For 59.94 Hz the correct values are 60000 for Numerator and 1001 for Denominator.
:::

### Arrange the Display Layout

In the preview panel on the right side of the Create Mosaic Grid window, drag each display channel to its correct position. The channel numbers correspond to the physical DisplayPort outputs on the WATCHPAX 64. Match each channel to the position of its corresponding display in your physical setup. Getting this wrong will result in swapped or mirrored sections of your content.

![Mosaic Grid Layout](../media/wp64/synchronization_11.jpg)

:::info
Before finalizing the mosaic grid, make sure WATCHOUT is not rendering on the displays that are being used for the grid. Disable all of them before accepting changes.
:::

### Apply and Confirm

Once the grid dimensions, resolution, refresh rate, and layout are all configured, click **Create Grid** to apply the changes. The system will reconfigure the GPU outputs to form the mosaic. If everything was set up correctly, a confirmation message will appear indicating that the mosaic grid was created successfully. If the mosaic fails to create, verify that all displays support the selected resolution and refresh rate.

![Mosaic Grid Created](../media/wp64/synchronization_12.jpg)

:::
