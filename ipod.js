// ============================================
// Faux iPod Classic Media Player
// ============================================

class iPodPlayer {
    constructor() {
        this.audio = new Audio();
        this.tracks = [];
        this.currentIndex = -1;
        this.isPlaying = false;
        this.view = 'list'; // 'list' or 'nowplaying'
        this.progressInterval = null;

        // Anti-download protections
        this.audio.controlsList = 'nodownload';
        this.audio.preload = 'none';

        // Audio events
        this.audio.addEventListener('ended', () => this.next());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    }

    setTracks(tracks) {
        this.tracks = tracks;
    }

    play(index) {
        if (index !== undefined && index !== this.currentIndex) {
            this.currentIndex = index;
            const track = this.tracks[this.currentIndex];
            // Use blob URL approach for basic protection
            this.audio.src = track.src;
            this.audio.load();
        }

        this.audio.play().then(() => {
            this.isPlaying = true;
            this.render();
        }).catch(err => {
            console.log('Playback error:', err);
        });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.render();
    }

    togglePlay() {
        if (this.tracks.length === 0) return;
        if (this.currentIndex === -1) {
            this.play(0);
        } else if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    next() {
        if (this.tracks.length === 0) return;
        const nextIndex = (this.currentIndex + 1) % this.tracks.length;
        this.play(nextIndex);
    }

    prev() {
        if (this.tracks.length === 0) return;
        // If more than 3 seconds in, restart current track
        if (this.audio.currentTime > 3) {
            this.audio.currentTime = 0;
            return;
        }
        const prevIndex = (this.currentIndex - 1 + this.tracks.length) % this.tracks.length;
        this.play(prevIndex);
    }

    seek(e) {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        if (this.audio.duration) {
            this.audio.currentTime = pct * this.audio.duration;
        }
    }

    updateProgress() {
        const fill = document.getElementById('ipod-progress-fill');
        const timeCurrent = document.getElementById('ipod-time-current');
        if (!fill || !this.audio.duration) return;

        const pct = (this.audio.currentTime / this.audio.duration) * 100;
        fill.style.width = pct + '%';

        if (timeCurrent) {
            timeCurrent.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    updateDuration() {
        const timeTotal = document.getElementById('ipod-time-total');
        if (timeTotal && this.audio.duration) {
            timeTotal.textContent = this.formatTime(this.audio.duration);
        }
    }

    formatTime(secs) {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    toggleView() {
        this.view = this.view === 'list' ? 'nowplaying' : 'list';
        this.render();
    }

    getCurrentTrack() {
        if (this.currentIndex >= 0 && this.currentIndex < this.tracks.length) {
            return this.tracks[this.currentIndex];
        }
        return null;
    }

    getHTML() {
        const track = this.getCurrentTrack();
        const hasMusic = this.tracks.length > 0;

        let screenContent = '';

        if (!hasMusic) {
            // Empty state
            screenContent = `
                <div class="ipod-header">
                    <span>iPod</span>
                    <span class="ipod-header-title">My Picks</span>
                    <div class="ipod-battery">
                        <div class="ipod-battery-icon"><div class="ipod-battery-fill"></div></div>
                    </div>
                </div>
                <div class="ipod-empty">
                    <div class="ipod-empty-icon">🎵</div>
                    <div class="ipod-empty-text">No tracks yet</div>
                    <div class="ipod-empty-hint">Add .mp3 files to assets/music/<br>and update the playlist in data.js</div>
                </div>
            `;
        } else if (this.view === 'list') {
            // Track list view
            const listItems = this.tracks.map((t, i) => `
                <div class="ipod-track-item ${i === this.currentIndex ? 'active' : ''}" data-track-index="${i}">
                    <div class="ipod-track-item-number"><span>${i + 1}</span></div>
                    <div class="ipod-track-item-info">
                        <div class="ipod-track-item-title">${t.title}</div>
                        <div class="ipod-track-item-artist">${t.artist}</div>
                    </div>
                    <div class="ipod-track-item-duration">${t.duration || ''}</div>
                </div>
            `).join('');

            screenContent = `
                <div class="ipod-header">
                    <span>iPod</span>
                    <span class="ipod-header-title">My Picks</span>
                    <div class="ipod-battery">
                        <div class="ipod-battery-icon"><div class="ipod-battery-fill"></div></div>
                    </div>
                </div>
                <div class="ipod-tracklist">${listItems}</div>
            `;
        } else {
            // Now playing view
            const albumArt = track && track.art
                ? `<img src="${track.art}" alt="${track.title}">`
                : '🎵';
            const spinning = this.isPlaying ? 'spinning' : '';

            screenContent = `
                <div class="ipod-header">
                    <span>iPod</span>
                    <span class="ipod-header-title">Now Playing</span>
                    <div class="ipod-battery">
                        <div class="ipod-battery-icon"><div class="ipod-battery-fill"></div></div>
                    </div>
                </div>
                <div class="ipod-now-playing">
                    <div class="ipod-album-art ${spinning}">${albumArt}</div>
                    <div class="ipod-track-info">
                        <div class="ipod-track-title">${track ? track.title : 'No Track'}</div>
                        <div class="ipod-track-artist">${track ? track.artist : ''}</div>
                    </div>
                    <div class="ipod-progress">
                        <div class="ipod-progress-bar" id="ipod-progress-bar">
                            <div class="ipod-progress-fill" id="ipod-progress-fill"></div>
                        </div>
                        <div class="ipod-time">
                            <span id="ipod-time-current">0:00</span>
                            <span id="ipod-time-total">${track && track.duration ? track.duration : '0:00'}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="ipod-container">
                <div class="ipod" oncontextmenu="return false;">
                    <div class="ipod-screen">
                        <div class="ipod-screen-content" id="ipod-screen">
                            ${screenContent}
                        </div>
                    </div>
                    <div class="ipod-wheel" id="ipod-wheel">
                        <div class="ipod-wheel-label top" id="ipod-btn-menu">MENU</div>
                        <div class="ipod-wheel-label right" id="ipod-btn-next">▶▶</div>
                        <div class="ipod-wheel-label left" id="ipod-btn-prev">◀◀</div>
                        <div class="ipod-wheel-label bottom" id="ipod-btn-play"><span class="play-icon"></span></div>
                        <div class="ipod-wheel-center" id="ipod-btn-select"></div>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const container = document.getElementById('ipod-screen');
        if (!container) return;

        const track = this.getCurrentTrack();
        const hasMusic = this.tracks.length > 0;

        if (!hasMusic) {
            // Don't re-render empty state
            return;
        }

        if (this.view === 'list') {
            // Just update active states
            const items = container.querySelectorAll('.ipod-track-item');
            items.forEach((item, i) => {
                item.classList.toggle('active', i === this.currentIndex);
            });

            // Update header
            const header = container.querySelector('.ipod-header-title');
            if (header) header.textContent = "My Picks";
        } else {
            // Rebuild now playing
            const albumArt = track && track.art
                ? `<img src="${track.art}" alt="${track.title}">`
                : '🎵';
            const spinning = this.isPlaying ? 'spinning' : '';

            container.innerHTML = `
                <div class="ipod-header">
                    <span>iPod</span>
                    <span class="ipod-header-title">Now Playing</span>
                    <div class="ipod-battery">
                        <div class="ipod-battery-icon"><div class="ipod-battery-fill"></div></div>
                    </div>
                </div>
                <div class="ipod-now-playing">
                    <div class="ipod-album-art ${spinning}">${albumArt}</div>
                    <div class="ipod-track-info">
                        <div class="ipod-track-title">${track ? track.title : 'No Track'}</div>
                        <div class="ipod-track-artist">${track ? track.artist : ''}</div>
                    </div>
                    <div class="ipod-progress">
                        <div class="ipod-progress-bar" id="ipod-progress-bar">
                            <div class="ipod-progress-fill" id="ipod-progress-fill"></div>
                        </div>
                        <div class="ipod-time">
                            <span id="ipod-time-current">${this.formatTime(this.audio.currentTime || 0)}</span>
                            <span id="ipod-time-total">${track && track.duration ? track.duration : this.formatTime(this.audio.duration || 0)}</span>
                        </div>
                    </div>
                </div>
            `;

            this.bindProgressBar();
        }
    }

    bindEvents() {
        // Wheel buttons
        const btnPlay = document.getElementById('ipod-btn-play');
        const btnNext = document.getElementById('ipod-btn-next');
        const btnPrev = document.getElementById('ipod-btn-prev');
        const btnMenu = document.getElementById('ipod-btn-menu');
        const btnSelect = document.getElementById('ipod-btn-select');

        if (btnPlay) btnPlay.addEventListener('click', (e) => { e.stopPropagation(); this.togglePlay(); });
        if (btnNext) btnNext.addEventListener('click', (e) => { e.stopPropagation(); this.next(); });
        if (btnPrev) btnPrev.addEventListener('click', (e) => { e.stopPropagation(); this.prev(); });
        if (btnMenu) btnMenu.addEventListener('click', (e) => { e.stopPropagation(); this.showList(); });
        if (btnSelect) btnSelect.addEventListener('click', (e) => { e.stopPropagation(); this.selectAction(); });

        // Track list clicks
        this.bindTrackList();
        this.bindProgressBar();

        // Disable right-click on the whole player
        const ipod = document.querySelector('.ipod');
        if (ipod) {
            ipod.addEventListener('contextmenu', (e) => e.preventDefault());
        }
    }

    bindTrackList() {
        const items = document.querySelectorAll('.ipod-track-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(item.dataset.trackIndex);
                this.play(idx);
                this.view = 'nowplaying';
                this.render();
                // Re-bind after render
                setTimeout(() => this.bindProgressBar(), 50);
            });
        });
    }

    bindProgressBar() {
        const bar = document.getElementById('ipod-progress-bar');
        if (bar) {
            bar.addEventListener('click', (e) => {
                e.stopPropagation();
                this.seek(e);
            });
        }
    }

    showList() {
        this.view = 'list';
        // Full re-render needed for list view
        const container = document.getElementById('ipod-screen');
        if (!container) return;

        const listItems = this.tracks.map((t, i) => `
            <div class="ipod-track-item ${i === this.currentIndex ? 'active' : ''}" data-track-index="${i}">
                <div class="ipod-track-item-number"><span>${i + 1}</span></div>
                <div class="ipod-track-item-info">
                    <div class="ipod-track-item-title">${t.title}</div>
                    <div class="ipod-track-item-artist">${t.artist}</div>
                </div>
                <div class="ipod-track-item-duration">${t.duration || ''}</div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="ipod-header">
                <span>iPod</span>
                <span class="ipod-header-title">My Picks</span>
                <div class="ipod-battery">
                    <div class="ipod-battery-icon"><div class="ipod-battery-fill"></div></div>
                </div>
            </div>
            <div class="ipod-tracklist">${listItems}</div>
        `;

        this.bindTrackList();
    }

    selectAction() {
        if (this.view === 'list' && this.tracks.length > 0) {
            // If on list, play first track or toggle to now playing
            if (this.currentIndex >= 0) {
                this.view = 'nowplaying';
                this.render();
                setTimeout(() => this.bindProgressBar(), 50);
            } else {
                this.play(0);
                this.view = 'nowplaying';
                this.render();
                setTimeout(() => this.bindProgressBar(), 50);
            }
        } else if (this.view === 'nowplaying') {
            this.togglePlay();
        }
    }

    // ---- Floating mini-player ----
    showMiniPlayer() {
        this.hideMiniPlayer();
        const track = this.getCurrentTrack();
        if (!track || !this.isPlaying) return;

        const mini = document.createElement('div');
        mini.id = 'mini-player';
        mini.className = 'mini-player';
        mini.innerHTML = `
            <div class="mini-player-info">
                <div class="mini-player-title">${track.title}</div>
                <div class="mini-player-artist">${track.artist}</div>
            </div>
            <div class="mini-player-controls">
                <button class="mini-btn" id="mini-prev">&#9664;&#9664;</button>
                <button class="mini-btn mini-play" id="mini-toggle">${this.isPlaying ? '&#9646;&#9646;' : '&#9654;'}</button>
                <button class="mini-btn" id="mini-next">&#9654;&#9654;</button>
            </div>
        `;
        document.body.appendChild(mini);

        // Animate in
        requestAnimationFrame(() => mini.classList.add('visible'));

        document.getElementById('mini-toggle').addEventListener('click', () => {
            this.togglePlay();
            this.updateMiniPlayer();
        });
        document.getElementById('mini-prev').addEventListener('click', () => {
            this.prev();
            this.updateMiniPlayer();
        });
        document.getElementById('mini-next').addEventListener('click', () => {
            this.next();
            this.updateMiniPlayer();
        });
        // Click on info opens listen modal
        mini.querySelector('.mini-player-info').addEventListener('click', () => {
            const listenBtn = document.querySelector('[data-target="listen"]');
            if (listenBtn) listenBtn.click();
        });
    }

    updateMiniPlayer() {
        const mini = document.getElementById('mini-player');
        if (!mini) return;
        const track = this.getCurrentTrack();
        if (track) {
            mini.querySelector('.mini-player-title').textContent = track.title;
            mini.querySelector('.mini-player-artist').textContent = track.artist;
        }
        const toggleBtn = document.getElementById('mini-toggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = this.isPlaying ? '&#9646;&#9646;' : '&#9654;';
        }
        if (!this.isPlaying && !this.audio.currentTime) {
            this.hideMiniPlayer();
        }
    }

    hideMiniPlayer() {
        const existing = document.getElementById('mini-player');
        if (existing) existing.remove();
    }
}

// Global instance
const ipod = new iPodPlayer();
