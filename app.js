// ============================================
// App — Wire everything together
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('graphCanvas');
    const container = document.getElementById('nodesContainer');
    const modalOverlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const dotClose = document.getElementById('dotClose');
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobileToggle');

    // Init graph
    const graph = new GraphEngine(canvas, container);
    graph.buildGraph(RESUME_DATA);

    // ----------------------------------------
    // Node click → open modal (uses graph.isDragging to ignore drags)
    // ----------------------------------------
    container.addEventListener('click', (e) => {
        // If the graph engine detected a drag, ignore this click
        if (graph.isDragging) return;

        const nodeEl = e.target.closest('.node');
        if (nodeEl) {
            const id = nodeEl.dataset.id;
            openModal(id);
        }
    });

    // Touch tap support
    container.addEventListener('touchend', (e) => {
        if (graph.isDragging) return;

        const nodeEl = e.target.closest('.node');
        if (nodeEl) {
            const id = nodeEl.dataset.id;
            openModal(id);
        }
    });

    // ----------------------------------------
    // Sidebar nav click
    // ----------------------------------------
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            openModal(target);

            // Update active state
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Close mobile sidebar
            sidebar.classList.remove('open');
        });
    });

    // Profile / "Watch the film" entry points → open the centre (person) card
    const openProfile = () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        sidebar.classList.remove('open');
        openModal('person');
    };
    const watchBtn = document.getElementById('watchFilmBtn');
    if (watchBtn) watchBtn.addEventListener('click', openProfile);
    const sidebarProfile = document.getElementById('sidebarProfile');
    if (sidebarProfile) {
        sidebarProfile.addEventListener('click', openProfile);
        sidebarProfile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProfile(); }
        });
    }

    // ----------------------------------------
    // Modal management
    // ----------------------------------------
    function openModal(id) {
        const detail = RESUME_DATA.details[id];
        if (!detail) return;

        modalContent.innerHTML = detail.content;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Hide mini-player when opening any modal
        ipod.hideMiniPlayer();

        // Mount iPod player if Listen modal
        if (id === 'listen') {
            const mount = document.getElementById('ipod-mount');
            if (mount) {
                ipod.setTracks(typeof PLAYLIST !== 'undefined' ? PLAYLIST : []);
                mount.innerHTML = ipod.getHTML();
                ipod.bindEvents();
            }
        }

        // Animate stats in
        setTimeout(() => {
            modalContent.querySelectorAll('.stat-value').forEach((el, i) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
                el.style.transition = `all 0.4s ease ${i * 0.1}s`;
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            });
        }, 200);
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

        // Immediately stop any playing media so audio doesn't continue after close
        modalContent.querySelectorAll('iframe').forEach(f => { f.src = 'about:blank'; });
        modalContent.querySelectorAll('video').forEach(v => { try { v.pause(); } catch (e) {} });

        // Clear the content after the fade-out so the embed is fully torn down
        setTimeout(() => {
            if (!modalOverlay.classList.contains('active')) modalContent.innerHTML = '';
        }, 320);

        // Show mini-player if music is playing
        if (ipod.isPlaying) {
            ipod.showMiniPlayer();
        }
    }

    // Traffic light buttons
    dotClose.addEventListener('click', closeModal);
    document.getElementById('dotMinimize').addEventListener('click', closeModal);
    document.getElementById('dotMaximize').addEventListener('click', () => {
        modal.classList.toggle('maximized');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ----------------------------------------
    // Mobile menu
    // ----------------------------------------
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // ----------------------------------------
    // Gallery lightbox
    // ----------------------------------------
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button class="lightbox-close">&times;</button><div class="lightbox-content"></div>';
    document.body.appendChild(lightbox);

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        const vid = lightbox.querySelector('video');
        if (vid) vid.pause();
        lightbox.querySelector('.lightbox-content').innerHTML = '';
    }

    // Delegate gallery clicks from modal content
    modalContent.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        const type = item.dataset.type;
        const src = item.dataset.src;
        const content = lightbox.querySelector('.lightbox-content');

        if (type === 'video') {
            content.innerHTML = '<video src="' + src + '" controls autoplay style="max-width:90vw;max-height:85vh;border-radius:12px;"></video>';
        } else {
            content.innerHTML = '<img src="' + src + '" alt="" style="max-width:90vw;max-height:85vh;border-radius:12px;">';
        }
        lightbox.classList.add('active');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ----------------------------------------
    // Download PDF
    // ----------------------------------------
    document.getElementById('downloadPdf').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'assets/CV.pdf';
        link.download = 'CV.pdf';
        link.click();
    });
});
