var ai = (e, o, t) => {
  if (!o.has(e))
    throw TypeError("Cannot " + t);
};
var yn = (e, o, t) => (ai(e, o, "read from private field"), t ? t.call(e) : o.get(e)), Xr = (e, o, t) => {
  if (o.has(e))
    throw TypeError("Cannot add the same private member more than once");
  o instanceof WeakSet ? o.add(e) : o.set(e, t);
};
import * as rn from "/assets/dock/js/vendor/vue.esm.js";
import { markRaw as sn, openBlock as C, createElementBlock as z, createElementVNode as j, computed as P, unref as u, shallowRef as un, watch as pe, triggerRef as Jr, onScopeDispose as sr, ref as I, onUnmounted as Xe, watchEffect as Ae, onMounted as Se, cloneVNode as ur, h as ie, Fragment as be, defineComponent as V, inject as kn, provide as Tn, reactive as Ht, nextTick as ge, toRaw as Et, shallowReadonly as Ft, getCurrentScope as Kl, customRef as ii, toValue as Te, onBeforeUnmount as si, readonly as Gl, getCurrentInstance as Dt, effectScope as Yl, toRefs as Ue, isRef as wn, toHandlerKey as ui, camelize as Xl, toRef as di, Comment as ci, mergeProps as ee, createBlock as B, normalizeStyle as St, withCtx as q, renderSlot as F, Teleport as dr, createCommentVNode as J, renderList as pt, watchPostEffect as Jl, mergeDefaults as pi, createVNode as K, withModifiers as xe, withKeys as Pt, watchSyncEffect as fi, withMemo as vi, resolveDynamicComponent as dt, normalizeProps as Ie, createTextVNode as _e, toDisplayString as H, guardReactiveProps as qe, onBeforeMount as yi, toHandlers as mi, normalizeClass as ae, useSlots as Zl, withDirectives as Pe, vShow as Zr, mergeModels as Ko, useModel as Ql, useAttrs as ro, createSlots as Nn, vModelCheckbox as Jn, vModelText as jt, createStaticVNode as hi, vModelSelect as Mo } from "/assets/dock/js/vendor/vue.esm.js";
import { useRouter as gi } from "/assets/dock/js/vendor/vue-router.esm.js";
function ea(e, o, t) {
  var r;
  return function() {
    var n = this, l = arguments, a = function() {
      r = void 0, t || e.apply(n, l);
    }, i = t && !r;
    clearTimeout(r), r = window.setTimeout(a, o), i && e.apply(n, l);
  };
}
const bi = {
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
function xi(e, o) {
  return C(), z("svg", bi, [...o[0] || (o[0] = [
    j("path", { d: "M18 6 6 18" }, null, -1),
    j("path", { d: "m6 6 12 12" }, null, -1)
  ])]);
}
const wi = sn({ name: "lucide-x", render: xi }), _i = {
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
function Si(e, o) {
  return C(), z("svg", _i, [...o[0] || (o[0] = [
    j("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }, null, -1),
    j("path", { d: "M12 16v-4" }, null, -1),
    j("path", { d: "M12 8h.01" }, null, -1)
  ])]);
}
const Ci = sn({ name: "lucide-info", render: Si });
function tn(e, o, t) {
  let r = t.initialDeps ?? [], n, l = !0;
  function a() {
    var i, s, c;
    let d;
    t.key && ((i = t.debug) != null && i.call(t)) && (d = Date.now());
    const p = e();
    if (!(p.length !== r.length || p.some((y, m) => r[m] !== y)))
      return n;
    r = p;
    let v;
    if (t.key && ((s = t.debug) != null && s.call(t)) && (v = Date.now()), n = o(...p), t.key && ((c = t.debug) != null && c.call(t))) {
      const y = Math.round((Date.now() - d) * 100) / 100, m = Math.round((Date.now() - v) * 100) / 100, x = m / 16, w = (h, _) => {
        for (h = String(h); h.length < _; )
          h = " " + h;
        return h;
      };
      console.info(
        `%c⏱ ${w(m, 5)} /${w(y, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * x, 120)
        )}deg 100% 31%);`,
        t == null ? void 0 : t.key
      );
    }
    return t != null && t.onChange && !(l && t.skipInitialOnChange) && t.onChange(n), l = !1, n;
  }
  return a.updateDeps = (i) => {
    r = i;
  }, a;
}
function Qr(e, o) {
  if (e === void 0)
    throw new Error(`Unexpected undefined${o ? `: ${o}` : ""}`);
  return e;
}
const Ai = (e, o) => Math.abs(e - o) < 1.01, Oi = (e, o, t) => {
  let r;
  return function(...n) {
    e.clearTimeout(r), r = e.setTimeout(() => o.apply(this, n), t);
  };
}, el = (e) => {
  const { offsetWidth: o, offsetHeight: t } = e;
  return { width: o, height: t };
}, Ei = (e) => e, ki = (e) => {
  const o = Math.max(e.startIndex - e.overscan, 0), t = Math.min(e.endIndex + e.overscan, e.count - 1), r = [];
  for (let n = o; n <= t; n++)
    r.push(n);
  return r;
}, Ti = (e, o) => {
  const t = e.scrollElement;
  if (!t)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  const n = (a) => {
    const { width: i, height: s } = a;
    o({ width: Math.round(i), height: Math.round(s) });
  };
  if (n(el(t)), !r.ResizeObserver)
    return () => {
    };
  const l = new r.ResizeObserver((a) => {
    const i = () => {
      const s = a[0];
      if (s != null && s.borderBoxSize) {
        const c = s.borderBoxSize[0];
        if (c) {
          n({ width: c.inlineSize, height: c.blockSize });
          return;
        }
      }
      n(el(t));
    };
    e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(i) : i();
  });
  return l.observe(t, { box: "border-box" }), () => {
    l.unobserve(t);
  };
}, tl = {
  passive: !0
}, nl = typeof window > "u" ? !0 : "onscrollend" in window, ji = (e, o) => {
  const t = e.scrollElement;
  if (!t)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  let n = 0;
  const l = e.options.useScrollendEvent && nl ? () => {
  } : Oi(
    r,
    () => {
      o(n, !1);
    },
    e.options.isScrollingResetDelay
  ), a = (d) => () => {
    const { horizontal: p, isRtl: f } = e.options;
    n = p ? t.scrollLeft * (f && -1 || 1) : t.scrollTop, l(), o(n, d);
  }, i = a(!0), s = a(!1);
  t.addEventListener("scroll", i, tl);
  const c = e.options.useScrollendEvent && nl;
  return c && t.addEventListener("scrollend", s, tl), () => {
    t.removeEventListener("scroll", i), c && t.removeEventListener("scrollend", s);
  };
}, Pi = (e, o, t) => {
  if (o != null && o.borderBoxSize) {
    const r = o.borderBoxSize[0];
    if (r)
      return Math.round(
        r[t.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return e[t.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, Mi = (e, {
  adjustments: o = 0,
  behavior: t
}, r) => {
  var n, l;
  const a = e + o;
  (l = (n = r.scrollElement) == null ? void 0 : n.scrollTo) == null || l.call(n, {
    [r.options.horizontal ? "left" : "top"]: a,
    behavior: t
  });
};
class Ii {
  constructor(o) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.currentScrollToIndex = null, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.laneAssignments = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.prevLanes = void 0, this.lanesChangedFlag = !1, this.lanesSettling = !1, this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.observer = /* @__PURE__ */ (() => {
      let t = null;
      const r = () => t || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : t = new this.targetWindow.ResizeObserver((n) => {
        n.forEach((l) => {
          const a = () => {
            this._measureElement(l.target, l);
          };
          this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(a) : a();
        });
      }));
      return {
        disconnect: () => {
          var n;
          (n = r()) == null || n.disconnect(), t = null;
        },
        observe: (n) => {
          var l;
          return (l = r()) == null ? void 0 : l.observe(n, { box: "border-box" });
        },
        unobserve: (n) => {
          var l;
          return (l = r()) == null ? void 0 : l.unobserve(n);
        }
      };
    })(), this.range = null, this.setOptions = (t) => {
      Object.entries(t).forEach(([r, n]) => {
        typeof n > "u" && delete t[r];
      }), this.options = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: Ei,
        rangeExtractor: ki,
        onChange: () => {
        },
        measureElement: Pi,
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
      var r, n;
      (n = (r = this.options).onChange) == null || n.call(r, this, t);
    }, this.maybeNotify = tn(
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
        this.scrollElement = r, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((t = this.scrollElement) == null ? void 0 : t.window) ?? null, this.elementsCache.forEach((n) => {
          this.observer.observe(n);
        }), this.unsubs.push(
          this.options.observeElementRect(this, (n) => {
            this.scrollRect = n, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (n, l) => {
            this.scrollAdjustments = 0, this.scrollDirection = l ? this.getScrollOffset() < n ? "forward" : "backward" : null, this.scrollOffset = n, this.isScrolling = l, this.maybeNotify();
          })
        ), this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
      }
    }, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (t, r) => {
      const n = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
      for (let a = r - 1; a >= 0; a--) {
        const i = t[a];
        if (n.has(i.lane))
          continue;
        const s = l.get(
          i.lane
        );
        if (s == null || i.end > s.end ? l.set(i.lane, i) : i.end < s.end && n.set(i.lane, !0), n.size === this.options.lanes)
          break;
      }
      return l.size === this.options.lanes ? Array.from(l.values()).sort((a, i) => a.end === i.end ? a.index - i.index : a.end - i.end)[0] : void 0;
    }, this.getMeasurementOptions = tn(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled,
        this.options.lanes
      ],
      (t, r, n, l, a, i) => (this.prevLanes !== void 0 && this.prevLanes !== i && (this.lanesChangedFlag = !0), this.prevLanes = i, this.pendingMeasuredCacheIndexes = [], {
        count: t,
        paddingStart: r,
        scrollMargin: n,
        getItemKey: l,
        enabled: a,
        lanes: i
      }),
      {
        key: !1
      }
    ), this.getMeasurements = tn(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: t, paddingStart: r, scrollMargin: n, getItemKey: l, enabled: a, lanes: i }, s) => {
        if (!a)
          return this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), [];
        if (this.laneAssignments.size > t)
          for (const f of this.laneAssignments.keys())
            f >= t && this.laneAssignments.delete(f);
        this.lanesChangedFlag && (this.lanesChangedFlag = !1, this.lanesSettling = !0, this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), this.pendingMeasuredCacheIndexes = []), this.measurementsCache.length === 0 && !this.lanesSettling && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((f) => {
          this.itemSizeCache.set(f.key, f.size);
        }));
        const c = this.lanesSettling ? 0 : this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [], this.lanesSettling && this.measurementsCache.length === t && (this.lanesSettling = !1);
        const d = this.measurementsCache.slice(0, c), p = new Array(i).fill(
          void 0
        );
        for (let f = 0; f < c; f++) {
          const v = d[f];
          v && (p[v.lane] = f);
        }
        for (let f = c; f < t; f++) {
          const v = l(f), y = this.laneAssignments.get(f);
          let m, x;
          if (y !== void 0 && this.options.lanes > 1) {
            m = y;
            const S = p[m], g = S !== void 0 ? d[S] : void 0;
            x = g ? g.end + this.options.gap : r + n;
          } else {
            const S = this.options.lanes === 1 ? d[f - 1] : this.getFurthestMeasurement(d, f);
            x = S ? S.end + this.options.gap : r + n, m = S ? S.lane : f % this.options.lanes, this.options.lanes > 1 && this.laneAssignments.set(f, m);
          }
          const w = s.get(v), h = typeof w == "number" ? w : this.options.estimateSize(f), _ = x + h;
          d[f] = {
            index: f,
            start: x,
            size: h,
            end: _,
            key: v,
            lane: m
          }, p[m] = f;
        }
        return this.measurementsCache = d, d;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getMeasurements",
        debug: () => this.options.debug
      }
    ), this.calculateRange = tn(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (t, r, n, l) => this.range = t.length > 0 && r > 0 ? Ri({
        measurements: t,
        outerSize: r,
        scrollOffset: n,
        lanes: l
      }) : null,
      {
        key: process.env.NODE_ENV !== "production" && "calculateRange",
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = tn(
      () => {
        let t = null, r = null;
        const n = this.calculateRange();
        return n && (t = n.startIndex, r = n.endIndex), this.maybeNotify.updateDeps([this.isScrolling, t, r]), [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          t,
          r
        ];
      },
      (t, r, n, l, a) => l === null || a === null ? [] : t({
        startIndex: l,
        endIndex: a,
        overscan: r,
        count: n
      }),
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualIndexes",
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (t) => {
      const r = this.options.indexAttribute, n = t.getAttribute(r);
      return n ? parseInt(n, 10) : (console.warn(
        `Missing attribute name '${r}={index}' on measured element.`
      ), -1);
    }, this._measureElement = (t, r) => {
      const n = this.indexFromElement(t), l = this.measurementsCache[n];
      if (!l)
        return;
      const a = l.key, i = this.elementsCache.get(a);
      i !== t && (i && this.observer.unobserve(i), this.observer.observe(t), this.elementsCache.set(a, t)), t.isConnected && this.resizeItem(n, this.options.measureElement(t, r, this));
    }, this.resizeItem = (t, r) => {
      const n = this.measurementsCache[t];
      if (!n)
        return;
      const l = this.itemSizeCache.get(n.key) ?? n.size, a = r - l;
      a !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(n, a, this) : n.start < this.getScrollOffset() + this.scrollAdjustments) && (process.env.NODE_ENV !== "production" && this.options.debug && console.info("correction", a), this._scrollToOffset(this.getScrollOffset(), {
        adjustments: this.scrollAdjustments += a,
        behavior: void 0
      })), this.pendingMeasuredCacheIndexes.push(n.index), this.itemSizeCache = new Map(this.itemSizeCache.set(n.key, r)), this.notify(!1));
    }, this.measureElement = (t) => {
      if (!t) {
        this.elementsCache.forEach((r, n) => {
          r.isConnected || (this.observer.unobserve(r), this.elementsCache.delete(n));
        });
        return;
      }
      this._measureElement(t, void 0);
    }, this.getVirtualItems = tn(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (t, r) => {
        const n = [];
        for (let l = 0, a = t.length; l < a; l++) {
          const i = t[l], s = r[i];
          n.push(s);
        }
        return n;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualItems",
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (t) => {
      const r = this.getMeasurements();
      if (r.length !== 0)
        return Qr(
          r[ta(
            0,
            r.length - 1,
            (n) => Qr(r[n]).start,
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
    }, this.getOffsetForAlignment = (t, r, n = 0) => {
      if (!this.scrollElement)
        return 0;
      const l = this.getSize(), a = this.getScrollOffset();
      r === "auto" && (r = t >= a + l ? "end" : "start"), r === "center" ? t += (n - l) / 2 : r === "end" && (t -= l);
      const i = this.getMaxScrollOffset();
      return Math.max(Math.min(i, t), 0);
    }, this.getOffsetForIndex = (t, r = "auto") => {
      t = Math.max(0, Math.min(t, this.options.count - 1));
      const n = this.measurementsCache[t];
      if (!n)
        return;
      const l = this.getSize(), a = this.getScrollOffset();
      if (r === "auto")
        if (n.end >= a + l - this.options.scrollPaddingEnd)
          r = "end";
        else if (n.start <= a + this.options.scrollPaddingStart)
          r = "start";
        else
          return [a, r];
      if (r === "end" && t === this.options.count - 1)
        return [this.getMaxScrollOffset(), r];
      const i = r === "end" ? n.end + this.options.scrollPaddingEnd : n.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(i, r, n.size),
        r
      ];
    }, this.isDynamicMode = () => this.elementsCache.size > 0, this.scrollToOffset = (t, { align: r = "start", behavior: n } = {}) => {
      n === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getOffsetForAlignment(t, r), {
        adjustments: void 0,
        behavior: n
      });
    }, this.scrollToIndex = (t, { align: r = "auto", behavior: n } = {}) => {
      n === "smooth" && this.isDynamicMode() && console.warn(
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
        const [p, f] = d;
        this._scrollToOffset(p, { adjustments: void 0, behavior: n }), this.targetWindow.requestAnimationFrame(() => {
          if (!this.targetWindow)
            return;
          const v = () => {
            if (this.currentScrollToIndex !== t)
              return;
            const y = this.getScrollOffset(), m = this.getOffsetForIndex(t, f);
            if (!m) {
              console.warn("Failed to get offset for index:", t);
              return;
            }
            Ai(m[0], y) || s(f);
          };
          this.isDynamicMode() ? this.targetWindow.requestAnimationFrame(v) : v();
        });
      }, s = (c) => {
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
      let n;
      if (r.length === 0)
        n = this.options.paddingStart;
      else if (this.options.lanes === 1)
        n = ((t = r[r.length - 1]) == null ? void 0 : t.end) ?? 0;
      else {
        const l = Array(this.options.lanes).fill(null);
        let a = r.length - 1;
        for (; a >= 0 && l.some((i) => i === null); ) {
          const i = r[a];
          l[i.lane] === null && (l[i.lane] = i.end), a--;
        }
        n = Math.max(...l.filter((i) => i !== null));
      }
      return Math.max(
        n - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    }, this._scrollToOffset = (t, {
      adjustments: r,
      behavior: n
    }) => {
      this.options.scrollToFn(t, { behavior: n, adjustments: r }, this);
    }, this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map(), this.laneAssignments = /* @__PURE__ */ new Map(), this.notify(!1);
    }, this.setOptions(o);
  }
}
const ta = (e, o, t, r) => {
  for (; e <= o; ) {
    const n = (e + o) / 2 | 0, l = t(n);
    if (l < r)
      e = n + 1;
    else if (l > r)
      o = n - 1;
    else
      return n;
  }
  return e > 0 ? e - 1 : 0;
};
function Ri({
  measurements: e,
  outerSize: o,
  scrollOffset: t,
  lanes: r
}) {
  const n = e.length - 1, l = (s) => e[s].start;
  if (e.length <= r)
    return {
      startIndex: 0,
      endIndex: n
    };
  let a = ta(
    0,
    n,
    l,
    t
  ), i = a;
  if (r === 1)
    for (; i < n && e[i].end < t + o; )
      i++;
  else if (r > 1) {
    const s = Array(r).fill(0);
    for (; i < n && s.some((d) => d < t + o); ) {
      const d = e[i];
      s[d.lane] = d.end, i++;
    }
    const c = Array(r).fill(t + o);
    for (; a >= 0 && c.some((d) => d >= t); ) {
      const d = e[a];
      c[d.lane] = d.start, a--;
    }
    a = Math.max(0, a - a % r), i = Math.min(n, i + (r - 1 - i % r));
  }
  return { startIndex: a, endIndex: i };
}
function Di(e) {
  const o = new Ii(u(e)), t = un(o), r = o._didMount();
  return pe(
    () => u(e).getScrollElement(),
    (n) => {
      n && o._willUpdate();
    },
    {
      immediate: !0
    }
  ), pe(
    () => u(e),
    (n) => {
      o.setOptions({
        ...n,
        onChange: (l, a) => {
          var i;
          Jr(t), (i = n.onChange) == null || i.call(n, l, a);
        }
      }), o._willUpdate(), Jr(t);
    },
    {
      immediate: !0
    }
  ), sr(r), t;
}
function Li(e) {
  return Di(
    P(() => ({
      observeElementRect: Ti,
      observeElementOffset: ji,
      scrollToFn: Mi,
      ...u(e)
    }))
  );
}
function $i(e, o, t) {
  let r = I(t == null ? void 0 : t.value), n = P(() => e.value !== void 0);
  return [P(() => n.value ? e.value : r.value), function(l) {
    return n.value || (r.value = l), o == null ? void 0 : o(l);
  }];
}
function qi(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((o) => setTimeout(() => {
    throw o;
  }));
}
function Zn() {
  let e = [], o = { addEventListener(t, r, n, l) {
    return t.addEventListener(r, n, l), o.add(() => t.removeEventListener(r, n, l));
  }, requestAnimationFrame(...t) {
    let r = requestAnimationFrame(...t);
    o.add(() => cancelAnimationFrame(r));
  }, nextFrame(...t) {
    o.requestAnimationFrame(() => {
      o.requestAnimationFrame(...t);
    });
  }, setTimeout(...t) {
    let r = setTimeout(...t);
    o.add(() => clearTimeout(r));
  }, microTask(...t) {
    let r = { current: !0 };
    return qi(() => {
      r.current && t[0]();
    }), o.add(() => {
      r.current = !1;
    });
  }, style(t, r, n) {
    let l = t.style.getPropertyValue(r);
    return Object.assign(t.style, { [r]: n }), this.add(() => {
      Object.assign(t.style, { [r]: l });
    });
  }, group(t) {
    let r = Zn();
    return t(r), this.add(() => r.dispose());
  }, add(t) {
    return e.push(t), () => {
      let r = e.indexOf(t);
      if (r >= 0)
        for (let n of e.splice(r, 1))
          n();
    };
  }, dispose() {
    for (let t of e.splice(0))
      t();
  } };
  return o;
}
function Bi() {
  let e = Zn();
  return Xe(() => e.dispose()), e;
}
function Fi() {
  let e = Bi();
  return (o) => {
    e.dispose(), e.nextFrame(o);
  };
}
var ol;
let Ni = Symbol("headlessui.useid"), Vi = 0;
const jn = (ol = rn.useId) != null ? ol : function() {
  return rn.inject(Ni, () => `${++Vi}`)();
};
function he(e) {
  var o;
  if (e == null || e.value == null)
    return null;
  let t = (o = e.value.$el) != null ? o : e.value;
  return t instanceof Node ? t : null;
}
function wt(e, o, ...t) {
  if (e in o) {
    let n = o[e];
    return typeof n == "function" ? n(...t) : n;
  }
  let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(o).map((n) => `"${n}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, wt), r;
}
var zi = Object.defineProperty, Hi = (e, o, t) => o in e ? zi(e, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[o] = t, rl = (e, o, t) => (Hi(e, typeof o != "symbol" ? o + "" : o, t), t);
let Ui = class {
  constructor() {
    rl(this, "current", this.detect()), rl(this, "currentId", 0);
  }
  set(o) {
    this.current !== o && (this.currentId = 0, this.current = o);
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
}, cr = new Ui();
function pr(e) {
  if (cr.isServer)
    return null;
  if (e instanceof Node)
    return e.ownerDocument;
  if (e != null && e.hasOwnProperty("value")) {
    let o = he(e);
    if (o)
      return o.ownerDocument;
  }
  return document;
}
let ll = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var Wi = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(Wi || {}), Ki = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Ki || {}), Gi = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Gi || {}), na = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(na || {});
function Yi(e, o = 0) {
  var t;
  return e === ((t = pr(e)) == null ? void 0 : t.body) ? !1 : wt(o, { 0() {
    return e.matches(ll);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(ll))
        return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var Xi = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Xi || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Ji(e, o = (t) => t) {
  return e.slice().sort((t, r) => {
    let n = o(t), l = o(r);
    if (n === null || l === null)
      return 0;
    let a = n.compareDocumentPosition(l);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Zi() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Qi() {
  return /Android/gi.test(window.navigator.userAgent);
}
function oa() {
  return Zi() || Qi();
}
function Vn(e, o, t) {
  cr.isServer || Ae((r) => {
    document.addEventListener(e, o, t), r(() => document.removeEventListener(e, o, t));
  });
}
function es(e, o, t) {
  cr.isServer || Ae((r) => {
    window.addEventListener(e, o, t), r(() => window.removeEventListener(e, o, t));
  });
}
function ts(e, o, t = P(() => !0)) {
  function r(l, a) {
    if (!t.value || l.defaultPrevented)
      return;
    let i = a(l);
    if (i === null || !i.getRootNode().contains(i))
      return;
    let s = function c(d) {
      return typeof d == "function" ? c(d()) : Array.isArray(d) || d instanceof Set ? d : [d];
    }(e);
    for (let c of s) {
      if (c === null)
        continue;
      let d = c instanceof HTMLElement ? c : he(c);
      if (d != null && d.contains(i) || l.composed && l.composedPath().includes(d))
        return;
    }
    return !Yi(i, na.Loose) && i.tabIndex !== -1 && l.preventDefault(), o(l, i);
  }
  let n = I(null);
  Vn("pointerdown", (l) => {
    var a, i;
    t.value && (n.value = ((i = (a = l.composedPath) == null ? void 0 : a.call(l)) == null ? void 0 : i[0]) || l.target);
  }, !0), Vn("mousedown", (l) => {
    var a, i;
    t.value && (n.value = ((i = (a = l.composedPath) == null ? void 0 : a.call(l)) == null ? void 0 : i[0]) || l.target);
  }, !0), Vn("click", (l) => {
    oa() || n.value && (r(l, () => n.value), n.value = null);
  }, !0), Vn("touchend", (l) => r(l, () => l.target instanceof HTMLElement ? l.target : null), !0), es("blur", (l) => r(l, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function al(e, o) {
  if (e)
    return e;
  let t = o ?? "button";
  if (typeof t == "string" && t.toLowerCase() === "button")
    return "button";
}
function ns(e, o) {
  let t = I(al(e.value.type, e.value.as));
  return Se(() => {
    t.value = al(e.value.type, e.value.as);
  }), Ae(() => {
    var r;
    t.value || he(o) && he(o) instanceof HTMLButtonElement && !((r = he(o)) != null && r.hasAttribute("type")) && (t.value = "button");
  }), t;
}
function il(e) {
  return [e.screenX, e.screenY];
}
function os() {
  let e = I([-1, -1]);
  return { wasMoved(o) {
    let t = il(o);
    return e.value[0] === t[0] && e.value[1] === t[1] ? !1 : (e.value = t, !0);
  }, update(o) {
    e.value = il(o);
  } };
}
function rs({ container: e, accept: o, walk: t, enabled: r }) {
  Ae(() => {
    let n = e.value;
    if (!n || r !== void 0 && !r.value)
      return;
    let l = pr(e);
    if (!l)
      return;
    let a = Object.assign((s) => o(s), { acceptNode: o }), i = l.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, a, !1);
    for (; i.nextNode(); )
      t(i.currentNode);
  });
}
var Cn = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Cn || {}), ls = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(ls || {});
function Wt({ visible: e = !0, features: o = 0, ourProps: t, theirProps: r, ...n }) {
  var l;
  let a = la(r, t), i = Object.assign(n, { props: a });
  if (e || o & 2 && a.static)
    return Io(i);
  if (o & 1) {
    let s = (l = a.unmount) == null || l ? 0 : 1;
    return wt(s, { 0() {
      return null;
    }, 1() {
      return Io({ ...n, props: { ...a, hidden: !0, style: { display: "none" } } });
    } });
  }
  return Io(i);
}
function Io({ props: e, attrs: o, slots: t, slot: r, name: n }) {
  var l, a;
  let { as: i, ...s } = lo(e, ["unmount", "static"]), c = (l = t.default) == null ? void 0 : l.call(t, r), d = {};
  if (r) {
    let p = !1, f = [];
    for (let [v, y] of Object.entries(r))
      typeof y == "boolean" && (p = !0), y === !0 && f.push(v);
    p && (d["data-headlessui-state"] = f.join(" "));
  }
  if (i === "template") {
    if (c = ra(c ?? []), Object.keys(s).length > 0 || Object.keys(o).length > 0) {
      let [p, ...f] = c ?? [];
      if (!is(p) || f.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${n} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(s).concat(Object.keys(o)).map((m) => m.trim()).filter((m, x, w) => w.indexOf(m) === x).sort((m, x) => m.localeCompare(x)).map((m) => `  - ${m}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((m) => `  - ${m}`).join(`
`)].join(`
`));
      let v = la((a = p.props) != null ? a : {}, s, d), y = ur(p, v, !0);
      for (let m in v)
        m.startsWith("on") && (y.props || (y.props = {}), y.props[m] = v[m]);
      return y;
    }
    return Array.isArray(c) && c.length === 1 ? c[0] : c;
  }
  return ie(i, Object.assign({}, s, d), { default: () => c });
}
function ra(e) {
  return e.flatMap((o) => o.type === be ? ra(o.children) : [o]);
}
function la(...e) {
  if (e.length === 0)
    return {};
  if (e.length === 1)
    return e[0];
  let o = {}, t = {};
  for (let r of e)
    for (let n in r)
      n.startsWith("on") && typeof r[n] == "function" ? (t[n] != null || (t[n] = []), t[n].push(r[n])) : o[n] = r[n];
  if (o.disabled || o["aria-disabled"])
    return Object.assign(o, Object.fromEntries(Object.keys(t).map((r) => [r, void 0])));
  for (let r in t)
    Object.assign(o, { [r](n, ...l) {
      let a = t[r];
      for (let i of a) {
        if (n instanceof Event && n.defaultPrevented)
          return;
        i(n, ...l);
      }
    } });
  return o;
}
function as(e) {
  let o = Object.assign({}, e);
  for (let t in o)
    o[t] === void 0 && delete o[t];
  return o;
}
function lo(e, o = []) {
  let t = Object.assign({}, e);
  for (let r of o)
    r in t && delete t[r];
  return t;
}
function is(e) {
  return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
var aa = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(aa || {});
let ss = V({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(e, { slots: o, attrs: t }) {
  return () => {
    var r;
    let { features: n, ...l } = e, a = { "aria-hidden": (n & 2) === 2 ? !0 : (r = l["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
    return Wt({ ourProps: a, theirProps: l, slot: {}, attrs: t, slots: o, name: "Hidden" });
  };
} }), ia = Symbol("Context");
var An = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(An || {});
function us() {
  return kn(ia, null);
}
function ds(e) {
  Tn(ia, e);
}
var Ve = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Ve || {}), sa = ((e) => (e[e.Left = 0] = "Left", e[e.Right = 2] = "Right", e))(sa || {});
function cs(e) {
  function o() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", o));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", o), o());
}
let Nt = [];
cs(() => {
  function e(o) {
    o.target instanceof HTMLElement && o.target !== document.body && Nt[0] !== o.target && (Nt.unshift(o.target), Nt = Nt.filter((t) => t != null && t.isConnected), Nt.splice(10));
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function ps(e) {
  throw new Error("Unexpected object: " + e);
}
var Me = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(Me || {});
function sl(e, o) {
  let t = o.resolveItems();
  if (t.length <= 0)
    return null;
  let r = o.resolveActiveIndex(), n = r ?? -1;
  switch (e.focus) {
    case 0: {
      for (let l = 0; l < t.length; ++l)
        if (!o.resolveDisabled(t[l], l, t))
          return l;
      return r;
    }
    case 1: {
      n === -1 && (n = t.length);
      for (let l = n - 1; l >= 0; --l)
        if (!o.resolveDisabled(t[l], l, t))
          return l;
      return r;
    }
    case 2: {
      for (let l = n + 1; l < t.length; ++l)
        if (!o.resolveDisabled(t[l], l, t))
          return l;
      return r;
    }
    case 3: {
      for (let l = t.length - 1; l >= 0; --l)
        if (!o.resolveDisabled(t[l], l, t))
          return l;
      return r;
    }
    case 4: {
      for (let l = 0; l < t.length; ++l)
        if (o.resolveId(t[l], l, t) === e.id)
          return l;
      return r;
    }
    case 5:
      return null;
    default:
      ps(e);
  }
}
function ua(e = {}, o = null, t = []) {
  for (let [r, n] of Object.entries(e))
    ca(t, da(o, r), n);
  return t;
}
function da(e, o) {
  return e ? e + "[" + o + "]" : o;
}
function ca(e, o, t) {
  if (Array.isArray(t))
    for (let [r, n] of t.entries())
      ca(e, da(o, r.toString()), n);
  else
    t instanceof Date ? e.push([o, t.toISOString()]) : typeof t == "boolean" ? e.push([o, t ? "1" : "0"]) : typeof t == "string" ? e.push([o, t]) : typeof t == "number" ? e.push([o, `${t}`]) : t == null ? e.push([o, ""]) : ua(t, o, e);
}
function fs(e, o) {
  return e === o;
}
var vs = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(vs || {}), ys = ((e) => (e[e.Single = 0] = "Single", e[e.Multi = 1] = "Multi", e))(ys || {}), ms = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Focus = 1] = "Focus", e[e.Other = 2] = "Other", e))(ms || {});
let pa = Symbol("ComboboxContext");
function Kt(e) {
  let o = kn(pa, null);
  if (o === null) {
    let t = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, Kt), t;
  }
  return o;
}
let fa = Symbol("VirtualContext"), hs = V({ name: "VirtualProvider", setup(e, { slots: o }) {
  let t = Kt("VirtualProvider"), r = P(() => {
    let i = he(t.optionsRef);
    if (!i)
      return { start: 0, end: 0 };
    let s = window.getComputedStyle(i);
    return { start: parseFloat(s.paddingBlockStart || s.paddingTop), end: parseFloat(s.paddingBlockEnd || s.paddingBottom) };
  }), n = Li(P(() => ({ scrollPaddingStart: r.value.start, scrollPaddingEnd: r.value.end, count: t.virtual.value.options.length, estimateSize() {
    return 40;
  }, getScrollElement() {
    return he(t.optionsRef);
  }, overscan: 12 }))), l = P(() => {
    var i;
    return (i = t.virtual.value) == null ? void 0 : i.options;
  }), a = I(0);
  return pe([l], () => {
    a.value += 1;
  }), Tn(fa, t.virtual.value ? n : null), () => [ie("div", { style: { position: "relative", width: "100%", height: `${n.value.getTotalSize()}px` }, ref: (i) => {
    if (i) {
      if (typeof process < "u" && process.env.JEST_WORKER_ID !== void 0 || t.activationTrigger.value === 0)
        return;
      t.activeOptionIndex.value !== null && t.virtual.value.options.length > t.activeOptionIndex.value && n.value.scrollToIndex(t.activeOptionIndex.value);
    }
  } }, n.value.getVirtualItems().map((i) => ur(o.default({ option: t.virtual.value.options[i.index], open: t.comboboxState.value === 0 })[0], { key: `${a.value}-${i.index}`, "data-index": i.index, "aria-setsize": t.virtual.value.options.length, "aria-posinset": i.index + 1, style: { position: "absolute", top: 0, left: 0, transform: `translateY(${i.start}px)`, overflowAnchor: "none" } })))];
} }), gs = V({ name: "Combobox", emits: { "update:modelValue": (e) => !0 }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: !1 }, by: { type: [String, Function], nullable: !0, default: null }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, form: { type: String, optional: !0 }, name: { type: String, optional: !0 }, nullable: { type: Boolean, default: !1 }, multiple: { type: [Boolean], default: !1 }, immediate: { type: [Boolean], default: !1 }, virtual: { type: Object, default: null } }, inheritAttrs: !1, setup(e, { slots: o, attrs: t, emit: r }) {
  let n = I(1), l = I(null), a = I(null), i = I(null), s = I(null), c = I({ static: !1, hold: !1 }), d = I([]), p = I(null), f = I(2), v = I(!1);
  function y(M = ($) => $) {
    let $ = p.value !== null ? d.value[p.value] : null, L = M(d.value.slice()), k = L.length > 0 && L[0].dataRef.order.value !== null ? L.sort((U, oe) => U.dataRef.order.value - oe.dataRef.order.value) : Ji(L, (U) => he(U.dataRef.domRef)), N = $ ? k.indexOf($) : null;
    return N === -1 && (N = null), { options: k, activeOptionIndex: N };
  }
  let m = P(() => e.multiple ? 1 : 0), x = P(() => e.nullable), [w, h] = $i(P(() => e.modelValue), (M) => r("update:modelValue", M), P(() => e.defaultValue)), _ = P(() => w.value === void 0 ? wt(m.value, { 1: [], 0: void 0 }) : w.value), S = null, g = null;
  function b(M) {
    return wt(m.value, { 0() {
      return h == null ? void 0 : h(M);
    }, 1: () => {
      let $ = Et(T.value.value).slice(), L = Et(M), k = $.findIndex((N) => T.compare(L, Et(N)));
      return k === -1 ? $.push(L) : $.splice(k, 1), h == null ? void 0 : h($);
    } });
  }
  let A = P(() => {
  });
  pe([A], ([M], [$]) => {
    if (T.virtual.value && M && $ && p.value !== null) {
      let L = M.indexOf($[p.value]);
      L !== -1 ? p.value = L : p.value = null;
    }
  });
  let T = { comboboxState: n, value: _, mode: m, compare(M, $) {
    if (typeof e.by == "string") {
      let L = e.by;
      return (M == null ? void 0 : M[L]) === ($ == null ? void 0 : $[L]);
    }
    return e.by === null ? fs(M, $) : e.by(M, $);
  }, calculateIndex(M) {
    return T.virtual.value ? e.by === null ? T.virtual.value.options.indexOf(M) : T.virtual.value.options.findIndex(($) => T.compare($, M)) : d.value.findIndex(($) => T.compare($.dataRef.value, M));
  }, defaultValue: P(() => e.defaultValue), nullable: x, immediate: P(() => !1), virtual: P(() => null), inputRef: a, labelRef: l, buttonRef: i, optionsRef: s, disabled: P(() => e.disabled), options: d, change(M) {
    h(M);
  }, activeOptionIndex: P(() => {
    if (v.value && p.value === null && (T.virtual.value ? T.virtual.value.options.length > 0 : d.value.length > 0)) {
      if (T.virtual.value) {
        let $ = T.virtual.value.options.findIndex((L) => {
          var k;
          return !((k = T.virtual.value) != null && k.disabled(L));
        });
        if ($ !== -1)
          return $;
      }
      let M = d.value.findIndex(($) => !$.dataRef.disabled);
      if (M !== -1)
        return M;
    }
    return p.value;
  }), activationTrigger: f, optionsPropsRef: c, closeCombobox() {
    v.value = !1, !e.disabled && n.value !== 1 && (n.value = 1, p.value = null);
  }, openCombobox() {
    if (v.value = !0, !e.disabled && n.value !== 0) {
      if (T.value.value) {
        let M = T.calculateIndex(T.value.value);
        M !== -1 && (p.value = M);
      }
      n.value = 0;
    }
  }, setActivationTrigger(M) {
    f.value = M;
  }, goToOption(M, $, L) {
    v.value = !1, S !== null && cancelAnimationFrame(S), S = requestAnimationFrame(() => {
      if (e.disabled || s.value && !c.value.static && n.value === 1)
        return;
      if (T.virtual.value) {
        p.value = M === Me.Specific ? $ : sl({ focus: M }, { resolveItems: () => T.virtual.value.options, resolveActiveIndex: () => {
          var U, oe;
          return (oe = (U = T.activeOptionIndex.value) != null ? U : T.virtual.value.options.findIndex((ne) => {
            var se;
            return !((se = T.virtual.value) != null && se.disabled(ne));
          })) != null ? oe : null;
        }, resolveDisabled: (U) => T.virtual.value.disabled(U), resolveId() {
          throw new Error("Function not implemented.");
        } }), f.value = L ?? 2;
        return;
      }
      let k = y();
      if (k.activeOptionIndex === null) {
        let U = k.options.findIndex((oe) => !oe.dataRef.disabled);
        U !== -1 && (k.activeOptionIndex = U);
      }
      let N = M === Me.Specific ? $ : sl({ focus: M }, { resolveItems: () => k.options, resolveActiveIndex: () => k.activeOptionIndex, resolveId: (U) => U.id, resolveDisabled: (U) => U.dataRef.disabled });
      p.value = N, f.value = L ?? 2, d.value = k.options;
    });
  }, selectOption(M) {
    let $ = d.value.find((k) => k.id === M);
    if (!$)
      return;
    let { dataRef: L } = $;
    b(L.value);
  }, selectActiveOption() {
    if (T.activeOptionIndex.value !== null) {
      if (T.virtual.value)
        b(T.virtual.value.options[T.activeOptionIndex.value]);
      else {
        let { dataRef: M } = d.value[T.activeOptionIndex.value];
        b(M.value);
      }
      T.goToOption(Me.Specific, T.activeOptionIndex.value);
    }
  }, registerOption(M, $) {
    let L = Ht({ id: M, dataRef: $ });
    if (T.virtual.value) {
      d.value.push(L);
      return;
    }
    g && cancelAnimationFrame(g);
    let k = y((N) => (N.push(L), N));
    p.value === null && T.isSelected($.value.value) && (k.activeOptionIndex = k.options.indexOf(L)), d.value = k.options, p.value = k.activeOptionIndex, f.value = 2, k.options.some((N) => !he(N.dataRef.domRef)) && (g = requestAnimationFrame(() => {
      let N = y();
      d.value = N.options, p.value = N.activeOptionIndex;
    }));
  }, unregisterOption(M, $) {
    if (S !== null && cancelAnimationFrame(S), $ && (v.value = !0), T.virtual.value) {
      d.value = d.value.filter((k) => k.id !== M);
      return;
    }
    let L = y((k) => {
      let N = k.findIndex((U) => U.id === M);
      return N !== -1 && k.splice(N, 1), k;
    });
    d.value = L.options, p.value = L.activeOptionIndex, f.value = 2;
  }, isSelected(M) {
    return wt(m.value, { 0: () => T.compare(Et(T.value.value), Et(M)), 1: () => Et(T.value.value).some(($) => T.compare(Et($), Et(M))) });
  }, isActive(M) {
    return p.value === T.calculateIndex(M);
  } };
  ts([a, i, s], () => T.closeCombobox(), P(() => n.value === 0)), Tn(pa, T), ds(P(() => wt(n.value, { 0: An.Open, 1: An.Closed })));
  let E = P(() => {
    var M;
    return (M = he(a)) == null ? void 0 : M.closest("form");
  });
  return Se(() => {
    pe([E], () => {
      if (!E.value || e.defaultValue === void 0)
        return;
      function M() {
        T.change(e.defaultValue);
      }
      return E.value.addEventListener("reset", M), () => {
        var $;
        ($ = E.value) == null || $.removeEventListener("reset", M);
      };
    }, { immediate: !0 });
  }), () => {
    var M, $, L;
    let { name: k, disabled: N, form: U, ...oe } = e, ne = { open: n.value === 0, disabled: N, activeIndex: T.activeOptionIndex.value, activeOption: T.activeOptionIndex.value === null ? null : T.virtual.value ? T.virtual.value.options[(M = T.activeOptionIndex.value) != null ? M : 0] : (L = ($ = T.options.value[T.activeOptionIndex.value]) == null ? void 0 : $.dataRef.value) != null ? L : null, value: _.value };
    return ie(be, [...k != null && _.value != null ? ua({ [k]: _.value }).map(([se, D]) => ie(ss, as({ features: aa.Hidden, key: se, as: "input", type: "hidden", hidden: !0, readOnly: !0, form: U, disabled: N, name: se, value: D }))) : [], Wt({ theirProps: { ...t, ...lo(oe, ["by", "defaultValue", "immediate", "modelValue", "multiple", "nullable", "onUpdate:modelValue", "virtual"]) }, ourProps: {}, slot: ne, slots: o, attrs: t, name: "Combobox" })]);
  };
} });
V({ name: "ComboboxLabel", props: { as: { type: [Object, String], default: "label" }, id: { type: String, default: null } }, setup(e, { attrs: o, slots: t }) {
  var r;
  let n = (r = e.id) != null ? r : `headlessui-combobox-label-${jn()}`, l = Kt("ComboboxLabel");
  function a() {
    var i;
    (i = he(l.inputRef)) == null || i.focus({ preventScroll: !0 });
  }
  return () => {
    let i = { open: l.comboboxState.value === 0, disabled: l.disabled.value }, { ...s } = e, c = { id: n, ref: l.labelRef, onClick: a };
    return Wt({ ourProps: c, theirProps: s, slot: i, attrs: o, slots: t, name: "ComboboxLabel" });
  };
} });
V({ name: "ComboboxButton", props: { as: { type: [Object, String], default: "button" }, id: { type: String, default: null } }, setup(e, { attrs: o, slots: t, expose: r }) {
  var n;
  let l = (n = e.id) != null ? n : `headlessui-combobox-button-${jn()}`, a = Kt("ComboboxButton");
  r({ el: a.buttonRef, $el: a.buttonRef });
  function i(d) {
    a.disabled.value || (a.comboboxState.value === 0 ? a.closeCombobox() : (d.preventDefault(), a.openCombobox()), ge(() => {
      var p;
      return (p = he(a.inputRef)) == null ? void 0 : p.focus({ preventScroll: !0 });
    }));
  }
  function s(d) {
    switch (d.key) {
      case Ve.ArrowDown:
        d.preventDefault(), d.stopPropagation(), a.comboboxState.value === 1 && a.openCombobox(), ge(() => {
          var p;
          return (p = a.inputRef.value) == null ? void 0 : p.focus({ preventScroll: !0 });
        });
        return;
      case Ve.ArrowUp:
        d.preventDefault(), d.stopPropagation(), a.comboboxState.value === 1 && (a.openCombobox(), ge(() => {
          a.value.value || a.goToOption(Me.Last);
        })), ge(() => {
          var p;
          return (p = a.inputRef.value) == null ? void 0 : p.focus({ preventScroll: !0 });
        });
        return;
      case Ve.Escape:
        if (a.comboboxState.value !== 0)
          return;
        d.preventDefault(), a.optionsRef.value && !a.optionsPropsRef.value.static && d.stopPropagation(), a.closeCombobox(), ge(() => {
          var p;
          return (p = a.inputRef.value) == null ? void 0 : p.focus({ preventScroll: !0 });
        });
        return;
    }
  }
  let c = ns(P(() => ({ as: e.as, type: o.type })), a.buttonRef);
  return () => {
    var d, p;
    let f = { open: a.comboboxState.value === 0, disabled: a.disabled.value, value: a.value.value }, { ...v } = e, y = { ref: a.buttonRef, id: l, type: c.value, tabindex: "-1", "aria-haspopup": "listbox", "aria-controls": (d = he(a.optionsRef)) == null ? void 0 : d.id, "aria-expanded": a.comboboxState.value === 0, "aria-labelledby": a.labelRef.value ? [(p = he(a.labelRef)) == null ? void 0 : p.id, l].join(" ") : void 0, disabled: a.disabled.value === !0 ? !0 : void 0, onKeydown: s, onClick: i };
    return Wt({ ourProps: y, theirProps: v, slot: f, attrs: o, slots: t, name: "ComboboxButton" });
  };
} });
let bs = V({ name: "ComboboxInput", props: { as: { type: [Object, String], default: "input" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, displayValue: { type: Function }, defaultValue: { type: String, default: void 0 }, id: { type: String, default: null } }, emits: { change: (e) => !0 }, setup(e, { emit: o, attrs: t, slots: r, expose: n }) {
  var l;
  let a = (l = e.id) != null ? l : `headlessui-combobox-input-${jn()}`, i = Kt("ComboboxInput"), s = P(() => pr(he(i.inputRef))), c = { value: !1 };
  n({ el: i.inputRef, $el: i.inputRef });
  function d() {
    i.change(null);
    let g = he(i.optionsRef);
    g && (g.scrollTop = 0), i.goToOption(Me.Nothing);
  }
  let p = P(() => {
    var g;
    let b = i.value.value;
    return he(i.inputRef) ? typeof e.displayValue < "u" && b !== void 0 ? (g = e.displayValue(b)) != null ? g : "" : typeof b == "string" ? b : "" : "";
  });
  Se(() => {
    pe([p, i.comboboxState, s], ([g, b], [A, T]) => {
      if (c.value)
        return;
      let E = he(i.inputRef);
      E && ((T === 0 && b === 1 || g !== A) && (E.value = g), requestAnimationFrame(() => {
        var M;
        if (c.value || !E || ((M = s.value) == null ? void 0 : M.activeElement) !== E)
          return;
        let { selectionStart: $, selectionEnd: L } = E;
        Math.abs((L ?? 0) - ($ ?? 0)) === 0 && $ === 0 && E.setSelectionRange(E.value.length, E.value.length);
      }));
    }, { immediate: !0 }), pe([i.comboboxState], ([g], [b]) => {
      if (g === 0 && b === 1) {
        if (c.value)
          return;
        let A = he(i.inputRef);
        if (!A)
          return;
        let T = A.value, { selectionStart: E, selectionEnd: M, selectionDirection: $ } = A;
        A.value = "", A.value = T, $ !== null ? A.setSelectionRange(E, M, $) : A.setSelectionRange(E, M);
      }
    });
  });
  let f = I(!1);
  function v() {
    f.value = !0;
  }
  function y() {
    Zn().nextFrame(() => {
      f.value = !1;
    });
  }
  let m = Fi();
  function x(g) {
    switch (c.value = !0, m(() => {
      c.value = !1;
    }), g.key) {
      case Ve.Enter:
        if (c.value = !1, i.comboboxState.value !== 0 || f.value)
          return;
        if (g.preventDefault(), g.stopPropagation(), i.activeOptionIndex.value === null) {
          i.closeCombobox();
          return;
        }
        i.selectActiveOption(), i.mode.value === 0 && i.closeCombobox();
        break;
      case Ve.ArrowDown:
        return c.value = !1, g.preventDefault(), g.stopPropagation(), wt(i.comboboxState.value, { 0: () => i.goToOption(Me.Next), 1: () => i.openCombobox() });
      case Ve.ArrowUp:
        return c.value = !1, g.preventDefault(), g.stopPropagation(), wt(i.comboboxState.value, { 0: () => i.goToOption(Me.Previous), 1: () => {
          i.openCombobox(), ge(() => {
            i.value.value || i.goToOption(Me.Last);
          });
        } });
      case Ve.Home:
        if (g.shiftKey)
          break;
        return c.value = !1, g.preventDefault(), g.stopPropagation(), i.goToOption(Me.First);
      case Ve.PageUp:
        return c.value = !1, g.preventDefault(), g.stopPropagation(), i.goToOption(Me.First);
      case Ve.End:
        if (g.shiftKey)
          break;
        return c.value = !1, g.preventDefault(), g.stopPropagation(), i.goToOption(Me.Last);
      case Ve.PageDown:
        return c.value = !1, g.preventDefault(), g.stopPropagation(), i.goToOption(Me.Last);
      case Ve.Escape:
        if (c.value = !1, i.comboboxState.value !== 0)
          return;
        g.preventDefault(), i.optionsRef.value && !i.optionsPropsRef.value.static && g.stopPropagation(), i.nullable.value && i.mode.value === 0 && i.value.value === null && d(), i.closeCombobox();
        break;
      case Ve.Tab:
        if (c.value = !1, i.comboboxState.value !== 0)
          return;
        i.mode.value === 0 && i.activationTrigger.value !== 1 && i.selectActiveOption(), i.closeCombobox();
        break;
    }
  }
  function w(g) {
    o("change", g), i.nullable.value && i.mode.value === 0 && g.target.value === "" && d(), i.openCombobox();
  }
  function h(g) {
    var b, A, T;
    let E = (b = g.relatedTarget) != null ? b : Nt.find((M) => M !== g.currentTarget);
    if (c.value = !1, !((A = he(i.optionsRef)) != null && A.contains(E)) && !((T = he(i.buttonRef)) != null && T.contains(E)) && i.comboboxState.value === 0)
      return g.preventDefault(), i.mode.value === 0 && (i.nullable.value && i.value.value === null ? d() : i.activationTrigger.value !== 1 && i.selectActiveOption()), i.closeCombobox();
  }
  function _(g) {
    var b, A, T;
    let E = (b = g.relatedTarget) != null ? b : Nt.find((M) => M !== g.currentTarget);
    (A = he(i.buttonRef)) != null && A.contains(E) || (T = he(i.optionsRef)) != null && T.contains(E) || i.disabled.value || i.immediate.value && i.comboboxState.value !== 0 && (i.openCombobox(), Zn().nextFrame(() => {
      i.setActivationTrigger(1);
    }));
  }
  let S = P(() => {
    var g, b, A, T;
    return (T = (A = (b = e.defaultValue) != null ? b : i.defaultValue.value !== void 0 ? (g = e.displayValue) == null ? void 0 : g.call(e, i.defaultValue.value) : null) != null ? A : i.defaultValue.value) != null ? T : "";
  });
  return () => {
    var g, b, A, T, E, M, $;
    let L = { open: i.comboboxState.value === 0 }, { displayValue: k, onChange: N, ...U } = e, oe = { "aria-controls": (g = i.optionsRef.value) == null ? void 0 : g.id, "aria-expanded": i.comboboxState.value === 0, "aria-activedescendant": i.activeOptionIndex.value === null ? void 0 : i.virtual.value ? (b = i.options.value.find((ne) => !i.virtual.value.disabled(ne.dataRef.value) && i.compare(ne.dataRef.value, i.virtual.value.options[i.activeOptionIndex.value]))) == null ? void 0 : b.id : (A = i.options.value[i.activeOptionIndex.value]) == null ? void 0 : A.id, "aria-labelledby": (M = (T = he(i.labelRef)) == null ? void 0 : T.id) != null ? M : (E = he(i.buttonRef)) == null ? void 0 : E.id, "aria-autocomplete": "list", id: a, onCompositionstart: v, onCompositionend: y, onKeydown: x, onInput: w, onFocus: _, onBlur: h, role: "combobox", type: ($ = t.type) != null ? $ : "text", tabIndex: 0, ref: i.inputRef, defaultValue: S.value, disabled: i.disabled.value === !0 ? !0 : void 0 };
    return Wt({ ourProps: oe, theirProps: U, slot: L, attrs: t, slots: r, features: Cn.RenderStrategy | Cn.Static, name: "ComboboxInput" });
  };
} }), xs = V({ name: "ComboboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, hold: { type: [Boolean], default: !1 } }, setup(e, { attrs: o, slots: t, expose: r }) {
  let n = Kt("ComboboxOptions"), l = `headlessui-combobox-options-${jn()}`;
  r({ el: n.optionsRef, $el: n.optionsRef }), Ae(() => {
    n.optionsPropsRef.value.static = e.static;
  }), Ae(() => {
    n.optionsPropsRef.value.hold = e.hold;
  });
  let a = us(), i = P(() => a !== null ? (a.value & An.Open) === An.Open : n.comboboxState.value === 0);
  rs({ container: P(() => he(n.optionsRef)), enabled: P(() => n.comboboxState.value === 0), accept(c) {
    return c.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : c.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(c) {
    c.setAttribute("role", "none");
  } });
  function s(c) {
    c.preventDefault();
  }
  return () => {
    var c, d, p;
    let f = { open: n.comboboxState.value === 0 }, v = { "aria-labelledby": (p = (c = he(n.labelRef)) == null ? void 0 : c.id) != null ? p : (d = he(n.buttonRef)) == null ? void 0 : d.id, id: l, ref: n.optionsRef, role: "listbox", "aria-multiselectable": n.mode.value === 1 ? !0 : void 0, onMousedown: s }, y = lo(e, ["hold"]);
    return Wt({ ourProps: v, theirProps: y, slot: f, attrs: o, slots: n.virtual.value && n.comboboxState.value === 0 ? { ...t, default: () => [ie(hs, {}, t.default)] } : t, features: Cn.RenderStrategy | Cn.Static, visible: i.value, name: "ComboboxOptions" });
  };
} }), ws = V({ name: "ComboboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: !1 }, order: { type: [Number], default: null } }, setup(e, { slots: o, attrs: t, expose: r }) {
  let n = Kt("ComboboxOption"), l = `headlessui-combobox-option-${jn()}`, a = I(null), i = P(() => e.disabled);
  r({ el: a, $el: a });
  let s = P(() => {
    var h;
    return n.virtual.value ? n.activeOptionIndex.value === n.calculateIndex(e.value) : n.activeOptionIndex.value === null ? !1 : ((h = n.options.value[n.activeOptionIndex.value]) == null ? void 0 : h.id) === l;
  }), c = P(() => n.isSelected(e.value)), d = kn(fa, null), p = P(() => ({ disabled: e.disabled, value: e.value, domRef: a, order: P(() => e.order) }));
  Se(() => n.registerOption(l, p)), Xe(() => n.unregisterOption(l, s.value)), Ae(() => {
    let h = he(a);
    h && (d == null || d.value.measureElement(h));
  }), Ae(() => {
    n.comboboxState.value === 0 && s.value && (n.virtual.value || n.activationTrigger.value !== 0 && ge(() => {
      var h, _;
      return (_ = (h = he(a)) == null ? void 0 : h.scrollIntoView) == null ? void 0 : _.call(h, { block: "nearest" });
    }));
  });
  function f(h) {
    h.preventDefault(), h.button === sa.Left && (i.value || (n.selectOption(l), oa() || requestAnimationFrame(() => {
      var _;
      return (_ = he(n.inputRef)) == null ? void 0 : _.focus({ preventScroll: !0 });
    }), n.mode.value === 0 && n.closeCombobox()));
  }
  function v() {
    var h;
    if (e.disabled || (h = n.virtual.value) != null && h.disabled(e.value))
      return n.goToOption(Me.Nothing);
    let _ = n.calculateIndex(e.value);
    n.goToOption(Me.Specific, _);
  }
  let y = os();
  function m(h) {
    y.update(h);
  }
  function x(h) {
    var _;
    if (!y.wasMoved(h) || e.disabled || (_ = n.virtual.value) != null && _.disabled(e.value) || s.value)
      return;
    let S = n.calculateIndex(e.value);
    n.goToOption(Me.Specific, S, 0);
  }
  function w(h) {
    var _;
    y.wasMoved(h) && (e.disabled || (_ = n.virtual.value) != null && _.disabled(e.value) || s.value && (n.optionsPropsRef.value.hold || n.goToOption(Me.Nothing)));
  }
  return () => {
    let { disabled: h } = e, _ = { active: s.value, selected: c.value, disabled: h }, S = { id: l, ref: a, role: "option", tabIndex: h === !0 ? void 0 : -1, "aria-disabled": h === !0 ? !0 : void 0, "aria-selected": c.value, disabled: void 0, onMousedown: f, onFocus: v, onPointerenter: m, onMouseenter: m, onPointermove: x, onMousemove: x, onPointerleave: w, onMouseleave: w }, g = lo(e, ["order", "value"]);
    return Wt({ ourProps: S, theirProps: g, slot: _, attrs: t, slots: o, name: "ComboboxOption" });
  };
} });
function ul(e) {
  return typeof e == "string" ? `'${e}'` : new _s().serialize(e);
}
const _s = /* @__PURE__ */ function() {
  var o;
  class e {
    constructor() {
      Xr(this, o, /* @__PURE__ */ new Map());
    }
    compare(r, n) {
      const l = typeof r, a = typeof n;
      return l === "string" && a === "string" ? r.localeCompare(n) : l === "number" && a === "number" ? r - n : String.prototype.localeCompare.call(this.serialize(r, !0), this.serialize(n, !0));
    }
    serialize(r, n) {
      if (r === null)
        return "null";
      switch (typeof r) {
        case "string":
          return n ? r : `'${r}'`;
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
      const n = Object.prototype.toString.call(r);
      if (n !== "[object Object]")
        return this.serializeBuiltInType(n.length < 10 ? `unknown:${n}` : n.slice(8, -1), r);
      const l = r.constructor, a = l === Object || l === void 0 ? "" : l.name;
      if (a !== "" && globalThis[a] === l)
        return this.serializeBuiltInType(a, r);
      if (typeof r.toJSON == "function") {
        const i = r.toJSON();
        return a + (i !== null && typeof i == "object" ? this.$object(i) : `(${this.serialize(i)})`);
      }
      return this.serializeObjectEntries(a, Object.entries(r));
    }
    serializeBuiltInType(r, n) {
      const l = this["$" + r];
      if (l)
        return l.call(this, n);
      if (typeof (n == null ? void 0 : n.entries) == "function")
        return this.serializeObjectEntries(r, n.entries());
      throw new Error(`Cannot serialize ${r}`);
    }
    serializeObjectEntries(r, n) {
      const l = Array.from(n).sort((i, s) => this.compare(i[0], s[0]));
      let a = `${r}{`;
      for (let i = 0; i < l.length; i++) {
        const [s, c] = l[i];
        a += `${this.serialize(s, !0)}:${this.serialize(c)}`, i < l.length - 1 && (a += ",");
      }
      return a + "}";
    }
    $object(r) {
      let n = yn(this, o).get(r);
      return n === void 0 && (yn(this, o).set(r, `#${yn(this, o).size}`), n = this.serializeObject(r), yn(this, o).set(r, n)), n;
    }
    $function(r) {
      const n = Function.prototype.toString.call(r);
      return n.slice(-15) === "[native code] }" ? `${r.name || ""}()[native]` : `${r.name}(${r.length})${n.replace(/\s*\n\s*/g, "")}`;
    }
    $Array(r) {
      let n = "[";
      for (let l = 0; l < r.length; l++)
        n += this.serialize(r[l]), l < r.length - 1 && (n += ",");
      return n + "]";
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
      return `Set${this.$Array(Array.from(r).sort((n, l) => this.compare(n, l)))}`;
    }
    $Map(r) {
      return this.serializeObjectEntries("Map", r.entries());
    }
  }
  o = new WeakMap();
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
function Qn(e, o) {
  return e === o || ul(e) === ul(o);
}
function Ss(e, o, t) {
  const r = e.findIndex((i) => Qn(i, o)), n = e.findIndex((i) => Qn(i, t));
  if (r === -1 || n === -1)
    return [];
  const [l, a] = [r, n].sort((i, s) => i - s);
  return e.slice(l, a + 1);
}
function dl(e, o = Number.NEGATIVE_INFINITY, t = Number.POSITIVE_INFINITY) {
  return Math.min(t, Math.max(o, e));
}
function ke(e, o) {
  const t = typeof e == "string" && !o ? `${e}Context` : o, r = Symbol(t);
  return [(a) => {
    const i = kn(r, a);
    if (i || i === null)
      return i;
    throw new Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
  }, (a) => (Tn(r, a), a)];
}
function Ge() {
  let e = document.activeElement;
  if (e == null)
    return null;
  for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; )
    e = e.shadowRoot.activeElement;
  return e;
}
function ao(e, o, t) {
  const r = t.originalEvent.target, n = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: t
  });
  o && r.addEventListener(e, o, { once: !0 }), r.dispatchEvent(n);
}
function Go(e) {
  return e == null;
}
function fr(e) {
  return e ? e.flatMap((o) => o.type === be ? fr(o.children) : [o]) : [];
}
const [io, Pm] = ke("ConfigProvider");
function Cs(e, o) {
  var t;
  const r = un();
  return Ae(() => {
    r.value = e();
  }, {
    ...o,
    flush: (t = o == null ? void 0 : o.flush) !== null && t !== void 0 ? t : "sync"
  }), Gl(r);
}
function Gt(e, o) {
  return Kl() ? (sr(e, o), !0) : !1;
}
// @__NO_SIDE_EFFECTS__
function _n() {
  const e = /* @__PURE__ */ new Set(), o = (l) => {
    e.delete(l);
  };
  return {
    on: (l) => {
      e.add(l);
      const a = () => o(l);
      return Gt(a), { off: a };
    },
    off: o,
    trigger: (...l) => Promise.all(Array.from(e).map((a) => a(...l))),
    clear: () => {
      e.clear();
    }
  };
}
// @__NO_SIDE_EFFECTS__
function As(e) {
  let o = !1, t;
  const r = Yl(!0);
  return (...n) => (o || (t = r.run(() => e(...n)), o = !0), t);
}
const ot = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Os = (e) => typeof e < "u", Es = Object.prototype.toString, ks = (e) => Es.call(e) === "[object Object]", Ts = () => {
}, cl = /* @__PURE__ */ js();
function js() {
  var e, o, t;
  return ot && !!(!((e = window) === null || e === void 0 || (e = e.navigator) === null || e === void 0) && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((o = window) === null || o === void 0 || (o = o.navigator) === null || o === void 0 ? void 0 : o.maxTouchPoints) > 2 && /iPad|Macintosh/.test((t = window) === null || t === void 0 ? void 0 : t.navigator.userAgent));
}
function Ro(e) {
  return Array.isArray(e) ? e : [e];
}
function Ps(e) {
  return e || Dt();
}
// @__NO_SIDE_EFFECTS__
function Ms(e) {
  if (!ot)
    return e;
  let o = 0, t, r;
  const n = () => {
    o -= 1, r && o <= 0 && (r.stop(), t = void 0, r = void 0);
  };
  return (...l) => (o += 1, r || (r = Yl(!0), t = r.run(() => e(...l))), Gt(n), t);
}
function Is(e) {
  return wn(e) ? Ht(new Proxy({}, {
    get(o, t, r) {
      return u(Reflect.get(e.value, t, r));
    },
    set(o, t, r) {
      return wn(e.value[t]) && !wn(r) ? e.value[t].value = r : e.value[t] = r, !0;
    },
    deleteProperty(o, t) {
      return Reflect.deleteProperty(e.value, t);
    },
    has(o, t) {
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
function Rs(e) {
  return Is(P(e));
}
function Ds(e, ...o) {
  const t = o.flat(), r = t[0];
  return Rs(() => Object.fromEntries(typeof r == "function" ? Object.entries(Ue(e)).filter(([n, l]) => !r(Te(l), n)) : Object.entries(Ue(e)).filter((n) => !t.includes(n[0]))));
}
function vr(e, o = 1e4) {
  return ii((t, r) => {
    let n = Te(e), l;
    const a = () => setTimeout(() => {
      n = Te(e), r();
    }, Te(o));
    return Gt(() => {
      clearTimeout(l);
    }), {
      get() {
        return t(), n;
      },
      set(i) {
        n = i, r(), clearTimeout(l), l = a();
      }
    };
  });
}
function Ls(e, o) {
  Ps(o) && si(e, o);
}
function yr(e, o, t = {}) {
  const { immediate: r = !0, immediateCallback: n = !1 } = t, l = un(!1);
  let a;
  function i() {
    a && (clearTimeout(a), a = void 0);
  }
  function s() {
    l.value = !1, i();
  }
  function c(...d) {
    n && e(), i(), l.value = !0, a = setTimeout(() => {
      l.value = !1, a = void 0, e(...d);
    }, Te(o));
  }
  return r && (l.value = !0, ot && c()), Gt(s), {
    isPending: Ft(l),
    start: c,
    stop: s
  };
}
function $s(e = 1e3, o = {}) {
  const { controls: t = !1, callback: r } = o, n = yr(r ?? Ts, e, o), l = P(() => !n.isPending.value);
  return t ? {
    ready: l,
    ...n
  } : l;
}
function qs(e, o, t) {
  return pe(e, o, {
    ...t,
    immediate: !0
  });
}
const Pn = ot ? window : void 0;
function ft(e) {
  var o;
  const t = Te(e);
  return (o = t == null ? void 0 : t.$el) !== null && o !== void 0 ? o : t;
}
function eo(...e) {
  const o = (r, n, l, a) => (r.addEventListener(n, l, a), () => r.removeEventListener(n, l, a)), t = P(() => {
    const r = Ro(Te(e[0])).filter((n) => n != null);
    return r.every((n) => typeof n != "string") ? r : void 0;
  });
  return qs(() => {
    var r, n;
    return [
      (r = (n = t.value) === null || n === void 0 ? void 0 : n.map((l) => ft(l))) !== null && r !== void 0 ? r : [Pn].filter((l) => l != null),
      Ro(Te(t.value ? e[1] : e[0])),
      Ro(u(t.value ? e[2] : e[1])),
      Te(t.value ? e[3] : e[2])
    ];
  }, ([r, n, l, a], i, s) => {
    if (!(r != null && r.length) || !(n != null && n.length) || !(l != null && l.length))
      return;
    const c = ks(a) ? { ...a } : a, d = r.flatMap((p) => n.flatMap((f) => l.map((v) => o(p, f, v, c))));
    s(() => {
      d.forEach((p) => p());
    });
  }, { flush: "post" });
}
// @__NO_SIDE_EFFECTS__
function va() {
  const e = un(!1), o = Dt();
  return o && Se(() => {
    e.value = !0;
  }, o), e;
}
// @__NO_SIDE_EFFECTS__
function Bs(e) {
  const o = /* @__PURE__ */ va();
  return P(() => (o.value, !!e()));
}
function Fs(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (o) => o.key === e : Array.isArray(e) ? (o) => e.includes(o.key) : () => !0;
}
function ya(...e) {
  let o, t, r = {};
  e.length === 3 ? (o = e[0], t = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (o = !0, t = e[0], r = e[1]) : (o = e[0], t = e[1]) : (o = !0, t = e[0]);
  const { target: n = Pn, eventName: l = "keydown", passive: a = !1, dedupe: i = !1 } = r, s = Fs(o);
  return eo(n, l, (d) => {
    d.repeat && Te(i) || s(d) && t(d);
  }, a);
}
function ma(e, o = {}) {
  const { immediate: t = !0, fpsLimit: r = null, window: n = Pn, once: l = !1 } = o, a = un(!1), i = P(() => {
    const v = Te(r);
    return v ? 1e3 / v : null;
  });
  let s = 0, c = null;
  function d(v) {
    if (!a.value || !n)
      return;
    s || (s = v);
    const y = v - s;
    if (i.value && y < i.value) {
      c = n.requestAnimationFrame(d);
      return;
    }
    if (s = v, e({
      delta: y,
      timestamp: v
    }), l) {
      a.value = !1, c = null;
      return;
    }
    c = n.requestAnimationFrame(d);
  }
  function p() {
    !a.value && n && (a.value = !0, s = 0, c = n.requestAnimationFrame(d));
  }
  function f() {
    a.value = !1, c != null && n && (n.cancelAnimationFrame(c), c = null);
  }
  return t && p(), Gt(f), {
    isActive: Gl(a),
    pause: f,
    resume: p
  };
}
function Ns(e) {
  return JSON.parse(JSON.stringify(e));
}
function Vs(e, o, t = {}) {
  const { window: r = Pn, ...n } = t;
  let l;
  const a = /* @__PURE__ */ Bs(() => r && "ResizeObserver" in r), i = () => {
    l && (l.disconnect(), l = void 0);
  }, s = pe(P(() => {
    const d = Te(e);
    return Array.isArray(d) ? d.map((p) => ft(p)) : [ft(d)];
  }), (d) => {
    if (i(), a.value && r) {
      l = new ResizeObserver(o);
      for (const p of d)
        p && l.observe(p, n);
    }
  }, {
    immediate: !0,
    flush: "post"
  }), c = () => {
    i(), s();
  };
  return Gt(c), {
    isSupported: a,
    stop: c
  };
}
// @__NO_SIDE_EFFECTS__
function et(e, o, t, r = {}) {
  var n, l;
  const { clone: a = !1, passive: i = !1, eventName: s, deep: c = !1, defaultValue: d, shouldEmit: p } = r, f = Dt(), v = t || (f == null ? void 0 : f.emit) || (f == null || (n = f.$emit) === null || n === void 0 ? void 0 : n.bind(f)) || (f == null || (l = f.proxy) === null || l === void 0 || (l = l.$emit) === null || l === void 0 ? void 0 : l.bind(f == null ? void 0 : f.proxy));
  let y = s;
  o || (o = "modelValue"), y = y || `update:${o.toString()}`;
  const m = (h) => a ? typeof a == "function" ? a(h) : Ns(h) : h, x = () => Os(e[o]) ? m(e[o]) : d, w = (h) => {
    p ? p(h) && v(y, h) : v(y, h);
  };
  if (i) {
    const h = I(x());
    let _ = !1;
    return pe(() => e[o], (S) => {
      _ || (_ = !0, h.value = m(S), ge(() => _ = !1));
    }), pe(h, (S) => {
      !_ && (S !== e[o] || c) && w(S);
    }, { deep: c }), h;
  } else
    return P({
      get() {
        return x();
      },
      set(h) {
        w(h);
      }
    });
}
function Do(e) {
  if (e === null || typeof e != "object")
    return !1;
  const o = Object.getPrototypeOf(e);
  return o !== null && o !== Object.prototype && Object.getPrototypeOf(o) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function Yo(e, o, t = ".", r) {
  if (!Do(o))
    return Yo(e, {}, t, r);
  const n = Object.assign({}, o);
  for (const l in e) {
    if (l === "__proto__" || l === "constructor")
      continue;
    const a = e[l];
    a != null && (r && r(n, l, a, t) || (Array.isArray(a) && Array.isArray(n[l]) ? n[l] = [...a, ...n[l]] : Do(a) && Do(n[l]) ? n[l] = Yo(
      a,
      n[l],
      (t ? `${t}.` : "") + l.toString(),
      r
    ) : n[l] = a));
  }
  return n;
}
function zs(e) {
  return (...o) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    o.reduce((t, r) => Yo(t, r, "", e), {})
  );
}
const Hs = zs(), Us = /* @__PURE__ */ Ms(() => {
  const e = I(/* @__PURE__ */ new Map()), o = I(), t = P(() => {
    for (const a of e.value.values())
      if (a)
        return !0;
    return !1;
  }), r = io({ scrollBody: I(!0) });
  let n = null;
  const l = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = o.value ?? "", cl && (n == null || n()), o.value = void 0;
  };
  return pe(t, (a, i) => {
    var p;
    if (!ot)
      return;
    if (!a) {
      i && l();
      return;
    }
    o.value === void 0 && (o.value = document.body.style.overflow);
    const s = window.innerWidth - document.documentElement.clientWidth, c = {
      padding: s,
      margin: 0
    }, d = (p = r.scrollBody) != null && p.value ? typeof r.scrollBody.value == "object" ? Hs({
      padding: r.scrollBody.value.padding === !0 ? s : r.scrollBody.value.padding,
      margin: r.scrollBody.value.margin === !0 ? s : r.scrollBody.value.margin
    }, c) : c : {
      padding: 0,
      margin: 0
    };
    s > 0 && (document.body.style.paddingRight = typeof d.padding == "number" ? `${d.padding}px` : String(d.padding), document.body.style.marginRight = typeof d.margin == "number" ? `${d.margin}px` : String(d.margin), document.documentElement.style.setProperty("--scrollbar-width", `${s}px`), document.body.style.overflow = "hidden"), cl && (n = eo(document, "touchmove", (f) => Ws(f), { passive: !1 })), ge(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, {
    immediate: !0,
    flush: "sync"
  }), e;
});
function mr(e) {
  const o = Math.random().toString(36).substring(2, 7), t = Us();
  t.value.set(o, e ?? !1);
  const r = P({
    get: () => t.value.get(o) ?? !1,
    set: (n) => t.value.set(o, n)
  });
  return Ls(() => {
    t.value.delete(o);
  }), r;
}
function ha(e) {
  const o = window.getComputedStyle(e);
  if (o.overflowX === "scroll" || o.overflowY === "scroll" || o.overflowX === "auto" && e.clientWidth < e.scrollWidth || o.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const t = e.parentNode;
    return !(t instanceof Element) || t.tagName === "BODY" ? !1 : ha(t);
  }
}
function Ws(e) {
  const o = e || window.event, t = o.target;
  return t instanceof Element && ha(t) ? !1 : o.touches.length > 1 ? !0 : (o.preventDefault && o.cancelable && o.preventDefault(), !1);
}
function hr(e) {
  const o = io({ dir: I("ltr") });
  return P(() => {
    var t;
    return (e == null ? void 0 : e.value) || ((t = o.dir) == null ? void 0 : t.value) || "ltr";
  });
}
function Ks(e) {
  const o = Dt(), t = o == null ? void 0 : o.type.emits, r = {};
  return t != null && t.length || console.warn(`No emitted event found. Please check component: ${o == null ? void 0 : o.type.__name}`), t == null || t.forEach((n) => {
    r[ui(Xl(n))] = (...l) => e(n, ...l);
  }), r;
}
function Gs(e) {
  const o = P(() => u(e)), t = P(() => new Intl.Collator("en", {
    usage: "search",
    ...o.value
  }));
  return {
    startsWith: (a, i) => i.length === 0 ? !0 : (a = a.normalize("NFC"), i = i.normalize("NFC"), t.value.compare(a.slice(0, i.length), i) === 0),
    endsWith: (a, i) => i.length === 0 ? !0 : (a = a.normalize("NFC"), i = i.normalize("NFC"), t.value.compare(a.slice(-i.length), i) === 0),
    contains: (a, i) => {
      if (i.length === 0)
        return !0;
      a = a.normalize("NFC"), i = i.normalize("NFC");
      let s = 0;
      const c = i.length;
      for (; s + c <= a.length; s++) {
        const d = a.slice(s, s + c);
        if (t.value.compare(i, d) === 0)
          return !0;
      }
      return !1;
    }
  };
}
let Lo = 0;
function gr() {
  Ae((e) => {
    if (!ot)
      return;
    const o = document.querySelectorAll("[data-reka-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", o[0] ?? pl()), document.body.insertAdjacentElement("beforeend", o[1] ?? pl()), Lo++, e(() => {
      Lo === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((t) => t.remove()), Lo--;
    });
  });
}
function pl() {
  const e = document.createElement("span");
  return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
function br(e) {
  return P(() => {
    var o;
    return Te(e) ? !!((o = ft(e)) != null && o.closest("form")) : !0;
  });
}
function ce() {
  const e = Dt(), o = I(), t = P(() => {
    var a, i;
    return ["#text", "#comment"].includes((a = o.value) == null ? void 0 : a.$el.nodeName) ? (i = o.value) == null ? void 0 : i.$el.nextElementSibling : ft(o);
  }), r = Object.assign({}, e.exposed), n = {};
  for (const a in e.props)
    Object.defineProperty(n, a, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[a]
    });
  if (Object.keys(r).length > 0)
    for (const a in r)
      Object.defineProperty(n, a, {
        enumerable: !0,
        configurable: !0,
        get: () => r[a]
      });
  Object.defineProperty(n, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = n;
  function l(a) {
    if (o.value = a, !!a && (Object.defineProperty(n, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => a instanceof Element ? a : a.$el
    }), !(a instanceof Element) && !Object.prototype.hasOwnProperty.call(a, "$el"))) {
      const i = a.$.exposed, s = Object.assign({}, n);
      for (const c in i)
        Object.defineProperty(s, c, {
          enumerable: !0,
          configurable: !0,
          get: () => i[c]
        });
      e.exposed = s;
    }
  }
  return {
    forwardRef: l,
    currentRef: o,
    currentElement: t
  };
}
function dn(e) {
  const o = Dt(), t = Object.keys((o == null ? void 0 : o.type.props) ?? {}).reduce((n, l) => {
    const a = (o == null ? void 0 : o.type.props[l]).default;
    return a !== void 0 && (n[l] = a), n;
  }, {}), r = di(e);
  return P(() => {
    const n = {}, l = (o == null ? void 0 : o.vnode.props) ?? {};
    return Object.keys(l).forEach((a) => {
      n[Xl(a)] = l[a];
    }), Object.keys({
      ...t,
      ...n
    }).reduce((a, i) => (r.value[i] !== void 0 && (a[i] = r.value[i]), a), {});
  });
}
function cn(e, o) {
  const t = dn(e), r = o ? Ks(o) : {};
  return P(() => ({
    ...t.value,
    ...r
  }));
}
function Ys(e, o) {
  const t = vr(!1, 300);
  Gt(() => {
    t.value = !1;
  });
  const r = I(null), n = /* @__PURE__ */ _n();
  function l() {
    r.value = null, t.value = !1;
  }
  function a(i, s) {
    const c = i.currentTarget, d = {
      x: i.clientX,
      y: i.clientY
    }, p = Xs(d, c.getBoundingClientRect()), f = Js(d, p, 1), v = Zs(s.getBoundingClientRect()), y = eu([...f, ...v]);
    r.value = y, t.value = !0;
  }
  return Ae((i) => {
    if (e.value && o.value) {
      const s = (d) => a(d, o.value), c = (d) => a(d, e.value);
      e.value.addEventListener("pointerleave", s), o.value.addEventListener("pointerleave", c), i(() => {
        var d, p;
        (d = e.value) == null || d.removeEventListener("pointerleave", s), (p = o.value) == null || p.removeEventListener("pointerleave", c);
      });
    }
  }), Ae((i) => {
    var s;
    if (r.value) {
      const c = (d) => {
        var x, w;
        if (!r.value || !(d.target instanceof Element))
          return;
        const p = d.target, f = {
          x: d.clientX,
          y: d.clientY
        }, v = ((x = e.value) == null ? void 0 : x.contains(p)) || ((w = o.value) == null ? void 0 : w.contains(p)), y = !Qs(f, r.value), m = !!p.closest("[data-grace-area-trigger]");
        v ? l() : (y || m) && (l(), n.trigger());
      };
      (s = e.value) == null || s.ownerDocument.addEventListener("pointermove", c), i(() => {
        var d;
        return (d = e.value) == null ? void 0 : d.ownerDocument.removeEventListener("pointermove", c);
      });
    }
  }), {
    isPointerInTransit: t,
    onPointerExit: n.on
  };
}
function Xs(e, o) {
  const t = Math.abs(o.top - e.y), r = Math.abs(o.bottom - e.y), n = Math.abs(o.right - e.x), l = Math.abs(o.left - e.x);
  switch (Math.min(t, r, n, l)) {
    case l:
      return "left";
    case n:
      return "right";
    case t:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function Js(e, o, t = 5) {
  const r = [];
  switch (o) {
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
function Zs(e) {
  const { top: o, right: t, bottom: r, left: n } = e;
  return [
    {
      x: n,
      y: o
    },
    {
      x: t,
      y: o
    },
    {
      x: t,
      y: r
    },
    {
      x: n,
      y: r
    }
  ];
}
function Qs(e, o) {
  const { x: t, y: r } = e;
  let n = !1;
  for (let l = 0, a = o.length - 1; l < o.length; a = l++) {
    const i = o[l].x, s = o[l].y, c = o[a].x, d = o[a].y;
    s > r != d > r && t < (c - i) * (r - s) / (d - s) + i && (n = !n);
  }
  return n;
}
function eu(e) {
  const o = e.slice();
  return o.sort((t, r) => t.x < r.x ? -1 : t.x > r.x ? 1 : t.y < r.y ? -1 : t.y > r.y ? 1 : 0), tu(o);
}
function tu(e) {
  if (e.length <= 1)
    return e.slice();
  const o = [];
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (; o.length >= 2; ) {
      const l = o[o.length - 1], a = o[o.length - 2];
      if ((l.x - a.x) * (n.y - a.y) >= (l.y - a.y) * (n.x - a.x))
        o.pop();
      else
        break;
    }
    o.push(n);
  }
  o.pop();
  const t = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const n = e[r];
    for (; t.length >= 2; ) {
      const l = t[t.length - 1], a = t[t.length - 2];
      if ((l.x - a.x) * (n.y - a.y) >= (l.y - a.y) * (n.x - a.x))
        t.pop();
      else
        break;
    }
    t.push(n);
  }
  return t.pop(), o.length === 1 && t.length === 1 && o[0].x === t[0].x && o[0].y === t[0].y ? o : o.concat(t);
}
var nu = function(e) {
  if (typeof document > "u")
    return null;
  var o = Array.isArray(e) ? e[0] : e;
  return o.ownerDocument.body;
}, nn = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), Hn = {}, $o = 0, ga = function(e) {
  return e && (e.host || ga(e.parentNode));
}, ou = function(e, o) {
  return o.map(function(t) {
    if (e.contains(t))
      return t;
    var r = ga(t);
    return r && e.contains(r) ? r : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(t) {
    return !!t;
  });
}, ru = function(e, o, t, r) {
  var n = ou(o, Array.isArray(e) ? e : [e]);
  Hn[t] || (Hn[t] = /* @__PURE__ */ new WeakMap());
  var l = Hn[t], a = [], i = /* @__PURE__ */ new Set(), s = new Set(n), c = function(p) {
    !p || i.has(p) || (i.add(p), c(p.parentNode));
  };
  n.forEach(c);
  var d = function(p) {
    !p || s.has(p) || Array.prototype.forEach.call(p.children, function(f) {
      if (i.has(f))
        d(f);
      else
        try {
          var v = f.getAttribute(r), y = v !== null && v !== "false", m = (nn.get(f) || 0) + 1, x = (l.get(f) || 0) + 1;
          nn.set(f, m), l.set(f, x), a.push(f), m === 1 && y && zn.set(f, !0), x === 1 && f.setAttribute(t, "true"), y || f.setAttribute(r, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", f, w);
        }
    });
  };
  return d(o), i.clear(), $o++, function() {
    a.forEach(function(p) {
      var f = nn.get(p) - 1, v = l.get(p) - 1;
      nn.set(p, f), l.set(p, v), f || (zn.has(p) || p.removeAttribute(r), zn.delete(p)), v || p.removeAttribute(t);
    }), $o--, $o || (nn = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), Hn = {});
  };
}, lu = function(e, o, t) {
  t === void 0 && (t = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), n = o || nu(e);
  return n ? (r.push.apply(r, Array.from(n.querySelectorAll("[aria-live], script"))), ru(r, n, t, "aria-hidden")) : function() {
    return null;
  };
};
function xr(e) {
  let o;
  pe(() => ft(e), (t) => {
    t ? o = lu(t) : o && o();
  }), Xe(() => {
    o && o();
  });
}
let au = 0;
function yt(e, o = "reka") {
  var r;
  if (e)
    return e;
  if ("useId" in rn)
    return `${o}-${(r = rn.useId) == null ? void 0 : r.call(rn)}`;
  const t = io({ useId: void 0 });
  return t.useId ? `${o}-${t.useId()}` : `${o}-${++au}`;
}
function iu() {
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
function su(e) {
  const o = I(), t = P(() => {
    var n;
    return ((n = o.value) == null ? void 0 : n.width) ?? 0;
  }), r = P(() => {
    var n;
    return ((n = o.value) == null ? void 0 : n.height) ?? 0;
  });
  return Se(() => {
    const n = ft(e);
    if (n) {
      o.value = {
        width: n.offsetWidth,
        height: n.offsetHeight
      };
      const l = new ResizeObserver((a) => {
        if (!Array.isArray(a) || !a.length)
          return;
        const i = a[0];
        let s, c;
        if ("borderBoxSize" in i) {
          const d = i.borderBoxSize, p = Array.isArray(d) ? d[0] : d;
          s = p.inlineSize, c = p.blockSize;
        } else
          s = n.offsetWidth, c = n.offsetHeight;
        o.value = {
          width: s,
          height: c
        };
      });
      return l.observe(n, { box: "border-box" }), () => l.unobserve(n);
    } else
      o.value = void 0;
  }), {
    width: t,
    height: r
  };
}
function uu(e, o) {
  const t = I(e);
  function r(l) {
    return o[t.value][l] ?? t.value;
  }
  return {
    state: t,
    dispatch: (l) => {
      t.value = r(l);
    }
  };
}
function wr(e) {
  const o = vr("", 1e3);
  return {
    search: o,
    handleTypeaheadSearch: (n, l) => {
      if (o.value = o.value + n, e)
        e(n);
      else {
        const a = Ge(), i = l.map((f) => {
          var v, y;
          return {
            ...f,
            textValue: ((v = f.value) == null ? void 0 : v.textValue) ?? ((y = f.ref.textContent) == null ? void 0 : y.trim()) ?? ""
          };
        }), s = i.find((f) => f.ref === a), c = i.map((f) => f.textValue), d = cu(c, o.value, s == null ? void 0 : s.textValue), p = i.find((f) => f.textValue === d);
        return p && p.ref.focus(), p == null ? void 0 : p.ref;
      }
    },
    resetTypeahead: () => {
      o.value = "";
    }
  };
}
function du(e, o) {
  return e.map((t, r) => e[(o + r) % e.length]);
}
function cu(e, o, t) {
  const n = o.length > 1 && Array.from(o).every((c) => c === o[0]) ? o[0] : o, l = t ? e.indexOf(t) : -1;
  let a = du(e, Math.max(l, 0));
  n.length === 1 && (a = a.filter((c) => c !== t));
  const s = a.find((c) => c.toLowerCase().startsWith(n.toLowerCase()));
  return s !== t ? s : void 0;
}
function pu(e, o) {
  var x;
  const t = I({}), r = I("none"), n = I(e), l = e.value ? "mounted" : "unmounted";
  let a;
  const i = ((x = o.value) == null ? void 0 : x.ownerDocument.defaultView) ?? Pn, { state: s, dispatch: c } = uu(l, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: { MOUNT: "mounted" }
  }), d = (w) => {
    var h;
    if (ot) {
      const _ = new CustomEvent(w, {
        bubbles: !1,
        cancelable: !1
      });
      (h = o.value) == null || h.dispatchEvent(_);
    }
  };
  pe(e, async (w, h) => {
    var S;
    const _ = h !== w;
    if (await ge(), _) {
      const g = r.value, b = Un(o.value);
      w ? (c("MOUNT"), d("enter"), b === "none" && d("after-enter")) : b === "none" || b === "undefined" || ((S = t.value) == null ? void 0 : S.display) === "none" ? (c("UNMOUNT"), d("leave"), d("after-leave")) : h && g !== b ? (c("ANIMATION_OUT"), d("leave")) : (c("UNMOUNT"), d("after-leave"));
    }
  }, { immediate: !0 });
  const p = (w) => {
    const h = Un(o.value), _ = h.includes(CSS.escape(w.animationName)), S = s.value === "mounted" ? "enter" : "leave";
    if (w.target === o.value && _ && (d(`after-${S}`), c("ANIMATION_END"), !n.value)) {
      const g = o.value.style.animationFillMode;
      o.value.style.animationFillMode = "forwards", a = i == null ? void 0 : i.setTimeout(() => {
        var b;
        ((b = o.value) == null ? void 0 : b.style.animationFillMode) === "forwards" && (o.value.style.animationFillMode = g);
      });
    }
    w.target === o.value && h === "none" && c("ANIMATION_END");
  }, f = (w) => {
    w.target === o.value && (r.value = Un(o.value));
  }, v = pe(o, (w, h) => {
    w ? (t.value = getComputedStyle(w), w.addEventListener("animationstart", f), w.addEventListener("animationcancel", p), w.addEventListener("animationend", p)) : (c("ANIMATION_END"), a !== void 0 && (i == null || i.clearTimeout(a)), h == null || h.removeEventListener("animationstart", f), h == null || h.removeEventListener("animationcancel", p), h == null || h.removeEventListener("animationend", p));
  }, { immediate: !0 }), y = pe(s, () => {
    const w = Un(o.value);
    r.value = s.value === "mounted" ? w : "none";
  });
  return Xe(() => {
    v(), y();
  }), { isPresent: P(() => ["mounted", "unmountSuspended"].includes(s.value)) };
}
function Un(e) {
  return e && getComputedStyle(e).animationName || "none";
}
var Mn = V({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: { type: Boolean }
  },
  slots: {},
  setup(e, { slots: o, expose: t }) {
    var c;
    const { present: r, forceMount: n } = Ue(e), l = I(), { isPresent: a } = pu(r, l);
    t({ present: a });
    let i = o.default({ present: a.value });
    i = fr(i || []);
    const s = Dt();
    if (i && (i == null ? void 0 : i.length) > 1) {
      const d = (c = s == null ? void 0 : s.parent) != null && c.type.name ? `<${s.parent.type.name} />` : "component";
      throw new Error([
        `Detected an invalid children for \`${d}\` for  \`Presence\` component.`,
        "",
        "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
        "You can apply a few solutions:",
        ["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((p) => `  - ${p}`).join(`
`)
      ].join(`
`));
    }
    return () => n.value || r.value || a.value ? ie(o.default({ present: a.value })[0], { ref: (d) => {
      const p = ft(d);
      return typeof (p == null ? void 0 : p.hasAttribute) > "u" || (p != null && p.hasAttribute("data-reka-popper-content-wrapper") ? l.value = p.firstElementChild : l.value = p), p;
    } }) : null;
  }
});
const Xo = V({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: o, slots: t }) {
    return () => {
      var s;
      if (!t.default)
        return null;
      const r = fr(t.default()), n = r.findIndex((c) => c.type !== ci);
      if (n === -1)
        return r;
      const l = r[n];
      (s = l.props) == null || delete s.ref;
      const a = l.props ? ee(o, l.props) : o, i = ur({
        ...l,
        props: {}
      }, a);
      return r.length === 1 ? i : (r[n] = i, r);
    };
  }
}), fu = [
  "area",
  "img",
  "input"
], ve = V({
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
  setup(e, { attrs: o, slots: t }) {
    const r = e.asChild ? "template" : e.as;
    return typeof r == "string" && fu.includes(r) ? () => ie(r, o) : r !== "template" ? () => ie(e.as, o, { default: t.default }) : () => ie(Xo, o, { default: t.default });
  }
});
function Mt() {
  const e = I(), o = P(() => {
    var t, r;
    return ["#text", "#comment"].includes((t = e.value) == null ? void 0 : t.$el.nodeName) ? (r = e.value) == null ? void 0 : r.$el.nextElementSibling : ft(e);
  });
  return {
    primitiveElement: e,
    currentElement: o
  };
}
const vu = "dismissableLayer.pointerDownOutside", yu = "dismissableLayer.focusOutside";
function ba(e, o) {
  const t = o.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), n = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
  return !!(t && (r === t || n.indexOf(r) < n.indexOf(t)));
}
function mu(e, o, t = !0) {
  var a;
  const r = ((a = o == null ? void 0 : o.value) == null ? void 0 : a.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), n = I(!1), l = I(() => {
  });
  return Ae((i) => {
    if (!ot || !Te(t))
      return;
    const s = async (d) => {
      const p = d.target;
      if (!(!(o != null && o.value) || !p)) {
        if (ba(o.value, p)) {
          n.value = !1;
          return;
        }
        if (d.target && !n.value) {
          let v = function() {
            ao(vu, e, f);
          };
          const f = { originalEvent: d };
          d.pointerType === "touch" ? (r.removeEventListener("click", l.value), l.value = v, r.addEventListener("click", l.value, { once: !0 })) : v();
        } else
          r.removeEventListener("click", l.value);
        n.value = !1;
      }
    }, c = window.setTimeout(() => {
      r.addEventListener("pointerdown", s);
    }, 0);
    i(() => {
      window.clearTimeout(c), r.removeEventListener("pointerdown", s), r.removeEventListener("click", l.value);
    });
  }), { onPointerDownCapture: () => {
    Te(t) && (n.value = !0);
  } };
}
function hu(e, o, t = !0) {
  var l;
  const r = ((l = o == null ? void 0 : o.value) == null ? void 0 : l.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), n = I(!1);
  return Ae((a) => {
    if (!ot || !Te(t))
      return;
    const i = async (s) => {
      if (!(o != null && o.value))
        return;
      await ge(), await ge();
      const c = s.target;
      !o.value || !c || ba(o.value, c) || s.target && !n.value && ao(yu, e, { originalEvent: s });
    };
    r.addEventListener("focusin", i), a(() => r.removeEventListener("focusin", i));
  }), {
    onFocusCapture: () => {
      Te(t) && (n.value = !0);
    },
    onBlurCapture: () => {
      Te(t) && (n.value = !1);
    }
  };
}
const Ke = Ht({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  originalBodyPointerEvents: void 0,
  branches: /* @__PURE__ */ new Set()
});
var gu = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, { forwardRef: n, currentElement: l } = ce(), a = P(() => {
      var v;
      return ((v = l.value) == null ? void 0 : v.ownerDocument) ?? globalThis.document;
    }), i = P(() => Ke.layersRoot), s = P(() => l.value ? Array.from(i.value).indexOf(l.value) : -1), c = P(() => Ke.layersWithOutsidePointerEventsDisabled.size > 0), d = P(() => {
      const v = Array.from(i.value), [y] = [...Ke.layersWithOutsidePointerEventsDisabled].slice(-1), m = v.indexOf(y);
      return s.value >= m;
    }), p = mu(async (v) => {
      const y = [...Ke.branches].some((m) => m == null ? void 0 : m.contains(v.target));
      !d.value || y || (r("pointerDownOutside", v), r("interactOutside", v), await ge(), v.defaultPrevented || r("dismiss"));
    }, l), f = hu((v) => {
      [...Ke.branches].some((m) => m == null ? void 0 : m.contains(v.target)) || (r("focusOutside", v), r("interactOutside", v), v.defaultPrevented || r("dismiss"));
    }, l);
    return ya("Escape", (v) => {
      s.value === i.value.size - 1 && (r("escapeKeyDown", v), v.defaultPrevented || r("dismiss"));
    }), Ae((v) => {
      l.value && (t.disableOutsidePointerEvents && (Ke.layersWithOutsidePointerEventsDisabled.size === 0 && (Ke.originalBodyPointerEvents = a.value.body.style.pointerEvents, a.value.body.style.pointerEvents = "none"), Ke.layersWithOutsidePointerEventsDisabled.add(l.value)), i.value.add(l.value), v(() => {
        t.disableOutsidePointerEvents && Ke.layersWithOutsidePointerEventsDisabled.size === 1 && !Go(Ke.originalBodyPointerEvents) && (a.value.body.style.pointerEvents = Ke.originalBodyPointerEvents);
      }));
    }), Ae((v) => {
      v(() => {
        l.value && (i.value.delete(l.value), Ke.layersWithOutsidePointerEventsDisabled.delete(l.value));
      });
    }), (v, y) => (C(), B(u(ve), {
      ref: u(n),
      "as-child": v.asChild,
      as: v.as,
      "data-dismissable-layer": "",
      style: St({ pointerEvents: c.value ? d.value ? "auto" : "none" : void 0 }),
      onFocusCapture: u(f).onFocusCapture,
      onBlurCapture: u(f).onBlurCapture,
      onPointerdownCapture: u(p).onPointerDownCapture
    }, {
      default: q(() => [F(v.$slots, "default")]),
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
}), so = gu;
const bu = /* @__PURE__ */ As(() => I([]));
function xu() {
  const e = bu();
  return {
    add(o) {
      const t = e.value[0];
      o !== t && (t == null || t.pause()), e.value = fl(e.value, o), e.value.unshift(o);
    },
    remove(o) {
      var t;
      e.value = fl(e.value, o), (t = e.value[0]) == null || t.resume();
    }
  };
}
function fl(e, o) {
  const t = [...e], r = t.indexOf(o);
  return r !== -1 && t.splice(r, 1), t;
}
const qo = "focusScope.autoFocusOnMount", Bo = "focusScope.autoFocusOnUnmount", vl = {
  bubbles: !1,
  cancelable: !0
};
function wu(e, { select: o = !1 } = {}) {
  const t = Ge();
  for (const r of e)
    if (Tt(r, { select: o }), Ge() !== t)
      return !0;
}
function _u(e) {
  const o = xa(e), t = yl(o, e), r = yl(o.reverse(), e);
  return [t, r];
}
function xa(e) {
  const o = [], t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (r) => {
    const n = r.tagName === "INPUT" && r.type === "hidden";
    return r.disabled || r.hidden || n ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; t.nextNode(); )
    o.push(t.currentNode);
  return o;
}
function yl(e, o) {
  for (const t of e)
    if (!Su(t, { upTo: o }))
      return t;
}
function Su(e, { upTo: o }) {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (o !== void 0 && e === o)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}
function Cu(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Tt(e, { select: o = !1 } = {}) {
  if (e && e.focus) {
    const t = Ge();
    e.focus({ preventScroll: !0 }), e !== t && Cu(e) && o && e.select();
  }
}
var Au = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, { currentRef: n, currentElement: l } = ce(), a = I(null), i = xu(), s = Ht({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    Ae((d) => {
      if (!ot)
        return;
      const p = l.value;
      if (!t.trapped)
        return;
      function f(x) {
        if (s.paused || !p)
          return;
        const w = x.target;
        p.contains(w) ? a.value = w : Tt(a.value, { select: !0 });
      }
      function v(x) {
        if (s.paused || !p)
          return;
        const w = x.relatedTarget;
        w !== null && (p.contains(w) || Tt(a.value, { select: !0 }));
      }
      function y(x) {
        p.contains(a.value) || Tt(p);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", v);
      const m = new MutationObserver(y);
      p && m.observe(p, {
        childList: !0,
        subtree: !0
      }), d(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", v), m.disconnect();
      });
    }), Ae(async (d) => {
      const p = l.value;
      if (await ge(), !p)
        return;
      i.add(s);
      const f = Ge();
      if (!p.contains(f)) {
        const y = new CustomEvent(qo, vl);
        p.addEventListener(qo, (m) => r("mountAutoFocus", m)), p.dispatchEvent(y), y.defaultPrevented || (wu(xa(p), { select: !0 }), Ge() === f && Tt(p));
      }
      d(() => {
        p.removeEventListener(qo, (x) => r("mountAutoFocus", x));
        const y = new CustomEvent(Bo, vl), m = (x) => {
          r("unmountAutoFocus", x);
        };
        p.addEventListener(Bo, m), p.dispatchEvent(y), setTimeout(() => {
          y.defaultPrevented || Tt(f ?? document.body, { select: !0 }), p.removeEventListener(Bo, m), i.remove(s);
        }, 0);
      });
    });
    function c(d) {
      if (!t.loop && !t.trapped || s.paused)
        return;
      const p = d.key === "Tab" && !d.altKey && !d.ctrlKey && !d.metaKey, f = Ge();
      if (p && f) {
        const v = d.currentTarget, [y, m] = _u(v);
        y && m ? !d.shiftKey && f === m ? (d.preventDefault(), t.loop && Tt(y, { select: !0 })) : d.shiftKey && f === y && (d.preventDefault(), t.loop && Tt(m, { select: !0 })) : f === v && d.preventDefault();
      }
    }
    return (d, p) => (C(), B(u(ve), {
      ref_key: "currentRef",
      ref: n,
      tabindex: "-1",
      "as-child": d.asChild,
      as: d.as,
      onKeydown: c
    }, {
      default: q(() => [F(d.$slots, "default")]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), _r = Au;
function ml(e) {
  const o = Ge();
  for (const t of e)
    if (t === o || (t.focus(), Ge() !== o))
      return;
}
var Ou = /* @__PURE__ */ V({
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
    const o = /* @__PURE__ */ va();
    return (t, r) => u(o) || t.forceMount ? (C(), B(dr, {
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
}), uo = Ou;
const hl = "data-reka-collection-item";
function Ot(e = {}) {
  const { key: o = "", isProvider: t = !1 } = e, r = `${o}CollectionProvider`;
  let n;
  if (t) {
    const d = I(/* @__PURE__ */ new Map());
    n = {
      collectionRef: I(),
      itemMap: d
    }, Tn(r, n);
  } else
    n = kn(r);
  const l = (d = !1) => {
    const p = n.collectionRef.value;
    if (!p)
      return [];
    const f = Array.from(p.querySelectorAll(`[${hl}]`)), y = Array.from(n.itemMap.value.values()).sort((m, x) => f.indexOf(m.ref) - f.indexOf(x.ref));
    return d ? y : y.filter((m) => m.ref.dataset.disabled !== "");
  }, a = V({
    name: "CollectionSlot",
    inheritAttrs: !1,
    setup(d, { slots: p, attrs: f }) {
      const { primitiveElement: v, currentElement: y } = Mt();
      return pe(y, () => {
        n.collectionRef.value = y.value;
      }), () => ie(Xo, {
        ref: v,
        ...f
      }, p);
    }
  }), i = V({
    name: "CollectionItem",
    inheritAttrs: !1,
    props: { value: { validator: () => !0 } },
    setup(d, { slots: p, attrs: f }) {
      const { primitiveElement: v, currentElement: y } = Mt();
      return Ae((m) => {
        if (y.value) {
          const x = sn(y.value);
          n.itemMap.value.set(x, {
            ref: y.value,
            value: d.value
          }), m(() => n.itemMap.value.delete(x));
        }
      }), () => ie(Xo, {
        ...f,
        [hl]: "",
        ref: v
      }, p);
    }
  }), s = P(() => Array.from(n.itemMap.value.values())), c = P(() => n.itemMap.value.size);
  return {
    getItems: l,
    reactiveItems: s,
    itemMapSize: c,
    CollectionSlot: a,
    CollectionItem: i
  };
}
const Eu = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function ku(e, o) {
  return o !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Tu(e, o, t) {
  const r = ku(e.key, t);
  if (!(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Eu[r];
}
var ju = /* @__PURE__ */ V({
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
    return (o, t) => (C(), B(u(ve), {
      as: o.as,
      "as-child": o.asChild,
      "aria-hidden": o.feature === "focusable" ? "true" : void 0,
      "data-hidden": o.feature === "fully-hidden" ? "" : void 0,
      tabindex: o.feature === "fully-hidden" ? "-1" : void 0,
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
      default: q(() => [F(o.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "aria-hidden",
      "data-hidden",
      "tabindex"
    ]));
  }
}), co = ju, Pu = /* @__PURE__ */ V({
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
    const o = e, { primitiveElement: t, currentElement: r } = Mt(), n = P(() => o.checked ?? o.value);
    return pe(n, (l, a) => {
      if (!r.value)
        return;
      const i = r.value, s = window.HTMLInputElement.prototype, d = Object.getOwnPropertyDescriptor(s, "value").set;
      if (d && l !== a) {
        const p = new Event("input", { bubbles: !0 }), f = new Event("change", { bubbles: !0 });
        d.call(i, l), i.dispatchEvent(p), i.dispatchEvent(f);
      }
    }), (l, a) => (C(), B(co, ee({
      ref_key: "primitiveElement",
      ref: t
    }, {
      ...o,
      ...l.$attrs
    }, { as: "input" }), null, 16));
  }
}), gl = Pu, Mu = /* @__PURE__ */ V({
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
    const o = e, t = P(() => typeof o.value == "object" && Array.isArray(o.value) && o.value.length === 0 && o.required), r = P(() => typeof o.value == "string" || typeof o.value == "number" || typeof o.value == "boolean" || o.value === null || o.value === void 0 ? [{
      name: o.name,
      value: o.value
    }] : typeof o.value == "object" && Array.isArray(o.value) ? o.value.flatMap((n, l) => typeof n == "object" ? Object.entries(n).map(([a, i]) => ({
      name: `${o.name}[${l}][${a}]`,
      value: i
    })) : {
      name: `${o.name}[${l}]`,
      value: n
    }) : o.value !== null && typeof o.value == "object" && !Array.isArray(o.value) ? Object.entries(o.value).map(([n, l]) => ({
      name: `${o.name}[${n}]`,
      value: l
    })) : []);
    return (n, l) => (C(), z(be, null, [J(" We render single input if it's required "), t.value ? (C(), B(gl, ee({ key: n.name }, {
      ...o,
      ...n.$attrs
    }, {
      name: n.name,
      value: n.value
    }), null, 16, ["name", "value"])) : (C(!0), z(be, { key: 1 }, pt(r.value, (a) => (C(), B(gl, ee({ key: a.name }, { ref_for: !0 }, {
      ...o,
      ...n.$attrs
    }, {
      name: a.name,
      value: a.value
    }), null, 16, ["name", "value"]))), 128))], 2112));
  }
}), wa = Mu;
const [_a, Iu] = ke("PopperRoot");
var Ru = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "PopperRoot",
  setup(e) {
    const o = I();
    return Iu({
      anchor: o,
      onAnchorChange: (t) => o.value = t
    }), (t, r) => F(t.$slots, "default");
  }
}), po = Ru, Du = /* @__PURE__ */ V({
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
    const o = e, { forwardRef: t, currentElement: r } = ce(), n = _a();
    return Jl(() => {
      n.onAnchorChange(o.reference ?? r.value);
    }), (l, a) => (C(), B(u(ve), {
      ref: u(t),
      as: l.as,
      "as-child": l.asChild
    }, {
      default: q(() => [F(l.$slots, "default")]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), fo = Du;
const Lu = {
  key: 0,
  d: "M0 0L6 6L12 0"
}, $u = {
  key: 1,
  d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
var qu = /* @__PURE__ */ V({
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
    const o = e;
    return ce(), (t, r) => (C(), B(u(ve), ee(o, {
      width: t.width,
      height: t.height,
      viewBox: t.asChild ? void 0 : "0 0 12 6",
      preserveAspectRatio: t.asChild ? void 0 : "none"
    }), {
      default: q(() => [F(t.$slots, "default", {}, () => [t.rounded ? (C(), z("path", $u)) : (C(), z("path", Lu))])]),
      _: 3
    }, 16, [
      "width",
      "height",
      "viewBox",
      "preserveAspectRatio"
    ]));
  }
}), Bu = qu;
function Fu(e) {
  return e !== null;
}
function Nu(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(o) {
      var x, w, h;
      const { placement: t, rects: r, middlewareData: n } = o, a = ((x = n.arrow) == null ? void 0 : x.centerOffset) !== 0, i = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, d] = Jo(t), p = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[d], f = (((w = n.arrow) == null ? void 0 : w.x) ?? 0) + i / 2, v = (((h = n.arrow) == null ? void 0 : h.y) ?? 0) + s / 2;
      let y = "", m = "";
      return c === "bottom" ? (y = a ? p : `${f}px`, m = `${-s}px`) : c === "top" ? (y = a ? p : `${f}px`, m = `${r.floating.height + s}px`) : c === "right" ? (y = `${-s}px`, m = a ? p : `${v}px`) : c === "left" && (y = `${r.floating.width + s}px`, m = a ? p : `${v}px`), { data: {
        x: y,
        y: m
      } };
    }
  };
}
function Jo(e) {
  const [o, t = "center"] = e.split("-");
  return [o, t];
}
const Vu = ["top", "right", "bottom", "left"], It = Math.min, ze = Math.max, to = Math.round, Wn = Math.floor, ct = (e) => ({
  x: e,
  y: e
}), zu = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Hu = {
  start: "end",
  end: "start"
};
function Zo(e, o, t) {
  return ze(e, It(o, t));
}
function Ct(e, o) {
  return typeof e == "function" ? e(o) : e;
}
function At(e) {
  return e.split("-")[0];
}
function pn(e) {
  return e.split("-")[1];
}
function Sr(e) {
  return e === "x" ? "y" : "x";
}
function Cr(e) {
  return e === "y" ? "height" : "width";
}
const Uu = /* @__PURE__ */ new Set(["top", "bottom"]);
function ut(e) {
  return Uu.has(At(e)) ? "y" : "x";
}
function Ar(e) {
  return Sr(ut(e));
}
function Wu(e, o, t) {
  t === void 0 && (t = !1);
  const r = pn(e), n = Ar(e), l = Cr(n);
  let a = n === "x" ? r === (t ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return o.reference[l] > o.floating[l] && (a = no(a)), [a, no(a)];
}
function Ku(e) {
  const o = no(e);
  return [Qo(e), o, Qo(o)];
}
function Qo(e) {
  return e.replace(/start|end/g, (o) => Hu[o]);
}
const bl = ["left", "right"], xl = ["right", "left"], Gu = ["top", "bottom"], Yu = ["bottom", "top"];
function Xu(e, o, t) {
  switch (e) {
    case "top":
    case "bottom":
      return t ? o ? xl : bl : o ? bl : xl;
    case "left":
    case "right":
      return o ? Gu : Yu;
    default:
      return [];
  }
}
function Ju(e, o, t, r) {
  const n = pn(e);
  let l = Xu(At(e), t === "start", r);
  return n && (l = l.map((a) => a + "-" + n), o && (l = l.concat(l.map(Qo)))), l;
}
function no(e) {
  return e.replace(/left|right|bottom|top/g, (o) => zu[o]);
}
function Zu(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Sa(e) {
  return typeof e != "number" ? Zu(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function oo(e) {
  const {
    x: o,
    y: t,
    width: r,
    height: n
  } = e;
  return {
    width: r,
    height: n,
    top: t,
    left: o,
    right: o + r,
    bottom: t + n,
    x: o,
    y: t
  };
}
function wl(e, o, t) {
  let {
    reference: r,
    floating: n
  } = e;
  const l = ut(o), a = Ar(o), i = Cr(a), s = At(o), c = l === "y", d = r.x + r.width / 2 - n.width / 2, p = r.y + r.height / 2 - n.height / 2, f = r[i] / 2 - n[i] / 2;
  let v;
  switch (s) {
    case "top":
      v = {
        x: d,
        y: r.y - n.height
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
        y: p
      };
      break;
    case "left":
      v = {
        x: r.x - n.width,
        y: p
      };
      break;
    default:
      v = {
        x: r.x,
        y: r.y
      };
  }
  switch (pn(o)) {
    case "start":
      v[a] -= f * (t && c ? -1 : 1);
      break;
    case "end":
      v[a] += f * (t && c ? -1 : 1);
      break;
  }
  return v;
}
async function Qu(e, o) {
  var t;
  o === void 0 && (o = {});
  const {
    x: r,
    y: n,
    platform: l,
    rects: a,
    elements: i,
    strategy: s
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: p = "floating",
    altBoundary: f = !1,
    padding: v = 0
  } = Ct(o, e), y = Sa(v), x = i[f ? p === "floating" ? "reference" : "floating" : p], w = oo(await l.getClippingRect({
    element: (t = await (l.isElement == null ? void 0 : l.isElement(x))) == null || t ? x : x.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: s
  })), h = p === "floating" ? {
    x: r,
    y: n,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, _ = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(i.floating)), S = await (l.isElement == null ? void 0 : l.isElement(_)) ? await (l.getScale == null ? void 0 : l.getScale(_)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, g = oo(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: h,
    offsetParent: _,
    strategy: s
  }) : h);
  return {
    top: (w.top - g.top + y.top) / S.y,
    bottom: (g.bottom - w.bottom + y.bottom) / S.y,
    left: (w.left - g.left + y.left) / S.x,
    right: (g.right - w.right + y.right) / S.x
  };
}
const ed = async (e, o, t) => {
  const {
    placement: r = "bottom",
    strategy: n = "absolute",
    middleware: l = [],
    platform: a
  } = t, i = l.filter(Boolean), s = await (a.isRTL == null ? void 0 : a.isRTL(o));
  let c = await a.getElementRects({
    reference: e,
    floating: o,
    strategy: n
  }), {
    x: d,
    y: p
  } = wl(c, r, s), f = r, v = {}, y = 0;
  for (let x = 0; x < i.length; x++) {
    var m;
    const {
      name: w,
      fn: h
    } = i[x], {
      x: _,
      y: S,
      data: g,
      reset: b
    } = await h({
      x: d,
      y: p,
      initialPlacement: r,
      placement: f,
      strategy: n,
      middlewareData: v,
      rects: c,
      platform: {
        ...a,
        detectOverflow: (m = a.detectOverflow) != null ? m : Qu
      },
      elements: {
        reference: e,
        floating: o
      }
    });
    d = _ ?? d, p = S ?? p, v = {
      ...v,
      [w]: {
        ...v[w],
        ...g
      }
    }, b && y <= 50 && (y++, typeof b == "object" && (b.placement && (f = b.placement), b.rects && (c = b.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: o,
      strategy: n
    }) : b.rects), {
      x: d,
      y: p
    } = wl(c, f, s)), x = -1);
  }
  return {
    x: d,
    y: p,
    placement: f,
    strategy: n,
    middlewareData: v
  };
}, td = (e) => ({
  name: "arrow",
  options: e,
  async fn(o) {
    const {
      x: t,
      y: r,
      placement: n,
      rects: l,
      platform: a,
      elements: i,
      middlewareData: s
    } = o, {
      element: c,
      padding: d = 0
    } = Ct(e, o) || {};
    if (c == null)
      return {};
    const p = Sa(d), f = {
      x: t,
      y: r
    }, v = Ar(n), y = Cr(v), m = await a.getDimensions(c), x = v === "y", w = x ? "top" : "left", h = x ? "bottom" : "right", _ = x ? "clientHeight" : "clientWidth", S = l.reference[y] + l.reference[v] - f[v] - l.floating[y], g = f[v] - l.reference[v], b = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let A = b ? b[_] : 0;
    (!A || !await (a.isElement == null ? void 0 : a.isElement(b))) && (A = i.floating[_] || l.floating[y]);
    const T = S / 2 - g / 2, E = A / 2 - m[y] / 2 - 1, M = It(p[w], E), $ = It(p[h], E), L = M, k = A - m[y] - $, N = A / 2 - m[y] / 2 + T, U = Zo(L, N, k), oe = !s.arrow && pn(n) != null && N !== U && l.reference[y] / 2 - (N < L ? M : $) - m[y] / 2 < 0, ne = oe ? N < L ? N - L : N - k : 0;
    return {
      [v]: f[v] + ne,
      data: {
        [v]: U,
        centerOffset: N - U - ne,
        ...oe && {
          alignmentOffset: ne
        }
      },
      reset: oe
    };
  }
}), nd = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(o) {
      var t, r;
      const {
        placement: n,
        middlewareData: l,
        rects: a,
        initialPlacement: i,
        platform: s,
        elements: c
      } = o, {
        mainAxis: d = !0,
        crossAxis: p = !0,
        fallbackPlacements: f,
        fallbackStrategy: v = "bestFit",
        fallbackAxisSideDirection: y = "none",
        flipAlignment: m = !0,
        ...x
      } = Ct(e, o);
      if ((t = l.arrow) != null && t.alignmentOffset)
        return {};
      const w = At(n), h = ut(i), _ = At(i) === i, S = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), g = f || (_ || !m ? [no(i)] : Ku(i)), b = y !== "none";
      !f && b && g.push(...Ju(i, m, y, S));
      const A = [i, ...g], T = await s.detectOverflow(o, x), E = [];
      let M = ((r = l.flip) == null ? void 0 : r.overflows) || [];
      if (d && E.push(T[w]), p) {
        const N = Wu(n, a, S);
        E.push(T[N[0]], T[N[1]]);
      }
      if (M = [...M, {
        placement: n,
        overflows: E
      }], !E.every((N) => N <= 0)) {
        var $, L;
        const N = ((($ = l.flip) == null ? void 0 : $.index) || 0) + 1, U = A[N];
        if (U && (!(p === "alignment" ? h !== ut(U) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        M.every((se) => ut(se.placement) === h ? se.overflows[0] > 0 : !0)))
          return {
            data: {
              index: N,
              overflows: M
            },
            reset: {
              placement: U
            }
          };
        let oe = (L = M.filter((ne) => ne.overflows[0] <= 0).sort((ne, se) => ne.overflows[1] - se.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!oe)
          switch (v) {
            case "bestFit": {
              var k;
              const ne = (k = M.filter((se) => {
                if (b) {
                  const D = ut(se.placement);
                  return D === h || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  D === "y";
                }
                return !0;
              }).map((se) => [se.placement, se.overflows.filter((D) => D > 0).reduce((D, Z) => D + Z, 0)]).sort((se, D) => se[1] - D[1])[0]) == null ? void 0 : k[0];
              ne && (oe = ne);
              break;
            }
            case "initialPlacement":
              oe = i;
              break;
          }
        if (n !== oe)
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
function _l(e, o) {
  return {
    top: e.top - o.height,
    right: e.right - o.width,
    bottom: e.bottom - o.height,
    left: e.left - o.width
  };
}
function Sl(e) {
  return Vu.some((o) => e[o] >= 0);
}
const od = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(o) {
      const {
        rects: t,
        platform: r
      } = o, {
        strategy: n = "referenceHidden",
        ...l
      } = Ct(e, o);
      switch (n) {
        case "referenceHidden": {
          const a = await r.detectOverflow(o, {
            ...l,
            elementContext: "reference"
          }), i = _l(a, t.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Sl(i)
            }
          };
        }
        case "escaped": {
          const a = await r.detectOverflow(o, {
            ...l,
            altBoundary: !0
          }), i = _l(a, t.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Sl(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Ca = /* @__PURE__ */ new Set(["left", "top"]);
async function rd(e, o) {
  const {
    placement: t,
    platform: r,
    elements: n
  } = e, l = await (r.isRTL == null ? void 0 : r.isRTL(n.floating)), a = At(t), i = pn(t), s = ut(t) === "y", c = Ca.has(a) ? -1 : 1, d = l && s ? -1 : 1, p = Ct(o, e);
  let {
    mainAxis: f,
    crossAxis: v,
    alignmentAxis: y
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return i && typeof y == "number" && (v = i === "end" ? y * -1 : y), s ? {
    x: v * d,
    y: f * c
  } : {
    x: f * c,
    y: v * d
  };
}
const ld = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(o) {
      var t, r;
      const {
        x: n,
        y: l,
        placement: a,
        middlewareData: i
      } = o, s = await rd(o, e);
      return a === ((t = i.offset) == null ? void 0 : t.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: n + s.x,
        y: l + s.y,
        data: {
          ...s,
          placement: a
        }
      };
    }
  };
}, ad = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(o) {
      const {
        x: t,
        y: r,
        placement: n,
        platform: l
      } = o, {
        mainAxis: a = !0,
        crossAxis: i = !1,
        limiter: s = {
          fn: (w) => {
            let {
              x: h,
              y: _
            } = w;
            return {
              x: h,
              y: _
            };
          }
        },
        ...c
      } = Ct(e, o), d = {
        x: t,
        y: r
      }, p = await l.detectOverflow(o, c), f = ut(At(n)), v = Sr(f);
      let y = d[v], m = d[f];
      if (a) {
        const w = v === "y" ? "top" : "left", h = v === "y" ? "bottom" : "right", _ = y + p[w], S = y - p[h];
        y = Zo(_, y, S);
      }
      if (i) {
        const w = f === "y" ? "top" : "left", h = f === "y" ? "bottom" : "right", _ = m + p[w], S = m - p[h];
        m = Zo(_, m, S);
      }
      const x = s.fn({
        ...o,
        [v]: y,
        [f]: m
      });
      return {
        ...x,
        data: {
          x: x.x - t,
          y: x.y - r,
          enabled: {
            [v]: a,
            [f]: i
          }
        }
      };
    }
  };
}, id = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(o) {
      const {
        x: t,
        y: r,
        placement: n,
        rects: l,
        middlewareData: a
      } = o, {
        offset: i = 0,
        mainAxis: s = !0,
        crossAxis: c = !0
      } = Ct(e, o), d = {
        x: t,
        y: r
      }, p = ut(n), f = Sr(p);
      let v = d[f], y = d[p];
      const m = Ct(i, o), x = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (s) {
        const _ = f === "y" ? "height" : "width", S = l.reference[f] - l.floating[_] + x.mainAxis, g = l.reference[f] + l.reference[_] - x.mainAxis;
        v < S ? v = S : v > g && (v = g);
      }
      if (c) {
        var w, h;
        const _ = f === "y" ? "width" : "height", S = Ca.has(At(n)), g = l.reference[p] - l.floating[_] + (S && ((w = a.offset) == null ? void 0 : w[p]) || 0) + (S ? 0 : x.crossAxis), b = l.reference[p] + l.reference[_] + (S ? 0 : ((h = a.offset) == null ? void 0 : h[p]) || 0) - (S ? x.crossAxis : 0);
        y < g ? y = g : y > b && (y = b);
      }
      return {
        [f]: v,
        [p]: y
      };
    }
  };
}, sd = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(o) {
      var t, r;
      const {
        placement: n,
        rects: l,
        platform: a,
        elements: i
      } = o, {
        apply: s = () => {
        },
        ...c
      } = Ct(e, o), d = await a.detectOverflow(o, c), p = At(n), f = pn(n), v = ut(n) === "y", {
        width: y,
        height: m
      } = l.floating;
      let x, w;
      p === "top" || p === "bottom" ? (x = p, w = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (w = p, x = f === "end" ? "top" : "bottom");
      const h = m - d.top - d.bottom, _ = y - d.left - d.right, S = It(m - d[x], h), g = It(y - d[w], _), b = !o.middlewareData.shift;
      let A = S, T = g;
      if ((t = o.middlewareData.shift) != null && t.enabled.x && (T = _), (r = o.middlewareData.shift) != null && r.enabled.y && (A = h), b && !f) {
        const M = ze(d.left, 0), $ = ze(d.right, 0), L = ze(d.top, 0), k = ze(d.bottom, 0);
        v ? T = y - 2 * (M !== 0 || $ !== 0 ? M + $ : ze(d.left, d.right)) : A = m - 2 * (L !== 0 || k !== 0 ? L + k : ze(d.top, d.bottom));
      }
      await s({
        ...o,
        availableWidth: T,
        availableHeight: A
      });
      const E = await a.getDimensions(i.floating);
      return y !== E.width || m !== E.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function vo() {
  return typeof window < "u";
}
function Yt(e) {
  return Or(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function He(e) {
  var o;
  return (e == null || (o = e.ownerDocument) == null ? void 0 : o.defaultView) || window;
}
function mt(e) {
  var o;
  return (o = (Or(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : o.documentElement;
}
function Or(e) {
  return vo() ? e instanceof Node || e instanceof He(e).Node : !1;
}
function tt(e) {
  return vo() ? e instanceof Element || e instanceof He(e).Element : !1;
}
function vt(e) {
  return vo() ? e instanceof HTMLElement || e instanceof He(e).HTMLElement : !1;
}
function Cl(e) {
  return !vo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof He(e).ShadowRoot;
}
const ud = /* @__PURE__ */ new Set(["inline", "contents"]);
function In(e) {
  const {
    overflow: o,
    overflowX: t,
    overflowY: r,
    display: n
  } = nt(e);
  return /auto|scroll|overlay|hidden|clip/.test(o + r + t) && !ud.has(n);
}
const dd = /* @__PURE__ */ new Set(["table", "td", "th"]);
function cd(e) {
  return dd.has(Yt(e));
}
const pd = [":popover-open", ":modal"];
function yo(e) {
  return pd.some((o) => {
    try {
      return e.matches(o);
    } catch {
      return !1;
    }
  });
}
const fd = ["transform", "translate", "scale", "rotate", "perspective"], vd = ["transform", "translate", "scale", "rotate", "perspective", "filter"], yd = ["paint", "layout", "strict", "content"];
function Er(e) {
  const o = kr(), t = tt(e) ? nt(e) : e;
  return fd.some((r) => t[r] ? t[r] !== "none" : !1) || (t.containerType ? t.containerType !== "normal" : !1) || !o && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !o && (t.filter ? t.filter !== "none" : !1) || vd.some((r) => (t.willChange || "").includes(r)) || yd.some((r) => (t.contain || "").includes(r));
}
function md(e) {
  let o = Rt(e);
  for (; vt(o) && !an(o); ) {
    if (Er(o))
      return o;
    if (yo(o))
      return null;
    o = Rt(o);
  }
  return null;
}
function kr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const hd = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function an(e) {
  return hd.has(Yt(e));
}
function nt(e) {
  return He(e).getComputedStyle(e);
}
function mo(e) {
  return tt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Rt(e) {
  if (Yt(e) === "html")
    return e;
  const o = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Cl(e) && e.host || // Fallback.
    mt(e)
  );
  return Cl(o) ? o.host : o;
}
function Aa(e) {
  const o = Rt(e);
  return an(o) ? e.ownerDocument ? e.ownerDocument.body : e.body : vt(o) && In(o) ? o : Aa(o);
}
function On(e, o, t) {
  var r;
  o === void 0 && (o = []), t === void 0 && (t = !0);
  const n = Aa(e), l = n === ((r = e.ownerDocument) == null ? void 0 : r.body), a = He(n);
  if (l) {
    const i = er(a);
    return o.concat(a, a.visualViewport || [], In(n) ? n : [], i && t ? On(i) : []);
  }
  return o.concat(n, On(n, [], t));
}
function er(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Oa(e) {
  const o = nt(e);
  let t = parseFloat(o.width) || 0, r = parseFloat(o.height) || 0;
  const n = vt(e), l = n ? e.offsetWidth : t, a = n ? e.offsetHeight : r, i = to(t) !== l || to(r) !== a;
  return i && (t = l, r = a), {
    width: t,
    height: r,
    $: i
  };
}
function Tr(e) {
  return tt(e) ? e : e.contextElement;
}
function ln(e) {
  const o = Tr(e);
  if (!vt(o))
    return ct(1);
  const t = o.getBoundingClientRect(), {
    width: r,
    height: n,
    $: l
  } = Oa(o);
  let a = (l ? to(t.width) : t.width) / r, i = (l ? to(t.height) : t.height) / n;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const gd = /* @__PURE__ */ ct(0);
function Ea(e) {
  const o = He(e);
  return !kr() || !o.visualViewport ? gd : {
    x: o.visualViewport.offsetLeft,
    y: o.visualViewport.offsetTop
  };
}
function bd(e, o, t) {
  return o === void 0 && (o = !1), !t || o && t !== He(e) ? !1 : o;
}
function Ut(e, o, t, r) {
  o === void 0 && (o = !1), t === void 0 && (t = !1);
  const n = e.getBoundingClientRect(), l = Tr(e);
  let a = ct(1);
  o && (r ? tt(r) && (a = ln(r)) : a = ln(e));
  const i = bd(l, t, r) ? Ea(l) : ct(0);
  let s = (n.left + i.x) / a.x, c = (n.top + i.y) / a.y, d = n.width / a.x, p = n.height / a.y;
  if (l) {
    const f = He(l), v = r && tt(r) ? He(r) : r;
    let y = f, m = er(y);
    for (; m && r && v !== y; ) {
      const x = ln(m), w = m.getBoundingClientRect(), h = nt(m), _ = w.left + (m.clientLeft + parseFloat(h.paddingLeft)) * x.x, S = w.top + (m.clientTop + parseFloat(h.paddingTop)) * x.y;
      s *= x.x, c *= x.y, d *= x.x, p *= x.y, s += _, c += S, y = He(m), m = er(y);
    }
  }
  return oo({
    width: d,
    height: p,
    x: s,
    y: c
  });
}
function ho(e, o) {
  const t = mo(e).scrollLeft;
  return o ? o.left + t : Ut(mt(e)).left + t;
}
function ka(e, o) {
  const t = e.getBoundingClientRect(), r = t.left + o.scrollLeft - ho(e, t), n = t.top + o.scrollTop;
  return {
    x: r,
    y: n
  };
}
function xd(e) {
  let {
    elements: o,
    rect: t,
    offsetParent: r,
    strategy: n
  } = e;
  const l = n === "fixed", a = mt(r), i = o ? yo(o.floating) : !1;
  if (r === a || i && l)
    return t;
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = ct(1);
  const d = ct(0), p = vt(r);
  if ((p || !p && !l) && ((Yt(r) !== "body" || In(a)) && (s = mo(r)), vt(r))) {
    const v = Ut(r);
    c = ln(r), d.x = v.x + r.clientLeft, d.y = v.y + r.clientTop;
  }
  const f = a && !p && !l ? ka(a, s) : ct(0);
  return {
    width: t.width * c.x,
    height: t.height * c.y,
    x: t.x * c.x - s.scrollLeft * c.x + d.x + f.x,
    y: t.y * c.y - s.scrollTop * c.y + d.y + f.y
  };
}
function wd(e) {
  return Array.from(e.getClientRects());
}
function _d(e) {
  const o = mt(e), t = mo(e), r = e.ownerDocument.body, n = ze(o.scrollWidth, o.clientWidth, r.scrollWidth, r.clientWidth), l = ze(o.scrollHeight, o.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -t.scrollLeft + ho(e);
  const i = -t.scrollTop;
  return nt(r).direction === "rtl" && (a += ze(o.clientWidth, r.clientWidth) - n), {
    width: n,
    height: l,
    x: a,
    y: i
  };
}
const Al = 25;
function Sd(e, o) {
  const t = He(e), r = mt(e), n = t.visualViewport;
  let l = r.clientWidth, a = r.clientHeight, i = 0, s = 0;
  if (n) {
    l = n.width, a = n.height;
    const d = kr();
    (!d || d && o === "fixed") && (i = n.offsetLeft, s = n.offsetTop);
  }
  const c = ho(r);
  if (c <= 0) {
    const d = r.ownerDocument, p = d.body, f = getComputedStyle(p), v = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, y = Math.abs(r.clientWidth - p.clientWidth - v);
    y <= Al && (l -= y);
  } else
    c <= Al && (l += c);
  return {
    width: l,
    height: a,
    x: i,
    y: s
  };
}
const Cd = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Ad(e, o) {
  const t = Ut(e, !0, o === "fixed"), r = t.top + e.clientTop, n = t.left + e.clientLeft, l = vt(e) ? ln(e) : ct(1), a = e.clientWidth * l.x, i = e.clientHeight * l.y, s = n * l.x, c = r * l.y;
  return {
    width: a,
    height: i,
    x: s,
    y: c
  };
}
function Ol(e, o, t) {
  let r;
  if (o === "viewport")
    r = Sd(e, t);
  else if (o === "document")
    r = _d(mt(e));
  else if (tt(o))
    r = Ad(o, t);
  else {
    const n = Ea(e);
    r = {
      x: o.x - n.x,
      y: o.y - n.y,
      width: o.width,
      height: o.height
    };
  }
  return oo(r);
}
function Ta(e, o) {
  const t = Rt(e);
  return t === o || !tt(t) || an(t) ? !1 : nt(t).position === "fixed" || Ta(t, o);
}
function Od(e, o) {
  const t = o.get(e);
  if (t)
    return t;
  let r = On(e, [], !1).filter((i) => tt(i) && Yt(i) !== "body"), n = null;
  const l = nt(e).position === "fixed";
  let a = l ? Rt(e) : e;
  for (; tt(a) && !an(a); ) {
    const i = nt(a), s = Er(a);
    !s && i.position === "fixed" && (n = null), (l ? !s && !n : !s && i.position === "static" && !!n && Cd.has(n.position) || In(a) && !s && Ta(e, a)) ? r = r.filter((d) => d !== a) : n = i, a = Rt(a);
  }
  return o.set(e, r), r;
}
function Ed(e) {
  let {
    element: o,
    boundary: t,
    rootBoundary: r,
    strategy: n
  } = e;
  const a = [...t === "clippingAncestors" ? yo(o) ? [] : Od(o, this._c) : [].concat(t), r], i = a[0], s = a.reduce((c, d) => {
    const p = Ol(o, d, n);
    return c.top = ze(p.top, c.top), c.right = It(p.right, c.right), c.bottom = It(p.bottom, c.bottom), c.left = ze(p.left, c.left), c;
  }, Ol(o, i, n));
  return {
    width: s.right - s.left,
    height: s.bottom - s.top,
    x: s.left,
    y: s.top
  };
}
function kd(e) {
  const {
    width: o,
    height: t
  } = Oa(e);
  return {
    width: o,
    height: t
  };
}
function Td(e, o, t) {
  const r = vt(o), n = mt(o), l = t === "fixed", a = Ut(e, !0, l, o);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = ct(0);
  function c() {
    s.x = ho(n);
  }
  if (r || !r && !l)
    if ((Yt(o) !== "body" || In(n)) && (i = mo(o)), r) {
      const v = Ut(o, !0, l, o);
      s.x = v.x + o.clientLeft, s.y = v.y + o.clientTop;
    } else
      n && c();
  l && !r && n && c();
  const d = n && !r && !l ? ka(n, i) : ct(0), p = a.left + i.scrollLeft - s.x - d.x, f = a.top + i.scrollTop - s.y - d.y;
  return {
    x: p,
    y: f,
    width: a.width,
    height: a.height
  };
}
function Fo(e) {
  return nt(e).position === "static";
}
function El(e, o) {
  if (!vt(e) || nt(e).position === "fixed")
    return null;
  if (o)
    return o(e);
  let t = e.offsetParent;
  return mt(e) === t && (t = t.ownerDocument.body), t;
}
function ja(e, o) {
  const t = He(e);
  if (yo(e))
    return t;
  if (!vt(e)) {
    let n = Rt(e);
    for (; n && !an(n); ) {
      if (tt(n) && !Fo(n))
        return n;
      n = Rt(n);
    }
    return t;
  }
  let r = El(e, o);
  for (; r && cd(r) && Fo(r); )
    r = El(r, o);
  return r && an(r) && Fo(r) && !Er(r) ? t : r || md(e) || t;
}
const jd = async function(e) {
  const o = this.getOffsetParent || ja, t = this.getDimensions, r = await t(e.floating);
  return {
    reference: Td(e.reference, await o(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Pd(e) {
  return nt(e).direction === "rtl";
}
const Md = {
  convertOffsetParentRelativeRectToViewportRelativeRect: xd,
  getDocumentElement: mt,
  getClippingRect: Ed,
  getOffsetParent: ja,
  getElementRects: jd,
  getClientRects: wd,
  getDimensions: kd,
  getScale: ln,
  isElement: tt,
  isRTL: Pd
};
function Pa(e, o) {
  return e.x === o.x && e.y === o.y && e.width === o.width && e.height === o.height;
}
function Id(e, o) {
  let t = null, r;
  const n = mt(e);
  function l() {
    var i;
    clearTimeout(r), (i = t) == null || i.disconnect(), t = null;
  }
  function a(i, s) {
    i === void 0 && (i = !1), s === void 0 && (s = 1), l();
    const c = e.getBoundingClientRect(), {
      left: d,
      top: p,
      width: f,
      height: v
    } = c;
    if (i || o(), !f || !v)
      return;
    const y = Wn(p), m = Wn(n.clientWidth - (d + f)), x = Wn(n.clientHeight - (p + v)), w = Wn(d), _ = {
      rootMargin: -y + "px " + -m + "px " + -x + "px " + -w + "px",
      threshold: ze(0, It(1, s)) || 1
    };
    let S = !0;
    function g(b) {
      const A = b[0].intersectionRatio;
      if (A !== s) {
        if (!S)
          return a();
        A ? a(!1, A) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      A === 1 && !Pa(c, e.getBoundingClientRect()) && a(), S = !1;
    }
    try {
      t = new IntersectionObserver(g, {
        ..._,
        // Handle <iframe>s
        root: n.ownerDocument
      });
    } catch {
      t = new IntersectionObserver(g, _);
    }
    t.observe(e);
  }
  return a(!0), l;
}
function Rd(e, o, t, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: n = !0,
    ancestorResize: l = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: s = !1
  } = r, c = Tr(e), d = n || l ? [...c ? On(c) : [], ...On(o)] : [];
  d.forEach((w) => {
    n && w.addEventListener("scroll", t, {
      passive: !0
    }), l && w.addEventListener("resize", t);
  });
  const p = c && i ? Id(c, t) : null;
  let f = -1, v = null;
  a && (v = new ResizeObserver((w) => {
    let [h] = w;
    h && h.target === c && v && (v.unobserve(o), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var _;
      (_ = v) == null || _.observe(o);
    })), t();
  }), c && !s && v.observe(c), v.observe(o));
  let y, m = s ? Ut(e) : null;
  s && x();
  function x() {
    const w = Ut(e);
    m && !Pa(m, w) && t(), m = w, y = requestAnimationFrame(x);
  }
  return t(), () => {
    var w;
    d.forEach((h) => {
      n && h.removeEventListener("scroll", t), l && h.removeEventListener("resize", t);
    }), p == null || p(), (w = v) == null || w.disconnect(), v = null, s && cancelAnimationFrame(y);
  };
}
const Dd = ld, Ld = ad, kl = nd, $d = sd, qd = od, Bd = td, Fd = id, Nd = (e, o, t) => {
  const r = /* @__PURE__ */ new Map(), n = {
    platform: Md,
    ...t
  }, l = {
    ...n.platform,
    _c: r
  };
  return ed(e, o, {
    ...n,
    platform: l
  });
};
function Vd(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function tr(e) {
  if (Vd(e)) {
    const o = e.$el;
    return Or(o) && Yt(o) === "#comment" ? null : o;
  }
  return e;
}
function on(e) {
  return typeof e == "function" ? e() : u(e);
}
function zd(e) {
  return {
    name: "arrow",
    options: e,
    fn(o) {
      const t = tr(on(e.element));
      return t == null ? {} : Bd({
        element: t,
        padding: e.padding
      }).fn(o);
    }
  };
}
function Ma(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Tl(e, o) {
  const t = Ma(e);
  return Math.round(o * t) / t;
}
function Hd(e, o, t) {
  t === void 0 && (t = {});
  const r = t.whileElementsMounted, n = P(() => {
    var A;
    return (A = on(t.open)) != null ? A : !0;
  }), l = P(() => on(t.middleware)), a = P(() => {
    var A;
    return (A = on(t.placement)) != null ? A : "bottom";
  }), i = P(() => {
    var A;
    return (A = on(t.strategy)) != null ? A : "absolute";
  }), s = P(() => {
    var A;
    return (A = on(t.transform)) != null ? A : !0;
  }), c = P(() => tr(e.value)), d = P(() => tr(o.value)), p = I(0), f = I(0), v = I(i.value), y = I(a.value), m = un({}), x = I(!1), w = P(() => {
    const A = {
      position: v.value,
      left: "0",
      top: "0"
    };
    if (!d.value)
      return A;
    const T = Tl(d.value, p.value), E = Tl(d.value, f.value);
    return s.value ? {
      ...A,
      transform: "translate(" + T + "px, " + E + "px)",
      ...Ma(d.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: v.value,
      left: T + "px",
      top: E + "px"
    };
  });
  let h;
  function _() {
    if (c.value == null || d.value == null)
      return;
    const A = n.value;
    Nd(c.value, d.value, {
      middleware: l.value,
      placement: a.value,
      strategy: i.value
    }).then((T) => {
      p.value = T.x, f.value = T.y, v.value = T.strategy, y.value = T.placement, m.value = T.middlewareData, x.value = A !== !1;
    });
  }
  function S() {
    typeof h == "function" && (h(), h = void 0);
  }
  function g() {
    if (S(), r === void 0) {
      _();
      return;
    }
    if (c.value != null && d.value != null) {
      h = r(c.value, d.value, _);
      return;
    }
  }
  function b() {
    n.value || (x.value = !1);
  }
  return pe([l, a, i, n], _, {
    flush: "sync"
  }), pe([c, d], g, {
    flush: "sync"
  }), pe(n, b, {
    flush: "sync"
  }), Kl() && sr(S), {
    x: Ft(p),
    y: Ft(f),
    strategy: Ft(v),
    placement: Ft(y),
    middlewareData: Ft(m),
    isPositioned: Ft(x),
    floatingStyles: w,
    update: _
  };
}
const Ud = {
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
}, [Wd, Kd] = ke("PopperContent");
var Gd = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: /* @__PURE__ */ pi({
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
  }, { ...Ud }),
  emits: ["placed"],
  setup(e, { emit: o }) {
    const t = e, r = o, n = _a(), { forwardRef: l, currentElement: a } = ce(), i = I(), s = I(), { width: c, height: d } = su(s), p = P(() => t.side + (t.align !== "center" ? `-${t.align}` : "")), f = P(() => typeof t.collisionPadding == "number" ? t.collisionPadding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...t.collisionPadding
    }), v = P(() => Array.isArray(t.collisionBoundary) ? t.collisionBoundary : [t.collisionBoundary]), y = P(() => ({
      padding: f.value,
      boundary: v.value.filter(Fu),
      altBoundary: v.value.length > 0
    })), m = P(() => ({
      mainAxis: t.sideFlip,
      crossAxis: t.alignFlip
    })), x = Cs(() => [
      Dd({
        mainAxis: t.sideOffset + d.value,
        alignmentAxis: t.alignOffset
      }),
      t.prioritizePosition && t.avoidCollisions && kl({
        ...y.value,
        ...m.value
      }),
      t.avoidCollisions && Ld({
        mainAxis: !0,
        crossAxis: !!t.prioritizePosition,
        limiter: t.sticky === "partial" ? Fd() : void 0,
        ...y.value
      }),
      !t.prioritizePosition && t.avoidCollisions && kl({
        ...y.value,
        ...m.value
      }),
      $d({
        ...y.value,
        apply: ({ elements: k, rects: N, availableWidth: U, availableHeight: oe }) => {
          const { width: ne, height: se } = N.reference, D = k.floating.style;
          D.setProperty("--reka-popper-available-width", `${U}px`), D.setProperty("--reka-popper-available-height", `${oe}px`), D.setProperty("--reka-popper-anchor-width", `${ne}px`), D.setProperty("--reka-popper-anchor-height", `${se}px`);
        }
      }),
      s.value && zd({
        element: s.value,
        padding: t.arrowPadding
      }),
      Nu({
        arrowWidth: c.value,
        arrowHeight: d.value
      }),
      t.hideWhenDetached && qd({
        strategy: "referenceHidden",
        ...y.value
      })
    ]), w = P(() => t.reference ?? n.anchor.value), { floatingStyles: h, placement: _, isPositioned: S, middlewareData: g, update: b } = Hd(w, i, {
      strategy: t.positionStrategy,
      placement: p,
      whileElementsMounted: (...k) => Rd(...k, {
        layoutShift: !t.disableUpdateOnLayoutShift,
        animationFrame: t.updatePositionStrategy === "always"
      }),
      middleware: x
    }), A = P(() => Jo(_.value)[0]), T = P(() => Jo(_.value)[1]);
    Jl(() => {
      S.value && r("placed");
    });
    const E = P(() => {
      var N;
      const k = ((N = g.value.arrow) == null ? void 0 : N.centerOffset) !== 0;
      return t.hideShiftedArrow && k;
    }), M = I("");
    Ae(() => {
      a.value && (M.value = window.getComputedStyle(a.value).zIndex);
    });
    const $ = P(() => {
      var k;
      return ((k = g.value.arrow) == null ? void 0 : k.x) ?? 0;
    }), L = P(() => {
      var k;
      return ((k = g.value.arrow) == null ? void 0 : k.y) ?? 0;
    });
    return Kd({
      placedSide: A,
      onArrowChange: (k) => s.value = k,
      arrowX: $,
      arrowY: L,
      shouldHideArrow: E
    }), (k, N) => {
      var U, oe, ne;
      return C(), z("div", {
        ref_key: "floatingRef",
        ref: i,
        "data-reka-popper-content-wrapper": "",
        style: St({
          ...u(h),
          transform: u(S) ? u(h).transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: M.value,
          "--reka-popper-transform-origin": [(U = u(g).transformOrigin) == null ? void 0 : U.x, (oe = u(g).transformOrigin) == null ? void 0 : oe.y].join(" "),
          ...((ne = u(g).hide) == null ? void 0 : ne.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [K(u(ve), ee({ ref: u(l) }, k.$attrs, {
        "as-child": t.asChild,
        as: k.as,
        "data-side": A.value,
        "data-align": T.value,
        style: { animation: u(S) ? void 0 : "none" }
      }), {
        default: q(() => [F(k.$slots, "default")]),
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
}), go = Gd;
const Yd = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var Xd = /* @__PURE__ */ V({
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
    const { forwardRef: o } = ce(), t = Wd(), r = P(() => Yd[t.placedSide.value]);
    return (n, l) => {
      var a, i, s, c;
      return C(), z("span", {
        ref: (d) => {
          u(t).onArrowChange(d);
        },
        style: St({
          position: "absolute",
          left: (a = u(t).arrowX) != null && a.value ? `${(i = u(t).arrowX) == null ? void 0 : i.value}px` : void 0,
          top: (s = u(t).arrowY) != null && s.value ? `${(c = u(t).arrowY) == null ? void 0 : c.value}px` : void 0,
          [r.value]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[u(t).placedSide.value],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[u(t).placedSide.value],
          visibility: u(t).shouldHideArrow.value ? "hidden" : void 0
        })
      }, [K(Bu, ee(n.$attrs, {
        ref: u(o),
        style: { display: "block" },
        as: n.as,
        "as-child": n.asChild,
        rounded: n.rounded,
        width: n.width,
        height: n.height
      }), {
        default: q(() => [F(n.$slots, "default")]),
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
}), Jd = Xd, Zd = /* @__PURE__ */ V({
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
    const { forwardRef: o } = ce();
    return (t, r) => (C(), B(u(fo), {
      "as-child": "",
      reference: t.reference
    }, {
      default: q(() => [K(u(ve), ee({
        ref: u(o),
        "as-child": t.asChild,
        as: t.as
      }, t.$attrs), {
        default: q(() => [F(t.$slots, "default")]),
        _: 3
      }, 16, ["as-child", "as"])]),
      _: 3
    }, 8, ["reference"]));
  }
}), Qd = Zd;
function ec(e, o, t) {
  return e === void 0 ? !1 : Array.isArray(e) ? e.some((r) => Sn(r, o, t)) : Sn(e, o, t);
}
function Sn(e, o, t) {
  return e === void 0 || o === void 0 ? !1 : typeof e == "string" ? e === o : typeof t == "function" ? t(e, o) : typeof t == "string" ? (e == null ? void 0 : e[t]) === (o == null ? void 0 : o[t]) : Qn(e, o);
}
const [bo, tc] = ke("ListboxRoot");
var nc = /* @__PURE__ */ V({
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
  setup(e, { expose: o, emit: t }) {
    const r = e, n = t, { multiple: l, highlightOnHover: a, orientation: i, disabled: s, selectionBehavior: c, dir: d } = Ue(r), { getItems: p } = Ot({ isProvider: !0 }), { handleTypeaheadSearch: f } = wr(), { primitiveElement: v, currentElement: y } = Mt(), m = iu(), x = hr(d), w = br(y), h = I(), _ = I(!1), S = I(!0), g = /* @__PURE__ */ et(r, "modelValue", n, {
      defaultValue: r.defaultValue ?? (l.value ? [] : void 0),
      passive: r.modelValue === void 0,
      deep: !0
    });
    function b(Y) {
      if (_.value = !0, r.multiple) {
        const te = Array.isArray(g.value) ? [...g.value] : [], le = te.findIndex((me) => Sn(me, Y, r.by));
        r.selectionBehavior === "toggle" ? (le === -1 ? te.push(Y) : te.splice(le, 1), g.value = te) : (g.value = [Y], h.value = Y);
      } else
        r.selectionBehavior === "toggle" && Sn(g.value, Y, r.by) ? g.value = void 0 : g.value = Y;
      setTimeout(() => {
        _.value = !1;
      }, 1);
    }
    const A = I(null), T = I(null), E = I(!1), M = I(!1), $ = /* @__PURE__ */ _n(), L = /* @__PURE__ */ _n(), k = /* @__PURE__ */ _n();
    function N() {
      return p().map((Y) => Y.ref).filter((Y) => Y.dataset.disabled !== "");
    }
    function U(Y, te = !0) {
      if (!Y)
        return;
      A.value = Y, S.value && A.value.focus(), te && A.value.scrollIntoView({ block: "nearest" });
      const le = p().find((me) => me.ref === Y);
      n("highlight", le);
    }
    function oe(Y) {
      if (E.value)
        k.trigger(Y);
      else {
        const te = p().find((le) => Sn(le.value, Y, r.by));
        te && (A.value = te.ref, U(te.ref));
      }
    }
    function ne(Y) {
      A.value && A.value.isConnected && (Y.preventDefault(), Y.stopPropagation(), M.value || A.value.click());
    }
    function se(Y) {
      if (S.value) {
        if (_.value = !0, E.value)
          L.trigger(Y);
        else {
          const te = Y.altKey || Y.ctrlKey || Y.metaKey;
          if (te && Y.key === "a" && l.value) {
            const le = p(), me = le.map((Re) => Re.value);
            g.value = [...me], Y.preventDefault(), U(le[le.length - 1].ref);
          } else if (!te) {
            const le = f(Y.key, p());
            le && U(le);
          }
        }
        setTimeout(() => {
          _.value = !1;
        }, 1);
      }
    }
    function D() {
      M.value = !0;
    }
    function Z() {
      ge(() => {
        M.value = !1;
      });
    }
    function G() {
      ge(() => {
        const Y = new KeyboardEvent("keydown", { key: "PageUp" });
        ye(Y);
      });
    }
    function fe(Y) {
      const te = A.value;
      te != null && te.isConnected && (T.value = te), A.value = null, n("leave", Y);
    }
    function re(Y) {
      var le, me;
      const te = new CustomEvent("listbox.entryFocus", {
        bubbles: !1,
        cancelable: !0
      });
      if ((le = Y.currentTarget) == null || le.dispatchEvent(te), n("entryFocus", te), !te.defaultPrevented)
        if (T.value)
          U(T.value);
        else {
          const Re = (me = N()) == null ? void 0 : me[0];
          U(Re);
        }
    }
    function ye(Y) {
      const te = Tu(Y, i.value, x.value);
      if (!te)
        return;
      let le = N();
      if (A.value) {
        if (te === "last")
          le.reverse();
        else if (te === "prev" || te === "next") {
          te === "prev" && le.reverse();
          const me = le.indexOf(A.value);
          le = le.slice(me + 1);
        }
        ue(Y, le[0]);
      }
      if (le.length) {
        const me = !A.value && te === "prev" ? le.length - 1 : 0;
        U(le[me]);
      }
      if (E.value)
        return L.trigger(Y);
    }
    function ue(Y, te) {
      var me;
      if (!(E.value || r.selectionBehavior !== "replace" || !l.value || !Array.isArray(g.value) || (Y.altKey || Y.ctrlKey || Y.metaKey) && !Y.shiftKey) && Y.shiftKey) {
        const Re = p().filter((rt) => rt.ref.dataset.disabled !== "");
        let Je = (me = Re.find((rt) => rt.ref === te)) == null ? void 0 : me.value;
        if (Y.key === m.END ? Je = Re[Re.length - 1].value : Y.key === m.HOME && (Je = Re[0].value), !Je || !h.value)
          return;
        const We = Ss(Re.map((rt) => rt.value), h.value, Je);
        g.value = We;
      }
    }
    async function ht(Y) {
      if (await ge(), E.value)
        $.trigger(Y);
      else {
        const te = N(), le = te.find((me) => me.dataset.state === "checked");
        le ? U(le) : te.length && U(te[0]);
      }
    }
    return pe(g, () => {
      _.value || ge(() => {
        ht();
      });
    }, {
      immediate: !0,
      deep: !0
    }), o({
      highlightedElement: A,
      highlightItem: oe,
      highlightFirstItem: G,
      highlightSelected: ht,
      getItems: p
    }), tc({
      modelValue: g,
      onValueChange: b,
      multiple: l,
      orientation: i,
      dir: x,
      disabled: s,
      highlightOnHover: a,
      highlightedElement: A,
      isVirtual: E,
      virtualFocusHook: $,
      virtualKeydownHook: L,
      virtualHighlightHook: k,
      by: r.by,
      firstValue: h,
      selectionBehavior: c,
      focusable: S,
      onLeave: fe,
      onEnter: re,
      changeHighlight: U,
      onKeydownEnter: ne,
      onKeydownNavigation: ye,
      onKeydownTypeAhead: se,
      onCompositionStart: D,
      onCompositionEnd: Z,
      highlightFirstItem: G
    }), (Y, te) => (C(), B(u(ve), {
      ref_key: "primitiveElement",
      ref: v,
      as: Y.as,
      "as-child": Y.asChild,
      dir: u(x),
      "data-disabled": u(s) ? "" : void 0,
      onPointerleave: fe,
      onFocusout: te[0] || (te[0] = async (le) => {
        const me = le.relatedTarget || le.target;
        await ge(), A.value && u(y) && !u(y).contains(me) && fe(le);
      })
    }, {
      default: q(() => [F(Y.$slots, "default", { modelValue: u(g) }), u(w) && Y.name ? (C(), B(u(wa), {
        key: 0,
        name: Y.name,
        value: u(g),
        disabled: u(s),
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
}), oc = nc, rc = /* @__PURE__ */ V({
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
    const { CollectionSlot: o } = Ot(), t = bo(), r = vr(!1, 10);
    return (n, l) => (C(), B(u(o), null, {
      default: q(() => [K(u(ve), {
        role: "listbox",
        as: n.as,
        "as-child": n.asChild,
        tabindex: u(t).focusable.value ? u(t).highlightedElement.value ? "-1" : "0" : "-1",
        "aria-orientation": u(t).orientation.value,
        "aria-multiselectable": !!u(t).multiple.value,
        "data-orientation": u(t).orientation.value,
        onMousedown: l[0] || (l[0] = xe((a) => r.value = !0, ["left"])),
        onFocus: l[1] || (l[1] = (a) => {
          u(r) || u(t).onEnter(a);
        }),
        onKeydown: [
          l[2] || (l[2] = Pt((a) => {
            u(t).orientation.value === "vertical" && (a.key === "ArrowLeft" || a.key === "ArrowRight") || u(t).orientation.value === "horizontal" && (a.key === "ArrowUp" || a.key === "ArrowDown") || (a.preventDefault(), u(t).focusable.value && u(t).onKeydownNavigation(a));
          }, [
            "down",
            "up",
            "left",
            "right",
            "home",
            "end"
          ])),
          Pt(u(t).onKeydownEnter, ["enter"]),
          u(t).onKeydownTypeAhead
        ]
      }, {
        default: q(() => [F(n.$slots, "default")]),
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
}), lc = rc, ac = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, n = /* @__PURE__ */ et(t, "modelValue", o, {
      defaultValue: "",
      passive: t.modelValue === void 0
    }), l = bo(), { primitiveElement: a, currentElement: i } = Mt(), s = P(() => t.disabled || l.disabled.value || !1), c = I();
    return fi(() => {
      var d;
      return c.value = (d = l.highlightedElement.value) == null ? void 0 : d.id;
    }), Se(() => {
      l.focusable.value = !1, setTimeout(() => {
        var d;
        t.autoFocus && ((d = i.value) == null || d.focus());
      }, 1);
    }), Xe(() => {
      l.focusable.value = !0;
    }), (d, p) => (C(), B(u(ve), {
      ref_key: "primitiveElement",
      ref: a,
      as: d.as,
      "as-child": d.asChild,
      value: u(n),
      disabled: s.value ? "" : void 0,
      "data-disabled": s.value ? "" : void 0,
      "aria-disabled": s.value ?? void 0,
      "aria-activedescendant": c.value,
      type: "text",
      onKeydown: [Pt(xe(u(l).onKeydownNavigation, ["prevent"]), [
        "down",
        "up",
        "home",
        "end"
      ]), Pt(u(l).onKeydownEnter, ["enter"])],
      onInput: p[0] || (p[0] = (f) => {
        n.value = f.target.value, u(l).highlightFirstItem();
      }),
      onCompositionstart: u(l).onCompositionStart,
      onCompositionend: u(l).onCompositionEnd
    }, {
      default: q(() => [F(d.$slots, "default", { modelValue: u(n) })]),
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
}), ic = ac;
const [Mm, sc] = ke("ListboxGroup");
var uc = /* @__PURE__ */ V({
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
    const o = e, t = yt(void 0, "reka-listbox-group");
    return sc({ id: t }), (r, n) => (C(), B(u(ve), ee({ role: "group" }, o, { "aria-labelledby": u(t) }), {
      default: q(() => [F(r.$slots, "default")]),
      _: 3
    }, 16, ["aria-labelledby"]));
  }
}), dc = uc;
const cc = "listbox.select", [pc, fc] = ke("ListboxItem");
var vc = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = yt(void 0, "reka-listbox-item"), { CollectionItem: l } = Ot(), { forwardRef: a, currentElement: i } = ce(), s = bo(), c = P(() => i.value === s.highlightedElement.value), d = P(() => ec(s.modelValue.value, t.value, s.by)), p = P(() => s.disabled.value || t.disabled);
    async function f(y) {
      r("select", y), !(y != null && y.defaultPrevented) && !p.value && y && (s.onValueChange(t.value), s.changeHighlight(i.value));
    }
    function v(y) {
      const m = {
        originalEvent: y,
        value: t.value
      };
      ao(cc, f, m);
    }
    return fc({ isSelected: d }), (y, m) => (C(), B(u(l), { value: y.value }, {
      default: q(() => [vi([c.value, d.value], () => K(u(ve), ee({ id: u(n) }, y.$attrs, {
        ref: u(a),
        role: "option",
        tabindex: u(s).focusable.value ? c.value ? "0" : "-1" : -1,
        "aria-selected": d.value,
        as: y.as,
        "as-child": y.asChild,
        disabled: p.value ? "" : void 0,
        "data-disabled": p.value ? "" : void 0,
        "data-highlighted": c.value ? "" : void 0,
        "data-state": d.value ? "checked" : "unchecked",
        onClick: v,
        onKeydown: Pt(xe(v, ["prevent"]), ["space"]),
        onPointermove: m[0] || (m[0] = () => {
          u(s).highlightedElement.value !== u(i) && u(s).highlightOnHover.value && !u(s).focusable.value && u(s).changeHighlight(u(i), !1);
        })
      }), {
        default: q(() => [F(y.$slots, "default")]),
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
}), yc = vc, mc = /* @__PURE__ */ V({
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
    const o = e;
    ce();
    const t = pc();
    return (r, n) => u(t).isSelected.value ? (C(), B(u(ve), ee({
      key: 0,
      "aria-hidden": "true"
    }, o), {
      default: q(() => [F(r.$slots, "default")]),
      _: 3
    }, 16)) : J("v-if", !0);
  }
}), hc = mc;
const [Lt, gc] = ke("ComboboxRoot");
var bc = /* @__PURE__ */ V({
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
  setup(e, { expose: o, emit: t }) {
    var oe, ne, se;
    const r = e, n = t, { primitiveElement: l, currentElement: a } = Mt(), { multiple: i, disabled: s, ignoreFilter: c, resetSearchTermOnSelect: d, openOnFocus: p, openOnClick: f, dir: v, resetModelValueOnClear: y, highlightOnHover: m } = Ue(r), x = hr(v), w = /* @__PURE__ */ et(r, "modelValue", n, {
      defaultValue: r.defaultValue ?? (i.value ? [] : void 0),
      passive: r.modelValue === void 0,
      deep: !0
    }), h = /* @__PURE__ */ et(r, "open", n, {
      defaultValue: r.defaultOpen,
      passive: r.open === void 0
    });
    async function _(D) {
      var Z, G;
      h.value = D, k.value = "", D ? (await ge(), (Z = l.value) == null || Z.highlightSelected(), g.value = !0, (G = A.value) == null || G.focus()) : (g.value = !1, setTimeout(() => {
        !D && r.resetSearchTermOnBlur && S.trigger();
      }, 1));
    }
    const S = /* @__PURE__ */ _n(), g = I(!1), b = I(!1), A = I(), T = I(), E = P(() => {
      var D;
      return ((D = l.value) == null ? void 0 : D.highlightedElement) ?? void 0;
    }), M = I(/* @__PURE__ */ new Map()), $ = I(/* @__PURE__ */ new Map()), { contains: L } = Gs({ sensitivity: "base" }), k = I(""), N = P((D) => {
      if (!k.value || r.ignoreFilter || b.value)
        return {
          count: M.value.size,
          items: (D == null ? void 0 : D.items) ?? /* @__PURE__ */ new Map(),
          groups: (D == null ? void 0 : D.groups) ?? new Set($.value.keys())
        };
      let Z = 0;
      const G = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Set();
      for (const [re, ye] of M.value) {
        const ue = L(ye, k.value);
        G.set(re, ue ? 1 : 0), ue && Z++;
      }
      for (const [re, ye] of $.value)
        for (const ue of ye)
          if (G.get(ue) > 0) {
            fe.add(re);
            break;
          }
      return {
        count: Z,
        items: G,
        groups: fe
      };
    }), U = Dt();
    return Se(() => {
      var D, Z, G;
      U != null && U.exposed && (U.exposed.highlightItem = (D = l.value) == null ? void 0 : D.highlightItem, U.exposed.highlightFirstItem = (Z = l.value) == null ? void 0 : Z.highlightFirstItem, U.exposed.highlightSelected = (G = l.value) == null ? void 0 : G.highlightSelected);
    }), o({
      filtered: N,
      highlightedElement: E,
      highlightItem: (oe = l.value) == null ? void 0 : oe.highlightItem,
      highlightFirstItem: (ne = l.value) == null ? void 0 : ne.highlightFirstItem,
      highlightSelected: (se = l.value) == null ? void 0 : se.highlightSelected
    }), gc({
      modelValue: w,
      multiple: i,
      disabled: s,
      open: h,
      onOpenChange: _,
      contentId: "",
      isUserInputted: g,
      isVirtual: b,
      inputElement: A,
      highlightedElement: E,
      onInputElementChange: (D) => A.value = D,
      triggerElement: T,
      onTriggerElementChange: (D) => T.value = D,
      parentElement: a,
      resetSearchTermOnSelect: d,
      onResetSearchTerm: S.on,
      allItems: M,
      allGroups: $,
      filterSearch: k,
      filterState: N,
      ignoreFilter: c,
      openOnFocus: p,
      openOnClick: f,
      resetModelValueOnClear: y
    }), (D, Z) => (C(), B(u(po), null, {
      default: q(() => [K(u(oc), ee({
        ref_key: "primitiveElement",
        ref: l
      }, D.$attrs, {
        modelValue: u(w),
        "onUpdate:modelValue": Z[0] || (Z[0] = (G) => wn(w) ? w.value = G : null),
        style: { pointerEvents: u(h) ? "auto" : void 0 },
        as: D.as,
        "as-child": D.asChild,
        dir: u(x),
        multiple: u(i),
        name: D.name,
        required: D.required,
        disabled: u(s),
        "highlight-on-hover": u(m),
        by: r.by,
        onHighlight: Z[1] || (Z[1] = (G) => n("highlight", G))
      }), {
        default: q(() => [F(D.$slots, "default", {
          open: u(h),
          modelValue: u(w)
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
}), xc = bc;
const [Im, wc] = ke("ComboboxContent");
var _c = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, { position: n } = Ue(t), l = Lt(), { forwardRef: a, currentElement: i } = ce();
    mr(t.bodyLock), gr(), xr(l.parentElement);
    const s = P(() => t.position === "popper" ? t : {}), c = dn(s.value), d = {
      boxSizing: "border-box",
      "--reka-combobox-content-transform-origin": "var(--reka-popper-transform-origin)",
      "--reka-combobox-content-available-width": "var(--reka-popper-available-width)",
      "--reka-combobox-content-available-height": "var(--reka-popper-available-height)",
      "--reka-combobox-trigger-width": "var(--reka-popper-anchor-width)",
      "--reka-combobox-trigger-height": "var(--reka-popper-anchor-height)"
    };
    wc({ position: n });
    const p = I(!1);
    return Se(() => {
      l.inputElement.value && (p.value = i.value.contains(l.inputElement.value), p.value && l.inputElement.value.focus());
    }), Xe(() => {
      var v;
      const f = Ge();
      p.value && (!f || f === document.body) && ((v = l.triggerElement.value) == null || v.focus());
    }), (f, v) => (C(), B(u(lc), { "as-child": "" }, {
      default: q(() => [K(u(_r), {
        "as-child": "",
        onMountAutoFocus: v[5] || (v[5] = xe(() => {
        }, ["prevent"])),
        onUnmountAutoFocus: v[6] || (v[6] = xe(() => {
        }, ["prevent"]))
      }, {
        default: q(() => [K(u(so), {
          "as-child": "",
          "disable-outside-pointer-events": f.disableOutsidePointerEvents,
          onDismiss: v[0] || (v[0] = (y) => u(l).onOpenChange(!1)),
          onFocusOutside: v[1] || (v[1] = (y) => {
            var m;
            (m = u(l).parentElement.value) != null && m.contains(y.target) && y.preventDefault(), r("focusOutside", y);
          }),
          onInteractOutside: v[2] || (v[2] = (y) => r("interactOutside", y)),
          onEscapeKeyDown: v[3] || (v[3] = (y) => r("escapeKeyDown", y)),
          onPointerDownOutside: v[4] || (v[4] = (y) => {
            var m;
            (m = u(l).parentElement.value) != null && m.contains(y.target) && y.preventDefault(), r("pointerDownOutside", y);
          })
        }, {
          default: q(() => [(C(), B(dt(u(n) === "popper" ? u(go) : u(ve)), ee({
            ...f.$attrs,
            ...u(c)
          }, {
            id: u(l).contentId,
            ref: u(a),
            "data-state": u(l).open.value ? "open" : "closed",
            style: {
              display: "flex",
              flexDirection: "column",
              outline: "none",
              ...u(n) === "popper" ? d : {}
            }
          }), {
            default: q(() => [F(f.$slots, "default")]),
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
}), Sc = _c, Cc = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const n = cn(e, o), { forwardRef: l } = ce(), a = Lt();
    return a.contentId || (a.contentId = yt(void 0, "reka-combobox-content")), (i, s) => (C(), B(u(Mn), { present: i.forceMount || u(a).open.value }, {
      default: q(() => [K(Sc, ee({
        ...u(n),
        ...i.$attrs
      }, { ref: u(l) }), {
        default: q(() => [F(i.$slots, "default")]),
        _: 3
      }, 16)]),
      _: 3
    }, 8, ["present"]));
  }
}), Ac = Cc, Oc = /* @__PURE__ */ V({
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
    const o = e, t = Lt(), r = P(() => t.ignoreFilter.value ? t.allItems.value.size === 0 : t.filterState.value.count === 0);
    return (n, l) => r.value ? (C(), B(u(ve), Ie(ee({ key: 0 }, o)), {
      default: q(() => [F(n.$slots, "default", {}, () => [l[0] || (l[0] = _e("No options"))])]),
      _: 3
    }, 16)) : J("v-if", !0);
  }
}), Ec = Oc;
const [Ia, kc] = ke("ComboboxGroup");
var Tc = /* @__PURE__ */ V({
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
    const o = e, t = yt(void 0, "reka-combobox-group"), r = Lt(), n = P(() => r.ignoreFilter.value ? !0 : r.filterSearch.value ? r.filterState.value.groups.has(t) : !0), l = kc({
      id: t,
      labelId: ""
    });
    return Se(() => {
      r.allGroups.value.has(t) || r.allGroups.value.set(t, /* @__PURE__ */ new Set());
    }), Xe(() => {
      r.allGroups.value.delete(t);
    }), (a, i) => (C(), B(u(dc), ee({
      id: u(t),
      "aria-labelledby": u(l).labelId
    }, o, { hidden: n.value ? void 0 : !0 }), {
      default: q(() => [F(a.$slots, "default")]),
      _: 3
    }, 16, [
      "id",
      "aria-labelledby",
      "hidden"
    ]));
  }
}), jc = Tc, Pc = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = Lt(), l = bo(), { primitiveElement: a, currentElement: i } = Mt(), s = /* @__PURE__ */ et(t, "modelValue", r, { passive: t.modelValue === void 0 });
    Se(() => {
      i.value && n.onInputElementChange(i.value);
    });
    function c(y) {
      n.open.value || n.onOpenChange(!0);
    }
    function d(y) {
      const m = y.target;
      n.open.value ? n.filterSearch.value = m.value : (n.onOpenChange(!0), ge(() => {
        m.value && (n.filterSearch.value = m.value, l.highlightFirstItem());
      }));
    }
    function p() {
      n.openOnFocus.value && !n.open.value && n.onOpenChange(!0);
    }
    function f() {
      n.openOnClick.value && !n.open.value && n.onOpenChange(!0);
    }
    function v() {
      const y = n.modelValue.value;
      t.displayValue ? s.value = t.displayValue(y) : !n.multiple.value && y && !Array.isArray(y) && typeof y != "object" ? s.value = y.toString() : s.value = "", ge(() => {
        s.value = s.value;
      });
    }
    return n.onResetSearchTerm(() => {
      v();
    }), pe(n.modelValue, async () => {
      !n.isUserInputted.value && n.resetSearchTermOnSelect.value && v();
    }, {
      immediate: !0,
      deep: !0
    }), pe(n.filterState, (y, m) => {
      !n.isVirtual.value && m.count === 0 && l.highlightFirstItem();
    }), (y, m) => (C(), B(u(ic), {
      ref_key: "primitiveElement",
      ref: a,
      modelValue: u(s),
      "onUpdate:modelValue": m[0] || (m[0] = (x) => wn(s) ? s.value = x : null),
      as: y.as,
      "as-child": y.asChild,
      "auto-focus": y.autoFocus,
      disabled: y.disabled,
      "aria-expanded": u(n).open.value,
      "aria-controls": u(n).contentId,
      "aria-autocomplete": "list",
      role: "combobox",
      autocomplete: "off",
      onClick: f,
      onInput: d,
      onKeydown: Pt(xe(c, ["prevent"]), ["down", "up"]),
      onFocus: p
    }, {
      default: q(() => [F(y.$slots, "default")]),
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
}), Mc = Pc, Ic = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = yt(void 0, "reka-combobox-item"), l = Lt(), a = Ia(null), { primitiveElement: i, currentElement: s } = Mt();
    if (t.value === "")
      throw new Error("A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.");
    const c = P(() => {
      if (l.isVirtual.value || l.ignoreFilter.value || !l.filterSearch.value)
        return !0;
      {
        const d = l.filterState.value.items.get(n);
        return d === void 0 ? !0 : d > 0;
      }
    });
    return Se(() => {
      var p;
      l.allItems.value.set(n, t.textValue || s.value.textContent || s.value.innerText);
      const d = a == null ? void 0 : a.id;
      d && (l.allGroups.value.has(d) ? (p = l.allGroups.value.get(d)) == null || p.add(n) : l.allGroups.value.set(d, /* @__PURE__ */ new Set([n])));
    }), Xe(() => {
      l.allItems.value.delete(n);
    }), (d, p) => c.value ? (C(), B(u(yc), ee({ key: 0 }, t, {
      id: u(n),
      ref_key: "primitiveElement",
      ref: i,
      disabled: u(l).disabled.value || d.disabled,
      onSelect: p[0] || (p[0] = (f) => {
        r("select", f), !f.defaultPrevented && !u(l).multiple.value && !d.disabled && !u(l).disabled.value && (f.preventDefault(), u(l).onOpenChange(!1), u(l).modelValue.value = t.value);
      })
    }), {
      default: q(() => [F(d.$slots, "default", {}, () => [_e(H(d.value), 1)])]),
      _: 3
    }, 16, ["id", "disabled"])) : J("v-if", !0);
  }
}), jl = Ic, Rc = /* @__PURE__ */ V({
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
    const o = e;
    return (t, r) => (C(), B(u(hc), Ie(qe(o)), {
      default: q(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Pl = Rc, Dc = /* @__PURE__ */ V({
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
    const o = e;
    ce();
    const t = Ia({
      id: "",
      labelId: ""
    });
    return t.labelId || (t.labelId = yt(void 0, "reka-combobox-group-label")), (r, n) => (C(), B(u(ve), ee(o, { id: u(t).labelId }), {
      default: q(() => [F(r.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), Lc = Dc, $c = /* @__PURE__ */ V({
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
    const o = e;
    return (t, r) => (C(), B(u(uo), Ie(qe(o)), {
      default: q(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), qc = $c, Bc = /* @__PURE__ */ V({
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
    const o = e, { forwardRef: t, currentElement: r } = ce(), n = Lt(), l = P(() => o.disabled || n.disabled.value || !1);
    return Se(() => {
      r.value && n.onTriggerElementChange(r.value);
    }), (a, i) => (C(), B(u(ve), ee(o, {
      ref: u(t),
      type: a.as === "button" ? "button" : void 0,
      tabindex: "-1",
      "aria-label": "Show popup",
      "aria-haspopup": "listbox",
      "aria-expanded": u(n).open.value,
      "aria-controls": u(n).contentId,
      "data-state": u(n).open.value ? "open" : "closed",
      disabled: l.value,
      "data-disabled": l.value ? "" : void 0,
      "aria-disabled": l.value ?? void 0,
      onClick: i[0] || (i[0] = (s) => u(n).onOpenChange(!u(n).open.value))
    }), {
      default: q(() => [F(a.$slots, "default")]),
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
}), Fc = Bc;
function Ra(e) {
  const o = io({ nonce: I() });
  return P(() => {
    var t;
    return (e == null ? void 0 : e.value) || ((t = o.nonce) == null ? void 0 : t.value);
  });
}
var Nc = /* @__PURE__ */ V({
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
    const o = e, { forwardRef: t } = ce(), { nonce: r } = Ue(o), n = Ra(r), l = Lt();
    return (a, i) => (C(), z(be, null, [K(u(ve), ee({
      ...a.$attrs,
      ...o
    }, {
      ref: u(t),
      "data-reka-combobox-viewport": "",
      role: "presentation",
      style: {
        position: "relative",
        flex: u(l).isVirtual.value ? void 0 : 1,
        overflow: "auto"
      }
    }), {
      default: q(() => [F(a.$slots, "default")]),
      _: 3
    }, 16, ["style"]), K(u(ve), {
      as: "style",
      nonce: u(n)
    }, {
      default: q(() => i[0] || (i[0] = [_e(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-combobox-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-combobox-viewport]::-webkit-scrollbar { display: none; } ")])),
      _: 1,
      __: [0]
    }, 8, ["nonce"])], 64));
  }
}), Vc = Nc;
const [Rn, zc] = ke("PopoverRoot");
var Hc = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, { modal: n } = Ue(t), l = /* @__PURE__ */ et(t, "open", r, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    }), a = I(), i = I(!1);
    return zc({
      contentId: "",
      triggerId: "",
      modal: n,
      open: l,
      onOpenChange: (s) => {
        l.value = s;
      },
      onOpenToggle: () => {
        l.value = !l.value;
      },
      triggerElement: a,
      hasCustomAnchor: i
    }), (s, c) => (C(), B(u(po), null, {
      default: q(() => [F(s.$slots, "default", {
        open: u(l),
        close: () => l.value = !1
      })]),
      _: 3
    }));
  }
}), Uc = Hc, Wc = /* @__PURE__ */ V({
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
    const o = e;
    ce();
    const t = Rn();
    return yi(() => {
      t.hasCustomAnchor.value = !0;
    }), Xe(() => {
      t.hasCustomAnchor.value = !1;
    }), (r, n) => (C(), B(u(fo), Ie(qe(o)), {
      default: q(() => [F(r.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Kc = Wc, Gc = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = dn(Ds(t, "trapFocus", "disableOutsidePointerEvents")), { forwardRef: l } = ce(), a = Rn();
    return gr(), (i, s) => (C(), B(u(_r), {
      "as-child": "",
      loop: "",
      trapped: i.trapFocus,
      onMountAutoFocus: s[5] || (s[5] = (c) => r("openAutoFocus", c)),
      onUnmountAutoFocus: s[6] || (s[6] = (c) => r("closeAutoFocus", c))
    }, {
      default: q(() => [K(u(so), {
        "as-child": "",
        "disable-outside-pointer-events": i.disableOutsidePointerEvents,
        onPointerDownOutside: s[0] || (s[0] = (c) => r("pointerDownOutside", c)),
        onInteractOutside: s[1] || (s[1] = (c) => r("interactOutside", c)),
        onEscapeKeyDown: s[2] || (s[2] = (c) => r("escapeKeyDown", c)),
        onFocusOutside: s[3] || (s[3] = (c) => r("focusOutside", c)),
        onDismiss: s[4] || (s[4] = (c) => u(a).onOpenChange(!1))
      }, {
        default: q(() => [K(u(go), ee(u(n), {
          id: u(a).contentId,
          ref: u(l),
          "data-state": u(a).open.value ? "open" : "closed",
          "aria-labelledby": u(a).triggerId,
          style: {
            "--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
            "--reka-popover-content-available-width": "var(--reka-popper-available-width)",
            "--reka-popover-content-available-height": "var(--reka-popper-available-height)",
            "--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
            "--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
          },
          role: "dialog"
        }), {
          default: q(() => [F(i.$slots, "default")]),
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
}), Da = Gc, Yc = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = Rn(), l = I(!1);
    mr(!0);
    const a = cn(t, r), { forwardRef: i, currentElement: s } = ce();
    return xr(s), (c, d) => (C(), B(Da, ee(u(a), {
      ref: u(i),
      "trap-focus": u(n).open.value,
      "disable-outside-pointer-events": "",
      onCloseAutoFocus: d[0] || (d[0] = xe((p) => {
        var f;
        r("closeAutoFocus", p), l.value || (f = u(n).triggerElement.value) == null || f.focus();
      }, ["prevent"])),
      onPointerDownOutside: d[1] || (d[1] = (p) => {
        r("pointerDownOutside", p);
        const f = p.detail.originalEvent, v = f.button === 0 && f.ctrlKey === !0, y = f.button === 2 || v;
        l.value = y;
      }),
      onFocusOutside: d[2] || (d[2] = xe(() => {
      }, ["prevent"]))
    }), {
      default: q(() => [F(c.$slots, "default")]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Xc = Yc, Jc = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = Rn(), l = I(!1), a = I(!1), i = cn(t, r);
    return (s, c) => (C(), B(Da, ee(u(i), {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: c[0] || (c[0] = (d) => {
        var p;
        r("closeAutoFocus", d), d.defaultPrevented || (l.value || (p = u(n).triggerElement.value) == null || p.focus(), d.preventDefault()), l.value = !1, a.value = !1;
      }),
      onInteractOutside: c[1] || (c[1] = async (d) => {
        var v;
        r("interactOutside", d), d.defaultPrevented || (l.value = !0, d.detail.originalEvent.type === "pointerdown" && (a.value = !0));
        const p = d.target;
        ((v = u(n).triggerElement.value) == null ? void 0 : v.contains(p)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && a.value && d.preventDefault();
      })
    }), {
      default: q(() => [F(s.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Zc = Jc, Qc = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = Rn(), l = cn(t, r), { forwardRef: a } = ce();
    return n.contentId || (n.contentId = yt(void 0, "reka-popover-content")), (i, s) => (C(), B(u(Mn), { present: i.forceMount || u(n).open.value }, {
      default: q(() => [u(n).modal.value ? (C(), B(Xc, ee({ key: 0 }, u(l), { ref: u(a) }), {
        default: q(() => [F(i.$slots, "default")]),
        _: 3
      }, 16)) : (C(), B(Zc, ee({ key: 1 }, u(l), { ref: u(a) }), {
        default: q(() => [F(i.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), ep = Qc, tp = /* @__PURE__ */ V({
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
    const o = e;
    return (t, r) => (C(), B(u(uo), Ie(qe(o)), {
      default: q(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), np = tp;
const op = [
  " ",
  "Enter",
  "ArrowUp",
  "ArrowDown"
], rp = [" ", "Enter"], Ze = 10;
function En(e, o, t) {
  return e === void 0 ? !1 : Array.isArray(e) ? e.some((r) => nr(r, o, t)) : nr(e, o, t);
}
function nr(e, o, t) {
  return e === void 0 || o === void 0 ? !1 : typeof e == "string" ? e === o : typeof t == "function" ? t(e, o) : typeof t == "string" ? (e == null ? void 0 : e[t]) === (o == null ? void 0 : o[t]) : Qn(e, o);
}
function lp(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
const ap = {
  key: 0,
  value: ""
}, [$t, La] = ke("SelectRoot");
var ip = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, { required: n, disabled: l, multiple: a, dir: i } = Ue(t), s = /* @__PURE__ */ et(t, "modelValue", r, {
      defaultValue: t.defaultValue ?? (a.value ? [] : void 0),
      passive: t.modelValue === void 0,
      deep: !0
    }), c = /* @__PURE__ */ et(t, "open", r, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    }), d = I(), p = I(), f = I({
      x: 0,
      y: 0
    }), v = P(() => {
      var S;
      return a.value && Array.isArray(s.value) ? ((S = s.value) == null ? void 0 : S.length) === 0 : Go(s.value);
    });
    Ot({ isProvider: !0 });
    const y = hr(i), m = br(d), x = I(/* @__PURE__ */ new Set()), w = P(() => Array.from(x.value).map((S) => S.value).join(";"));
    function h(S) {
      if (a.value) {
        const g = Array.isArray(s.value) ? [...s.value] : [], b = g.findIndex((A) => nr(A, S, t.by));
        b === -1 ? g.push(S) : g.splice(b, 1), s.value = [...g];
      } else
        s.value = S;
    }
    function _(S) {
      return Array.from(x.value).find((g) => En(S, g.value, t.by));
    }
    return La({
      triggerElement: d,
      onTriggerChange: (S) => {
        d.value = S;
      },
      valueElement: p,
      onValueElementChange: (S) => {
        p.value = S;
      },
      contentId: "",
      modelValue: s,
      onValueChange: h,
      by: t.by,
      open: c,
      multiple: a,
      required: n,
      onOpenChange: (S) => {
        c.value = S;
      },
      dir: y,
      triggerPointerDownPosRef: f,
      disabled: l,
      isEmptyModelValue: v,
      optionsSet: x,
      onOptionAdd: (S) => {
        const g = _(S.value);
        g && x.value.delete(g), x.value.add(S);
      },
      onOptionRemove: (S) => {
        const g = _(S.value);
        g && x.value.delete(g);
      }
    }), (S, g) => (C(), B(u(po), null, {
      default: q(() => [F(S.$slots, "default", {
        modelValue: u(s),
        open: u(c)
      }), u(m) ? (C(), B(dp, {
        key: w.value,
        "aria-hidden": "true",
        tabindex: "-1",
        multiple: u(a),
        required: u(n),
        name: S.name,
        autocomplete: S.autocomplete,
        disabled: u(l),
        value: u(s)
      }, {
        default: q(() => [u(Go)(u(s)) ? (C(), z("option", ap)) : J("v-if", !0), (C(!0), z(be, null, pt(Array.from(x.value), (b) => (C(), z("option", ee({ key: b.value ?? "" }, { ref_for: !0 }, b), null, 16))), 128))]),
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
}), sp = ip, up = /* @__PURE__ */ V({
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
    const o = e, t = I(), r = $t();
    pe(() => o.value, (l, a) => {
      const i = window.HTMLSelectElement.prototype, c = Object.getOwnPropertyDescriptor(i, "value").set;
      if (l !== a && c && t.value) {
        const d = new Event("change", { bubbles: !0 });
        c.call(t.value, l), t.value.dispatchEvent(d);
      }
    });
    function n(l) {
      r.onValueChange(l.target.value);
    }
    return (l, a) => (C(), B(u(co), { "as-child": "" }, {
      default: q(() => [j("select", ee({
        ref_key: "selectElement",
        ref: t
      }, o, { onInput: n }), [F(l.$slots, "default")], 16)]),
      _: 3
    }));
  }
}), dp = up, cp = /* @__PURE__ */ V({
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
      default: Ze
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
    return (r, n) => (C(), B(u(go), ee(u(t), { style: {
      boxSizing: "border-box",
      "--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
      "--reka-select-content-available-width": "var(--reka-popper-available-width)",
      "--reka-select-content-available-height": "var(--reka-popper-available-height)",
      "--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
      "--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
    } }), {
      default: q(() => [F(r.$slots, "default")]),
      _: 3
    }, 16));
  }
}), pp = cp;
const fp = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
}, [xo, $a] = ke("SelectContent");
var vp = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = $t();
    gr(), mr(t.bodyLock);
    const { CollectionSlot: l, getItems: a } = Ot(), i = I();
    xr(i);
    const { search: s, handleTypeaheadSearch: c } = wr(), d = I(), p = I(), f = I(), v = I(!1), y = I(!1), m = I(!1);
    function x() {
      p.value && i.value && ml([p.value, i.value]);
    }
    pe(v, () => {
      x();
    });
    const { onOpenChange: w, triggerPointerDownPosRef: h } = n;
    Ae((b) => {
      if (!i.value)
        return;
      let A = {
        x: 0,
        y: 0
      };
      const T = (M) => {
        var $, L;
        A = {
          x: Math.abs(Math.round(M.pageX) - ((($ = h.value) == null ? void 0 : $.x) ?? 0)),
          y: Math.abs(Math.round(M.pageY) - (((L = h.value) == null ? void 0 : L.y) ?? 0))
        };
      }, E = (M) => {
        var $;
        M.pointerType !== "touch" && (A.x <= 10 && A.y <= 10 ? M.preventDefault() : ($ = i.value) != null && $.contains(M.target) || w(!1), document.removeEventListener("pointermove", T), h.value = null);
      };
      h.value !== null && (document.addEventListener("pointermove", T), document.addEventListener("pointerup", E, {
        capture: !0,
        once: !0
      })), b(() => {
        document.removeEventListener("pointermove", T), document.removeEventListener("pointerup", E, { capture: !0 });
      });
    });
    function _(b) {
      const A = b.ctrlKey || b.altKey || b.metaKey;
      if (b.key === "Tab" && b.preventDefault(), !A && b.key.length === 1 && c(b.key, a()), [
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End"
      ].includes(b.key)) {
        let E = [...a().map((M) => M.ref)];
        if (["ArrowUp", "End"].includes(b.key) && (E = E.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(b.key)) {
          const M = b.target, $ = E.indexOf(M);
          E = E.slice($ + 1);
        }
        setTimeout(() => ml(E)), b.preventDefault();
      }
    }
    const S = P(() => t.position === "popper" ? t : {}), g = dn(S.value);
    return $a({
      content: i,
      viewport: d,
      onViewportChange: (b) => {
        d.value = b;
      },
      itemRefCallback: (b, A, T) => {
        const E = !y.value && !T, M = En(n.modelValue.value, A, n.by);
        if (n.multiple.value) {
          if (m.value)
            return;
          (M || E) && (p.value = b, M && (m.value = !0));
        } else
          (M || E) && (p.value = b);
        E && (y.value = !0);
      },
      selectedItem: p,
      selectedItemText: f,
      onItemLeave: () => {
        var b;
        (b = i.value) == null || b.focus();
      },
      itemTextRefCallback: (b, A, T) => {
        const E = !y.value && !T;
        (En(n.modelValue.value, A, n.by) || E) && (f.value = b);
      },
      focusSelectedItem: x,
      position: t.position,
      isPositioned: v,
      searchRef: s
    }), (b, A) => (C(), B(u(l), null, {
      default: q(() => [K(u(_r), {
        "as-child": "",
        onMountAutoFocus: A[6] || (A[6] = xe(() => {
        }, ["prevent"])),
        onUnmountAutoFocus: A[7] || (A[7] = (T) => {
          var E;
          r("closeAutoFocus", T), !T.defaultPrevented && ((E = u(n).triggerElement.value) == null || E.focus({ preventScroll: !0 }), T.preventDefault());
        })
      }, {
        default: q(() => [K(u(so), {
          "as-child": "",
          "disable-outside-pointer-events": b.disableOutsidePointerEvents,
          onFocusOutside: A[2] || (A[2] = xe(() => {
          }, ["prevent"])),
          onDismiss: A[3] || (A[3] = (T) => u(n).onOpenChange(!1)),
          onEscapeKeyDown: A[4] || (A[4] = (T) => r("escapeKeyDown", T)),
          onPointerDownOutside: A[5] || (A[5] = (T) => r("pointerDownOutside", T))
        }, {
          default: q(() => [(C(), B(dt(b.position === "popper" ? pp : bp), ee({
            ...b.$attrs,
            ...u(g)
          }, {
            id: u(n).contentId,
            ref: (T) => {
              const E = u(ft)(T);
              E != null && E.hasAttribute("data-reka-popper-content-wrapper") ? i.value = E.firstElementChild : i.value = E;
            },
            role: "listbox",
            "data-state": u(n).open.value ? "open" : "closed",
            dir: u(n).dir.value,
            style: {
              display: "flex",
              flexDirection: "column",
              outline: "none"
            },
            onContextmenu: A[0] || (A[0] = xe(() => {
            }, ["prevent"])),
            onPlaced: A[1] || (A[1] = (T) => v.value = !0),
            onKeydown: _
          }), {
            default: q(() => [F(b.$slots, "default")]),
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
}), yp = vp;
const [mp, hp] = ke("SelectItemAlignedPosition");
var gp = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, { getItems: n } = Ot(), l = $t(), a = xo(), i = I(!1), s = I(!0), c = I(), { forwardRef: d, currentElement: p } = ce(), { viewport: f, selectedItem: v, selectedItemText: y, focusSelectedItem: m } = a;
    function x() {
      if (l.triggerElement.value && l.valueElement.value && c.value && p.value && (f != null && f.value) && (v != null && v.value) && (y != null && y.value)) {
        const _ = l.triggerElement.value.getBoundingClientRect(), S = p.value.getBoundingClientRect(), g = l.valueElement.value.getBoundingClientRect(), b = y.value.getBoundingClientRect();
        if (l.dir.value !== "rtl") {
          const Y = b.left - S.left, te = g.left - Y, le = _.left - te, me = _.width + le, Re = Math.max(me, S.width), Je = window.innerWidth - Ze, We = dl(te, Ze, Math.max(Ze, Je - Re));
          c.value.style.minWidth = `${me}px`, c.value.style.left = `${We}px`;
        } else {
          const Y = S.right - b.right, te = window.innerWidth - g.right - Y, le = window.innerWidth - _.right - te, me = _.width + le, Re = Math.max(me, S.width), Je = window.innerWidth - Ze, We = dl(te, Ze, Math.max(Ze, Je - Re));
          c.value.style.minWidth = `${me}px`, c.value.style.right = `${We}px`;
        }
        const A = n().map((Y) => Y.ref), T = window.innerHeight - Ze * 2, E = f.value.scrollHeight, M = window.getComputedStyle(p.value), $ = Number.parseInt(M.borderTopWidth, 10), L = Number.parseInt(M.paddingTop, 10), k = Number.parseInt(M.borderBottomWidth, 10), N = Number.parseInt(M.paddingBottom, 10), U = $ + L + E + N + k, oe = Math.min(v.value.offsetHeight * 5, U), ne = window.getComputedStyle(f.value), se = Number.parseInt(ne.paddingTop, 10), D = Number.parseInt(ne.paddingBottom, 10), Z = _.top + _.height / 2 - Ze, G = T - Z, fe = v.value.offsetHeight / 2, re = v.value.offsetTop + fe, ye = $ + L + re, ue = U - ye;
        if (ye <= Z) {
          const Y = v.value === A[A.length - 1];
          c.value.style.bottom = "0px";
          const te = p.value.clientHeight - f.value.offsetTop - f.value.offsetHeight, le = Math.max(G, fe + (Y ? D : 0) + te + k), me = ye + le;
          c.value.style.height = `${me}px`;
        } else {
          const Y = v.value === A[0];
          c.value.style.top = "0px";
          const le = Math.max(Z, $ + f.value.offsetTop + (Y ? se : 0) + fe) + ue;
          c.value.style.height = `${le}px`, f.value.scrollTop = ye - Z + f.value.offsetTop;
        }
        c.value.style.margin = `${Ze}px 0`, c.value.style.minHeight = `${oe}px`, c.value.style.maxHeight = `${T}px`, r("placed"), requestAnimationFrame(() => i.value = !0);
      }
    }
    const w = I("");
    Se(async () => {
      await ge(), x(), p.value && (w.value = window.getComputedStyle(p.value).zIndex);
    });
    function h(_) {
      _ && s.value === !0 && (x(), m == null || m(), s.value = !1);
    }
    return Vs(l.triggerElement, () => {
      x();
    }), hp({
      contentWrapper: c,
      shouldExpandOnScrollRef: i,
      onScrollButtonChange: h
    }), (_, S) => (C(), z("div", {
      ref_key: "contentWrapperElement",
      ref: c,
      style: St({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: w.value
      })
    }, [K(u(ve), ee({
      ref: u(d),
      style: {
        boxSizing: "border-box",
        maxHeight: "100%"
      }
    }, {
      ..._.$attrs,
      ...t
    }), {
      default: q(() => [F(_.$slots, "default")]),
      _: 3
    }, 16)], 4));
  }
}), bp = gp, xp = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "SelectProvider",
  props: { context: {
    type: Object,
    required: !0
  } },
  setup(e) {
    return La(e.context), $a(fp), (t, r) => F(t.$slots, "default");
  }
}), wp = xp;
const _p = { key: 1 };
var Sp = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, n = cn(t, o), l = $t(), a = I();
    Se(() => {
      a.value = new DocumentFragment();
    });
    const i = I(), s = P(() => t.forceMount || l.open.value), c = I(s.value);
    return pe(s, () => {
      setTimeout(() => c.value = s.value);
    }), (d, p) => {
      var f;
      return s.value || c.value || (f = i.value) != null && f.present ? (C(), B(u(Mn), {
        key: 0,
        ref_key: "presenceRef",
        ref: i,
        present: s.value
      }, {
        default: q(() => [K(yp, Ie(qe({
          ...u(n),
          ...d.$attrs
        })), {
          default: q(() => [F(d.$slots, "default")]),
          _: 3
        }, 16)]),
        _: 3
      }, 8, ["present"])) : a.value ? (C(), z("div", _p, [(C(), B(dr, { to: a.value }, [K(wp, { context: u(l) }, {
        default: q(() => [F(d.$slots, "default")]),
        _: 3
      }, 8, ["context"])], 8, ["to"]))])) : J("v-if", !0);
    };
  }
}), Cp = Sp;
const [qa, Ap] = ke("SelectItem");
var Op = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, { disabled: n } = Ue(t), l = $t(), a = xo(), { forwardRef: i, currentElement: s } = ce(), { CollectionItem: c } = Ot(), d = P(() => {
      var S;
      return En((S = l.modelValue) == null ? void 0 : S.value, t.value, l.by);
    }), p = I(!1), f = I(t.textValue ?? ""), v = yt(void 0, "reka-select-item-text"), y = "select.select";
    async function m(S) {
      if (S.defaultPrevented)
        return;
      const g = {
        originalEvent: S,
        value: t.value
      };
      ao(y, x, g);
    }
    async function x(S) {
      await ge(), r("select", S), !S.defaultPrevented && (n.value || (l.onValueChange(t.value), l.multiple.value || l.onOpenChange(!1)));
    }
    async function w(S) {
      var g, b;
      await ge(), !S.defaultPrevented && (n.value ? (g = a.onItemLeave) == null || g.call(a) : (b = S.currentTarget) == null || b.focus({ preventScroll: !0 }));
    }
    async function h(S) {
      var g;
      await ge(), !S.defaultPrevented && S.currentTarget === Ge() && ((g = a.onItemLeave) == null || g.call(a));
    }
    async function _(S) {
      var b;
      await ge(), !(S.defaultPrevented || ((b = a.searchRef) == null ? void 0 : b.value) !== "" && S.key === " ") && (rp.includes(S.key) && m(S), S.key === " " && S.preventDefault());
    }
    if (t.value === "")
      throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
    return Se(() => {
      s.value && a.itemRefCallback(s.value, t.value, t.disabled);
    }), Ap({
      value: t.value,
      disabled: n,
      textId: v,
      isSelected: d,
      onItemTextChange: (S) => {
        f.value = ((f.value || (S == null ? void 0 : S.textContent)) ?? "").trim();
      }
    }), (S, g) => (C(), B(u(c), { value: { textValue: f.value } }, {
      default: q(() => [K(u(ve), {
        ref: u(i),
        role: "option",
        "aria-labelledby": u(v),
        "data-highlighted": p.value ? "" : void 0,
        "aria-selected": d.value,
        "data-state": d.value ? "checked" : "unchecked",
        "aria-disabled": u(n) || void 0,
        "data-disabled": u(n) ? "" : void 0,
        tabindex: u(n) ? void 0 : -1,
        as: S.as,
        "as-child": S.asChild,
        onFocus: g[0] || (g[0] = (b) => p.value = !0),
        onBlur: g[1] || (g[1] = (b) => p.value = !1),
        onPointerup: m,
        onPointerdown: g[2] || (g[2] = (b) => {
          b.currentTarget.focus({ preventScroll: !0 });
        }),
        onTouchend: g[3] || (g[3] = xe(() => {
        }, ["prevent", "stop"])),
        onPointermove: w,
        onPointerleave: h,
        onKeydown: _
      }, {
        default: q(() => [F(S.$slots, "default")]),
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
}), Ep = Op, kp = /* @__PURE__ */ V({
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
    const o = e, t = qa();
    return (r, n) => u(t).isSelected.value ? (C(), B(u(ve), ee({
      key: 0,
      "aria-hidden": "true"
    }, o), {
      default: q(() => [F(r.$slots, "default")]),
      _: 3
    }, 16)) : J("v-if", !0);
  }
}), Tp = kp, jp = /* @__PURE__ */ V({
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
    const o = e, t = $t(), r = xo(), n = qa(), { forwardRef: l, currentElement: a } = ce(), i = P(() => {
      var s, c;
      return {
        value: n.value,
        disabled: n.disabled.value,
        textContent: ((s = a.value) == null ? void 0 : s.textContent) ?? ((c = n.value) == null ? void 0 : c.toString()) ?? ""
      };
    });
    return Se(() => {
      a.value && (n.onItemTextChange(a.value), r.itemTextRefCallback(a.value, n.value, n.disabled.value), t.onOptionAdd(i.value));
    }), Xe(() => {
      t.onOptionRemove(i.value);
    }), (s, c) => (C(), B(u(ve), ee({
      id: u(n).textId,
      ref: u(l)
    }, {
      ...o,
      ...s.$attrs
    }), {
      default: q(() => [F(s.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), Pp = jp, Mp = /* @__PURE__ */ V({
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
    const o = e;
    return (t, r) => (C(), B(u(uo), Ie(qe(o)), {
      default: q(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Ip = Mp, Rp = /* @__PURE__ */ V({
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
    const o = e, t = $t(), { forwardRef: r, currentElement: n } = ce(), l = P(() => {
      var f;
      return ((f = t.disabled) == null ? void 0 : f.value) || o.disabled;
    });
    t.contentId || (t.contentId = yt(void 0, "reka-select-content")), Se(() => {
      t.onTriggerChange(n.value);
    });
    const { getItems: a } = Ot(), { search: i, handleTypeaheadSearch: s, resetTypeahead: c } = wr();
    function d() {
      l.value || (t.onOpenChange(!0), c());
    }
    function p(f) {
      d(), t.triggerPointerDownPosRef.value = {
        x: Math.round(f.pageX),
        y: Math.round(f.pageY)
      };
    }
    return (f, v) => (C(), B(u(fo), {
      "as-child": "",
      reference: f.reference
    }, {
      default: q(() => {
        var y, m, x, w;
        return [K(u(ve), {
          ref: u(r),
          role: "combobox",
          type: f.as === "button" ? "button" : void 0,
          "aria-controls": u(t).contentId,
          "aria-expanded": u(t).open.value || !1,
          "aria-required": (y = u(t).required) == null ? void 0 : y.value,
          "aria-autocomplete": "none",
          disabled: l.value,
          dir: (m = u(t)) == null ? void 0 : m.dir.value,
          "data-state": (x = u(t)) != null && x.open.value ? "open" : "closed",
          "data-disabled": l.value ? "" : void 0,
          "data-placeholder": u(lp)((w = u(t).modelValue) == null ? void 0 : w.value) ? "" : void 0,
          "as-child": f.asChild,
          as: f.as,
          onClick: v[0] || (v[0] = (h) => {
            var _;
            (_ = h == null ? void 0 : h.currentTarget) == null || _.focus();
          }),
          onPointerdown: v[1] || (v[1] = (h) => {
            if (h.pointerType === "touch")
              return h.preventDefault();
            const _ = h.target;
            _.hasPointerCapture(h.pointerId) && _.releasePointerCapture(h.pointerId), h.button === 0 && h.ctrlKey === !1 && (p(h), h.preventDefault());
          }),
          onPointerup: v[2] || (v[2] = xe((h) => {
            h.pointerType === "touch" && p(h);
          }, ["prevent"])),
          onKeydown: v[3] || (v[3] = (h) => {
            const _ = u(i) !== "";
            !(h.ctrlKey || h.altKey || h.metaKey) && h.key.length === 1 && _ && h.key === " " || (u(s)(h.key, u(a)()), u(op).includes(h.key) && (d(), h.preventDefault()));
          })
        }, {
          default: q(() => [F(f.$slots, "default")]),
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
}), Dp = Rp, Lp = /* @__PURE__ */ V({
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
    const o = e, { forwardRef: t, currentElement: r } = ce(), n = $t();
    Se(() => {
      n.valueElement = r;
    });
    const l = P(() => {
      var d;
      let i = [];
      const s = Array.from(n.optionsSet.value), c = (p) => s.find((f) => En(p, f.value, n.by));
      return Array.isArray(n.modelValue.value) ? i = n.modelValue.value.map((p) => {
        var f;
        return ((f = c(p)) == null ? void 0 : f.textContent) ?? "";
      }) : i = [((d = c(n.modelValue.value)) == null ? void 0 : d.textContent) ?? ""], i.filter(Boolean);
    }), a = P(() => l.value.length ? l.value.join(", ") : o.placeholder);
    return (i, s) => (C(), B(u(ve), {
      ref: u(t),
      as: i.as,
      "as-child": i.asChild,
      style: { pointerEvents: "none" },
      "data-placeholder": l.value.length ? void 0 : o.placeholder
    }, {
      default: q(() => [F(i.$slots, "default", {
        selectedLabel: l.value,
        modelValue: u(n).modelValue.value
      }, () => [_e(H(a.value), 1)])]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-placeholder"
    ]));
  }
}), $p = Lp, qp = /* @__PURE__ */ V({
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
    const o = e, { nonce: t } = Ue(o), r = Ra(t), n = xo(), l = n.position === "item-aligned" ? mp() : void 0, { forwardRef: a, currentElement: i } = ce();
    Se(() => {
      n == null || n.onViewportChange(i.value);
    });
    const s = I(0);
    function c(d) {
      const p = d.currentTarget, { shouldExpandOnScrollRef: f, contentWrapper: v } = l ?? {};
      if (f != null && f.value && (v != null && v.value)) {
        const y = Math.abs(s.value - p.scrollTop);
        if (y > 0) {
          const m = window.innerHeight - Ze * 2, x = Number.parseFloat(v.value.style.minHeight), w = Number.parseFloat(v.value.style.height), h = Math.max(x, w);
          if (h < m) {
            const _ = h + y, S = Math.min(m, _), g = _ - S;
            v.value.style.height = `${S}px`, v.value.style.bottom === "0px" && (p.scrollTop = g > 0 ? g : 0, v.value.style.justifyContent = "flex-end");
          }
        }
      }
      s.value = p.scrollTop;
    }
    return (d, p) => (C(), z(be, null, [K(u(ve), ee({
      ref: u(a),
      "data-reka-select-viewport": "",
      role: "presentation"
    }, {
      ...d.$attrs,
      ...o
    }, {
      style: {
        position: "relative",
        flex: 1,
        overflow: "hidden auto"
      },
      onScroll: c
    }), {
      default: q(() => [F(d.$slots, "default")]),
      _: 3
    }, 16), K(u(ve), {
      as: "style",
      nonce: u(r)
    }, {
      default: q(() => p[0] || (p[0] = [_e(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")])),
      _: 1,
      __: [0]
    }, 8, ["nonce"])], 64));
  }
}), Bp = qp;
const [Fp, Np] = ke("SwitchRoot");
var Vp = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, { disabled: n } = Ue(t), l = /* @__PURE__ */ et(t, "modelValue", r, {
      defaultValue: t.defaultValue,
      passive: t.modelValue === void 0
    });
    function a() {
      n.value || (l.value = !l.value);
    }
    const { forwardRef: i, currentElement: s } = ce(), c = br(s), d = P(() => {
      var p;
      return t.id && s.value ? (p = document.querySelector(`[for="${t.id}"]`)) == null ? void 0 : p.innerText : void 0;
    });
    return Np({
      modelValue: l,
      toggleCheck: a,
      disabled: n
    }), (p, f) => (C(), B(u(ve), ee(p.$attrs, {
      id: p.id,
      ref: u(i),
      role: "switch",
      type: p.as === "button" ? "button" : void 0,
      value: p.value,
      "aria-label": p.$attrs["aria-label"] || d.value,
      "aria-checked": u(l),
      "aria-required": p.required,
      "data-state": u(l) ? "checked" : "unchecked",
      "data-disabled": u(n) ? "" : void 0,
      "as-child": p.asChild,
      as: p.as,
      disabled: u(n),
      onClick: a,
      onKeydown: Pt(xe(a, ["prevent"]), ["enter"])
    }), {
      default: q(() => [F(p.$slots, "default", { modelValue: u(l) }), u(c) && p.name ? (C(), B(u(wa), {
        key: 0,
        type: "checkbox",
        name: p.name,
        disabled: u(n),
        required: p.required,
        value: p.value,
        checked: !!u(l)
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
}), zp = Vp, Hp = /* @__PURE__ */ V({
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
    const o = Fp();
    return ce(), (t, r) => {
      var n;
      return C(), B(u(ve), {
        "data-state": (n = u(o).modelValue) != null && n.value ? "checked" : "unchecked",
        "data-disabled": u(o).disabled.value ? "" : void 0,
        "as-child": t.asChild,
        as: t.as
      }, {
        default: q(() => [F(t.$slots, "default")]),
        _: 3
      }, 8, [
        "data-state",
        "data-disabled",
        "as-child",
        "as"
      ]);
    };
  }
}), Up = Hp, Wp = /* @__PURE__ */ V({
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
    return (o, t) => (C(), B(u(ve), {
      as: o.as,
      "as-child": o.asChild,
      "data-reka-toast-announce-exclude": "",
      "data-reka-toast-announce-alt": o.altText || void 0
    }, {
      default: q(() => [F(o.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-reka-toast-announce-alt"
    ]));
  }
}), Ba = Wp;
const [Fa, Rm] = ke("ToastProvider");
var Kp = /* @__PURE__ */ V({
  __name: "ToastAnnounce",
  setup(e) {
    const o = Fa(), t = $s(1e3), r = I(!1);
    return ma(() => {
      r.value = !0;
    }), (n, l) => u(t) || r.value ? (C(), B(u(co), { key: 0 }, {
      default: q(() => [_e(H(u(o).label.value) + " ", 1), F(n.$slots, "default")]),
      _: 3
    })) : J("v-if", !0);
  }
}), Gp = Kp;
const Yp = "toast.swipeStart", Xp = "toast.swipeMove", Jp = "toast.swipeCancel", Zp = "toast.swipeEnd", Ml = "toast.viewportPause", Il = "toast.viewportResume";
function Kn(e, o, t) {
  const r = t.originalEvent.currentTarget, n = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: t
  });
  o && r.addEventListener(e, o, { once: !0 }), r.dispatchEvent(n);
}
function Rl(e, o, t = 0) {
  const r = Math.abs(e.x), n = Math.abs(e.y), l = r > n;
  return o === "left" || o === "right" ? l && r > t : !l && n > t;
}
function Qp(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function Na(e) {
  const o = [];
  return Array.from(e.childNodes).forEach((r) => {
    if (r.nodeType === r.TEXT_NODE && r.textContent && o.push(r.textContent), Qp(r)) {
      const n = r.ariaHidden || r.hidden || r.style.display === "none", l = r.dataset.rekaToastAnnounceExclude === "";
      if (!n)
        if (l) {
          const a = r.dataset.rekaToastAnnounceAlt;
          a && o.push(a);
        } else
          o.push(...Na(r));
    }
  }), o;
}
const [ef, tf] = ke("ToastRoot");
var nf = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, { forwardRef: n, currentElement: l } = ce(), { CollectionItem: a } = Ot(), i = Fa(), s = I(null), c = I(null), d = P(() => typeof t.duration == "number" ? t.duration : i.duration.value), p = I(0), f = I(d.value), v = I(0), y = I(d.value), m = ma(() => {
      const _ = (/* @__PURE__ */ new Date()).getTime() - p.value;
      y.value = Math.max(f.value - _, 0);
    }, { fpsLimit: 60 });
    function x(_) {
      _ <= 0 || _ === Number.POSITIVE_INFINITY || ot && (window.clearTimeout(v.value), p.value = (/* @__PURE__ */ new Date()).getTime(), v.value = window.setTimeout(w, _));
    }
    function w(_) {
      var b, A;
      const S = (_ == null ? void 0 : _.pointerType) === "";
      ((b = l.value) == null ? void 0 : b.contains(Ge())) && S && ((A = i.viewport.value) == null || A.focus()), S && (i.isClosePausedRef.value = !1), r("close");
    }
    const h = P(() => l.value ? Na(l.value) : null);
    if (t.type && !["foreground", "background"].includes(t.type)) {
      const _ = "Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.";
      throw new Error(_);
    }
    return Ae((_) => {
      const S = i.viewport.value;
      if (S) {
        const g = () => {
          x(f.value), m.resume(), r("resume");
        }, b = () => {
          const A = (/* @__PURE__ */ new Date()).getTime() - p.value;
          f.value = f.value - A, window.clearTimeout(v.value), m.pause(), r("pause");
        };
        return S.addEventListener(Ml, b), S.addEventListener(Il, g), () => {
          S.removeEventListener(Ml, b), S.removeEventListener(Il, g);
        };
      }
    }), pe(() => [t.open, d.value], () => {
      f.value = d.value, t.open && !i.isClosePausedRef.value && x(d.value);
    }, { immediate: !0 }), ya("Escape", (_) => {
      r("escapeKeyDown", _), _.defaultPrevented || (i.isFocusedToastEscapeKeyDownRef.value = !0, w());
    }), Se(() => {
      i.onToastAdd();
    }), Xe(() => {
      i.onToastRemove();
    }), tf({ onClose: w }), (_, S) => (C(), z(be, null, [h.value ? (C(), B(Gp, {
      key: 0,
      role: "alert",
      "aria-live": _.type === "foreground" ? "assertive" : "polite",
      "aria-atomic": "true"
    }, {
      default: q(() => [_e(H(h.value), 1)]),
      _: 1
    }, 8, ["aria-live"])) : J("v-if", !0), u(i).viewport.value ? (C(), B(dr, {
      key: 1,
      to: u(i).viewport.value
    }, [K(u(a), null, {
      default: q(() => [K(u(ve), ee({
        ref: u(n),
        role: "alert",
        "aria-live": "off",
        "aria-atomic": "true",
        tabindex: "0"
      }, _.$attrs, {
        as: _.as,
        "as-child": _.asChild,
        "data-state": _.open ? "open" : "closed",
        "data-swipe-direction": u(i).swipeDirection.value,
        style: u(i).disableSwipe.value ? void 0 : {
          userSelect: "none",
          touchAction: "none"
        },
        onPointerdown: S[0] || (S[0] = xe((g) => {
          u(i).disableSwipe.value || (s.value = {
            x: g.clientX,
            y: g.clientY
          });
        }, ["left"])),
        onPointermove: S[1] || (S[1] = (g) => {
          if (u(i).disableSwipe.value || !s.value)
            return;
          const b = g.clientX - s.value.x, A = g.clientY - s.value.y, T = !!c.value, E = ["left", "right"].includes(u(i).swipeDirection.value), M = ["left", "up"].includes(u(i).swipeDirection.value) ? Math.min : Math.max, $ = E ? M(0, b) : 0, L = E ? 0 : M(0, A), k = g.pointerType === "touch" ? 10 : 2, N = {
            x: $,
            y: L
          }, U = {
            originalEvent: g,
            delta: N
          };
          T ? (c.value = N, u(Kn)(u(Xp), (oe) => r("swipeMove", oe), U)) : u(Rl)(N, u(i).swipeDirection.value, k) ? (c.value = N, u(Kn)(u(Yp), (oe) => r("swipeStart", oe), U), g.target.setPointerCapture(g.pointerId)) : (Math.abs(b) > k || Math.abs(A) > k) && (s.value = null);
        }),
        onPointerup: S[2] || (S[2] = (g) => {
          if (u(i).disableSwipe.value)
            return;
          const b = c.value, A = g.target;
          if (A.hasPointerCapture(g.pointerId) && A.releasePointerCapture(g.pointerId), c.value = null, s.value = null, b) {
            const T = g.currentTarget, E = {
              originalEvent: g,
              delta: b
            };
            u(Rl)(b, u(i).swipeDirection.value, u(i).swipeThreshold.value) ? u(Kn)(u(Zp), (M) => r("swipeEnd", M), E) : u(Kn)(u(Jp), (M) => r("swipeCancel", M), E), T == null || T.addEventListener("click", (M) => M.preventDefault(), { once: !0 });
          }
        })
      }), {
        default: q(() => [F(_.$slots, "default", {
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
}), of = nf, rf = /* @__PURE__ */ V({
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
    const o = e, t = ef(), { forwardRef: r } = ce();
    return (n, l) => (C(), B(Ba, { "as-child": "" }, {
      default: q(() => [K(u(ve), ee(o, {
        ref: u(r),
        type: n.as === "button" ? "button" : void 0,
        onClick: u(t).onClose
      }), {
        default: q(() => [F(n.$slots, "default")]),
        _: 3
      }, 16, ["type", "onClick"])]),
      _: 3
    }));
  }
}), Va = rf, lf = /* @__PURE__ */ V({
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
    const { forwardRef: t } = ce();
    return (r, n) => r.altText ? (C(), B(Ba, {
      key: 0,
      "alt-text": r.altText,
      "as-child": ""
    }, {
      default: q(() => [K(Va, {
        ref: u(t),
        as: r.as,
        "as-child": r.asChild
      }, {
        default: q(() => [F(r.$slots, "default")]),
        _: 3
      }, 8, ["as", "as-child"])]),
      _: 3
    }, 8, ["alt-text"])) : J("v-if", !0);
  }
}), af = lf, sf = /* @__PURE__ */ V({
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
    const o = e;
    return ce(), (t, r) => (C(), B(u(ve), Ie(qe(o)), {
      default: q(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), uf = sf, df = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, { forwardRef: n } = ce(), l = /* @__PURE__ */ et(t, "open", r, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    });
    return (a, i) => (C(), B(u(Mn), { present: a.forceMount || u(l) }, {
      default: q(() => [K(of, ee({
        ref: u(n),
        open: u(l),
        type: a.type,
        as: a.as,
        "as-child": a.asChild,
        duration: a.duration
      }, a.$attrs, {
        onClose: i[0] || (i[0] = (s) => l.value = !1),
        onPause: i[1] || (i[1] = (s) => r("pause")),
        onResume: i[2] || (i[2] = (s) => r("resume")),
        onEscapeKeyDown: i[3] || (i[3] = (s) => r("escapeKeyDown", s)),
        onSwipeStart: i[4] || (i[4] = (s) => {
          r("swipeStart", s), s.defaultPrevented || s.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: i[5] || (i[5] = (s) => {
          if (r("swipeMove", s), !s.defaultPrevented) {
            const { x: c, y: d } = s.detail.delta, p = s.currentTarget;
            p.setAttribute("data-swipe", "move"), p.style.setProperty("--reka-toast-swipe-move-x", `${c}px`), p.style.setProperty("--reka-toast-swipe-move-y", `${d}px`);
          }
        }),
        onSwipeCancel: i[6] || (i[6] = (s) => {
          if (r("swipeCancel", s), !s.defaultPrevented) {
            const c = s.currentTarget;
            c.setAttribute("data-swipe", "cancel"), c.style.removeProperty("--reka-toast-swipe-move-x"), c.style.removeProperty("--reka-toast-swipe-move-y"), c.style.removeProperty("--reka-toast-swipe-end-x"), c.style.removeProperty("--reka-toast-swipe-end-y");
          }
        }),
        onSwipeEnd: i[7] || (i[7] = (s) => {
          if (r("swipeEnd", s), !s.defaultPrevented) {
            const { x: c, y: d } = s.detail.delta, p = s.currentTarget;
            p.setAttribute("data-swipe", "end"), p.style.removeProperty("--reka-toast-swipe-move-x"), p.style.removeProperty("--reka-toast-swipe-move-y"), p.style.setProperty("--reka-toast-swipe-end-x", `${c}px`), p.style.setProperty("--reka-toast-swipe-end-y", `${d}px`), l.value = !1;
          }
        })
      }), {
        default: q(({ remaining: s, duration: c }) => [F(a.$slots, "default", {
          remaining: s,
          duration: c,
          open: u(l)
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
}), cf = df, pf = /* @__PURE__ */ V({
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
    const o = e;
    return ce(), (t, r) => (C(), B(u(Jd), Ie(qe(o)), {
      default: q(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), ff = pf;
const [jr, vf] = ke("TooltipProvider");
var yf = /* @__PURE__ */ V({
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
    const o = e, { delayDuration: t, skipDelayDuration: r, disableHoverableContent: n, disableClosingTrigger: l, ignoreNonKeyboardFocus: a, disabled: i } = Ue(o);
    ce();
    const s = I(!0), c = I(!1), { start: d, stop: p } = yr(() => {
      s.value = !0;
    }, r, { immediate: !1 });
    return vf({
      isOpenDelayed: s,
      delayDuration: t,
      onOpen() {
        p(), s.value = !1;
      },
      onClose() {
        d();
      },
      isPointerInTransitRef: c,
      disableHoverableContent: n,
      disableClosingTrigger: l,
      disabled: i,
      ignoreNonKeyboardFocus: a
    }), (f, v) => F(f.$slots, "default");
  }
}), mf = yf;
const za = "tooltip.open", [wo, hf] = ke("TooltipRoot");
var gf = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o;
    ce();
    const n = jr(), l = P(() => t.disableHoverableContent ?? n.disableHoverableContent.value), a = P(() => t.disableClosingTrigger ?? n.disableClosingTrigger.value), i = P(() => t.disabled ?? n.disabled.value), s = P(() => t.delayDuration ?? n.delayDuration.value), c = P(() => t.ignoreNonKeyboardFocus ?? n.ignoreNonKeyboardFocus.value), d = /* @__PURE__ */ et(t, "open", r, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    });
    pe(d, (_) => {
      n.onClose && (_ ? (n.onOpen(), document.dispatchEvent(new CustomEvent(za))) : n.onClose());
    });
    const p = I(!1), f = I(), v = P(() => d.value ? p.value ? "delayed-open" : "instant-open" : "closed"), { start: y, stop: m } = yr(() => {
      p.value = !0, d.value = !0;
    }, s, { immediate: !1 });
    function x() {
      m(), p.value = !1, d.value = !0;
    }
    function w() {
      m(), d.value = !1;
    }
    function h() {
      y();
    }
    return hf({
      contentId: "",
      open: d,
      stateAttribute: v,
      trigger: f,
      onTriggerChange(_) {
        f.value = _;
      },
      onTriggerEnter() {
        n.isOpenDelayed.value ? h() : x();
      },
      onTriggerLeave() {
        l.value ? w() : m();
      },
      onOpen: x,
      onClose: w,
      disableHoverableContent: l,
      disableClosingTrigger: a,
      disabled: i,
      ignoreNonKeyboardFocus: c
    }), (_, S) => (C(), B(u(po), null, {
      default: q(() => [F(_.$slots, "default", { open: u(d) })]),
      _: 3
    }));
  }
}), bf = gf, xf = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = wo(), { forwardRef: l, currentElement: a } = ce(), i = P(() => {
      var c;
      return t.ariaLabel || ((c = a.value) == null ? void 0 : c.textContent);
    }), s = P(() => {
      const { ariaLabel: c, ...d } = t;
      return d;
    });
    return Se(() => {
      eo(window, "scroll", (c) => {
        const d = c.target;
        d != null && d.contains(n.trigger.value) && n.onClose();
      }), eo(window, za, n.onClose);
    }), (c, d) => (C(), B(u(so), {
      "as-child": "",
      "disable-outside-pointer-events": !1,
      onEscapeKeyDown: d[0] || (d[0] = (p) => r("escapeKeyDown", p)),
      onPointerDownOutside: d[1] || (d[1] = (p) => {
        var f;
        u(n).disableClosingTrigger.value && ((f = u(n).trigger.value) != null && f.contains(p.target)) && p.preventDefault(), r("pointerDownOutside", p);
      }),
      onFocusOutside: d[2] || (d[2] = xe(() => {
      }, ["prevent"])),
      onDismiss: d[3] || (d[3] = (p) => u(n).onClose())
    }, {
      default: q(() => [K(u(go), ee({
        ref: u(l),
        "data-state": u(n).stateAttribute.value
      }, {
        ...c.$attrs,
        ...s.value
      }, { style: {
        "--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
        "--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
        "--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: q(() => [F(c.$slots, "default"), K(u(co), {
          id: u(n).contentId,
          role: "tooltip"
        }, {
          default: q(() => [_e(H(i.value), 1)]),
          _: 1
        }, 8, ["id"])]),
        _: 3
      }, 16, ["data-state"])]),
      _: 3
    }));
  }
}), Ha = xf, wf = /* @__PURE__ */ V({
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
    const t = dn(e), { forwardRef: r, currentElement: n } = ce(), { trigger: l, onClose: a } = wo(), i = jr(), { isPointerInTransit: s, onPointerExit: c } = Ys(l, n);
    return i.isPointerInTransitRef = s, c(() => {
      a();
    }), (d, p) => (C(), B(Ha, ee({ ref: u(r) }, u(t)), {
      default: q(() => [F(d.$slots, "default")]),
      _: 3
    }, 16));
  }
}), _f = wf, Sf = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = wo(), l = cn(t, r), { forwardRef: a } = ce();
    return (i, s) => (C(), B(u(Mn), { present: i.forceMount || u(n).open.value }, {
      default: q(() => [(C(), B(dt(u(n).disableHoverableContent.value ? Ha : _f), ee({ ref: u(a) }, u(l)), {
        default: q(() => [F(i.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), Cf = Sf, Af = /* @__PURE__ */ V({
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
    const o = e;
    return (t, r) => (C(), B(u(uo), Ie(qe(o)), {
      default: q(() => [F(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Of = Af, Ef = /* @__PURE__ */ V({
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
    const o = e, t = wo(), r = jr();
    t.contentId || (t.contentId = yt(void 0, "reka-tooltip-content"));
    const { forwardRef: n, currentElement: l } = ce(), a = I(!1), i = I(!1), s = P(() => t.disabled.value ? {} : {
      click: m,
      focus: v,
      pointermove: p,
      pointerleave: f,
      pointerdown: d,
      blur: y
    });
    Se(() => {
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
    function p(x) {
      x.pointerType !== "touch" && !i.value && !r.isPointerInTransitRef.value && (t.onTriggerEnter(), i.value = !0);
    }
    function f() {
      t.onTriggerLeave(), i.value = !1;
    }
    function v(x) {
      var w, h;
      a.value || t.ignoreNonKeyboardFocus.value && !((h = (w = x.target).matches) != null && h.call(w, ":focus-visible")) || t.onOpen();
    }
    function y() {
      t.onClose();
    }
    function m() {
      t.disableClosingTrigger.value || t.onClose();
    }
    return (x, w) => (C(), B(u(fo), {
      "as-child": "",
      reference: x.reference
    }, {
      default: q(() => [K(u(ve), ee({
        ref: u(n),
        "aria-describedby": u(t).open.value ? u(t).contentId : void 0,
        "data-state": u(t).stateAttribute.value,
        as: x.as,
        "as-child": o.asChild,
        "data-grace-area-trigger": ""
      }, mi(s.value)), {
        default: q(() => [F(x.$slots, "default")]),
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
}), kf = Ef;
const Tf = { class: "rounded-lg border bg-surface-modal shadow-xl" }, jf = /* @__PURE__ */ V({
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
  setup(e, { expose: o, emit: t }) {
    const r = e, n = t;
    o({ open: x, close: w });
    const l = I(!1), a = I(!1), i = I(null), s = I(null), c = I(null), d = P({
      get: () => p.value ? r.show : l.value,
      set: (A) => {
        p.value || A !== l.value && (l.value = A, h(A));
      }
    }), p = P(() => r.show !== void 0), f = P(() => {
      const [A] = r.placement.split("-");
      return A;
    }), v = P(() => {
      const [, A] = r.placement.split("-");
      return A || "center";
    });
    function y(A) {
      A instanceof Event && (A = void 0), A == null && (A = !d.value), A = !!A, A ? x() : w();
    }
    function m() {
    }
    function x() {
      d.value = !0;
    }
    function w() {
      d.value = !1;
    }
    function h(A) {
      n("update:show", A), n(A ? "open" : "close");
    }
    function _() {
      a.value = !0, s.value && (clearTimeout(s.value), s.value = null), r.trigger === "hover" && (r.hoverDelay ? i.value = setTimeout(
        () => {
          a.value && x();
        },
        Number(r.hoverDelay) * 1e3
      ) : x());
    }
    function S() {
      a.value = !1, i.value && (clearTimeout(i.value), i.value = null), r.trigger === "hover" && (s.value && clearTimeout(s.value), r.leaveDelay ? s.value = setTimeout(
        () => {
          a.value || w();
        },
        Number(r.leaveDelay) * 1e3
      ) : a.value || w());
    }
    function g(A) {
      if (!r.hideOnBlur) {
        A.preventDefault();
        return;
      }
      const T = A.target;
      if (c.value && (c.value.contains(T) || c.value === T)) {
        A.preventDefault();
        return;
      }
    }
    const b = P(() => r.transition === "default");
    return Xe(() => {
      i.value && clearTimeout(i.value), s.value && clearTimeout(s.value);
    }), (A, T) => (C(), B(u(Uc), {
      open: d.value,
      "onUpdate:open": [
        T[1] || (T[1] = (E) => d.value = E),
        h
      ]
    }, {
      default: q(() => [
        K(u(Kc), { asChild: "" }, {
          default: q(() => [
            j("div", {
              ref_key: "anchorRef",
              ref: c,
              class: ae(["flex", A.$attrs.class]),
              style: St(A.$attrs.style),
              onMouseover: _,
              onMouseleave: S
            }, [
              F(A.$slots, "target", Ie(qe({
                togglePopover: y,
                updatePosition: m,
                open: x,
                close: w,
                isOpen: d.value
              })))
            ], 38)
          ]),
          _: 3
        }),
        K(u(np), null, {
          default: q(() => [
            K(u(ep), {
              side: f.value,
              align: v.value,
              sideOffset: e.offset,
              style: St({
                minWidth: e.matchTargetWidth ? "var(--reka-popover-trigger-width)" : void 0
              }),
              class: ae(["PopoverContent", { "has-transition": b.value }]),
              onMouseover: T[0] || (T[0] = () => {
                a.value = !0;
              }),
              onMouseleave: S,
              onInteractOutside: g
            }, {
              default: q(() => [
                j("div", {
                  class: ae(["relative", ["body-container", e.popoverClass]])
                }, [
                  F(A.$slots, "body", Ie(qe({ togglePopover: y, updatePosition: m, open: x, close: w, isOpen: d.value })), () => [
                    j("div", Tf, [
                      F(A.$slots, "body-main", Ie(qe({
                        togglePopover: y,
                        updatePosition: m,
                        open: x,
                        close: w,
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
var Pf = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Mf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ua = { exports: {} };
(function(e, o) {
  (function(r, n) {
    e.exports = n();
  })(typeof self < "u" ? self : Pf, function() {
    return (
      /******/
      function(t) {
        var r = {};
        function n(l) {
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
          return t[l].call(a.exports, a, a.exports, n), a.l = !0, a.exports;
        }
        return n.m = t, n.c = r, n.d = function(l, a, i) {
          n.o(l, a) || Object.defineProperty(l, a, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: i
            /******/
          });
        }, n.r = function(l) {
          Object.defineProperty(l, "__esModule", { value: !0 });
        }, n.n = function(l) {
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
          return n.d(a, "a", a), a;
        }, n.o = function(l, a) {
          return Object.prototype.hasOwnProperty.call(l, a);
        }, n.p = "", n(n.s = 0);
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
          function(t, r, n) {
            var l, a;
            /*!
              Copyright (c) 2016 Jed Watson.
              Licensed under the MIT License (MIT), see
              http://jedwatson.github.io/classnames
            */
            (function() {
              var i = function() {
                function s() {
                }
                s.prototype = /* @__PURE__ */ Object.create(null);
                function c(w, h) {
                  for (var _ = h.length, S = 0; S < _; ++S)
                    m(w, h[S]);
                }
                var d = {}.hasOwnProperty;
                function p(w, h) {
                  w[h] = !0;
                }
                function f(w, h) {
                  for (var _ in h)
                    d.call(h, _) && (w[_] = !!h[_]);
                }
                var v = /\s+/;
                function y(w, h) {
                  for (var _ = h.split(v), S = _.length, g = 0; g < S; ++g)
                    w[_[g]] = !0;
                }
                function m(w, h) {
                  if (h) {
                    var _ = typeof h;
                    _ === "string" ? y(w, h) : Array.isArray(h) ? c(w, h) : _ === "object" ? f(w, h) : _ === "number" && p(w, h);
                  }
                }
                function x() {
                  for (var w = arguments.length, h = Array(w), _ = 0; _ < w; _++)
                    h[_] = arguments[_];
                  var S = new s();
                  c(S, h);
                  var g = [];
                  for (var b in S)
                    S[b] && g.push(b);
                  return g.join(" ");
                }
                return x;
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
          function(t, r, n) {
            n(
              /*! ../../modules/es.string.iterator */
              "./node_modules/core-js/modules/es.string.iterator.js"
            ), n(
              /*! ../../modules/es.array.from */
              "./node_modules/core-js/modules/es.array.from.js"
            );
            var l = n(
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
            t.exports = function(n) {
              if (typeof n != "function")
                throw TypeError(String(n) + " is not a function");
              return n;
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
          function(t, r, n) {
            var l = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/bind-context */
              "./node_modules/core-js/internals/bind-context.js"
            ), a = n(
              /*! ../internals/to-object */
              "./node_modules/core-js/internals/to-object.js"
            ), i = n(
              /*! ../internals/call-with-safe-iteration-closing */
              "./node_modules/core-js/internals/call-with-safe-iteration-closing.js"
            ), s = n(
              /*! ../internals/is-array-iterator-method */
              "./node_modules/core-js/internals/is-array-iterator-method.js"
            ), c = n(
              /*! ../internals/to-length */
              "./node_modules/core-js/internals/to-length.js"
            ), d = n(
              /*! ../internals/create-property */
              "./node_modules/core-js/internals/create-property.js"
            ), p = n(
              /*! ../internals/get-iterator-method */
              "./node_modules/core-js/internals/get-iterator-method.js"
            );
            t.exports = function(v) {
              var y = a(v), m = typeof this == "function" ? this : Array, x = arguments.length, w = x > 1 ? arguments[1] : void 0, h = w !== void 0, _ = 0, S = p(y), g, b, A, T;
              if (h && (w = l(w, x > 2 ? arguments[2] : void 0, 2)), S != null && !(m == Array && s(S)))
                for (T = S.call(y), b = new m(); !(A = T.next()).done; _++)
                  d(
                    b,
                    _,
                    h ? i(T, w, [A.value, _], !0) : A.value
                  );
              else
                for (g = c(y.length), b = new m(g); g > _; _++)
                  d(b, _, h ? w(y[_], _) : y[_]);
              return b.length = _, b;
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/to-indexed-object */
              "./node_modules/core-js/internals/to-indexed-object.js"
            ), a = n(
              /*! ../internals/to-length */
              "./node_modules/core-js/internals/to-length.js"
            ), i = n(
              /*! ../internals/to-absolute-index */
              "./node_modules/core-js/internals/to-absolute-index.js"
            );
            t.exports = function(s) {
              return function(c, d, p) {
                var f = l(c), v = a(f.length), y = i(p, v), m;
                if (s && d != d) {
                  for (; v > y; )
                    if (m = f[y++], m != m)
                      return !0;
                } else
                  for (; v > y; y++)
                    if ((s || y in f) && f[y] === d)
                      return s || y || 0;
                return !s && -1;
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/a-function */
              "./node_modules/core-js/internals/a-function.js"
            );
            t.exports = function(a, i, s) {
              if (l(a), i === void 0)
                return a;
              switch (s) {
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
                  return function(c, d, p) {
                    return a.call(i, c, d, p);
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            );
            t.exports = function(a, i, s, c) {
              try {
                return c ? i(l(s)[0], s[1]) : i(s);
              } catch (p) {
                var d = a.return;
                throw d !== void 0 && l(d.call(a)), p;
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), a = l("iterator"), i = !1;
            try {
              var s = 0, c = {
                next: function() {
                  return { done: !!s++ };
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
            t.exports = function(d, p) {
              if (!p && !i)
                return !1;
              var f = !1;
              try {
                var v = {};
                v[a] = function() {
                  return {
                    next: function() {
                      return { done: f = !0 };
                    }
                  };
                }, d(v);
              } catch {
              }
              return f;
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
            var n = {}.toString;
            t.exports = function(l) {
              return n.call(l).slice(8, -1);
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/classof-raw */
              "./node_modules/core-js/internals/classof-raw.js"
            ), a = n(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), i = a("toStringTag"), s = l(function() {
              return arguments;
            }()) == "Arguments", c = function(d, p) {
              try {
                return d[p];
              } catch {
              }
            };
            t.exports = function(d) {
              var p, f, v;
              return d === void 0 ? "Undefined" : d === null ? "Null" : typeof (f = c(p = Object(d), i)) == "string" ? f : s ? l(p) : (v = l(p)) == "Object" && typeof p.callee == "function" ? "Arguments" : v;
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), a = n(
              /*! ../internals/own-keys */
              "./node_modules/core-js/internals/own-keys.js"
            ), i = n(
              /*! ../internals/object-get-own-property-descriptor */
              "./node_modules/core-js/internals/object-get-own-property-descriptor.js"
            ), s = n(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            );
            t.exports = function(c, d) {
              for (var p = a(d), f = s.f, v = i.f, y = 0; y < p.length; y++) {
                var m = p[y];
                l(c, m) || f(c, m, v(d, m));
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
          function(t, r, n) {
            var l = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/iterators-core */
              "./node_modules/core-js/internals/iterators-core.js"
            ).IteratorPrototype, a = n(
              /*! ../internals/object-create */
              "./node_modules/core-js/internals/object-create.js"
            ), i = n(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            ), s = n(
              /*! ../internals/set-to-string-tag */
              "./node_modules/core-js/internals/set-to-string-tag.js"
            ), c = n(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), d = function() {
              return this;
            };
            t.exports = function(p, f, v) {
              var y = f + " Iterator";
              return p.prototype = a(l, { next: i(1, v) }), s(p, y, !1, !0), c[y] = d, p;
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
            t.exports = function(n, l) {
              return {
                enumerable: !(n & 1),
                configurable: !(n & 2),
                writable: !(n & 4),
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/to-primitive */
              "./node_modules/core-js/internals/to-primitive.js"
            ), a = n(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ), i = n(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            );
            t.exports = function(s, c, d) {
              var p = l(c);
              p in s ? a.f(s, p, i(0, d)) : s[p] = d;
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/export */
              "./node_modules/core-js/internals/export.js"
            ), a = n(
              /*! ../internals/create-iterator-constructor */
              "./node_modules/core-js/internals/create-iterator-constructor.js"
            ), i = n(
              /*! ../internals/object-get-prototype-of */
              "./node_modules/core-js/internals/object-get-prototype-of.js"
            ), s = n(
              /*! ../internals/object-set-prototype-of */
              "./node_modules/core-js/internals/object-set-prototype-of.js"
            ), c = n(
              /*! ../internals/set-to-string-tag */
              "./node_modules/core-js/internals/set-to-string-tag.js"
            ), d = n(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), p = n(
              /*! ../internals/redefine */
              "./node_modules/core-js/internals/redefine.js"
            ), f = n(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), v = n(
              /*! ../internals/is-pure */
              "./node_modules/core-js/internals/is-pure.js"
            ), y = n(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), m = n(
              /*! ../internals/iterators-core */
              "./node_modules/core-js/internals/iterators-core.js"
            ), x = m.IteratorPrototype, w = m.BUGGY_SAFARI_ITERATORS, h = f("iterator"), _ = "keys", S = "values", g = "entries", b = function() {
              return this;
            };
            t.exports = function(A, T, E, M, $, L, k) {
              a(E, T, M);
              var N = function(ye) {
                if (ye === $ && D)
                  return D;
                if (!w && ye in ne)
                  return ne[ye];
                switch (ye) {
                  case _:
                    return function() {
                      return new E(this, ye);
                    };
                  case S:
                    return function() {
                      return new E(this, ye);
                    };
                  case g:
                    return function() {
                      return new E(this, ye);
                    };
                }
                return function() {
                  return new E(this);
                };
              }, U = T + " Iterator", oe = !1, ne = A.prototype, se = ne[h] || ne["@@iterator"] || $ && ne[$], D = !w && se || N($), Z = T == "Array" && ne.entries || se, G, fe, re;
              if (Z && (G = i(Z.call(new A())), x !== Object.prototype && G.next && (!v && i(G) !== x && (s ? s(G, x) : typeof G[h] != "function" && d(G, h, b)), c(G, U, !0, !0), v && (y[U] = b))), $ == S && se && se.name !== S && (oe = !0, D = function() {
                return se.call(this);
              }), (!v || k) && ne[h] !== D && d(ne, h, D), y[T] = D, $)
                if (fe = {
                  values: N(S),
                  keys: L ? D : N(_),
                  entries: N(g)
                }, k)
                  for (re in fe)
                    (w || oe || !(re in ne)) && p(ne, re, fe[re]);
                else
                  l({ target: T, proto: !0, forced: w || oe }, fe);
              return fe;
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
          function(t, r, n) {
            var l = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = n(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            ), i = l.document, s = a(i) && a(i.createElement);
            t.exports = function(c) {
              return s ? i.createElement(c) : {};
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = n(
              /*! ../internals/object-get-own-property-descriptor */
              "./node_modules/core-js/internals/object-get-own-property-descriptor.js"
            ).f, i = n(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), s = n(
              /*! ../internals/redefine */
              "./node_modules/core-js/internals/redefine.js"
            ), c = n(
              /*! ../internals/set-global */
              "./node_modules/core-js/internals/set-global.js"
            ), d = n(
              /*! ../internals/copy-constructor-properties */
              "./node_modules/core-js/internals/copy-constructor-properties.js"
            ), p = n(
              /*! ../internals/is-forced */
              "./node_modules/core-js/internals/is-forced.js"
            );
            t.exports = function(f, v) {
              var y = f.target, m = f.global, x = f.stat, w, h, _, S, g, b;
              if (m ? h = l : x ? h = l[y] || c(y, {}) : h = (l[y] || {}).prototype, h)
                for (_ in v) {
                  if (g = v[_], f.noTargetGet ? (b = a(h, _), S = b && b.value) : S = h[_], w = p(m ? _ : y + (x ? "." : "#") + _, f.forced), !w && S !== void 0) {
                    if (typeof g == typeof S)
                      continue;
                    d(g, S);
                  }
                  (f.sham || S && S.sham) && i(g, "sham", !0), s(h, _, g, f);
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
            t.exports = function(n) {
              try {
                return !!n();
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
          function(t, r, n) {
            var l = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/classof */
              "./node_modules/core-js/internals/classof.js"
            ), a = n(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), i = n(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), s = i("iterator");
            t.exports = function(c) {
              if (c != null)
                return c[s] || c["@@iterator"] || a[l(c)];
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
          function(t, r, n) {
            (function(l) {
              var a = "object", i = function(s) {
                return s && s.Math == Math && s;
              };
              t.exports = // eslint-disable-next-line no-undef
              i(typeof globalThis == a && globalThis) || i(typeof window == a && window) || i(typeof self == a && self) || i(typeof l == a && l) || // eslint-disable-next-line no-new-func
              Function("return this")();
            }).call(this, n(
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
            var n = {}.hasOwnProperty;
            t.exports = function(l, a) {
              return n.call(l, a);
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), a = n(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ), i = n(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            );
            t.exports = l ? function(s, c, d) {
              return a.f(s, c, i(1, d));
            } : function(s, c, d) {
              return s[c] = d, s;
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
          function(t, r, n) {
            var l = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), a = n(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            ), i = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            ), a = n(
              /*! ../internals/classof-raw */
              "./node_modules/core-js/internals/classof-raw.js"
            ), i = "".split;
            t.exports = l(function() {
              return !Object("z").propertyIsEnumerable(0);
            }) ? function(s) {
              return a(s) == "String" ? i.call(s, "") : Object(s);
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/native-weak-map */
              "./node_modules/core-js/internals/native-weak-map.js"
            ), a = n(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), i = n(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            ), s = n(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), c = n(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), d = n(
              /*! ../internals/shared-key */
              "./node_modules/core-js/internals/shared-key.js"
            ), p = n(
              /*! ../internals/hidden-keys */
              "./node_modules/core-js/internals/hidden-keys.js"
            ), f = a.WeakMap, v, y, m, x = function(A) {
              return m(A) ? y(A) : v(A, {});
            }, w = function(A) {
              return function(T) {
                var E;
                if (!i(T) || (E = y(T)).type !== A)
                  throw TypeError("Incompatible receiver, " + A + " required");
                return E;
              };
            };
            if (l) {
              var h = new f(), _ = h.get, S = h.has, g = h.set;
              v = function(A, T) {
                return g.call(h, A, T), T;
              }, y = function(A) {
                return _.call(h, A) || {};
              }, m = function(A) {
                return S.call(h, A);
              };
            } else {
              var b = d("state");
              p[b] = !0, v = function(A, T) {
                return s(A, b, T), T;
              }, y = function(A) {
                return c(A, b) ? A[b] : {};
              }, m = function(A) {
                return c(A, b);
              };
            }
            t.exports = {
              set: v,
              get: y,
              has: m,
              enforce: x,
              getterFor: w
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), a = n(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), i = l("iterator"), s = Array.prototype;
            t.exports = function(c) {
              return c !== void 0 && (a.Array === c || s[i] === c);
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            ), a = /#|\.prototype\./, i = function(f, v) {
              var y = c[s(f)];
              return y == p ? !0 : y == d ? !1 : typeof v == "function" ? l(v) : !!v;
            }, s = i.normalize = function(f) {
              return String(f).replace(a, ".").toLowerCase();
            }, c = i.data = {}, d = i.NATIVE = "N", p = i.POLYFILL = "P";
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
            t.exports = function(n) {
              return typeof n == "object" ? n !== null : typeof n == "function";
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/object-get-prototype-of */
              "./node_modules/core-js/internals/object-get-prototype-of.js"
            ), a = n(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), i = n(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), s = n(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), c = n(
              /*! ../internals/is-pure */
              "./node_modules/core-js/internals/is-pure.js"
            ), d = s("iterator"), p = !1, f = function() {
              return this;
            }, v, y, m;
            [].keys && (m = [].keys(), "next" in m ? (y = l(l(m)), y !== Object.prototype && (v = y)) : p = !0), v == null && (v = {}), !c && !i(v, d) && a(v, d, f), t.exports = {
              IteratorPrototype: v,
              BUGGY_SAFARI_ITERATORS: p
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
          function(t, r, n) {
            var l = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), a = n(
              /*! ../internals/object-define-properties */
              "./node_modules/core-js/internals/object-define-properties.js"
            ), i = n(
              /*! ../internals/enum-bug-keys */
              "./node_modules/core-js/internals/enum-bug-keys.js"
            ), s = n(
              /*! ../internals/hidden-keys */
              "./node_modules/core-js/internals/hidden-keys.js"
            ), c = n(
              /*! ../internals/html */
              "./node_modules/core-js/internals/html.js"
            ), d = n(
              /*! ../internals/document-create-element */
              "./node_modules/core-js/internals/document-create-element.js"
            ), p = n(
              /*! ../internals/shared-key */
              "./node_modules/core-js/internals/shared-key.js"
            ), f = p("IE_PROTO"), v = "prototype", y = function() {
            }, m = function() {
              var x = d("iframe"), w = i.length, h = "<", _ = "script", S = ">", g = "java" + _ + ":", b;
              for (x.style.display = "none", c.appendChild(x), x.src = String(g), b = x.contentWindow.document, b.open(), b.write(h + _ + S + "document.F=Object" + h + "/" + _ + S), b.close(), m = b.F; w--; )
                delete m[v][i[w]];
              return m();
            };
            t.exports = Object.create || function(w, h) {
              var _;
              return w !== null ? (y[v] = l(w), _ = new y(), y[v] = null, _[f] = w) : _ = m(), h === void 0 ? _ : a(_, h);
            }, s[f] = !0;
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-define-properties.js": (
          /*!********************************************************************!*\
            !*** ./node_modules/core-js/internals/object-define-properties.js ***!
            \********************************************************************/
          /*! no static exports found */
          /***/
          function(t, r, n) {
            var l = n(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), a = n(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ), i = n(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), s = n(
              /*! ../internals/object-keys */
              "./node_modules/core-js/internals/object-keys.js"
            );
            t.exports = l ? Object.defineProperties : function(d, p) {
              i(d);
              for (var f = s(p), v = f.length, y = 0, m; v > y; )
                a.f(d, m = f[y++], p[m]);
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), a = n(
              /*! ../internals/ie8-dom-define */
              "./node_modules/core-js/internals/ie8-dom-define.js"
            ), i = n(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), s = n(
              /*! ../internals/to-primitive */
              "./node_modules/core-js/internals/to-primitive.js"
            ), c = Object.defineProperty;
            r.f = l ? c : function(p, f, v) {
              if (i(p), f = s(f, !0), i(v), a)
                try {
                  return c(p, f, v);
                } catch {
                }
              if ("get" in v || "set" in v)
                throw TypeError("Accessors not supported");
              return "value" in v && (p[f] = v.value), p;
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), a = n(
              /*! ../internals/object-property-is-enumerable */
              "./node_modules/core-js/internals/object-property-is-enumerable.js"
            ), i = n(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            ), s = n(
              /*! ../internals/to-indexed-object */
              "./node_modules/core-js/internals/to-indexed-object.js"
            ), c = n(
              /*! ../internals/to-primitive */
              "./node_modules/core-js/internals/to-primitive.js"
            ), d = n(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), p = n(
              /*! ../internals/ie8-dom-define */
              "./node_modules/core-js/internals/ie8-dom-define.js"
            ), f = Object.getOwnPropertyDescriptor;
            r.f = l ? f : function(y, m) {
              if (y = s(y), m = c(m, !0), p)
                try {
                  return f(y, m);
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/object-keys-internal */
              "./node_modules/core-js/internals/object-keys-internal.js"
            ), a = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), a = n(
              /*! ../internals/to-object */
              "./node_modules/core-js/internals/to-object.js"
            ), i = n(
              /*! ../internals/shared-key */
              "./node_modules/core-js/internals/shared-key.js"
            ), s = n(
              /*! ../internals/correct-prototype-getter */
              "./node_modules/core-js/internals/correct-prototype-getter.js"
            ), c = i("IE_PROTO"), d = Object.prototype;
            t.exports = s ? Object.getPrototypeOf : function(p) {
              return p = a(p), l(p, c) ? p[c] : typeof p.constructor == "function" && p instanceof p.constructor ? p.constructor.prototype : p instanceof Object ? d : null;
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), a = n(
              /*! ../internals/to-indexed-object */
              "./node_modules/core-js/internals/to-indexed-object.js"
            ), i = n(
              /*! ../internals/array-includes */
              "./node_modules/core-js/internals/array-includes.js"
            ), s = n(
              /*! ../internals/hidden-keys */
              "./node_modules/core-js/internals/hidden-keys.js"
            ), c = i(!1);
            t.exports = function(d, p) {
              var f = a(d), v = 0, y = [], m;
              for (m in f)
                !l(s, m) && l(f, m) && y.push(m);
              for (; p.length > v; )
                l(f, m = p[v++]) && (~c(y, m) || y.push(m));
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/object-keys-internal */
              "./node_modules/core-js/internals/object-keys-internal.js"
            ), a = n(
              /*! ../internals/enum-bug-keys */
              "./node_modules/core-js/internals/enum-bug-keys.js"
            );
            t.exports = Object.keys || function(s) {
              return l(s, a);
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
          function(t, r, n) {
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/validate-set-prototype-of-arguments */
              "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js"
            );
            t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
              var a = !1, i = {}, s;
              try {
                s = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set, s.call(i, []), a = i instanceof Array;
              } catch {
              }
              return function(d, p) {
                return l(d, p), a ? s.call(d, p) : d.__proto__ = p, d;
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = n(
              /*! ../internals/object-get-own-property-names */
              "./node_modules/core-js/internals/object-get-own-property-names.js"
            ), i = n(
              /*! ../internals/object-get-own-property-symbols */
              "./node_modules/core-js/internals/object-get-own-property-symbols.js"
            ), s = n(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), c = l.Reflect;
            t.exports = c && c.ownKeys || function(p) {
              var f = a.f(s(p)), v = i.f;
              return v ? f.concat(v(p)) : f;
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
          function(t, r, n) {
            t.exports = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = n(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            ), i = n(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), s = n(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), c = n(
              /*! ../internals/set-global */
              "./node_modules/core-js/internals/set-global.js"
            ), d = n(
              /*! ../internals/function-to-string */
              "./node_modules/core-js/internals/function-to-string.js"
            ), p = n(
              /*! ../internals/internal-state */
              "./node_modules/core-js/internals/internal-state.js"
            ), f = p.get, v = p.enforce, y = String(d).split("toString");
            a("inspectSource", function(m) {
              return d.call(m);
            }), (t.exports = function(m, x, w, h) {
              var _ = h ? !!h.unsafe : !1, S = h ? !!h.enumerable : !1, g = h ? !!h.noTargetGet : !1;
              if (typeof w == "function" && (typeof x == "string" && !s(w, "name") && i(w, "name", x), v(w).source = y.join(typeof x == "string" ? x : "")), m === l) {
                S ? m[x] = w : c(x, w);
                return;
              } else
                _ ? !g && m[x] && (S = !0) : delete m[x];
              S ? m[x] = w : i(m, x, w);
            })(Function.prototype, "toString", function() {
              return typeof this == "function" && f(this).source || d.call(this);
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
            t.exports = function(n) {
              if (n == null)
                throw TypeError("Can't call method on " + n);
              return n;
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = n(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            );
            t.exports = function(i, s) {
              try {
                a(l, i, s);
              } catch {
                l[i] = s;
              }
              return s;
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ).f, a = n(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), i = n(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), s = i("toStringTag");
            t.exports = function(c, d, p) {
              c && !a(c = p ? c : c.prototype, s) && l(c, s, { configurable: !0, value: d });
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            ), a = n(
              /*! ../internals/uid */
              "./node_modules/core-js/internals/uid.js"
            ), i = l("keys");
            t.exports = function(s) {
              return i[s] || (i[s] = a(s));
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = n(
              /*! ../internals/set-global */
              "./node_modules/core-js/internals/set-global.js"
            ), i = n(
              /*! ../internals/is-pure */
              "./node_modules/core-js/internals/is-pure.js"
            ), s = "__core-js_shared__", c = l[s] || a(s, {});
            (t.exports = function(d, p) {
              return c[d] || (c[d] = p !== void 0 ? p : {});
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/to-integer */
              "./node_modules/core-js/internals/to-integer.js"
            ), a = n(
              /*! ../internals/require-object-coercible */
              "./node_modules/core-js/internals/require-object-coercible.js"
            );
            t.exports = function(i, s, c) {
              var d = String(a(i)), p = l(s), f = d.length, v, y;
              return p < 0 || p >= f ? c ? "" : void 0 : (v = d.charCodeAt(p), v < 55296 || v > 56319 || p + 1 === f || (y = d.charCodeAt(p + 1)) < 56320 || y > 57343 ? c ? d.charAt(p) : v : c ? d.slice(p, p + 2) : (v - 55296 << 10) + (y - 56320) + 65536);
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/to-integer */
              "./node_modules/core-js/internals/to-integer.js"
            ), a = Math.max, i = Math.min;
            t.exports = function(s, c) {
              var d = l(s);
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/indexed-object */
              "./node_modules/core-js/internals/indexed-object.js"
            ), a = n(
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
            var n = Math.ceil, l = Math.floor;
            t.exports = function(a) {
              return isNaN(a = +a) ? 0 : (a > 0 ? l : n)(a);
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
          function(t, r, n) {
            var l = n(
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
          function(t, r, n) {
            var l = n(
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            );
            t.exports = function(a, i) {
              if (!l(a))
                return a;
              var s, c;
              if (i && typeof (s = a.toString) == "function" && !l(c = s.call(a)) || typeof (s = a.valueOf) == "function" && !l(c = s.call(a)) || !i && typeof (s = a.toString) == "function" && !l(c = s.call(a)))
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
            var n = 0, l = Math.random();
            t.exports = function(a) {
              return "Symbol(".concat(a === void 0 ? "" : a, ")_", (++n + l).toString(36));
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            ), a = n(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            );
            t.exports = function(i, s) {
              if (a(i), !l(s) && s !== null)
                throw TypeError("Can't set " + String(s) + " as a prototype");
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), a = n(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            ), i = n(
              /*! ../internals/uid */
              "./node_modules/core-js/internals/uid.js"
            ), s = n(
              /*! ../internals/native-symbol */
              "./node_modules/core-js/internals/native-symbol.js"
            ), c = l.Symbol, d = a("wks");
            t.exports = function(p) {
              return d[p] || (d[p] = s && c[p] || (s ? c : i)("Symbol." + p));
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/export */
              "./node_modules/core-js/internals/export.js"
            ), a = n(
              /*! ../internals/array-from */
              "./node_modules/core-js/internals/array-from.js"
            ), i = n(
              /*! ../internals/check-correctness-of-iteration */
              "./node_modules/core-js/internals/check-correctness-of-iteration.js"
            ), s = !i(function(c) {
              Array.from(c);
            });
            l({ target: "Array", stat: !0, forced: s }, {
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
          function(t, r, n) {
            var l = n(
              /*! ../internals/string-at */
              "./node_modules/core-js/internals/string-at.js"
            ), a = n(
              /*! ../internals/internal-state */
              "./node_modules/core-js/internals/internal-state.js"
            ), i = n(
              /*! ../internals/define-iterator */
              "./node_modules/core-js/internals/define-iterator.js"
            ), s = "String Iterator", c = a.set, d = a.getterFor(s);
            i(String, "String", function(p) {
              c(this, {
                type: s,
                string: String(p),
                index: 0
              });
            }, function() {
              var f = d(this), v = f.string, y = f.index, m;
              return y >= v.length ? { value: void 0, done: !0 } : (m = l(v, y, !0), f.index += m.length, { value: m, done: !1 });
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
            var n;
            n = function() {
              return this;
            }();
            try {
              n = n || Function("return this")() || (0, eval)("this");
            } catch {
              typeof window == "object" && (n = window);
            }
            t.exports = n;
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
          function(t, r, n) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var l = Object.assign || function(m) {
              for (var x = 1; x < arguments.length; x++) {
                var w = arguments[x];
                for (var h in w)
                  Object.prototype.hasOwnProperty.call(w, h) && (m[h] = w[h]);
              }
              return m;
            }, a = function() {
              function m(x, w) {
                for (var h = 0; h < w.length; h++) {
                  var _ = w[h];
                  _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(x, _.key, _);
                }
              }
              return function(x, w, h) {
                return w && m(x.prototype, w), h && m(x, h), x;
              };
            }(), i = n(
              /*! classnames/dedupe */
              "./node_modules/classnames/dedupe.js"
            ), s = p(i), c = n(
              /*! ./default-attrs.json */
              "./src/default-attrs.json"
            ), d = p(c);
            function p(m) {
              return m && m.__esModule ? m : { default: m };
            }
            function f(m, x) {
              if (!(m instanceof x))
                throw new TypeError("Cannot call a class as a function");
            }
            var v = function() {
              function m(x, w) {
                var h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
                f(this, m), this.name = x, this.contents = w, this.tags = h, this.attrs = l({}, d.default, { class: "feather feather-" + x });
              }
              return a(m, [{
                key: "toSvg",
                value: function() {
                  var w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, h = l({}, this.attrs, w, { class: (0, s.default)(this.attrs.class, w.class) });
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
              return Object.keys(m).map(function(x) {
                return x + '="' + m[x] + '"';
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
          function(t, r, n) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var l = n(
              /*! ./icon */
              "./src/icon.js"
            ), a = p(l), i = n(
              /*! ../dist/icons.json */
              "./dist/icons.json"
            ), s = p(i), c = n(
              /*! ./tags.json */
              "./src/tags.json"
            ), d = p(c);
            function p(f) {
              return f && f.__esModule ? f : { default: f };
            }
            r.default = Object.keys(s.default).map(function(f) {
              return new a.default(f, s.default[f], d.default[f]);
            }).reduce(function(f, v) {
              return f[v.name] = v, f;
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
          function(t, r, n) {
            var l = n(
              /*! ./icons */
              "./src/icons.js"
            ), a = p(l), i = n(
              /*! ./to-svg */
              "./src/to-svg.js"
            ), s = p(i), c = n(
              /*! ./replace */
              "./src/replace.js"
            ), d = p(c);
            function p(f) {
              return f && f.__esModule ? f : { default: f };
            }
            t.exports = { icons: a.default, toSvg: s.default, replace: d.default };
          }
        ),
        /***/
        "./src/replace.js": (
          /*!************************!*\
            !*** ./src/replace.js ***!
            \************************/
          /*! no static exports found */
          /***/
          function(t, r, n) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var l = Object.assign || function(y) {
              for (var m = 1; m < arguments.length; m++) {
                var x = arguments[m];
                for (var w in x)
                  Object.prototype.hasOwnProperty.call(x, w) && (y[w] = x[w]);
              }
              return y;
            }, a = n(
              /*! classnames/dedupe */
              "./node_modules/classnames/dedupe.js"
            ), i = d(a), s = n(
              /*! ./icons */
              "./src/icons.js"
            ), c = d(s);
            function d(y) {
              return y && y.__esModule ? y : { default: y };
            }
            function p() {
              var y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              if (typeof document > "u")
                throw new Error("`feather.replace()` only works in a browser environment.");
              var m = document.querySelectorAll("[data-feather]");
              Array.from(m).forEach(function(x) {
                return f(x, y);
              });
            }
            function f(y) {
              var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, x = v(y), w = x["data-feather"];
              if (delete x["data-feather"], c.default[w] === void 0) {
                console.warn("feather: '" + w + "' is not a valid icon");
                return;
              }
              var h = c.default[w].toSvg(l({}, m, x, { class: (0, i.default)(m.class, x.class) })), _ = new DOMParser().parseFromString(h, "image/svg+xml"), S = _.querySelector("svg");
              y.parentNode.replaceChild(S, y);
            }
            function v(y) {
              return Array.from(y.attributes).reduce(function(m, x) {
                return m[x.name] = x.value, m;
              }, {});
            }
            r.default = p;
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
          function(t, r, n) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var l = n(
              /*! ./icons */
              "./src/icons.js"
            ), a = i(l);
            function i(c) {
              return c && c.__esModule ? c : { default: c };
            }
            function s(c) {
              var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              if (console.warn("feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead."), !c)
                throw new Error("The required `key` (icon name) parameter is missing.");
              if (!a.default[c])
                throw new Error("No icon matching '" + c + "'. See the complete list of icons at https://feathericons.com");
              return a.default[c].toSvg(d);
            }
            r.default = s;
          }
        ),
        /***/
        0: (
          /*!**************************************************!*\
            !*** multi core-js/es/array/from ./src/index.js ***!
            \**************************************************/
          /*! no static exports found */
          /***/
          function(t, r, n) {
            n(
              /*! core-js/es/array/from */
              "./node_modules/core-js/es/array/from.js"
            ), t.exports = n(
              /*! /home/runner/work/feather/feather/src/index.js */
              "./src/index.js"
            );
          }
        )
        /******/
      })
    );
  });
})(Ua);
var If = Ua.exports;
const or = /* @__PURE__ */ Mf(If), Dl = Object.keys(or.icons), Rf = {
  props: {
    name: {
      type: String,
      required: !0,
      validator(e) {
        const o = Dl.includes(e);
        return o || (console.groupCollapsed(
          "[frappe-ui] name property for feather-icon must be one of "
        ), console.dir(Dl), console.groupEnd()), o;
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
    let e = or.icons[this.name];
    return e || (e = or.icons.circle), ie(
      "svg",
      ee(
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
}, zt = Rf, Pr = /* @__PURE__ */ V({
  __name: "LoadingIndicator",
  props: { scale: { required: !1, default: 100 } },
  setup(e) {
    return (o, t) => (C(), z("svg", {
      class: "max-w-xs animate-spin",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      style: St(`scale: ${e.scale}%;`),
      viewBox: "0 0 24 24"
    }, [...t[0] || (t[0] = [
      j("circle", {
        class: "opacity-25",
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        "stroke-width": "4"
      }, null, -1),
      j("path", {
        class: "opacity-75",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      }, null, -1)
    ])], 4));
  }
}), Df = { class: "rounded bg-surface-gray-7 px-2 py-1 text-xs text-ink-white shadow-xl" }, Lf = /* @__PURE__ */ V({
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
    const o = e, t = P(() => o.hoverDelay * 1e3);
    return (r, n) => e.disabled ? F(r.$slots, "default", { key: 0 }) : (C(), B(u(mf), {
      key: 1,
      delayDuration: t.value
    }, {
      default: q(() => [
        K(u(bf), null, {
          default: q(() => [
            K(u(kf), { "as-child": "" }, {
              default: q(() => [
                F(r.$slots, "default")
              ]),
              _: 3
            }),
            K(u(Of), null, {
              default: q(() => [
                o.text || r.$slots.body || r.$slots.content ? (C(), B(u(Cf), {
                  key: 0,
                  side: o.placement,
                  "side-offset": 4,
                  class: "z-[100]"
                }, {
                  default: q(() => [
                    F(r.$slots, "body", {}, () => [
                      j("div", Df, [
                        F(r.$slots, "content", {}, () => [
                          _e(H(o.text), 1)
                        ])
                      ])
                    ]),
                    K(u(ff), {
                      class: ae(o.arrowClass),
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
}), $f = ["disabled", "ariaLabel", "type"], Vt = /* @__PURE__ */ V({
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
  setup(e, { expose: o }) {
    const t = e, r = Zl(), n = gi(), l = P(() => {
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
      }[t.theme], x = {
        gray: "text-ink-gray-8 bg-transparent hover:bg-surface-gray-3 active:bg-surface-gray-4",
        blue: "text-ink-blue-3 bg-transparent hover:bg-blue-200 active:bg-blue-300",
        green: "text-green-800 bg-transparent hover:bg-green-200 active:bg-green-300",
        red: "text-red-700 bg-transparent hover:bg-surface-red-3 active:bg-surface-red-4"
      }[t.theme], w = {
        gray: "focus-visible:ring focus-visible:ring-outline-gray-3",
        blue: "focus-visible:ring focus-visible:ring-blue-400",
        green: "focus-visible:ring focus-visible:ring-outline-green-2",
        red: "focus-visible:ring focus-visible:ring-outline-red-2"
      }[t.theme], h = {
        subtle: y,
        solid: v,
        outline: m,
        ghost: x
      }[t.variant], _ = `${t.theme}-${t.variant}`, g = {
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
      }[_], b = {
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
        w,
        b
      ];
    }), a = P(() => ({
      sm: "h-4",
      md: "h-4.5",
      lg: "h-5",
      xl: "h-6",
      "2xl": "h-6"
    })[t.size]), i = P(() => t.disabled || t.loading), s = P(() => c.value ? t.label : null), c = P(() => t.icon || r.icon || d.value), d = P(() => {
      var m, x, w;
      if (!r.default)
        return !1;
      const v = r.default();
      if (!Array.isArray(v))
        return !1;
      let y = v[0];
      return !!(typeof ((m = y.type) == null ? void 0 : m.name) == "string" && ((w = (x = y.type) == null ? void 0 : x.name) != null && w.startsWith("lucide-")));
    }), p = () => {
      if (t.route)
        return n.push(t.route);
      if (t.link)
        return window.open(t.link, "_blank");
    }, f = I();
    return o({ rootRef: f }), (v, y) => {
      var m;
      return C(), B(Lf, {
        text: e.tooltip,
        disabled: !((m = e.tooltip) != null && m.length)
      }, {
        default: q(() => [
          j("button", ee(v.$attrs, {
            class: l.value,
            onClick: p,
            disabled: i.value,
            ariaLabel: s.value,
            type: t.type,
            ref_key: "rootRef",
            ref: f
          }), [
            e.loading ? (C(), B(Pr, {
              key: 0,
              class: ae({
                "h-3 w-3": e.size == "sm",
                "h-[13.5px] w-[13.5px]": e.size == "md",
                "h-[15px] w-[15px]": e.size == "lg",
                "h-4.5 w-4.5": e.size == "xl" || e.size == "2xl"
              })
            }, null, 8, ["class"])) : v.$slots.prefix || e.iconLeft ? F(v.$slots, "prefix", { key: 1 }, () => [
              e.iconLeft && typeof e.iconLeft == "string" ? (C(), B(zt, {
                key: 0,
                name: e.iconLeft,
                class: ae(a.value),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : e.iconLeft ? (C(), B(dt(e.iconLeft), {
                key: 1,
                class: ae(a.value)
              }, null, 8, ["class"])) : J("", !0)
            ]) : J("", !0),
            e.loading && e.loadingText ? (C(), z(be, { key: 2 }, [
              _e(H(e.loadingText), 1)
            ], 64)) : c.value && !e.loading ? (C(), z(be, { key: 3 }, [
              e.icon && typeof e.icon == "string" ? (C(), B(zt, {
                key: 0,
                name: e.icon,
                class: ae(a.value),
                "aria-label": e.label
              }, null, 8, ["name", "class", "aria-label"])) : e.icon ? (C(), B(dt(e.icon), {
                key: 1,
                class: ae(a.value)
              }, null, 8, ["class"])) : v.$slots.icon ? F(v.$slots, "icon", { key: 2 }) : d.value ? (C(), z("div", {
                key: 3,
                class: ae(a.value)
              }, [
                F(v.$slots, "default", {}, () => [
                  _e(H(e.label), 1)
                ])
              ], 2)) : J("", !0)
            ], 64)) : (C(), z("span", {
              key: 4,
              class: ae([{ "sr-only": c.value }, "truncate"])
            }, [
              F(v.$slots, "default", {}, () => [
                _e(H(e.label), 1)
              ])
            ], 2)),
            F(v.$slots, "suffix", {}, () => [
              e.iconRight && typeof e.iconRight == "string" ? (C(), B(zt, {
                key: 0,
                name: e.iconRight,
                class: ae(a.value),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : e.iconRight ? (C(), B(dt(e.iconRight), {
                key: 1,
                class: ae(a.value)
              }, null, 8, ["class"])) : J("", !0)
            ])
          ], 16, $f)
        ]),
        _: 3
      }, 8, ["text", "disabled"]);
    };
  }
}), qf = { class: "w-full space-y-1.5" }, Bf = {
  key: 0,
  class: "block text-xs text-ink-gray-5"
}, Ff = ["onClick"], Nf = { class: "flex items-center overflow-hidden" }, Vf = {
  key: 0,
  class: "truncate text-base leading-5 text-ink-gray-8"
}, zf = {
  key: 1,
  class: "text-base leading-5 text-ink-gray-4"
}, Hf = {
  key: 0,
  class: "sticky top-0 z-10 flex items-stretch space-x-1.5 bg-surface-modal py-1.5"
}, Uf = { class: "relative w-full" }, Wf = { class: "absolute right-0 inline-flex h-7 w-7 items-center justify-center" }, Kf = {
  key: 0,
  class: "sticky top-10 truncate bg-surface-modal px-2.5 py-1.5 text-sm font-medium text-ink-gray-5"
}, Gf = { class: "flex flex-1 gap-2 overflow-hidden items-center" }, Yf = {
  key: 0,
  class: "flex flex-shrink-0"
}, Xf = {
  key: 1,
  class: "h-4 w-4"
}, Jf = { class: "flex-1 truncate text-ink-gray-7" }, Zf = {
  key: 0,
  class: "ml-2 flex-shrink-0"
}, Qf = {
  key: 0,
  class: "text-sm text-ink-gray-5"
}, e1 = {
  key: 1,
  class: "rounded-md px-2.5 py-1.5 text-base text-ink-gray-5"
}, t1 = {
  key: 0,
  class: "border-t p-1"
}, n1 = {
  key: 0,
  class: "flex items-center justify-end"
}, o1 = {
  key: 1,
  class: "flex items-center justify-end"
}, r1 = /* @__PURE__ */ V({
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
    compareFn: { type: Function, default: (e, o) => e.value === o.value },
    maxOptions: { default: 50 },
    multiple: { type: Boolean, default: !1 },
    modelValue: { type: [Array, null, String, Number, Boolean, Object] }
  },
  emits: ["update:modelValue", "update:query", "change"],
  setup(e, { expose: o, emit: t }) {
    const r = e, n = t, l = I(), a = I(!1), i = I(""), s = P(() => {
      var M;
      if (!((M = r.options) != null && M.length))
        return [];
      let E;
      return b(r.options[0]) ? E = r.options : E = [
        {
          group: "",
          items: d(r.options),
          hideLabel: !1
        }
      ], E.map(($, L) => ({
        key: L,
        group: $.group,
        hideLabel: $.hideLabel,
        items: p(d($.items || []))
      })).filter(($) => $.items.length > 0);
    }), c = P(() => s.value.flatMap((E) => E.items)), d = (E) => E ? E.map((M) => g(M) ? M : { label: M.toString(), value: M }) : [], p = (E) => i.value ? E.filter((M) => M.label.toLowerCase().includes(i.value.trim().toLowerCase()) || M.value.toString().toLowerCase().includes(i.value.trim().toLowerCase())) : E, f = P({
      get() {
        if (!r.multiple)
          return v(r.modelValue) || // if the modelValue is not found in the option list
          // return the modelValue as is
          y(r.modelValue);
        const E = r.modelValue || [];
        return g(E[0]) ? E : E.map((M) => v(M) || y(M));
      },
      set(E) {
        i.value = "", E && !r.multiple && (a.value = !1), n("update:modelValue", E), n("change", E);
      }
    }), v = (E) => {
      if (!E)
        return E;
      const M = g(E) ? E.value : E;
      return c.value.find(($) => $.value === M);
    }, y = (E) => g(E) ? E : { label: E, value: E }, m = (E) => g(E) ? (E == null ? void 0 : E.label) || (E == null ? void 0 : E.value) : E, x = P(() => f.value ? r.multiple ? f.value.map((E) => m(E)).join(", ") : m(f.value) : ""), w = (E) => {
      if (!f.value)
        return !1;
      const M = g(E) ? E.value : E;
      return r.multiple ? f.value.find(
        ($) => g($) ? $.value === M : $ === M
      ) : f.value === M;
    }, h = P(() => {
      var E;
      return r.multiple ? c.value.length === ((E = f.value) == null ? void 0 : E.length) : !1;
    }), _ = () => {
      f.value = c.value;
    }, S = () => {
      f.value = r.multiple ? [] : void 0;
    }, g = (E) => typeof E == "object", b = (E) => typeof E == "object" && "items" in E && "group" in E;
    pe(
      () => i.value,
      () => {
        n("update:query", i.value);
      }
    ), pe(
      () => a.value,
      () => {
        a.value && ge(() => {
          var E;
          return (E = l.value) == null ? void 0 : E.$el.focus();
        });
      }
    );
    const A = I();
    return o({
      rootRef: A,
      togglePopover: () => {
        a.value = !a.value;
      }
    }), (E, M) => (C(), B(u(gs), {
      modelValue: f.value,
      "onUpdate:modelValue": M[2] || (M[2] = ($) => f.value = $),
      multiple: e.multiple,
      nullable: "",
      by: e.compareFn
    }, {
      default: q(({ open: $ }) => [
        K(u(jf), {
          class: "w-full",
          show: a.value,
          "onUpdate:show": M[1] || (M[1] = (L) => a.value = L),
          ref_key: "rootRef",
          ref: A,
          placement: e.placement,
          "match-target-width": !0
        }, {
          target: q(({ open: L, togglePopover: k, close: N }) => [
            F(E.$slots, "target", Ie(qe({
              open: L,
              close: N,
              togglePopover: k,
              isOpen: $
            })), () => [
              j("div", qf, [
                r.label ? (C(), z("label", Bf, H(r.label), 1)) : J("", !0),
                j("button", {
                  class: ae(["flex h-7 w-full items-center justify-between gap-2 rounded bg-surface-gray-2 px-2 py-1 transition-colors hover:bg-surface-gray-3 border border-transparent focus:border-outline-gray-4 focus:outline-none focus:ring-2 focus:ring-outline-gray-3", { "bg-surface-gray-3": $ }]),
                  onClick: () => k()
                }, [
                  j("div", Nf, [
                    F(E.$slots, "prefix"),
                    x.value ? (C(), z("span", Vf, H(x.value), 1)) : (C(), z("span", zf, H(e.placeholder || ""), 1)),
                    F(E.$slots, "suffix")
                  ]),
                  K(zt, {
                    name: "chevron-down",
                    class: "h-4 w-4 text-ink-gray-5",
                    "aria-hidden": "true"
                  })
                ], 10, Ff)
              ])
            ])
          ]),
          body: q(({ isOpen: L, togglePopover: k }) => [
            Pe(j("div", null, [
              j("div", {
                class: ae(["relative mt-1 rounded-lg bg-surface-modal text-base shadow-2xl", e.bodyClasses])
              }, [
                K(u(xs), {
                  class: ae(["max-h-[15rem] overflow-y-auto px-1.5 pb-1.5", { "pt-1.5": e.hideSearch }]),
                  static: ""
                }, {
                  default: q(() => [
                    e.hideSearch ? J("", !0) : (C(), z("div", Hf, [
                      j("div", Uf, [
                        K(u(bs), {
                          ref_key: "searchInput",
                          ref: l,
                          class: "form-input w-full focus:bg-surface-gray-3 hover:bg-surface-gray-4 text-ink-gray-8",
                          type: "text",
                          value: i.value,
                          onChange: M[0] || (M[0] = (N) => i.value = N.target.value),
                          autocomplete: "off",
                          placeholder: "Search"
                        }, null, 8, ["value"]),
                        j("div", Wf, [
                          r.loading ? (C(), B(Pr, {
                            key: 0,
                            class: "h-4 w-4 text-ink-gray-5"
                          })) : (C(), z("button", {
                            key: 1,
                            onClick: S
                          }, [
                            K(zt, {
                              name: "x",
                              class: "w-4 text-ink-gray-8"
                            })
                          ]))
                        ])
                      ])
                    ])),
                    (C(!0), z(be, null, pt(s.value, (N) => Pe((C(), z("div", {
                      key: N.key
                    }, [
                      N.group && !N.hideLabel ? (C(), z("div", Kf, H(N.group), 1)) : J("", !0),
                      (C(!0), z(be, null, pt(N.items.slice(
                        0,
                        r.maxOptions
                      ), (U, oe) => (C(), B(u(ws), {
                        as: "template",
                        key: oe,
                        value: U,
                        disabled: U.disabled
                      }, {
                        default: q(({ active: ne, selected: se }) => [
                          j("li", {
                            class: ae([
                              "flex cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-base",
                              {
                                "bg-surface-gray-3": ne,
                                "opacity-50": U.disabled
                              }
                            ])
                          }, [
                            j("div", Gf, [
                              E.$slots["item-prefix"] || r.multiple ? (C(), z("div", Yf, [
                                F(E.$slots, "item-prefix", ee({ ref_for: !0 }, { active: ne, selected: se, option: U }), () => [
                                  w(U) ? (C(), B(zt, {
                                    key: 0,
                                    name: "check",
                                    class: "h-4 w-4 text-ink-gray-7"
                                  })) : (C(), z("div", Xf))
                                ])
                              ])) : J("", !0),
                              j("span", Jf, H(m(U)), 1)
                            ]),
                            E.$slots["item-suffix"] || U != null && U.description ? (C(), z("div", Zf, [
                              F(E.$slots, "item-suffix", ee({ ref_for: !0 }, { active: ne, selected: se, option: U }), () => [
                                U != null && U.description ? (C(), z("div", Qf, H(U.description), 1)) : J("", !0)
                              ])
                            ])) : J("", !0)
                          ], 2)
                        ]),
                        _: 2
                      }, 1032, ["value", "disabled"]))), 128))
                    ])), [
                      [Zr, N.items.length > 0]
                    ])), 128)),
                    s.value.length == 0 ? (C(), z("li", e1, " No results found ")) : J("", !0)
                  ]),
                  _: 3
                }, 8, ["class"]),
                E.$slots.footer || r.showFooter || e.multiple ? (C(), z("div", t1, [
                  F(E.$slots, "footer", Ie(qe({ togglePopover: k })), () => [
                    e.multiple ? (C(), z("div", n1, [
                      h.value ? J("", !0) : (C(), B(u(Vt), {
                        key: 0,
                        label: "Select All",
                        onClick: xe(_, ["stop"])
                      })),
                      h.value ? (C(), B(u(Vt), {
                        key: 1,
                        label: "Clear All",
                        onClick: xe(S, ["stop"])
                      })) : J("", !0)
                    ])) : (C(), z("div", o1, [
                      K(u(Vt), {
                        label: "Clear",
                        onClick: xe(S, ["stop"])
                      })
                    ]))
                  ])
                ])) : J("", !0)
              ], 2)
            ], 512), [
              [Zr, L]
            ])
          ]),
          _: 2
        }, 1032, ["show", "placement"])
      ]),
      _: 3
    }, 8, ["modelValue", "multiple", "by"]));
  }
}), l1 = {
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
function a1(e, o) {
  return C(), z("svg", l1, [...o[0] || (o[0] = [
    j("path", { d: "M20 6 9 17l-5-5" }, null, -1)
  ])]);
}
const rr = sn({ name: "lucide-check", render: a1 }), i1 = {
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
function s1(e, o) {
  return C(), z("svg", i1, [...o[0] || (o[0] = [
    j("path", { d: "m6 9 6 6 6-6" }, null, -1)
  ])]);
}
const Wa = sn({ name: "lucide-chevron-down", render: s1 }), u1 = /* @__PURE__ */ V({
  __name: "Badge",
  props: {
    theme: { default: "gray" },
    size: { default: "md" },
    variant: { default: "subtle" },
    label: {}
  },
  setup(e) {
    const o = e, t = P(() => {
      let r = {
        gray: "text-ink-white bg-surface-gray-7",
        blue: "text-ink-blue-1 bg-surface-blue-2",
        green: "text-ink-green-1 bg-surface-green-3",
        orange: "text-ink-amber-1 bg-surface-amber-2",
        red: "text-ink-red-1 bg-surface-red-4"
      }[o.theme], n = {
        gray: "text-ink-gray-6 bg-surface-gray-2",
        blue: "text-ink-blue-2 bg-surface-blue-2",
        green: "text-ink-green-3 bg-surface-green-2",
        orange: "text-ink-amber-3 bg-surface-amber-1",
        red: "text-ink-red-4 bg-surface-red-2"
      }[o.theme], l = {
        gray: "text-ink-gray-6 bg-transparent border border-outline-gray-1",
        blue: "text-ink-blue-2 bg-transparent border border-outline-blue-1",
        green: "text-ink-green-3 bg-transparent border border-outline-green-2",
        orange: "text-ink-amber-3 bg-transparent border border-outline-amber-2",
        red: "text-ink-red-4 bg-transparent border border-outline-red-2"
      }[o.theme], a = {
        gray: "text-ink-gray-6 bg-transparent",
        blue: "text-ink-blue-2 bg-transparent",
        green: "text-ink-green-3 bg-transparent",
        orange: "text-ink-amber-3 bg-transparent",
        red: "text-ink-red-4 bg-transparent"
      }[o.theme], i = {
        subtle: n,
        solid: r,
        outline: l,
        ghost: a
      }[o.variant], s = {
        sm: "h-4 text-xs px-1.5",
        md: "h-5 text-xs px-1.5",
        lg: "h-6 text-sm px-2",
        xl: "h-7 text-base px-2"
      }[o.size];
      return [i, s];
    });
    return (r, n) => (C(), z("div", {
      class: ae(["inline-flex select-none items-center gap-1 rounded-full whitespace-nowrap", t.value])
    }, [
      r.$slots.prefix ? (C(), z("div", {
        key: 0,
        class: ae([o.size == "lg" ? "max-h-6" : "max-h-4"])
      }, [
        F(r.$slots, "prefix")
      ], 2)) : J("", !0),
      F(r.$slots, "default", {}, () => {
        var l;
        return [
          _e(H((l = o.label) == null ? void 0 : l.toString()), 1)
        ];
      }),
      r.$slots.suffix ? (C(), z("div", {
        key: 1,
        class: ae([o.size == "lg" ? "max-h-6" : "max-h-4"])
      }, [
        F(r.$slots, "suffix")
      ], 2)) : J("", !0)
    ], 2));
  }
});
let d1 = 0;
function c1() {
  return ++d1;
}
function Mr() {
  return "frappe-ui-" + c1();
}
const p1 = { class: "flex flex-col gap-1" }, f1 = { class: "flex items-center" }, v1 = ["for"], y1 = {
  key: 0,
  class: "max-w-xs text-p-sm text-ink-gray-7"
}, Ll = "mr-2 h-4 w-4 flex-shrink-0 text-ink-gray-6", it = /* @__PURE__ */ V({
  __name: "Switch",
  props: /* @__PURE__ */ Ko({
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
  emits: /* @__PURE__ */ Ko(["change"], ["update:modelValue"]),
  setup(e, { emit: o }) {
    const t = e, r = Ql(e, "modelValue"), n = o;
    pe(r, (d) => {
      n("change", d);
    });
    const l = Mr(), a = P(() => [
      "relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-100 ease-in-out items-center",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3",
      "disabled:cursor-not-allowed disabled:bg-surface-gray-3",
      r.value ? "bg-surface-gray-7 enabled:hover:bg-surface-gray-6 active:bg-surface-gray-5 group-hover:enabled:bg-surface-gray-6" : "bg-surface-gray-4 enabled:hover:bg-gray-400 active:bg-gray-500 group-hover:enabled:bg-gray-400",
      t.size === "md" ? "h-5 w-8 border-[3px]" : "h-4 w-[26px] border-2"
    ]), i = P(() => [
      "pointer-events-none inline-block transform rounded-full bg-surface-white shadow ring-0 transition duration-100 ease-in-out",
      t.size === "md" ? "h-3.5 w-3.5" : "h-3 w-3",
      t.size === "md" ? r.value ? "translate-x-3 rtl:-translate-x-3" : "translate-x-0" : r.value ? "translate-x-2.5 rtl:-translate-x-2.5" : "translate-x-0"
    ]), s = P(() => [
      "font-medium leading-normal",
      t.disabled && !t.description ? "text-ink-gray-4" : "text-ink-gray-8",
      t.size === "md" ? "text-lg" : "text-base",
      t.labelClasses
    ]), c = P(() => {
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
    return (d, p) => (C(), z("div", {
      class: ae(c.value)
    }, [
      j("div", p1, [
        j("div", f1, [
          t.icon && typeof t.icon == "string" ? (C(), B(zt, {
            key: 0,
            name: t.icon,
            class: ae(Ll),
            "aria-hidden": "true"
          }, null, 8, ["name"])) : t.icon ? (C(), B(dt(t.icon), {
            key: 1,
            class: ae(Ll)
          })) : J("", !0),
          j("label", {
            class: ae(s.value),
            for: u(l)
          }, H(t.label), 11, v1)
        ]),
        t.description ? (C(), z("span", y1, H(t.description), 1)) : J("", !0)
      ]),
      K(u(zp), {
        id: u(l),
        modelValue: r.value,
        "onUpdate:modelValue": p[0] || (p[0] = (f) => r.value = f),
        onKeyup: p[1] || (p[1] = Pt(xe((f) => r.value = !r.value, ["self"]), ["space"])),
        class: ae(a.value),
        disabled: t.disabled
      }, {
        default: q(() => [
          K(u(Up), {
            class: ae(i.value)
          }, null, 8, ["class"])
        ]),
        _: 1
      }, 8, ["id", "modelValue", "class", "disabled"])
    ], 2));
  }
}), Ka = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [r, n] of o)
    t[r] = n;
  return t;
}, m1 = { class: "relative" }, h1 = { class: "flex items-center gap-2 flex-1 overflow-hidden" }, g1 = { class: "flex items-center gap-2 pr-6 flex-1" }, b1 = { class: "flex items-center gap-2 pr-6 flex-1" }, x1 = /* @__PURE__ */ V({
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
  setup(e, { expose: o, emit: t }) {
    const r = e, n = t, l = I(g(r.modelValue)), a = I(r.modelValue), i = I(!1), s = I(!1), c = I("");
    pe(
      () => r.modelValue,
      (D) => {
        a.value = D, l.value = g(D);
      }
    ), pe(
      () => g(r.modelValue),
      (D) => {
        s.value || (l.value = D);
      }
    );
    const d = (D) => {
      const Z = D && S.value.find((G) => m(G) === D) || null;
      if (Z && f(Z)) {
        const G = { searchTerm: c.value };
        Z.onClick(G), Z.keepOpen ? setTimeout(() => {
          i.value = !0;
        }, 0) : (i.value = !1, l.value = g(a.value), c.value = "", s.value = !1);
        return;
      }
      a.value = D, n("update:modelValue", D), l.value = g(D), c.value = "", s.value = !1, n("update:selectedOption", Z);
    };
    function p(D) {
      return typeof D == "object" && "group" in D;
    }
    function f(D) {
      return typeof D == "object" && D.type === "custom";
    }
    function v(D) {
      return typeof D == "string" ? D : D.label;
    }
    function y(D) {
      if (typeof D == "string")
        return D;
      if (!f(D))
        return D.value;
    }
    function m(D) {
      return typeof D == "string" ? D : f(D) ? D.key : D.value;
    }
    function x(D) {
      return typeof D == "object" && !!D.disabled;
    }
    function w(D) {
      return typeof D == "object" ? D.icon : void 0;
    }
    function h(D) {
      return f(D) ? D.slotName : void 0;
    }
    function _(D) {
      return f(D) ? D.render : void 0;
    }
    const S = P(() => {
      const D = [];
      return r.options.forEach((Z) => {
        p(Z) ? D.push(...Z.options) : D.push(Z);
      }), D;
    });
    function g(D) {
      if (!D)
        return "";
      const G = r.options.flatMap(
        (fe) => p(fe) ? fe.options : fe
      ).find((fe) => m(fe) === D);
      return G ? v(G) : D || "";
    }
    const b = P(() => a.value ? S.value.find(
      (D) => m(D) === a.value
    ) : null), A = P(() => b.value ? w(b.value) : void 0), T = (D) => {
      if (!D.icon)
        return null;
      const Z = typeof D.icon == "string" ? ie("span", D.icon) : ie(D.icon, { class: "w-4 h-4" });
      return ie(
        "span",
        {
          class: "flex-shrink-0 w-4 h-4 inline-flex items-center justify-center"
        },
        [Z]
      );
    }, E = (D, Z, G) => {
      var ue;
      if (f(D))
        return D.condition ? D.condition(G) : Z ? v(D).toLowerCase().includes(Z.toLowerCase()) : !0;
      if (!Z)
        return !0;
      const fe = v(D).toLowerCase(), re = ((ue = y(D)) == null ? void 0 : ue.toLowerCase()) || "", ye = Z.toLowerCase();
      return fe.includes(ye) || re.includes(ye);
    }, M = (D, Z) => {
      const G = { searchTerm: Z }, fe = [];
      return D.forEach((re) => {
        if (p(re)) {
          const ye = re.options.filter(
            (ue) => E(ue, Z, G)
          );
          ye.length > 0 && fe.push({ ...re, options: ye });
        } else
          E(re, Z, G) && fe.push(re);
      }), fe;
    }, $ = P(() => i.value && !s.value && a.value ? r.options : M(r.options, l.value)), L = (D) => {
      const Z = D.target;
      l.value = Z.value, c.value = Z.value, s.value = !0, l.value === "" && (a.value = null, n("update:modelValue", null)), n("input", l.value);
    }, k = (D) => {
      i.value = D, D || (l.value = g(a.value)), s.value = !1;
    }, N = (D) => {
      r.openOnFocus && (i.value = !0), n("focus", D);
    }, U = (D) => {
      n("blur", D);
    }, oe = () => {
      r.openOnClick && (i.value = !0);
    }, ne = () => {
      l.value = "", s.value = !1, a.value = null, n("update:modelValue", null), n("update:selectedOption", null);
    }, se = P(() => {
      const D = "border focus-within:border-outline-gray-4 focus-within:ring-2 focus-within:ring-outline-gray-3";
      return {
        subtle: `${D} bg-surface-gray-2 hover:bg-surface-gray-3 border-transparent`,
        outline: `${D} border-outline-gray-2`,
        ghost: ""
      }[r.variant];
    });
    return o({
      reset: ne
    }), (D, Z) => (C(), z("div", m1, [
      K(u(xc), {
        "model-value": a.value,
        "onUpdate:modelValue": d,
        "onUpdate:open": k,
        "ignore-filter": !0,
        open: i.value
      }, {
        default: q(() => [
          K(u(Qd), {
            class: ae(["flex h-7 w-full items-center justify-between gap-2 rounded px-2 py-1 transition-colors", {
              "opacity-50 pointer-events-none": e.disabled,
              [se.value]: !0
            }]),
            onClick: oe
          }, {
            default: q(() => [
              j("div", h1, [
                F(D.$slots, "prefix"),
                A.value ? (C(), B(T, {
                  key: 0,
                  icon: A.value
                }, null, 8, ["icon"])) : J("", !0),
                K(u(Mc), {
                  value: l.value,
                  onInput: L,
                  onFocus: N,
                  onBlur: U,
                  class: "bg-transparent p-0 focus:outline-0 border-0 focus:border-0 focus:ring-0 text-base text-ink-gray-8 h-full placeholder:text-ink-gray-4 w-full",
                  placeholder: e.placeholder || "",
                  disabled: e.disabled,
                  autocomplete: "off"
                }, null, 8, ["value", "placeholder", "disabled"])
              ]),
              K(u(Fc), { disabled: e.disabled }, {
                default: q(() => [
                  K(u(Wa), { class: "h-4 w-4 text-ink-gray-5" })
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            _: 3
          }, 8, ["class"]),
          K(u(qc), null, {
            default: q(() => [
              K(u(Ac), {
                class: "z-10 min-w-[--reka-combobox-trigger-width] mt-1 bg-surface-modal overflow-hidden rounded-lg shadow-2xl",
                position: "popper",
                onOpenAutoFocus: Z[0] || (Z[0] = xe(() => {
                }, ["prevent"])),
                onCloseAutoFocus: Z[1] || (Z[1] = xe(() => {
                }, ["prevent"])),
                align: r.placement || "start"
              }, {
                default: q(() => [
                  K(u(Vc), {
                    class: ae(["max-h-60 overflow-auto pb-1.5", { "px-1.5 pt-1.5": !p($.value[0]) }])
                  }, {
                    default: q(() => [
                      K(u(Ec), { class: "text-ink-gray-5 text-base text-center py-1.5 px-2.5" }, {
                        default: q(() => [
                          _e(' No results found for "' + H(l.value) + '" ', 1)
                        ]),
                        _: 1
                      }),
                      (C(!0), z(be, null, pt($.value, (G, fe) => (C(), z(be, { key: fe }, [
                        p(G) ? (C(), B(u(jc), {
                          key: 0,
                          class: "px-1.5"
                        }, {
                          default: q(() => [
                            K(u(Lc), { class: "px-2.5 pt-3 pb-1.5 text-sm font-medium text-ink-gray-5 sticky top-0 bg-surface-modal z-10" }, {
                              default: q(() => [
                                _e(H(G.group), 1)
                              ]),
                              _: 2
                            }, 1024),
                            (C(!0), z(be, null, pt(G.options, (re, ye) => (C(), B(u(jl), {
                              key: `${fe}-${ye}`,
                              value: m(re),
                              disabled: x(re),
                              class: "text-base leading-none text-ink-gray-7 rounded flex items-center h-7 px-2.5 py-1.5 relative select-none data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-surface-gray-3"
                            }, {
                              default: q(() => [
                                h(re) ? F(D.$slots, h(re), {
                                  key: 0,
                                  option: re,
                                  searchTerm: l.value
                                }) : _(re) ? (C(), B(dt(_(re)), { key: 1 })) : (C(), z(be, { key: 2 }, [
                                  j("span", g1, [
                                    K(T, {
                                      icon: w(re)
                                    }, null, 8, ["icon"]),
                                    _e(" " + H(v(re)), 1)
                                  ]),
                                  K(u(Pl), { class: "absolute right-0 w-6 inline-flex items-center justify-center" }, {
                                    default: q(() => [
                                      K(u(rr), { class: "size-4" })
                                    ]),
                                    _: 1
                                  })
                                ], 64))
                              ]),
                              _: 2
                            }, 1032, ["value", "disabled"]))), 128))
                          ]),
                          _: 2
                        }, 1024)) : (C(), B(u(jl), {
                          key: fe,
                          value: m(G),
                          disabled: x(G),
                          class: "text-base leading-none text-ink-gray-7 rounded flex items-center h-7 px-2.5 py-1.5 relative select-none data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-surface-gray-3"
                        }, {
                          default: q(() => [
                            h(G) ? F(D.$slots, h(G), {
                              key: 0,
                              option: G,
                              searchTerm: l.value
                            }) : _(G) ? (C(), B(dt(_(G)), { key: 1 })) : (C(), z(be, { key: 2 }, [
                              j("span", b1, [
                                w(G) ? (C(), B(T, {
                                  key: 0,
                                  icon: w(G)
                                }, null, 8, ["icon"])) : J("", !0),
                                _e(" " + H(v(G)), 1)
                              ]),
                              K(u(Pl), { class: "absolute right-0 w-6 inline-flex items-center justify-center" }, {
                                default: q(() => [
                                  K(u(rr), { class: "h-4 w-4" })
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
}), w1 = ["disabled", "id", "checked"], _1 = ["for"], S1 = /* @__PURE__ */ V({
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
    const o = e, t = ro(), r = o.id ?? Mr(), n = P(() => [
      {
        sm: "text-base font-medium",
        md: "text-lg font-medium"
      }[o.size],
      o.disabled ? "text-ink-gray-4" : "text-ink-gray-8",
      "select-none"
    ]), l = P(() => {
      let a = o.disabled ? "border-outline-gray-2 bg-surface-menu-bar text-ink-gray-3" : "border-outline-gray-4 text-ink-gray-9 hover:border-outline-gray-5 focus:ring-offset-0 focus:border-outline-gray-8 active:border-outline-gray-6 transition", i = o.disabled ? "" : o.padding ? "focus:ring-0" : "hover:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3 active:bg-surface-gray-2", s = {
        sm: "w-3.5 h-3.5",
        md: "w-4 h-4"
      }[o.size];
      return [a, i, s];
    });
    return (a, i) => (C(), z("div", {
      class: ae(["inline-flex space-x-2 rounded transition", {
        "px-2.5 py-1.5": e.padding && e.size === "sm",
        "px-3 py-2": e.padding && e.size === "md",
        "focus-within:bg-surface-gray-2 focus-within:ring-2 focus-within:ring-outline-gray-3 hover:bg-surface-gray-3 active:bg-surface-gray-4": e.padding && !e.disabled
      }])
    }, [
      j("input", ee({
        class: ["rounded-sm mt-[1px] bg-surface-white", l.value],
        type: "checkbox",
        disabled: e.disabled,
        id: u(r),
        checked: !!e.modelValue,
        onChange: i[0] || (i[0] = (s) => a.$emit("update:modelValue", s.target.checked))
      }, u(t)), null, 16, w1),
      e.label ? (C(), z("label", {
        key: 0,
        class: ae(["block", n.value]),
        for: u(r)
      }, H(e.label), 11, _1)) : J("", !0)
    ], 2));
  }
}), C1 = ["type", "placeholder", "disabled", "id", "value", "required"], A1 = /* @__PURE__ */ V({
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
  setup(e, { expose: o, emit: t }) {
    const r = e, n = t, l = Zl(), a = ro(), i = P(() => Object.fromEntries(
      // class and style is passed to the root element
      Object.entries(a).filter(([m]) => m !== "class" && m !== "style")
    )), s = I(null);
    o({ el: s });
    const c = P(() => r.disabled ? "text-ink-gray-5" : "text-ink-gray-8"), d = P(() => {
      let m = {
        sm: "text-base rounded h-7",
        md: "text-base rounded h-8",
        lg: "text-lg rounded-md h-10",
        xl: "text-xl rounded-md h-10"
      }[r.size], x = {
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
      }[r.size], w = r.disabled ? "disabled" : r.variant, h = {
        subtle: "border border-[--surface-gray-2] bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        outline: "border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        disabled: [
          "border bg-surface-gray-1 placeholder-ink-gray-3",
          r.variant === "outline" ? "border-outline-gray-2" : "border-transparent"
        ],
        ghost: "border-0 focus:ring-0 focus-visible:ring-0"
      }[w];
      return [
        m,
        x,
        h,
        c.value,
        "transition-colors w-full dark:[color-scheme:dark]"
      ];
    });
    let p = P(() => ({
      sm: "pl-2",
      md: "pl-2.5",
      lg: "pl-3",
      xl: "pl-3"
    })[r.size]), f = P(() => ({
      sm: "pr-2",
      md: "pr-2.5",
      lg: "pr-3",
      xl: "pr-3"
    })[r.size]), v = (m) => {
      n("update:modelValue", m);
    };
    r.debounce && (v = ea(v, r.debounce));
    let y = (m) => {
      v(m.target.value);
    };
    return (m, x) => (C(), z("div", {
      class: ae(["relative flex items-center", u(a).class]),
      style: St(u(a).style)
    }, [
      m.$slots.prefix ? (C(), z("div", {
        key: 0,
        class: ae([
          "absolute inset-y-0 left-0 flex items-center",
          c.value,
          u(p)
        ])
      }, [
        F(m.$slots, "prefix")
      ], 2)) : J("", !0),
      j("input", ee({
        ref_key: "inputRef",
        ref: s,
        type: e.type,
        placeholder: e.placeholder,
        class: d.value,
        disabled: e.disabled,
        id: e.id,
        value: e.modelValue,
        required: e.required,
        onInput: x[0] || (x[0] = //@ts-ignore
        (...w) => u(y) && u(y)(...w)),
        onChange: x[1] || (x[1] = //@ts-ignore
        (...w) => u(y) && u(y)(...w))
      }, i.value), null, 16, C1),
      m.$slots.suffix ? (C(), z("div", {
        key: 1,
        class: ae([
          "absolute inset-y-0 right-0 flex items-center",
          c.value,
          u(f)
        ])
      }, [
        F(m.$slots, "suffix")
      ], 2)) : J("", !0)
    ], 6));
  }
}), O1 = /* @__PURE__ */ V({
  __name: "Select",
  props: /* @__PURE__ */ Ko({
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
    const o = Ql(e, "modelValue"), t = e, r = P(() => ({
      sm: "text-base",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    })[t.size]), n = P(() => ({
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
    const a = P(() => {
      let s = t.disabled ? "disabled" : t.variant, c = {
        subtle: "border border-[--surface-gray-2] bg-surface-gray-2 hover:border-outline-gray-modals hover:bg-surface-gray-3",
        outline: "border border-outline-gray-2 bg-surface-white hover:border-outline-gray-3",
        ghost: "bg-transparent border-transparent hover:bg-surface-gray-3 focus:bg-surface-gray-3",
        disabled: [
          "border",
          t.variant !== "ghost" ? "bg-surface-gray-1" : "",
          t.variant === "outline" ? "border-outline-gray-2" : "border-transparent"
        ]
      }[s];
      return [
        l,
        r.value,
        n.value,
        c,
        "transition-colors w-full focus:ring-2 data-[state=open]:ring-2 ring-outline-gray-3 "
      ];
    }), i = P(() => {
      var d, p, f;
      const s = typeof ((d = t.options) == null ? void 0 : d[0]) == "string", c = (p = t.options) == null ? void 0 : p.map((v) => ({ label: v, value: v }));
      return ((f = s ? c : t.options) == null ? void 0 : f.filter((v) => v && String(v.value))) || [];
    });
    return (s, c) => (C(), B(u(sp), {
      modelValue: o.value,
      "onUpdate:modelValue": c[0] || (c[0] = (d) => o.value = d)
    }, {
      default: q(() => [
        K(u(Dp), {
          class: ae(["inline-flex items-center gap-2 outline-none text-base text-ink-gray-7 data-[placeholder]:text-ink-gray-4 data-[disabled]:text-ink-gray-4", [a.value, s.$attrs.class]]),
          "aria-label": "Customise options",
          disabled: e.disabled
        }, {
          default: q(() => [
            F(s.$slots, "prefix", {}, void 0, !0),
            K(u($p), {
              placeholder: e.placeholder,
              class: "truncate"
            }, null, 8, ["placeholder"]),
            F(s.$slots, "suffix", {}, () => [
              K(u(Wa), { class: "size-4 text-ink-gray-4 ml-auto shrink-0" })
            ], !0)
          ]),
          _: 3
        }, 8, ["class", "disabled"]),
        K(u(Ip), null, {
          default: q(() => [
            K(u(Cp), { class: "bg-surface-modal ring-1 ring-black ring-opacity-5 rounded-lg shadow-2xl will-change-[opacity,transform] z-[100] overflow-hidden origin-center data-[state=open]:animate-[fadeInScale_100ms] data-[state=closed]:animate-[fadeOutScale_100ms]" }, {
              default: q(() => [
                K(u(Bp), { class: "p-1 flex flex-col" }, {
                  default: q(() => [
                    (C(!0), z(be, null, pt(i.value, (d) => (C(), B(u(Ep), {
                      disabled: d.disabled,
                      key: d.value,
                      value: d.value,
                      class: ae([[u(l), n.value, r.value], "text-base text-ink-gray-9 flex items-center data-[highlighted]:bg-surface-gray-2 border-0 data-[state=checked]:bg-surface-gray-2 data-[disabled]:text-ink-gray-4 select-none"])
                    }, {
                      default: q(() => [
                        K(u(Pp), null, {
                          default: q(() => [
                            F(s.$slots, "option", ee({ ref_for: !0 }, { option: d }), () => [
                              _e(H(d.label), 1)
                            ], !0)
                          ]),
                          _: 2
                        }, 1024),
                        K(u(Tp), {
                          as: u(rr),
                          class: "size-4 ml-auto"
                        }, null, 8, ["as"])
                      ]),
                      _: 2
                    }, 1032, ["disabled", "value", "class"]))), 128)),
                    F(s.$slots, "footer", {}, void 0, !0)
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
const E1 = /* @__PURE__ */ Ka(O1, [["__scopeId", "data-v-74c206f0"]]), k1 = { class: "space-y-1.5" }, T1 = ["for"], j1 = ["placeholder", "disabled", "id", "value", "rows"], P1 = /* @__PURE__ */ V({
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
  setup(e, { expose: o, emit: t }) {
    const r = e, n = t, l = ro(), a = I(null), i = P(() => {
      let p = {
        sm: "text-base rounded",
        md: "text-base rounded",
        lg: "text-lg rounded-md",
        xl: "text-xl rounded-md"
      }[r.size], f = {
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
        p,
        f,
        y,
        r.disabled ? "text-ink-gray-5" : "text-ink-gray-8",
        "transition-colors w-full block"
      ];
    }), s = P(() => [
      {
        sm: "text-xs",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl"
      }[r.size],
      "text-ink-gray-5"
    ]);
    let c = (p) => {
      n("update:modelValue", p);
    };
    r.debounce && (c = ea(c, r.debounce));
    let d = (p) => {
      c(p.target.value);
    };
    return o({ el: a }), (p, f) => (C(), z("div", k1, [
      e.label ? (C(), z("label", {
        key: 0,
        class: ae(["block", s.value]),
        for: e.id
      }, H(e.label), 11, T1)) : J("", !0),
      j("textarea", ee({
        ref_key: "textareaRef",
        ref: a,
        placeholder: e.placeholder,
        class: i.value,
        disabled: e.disabled,
        id: e.id,
        value: e.modelValue,
        rows: e.rows,
        onInput: f[0] || (f[0] = //@ts-ignore
        (...v) => u(d) && u(d)(...v)),
        onChange: f[1] || (f[1] = //@ts-ignore
        (...v) => u(d) && u(d)(...v))
      }, u(l)), null, 16, j1)
    ]));
  }
}), M1 = ["for"], I1 = /* @__PURE__ */ V({
  __name: "FormLabel",
  props: {
    label: {},
    size: { default: "sm" },
    id: {},
    required: { type: Boolean }
  },
  setup(e) {
    const o = e, t = P(() => [
      {
        sm: "text-xs",
        md: "text-base"
      }[o.size],
      "text-ink-gray-5"
    ]);
    return (r, n) => (C(), z("label", {
      class: ae(["block", t.value]),
      for: e.id
    }, [
      _e(H(e.label) + " ", 1),
      e.required ? (C(), z(be, { key: 0 }, [
        n[0] || (n[0] = j("span", {
          class: "text-ink-red-3 select-none",
          "aria-hidden": "true"
        }, "*", -1)),
        n[1] || (n[1] = j("span", { class: "sr-only" }, "(required)", -1))
      ], 64)) : J("", !0)
    ], 10, M1));
  }
}), R1 = {
  inheritAttrs: !1
}, kt = /* @__PURE__ */ V({
  ...R1,
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
    const o = Mr(), t = e, r = ro(), n = P(() => {
      let a = {};
      for (let i in r)
        i !== "class" && i !== "style" && (a[i] = r[i]);
      return a;
    }), l = P(() => [
      {
        sm: "text-xs",
        md: "text-base"
      }[t.size],
      "text-ink-gray-5"
    ]);
    return (a, i) => e.type != "checkbox" ? (C(), z("div", {
      key: 0,
      class: ae(["space-y-1.5", u(r).class]),
      style: St(u(r).style)
    }, [
      e.label ? (C(), B(I1, {
        key: 0,
        label: e.label,
        size: e.size,
        id: u(o),
        required: e.required
      }, null, 8, ["label", "size", "id", "required"])) : J("", !0),
      e.type === "select" ? (C(), B(u(E1), ee({
        key: 1,
        id: u(o)
      }, { ...n.value, size: e.size, variant: e.variant }), Nn({ _: 2 }, [
        a.$slots.prefix ? {
          name: "prefix",
          fn: q(() => [
            F(a.$slots, "prefix")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["id"])) : e.type === "combobox" ? (C(), B(u(x1), ee({
        key: 2,
        id: u(o)
      }, { ...n.value, variant: e.variant }), Nn({ _: 2 }, [
        a.$slots.prefix ? {
          name: "prefix",
          fn: q(() => [
            F(a.$slots, "prefix")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["id"])) : e.type === "autocomplete" ? (C(), B(u(r1), Ie(ee({ key: 3 }, { ...n.value })), Nn({ _: 2 }, [
        a.$slots.prefix ? {
          name: "prefix",
          fn: q(() => [
            F(a.$slots, "prefix")
          ]),
          key: "0"
        } : void 0,
        a.$slots["item-prefix"] ? {
          name: "item-prefix",
          fn: q((s) => [
            F(a.$slots, "item-prefix", Ie(qe(s)))
          ]),
          key: "1"
        } : void 0
      ]), 1040)) : e.type === "textarea" ? (C(), B(u(P1), ee({
        key: 4,
        id: u(o)
      }, { ...n.value, size: e.size, variant: e.variant }), null, 16, ["id"])) : (C(), B(u(A1), ee({
        key: 5,
        id: u(o)
      }, { ...n.value, type: e.type, size: e.size, variant: e.variant, required: e.required }), Nn({ _: 2 }, [
        a.$slots.prefix ? {
          name: "prefix",
          fn: q(() => [
            F(a.$slots, "prefix")
          ]),
          key: "0"
        } : void 0,
        a.$slots.suffix ? {
          name: "suffix",
          fn: q(() => [
            F(a.$slots, "suffix")
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["id"])),
      F(a.$slots, "description", {}, () => [
        e.description ? (C(), z("p", {
          key: 0,
          class: ae(l.value)
        }, H(e.description), 3)) : J("", !0)
      ])
    ], 6)) : (C(), B(u(S1), ee({
      key: 1,
      id: u(o)
    }, { ...n.value, label: e.label, size: e.size, class: u(r).class }), null, 16, ["id"]));
  }
}), D1 = {
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
function L1(e, o) {
  return C(), z("svg", D1, [...o[0] || (o[0] = [
    j("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }, null, -1),
    j("path", { d: "M12 9v4" }, null, -1),
    j("path", { d: "M12 17h.01" }, null, -1)
  ])]);
}
const $1 = sn({ name: "lucide-alert-triangle", render: L1 }), q1 = {}, B1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 16 16"
};
function F1(e, o) {
  return C(), z("svg", B1, [...o[0] || (o[0] = [
    j("path", {
      fill: "currentColor",
      d: "M8 .75a7.25 7.25 0 1 1 0 14.5A7.25 7.25 0 0 1 8 .75Zm0 1a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5Zm2.59 3.527a.501.501 0 0 1 .758.623l-.057.085-3.848 4.666a.501.501 0 0 1-.78-.011L4.936 8.41l-.053-.086a.501.501 0 0 1 .775-.6l.07.074 1.34 1.733 3.45-4.183.072-.072Z"
    }, null, -1)
  ])]);
}
const N1 = /* @__PURE__ */ Ka(q1, [["render", F1]]), V1 = { class: "flex items-center gap-2 flex-grow overflow-hidden" }, z1 = { class: "flex flex-col flex-grow overflow-hidden" }, H1 = { class: "flex items-center gap-2 h-7" }, U1 = /* @__PURE__ */ V({
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
  setup(e, { emit: o }) {
    const t = e, r = o, n = P({
      get: () => t.open,
      set: (a) => r("update:open", a)
    });
    function l() {
      var a, i;
      (i = (a = t.action) == null ? void 0 : a.onClick) == null || i.call(a), r("action");
    }
    return (a, i) => (C(), B(u(cf), {
      open: n.value,
      "onUpdate:open": i[0] || (i[0] = (s) => n.value = s),
      duration: e.closable ? e.duration : 0,
      class: ae([
        "toast-root-animatable",
        "bg-surface-gray-6 border-none rounded-md px-4 py-1.5 shadow-lg flex items-center justify-between gap-3 min-w-[280px] max-w-[400px] pointer-events-auto list-none"
      ])
    }, {
      default: q(() => [
        j("div", V1, [
          j("div", null, [
            e.icon ? (C(), B(dt(e.icon), {
              key: 0,
              class: "flex-shrink-0 size-4"
            })) : e.type == "success" ? (C(), B(N1, {
              key: 1,
              class: "flex-shrink-0 size-4 text-ink-green-2"
            })) : e.type == "warning" ? (C(), B(u($1), {
              key: 2,
              class: "flex-shrink-0 size-4 text-ink-amber-2"
            })) : e.type == "error" ? (C(), B(u(Ci), {
              key: 3,
              class: "flex-shrink-0 size-4 text-ink-red-2"
            })) : J("", !0)
          ]),
          j("div", z1, [
            e.message ? (C(), B(u(uf), {
              key: 0,
              class: "text-p-sm break-words text-ink-white",
              innerHTML: e.message
            }, null, 8, ["innerHTML"])) : J("", !0)
          ])
        ]),
        j("div", H1, [
          e.action ? (C(), B(u(af), {
            key: 0,
            class: "flex-shrink-0 rounded px-2 py-1 text-sm text-ink-blue-link hover:text-ink-gray-3 focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-4",
            "alt-text": e.action.altText || e.action.label,
            onClick: l
          }, {
            default: q(() => [
              _e(H(e.action.label), 1)
            ]),
            _: 1
          }, 8, ["alt-text"])) : J("", !0),
          e.closable ? (C(), B(u(Va), {
            key: 1,
            class: "flex-shrink-0 rounded p-1 text-ink-white hover:text-ink-gray-3 focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-4"
          }, {
            default: q(() => [
              K(u(wi), { class: "size-4" })
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
  entries: Ga,
  setPrototypeOf: $l,
  isFrozen: W1,
  getPrototypeOf: K1,
  getOwnPropertyDescriptor: G1
} = Object;
let {
  freeze: Be,
  seal: Ye,
  create: lr
} = Object, {
  apply: ar,
  construct: ir
} = typeof Reflect < "u" && Reflect;
Be || (Be = function(o) {
  return o;
});
Ye || (Ye = function(o) {
  return o;
});
ar || (ar = function(o, t) {
  for (var r = arguments.length, n = new Array(r > 2 ? r - 2 : 0), l = 2; l < r; l++)
    n[l - 2] = arguments[l];
  return o.apply(t, n);
});
ir || (ir = function(o) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return new o(...r);
});
const Gn = Fe(Array.prototype.forEach), Y1 = Fe(Array.prototype.lastIndexOf), ql = Fe(Array.prototype.pop), mn = Fe(Array.prototype.push), X1 = Fe(Array.prototype.splice), Xn = Fe(String.prototype.toLowerCase), No = Fe(String.prototype.toString), Vo = Fe(String.prototype.match), hn = Fe(String.prototype.replace), J1 = Fe(String.prototype.indexOf), Z1 = Fe(String.prototype.trim), Qe = Fe(Object.prototype.hasOwnProperty), $e = Fe(RegExp.prototype.test), gn = Q1(TypeError);
function Fe(e) {
  return function(o) {
    o instanceof RegExp && (o.lastIndex = 0);
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      r[n - 1] = arguments[n];
    return ar(e, o, r);
  };
}
function Q1(e) {
  return function() {
    for (var o = arguments.length, t = new Array(o), r = 0; r < o; r++)
      t[r] = arguments[r];
    return ir(e, t);
  };
}
function de(e, o) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Xn;
  $l && $l(e, null);
  let r = o.length;
  for (; r--; ) {
    let n = o[r];
    if (typeof n == "string") {
      const l = t(n);
      l !== n && (W1(o) || (o[r] = l), n = l);
    }
    e[n] = !0;
  }
  return e;
}
function ev(e) {
  for (let o = 0; o < e.length; o++)
    Qe(e, o) || (e[o] = null);
  return e;
}
function st(e) {
  const o = lr(null);
  for (const [t, r] of Ga(e))
    Qe(e, t) && (Array.isArray(r) ? o[t] = ev(r) : r && typeof r == "object" && r.constructor === Object ? o[t] = st(r) : o[t] = r);
  return o;
}
function bn(e, o) {
  for (; e !== null; ) {
    const r = G1(e, o);
    if (r) {
      if (r.get)
        return Fe(r.get);
      if (typeof r.value == "function")
        return Fe(r.value);
    }
    e = K1(e);
  }
  function t() {
    return null;
  }
  return t;
}
const Bl = Be(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), zo = Be(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ho = Be(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), tv = Be(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Uo = Be(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), nv = Be(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Fl = Be(["#text"]), Nl = Be(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Wo = Be(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Vl = Be(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Yn = Be(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ov = Ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm), rv = Ye(/<%[\w\W]*|[\w\W]*%>/gm), lv = Ye(/\$\{[\w\W]*/gm), av = Ye(/^data-[\-\w.\u00B7-\uFFFF]+$/), iv = Ye(/^aria-[\-\w]+$/), Ya = Ye(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), sv = Ye(/^(?:\w+script|data):/i), uv = Ye(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Xa = Ye(/^html$/i), dv = Ye(/^[a-z][.\w]*(-[.\w]+)+$/i);
var zl = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: iv,
  ATTR_WHITESPACE: uv,
  CUSTOM_ELEMENT: dv,
  DATA_ATTR: av,
  DOCTYPE_NAME: Xa,
  ERB_EXPR: rv,
  IS_ALLOWED_URI: Ya,
  IS_SCRIPT_OR_DATA: sv,
  MUSTACHE_EXPR: ov,
  TMPLIT_EXPR: lv
});
const xn = {
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
}, cv = function() {
  return typeof window > "u" ? null : window;
}, pv = function(o, t) {
  if (typeof o != "object" || typeof o.createPolicy != "function")
    return null;
  let r = null;
  const n = "data-tt-policy-suffix";
  t && t.hasAttribute(n) && (r = t.getAttribute(n));
  const l = "dompurify" + (r ? "#" + r : "");
  try {
    return o.createPolicy(l, {
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
}, Hl = function() {
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
function Ja() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : cv();
  const o = (Q) => Ja(Q);
  if (o.version = "3.3.1", o.removed = [], !e || !e.document || e.document.nodeType !== xn.document || !e.Element)
    return o.isSupported = !1, o;
  let {
    document: t
  } = e;
  const r = t, n = r.currentScript, {
    DocumentFragment: l,
    HTMLTemplateElement: a,
    Node: i,
    Element: s,
    NodeFilter: c,
    NamedNodeMap: d = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: p,
    DOMParser: f,
    trustedTypes: v
  } = e, y = s.prototype, m = bn(y, "cloneNode"), x = bn(y, "remove"), w = bn(y, "nextSibling"), h = bn(y, "childNodes"), _ = bn(y, "parentNode");
  if (typeof a == "function") {
    const Q = t.createElement("template");
    Q.content && Q.content.ownerDocument && (t = Q.content.ownerDocument);
  }
  let S, g = "";
  const {
    implementation: b,
    createNodeIterator: A,
    createDocumentFragment: T,
    getElementsByTagName: E
  } = t, {
    importNode: M
  } = r;
  let $ = Hl();
  o.isSupported = typeof Ga == "function" && typeof _ == "function" && b && b.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: L,
    ERB_EXPR: k,
    TMPLIT_EXPR: N,
    DATA_ATTR: U,
    ARIA_ATTR: oe,
    IS_SCRIPT_OR_DATA: ne,
    ATTR_WHITESPACE: se,
    CUSTOM_ELEMENT: D
  } = zl;
  let {
    IS_ALLOWED_URI: Z
  } = zl, G = null;
  const fe = de({}, [...Bl, ...zo, ...Ho, ...Uo, ...Fl]);
  let re = null;
  const ye = de({}, [...Nl, ...Wo, ...Vl, ...Yn]);
  let ue = Object.seal(lr(null, {
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
  })), ht = null, Y = null;
  const te = Object.seal(lr(null, {
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
  let le = !0, me = !0, Re = !1, Je = !0, We = !1, rt = !0, qt = !1, _o = !1, So = !1, Xt = !1, Dn = !1, Ln = !1, Ir = !0, Rr = !1;
  const Za = "user-content-";
  let Co = !0, fn = !1, Jt = {}, lt = null;
  const Ao = de({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Dr = null;
  const Lr = de({}, ["audio", "video", "img", "source", "image", "track"]);
  let Oo = null;
  const $r = de({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), $n = "http://www.w3.org/1998/Math/MathML", qn = "http://www.w3.org/2000/svg", gt = "http://www.w3.org/1999/xhtml";
  let Zt = gt, Eo = !1, ko = null;
  const Qa = de({}, [$n, qn, gt], No);
  let Bn = de({}, ["mi", "mo", "mn", "ms", "mtext"]), Fn = de({}, ["annotation-xml"]);
  const ei = de({}, ["title", "style", "font", "a", "script"]);
  let vn = null;
  const ti = ["application/xhtml+xml", "text/html"], ni = "text/html";
  let Ee = null, Qt = null;
  const oi = t.createElement("form"), qr = function(O) {
    return O instanceof RegExp || O instanceof Function;
  }, To = function() {
    let O = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Qt && Qt === O)) {
      if ((!O || typeof O != "object") && (O = {}), O = st(O), vn = // eslint-disable-next-line unicorn/prefer-includes
      ti.indexOf(O.PARSER_MEDIA_TYPE) === -1 ? ni : O.PARSER_MEDIA_TYPE, Ee = vn === "application/xhtml+xml" ? No : Xn, G = Qe(O, "ALLOWED_TAGS") ? de({}, O.ALLOWED_TAGS, Ee) : fe, re = Qe(O, "ALLOWED_ATTR") ? de({}, O.ALLOWED_ATTR, Ee) : ye, ko = Qe(O, "ALLOWED_NAMESPACES") ? de({}, O.ALLOWED_NAMESPACES, No) : Qa, Oo = Qe(O, "ADD_URI_SAFE_ATTR") ? de(st($r), O.ADD_URI_SAFE_ATTR, Ee) : $r, Dr = Qe(O, "ADD_DATA_URI_TAGS") ? de(st(Lr), O.ADD_DATA_URI_TAGS, Ee) : Lr, lt = Qe(O, "FORBID_CONTENTS") ? de({}, O.FORBID_CONTENTS, Ee) : Ao, ht = Qe(O, "FORBID_TAGS") ? de({}, O.FORBID_TAGS, Ee) : st({}), Y = Qe(O, "FORBID_ATTR") ? de({}, O.FORBID_ATTR, Ee) : st({}), Jt = Qe(O, "USE_PROFILES") ? O.USE_PROFILES : !1, le = O.ALLOW_ARIA_ATTR !== !1, me = O.ALLOW_DATA_ATTR !== !1, Re = O.ALLOW_UNKNOWN_PROTOCOLS || !1, Je = O.ALLOW_SELF_CLOSE_IN_ATTR !== !1, We = O.SAFE_FOR_TEMPLATES || !1, rt = O.SAFE_FOR_XML !== !1, qt = O.WHOLE_DOCUMENT || !1, Xt = O.RETURN_DOM || !1, Dn = O.RETURN_DOM_FRAGMENT || !1, Ln = O.RETURN_TRUSTED_TYPE || !1, So = O.FORCE_BODY || !1, Ir = O.SANITIZE_DOM !== !1, Rr = O.SANITIZE_NAMED_PROPS || !1, Co = O.KEEP_CONTENT !== !1, fn = O.IN_PLACE || !1, Z = O.ALLOWED_URI_REGEXP || Ya, Zt = O.NAMESPACE || gt, Bn = O.MATHML_TEXT_INTEGRATION_POINTS || Bn, Fn = O.HTML_INTEGRATION_POINTS || Fn, ue = O.CUSTOM_ELEMENT_HANDLING || {}, O.CUSTOM_ELEMENT_HANDLING && qr(O.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ue.tagNameCheck = O.CUSTOM_ELEMENT_HANDLING.tagNameCheck), O.CUSTOM_ELEMENT_HANDLING && qr(O.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ue.attributeNameCheck = O.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), O.CUSTOM_ELEMENT_HANDLING && typeof O.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (ue.allowCustomizedBuiltInElements = O.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), We && (me = !1), Dn && (Xt = !0), Jt && (G = de({}, Fl), re = [], Jt.html === !0 && (de(G, Bl), de(re, Nl)), Jt.svg === !0 && (de(G, zo), de(re, Wo), de(re, Yn)), Jt.svgFilters === !0 && (de(G, Ho), de(re, Wo), de(re, Yn)), Jt.mathMl === !0 && (de(G, Uo), de(re, Vl), de(re, Yn))), O.ADD_TAGS && (typeof O.ADD_TAGS == "function" ? te.tagCheck = O.ADD_TAGS : (G === fe && (G = st(G)), de(G, O.ADD_TAGS, Ee))), O.ADD_ATTR && (typeof O.ADD_ATTR == "function" ? te.attributeCheck = O.ADD_ATTR : (re === ye && (re = st(re)), de(re, O.ADD_ATTR, Ee))), O.ADD_URI_SAFE_ATTR && de(Oo, O.ADD_URI_SAFE_ATTR, Ee), O.FORBID_CONTENTS && (lt === Ao && (lt = st(lt)), de(lt, O.FORBID_CONTENTS, Ee)), O.ADD_FORBID_CONTENTS && (lt === Ao && (lt = st(lt)), de(lt, O.ADD_FORBID_CONTENTS, Ee)), Co && (G["#text"] = !0), qt && de(G, ["html", "head", "body"]), G.table && (de(G, ["tbody"]), delete ht.tbody), O.TRUSTED_TYPES_POLICY) {
        if (typeof O.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw gn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof O.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw gn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        S = O.TRUSTED_TYPES_POLICY, g = S.createHTML("");
      } else
        S === void 0 && (S = pv(v, n)), S !== null && typeof g == "string" && (g = S.createHTML(""));
      Be && Be(O), Qt = O;
    }
  }, Br = de({}, [...zo, ...Ho, ...tv]), Fr = de({}, [...Uo, ...nv]), ri = function(O) {
    let W = _(O);
    (!W || !W.tagName) && (W = {
      namespaceURI: Zt,
      tagName: "template"
    });
    const X = Xn(O.tagName), we = Xn(W.tagName);
    return ko[O.namespaceURI] ? O.namespaceURI === qn ? W.namespaceURI === gt ? X === "svg" : W.namespaceURI === $n ? X === "svg" && (we === "annotation-xml" || Bn[we]) : !!Br[X] : O.namespaceURI === $n ? W.namespaceURI === gt ? X === "math" : W.namespaceURI === qn ? X === "math" && Fn[we] : !!Fr[X] : O.namespaceURI === gt ? W.namespaceURI === qn && !Fn[we] || W.namespaceURI === $n && !Bn[we] ? !1 : !Fr[X] && (ei[X] || !Br[X]) : !!(vn === "application/xhtml+xml" && ko[O.namespaceURI]) : !1;
  }, at = function(O) {
    mn(o.removed, {
      element: O
    });
    try {
      _(O).removeChild(O);
    } catch {
      x(O);
    }
  }, Bt = function(O, W) {
    try {
      mn(o.removed, {
        attribute: W.getAttributeNode(O),
        from: W
      });
    } catch {
      mn(o.removed, {
        attribute: null,
        from: W
      });
    }
    if (W.removeAttribute(O), O === "is")
      if (Xt || Dn)
        try {
          at(W);
        } catch {
        }
      else
        try {
          W.setAttribute(O, "");
        } catch {
        }
  }, Nr = function(O) {
    let W = null, X = null;
    if (So)
      O = "<remove></remove>" + O;
    else {
      const Oe = Vo(O, /^[\r\n\t ]+/);
      X = Oe && Oe[0];
    }
    vn === "application/xhtml+xml" && Zt === gt && (O = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + O + "</body></html>");
    const we = S ? S.createHTML(O) : O;
    if (Zt === gt)
      try {
        W = new f().parseFromString(we, vn);
      } catch {
      }
    if (!W || !W.documentElement) {
      W = b.createDocument(Zt, "template", null);
      try {
        W.documentElement.innerHTML = Eo ? g : we;
      } catch {
      }
    }
    const De = W.body || W.documentElement;
    return O && X && De.insertBefore(t.createTextNode(X), De.childNodes[0] || null), Zt === gt ? E.call(W, qt ? "html" : "body")[0] : qt ? W.documentElement : De;
  }, Vr = function(O) {
    return A.call(
      O.ownerDocument || O,
      O,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, jo = function(O) {
    return O instanceof p && (typeof O.nodeName != "string" || typeof O.textContent != "string" || typeof O.removeChild != "function" || !(O.attributes instanceof d) || typeof O.removeAttribute != "function" || typeof O.setAttribute != "function" || typeof O.namespaceURI != "string" || typeof O.insertBefore != "function" || typeof O.hasChildNodes != "function");
  }, zr = function(O) {
    return typeof i == "function" && O instanceof i;
  };
  function bt(Q, O, W) {
    Gn(Q, (X) => {
      X.call(o, O, W, Qt);
    });
  }
  const Hr = function(O) {
    let W = null;
    if (bt($.beforeSanitizeElements, O, null), jo(O))
      return at(O), !0;
    const X = Ee(O.nodeName);
    if (bt($.uponSanitizeElement, O, {
      tagName: X,
      allowedTags: G
    }), rt && O.hasChildNodes() && !zr(O.firstElementChild) && $e(/<[/\w!]/g, O.innerHTML) && $e(/<[/\w!]/g, O.textContent) || O.nodeType === xn.progressingInstruction || rt && O.nodeType === xn.comment && $e(/<[/\w]/g, O.data))
      return at(O), !0;
    if (!(te.tagCheck instanceof Function && te.tagCheck(X)) && (!G[X] || ht[X])) {
      if (!ht[X] && Wr(X) && (ue.tagNameCheck instanceof RegExp && $e(ue.tagNameCheck, X) || ue.tagNameCheck instanceof Function && ue.tagNameCheck(X)))
        return !1;
      if (Co && !lt[X]) {
        const we = _(O) || O.parentNode, De = h(O) || O.childNodes;
        if (De && we) {
          const Oe = De.length;
          for (let Ne = Oe - 1; Ne >= 0; --Ne) {
            const xt = m(De[Ne], !0);
            xt.__removalCount = (O.__removalCount || 0) + 1, we.insertBefore(xt, w(O));
          }
        }
      }
      return at(O), !0;
    }
    return O instanceof s && !ri(O) || (X === "noscript" || X === "noembed" || X === "noframes") && $e(/<\/no(script|embed|frames)/i, O.innerHTML) ? (at(O), !0) : (We && O.nodeType === xn.text && (W = O.textContent, Gn([L, k, N], (we) => {
      W = hn(W, we, " ");
    }), O.textContent !== W && (mn(o.removed, {
      element: O.cloneNode()
    }), O.textContent = W)), bt($.afterSanitizeElements, O, null), !1);
  }, Ur = function(O, W, X) {
    if (Ir && (W === "id" || W === "name") && (X in t || X in oi))
      return !1;
    if (!(me && !Y[W] && $e(U, W))) {
      if (!(le && $e(oe, W))) {
        if (!(te.attributeCheck instanceof Function && te.attributeCheck(W, O))) {
          if (!re[W] || Y[W]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Wr(O) && (ue.tagNameCheck instanceof RegExp && $e(ue.tagNameCheck, O) || ue.tagNameCheck instanceof Function && ue.tagNameCheck(O)) && (ue.attributeNameCheck instanceof RegExp && $e(ue.attributeNameCheck, W) || ue.attributeNameCheck instanceof Function && ue.attributeNameCheck(W, O)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              W === "is" && ue.allowCustomizedBuiltInElements && (ue.tagNameCheck instanceof RegExp && $e(ue.tagNameCheck, X) || ue.tagNameCheck instanceof Function && ue.tagNameCheck(X)))
            )
              return !1;
          } else if (!Oo[W]) {
            if (!$e(Z, hn(X, se, ""))) {
              if (!((W === "src" || W === "xlink:href" || W === "href") && O !== "script" && J1(X, "data:") === 0 && Dr[O])) {
                if (!(Re && !$e(ne, hn(X, se, "")))) {
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
  }, Wr = function(O) {
    return O !== "annotation-xml" && Vo(O, D);
  }, Kr = function(O) {
    bt($.beforeSanitizeAttributes, O, null);
    const {
      attributes: W
    } = O;
    if (!W || jo(O))
      return;
    const X = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: re,
      forceKeepAttr: void 0
    };
    let we = W.length;
    for (; we--; ) {
      const De = W[we], {
        name: Oe,
        namespaceURI: Ne,
        value: xt
      } = De, en = Ee(Oe), Po = xt;
      let je = Oe === "value" ? Po : Z1(Po);
      if (X.attrName = en, X.attrValue = je, X.keepAttr = !0, X.forceKeepAttr = void 0, bt($.uponSanitizeAttribute, O, X), je = X.attrValue, Rr && (en === "id" || en === "name") && (Bt(Oe, O), je = Za + je), rt && $e(/((--!?|])>)|<\/(style|title|textarea)/i, je)) {
        Bt(Oe, O);
        continue;
      }
      if (en === "attributename" && Vo(je, "href")) {
        Bt(Oe, O);
        continue;
      }
      if (X.forceKeepAttr)
        continue;
      if (!X.keepAttr) {
        Bt(Oe, O);
        continue;
      }
      if (!Je && $e(/\/>/i, je)) {
        Bt(Oe, O);
        continue;
      }
      We && Gn([L, k, N], (Yr) => {
        je = hn(je, Yr, " ");
      });
      const Gr = Ee(O.nodeName);
      if (!Ur(Gr, en, je)) {
        Bt(Oe, O);
        continue;
      }
      if (S && typeof v == "object" && typeof v.getAttributeType == "function" && !Ne)
        switch (v.getAttributeType(Gr, en)) {
          case "TrustedHTML": {
            je = S.createHTML(je);
            break;
          }
          case "TrustedScriptURL": {
            je = S.createScriptURL(je);
            break;
          }
        }
      if (je !== Po)
        try {
          Ne ? O.setAttributeNS(Ne, Oe, je) : O.setAttribute(Oe, je), jo(O) ? at(O) : ql(o.removed);
        } catch {
          Bt(Oe, O);
        }
    }
    bt($.afterSanitizeAttributes, O, null);
  }, li = function Q(O) {
    let W = null;
    const X = Vr(O);
    for (bt($.beforeSanitizeShadowDOM, O, null); W = X.nextNode(); )
      bt($.uponSanitizeShadowNode, W, null), Hr(W), Kr(W), W.content instanceof l && Q(W.content);
    bt($.afterSanitizeShadowDOM, O, null);
  };
  return o.sanitize = function(Q) {
    let O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, W = null, X = null, we = null, De = null;
    if (Eo = !Q, Eo && (Q = "<!-->"), typeof Q != "string" && !zr(Q))
      if (typeof Q.toString == "function") {
        if (Q = Q.toString(), typeof Q != "string")
          throw gn("dirty is not a string, aborting");
      } else
        throw gn("toString is not a function");
    if (!o.isSupported)
      return Q;
    if (_o || To(O), o.removed = [], typeof Q == "string" && (fn = !1), fn) {
      if (Q.nodeName) {
        const xt = Ee(Q.nodeName);
        if (!G[xt] || ht[xt])
          throw gn("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (Q instanceof i)
      W = Nr("<!---->"), X = W.ownerDocument.importNode(Q, !0), X.nodeType === xn.element && X.nodeName === "BODY" || X.nodeName === "HTML" ? W = X : W.appendChild(X);
    else {
      if (!Xt && !We && !qt && // eslint-disable-next-line unicorn/prefer-includes
      Q.indexOf("<") === -1)
        return S && Ln ? S.createHTML(Q) : Q;
      if (W = Nr(Q), !W)
        return Xt ? null : Ln ? g : "";
    }
    W && So && at(W.firstChild);
    const Oe = Vr(fn ? Q : W);
    for (; we = Oe.nextNode(); )
      Hr(we), Kr(we), we.content instanceof l && li(we.content);
    if (fn)
      return Q;
    if (Xt) {
      if (Dn)
        for (De = T.call(W.ownerDocument); W.firstChild; )
          De.appendChild(W.firstChild);
      else
        De = W;
      return (re.shadowroot || re.shadowrootmode) && (De = M.call(r, De, !0)), De;
    }
    let Ne = qt ? W.outerHTML : W.innerHTML;
    return qt && G["!doctype"] && W.ownerDocument && W.ownerDocument.doctype && W.ownerDocument.doctype.name && $e(Xa, W.ownerDocument.doctype.name) && (Ne = "<!DOCTYPE " + W.ownerDocument.doctype.name + `>
` + Ne), We && Gn([L, k, N], (xt) => {
      Ne = hn(Ne, xt, " ");
    }), S && Ln ? S.createHTML(Ne) : Ne;
  }, o.setConfig = function() {
    let Q = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    To(Q), _o = !0;
  }, o.clearConfig = function() {
    Qt = null, _o = !1;
  }, o.isValidAttribute = function(Q, O, W) {
    Qt || To({});
    const X = Ee(Q), we = Ee(O);
    return Ur(X, we, W);
  }, o.addHook = function(Q, O) {
    typeof O == "function" && mn($[Q], O);
  }, o.removeHook = function(Q, O) {
    if (O !== void 0) {
      const W = Y1($[Q], O);
      return W === -1 ? void 0 : X1($[Q], W, 1)[0];
    }
    return ql($[Q]);
  }, o.removeHooks = function(Q) {
    $[Q] = [];
  }, o.removeAllHooks = function() {
    $ = Hl();
  }, o;
}
var fv = Ja();
const _t = I([]);
let vv = 0;
const Ul = (e, o) => {
  const t = _t.value.findIndex((r) => r.id === e);
  t !== -1 && (_t.value[t] = {
    ..._t.value[t],
    ...o,
    open: !0
  });
}, Ce = {
  create: (e) => {
    const o = `toast-${vv++}`, t = e.duration != null ? e.duration * 1e3 : 5e3, r = fv.sanitize(e.message, {
      ALLOWED_TAGS: ["a", "em", "strong", "i", "b", "u"]
    }), n = {
      id: e.id || o,
      open: !0,
      message: r,
      type: e.type || "info",
      duration: t,
      action: e.action,
      icon: e.icon,
      closable: e.closable ?? !0
    };
    return _t.value.push(n), n.id;
  },
  remove: (e) => {
    _t.value = _t.value.filter((o) => o.id !== e);
  },
  removeAll: () => {
    _t.value = [];
  },
  promise: async (e, o) => {
    const t = o.duration ?? 0, r = Ce.create({
      message: o.loading,
      type: "info",
      icon: () => ie(Pr, { class: "text-ink-white" }),
      duration: t,
      closable: !1
    });
    try {
      const n = await e, l = typeof o.success == "function" ? o.success(n) : o.success, a = o.successDuration ?? o.duration ?? 5;
      return Ul(r, {
        message: l,
        type: "success",
        duration: a * 1e3,
        icon: void 0,
        closable: !0,
        action: o.successAction
      }), n;
    } catch (n) {
      const l = typeof o.error == "function" ? o.error(n) : o.error, a = o.errorDuration ?? o.duration ?? 5;
      throw Ul(r, {
        message: l,
        type: "error",
        duration: a * 1e3,
        icon: void 0,
        closable: !0,
        action: o.errorAction
      }), n;
    }
  },
  success: (e, o = {}) => Ce.create({ message: e, type: "success", ...o }),
  error: (e, o = {}) => Ce.create({ message: e, type: "error", ...o }),
  warning: (e, o = {}) => Ce.create({ message: e, type: "warning", ...o }),
  info: (e, o = {}) => Ce.create({ message: e, type: "info", ...o })
};
V({
  name: "FrappeToasts",
  setup() {
    const e = (t, r) => {
      if (!r)
        Ce.remove(t);
      else {
        const n = _t.value.find((l) => l.id === t);
        n && (n.open = !0);
      }
    }, o = (t) => {
      Ce.remove(t.id);
    };
    return () => _t.value.map(
      (t) => ie(U1, {
        key: t.id,
        open: t.open,
        message: t.message,
        type: t.type,
        duration: t.duration,
        action: t.action,
        icon: t.icon,
        closable: t.closable,
        "onUpdate:open": (r) => e(t.id, r),
        onAction: () => o(t)
      })
    );
  }
});
function R(e, ...o) {
  return typeof window < "u" && window.__ ? window.__(e, ...o) : e;
}
async function Le(e, o = {}) {
  const { call: t } = await import("./index-9c706403.js");
  return t(e, o);
}
const Wl = [
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
function yv() {
  const e = I(!1), o = I(!1), t = I(null), r = I(""), n = I([]), l = I([]), a = I([]), i = I({}), s = I(!1), c = I(!1), d = I(null), p = I({}), f = P(() => t.value ? JSON.stringify(t.value) !== r.value : !1);
  async function v() {
    try {
      const L = await Le("jana.api.agents.check_admin");
      e.value = L.is_admin;
    } catch {
      e.value = !1;
    }
    o.value = !0;
  }
  async function y() {
    s.value = !0;
    try {
      const L = await Le("frappe.client.get", {
        doctype: "Jana Settings",
        name: "Jana Settings"
      }), k = {};
      for (const N of Wl) {
        const U = L[N];
        typeof U == "number" && (U === 0 || U === 1) ? k[N] = !!U : k[N] = U ?? null;
      }
      t.value = k, r.value = JSON.stringify(t.value);
    } finally {
      s.value = !1;
    }
  }
  async function m() {
    if (!(!t.value || !f.value)) {
      c.value = !0;
      try {
        const L = {};
        for (const k of Wl) {
          const N = t.value[k];
          L[k] = typeof N == "boolean" ? N ? 1 : 0 : N;
        }
        await Le("frappe.client.set_value", {
          doctype: "Jana Settings",
          name: "Jana Settings",
          fieldname: L
        }), r.value = JSON.stringify(t.value);
      } finally {
        c.value = !1;
      }
    }
  }
  async function x() {
    try {
      n.value = await Le("jana.api.providers.list_providers");
    } catch {
      try {
        n.value = await Le("frappe.client.get_list", {
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
      } catch {
        n.value = [];
      }
    }
  }
  async function w(L) {
    if (!L) {
      l.value = [];
      return;
    }
    try {
      l.value = await Le("jana.api.providers.get_models_for_provider", {
        provider_name: L
      });
    } catch {
      l.value = [];
    }
  }
  async function h(L) {
    d.value = L;
    try {
      const k = await Le("jana.api.providers.test_connection", {
        provider_name: L
      });
      return p.value[L] = k, k;
    } catch (k) {
      const N = {
        success: !1,
        message: String(k),
        latency_ms: 0,
        model: null
      };
      return p.value[L] = N, N;
    } finally {
      d.value = null;
    }
  }
  async function _(L, k) {
    const N = await Le("jana.api.providers.save_provider", {
      provider_name: L,
      data: JSON.stringify(k)
    }), U = n.value.findIndex((oe) => oe.name === L);
    return U >= 0 && (n.value[U] = N), N;
  }
  async function S(L) {
    const k = await Le("jana.api.providers.create_provider", {
      data: JSON.stringify(L)
    });
    return n.value.push(k), k;
  }
  async function g(L) {
    await Le("jana.api.providers.delete_provider", {
      provider_name: L
    }), n.value = n.value.filter((k) => k.name !== L);
  }
  async function b() {
    try {
      a.value = await Le("frappe.client.get_list", {
        doctype: "Jana User Key",
        fields: ["name", "user", "provider", "auth_type", "enabled", "connected_at"],
        limit_page_length: 0,
        order_by: "creation desc"
      });
    } catch {
      a.value = [];
    }
  }
  async function A(L, k) {
    await Le("frappe.client.insert", {
      doc: {
        doctype: "Jana User Key",
        provider: L,
        api_key: k,
        auth_type: "api_key",
        enabled: 1
      }
    }), await b();
  }
  async function T(L) {
    await Le("frappe.client.delete", {
      doctype: "Jana User Key",
      name: L
    }), await b();
  }
  async function E() {
    try {
      i.value = await Le(
        "jana.api.oauth.get_oauth_status"
      );
    } catch {
      i.value = {};
    }
  }
  async function M(L, k) {
    const U = await Le(k === "google" ? "jana.api.oauth.initiate_google_oauth" : "jana.api.oauth.initiate_openrouter_oauth", { provider_name: L });
    window.location.href = U.auth_url;
  }
  async function $(L) {
    await Le("jana.api.oauth.disconnect_oauth", { provider_name: L }), await E();
  }
  return {
    isAdmin: e,
    roleLoaded: o,
    settings: t,
    providers: n,
    availableModels: l,
    userKeys: a,
    oauthStatus: i,
    loading: s,
    saving: c,
    dirty: f,
    testingProvider: d,
    testResults: p,
    detectRole: v,
    loadSettings: y,
    saveSettings: m,
    loadProviders: x,
    loadModelsFor: w,
    testConnection: h,
    saveProvider: _,
    createProvider: S,
    deleteProvider: g,
    loadUserKeys: b,
    addUserKey: A,
    deleteUserKey: T,
    loadOAuthStatus: E,
    connectOAuth: M,
    disconnectOAuth: $
  };
}
const mv = { class: "flex items-center gap-2.5 min-w-0" }, hv = { class: "min-w-0" }, gv = { class: "flex items-center gap-2 flex-wrap" }, bv = { class: "text-sm font-semibold text-gray-900 truncate" }, xv = {
  key: 0,
  class: "inline-flex items-center rounded-full bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent-600"
}, wv = {
  key: 1,
  class: "inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500"
}, _v = { class: "text-xs text-gray-400 mt-0.5" }, Sv = {
  key: 0,
  class: "border-t border-gray-100 px-4 py-4 space-y-5"
}, Cv = { class: "grid gap-4 sm:grid-cols-3" }, Av = { class: "block text-xs font-medium text-gray-600 mb-1" }, Ov = ["value"], Ev = ["value"], kv = { class: "flex items-end gap-4" }, Tv = { class: "flex items-center gap-2 cursor-pointer" }, jv = { class: "text-sm text-gray-700" }, Pv = { class: "flex items-center gap-2 cursor-pointer" }, Mv = { class: "text-sm text-gray-700" }, Iv = { class: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" }, Rv = { class: "grid gap-4 sm:grid-cols-2" }, Dv = { class: "block text-xs font-medium text-gray-600 mb-1" }, Lv = ["value"], $v = { value: "API Key" }, qv = { value: "OAuth" }, Bv = { class: "block text-xs font-medium text-gray-600 mb-1" }, Fv = ["placeholder"], Nv = { class: "text-xs text-gray-400 mt-0.5" }, Vv = { key: 0 }, zv = { class: "block text-xs font-medium text-gray-600 mb-1" }, Hv = { class: "flex gap-2" }, Uv = ["placeholder"], Wv = { key: 1 }, Kv = { class: "block text-xs font-medium text-gray-600 mb-1" }, Gv = ["placeholder"], Yv = { class: "text-xs text-gray-400 mt-0.5" }, Xv = { class: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" }, Jv = { class: "block text-xs font-medium text-gray-600 mb-1" }, Zv = ["placeholder"], Qv = { class: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" }, ey = { class: "block text-xs font-medium text-gray-600 mb-1" }, ty = ["value"], ny = { value: "Global Default" }, oy = { value: "Always On" }, ry = { value: "Always Off" }, ly = { class: "text-xs text-gray-400 mt-0.5" }, ay = { class: "flex items-center justify-between pt-2 border-t border-gray-100" }, iy = { class: "flex items-center gap-2" }, sy = ["disabled"], uy = {
  key: 0,
  class: "h-3 w-3 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"
}, dy = {
  key: 0,
  class: "text-xs"
}, cy = {
  key: 0,
  class: "text-green-600"
}, py = {
  key: 1,
  class: "text-red-500"
}, fy = { class: "flex items-center gap-2" }, vy = ["disabled"], yy = /* @__PURE__ */ V({
  __name: "ProviderCard",
  props: {
    provider: {},
    testResult: {},
    testing: { type: Boolean }
  },
  emits: ["test", "save", "delete"],
  setup(e, { emit: o }) {
    const t = e, r = o, n = I(!1), l = I(!1), a = [
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
      mask_pii_override: t.provider.mask_pii_override || "Global Default",
      connected_app: t.provider.connected_app || ""
    });
    pe(() => t.provider, (v) => {
      i.provider_type = v.provider_type, i.enabled = !!v.enabled, i.is_default = !!v.is_default, i.auth_method = v.auth_method, i.api_base_url = v.api_base_url || "", i.api_key = "", i.available_models = v.available_models || "", i.mask_pii_override = v.mask_pii_override || "Global Default", i.connected_app = v.connected_app || "";
    }, { deep: !0 });
    const s = P(() => {
      const v = t.provider;
      return i.provider_type !== v.provider_type || i.enabled !== !!v.enabled || i.is_default !== !!v.is_default || i.auth_method !== v.auth_method || i.api_base_url !== (v.api_base_url || "") || i.api_key !== "" || i.available_models !== (v.available_models || "") || i.mask_pii_override !== (v.mask_pii_override || "Global Default") || i.connected_app !== (v.connected_app || "");
    }), c = P(() => i.provider_type === "ollama" ? "http://localhost:11434" : i.provider_type === "vllm" ? "http://localhost:8000/v1" : i.provider_type === "openrouter" ? "https://openrouter.ai/api/v1" : R("Optional")), d = {
      openai: "bg-sky-50 text-sky-700",
      anthropic: "bg-orange-50 text-orange-700",
      google: "bg-green-50 text-green-700",
      openrouter: "bg-purple-50 text-purple-700",
      ollama: "bg-gray-100 text-gray-700",
      vllm: "bg-gray-100 text-gray-700",
      custom: "bg-gray-100 text-gray-700"
    }, p = P(() => d[t.provider.provider_type] ?? "bg-gray-100 text-gray-700");
    function f() {
      const v = {
        provider_type: i.provider_type,
        enabled: i.enabled ? 1 : 0,
        is_default: i.is_default ? 1 : 0,
        auth_method: i.auth_method,
        api_base_url: i.api_base_url || null,
        available_models: i.available_models || null,
        mask_pii_override: i.mask_pii_override
      };
      i.api_key && (v.api_key = i.api_key), i.auth_method === "OAuth" && i.provider_type === "google" && (v.connected_app = i.connected_app || null), r("save", t.provider.name, v);
    }
    return (v, y) => (C(), z("div", {
      class: ae(["rounded-xl border border-gray-200 bg-white transition-shadow", n.value ? "shadow-md" : ""])
    }, [
      j("div", {
        class: "flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none",
        onClick: y[0] || (y[0] = (m) => n.value = !n.value)
      }, [
        j("div", mv, [
          j("div", {
            class: ae(["flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold", p.value])
          }, H(e.provider.provider_type.slice(0, 2).toUpperCase()), 3),
          j("div", hv, [
            j("div", gv, [
              j("h3", bv, H(e.provider.provider_name), 1),
              j("span", {
                class: ae(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", p.value])
              }, H(e.provider.provider_type), 3),
              e.provider.is_default ? (C(), z("span", xv, H(u(R)("Default")), 1)) : J("", !0),
              e.provider.enabled ? J("", !0) : (C(), z("span", wv, H(u(R)("Disabled")), 1))
            ]),
            j("p", _v, [
              _e(H(e.provider.auth_method) + " ", 1),
              e.provider.api_base_url ? (C(), z(be, { key: 0 }, [
                _e(" · " + H(e.provider.api_base_url), 1)
              ], 64)) : J("", !0)
            ])
          ])
        ]),
        (C(), z("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: ae(["flex-shrink-0 text-gray-400 transition-transform", n.value ? "rotate-180" : ""])
        }, [...y[12] || (y[12] = [
          j("polyline", { points: "6 9 12 15 18 9" }, null, -1)
        ])], 2))
      ]),
      n.value ? (C(), z("div", Sv, [
        j("div", Cv, [
          j("div", null, [
            j("label", Av, H(u(R)("Provider Type")), 1),
            j("select", {
              value: i.provider_type,
              class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400",
              onChange: y[1] || (y[1] = (m) => i.provider_type = m.target.value)
            }, [
              (C(), z(be, null, pt(a, (m) => j("option", {
                key: m.value,
                value: m.value
              }, H(m.label), 9, Ev)), 64))
            ], 40, Ov)
          ]),
          j("div", kv, [
            j("label", Tv, [
              Pe(j("input", {
                "onUpdate:modelValue": y[2] || (y[2] = (m) => i.enabled = m),
                type: "checkbox",
                class: "h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
              }, null, 512), [
                [Jn, i.enabled]
              ]),
              j("span", jv, H(u(R)("Enabled")), 1)
            ]),
            j("label", Pv, [
              Pe(j("input", {
                "onUpdate:modelValue": y[3] || (y[3] = (m) => i.is_default = m),
                type: "checkbox",
                class: "h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
              }, null, 512), [
                [Jn, i.is_default]
              ]),
              j("span", Mv, H(u(R)("Is Default")), 1)
            ])
          ])
        ]),
        j("div", null, [
          j("h4", Iv, H(u(R)("Connection")), 1),
          j("div", Rv, [
            j("div", null, [
              j("label", Dv, H(u(R)("Authentication")), 1),
              j("select", {
                value: i.auth_method,
                class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400",
                onChange: y[4] || (y[4] = (m) => i.auth_method = m.target.value)
              }, [
                j("option", $v, H(u(R)("API Key")), 1),
                j("option", qv, H(u(R)("OAuth")), 1)
              ], 40, Lv)
            ]),
            j("div", null, [
              j("label", Bv, H(u(R)("API Base URL")), 1),
              Pe(j("input", {
                "onUpdate:modelValue": y[5] || (y[5] = (m) => i.api_base_url = m),
                type: "text",
                placeholder: c.value,
                class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
              }, null, 8, Fv), [
                [jt, i.api_base_url]
              ]),
              j("p", Nv, H(u(R)("Required for Ollama, vLLM, or custom endpoints.")), 1)
            ])
          ])
        ]),
        i.auth_method === "API Key" ? (C(), z("div", Vv, [
          j("label", zv, H(u(R)("API Key")), 1),
          j("div", Hv, [
            Pe(j("input", {
              "onUpdate:modelValue": y[6] || (y[6] = (m) => i.api_key = m),
              type: "password",
              placeholder: e.provider.has_api_key ? u(R)("••••••••  (key set, enter new to replace)") : u(R)("Paste your API key"),
              class: "flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            }, null, 8, Uv), [
              [jt, i.api_key]
            ])
          ])
        ])) : J("", !0),
        i.auth_method === "OAuth" && i.provider_type === "google" ? (C(), z("div", Wv, [
          j("label", Kv, H(u(R)("Connected App")), 1),
          Pe(j("input", {
            "onUpdate:modelValue": y[7] || (y[7] = (m) => i.connected_app = m),
            type: "text",
            placeholder: u(R)("Name of the Frappe Connected App for Google OAuth"),
            class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
          }, null, 8, Gv), [
            [jt, i.connected_app]
          ]),
          j("p", Yv, H(u(R)("Create a Connected App in Setup → Integrations → Connected App, then enter its name here.")), 1)
        ])) : J("", !0),
        j("div", null, [
          j("h4", Xv, H(u(R)("Models")), 1),
          j("label", Jv, H(u(R)("Available Models")), 1),
          Pe(j("textarea", {
            "onUpdate:modelValue": y[8] || (y[8] = (m) => i.available_models = m),
            rows: "3",
            placeholder: u(R)("Comma-separated list of available model names"),
            class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400 resize-y"
          }, null, 8, Zv), [
            [jt, i.available_models]
          ])
        ]),
        j("div", null, [
          j("h4", Qv, H(u(R)("Privacy")), 1),
          j("div", null, [
            j("label", ey, H(u(R)("PII Masking")), 1),
            j("select", {
              value: i.mask_pii_override,
              class: "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400",
              onChange: y[9] || (y[9] = (m) => i.mask_pii_override = m.target.value)
            }, [
              j("option", ny, H(u(R)("Global Default")), 1),
              j("option", oy, H(u(R)("Always On")), 1),
              j("option", ry, H(u(R)("Always Off")), 1)
            ], 40, ty),
            j("p", ly, H(u(R)("Override the global PII masking setting for this provider. 'Global Default' inherits from Jana Settings.")), 1)
          ])
        ]),
        j("div", ay, [
          j("div", iy, [
            j("button", {
              class: "inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50",
              disabled: e.testing || !e.provider.enabled,
              onClick: y[10] || (y[10] = xe((m) => v.$emit("test", e.provider.name), ["stop"]))
            }, [
              e.testing ? (C(), z("div", uy)) : (C(), z(be, { key: 1 }, [
                _e(H(u(R)("Test Connection")), 1)
              ], 64))
            ], 8, sy),
            e.testResult ? (C(), z("span", dy, [
              e.testResult.success ? (C(), z("span", cy, H(u(R)("OK")) + " (" + H(e.testResult.latency_ms) + "ms)", 1)) : (C(), z("span", py, H(e.testResult.message), 1))
            ])) : J("", !0)
          ]),
          j("div", fy, [
            j("button", {
              class: "rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 transition-colors",
              onClick: y[11] || (y[11] = xe((m) => v.$emit("delete", e.provider.name), ["stop"]))
            }, H(u(R)("Delete")), 1),
            j("button", {
              class: "rounded-lg bg-accent-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-accent-700 transition-colors disabled:opacity-50",
              disabled: l.value || !s.value,
              onClick: xe(f, ["stop"])
            }, H(l.value ? u(R)("Saving…") : u(R)("Save Provider")), 9, vy)
          ])
        ])
      ])) : J("", !0)
    ], 2));
  }
}), my = {
  key: 0,
  class: "flex items-center justify-center py-20"
}, hy = { class: "flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-6" }, gy = ["onClick"], by = {
  key: 0,
  class: "absolute bottom-0 left-0 right-0 h-0.5 bg-accent-600 dark:bg-accent-400 rounded-full"
}, xy = {
  key: 0,
  class: "max-w-2xl space-y-6"
}, wy = { class: "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" }, _y = { class: "mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400" }, Sy = { class: "space-y-5" }, Cy = { class: "grid gap-4 sm:grid-cols-2" }, Ay = { class: "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" }, Oy = { class: "mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400" }, Ey = { class: "space-y-4" }, ky = {
  key: 1,
  class: "max-w-2xl space-y-6"
}, Ty = { class: "flex items-center justify-between" }, jy = { class: "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400" }, Py = {
  key: 0,
  class: "rounded-lg border-2 border-dashed border-accent-200 dark:border-accent-700 bg-accent-50/30 dark:bg-accent-900/10 p-5 space-y-5"
}, My = { class: "text-sm font-semibold text-gray-900 dark:text-white" }, Iy = { class: "grid gap-4 sm:grid-cols-2" }, Ry = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, Dy = ["placeholder"], Ly = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, $y = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, qy = { value: "API Key" }, By = { value: "OAuth" }, Fy = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, Ny = ["placeholder"], Vy = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, zy = ["placeholder"], Hy = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, Uy = { value: "Global Default" }, Wy = { value: "Always On" }, Ky = { value: "Always Off" }, Gy = { class: "flex items-center gap-4" }, Yy = { class: "flex items-center gap-2 cursor-pointer" }, Xy = { class: "text-sm text-gray-700 dark:text-gray-300" }, Jy = { class: "flex items-center gap-2 cursor-pointer" }, Zy = { class: "text-sm text-gray-700 dark:text-gray-300" }, Qy = ["disabled"], em = {
  key: 1,
  class: "py-8 text-center text-sm text-gray-400 dark:text-gray-500"
}, tm = {
  key: 2,
  class: "space-y-3"
}, nm = {
  key: 2,
  class: "max-w-2xl space-y-6"
}, om = { class: "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" }, rm = { class: "mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400" }, lm = { class: "mb-4 text-xs text-gray-400 dark:text-gray-500" }, am = { class: "space-y-4" }, im = {
  key: 3,
  class: "max-w-2xl space-y-6"
}, sm = { class: "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" }, um = { class: "mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400" }, dm = { class: "space-y-5" }, cm = { class: "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" }, pm = { class: "mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400" }, fm = {
  key: 4,
  class: "max-w-2xl space-y-6"
}, vm = { class: "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" }, ym = { class: "mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400" }, mm = { class: "mb-4 text-xs text-gray-400 dark:text-gray-500" }, hm = { class: "space-y-5" }, gm = { class: "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300" }, bm = ["placeholder"], xm = { class: "text-xs text-gray-400 dark:text-gray-500" }, wm = {
  href: "/app/jana-knowledge-article",
  target: "_blank",
  class: "hover:underline"
}, _m = {
  key: 5,
  class: "max-w-2xl"
}, Sm = { class: "flex items-center gap-3 border-t border-gray-200 dark:border-gray-700 py-4 mt-6" }, Cm = ["disabled"], Am = {
  key: 0,
  class: "text-xs text-green-600 dark:text-green-400"
}, Om = {
  key: 2,
  class: "max-w-2xl py-6"
}, Dm = /* @__PURE__ */ V({
  __name: "Settings",
  setup(e) {
    const o = yv(), t = I(0), r = I(!1), n = I(!1), l = I(!1), a = Ht({
      provider_name: "",
      provider_type: "openai",
      auth_method: "API Key",
      api_key: "",
      api_base_url: "",
      mask_pii_override: "Global Default",
      enabled: !0,
      is_default: !1
    }), i = P(() => [
      { label: R("General") },
      { label: R("Providers") },
      { label: R("Capabilities") },
      { label: R("Limits") },
      { label: R("Knowledge") },
      { label: R("My Keys") }
    ]), s = P(() => {
      const g = o.providers.value.filter((b) => b.enabled).map((b) => ({
        label: b.provider_name,
        value: b.name
      }));
      return g.unshift({ label: R("— Select —"), value: "" }), g;
    }), c = P(() => {
      const g = o.availableModels.value.map((b) => ({ label: b, value: b }));
      return g.unshift({ label: R("— Select —"), value: "" }), g;
    });
    function d() {
      var g;
      (g = o.settings.value) != null && g.default_provider ? o.loadModelsFor(o.settings.value.default_provider) : o.availableModels.value = [];
    }
    pe(
      () => {
        var g;
        return (g = o.settings.value) == null ? void 0 : g.default_provider;
      },
      (g) => {
        g && o.loadModelsFor(g);
      }
    );
    async function p() {
      try {
        await o.saveSettings(), r.value = !0, setTimeout(() => r.value = !1, 2500);
      } catch {
        Ce.error(R("Failed to save settings"));
      }
    }
    async function f(g) {
      const b = await o.testConnection(g);
      b.success ? Ce.success(R("Connection successful") + ` (${b.latency_ms}ms)`) : Ce.error(b.message);
    }
    async function v(g, b) {
      try {
        await o.saveProvider(g, b), Ce.success(R("Provider saved"));
      } catch (A) {
        const T = A instanceof Error ? A.message : R("Failed to save provider");
        Ce.error(T);
      }
    }
    async function y(g) {
      if (confirm(R("Delete this provider? This cannot be undone.")))
        try {
          await o.deleteProvider(g), Ce.success(R("Provider deleted"));
        } catch (b) {
          const A = b instanceof Error ? b.message : R("Failed to delete provider");
          Ce.error(A);
        }
    }
    async function m() {
      l.value = !0;
      try {
        await o.createProvider({
          provider_name: a.provider_name.trim(),
          provider_type: a.provider_type,
          auth_method: a.auth_method,
          api_key: a.api_key || void 0,
          api_base_url: a.api_base_url || void 0,
          mask_pii_override: a.mask_pii_override,
          enabled: a.enabled ? 1 : 0,
          is_default: a.is_default ? 1 : 0
        }), Ce.success(R("Provider created")), n.value = !1, a.provider_name = "", a.provider_type = "openai", a.auth_method = "API Key", a.api_key = "", a.api_base_url = "", a.mask_pii_override = "Global Default", a.enabled = !0, a.is_default = !1;
      } catch (g) {
        const b = g instanceof Error ? g.message : R("Failed to create provider");
        Ce.error(b);
      } finally {
        l.value = !1;
      }
    }
    async function x(g, b) {
      try {
        await o.addUserKey(g, b), Ce.success(R("API key added"));
      } catch {
        Ce.error(R("Failed to add API key"));
      }
    }
    async function w(g) {
      try {
        await o.deleteUserKey(g), Ce.success(R("API key removed"));
      } catch {
        Ce.error(R("Failed to remove API key"));
      }
    }
    async function h(g, b) {
      await o.connectOAuth(g, b);
    }
    async function _(g) {
      try {
        await o.disconnectOAuth(g), Ce.success(R("Disconnected"));
      } catch {
        Ce.error(R("Failed to disconnect"));
      }
    }
    Se(async () => {
      await o.detectRole();
      const g = [o.loadProviders(), o.loadUserKeys(), o.loadOAuthStatus()];
      o.isAdmin.value && g.push(o.loadSettings()), await Promise.all(g);
    });
    const S = V(
      (g, { emit: b }) => {
        const A = I(""), T = I(""), E = I(!1);
        async function M() {
          if (!(!A.value || !T.value)) {
            E.value = !0;
            try {
              b("add-key", A.value, T.value), A.value = "", T.value = "";
            } finally {
              E.value = !1;
            }
          }
        }
        const $ = P(() => Object.entries(g.oauthStatus).map(([L, k]) => ({ key: L, ...k })));
        return () => ie("div", { class: "space-y-6" }, [
          // Your API Keys card
          ie("div", { class: "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" }, [
            ie("h2", { class: "mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400" }, R("Your API Keys")),
            ie(
              "p",
              { class: "mb-4 text-xs text-gray-400 dark:text-gray-500" },
              R("Bring your own API key for any provider. Your keys are encrypted and only used for your sessions.")
            ),
            // Existing keys
            g.userKeys.length ? ie(
              "div",
              { class: "space-y-2 mb-4" },
              g.userKeys.map(
                (L) => ie(
                  "div",
                  {
                    key: L.name,
                    class: "flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3"
                  },
                  [
                    ie("div", {}, [
                      ie("p", { class: "text-sm font-medium text-gray-900 dark:text-white" }, L.provider),
                      ie(
                        "p",
                        { class: "text-xs text-gray-500 dark:text-gray-400" },
                        L.auth_type === "api_key" ? R("API Key") + " •••••" : L.auth_type
                      )
                    ]),
                    ie(Vt, {
                      label: R("Remove"),
                      variant: "subtle",
                      theme: "red",
                      size: "sm",
                      onClick: () => b("delete-key", L.name)
                    })
                  ]
                )
              )
            ) : ie(
              "p",
              { class: "py-4 text-center text-sm text-gray-400 dark:text-gray-500" },
              R("No API keys configured yet.")
            ),
            // Add key form
            ie("div", { class: "rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 space-y-3" }, [
              ie("h3", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, R("Add a Key")),
              ie("div", { class: "grid gap-3 sm:grid-cols-2" }, [
                ie(kt, {
                  type: "select",
                  placeholder: R("Select provider"),
                  options: g.providers.filter((L) => L.enabled).map((L) => ({ label: L.provider_name, value: L.name })),
                  modelValue: A.value,
                  "onUpdate:modelValue": (L) => {
                    A.value = L;
                  }
                }),
                ie(kt, {
                  type: "text",
                  placeholder: R("Paste API key"),
                  modelValue: T.value,
                  "onUpdate:modelValue": (L) => {
                    T.value = L;
                  }
                })
              ]),
              ie(Vt, {
                label: R("Add Key"),
                variant: "solid",
                size: "sm",
                disabled: !A.value || !T.value,
                loading: E.value,
                onClick: M
              })
            ])
          ]),
          // OAuth section
          $.value.length ? ie("div", { class: "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" }, [
            ie("h2", { class: "mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400" }, R("OAuth Connections")),
            ie(
              "div",
              { class: "space-y-2" },
              $.value.map(
                (L) => ie(
                  "div",
                  {
                    key: L.key,
                    class: "flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3"
                  },
                  [
                    ie("div", { class: "flex items-center gap-2" }, [
                      ie("span", { class: "text-sm font-medium text-gray-900 dark:text-white" }, L.provider_name),
                      ie(u1, {
                        label: L.connected ? R("Connected") : R("Not connected"),
                        theme: L.connected ? "green" : "gray",
                        variant: "subtle",
                        size: "sm"
                      })
                    ]),
                    L.connected ? ie(Vt, {
                      label: R("Disconnect"),
                      variant: "subtle",
                      theme: "red",
                      size: "sm",
                      onClick: () => b("disconnect-oauth", L.key)
                    }) : ie(Vt, {
                      label: R("Connect"),
                      variant: "solid",
                      size: "sm",
                      onClick: () => b("connect-oauth", L.key, L.provider_type)
                    })
                  ]
                )
              )
            )
          ]) : null
        ]);
      },
      { props: ["userKeys", "providers", "oauthStatus"], emits: ["add-key", "delete-key", "connect-oauth", "disconnect-oauth"] }
    );
    return (g, b) => {
      var A, T, E, M, $, L;
      return !u(o).roleLoaded.value || u(o).loading.value ? (C(), z("div", my, [...b[26] || (b[26] = [
        j("div", { class: "h-6 w-6 animate-spin rounded-full border-2 border-accent-600 border-t-transparent" }, null, -1)
      ])])) : u(o).isAdmin.value && u(o).settings.value ? (C(), z(be, { key: 1 }, [
        j("nav", hy, [
          (C(!0), z(be, null, pt(i.value, (k, N) => (C(), z("button", {
            key: k.label,
            class: ae(["relative px-3 py-2 text-sm font-medium transition-colors", t.value === N ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"]),
            onClick: (U) => t.value = N
          }, [
            _e(H(k.label) + " ", 1),
            t.value === N ? (C(), z("span", by)) : J("", !0)
          ], 10, gy))), 128))
        ]),
        j("div", null, [
          ((A = i.value[t.value]) == null ? void 0 : A.label) === u(R)("General") ? (C(), z("div", xy, [
            j("div", wy, [
              j("h2", _y, H(u(R)("AI Provider")), 1),
              j("div", Sy, [
                j("div", Cy, [
                  K(u(kt), {
                    type: "select",
                    label: u(R)("Default Provider"),
                    options: s.value,
                    modelValue: u(o).settings.value.default_provider,
                    "onUpdate:modelValue": b[0] || (b[0] = (k) => u(o).settings.value.default_provider = k),
                    onChange: d
                  }, null, 8, ["label", "options", "modelValue"]),
                  K(u(kt), {
                    type: "select",
                    label: u(R)("Default Model"),
                    options: c.value,
                    modelValue: u(o).settings.value.default_model,
                    "onUpdate:modelValue": b[1] || (b[1] = (k) => u(o).settings.value.default_model = k)
                  }, null, 8, ["label", "options", "modelValue"])
                ]),
                K(u(kt), {
                  type: "number",
                  label: u(R)("Max Context Tokens"),
                  description: u(R)("Maximum tokens for the LLM context window (512–128000)"),
                  modelValue: u(o).settings.value.max_context_tokens,
                  "onUpdate:modelValue": b[2] || (b[2] = (k) => u(o).settings.value.max_context_tokens = k),
                  modelModifiers: { number: !0 }
                }, null, 8, ["label", "description", "modelValue"])
              ])
            ]),
            j("div", Ay, [
              j("h2", Oy, H(u(R)("Behavior")), 1),
              j("div", Ey, [
                K(u(it), {
                  modelValue: u(o).settings.value.enable_streaming,
                  "onUpdate:modelValue": b[3] || (b[3] = (k) => u(o).settings.value.enable_streaming = k),
                  label: u(R)("Enable Streaming"),
                  description: u(R)("Stream AI responses token-by-token for a real-time feel")
                }, null, 8, ["modelValue", "label", "description"]),
                K(u(it), {
                  modelValue: u(o).settings.value.enable_tool_calling,
                  "onUpdate:modelValue": b[4] || (b[4] = (k) => u(o).settings.value.enable_tool_calling = k),
                  label: u(R)("Enable Tool Calling"),
                  description: u(R)("Allow agents to call Frappe API tools during conversations")
                }, null, 8, ["modelValue", "label", "description"])
              ])
            ])
          ])) : ((T = i.value[t.value]) == null ? void 0 : T.label) === u(R)("Providers") ? (C(), z("div", ky, [
            j("div", Ty, [
              j("h2", jy, H(u(R)("Configured Providers")), 1),
              j("button", {
                class: "text-sm font-medium text-accent-600 hover:text-accent-700",
                onClick: b[5] || (b[5] = (k) => n.value = !n.value)
              }, H(n.value ? u(R)("Cancel") : "+ " + u(R)("Add Provider")), 1)
            ]),
            n.value ? (C(), z("div", Py, [
              j("h3", My, H(u(R)("New Provider")), 1),
              j("div", Iy, [
                j("div", null, [
                  j("label", Ry, H(u(R)("Provider Name")) + " *", 1),
                  Pe(j("input", {
                    "onUpdate:modelValue": b[6] || (b[6] = (k) => a.provider_name = k),
                    type: "text",
                    placeholder: u(R)("e.g. My OpenAI"),
                    class: "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
                  }, null, 8, Dy), [
                    [jt, a.provider_name]
                  ])
                ]),
                j("div", null, [
                  j("label", Ly, H(u(R)("Provider Type")) + " *", 1),
                  Pe(j("select", {
                    "onUpdate:modelValue": b[7] || (b[7] = (k) => a.provider_type = k),
                    class: "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
                  }, [...b[27] || (b[27] = [
                    hi('<option value="openai">OpenAI</option><option value="anthropic">Anthropic</option><option value="google">Google</option><option value="openrouter">OpenRouter</option><option value="ollama">Ollama</option><option value="vllm">vLLM</option><option value="custom">Custom</option>', 7)
                  ])], 512), [
                    [Mo, a.provider_type]
                  ])
                ]),
                j("div", null, [
                  j("label", $y, H(u(R)("Authentication")), 1),
                  Pe(j("select", {
                    "onUpdate:modelValue": b[8] || (b[8] = (k) => a.auth_method = k),
                    class: "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
                  }, [
                    j("option", qy, H(u(R)("API Key")), 1),
                    j("option", By, H(u(R)("OAuth")), 1)
                  ], 512), [
                    [Mo, a.auth_method]
                  ])
                ]),
                j("div", null, [
                  j("label", Fy, H(u(R)("API Key")), 1),
                  Pe(j("input", {
                    "onUpdate:modelValue": b[9] || (b[9] = (k) => a.api_key = k),
                    type: "password",
                    placeholder: u(R)("Paste your API key"),
                    class: "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
                  }, null, 8, Ny), [
                    [jt, a.api_key]
                  ])
                ]),
                j("div", null, [
                  j("label", Vy, H(u(R)("API Base URL")), 1),
                  Pe(j("input", {
                    "onUpdate:modelValue": b[10] || (b[10] = (k) => a.api_base_url = k),
                    type: "text",
                    placeholder: u(R)("Optional — for Ollama, vLLM, custom"),
                    class: "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
                  }, null, 8, zy), [
                    [jt, a.api_base_url]
                  ])
                ]),
                j("div", null, [
                  j("label", Hy, H(u(R)("PII Masking")), 1),
                  Pe(j("select", {
                    "onUpdate:modelValue": b[11] || (b[11] = (k) => a.mask_pii_override = k),
                    class: "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
                  }, [
                    j("option", Uy, H(u(R)("Global Default")), 1),
                    j("option", Wy, H(u(R)("Always On")), 1),
                    j("option", Ky, H(u(R)("Always Off")), 1)
                  ], 512), [
                    [Mo, a.mask_pii_override]
                  ])
                ])
              ]),
              j("div", Gy, [
                j("label", Yy, [
                  Pe(j("input", {
                    "onUpdate:modelValue": b[12] || (b[12] = (k) => a.enabled = k),
                    type: "checkbox",
                    class: "h-4 w-4 rounded accent-accent-600 dark:accent-accent-400"
                  }, null, 512), [
                    [Jn, a.enabled]
                  ]),
                  j("span", Xy, H(u(R)("Enabled")), 1)
                ]),
                j("label", Jy, [
                  Pe(j("input", {
                    "onUpdate:modelValue": b[13] || (b[13] = (k) => a.is_default = k),
                    type: "checkbox",
                    class: "h-4 w-4 rounded accent-accent-600 dark:accent-accent-400"
                  }, null, 512), [
                    [Jn, a.is_default]
                  ]),
                  j("span", Zy, H(u(R)("Is Default")), 1)
                ])
              ]),
              j("button", {
                class: "rounded-lg bg-accent-600 dark:bg-accent-400 px-4 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-accent-700 dark:hover:bg-accent-300 disabled:opacity-50 transition-colors",
                disabled: !a.provider_name.trim() || l.value,
                onClick: m
              }, H(l.value ? u(R)("Creating…") : u(R)("Create Provider")), 9, Qy)
            ])) : J("", !0),
            !u(o).providers.value.length && !n.value ? (C(), z("div", em, H(u(R)("No providers configured.")), 1)) : J("", !0),
            u(o).providers.value.length ? (C(), z("div", tm, [
              (C(!0), z(be, null, pt(u(o).providers.value, (k) => (C(), B(yy, {
                key: k.name,
                provider: k,
                "test-result": u(o).testResults.value[k.name],
                testing: u(o).testingProvider.value === k.name,
                onTest: f,
                onSave: v,
                onDelete: y
              }, null, 8, ["provider", "test-result", "testing"]))), 128))
            ])) : J("", !0)
          ])) : ((E = i.value[t.value]) == null ? void 0 : E.label) === u(R)("Capabilities") ? (C(), z("div", nm, [
            j("div", om, [
              j("h2", rm, H(u(R)("AI Capabilities")), 1),
              j("p", lm, H(u(R)("Control what Jana is allowed to do in conversations")), 1),
              j("div", am, [
                K(u(it), {
                  modelValue: u(o).settings.value.enable_chat,
                  "onUpdate:modelValue": b[14] || (b[14] = (k) => u(o).settings.value.enable_chat = k),
                  label: u(R)("Chat / Q&A"),
                  description: u(R)("Basic conversational AI")
                }, null, 8, ["modelValue", "label", "description"]),
                K(u(it), {
                  modelValue: u(o).settings.value.enable_read_documents,
                  "onUpdate:modelValue": b[15] || (b[15] = (k) => u(o).settings.value.enable_read_documents = k),
                  label: u(R)("Read Documents"),
                  description: u(R)("Allow AI to read Frappe documents for context")
                }, null, 8, ["modelValue", "label", "description"]),
                K(u(it), {
                  modelValue: u(o).settings.value.enable_draft_content,
                  "onUpdate:modelValue": b[16] || (b[16] = (k) => u(o).settings.value.enable_draft_content = k),
                  label: u(R)("Draft Content"),
                  description: u(R)("Generate emails, descriptions, and summaries")
                }, null, 8, ["modelValue", "label", "description"]),
                K(u(it), {
                  modelValue: u(o).settings.value.enable_create_documents,
                  "onUpdate:modelValue": b[17] || (b[17] = (k) => u(o).settings.value.enable_create_documents = k),
                  label: u(R)("Create Documents"),
                  description: u(R)("Allow AI to create new records in the system")
                }, null, 8, ["modelValue", "label", "description"]),
                K(u(it), {
                  modelValue: u(o).settings.value.enable_navigate,
                  "onUpdate:modelValue": b[18] || (b[18] = (k) => u(o).settings.value.enable_navigate = k),
                  label: u(R)("Navigate to Pages"),
                  description: u(R)("Allow AI to direct users to specific pages or reports")
                }, null, 8, ["modelValue", "label", "description"]),
                K(u(it), {
                  modelValue: u(o).settings.value.enable_report_queries,
                  "onUpdate:modelValue": b[19] || (b[19] = (k) => u(o).settings.value.enable_report_queries = k),
                  label: u(R)("Run Report Queries"),
                  description: u(R)("Allow AI to query reports and return data")
                }, null, 8, ["modelValue", "label", "description"]),
                K(u(it), {
                  modelValue: u(o).settings.value.enable_modify_documents,
                  "onUpdate:modelValue": b[20] || (b[20] = (k) => u(o).settings.value.enable_modify_documents = k),
                  label: u(R)("Modify Documents"),
                  description: u(R)("Allow AI to change existing records — use with caution")
                }, null, 8, ["modelValue", "label", "description"])
              ])
            ])
          ])) : ((M = i.value[t.value]) == null ? void 0 : M.label) === u(R)("Limits") ? (C(), z("div", im, [
            j("div", sm, [
              j("h2", um, H(u(R)("Rate Limits")), 1),
              j("div", dm, [
                K(u(kt), {
                  type: "number",
                  label: u(R)("Messages per User per Hour"),
                  description: u(R)("Set to 0 for unlimited"),
                  modelValue: u(o).settings.value.rate_limit_per_hour,
                  "onUpdate:modelValue": b[21] || (b[21] = (k) => u(o).settings.value.rate_limit_per_hour = k),
                  modelModifiers: { number: !0 }
                }, null, 8, ["label", "description", "modelValue"]),
                K(u(kt), {
                  type: "number",
                  label: u(R)("Session Retention (days)"),
                  description: u(R)("Auto-archive sessions older than this. Set to 0 to keep forever."),
                  modelValue: u(o).settings.value.session_retention_days,
                  "onUpdate:modelValue": b[22] || (b[22] = (k) => u(o).settings.value.session_retention_days = k),
                  modelModifiers: { number: !0 }
                }, null, 8, ["label", "description", "modelValue"])
              ])
            ]),
            j("div", cm, [
              j("h2", pm, H(u(R)("Privacy")), 1),
              K(u(it), {
                modelValue: u(o).settings.value.mask_pii,
                "onUpdate:modelValue": b[23] || (b[23] = (k) => u(o).settings.value.mask_pii = k),
                label: u(R)("Auto-Mask PII"),
                description: u(R)("Automatically mask personal identifiable information (names, emails, phone numbers) before sending to cloud LLM providers. Recommended for GDPR compliance.")
              }, null, 8, ["modelValue", "label", "description"])
            ])
          ])) : (($ = i.value[t.value]) == null ? void 0 : $.label) === u(R)("Knowledge") ? (C(), z("div", fm, [
            j("div", vm, [
              j("h2", ym, H(u(R)("Business Context")), 1),
              j("p", mm, H(u(R)("This description is included in every AI conversation to provide business context.")), 1),
              j("div", hm, [
                j("div", null, [
                  j("label", gm, H(u(R)("Business Description")), 1),
                  Pe(j("textarea", {
                    "onUpdate:modelValue": b[24] || (b[24] = (k) => u(o).settings.value.business_description = k),
                    rows: "6",
                    class: "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400",
                    placeholder: u(R)("Describe your business, products, and services...")
                  }, null, 8, bm), [
                    [jt, u(o).settings.value.business_description]
                  ])
                ]),
                K(u(kt), {
                  type: "number",
                  label: u(R)("Knowledge Token Budget"),
                  description: u(R)("Maximum tokens allocated for knowledge articles in the system prompt"),
                  modelValue: u(o).settings.value.knowledge_token_budget,
                  "onUpdate:modelValue": b[25] || (b[25] = (k) => u(o).settings.value.knowledge_token_budget = k),
                  modelModifiers: { number: !0 }
                }, null, 8, ["label", "description", "modelValue"])
              ])
            ]),
            j("p", xm, [
              j("a", wm, H(u(R)("Manage knowledge articles in Desk")) + " → ", 1)
            ])
          ])) : ((L = i.value[t.value]) == null ? void 0 : L.label) === u(R)("My Keys") ? (C(), z("div", _m, [
            K(u(S), {
              "user-keys": u(o).userKeys.value,
              providers: u(o).providers.value,
              "oauth-status": u(o).oauthStatus.value,
              onAddKey: x,
              onDeleteKey: w,
              onConnectOauth: h,
              onDisconnectOauth: _
            }, null, 8, ["user-keys", "providers", "oauth-status"])
          ])) : J("", !0)
        ]),
        j("div", Sm, [
          j("button", {
            class: "rounded-lg bg-accent-600 dark:bg-accent-400 px-4 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-accent-700 dark:hover:bg-accent-300 transition-colors disabled:opacity-50",
            disabled: !u(o).dirty.value || u(o).saving.value,
            onClick: p
          }, H(u(o).saving.value ? u(R)("Saving…") : u(R)("Save")), 9, Cm),
          r.value ? (C(), z("span", Am, H(u(R)("Saved")), 1)) : J("", !0)
        ])
      ], 64)) : (C(), z("div", Om, [
        K(u(S), {
          "user-keys": u(o).userKeys.value,
          providers: u(o).providers.value,
          "oauth-status": u(o).oauthStatus.value,
          onAddKey: x,
          onDeleteKey: w,
          onConnectOauth: h,
          onDisconnectOauth: _
        }, null, 8, ["user-keys", "providers", "oauth-status"])
      ]));
    };
  }
});
export {
  zt as F,
  E1 as S,
  I1 as _,
  Pr as a,
  U1 as b,
  r1 as c,
  ea as d,
  u1 as e,
  Vt as f,
  x1 as g,
  S1 as h,
  kt as i,
  jf as j,
  it as k,
  A1 as l,
  P1 as m,
  Lf as n,
  Dm as o,
  Ce as t
};
