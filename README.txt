Kathy & Kanna Wedding RSVP — Final Shared CSS Version

Files:
- index.html: main wedding website
- rsvp.html: separate interactive RSVP page
- css/styles.css: shared styles for both pages
- js/rsvp.js: RSVP step-by-step logic

What changed:
- Shared topbar style on both pages
- Shared blue/gold colors in one CSS file
- RSVP moved to separate page
- Main page RSVP section is now a simple Start RSVP button
- Removed thank-you.html dependency
- RSVP shows internal Thank You screen after submission
- No meal preference section
- Dietary/allergy field is a dropdown with Other option
- Guest name fields match the selected guest count
- Accept/decline animation screens included

Important:
- GitHub Pages cannot collect form submissions by itself.
- For actual RSVP collection, deploy on Netlify Forms or paste your Google Apps Script URL into js/rsvp.js.
