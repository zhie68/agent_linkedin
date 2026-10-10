/* ==========================================================================
   2D VIRTUAL OFFICE ENGINE — TECH PULSE AI HQ
   Interactive 2D Virtual Office with Walking Characters & Autonomous AI Life
   ========================================================================== */

// --- 1. Sound Synthesizer (Web Audio API) ---
class SoundEffects {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.lastFootstep = 0;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch (e) {}
    }

    playFootstep() {
        if (!this.enabled) return;
        const now = Date.now();
        if (now - this.lastFootstep < 220) return; // limit footstep frequency
        this.lastFootstep = now;

        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const pitch = 140 + Math.random() * 40;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.04);
            gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        } catch (e) {}
    }

    playSelect() {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {}
    }

    playRadarBeep() {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
            osc.frequency.setValueAtTime(1600, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.2);
        } catch (e) {}
    }

    playSuccessChime() {
        if (!this.enabled) return;
        this.init();
        try {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);
                gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.07);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.28);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + idx * 0.07);
                osc.stop(this.ctx.currentTime + idx * 0.07 + 0.28);
            });
        } catch (e) {}
    }

    playTypingSound() {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const freqs = [1000, 1200, 1100, 950, 1300];
            const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];
            osc.type = 'square';
            osc.frequency.setValueAtTime(randomFreq, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.03);
        } catch (e) {}
    }

    playHandover() {
        if (!this.enabled) return;
        this.init();
        try {
            const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);
                gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.22);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + idx * 0.05);
                osc.stop(this.ctx.currentTime + idx * 0.05 + 0.22);
            });
        } catch (e) {}
    }
}

const sfx = new SoundEffects();

// --- 2. Office Canvas 2D Engine ---
class Office2DEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.frame = 0;
        this.selectedAgentKey = 'boss';
        this.isPipelineRunning = false;

        // Desks & Station POIs
        this.stations = {
            scout: { x: 160, y: 200, name: "Radar Scanner", color: "#3b82f6" },
            pulse: { x: 450, y: 200, name: "Gemini AI Studio", color: "#a855f7" },
            link: { x: 740, y: 200, name: "LinkedIn Hub", color: "#06b6d4" },
            boss: { x: 450, y: 440, name: "Chief Desk", color: "#10b981" },
            coffee: { x: 920, y: 440, name: "Coffee Lounge", color: "#f59e0b" },
            water: { x: 870, y: 260, name: "Water Cooler", color: "#38bdf8" },
            hologram: { x: 450, y: 130, name: "Gemini Core", color: "#c084fc" },
            server: { x: 740, y: 130, name: "LinkedIn Racks", color: "#22d3ee" },
            whiteboard: { x: 300, y: 80, name: "Kanban Board", color: "#e2e8f0" }
        };

        // 4 Dedicated Characters
        this.agents = {
            scout: {
                name: "Scout",
                role: "RSS Radar",
                x: 160,
                y: 220,
                targetX: 160,
                targetY: 220,
                homeX: 160,
                homeY: 220,
                speed: 2.8,
                facing: "right",
                isWalking: false,
                walkCycle: 0,
                blinkTimer: 0,
                activity: "working",
                idleTimer: 0,
                color: "#3b82f6",
                suitColor: "#1d4ed8",
                pantsColor: "#1e293b",
                hairColor: "#38bdf8",
                skinColor: "#fed7aa",
                emoji: "📡",
                statusText: "Scanning Feeds",
                progress: 0,
                carryingItem: null,
                onArrival: null
            },
            pulse: {
                name: "Pulse",
                role: "Gemini AI",
                x: 450,
                y: 220,
                targetX: 450,
                targetY: 220,
                homeX: 450,
                homeY: 220,
                speed: 2.8,
                facing: "right",
                isWalking: false,
                walkCycle: 0,
                blinkTimer: 0,
                activity: "working",
                idleTimer: 0,
                color: "#a855f7",
                suitColor: "#7e22ce",
                pantsColor: "#18181b",
                hairColor: "#e9d5ff",
                skinColor: "#fde047",
                emoji: "✨",
                statusText: "Gemini Standby",
                progress: 0,
                carryingItem: null,
                onArrival: null
            },
            link: {
                name: "Link",
                role: "Publisher",
                x: 740,
                y: 220,
                targetX: 740,
                targetY: 220,
                homeX: 740,
                homeY: 220,
                speed: 2.8,
                facing: "left",
                isWalking: false,
                walkCycle: 0,
                blinkTimer: 0,
                activity: "working",
                idleTimer: 0,
                color: "#06b6d4",
                suitColor: "#0891b2",
                pantsColor: "#1e293b",
                hairColor: "#67e8f9",
                skinColor: "#fed7aa",
                emoji: "💼",
                statusText: "REST v2 Ready",
                progress: 0,
                carryingItem: null,
                onArrival: null
            },
            boss: {
                name: "Boss",
                role: "Chief Leader",
                x: 450,
                y: 460,
                targetX: 450,
                targetY: 460,
                homeX: 450,
                homeY: 460,
                speed: 3.0,
                facing: "up",
                isWalking: false,
                walkCycle: 0,
                blinkTimer: 0,
                activity: "commanding",
                idleTimer: 0,
                color: "#10b981",
                suitColor: "#047857",
                pantsColor: "#0f172a",
                hairColor: "#6ee7b7",
                skinColor: "#fed7aa",
                emoji: "👑",
                statusText: "Commanding HQ",
                progress: 0,
                carryingItem: null,
                onArrival: null
            }
        };

        // Waypoints & Visual Particles
        this.waypoints = [];
        this.particles = [];
        this.steamParticles = [];
        this.dataPackets = [];
        this.handoverParticles = [];
        this.activeMission = { activeStation: null, label: 'HQ Standby', percent: 0 };

        // 1. Visual Pipeline State & Conveyor Packets
        this.conveyorPackets = [
            { segment: 0, progress: 0.2, icon: '📄', label: 'News Feed' },
            { segment: 1, progress: 0.6, icon: '💡', label: 'AI Draft' },
            { segment: 2, progress: 0.85, icon: '💼', label: 'Auth Token' }
        ];

        // 2. Room State & Error Simulation
        // 1. Camera Zoom & Pan System
        this.camera = { x: 0, y: 0, scale: 1.0, minScale: 0.65, maxScale: 2.2 };
        this.isPanning = false;
        this.panStartX = 0;
        this.panStartY = 0;
        this.hasMovedSignificantly = false;

        // 2. Retro Radar Minimap
        this.minimapCanvas = document.getElementById("minimapCanvas");
        this.minimapCtx = this.minimapCanvas ? this.minimapCanvas.getContext("2d") : null;

        // 3. Time-Travel Replay System
        this.isReplayMode = false;
        this.replaySnapshot = null;
        this.replaySpeed = 1;
        this.isPlayingReplay = false;
        this.replayInterval = null;
        this.historySnapshots = [];
        this.initHistoricalSnapshots();

        // 4. Spatial Workflow Builder & Node-Graph Mode
        this.isBuilderMode = false;
        this.activeCableDrag = null; // { fromStation, currentX, currentY }
        this.customStations = {};
        this.customConduits = [
            { from: 'scout', to: 'pulse', color: '#3b82f6' },
            { from: 'pulse', to: 'boss', color: '#a855f7' },
            { from: 'boss', to: 'link', color: '#06b6d4' }
        ];

        // 5. Co-Working Dynamics & Lounge Break
        this.idleSeconds = 0;
        this.isLoungeBreakActive = false;

        // Setup Interaction
        this.setupCanvasInteractions();
        this.startLoop();
        this.startAutonomousLife();
    }

    initHistoricalSnapshots() {
        this.historySnapshots = [];
        const now = Date.now();
        const milestones = [
            { minAgo: 30, label: "Scout Scanning 9 RSS Feeds", mission: "Scanning RSS Feeds", progress: 35, pulseProg: 0, bossProg: 0, linkProg: 0, state: "processing", packetSeg: 0 },
            { minAgo: 24, label: "Scout Handover Berkas Riset ke Pulse", mission: "Handover Berkas Riset", progress: 100, pulseProg: 15, bossProg: 0, linkProg: 0, state: "processing", packetSeg: 0 },
            { minAgo: 18, label: "Pulse Menganalisis & Prompt Gemini Flash", mission: "Gemini Synthesis Core", progress: 100, pulseProg: 55, bossProg: 0, linkProg: 0, state: "processing", packetSeg: 1 },
            { minAgo: 14, label: "Gemini AI Menyelesaikan Draf Konten", mission: "Draft Generated (541 tok)", progress: 100, pulseProg: 100, bossProg: 0, linkProg: 0, state: "processing", packetSeg: 1 },
            { minAgo: 10, label: "Pulse Menyerahkan Naskah ke Chief Editor", mission: "Handover Naskah ke Boss", progress: 100, pulseProg: 100, bossProg: 30, linkProg: 0, state: "processing", packetSeg: 1 },
            { minAgo: 6, label: "Station 4: Chief Approval Gate (Holding)", mission: "Waiting Approval ⚠️", progress: 100, pulseProg: 100, bossProg: 50, linkProg: 0, state: "standby", waitingApproval: true, packetSeg: 1 },
            { minAgo: 3, label: "Human Editor Mengesahkan Naskah", mission: "Approved by Human ✅", progress: 100, pulseProg: 100, bossProg: 100, linkProg: 40, state: "processing", approvedPublishing: true, packetSeg: 2 },
            { minAgo: 1, label: "Link Menyiarkan ke LinkedIn REST v2", mission: "Broadcasting LinkedIn", progress: 100, pulseProg: 100, bossProg: 100, linkProg: 90, state: "processing", approvedPublishing: true, packetSeg: 2 },
            { minAgo: 0, label: "Real-Time Live HQ Standby", mission: "HQ Standby", progress: 0, pulseProg: 0, bossProg: 0, linkProg: 0, state: "standby", packetSeg: 0 }
        ];

        milestones.forEach((m) => {
            const timeStr = m.minAgo === 0 ? "LIVE" : `-${m.minAgo}:00`;
            this.historySnapshots.push({
                timestamp: now - m.minAgo * 60 * 1000,
                timeString: timeStr,
                label: m.label,
                roomState: m.state,
                isWaitingApproval: Boolean(m.waitingApproval),
                isApprovedPublishing: Boolean(m.approvedPublishing),
                activeMission: { label: m.mission, percent: m.pulseProg || m.progress || 0 },
                agents: {
                    scout: { x: 160, y: 220, progress: m.progress, statusText: m.progress > 0 ? "Scraping" : "Ready", activity: "working" },
                    pulse: { x: 450, y: 220, progress: m.pulseProg, statusText: m.pulseProg > 0 ? "Gemini AI" : "Standby", activity: "working" },
                    boss: { x: 450, y: 460, progress: m.bossProg, statusText: m.waitingApproval ? "Waiting Approval" : "Commanding", activity: "commanding" },
                    link: { x: 740, y: 220, progress: m.linkProg, statusText: m.linkProg > 0 ? "Broadcasting" : "Auth Ready", activity: "working" }
                }
            });
        });
    }

    setupCanvasInteractions() {
        // 1. Mouse Wheel Zoom centered on cursor
        this.canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const mouseX = (e.clientX - rect.left) * scaleX;
            const mouseY = (e.clientY - rect.top) * scaleY;

            const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
            const newScale = Math.max(this.camera.minScale, Math.min(this.camera.maxScale, this.camera.scale * zoomFactor));

            this.camera.x = mouseX - (mouseX - this.camera.x) * (newScale / this.camera.scale);
            this.camera.y = mouseY - (mouseY - this.camera.y) * (newScale / this.camera.scale);
            this.camera.scale = newScale;

            const coordEl = document.getElementById("minimapCoords");
            if (coordEl) coordEl.textContent = `Zoom ${newScale.toFixed(1)}x`;
        }, { passive: false });

        // 2. Mouse Down (Panning or Cable Dragging)
        this.canvas.addEventListener("mousedown", (e) => {
            sfx.init();
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const screenX = (e.clientX - rect.left) * scaleX;
            const screenY = (e.clientY - rect.top) * scaleY;

            const worldX = (screenX - this.camera.x) / this.camera.scale;
            const worldY = (screenY - this.camera.y) / this.camera.scale;

            this.hasMovedSignificantly = false;

            // In Builder Mode: Check if clicking a station's connection port
            if (this.isBuilderMode) {
                const allStations = { ...this.stations, ...this.customStations };
                let hitStation = null;
                Object.keys(allStations).forEach(k => {
                    const st = allStations[k];
                    // Output port on right side of desk
                    if (Math.hypot(worldX - (st.x + 45), worldY - st.y) < 22) {
                        hitStation = k;
                    }
                });
                if (hitStation) {
                    this.activeCableDrag = { fromStation: hitStation, currentX: worldX, currentY: worldY };
                    sfx.playClick();
                    return;
                }
            }

            // Normal Pan start (drag on background or middle button or spacebar)
            this.isPanning = true;
            this.panStartX = e.clientX - this.camera.x;
            this.panStartY = e.clientY - this.camera.y;
        });

        // 3. Mouse Move (Panning or Cable Tip Update)
        window.addEventListener("mousemove", (e) => {
            if (this.activeCableDrag) {
                const rect = this.canvas.getBoundingClientRect();
                const scaleX = this.canvas.width / rect.width;
                const scaleY = this.canvas.height / rect.height;
                const screenX = (e.clientX - rect.left) * scaleX;
                const screenY = (e.clientY - rect.top) * scaleY;
                this.activeCableDrag.currentX = (screenX - this.camera.x) / this.camera.scale;
                this.activeCableDrag.currentY = (screenY - this.camera.y) / this.camera.scale;
                return;
            }

            if (this.isPanning) {
                const newX = e.clientX - this.panStartX;
                const newY = e.clientY - this.panStartY;
                if (Math.hypot(newX - this.camera.x, newY - this.camera.y) > 4) {
                    this.hasMovedSignificantly = true;
                }
                this.camera.x = newX;
                this.camera.y = newY;
            }
        });

        // 4. Mouse Up (Drop Cable or Finish Pan)
        window.addEventListener("mouseup", (e) => {
            if (this.activeCableDrag) {
                const rect = this.canvas.getBoundingClientRect();
                const scaleX = this.canvas.width / rect.width;
                const scaleY = this.canvas.height / rect.height;
                const screenX = (e.clientX - rect.left) * scaleX;
                const screenY = (e.clientY - rect.top) * scaleY;
                const worldX = (screenX - this.camera.x) / this.camera.scale;
                const worldY = (screenY - this.camera.y) / this.camera.scale;

                const allStations = { ...this.stations, ...this.customStations };
                let targetStation = null;
                Object.keys(allStations).forEach(k => {
                    const st = allStations[k];
                    if (k !== this.activeCableDrag.fromStation && Math.hypot(worldX - st.x, worldY - st.y) < 55) {
                        targetStation = k;
                    }
                });

                if (targetStation) {
                    // Create or update connection!
                    this.customConduits = this.customConduits.filter(c => !(c.from === this.activeCableDrag.fromStation && c.to === targetStation));
                    this.customConduits.push({
                        from: this.activeCableDrag.fromStation,
                        to: targetStation,
                        color: allStations[this.activeCableDrag.fromStation].color || '#38bdf8'
                    });
                    sfx.playHandover();
                    showToast(`Topologi kabel terhubung: ${this.activeCableDrag.fromStation.toUpperCase()} ➡️ ${targetStation.toUpperCase()}`, "success");
                }
                this.activeCableDrag = null;
            }
            this.isPanning = false;
        });

        // 5. Canvas Click (Agent Selection or Walking Orders)
        this.canvas.addEventListener("click", (e) => {
            if (this.hasMovedSignificantly) return; // Ignore drag release as click

            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const screenX = (e.clientX - rect.left) * scaleX;
            const screenY = (e.clientY - rect.top) * scaleY;

            // Transform into World Coordinates
            const clickX = (screenX - this.camera.x) / this.camera.scale;
            const clickY = (screenY - this.camera.y) / this.camera.scale;

            // Check if clicked directly on an agent
            let clickedAgentKey = null;
            Object.keys(this.agents).forEach(key => {
                const a = this.agents[key];
                const dist = Math.hypot(clickX - a.x, clickY - a.y);
                if (dist < 32) {
                    clickedAgentKey = key;
                }
            });

            if (clickedAgentKey) {
                // If waiting for approval and clicked on Boss, open Chief Review Drawer!
                if (this.isWaitingApproval && clickedAgentKey === 'boss') {
                    openChiefReviewDrawer();
                    return;
                }

                this.selectAgent(clickedAgentKey);
                sfx.playSelect();
                showSpeechBubble(clickedAgentKey, `Ready for orders! Siap jalan 🫡`, 2500);
                return;
            }

            // If waiting for approval and clicked near Chief Desk (x: 450, y: 440)
            const distToBossDesk = Math.hypot(clickX - 450, clickY - 440);
            if (this.isWaitingApproval && distToBossDesk < 55) {
                openChiefReviewDrawer();
                return;
            }

            // Otherwise, order the selected agent to walk to coordinates
            const agent = this.agents[this.selectedAgentKey];
            if (agent) {
                const targetX = Math.max(70, Math.min(this.width - 70, clickX));
                const targetY = Math.max(90, Math.min(this.height - 60, clickY));

                agent.targetX = targetX;
                agent.targetY = targetY;
                agent.activity = "walking";
                agent.statusText = "Walking 🚶";
                agent.idleTimer = 0;

                // Reset idle coffee timer
                this.idleSeconds = 0;

                this.waypoints.push({
                    x: targetX,
                    y: targetY,
                    radius: 4,
                    maxRadius: 28,
                    alpha: 1.0,
                    color: agent.color
                });

                sfx.playClick();
                const travelPhrases = [
                    "Menuju ke lokasi! 📍",
                    "On my way! 🚶‍♂️",
                    "Roger that, bergerak sekarang!",
                    "Heading to coordinates 🧭"
                ];
                const phrase = travelPhrases[Math.floor(Math.random() * travelPhrases.length)];
                showSpeechBubble(this.selectedAgentKey, phrase, 2200);
            }
        });

        // 6. Retro Radar Minimap Click to Pan
        if (this.minimapCanvas) {
            this.minimapCanvas.addEventListener("click", (e) => {
                const rect = this.minimapCanvas.getBoundingClientRect();
                const mx = e.clientX - rect.left;
                const my = e.clientY - rect.top;
                const targetWorldX = (mx / this.minimapCanvas.width) * this.width;
                const targetWorldY = (my / this.minimapCanvas.height) * this.height;

                this.camera.x = (this.width / 2) - targetWorldX * this.camera.scale;
                this.camera.y = (this.height / 2) - targetWorldY * this.camera.scale;
                sfx.playClick();
            });
        }
    }

    selectAgent(agentKey) {
        if (!this.agents[agentKey]) return;
        this.selectedAgentKey = agentKey;

        // Sync UI Sidebar Card Active State
        document.querySelectorAll(".agent-item-card").forEach(card => {
            if (card.getAttribute("data-agent") === agentKey) {
                card.classList.add("selected");
            } else {
                card.classList.remove("selected");
            }
        });
    }

    startLoop() {
        const render = () => {
            this.frame++;
            this.update();
            this.draw();
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }

    update() {
        // 1. Move Agents & update walk animation
        Object.keys(this.agents).forEach(key => {
            const agent = this.agents[key];
            const dx = agent.targetX - agent.x;
            const dy = agent.targetY - agent.y;
            const dist = Math.hypot(dx, dy);

            // Blinking timer
            agent.blinkTimer++;
            if (agent.blinkTimer > 180 + Math.random() * 60) {
                agent.blinkTimer = 0;
            }

            if (dist > 3) {
                agent.isWalking = true;
                agent.walkCycle += 0.24;

                // Determine facing direction
                if (Math.abs(dx) > Math.abs(dy)) {
                    agent.facing = dx > 0 ? "right" : "left";
                } else {
                    agent.facing = dy > 0 ? "down" : "up";
                }

                // Move smoothly
                const step = Math.min(dist, agent.speed);
                agent.x += (dx / dist) * step;
                agent.y += (dy / dist) * step;

                // Play soft footstep audio periodically
                if (Math.floor(agent.walkCycle) % 4 === 0) {
                    sfx.playFootstep();
                }

                // Footstep dust particle
                if (this.frame % 8 === 0) {
                    this.particles.push({
                        x: agent.x + (Math.random() * 6 - 3),
                        y: agent.y + 16,
                        size: 3,
                        alpha: 0.5,
                        life: 20
                    });
                }
            } else {
                // Arrived at destination
                if (agent.isWalking) {
                    agent.isWalking = false;
                    agent.x = agent.targetX;
                    agent.y = agent.targetY;
                    agent.walkCycle = 0;

                    // Trigger arrival callback if registered!
                    if (typeof agent.onArrival === 'function') {
                        const cb = agent.onArrival;
                        agent.onArrival = null;
                        cb();
                    }

                    // Arrived logic
                    if (Math.hypot(agent.x - agent.homeX, agent.y - agent.homeY) < 10) {
                        agent.activity = key === 'boss' ? 'commanding' : 'working';
                        agent.statusText = key === 'boss' ? 'Commanding HQ' : 'Working at Desk';
                    } else if (Math.hypot(agent.x - this.stations.coffee.x, agent.y - this.stations.coffee.y) < 50) {
                        agent.activity = 'coffee';
                        agent.statusText = 'Coffee Break ☕';
                        showSpeechBubble(key, "Ah, kopi hangat yang nikmat! ☕", 3000);
                    } else if (Math.hypot(agent.x - this.stations.water.x, agent.y - this.stations.water.y) < 50) {
                        agent.activity = 'water';
                        agent.statusText = 'Hydration Break 💧';
                        showSpeechBubble(key, "Minum air putih dulu 💧", 2500);
                    }
                }
            }
        });

        // 2. Update Waypoint Rings
        for (let i = this.waypoints.length - 1; i >= 0; i--) {
            const wp = this.waypoints[i];
            wp.radius += 0.8;
            wp.alpha -= 0.025;
            if (wp.alpha <= 0 || wp.radius >= wp.maxRadius) {
                this.waypoints.splice(i, 1);
            }
        }

        // 3. Update Dust Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life--;
            p.alpha -= 0.025;
            p.size += 0.05;
            if (p.life <= 0 || p.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // 4. Update Coffee Steam Particles
        if (this.frame % 15 === 0) {
            this.steamParticles.push({
                x: 935 + (Math.random() * 8 - 4),
                y: 395,
                vy: -0.6 - Math.random() * 0.4,
                vx: Math.random() * 0.3 - 0.15,
                size: 2,
                alpha: 0.7,
                life: 45
            });
        }
        for (let i = this.steamParticles.length - 1; i >= 0; i--) {
            const sp = this.steamParticles[i];
            sp.y += sp.vy;
            sp.x += sp.vx;
            sp.size += 0.08;
            sp.alpha -= 0.015;
            sp.life--;
            if (sp.life <= 0 || sp.alpha <= 0) {
                this.steamParticles.splice(i, 1);
            }
        }

        // 5. Update Data Stream Packets Between Desks
        for (let i = this.dataPackets.length - 1; i >= 0; i--) {
            const dp = this.dataPackets[i];
            dp.progress += 0.035;
            if (dp.progress >= 1.0) {
                this.dataPackets.splice(i, 1);
            }
        }

        // 6. Update Handover Sparkles
        for (let i = this.handoverParticles.length - 1; i >= 0; i--) {
            const p = this.handoverParticles[i];
            p.progress += p.speed;
            if (p.progress >= 1.0) {
                this.handoverParticles.splice(i, 1);
            }
        }

        // 7. Update Conveyor Data File Packets Along Visual Floor Pipeline
        if (this.conveyorPackets) {
            this.conveyorPackets.forEach(p => {
                const speed = (this.roomState === 'processing' ? 0.009 : 0.004);
                p.progress += speed;
                if (p.progress >= 1.0) {
                    p.progress = 0;
                    p.segment = (p.segment + 1) % 3;
                }
            });
        }
    }

    walkAgentToCoords(agentKey, targetX, targetY) {
        return new Promise((resolve) => {
            const agent = this.agents[agentKey];
            if (!agent) return resolve();

            const dist = Math.hypot(agent.x - targetX, agent.y - targetY);
            if (dist <= 5) {
                agent.x = targetX;
                agent.y = targetY;
                agent.targetX = targetX;
                agent.targetY = targetY;
                agent.isWalking = false;
                return resolve();
            }

            agent.targetX = targetX;
            agent.targetY = targetY;
            agent.isWalking = true;
            agent.activity = "walking";
            agent.onArrival = resolve;

            // Add waypoint ripple
            this.waypoints.push({
                x: targetX,
                y: targetY,
                radius: 4,
                maxRadius: 26,
                alpha: 1.0,
                color: agent.color
            });
        });
    }

    emitHandoverSparkles(fromKey, toKey) {
        const from = this.agents[fromKey];
        const to = this.agents[toKey];
        if (!from || !to) return;
        for (let i = 0; i < 28; i++) {
            this.handoverParticles.push({
                x: from.x + (Math.random() * 8 - 4),
                y: from.y - 10 + (Math.random() * 8 - 4),
                targetX: to.x + (Math.random() * 8 - 4),
                targetY: to.y - 10 + (Math.random() * 8 - 4),
                color: from.color,
                secondaryColor: to.color,
                size: 2.8 + Math.random() * 2.5,
                progress: 0,
                speed: 0.032 + Math.random() * 0.022,
                arc: (Math.random() - 0.5) * 50
            });
        }
    }

    drawHandoverParticles() {
        for (let i = this.handoverParticles.length - 1; i >= 0; i--) {
            const p = this.handoverParticles[i];
            const px = p.x + (p.targetX - p.x) * p.progress;
            const py = p.y + (p.targetY - p.y) * p.progress + Math.sin(p.progress * Math.PI) * p.arc;
            const alpha = 1 - p.progress;

            this.ctx.save();
            this.ctx.fillStyle = p.progress < 0.5 ? p.color : p.secondaryColor;
            this.ctx.shadowColor = p.color;
            this.ctx.shadowBlur = 10;
            this.ctx.globalAlpha = Math.max(0, alpha);
            this.ctx.beginPath();
            this.ctx.arc(px, py, p.size * (1 - p.progress * 0.3), 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }

    startAutonomousLife() {
        // Autonomous Office Routine Scheduler (Every 7-9 seconds)
        setInterval(() => {
            if (this.isPipelineRunning || this.isReplayMode) return;

            // Feature 3: Dynamic Bubble Chatter based on real system state
            if (latestTokenData && (latestTokenData.remaining_tokens < 100000 || (latestTokenData.total_tokens && latestTokenData.total_tokens > 900000))) {
                showSpeechBubble("pulse", "Token tipis, bos! Tolong hemat prompt! 🪙💦", 3500);
            } else if (this.stationErrors && this.stationErrors['scout']) {
                showSpeechBubble("scout", "Target website dilindungi Cloudflare, retrying... 🛡️💧", 3500);
            } else if (this.stationErrors && this.stationErrors['link']) {
                showSpeechBubble("link", "Rate limit LinkedIn 429! Cooldown protokol aktif ⏳", 3500);
            } else if (this.isWaitingApproval) {
                showSpeechBubble("boss", "Draf staging siap di meja saya, butuh otorisasi human editor! 👑", 3500);
            }

            // Feature 3: Lounge Break Trigger (After idle period of no pipeline jobs)
            this.idleSeconds += 8;
            if (this.idleSeconds >= 36 && !this.isLoungeBreakActive && !this.isWaitingApproval && !this.isPipelineRunning) {
                this.isLoungeBreakActive = true;
                this.triggerLoungeCoffeeBreak();
                return;
            }

            const agentKeys = ['scout', 'pulse', 'link', 'boss'];
            const randomKey = agentKeys[Math.floor(Math.random() * agentKeys.length)];
            const agent = this.agents[randomKey];

            if (!agent || agent.isWalking) return;

            // If agent is away from home desk and not in lounge gathering, return them back
            if (!this.isLoungeBreakActive) {
                const distToHome = Math.hypot(agent.x - agent.homeX, agent.y - agent.homeY);
                if (distToHome > 30) {
                    agent.targetX = agent.homeX;
                    agent.targetY = agent.homeY;
                    agent.statusText = "Returning to Desk";
                    showSpeechBubble(randomKey, "Kembali ke meja kerja... 💻", 2200);
                    return;
                }
            }

            // Regular office activities
            const actions = [
                () => {
                    agent.targetX = this.stations.coffee.x - 20 + Math.random() * 40;
                    agent.targetY = this.stations.coffee.y + 10;
                    agent.statusText = "Heading for Coffee ☕";
                    showSpeechBubble(randomKey, "Mau ambil kopi dulu ya ☕", 2500);
                },
                () => {
                    agent.targetX = this.stations.water.x;
                    agent.targetY = this.stations.water.y + 25;
                    agent.statusText = "Water Break 💧";
                    showSpeechBubble(randomKey, "Isi tumbler dulu 💧", 2500);
                },
                () => {
                    agent.targetX = this.stations.hologram.x + (Math.random() * 40 - 20);
                    agent.targetY = this.stations.hologram.y + 35;
                    agent.statusText = "Inspecting AI Core ✨";
                    showSpeechBubble(randomKey, "Cek tensor model Gemini 3.8 🔮", 2500);
                },
                () => {
                    agent.targetX = this.stations.server.x + (Math.random() * 40 - 20);
                    agent.targetY = this.stations.server.y + 35;
                    agent.statusText = "Checking Gateway 💼";
                    showSpeechBubble(randomKey, "Cek koneksi LinkedIn REST API 📡", 2500);
                },
                () => {
                    if (randomKey === 'boss') {
                        const targetStation = ['scout', 'pulse', 'link'][Math.floor(Math.random() * 3)];
                        agent.targetX = this.stations[targetStation].x + 40;
                        agent.targetY = this.stations[targetStation].y + 10;
                        agent.statusText = `Inspecting ${targetStation.toUpperCase()}`;
                        showSpeechBubble('boss', `Gimana perkembangannya di stasiun ${targetStation}? 👀`, 2800);
                    } else {
                        const targetDesk = this.stations.boss;
                        agent.targetX = targetDesk.x - 45;
                        agent.targetY = targetDesk.y + 10;
                        showSpeechBubble(randomKey, "Lapor ke Boss dulu sebentar 📋", 2500);
                    }
                }
            ];

            const chosenAction = actions[Math.floor(Math.random() * actions.length)];
            chosenAction();
        }, 8000);
    }

    triggerLoungeCoffeeBreak() {
        addLog("SYSTEM", "☕ Tim mengambil istirahat di Coffee Lounge karena pipeline idle...", "system");
        this.walkAgentToCoords('scout', 890, 480);
        this.agents.scout.statusText = "Lounge Break ☕";

        this.walkAgentToCoords('pulse', 915, 410);
        this.agents.pulse.statusText = "Sipping Coffee ☕";

        this.walkAgentToCoords('link', 870, 260);
        this.agents.link.statusText = "Water Break 💧";

        this.walkAgentToCoords('boss', 940, 455);
        this.agents.boss.statusText = "Team Chat ☕";

        setTimeout(() => showSpeechBubble("boss", "Kerja luar biasa sesi tadi! Rehat sejenak minum kopi hangat ☕", 3500), 2200);
        setTimeout(() => showSpeechBubble("scout", "Kopi robustanya pas banget rasanya ☕", 3000), 4600);
        setTimeout(() => showSpeechBubble("pulse", "Gemini 3.8 Flash standby siap kapan saja dipanggil ✨", 3000), 7200);
    }

    draw() {
        // Clear Background Canvas
        this.ctx.fillStyle = "#0a0f1d";
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Apply Camera Transformation (Pan & Zoom)
        this.ctx.save();
        this.ctx.translate(this.camera.x, this.camera.y);
        this.ctx.scale(this.camera.scale, this.camera.scale);

        // 1. Draw Layered Office Floor Architecture
        this.drawFloorZones();

        // 2. Draw Structural Walls, Windows, Glass Partitions & Columns
        this.drawWallFeatures();

        // 3. Draw Furniture & Stations
        this.drawStationFurniture();

        // Draw Interactive POI Machines
        this.drawRadarDish(this.stations.scout.x, 140);
        this.drawHologram(this.stations.pulse.x, 140);
        this.drawServerRack(this.stations.link.x, 140);
        this.drawCoffeeLounge(850, 360);
        this.drawWaterCooler(this.stations.water.x, this.stations.water.y);

        // Draw Extra Builder Stations if spawned (Imagen, Discord, Twitter)
        this.drawCustomBuilderStations();

        // Draw Waypoint Rings & Dust Particles
        this.drawWaypoints();
        this.drawParticles();
        this.drawHandoverParticles();

        // Draw Active Station Aura Beacon
        if (this.activeMission && this.activeMission.activeStation) {
            this.drawStationBeacon(this.activeMission.activeStation);
        }

        // Draw Data Stream Packets
        this.drawDataPackets();

        // Draw Animated 2D Character Sprites (Sorted by Y for depth layering)
        const agentSource = (this.isReplayMode && this.replaySnapshot) ? this.replaySnapshot.agents : this.agents;
        const sortedAgents = Object.keys(this.agents)
            .map(k => ({ key: k, agent: agentSource[k] || this.agents[k] }))
            .sort((a, b) => a.agent.y - b.agent.y);

        sortedAgents.forEach(({ key, agent }) => {
            this.drawCharacter(key, agent);
        });

        // Builder Mode: Connection Ports & Live Dragging Cable
        if (this.isBuilderMode) {
            this.drawBuilderPortsAndDragging();
        }

        // 4. State-Driven Room Ambient & Workload Lighting
        this.drawRoomAmbientLighting();

        // Restore Camera Transform
        this.ctx.restore();

        // Screen-Space Overlays (HUD, CCTV Replay, Minimap)
        this.drawMissionHUD();

        if (this.isReplayMode) {
            this.drawReplayCCTVOverlay();
        }

        // Retro Radar Minimap
        this.drawRetroRadarMinimap();
    }

    drawRoomAmbientLighting() {
        this.ctx.save();
        if (this.roomState === 'standby') {
            // Ambient Dark Mode (Night / Standby)
            // Soft dark vignette overlay
            this.ctx.fillStyle = "rgba(5, 9, 18, 0.42)";
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Warm Cozy Desk Lamps casting soft ambient pools of light on workstations
            [this.stations.scout, this.stations.pulse, this.stations.link, this.stations.boss, this.stations.coffee].forEach(st => {
                const lampGrad = this.ctx.createRadialGradient(st.x, st.y, 8, st.x, st.y, 85);
                lampGrad.addColorStop(0, "rgba(254, 243, 199, 0.16)");
                lampGrad.addColorStop(0.5, "rgba(254, 215, 170, 0.06)");
                lampGrad.addColorStop(1, "transparent");
                this.ctx.fillStyle = lampGrad;
                this.ctx.beginPath();
                this.ctx.arc(st.x, st.y, 85, 0, Math.PI * 2);
                this.ctx.fill();
            });
        } else {
            // Processing: Bright Daylight / Cyber Studio Illumination with Active Desk Spotlights
            [this.stations.scout, this.stations.pulse, this.stations.link, this.stations.boss].forEach(st => {
                const spotGrad = this.ctx.createRadialGradient(st.x, st.y, 14, st.x, st.y, 115);
                spotGrad.addColorStop(0, `${st.color}26`);
                spotGrad.addColorStop(0.55, `${st.color}0c`);
                spotGrad.addColorStop(1, "transparent");
                this.ctx.fillStyle = spotGrad;
                this.ctx.beginPath();
                this.ctx.arc(st.x, st.y, 115, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }
        this.ctx.restore();
    }

    drawStationBeacon(stationKey) {
        const st = this.stations[stationKey];
        if (!st) return;
        this.ctx.save();
        const pulse = Math.sin(this.frame * 0.1) * 8;
        this.ctx.strokeStyle = st.color;
        this.ctx.lineWidth = 2.5;
        this.ctx.setLineDash([8, 6]);
        this.ctx.lineDashOffset = -this.frame * 0.8;
        this.ctx.beginPath();
        this.ctx.arc(st.x, st.y, 65 + pulse, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.fillStyle = `${st.color}15`;
        this.ctx.fill();

        this.ctx.fillStyle = st.color;
        this.ctx.font = "bold 9px 'Fira Code'";
        this.ctx.textAlign = "center";
        this.ctx.fillText("⚡ SEDANG BERPROSES...", st.x, st.y - 48);
        this.ctx.restore();
    }

    drawDataPackets() {
        this.dataPackets.forEach(dp => {
            if (dp.progress > 0 && dp.progress < 1) {
                const px = dp.startX + (dp.endX - dp.startX) * dp.progress;
                const py = dp.startY + (dp.endY - dp.startY) * dp.progress;
                this.ctx.save();
                this.ctx.fillStyle = dp.color;
                this.ctx.shadowColor = dp.color;
                this.ctx.shadowBlur = 8;
                this.ctx.beginPath();
                this.ctx.arc(px, py, dp.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }
        });
    }

    drawMissionHUD() {
        this.ctx.save();
        const x = 20;
        const y = 52;
        const w = 260;
        const h = 40;

        this.ctx.fillStyle = "rgba(11, 15, 25, 0.85)";
        this.ctx.beginPath();
        this.ctx.roundRect(x, y, w, h, 8);
        this.ctx.fill();
        this.ctx.strokeStyle = "rgba(59, 130, 246, 0.35)";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // Status Dot
        const isBusy = (this.activeMission && this.activeMission.activeStation);
        this.ctx.fillStyle = isBusy ? "#10b981" : "#64748b";
        this.ctx.beginPath();
        this.ctx.arc(x + 14, y + 16, 4, 0, Math.PI * 2);
        this.ctx.fill();

        // Title
        this.ctx.fillStyle = "#e2e8f0";
        this.ctx.font = "bold 9px 'Fira Code'";
        this.ctx.textAlign = "left";
        const label = this.activeMission ? this.activeMission.label : "HQ Standby";
        this.ctx.fillText(label.slice(0, 32), x + 24, y + 19);

        // Mini Progress Bar
        const pct = this.activeMission ? this.activeMission.percent : 0;
        this.ctx.fillStyle = "#1e293b";
        this.ctx.fillRect(x + 12, y + 25, w - 24, 5);
        this.ctx.fillStyle = "#3b82f6";
        this.ctx.fillRect(x + 12, y + 25, (w - 24) * (pct / 100), 5);

        this.ctx.restore();
    }

    drawPixelTileFloor(startX, startY, w, h) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(startX, startY, w, h);
        this.ctx.clip(); // Constrain within main hall

        const tileSize = 28; // Small retro 2D pixel square tiles
        const cols = Math.ceil(w / tileSize);
        const rows = Math.ceil(h / tileSize);

        // Neutral Muted Pixel Palette (Muted Blue-Grey / Slate / Sand-Grey)
        const tileColorA = "#242f3d"; // Primary muted blue-grey
        const tileColorB = "#283545"; // Subtle alternating slate
        const tileColorC = "#263241"; // Worn sand-slate variant
        const groutColor = "#161f2b"; // 1px dark retro grout seam
        const highlightColor = "rgba(255, 255, 255, 0.055)"; // 1px pixel edge specular

        // 1. Draw Flat Matte 2D Pixel Tiles Grid
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const tx = startX + c * tileSize;
                const ty = startY + r * tileSize;
                const tw = Math.min(tileSize, startX + w - tx);
                const th = Math.min(tileSize, startY + h - ty);

                // Checker / subtle stone variation
                const isEven = (c + r) % 2 === 0;
                const seed = Math.sin(c * 17.3 + r * 43.7) * 1000;
                const rand = seed - Math.floor(seed);

                let fill = isEven ? tileColorA : tileColorB;
                if (rand > 0.82) fill = tileColorC; // subtle worn variation

                // Tile base
                this.ctx.fillStyle = fill;
                this.ctx.fillRect(tx, ty, tw, th);

                // Top & Left 1px Pixel Highlight
                this.ctx.fillStyle = highlightColor;
                this.ctx.fillRect(tx, ty, tw, 1);
                this.ctx.fillRect(tx, ty, 1, th);

                // Bottom & Right 1px Dark Grout
                this.ctx.fillStyle = groutColor;
                this.ctx.fillRect(tx, ty + th - 1, tw, 1);
                this.ctx.fillRect(tx + tw - 1, ty, 1, th);

                // Subtle Worn Texture Specks on ~8% of tiles (Retro Pixel Art Feel)
                if (rand > 0.92 && tw >= 16 && th >= 16) {
                    this.ctx.fillStyle = "rgba(15, 22, 33, 0.4)";
                    this.ctx.fillRect(tx + 6, ty + 8, 2, 2);
                    this.ctx.fillRect(tx + 18, ty + 16, 2, 2);
                }
            }
        }

        // 2. Functional Environment Shadows (Bayangan Halus di Bawah Dinding)
        // North Wall Drop Shadow
        const northShadow = this.ctx.createLinearGradient(startX, startY, startX, startY + 16);
        northShadow.addColorStop(0, "rgba(0, 0, 0, 0.55)");
        northShadow.addColorStop(1, "transparent");
        this.ctx.fillStyle = northShadow;
        this.ctx.fillRect(startX, startY, w, 16);

        // West Wall Drop Shadow
        const westShadow = this.ctx.createLinearGradient(startX, startY, startX + 14, startY);
        westShadow.addColorStop(0, "rgba(0, 0, 0, 0.5)");
        westShadow.addColorStop(1, "transparent");
        this.ctx.fillStyle = westShadow;
        this.ctx.fillRect(startX, startY, 14, h);

        // Wood Partition Wall Shadows (Divisi 1-2 & 2-3)
        [246, 460].forEach(px => {
            const partShadow = this.ctx.createLinearGradient(px, startY, px + 10, startY);
            partShadow.addColorStop(0, "rgba(0, 0, 0, 0.45)");
            partShadow.addColorStop(1, "transparent");
            this.ctx.fillStyle = partShadow;
            this.ctx.fillRect(px, startY, 10, 185);
        });

        // 3. Functional Small Floor Cables in Tile Grout Seams
        this.drawGroutCables(startX, startY);

        // 4. Natural Doorway Threshold at Glass Lounge Transition (x: 818 to 825)
        this.drawDoorwayThreshold(818, 245, 6, h - (245 - startY));

        this.ctx.restore();
    }

    drawPixelCarpet(x, y, w, h, config) {
        const { baseColor, patternColor, borderColor, secondBorder = null, label = null } = config;
        this.ctx.save();

        // 1. Soft Drop Shadow Under Carpet (Zonasi Depth)
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        this.ctx.fillRect(x + 3, y + 3, w, h);

        // 2. Base Carpet Body
        this.ctx.fillStyle = baseColor;
        this.ctx.fillRect(x, y, w, h);

        // 3. Pixel Micro-Weave Texture (Pola Tenun Karpet Pixelated 4x4)
        this.ctx.fillStyle = patternColor;
        for (let cy = y + 6; cy < y + h - 6; cy += 6) {
            for (let cx = x + 6; cx < x + w - 6; cx += 6) {
                // Alternating tiny pixel stitch
                this.ctx.fillRect(cx, cy, 2, 2);
                this.ctx.fillRect(cx + 3, cy + 3, 2, 2);
            }
        }

        // 4. Outer Border Trim (Lis Bordir Karpet)
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);

        // Inner Piping
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x + 4, y + 4, w - 8, h - 8);

        // Optional Second Border (e.g., Gold trim for Boss Carpet)
        if (secondBorder) {
            this.ctx.strokeStyle = secondBorder;
            this.ctx.lineWidth = 1.5;
            this.ctx.strokeRect(x + 7, y + 7, w - 14, h - 14);
        }

        // Corner Accent Dots
        this.ctx.fillStyle = borderColor;
        [
            { cx: x + 3, cy: y + 3 },
            { cx: x + w - 5, cy: y + 3 },
            { cx: x + 3, cy: y + h - 5 },
            { cx: x + w - 5, cy: y + h - 5 }
        ].forEach(pt => this.ctx.fillRect(pt.cx, pt.cy, 3, 3));

        this.ctx.restore();
    }

    drawGroutCables(startX, startY) {
        this.ctx.save();
        // Tiny functional black/slate ethernet cables running in grout seams
        const cables = [
            // Cable running from radar station along grout line
            { sx: 160, sy: 140, ex: 160, ey: 180, col: "#0f172a" },
            { sx: 160, sy: 180, ex: 246, ey: 180, col: "#0f172a" },
            // Cable from Gemini AI station along grout line
            { sx: 450, sy: 140, ex: 450, ey: 180, col: "#1e1b4b" },
            // Cable from LinkedIn server rack down grout
            { sx: 740, sy: 140, ex: 740, ey: 180, col: "#082f49" }
        ];

        cables.forEach(cb => {
            this.ctx.strokeStyle = cb.col;
            this.ctx.lineWidth = 1.8;
            this.ctx.beginPath();
            this.ctx.moveTo(cb.sx, cb.sy);
            this.ctx.lineTo(cb.ex, cb.ey);
            this.ctx.stroke();

            // Tiny rubber cable ties/clips at intervals
            const midX = (cb.sx + cb.ex) / 2;
            const midY = (cb.sy + cb.ey) / 2;
            this.ctx.fillStyle = "#64748b";
            this.ctx.fillRect(midX - 1.5, midY - 1.5, 3, 3);
        });
        this.ctx.restore();
    }

    drawDoorwayThreshold(x, y, w, h) {
        this.ctx.save();
        // Natural Doorway Threshold Sill (Peralihan Halus Ubin ke Kayu)
        // Dark Timber Base Sill
        this.ctx.fillStyle = "#2b180d";
        this.ctx.fillRect(x, y, w, h);

        // Brass Metal Threshold Strip
        this.ctx.fillStyle = "#b48c36";
        this.ctx.fillRect(x + 2, y, 2, h);

        // Pixel Brass Screw Rivets along threshold
        this.ctx.fillStyle = "#d4af37";
        for (let ry = y + 16; ry < y + h - 10; ry += 32) {
            this.ctx.fillRect(x + 2, ry, 2, 2);
        }

        // Shadow on the left edge
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        this.ctx.fillRect(x - 2, y, 2, h);

        this.ctx.restore();
    }

    drawFloorZones() {
        // 1. Neutral Retro 2D Pixelated Tiles Flooring (Main Office Hall)
        const tileStartX = 20;
        const tileStartY = 58;
        const tileW = 802; // from x: 20 to x: 822 (glass lounge wall)
        const tileH = this.height - tileStartY - 12;

        this.drawPixelTileFloor(tileStartX, tileStartY, tileW, tileH);

        // 2. Workstation Zoning Pixelated Carpets (Zonasi Jelas di Bawah Stasiun Kerja)
        // Station 1: Scout / RSS Radar Carpet (Navy Blue Pixelated Carpet)
        this.drawPixelCarpet(95, 135, 130, 145, {
            baseColor: "#172554",
            patternColor: "rgba(30, 58, 138, 0.6)",
            borderColor: "#3b82f6"
        });

        // Station 2: Pulse / Gemini AI Carpet (Muted Indigo/Purple Pixelated Carpet)
        this.drawPixelCarpet(385, 135, 130, 145, {
            baseColor: "#2e1065",
            patternColor: "rgba(59, 7, 100, 0.6)",
            borderColor: "#a855f7"
        });

        // Station 3: Link / LinkedIn Hub Carpet (Teal Ocean Pixelated Carpet)
        this.drawPixelCarpet(675, 135, 130, 145, {
            baseColor: "#083344",
            patternColor: "rgba(22, 78, 99, 0.6)",
            borderColor: "#06b6d4"
        });

        // Station 4: Boss / Chief Executive Suite Carpet (Emerald Green & Gold Carpet)
        this.drawPixelCarpet(340, 375, 220, 155, {
            baseColor: "#064e3b",
            patternColor: "rgba(4, 120, 87, 0.55)",
            borderColor: "#10b981",
            secondBorder: "#d4af37"
        });

        // 3. High-Tech Floor Cable Conduits with Flowing Dashed Pipeline
        this.drawFloorConduits();

        // 4. Coffee Lounge Hardwood Parquet Floor (Right Wing)
        const woodX = 825;
        const woodY = 245;
        const woodW = this.width - woodX - 18;
        const woodH = this.height - woodY - 14;

        // Dark Wood Plank Subfloor
        this.ctx.fillStyle = "#1e1109";
        this.ctx.fillRect(woodX, woodY, woodW, woodH);

        // Staggered Timber Parquet Planks
        const plankH = 18;
        const plankW = 75;
        for (let row = 0; row * plankH < woodH; row++) {
            const py = woodY + row * plankH;
            const xOffset = (row % 2) * (plankW / 2);

            for (let px = woodX - plankW; px < woodX + woodW; px += plankW) {
                const rx = Math.max(woodX, px + xOffset);
                const rw = Math.min(woodX + woodW - rx, (px + xOffset + plankW) - rx);
                if (rw <= 0) continue;

                // Alternating rich timber colors
                const tones = ["#2b180d", "#331c10", "#26150a", "#3a2012"];
                const tone = tones[(Math.floor(px / plankW) + row * 3) % tones.length];
                this.ctx.fillStyle = tone;
                this.ctx.fillRect(rx, py, rw, plankH);

                this.ctx.strokeStyle = "#170b05";
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(rx, py, rw, plankH);
            }
        }

        // Circular Cozy Lounge Rug in Breakroom
        this.ctx.save();
        this.ctx.fillStyle = "#1e293b";
        this.ctx.beginPath();
        this.ctx.ellipse(935, 470, 75, 55, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = "#f59e0b";
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([4, 4]);
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawFloorConduits() {
        this.ctx.save();

        // 3 Pipeline Segments:
        // Seg 0: News Radar (160, 200) -> Gemini Studio (450, 200) [Target: pulse]
        // Seg 1: Gemini Studio (450, 200) -> Chief Desk (450, 440) [Target: boss]
        // Seg 2: Chief Desk (450, 440) -> Corner (740, 440) -> LinkedIn Hub (740, 200) [Target: link]
        const allStations = { ...this.stations, ...this.customStations };
        const segments = (this.customConduits && this.customConduits.length > 0)
            ? this.customConduits.map((c, idx) => {
                const s1 = allStations[c.from] || { x: 160, y: 200 };
                const s2 = allStations[c.to] || { x: 450, y: 200 };
                let pts = [];
                if (c.from === 'boss' && c.to === 'link') {
                    pts = [{ x: s1.x, y: s1.y }, { x: s2.x, y: s1.y }, { x: s2.x, y: s2.y }];
                } else if (c.from === 'pulse' && c.to === 'boss') {
                    pts = [{ x: s1.x, y: s1.y }, { x: s1.x, y: s2.y }];
                } else {
                    pts = [{ x: s1.x, y: s1.y }, { x: s2.x, y: s2.y }];
                }
                return {
                    id: idx,
                    target: c.to,
                    color: c.color || '#3b82f6',
                    name: `${c.from} -> ${c.to}`,
                    points: pts
                };
            })
            : [
                { id: 0, target: 'pulse', color: '#3b82f6', name: 'News -> Gemini Core', points: [{ x: 160, y: 200 }, { x: 450, y: 200 }] },
                { id: 1, target: 'boss', color: '#a855f7', name: 'Gemini -> Chief Desk', points: [{ x: 450, y: 200 }, { x: 450, y: 440 }] },
                { id: 2, target: 'link', color: '#06b6d4', name: 'Chief -> LinkedIn Hub', points: [{ x: 450, y: 440 }, { x: 740, y: 440 }, { x: 740, y: 200 }] }
            ];

        // 1. Draw Conveyor Belt Base Trough & Roller Ticks
        segments.forEach(seg => {
            const hasError = Boolean(this.stationErrors && this.stationErrors[seg.target]);
            const isProcessing = (this.roomState === 'processing');

            // 1.1 Outer Metallic Conduit Trough
            this.ctx.strokeStyle = hasError ? "rgba(185, 28, 28, 0.85)" : "rgba(15, 23, 42, 0.9)";
            this.ctx.lineWidth = 8;
            this.ctx.lineCap = "round";
            this.ctx.lineJoin = "round";
            this.ctx.setLineDash([]);
            this.ctx.beginPath();
            seg.points.forEach((pt, idx) => {
                if (idx === 0) this.ctx.moveTo(pt.x, pt.y);
                else this.ctx.lineTo(pt.x, pt.y);
            });
            this.ctx.stroke();

            // 1.2 Conveyor Belt Steel Rollers / Tread Seam
            this.ctx.strokeStyle = hasError ? "rgba(239, 68, 68, 0.4)" : "rgba(51, 65, 85, 0.65)";
            this.ctx.lineWidth = 4;
            this.ctx.setLineDash([3, 4]);
            this.ctx.lineDashOffset = -(this.frame * 0.8) % 14;
            this.ctx.beginPath();
            seg.points.forEach((pt, idx) => {
                if (idx === 0) this.ctx.moveTo(pt.x, pt.y);
                else this.ctx.lineTo(pt.x, pt.y);
            });
            this.ctx.stroke();

            // 1.3 Active Neon Laser Data Stream
            if (hasError) {
                // Warning Blinking Crimson Cable with Hazard Energy
                const errPulse = Math.sin(this.frame * 0.25);
                this.ctx.strokeStyle = errPulse > 0 ? "#ef4444" : "#b91c1c";
                this.ctx.lineWidth = 3;
                this.ctx.shadowColor = "#ef4444";
                this.ctx.shadowBlur = 14 + errPulse * 6;
                this.ctx.setLineDash([8, 6]);
                this.ctx.lineDashOffset = -this.frame * 2.0;
                this.ctx.beginPath();
                seg.points.forEach((pt, idx) => {
                    if (idx === 0) this.ctx.moveTo(pt.x, pt.y);
                    else this.ctx.lineTo(pt.x, pt.y);
                });
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;

                // Draw Warning Hazard Floor Beacon at target station
                const destPt = seg.points[seg.points.length - 1];
                this.drawFloorWarningBeacon(destPt.x, destPt.y + 25, this.stationErrors[seg.target]);
            } else if (seg.id === 2 && this.isWaitingApproval) {
                // Ketika Menunggu Approval: Jalur pipa menuju Station 3 (LinkedIn) berwarna kuning/amber putus-putus (status Paused/Holding)
                this.ctx.strokeStyle = "#f59e0b";
                this.ctx.lineWidth = 2.6;
                this.ctx.shadowColor = "#f59e0b";
                this.ctx.shadowBlur = 12;
                this.ctx.setLineDash([7, 6]);
                this.ctx.lineDashOffset = -(this.frame * 0.4);
                this.ctx.beginPath();
                seg.points.forEach((pt, idx) => {
                    if (idx === 0) this.ctx.moveTo(pt.x, pt.y);
                    else this.ctx.lineTo(pt.x, pt.y);
                });
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;

                // Status label di lantai
                this.ctx.fillStyle = "#fbbf24";
                this.ctx.font = "bold 8px 'Fira Code'";
                this.ctx.textAlign = "center";
                this.ctx.fillText("⏸️ PAUSED / HOLDING APPROVAL", 595, 432);
            } else if (seg.id === 2 && this.isApprovedPublishing) {
                // Setelah Approved: Pipa menyala hijau terang berdenyut menuju LinkedIn Hub
                const greenPulse = Math.sin(this.frame * 0.25) * 5;
                this.ctx.strokeStyle = "#10b981";
                this.ctx.lineWidth = 3.4;
                this.ctx.shadowColor = "#10b981";
                this.ctx.shadowBlur = 16 + greenPulse;
                this.ctx.setLineDash([9, 4]);
                this.ctx.lineDashOffset = -this.frame * 3.2;
                this.ctx.beginPath();
                seg.points.forEach((pt, idx) => {
                    if (idx === 0) this.ctx.moveTo(pt.x, pt.y);
                    else this.ctx.lineTo(pt.x, pt.y);
                });
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;

                // Active publishing label di lantai
                this.ctx.fillStyle = "#34d399";
                this.ctx.font = "bold 8px 'Fira Code'";
                this.ctx.textAlign = "center";
                this.ctx.fillText("⚡ BROADCASTING TO LINKEDIN...", 595, 432);
            } else {
                // High-Speed Flowing Data Neon Stream
                this.ctx.strokeStyle = seg.color;
                this.ctx.lineWidth = isProcessing ? 2.5 : 1.8;
                this.ctx.shadowColor = seg.color;
                this.ctx.shadowBlur = isProcessing ? 12 : 6;
                this.ctx.setLineDash([9, 6]);
                this.ctx.lineDashOffset = -this.frame * (isProcessing ? 2.2 : 1.2);
                this.ctx.beginPath();
                seg.points.forEach((pt, idx) => {
                    if (idx === 0) this.ctx.moveTo(pt.x, pt.y);
                    else this.ctx.lineTo(pt.x, pt.y);
                });
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;
            }
        });

        // 2. Draw Moving Pixel Data Files Along Conveyor Belts
        this.drawConveyorFilePackets();

        this.ctx.restore();
    }

    drawFloorWarningBeacon(x, y, errorMsg = "API / RATE LIMIT ERROR") {
        this.ctx.save();
        const pulse = Math.sin(this.frame * 0.2) * 4;

        // Red Hazard Floor Aura
        this.ctx.fillStyle = "rgba(239, 68, 68, 0.18)";
        this.ctx.beginPath();
        this.ctx.arc(x, y, 32 + pulse, 0, Math.PI * 2);
        this.ctx.fill();

        // Hazard Chevron Border
        this.ctx.strokeStyle = "#ef4444";
        this.ctx.lineWidth = 1.8;
        this.ctx.setLineDash([5, 4]);
        this.ctx.lineDashOffset = -this.frame * 0.8;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 32 + pulse, 0, Math.PI * 2);
        this.ctx.stroke();

        // ⚠️ Icon
        this.ctx.font = "16px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText("⚠️", x, y + 5);

        // Flashing Warning Label Pill
        this.ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
        this.ctx.beginPath();
        this.ctx.roundRect(x - 68, y + 14, 136, 17, 4);
        this.ctx.fill();
        this.ctx.strokeStyle = "#ef4444";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        this.ctx.fillStyle = "#fca5a5";
        this.ctx.font = "bold 8px 'Fira Code'";
        this.ctx.fillText(String(errorMsg).slice(0, 22), x, y + 26);

        this.ctx.restore();
    }

    drawConveyorFilePackets() {
        if (!this.conveyorPackets) return;

        this.conveyorPackets.forEach(p => {
            let px = 0;
            let py = 0;

            if (p.segment === 0) {
                // Scout (160, 200) -> Pulse (450, 200)
                px = 160 + (450 - 160) * p.progress;
                py = 200;
            } else if (p.segment === 1) {
                // Pulse (450, 200) -> Boss (450, 440)
                px = 450;
                py = 200 + (440 - 200) * p.progress;
            } else {
                // Boss (450, 440) -> Corner (740, 440) -> Link (740, 200)
                // dx: 290, dy: 240, ratio = 290/530 ≈ 0.547
                const ratio = 0.547;
                if (p.progress <= ratio) {
                    const subP = p.progress / ratio;
                    px = 450 + 290 * subP;
                    py = 440;
                } else {
                    const subP = (p.progress - ratio) / (1 - ratio);
                    px = 740;
                    py = 440 - 240 * subP;
                }
            }

            // Draw Pixel File Packet / Card
            this.ctx.save();
            const bounce = Math.sin(this.frame * 0.15 + p.segment) * 2;
            const cardW = 18;
            const cardH = 14;

            // Packet Shadow
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
            this.ctx.fillRect(px - cardW / 2 + 2, py - cardH / 2 + 2 + bounce, cardW, cardH);

            // Packet Body (Retro Pixel Folder / Data Chip)
            const segColors = ["#3b82f6", "#a855f7", "#06b6d4"];
            const pktCol = segColors[p.segment] || "#3b82f6";

            this.ctx.fillStyle = "#0f172a";
            this.ctx.fillRect(px - cardW / 2, py - cardH / 2 + bounce, cardW, cardH);
            this.ctx.strokeStyle = pktCol;
            this.ctx.lineWidth = 1.2;
            this.ctx.strokeRect(px - cardW / 2, py - cardH / 2 + bounce, cardW, cardH);

            // Glowing Trailing Sparks
            this.ctx.fillStyle = pktCol;
            this.ctx.shadowColor = pktCol;
            this.ctx.shadowBlur = 8;
            this.ctx.fillRect(px - 3, py - 3 + bounce, 6, 6);
            this.ctx.shadowBlur = 0;

            // Packet Mini Icon
            this.ctx.font = "10px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText(p.icon || "📄", px, py + 4 + bounce);

            this.ctx.restore();
        });

        // Special Waiting Approval Beacon at Chief Desk
        if (this.isWaitingApproval) {
            this.ctx.save();
            const bossDeskX = 450;
            const bossDeskY = 440;
            const pulse = Math.sin(this.frame * 0.15) * 6;

            // Pulsing Gold Aura
            this.ctx.fillStyle = "rgba(245, 158, 11, 0.22)";
            this.ctx.beginPath();
            this.ctx.arc(bossDeskX, bossDeskY, 44 + pulse, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.strokeStyle = "#f59e0b";
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([6, 5]);
            this.ctx.lineDashOffset = -this.frame * 1.0;
            this.ctx.beginPath();
            this.ctx.arc(bossDeskX, bossDeskY, 44 + pulse, 0, Math.PI * 2);
            this.ctx.stroke();

            // Floating Clickable Approval Pill above Chief Desk
            this.ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
            this.ctx.beginPath();
            this.ctx.roundRect(bossDeskX - 70, bossDeskY - 50 + pulse * 0.5, 140, 22, 6);
            this.ctx.fill();
            this.ctx.strokeStyle = "#f59e0b";
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();

            this.ctx.fillStyle = "#fbbf24";
            this.ctx.font = "bold 9px 'Fira Code'";
            this.ctx.textAlign = "center";
            this.ctx.fillText("🔔 1 PENDING DRAFT", bossDeskX, bossDeskY - 36 + pulse * 0.5);

            this.ctx.restore();
        }
    }

    drawCustomBuilderStations() {
        Object.keys(this.customStations).forEach(key => {
            const st = this.customStations[key];
            if (!st) return;
            this.ctx.save();

            // 1. Station carpet zone
            this.ctx.fillStyle = `${st.color}22`;
            this.ctx.strokeStyle = st.color;
            this.ctx.lineWidth = 1.6;
            this.ctx.beginPath();
            this.ctx.roundRect(st.x - 48, st.y - 36, 96, 72, 8);
            this.ctx.fill();
            this.ctx.stroke();

            // 2. High-Tech Workstation Desk
            this.ctx.fillStyle = "#1e293b";
            this.ctx.fillRect(st.x - 34, st.y - 16, 68, 32);
            this.ctx.strokeStyle = "#334155";
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(st.x - 34, st.y - 16, 68, 32);

            // Dual Monitors with glowing screen
            this.ctx.fillStyle = "#0f172a";
            this.ctx.fillRect(st.x - 28, st.y - 30, 24, 15);
            this.ctx.fillStyle = st.color;
            this.ctx.fillRect(st.x - 26, st.y - 28, 20, 11);

            this.ctx.fillStyle = "#0f172a";
            this.ctx.fillRect(st.x + 4, st.y - 30, 24, 15);
            this.ctx.fillStyle = "#38bdf8";
            this.ctx.fillRect(st.x + 6, st.y - 28, 20, 11);

            // Office Chair
            this.ctx.fillStyle = "#475569";
            this.ctx.beginPath();
            this.ctx.arc(st.x, st.y + 12, 10, 0, Math.PI * 2);
            this.ctx.fill();

            // Floating Title Pill Badge
            this.ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
            this.ctx.beginPath();
            this.ctx.roundRect(st.x - 55, st.y - 48, 110, 18, 5);
            this.ctx.fill();
            this.ctx.strokeStyle = st.color;
            this.ctx.lineWidth = 1.2;
            this.ctx.stroke();

            this.ctx.fillStyle = "#f8fafc";
            this.ctx.font = "bold 8px 'Fira Code'";
            this.ctx.textAlign = "center";
            this.ctx.fillText(`${st.icon || '⚡'} ${st.name}`, st.x, st.y - 36);

            this.ctx.restore();
        });
    }

    drawBuilderPortsAndDragging() {
        this.ctx.save();
        const allStations = { ...this.stations, ...this.customStations };

        // Port sockets at each station
        Object.keys(allStations).forEach(k => {
            const st = allStations[k];
            const pulse = Math.sin(this.frame * 0.15) * 2;
            
            // Halo
            this.ctx.fillStyle = `${st.color}33`;
            this.ctx.beginPath();
            this.ctx.arc(st.x, st.y, 22 + pulse, 0, Math.PI * 2);
            this.ctx.fill();

            // Socket circle
            this.ctx.fillStyle = "#0f172a";
            this.ctx.strokeStyle = st.color;
            this.ctx.lineWidth = 2.5;
            this.ctx.beginPath();
            this.ctx.arc(st.x, st.y, 14, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            // Cable anchor icon
            this.ctx.font = "10px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText("🔌", st.x, st.y + 3);

            // Port label
            this.ctx.fillStyle = "#38bdf8";
            this.ctx.font = "bold 7px 'Fira Code'";
            this.ctx.fillText("PORT [IN/OUT]", st.x, st.y + 24);
        });

        // Active dragging cable
        if (this.activeCableDrag) {
            const fromSt = allStations[this.activeCableDrag.fromStation];
            if (fromSt) {
                const sx = fromSt.x;
                const sy = fromSt.y;
                const ex = this.activeCableDrag.currentX;
                const ey = this.activeCableDrag.currentY;

                // Neon glowing line with sparks
                this.ctx.strokeStyle = fromSt.color || "#38bdf8";
                this.ctx.lineWidth = 3.5;
                this.ctx.shadowColor = fromSt.color || "#38bdf8";
                this.ctx.shadowBlur = 15;
                this.ctx.setLineDash([8, 4]);
                this.ctx.lineDashOffset = -this.frame * 1.5;

                this.ctx.beginPath();
                this.ctx.moveTo(sx, sy);
                const midX = (sx + ex) / 2;
                const midY = (sy + ey) / 2 - 25;
                this.ctx.quadraticCurveTo(midX, midY, ex, ey);
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;
                this.ctx.setLineDash([]);

                // Cursor drag end terminal
                this.ctx.fillStyle = "#ffffff";
                this.ctx.beginPath();
                this.ctx.arc(ex, ey, 6, 0, Math.PI * 2);
                this.ctx.fill();

                this.ctx.fillStyle = "#38bdf8";
                this.ctx.font = "bold 9px 'Fira Code'";
                this.ctx.fillText("DROP TO CONNECT ⚡", ex, ey - 12);
            }
        }
        this.ctx.restore();
    }

    drawReplayCCTVOverlay() {
        this.ctx.save();
        // 1. Subtle CRT Scanlines
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
        for (let y = 0; y < this.height; y += 4) {
            this.ctx.fillRect(0, y, this.width, 1.5);
        }

        // 2. Retro CCTV Viewfinder Corners
        const cornerSize = 24;
        const pad = 16;
        this.ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
        this.ctx.lineWidth = 2.5;

        // Top-Left
        this.ctx.beginPath();
        this.ctx.moveTo(pad, pad + cornerSize);
        this.ctx.lineTo(pad, pad);
        this.ctx.lineTo(pad + cornerSize, pad);
        this.ctx.stroke();

        // Top-Right
        this.ctx.beginPath();
        this.ctx.moveTo(this.width - pad - cornerSize, pad);
        this.ctx.lineTo(this.width - pad, pad);
        this.ctx.lineTo(this.width - pad, pad + cornerSize);
        this.ctx.stroke();

        // Bottom-Left
        this.ctx.beginPath();
        this.ctx.moveTo(pad, this.height - pad - cornerSize);
        this.ctx.lineTo(pad, this.height - pad);
        this.ctx.lineTo(pad + cornerSize, this.height - pad);
        this.ctx.stroke();

        // Bottom-Right
        this.ctx.beginPath();
        this.ctx.moveTo(this.width - pad - cornerSize, this.height - pad);
        this.ctx.lineTo(this.width - pad, this.height - pad);
        this.ctx.lineTo(this.width - pad, this.height - pad - cornerSize);
        this.ctx.stroke();

        // 3. REC Blinking indicator & Metadata
        const isBlink = Math.floor(this.frame / 20) % 2 === 0;
        this.ctx.fillStyle = isBlink ? "#ef4444" : "#7f1d1d";
        this.ctx.beginPath();
        this.ctx.arc(36, 32, 6, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "bold 11px 'Fira Code'";
        this.ctx.textAlign = "left";
        const playState = this.isPlayingReplay ? "PLAY ▶" : "PAUSED ❚❚";
        this.ctx.fillText(`REC [${playState}]  CAM 04 • PIPELINE TIME-TRAVEL REPLAY (${this.replaySpeed}x)`, 48, 36);

        // Current Audit Snapshot info
        if (this.replaySnapshot) {
            this.ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
            this.ctx.beginPath();
            this.ctx.roundRect(this.width / 2 - 180, 16, 360, 26, 6);
            this.ctx.fill();
            this.ctx.strokeStyle = "#38bdf8";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            this.ctx.fillStyle = "#38bdf8";
            this.ctx.font = "bold 10px 'Fira Code'";
            this.ctx.textAlign = "center";
            this.ctx.fillText(`AUDIT ${this.replaySnapshot.timeString}: ${this.replaySnapshot.label}`, this.width / 2, 33);
        }

        this.ctx.restore();
    }

    drawRetroRadarMinimap() {
        if (!this.minimapCtx || !this.minimapCanvas) return;
        const mctx = this.minimapCtx;
        const mw = this.minimapCanvas.width;
        const mh = this.minimapCanvas.height;
        const scaleX = mw / this.width;
        const scaleY = mh / this.height;

        // Clear Minimap
        mctx.fillStyle = "#090e1a";
        mctx.fillRect(0, 0, mw, mh);

        // Grid pattern
        mctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
        mctx.lineWidth = 1;
        for (let gx = 0; gx < mw; gx += 28) {
            mctx.beginPath();
            mctx.moveTo(gx, 0);
            mctx.lineTo(gx, mh);
            mctx.stroke();
        }
        for (let gy = 0; gy < mh; gy += 24) {
            mctx.beginPath();
            mctx.moveTo(0, gy);
            mctx.lineTo(mw, gy);
            mctx.stroke();
        }

        // Stations
        const allStations = { ...this.stations, ...this.customStations };
        Object.keys(allStations).forEach(k => {
            const st = allStations[k];
            mctx.fillStyle = st.color || "#64748b";
            mctx.fillRect(st.x * scaleX - 3, st.y * scaleY - 3, 6, 6);
        });

        // Conduits / Cables
        this.customConduits.forEach(c => {
            const s1 = allStations[c.from];
            const s2 = allStations[c.to];
            if (s1 && s2) {
                mctx.strokeStyle = `${c.color || '#38bdf8'}66`;
                mctx.lineWidth = 1;
                mctx.beginPath();
                mctx.moveTo(s1.x * scaleX, s1.y * scaleY);
                mctx.lineTo(s2.x * scaleX, s2.y * scaleY);
                mctx.stroke();
            }
        });

        // Agent Blips
        const agentSource = (this.isReplayMode && this.replaySnapshot) ? this.replaySnapshot.agents : this.agents;
        Object.keys(agentSource).forEach(k => {
            const ag = agentSource[k];
            if (!ag) return;
            mctx.fillStyle = ag.color || "#ffffff";
            mctx.beginPath();
            mctx.arc(ag.x * scaleX, ag.y * scaleY, 2.5, 0, Math.PI * 2);
            mctx.fill();
        });

        // Rotating Radar Sweep Line
        const sweepAngle = (this.frame * 0.04) % (Math.PI * 2);
        mctx.save();
        mctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
        mctx.lineWidth = 1.2;
        mctx.beginPath();
        mctx.moveTo(mw / 2, mh / 2);
        mctx.lineTo(mw / 2 + Math.cos(sweepAngle) * 90, mh / 2 + Math.sin(sweepAngle) * 60);
        mctx.stroke();
        mctx.restore();

        // Camera Viewport Wireframe
        const camWorldX = -this.camera.x / this.camera.scale;
        const camWorldY = -this.camera.y / this.camera.scale;
        const camWorldW = this.width / this.camera.scale;
        const camWorldH = this.height / this.camera.scale;

        mctx.strokeStyle = "#38bdf8";
        mctx.lineWidth = 1.2;
        mctx.strokeRect(camWorldX * scaleX, camWorldY * scaleY, camWorldW * scaleX, camWorldH * scaleY);
    }

    drawRaisedServerFloor(x, y, w, h, color) {
        this.ctx.fillStyle = "#0c1524";
        this.ctx.beginPath();
        this.ctx.roundRect(x, y, w, h, 6);
        this.ctx.fill();

        this.ctx.strokeStyle = `${color}40`;
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();

        this.ctx.strokeStyle = `${color}25`;
        this.ctx.lineWidth = 0.8;
        for (let gx = x + 15; gx < x + w; gx += 15) {
            this.ctx.beginPath();
            this.ctx.moveTo(gx, y);
            this.ctx.lineTo(gx, y + h);
            this.ctx.stroke();
        }
    }

    drawWoodWallPanel(x, y, w, h, config = {}) {
        const {
            woodType = 'walnut',
            slatSize = 8,
            gap = 2,
            orientation = 'vertical',
            accentColor = null,
            title = null,
            ledGlow = true
        } = config;

        this.ctx.save();

        // 1. Wood color palettes with rich timber grain
        let baseTone, slatColors, trimTone, highlightTone, grooveTone;
        if (woodType === 'walnut') { // Rich warm walnut (Divisi 1 Scout)
            baseTone = '#221208';
            slatColors = ['#5a2e17', '#6c371c', '#4d2612', '#753c1f', '#522914', '#633319'];
            trimTone = '#3d1e10';
            highlightTone = 'rgba(255, 230, 200, 0.24)';
            grooveTone = '#140803';
        } else if (woodType === 'warm_oak') { // Golden warm oak (Divisi 2 Pulse & Breakroom)
            baseTone = '#2a1708';
            slatColors = ['#7c4a1e', '#8c5422', '#6b3f18', '#995c26', '#72431b', '#824f20'];
            trimTone = '#4a2b12';
            highlightTone = 'rgba(255, 240, 210, 0.26)';
            grooveTone = '#1a0d04';
        } else if (woodType === 'mahogany') { // Deep luxury mahogany (Divisi 4 Boss Suite)
            baseTone = '#220a05';
            slatColors = ['#541c10', '#632314', '#46170c', '#702817', '#4c190d', '#5c2012'];
            trimTone = '#361109';
            highlightTone = 'rgba(255, 215, 200, 0.22)';
            grooveTone = '#130502';
        } else { // Golden Teak (Divisi 3 Link)
            baseTone = '#291607';
            slatColors = ['#6e3d16', '#7e471a', '#5f3411', '#894e1d', '#643714', '#754218'];
            trimTone = '#42240e';
            highlightTone = 'rgba(255, 235, 205, 0.24)';
            grooveTone = '#170b03';
        }

        // 2. Base Backing Board (Dark acoustic wood backing)
        this.ctx.fillStyle = baseTone;
        this.ctx.fillRect(x, y, w, h);

        // 3. Draw Slat Slits / Wood Planks with bevels & realistic grain lines
        if (orientation === 'vertical') {
            const step = slatSize + gap;
            let slatIdx = 0;
            for (let sx = x + 1; sx < x + w - 2; sx += step) {
                const sw = Math.min(slatSize, (x + w - 1) - sx);
                if (sw <= 1) break;
                const color = slatColors[slatIdx % slatColors.length];

                // Slat body
                this.ctx.fillStyle = color;
                this.ctx.fillRect(sx, y + 4, sw, h - 8);

                // Subtle wood grain striations on slat face
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
                const grainY1 = y + 7 + ((slatIdx * 19) % Math.max(10, h - 22));
                const grainY2 = y + 7 + ((slatIdx * 37) % Math.max(10, h - 22));
                this.ctx.fillRect(sx, grainY1, sw, 1);
                this.ctx.fillRect(sx, grainY2, sw, 1);

                // Left highlight edge (3D Chamfer light reflection)
                this.ctx.fillStyle = highlightTone;
                this.ctx.fillRect(sx, y + 4, 1.2, h - 8);

                // Right shadow groove (3D Depth)
                this.ctx.fillStyle = grooveTone;
                this.ctx.fillRect(sx + sw - 1.2, y + 4, 1.2, h - 8);

                slatIdx++;
            }
        } else {
            // Horizontal Wood Planks
            const step = slatSize + gap;
            let slatIdx = 0;
            for (let sy = y + 3; sy < y + h - 2; sy += step) {
                const sh = Math.min(slatSize, (y + h - 2) - sy);
                if (sh <= 1) break;
                const color = slatColors[slatIdx % slatColors.length];

                this.ctx.fillStyle = color;
                this.ctx.fillRect(x + 2, sy, w - 4, sh);

                // Top highlight
                this.ctx.fillStyle = highlightTone;
                this.ctx.fillRect(x + 2, sy, w - 4, 1);

                // Bottom shadow groove
                this.ctx.fillStyle = grooveTone;
                this.ctx.fillRect(x + 2, sy + sh - 1, w - 4, 1);

                slatIdx++;
            }
        }

        // 4. Solid Wood Crown Molding (Top Trim)
        const crownGrad = this.ctx.createLinearGradient(x, y, x, y + 5);
        crownGrad.addColorStop(0, trimTone);
        crownGrad.addColorStop(1, grooveTone);
        this.ctx.fillStyle = crownGrad;
        this.ctx.fillRect(x, y, w, 5);
        this.ctx.fillStyle = highlightTone;
        this.ctx.fillRect(x, y, w, 1);

        // 5. Solid Wood Baseboard Molding (Bottom Trim)
        const baseGrad = this.ctx.createLinearGradient(x, y + h - 6, x, y + h);
        baseGrad.addColorStop(0, trimTone);
        baseGrad.addColorStop(1, grooveTone);
        this.ctx.fillStyle = baseGrad;
        this.ctx.fillRect(x, y + h - 6, w, 6);
        this.ctx.fillStyle = highlightTone;
        this.ctx.fillRect(x, y + h - 6, w, 1);

        // 6. Perimeter Framing Border
        this.ctx.strokeStyle = grooveTone;
        this.ctx.lineWidth = 1.2;
        this.ctx.strokeRect(x, y, w, h);

        // 7. Optional LED Accent Glow along the bottom molding
        if (accentColor && ledGlow) {
            const ledGrad = this.ctx.createLinearGradient(x, y + h - 4, x, y + h + 16);
            ledGrad.addColorStop(0, `${accentColor}55`);
            ledGrad.addColorStop(1, 'transparent');
            this.ctx.fillStyle = ledGrad;
            this.ctx.fillRect(x + 4, y + h, w - 8, 16);

            // LED strip dot in the molding
            this.ctx.fillStyle = accentColor;
            this.ctx.shadowColor = accentColor;
            this.ctx.shadowBlur = 6;
            this.ctx.fillRect(x + 6, y + h - 2.5, w - 12, 1.5);
            this.ctx.shadowBlur = 0;
        }

        // 8. Division Nameplate / Plaque
        if (title) {
            const plaqueW = Math.min(w - 20, 150);
            const plaqueH = 14;
            const px = x + (w - plaqueW) / 2;
            const py = y + 7;

            // Plaque brass/gold metallic plate with dark core
            this.ctx.fillStyle = '#0f0b07';
            this.ctx.beginPath();
            this.ctx.roundRect(px, py, plaqueW, plaqueH, 3);
            this.ctx.fill();

            this.ctx.strokeStyle = accentColor || '#d97706';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            // Plaque Text
            this.ctx.fillStyle = accentColor || '#fde68a';
            this.ctx.font = "bold 7.5px 'Fira Code'";
            this.ctx.textAlign = 'center';
            this.ctx.fillText(title, px + plaqueW / 2, py + 10);
        }

        this.ctx.restore();
    }

    drawWallFeatures() {
        // Base Wall Height
        const wallH = 62;

        // 1. DIVISI 1 (SCOUT / RSS RADAR) — Rich Walnut Timber Slats Wall
        this.drawWoodWallPanel(20, 0, 226, wallH, {
            woodType: 'walnut',
            slatSize: 8,
            gap: 2.5,
            accentColor: '#3b82f6',
            title: '📡 DIVISI 1: NEWS RADAR'
        });

        // Divisi 1 to 2 Divider: Vertical Acoustic Timber Partition Screen
        this.drawWoodWallPanel(246, 0, 8, 185, {
            woodType: 'walnut',
            slatSize: 6,
            orientation: 'horizontal',
            accentColor: '#3b82f6',
            ledGlow: false
        });

        // 2. DIVISI 2 (PULSE / GEMINI AI STUDIO) — Golden Warm Oak Slats Wall
        this.drawWoodWallPanel(254, 0, 206, wallH, {
            woodType: 'warm_oak',
            slatSize: 8,
            gap: 2.5,
            accentColor: '#a855f7',
            title: '✨ DIVISI 2: GEMINI AI STUDIO'
        });

        // Divisi 2 to 3 Divider: Vertical Acoustic Timber Partition Screen
        this.drawWoodWallPanel(460, 0, 8, 185, {
            woodType: 'warm_oak',
            slatSize: 6,
            orientation: 'horizontal',
            accentColor: '#a855f7',
            ledGlow: false
        });

        // 3. PANORAMIC CITY SKYLINE WINDOW (Framed with Teak Wood Moldings)
        this.drawCitySkylineWindow(468, 8, 224, 44);
        // Wood Wainscot trim below window
        this.drawWoodWallPanel(468, 52, 224, 10, {
            woodType: 'teak',
            slatSize: 8,
            orientation: 'horizontal',
            ledGlow: false
        });

        // 4. DIVISI 3 (LINK / LINKEDIN HUB) — Golden Teak Timber Slats Wall
        this.drawWoodWallPanel(692, 0, 130, wallH, {
            woodType: 'teak',
            slatSize: 8,
            gap: 2.5,
            accentColor: '#06b6d4',
            title: '💼 DIVISI 3: LINKEDIN HUB'
        });

        // 5. DIVISI BREAKROOM / COFFEE LOUNGE — Warm Oak Wall Panel
        this.drawWoodWallPanel(825, 0, this.width - 825 - 18, wallH, {
            woodType: 'warm_oak',
            slatSize: 9,
            gap: 2.5,
            accentColor: '#f59e0b',
            title: '☕ LOUNGE & BREAKROOM'
        });

        // 6. DIVISI 4 (CHIEF LEADER / BOSS SUITE) — Executive Luxury Mahogany Wood Wall
        // Luxury Mahogany Feature Wall behind Boss desk
        this.drawWoodWallPanel(320, 526, 260, 52, {
            woodType: 'mahogany',
            slatSize: 9,
            gap: 2.5,
            accentColor: '#10b981',
            title: '👑 DIVISI 4: CHIEF EXECUTIVE SUITE'
        });

        // Left Executive Wood Partition Wing
        this.drawWoodWallPanel(320, 415, 8, 111, {
            woodType: 'mahogany',
            slatSize: 6,
            orientation: 'horizontal',
            accentColor: '#10b981',
            ledGlow: false
        });

        // Right Executive Wood Partition Wing
        this.drawWoodWallPanel(572, 415, 8, 111, {
            woodType: 'mahogany',
            slatSize: 6,
            orientation: 'horizontal',
            accentColor: '#10b981',
            ledGlow: false
        });

        // 7. West Wall (Left Perimeter Wall) with Timber Clad Columns
        this.ctx.fillStyle = "#0a1120";
        this.ctx.fillRect(0, 0, 20, this.height);
        this.ctx.fillStyle = "#1e293b";
        this.ctx.fillRect(18, 0, 2, this.height);

        // Concrete & Wood Columns
        [120, 310, 490].forEach(cy => {
            this.ctx.fillStyle = "#27140a";
            this.ctx.fillRect(2, cy - 18, 20, 36);
            this.ctx.strokeStyle = "#5a2e17";
            this.ctx.lineWidth = 1.2;
            this.ctx.strokeRect(2, cy - 18, 20, 36);
        });

        // 8. East Wall (Right Perimeter Wall)
        this.ctx.fillStyle = "#0a1120";
        this.ctx.fillRect(this.width - 18, 0, 18, this.height);
        this.ctx.fillStyle = "#1e293b";
        this.ctx.fillRect(this.width - 20, 0, 2, this.height);

        // 9. South Wall (Bottom Perimeter Baseboard)
        this.ctx.fillStyle = "#090f1b";
        this.ctx.fillRect(0, this.height - 12, this.width, 12);
        this.ctx.strokeStyle = "#1e293b";
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height - 12);
        this.ctx.lineTo(this.width, this.height - 12);
        this.ctx.stroke();

        // 10. Glass Partition Wall (Dividing Coffee Lounge from Main Workspace)
        this.drawGlassPartitionWall();

        // 11. Kanban Sprint Whiteboard (Mounted on Divisi 2 Warm Oak Wall)
        this.ctx.fillStyle = "#1e293b";
        this.ctx.fillRect(262, 14, 175, 34);
        this.ctx.strokeStyle = "#475569";
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeRect(262, 14, 175, 34);

        // Mounting Brackets
        this.ctx.fillStyle = "#94a3b8";
        this.ctx.fillRect(268, 12, 6, 3);
        this.ctx.fillRect(425, 12, 6, 3);

        this.ctx.fillStyle = "#cbd5e1";
        this.ctx.font = "bold 8px 'Fira Code'";
        this.ctx.textAlign = "left";
        this.ctx.fillText("📌 KANBAN SPRINT HQ", 270, 26);

        // Colorful sticky notes
        const stickyColors = ["#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#06b6d4"];
        stickyColors.forEach((col, idx) => {
            this.ctx.fillStyle = col;
            this.ctx.fillRect(362 + idx * 12, 18, 8, 8);
        });

        // Corner Potted Plants
        this.drawOfficePlant(42, 90);
        this.drawOfficePlant(42, 530);
        this.drawOfficePlant(800, 530);
    }

    drawCitySkylineWindow(x, y, w, h) {
        this.ctx.save();
        // Window Frame
        this.ctx.fillStyle = "#020617";
        this.ctx.fillRect(x, y, w, h);

        // Night Sky Gradient
        const skyGrad = this.ctx.createLinearGradient(x, y, x, y + h);
        skyGrad.addColorStop(0, "#030712");
        skyGrad.addColorStop(0.7, "#0f172a");
        skyGrad.addColorStop(1, "#1e293b");
        this.ctx.fillStyle = skyGrad;
        this.ctx.fillRect(x + 2, y + 2, w - 4, h - 4);

        // Starry night twinkling stars
        this.ctx.fillStyle = "#ffffff";
        const stars = [
            { ox: 15, oy: 8 }, { ox: 45, oy: 14 }, { ox: 85, oy: 6 },
            { ox: 130, oy: 10 }, { ox: 175, oy: 5 }, { ox: 210, oy: 12 }
        ];
        stars.forEach(st => {
            const twinkle = (this.frame + st.ox * 5) % 40 < 20 ? 1 : 0.4;
            this.ctx.globalAlpha = twinkle;
            this.ctx.fillRect(x + st.ox, y + st.oy, 1.5, 1.5);
        });
        this.ctx.globalAlpha = 1;

        // Distant Cyber City Skyline Building Silhouettes
        const buildings = [
            { bx: 8, bw: 26, bh: 26 },
            { bx: 38, bw: 32, bh: 32 },
            { bx: 74, bw: 22, bh: 22 },
            { bx: 100, bw: 36, bh: 36 },
            { bx: 140, bw: 28, bh: 24 },
            { bx: 172, bw: 30, bh: 30 },
            { bx: 206, bw: 20, bh: 20 }
        ];

        buildings.forEach(b => {
            this.ctx.fillStyle = "#090d16";
            this.ctx.fillRect(x + b.bx, y + h - b.bh, b.bw, b.bh);

            // Lit window dots in buildings
            this.ctx.fillStyle = "#fde047";
            for (let wy = y + h - b.bh + 4; wy < y + h - 4; wy += 6) {
                for (let wx = x + b.bx + 4; wx < x + b.bx + b.bw - 4; wx += 6) {
                    if ((wx + wy) % 5 === 0) {
                        this.ctx.fillRect(wx, wy, 2, 2);
                    }
                }
            }
        });

        // Radio Tower with Blinking Red Beacon
        this.ctx.strokeStyle = "#334155";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x + 118, y + h - 36);
        this.ctx.lineTo(x + 118, y + 6);
        this.ctx.stroke();

        const beaconOn = this.frame % 40 < 20;
        this.ctx.fillStyle = beaconOn ? "#ef4444" : "#450a0a";
        this.ctx.beginPath();
        this.ctx.arc(x + 118, y + 6, 2, 0, Math.PI * 2);
        this.ctx.fill();

        // 3 Glass Panes Mullion Dividers
        this.ctx.strokeStyle = "#1e293b";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, w, h);

        this.ctx.beginPath();
        this.ctx.moveTo(x + w / 3, y);
        this.ctx.lineTo(x + w / 3, y + h);
        this.ctx.moveTo(x + (w * 2) / 3, y);
        this.ctx.lineTo(x + (w * 2) / 3, y + h);
        this.ctx.stroke();

        // Diagonal Glass Sheen Reflection
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        this.ctx.beginPath();
        this.ctx.moveTo(x + 20, y + h);
        this.ctx.lineTo(x + 60, y + h);
        this.ctx.lineTo(x + 40, y);
        this.ctx.lineTo(x, y);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
    }

    drawGlassPartitionWall() {
        const wallX = 822;
        const topY = 245;
        const bottomY = this.height - 15;
        const doorTop = 350;
        const doorBottom = 430;

        this.ctx.save();

        // 1. Top Glass Panel (y: 245 to 350)
        this.ctx.fillStyle = "rgba(6, 182, 212, 0.08)";
        this.ctx.fillRect(wallX - 3, topY, 6, doorTop - topY);

        this.ctx.strokeStyle = "rgba(6, 182, 212, 0.6)";
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeRect(wallX - 3, topY, 6, doorTop - topY);

        // Top Glass Mount Clamps
        this.ctx.fillStyle = "#94a3b8";
        this.ctx.fillRect(wallX - 5, topY + 15, 10, 5);
        this.ctx.fillRect(wallX - 5, doorTop - 20, 10, 5);

        // 2. Doorway Opening (y: 350 to 430)
        this.ctx.fillStyle = "#334155";
        this.ctx.fillRect(wallX - 6, doorTop, 12, doorBottom - doorTop);
        this.ctx.strokeStyle = "#475569";
        this.ctx.strokeRect(wallX - 6, doorTop, 12, doorBottom - doorTop);

        // Overhead Door Header Bar
        this.ctx.fillStyle = "#1e293b";
        this.ctx.fillRect(wallX - 10, doorTop - 8, 20, 8);

        // 3. Bottom Glass Panel (y: 430 to bottomY)
        this.ctx.fillStyle = "rgba(6, 182, 212, 0.08)";
        this.ctx.fillRect(wallX - 3, doorBottom, 6, bottomY - doorBottom);

        this.ctx.strokeStyle = "rgba(6, 182, 212, 0.6)";
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeRect(wallX - 3, doorBottom, 6, bottomY - doorBottom);

        // Bottom Glass Mount Clamps
        this.ctx.fillStyle = "#94a3b8";
        this.ctx.fillRect(wallX - 5, doorBottom + 20, 10, 5);
        this.ctx.fillRect(wallX - 5, bottomY - 25, 10, 5);

        // Doorway Sign
        this.ctx.fillStyle = "#f59e0b";
        this.ctx.font = "bold 8px 'Fira Code'";
        this.ctx.textAlign = "center";
        this.ctx.fillText("🚪 ENTRANCE", wallX, doorTop - 12);

        this.ctx.restore();
    }

    drawOfficePlant(x, y) {
        // Planter Pot
        this.ctx.fillStyle = "#78350f";
        this.ctx.beginPath();
        this.ctx.roundRect(x - 12, y - 5, 24, 20, [2, 2, 6, 6]);
        this.ctx.fill();

        // Lush Leaves
        const leafColors = ["#15803d", "#16a34a", "#22c55e"];
        leafColors.forEach((color, idx) => {
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.ellipse(x - 8 + idx * 8, y - 12 - (idx % 2) * 5, 8, 14, (idx - 1) * 0.3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawStationFurniture() {
        // Draw 4 Main Workstations
        this.drawDesk(this.stations.scout, "STATION 1: RSS RADAR", "#3b82f6");
        this.drawDesk(this.stations.pulse, "STATION 2: GEMINI AI", "#a855f7");
        this.drawDesk(this.stations.link, "STATION 3: LINKEDIN", "#06b6d4");
        this.drawDesk(this.stations.boss, "CHIEF LEADER DESK", "#10b981");
    }

    drawDesk(station, label, accentColor) {
        // Ergonomic Office Chair Behind Desk
        this.ctx.fillStyle = "#1e293b";
        this.ctx.beginPath();
        this.ctx.roundRect(station.x - 22, station.y + 12, 44, 22, 6);
        this.ctx.fill();
        this.ctx.strokeStyle = "#334155";
        this.ctx.stroke();

        // Desk Table Top (Curved modern edges)
        this.ctx.fillStyle = "#131b2e";
        this.ctx.beginPath();
        this.ctx.roundRect(station.x - 65, station.y - 32, 130, 64, 10);
        this.ctx.fill();

        // Warm Natural Timber Wood Inlay Surface
        this.ctx.fillStyle = "rgba(100, 50, 20, 0.28)";
        this.ctx.beginPath();
        this.ctx.roundRect(station.x - 61, station.y - 28, 122, 56, 8);
        this.ctx.fill();
        this.ctx.strokeStyle = "rgba(160, 90, 40, 0.35)";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // Ambient Desk Border
        this.ctx.strokeStyle = accentColor;
        this.ctx.lineWidth = 1.8;
        this.ctx.stroke();

        // Ultrawide Curved Monitor Screen with Active Workload State
        const isProcessing = (this.roomState === 'processing');
        this.ctx.fillStyle = isProcessing ? "#030712" : "#050811";
        this.ctx.fillRect(station.x - 38, station.y - 26, 76, 36);
        this.ctx.strokeStyle = isProcessing ? accentColor : "#334155";
        this.ctx.lineWidth = isProcessing ? 1.6 : 1.2;
        if (isProcessing) {
            this.ctx.shadowColor = accentColor;
            this.ctx.shadowBlur = 8;
        }
        this.ctx.strokeRect(station.x - 38, station.y - 26, 76, 36);
        this.ctx.shadowBlur = 0;

        // Screen Live Code / Matrix Line Animation
        this.ctx.fillStyle = accentColor;
        const lineOffset = (this.frame * (isProcessing ? 2.5 : 1.2)) % 22;
        this.ctx.fillRect(station.x - 32, station.y - 20 + (lineOffset % 16), 45, 2);
        this.ctx.fillRect(station.x - 32, station.y - 12 + ((lineOffset + 6) % 16), 30, 2);
        if (isProcessing) {
            this.ctx.fillRect(station.x - 32, station.y - 4 + ((lineOffset + 12) % 16), 50, 2);
        }

        // Mechanical Keyboard & Mouse
        this.ctx.fillStyle = "#334155";
        this.ctx.fillRect(station.x - 22, station.y + 14, 30, 10);
        this.ctx.fillRect(station.x + 14, station.y + 16, 8, 6);

        // Station desk visual completed cleanly without text overlap
    }

    drawCoffeeLounge(x, y) {
        // Espresso Bar Counter
        this.ctx.fillStyle = "#1e293b";
        this.ctx.beginPath();
        this.ctx.roundRect(870, 390, 130, 36, 6);
        this.ctx.fill();
        this.ctx.strokeStyle = "#f59e0b";
        this.ctx.stroke();

        // Espresso Coffee Machine
        this.ctx.fillStyle = "#334155";
        this.ctx.fillRect(925, 370, 30, 26);
        this.ctx.strokeStyle = "#94a3b8";
        this.ctx.strokeRect(925, 370, 30, 26);

        // Coffee Mug
        this.ctx.font = "16px sans-serif";
        this.ctx.fillText("☕", 910, 386);

        // Label
        this.ctx.fillStyle = "#f59e0b";
        this.ctx.font = "bold 9px 'Fira Code'";
        this.ctx.fillText("COFFEE LOUNGE", 935, 412);

        // Cozy Armchair / Sofa
        this.ctx.fillStyle = "#3b4252";
        this.ctx.beginPath();
        this.ctx.roundRect(890, 480, 95, 45, 8);
        this.ctx.fill();
        this.ctx.strokeStyle = "#4c566a";
        this.ctx.stroke();

        // Table with donut
        this.ctx.fillStyle = "#1e293b";
        this.ctx.beginPath();
        this.ctx.arc(940, 455, 16, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillText("🍩", 940, 460);

        // Draw Rising Coffee Steam
        this.steamParticles.forEach(sp => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${sp.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawWaterCooler(x, y) {
        // Clear Blue Water Bottle
        this.ctx.fillStyle = "rgba(56, 189, 248, 0.7)";
        this.ctx.beginPath();
        this.ctx.roundRect(x - 10, y - 25, 20, 22, 6);
        this.ctx.fill();
        this.ctx.strokeStyle = "#38bdf8";
        this.ctx.stroke();

        // Bubble inside water cooler
        const bubbleY = y - 16 + Math.sin(this.frame * 0.1) * 3;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(x + 2, bubbleY, 2.5, 0, Math.PI * 2);
        this.ctx.fill();

        // White Stand Base
        this.ctx.fillStyle = "#e2e8f0";
        this.ctx.fillRect(x - 12, y - 3, 24, 25);
        this.ctx.strokeStyle = "#cbd5e1";
        this.ctx.strokeRect(x - 12, y - 3, 24, 25);
    }

    drawRadarDish(x, y) {
        this.ctx.save();
        this.ctx.strokeStyle = "#3b82f6";
        this.ctx.lineWidth = 1.8;

        // Circular Radar Grid
        this.ctx.beginPath();
        this.ctx.arc(x, y, 22, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.fillStyle = "rgba(59, 130, 246, 0.08)";
        this.ctx.fill();

        // Sweeping Radar Beam
        const angle = (this.frame * 0.06) % (Math.PI * 2);
        this.ctx.fillStyle = "rgba(59, 130, 246, 0.35)";
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.arc(x, y, 22, angle, angle + 0.6);
        this.ctx.closePath();
        this.ctx.fill();

        // Dish Icon
        this.ctx.font = "14px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText("📡", x, y + 5);
        this.ctx.restore();
    }

    drawHologram(x, y) {
        // Floating 3D Holographic AI Crystal
        this.ctx.save();
        const pulse = Math.sin(this.frame * 0.08) * 5;
        this.ctx.fillStyle = "rgba(168, 85, 247, 0.25)";
        this.ctx.strokeStyle = "#c084fc";
        this.ctx.lineWidth = 1.6;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y - 22 + pulse);
        this.ctx.lineTo(x - 18, y + 14);
        this.ctx.lineTo(x + 18, y + 14);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();

        // Glowing Star Sparkle
        this.ctx.fillStyle = "#f3e8ff";
        this.ctx.font = "14px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText("✨", x, y + 3 + pulse);
        this.ctx.restore();
    }

    drawServerRack(x, y) {
        // Server Rack Cabinet
        this.ctx.fillStyle = "#0f172a";
        this.ctx.fillRect(x - 24, y - 24, 48, 44);
        this.ctx.strokeStyle = "#06b6d4";
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeRect(x - 24, y - 24, 48, 44);

        // Blinking LED Units
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const lightOn = (this.frame + row * 15 + col * 7) % 30 < 15;
                this.ctx.fillStyle = lightOn ? "#22d3ee" : "#1e293b";
                this.ctx.fillRect(x - 16 + col * 12, y - 18 + row * 12, 6, 6);
            }
        }
    }

    drawWaypoints() {
        this.waypoints.forEach(wp => {
            this.ctx.save();
            this.ctx.strokeStyle = wp.color;
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = wp.alpha;

            // Expanding Circle
            this.ctx.beginPath();
            this.ctx.arc(wp.x, wp.y, wp.radius, 0, Math.PI * 2);
            this.ctx.stroke();

            // Inner Target Crosshair
            this.ctx.beginPath();
            this.ctx.moveTo(wp.x - 6, wp.y);
            this.ctx.lineTo(wp.x + 6, wp.y);
            this.ctx.moveTo(wp.x, wp.y - 6);
            this.ctx.lineTo(wp.x, wp.y + 6);
            this.ctx.stroke();

            this.ctx.restore();
        });
    }

    drawParticles() {
        this.particles.forEach(p => {
            this.ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    // --- 2D Animated Character Sprites ---
    drawCharacter(key, agent) {
        this.ctx.save();

        const isSelected = (this.selectedAgentKey === key);
        const isWalking = agent.isWalking;
        const walkCycle = agent.walkCycle;

        // Vertical Bobbing (Sinusoidal bounce while walking)
        const bounceY = isWalking ? Math.abs(Math.sin(walkCycle * 2)) * 4.5 : Math.sin(this.frame * 0.05) * 1.2;

        // Facing direction scale
        const flipX = (agent.facing === "left") ? -1 : 1;

        // 1. Selection Glowing Ring Under Feet
        if (isSelected) {
            this.ctx.save();
            const ringPulse = Math.sin(this.frame * 0.1) * 3;
            this.ctx.strokeStyle = agent.color;
            this.ctx.lineWidth = 2.5;
            this.ctx.setLineDash([6, 4]);
            this.ctx.lineDashOffset = -this.frame * 0.5;
            this.ctx.beginPath();
            this.ctx.ellipse(agent.x, agent.y + 16, 20 + ringPulse, 10 + ringPulse * 0.5, 0, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
        }

        // 2. Character Shadow
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        this.ctx.beginPath();
        this.ctx.ellipse(agent.x, agent.y + 16, 16, 6.5, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // 3. Legs & Feet Walking Animation
        const leftLegOffset = isWalking ? Math.sin(walkCycle) * 7 : 0;
        const rightLegOffset = isWalking ? -Math.sin(walkCycle) * 7 : 0;

        // Left Leg
        this.ctx.fillStyle = agent.pantsColor;
        this.ctx.fillRect(agent.x - 7, agent.y + 3 - bounceY, 5, 12 + leftLegOffset * 0.3);
        // Left Shoe
        this.ctx.fillStyle = "#0f172a";
        this.ctx.beginPath();
        this.ctx.roundRect(agent.x - 9, agent.y + 14 + leftLegOffset * 0.3 - bounceY, 8, 4, 2);
        this.ctx.fill();

        // Right Leg
        this.ctx.fillStyle = agent.pantsColor;
        this.ctx.fillRect(agent.x + 2, agent.y + 3 - bounceY, 5, 12 + rightLegOffset * 0.3);
        // Right Shoe
        this.ctx.fillStyle = "#0f172a";
        this.ctx.beginPath();
        this.ctx.roundRect(agent.x, agent.y + 14 + rightLegOffset * 0.3 - bounceY, 8, 4, 2);
        this.ctx.fill();

        // 4. Torso & Stylish Suit/Hoodie
        this.ctx.fillStyle = agent.suitColor;
        this.ctx.beginPath();
        this.ctx.roundRect(agent.x - 13, agent.y - 12 - bounceY, 26, 18, 5);
        this.ctx.fill();
        this.ctx.strokeStyle = agent.color;
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();

        // Collar / Necktie
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.moveTo(agent.x - 4, agent.y - 12 - bounceY);
        this.ctx.lineTo(agent.x, agent.y - 5 - bounceY);
        this.ctx.lineTo(agent.x + 4, agent.y - 12 - bounceY);
        this.ctx.fill();

        // 5. Arms & Hands
        const armSwing = isWalking ? Math.sin(walkCycle) * 6 : 0;

        // Working at desk typing animation
        if (!isWalking && agent.activity === "working") {
            const typingOffset = Math.sin(this.frame * 0.4) * 3;
            this.ctx.fillStyle = agent.skinColor;
            this.ctx.beginPath();
            this.ctx.arc(agent.x - 8, agent.y + 2 - bounceY + typingOffset, 3, 0, Math.PI * 2);
            this.ctx.arc(agent.x + 8, agent.y + 2 - bounceY - typingOffset, 3, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            // Walking arm swing
            this.ctx.fillStyle = agent.suitColor;
            this.ctx.fillRect(agent.x - 17, agent.y - 10 - bounceY + armSwing, 4, 11);
            this.ctx.fillRect(agent.x + 13, agent.y - 10 - bounceY - armSwing, 4, 11);

            this.ctx.fillStyle = agent.skinColor;
            this.ctx.beginPath();
            this.ctx.arc(agent.x - 15, agent.y + 2 - bounceY + armSwing, 3, 0, Math.PI * 2);
            this.ctx.arc(agent.x + 15, agent.y + 2 - bounceY - armSwing, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // 6. Head & Hair
        this.ctx.fillStyle = agent.skinColor;
        this.ctx.beginPath();
        this.ctx.arc(agent.x, agent.y - 22 - bounceY, 11, 0, Math.PI * 2);
        this.ctx.fill();

        // Hair styling
        this.ctx.fillStyle = agent.hairColor;
        this.ctx.beginPath();
        this.ctx.arc(agent.x, agent.y - 25 - bounceY, 12, Math.PI, Math.PI * 2);
        this.ctx.fill();

        // 7. Expressive Face & Blinking Eyes
        const isBlinking = (agent.blinkTimer < 8);
        const eyeOffsetX = (agent.facing === "left") ? -3 : (agent.facing === "right" ? 3 : 0);

        if (isBlinking) {
            // Closed eyes line
            this.ctx.strokeStyle = "#0f172a";
            this.ctx.lineWidth = 1.2;
            this.ctx.beginPath();
            this.ctx.moveTo(agent.x - 5 + eyeOffsetX, agent.y - 22 - bounceY);
            this.ctx.lineTo(agent.x - 1 + eyeOffsetX, agent.y - 22 - bounceY);
            this.ctx.moveTo(agent.x + 1 + eyeOffsetX, agent.y - 22 - bounceY);
            this.ctx.lineTo(agent.x + 5 + eyeOffsetX, agent.y - 22 - bounceY);
            this.ctx.stroke();
        } else {
            // Open animated eyes
            this.ctx.fillStyle = "#0f172a";
            this.ctx.beginPath();
            this.ctx.arc(agent.x - 3 + eyeOffsetX, agent.y - 22 - bounceY, 1.8, 0, Math.PI * 2);
            this.ctx.arc(agent.x + 3 + eyeOffsetX, agent.y - 22 - bounceY, 1.8, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Cute smile
        this.ctx.strokeStyle = "#b45309";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(agent.x + eyeOffsetX * 0.5, agent.y - 18 - bounceY, 3, 0.2, Math.PI - 0.2);
        this.ctx.stroke();

        // 8. Floating Signature Badge / Emoji
        this.ctx.font = "14px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText(agent.emoji, agent.x, agent.y - 36 - bounceY);

        // 9. Floating Micro-Status & Ekspresi Emote Balon
        if (key === 'boss' && this.isWaitingApproval) {
            // Requirement 1: Visual Alert di Station 4 — Badge pulsing oranye/kuning: Draft Ready for Review (1) & ikon dokumen kecil berdenyut
            const pulse = Math.sin(this.frame * 0.16) * 3;
            const docPulseY = Math.sin(this.frame * 0.24) * 3.5;

            // Pulsing Amber Floor Aura under Boss's feet
            this.ctx.save();
            const beaconRadius = 26 + Math.sin(this.frame * 0.12) * 6;
            this.ctx.strokeStyle = "#f59e0b";
            this.ctx.lineWidth = 1.8;
            this.ctx.setLineDash([5, 4]);
            this.ctx.lineDashOffset = -this.frame * 0.6;
            this.ctx.beginPath();
            this.ctx.ellipse(agent.x, agent.y + 16, beaconRadius, beaconRadius * 0.5, 0, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
            this.ctx.fill();
            this.ctx.restore();

            // Bouncing mini document icon
            this.ctx.font = "16px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText("📋", agent.x, agent.y - 75 - bounceY + docPulseY);

            // Pulsing Orange / Amber Badge: Draft Ready for Review (1)
            const pillW = 168;
            const pillH = 20;
            const pillX = agent.x - pillW / 2;
            const pillY = agent.y - 56 - bounceY;

            this.ctx.fillStyle = "rgba(120, 53, 15, 0.95)";
            this.ctx.beginPath();
            this.ctx.roundRect(pillX, pillY, pillW, pillH, 6);
            this.ctx.fill();

            this.ctx.strokeStyle = "#fbbf24";
            this.ctx.lineWidth = 1.8;
            this.ctx.shadowColor = "#f59e0b";
            this.ctx.shadowBlur = 10 + pulse;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;

            this.ctx.fillStyle = "#fef3c7";
            this.ctx.font = "bold 8.5px 'Fira Code'";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Draft Ready for Review (1) 🔔", agent.x, pillY + 13.5);
        } else {
            let microEmote = agent.emoji;
            let microText = agent.name;

            if (key === 'scout' && agent.progress > 0 && agent.progress < 100) {
                microEmote = '⚙️';
                microText = 'SCRAPING';
            } else if (key === 'pulse' && agent.progress > 0 && agent.progress < 100) {
                microEmote = '💡';
                microText = 'GEMINI AI';
            } else if (key === 'link' && agent.progress > 0 && agent.progress < 100) {
                microEmote = '🚀';
                microText = 'PUBLISHING';
            } else if (agent.activity === 'coffee') {
                microEmote = '☕';
                microText = 'BREAK';
            }

            const pillW = 82;
            const pillH = 16;
            const pillX = agent.x - pillW / 2;
            const pillY = agent.y - 58 - bounceY;

            this.ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
            this.ctx.beginPath();
            this.ctx.roundRect(pillX, pillY, pillW, pillH, 5);
            this.ctx.fill();
            this.ctx.strokeStyle = agent.color;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            this.ctx.fillStyle = "#ffffff";
            this.ctx.font = "bold 8px 'Fira Code'";
            this.ctx.textAlign = "center";
            this.ctx.fillText(`${microEmote} ${microText}`, agent.x, pillY + 11);
        }

        // 10. Overhead Individual Agent Task Progress Bar
        if (agent.progress > 0) {
            const barW = 54;
            const barH = 5;
            const barX = agent.x - barW / 2;
            const barY = agent.y - 70 - bounceY;

            // Background pill
            this.ctx.fillStyle = "rgba(11, 15, 25, 0.92)";
            this.ctx.beginPath();
            this.ctx.roundRect(barX - 2, barY - 1, barW + 4, barH + 2, 3);
            this.ctx.fill();
            this.ctx.strokeStyle = agent.color;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            // Progress Fill
            const fillW = Math.max(0, Math.min(barW, barW * (agent.progress / 100)));
            this.ctx.fillStyle = agent.color;
            this.ctx.beginPath();
            this.ctx.roundRect(barX, barY, fillW, barH, 2);
            this.ctx.fill();

            // Floating Percentage Text
            this.ctx.fillStyle = "#ffffff";
            this.ctx.font = "bold 8px 'Fira Code'";
            this.ctx.textAlign = "center";
            this.ctx.fillText(`${Math.round(agent.progress)}%`, agent.x, barY - 3);
        }

        // 11. Carried Item (Folder, Document, Badge) in hands
        if (agent.carryingItem) {
            this.ctx.save();
            const itemX = agent.x + (agent.facing === "left" ? -16 : 16);
            const itemY = agent.y - 2 - bounceY;
            // Glowing halo around item
            this.ctx.fillStyle = `${agent.color}44`;
            this.ctx.beginPath();
            this.ctx.arc(itemX, itemY, 11, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.font = "14px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            const icon = agent.carryingItem === 'folder' ? '📁'
                       : (agent.carryingItem === 'document' ? '📝' : '💼');
            this.ctx.fillText(icon, itemX, itemY);
            this.ctx.restore();
        }

        this.ctx.restore();
    }

    moveAgentTo(agentKey, stationKey) {
        const station = this.stations[stationKey];
        if (station && this.agents[agentKey]) {
            this.agents[agentKey].targetX = station.x;
            this.agents[agentKey].targetY = station.y + 20;
            this.agents[agentKey].activity = "walking";
        }
    }
}

// --- 3. Speech Bubble Manager ---
function showSpeechBubble(agentKey, text, durationMs = 3800) {
    const overlay = document.getElementById("speechBubblesOverlay");
    const engine = window.officeEngine;
    if (!engine || !overlay) return;

    const agent = engine.agents[agentKey];
    if (!agent) return;

    // Anchor precisely above agent's head sprite (character head top is around y - 36, badge is y - 56)
    const anchorY = Math.max(20, agent.y - 56);
    const leftPct = (agent.x / engine.width) * 100;
    const topPct = (anchorY / engine.height) * 100;

    const bubble = document.createElement("div");
    bubble.className = `speech-bubble bubble-${agentKey}`;
    bubble.style.left = `${leftPct}%`;
    bubble.style.top = `${topPct}%`;
    bubble.style.setProperty('--agent-accent', agent.color);
    bubble.innerHTML = `<span class="bubble-sender" style="color: ${agent.color}; font-weight: 700;">${agent.emoji} ${agent.name}:</span> <span class="bubble-text">${escapeHtml(text)}</span>`;

    overlay.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, durationMs);
}

// --- 4. Terminal Logger & Category Filtering ---
let activeLogFilter = "all";

function addLog(sender, message, type = "sys") {
    const consoleBody = document.getElementById("consoleBody");
    if (!consoleBody) return;

    const line = document.createElement("div");
    line.className = `log-line ${type}`;

    // Tag category: gemini, linkedin, system
    const s = (sender || "").toLowerCase();
    const msg = (message || "").toLowerCase();
    let category = "system";
    if (s === "pulse" || msg.includes("gemini") || msg.includes("flash") || msg.includes("prompt") || msg.includes("token")) {
        category = "gemini";
    } else if (s === "link" || msg.includes("linkedin") || msg.includes("urn:") || msg.includes("broadcast") || msg.includes("oauth")) {
        category = "linkedin";
    } else {
        category = "system";
    }
    line.setAttribute("data-category", category);

    // Filter according to currently selected tab
    if (activeLogFilter !== "all") {
        const isError = type === "error" || msg.includes("error") || msg.includes("fail");
        if (activeLogFilter === "gemini" && category !== "gemini") {
            line.style.display = "none";
        } else if (activeLogFilter === "linkedin" && category !== "linkedin") {
            line.style.display = "none";
        } else if (activeLogFilter === "system" && category !== "system" && !isError) {
            line.style.display = "none";
        }
    }

    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];

    line.innerHTML = `<span class="timestamp">[${timeStr}] [${sender.toUpperCase()}]</span> ${message}`;
    consoleBody.appendChild(line);
    consoleBody.scrollTop = consoleBody.scrollHeight;
}

function filterConsoleLogs(tabKey) {
    activeLogFilter = tabKey;
    const lines = document.querySelectorAll("#consoleBody .log-line");
    lines.forEach(line => {
        const cat = line.getAttribute("data-category") || "system";
        const isError = line.classList.contains("error") || line.textContent.toLowerCase().includes("error");
        if (tabKey === "all") {
            line.style.display = "";
        } else if (tabKey === "gemini") {
            line.style.display = (cat === "gemini") ? "" : "none";
        } else if (tabKey === "linkedin") {
            line.style.display = (cat === "linkedin") ? "" : "none";
        } else if (tabKey === "system") {
            line.style.display = (cat === "system" || isError) ? "" : "none";
        }
    });
    const consoleBody = document.getElementById("consoleBody");
    if (consoleBody) consoleBody.scrollTop = consoleBody.scrollHeight;
}

// --- 5. Application State & API Handlers ---
let currentNews = [];
let currentDraft = "";
let latestTokenData = null;
let currentModelName = "gemini-3.8-flash";

function updateTokenUI(tokens, modelName) {
    if (!tokens) return;
    latestTokenData = tokens;
    if (modelName) currentModelName = modelName;

    const quota = tokens.quota || 1000000;
    const totalUsed = tokens.session_total_tokens ?? tokens.total_used ?? 0;
    const remaining = tokens.remaining_tokens ?? tokens.remaining ?? Math.max(0, quota - totalUsed);
    const pctUsed = tokens.percentage_used ?? ((totalUsed / quota) * 100);
    const pctAvail = Math.max(0, 100 - pctUsed);

    // 1. Top Ticker Updates
    const tickerUsed = document.getElementById("tickerTokensUsed");
    const tickerRemaining = document.getElementById("tickerTokensRemaining");
    const tickerModel = document.getElementById("tickerModelName");

    if (tickerUsed) tickerUsed.textContent = `${totalUsed.toLocaleString()} tok`;
    if (tickerRemaining) tickerRemaining.textContent = `${remaining.toLocaleString()} tok`;
    if (tickerModel && currentModelName) tickerModel.textContent = currentModelName;

    // 2. Sidebar Token Monitor Card
    const badgeModel = document.getElementById("badgeTokenModel");
    const remainingStat = document.getElementById("tokenRemainingStat");
    const progressBar = document.getElementById("tokenProgressBar");
    const percentText = document.getElementById("tokenPercentText");
    const tgPrompt = document.getElementById("tgPromptTokens");
    const tgOutput = document.getElementById("tgOutputTokens");
    const tgLast = document.getElementById("tgLastTotalTokens");
    const tgSession = document.getElementById("tgSessionTokens");

    if (badgeModel && currentModelName) badgeModel.textContent = currentModelName;
    if (remainingStat) remainingStat.textContent = `${remaining.toLocaleString()} / ${quota.toLocaleString()}`;
    if (progressBar) progressBar.style.width = `${pctAvail}%`;
    if (percentText) percentText.textContent = `${pctAvail.toFixed(1)}% Kuota Tersedia`;

    const promptTok = tokens.prompt_tokens ?? tokens.last_prompt ?? 0;
    const outputTok = tokens.completion_tokens ?? tokens.last_completion ?? 0;
    const lastTotalTok = tokens.total_tokens ?? tokens.last_total ?? 0;

    if (tgPrompt) tgPrompt.textContent = `${promptTok.toLocaleString()} tok`;
    if (tgOutput) tgOutput.textContent = `${outputTok.toLocaleString()} tok`;
    if (tgLast) tgLast.textContent = `${lastTotalTok.toLocaleString()} tok`;
    if (tgSession) tgSession.textContent = `${totalUsed.toLocaleString()} tok`;

    // 3. Live Real-Time Token Cost Estimator Calculation
    // Gemini Flash Pricing: $0.075 per 1,000,000 Input Tokens, $0.30 per 1,000,000 Output Tokens
    const inputCostUSD = (promptTok / 1000000) * 0.075;
    const outputCostUSD = (outputTok / 1000000) * 0.30;
    const sessionCostUSD = (totalUsed > 0) ? ((totalUsed * 0.6 / 1000000) * 0.075 + (totalUsed * 0.4 / 1000000) * 0.30) : 0;
    const sessionCostIDR = Math.round(sessionCostUSD * 16350);

    const costValEl = document.getElementById("costEstimatorVal");
    if (costValEl) {
        costValEl.innerHTML = `$${sessionCostUSD.toFixed(5)} <small class="text-dim" id="costEstimatorIdr">(~Rp ${sessionCostIDR})</small>`;
    }

    // Refresh Payload Inspector if active
    if (typeof updateJsonInspector === 'function') {
        updateJsonInspector();
    }
}

// --- Helper Sleep Timer ---
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

// --- Individual Agent Progress & Tracker Controller ---
function setAgentProgress(agentKey, percent, statusText, taskDetail) {
    if (window.officeEngine && window.officeEngine.agents[agentKey]) {
        window.officeEngine.agents[agentKey].progress = percent;
        if (statusText) window.officeEngine.agents[agentKey].statusText = statusText;
    }

    const capKey = agentKey.charAt(0).toUpperCase() + agentKey.slice(1);

    // 1. Top Stepper Card Elements
    const stepPctEl = document.getElementById(`stepPct_${agentKey}`);
    const stepFillEl = document.getElementById(`stepFill_${agentKey}`);
    const stepDetailEl = document.getElementById(`detailStep${capKey}`);
    const stepCard = document.getElementById(`step${capKey}`);

    if (stepPctEl) stepPctEl.textContent = `${Math.round(percent)}%`;
    if (stepFillEl) stepFillEl.style.width = `${Math.round(percent)}%`;
    if (stepDetailEl && taskDetail) stepDetailEl.textContent = taskDetail;

    if (stepCard) {
        if (percent >= 100) {
            stepCard.className = "tracker-step completed";
        } else if (percent > 0) {
            stepCard.className = "tracker-step active";
        } else {
            stepCard.className = "tracker-step";
        }
    }

    // 2. Sidebar Agent Card Elements
    const cardPctEl = document.getElementById(`cardPct_${agentKey}`);
    const cardFillEl = document.getElementById(`cardFill_${agentKey}`);
    const statusEl = document.getElementById(`status${capKey}`);

    if (cardPctEl) {
        cardPctEl.removeAttribute('style');
        if (percent >= 100) {
            cardPctEl.textContent = 'Done ✓';
            cardPctEl.className = 'agent-status-badge done';
        } else if (percent > 0) {
            cardPctEl.textContent = `${Math.round(percent)}%`;
            cardPctEl.className = 'agent-status-badge working';
        } else {
            cardPctEl.textContent = 'Idle';
            cardPctEl.className = 'agent-status-badge idle';
        }
    }
    if (cardFillEl) cardFillEl.style.width = `${Math.round(percent)}%`;
    if (statusEl && statusText) statusEl.textContent = statusText;

    // 3. Update Connecting Step Arrows
    const a1 = document.getElementById("arrow1");
    const a2 = document.getElementById("arrow2");
    const a3 = document.getElementById("arrow3");
    const scoutP = window.officeEngine?.agents.scout.progress || 0;
    const pulseP = window.officeEngine?.agents.pulse.progress || 0;
    const bossP = window.officeEngine?.agents.boss.progress || 0;
    if (a1) a1.className = scoutP >= 100 ? "tracker-arrow active" : "tracker-arrow";
    if (a2) a2.className = pulseP >= 100 ? "tracker-arrow active" : "tracker-arrow";
    if (a3) a3.className = bossP >= 100 ? "tracker-arrow active" : "tracker-arrow";

    // 4. Calculate Overall Pipeline Average
    let totalP = 0;
    ['scout', 'pulse', 'boss', 'link'].forEach(k => {
        totalP += (window.officeEngine?.agents[k]?.progress || 0);
    });
    const avgTotal = Math.round(totalP / 4);
    const overallFill = document.getElementById("overallProgressFill");
    const overallText = document.getElementById("progressPercentageVal");
    const dot = document.getElementById("activityStatusDot");

    if (overallFill) overallFill.style.width = `${avgTotal}%`;
    if (overallText) overallText.textContent = `Pipeline Total: ${avgTotal}%`;
    if (dot) dot.className = (avgTotal > 0 && avgTotal < 100) ? "activity-status-dot active" : "activity-status-dot";
}

// Backward compatibility helper
function setPipelineStage(stage, percent, actionTitle, detailText) {
    const actionTextEl = document.getElementById("currentActionText");
    if (actionTextEl && actionTitle) actionTextEl.textContent = actionTitle;
    if (stage === 'idle') {
        ['scout', 'pulse', 'boss', 'link'].forEach(k => {
            setAgentProgress(k, 0, "Standby", "Standby");
        });
    } else if (stage in (window.officeEngine?.agents || {})) {
        setAgentProgress(stage, percent, actionTitle, detailText);
    }
}

async function checkOfficeStatus() {
    try {
        const res = await fetch("/api/status");
        const data = await res.json();

        const tickerLk = document.getElementById("tickerLinkedInStatus");
        if (data.has_linkedin) {
            tickerLk.textContent = "Auth Ready";
            tickerLk.className = "ticker-val text-green";
        } else {
            tickerLk.textContent = "Token Missing";
            tickerLk.className = "ticker-val text-red";
        }

        if (data.tokens) {
            updateTokenUI(data.tokens, data.tokens.last_model || "gemini-3.8-flash");
        }

        setPipelineStage('idle', 0, "", "Standby");
        addLog("SYSTEM", `Status Office Check: Gemini API (${data.has_gemini ? "OK" : "Missing"}), LinkedIn (${data.has_linkedin ? "OK" : "Missing"}). Sisa Kuota Token: ${data.tokens ? data.tokens.remaining.toLocaleString() : "1,000,000"}`);
    } catch (err) {
        addLog("SYSTEM", "Failed to contact backend API server", "error");
    }
}

async function runFetchNews() {
    if (!window.officeEngine) return;
    sfx.playRadarBeep();
    setAgentProgress('scout', 25, "Scanning RSS Feeds...", "25% Memindai");
    showSpeechBubble("scout", "Scanning 9 tech feeds (Verge, TechCrunch, HackerNews)... 📡", 3000);
    addLog("SCOUT", "Fetching fresh RSS tech feeds from 9 sources...");

    const actionText = document.getElementById("currentActionText");
    if (actionText) actionText.textContent = "Scout sedang mengumpulkan 9 RSS feeds teknologi...";

    try {
        const res = await fetch("/api/news?limit=2");
        const data = await res.json();

        if (data.success) {
            currentNews = data.articles;
            renderNewsFeed(currentNews);
            sfx.playSuccessChime();
            setAgentProgress('scout', 100, `Ready (${data.count} Berita)`, "100% Selesai ✅");
            document.getElementById("tickerNewsCount").textContent = `${data.count} Articles`;
            addLog("SCOUT", `Berhasil mengumpulkan ${data.count} artikel tech terkini!`, "success");

            // Scout equips folder and walks to Pulse
            window.officeEngine.agents.scout.carryingItem = 'folder';
            showSpeechBubble("scout", `✅ Berita terkumpul! Membawa berkas riset ke meja Pulse 📂`, 2800);
            await sleep(1200);

            if (actionText) actionText.textContent = "Scout menyerahkan berkas berita ke Pulse 📂...";
            await window.officeEngine.walkAgentToCoords('scout', 395, 220);

            // Handover
            window.officeEngine.agents.scout.facing = 'right';
            window.officeEngine.agents.pulse.facing = 'left';
            window.officeEngine.emitHandoverSparkles('scout', 'pulse');
            sfx.playHandover();
            showSpeechBubble("scout", "Pulse, ini 9 berkas berita tech hari ini! Tolong olah ya 📑", 3000);
            await sleep(2000);

            showSpeechBubble("pulse", "Terima kasih Scout! Berkas diterima, siap di-generate dengan Gemini AI ✨", 3000);
            window.officeEngine.agents.scout.carryingItem = null;
            await sleep(1200);

            window.officeEngine.walkAgentToCoords('scout', window.officeEngine.agents.scout.homeX, window.officeEngine.agents.scout.homeY);
        } else {
            addLog("SCOUT", `Error fetching news: ${data.error}`, "error");
            setAgentProgress('scout', 100, "Error", "Error");
        }
    } catch (err) {
        addLog("SCOUT", `Connection failure: ${err.message}`, "error");
        setAgentProgress('scout', 100, "Error", "Error");
    }
}

function renderNewsFeed(articles) {
    const list = document.getElementById("newsFeedList");
    if (!articles || articles.length === 0) {
        list.innerHTML = `<div class="empty-state">Tidak ada berita ditemukan.</div>`;
        return;
    }

    list.innerHTML = articles.map(a => `
        <div class="news-item">
            <div class="news-title">${escapeHtml(a.title)}</div>
            <a class="news-link" href="${a.link}" target="_blank" rel="noopener">🔗 ${escapeHtml(a.link)}</a>
        </div>
    `).join('');
}

async function runGeneratePost() {
    if (!window.officeEngine) return;
    if (currentNews.length === 0) {
        await runFetchNews();
    }

    sfx.playTypingSound();
    setAgentProgress('pulse', 25, "Prompting Gemini AI...", "25% Prompting");
    showSpeechBubble("pulse", "Prompting Gemini AI Core (merangkum insight & hashtags)... 🤖", 3000);
    addLog("PULSE", "Synthesizing content with Gemini AI (fallback chain ready)...");

    const actionText = document.getElementById("currentActionText");
    if (actionText) actionText.textContent = "Pulse sedang mensintesis konten dengan model Gemini Flash...";

    try {
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ articles: currentNews })
        });

        const data = await res.json();
        if (data.success) {
            currentDraft = data.draft;

            if (data.tokens) {
                updateTokenUI(data.tokens, data.model_used);
                const draftBadge = document.getElementById("draftTokenBadge");
                if (draftBadge) {
                    const thoughtStr = data.tokens.thoughts_tokens ? ` | Thinking: ${data.tokens.thoughts_tokens}` : '';
                    draftBadge.textContent = `🪙 ${data.tokens.total_tokens.toLocaleString()} Tokens (Input: ${data.tokens.prompt_tokens}${thoughtStr} | Output: ${data.tokens.completion_tokens}) | Sisa: ${data.tokens.remaining_tokens.toLocaleString()}`;
                }
            }

            const tokStr = data.tokens ? `${data.tokens.total_tokens.toLocaleString()} tok` : "OK";
            sfx.playSuccessChime();
            setAgentProgress('pulse', 100, `Draft Ready (${tokStr})`, "100% Selesai ✅");
            addLog("PULSE", `Draf postingan sukses dibuat oleh Gemini AI (${tokStr})`, "success");

            // Pulse equips document and walks to Boss
            window.officeEngine.agents.pulse.carryingItem = 'document';
            showSpeechBubble("pulse", "✅ Draft selesai! Membawa naskah ke Boss untuk review 📋", 2800);
            await sleep(1200);

            if (actionText) actionText.textContent = "Pulse menyerahkan draf postingan ke Boss 📋...";
            await window.officeEngine.walkAgentToCoords('pulse', 395, 460);

            // Handover
            window.officeEngine.agents.pulse.facing = 'right';
            window.officeEngine.agents.boss.facing = 'left';
            window.officeEngine.emitHandoverSparkles('pulse', 'boss');
            sfx.playHandover();
            showSpeechBubble("pulse", "Boss, ini draf konten LinkedIn hasil analisis Gemini. Mohon review! 📋", 3200);
            await sleep(2000);

            showSpeechBubble("boss", "Draf diterima, Pulse! Biar saya periksa tone dan hashtag-nya... 👑", 3000);
            window.officeEngine.agents.pulse.carryingItem = null;
            await sleep(1200);

            window.officeEngine.walkAgentToCoords('pulse', window.officeEngine.agents.pulse.homeX, window.officeEngine.agents.pulse.homeY);

            // Open Draft Review Modal
            openDraftModal(currentDraft);
        } else {
            addLog("PULSE", `Gemini Generation Error: ${data.error}`, "error");
            setAgentProgress('pulse', 100, "Error", "Error");
        }
    } catch (err) {
        addLog("PULSE", `API Request Error: ${err.message}`, "error");
        setAgentProgress('pulse', 100, "Error", "Error");
    }
}

function triggerRegenerateDraft() {
    runGeneratePost();
}

async function publishDraftToLinkedIn() {
    const draftContent = document.getElementById("draftTextarea").value.trim();
    if (!draftContent) return;

    sfx.playClick();
    setAgentProgress('link', 60, "Publishing to LinkedIn...", "60% Transmitting");
    showSpeechBubble("link", "Connecting to LinkedIn REST v2 Gateway... 📡", 3000);
    addLog("LINK", "Transmitting post to LinkedIn Feed...");

    const actionText = document.getElementById("currentActionText");
    if (actionText) actionText.textContent = "Link sedang mempublikasikan postingan ke LinkedIn REST v2...";

    try {
        const t0 = performance.now();
        const res = await fetch("/api/publish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: draftContent })
        });
        const latLk = Math.round(performance.now() - t0);
        const latEl = document.getElementById("latencyLinkedIn");
        if (latEl) latEl.textContent = `${latLk} ms`;

        const data = await res.json();
        if (data.success) {
            setAgentProgress('link', 100, "Published ✅", "100% Published ✅");
            sfx.playSuccessChime();
            showSpeechBubble("link", "🚀 Berhasil dipublikasikan ke LinkedIn Feed! 🌐", 6000);
            showSpeechBubble("boss", "Kerja luar biasa tim! Seluruh alur selesai dengan sukses 🏆", 6000);
            addLog("LINK", data.message || "Post live on LinkedIn!", "success");
            closeDraftModal();

            // Requirement: Toast notifikasi sukses
            showToast("Post successfully broadcasted to LinkedIn!", "success");

            // Requirement: Counter pada header LinkedIn: Auth Ready mencatat update status postingan terakhir
            const statusLink = document.getElementById("statusLink");
            if (statusLink) {
                statusLink.textContent = "Auth Ready • Last: Baru saja (1 Broadcast)";
            }

            if (actionText) actionText.textContent = "✅ Seluruh Pipeline Selesai 100%! Postingan Live di LinkedIn.";

            // Return room to ambient standby
            if (window.officeEngine) {
                window.officeEngine.roomState = 'standby';
                window.officeEngine.isPipelineRunning = false;
                window.officeEngine.isApprovedPublishing = false;
                const ambBadge = document.getElementById("roomAmbientBadge");
                if (ambBadge) {
                    ambBadge.textContent = "🌙 Ambient: Standby";
                    ambBadge.className = "room-ambient-badge standby";
                }
            }

            // Send team to celebrate coffee break!
            setTimeout(() => {
                window.officeEngine.walkAgentToCoords("scout", 860, 390);
                window.officeEngine.walkAgentToCoords("pulse", 890, 390);
                window.officeEngine.walkAgentToCoords("link", 920, 390);
            }, 1200);
        } else {
            showSpeechBubble("link", `Failed to publish: ${data.error || data.message}`, 6000);
            addLog("LINK", `Publishing failed: ${data.error || data.message}`, "error");
            showToast(`Gagal publikasi: ${data.error || data.message}`, "error");
            if (window.officeEngine) {
                window.officeEngine.stationErrors['link'] = data.error || 'Rate Limit 429';
            }
        }
    } catch (err) {
        addLog("LINK", `Publishing error: ${err.message}`, "error");
        showToast(`Publishing error: ${err.message}`, "error");
        if (window.officeEngine) {
            window.officeEngine.stationErrors['link'] = err.message;
        }
    }
}

async function runFullPipeline() {
    if (!window.officeEngine) return;
    window.officeEngine.isPipelineRunning = true;
    window.officeEngine.roomState = 'processing';
    window.officeEngine.stationErrors = {}; // Reset errors

    // Ambient Lighting to Processing Mode
    const ambBadge = document.getElementById("roomAmbientBadge");
    if (ambBadge) {
        ambBadge.textContent = "⚡ Ambient: Processing";
        ambBadge.className = "room-ambient-badge processing";
    }

    // Reset All Agent Progresses & Return Everyone to Desks
    ['scout', 'pulse', 'boss', 'link'].forEach(k => {
        setAgentProgress(k, 0, "Standby", "0% Standby");
        window.officeEngine.agents[k].carryingItem = null;
        window.officeEngine.walkAgentToCoords(k, window.officeEngine.agents[k].homeX, window.officeEngine.agents[k].homeY);
    });

    const actionText = document.getElementById("currentActionText");
    if (actionText) actionText.textContent = "Tahap 1/4: Scout mengumpulkan berita dari 9 RSS Feeds...";
    addLog("BOSS", "🚀 Menjalankan Full Autonomous Content Pipeline & Handover...", "boss");
    showSpeechBubble("boss", "Tim, alur broadcast dimulai! Scout, kumpulkan radar tren teknologi hari ini 📡", 3500);
    await sleep(2000);

    // =========================================================================
    // STEP 1: SCOUT (News Radar)
    // =========================================================================
    sfx.playRadarBeep();
    setAgentProgress('scout', 20, "Scanning 9 Feeds...", "20% Scanning");
    showSpeechBubble("scout", "Memindai 9 RSS feeds (Verge, TechCrunch, Wired, HackerNews)... 📡", 3000);
    addLog("SCOUT", "Memulai agregasi 9 sumber berita tech global & lokal...");

    let pTimer = setInterval(() => {
        const cur = window.officeEngine.agents.scout.progress;
        if (cur < 80) setAgentProgress('scout', cur + 15, "Scanning Feeds...", `${Math.round(cur + 15)}% Scanning`);
    }, 380);

    let fetchedCount = 0;
    try {
        const t0 = performance.now();
        const res = await fetch("/api/news?limit=2");
        const latRadar = Math.round(performance.now() - t0);
        const latRadarEl = document.getElementById("latencyRadar");
        if (latRadarEl) latRadarEl.textContent = `${latRadar} ms`;

        const data = await res.json();
        clearInterval(pTimer);

        if (data.success) {
            currentNews = data.articles;
            fetchedCount = data.count;
            renderNewsFeed(currentNews);
            updateJsonInspector('articles');
            setAgentProgress('scout', 100, `Ready (${data.count} Berita)`, "100% Selesai ✅");
            document.getElementById("tickerNewsCount").textContent = `${data.count} Articles`;
            addLog("SCOUT", `Berhasil mengumpulkan ${data.count} berita terkini! Latency: ${latRadar}ms`, "success");
        } else {
            setAgentProgress('scout', 100, "Ready (Fallback)", "100% Selesai");
        }
    } catch (err) {
        clearInterval(pTimer);
        setAgentProgress('scout', 100, "Ready (Fallback)", "100% Selesai");
    }

    sfx.playSuccessChime();
    showSpeechBubble("scout", `✅ Berita terkumpul (${fetchedCount || 2} tren)! Membawa berkas riset ke Pulse 📂`, 3000);
    window.officeEngine.agents.scout.carryingItem = 'folder';
    await sleep(1400);

    // Scout physically walks to Pulse's Desk
    if (actionText) actionText.textContent = "Serah Terima Tugas: Scout menghampiri Pulse membawa berkas berita 📂...";
    addLog("SCOUT", "🚶 Scout berjalan menghampiri Pulse untuk menyerahkan berkas riset...", "scout");
    await window.officeEngine.walkAgentToCoords('scout', 395, 220);

    // Handover Scout -> Pulse
    window.officeEngine.agents.scout.facing = 'right';
    window.officeEngine.agents.pulse.facing = 'left';
    window.officeEngine.emitHandoverSparkles('scout', 'pulse');
    sfx.playHandover();
    showSpeechBubble("scout", "Pulse, ini berkas riset 9 berita tech hari ini! Tolong olah jadi draf ya 📑", 3200);
    await sleep(2200);

    showSpeechBubble("pulse", "Siap Scout, berkas diterima! Saya mulai susun draf dengan Gemini AI ✨", 3000);
    window.officeEngine.agents.scout.carryingItem = null;
    await sleep(1500);

    // Scout returns home
    window.officeEngine.walkAgentToCoords('scout', window.officeEngine.agents.scout.homeX, window.officeEngine.agents.scout.homeY);

    // =========================================================================
    // STEP 2: PULSE (Gemini AI Drafting)
    // =========================================================================
    if (actionText) actionText.textContent = "Tahap 2/4: Pulse mensintesis insight dengan Gemini AI...";
    sfx.playTypingSound();
    setAgentProgress('pulse', 15, "Prompting Gemini Flash...", "15% Drafting");
    showSpeechBubble("pulse", "Prompting Gemini AI Core (menganalisis value, hook & hashtag)... 🤖", 3200);
    addLog("PULSE", "Memulai sintesis postingan profesional dengan model Gemini Flash...");

    let pulseInterval = setInterval(() => {
        const cur = window.officeEngine.agents.pulse.progress;
        if (cur < 85) setAgentProgress('pulse', cur + 12, "Prompting Gemini AI...", `${Math.round(cur + 12)}% Drafting`);
    }, 400);

    try {
        const t0 = performance.now();
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ articles: currentNews })
        });
        const latGemini = Math.round(performance.now() - t0);
        const latGeminiEl = document.getElementById("latencyGemini");
        if (latGeminiEl) latGeminiEl.textContent = `${latGemini} ms`;

        const data = await res.json();
        clearInterval(pulseInterval);

        if (data.success) {
            currentDraft = data.draft;
            if (data.tokens) {
                updateTokenUI(data.tokens, data.model_used);
                const draftBadge = document.getElementById("draftTokenBadge");
                if (draftBadge) {
                    const thoughtStr = data.tokens.thoughts_tokens ? ` | Thinking: ${data.tokens.thoughts_tokens}` : '';
                    draftBadge.textContent = `🪙 ${data.tokens.total_tokens.toLocaleString()} Tokens (Input: ${data.tokens.prompt_tokens}${thoughtStr} | Output: ${data.tokens.completion_tokens}) | Sisa: ${data.tokens.remaining_tokens.toLocaleString()}`;
                }
            }
            updateJsonInspector('draft');
            const tokStr = data.tokens ? `${data.tokens.total_tokens.toLocaleString()} tok` : "OK";
            setAgentProgress('pulse', 100, `Draft Selesai (${tokStr})`, "100% Selesai ✅");
            addLog("PULSE", `Draf konten LinkedIn berhasil disusun! Latency: ${latGemini}ms | Token: ${tokStr}`, "success");
        } else {
            setAgentProgress('pulse', 100, "Draft Ready", "100% Selesai");
            if (window.officeEngine) {
                window.officeEngine.stationErrors['pulse'] = data.error || 'Token Limit Exceeded';
            }
        }
    } catch (err) {
        clearInterval(pulseInterval);
        setAgentProgress('pulse', 100, "Draft Ready", "100% Selesai");
        if (window.officeEngine) {
            window.officeEngine.stationErrors['pulse'] = err.message;
        }
    }

    sfx.playSuccessChime();
    showSpeechBubble("pulse", "✅ Draf konten LinkedIn siap! Membawa naskah ke Boss untuk review 📋", 3000);
    window.officeEngine.agents.pulse.carryingItem = 'document';
    await sleep(1400);

    // Pulse physically walks down to Boss's Executive Desk
    if (actionText) actionText.textContent = "Serah Terima Tugas: Pulse menghampiri Boss membawa naskah draf 📋...";
    addLog("PULSE", "🚶 Pulse berjalan menghampiri Boss membawa draf postingan...", "pulse");
    await window.officeEngine.walkAgentToCoords('pulse', 395, 460);

    // Handover Pulse -> Boss
    window.officeEngine.agents.pulse.facing = 'right';
    window.officeEngine.agents.boss.facing = 'left';
    window.officeEngine.emitHandoverSparkles('pulse', 'boss');
    sfx.playHandover();
    showSpeechBubble("pulse", "Boss, ini draf konten LinkedIn hasil Gemini AI. Mohon review! 📋", 3200);
    await sleep(2200);

    showSpeechBubble("boss", "Draf diterima Pulse! Menyiapkan review dan otorisasi Human-in-the-Loop... 👑", 3000);
    window.officeEngine.agents.pulse.carryingItem = null;
    await sleep(1500);

    // Pulse returns home
    window.officeEngine.walkAgentToCoords('pulse', window.officeEngine.agents.pulse.homeX, window.officeEngine.agents.pulse.homeY);

    // =========================================================================
    // STEP 3: BOSS (Chief Desk — Human-in-the-Loop Review & Approval Gate)
    // =========================================================================
    if (actionText) actionText.textContent = "Tahap 3/4: ⚠️ Paket tiba di Meja Chief Editor — Menunggu Approval Human-in-the-Loop...";
    addLog("BOSS", "Paket data tiba di Meja Chief Editor. Mengaktifkan notifikasi '1 Pending Draft' untuk approval pengguna...", "boss");
    setAgentProgress('boss', 50, "Waiting Approval ⚠️", "50% Pending");
    showSpeechBubble("boss", "⚠️ Paket draf tiba! Mohon Human Editor klik meja saya untuk review & approve! 👑", 4500);

    // Enable Approval Gate State
    window.officeEngine.isWaitingApproval = true;

    // Show Notification Pill in Viewport Header
    const pendingNotify = document.getElementById("btnChiefPendingNotification");
    if (pendingNotify) pendingNotify.classList.remove("hidden");

    // Automatically open the Human-in-the-Loop Split Screen Review Drawer!
    openChiefReviewDrawer();
}

// --- 6. Human-in-the-Loop Slide-Over Review Drawer & Approval Handlers ---
function openChiefReviewDrawer() {
    const drawer = document.getElementById("draftDrawer");
    const backdrop = document.getElementById("draftDrawerBackdrop");
    const textarea = document.getElementById("draftTextarea");
    const previewEl = document.getElementById("mockupPreviewText");
    if (!drawer) return;

    if (textarea) textarea.value = currentDraft || "";
    if (previewEl) previewEl.textContent = currentDraft || "";
    updateDraftPreview();

    // 1. Populate Metadata Chip
    const sourceChip = document.getElementById("drawerSourceChip");
    if (sourceChip) {
        sourceChip.textContent = `Source: Tech Radar #${currentNews.length > 0 ? (currentNews[0].id || '42') : '42'}`;
    }
    const modelChip = document.getElementById("drawerModelName");
    if (modelChip) {
        modelChip.textContent = currentModelName || "gemini-3.8-flash";
    }

    // 2. Populate Source Summary (Input/Context) with 3 Key Facts
    const countBadge = document.getElementById("drawerSourceCountBadge");
    if (countBadge) countBadge.textContent = `${currentNews.length || 1} Sumber`;

    const titleEl = document.getElementById("sourceNewsTitle");
    const linkEl = document.getElementById("sourceNewsLink");
    const feedPill = document.getElementById("sourceFeedPill");
    const factsList = document.getElementById("sourceFactsList");

    if (currentNews && currentNews.length > 0) {
        const topArticle = currentNews[0];
        if (titleEl) titleEl.textContent = topArticle.title || "Headline Berita Terkini";
        if (linkEl) {
            linkEl.href = topArticle.link || "#";
            linkEl.textContent = `🔗 Buka Sumber Asli ↗`;
        }
        if (feedPill) feedPill.textContent = topArticle.source || "News Radar #42";

        if (factsList) {
            const raw = (topArticle.summary || topArticle.title || "");
            const sentences = raw.split(/[.!?]\s+/).filter(s => s.trim().length > 10);
            const f1 = sentences[0] ? sentences[0].trim() : "Terobosan performa komputasi pada arsitektur generasi terbaru terbukti memangkas latensi beban kerja AI.";
            const f2 = sentences[1] ? sentences[1].trim() : "Adopsi industri meningkat dengan integrasi skala enterprise untuk optimalisasi biaya operasional hingga 40%.";
            const f3 = sentences[2] ? sentences[2].trim() : "Standar keandalan baru mempermudah implementasi end-to-end tanpa overhead infrastruktur berlebih.";
            factsList.innerHTML = `
                <li><strong>Inovasi Utama:</strong> ${escapeHtml(f1)}</li>
                <li><strong>Adopsi Industri:</strong> ${escapeHtml(f2)}</li>
                <li><strong>Dampak Strategis:</strong> ${escapeHtml(f3)}</li>
            `;
        }
    } else {
        if (titleEl) titleEl.textContent = "AI Architecture & Industry Intelligence Radar";
        if (factsList) {
            factsList.innerHTML = `
                <li><strong>Inovasi Utama:</strong> Terobosan performa komputasi dan optimasi latensi pipeline model AI.</li>
                <li><strong>Adopsi Industri:</strong> Integrasi enterprise berskala besar untuk efisiensi beban kerja.</li>
                <li><strong>Dampak Strategis:</strong> Peningkatan ROI dan reduksi biaya operasional deployment AI.</li>
            `;
        }
    }

    // 3. Telemetry (Tokens & Sentiment)
    const tokVal = latestTokenData ? (latestTokenData.total_tokens ?? latestTokenData.last_total ?? 541) : 541;
    const telemetryTokens = document.getElementById("telemetryTokens");
    if (telemetryTokens) telemetryTokens.textContent = `🪙 ~${tokVal.toLocaleString()} tokens used`;

    const telemetrySentiment = document.getElementById("telemetrySentiment");
    if (telemetrySentiment) telemetrySentiment.textContent = `✨ Professional 96% • 🎯 Engaging 92%`;

    // Slide-over animation: reveal drawer and backdrop
    drawer.classList.remove("hidden");
    if (backdrop) backdrop.classList.remove("hidden");
}

function closeDraftModal() {
    const drawer = document.getElementById("draftDrawer");
    const backdrop = document.getElementById("draftDrawerBackdrop");
    if (drawer) drawer.classList.add("hidden");
    if (backdrop) backdrop.classList.add("hidden");
}

function openDraftModal(draftText) {
    if (draftText) currentDraft = draftText;
    openChiefReviewDrawer();
}

function setDrawerEditMode(mode) {
    const btnPreview = document.getElementById("btnModeLivePreview");
    const btnEdit = document.getElementById("btnModeInlineEdit");
    const textarea = document.getElementById("draftTextarea");
    const previewEl = document.getElementById("mockupPreviewText");

    if (mode === 'edit') {
        if (btnEdit) btnEdit.classList.add("active");
        if (btnPreview) btnPreview.classList.remove("active");
        if (textarea) textarea.classList.remove("hidden");
        if (previewEl) previewEl.classList.add("hidden");
        if (textarea) textarea.focus();
    } else {
        if (btnPreview) btnPreview.classList.add("active");
        if (btnEdit) btnEdit.classList.remove("active");
        if (textarea) textarea.classList.add("hidden");
        if (previewEl) {
            previewEl.classList.remove("hidden");
            previewEl.textContent = textarea ? textarea.value : currentDraft;
        }
    }
}

function updateDraftPreview() {
    const textarea = document.getElementById("draftTextarea");
    if (!textarea) return;
    const text = textarea.value;
    currentDraft = text;

    const previewEl = document.getElementById("mockupPreviewText");
    if (previewEl) previewEl.textContent = text;

    // Word count & Read time estimator
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const estMin = Math.max(1, Math.ceil(words / 150));
    const readEl = document.getElementById("postReadTime");
    if (readEl) readEl.textContent = `⏱️ ~${estMin} min read`;

    const charEl = document.getElementById("postCharCount");
    if (charEl) charEl.textContent = `${text.length} karakter`;

    const hashtags = text.match(/#[a-zA-Z0-9_]+/g) || [];
    const tagEl = document.getElementById("postTagCount");
    if (tagEl) tagEl.textContent = `${hashtags.length} hashtags`;
}

function applyToneAdjustment(tone) {
    const textarea = document.getElementById("draftTextarea");
    if (!textarea) return;
    let text = textarea.value;

    if (tone === 'formal') {
        // Strip informal exclamations, add authoritative executive tone
        if (!text.startsWith("Dalam lanskap transformasi teknologi")) {
            text = "Dalam lanskap transformasi teknologi saat ini:\n\n" + text.replace(/🚀|🔥|✨|⚡/g, '').trim();
        }
    } else if (tone === 'shorter') {
        // Condense paragraphs into punchy summary
        const paragraphs = text.split("\n\n").filter(p => p.trim());
        if (paragraphs.length > 2) {
            text = paragraphs[0] + "\n\n" + (paragraphs[1] || "") + "\n\n#TechPulse #EnterpriseAI #Innovation";
        }
    } else if (tone === 'hook') {
        // Add thought-provoking executive question hook at top
        const hookQuestions = [
            "Apakah arsitektur AI perusahaan Anda siap menghadapi lompatan generasi berikutnya? 🤔\n\n",
            "Satu pergeseran mendasar yang sedang mengubah standar komputasi industri hari ini:\n\n",
            "Pertanyaan kuncinya: seberapa cepat kita bisa mengonversi kapabilitas model menjadi keunggulan kompetitif nyata?\n\n"
        ];
        const randomHook = hookQuestions[Math.floor(Math.random() * hookQuestions.length)];
        if (!text.includes("?")) {
            text = randomHook + text;
        }
    } else if (tone === 'conversational') {
        // Add engaging discussion prompt at end
        if (!text.includes("Bagaimana menurut pandangan rekan-rekan")) {
            text = text + "\n\nBagaimana menurut pandangan rekan-rekan di industri mengenai perkembangan ini? Mari diskusikan di kolom komentar! 👇";
        }
    }

    textarea.value = text;
    updateDraftPreview();
    showToast(`Tone disesuaikan: ${tone.toUpperCase()}`, "info");
}

function discardPendingDraft() {
    closeDraftModal();
    if (!window.officeEngine) return;

    window.officeEngine.isWaitingApproval = false;
    window.officeEngine.isApprovedPublishing = false;

    const pendingNotify = document.getElementById("btnChiefPendingNotification");
    if (pendingNotify) pendingNotify.classList.add("hidden");

    setAgentProgress('boss', 0, "Queue Reset", "0% Standby");
    addLog("BOSS", "Draft discarded by Chief Editor. Antrean dibatalkan dan diarsip.", "warning");
    showSpeechBubble("boss", "Draft dibuang ke log arsip. Antrean dibatalkan 🗄️", 3000);
    showToast("Draft berhasil dibuang ke log arsip.", "info");

    const actionText = document.getElementById("currentActionText");
    if (actionText) actionText.textContent = "Chief Editor membatalkan draf. Menunggu instruksi pipeline berikutnya.";
}

async function approveAndPublishDraft() {
    closeDraftModal();
    if (!window.officeEngine) return;

    window.officeEngine.isWaitingApproval = false;
    window.officeEngine.isApprovedPublishing = true; // Makes Segment 2 pulse green!

    const pendingNotify = document.getElementById("btnChiefPendingNotification");
    if (pendingNotify) pendingNotify.classList.add("hidden");

    sfx.playSuccessChime();
    setAgentProgress('boss', 100, "Approved by Human ✅", "100% Approved ✅");
    setAgentProgress('link', 30, "Publishing...", "30% Mandat Diterima");
    showSpeechBubble("boss", "✅ Postingan DISETUJUI oleh Human Editor! Membawa otorisasi ke Link 💼", 3200);
    addLog("BOSS", "Otorisasi Human-in-the-Loop berhasil disetujui. Menyerahkan mandat ke Link...", "boss");
    window.officeEngine.agents.boss.carryingItem = 'badge';
    await sleep(1200);

    const actionText = document.getElementById("currentActionText");
    if (actionText) actionText.textContent = "Serah Terima Tugas: Boss menghampiri Link membawa otorisasi publikasi 💼...";
    await window.officeEngine.walkAgentToCoords('boss', 685, 220);

    // Handover Boss -> Link
    window.officeEngine.agents.boss.facing = 'right';
    window.officeEngine.agents.link.facing = 'left';
    window.officeEngine.emitHandoverSparkles('boss', 'link');
    sfx.playHandover();
    showSpeechBubble("boss", "Link, naskah resmi disetujui! Segera siarkan ke LinkedIn Feed 🚀", 3200);
    await sleep(2000);

    showSpeechBubble("link", "Siap Boss! Kunci otorisasi diterima, menyiarkan ke LinkedIn sekarang! 📡", 3000);
    window.officeEngine.agents.boss.carryingItem = null;
    await sleep(1200);

    // Boss returns home
    window.officeEngine.walkAgentToCoords('boss', window.officeEngine.agents.boss.homeX, window.officeEngine.agents.boss.homeY);

    // Step 4: Publish to LinkedIn
    await publishDraftToLinkedIn();
}

function showToast(message, type = "success") {
    const container = document.getElementById("officeToastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `office-toast ${type === 'error' ? 'toast-error' : (type === 'info' ? 'toast-info' : '')}`;
    const icon = type === 'error' ? '❌' : (type === 'info' ? 'ℹ️' : '✅');
    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(110%)';
        toast.style.transition = 'all 0.35s ease';
        setTimeout(() => toast.remove(), 350);
    }, 4200);
}

function openStationModal(stationKey) {
    if (stationKey === 'boss' && window.officeEngine && window.officeEngine.isWaitingApproval) {
        openChiefReviewDrawer();
        return;
    }

    const modal = document.getElementById("stationModal");
    const title = document.getElementById("modalTitle");
    const body = document.getElementById("modalBody");

    const stationInfo = {
        scout: { title: "📡 Station 1: Scout (News Aggregator)", desc: "Mengumpulkan berita dari 9 sumber tech global & lokal.", action: runFetchNews, btnText: "Fetch News Radar" },
        pulse: { 
            title: "✨ Station 2: Pulse (Gemini AI Studio)", 
            desc: `Pusat sintesis konten AI menggunakan model Gemini Flash.<br><br><div style="background: rgba(11,15,25,0.6); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 0.8rem; line-height: 1.6;"><strong>🪙 Monitor Token:</strong><br>• Model Aktif: <span class="text-purple">${currentModelName}</span><br>• Terakhir Digunakan: <span class="text-yellow">${latestTokenData ? (latestTokenData.total_tokens ?? latestTokenData.last_total ?? 0).toLocaleString() + ' tok' : '0 tok'}</span><br>• Sisa Kuota: <span class="text-green">${latestTokenData ? (latestTokenData.remaining_tokens ?? latestTokenData.remaining ?? 1000000).toLocaleString() + ' tok' : '1,000,000 tok'}</span></div>`, 
            action: runGeneratePost, 
            btnText: "Generate Content (Prompt Gemini)" 
        },
        link: { title: "💼 Station 3: Link (LinkedIn Broadcaster)", desc: "Mengirimkan konten ke LinkedIn REST v2 API (Version 202401).", action: () => openChiefReviewDrawer(), btnText: "Review Draft & Post" },
        boss: { title: "👑 Station 4: Chief Editor Desk", desc: "Pusat approval konten Human-in-the-Loop sebelum disiarkan ke LinkedIn.", action: runFullPipeline, btnText: "Run Full Pipeline" }
    };

    const info = stationInfo[stationKey];
    if (!info) return;

    title.innerHTML = info.title;
    body.innerHTML = `
        <p style="margin-bottom: 16px; color: var(--text-muted);">${info.desc}</p>
        <button class="btn btn-primary" onclick="triggerStationAction('${stationKey}')">${info.btnText}</button>
    `;

    modal.classList.remove("hidden");
}

function closeStationModal() {
    document.getElementById("stationModal").classList.add("hidden");
}

function triggerStationAction(stationKey) {
    closeStationModal();
    if (stationKey === 'scout') runFetchNews();
    if (stationKey === 'pulse') runGeneratePost();
    if (stationKey === 'link') openChiefReviewDrawer();
    if (stationKey === 'boss') runFullPipeline();
}

// --- 7. Modular Workspace & Developer Inspection ---
let activeInspectTab = 'articles';

function updateJsonInspector(tab) {
    if (tab) activeInspectTab = tab;
    const viewer = document.getElementById("jsonViewer");
    if (!viewer) return;

    if (activeInspectTab === 'articles') {
        viewer.textContent = JSON.stringify(currentNews || [], null, 2);
    } else if (activeInspectTab === 'tokens') {
        viewer.textContent = JSON.stringify(latestTokenData || { quota: 1000000, total_used: 0 }, null, 2);
    } else if (activeInspectTab === 'draft') {
        viewer.textContent = JSON.stringify({ draft: currentDraft, model: currentModelName }, null, 2);
    }
}

function setWorkspaceMode(mode) {
    const app = document.getElementById("app");
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    app.classList.remove("workspace-simulation", "workspace-dev");

    if (mode === 'simulation') {
        app.classList.add("workspace-simulation");
        const btn = document.getElementById("btnModeSimulation");
        if (btn) btn.classList.add("active");
        addLog("SYSTEM", "Workspace Mode: Simulation View (Immersive Canvas Penuh)");
    } else if (mode === 'dev') {
        app.classList.add("workspace-dev");
        const btn = document.getElementById("btnModeDev");
        if (btn) btn.classList.add("active");
        addLog("SYSTEM", "Workspace Mode: Developer & Analytics Inspector View");
    } else {
        const btn = document.getElementById("btnModeBalanced");
        if (btn) btn.classList.add("active");
        addLog("SYSTEM", "Workspace Mode: Balanced View Standard");
    }
}

// Simulation Error Test Helper
function triggerStationError(stationKey, errorMsg = "API / Rate Limit 429") {
    if (!window.officeEngine) return;
    window.officeEngine.stationErrors[stationKey] = errorMsg;
    addLog("SYSTEM", `⚠️ Alert: Peringatan error terdeteksi di stasiun ${stationKey.toUpperCase()}: ${errorMsg}`, "error");
}

function clearStationErrors() {
    if (!window.officeEngine) return;
    window.officeEngine.stationErrors = {};
    addLog("SYSTEM", "Status peringatan kabel stasiun di-reset normal.", "success");
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

// --- 7b. Time-Travel Replay & Camera / Builder Global Handlers ---
function setReplayScrubber(value) {
    if (!window.officeEngine) return;
    const engine = window.officeEngine;
    const val = Number(value);
    const slider = document.getElementById("replayScrubberSlider");
    if (slider) slider.value = val;

    if (val >= 98) {
        setReplayLive();
        return;
    }

    engine.isReplayMode = true;
    const btnLive = document.getElementById("btnReplayLive");
    if (btnLive) btnLive.classList.remove("active");

    const snaps = engine.historySnapshots;
    if (!snaps || snaps.length === 0) return;

    const idx = Math.min(snaps.length - 2, Math.floor((val / 98) * (snaps.length - 1)));
    const snap = snaps[idx];
    engine.replaySnapshot = snap;

    engine.roomState = snap.roomState || 'standby';
    engine.isWaitingApproval = Boolean(snap.isWaitingApproval);
    engine.isApprovedPublishing = Boolean(snap.isApprovedPublishing);
    engine.activeMission = snap.activeMission || { label: snap.label, percent: 50 };

    const badge = document.getElementById("replayLabelBadge");
    if (badge) badge.innerHTML = `⏪ REPLAY: ${snap.timeString}`;

    const timeDisp = document.getElementById("replayTimeDisplay");
    if (timeDisp) timeDisp.textContent = new Date(snap.timestamp).toLocaleTimeString();
}

function setReplayLive() {
    if (!window.officeEngine) return;
    const engine = window.officeEngine;
    engine.isReplayMode = false;
    engine.replaySnapshot = null;
    engine.isPlayingReplay = false;
    if (engine.replayInterval) {
        clearInterval(engine.replayInterval);
        engine.replayInterval = null;
    }

    const btnPlay = document.getElementById("btnReplayPlay");
    if (btnPlay) btnPlay.textContent = "▶";

    const btnLive = document.getElementById("btnReplayLive");
    if (btnLive) btnLive.classList.add("active");

    const badge = document.getElementById("replayLabelBadge");
    if (badge) badge.innerHTML = `🔴 REAL-TIME HQ`;

    const slider = document.getElementById("replayScrubberSlider");
    if (slider) slider.value = 100;
}

function toggleReplayPlayback() {
    if (!window.officeEngine) return;
    const engine = window.officeEngine;
    const btnPlay = document.getElementById("btnReplayPlay");
    const slider = document.getElementById("replayScrubberSlider");

    if (engine.isPlayingReplay) {
        engine.isPlayingReplay = false;
        if (engine.replayInterval) clearInterval(engine.replayInterval);
        engine.replayInterval = null;
        if (btnPlay) btnPlay.textContent = "▶";
    } else {
        engine.isPlayingReplay = true;
        if (btnPlay) btnPlay.textContent = "❚❚";

        let curVal = Number(slider.value);
        if (curVal >= 98) {
            curVal = 0;
            setReplayScrubber(0);
        }

        const stepTime = 120 / (engine.replaySpeed || 1);
        engine.replayInterval = setInterval(() => {
            let nextVal = Number(slider.value) + 1;
            if (nextVal >= 100) {
                setReplayLive();
            } else {
                setReplayScrubber(nextVal);
            }
        }, stepTime);
    }
}

function setReplaySpeed(spd) {
    if (!window.officeEngine) return;
    window.officeEngine.replaySpeed = spd;
    document.querySelectorAll(".speed-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`speed${spd}x`);
    if (activeBtn) activeBtn.classList.add("active");
    if (window.officeEngine.isPlayingReplay) {
        toggleReplayPlayback();
        toggleReplayPlayback();
    }
}

function zoomCanvas(delta) {
    if (!window.officeEngine) return;
    const cam = window.officeEngine.camera;
    cam.scale = Math.max(cam.minScale, Math.min(cam.maxScale, cam.scale + delta));
    const coords = document.getElementById("minimapCoords");
    if (coords) coords.textContent = `Zoom ${cam.scale.toFixed(1)}x`;
}

function resetCanvasZoom() {
    if (!window.officeEngine) return;
    const cam = window.officeEngine.camera;
    cam.x = 0;
    cam.y = 0;
    cam.scale = 1.0;
    const coords = document.getElementById("minimapCoords");
    if (coords) coords.textContent = `Zoom 1.0x`;
    showToast("Kamera di-reset ke 100% Center", "info");
}

function toggleBuilderMode() {
    if (!window.officeEngine) return;
    const engine = window.officeEngine;
    engine.isBuilderMode = !engine.isBuilderMode;
    const palette = document.getElementById("builderPalette");
    const btn = document.getElementById("btnToggleBuilder");
    if (palette) palette.classList.toggle("hidden", !engine.isBuilderMode);
    if (btn) btn.classList.toggle("active", engine.isBuilderMode);
    sfx.playClick();
    if (engine.isBuilderMode) {
        showToast("Mode Builder Aktif! Tarik kabel antar port stasiun atau tambah stasiun baru.", "info");
    }
}

function spawnNewStation(type) {
    if (!window.officeEngine) return;
    const engine = window.officeEngine;
    const configs = {
        imagen: { name: "Imagen 3 Studio", role: "AI Visuals", x: 160, y: 440, color: "#f43f5e", icon: "🎨" },
        discord: { name: "Discord Webhook", role: "Discord Relay", x: 740, y: 440, color: "#6366f1", icon: "💬" },
        twitter: { name: "Twitter / X", role: "X Broadcaster", x: 935, y: 140, color: "#0ea5e9", icon: "🐦" }
    };
    const cfg = configs[type];
    if (!cfg) return;

    engine.customStations[type] = cfg;
    if (type === 'imagen') {
        engine.customConduits.push({ from: 'pulse', to: 'imagen', color: '#f43f5e' });
    } else if (type === 'discord') {
        engine.customConduits.push({ from: 'boss', to: 'discord', color: '#6366f1' });
    } else if (type === 'twitter') {
        engine.customConduits.push({ from: 'boss', to: 'twitter', color: '#0ea5e9' });
    }
    sfx.playSuccessChime();
    showToast(`Stasiun baru dipasang: ${cfg.name}!`, "success");
    addLog("BUILDER", `Stasiun baru ditambahkan ke denah kantor: ${cfg.name}`, "success");
}

function resetPipelineTopology() {
    if (!window.officeEngine) return;
    const engine = window.officeEngine;
    engine.customStations = {};
    engine.customConduits = [
        { from: 'scout', to: 'pulse', color: '#3b82f6' },
        { from: 'pulse', to: 'boss', color: '#a855f7' },
        { from: 'boss', to: 'link', color: '#06b6d4' }
    ];
    sfx.playHandover();
    showToast("Topologi alur kerja di-reset ke standar 4-stasiun.", "info");
    addLog("BUILDER", "Topologi kabel di-reset ke default pipeline.", "info");
}

// --- 8. Event Listeners & Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    // Initialize 2D Canvas Engine
    window.officeEngine = new Office2DEngine("officeCanvas");

    // Live Clock Update
    setInterval(() => {
        const timeEl = document.getElementById("officeTime");
        if (timeEl) timeEl.textContent = new Date().toLocaleTimeString();
    }, 1000);

    // Initial Status Check
    checkOfficeStatus();

    // Hotspot Click Handlers
    document.querySelectorAll(".hotspot").forEach(el => {
        el.addEventListener("click", () => {
            const station = el.getAttribute("data-station");
            openStationModal(station);
        });
    });

    // Sidebar Agent Item Card Click Handlers (Selects Character)
    document.querySelectorAll(".agent-item-card").forEach(card => {
        card.addEventListener("click", (e) => {
            if (e.target.closest('.btn-inspect-icon') || e.target.closest('.btn-station-config')) return;
            const agentKey = card.getAttribute("data-agent");
            if (window.officeEngine) {
                window.officeEngine.selectAgent(agentKey);
                sfx.playSelect();
                showSpeechBubble(agentKey, `Karakter dipilih! Klik lantai untuk memindahkan. 🚶`, 2400);
            }
        });
    });

    // Terminal Log Category Tab Filter Handlers
    document.querySelectorAll(".log-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".log-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const category = tab.getAttribute("data-tab");
            filterConsoleLogs(category);
        });
    });

    // Terminal Collapse / Expand Toggle
    const btnToggleConsole = document.getElementById("btnToggleConsole");
    const officeConsole = document.getElementById("officeConsole");
    const consoleToggleIcon = document.getElementById("consoleToggleIcon");
    if (btnToggleConsole && officeConsole) {
        btnToggleConsole.addEventListener("click", () => {
            officeConsole.classList.toggle("collapsed");
            const isCollapsed = officeConsole.classList.contains("collapsed");
            if (consoleToggleIcon) {
                consoleToggleIcon.textContent = isCollapsed ? "▲" : "▼";
            }
        });
    }

    // Workspace Mode Switcher Buttons
    const btnModeBalanced = document.getElementById("btnModeBalanced");
    const btnModeSimulation = document.getElementById("btnModeSimulation");
    const btnModeDev = document.getElementById("btnModeDev");
    if (btnModeBalanced) btnModeBalanced.addEventListener("click", () => setWorkspaceMode('balanced'));
    if (btnModeSimulation) btnModeSimulation.addEventListener("click", () => setWorkspaceMode('simulation'));
    if (btnModeDev) btnModeDev.addEventListener("click", () => setWorkspaceMode('dev'));

    // Inspector Tabs
    document.querySelectorAll(".inspect-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".inspect-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const target = tab.getAttribute("data-inspect");
            updateJsonInspector(target);
        });
    });

    // Header Button Handlers
    document.getElementById("btnWorkflow").addEventListener("click", runFullPipeline);
    document.getElementById("btnRefreshNews").addEventListener("click", runFetchNews);

    document.getElementById("btnClearLog").addEventListener("click", () => {
        document.getElementById("consoleBody").innerHTML = "";
    });

    document.getElementById("btnSound").addEventListener("click", () => {
        sfx.enabled = !sfx.enabled;
        document.getElementById("btnSound").querySelector(".text").textContent = `Sound: ${sfx.enabled ? "ON" : "OFF"}`;
    });

    let autoPilotTimer = null;
    document.getElementById("btnAutoPilot").addEventListener("click", () => {
        const btn = document.getElementById("btnAutoPilot");
        if (autoPilotTimer) {
            clearInterval(autoPilotTimer);
            autoPilotTimer = null;
            btn.querySelector(".text").textContent = "Auto-Pilot: OFF";
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-secondary");
            addLog("SYSTEM", "Auto-Pilot routine deactivated.");
        } else {
            btn.querySelector(".text").textContent = "Auto-Pilot: ON (30m)";
            btn.classList.remove("btn-secondary");
            btn.classList.add("btn-primary");
            addLog("SYSTEM", "Auto-Pilot activated. Will run pipeline every 30 minutes.");
            runFullPipeline();
            autoPilotTimer = setInterval(runFullPipeline, 30 * 60 * 1000);
        }
    });

    // Textarea Auto Counter
    document.getElementById("draftTextarea").addEventListener("input", updateDraftPreview);

    // Time-Travel Replay & Camera Toolbar Handlers
    const btnReplayPlay = document.getElementById("btnReplayPlay");
    if (btnReplayPlay) btnReplayPlay.addEventListener("click", toggleReplayPlayback);

    const btnReplayLive = document.getElementById("btnReplayLive");
    if (btnReplayLive) btnReplayLive.addEventListener("click", setReplayLive);

    const replaySlider = document.getElementById("replayScrubberSlider");
    if (replaySlider) {
        replaySlider.addEventListener("input", (e) => setReplayScrubber(e.target.value));
    }

    const btnZoomIn = document.getElementById("btnZoomIn");
    if (btnZoomIn) btnZoomIn.addEventListener("click", () => zoomCanvas(0.15));

    const btnZoomOut = document.getElementById("btnZoomOut");
    if (btnZoomOut) btnZoomOut.addEventListener("click", () => zoomCanvas(-0.15));

    const btnZoomReset = document.getElementById("btnZoomReset");
    if (btnZoomReset) btnZoomReset.addEventListener("click", resetCanvasZoom);

    const btnToggleBuilder = document.getElementById("btnToggleBuilder");
    if (btnToggleBuilder) btnToggleBuilder.addEventListener("click", toggleBuilderMode);
});

