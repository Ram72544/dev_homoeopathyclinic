import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/gbp-assets', exist_ok=True)
download_dir = '/Users/rampandey/Downloads/GBP_Promotional_PNGs'
os.makedirs(download_dir, exist_ok=True)

# Load fonts
font_title = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 52)
font_subtitle = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 32)
font_body = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 24)
font_body_bold = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 26)
font_small = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 20)
font_badge = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 18)

logo_path = 'public/logo-concept-1-transparent.png'
logo_img = Image.open(logo_path).convert('RGBA')

# Helper: Draw smooth rounded rectangle
def draw_card(draw, box, radius=24, fill=(255, 255, 255, 240), outline=(234, 227, 215, 255), width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

# -------------------------------------------------------------
# GRAPHIC 1: GBP Cover Banner (1200 x 900)
# -------------------------------------------------------------
def generate_cover_banner():
    W, H = 1200, 900
    img = Image.new('RGBA', (W, H), (250, 248, 245, 255))
    draw = ImageDraw.Draw(img)

    # Top accent bar
    draw.rectangle([0, 0, W, 18], fill=(14, 124, 123, 255))

    # Background ambient circle gradient effect
    draw.ellipse([700, 100, 1250, 650], fill=(234, 227, 215, 180))

    # Add logo
    logo_resized = logo_img.resize((260, 273), Image.Resampling.LANCZOS)
    img.paste(logo_resized, (70, 70), logo_resized)

    # Header Text
    draw.text((360, 90), "Dr. Sheetal's", font=font_title, fill=(31, 44, 37, 255))
    draw.text((360, 155), "HOMOEOPATHY CLINIC", font=font_subtitle, fill=(14, 124, 123, 255))
    draw.text((360, 205), "Gentle, Natural & Permanent Family Healing", font=font_body_bold, fill=(197, 160, 89, 255))

    # AYUSH & Rating Badges
    draw_card(draw, (70, 270, 480, 320), radius=16, fill=(240, 247, 246, 255), outline=(14, 124, 123, 100))
    draw.text((90, 283), "★ 5.0 Google Rated Clinic", font=font_badge, fill=(14, 124, 123, 255))

    draw_card(draw, (500, 270, 930, 320), radius=16, fill=(253, 249, 240, 255), outline=(197, 160, 89, 100))
    draw.text((520, 283), "Govt. of India (AYUSH) Recognized", font=font_badge, fill=(197, 160, 89, 255))

    # Center Feature Card
    draw_card(draw, (70, 350, 1130, 710), radius=28, fill=(255, 255, 255, 255), outline=(226, 218, 203, 255), width=2)

    draw.text((110, 385), "KEY CLINICAL SPECIALTIES & TREATMENTS", font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 28), fill=(31, 44, 37, 255))

    bullet_items = [
        "🌿 Skin & Hair Allergies (Eczema, Psoriasis, Acne & Hives)",
        "🫁 Sinusitis, Asthma, Chronic Cough & Respiratory Allergies",
        "🥑 Acidity, Gas, IBS, Piles & Digestive Root Cause Care",
        "🌸 PCOS / PCOD, Hormonal Imbalance & Women's Wellness",
        "👶 Child Immunity, Frequent Fever, Colds & Growth Care"
    ]

    y_pos = 445
    for item in bullet_items:
        draw.text((110, y_pos), item, font=font_body, fill=(61, 77, 68, 255))
        y_pos += 48

    # Bottom Contact Bar
    draw_card(draw, (70, 740, 1130, 830), radius=20, fill=(31, 44, 37, 255), outline=(31, 44, 37, 255))
    draw.text((110, 765), "📞 Call / WhatsApp: +91 79053 71551", font=font_body_bold, fill=(250, 248, 245, 255))
    draw.text((680, 765), "📍 Badarpur / Hari Nagar, New Delhi", font=font_body_bold, fill=(197, 160, 89, 255))

    img_rgb = img.convert('RGB')
    img_rgb.save('public/gbp-assets/1_GBP_Cover_Banner.png')
    img_rgb.save(f'{download_dir}/1_GBP_Cover_Banner.png')
    print("Generated 1_GBP_Cover_Banner.png")

# -------------------------------------------------------------
# GRAPHIC 2: Doctor Credentials Post (1080 x 1080)
# -------------------------------------------------------------
def generate_doctor_credentials():
    W, H = 1080, 1080
    img = Image.new('RGBA', (W, H), (250, 248, 245, 255))
    draw = ImageDraw.Draw(img)

    # Top Gold Strip
    draw.rectangle([0, 0, W, 20], fill=(197, 160, 89, 255))

    # Header section
    logo_resized = logo_img.resize((180, 189), Image.Resampling.LANCZOS)
    img.paste(logo_resized, (60, 50), logo_resized)

    draw.text((260, 70), "MEET YOUR HOMEOPATHIC PHYSICIAN", font=font_badge, fill=(14, 124, 123, 255))
    draw.text((260, 100), "Dr. Sheetal", font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 56), fill=(31, 44, 37, 255))
    draw.text((260, 175), "BHMS, MD (Homoeopathy)", font=font_subtitle, fill=(197, 160, 89, 255))

    # Main Credentials Card
    draw_card(draw, (60, 250, 1020, 940), radius=28, fill=(255, 255, 255, 255), outline=(226, 218, 203, 255))

    draw.text((100, 290), "QUALIFICATIONS & CLINICAL EXPERTISE", font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 28), fill=(31, 44, 37, 255))

    details = [
        ("🎓 Higher Qualifications", "BHMS & MD in Classical Homoeopathy"),
        ("🩺 Clinical Practice", "Over 4+ Years Treating Complex & Chronic Cases"),
        ("🌱 Treatment Philosophy", "100% Classical Homeopathy — Single Medicine Matching Body Type"),
        ("⚡ Safe & Non-Toxic", "Natural Sweet Pills with Zero Side Effects or Chemical Toxicity"),
        ("🏛️ AYUSH Recognized", "Govt. of India Registered Homoeopathic Medical Practitioner"),
        ("👨‍👩‍👧‍👦 Family Health", "Dedicated Care for Infants, Adults, Women & Senior Citizens")
    ]

    y = 355
    for heading, desc in details:
        draw.text((100, y), heading, font=font_body_bold, fill=(14, 124, 123, 255))
        draw.text((450, y), desc, font=font_body, fill=(61, 77, 68, 255))
        y += 92

    # Footer CTA
    draw_card(draw, (60, 960, 1020, 1030), radius=16, fill=(31, 44, 37, 255), outline=(31, 44, 37, 255))
    draw.text((100, 980), "Book Appointment: +91 79053 71551", font=font_body_bold, fill=(250, 248, 245, 255))
    draw.text((640, 980), "Dr. Sheetal's Homoeopathy Clinic", font=font_body_bold, fill=(197, 160, 89, 255))

    img_rgb = img.convert('RGB')
    img_rgb.save('public/gbp-assets/2_GBP_Doctor_Credentials.png')
    img_rgb.save(f'{download_dir}/2_GBP_Doctor_Credentials.png')
    print("Generated 2_GBP_Doctor_Credentials.png")

# -------------------------------------------------------------
# GRAPHIC 3: Specialized Treatments (1080 x 1080)
# -------------------------------------------------------------
def generate_specialized_treatments():
    W, H = 1080, 1080
    img = Image.new('RGBA', (W, H), (250, 248, 245, 255))
    draw = ImageDraw.Draw(img)

    # Top Accent Strip
    draw.rectangle([0, 0, W, 20], fill=(14, 124, 123, 255))

    # Header
    logo_resized = logo_img.resize((150, 157), Image.Resampling.LANCZOS)
    img.paste(logo_resized, (60, 45), logo_resized)

    draw.text((230, 55), "SPECIALIZED HOMOEOPATHIC CARE", font=font_badge, fill=(197, 160, 89, 255))
    draw.text((230, 85), "Treating The Root Cause", font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 44), fill=(31, 44, 37, 255))
    draw.text((230, 145), "Without Side Effects or Lifetime Dependency", font=font_body, fill=(61, 77, 68, 255))

    # 4 Grid Cards
    cards_data = [
        ("✨ Skin & Hair Care", "Eczema, Psoriasis, Acne, Hives,\nFungal Allergies & Hair Fall", (60, 220, 520, 560)),
        ("🫁 Cold, Sinus & Asthma", "Allergic Rhinitis, Sinusitis,\nTonsillitis & Frequent Chest Colds", (560, 220, 1020, 560)),
        ("🥑 Acidity & Stomach", "Gas, Chronic Indigestion, IBS,\nPiles & Constipation Relief", (60, 590, 520, 930)),
        ("🌸 PCOS & Women's Care", "Irregular Periods, Hormonal\nImbalance, Thyroid & Migraine", (560, 590, 1020, 930))
    ]

    for title, desc, box in cards_data:
        draw_card(draw, box, radius=24, fill=(255, 255, 255, 255), outline=(226, 218, 203, 255))
        draw.text((box[0] + 30, box[1] + 35), title, font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 26), fill=(14, 124, 123, 255))
        
        y_d = box[1] + 90
        for line in desc.split('\n'):
            draw.text((box[0] + 30, y_d), line, font=font_body, fill=(61, 77, 68, 255))
            y_d += 36

    # Bottom Contact Bar
    draw_card(draw, (60, 960, 1020, 1030), radius=16, fill=(31, 44, 37, 255), outline=(31, 44, 37, 255))
    draw.text((100, 980), "📞 Direct Consultation: +91 79053 71551", font=font_body_bold, fill=(250, 248, 245, 255))
    draw.text((640, 980), "📍 Badarpur, New Delhi", font=font_body_bold, fill=(197, 160, 89, 255))

    img_rgb = img.convert('RGB')
    img_rgb.save('public/gbp-assets/3_GBP_Specialized_Treatments.png')
    img_rgb.save(f'{download_dir}/3_GBP_Specialized_Treatments.png')
    print("Generated 3_GBP_Specialized_Treatments.png")

# -------------------------------------------------------------
# GRAPHIC 4: Patient Reviews & Trust (1080 x 1080)
# -------------------------------------------------------------
def generate_patient_reviews():
    W, H = 1080, 1080
    img = Image.new('RGBA', (W, H), (250, 248, 245, 255))
    draw = ImageDraw.Draw(img)

    # Top Strip
    draw.rectangle([0, 0, W, 20], fill=(197, 160, 89, 255))

    # Header
    logo_resized = logo_img.resize((150, 157), Image.Resampling.LANCZOS)
    img.paste(logo_resized, (60, 45), logo_resized)

    draw.text((230, 55), "PATIENT TRUST & REVIEWS", font=font_badge, fill=(14, 124, 123, 255))
    draw.text((230, 85), "5.0 ★ Top Rated Clinic", font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 44), fill=(31, 44, 37, 255))
    draw.text((230, 145), "What Our Patients Say on Google Maps", font=font_body, fill=(61, 77, 68, 255))

    # 2 Review Cards
    reviews = [
        ("Priya Sharma", "New Delhi", "★★★★★", "\"I suffered from severe skin allergy and itching for 3 years. After taking Dr. Sheetal's medicine for 4 months, my skin is completely clear. Best homeopathy doctor in Badarpur!\"", (60, 230, 1020, 560)),
        ("Rahul Verma", "Faridabad", "★★★★★", "\"My 5-year-old son used to get cough and fever every single month. Homeopathy sweet pills improved his immunity tremendously. He rarely gets sick now.\"", (60, 590, 1020, 920))
    ]

    for name, loc, stars, text, box in reviews:
        draw_card(draw, box, radius=24, fill=(255, 255, 255, 255), outline=(226, 218, 203, 255))
        draw.text((box[0] + 40, box[1] + 30), name, font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 28), fill=(31, 44, 37, 255))
        draw.text((box[0] + 40, box[1] + 68), f"📍 {loc} • Verified Patient", font=font_small, fill=(61, 77, 68, 255))
        draw.text((box[0] + 700, box[1] + 30), stars, font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 28), fill=(197, 160, 89, 255))

        # Wrap text manually
        words = text.split(' ')
        lines = []
        cur = ""
        for w in words:
            if len(cur + ' ' + w) < 62:
                cur += ' ' + w
            else:
                lines.append(cur.strip())
                cur = w
        if cur:
            lines.append(cur.strip())

        y_t = box[1] + 120
        for l in lines:
            draw.text((box[0] + 40, y_t), l, font=font_body, fill=(45, 58, 50, 255))
            y_t += 36

    # Bottom Contact Bar
    draw_card(draw, (60, 960, 1020, 1030), radius=16, fill=(31, 44, 37, 255), outline=(31, 44, 37, 255))
    draw.text((100, 980), "⭐ Verified Google Maps Reviews", font=font_body_bold, fill=(250, 248, 245, 255))
    draw.text((640, 980), "Call: +91 79053 71551", font=font_body_bold, fill=(197, 160, 89, 255))

    img_rgb = img.convert('RGB')
    img_rgb.save('public/gbp-assets/4_GBP_Patient_Trust_Reviews.png')
    img_rgb.save(f'{download_dir}/4_GBP_Patient_Trust_Reviews.png')
    print("Generated 4_GBP_Patient_Trust_Reviews.png")

# -------------------------------------------------------------
# GRAPHIC 5: Book Consultation CTA (1080 x 1080)
# -------------------------------------------------------------
def generate_book_consultation():
    W, H = 1080, 1080
    img = Image.new('RGBA', (W, H), (31, 44, 37, 255))
    draw = ImageDraw.Draw(img)

    # Accent Circle
    draw.ellipse([500, -100, 1200, 600], fill=(26, 74, 58, 255))

    # Header Logo
    logo_resized = logo_img.resize((220, 231), Image.Resampling.LANCZOS)
    img.paste(logo_resized, (70, 70), logo_resized)

    draw.text((320, 90), "Dr. Sheetal's Homoeopathy Clinic", font=font_title, fill=(250, 248, 245, 255))
    draw.text((320, 165), "Natural Family Healing • Ministry of AYUSH Recognized", font=font_body, fill=(197, 160, 89, 255))

    # Main Offer Card
    draw_card(draw, (70, 310, 1010, 900), radius=28, fill=(255, 255, 255, 255), outline=(197, 160, 89, 255), width=3)

    draw.text((110, 350), "BOOK YOUR 1-ON-1 DOCTOR CONSULTATION", font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 30), fill=(14, 124, 123, 255))

    benefits = [
        "✔️ Detailed 30-Min In-Person or Tele-Consultation",
        "✔️ Complete Root Cause Case History Analysis",
        "✔️ 100% Natural Sweet Pills — Zero Side Effects",
        "✔️ Safe for Children, Pregnant Mothers & Senior Citizens",
        "✔️ Affordable Consultation & Genuine AYUSH Standard Care"
    ]

    y_b = 425
    for b in benefits:
        draw.text((110, y_b), b, font=font_body_bold, fill=(31, 44, 37, 255))
        y_b += 52

    # Timings Box
    draw_card(draw, (110, 700, 970, 850), radius=16, fill=(250, 248, 245, 255), outline=(226, 218, 203, 255))
    draw.text((130, 725), "⏰ CLINIC TIMINGS:", font=font_body_bold, fill=(14, 124, 123, 255))
    draw.text((130, 765), "Mon – Sat: 10:00 AM – 1:00 PM  |  6:00 PM – 9:00 PM", font=font_body, fill=(61, 77, 68, 255))
    draw.text((130, 805), "Sunday: 10:00 AM – 1:00 PM (Prior Appointment)", font=font_body, fill=(61, 77, 68, 255))

    # Bottom Contact Bar
    draw_card(draw, (70, 940, 1010, 1020), radius=16, fill=(197, 160, 89, 255), outline=(197, 160, 89, 255))
    draw.text((110, 960), "📞 Call / WhatsApp: +91 79053 71551", font=font_body_bold, fill=(31, 44, 37, 255))
    draw.text((630, 960), "📍 Badarpur, New Delhi", font=font_body_bold, fill=(31, 44, 37, 255))

    img_rgb = img.convert('RGB')
    img_rgb.save('public/gbp-assets/5_GBP_Book_Consultation.png')
    img_rgb.save(f'{download_dir}/5_GBP_Book_Consultation.png')
    print("Generated 5_GBP_Book_Consultation.png")

if __name__ == '__main__':
    generate_cover_banner()
    generate_doctor_credentials()
    generate_specialized_treatments()
    generate_patient_reviews()
    generate_book_consultation()
    print("All 5 GBP promotional graphics generated successfully!")
