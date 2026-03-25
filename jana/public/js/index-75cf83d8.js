import { e as d, f as h, g as S, i as y, h as b, F as k, j as O, _ as T, a as j, k as F, S as N, l as C, b as E, m as J, n as v, c as B, o as I, d as P, t as A } from "./dock-settings-930c22e8.js";
import "/assets/dock/js/vendor/vue.esm.js";
import "/assets/dock/js/vendor/vue-router.esm.js";
async function u(a, n, i = {}) {
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
  let p = a.startsWith("/") ? a : `/api/method/${a}`;
  const t = await fetch(p, {
    method: "POST",
    headers: l,
    body: JSON.stringify(n)
  });
  if (t.ok) {
    const r = await t.json();
    if (r.docs || a === "login")
      return r;
    if (r.exc)
      try {
        console.groupCollapsed(a), console.log(`method: ${a}`), console.log("params:", n);
        let e = JSON.parse(r.exc);
        for (let o of e)
          console.log(o);
        console.groupEnd();
      } catch (e) {
        console.warn("Error printing debug messages", e);
      }
    return r.message;
  } else {
    let r = await t.text(), e, o;
    try {
      e = JSON.parse(r);
    } catch {
    }
    let g = [
      [a, e.exc_type, e._error_message].filter(Boolean).join(" ")
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
  T as FormLabel,
  j as LoadingIndicator,
  F as Popover,
  N as Select,
  C as Switch,
  E as Tabs,
  J as TextInput,
  v as Textarea,
  B as Toast,
  I as Tooltip,
  u as call,
  P as debounce,
  A as toast
};
