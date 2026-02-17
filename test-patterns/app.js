document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pattern-canvas');
    const ctx = canvas.getContext('2d');

    // Core Inputs
    const widthInput = document.getElementById('pattern-width');
    const heightInput = document.getElementById('pattern-height');
    const showInfoCheckbox = document.getElementById('show-info');

    // Grid Inputs
    const gridMajorSizeInput = document.getElementById('grid-major-size');
    const gridSubdivisionsInput = document.getElementById('grid-subdivisions');
    const gridMajorColorInput = document.getElementById('grid-major-color');
    const gridMinorColorInput = document.getElementById('grid-minor-color');
    const showStampsCheckbox = document.getElementById('show-stamps');
    const showCircleCheckbox = document.getElementById('show-circle');
    const showCrosshairCheckbox = document.getElementById('show-crosshair');

    // Display Setup Inputs
    const displayColsInput = document.getElementById('display-cols');
    const displayRowsInput = document.getElementById('display-rows');
    const overlapHInput = document.getElementById('display-overlap-h');
    const overlapVInput = document.getElementById('display-overlap-v');
    const showBordersCheckbox = document.getElementById('show-borders');
    const showRulerCheckbox = document.getElementById('show-ruler');
    const normalizeGridCheckbox = document.getElementById('normalize-grid');

    // UI Groups
    const gridControlsGroup = document.getElementById('grid-controls');

    const generateBtn = document.getElementById('generate-pattern-btn');
    const downloadBtn = document.getElementById('download-pattern-btn');

    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabSlider = document.querySelector('.tab-slider');

    function updateTabSlider() {
        const activeBtn = document.querySelector('.tab-btn.active');
        if (activeBtn && tabSlider) {
            tabSlider.style.width = `${activeBtn.offsetWidth}px`;
            tabSlider.style.left = `${activeBtn.offsetLeft}px`;
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.remove('active');
                c.classList.remove('animating-section');
            });

            btn.classList.add('active');
            const newTab = document.getElementById(`${tabId}-tab`);
            newTab.classList.add('active');

            // Trigger page reveal animation
            void newTab.offsetWidth; // Force reflow to restart animation
            newTab.classList.add('animating-section');

            updateTabSlider();

            if (tabId === 'led') {
                requestAnimationFrame(() => updateToggleSlider());
            }
        });
    });

    // Initial tab slider position
    setTimeout(updateTabSlider, 50);
    window.addEventListener('resize', updateTabSlider);

    // Drawing Functions
    function drawPattern() {
        const dWidth = parseInt(widthInput.value) || 1920;
        const dHeight = parseInt(heightInput.value) || 1080;
        const cols = parseInt(displayColsInput.value) || 1;
        const rows = parseInt(displayRowsInput.value) || 1;
        const overlapH = parseInt(overlapHInput.value) || 0;
        const overlapV = parseInt(overlapVInput.value) || 0;

        const totalWidth = (dWidth * cols) + (overlapH * (cols - 1));
        const totalHeight = (dHeight * rows) + (overlapV * (rows - 1));

        const showInfo = showInfoCheckbox.checked;
        const showBorders = showBordersCheckbox.checked;
        const normalizeGrid = normalizeGridCheckbox.checked;
        const showRuler = showRulerCheckbox.checked;
        const showStamps = showStampsCheckbox.checked;
        const showCircle = showCircleCheckbox.checked;
        const showCrosshair = showCrosshairCheckbox.checked;

        // Resize canvas
        canvas.width = totalWidth;
        canvas.height = totalHeight;

        // Clear
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, totalWidth, totalHeight);

        // Draw Pattern (Grid Only)
        const majorSize = parseInt(gridMajorSizeInput.value) || 100;
        const subdivs = parseInt(gridSubdivisionsInput.value) || 4;
        const majorColor = gridMajorColorInput.value;
        const minorColor = gridMinorColorInput.value;

        // Calculate Normalized Grid for Displays
        let gridW = majorSize;
        let gridH = majorSize;

        if (normalizeGrid) {
            gridW = dWidth / Math.ceil(dWidth / majorSize);
            gridH = dHeight / Math.ceil(dHeight / majorSize);
        }

        // 1. Display Grids
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * (dWidth + overlapH);
                const y = r * (dHeight + overlapV);
                ctx.save();
                ctx.translate(x, y);
                // Clip to display area
                ctx.beginPath();
                ctx.rect(0, 0, dWidth, dHeight);
                ctx.clip();

                drawGrid(dWidth, dHeight, gridW, gridH, subdivs, majorColor, minorColor);
                ctx.restore();
            }
        }

        // 2. Overlap Grids
        if (cols > 1 || rows > 1) {
            drawOverlapGrids(dWidth, dHeight, cols, rows, overlapH, overlapV, majorSize, subdivs, majorColor, minorColor, normalizeGrid);
        }

        // 3. Ruler
        if (showRuler) {
            drawRulers(totalWidth, totalHeight, dWidth, dHeight, cols, rows, overlapH, overlapV);
        }

        // 4. Display Labels and Boundaries
        if (showBorders && (cols > 1 || rows > 1)) {
            drawDisplayBoundaries(dWidth, dHeight, cols, rows, overlapH, overlapV);
        }

        // 5. Extras (Stamps, Circle, Crosshair, Overlays)
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * (dWidth + overlapH);
                const y = r * (dHeight + overlapV);
                ctx.save();
                ctx.translate(x, y);
                ctx.beginPath();
                ctx.rect(0, 0, dWidth, dHeight);
                ctx.clip();

                if (showStamps) drawStamps(dWidth, dHeight, x, y);
                if (showCircle) drawCenterCircle(dWidth, dHeight);
                if (showCrosshair) drawCenterCrosshair(dWidth, dHeight);

                ctx.restore();
            }
        }

        // Draw Info Overlay
        if (showInfo) {
            drawInfoOverlay(totalWidth, totalHeight, 'GRID', cols, rows, dWidth, dHeight);
        }

        // Draw Custom Label
        const customLabel = document.getElementById('custom-label').value;
        if (customLabel) {
            drawCustomLabel(totalWidth, totalHeight, customLabel);
        }
    }

    function drawCustomLabel(w, h, text) {
        // Dynamic font size based on height, but capped
        const fontSize = Math.floor(h / 10);
        ctx.font = `bold ${fontSize}px "Inter", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Text Shadow/Outline for visibility
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.strokeText(text, w / 2, h / 2);

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(text, w / 2, h / 2);

        // Reset
        ctx.lineWidth = 1;
    }

    function drawOverlapGrids(dW, dH, cols, rows, ovH, ovV, majorSize, subdivs, majorColor, minorColor, normalizeGrid) {
        ctx.save();

        // Horizontal Overlaps
        if (ovH < 0 && cols > 1) {
            for (let c = 1; c < cols; c++) {
                const x = c * (dW + ovH);

                if (normalizeGrid) {
                    // Clear & Grid
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x, 0, -ovH, canvas.height);

                    ctx.save();
                    ctx.translate(x, 0);

                    // Scale grid to fit full tiles
                    const ovW = -ovH;
                    const ovH_total = canvas.height;
                    const majorW = ovW / Math.ceil(ovW / majorSize);
                    const majorH = ovH_total / Math.ceil(ovH_total / majorSize);

                    drawGrid(ovW, ovH_total, majorW, majorH, subdivs, majorColor, minorColor);
                    ctx.restore();
                }

                // Highlight (always add a bit of tint)
                ctx.fillStyle = 'rgba(255, 255, 0, 0.15)';
                ctx.fillRect(x, 0, -ovH, canvas.height);
            }
        }

        // Vertical Overlaps
        if (ovV < 0 && rows > 1) {
            for (let r = 1; r < rows; r++) {
                const y = r * (dH + ovV);

                if (normalizeGrid) {
                    // Clear & Grid
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, y, canvas.width, -ovV);

                    ctx.save();
                    ctx.translate(0, y);

                    // Scale grid to fit full tiles
                    const ovW_total = canvas.width;
                    const ovH_local = -ovV;
                    const majorW = ovW_total / Math.ceil(ovW_total / majorSize);
                    const majorH = ovH_local / Math.ceil(ovH_local / majorSize);

                    drawGrid(ovW_total, ovH_local, majorW, majorH, subdivs, majorColor, minorColor);
                    ctx.restore();
                }

                // Highlight
                ctx.fillStyle = 'rgba(255, 255, 0, 0.15)';
                ctx.fillRect(0, y, canvas.width, -ovV);
            }
        }

        ctx.restore();
    }

    function drawDisplayBoundaries(dW, dH, cols, rows, ovH, ovV) {
        ctx.save();

        // 1. Draw individual display borders (dashed Cyan)
        ctx.setLineDash([10, 10]);
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.lineWidth = 2;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * (dW + ovH);
                const y = r * (dH + ovV);
                ctx.strokeRect(x + 1, y + 1, dW - 2, dH - 2);

                // Display Index
                ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
                ctx.font = 'bold 24px Inter, sans-serif';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText(`Display ${r * cols + c + 1}`, x + 20, y + 20);
            }
        }

        // 2. Overlap Lines & Diagonals
        ctx.setLineDash([]);

        // Horizontal Overlaps
        if (ovH < 0 && cols > 1) {
            for (let c = 1; c < cols; c++) {
                const x = c * (dW + ovH);

                // Overlap lines
                ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
                ctx.beginPath();
                ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
                ctx.moveTo(x - ovH, 0); ctx.lineTo(x - ovH, canvas.height);

                // Diagonals
                ctx.moveTo(x, 0); ctx.lineTo(x - ovH, canvas.height);
                ctx.moveTo(x, canvas.height); ctx.lineTo(x - ovH, 0);
                ctx.stroke();
            }
        }

        // Vertical Overlaps
        if (ovV < 0 && rows > 1) {
            for (let r = 1; r < rows; r++) {
                const y = r * (dH + ovV);

                // Overlap lines
                ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
                ctx.beginPath();
                ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
                ctx.moveTo(0, y - ovV); ctx.lineTo(canvas.width, y - ovV);

                // Diagonals
                ctx.moveTo(0, y); ctx.lineTo(canvas.width, y - ovV);
                ctx.moveTo(0, y - ovV); ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        }

        ctx.restore();
    }

    function unused_drawDisplayBorders(dW, dH, cols, rows, ovH, ovV, majorSize, subdivs, majorColor, minorColor, normalizeGrid) {
        ctx.save();

        // 1. Draw individual display borders (dashed Cyan)
        ctx.setLineDash([10, 10]);
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.lineWidth = 2;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * (dW + ovH);
                const y = r * (dH + ovV);
                ctx.strokeRect(x + 1, y + 1, dW - 2, dH - 2);

                // Display Index
                ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
                ctx.font = 'bold 24px Inter, sans-serif';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText(`Display ${r * cols + c + 1}`, x + 20, y + 20);
            }
        }

        // 2. Highlight Overlap areas (semi-transparent Yellow)
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(255, 255, 0, 0.15)';

        // Horizontal Overlaps
        if (ovH < 0 && cols > 1) {
            for (let c = 1; c < cols; c++) {
                const x = c * (dW + ovH);

                if (normalizeGrid) {
                    // Clear & Grid
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x, 0, -ovH, canvas.height);

                    ctx.save();
                    ctx.translate(x, 0);

                    // Scale grid to fit full tiles
                    const ovW = -ovH;
                    const ovH_total = canvas.height;
                    const majorW = ovW / Math.ceil(ovW / majorSize);
                    const majorH = ovH_total / Math.ceil(ovH_total / majorSize);

                    drawGrid(ovW, ovH_total, majorW, majorH, subdivs, majorColor, minorColor, false, false);
                    ctx.restore();
                } else {
                    // Just highlight, letting underlying grids mesh
                    ctx.fillStyle = 'rgba(255, 255, 0, 0.15)';
                    ctx.fillRect(x, 0, -ovH, canvas.height);
                }

                // Highlight (always add a bit of tint)
                if (normalizeGrid) {
                    ctx.fillStyle = 'rgba(255, 255, 0, 0.15)';
                    ctx.fillRect(x, 0, -ovH, canvas.height);
                } else {
                    // Start of highlight already applied above if not clearing
                }

                // Diagonals
                ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
                ctx.beginPath();
                ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
                ctx.moveTo(x - ovH, 0); ctx.lineTo(x - ovH, canvas.height);

                // Diagonals
                ctx.moveTo(x, 0); ctx.lineTo(x - ovH, canvas.height);
                ctx.moveTo(x, canvas.height); ctx.lineTo(x - ovH, 0);
                ctx.stroke();
            }
        }

        // Vertical Overlaps
        if (ovV < 0 && rows > 1) {
            for (let r = 1; r < rows; r++) {
                const y = r * (dH + ovV);

                if (normalizeGrid) {
                    // Clear & Grid
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, y, canvas.width, -ovV);

                    ctx.save();
                    ctx.translate(0, y);

                    // Scale grid to fit full tiles
                    const ovW_total = canvas.width;
                    const ovH_local = -ovV;
                    const majorW = ovW_total / Math.ceil(ovW_total / majorSize);
                    const majorH = ovH_local / Math.ceil(ovH_local / majorSize);

                    drawGrid(ovW_total, ovH_local, majorW, majorH, subdivs, majorColor, minorColor, false, false);
                    ctx.restore();
                } else {
                    // Just highlight
                    ctx.fillStyle = 'rgba(255, 255, 0, 0.15)';
                    ctx.fillRect(0, y, canvas.width, -ovV);
                }

                // Highlight (if showed grid, add tint on top)
                if (normalizeGrid) {
                    ctx.fillStyle = 'rgba(255, 255, 0, 0.15)';
                    ctx.fillRect(0, y, canvas.width, -ovV);
                }

                // Diagonals & Lines
                ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
                ctx.beginPath();
                ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
                ctx.moveTo(0, y - ovV); ctx.lineTo(canvas.width, y - ovV);

                // Diagonals
                ctx.moveTo(0, y); ctx.lineTo(canvas.width, y - ovV);
                ctx.moveTo(0, y - ovV); ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        }

        ctx.restore();
    }

    function drawRulers(totalW, totalH, dW, dH, cols, rows, ovH, ovV) {
        ctx.save();
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const majorStep = 100;
        const mediumStep = 50;
        const minorStep = 10;
        const tickLengthMajor = 15;
        const tickLengthMedium = 10;
        const tickLengthMinor = 5;

        // --- Top Ruler (Global X) ---
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, totalW, 20);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        for (let x = 0; x <= totalW; x += minorStep) {
            let len = tickLengthMinor;
            if (x % majorStep === 0) len = tickLengthMajor;
            else if (x % mediumStep === 0) len = tickLengthMedium;

            ctx.moveTo(x + 0.5, 0);
            ctx.lineTo(x + 0.5, len);

            if (x % majorStep === 0 && x > 0) {
                ctx.fillText(x, x, tickLengthMajor + 2);
            }
        }
        ctx.stroke();

        // --- Left Ruler (Global Y) ---
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, 25, totalH);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.beginPath();

        for (let y = 0; y <= totalH; y += minorStep) {
            let len = tickLengthMinor;
            if (y % majorStep === 0) len = tickLengthMajor;
            else if (y % mediumStep === 0) len = tickLengthMedium;

            ctx.moveTo(0, y + 0.5);
            ctx.lineTo(len, y + 0.5);

            if (y % majorStep === 0 && y > 0) {
                ctx.fillText(y, tickLengthMajor + 2, y);
            }
        }
        ctx.stroke();

        // --- Bottom Ruler (Individual X) ---
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, totalH - 20, totalW, 20);

        ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)'; // Cyan for Local
        ctx.fillStyle = '#00FFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        for (let c = 0; c < cols; c++) {
            const startX = c * (dW + ovH);

            ctx.save();
            ctx.translate(startX, 0);
            ctx.beginPath();

            for (let lx = 0; lx <= dW; lx += minorStep) {
                let len = tickLengthMinor;
                if (lx % majorStep === 0) len = tickLengthMajor;
                else if (lx % mediumStep === 0) len = tickLengthMedium;

                ctx.moveTo(lx + 0.5, totalH);
                ctx.lineTo(lx + 0.5, totalH - len);

                if (lx % majorStep === 0) {
                    ctx.fillText(lx, lx, totalH - tickLengthMajor - 2);
                }
            }
            ctx.stroke();
            ctx.restore();
        }

        // --- Right Ruler (Individual Y) ---
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(totalW - 25, 0, 25, totalH);

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        for (let r = 0; r < rows; r++) {
            const startY = r * (dH + ovV);

            ctx.save();
            ctx.translate(0, startY);
            ctx.beginPath();

            for (let ly = 0; ly <= dH; ly += minorStep) {
                let len = tickLengthMinor;
                if (ly % majorStep === 0) len = tickLengthMajor;
                else if (ly % mediumStep === 0) len = tickLengthMedium;

                ctx.moveTo(totalW, ly + 0.5);
                ctx.lineTo(totalW - len, ly + 0.5);

                if (ly % majorStep === 0) {
                    ctx.fillText(ly, totalW - tickLengthMajor - 2, ly);
                }
            }
            ctx.stroke();
            ctx.restore();
        }

        ctx.restore();
    }

    function drawGrid(w, h, majorW, majorH, subdivs, majorColor, minorColor) {
        const minorW = majorW / subdivs;
        const minorH = majorH / subdivs;

        // 1. Draw Minor Lines
        if (subdivs > 1) {
            ctx.beginPath();
            ctx.strokeStyle = minorColor;
            ctx.lineWidth = 1;

            // Vertical Minor
            for (let x = 0; x <= w; x += minorW) {
                // Skip if this is also a major line position
                const ratio = x / majorW;
                const distToInt = Math.abs(ratio - Math.round(ratio));
                if (distToInt > 0.001) {
                    ctx.moveTo(Math.floor(x) + 0.5, 0);
                    ctx.lineTo(Math.floor(x) + 0.5, h);
                }
            }

            // Horizontal Minor
            for (let y = 0; y <= h; y += minorH) {
                const ratio = y / majorH;
                const distToInt = Math.abs(ratio - Math.round(ratio));
                if (distToInt > 0.001) {
                    ctx.moveTo(0, Math.floor(y) + 0.5);
                    ctx.lineTo(w, Math.floor(y) + 0.5);
                }
            }
            ctx.stroke();
        }

        // 2. Draw Major Lines
        ctx.beginPath();
        ctx.strokeStyle = majorColor;
        ctx.lineWidth = 2; // Thicker major lines

        // Vertical Major
        for (let x = 0; x <= w + 0.1; x += majorW) {
            ctx.moveTo(Math.floor(x), 0);
            ctx.lineTo(Math.floor(x), h);
        }

        // Horizontal Major
        for (let y = 0; y <= h + 0.1; y += majorH) {
            ctx.moveTo(0, Math.floor(y));
            ctx.lineTo(w, Math.floor(y));
        }
        ctx.stroke();

        ctx.lineWidth = 1; // Reset
    }

    function drawCenterCrosshair(w, h) {
        ctx.beginPath();
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;

        const centerX = w / 2;
        const centerY = h / 2;
        const crossSize = 50;

        // Cross
        ctx.moveTo(centerX - crossSize, centerY);
        ctx.lineTo(centerX + crossSize, centerY);
        ctx.moveTo(centerX, centerY - crossSize);
        ctx.lineTo(centerX, centerY + crossSize);
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    function drawCenterCircle(w, h) {
        const centerX = w / 2;
        const centerY = h / 2;
        const circleRadius = Math.min(w, h) / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    function drawStamps(w, h, globalOffsetX, globalOffsetY) {
        ctx.save();
        const fontSize = 120;
        ctx.font = `bold ${fontSize}px "Futura Now Headline", sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const spacingX = 1000;
        const spacingY = 350;

        // Calculate global grid start points
        const margin = 300; // Extra buffer to ensure coverage

        const startRow = Math.floor((globalOffsetY - margin) / spacingY);
        const endRow = Math.ceil((globalOffsetY + h + margin) / spacingY);

        const startCol = Math.floor((globalOffsetX - margin) / spacingX);
        const endCol = Math.ceil((globalOffsetX + w + margin) / spacingX);

        for (let r = startRow; r < endRow; r++) {
            for (let c = startCol; c < endCol; c++) {
                const gy = r * spacingY;
                let gx = c * spacingX;

                // Stagger every other row based on global row index
                if (Math.abs(r) % 2 === 1) {
                    gx += spacingX / 2;
                }

                // Convert to local context coordinates
                const lx = gx - globalOffsetX;
                const ly = gy - globalOffsetY;

                ctx.save();
                ctx.translate(lx, ly);
                ctx.fillText("WATCHOUT", 0, 0);
                ctx.restore();
            }
        }
        ctx.restore();
    }

    function drawColorBars(w, h) {
        const colors = [
            '#FFFFFF', // White
            '#FFFF00', // Yellow
            '#00FFFF', // Cyan
            '#00FF00', // Green
            '#FF00FF', // Magenta
            '#FF0000', // Red
            '#0000FF'  // Blue
        ];

        const barWidth = w / colors.length;

        colors.forEach((c, i) => {
            ctx.fillStyle = c;
            ctx.fillRect(i * barWidth, 0, barWidth, h);
        });
    }

    function drawGradient(w, h, color) {
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, '#000000');
        grad.addColorStop(1, color);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    }

    function drawCheckerboard(w, h, color) {
        const size = 100;
        const rows = Math.ceil(h / size);
        const cols = Math.ceil(w / size);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if ((r + c) % 2 === 0) {
                    ctx.fillStyle = color;
                    ctx.fillRect(c * size, r * size, size, size);
                }
            }
        }
    }

    function drawContrastSteps(w, h) {
        const steps = 11; // 0 to 100% in 10% steps
        const stepWidth = w / steps;

        for (let i = 0; i < steps; i++) {
            const val = Math.floor((i / (steps - 1)) * 255);
            ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
            ctx.fillRect(i * stepWidth, 0, stepWidth, h);

            // Label
            ctx.fillStyle = val > 128 ? '#000' : '#fff';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`${i * 10}%`, i * stepWidth + stepWidth / 2, h - 20);
        }
    }

    function drawCMYK(w, h) {
        const colors = [
            '#00FFFF', // Cyan
            '#FF00FF', // Magenta
            '#FFFF00', // Yellow
            '#000000'  // Black
        ];
        const barWidth = w / 4;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);

        colors.forEach((c, i) => {
            ctx.fillStyle = c;
            ctx.fillRect(i * barWidth, 0, barWidth, h);
        });
    }

    function drawInfoOverlay(w, h, type, cols, rows, dW, dH) {
        const padding = 20;
        const fontSize = Math.max(16, Math.floor(h / 40));

        ctx.font = `${fontSize}px "Inter", sans-serif`;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

        // Measure text
        const displayInfo = cols > 1 || rows > 1 ? ` | ${cols}x${rows} Displays (${dW}x${dH})` : '';
        const text = `${w} x ${h}${displayInfo} | ${type.replace('-', ' ').toUpperCase()} | ${new Date().toLocaleTimeString()}`;
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;

        // Background box
        ctx.fillRect(padding, h - padding - fontSize - 10, textWidth + 20, fontSize + 10);

        // Text
        ctx.fillStyle = '#FFFFFF';
        ctx.textBaseline = 'bottom';
        ctx.textAlign = 'left';
        ctx.fillText(text, padding + 10, h - padding - 5);
    }

    // Event Listeners
    generateBtn.addEventListener('click', drawPattern);

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `test-pattern-grid-${canvas.width}x${canvas.height}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });


    function getPatternSettings() {
        return {
            width: widthInput.value,
            height: heightInput.value,
            cols: displayColsInput.value,
            rows: displayRowsInput.value,
            overlapH: overlapHInput.value,
            overlapV: overlapVInput.value,
            borders: showBordersCheckbox.checked,
            ruler: showRulerCheckbox.checked,
            majorSize: gridMajorSizeInput.value,
            subdivisions: gridSubdivisionsInput.value,
            majorColor: gridMajorColorInput.value,
            majorColor: gridMajorColorInput.value,
            minorColor: gridMinorColorInput.value,
            showStamps: showStampsCheckbox.checked,
            showCircle: showCircleCheckbox.checked,
            showCrosshair: showCrosshairCheckbox.checked,
            showInfo: showInfoCheckbox.checked,
            normalizeGrid: normalizeGridCheckbox.checked,
            customLabel: document.getElementById('custom-label').value
        };
    }

    function setPatternSettings(s) {
        widthInput.value = s.width;
        heightInput.value = s.height;
        displayColsInput.value = s.cols;
        displayRowsInput.value = s.rows;
        overlapHInput.value = s.overlapH;
        overlapVInput.value = s.overlapV;
        showBordersCheckbox.checked = s.borders;
        normalizeGridCheckbox.checked = s.normalizeGrid;
        showRulerCheckbox.checked = s.ruler;
        gridMajorSizeInput.value = s.majorSize;
        gridSubdivisionsInput.value = s.subdivisions;
        gridMajorColorInput.value = s.majorColor;
        gridMinorColorInput.value = s.minorColor;
        showStampsCheckbox.checked = s.showStamps;
        showCircleCheckbox.checked = s.showCircle;
        showCrosshairCheckbox.checked = s.showCrosshair;
        showInfoCheckbox.checked = s.showInfo;
        document.getElementById('custom-label').value = s.customLabel;
        drawPattern();
    }

    // LED Pattern Logic
    const ledCanvas = document.getElementById('led-canvas');
    const ledCtx = ledCanvas.getContext('2d');
    const generateLedBtn = document.getElementById('generate-led-btn');
    const downloadLedBtn = document.getElementById('download-led-btn');

    // Inputs
    const ledWallWInput = document.getElementById('led-wall-width');
    const ledWallHInput = document.getElementById('led-wall-height');
    const ledTileWInput = document.getElementById('led-tile-width');
    const ledTileHInput = document.getElementById('led-tile-height');
    const ledColsInput = document.getElementById('led-cols');
    const ledRowsInput = document.getElementById('led-rows');
    const ledModeToggle = document.getElementById('led-mode-toggle');
    const ledModeBtns = ledModeToggle.querySelectorAll('.toggle-btn');
    const groupWallRes = document.getElementById('group-wall-res');
    const groupTileCount = document.getElementById('group-tile-count');
    const ledRainbowCheckbox = document.getElementById('led-rainbow');
    const ledBordersCheckbox = document.getElementById('led-borders');
    const ledBorderSizeInput = document.getElementById('led-border-size');
    const ledColorInput = document.getElementById('led-color');
    const ledNumberingSelect = document.getElementById('led-numbering');
    const ledCoordsSelect = document.getElementById('led-coords');
    const ledCheckerPaletteSelect = document.getElementById('led-checker-palette');
    const ledShowModulesCheckbox = document.getElementById('led-show-modules');
    const ledModuleWInput = document.getElementById('led-module-width');
    const ledModuleHInput = document.getElementById('led-module-height');

    function updateLedOptionStates() {
        const modulesActive = ledShowModulesCheckbox.checked;

        ledCheckerPaletteSelect.disabled = false;
        ledBorderSizeInput.disabled = !ledBordersCheckbox.checked;
        ledModuleWInput.disabled = !modulesActive;
        ledModuleHInput.disabled = !modulesActive;
    }

    function syncLedInputs() {
        // Find active mode
        const activeBtn = ledModeToggle.querySelector('.toggle-btn.active');
        const mode = activeBtn ? activeBtn.getAttribute('data-mode') : 'res';

        const tW = parseInt(ledTileWInput.value) || 128;
        const tH = parseInt(ledTileHInput.value) || 128;

        if (mode === 'res') {
            // Calculator: Update Cols/Rows based on W/H
            const w = parseInt(ledWallWInput.value) || 1920;
            const h = parseInt(ledWallHInput.value) || 1080;
            ledColsInput.value = (w / tW).toFixed(2).replace(/\.00$/, '');
            ledRowsInput.value = (h / tH).toFixed(2).replace(/\.00$/, '');

            groupWallRes.style.opacity = '1';
            groupWallRes.style.pointerEvents = 'auto';
            groupTileCount.style.opacity = '0.5';
            groupTileCount.style.pointerEvents = 'none';
        } else {
            // Calculator: Update W/H based on Cols/Rows
            const cols = parseFloat(ledColsInput.value) || 1;
            const rows = parseFloat(ledRowsInput.value) || 1;
            ledWallWInput.value = Math.round(cols * tW);
            ledWallHInput.value = Math.round(rows * tH);

            groupWallRes.style.opacity = '0.5';
            groupWallRes.style.pointerEvents = 'none';
            groupTileCount.style.opacity = '1';
            groupTileCount.style.pointerEvents = 'auto';
        }
    }

    downloadLedBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `led-pattern-grid-${ledCanvas.width}x${ledCanvas.height}.png`;
        link.href = ledCanvas.toDataURL('image/png');
        link.click();
    });

    function getLedSettings() {
        return {
            mode: ledModeToggle.querySelector('.toggle-btn.active').getAttribute('data-mode'),
            wallW: ledWallWInput.value,
            wallH: ledWallHInput.value,
            cols: ledColsInput.value,
            rows: ledRowsInput.value,
            tileW: ledTileWInput.value,
            tileH: ledTileHInput.value,
            rainbow: ledRainbowCheckbox.checked,
            checkerboard: true,
            checkerPalette: ledCheckerPaletteSelect.value,
            borders: ledBordersCheckbox.checked,
            borderSize: ledBorderSizeInput.value,
            numbering: ledNumberingSelect.value,
            coords: ledCoordsSelect.value,
            color: ledColorInput.value,
            showModules: ledShowModulesCheckbox.checked,
            moduleW: ledModuleWInput.value,
            moduleH: ledModuleHInput.value
        };
    }

    function setLedSettings(s) {
        if (s.mode) {
            ledModeBtns.forEach(b => {
                if (b.getAttribute('data-mode') === s.mode) b.classList.add('active');
                else b.classList.remove('active');
            });
            updateToggleSlider();
        }
        ledWallWInput.value = s.wallW;
        ledWallHInput.value = s.wallH;
        if (s.cols) ledColsInput.value = s.cols;
        if (s.rows) ledRowsInput.value = s.rows;

        ledTileWInput.value = s.tileW;
        ledTileHInput.value = s.tileH;
        ledRainbowCheckbox.checked = s.rainbow;
        ledCheckerPaletteSelect.value = (s.checkerPalette === 'color-black') ? 'color-dual' : (s.checkerPalette || 'color-dual');
        ledBordersCheckbox.checked = s.borders === undefined ? true : s.borders;
        ledBorderSizeInput.value = s.borderSize || 1;
        ledNumberingSelect.value = s.numbering || 'row-col';
        ledCoordsSelect.value = s.coords || 'center';
        ledColorInput.value = s.color;
        ledShowModulesCheckbox.checked = Boolean(s.showModules);
        const tileW = parseInt(s.tileW) || parseInt(ledTileWInput.value) || 128;
        const tileH = parseInt(s.tileH) || parseInt(ledTileHInput.value) || 128;
        ledModuleWInput.value = s.moduleW || Math.max(1, Math.round(tileW / 2));
        ledModuleHInput.value = s.moduleH || Math.max(1, Math.round(tileH / 2));
        updateLedOptionStates();
        drawLedPattern();
    }

    function toLetters(num) {
        let s = '';
        while (num > 0) {
            let rem = (num - 1) % 26;
            s = String.fromCharCode(65 + rem) + s;
            num = Math.floor((num - 1) / 26);
        }
        return s;
    }

    function drawLedPattern() {
        syncLedInputs(); // Ensure values are consistent before drawing based on mode

        const w = parseInt(ledWallWInput.value) || 1920;
        const h = parseInt(ledWallHInput.value) || 1080;
        const tW = parseInt(ledTileWInput.value) || 128;
        const tH = parseInt(ledTileHInput.value) || 128;
        const useRainbow = ledRainbowCheckbox.checked;
        const useCheckerboard = true;
        const checkerPalette = ledCheckerPaletteSelect.value;
        const useBorders = ledBordersCheckbox.checked;
        const borderSize = Math.max(0.5, parseFloat(ledBorderSizeInput.value) || 1);
        const baseColor = ledColorInput.value;
        const numbering = ledNumberingSelect.value;
        const coordsMode = ledCoordsSelect.value;
        const showModules = ledShowModulesCheckbox.checked;
        const moduleW = Math.max(1, parseInt(ledModuleWInput.value) || 96);
        const moduleH = Math.max(1, parseInt(ledModuleHInput.value) || 96);
        const fillTiles = true;

        ledCanvas.width = w;
        ledCanvas.height = h;

        ledCtx.fillStyle = '#000000';
        ledCtx.fillRect(0, 0, w, h);

        const cols = Math.floor(w / tW);
        const rows = Math.floor(h / tH);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * tW;
                const y = r * tH;

                let color = baseColor;
                let rainbowHue = 0;
                if (useRainbow) {
                    // Two-axis rainbow by tile index for stable cabinet colors
                    const xRatio = cols > 1 ? (c / (cols - 1)) : 0;
                    const yRatio = rows > 1 ? (r / (rows - 1)) : 0;
                    rainbowHue = ((xRatio * 0.7) + (yRatio * 0.3)) * 360;
                    color = `hsl(${rainbowHue}, 95%, 48%)`;
                }

                const isCheckerDarkCell = (r + c) % 2 === 1;
                let tileFillColor = color;

                if (useCheckerboard) {
                    if (checkerPalette === 'gray-white') {
                        tileFillColor = isCheckerDarkCell ? '#5f5f5f' : '#d0d0d0';
                    } else if (useRainbow) {
                        tileFillColor = isCheckerDarkCell
                            ? `hsl(${rainbowHue}, 85%, 32%)`
                            : `hsl(${rainbowHue}, 95%, 58%)`;
                    } else {
                        const checkerPair = getCheckerColorPair(color);
                        tileFillColor = isCheckerDarkCell ? checkerPair.dark : checkerPair.light;
                    }
                }

                if (fillTiles) {
                    // Fill Background
                    ledCtx.fillStyle = tileFillColor;
                    ledCtx.fillRect(x, y, tW, tH);

                    // Module checkerboard + grid (drawn before border so border stays on top)
                    if (showModules) {
                        drawModuleGrid(x, y, tW, tH, moduleW, moduleH, tileFillColor);
                    }

                    // Border (drawn after modules so it isn't covered)
                    if (useBorders) {
                        ledCtx.strokeStyle = checkerPalette === 'gray-white' ? 'rgba(20, 20, 20, 0.85)' : 'rgba(255, 255, 255, 0.35)';
                        drawTileBorder(x, y, tW, tH, borderSize);
                    }

                    // Text (White with black outline for visibility)
                    if (useCheckerboard && checkerPalette === 'gray-white') {
                        if (isCheckerDarkCell) {
                            ledCtx.fillStyle = '#f5f5f5';
                            ledCtx.strokeStyle = '#121212';
                        } else {
                            ledCtx.fillStyle = '#121212';
                            ledCtx.strokeStyle = '#f5f5f5';
                        }
                    } else {
                        ledCtx.fillStyle = '#FFFFFF';
                        ledCtx.strokeStyle = '#000000';
                    }

                    ledCtx.lineWidth = 3;
                } else {
                    // Outline Only
                    if (showModules) {
                        drawModuleGrid(x, y, tW, tH, moduleW, moduleH, tileFillColor);
                    }

                    if (useBorders) {
                        ledCtx.strokeStyle = color;
                        drawTileBorder(x, y, tW, tH, borderSize);
                    }

                    ledCtx.fillStyle = color;
                    // No text stroke needed
                    ledCtx.strokeStyle = 'rgba(0,0,0,0)';
                }

                // Determine Text Content
                let mainText = '';
                if (numbering === 'row-col') mainText = `${r + 1}-${c + 1}`;
                else if (numbering === 'a-1') mainText = `${toLetters(r + 1)}-${c + 1}`;
                else if (numbering === '1-a') mainText = `${r + 1}-${toLetters(c + 1)}`;
                else if (numbering === 'a-a') mainText = `${toLetters(r + 1)}-${toLetters(c + 1)}`;
                else if (numbering === 'global-h') mainText = `${r * cols + c + 1}`;
                else if (numbering === 'global-v') mainText = `${c * rows + r + 1}`;

                // Draw Main Text (Always Center)
                const cx = x + tW / 2;
                const cy = y + tH / 2;

                if (mainText) {
                    ledCtx.font = `${Math.min(tW, tH) / 4}px Inter, sans-serif`;
                    ledCtx.textAlign = 'center';
                    ledCtx.textBaseline = 'middle';

                    if (fillTiles) ledCtx.strokeText(mainText, cx, cy);
                    ledCtx.fillText(mainText, cx, cy);
                }

                // Draw Coordinates
                if (coordsMode !== 'none') {
                    let displayX = x;
                    let displayY = y;

                    if (coordsMode === 'bl') {
                        // Bottom-Left origin (Y grows Up)
                        // Canvas Y is from top, so h - (y + tH) gives bottom-left corner Y in BL system
                        displayY = h - (y + tH);
                    } else if (coordsMode === 'center') {
                        // Center origin (0,0 at center, Y grows Up)
                        displayX = x - w / 2;
                        displayY = h / 2 - (y + tH); // Y from center, inverted for Y-up
                    }

                    const coordText = `X:${Math.round(displayX)} Y:${Math.round(displayY)}`;
                    ledCtx.font = `${Math.min(tW, tH) / 8}px Inter, sans-serif`;
                    ledCtx.textAlign = 'center';
                    ledCtx.textBaseline = 'middle';

                    const textY = mainText ? cy + tH / 4 : cy; // Push down if main text exists

                    if (fillTiles) ledCtx.strokeText(coordText, cx, textY);
                    ledCtx.fillText(coordText, cx, textY);
                }
            }
        }

        // Draw hatched remainder
        // Offset slightly to avoid overlapping the border of the last full tile?
        // If we draw rectangles at x,y with size tW,tH, they consume [x, x+tW).
        // The hatched area starts at fullW.
        // However, strokeRect with x+0.5 is centered on pixel boundary? No, strokeRect is centered on path.
        // If lineWidth is 1, it draws from -0.5 to +0.5 around the path.
        // Our tiles end at fullW. The last tile's right edge is at fullW.
        // If we draw hatched area from fullW, it should be fine.
        // But maybe let's add gap? Or just ensure z-order?
        // We draw tiles first. Then hatched area.
        // So hatched area will draw over any border spill?
        // Let's create a 1px gap between tiles and hatched area to be safe.

        const fullW = cols * tW;
        const fullH = rows * tH;

        // Shift start position by 1 pixel to avoid overdrawing the last tile's border
        if (fullW < w) drawHatchedArea(fullW, 0, w - fullW, h);
        if (fullH < h) drawHatchedArea(0, fullH, fullW, h - fullH);
    }

    function drawModuleGrid(x, y, tileW, tileH, moduleW, moduleH, tileFillColor) {
        if (moduleW <= 0 || moduleH <= 0) return;

        ledCtx.save();

        // Checkerboard fill for alternating module cells
        const modCols = Math.ceil(tileW / moduleW);
        const modRows = Math.ceil(tileH / moduleH);
        const dimmedColor = dimColorCSS(tileFillColor, 0.85);

        for (let mr = 0; mr < modRows; mr++) {
            for (let mc = 0; mc < modCols; mc++) {
                if ((mr + mc) % 2 === 1) {
                    const mx = x + mc * moduleW;
                    const my = y + mr * moduleH;
                    const mw = Math.min(moduleW, tileW - mc * moduleW);
                    const mh = Math.min(moduleH, tileH - mr * moduleH);
                    ledCtx.fillStyle = dimmedColor;
                    ledCtx.fillRect(mx, my, mw, mh);
                }
            }
        }

        // Grid lines on top
        ledCtx.beginPath();

        for (let mx = moduleW; mx < tileW; mx += moduleW) {
            ledCtx.moveTo(x + mx + 0.5, y);
            ledCtx.lineTo(x + mx + 0.5, y + tileH);
        }

        for (let my = moduleH; my < tileH; my += moduleH) {
            ledCtx.moveTo(x, y + my + 0.5);
            ledCtx.lineTo(x + tileW, y + my + 0.5);
        }

        ledCtx.lineWidth = 2;
        ledCtx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
        ledCtx.stroke();

        ledCtx.lineWidth = 1;
        ledCtx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ledCtx.stroke();
        ledCtx.restore();
    }

    function drawTileBorder(x, y, tileW, tileH, borderSize) {
        const line = Math.min(borderSize, tileW, tileH);
        const inset = line / 2;
        const borderW = Math.max(0, tileW - line);
        const borderH = Math.max(0, tileH - line);

        ledCtx.lineWidth = line;
        ledCtx.strokeRect(x + inset, y + inset, borderW, borderH);
    }

    // Dims any CSS color string (hex, rgb, hsl, etc.) by a factor (0-1)
    function dimColorCSS(cssColor, factor) {
        const f = Math.min(1, Math.max(0, factor));
        // Use the canvas context to parse any CSS color format
        ledCtx.save();
        ledCtx.fillStyle = cssColor;
        const parsed = ledCtx.fillStyle; // browser normalises to hex or rgb
        ledCtx.restore();

        let r, g, b;
        if (parsed.startsWith('#')) {
            r = parseInt(parsed.slice(1, 3), 16);
            g = parseInt(parsed.slice(3, 5), 16);
            b = parseInt(parsed.slice(5, 7), 16);
        } else {
            const m = parsed.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
            if (m) { r = +m[1]; g = +m[2]; b = +m[3]; }
            else { return cssColor; } // fallback: return unchanged
        }
        return `rgb(${Math.round(r * f)}, ${Math.round(g * f)}, ${Math.round(b * f)})`;
    }

    function dimColor(color, factor) {
        const f = Math.min(1, Math.max(0, factor));
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        const dr = Math.round(r * f);
        const dg = Math.round(g * f);
        const db = Math.round(b * f);

        return `rgb(${dr}, ${dg}, ${db})`;
    }

    function lightenColor(color, amount) {
        const a = Math.min(1, Math.max(0, amount));
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        const lr = Math.round(r + ((255 - r) * a));
        const lg = Math.round(g + ((255 - g) * a));
        const lb = Math.round(b + ((255 - b) * a));

        return `rgb(${lr}, ${lg}, ${lb})`;
    }

    function getCheckerColorPair(baseColor) {
        return {
            light: lightenColor(baseColor, 0.2),
            dark: dimColor(baseColor, 0.55)
        };
    }

    function drawHatchedArea(x, y, w, h) {
        if (w <= 0 || h <= 0) return;
        ledCtx.save();
        ledCtx.beginPath();
        ledCtx.rect(x, y, w, h);
        ledCtx.clip();

        // Background
        ledCtx.fillStyle = '#111111';
        ledCtx.fillRect(x, y, w, h);

        // Diagonal Lines
        ledCtx.strokeStyle = '#444444';
        ledCtx.lineWidth = 1;
        ledCtx.beginPath();

        const spacing = 15;
        const startX = x - h;
        const endX = x + w;

        for (let i = startX; i < endX; i += spacing) {
            ledCtx.moveTo(i, y);
            ledCtx.lineTo(i + h, y + h);
        }
        ledCtx.stroke();
        ledCtx.restore();
    }

    generateLedBtn.addEventListener('click', drawLedPattern);
    ledRainbowCheckbox.addEventListener('change', drawLedPattern);
    ledBordersCheckbox.addEventListener('change', () => {
        updateLedOptionStates();
        drawLedPattern();
    });
    ledBorderSizeInput.addEventListener('input', drawLedPattern);
    ledNumberingSelect.addEventListener('change', drawLedPattern);
    ledCoordsSelect.addEventListener('change', drawLedPattern);
    ledColorInput.addEventListener('input', drawLedPattern);
    ledCheckerPaletteSelect.addEventListener('change', drawLedPattern);
    ledShowModulesCheckbox.addEventListener('change', () => {
        updateLedOptionStates();
        drawLedPattern();
    });
    [ledModuleWInput, ledModuleHInput].forEach(i => i.addEventListener('input', drawLedPattern));

    function updateToggleSlider() {
        const activeBtn = ledModeToggle.querySelector('.toggle-btn.active');
        const slider = ledModeToggle.querySelector('.toggle-slider');

        if (activeBtn && slider) {
            slider.style.width = `${activeBtn.offsetWidth}px`;
            slider.style.left = `${activeBtn.offsetLeft}px`;
        }
    }

    // Mode switching listeners
    ledModeBtns.forEach(btn => btn.addEventListener('click', () => {
        ledModeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateToggleSlider();
        syncLedInputs();
        drawLedPattern();
    }));

    window.addEventListener('resize', updateToggleSlider);

    // Initial slider position with small delay to ensure layout is ready
    setTimeout(updateToggleSlider, 50);

    // Input listeners that trigger sync
    [ledWallWInput, ledWallHInput].forEach(i => i.addEventListener('input', () => {
        const mode = ledModeToggle.querySelector('.toggle-btn.active').getAttribute('data-mode');
        if (mode === 'res') {
            syncLedInputs(); // Updates disabled cols/rows for display
            // Debounce draw? For now direct draw is fine
            // But simpler: drawLedPattern calls syncLedInputs first.
            // So we define listener to just call drawLedPattern?
            // No, drawLedPattern reads from inputs.
            // If I type in Wall W, syncLedInputs updates Cols.
        }
        drawLedPattern();
    }));

    [ledColsInput, ledRowsInput].forEach(i => i.addEventListener('input', () => {
        const mode = ledModeToggle.querySelector('.toggle-btn.active').getAttribute('data-mode');
        if (mode === 'count') {
            // syncLedInputs logic is called inside drawLedPattern anyway? 
            // Yes, but we need it to update the Wall W/H input values visually immediately.
            // syncLedInputs() does that.
            // Actually syncLedInputs relies on mode.
            syncLedInputs();
        }
        drawLedPattern();
    }));

    [ledTileWInput, ledTileHInput].forEach(i => i.addEventListener('input', drawLedPattern));

    // Initial sync
    syncLedInputs();
    updateLedOptionStates();

    // Initial draws
    document.fonts.ready.then(() => {
        updateToggleSlider();
        drawPattern();
        drawLedPattern();
    });
});
