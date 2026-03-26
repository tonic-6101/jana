import { c as d, e as h, f as S, h as y, g as b, F as k, i as O, _ as j, a as F, j as N, S as T, k as C, l as E, m as J, b as v, n as B, d as I, t as P } from "./dock-settings-dd46d2e2.js";
import "/assets/dock/js/vendor/vue.esm.js";
import "/assets/dock/js/vendor/vue-router.esm.js";
async function u(r, n, i = {}) {
  n || (n = {});
  let l = Object.assign(
    {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "X-Frappe-Site-Name": window.location.hostname
    },
    i.headers || {}
  );
  window.csrf_token && window.csrf_token !== "{{ csrf_token }}" && (l["X-Frappe-CSRF-Token"] = window.csrf_token);
  let p = r.startsWith("/") ? r : `/api/method/${r}`;
  const t = await fetch(p, {
    method: "POST",
    headers: l,
    body: JSON.stringify(n)
  });
  if (t.ok) {
    const a = await t.json();
    if (a.docs || r === "login")
      return a;
    if (a.exc)
      try {
        console.groupCollapsed(r), console.log(`method: ${r}`), console.log("params:", n);
        let e = JSON.parse(a.exc);
        for (let o of e)
          console.log(o);
        console.groupEnd();
      } catch (e) {
        console.warn("Error printing debug messages", e);
      }
    return a.message;
  } else {
    let a = await t.text(), e, o;
    try {
      e = JSON.parse(a);
    } catch {
    }
    let g = [
      [r, e.exc_type, e._error_message].filter(Boolean).join(" ")
    ];
    if (e.exc) {
      o = e.exc;
      try {
        o = JSON.parse(o)[0], console.log(o);
      } catch {
      }
    }
    let s = new Error(g.join(`
`));
    throw s.exc_type = e.exc_type, s.exc = o, s.status = t.status, s.messages = e._server_messages ? JSON.parse(e._server_messages) : [], s.messages = s.messages.concat(e.message), s.messages = s.messages.map((c) => {
      try {
        return JSON.parse(c).message;
      } catch {
        return c;
      }
    }), s.messages = s.messages.filter(Boolean), s.messages.length || (s.messages = e._error_message ? [e._error_message] : ["Internal Server Error"]), i.onError && i.onError({ response: t, status: t.status, error: s }), s;
  }
}
export {
  d as Autocomplete,
  h as Badge,
  S as Button,
  y as Checkbox,
  b as Combobox,
  k as FeatherIcon,
  O as FormControl,
  j as FormLabel,
  F as LoadingIndicator,
  N as Popover,
  T as Select,
  C as Switch,
  E as TextInput,
  J as Textarea,
  v as Toast,
  B as Tooltip,
  u as call,
  I as debounce,
  P as toast
};
