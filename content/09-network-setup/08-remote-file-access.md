---
title: "Remote File Access"
---


## Remote File Access

WATCHOUT allows Producer to browse, upload, and manage files on remote nodes across the network. This enables centralized management of distributed playback systems — you can push assets, configure watch folders, and browse directories on Runner machines directly from the Producer interface.

For security, remote file access is controlled by an **allow list** that explicitly defines which directories on each node can be accessed remotely. Without this configuration, remote file browsing is blocked.

### File Browser

The file browser dialog opens whenever a feature requires selecting a path on a remote node — for example, configuring an Asset Watcher folder or choosing an export destination. The dialog provides:

- A **Roots** view showing the top-level allowed directories on the remote node.
- **Navigation controls** — an up-arrow button to navigate to the parent directory, a refresh button to reload the current listing, and a folder-plus button to create new folders.
- A **table** listing files and folders in the current directory, with double-click to open folders.
- **Select** and **Cancel** buttons to confirm or dismiss the selection.

Folders that are listed in the allow list but do not actually exist on disk are shown with a disabled appearance and a "Does not exist" tooltip. These cannot be selected or navigated into.

### Allow List Configuration

The allow list is a JSON file that specifies which directories on a node are accessible for remote file operations.

**File location:** The file is named `allow_list.json` and is located in the same directory as the WATCHOUT Manager settings file (typically the WATCHOUT installation's settings directory).

**File format:** The file contains a JSON object with a `folders` array listing the permitted root paths:

```json
{
  "folders": [
    "C:/shared/watchout/",
    "D:/shows/"
  ]
}
```

**Subfolder access:** Access is automatically granted to all subfolders of the specified paths. For example, if `D:/shows/` is in the allow list, then `D:/shows/my-project/assets/` is also accessible.

**Path format:** Paths can use either forward slashes (`/`) or backslashes (`\`). The system normalizes paths internally.

:::warning
After creating or modifying the `allow_list.json` file, you must **restart Producer** (including WATCHOUT Manager) for the changes to take effect. The allow list is read at startup and cached.
:::

### Setting Up Remote Access

When you attempt to access a remote node that has no allow list configured (or the requested path is not covered), WATCHOUT displays a **Remote access needed** dialog that walks you through the setup:

1. Click **Open allow list directory** to navigate to the settings folder on the target node.
2. Open the file named `allow_list.json` in a text editor, or create it if it doesn't exist.
3. Add the required folder paths to the `folders` array.
4. Save the file and restart Producer (including WATCHOUT Manager).

The dialog also shows a pre-populated example JSON based on the path you tried to access.

:::note
On WATCHPAX hardware, a default allow list is automatically created with common drive letters (W:\, D:\ through H:\), so remote file browsing works out of the box.
:::

### When Remote Access Is Required

Remote file access is needed for several operations:

- **Uploading assets** — transferring media files from Producer to a remote node's storage.
- **Configuring Asset Watcher paths** — selecting watch folders on remote Runner machines.
- **Browsing for startup show files** — selecting a show file on a remote node for the auto-start feature.
- **Exporting and importing assets** — selecting source or destination directories on remote nodes.

### Error Handling

If you attempt to browse a node that does not permit remote access, you will see the error:

:::info
"Remote file browsing is not allowed on [node name]"
:::

This means either the `allow_list.json` file does not exist on the target node, or the requested path is not covered by any entry in the allow list. Follow the setup steps above to resolve it.

If a path was allowed but the directory has since been removed from disk, the file browser shows it with a "Does not exist" indicator and prevents navigation.

### Security Considerations

The allow list exists to prevent unintended exposure of a node's file system over the network. Best practices:

- **Limit access to necessary directories only** — only add paths that WATCHOUT actually needs to access, such as show data directories and asset storage locations.
- **Avoid listing the root of system drives** (e.g., `C:/`) unless absolutely necessary. Prefer more specific paths like `C:/shows/` or `D:/watchout-assets/`.
- **Review the allow list periodically** — remove paths that are no longer needed after a project concludes.
