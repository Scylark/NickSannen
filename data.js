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
        { id: "role-1", label: "Foodmaker X Gravel King", sublabel: "2026–Present", type: "role", parent: "experience", order: 1, icon: "◆", color: "#059669" },
        { id: "role-2", label: "Classified x Rose",  sublabel: "2023–2026",    type: "role", parent: "experience", order: 2, icon: "◆", color: "#7c3aed" },
        { id: "role-3", label: "Classified",         sublabel: "2022–2026",    type: "role", parent: "experience", order: 3, icon: "◆", color: "#2563eb" },
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
                    <div class="hero-video">
                        <iframe src="https://www.youtube-nocookie.com/embed/7IyAHLVZsVc?rel=0" title="Rise of the Hawk, a Classified Cycling documentary" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <p class="hero-caption">Rise of the Hawk, a Classified Cycling documentary.</p>
                    <div class="profile-header">
                        <img class="profile-avatar-img" src="assets/profile.jpg" alt="Nick Sannen" />
                        <div class="profile-info">
                            <h2>Nick Sannen</h2>
                            <p class="profile-title">Commercial & Partnerships Professional</p>
                            <p class="profile-creds">Founder & GM, Foodmaker X Gravel King · Founder, Classified x Rose</p>
                        </div>
                    </div>
                    <p class="profile-bio">Internationally experienced commercial professional with a strong background in partnership management, high-value sales and distributor development. A career spent at the top of cycling and motorsport, from right-hand to a MotoGP World Champion and to one of Belgium's greatest cyclists, to ultra-premium sales, to founding and building two professional gravel teams from scratch.</p>
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
                            <span class="timeline-role">Founder & GM</span>
                            <span class="timeline-company">Foodmaker X Gravel King</span>
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
                            <span class="timeline-date">2022–2026</span>
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
            title: "Foodmaker X Gravel King",
            subtitle: "Founder & GM · 2026–Present",
            type: "role",
            color: "#059669",
            industry: "Pro Cycling",
            content: `
                <div class="role-card">
                    <div class="role-header">
                        <div class="role-badge" style="background: #059669">Pro Cycling</div>
                        <span class="role-status active">Current</span>
                    </div>
                    <h2>Founder & GM</h2>
                    <h3>Foodmaker X Gravel King · 2026–Present</h3>
                    <p class="role-links" style="margin: -4px 0 12px; font-size: 14px; display:flex; gap:16px; flex-wrap:wrap;"><a href="https://www.instagram.com/foodmakerxgravelking/" target="_blank" rel="noopener" style="color: var(--accent); text-decoration:none; font-weight:700;">Instagram &#8599;</a></p>
                    <p class="role-context">Founder and general manager of a professional gravel team built from a blank sheet. Holds end-to-end accountability for the whole operation, from the commercial model and brand to the roster and race programme.</p>

                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Founder and GM.</strong> Created the team from nothing and runs it day to day, accountable for strategy, commercial, content, sport and budget under one roof.</li>
                            <li><strong>Owns the sponsor portfolio.</strong> Secures and manages the full slate of commercial partnerships with international brands, acting as their senior point of contact and protecting the value they get back.</li>
                            <li><strong>Sets the brand and content strategy.</strong> Directs the entire content and communication programme, from team storytelling and launch announcements to season-long brand positioning.</li>
                            <li><strong>Builds the roster.</strong> Leads rider recruitment and contract negotiation, assembling a competitive squad and the professional support structure around it.</li>
                            <li><strong>Turns community into commercial value.</strong> Brought an established cycling community, TNS, into the team, converting an engaged audience into measurable reach and value for partners.</li>
                            <li><strong>Controls the budget.</strong> Owns budget allocation and the long-term roadmap, balancing sporting ambition against commercial sustainability.</li>
                        </ul>
                    </div>

                    <div class="media-gallery">
                        <h4>Gallery</h4>
                        <p class="gallery-description" style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">Launch film, team clips and photography from the Foodmaker X Gravel King project.</p>
                        <div class="gallery-grid">
                            <div class="gallery-item" data-type="video" data-src="assets/role-1/launch-foodmaker-gravelking.mp4">
                                <img src="assets/thumbs/role-1-launch-foodmaker-gravelking.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Team Launch Film</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-1/foodmaker-clip.mp4">
                                <img src="assets/thumbs/role-1-foodmaker-clip.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Team Clip</div>
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-1.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-1-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-2.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-2-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-3.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-3-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-4.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-4-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-5.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-5-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-6.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-6-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-7.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-7-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-8.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-8-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-9.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-9-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-10.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-10-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-11.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-11-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-12.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-12-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-13.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-13-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-14.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-14-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-15.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-15-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-16.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-16-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-17.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-17-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-18.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-18-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-19.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-19-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-20.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-20-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-21.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-21-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-22.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-22-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-23.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-23-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-24.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-24-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-25.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-25-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-26.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-26-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-27.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-27-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-28.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-28-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-1/foodmaker-29.jpg">
                                <img src="assets/thumbs/role-1-foodmaker-29-sm.jpg" alt="Foodmaker X Gravel King" loading="lazy" decoding="async">
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
                    <p class="role-links" style="margin: -4px 0 12px; font-size: 14px; display:flex; gap:16px; flex-wrap:wrap;"><a href="https://www.classified-cycling.cc/" target="_blank" rel="noopener" style="color: var(--accent); text-decoration:none; font-weight:700;">classified-cycling.cc &#8599;</a><a href="https://www.instagram.com/classified.cc/" target="_blank" rel="noopener" style="color: var(--accent); text-decoration:none; font-weight:700;">Instagram &#8599;</a></p>
                    <p class="role-context">Founded and ran a professional gravel team for drivetrain brand Classified, owning it end to end across three seasons while doubling as its commercial engine and lead brand ambassador.</p>

                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Founded and led the team.</strong> Built a professional gravel team from the ground up and managed every operational and sporting decision across three seasons.</li>
                            <li><strong>Primary athlete manager.</strong> Owned athlete contracts, logistics, race planning and performance support as the riders' main point of contact.</li>
                            <li><strong>Drove the revenue.</strong> Secured and managed the sponsorships and commercial partnerships that underpinned the team's financial stability and growth.</li>
                            <li><strong>Led marketing and communications.</strong> Directed the team's marketing and communications, building visibility and credibility with audiences, media and the trade.</li>
                            <li><strong>Commercial ambassador for the brand.</strong> Represented Classified to dealers and distributors, presenting the team concept, gathering market feedback and strengthening distribution relationships across markets.</li>
                            <li><strong>Closed the loop to product.</strong> Fed market intelligence back into the business, shaping strategic decisions alongside the marketing and product teams.</li>
                        </ul>
                    </div>

                    <div class="media-gallery">
                        <h4>Team Launch & Brand Films</h4>
                        <p class="gallery-description" style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">Launch films, athlete stories and brand activations from the Classified x Rose gravel team, including the Shimano integration and rider features.</p>
                        <div class="gallery-grid">
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/rose-trailer.mp4">
                                <img src="assets/thumbs/role-2-rose-trailer.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Classified x Rose Trailer</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/rose-reel.mp4">
                                <img src="assets/thumbs/role-2-rose-reel.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Team Launch Reel</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/shimano-integration.mp4">
                                <img src="assets/thumbs/role-2-shimano-integration.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Shimano Integration</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/thomas-de-gendt.mp4">
                                <img src="assets/thumbs/role-2-thomas-de-gendt.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Thomas De Gendt</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/philippe-gilbert-liege.mp4">
                                <img src="assets/thumbs/role-2-philippe-gilbert-liege.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Philippe Gilbert, Liège</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/josie.mp4">
                                <img src="assets/thumbs/role-2-josie.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Rider Feature</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/rose-velofolies.mp4">
                                <img src="assets/thumbs/role-2-rose-velofolies.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Vélofollies Activation</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-2/rose-trailer-v1.mp4">
                                <img src="assets/thumbs/role-2-rose-trailer-v1.jpg" alt="" loading="lazy" decoding="async">
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
            subtitle: "Athlete Manager & Event Manager · 2022–2026",
            type: "role",
            color: "#2563eb",
            industry: "Events & Activation",
            content: `
                <div class="role-card">
                    <div class="role-header">
                        <div class="role-badge" style="background: #2563eb">Events & Activation</div>
                    </div>
                    <h2>Athlete Manager & Event Manager</h2>
                    <h3>Classified · 2022–2026</h3>
                    <p class="role-links" style="margin: -4px 0 12px; font-size: 14px; display:flex; gap:16px; flex-wrap:wrap;"><a href="https://www.classified-cycling.cc/" target="_blank" rel="noopener" style="color: var(--accent); text-decoration:none; font-weight:700;">classified-cycling.cc &#8599;</a><a href="https://www.instagram.com/classified.cc/" target="_blank" rel="noopener" style="color: var(--accent); text-decoration:none; font-weight:700;">Instagram &#8599;</a></p>
                    <p class="role-context">Owned athlete relations and the full event and activation calendar for Classified, running the brand's presence from the paddock through to the point of sale.</p>

                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Single point of contact for athletes.</strong> Managed the brand's athlete relationships day to day, looking after their needs and turning the partnership into content and visibility aligned to brand strategy.</li>
                            <li><strong>Ran the event calendar end to end.</strong> Planned and delivered events, trade shows and activations, from venue booking through to on-site execution.</li>
                            <li><strong>Delivered commercial results on site.</strong> Owned sales logistics and on-site sales operations at trade shows and events, consistently hitting commercial targets.</li>
                            <li><strong>Activated the distribution network.</strong> Drove distributor activation by aligning brand presence with local sales objectives in each market.</li>
                            <li><strong>Built the content engine.</strong> Created content opportunities around athletes and events that fed the brand's wider marketing and visibility.</li>
                        </ul>
                    </div>

                    <div class="media-gallery">
                        <h4>Events, Activations & Race Support</h4>
                        <p class="gallery-description" style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">Trade show activations at Eurobike, plus race support reels and live event content produced across the seasons.</p>
                        <div class="gallery-grid">
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/eurobike.mp4">
                                <img src="assets/thumbs/role-3-eurobike.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Eurobike</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/apero-eurobike.mp4">
                                <img src="assets/thumbs/role-3-apero-eurobike.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Eurobike Apéro</div>
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-3/eurobike-photo-1.jpg">
                                <img src="assets/thumbs/role-3-eurobike-photo-1-sm.jpg" alt="Classified at Eurobike" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-3/eurobike-photo-2.jpg">
                                <img src="assets/thumbs/role-3-eurobike-photo-2-sm.jpg" alt="Classified at Eurobike" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-3/eurobike-photo-3.jpg">
                                <img src="assets/thumbs/role-3-eurobike-photo-3-sm.jpg" alt="Classified at Eurobike" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-3/eurobike-photo-4.jpg">
                                <img src="assets/thumbs/role-3-eurobike-photo-4-sm.jpg" alt="Classified at Eurobike" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-3/eurobike-photo-5.jpg">
                                <img src="assets/thumbs/role-3-eurobike-photo-5-sm.jpg" alt="Classified at Eurobike" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/reel-2024.mp4">
                                <img src="assets/thumbs/role-3-reel-2024.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Season Reel 2024</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2024-jul.mp4">
                                <img src="assets/thumbs/role-3-race-2024-jul.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Race Support, July 2024</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2024-aug.mp4">
                                <img src="assets/thumbs/role-3-race-2024-aug.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Race Support, August 2024</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2025-2.mp4">
                                <img src="assets/thumbs/role-3-race-2025-2.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Live Content 2025 · 1</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2025-3.mp4">
                                <img src="assets/thumbs/role-3-race-2025-3.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Live Content 2025 · 2</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2025-4.mp4">
                                <img src="assets/thumbs/role-3-race-2025-4.jpg" alt="" loading="lazy" decoding="async">
                                <div class="gallery-play"></div>
                                <div class="gallery-label">Live Content 2025 · 3</div>
                            </div>
                            <div class="gallery-item" data-type="video" data-src="assets/role-3/race-2025-5.mp4">
                                <img src="assets/thumbs/role-3-race-2025-5.jpg" alt="" loading="lazy" decoding="async">
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
                    <p class="role-context">Thirteen years running partnerships and ultra-premium sales for a business operating where elite motorsport, professional cycling and high-end automotive meet. The role that built Nick's commercial instinct and his network at the top of the sport.</p>
                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Led high-stakes negotiation.</strong> Ran commercial negotiations with international brands and private clients, brokering partnerships across elite motorsport and cycling.</li>
                            <li><strong>Closed at the top of the market.</strong> Sold luxury vehicles in the ultra-high-end segment, handling individual transactions above €500,000 on the strength of discreet, trust-based client relationships.</li>
                            <li><strong>Senior commercial contact.</strong> Served as the point of contact for international stakeholders, aligning brand objectives with concrete business opportunities.</li>
                            <li><strong>Held the long-term relationships.</strong> Built and maintained B2B relationships with sponsors, partners and rights holders across multiple markets over more than a decade.</li>
                            <li><strong>Owned delivery.</strong> Negotiated partnership agreements and carried them through to contractual delivery and commercial performance.</li>
                        </ul>
                    </div>
                    <div class="media-gallery">
                        <h4>Gallery</h4>
                        <p class="gallery-description" style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">From the motorsport and high-end automotive years.</p>
                        <div class="gallery-grid">
                            <div class="gallery-item" data-type="image" data-src="assets/role-4/paul-1.jpg">
                                <img src="assets/thumbs/role-4-paul-1-sm.jpg" alt="Paul Sannen, motorsport and premium automotive" loading="lazy" decoding="async">
                            </div>
                        </div>
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
                    <h2>Personal Assistant to a MotoGP World Champion</h2>
                    <h3>Nicky Hayden, MotoGP · 2011–2017</h3>
                    <p class="role-context">Six seasons as the trusted right-hand to MotoGP World Champion Nicky Hayden, operating inside the top tier of world motorcycle racing and across an international Grand Prix calendar. A front-row education in performance, pressure and how elite sponsorship really works.</p>
                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Right-hand to a world champion.</strong> Personal assistant to a MotoGP World Champion, managing his schedule, logistics and commitments through demanding back-to-back race weekends.</li>
                            <li><strong>Sponsor and VIP relations.</strong> Front-line contact for sponsors, partners and VIP guests in the paddock, protecting the rider's time while keeping high-value commercial relationships warm.</li>
                            <li><strong>Customer and fan relations.</strong> Represented the rider and his partners to customers and fans in a high-visibility, high-scrutiny environment.</li>
                            <li><strong>Events and appearances.</strong> Coordinated appearances, events and activations around the international race calendar, from setup through to delivery.</li>
                            <li><strong>International logistics under pressure.</strong> Kept a complex travel and commitment schedule running across countries and time zones, season after season.</li>
                        </ul>
                    </div>
                    <div class="media-gallery">
                        <h4>In the MotoGP Paddock</h4>
                        <p class="gallery-description" style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">Years spent alongside Nicky Hayden across the MotoGP calendar.</p>
                        <div class="gallery-grid">
                            <div class="gallery-item" data-type="image" data-src="assets/role-5/nicky-1.jpg">
                                <img src="assets/thumbs/role-5-nicky-1-sm.jpg" alt="With Nicky Hayden, MotoGP" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-5/nicky-2.jpg">
                                <img src="assets/thumbs/role-5-nicky-2-sm.jpg" alt="With Nicky Hayden, MotoGP" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-5/nicky-3.jpg">
                                <img src="assets/thumbs/role-5-nicky-3-sm.jpg" alt="With Nicky Hayden, MotoGP" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-5/nicky-4.jpg">
                                <img src="assets/thumbs/role-5-nicky-4-sm.jpg" alt="With Nicky Hayden, MotoGP" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-5/nicky-5.jpg">
                                <img src="assets/thumbs/role-5-nicky-5-sm.jpg" alt="With Nicky Hayden, MotoGP" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-5/nicky-6.jpg">
                                <img src="assets/thumbs/role-5-nicky-6-sm.jpg" alt="With Nicky Hayden, MotoGP" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-5/nicky-7.jpg">
                                <img src="assets/thumbs/role-5-nicky-7-sm.jpg" alt="With Nicky Hayden, MotoGP" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-5/nicky-8.jpg">
                                <img src="assets/thumbs/role-5-nicky-8-sm.jpg" alt="With Nicky Hayden, MotoGP" loading="lazy" decoding="async">
                            </div>
                        </div>
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
                    <h2>Personal Assistant to a Cycling Great</h2>
                    <h3>Tom Boonen · 2010–2011</h3>
                    <p class="role-context">Trusted personal support to Tom Boonen, a former world champion, multiple Classics winner and one of the biggest names Belgian cycling has produced.</p>
                    <div class="achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                            <li><strong>Support to a superstar athlete.</strong> Personal assistant to a former world road race champion and multiple Monument winner, managing day-to-day commitments through the racing season.</li>
                            <li><strong>Logistics and access.</strong> Handled the schedule, logistics and access around a high-profile public figure, keeping commitments and relationships running smoothly.</li>
                        </ul>
                    </div>
                    <div class="media-gallery">
                        <h4>Alongside Tom Boonen</h4>
                        <p class="gallery-description" style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">Supporting Tom Boonen through the racing season.</p>
                        <div class="gallery-grid">
                            <div class="gallery-item" data-type="image" data-src="assets/role-6/boonen-1.jpg">
                                <img src="assets/thumbs/role-6-boonen-1-sm.jpg" alt="Alongside Tom Boonen" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-6/boonen-2.jpg">
                                <img src="assets/thumbs/role-6-boonen-2-sm.jpg" alt="Alongside Tom Boonen" loading="lazy" decoding="async">
                            </div>
                            <div class="gallery-item" data-type="image" data-src="assets/role-6/boonen-3.jpg">
                                <img src="assets/thumbs/role-6-boonen-3-sm.jpg" alt="Alongside Tom Boonen" loading="lazy" decoding="async">
                            </div>
                        </div>
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
                            <p>Nick's career started at the very top of two sports, as the trusted right-hand to MotoGP World Champion Nicky Hayden and to Belgian Classics legend Tom Boonen. Working that close to world-class athletes taught him how performance, pressure and commercial partnership really fit together. He carried that into high-value roles in premium automotive and motorsport, and then into founding and building two professional gravel teams from the ground up. Belgian, based in Meerhout.</p>
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
