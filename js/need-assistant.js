(function () {
  var config = window.SITE_CONFIG || {};

  // Populate the "matter type" select from shared config.
  var matterSelect = document.getElementById("matter");
  if (matterSelect && config.practiceAreas) {
    config.practiceAreas.forEach(function (area) {
      var opt = document.createElement("option");
      opt.value = area.slug;
      opt.textContent = area.name;
      matterSelect.appendChild(opt);
    });
  }

  var form = document.getElementById("intake-form");
  var submitBtn = document.getElementById("intake-submit");
  var errorEl = document.getElementById("intake-error");
  var bookingStep = document.getElementById("booking-step");
  var bookingNote = document.getElementById("booking-note");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorEl.classList.add("hidden");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      matter: form.matter.value,
      description: form.description.value.trim()
    };

    submitIntake(data)
      .catch(function () {
        // Even if delivery fails, don't block the person from booking —
        // just move them straight to Calendly.
      })
      .then(function () {
        showBookingStep(data);
      });
  });

  function submitIntake(data) {
    if (!config.formEndpoint) {
      console.log("Booking intake (no formEndpoint configured):", data);
      return Promise.resolve();
    }
    return fetch(config.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        subject: "New consultation request: " + data.name,
        ...data
      })
    }).then(function (res) {
      if (!res.ok) throw new Error("Request failed");
    });
  }

  function showBookingStep(data) {
    var matterLabel = data.matter;
    if (config.practiceAreas) {
      var found = config.practiceAreas.find(function (a) {
        return a.slug === data.matter;
      });
      if (found) matterLabel = found.name;
    }

    var firstName = (data.name || "").split(" ")[0] || "there";
    bookingNote.textContent =
      "Thanks, " + firstName + " — your details are in. Pick a time below and " +
      (config.founder || "we") + " will see your matter (" + matterLabel +
      ") ahead of the call.";

    form.classList.add("hidden");
    bookingStep.classList.remove("hidden");

    mountCalendly({
      name: data.name,
      email: data.email,
      notes: (matterLabel + ": " + data.description).slice(0, 500)
    });
  }

  function mountCalendly(prefill) {
    var url = new URL(config.calendlyUrl);
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("primary_color", "9c7a3c");
    url.searchParams.set("text_color", "14213d");
    if (prefill.name) url.searchParams.set("name", prefill.name);
    if (prefill.email) url.searchParams.set("email", prefill.email);
    if (prefill.notes) url.searchParams.set("a1", prefill.notes);

    var embedEl = document.getElementById("calendly-embed");
    embedEl.setAttribute("data-url", url.toString());

    var script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }
})();
