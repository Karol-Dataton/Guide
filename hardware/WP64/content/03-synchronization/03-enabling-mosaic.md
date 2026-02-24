---
title: "Enabling Mosaic"
---

## Enabling Mosaic

**Create a mosaic grid to combine multiple display outputs into a single unified canvas.**

:::warning
Before beginning, make sure all displays have the ability to use a desired display mode (resolution + refresh rate).
:::

1. Select all displays and select the *CREATE MOSAIC* option. If there is only one display present or only one display selected, the option will be grayed out.

![Create Mosaic Option](../media/wp64/synchronization_09.jpg)

2. In the *Create Mosaic Grid* menu, configure the grid to specification.

![Create Mosaic Grid Window](../media/wp64/synchronization_10.jpg)
Example of the *Create Mosaic Grid* window.

- Select the appropriate number of rows and columns.

  For 2x2 setup, the number of columns and rows will be 2 each. For 4 displays stacked horizontally (panorama), the grid would consist of 1 row and 4 columns (1x4).

- Select the resolution (for each display) by specifying width and height.

  The resolution is specified for each participating display, not the whole resulting mosaic. For example: To get a 4K mosaic from 4 HD outputs, you would put 1920x1080 in Custom Width and Custom Height respectively.

- Select desired refresh rate.

:::info
For 59.94 Hz the correct values are 60000 for Numerator and 1001 for Denominator.
:::

- Drag the correct channels to their respective positions in the preview panel to create the desired layout.

![Mosaic Grid Layout](../media/wp64/synchronization_11.jpg)

- Click Create Grid to apply changes.

:::info
Before finalizing the mosaic grid, make sure WATCHOUT is not rendering on the displays that are being used for the grid. Disable all of them before accepting changes.
:::

- If everything was set up correctly, a message will confirm that the mosaic grid was created successfully.

![Mosaic Grid Created](../media/wp64/synchronization_12.jpg)
