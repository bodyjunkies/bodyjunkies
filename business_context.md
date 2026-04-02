---
description: Comprehensive business context, mission, and brand identity for Bodyjunkies.
globs: ["**/*"]
---

# Bodyjunkies Business Context

## Mission & Vision
- **Mission:** To bring the drive back to boxing through dynamic people-focused small-group classes.
- **Vision:** To give people physical strength, mental fortitude, and confidence through healthy relationships with exercise.
- **Strap-line:** Fuel Your Fire.
- **Values:** Community, accountability, empowerment, and growth expressed through boxing & fitness.

## Brand Identity (The "Bodyjunkies" Look)
- **Aesthetic:** Inspired by [BLOK London](https://www.bloklondon.com/)—minimalist, high-contrast, bold, and direct.
- **Primary Palette:** Navy Blue (#221E3A), White (#FFFFFF), and Black (#000000).
- **Accents:** Hero Fire Red (#940405) and Outlaw Spark Orange (#F69523).
- **Typography:** Nourd Bold (Headings), Aileron Regular (Body), and Monument Hollow (Hero Statements).

## The User Journey (The "Strong Gateway")
- **Primary Goal:** Users should see the video, feel the vibe, and book in quickly.
- **Segmentation:** - **Beginners:** Directed toward the "one with gloves" (Starter Pack).
  - **Experienced:** Focused on equipment-ready booking.
- **Anti-Overselling Policy:** Do not use sales-heavy language (e.g., "discounts," "save money," "limited time").
- **Layout Rule:** No endless scrolling; keep pages punchy and use sub-pages for "About Us" or detailed info.

## Primary Call to Action
1. **The Starter Pack:** £49 (Must never be removed from the hero section).
2. **Trial Class:** Book a trial session to test the "inner fire."

## Personal Training & Integration
- **Personal Training Page:** Must include a Momence-integrated lead form.
- **Lead Capture:** Collect user situation, goals, and preferred trainer/time for an intro session.
- **Momence Schedule:** 
<div id="ribbon-schedule"></div>
<script
  async
  type="module"
  host_id="93353"
  teacher_ids="[]"
  location_ids="[]"
  tag_ids="[]"
  default_filter="show-all"
  locale="en"
  src="https://momence.com/plugin/host-schedule/host-schedule.js"
></script>

- **Momence Lead Form:**
<div id="momence-plugin-lead-form"></div>
<script
    async
    type="module"
    id="momence-plugin-lead-form-src"
    host_id="93353"
    fields="firstName,lastName,email,phoneNumber,Typeofsession,dayWeek,preferredTime,additionalInformation"
    token="zyXo3KnqXB"
    country_code="gb"
    data-field-def='{"firstName":{"type":"text","label":"First name","required":true},"lastName":{"type":"text","label":"Last name","required":true},"email":{"type":"email","label":"Email","required":true},"phoneNumber":{"type":"phone-number","label":"Phone number","required":true},"Typeofsession":{"type":"dropdown","label":"Type of session","required":true,"hidden":false,"selectOptions":["Boxing","Strength ","HIIT ","Not sure"]},"dayWeek":{"type":"multiselect","label":"Day of Week","required":true,"hidden":false,"selectOptions":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]},"preferredTime":{"type":"multiselect","label":"Preferred Time","required":true,"hidden":false,"selectOptions":["6am - 11am","12pm - 5pm","6pm - 9pm"]},"additionalInformation":{"type":"text","label":"Additional Information (optional)","required":false,"hidden":false}}'
    src="https://momence.com/plugin/lead-form/lead-form.js"
></script>

- **Momence Personal Training Appointments** 
<iframe
    id="iframe_appointments_93353"
    src="https://momence.com/appointments/93353?boardId=94755"
    style="width:100%; border:0px;"
    allowfullscreen="true"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    scrolling="no"
></iframe>
    
<script type="text/javascript">
    window.addEventListener("message",
        function (e) {
            const height = +e.data?.height;
            const type = e.data?.type;
            const iframe = document.querySelector("#iframe_appointments_93353");

            if (!type || !type.match("iframe_appointments_93353_resize") || isNaN(height) || !iframe) {
                return;
            }

            iframe.height = height + "px";            
        },
        false
     );
 </script>

**Momence Reviews**
<div id="momence-plugin-reviews"></div>
<script
    async
    type="module"
    host_id="93353"
    is_profile_picture_enabled="true"
    is_text_only_enabled="true"
    is_session_and_teacher_info_enabled="true"
    layout="vertical"
    signature="98e0fe2b6e055a841810d060089c8fb203a0f4a8593d0bb1ca95f253339e433c"
    src="https://momence.com/plugin/reviews/reviews.js">
</script>
<style>
    :root {
        --momenceReviewColorBackground: #FBFBFB;
        --momenceBorder: 1px solid rgba(0, 0, 0, 0.08);
        --momenceBorderRadius: 12px;
        --momenceBoxShadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.0);
    }
</style>

- **Direct Checkout for Starter Pack:** https://momence.com/Bodyjunkies/membership/Intro-Package/539286

## Social Proof & SEO
- **Highlight:** "90+ Google Reviews."
- **SEO Keywords:** "Boxing gym Holloway Road," "Fitness Tribe London."
- **Requirements:** Descriptive Alt text for all images and proper Meta tags on every page.