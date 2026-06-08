// ============================================
// Interactive Resume Data — Nick Sannen
//
// Node types:
//   center       - the person themselves (1 node)
//   category     - top-level sections (Experience, Skills, About, etc.)
//   role         - a job / project, sits as a child of a category
//
// Edges connect center -> categories and category -> roles.
// Each entry in `details` is a card the user sees when they click the
// matching node id.
// ============================================

const RESUME_DATA = {
    center: {
        id: "person",
        label: "Nick Sannen",
        sublabel: "Partnerships & Commercial",
        type: "center",
        icon: "✦",
        color: "#2563eb"
    },

    nodes: [
        // -- Top-level category nodes --
        { id: "experience", label: "Experience", type: "category", icon: "◆", color: "#1e293b", angle: 0,   distance: 1 },
        { id: "skills",     label: "Skills",     type: "category", icon: "▲", color: "#1e293b", angle: 120, distance: 1 },
        { id: "education",  label: "Education",  type: "category", icon: "○", color: "#1e293b", angle: 190, distance: 1 },
        { id: "about",      label: "About",      type: "category", icon: "△", color: "#1e293b", angle: 225, distance: 1 },
        { id: "contact",    label: "Contact",    type: "category", icon: "□", color: "#1e293b", angle: 260, distance: 1 },

        // -- Experience sub-nodes (newest first) --
        { id: "role-1", label: "Independent Gravel", sublabel: "2026–Present", type: "role", parent: "experience", order: 1, icon: "◆", color: "#059669" },
        { id: "role-2", label: "Classified x Rose",  sublabel: "2023–2026",    type: "role", parent: "experience", order: 2, icon: "◆", color: "#7c3aed" },
        { id: "role-3", label: "Classified",         sublabel: "2021–2023",    type: "role", parent: "experience", order: 3, icon: "◆", color: "#2563eb" },
        { id: "role-4", label: "Paul Sannen bv",     sublabel: "2008–2021",    type: "role", parent: "experience", order: 4, icon: "◆", color: "#d97706" },
        { id: "role-5", label: "Nicky Hayden",       sublabel: "2011–2017",    type: "role", parent: "experience", order: 5, icon: "◆", color: "#dc2626" },
        { id: "role-6", label: "Tom Boonen",         sublabel: "2010–2011",    type: "role", parent: "experience", order: 6, icon: "◆", color: "#0891b2" }
    ],

    // -- Edges connect nodes. Center -> categories, then category -> roles. --
    edges: [
        { from: "person", to: "experience" },
        { from: "person", to: "skills" },
        { from: "person", to: "education" },
        { from: "person", to: "about" },
        { from: "person", to: "contact" },

        { from: "experience", to: "role-1" },
        { from: "experience", to: "role-2" },
        { from: "experience", to: "role-3" },
        { from: "experience", to: "role-4" },
        { from: "experience", to: "role-5" },
        { from: "experience", to: "role-6" }
    ],

    // -- Detail cards: keyed by node id. --
    details: {
        person: {
            title: "Nick Sannen",
            subtitle: "Partnerships & Commercial",
            type: "profile",
            content: `
                <div class="profile-card">
                    <div class="profile-header">
                        <img class="profile-avatar-img" src="assets/profile.jpg" alt="Nick Sannen" />
                        <div class="profile-info">
                            <h2>Nick Sannen</h2>
                            <p class="profile-title">Commercial & Partnerships Professional</p>
                            <p class="profile-creds">Founder, Classified x Rose & Independent Gravel Project</p>
                        </div>
                    </div>
                    <p class="profile-bio">Internationally experienced commercial professional with a strong background in partnership management, high-value sales and distributor development. Over fifteen years connecting brands, athletes and commercial opportunities across cycling and motorsport, including founding and building two professional gravel teams from scratch.</p>
                    <div class="profile-tags">
                        <span class="tag">Partnerships</span>
                        <span class="tag">Sponsorship</span>
                        <span class="tag">Team Founder</span>
                        <span class="tag">Gravel Cycling</span>
                        <span class="tag">High-Value Sales</span>
                        <span class="tag">Motorsport</span>
                    </div>
                    <div class="profile-meta">
                        <span>Meerhout, Belgium</span>
                        <span>nicksannen@hotmail.com</span>
                    </div>
                    <a href="assets/CV.pdf" download class="cv-download-btn">Download CV</a>
                </div>
            `
        },

        experience: {
            title: "Experience",
            subtitle: "Fifteen-plus years across cycling, events and motorsport",
            type: "overview",
            content: `
                <div class="overview-card">
                    <h2>Career Timeline</h2>
                    <p class="overview-intro">Click on individual role nodes to explore each position in detail.</p>
                    <div class="timeline">
                        <div class="timeline-item current">
                            <span class="timeline-role">Founder / CEO</span>
                            <span class="timeline-company">Independent Gravel Project</span>
                            <span class="timeline-date">2026–Present</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-role">Team / Athlete Manager & Founder</span>
                            <span class="timeline-company">Classified x Rose</span>
                            <span class="timeline-date">2023–2026</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-role">Athlete Manager & Event Manager</span>
                            <span class="timeline-company">Classified</span>
                            <span class="timeline-date">2021–2023</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-role">Manager / Partnerships & Operations</span>
                            <span class="timeline-company">Paul Sannen bv</span>
                            <span class="timeline-date">2008–2021</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-role">Personal Assistant</span>
                            <span class="timeline-company">Nicky Hayden, MotoGP</span>
                            <span class="timeline-date">2011–2017</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-role">Personal Assistant</span>
                            <span class="timeline-company">Tom Boonen</span>
                            <span class="timeline-date">2010–2011</span>
                        </div>
                    </div>
                </div>
            `
        },

        "role-1": {
            title: "Independent Gravel Project",
            subtitle: "Founder / CEO · 2026–Present",
            type: "role",
            color: "#059669",
            industry: "Pro Cycling",
            content: `
                <div class="role-card">
                    <div class="role-header">
                        <div class="role-badge" style="background: #059669">Pro Cycling</div>
                        <span class="role-status active">Current</span>
                    </div>
                    <h2>Founder / CEO</h2>
                    <h3>Independent Gravel Project · 2026–Present</h3>
                    <p class="role-context">Founded and built a new professional gravel team from scratch, taking full ownership across strategy, commercial, content and sport.</p>

                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Full ownership.</strong> Founded and built a new gravel team from the ground up, taking responsibility across every area of the project.</li>
                            <li><strong>Commercial partnerships.</strong> Led all commercial partnerships, securing and managing collaborations with multiple international brands.</li>
                            <li><strong>Content and communication.</strong> Developed and executed the full content and communication strategy, covering storytelling, announcements and brand positioning.</li>
                            <li><strong>Rider recruitment.</strong> Managed rider recruitment and contracts, building a competitive and professional team structure.</li>
                            <li><strong>Community integration.</strong> Integrated an existing cycling community, TNS, into the team, increasing visibility and delivering measurable value for partners.</li>
                            <li><strong>Strategy and budget.</strong> Owned overall strategy, budget allocation and the long-term development of the project.</li>
                        </ul>
                    </div>

                    <div class="media-gallery">
                        <h4>Team Launch & Activations</h4>
                        <p class="gallery-description" style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">Founder-led launch films and partner activations for the new gravel project.</p>
                        <div class="gallery-grid">
                            <div class="gallery-item" data-type="video" data-src="assets/role-1/launch-foodmaker-gravelking.mp4">
                                <video src="assets/role-1/launch-foodmaker-gravelking.mp4" muted preload="metadata" poster="assets/thumbs/role-1-launch-foodmaker-gravelking.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Team Launch Film</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-1/eurobike.mp4">
                                <video src="assets/role-1/eurobike.mp4" muted preload="metadata" poster="assets/thumbs/role-1-eurobike.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Eurobike</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-1/apero-eurobike.mp4">
                                <video src="assets/role-1/apero-eurobike.mp4" muted preload="metadata" poster="assets/thumbs/role-1-apero-eurobike.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Eurobike Apéro</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },

        "role-2": {
            title: "Classified x Rose",
            subtitle: "Team / Athlete Manager & Founder · 2023–2026",
            type: "role",
            color: "#7c3aed",
            industry: "Pro Cycling",
            content: `
                <div class="role-card">
                    <div class="role-header">
                        <div class="role-badge" style="background: #7c3aed">Pro Cycling</div>
                    </div>
                    <h2>Team / Athlete Manager & Founder</h2>
                    <h3>Classified x Rose · 2023–2026</h3>
                    <p class="role-context">Founded and built a professional gravel team from the ground up, overseeing all operational and sporting aspects while owning the commercial and brand side for Classified.</p>

                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Founded the team.</strong> Built a professional gravel team from the ground up, overseeing all operational and sporting aspects.</li>
                            <li><strong>Athlete management.</strong> Managed athlete contracts, logistics, race planning and performance support.</li>
                            <li><strong>Sponsorship and partnerships.</strong> Secured sponsorships and commercial partnerships, contributing directly to revenue growth and financial sustainability.</li>
                            <li><strong>Marketing and communications.</strong> Led marketing and communications, driving visibility and credibility for the team.</li>
                            <li><strong>Commercial ambassador.</strong> Visited dealers and distributors to present the team concept, gather market feedback and strengthen distribution relationships.</li>
                            <li><strong>Market insight.</strong> Translated market insights into strategic actions in collaboration with marketing and product teams.</li>
                        </ul>
                    </div>

                    <div class="media-gallery">
                        <h4>Team Launch & Brand Films</h4>
                        <p class="gallery-description" style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">Launch films, athlete stories and brand activations from the Classified x Rose gravel team, including the Shimano integration and rider features.</p>
                        <div class="gallery-grid">
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/rose-trailer.mp4">
                                <video src="assets/role-2/rose-trailer.mp4" muted preload="metadata" poster="assets/thumbs/role-2-rose-trailer.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Classified x Rose Trailer</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/rose-reel.mp4">
                                <video src="assets/role-2/rose-reel.mp4" muted preload="metadata" poster="assets/thumbs/role-2-rose-reel.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Team Launch Reel</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/shimano-integration.mp4">
                                <video src="assets/role-2/shimano-integration.mp4" muted preload="metadata" poster="assets/thumbs/role-2-shimano-integration.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Shimano Integration</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/thomas-de-gendt.mp4">
                                <video src="assets/role-2/thomas-de-gendt.mp4" muted preload="metadata" poster="assets/thumbs/role-2-thomas-de-gendt.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Thomas De Gendt</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/philippe-gilbert-liege.mp4">
                                <video src="assets/role-2/philippe-gilbert-liege.mp4" muted preload="metadata" poster="assets/thumbs/role-2-philippe-gilbert-liege.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Philippe Gilbert, Liège</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/josie.mp4">
                                <video src="assets/role-2/josie.mp4" muted preload="metadata" poster="assets/thumbs/role-2-josie.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Rider Feature</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/rose-velofolies.mp4">
                                <video src="assets/role-2/rose-velofolies.mp4" muted preload="metadata" poster="assets/thumbs/role-2-rose-velofolies.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Vélofollies Activation</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/rose-trailer-v1.mp4">
                                <video src="assets/role-2/rose-trailer-v1.mp4" muted preload="metadata" poster="assets/thumbs/role-2-rose-trailer-v1.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Trailer, Alternate Cut</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },

        "role-3": {
            title: "Classified",
            subtitle: "Athlete Manager & Event Manager · 2021–2023",
            type: "role",
            color: "#2563eb",
            industry: "Events & Activation",
            content: `
                <div class="role-card">
                    <div class="role-header">
                        <div class="role-badge" style="background: #2563eb">Events & Activation</div>
                    </div>
                    <h2>Athlete Manager & Event Manager</h2>
                    <h3>Classified · 2021–2023</h3>
                    <p class="role-context">Managed athlete relations and ran events, trade shows and activations end to end, owning on-site sales and distributor activation for the brand.</p>

                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Athlete relations.</strong> Managed athlete relations and support, acting as the main contact point and ensuring their needs were met.</li>
                            <li><strong>Content with athletes.</strong> Coordinated and created content opportunities with athletes, aligning brand strategy and visibility.</li>
                            <li><strong>Events and activations.</strong> Organised events, trade shows and activations, from venue booking to full on-site execution.</li>
                            <li><strong>On-site sales.</strong> Oversaw sales logistics at events and managed on-site sales operations during trade shows, ensuring commercial targets were met.</li>
                            <li><strong>Distributor activation.</strong> Supported distributor activation by aligning brand presence with local sales objectives.</li>
                        </ul>
                    </div>

                    <div class="media-gallery">
                        <h4>Race Support & Event Content</h4>
                        <p class="gallery-description" style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">Race support reels, live event content and activations produced across the 2024 and 2025 seasons.</p>
                        <div class="gallery-grid">
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/reel-2024.mp4">
                                <video src="assets/role-3/reel-2024.mp4" muted preload="metadata" poster="assets/thumbs/role-3-reel-2024.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Season Reel 2024</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2024-jul.mp4">
                                <video src="assets/role-3/race-2024-jul.mp4" muted preload="metadata" poster="assets/thumbs/role-3-race-2024-jul.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Race Support, July 2024</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2024-aug.mp4">
                                <video src="assets/role-3/race-2024-aug.mp4" muted preload="metadata" poster="assets/thumbs/role-3-race-2024-aug.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Race Support, August 2024</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2025-2.mp4">
                                <video src="assets/role-3/race-2025-2.mp4" muted preload="metadata" poster="assets/thumbs/role-3-race-2025-2.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Live Content 2025 · 1</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2025-3.mp4">
                                <video src="assets/role-3/race-2025-3.mp4" muted preload="metadata" poster="assets/thumbs/role-3-race-2025-3.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Live Content 2025 · 2</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2025-4.mp4">
                                <video src="assets/role-3/race-2025-4.mp4" muted preload="metadata" poster="assets/thumbs/role-3-race-2025-4.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Live Content 2025 · 3</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2025-5.mp4">
                                <video src="assets/role-3/race-2025-5.mp4" muted preload="metadata" poster="assets/thumbs/role-3-race-2025-5.jpg"></video>
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Live Content 2025 · 4</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },

        "role-4": {
            title: "Paul Sannen bv",
            subtitle: "Manager / Partnerships & Operations · 2008–2021",
            type: "role",
            color: "#d97706",
            industry: "Automotive & Motorsport",
            content: `
                <div class="role-card">
                    <div class="role-header">
                        <div class="role-badge" style="background: #d97706">Automotive & Motorsport</div>
                    </div>
                    <h2>Manager / Partnerships & Operations</h2>
                    <h3>Paul Sannen bv · 2008–2021</h3>
                    <p class="role-context">Led high-value commercial negotiations and long-term partnerships across elite motorsport and cycling, alongside ultra-premium vehicle sales.</p>
                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>High-value negotiations.</strong> Led commercial negotiations with international brands and private clients, managing partnerships in elite motorsport and cycling environments.</li>
                            <li><strong>Ultra-premium sales.</strong> Handled luxury vehicle sales in the premium and ultra-high-end segment, with transactions exceeding €500,000, built on trust-based relationship management and tailored client advisory.</li>
                            <li><strong>International stakeholders.</strong> Acted as commercial point of contact for international stakeholders, aligning brand objectives with business opportunities.</li>
                            <li><strong>Long-term B2B.</strong> Developed and maintained long-term B2B relationships with sponsors, partners and rights holders across multiple markets.</li>
                            <li><strong>Contractual delivery.</strong> Negotiated partnership agreements and ensured contractual delivery and commercial performance.</li>
                        </ul>
                    </div>
                </div>
            `
        },

        "role-5": {
            title: "Nicky Hayden, MotoGP",
            subtitle: "Personal Assistant · 2011–2017",
            type: "role",
            color: "#dc2626",
            industry: "Motorsport",
            content: `
                <div class="role-card">
                    <div class="role-header">
                        <div class="role-badge" style="background: #dc2626">Motorsport</div>
                    </div>
                    <h2>Personal Assistant</h2>
                    <h3>Nicky Hayden, MotoGP · 2011–2017</h3>
                    <p class="role-context">A long-running role inside the MotoGP paddock, supporting a top-level rider across customer relations and events.</p>
                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Customer relations.</strong> Acted as personal assistant to MotoGP rider Nicky Hayden, managing customer relations and day-to-day commitments.</li>
                            <li><strong>Events.</strong> Supported appearances and events across the racing calendar.</li>
                        </ul>
                    </div>
                </div>
            `
        },

        "role-6": {
            title: "Tom Boonen",
            subtitle: "Personal Assistant · 2010–2011",
            type: "role",
            color: "#0891b2",
            industry: "Pro Cycling",
            content: `
                <div class="role-card">
                    <div class="role-header">
                        <div class="role-badge" style="background: #0891b2">Pro Cycling</div>
                    </div>
                    <h2>Personal Assistant</h2>
                    <h3>Tom Boonen · 2010–2011</h3>
                    <p class="role-context">Supported professional cyclist Tom Boonen as a personal assistant across day-to-day commitments.</p>
                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Rider support.</strong> Provided personal assistance to one of Belgium's leading professional cyclists, handling logistics and commitments around the racing season.</li>
                        </ul>
                    </div>
                </div>
            `
        },

        skills: {
            title: "Skills & Expertise",
            subtitle: "Core competencies",
            type: "skills",
            content: `
                <div class="skills-card">
                    <h2>Skills & Expertise</h2>
                    <div class="skills-grid">
                        <div class="skill-group">
                            <h4>Commercial & Partnerships</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Partnership Management</span>
                                <span class="skill-tag">High-Value Sales</span>
                                <span class="skill-tag">Sponsorship Acquisition</span>
                                <span class="skill-tag">Distributor Development</span>
                                <span class="skill-tag">B2B Relationships</span>
                                <span class="skill-tag">Contract Negotiation</span>
                            </div>
                        </div>
                        <div class="skill-group">
                            <h4>Team & Operations</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Team Building</span>
                                <span class="skill-tag">Athlete Management</span>
                                <span class="skill-tag">Budget Management</span>
                                <span class="skill-tag">Race & Event Logistics</span>
                                <span class="skill-tag">Rider Recruitment</span>
                            </div>
                        </div>
                        <div class="skill-group">
                            <h4>Brand & Content</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Content Strategy</span>
                                <span class="skill-tag">Storytelling</span>
                                <span class="skill-tag">Brand Positioning</span>
                                <span class="skill-tag">Marketing & Comms</span>
                                <span class="skill-tag">Event Activations</span>
                                <span class="skill-tag">Trade Shows</span>
                            </div>
                        </div>
                        <div class="skill-group">
                            <h4>Industries</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Professional Cycling</span>
                                <span class="skill-tag">Gravel Racing</span>
                                <span class="skill-tag">Motorsport</span>
                                <span class="skill-tag">Premium Automotive</span>
                            </div>
                        </div>
                        <div class="skill-group">
                            <h4>Tools</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">MS Office</span>
                            </div>
                        </div>
                        <div class="skill-group">
                            <h4>Languages</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Dutch (Native)</span>
                                <span class="skill-tag">English (Very Good)</span>
                                <span class="skill-tag">French (Basic)</span>
                                <span class="skill-tag">German (Notions)</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },

        education: {
            title: "Education & Qualifications",
            subtitle: "Schooling and licences",
            type: "education",
            content: `
                <div class="education-card">
                    <h2>Education & Qualifications</h2>
                    <div class="edu-list">
                        <div class="edu-item">
                            <div class="edu-badge">PE</div>
                            <div class="edu-detail">
                                <h4>Physical Education and Sport</h4>
                                <p>Rozenberg, Mol · 1997–2005</p>
                            </div>
                        </div>
                        <div class="edu-item">
                            <div class="edu-badge">LIC</div>
                            <div class="edu-detail">
                                <h4>Driving Licences B, C & CE</h4>
                                <p>Car, truck and truck-with-trailer categories</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },

        about: {
            title: "About",
            subtitle: "The person behind the CV",
            type: "about",
            content: `
                <div class="about-card">
                    <h2>About Nick</h2>
                    <div class="about-sections">
                        <div class="about-section">
                            <h4>From the paddock to the peloton</h4>
                            <p>Nick's career began alongside elite athletes, working as a personal assistant to MotoGP rider Nicky Hayden and Belgian cycling great Tom Boonen. From there he moved into high-value commercial roles in premium automotive and motorsport, then founded and built two professional gravel teams from scratch. Belgian, based in Meerhout.</p>
                        </div>
                        <div class="about-section">
                            <h4>Builder and operator</h4>
                            <p>He works best with full ownership, building teams and partnerships from the ground up. A strategic relationship builder with an entrepreneurial mindset, comfortable across marketing, sales and operations, and known for translating ideas into execution with a high level of initiative and accountability.</p>
                        </div>
                        <div class="about-section">
                            <h4>Interests</h4>
                            <div class="interest-tags">
                                <span>Cycling</span>
                                <span>Gravel</span>
                                <span>Running</span>
                                <span>Motorsport</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },

        contact: {
            title: "Contact",
            subtitle: "Get in touch",
            type: "contact",
            content: `
                <div class="contact-card">
                    <h2>Get in Touch</h2>
                    <div class="contact-grid">
                        <a href="mailto:nicksannen@hotmail.com" class="contact-item">
                            <span class="contact-icon">@</span>
                            <span class="contact-label">Email</span>
                            <span class="contact-value">nicksannen@hotmail.com</span>
                        </a>
                        <a href="tel:+32495630146" class="contact-item">
                            <span class="contact-icon">T</span>
                            <span class="contact-label">Phone</span>
                            <span class="contact-value">+32 495 63 01 46</span>
                        </a>
                        <div class="contact-item">
                            <span class="contact-icon">L</span>
                            <span class="contact-label">Location</span>
                            <span class="contact-value">Laagland 28, 2450 Meerhout</span>
                        </div>
                    </div>
                </div>
            `
        }
    }
};
