var pi = (e, n, t) => {
  if (!n.has(e))
    throw TypeError("Cannot " + t);
};
var mn = (e, n, t) => (pi(e, n, "read from private field"), t ? t.call(e) : n.get(e)), Qr = (e, n, t) => {
  if (n.has(e))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(e) : n.set(e, t);
};
import * as ln from "/assets/dock/js/vendor/vue.esm.js";
import { markRaw as un, openBlock as A, createElementBlock as H, createElementVNode as I, computed as k, unref as s, shallowRef as Kt, watch as pe, triggerRef as el, onScopeDispose as dr, ref as M, onUnmounted as Ge, watchEffect as Ae, onMounted as we, cloneVNode as cr, h as ae, Fragment as be, defineComponent as N, inject as kn, provide as jn, reactive as Ht, nextTick as ge, toRaw as Tt, shallowReadonly as Ft, getCurrentScope as Xl, customRef as vi, toValue as ke, onBeforeUnmount as Jl, readonly as Zl, getCurrentInstance as Dt, effectScope as Ql, toRefs as $e, isRef as _n, toHandlerKey as yi, camelize as ea, toRef as mi, Comment as hi, mergeProps as Q, createBlock as q, normalizeStyle as yt, withCtx as P, renderSlot as F, Teleport as fr, createCommentVNode as J, createVNode as V, renderList as ot, watchPostEffect as pr, mergeDefaults as gi, withModifiers as xe, withKeys as At, watchSyncEffect as bi, withMemo as xi, resolveDynamicComponent as Je, normalizeProps as Ie, createTextVNode as _e, toDisplayString as W, guardReactiveProps as Be, onBeforeMount as wi, toHandlers as _i, normalizeClass as le, useSlots as ta, withDirectives as Le, vShow as tl, mergeModels as Zn, useModel as vr, useAttrs as ao, createSlots as Vn, vModelCheckbox as Qn, vModelText as Vt, resolveComponent as Si, vModelSelect as Do } from "/assets/dock/js/vendor/vue.esm.js";
import { useRouter as Ci } from "/assets/dock/js/vendor/vue-router.esm.js";
function na(e, n, t) {
  var r;
  return function() {
    var o = this, l = arguments, a = function() {
      r = void 0, t || e.apply(o, l);
    }, i = t && !r;
    clearTimeout(r), r = window.setTimeout(a, n), i && e.apply(o, l);
  };
}
const Ai = {
  class: "lucide lucide-x",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Oi(e, n) {
  return A(), H("svg", Ai, [...n[0] || (n[0] = [
    I("path", { d: "M18 6 6 18" }, null, -1),
    I("path", { d: "m6 6 12 12" }, null, -1)
  ])]);
}
const Ei = un({ name: "lucide-x", render: Oi }), Ti = {
  class: "lucide lucide-info",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function ki(e, n) {
  return A(), H("svg", Ti, [...n[0] || (n[0] = [
    I("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }, null, -1),
    I("path", { d: "M12 16v-4" }, null, -1),
    I("path", { d: "M12 8h.01" }, null, -1)
  ])]);
}
const ji = un({ name: "lucide-info", render: ki });
function nn(e, n, t) {
  let r = t.initialDeps ?? [], o, l = !0;
  function a() {
    var i, u, c;
    let d;
    t.key && ((i = t.debug) != null && i.call(t)) && (d = Date.now());
    const f = e();
    if (!(f.length !== r.length || f.some((y, m) => r[m] !== y)))
      return o;
    r = f;
    let v;
    if (t.key && ((u = t.debug) != null && u.call(t)) && (v = Date.now()), o = n(...f), t.key && ((c = t.debug) != null && c.call(t))) {
      const y = Math.round((Date.now() - d) * 100) / 100, m = Math.round((Date.now() - v) * 100) / 100, S = m / 16, x = (h, w) => {
        for (h = String(h); h.length < w; )
          h = " " + h;
        return h;
      };
      console.info(
        `%c⏱ ${x(m, 5)} /${x(y, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * S, 120)
        )}deg 100% 31%);`,
        t == null ? void 0 : t.key
      );
    }
    return t != null && t.onChange && !(l && t.skipInitialOnChange) && t.onChange(o), l = !1, o;
  }
  return a.updateDeps = (i) => {
    r = i;
  }, a;
}
function nl(e, n) {
  if (e === void 0)
    throw new Error(`Unexpected undefined${n ? `: ${n}` : ""}`);
  return e;
}
const Pi = (e, n) => Math.abs(e - n) < 1.01, Ii = (e, n, t) => {
  let r;
  return function(...o) {
    e.clearTimeout(r), r = e.setTimeout(() => n.apply(this, o), t);
  };
}, ol = (e) => {
  const { offsetWidth: n, offsetHeight: t } = e;
  return { width: n, height: t };
}, Mi = (e) => e, Ri = (e) => {
  const n = Math.max(e.startIndex - e.overscan, 0), t = Math.min(e.endIndex + e.overscan, e.count - 1), r = [];
  for (let o = n; o <= t; o++)
    r.push(o);
  return r;
}, Di = (e, n) => {
  const t = e.scrollElement;
  if (!t)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  const o = (a) => {
    const { width: i, height: u } = a;
    n({ width: Math.round(i), height: Math.round(u) });
  };
  if (o(ol(t)), !r.ResizeObserver)
    return () => {
    };
  const l = new r.ResizeObserver((a) => {
    const i = () => {
      const u = a[0];
      if (u != null && u.borderBoxSize) {
        const c = u.borderBoxSize[0];
        if (c) {
          o({ width: c.inlineSize, height: c.blockSize });
          return;
        }
      }
      o(ol(t));
    };
    e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(i) : i();
  });
  return l.observe(t, { box: "border-box" }), () => {
    l.unobserve(t);
  };
}, rl = {
  passive: !0
}, ll = typeof window > "u" ? !0 : "onscrollend" in window, Li = (e, n) => {
  const t = e.scrollElement;
  if (!t)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  let o = 0;
  const l = e.options.useScrollendEvent && ll ? () => {
  } : Ii(
    r,
    () => {
      n(o, !1);
    },
    e.options.isScrollingResetDelay
  ), a = (d) => () => {
    const { horizontal: f, isRtl: p } = e.options;
    o = f ? t.scrollLeft * (p && -1 || 1) : t.scrollTop, l(), n(o, d);
  }, i = a(!0), u = a(!1);
  t.addEventListener("scroll", i, rl);
  const c = e.options.useScrollendEvent && ll;
  return c && t.addEventListener("scrollend", u, rl), () => {
    t.removeEventListener("scroll", i), c && t.removeEventListener("scrollend", u);
  };
}, $i = (e, n, t) => {
  if (n != null && n.borderBoxSize) {
    const r = n.borderBoxSize[0];
    if (r)
      return Math.round(
        r[t.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return e[t.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, qi = (e, {
  adjustments: n = 0,
  behavior: t
}, r) => {
  var o, l;
  const a = e + n;
  (l = (o = r.scrollElement) == null ? void 0 : o.scrollTo) == null || l.call(o, {
    [r.options.horizontal ? "left" : "top"]: a,
    behavior: t
  });
};
class Bi {
  constructor(n) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.currentScrollToIndex = null, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.laneAssignments = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.prevLanes = void 0, this.lanesChangedFlag = !1, this.lanesSettling = !1, this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.observer = /* @__PURE__ */ (() => {
      let t = null;
      const r = () => t || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : t = new this.targetWindow.ResizeObserver((o) => {
        o.forEach((l) => {
          const a = () => {
            this._measureElement(l.target, l);
          };
          this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(a) : a();
        });
      }));
      return {
        disconnect: () => {
          var o;
          (o = r()) == null || o.disconnect(), t = null;
        },
        observe: (o) => {
          var l;
          return (l = r()) == null ? void 0 : l.observe(o, { box: "border-box" });
        },
        unobserve: (o) => {
          var l;
          return (l = r()) == null ? void 0 : l.unobserve(o);
        }
      };
    })(), this.range = null, this.setOptions = (t) => {
      Object.entries(t).forEach(([r, o]) => {
        typeof o > "u" && delete t[r];
      }), this.options = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: Mi,
        rangeExtractor: Ri,
        onChange: () => {
        },
        measureElement: $i,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: !0,
        isRtl: !1,
        useScrollendEvent: !1,
        useAnimationFrameWithResizeObserver: !1,
        ...t
      };
    }, this.notify = (t) => {
      var r, o;
      (o = (r = this.options).onChange) == null || o.call(r, this, t);
    }, this.maybeNotify = nn(
      () => (this.calculateRange(), [
        this.isScrolling,
        this.range ? this.range.startIndex : null,
        this.range ? this.range.endIndex : null
      ]),
      (t) => {
        this.notify(t);
      },
      {
        key: process.env.NODE_ENV !== "production" && "maybeNotify",
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    ), this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((t) => t()), this.unsubs = [], this.observer.disconnect(), this.scrollElement = null, this.targetWindow = null;
    }, this._didMount = () => () => {
      this.cleanup();
    }, this._willUpdate = () => {
      var t;
      const r = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== r) {
        if (this.cleanup(), !r) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = r, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((t = this.scrollElement) == null ? void 0 : t.window) ?? null, this.elementsCache.forEach((o) => {
          this.observer.observe(o);
        }), this.unsubs.push(
          this.options.observeElementRect(this, (o) => {
            this.scrollRect = o, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (o, l) => {
            this.scrollAdjustments = 0, this.scrollDirection = l ? this.getScrollOffset() < o ? "forward" : "backward" : null, this.scrollOffset = o, this.isScrolling = l, this.maybeNotify();
          })
        ), this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
      }
    }, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (t, r) => {
      const o = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
      for (let a = r - 1; a >= 0; a--) {
        const i = t[a];
        if (o.has(i.lane))
          continue;
        const u = l.get(
          i.lane
        );
        if (u == null || i.end > u.end ? l.set(i.lane, i) : i.end < u.end && o.set(i.lane, !0), o.size === this.options.lanes)
          break;
      }
      return l.size === this.options.lanes ? Array.from(l.values()).sort((a, i) => a.end === i.end ? a.index - i.index : a.end - i.end)[0] : void 0;
    }, this.getMeasurementOptions = nn(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled,
        this.options.lanes
      ],
      (t, r, o, l, a, i) => (this.prevLanes !== void 0 && this.prevLanes !== i && (this.lanesChangedFlag = !0), this.prevLanes = i, this.pendingMeasuredCacheIndexes = [], {
        count: t,
        paddingStart: r,
        scrollMargin: o,
        getItemKey: l,
        enabled: a,
        lanes: i
      }),
      {
        key: !1
      }
    ), this.getMeasurements = nn(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: t, paddingStart: r, scrollMargin: o, getItemKey: l, enabled: a, lanes: i }, u) => {
        if (!a)
          return this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), [];
        if (this.laneAssignments.size > t)
          for (const p of this.laneAssignments.keys())
            p >= t && this.laneAssignments.delete(p);
        this.lanesChangedFlag && (this.lanesChangedFlag = !1, this.lanesSettling = !0, this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), this.pendingMeasuredCacheIndexes = []), this.measurementsCache.length === 0 && !this.lanesSettling && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((p) => {
          this.itemSizeCache.set(p.key, p.size);
        }));
        const c = this.lanesSettling ? 0 : this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [], this.lanesSettling && this.measurementsCache.length === t && (this.lanesSettling = !1);
        const d = this.measurementsCache.slice(0, c), f = new Array(i).fill(
          void 0
        );
        for (let p = 0; p < c; p++) {
          const v = d[p];
          v && (f[v.lane] = p);
        }
        for (let p = c; p < t; p++) {
          const v = l(p), y = this.laneAssignments.get(p);
          let m, S;
          if (y !== void 0 && this.options.lanes > 1) {
            m = y;
            const C = f[m], g = C !== void 0 ? d[C] : void 0;
            S = g ? g.end + this.options.gap : r + o;
          } else {
            const C = this.options.lanes === 1 ? d[p - 1] : this.getFurthestMeasurement(d, p);
            S = C ? C.end + this.options.gap : r + o, m = C ? C.lane : p % this.options.lanes, this.options.lanes > 1 && this.laneAssignments.set(p, m);
          }
          const x = u.get(v), h = typeof x == "number" ? x : this.options.estimateSize(p), w = S + h;
          d[p] = {
            index: p,
            start: S,
            size: h,
            end: w,
            key: v,
            lane: m
          }, f[m] = p;
        }
        return this.measurementsCache = d, d;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getMeasurements",
        debug: () => this.options.debug
      }
    ), this.calculateRange = nn(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (t, r, o, l) => this.range = t.length > 0 && r > 0 ? Fi({
        measurements: t,
        outerSize: r,
        scrollOffset: o,
        lanes: l
      }) : null,
      {
        key: process.env.NODE_ENV !== "production" && "calculateRange",
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = nn(
      () => {
        let t = null, r = null;
        const o = this.calculateRange();
        return o && (t = o.startIndex, r = o.endIndex), this.maybeNotify.updateDeps([this.isScrolling, t, r]), [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          t,
          r
        ];
      },
      (t, r, o, l, a) => l === null || a === null ? [] : t({
        startIndex: l,
        endIndex: a,
        overscan: r,
        count: o
      }),
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualIndexes",
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (t) => {
      const r = this.options.indexAttribute, o = t.getAttribute(r);
      return o ? parseInt(o, 10) : (console.warn(
        `Missing attribute name '${r}={index}' on measured element.`
      ), -1);
    }, this._measureElement = (t, r) => {
      const o = this.indexFromElement(t), l = this.measurementsCache[o];
      if (!l)
        return;
      const a = l.key, i = this.elementsCache.get(a);
      i !== t && (i && this.observer.unobserve(i), this.observer.observe(t), this.elementsCache.set(a, t)), t.isConnected && this.resizeItem(o, this.options.measureElement(t, r, this));
    }, this.resizeItem = (t, r) => {
      const o = this.measurementsCache[t];
      if (!o)
        return;
      const l = this.itemSizeCache.get(o.key) ?? o.size, a = r - l;
      a !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(o, a, this) : o.start < this.getScrollOffset() + this.scrollAdjustments) && (process.env.NODE_ENV !== "production" && this.options.debug && console.info("correction", a), this._scrollToOffset(this.getScrollOffset(), {
        adjustments: this.scrollAdjustments += a,
        behavior: void 0
      })), this.pendingMeasuredCacheIndexes.push(o.index), this.itemSizeCache = new Map(this.itemSizeCache.set(o.key, r)), this.notify(!1));
    }, this.measureElement = (t) => {
      if (!t) {
        this.elementsCache.forEach((r, o) => {
          r.isConnected || (this.observer.unobserve(r), this.elementsCache.delete(o));
        });
        return;
      }
      this._measureElement(t, void 0);
    }, this.getVirtualItems = nn(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (t, r) => {
        const o = [];
        for (let l = 0, a = t.length; l < a; l++) {
          const i = t[l], u = r[i];
          o.push(u);
        }
        return o;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualItems",
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (t) => {
      const r = this.getMeasurements();
      if (r.length !== 0)
        return nl(
          r[oa(
            0,
            r.length - 1,
            (o) => nl(r[o]).start,
            t
          )]
        );
    }, this.getMaxScrollOffset = () => {
      if (!this.scrollElement)
        return 0;
      if ("scrollHeight" in this.scrollElement)
        return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
      {
        const t = this.scrollElement.document.documentElement;
        return this.options.horizontal ? t.scrollWidth - this.scrollElement.innerWidth : t.scrollHeight - this.scrollElement.innerHeight;
      }
    }, this.getOffsetForAlignment = (t, r, o = 0) => {
      if (!this.scrollElement)
        return 0;
      const l = this.getSize(), a = this.getScrollOffset();
      r === "auto" && (r = t >= a + l ? "end" : "start"), r === "center" ? t += (o - l) / 2 : r === "end" && (t -= l);
      const i = this.getMaxScrollOffset();
      return Math.max(Math.min(i, t), 0);
    }, this.getOffsetForIndex = (t, r = "auto") => {
      t = Math.max(0, Math.min(t, this.options.count - 1));
      const o = this.measurementsCache[t];
      if (!o)
        return;
      const l = this.getSize(), a = this.getScrollOffset();
      if (r === "auto")
        if (o.end >= a + l - this.options.scrollPaddingEnd)
          r = "end";
        else if (o.start <= a + this.options.scrollPaddingStart)
          r = "start";
        else
          return [a, r];
      if (r === "end" && t === this.options.count - 1)
        return [this.getMaxScrollOffset(), r];
      const i = r === "end" ? o.end + this.options.scrollPaddingEnd : o.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(i, r, o.size),
        r
      ];
    }, this.isDynamicMode = () => this.elementsCache.size > 0, this.scrollToOffset = (t, { align: r = "start", behavior: o } = {}) => {
      o === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getOffsetForAlignment(t, r), {
        adjustments: void 0,
        behavior: o
      });
    }, this.scrollToIndex = (t, { align: r = "auto", behavior: o } = {}) => {
      o === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), t = Math.max(0, Math.min(t, this.options.count - 1)), this.currentScrollToIndex = t;
      let l = 0;
      const a = 10, i = (c) => {
        if (!this.targetWindow)
          return;
        const d = this.getOffsetForIndex(t, c);
        if (!d) {
          console.warn("Failed to get offset for index:", t);
          return;
        }
        const [f, p] = d;
        this._scrollToOffset(f, { adjustments: void 0, behavior: o }), this.targetWindow.requestAnimationFrame(() => {
          if (!this.targetWindow)
            return;
          const v = () => {
            if (this.currentScrollToIndex !== t)
              return;
            const y = this.getScrollOffset(), m = this.getOffsetForIndex(t, p);
            if (!m) {
              console.warn("Failed to get offset for index:", t);
              return;
            }
            Pi(m[0], y) || u(p);
          };
          this.isDynamicMode() ? this.targetWindow.requestAnimationFrame(v) : v();
        });
      }, u = (c) => {
        this.targetWindow && this.currentScrollToIndex === t && (l++, l < a ? (process.env.NODE_ENV !== "production" && this.options.debug && console.info("Schedule retry", l, a), this.targetWindow.requestAnimationFrame(() => i(c))) : console.warn(
          `Failed to scroll to index ${t} after ${a} attempts.`
        ));
      };
      i(r);
    }, this.scrollBy = (t, { behavior: r } = {}) => {
      r === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getScrollOffset() + t, {
        adjustments: void 0,
        behavior: r
      });
    }, this.getTotalSize = () => {
      var t;
      const r = this.getMeasurements();
      let o;
      if (r.length === 0)
        o = this.options.paddingStart;
      else if (this.options.lanes === 1)
        o = ((t = r[r.length - 1]) == null ? void 0 : t.end) ?? 0;
      else {
        const l = Array(this.options.lanes).fill(null);
        let a = r.length - 1;
        for (; a >= 0 && l.some((i) => i === null); ) {
          const i = r[a];
          l[i.lane] === null && (l[i.lane] = i.end), a--;
        }
        o = Math.max(...l.filter((i) => i !== null));
      }
      return Math.max(
        o - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    }, this._scrollToOffset = (t, {
      adjustments: r,
      behavior: o
    }) => {
      this.options.scrollToFn(t, { behavior: o, adjustments: r }, this);
    }, this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map(), this.laneAssignments = /* @__PURE__ */ new Map(), this.notify(!1);
    }, this.setOptions(n);
  }
}
const oa = (e, n, t, r) => {
  for (; e <= n; ) {
    const o = (e + n) / 2 | 0, l = t(o);
    if (l < r)
      e = o + 1;
    else if (l > r)
      n = o - 1;
    else
      return o;
  }
  return e > 0 ? e - 1 : 0;
};
function Fi({
  measurements: e,
  outerSize: n,
  scrollOffset: t,
  lanes: r
}) {
  const o = e.length - 1, l = (u) => e[u].start;
  if (e.length <= r)
    return {
      startIndex: 0,
      endIndex: o
    };
  let a = oa(
    0,
    o,
    l,
    t
  ), i = a;
  if (r === 1)
    for (; i < o && e[i].end < t + n; )
      i++;
  else if (r > 1) {
    const u = Array(r).fill(0);
    for (; i < o && u.some((d) => d < t + n); ) {
      const d = e[i];
      u[d.lane] = d.end, i++;
    }
    const c = Array(r).fill(t + n);
    for (; a >= 0 && c.some((d) => d >= t); ) {
      const d = e[a];
      c[d.lane] = d.start, a--;
    }
    a = Math.max(0, a - a % r), i = Math.min(o, i + (r - 1 - i % r));
  }
  return { startIndex: a, endIndex: i };
}
function Ni(e) {
  const n = new Bi(s(e)), t = Kt(n), r = n._didMount();
  return pe(
    () => s(e).getScrollElement(),
    (o) => {
      o && n._willUpdate();
    },
    {
      immediate: !0
    }
  ), pe(
    () => s(e),
    (o) => {
      n.setOptions({
        ...o,
        onChange: (l, a) => {
          var i;
          el(t), (i = o.onChange) == null || i.call(o, l, a);
        }
      }), n._willUpdate(), el(t);
    },
    {
      immediate: !0
    }
  ), dr(r), t;
}
function Vi(e) {
  return Ni(
    k(() => ({
      observeElementRect: Di,
      observeElementOffset: Li,
      scrollToFn: qi,
      ...s(e)
    }))
  );
}
function zi(e, n, t) {
  let r = M(t == null ? void 0 : t.value), o = k(() => e.value !== void 0);
  return [k(() => o.value ? e.value : r.value), function(l) {
    return o.value || (r.value = l), n == null ? void 0 : n(l);
  }];
}
function Hi(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((n) => setTimeout(() => {
    throw n;
  }));
}
function eo() {
  let e = [], n = { addEventListener(t, r, o, l) {
    return t.addEventListener(r, o, l), n.add(() => t.removeEventListener(r, o, l));
  }, requestAnimationFrame(...t) {
    let r = requestAnimationFrame(...t);
    n.add(() => cancelAnimationFrame(r));
  }, nextFrame(...t) {
    n.requestAnimationFrame(() => {
      n.requestAnimationFrame(...t);
    });
  }, setTimeout(...t) {
    let r = setTimeout(...t);
    n.add(() => clearTimeout(r));
  }, microTask(...t) {
    let r = { current: !0 };
    return Hi(() => {
      r.current && t[0]();
    }), n.add(() => {
      r.current = !1;
    });
  }, style(t, r, o) {
    let l = t.style.getPropertyValue(r);
    return Object.assign(t.style, { [r]: o }), this.add(() => {
      Object.assign(t.style, { [r]: l });
    });
  }, group(t) {
    let r = eo();
    return t(r), this.add(() => r.dispose());
  }, add(t) {
    return e.push(t), () => {
      let r = e.indexOf(t);
      if (r >= 0)
        for (let o of e.splice(r, 1))
          o();
    };
  }, dispose() {
    for (let t of e.splice(0))
      t();
  } };
  return n;
}
function Ui() {
  let e = eo();
  return Ge(() => e.dispose()), e;
}
function Ki() {
  let e = Ui();
  return (n) => {
    e.dispose(), e.nextFrame(n);
  };
}
var al;
let Wi = Symbol("headlessui.useid"), Gi = 0;
const Pn = (al = ln.useId) != null ? al : function() {
  return ln.inject(Wi, () => `${++Gi}`)();
};
function he(e) {
  var n;
  if (e == null || e.value == null)
    return null;
  let t = (n = e.value.$el) != null ? n : e.value;
  return t instanceof Node ? t : null;
}
function St(e, n, ...t) {
  if (e in n) {
    let o = n[e];
    return typeof o == "function" ? o(...t) : o;
  }
  let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map((o) => `"${o}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, St), r;
}
var Yi = Object.defineProperty, Xi = (e, n, t) => n in e ? Yi(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, il = (e, n, t) => (Xi(e, typeof n != "symbol" ? n + "" : n, t), t);
let Ji = class {
  constructor() {
    il(this, "current", this.detect()), il(this, "currentId", 0);
  }
  set(n) {
    this.current !== n && (this.currentId = 0, this.current = n);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
}, yr = new Ji();
function mr(e) {
  if (yr.isServer)
    return null;
  if (e instanceof Node)
    return e.ownerDocument;
  if (e != null && e.hasOwnProperty("value")) {
    let n = he(e);
    if (n)
      return n.ownerDocument;
  }
  return document;
}
let sl = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var Zi = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(Zi || {}), Qi = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Qi || {}), es = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(es || {}), ra = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(ra || {});
function ts(e, n = 0) {
  var t;
  return e === ((t = mr(e)) == null ? void 0 : t.body) ? !1 : St(n, { 0() {
    return e.matches(sl);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(sl))
        return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var ns = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(ns || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function os(e, n = (t) => t) {
  return e.slice().sort((t, r) => {
    let o = n(t), l = n(r);
    if (o === null || l === null)
      return 0;
    let a = o.compareDocumentPosition(l);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function rs() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function ls() {
  return /Android/gi.test(window.navigator.userAgent);
}
function la() {
  return rs() || ls();
}
function zn(e, n, t) {
  yr.isServer || Ae((r) => {
    document.addEventListener(e, n, t), r(() => document.removeEventListener(e, n, t));
  });
}
function as(e, n, t) {
  yr.isServer || Ae((r) => {
    window.addEventListener(e, n, t), r(() => window.removeEventListener(e, n, t));
  });
}
function is(e, n, t = k(() => !0)) {
  function r(l, a) {
    if (!t.value || l.defaultPrevented)
      return;
    let i = a(l);
    if (i === null || !i.getRootNode().contains(i))
      return;
    let u = function c(d) {
      return typeof d == "function" ? c(d()) : Array.isArray(d) || d instanceof Set ? d : [d];
    }(e);
    for (let c of u) {
      if (c === null)
        continue;
      let d = c instanceof HTMLElement ? c : he(c);
      if (d != null && d.contains(i) || l.composed && l.composedPath().includes(d))
        return;
    }
    return !ts(i, ra.Loose) && i.tabIndex !== -1 && l.preventDefault(), n(l, i);
  }
  let o = M(null);
  zn("pointerdown", (l) => {
    var a, i;
    t.value && (o.value = ((i = (a = l.composedPath) == null ? void 0 : a.call(l)) == null ? void 0 : i[0]) || l.target);
  }, !0), zn("mousedown", (l) => {
    var a, i;
    t.value && (o.value = ((i = (a = l.composedPath) == null ? void 0 : a.call(l)) == null ? void 0 : i[0]) || l.target);
  }, !0), zn("click", (l) => {
    la() || o.value && (r(l, () => o.value), o.value = null);
  }, !0), zn("touchend", (l) => r(l, () => l.target instanceof HTMLElement ? l.target : null), !0), as("blur", (l) => r(l, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function ul(e, n) {
  if (e)
    return e;
  let t = n ?? "button";
  if (typeof t == "string" && t.toLowerCase() === "button")
    return "button";
}
function ss(e, n) {
  let t = M(ul(e.value.type, e.value.as));
  return we(() => {
    t.value = ul(e.value.type, e.value.as);
  }), Ae(() => {
    var r;
    t.value || he(n) && he(n) instanceof HTMLButtonElement && !((r = he(n)) != null && r.hasAttribute("type")) && (t.value = "button");
  }), t;
}
function dl(e) {
  return [e.screenX, e.screenY];
}
function us() {
  let e = M([-1, -1]);
  return { wasMoved(n) {
    let t = dl(n);
    return e.value[0] === t[0] && e.value[1] === t[1] ? !1 : (e.value = t, !0);
  }, update(n) {
    e.value = dl(n);
  } };
}
function ds({ container: e, accept: n, walk: t, enabled: r }) {
  Ae(() => {
    let o = e.value;
    if (!o || r !== void 0 && !r.value)
      return;
    let l = mr(e);
    if (!l)
      return;
    let a = Object.assign((u) => n(u), { acceptNode: n }), i = l.createTreeWalker(o, NodeFilter.SHOW_ELEMENT, a, !1);
    for (; i.nextNode(); )
      t(i.currentNode);
  });
}
var An = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(An || {}), cs = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(cs || {});
function Wt({ visible: e = !0, features: n = 0, ourProps: t, theirProps: r, ...o }) {
  var l;
  let a = ia(r, t), i = Object.assign(o, { props: a });
  if (e || n & 2 && a.static)
    return Lo(i);
  if (n & 1) {
    let u = (l = a.unmount) == null || l ? 0 : 1;
    return St(u, { 0() {
      return null;
    }, 1() {
      return Lo({ ...o, props: { ...a, hidden: !0, style: { display: "none" } } });
    } });
  }
  return Lo(i);
}
function Lo({ props: e, attrs: n, slots: t, slot: r, name: o }) {
  var l, a;
  let { as: i, ...u } = io(e, ["unmount", "static"]), c = (l = t.default) == null ? void 0 : l.call(t, r), d = {};
  if (r) {
    let f = !1, p = [];
    for (let [v, y] of Object.entries(r))
      typeof y == "boolean" && (f = !0), y === !0 && p.push(v);
    f && (d["data-headlessui-state"] = p.join(" "));
  }
  if (i === "template") {
    if (c = aa(c ?? []), Object.keys(u).length > 0 || Object.keys(n).length > 0) {
      let [f, ...p] = c ?? [];
      if (!ps(f) || p.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${o} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(u).concat(Object.keys(n)).map((m) => m.trim()).filter((m, S, x) => x.indexOf(m) === S).sort((m, S) => m.localeCompare(S)).map((m) => `  - ${m}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((m) => `  - ${m}`).join(`
`)].join(`
`));
      let v = ia((a = f.props) != null ? a : {}, u, d), y = cr(f, v, !0);
      for (let m in v)
        m.startsWith("on") && (y.props || (y.props = {}), y.props[m] = v[m]);
      return y;
    }
    return Array.isArray(c) && c.length === 1 ? c[0] : c;
  }
  return ae(i, Object.assign({}, u, d), { default: () => c });
}
function aa(e) {
  return e.flatMap((n) => n.type === be ? aa(n.children) : [n]);
}
function ia(...e) {
  if (e.length === 0)
    return {};
  if (e.length === 1)
    return e[0];
  let n = {}, t = {};
  for (let r of e)
    for (let o in r)
      o.startsWith("on") && typeof r[o] == "function" ? (t[o] != null || (t[o] = []), t[o].push(r[o])) : n[o] = r[o];
  if (n.disabled || n["aria-disabled"])
    return Object.assign(n, Object.fromEntries(Object.keys(t).map((r) => [r, void 0])));
  for (let r in t)
    Object.assign(n, { [r](o, ...l) {
      let a = t[r];
      for (let i of a) {
        if (o instanceof Event && o.defaultPrevented)
          return;
        i(o, ...l);
      }
    } });
  return n;
}
function fs(e) {
  let n = Object.assign({}, e);
  for (let t in n)
    n[t] === void 0 && delete n[t];
  return n;
}
function io(e, n = []) {
  let t = Object.assign({}, e);
  for (let r of n)
    r in t && delete t[r];
  return t;
}
function ps(e) {
  return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
var sa = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(sa || {});
let vs = N({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(e, { slots: n, attrs: t }) {
  return () => {
    var r;
    let { features: o, ...l } = e, a = { "aria-hidden": (o & 2) === 2 ? !0 : (r = l["aria-hidden"]) != null ? r : void 0, hidden: (o & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(o & 4) === 4 && (o & 2) !== 2 && { display: "none" } } };
    return Wt({ ourProps: a, theirProps: l, slot: {}, attrs: t, slots: n, name: "Hidden" });
  };
} }), ua = Symbol("Context");
var On = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(On || {});
function ys() {
  return kn(ua, null);
}
function ms(e) {
  jn(ua, e);
}
var He = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(He || {}), da = ((e) => (e[e.Left = 0] = "Left", e[e.Right = 2] = "Right", e))(da || {});
function hs(e) {
  function n() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", n));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", n), n());
}
let Nt = [];
hs(() => {
  function e(n) {
    n.target instanceof HTMLElement && n.target !== document.body && Nt[0] !== n.target && (Nt.unshift(n.target), Nt = Nt.filter((t) => t != null && t.isConnected), Nt.splice(10));
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function gs(e) {
  throw new Error("Unexpected object: " + e);
}
var Pe = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(Pe || {});
function cl(e, n) {
  let t = n.resolveItems();
  if (t.length <= 0)
    return null;
  let r = n.resolveActiveIndex(), o = r ?? -1;
  switch (e.focus) {
    case 0: {
      for (let l = 0; l < t.length; ++l)
        if (!n.resolveDisabled(t[l], l, t))
          return l;
      return r;
    }
    case 1: {
      o === -1 && (o = t.length);
      for (let l = o - 1; l >= 0; --l)
        if (!n.resolveDisabled(t[l], l, t))
          return l;
      return r;
    }
    case 2: {
      for (let l = o + 1; l < t.length; ++l)
        if (!n.resolveDisabled(t[l], l, t))
          return l;
      return r;
    }
    case 3: {
      for (let l = t.length - 1; l >= 0; --l)
        if (!n.resolveDisabled(t[l], l, t))
          return l;
      return r;
    }
    case 4: {
      for (let l = 0; l < t.length; ++l)
        if (n.resolveId(t[l], l, t) === e.id)
          return l;
      return r;
    }
    case 5:
      return null;
    default:
      gs(e);
  }
}
function ca(e = {}, n = null, t = []) {
  for (let [r, o] of Object.entries(e))
    pa(t, fa(n, r), o);
  return t;
}
function fa(e, n) {
  return e ? e + "[" + n + "]" : n;
}
function pa(e, n, t) {
  if (Array.isArray(t))
    for (let [r, o] of t.entries())
      pa(e, fa(n, r.toString()), o);
  else
    t instanceof Date ? e.push([n, t.toISOString()]) : typeof t == "boolean" ? e.push([n, t ? "1" : "0"]) : typeof t == "string" ? e.push([n, t]) : typeof t == "number" ? e.push([n, `${t}`]) : t == null ? e.push([n, ""]) : ca(t, n, e);
}
function bs(e, n) {
  return e === n;
}
var xs = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(xs || {}), ws = ((e) => (e[e.Single = 0] = "Single", e[e.Multi = 1] = "Multi", e))(ws || {}), _s = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Focus = 1] = "Focus", e[e.Other = 2] = "Other", e))(_s || {});
let va = Symbol("ComboboxContext");
function Gt(e) {
  let n = kn(va, null);
  if (n === null) {
    let t = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, Gt), t;
  }
  return n;
}
let ya = Symbol("VirtualContext"), Ss = N({ name: "VirtualProvider", setup(e, { slots: n }) {
  let t = Gt("VirtualProvider"), r = k(() => {
    let i = he(t.optionsRef);
    if (!i)
      return { start: 0, end: 0 };
    let u = window.getComputedStyle(i);
    return { start: parseFloat(u.paddingBlockStart || u.paddingTop), end: parseFloat(u.paddingBlockEnd || u.paddingBottom) };
  }), o = Vi(k(() => ({ scrollPaddingStart: r.value.start, scrollPaddingEnd: r.value.end, count: t.virtual.value.options.length, estimateSize() {
    return 40;
  }, getScrollElement() {
    return he(t.optionsRef);
  }, overscan: 12 }))), l = k(() => {
    var i;
    return (i = t.virtual.value) == null ? void 0 : i.options;
  }), a = M(0);
  return pe([l], () => {
    a.value += 1;
  }), jn(ya, t.virtual.value ? o : null), () => [ae("div", { style: { position: "relative", width: "100%", height: `${o.value.getTotalSize()}px` }, ref: (i) => {
    if (i) {
      if (typeof process < "u" && process.env.JEST_WORKER_ID !== void 0 || t.activationTrigger.value === 0)
        return;
      t.activeOptionIndex.value !== null && t.virtual.value.options.length > t.activeOptionIndex.value && o.value.scrollToIndex(t.activeOptionIndex.value);
    }
  } }, o.value.getVirtualItems().map((i) => cr(n.default({ option: t.virtual.value.options[i.index], open: t.comboboxState.value === 0 })[0], { key: `${a.value}-${i.index}`, "data-index": i.index, "aria-setsize": t.virtual.value.options.length, "aria-posinset": i.index + 1, style: { position: "absolute", top: 0, left: 0, transform: `translateY(${i.start}px)`, overflowAnchor: "none" } })))];
} }), Cs = N({ name: "Combobox", emits: { "update:modelValue": (e) => !0 }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: !1 }, by: { type: [String, Function], nullable: !0, default: null }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, form: { type: String, optional: !0 }, name: { type: String, optional: !0 }, nullable: { type: Boolean, default: !1 }, multiple: { type: [Boolean], default: !1 }, immediate: { type: [Boolean], default: !1 }, virtual: { type: Object, default: null } }, inheritAttrs: !1, setup(e, { slots: n, attrs: t, emit: r }) {
  let o = M(1), l = M(null), a = M(null), i = M(null), u = M(null), c = M({ static: !1, hold: !1 }), d = M([]), f = M(null), p = M(2), v = M(!1);
  function y(j = ($) => $) {
    let $ = f.value !== null ? d.value[f.value] : null, R = j(d.value.slice()), B = R.length > 0 && R[0].dataRef.order.value !== null ? R.sort((U, oe) => U.dataRef.order.value - oe.dataRef.order.value) : os(R, (U) => he(U.dataRef.domRef)), z = $ ? B.indexOf($) : null;
    return z === -1 && (z = null), { options: B, activeOptionIndex: z };
  }
  let m = k(() => e.multiple ? 1 : 0), S = k(() => e.nullable), [x, h] = zi(k(() => e.modelValue), (j) => r("update:modelValue", j), k(() => e.defaultValue)), w = k(() => x.value === void 0 ? St(m.value, { 1: [], 0: void 0 }) : x.value), C = null, g = null;
  function b(j) {
    return St(m.value, { 0() {
      return h == null ? void 0 : h(j);
    }, 1: () => {
      let $ = Tt(T.value.value).slice(), R = Tt(j), B = $.findIndex((z) => T.compare(R, Tt(z)));
      return B === -1 ? $.push(R) : $.splice(B, 1), h == null ? void 0 : h($);
    } });
  }
  let O = k(() => {
  });
  pe([O], ([j], [$]) => {
    if (T.virtual.value && j && $ && f.value !== null) {
      let R = j.indexOf($[f.value]);
      R !== -1 ? f.value = R : f.value = null;
    }
  });
  let T = { comboboxState: o, value: w, mode: m, compare(j, $) {
    if (typeof e.by == "string") {
      let R = e.by;
      return (j == null ? void 0 : j[R]) === ($ == null ? void 0 : $[R]);
    }
    return e.by === null ? bs(j, $) : e.by(j, $);
  }, calculateIndex(j) {
    return T.virtual.value ? e.by === null ? T.virtual.value.options.indexOf(j) : T.virtual.value.options.findIndex(($) => T.compare($, j)) : d.value.findIndex(($) => T.compare($.dataRef.value, j));
  }, defaultValue: k(() => e.defaultValue), nullable: S, immediate: k(() => !1), virtual: k(() => null), inputRef: a, labelRef: l, buttonRef: i, optionsRef: u, disabled: k(() => e.disabled), options: d, change(j) {
    h(j);
  }, activeOptionIndex: k(() => {
    if (v.value && f.value === null && (T.virtual.value ? T.virtual.value.options.length > 0 : d.value.length > 0)) {
      if (T.virtual.value) {
        let $ = T.virtual.value.options.findIndex((R) => {
          var B;
          return !((B = T.virtual.value) != null && B.disabled(R));
        });
        if ($ !== -1)
          return $;
      }
      let j = d.value.findIndex(($) => !$.dataRef.disabled);
      if (j !== -1)
        return j;
    }
    return f.value;
  }), activationTrigger: p, optionsPropsRef: c, closeCombobox() {
    v.value = !1, !e.disabled && o.value !== 1 && (o.value = 1, f.value = null);
  }, openCombobox() {
    if (v.value = !0, !e.disabled && o.value !== 0) {
      if (T.value.value) {
        let j = T.calculateIndex(T.value.value);
        j !== -1 && (f.value = j);
      }
      o.value = 0;
    }
  }, setActivationTrigger(j) {
    p.value = j;
  }, goToOption(j, $, R) {
    v.value = !1, C !== null && cancelAnimationFrame(C), C = requestAnimationFrame(() => {
      if (e.disabled || u.value && !c.value.static && o.value === 1)
        return;
      if (T.virtual.value) {
        f.value = j === Pe.Specific ? $ : cl({ focus: j }, { resolveItems: () => T.virtual.value.options, resolveActiveIndex: () => {
          var U, oe;
          return (oe = (U = T.activeOptionIndex.value) != null ? U : T.virtual.value.options.findIndex((ne) => {
            var ue;
            return !((ue = T.virtual.value) != null && ue.disabled(ne));
          })) != null ? oe : null;
        }, resolveDisabled: (U) => T.virtual.value.disabled(U), resolveId() {
          throw new Error("Function not implemented.");
        } }), p.value = R ?? 2;
        return;
      }
      let B = y();
      if (B.activeOptionIndex === null) {
        let U = B.options.findIndex((oe) => !oe.dataRef.disabled);
        U !== -1 && (B.activeOptionIndex = U);
      }
      let z = j === Pe.Specific ? $ : cl({ focus: j }, { resolveItems: () => B.options, resolveActiveIndex: () => B.activeOptionIndex, resolveId: (U) => U.id, resolveDisabled: (U) => U.dataRef.disabled });
      f.value = z, p.value = R ?? 2, d.value = B.options;
    });
  }, selectOption(j) {
    let $ = d.value.find((B) => B.id === j);
    if (!$)
      return;
    let { dataRef: R } = $;
    b(R.value);
  }, selectActiveOption() {
    if (T.activeOptionIndex.value !== null) {
      if (T.virtual.value)
        b(T.virtual.value.options[T.activeOptionIndex.value]);
      else {
        let { dataRef: j } = d.value[T.activeOptionIndex.value];
        b(j.value);
      }
      T.goToOption(Pe.Specific, T.activeOptionIndex.value);
    }
  }, registerOption(j, $) {
    let R = Ht({ id: j, dataRef: $ });
    if (T.virtual.value) {
      d.value.push(R);
      return;
    }
    g && cancelAnimationFrame(g);
    let B = y((z) => (z.push(R), z));
    f.value === null && T.isSelected($.value.value) && (B.activeOptionIndex = B.options.indexOf(R)), d.value = B.options, f.value = B.activeOptionIndex, p.value = 2, B.options.some((z) => !he(z.dataRef.domRef)) && (g = requestAnimationFrame(() => {
      let z = y();
      d.value = z.options, f.value = z.activeOptionIndex;
    }));
  }, unregisterOption(j, $) {
    if (C !== null && cancelAnimationFrame(C), $ && (v.value = !0), T.virtual.value) {
      d.value = d.value.filter((B) => B.id !== j);
      return;
    }
    let R = y((B) => {
      let z = B.findIndex((U) => U.id === j);
      return z !== -1 && B.splice(z, 1), B;
    });
    d.value = R.options, f.value = R.activeOptionIndex, p.value = 2;
  }, isSelected(j) {
    return St(m.value, { 0: () => T.compare(Tt(T.value.value), Tt(j)), 1: () => Tt(T.value.value).some(($) => T.compare(Tt($), Tt(j))) });
  }, isActive(j) {
    return f.value === T.calculateIndex(j);
  } };
  is([a, i, u], () => T.closeCombobox(), k(() => o.value === 0)), jn(va, T), ms(k(() => St(o.value, { 0: On.Open, 1: On.Closed })));
  let _ = k(() => {
    var j;
    return (j = he(a)) == null ? void 0 : j.closest("form");
  });
  return we(() => {
    pe([_], () => {
      if (!_.value || e.defaultValue === void 0)
        return;
      function j() {
        T.change(e.defaultValue);
      }
      return _.value.addEventListener("reset", j), () => {
        var $;
        ($ = _.value) == null || $.removeEventListener("reset", j);
      };
    }, { immediate: !0 });
  }), () => {
    var j, $, R;
    let { name: B, disabled: z, form: U, ...oe } = e, ne = { open: o.value === 0, disabled: z, activeIndex: T.activeOptionIndex.value, activeOption: T.activeOptionIndex.value === null ? null : T.virtual.value ? T.virtual.value.options[(j = T.activeOptionIndex.value) != null ? j : 0] : (R = ($ = T.options.value[T.activeOptionIndex.value]) == null ? void 0 : $.dataRef.value) != null ? R : null, value: w.value };
    return ae(be, [...B != null && w.value != null ? ca({ [B]: w.value }).map(([ue, D]) => ae(vs, fs({ features: sa.Hidden, key: ue, as: "input", type: "hidden", hidden: !0, readOnly: !0, form: U, disabled: z, name: ue, value: D }))) : [], Wt({ theirProps: { ...t, ...io(oe, ["by", "defaultValue", "immediate", "modelValue", "multiple", "nullable", "onUpdate:modelValue", "virtual"]) }, ourProps: {}, slot: ne, slots: n, attrs: t, name: "Combobox" })]);
  };
} });
N({ name: "ComboboxLabel", props: { as: { type: [Object, String], default: "label" }, id: { type: String, default: null } }, setup(e, { attrs: n, slots: t }) {
  var r;
  let o = (r = e.id) != null ? r : `headlessui-combobox-label-${Pn()}`, l = Gt("ComboboxLabel");
  function a() {
    var i;
    (i = he(l.inputRef)) == null || i.focus({ preventScroll: !0 });
  }
  return () => {
    let i = { open: l.comboboxState.value === 0, disabled: l.disabled.value }, { ...u } = e, c = { id: o, ref: l.labelRef, onClick: a };
    return Wt({ ourProps: c, theirProps: u, slot: i, attrs: n, slots: t, name: "ComboboxLabel" });
  };
} });
N({ name: "ComboboxButton", props: { as: { type: [Object, String], default: "button" }, id: { type: String, default: null } }, setup(e, { attrs: n, slots: t, expose: r }) {
  var o;
  let l = (o = e.id) != null ? o : `headlessui-combobox-button-${Pn()}`, a = Gt("ComboboxButton");
  r({ el: a.buttonRef, $el: a.buttonRef });
  function i(d) {
    a.disabled.value || (a.comboboxState.value === 0 ? a.closeCombobox() : (d.preventDefault(), a.openCombobox()), ge(() => {
      var f;
      return (f = he(a.inputRef)) == null ? void 0 : f.focus({ preventScroll: !0 });
    }));
  }
  function u(d) {
    switch (d.key) {
      case He.ArrowDown:
        d.preventDefault(), d.stopPropagation(), a.comboboxState.value === 1 && a.openCombobox(), ge(() => {
          var f;
          return (f = a.inputRef.value) == null ? void 0 : f.focus({ preventScroll: !0 });
        });
        return;
      case He.ArrowUp:
        d.preventDefault(), d.stopPropagation(), a.comboboxState.value === 1 && (a.openCombobox(), ge(() => {
          a.value.value || a.goToOption(Pe.Last);
        })), ge(() => {
          var f;
          return (f = a.inputRef.value) == null ? void 0 : f.focus({ preventScroll: !0 });
        });
        return;
      case He.Escape:
        if (a.comboboxState.value !== 0)
          return;
        d.preventDefault(), a.optionsRef.value && !a.optionsPropsRef.value.static && d.stopPropagation(), a.closeCombobox(), ge(() => {
          var f;
          return (f = a.inputRef.value) == null ? void 0 : f.focus({ preventScroll: !0 });
        });
        return;
    }
  }
  let c = ss(k(() => ({ as: e.as, type: n.type })), a.buttonRef);
  return () => {
    var d, f;
    let p = { open: a.comboboxState.value === 0, disabled: a.disabled.value, value: a.value.value }, { ...v } = e, y = { ref: a.buttonRef, id: l, type: c.value, tabindex: "-1", "aria-haspopup": "listbox", "aria-controls": (d = he(a.optionsRef)) == null ? void 0 : d.id, "aria-expanded": a.comboboxState.value === 0, "aria-labelledby": a.labelRef.value ? [(f = he(a.labelRef)) == null ? void 0 : f.id, l].join(" ") : void 0, disabled: a.disabled.value === !0 ? !0 : void 0, onKeydown: u, onClick: i };
    return Wt({ ourProps: y, theirProps: v, slot: p, attrs: n, slots: t, name: "ComboboxButton" });
  };
} });
let As = N({ name: "ComboboxInput", props: { as: { type: [Object, String], default: "input" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, displayValue: { type: Function }, defaultValue: { type: String, default: void 0 }, id: { type: String, default: null } }, emits: { change: (e) => !0 }, setup(e, { emit: n, attrs: t, slots: r, expose: o }) {
  var l;
  let a = (l = e.id) != null ? l : `headlessui-combobox-input-${Pn()}`, i = Gt("ComboboxInput"), u = k(() => mr(he(i.inputRef))), c = { value: !1 };
  o({ el: i.inputRef, $el: i.inputRef });
  function d() {
    i.change(null);
    let g = he(i.optionsRef);
    g && (g.scrollTop = 0), i.goToOption(Pe.Nothing);
  }
  let f = k(() => {
    var g;
    let b = i.value.value;
    return he(i.inputRef) ? typeof e.displayValue < "u" && b !== void 0 ? (g = e.displayValue(b)) != null ? g : "" : typeof b == "string" ? b : "" : "";
  });
  we(() => {
    pe([f, i.comboboxState, u], ([g, b], [O, T]) => {
      if (c.value)
        return;
      let _ = he(i.inputRef);
      _ && ((T === 0 && b === 1 || g !== O) && (_.value = g), requestAnimationFrame(() => {
        var j;
        if (c.value || !_ || ((j = u.value) == null ? void 0 : j.activeElement) !== _)
          return;
        let { selectionStart: $, selectionEnd: R } = _;
        Math.abs((R ?? 0) - ($ ?? 0)) === 0 && $ === 0 && _.setSelectionRange(_.value.length, _.value.length);
      }));
    }, { immediate: !0 }), pe([i.comboboxState], ([g], [b]) => {
      if (g === 0 && b === 1) {
        if (c.value)
          return;
        let O = he(i.inputRef);
        if (!O)
          return;
        let T = O.value, { selectionStart: _, selectionEnd: j, selectionDirection: $ } = O;
        O.value = "", O.value = T, $ !== null ? O.setSelectionRange(_, j, $) : O.setSelectionRange(_, j);
      }
    });
  });
  let p = M(!1);
  function v() {
    p.value = !0;
  }
  function y() {
    eo().nextFrame(() => {
      p.value = !1;
    });
  }
  let m = Ki();
  function S(g) {
    switch (c.value = !0, m(() => {
      c.value = !1;
    }), g.key) {
      case He.Enter:
        if (c.value = !1, i.comboboxState.value !== 0 || p.value)
          return;
        if (g.preventDefault(), g.stopPropagation(), i.activeOptionIndex.value === null) {
          i.closeCombobox();
          return;
        }
        i.selectActiveOption(), i.mode.value === 0 && i.closeCombobox();
        break;
      case He.ArrowDown:
        return c.value = !1, g.preventDefault(), g.stopPropagation(), St(i.comboboxState.value, { 0: () => i.goToOption(Pe.Next), 1: () => i.openCombobox() });
      case He.ArrowUp:
        return c.value = !1, g.preventDefault(), g.stopPropagation(), St(i.comboboxState.value, { 0: () => i.goToOption(Pe.Previous), 1: () => {
          i.openCombobox(), ge(() => {
            i.value.value || i.goToOption(Pe.Last);
          });
        } });
      case He.Home:
        if (g.shiftKey)
          break;
        return c.value = !1, g.preventDefault(), g.stopPropagation(), i.goToOption(Pe.First);
      case He.PageUp:
        return c.value = !1, g.preventDefault(), g.stopPropagation(), i.goToOption(Pe.First);
      case He.End:
        if (g.shiftKey)
          break;
        return c.value = !1, g.preventDefault(), g.stopPropagation(), i.goToOption(Pe.Last);
      case He.PageDown:
        return c.value = !1, g.preventDefault(), g.stopPropagation(), i.goToOption(Pe.Last);
      case He.Escape:
        if (c.value = !1, i.comboboxState.value !== 0)
          return;
        g.preventDefault(), i.optionsRef.value && !i.optionsPropsRef.value.static && g.stopPropagation(), i.nullable.value && i.mode.value === 0 && i.value.value === null && d(), i.closeCombobox();
        break;
      case He.Tab:
        if (c.value = !1, i.comboboxState.value !== 0)
          return;
        i.mode.value === 0 && i.activationTrigger.value !== 1 && i.selectActiveOption(), i.closeCombobox();
        break;
    }
  }
  function x(g) {
    n("change", g), i.nullable.value && i.mode.value === 0 && g.target.value === "" && d(), i.openCombobox();
  }
  function h(g) {
    var b, O, T;
    let _ = (b = g.relatedTarget) != null ? b : Nt.find((j) => j !== g.currentTarget);
    if (c.value = !1, !((O = he(i.optionsRef)) != null && O.contains(_)) && !((T = he(i.buttonRef)) != null && T.contains(_)) && i.comboboxState.value === 0)
      return g.preventDefault(), i.mode.value === 0 && (i.nullable.value && i.value.value === null ? d() : i.activationTrigger.value !== 1 && i.selectActiveOption()), i.closeCombobox();
  }
  function w(g) {
    var b, O, T;
    let _ = (b = g.relatedTarget) != null ? b : Nt.find((j) => j !== g.currentTarget);
    (O = he(i.buttonRef)) != null && O.contains(_) || (T = he(i.optionsRef)) != null && T.contains(_) || i.disabled.value || i.immediate.value && i.comboboxState.value !== 0 && (i.openCombobox(), eo().nextFrame(() => {
      i.setActivationTrigger(1);
    }));
  }
  let C = k(() => {
    var g, b, O, T;
    return (T = (O = (b = e.defaultValue) != null ? b : i.defaultValue.value !== void 0 ? (g = e.displayValue) == null ? void 0 : g.call(e, i.defaultValue.value) : null) != null ? O : i.defaultValue.value) != null ? T : "";
  });
  return () => {
    var g, b, O, T, _, j, $;
    let R = { open: i.comboboxState.value === 0 }, { displayValue: B, onChange: z, ...U } = e, oe = { "aria-controls": (g = i.optionsRef.value) == null ? void 0 : g.id, "aria-expanded": i.comboboxState.value === 0, "aria-activedescendant": i.activeOptionIndex.value === null ? void 0 : i.virtual.value ? (b = i.options.value.find((ne) => !i.virtual.value.disabled(ne.dataRef.value) && i.compare(ne.dataRef.value, i.virtual.value.options[i.activeOptionIndex.value]))) == null ? void 0 : b.id : (O = i.options.value[i.activeOptionIndex.value]) == null ? void 0 : O.id, "aria-labelledby": (j = (T = he(i.labelRef)) == null ? void 0 : T.id) != null ? j : (_ = he(i.buttonRef)) == null ? void 0 : _.id, "aria-autocomplete": "list", id: a, onCompositionstart: v, onCompositionend: y, onKeydown: S, onInput: x, onFocus: w, onBlur: h, role: "combobox", type: ($ = t.type) != null ? $ : "text", tabIndex: 0, ref: i.inputRef, defaultValue: C.value, disabled: i.disabled.value === !0 ? !0 : void 0 };
    return Wt({ ourProps: oe, theirProps: U, slot: R, attrs: t, slots: r, features: An.RenderStrategy | An.Static, name: "ComboboxInput" });
  };
} }), Os = N({ name: "ComboboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, hold: { type: [Boolean], default: !1 } }, setup(e, { attrs: n, slots: t, expose: r }) {
  let o = Gt("ComboboxOptions"), l = `headlessui-combobox-options-${Pn()}`;
  r({ el: o.optionsRef, $el: o.optionsRef }), Ae(() => {
    o.optionsPropsRef.value.static = e.static;
  }), Ae(() => {
    o.optionsPropsRef.value.hold = e.hold;
  });
  let a = ys(), i = k(() => a !== null ? (a.value & On.Open) === On.Open : o.comboboxState.value === 0);
  ds({ container: k(() => he(o.optionsRef)), enabled: k(() => o.comboboxState.value === 0), accept(c) {
    return c.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : c.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(c) {
    c.setAttribute("role", "none");
  } });
  function u(c) {
    c.preventDefault();
  }
  return () => {
    var c, d, f;
    let p = { open: o.comboboxState.value === 0 }, v = { "aria-labelledby": (f = (c = he(o.labelRef)) == null ? void 0 : c.id) != null ? f : (d = he(o.buttonRef)) == null ? void 0 : d.id, id: l, ref: o.optionsRef, role: "listbox", "aria-multiselectable": o.mode.value === 1 ? !0 : void 0, onMousedown: u }, y = io(e, ["hold"]);
    return Wt({ ourProps: v, theirProps: y, slot: p, attrs: n, slots: o.virtual.value && o.comboboxState.value === 0 ? { ...t, default: () => [ae(Ss, {}, t.default)] } : t, features: An.RenderStrategy | An.Static, visible: i.value, name: "ComboboxOptions" });
  };
} }), Es = N({ name: "ComboboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: !1 }, order: { type: [Number], default: null } }, setup(e, { slots: n, attrs: t, expose: r }) {
  let o = Gt("ComboboxOption"), l = `headlessui-combobox-option-${Pn()}`, a = M(null), i = k(() => e.disabled);
  r({ el: a, $el: a });
  let u = k(() => {
    var h;
    return o.virtual.value ? o.activeOptionIndex.value === o.calculateIndex(e.value) : o.activeOptionIndex.value === null ? !1 : ((h = o.options.value[o.activeOptionIndex.value]) == null ? void 0 : h.id) === l;
  }), c = k(() => o.isSelected(e.value)), d = kn(ya, null), f = k(() => ({ disabled: e.disabled, value: e.value, domRef: a, order: k(() => e.order) }));
  we(() => o.registerOption(l, f)), Ge(() => o.unregisterOption(l, u.value)), Ae(() => {
    let h = he(a);
    h && (d == null || d.value.measureElement(h));
  }), Ae(() => {
    o.comboboxState.value === 0 && u.value && (o.virtual.value || o.activationTrigger.value !== 0 && ge(() => {
      var h, w;
      return (w = (h = he(a)) == null ? void 0 : h.scrollIntoView) == null ? void 0 : w.call(h, { block: "nearest" });
    }));
  });
  function p(h) {
    h.preventDefault(), h.button === da.Left && (i.value || (o.selectOption(l), la() || requestAnimationFrame(() => {
      var w;
      return (w = he(o.inputRef)) == null ? void 0 : w.focus({ preventScroll: !0 });
    }), o.mode.value === 0 && o.closeCombobox()));
  }
  function v() {
    var h;
    if (e.disabled || (h = o.virtual.value) != null && h.disabled(e.value))
      return o.goToOption(Pe.Nothing);
    let w = o.calculateIndex(e.value);
    o.goToOption(Pe.Specific, w);
  }
  let y = us();
  function m(h) {
    y.update(h);
  }
  function S(h) {
    var w;
    if (!y.wasMoved(h) || e.disabled || (w = o.virtual.value) != null && w.disabled(e.value) || u.value)
      return;
    let C = o.calculateIndex(e.value);
    o.goToOption(Pe.Specific, C, 0);
  }
  function x(h) {
    var w;
    y.wasMoved(h) && (e.disabled || (w = o.virtual.value) != null && w.disabled(e.value) || u.value && (o.optionsPropsRef.value.hold || o.goToOption(Pe.Nothing)));
  }
  return () => {
    let { disabled: h } = e, w = { active: u.value, selected: c.value, disabled: h }, C = { id: l, ref: a, role: "option", tabIndex: h === !0 ? void 0 : -1, "aria-disabled": h === !0 ? !0 : void 0, "aria-selected": c.value, disabled: void 0, onMousedown: p, onFocus: v, onPointerenter: m, onMouseenter: m, onPointermove: S, onMousemove: S, onPointerleave: x, onMouseleave: x }, g = io(e, ["order", "value"]);
    return Wt({ ourProps: C, theirProps: g, slot: w, attrs: t, slots: n, name: "ComboboxOption" });
  };
} });
function fl(e) {
  return typeof e == "string" ? `'${e}'` : new Ts().serialize(e);
}
const Ts = /* @__PURE__ */ function() {
  var n;
  class e {
    constructor() {
      Qr(this, n, /* @__PURE__ */ new Map());
    }
    compare(r, o) {
      const l = typeof r, a = typeof o;
      return l === "string" && a === "string" ? r.localeCompare(o) : l === "number" && a === "number" ? r - o : String.prototype.localeCompare.call(this.serialize(r, !0), this.serialize(o, !0));
    }
    serialize(r, o) {
      if (r === null)
        return "null";
      switch (typeof r) {
        case "string":
          return o ? r : `'${r}'`;
        case "bigint":
          return `${r}n`;
        case "object":
          return this.$object(r);
        case "function":
          return this.$function(r);
      }
      return String(r);
    }
    serializeObject(r) {
      const o = Object.prototype.toString.call(r);
      if (o !== "[object Object]")
        return this.serializeBuiltInType(o.length < 10 ? `unknown:${o}` : o.slice(8, -1), r);
      const l = r.constructor, a = l === Object || l === void 0 ? "" : l.name;
      if (a !== "" && globalThis[a] === l)
        return this.serializeBuiltInType(a, r);
      if (typeof r.toJSON == "function") {
        const i = r.toJSON();
        return a + (i !== null && typeof i == "object" ? this.$object(i) : `(${this.serialize(i)})`);
      }
      return this.serializeObjectEntries(a, Object.entries(r));
    }
    serializeBuiltInType(r, o) {
      const l = this["$" + r];
      if (l)
        return l.call(this, o);
      if (typeof (o == null ? void 0 : o.entries) == "function")
        return this.serializeObjectEntries(r, o.entries());
      throw new Error(`Cannot serialize ${r}`);
    }
    serializeObjectEntries(r, o) {
      const l = Array.from(o).sort((i, u) => this.compare(i[0], u[0]));
      let a = `${r}{`;
      for (let i = 0; i < l.length; i++) {
        const [u, c] = l[i];
        a += `${this.serialize(u, !0)}:${this.serialize(c)}`, i < l.length - 1 && (a += ",");
      }
      return a + "}";
    }
    $object(r) {
      let o = mn(this, n).get(r);
      return o === void 0 && (mn(this, n).set(r, `#${mn(this, n).size}`), o = this.serializeObject(r), mn(this, n).set(r, o)), o;
    }
    $function(r) {
      const o = Function.prototype.toString.call(r);
      return o.slice(-15) === "[native code] }" ? `${r.name || ""}()[native]` : `${r.name}(${r.length})${o.replace(/\s*\n\s*/g, "")}`;
    }
    $Array(r) {
      let o = "[";
      for (let l = 0; l < r.length; l++)
        o += this.serialize(r[l]), l < r.length - 1 && (o += ",");
      return o + "]";
    }
    $Date(r) {
      try {
        return `Date(${r.toISOString()})`;
      } catch {
        return "Date(null)";
      }
    }
    $ArrayBuffer(r) {
      return `ArrayBuffer[${new Uint8Array(r).join(",")}]`;
    }
    $Set(r) {
      return `Set${this.$Array(Array.from(r).sort((o, l) => this.compare(o, l)))}`;
    }
    $Map(r) {
      return this.serializeObjectEntries("Map", r.entries());
    }
  }
  n = new WeakMap();
  for (const t of ["Error", "RegExp", "URL"])
    e.prototype["$" + t] = function(r) {
      return `${t}(${r})`;
    };
  for (const t of ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"])
    e.prototype["$" + t] = function(r) {
      return `${t}[${r.join(",")}]`;
    };
  for (const t of ["BigInt64Array", "BigUint64Array"])
    e.prototype["$" + t] = function(r) {
      return `${t}[${r.join("n,")}${r.length > 0 ? "n" : ""}]`;
    };
  return e;
}();
function to(e, n) {
  return e === n || fl(e) === fl(n);
}
function ks(e, n, t) {
  const r = e.findIndex((i) => to(i, n)), o = e.findIndex((i) => to(i, t));
  if (r === -1 || o === -1)
    return [];
  const [l, a] = [r, o].sort((i, u) => i - u);
  return e.slice(l, a + 1);
}
function pl(e, n = Number.NEGATIVE_INFINITY, t = Number.POSITIVE_INFINITY) {
  return Math.min(t, Math.max(n, e));
}
function Oe(e, n) {
  const t = typeof e == "string" && !n ? `${e}Context` : n, r = Symbol(t);
  return [(a) => {
    const i = kn(r, a);
    if (i || i === null)
      return i;
    throw new Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
  }, (a) => (jn(r, a), a)];
}
function ze() {
  let e = document.activeElement;
  if (e == null)
    return null;
  for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; )
    e = e.shadowRoot.activeElement;
  return e;
}
function so(e, n, t) {
  const r = t.originalEvent.target, o = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: t
  });
  n && r.addEventListener(e, n, { once: !0 }), r.dispatchEvent(o);
}
function Xo(e) {
  return e == null;
}
function hr(e) {
  return e ? e.flatMap((n) => n.type === be ? hr(n.children) : [n]) : [];
}
const [uo, Rm] = Oe("ConfigProvider");
function js(e, n) {
  var t;
  const r = Kt();
  return Ae(() => {
    r.value = e();
  }, {
    ...n,
    flush: (t = n == null ? void 0 : n.flush) !== null && t !== void 0 ? t : "sync"
  }), Zl(r);
}
function Yt(e, n) {
  return Xl() ? (dr(e, n), !0) : !1;
}
// @__NO_SIDE_EFFECTS__
function Sn() {
  const e = /* @__PURE__ */ new Set(), n = (l) => {
    e.delete(l);
  };
  return {
    on: (l) => {
      e.add(l);
      const a = () => n(l);
      return Yt(a), { off: a };
    },
    off: n,
    trigger: (...l) => Promise.all(Array.from(e).map((a) => a(...l))),
    clear: () => {
      e.clear();
    }
  };
}
// @__NO_SIDE_EFFECTS__
function Ps(e) {
  let n = !1, t;
  const r = Ql(!0);
  return (...o) => (n || (t = r.run(() => e(...o)), n = !0), t);
}
const at = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Is = (e) => typeof e < "u", Ms = Object.prototype.toString, Rs = (e) => Ms.call(e) === "[object Object]", Ds = () => {
}, vl = /* @__PURE__ */ Ls();
function Ls() {
  var e, n, t;
  return at && !!(!((e = window) === null || e === void 0 || (e = e.navigator) === null || e === void 0) && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((n = window) === null || n === void 0 || (n = n.navigator) === null || n === void 0 ? void 0 : n.maxTouchPoints) > 2 && /iPad|Macintosh/.test((t = window) === null || t === void 0 ? void 0 : t.navigator.userAgent));
}
function $o(e) {
  return Array.isArray(e) ? e : [e];
}
function $s(e) {
  return e || Dt();
}
// @__NO_SIDE_EFFECTS__
function qs(e) {
  if (!at)
    return e;
  let n = 0, t, r;
  const o = () => {
    n -= 1, r && n <= 0 && (r.stop(), t = void 0, r = void 0);
  };
  return (...l) => (n += 1, r || (r = Ql(!0), t = r.run(() => e(...l))), Yt(o), t);
}
function Bs(e) {
  return _n(e) ? Ht(new Proxy({}, {
    get(n, t, r) {
      return s(Reflect.get(e.value, t, r));
    },
    set(n, t, r) {
      return _n(e.value[t]) && !_n(r) ? e.value[t].value = r : e.value[t] = r, !0;
    },
    deleteProperty(n, t) {
      return Reflect.deleteProperty(e.value, t);
    },
    has(n, t) {
      return Reflect.has(e.value, t);
    },
    ownKeys() {
      return Object.keys(e.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: !0,
        configurable: !0
      };
    }
  })) : Ht(e);
}
function Fs(e) {
  return Bs(k(e));
}
function Ns(e, ...n) {
  const t = n.flat(), r = t[0];
  return Fs(() => Object.fromEntries(typeof r == "function" ? Object.entries($e(e)).filter(([o, l]) => !r(ke(l), o)) : Object.entries($e(e)).filter((o) => !t.includes(o[0]))));
}
function gr(e, n = 1e4) {
  return vi((t, r) => {
    let o = ke(e), l;
    const a = () => setTimeout(() => {
      o = ke(e), r();
    }, ke(n));
    return Yt(() => {
      clearTimeout(l);
    }), {
      get() {
        return t(), o;
      },
      set(i) {
        o = i, r(), clearTimeout(l), l = a();
      }
    };
  });
}
function Vs(e, n) {
  $s(n) && Jl(e, n);
}
function br(e, n, t = {}) {
  const { immediate: r = !0, immediateCallback: o = !1 } = t, l = Kt(!1);
  let a;
  function i() {
    a && (clearTimeout(a), a = void 0);
  }
  function u() {
    l.value = !1, i();
  }
  function c(...d) {
    o && e(), i(), l.value = !0, a = setTimeout(() => {
      l.value = !1, a = void 0, e(...d);
    }, ke(n));
  }
  return r && (l.value = !0, at && c()), Yt(u), {
    isPending: Ft(l),
    start: c,
    stop: u
  };
}
function zs(e = 1e3, n = {}) {
  const { controls: t = !1, callback: r } = n, o = br(r ?? Ds, e, n), l = k(() => !o.isPending.value);
  return t ? {
    ready: l,
    ...o
  } : l;
}
function Hs(e, n, t) {
  return pe(e, n, {
    ...t,
    immediate: !0
  });
}
const In = at ? window : void 0;
function mt(e) {
  var n;
  const t = ke(e);
  return (n = t == null ? void 0 : t.$el) !== null && n !== void 0 ? n : t;
}
function no(...e) {
  const n = (r, o, l, a) => (r.addEventListener(o, l, a), () => r.removeEventListener(o, l, a)), t = k(() => {
    const r = $o(ke(e[0])).filter((o) => o != null);
    return r.every((o) => typeof o != "string") ? r : void 0;
  });
  return Hs(() => {
    var r, o;
    return [
      (r = (o = t.value) === null || o === void 0 ? void 0 : o.map((l) => mt(l))) !== null && r !== void 0 ? r : [In].filter((l) => l != null),
      $o(ke(t.value ? e[1] : e[0])),
      $o(s(t.value ? e[2] : e[1])),
      ke(t.value ? e[3] : e[2])
    ];
  }, ([r, o, l, a], i, u) => {
    if (!(r != null && r.length) || !(o != null && o.length) || !(l != null && l.length))
      return;
    const c = Rs(a) ? { ...a } : a, d = r.flatMap((f) => o.flatMap((p) => l.map((v) => n(f, p, v, c))));
    u(() => {
      d.forEach((f) => f());
    });
  }, { flush: "post" });
}
// @__NO_SIDE_EFFECTS__
function ma() {
  const e = Kt(!1), n = Dt();
  return n && we(() => {
    e.value = !0;
  }, n), e;
}
// @__NO_SIDE_EFFECTS__
function Us(e) {
  const n = /* @__PURE__ */ ma();
  return k(() => (n.value, !!e()));
}
function Ks(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (n) => n.key === e : Array.isArray(e) ? (n) => e.includes(n.key) : () => !0;
}
function ha(...e) {
  let n, t, r = {};
  e.length === 3 ? (n = e[0], t = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (n = !0, t = e[0], r = e[1]) : (n = e[0], t = e[1]) : (n = !0, t = e[0]);
  const { target: o = In, eventName: l = "keydown", passive: a = !1, dedupe: i = !1 } = r, u = Ks(n);
  return no(o, l, (d) => {
    d.repeat && ke(i) || u(d) && t(d);
  }, a);
}
function ga(e, n = {}) {
  const { immediate: t = !0, fpsLimit: r = null, window: o = In, once: l = !1 } = n, a = Kt(!1), i = k(() => {
    const v = ke(r);
    return v ? 1e3 / v : null;
  });
  let u = 0, c = null;
  function d(v) {
    if (!a.value || !o)
      return;
    u || (u = v);
    const y = v - u;
    if (i.value && y < i.value) {
      c = o.requestAnimationFrame(d);
      return;
    }
    if (u = v, e({
      delta: y,
      timestamp: v
    }), l) {
      a.value = !1, c = null;
      return;
    }
    c = o.requestAnimationFrame(d);
  }
  function f() {
    !a.value && o && (a.value = !0, u = 0, c = o.requestAnimationFrame(d));
  }
  function p() {
    a.value = !1, c != null && o && (o.cancelAnimationFrame(c), c = null);
  }
  return t && f(), Yt(p), {
    isActive: Zl(a),
    pause: p,
    resume: f
  };
}
function Ws(e) {
  return JSON.parse(JSON.stringify(e));
}
function ba(e, n, t = {}) {
  const { window: r = In, ...o } = t;
  let l;
  const a = /* @__PURE__ */ Us(() => r && "ResizeObserver" in r), i = () => {
    l && (l.disconnect(), l = void 0);
  }, u = pe(k(() => {
    const d = ke(e);
    return Array.isArray(d) ? d.map((f) => mt(f)) : [mt(d)];
  }), (d) => {
    if (i(), a.value && r) {
      l = new ResizeObserver(n);
      for (const f of d)
        f && l.observe(f, o);
    }
  }, {
    immediate: !0,
    flush: "post"
  }), c = () => {
    i(), u();
  };
  return Yt(c), {
    isSupported: a,
    stop: c
  };
}
// @__NO_SIDE_EFFECTS__
function We(e, n, t, r = {}) {
  var o, l;
  const { clone: a = !1, passive: i = !1, eventName: u, deep: c = !1, defaultValue: d, shouldEmit: f } = r, p = Dt(), v = t || (p == null ? void 0 : p.emit) || (p == null || (o = p.$emit) === null || o === void 0 ? void 0 : o.bind(p)) || (p == null || (l = p.proxy) === null || l === void 0 || (l = l.$emit) === null || l === void 0 ? void 0 : l.bind(p == null ? void 0 : p.proxy));
  let y = u;
  n || (n = "modelValue"), y = y || `update:${n.toString()}`;
  const m = (h) => a ? typeof a == "function" ? a(h) : Ws(h) : h, S = () => Is(e[n]) ? m(e[n]) : d, x = (h) => {
    f ? f(h) && v(y, h) : v(y, h);
  };
  if (i) {
    const h = M(S());
    let w = !1;
    return pe(() => e[n], (C) => {
      w || (w = !0, h.value = m(C), ge(() => w = !1));
    }), pe(h, (C) => {
      !w && (C !== e[n] || c) && x(C);
    }, { deep: c }), h;
  } else
    return k({
      get() {
        return S();
      },
      set(h) {
        x(h);
      }
    });
}
function qo(e) {
  if (e === null || typeof e != "object")
    return !1;
  const n = Object.getPrototypeOf(e);
  return n !== null && n !== Object.prototype && Object.getPrototypeOf(n) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function Jo(e, n, t = ".", r) {
  if (!qo(n))
    return Jo(e, {}, t, r);
  const o = Object.assign({}, n);
  for (const l in e) {
    if (l === "__proto__" || l === "constructor")
      continue;
    const a = e[l];
    a != null && (r && r(o, l, a, t) || (Array.isArray(a) && Array.isArray(o[l]) ? o[l] = [...a, ...o[l]] : qo(a) && qo(o[l]) ? o[l] = Jo(
      a,
      o[l],
      (t ? `${t}.` : "") + l.toString(),
      r
    ) : o[l] = a));
  }
  return o;
}
function Gs(e) {
  return (...n) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    n.reduce((t, r) => Jo(t, r, "", e), {})
  );
}
const Ys = Gs(), Xs = /* @__PURE__ */ qs(() => {
  const e = M(/* @__PURE__ */ new Map()), n = M(), t = k(() => {
    for (const a of e.value.values())
      if (a)
        return !0;
    return !1;
  }), r = uo({ scrollBody: M(!0) });
  let o = null;
  const l = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = n.value ?? "", vl && (o == null || o()), n.value = void 0;
  };
  return pe(t, (a, i) => {
    var f;
    if (!at)
      return;
    if (!a) {
      i && l();
      return;
    }
    n.value === void 0 && (n.value = document.body.style.overflow);
    const u = window.innerWidth - document.documentElement.clientWidth, c = {
      padding: u,
      margin: 0
    }, d = (f = r.scrollBody) != null && f.value ? typeof r.scrollBody.value == "object" ? Ys({
      padding: r.scrollBody.value.padding === !0 ? u : r.scrollBody.value.padding,
      margin: r.scrollBody.value.margin === !0 ? u : r.scrollBody.value.margin
    }, c) : c : {
      padding: 0,
      margin: 0
    };
    u > 0 && (document.body.style.paddingRight = typeof d.padding == "number" ? `${d.padding}px` : String(d.padding), document.body.style.marginRight = typeof d.margin == "number" ? `${d.margin}px` : String(d.margin), document.documentElement.style.setProperty("--scrollbar-width", `${u}px`), document.body.style.overflow = "hidden"), vl && (o = no(document, "touchmove", (p) => Js(p), { passive: !1 })), ge(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, {
    immediate: !0,
    flush: "sync"
  }), e;
});
function xr(e) {
  const n = Math.random().toString(36).substring(2, 7), t = Xs();
  t.value.set(n, e ?? !1);
  const r = k({
    get: () => t.value.get(n) ?? !1,
    set: (o) => t.value.set(n, o)
  });
  return Vs(() => {
    t.value.delete(n);
  }), r;
}
function xa(e) {
  const n = window.getComputedStyle(e);
  if (n.overflowX === "scroll" || n.overflowY === "scroll" || n.overflowX === "auto" && e.clientWidth < e.scrollWidth || n.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const t = e.parentNode;
    return !(t instanceof Element) || t.tagName === "BODY" ? !1 : xa(t);
  }
}
function Js(e) {
  const n = e || window.event, t = n.target;
  return t instanceof Element && xa(t) ? !1 : n.touches.length > 1 ? !0 : (n.preventDefault && n.cancelable && n.preventDefault(), !1);
}
function Mn(e) {
  const n = uo({ dir: M("ltr") });
  return k(() => {
    var t;
    return (e == null ? void 0 : e.value) || ((t = n.dir) == null ? void 0 : t.value) || "ltr";
  });
}
function Zs(e) {
  const n = Dt(), t = n == null ? void 0 : n.type.emits, r = {};
  return t != null && t.length || console.warn(`No emitted event found. Please check component: ${n == null ? void 0 : n.type.__name}`), t == null || t.forEach((o) => {
    r[yi(ea(o))] = (...l) => e(o, ...l);
  }), r;
}
function Qs(e) {
  const n = k(() => s(e)), t = k(() => new Intl.Collator("en", {
    usage: "search",
    ...n.value
  }));
  return {
    startsWith: (a, i) => i.length === 0 ? !0 : (a = a.normalize("NFC"), i = i.normalize("NFC"), t.value.compare(a.slice(0, i.length), i) === 0),
    endsWith: (a, i) => i.length === 0 ? !0 : (a = a.normalize("NFC"), i = i.normalize("NFC"), t.value.compare(a.slice(-i.length), i) === 0),
    contains: (a, i) => {
      if (i.length === 0)
        return !0;
      a = a.normalize("NFC"), i = i.normalize("NFC");
      let u = 0;
      const c = i.length;
      for (; u + c <= a.length; u++) {
        const d = a.slice(u, u + c);
        if (t.value.compare(i, d) === 0)
          return !0;
      }
      return !1;
    }
  };
}
let Bo = 0;
function wr() {
  Ae((e) => {
    if (!at)
      return;
    const n = document.querySelectorAll("[data-reka-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", n[0] ?? yl()), document.body.insertAdjacentElement("beforeend", n[1] ?? yl()), Bo++, e(() => {
      Bo === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((t) => t.remove()), Bo--;
    });
  });
}
function yl() {
  const e = document.createElement("span");
  return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
function _r(e) {
  return k(() => {
    var n;
    return ke(e) ? !!((n = mt(e)) != null && n.closest("form")) : !0;
  });
}
function se() {
  const e = Dt(), n = M(), t = k(() => {
    var a, i;
    return ["#text", "#comment"].includes((a = n.value) == null ? void 0 : a.$el.nodeName) ? (i = n.value) == null ? void 0 : i.$el.nextElementSibling : mt(n);
  }), r = Object.assign({}, e.exposed), o = {};
  for (const a in e.props)
    Object.defineProperty(o, a, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[a]
    });
  if (Object.keys(r).length > 0)
    for (const a in r)
      Object.defineProperty(o, a, {
        enumerable: !0,
        configurable: !0,
        get: () => r[a]
      });
  Object.defineProperty(o, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = o;
  function l(a) {
    if (n.value = a, !!a && (Object.defineProperty(o, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => a instanceof Element ? a : a.$el
    }), !(a instanceof Element) && !Object.prototype.hasOwnProperty.call(a, "$el"))) {
      const i = a.$.exposed, u = Object.assign({}, o);
      for (const c in i)
        Object.defineProperty(u, c, {
          enumerable: !0,
          configurable: !0,
          get: () => i[c]
        });
      e.exposed = u;
    }
  }
  return {
    forwardRef: l,
    currentRef: n,
    currentElement: t
  };
}
function dn(e) {
  const n = Dt(), t = Object.keys((n == null ? void 0 : n.type.props) ?? {}).reduce((o, l) => {
    const a = (n == null ? void 0 : n.type.props[l]).default;
    return a !== void 0 && (o[l] = a), o;
  }, {}), r = mi(e);
  return k(() => {
    const o = {}, l = (n == null ? void 0 : n.vnode.props) ?? {};
    return Object.keys(l).forEach((a) => {
      o[ea(a)] = l[a];
    }), Object.keys({
      ...t,
      ...o
    }).reduce((a, i) => (r.value[i] !== void 0 && (a[i] = r.value[i]), a), {});
  });
}
function cn(e, n) {
  const t = dn(e), r = n ? Zs(n) : {};
  return k(() => ({
    ...t.value,
    ...r
  }));
}
function eu(e, n) {
  const t = gr(!1, 300);
  Yt(() => {
    t.value = !1;
  });
  const r = M(null), o = /* @__PURE__ */ Sn();
  function l() {
    r.value = null, t.value = !1;
  }
  function a(i, u) {
    const c = i.currentTarget, d = {
      x: i.clientX,
      y: i.clientY
    }, f = tu(d, c.getBoundingClientRect()), p = nu(d, f, 1), v = ou(u.getBoundingClientRect()), y = lu([...p, ...v]);
    r.value = y, t.value = !0;
  }
  return Ae((i) => {
    if (e.value && n.value) {
      const u = (d) => a(d, n.value), c = (d) => a(d, e.value);
      e.value.addEventListener("pointerleave", u), n.value.addEventListener("pointerleave", c), i(() => {
        var d, f;
        (d = e.value) == null || d.removeEventListener("pointerleave", u), (f = n.value) == null || f.removeEventListener("pointerleave", c);
      });
    }
  }), Ae((i) => {
    var u;
    if (r.value) {
      const c = (d) => {
        var S, x;
        if (!r.value || !(d.target instanceof Element))
          return;
        const f = d.target, p = {
          x: d.clientX,
          y: d.clientY
        }, v = ((S = e.value) == null ? void 0 : S.contains(f)) || ((x = n.value) == null ? void 0 : x.contains(f)), y = !ru(p, r.value), m = !!f.closest("[data-grace-area-trigger]");
        v ? l() : (y || m) && (l(), o.trigger());
      };
      (u = e.value) == null || u.ownerDocument.addEventListener("pointermove", c), i(() => {
        var d;
        return (d = e.value) == null ? void 0 : d.ownerDocument.removeEventListener("pointermove", c);
      });
    }
  }), {
    isPointerInTransit: t,
    onPointerExit: o.on
  };
}
function tu(e, n) {
  const t = Math.abs(n.top - e.y), r = Math.abs(n.bottom - e.y), o = Math.abs(n.right - e.x), l = Math.abs(n.left - e.x);
  switch (Math.min(t, r, o, l)) {
    case l:
      return "left";
    case o:
      return "right";
    case t:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function nu(e, n, t = 5) {
  const r = [];
  switch (n) {
    case "top":
      r.push({
        x: e.x - t,
        y: e.y + t
      }, {
        x: e.x + t,
        y: e.y + t
      });
      break;
    case "bottom":
      r.push({
        x: e.x - t,
        y: e.y - t
      }, {
        x: e.x + t,
        y: e.y - t
      });
      break;
    case "left":
      r.push({
        x: e.x + t,
        y: e.y - t
      }, {
        x: e.x + t,
        y: e.y + t
      });
      break;
    case "right":
      r.push({
        x: e.x - t,
        y: e.y - t
      }, {
        x: e.x - t,
        y: e.y + t
      });
      break;
  }
  return r;
}
function ou(e) {
  const { top: n, right: t, bottom: r, left: o } = e;
  return [
    {
      x: o,
      y: n
    },
    {
      x: t,
      y: n
    },
    {
      x: t,
      y: r
    },
    {
      x: o,
      y: r
    }
  ];
}
function ru(e, n) {
  const { x: t, y: r } = e;
  let o = !1;
  for (let l = 0, a = n.length - 1; l < n.length; a = l++) {
    const i = n[l].x, u = n[l].y, c = n[a].x, d = n[a].y;
    u > r != d > r && t < (c - i) * (r - u) / (d - u) + i && (o = !o);
  }
  return o;
}
function lu(e) {
  const n = e.slice();
  return n.sort((t, r) => t.x < r.x ? -1 : t.x > r.x ? 1 : t.y < r.y ? -1 : t.y > r.y ? 1 : 0), au(n);
}
function au(e) {
  if (e.length <= 1)
    return e.slice();
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const l = n[n.length - 1], a = n[n.length - 2];
      if ((l.x - a.x) * (o.y - a.y) >= (l.y - a.y) * (o.x - a.x))
        n.pop();
      else
        break;
    }
    n.push(o);
  }
  n.pop();
  const t = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const l = t[t.length - 1], a = t[t.length - 2];
      if ((l.x - a.x) * (o.y - a.y) >= (l.y - a.y) * (o.x - a.x))
        t.pop();
      else
        break;
    }
    t.push(o);
  }
  return t.pop(), n.length === 1 && t.length === 1 && n[0].x === t[0].x && n[0].y === t[0].y ? n : n.concat(t);
}
var iu = function(e) {
  if (typeof document > "u")
    return null;
  var n = Array.isArray(e) ? e[0] : e;
  return n.ownerDocument.body;
}, on = /* @__PURE__ */ new WeakMap(), Hn = /* @__PURE__ */ new WeakMap(), Un = {}, Fo = 0, wa = function(e) {
  return e && (e.host || wa(e.parentNode));
}, su = function(e, n) {
  return n.map(function(t) {
    if (e.contains(t))
      return t;
    var r = wa(t);
    return r && e.contains(r) ? r : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(t) {
    return !!t;
  });
}, uu = function(e, n, t, r) {
  var o = su(n, Array.isArray(e) ? e : [e]);
  Un[t] || (Un[t] = /* @__PURE__ */ new WeakMap());
  var l = Un[t], a = [], i = /* @__PURE__ */ new Set(), u = new Set(o), c = function(f) {
    !f || i.has(f) || (i.add(f), c(f.parentNode));
  };
  o.forEach(c);
  var d = function(f) {
    !f || u.has(f) || Array.prototype.forEach.call(f.children, function(p) {
      if (i.has(p))
        d(p);
      else
        try {
          var v = p.getAttribute(r), y = v !== null && v !== "false", m = (on.get(p) || 0) + 1, S = (l.get(p) || 0) + 1;
          on.set(p, m), l.set(p, S), a.push(p), m === 1 && y && Hn.set(p, !0), S === 1 && p.setAttribute(t, "true"), y || p.setAttribute(r, "true");
        } catch (x) {
          console.error("aria-hidden: cannot operate on ", p, x);
        }
    });
  };
  return d(n), i.clear(), Fo++, function() {
    a.forEach(function(f) {
      var p = on.get(f) - 1, v = l.get(f) - 1;
      on.set(f, p), l.set(f, v), p || (Hn.has(f) || f.removeAttribute(r), Hn.delete(f)), v || f.removeAttribute(t);
    }), Fo--, Fo || (on = /* @__PURE__ */ new WeakMap(), on = /* @__PURE__ */ new WeakMap(), Hn = /* @__PURE__ */ new WeakMap(), Un = {});
  };
}, du = function(e, n, t) {
  t === void 0 && (t = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = n || iu(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), uu(r, o, t, "aria-hidden")) : function() {
    return null;
  };
};
function Sr(e) {
  let n;
  pe(() => mt(e), (t) => {
    t ? n = du(t) : n && n();
  }), Ge(() => {
    n && n();
  });
}
let cu = 0;
function Qe(e, n = "reka") {
  var r;
  if (e)
    return e;
  if ("useId" in ln)
    return `${n}-${(r = ln.useId) == null ? void 0 : r.call(ln)}`;
  const t = uo({ useId: void 0 });
  return t.useId ? `${n}-${t.useId()}` : `${n}-${++cu}`;
}
function fu() {
  return {
    ALT: "Alt",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_UP: "ArrowUp",
    BACKSPACE: "Backspace",
    CAPS_LOCK: "CapsLock",
    CONTROL: "Control",
    DELETE: "Delete",
    END: "End",
    ENTER: "Enter",
    ESCAPE: "Escape",
    F1: "F1",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    HOME: "Home",
    META: "Meta",
    PAGE_DOWN: "PageDown",
    PAGE_UP: "PageUp",
    SHIFT: "Shift",
    SPACE: " ",
    TAB: "Tab",
    CTRL: "Control",
    ASTERISK: "*",
    SPACE_CODE: "Space"
  };
}
function pu(e) {
  const n = M(), t = k(() => {
    var o;
    return ((o = n.value) == null ? void 0 : o.width) ?? 0;
  }), r = k(() => {
    var o;
    return ((o = n.value) == null ? void 0 : o.height) ?? 0;
  });
  return we(() => {
    const o = mt(e);
    if (o) {
      n.value = {
        width: o.offsetWidth,
        height: o.offsetHeight
      };
      const l = new ResizeObserver((a) => {
        if (!Array.isArray(a) || !a.length)
          return;
        const i = a[0];
        let u, c;
        if ("borderBoxSize" in i) {
          const d = i.borderBoxSize, f = Array.isArray(d) ? d[0] : d;
          u = f.inlineSize, c = f.blockSize;
        } else
          u = o.offsetWidth, c = o.offsetHeight;
        n.value = {
          width: u,
          height: c
        };
      });
      return l.observe(o, { box: "border-box" }), () => l.unobserve(o);
    } else
      n.value = void 0;
  }), {
    width: t,
    height: r
  };
}
function vu(e, n) {
  const t = M(e);
  function r(l) {
    return n[t.value][l] ?? t.value;
  }
  return {
    state: t,
    dispatch: (l) => {
      t.value = r(l);
    }
  };
}
function Cr(e) {
  const n = gr("", 1e3);
  return {
    search: n,
    handleTypeaheadSearch: (o, l) => {
      if (n.value = n.value + o, e)
        e(o);
      else {
        const a = ze(), i = l.map((p) => {
          var v, y;
          return {
            ...p,
            textValue: ((v = p.value) == null ? void 0 : v.textValue) ?? ((y = p.ref.textContent) == null ? void 0 : y.trim()) ?? ""
          };
        }), u = i.find((p) => p.ref === a), c = i.map((p) => p.textValue), d = mu(c, n.value, u == null ? void 0 : u.textValue), f = i.find((p) => p.textValue === d);
        return f && f.ref.focus(), f == null ? void 0 : f.ref;
      }
    },
    resetTypeahead: () => {
      n.value = "";
    }
  };
}
function yu(e, n) {
  return e.map((t, r) => e[(n + r) % e.length]);
}
function mu(e, n, t) {
  const o = n.length > 1 && Array.from(n).every((c) => c === n[0]) ? n[0] : n, l = t ? e.indexOf(t) : -1;
  let a = yu(e, Math.max(l, 0));
  o.length === 1 && (a = a.filter((c) => c !== t));
  const u = a.find((c) => c.toLowerCase().startsWith(o.toLowerCase()));
  return u !== t ? u : void 0;
}
function hu(e, n) {
  var S;
  const t = M({}), r = M("none"), o = M(e), l = e.value ? "mounted" : "unmounted";
  let a;
  const i = ((S = n.value) == null ? void 0 : S.ownerDocument.defaultView) ?? In, { state: u, dispatch: c } = vu(l, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: { MOUNT: "mounted" }
  }), d = (x) => {
    var h;
    if (at) {
      const w = new CustomEvent(x, {
        bubbles: !1,
        cancelable: !1
      });
      (h = n.value) == null || h.dispatchEvent(w);
    }
  };
  pe(e, async (x, h) => {
    var C;
    const w = h !== x;
    if (await ge(), w) {
      const g = r.value, b = Kn(n.value);
      x ? (c("MOUNT"), d("enter"), b === "none" && d("after-enter")) : b === "none" || b === "undefined" || ((C = t.value) == null ? void 0 : C.display) === "none" ? (c("UNMOUNT"), d("leave"), d("after-leave")) : h && g !== b ? (c("ANIMATION_OUT"), d("leave")) : (c("UNMOUNT"), d("after-leave"));
    }
  }, { immediate: !0 });
  const f = (x) => {
    const h = Kn(n.value), w = h.includes(CSS.escape(x.animationName)), C = u.value === "mounted" ? "enter" : "leave";
    if (x.target === n.value && w && (d(`after-${C}`), c("ANIMATION_END"), !o.value)) {
      const g = n.value.style.animationFillMode;
      n.value.style.animationFillMode = "forwards", a = i == null ? void 0 : i.setTimeout(() => {
        var b;
        ((b = n.value) == null ? void 0 : b.style.animationFillMode) === "forwards" && (n.value.style.animationFillMode = g);
      });
    }
    x.target === n.value && h === "none" && c("ANIMATION_END");
  }, p = (x) => {
    x.target === n.value && (r.value = Kn(n.value));
  }, v = pe(n, (x, h) => {
    x ? (t.value = getComputedStyle(x), x.addEventListener("animationstart", p), x.addEventListener("animationcancel", f), x.addEventListener("animationend", f)) : (c("ANIMATION_END"), a !== void 0 && (i == null || i.clearTimeout(a)), h == null || h.removeEventListener("animationstart", p), h == null || h.removeEventListener("animationcancel", f), h == null || h.removeEventListener("animationend", f));
  }, { immediate: !0 }), y = pe(u, () => {
    const x = Kn(n.value);
    r.value = u.value === "mounted" ? x : "none";
  });
  return Ge(() => {
    v(), y();
  }), { isPresent: k(() => ["mounted", "unmountSuspended"].includes(u.value)) };
}
function Kn(e) {
  return e && getComputedStyle(e).animationName || "none";
}
var fn = N({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: { type: Boolean }
  },
  slots: {},
  setup(e, { slots: n, expose: t }) {
    var c;
    const { present: r, forceMount: o } = $e(e), l = M(), { isPresent: a } = hu(r, l);
    t({ present: a });
    let i = n.default({ present: a.value });
    i = hr(i || []);
    const u = Dt();
    if (i && (i == null ? void 0 : i.length) > 1) {
      const d = (c = u == null ? void 0 : u.parent) != null && c.type.name ? `<${u.parent.type.name} />` : "component";
      throw new Error([
        `Detected an invalid children for \`${d}\` for  \`Presence\` component.`,
        "",
        "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
        "You can apply a few solutions:",
        ["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((f) => `  - ${f}`).join(`
`)
      ].join(`
`));
    }
    return () => o.value || r.value || a.value ? ae(n.default({ present: a.value })[0], { ref: (d) => {
      const f = mt(d);
      return typeof (f == null ? void 0 : f.hasAttribute) > "u" || (f != null && f.hasAttribute("data-reka-popper-content-wrapper") ? l.value = f.firstElementChild : l.value = f), f;
    } }) : null;
  }
});
const Zo = N({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: n, slots: t }) {
    return () => {
      var u;
      if (!t.default)
        return null;
      const r = hr(t.default()), o = r.findIndex((c) => c.type !== hi);
      if (o === -1)
        return r;
      const l = r[o];
      (u = l.props) == null || delete u.ref;
      const a = l.props ? Q(n, l.props) : n, i = cr({
        ...l,
        props: {}
      }, a);
      return r.length === 1 ? i : (r[o] = i, r);
    };
  }
}), gu = [
  "area",
  "img",
  "input"
], de = N({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(e, { attrs: n, slots: t }) {
    const r = e.asChild ? "template" : e.as;
    return typeof r == "string" && gu.includes(r) ? () => ae(r, n) : r !== "template" ? () => ae(e.as, n, { default: t.default }) : () => ae(Zo, n, { default: t.default });
  }
});
function It() {
  const e = M(), n = k(() => {
    var t, r;
    return ["#text", "#comment"].includes((t = e.value) == null ? void 0 : t.$el.nodeName) ? (r = e.value) == null ? void 0 : r.$el.nextElementSibling : mt(e);
  });
  return {
    primitiveElement: e,
    currentElement: n
  };
}
const bu = "dismissableLayer.pointerDownOutside", xu = "dismissableLayer.focusOutside";
function _a(e, n) {
  const t = n.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), o = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
  return !!(t && (r === t || o.indexOf(r) < o.indexOf(t)));
}
function wu(e, n, t = !0) {
  var a;
  const r = ((a = n == null ? void 0 : n.value) == null ? void 0 : a.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = M(!1), l = M(() => {
  });
  return Ae((i) => {
    if (!at || !ke(t))
      return;
    const u = async (d) => {
      const f = d.target;
      if (!(!(n != null && n.value) || !f)) {
        if (_a(n.value, f)) {
          o.value = !1;
          return;
        }
        if (d.target && !o.value) {
          let v = function() {
            so(bu, e, p);
          };
          const p = { originalEvent: d };
          d.pointerType === "touch" ? (r.removeEventListener("click", l.value), l.value = v, r.addEventListener("click", l.value, { once: !0 })) : v();
        } else
          r.removeEventListener("click", l.value);
        o.value = !1;
      }
    }, c = window.setTimeout(() => {
      r.addEventListener("pointerdown", u);
    }, 0);
    i(() => {
      window.clearTimeout(c), r.removeEventListener("pointerdown", u), r.removeEventListener("click", l.value);
    });
  }), { onPointerDownCapture: () => {
    ke(t) && (o.value = !0);
  } };
}
function _u(e, n, t = !0) {
  var l;
  const r = ((l = n == null ? void 0 : n.value) == null ? void 0 : l.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = M(!1);
  return Ae((a) => {
    if (!at || !ke(t))
      return;
    const i = async (u) => {
      if (!(n != null && n.value))
        return;
      await ge(), await ge();
      const c = u.target;
      !n.value || !c || _a(n.value, c) || u.target && !o.value && so(xu, e, { originalEvent: u });
    };
    r.addEventListener("focusin", i), a(() => r.removeEventListener("focusin", i));
  }), {
    onFocusCapture: () => {
      ke(t) && (o.value = !0);
    },
    onBlurCapture: () => {
      ke(t) && (o.value = !1);
    }
  };
}
const Xe = Ht({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  originalBodyPointerEvents: void 0,
  branches: /* @__PURE__ */ new Set()
});
var Su = /* @__PURE__ */ N({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "dismiss"
  ],
  setup(e, { emit: n }) {
    const t = e, r = n, { forwardRef: o, currentElement: l } = se(), a = k(() => {
      var v;
      return ((v = l.value) == null ? void 0 : v.ownerDocument) ?? globalThis.document;
    }), i = k(() => Xe.layersRoot), u = k(() => l.value ? Array.from(i.value).indexOf(l.value) : -1), c = k(() => Xe.layersWithOutsidePointerEventsDisabled.size > 0), d = k(() => {
      const v = Array.from(i.value), [y] = [...Xe.layersWithOutsidePointerEventsDisabled].slice(-1), m = v.indexOf(y);
      return u.value >= m;
    }), f = wu(async (v) => {
      const y = [...Xe.branches].some((m) => m == null ? void 0 : m.contains(v.target));
      !d.value || y || (r("pointerDownOutside", v), r("interactOutside", v), await ge(), v.defaultPrevented || r("dismiss"));
    }, l), p = _u((v) => {
      [...Xe.branches].some((m) => m == null ? void 0 : m.contains(v.target)) || (r("focusOutside", v), r("interactOutside", v), v.defaultPrevented || r("dismiss"));
    }, l);
    return ha("Escape", (v) => {
      u.value === i.value.size - 1 && (r("escapeKeyDown", v), v.defaultPrevented || r("dismiss"));
    }), Ae((v) => {
      l.value && (t.disableOutsidePointerEvents && (Xe.layersWithOutsidePointerEventsDisabled.size === 0 && (Xe.originalBodyPointerEvents = a.value.body.style.pointerEvents, a.value.body.style.pointerEvents = "none"), Xe.layersWithOutsidePointerEventsDisabled.add(l.value)), i.value.add(l.value), v(() => {
        t.disableOutsidePointerEvents && Xe.layersWithOutsidePointerEventsDisabled.size === 1 && !Xo(Xe.originalBodyPointerEvents) && (a.value.body.style.pointerEvents = Xe.originalBodyPointerEvents);
      }));
    }), Ae((v) => {
      v(() => {
        l.value && (i.value.delete(l.value), Xe.layersWithOutsidePointerEventsDisabled.delete(l.value));
      });
    }), (v, y) => (A(), q(s(de), {
      ref: s(o),
      "as-child": v.asChild,
      as: v.as,
      "data-dismissable-layer": "",
      style: yt({ pointerEvents: c.value ? d.value ? "auto" : "none" : void 0 }),
      onFocusCapture: s(p).onFocusCapture,
      onBlurCapture: s(p).onBlurCapture,
      onPointerdownCapture: s(f).onPointerDownCapture
    }, {
      default: P(() => [F(v.$slots, "default")]),
      _: 3
    }, 8, [
      "as-child",
      "as",
      "style",
      "onFocusCapture",
      "onBlurCapture",
      "onPointerdownCapture"
    ]));
  }
}), co = Su;
const Cu = /* @__PURE__ */ Ps(() => M([]));
function Au() {
  const e = Cu();
  return {
    add(n) {
      const t = e.value[0];
      n !== t && (t == null || t.pause()), e.value = ml(e.value, n), e.value.unshift(n);
    },
    remove(n) {
      var t;
      e.value = ml(e.value, n), (t = e.value[0]) == null || t.resume();
    }
  };
}
function ml(e, n) {
  const t = [...e], r = t.indexOf(n);
  return r !== -1 && t.splice(r, 1), t;
}
const No = "focusScope.autoFocusOnMount", Vo = "focusScope.autoFocusOnUnmount", hl = {
  bubbles: !1,
  cancelable: !0
};
function Ou(e, { select: n = !1 } = {}) {
  const t = ze();
  for (const r of e)
    if (jt(r, { select: n }), ze() !== t)
      return !0;
}
function Eu(e) {
  const n = Sa(e), t = gl(n, e), r = gl(n.reverse(), e);
  return [t, r];
}
function Sa(e) {
  const n = [], t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (r) => {
    const o = r.tagName === "INPUT" && r.type === "hidden";
    return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; t.nextNode(); )
    n.push(t.currentNode);
  return n;
}
function gl(e, n) {
  for (const t of e)
    if (!Tu(t, { upTo: n }))
      return t;
}
function Tu(e, { upTo: n }) {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (n !== void 0 && e === n)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}
function ku(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function jt(e, { select: n = !1 } = {}) {
  if (e && e.focus) {
    const t = ze();
    e.focus({ preventScroll: !0 }), e !== t && ku(e) && n && e.select();
  }
}
var ju = /* @__PURE__ */ N({
  __name: "FocusScope",
  props: {
    loop: {
      type: Boolean,
      required: !1,
      default: !1
    },
    trapped: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: n }) {
    const t = e, r = n, { currentRef: o, currentElement: l } = se(), a = M(null), i = Au(), u = Ht({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    Ae((d) => {
      if (!at)
        return;
      const f = l.value;
      if (!t.trapped)
        return;
      function p(S) {
        if (u.paused || !f)
          return;
        const x = S.target;
        f.contains(x) ? a.value = x : jt(a.value, { select: !0 });
      }
      function v(S) {
        if (u.paused || !f)
          return;
        const x = S.relatedTarget;
        x !== null && (f.contains(x) || jt(a.value, { select: !0 }));
      }
      function y(S) {
        f.contains(a.value) || jt(f);
      }
      document.addEventListener("focusin", p), document.addEventListener("focusout", v);
      const m = new MutationObserver(y);
      f && m.observe(f, {
        childList: !0,
        subtree: !0
      }), d(() => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", v), m.disconnect();
      });
    }), Ae(async (d) => {
      const f = l.value;
      if (await ge(), !f)
        return;
      i.add(u);
      const p = ze();
      if (!f.contains(p)) {
        const y = new CustomEvent(No, hl);
        f.addEventListener(No, (m) => r("mountAutoFocus", m)), f.dispatchEvent(y), y.defaultPrevented || (Ou(Sa(f), { select: !0 }), ze() === p && jt(f));
      }
      d(() => {
        f.removeEventListener(No, (S) => r("mountAutoFocus", S));
        const y = new CustomEvent(Vo, hl), m = (S) => {
          r("unmountAutoFocus", S);
        };
        f.addEventListener(Vo, m), f.dispatchEvent(y), setTimeout(() => {
          y.defaultPrevented || jt(p ?? document.body, { select: !0 }), f.removeEventListener(Vo, m), i.remove(u);
        }, 0);
      });
    });
    function c(d) {
      if (!t.loop && !t.trapped || u.paused)
        return;
      const f = d.key === "Tab" && !d.altKey && !d.ctrlKey && !d.metaKey, p = ze();
      if (f && p) {
        const v = d.currentTarget, [y, m] = Eu(v);
        y && m ? !d.shiftKey && p === m ? (d.preventDefault(), t.loop && jt(y, { select: !0 })) : d.shiftKey && p === y && (d.preventDefault(), t.loop && jt(m, { select: !0 })) : p === v && d.preventDefault();
      }
    }
    return (d, f) => (A(), q(s(de), {
      ref_key: "currentRef",
      ref: o,
      tabindex: "-1",
      "as-child": d.asChild,
      as: d.as,
      onKeydown: c
    }, {
      default: P(() => [F(d.$slots, "default")]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), Ar = ju;
function bl(e) {
  const n = ze();
  for (const t of e)
    if (t === n || (t.focus(), ze() !== n))
      return;
}
var Pu = /* @__PURE__ */ N({
  __name: "Teleport",
  props: {
    to: {
      type: null,
      required: !1,
      default: "body"
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const n = /* @__PURE__ */ ma();
    return (t, r) => s(n) || t.forceMount ? (A(), q(fr, {
      key: 0,
      to: t.to,
      disabled: t.disabled,
      defer: t.defer
    }, [F(t.$slots, "default")], 8, [
      "to",
      "disabled",
      "defer"
    ])) : J("v-if", !0);
  }
}), fo = Pu;
const xl = "data-reka-collection-item";
function it(e = {}) {
  const { key: n = "", isProvider: t = !1 } = e, r = `${n}CollectionProvider`;
  let o;
  if (t) {
    const d = M(/* @__PURE__ */ new Map());
    o = {
      collectionRef: M(),
      itemMap: d
    }, jn(r, o);
  } else
    o = kn(r);
  const l = (d = !1) => {
    const f = o.collectionRef.value;
    if (!f)
      return [];
    const p = Array.from(f.querySelectorAll(`[${xl}]`)), y = Array.from(o.itemMap.value.values()).sort((m, S) => p.indexOf(m.ref) - p.indexOf(S.ref));
    return d ? y : y.filter((m) => m.ref.dataset.disabled !== "");
  }, a = N({
    name: "CollectionSlot",
    inheritAttrs: !1,
    setup(d, { slots: f, attrs: p }) {
      const { primitiveElement: v, currentElement: y } = It();
      return pe(y, () => {
        o.collectionRef.value = y.value;
      }), () => ae(Zo, {
        ref: v,
        ...p
      }, f);
    }
  }), i = N({
    name: "CollectionItem",
    inheritAttrs: !1,
    props: { value: { validator: () => !0 } },
    setup(d, { slots: f, attrs: p }) {
      const { primitiveElement: v, currentElement: y } = It();
      return Ae((m) => {
        if (y.value) {
          const S = un(y.value);
          o.itemMap.value.set(S, {
            ref: y.value,
            value: d.value
          }), m(() => o.itemMap.value.delete(S));
        }
      }), () => ae(Zo, {
        ...p,
        [xl]: "",
        ref: v
      }, f);
    }
  }), u = k(() => Array.from(o.itemMap.value.values())), c = k(() => o.itemMap.value.size);
  return {
    getItems: l,
    reactiveItems: u,
    itemMapSize: c,
    CollectionSlot: a,
    CollectionItem: i
  };
}
const Iu = "rovingFocusGroup.onEntryFocus", Mu = {
  bubbles: !1,
  cancelable: !0
}, Ru = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Du(e, n) {
  return n !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Ca(e, n, t) {
  const r = Du(e.key, t);
  if (!(n === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(n === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Ru[r];
}
function Aa(e, n = !1) {
  const t = ze();
  for (const r of e)
    if (r === t || (r.focus({ preventScroll: n }), ze() !== t))
      return;
}
function Lu(e, n) {
  return e.map((t, r) => e[(n + r) % e.length]);
}
const [$u, qu] = Oe("RovingFocusGroup");
var Bu = /* @__PURE__ */ N({
  __name: "RovingFocusGroup",
  props: {
    orientation: {
      type: String,
      required: !1,
      default: void 0
    },
    dir: {
      type: String,
      required: !1
    },
    loop: {
      type: Boolean,
      required: !1,
      default: !1
    },
    currentTabStopId: {
      type: [String, null],
      required: !1
    },
    defaultCurrentTabStopId: {
      type: String,
      required: !1
    },
    preventScrollOnEntryFocus: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["entryFocus", "update:currentTabStopId"],
  setup(e, { expose: n, emit: t }) {
    const r = e, o = t, { loop: l, orientation: a, dir: i } = $e(r), u = Mn(i), c = /* @__PURE__ */ We(r, "currentTabStopId", o, {
      defaultValue: r.defaultCurrentTabStopId,
      passive: r.currentTabStopId === void 0
    }), d = M(!1), f = M(!1), p = M(0), { getItems: v, CollectionSlot: y } = it({ isProvider: !0 });
    function m(x) {
      const h = !f.value;
      if (x.currentTarget && x.target === x.currentTarget && h && !d.value) {
        const w = new CustomEvent(Iu, Mu);
        if (x.currentTarget.dispatchEvent(w), o("entryFocus", w), !w.defaultPrevented) {
          const C = v().map((_) => _.ref).filter((_) => _.dataset.disabled !== ""), g = C.find((_) => _.getAttribute("data-active") === ""), b = C.find((_) => _.getAttribute("data-highlighted") === ""), O = C.find((_) => _.id === c.value), T = [
            g,
            b,
            O,
            ...C
          ].filter(Boolean);
          Aa(T, r.preventScrollOnEntryFocus);
        }
      }
      f.value = !1;
    }
    function S() {
      setTimeout(() => {
        f.value = !1;
      }, 1);
    }
    return n({ getItems: v }), qu({
      loop: l,
      dir: u,
      orientation: a,
      currentTabStopId: c,
      onItemFocus: (x) => {
        c.value = x;
      },
      onItemShiftTab: () => {
        d.value = !0;
      },
      onFocusableItemAdd: () => {
        p.value++;
      },
      onFocusableItemRemove: () => {
        p.value--;
      }
    }), (x, h) => (A(), q(s(y), null, {
      default: P(() => [V(s(de), {
        tabindex: d.value || p.value === 0 ? -1 : 0,
        "data-orientation": s(a),
        as: x.as,
        "as-child": x.asChild,
        dir: s(u),
        style: { outline: "none" },
        onMousedown: h[0] || (h[0] = (w) => f.value = !0),
        onMouseup: S,
        onFocus: m,
        onBlur: h[1] || (h[1] = (w) => d.value = !1)
      }, {
        default: P(() => [F(x.$slots, "default")]),
        _: 3
      }, 8, [
        "tabindex",
        "data-orientation",
        "as",
        "as-child",
        "dir"
      ])]),
      _: 3
    }));
  }
}), Fu = Bu, Nu = /* @__PURE__ */ N({
  __name: "RovingFocusItem",
  props: {
    tabStopId: {
      type: String,
      required: !1
    },
    focusable: {
      type: Boolean,
      required: !1,
      default: !0
    },
    active: {
      type: Boolean,
      required: !1
    },
    allowShiftKey: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const n = e, t = $u(), r = Qe(), o = k(() => n.tabStopId || r), l = k(() => t.currentTabStopId.value === o.value), { getItems: a, CollectionItem: i } = it();
    we(() => {
      n.focusable && t.onFocusableItemAdd();
    }), Ge(() => {
      n.focusable && t.onFocusableItemRemove();
    });
    function u(c) {
      if (c.key === "Tab" && c.shiftKey) {
        t.onItemShiftTab();
        return;
      }
      if (c.target !== c.currentTarget)
        return;
      const d = Ca(c, t.orientation.value, t.dir.value);
      if (d !== void 0) {
        if (c.metaKey || c.ctrlKey || c.altKey || !n.allowShiftKey && c.shiftKey)
          return;
        c.preventDefault();
        let f = [...a().map((p) => p.ref).filter((p) => p.dataset.disabled !== "")];
        if (d === "last")
          f.reverse();
        else if (d === "prev" || d === "next") {
          d === "prev" && f.reverse();
          const p = f.indexOf(c.currentTarget);
          f = t.loop.value ? Lu(f, p + 1) : f.slice(p + 1);
        }
        ge(() => Aa(f));
      }
    }
    return (c, d) => (A(), q(s(i), null, {
      default: P(() => [V(s(de), {
        tabindex: l.value ? 0 : -1,
        "data-orientation": s(t).orientation.value,
        "data-active": c.active ? "" : void 0,
        "data-disabled": c.focusable ? void 0 : "",
        as: c.as,
        "as-child": c.asChild,
        onMousedown: d[0] || (d[0] = (f) => {
          c.focusable ? s(t).onItemFocus(o.value) : f.preventDefault();
        }),
        onFocus: d[1] || (d[1] = (f) => s(t).onItemFocus(o.value)),
        onKeydown: u
      }, {
        default: P(() => [F(c.$slots, "default")]),
        _: 3
      }, 8, [
        "tabindex",
        "data-orientation",
        "data-active",
        "data-disabled",
        "as",
        "as-child"
      ])]),
      _: 3
    }));
  }
}), Vu = Nu, zu = /* @__PURE__ */ N({
  __name: "VisuallyHidden",
  props: {
    feature: {
      type: String,
      required: !1,
      default: "focusable"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    return (n, t) => (A(), q(s(de), {
      as: n.as,
      "as-child": n.asChild,
      "aria-hidden": n.feature === "focusable" ? "true" : void 0,
      "data-hidden": n.feature === "fully-hidden" ? "" : void 0,
      tabindex: n.feature === "fully-hidden" ? "-1" : void 0,
      style: {
        position: "absolute",
        border: 0,
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        top: "-1px",
        left: "-1px"
      }
    }, {
      default: P(() => [F(n.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "aria-hidden",
      "data-hidden",
      "tabindex"
    ]));
  }
}), po = zu, Hu = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "VisuallyHiddenInputBubble",
  props: {
    name: {
      type: String,
      required: !0
    },
    value: {
      type: null,
      required: !0
    },
    checked: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    required: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    feature: {
      type: String,
      required: !1,
      default: "fully-hidden"
    }
  },
  setup(e) {
    const n = e, { primitiveElement: t, currentElement: r } = It(), o = k(() => n.checked ?? n.value);
    return pe(o, (l, a) => {
      if (!r.value)
        return;
      const i = r.value, u = window.HTMLInputElement.prototype, d = Object.getOwnPropertyDescriptor(u, "value").set;
      if (d && l !== a) {
        const f = new Event("input", { bubbles: !0 }), p = new Event("change", { bubbles: !0 });
        d.call(i, l), i.dispatchEvent(f), i.dispatchEvent(p);
      }
    }), (l, a) => (A(), q(po, Q({
      ref_key: "primitiveElement",
      ref: t
    }, {
      ...n,
      ...l.$attrs
    }, { as: "input" }), null, 16));
  }
}), wl = Hu, Uu = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "VisuallyHiddenInput",
  props: {
    name: {
      type: String,
      required: !0
    },
    value: {
      type: null,
      required: !0
    },
    checked: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    required: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    feature: {
      type: String,
      required: !1,
      default: "fully-hidden"
    }
  },
  setup(e) {
    const n = e, t = k(() => typeof n.value == "object" && Array.isArray(n.value) && n.value.length === 0 && n.required), r = k(() => typeof n.value == "string" || typeof n.value == "number" || typeof n.value == "boolean" || n.value === null || n.value === void 0 ? [{
      name: n.name,
      value: n.value
    }] : typeof n.value == "object" && Array.isArray(n.value) ? n.value.flatMap((o, l) => typeof o == "object" ? Object.entries(o).map(([a, i]) => ({
      name: `${n.name}[${l}][${a}]`,
      value: i
    })) : {
      name: `${n.name}[${l}]`,
      value: o
    }) : n.value !== null && typeof n.value == "object" && !Array.isArray(n.value) ? Object.entries(n.value).map(([o, l]) => ({
      name: `${n.name}[${o}]`,
      value: l
    })) : []);
    return (o, l) => (A(), H(be, null, [J(" We render single input if it's required "), t.value ? (A(), q(wl, Q({ key: o.name }, {
      ...n,
      ...o.$attrs
    }, {
      name: o.name,
      value: o.value
    }), null, 16, ["name", "value"])) : (A(!0), H(be, { key: 1 }, ot(r.value, (a) => (A(), q(wl, Q({ key: a.name }, { ref_for: !0 }, {
      ...n,
      ...o.$attrs
    }, {
      name: a.name,
      value: a.value
    }), null, 16, ["name", "value"]))), 128))], 2112));
  }
}), Oa = Uu;
const [Ea, Ku] = Oe("PopperRoot");
var Wu = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "PopperRoot",
  setup(e) {
    const n = M();
    return Ku({
      anchor: n,
      onAnchorChange: (t) => n.value = t
    }), (t, r) => F(t.$slots, "default");
  }
}), vo = Wu, Gu = /* @__PURE__ */ N({
  __name: "PopperAnchor",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e, { forwardRef: t, currentElement: r } = se(), o = Ea();
    return pr(() => {
      o.onAnchorChange(n.reference ?? r.value);
    }), (l, a) => (A(), q(s(de), {
      ref: s(t),
      as: l.as,
      "as-child": l.asChild
    }, {
      default: P(() => [F(l.$slots, "default")]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), yo = Gu;
const Yu = {
  key: 0,
  d: "M0 0L6 6L12 0"
}, Xu = {
  key: 1,
  d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
var Ju = /* @__PURE__ */ N({
  __name: "Arrow",
  props: {
    width: {
      type: Number,
      required: !1,
      default: 10
    },
    height: {
      type: Number,
      required: !1,
      default: 5
    },
    rounded: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "svg"
    }
  },
  setup(e) {
    const n = e;
    return se(), (t, r) => (A(), q(s(de), Q(n, {
      width: t.width,
      height: t.height,
      viewBox: t.asChild ? void 0 : "0 0 12 6",
      preserveAspectRatio: t.asChild ? void 0 : "none"
    }), {
      default: P(() => [F(t.$slots, "default", {}, () => [t.rounded ? (A(), H("path", Xu)) : (A(), H("path", Yu))])]),
      _: 3
    }, 16, [
      "width",
      "height",
      "viewBox",
      "preserveAspectRatio"
    ]));
  }
}), Zu = Ju;
function Qu(e) {
  return e !== null;
}
function ed(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(n) {
      var S, x, h;
      const { placement: t, rects: r, middlewareData: o } = n, a = ((S = o.arrow) == null ? void 0 : S.centerOffset) !== 0, i = a ? 0 : e.arrowWidth, u = a ? 0 : e.arrowHeight, [c, d] = Qo(t), f = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[d], p = (((x = o.arrow) == null ? void 0 : x.x) ?? 0) + i / 2, v = (((h = o.arrow) == null ? void 0 : h.y) ?? 0) + u / 2;
      let y = "", m = "";
      return c === "bottom" ? (y = a ? f : `${p}px`, m = `${-u}px`) : c === "top" ? (y = a ? f : `${p}px`, m = `${r.floating.height + u}px`) : c === "right" ? (y = `${-u}px`, m = a ? f : `${v}px`) : c === "left" && (y = `${r.floating.width + u}px`, m = a ? f : `${v}px`), { data: {
        x: y,
        y: m
      } };
    }
  };
}
function Qo(e) {
  const [n, t = "center"] = e.split("-");
  return [n, t];
}
const td = ["top", "right", "bottom", "left"], Mt = Math.min, Ue = Math.max, oo = Math.round, Wn = Math.floor, vt = (e) => ({
  x: e,
  y: e
}), nd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, od = {
  start: "end",
  end: "start"
};
function er(e, n, t) {
  return Ue(e, Mt(n, t));
}
function Ot(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Et(e) {
  return e.split("-")[0];
}
function pn(e) {
  return e.split("-")[1];
}
function Or(e) {
  return e === "x" ? "y" : "x";
}
function Er(e) {
  return e === "y" ? "height" : "width";
}
const rd = /* @__PURE__ */ new Set(["top", "bottom"]);
function pt(e) {
  return rd.has(Et(e)) ? "y" : "x";
}
function Tr(e) {
  return Or(pt(e));
}
function ld(e, n, t) {
  t === void 0 && (t = !1);
  const r = pn(e), o = Tr(e), l = Er(o);
  let a = o === "x" ? r === (t ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return n.reference[l] > n.floating[l] && (a = ro(a)), [a, ro(a)];
}
function ad(e) {
  const n = ro(e);
  return [tr(e), n, tr(n)];
}
function tr(e) {
  return e.replace(/start|end/g, (n) => od[n]);
}
const _l = ["left", "right"], Sl = ["right", "left"], id = ["top", "bottom"], sd = ["bottom", "top"];
function ud(e, n, t) {
  switch (e) {
    case "top":
    case "bottom":
      return t ? n ? Sl : _l : n ? _l : Sl;
    case "left":
    case "right":
      return n ? id : sd;
    default:
      return [];
  }
}
function dd(e, n, t, r) {
  const o = pn(e);
  let l = ud(Et(e), t === "start", r);
  return o && (l = l.map((a) => a + "-" + o), n && (l = l.concat(l.map(tr)))), l;
}
function ro(e) {
  return e.replace(/left|right|bottom|top/g, (n) => nd[n]);
}
function cd(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ta(e) {
  return typeof e != "number" ? cd(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function lo(e) {
  const {
    x: n,
    y: t,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: t,
    left: n,
    right: n + r,
    bottom: t + o,
    x: n,
    y: t
  };
}
function Cl(e, n, t) {
  let {
    reference: r,
    floating: o
  } = e;
  const l = pt(n), a = Tr(n), i = Er(a), u = Et(n), c = l === "y", d = r.x + r.width / 2 - o.width / 2, f = r.y + r.height / 2 - o.height / 2, p = r[i] / 2 - o[i] / 2;
  let v;
  switch (u) {
    case "top":
      v = {
        x: d,
        y: r.y - o.height
      };
      break;
    case "bottom":
      v = {
        x: d,
        y: r.y + r.height
      };
      break;
    case "right":
      v = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      v = {
        x: r.x - o.width,
        y: f
      };
      break;
    default:
      v = {
        x: r.x,
        y: r.y
      };
  }
  switch (pn(n)) {
    case "start":
      v[a] -= p * (t && c ? -1 : 1);
      break;
    case "end":
      v[a] += p * (t && c ? -1 : 1);
      break;
  }
  return v;
}
async function fd(e, n) {
  var t;
  n === void 0 && (n = {});
  const {
    x: r,
    y: o,
    platform: l,
    rects: a,
    elements: i,
    strategy: u
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: p = !1,
    padding: v = 0
  } = Ot(n, e), y = Ta(v), S = i[p ? f === "floating" ? "reference" : "floating" : f], x = lo(await l.getClippingRect({
    element: (t = await (l.isElement == null ? void 0 : l.isElement(S))) == null || t ? S : S.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: u
  })), h = f === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, w = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(i.floating)), C = await (l.isElement == null ? void 0 : l.isElement(w)) ? await (l.getScale == null ? void 0 : l.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, g = lo(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: h,
    offsetParent: w,
    strategy: u
  }) : h);
  return {
    top: (x.top - g.top + y.top) / C.y,
    bottom: (g.bottom - x.bottom + y.bottom) / C.y,
    left: (x.left - g.left + y.left) / C.x,
    right: (g.right - x.right + y.right) / C.x
  };
}
const pd = async (e, n, t) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: l = [],
    platform: a
  } = t, i = l.filter(Boolean), u = await (a.isRTL == null ? void 0 : a.isRTL(n));
  let c = await a.getElementRects({
    reference: e,
    floating: n,
    strategy: o
  }), {
    x: d,
    y: f
  } = Cl(c, r, u), p = r, v = {}, y = 0;
  for (let S = 0; S < i.length; S++) {
    var m;
    const {
      name: x,
      fn: h
    } = i[S], {
      x: w,
      y: C,
      data: g,
      reset: b
    } = await h({
      x: d,
      y: f,
      initialPlacement: r,
      placement: p,
      strategy: o,
      middlewareData: v,
      rects: c,
      platform: {
        ...a,
        detectOverflow: (m = a.detectOverflow) != null ? m : fd
      },
      elements: {
        reference: e,
        floating: n
      }
    });
    d = w ?? d, f = C ?? f, v = {
      ...v,
      [x]: {
        ...v[x],
        ...g
      }
    }, b && y <= 50 && (y++, typeof b == "object" && (b.placement && (p = b.placement), b.rects && (c = b.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: n,
      strategy: o
    }) : b.rects), {
      x: d,
      y: f
    } = Cl(c, p, u)), S = -1);
  }
  return {
    x: d,
    y: f,
    placement: p,
    strategy: o,
    middlewareData: v
  };
}, vd = (e) => ({
  name: "arrow",
  options: e,
  async fn(n) {
    const {
      x: t,
      y: r,
      placement: o,
      rects: l,
      platform: a,
      elements: i,
      middlewareData: u
    } = n, {
      element: c,
      padding: d = 0
    } = Ot(e, n) || {};
    if (c == null)
      return {};
    const f = Ta(d), p = {
      x: t,
      y: r
    }, v = Tr(o), y = Er(v), m = await a.getDimensions(c), S = v === "y", x = S ? "top" : "left", h = S ? "bottom" : "right", w = S ? "clientHeight" : "clientWidth", C = l.reference[y] + l.reference[v] - p[v] - l.floating[y], g = p[v] - l.reference[v], b = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let O = b ? b[w] : 0;
    (!O || !await (a.isElement == null ? void 0 : a.isElement(b))) && (O = i.floating[w] || l.floating[y]);
    const T = C / 2 - g / 2, _ = O / 2 - m[y] / 2 - 1, j = Mt(f[x], _), $ = Mt(f[h], _), R = j, B = O - m[y] - $, z = O / 2 - m[y] / 2 + T, U = er(R, z, B), oe = !u.arrow && pn(o) != null && z !== U && l.reference[y] / 2 - (z < R ? j : $) - m[y] / 2 < 0, ne = oe ? z < R ? z - R : z - B : 0;
    return {
      [v]: p[v] + ne,
      data: {
        [v]: U,
        centerOffset: z - U - ne,
        ...oe && {
          alignmentOffset: ne
        }
      },
      reset: oe
    };
  }
}), yd = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(n) {
      var t, r;
      const {
        placement: o,
        middlewareData: l,
        rects: a,
        initialPlacement: i,
        platform: u,
        elements: c
      } = n, {
        mainAxis: d = !0,
        crossAxis: f = !0,
        fallbackPlacements: p,
        fallbackStrategy: v = "bestFit",
        fallbackAxisSideDirection: y = "none",
        flipAlignment: m = !0,
        ...S
      } = Ot(e, n);
      if ((t = l.arrow) != null && t.alignmentOffset)
        return {};
      const x = Et(o), h = pt(i), w = Et(i) === i, C = await (u.isRTL == null ? void 0 : u.isRTL(c.floating)), g = p || (w || !m ? [ro(i)] : ad(i)), b = y !== "none";
      !p && b && g.push(...dd(i, m, y, C));
      const O = [i, ...g], T = await u.detectOverflow(n, S), _ = [];
      let j = ((r = l.flip) == null ? void 0 : r.overflows) || [];
      if (d && _.push(T[x]), f) {
        const z = ld(o, a, C);
        _.push(T[z[0]], T[z[1]]);
      }
      if (j = [...j, {
        placement: o,
        overflows: _
      }], !_.every((z) => z <= 0)) {
        var $, R;
        const z = ((($ = l.flip) == null ? void 0 : $.index) || 0) + 1, U = O[z];
        if (U && (!(f === "alignment" ? h !== pt(U) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        j.every((ue) => pt(ue.placement) === h ? ue.overflows[0] > 0 : !0)))
          return {
            data: {
              index: z,
              overflows: j
            },
            reset: {
              placement: U
            }
          };
        let oe = (R = j.filter((ne) => ne.overflows[0] <= 0).sort((ne, ue) => ne.overflows[1] - ue.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!oe)
          switch (v) {
            case "bestFit": {
              var B;
              const ne = (B = j.filter((ue) => {
                if (b) {
                  const D = pt(ue.placement);
                  return D === h || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  D === "y";
                }
                return !0;
              }).map((ue) => [ue.placement, ue.overflows.filter((D) => D > 0).reduce((D, Z) => D + Z, 0)]).sort((ue, D) => ue[1] - D[1])[0]) == null ? void 0 : B[0];
              ne && (oe = ne);
              break;
            }
            case "initialPlacement":
              oe = i;
              break;
          }
        if (o !== oe)
          return {
            reset: {
              placement: oe
            }
          };
      }
      return {};
    }
  };
};
function Al(e, n) {
  return {
    top: e.top - n.height,
    right: e.right - n.width,
    bottom: e.bottom - n.height,
    left: e.left - n.width
  };
}
function Ol(e) {
  return td.some((n) => e[n] >= 0);
}
const md = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(n) {
      const {
        rects: t,
        platform: r
      } = n, {
        strategy: o = "referenceHidden",
        ...l
      } = Ot(e, n);
      switch (o) {
        case "referenceHidden": {
          const a = await r.detectOverflow(n, {
            ...l,
            elementContext: "reference"
          }), i = Al(a, t.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Ol(i)
            }
          };
        }
        case "escaped": {
          const a = await r.detectOverflow(n, {
            ...l,
            altBoundary: !0
          }), i = Al(a, t.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Ol(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, ka = /* @__PURE__ */ new Set(["left", "top"]);
async function hd(e, n) {
  const {
    placement: t,
    platform: r,
    elements: o
  } = e, l = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = Et(t), i = pn(t), u = pt(t) === "y", c = ka.has(a) ? -1 : 1, d = l && u ? -1 : 1, f = Ot(n, e);
  let {
    mainAxis: p,
    crossAxis: v,
    alignmentAxis: y
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return i && typeof y == "number" && (v = i === "end" ? y * -1 : y), u ? {
    x: v * d,
    y: p * c
  } : {
    x: p * c,
    y: v * d
  };
}
const gd = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(n) {
      var t, r;
      const {
        x: o,
        y: l,
        placement: a,
        middlewareData: i
      } = n, u = await hd(n, e);
      return a === ((t = i.offset) == null ? void 0 : t.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + u.x,
        y: l + u.y,
        data: {
          ...u,
          placement: a
        }
      };
    }
  };
}, bd = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(n) {
      const {
        x: t,
        y: r,
        placement: o,
        platform: l
      } = n, {
        mainAxis: a = !0,
        crossAxis: i = !1,
        limiter: u = {
          fn: (x) => {
            let {
              x: h,
              y: w
            } = x;
            return {
              x: h,
              y: w
            };
          }
        },
        ...c
      } = Ot(e, n), d = {
        x: t,
        y: r
      }, f = await l.detectOverflow(n, c), p = pt(Et(o)), v = Or(p);
      let y = d[v], m = d[p];
      if (a) {
        const x = v === "y" ? "top" : "left", h = v === "y" ? "bottom" : "right", w = y + f[x], C = y - f[h];
        y = er(w, y, C);
      }
      if (i) {
        const x = p === "y" ? "top" : "left", h = p === "y" ? "bottom" : "right", w = m + f[x], C = m - f[h];
        m = er(w, m, C);
      }
      const S = u.fn({
        ...n,
        [v]: y,
        [p]: m
      });
      return {
        ...S,
        data: {
          x: S.x - t,
          y: S.y - r,
          enabled: {
            [v]: a,
            [p]: i
          }
        }
      };
    }
  };
}, xd = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(n) {
      const {
        x: t,
        y: r,
        placement: o,
        rects: l,
        middlewareData: a
      } = n, {
        offset: i = 0,
        mainAxis: u = !0,
        crossAxis: c = !0
      } = Ot(e, n), d = {
        x: t,
        y: r
      }, f = pt(o), p = Or(f);
      let v = d[p], y = d[f];
      const m = Ot(i, n), S = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (u) {
        const w = p === "y" ? "height" : "width", C = l.reference[p] - l.floating[w] + S.mainAxis, g = l.reference[p] + l.reference[w] - S.mainAxis;
        v < C ? v = C : v > g && (v = g);
      }
      if (c) {
        var x, h;
        const w = p === "y" ? "width" : "height", C = ka.has(Et(o)), g = l.reference[f] - l.floating[w] + (C && ((x = a.offset) == null ? void 0 : x[f]) || 0) + (C ? 0 : S.crossAxis), b = l.reference[f] + l.reference[w] + (C ? 0 : ((h = a.offset) == null ? void 0 : h[f]) || 0) - (C ? S.crossAxis : 0);
        y < g ? y = g : y > b && (y = b);
      }
      return {
        [p]: v,
        [f]: y
      };
    }
  };
}, wd = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(n) {
      var t, r;
      const {
        placement: o,
        rects: l,
        platform: a,
        elements: i
      } = n, {
        apply: u = () => {
        },
        ...c
      } = Ot(e, n), d = await a.detectOverflow(n, c), f = Et(o), p = pn(o), v = pt(o) === "y", {
        width: y,
        height: m
      } = l.floating;
      let S, x;
      f === "top" || f === "bottom" ? (S = f, x = p === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (x = f, S = p === "end" ? "top" : "bottom");
      const h = m - d.top - d.bottom, w = y - d.left - d.right, C = Mt(m - d[S], h), g = Mt(y - d[x], w), b = !n.middlewareData.shift;
      let O = C, T = g;
      if ((t = n.middlewareData.shift) != null && t.enabled.x && (T = w), (r = n.middlewareData.shift) != null && r.enabled.y && (O = h), b && !p) {
        const j = Ue(d.left, 0), $ = Ue(d.right, 0), R = Ue(d.top, 0), B = Ue(d.bottom, 0);
        v ? T = y - 2 * (j !== 0 || $ !== 0 ? j + $ : Ue(d.left, d.right)) : O = m - 2 * (R !== 0 || B !== 0 ? R + B : Ue(d.top, d.bottom));
      }
      await u({
        ...n,
        availableWidth: T,
        availableHeight: O
      });
      const _ = await a.getDimensions(i.floating);
      return y !== _.width || m !== _.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function mo() {
  return typeof window < "u";
}
function Xt(e) {
  return kr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ke(e) {
  var n;
  return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function gt(e) {
  var n;
  return (n = (kr(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function kr(e) {
  return mo() ? e instanceof Node || e instanceof Ke(e).Node : !1;
}
function rt(e) {
  return mo() ? e instanceof Element || e instanceof Ke(e).Element : !1;
}
function ht(e) {
  return mo() ? e instanceof HTMLElement || e instanceof Ke(e).HTMLElement : !1;
}
function El(e) {
  return !mo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ke(e).ShadowRoot;
}
const _d = /* @__PURE__ */ new Set(["inline", "contents"]);
function Rn(e) {
  const {
    overflow: n,
    overflowX: t,
    overflowY: r,
    display: o
  } = lt(e);
  return /auto|scroll|overlay|hidden|clip/.test(n + r + t) && !_d.has(o);
}
const Sd = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Cd(e) {
  return Sd.has(Xt(e));
}
const Ad = [":popover-open", ":modal"];
function ho(e) {
  return Ad.some((n) => {
    try {
      return e.matches(n);
    } catch {
      return !1;
    }
  });
}
const Od = ["transform", "translate", "scale", "rotate", "perspective"], Ed = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Td = ["paint", "layout", "strict", "content"];
function jr(e) {
  const n = Pr(), t = rt(e) ? lt(e) : e;
  return Od.some((r) => t[r] ? t[r] !== "none" : !1) || (t.containerType ? t.containerType !== "normal" : !1) || !n && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !n && (t.filter ? t.filter !== "none" : !1) || Ed.some((r) => (t.willChange || "").includes(r)) || Td.some((r) => (t.contain || "").includes(r));
}
function kd(e) {
  let n = Rt(e);
  for (; ht(n) && !sn(n); ) {
    if (jr(n))
      return n;
    if (ho(n))
      return null;
    n = Rt(n);
  }
  return null;
}
function Pr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const jd = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function sn(e) {
  return jd.has(Xt(e));
}
function lt(e) {
  return Ke(e).getComputedStyle(e);
}
function go(e) {
  return rt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Rt(e) {
  if (Xt(e) === "html")
    return e;
  const n = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    El(e) && e.host || // Fallback.
    gt(e)
  );
  return El(n) ? n.host : n;
}
function ja(e) {
  const n = Rt(e);
  return sn(n) ? e.ownerDocument ? e.ownerDocument.body : e.body : ht(n) && Rn(n) ? n : ja(n);
}
function En(e, n, t) {
  var r;
  n === void 0 && (n = []), t === void 0 && (t = !0);
  const o = ja(e), l = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = Ke(o);
  if (l) {
    const i = nr(a);
    return n.concat(a, a.visualViewport || [], Rn(o) ? o : [], i && t ? En(i) : []);
  }
  return n.concat(o, En(o, [], t));
}
function nr(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Pa(e) {
  const n = lt(e);
  let t = parseFloat(n.width) || 0, r = parseFloat(n.height) || 0;
  const o = ht(e), l = o ? e.offsetWidth : t, a = o ? e.offsetHeight : r, i = oo(t) !== l || oo(r) !== a;
  return i && (t = l, r = a), {
    width: t,
    height: r,
    $: i
  };
}
function Ir(e) {
  return rt(e) ? e : e.contextElement;
}
function an(e) {
  const n = Ir(e);
  if (!ht(n))
    return vt(1);
  const t = n.getBoundingClientRect(), {
    width: r,
    height: o,
    $: l
  } = Pa(n);
  let a = (l ? oo(t.width) : t.width) / r, i = (l ? oo(t.height) : t.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const Pd = /* @__PURE__ */ vt(0);
function Ia(e) {
  const n = Ke(e);
  return !Pr() || !n.visualViewport ? Pd : {
    x: n.visualViewport.offsetLeft,
    y: n.visualViewport.offsetTop
  };
}
function Id(e, n, t) {
  return n === void 0 && (n = !1), !t || n && t !== Ke(e) ? !1 : n;
}
function Ut(e, n, t, r) {
  n === void 0 && (n = !1), t === void 0 && (t = !1);
  const o = e.getBoundingClientRect(), l = Ir(e);
  let a = vt(1);
  n && (r ? rt(r) && (a = an(r)) : a = an(e));
  const i = Id(l, t, r) ? Ia(l) : vt(0);
  let u = (o.left + i.x) / a.x, c = (o.top + i.y) / a.y, d = o.width / a.x, f = o.height / a.y;
  if (l) {
    const p = Ke(l), v = r && rt(r) ? Ke(r) : r;
    let y = p, m = nr(y);
    for (; m && r && v !== y; ) {
      const S = an(m), x = m.getBoundingClientRect(), h = lt(m), w = x.left + (m.clientLeft + parseFloat(h.paddingLeft)) * S.x, C = x.top + (m.clientTop + parseFloat(h.paddingTop)) * S.y;
      u *= S.x, c *= S.y, d *= S.x, f *= S.y, u += w, c += C, y = Ke(m), m = nr(y);
    }
  }
  return lo({
    width: d,
    height: f,
    x: u,
    y: c
  });
}
function bo(e, n) {
  const t = go(e).scrollLeft;
  return n ? n.left + t : Ut(gt(e)).left + t;
}
function Ma(e, n) {
  const t = e.getBoundingClientRect(), r = t.left + n.scrollLeft - bo(e, t), o = t.top + n.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Md(e) {
  let {
    elements: n,
    rect: t,
    offsetParent: r,
    strategy: o
  } = e;
  const l = o === "fixed", a = gt(r), i = n ? ho(n.floating) : !1;
  if (r === a || i && l)
    return t;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = vt(1);
  const d = vt(0), f = ht(r);
  if ((f || !f && !l) && ((Xt(r) !== "body" || Rn(a)) && (u = go(r)), ht(r))) {
    const v = Ut(r);
    c = an(r), d.x = v.x + r.clientLeft, d.y = v.y + r.clientTop;
  }
  const p = a && !f && !l ? Ma(a, u) : vt(0);
  return {
    width: t.width * c.x,
    height: t.height * c.y,
    x: t.x * c.x - u.scrollLeft * c.x + d.x + p.x,
    y: t.y * c.y - u.scrollTop * c.y + d.y + p.y
  };
}
function Rd(e) {
  return Array.from(e.getClientRects());
}
function Dd(e) {
  const n = gt(e), t = go(e), r = e.ownerDocument.body, o = Ue(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth), l = Ue(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -t.scrollLeft + bo(e);
  const i = -t.scrollTop;
  return lt(r).direction === "rtl" && (a += Ue(n.clientWidth, r.clientWidth) - o), {
    width: o,
    height: l,
    x: a,
    y: i
  };
}
const Tl = 25;
function Ld(e, n) {
  const t = Ke(e), r = gt(e), o = t.visualViewport;
  let l = r.clientWidth, a = r.clientHeight, i = 0, u = 0;
  if (o) {
    l = o.width, a = o.height;
    const d = Pr();
    (!d || d && n === "fixed") && (i = o.offsetLeft, u = o.offsetTop);
  }
  const c = bo(r);
  if (c <= 0) {
    const d = r.ownerDocument, f = d.body, p = getComputedStyle(f), v = d.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, y = Math.abs(r.clientWidth - f.clientWidth - v);
    y <= Tl && (l -= y);
  } else
    c <= Tl && (l += c);
  return {
    width: l,
    height: a,
    x: i,
    y: u
  };
}
const $d = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function qd(e, n) {
  const t = Ut(e, !0, n === "fixed"), r = t.top + e.clientTop, o = t.left + e.clientLeft, l = ht(e) ? an(e) : vt(1), a = e.clientWidth * l.x, i = e.clientHeight * l.y, u = o * l.x, c = r * l.y;
  return {
    width: a,
    height: i,
    x: u,
    y: c
  };
}
function kl(e, n, t) {
  let r;
  if (n === "viewport")
    r = Ld(e, t);
  else if (n === "document")
    r = Dd(gt(e));
  else if (rt(n))
    r = qd(n, t);
  else {
    const o = Ia(e);
    r = {
      x: n.x - o.x,
      y: n.y - o.y,
      width: n.width,
      height: n.height
    };
  }
  return lo(r);
}
function Ra(e, n) {
  const t = Rt(e);
  return t === n || !rt(t) || sn(t) ? !1 : lt(t).position === "fixed" || Ra(t, n);
}
function Bd(e, n) {
  const t = n.get(e);
  if (t)
    return t;
  let r = En(e, [], !1).filter((i) => rt(i) && Xt(i) !== "body"), o = null;
  const l = lt(e).position === "fixed";
  let a = l ? Rt(e) : e;
  for (; rt(a) && !sn(a); ) {
    const i = lt(a), u = jr(a);
    !u && i.position === "fixed" && (o = null), (l ? !u && !o : !u && i.position === "static" && !!o && $d.has(o.position) || Rn(a) && !u && Ra(e, a)) ? r = r.filter((d) => d !== a) : o = i, a = Rt(a);
  }
  return n.set(e, r), r;
}
function Fd(e) {
  let {
    element: n,
    boundary: t,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...t === "clippingAncestors" ? ho(n) ? [] : Bd(n, this._c) : [].concat(t), r], i = a[0], u = a.reduce((c, d) => {
    const f = kl(n, d, o);
    return c.top = Ue(f.top, c.top), c.right = Mt(f.right, c.right), c.bottom = Mt(f.bottom, c.bottom), c.left = Ue(f.left, c.left), c;
  }, kl(n, i, o));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function Nd(e) {
  const {
    width: n,
    height: t
  } = Pa(e);
  return {
    width: n,
    height: t
  };
}
function Vd(e, n, t) {
  const r = ht(n), o = gt(n), l = t === "fixed", a = Ut(e, !0, l, n);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = vt(0);
  function c() {
    u.x = bo(o);
  }
  if (r || !r && !l)
    if ((Xt(n) !== "body" || Rn(o)) && (i = go(n)), r) {
      const v = Ut(n, !0, l, n);
      u.x = v.x + n.clientLeft, u.y = v.y + n.clientTop;
    } else
      o && c();
  l && !r && o && c();
  const d = o && !r && !l ? Ma(o, i) : vt(0), f = a.left + i.scrollLeft - u.x - d.x, p = a.top + i.scrollTop - u.y - d.y;
  return {
    x: f,
    y: p,
    width: a.width,
    height: a.height
  };
}
function zo(e) {
  return lt(e).position === "static";
}
function jl(e, n) {
  if (!ht(e) || lt(e).position === "fixed")
    return null;
  if (n)
    return n(e);
  let t = e.offsetParent;
  return gt(e) === t && (t = t.ownerDocument.body), t;
}
function Da(e, n) {
  const t = Ke(e);
  if (ho(e))
    return t;
  if (!ht(e)) {
    let o = Rt(e);
    for (; o && !sn(o); ) {
      if (rt(o) && !zo(o))
        return o;
      o = Rt(o);
    }
    return t;
  }
  let r = jl(e, n);
  for (; r && Cd(r) && zo(r); )
    r = jl(r, n);
  return r && sn(r) && zo(r) && !jr(r) ? t : r || kd(e) || t;
}
const zd = async function(e) {
  const n = this.getOffsetParent || Da, t = this.getDimensions, r = await t(e.floating);
  return {
    reference: Vd(e.reference, await n(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Hd(e) {
  return lt(e).direction === "rtl";
}
const Ud = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Md,
  getDocumentElement: gt,
  getClippingRect: Fd,
  getOffsetParent: Da,
  getElementRects: zd,
  getClientRects: Rd,
  getDimensions: Nd,
  getScale: an,
  isElement: rt,
  isRTL: Hd
};
function La(e, n) {
  return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function Kd(e, n) {
  let t = null, r;
  const o = gt(e);
  function l() {
    var i;
    clearTimeout(r), (i = t) == null || i.disconnect(), t = null;
  }
  function a(i, u) {
    i === void 0 && (i = !1), u === void 0 && (u = 1), l();
    const c = e.getBoundingClientRect(), {
      left: d,
      top: f,
      width: p,
      height: v
    } = c;
    if (i || n(), !p || !v)
      return;
    const y = Wn(f), m = Wn(o.clientWidth - (d + p)), S = Wn(o.clientHeight - (f + v)), x = Wn(d), w = {
      rootMargin: -y + "px " + -m + "px " + -S + "px " + -x + "px",
      threshold: Ue(0, Mt(1, u)) || 1
    };
    let C = !0;
    function g(b) {
      const O = b[0].intersectionRatio;
      if (O !== u) {
        if (!C)
          return a();
        O ? a(!1, O) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      O === 1 && !La(c, e.getBoundingClientRect()) && a(), C = !1;
    }
    try {
      t = new IntersectionObserver(g, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      t = new IntersectionObserver(g, w);
    }
    t.observe(e);
  }
  return a(!0), l;
}
function Wd(e, n, t, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: l = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = r, c = Ir(e), d = o || l ? [...c ? En(c) : [], ...En(n)] : [];
  d.forEach((x) => {
    o && x.addEventListener("scroll", t, {
      passive: !0
    }), l && x.addEventListener("resize", t);
  });
  const f = c && i ? Kd(c, t) : null;
  let p = -1, v = null;
  a && (v = new ResizeObserver((x) => {
    let [h] = x;
    h && h.target === c && v && (v.unobserve(n), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var w;
      (w = v) == null || w.observe(n);
    })), t();
  }), c && !u && v.observe(c), v.observe(n));
  let y, m = u ? Ut(e) : null;
  u && S();
  function S() {
    const x = Ut(e);
    m && !La(m, x) && t(), m = x, y = requestAnimationFrame(S);
  }
  return t(), () => {
    var x;
    d.forEach((h) => {
      o && h.removeEventListener("scroll", t), l && h.removeEventListener("resize", t);
    }), f == null || f(), (x = v) == null || x.disconnect(), v = null, u && cancelAnimationFrame(y);
  };
}
const Gd = gd, Yd = bd, Pl = yd, Xd = wd, Jd = md, Zd = vd, Qd = xd, ec = (e, n, t) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Ud,
    ...t
  }, l = {
    ...o.platform,
    _c: r
  };
  return pd(e, n, {
    ...o,
    platform: l
  });
};
function tc(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function or(e) {
  if (tc(e)) {
    const n = e.$el;
    return kr(n) && Xt(n) === "#comment" ? null : n;
  }
  return e;
}
function rn(e) {
  return typeof e == "function" ? e() : s(e);
}
function nc(e) {
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const t = or(rn(e.element));
      return t == null ? {} : Zd({
        element: t,
        padding: e.padding
      }).fn(n);
    }
  };
}
function $a(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Il(e, n) {
  const t = $a(e);
  return Math.round(n * t) / t;
}
function oc(e, n, t) {
  t === void 0 && (t = {});
  const r = t.whileElementsMounted, o = k(() => {
    var O;
    return (O = rn(t.open)) != null ? O : !0;
  }), l = k(() => rn(t.middleware)), a = k(() => {
    var O;
    return (O = rn(t.placement)) != null ? O : "bottom";
  }), i = k(() => {
    var O;
    return (O = rn(t.strategy)) != null ? O : "absolute";
  }), u = k(() => {
    var O;
    return (O = rn(t.transform)) != null ? O : !0;
  }), c = k(() => or(e.value)), d = k(() => or(n.value)), f = M(0), p = M(0), v = M(i.value), y = M(a.value), m = Kt({}), S = M(!1), x = k(() => {
    const O = {
      position: v.value,
      left: "0",
      top: "0"
    };
    if (!d.value)
      return O;
    const T = Il(d.value, f.value), _ = Il(d.value, p.value);
    return u.value ? {
      ...O,
      transform: "translate(" + T + "px, " + _ + "px)",
      ...$a(d.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: v.value,
      left: T + "px",
      top: _ + "px"
    };
  });
  let h;
  function w() {
    if (c.value == null || d.value == null)
      return;
    const O = o.value;
    ec(c.value, d.value, {
      middleware: l.value,
      placement: a.value,
      strategy: i.value
    }).then((T) => {
      f.value = T.x, p.value = T.y, v.value = T.strategy, y.value = T.placement, m.value = T.middlewareData, S.value = O !== !1;
    });
  }
  function C() {
    typeof h == "function" && (h(), h = void 0);
  }
  function g() {
    if (C(), r === void 0) {
      w();
      return;
    }
    if (c.value != null && d.value != null) {
      h = r(c.value, d.value, w);
      return;
    }
  }
  function b() {
    o.value || (S.value = !1);
  }
  return pe([l, a, i, o], w, {
    flush: "sync"
  }), pe([c, d], g, {
    flush: "sync"
  }), pe(o, b, {
    flush: "sync"
  }), Xl() && dr(C), {
    x: Ft(f),
    y: Ft(p),
    strategy: Ft(v),
    placement: Ft(y),
    middlewareData: Ft(m),
    isPositioned: Ft(S),
    floatingStyles: x,
    update: w
  };
}
const rc = {
  side: "bottom",
  sideOffset: 0,
  sideFlip: !0,
  align: "center",
  alignOffset: 0,
  alignFlip: !0,
  arrowPadding: 0,
  hideShiftedArrow: !0,
  avoidCollisions: !0,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: !1,
  positionStrategy: "fixed",
  updatePositionStrategy: "optimized",
  prioritizePosition: !1
}, [lc, ac] = Oe("PopperContent");
var ic = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: /* @__PURE__ */ gi({
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  }, { ...rc }),
  emits: ["placed"],
  setup(e, { emit: n }) {
    const t = e, r = n, o = Ea(), { forwardRef: l, currentElement: a } = se(), i = M(), u = M(), { width: c, height: d } = pu(u), f = k(() => t.side + (t.align !== "center" ? `-${t.align}` : "")), p = k(() => typeof t.collisionPadding == "number" ? t.collisionPadding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...t.collisionPadding
    }), v = k(() => Array.isArray(t.collisionBoundary) ? t.collisionBoundary : [t.collisionBoundary]), y = k(() => ({
      padding: p.value,
      boundary: v.value.filter(Qu),
      altBoundary: v.value.length > 0
    })), m = k(() => ({
      mainAxis: t.sideFlip,
      crossAxis: t.alignFlip
    })), S = js(() => [
      Gd({
        mainAxis: t.sideOffset + d.value,
        alignmentAxis: t.alignOffset
      }),
      t.prioritizePosition && t.avoidCollisions && Pl({
        ...y.value,
        ...m.value
      }),
      t.avoidCollisions && Yd({
        mainAxis: !0,
        crossAxis: !!t.prioritizePosition,
        limiter: t.sticky === "partial" ? Qd() : void 0,
        ...y.value
      }),
      !t.prioritizePosition && t.avoidCollisions && Pl({
        ...y.value,
        ...m.value
      }),
      Xd({
        ...y.value,
        apply: ({ elements: B, rects: z, availableWidth: U, availableHeight: oe }) => {
          const { width: ne, height: ue } = z.reference, D = B.floating.style;
          D.setProperty("--reka-popper-available-width", `${U}px`), D.setProperty("--reka-popper-available-height", `${oe}px`), D.setProperty("--reka-popper-anchor-width", `${ne}px`), D.setProperty("--reka-popper-anchor-height", `${ue}px`);
        }
      }),
      u.value && nc({
        element: u.value,
        padding: t.arrowPadding
      }),
      ed({
        arrowWidth: c.value,
        arrowHeight: d.value
      }),
      t.hideWhenDetached && Jd({
        strategy: "referenceHidden",
        ...y.value
      })
    ]), x = k(() => t.reference ?? o.anchor.value), { floatingStyles: h, placement: w, isPositioned: C, middlewareData: g, update: b } = oc(x, i, {
      strategy: t.positionStrategy,
      placement: f,
      whileElementsMounted: (...B) => Wd(...B, {
        layoutShift: !t.disableUpdateOnLayoutShift,
        animationFrame: t.updatePositionStrategy === "always"
      }),
      middleware: S
    }), O = k(() => Qo(w.value)[0]), T = k(() => Qo(w.value)[1]);
    pr(() => {
      C.value && r("placed");
    });
    const _ = k(() => {
      var z;
      const B = ((z = g.value.arrow) == null ? void 0 : z.centerOffset) !== 0;
      return t.hideShiftedArrow && B;
    }), j = M("");
    Ae(() => {
      a.value && (j.value = window.getComputedStyle(a.value).zIndex);
    });
    const $ = k(() => {
      var B;
      return ((B = g.value.arrow) == null ? void 0 : B.x) ?? 0;
    }), R = k(() => {
      var B;
      return ((B = g.value.arrow) == null ? void 0 : B.y) ?? 0;
    });
    return ac({
      placedSide: O,
      onArrowChange: (B) => u.value = B,
      arrowX: $,
      arrowY: R,
      shouldHideArrow: _
    }), (B, z) => {
      var U, oe, ne;
      return A(), H("div", {
        ref_key: "floatingRef",
        ref: i,
        "data-reka-popper-content-wrapper": "",
        style: yt({
          ...s(h),
          transform: s(C) ? s(h).transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: j.value,
          "--reka-popper-transform-origin": [(U = s(g).transformOrigin) == null ? void 0 : U.x, (oe = s(g).transformOrigin) == null ? void 0 : oe.y].join(" "),
          ...((ne = s(g).hide) == null ? void 0 : ne.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [V(s(de), Q({ ref: s(l) }, B.$attrs, {
        "as-child": t.asChild,
        as: B.as,
        "data-side": O.value,
        "data-align": T.value,
        style: { animation: s(C) ? void 0 : "none" }
      }), {
        default: P(() => [F(B.$slots, "default")]),
        _: 3
      }, 16, [
        "as-child",
        "as",
        "data-side",
        "data-align",
        "style"
      ])], 4);
    };
  }
}), xo = ic;
const sc = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var uc = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "PopperArrow",
  props: {
    width: {
      type: Number,
      required: !1
    },
    height: {
      type: Number,
      required: !1
    },
    rounded: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "svg"
    }
  },
  setup(e) {
    const { forwardRef: n } = se(), t = lc(), r = k(() => sc[t.placedSide.value]);
    return (o, l) => {
      var a, i, u, c;
      return A(), H("span", {
        ref: (d) => {
          s(t).onArrowChange(d);
        },
        style: yt({
          position: "absolute",
          left: (a = s(t).arrowX) != null && a.value ? `${(i = s(t).arrowX) == null ? void 0 : i.value}px` : void 0,
          top: (u = s(t).arrowY) != null && u.value ? `${(c = s(t).arrowY) == null ? void 0 : c.value}px` : void 0,
          [r.value]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[s(t).placedSide.value],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[s(t).placedSide.value],
          visibility: s(t).shouldHideArrow.value ? "hidden" : void 0
        })
      }, [V(Zu, Q(o.$attrs, {
        ref: s(n),
        style: { display: "block" },
        as: o.as,
        "as-child": o.asChild,
        rounded: o.rounded,
        width: o.width,
        height: o.height
      }), {
        default: P(() => [F(o.$slots, "default")]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "rounded",
        "width",
        "height"
      ])], 4);
    };
  }
}), dc = uc, cc = /* @__PURE__ */ N({
  __name: "ComboboxAnchor",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const { forwardRef: n } = se();
    return (t, r) => (A(), q(s(yo), {
      "as-child": "",
      reference: t.reference
    }, {
      default: P(() => [V(s(de), Q({
        ref: s(n),
        "as-child": t.asChild,
        as: t.as
      }, t.$attrs), {
        default: P(() => [F(t.$slots, "default")]),
        _: 3
      }, 16, ["as-child", "as"])]),
      _: 3
    }, 8, ["reference"]));
  }
}), fc = cc;
function pc(e, n, t) {
  return e === void 0 ? !1 : Array.isArray(e) ? e.some((r) => Cn(r, n, t)) : Cn(e, n, t);
}
function Cn(e, n, t) {
  return e === void 0 || n === void 0 ? !1 : typeof e == "string" ? e === n : typeof t == "function" ? t(e, n) : typeof t == "string" ? (e == null ? void 0 : e[t]) === (n == null ? void 0 : n[t]) : to(e, n);
}
const [wo, vc] = Oe("ListboxRoot");
var yc = /* @__PURE__ */ N({
  __name: "ListboxRoot",
  props: {
    modelValue: {
      type: null,
      required: !1
    },
    defaultValue: {
      type: null,
      required: !1
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    orientation: {
      type: String,
      required: !1,
      default: "vertical"
    },
    dir: {
      type: String,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    selectionBehavior: {
      type: String,
      required: !1,
      default: "toggle"
    },
    highlightOnHover: {
      type: Boolean,
      required: !1
    },
    by: {
      type: [String, Function],
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "update:modelValue",
    "highlight",
    "entryFocus",
    "leave"
  ],
  setup(e, { expose: n, emit: t }) {
    const r = e, o = t, { multiple: l, highlightOnHover: a, orientation: i, disabled: u, selectionBehavior: c, dir: d } = $e(r), { getItems: f } = it({ isProvider: !0 }), { handleTypeaheadSearch: p } = Cr(), { primitiveElement: v, currentElement: y } = It(), m = fu(), S = Mn(d), x = _r(y), h = M(), w = M(!1), C = M(!0), g = /* @__PURE__ */ We(r, "modelValue", o, {
      defaultValue: r.defaultValue ?? (l.value ? [] : void 0),
      passive: r.modelValue === void 0,
      deep: !0
    });
    function b(Y) {
      if (w.value = !0, r.multiple) {
        const te = Array.isArray(g.value) ? [...g.value] : [], ie = te.findIndex((me) => Cn(me, Y, r.by));
        r.selectionBehavior === "toggle" ? (ie === -1 ? te.push(Y) : te.splice(ie, 1), g.value = te) : (g.value = [Y], h.value = Y);
      } else
        r.selectionBehavior === "toggle" && Cn(g.value, Y, r.by) ? g.value = void 0 : g.value = Y;
      setTimeout(() => {
        w.value = !1;
      }, 1);
    }
    const O = M(null), T = M(null), _ = M(!1), j = M(!1), $ = /* @__PURE__ */ Sn(), R = /* @__PURE__ */ Sn(), B = /* @__PURE__ */ Sn();
    function z() {
      return f().map((Y) => Y.ref).filter((Y) => Y.dataset.disabled !== "");
    }
    function U(Y, te = !0) {
      if (!Y)
        return;
      O.value = Y, C.value && O.value.focus(), te && O.value.scrollIntoView({ block: "nearest" });
      const ie = f().find((me) => me.ref === Y);
      o("highlight", ie);
    }
    function oe(Y) {
      if (_.value)
        B.trigger(Y);
      else {
        const te = f().find((ie) => Cn(ie.value, Y, r.by));
        te && (O.value = te.ref, U(te.ref));
      }
    }
    function ne(Y) {
      O.value && O.value.isConnected && (Y.preventDefault(), Y.stopPropagation(), j.value || O.value.click());
    }
    function ue(Y) {
      if (C.value) {
        if (w.value = !0, _.value)
          R.trigger(Y);
        else {
          const te = Y.altKey || Y.ctrlKey || Y.metaKey;
          if (te && Y.key === "a" && l.value) {
            const ie = f(), me = ie.map((Me) => Me.value);
            g.value = [...me], Y.preventDefault(), U(ie[ie.length - 1].ref);
          } else if (!te) {
            const ie = p(Y.key, f());
            ie && U(ie);
          }
        }
        setTimeout(() => {
          w.value = !1;
        }, 1);
      }
    }
    function D() {
      j.value = !0;
    }
    function Z() {
      ge(() => {
        j.value = !1;
      });
    }
    function G() {
      ge(() => {
        const Y = new KeyboardEvent("keydown", { key: "PageUp" });
        ye(Y);
      });
    }
    function ve(Y) {
      const te = O.value;
      te != null && te.isConnected && (T.value = te), O.value = null, o("leave", Y);
    }
    function re(Y) {
      var ie, me;
      const te = new CustomEvent("listbox.entryFocus", {
        bubbles: !1,
        cancelable: !0
      });
      if ((ie = Y.currentTarget) == null || ie.dispatchEvent(te), o("entryFocus", te), !te.defaultPrevented)
        if (T.value)
          U(T.value);
        else {
          const Me = (me = z()) == null ? void 0 : me[0];
          U(Me);
        }
    }
    function ye(Y) {
      const te = Ca(Y, i.value, S.value);
      if (!te)
        return;
      let ie = z();
      if (O.value) {
        if (te === "last")
          ie.reverse();
        else if (te === "prev" || te === "next") {
          te === "prev" && ie.reverse();
          const me = ie.indexOf(O.value);
          ie = ie.slice(me + 1);
        }
        ce(Y, ie[0]);
      }
      if (ie.length) {
        const me = !O.value && te === "prev" ? ie.length - 1 : 0;
        U(ie[me]);
      }
      if (_.value)
        return R.trigger(Y);
    }
    function ce(Y, te) {
      var me;
      if (!(_.value || r.selectionBehavior !== "replace" || !l.value || !Array.isArray(g.value) || (Y.altKey || Y.ctrlKey || Y.metaKey) && !Y.shiftKey) && Y.shiftKey) {
        const Me = f().filter((st) => st.ref.dataset.disabled !== "");
        let et = (me = Me.find((st) => st.ref === te)) == null ? void 0 : me.value;
        if (Y.key === m.END ? et = Me[Me.length - 1].value : Y.key === m.HOME && (et = Me[0].value), !et || !h.value)
          return;
        const Ye = ks(Me.map((st) => st.value), h.value, et);
        g.value = Ye;
      }
    }
    async function bt(Y) {
      if (await ge(), _.value)
        $.trigger(Y);
      else {
        const te = z(), ie = te.find((me) => me.dataset.state === "checked");
        ie ? U(ie) : te.length && U(te[0]);
      }
    }
    return pe(g, () => {
      w.value || ge(() => {
        bt();
      });
    }, {
      immediate: !0,
      deep: !0
    }), n({
      highlightedElement: O,
      highlightItem: oe,
      highlightFirstItem: G,
      highlightSelected: bt,
      getItems: f
    }), vc({
      modelValue: g,
      onValueChange: b,
      multiple: l,
      orientation: i,
      dir: S,
      disabled: u,
      highlightOnHover: a,
      highlightedElement: O,
      isVirtual: _,
      virtualFocusHook: $,
      virtualKeydownHook: R,
      virtualHighlightHook: B,
      by: r.by,
      firstValue: h,
      selectionBehavior: c,
      focusable: C,
      onLeave: ve,
      onEnter: re,
      changeHighlight: U,
      onKeydownEnter: ne,
      onKeydownNavigation: ye,
      onKeydownTypeAhead: ue,
      onCompositionStart: D,
      onCompositionEnd: Z,
      highlightFirstItem: G
    }), (Y, te) => (A(), q(s(de), {
      ref_key: "primitiveElement",
      ref: v,
      as: Y.as,
      "as-child": Y.asChild,
      dir: s(S),
      "data-disabled": s(u) ? "" : void 0,
      onPointerleave: ve,
      onFocusout: te[0] || (te[0] = async (ie) => {
        const me = ie.relatedTarget || ie.target;
        await ge(), O.value && s(y) && !s(y).contains(me) && ve(ie);
      })
    }, {
      default: P(() => [F(Y.$slots, "default", { modelValue: s(g) }), s(x) && Y.name ? (A(), q(s(Oa), {
        key: 0,
        name: Y.name,
        value: s(g),
        disabled: s(u),
        required: Y.required
      }, null, 8, [
        "name",
        "value",
        "disabled",
        "required"
      ])) : J("v-if", !0)]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "dir",
      "data-disabled"
    ]));
  }
}), mc = yc, hc = /* @__PURE__ */ N({
  __name: "ListboxContent",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const { CollectionSlot: n } = it(), t = wo(), r = gr(!1, 10);
    return (o, l) => (A(), q(s(n), null, {
      default: P(() => [V(s(de), {
        role: "listbox",
        as: o.as,
        "as-child": o.asChild,
        tabindex: s(t).focusable.value ? s(t).highlightedElement.value ? "-1" : "0" : "-1",
        "aria-orientation": s(t).orientation.value,
        "aria-multiselectable": !!s(t).multiple.value,
        "data-orientation": s(t).orientation.value,
        onMousedown: l[0] || (l[0] = xe((a) => r.value = !0, ["left"])),
        onFocus: l[1] || (l[1] = (a) => {
          s(r) || s(t).onEnter(a);
        }),
        onKeydown: [
          l[2] || (l[2] = At((a) => {
            s(t).orientation.value === "vertical" && (a.key === "ArrowLeft" || a.key === "ArrowRight") || s(t).orientation.value === "horizontal" && (a.key === "ArrowUp" || a.key === "ArrowDown") || (a.preventDefault(), s(t).focusable.value && s(t).onKeydownNavigation(a));
          }, [
            "down",
            "up",
            "left",
            "right",
            "home",
            "end"
          ])),
          At(s(t).onKeydownEnter, ["enter"]),
          s(t).onKeydownTypeAhead
        ]
      }, {
        default: P(() => [F(o.$slots, "default")]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "tabindex",
        "aria-orientation",
        "aria-multiselectable",
        "data-orientation",
        "onKeydown"
      ])]),
      _: 3
    }));
  }
}), gc = hc, bc = /* @__PURE__ */ N({
  __name: "ListboxFilter",
  props: {
    modelValue: {
      type: String,
      required: !1
    },
    autoFocus: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "input"
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, o = /* @__PURE__ */ We(t, "modelValue", n, {
      defaultValue: "",
      passive: t.modelValue === void 0
    }), l = wo(), { primitiveElement: a, currentElement: i } = It(), u = k(() => t.disabled || l.disabled.value || !1), c = M();
    return bi(() => {
      var d;
      return c.value = (d = l.highlightedElement.value) == null ? void 0 : d.id;
    }), we(() => {
      l.focusable.value = !1, setTimeout(() => {
        var d;
        t.autoFocus && ((d = i.value) == null || d.focus());
      }, 1);
    }), Ge(() => {
      l.focusable.value = !0;
    }), (d, f) => (A(), q(s(de), {
      ref_key: "primitiveElement",
      ref: a,
      as: d.as,
      "as-child": d.asChild,
      value: s(o),
      disabled: u.value ? "" : void 0,
      "data-disabled": u.value ? "" : void 0,
      "aria-disabled": u.value ?? void 0,
      "aria-activedescendant": c.value,
      type: "text",
      onKeydown: [At(xe(s(l).onKeydownNavigation, ["prevent"]), [
        "down",
        "up",
        "home",
        "end"
      ]), At(s(l).onKeydownEnter, ["enter"])],
      onInput: f[0] || (f[0] = (p) => {
        o.value = p.target.value, s(l).highlightFirstItem();
      }),
      onCompositionstart: s(l).onCompositionStart,
      onCompositionend: s(l).onCompositionEnd
    }, {
      default: P(() => [F(d.$slots, "default", { modelValue: s(o) })]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "value",
      "disabled",
      "data-disabled",
      "aria-disabled",
      "aria-activedescendant",
      "onKeydown",
      "onCompositionstart",
      "onCompositionend"
    ]));
  }
}), xc = bc;
const [Dm, wc] = Oe("ListboxGroup");
var _c = /* @__PURE__ */ N({
  __name: "ListboxGroup",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e, t = Qe(void 0, "reka-listbox-group");
    return wc({ id: t }), (r, o) => (A(), q(s(de), Q({ role: "group" }, n, { "aria-labelledby": s(t) }), {
      default: P(() => [F(r.$slots, "default")]),
      _: 3
    }, 16, ["aria-labelledby"]));
  }
}), Sc = _c;
const Cc = "listbox.select", [Ac, Oc] = Oe("ListboxItem");
var Ec = /* @__PURE__ */ N({
  __name: "ListboxItem",
  props: {
    value: {
      type: null,
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "div"
    }
  },
  emits: ["select"],
  setup(e, { emit: n }) {
    const t = e, r = n, o = Qe(void 0, "reka-listbox-item"), { CollectionItem: l } = it(), { forwardRef: a, currentElement: i } = se(), u = wo(), c = k(() => i.value === u.highlightedElement.value), d = k(() => pc(u.modelValue.value, t.value, u.by)), f = k(() => u.disabled.value || t.disabled);
    async function p(y) {
      r("select", y), !(y != null && y.defaultPrevented) && !f.value && y && (u.onValueChange(t.value), u.changeHighlight(i.value));
    }
    function v(y) {
      const m = {
        originalEvent: y,
        value: t.value
      };
      so(Cc, p, m);
    }
    return Oc({ isSelected: d }), (y, m) => (A(), q(s(l), { value: y.value }, {
      default: P(() => [xi([c.value, d.value], () => V(s(de), Q({ id: s(o) }, y.$attrs, {
        ref: s(a),
        role: "option",
        tabindex: s(u).focusable.value ? c.value ? "0" : "-1" : -1,
        "aria-selected": d.value,
        as: y.as,
        "as-child": y.asChild,
        disabled: f.value ? "" : void 0,
        "data-disabled": f.value ? "" : void 0,
        "data-highlighted": c.value ? "" : void 0,
        "data-state": d.value ? "checked" : "unchecked",
        onClick: v,
        onKeydown: At(xe(v, ["prevent"]), ["space"]),
        onPointermove: m[0] || (m[0] = () => {
          s(u).highlightedElement.value !== s(i) && s(u).highlightOnHover.value && !s(u).focusable.value && s(u).changeHighlight(s(i), !1);
        })
      }), {
        default: P(() => [F(y.$slots, "default")]),
        _: 3
      }, 16, [
        "id",
        "tabindex",
        "aria-selected",
        "as",
        "as-child",
        "disabled",
        "data-disabled",
        "data-highlighted",
        "data-state",
        "onKeydown"
      ]), m, 1)]),
      _: 3
    }, 8, ["value"]));
  }
}), Tc = Ec, kc = /* @__PURE__ */ N({
  __name: "ListboxItemIndicator",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const n = e;
    se();
    const t = Ac();
    return (r, o) => s(t).isSelected.value ? (A(), q(s(de), Q({
      key: 0,
      "aria-hidden": "true"
    }, n), {
      default: P(() => [F(r.$slots, "default")]),
      _: 3
    }, 16)) : J("v-if", !0);
  }
}), jc = kc;
const [Lt, Pc] = Oe("ComboboxRoot");
var Ic = /* @__PURE__ */ N({
  __name: "ComboboxRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: !1
    },
    resetSearchTermOnBlur: {
      type: Boolean,
      required: !1,
      default: !0
    },
    resetSearchTermOnSelect: {
      type: Boolean,
      required: !1,
      default: !0
    },
    openOnFocus: {
      type: Boolean,
      required: !1,
      default: !1
    },
    openOnClick: {
      type: Boolean,
      required: !1,
      default: !1
    },
    ignoreFilter: {
      type: Boolean,
      required: !1
    },
    resetModelValueOnClear: {
      type: Boolean,
      required: !1,
      default: !1
    },
    modelValue: {
      type: null,
      required: !1
    },
    defaultValue: {
      type: null,
      required: !1
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    dir: {
      type: String,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    highlightOnHover: {
      type: Boolean,
      required: !1,
      default: !0
    },
    by: {
      type: [String, Function],
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "update:modelValue",
    "highlight",
    "update:open"
  ],
  setup(e, { expose: n, emit: t }) {
    var oe, ne, ue;
    const r = e, o = t, { primitiveElement: l, currentElement: a } = It(), { multiple: i, disabled: u, ignoreFilter: c, resetSearchTermOnSelect: d, openOnFocus: f, openOnClick: p, dir: v, resetModelValueOnClear: y, highlightOnHover: m } = $e(r), S = Mn(v), x = /* @__PURE__ */ We(r, "modelValue", o, {
      defaultValue: r.defaultValue ?? (i.value ? [] : void 0),
      passive: r.modelValue === void 0,
      deep: !0
    }), h = /* @__PURE__ */ We(r, "open", o, {
      defaultValue: r.defaultOpen,
      passive: r.open === void 0
    });
    async function w(D) {
      var Z, G;
      h.value = D, B.value = "", D ? (await ge(), (Z = l.value) == null || Z.highlightSelected(), g.value = !0, (G = O.value) == null || G.focus()) : (g.value = !1, setTimeout(() => {
        !D && r.resetSearchTermOnBlur && C.trigger();
      }, 1));
    }
    const C = /* @__PURE__ */ Sn(), g = M(!1), b = M(!1), O = M(), T = M(), _ = k(() => {
      var D;
      return ((D = l.value) == null ? void 0 : D.highlightedElement) ?? void 0;
    }), j = M(/* @__PURE__ */ new Map()), $ = M(/* @__PURE__ */ new Map()), { contains: R } = Qs({ sensitivity: "base" }), B = M(""), z = k((D) => {
      if (!B.value || r.ignoreFilter || b.value)
        return {
          count: j.value.size,
          items: (D == null ? void 0 : D.items) ?? /* @__PURE__ */ new Map(),
          groups: (D == null ? void 0 : D.groups) ?? new Set($.value.keys())
        };
      let Z = 0;
      const G = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Set();
      for (const [re, ye] of j.value) {
        const ce = R(ye, B.value);
        G.set(re, ce ? 1 : 0), ce && Z++;
      }
      for (const [re, ye] of $.value)
        for (const ce of ye)
          if (G.get(ce) > 0) {
            ve.add(re);
            break;
          }
      return {
        count: Z,
        items: G,
        groups: ve
      };
    }), U = Dt();
    return we(() => {
      var D, Z, G;
      U != null && U.exposed && (U.exposed.highlightItem = (D = l.value) == null ? void 0 : D.highlightItem, U.exposed.highlightFirstItem = (Z = l.value) == null ? void 0 : Z.highlightFirstItem, U.exposed.highlightSelected = (G = l.value) == null ? void 0 : G.highlightSelected);
    }), n({
      filtered: z,
      highlightedElement: _,
      highlightItem: (oe = l.value) == null ? void 0 : oe.highlightItem,
      highlightFirstItem: (ne = l.value) == null ? void 0 : ne.highlightFirstItem,
      highlightSelected: (ue = l.value) == null ? void 0 : ue.highlightSelected
    }), Pc({
      modelValue: x,
      multiple: i,
      disabled: u,
      open: h,
      onOpenChange: w,
      contentId: "",
      isUserInputted: g,
      isVirtual: b,
      inputElement: O,
      highlightedElement: _,
      onInputElementChange: (D) => O.value = D,
      triggerElement: T,
      onTriggerElementChange: (D) => T.value = D,
      parentElement: a,
      resetSearchTermOnSelect: d,
      onResetSearchTerm: C.on,
      allItems: j,
      allGroups: $,
      filterSearch: B,
      filterState: z,
      ignoreFilter: c,
      openOnFocus: f,
      openOnClick: p,
      resetModelValueOnClear: y
    }), (D, Z) => (A(), q(s(vo), null, {
      default: P(() => [V(s(mc), Q({
        ref_key: "primitiveElement",
        ref: l
      }, D.$attrs, {
        modelValue: s(x),
        "onUpdate:modelValue": Z[0] || (Z[0] = (G) => _n(x) ? x.value = G : null),
        style: { pointerEvents: s(h) ? "auto" : void 0 },
        as: D.as,
        "as-child": D.asChild,
        dir: s(S),
        multiple: s(i),
        name: D.name,
        required: D.required,
        disabled: s(u),
        "highlight-on-hover": s(m),
        by: r.by,
        onHighlight: Z[1] || (Z[1] = (G) => o("highlight", G))
      }), {
        default: P(() => [F(D.$slots, "default", {
          open: s(h),
          modelValue: s(x)
        })]),
        _: 3
      }, 16, [
        "modelValue",
        "style",
        "as",
        "as-child",
        "dir",
        "multiple",
        "name",
        "required",
        "disabled",
        "highlight-on-hover",
        "by"
      ])]),
      _: 3
    }));
  }
}), Mc = Ic;
const [Lm, Rc] = Oe("ComboboxContent");
var Dc = /* @__PURE__ */ N({
  __name: "ComboboxContentImpl",
  props: {
    position: {
      type: String,
      required: !1,
      default: "inline"
    },
    bodyLock: {
      type: Boolean,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside"
  ],
  setup(e, { emit: n }) {
    const t = e, r = n, { position: o } = $e(t), l = Lt(), { forwardRef: a, currentElement: i } = se();
    xr(t.bodyLock), wr(), Sr(l.parentElement);
    const u = k(() => t.position === "popper" ? t : {}), c = dn(u.value), d = {
      boxSizing: "border-box",
      "--reka-combobox-content-transform-origin": "var(--reka-popper-transform-origin)",
      "--reka-combobox-content-available-width": "var(--reka-popper-available-width)",
      "--reka-combobox-content-available-height": "var(--reka-popper-available-height)",
      "--reka-combobox-trigger-width": "var(--reka-popper-anchor-width)",
      "--reka-combobox-trigger-height": "var(--reka-popper-anchor-height)"
    };
    Rc({ position: o });
    const f = M(!1);
    return we(() => {
      l.inputElement.value && (f.value = i.value.contains(l.inputElement.value), f.value && l.inputElement.value.focus());
    }), Ge(() => {
      var v;
      const p = ze();
      f.value && (!p || p === document.body) && ((v = l.triggerElement.value) == null || v.focus());
    }), (p, v) => (A(), q(s(gc), { "as-child": "" }, {
      default: P(() => [V(s(Ar), {
        "as-child": "",
        onMountAutoFocus: v[5] || (v[5] = xe(() => {
        }, ["prevent"])),
        onUnmountAutoFocus: v[6] || (v[6] = xe(() => {
        }, ["prevent"]))
      }, {
        default: P(() => [V(s(co), {
          "as-child": "",
          "disable-outside-pointer-events": p.disableOutsidePointerEvents,
          onDismiss: v[0] || (v[0] = (y) => s(l).onOpenChange(!1)),
          onFocusOutside: v[1] || (v[1] = (y) => {
            var m;
            (m = s(l).parentElement.value) != null && m.contains(y.target) && y.preventDefault(), r("focusOutside", y);
          }),
          onInteractOutside: v[2] || (v[2] = (y) => r("interactOutside", y)),
          onEscapeKeyDown: v[3] || (v[3] = (y) => r("escapeKeyDown", y)),
          onPointerDownOutside: v[4] || (v[4] = (y) => {
            var m;
            (m = s(l).parentElement.value) != null && m.contains(y.target) && y.preventDefault(), r("pointerDownOutside", y);
          })
        }, {
          default: P(() => [(A(), q(Je(s(o) === "popper" ? s(xo) : s(de)), Q({
            ...p.$attrs,
            ...s(c)
          }, {
            id: s(l).contentId,
            ref: s(a),
            "data-state": s(l).open.value ? "open" : "closed",
            style: {
              display: "flex",
              flexDirection: "column",
              outline: "none",
              ...s(o) === "popper" ? d : {}
            }
          }), {
            default: P(() => [F(p.$slots, "default")]),
            _: 3
          }, 16, [
            "id",
            "data-state",
            "style"
          ]))]),
          _: 3
        }, 8, ["disable-outside-pointer-events"])]),
        _: 3
      })]),
      _: 3
    }));
  }
}), Lc = Dc, $c = /* @__PURE__ */ N({
  __name: "ComboboxContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    position: {
      type: String,
      required: !1
    },
    bodyLock: {
      type: Boolean,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside"
  ],
  setup(e, { emit: n }) {
    const o = cn(e, n), { forwardRef: l } = se(), a = Lt();
    return a.contentId || (a.contentId = Qe(void 0, "reka-combobox-content")), (i, u) => (A(), q(s(fn), { present: i.forceMount || s(a).open.value }, {
      default: P(() => [V(Lc, Q({
        ...s(o),
        ...i.$attrs
      }, { ref: s(l) }), {
        default: P(() => [F(i.$slots, "default")]),
        _: 3
      }, 16)]),
      _: 3
    }, 8, ["present"]));
  }
}), qc = $c, Bc = /* @__PURE__ */ N({
  __name: "ComboboxEmpty",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e, t = Lt(), r = k(() => t.ignoreFilter.value ? t.allItems.value.size === 0 : t.filterState.value.count === 0);
    return (o, l) => r.value ? (A(), q(s(de), Ie(Q({ key: 0 }, n)), {
      default: P(() => [F(o.$slots, "default", {}, () => [l[0] || (l[0] = _e("No options"))])]),
      _: 3
    }, 16)) : J("v-if", !0);
  }
}), Fc = Bc;
const [qa, Nc] = Oe("ComboboxGroup");
var Vc = /* @__PURE__ */ N({
  __name: "ComboboxGroup",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e, t = Qe(void 0, "reka-combobox-group"), r = Lt(), o = k(() => r.ignoreFilter.value ? !0 : r.filterSearch.value ? r.filterState.value.groups.has(t) : !0), l = Nc({
      id: t,
      labelId: ""
    });
    return we(() => {
      r.allGroups.value.has(t) || r.allGroups.value.set(t, /* @__PURE__ */ new Set());
    }), Ge(() => {
      r.allGroups.value.delete(t);
    }), (a, i) => (A(), q(s(Sc), Q({
      id: s(t),
      "aria-labelledby": s(l).labelId
    }, n, { hidden: o.value ? void 0 : !0 }), {
      default: P(() => [F(a.$slots, "default")]),
      _: 3
    }, 16, [
      "id",
      "aria-labelledby",
      "hidden"
    ]));
  }
}), zc = Vc, Hc = /* @__PURE__ */ N({
  __name: "ComboboxInput",
  props: {
    displayValue: {
      type: Function,
      required: !1
    },
    modelValue: {
      type: String,
      required: !1
    },
    autoFocus: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "input"
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, r = n, o = Lt(), l = wo(), { primitiveElement: a, currentElement: i } = It(), u = /* @__PURE__ */ We(t, "modelValue", r, { passive: t.modelValue === void 0 });
    we(() => {
      i.value && o.onInputElementChange(i.value);
    });
    function c(y) {
      o.open.value || o.onOpenChange(!0);
    }
    function d(y) {
      const m = y.target;
      o.open.value ? o.filterSearch.value = m.value : (o.onOpenChange(!0), ge(() => {
        m.value && (o.filterSearch.value = m.value, l.highlightFirstItem());
      }));
    }
    function f() {
      o.openOnFocus.value && !o.open.value && o.onOpenChange(!0);
    }
    function p() {
      o.openOnClick.value && !o.open.value && o.onOpenChange(!0);
    }
    function v() {
      const y = o.modelValue.value;
      t.displayValue ? u.value = t.displayValue(y) : !o.multiple.value && y && !Array.isArray(y) && typeof y != "object" ? u.value = y.toString() : u.value = "", ge(() => {
        u.value = u.value;
      });
    }
    return o.onResetSearchTerm(() => {
      v();
    }), pe(o.modelValue, async () => {
      !o.isUserInputted.value && o.resetSearchTermOnSelect.value && v();
    }, {
      immediate: !0,
      deep: !0
    }), pe(o.filterState, (y, m) => {
      !o.isVirtual.value && m.count === 0 && l.highlightFirstItem();
    }), (y, m) => (A(), q(s(xc), {
      ref_key: "primitiveElement",
      ref: a,
      modelValue: s(u),
      "onUpdate:modelValue": m[0] || (m[0] = (S) => _n(u) ? u.value = S : null),
      as: y.as,
      "as-child": y.asChild,
      "auto-focus": y.autoFocus,
      disabled: y.disabled,
      "aria-expanded": s(o).open.value,
      "aria-controls": s(o).contentId,
      "aria-autocomplete": "list",
      role: "combobox",
      autocomplete: "off",
      onClick: p,
      onInput: d,
      onKeydown: At(xe(c, ["prevent"]), ["down", "up"]),
      onFocus: f
    }, {
      default: P(() => [F(y.$slots, "default")]),
      _: 3
    }, 8, [
      "modelValue",
      "as",
      "as-child",
      "auto-focus",
      "disabled",
      "aria-expanded",
      "aria-controls",
      "onKeydown"
    ]));
  }
}), Uc = Hc, Kc = /* @__PURE__ */ N({
  __name: "ComboboxItem",
  props: {
    textValue: {
      type: String,
      required: !1
    },
    value: {
      type: null,
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["select"],
  setup(e, { emit: n }) {
    const t = e, r = n, o = Qe(void 0, "reka-combobox-item"), l = Lt(), a = qa(null), { primitiveElement: i, currentElement: u } = It();
    if (t.value === "")
      throw new Error("A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.");
    const c = k(() => {
      if (l.isVirtual.value || l.ignoreFilter.value || !l.filterSearch.value)
        return !0;
      {
        const d = l.filterState.value.items.get(o);
        return d === void 0 ? !0 : d > 0;
      }
    });
    return we(() => {
      var f;
      l.allItems.value.set(o, t.textValue || u.value.textContent || u.value.innerText);
      const d = a == null ? void 0 : a.id;
      d && (l.allGroups.value.has(d) ? (f = l.allGroups.value.get(d)) == null || f.add(o) : l.allGroups.value.set(d, /* @__PURE__ */ new Set([o])));
    }), Ge(() => {
      l.allItems.value.delete(o);
    }), (d, f) => c.value ? (A(), q(s(Tc), Q({ key: 0 }, t, {
      id: s(o),
      ref_key: "primitiveElement",
      ref: i,
      disabled: s(l).disabled.value || d.disabled,
      onSelect: f[0] || (f[0] = (p) => {
        r("select", p), !p.defaultPrevented && !s(l).multiple.value && !d.disabled && !s(l).disabled.value && (p.preventDefault(), s(l).onOpenChange(!1), s(l).modelValue.value = t.value);
      })
    }), {
      default: P(() => [F(d.$slots, "default", {}, () => [_e(W(d.value), 1)])]),
      _: 3
    }, 16, ["id", "disabled"])) : J("v-if", !0);
  }
}), Ml = Kc, Wc = /* @__PURE__ */ N({
  __name: "ComboboxItemIndicator",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const n = e;
    return (t, r) => (A(), q(s(jc), Ie(Be(n)), {
      default: P(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Rl = Wc, Gc = /* @__PURE__ */ N({
  __name: "ComboboxLabel",
  props: {
    for: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "div"
    }
  },
  setup(e) {
    const n = e;
    se();
    const t = qa({
      id: "",
      labelId: ""
    });
    return t.labelId || (t.labelId = Qe(void 0, "reka-combobox-group-label")), (r, o) => (A(), q(s(de), Q(n, { id: s(t).labelId }), {
      default: P(() => [F(r.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), Yc = Gc, Xc = /* @__PURE__ */ N({
  __name: "ComboboxPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const n = e;
    return (t, r) => (A(), q(s(fo), Ie(Be(n)), {
      default: P(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Jc = Xc, Zc = /* @__PURE__ */ N({
  __name: "ComboboxTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const n = e, { forwardRef: t, currentElement: r } = se(), o = Lt(), l = k(() => n.disabled || o.disabled.value || !1);
    return we(() => {
      r.value && o.onTriggerElementChange(r.value);
    }), (a, i) => (A(), q(s(de), Q(n, {
      ref: s(t),
      type: a.as === "button" ? "button" : void 0,
      tabindex: "-1",
      "aria-label": "Show popup",
      "aria-haspopup": "listbox",
      "aria-expanded": s(o).open.value,
      "aria-controls": s(o).contentId,
      "data-state": s(o).open.value ? "open" : "closed",
      disabled: l.value,
      "data-disabled": l.value ? "" : void 0,
      "aria-disabled": l.value ?? void 0,
      onClick: i[0] || (i[0] = (u) => s(o).onOpenChange(!s(o).open.value))
    }), {
      default: P(() => [F(a.$slots, "default")]),
      _: 3
    }, 16, [
      "type",
      "aria-expanded",
      "aria-controls",
      "data-state",
      "disabled",
      "data-disabled",
      "aria-disabled"
    ]));
  }
}), Qc = Zc;
function Ba(e) {
  const n = uo({ nonce: M() });
  return k(() => {
    var t;
    return (e == null ? void 0 : e.value) || ((t = n.nonce) == null ? void 0 : t.value);
  });
}
var ef = /* @__PURE__ */ N({
  __name: "ComboboxViewport",
  props: {
    nonce: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e, { forwardRef: t } = se(), { nonce: r } = $e(n), o = Ba(r), l = Lt();
    return (a, i) => (A(), H(be, null, [V(s(de), Q({
      ...a.$attrs,
      ...n
    }, {
      ref: s(t),
      "data-reka-combobox-viewport": "",
      role: "presentation",
      style: {
        position: "relative",
        flex: s(l).isVirtual.value ? void 0 : 1,
        overflow: "auto"
      }
    }), {
      default: P(() => [F(a.$slots, "default")]),
      _: 3
    }, 16, ["style"]), V(s(de), {
      as: "style",
      nonce: s(o)
    }, {
      default: P(() => i[0] || (i[0] = [_e(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-combobox-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-combobox-viewport]::-webkit-scrollbar { display: none; } ")])),
      _: 1,
      __: [0]
    }, 8, ["nonce"])], 64));
  }
}), tf = ef;
const [Dn, nf] = Oe("PopoverRoot");
var of = /* @__PURE__ */ N({
  __name: "PopoverRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !1
    },
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    modal: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  emits: ["update:open"],
  setup(e, { emit: n }) {
    const t = e, r = n, { modal: o } = $e(t), l = /* @__PURE__ */ We(t, "open", r, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    }), a = M(), i = M(!1);
    return nf({
      contentId: "",
      triggerId: "",
      modal: o,
      open: l,
      onOpenChange: (u) => {
        l.value = u;
      },
      onOpenToggle: () => {
        l.value = !l.value;
      },
      triggerElement: a,
      hasCustomAnchor: i
    }), (u, c) => (A(), q(s(vo), null, {
      default: P(() => [F(u.$slots, "default", {
        open: s(l),
        close: () => l.value = !1
      })]),
      _: 3
    }));
  }
}), rf = of, lf = /* @__PURE__ */ N({
  __name: "PopoverAnchor",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e;
    se();
    const t = Dn();
    return wi(() => {
      t.hasCustomAnchor.value = !0;
    }), Ge(() => {
      t.hasCustomAnchor.value = !1;
    }), (r, o) => (A(), q(s(yo), Ie(Be(n)), {
      default: P(() => [F(r.$slots, "default")]),
      _: 3
    }, 16));
  }
}), af = lf, sf = /* @__PURE__ */ N({
  __name: "PopoverContentImpl",
  props: {
    trapFocus: {
      type: Boolean,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: n }) {
    const t = e, r = n, o = dn(Ns(t, "trapFocus", "disableOutsidePointerEvents")), { forwardRef: l } = se(), a = Dn();
    return wr(), (i, u) => (A(), q(s(Ar), {
      "as-child": "",
      loop: "",
      trapped: i.trapFocus,
      onMountAutoFocus: u[5] || (u[5] = (c) => r("openAutoFocus", c)),
      onUnmountAutoFocus: u[6] || (u[6] = (c) => r("closeAutoFocus", c))
    }, {
      default: P(() => [V(s(co), {
        "as-child": "",
        "disable-outside-pointer-events": i.disableOutsidePointerEvents,
        onPointerDownOutside: u[0] || (u[0] = (c) => r("pointerDownOutside", c)),
        onInteractOutside: u[1] || (u[1] = (c) => r("interactOutside", c)),
        onEscapeKeyDown: u[2] || (u[2] = (c) => r("escapeKeyDown", c)),
        onFocusOutside: u[3] || (u[3] = (c) => r("focusOutside", c)),
        onDismiss: u[4] || (u[4] = (c) => s(a).onOpenChange(!1))
      }, {
        default: P(() => [V(s(xo), Q(s(o), {
          id: s(a).contentId,
          ref: s(l),
          "data-state": s(a).open.value ? "open" : "closed",
          "aria-labelledby": s(a).triggerId,
          style: {
            "--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
            "--reka-popover-content-available-width": "var(--reka-popper-available-width)",
            "--reka-popover-content-available-height": "var(--reka-popper-available-height)",
            "--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
            "--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
          },
          role: "dialog"
        }), {
          default: P(() => [F(i.$slots, "default")]),
          _: 3
        }, 16, [
          "id",
          "data-state",
          "aria-labelledby"
        ])]),
        _: 3
      }, 8, ["disable-outside-pointer-events"])]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Fa = sf, uf = /* @__PURE__ */ N({
  __name: "PopoverContentModal",
  props: {
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: n }) {
    const t = e, r = n, o = Dn(), l = M(!1);
    xr(!0);
    const a = cn(t, r), { forwardRef: i, currentElement: u } = se();
    return Sr(u), (c, d) => (A(), q(Fa, Q(s(a), {
      ref: s(i),
      "trap-focus": s(o).open.value,
      "disable-outside-pointer-events": "",
      onCloseAutoFocus: d[0] || (d[0] = xe((f) => {
        var p;
        r("closeAutoFocus", f), l.value || (p = s(o).triggerElement.value) == null || p.focus();
      }, ["prevent"])),
      onPointerDownOutside: d[1] || (d[1] = (f) => {
        r("pointerDownOutside", f);
        const p = f.detail.originalEvent, v = p.button === 0 && p.ctrlKey === !0, y = p.button === 2 || v;
        l.value = y;
      }),
      onFocusOutside: d[2] || (d[2] = xe(() => {
      }, ["prevent"]))
    }), {
      default: P(() => [F(c.$slots, "default")]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), df = uf, cf = /* @__PURE__ */ N({
  __name: "PopoverContentNonModal",
  props: {
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: n }) {
    const t = e, r = n, o = Dn(), l = M(!1), a = M(!1), i = cn(t, r);
    return (u, c) => (A(), q(Fa, Q(s(i), {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: c[0] || (c[0] = (d) => {
        var f;
        r("closeAutoFocus", d), d.defaultPrevented || (l.value || (f = s(o).triggerElement.value) == null || f.focus(), d.preventDefault()), l.value = !1, a.value = !1;
      }),
      onInteractOutside: c[1] || (c[1] = async (d) => {
        var v;
        r("interactOutside", d), d.defaultPrevented || (l.value = !0, d.detail.originalEvent.type === "pointerdown" && (a.value = !0));
        const f = d.target;
        ((v = s(o).triggerElement.value) == null ? void 0 : v.contains(f)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && a.value && d.preventDefault();
      })
    }), {
      default: P(() => [F(u.$slots, "default")]),
      _: 3
    }, 16));
  }
}), ff = cf, pf = /* @__PURE__ */ N({
  __name: "PopoverContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: n }) {
    const t = e, r = n, o = Dn(), l = cn(t, r), { forwardRef: a } = se();
    return o.contentId || (o.contentId = Qe(void 0, "reka-popover-content")), (i, u) => (A(), q(s(fn), { present: i.forceMount || s(o).open.value }, {
      default: P(() => [s(o).modal.value ? (A(), q(df, Q({ key: 0 }, s(l), { ref: s(a) }), {
        default: P(() => [F(i.$slots, "default")]),
        _: 3
      }, 16)) : (A(), q(ff, Q({ key: 1 }, s(l), { ref: s(a) }), {
        default: P(() => [F(i.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), vf = pf, yf = /* @__PURE__ */ N({
  __name: "PopoverPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const n = e;
    return (t, r) => (A(), q(s(fo), Ie(Be(n)), {
      default: P(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), mf = yf;
const hf = [
  " ",
  "Enter",
  "ArrowUp",
  "ArrowDown"
], gf = [" ", "Enter"], tt = 10;
function Tn(e, n, t) {
  return e === void 0 ? !1 : Array.isArray(e) ? e.some((r) => rr(r, n, t)) : rr(e, n, t);
}
function rr(e, n, t) {
  return e === void 0 || n === void 0 ? !1 : typeof e == "string" ? e === n : typeof t == "function" ? t(e, n) : typeof t == "string" ? (e == null ? void 0 : e[t]) === (n == null ? void 0 : n[t]) : to(e, n);
}
function bf(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
const xf = {
  key: 0,
  value: ""
}, [$t, Na] = Oe("SelectRoot");
var wf = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "SelectRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: !1
    },
    defaultValue: {
      type: null,
      required: !1
    },
    modelValue: {
      type: null,
      required: !1,
      default: void 0
    },
    by: {
      type: [String, Function],
      required: !1
    },
    dir: {
      type: String,
      required: !1
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    autocomplete: {
      type: String,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue", "update:open"],
  setup(e, { emit: n }) {
    const t = e, r = n, { required: o, disabled: l, multiple: a, dir: i } = $e(t), u = /* @__PURE__ */ We(t, "modelValue", r, {
      defaultValue: t.defaultValue ?? (a.value ? [] : void 0),
      passive: t.modelValue === void 0,
      deep: !0
    }), c = /* @__PURE__ */ We(t, "open", r, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    }), d = M(), f = M(), p = M({
      x: 0,
      y: 0
    }), v = k(() => {
      var C;
      return a.value && Array.isArray(u.value) ? ((C = u.value) == null ? void 0 : C.length) === 0 : Xo(u.value);
    });
    it({ isProvider: !0 });
    const y = Mn(i), m = _r(d), S = M(/* @__PURE__ */ new Set()), x = k(() => Array.from(S.value).map((C) => C.value).join(";"));
    function h(C) {
      if (a.value) {
        const g = Array.isArray(u.value) ? [...u.value] : [], b = g.findIndex((O) => rr(O, C, t.by));
        b === -1 ? g.push(C) : g.splice(b, 1), u.value = [...g];
      } else
        u.value = C;
    }
    function w(C) {
      return Array.from(S.value).find((g) => Tn(C, g.value, t.by));
    }
    return Na({
      triggerElement: d,
      onTriggerChange: (C) => {
        d.value = C;
      },
      valueElement: f,
      onValueElementChange: (C) => {
        f.value = C;
      },
      contentId: "",
      modelValue: u,
      onValueChange: h,
      by: t.by,
      open: c,
      multiple: a,
      required: o,
      onOpenChange: (C) => {
        c.value = C;
      },
      dir: y,
      triggerPointerDownPosRef: p,
      disabled: l,
      isEmptyModelValue: v,
      optionsSet: S,
      onOptionAdd: (C) => {
        const g = w(C.value);
        g && S.value.delete(g), S.value.add(C);
      },
      onOptionRemove: (C) => {
        const g = w(C.value);
        g && S.value.delete(g);
      }
    }), (C, g) => (A(), q(s(vo), null, {
      default: P(() => [F(C.$slots, "default", {
        modelValue: s(u),
        open: s(c)
      }), s(m) ? (A(), q(Cf, {
        key: x.value,
        "aria-hidden": "true",
        tabindex: "-1",
        multiple: s(a),
        required: s(o),
        name: C.name,
        autocomplete: C.autocomplete,
        disabled: s(l),
        value: s(u)
      }, {
        default: P(() => [s(Xo)(s(u)) ? (A(), H("option", xf)) : J("v-if", !0), (A(!0), H(be, null, ot(Array.from(S.value), (b) => (A(), H("option", Q({ key: b.value ?? "" }, { ref_for: !0 }, b), null, 16))), 128))]),
        _: 1
      }, 8, [
        "multiple",
        "required",
        "name",
        "autocomplete",
        "disabled",
        "value"
      ])) : J("v-if", !0)]),
      _: 3
    }));
  }
}), _f = wf, Sf = /* @__PURE__ */ N({
  __name: "BubbleSelect",
  props: {
    autocomplete: {
      type: String,
      required: !1
    },
    autofocus: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    form: {
      type: String,
      required: !1
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    },
    size: {
      type: Number,
      required: !1
    },
    value: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e, t = M(), r = $t();
    pe(() => n.value, (l, a) => {
      const i = window.HTMLSelectElement.prototype, c = Object.getOwnPropertyDescriptor(i, "value").set;
      if (l !== a && c && t.value) {
        const d = new Event("change", { bubbles: !0 });
        c.call(t.value, l), t.value.dispatchEvent(d);
      }
    });
    function o(l) {
      r.onValueChange(l.target.value);
    }
    return (l, a) => (A(), q(s(po), { "as-child": "" }, {
      default: P(() => [I("select", Q({
        ref_key: "selectElement",
        ref: t
      }, n, { onInput: o }), [F(l.$slots, "default")], 16)]),
      _: 3
    }));
  }
}), Cf = Sf, Af = /* @__PURE__ */ N({
  __name: "SelectPopperPosition",
  props: {
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1,
      default: "start"
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1,
      default: tt
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = dn(e);
    return (r, o) => (A(), q(s(xo), Q(s(t), { style: {
      boxSizing: "border-box",
      "--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
      "--reka-select-content-available-width": "var(--reka-popper-available-width)",
      "--reka-select-content-available-height": "var(--reka-popper-available-height)",
      "--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
      "--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
    } }), {
      default: P(() => [F(r.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Of = Af;
const Ef = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
}, [_o, Va] = Oe("SelectContent");
var Tf = /* @__PURE__ */ N({
  __name: "SelectContentImpl",
  props: {
    position: {
      type: String,
      required: !1,
      default: "item-aligned"
    },
    bodyLock: {
      type: Boolean,
      required: !1,
      default: !0
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1,
      default: "start"
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(e, { emit: n }) {
    const t = e, r = n, o = $t();
    wr(), xr(t.bodyLock);
    const { CollectionSlot: l, getItems: a } = it(), i = M();
    Sr(i);
    const { search: u, handleTypeaheadSearch: c } = Cr(), d = M(), f = M(), p = M(), v = M(!1), y = M(!1), m = M(!1);
    function S() {
      f.value && i.value && bl([f.value, i.value]);
    }
    pe(v, () => {
      S();
    });
    const { onOpenChange: x, triggerPointerDownPosRef: h } = o;
    Ae((b) => {
      if (!i.value)
        return;
      let O = {
        x: 0,
        y: 0
      };
      const T = (j) => {
        var $, R;
        O = {
          x: Math.abs(Math.round(j.pageX) - ((($ = h.value) == null ? void 0 : $.x) ?? 0)),
          y: Math.abs(Math.round(j.pageY) - (((R = h.value) == null ? void 0 : R.y) ?? 0))
        };
      }, _ = (j) => {
        var $;
        j.pointerType !== "touch" && (O.x <= 10 && O.y <= 10 ? j.preventDefault() : ($ = i.value) != null && $.contains(j.target) || x(!1), document.removeEventListener("pointermove", T), h.value = null);
      };
      h.value !== null && (document.addEventListener("pointermove", T), document.addEventListener("pointerup", _, {
        capture: !0,
        once: !0
      })), b(() => {
        document.removeEventListener("pointermove", T), document.removeEventListener("pointerup", _, { capture: !0 });
      });
    });
    function w(b) {
      const O = b.ctrlKey || b.altKey || b.metaKey;
      if (b.key === "Tab" && b.preventDefault(), !O && b.key.length === 1 && c(b.key, a()), [
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End"
      ].includes(b.key)) {
        let _ = [...a().map((j) => j.ref)];
        if (["ArrowUp", "End"].includes(b.key) && (_ = _.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(b.key)) {
          const j = b.target, $ = _.indexOf(j);
          _ = _.slice($ + 1);
        }
        setTimeout(() => bl(_)), b.preventDefault();
      }
    }
    const C = k(() => t.position === "popper" ? t : {}), g = dn(C.value);
    return Va({
      content: i,
      viewport: d,
      onViewportChange: (b) => {
        d.value = b;
      },
      itemRefCallback: (b, O, T) => {
        const _ = !y.value && !T, j = Tn(o.modelValue.value, O, o.by);
        if (o.multiple.value) {
          if (m.value)
            return;
          (j || _) && (f.value = b, j && (m.value = !0));
        } else
          (j || _) && (f.value = b);
        _ && (y.value = !0);
      },
      selectedItem: f,
      selectedItemText: p,
      onItemLeave: () => {
        var b;
        (b = i.value) == null || b.focus();
      },
      itemTextRefCallback: (b, O, T) => {
        const _ = !y.value && !T;
        (Tn(o.modelValue.value, O, o.by) || _) && (p.value = b);
      },
      focusSelectedItem: S,
      position: t.position,
      isPositioned: v,
      searchRef: u
    }), (b, O) => (A(), q(s(l), null, {
      default: P(() => [V(s(Ar), {
        "as-child": "",
        onMountAutoFocus: O[6] || (O[6] = xe(() => {
        }, ["prevent"])),
        onUnmountAutoFocus: O[7] || (O[7] = (T) => {
          var _;
          r("closeAutoFocus", T), !T.defaultPrevented && ((_ = s(o).triggerElement.value) == null || _.focus({ preventScroll: !0 }), T.preventDefault());
        })
      }, {
        default: P(() => [V(s(co), {
          "as-child": "",
          "disable-outside-pointer-events": b.disableOutsidePointerEvents,
          onFocusOutside: O[2] || (O[2] = xe(() => {
          }, ["prevent"])),
          onDismiss: O[3] || (O[3] = (T) => s(o).onOpenChange(!1)),
          onEscapeKeyDown: O[4] || (O[4] = (T) => r("escapeKeyDown", T)),
          onPointerDownOutside: O[5] || (O[5] = (T) => r("pointerDownOutside", T))
        }, {
          default: P(() => [(A(), q(Je(b.position === "popper" ? Of : Mf), Q({
            ...b.$attrs,
            ...s(g)
          }, {
            id: s(o).contentId,
            ref: (T) => {
              const _ = s(mt)(T);
              _ != null && _.hasAttribute("data-reka-popper-content-wrapper") ? i.value = _.firstElementChild : i.value = _;
            },
            role: "listbox",
            "data-state": s(o).open.value ? "open" : "closed",
            dir: s(o).dir.value,
            style: {
              display: "flex",
              flexDirection: "column",
              outline: "none"
            },
            onContextmenu: O[0] || (O[0] = xe(() => {
            }, ["prevent"])),
            onPlaced: O[1] || (O[1] = (T) => v.value = !0),
            onKeydown: w
          }), {
            default: P(() => [F(b.$slots, "default")]),
            _: 3
          }, 16, [
            "id",
            "data-state",
            "dir",
            "onKeydown"
          ]))]),
          _: 3
        }, 8, ["disable-outside-pointer-events"])]),
        _: 3
      })]),
      _: 3
    }));
  }
}), kf = Tf;
const [jf, Pf] = Oe("SelectItemAlignedPosition");
var If = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["placed"],
  setup(e, { emit: n }) {
    const t = e, r = n, { getItems: o } = it(), l = $t(), a = _o(), i = M(!1), u = M(!0), c = M(), { forwardRef: d, currentElement: f } = se(), { viewport: p, selectedItem: v, selectedItemText: y, focusSelectedItem: m } = a;
    function S() {
      if (l.triggerElement.value && l.valueElement.value && c.value && f.value && (p != null && p.value) && (v != null && v.value) && (y != null && y.value)) {
        const w = l.triggerElement.value.getBoundingClientRect(), C = f.value.getBoundingClientRect(), g = l.valueElement.value.getBoundingClientRect(), b = y.value.getBoundingClientRect();
        if (l.dir.value !== "rtl") {
          const Y = b.left - C.left, te = g.left - Y, ie = w.left - te, me = w.width + ie, Me = Math.max(me, C.width), et = window.innerWidth - tt, Ye = pl(te, tt, Math.max(tt, et - Me));
          c.value.style.minWidth = `${me}px`, c.value.style.left = `${Ye}px`;
        } else {
          const Y = C.right - b.right, te = window.innerWidth - g.right - Y, ie = window.innerWidth - w.right - te, me = w.width + ie, Me = Math.max(me, C.width), et = window.innerWidth - tt, Ye = pl(te, tt, Math.max(tt, et - Me));
          c.value.style.minWidth = `${me}px`, c.value.style.right = `${Ye}px`;
        }
        const O = o().map((Y) => Y.ref), T = window.innerHeight - tt * 2, _ = p.value.scrollHeight, j = window.getComputedStyle(f.value), $ = Number.parseInt(j.borderTopWidth, 10), R = Number.parseInt(j.paddingTop, 10), B = Number.parseInt(j.borderBottomWidth, 10), z = Number.parseInt(j.paddingBottom, 10), U = $ + R + _ + z + B, oe = Math.min(v.value.offsetHeight * 5, U), ne = window.getComputedStyle(p.value), ue = Number.parseInt(ne.paddingTop, 10), D = Number.parseInt(ne.paddingBottom, 10), Z = w.top + w.height / 2 - tt, G = T - Z, ve = v.value.offsetHeight / 2, re = v.value.offsetTop + ve, ye = $ + R + re, ce = U - ye;
        if (ye <= Z) {
          const Y = v.value === O[O.length - 1];
          c.value.style.bottom = "0px";
          const te = f.value.clientHeight - p.value.offsetTop - p.value.offsetHeight, ie = Math.max(G, ve + (Y ? D : 0) + te + B), me = ye + ie;
          c.value.style.height = `${me}px`;
        } else {
          const Y = v.value === O[0];
          c.value.style.top = "0px";
          const ie = Math.max(Z, $ + p.value.offsetTop + (Y ? ue : 0) + ve) + ce;
          c.value.style.height = `${ie}px`, p.value.scrollTop = ye - Z + p.value.offsetTop;
        }
        c.value.style.margin = `${tt}px 0`, c.value.style.minHeight = `${oe}px`, c.value.style.maxHeight = `${T}px`, r("placed"), requestAnimationFrame(() => i.value = !0);
      }
    }
    const x = M("");
    we(async () => {
      await ge(), S(), f.value && (x.value = window.getComputedStyle(f.value).zIndex);
    });
    function h(w) {
      w && u.value === !0 && (S(), m == null || m(), u.value = !1);
    }
    return ba(l.triggerElement, () => {
      S();
    }), Pf({
      contentWrapper: c,
      shouldExpandOnScrollRef: i,
      onScrollButtonChange: h
    }), (w, C) => (A(), H("div", {
      ref_key: "contentWrapperElement",
      ref: c,
      style: yt({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: x.value
      })
    }, [V(s(de), Q({
      ref: s(d),
      style: {
        boxSizing: "border-box",
        maxHeight: "100%"
      }
    }, {
      ...w.$attrs,
      ...t
    }), {
      default: P(() => [F(w.$slots, "default")]),
      _: 3
    }, 16)], 4));
  }
}), Mf = If, Rf = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "SelectProvider",
  props: { context: {
    type: Object,
    required: !0
  } },
  setup(e) {
    return Na(e.context), Va(Ef), (t, r) => F(t.$slots, "default");
  }
}), Df = Rf;
const Lf = { key: 1 };
var $f = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "SelectContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    position: {
      type: String,
      required: !1
    },
    bodyLock: {
      type: Boolean,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(e, { emit: n }) {
    const t = e, o = cn(t, n), l = $t(), a = M();
    we(() => {
      a.value = new DocumentFragment();
    });
    const i = M(), u = k(() => t.forceMount || l.open.value), c = M(u.value);
    return pe(u, () => {
      setTimeout(() => c.value = u.value);
    }), (d, f) => {
      var p;
      return u.value || c.value || (p = i.value) != null && p.present ? (A(), q(s(fn), {
        key: 0,
        ref_key: "presenceRef",
        ref: i,
        present: u.value
      }, {
        default: P(() => [V(kf, Ie(Be({
          ...s(o),
          ...d.$attrs
        })), {
          default: P(() => [F(d.$slots, "default")]),
          _: 3
        }, 16)]),
        _: 3
      }, 8, ["present"])) : a.value ? (A(), H("div", Lf, [(A(), q(fr, { to: a.value }, [V(Df, { context: s(l) }, {
        default: P(() => [F(d.$slots, "default")]),
        _: 3
      }, 8, ["context"])], 8, ["to"]))])) : J("v-if", !0);
    };
  }
}), qf = $f;
const [za, Bf] = Oe("SelectItem");
var Ff = /* @__PURE__ */ N({
  __name: "SelectItem",
  props: {
    value: {
      type: null,
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["select"],
  setup(e, { emit: n }) {
    const t = e, r = n, { disabled: o } = $e(t), l = $t(), a = _o(), { forwardRef: i, currentElement: u } = se(), { CollectionItem: c } = it(), d = k(() => {
      var C;
      return Tn((C = l.modelValue) == null ? void 0 : C.value, t.value, l.by);
    }), f = M(!1), p = M(t.textValue ?? ""), v = Qe(void 0, "reka-select-item-text"), y = "select.select";
    async function m(C) {
      if (C.defaultPrevented)
        return;
      const g = {
        originalEvent: C,
        value: t.value
      };
      so(y, S, g);
    }
    async function S(C) {
      await ge(), r("select", C), !C.defaultPrevented && (o.value || (l.onValueChange(t.value), l.multiple.value || l.onOpenChange(!1)));
    }
    async function x(C) {
      var g, b;
      await ge(), !C.defaultPrevented && (o.value ? (g = a.onItemLeave) == null || g.call(a) : (b = C.currentTarget) == null || b.focus({ preventScroll: !0 }));
    }
    async function h(C) {
      var g;
      await ge(), !C.defaultPrevented && C.currentTarget === ze() && ((g = a.onItemLeave) == null || g.call(a));
    }
    async function w(C) {
      var b;
      await ge(), !(C.defaultPrevented || ((b = a.searchRef) == null ? void 0 : b.value) !== "" && C.key === " ") && (gf.includes(C.key) && m(C), C.key === " " && C.preventDefault());
    }
    if (t.value === "")
      throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
    return we(() => {
      u.value && a.itemRefCallback(u.value, t.value, t.disabled);
    }), Bf({
      value: t.value,
      disabled: o,
      textId: v,
      isSelected: d,
      onItemTextChange: (C) => {
        p.value = ((p.value || (C == null ? void 0 : C.textContent)) ?? "").trim();
      }
    }), (C, g) => (A(), q(s(c), { value: { textValue: p.value } }, {
      default: P(() => [V(s(de), {
        ref: s(i),
        role: "option",
        "aria-labelledby": s(v),
        "data-highlighted": f.value ? "" : void 0,
        "aria-selected": d.value,
        "data-state": d.value ? "checked" : "unchecked",
        "aria-disabled": s(o) || void 0,
        "data-disabled": s(o) ? "" : void 0,
        tabindex: s(o) ? void 0 : -1,
        as: C.as,
        "as-child": C.asChild,
        onFocus: g[0] || (g[0] = (b) => f.value = !0),
        onBlur: g[1] || (g[1] = (b) => f.value = !1),
        onPointerup: m,
        onPointerdown: g[2] || (g[2] = (b) => {
          b.currentTarget.focus({ preventScroll: !0 });
        }),
        onTouchend: g[3] || (g[3] = xe(() => {
        }, ["prevent", "stop"])),
        onPointermove: x,
        onPointerleave: h,
        onKeydown: w
      }, {
        default: P(() => [F(C.$slots, "default")]),
        _: 3
      }, 8, [
        "aria-labelledby",
        "data-highlighted",
        "aria-selected",
        "data-state",
        "aria-disabled",
        "data-disabled",
        "tabindex",
        "as",
        "as-child"
      ])]),
      _: 3
    }, 8, ["value"]));
  }
}), Nf = Ff, Vf = /* @__PURE__ */ N({
  __name: "SelectItemIndicator",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const n = e, t = za();
    return (r, o) => s(t).isSelected.value ? (A(), q(s(de), Q({
      key: 0,
      "aria-hidden": "true"
    }, n), {
      default: P(() => [F(r.$slots, "default")]),
      _: 3
    }, 16)) : J("v-if", !0);
  }
}), zf = Vf, Hf = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "SelectItemText",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const n = e, t = $t(), r = _o(), o = za(), { forwardRef: l, currentElement: a } = se(), i = k(() => {
      var u, c;
      return {
        value: o.value,
        disabled: o.disabled.value,
        textContent: ((u = a.value) == null ? void 0 : u.textContent) ?? ((c = o.value) == null ? void 0 : c.toString()) ?? ""
      };
    });
    return we(() => {
      a.value && (o.onItemTextChange(a.value), r.itemTextRefCallback(a.value, o.value, o.disabled.value), t.onOptionAdd(i.value));
    }), Ge(() => {
      t.onOptionRemove(i.value);
    }), (u, c) => (A(), q(s(de), Q({
      id: s(o).textId,
      ref: s(l)
    }, {
      ...n,
      ...u.$attrs
    }), {
      default: P(() => [F(u.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), Uf = Hf, Kf = /* @__PURE__ */ N({
  __name: "SelectPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const n = e;
    return (t, r) => (A(), q(s(fo), Ie(Be(n)), {
      default: P(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Wf = Kf, Gf = /* @__PURE__ */ N({
  __name: "SelectTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const n = e, t = $t(), { forwardRef: r, currentElement: o } = se(), l = k(() => {
      var p;
      return ((p = t.disabled) == null ? void 0 : p.value) || n.disabled;
    });
    t.contentId || (t.contentId = Qe(void 0, "reka-select-content")), we(() => {
      t.onTriggerChange(o.value);
    });
    const { getItems: a } = it(), { search: i, handleTypeaheadSearch: u, resetTypeahead: c } = Cr();
    function d() {
      l.value || (t.onOpenChange(!0), c());
    }
    function f(p) {
      d(), t.triggerPointerDownPosRef.value = {
        x: Math.round(p.pageX),
        y: Math.round(p.pageY)
      };
    }
    return (p, v) => (A(), q(s(yo), {
      "as-child": "",
      reference: p.reference
    }, {
      default: P(() => {
        var y, m, S, x;
        return [V(s(de), {
          ref: s(r),
          role: "combobox",
          type: p.as === "button" ? "button" : void 0,
          "aria-controls": s(t).contentId,
          "aria-expanded": s(t).open.value || !1,
          "aria-required": (y = s(t).required) == null ? void 0 : y.value,
          "aria-autocomplete": "none",
          disabled: l.value,
          dir: (m = s(t)) == null ? void 0 : m.dir.value,
          "data-state": (S = s(t)) != null && S.open.value ? "open" : "closed",
          "data-disabled": l.value ? "" : void 0,
          "data-placeholder": s(bf)((x = s(t).modelValue) == null ? void 0 : x.value) ? "" : void 0,
          "as-child": p.asChild,
          as: p.as,
          onClick: v[0] || (v[0] = (h) => {
            var w;
            (w = h == null ? void 0 : h.currentTarget) == null || w.focus();
          }),
          onPointerdown: v[1] || (v[1] = (h) => {
            if (h.pointerType === "touch")
              return h.preventDefault();
            const w = h.target;
            w.hasPointerCapture(h.pointerId) && w.releasePointerCapture(h.pointerId), h.button === 0 && h.ctrlKey === !1 && (f(h), h.preventDefault());
          }),
          onPointerup: v[2] || (v[2] = xe((h) => {
            h.pointerType === "touch" && f(h);
          }, ["prevent"])),
          onKeydown: v[3] || (v[3] = (h) => {
            const w = s(i) !== "";
            !(h.ctrlKey || h.altKey || h.metaKey) && h.key.length === 1 && w && h.key === " " || (s(u)(h.key, s(a)()), s(hf).includes(h.key) && (d(), h.preventDefault()));
          })
        }, {
          default: P(() => [F(p.$slots, "default")]),
          _: 3
        }, 8, [
          "type",
          "aria-controls",
          "aria-expanded",
          "aria-required",
          "disabled",
          "dir",
          "data-state",
          "data-disabled",
          "data-placeholder",
          "as-child",
          "as"
        ])];
      }),
      _: 3
    }, 8, ["reference"]));
  }
}), Yf = Gf, Xf = /* @__PURE__ */ N({
  __name: "SelectValue",
  props: {
    placeholder: {
      type: String,
      required: !1,
      default: ""
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const n = e, { forwardRef: t, currentElement: r } = se(), o = $t();
    we(() => {
      o.valueElement = r;
    });
    const l = k(() => {
      var d;
      let i = [];
      const u = Array.from(o.optionsSet.value), c = (f) => u.find((p) => Tn(f, p.value, o.by));
      return Array.isArray(o.modelValue.value) ? i = o.modelValue.value.map((f) => {
        var p;
        return ((p = c(f)) == null ? void 0 : p.textContent) ?? "";
      }) : i = [((d = c(o.modelValue.value)) == null ? void 0 : d.textContent) ?? ""], i.filter(Boolean);
    }), a = k(() => l.value.length ? l.value.join(", ") : n.placeholder);
    return (i, u) => (A(), q(s(de), {
      ref: s(t),
      as: i.as,
      "as-child": i.asChild,
      style: { pointerEvents: "none" },
      "data-placeholder": l.value.length ? void 0 : n.placeholder
    }, {
      default: P(() => [F(i.$slots, "default", {
        selectedLabel: l.value,
        modelValue: s(o).modelValue.value
      }, () => [_e(W(a.value), 1)])]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-placeholder"
    ]));
  }
}), Jf = Xf, Zf = /* @__PURE__ */ N({
  __name: "SelectViewport",
  props: {
    nonce: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e, { nonce: t } = $e(n), r = Ba(t), o = _o(), l = o.position === "item-aligned" ? jf() : void 0, { forwardRef: a, currentElement: i } = se();
    we(() => {
      o == null || o.onViewportChange(i.value);
    });
    const u = M(0);
    function c(d) {
      const f = d.currentTarget, { shouldExpandOnScrollRef: p, contentWrapper: v } = l ?? {};
      if (p != null && p.value && (v != null && v.value)) {
        const y = Math.abs(u.value - f.scrollTop);
        if (y > 0) {
          const m = window.innerHeight - tt * 2, S = Number.parseFloat(v.value.style.minHeight), x = Number.parseFloat(v.value.style.height), h = Math.max(S, x);
          if (h < m) {
            const w = h + y, C = Math.min(m, w), g = w - C;
            v.value.style.height = `${C}px`, v.value.style.bottom === "0px" && (f.scrollTop = g > 0 ? g : 0, v.value.style.justifyContent = "flex-end");
          }
        }
      }
      u.value = f.scrollTop;
    }
    return (d, f) => (A(), H(be, null, [V(s(de), Q({
      ref: s(a),
      "data-reka-select-viewport": "",
      role: "presentation"
    }, {
      ...d.$attrs,
      ...n
    }, {
      style: {
        position: "relative",
        flex: 1,
        overflow: "hidden auto"
      },
      onScroll: c
    }), {
      default: P(() => [F(d.$slots, "default")]),
      _: 3
    }, 16), V(s(de), {
      as: "style",
      nonce: s(r)
    }, {
      default: P(() => f[0] || (f[0] = [_e(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")])),
      _: 1,
      __: [0]
    }, 8, ["nonce"])], 64));
  }
}), Qf = Zf;
const [ep, tp] = Oe("SwitchRoot");
var np = /* @__PURE__ */ N({
  __name: "SwitchRoot",
  props: {
    defaultValue: {
      type: Boolean,
      required: !1
    },
    modelValue: {
      type: [Boolean, null],
      required: !1,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    id: {
      type: String,
      required: !1
    },
    value: {
      type: String,
      required: !1,
      default: "on"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, r = n, { disabled: o } = $e(t), l = /* @__PURE__ */ We(t, "modelValue", r, {
      defaultValue: t.defaultValue,
      passive: t.modelValue === void 0
    });
    function a() {
      o.value || (l.value = !l.value);
    }
    const { forwardRef: i, currentElement: u } = se(), c = _r(u), d = k(() => {
      var f;
      return t.id && u.value ? (f = document.querySelector(`[for="${t.id}"]`)) == null ? void 0 : f.innerText : void 0;
    });
    return tp({
      modelValue: l,
      toggleCheck: a,
      disabled: o
    }), (f, p) => (A(), q(s(de), Q(f.$attrs, {
      id: f.id,
      ref: s(i),
      role: "switch",
      type: f.as === "button" ? "button" : void 0,
      value: f.value,
      "aria-label": f.$attrs["aria-label"] || d.value,
      "aria-checked": s(l),
      "aria-required": f.required,
      "data-state": s(l) ? "checked" : "unchecked",
      "data-disabled": s(o) ? "" : void 0,
      "as-child": f.asChild,
      as: f.as,
      disabled: s(o),
      onClick: a,
      onKeydown: At(xe(a, ["prevent"]), ["enter"])
    }), {
      default: P(() => [F(f.$slots, "default", { modelValue: s(l) }), s(c) && f.name ? (A(), q(s(Oa), {
        key: 0,
        type: "checkbox",
        name: f.name,
        disabled: s(o),
        required: f.required,
        value: f.value,
        checked: !!s(l)
      }, null, 8, [
        "name",
        "disabled",
        "required",
        "value",
        "checked"
      ])) : J("v-if", !0)]),
      _: 3
    }, 16, [
      "id",
      "type",
      "value",
      "aria-label",
      "aria-checked",
      "aria-required",
      "data-state",
      "data-disabled",
      "as-child",
      "as",
      "disabled",
      "onKeydown"
    ]));
  }
}), op = np, rp = /* @__PURE__ */ N({
  __name: "SwitchThumb",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const n = ep();
    return se(), (t, r) => {
      var o;
      return A(), q(s(de), {
        "data-state": (o = s(n).modelValue) != null && o.value ? "checked" : "unchecked",
        "data-disabled": s(n).disabled.value ? "" : void 0,
        "as-child": t.asChild,
        as: t.as
      }, {
        default: P(() => [F(t.$slots, "default")]),
        _: 3
      }, 8, [
        "data-state",
        "data-disabled",
        "as-child",
        "as"
      ]);
    };
  }
}), lp = rp;
const [So, ap] = Oe("TabsRoot");
var ip = /* @__PURE__ */ N({
  __name: "TabsRoot",
  props: {
    defaultValue: {
      type: null,
      required: !1
    },
    orientation: {
      type: String,
      required: !1,
      default: "horizontal"
    },
    dir: {
      type: String,
      required: !1
    },
    activationMode: {
      type: String,
      required: !1,
      default: "automatic"
    },
    modelValue: {
      type: null,
      required: !1
    },
    unmountOnHide: {
      type: Boolean,
      required: !1,
      default: !0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, r = n, { orientation: o, unmountOnHide: l, dir: a } = $e(t), i = Mn(a);
    se();
    const u = /* @__PURE__ */ We(t, "modelValue", r, {
      defaultValue: t.defaultValue,
      passive: t.modelValue === void 0
    }), c = M(), d = Kt(/* @__PURE__ */ new Set());
    return ap({
      modelValue: u,
      changeModelValue: (f) => {
        u.value = f;
      },
      orientation: o,
      dir: i,
      unmountOnHide: l,
      activationMode: t.activationMode,
      baseId: Qe(void 0, "reka-tabs"),
      tabsList: c,
      contentIds: d,
      registerContent: (f) => {
        d.value = /* @__PURE__ */ new Set([...d.value, f]);
      },
      unregisterContent: (f) => {
        const p = new Set(d.value);
        p.delete(f), d.value = p;
      }
    }), (f, p) => (A(), q(s(de), {
      dir: s(i),
      "data-orientation": s(o),
      "as-child": f.asChild,
      as: f.as
    }, {
      default: P(() => [F(f.$slots, "default", { modelValue: s(u) })]),
      _: 3
    }, 8, [
      "dir",
      "data-orientation",
      "as-child",
      "as"
    ]));
  }
}), sp = ip;
function Ha(e, n) {
  return `${e}-trigger-${n}`;
}
function Ua(e, n) {
  return `${e}-content-${n}`;
}
var up = /* @__PURE__ */ N({
  __name: "TabsContent",
  props: {
    value: {
      type: [String, Number],
      required: !0
    },
    forceMount: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e, { forwardRef: t } = se(), r = So(), o = k(() => Ha(r.baseId, n.value)), l = k(() => Ua(r.baseId, n.value)), a = k(() => n.value === r.modelValue.value), i = M(a.value);
    return we(() => {
      r.registerContent(n.value), requestAnimationFrame(() => {
        i.value = !1;
      });
    }), Jl(() => {
      r.unregisterContent(n.value);
    }), (u, c) => (A(), q(s(fn), {
      present: u.forceMount || a.value,
      "force-mount": ""
    }, {
      default: P(({ present: d }) => [V(s(de), {
        id: l.value,
        ref: s(t),
        "as-child": u.asChild,
        as: u.as,
        role: "tabpanel",
        "data-state": a.value ? "active" : "inactive",
        "data-orientation": s(r).orientation.value,
        "aria-labelledby": o.value,
        hidden: !d,
        tabindex: "0",
        style: yt({ animationDuration: i.value ? "0s" : void 0 })
      }, {
        default: P(() => [!s(r).unmountOnHide.value || d ? F(u.$slots, "default", { key: 0 }) : J("v-if", !0)]),
        _: 2
      }, 1032, [
        "id",
        "as-child",
        "as",
        "data-state",
        "data-orientation",
        "aria-labelledby",
        "hidden",
        "style"
      ])]),
      _: 3
    }, 8, ["present"]));
  }
}), dp = up, cp = /* @__PURE__ */ N({
  __name: "TabsIndicator",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e, { expose: n }) {
    const t = e, r = So();
    n({ updateIndicatorStyle: a }), se();
    const o = M({
      size: null,
      position: null
    }), l = M([]);
    pe(() => [r.modelValue.value, r == null ? void 0 : r.dir.value], () => {
      a();
    }, {
      immediate: !0,
      flush: "post"
    }), pr(() => {
      var i;
      l.value = Array.from(((i = r.tabsList.value) == null ? void 0 : i.querySelectorAll('[role="tab"]')) || []);
    }), ba(k(() => [r.tabsList.value, ...l.value]), a);
    function a() {
      var u;
      const i = (u = r.tabsList.value) == null ? void 0 : u.querySelector('[role="tab"][data-state="active"]');
      i && (r.orientation.value === "horizontal" ? o.value = {
        size: i.offsetWidth,
        position: i.offsetLeft
      } : o.value = {
        size: i.offsetHeight,
        position: i.offsetTop
      });
    }
    return (i, u) => typeof o.value.size == "number" ? (A(), q(s(de), Q({ key: 0 }, t, { style: {
      "--reka-tabs-indicator-size": `${o.value.size}px`,
      "--reka-tabs-indicator-position": `${o.value.position}px`
    } }), {
      default: P(() => [F(i.$slots, "default")]),
      _: 3
    }, 16, ["style"])) : J("v-if", !0);
  }
}), fp = cp, pp = /* @__PURE__ */ N({
  __name: "TabsList",
  props: {
    loop: {
      type: Boolean,
      required: !1,
      default: !0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e, { loop: t } = $e(n), { forwardRef: r, currentElement: o } = se(), l = So();
    return l.tabsList = o, (a, i) => (A(), q(s(Fu), {
      "as-child": "",
      orientation: s(l).orientation.value,
      dir: s(l).dir.value,
      loop: s(t)
    }, {
      default: P(() => [V(s(de), {
        ref: s(r),
        role: "tablist",
        "as-child": a.asChild,
        as: a.as,
        "aria-orientation": s(l).orientation.value
      }, {
        default: P(() => [F(a.$slots, "default")]),
        _: 3
      }, 8, [
        "as-child",
        "as",
        "aria-orientation"
      ])]),
      _: 3
    }, 8, [
      "orientation",
      "dir",
      "loop"
    ]));
  }
}), vp = pp, yp = /* @__PURE__ */ N({
  __name: "TabsTrigger",
  props: {
    value: {
      type: [String, Number],
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const n = e, { forwardRef: t } = se(), r = So(), o = k(() => Ha(r.baseId, n.value)), l = k(() => r.contentIds.value.has(n.value) ? Ua(r.baseId, n.value) : void 0), a = k(() => n.value === r.modelValue.value);
    return (i, u) => (A(), q(s(Vu), {
      "as-child": "",
      focusable: !i.disabled,
      active: a.value
    }, {
      default: P(() => [V(s(de), {
        id: o.value,
        ref: s(t),
        role: "tab",
        type: i.as === "button" ? "button" : void 0,
        as: i.as,
        "as-child": i.asChild,
        "aria-selected": a.value ? "true" : "false",
        "aria-controls": l.value,
        "data-state": a.value ? "active" : "inactive",
        disabled: i.disabled,
        "data-disabled": i.disabled ? "" : void 0,
        "data-orientation": s(r).orientation.value,
        onMousedown: u[0] || (u[0] = xe((c) => {
          !i.disabled && c.ctrlKey === !1 ? s(r).changeModelValue(i.value) : c.preventDefault();
        }, ["left"])),
        onKeydown: u[1] || (u[1] = At((c) => s(r).changeModelValue(i.value), ["enter", "space"])),
        onFocus: u[2] || (u[2] = () => {
          const c = s(r).activationMode !== "manual";
          !a.value && !i.disabled && c && s(r).changeModelValue(i.value);
        })
      }, {
        default: P(() => [F(i.$slots, "default")]),
        _: 3
      }, 8, [
        "id",
        "type",
        "as",
        "as-child",
        "aria-selected",
        "aria-controls",
        "data-state",
        "disabled",
        "data-disabled",
        "data-orientation"
      ])]),
      _: 3
    }, 8, ["focusable", "active"]));
  }
}), mp = yp, hp = /* @__PURE__ */ N({
  __name: "ToastAnnounceExclude",
  props: {
    altText: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    return (n, t) => (A(), q(s(de), {
      as: n.as,
      "as-child": n.asChild,
      "data-reka-toast-announce-exclude": "",
      "data-reka-toast-announce-alt": n.altText || void 0
    }, {
      default: P(() => [F(n.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-reka-toast-announce-alt"
    ]));
  }
}), Ka = hp;
const [Wa, $m] = Oe("ToastProvider");
var gp = /* @__PURE__ */ N({
  __name: "ToastAnnounce",
  setup(e) {
    const n = Wa(), t = zs(1e3), r = M(!1);
    return ga(() => {
      r.value = !0;
    }), (o, l) => s(t) || r.value ? (A(), q(s(po), { key: 0 }, {
      default: P(() => [_e(W(s(n).label.value) + " ", 1), F(o.$slots, "default")]),
      _: 3
    })) : J("v-if", !0);
  }
}), bp = gp;
const xp = "toast.swipeStart", wp = "toast.swipeMove", _p = "toast.swipeCancel", Sp = "toast.swipeEnd", Dl = "toast.viewportPause", Ll = "toast.viewportResume";
function Gn(e, n, t) {
  const r = t.originalEvent.currentTarget, o = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: t
  });
  n && r.addEventListener(e, n, { once: !0 }), r.dispatchEvent(o);
}
function $l(e, n, t = 0) {
  const r = Math.abs(e.x), o = Math.abs(e.y), l = r > o;
  return n === "left" || n === "right" ? l && r > t : !l && o > t;
}
function Cp(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function Ga(e) {
  const n = [];
  return Array.from(e.childNodes).forEach((r) => {
    if (r.nodeType === r.TEXT_NODE && r.textContent && n.push(r.textContent), Cp(r)) {
      const o = r.ariaHidden || r.hidden || r.style.display === "none", l = r.dataset.rekaToastAnnounceExclude === "";
      if (!o)
        if (l) {
          const a = r.dataset.rekaToastAnnounceAlt;
          a && n.push(a);
        } else
          n.push(...Ga(r));
    }
  }), n;
}
const [Ap, Op] = Oe("ToastRoot");
var Ep = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "ToastRootImpl",
  props: {
    type: {
      type: String,
      required: !1
    },
    open: {
      type: Boolean,
      required: !1,
      default: !1
    },
    duration: {
      type: Number,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "li"
    }
  },
  emits: [
    "close",
    "escapeKeyDown",
    "pause",
    "resume",
    "swipeStart",
    "swipeMove",
    "swipeCancel",
    "swipeEnd"
  ],
  setup(e, { emit: n }) {
    const t = e, r = n, { forwardRef: o, currentElement: l } = se(), { CollectionItem: a } = it(), i = Wa(), u = M(null), c = M(null), d = k(() => typeof t.duration == "number" ? t.duration : i.duration.value), f = M(0), p = M(d.value), v = M(0), y = M(d.value), m = ga(() => {
      const w = (/* @__PURE__ */ new Date()).getTime() - f.value;
      y.value = Math.max(p.value - w, 0);
    }, { fpsLimit: 60 });
    function S(w) {
      w <= 0 || w === Number.POSITIVE_INFINITY || at && (window.clearTimeout(v.value), f.value = (/* @__PURE__ */ new Date()).getTime(), v.value = window.setTimeout(x, w));
    }
    function x(w) {
      var b, O;
      const C = (w == null ? void 0 : w.pointerType) === "";
      ((b = l.value) == null ? void 0 : b.contains(ze())) && C && ((O = i.viewport.value) == null || O.focus()), C && (i.isClosePausedRef.value = !1), r("close");
    }
    const h = k(() => l.value ? Ga(l.value) : null);
    if (t.type && !["foreground", "background"].includes(t.type)) {
      const w = "Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.";
      throw new Error(w);
    }
    return Ae((w) => {
      const C = i.viewport.value;
      if (C) {
        const g = () => {
          S(p.value), m.resume(), r("resume");
        }, b = () => {
          const O = (/* @__PURE__ */ new Date()).getTime() - f.value;
          p.value = p.value - O, window.clearTimeout(v.value), m.pause(), r("pause");
        };
        return C.addEventListener(Dl, b), C.addEventListener(Ll, g), () => {
          C.removeEventListener(Dl, b), C.removeEventListener(Ll, g);
        };
      }
    }), pe(() => [t.open, d.value], () => {
      p.value = d.value, t.open && !i.isClosePausedRef.value && S(d.value);
    }, { immediate: !0 }), ha("Escape", (w) => {
      r("escapeKeyDown", w), w.defaultPrevented || (i.isFocusedToastEscapeKeyDownRef.value = !0, x());
    }), we(() => {
      i.onToastAdd();
    }), Ge(() => {
      i.onToastRemove();
    }), Op({ onClose: x }), (w, C) => (A(), H(be, null, [h.value ? (A(), q(bp, {
      key: 0,
      role: "alert",
      "aria-live": w.type === "foreground" ? "assertive" : "polite",
      "aria-atomic": "true"
    }, {
      default: P(() => [_e(W(h.value), 1)]),
      _: 1
    }, 8, ["aria-live"])) : J("v-if", !0), s(i).viewport.value ? (A(), q(fr, {
      key: 1,
      to: s(i).viewport.value
    }, [V(s(a), null, {
      default: P(() => [V(s(de), Q({
        ref: s(o),
        role: "alert",
        "aria-live": "off",
        "aria-atomic": "true",
        tabindex: "0"
      }, w.$attrs, {
        as: w.as,
        "as-child": w.asChild,
        "data-state": w.open ? "open" : "closed",
        "data-swipe-direction": s(i).swipeDirection.value,
        style: s(i).disableSwipe.value ? void 0 : {
          userSelect: "none",
          touchAction: "none"
        },
        onPointerdown: C[0] || (C[0] = xe((g) => {
          s(i).disableSwipe.value || (u.value = {
            x: g.clientX,
            y: g.clientY
          });
        }, ["left"])),
        onPointermove: C[1] || (C[1] = (g) => {
          if (s(i).disableSwipe.value || !u.value)
            return;
          const b = g.clientX - u.value.x, O = g.clientY - u.value.y, T = !!c.value, _ = ["left", "right"].includes(s(i).swipeDirection.value), j = ["left", "up"].includes(s(i).swipeDirection.value) ? Math.min : Math.max, $ = _ ? j(0, b) : 0, R = _ ? 0 : j(0, O), B = g.pointerType === "touch" ? 10 : 2, z = {
            x: $,
            y: R
          }, U = {
            originalEvent: g,
            delta: z
          };
          T ? (c.value = z, s(Gn)(s(wp), (oe) => r("swipeMove", oe), U)) : s($l)(z, s(i).swipeDirection.value, B) ? (c.value = z, s(Gn)(s(xp), (oe) => r("swipeStart", oe), U), g.target.setPointerCapture(g.pointerId)) : (Math.abs(b) > B || Math.abs(O) > B) && (u.value = null);
        }),
        onPointerup: C[2] || (C[2] = (g) => {
          if (s(i).disableSwipe.value)
            return;
          const b = c.value, O = g.target;
          if (O.hasPointerCapture(g.pointerId) && O.releasePointerCapture(g.pointerId), c.value = null, u.value = null, b) {
            const T = g.currentTarget, _ = {
              originalEvent: g,
              delta: b
            };
            s($l)(b, s(i).swipeDirection.value, s(i).swipeThreshold.value) ? s(Gn)(s(Sp), (j) => r("swipeEnd", j), _) : s(Gn)(s(_p), (j) => r("swipeCancel", j), _), T == null || T.addEventListener("click", (j) => j.preventDefault(), { once: !0 });
          }
        })
      }), {
        default: P(() => [F(w.$slots, "default", {
          remaining: y.value,
          duration: d.value
        })]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "data-state",
        "data-swipe-direction",
        "style"
      ])]),
      _: 3
    })], 8, ["to"])) : J("v-if", !0)], 64));
  }
}), Tp = Ep, kp = /* @__PURE__ */ N({
  __name: "ToastClose",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const n = e, t = Ap(), { forwardRef: r } = se();
    return (o, l) => (A(), q(Ka, { "as-child": "" }, {
      default: P(() => [V(s(de), Q(n, {
        ref: s(r),
        type: o.as === "button" ? "button" : void 0,
        onClick: s(t).onClose
      }), {
        default: P(() => [F(o.$slots, "default")]),
        _: 3
      }, 16, ["type", "onClick"])]),
      _: 3
    }));
  }
}), Ya = kp, jp = /* @__PURE__ */ N({
  __name: "ToastAction",
  props: {
    altText: {
      type: String,
      required: !0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    if (!e.altText)
      throw new Error("Missing prop `altText` expected on `ToastAction`");
    const { forwardRef: t } = se();
    return (r, o) => r.altText ? (A(), q(Ka, {
      key: 0,
      "alt-text": r.altText,
      "as-child": ""
    }, {
      default: P(() => [V(Ya, {
        ref: s(t),
        as: r.as,
        "as-child": r.asChild
      }, {
        default: P(() => [F(r.$slots, "default")]),
        _: 3
      }, 8, ["as", "as-child"])]),
      _: 3
    }, 8, ["alt-text"])) : J("v-if", !0);
  }
}), Pp = jp, Ip = /* @__PURE__ */ N({
  __name: "ToastDescription",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e;
    return se(), (t, r) => (A(), q(s(de), Ie(Be(n)), {
      default: P(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Mp = Ip, Rp = /* @__PURE__ */ N({
  __name: "ToastRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !0
    },
    forceMount: {
      type: Boolean,
      required: !1
    },
    type: {
      type: String,
      required: !1,
      default: "foreground"
    },
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    duration: {
      type: Number,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "li"
    }
  },
  emits: [
    "escapeKeyDown",
    "pause",
    "resume",
    "swipeStart",
    "swipeMove",
    "swipeCancel",
    "swipeEnd",
    "update:open"
  ],
  setup(e, { emit: n }) {
    const t = e, r = n, { forwardRef: o } = se(), l = /* @__PURE__ */ We(t, "open", r, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    });
    return (a, i) => (A(), q(s(fn), { present: a.forceMount || s(l) }, {
      default: P(() => [V(Tp, Q({
        ref: s(o),
        open: s(l),
        type: a.type,
        as: a.as,
        "as-child": a.asChild,
        duration: a.duration
      }, a.$attrs, {
        onClose: i[0] || (i[0] = (u) => l.value = !1),
        onPause: i[1] || (i[1] = (u) => r("pause")),
        onResume: i[2] || (i[2] = (u) => r("resume")),
        onEscapeKeyDown: i[3] || (i[3] = (u) => r("escapeKeyDown", u)),
        onSwipeStart: i[4] || (i[4] = (u) => {
          r("swipeStart", u), u.defaultPrevented || u.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: i[5] || (i[5] = (u) => {
          if (r("swipeMove", u), !u.defaultPrevented) {
            const { x: c, y: d } = u.detail.delta, f = u.currentTarget;
            f.setAttribute("data-swipe", "move"), f.style.setProperty("--reka-toast-swipe-move-x", `${c}px`), f.style.setProperty("--reka-toast-swipe-move-y", `${d}px`);
          }
        }),
        onSwipeCancel: i[6] || (i[6] = (u) => {
          if (r("swipeCancel", u), !u.defaultPrevented) {
            const c = u.currentTarget;
            c.setAttribute("data-swipe", "cancel"), c.style.removeProperty("--reka-toast-swipe-move-x"), c.style.removeProperty("--reka-toast-swipe-move-y"), c.style.removeProperty("--reka-toast-swipe-end-x"), c.style.removeProperty("--reka-toast-swipe-end-y");
          }
        }),
        onSwipeEnd: i[7] || (i[7] = (u) => {
          if (r("swipeEnd", u), !u.defaultPrevented) {
            const { x: c, y: d } = u.detail.delta, f = u.currentTarget;
            f.setAttribute("data-swipe", "end"), f.style.removeProperty("--reka-toast-swipe-move-x"), f.style.removeProperty("--reka-toast-swipe-move-y"), f.style.setProperty("--reka-toast-swipe-end-x", `${c}px`), f.style.setProperty("--reka-toast-swipe-end-y", `${d}px`), l.value = !1;
          }
        })
      }), {
        default: P(({ remaining: u, duration: c }) => [F(a.$slots, "default", {
          remaining: u,
          duration: c,
          open: s(l)
        })]),
        _: 3
      }, 16, [
        "open",
        "type",
        "as",
        "as-child",
        "duration"
      ])]),
      _: 3
    }, 8, ["present"]));
  }
}), Dp = Rp, Lp = /* @__PURE__ */ N({
  __name: "TooltipArrow",
  props: {
    width: {
      type: Number,
      required: !1,
      default: 10
    },
    height: {
      type: Number,
      required: !1,
      default: 5
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "svg"
    }
  },
  setup(e) {
    const n = e;
    return se(), (t, r) => (A(), q(s(dc), Ie(Be(n)), {
      default: P(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), $p = Lp;
const [Mr, qp] = Oe("TooltipProvider");
var Bp = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "TooltipProvider",
  props: {
    delayDuration: {
      type: Number,
      required: !1,
      default: 700
    },
    skipDelayDuration: {
      type: Number,
      required: !1,
      default: 300
    },
    disableHoverableContent: {
      type: Boolean,
      required: !1,
      default: !1
    },
    disableClosingTrigger: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    ignoreNonKeyboardFocus: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    const n = e, { delayDuration: t, skipDelayDuration: r, disableHoverableContent: o, disableClosingTrigger: l, ignoreNonKeyboardFocus: a, disabled: i } = $e(n);
    se();
    const u = M(!0), c = M(!1), { start: d, stop: f } = br(() => {
      u.value = !0;
    }, r, { immediate: !1 });
    return qp({
      isOpenDelayed: u,
      delayDuration: t,
      onOpen() {
        f(), u.value = !1;
      },
      onClose() {
        d();
      },
      isPointerInTransitRef: c,
      disableHoverableContent: o,
      disableClosingTrigger: l,
      disabled: i,
      ignoreNonKeyboardFocus: a
    }), (p, v) => F(p.$slots, "default");
  }
}), Fp = Bp;
const Xa = "tooltip.open", [Co, Np] = Oe("TooltipRoot");
var Vp = /* @__PURE__ */ N({
  __name: "TooltipRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !1
    },
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    delayDuration: {
      type: Number,
      required: !1,
      default: void 0
    },
    disableHoverableContent: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    disableClosingTrigger: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    ignoreNonKeyboardFocus: {
      type: Boolean,
      required: !1,
      default: void 0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: n }) {
    const t = e, r = n;
    se();
    const o = Mr(), l = k(() => t.disableHoverableContent ?? o.disableHoverableContent.value), a = k(() => t.disableClosingTrigger ?? o.disableClosingTrigger.value), i = k(() => t.disabled ?? o.disabled.value), u = k(() => t.delayDuration ?? o.delayDuration.value), c = k(() => t.ignoreNonKeyboardFocus ?? o.ignoreNonKeyboardFocus.value), d = /* @__PURE__ */ We(t, "open", r, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    });
    pe(d, (w) => {
      o.onClose && (w ? (o.onOpen(), document.dispatchEvent(new CustomEvent(Xa))) : o.onClose());
    });
    const f = M(!1), p = M(), v = k(() => d.value ? f.value ? "delayed-open" : "instant-open" : "closed"), { start: y, stop: m } = br(() => {
      f.value = !0, d.value = !0;
    }, u, { immediate: !1 });
    function S() {
      m(), f.value = !1, d.value = !0;
    }
    function x() {
      m(), d.value = !1;
    }
    function h() {
      y();
    }
    return Np({
      contentId: "",
      open: d,
      stateAttribute: v,
      trigger: p,
      onTriggerChange(w) {
        p.value = w;
      },
      onTriggerEnter() {
        o.isOpenDelayed.value ? h() : S();
      },
      onTriggerLeave() {
        l.value ? x() : m();
      },
      onOpen: S,
      onClose: x,
      disableHoverableContent: l,
      disableClosingTrigger: a,
      disabled: i,
      ignoreNonKeyboardFocus: c
    }), (w, C) => (A(), q(s(vo), null, {
      default: P(() => [F(w.$slots, "default", { open: s(d) })]),
      _: 3
    }));
  }
}), zp = Vp, Hp = /* @__PURE__ */ N({
  __name: "TooltipContentImpl",
  props: {
    ariaLabel: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    side: {
      type: null,
      required: !1,
      default: "top"
    },
    sideOffset: {
      type: Number,
      required: !1,
      default: 0
    },
    align: {
      type: null,
      required: !1,
      default: "center"
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1,
      default: !0
    },
    collisionBoundary: {
      type: null,
      required: !1,
      default: () => []
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1,
      default: 0
    },
    arrowPadding: {
      type: Number,
      required: !1,
      default: 0
    },
    sticky: {
      type: String,
      required: !1,
      default: "partial"
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1,
      default: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    }
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: n }) {
    const t = e, r = n, o = Co(), { forwardRef: l, currentElement: a } = se(), i = k(() => {
      var c;
      return t.ariaLabel || ((c = a.value) == null ? void 0 : c.textContent);
    }), u = k(() => {
      const { ariaLabel: c, ...d } = t;
      return d;
    });
    return we(() => {
      no(window, "scroll", (c) => {
        const d = c.target;
        d != null && d.contains(o.trigger.value) && o.onClose();
      }), no(window, Xa, o.onClose);
    }), (c, d) => (A(), q(s(co), {
      "as-child": "",
      "disable-outside-pointer-events": !1,
      onEscapeKeyDown: d[0] || (d[0] = (f) => r("escapeKeyDown", f)),
      onPointerDownOutside: d[1] || (d[1] = (f) => {
        var p;
        s(o).disableClosingTrigger.value && ((p = s(o).trigger.value) != null && p.contains(f.target)) && f.preventDefault(), r("pointerDownOutside", f);
      }),
      onFocusOutside: d[2] || (d[2] = xe(() => {
      }, ["prevent"])),
      onDismiss: d[3] || (d[3] = (f) => s(o).onClose())
    }, {
      default: P(() => [V(s(xo), Q({
        ref: s(l),
        "data-state": s(o).stateAttribute.value
      }, {
        ...c.$attrs,
        ...u.value
      }, { style: {
        "--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
        "--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
        "--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: P(() => [F(c.$slots, "default"), V(s(po), {
          id: s(o).contentId,
          role: "tooltip"
        }, {
          default: P(() => [_e(W(i.value), 1)]),
          _: 1
        }, 8, ["id"])]),
        _: 3
      }, 16, ["data-state"])]),
      _: 3
    }));
  }
}), Ja = Hp, Up = /* @__PURE__ */ N({
  __name: "TooltipContentHoverable",
  props: {
    ariaLabel: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    }
  },
  setup(e) {
    const t = dn(e), { forwardRef: r, currentElement: o } = se(), { trigger: l, onClose: a } = Co(), i = Mr(), { isPointerInTransit: u, onPointerExit: c } = eu(l, o);
    return i.isPointerInTransitRef = u, c(() => {
      a();
    }), (d, f) => (A(), q(Ja, Q({ ref: s(r) }, s(t)), {
      default: P(() => [F(d.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Kp = Up, Wp = /* @__PURE__ */ N({
  __name: "TooltipContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    ariaLabel: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    side: {
      type: null,
      required: !1,
      default: "top"
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    }
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: n }) {
    const t = e, r = n, o = Co(), l = cn(t, r), { forwardRef: a } = se();
    return (i, u) => (A(), q(s(fn), { present: i.forceMount || s(o).open.value }, {
      default: P(() => [(A(), q(Je(s(o).disableHoverableContent.value ? Ja : Kp), Q({ ref: s(a) }, s(l)), {
        default: P(() => [F(i.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), Gp = Wp, Yp = /* @__PURE__ */ N({
  __name: "TooltipPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const n = e;
    return (t, r) => (A(), q(s(fo), Ie(Be(n)), {
      default: P(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Xp = Yp, Jp = /* @__PURE__ */ N({
  __name: "TooltipTrigger",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const n = e, t = Co(), r = Mr();
    t.contentId || (t.contentId = Qe(void 0, "reka-tooltip-content"));
    const { forwardRef: o, currentElement: l } = se(), a = M(!1), i = M(!1), u = k(() => t.disabled.value ? {} : {
      click: m,
      focus: v,
      pointermove: f,
      pointerleave: p,
      pointerdown: d,
      blur: y
    });
    we(() => {
      t.onTriggerChange(l.value);
    });
    function c() {
      setTimeout(() => {
        a.value = !1;
      }, 1);
    }
    function d() {
      t.open && !t.disableClosingTrigger.value && t.onClose(), a.value = !0, document.addEventListener("pointerup", c, { once: !0 });
    }
    function f(S) {
      S.pointerType !== "touch" && !i.value && !r.isPointerInTransitRef.value && (t.onTriggerEnter(), i.value = !0);
    }
    function p() {
      t.onTriggerLeave(), i.value = !1;
    }
    function v(S) {
      var x, h;
      a.value || t.ignoreNonKeyboardFocus.value && !((h = (x = S.target).matches) != null && h.call(x, ":focus-visible")) || t.onOpen();
    }
    function y() {
      t.onClose();
    }
    function m() {
      t.disableClosingTrigger.value || t.onClose();
    }
    return (S, x) => (A(), q(s(yo), {
      "as-child": "",
      reference: S.reference
    }, {
      default: P(() => [V(s(de), Q({
        ref: s(o),
        "aria-describedby": s(t).open.value ? s(t).contentId : void 0,
        "data-state": s(t).stateAttribute.value,
        as: S.as,
        "as-child": n.asChild,
        "data-grace-area-trigger": ""
      }, _i(u.value)), {
        default: P(() => [F(S.$slots, "default")]),
        _: 3
      }, 16, [
        "aria-describedby",
        "data-state",
        "as",
        "as-child"
      ])]),
      _: 3
    }, 8, ["reference"]));
  }
}), Zp = Jp;
const Qp = { class: "rounded-lg border bg-surface-modal shadow-xl" }, e1 = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "Popover",
  props: {
    show: { type: Boolean, default: void 0 },
    trigger: { default: "click" },
    hoverDelay: { default: 0 },
    leaveDelay: { default: 0.5 },
    placement: { default: "bottom-start" },
    popoverClass: { default: "" },
    transition: { default: null },
    hideOnBlur: { type: Boolean, default: !0 },
    matchTargetWidth: { type: Boolean },
    offset: {}
  },
  emits: ["open", "close", "update:show"],
  setup(e, { expose: n, emit: t }) {
    const r = e, o = t;
    n({ open: S, close: x });
    const l = M(!1), a = M(!1), i = M(null), u = M(null), c = M(null), d = k({
      get: () => f.value ? r.show : l.value,
      set: (O) => {
        f.value || O !== l.value && (l.value = O, h(O));
      }
    }), f = k(() => r.show !== void 0), p = k(() => {
      const [O] = r.placement.split("-");
      return O;
    }), v = k(() => {
      const [, O] = r.placement.split("-");
      return O || "center";
    });
    function y(O) {
      O instanceof Event && (O = void 0), O == null && (O = !d.value), O = !!O, O ? S() : x();
    }
    function m() {
    }
    function S() {
      d.value = !0;
    }
    function x() {
      d.value = !1;
    }
    function h(O) {
      o("update:show", O), o(O ? "open" : "close");
    }
    function w() {
      a.value = !0, u.value && (clearTimeout(u.value), u.value = null), r.trigger === "hover" && (r.hoverDelay ? i.value = setTimeout(
        () => {
          a.value && S();
        },
        Number(r.hoverDelay) * 1e3
      ) : S());
    }
    function C() {
      a.value = !1, i.value && (clearTimeout(i.value), i.value = null), r.trigger === "hover" && (u.value && clearTimeout(u.value), r.leaveDelay ? u.value = setTimeout(
        () => {
          a.value || x();
        },
        Number(r.leaveDelay) * 1e3
      ) : a.value || x());
    }
    function g(O) {
      if (!r.hideOnBlur) {
        O.preventDefault();
        return;
      }
      const T = O.target;
      if (c.value && (c.value.contains(T) || c.value === T)) {
        O.preventDefault();
        return;
      }
    }
    const b = k(() => r.transition === "default");
    return Ge(() => {
      i.value && clearTimeout(i.value), u.value && clearTimeout(u.value);
    }), (O, T) => (A(), q(s(rf), {
      open: d.value,
      "onUpdate:open": [
        T[1] || (T[1] = (_) => d.value = _),
        h
      ]
    }, {
      default: P(() => [
        V(s(af), { asChild: "" }, {
          default: P(() => [
            I("div", {
              ref_key: "anchorRef",
              ref: c,
              class: le(["flex", O.$attrs.class]),
              style: yt(O.$attrs.style),
              onMouseover: w,
              onMouseleave: C
            }, [
              F(O.$slots, "target", Ie(Be({
                togglePopover: y,
                updatePosition: m,
                open: S,
                close: x,
                isOpen: d.value
              })))
            ], 38)
          ]),
          _: 3
        }),
        V(s(mf), null, {
          default: P(() => [
            V(s(vf), {
              side: p.value,
              align: v.value,
              sideOffset: e.offset,
              style: yt({
                minWidth: e.matchTargetWidth ? "var(--reka-popover-trigger-width)" : void 0
              }),
              class: le(["PopoverContent", { "has-transition": b.value }]),
              onMouseover: T[0] || (T[0] = () => {
                a.value = !0;
              }),
              onMouseleave: C,
              onInteractOutside: g
            }, {
              default: P(() => [
                I("div", {
                  class: le(["relative", ["body-container", e.popoverClass]])
                }, [
                  F(O.$slots, "body", Ie(Be({ togglePopover: y, updatePosition: m, open: S, close: x, isOpen: d.value })), () => [
                    I("div", Qp, [
                      F(O.$slots, "body-main", Ie(Be({
                        togglePopover: y,
                        updatePosition: m,
                        open: S,
                        close: x,
                        isOpen: d.value
                      })))
                    ])
                  ])
                ], 2)
              ]),
              _: 3
            }, 8, ["side", "align", "sideOffset", "style", "class"])
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["open"]));
  }
});
var t1 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function n1(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Za = { exports: {} };
(function(e, n) {
  (function(r, o) {
    e.exports = o();
  })(typeof self < "u" ? self : t1, function() {
    return (
      /******/
      function(t) {
        var r = {};
        function o(l) {
          if (r[l])
            return r[l].exports;
          var a = r[l] = {
            /******/
            i: l,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return t[l].call(a.exports, a, a.exports, o), a.l = !0, a.exports;
        }
        return o.m = t, o.c = r, o.d = function(l, a, i) {
          o.o(l, a) || Object.defineProperty(l, a, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: i
            /******/
          });
        }, o.r = function(l) {
          Object.defineProperty(l, "__esModule", { value: !0 });
        }, o.n = function(l) {
          var a = l && l.__esModule ? (
            /******/
            function() {
              return l.default;
            }
          ) : (
            /******/
            function() {
              return l;
            }
          );
          return o.d(a, "a", a), a;
        }, o.o = function(l, a) {
          return Object.prototype.hasOwnProperty.call(l, a);
        }, o.p = "", o(o.s = 0);
      }({
        /***/
        "./dist/icons.json": (
          /*!*************************!*\
            !*** ./dist/icons.json ***!
            \*************************/
          /*! exports provided: activity, airplay, alert-circle, alert-octagon, alert-triangle, align-center, align-justify, align-left, align-right, anchor, aperture, archive, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, award, bar-chart-2, bar-chart, battery-charging, battery, bell-off, bell, bluetooth, bold, book-open, book, bookmark, box, briefcase, calendar, camera-off, camera, cast, check-circle, check-square, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, chrome, circle, clipboard, clock, cloud-drizzle, cloud-lightning, cloud-off, cloud-rain, cloud-snow, cloud, code, codepen, codesandbox, coffee, columns, command, compass, copy, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, cpu, credit-card, crop, crosshair, database, delete, disc, divide-circle, divide-square, divide, dollar-sign, download-cloud, download, dribbble, droplet, edit-2, edit-3, edit, external-link, eye-off, eye, facebook, fast-forward, feather, figma, file-minus, file-plus, file-text, file, film, filter, flag, folder-minus, folder-plus, folder, framer, frown, gift, git-branch, git-commit, git-merge, git-pull-request, github, gitlab, globe, grid, hard-drive, hash, headphones, heart, help-circle, hexagon, home, image, inbox, info, instagram, italic, key, layers, layout, life-buoy, link-2, link, linkedin, list, loader, lock, log-in, log-out, mail, map-pin, map, maximize-2, maximize, meh, menu, message-circle, message-square, mic-off, mic, minimize-2, minimize, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, mouse-pointer, move, music, navigation-2, navigation, octagon, package, paperclip, pause-circle, pause, pen-tool, percent, phone-call, phone-forwarded, phone-incoming, phone-missed, phone-off, phone-outgoing, phone, pie-chart, play-circle, play, plus-circle, plus-square, plus, pocket, power, printer, radio, refresh-ccw, refresh-cw, repeat, rewind, rotate-ccw, rotate-cw, rss, save, scissors, search, send, server, settings, share-2, share, shield-off, shield, shopping-bag, shopping-cart, shuffle, sidebar, skip-back, skip-forward, slack, slash, sliders, smartphone, smile, speaker, square, star, stop-circle, sun, sunrise, sunset, table, tablet, tag, target, terminal, thermometer, thumbs-down, thumbs-up, toggle-left, toggle-right, tool, trash-2, trash, trello, trending-down, trending-up, triangle, truck, tv, twitch, twitter, type, umbrella, underline, unlock, upload-cloud, upload, user-check, user-minus, user-plus, user-x, user, users, video-off, video, voicemail, volume-1, volume-2, volume-x, volume, watch, wifi-off, wifi, wind, x-circle, x-octagon, x-square, x, youtube, zap-off, zap, zoom-in, zoom-out, default */
          /***/
          function(t) {
            t.exports = { activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>', airplay: '<path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon>', "alert-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>', "alert-octagon": '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>', "alert-triangle": '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>', "align-center": '<line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line>', "align-justify": '<line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>', "align-left": '<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>', "align-right": '<line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line>', anchor: '<circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>', aperture: '<circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>', archive: '<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>', "arrow-down-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line>', "arrow-down-left": '<line x1="17" y1="7" x2="7" y2="17"></line><polyline points="17 17 7 17 7 7"></polyline>', "arrow-down-right": '<line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline>', "arrow-down": '<line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>', "arrow-left-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line>', "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>', "arrow-right-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line>', "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>', "arrow-up-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line>', "arrow-up-left": '<line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline>', "arrow-up-right": '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>', "arrow-up": '<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>', "at-sign": '<circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>', award: '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>', "bar-chart-2": '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>', "bar-chart": '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>', "battery-charging": '<path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline>', battery: '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line>', "bell-off": '<path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line>', bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>', bluetooth: '<polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>', bold: '<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>', "book-open": '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>', book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>', bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>', box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>', briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>', calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>', "camera-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path>', camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>', cast: '<path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2.01" y2="20"></line>', "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>', "check-square": '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>', check: '<polyline points="20 6 9 17 4 12"></polyline>', "chevron-down": '<polyline points="6 9 12 15 18 9"></polyline>', "chevron-left": '<polyline points="15 18 9 12 15 6"></polyline>', "chevron-right": '<polyline points="9 18 15 12 9 6"></polyline>', "chevron-up": '<polyline points="18 15 12 9 6 15"></polyline>', "chevrons-down": '<polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline>', "chevrons-left": '<polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline>', "chevrons-right": '<polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>', "chevrons-up": '<polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline>', chrome: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>', circle: '<circle cx="12" cy="12" r="10"></circle>', clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>', clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>', "cloud-drizzle": '<line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="12" y1="15" x2="12" y2="17"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>', "cloud-lightning": '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>', "cloud-off": '<path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"></path><line x1="1" y1="1" x2="23" y2="23"></line>', "cloud-rain": '<line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>', "cloud-snow": '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>', cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>', code: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>', codepen: '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line>', codesandbox: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>', coffee: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>', columns: '<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>', command: '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>', compass: '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>', copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>', "corner-down-left": '<polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path>', "corner-down-right": '<polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>', "corner-left-down": '<polyline points="14 15 9 20 4 15"></polyline><path d="M20 4h-7a4 4 0 0 0-4 4v12"></path>', "corner-left-up": '<polyline points="14 9 9 4 4 9"></polyline><path d="M20 20h-7a4 4 0 0 1-4-4V4"></path>', "corner-right-down": '<polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>', "corner-right-up": '<polyline points="10 9 15 4 20 9"></polyline><path d="M4 20h7a4 4 0 0 0 4-4V4"></path>', "corner-up-left": '<polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>', "corner-up-right": '<polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>', cpu: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>', "credit-card": '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>', crop: '<path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path>', crosshair: '<circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line>', database: '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>', delete: '<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line>', disc: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle>', "divide-circle": '<line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line><circle cx="12" cy="12" r="10"></circle>', "divide-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line>', divide: '<circle cx="12" cy="6" r="2"></circle><line x1="5" y1="12" x2="19" y2="12"></line><circle cx="12" cy="18" r="2"></circle>', "dollar-sign": '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>', "download-cloud": '<polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>', download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>', dribbble: '<circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>', droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>', "edit-2": '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>', "edit-3": '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>', edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>', "external-link": '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>', "eye-off": '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>', eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>', facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>', "fast-forward": '<polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon>', feather: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>', figma: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>', "file-minus": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line>', "file-plus": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line>', "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>', file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>', film: '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>', filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>', flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>', "folder-minus": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="9" y1="14" x2="15" y2="14"></line>', "folder-plus": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line>', folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>', framer: '<path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"></path>', frown: '<circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>', gift: '<polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>', "git-branch": '<line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path>', "git-commit": '<circle cx="12" cy="12" r="4"></circle><line x1="1.05" y1="12" x2="7" y2="12"></line><line x1="17.01" y1="12" x2="22.96" y2="12"></line>', "git-merge": '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path>', "git-pull-request": '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line>', github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>', gitlab: '<path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>', globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>', grid: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>', "hard-drive": '<line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line>', hash: '<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>', headphones: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>', heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>', "help-circle": '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>', hexagon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>', home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>', image: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>', inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>', info: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>', instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>', italic: '<line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line>', key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>', layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>', layout: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>', "life-buoy": '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>', "link-2": '<path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line>', link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>', linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>', list: '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>', loader: '<line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>', lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>', "log-in": '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>', "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>', mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>', "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>', map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>', "maximize-2": '<polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line>', maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>', meh: '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="15" x2="16" y2="15"></line><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>', menu: '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>', "message-circle": '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>', "message-square": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>', "mic-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>', mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>', "minimize-2": '<polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line>', minimize: '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>', "minus-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>', "minus-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line>', minus: '<line x1="5" y1="12" x2="19" y2="12"></line>', monitor: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>', moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>', "more-horizontal": '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>', "more-vertical": '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>', "mouse-pointer": '<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path>', move: '<polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="15 19 12 22 9 19"></polyline><polyline points="19 9 22 12 19 15"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line>', music: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>', "navigation-2": '<polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>', navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>', octagon: '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>', package: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>', paperclip: '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>', "pause-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line>', pause: '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>', "pen-tool": '<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>', percent: '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>', "phone-call": '<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-forwarded": '<polyline points="19 1 23 5 19 9"></polyline><line x1="15" y1="5" x2="23" y2="5"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-incoming": '<polyline points="16 2 16 8 22 8"></polyline><line x1="23" y1="1" x2="16" y2="8"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-missed": '<line x1="23" y1="1" x2="17" y2="7"></line><line x1="17" y1="1" x2="23" y2="7"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-off": '<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line>', "phone-outgoing": '<polyline points="23 7 23 1 17 1"></polyline><line x1="16" y1="8" x2="23" y2="1"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "pie-chart": '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>', "play-circle": '<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>', play: '<polygon points="5 3 19 12 5 21 5 3"></polygon>', "plus-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>', "plus-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>', plus: '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>', pocket: '<path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"></path><polyline points="8 10 12 14 16 10"></polyline>', power: '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>', printer: '<polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>', radio: '<circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>', "refresh-ccw": '<polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>', "refresh-cw": '<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>', repeat: '<polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>', rewind: '<polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon>', "rotate-ccw": '<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>', "rotate-cw": '<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>', rss: '<path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle>', save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>', scissors: '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>', search: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>', send: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>', server: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>', settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>', "share-2": '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>', share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>', "shield-off": '<path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"></path><path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"></path><line x1="1" y1="1" x2="23" y2="23"></line>', shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>', "shopping-bag": '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>', "shopping-cart": '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>', shuffle: '<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>', sidebar: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>', "skip-back": '<polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>', "skip-forward": '<polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>', slack: '<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path>', slash: '<circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>', sliders: '<line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>', smartphone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>', smile: '<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>', speaker: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line>', square: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>', star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>', "stop-circle": '<circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect>', sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>', sunrise: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline>', sunset: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline>', table: '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>', tablet: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>', tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>', target: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>', terminal: '<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>', thermometer: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>', "thumbs-down": '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>', "thumbs-up": '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>', "toggle-left": '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="8" cy="12" r="3"></circle>', "toggle-right": '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="16" cy="12" r="3"></circle>', tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>', "trash-2": '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>', trash: '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>', trello: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="9"></rect><rect x="14" y="7" width="3" height="5"></rect>', "trending-down": '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>', "trending-up": '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>', triangle: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>', truck: '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>', tv: '<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>', twitch: '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>', twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>', type: '<polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line>', umbrella: '<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>', underline: '<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line>', unlock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>', "upload-cloud": '<polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>', upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>', "user-check": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>', "user-minus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line>', "user-plus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>', "user-x": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line>', user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>', users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>', "video-off": '<path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line>', video: '<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>', voicemail: '<circle cx="5.5" cy="11.5" r="4.5"></circle><circle cx="18.5" cy="11.5" r="4.5"></circle><line x1="5.5" y1="16" x2="18.5" y2="16"></line>', "volume-1": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>', "volume-2": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>', "volume-x": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>', volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>', watch: '<circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>', "wifi-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>', wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>', wind: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>', "x-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>', "x-octagon": '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>', "x-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line>', x: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>', youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>', "zap-off": '<polyline points="12.41 6.75 13 2 10.57 4.92"></polyline><polyline points="18.57 12.91 21 10 15.66 10"></polyline><polyline points="8 8 3 14 12 14 11 22 16 16"></polyline><line x1="1" y1="1" x2="23" y2="23"></line>', zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>', "zoom-in": '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>', "zoom-out": '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line>' };
          }
        ),
        /***/
        "./node_modules/classnames/dedupe.js": (
          /*!*******************************************!*\
            !*** ./node_modules/classnames/dedupe.js ***!
            \*******************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l, a;
            /*!
              Copyright (c) 2016 Jed Watson.
              Licensed under the MIT License (MIT), see
              http://jedwatson.github.io/classnames
            */
            (function() {
              var i = function() {
                function u() {
                }
                u.prototype = /* @__PURE__ */ Object.create(null);
                function c(x, h) {
                  for (var w = h.length, C = 0; C < w; ++C)
                    m(x, h[C]);
                }
                var d = {}.hasOwnProperty;
                function f(x, h) {
                  x[h] = !0;
                }
                function p(x, h) {
                  for (var w in h)
                    d.call(h, w) && (x[w] = !!h[w]);
                }
                var v = /\s+/;
                function y(x, h) {
                  for (var w = h.split(v), C = w.length, g = 0; g < C; ++g)
                    x[w[g]] = !0;
                }
                function m(x, h) {
                  if (h) {
                    var w = typeof h;
                    w === "string" ? y(x, h) : Array.isArray(h) ? c(x, h) : w === "object" ? p(x, h) : w === "number" && f(x, h);
                  }
                }
                function S() {
                  for (var x = arguments.length, h = Array(x), w = 0; w < x; w++)
                    h[w] = arguments[w];
                  var C = new u();
                  c(C, h);
                  var g = [];
                  for (var b in C)
                    C[b] && g.push(b);
                  return g.join(" ");
                }
                return S;
              }();
              typeof t < "u" && t.exports ? t.exports = i : (l = [], a = (function() {
                return i;
              }).apply(r, l), a !== void 0 && (t.exports = a));
            })();
          }
        ),
        /***/
        "./node_modules/core-js/es/array/from.js": (
          /*!***********************************************!*\
            !*** ./node_modules/core-js/es/array/from.js ***!
            \***********************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            o(
              /*! ../../modules/es.string.iterator */
              "./node_modules/core-js/modules/es.string.iterator.js"
            ), o(
              /*! ../../modules/es.array.from */
              "./node_modules/core-js/modules/es.array.from.js"
            );
            var l = o(
              /*! ../../internals/path */
              "./node_modules/core-js/internals/path.js"
            );
            t.exports = l.Array.from;
          }
        ),
        /***/
        "./node_modules/core-js/internals/a-function.js": (
          /*!******************************************************!*\
            !*** ./node_modules/core-js/internals/a-function.js ***!
            \******************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            t.exports = function(o) {
              if (typeof o != "function")
                throw TypeError(String(o) + " is not a function");
              return o;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/an-object.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/an-object.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            );
            t.exports = function(a) {
              if (!l(a))
                throw TypeError(String(a) + " is not an object");
              return a;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/array-from.js": (
          /*!******************************************************!*\
            !*** ./node_modules/core-js/internals/array-from.js ***!
            \******************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/bind-context */
              "./node_modules/core-js/internals/bind-context.js"
            ), a = o(
              /*! ../internals/to-object */
              "./node_modules/core-js/internals/to-object.js"
            ), i = o(
              /*! ../internals/call-with-safe-iteration-closing */
              "./node_modules/core-js/internals/call-with-safe-iteration-closing.js"
            ), u = o(
              /*! ../internals/is-array-iterator-method */
              "./node_modules/core-js/internals/is-array-iterator-method.js"
            ), c = o(
              /*! ../internals/to-length */
              "./node_modules/core-js/internals/to-length.js"
            ), d = o(
              /*! ../internals/create-property */
              "./node_modules/core-js/internals/create-property.js"
            ), f = o(
              /*! ../internals/get-iterator-method */
              "./node_modules/core-js/internals/get-iterator-method.js"
            );
            t.exports = function(v) {
              var y = a(v), m = typeof this == "function" ? this : Array, S = arguments.length, x = S > 1 ? arguments[1] : void 0, h = x !== void 0, w = 0, C = f(y), g, b, O, T;
              if (h && (x = l(x, S > 2 ? arguments[2] : void 0, 2)), C != null && !(m == Array && u(C)))
                for (T = C.call(y), b = new m(); !(O = T.next()).done; w++)
                  d(
                    b,
                    w,
                    h ? i(T, x, [O.value, w], !0) : O.value
                  );
              else
                for (g = c(y.length), b = new m(g); g > w; w++)
                  d(b, w, h ? x(y[w], w) : y[w]);
              return b.length = w, b;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/array-includes.js": (
          /*!**********************************************************!*\
            !*** ./node_modules/core-js/internals/array-includes.js ***!
            \**********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/to-indexed-object */
              "./node_modules/core-js/internals/to-indexed-object.js"
            ), a = o(
              /*! ../internals/to-length */
              "./node_modules/core-js/internals/to-length.js"
            ), i = o(
              /*! ../internals/to-absolute-index */
              "./node_modules/core-js/internals/to-absolute-index.js"
            );
            t.exports = function(u) {
              return function(c, d, f) {
                var p = l(c), v = a(p.length), y = i(f, v), m;
                if (u && d != d) {
                  for (; v > y; )
                    if (m = p[y++], m != m)
                      return !0;
                } else
                  for (; v > y; y++)
                    if ((u || y in p) && p[y] === d)
                      return u || y || 0;
                return !u && -1;
              };
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/bind-context.js": (
          /*!********************************************************!*\
            !*** ./node_modules/core-js/internals/bind-context.js ***!
            \********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/a-function */
              "./node_modules/core-js/internals/a-function.js"
            );
            t.exports = function(a, i, u) {
              if (l(a), i === void 0)
                return a;
              switch (u) {
                case 0:
                  return function() {
                    return a.call(i);
                  };
                case 1:
                  return function(c) {
                    return a.call(i, c);
                  };
                case 2:
                  return function(c, d) {
                    return a.call(i, c, d);
                  };
                case 3:
                  return function(c, d, f) {
                    return a.call(i, c, d, f);
                  };
              }
              return function() {
                return a.apply(i, arguments);
              };
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/call-with-safe-iteration-closing.js": (
          /*!****************************************************************************!*\
            !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
            \****************************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            );
            t.exports = function(a, i, u, c) {
              try {
                return c ? i(l(u)[0], u[1]) : i(u);
              } catch (f) {
                var d = a.return;
                throw d !== void 0 && l(d.call(a)), f;
              }
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/check-correctness-of-iteration.js": (
          /*!**************************************************************************!*\
            !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
            \**************************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), a = l("iterator"), i = !1;
            try {
              var u = 0, c = {
                next: function() {
                  return { done: !!u++ };
                },
                return: function() {
                  i = !0;
                }
              };
              c[a] = function() {
                return this;
              }, Array.from(c, function() {
                throw 2;
              });
            } catch {
            }
            t.exports = function(d, f) {
              if (!f && !i)
                return !1;
              var p = !1;
              try {
                var v = {};
                v[a] = function() {
                  return {
                    next: function() {
                      return { done: p = !0 };
                    }
                  };
                }, d(v);
              } catch {
              }
              return p;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/classof-raw.js": (
          /*!*******************************************************!*\
            !*** ./node_modules/core-js/internals/classof-raw.js ***!
            \*******************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            var o = {}.toString;
            t.exports = function(l) {
              return o.call(l).slice(8, -1);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/classof.js": (
          /*!***************************************************!*\
            !*** ./node_modules/core-js/internals/classof.js ***!
            \***************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/classof-raw */
              "./node_modules/core-js/internals/classof-raw.js"
            ), a = o(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), i = a("toStringTag"), u = l(function() {
              return arguments;
            }()) == "Arguments", c = function(d, f) {
              try {
                return d[f];
              } catch {
              }
            };
            t.exports = function(d) {
              var f, p, v;
              return d === void 0 ? "Undefined" : d === null ? "Null" : typeof (p = c(f = Object(d), i)) == "string" ? p : u ? l(f) : (v = l(f)) == "Object" && typeof f.callee == "function" ? "Arguments" : v;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/copy-constructor-properties.js": (
          /*!***********************************************************************!*\
            !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
            \***********************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), a = o(
              /*! ../internals/own-keys */
              "./node_modules/core-js/internals/own-keys.js"
            ), i = o(
              /*! ../internals/object-get-own-property-descriptor */
              "./node_modules/core-js/internals/object-get-own-property-descriptor.js"
            ), u = o(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            );
            t.exports = function(c, d) {
              for (var f = a(d), p = u.f, v = i.f, y = 0; y < f.length; y++) {
                var m = f[y];
                l(c, m) || p(c, m, v(d, m));
              }
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/correct-prototype-getter.js": (
          /*!********************************************************************!*\
            !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
            \********************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            );
            t.exports = !l(function() {
              function a() {
              }
              return a.prototype.constructor = null, Object.getPrototypeOf(new a()) !== a.prototype;
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/create-iterator-constructor.js": (
          /*!***********************************************************************!*\
            !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
            \***********************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/iterators-core */
              "./node_modules/core-js/internals/iterators-core.js"
            ).IteratorPrototype, a = o(
              /*! ../internals/object-create */
              "./node_modules/core-js/internals/object-create.js"
            ), i = o(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            ), u = o(
              /*! ../internals/set-to-string-tag */
              "./node_modules/core-js/internals/set-to-string-tag.js"
            ), c = o(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), d = function() {
              return this;
            };
            t.exports = function(f, p, v) {
              var y = p + " Iterator";
              return f.prototype = a(l, { next: i(1, v) }), u(f, y, !1, !0), c[y] = d, f;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/create-property-descriptor.js": (
          /*!**********************************************************************!*\
            !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
            \**********************************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            t.exports = function(o, l) {
              return {
                enumerable: !(o & 1),
                configurable: !(o & 2),
                writable: !(o & 4),
                value: l
              };
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/create-property.js": (
          /*!***********************************************************!*\
            !*** ./node_modules/core-js/internals/create-property.js ***!
            \***********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/to-primitive */
              "./node_modules/core-js/internals/to-primitive.js"
            ), a = o(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ), i = o(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            );
            t.exports = function(u, c, d) {
              var f = l(c);
              f in u ? a.f(u, f, i(0, d)) : u[f] = d;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/define-iterator.js": (
          /*!***********************************************************!*\
            !*** ./node_modules/core-js/internals/define-iterator.js ***!
            \***********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/export */
              "./node_modules/core-js/internals/export.js"
            ), a = o(
              /*! ../internals/create-iterator-constructor */
              "./node_modules/core-js/internals/create-iterator-constructor.js"
            ), i = o(
              /*! ../internals/object-get-prototype-of */
              "./node_modules/core-js/internals/object-get-prototype-of.js"
            ), u = o(
              /*! ../internals/object-set-prototype-of */
              "./node_modules/core-js/internals/object-set-prototype-of.js"
            ), c = o(
              /*! ../internals/set-to-string-tag */
              "./node_modules/core-js/internals/set-to-string-tag.js"
            ), d = o(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), f = o(
              /*! ../internals/redefine */
              "./node_modules/core-js/internals/redefine.js"
            ), p = o(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), v = o(
              /*! ../internals/is-pure */
              "./node_modules/core-js/internals/is-pure.js"
            ), y = o(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), m = o(
              /*! ../internals/iterators-core */
              "./node_modules/core-js/internals/iterators-core.js"
            ), S = m.IteratorPrototype, x = m.BUGGY_SAFARI_ITERATORS, h = p("iterator"), w = "keys", C = "values", g = "entries", b = function() {
              return this;
            };
            t.exports = function(O, T, _, j, $, R, B) {
              a(_, T, j);
              var z = function(ye) {
                if (ye === $ && D)
                  return D;
                if (!x && ye in ne)
                  return ne[ye];
                switch (ye) {
                  case w:
                    return function() {
                      return new _(this, ye);
                    };
                  case C:
                    return function() {
                      return new _(this, ye);
                    };
                  case g:
                    return function() {
                      return new _(this, ye);
                    };
                }
                return function() {
                  return new _(this);
                };
              }, U = T + " Iterator", oe = !1, ne = O.prototype, ue = ne[h] || ne["@@iterator"] || $ && ne[$], D = !x && ue || z($), Z = T == "Array" && ne.entries || ue, G, ve, re;
              if (Z && (G = i(Z.call(new O())), S !== Object.prototype && G.next && (!v && i(G) !== S && (u ? u(G, S) : typeof G[h] != "function" && d(G, h, b)), c(G, U, !0, !0), v && (y[U] = b))), $ == C && ue && ue.name !== C && (oe = !0, D = function() {
                return ue.call(this);
              }), (!v || B) && ne[h] !== D && d(ne, h, D), y[T] = D, $)
                if (ve = {
                  values: z(C),
                  keys: R ? D : z(w),
                  entries: z(g)
                }, B)
                  for (re in ve)
                    (x || oe || !(re in ne)) && f(ne, re, ve[re]);
                else
                  l({ target: T, proto: !0, forced: x || oe }, ve);
              return ve;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/descriptors.js": (
          /*!*******************************************************!*\
            !*** ./node_modules/core-js/internals/descriptors.js ***!
            \*******************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            );
            t.exports = !l(function() {
              return Object.defineProperty({}, "a", { get: function() {
                return 7;
              } }).a != 7;
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/document-create-element.js": (
          /*!*******************************************************************!*\
            !*** ./node_modules/core-js/internals/document-create-element.js ***!
            \*******************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = o(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            ), i = l.document, u = a(i) && a(i.createElement);
            t.exports = function(c) {
              return u ? i.createElement(c) : {};
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/enum-bug-keys.js": (
          /*!*********************************************************!*\
            !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
            \*********************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            t.exports = [
              "constructor",
              "hasOwnProperty",
              "isPrototypeOf",
              "propertyIsEnumerable",
              "toLocaleString",
              "toString",
              "valueOf"
            ];
          }
        ),
        /***/
        "./node_modules/core-js/internals/export.js": (
          /*!**************************************************!*\
            !*** ./node_modules/core-js/internals/export.js ***!
            \**************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = o(
              /*! ../internals/object-get-own-property-descriptor */
              "./node_modules/core-js/internals/object-get-own-property-descriptor.js"
            ).f, i = o(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), u = o(
              /*! ../internals/redefine */
              "./node_modules/core-js/internals/redefine.js"
            ), c = o(
              /*! ../internals/set-global */
              "./node_modules/core-js/internals/set-global.js"
            ), d = o(
              /*! ../internals/copy-constructor-properties */
              "./node_modules/core-js/internals/copy-constructor-properties.js"
            ), f = o(
              /*! ../internals/is-forced */
              "./node_modules/core-js/internals/is-forced.js"
            );
            t.exports = function(p, v) {
              var y = p.target, m = p.global, S = p.stat, x, h, w, C, g, b;
              if (m ? h = l : S ? h = l[y] || c(y, {}) : h = (l[y] || {}).prototype, h)
                for (w in v) {
                  if (g = v[w], p.noTargetGet ? (b = a(h, w), C = b && b.value) : C = h[w], x = f(m ? w : y + (S ? "." : "#") + w, p.forced), !x && C !== void 0) {
                    if (typeof g == typeof C)
                      continue;
                    d(g, C);
                  }
                  (p.sham || C && C.sham) && i(g, "sham", !0), u(h, w, g, p);
                }
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/fails.js": (
          /*!*************************************************!*\
            !*** ./node_modules/core-js/internals/fails.js ***!
            \*************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            t.exports = function(o) {
              try {
                return !!o();
              } catch {
                return !0;
              }
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/function-to-string.js": (
          /*!**************************************************************!*\
            !*** ./node_modules/core-js/internals/function-to-string.js ***!
            \**************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            );
            t.exports = l("native-function-to-string", Function.toString);
          }
        ),
        /***/
        "./node_modules/core-js/internals/get-iterator-method.js": (
          /*!***************************************************************!*\
            !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
            \***************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/classof */
              "./node_modules/core-js/internals/classof.js"
            ), a = o(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), i = o(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), u = i("iterator");
            t.exports = function(c) {
              if (c != null)
                return c[u] || c["@@iterator"] || a[l(c)];
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/global.js": (
          /*!**************************************************!*\
            !*** ./node_modules/core-js/internals/global.js ***!
            \**************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            (function(l) {
              var a = "object", i = function(u) {
                return u && u.Math == Math && u;
              };
              t.exports = // eslint-disable-next-line no-undef
              i(typeof globalThis == a && globalThis) || i(typeof window == a && window) || i(typeof self == a && self) || i(typeof l == a && l) || // eslint-disable-next-line no-new-func
              Function("return this")();
            }).call(this, o(
              /*! ./../../webpack/buildin/global.js */
              "./node_modules/webpack/buildin/global.js"
            ));
          }
        ),
        /***/
        "./node_modules/core-js/internals/has.js": (
          /*!***********************************************!*\
            !*** ./node_modules/core-js/internals/has.js ***!
            \***********************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            var o = {}.hasOwnProperty;
            t.exports = function(l, a) {
              return o.call(l, a);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/hidden-keys.js": (
          /*!*******************************************************!*\
            !*** ./node_modules/core-js/internals/hidden-keys.js ***!
            \*******************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            t.exports = {};
          }
        ),
        /***/
        "./node_modules/core-js/internals/hide.js": (
          /*!************************************************!*\
            !*** ./node_modules/core-js/internals/hide.js ***!
            \************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), a = o(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ), i = o(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            );
            t.exports = l ? function(u, c, d) {
              return a.f(u, c, i(1, d));
            } : function(u, c, d) {
              return u[c] = d, u;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/html.js": (
          /*!************************************************!*\
            !*** ./node_modules/core-js/internals/html.js ***!
            \************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = l.document;
            t.exports = a && a.documentElement;
          }
        ),
        /***/
        "./node_modules/core-js/internals/ie8-dom-define.js": (
          /*!**********************************************************!*\
            !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
            \**********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), a = o(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            ), i = o(
              /*! ../internals/document-create-element */
              "./node_modules/core-js/internals/document-create-element.js"
            );
            t.exports = !l && !a(function() {
              return Object.defineProperty(i("div"), "a", {
                get: function() {
                  return 7;
                }
              }).a != 7;
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/indexed-object.js": (
          /*!**********************************************************!*\
            !*** ./node_modules/core-js/internals/indexed-object.js ***!
            \**********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            ), a = o(
              /*! ../internals/classof-raw */
              "./node_modules/core-js/internals/classof-raw.js"
            ), i = "".split;
            t.exports = l(function() {
              return !Object("z").propertyIsEnumerable(0);
            }) ? function(u) {
              return a(u) == "String" ? i.call(u, "") : Object(u);
            } : Object;
          }
        ),
        /***/
        "./node_modules/core-js/internals/internal-state.js": (
          /*!**********************************************************!*\
            !*** ./node_modules/core-js/internals/internal-state.js ***!
            \**********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/native-weak-map */
              "./node_modules/core-js/internals/native-weak-map.js"
            ), a = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), i = o(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            ), u = o(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), c = o(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), d = o(
              /*! ../internals/shared-key */
              "./node_modules/core-js/internals/shared-key.js"
            ), f = o(
              /*! ../internals/hidden-keys */
              "./node_modules/core-js/internals/hidden-keys.js"
            ), p = a.WeakMap, v, y, m, S = function(O) {
              return m(O) ? y(O) : v(O, {});
            }, x = function(O) {
              return function(T) {
                var _;
                if (!i(T) || (_ = y(T)).type !== O)
                  throw TypeError("Incompatible receiver, " + O + " required");
                return _;
              };
            };
            if (l) {
              var h = new p(), w = h.get, C = h.has, g = h.set;
              v = function(O, T) {
                return g.call(h, O, T), T;
              }, y = function(O) {
                return w.call(h, O) || {};
              }, m = function(O) {
                return C.call(h, O);
              };
            } else {
              var b = d("state");
              f[b] = !0, v = function(O, T) {
                return u(O, b, T), T;
              }, y = function(O) {
                return c(O, b) ? O[b] : {};
              }, m = function(O) {
                return c(O, b);
              };
            }
            t.exports = {
              set: v,
              get: y,
              has: m,
              enforce: S,
              getterFor: x
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/is-array-iterator-method.js": (
          /*!********************************************************************!*\
            !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
            \********************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), a = o(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), i = l("iterator"), u = Array.prototype;
            t.exports = function(c) {
              return c !== void 0 && (a.Array === c || u[i] === c);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/is-forced.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/is-forced.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            ), a = /#|\.prototype\./, i = function(p, v) {
              var y = c[u(p)];
              return y == f ? !0 : y == d ? !1 : typeof v == "function" ? l(v) : !!v;
            }, u = i.normalize = function(p) {
              return String(p).replace(a, ".").toLowerCase();
            }, c = i.data = {}, d = i.NATIVE = "N", f = i.POLYFILL = "P";
            t.exports = i;
          }
        ),
        /***/
        "./node_modules/core-js/internals/is-object.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/is-object.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            t.exports = function(o) {
              return typeof o == "object" ? o !== null : typeof o == "function";
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/is-pure.js": (
          /*!***************************************************!*\
            !*** ./node_modules/core-js/internals/is-pure.js ***!
            \***************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            t.exports = !1;
          }
        ),
        /***/
        "./node_modules/core-js/internals/iterators-core.js": (
          /*!**********************************************************!*\
            !*** ./node_modules/core-js/internals/iterators-core.js ***!
            \**********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/object-get-prototype-of */
              "./node_modules/core-js/internals/object-get-prototype-of.js"
            ), a = o(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), i = o(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), u = o(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), c = o(
              /*! ../internals/is-pure */
              "./node_modules/core-js/internals/is-pure.js"
            ), d = u("iterator"), f = !1, p = function() {
              return this;
            }, v, y, m;
            [].keys && (m = [].keys(), "next" in m ? (y = l(l(m)), y !== Object.prototype && (v = y)) : f = !0), v == null && (v = {}), !c && !i(v, d) && a(v, d, p), t.exports = {
              IteratorPrototype: v,
              BUGGY_SAFARI_ITERATORS: f
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/iterators.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/iterators.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            t.exports = {};
          }
        ),
        /***/
        "./node_modules/core-js/internals/native-symbol.js": (
          /*!*********************************************************!*\
            !*** ./node_modules/core-js/internals/native-symbol.js ***!
            \*********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            );
            t.exports = !!Object.getOwnPropertySymbols && !l(function() {
              return !String(Symbol());
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/native-weak-map.js": (
          /*!***********************************************************!*\
            !*** ./node_modules/core-js/internals/native-weak-map.js ***!
            \***********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = o(
              /*! ../internals/function-to-string */
              "./node_modules/core-js/internals/function-to-string.js"
            ), i = l.WeakMap;
            t.exports = typeof i == "function" && /native code/.test(a.call(i));
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-create.js": (
          /*!*********************************************************!*\
            !*** ./node_modules/core-js/internals/object-create.js ***!
            \*********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), a = o(
              /*! ../internals/object-define-properties */
              "./node_modules/core-js/internals/object-define-properties.js"
            ), i = o(
              /*! ../internals/enum-bug-keys */
              "./node_modules/core-js/internals/enum-bug-keys.js"
            ), u = o(
              /*! ../internals/hidden-keys */
              "./node_modules/core-js/internals/hidden-keys.js"
            ), c = o(
              /*! ../internals/html */
              "./node_modules/core-js/internals/html.js"
            ), d = o(
              /*! ../internals/document-create-element */
              "./node_modules/core-js/internals/document-create-element.js"
            ), f = o(
              /*! ../internals/shared-key */
              "./node_modules/core-js/internals/shared-key.js"
            ), p = f("IE_PROTO"), v = "prototype", y = function() {
            }, m = function() {
              var S = d("iframe"), x = i.length, h = "<", w = "script", C = ">", g = "java" + w + ":", b;
              for (S.style.display = "none", c.appendChild(S), S.src = String(g), b = S.contentWindow.document, b.open(), b.write(h + w + C + "document.F=Object" + h + "/" + w + C), b.close(), m = b.F; x--; )
                delete m[v][i[x]];
              return m();
            };
            t.exports = Object.create || function(x, h) {
              var w;
              return x !== null ? (y[v] = l(x), w = new y(), y[v] = null, w[p] = x) : w = m(), h === void 0 ? w : a(w, h);
            }, u[p] = !0;
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-define-properties.js": (
          /*!********************************************************************!*\
            !*** ./node_modules/core-js/internals/object-define-properties.js ***!
            \********************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), a = o(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ), i = o(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), u = o(
              /*! ../internals/object-keys */
              "./node_modules/core-js/internals/object-keys.js"
            );
            t.exports = l ? Object.defineProperties : function(d, f) {
              i(d);
              for (var p = u(f), v = p.length, y = 0, m; v > y; )
                a.f(d, m = p[y++], f[m]);
              return d;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-define-property.js": (
          /*!******************************************************************!*\
            !*** ./node_modules/core-js/internals/object-define-property.js ***!
            \******************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), a = o(
              /*! ../internals/ie8-dom-define */
              "./node_modules/core-js/internals/ie8-dom-define.js"
            ), i = o(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), u = o(
              /*! ../internals/to-primitive */
              "./node_modules/core-js/internals/to-primitive.js"
            ), c = Object.defineProperty;
            r.f = l ? c : function(f, p, v) {
              if (i(f), p = u(p, !0), i(v), a)
                try {
                  return c(f, p, v);
                } catch {
                }
              if ("get" in v || "set" in v)
                throw TypeError("Accessors not supported");
              return "value" in v && (f[p] = v.value), f;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-get-own-property-descriptor.js": (
          /*!******************************************************************************!*\
            !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
            \******************************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), a = o(
              /*! ../internals/object-property-is-enumerable */
              "./node_modules/core-js/internals/object-property-is-enumerable.js"
            ), i = o(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            ), u = o(
              /*! ../internals/to-indexed-object */
              "./node_modules/core-js/internals/to-indexed-object.js"
            ), c = o(
              /*! ../internals/to-primitive */
              "./node_modules/core-js/internals/to-primitive.js"
            ), d = o(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), f = o(
              /*! ../internals/ie8-dom-define */
              "./node_modules/core-js/internals/ie8-dom-define.js"
            ), p = Object.getOwnPropertyDescriptor;
            r.f = l ? p : function(y, m) {
              if (y = u(y), m = c(m, !0), f)
                try {
                  return p(y, m);
                } catch {
                }
              if (d(y, m))
                return i(!a.f.call(y, m), y[m]);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-get-own-property-names.js": (
          /*!*************************************************************************!*\
            !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
            \*************************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/object-keys-internal */
              "./node_modules/core-js/internals/object-keys-internal.js"
            ), a = o(
              /*! ../internals/enum-bug-keys */
              "./node_modules/core-js/internals/enum-bug-keys.js"
            ), i = a.concat("length", "prototype");
            r.f = Object.getOwnPropertyNames || function(c) {
              return l(c, i);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-get-own-property-symbols.js": (
          /*!***************************************************************************!*\
            !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
            \***************************************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            r.f = Object.getOwnPropertySymbols;
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-get-prototype-of.js": (
          /*!*******************************************************************!*\
            !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
            \*******************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), a = o(
              /*! ../internals/to-object */
              "./node_modules/core-js/internals/to-object.js"
            ), i = o(
              /*! ../internals/shared-key */
              "./node_modules/core-js/internals/shared-key.js"
            ), u = o(
              /*! ../internals/correct-prototype-getter */
              "./node_modules/core-js/internals/correct-prototype-getter.js"
            ), c = i("IE_PROTO"), d = Object.prototype;
            t.exports = u ? Object.getPrototypeOf : function(f) {
              return f = a(f), l(f, c) ? f[c] : typeof f.constructor == "function" && f instanceof f.constructor ? f.constructor.prototype : f instanceof Object ? d : null;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-keys-internal.js": (
          /*!****************************************************************!*\
            !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
            \****************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), a = o(
              /*! ../internals/to-indexed-object */
              "./node_modules/core-js/internals/to-indexed-object.js"
            ), i = o(
              /*! ../internals/array-includes */
              "./node_modules/core-js/internals/array-includes.js"
            ), u = o(
              /*! ../internals/hidden-keys */
              "./node_modules/core-js/internals/hidden-keys.js"
            ), c = i(!1);
            t.exports = function(d, f) {
              var p = a(d), v = 0, y = [], m;
              for (m in p)
                !l(u, m) && l(p, m) && y.push(m);
              for (; f.length > v; )
                l(p, m = f[v++]) && (~c(y, m) || y.push(m));
              return y;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-keys.js": (
          /*!*******************************************************!*\
            !*** ./node_modules/core-js/internals/object-keys.js ***!
            \*******************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/object-keys-internal */
              "./node_modules/core-js/internals/object-keys-internal.js"
            ), a = o(
              /*! ../internals/enum-bug-keys */
              "./node_modules/core-js/internals/enum-bug-keys.js"
            );
            t.exports = Object.keys || function(u) {
              return l(u, a);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-property-is-enumerable.js": (
          /*!*************************************************************************!*\
            !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
            \*************************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = {}.propertyIsEnumerable, a = Object.getOwnPropertyDescriptor, i = a && !l.call({ 1: 2 }, 1);
            r.f = i ? function(c) {
              var d = a(this, c);
              return !!d && d.enumerable;
            } : l;
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-set-prototype-of.js": (
          /*!*******************************************************************!*\
            !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
            \*******************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/validate-set-prototype-of-arguments */
              "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js"
            );
            t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
              var a = !1, i = {}, u;
              try {
                u = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set, u.call(i, []), a = i instanceof Array;
              } catch {
              }
              return function(d, f) {
                return l(d, f), a ? u.call(d, f) : d.__proto__ = f, d;
              };
            }() : void 0);
          }
        ),
        /***/
        "./node_modules/core-js/internals/own-keys.js": (
          /*!****************************************************!*\
            !*** ./node_modules/core-js/internals/own-keys.js ***!
            \****************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = o(
              /*! ../internals/object-get-own-property-names */
              "./node_modules/core-js/internals/object-get-own-property-names.js"
            ), i = o(
              /*! ../internals/object-get-own-property-symbols */
              "./node_modules/core-js/internals/object-get-own-property-symbols.js"
            ), u = o(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), c = l.Reflect;
            t.exports = c && c.ownKeys || function(f) {
              var p = a.f(u(f)), v = i.f;
              return v ? p.concat(v(f)) : p;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/path.js": (
          /*!************************************************!*\
            !*** ./node_modules/core-js/internals/path.js ***!
            \************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            t.exports = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            );
          }
        ),
        /***/
        "./node_modules/core-js/internals/redefine.js": (
          /*!****************************************************!*\
            !*** ./node_modules/core-js/internals/redefine.js ***!
            \****************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = o(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            ), i = o(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), u = o(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), c = o(
              /*! ../internals/set-global */
              "./node_modules/core-js/internals/set-global.js"
            ), d = o(
              /*! ../internals/function-to-string */
              "./node_modules/core-js/internals/function-to-string.js"
            ), f = o(
              /*! ../internals/internal-state */
              "./node_modules/core-js/internals/internal-state.js"
            ), p = f.get, v = f.enforce, y = String(d).split("toString");
            a("inspectSource", function(m) {
              return d.call(m);
            }), (t.exports = function(m, S, x, h) {
              var w = h ? !!h.unsafe : !1, C = h ? !!h.enumerable : !1, g = h ? !!h.noTargetGet : !1;
              if (typeof x == "function" && (typeof S == "string" && !u(x, "name") && i(x, "name", S), v(x).source = y.join(typeof S == "string" ? S : "")), m === l) {
                C ? m[S] = x : c(S, x);
                return;
              } else
                w ? !g && m[S] && (C = !0) : delete m[S];
              C ? m[S] = x : i(m, S, x);
            })(Function.prototype, "toString", function() {
              return typeof this == "function" && p(this).source || d.call(this);
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/require-object-coercible.js": (
          /*!********************************************************************!*\
            !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
            \********************************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            t.exports = function(o) {
              if (o == null)
                throw TypeError("Can't call method on " + o);
              return o;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/set-global.js": (
          /*!******************************************************!*\
            !*** ./node_modules/core-js/internals/set-global.js ***!
            \******************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = o(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            );
            t.exports = function(i, u) {
              try {
                a(l, i, u);
              } catch {
                l[i] = u;
              }
              return u;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/set-to-string-tag.js": (
          /*!*************************************************************!*\
            !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
            \*************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ).f, a = o(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), i = o(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), u = i("toStringTag");
            t.exports = function(c, d, f) {
              c && !a(c = f ? c : c.prototype, u) && l(c, u, { configurable: !0, value: d });
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/shared-key.js": (
          /*!******************************************************!*\
            !*** ./node_modules/core-js/internals/shared-key.js ***!
            \******************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            ), a = o(
              /*! ../internals/uid */
              "./node_modules/core-js/internals/uid.js"
            ), i = l("keys");
            t.exports = function(u) {
              return i[u] || (i[u] = a(u));
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/shared.js": (
          /*!**************************************************!*\
            !*** ./node_modules/core-js/internals/shared.js ***!
            \**************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = o(
              /*! ../internals/set-global */
              "./node_modules/core-js/internals/set-global.js"
            ), i = o(
              /*! ../internals/is-pure */
              "./node_modules/core-js/internals/is-pure.js"
            ), u = "__core-js_shared__", c = l[u] || a(u, {});
            (t.exports = function(d, f) {
              return c[d] || (c[d] = f !== void 0 ? f : {});
            })("versions", []).push({
              version: "3.1.3",
              mode: i ? "pure" : "global",
              copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/string-at.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/string-at.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/to-integer */
              "./node_modules/core-js/internals/to-integer.js"
            ), a = o(
              /*! ../internals/require-object-coercible */
              "./node_modules/core-js/internals/require-object-coercible.js"
            );
            t.exports = function(i, u, c) {
              var d = String(a(i)), f = l(u), p = d.length, v, y;
              return f < 0 || f >= p ? c ? "" : void 0 : (v = d.charCodeAt(f), v < 55296 || v > 56319 || f + 1 === p || (y = d.charCodeAt(f + 1)) < 56320 || y > 57343 ? c ? d.charAt(f) : v : c ? d.slice(f, f + 2) : (v - 55296 << 10) + (y - 56320) + 65536);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-absolute-index.js": (
          /*!*************************************************************!*\
            !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
            \*************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/to-integer */
              "./node_modules/core-js/internals/to-integer.js"
            ), a = Math.max, i = Math.min;
            t.exports = function(u, c) {
              var d = l(u);
              return d < 0 ? a(d + c, 0) : i(d, c);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-indexed-object.js": (
          /*!*************************************************************!*\
            !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
            \*************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/indexed-object */
              "./node_modules/core-js/internals/indexed-object.js"
            ), a = o(
              /*! ../internals/require-object-coercible */
              "./node_modules/core-js/internals/require-object-coercible.js"
            );
            t.exports = function(i) {
              return l(a(i));
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-integer.js": (
          /*!******************************************************!*\
            !*** ./node_modules/core-js/internals/to-integer.js ***!
            \******************************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            var o = Math.ceil, l = Math.floor;
            t.exports = function(a) {
              return isNaN(a = +a) ? 0 : (a > 0 ? l : o)(a);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-length.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/to-length.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/to-integer */
              "./node_modules/core-js/internals/to-integer.js"
            ), a = Math.min;
            t.exports = function(i) {
              return i > 0 ? a(l(i), 9007199254740991) : 0;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-object.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/to-object.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/require-object-coercible */
              "./node_modules/core-js/internals/require-object-coercible.js"
            );
            t.exports = function(a) {
              return Object(l(a));
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-primitive.js": (
          /*!********************************************************!*\
            !*** ./node_modules/core-js/internals/to-primitive.js ***!
            \********************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            );
            t.exports = function(a, i) {
              if (!l(a))
                return a;
              var u, c;
              if (i && typeof (u = a.toString) == "function" && !l(c = u.call(a)) || typeof (u = a.valueOf) == "function" && !l(c = u.call(a)) || !i && typeof (u = a.toString) == "function" && !l(c = u.call(a)))
                return c;
              throw TypeError("Can't convert object to primitive value");
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/uid.js": (
          /*!***********************************************!*\
            !*** ./node_modules/core-js/internals/uid.js ***!
            \***********************************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            var o = 0, l = Math.random();
            t.exports = function(a) {
              return "Symbol(".concat(a === void 0 ? "" : a, ")_", (++o + l).toString(36));
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js": (
          /*!*******************************************************************************!*\
            !*** ./node_modules/core-js/internals/validate-set-prototype-of-arguments.js ***!
            \*******************************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            ), a = o(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            );
            t.exports = function(i, u) {
              if (a(i), !l(u) && u !== null)
                throw TypeError("Can't set " + String(u) + " as a prototype");
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/well-known-symbol.js": (
          /*!*************************************************************!*\
            !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
            \*************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = o(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            ), i = o(
              /*! ../internals/uid */
              "./node_modules/core-js/internals/uid.js"
            ), u = o(
              /*! ../internals/native-symbol */
              "./node_modules/core-js/internals/native-symbol.js"
            ), c = l.Symbol, d = a("wks");
            t.exports = function(f) {
              return d[f] || (d[f] = u && c[f] || (u ? c : i)("Symbol." + f));
            };
          }
        ),
        /***/
        "./node_modules/core-js/modules/es.array.from.js": (
          /*!*******************************************************!*\
            !*** ./node_modules/core-js/modules/es.array.from.js ***!
            \*******************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/export */
              "./node_modules/core-js/internals/export.js"
            ), a = o(
              /*! ../internals/array-from */
              "./node_modules/core-js/internals/array-from.js"
            ), i = o(
              /*! ../internals/check-correctness-of-iteration */
              "./node_modules/core-js/internals/check-correctness-of-iteration.js"
            ), u = !i(function(c) {
              Array.from(c);
            });
            l({ target: "Array", stat: !0, forced: u }, {
              from: a
            });
          }
        ),
        /***/
        "./node_modules/core-js/modules/es.string.iterator.js": (
          /*!************************************************************!*\
            !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
            \************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ../internals/string-at */
              "./node_modules/core-js/internals/string-at.js"
            ), a = o(
              /*! ../internals/internal-state */
              "./node_modules/core-js/internals/internal-state.js"
            ), i = o(
              /*! ../internals/define-iterator */
              "./node_modules/core-js/internals/define-iterator.js"
            ), u = "String Iterator", c = a.set, d = a.getterFor(u);
            i(String, "String", function(f) {
              c(this, {
                type: u,
                string: String(f),
                index: 0
              });
            }, function() {
              var p = d(this), v = p.string, y = p.index, m;
              return y >= v.length ? { value: void 0, done: !0 } : (m = l(v, y, !0), p.index += m.length, { value: m, done: !1 });
            });
          }
        ),
        /***/
        "./node_modules/webpack/buildin/global.js": (
          /*!***********************************!*\
            !*** (webpack)/buildin/global.js ***!
            \***********************************/
          /*! no static exports found */
          /***/
          function(t, r) {
            var o;
            o = function() {
              return this;
            }();
            try {
              o = o || Function("return this")() || (0, eval)("this");
            } catch {
              typeof window == "object" && (o = window);
            }
            t.exports = o;
          }
        ),
        /***/
        "./src/default-attrs.json": (
          /*!********************************!*\
            !*** ./src/default-attrs.json ***!
            \********************************/
          /*! exports provided: xmlns, width, height, viewBox, fill, stroke, stroke-width, stroke-linecap, stroke-linejoin, default */
          /***/
          function(t) {
            t.exports = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" };
          }
        ),
        /***/
        "./src/icon.js": (
          /*!*********************!*\
            !*** ./src/icon.js ***!
            \*********************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var l = Object.assign || function(m) {
              for (var S = 1; S < arguments.length; S++) {
                var x = arguments[S];
                for (var h in x)
                  Object.prototype.hasOwnProperty.call(x, h) && (m[h] = x[h]);
              }
              return m;
            }, a = function() {
              function m(S, x) {
                for (var h = 0; h < x.length; h++) {
                  var w = x[h];
                  w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(S, w.key, w);
                }
              }
              return function(S, x, h) {
                return x && m(S.prototype, x), h && m(S, h), S;
              };
            }(), i = o(
              /*! classnames/dedupe */
              "./node_modules/classnames/dedupe.js"
            ), u = f(i), c = o(
              /*! ./default-attrs.json */
              "./src/default-attrs.json"
            ), d = f(c);
            function f(m) {
              return m && m.__esModule ? m : { default: m };
            }
            function p(m, S) {
              if (!(m instanceof S))
                throw new TypeError("Cannot call a class as a function");
            }
            var v = function() {
              function m(S, x) {
                var h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
                p(this, m), this.name = S, this.contents = x, this.tags = h, this.attrs = l({}, d.default, { class: "feather feather-" + S });
              }
              return a(m, [{
                key: "toSvg",
                value: function() {
                  var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, h = l({}, this.attrs, x, { class: (0, u.default)(this.attrs.class, x.class) });
                  return "<svg " + y(h) + ">" + this.contents + "</svg>";
                }
                /**
                 * Return string representation of an `Icon`.
                 *
                 * Added for backward compatibility. If old code expects `feather.icons.<name>`
                 * to be a string, `toString()` will get implicitly called.
                 *
                 * @returns {string}
                 */
              }, {
                key: "toString",
                value: function() {
                  return this.contents;
                }
              }]), m;
            }();
            function y(m) {
              return Object.keys(m).map(function(S) {
                return S + '="' + m[S] + '"';
              }).join(" ");
            }
            r.default = v;
          }
        ),
        /***/
        "./src/icons.js": (
          /*!**********************!*\
            !*** ./src/icons.js ***!
            \**********************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var l = o(
              /*! ./icon */
              "./src/icon.js"
            ), a = f(l), i = o(
              /*! ../dist/icons.json */
              "./dist/icons.json"
            ), u = f(i), c = o(
              /*! ./tags.json */
              "./src/tags.json"
            ), d = f(c);
            function f(p) {
              return p && p.__esModule ? p : { default: p };
            }
            r.default = Object.keys(u.default).map(function(p) {
              return new a.default(p, u.default[p], d.default[p]);
            }).reduce(function(p, v) {
              return p[v.name] = v, p;
            }, {});
          }
        ),
        /***/
        "./src/index.js": (
          /*!**********************!*\
            !*** ./src/index.js ***!
            \**********************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            var l = o(
              /*! ./icons */
              "./src/icons.js"
            ), a = f(l), i = o(
              /*! ./to-svg */
              "./src/to-svg.js"
            ), u = f(i), c = o(
              /*! ./replace */
              "./src/replace.js"
            ), d = f(c);
            function f(p) {
              return p && p.__esModule ? p : { default: p };
            }
            t.exports = { icons: a.default, toSvg: u.default, replace: d.default };
          }
        ),
        /***/
        "./src/replace.js": (
          /*!************************!*\
            !*** ./src/replace.js ***!
            \************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var l = Object.assign || function(y) {
              for (var m = 1; m < arguments.length; m++) {
                var S = arguments[m];
                for (var x in S)
                  Object.prototype.hasOwnProperty.call(S, x) && (y[x] = S[x]);
              }
              return y;
            }, a = o(
              /*! classnames/dedupe */
              "./node_modules/classnames/dedupe.js"
            ), i = d(a), u = o(
              /*! ./icons */
              "./src/icons.js"
            ), c = d(u);
            function d(y) {
              return y && y.__esModule ? y : { default: y };
            }
            function f() {
              var y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              if (typeof document > "u")
                throw new Error("`feather.replace()` only works in a browser environment.");
              var m = document.querySelectorAll("[data-feather]");
              Array.from(m).forEach(function(S) {
                return p(S, y);
              });
            }
            function p(y) {
              var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, S = v(y), x = S["data-feather"];
              if (delete S["data-feather"], c.default[x] === void 0) {
                console.warn("feather: '" + x + "' is not a valid icon");
                return;
              }
              var h = c.default[x].toSvg(l({}, m, S, { class: (0, i.default)(m.class, S.class) })), w = new DOMParser().parseFromString(h, "image/svg+xml"), C = w.querySelector("svg");
              y.parentNode.replaceChild(C, y);
            }
            function v(y) {
              return Array.from(y.attributes).reduce(function(m, S) {
                return m[S.name] = S.value, m;
              }, {});
            }
            r.default = f;
          }
        ),
        /***/
        "./src/tags.json": (
          /*!***********************!*\
            !*** ./src/tags.json ***!
            \***********************/
          /*! exports provided: activity, airplay, alert-circle, alert-octagon, alert-triangle, align-center, align-justify, align-left, align-right, anchor, archive, at-sign, award, aperture, bar-chart, bar-chart-2, battery, battery-charging, bell, bell-off, bluetooth, book-open, book, bookmark, box, briefcase, calendar, camera, cast, chevron-down, chevron-up, circle, clipboard, clock, cloud-drizzle, cloud-lightning, cloud-rain, cloud-snow, cloud, codepen, codesandbox, code, coffee, columns, command, compass, copy, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, cpu, credit-card, crop, crosshair, database, delete, disc, dollar-sign, droplet, edit, edit-2, edit-3, eye, eye-off, external-link, facebook, fast-forward, figma, file-minus, file-plus, file-text, film, filter, flag, folder-minus, folder-plus, folder, framer, frown, gift, git-branch, git-commit, git-merge, git-pull-request, github, gitlab, globe, hard-drive, hash, headphones, heart, help-circle, hexagon, home, image, inbox, instagram, key, layers, layout, life-buoy, link, link-2, linkedin, list, lock, log-in, log-out, mail, map-pin, map, maximize, maximize-2, meh, menu, message-circle, message-square, mic-off, mic, minimize, minimize-2, minus, monitor, moon, more-horizontal, more-vertical, mouse-pointer, move, music, navigation, navigation-2, octagon, package, paperclip, pause, pause-circle, pen-tool, percent, phone-call, phone-forwarded, phone-incoming, phone-missed, phone-off, phone-outgoing, phone, play, pie-chart, play-circle, plus, plus-circle, plus-square, pocket, power, printer, radio, refresh-cw, refresh-ccw, repeat, rewind, rotate-ccw, rotate-cw, rss, save, scissors, search, send, settings, share-2, shield, shield-off, shopping-bag, shopping-cart, shuffle, skip-back, skip-forward, slack, slash, sliders, smartphone, smile, speaker, star, stop-circle, sun, sunrise, sunset, tablet, tag, target, terminal, thermometer, thumbs-down, thumbs-up, toggle-left, toggle-right, tool, trash, trash-2, triangle, truck, tv, twitch, twitter, type, umbrella, unlock, user-check, user-minus, user-plus, user-x, user, users, video-off, video, voicemail, volume, volume-1, volume-2, volume-x, watch, wifi-off, wifi, wind, x-circle, x-octagon, x-square, x, youtube, zap-off, zap, zoom-in, zoom-out, default */
          /***/
          function(t) {
            t.exports = { activity: ["pulse", "health", "action", "motion"], airplay: ["stream", "cast", "mirroring"], "alert-circle": ["warning", "alert", "danger"], "alert-octagon": ["warning", "alert", "danger"], "alert-triangle": ["warning", "alert", "danger"], "align-center": ["text alignment", "center"], "align-justify": ["text alignment", "justified"], "align-left": ["text alignment", "left"], "align-right": ["text alignment", "right"], anchor: [], archive: ["index", "box"], "at-sign": ["mention", "at", "email", "message"], award: ["achievement", "badge"], aperture: ["camera", "photo"], "bar-chart": ["statistics", "diagram", "graph"], "bar-chart-2": ["statistics", "diagram", "graph"], battery: ["power", "electricity"], "battery-charging": ["power", "electricity"], bell: ["alarm", "notification", "sound"], "bell-off": ["alarm", "notification", "silent"], bluetooth: ["wireless"], "book-open": ["read", "library"], book: ["read", "dictionary", "booklet", "magazine", "library"], bookmark: ["read", "clip", "marker", "tag"], box: ["cube"], briefcase: ["work", "bag", "baggage", "folder"], calendar: ["date"], camera: ["photo"], cast: ["chromecast", "airplay"], "chevron-down": ["expand"], "chevron-up": ["collapse"], circle: ["off", "zero", "record"], clipboard: ["copy"], clock: ["time", "watch", "alarm"], "cloud-drizzle": ["weather", "shower"], "cloud-lightning": ["weather", "bolt"], "cloud-rain": ["weather"], "cloud-snow": ["weather", "blizzard"], cloud: ["weather"], codepen: ["logo"], codesandbox: ["logo"], code: ["source", "programming"], coffee: ["drink", "cup", "mug", "tea", "cafe", "hot", "beverage"], columns: ["layout"], command: ["keyboard", "cmd", "terminal", "prompt"], compass: ["navigation", "safari", "travel", "direction"], copy: ["clone", "duplicate"], "corner-down-left": ["arrow", "return"], "corner-down-right": ["arrow"], "corner-left-down": ["arrow"], "corner-left-up": ["arrow"], "corner-right-down": ["arrow"], "corner-right-up": ["arrow"], "corner-up-left": ["arrow"], "corner-up-right": ["arrow"], cpu: ["processor", "technology"], "credit-card": ["purchase", "payment", "cc"], crop: ["photo", "image"], crosshair: ["aim", "target"], database: ["storage", "memory"], delete: ["remove"], disc: ["album", "cd", "dvd", "music"], "dollar-sign": ["currency", "money", "payment"], droplet: ["water"], edit: ["pencil", "change"], "edit-2": ["pencil", "change"], "edit-3": ["pencil", "change"], eye: ["view", "watch"], "eye-off": ["view", "watch", "hide", "hidden"], "external-link": ["outbound"], facebook: ["logo", "social"], "fast-forward": ["music"], figma: ["logo", "design", "tool"], "file-minus": ["delete", "remove", "erase"], "file-plus": ["add", "create", "new"], "file-text": ["data", "txt", "pdf"], film: ["movie", "video"], filter: ["funnel", "hopper"], flag: ["report"], "folder-minus": ["directory"], "folder-plus": ["directory"], folder: ["directory"], framer: ["logo", "design", "tool"], frown: ["emoji", "face", "bad", "sad", "emotion"], gift: ["present", "box", "birthday", "party"], "git-branch": ["code", "version control"], "git-commit": ["code", "version control"], "git-merge": ["code", "version control"], "git-pull-request": ["code", "version control"], github: ["logo", "version control"], gitlab: ["logo", "version control"], globe: ["world", "browser", "language", "translate"], "hard-drive": ["computer", "server", "memory", "data"], hash: ["hashtag", "number", "pound"], headphones: ["music", "audio", "sound"], heart: ["like", "love", "emotion"], "help-circle": ["question mark"], hexagon: ["shape", "node.js", "logo"], home: ["house", "living"], image: ["picture"], inbox: ["email"], instagram: ["logo", "camera"], key: ["password", "login", "authentication", "secure"], layers: ["stack"], layout: ["window", "webpage"], "life-buoy": ["help", "life ring", "support"], link: ["chain", "url"], "link-2": ["chain", "url"], linkedin: ["logo", "social media"], list: ["options"], lock: ["security", "password", "secure"], "log-in": ["sign in", "arrow", "enter"], "log-out": ["sign out", "arrow", "exit"], mail: ["email", "message"], "map-pin": ["location", "navigation", "travel", "marker"], map: ["location", "navigation", "travel"], maximize: ["fullscreen"], "maximize-2": ["fullscreen", "arrows", "expand"], meh: ["emoji", "face", "neutral", "emotion"], menu: ["bars", "navigation", "hamburger"], "message-circle": ["comment", "chat"], "message-square": ["comment", "chat"], "mic-off": ["record", "sound", "mute"], mic: ["record", "sound", "listen"], minimize: ["exit fullscreen", "close"], "minimize-2": ["exit fullscreen", "arrows", "close"], minus: ["subtract"], monitor: ["tv", "screen", "display"], moon: ["dark", "night"], "more-horizontal": ["ellipsis"], "more-vertical": ["ellipsis"], "mouse-pointer": ["arrow", "cursor"], move: ["arrows"], music: ["note"], navigation: ["location", "travel"], "navigation-2": ["location", "travel"], octagon: ["stop"], package: ["box", "container"], paperclip: ["attachment"], pause: ["music", "stop"], "pause-circle": ["music", "audio", "stop"], "pen-tool": ["vector", "drawing"], percent: ["discount"], "phone-call": ["ring"], "phone-forwarded": ["call"], "phone-incoming": ["call"], "phone-missed": ["call"], "phone-off": ["call", "mute"], "phone-outgoing": ["call"], phone: ["call"], play: ["music", "start"], "pie-chart": ["statistics", "diagram"], "play-circle": ["music", "start"], plus: ["add", "new"], "plus-circle": ["add", "new"], "plus-square": ["add", "new"], pocket: ["logo", "save"], power: ["on", "off"], printer: ["fax", "office", "device"], radio: ["signal"], "refresh-cw": ["synchronise", "arrows"], "refresh-ccw": ["arrows"], repeat: ["loop", "arrows"], rewind: ["music"], "rotate-ccw": ["arrow"], "rotate-cw": ["arrow"], rss: ["feed", "subscribe"], save: ["floppy disk"], scissors: ["cut"], search: ["find", "magnifier", "magnifying glass"], send: ["message", "mail", "email", "paper airplane", "paper aeroplane"], settings: ["cog", "edit", "gear", "preferences"], "share-2": ["network", "connections"], shield: ["security", "secure"], "shield-off": ["security", "insecure"], "shopping-bag": ["ecommerce", "cart", "purchase", "store"], "shopping-cart": ["ecommerce", "cart", "purchase", "store"], shuffle: ["music"], "skip-back": ["music"], "skip-forward": ["music"], slack: ["logo"], slash: ["ban", "no"], sliders: ["settings", "controls"], smartphone: ["cellphone", "device"], smile: ["emoji", "face", "happy", "good", "emotion"], speaker: ["audio", "music"], star: ["bookmark", "favorite", "like"], "stop-circle": ["media", "music"], sun: ["brightness", "weather", "light"], sunrise: ["weather", "time", "morning", "day"], sunset: ["weather", "time", "evening", "night"], tablet: ["device"], tag: ["label"], target: ["logo", "bullseye"], terminal: ["code", "command line", "prompt"], thermometer: ["temperature", "celsius", "fahrenheit", "weather"], "thumbs-down": ["dislike", "bad", "emotion"], "thumbs-up": ["like", "good", "emotion"], "toggle-left": ["on", "off", "switch"], "toggle-right": ["on", "off", "switch"], tool: ["settings", "spanner"], trash: ["garbage", "delete", "remove", "bin"], "trash-2": ["garbage", "delete", "remove", "bin"], triangle: ["delta"], truck: ["delivery", "van", "shipping", "transport", "lorry"], tv: ["television", "stream"], twitch: ["logo"], twitter: ["logo", "social"], type: ["text"], umbrella: ["rain", "weather"], unlock: ["security"], "user-check": ["followed", "subscribed"], "user-minus": ["delete", "remove", "unfollow", "unsubscribe"], "user-plus": ["new", "add", "create", "follow", "subscribe"], "user-x": ["delete", "remove", "unfollow", "unsubscribe", "unavailable"], user: ["person", "account"], users: ["group"], "video-off": ["camera", "movie", "film"], video: ["camera", "movie", "film"], voicemail: ["phone"], volume: ["music", "sound", "mute"], "volume-1": ["music", "sound"], "volume-2": ["music", "sound"], "volume-x": ["music", "sound", "mute"], watch: ["clock", "time"], "wifi-off": ["disabled"], wifi: ["connection", "signal", "wireless"], wind: ["weather", "air"], "x-circle": ["cancel", "close", "delete", "remove", "times", "clear"], "x-octagon": ["delete", "stop", "alert", "warning", "times", "clear"], "x-square": ["cancel", "close", "delete", "remove", "times", "clear"], x: ["cancel", "close", "delete", "remove", "times", "clear"], youtube: ["logo", "video", "play"], "zap-off": ["flash", "camera", "lightning"], zap: ["flash", "camera", "lightning"], "zoom-in": ["magnifying glass"], "zoom-out": ["magnifying glass"] };
          }
        ),
        /***/
        "./src/to-svg.js": (
          /*!***********************!*\
            !*** ./src/to-svg.js ***!
            \***********************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var l = o(
              /*! ./icons */
              "./src/icons.js"
            ), a = i(l);
            function i(c) {
              return c && c.__esModule ? c : { default: c };
            }
            function u(c) {
              var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              if (console.warn("feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead."), !c)
                throw new Error("The required `key` (icon name) parameter is missing.");
              if (!a.default[c])
                throw new Error("No icon matching '" + c + "'. See the complete list of icons at https://feathericons.com");
              return a.default[c].toSvg(d);
            }
            r.default = u;
          }
        ),
        /***/
        0: (
          /*!**************************************************!*\
            !*** multi core-js/es/array/from ./src/index.js ***!
            \**************************************************/
          /*! no static exports found */
          /***/
          function(t, r, o) {
            o(
              /*! core-js/es/array/from */
              "./node_modules/core-js/es/array/from.js"
            ), t.exports = o(
              /*! /home/runner/work/feather/feather/src/index.js */
              "./src/index.js"
            );
          }
        )
        /******/
      })
    );
  });
})(Za);
var o1 = Za.exports;
const lr = /* @__PURE__ */ n1(o1), ql = Object.keys(lr.icons), r1 = {
  props: {
    name: {
      type: String,
      required: !0,
      validator(e) {
        const n = ql.includes(e);
        return n || (console.groupCollapsed(
          "[frappe-ui] name property for feather-icon must be one of "
        ), console.dir(ql), console.groupEnd()), n;
      }
    },
    color: {
      type: String,
      default: null
    },
    strokeWidth: {
      type: Number,
      default: 1.5
    }
  },
  render() {
    let e = lr.icons[this.name];
    return e || (e = lr.icons.circle), ae(
      "svg",
      Q(
        e.attrs,
        {
          fill: "none",
          stroke: "currentColor",
          color: this.color,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": this.strokeWidth,
          width: null,
          height: null,
          class: [e.attrs.class, "shrink-0"],
          innerHTML: e.contents
        },
        this.$attrs
      )
    );
  }
}, zt = r1, Rr = /* @__PURE__ */ N({
  __name: "LoadingIndicator",
  props: { scale: { required: !1, default: 100 } },
  setup(e) {
    return (n, t) => (A(), H("svg", {
      class: "max-w-xs animate-spin",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      style: yt(`scale: ${e.scale}%;`),
      viewBox: "0 0 24 24"
    }, [...t[0] || (t[0] = [
      I("circle", {
        class: "opacity-25",
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        "stroke-width": "4"
      }, null, -1),
      I("path", {
        class: "opacity-75",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      }, null, -1)
    ])], 4));
  }
}), l1 = { class: "rounded bg-surface-gray-7 px-2 py-1 text-xs text-ink-white shadow-xl" }, a1 = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "Tooltip",
  props: {
    text: { default: "" },
    hoverDelay: { default: 0.5 },
    placement: { default: "top" },
    arrowClass: { default: "fill-surface-gray-7" },
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    const n = e, t = k(() => n.hoverDelay * 1e3);
    return (r, o) => e.disabled ? F(r.$slots, "default", { key: 0 }) : (A(), q(s(Fp), {
      key: 1,
      delayDuration: t.value
    }, {
      default: P(() => [
        V(s(zp), null, {
          default: P(() => [
            V(s(Zp), { "as-child": "" }, {
              default: P(() => [
                F(r.$slots, "default")
              ]),
              _: 3
            }),
            V(s(Xp), null, {
              default: P(() => [
                n.text || r.$slots.body || r.$slots.content ? (A(), q(s(Gp), {
                  key: 0,
                  side: n.placement,
                  "side-offset": 4,
                  class: "z-[100]"
                }, {
                  default: P(() => [
                    F(r.$slots, "body", {}, () => [
                      I("div", l1, [
                        F(r.$slots, "content", {}, () => [
                          _e(W(n.text), 1)
                        ])
                      ])
                    ]),
                    V(s($p), {
                      class: le(n.arrowClass),
                      width: 8,
                      height: 4
                    }, null, 8, ["class"])
                  ]),
                  _: 3
                }, 8, ["side"])) : J("", !0)
              ]),
              _: 3
            })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["delayDuration"]));
  }
}), i1 = ["disabled", "ariaLabel", "type"], Pt = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "Button",
  props: {
    theme: { default: "gray" },
    size: { default: "sm" },
    variant: { default: "subtle" },
    label: {},
    icon: {},
    iconLeft: {},
    iconRight: {},
    tooltip: {},
    loading: { type: Boolean, default: !1 },
    loadingText: {},
    disabled: { type: Boolean, default: !1 },
    route: {},
    link: {},
    type: { default: "button" }
  },
  setup(e, { expose: n }) {
    const t = e, r = ta(), o = Ci(), l = k(() => {
      let v = {
        gray: "text-ink-white bg-surface-gray-7 hover:bg-surface-gray-6 active:bg-surface-gray-5",
        blue: "text-ink-white bg-blue-500 hover:bg-surface-blue-3 active:bg-blue-700",
        green: "text-ink-white bg-surface-green-3 hover:bg-green-700 active:bg-green-800",
        red: "text-ink-white bg-surface-red-5 hover:bg-surface-red-6 active:bg-surface-red-7"
      }[t.theme], y = {
        gray: "text-ink-gray-8 bg-surface-gray-2 hover:bg-surface-gray-3 active:bg-surface-gray-4",
        blue: "text-ink-blue-3 bg-surface-blue-2 hover:bg-blue-200 active:bg-blue-300",
        green: "text-green-800 bg-surface-green-2 hover:bg-green-200 active:bg-green-300",
        red: "text-red-700 bg-surface-red-2 hover:bg-surface-red-3 active:bg-surface-red-4"
      }[t.theme], m = {
        gray: "text-ink-gray-8 bg-surface-white bg-surface-white border border-outline-gray-2 hover:border-outline-gray-3 active:border-outline-gray-3 active:bg-surface-gray-4",
        blue: "text-ink-blue-3 bg-surface-white border border-outline-blue-1 hover:border-blue-400 active:border-blue-400 active:bg-blue-300",
        green: "text-green-800 bg-surface-white border border-outline-green-2 hover:border-green-500 active:border-green-500 active:bg-green-300",
        red: "text-red-700 bg-surface-white border border-outline-red-1 hover:border-outline-red-2 active:border-outline-red-2 active:bg-surface-red-3"
      }[t.theme], S = {
        gray: "text-ink-gray-8 bg-transparent hover:bg-surface-gray-3 active:bg-surface-gray-4",
        blue: "text-ink-blue-3 bg-transparent hover:bg-blue-200 active:bg-blue-300",
        green: "text-green-800 bg-transparent hover:bg-green-200 active:bg-green-300",
        red: "text-red-700 bg-transparent hover:bg-surface-red-3 active:bg-surface-red-4"
      }[t.theme], x = {
        gray: "focus-visible:ring focus-visible:ring-outline-gray-3",
        blue: "focus-visible:ring focus-visible:ring-blue-400",
        green: "focus-visible:ring focus-visible:ring-outline-green-2",
        red: "focus-visible:ring focus-visible:ring-outline-red-2"
      }[t.theme], h = {
        subtle: y,
        solid: v,
        outline: m,
        ghost: S
      }[t.variant], w = `${t.theme}-${t.variant}`, g = {
        "gray-solid": "bg-surface-gray-2 text-ink-gray-4",
        "gray-subtle": "bg-surface-gray-2 text-ink-gray-4",
        "gray-outline": "bg-surface-gray-2 text-ink-gray-4 border border-outline-gray-2",
        "gray-ghost": "text-ink-gray-4",
        "blue-solid": "bg-blue-300 text-ink-white",
        "blue-subtle": "bg-surface-blue-2 text-ink-blue-link",
        "blue-outline": "bg-surface-blue-2 text-ink-blue-link border border-outline-blue-1",
        "blue-ghost": "text-ink-blue-link",
        "green-solid": "bg-surface-green-2 text-ink-green-2",
        "green-subtle": "bg-surface-green-2 text-ink-green-2",
        "green-outline": "bg-surface-green-2 text-ink-green-2 border border-outline-green-2",
        "green-ghost": "text-ink-green-2",
        "red-solid": "bg-surface-red-2 text-ink-red-2",
        "red-subtle": "bg-surface-red-2 text-ink-red-2",
        "red-outline": "bg-surface-red-2 text-ink-red-2 border border-outline-red-1",
        "red-ghost": "text-ink-red-2"
      }[w], b = {
        sm: "h-7 text-base px-2 rounded",
        md: "h-8 text-base font-medium px-2.5 rounded",
        lg: "h-10 text-lg font-medium px-3 rounded-md",
        xl: "h-11.5 text-xl font-medium px-3.5 rounded-lg",
        "2xl": "h-13 text-2xl font-medium px-3.5 rounded-xl"
      }[t.size];
      return c.value && (b = {
        sm: "h-7 w-7 rounded",
        md: "h-8 w-8 rounded",
        lg: "h-10 w-10 rounded-md",
        xl: "h-11.5 w-11.5 rounded-lg",
        "2xl": "h-13 w-13 rounded-xl"
      }[t.size]), [
        "inline-flex items-center justify-center gap-2 transition-colors focus:outline-none shrink-0",
        i.value ? g : h,
        x,
        b
      ];
    }), a = k(() => ({
      sm: "h-4",
      md: "h-4.5",
      lg: "h-5",
      xl: "h-6",
      "2xl": "h-6"
    })[t.size]), i = k(() => t.disabled || t.loading), u = k(() => c.value ? t.label : null), c = k(() => t.icon || r.icon || d.value), d = k(() => {
      var m, S, x;
      if (!r.default)
        return !1;
      const v = r.default();
      if (!Array.isArray(v))
        return !1;
      let y = v[0];
      return !!(typeof ((m = y.type) == null ? void 0 : m.name) == "string" && ((x = (S = y.type) == null ? void 0 : S.name) != null && x.startsWith("lucide-")));
    }), f = () => {
      if (t.route)
        return o.push(t.route);
      if (t.link)
        return window.open(t.link, "_blank");
    }, p = M();
    return n({ rootRef: p }), (v, y) => {
      var m;
      return A(), q(a1, {
        text: e.tooltip,
        disabled: !((m = e.tooltip) != null && m.length)
      }, {
        default: P(() => [
          I("button", Q(v.$attrs, {
            class: l.value,
            onClick: f,
            disabled: i.value,
            ariaLabel: u.value,
            type: t.type,
            ref_key: "rootRef",
            ref: p
          }), [
            e.loading ? (A(), q(Rr, {
              key: 0,
              class: le({
                "h-3 w-3": e.size == "sm",
                "h-[13.5px] w-[13.5px]": e.size == "md",
                "h-[15px] w-[15px]": e.size == "lg",
                "h-4.5 w-4.5": e.size == "xl" || e.size == "2xl"
              })
            }, null, 8, ["class"])) : v.$slots.prefix || e.iconLeft ? F(v.$slots, "prefix", { key: 1 }, () => [
              e.iconLeft && typeof e.iconLeft == "string" ? (A(), q(zt, {
                key: 0,
                name: e.iconLeft,
                class: le(a.value),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : e.iconLeft ? (A(), q(Je(e.iconLeft), {
                key: 1,
                class: le(a.value)
              }, null, 8, ["class"])) : J("", !0)
            ]) : J("", !0),
            e.loading && e.loadingText ? (A(), H(be, { key: 2 }, [
              _e(W(e.loadingText), 1)
            ], 64)) : c.value && !e.loading ? (A(), H(be, { key: 3 }, [
              e.icon && typeof e.icon == "string" ? (A(), q(zt, {
                key: 0,
                name: e.icon,
                class: le(a.value),
                "aria-label": e.label
              }, null, 8, ["name", "class", "aria-label"])) : e.icon ? (A(), q(Je(e.icon), {
                key: 1,
                class: le(a.value)
              }, null, 8, ["class"])) : v.$slots.icon ? F(v.$slots, "icon", { key: 2 }) : d.value ? (A(), H("div", {
                key: 3,
                class: le(a.value)
              }, [
                F(v.$slots, "default", {}, () => [
                  _e(W(e.label), 1)
                ])
              ], 2)) : J("", !0)
            ], 64)) : (A(), H("span", {
              key: 4,
              class: le([{ "sr-only": c.value }, "truncate"])
            }, [
              F(v.$slots, "default", {}, () => [
                _e(W(e.label), 1)
              ])
            ], 2)),
            F(v.$slots, "suffix", {}, () => [
              e.iconRight && typeof e.iconRight == "string" ? (A(), q(zt, {
                key: 0,
                name: e.iconRight,
                class: le(a.value),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : e.iconRight ? (A(), q(Je(e.iconRight), {
                key: 1,
                class: le(a.value)
              }, null, 8, ["class"])) : J("", !0)
            ])
          ], 16, i1)
        ]),
        _: 3
      }, 8, ["text", "disabled"]);
    };
  }
}), s1 = { class: "w-full space-y-1.5" }, u1 = {
  key: 0,
  class: "block text-xs text-ink-gray-5"
}, d1 = ["onClick"], c1 = { class: "flex items-center overflow-hidden" }, f1 = {
  key: 0,
  class: "truncate text-base leading-5 text-ink-gray-8"
}, p1 = {
  key: 1,
  class: "text-base leading-5 text-ink-gray-4"
}, v1 = {
  key: 0,
  class: "sticky top-0 z-10 flex items-stretch space-x-1.5 bg-surface-modal py-1.5"
}, y1 = { class: "relative w-full" }, m1 = { class: "absolute right-0 inline-flex h-7 w-7 items-center justify-center" }, h1 = {
  key: 0,
  class: "sticky top-10 truncate bg-surface-modal px-2.5 py-1.5 text-sm font-medium text-ink-gray-5"
}, g1 = { class: "flex flex-1 gap-2 overflow-hidden items-center" }, b1 = {
  key: 0,
  class: "flex flex-shrink-0"
}, x1 = {
  key: 1,
  class: "h-4 w-4"
}, w1 = { class: "flex-1 truncate text-ink-gray-7" }, _1 = {
  key: 0,
  class: "ml-2 flex-shrink-0"
}, S1 = {
  key: 0,
  class: "text-sm text-ink-gray-5"
}, C1 = {
  key: 1,
  class: "rounded-md px-2.5 py-1.5 text-base text-ink-gray-5"
}, A1 = {
  key: 0,
  class: "border-t p-1"
}, O1 = {
  key: 0,
  class: "flex items-center justify-end"
}, E1 = {
  key: 1,
  class: "flex items-center justify-end"
}, T1 = /* @__PURE__ */ N({
  __name: "Autocomplete",
  props: {
    label: {},
    options: {},
    hideSearch: { type: Boolean, default: !1 },
    placeholder: {},
    bodyClasses: {},
    loading: { type: Boolean },
    placement: {},
    showFooter: { type: Boolean },
    compareFn: { type: Function, default: (e, n) => e.value === n.value },
    maxOptions: { default: 50 },
    multiple: { type: Boolean, default: !1 },
    modelValue: { type: [Array, null, String, Number, Boolean, Object] }
  },
  emits: ["update:modelValue", "update:query", "change"],
  setup(e, { expose: n, emit: t }) {
    const r = e, o = t, l = M(), a = M(!1), i = M(""), u = k(() => {
      var j;
      if (!((j = r.options) != null && j.length))
        return [];
      let _;
      return b(r.options[0]) ? _ = r.options : _ = [
        {
          group: "",
          items: d(r.options),
          hideLabel: !1
        }
      ], _.map(($, R) => ({
        key: R,
        group: $.group,
        hideLabel: $.hideLabel,
        items: f(d($.items || []))
      })).filter(($) => $.items.length > 0);
    }), c = k(() => u.value.flatMap((_) => _.items)), d = (_) => _ ? _.map((j) => g(j) ? j : { label: j.toString(), value: j }) : [], f = (_) => i.value ? _.filter((j) => j.label.toLowerCase().includes(i.value.trim().toLowerCase()) || j.value.toString().toLowerCase().includes(i.value.trim().toLowerCase())) : _, p = k({
      get() {
        if (!r.multiple)
          return v(r.modelValue) || // if the modelValue is not found in the option list
          // return the modelValue as is
          y(r.modelValue);
        const _ = r.modelValue || [];
        return g(_[0]) ? _ : _.map((j) => v(j) || y(j));
      },
      set(_) {
        i.value = "", _ && !r.multiple && (a.value = !1), o("update:modelValue", _), o("change", _);
      }
    }), v = (_) => {
      if (!_)
        return _;
      const j = g(_) ? _.value : _;
      return c.value.find(($) => $.value === j);
    }, y = (_) => g(_) ? _ : { label: _, value: _ }, m = (_) => g(_) ? (_ == null ? void 0 : _.label) || (_ == null ? void 0 : _.value) : _, S = k(() => p.value ? r.multiple ? p.value.map((_) => m(_)).join(", ") : m(p.value) : ""), x = (_) => {
      if (!p.value)
        return !1;
      const j = g(_) ? _.value : _;
      return r.multiple ? p.value.find(
        ($) => g($) ? $.value === j : $ === j
      ) : p.value === j;
    }, h = k(() => {
      var _;
      return r.multiple ? c.value.length === ((_ = p.value) == null ? void 0 : _.length) : !1;
    }), w = () => {
      p.value = c.value;
    }, C = () => {
      p.value = r.multiple ? [] : void 0;
    }, g = (_) => typeof _ == "object", b = (_) => typeof _ == "object" && "items" in _ && "group" in _;
    pe(
      () => i.value,
      () => {
        o("update:query", i.value);
      }
    ), pe(
      () => a.value,
      () => {
        a.value && ge(() => {
          var _;
          return (_ = l.value) == null ? void 0 : _.$el.focus();
        });
      }
    );
    const O = M();
    return n({
      rootRef: O,
      togglePopover: () => {
        a.value = !a.value;
      }
    }), (_, j) => (A(), q(s(Cs), {
      modelValue: p.value,
      "onUpdate:modelValue": j[2] || (j[2] = ($) => p.value = $),
      multiple: e.multiple,
      nullable: "",
      by: e.compareFn
    }, {
      default: P(({ open: $ }) => [
        V(s(e1), {
          class: "w-full",
          show: a.value,
          "onUpdate:show": j[1] || (j[1] = (R) => a.value = R),
          ref_key: "rootRef",
          ref: O,
          placement: e.placement,
          "match-target-width": !0
        }, {
          target: P(({ open: R, togglePopover: B, close: z }) => [
            F(_.$slots, "target", Ie(Be({
              open: R,
              close: z,
              togglePopover: B,
              isOpen: $
            })), () => [
              I("div", s1, [
                r.label ? (A(), H("label", u1, W(r.label), 1)) : J("", !0),
                I("button", {
                  class: le(["flex h-7 w-full items-center justify-between gap-2 rounded bg-surface-gray-2 px-2 py-1 transition-colors hover:bg-surface-gray-3 border border-transparent focus:border-outline-gray-4 focus:outline-none focus:ring-2 focus:ring-outline-gray-3", { "bg-surface-gray-3": $ }]),
                  onClick: () => B()
                }, [
                  I("div", c1, [
                    F(_.$slots, "prefix"),
                    S.value ? (A(), H("span", f1, W(S.value), 1)) : (A(), H("span", p1, W(e.placeholder || ""), 1)),
                    F(_.$slots, "suffix")
                  ]),
                  V(zt, {
                    name: "chevron-down",
                    class: "h-4 w-4 text-ink-gray-5",
                    "aria-hidden": "true"
                  })
                ], 10, d1)
              ])
            ])
          ]),
          body: P(({ isOpen: R, togglePopover: B }) => [
            Le(I("div", null, [
              I("div", {
                class: le(["relative mt-1 rounded-lg bg-surface-modal text-base shadow-2xl", e.bodyClasses])
              }, [
                V(s(Os), {
                  class: le(["max-h-[15rem] overflow-y-auto px-1.5 pb-1.5", { "pt-1.5": e.hideSearch }]),
                  static: ""
                }, {
                  default: P(() => [
                    e.hideSearch ? J("", !0) : (A(), H("div", v1, [
                      I("div", y1, [
                        V(s(As), {
                          ref_key: "searchInput",
                          ref: l,
                          class: "form-input w-full focus:bg-surface-gray-3 hover:bg-surface-gray-4 text-ink-gray-8",
                          type: "text",
                          value: i.value,
                          onChange: j[0] || (j[0] = (z) => i.value = z.target.value),
                          autocomplete: "off",
                          placeholder: "Search"
                        }, null, 8, ["value"]),
                        I("div", m1, [
                          r.loading ? (A(), q(Rr, {
                            key: 0,
                            class: "h-4 w-4 text-ink-gray-5"
                          })) : (A(), H("button", {
                            key: 1,
                            onClick: C
                          }, [
                            V(zt, {
                              name: "x",
                              class: "w-4 text-ink-gray-8"
                            })
                          ]))
                        ])
                      ])
                    ])),
                    (A(!0), H(be, null, ot(u.value, (z) => Le((A(), H("div", {
                      key: z.key
                    }, [
                      z.group && !z.hideLabel ? (A(), H("div", h1, W(z.group), 1)) : J("", !0),
                      (A(!0), H(be, null, ot(z.items.slice(
                        0,
                        r.maxOptions
                      ), (U, oe) => (A(), q(s(Es), {
                        as: "template",
                        key: oe,
                        value: U,
                        disabled: U.disabled
                      }, {
                        default: P(({ active: ne, selected: ue }) => [
                          I("li", {
                            class: le([
                              "flex cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-base",
                              {
                                "bg-surface-gray-3": ne,
                                "opacity-50": U.disabled
                              }
                            ])
                          }, [
                            I("div", g1, [
                              _.$slots["item-prefix"] || r.multiple ? (A(), H("div", b1, [
                                F(_.$slots, "item-prefix", Q({ ref_for: !0 }, { active: ne, selected: ue, option: U }), () => [
                                  x(U) ? (A(), q(zt, {
                                    key: 0,
                                    name: "check",
                                    class: "h-4 w-4 text-ink-gray-7"
                                  })) : (A(), H("div", x1))
                                ])
                              ])) : J("", !0),
                              I("span", w1, W(m(U)), 1)
                            ]),
                            _.$slots["item-suffix"] || U != null && U.description ? (A(), H("div", _1, [
                              F(_.$slots, "item-suffix", Q({ ref_for: !0 }, { active: ne, selected: ue, option: U }), () => [
                                U != null && U.description ? (A(), H("div", S1, W(U.description), 1)) : J("", !0)
                              ])
                            ])) : J("", !0)
                          ], 2)
                        ]),
                        _: 2
                      }, 1032, ["value", "disabled"]))), 128))
                    ])), [
                      [tl, z.items.length > 0]
                    ])), 128)),
                    u.value.length == 0 ? (A(), H("li", C1, " No results found ")) : J("", !0)
                  ]),
                  _: 3
                }, 8, ["class"]),
                _.$slots.footer || r.showFooter || e.multiple ? (A(), H("div", A1, [
                  F(_.$slots, "footer", Ie(Be({ togglePopover: B })), () => [
                    e.multiple ? (A(), H("div", O1, [
                      h.value ? J("", !0) : (A(), q(s(Pt), {
                        key: 0,
                        label: "Select All",
                        onClick: xe(w, ["stop"])
                      })),
                      h.value ? (A(), q(s(Pt), {
                        key: 1,
                        label: "Clear All",
                        onClick: xe(C, ["stop"])
                      })) : J("", !0)
                    ])) : (A(), H("div", E1, [
                      V(s(Pt), {
                        label: "Clear",
                        onClick: xe(C, ["stop"])
                      })
                    ]))
                  ])
                ])) : J("", !0)
              ], 2)
            ], 512), [
              [tl, R]
            ])
          ]),
          _: 2
        }, 1032, ["show", "placement"])
      ]),
      _: 3
    }, 8, ["modelValue", "multiple", "by"]));
  }
}), k1 = {
  class: "lucide lucide-check",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function j1(e, n) {
  return A(), H("svg", k1, [...n[0] || (n[0] = [
    I("path", { d: "M20 6 9 17l-5-5" }, null, -1)
  ])]);
}
const ar = un({ name: "lucide-check", render: j1 }), P1 = {
  class: "lucide lucide-chevron-down",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function I1(e, n) {
  return A(), H("svg", P1, [...n[0] || (n[0] = [
    I("path", { d: "m6 9 6 6 6-6" }, null, -1)
  ])]);
}
const Qa = un({ name: "lucide-chevron-down", render: I1 }), M1 = /* @__PURE__ */ N({
  __name: "Badge",
  props: {
    theme: { default: "gray" },
    size: { default: "md" },
    variant: { default: "subtle" },
    label: {}
  },
  setup(e) {
    const n = e, t = k(() => {
      let r = {
        gray: "text-ink-white bg-surface-gray-7",
        blue: "text-ink-blue-1 bg-surface-blue-2",
        green: "text-ink-green-1 bg-surface-green-3",
        orange: "text-ink-amber-1 bg-surface-amber-2",
        red: "text-ink-red-1 bg-surface-red-4"
      }[n.theme], o = {
        gray: "text-ink-gray-6 bg-surface-gray-2",
        blue: "text-ink-blue-2 bg-surface-blue-2",
        green: "text-ink-green-3 bg-surface-green-2",
        orange: "text-ink-amber-3 bg-surface-amber-1",
        red: "text-ink-red-4 bg-surface-red-2"
      }[n.theme], l = {
        gray: "text-ink-gray-6 bg-transparent border border-outline-gray-1",
        blue: "text-ink-blue-2 bg-transparent border border-outline-blue-1",
        green: "text-ink-green-3 bg-transparent border border-outline-green-2",
        orange: "text-ink-amber-3 bg-transparent border border-outline-amber-2",
        red: "text-ink-red-4 bg-transparent border border-outline-red-2"
      }[n.theme], a = {
        gray: "text-ink-gray-6 bg-transparent",
        blue: "text-ink-blue-2 bg-transparent",
        green: "text-ink-green-3 bg-transparent",
        orange: "text-ink-amber-3 bg-transparent",
        red: "text-ink-red-4 bg-transparent"
      }[n.theme], i = {
        subtle: o,
        solid: r,
        outline: l,
        ghost: a
      }[n.variant], u = {
        sm: "h-4 text-xs px-1.5",
        md: "h-5 text-xs px-1.5",
        lg: "h-6 text-sm px-2",
        xl: "h-7 text-base px-2"
      }[n.size];
      return [i, u];
    });
    return (r, o) => (A(), H("div", {
      class: le(["inline-flex select-none items-center gap-1 rounded-full whitespace-nowrap", t.value])
    }, [
      r.$slots.prefix ? (A(), H("div", {
        key: 0,
        class: le([n.size == "lg" ? "max-h-6" : "max-h-4"])
      }, [
        F(r.$slots, "prefix")
      ], 2)) : J("", !0),
      F(r.$slots, "default", {}, () => {
        var l;
        return [
          _e(W((l = n.label) == null ? void 0 : l.toString()), 1)
        ];
      }),
      r.$slots.suffix ? (A(), H("div", {
        key: 1,
        class: le([n.size == "lg" ? "max-h-6" : "max-h-4"])
      }, [
        F(r.$slots, "suffix")
      ], 2)) : J("", !0)
    ], 2));
  }
});
let R1 = 0;
function D1() {
  return ++R1;
}
function Dr() {
  return "frappe-ui-" + D1();
}
const L1 = { class: "flex flex-col gap-1" }, $1 = { class: "flex items-center" }, q1 = ["for"], B1 = {
  key: 0,
  class: "max-w-xs text-p-sm text-ink-gray-7"
}, Bl = "mr-2 h-4 w-4 flex-shrink-0 text-ink-gray-6", ct = /* @__PURE__ */ N({
  __name: "Switch",
  props: /* @__PURE__ */ Zn({
    size: { default: "sm" },
    label: { default: "" },
    description: { default: "" },
    disabled: { type: Boolean, default: !1 },
    icon: {},
    labelClasses: { default: "" }
  }, {
    modelValue: { type: Boolean, default: !1 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Zn(["change"], ["update:modelValue"]),
  setup(e, { emit: n }) {
    const t = e, r = vr(e, "modelValue"), o = n;
    pe(r, (d) => {
      o("change", d);
    });
    const l = Dr(), a = k(() => [
      "relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-100 ease-in-out items-center",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3",
      "disabled:cursor-not-allowed disabled:bg-surface-gray-3",
      r.value ? "bg-surface-gray-7 enabled:hover:bg-surface-gray-6 active:bg-surface-gray-5 group-hover:enabled:bg-surface-gray-6" : "bg-surface-gray-4 enabled:hover:bg-gray-400 active:bg-gray-500 group-hover:enabled:bg-gray-400",
      t.size === "md" ? "h-5 w-8 border-[3px]" : "h-4 w-[26px] border-2"
    ]), i = k(() => [
      "pointer-events-none inline-block transform rounded-full bg-surface-white shadow ring-0 transition duration-100 ease-in-out",
      t.size === "md" ? "h-3.5 w-3.5" : "h-3 w-3",
      t.size === "md" ? r.value ? "translate-x-3 rtl:-translate-x-3" : "translate-x-0" : r.value ? "translate-x-2.5 rtl:-translate-x-2.5" : "translate-x-0"
    ]), u = k(() => [
      "font-medium leading-normal",
      t.disabled && !t.description ? "text-ink-gray-4" : "text-ink-gray-8",
      t.size === "md" ? "text-lg" : "text-base",
      t.labelClasses
    ]), c = k(() => {
      if (!t.label)
        return;
      const d = ["flex justify-between"];
      return t.description ? (d.push("items-start"), d.push(
        t.size === "md" ? "px-3 space-x-3.5" : "px-2.5 space-x-2.5"
      )) : (d.push(
        "group items-center space-x-3 cursor-pointer rounded focus-visible:bg-surface-gray-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3"
      ), d.push(
        t.disabled ? "cursor-not-allowed" : "hover:bg-surface-gray-3 active:bg-surface-gray-4"
      ), d.push(t.size === "md" ? "px-3 py-1.5" : "px-2.5 py-1.5")), d;
    });
    return (d, f) => (A(), H("div", {
      class: le(c.value)
    }, [
      I("div", L1, [
        I("div", $1, [
          t.icon && typeof t.icon == "string" ? (A(), q(zt, {
            key: 0,
            name: t.icon,
            class: le(Bl),
            "aria-hidden": "true"
          }, null, 8, ["name"])) : t.icon ? (A(), q(Je(t.icon), {
            key: 1,
            class: le(Bl)
          })) : J("", !0),
          I("label", {
            class: le(u.value),
            for: s(l)
          }, W(t.label), 11, q1)
        ]),
        t.description ? (A(), H("span", B1, W(t.description), 1)) : J("", !0)
      ]),
      V(s(op), {
        id: s(l),
        modelValue: r.value,
        "onUpdate:modelValue": f[0] || (f[0] = (p) => r.value = p),
        onKeyup: f[1] || (f[1] = At(xe((p) => r.value = !r.value, ["self"]), ["space"])),
        class: le(a.value),
        disabled: t.disabled
      }, {
        default: P(() => [
          V(s(lp), {
            class: le(i.value)
          }, null, 8, ["class"])
        ]),
        _: 1
      }, 8, ["id", "modelValue", "class", "disabled"])
    ], 2));
  }
}), ei = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [r, o] of n)
    t[r] = o;
  return t;
}, F1 = { class: "relative" }, N1 = { class: "flex items-center gap-2 flex-1 overflow-hidden" }, V1 = { class: "flex items-center gap-2 pr-6 flex-1" }, z1 = { class: "flex items-center gap-2 pr-6 flex-1" }, H1 = /* @__PURE__ */ N({
  __name: "Combobox",
  props: {
    variant: { default: "subtle" },
    options: { default: () => [] },
    modelValue: {},
    placeholder: {},
    disabled: { type: Boolean },
    openOnFocus: { type: Boolean },
    openOnClick: { type: Boolean },
    placement: {}
  },
  emits: ["update:modelValue", "update:selectedOption", "focus", "blur", "input"],
  setup(e, { expose: n, emit: t }) {
    const r = e, o = t, l = M(g(r.modelValue)), a = M(r.modelValue), i = M(!1), u = M(!1), c = M("");
    pe(
      () => r.modelValue,
      (D) => {
        a.value = D, l.value = g(D);
      }
    ), pe(
      () => g(r.modelValue),
      (D) => {
        u.value || (l.value = D);
      }
    );
    const d = (D) => {
      const Z = D && C.value.find((G) => m(G) === D) || null;
      if (Z && p(Z)) {
        const G = { searchTerm: c.value };
        Z.onClick(G), Z.keepOpen ? setTimeout(() => {
          i.value = !0;
        }, 0) : (i.value = !1, l.value = g(a.value), c.value = "", u.value = !1);
        return;
      }
      a.value = D, o("update:modelValue", D), l.value = g(D), c.value = "", u.value = !1, o("update:selectedOption", Z);
    };
    function f(D) {
      return typeof D == "object" && "group" in D;
    }
    function p(D) {
      return typeof D == "object" && D.type === "custom";
    }
    function v(D) {
      return typeof D == "string" ? D : D.label;
    }
    function y(D) {
      if (typeof D == "string")
        return D;
      if (!p(D))
        return D.value;
    }
    function m(D) {
      return typeof D == "string" ? D : p(D) ? D.key : D.value;
    }
    function S(D) {
      return typeof D == "object" && !!D.disabled;
    }
    function x(D) {
      return typeof D == "object" ? D.icon : void 0;
    }
    function h(D) {
      return p(D) ? D.slotName : void 0;
    }
    function w(D) {
      return p(D) ? D.render : void 0;
    }
    const C = k(() => {
      const D = [];
      return r.options.forEach((Z) => {
        f(Z) ? D.push(...Z.options) : D.push(Z);
      }), D;
    });
    function g(D) {
      if (!D)
        return "";
      const G = r.options.flatMap(
        (ve) => f(ve) ? ve.options : ve
      ).find((ve) => m(ve) === D);
      return G ? v(G) : D || "";
    }
    const b = k(() => a.value ? C.value.find(
      (D) => m(D) === a.value
    ) : null), O = k(() => b.value ? x(b.value) : void 0), T = (D) => {
      if (!D.icon)
        return null;
      const Z = typeof D.icon == "string" ? ae("span", D.icon) : ae(D.icon, { class: "w-4 h-4" });
      return ae(
        "span",
        {
          class: "flex-shrink-0 w-4 h-4 inline-flex items-center justify-center"
        },
        [Z]
      );
    }, _ = (D, Z, G) => {
      var ce;
      if (p(D))
        return D.condition ? D.condition(G) : Z ? v(D).toLowerCase().includes(Z.toLowerCase()) : !0;
      if (!Z)
        return !0;
      const ve = v(D).toLowerCase(), re = ((ce = y(D)) == null ? void 0 : ce.toLowerCase()) || "", ye = Z.toLowerCase();
      return ve.includes(ye) || re.includes(ye);
    }, j = (D, Z) => {
      const G = { searchTerm: Z }, ve = [];
      return D.forEach((re) => {
        if (f(re)) {
          const ye = re.options.filter(
            (ce) => _(ce, Z, G)
          );
          ye.length > 0 && ve.push({ ...re, options: ye });
        } else
          _(re, Z, G) && ve.push(re);
      }), ve;
    }, $ = k(() => i.value && !u.value && a.value ? r.options : j(r.options, l.value)), R = (D) => {
      const Z = D.target;
      l.value = Z.value, c.value = Z.value, u.value = !0, l.value === "" && (a.value = null, o("update:modelValue", null)), o("input", l.value);
    }, B = (D) => {
      i.value = D, D || (l.value = g(a.value)), u.value = !1;
    }, z = (D) => {
      r.openOnFocus && (i.value = !0), o("focus", D);
    }, U = (D) => {
      o("blur", D);
    }, oe = () => {
      r.openOnClick && (i.value = !0);
    }, ne = () => {
      l.value = "", u.value = !1, a.value = null, o("update:modelValue", null), o("update:selectedOption", null);
    }, ue = k(() => {
      const D = "border focus-within:border-outline-gray-4 focus-within:ring-2 focus-within:ring-outline-gray-3";
      return {
        subtle: `${D} bg-surface-gray-2 hover:bg-surface-gray-3 border-transparent`,
        outline: `${D} border-outline-gray-2`,
        ghost: ""
      }[r.variant];
    });
    return n({
      reset: ne
    }), (D, Z) => (A(), H("div", F1, [
      V(s(Mc), {
        "model-value": a.value,
        "onUpdate:modelValue": d,
        "onUpdate:open": B,
        "ignore-filter": !0,
        open: i.value
      }, {
        default: P(() => [
          V(s(fc), {
            class: le(["flex h-7 w-full items-center justify-between gap-2 rounded px-2 py-1 transition-colors", {
              "opacity-50 pointer-events-none": e.disabled,
              [ue.value]: !0
            }]),
            onClick: oe
          }, {
            default: P(() => [
              I("div", N1, [
                F(D.$slots, "prefix"),
                O.value ? (A(), q(T, {
                  key: 0,
                  icon: O.value
                }, null, 8, ["icon"])) : J("", !0),
                V(s(Uc), {
                  value: l.value,
                  onInput: R,
                  onFocus: z,
                  onBlur: U,
                  class: "bg-transparent p-0 focus:outline-0 border-0 focus:border-0 focus:ring-0 text-base text-ink-gray-8 h-full placeholder:text-ink-gray-4 w-full",
                  placeholder: e.placeholder || "",
                  disabled: e.disabled,
                  autocomplete: "off"
                }, null, 8, ["value", "placeholder", "disabled"])
              ]),
              V(s(Qc), { disabled: e.disabled }, {
                default: P(() => [
                  V(s(Qa), { class: "h-4 w-4 text-ink-gray-5" })
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            _: 3
          }, 8, ["class"]),
          V(s(Jc), null, {
            default: P(() => [
              V(s(qc), {
                class: "z-10 min-w-[--reka-combobox-trigger-width] mt-1 bg-surface-modal overflow-hidden rounded-lg shadow-2xl",
                position: "popper",
                onOpenAutoFocus: Z[0] || (Z[0] = xe(() => {
                }, ["prevent"])),
                onCloseAutoFocus: Z[1] || (Z[1] = xe(() => {
                }, ["prevent"])),
                align: r.placement || "start"
              }, {
                default: P(() => [
                  V(s(tf), {
                    class: le(["max-h-60 overflow-auto pb-1.5", { "px-1.5 pt-1.5": !f($.value[0]) }])
                  }, {
                    default: P(() => [
                      V(s(Fc), { class: "text-ink-gray-5 text-base text-center py-1.5 px-2.5" }, {
                        default: P(() => [
                          _e(' No results found for "' + W(l.value) + '" ', 1)
                        ]),
                        _: 1
                      }),
                      (A(!0), H(be, null, ot($.value, (G, ve) => (A(), H(be, { key: ve }, [
                        f(G) ? (A(), q(s(zc), {
                          key: 0,
                          class: "px-1.5"
                        }, {
                          default: P(() => [
                            V(s(Yc), { class: "px-2.5 pt-3 pb-1.5 text-sm font-medium text-ink-gray-5 sticky top-0 bg-surface-modal z-10" }, {
                              default: P(() => [
                                _e(W(G.group), 1)
                              ]),
                              _: 2
                            }, 1024),
                            (A(!0), H(be, null, ot(G.options, (re, ye) => (A(), q(s(Ml), {
                              key: `${ve}-${ye}`,
                              value: m(re),
                              disabled: S(re),
                              class: "text-base leading-none text-ink-gray-7 rounded flex items-center h-7 px-2.5 py-1.5 relative select-none data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-surface-gray-3"
                            }, {
                              default: P(() => [
                                h(re) ? F(D.$slots, h(re), {
                                  key: 0,
                                  option: re,
                                  searchTerm: l.value
                                }) : w(re) ? (A(), q(Je(w(re)), { key: 1 })) : (A(), H(be, { key: 2 }, [
                                  I("span", V1, [
                                    V(T, {
                                      icon: x(re)
                                    }, null, 8, ["icon"]),
                                    _e(" " + W(v(re)), 1)
                                  ]),
                                  V(s(Rl), { class: "absolute right-0 w-6 inline-flex items-center justify-center" }, {
                                    default: P(() => [
                                      V(s(ar), { class: "size-4" })
                                    ]),
                                    _: 1
                                  })
                                ], 64))
                              ]),
                              _: 2
                            }, 1032, ["value", "disabled"]))), 128))
                          ]),
                          _: 2
                        }, 1024)) : (A(), q(s(Ml), {
                          key: ve,
                          value: m(G),
                          disabled: S(G),
                          class: "text-base leading-none text-ink-gray-7 rounded flex items-center h-7 px-2.5 py-1.5 relative select-none data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-surface-gray-3"
                        }, {
                          default: P(() => [
                            h(G) ? F(D.$slots, h(G), {
                              key: 0,
                              option: G,
                              searchTerm: l.value
                            }) : w(G) ? (A(), q(Je(w(G)), { key: 1 })) : (A(), H(be, { key: 2 }, [
                              I("span", z1, [
                                x(G) ? (A(), q(T, {
                                  key: 0,
                                  icon: x(G)
                                }, null, 8, ["icon"])) : J("", !0),
                                _e(" " + W(v(G)), 1)
                              ]),
                              V(s(Rl), { class: "absolute right-0 w-6 inline-flex items-center justify-center" }, {
                                default: P(() => [
                                  V(s(ar), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              })
                            ], 64))
                          ]),
                          _: 2
                        }, 1032, ["value", "disabled"]))
                      ], 64))), 128))
                    ]),
                    _: 3
                  }, 8, ["class"])
                ]),
                _: 3
              }, 8, ["align"])
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["model-value", "open"])
    ]));
  }
}), U1 = ["disabled", "id", "checked"], K1 = ["for"], W1 = /* @__PURE__ */ N({
  __name: "Checkbox",
  props: {
    size: { default: "sm" },
    label: {},
    disabled: { type: Boolean },
    padding: { type: Boolean, default: !1 },
    modelValue: { type: [Boolean, Number] },
    id: {}
  },
  setup(e) {
    const n = e, t = ao(), r = n.id ?? Dr(), o = k(() => [
      {
        sm: "text-base font-medium",
        md: "text-lg font-medium"
      }[n.size],
      n.disabled ? "text-ink-gray-4" : "text-ink-gray-8",
      "select-none"
    ]), l = k(() => {
      let a = n.disabled ? "border-outline-gray-2 bg-surface-menu-bar text-ink-gray-3" : "border-outline-gray-4 text-ink-gray-9 hover:border-outline-gray-5 focus:ring-offset-0 focus:border-outline-gray-8 active:border-outline-gray-6 transition", i = n.disabled ? "" : n.padding ? "focus:ring-0" : "hover:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3 active:bg-surface-gray-2", u = {
        sm: "w-3.5 h-3.5",
        md: "w-4 h-4"
      }[n.size];
      return [a, i, u];
    });
    return (a, i) => (A(), H("div", {
      class: le(["inline-flex space-x-2 rounded transition", {
        "px-2.5 py-1.5": e.padding && e.size === "sm",
        "px-3 py-2": e.padding && e.size === "md",
        "focus-within:bg-surface-gray-2 focus-within:ring-2 focus-within:ring-outline-gray-3 hover:bg-surface-gray-3 active:bg-surface-gray-4": e.padding && !e.disabled
      }])
    }, [
      I("input", Q({
        class: ["rounded-sm mt-[1px] bg-surface-white", l.value],
        type: "checkbox",
        disabled: e.disabled,
        id: s(r),
        checked: !!e.modelValue,
        onChange: i[0] || (i[0] = (u) => a.$emit("update:modelValue", u.target.checked))
      }, s(t)), null, 16, U1),
      e.label ? (A(), H("label", {
        key: 0,
        class: le(["block", o.value]),
        for: s(r)
      }, W(e.label), 11, K1)) : J("", !0)
    ], 2));
  }
}), G1 = ["type", "placeholder", "disabled", "id", "value", "required"], Y1 = /* @__PURE__ */ N({
  inheritAttrs: !1,
  __name: "TextInput",
  props: {
    type: { default: "text" },
    size: { default: "sm" },
    variant: { default: "subtle" },
    placeholder: {},
    disabled: { type: Boolean },
    id: {},
    modelValue: {},
    debounce: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: n, emit: t }) {
    const r = e, o = t, l = ta(), a = ao(), i = k(() => Object.fromEntries(
      // class and style is passed to the root element
      Object.entries(a).filter(([m]) => m !== "class" && m !== "style")
    )), u = M(null);
    n({ el: u });
    const c = k(() => r.disabled ? "text-ink-gray-5" : "text-ink-gray-8"), d = k(() => {
      let m = {
        sm: "text-base rounded h-7",
        md: "text-base rounded h-8",
        lg: "text-lg rounded-md h-10",
        xl: "text-xl rounded-md h-10"
      }[r.size], S = {
        sm: [
          "py-1.5",
          l.prefix ? "pl-8" : "pl-2",
          l.suffix ? "pr-8" : "pr-2"
        ],
        md: [
          "py-1.5",
          l.prefix ? "pl-9" : "pl-2.5",
          l.suffix ? "pr-9" : "pr-2.5"
        ],
        lg: [
          "py-1.5",
          l.prefix ? "pl-10" : "pl-3",
          l.suffix ? "pr-10" : "pr-3"
        ],
        xl: [
          "py-1.5",
          l.prefix ? "pl-10" : "pl-3",
          l.suffix ? "pr-10" : "pr-3"
        ]
      }[r.size], x = r.disabled ? "disabled" : r.variant, h = {
        subtle: "border border-[--surface-gray-2] bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        outline: "border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        disabled: [
          "border bg-surface-gray-1 placeholder-ink-gray-3",
          r.variant === "outline" ? "border-outline-gray-2" : "border-transparent"
        ],
        ghost: "border-0 focus:ring-0 focus-visible:ring-0"
      }[x];
      return [
        m,
        S,
        h,
        c.value,
        "transition-colors w-full dark:[color-scheme:dark]"
      ];
    });
    let f = k(() => ({
      sm: "pl-2",
      md: "pl-2.5",
      lg: "pl-3",
      xl: "pl-3"
    })[r.size]), p = k(() => ({
      sm: "pr-2",
      md: "pr-2.5",
      lg: "pr-3",
      xl: "pr-3"
    })[r.size]), v = (m) => {
      o("update:modelValue", m);
    };
    r.debounce && (v = na(v, r.debounce));
    let y = (m) => {
      v(m.target.value);
    };
    return (m, S) => (A(), H("div", {
      class: le(["relative flex items-center", s(a).class]),
      style: yt(s(a).style)
    }, [
      m.$slots.prefix ? (A(), H("div", {
        key: 0,
        class: le([
          "absolute inset-y-0 left-0 flex items-center",
          c.value,
          s(f)
        ])
      }, [
        F(m.$slots, "prefix")
      ], 2)) : J("", !0),
      I("input", Q({
        ref_key: "inputRef",
        ref: u,
        type: e.type,
        placeholder: e.placeholder,
        class: d.value,
        disabled: e.disabled,
        id: e.id,
        value: e.modelValue,
        required: e.required,
        onInput: S[0] || (S[0] = //@ts-ignore
        (...x) => s(y) && s(y)(...x)),
        onChange: S[1] || (S[1] = //@ts-ignore
        (...x) => s(y) && s(y)(...x))
      }, i.value), null, 16, G1),
      m.$slots.suffix ? (A(), H("div", {
        key: 1,
        class: le([
          "absolute inset-y-0 right-0 flex items-center",
          c.value,
          s(p)
        ])
      }, [
        F(m.$slots, "suffix")
      ], 2)) : J("", !0)
    ], 6));
  }
}), X1 = /* @__PURE__ */ N({
  __name: "Select",
  props: /* @__PURE__ */ Zn({
    size: { default: "sm" },
    variant: { default: "subtle" },
    placeholder: { default: "Select option" },
    disabled: { type: Boolean },
    id: {},
    modelValue: {},
    options: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const n = vr(e, "modelValue"), t = e, r = k(() => ({
      sm: "text-base",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    })[t.size]), o = k(() => ({
      sm: "px-2",
      md: "px-2.5 ",
      lg: "px-3",
      xl: "px-3"
    })[t.size]);
    let l = {
      sm: "rounded min-h-7",
      md: "rounded min-h-8",
      lg: "rounded-md min-h-10",
      xl: "rounded-md min-h-10"
    }[t.size];
    const a = k(() => {
      let u = t.disabled ? "disabled" : t.variant, c = {
        subtle: "border border-[--surface-gray-2] bg-surface-gray-2 hover:border-outline-gray-modals hover:bg-surface-gray-3",
        outline: "border border-outline-gray-2 bg-surface-white hover:border-outline-gray-3",
        ghost: "bg-transparent border-transparent hover:bg-surface-gray-3 focus:bg-surface-gray-3",
        disabled: [
          "border",
          t.variant !== "ghost" ? "bg-surface-gray-1" : "",
          t.variant === "outline" ? "border-outline-gray-2" : "border-transparent"
        ]
      }[u];
      return [
        l,
        r.value,
        o.value,
        c,
        "transition-colors w-full focus:ring-2 data-[state=open]:ring-2 ring-outline-gray-3 "
      ];
    }), i = k(() => {
      var d, f, p;
      const u = typeof ((d = t.options) == null ? void 0 : d[0]) == "string", c = (f = t.options) == null ? void 0 : f.map((v) => ({ label: v, value: v }));
      return ((p = u ? c : t.options) == null ? void 0 : p.filter((v) => v && String(v.value))) || [];
    });
    return (u, c) => (A(), q(s(_f), {
      modelValue: n.value,
      "onUpdate:modelValue": c[0] || (c[0] = (d) => n.value = d)
    }, {
      default: P(() => [
        V(s(Yf), {
          class: le(["inline-flex items-center gap-2 outline-none text-base text-ink-gray-7 data-[placeholder]:text-ink-gray-4 data-[disabled]:text-ink-gray-4", [a.value, u.$attrs.class]]),
          "aria-label": "Customise options",
          disabled: e.disabled
        }, {
          default: P(() => [
            F(u.$slots, "prefix", {}, void 0, !0),
            V(s(Jf), {
              placeholder: e.placeholder,
              class: "truncate"
            }, null, 8, ["placeholder"]),
            F(u.$slots, "suffix", {}, () => [
              V(s(Qa), { class: "size-4 text-ink-gray-4 ml-auto shrink-0" })
            ], !0)
          ]),
          _: 3
        }, 8, ["class", "disabled"]),
        V(s(Wf), null, {
          default: P(() => [
            V(s(qf), { class: "bg-surface-modal ring-1 ring-black ring-opacity-5 rounded-lg shadow-2xl will-change-[opacity,transform] z-[100] overflow-hidden origin-center data-[state=open]:animate-[fadeInScale_100ms] data-[state=closed]:animate-[fadeOutScale_100ms]" }, {
              default: P(() => [
                V(s(Qf), { class: "p-1 flex flex-col" }, {
                  default: P(() => [
                    (A(!0), H(be, null, ot(i.value, (d) => (A(), q(s(Nf), {
                      disabled: d.disabled,
                      key: d.value,
                      value: d.value,
                      class: le([[s(l), o.value, r.value], "text-base text-ink-gray-9 flex items-center data-[highlighted]:bg-surface-gray-2 border-0 data-[state=checked]:bg-surface-gray-2 data-[disabled]:text-ink-gray-4 select-none"])
                    }, {
                      default: P(() => [
                        V(s(Uf), null, {
                          default: P(() => [
                            F(u.$slots, "option", Q({ ref_for: !0 }, { option: d }), () => [
                              _e(W(d.label), 1)
                            ], !0)
                          ]),
                          _: 2
                        }, 1024),
                        V(s(zf), {
                          as: s(ar),
                          class: "size-4 ml-auto"
                        }, null, 8, ["as"])
                      ]),
                      _: 2
                    }, 1032, ["disabled", "value", "class"]))), 128)),
                    F(u.$slots, "footer", {}, void 0, !0)
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
});
const J1 = /* @__PURE__ */ ei(X1, [["__scopeId", "data-v-74c206f0"]]), Z1 = { class: "space-y-1.5" }, Q1 = ["for"], ev = ["placeholder", "disabled", "id", "value", "rows"], tv = /* @__PURE__ */ N({
  __name: "Textarea",
  props: {
    size: { default: "sm" },
    variant: { default: "subtle" },
    placeholder: {},
    disabled: { type: Boolean },
    id: {},
    modelValue: {},
    debounce: {},
    rows: { default: 3 },
    label: {}
  },
  emits: ["update:modelValue"],
  setup(e, { expose: n, emit: t }) {
    const r = e, o = t, l = ao(), a = M(null), i = k(() => {
      let f = {
        sm: "text-base rounded",
        md: "text-base rounded",
        lg: "text-lg rounded-md",
        xl: "text-xl rounded-md"
      }[r.size], p = {
        sm: ["py-1.5 px-2"],
        md: ["py-1.5 px-2.5"],
        lg: ["py-1.5 px-3"],
        xl: ["py-1.5 px-3"]
      }[r.size], v = r.disabled ? "disabled" : r.variant, y = {
        subtle: "border border-[--surface-gray-2] bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        outline: "border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        disabled: [
          "border bg-surface-gray-1 placeholder-ink-gray-3",
          r.variant === "outline" ? "border-outline-gray-2" : "border-transparent"
        ]
      }[v];
      return [
        f,
        p,
        y,
        r.disabled ? "text-ink-gray-5" : "text-ink-gray-8",
        "transition-colors w-full block"
      ];
    }), u = k(() => [
      {
        sm: "text-xs",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl"
      }[r.size],
      "text-ink-gray-5"
    ]);
    let c = (f) => {
      o("update:modelValue", f);
    };
    r.debounce && (c = na(c, r.debounce));
    let d = (f) => {
      c(f.target.value);
    };
    return n({ el: a }), (f, p) => (A(), H("div", Z1, [
      e.label ? (A(), H("label", {
        key: 0,
        class: le(["block", u.value]),
        for: e.id
      }, W(e.label), 11, Q1)) : J("", !0),
      I("textarea", Q({
        ref_key: "textareaRef",
        ref: a,
        placeholder: e.placeholder,
        class: i.value,
        disabled: e.disabled,
        id: e.id,
        value: e.modelValue,
        rows: e.rows,
        onInput: p[0] || (p[0] = //@ts-ignore
        (...v) => s(d) && s(d)(...v)),
        onChange: p[1] || (p[1] = //@ts-ignore
        (...v) => s(d) && s(d)(...v))
      }, s(l)), null, 16, ev)
    ]));
  }
}), nv = ["for"], ov = /* @__PURE__ */ N({
  __name: "FormLabel",
  props: {
    label: {},
    size: { default: "sm" },
    id: {},
    required: { type: Boolean }
  },
  setup(e) {
    const n = e, t = k(() => [
      {
        sm: "text-xs",
        md: "text-base"
      }[n.size],
      "text-ink-gray-5"
    ]);
    return (r, o) => (A(), H("label", {
      class: le(["block", t.value]),
      for: e.id
    }, [
      _e(W(e.label) + " ", 1),
      e.required ? (A(), H(be, { key: 0 }, [
        o[0] || (o[0] = I("span", {
          class: "text-ink-red-3 select-none",
          "aria-hidden": "true"
        }, "*", -1)),
        o[1] || (o[1] = I("span", { class: "sr-only" }, "(required)", -1))
      ], 64)) : J("", !0)
    ], 10, nv));
  }
}), rv = {
  inheritAttrs: !1
}, kt = /* @__PURE__ */ N({
  ...rv,
  __name: "FormControl",
  props: {
    label: {},
    description: {},
    type: { default: "text" },
    size: { default: "sm" },
    variant: { default: "subtle" },
    required: { type: Boolean }
  },
  setup(e) {
    const n = Dr(), t = e, r = ao(), o = k(() => {
      let a = {};
      for (let i in r)
        i !== "class" && i !== "style" && (a[i] = r[i]);
      return a;
    }), l = k(() => [
      {
        sm: "text-xs",
        md: "text-base"
      }[t.size],
      "text-ink-gray-5"
    ]);
    return (a, i) => e.type != "checkbox" ? (A(), H("div", {
      key: 0,
      class: le(["space-y-1.5", s(r).class]),
      style: yt(s(r).style)
    }, [
      e.label ? (A(), q(ov, {
        key: 0,
        label: e.label,
        size: e.size,
        id: s(n),
        required: e.required
      }, null, 8, ["label", "size", "id", "required"])) : J("", !0),
      e.type === "select" ? (A(), q(s(J1), Q({
        key: 1,
        id: s(n)
      }, { ...o.value, size: e.size, variant: e.variant }), Vn({ _: 2 }, [
        a.$slots.prefix ? {
          name: "prefix",
          fn: P(() => [
            F(a.$slots, "prefix")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["id"])) : e.type === "combobox" ? (A(), q(s(H1), Q({
        key: 2,
        id: s(n)
      }, { ...o.value, variant: e.variant }), Vn({ _: 2 }, [
        a.$slots.prefix ? {
          name: "prefix",
          fn: P(() => [
            F(a.$slots, "prefix")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["id"])) : e.type === "autocomplete" ? (A(), q(s(T1), Ie(Q({ key: 3 }, { ...o.value })), Vn({ _: 2 }, [
        a.$slots.prefix ? {
          name: "prefix",
          fn: P(() => [
            F(a.$slots, "prefix")
          ]),
          key: "0"
        } : void 0,
        a.$slots["item-prefix"] ? {
          name: "item-prefix",
          fn: P((u) => [
            F(a.$slots, "item-prefix", Ie(Be(u)))
          ]),
          key: "1"
        } : void 0
      ]), 1040)) : e.type === "textarea" ? (A(), q(s(tv), Q({
        key: 4,
        id: s(n)
      }, { ...o.value, size: e.size, variant: e.variant }), null, 16, ["id"])) : (A(), q(s(Y1), Q({
        key: 5,
        id: s(n)
      }, { ...o.value, type: e.type, size: e.size, variant: e.variant, required: e.required }), Vn({ _: 2 }, [
        a.$slots.prefix ? {
          name: "prefix",
          fn: P(() => [
            F(a.$slots, "prefix")
          ]),
          key: "0"
        } : void 0,
        a.$slots.suffix ? {
          name: "suffix",
          fn: P(() => [
            F(a.$slots, "suffix")
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["id"])),
      F(a.$slots, "description", {}, () => [
        e.description ? (A(), H("p", {
          key: 0,
          class: le(l.value)
        }, W(e.description), 3)) : J("", !0)
      ])
    ], 6)) : (A(), q(s(W1), Q({
      key: 1,
      id: s(n)
    }, { ...o.value, label: e.label, size: e.size, class: s(r).class }), null, 16, ["id"]));
  }
}), lv = `left-0 bottom-0 h-[2px] w-[--reka-tabs-indicator-size] transition-[width,transform]
                          translate-x-[--reka-tabs-indicator-position] translate-y-[1px]`, av = `right-0 top-0 w-[2px] h-[--reka-tabs-indicator-size]
                       translate-y-[--reka-tabs-indicator-position] transition-[height,transform]`, iv = /* @__PURE__ */ N({
  __name: "Tabs",
  props: /* @__PURE__ */ Zn({
    as: {},
    tabs: {},
    vertical: { type: Boolean }
  }, {
    modelValue: { default: 0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const n = e, t = vr(e, "modelValue"), r = ae("button");
    return (o, l) => (A(), q(s(sp), {
      as: n.as,
      class: "flex flex-1 overflow-hidden flex-col data-[orientation=vertical]:flex-row",
      orientation: n.vertical ? "vertical" : "horizontal",
      "default-value": n.tabs[0].label,
      modelValue: t.value,
      "onUpdate:modelValue": l[0] || (l[0] = (a) => t.value = a)
    }, {
      default: P(() => [
        V(s(vp), {
          class: le(["relative min-h-fit flex data-[orientation=vertical]:flex-col p-1 border-b data-[orientation=vertical]:border-r gap-5", {
            "overflow-x-auto overflow-y-hidden px-5": !n.vertical,
            "py-3": n.vertical
          }])
        }, {
          default: P(() => [
            V(s(fp), {
              class: le(["absolute rounded-full duration-300", n.vertical ? av : lv])
            }, {
              default: P(() => [...l[1] || (l[1] = [
                I("div", { class: "w-full h-full bg-surface-gray-7" }, null, -1)
              ])]),
              _: 1
            }, 8, ["class"]),
            (A(!0), H(be, null, ot(n.tabs, (a, i) => (A(), q(s(mp), {
              as: "template",
              value: i
            }, {
              default: P(() => [
                F(o.$slots, "tab-item", Q({ ref_for: !0 }, { tab: a }), () => [
                  (A(), q(Je(a.route ? "router-link" : s(r)), {
                    to: a.route,
                    class: le(["flex items-center gap-1.5 text-base text-ink-gray-5 duration-300 ease-in-out hover:text-ink-gray-9 data-[state=active]:text-ink-gray-9", { "px-2.5": n.vertical, "py-2.5": !n.vertical }])
                  }, {
                    default: P(() => [
                      a.icon ? (A(), q(Je(a.icon), {
                        key: 0,
                        class: "size-4"
                      })) : J("", !0),
                      _e(" " + W(a.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["to", "class"]))
                ])
              ]),
              _: 2
            }, 1032, ["value"]))), 256))
          ]),
          _: 3
        }, 8, ["class"]),
        (A(!0), H(be, null, ot(n.tabs, (a, i) => (A(), q(s(dp), {
          value: i,
          class: "flex flex-col overflow-auto"
        }, {
          default: P(() => [
            F(o.$slots, "tab-panel", Q({ ref_for: !0 }, { tab: a }))
          ]),
          _: 2
        }, 1032, ["value"]))), 256))
      ]),
      _: 3
    }, 8, ["as", "orientation", "default-value", "modelValue"]));
  }
}), sv = {
  class: "lucide lucide-triangle-alert",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function uv(e, n) {
  return A(), H("svg", sv, [...n[0] || (n[0] = [
    I("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }, null, -1),
    I("path", { d: "M12 9v4" }, null, -1),
    I("path", { d: "M12 17h.01" }, null, -1)
  ])]);
}
const dv = un({ name: "lucide-alert-triangle", render: uv }), cv = {}, fv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 16 16"
};
function pv(e, n) {
  return A(), H("svg", fv, [...n[0] || (n[0] = [
    I("path", {
      fill: "currentColor",
      d: "M8 .75a7.25 7.25 0 1 1 0 14.5A7.25 7.25 0 0 1 8 .75Zm0 1a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5Zm2.59 3.527a.501.501 0 0 1 .758.623l-.057.085-3.848 4.666a.501.501 0 0 1-.78-.011L4.936 8.41l-.053-.086a.501.501 0 0 1 .775-.6l.07.074 1.34 1.733 3.45-4.183.072-.072Z"
    }, null, -1)
  ])]);
}
const vv = /* @__PURE__ */ ei(cv, [["render", pv]]), yv = { class: "flex items-center gap-2 flex-grow overflow-hidden" }, mv = { class: "flex flex-col flex-grow overflow-hidden" }, hv = { class: "flex items-center gap-2 h-7" }, gv = /* @__PURE__ */ N({
  __name: "Toast",
  props: {
    open: { type: Boolean },
    message: {},
    type: {},
    duration: {},
    icon: {},
    closable: { type: Boolean },
    action: {}
  },
  emits: ["update:open", "action"],
  setup(e, { emit: n }) {
    const t = e, r = n, o = k({
      get: () => t.open,
      set: (a) => r("update:open", a)
    });
    function l() {
      var a, i;
      (i = (a = t.action) == null ? void 0 : a.onClick) == null || i.call(a), r("action");
    }
    return (a, i) => (A(), q(s(Dp), {
      open: o.value,
      "onUpdate:open": i[0] || (i[0] = (u) => o.value = u),
      duration: e.closable ? e.duration : 0,
      class: le([
        "toast-root-animatable",
        "bg-surface-gray-6 border-none rounded-md px-4 py-1.5 shadow-lg flex items-center justify-between gap-3 min-w-[280px] max-w-[400px] pointer-events-auto list-none"
      ])
    }, {
      default: P(() => [
        I("div", yv, [
          I("div", null, [
            e.icon ? (A(), q(Je(e.icon), {
              key: 0,
              class: "flex-shrink-0 size-4"
            })) : e.type == "success" ? (A(), q(vv, {
              key: 1,
              class: "flex-shrink-0 size-4 text-ink-green-2"
            })) : e.type == "warning" ? (A(), q(s(dv), {
              key: 2,
              class: "flex-shrink-0 size-4 text-ink-amber-2"
            })) : e.type == "error" ? (A(), q(s(ji), {
              key: 3,
              class: "flex-shrink-0 size-4 text-ink-red-2"
            })) : J("", !0)
          ]),
          I("div", mv, [
            e.message ? (A(), q(s(Mp), {
              key: 0,
              class: "text-p-sm break-words text-ink-white",
              innerHTML: e.message
            }, null, 8, ["innerHTML"])) : J("", !0)
          ])
        ]),
        I("div", hv, [
          e.action ? (A(), q(s(Pp), {
            key: 0,
            class: "flex-shrink-0 rounded px-2 py-1 text-sm text-ink-blue-link hover:text-ink-gray-3 focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-4",
            "alt-text": e.action.altText || e.action.label,
            onClick: l
          }, {
            default: P(() => [
              _e(W(e.action.label), 1)
            ]),
            _: 1
          }, 8, ["alt-text"])) : J("", !0),
          e.closable ? (A(), q(s(Ya), {
            key: 1,
            class: "flex-shrink-0 rounded p-1 text-ink-white hover:text-ink-gray-3 focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-4"
          }, {
            default: P(() => [
              V(s(Ei), { class: "size-4" })
            ]),
            _: 1
          })) : J("", !0)
        ])
      ]),
      _: 1
    }, 8, ["open", "duration"]));
  }
});
/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */
const {
  entries: ti,
  setPrototypeOf: Fl,
  isFrozen: bv,
  getPrototypeOf: xv,
  getOwnPropertyDescriptor: wv
} = Object;
let {
  freeze: Fe,
  seal: Ze,
  create: ir
} = Object, {
  apply: sr,
  construct: ur
} = typeof Reflect < "u" && Reflect;
Fe || (Fe = function(n) {
  return n;
});
Ze || (Ze = function(n) {
  return n;
});
sr || (sr = function(n, t) {
  for (var r = arguments.length, o = new Array(r > 2 ? r - 2 : 0), l = 2; l < r; l++)
    o[l - 2] = arguments[l];
  return n.apply(t, o);
});
ur || (ur = function(n) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
    r[o - 1] = arguments[o];
  return new n(...r);
});
const Yn = Ne(Array.prototype.forEach), _v = Ne(Array.prototype.lastIndexOf), Nl = Ne(Array.prototype.pop), hn = Ne(Array.prototype.push), Sv = Ne(Array.prototype.splice), Jn = Ne(String.prototype.toLowerCase), Ho = Ne(String.prototype.toString), Uo = Ne(String.prototype.match), gn = Ne(String.prototype.replace), Cv = Ne(String.prototype.indexOf), Av = Ne(String.prototype.trim), nt = Ne(Object.prototype.hasOwnProperty), qe = Ne(RegExp.prototype.test), bn = Ov(TypeError);
function Ne(e) {
  return function(n) {
    n instanceof RegExp && (n.lastIndex = 0);
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
      r[o - 1] = arguments[o];
    return sr(e, n, r);
  };
}
function Ov(e) {
  return function() {
    for (var n = arguments.length, t = new Array(n), r = 0; r < n; r++)
      t[r] = arguments[r];
    return ur(e, t);
  };
}
function fe(e, n) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Jn;
  Fl && Fl(e, null);
  let r = n.length;
  for (; r--; ) {
    let o = n[r];
    if (typeof o == "string") {
      const l = t(o);
      l !== o && (bv(n) || (n[r] = l), o = l);
    }
    e[o] = !0;
  }
  return e;
}
function Ev(e) {
  for (let n = 0; n < e.length; n++)
    nt(e, n) || (e[n] = null);
  return e;
}
function ft(e) {
  const n = ir(null);
  for (const [t, r] of ti(e))
    nt(e, t) && (Array.isArray(r) ? n[t] = Ev(r) : r && typeof r == "object" && r.constructor === Object ? n[t] = ft(r) : n[t] = r);
  return n;
}
function xn(e, n) {
  for (; e !== null; ) {
    const r = wv(e, n);
    if (r) {
      if (r.get)
        return Ne(r.get);
      if (typeof r.value == "function")
        return Ne(r.value);
    }
    e = xv(e);
  }
  function t() {
    return null;
  }
  return t;
}
const Vl = Fe(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Ko = Fe(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Wo = Fe(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Tv = Fe(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Go = Fe(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), kv = Fe(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), zl = Fe(["#text"]), Hl = Fe(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Yo = Fe(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Ul = Fe(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Xn = Fe(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), jv = Ze(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Pv = Ze(/<%[\w\W]*|[\w\W]*%>/gm), Iv = Ze(/\$\{[\w\W]*/gm), Mv = Ze(/^data-[\-\w.\u00B7-\uFFFF]+$/), Rv = Ze(/^aria-[\-\w]+$/), ni = Ze(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Dv = Ze(/^(?:\w+script|data):/i), Lv = Ze(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), oi = Ze(/^html$/i), $v = Ze(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Kl = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Rv,
  ATTR_WHITESPACE: Lv,
  CUSTOM_ELEMENT: $v,
  DATA_ATTR: Mv,
  DOCTYPE_NAME: oi,
  ERB_EXPR: Pv,
  IS_ALLOWED_URI: ni,
  IS_SCRIPT_OR_DATA: Dv,
  MUSTACHE_EXPR: jv,
  TMPLIT_EXPR: Iv
});
const wn = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
}, qv = function() {
  return typeof window > "u" ? null : window;
}, Bv = function(n, t) {
  if (typeof n != "object" || typeof n.createPolicy != "function")
    return null;
  let r = null;
  const o = "data-tt-policy-suffix";
  t && t.hasAttribute(o) && (r = t.getAttribute(o));
  const l = "dompurify" + (r ? "#" + r : "");
  try {
    return n.createPolicy(l, {
      createHTML(a) {
        return a;
      },
      createScriptURL(a) {
        return a;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + l + " could not be created."), null;
  }
}, Wl = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function ri() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : qv();
  const n = (ee) => ri(ee);
  if (n.version = "3.3.1", n.removed = [], !e || !e.document || e.document.nodeType !== wn.document || !e.Element)
    return n.isSupported = !1, n;
  let {
    document: t
  } = e;
  const r = t, o = r.currentScript, {
    DocumentFragment: l,
    HTMLTemplateElement: a,
    Node: i,
    Element: u,
    NodeFilter: c,
    NamedNodeMap: d = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: f,
    DOMParser: p,
    trustedTypes: v
  } = e, y = u.prototype, m = xn(y, "cloneNode"), S = xn(y, "remove"), x = xn(y, "nextSibling"), h = xn(y, "childNodes"), w = xn(y, "parentNode");
  if (typeof a == "function") {
    const ee = t.createElement("template");
    ee.content && ee.content.ownerDocument && (t = ee.content.ownerDocument);
  }
  let C, g = "";
  const {
    implementation: b,
    createNodeIterator: O,
    createDocumentFragment: T,
    getElementsByTagName: _
  } = t, {
    importNode: j
  } = r;
  let $ = Wl();
  n.isSupported = typeof ti == "function" && typeof w == "function" && b && b.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: R,
    ERB_EXPR: B,
    TMPLIT_EXPR: z,
    DATA_ATTR: U,
    ARIA_ATTR: oe,
    IS_SCRIPT_OR_DATA: ne,
    ATTR_WHITESPACE: ue,
    CUSTOM_ELEMENT: D
  } = Kl;
  let {
    IS_ALLOWED_URI: Z
  } = Kl, G = null;
  const ve = fe({}, [...Vl, ...Ko, ...Wo, ...Go, ...zl]);
  let re = null;
  const ye = fe({}, [...Hl, ...Yo, ...Ul, ...Xn]);
  let ce = Object.seal(ir(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), bt = null, Y = null;
  const te = Object.seal(ir(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let ie = !0, me = !0, Me = !1, et = !0, Ye = !1, st = !0, qt = !1, Ao = !1, Oo = !1, Jt = !1, Ln = !1, $n = !1, Lr = !0, $r = !1;
  const li = "user-content-";
  let Eo = !0, vn = !1, Zt = {}, ut = null;
  const To = fe({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let qr = null;
  const Br = fe({}, ["audio", "video", "img", "source", "image", "track"]);
  let ko = null;
  const Fr = fe({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), qn = "http://www.w3.org/1998/Math/MathML", Bn = "http://www.w3.org/2000/svg", xt = "http://www.w3.org/1999/xhtml";
  let Qt = xt, jo = !1, Po = null;
  const ai = fe({}, [qn, Bn, xt], Ho);
  let Fn = fe({}, ["mi", "mo", "mn", "ms", "mtext"]), Nn = fe({}, ["annotation-xml"]);
  const ii = fe({}, ["title", "style", "font", "a", "script"]);
  let yn = null;
  const si = ["application/xhtml+xml", "text/html"], ui = "text/html";
  let Te = null, en = null;
  const di = t.createElement("form"), Nr = function(E) {
    return E instanceof RegExp || E instanceof Function;
  }, Io = function() {
    let E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(en && en === E)) {
      if ((!E || typeof E != "object") && (E = {}), E = ft(E), yn = // eslint-disable-next-line unicorn/prefer-includes
      si.indexOf(E.PARSER_MEDIA_TYPE) === -1 ? ui : E.PARSER_MEDIA_TYPE, Te = yn === "application/xhtml+xml" ? Ho : Jn, G = nt(E, "ALLOWED_TAGS") ? fe({}, E.ALLOWED_TAGS, Te) : ve, re = nt(E, "ALLOWED_ATTR") ? fe({}, E.ALLOWED_ATTR, Te) : ye, Po = nt(E, "ALLOWED_NAMESPACES") ? fe({}, E.ALLOWED_NAMESPACES, Ho) : ai, ko = nt(E, "ADD_URI_SAFE_ATTR") ? fe(ft(Fr), E.ADD_URI_SAFE_ATTR, Te) : Fr, qr = nt(E, "ADD_DATA_URI_TAGS") ? fe(ft(Br), E.ADD_DATA_URI_TAGS, Te) : Br, ut = nt(E, "FORBID_CONTENTS") ? fe({}, E.FORBID_CONTENTS, Te) : To, bt = nt(E, "FORBID_TAGS") ? fe({}, E.FORBID_TAGS, Te) : ft({}), Y = nt(E, "FORBID_ATTR") ? fe({}, E.FORBID_ATTR, Te) : ft({}), Zt = nt(E, "USE_PROFILES") ? E.USE_PROFILES : !1, ie = E.ALLOW_ARIA_ATTR !== !1, me = E.ALLOW_DATA_ATTR !== !1, Me = E.ALLOW_UNKNOWN_PROTOCOLS || !1, et = E.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ye = E.SAFE_FOR_TEMPLATES || !1, st = E.SAFE_FOR_XML !== !1, qt = E.WHOLE_DOCUMENT || !1, Jt = E.RETURN_DOM || !1, Ln = E.RETURN_DOM_FRAGMENT || !1, $n = E.RETURN_TRUSTED_TYPE || !1, Oo = E.FORCE_BODY || !1, Lr = E.SANITIZE_DOM !== !1, $r = E.SANITIZE_NAMED_PROPS || !1, Eo = E.KEEP_CONTENT !== !1, vn = E.IN_PLACE || !1, Z = E.ALLOWED_URI_REGEXP || ni, Qt = E.NAMESPACE || xt, Fn = E.MATHML_TEXT_INTEGRATION_POINTS || Fn, Nn = E.HTML_INTEGRATION_POINTS || Nn, ce = E.CUSTOM_ELEMENT_HANDLING || {}, E.CUSTOM_ELEMENT_HANDLING && Nr(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ce.tagNameCheck = E.CUSTOM_ELEMENT_HANDLING.tagNameCheck), E.CUSTOM_ELEMENT_HANDLING && Nr(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ce.attributeNameCheck = E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), E.CUSTOM_ELEMENT_HANDLING && typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (ce.allowCustomizedBuiltInElements = E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ye && (me = !1), Ln && (Jt = !0), Zt && (G = fe({}, zl), re = [], Zt.html === !0 && (fe(G, Vl), fe(re, Hl)), Zt.svg === !0 && (fe(G, Ko), fe(re, Yo), fe(re, Xn)), Zt.svgFilters === !0 && (fe(G, Wo), fe(re, Yo), fe(re, Xn)), Zt.mathMl === !0 && (fe(G, Go), fe(re, Ul), fe(re, Xn))), E.ADD_TAGS && (typeof E.ADD_TAGS == "function" ? te.tagCheck = E.ADD_TAGS : (G === ve && (G = ft(G)), fe(G, E.ADD_TAGS, Te))), E.ADD_ATTR && (typeof E.ADD_ATTR == "function" ? te.attributeCheck = E.ADD_ATTR : (re === ye && (re = ft(re)), fe(re, E.ADD_ATTR, Te))), E.ADD_URI_SAFE_ATTR && fe(ko, E.ADD_URI_SAFE_ATTR, Te), E.FORBID_CONTENTS && (ut === To && (ut = ft(ut)), fe(ut, E.FORBID_CONTENTS, Te)), E.ADD_FORBID_CONTENTS && (ut === To && (ut = ft(ut)), fe(ut, E.ADD_FORBID_CONTENTS, Te)), Eo && (G["#text"] = !0), qt && fe(G, ["html", "head", "body"]), G.table && (fe(G, ["tbody"]), delete bt.tbody), E.TRUSTED_TYPES_POLICY) {
        if (typeof E.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw bn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof E.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw bn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        C = E.TRUSTED_TYPES_POLICY, g = C.createHTML("");
      } else
        C === void 0 && (C = Bv(v, o)), C !== null && typeof g == "string" && (g = C.createHTML(""));
      Fe && Fe(E), en = E;
    }
  }, Vr = fe({}, [...Ko, ...Wo, ...Tv]), zr = fe({}, [...Go, ...kv]), ci = function(E) {
    let K = w(E);
    (!K || !K.tagName) && (K = {
      namespaceURI: Qt,
      tagName: "template"
    });
    const X = Jn(E.tagName), Se = Jn(K.tagName);
    return Po[E.namespaceURI] ? E.namespaceURI === Bn ? K.namespaceURI === xt ? X === "svg" : K.namespaceURI === qn ? X === "svg" && (Se === "annotation-xml" || Fn[Se]) : !!Vr[X] : E.namespaceURI === qn ? K.namespaceURI === xt ? X === "math" : K.namespaceURI === Bn ? X === "math" && Nn[Se] : !!zr[X] : E.namespaceURI === xt ? K.namespaceURI === Bn && !Nn[Se] || K.namespaceURI === qn && !Fn[Se] ? !1 : !zr[X] && (ii[X] || !Vr[X]) : !!(yn === "application/xhtml+xml" && Po[E.namespaceURI]) : !1;
  }, dt = function(E) {
    hn(n.removed, {
      element: E
    });
    try {
      w(E).removeChild(E);
    } catch {
      S(E);
    }
  }, Bt = function(E, K) {
    try {
      hn(n.removed, {
        attribute: K.getAttributeNode(E),
        from: K
      });
    } catch {
      hn(n.removed, {
        attribute: null,
        from: K
      });
    }
    if (K.removeAttribute(E), E === "is")
      if (Jt || Ln)
        try {
          dt(K);
        } catch {
        }
      else
        try {
          K.setAttribute(E, "");
        } catch {
        }
  }, Hr = function(E) {
    let K = null, X = null;
    if (Oo)
      E = "<remove></remove>" + E;
    else {
      const Ee = Uo(E, /^[\r\n\t ]+/);
      X = Ee && Ee[0];
    }
    yn === "application/xhtml+xml" && Qt === xt && (E = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + E + "</body></html>");
    const Se = C ? C.createHTML(E) : E;
    if (Qt === xt)
      try {
        K = new p().parseFromString(Se, yn);
      } catch {
      }
    if (!K || !K.documentElement) {
      K = b.createDocument(Qt, "template", null);
      try {
        K.documentElement.innerHTML = jo ? g : Se;
      } catch {
      }
    }
    const Re = K.body || K.documentElement;
    return E && X && Re.insertBefore(t.createTextNode(X), Re.childNodes[0] || null), Qt === xt ? _.call(K, qt ? "html" : "body")[0] : qt ? K.documentElement : Re;
  }, Ur = function(E) {
    return O.call(
      E.ownerDocument || E,
      E,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, Mo = function(E) {
    return E instanceof f && (typeof E.nodeName != "string" || typeof E.textContent != "string" || typeof E.removeChild != "function" || !(E.attributes instanceof d) || typeof E.removeAttribute != "function" || typeof E.setAttribute != "function" || typeof E.namespaceURI != "string" || typeof E.insertBefore != "function" || typeof E.hasChildNodes != "function");
  }, Kr = function(E) {
    return typeof i == "function" && E instanceof i;
  };
  function wt(ee, E, K) {
    Yn(ee, (X) => {
      X.call(n, E, K, en);
    });
  }
  const Wr = function(E) {
    let K = null;
    if (wt($.beforeSanitizeElements, E, null), Mo(E))
      return dt(E), !0;
    const X = Te(E.nodeName);
    if (wt($.uponSanitizeElement, E, {
      tagName: X,
      allowedTags: G
    }), st && E.hasChildNodes() && !Kr(E.firstElementChild) && qe(/<[/\w!]/g, E.innerHTML) && qe(/<[/\w!]/g, E.textContent) || E.nodeType === wn.progressingInstruction || st && E.nodeType === wn.comment && qe(/<[/\w]/g, E.data))
      return dt(E), !0;
    if (!(te.tagCheck instanceof Function && te.tagCheck(X)) && (!G[X] || bt[X])) {
      if (!bt[X] && Yr(X) && (ce.tagNameCheck instanceof RegExp && qe(ce.tagNameCheck, X) || ce.tagNameCheck instanceof Function && ce.tagNameCheck(X)))
        return !1;
      if (Eo && !ut[X]) {
        const Se = w(E) || E.parentNode, Re = h(E) || E.childNodes;
        if (Re && Se) {
          const Ee = Re.length;
          for (let Ve = Ee - 1; Ve >= 0; --Ve) {
            const _t = m(Re[Ve], !0);
            _t.__removalCount = (E.__removalCount || 0) + 1, Se.insertBefore(_t, x(E));
          }
        }
      }
      return dt(E), !0;
    }
    return E instanceof u && !ci(E) || (X === "noscript" || X === "noembed" || X === "noframes") && qe(/<\/no(script|embed|frames)/i, E.innerHTML) ? (dt(E), !0) : (Ye && E.nodeType === wn.text && (K = E.textContent, Yn([R, B, z], (Se) => {
      K = gn(K, Se, " ");
    }), E.textContent !== K && (hn(n.removed, {
      element: E.cloneNode()
    }), E.textContent = K)), wt($.afterSanitizeElements, E, null), !1);
  }, Gr = function(E, K, X) {
    if (Lr && (K === "id" || K === "name") && (X in t || X in di))
      return !1;
    if (!(me && !Y[K] && qe(U, K))) {
      if (!(ie && qe(oe, K))) {
        if (!(te.attributeCheck instanceof Function && te.attributeCheck(K, E))) {
          if (!re[K] || Y[K]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Yr(E) && (ce.tagNameCheck instanceof RegExp && qe(ce.tagNameCheck, E) || ce.tagNameCheck instanceof Function && ce.tagNameCheck(E)) && (ce.attributeNameCheck instanceof RegExp && qe(ce.attributeNameCheck, K) || ce.attributeNameCheck instanceof Function && ce.attributeNameCheck(K, E)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              K === "is" && ce.allowCustomizedBuiltInElements && (ce.tagNameCheck instanceof RegExp && qe(ce.tagNameCheck, X) || ce.tagNameCheck instanceof Function && ce.tagNameCheck(X)))
            )
              return !1;
          } else if (!ko[K]) {
            if (!qe(Z, gn(X, ue, ""))) {
              if (!((K === "src" || K === "xlink:href" || K === "href") && E !== "script" && Cv(X, "data:") === 0 && qr[E])) {
                if (!(Me && !qe(ne, gn(X, ue, "")))) {
                  if (X)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Yr = function(E) {
    return E !== "annotation-xml" && Uo(E, D);
  }, Xr = function(E) {
    wt($.beforeSanitizeAttributes, E, null);
    const {
      attributes: K
    } = E;
    if (!K || Mo(E))
      return;
    const X = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: re,
      forceKeepAttr: void 0
    };
    let Se = K.length;
    for (; Se--; ) {
      const Re = K[Se], {
        name: Ee,
        namespaceURI: Ve,
        value: _t
      } = Re, tn = Te(Ee), Ro = _t;
      let je = Ee === "value" ? Ro : Av(Ro);
      if (X.attrName = tn, X.attrValue = je, X.keepAttr = !0, X.forceKeepAttr = void 0, wt($.uponSanitizeAttribute, E, X), je = X.attrValue, $r && (tn === "id" || tn === "name") && (Bt(Ee, E), je = li + je), st && qe(/((--!?|])>)|<\/(style|title|textarea)/i, je)) {
        Bt(Ee, E);
        continue;
      }
      if (tn === "attributename" && Uo(je, "href")) {
        Bt(Ee, E);
        continue;
      }
      if (X.forceKeepAttr)
        continue;
      if (!X.keepAttr) {
        Bt(Ee, E);
        continue;
      }
      if (!et && qe(/\/>/i, je)) {
        Bt(Ee, E);
        continue;
      }
      Ye && Yn([R, B, z], (Zr) => {
        je = gn(je, Zr, " ");
      });
      const Jr = Te(E.nodeName);
      if (!Gr(Jr, tn, je)) {
        Bt(Ee, E);
        continue;
      }
      if (C && typeof v == "object" && typeof v.getAttributeType == "function" && !Ve)
        switch (v.getAttributeType(Jr, tn)) {
          case "TrustedHTML": {
            je = C.createHTML(je);
            break;
          }
          case "TrustedScriptURL": {
            je = C.createScriptURL(je);
            break;
          }
        }
      if (je !== Ro)
        try {
          Ve ? E.setAttributeNS(Ve, Ee, je) : E.setAttribute(Ee, je), Mo(E) ? dt(E) : Nl(n.removed);
        } catch {
          Bt(Ee, E);
        }
    }
    wt($.afterSanitizeAttributes, E, null);
  }, fi = function ee(E) {
    let K = null;
    const X = Ur(E);
    for (wt($.beforeSanitizeShadowDOM, E, null); K = X.nextNode(); )
      wt($.uponSanitizeShadowNode, K, null), Wr(K), Xr(K), K.content instanceof l && ee(K.content);
    wt($.afterSanitizeShadowDOM, E, null);
  };
  return n.sanitize = function(ee) {
    let E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, K = null, X = null, Se = null, Re = null;
    if (jo = !ee, jo && (ee = "<!-->"), typeof ee != "string" && !Kr(ee))
      if (typeof ee.toString == "function") {
        if (ee = ee.toString(), typeof ee != "string")
          throw bn("dirty is not a string, aborting");
      } else
        throw bn("toString is not a function");
    if (!n.isSupported)
      return ee;
    if (Ao || Io(E), n.removed = [], typeof ee == "string" && (vn = !1), vn) {
      if (ee.nodeName) {
        const _t = Te(ee.nodeName);
        if (!G[_t] || bt[_t])
          throw bn("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (ee instanceof i)
      K = Hr("<!---->"), X = K.ownerDocument.importNode(ee, !0), X.nodeType === wn.element && X.nodeName === "BODY" || X.nodeName === "HTML" ? K = X : K.appendChild(X);
    else {
      if (!Jt && !Ye && !qt && // eslint-disable-next-line unicorn/prefer-includes
      ee.indexOf("<") === -1)
        return C && $n ? C.createHTML(ee) : ee;
      if (K = Hr(ee), !K)
        return Jt ? null : $n ? g : "";
    }
    K && Oo && dt(K.firstChild);
    const Ee = Ur(vn ? ee : K);
    for (; Se = Ee.nextNode(); )
      Wr(Se), Xr(Se), Se.content instanceof l && fi(Se.content);
    if (vn)
      return ee;
    if (Jt) {
      if (Ln)
        for (Re = T.call(K.ownerDocument); K.firstChild; )
          Re.appendChild(K.firstChild);
      else
        Re = K;
      return (re.shadowroot || re.shadowrootmode) && (Re = j.call(r, Re, !0)), Re;
    }
    let Ve = qt ? K.outerHTML : K.innerHTML;
    return qt && G["!doctype"] && K.ownerDocument && K.ownerDocument.doctype && K.ownerDocument.doctype.name && qe(oi, K.ownerDocument.doctype.name) && (Ve = "<!DOCTYPE " + K.ownerDocument.doctype.name + `>
` + Ve), Ye && Yn([R, B, z], (_t) => {
      Ve = gn(Ve, _t, " ");
    }), C && $n ? C.createHTML(Ve) : Ve;
  }, n.setConfig = function() {
    let ee = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Io(ee), Ao = !0;
  }, n.clearConfig = function() {
    en = null, Ao = !1;
  }, n.isValidAttribute = function(ee, E, K) {
    en || Io({});
    const X = Te(ee), Se = Te(E);
    return Gr(X, Se, K);
  }, n.addHook = function(ee, E) {
    typeof E == "function" && hn($[ee], E);
  }, n.removeHook = function(ee, E) {
    if (E !== void 0) {
      const K = _v($[ee], E);
      return K === -1 ? void 0 : Sv($[ee], K, 1)[0];
    }
    return Nl($[ee]);
  }, n.removeHooks = function(ee) {
    $[ee] = [];
  }, n.removeAllHooks = function() {
    $ = Wl();
  }, n;
}
var Fv = ri();
const Ct = M([]);
let Nv = 0;
const Gl = (e, n) => {
  const t = Ct.value.findIndex((r) => r.id === e);
  t !== -1 && (Ct.value[t] = {
    ...Ct.value[t],
    ...n,
    open: !0
  });
}, Ce = {
  create: (e) => {
    const n = `toast-${Nv++}`, t = e.duration != null ? e.duration * 1e3 : 5e3, r = Fv.sanitize(e.message, {
      ALLOWED_TAGS: ["a", "em", "strong", "i", "b", "u"]
    }), o = {
      id: e.id || n,
      open: !0,
      message: r,
      type: e.type || "info",
      duration: t,
      action: e.action,
      icon: e.icon,
      closable: e.closable ?? !0
    };
    return Ct.value.push(o), o.id;
  },
  remove: (e) => {
    Ct.value = Ct.value.filter((n) => n.id !== e);
  },
  removeAll: () => {
    Ct.value = [];
  },
  promise: async (e, n) => {
    const t = n.duration ?? 0, r = Ce.create({
      message: n.loading,
      type: "info",
      icon: () => ae(Rr, { class: "text-ink-white" }),
      duration: t,
      closable: !1
    });
    try {
      const o = await e, l = typeof n.success == "function" ? n.success(o) : n.success, a = n.successDuration ?? n.duration ?? 5;
      return Gl(r, {
        message: l,
        type: "success",
        duration: a * 1e3,
        icon: void 0,
        closable: !0,
        action: n.successAction
      }), o;
    } catch (o) {
      const l = typeof n.error == "function" ? n.error(o) : n.error, a = n.errorDuration ?? n.duration ?? 5;
      throw Gl(r, {
        message: l,
        type: "error",
        duration: a * 1e3,
        icon: void 0,
        closable: !0,
        action: n.errorAction
      }), o;
    }
  },
  success: (e, n = {}) => Ce.create({ message: e, type: "success", ...n }),
  error: (e, n = {}) => Ce.create({ message: e, type: "error", ...n }),
  warning: (e, n = {}) => Ce.create({ message: e, type: "warning", ...n }),
  info: (e, n = {}) => Ce.create({ message: e, type: "info", ...n })
};
N({
  name: "FrappeToasts",
  setup() {
    const e = (t, r) => {
      if (!r)
        Ce.remove(t);
      else {
        const o = Ct.value.find((l) => l.id === t);
        o && (o.open = !0);
      }
    }, n = (t) => {
      Ce.remove(t.id);
    };
    return () => Ct.value.map(
      (t) => ae(gv, {
        key: t.id,
        open: t.open,
        message: t.message,
        type: t.type,
        duration: t.duration,
        action: t.action,
        icon: t.icon,
        closable: t.closable,
        "onUpdate:open": (r) => e(t.id, r),
        onAction: () => n(t)
      })
    );
  }
});
function L(e, ...n) {
  return typeof window < "u" && window.__ ? window.__(e, ...n) : e;
}
const Yl = [
  "default_provider",
  "default_model",
  "max_context_tokens",
  "enable_streaming",
  "enable_tool_calling",
  "rate_limit_per_hour",
  "session_retention_days",
  "business_description",
  "knowledge_token_budget",
  "enable_chat",
  "enable_read_documents",
  "enable_draft_content",
  "enable_create_documents",
  "enable_navigate",
  "enable_report_queries",
  "enable_modify_documents",
  "mask_pii"
];
async function De(e, n = {}) {
  const { call: t } = await import("./index-75cf83d8.js");
  return t(e, n);
}
function Vv() {
  const e = M(!1), n = M(!1), t = M(null), r = M(""), o = M([]), l = M([]), a = M([]), i = M({}), u = M(!1), c = M(!1), d = M(null), f = M({}), p = k(() => t.value ? JSON.stringify(t.value) !== r.value : !1);
  async function v() {
    try {
      const R = await De("jana.api.agents.check_admin");
      e.value = R.is_admin;
    } catch {
      e.value = !1;
    }
    n.value = !0;
  }
  async function y() {
    u.value = !0;
    try {
      const R = await De("frappe.client.get", {
        doctype: "Jana Settings",
        name: "Jana Settings"
      }), B = {};
      for (const z of Yl) {
        const U = R[z];
        typeof U == "number" && (U === 0 || U === 1) ? B[z] = !!U : B[z] = U ?? null;
      }
      t.value = B, r.value = JSON.stringify(t.value);
    } finally {
      u.value = !1;
    }
  }
  async function m() {
    if (!(!t.value || !p.value)) {
      c.value = !0;
      try {
        const R = {};
        for (const B of Yl) {
          const z = t.value[B];
          R[B] = typeof z == "boolean" ? z ? 1 : 0 : z;
        }
        await De("frappe.client.set_value", {
          doctype: "Jana Settings",
          name: "Jana Settings",
          fieldname: R
        }), r.value = JSON.stringify(t.value);
      } finally {
        c.value = !1;
      }
    }
  }
  async function S() {
    try {
      const R = await De("jana.api.providers.list_providers");
      o.value = R;
    } catch {
      try {
        const R = await De("frappe.client.get_list", {
          doctype: "Jana Provider",
          fields: [
            "name",
            "provider_name",
            "provider_type",
            "enabled",
            "is_default",
            "auth_method"
          ],
          limit_page_length: 0,
          order_by: "provider_name asc"
        });
        o.value = R;
      } catch {
        o.value = [];
      }
    }
  }
  async function x(R) {
    if (!R) {
      l.value = [];
      return;
    }
    try {
      const B = await De("jana.api.providers.get_models_for_provider", {
        provider_name: R
      });
      l.value = B;
    } catch {
      l.value = [];
    }
  }
  async function h(R) {
    d.value = R;
    try {
      const B = await De("jana.api.providers.test_connection", {
        provider_name: R
      });
      return f.value[R] = B, B;
    } catch (B) {
      const z = {
        success: !1,
        message: String(B),
        latency_ms: 0,
        model: null
      };
      return f.value[R] = z, z;
    } finally {
      d.value = null;
    }
  }
  async function w(R, B) {
    const z = await De("jana.api.providers.save_provider", {
      provider_name: R,
      data: JSON.stringify(B)
    }), U = o.value.findIndex((oe) => oe.name === R);
    return U >= 0 && (o.value[U] = z), z;
  }
  async function C(R) {
    const B = await De("jana.api.providers.create_provider", {
      data: JSON.stringify(R)
    });
    return o.value.push(B), B;
  }
  async function g(R) {
    await De("jana.api.providers.delete_provider", {
      provider_name: R
    }), o.value = o.value.filter((B) => B.name !== R);
  }
  async function b() {
    try {
      const R = await De("frappe.client.get_list", {
        doctype: "Jana User Key",
        fields: ["name", "user", "provider", "auth_type", "enabled", "connected_at"],
        limit_page_length: 0,
        order_by: "creation desc"
      });
      a.value = R;
    } catch {
      a.value = [];
    }
  }
  async function O(R, B) {
    await De("frappe.client.insert", {
      doc: {
        doctype: "Jana User Key",
        provider: R,
        api_key: B,
        auth_type: "api_key",
        enabled: 1
      }
    }), await b();
  }
  async function T(R) {
    await De("frappe.client.delete", {
      doctype: "Jana User Key",
      name: R
    }), await b();
  }
  async function _() {
    try {
      const R = await De("jana.api.oauth.get_oauth_status");
      i.value = R;
    } catch {
      i.value = {};
    }
  }
  async function j(R, B) {
    const U = await De(B === "google" ? "jana.api.oauth.initiate_google_oauth" : "jana.api.oauth.initiate_openrouter_oauth", { provider_name: R });
    window.location.href = U.auth_url;
  }
  async function $(R) {
    await De("jana.api.oauth.disconnect_oauth", { provider_name: R }), await _();
  }
  return {
    isAdmin: e,
    roleLoaded: n,
    settings: t,
    providers: o,
    availableModels: l,
    userKeys: a,
    oauthStatus: i,
    loading: u,
    saving: c,
    dirty: p,
    testingProvider: d,
    testResults: f,
    detectRole: v,
    loadSettings: y,
    saveSettings: m,
    loadProviders: S,
    loadModelsFor: x,
    testConnection: h,
    saveProvider: w,
    createProvider: C,
    deleteProvider: g,
    loadUserKeys: b,
    addUserKey: O,
    deleteUserKey: T,
    loadOAuthStatus: _,
    connectOAuth: j,
    disconnectOAuth: $
  };
}
const zv = { class: "flex items-center gap-2.5 min-w-0" }, Hv = { class: "min-w-0" }, Uv = { class: "flex items-center gap-2 flex-wrap" }, Kv = { class: "text-sm font-semibold text-gray-900 truncate" }, Wv = {
  key: 0,
  class: "inline-flex items-center rounded-full bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent-600"
}, Gv = {
  key: 1,
  class: "inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500"
}, Yv = { class: "text-xs text-gray-400 mt-0.5" }, Xv = {
  key: 0,
  class: "border-t border-gray-100 px-4 py-4 space-y-5"
}, Jv = { class: "grid gap-4 sm:grid-cols-3" }, Zv = { class: "block text-xs font-medium text-gray-600 mb-1" }, Qv = ["value"], ey = ["value"], ty = { class: "flex items-end gap-4" }, ny = { class: "flex items-center gap-2 cursor-pointer" }, oy = { class: "text-sm text-gray-700" }, ry = { class: "flex items-center gap-2 cursor-pointer" }, ly = { class: "text-sm text-gray-700" }, ay = { class: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" }, iy = { class: "grid gap-4 sm:grid-cols-2" }, sy = { class: "block text-xs font-medium text-gray-600 mb-1" }, uy = ["value"], dy = { value: "API Key" }, cy = { value: "OAuth" }, fy = { class: "block text-xs font-medium text-gray-600 mb-1" }, py = ["placeholder"], vy = { class: "text-xs text-gray-400 mt-0.5" }, yy = { key: 0 }, my = { class: "block text-xs font-medium text-gray-600 mb-1" }, hy = { class: "flex gap-2" }, gy = ["placeholder"], by = { class: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" }, xy = { class: "block text-xs font-medium text-gray-600 mb-1" }, wy = ["placeholder"], _y = { class: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" }, Sy = { class: "block text-xs font-medium text-gray-600 mb-1" }, Cy = ["value"], Ay = { value: "Global Default" }, Oy = { value: "Always On" }, Ey = { value: "Always Off" }, Ty = { class: "text-xs text-gray-400 mt-0.5" }, ky = { class: "flex items-center justify-between pt-2 border-t border-gray-100" }, jy = { class: "flex items-center gap-2" }, Py = ["disabled"], Iy = {
  key: 0,
  class: "h-3 w-3 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"
}, My = {
  key: 0,
  class: "text-xs"
}, Ry = {
  key: 0,
  class: "text-green-600"
}, Dy = {
  key: 1,
  class: "text-red-500"
}, Ly = { class: "flex items-center gap-2" }, $y = ["disabled"], qy = /* @__PURE__ */ N({
  __name: "ProviderCard",
  props: {
    provider: {},
    testResult: {},
    testing: { type: Boolean }
  },
  emits: ["test", "save", "delete"],
  setup(e, { emit: n }) {
    const t = e, r = n, o = M(!1), l = M(!1), a = [
      { value: "openai", label: "OpenAI" },
      { value: "anthropic", label: "Anthropic" },
      { value: "google", label: "Google" },
      { value: "openrouter", label: "OpenRouter" },
      { value: "ollama", label: "Ollama" },
      { value: "vllm", label: "vLLM" },
      { value: "custom", label: "Custom" }
    ], i = Ht({
      provider_type: t.provider.provider_type,
      enabled: !!t.provider.enabled,
      is_default: !!t.provider.is_default,
      auth_method: t.provider.auth_method,
      api_base_url: t.provider.api_base_url || "",
      api_key: "",
      available_models: t.provider.available_models || "",
      mask_pii_override: t.provider.mask_pii_override || "Global Default"
    });
    pe(() => t.provider, (v) => {
      i.provider_type = v.provider_type, i.enabled = !!v.enabled, i.is_default = !!v.is_default, i.auth_method = v.auth_method, i.api_base_url = v.api_base_url || "", i.api_key = "", i.available_models = v.available_models || "", i.mask_pii_override = v.mask_pii_override || "Global Default";
    }, { deep: !0 });
    const u = k(() => {
      const v = t.provider;
      return i.provider_type !== v.provider_type || i.enabled !== !!v.enabled || i.is_default !== !!v.is_default || i.auth_method !== v.auth_method || i.api_base_url !== (v.api_base_url || "") || i.api_key !== "" || i.available_models !== (v.available_models || "") || i.mask_pii_override !== (v.mask_pii_override || "Global Default");
    }), c = k(() => i.provider_type === "ollama" ? "http://localhost:11434" : i.provider_type === "vllm" ? "http://localhost:8000/v1" : i.provider_type === "openrouter" ? "https://openrouter.ai/api/v1" : L("Optional")), d = {
      openai: "bg-sky-50 text-sky-700",
      anthropic: "bg-orange-50 text-orange-700",
      google: "bg-green-50 text-green-700",
      openrouter: "bg-purple-50 text-purple-700",
      ollama: "bg-gray-100 text-gray-700",
      vllm: "bg-gray-100 text-gray-700",
      custom: "bg-gray-100 text-gray-700"
    }, f = k(() => d[t.provider.provider_type] ?? "bg-gray-100 text-gray-700");
    function p() {
      const v = {
        provider_type: i.provider_type,
        enabled: i.enabled ? 1 : 0,
        is_default: i.is_default ? 1 : 0,
        auth_method: i.auth_method,
        api_base_url: i.api_base_url || null,
        available_models: i.available_models || null,
        mask_pii_override: i.mask_pii_override
      };
      i.api_key && (v.api_key = i.api_key), r("save", t.provider.name, v);
    }
    return (v, y) => (A(), H("div", {
      class: le(["rounded-xl border border-gray-200 bg-white transition-shadow", o.value ? "shadow-md" : ""])
    }, [
      I("div", {
        class: "flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none",
        onClick: y[0] || (y[0] = (m) => o.value = !o.value)
      }, [
        I("div", zv, [
          I("div", {
            class: le(["flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold", f.value])
          }, W(e.provider.provider_type.slice(0, 2).toUpperCase()), 3),
          I("div", Hv, [
            I("div", Uv, [
              I("h3", Kv, W(e.provider.provider_name), 1),
              I("span", {
                class: le(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", f.value])
              }, W(e.provider.provider_type), 3),
              e.provider.is_default ? (A(), H("span", Wv, W(s(L)("Default")), 1)) : J("", !0),
              e.provider.enabled ? J("", !0) : (A(), H("span", Gv, W(s(L)("Disabled")), 1))
            ]),
            I("p", Yv, [
              _e(W(e.provider.auth_method) + " ", 1),
              e.provider.api_base_url ? (A(), H(be, { key: 0 }, [
                _e(" · " + W(e.provider.api_base_url), 1)
              ], 64)) : J("", !0)
            ])
          ])
        ]),
        (A(), H("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: le(["flex-shrink-0 text-gray-400 transition-transform", o.value ? "rotate-180" : ""])
        }, [...y[11] || (y[11] = [
          I("polyline", { points: "6 9 12 15 18 9" }, null, -1)
        ])], 2))
      ]),
      o.value ? (A(), H("div", Xv, [
        I("div", Jv, [
          I("div", null, [
            I("label", Zv, W(s(L)("Provider Type")), 1),
            I("select", {
              value: i.provider_type,
              class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400",
              onChange: y[1] || (y[1] = (m) => i.provider_type = m.target.value)
            }, [
              (A(), H(be, null, ot(a, (m) => I("option", {
                key: m.value,
                value: m.value
              }, W(m.label), 9, ey)), 64))
            ], 40, Qv)
          ]),
          I("div", ty, [
            I("label", ny, [
              Le(I("input", {
                "onUpdate:modelValue": y[2] || (y[2] = (m) => i.enabled = m),
                type: "checkbox",
                class: "h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
              }, null, 512), [
                [Qn, i.enabled]
              ]),
              I("span", oy, W(s(L)("Enabled")), 1)
            ]),
            I("label", ry, [
              Le(I("input", {
                "onUpdate:modelValue": y[3] || (y[3] = (m) => i.is_default = m),
                type: "checkbox",
                class: "h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
              }, null, 512), [
                [Qn, i.is_default]
              ]),
              I("span", ly, W(s(L)("Is Default")), 1)
            ])
          ])
        ]),
        I("div", null, [
          I("h4", ay, W(s(L)("Connection")), 1),
          I("div", iy, [
            I("div", null, [
              I("label", sy, W(s(L)("Authentication")), 1),
              I("select", {
                value: i.auth_method,
                class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400",
                onChange: y[4] || (y[4] = (m) => i.auth_method = m.target.value)
              }, [
                I("option", dy, W(s(L)("API Key")), 1),
                I("option", cy, W(s(L)("OAuth")), 1)
              ], 40, uy)
            ]),
            I("div", null, [
              I("label", fy, W(s(L)("API Base URL")), 1),
              Le(I("input", {
                "onUpdate:modelValue": y[5] || (y[5] = (m) => i.api_base_url = m),
                type: "text",
                placeholder: c.value,
                class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
              }, null, 8, py), [
                [Vt, i.api_base_url]
              ]),
              I("p", vy, W(s(L)("Required for Ollama, vLLM, or custom endpoints.")), 1)
            ])
          ])
        ]),
        i.auth_method === "API Key" ? (A(), H("div", yy, [
          I("label", my, W(s(L)("API Key")), 1),
          I("div", hy, [
            Le(I("input", {
              "onUpdate:modelValue": y[6] || (y[6] = (m) => i.api_key = m),
              type: "password",
              placeholder: e.provider.has_api_key ? s(L)("••••••••  (key set, enter new to replace)") : s(L)("Paste your API key"),
              class: "flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            }, null, 8, gy), [
              [Vt, i.api_key]
            ])
          ])
        ])) : J("", !0),
        I("div", null, [
          I("h4", by, W(s(L)("Models")), 1),
          I("label", xy, W(s(L)("Available Models")), 1),
          Le(I("textarea", {
            "onUpdate:modelValue": y[7] || (y[7] = (m) => i.available_models = m),
            rows: "3",
            placeholder: s(L)("Comma-separated list of available model names"),
            class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400 resize-y"
          }, null, 8, wy), [
            [Vt, i.available_models]
          ])
        ]),
        I("div", null, [
          I("h4", _y, W(s(L)("Privacy")), 1),
          I("div", null, [
            I("label", Sy, W(s(L)("PII Masking")), 1),
            I("select", {
              value: i.mask_pii_override,
              class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400",
              onChange: y[8] || (y[8] = (m) => i.mask_pii_override = m.target.value)
            }, [
              I("option", Ay, W(s(L)("Global Default")), 1),
              I("option", Oy, W(s(L)("Always On")), 1),
              I("option", Ey, W(s(L)("Always Off")), 1)
            ], 40, Cy),
            I("p", Ty, W(s(L)("Override the global PII masking setting for this provider. 'Global Default' inherits from Jana Settings.")), 1)
          ])
        ]),
        I("div", ky, [
          I("div", jy, [
            I("button", {
              class: "inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50",
              disabled: e.testing || !e.provider.enabled,
              onClick: y[9] || (y[9] = xe((m) => v.$emit("test", e.provider.name), ["stop"]))
            }, [
              e.testing ? (A(), H("div", Iy)) : (A(), H(be, { key: 1 }, [
                _e(W(s(L)("Test Connection")), 1)
              ], 64))
            ], 8, Py),
            e.testResult ? (A(), H("span", My, [
              e.testResult.success ? (A(), H("span", Ry, W(s(L)("OK")) + " (" + W(e.testResult.latency_ms) + "ms)", 1)) : (A(), H("span", Dy, W(e.testResult.message), 1))
            ])) : J("", !0)
          ]),
          I("div", Ly, [
            I("button", {
              class: "rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 transition-colors",
              onClick: y[10] || (y[10] = xe((m) => v.$emit("delete", e.provider.name), ["stop"]))
            }, W(s(L)("Delete")), 1),
            I("button", {
              class: "rounded-lg bg-accent-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-accent-700 transition-colors disabled:opacity-50",
              disabled: l.value || !u.value,
              onClick: xe(p, ["stop"])
            }, W(l.value ? s(L)("Saving…") : s(L)("Save Provider")), 9, $y)
          ])
        ])
      ])) : J("", !0)
    ], 2));
  }
}), By = { class: "flex h-full flex-col bg-white dark:bg-gray-900" }, Fy = { class: "flex items-center gap-4 border-b border-gray-200 px-6 py-3 flex-shrink-0" }, Ny = { class: "flex-1 text-lg font-semibold text-gray-900" }, Vy = {
  key: 0,
  class: "flex flex-1 items-center justify-center"
}, zy = {
  key: 0,
  class: "max-w-3xl mx-auto px-6 py-6 space-y-6"
}, Hy = { class: "grid gap-4 sm:grid-cols-2" }, Uy = { class: "space-y-4" }, Ky = {
  key: 1,
  class: "max-w-3xl mx-auto px-6 py-6 space-y-4"
}, Wy = { class: "flex items-center justify-between" }, Gy = {
  key: 0,
  class: "rounded-xl border-2 border-dashed border-accent-200 bg-accent-50/30 p-4 space-y-4"
}, Yy = { class: "text-sm font-semibold text-gray-900" }, Xy = { class: "grid gap-4 sm:grid-cols-2" }, Jy = { class: "block text-xs font-medium text-gray-600 mb-1" }, Zy = ["placeholder"], Qy = { class: "block text-xs font-medium text-gray-600 mb-1" }, em = { class: "block text-xs font-medium text-gray-600 mb-1" }, tm = { value: "API Key" }, nm = { value: "OAuth" }, om = { class: "block text-xs font-medium text-gray-600 mb-1" }, rm = ["placeholder"], lm = { class: "block text-xs font-medium text-gray-600 mb-1" }, am = ["placeholder"], im = { class: "block text-xs font-medium text-gray-600 mb-1" }, sm = { value: "Global Default" }, um = { value: "Always On" }, dm = { value: "Always Off" }, cm = { class: "flex items-center gap-4" }, fm = { class: "flex items-center gap-2 cursor-pointer" }, pm = { class: "text-sm text-gray-700" }, vm = { class: "flex items-center gap-2 cursor-pointer" }, ym = { class: "text-sm text-gray-700" }, mm = ["disabled"], hm = {
  key: 1,
  class: "py-8 text-center text-sm text-gray-400"
}, gm = {
  key: 2,
  class: "space-y-3"
}, bm = {
  key: 2,
  class: "max-w-3xl mx-auto px-6 py-6 space-y-4"
}, xm = { class: "space-y-4" }, wm = {
  key: 3,
  class: "max-w-3xl mx-auto px-6 py-6 space-y-6"
}, _m = {
  key: 4,
  class: "max-w-3xl mx-auto px-6 py-6 space-y-6"
}, Sm = { class: "mb-1.5 block text-sm font-medium text-gray-700" }, Cm = ["placeholder"], Am = { class: "text-xs text-gray-400" }, Om = {
  href: "/app/jana-knowledge-article",
  target: "_blank",
  class: "hover:underline"
}, Em = {
  key: 5,
  class: "max-w-3xl mx-auto px-6 py-6"
}, Tm = {
  key: 2,
  class: "flex-1 overflow-y-auto"
}, km = { class: "max-w-3xl mx-auto px-6 py-6" }, qm = /* @__PURE__ */ N({
  __name: "Settings",
  setup(e) {
    const n = Vv(), t = M(0), r = M(!1), o = M(!1), l = Ht({
      provider_name: "",
      provider_type: "openai",
      auth_method: "API Key",
      api_key: "",
      api_base_url: "",
      mask_pii_override: "Global Default",
      enabled: !0,
      is_default: !1
    }), a = k(() => [
      { label: L("General") },
      { label: L("Providers") },
      { label: L("Capabilities") },
      { label: L("Limits") },
      { label: L("Knowledge") },
      { label: L("My Keys") }
    ]), i = k(() => {
      const g = n.providers.value.filter((b) => b.enabled).map((b) => ({
        label: b.provider_name,
        value: b.name
      }));
      return g.unshift({ label: L("— Select —"), value: "" }), g;
    }), u = k(() => {
      const g = n.availableModels.value.map((b) => ({ label: b, value: b }));
      return g.unshift({ label: L("— Select —"), value: "" }), g;
    });
    function c() {
      var g;
      (g = n.settings.value) != null && g.default_provider ? n.loadModelsFor(n.settings.value.default_provider) : n.availableModels.value = [];
    }
    pe(
      () => {
        var g;
        return (g = n.settings.value) == null ? void 0 : g.default_provider;
      },
      (g) => {
        g && n.loadModelsFor(g);
      }
    );
    async function d() {
      try {
        await n.saveSettings(), Ce.success(L("Settings saved"));
      } catch {
        Ce.error(L("Failed to save settings"));
      }
    }
    async function f(g) {
      const b = await n.testConnection(g);
      b.success ? Ce.success(L("Connection successful") + ` (${b.latency_ms}ms)`) : Ce.error(b.message);
    }
    async function p(g, b) {
      try {
        await n.saveProvider(g, b), Ce.success(L("Provider saved"));
      } catch (O) {
        const T = O instanceof Error ? O.message : L("Failed to save provider");
        Ce.error(T);
      }
    }
    async function v(g) {
      if (confirm(L("Delete this provider? This cannot be undone.")))
        try {
          await n.deleteProvider(g), Ce.success(L("Provider deleted"));
        } catch (b) {
          const O = b instanceof Error ? b.message : L("Failed to delete provider");
          Ce.error(O);
        }
    }
    async function y() {
      o.value = !0;
      try {
        await n.createProvider({
          provider_name: l.provider_name.trim(),
          provider_type: l.provider_type,
          auth_method: l.auth_method,
          api_key: l.api_key || void 0,
          api_base_url: l.api_base_url || void 0,
          mask_pii_override: l.mask_pii_override,
          enabled: l.enabled ? 1 : 0,
          is_default: l.is_default ? 1 : 0
        }), Ce.success(L("Provider created")), r.value = !1, l.provider_name = "", l.provider_type = "openai", l.auth_method = "API Key", l.api_key = "", l.api_base_url = "", l.mask_pii_override = "Global Default", l.enabled = !0, l.is_default = !1;
      } catch (g) {
        const b = g instanceof Error ? g.message : L("Failed to create provider");
        Ce.error(b);
      } finally {
        o.value = !1;
      }
    }
    async function m(g, b) {
      try {
        await n.addUserKey(g, b), Ce.success(L("API key added"));
      } catch {
        Ce.error(L("Failed to add API key"));
      }
    }
    async function S(g) {
      try {
        await n.deleteUserKey(g), Ce.success(L("API key removed"));
      } catch {
        Ce.error(L("Failed to remove API key"));
      }
    }
    async function x(g, b) {
      await n.connectOAuth(g, b);
    }
    async function h(g) {
      try {
        await n.disconnectOAuth(g), Ce.success(L("Disconnected"));
      } catch {
        Ce.error(L("Failed to disconnect"));
      }
    }
    we(async () => {
      await n.detectRole();
      const g = [n.loadProviders(), n.loadUserKeys(), n.loadOAuthStatus()];
      n.isAdmin.value && g.push(n.loadSettings()), await Promise.all(g);
    });
    const w = N({
      props: {
        title: { type: String, required: !0 },
        description: { type: String, default: "" }
      },
      setup(g) {
        return () => ae("div", { class: "mb-1" }, [
          ae("h2", { class: "text-sm font-semibold text-gray-900" }, g.title),
          g.description ? ae("p", { class: "mt-0.5 text-xs text-gray-500" }, g.description) : null
        ]);
      }
    }), C = N({
      props: {
        userKeys: { type: Array, default: () => [] },
        providers: { type: Array, default: () => [] },
        oauthStatus: { type: Object, default: () => ({}) }
      },
      emits: ["add-key", "delete-key", "connect-oauth", "disconnect-oauth"],
      setup(g, { emit: b }) {
        const O = M(""), T = M(""), _ = M(!1);
        async function j() {
          if (!(!O.value || !T.value)) {
            _.value = !0;
            try {
              b("add-key", O.value, T.value), O.value = "", T.value = "";
            } finally {
              _.value = !1;
            }
          }
        }
        const $ = k(() => Object.entries(g.oauthStatus).map(([R, B]) => ({ key: R, ...B })));
        return () => ae("div", { class: "space-y-6" }, [
          // Section header
          ae("div", {}, [
            ae("h2", { class: "text-sm font-semibold text-gray-900" }, L("Your API Keys")),
            ae(
              "p",
              { class: "mt-0.5 text-xs text-gray-500" },
              L("Bring your own API key for any provider. Your keys are encrypted and only used for your sessions.")
            )
          ]),
          // Existing keys
          g.userKeys.length ? ae(
            "div",
            { class: "space-y-2" },
            g.userKeys.map(
              (R) => ae(
                "div",
                {
                  key: R.name,
                  class: "flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                },
                [
                  ae("div", {}, [
                    ae("p", { class: "text-sm font-medium text-gray-900" }, R.provider),
                    ae(
                      "p",
                      { class: "text-xs text-gray-500" },
                      R.auth_type === "api_key" ? L("API Key") + " •••••" : R.auth_type
                    )
                  ]),
                  ae(Pt, {
                    label: L("Remove"),
                    variant: "subtle",
                    theme: "red",
                    size: "sm",
                    onClick: () => b("delete-key", R.name)
                  })
                ]
              )
            )
          ) : ae(
            "p",
            { class: "py-4 text-center text-sm text-gray-400" },
            L("No API keys configured yet.")
          ),
          // Add key form
          ae("div", { class: "rounded-lg border border-gray-200 p-4 space-y-3" }, [
            ae("h3", { class: "text-sm font-medium text-gray-700" }, L("Add a Key")),
            ae("div", { class: "grid gap-3 sm:grid-cols-2" }, [
              ae(kt, {
                type: "select",
                placeholder: L("Select provider"),
                options: g.providers.filter((R) => R.enabled).map((R) => ({ label: R.provider_name, value: R.name })),
                modelValue: O.value,
                "onUpdate:modelValue": (R) => {
                  O.value = R;
                }
              }),
              ae(kt, {
                type: "text",
                placeholder: L("Paste API key"),
                modelValue: T.value,
                "onUpdate:modelValue": (R) => {
                  T.value = R;
                }
              })
            ]),
            ae(Pt, {
              label: L("Add Key"),
              variant: "solid",
              size: "sm",
              disabled: !O.value || !T.value,
              loading: _.value,
              onClick: j
            })
          ]),
          // OAuth section
          $.value.length ? ae("div", { class: "space-y-3" }, [
            ae("h3", { class: "text-sm font-semibold text-gray-900" }, L("OAuth Connections")),
            ...$.value.map(
              (R) => ae(
                "div",
                {
                  key: R.key,
                  class: "flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                },
                [
                  ae("div", { class: "flex items-center gap-2" }, [
                    ae("span", { class: "text-sm font-medium text-gray-900" }, R.provider_name),
                    ae(M1, {
                      label: R.connected ? L("Connected") : L("Not connected"),
                      theme: R.connected ? "green" : "gray",
                      variant: "subtle",
                      size: "sm"
                    })
                  ]),
                  R.connected ? ae(Pt, {
                    label: L("Disconnect"),
                    variant: "subtle",
                    theme: "red",
                    size: "sm",
                    onClick: () => b("disconnect-oauth", R.key)
                  }) : ae(Pt, {
                    label: L("Connect"),
                    variant: "solid",
                    size: "sm",
                    onClick: () => b("connect-oauth", R.key, R.provider_type)
                  })
                ]
              )
            )
          ]) : null
        ]);
      }
    });
    return (g, b) => {
      const O = Si("router-link");
      return A(), H("div", By, [
        I("header", Fy, [
          V(O, {
            to: "/jana/chat",
            class: "flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
          }, {
            default: P(() => [
              b[27] || (b[27] = I("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                I("polyline", { points: "15 18 9 12 15 6" })
              ], -1)),
              _e(" " + W(s(L)("Chat")), 1)
            ]),
            _: 1
          }),
          I("h1", Ny, W(s(L)("Settings")), 1),
          s(n).isAdmin.value && s(n).settings.value ? (A(), q(s(Pt), {
            key: 0,
            label: s(L)("Save"),
            variant: "solid",
            disabled: !s(n).dirty.value,
            loading: s(n).saving.value,
            onClick: d
          }, null, 8, ["label", "disabled", "loading"])) : J("", !0)
        ]),
        !s(n).roleLoaded.value || s(n).loading.value ? (A(), H("div", Vy, [...b[28] || (b[28] = [
          I("div", { class: "h-6 w-6 animate-spin rounded-full border-2 border-accent-600 border-t-transparent" }, null, -1)
        ])])) : s(n).isAdmin.value && s(n).settings.value ? (A(), q(s(iv), {
          key: 1,
          tabs: a.value,
          modelValue: t.value,
          "onUpdate:modelValue": b[26] || (b[26] = (T) => t.value = T)
        }, {
          "tab-panel": P(({ tab: T }) => [
            T.label === s(L)("General") ? (A(), H("div", zy, [
              V(s(w), {
                title: s(L)("AI Provider")
              }, null, 8, ["title"]),
              I("div", Hy, [
                V(s(kt), {
                  type: "select",
                  label: s(L)("Default Provider"),
                  options: i.value,
                  modelValue: s(n).settings.value.default_provider,
                  "onUpdate:modelValue": b[0] || (b[0] = (_) => s(n).settings.value.default_provider = _),
                  onChange: c
                }, null, 8, ["label", "options", "modelValue"]),
                V(s(kt), {
                  type: "select",
                  label: s(L)("Default Model"),
                  options: u.value,
                  modelValue: s(n).settings.value.default_model,
                  "onUpdate:modelValue": b[1] || (b[1] = (_) => s(n).settings.value.default_model = _)
                }, null, 8, ["label", "options", "modelValue"])
              ]),
              V(s(kt), {
                type: "number",
                label: s(L)("Max Context Tokens"),
                description: s(L)("Maximum tokens for the LLM context window (512–128000)"),
                modelValue: s(n).settings.value.max_context_tokens,
                "onUpdate:modelValue": b[2] || (b[2] = (_) => s(n).settings.value.max_context_tokens = _),
                modelModifiers: { number: !0 }
              }, null, 8, ["label", "description", "modelValue"]),
              V(s(w), {
                title: s(L)("Behavior")
              }, null, 8, ["title"]),
              I("div", Uy, [
                V(s(ct), {
                  modelValue: s(n).settings.value.enable_streaming,
                  "onUpdate:modelValue": b[3] || (b[3] = (_) => s(n).settings.value.enable_streaming = _),
                  label: s(L)("Enable Streaming"),
                  description: s(L)("Stream AI responses token-by-token for a real-time feel")
                }, null, 8, ["modelValue", "label", "description"]),
                V(s(ct), {
                  modelValue: s(n).settings.value.enable_tool_calling,
                  "onUpdate:modelValue": b[4] || (b[4] = (_) => s(n).settings.value.enable_tool_calling = _),
                  label: s(L)("Enable Tool Calling"),
                  description: s(L)("Allow agents to call Frappe API tools during conversations")
                }, null, 8, ["modelValue", "label", "description"])
              ])
            ])) : T.label === s(L)("Providers") ? (A(), H("div", Ky, [
              I("div", Wy, [
                V(s(w), {
                  title: s(L)("Configured Providers"),
                  description: s(L)("Click a provider to expand and edit all settings.")
                }, null, 8, ["title", "description"]),
                I("button", {
                  class: "text-sm font-medium text-accent-600 hover:text-accent-700",
                  onClick: b[5] || (b[5] = (_) => r.value = !r.value)
                }, W(r.value ? s(L)("Cancel") : "+ " + s(L)("Add Provider")), 1)
              ]),
              r.value ? (A(), H("div", Gy, [
                I("h3", Yy, W(s(L)("New Provider")), 1),
                I("div", Xy, [
                  I("div", null, [
                    I("label", Jy, W(s(L)("Provider Name")) + " *", 1),
                    Le(I("input", {
                      "onUpdate:modelValue": b[6] || (b[6] = (_) => l.provider_name = _),
                      type: "text",
                      placeholder: s(L)("e.g. My OpenAI"),
                      class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                    }, null, 8, Zy), [
                      [Vt, l.provider_name]
                    ])
                  ]),
                  I("div", null, [
                    I("label", Qy, W(s(L)("Provider Type")) + " *", 1),
                    Le(I("select", {
                      "onUpdate:modelValue": b[7] || (b[7] = (_) => l.provider_type = _),
                      class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                    }, [...b[29] || (b[29] = [
                      I("option", { value: "openai" }, "OpenAI", -1),
                      I("option", { value: "anthropic" }, "Anthropic", -1),
                      I("option", { value: "google" }, "Google", -1),
                      I("option", { value: "openrouter" }, "OpenRouter", -1),
                      I("option", { value: "ollama" }, "Ollama", -1),
                      I("option", { value: "vllm" }, "vLLM", -1),
                      I("option", { value: "custom" }, "Custom", -1)
                    ])], 512), [
                      [Do, l.provider_type]
                    ])
                  ]),
                  I("div", null, [
                    I("label", em, W(s(L)("Authentication")), 1),
                    Le(I("select", {
                      "onUpdate:modelValue": b[8] || (b[8] = (_) => l.auth_method = _),
                      class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                    }, [
                      I("option", tm, W(s(L)("API Key")), 1),
                      I("option", nm, W(s(L)("OAuth")), 1)
                    ], 512), [
                      [Do, l.auth_method]
                    ])
                  ]),
                  I("div", null, [
                    I("label", om, W(s(L)("API Key")), 1),
                    Le(I("input", {
                      "onUpdate:modelValue": b[9] || (b[9] = (_) => l.api_key = _),
                      type: "password",
                      placeholder: s(L)("Paste your API key"),
                      class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                    }, null, 8, rm), [
                      [Vt, l.api_key]
                    ])
                  ]),
                  I("div", null, [
                    I("label", lm, W(s(L)("API Base URL")), 1),
                    Le(I("input", {
                      "onUpdate:modelValue": b[10] || (b[10] = (_) => l.api_base_url = _),
                      type: "text",
                      placeholder: s(L)("Optional — for Ollama, vLLM, custom"),
                      class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                    }, null, 8, am), [
                      [Vt, l.api_base_url]
                    ])
                  ]),
                  I("div", null, [
                    I("label", im, W(s(L)("PII Masking")), 1),
                    Le(I("select", {
                      "onUpdate:modelValue": b[11] || (b[11] = (_) => l.mask_pii_override = _),
                      class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                    }, [
                      I("option", sm, W(s(L)("Global Default")), 1),
                      I("option", um, W(s(L)("Always On")), 1),
                      I("option", dm, W(s(L)("Always Off")), 1)
                    ], 512), [
                      [Do, l.mask_pii_override]
                    ])
                  ])
                ]),
                I("div", cm, [
                  I("label", fm, [
                    Le(I("input", {
                      "onUpdate:modelValue": b[12] || (b[12] = (_) => l.enabled = _),
                      type: "checkbox",
                      class: "h-4 w-4 rounded border-gray-300 text-accent-600"
                    }, null, 512), [
                      [Qn, l.enabled]
                    ]),
                    I("span", pm, W(s(L)("Enabled")), 1)
                  ]),
                  I("label", vm, [
                    Le(I("input", {
                      "onUpdate:modelValue": b[13] || (b[13] = (_) => l.is_default = _),
                      type: "checkbox",
                      class: "h-4 w-4 rounded border-gray-300 text-accent-600"
                    }, null, 512), [
                      [Qn, l.is_default]
                    ]),
                    I("span", ym, W(s(L)("Is Default")), 1)
                  ])
                ]),
                I("button", {
                  class: "rounded-lg bg-accent-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-accent-700 disabled:opacity-50 transition-colors",
                  disabled: !l.provider_name.trim() || o.value,
                  onClick: y
                }, W(o.value ? s(L)("Creating…") : s(L)("Create Provider")), 9, mm)
              ])) : J("", !0),
              !s(n).providers.value.length && !r.value ? (A(), H("div", hm, W(s(L)("No providers configured.")), 1)) : J("", !0),
              s(n).providers.value.length ? (A(), H("div", gm, [
                (A(!0), H(be, null, ot(s(n).providers.value, (_) => (A(), q(qy, {
                  key: _.name,
                  provider: _,
                  "test-result": s(n).testResults.value[_.name],
                  testing: s(n).testingProvider.value === _.name,
                  onTest: f,
                  onSave: p,
                  onDelete: v
                }, null, 8, ["provider", "test-result", "testing"]))), 128))
              ])) : J("", !0)
            ])) : T.label === s(L)("Capabilities") ? (A(), H("div", bm, [
              V(s(w), {
                title: s(L)("AI Capabilities"),
                description: s(L)("Control what Jana is allowed to do in conversations")
              }, null, 8, ["title", "description"]),
              I("div", xm, [
                V(s(ct), {
                  modelValue: s(n).settings.value.enable_chat,
                  "onUpdate:modelValue": b[14] || (b[14] = (_) => s(n).settings.value.enable_chat = _),
                  label: s(L)("Chat / Q&A"),
                  description: s(L)("Basic conversational AI")
                }, null, 8, ["modelValue", "label", "description"]),
                V(s(ct), {
                  modelValue: s(n).settings.value.enable_read_documents,
                  "onUpdate:modelValue": b[15] || (b[15] = (_) => s(n).settings.value.enable_read_documents = _),
                  label: s(L)("Read Documents"),
                  description: s(L)("Allow AI to read Frappe documents for context")
                }, null, 8, ["modelValue", "label", "description"]),
                V(s(ct), {
                  modelValue: s(n).settings.value.enable_draft_content,
                  "onUpdate:modelValue": b[16] || (b[16] = (_) => s(n).settings.value.enable_draft_content = _),
                  label: s(L)("Draft Content"),
                  description: s(L)("Generate emails, descriptions, and summaries")
                }, null, 8, ["modelValue", "label", "description"]),
                V(s(ct), {
                  modelValue: s(n).settings.value.enable_create_documents,
                  "onUpdate:modelValue": b[17] || (b[17] = (_) => s(n).settings.value.enable_create_documents = _),
                  label: s(L)("Create Documents"),
                  description: s(L)("Allow AI to create new records in the system")
                }, null, 8, ["modelValue", "label", "description"]),
                V(s(ct), {
                  modelValue: s(n).settings.value.enable_navigate,
                  "onUpdate:modelValue": b[18] || (b[18] = (_) => s(n).settings.value.enable_navigate = _),
                  label: s(L)("Navigate to Pages"),
                  description: s(L)("Allow AI to direct users to specific pages or reports")
                }, null, 8, ["modelValue", "label", "description"]),
                V(s(ct), {
                  modelValue: s(n).settings.value.enable_report_queries,
                  "onUpdate:modelValue": b[19] || (b[19] = (_) => s(n).settings.value.enable_report_queries = _),
                  label: s(L)("Run Report Queries"),
                  description: s(L)("Allow AI to query reports and return data")
                }, null, 8, ["modelValue", "label", "description"]),
                V(s(ct), {
                  modelValue: s(n).settings.value.enable_modify_documents,
                  "onUpdate:modelValue": b[20] || (b[20] = (_) => s(n).settings.value.enable_modify_documents = _),
                  label: s(L)("Modify Documents"),
                  description: s(L)("Allow AI to change existing records — use with caution")
                }, null, 8, ["modelValue", "label", "description"])
              ])
            ])) : T.label === s(L)("Limits") ? (A(), H("div", wm, [
              V(s(w), {
                title: s(L)("Rate Limits")
              }, null, 8, ["title"]),
              V(s(kt), {
                type: "number",
                label: s(L)("Messages per User per Hour"),
                description: s(L)("Set to 0 for unlimited"),
                modelValue: s(n).settings.value.rate_limit_per_hour,
                "onUpdate:modelValue": b[21] || (b[21] = (_) => s(n).settings.value.rate_limit_per_hour = _),
                modelModifiers: { number: !0 }
              }, null, 8, ["label", "description", "modelValue"]),
              V(s(kt), {
                type: "number",
                label: s(L)("Session Retention (days)"),
                description: s(L)("Auto-archive sessions older than this. Set to 0 to keep forever."),
                modelValue: s(n).settings.value.session_retention_days,
                "onUpdate:modelValue": b[22] || (b[22] = (_) => s(n).settings.value.session_retention_days = _),
                modelModifiers: { number: !0 }
              }, null, 8, ["label", "description", "modelValue"]),
              V(s(w), {
                title: s(L)("Privacy")
              }, null, 8, ["title"]),
              V(s(ct), {
                modelValue: s(n).settings.value.mask_pii,
                "onUpdate:modelValue": b[23] || (b[23] = (_) => s(n).settings.value.mask_pii = _),
                label: s(L)("Auto-Mask PII"),
                description: s(L)("Automatically mask personal identifiable information (names, emails, phone numbers) before sending to cloud LLM providers. Recommended for GDPR compliance.")
              }, null, 8, ["modelValue", "label", "description"])
            ])) : T.label === s(L)("Knowledge") ? (A(), H("div", _m, [
              V(s(w), {
                title: s(L)("Business Context"),
                description: s(L)("This description is included in every AI conversation to provide business context.")
              }, null, 8, ["title", "description"]),
              I("div", null, [
                I("label", Sm, W(s(L)("Business Description")), 1),
                Le(I("textarea", {
                  "onUpdate:modelValue": b[24] || (b[24] = (_) => s(n).settings.value.business_description = _),
                  rows: "6",
                  class: "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-accent-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent-400",
                  placeholder: s(L)("Describe your business, products, and services...")
                }, null, 8, Cm), [
                  [Vt, s(n).settings.value.business_description]
                ])
              ]),
              V(s(kt), {
                type: "number",
                label: s(L)("Knowledge Token Budget"),
                description: s(L)("Maximum tokens allocated for knowledge articles in the system prompt"),
                modelValue: s(n).settings.value.knowledge_token_budget,
                "onUpdate:modelValue": b[25] || (b[25] = (_) => s(n).settings.value.knowledge_token_budget = _),
                modelModifiers: { number: !0 }
              }, null, 8, ["label", "description", "modelValue"]),
              I("p", Am, [
                I("a", Om, W(s(L)("Manage knowledge articles in Desk")) + " → ", 1)
              ])
            ])) : T.label === s(L)("My Keys") ? (A(), H("div", Em, [
              V(s(C), {
                "user-keys": s(n).userKeys.value,
                providers: s(n).providers.value,
                "oauth-status": s(n).oauthStatus.value,
                onAddKey: m,
                onDeleteKey: S,
                onConnectOauth: x,
                onDisconnectOauth: h
              }, null, 8, ["user-keys", "providers", "oauth-status"])
            ])) : J("", !0)
          ]),
          _: 1
        }, 8, ["tabs", "modelValue"])) : (A(), H("div", Tm, [
          I("div", km, [
            V(s(C), {
              "user-keys": s(n).userKeys.value,
              providers: s(n).providers.value,
              "oauth-status": s(n).oauthStatus.value,
              onAddKey: m,
              onDeleteKey: S,
              onConnectOauth: x,
              onDisconnectOauth: h
            }, null, 8, ["user-keys", "providers", "oauth-status"])
          ])
        ]))
      ]);
    };
  }
});
export {
  zt as F,
  J1 as S,
  ov as _,
  Rr as a,
  iv as b,
  gv as c,
  na as d,
  T1 as e,
  M1 as f,
  Pt as g,
  H1 as h,
  W1 as i,
  kt as j,
  e1 as k,
  ct as l,
  Y1 as m,
  tv as n,
  a1 as o,
  qm as p,
  Ce as t
};
