#!/usr/bin/env python3
"""Generate the CV as a professional PDF.

Run:  python3 assets/generate_cv.py
Requires:  reportlab  (pip install reportlab)

The script writes CV.pdf next to itself, which is the file the
profile card on the website downloads.
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_LEFT

OUTPUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "CV.pdf")

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    topMargin=1.8 * cm,
    bottomMargin=1.5 * cm,
    leftMargin=2 * cm,
    rightMargin=2 * cm,
)

styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    'CVName', parent=styles['Title'],
    fontSize=22, leading=26, spaceAfter=2,
    fontName='Helvetica-Bold', alignment=TA_LEFT,
    textColor=HexColor('#1d1d1f'),
))
styles.add(ParagraphStyle(
    'CVContact', parent=styles['Normal'],
    fontSize=9, leading=13, spaceAfter=6,
    fontName='Helvetica', textColor=HexColor('#6e6e73'),
))
styles.add(ParagraphStyle(
    'CVSummary', parent=styles['Normal'],
    fontSize=9.5, leading=14, spaceAfter=10,
    fontName='Helvetica', textColor=HexColor('#1d1d1f'),
))
styles.add(ParagraphStyle(
    'CVSectionHead', parent=styles['Heading2'],
    fontSize=12, leading=16, spaceBefore=14, spaceAfter=6,
    fontName='Helvetica-Bold', textColor=HexColor('#1d1d1f'),
))
styles.add(ParagraphStyle(
    'CVRoleCompany', parent=styles['Normal'],
    fontSize=10.5, leading=14, spaceBefore=8, spaceAfter=1,
    fontName='Helvetica-Bold', textColor=HexColor('#1d1d1f'),
))
styles.add(ParagraphStyle(
    'CVRoleTitle', parent=styles['Normal'],
    fontSize=9, leading=13, spaceAfter=3,
    fontName='Helvetica-Oblique', textColor=HexColor('#6e6e73'),
))
styles.add(ParagraphStyle(
    'CVContext', parent=styles['Normal'],
    fontSize=9, leading=13, spaceAfter=4,
    fontName='Helvetica', textColor=HexColor('#3a3a3c'),
))
styles.add(ParagraphStyle(
    'CVBullet', parent=styles['Normal'],
    fontSize=9, leading=13, spaceAfter=2,
    fontName='Helvetica', textColor=HexColor('#1d1d1f'),
    leftIndent=12, bulletIndent=0,
))
styles.add(ParagraphStyle(
    'CVSkills', parent=styles['Normal'],
    fontSize=9, leading=14, spaceAfter=6,
    fontName='Helvetica', textColor=HexColor('#3a3a3c'),
))
styles.add(ParagraphStyle(
    'CVSmall', parent=styles['Normal'],
    fontSize=8.5, leading=12, spaceAfter=3,
    fontName='Helvetica', textColor=HexColor('#3a3a3c'),
))

story = []

def hr():
    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#d2d2d7'), spaceAfter=6, spaceBefore=4))

def section(title):
    story.append(Paragraph(title, styles['CVSectionHead']))
    hr()

def role(company, title_text, dates):
    story.append(Paragraph(f'{company} <font color="#6e6e73" size="9">{dates}</font>', styles['CVRoleCompany']))
    story.append(Paragraph(title_text, styles['CVRoleTitle']))

def context(text):
    story.append(Paragraph(text, styles['CVContext']))

def bullet(text):
    story.append(Paragraph(f'<bullet>&bull;</bullet> {text}', styles['CVBullet']))

def small(text):
    story.append(Paragraph(text, styles['CVSmall']))

# -- Header --
story.append(Paragraph('Nick Sannen', styles['CVName']))
story.append(Paragraph('Laagland 28, 2450 Meerhout, Belgium - +32 495 63 01 46 - nicksannen@hotmail.com', styles['CVContact']))
story.append(Paragraph(
    'Internationally experienced commercial professional with a strong background in partnership '
    'management, high-value sales and distributor development. Over fifteen years connecting brands, '
    'athletes and commercial opportunities across cycling and motorsport, including founding and building '
    'two professional gravel teams from scratch. A strategic relationship builder with an entrepreneurial '
    'mindset, effective across marketing, sales and operations, and most at home with full ownership of a project.',
    styles['CVSummary']
))

# -- Skills --
section('KEY SKILLS &amp; EXPERTISE')
story.append(Paragraph(
    'Partnership Management - High-Value Sales - Sponsorship Acquisition - Distributor Development - '
    'B2B Relationship Management - Contract Negotiation - Team Building - Athlete Management - '
    'Budget Management - Race &amp; Event Logistics - Content Strategy - Storytelling - Brand Positioning - '
    'Marketing &amp; Communications - Event Activations - Trade Shows',
    styles['CVSkills']
))

# -- Career --
section('CAREER HIGHLIGHTS')

role('Independent Gravel Project', 'Founder / CEO', '2026-Present')
context('Founded and built a new professional gravel team from scratch, taking full ownership across strategy, commercial, content and sport.')
bullet('Led all commercial partnerships, securing and managing collaborations with multiple international brands.')
bullet('Developed and executed the full content and communication strategy, covering storytelling, announcements and brand positioning.')
bullet('Managed rider recruitment and contracts, building a competitive and professional team structure.')
bullet('Integrated an existing cycling community, TNS, into the team, increasing visibility and delivering measurable value for partners.')
bullet('Owned overall strategy, budget allocation and the long-term development of the project.')

story.append(Spacer(1, 4))

role('Classified x Rose', 'Team / Athlete Manager &amp; Founder', '2023-2026')
context('Founded and built a professional gravel team from the ground up, overseeing all operational and sporting aspects while owning the commercial and brand side for Classified.')
bullet('Managed athlete contracts, logistics, race planning and performance support.')
bullet('Secured sponsorships and commercial partnerships, contributing directly to revenue growth and financial sustainability.')
bullet('Led marketing and communications, driving visibility and credibility for the team.')
bullet('Visited dealers and distributors to present the team concept, gather market feedback and strengthen distribution relationships.')
bullet('Translated market insights into strategic actions in collaboration with marketing and product teams.')

story.append(Spacer(1, 4))

role('Classified', 'Athlete Manager &amp; Event Manager', '2021-2023')
context('Managed athlete relations and ran events, trade shows and activations end to end, owning on-site sales and distributor activation.')
bullet('Acted as the main contact point for athletes, ensuring their needs were met and creating content opportunities aligned to brand strategy.')
bullet('Organised events, trade shows and activations, from venue booking to full on-site execution.')
bullet('Oversaw sales logistics and managed on-site sales operations during trade shows, ensuring commercial targets were met.')
bullet('Supported distributor activation by aligning brand presence with local sales objectives.')

story.append(Spacer(1, 4))

role('Paul Sannen bv', 'Manager / Partnerships &amp; Operations', '2008-2021')
context('Led high-value commercial negotiations and long-term partnerships across elite motorsport and cycling, alongside ultra-premium vehicle sales.')
bullet('Led commercial negotiations with international brands and private clients in elite motorsport and cycling environments.')
bullet('Handled luxury vehicle sales in the ultra-high-end segment, with transactions exceeding EUR 500,000, built on trust-based relationship management.')
bullet('Developed and maintained long-term B2B relationships with sponsors, partners and rights holders across multiple markets.')
bullet('Negotiated partnership agreements and ensured contractual delivery and commercial performance.')

story.append(Spacer(1, 4))

role('Nicky Hayden, MotoGP', 'Personal Assistant', '2011-2017')
bullet('Supported a top-level MotoGP rider across customer relations and events.')

role('Tom Boonen', 'Personal Assistant', '2010-2011')
bullet('Provided personal assistance to one of Belgium\'s leading professional cyclists.')

# -- Additional --
section('ADDITIONAL')
story.append(Paragraph('<b>Languages:</b> Dutch (native), English (very good), French (basic), German (notions)', styles['CVSmall']))
story.append(Paragraph('<b>Licences:</b> Driving licences B, C &amp; CE', styles['CVSmall']))
story.append(Paragraph('<b>Personal Interests:</b> Cycling, gravel, running, motorsport', styles['CVSmall']))
story.append(Paragraph('<b>Personal:</b> Belgian, based in Meerhout. Born 08/03/1985.', styles['CVSmall']))

# -- Education --
section('EDUCATION &amp; QUALIFICATIONS')
small('<b>Physical Education and Sport</b> - Rozenberg, Mol (1997-2005)')
small('<b>Driving Licences B, C &amp; CE</b> - car, truck and truck-with-trailer categories')

# Build
doc.build(story)
print(f"CV generated: {OUTPUT}")
