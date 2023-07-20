// ==UserScript==
// @name         YTM Exporter
// @namespace    https://github.com/matzkoh
// @version      1.4.1
// @description  Export to excel for YTM console
// @author       matzkoh
// @include      https://control.theyjtag.jp/sites/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a
}
var $parcel$global =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : {}
var $parcel$modules = {}
var $parcel$inits = {}

var parcelRequire = $parcel$global['parcelRequirec0ee']
if (parcelRequire == null) {
  parcelRequire = function (id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id]
      delete $parcel$inits[id]
      var module = { id: id, exports: {} }
      $parcel$modules[id] = module
      init.call(module.exports, module, module.exports)
      return module.exports
    }
    var err = new Error("Cannot find module '" + id + "'")
    err.code = 'MODULE_NOT_FOUND'
    throw err
  }

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init
  }

  $parcel$global['parcelRequirec0ee'] = parcelRequire
}
parcelRequire.register('7EDnW', function (module, exports) {
  !(function (t, e) {
    module.exports = e()
  })(module.exports, function () {
    'use strict'
    var t = 1e3,
      e = 6e4,
      n = 36e5,
      r = 'millisecond',
      i = 'second',
      s = 'minute',
      u = 'hour',
      a = 'day',
      o = 'week',
      c = 'month',
      f = 'quarter',
      h = 'year',
      d = 'date',
      l = 'Invalid Date',
      $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      M = {
        name: 'en',
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        ordinal: function (t) {
          var e = ['th', 'st', 'nd', 'rd'],
            n = t % 100
          return '[' + t + (e[(n - 20) % 10] || e[n] || e[0]) + ']'
        },
      },
      m = function (t, e, n) {
        var r = String(t)
        return !r || r.length >= e ? t : '' + Array(e + 1 - r.length).join(n) + t
      },
      v = {
        s: m,
        z: function (t) {
          var e = -t.utcOffset(),
            n = Math.abs(e),
            r = Math.floor(n / 60),
            i = n % 60
          return (e <= 0 ? '+' : '-') + m(r, 2, '0') + ':' + m(i, 2, '0')
        },
        m: function t(e, n) {
          if (e.date() < n.date()) return -t(n, e)
          var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
            i = e.clone().add(r, c),
            s = n - i < 0,
            u = e.clone().add(r + (s ? -1 : 1), c)
          return +(-(r + (n - i) / (s ? i - u : u - i)) || 0)
        },
        a: function (t) {
          return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
        },
        p: function (t) {
          return (
            {
              M: c,
              y: h,
              w: o,
              d: a,
              D: d,
              h: u,
              m: s,
              s: i,
              ms: r,
              Q: f,
            }[t] ||
            String(t || '')
              .toLowerCase()
              .replace(/s$/, '')
          )
        },
        u: function (t) {
          return void 0 === t
        },
      },
      g = 'en',
      D = {}
    D[g] = M
    var p = function (t) {
        return t instanceof b
      },
      S = function t(e, n, r) {
        var i
        if (!e) return g
        if ('string' == typeof e) {
          var s = e.toLowerCase()
          D[s] && (i = s), n && ((D[s] = n), (i = s))
          var u = e.split('-')
          if (!i && u.length > 1) return t(u[0])
        } else {
          var a = e.name
          ;(D[a] = e), (i = a)
        }
        return !r && i && (g = i), i || (!r && g)
      },
      w = function (t, e) {
        if (p(t)) return t.clone()
        var n = 'object' == typeof e ? e : {}
        return (n.date = t), (n.args = arguments), new b(n)
      },
      O = v
    ;(O.l = S),
      (O.i = p),
      (O.w = function (t, e) {
        return w(t, {
          locale: e.$L,
          utc: e.$u,
          x: e.$x,
          $offset: e.$offset,
        })
      })
    var b = (function () {
        function M(t) {
          ;(this.$L = S(t.locale, null, !0)), this.parse(t)
        }
        var m = M.prototype
        return (
          (m.parse = function (t) {
            ;(this.$d = (function (t) {
              var e = t.date,
                n = t.utc
              if (null === e) return new Date(NaN)
              if (O.u(e)) return new Date()
              if (e instanceof Date) return new Date(e)
              if ('string' == typeof e && !/Z$/i.test(e)) {
                var r = e.match($)
                if (r) {
                  var i = r[2] - 1 || 0,
                    s = (r[7] || '0').substring(0, 3)
                  return n
                    ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s))
                    : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)
                }
              }
              return new Date(e)
            })(t)),
              (this.$x = t.x || {}),
              this.init()
          }),
          (m.init = function () {
            var t = this.$d
            ;(this.$y = t.getFullYear()),
              (this.$M = t.getMonth()),
              (this.$D = t.getDate()),
              (this.$W = t.getDay()),
              (this.$H = t.getHours()),
              (this.$m = t.getMinutes()),
              (this.$s = t.getSeconds()),
              (this.$ms = t.getMilliseconds())
          }),
          (m.$utils = function () {
            return O
          }),
          (m.isValid = function () {
            return !(this.$d.toString() === l)
          }),
          (m.isSame = function (t, e) {
            var n = w(t)
            return this.startOf(e) <= n && n <= this.endOf(e)
          }),
          (m.isAfter = function (t, e) {
            return w(t) < this.startOf(e)
          }),
          (m.isBefore = function (t, e) {
            return this.endOf(e) < w(t)
          }),
          (m.$g = function (t, e, n) {
            return O.u(t) ? this[e] : this.set(n, t)
          }),
          (m.unix = function () {
            return Math.floor(this.valueOf() / 1e3)
          }),
          (m.valueOf = function () {
            return this.$d.getTime()
          }),
          (m.startOf = function (t, e) {
            var n = this,
              r = !!O.u(e) || e,
              f = O.p(t),
              l = function (t, e) {
                var i = O.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n)
                return r ? i : i.endOf(a)
              },
              $ = function (t, e) {
                return O.w(n.toDate()[t].apply(n.toDate('s'), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n)
              },
              y = this.$W,
              M = this.$M,
              m = this.$D,
              v = 'set' + (this.$u ? 'UTC' : '')
            switch (f) {
              case h:
                return r ? l(1, 0) : l(31, 11)
              case c:
                return r ? l(1, M) : l(0, M + 1)
              case o:
                var g = this.$locale().weekStart || 0,
                  D = (y < g ? y + 7 : y) - g
                return l(r ? m - D : m + (6 - D), M)
              case a:
              case d:
                return $(v + 'Hours', 0)
              case u:
                return $(v + 'Minutes', 1)
              case s:
                return $(v + 'Seconds', 2)
              case i:
                return $(v + 'Milliseconds', 3)
              default:
                return this.clone()
            }
          }),
          (m.endOf = function (t) {
            return this.startOf(t, !1)
          }),
          (m.$set = function (t, e) {
            var n,
              o = O.p(t),
              f = 'set' + (this.$u ? 'UTC' : ''),
              l = ((n = {}),
              (n[a] = f + 'Date'),
              (n[d] = f + 'Date'),
              (n[c] = f + 'Month'),
              (n[h] = f + 'FullYear'),
              (n[u] = f + 'Hours'),
              (n[s] = f + 'Minutes'),
              (n[i] = f + 'Seconds'),
              (n[r] = f + 'Milliseconds'),
              n)[o],
              $ = o === a ? this.$D + (e - this.$W) : e
            if (o === c || o === h) {
              var y = this.clone().set(d, 1)
              y.$d[l]($), y.init(), (this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d)
            } else l && this.$d[l]($)
            return this.init(), this
          }),
          (m.set = function (t, e) {
            return this.clone().$set(t, e)
          }),
          (m.get = function (t) {
            return this[O.p(t)]()
          }),
          (m.add = function (r, f) {
            var d,
              l = this
            r = Number(r)
            var $ = O.p(f),
              y = function (t) {
                var e = w(l)
                return O.w(e.date(e.date() + Math.round(t * r)), l)
              }
            if ($ === c) return this.set(c, this.$M + r)
            if ($ === h) return this.set(h, this.$y + r)
            if ($ === a) return y(1)
            if ($ === o) return y(7)
            var M = ((d = {}), (d[s] = e), (d[u] = n), (d[i] = t), d)[$] || 1,
              m = this.$d.getTime() + r * M
            return O.w(m, this)
          }),
          (m.subtract = function (t, e) {
            return this.add(-1 * t, e)
          }),
          (m.format = function (t) {
            var e = this,
              n = this.$locale()
            if (!this.isValid()) return n.invalidDate || l
            var r = t || 'YYYY-MM-DDTHH:mm:ssZ',
              i = O.z(this),
              s = this.$H,
              u = this.$m,
              a = this.$M,
              o = n.weekdays,
              c = n.months,
              f = n.meridiem,
              h = function (t, n, i, s) {
                return (t && (t[n] || t(e, r))) || i[n].slice(0, s)
              },
              d = function (t) {
                return O.s(s % 12 || 12, t, '0')
              },
              $ =
                f ||
                function (t, e, n) {
                  var r = t < 12 ? 'AM' : 'PM'
                  return n ? r.toLowerCase() : r
                }
            return r.replace(y, function (t, r) {
              return (
                r ||
                (function (t) {
                  switch (t) {
                    case 'YY':
                      return String(e.$y).slice(-2)
                    case 'YYYY':
                      return O.s(e.$y, 4, '0')
                    case 'M':
                      return a + 1
                    case 'MM':
                      return O.s(a + 1, 2, '0')
                    case 'MMM':
                      return h(n.monthsShort, a, c, 3)
                    case 'MMMM':
                      return h(c, a)
                    case 'D':
                      return e.$D
                    case 'DD':
                      return O.s(e.$D, 2, '0')
                    case 'd':
                      return String(e.$W)
                    case 'dd':
                      return h(n.weekdaysMin, e.$W, o, 2)
                    case 'ddd':
                      return h(n.weekdaysShort, e.$W, o, 3)
                    case 'dddd':
                      return o[e.$W]
                    case 'H':
                      return String(s)
                    case 'HH':
                      return O.s(s, 2, '0')
                    case 'h':
                      return d(1)
                    case 'hh':
                      return d(2)
                    case 'a':
                      return $(s, u, !0)
                    case 'A':
                      return $(s, u, !1)
                    case 'm':
                      return String(u)
                    case 'mm':
                      return O.s(u, 2, '0')
                    case 's':
                      return String(e.$s)
                    case 'ss':
                      return O.s(e.$s, 2, '0')
                    case 'SSS':
                      return O.s(e.$ms, 3, '0')
                    case 'Z':
                      return i
                  }
                  return null
                })(t) ||
                i.replace(':', '')
              )
            })
          }),
          (m.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
          }),
          (m.diff = function (r, d, l) {
            var $,
              y = this,
              M = O.p(d),
              m = w(r),
              v = (m.utcOffset() - this.utcOffset()) * e,
              g = this - m,
              D = function () {
                return O.m(y, m)
              }
            switch (M) {
              case h:
                $ = D() / 12
                break
              case c:
                $ = D()
                break
              case f:
                $ = D() / 3
                break
              case o:
                $ = (g - v) / 6048e5
                break
              case a:
                $ = (g - v) / 864e5
                break
              case u:
                $ = g / n
                break
              case s:
                $ = g / e
                break
              case i:
                $ = g / t
                break
              default:
                $ = g
            }
            return l ? $ : O.a($)
          }),
          (m.daysInMonth = function () {
            return this.endOf(c).$D
          }),
          (m.$locale = function () {
            return D[this.$L]
          }),
          (m.locale = function (t, e) {
            if (!t) return this.$L
            var n = this.clone(),
              r = S(t, e, !0)
            return r && (n.$L = r), n
          }),
          (m.clone = function () {
            return O.w(this.$d, this)
          }),
          (m.toDate = function () {
            return new Date(this.valueOf())
          }),
          (m.toJSON = function () {
            return this.isValid() ? this.toISOString() : null
          }),
          (m.toISOString = function () {
            return this.$d.toISOString()
          }),
          (m.toString = function () {
            return this.$d.toUTCString()
          }),
          M
        )
      })(),
      _ = b.prototype
    return (
      (w.prototype = _),
      [
        ['$ms', r],
        ['$s', i],
        ['$m', s],
        ['$H', u],
        ['$W', a],
        ['$M', c],
        ['$y', h],
        ['$D', d],
      ].forEach(function (t) {
        _[t[1]] = function (e) {
          return this.$g(e, t[0], t[1])
        }
      }),
      (w.extend = function (t, e) {
        return t.$i || (t(e, b, w), (t.$i = !0)), w
      }),
      (w.locale = S),
      (w.isDayjs = p),
      (w.unix = function (t) {
        return w(1e3 * t)
      }),
      (w.en = D[g]),
      (w.Ls = D),
      (w.p = {}),
      w
    )
  })
})

var $7EDnW = parcelRequire('7EDnW')
var $f1b17992b293f0f8$exports = {}

!(function (e, _) {
  $f1b17992b293f0f8$exports = _(parcelRequire('7EDnW'))
})($f1b17992b293f0f8$exports, function (e) {
  'use strict'
  function _(e) {
    return e && 'object' == typeof e && 'default' in e
      ? e
      : {
          default: e,
        }
  }
  var t = _(e),
    d = {
      name: 'ja',
      weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
      weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
      weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
      months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
      monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
      ordinal: function (e) {
        return e + '日'
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY年M月D日',
        LLL: 'YYYY年M月D日 HH:mm',
        LLLL: 'YYYY年M月D日 dddd HH:mm',
        l: 'YYYY/MM/DD',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日(ddd) HH:mm',
      },
      meridiem: function (e) {
        return e < 12 ? '午前' : '午後'
      },
      relativeTime: {
        future: '%s後',
        past: '%s前',
        s: '数秒',
        m: '1分',
        mm: '%d分',
        h: '1時間',
        hh: '%d時間',
        d: '1日',
        dd: '%d日',
        M: '1ヶ月',
        MM: '%dヶ月',
        y: '1年',
        yy: '%d年',
      },
    }
  return t.default.locale(d, null, !0), d
})

var $e554f939ae0808d2$export$8e3ada03ba72bedf = 60
var $e554f939ae0808d2$export$a7c8f89377823cb8 = $e554f939ae0808d2$export$8e3ada03ba72bedf * 60
var $e554f939ae0808d2$export$acc6f43ab2895cb5 = $e554f939ae0808d2$export$a7c8f89377823cb8 * 24
var $e554f939ae0808d2$export$d99925edf30da4be = $e554f939ae0808d2$export$acc6f43ab2895cb5 * 7
var $e554f939ae0808d2$export$c0ed55f5b8675ea3 = 1e3
var $e554f939ae0808d2$export$37971e215480ff4b =
  $e554f939ae0808d2$export$8e3ada03ba72bedf * $e554f939ae0808d2$export$c0ed55f5b8675ea3
var $e554f939ae0808d2$export$c42e2f66c1854fa2 =
  $e554f939ae0808d2$export$a7c8f89377823cb8 * $e554f939ae0808d2$export$c0ed55f5b8675ea3
var $e554f939ae0808d2$export$a3d0b9741172e0d2 =
  $e554f939ae0808d2$export$acc6f43ab2895cb5 * $e554f939ae0808d2$export$c0ed55f5b8675ea3
var $e554f939ae0808d2$export$3dc01d4e106e904c =
  $e554f939ae0808d2$export$d99925edf30da4be * $e554f939ae0808d2$export$c0ed55f5b8675ea3 // English locales
var $e554f939ae0808d2$export$71ad59f2e432cfe8 = 'millisecond'
var $e554f939ae0808d2$export$25ce5a424b770e84 = 'second'
var $e554f939ae0808d2$export$85fbf3b9d951b785 = 'minute'
var $e554f939ae0808d2$export$7f8ddf7c7c20b3cd = 'hour'
var $e554f939ae0808d2$export$96f57966bedc81b4 = 'day'
var $e554f939ae0808d2$export$71cec2538cb2c617 = 'week'
var $e554f939ae0808d2$export$3a1a48c8f6ef640e = 'month'
var $e554f939ae0808d2$export$3722cfe417b6ed86 = 'quarter'
var $e554f939ae0808d2$export$8743009a87fcb00f = 'year'
var $e554f939ae0808d2$export$501a7fac1df67a49 = 'date'
var $e554f939ae0808d2$export$43dfb2cd49ed2315 = 'YYYY-MM-DDTHH:mm:ssZ'
var $e554f939ae0808d2$export$a3f90fd62b441bc0 = 'Invalid Date' // regex
var $e554f939ae0808d2$export$5017033e323668ef =
  /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
var $e554f939ae0808d2$export$b72c006c7b334a95 =
  /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g

// eslint-disable-next-line import/prefer-default-export
var $1e69eb38b5a552bb$export$625550452a3fa3ec = function t(format) {
  return format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function (_, a, b) {
    return a || b.slice(1)
  })
}
var $1e69eb38b5a552bb$export$a6cb9eb9b78e5816 = {
  LTS: 'h:mm:ss A',
  LT: 'h:mm A',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D, YYYY',
  LLL: 'MMMM D, YYYY h:mm A',
  LLLL: 'dddd, MMMM D, YYYY h:mm A',
}
var $1e69eb38b5a552bb$export$3b14a55fb2447963 = function u(formatStr, formats) {
  return formatStr.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function (_, a, b) {
    var B = b && b.toUpperCase()
    return (
      a ||
      formats[b] ||
      $1e69eb38b5a552bb$export$a6cb9eb9b78e5816[b] ||
      $1e69eb38b5a552bb$export$625550452a3fa3ec(formats[B])
    )
  })
}

var $f7257e9b3a97448e$export$2e2bcd8739ae039 = function (o, c, d) {
  var proto = c.prototype
  var oldFormat = proto.format
  d.en.formats = (0, $1e69eb38b5a552bb$export$a6cb9eb9b78e5816)
  proto.format = function (formatStr) {
    if (formatStr === void 0) formatStr = (0, $e554f939ae0808d2$export$43dfb2cd49ed2315)
    var _this$$locale = this.$locale(),
      _this$$locale$formats = _this$$locale.formats,
      formats = _this$$locale$formats === void 0 ? {} : _this$$locale$formats
    var result = (0, $1e69eb38b5a552bb$export$3b14a55fb2447963)(formatStr, formats)
    return oldFormat.call(this, result)
  }
}

;(0, /*@__PURE__*/ $parcel$interopDefault($7EDnW)).locale('ja')
;(0, /*@__PURE__*/ $parcel$interopDefault($7EDnW)).extend((0, $f7257e9b3a97448e$export$2e2bcd8739ae039))
var $0d8073e98169485a$export$2e2bcd8739ae039 = (0, /*@__PURE__*/ $parcel$interopDefault($7EDnW))

const $81a901bf94f6ea70$var$baseUrl = location.pathname.split('/').slice(0, 3).join('/')
async function $81a901bf94f6ea70$export$f4348e32a399a3d5() {
  return $.get(`${$81a901bf94f6ea70$var$baseUrl}/pages-json`)
}
async function $81a901bf94f6ea70$export$af63d7414243dad3() {
  return $.get(`${$81a901bf94f6ea70$var$baseUrl}/tags`)
}
async function $81a901bf94f6ea70$export$d9afdae50252705d() {
  return $.get(`${$81a901bf94f6ea70$var$baseUrl}/libraries-json`)
}
async function $81a901bf94f6ea70$export$92e8fbca45acc46f(id) {
  return (await $.get(`${$81a901bf94f6ea70$var$baseUrl}/tags/${id}/attributes`)).tag
}
async function $81a901bf94f6ea70$export$d6071470ea0e8404(id) {
  return $.get(`${$81a901bf94f6ea70$var$baseUrl}/tags/${id}/page-assignments`)
}
async function $81a901bf94f6ea70$export$c2657894b630ea2a() {
  return $.get(`${$81a901bf94f6ea70$var$baseUrl}/data`)
}
async function $81a901bf94f6ea70$export$ea911b0eea20edbc(id) {
  const html = await $.get(`${$81a901bf94f6ea70$var$baseUrl}/data/${id}/inputs`)
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return Array.from(doc.querySelectorAll('.view-data > tbody > tr')).map(tr => ({
    pageId: tr.cells[0].querySelector('a')?.href.match(/(?<=\/)\d+(?=\/)/)?.[0],
    pageName: tr.cells[0].textContent.trim(),
    dbe: tr.cells[2].textContent.trim(),
  }))
}

function $cca200c3db417a02$export$41e4a1ce9117446a(rows, name) {
  const blob = $cca200c3db417a02$var$createExcelCsvBlob(rows)
  const date = (0, $0d8073e98169485a$export$2e2bcd8739ae039)().format('YYYYMMDD')
  const site = $('#currentSite').text().trim()
  $cca200c3db417a02$var$saveBlob(blob, `[${date}] [${site}] ${name}.csv`)
}
function $cca200c3db417a02$var$saveBlob(blob, fileName) {
  const url = URL.createObjectURL(blob)
  $('<a/>')
    .attr('download', fileName)
    .prop('href', url)
    .appendTo('body')
    .each((_, a) => a.click())
    .remove()
  URL.revokeObjectURL(url)
}
function $cca200c3db417a02$var$createExcelCsvBlob(rows) {
  const value = $cca200c3db417a02$var$csvStringify(rows)
  const bom = new Uint8Array([0xef, 0xbb, 0xbf])
  return new Blob([bom, value], {
    type: 'text/csv',
  })
}
function $cca200c3db417a02$var$csvStringify(rows) {
  return rows.map(cells => cells.map($cca200c3db417a02$var$quoteForCsv).join(',')).join('\r\n')
}
function $cca200c3db417a02$var$quoteForCsv(value) {
  return `"${$cca200c3db417a02$var$convertValue(value).replace(/"/g, '""')}"`
}
function $cca200c3db417a02$var$convertValue(value) {
  if (Array.isArray(value)) return value.map($cca200c3db417a02$var$convertValue).join('\n')
  if (value instanceof Object) return JSON.stringify(value)
  return String(value ?? '')
}

class $5344736c86cc6e45$export$2b77a92f1a5ad772 {
  constructor(options) {
    const html = `
      <div class="ytm-ex-modal">
        <div class="ytm-ex-modal-body"></div>
      </div>
    `
    const wrapper = $(html).css({
      position: 'fixed',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#0009',
      zIndex: '2147483647',
    })
    const body = wrapper.find('.ytm-ex-modal-body').css({
      padding: '10vw',
      background: '#fffc',
    })
    if (options.closeOnClick) wrapper.on('click', () => this.close())
    this.options = options
    this.wrapper = wrapper
    this.body = body
    this.promise = new Promise(resolve => {
      this._resolvePromise = resolve
    })
  }
  open() {
    this.wrapper.appendTo(document.body)
    return this
  }
  close() {
    this.wrapper.fadeOut().queue(() => {
      this.wrapper.remove()
      this._resolvePromise()
    })
    return this
  }
  static open(options) {
    return new this(options).open()
  }
}
class $5344736c86cc6e45$export$fdc96b94563d4a64 extends $5344736c86cc6e45$export$2b77a92f1a5ad772 {
  constructor(options) {
    super({
      ...options,
      closeOnClick: true,
    })
    this.body.text(this.options.message).css({
      fontSize: '2vw',
    })
  }
}
class $5344736c86cc6e45$export$670b0269826f1fb6 extends $5344736c86cc6e45$export$2b77a92f1a5ad772 {
  constructor(options) {
    super(options)
    this.value = 0
    this.text = $('<div>').css({
      fontSize: '4vw',
    })
    this.progress = $('<progress/>').attr('max', this.options.maxValue).css({
      width: '50vw',
      height: '2vw',
      backgroundColor: 'transparent',
    })
    this.body
      .css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })
      .append(this.text)
      .append(this.progress)
    this.update()
  }
  update() {
    this.progress.val(this.value)
    this.text.text(`${((this.value / this.options.maxValue) * 100) | 0}%`)
    if (this.options.maxValue <= this.value) this.body.slideUp().queue(() => this.close())
    return this
  }
  increment(value = 1) {
    this.value += value
    return this.update()
  }
}

const $ece901bf57594d2d$var$columns = [
  ['id', 'ID'],
  ['name', '名前'],
  ['pageId', 'ページ ID'],
  ['pageName', 'ページ名'],
  ['dbe', 'データバインディングエクスプレッション'],
  ['createdAt', '作成日'],
  ['modifiedAt', '更新日'],
]
async function $ece901bf57594d2d$var$exportData() {
  const items = await (0, $81a901bf94f6ea70$export$c2657894b630ea2a)()
  const modal = (0, $5344736c86cc6e45$export$670b0269826f1fb6).open({
    maxValue: items.length,
  })
  const itemsWithInputs = await Promise.all(
    items.map(async item => {
      const inputs = await (0, $81a901bf94f6ea70$export$ea911b0eea20edbc)(item.id)
      modal.increment()
      return {
        item: item,
        inputs: inputs,
      }
    }),
  )
  const rows = itemsWithInputs.flatMap(({ item: item, inputs: inputs }) => {
    item.createdAt = (0, $0d8073e98169485a$export$2e2bcd8739ae039)(item.createdAt).format('llll')
    item.modifiedAt = (0, $0d8073e98169485a$export$2e2bcd8739ae039)(item.modifiedAt).format('llll')
    return inputs.map(input => [...$ece901bf57594d2d$var$columns.map(([key]) => input[key] || item[key])])
  })
  const header = $ece901bf57594d2d$var$columns.map(c => c[1])
  rows.unshift(header)
  ;(0, $cca200c3db417a02$export$41e4a1ce9117446a)(rows, 'カスタムデータエレメント一覧')
}
function $ece901bf57594d2d$export$f2a81b5ef1968fea() {
  GM_registerMenuCommand('カスタムデータエレメントをエクスポート', $ece901bf57594d2d$var$exportData)
}

async function $60ac09ad47e9851f$export$645d8b42908348a5(promises, progress) {
  return Promise.all(promises.map(p => p.then($60ac09ad47e9851f$export$3f23594af5f37336(progress))))
}
function $60ac09ad47e9851f$export$7a5d5c156e7dc406(arr) {
  return arr.filter((value, i) => arr.indexOf(value) === i)
}
function $60ac09ad47e9851f$export$3f23594af5f37336(fn) {
  return arg => (fn(arg), arg)
}
function $60ac09ad47e9851f$export$97b2edcb5cf7a406(arr) {
  const res = {}
  arr.forEach(item => {
    res[item.id] = item
  })
  return res
}
function $60ac09ad47e9851f$export$d128197463a29003(urlPatterns) {
  return {
    includes: urlPatterns?.includes?.map(item => item.pattern ?? '(不明なデータ)') ?? [],
    excludes: urlPatterns?.excludes?.map(item => item.pattern ?? '(不明なデータ)') ?? [],
  }
}

const $1ab6bd8d7c26b65e$var$columns = [
  ['id', 'ID'],
  ['name', '名前'],
  ['includes', '対象 URL パターン'],
  ['excludes', '対象外 URL パターン'],
  ['caseInsensitiveUrls', 'URL の大文字/小文字を区別'],
  ['archived', '削除済'],
  ['createdAt', '作成日'],
  ['modifiedAt', '更新日'],
]
async function $1ab6bd8d7c26b65e$var$exportPage() {
  const resources = [(0, $81a901bf94f6ea70$export$f4348e32a399a3d5)()]
  const modal = (0, $5344736c86cc6e45$export$670b0269826f1fb6).open({
    maxValue: resources.length,
  })
  const [pages] = await (0, $60ac09ad47e9851f$export$645d8b42908348a5)(resources, () => modal.increment())
  const rows = pages.map(item => {
    const { includes: includes, excludes: excludes } = (0, $60ac09ad47e9851f$export$d128197463a29003)(item.urlPatterns)
    item.includes = includes
    item.excludes = excludes
    item.createdAt = (0, $0d8073e98169485a$export$2e2bcd8739ae039)(item.createdAt).format('llll')
    item.modifiedAt = (0, $0d8073e98169485a$export$2e2bcd8739ae039)(item.modifiedAt).format('llll')
    return [...$1ab6bd8d7c26b65e$var$columns.map(column => item[column[0]])]
  })
  const header = $1ab6bd8d7c26b65e$var$columns.map(c => c[1])
  rows.unshift(header)
  ;(0, $cca200c3db417a02$export$41e4a1ce9117446a)(rows, 'ページ一覧')
}
function $1ab6bd8d7c26b65e$export$379a9313591378b0() {
  GM_registerMenuCommand('ページをエクスポート', $1ab6bd8d7c26b65e$var$exportPage)
}

const $15ec386b5042f3c1$var$itemProps = [
  'id',
  'order',
  'name',
  'description',
  'url',
  'scriptContents',
  'tagIds',
  'tagNames',
  'pageIds',
  'pageNames',
]
const $15ec386b5042f3c1$var$header = [
  'ID',
  '実行順序',
  '名前',
  '説明',
  'URL',
  'コード',
  '依存タグ ID',
  '依存タグ名',
  '依存ページ ID',
  '依存ページ名',
]
async function $15ec386b5042f3c1$var$exportScript() {
  const resources = [
    (0, $81a901bf94f6ea70$export$f4348e32a399a3d5)(),
    (0, $81a901bf94f6ea70$export$af63d7414243dad3)(),
    (0, $81a901bf94f6ea70$export$d9afdae50252705d)(),
  ]
  const modal = (0, $5344736c86cc6e45$export$670b0269826f1fb6).open({
    maxValue: resources.length,
  })
  const [pages, tags, scripts] = await (0, $60ac09ad47e9851f$export$645d8b42908348a5)(resources, () =>
    modal.increment(),
  )
  const pageById = (0, $60ac09ad47e9851f$export$97b2edcb5cf7a406)(pages)
  const tagById = (0, $60ac09ad47e9851f$export$97b2edcb5cf7a406)(tags)
  const rows = scripts.map(item => {
    const tagIds = item.tagsId?.filter(id => id in tagById) || []
    const pageIds = item.pagesId?.filter(id => id in pageById) || []
    item.tagIds = tagIds
    item.pageIds = pageIds
    item.tagNames = tagIds.map(id => tagById[id]?.name)
    item.pageNames = pageIds.map(id => pageById[id]?.name)
    return [...$15ec386b5042f3c1$var$itemProps.map(k => item[k])]
  })
  rows.unshift($15ec386b5042f3c1$var$header)
  ;(0, $cca200c3db417a02$export$41e4a1ce9117446a)(rows, 'スクリプト一覧')
}
function $15ec386b5042f3c1$export$e934023465b72acb() {
  GM_registerMenuCommand('スクリプトをエクスポート', $15ec386b5042f3c1$var$exportScript)
}

const $15ddd881b5ec070b$var$columns = [
  ['id', 'ID'],
  ['status', 'ステータス'],
  ['name', 'タグ名'],
  ['vendorName', 'サービス提供元'],
  ['tag', 'カスタムタグ'],
  ['catalog', 'カタログタグ'],
  ['conditionalFiring', 'タグ実行条件'],
  ['pageIds', '実行ページ ID'],
  ['pageNames', '実行ページ名'],
  ['includes', '対象 URL パターン'],
  ['excludes', '対象外 URL パターン'],
  ['createdAt', '作成日'],
  ['modifiedAt', '更新日'],
]
async function $15ddd881b5ec070b$var$exportTag() {
  const tagIds = Array.from($('.row-selected')).map(el => el.dataset.tagId)
  if (tagIds.findIndex(id => !id) !== -1) throw new Error('不正な選択アイテムがあります')
  if (!tagIds.length) {
    ;(0, $5344736c86cc6e45$export$fdc96b94563d4a64).open({
      message: 'エクスポートするタグを選択してください',
    })
    return
  }
  const modal = (0, $5344736c86cc6e45$export$670b0269826f1fb6).open({
    maxValue: tagIds.length * 2,
  })
  const rows = await Promise.all(
    tagIds.map(async id => {
      const [tag, pages] = await (0, $60ac09ad47e9851f$export$645d8b42908348a5)(
        [(0, $81a901bf94f6ea70$export$92e8fbca45acc46f)(id), (0, $81a901bf94f6ea70$export$d6071470ea0e8404)(id)],
        () => modal.increment(),
      )
      tag.pageIds = pages.map(p => p.id)
      tag.pageNames = pages.map(p => p.name)
      const patterns = pages.map(p => (0, $60ac09ad47e9851f$export$d128197463a29003)(p.urlPatterns))
      tag.includes = (0, $60ac09ad47e9851f$export$7a5d5c156e7dc406)(patterns.flatMap(item => item.includes).sort())
      tag.excludes = (0, $60ac09ad47e9851f$export$7a5d5c156e7dc406)(patterns.flatMap(item => item.excludes).sort())
      const fields = tag.fields.reduce((o, p) => ((o[p.key] = p.value), o), {})
      if (tag.tagDefinitionId === 'custom_markup_parsing_tag') tag.tag = fields.markup
      else tag.catalog = fields
      tag.status =
        {
          ACTIVE: '有効',
          INACTIVE: '無効',
        }[tag.status] || tag.status
      tag.createdAt = (0, $0d8073e98169485a$export$2e2bcd8739ae039)(tag.createdAt).format('llll')
      tag.modifiedAt = (0, $0d8073e98169485a$export$2e2bcd8739ae039)(tag.modifiedAt).format('llll')
      return [...$15ddd881b5ec070b$var$columns.map(column => tag[column[0]])]
    }),
  )
  const header = $15ddd881b5ec070b$var$columns.map(c => c[1])
  rows.unshift(header)
  ;(0, $cca200c3db417a02$export$41e4a1ce9117446a)(rows, 'サービスタグ')
}
function $15ddd881b5ec070b$export$b18f00d56ce6384c() {
  GM_registerMenuCommand('タグをエクスポート', $15ddd881b5ec070b$var$exportTag)
}

// https://control.theyjtag.jp/sites/*/tags
// https://control.theyjtag.jp/sites/*/pages/*/tag-assignments
if (/^\/sites\/[^/]+\/(?:tags|pages\/[^/]+\/tag-assignments)$/.test(location.pathname))
  (0, $15ddd881b5ec070b$export$b18f00d56ce6384c)()
;(0, $ece901bf57594d2d$export$f2a81b5ef1968fea)()
;(0, $1ab6bd8d7c26b65e$export$379a9313591378b0)()
;(0, $15ec386b5042f3c1$export$e934023465b72acb)()
