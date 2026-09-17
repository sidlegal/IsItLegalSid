(function () {
  var config = window.SITE_CONFIG || {};
  var form = document.getElementById("contact-form");
  var submitBtn = document.getElementById("contact-submit");
  var errorEl = document.getElementById("contact-error");
  var successEl = document.getElementById("contact-success");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorEl.classList.add("hidden");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    submitContact(data)
      .then(function () {
        form.classList.add("hidden");
        successEl.classList.remove("hidden");
      })
      .catch(function () {
        errorEl.classList.remove("hidden");
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      });
  });

  function submitContact(data) {
    if (!config.formEndpoint) {
      console.log("Contact form submission (no formEndpoint configured):", data);
      return Promise.resolve();
    }
    return fetch(config.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        subject: "New website message from " + data.name,
        ...data
      })
    }).then(function (res) {
      if (!res.ok) throw new Error("Request failed");
    });
  }
})();
