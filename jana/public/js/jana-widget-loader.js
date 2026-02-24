/**
 * Jana AI Widget Loader
 *
 * Include this script in any Frappe app's HTML to add the Jana chat widget.
 * Stable URL: /assets/jana/js/jana-widget-loader.js
 *
 * Usage:
 *   <script src="/assets/jana/js/jana-widget-loader.js" defer></script>
 */
(function () {
  // Don't load on Jana's own SPA (it has its own chat UI)
  if (location.pathname.startsWith("/jana")) return;

  // Don't double-load if the Desk bundle already loaded the widget
  if (document.getElementById("jana-chat-widget")) return;

  // Get CSRF token from available sources
  function getCsrfToken() {
    if (window.csrf_token) return window.csrf_token;
    var m = document.cookie.match(/csrf_token=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : "";
  }

  var token = getCsrfToken();
  if (!token) return; // Not authenticated

  // Fetch bundle URLs from Jana's API, then load JS + CSS
  fetch("/api/method/jana.api.boot.get_widget_bootstrap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Frappe-CSRF-Token": token,
    },
  })
    .then(function (r) {
      return r.ok ? r.json() : null;
    })
    .then(function (data) {
      if (!data || !data.message) return;
      var info = data.message;

      // Load CSS
      if (info.css_url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = info.css_url;
        document.head.appendChild(link);
      }

      // Load JS (the widget bundle mounts itself)
      if (info.js_url) {
        var script = document.createElement("script");
        script.src = info.js_url;
        document.body.appendChild(script);
      }
    })
    .catch(function () {
      // Jana not available — fail silently
    });
})();
