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
      a = 'quarter',
      o = 'year',
      h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
      f = /\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      c = function(t, n, e) {
        var r = String(t)
        return !r || r.length >= n ? t : '' + Array(n + 1 - r.length).join(e) + t
      },
      d = {
        s: c,
        z: function(t) {
          var n = -t.utcOffset(),
            e = Math.abs(n),
            r = Math.floor(e / 60),
            i = e % 60
          return (n <= 0 ? '+' : '-') + c(r, 2, '0') + ':' + c(i, 2, '0')
        },
        m: function(t, n) {
          var e = 12 * (n.year() - t.year()) + (n.month() - t.month()),
            r = t.clone().add(e, u),
            i = n - r < 0,
            s = t.clone().add(e + (i ? -1 : 1), u)
          return Number(-(e + (n - r) / (i ? r - s : s - r)) || 0)
        },
        a: function(t) {
          return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
        },
        p: function(h) {
          return (
            {
              M: u,
              y: o,
              w: s,
              d: i,
              h: r,
              m: e,
              s: n,
              ms: t,
              Q: a,
            }[h] ||
            String(h || '')
              .toLowerCase()
              .replace(/s$/, '')
          )
        },
        u: function(t) {
          return void 0 === t
        },
      },
      $ = {
        name: 'en',
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
      },
      l = 'en',
      m = {}

    m[l] = $

    var y = function(t) {
        return t instanceof S
      },
      M = function(t, n, e) {
        var r
        if (!t) return null
        if ('string' == typeof t) m[t] && (r = t), n && ((m[t] = n), (r = t))
        else {
          var i = t.name
          ;(m[i] = t), (r = i)
        }
        return e || (l = r), r
      },
      g = function(t, n, e) {
        if (y(t)) return t.clone()
        var r = n
          ? 'string' == typeof n
            ? {
                format: n,
                pl: e,
              }
            : n
          : {}
        return (r.date = t), new S(r)
      },
      D = d

    ;(D.l = M),
      (D.i = y),
      (D.w = function(t, n) {
        return g(t, {
          locale: n.$L,
          utc: n.$u,
        })
      })

    var S = (function() {
      function c(t) {
        ;(this.$L = this.$L || M(t.locale, null, !0) || l), this.parse(t)
      }

      var d = c.prototype
      return (
        (d.parse = function(t) {
          ;(this.$d = (function(t) {
            var n = t.date,
              e = t.utc
            if (null === n) return new Date(NaN)
            if (D.u(n)) return new Date()
            if (n instanceof Date) return new Date(n)

            if ('string' == typeof n && !/Z$/i.test(n)) {
              var r = n.match(h)
              if (r)
                return e
                  ? new Date(Date.UTC(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0))
                  : new Date(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)
            }

            return new Date(n)
          })(t)),
            this.init()
        }),
        (d.init = function() {
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
        (d.$utils = function() {
          return D
        }),
        (d.isValid = function() {
          return !('Invalid Date' === this.$d.toString())
        }),
        (d.isSame = function(t, n) {
          var e = g(t)
          return this.startOf(n) <= e && e <= this.endOf(n)
        }),
        (d.isAfter = function(t, n) {
          return g(t) < this.startOf(n)
        }),
        (d.isBefore = function(t, n) {
          return this.endOf(n) < g(t)
        }),
        (d.$g = function(t, n, e) {
          return D.u(t) ? this[n] : this.set(e, t)
        }),
        (d.year = function(t) {
          return this.$g(t, '$y', o)
        }),
        (d.month = function(t) {
          return this.$g(t, '$M', u)
        }),
        (d.day = function(t) {
          return this.$g(t, '$W', i)
        }),
        (d.date = function(t) {
          return this.$g(t, '$D', 'date')
        }),
        (d.hour = function(t) {
          return this.$g(t, '$H', r)
        }),
        (d.minute = function(t) {
          return this.$g(t, '$m', e)
        }),
        (d.second = function(t) {
          return this.$g(t, '$s', n)
        }),
        (d.millisecond = function(n) {
          return this.$g(n, '$ms', t)
        }),
        (d.unix = function() {
          return Math.floor(this.valueOf() / 1e3)
        }),
        (d.valueOf = function() {
          return this.$d.getTime()
        }),
        (d.startOf = function(t, a) {
          var h = this,
            f = !!D.u(a) || a,
            c = D.p(t),
            d = function(t, n) {
              var e = D.w(h.$u ? Date.UTC(h.$y, n, t) : new Date(h.$y, n, t), h)
              return f ? e : e.endOf(i)
            },
            $ = function(t, n) {
              return D.w(h.toDate()[t].apply(h.toDate(), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)), h)
            },
            l = this.$W,
            m = this.$M,
            y = this.$D,
            M = 'set' + (this.$u ? 'UTC' : '')

          switch (c) {
            case o:
              return f ? d(1, 0) : d(31, 11)

            case u:
              return f ? d(1, m) : d(0, m + 1)

            case s:
              var g = this.$locale().weekStart || 0,
                S = (l < g ? l + 7 : l) - g
              return d(f ? y - S : y + (6 - S), m)

            case i:
            case 'date':
              return $(M + 'Hours', 0)

            case r:
              return $(M + 'Minutes', 1)

            case e:
              return $(M + 'Seconds', 2)

            case n:
              return $(M + 'Milliseconds', 3)

            default:
              return this.clone()
          }
        }),
        (d.endOf = function(t) {
          return this.startOf(t, !1)
        }),
        (d.$set = function(s, a) {
          var h,
            f = D.p(s),
            c = 'set' + (this.$u ? 'UTC' : ''),
            d = ((h = {}),
            (h[i] = c + 'Date'),
            (h.date = c + 'Date'),
            (h[u] = c + 'Month'),
            (h[o] = c + 'FullYear'),
            (h[r] = c + 'Hours'),
            (h[e] = c + 'Minutes'),
            (h[n] = c + 'Seconds'),
            (h[t] = c + 'Milliseconds'),
            h)[f],
            $ = f === i ? this.$D + (a - this.$W) : a
          return this.$d[d] && this.$d[d]($), this.init(), this
        }),
        (d.set = function(t, n) {
          return this.clone().$set(t, n)
        }),
        (d.add = function(t, a) {
          var h,
            f = this
          t = Number(t)

          var c = D.p(a),
            d = function(n, e) {
              var r = f
                .clone()
                .set('date', 1)
                .set(n, e + t)
              return r.set('date', Math.min(f.$D, r.daysInMonth()))
            },
            $ = function(n) {
              var e = new Date(f.$d)
              return e.setDate(e.getDate() + n * t), D.w(e, f)
            }

          if (c === u) return d(u, this.$M)
          if (c === o) return d(o, this.$y)
          if (c === i) return $(1)
          if (c === s) return $(7)
          var l = ((h = {}), (h[e] = 6e4), (h[r] = 36e5), (h[n] = 1e3), h)[c] || 1,
            m = this.valueOf() + t * l
          return D.w(m, this)
        }),
        (d.subtract = function(t, n) {
          return this.add(-1 * t, n)
        }),
        (d.format = function(t) {
          var n = this
          if (!this.isValid()) return 'Invalid Date'

          var e = t || 'YYYY-MM-DDTHH:mm:ssZ',
            r = D.z(this),
            i = this.$locale(),
            s = i.weekdays,
            u = i.months,
            a = function(t, n, e, r) {
              return (t && t[n]) || e[n].substr(0, r)
            },
            o = function(t) {
              return D.s(n.$H % 12 || 12, t, '0')
            },
            h = {
              YY: String(this.$y).slice(-2),
              YYYY: String(this.$y),
              M: String(this.$M + 1),
              MM: D.s(this.$M + 1, 2, '0'),
              MMM: a(i.monthsShort, this.$M, u, 3),
              MMMM: u[this.$M],
              D: String(this.$D),
              DD: D.s(this.$D, 2, '0'),
              d: String(this.$W),
              dd: a(i.weekdaysMin, this.$W, s, 2),
              ddd: a(i.weekdaysShort, this.$W, s, 3),
              dddd: s[this.$W],
              H: String(this.$H),
              HH: D.s(this.$H, 2, '0'),
              h: o(1),
              hh: o(2),
              a: this.$H < 12 ? 'am' : 'pm',
              A: this.$H < 12 ? 'AM' : 'PM',
              m: String(this.$m),
              mm: D.s(this.$m, 2, '0'),
              s: String(this.$s),
              ss: D.s(this.$s, 2, '0'),
              SSS: D.s(this.$ms, 3, '0'),
              Z: r,
            }

          return e.replace(f, function(t) {
            return t.indexOf('[') > -1 ? t.replace(/\[|\]/g, '') : h[t] || r.replace(':', '')
          })
        }),
        (d.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
        }),
        (d.diff = function(t, h, f) {
          var c,
            d = D.p(h),
            $ = g(t),
            l = 6e4 * ($.utcOffset() - this.utcOffset()),
            m = this - $,
            y = D.m(this, $)
          return (
            (y =
              ((c = {}),
              (c[o] = y / 12),
              (c[u] = y),
              (c[a] = y / 3),
              (c[s] = (m - l) / 6048e5),
              (c[i] = (m - l) / 864e5),
              (c[r] = m / 36e5),
              (c[e] = m / 6e4),
              (c[n] = m / 1e3),
              c)[d] || m),
            f ? y : D.a(y)
          )
        }),
        (d.daysInMonth = function() {
          return this.endOf(u).$D
        }),
        (d.$locale = function() {
          return m[this.$L]
        }),
        (d.locale = function(t, n) {
          if (!t) return this.$L
          var e = this.clone()
          return (e.$L = M(t, n, !0)), e
        }),
        (d.clone = function() {
          return D.w(this.toDate(), this)
        }),
        (d.toDate = function() {
          return new Date(this.$d)
        }),
        (d.toJSON = function() {
          return this.toISOString()
        }),
        (d.toISOString = function() {
          return this.$d.toISOString()
        }),
        (d.toString = function() {
          return this.$d.toUTCString()
        }),
        c
      )
    })()

    return (
      (g.prototype = S.prototype),
      (g.extend = function(t, n) {
        return t(n, S, g), g
      }),
      (g.locale = M),
      (g.isDayjs = y),
      (g.unix = function(t) {
        return g(1e3 * t)
      }),
      (g.en = m[l]),
      (g.Ls = m),
      g
    )
  })
  {
  }

  /* global $:false */

  const $Focm$var$tagCsvHeaders = ['id', 'status', 'name', 'vendorName', 'createdAt', 'modifiedAt', 'tag', 'catalog']
  GM_registerMenuCommand('タグをエクスポート', async () => {
    const urls = Array.from($('.row-selected .tag-detail-link')).map(a => new URL('attributes', a.href))
    const totalCount = urls.length

    if (!totalCount) {
      $Focm$var$AlertModal.open({
        message: 'エクスポートするタグを選択してください',
      })
      return
    }

    const modal = $Focm$var$ProgressModal.open({
      maxValue: totalCount,
    })
    unsafeWindow.__modal = modal
    const rows = await Promise.all(
      urls.map(async url => {
        const res = await $.get(url)
        modal.increment()
        return $Focm$var$tagDetailToRow(res)
      }),
    )
    rows.unshift($Focm$var$tagCsvHeaders)
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

  async function $Focm$var$tagDetailToRow({ tag }) {
    const fields = tag.fields.reduce((o, p) => ((o[p.key] = p.value), o), {})

    if (tag.defaultTagCategoryName === 'Functional') {
      tag.tag = fields.markup
    } else {
      tag.catalog = JSON.stringify(fields)
    }

    return $Focm$var$tagCsvHeaders.map(k => tag[k])
  }

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
