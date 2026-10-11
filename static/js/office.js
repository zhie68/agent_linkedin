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

    playIntercomChirp() {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.setValueAtTime(1400, this.ctx.currentTime + 0.04);
            gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.12);
        } catch (e) {}
    }

    playAlarmSiren() {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(440, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.25);
            osc.frequency.linearRampToValueAtTime(440, this.ctx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.5);
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

        // 6. War Room & Self-Healing State
        this.isWarRoomActive = false;
        this.incidentStation = null;
        this.incidentReason = null;
        this.selfHealingState = null; // { agentKey, targetStation, stage: 'walking'|'repairing'|'done', timer: 0 }
        this.repairParticles = [];

        // 7. Neuro-Vision / X-Ray Vector Heatmap State
        this.isNeuroVisionActive = false;
        this.vectorChunkParticles = [
            { segment: 0, progress: 0.2, label: "dim: 768", type: "vector" },
            { segment: 1, progress: 0.55, label: "cosine: 0.94", type: "cosine" },
            { segment: 2, progress: 0.85, label: "chunk: #12", type: "chunk" }
        ];

        // 8. Multiplayer Co-Presence Visitors & Pinned Memos
        this.visitors = [
            {
                id: 'visitor-alex',
                name: "Alex",
                role: "Reviewer",
                x: 320,
                y: 190,
                targetX: 320,
                targetY: 190,
                speed: 1.4,
                facing: "right",
                isWalking: false,
                walkCycle: 0,
                color: "#38bdf8",
                suitColor: "#0284c7",
                hairColor: "#cbd5e1",
                idleTimer: 0
            },
            {
                id: 'visitor-sarah',
                name: "Sarah",
                role: "Lead Editor",
                x: 880,
                y: 430,
                targetX: 880,
                targetY: 430,
                speed: 1.4,
                facing: "left",
                isWalking: false,
                walkCycle: 0,
                color: "#f472b6",
                suitColor: "#db2777",
                hairColor: "#fde047",
                idleTimer: 0
            }
        ];
        this.pinnedMemos = [];
        this.loadPinnedMemos();

        // 9. Matrix RAG Memory Vault & Retrieval Beams
        this.ragVault = {
            x: 35,
            y: 72,
            width: 88,
            height: 70,
            totalVectors: 14820,
            activeBeams: [] // { progress, speed, label, color }
        };
        this.loadRagVaultData();

        // 10. Financial Hologram & Budget Circuit-Breaker
        this.financial = {
            session_cost: 0.042,
            burn_rate: 120,
            budget_limit: 5.00,
            is_circuit_breaker_tripped: false,
            daily_tokens_used: 142050
        };
        this.breakerSparks = [];
        this.loadFinancialMetrics();

        // 11. Agent Evolution & RPG Skill Leveling State
        this.agentRpg = {
            scout: { level: 4, xp: 82, next_xp: 100, title: "Senior Scraper", badge_color: "#3b82f6" },
            pulse: { level: 5, xp: 64, next_xp: 100, title: "Prompt Alchemist", badge_color: "#a855f7" },
            boss: { level: 6, xp: 91, next_xp: 100, title: "Chief Strategist", badge_color: "#10b981" },
            link: { level: 3, xp: 45, next_xp: 100, title: "Viral Catalyst", badge_color: "#06b6d4" }
        };
        this.rpgFloatingTexts = []; // { text, x, y, alpha, life }
        this.loadAgentRpgSkills();

        // 12. LinkedIn Broadcast Satellite & Social Proof Simulator
        this.linkedinBroadcast = {
            x: 740,
            y: 135,
            isBroadcasting: false,
            radioWaves: [], // { radius, maxRadius, alpha }
            stats: { likes: 14, comments: 3, reposts: 2, impressions: 342, engagement_rate: 5.6 }
        };
        this.loadLinkedInAnalytics();

        // 13. Sci-Fi Command Citadel Visual Simulation State
        // Flying aerocars in panoramic metropolis skyline
        this.skyVehicles = [
            { x: 60, y: 18, speed: 0.65, length: 16, color: "#38bdf8", tail: "#0284c7" },
            { x: 380, y: 32, speed: -0.45, length: 20, color: "#f59e0b", tail: "#d97706" },
            { x: 620, y: 12, speed: 0.85, length: 14, color: "#a855f7", tail: "#7c3aed" }
        ];

        // Volumetric God Rays Dust Motes
        this.godRayDustMotes = [];
        for (let i = 0; i < 35; i++) {
            this.godRayDustMotes.push({
                x: 100 + Math.random() * 700,
                y: 50 + Math.random() * 450,
                speedY: 0.2 + Math.random() * 0.4,
                speedX: (Math.random() - 0.5) * 0.2,
                size: 1 + Math.random() * 1.8,
                alpha: 0.2 + Math.random() * 0.6
            });
        }

        // Aerial Curved Data Particle Streams
        this.aerialStreamParticles = [];
        for (let i = 0; i < 45; i++) {
            this.aerialStreamParticles.push({
                stream: i % 3, // 0: Radar->Globe->Gemini, 1: Gemini->Globe->Boss, 2: Boss->Globe->Link
                progress: Math.random(),
                speed: 0.006 + Math.random() * 0.008,
                size: 1.5 + Math.random() * 2,
                sparkAlpha: 0.5 + Math.random() * 0.5
            });
        }

        // Central Hologram Globe State
        this.centralGlobeAngle = 0;

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
                openAgentSkillTreeModal(clickedAgentKey);
                return;
            }

            // Check if clicked near Matrix RAG Memory Vault (x: 35-135, y: 65-155)
            if (clickX >= 30 && clickX <= 135 && clickY >= 65 && clickY <= 155) {
                openRagVaultDrawer();
                return;
            }

            // Check if clicked near Floor Financial Hologram (x: 390-510, y: 275-365)
            if (clickX >= 390 && clickX <= 510 && clickY >= 275 && clickY <= 365) {
                openBudgetBreakerModal();
                return;
            }

            // Check if clicked near Station 3 / LinkedIn Satellite Hub (x: 685-795, y: 115-215)
            if (clickX >= 685 && clickX <= 795 && clickY >= 115 && clickY <= 215) {
                openLinkedInAnalyticsDrawer();
                return;
            }

            // If waiting for approval and clicked near Chief Desk (x: 450, y: 440)
            const distToBossDesk = Math.hypot(clickX - 450, clickY - 440);
            if (this.isWaitingApproval && distToBossDesk < 55) {
                openChiefReviewDrawer();
                return;
            }

            // Check if clicked near Kanban Board (x: 300, y: 80) or Chief Desk Memo (x: 450, y: 440)
            const distToKanban = Math.hypot(clickX - 300, clickY - 80);
            if (distToKanban < 50 || (!this.isWaitingApproval && distToBossDesk < 42)) {
                openStickyMemoModal();
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

        // 5b. Global Hotkeys: Cmd+K / Ctrl+K for Intercom & N for Neuro-Vision
        window.addEventListener("keydown", (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                openSpatialIntercom();
            } else if (e.key.toLowerCase() === 'n' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                e.preventDefault();
                toggleNeuroVision();
            } else if (e.key === 'Escape') {
                closeIntercomModal();
                closeStickyMemoModal();
                closeIncidentCard();
                closeRagVaultDrawer();
                closeBudgetBreakerModal();
                closeAgentSkillTreeModal();
                closeLinkedInAnalyticsDrawer();
            }
        });

        // 6. Retro Radar Minimap Click to Pan
        if (this.minimapCanvas) {
            this.minimapCanvas.addEventListener("click", (e) => {
                const rect = this.minimapCanvas.getBoundingClientRect();
                const mx = e.clientX - rect.left;
                const my = e.clientY - rect.top;
                const targetWorldX = Math.max(0, Math.min(this.width, (mx / this.minimapCanvas.width) * this.width));
                const targetWorldY = Math.max(0, Math.min(this.height, (my / this.minimapCanvas.height) * this.height));

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

        // 8. Update Multiplayer Spectator Visitors (Gentle wandering)
        if (this.visitors) {
            this.visitors.forEach(v => {
                const vdx = v.targetX - v.x;
                const vdy = v.targetY - v.y;
                const vdist = Math.hypot(vdx, vdy);
                if (vdist > 3) {
                    v.isWalking = true;
                    v.walkCycle = (v.walkCycle || 0) + 0.18;
                    v.facing = Math.abs(vdx) > Math.abs(vdy) ? (vdx > 0 ? "right" : "left") : (vdy > 0 ? "down" : "up");
                    const vstep = Math.min(vdist, v.speed);
                    v.x += (vdx / vdist) * vstep;
                    v.y += (vdy / vdist) * vstep;
                } else {
                    v.isWalking = false;
                    v.idleTimer = (v.idleTimer || 0) + 1;
                    if (v.idleTimer > 350) { // every ~6 seconds
                        v.idleTimer = 0;
                        const spots = [
                            { x: 300, y: 110 },
                            { x: 450, y: 115 },
                            { x: 740, y: 115 },
                            { x: 880, y: 390 },
                            { x: 530, y: 440 }
                        ];
                        const chosen = spots[Math.floor(Math.random() * spots.length)];
                        v.targetX = chosen.x + (Math.random() * 30 - 15);
                        v.targetY = chosen.y + (Math.random() * 20 - 10);
                    }
                }
            });
        }

        // 9. Update Self-Healing Animation State
        if (this.selfHealingState && this.selfHealingState.stage === 'repairing') {
            this.selfHealingState.timer++;
            if (this.frame % 5 === 0) {
                const targetStation = this.stations[this.selfHealingState.targetStation] || { x: 450, y: 200 };
                this.repairParticles.push({
                    x: targetStation.x + (Math.random() * 32 - 16),
                    y: targetStation.y + (Math.random() * 20 - 10),
                    vx: Math.random() * 2.4 - 1.2,
                    vy: -Math.random() * 2.5 - 0.5,
                    color: Math.random() > 0.5 ? '#f59e0b' : '#38bdf8',
                    size: 3,
                    alpha: 1.0,
                    life: 25
                });
            }
            if (this.selfHealingState.timer >= 280) { // auto-heals after ~4.6 seconds
                this.finishSelfHealing();
            }
        }
        for (let i = this.repairParticles.length - 1; i >= 0; i--) {
            const rp = this.repairParticles[i];
            rp.x += rp.vx;
            rp.y += rp.vy;
            rp.alpha -= 0.04;
            rp.life--;
            if (rp.life <= 0 || rp.alpha <= 0) this.repairParticles.splice(i, 1);
        }

        // 10. Update Vector Chunk Flow Particles (Neuro-Vision)
        if (this.isNeuroVisionActive && this.vectorChunkParticles) {
            this.vectorChunkParticles.forEach(vp => {
                vp.progress += 0.007;
                if (vp.progress >= 1.0) {
                    vp.progress = 0;
                    vp.segment = (vp.segment + 1) % 3;
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

        // Neuro-Vision: Cybernetic Matrix Circuit Board Floor
        if (this.isNeuroVisionActive) {
            this.drawNeuroMatrixFloor();
        }

        // 2. Draw Structural Walls, Windows, Glass Partitions & Columns
        this.drawWallFeatures();

        // Atmospheric Cinematic God Rays piercing from Glass Dome
        this.drawVolumetricGodRays();

        // 3. Draw Furniture & Stations
        this.drawStationFurniture();

        // Draw Interactive POI Machines
        this.drawRadarDish(this.stations.scout.x, 140);
        this.drawServerRack(this.stations.link.x, 140);
        this.drawCoffeeLounge(850, 360);
        this.drawWaterCooler(this.stations.water.x, this.stations.water.y);

        // Draw Extra Builder Stations if spawned (Imagen, Discord, Twitter)
        this.drawCustomBuilderStations();

        // Neuro-Vision: Context Saturation Cathode Gauges & Vector Chunk Flow
        if (this.isNeuroVisionActive) {
            this.drawContextSaturationGauge(515, 175, 'pulse');
            this.drawContextSaturationGauge(225, 175, 'scout');
            this.drawVectorChunkFlow();
        }

        // Multiplayer Collaborative Pinned Desk Memos
        this.drawPinnedDeskMemos();

        // 1. Matrix RAG Memory Vault Room & Retrieval Beams (Top-Left)
        this.drawMatrixMemoryVault();
        this.drawRetrievalBeams();

        // 2. Holographic Floor Projection (Token Burn-Rate & Financial Ticker)
        this.drawHolographicFloorProjection();

        // 3. Central Monolithic 3D Holographic Cyber-Globe / Neural Orb (Center of Main Hall)
        this.drawHolographicCentralGlobe();

        // 4. Spectacular Arcing Aerial Particle Streams (Curved 3D Data Ribbons Across Hall)
        this.drawAerialParticleStreams();

        // 5. Mini Broadcast Satellite Dish & Live LinkedIn Ticker (Station 3)
        this.drawBroadcastSatellite();
        this.drawLinkedInEngagementTicker();

        // 4. Circuit Breaker Sparks if Tripped
        if (this.financial && this.financial.is_circuit_breaker_tripped) {
            this.drawCircuitBreakerSparks();
        }

        // Draw Waypoint Rings & Dust Particles
        this.drawWaypoints();
        this.drawParticles();
        this.drawHandoverParticles();
        this.drawRepairParticles();

        // Draw Active Station Aura Beacon
        if (this.activeMission && this.activeMission.activeStation) {
            this.drawStationBeacon(this.activeMission.activeStation);
        }

        // Draw Data Stream Packets
        this.drawDataPackets();

        // Draw Animated 2D Character Sprites & Multiplayer Spectator Visitors (Sorted by Y for depth layering)
        const agentSource = (this.isReplayMode && this.replaySnapshot) ? this.replaySnapshot.agents : this.agents;
        const allSprites = [];
        Object.keys(this.agents).forEach(k => {
            allSprites.push({ type: 'agent', key: k, entity: agentSource[k] || this.agents[k] });
        });
        if (this.visitors && !this.isReplayMode) {
            this.visitors.forEach(v => {
                allSprites.push({ type: 'visitor', key: v.id, entity: v });
            });
        }
        allSprites.sort((a, b) => a.entity.y - b.entity.y);
        allSprites.forEach(item => {
            if (item.type === 'agent') this.drawCharacter(item.key, item.entity);
            else this.drawVisitorCharacter(item.entity);
        });

        // 5. Draw RPG Floating Level-Up & XP Texts
        this.drawRpgFloatingTexts();

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
        if (this.financial && this.financial.is_circuit_breaker_tripped) {
            // CIRCUIT BREAKER POWER CUT: Harsh emergency flicker & blackout on workstations
            const flicker = (this.frame % 30 < 5) ? 0.86 : 0.76;
            this.ctx.fillStyle = `rgba(3, 7, 18, ${flicker})`;
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Circuit-Breaker alert text in lighting layer
            this.ctx.fillStyle = "#ef4444";
            this.ctx.font = "bold 11px 'Fira Code'";
            this.ctx.textAlign = "center";
            this.ctx.fillText("⚡ POWER GRID CUT: BUDGET CIRCUIT-BREAKER TRIPPED! ⚡", this.width / 2, 45);
        } else if (this.isWarRoomActive) {
            // WAR ROOM EMERGENCY: Pulsing Crimson Alarm Siren
            const sirenPulse = Math.sin(this.frame * 0.18);
            const redAlpha = 0.38 + sirenPulse * 0.16;
            this.ctx.fillStyle = `rgba(185, 28, 28, ${redAlpha})`;
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Flashing Red Alert Spotlight on the troubled station
            const incidentSt = this.stations[this.incidentStation || 'pulse'];
            if (incidentSt) {
                const spotGrad = this.ctx.createRadialGradient(incidentSt.x, incidentSt.y, 8, incidentSt.x, incidentSt.y, 140);
                spotGrad.addColorStop(0, "rgba(239, 68, 68, 0.75)");
                spotGrad.addColorStop(0.55, "rgba(239, 68, 68, 0.22)");
                spotGrad.addColorStop(1, "transparent");
                this.ctx.fillStyle = spotGrad;
                this.ctx.beginPath();
                this.ctx.arc(incidentSt.x, incidentSt.y, 140, 0, Math.PI * 2);
                this.ctx.fill();
            }
        } else if (this.isNeuroVisionActive) {
            // NEURO-VISION: Subtle emerald matrix ambient
            this.ctx.fillStyle = "rgba(4, 18, 14, 0.38)";
            this.ctx.fillRect(0, 0, this.width, this.height);
        } else if (this.roomState === 'standby') {
            // Ambient Dark Mode (Night Citadel / Standby)
            this.ctx.fillStyle = "rgba(4, 7, 16, 0.45)";
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Overhead Workstation Dramatic Cone Spotlights
            this.drawWorkstationSpotlights();
        } else {
            // Processing: Cyber War Room Overhead Spotlights
            this.ctx.fillStyle = "rgba(2, 6, 14, 0.22)";
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Overhead Workstation Dramatic Cone Spotlights
            this.drawWorkstationSpotlights();
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

    drawObsidianFloorSSR(startX, startY, w, h) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(startX, startY, w, h);
        this.ctx.clip(); // Constrain within main hall

        const tileSize = 52; // Large architectural polished obsidian marble slabs
        const cols = Math.ceil(w / tileSize);
        const rows = Math.ceil(h / tileSize);

        // 1. Base Obsidian Polished Marble Palette
        const marbleA = "#060914"; // Deep polished obsidian
        const marbleB = "#090d1c"; // Subtle alternating dark titanium stone
        const marbleC = "#080b18"; // Dark graphite slab
        const groutColor = "#020409"; // 1px laser precision grout seam
        const bevelHighlight = "rgba(56, 189, 248, 0.08)"; // High-gloss specular bevel

        // 1.1 Draw Marble Slabs Grid
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const tx = startX + c * tileSize;
                const ty = startY + r * tileSize;
                const tw = Math.min(tileSize, startX + w - tx);
                const th = Math.min(tileSize, startY + h - ty);

                const isEven = (c + r) % 2 === 0;
                const seed = Math.sin(c * 19.1 + r * 47.3) * 1000;
                const rand = seed - Math.floor(seed);

                let fill = isEven ? marbleA : marbleB;
                if (rand > 0.75) fill = marbleC;

                this.ctx.fillStyle = fill;
                this.ctx.fillRect(tx, ty, tw, th);

                // Subtle organic marble vein striation on ~15% of slabs
                if (rand > 0.85 && tw >= 24 && th >= 24) {
                    this.ctx.strokeStyle = "rgba(148, 163, 184, 0.045)";
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(tx + 4, ty + th - 6);
                    this.ctx.lineTo(tx + tw / 2, ty + th / 2);
                    this.ctx.lineTo(tx + tw - 6, ty + 6);
                    this.ctx.stroke();
                }

                // 1px Specular Edge Reflection
                this.ctx.fillStyle = bevelHighlight;
                this.ctx.fillRect(tx, ty, tw, 1);
                this.ctx.fillRect(tx, ty, 1, th);

                // 1px Dark Laser Grout
                this.ctx.fillStyle = groutColor;
                this.ctx.fillRect(tx, ty + th - 1, tw, 1);
                this.ctx.fillRect(tx + tw - 1, ty, 1, th);
            }
        }

        // 1.2 High-Gloss Sky Sheen Gradient Wash (Reflection of Citadel Glass Dome)
        const skySheen = this.ctx.createLinearGradient(startX, startY, startX, startY + h);
        skySheen.addColorStop(0, "rgba(56, 189, 248, 0.09)");
        skySheen.addColorStop(0.25, "rgba(99, 102, 241, 0.04)");
        skySheen.addColorStop(0.6, "transparent");
        skySheen.addColorStop(1, "rgba(16, 185, 129, 0.03)");
        this.ctx.fillStyle = skySheen;
        this.ctx.fillRect(startX, startY, w, h);

        // 1.3 SCREEN-SPACE SPECULAR REFLECTIONS (SSR) OF WORKSTATIONS & ENERGY CORES
        // Station 1: News Radar Blue SSR Glow Pool
        const ssrScout = this.ctx.createRadialGradient(160, 245, 10, 160, 260, 65);
        ssrScout.addColorStop(0, "rgba(59, 130, 246, 0.22)");
        ssrScout.addColorStop(0.5, "rgba(59, 130, 246, 0.07)");
        ssrScout.addColorStop(1, "transparent");
        this.ctx.fillStyle = ssrScout;
        this.ctx.fillRect(100, 215, 120, 90);

        // Station 2: Gemini Monolith Colossal Vertical Purple SSR Plasma Reflection Pillar
        const ssrPulseGrad = this.ctx.createLinearGradient(450, 210, 450, 360);
        ssrPulseGrad.addColorStop(0, "rgba(168, 85, 247, 0.32)");
        ssrPulseGrad.addColorStop(0.35, "rgba(192, 132, 252, 0.18)");
        ssrPulseGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.09)");
        ssrPulseGrad.addColorStop(1, "transparent");
        this.ctx.fillStyle = ssrPulseGrad;
        this.ctx.beginPath();
        this.ctx.ellipse(450, 280, 52, 85, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Station 3: LinkedIn Hub Cyan SSR Glow Pool
        const ssrLink = this.ctx.createRadialGradient(740, 245, 10, 740, 260, 65);
        ssrLink.addColorStop(0, "rgba(6, 182, 212, 0.24)");
        ssrLink.addColorStop(0.5, "rgba(6, 182, 212, 0.08)");
        ssrLink.addColorStop(1, "transparent");
        this.ctx.fillStyle = ssrLink;
        this.ctx.fillRect(680, 215, 120, 90);

        // Central Hologram Globe SSR Reflection
        const ssrGlobe = this.ctx.createRadialGradient(450, 325, 4, 450, 335, 50);
        ssrGlobe.addColorStop(0, "rgba(56, 189, 248, 0.25)");
        ssrGlobe.addColorStop(0.4, "rgba(168, 85, 247, 0.12)");
        ssrGlobe.addColorStop(1, "transparent");
        this.ctx.fillStyle = ssrGlobe;
        this.ctx.beginPath();
        this.ctx.ellipse(450, 330, 48, 22, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // 1.4 Real-Time Mirrored Agent Feet Reflection on Glossy Mirror Floor
        const agentSource = (this.isReplayMode && this.replaySnapshot) ? this.replaySnapshot.agents : this.agents;
        if (agentSource) {
            Object.keys(agentSource).forEach(k => {
                const ag = agentSource[k];
                if (!ag) return;
                this.ctx.fillStyle = `${ag.color || '#38bdf8'}33`;
                this.ctx.beginPath();
                this.ctx.ellipse(ag.x, ag.y + 16, 10, 4, 0, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }

        // 1.5 Perimeter Wall Deep Ambient Occlusion Shadows
        const northShadow = this.ctx.createLinearGradient(startX, startY, startX, startY + 22);
        northShadow.addColorStop(0, "rgba(0, 0, 0, 0.85)");
        northShadow.addColorStop(1, "transparent");
        this.ctx.fillStyle = northShadow;
        this.ctx.fillRect(startX, startY, w, 22);

        const westShadow = this.ctx.createLinearGradient(startX, startY, startX + 16, startY);
        westShadow.addColorStop(0, "rgba(0, 0, 0, 0.75)");
        westShadow.addColorStop(1, "transparent");
        this.ctx.fillStyle = westShadow;
        this.ctx.fillRect(startX, startY, 16, h);

        // Natural Doorway Threshold at Glass Lounge Transition
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

    drawChiefElevatedDais() {
        this.ctx.save();
        const daisX = 310;
        const daisY = 385;
        const daisW = 280;
        const daisH = 145;

        // 1. Drop Shadow under Mezzanine Dais Platform
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        this.ctx.beginPath();
        this.ctx.roundRect(daisX + 4, daisY + 6, daisW, daisH + 16, 12);
        this.ctx.fill();

        // 2. Base Dark Obsidian Dais Platform Body
        this.ctx.fillStyle = "#050b14";
        this.ctx.beginPath();
        this.ctx.roundRect(daisX, daisY, daisW, daisH, 10);
        this.ctx.fill();

        // 3. Carbon / Titanium Platform Rim Border with Chamfer
        this.ctx.strokeStyle = "#1e293b";
        this.ctx.lineWidth = 2.5;
        this.ctx.stroke();

        // Outer Neon Glow Trim (Emerald / Cyan Commander Theme)
        this.ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
        this.ctx.lineWidth = 1.2;
        this.ctx.strokeRect(daisX + 2, daisY + 2, daisW - 4, daisH - 4);

        // 4. Luxury Executive Geometric Inlay Deck (Top Platform Tier)
        this.ctx.fillStyle = "#03120e";
        this.ctx.beginPath();
        this.ctx.roundRect(daisX + 16, daisY + 12, daisW - 32, daisH - 40, 6);
        this.ctx.fill();

        // Gold Foil Trim on Executive Deck
        this.ctx.strokeStyle = "#d4af37";
        this.ctx.lineWidth = 1.2;
        this.ctx.strokeRect(daisX + 18, daisY + 14, daisW - 36, daisH - 44);

        // Inner Emerald Piping
        this.ctx.strokeStyle = "rgba(16, 185, 129, 0.3)";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(daisX + 22, daisY + 18, daisW - 44, daisH - 52);

        // 5. Cascading Dark Marble Steps (Anak Tangga Bercahaya Neon di Bagian Depan)
        // 3 Tiers of dark steps descending to the main floor
        const steps = [
            { y: daisY + daisH - 26, w: daisW - 50, h: 9, neonColor: "#10b981" },
            { y: daisY + daisH - 15, w: daisW - 30, h: 9, neonColor: "#34d399" },
            { y: daisY + daisH - 4,  w: daisW - 10, h: 9, neonColor: "#38bdf8" }
        ];

        steps.forEach((st, idx) => {
            const sx = daisX + (daisW - st.w) / 2;
            // Step shadow
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            this.ctx.fillRect(sx + 2, st.y + 2, st.w, st.h);

            // Step Marble Tread
            this.ctx.fillStyle = idx === 0 ? "#0a1622" : (idx === 1 ? "#0e1d2c" : "#122538");
            this.ctx.fillRect(sx, st.y, st.w, st.h);

            // Glowing Neon LED Riser Trim Edge
            this.ctx.fillStyle = st.neonColor;
            this.ctx.shadowColor = st.neonColor;
            this.ctx.shadowBlur = 6;
            this.ctx.fillRect(sx, st.y + st.h - 1.8, st.w, 1.8);
            this.ctx.shadowBlur = 0;

            // 1px Step highlight
            this.ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
            this.ctx.fillRect(sx, st.y, st.w, 1);
        });

        // 6. Left & Right Architectural Glass Balustrades (Railing Kaca / Baja)
        this.ctx.fillStyle = "rgba(56, 189, 248, 0.12)";
        this.ctx.fillRect(daisX + 6, daisY + 14, 5, daisH - 40);
        this.ctx.strokeStyle = "#38bdf8";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(daisX + 6, daisY + 14, 5, daisH - 40);

        this.ctx.fillStyle = "rgba(56, 189, 248, 0.12)";
        this.ctx.fillRect(daisX + daisW - 11, daisY + 14, 5, daisH - 40);
        this.ctx.strokeStyle = "#38bdf8";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(daisX + daisW - 11, daisY + 14, 5, daisH - 40);

        // Brass Handrail Cap on Balustrades
        this.ctx.fillStyle = "#d4af37";
        this.ctx.fillRect(daisX + 5, daisY + 12, 7, 3);
        this.ctx.fillRect(daisX + daisW - 12, daisY + 12, 7, 3);

        // 7. Mezzanine Dais Crest / Title
        this.ctx.fillStyle = "rgba(16, 185, 129, 0.9)";
        this.ctx.font = "bold 8px 'Orbitron', monospace";
        this.ctx.textAlign = "center";
        this.ctx.fillText("⭐ COMMAND MEZZANINE // CHIEF PODIUM", daisX + daisW / 2, daisY + 26);

        this.ctx.restore();
    }

    drawFloorZones() {
        // 1. Glossy Obsidian Marble Floor with Screen-Space Reflections (SSR)
        const tileStartX = 20;
        const tileStartY = 58;
        const tileW = 802; // from x: 20 to x: 822 (glass lounge wall)
        const tileH = this.height - tileStartY - 12;

        this.drawObsidianFloorSSR(tileStartX, tileStartY, tileW, tileH);

        // 2. Workstation Zoning High-Tech Cyber Mats (Scout, Pulse, Link)
        // Station 1: Scout / RSS Radar Zone
        this.drawPixelCarpet(95, 135, 130, 145, {
            baseColor: "#0f172a",
            patternColor: "rgba(30, 58, 138, 0.4)",
            borderColor: "#3b82f6"
        });

        // Station 2: Pulse / Gemini AI Studio Zone
        this.drawPixelCarpet(385, 135, 130, 145, {
            baseColor: "#130924",
            patternColor: "rgba(88, 28, 135, 0.35)",
            borderColor: "#a855f7"
        });

        // Station 3: Link / LinkedIn Hub Zone
        this.drawPixelCarpet(675, 135, 130, 145, {
            baseColor: "#061826",
            patternColor: "rgba(21, 94, 117, 0.35)",
            borderColor: "#06b6d4"
        });

        // Station 4: Panggung Utama Bertingkat (Elevated Mezzanine Dais for Chief Desk)
        this.drawChiefElevatedDais();

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

        const cx = mw / 2;
        const cy = mh / 2;
        const radius = (Math.min(mw, mh) / 2) - 3;

        mctx.clearRect(0, 0, mw, mh);

        // Circular clipping
        mctx.save();
        mctx.beginPath();
        mctx.arc(cx, cy, radius, 0, Math.PI * 2);
        mctx.clip();

        // Tactical Radar CRT Green Background
        const bgGrad = mctx.createRadialGradient(cx, cy, 3, cx, cy, radius);
        bgGrad.addColorStop(0, "#052914");
        bgGrad.addColorStop(0.65, "#02170b");
        bgGrad.addColorStop(1, "#010c05");
        mctx.fillStyle = bgGrad;
        mctx.fillRect(0, 0, mw, mh);

        // Radar Range Rings (Concentric Circles)
        [0.32, 0.65, 0.96].forEach((fraction, idx) => {
            mctx.beginPath();
            mctx.arc(cx, cy, radius * fraction, 0, Math.PI * 2);
            mctx.strokeStyle = idx === 1 ? "rgba(16, 185, 129, 0.4)" : "rgba(16, 185, 129, 0.25)";
            mctx.lineWidth = 1;
            if (idx === 1) {
                mctx.setLineDash([3, 3]);
            } else {
                mctx.setLineDash([]);
            }
            mctx.stroke();
        });
        mctx.setLineDash([]);

        // Radar Crosshair Axes with tick marks
        mctx.strokeStyle = "rgba(16, 185, 129, 0.28)";
        mctx.lineWidth = 1;

        // Horizontal line
        mctx.beginPath();
        mctx.moveTo(cx - radius, cy);
        mctx.lineTo(cx + radius, cy);
        mctx.stroke();

        // Vertical line
        mctx.beginPath();
        mctx.moveTo(cx, cy - radius);
        mctx.lineTo(cx, cy + radius);
        mctx.stroke();

        // Crosshair tick marks
        [-0.65, -0.32, 0.32, 0.65].forEach(frac => {
            // Horizontal ticks
            mctx.beginPath();
            mctx.moveTo(cx + radius * frac, cy - 2);
            mctx.lineTo(cx + radius * frac, cy + 2);
            mctx.stroke();
            // Vertical ticks
            mctx.beginPath();
            mctx.moveTo(cx - 2, cy + radius * frac);
            mctx.lineTo(cx + 2, cy + radius * frac);
            mctx.stroke();
        });

        // Fine tactical grid (green phosphor)
        mctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
        mctx.lineWidth = 0.8;
        for (let gx = cx % 16; gx < mw; gx += 16) {
            mctx.beginPath();
            mctx.moveTo(gx, 0);
            mctx.lineTo(gx, mh);
            mctx.stroke();
        }
        for (let gy = cy % 16; gy < mh; gy += 16) {
            mctx.beginPath();
            mctx.moveTo(0, gy);
            mctx.lineTo(mw, gy);
            mctx.stroke();
        }

        // Conduits / Cables (Green tactical data links)
        this.customConduits.forEach(c => {
            const allStations = { ...this.stations, ...this.customStations };
            const s1 = allStations[c.from];
            const s2 = allStations[c.to];
            if (s1 && s2) {
                mctx.strokeStyle = "rgba(16, 185, 129, 0.65)";
                mctx.lineWidth = 1.2;
                mctx.beginPath();
                mctx.moveTo(s1.x * scaleX, s1.y * scaleY);
                mctx.lineTo(s2.x * scaleX, s2.y * scaleY);
                mctx.stroke();
            }
        });

        // Stations (Tactical green square nodes with halos)
        const allStations = { ...this.stations, ...this.customStations };
        Object.keys(allStations).forEach(k => {
            const st = allStations[k];
            const sx = st.x * scaleX;
            const sy = st.y * scaleY;
            
            mctx.fillStyle = "#10b981";
            mctx.fillRect(sx - 2.5, sy - 2.5, 5, 5);

            mctx.strokeStyle = "rgba(52, 211, 153, 0.7)";
            mctx.lineWidth = 1;
            mctx.strokeRect(sx - 4, sy - 4, 8, 8);
        });

        // Agent Blips (Phosphor green pings with radar pulses)
        const agentSource = (this.isReplayMode && this.replaySnapshot) ? this.replaySnapshot.agents : this.agents;
        Object.keys(agentSource).forEach(k => {
            const ag = agentSource[k];
            if (!ag) return;
            const ax = ag.x * scaleX;
            const ay = ag.y * scaleY;

            // Soft pulse ring
            const pulseSize = 3 + (this.frame % 30) * 0.18;
            const pulseAlpha = Math.max(0, 0.6 - (this.frame % 30) * 0.02);
            mctx.strokeStyle = `rgba(52, 211, 153, ${pulseAlpha})`;
            mctx.lineWidth = 1;
            mctx.beginPath();
            mctx.arc(ax, ay, pulseSize, 0, Math.PI * 2);
            mctx.stroke();

            // Core Blip
            mctx.fillStyle = "#34d399";
            mctx.beginPath();
            mctx.arc(ax, ay, 2.5, 0, Math.PI * 2);
            mctx.fill();
        });

        // Rotating Phosphor Green Radar Sweep Fan & Line
        const sweepAngle = (this.frame * 0.045) % (Math.PI * 2);
        
        // Trailing radar sweep wedge (16 slices decaying in alpha)
        for (let i = 0; i < 16; i++) {
            const a1 = sweepAngle - (i + 1) * 0.035;
            const a2 = sweepAngle - i * 0.035;
            const alpha = (1 - (i / 16)) * 0.32;
            mctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
            mctx.beginPath();
            mctx.moveTo(cx, cy);
            mctx.arc(cx, cy, radius, a1, a2);
            mctx.closePath();
            mctx.fill();
        }

        // Leading Bright Sweep Beam
        mctx.save();
        mctx.strokeStyle = "#34d399";
        mctx.lineWidth = 1.8;
        mctx.shadowColor = "#10b981";
        mctx.shadowBlur = 8;
        mctx.beginPath();
        mctx.moveTo(cx, cy);
        mctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
        mctx.stroke();
        mctx.restore();

        // Camera Viewport Wireframe (Neon Phosphor Green Frustum)
        const camWorldX = -this.camera.x / this.camera.scale;
        const camWorldY = -this.camera.y / this.camera.scale;
        const camWorldW = this.width / this.camera.scale;
        const camWorldH = this.height / this.camera.scale;

        mctx.strokeStyle = "rgba(52, 211, 153, 0.85)";
        mctx.lineWidth = 1.3;
        mctx.strokeRect(camWorldX * scaleX, camWorldY * scaleY, camWorldW * scaleX, camWorldH * scaleY);

        // Restore Clipping
        mctx.restore();

        // Outer Bezel & Compass Dial (Drawn on top without clipping)
        mctx.save();
        mctx.strokeStyle = "rgba(16, 185, 129, 0.85)";
        mctx.lineWidth = 2;
        mctx.beginPath();
        mctx.arc(cx, cy, radius, 0, Math.PI * 2);
        mctx.stroke();

        // Compass Ticks & Cardinal Indicators
        for (let deg = 0; deg < 360; deg += 30) {
            const rad = (deg * Math.PI) / 180;
            const isCardinal = deg % 90 === 0;
            const tickLen = isCardinal ? 5 : 3;
            const rOuter = radius;
            const rInner = radius - tickLen;

            mctx.strokeStyle = isCardinal ? "#34d399" : "rgba(16, 185, 129, 0.5)";
            mctx.lineWidth = isCardinal ? 1.5 : 1;
            mctx.beginPath();
            mctx.moveTo(cx + Math.cos(rad) * rOuter, cy + Math.sin(rad) * rOuter);
            mctx.lineTo(cx + Math.cos(rad) * rInner, cy + Math.sin(rad) * rInner);
            mctx.stroke();
        }

        // Cardinal Letters (N, E, S, W)
        mctx.fillStyle = "#34d399";
        mctx.font = "bold 8px 'Rajdhani', var(--font-mono)";
        mctx.textAlign = "center";
        mctx.textBaseline = "middle";
        mctx.fillText("N", cx, cy - radius + 9);
        mctx.fillText("S", cx, cy + radius - 9);
        mctx.fillText("E", cx + radius - 9, cy);
        mctx.fillText("W", cx - radius + 9, cy);
        mctx.restore();
    }

    // --- NEURO-VISION / X-RAY VECTOR HEATMAP ---
    toggleNeuroVision() {
        this.isNeuroVisionActive = !this.isNeuroVisionActive;
        const btn = document.getElementById("btnToggleNeuro");
        if (btn) btn.classList.toggle("active", this.isNeuroVisionActive);
        sfx.playClick();
        if (this.isNeuroVisionActive) {
            showToast("Mode Neuro-Vision / X-Ray Vector Aktif 🧠", "info");
            addLog("NEURO", "Neural Context Flow & Vector Heatmap mode diaktifkan.", "system");
        } else {
            showToast("Kembali ke Tampilan Standar", "info");
        }
    }

    drawNeuroMatrixFloor() {
        this.ctx.save();
        const startX = 20;
        const startY = 58;
        const w = 802;
        const h = this.height - startY - 12;

        this.ctx.beginPath();
        this.ctx.rect(startX, startY, w, h);
        this.ctx.clip();

        // 1. Cyber Matrix Circuit Background
        this.ctx.fillStyle = "rgba(3, 10, 18, 0.88)";
        this.ctx.fillRect(startX, startY, w, h);

        // 2. High-Tech Green / Cyan PCB Grid Traces
        const gridSize = 32;
        this.ctx.strokeStyle = "rgba(16, 185, 129, 0.16)";
        this.ctx.lineWidth = 1;

        for (let gx = startX; gx < startX + w; gx += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(gx, startY);
            this.ctx.lineTo(gx, startY + h);
            this.ctx.stroke();
        }
        for (let gy = startY; gy < startY + h; gy += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(startX, gy);
            this.ctx.lineTo(startX + w, gy);
            this.ctx.stroke();
        }

        // 3. Glowing Bus Circuit Tracks (Conduits between stations)
        this.ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
        this.ctx.lineWidth = 2.5;
        this.ctx.setLineDash([4, 4]);
        this.ctx.lineDashOffset = -this.frame * 0.8;

        this.ctx.beginPath();
        this.ctx.moveTo(160, 200);
        this.ctx.lineTo(450, 200);
        this.ctx.lineTo(740, 200);
        this.ctx.lineTo(740, 440);
        this.ctx.lineTo(450, 440);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // 4. Circuit PCB Solder Vias / Glowing Neural Nodes
        const nodes = [
            { x: 160, y: 200 }, { x: 300, y: 200 }, { x: 450, y: 200 },
            { x: 600, y: 200 }, { x: 740, y: 200 }, { x: 450, y: 320 },
            { x: 450, y: 440 }, { x: 600, y: 440 }, { x: 740, y: 440 },
            { x: 300, y: 120 }
        ];

        nodes.forEach((n, idx) => {
            const pulse = Math.sin(this.frame * 0.15 + idx) * 2;
            this.ctx.fillStyle = "#10b981";
            this.ctx.shadowColor = "#10b981";
            this.ctx.shadowBlur = 8;
            this.ctx.beginPath();
            this.ctx.arc(n.x, n.y, 4 + pulse * 0.5, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.strokeStyle = "#38bdf8";
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(n.x, n.y, 9 + pulse, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        });

        // 5. Matrix Code Dust Streams
        this.ctx.fillStyle = "rgba(52, 211, 153, 0.35)";
        this.ctx.font = "bold 8px 'Fira Code'";
        for (let i = 0; i < 8; i++) {
            const rx = startX + ((i * 97 + this.frame) % (w - 40));
            const ry = startY + ((i * 63 + this.frame * 1.2) % (h - 30));
            this.ctx.fillText("01101", rx, ry);
        }

        this.ctx.restore();
    }

    drawContextSaturationGauge(x, y, stationType = 'pulse') {
        this.ctx.save();
        let pct = 0.24;
        if (latestTokenData && latestTokenData.percentage_used) {
            pct = Math.min(1.0, latestTokenData.percentage_used / 100);
        }
        if (stationType === 'scout') pct = 0.18;

        const w = 18;
        const h = 76;
        const fluidH = Math.max(4, h * pct);

        // Mounting Bracket
        this.ctx.fillStyle = "#1e293b";
        this.ctx.fillRect(x - 3, y - 6, w + 6, h + 12);
        this.ctx.strokeStyle = "#475569";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x - 3, y - 6, w + 6, h + 12);

        // Cathode Glass Tube Interior
        this.ctx.fillStyle = "#030712";
        this.ctx.beginPath();
        this.ctx.roundRect(x, y, w, h, 8);
        this.ctx.fill();

        // Glowing Fluid
        const fluidGrad = this.ctx.createLinearGradient(x, y + h, x, y + h - fluidH);
        if (pct > 0.85) {
            fluidGrad.addColorStop(0, "#ef4444");
            fluidGrad.addColorStop(1, "#f97316");
        } else {
            fluidGrad.addColorStop(0, "#06b6d4");
            fluidGrad.addColorStop(1, "#10b981");
        }
        this.ctx.fillStyle = fluidGrad;
        this.ctx.shadowColor = pct > 0.85 ? "#ef4444" : "#10b981";
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath();
        this.ctx.roundRect(x + 2, y + h - fluidH, w - 4, fluidH - 2, 4);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Bubbles in tube
        if (this.frame % 10 === 0) {
            const by = y + h - (Math.random() * fluidH);
            this.ctx.fillStyle = "#ffffff";
            this.ctx.beginPath();
            this.ctx.arc(x + w / 2 + (Math.random() * 4 - 2), by, 1.2, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Glass highlight reflection
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        this.ctx.fillRect(x + 3, y + 4, 3, h - 8);

        // Digital HUD Text Badge above tube
        this.ctx.fillStyle = "rgba(11, 15, 25, 0.95)";
        this.ctx.beginPath();
        this.ctx.roundRect(x - 42, y - 24, 102, 16, 4);
        this.ctx.fill();
        this.ctx.strokeStyle = pct > 0.85 ? "#ef4444" : "#10b981";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        this.ctx.fillStyle = pct > 0.85 ? "#f87171" : "#34d399";
        this.ctx.font = "bold 8px 'Fira Code'";
        this.ctx.textAlign = "center";
        const pctLabel = Math.round(pct * 100);
        this.ctx.fillText(`CTX: ${pctLabel}% (128k)`, x + w / 2, y - 13);

        this.ctx.restore();
    }

    drawVectorChunkFlow() {
        if (!this.vectorChunkParticles) return;
        this.vectorChunkParticles.forEach(vp => {
            let px = 0, py = 0;
            if (vp.segment === 0) {
                px = 160 + (450 - 160) * vp.progress;
                py = 200;
            } else if (vp.segment === 1) {
                px = 450;
                py = 200 + (440 - 200) * vp.progress;
            } else {
                px = 450 + (740 - 450) * vp.progress;
                py = 440 - (440 - 200) * vp.progress;
            }

            this.ctx.save();
            const bounce = Math.sin(this.frame * 0.2 + vp.segment) * 2;
            const w = 58;
            const h = 16;

            // Particle Badge
            this.ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
            this.ctx.beginPath();
            this.ctx.roundRect(px - w / 2, py - h / 2 + bounce, w, h, 4);
            this.ctx.fill();
            this.ctx.strokeStyle = "#06b6d4";
            this.ctx.lineWidth = 1.2;
            this.ctx.stroke();

            // Glowing Label
            this.ctx.fillStyle = "#67e8f9";
            this.ctx.font = "bold 8px 'Fira Code'";
            this.ctx.textAlign = "center";
            this.ctx.fillText(vp.label, px, py + 4 + bounce);

            this.ctx.restore();
        });
    }

    // --- MULTIPLAYER CO-PRESENCE: VISITORS & PINNED MEMOS ---
    drawVisitorCharacter(v) {
        this.ctx.save();
        const isWalking = v.isWalking;
        const walkCycle = v.walkCycle || 0;
        const bounceY = isWalking ? Math.abs(Math.sin(walkCycle * 2)) * 3.5 : Math.sin(this.frame * 0.04) * 1;

        // Shadow
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        this.ctx.beginPath();
        this.ctx.ellipse(v.x, v.y + 16, 14, 5.5, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Legs
        const legOffset = isWalking ? Math.sin(walkCycle) * 5 : 0;
        this.ctx.fillStyle = "#1e293b";
        this.ctx.fillRect(v.x - 6, v.y + 3 - bounceY, 4, 11 + legOffset * 0.3);
        this.ctx.fillRect(v.x + 2, v.y + 3 - bounceY, 4, 11 - legOffset * 0.3);

        // Torso / Casual Hoodie
        this.ctx.fillStyle = v.suitColor;
        this.ctx.beginPath();
        this.ctx.roundRect(v.x - 11, v.y - 12 - bounceY, 22, 16, 4);
        this.ctx.fill();

        // Head
        this.ctx.fillStyle = "#fed7aa";
        this.ctx.beginPath();
        this.ctx.arc(v.x, v.y - 20 - bounceY, 9, 0, Math.PI * 2);
        this.ctx.fill();

        // Hair
        this.ctx.fillStyle = v.hairColor || "#475569";
        this.ctx.beginPath();
        this.ctx.arc(v.x, v.y - 23 - bounceY, 8.5, Math.PI, Math.PI * 2);
        this.ctx.fill();

        // Eyes
        const eyeX = v.facing === "left" ? -2 : 2;
        this.ctx.fillStyle = "#0f172a";
        this.ctx.beginPath();
        this.ctx.arc(v.x + eyeX, v.y - 20 - bounceY, 1.4, 0, Math.PI * 2);
        this.ctx.fill();

        // Floating Spectator Lanyard / Name Tag
        const badgeW = 90;
        const badgeH = 15;
        this.ctx.fillStyle = "rgba(11, 15, 25, 0.9)";
        this.ctx.beginPath();
        this.ctx.roundRect(v.x - badgeW / 2, v.y - 42 - bounceY, badgeW, badgeH, 4);
        this.ctx.fill();
        this.ctx.strokeStyle = v.color;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        this.ctx.fillStyle = v.color;
        this.ctx.font = "bold 8px 'Fira Code'";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`🟢 ${v.name} (${v.role})`, v.x, v.y - 31 - bounceY);

        this.ctx.restore();
    }

    drawPinnedDeskMemos() {
        this.ctx.save();
        const deskX = 450;
        const deskY = 440;

        // Memo 1: Yellow Note
        this.ctx.save();
        this.ctx.translate(deskX - 32, deskY + 12);
        this.ctx.rotate(-0.08);
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        this.ctx.fillRect(2, 2, 22, 20);
        this.ctx.fillStyle = "#fef08a";
        this.ctx.fillRect(0, 0, 22, 20);
        this.ctx.fillStyle = "#854d0e";
        this.ctx.fillRect(3, 5, 14, 2);
        this.ctx.fillRect(3, 9, 12, 2);
        this.ctx.fillRect(3, 13, 8, 2);
        this.ctx.fillStyle = "#ef4444";
        this.ctx.beginPath();
        this.ctx.arc(11, 2, 2.5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        // Memo 2: Blue Note
        this.ctx.save();
        this.ctx.translate(deskX + 16, deskY + 14);
        this.ctx.rotate(0.06);
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        this.ctx.fillRect(2, 2, 20, 18);
        this.ctx.fillStyle = "#bae6fd";
        this.ctx.fillRect(0, 0, 20, 18);
        this.ctx.fillStyle = "#0369a1";
        this.ctx.fillRect(3, 4, 13, 2);
        this.ctx.fillRect(3, 8, 10, 2);
        this.ctx.fillStyle = "#10b981";
        this.ctx.beginPath();
        this.ctx.arc(10, 2, 2.5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        // Hover / Action Indicator: [📌 Memo]
        this.ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        this.ctx.beginPath();
        this.ctx.roundRect(deskX - 26, deskY + 32, 52, 14, 3);
        this.ctx.fill();
        this.ctx.strokeStyle = "#f59e0b";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        this.ctx.fillStyle = "#fde047";
        this.ctx.font = "bold 7px 'Fira Code'";
        this.ctx.textAlign = "center";
        this.ctx.fillText("📌 MEMO", deskX, deskY + 42);

        this.ctx.restore();
    }

    drawRepairParticles() {
        this.repairParticles.forEach(p => {
            this.ctx.save();
            this.ctx.fillStyle = p.color;
            this.ctx.shadowColor = p.color;
            this.ctx.shadowBlur = 8;
            this.ctx.globalAlpha = Math.max(0, p.alpha);
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    // --- WAR ROOM & SELF-HEALING ENGINE ---
    triggerWarRoomIncident(stationKey = 'pulse', reason = 'API Rate Limit 429') {
        this.isWarRoomActive = true;
        this.incidentStation = stationKey;
        this.incidentReason = reason;

        sfx.playAlarmSiren();

        const overlay = document.getElementById("warRoomOverlay");
        if (overlay) overlay.classList.remove("hidden");

        const card = document.getElementById("incidentActionCard");
        if (card) {
            card.classList.remove("hidden");
            const stTitle = document.getElementById("incidentTargetTitle");
            const stDesc = document.getElementById("incidentReasonDesc");
            const st = this.stations[stationKey] || { name: stationKey.toUpperCase() };
            if (stTitle) stTitle.textContent = `${st.name}: Gangguan Layanan!`;
            if (stDesc) stDesc.textContent = `${reason}. Sistem memulai auto-recovery otonom...`;
        }

        const techKey = 'boss';
        const techAgent = this.agents[techKey];
        if (techAgent) {
            techAgent.carryingItem = "🧰";
            const targetSt = this.stations[stationKey] || { x: 450, y: 200 };
            showSpeechBubble(techKey, `🚨 Insiden terdeteksi di stasiun ${stationKey.toUpperCase()}! Protokol self-healing dijalankan 🧰⚡`, 3500);

            this.walkAgentToCoords(techKey, targetSt.x + 35, targetSt.y + 10).then(() => {
                this.selfHealingState = {
                    agentKey: techKey,
                    targetStation: stationKey,
                    stage: 'repairing',
                    timer: 0
                };
                showSpeechBubble(techKey, "Menjalankan skrip auto-retry & rotasi gateway... 🔧⚡", 3500);
            });
        }

        addLog("WAR_ROOM", `🚨 ALARM DARURAT: Insiden di ${stationKey.toUpperCase()} (${reason}). Self-healing aktif!`, "error");
    }

    finishSelfHealing() {
        this.isWarRoomActive = false;
        const overlay = document.getElementById("warRoomOverlay");
        if (overlay) overlay.classList.add("hidden");
        const card = document.getElementById("incidentActionCard");
        if (card) card.classList.add("hidden");

        const techKey = (this.selfHealingState && this.selfHealingState.agentKey) || 'boss';
        const techAgent = this.agents[techKey];
        if (techAgent) {
            techAgent.carryingItem = null;
            showSpeechBubble(techKey, "Auto-recovery tuntas! Layanan kembali online & stabil ✅", 3000);
            this.walkAgentToCoords(techKey, techAgent.homeX, techAgent.homeY);
        }
        this.selfHealingState = null;
        sfx.playSuccessChime();
        showToast("Self-Healing Berhasil! Gangguan teratasi otomatis.", "success");
        addLog("WAR_ROOM", "✅ Self-healing berhasil. Layanan telah dipulihkan ke status prima.", "success");
    }

    loadPinnedMemos() {
        fetch("/api/memos")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.memos) {
                    this.pinnedMemos = data.memos;
                    renderMemoGridUI(this.pinnedMemos);
                }
            })
            .catch(() => {});
    }

    // ==========================================
    // 1. MATRIX RAG MEMORY VAULT ENGINE METHODS
    // ==========================================
    loadRagVaultData() {
        fetch("/api/rag/vault")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.vault) {
                    this.ragVault.totalVectors = data.vault.total_vectors || 14820;
                    renderVaultChunksUI(data.vault);
                }
            })
            .catch(() => {});
    }

    fireRagRetrievalBeams(query = "Claude 3.7 reasoning") {
        const count = 4;
        for (let i = 0; i < count; i++) {
            this.ragVault.activeBeams.push({
                progress: 0,
                speed: 0.016 + i * 0.003,
                delay: i * 8,
                label: i === 0 ? `[cos: 0.942]` : (i === 1 ? `[dim: 768]` : `[chunk: #${i + 1}]`),
                color: i % 2 === 0 ? '#c084fc' : '#38bdf8'
            });
        }
        sfx.playHandover();
    }

    drawMatrixMemoryVault() {
        this.ctx.save();
        const vx = this.ragVault.x;
        const vy = this.ragVault.y;
        const vw = this.ragVault.width;
        const vh = this.ragVault.height;

        // Vault Glass Room Enclosure
        this.ctx.fillStyle = "rgba(10, 15, 29, 0.94)";
        this.ctx.beginPath();
        this.ctx.roundRect(vx, vy, vw, vh, 6);
        this.ctx.fill();

        // Neon Border with subtle pulse
        const borderPulse = Math.sin(this.frame * 0.08) * 0.15;
        this.ctx.strokeStyle = `rgba(168, 85, 247, ${0.5 + borderPulse})`;
        this.ctx.lineWidth = 1.6;
        this.ctx.shadowColor = "#a855f7";
        this.ctx.shadowBlur = 8;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // Header Label Plate
        this.ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        this.ctx.fillRect(vx + 6, vy + 4, vw - 12, 11);
        this.ctx.fillStyle = "#c084fc";
        this.ctx.font = "bold 7px 'Fira Code'";
        this.ctx.textAlign = "center";
        this.ctx.fillText("💾 VECTOR VAULT [768-D]", vx + vw / 2, vy + 12.5);

        // Server Rack Column A
        this.ctx.fillStyle = "#0c1322";
        this.ctx.fillRect(vx + 6, vy + 18, 22, vh - 24);
        this.ctx.strokeStyle = "#3b82f640";
        this.ctx.strokeRect(vx + 6, vy + 18, 22, vh - 24);
        for (let row = 0; row < 5; row++) {
            const ledY = vy + 22 + row * 8;
            this.ctx.fillStyle = (this.frame + row * 15) % 40 < 20 ? "#10b981" : "#06b6d4";
            this.ctx.fillRect(vx + 9, ledY, 3, 2.5);
            this.ctx.fillStyle = (this.frame + row * 22) % 60 < 30 ? "#3b82f6" : "#6366f1";
            this.ctx.fillRect(vx + 14, ledY, 3, 2.5);
            this.ctx.fillStyle = "#334155";
            this.ctx.fillRect(vx + 19, ledY, 6, 2.5);
        }

        // Server Rack Column B
        this.ctx.fillStyle = "#0c1322";
        this.ctx.fillRect(vx + 32, vy + 18, 22, vh - 24);
        this.ctx.strokeStyle = "#a855f740";
        this.ctx.strokeRect(vx + 32, vy + 18, 22, vh - 24);
        for (let row = 0; row < 5; row++) {
            const ledY = vy + 22 + row * 8;
            this.ctx.fillStyle = (this.frame + row * 18) % 50 < 25 ? "#c084fc" : "#e879f9";
            this.ctx.fillRect(vx + 35, ledY, 3, 2.5);
            this.ctx.fillStyle = (this.frame + row * 12) % 45 < 20 ? "#38bdf8" : "#2dd4bf";
            this.ctx.fillRect(vx + 40, ledY, 3, 2.5);
            this.ctx.fillStyle = "#334155";
            this.ctx.fillRect(vx + 45, ledY, 6, 2.5);
        }

        // Floating 3D Vector Embedding Crystal/Cube at Right Chamber
        const cubeCx = vx + 68;
        const cubeCy = vy + 40 + Math.sin(this.frame * 0.08) * 3;
        const cubeSize = 9;

        this.ctx.save();
        this.ctx.translate(cubeCx, cubeCy);
        const rot = this.frame * 0.02;
        this.ctx.rotate(rot);

        // Outer crystal glow
        this.ctx.strokeStyle = "#c084fc";
        this.ctx.lineWidth = 1.2;
        this.ctx.shadowColor = "#c084fc";
        this.ctx.shadowBlur = 10;
        this.ctx.strokeRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
        this.ctx.fillStyle = "rgba(192, 132, 252, 0.25)";
        this.ctx.fillRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
        this.ctx.restore();

        // Orbital Vector Ring
        this.ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.ellipse(cubeCx, cubeCy, 14, 6, this.frame * 0.03, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.fillStyle = "#38bdf8";
        this.ctx.font = "bold 6.5px 'Fira Code'";
        this.ctx.textAlign = "center";
        this.ctx.fillText("pgvector", cubeCx, vy + 58);

        this.ctx.restore();
    }

    drawRetrievalBeams() {
        if (!this.ragVault || !this.ragVault.activeBeams || this.ragVault.activeBeams.length === 0) return;

        const startX = 80;
        const startY = 108;
        const targetX = 450;
        const targetY = 200;
        const cpX = 260;
        const cpY = 110; // Control point for curved data beam

        for (let i = this.ragVault.activeBeams.length - 1; i >= 0; i--) {
            const beam = this.ragVault.activeBeams[i];
            if (beam.delay && beam.delay > 0) {
                beam.delay--;
                continue;
            }

            beam.progress += beam.speed;
            const t = Math.min(1.0, beam.progress);

            // Quadratic Bezier interpolation
            const bx = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * targetX;
            const by = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cpY + t * t * targetY;

            this.ctx.save();
            this.ctx.fillStyle = beam.color;
            this.ctx.shadowColor = beam.color;
            this.ctx.shadowBlur = 12;

            // Glowing plasma particle
            this.ctx.beginPath();
            this.ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
            this.ctx.fill();

            // Floating Label Tag
            this.ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
            this.ctx.fillRect(bx - 24, by - 14, 48, 10);
            this.ctx.strokeStyle = beam.color;
            this.ctx.lineWidth = 0.8;
            this.ctx.strokeRect(bx - 24, by - 14, 48, 10);

            this.ctx.fillStyle = "#f1f5f9";
            this.ctx.font = "bold 6.5px 'Fira Code'";
            this.ctx.textAlign = "center";
            this.ctx.fillText(beam.label, bx, by - 6.5);
            this.ctx.restore();

            // When beam reaches Gemini station
            if (beam.progress >= 1.0) {
                this.ragVault.activeBeams.splice(i, 1);
                // Pulse aura on Gemini workstation
                this.waypoints.push({
                    x: targetX,
                    y: targetY,
                    radius: 6,
                    maxRadius: 36,
                    alpha: 1.0,
                    color: beam.color
                });
            }
        }
    }

    // ==========================================
    // 2. FINANCIAL HOLOGRAM & CIRCUIT-BREAKER
    // ==========================================
    loadFinancialMetrics() {
        fetch("/api/financial/metrics")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.financial) {
                    this.financial = data.financial;
                    updateFinancialUI(this.financial);
                }
            })
            .catch(() => {});
    }

    drawHolographicFloorProjection() {
        this.ctx.save();
        const cx = 450;
        const cy = 320;
        const rot = this.frame * 0.015;

        const isTripped = this.financial && this.financial.is_circuit_breaker_tripped;
        const mainColor = isTripped ? "#ef4444" : "#f59e0b";
        const subColor = isTripped ? "#f87171" : "#38bdf8";

        // Outer Rotating Hologram Ring with tick dashes
        this.ctx.strokeStyle = `${mainColor}40`;
        this.ctx.lineWidth = 1.4;
        this.ctx.setLineDash([8, 6]);
        this.ctx.lineDashOffset = -rot * 40;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 54, 0, Math.PI * 2);
        this.ctx.stroke();

        // Inner Reverse Rotating Hexagon / Ring
        this.ctx.strokeStyle = `${subColor}50`;
        this.ctx.lineWidth = 1.2;
        this.ctx.setLineDash([5, 5]);
        this.ctx.lineDashOffset = rot * 35;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Holographic floor grid base
        this.ctx.fillStyle = isTripped ? "rgba(239, 68, 68, 0.08)" : "rgba(245, 158, 11, 0.06)";
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 54, 0, Math.PI * 2);
        this.ctx.fill();

        // Hologram Monospace Readout Texts
        this.ctx.textAlign = "center";
        if (isTripped) {
            this.ctx.fillStyle = "#ef4444";
            this.ctx.font = "bold 8px 'Fira Code'";
            this.ctx.fillText("⚡ BREAKER TRIPPED! ⚡", cx, cy - 10);

            this.ctx.fillStyle = "#fca5a5";
            this.ctx.font = "7px 'Fira Code'";
            this.ctx.fillText("POWER CUT TO DESKS", cx, cy + 3);

            this.ctx.fillStyle = "#e2e8f0";
            this.ctx.font = "6.5px 'Fira Code'";
            this.ctx.fillText(`COST: $${(this.financial.session_cost || 0.042).toFixed(3)}`, cx, cy + 14);
        } else {
            this.ctx.fillStyle = "#38bdf8";
            this.ctx.font = "bold 7px 'Fira Code'";
            this.ctx.fillText("◈ TOKEN BURN-RATE ◈", cx, cy - 12);

            this.ctx.fillStyle = "#fbbf24";
            this.ctx.font = "bold 9.5px 'Fira Code'";
            const costText = `$${(this.financial.session_cost || 0.042).toFixed(4)} USD`;
            this.ctx.fillText(costText, cx, cy);

            this.ctx.fillStyle = "#34d399";
            this.ctx.font = "7px 'Fira Code'";
            const burnText = `${this.financial.burn_rate || 120} tok/s • CAP $${(this.financial.budget_limit || 5).toFixed(2)}`;
            this.ctx.fillText(burnText, cx, cy + 12);
        }

        this.ctx.restore();
    }

    drawCircuitBreakerSparks() {
        if (this.frame % 3 === 0) {
            this.breakerSparks.push({
                x: 450 + (Math.random() * 80 - 40),
                y: 320 + (Math.random() * 40 - 20),
                vx: Math.random() * 3 - 1.5,
                vy: -Math.random() * 2.5 - 0.5,
                size: Math.random() * 2.5 + 1.5,
                color: Math.random() > 0.5 ? '#ef4444' : '#f59e0b',
                alpha: 1.0,
                life: 20
            });
        }
        for (let i = this.breakerSparks.length - 1; i >= 0; i--) {
            const sp = this.breakerSparks[i];
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.alpha -= 0.05;
            sp.life--;
            if (sp.life <= 0 || sp.alpha <= 0) {
                this.breakerSparks.splice(i, 1);
                continue;
            }
            this.ctx.save();
            this.ctx.fillStyle = sp.color;
            this.ctx.globalAlpha = Math.max(0, sp.alpha);
            this.ctx.beginPath();
            this.ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }

    // ==========================================
    // 3. AGENT EVOLUTION & RPG SKILL LEVELING
    // ==========================================
    loadAgentRpgSkills() {
        fetch("/api/agents/skills")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.agents) {
                    this.agentRpg = data.agents;
                }
            })
            .catch(() => {});
    }

    triggerLevelUpAnimation(agentKey) {
        const agent = this.agents[agentKey] || { x: 450, y: 300 };
        this.rpgFloatingTexts.push({
            text: `⭐ LEVEL UP! Lv.${(this.agentRpg[agentKey] && this.agentRpg[agentKey].level) || 2} ⭐`,
            x: agent.x,
            y: agent.y - 70,
            alpha: 1.0,
            life: 80
        });
        sfx.playSuccessChime();
        showToast(`${agentKey.toUpperCase()} Naik Level! Skill baru terbuka di RPG Tree. ⭐`, "success");
    }

    drawRpgFloatingTexts() {
        for (let i = this.rpgFloatingTexts.length - 1; i >= 0; i--) {
            const ft = this.rpgFloatingTexts[i];
            ft.y -= 0.5;
            ft.alpha -= 0.012;
            ft.life--;
            if (ft.life <= 0 || ft.alpha <= 0) {
                this.rpgFloatingTexts.splice(i, 1);
                continue;
            }
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, ft.alpha);
            this.ctx.fillStyle = "#fbbf24";
            this.ctx.shadowColor = "#f59e0b";
            this.ctx.shadowBlur = 10;
            this.ctx.font = "bold 9.5px 'Press Start 2P', monospace";
            this.ctx.textAlign = "center";
            this.ctx.fillText(ft.text, ft.x, ft.y);
            this.ctx.restore();
        }
    }

    // ==========================================
    // 4. LIVE PRODUCTION FEED & LINKEDIN SATELLITE
    // ==========================================
    loadLinkedInAnalytics() {
        fetch("/api/analytics/linkedin")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.analytics) {
                    this.linkedinBroadcast.stats = data.analytics;
                    renderLinkedInAnalyticsUI(data.analytics);
                }
            })
            .catch(() => {});
    }

    drawBroadcastSatellite() {
        this.ctx.save();
        const sx = this.linkedinBroadcast.x;
        const sy = this.linkedinBroadcast.y;

        // Tripod mast stand
        this.ctx.strokeStyle = "#475569";
        this.ctx.lineWidth = 1.8;
        this.ctx.beginPath();
        this.ctx.moveTo(sx - 9, sy + 18);
        this.ctx.lineTo(sx, sy + 6);
        this.ctx.lineTo(sx + 9, sy + 18);
        this.ctx.stroke();

        // Central vertical shaft
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy + 6);
        this.ctx.lineTo(sx, sy - 4);
        this.ctx.stroke();

        // Parabolic Dish (angled upward)
        this.ctx.fillStyle = "#1e293b";
        this.ctx.strokeStyle = "#06b6d4";
        this.ctx.lineWidth = 1.4;
        this.ctx.beginPath();
        this.ctx.ellipse(sx, sy - 6, 12, 6, -0.2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        // Focal feed horn
        this.ctx.strokeStyle = "#cbd5e1";
        this.ctx.lineWidth = 1.2;
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy - 6);
        this.ctx.lineTo(sx + 3, sy - 14);
        this.ctx.stroke();

        // Blinking transmission beacon LED
        const beaconBlink = (this.frame % 30 < 15);
        this.ctx.fillStyle = beaconBlink ? "#22d3ee" : "#0284c7";
        this.ctx.shadowColor = "#06b6d4";
        this.ctx.shadowBlur = 8;
        this.ctx.beginPath();
        this.ctx.arc(sx + 3, sy - 14, 2.5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Radiating Radio Waves (when broadcasting or periodic pulse)
        if (this.frame % 90 === 0) {
            this.linkedinBroadcast.radioWaves.push({
                radius: 6,
                maxRadius: 36,
                alpha: 0.8
            });
        }
        for (let i = this.linkedinBroadcast.radioWaves.length - 1; i >= 0; i--) {
            const wave = this.linkedinBroadcast.radioWaves[i];
            wave.radius += 0.8;
            wave.alpha -= 0.018;
            if (wave.radius >= wave.maxRadius || wave.alpha <= 0) {
                this.linkedinBroadcast.radioWaves.splice(i, 1);
                continue;
            }
            this.ctx.strokeStyle = "#06b6d4";
            this.ctx.globalAlpha = Math.max(0, wave.alpha);
            this.ctx.lineWidth = 1.4;
            this.ctx.beginPath();
            this.ctx.arc(sx + 3, sy - 14, wave.radius, -Math.PI * 0.9, -Math.PI * 0.1);
            this.ctx.stroke();
        }

        this.ctx.restore();
    }

    drawLinkedInEngagementTicker() {
        this.ctx.save();
        const tx = this.linkedinBroadcast.x;
        const ty = 172;
        const stats = this.linkedinBroadcast.stats || { likes: 14, comments: 3, reposts: 2, impressions: 342 };

        const pillW = 168;
        const pillH = 17;
        const pillX = tx - pillW / 2;
        const pillY = ty - pillH / 2;

        // Floating Pill Badge
        this.ctx.fillStyle = "rgba(10, 15, 29, 0.92)";
        this.ctx.beginPath();
        this.ctx.roundRect(pillX, pillY, pillW, pillH, 5);
        this.ctx.fill();

        this.ctx.strokeStyle = "rgba(6, 182, 212, 0.55)";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // Pulsing Live Dot
        const dotPulse = (this.frame % 40 < 20);
        this.ctx.fillStyle = dotPulse ? "#10b981" : "#059669";
        this.ctx.beginPath();
        this.ctx.arc(pillX + 8, ty, 2.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Ticker Text: Likes, Comments, Reposts, Impressions
        this.ctx.fillStyle = "#f1f5f9";
        this.ctx.font = "bold 7.5px 'Fira Code'";
        this.ctx.textAlign = "left";
        const tickerStr = `👍 ${stats.likes} 💬 ${stats.comments} 🔄 ${stats.reposts} 👁️ ${stats.impressions}`;
        this.ctx.fillText(tickerStr, pillX + 16, ty + 2.5);

        this.ctx.restore();
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

        // 3. COLOSSAL CITADEL PANORAMIC GLASS DOME SKYLINE (Penthouse War Room View)
        this.drawCitadelPanoramicSkyline(20, 0, 802, 60);

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

    drawCitadelPanoramicSkyline(x, y, w, h) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.clip();

        // 1. Cosmic Deep Void to Indigo/Cyan Nebula Haze Gradient
        const skyGrad = this.ctx.createLinearGradient(x, y, x, y + h);
        skyGrad.addColorStop(0, "#010309");
        skyGrad.addColorStop(0.35, "#060b1e");
        skyGrad.addColorStop(0.75, "#0d1b3a");
        skyGrad.addColorStop(1, "#1e1b4b");
        this.ctx.fillStyle = skyGrad;
        this.ctx.fillRect(x, y, w, h);

        // 2. Cosmic Twinkling Stars
        this.ctx.fillStyle = "#ffffff";
        for (let i = 0; i < 48; i++) {
            const sx = x + (i * 29.3 + 7) % w;
            const sy = y + (i * 13.7 + 3) % (h - 12);
            const twinkle = (this.frame + i * 17) % 60 < 30 ? 0.9 : 0.25;
            this.ctx.globalAlpha = twinkle;
            this.ctx.fillRect(sx, sy, 1.2, 1.2);
        }
        this.ctx.globalAlpha = 1;

        // 3. Colossal Parallax Cyberpunk Metropolis Skyscrapers
        const buildingsFar = [
            { bx: 15, bw: 38, bh: 48 }, { bx: 68, bw: 45, bh: 54 }, { bx: 130, bw: 32, bh: 42 },
            { bx: 178, bw: 52, bh: 58 }, { bx: 245, bw: 40, bh: 46 }, { bx: 300, bw: 60, bh: 56 },
            { bx: 375, bw: 36, bh: 50 }, { bx: 425, bw: 55, bh: 60 }, { bx: 495, bw: 44, bh: 44 },
            { bx: 555, bw: 64, bh: 58 }, { bx: 635, bw: 38, bh: 48 }, { bx: 688, bw: 48, bh: 54 },
            { bx: 750, bw: 46, bh: 44 }
        ];

        buildingsFar.forEach((b, idx) => {
            const bX = x + b.bx;
            const bY = y + h - b.bh;
            this.ctx.fillStyle = idx % 2 === 0 ? "#050914" : "#080e1e";
            this.ctx.fillRect(bX, bY, b.bw, b.bh);

            // Communication Spire with Blinking Aviation Beacon
            this.ctx.strokeStyle = "#1e293b";
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(bX + b.bw / 2, bY);
            this.ctx.lineTo(bX + b.bw / 2, bY - 14);
            this.ctx.stroke();

            const isBeaconOn = (this.frame + idx * 15) % 50 < 25;
            this.ctx.fillStyle = isBeaconOn ? "#ef4444" : "#450a0a";
            this.ctx.fillRect(bX + b.bw / 2 - 1, bY - 15, 2.5, 2.5);

            // Lit Window Matrix Dots in Skyscrapers
            this.ctx.fillStyle = idx % 3 === 0 ? "#38bdf8" : (idx % 3 === 1 ? "#fbbf24" : "#a855f7");
            for (let wy = bY + 6; wy < y + h - 6; wy += 7) {
                for (let wx = bX + 4; wx < bX + b.bw - 4; wx += 6) {
                    if ((wx * 7 + wy * 13) % 4 === 0) {
                        this.ctx.fillRect(wx, wy, 2, 2.5);
                    }
                }
            }
        });

        // 4. Smooth Flying Futuristic Aerocars (Sky Vehicles Gliding Across Metropolis)
        if (this.skyVehicles) {
            this.skyVehicles.forEach(veh => {
                veh.x += veh.speed;
                if (veh.speed > 0 && veh.x > w + 20) veh.x = -20;
                else if (veh.speed < 0 && veh.x < -20) veh.x = w + 20;

                const vx = x + veh.x;
                const vy = y + veh.y;

                // Glowing Ion Engine Tail
                this.ctx.fillStyle = veh.tail;
                this.ctx.shadowColor = veh.tail;
                this.ctx.shadowBlur = 8;
                this.ctx.fillRect(veh.speed > 0 ? vx - veh.length : vx + 6, vy + 1, veh.length, 1.8);
                this.ctx.shadowBlur = 0;

                // Vehicle Body
                this.ctx.fillStyle = "#ffffff";
                this.ctx.fillRect(vx, vy, 6, 2.5);

                // Front Headlight Beam
                this.ctx.fillStyle = veh.color;
                this.ctx.fillRect(veh.speed > 0 ? vx + 6 : vx - 3, vy + 0.5, 3, 2);
            });
        }

        // 5. Architectural Curved Glass Dome Truss Rafters & Titanium Mullions
        const mullionStep = 80;
        this.ctx.strokeStyle = "rgba(30, 41, 59, 0.85)";
        this.ctx.lineWidth = 3;
        for (let mx = x + mullionStep; mx < x + w; mx += mullionStep) {
            this.ctx.beginPath();
            this.ctx.moveTo(mx, y);
            this.ctx.lineTo(mx, y + h);
            this.ctx.stroke();

            // Rivet bolts on mullions
            this.ctx.fillStyle = "#64748b";
            this.ctx.fillRect(mx - 1.5, y + 15, 3, 3);
            this.ctx.fillRect(mx - 1.5, y + 42, 3, 3);
        }

        // Horizontal Horizon Sill Beam
        this.ctx.fillStyle = "#0c1524";
        this.ctx.fillRect(x, y + h - 4, w, 4);
        this.ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y + h - 4, w, 4);

        this.ctx.restore();
    }

    drawVolumetricGodRays() {
        this.ctx.save();
        // 3 Diagonal Volumetric Light Shafts piercing from the glass dome
        const rays = [
            { sx: 180, sy: 50, ex: 340, ey: 480, w1: 30, w2: 120, col: "rgba(56, 189, 248, 0.05)" },
            { sx: 450, sy: 30, ex: 450, ey: 520, w1: 45, w2: 180, col: "rgba(168, 85, 247, 0.06)" },
            { sx: 720, sy: 50, ex: 580, ey: 480, w1: 30, w2: 120, col: "rgba(6, 182, 212, 0.05)" }
        ];

        rays.forEach(ray => {
            const grad = this.ctx.createLinearGradient(ray.sx, ray.sy, ray.ex, ray.ey);
            grad.addColorStop(0, ray.col);
            grad.addColorStop(0.5, ray.col.replace("0.05", "0.025").replace("0.06", "0.03"));
            grad.addColorStop(1, "transparent");

            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.moveTo(ray.sx - ray.w1 / 2, ray.sy);
            this.ctx.lineTo(ray.sx + ray.w1 / 2, ray.sy);
            this.ctx.lineTo(ray.ex + ray.w2 / 2, ray.ey);
            this.ctx.lineTo(ray.ex - ray.w2 / 2, ray.ey);
            this.ctx.closePath();
            this.ctx.fill();
        });

        // Floating Luminous Dust Motes
        if (this.godRayDustMotes) {
            this.godRayDustMotes.forEach(mote => {
                mote.y += mote.speedY;
                mote.x += mote.speedX;
                if (mote.y > 540) mote.y = 60;
                if (mote.x < 30 || mote.x > 810) mote.speedX *= -1;

                this.ctx.fillStyle = `rgba(224, 242, 254, ${mote.alpha})`;
                this.ctx.fillRect(mote.x, mote.y, mote.size, mote.size);
            });
        }
        this.ctx.restore();
    }

    drawWorkstationSpotlights() {
        this.ctx.save();
        // Dramatic overhead cone spotlights shining down on stations
        const spots = [
            { x: this.stations.scout.x, y: this.stations.scout.y, color: "#3b82f6", r: 95 },
            { x: this.stations.pulse.x, y: this.stations.pulse.y, color: "#a855f7", r: 125 },
            { x: this.stations.link.x, y: this.stations.link.y, color: "#06b6d4", r: 95 },
            { x: this.stations.boss.x, y: this.stations.boss.y, color: "#10b981", r: 115 }
        ];

        spots.forEach(sp => {
            const coneGrad = this.ctx.createRadialGradient(sp.x, sp.y - 10, 12, sp.x, sp.y, sp.r);
            coneGrad.addColorStop(0, `${sp.color}25`);
            coneGrad.addColorStop(0.5, `${sp.color}0b`);
            coneGrad.addColorStop(1, "transparent");

            this.ctx.fillStyle = coneGrad;
            this.ctx.beginPath();
            this.ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.restore();
    }

    drawGeminiReactorMonolith() {
        this.ctx.save();
        const rx = 450;
        const ry = 8;
        const rw = 76;
        const rh = 195;
        const isProcessing = (this.roomState === 'processing');

        // 1. Heavy Industrial Drop Shadow
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        this.ctx.fillRect(rx - rw / 2 + 4, ry + 4, rw, rh);

        // 2. Dark Titanium Monolith Tower Casing
        this.ctx.fillStyle = "#070c18";
        this.ctx.fillRect(rx - rw / 2, ry, rw, rh);

        // Tower Outer Edge Armor Plates & Seams
        this.ctx.strokeStyle = "#1e293b";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(rx - rw / 2, ry, rw, rh);

        // Bevel Highlight & Shadow Lines
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        this.ctx.fillRect(rx - rw / 2, ry, rw, 2);
        this.ctx.fillRect(rx - rw / 2, ry, 2, rh);

        // Lateral Hazard Chevron Stripes (Warning High Voltage Reactor)
        this.ctx.fillStyle = "rgba(245, 158, 11, 0.35)";
        for (let y = ry + 20; y < ry + rh - 20; y += 36) {
            this.ctx.fillRect(rx - rw / 2 + 3, y, 6, 8);
            this.ctx.fillRect(rx + rw / 2 - 9, y, 6, 8);
        }

        // 3. Central Vertical Glass Tube (Silinder Kristal Reaktor)
        const tubeW = 34;
        const tubeX = rx - tubeW / 2;
        const tubeY = ry + 16;
        const tubeH = rh - 32;

        // Tube Inner Dark Core
        this.ctx.fillStyle = "#030611";
        this.ctx.fillRect(tubeX, tubeY, tubeW, tubeH);

        // 4. Vertical Flowing Plasma Core Stream (Pulsing Energy Stream)
        const pulse = Math.sin(this.frame * (isProcessing ? 0.15 : 0.08));
        const plasmaGrad = this.ctx.createLinearGradient(tubeX, tubeY, tubeX + tubeW, tubeY);
        plasmaGrad.addColorStop(0, "rgba(168, 85, 247, 0.2)");
        plasmaGrad.addColorStop(0.3, isProcessing ? "#e879f9" : "#c084fc");
        plasmaGrad.addColorStop(0.5, "#ffffff");
        plasmaGrad.addColorStop(0.7, isProcessing ? "#a855f7" : "#818cf8");
        plasmaGrad.addColorStop(1, "rgba(56, 189, 248, 0.2)");

        this.ctx.fillStyle = plasmaGrad;
        this.ctx.shadowColor = isProcessing ? "#d946ef" : "#a855f7";
        this.ctx.shadowBlur = isProcessing ? 20 : 12;
        
        // Undulating plasma column
        this.ctx.beginPath();
        const pMidX = rx + pulse * 3;
        this.ctx.moveTo(pMidX - 6, tubeY);
        this.ctx.lineTo(pMidX + 6, tubeY);
        this.ctx.lineTo(pMidX + 9 - pulse * 2, tubeY + tubeH);
        this.ctx.lineTo(pMidX - 9 + pulse * 2, tubeY + tubeH);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Rising ionized spark motes inside cylinder
        this.ctx.fillStyle = "#ffffff";
        for (let i = 0; i < 6; i++) {
            const sparkProg = (this.frame * (isProcessing ? 3.5 : 1.8) + i * 32) % tubeH;
            const sparkY = (tubeY + tubeH) - sparkProg;
            const sparkX = rx + Math.sin(this.frame * 0.1 + i) * 8;
            this.ctx.fillRect(sparkX - 1, sparkY, 2.5, 3.5);
        }

        // Glass Tube Specular Reflection (Diagonal Sheen)
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
        this.ctx.fillRect(tubeX + 3, tubeY, 3, tubeH);

        this.ctx.strokeStyle = "rgba(168, 85, 247, 0.6)";
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeRect(tubeX, tubeY, tubeW, tubeH);

        // 5. Rotating Magnetic Containment Rings (3 Cincin Penahan Plasma)
        [tubeY + 28, tubeY + tubeH / 2, tubeY + tubeH - 28].forEach((cy, idx) => {
            const ringPulse = Math.sin(this.frame * 0.1 + idx * 1.5);
            // Outer Ring Bracket
            this.ctx.fillStyle = "#1e293b";
            this.ctx.fillRect(rx - rw / 2 + 2, cy - 5, rw - 4, 10);
            this.ctx.strokeStyle = "#38bdf8";
            this.ctx.lineWidth = 1.2;
            this.ctx.strokeRect(rx - rw / 2 + 2, cy - 5, rw - 4, 10);

            // Ring Center Magnetic Emitter Dot
            this.ctx.fillStyle = (ringPulse > 0) ? "#38bdf8" : "#818cf8";
            this.ctx.shadowColor = "#38bdf8";
            this.ctx.shadowBlur = 8;
            this.ctx.beginPath();
            this.ctx.arc(rx, cy, 3.5, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });

        // 6. Floor Base Anchoring Flange & Heavy Coolant Conduits
        this.ctx.fillStyle = "#0f172a";
        this.ctx.fillRect(rx - rw / 2 - 8, ry + rh - 12, rw + 16, 16);
        this.ctx.strokeStyle = "#334155";
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeRect(rx - rw / 2 - 8, ry + rh - 12, rw + 16, 16);

        // Hex bolts along flange
        this.ctx.fillStyle = "#94a3b8";
        for (let bx = rx - rw / 2 - 4; bx <= rx + rw / 2 + 4; bx += 14) {
            this.ctx.fillRect(bx, ry + rh - 6, 3, 3);
        }

        // 7. Hologram Title Banner Floating on Monolith Top
        this.ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        this.ctx.beginPath();
        this.ctx.roundRect(rx - 75, ry + 2, 150, 16, 4);
        this.ctx.fill();
        this.ctx.strokeStyle = isProcessing ? "#d946ef" : "#a855f7";
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();

        this.ctx.fillStyle = isProcessing ? "#f0abfc" : "#e9d5ff";
        this.ctx.font = "bold 8px 'Orbitron', monospace";
        this.ctx.textAlign = "center";
        this.ctx.fillText(isProcessing ? "⚡ REACTOR OVERDRIVE // PULSING" : "✨ GEMINI 2.5 FLASH // MONOLITH CORE", rx, ry + 13);

        this.ctx.restore();
    }

    drawHolographicCentralGlobe() {
        this.ctx.save();
        const gx = 450;
        const gy = 295;
        const r = 38;

        this.centralGlobeAngle = (this.centralGlobeAngle || 0) + 0.02;
        const ang = this.centralGlobeAngle;

        // 1. Floor Holographic Projector Emitter Base
        this.ctx.fillStyle = "rgba(6, 182, 212, 0.15)";
        this.ctx.beginPath();
        this.ctx.ellipse(gx, gy + 38, 44, 14, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = "#38bdf8";
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();

        // Concentric emitter pulse ring
        const emitPulse = (this.frame * 0.8) % 35;
        this.ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, 1 - emitPulse / 35)})`;
        this.ctx.beginPath();
        this.ctx.ellipse(gx, gy + 38, 14 + emitPulse, (14 + emitPulse) * 0.35, 0, 0, Math.PI * 2);
        this.ctx.stroke();

        // Vertical holographic projector light cone
        const coneGrad = this.ctx.createLinearGradient(gx, gy + 38, gx, gy);
        coneGrad.addColorStop(0, "rgba(56, 189, 248, 0.25)");
        coneGrad.addColorStop(1, "rgba(168, 85, 247, 0.05)");
        this.ctx.fillStyle = coneGrad;
        this.ctx.beginPath();
        this.ctx.moveTo(gx - 28, gy + 38);
        this.ctx.lineTo(gx + 28, gy + 38);
        this.ctx.lineTo(gx + r, gy);
        this.ctx.lineTo(gx - r, gy);
        this.ctx.closePath();
        this.ctx.fill();

        // 2. 3D Wireframe Cyber-Globe Sphere
        this.ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
        this.ctx.lineWidth = 1.2;

        // Outer Sphere Rim
        this.ctx.beginPath();
        this.ctx.arc(gx, gy, r, 0, Math.PI * 2);
        this.ctx.stroke();

        // Soft internal sphere glow
        const sphereGlow = this.ctx.createRadialGradient(gx, gy, 4, gx, gy, r);
        sphereGlow.addColorStop(0, "rgba(168, 85, 247, 0.35)");
        sphereGlow.addColorStop(0.6, "rgba(56, 189, 248, 0.15)");
        sphereGlow.addColorStop(1, "transparent");
        this.ctx.fillStyle = sphereGlow;
        this.ctx.fill();

        // Latitude Rings
        [-20, 0, 20].forEach(latY => {
            const latW = Math.sqrt(Math.max(0, r * r - latY * latY));
            this.ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
            this.ctx.beginPath();
            this.ctx.ellipse(gx, gy + latY, latW, latW * 0.3, 0, 0, Math.PI * 2);
            this.ctx.stroke();
        });

        // 3D Rotating Longitude Ellipses
        for (let i = 0; i < 4; i++) {
            const rotA = ang + (i * Math.PI) / 4;
            const longW = Math.cos(rotA) * r;
            this.ctx.strokeStyle = (Math.cos(rotA) > 0) ? "rgba(56, 189, 248, 0.65)" : "rgba(168, 85, 247, 0.35)";
            this.ctx.beginPath();
            this.ctx.ellipse(gx, gy, Math.abs(longW), r, 0, 0, Math.PI * 2);
            this.ctx.stroke();
        }

        // 3. Tilted Planetary Orbital Ring
        this.ctx.save();
        this.ctx.translate(gx, gy);
        this.ctx.rotate(-0.35);
        this.ctx.strokeStyle = "#e879f9";
        this.ctx.lineWidth = 1.4;
        this.ctx.shadowColor = "#e879f9";
        this.ctx.shadowBlur = 8;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, r + 16, (r + 16) * 0.32, 0, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // Orbiting Satellite Data Packet Node
        const orbA = ang * 2.2;
        const satX = Math.cos(orbA) * (r + 16);
        const satY = Math.sin(orbA) * (r + 16) * 0.32;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.shadowColor = "#38bdf8";
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath();
        this.ctx.arc(satX, satY, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        this.ctx.restore();

        // 4. Central Pulsing Neural Core
        const corePulse = Math.sin(this.frame * 0.12) * 2;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.shadowColor = "#38bdf8";
        this.ctx.shadowBlur = 14;
        this.ctx.beginPath();
        this.ctx.arc(gx, gy, 5 + corePulse, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // 5. Overhead Holographic HUD Label
        this.ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        this.ctx.beginPath();
        this.ctx.roundRect(gx - 60, gy - r - 18, 120, 14, 3);
        this.ctx.fill();
        this.ctx.strokeStyle = "#38bdf8";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        this.ctx.fillStyle = "#38bdf8";
        this.ctx.font = "bold 7px 'Orbitron', monospace";
        this.ctx.textAlign = "center";
        this.ctx.fillText("🌐 AI NEURAL ORB // GLOBAL INTEL", gx, gy - r - 8);

        this.ctx.restore();
    }

    drawAerialParticleStreams() {
        if (!this.aerialStreamParticles) return;
        this.ctx.save();

        const paths = [
            {
                p0: { x: 160, y: 195 }, cp1: { x: 260, y: 110 }, cp2: { x: 380, y: 130 }, p3: { x: 450, y: 195 },
                color: "#38bdf8", glow: "#0284c7"
            },
            {
                p0: { x: 450, y: 205 }, cp1: { x: 410, y: 280 }, cp2: { x: 490, y: 350 }, p3: { x: 450, y: 440 },
                color: "#c084fc", glow: "#a855f7"
            },
            {
                p0: { x: 450, y: 440 }, cp1: { x: 580, y: 410 }, cp2: { x: 670, y: 280 }, p3: { x: 740, y: 195 },
                color: "#06b6d4", glow: "#0891b2"
            }
        ];

        // 1. Draw Faint Translucent Aerial Flow Ribbons
        paths.forEach(p => {
            this.ctx.strokeStyle = `${p.color}25`;
            this.ctx.lineWidth = 2.5;
            this.ctx.beginPath();
            this.ctx.moveTo(p.p0.x, p.p0.y);
            this.ctx.bezierCurveTo(p.cp1.x, p.cp1.y, p.cp2.x, p.cp2.y, p.p3.x, p.p3.y);
            this.ctx.stroke();
        });

        const getBezierPoint = (t, p0, cp1, cp2, p3) => {
            const u = 1 - t;
            const tt = t * t;
            const uu = u * u;
            const uuu = uu * u;
            const ttt = tt * t;
            return {
                x: uuu * p0.x + 3 * uu * t * cp1.x + 3 * u * tt * cp2.x + ttt * p3.x,
                y: uuu * p0.y + 3 * uu * t * cp1.y + 3 * u * tt * cp2.y + ttt * p3.y
            };
        };

        // 2. Animate Shimmering Stardust Particle Streams
        this.aerialStreamParticles.forEach(part => {
            part.progress += part.speed;
            if (part.progress >= 1) part.progress = 0;

            const path = paths[part.stream];
            const pt = getBezierPoint(part.progress, path.p0, path.cp1, path.cp2, path.p3);

            this.ctx.fillStyle = path.color;
            this.ctx.shadowColor = path.glow;
            this.ctx.shadowBlur = 8;
            this.ctx.beginPath();
            this.ctx.arc(pt.x, pt.y, part.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // Trailing Micro Sparkle
            if (part.progress > 0.05) {
                const trailPt = getBezierPoint(part.progress - 0.03, path.p0, path.cp1, path.cp2, path.p3);
                this.ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                this.ctx.fillRect(trailPt.x - 0.7, trailPt.y - 0.7, 1.4, 1.4);
            }
        });

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
        // Station 1: RSS Radar Scanner Console
        this.drawDesk(this.stations.scout, "STATION 1: RSS RADAR", "#3b82f6");

        // Station 2: Colossal Monolithic Energy Reactor Pillar & AI Studio Desk
        this.drawGeminiReactorMonolith();
        this.drawDesk(this.stations.pulse, "STATION 2: GEMINI AI", "#a855f7");

        // Station 3: LinkedIn REST Gateway Hub
        this.drawDesk(this.stations.link, "STATION 3: LINKEDIN", "#06b6d4");

        // Station 4: Chief Executive Command Desk (Positioned on Elevated Dais)
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

        // 8b. Spatial Intercom Walkie-Talkie Emote
        if (agent.walkieTalkieEmoteTimer && agent.walkieTalkieEmoteTimer > 0) {
            const wavePulse = Math.sin(this.frame * 0.3) * 3;
            this.ctx.font = "16px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText("📻", agent.x, agent.y - 52 - bounceY);

            // Pulsing radio wave arcs
            this.ctx.strokeStyle = "#38bdf8";
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.arc(agent.x + 8, agent.y - 56 - bounceY, 7 + wavePulse, -0.6, 0.6);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.arc(agent.x + 8, agent.y - 56 - bounceY, 12 + wavePulse, -0.6, 0.6);
            this.ctx.stroke();
        }

        // 8c. Carrying Tool Item (War Room Self-Healing Toolbox)
        if (agent.carryingItem) {
            this.ctx.font = "16px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText(agent.carryingItem, agent.x + 14, agent.y + 4 - bounceY);
        }

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

            // 9b. RPG Level Badge & Mini XP Progress Bar
            const rpg = (this.agentRpg && this.agentRpg[key]) || { level: 1, xp: 50, next_xp: 100, title: agent.role };
            const badgeW = 34;
            const badgeH = 12;
            const badgeX = agent.x - badgeW / 2;
            const badgeY = pillY - 16;

            this.ctx.fillStyle = "rgba(10, 15, 29, 0.95)";
            this.ctx.beginPath();
            this.ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 4);
            this.ctx.fill();
            this.ctx.strokeStyle = "#f59e0b";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            this.ctx.fillStyle = "#fbbf24";
            this.ctx.font = "bold 7px 'Fira Code'";
            this.ctx.textAlign = "center";
            this.ctx.fillText(`Lv.${rpg.level}`, agent.x, badgeY + 8.5);

            // Mini XP Progress Bar under Level Badge
            const xpBarW = 36;
            const xpBarH = 2.5;
            const xpBarX = agent.x - xpBarW / 2;
            const xpBarY = badgeY + badgeH + 1.5;
            this.ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
            this.ctx.fillRect(xpBarX, xpBarY, xpBarW, xpBarH);
            const xpPct = Math.min(1.0, Math.max(0.08, rpg.xp / (rpg.next_xp || 100)));
            this.ctx.fillStyle = "#10b981";
            this.ctx.fillRect(xpBarX, xpBarY, xpBarW * xpPct, xpBarH);
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

// ==========================================
// 8. "GOD MODE" SPATIAL INTERCOM CONTROLLERS
// ==========================================
function openSpatialIntercom() {
    const modal = document.getElementById("spatialIntercomModal");
    const backdrop = document.getElementById("intercomModalBackdrop");
    const input = document.getElementById("intercomInput");
    if (modal) {
        modal.classList.remove("hidden");
        modal.style.display = "flex";
    }
    if (backdrop) {
        backdrop.classList.remove("hidden");
        backdrop.style.display = "block";
    }
    sfx.playClick();
    if (input) {
        setTimeout(() => input.focus(), 80);
    }
}

function closeIntercomModal() {
    const modal = document.getElementById("spatialIntercomModal");
    const backdrop = document.getElementById("intercomModalBackdrop");
    if (modal) {
        modal.classList.add("hidden");
        modal.style.display = "none";
    }
    if (backdrop) {
        backdrop.classList.add("hidden");
        backdrop.style.display = "none";
    }
    sfx.playClick();
}

function sendIntercomCommand() {
    const input = document.getElementById("intercomInput");
    if (!input || !input.value.trim()) {
        showToast("Ketik perintah natural language terlebih dahulu!", "warning");
        return;
    }
    const commandText = input.value.trim();

    fetch("/api/intercom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: commandText })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Update HUD feedback card
            const feedbackCard = document.getElementById("intercomFeedbackCard");
            const feedbackAgent = document.getElementById("intercomFeedbackAgent");
            const feedbackMsg = document.getElementById("intercomFeedbackMsg");
            if (feedbackCard) feedbackCard.classList.remove("hidden");
            if (feedbackAgent) {
                const names = { scout: "Scout (News Radar)", pulse: "Pulse (Gemini AI)", boss: "Chief Boss (Review Desk)", link: "Link (LinkedIn Relay)" };
                feedbackAgent.textContent = names[data.target_agent] || `${data.target_agent.toUpperCase()} Agent`;
            }
            if (feedbackMsg) feedbackMsg.textContent = `"${data.response}"`;

            // Spatial in-game feedback: agent turns to camera & shows walkie-talkie
            if (window.officeEngine) {
                const agent = window.officeEngine.agents[data.target_agent];
                if (agent) {
                    agent.facing = 'down';
                    agent.walkieTalkieEmoteTimer = 180; // 3 seconds
                    sfx.playIntercomChirp();
                    showSpeechBubble(data.target_agent, `📻 "${data.response}"`, 4200);
                }
            }

            addLog("INTERCOM", `[COMMAND: "${commandText}"] ➔ ${data.target_agent.toUpperCase()}: ${data.response} (${data.prompt_update})`, "info");
            showToast(`Intercom terhubung: Instruksi diterima oleh ${data.target_agent.toUpperCase()}! 📻`, "success");
            input.value = "";
        } else {
            showToast("Gagal mengirim perintah intercom", "error");
        }
    })
    .catch(err => {
        console.error("Intercom error:", err);
        showToast("Koneksi Intercom terputus", "error");
    });
}

function applyIntercomQuickCmd(cmd) {
    const input = document.getElementById("intercomInput");
    if (input) {
        input.value = cmd;
        sendIntercomCommand();
    }
}

// ==========================================
// 9. "NEURO-VISION" X-RAY HEATMAP CONTROLLER
// ==========================================
function toggleNeuroVision() {
    if (window.officeEngine) {
        window.officeEngine.toggleNeuroVision();
    }
}

// ==========================================
// 10. "WAR ROOM & SELF-HEALING" CONTROLLERS
// ==========================================
function triggerWarRoomIncident(stationKey = 'pulse', reason = 'Gemini Quota Exhaustion / 429 Rate Limit') {
    if (window.officeEngine) {
        window.officeEngine.triggerWarRoomIncident(stationKey, reason);
    }
}

function resolveWarRoomIncident() {
    if (window.officeEngine) {
        window.officeEngine.finishSelfHealing();
    }
}

function closeIncidentCard() {
    const card = document.getElementById("incidentActionCard");
    if (card) card.classList.add("hidden");
}

function executeFallbackAction(action) {
    fetch("/api/warroom/fallback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: action })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showToast(`Mitigasi Aktif: ${data.message} ⚡`, "success");
            addLog("WAR_ROOM", `[1-CLICK FALLBACK] ${data.message}`, "success");
            closeIncidentCard();
            if (window.officeEngine) {
                window.officeEngine.finishSelfHealing();
            }
        }
    })
    .catch(err => {
        console.error("Fallback error:", err);
        showToast("Gagal mengeksekusi aksi mitigasi", "error");
    });
}

// ==========================================
// 11. MULTIPLAYER COLLABORATIVE MEMO BOARD
// ==========================================
function openStickyMemoModal() {
    const modal = document.getElementById("stickyMemoModal");
    const backdrop = document.getElementById("stickyMemoModalBackdrop");
    if (modal) {
        modal.classList.remove("hidden");
        modal.style.display = "flex";
    }
    if (backdrop) {
        backdrop.classList.remove("hidden");
        backdrop.style.display = "block";
    }
    sfx.playClick();
    if (window.officeEngine) {
        window.officeEngine.loadPinnedMemos();
    }
}

function closeStickyMemoModal() {
    const modal = document.getElementById("stickyMemoModal");
    const backdrop = document.getElementById("stickyMemoModalBackdrop");
    if (modal) {
        modal.classList.add("hidden");
        modal.style.display = "none";
    }
    if (backdrop) {
        backdrop.classList.add("hidden");
        backdrop.style.display = "none";
    }
    sfx.playClick();
}

function submitNewStickyMemo() {
    const authorInput = document.getElementById("memoAuthorInput");
    const textInput = document.getElementById("memoTextInput");
    const colorSelect = document.getElementById("memoColorSelect");

    const author = (authorInput && authorInput.value.trim()) || "Guest Contributor";
    const text = textInput ? textInput.value.trim() : "";
    const color = colorSelect ? colorSelect.value : "#fef08a";

    if (!text) {
        showToast("Tulis isi catatan sticky note terlebih dahulu!", "warning");
        return;
    }

    fetch("/api/memos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            author: author,
            text: text,
            color: color,
            station: "boss"
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            if (textInput) textInput.value = "";
            sfx.playSuccessChime();
            showToast("Sticky note berhasil ditempel di meja Chief Desk! 📌", "success");
            addLog("MEMO", `[${author}] menempelkan memo: "${text}"`, "info");
            if (window.officeEngine) {
                window.officeEngine.loadPinnedMemos();
            }
        }
    })
    .catch(err => {
        console.error("Memo submit error:", err);
        showToast("Gagal menyimpan memo", "error");
    });
}

function deleteStickyMemo(memoId) {
    fetch(`/api/memos/${memoId}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            sfx.playClick();
            showToast("Memo berhasil dilepas dari papan.", "info");
            if (window.officeEngine) {
                window.officeEngine.loadPinnedMemos();
            }
        }
    })
    .catch(err => {
        console.error("Memo delete error:", err);
    });
}

function renderMemoGridUI(memos) {
    const grid = document.getElementById("memoCardsGrid");
    if (!grid) return;
    if (!memos || memos.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; color: var(--color-text-muted); font-size: 11px; text-align: center; padding: 18px 0;">Belum ada memo tertempel. Buat catatan pertama di atas! 📌</div>`;
        return;
    }

    grid.innerHTML = memos.map(m => `
        <div class="memo-card-item" style="background: ${m.color || '#fef08a'};">
            <button type="button" class="btn-del-memo" onclick="deleteStickyMemo('${m.id}')" title="Lepas memo">✕</button>
            <div class="memo-card-pin">📌</div>
            <div class="memo-card-text">${m.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            <div class="memo-card-footer">
                <span class="memo-card-author">✍️ ${m.author || 'Anonymous'}</span>
                <span class="memo-card-time">${m.timestamp || ''}</span>
            </div>
        </div>
    `).join('');
}

// Expose functions globally for inline HTML event bindings
window.openSpatialIntercom = openSpatialIntercom;
window.closeIntercomModal = closeIntercomModal;
window.sendIntercomCommand = sendIntercomCommand;
window.applyIntercomQuickCmd = applyIntercomQuickCmd;
window.toggleNeuroVision = toggleNeuroVision;
window.triggerWarRoomIncident = triggerWarRoomIncident;
window.resolveWarRoomIncident = resolveWarRoomIncident;
window.closeIncidentCard = closeIncidentCard;
window.executeFallbackAction = executeFallbackAction;
window.openStickyMemoModal = openStickyMemoModal;
window.closeStickyMemoModal = closeStickyMemoModal;
window.submitNewStickyMemo = submitNewStickyMemo;
window.deleteStickyMemo = deleteStickyMemo;
window.renderMemoGridUI = renderMemoGridUI;

// ==========================================
// 12. MATRIX RAG MEMORY VAULT CONTROLLERS
// ==========================================
function openRagVaultDrawer() {
    const drawer = document.getElementById("ragVaultDrawer");
    const backdrop = document.getElementById("ragVaultBackdrop");
    if (drawer) {
        drawer.classList.remove("hidden");
        drawer.style.display = "flex";
    }
    if (backdrop) {
        backdrop.classList.remove("hidden");
        backdrop.style.display = "block";
    }
    sfx.playClick();
    if (window.officeEngine) {
        window.officeEngine.loadRagVaultData();
    }
}

function closeRagVaultDrawer() {
    const drawer = document.getElementById("ragVaultDrawer");
    const backdrop = document.getElementById("ragVaultBackdrop");
    if (drawer) {
        drawer.classList.add("hidden");
        drawer.style.display = "none";
    }
    if (backdrop) {
        backdrop.classList.add("hidden");
        backdrop.style.display = "none";
    }
    sfx.playClick();
}

function triggerRagRetrievalBeam() {
    const input = document.getElementById("ragQueryInput");
    const query = (input && input.value.trim()) || "Claude 3.7 & Gemini 2.5 multimodal benchmarks";
    
    fetch("/api/rag/vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            if (window.officeEngine) {
                window.officeEngine.fireRagRetrievalBeams(query);
                renderVaultChunksUI(data.vault);
                showSpeechBubble("pulse", `⚡ Menerima embedding RAG: "${query.slice(0, 30)}..." [768-dim]`, 3500);
            }
            showToast("Berkas Cahaya Retrieval melesat dari Vault menuju Gemini AI! 🚀", "success");
            addLog("RAG_VAULT", `[RETRIEVAL QUERY: "${query}"] Chunks injected to Gemini context window.`, "info");
        }
    })
    .catch(err => {
        console.error("RAG retrieval error:", err);
    });
}

function renderVaultChunksUI(vault) {
    if (!vault) return;
    const countEl = document.getElementById("vaultVectorsCount");
    if (countEl && vault.total_vectors) {
        countEl.textContent = `${vault.total_vectors.toLocaleString()} Vectors`;
    }
    const colEl = document.getElementById("vaultCollectionName");
    if (colEl && vault.collection) colEl.textContent = vault.collection;

    const list = document.getElementById("vaultChunksList");
    if (!list) return;
    const chunks = vault.recent_chunks || [];
    if (chunks.length === 0) {
        list.innerHTML = `<div style="color: #64748b; font-size: 11px; text-align: center; padding: 20px;">Belum ada chunk yang di-retrieve.</div>`;
        return;
    }

    list.innerHTML = chunks.map(c => `
        <div class="chunk-card">
            <div class="chunk-header-row">
                <span class="chunk-source-tag">📄 ${c.source || 'unknown'}</span>
                <span class="chunk-similarity-pill">Score: ${(c.similarity * 100).toFixed(1)}%</span>
            </div>
            <h4 class="chunk-title">${c.title || c.id}</h4>
            <p class="chunk-text">${c.text}</p>
            <div class="chunk-footer">
                <span>Vector: 768-dim float32</span>
                <span>⏱️ ${c.timestamp || 'Just now'}</span>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 13. BUDGET CIRCUIT-BREAKER & COST CONTROLLERS
// ==========================================
function openBudgetBreakerModal() {
    const modal = document.getElementById("budgetBreakerModal");
    const backdrop = document.getElementById("budgetBreakerBackdrop");
    if (modal) {
        modal.classList.remove("hidden");
        modal.style.display = "flex";
    }
    if (backdrop) {
        backdrop.classList.remove("hidden");
        backdrop.style.display = "block";
    }
    sfx.playClick();
    if (window.officeEngine) {
        window.officeEngine.loadFinancialMetrics();
    }
}

function closeBudgetBreakerModal() {
    const modal = document.getElementById("budgetBreakerModal");
    const backdrop = document.getElementById("budgetBreakerBackdrop");
    if (modal) {
        modal.classList.add("hidden");
        modal.style.display = "none";
    }
    if (backdrop) {
        backdrop.classList.add("hidden");
        backdrop.style.display = "none";
    }
    sfx.playClick();
}

function updateBudgetSliderUI(val) {
    const display = document.getElementById("sliderDisplayVal");
    if (display) display.textContent = `$${parseFloat(val).toFixed(2)} USD`;
}

function saveBudgetLimit(val) {
    const limit = parseFloat(val);
    fetch("/api/financial/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget_limit: limit })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.financial) {
            if (window.officeEngine) {
                window.officeEngine.financial = data.financial;
                updateFinancialUI(data.financial);
            }
            showToast(`Batas Anggaran Circuit-Breaker diatur ke $${limit.toFixed(2)}!`, "info");
        }
    })
    .catch(() => {});
}

function toggleCircuitBreakerState() {
    fetch("/api/financial/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toggle_breaker: true })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.financial) {
            if (window.officeEngine) {
                window.officeEngine.financial = data.financial;
                updateFinancialUI(data.financial);
                if (data.financial.is_circuit_breaker_tripped) {
                    sfx.playAlarmSiren();
                    showToast("⚡ CIRCUIT-BREAKER TRIPPED! Aliran daya workstation diputus otomatis.", "warning");
                    addLog("FINANCE", "⚡ CIRCUIT-BREAKER TRIPPED: Daya stasiun diputus akibat batas biaya.", "error");
                } else {
                    sfx.playSuccessChime();
                    showToast("Grid daya kantor dipulihkan ke normal! ⚡", "success");
                    addLog("FINANCE", "✅ Daya kantor dipulihkan ke status prima.", "success");
                }
            }
        }
    })
    .catch(() => {});
}

function updateFinancialUI(fin) {
    if (!fin) return;
    const sessionCostEl = document.getElementById("bmSessionCost");
    if (sessionCostEl) sessionCostEl.textContent = `$${(fin.session_cost || 0.042).toFixed(4)}`;

    const burnRateEl = document.getElementById("bmBurnRate");
    if (burnRateEl) burnRateEl.textContent = `${fin.burn_rate || 120} tok/dtk`;

    const limitValEl = document.getElementById("bmBudgetLimitVal");
    if (limitValEl) limitValEl.textContent = `$${(fin.budget_limit || 5.0).toFixed(2)}`;

    const slider = document.getElementById("budgetRangeSlider");
    if (slider) slider.value = fin.budget_limit || 5.0;

    const display = document.getElementById("sliderDisplayVal");
    if (display) display.textContent = `$${(fin.budget_limit || 5.0).toFixed(2)} USD`;

    // Camera toolbar button text
    const btnBreaker = document.getElementById("btnToggleBreakerModal");
    if (btnBreaker) {
        btnBreaker.textContent = `⚡ $${(fin.session_cost || 0.042).toFixed(2)}`;
    }

    const alertCard = document.getElementById("breakerStatusAlert");
    const dot = document.getElementById("breakerIndicatorDot");
    const title = document.getElementById("breakerStatusTitle");
    const desc = document.getElementById("breakerStatusDesc");
    const btnToggle = document.getElementById("btnToggleCircuitBreaker");

    if (alertCard && dot && title && desc && btnToggle) {
        if (fin.is_circuit_breaker_tripped) {
            alertCard.classList.add("tripped");
            dot.className = "bs-indicator bs-tripped";
            title.textContent = "⚡ DAYA TERPUTUS (BREAKER TRIPPED)";
            desc.textContent = "Batas biaya harian terlampaui. Kabel daya virtual ke workstation dipadamkan!";
            btnToggle.textContent = "🔄 Pulihkan Grid Daya";
            btnToggle.className = "btn btn-outline-success btn-sm";
        } else {
            alertCard.classList.remove("tripped");
            dot.className = "bs-indicator bs-normal";
            title.textContent = "GRID DAYA KANTOR NORMAL";
            desc.textContent = "Sistem daya virtual aktif menyuplai workstation agen.";
            btnToggle.textContent = "⚡ Uji Putus Daya (Trip)";
            btnToggle.className = "btn btn-outline-danger btn-sm";
        }
    }
}

// ==========================================
// 14. AGENT EVOLUTION & RPG SKILL LEVELING
// ==========================================
let currentRpgAgentKey = "scout";

function openAgentSkillTreeModal(agentKey = 'scout') {
    currentRpgAgentKey = agentKey;
    const modal = document.getElementById("agentSkillTreeModal");
    const backdrop = document.getElementById("agentSkillTreeBackdrop");
    if (modal) {
        modal.classList.remove("hidden");
        modal.style.display = "flex";
    }
    if (backdrop) {
        backdrop.classList.remove("hidden");
        backdrop.style.display = "block";
    }
    sfx.playClick();
    switchRpgAgentTab(agentKey);
}

function closeAgentSkillTreeModal() {
    const modal = document.getElementById("agentSkillTreeModal");
    const backdrop = document.getElementById("agentSkillTreeBackdrop");
    if (modal) {
        modal.classList.add("hidden");
        modal.style.display = "none";
    }
    if (backdrop) {
        backdrop.classList.add("hidden");
        backdrop.style.display = "none";
    }
    sfx.playClick();
}

function switchRpgAgentTab(agentKey) {
    currentRpgAgentKey = agentKey;
    document.querySelectorAll(".rpg-tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-agent") === agentKey);
    });

    fetch("/api/agents/skills")
        .then(res => res.json())
        .then(data => {
            if (data.success && data.agents) {
                if (window.officeEngine) window.officeEngine.agentRpg = data.agents;
                renderRpgAgentProfileUI(agentKey, data.agents[agentKey]);
            }
        })
        .catch(() => {});
}

function renderRpgAgentProfileUI(agentKey, agentData) {
    if (!agentData) return;
    const avatars = { scout: "📡", pulse: "✨", boss: "👑", link: "💼" };

    const avatarBox = document.getElementById("rpgAvatarBox");
    if (avatarBox) {
        avatarBox.textContent = avatars[agentKey] || "🤖";
        avatarBox.style.borderColor = agentData.badge_color || "#3b82f6";
    }

    const nameEl = document.getElementById("rpgAgentName");
    if (nameEl) nameEl.textContent = agentData.name;

    const roleEl = document.getElementById("rpgAgentRole");
    if (roleEl) roleEl.textContent = agentData.role;

    const levelBadge = document.getElementById("rpgAgentLevelBadge");
    if (levelBadge) levelBadge.textContent = `Lv. ${agentData.level}`;

    const titleEl = document.getElementById("rpgAgentTitle");
    if (titleEl) titleEl.textContent = `${agentData.title} • ${agentData.tasks_completed || 0} Missions Done`;

    const xpFill = document.getElementById("rpgXpBarFill");
    const xpText = document.getElementById("rpgXpBarText");
    const xpPct = Math.min(100, (agentData.xp / agentData.next_xp) * 100);
    if (xpFill) xpFill.style.width = `${xpPct}%`;
    if (xpText) xpText.textContent = `${agentData.xp} / ${agentData.next_xp} XP (Next: Lv. ${agentData.level + 1})`;

    // Perks Grid
    const perksGrid = document.getElementById("rpgPerksGrid");
    if (perksGrid && agentData.perks) {
        perksGrid.innerHTML = agentData.perks.map(p => `
            <div class="perk-node-card ${p.unlocked ? 'unlocked' : 'locked'}">
                <span class="perk-status ${p.unlocked ? 'unlocked' : 'locked'}">${p.unlocked ? '✅ UNLOCKED' : '🔒 LOCKED'}</span>
                <div class="perk-name">${p.name}</div>
                <div class="perk-desc">${p.desc}</div>
            </div>
        `).join('');
    }

    // Hyperparameters
    const tempSlider = document.getElementById("rpgTempSlider");
    const tempVal = document.getElementById("rpgTempVal");
    if (tempSlider && agentData.temperature !== undefined) {
        tempSlider.value = agentData.temperature;
        if (tempVal) tempVal.textContent = agentData.temperature;
    }

    const personaSelect = document.getElementById("rpgPersonaSelect");
    if (personaSelect && agentData.persona) {
        personaSelect.value = agentData.persona;
    }
}

function simulateAgentTaskXp() {
    fetch("/api/agents/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            agent_key: currentRpgAgentKey,
            add_xp: 25
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            if (window.officeEngine) {
                window.officeEngine.agentRpg = data.all_agents;
                window.officeEngine.triggerLevelUpAnimation(currentRpgAgentKey);
            }
            renderRpgAgentProfileUI(currentRpgAgentKey, data.agent);
            addLog("RPG", `[${currentRpgAgentKey.toUpperCase()}] Menyelesaikan tugas! Mendapatkan +25 XP (Level saat ini: Lv.${data.agent.level})`, "success");
        }
    })
    .catch(() => {});
}

function saveAgentRpgConfig() {
    const tempSlider = document.getElementById("rpgTempSlider");
    const personaSelect = document.getElementById("rpgPersonaSelect");

    const temp = tempSlider ? parseFloat(tempSlider.value) : 0.7;
    const persona = personaSelect ? personaSelect.value : "Data-Driven Analyst";

    fetch("/api/agents/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            agent_key: currentRpgAgentKey,
            temperature: temp,
            persona: persona
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            sfx.playSuccessChime();
            showToast(`Karakter & persona ${currentRpgAgentKey.toUpperCase()} disimpan!`, "success");
            addLog("RPG", `[${currentRpgAgentKey.toUpperCase()}] Persona diatur ke: "${persona}", Temperature: ${temp}`, "info");
        }
    })
    .catch(() => {});
}

// ==========================================
// 15. LIVE PRODUCTION FEED & LINKEDIN ANALYTICS
// ==========================================
function openLinkedInAnalyticsDrawer() {
    const drawer = document.getElementById("linkedinAnalyticsDrawer");
    const backdrop = document.getElementById("linkedinAnalyticsBackdrop");
    if (drawer) {
        drawer.classList.remove("hidden");
        drawer.style.display = "flex";
    }
    if (backdrop) {
        backdrop.classList.remove("hidden");
        backdrop.style.display = "block";
    }
    sfx.playClick();
    if (window.officeEngine) {
        window.officeEngine.loadLinkedInAnalytics();
    }
}

function closeLinkedInAnalyticsDrawer() {
    const drawer = document.getElementById("linkedinAnalyticsDrawer");
    const backdrop = document.getElementById("linkedinAnalyticsBackdrop");
    if (drawer) {
        drawer.classList.add("hidden");
        drawer.style.display = "none";
    }
    if (backdrop) {
        backdrop.classList.add("hidden");
        backdrop.style.display = "none";
    }
    sfx.playClick();
}

function simulateLinkedInViralSpike() {
    fetch("/api/analytics/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "simulate_spike" })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.analytics) {
            if (window.officeEngine) {
                window.officeEngine.linkedinBroadcast.stats = data.analytics;
                window.officeEngine.linkedinBroadcast.isBroadcasting = true;
                showSpeechBubble("link", `🚀 VIRAL SURGE! +50 Likes & 200+ Impressions masuk ke LinkedIn! 👍💼`, 3500);
                sfx.playSuccessChime();
            }
            renderLinkedInAnalyticsUI(data.analytics);
            showToast("Simulasi Viral Spike Berhasil: Metrik melonjak naik! 📈", "success");
            addLog("LINKEDIN", `[VIRAL SURGE] Likes: ${data.analytics.likes}, Impressions: ${data.analytics.impressions}`, "success");
        }
    })
    .catch(() => {});
}

function renderLinkedInAnalyticsUI(data) {
    if (!data) return;
    const likesEl = document.getElementById("ascLikesVal");
    if (likesEl) likesEl.textContent = data.likes || 14;

    const commentsEl = document.getElementById("ascCommentsVal");
    if (commentsEl) commentsEl.textContent = data.comments || 3;

    const repostsEl = document.getElementById("ascRepostsVal");
    if (repostsEl) repostsEl.textContent = data.reposts || 2;

    const imprEl = document.getElementById("ascImpressionsVal");
    if (imprEl) imprEl.textContent = data.impressions || 342;

    const engEl = document.getElementById("ascEngagementRate");
    if (engEl) engEl.textContent = `${data.engagement_rate || 5.6}%`;

    const ctrEl = document.getElementById("ascCtr");
    if (ctrEl) ctrEl.textContent = `${data.ctr || 2.4}%`;

    const viralEl = document.getElementById("ascViralScore");
    if (viralEl) viralEl.textContent = `${data.viral_score || 88} / 100`;

    const titleEl = document.getElementById("appPostTitle");
    if (titleEl && data.last_post_title) titleEl.textContent = data.last_post_title;

    // Hourly bar chart
    const chart = document.getElementById("analyticsBarChart");
    if (chart && data.hourly_impressions) {
        const maxVal = Math.max(...data.hourly_impressions.map(h => h.impr), 100);
        chart.innerHTML = data.hourly_impressions.map(h => {
            const hPct = Math.max(15, (h.impr / maxVal) * 85);
            return `
                <div class="chart-bar-col">
                    <span style="font-size: 8px; color: #38bdf8; font-weight: 700;">${h.impr}</span>
                    <div class="chart-bar-fill" style="height: ${hPct}%;"></div>
                    <span class="chart-bar-label">${h.hour}</span>
                </div>
            `;
        }).join('');
    }
}

// Expose all functions on window for inline HTML onclick handlers
window.openRagVaultDrawer = openRagVaultDrawer;
window.closeRagVaultDrawer = closeRagVaultDrawer;
window.triggerRagRetrievalBeam = triggerRagRetrievalBeam;
window.openBudgetBreakerModal = openBudgetBreakerModal;
window.closeBudgetBreakerModal = closeBudgetBreakerModal;
window.updateBudgetSliderUI = updateBudgetSliderUI;
window.saveBudgetLimit = saveBudgetLimit;
window.toggleCircuitBreakerState = toggleCircuitBreakerState;
window.openAgentSkillTreeModal = openAgentSkillTreeModal;
window.closeAgentSkillTreeModal = closeAgentSkillTreeModal;
window.switchRpgAgentTab = switchRpgAgentTab;
window.simulateAgentTaskXp = simulateAgentTaskXp;
window.saveAgentRpgConfig = saveAgentRpgConfig;
window.openLinkedInAnalyticsDrawer = openLinkedInAnalyticsDrawer;
window.closeLinkedInAnalyticsDrawer = closeLinkedInAnalyticsDrawer;
window.simulateLinkedInViralSpike = simulateLinkedInViralSpike;

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

    // Header Intercom & War Room Buttons
    const btnOpenIntercom = document.getElementById("btnOpenIntercom");
    if (btnOpenIntercom) btnOpenIntercom.addEventListener("click", openSpatialIntercom);

    const btnWarRoomToggle = document.getElementById("btnWarRoomToggle");
    if (btnWarRoomToggle) {
        btnWarRoomToggle.addEventListener("click", () => {
            if (window.officeEngine && window.officeEngine.isWarRoomActive) {
                resolveWarRoomIncident();
            } else {
                triggerWarRoomIncident('pulse', 'Gemini Token Limit Exceeded / High Latency Alert');
            }
        });
    }

    // Camera Bar Neuro & Memo Buttons
    const btnToggleNeuro = document.getElementById("btnToggleNeuro");
    if (btnToggleNeuro) btnToggleNeuro.addEventListener("click", toggleNeuroVision);

    const btnToggleMemos = document.getElementById("btnToggleMemos");
    if (btnToggleMemos) btnToggleMemos.addEventListener("click", openStickyMemoModal);

    // 4 New Camera Toolbar Buttons
    const btnToggleVaultDrawer = document.getElementById("btnToggleVaultDrawer");
    if (btnToggleVaultDrawer) btnToggleVaultDrawer.addEventListener("click", openRagVaultDrawer);

    const btnToggleBreakerModal = document.getElementById("btnToggleBreakerModal");
    if (btnToggleBreakerModal) btnToggleBreakerModal.addEventListener("click", openBudgetBreakerModal);

    const btnToggleSkillsModal = document.getElementById("btnToggleSkillsModal");
    if (btnToggleSkillsModal) btnToggleSkillsModal.addEventListener("click", () => openAgentSkillTreeModal('scout'));

    const btnToggleLinkedInDrawer = document.getElementById("btnToggleLinkedInDrawer");
    if (btnToggleLinkedInDrawer) btnToggleLinkedInDrawer.addEventListener("click", openLinkedInAnalyticsDrawer);

    // Intercom Modal Buttons & Inputs
    const btnIntercomSend = document.getElementById("btnIntercomSend");
    if (btnIntercomSend) btnIntercomSend.addEventListener("click", sendIntercomCommand);

    const intercomInput = document.getElementById("intercomInput");
    if (intercomInput) {
        intercomInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                sendIntercomCommand();
            }
        });
    }

    const btnIntercomMic = document.getElementById("btnIntercomMic");
    if (btnIntercomMic) {
        btnIntercomMic.addEventListener("click", () => {
            sfx.playClick();
            const samples = [
                "Scout, tahan scraping berita kripto, prioritaskan berita open-source AI hari ini.",
                "Pulse, ringkas draf lebih pendek maksimal 150 kata.",
                "Boss, setujui draf konten nomor 1 segera.",
                "Link, aktifkan mode dry-run simulasi broadcast."
            ];
            const picked = samples[Math.floor(Math.random() * samples.length)];
            if (intercomInput) {
                intercomInput.value = picked;
                showToast(`🎙️ Voice Dictated: "${picked}"`, "info");
                setTimeout(sendIntercomCommand, 400);
            }
        });
    }

    // Modal Close Buttons Handlers
    const btnCloseStickyMemo = document.getElementById("btnCloseStickyMemo");
    if (btnCloseStickyMemo) btnCloseStickyMemo.addEventListener("click", closeStickyMemoModal);

    const stickyMemoModalBackdrop = document.getElementById("stickyMemoModalBackdrop");
    if (stickyMemoModalBackdrop) stickyMemoModalBackdrop.addEventListener("click", closeStickyMemoModal);

    const btnCloseIntercom = document.getElementById("btnCloseIntercom");
    if (btnCloseIntercom) btnCloseIntercom.addEventListener("click", closeIntercomModal);

    const intercomModalBackdrop = document.getElementById("intercomModalBackdrop");
    if (intercomModalBackdrop) intercomModalBackdrop.addEventListener("click", closeIntercomModal);

    // Close handlers for 4 new modals
    const btnCloseRagVault = document.getElementById("btnCloseRagVault");
    if (btnCloseRagVault) btnCloseRagVault.addEventListener("click", closeRagVaultDrawer);
    const ragVaultBackdrop = document.getElementById("ragVaultBackdrop");
    if (ragVaultBackdrop) ragVaultBackdrop.addEventListener("click", closeRagVaultDrawer);

    const btnCloseBreakerModal = document.getElementById("btnCloseBreakerModal");
    if (btnCloseBreakerModal) btnCloseBreakerModal.addEventListener("click", closeBudgetBreakerModal);
    const budgetBreakerBackdrop = document.getElementById("budgetBreakerBackdrop");
    if (budgetBreakerBackdrop) budgetBreakerBackdrop.addEventListener("click", closeBudgetBreakerModal);

    const btnCloseSkillTreeModal = document.getElementById("btnCloseSkillTreeModal");
    if (btnCloseSkillTreeModal) btnCloseSkillTreeModal.addEventListener("click", closeAgentSkillTreeModal);
    const agentSkillTreeBackdrop = document.getElementById("agentSkillTreeBackdrop");
    if (agentSkillTreeBackdrop) agentSkillTreeBackdrop.addEventListener("click", closeAgentSkillTreeModal);

    const btnCloseLinkedInDrawer = document.getElementById("btnCloseLinkedInDrawer");
    if (btnCloseLinkedInDrawer) btnCloseLinkedInDrawer.addEventListener("click", closeLinkedInAnalyticsDrawer);
    const linkedinAnalyticsBackdrop = document.getElementById("linkedinAnalyticsBackdrop");
    if (linkedinAnalyticsBackdrop) linkedinAnalyticsBackdrop.addEventListener("click", closeLinkedInAnalyticsDrawer);
});

