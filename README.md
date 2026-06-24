# 🩵 Kathy & Kanna Wedding RSVP

A soft blue wedding website created for **Kathy & Kanna’s October 25, 2026 celebration**.
The site includes wedding details, schedule information, a Q&A section, and a separate interactive RSVP experience.

---

## 💙 Overview

This project is a custom wedding RSVP website designed with a soft blue and gold visual theme.
The main page introduces the wedding details, while the RSVP page provides a guided, step-by-step form for guests.

The goal of this project is to make the wedding website feel:

🩵 Elegant and simple

🩵 Soft, romantic, and blue-themed

🩵 Easy for guests to navigate

🩵 Mobile-friendly

🩵 More interactive than a traditional RSVP form

---

## ✨ Features

🩵 **Soft blue wedding design**

Uses powder blue, dusty blue, ink blue, soft white, and champagne gold.

🩵 **Separate RSVP page**

The main page stays clean, while the RSVP form has its own guided experience.

🩵 **Interactive RSVP flow**

Guests answer one question at a time instead of seeing a long form all at once.

🩵 **Conditional RSVP questions**

If a guest accepts, they are asked for guest count, guest names, dietary needs, and a message.
If a guest declines, they are only asked to leave a message.

🩵 **Guest name fields based on guest count**

If the guest selects 3 attendees, the form shows 3 separate name fields.

🩵 **Dietary needs dropdown**

Guests can choose common dietary restrictions or select “Other” for custom details.

🩵 **Animated accept / decline flow**

The RSVP page includes soft animated feedback after the guest selects accept or decline.

🩵 **Q&A accordion section**

Guests can click each question to expand or hide the answer.

🩵 **Responsive layout**

The website adapts for desktop and mobile screens.

---

## 🕊️ Pages

### `index.html`

The main wedding website page.

Includes:

🩵 Hero section

🩵 Wedding details

🩵 Schedule

🩵 RSVP card linking to the RSVP page

🩵 Q&A accordion

🩵 Developer portfolio footer

### `rsvp.html`

The interactive RSVP page.

Includes:

🩵 Step-by-step RSVP form

🩵 Progress bar

🩵 Conditional questions

🩵 Accept / decline animation

🩵 Final review screen

🩵 Thank-you confirmation screen

---

## 📁 Project Structure

```text
WeddingRSVP
├── README.md
├── index.html
├── rsvp.html
├── css
│   └── styles.css
└── js
    ├── index.js
    └── rsvp.js
```

---

## 🛠️ Built With

🩵 HTML

🩵 CSS

🩵 JavaScript

🩵 Font Awesome

🩵 GitHub Pages

---

## 🤍 Design Palette

| Color Name     | Hex       |
| -------------- | --------- |
| Ink Blue       | `#1F5A93` |
| Powder Blue    | `#B8CFE3` |
| Dusty Blue     | `#7D97AA` |
| Soft White     | `#F8FAF7` |
| Champagne Gold | `#B6A36A` |

---

## 🔗 RSVP Data Collection

The RSVP form is designed to support Google Sheets through Google Apps Script.

To connect the form:

🩵 Create a Google Sheet

🩵 Add the RSVP column headers

🩵 Create a Google Apps Script Web App

🩵 Paste the Web App URL into `js/rsvp.js`

In `js/rsvp.js`, update:

```javascript
const GOOGLE_SCRIPT_URL = "";
```

to:

```javascript
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
```

---

## 🩵 Suggested Google Sheet Columns

```text
Timestamp
Full Name
Email
Attendance
Guest Count
Guest Names
Dietary Option
Dietary Other
Message
```

---

## 🌐 Deployment

This site can be hosted with GitHub Pages.

After pushing changes to GitHub:

🩵 Go to the repository settings

🩵 Open Pages settings

🩵 Select the `main` branch

🩵 Save and wait for GitHub Pages to publish the site

---

## 📌 Notes

🩵 `README.md` should be kept instead of `README.txt` because GitHub displays Markdown files more nicely.

🩵 The RSVP page does not need a separate `thank-you.html` page because the thank-you screen is built into `rsvp.html`.

🩵 The shared visual styling is stored in `css/styles.css`.

🩵 The main page animation logic is stored in `js/index.js`.

🩵 The RSVP form logic is stored in `js/rsvp.js`.

---

## 💙 Developer

Created with love by
**Kawing Tam**

[Developer Portfolio](https://kawingtam.github.io/)

---
