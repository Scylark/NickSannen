// ============================================
// Force-Directed Knowledge Graph Engine (D3.js)
// Fixed drag/click separation, structured layout
// ============================================

class GraphEngine {
    constructor(canvasEl, containerEl) {
        this.canvas = canvasEl;
        this.ctx = canvasEl.getContext('2d');
        this.container = containerEl;
        this.nodeData = [];
        this.edgeData = [];
        this.simulation = null;
        this.draggedNode = null;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;

        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
            if (this.simulation) {
                this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
                this.simulation.alpha(0.3).restart();
            }
        });

        // Unified pointer events on the canvas area (parent of container)
        const area = this.container.parentElement;
        area.addEventListener('mousedown', (e) => this.onPointerDown(e));
        window.addEventListener('mousemove', (e) => this.onPointerMove(e));
        window.addEventListener('mouseup', (e) => this.onPointerUp(e));
        area.addEventListener('touchstart', (e) => this.onPointerDown(e), { passive: false });
        window.addEventListener('touchmove', (e) => this.onPointerMove(e), { passive: false });
        window.addEventListener('touchend', (e) => this.onPointerUp(e));
    }

    resize() {
        const parent = this.canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        this.width = parent.clientWidth;
        this.height = parent.clientHeight;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    buildGraph(data) {
        const cx = this.width / 2;
        const cy = this.height / 2;

        this.nodeData = [];

        // Center node — slightly left of true center
        const centerX = cx - 40;
        this.nodeData.push({
            ...data.center,
            x: centerX,
            y: cy,
            radius: 54
        });

        // Category nodes — place at defined angles
        const categories = data.nodes.filter(n => n.type === 'category');
        const catDist = Math.min(this.width, this.height) * 0.26;

        categories.forEach(n => {
            const angle = (n.angle || 0) * Math.PI / 180;
            this.nodeData.push({
                ...n,
                x: centerX + Math.cos(angle) * catDist,
                y: cy + Math.sin(angle) * catDist,
                radius: 36
            });
        });

        // Role nodes — strict vertical stack to the right of experience node
        const roles = data.nodes.filter(n => n.type === 'role').sort((a, b) => (a.order || 0) - (b.order || 0));
        const expNode = this.nodeData.find(n => n.id === 'experience');

        const roleStartX = expNode ? expNode.x + 200 : cx + 240;
        const roleStartY = cy - (roles.length - 1) * 44; // center the stack vertically
        const roleSpacingY = 88; // vertical gap between roles

        roles.forEach((n, i) => {
            // Stagger X slightly for visual interest (alternate offset)
            const xOffset = (i % 2) * 24;
            this.nodeData.push({
                ...n,
                x: roleStartX + xOffset,
                y: roleStartY + i * roleSpacingY,
                radius: 27
            });
        });

        // Edges
        this.edgeData = data.edges.map(e => ({
            source: e.from,
            target: e.to
        }));

        // Force simulation
        this.simulation = d3.forceSimulation(this.nodeData)
            .force('link', d3.forceLink(this.edgeData)
                .id(d => d.id)
                .distance(d => {
                    const src = typeof d.source === 'object' ? d.source : this.nodeData.find(n => n.id === d.source);
                    const tgt = typeof d.target === 'object' ? d.target : this.nodeData.find(n => n.id === d.target);
                    if (src && tgt) {
                        if (src.type === 'center' || tgt.type === 'center') return catDist;
                        if (src.type === 'category' || tgt.type === 'category') return 140;
                    }
                    return 100;
                })
                .strength(d => {
                    const src = typeof d.source === 'object' ? d.source : null;
                    const tgt = typeof d.target === 'object' ? d.target : null;
                    if (src && tgt && (src.type === 'role' || tgt.type === 'role')) return 0.3;
                    return 0.6;
                })
            )
            .force('charge', d3.forceManyBody()
                .strength(d => {
                    if (d.type === 'center') return -600;
                    if (d.type === 'category') return -300;
                    return -120;
                })
            )
            .force('center', d3.forceCenter(cx, cy).strength(0.02))
            .force('collision', d3.forceCollide()
                .radius(d => {
                    if (d.type === 'role') return d.radius + 38;
                    return d.radius + 20;
                })
                .strength(1)
            )
            // Pull experience + roles right, categories left
            .force('x', d3.forceX(d => {
                if (d.type === 'center') return centerX;
                if (d.id === 'experience') return cx + this.width * 0.12;
                if (d.type === 'role') return cx + this.width * 0.28;
                if (d.type === 'category') return cx - this.width * 0.12;
                return cx;
            }).strength(d => {
                if (d.type === 'role') return 0.12;
                if (d.type === 'center') return 0.08;
                return 0.05;
            }))
            // Vertical centering
            .force('y', d3.forceY(d => {
                if (d.type === 'center') return cy;
                return cy;
            }).strength(0.02))
            // Custom force: keep roles in chronological vertical order
            .force('roleOrder', this.roleOrderForce(roles))
            .alphaDecay(0.025)
            .velocityDecay(0.5)
            .on('tick', () => this.tick());

        this.renderNodes();
    }

    // Custom force: strict vertical ordering for roles
    roleOrderForce(rolesConfig) {
        const roleIds = rolesConfig.map(r => r.id);

        return (alpha) => {
            const roleNodes = this.nodeData.filter(n => roleIds.includes(n.id));
            if (roleNodes.length < 2) return;

            const expNode = this.nodeData.find(n => n.id === 'experience');
            if (!expNode) return;

            // Desired vertical span centered on experience node
            const spacing = 84;
            const totalHeight = (roleNodes.length - 1) * spacing;
            const topY = expNode.y - totalHeight / 2;

            // Sort role nodes by their defined order
            roleNodes.sort((a, b) => {
                return roleIds.indexOf(a.id) - roleIds.indexOf(b.id);
            });

            const strength = 0.2 * alpha;

            roleNodes.forEach((node, i) => {
                const targetY = topY + i * spacing;
                node.vy += (targetY - node.y) * strength;

                // Keep roles to the right of experience
                const targetX = expNode.x + 160;
                node.vx += (targetX - node.x) * strength * 0.4;
            });
        };
    }

    renderNodes() {
        this.container.innerHTML = '';

        this.nodeData.forEach(node => {
            const el = document.createElement('div');
            el.className = `node ${node.type}`;
            el.id = 'node-' + node.id;
            el.dataset.id = node.id;

            const shape = document.createElement('div');
            shape.className = 'node-shape';

            if (node.type === 'center') {
                const img = document.createElement('img');
                img.src = 'assets/profile.jpg';
                img.alt = (typeof RESUME_DATA !== 'undefined' && RESUME_DATA.center) ? RESUME_DATA.center.label : 'Profile';
                img.className = 'center-avatar';
                // Prevent native image drag completely
                img.draggable = false;
                img.style.pointerEvents = 'none';
                img.addEventListener('dragstart', (e) => e.preventDefault());
                shape.appendChild(img);
            } else {
                shape.textContent = node.icon;
                if (node.color && node.type === 'role') {
                    shape.style.borderColor = node.color;
                    shape.style.color = node.color;
                }
            }

            const label = document.createElement('div');
            label.className = 'node-label';
            label.textContent = node.label;

            el.appendChild(shape);
            el.appendChild(label);

            // Sublabel for roles (dates)
            if (node.sublabel && node.type === 'role') {
                const sub = document.createElement('div');
                sub.className = 'node-sublabel';
                sub.textContent = node.sublabel;
                el.appendChild(sub);
            }

            // Sublabel for center node
            if (node.type === 'center') {
                const sub = document.createElement('div');
                sub.className = 'node-sublabel';
                sub.textContent = node.sublabel;
                el.appendChild(sub);
            }

            this.container.appendChild(el);
        });
    }

    tick() {
        this.nodeData.forEach(node => {
            const el = document.getElementById('node-' + node.id);
            if (el) {
                el.style.left = node.x + 'px';
                el.style.top = node.y + 'px';
            }
        });
        this.drawEdges();
    }

    drawEdges() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.edgeData.forEach(edge => {
            const src = typeof edge.source === 'object' ? edge.source : null;
            const tgt = typeof edge.target === 'object' ? edge.target : null;
            if (!src || !tgt) return;

            const isRoleEdge = src.type === 'role' || tgt.type === 'role';

            this.ctx.beginPath();
            this.ctx.moveTo(src.x, src.y);
            this.ctx.lineTo(tgt.x, tgt.y);
            this.ctx.strokeStyle = isRoleEdge ? 'rgba(255,159,28,0.35)' : 'rgba(255,90,95,0.40)';
            this.ctx.lineWidth = isRoleEdge ? 1 : 1.6;
            this.ctx.stroke();
        });
    }

    // ---- Pointer interaction (drag only — click handled in app.js) ----

    getNodeAtPoint(clientX, clientY) {
        const rect = this.container.parentElement.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        for (let i = this.nodeData.length - 1; i >= 0; i--) {
            const n = this.nodeData[i];
            const dx = x - n.x;
            const dy = y - n.y;
            if (dx * dx + dy * dy < (n.radius + 15) * (n.radius + 15)) {
                return n;
            }
        }
        return null;
    }

    onPointerDown(e) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const node = this.getNodeAtPoint(clientX, clientY);
        if (node) {
            this.draggedNode = node;
            this.isDragging = false;
            this.dragStartX = clientX;
            this.dragStartY = clientY;
            node.fx = node.x;
            node.fy = node.y;
            this.simulation.alphaTarget(0.3).restart();
            if (e.touches) e.preventDefault();
        }
    }

    onPointerMove(e) {
        if (!this.draggedNode) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const rect = this.container.parentElement.getBoundingClientRect();

        // Detect if we've moved enough to call it a drag
        const dx = Math.abs(clientX - this.dragStartX);
        const dy = Math.abs(clientY - this.dragStartY);
        if (dx > 3 || dy > 3) {
            this.isDragging = true;
        }

        this.draggedNode.fx = clientX - rect.left;
        this.draggedNode.fy = clientY - rect.top;

        if (e.touches) e.preventDefault();
    }

    onPointerUp(e) {
        if (this.draggedNode) {
            this.draggedNode.fx = null;
            this.draggedNode.fy = null;
            this.draggedNode = null;
            this.simulation.alphaTarget(0);
        }
        // isDragging is read by app.js to distinguish click from drag
        // Reset after a short delay so the mouseup/click in app.js can read it
        setTimeout(() => { this.isDragging = false; }, 50);
    }
}
