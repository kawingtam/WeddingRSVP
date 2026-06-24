# 🩵 Blue Floral Wedding RSVP Website

A soft, romantic one-page wedding website designed with a **dusty blue + soft white floral theme**.  
The site includes wedding details, a responsive RSVP form, a collapsible Q&A section, and a thank-you page for guests after they submit their response.

Perfect for a simple wedding website that feels elegant, personal, and easy for guests to use.

![Blue Floral Border Preview](blue-floral-border.png)

---

## 🦋 Project Highlights

- 🩵 **Blue floral wedding style** — inspired by dusty blue roses, white flowers, and soft greenery.
- 💙 **One-page RSVP website** — easy for guests to read details and respond in one place.
- 🧊 **Responsive layout** — adapts nicely from desktop to phone.
- 🌊 **Accordion Q&A section** — guests can click the plus button to expand answers and click the minus button to hide them.
- 🫐 **RSVP form ready** — can collect guest name, attendance, guest count, meal preference, allergies, and notes.
- 🔷 **Google Sheets option** — the form can be connected to Google Apps Script so responses populate a spreadsheet.
- 🪼 **Lightweight static site** — built with plain HTML, CSS, and JavaScript.
- 🧿 **Easy to customize** — edit names, date, venue, schedule, questions, colors, and photos directly in `index.html`.

---

## 🧊 Project Structure

```text
blue-wedding-rsvp-site/
├── index.html              # Main wedding website and RSVP form
├── thank-you.html          # Confirmation page after RSVP submission
├── blue-floral-border.png  # Blue floral wedding frame image
├── README.md               # Project documentation
└── README.txt              # Simple setup notes
```

> Open `index.html` directly in your browser to preview the website locally.

---

## 💙 Features Overview

| Section | Purpose |
|---|---|
| 🩵 Hero | Couple names, wedding date, and romantic welcome message |
| 🦋 Wedding Details | Venue, date, time, and location information |
| 🌊 Schedule | Morning ceremony, family rituals, reception, or custom wedding timeline |
| 🫐 RSVP | Guest response form with attendance and meal options |
| 🔷 Q&A | Expandable frequently asked questions with plus/minus buttons |
| 🧊 Thank You Page | Simple confirmation page after guests submit their RSVP |

---

## 🌊 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and RSVP form |
| CSS3 | Blue floral styling, responsive cards, mobile layout |
| Vanilla JavaScript | FAQ accordion behavior and optional Google Sheets submission |
| Netlify Forms | Optional no-code RSVP response collection |
| Google Apps Script | Optional Google Sheets RSVP database |

---

## 🫐 Getting Started

### 1. Download or clone the project

```bash
git clone https://github.com/your-username/blue-wedding-rsvp-site.git
cd blue-wedding-rsvp-site
```

Or simply download the ZIP file and unzip it.

### 2. Open the website

Double-click:

```text
index.html
```

Or run a simple local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## 🔷 Customization Guide

### 🩵 Change the couple names

In `index.html`, search for the main heading and replace the placeholder names:

```html
<h1>Your Name & Partner Name</h1>
```

### 💙 Change the wedding date and venue

Search for the wedding detail cards and update the date, time, venue, and city.

### 🌊 Change the floral background image

Replace this file with your own image:

```text
blue-floral-border.png
```

Or change the CSS background image inside `index.html`:

```css
background-image: url("your-new-image.png");
```

### 🧊 Change the card size

Look for these CSS blocks in `index.html`:

```css
.hero-card {
  width: min(720px, 92vw);
  padding: 52px 42px;
}

section {
  padding: 54px;
}

.detail-card {
  padding: 26px;
}
```

Increase or decrease the `width` and `padding` values to adjust the card size.

### 🦋 Edit the Q&A questions

Inside the Q&A section, each question uses a `<details>` block:

```html
<details class="faq-item">
  <summary>
    <span>When should I RSVP by?</span>
    <span class="faq-icon"></span>
  </summary>
  <p>Please RSVP by September 25, 2026.</p>
</details>
```

Change the question inside `<summary>` and the answer inside `<p>`.

---

## 🪼 RSVP + Google Sheets Setup

The RSVP form can be connected to Google Sheets using Google Apps Script.

Suggested spreadsheet columns:

```text
Timestamp | Full Name | Email | Attendance | Guest Count | Meal Preference | Guest Names | Allergies | Message
```

Then deploy a Google Apps Script Web App and paste the Web App URL into the RSVP JavaScript section:

```javascript
const scriptURL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

After setup, new RSVP submissions will automatically appear as rows in your Google Sheet.

---

## 🚙 Deployment

Because this is a static website, it can be hosted in several simple ways:

| Platform | Steps |
|---|---|
| 🩵 GitHub Pages | Push the project → Settings → Pages → choose branch → Save |
| 💙 Netlify | Drag and drop the project folder or ZIP file into Netlify |
| 🌊 Any Web Host | Upload `index.html`, `thank-you.html`, and image files |

---

## 💌 Why I Built This

This website was created to make wedding RSVP collection simple, pretty, and personal.  
Instead of using a plain form, the design gives guests a soft blue floral experience that matches the wedding color palette.

The goal is to keep everything:

- 🩵 Easy for guests to understand
- 💙 Easy for the couple to update
- 🦋 Pretty enough to match the wedding theme
- 🧊 Lightweight enough to host for free or low cost

---

## 🧭 Project Reflection

Through this project, I practiced:

- Building a polished one-page event website
- Designing with a consistent wedding color palette
- Creating responsive layouts for desktop and mobile
- Styling cards, forms, and FAQ accordions with CSS
- Connecting a front-end RSVP form to simple response collection options
- Keeping the website easy to maintain without a full backend

This project works as both a real wedding tool and a reusable template for future event RSVP websites.

---

## ✅ Status

🩵 **In progress / customizable** — ready to personalize with final wedding details.

Possible future improvements:

- 💙 Add engagement photos or couple story section
- 🦋 Add a map link to the venue
- 🌊 Add bilingual English/Chinese text
- 🧊 Add password protection for privacy
- 🫐 Add automatic RSVP confirmation emails
- 🔷 Add separate guest groups or invitation-only RSVP validation

---

## 📄 License

MIT — free to use, modify, and personalize for your own wedding or event website.

