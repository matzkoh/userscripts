// ==UserScript==
// @name         YTM Exporter
// @namespace    https://github.com/matzkoh
// @version      1.0.0
// @description  Export to excel for YTM console
// @author       matzkoh
// @include      https://control.theyjtag.jp/sites/*/tags
// @grant        GM_registerMenuCommand
// ==/UserScript==

;(function() {
  function $parcel$interopDefault(a) {
    return a && a.__esModule
      ? {
          d: a.default,
        }
      : {
          d: a,
        }
  }

  // ASSET: ../../../node_modules/dayjs/dayjs.min.js
  var $XZPv$exports = {}
  var $XZPv$var$define
  !(function(t, n) {
    'object' == typeof $XZPv$exports && 'undefined' != 'object'
      ? ($XZPv$exports = n())
      : 'function' == typeof $XZPv$var$define && $XZPv$var$define.amd
      ? $XZPv$var$define(n)
      : (t.dayjs = n())
  })($XZPv$exports, function() {
    var t = 'millisecond',
      n = 'second',
      e = 'minute',
      r = 'hour',
      i = 'day',
      s = 'week',
      u = 'month',
      a = 'year',
      o = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
      h = /\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      f = function(t, n, e) {
        var r = String(t)
        return !r || r.length >= n ? t : '' + Array(n + 1 - r.length).join(e) + t
      },
      c = {
        padStart: f,
        padZoneStr: function(t) {
          var n = Math.abs(t),
            e = Math.floor(n / 60),
            r = n % 60
          return (t <= 0 ? '+' : '-') + f(e, 2, '0') + ':' + f(r, 2, '0')
        },
        monthDiff: function(t, n) {
          var e = 12 * (n.year() - t.year()) + (n.month() - t.month()),
            r = t.clone().add(e, 'months'),
            i = n - r < 0,
            s = t.clone().add(e + (i ? -1 : 1), 'months')
          return Number(-(e + (n - r) / (i ? r - s : s - r)) || 0)
        },
        absFloor: function(t) {
          return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
        },
        prettyUnit: function(o) {
          return (
            {
              M: u,
              y: a,
              w: s,
              d: i,
              h: r,
              m: e,
              s: n,
              ms: t,
            }[o] ||
            String(o || '')
              .toLowerCase()
              .replace(/s$/, '')
          )
        },
        isUndefined: function(t) {
          return void 0 === t
        },
      },
      d = {
        name: 'en',
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
      },
      $ = 'en',
      l = {}

    l[$] = d

    var m = function(t) {
        return t instanceof D
      },
      y = function(t, n, e) {
        var r
        if (!t) return null
        if ('string' == typeof t) l[t] && (r = t), n && ((l[t] = n), (r = t))
        else {
          var i = t.name
          ;(l[i] = t), (r = i)
        }
        return e || ($ = r), r
      },
      M = function(t, n, e) {
        if (m(t)) return t.clone()
        var r = n
          ? 'string' == typeof n
            ? {
                format: n,
                pl: e,
              }
            : n
          : {}
        return (r.date = t), new D(r)
      },
      p = function(t, n) {
        return M(t, {
          locale: n.$L,
        })
      },
      S = c

    ;(S.parseLocale = y), (S.isDayjs = m), (S.wrapper = p)

    var D = (function() {
      function f(t) {
        ;(this.$L = this.$L || y(t.locale, null, !0) || $), this.parse(t)
      }

      var c = f.prototype
      return (
        (c.parse = function(t) {
          ;(this.$d = (function(t) {
            if (null === t) return new Date(NaN)
            if (S.isUndefined(t)) return new Date()
            if (t instanceof Date) return t

            if ('string' == typeof t && !/Z$/i.test(t)) {
              var n = t.match(o)
              if (n) return new Date(n[1], n[2] - 1, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, n[7] || 0)
            }

            return new Date(t)
          })(t.date)),
            this.init()
        }),
        (c.init = function() {
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
        (c.$utils = function() {
          return S
        }),
        (c.isValid = function() {
          return !('Invalid Date' === this.$d.toString())
        }),
        (c.isSame = function(t, n) {
          var e = M(t)
          return this.startOf(n) <= e && e <= this.endOf(n)
        }),
        (c.isAfter = function(t, n) {
          return M(t) < this.startOf(n)
        }),
        (c.isBefore = function(t, n) {
          return this.endOf(n) < M(t)
        }),
        (c.year = function() {
          return this.$y
        }),
        (c.month = function() {
          return this.$M
        }),
        (c.day = function() {
          return this.$W
        }),
        (c.date = function() {
          return this.$D
        }),
        (c.hour = function() {
          return this.$H
        }),
        (c.minute = function() {
          return this.$m
        }),
        (c.second = function() {
          return this.$s
        }),
        (c.millisecond = function() {
          return this.$ms
        }),
        (c.unix = function() {
          return Math.floor(this.valueOf() / 1e3)
        }),
        (c.valueOf = function() {
          return this.$d.getTime()
        }),
        (c.startOf = function(t, o) {
          var h = this,
            f = !!S.isUndefined(o) || o,
            c = S.prettyUnit(t),
            d = function(t, n) {
              var e = p(new Date(h.$y, n, t), h)
              return f ? e : e.endOf(i)
            },
            $ = function(t, n) {
              return p(h.toDate()[t].apply(h.toDate(), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)), h)
            },
            l = this.$W,
            m = this.$M,
            y = this.$D

          switch (c) {
            case a:
              return f ? d(1, 0) : d(31, 11)

            case u:
              return f ? d(1, m) : d(0, m + 1)

            case s:
              var M = this.$locale().weekStart || 0,
                D = (l < M ? l + 7 : l) - M
              return d(f ? y - D : y + (6 - D), m)

            case i:
            case 'date':
              return $('setHours', 0)

            case r:
              return $('setMinutes', 1)

            case e:
              return $('setSeconds', 2)

            case n:
              return $('setMilliseconds', 3)

            default:
              return this.clone()
          }
        }),
        (c.endOf = function(t) {
          return this.startOf(t, !1)
        }),
        (c.$set = function(s, o) {
          var h,
            f = S.prettyUnit(s),
            c = ((h = {}),
            (h[i] = 'setDate'),
            (h.date = 'setDate'),
            (h[u] = 'setMonth'),
            (h[a] = 'setFullYear'),
            (h[r] = 'setHours'),
            (h[e] = 'setMinutes'),
            (h[n] = 'setSeconds'),
            (h[t] = 'setMilliseconds'),
            h)[f],
            d = f === i ? this.$D + (o - this.$W) : o
          return this.$d[c] && this.$d[c](d), this.init(), this
        }),
        (c.set = function(t, n) {
          return this.clone().$set(t, n)
        }),
        (c.add = function(t, o) {
          var h,
            f = this
          t = Number(t)

          var c = S.prettyUnit(o),
            d = function(n, e) {
              var r = f.set('date', 1).set(n, e + t)
              return r.set('date', Math.min(f.$D, r.daysInMonth()))
            },
            $ = function(n) {
              var e = new Date(f.$d)
              return e.setDate(e.getDate() + n * t), p(e, f)
            }

          if (c === u) return d(u, this.$M)
          if (c === a) return d(a, this.$y)
          if (c === i) return $(1)
          if (c === s) return $(7)
          var l = ((h = {}), (h[e] = 6e4), (h[r] = 36e5), (h[n] = 1e3), h)[c] || 1,
            m = this.valueOf() + t * l
          return p(m, this)
        }),
        (c.subtract = function(t, n) {
          return this.add(-1 * t, n)
        }),
        (c.format = function(t) {
          var n = this
          if (!this.isValid()) return 'Invalid Date'

          var e = t || 'YYYY-MM-DDTHH:mm:ssZ',
            r = S.padZoneStr(this.$d.getTimezoneOffset()),
            i = this.$locale(),
            s = i.weekdays,
            u = i.months,
            a = function(t, n, e, r) {
              return (t && t[n]) || e[n].substr(0, r)
            },
            o = function(t) {
              return S.padStart(n.$H % 12 || 12, t, '0')
            },
            f = {
              YY: String(this.$y).slice(-2),
              YYYY: String(this.$y),
              M: String(this.$M + 1),
              MM: S.padStart(this.$M + 1, 2, '0'),
              MMM: a(i.monthsShort, this.$M, u, 3),
              MMMM: u[this.$M],
              D: String(this.$D),
              DD: S.padStart(this.$D, 2, '0'),
              d: String(this.$W),
              dd: a(i.weekdaysMin, this.$W, s, 2),
              ddd: a(i.weekdaysShort, this.$W, s, 3),
              dddd: s[this.$W],
              H: String(this.$H),
              HH: S.padStart(this.$H, 2, '0'),
              h: o(1),
              hh: o(2),
              a: this.$H < 12 ? 'am' : 'pm',
              A: this.$H < 12 ? 'AM' : 'PM',
              m: String(this.$m),
              mm: S.padStart(this.$m, 2, '0'),
              s: String(this.$s),
              ss: S.padStart(this.$s, 2, '0'),
              SSS: S.padStart(this.$ms, 3, '0'),
              Z: r,
            }

          return e.replace(h, function(t) {
            return t.indexOf('[') > -1 ? t.replace(/\[|\]/g, '') : f[t] || r.replace(':', '')
          })
        }),
        (c.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
        }),
        (c.diff = function(t, o, h) {
          var f,
            c = S.prettyUnit(o),
            d = M(t),
            $ = 6e4 * (d.utcOffset() - this.utcOffset()),
            l = this - d,
            m = S.monthDiff(this, d)
          return (
            (m =
              ((f = {}),
              (f[a] = m / 12),
              (f[u] = m),
              (f.quarter = m / 3),
              (f[s] = (l - $) / 6048e5),
              (f[i] = (l - $) / 864e5),
              (f[r] = l / 36e5),
              (f[e] = l / 6e4),
              (f[n] = l / 1e3),
              f)[c] || l),
            h ? m : S.absFloor(m)
          )
        }),
        (c.daysInMonth = function() {
          return this.endOf(u).$D
        }),
        (c.$locale = function() {
          return l[this.$L]
        }),
        (c.locale = function(t, n) {
          var e = this.clone()
          return (e.$L = y(t, n, !0)), e
        }),
        (c.clone = function() {
          return p(this.toDate(), this)
        }),
        (c.toDate = function() {
          return new Date(this.$d)
        }),
        (c.toArray = function() {
          return [this.$y, this.$M, this.$D, this.$H, this.$m, this.$s, this.$ms]
        }),
        (c.toJSON = function() {
          return this.toISOString()
        }),
        (c.toISOString = function() {
          return this.$d.toISOString()
        }),
        (c.toObject = function() {
          return {
            years: this.$y,
            months: this.$M,
            date: this.$D,
            hours: this.$H,
            minutes: this.$m,
            seconds: this.$s,
            milliseconds: this.$ms,
          }
        }),
        (c.toString = function() {
          return this.$d.toUTCString()
        }),
        f
      )
    })()

    return (
      (M.prototype = D.prototype),
      (M.extend = function(t, n) {
        return t(n, D, M), M
      }),
      (M.locale = y),
      (M.isDayjs = m),
      (M.unix = function(t) {
        return M(1e3 * t)
      }),
      (M.en = l[$]),
      (M.Ls = l),
      M
    )
  })
  {
  }

  /* global $:false */

  GM_registerMenuCommand('エクスポート', async () => {
    const headers = ['id', 'status', 'name', 'vendorName', 'createdAt', 'modifiedAt', 'tag', 'catalog']
    const urls = Array.from($('.row-selected .tag-detail-link')).map(a => new URL('attributes', a.href))
    const totalCount = urls.length

    if (!totalCount) {
      $Focm$var$AlertModal.open()
      return
    }

    const modal = $Focm$var$ProgressModal.open({
      maxValue: totalCount,
    })
    unsafeWindow.__modal = modal
    const rows = await Promise.all(
      urls.map(async url => {
        const { tag } = await $.get(url)
        const fields = tag.fields.reduce((o, p) => ((o[p.key] = p.value), o), {})

        if (tag.defaultTagCategoryName === 'Functional') {
          tag.tag = fields.markup
        } else {
          tag.catalog = JSON.stringify(fields)
        }

        modal.increment()
        return headers.map(k => tag[k])
      }),
    )
    rows.unshift(headers)
    console.log(rows)
    var $XZPv$$interop$default = $parcel$interopDefault($XZPv$exports)
    const date = $XZPv$$interop$default.d().format('YYYYMMDD')
    const site = $('#currentSite')
      .text()
      .trim()
    const blob = $Focm$var$createExcelCsvBlob(rows)
    const fileName = `[${date}] [${site}] サービスタグ.csv`
    $Focm$var$saveBlob(blob, fileName)
  })

  function $Focm$var$saveBlob(blob, fileName) {
    const url = URL.createObjectURL(blob)
    $('<a/>')
      .attr('download', fileName)
      .prop('href', url)
      .appendTo('body')
      .each((_, a) => a.click())
      .remove()
    URL.revokeObjectURL(url)
  }

  function $Focm$var$createExcelCsvBlob(rows) {
    const value = $Focm$var$csvStringify(rows)
    const bom = new Uint8Array([0xef, 0xbb, 0xbf])
    return new Blob([bom, value], {
      type: 'text/csv',
    })
  }

  function $Focm$var$csvStringify(rows) {
    return rows.map(cells => cells.map($Focm$var$quoteForCsv).join(',')).join('\r\n')
  }

  function $Focm$var$quoteForCsv(value) {
    var _value

    return `"${String((_value = value) !== null && _value !== void 0 ? _value : '').replace(/"/g, '""')}"`
  }

  class $Focm$var$Modal {
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
        background: '#fffc',
      })

      if (options.closeOnClick) {
        wrapper.on('click', () => this.close())
      }

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

  class $Focm$var$AlertModal extends $Focm$var$Modal {
    constructor(options) {
      super({ ...options, closeOnClick: true })
      this.body.text(this.options.message)
    }
  }

  class $Focm$var$ProgressModal extends $Focm$var$Modal {
    constructor(options) {
      super(options)
      this.value = 0
      this.text = $('<div>').css({
        fontSize: '4vw',
      })
      this.progress = $('<progress/>')
        .attr('max', this.options.maxValue)
        .css({
          width: '50vw',
          height: '2vw',
          backgroundColor: 'transparent',
        })
      this.body
        .css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10vw',
        })
        .append(this.text)
        .append(this.progress)
      this.update()
    }

    update() {
      this.progress.val(this.value)
      this.text.text(`${((this.value / this.options.maxValue) * 100) | 0}%`)

      if (this.options.maxValue <= this.value) {
        this.body.slideUp().queue(() => this.close())
      }

      return this
    }

    increment(value = 1) {
      this.value += value
      return this.update()
    }
  }
})()
