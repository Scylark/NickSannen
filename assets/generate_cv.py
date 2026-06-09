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
    'management, high-value sales and distributor development. A career spent at the top of cycling and '
    'motorsport, from right-hand to a MotoGP World Champion and to one of Belgium&#39;s greatest cyclists, '
    'through ultra-premium sales, to founding and building two professional gravel teams from scratch. A '
    'strategic relationship builder with an entrepreneurial mindset, effective across marketing, sales and '
    'operations, and most at home with full ownership of a project.',
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

role('Foodmaker X Gravel King', 'Founder &amp; GM', '2026-Present')
context('Founder and general manager of a professional gravel team built from a blank sheet, with end-to-end accountability for commercial, brand, roster and race programme.')
bullet('Created the team from nothing and runs it day to day, accountable for strategy, commercial, content, sport and budget.')
bullet('Owns the full sponsor portfolio, securing and managing partnerships with international brands as their senior point of contact.')
bullet('Directs the entire content and communication programme, from team storytelling and launch announcements to season-long brand positioning.')
bullet('Leads rider recruitment and contract negotiation, building a competitive squad and the support structure around it.')
bullet('Brought an established cycling community, TNS, into the team, converting an engaged audience into measurable reach and value for partners.')

story.append(Spacer(1, 4))

role('Classified x Rose', 'Team / Athlete Manager &amp; Founder', '2023-2026')
context('Founded and ran a professional gravel team for drivetrain brand Classified, owning it end to end across three seasons while acting as its commercial engine and lead brand ambassador.')
bullet('Built the team from the ground up and managed every operational and sporting decision across three seasons.')
bullet('Secured and managed the sponsorships and commercial partnerships that underpinned the team&#39;s financial stability and growth.')
bullet('Owned athlete contracts, logistics, race planning and performance support as the riders&#39; primary manager.')
bullet('Directed marketing and communications, building visibility and credibility with audiences, media and the trade.')
bullet('Represented Classified to dealers and distributors and fed market intelligence back to the marketing and product teams.')

story.append(Spacer(1, 4))

role('Classified', 'Athlete Manager &amp; Event Manager', '2022-2026')
context('Owned athlete relations and the full event and activation calendar for Classified, running the brand from the paddock through to the point of sale.')
bullet('Single point of contact for the brand&#39;s athletes, turning the relationship into content and visibility aligned to brand strategy.')
bullet('Planned and delivered events, trade shows and activations end to end, from venue booking to on-site execution.')
bullet('Owned sales logistics and on-site sales operations at trade shows, consistently hitting commercial targets.')
bullet('Drove distributor activation by aligning brand presence with local sales objectives in each market.')

story.append(Spacer(1, 4))

role('Paul Sannen bv', 'Manager / Partnerships &amp; Operations', '2008-2021')
context('Thirteen years running partnerships and ultra-premium sales for a business operating where elite motorsport, cycling and high-end automotive meet.')
bullet('Led commercial negotiations with international brands and private clients, brokering partnerships across elite motorsport and cycling.')
bullet('Sold luxury vehicles at the top of the market, handling individual transactions above EUR 500,000 on the strength of discreet, trust-based relationships.')
bullet('Served as senior commercial contact for international stakeholders, aligning brand objectives with business opportunities.')
bullet('Built and held long-term B2B relationships with sponsors, partners and rights holders across multiple markets for over a decade.')

story.append(Spacer(1, 4))

role('Nicky Hayden, MotoGP', 'Personal Assistant to a MotoGP World Champion', '2011-2017')
context('Six seasons as the trusted right-hand to MotoGP World Champion Nicky Hayden, inside the top tier of world motorcycle racing.')
bullet('Managed the rider&#39;s schedule, logistics and commitments through demanding back-to-back race weekends across an international Grand Prix calendar.')
bullet('Acted as front-line contact for sponsors, partners and VIP guests in the paddock, keeping high-value commercial relationships warm.')
bullet('Represented the rider and his partners to customers and fans in a high-visibility, high-scrutiny environment.')

story.append(Spacer(1, 4))

role('Tom Boonen', 'Personal Assistant to a Cycling Great', '2010-2011')
context('Trusted personal support to Tom Boonen, a former world champion, multiple Classics winner and one of the biggest names in Belgian cycling.')
bullet('Managed day-to-day commitments, schedule, logistics and access around a high-profile professional athlete through the racing season.')

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
