/**
 * WATCHOUT Infrastructure Planner
 * Context menu system
 */

let activeMenu = null;

export function showContextMenu(x, y, items) {
    hideContextMenu();

    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;

    items.forEach(item => {
        if (item.separator) {
            const sep = document.createElement('div');
            sep.className = 'context-menu-separator';
            menu.appendChild(sep);
            return;
        }

        const btn = document.createElement('button');
        btn.className = 'context-menu-item';
        if (item.danger) btn.classList.add('danger');
        btn.innerHTML = item.icon ? `<i class="fa-solid ${item.icon}"></i> ${item.label}` : item.label;
        btn.addEventListener('click', () => {
            hideContextMenu();
            item.action();
        });
        menu.appendChild(btn);
    });

    document.body.appendChild(menu);
    activeMenu = menu;

    // Keep menu within viewport
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) menu.style.left = `${x - rect.width}px`;
    if (rect.bottom > window.innerHeight) menu.style.top = `${y - rect.height}px`;

    // Dismiss on outside click (next tick so this click doesn't dismiss)
    setTimeout(() => {
        document.addEventListener('mousedown', onDismiss);
        document.addEventListener('contextmenu', onDismiss);
    }, 0);
}

function onDismiss(e) {
    if (activeMenu && !activeMenu.contains(e.target)) {
        hideContextMenu();
    }
}

export function hideContextMenu() {
    if (activeMenu) {
        activeMenu.remove();
        activeMenu = null;
    }
    document.removeEventListener('mousedown', onDismiss);
    document.removeEventListener('contextmenu', onDismiss);
}
