/* Interactive RSVP flow
   To connect with Google Sheets, paste your Google Apps Script Web App URL below.
   Leave it blank for local/front-end testing.
*/
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzqsl9zI0OHJPQmOh8T2Ecd2eTh2YxGhNG5ifZRvPFOHO2Ni-E-yEYIWgf445K0d31l/exec";

const form = document.getElementById("interactive-rsvp");
const steps = Array.from(document.querySelectorAll(".rsvp-step"));
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const formButtons = document.getElementById("form-buttons");
const notice = document.getElementById("notice");
const progressFill = document.getElementById("progress-fill");
const stepLabel = document.getElementById("step-label");
const stepPercent = document.getElementById("step-percent");
const reviewBox = document.getElementById("review-box");
const guestCountSelect = document.getElementById("guest-count");
const guestNamesHidden = document.getElementById("guest-names-hidden");
const guestNameHelp = document.getElementById("guest-names-help");
const dietaryOption = document.getElementById("dietary-option");
const dietaryOtherWrap = document.getElementById("dietary-other-wrap");
const dietaryOther = document.getElementById("dietary-other");

const baseFlow = ["step-name", "step-email", "step-attendance"];

const acceptFlow = [
  "step-name",
  "step-email",
  "step-attendance",
  "step-accept-animation",
  "step-guest-count",
  "step-guest-names",
  "step-dietary",
  "step-message",
  "step-review"
];

const declineFlow = [
  "step-name",
  "step-email",
  "step-attendance",
  "step-decline-animation",
  "step-message",
  "step-review"
];

let currentIndex = 0;
let submitted = false;

function getAttendance() {
  const checked = form.querySelector('input[name="attendance"]:checked');
  return checked ? checked.value : "";
}

function isAccepting() {
  return getAttendance() === "Joyfully accepts";
}

function getFlow() {
  const attendance = getAttendance();
  if (attendance === "Joyfully accepts") return acceptFlow;
  if (attendance === "Regretfully declines") return declineFlow;
  return baseFlow;
}

function clearNotice() {
  notice.textContent = "";
  notice.classList.remove("show");
}

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add("show");
}

function isRequiredField(field) {
  if (field.disabled) return false;

  const rule = field.dataset.required;
  if (rule === "always") return true;
  if (rule === "accept") return isAccepting();
  if (rule === "other-dietary") return dietaryOption.value === "Other";

  return false;
}

function updateGuestNameInputs() {
  const count = parseInt(guestCountSelect.value || "0", 10);
  const wrappers = Array.from(document.querySelectorAll(".guest-name-field"));

  wrappers.forEach((wrapper) => {
    const index = parseInt(wrapper.dataset.guestField, 10);
    const input = wrapper.querySelector("input");
    const shouldShow = count > 0 && index <= count;

    wrapper.classList.toggle("visible", shouldShow);
    input.disabled = !shouldShow;

    if (!shouldShow) input.value = "";
  });

  if (count > 0) {
    guestNameHelp.textContent = `Please enter exactly ${count} ${count === 1 ? "name" : "names"}, one per box.`;
  } else {
    guestNameHelp.textContent = "Please enter one name per box.";
  }

  updateGuestNamesHidden();
}

function updateGuestNamesHidden() {
  const values = Array.from(document.querySelectorAll(".guest-name-field.visible input"))
    .map((input, index) => {
      const name = input.value.trim();
      return name ? `Guest ${index + 1}: ${name}` : "";
    })
    .filter(Boolean);

  guestNamesHidden.value = values.join("\n");
}

function getGuestNamesDisplay() {
  updateGuestNamesHidden();
  return guestNamesHidden.value || "—";
}

function updateDietaryOther() {
  const showOther = dietaryOption.value === "Other";

  dietaryOtherWrap.classList.toggle("visible", showOther);
  dietaryOther.disabled = !showOther;
  dietaryOther.dataset.required = showOther ? "other-dietary" : "";

  if (!showOther) dietaryOther.value = "";
}

function getDietaryDisplay() {
  if (!isAccepting()) return "—";

  if (dietaryOption.value === "Other") {
    return dietaryOther.value.trim() ? `Other: ${dietaryOther.value.trim()}` : "Other";
  }

  return dietaryOption.value || "None";
}

function validateStep(stepId) {
  clearNotice();
  updateGuestNamesHidden();
  updateDietaryOther();

  if (stepId.includes("animation") || stepId === "step-thank-you") return true;

  const step = document.getElementById(stepId);
  const requiredFields = Array.from(step.querySelectorAll("[data-required]")).filter(isRequiredField);
  const checkedRadioNames = new Set();

  requiredFields.forEach((field) => field.setAttribute("required", "required"));

  for (const field of requiredFields) {
    if (field.type === "radio") {
      if (checkedRadioNames.has(field.name)) continue;
      checkedRadioNames.add(field.name);

      const selected = form.querySelector(`input[name="${field.name}"]:checked`);
      if (!selected) {
        showNotice("Please choose one option before continuing.");
        field.focus();
        requiredFields.forEach((item) => item.removeAttribute("required"));
        return false;
      }
    } else if (!field.checkValidity() || !field.value.trim()) {
      showNotice("Please complete this question before continuing.");
      field.reportValidity();
      requiredFields.forEach((item) => item.removeAttribute("required"));
      return false;
    }
  }

  requiredFields.forEach((field) => field.removeAttribute("required"));
  return true;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

function updateReview() {
  updateGuestNamesHidden();

  const attendance = getAttendance();
  const fullName = document.getElementById("full-name").value || "—";
  const email = document.getElementById("email").value || "—";
  const guestCount = guestCountSelect.value || "—";
  const message = document.getElementById("message").value || "—";

  let reviewHtml = `
    <div class="review-section">
      <h3>Contact</h3>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    </div>

    <div class="review-section">
      <h3>RSVP</h3>
      <p><strong>Attendance:</strong> ${escapeHtml(attendance || "—")}</p>
    </div>
  `;

  if (attendance === "Joyfully accepts") {
    reviewHtml += `
      <div class="review-section">
        <h3>Guests</h3>
        <p><strong>Number attending:</strong> ${escapeHtml(guestCount)}</p>
        <p class="review-guest-names">${escapeHtml(getGuestNamesDisplay())}</p>
      </div>

      <div class="review-section">
        <h3>Dietary Needs</h3>
        <p>${escapeHtml(getDietaryDisplay())}</p>
      </div>
    `;
  }

  reviewHtml += `
    <div class="review-section">
      <h3>Message</h3>
      <p>${escapeHtml(message)}</p>
    </div>
  `;

  reviewBox.innerHTML = reviewHtml;
}

function showStep(index) {
  if (submitted) return;

  const flow = getFlow();
  currentIndex = Math.max(0, Math.min(index, flow.length - 1));
  const currentStepId = flow[currentIndex];

  steps.forEach((step) => step.classList.remove("active"));
  document.getElementById(currentStepId).classList.add("active");

  clearNotice();
  updateGuestNameInputs();
  updateDietaryOther();
  updateReview();

  const progress = Math.round(((currentIndex + 1) / flow.length) * 100);
  progressFill.style.width = `${progress}%`;
  stepLabel.textContent = `Step ${currentIndex + 1} of ${flow.length}`;
  stepPercent.textContent = `${progress}%`;

  backBtn.classList.toggle("hidden", currentIndex === 0);
  nextBtn.style.display = currentStepId === "step-review" ? "none" : "inline-flex";
  submitBtn.style.display = currentStepId === "step-review" ? "inline-flex" : "none";
  formButtons.style.display = "flex";
}

function showThankYou() {
  submitted = true;

  steps.forEach((step) => step.classList.remove("active"));
  document.getElementById("step-thank-you").classList.add("active");

  progressFill.style.width = "100%";
  stepLabel.textContent = "Complete";
  stepPercent.textContent = "100%";

  formButtons.style.display = "none";
  clearNotice();
}

async function submitToBackend() {
  const formData = new FormData(form);

  if (GOOGLE_SCRIPT_URL.trim()) {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });
    return;
  }

  // Netlify Forms fallback. This works after deploying on Netlify.
  const encoded = new URLSearchParams(formData).toString();
  await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encoded
  });
}

nextBtn.addEventListener("click", () => {
  const flow = getFlow();
  const currentStepId = flow[currentIndex];

  if (!validateStep(currentStepId)) return;

  const updatedFlow = getFlow();
  const nextIndex = currentIndex + 1 >= updatedFlow.length ? updatedFlow.length - 1 : currentIndex + 1;
  showStep(nextIndex);
});

backBtn.addEventListener("click", () => {
  showStep(currentIndex - 1);
});

form.querySelectorAll('input[name="attendance"]').forEach((input) => {
  input.addEventListener("change", () => {
    clearNotice();

    document.querySelectorAll(".choice-card").forEach((card) => {
      card.classList.remove("choice-selected", "accept-choice", "decline-choice");
    });

    const selectedCard = input.closest(".choice-card");
    if (selectedCard) {
      selectedCard.classList.add("choice-selected");
      selectedCard.classList.add(input.value === "Joyfully accepts" ? "accept-choice" : "decline-choice");
    }

    if (getAttendance() === "Regretfully declines") {
      guestCountSelect.value = "";
      document.querySelectorAll(".guest-name-field input").forEach((guestInput) => {
        guestInput.value = "";
      });
      dietaryOption.value = "None";
      dietaryOther.value = "";
    }

    updateGuestNameInputs();
    updateDietaryOther();

    // Show the happy accept / decline animation immediately after the guest makes a choice.
    const flow = getFlow();
    const currentStepId = flow[currentIndex];
    if (currentStepId === "step-attendance") {
      window.setTimeout(() => showStep(currentIndex + 1), 360);
    }
  });
});

guestCountSelect.addEventListener("change", updateGuestNameInputs);

document.querySelectorAll(".guest-name-field input").forEach((input) => {
  input.addEventListener("input", updateGuestNamesHidden);
});

dietaryOption.addEventListener("change", updateDietaryOther);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const flow = getFlow();
  updateGuestNamesHidden();
  updateDietaryOther();

  for (let i = 0; i < flow.length; i++) {
    const stepId = flow[i];
    if (stepId === "step-review" || stepId.includes("animation")) continue;

    if (!validateStep(stepId)) {
      showStep(i);
      return;
    }
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    await submitToBackend();
    showThankYou();
  } catch (error) {
    showNotice("Your RSVP is ready, but the form connection is not set up yet. Please connect Google Sheets or deploy on Netlify.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});

showStep(0);
