---
title: "Dante License Activation"
---

## Dante License Activation

**WATCHPAX 64 is Dante-ready for WATCHOUT 7.** This means the Dante license must be purchased and activated by the user. Once activated, the WATCHPAX 64 can transmit multi-channel, uncompressed digital audio over the network using the Dante protocol.

:::warning
The Dante license is bonded to the selected network adapter. After activation, the license cannot be transferred to another port. Choose the intended network adapter carefully before proceeding.
:::

### Prerequisites

- **Dante Controller** — a free application from Audinate used to manage Dante devices and route audio channels on the network. Download it from the [Audinate website](https://www.audinate.com/products/software/dante-controller). Install it on the production computer (not on the WATCHPAX 64).
- **Dante Activator** — included within Dante Controller, used to purchase and activate Dante licenses. An Audinate account is required to sign in.
- **Internet access** — required on the production computer during license purchase and activation.
- The production computer and the WATCHPAX 64 must be on the **same network**.

### Activate Dante on WATCHPAX 64

1. **Create an Audio Device in WATCHOUT Producer.** In WATCHOUT 7 Producer, create an Audio Device and enable it in the audio device properties. Select the network adapter on the WATCHPAX 64 that will be used for Dante audio. This tells WATCHOUT which network port to bind the Dante service to.

2. **Verify the device appears in Dante Controller.** Open Dante Controller on the production computer. The WATCHPAX 64 should appear in the device list with a status of **Dante Ready**, confirming the audio device was created successfully and is visible on the network.

3. **Open Dante Activator and sign in.** Inside Dante Controller, click the Dante Activator icon. Sign in with your Audinate account. If you do not have an account, you can create one during this step.

4. **Purchase and activate the Dante license.** In Dante Activator, select the WATCHPAX 64 device and purchase a Dante license. The license is applied immediately after purchase. Internet access is required for this step — the activation cannot be completed offline.

5. **Restart the device to back up the license.** Return to WATCHOUT 7 Producer, open the node properties for the WATCHPAX 64, and restart the device. This writes a backup of the Dante license to the unit's storage, which is needed for license recovery after a factory reset.

6. **Confirm activation and map audio channels.** After the restart, verify that the WATCHPAX 64 now shows as **Dante Activated** in Dante Controller. You can then use Dante Controller to map audio channels between the WATCHPAX 64 and other Dante devices on the network.

### License Recovery After Factory Reset

After step 5 above, a backup of the Dante license is stored on the unit. If you later perform a [factory reset](05-reset-watchpax-64.md), the Dante license can be recovered automatically from this backup when the unit comes back online — no internet connection is required for recovery. This is sometimes referred to as "offline recovery" because it does not need to contact Audinate's activation servers.

If the backup was not created (i.e., step 5 was skipped), you will need internet access and your Audinate account credentials to re-activate the license after a reset.

For additional details, see the Dataton knowledge base article: [How to activate Dante license on my WATCHOUT 7 media server](https://knowledge.dataton.com/knowledge/how-to-activate-dante-license-on-my-watchpax-media-server).
