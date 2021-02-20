// ==UserScript==
// @name         YTM Exporter
// @namespace    https://github.com/matzkoh
// @version      1.4.1
// @description  Export to excel for YTM console
// @author       matzkoh
// @include      https://control.theyjtag.jp/sites/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

;(function () {
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
  var $XZPv$exports,
    $XZPv$var$define,
    $XZPv$executed = false

  function $XZPv$init() {
    if ($XZPv$executed) return
    $XZPv$executed = true
    $XZPv$exports = {}
    !(function (t, e) {
      'object' == typeof $XZPv$exports && 'undefined' != 'object'
        ? ($XZPv$exports = e())
        : 'function' == typeof $XZPv$var$define && $XZPv$var$define.amd
        ? $XZPv$var$define(e)
        : (t.dayjs = e())
    })($XZPv$exports, function () {
      var t = 'millisecond',
        e = 'second',
        n = 'minute',
        r = 'hour',
        i = 'day',
        s = 'week',
        u = 'month',
        a = 'quarter',
        o = 'year',
        f = 'date',
        h = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
        c = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        d = {
          name: 'en',
          weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
          months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        },
        $ = function (t, e, n) {
          var r = String(t)
          return !r || r.length >= e ? t : '' + Array(e + 1 - r.length).join(n) + t
        },
        l = {
          s: $,
          z: function (t) {
            var e = -t.utcOffset(),
              n = Math.abs(e),
              r = Math.floor(n / 60),
              i = n % 60
            return (e <= 0 ? '+' : '-') + $(r, 2, '0') + ':' + $(i, 2, '0')
          },
          m: function t(e, n) {
            if (e.date() < n.date()) return -t(n, e)
            var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
              i = e.clone().add(r, u),
              s = n - i < 0,
              a = e.clone().add(r + (s ? -1 : 1), u)
            return +(-(r + (n - i) / (s ? i - a : a - i)) || 0)
          },
          a: function (t) {
            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
          },
          p: function (h) {
            return (
              {
                M: u,
                y: o,
                w: s,
                d: i,
                D: f,
                h: r,
                m: n,
                s: e,
                ms: t,
                Q: a,
              }[h] ||
              String(h || '')
                .toLowerCase()
                .replace(/s$/, '')
            )
          },
          u: function (t) {
            return void 0 === t
          },
        },
        y = 'en',
        M = {}

      M[y] = d

      var m = function (t) {
          return t instanceof S
        },
        D = function (t, e, n) {
          var r
          if (!t) return y
          if ('string' == typeof t) M[t] && (r = t), e && ((M[t] = e), (r = t))
          else {
            var i = t.name
            ;(M[i] = t), (r = i)
          }
          return !n && r && (y = r), r || (!n && y)
        },
        v = function (t, e) {
          if (m(t)) return t.clone()
          var n = 'object' == typeof e ? e : {}
          return (n.date = t), (n.args = arguments), new S(n)
        },
        g = l

      ;(g.l = D),
        (g.i = m),
        (g.w = function (t, e) {
          return v(t, {
            locale: e.$L,
            utc: e.$u,
            x: e.$x,
            $offset: e.$offset,
          })
        })

      var S = (function () {
          function d(t) {
            ;(this.$L = D(t.locale, null, !0)), this.parse(t)
          }

          var $ = d.prototype
          return (
            ($.parse = function (t) {
              ;(this.$d = (function (t) {
                var e = t.date,
                  n = t.utc
                if (null === e) return new Date(NaN)
                if (g.u(e)) return new Date()
                if (e instanceof Date) return new Date(e)

                if ('string' == typeof e && !/Z$/i.test(e)) {
                  var r = e.match(h)

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
            ($.init = function () {
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
            ($.$utils = function () {
              return g
            }),
            ($.isValid = function () {
              return !('Invalid Date' === this.$d.toString())
            }),
            ($.isSame = function (t, e) {
              var n = v(t)
              return this.startOf(e) <= n && n <= this.endOf(e)
            }),
            ($.isAfter = function (t, e) {
              return v(t) < this.startOf(e)
            }),
            ($.isBefore = function (t, e) {
              return this.endOf(e) < v(t)
            }),
            ($.$g = function (t, e, n) {
              return g.u(t) ? this[e] : this.set(n, t)
            }),
            ($.unix = function () {
              return Math.floor(this.valueOf() / 1e3)
            }),
            ($.valueOf = function () {
              return this.$d.getTime()
            }),
            ($.startOf = function (t, a) {
              var h = this,
                c = !!g.u(a) || a,
                d = g.p(t),
                $ = function (t, e) {
                  var n = g.w(h.$u ? Date.UTC(h.$y, e, t) : new Date(h.$y, e, t), h)
                  return c ? n : n.endOf(i)
                },
                l = function (t, e) {
                  return g.w(h.toDate()[t].apply(h.toDate('s'), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), h)
                },
                y = this.$W,
                M = this.$M,
                m = this.$D,
                D = 'set' + (this.$u ? 'UTC' : '')

              switch (d) {
                case o:
                  return c ? $(1, 0) : $(31, 11)

                case u:
                  return c ? $(1, M) : $(0, M + 1)

                case s:
                  var v = this.$locale().weekStart || 0,
                    S = (y < v ? y + 7 : y) - v
                  return $(c ? m - S : m + (6 - S), M)

                case i:
                case f:
                  return l(D + 'Hours', 0)

                case r:
                  return l(D + 'Minutes', 1)

                case n:
                  return l(D + 'Seconds', 2)

                case e:
                  return l(D + 'Milliseconds', 3)

                default:
                  return this.clone()
              }
            }),
            ($.endOf = function (t) {
              return this.startOf(t, !1)
            }),
            ($.$set = function (s, a) {
              var h,
                c = g.p(s),
                d = 'set' + (this.$u ? 'UTC' : ''),
                $ = ((h = {}),
                (h[i] = d + 'Date'),
                (h[f] = d + 'Date'),
                (h[u] = d + 'Month'),
                (h[o] = d + 'FullYear'),
                (h[r] = d + 'Hours'),
                (h[n] = d + 'Minutes'),
                (h[e] = d + 'Seconds'),
                (h[t] = d + 'Milliseconds'),
                h)[c],
                l = c === i ? this.$D + (a - this.$W) : a

              if (c === u || c === o) {
                var y = this.clone().set(f, 1)
                y.$d[$](l), y.init(), (this.$d = y.set(f, Math.min(this.$D, y.daysInMonth())).$d)
              } else $ && this.$d[$](l)

              return this.init(), this
            }),
            ($.set = function (t, e) {
              return this.clone().$set(t, e)
            }),
            ($.get = function (t) {
              return this[g.p(t)]()
            }),
            ($.add = function (t, a) {
              var f,
                h = this
              t = Number(t)

              var c = g.p(a),
                d = function (e) {
                  var n = v(h)
                  return g.w(n.date(n.date() + Math.round(e * t)), h)
                }

              if (c === u) return this.set(u, this.$M + t)
              if (c === o) return this.set(o, this.$y + t)
              if (c === i) return d(1)
              if (c === s) return d(7)
              var $ = ((f = {}), (f[n] = 6e4), (f[r] = 36e5), (f[e] = 1e3), f)[c] || 1,
                l = this.$d.getTime() + t * $
              return g.w(l, this)
            }),
            ($.subtract = function (t, e) {
              return this.add(-1 * t, e)
            }),
            ($.format = function (t) {
              var e = this
              if (!this.isValid()) return 'Invalid Date'

              var n = t || 'YYYY-MM-DDTHH:mm:ssZ',
                r = g.z(this),
                i = this.$locale(),
                s = this.$H,
                u = this.$m,
                a = this.$M,
                o = i.weekdays,
                f = i.months,
                h = function (t, r, i, s) {
                  return (t && (t[r] || t(e, n))) || i[r].substr(0, s)
                },
                d = function (t) {
                  return g.s(s % 12 || 12, t, '0')
                },
                $ =
                  i.meridiem ||
                  function (t, e, n) {
                    var r = t < 12 ? 'AM' : 'PM'
                    return n ? r.toLowerCase() : r
                  },
                l = {
                  YY: String(this.$y).slice(-2),
                  YYYY: this.$y,
                  M: a + 1,
                  MM: g.s(a + 1, 2, '0'),
                  MMM: h(i.monthsShort, a, f, 3),
                  MMMM: h(f, a),
                  D: this.$D,
                  DD: g.s(this.$D, 2, '0'),
                  d: String(this.$W),
                  dd: h(i.weekdaysMin, this.$W, o, 2),
                  ddd: h(i.weekdaysShort, this.$W, o, 3),
                  dddd: o[this.$W],
                  H: String(s),
                  HH: g.s(s, 2, '0'),
                  h: d(1),
                  hh: d(2),
                  a: $(s, u, !0),
                  A: $(s, u, !1),
                  m: String(u),
                  mm: g.s(u, 2, '0'),
                  s: String(this.$s),
                  ss: g.s(this.$s, 2, '0'),
                  SSS: g.s(this.$ms, 3, '0'),
                  Z: r,
                }

              return n.replace(c, function (t, e) {
                return e || l[t] || r.replace(':', '')
              })
            }),
            ($.utcOffset = function () {
              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
            }),
            ($.diff = function (t, f, h) {
              var c,
                d = g.p(f),
                $ = v(t),
                l = 6e4 * ($.utcOffset() - this.utcOffset()),
                y = this - $,
                M = g.m(this, $)
              return (
                (M =
                  ((c = {}),
                  (c[o] = M / 12),
                  (c[u] = M),
                  (c[a] = M / 3),
                  (c[s] = (y - l) / 6048e5),
                  (c[i] = (y - l) / 864e5),
                  (c[r] = y / 36e5),
                  (c[n] = y / 6e4),
                  (c[e] = y / 1e3),
                  c)[d] || y),
                h ? M : g.a(M)
              )
            }),
            ($.daysInMonth = function () {
              return this.endOf(u).$D
            }),
            ($.$locale = function () {
              return M[this.$L]
            }),
            ($.locale = function (t, e) {
              if (!t) return this.$L
              var n = this.clone(),
                r = D(t, e, !0)
              return r && (n.$L = r), n
            }),
            ($.clone = function () {
              return g.w(this.$d, this)
            }),
            ($.toDate = function () {
              return new Date(this.valueOf())
            }),
            ($.toJSON = function () {
              return this.isValid() ? this.toISOString() : null
            }),
            ($.toISOString = function () {
              return this.$d.toISOString()
            }),
            ($.toString = function () {
              return this.$d.toUTCString()
            }),
            d
          )
        })(),
        p = S.prototype

      return (
        (v.prototype = p),
        [
          ['$ms', t],
          ['$s', e],
          ['$m', n],
          ['$H', r],
          ['$W', i],
          ['$M', u],
          ['$y', o],
          ['$D', f],
        ].forEach(function (t) {
          p[t[1]] = function (e) {
            return this.$g(e, t[0], t[1])
          }
        }),
        (v.extend = function (t, e) {
          return t.$i || (t(e, S, v), (t.$i = !0)), v
        }),
        (v.locale = D),
        (v.isDayjs = m),
        (v.unix = function (t) {
          return v(1e3 * t)
        }),
        (v.en = M[y]),
        (v.Ls = M),
        (v.p = {}),
        v
      )
    })
  }

  $XZPv$init()
  // ASSET: ../../../node_modules/dayjs/locale/ja.js
  var $tgU2$exports = {}
  var $tgU2$var$define
  !(function (_, e) {
    'object' == typeof $tgU2$exports && 'undefined' != 'object'
      ? ($tgU2$exports = e(($XZPv$init(), $XZPv$exports)))
      : 'function' == typeof $tgU2$var$define && $tgU2$var$define.amd
      ? $tgU2$var$define(['dayjs'], e)
      : (_.dayjs_locale_ja = e(_.dayjs))
  })($tgU2$exports, function (_) {
    _ = _ && _.hasOwnProperty('default') ? _.default : _
    var e = {
      name: 'ja',
      weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
      weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
      weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
      months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
      monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
      ordinal: function (_) {
        return _ + '日'
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
      meridiem: function (_) {
        return _ < 12 ? '午前' : '午後'
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
    return _.locale(e, null, !0), e
  })
  var $rsYp$export$FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ'

  // eslint-disable-next-line import/prefer-default-export
  var $RT03$export$t = function t(format) {
    return format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function (_, a, b) {
      return a || b.slice(1)
    })
  }

  var $RT03$export$englishFormats = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
  }

  var $RT03$export$u = function u(formatStr, formats) {
    return formatStr.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function (_, a, b) {
      var B = b && b.toUpperCase()
      return a || formats[b] || $RT03$export$englishFormats[b] || $RT03$export$t(formats[B])
    })
  }

  var $kx9C$export$default = function (o, c, d) {
    var proto = c.prototype
    var oldFormat = proto.format
    d.en.formats = $RT03$export$englishFormats

    proto.format = function (formatStr) {
      if (formatStr === void 0) {
        formatStr = $rsYp$export$FORMAT_DEFAULT
      }

      var _this$$locale = this.$locale(),
        _this$$locale$formats = _this$$locale.formats,
        formats = _this$$locale$formats === void 0 ? {} : _this$$locale$formats

      var result = $RT03$export$u(formatStr, formats)
      return oldFormat.call(this, result)
    }
  }

  var $XZPv$$interop$default = $parcel$interopDefault($XZPv$exports)
  $XZPv$$interop$default.d.locale('ja')
  $XZPv$$interop$default.d.extend($kx9C$export$default)
  const $LVu9$var$baseUrl = location.pathname.split('/').slice(0, 3).join('/')

  async function $LVu9$export$getPages() {
    return $.get(`${$LVu9$var$baseUrl}/pages-json`)
  }

  async function $LVu9$export$getTags() {
    return $.get(`${$LVu9$var$baseUrl}/tags`)
  }

  async function $LVu9$export$getScripts() {
    return $.get(`${$LVu9$var$baseUrl}/libraries-json`)
  }

  async function $LVu9$export$getTagAttributes(id) {
    return (await $.get(`${$LVu9$var$baseUrl}/tags/${id}/attributes`)).tag
  }

  async function $LVu9$export$getTagPageAssignments(id) {
    return $.get(`${$LVu9$var$baseUrl}/tags/${id}/page-assignments`)
  }

  async function $LVu9$export$getDataList() {
    return $.get(`${$LVu9$var$baseUrl}/data`)
  }

  async function $LVu9$export$getDataInputs(id) {
    const html = await $.get(`${$LVu9$var$baseUrl}/data/${id}/inputs`)
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return Array.from(doc.querySelectorAll('.view-data > tbody > tr')).map(tr => ({
      pageId: tr.cells[0].querySelector('a')?.href.match(/(?<=\/)\d+(?=\/)/)?.[0],
      pageName: tr.cells[0].textContent.trim(),
      dbe: tr.cells[2].textContent.trim(),
    }))
  }

  function $th8A$export$saveAsCsv(rows, name) {
    const blob = $th8A$var$createExcelCsvBlob(rows)
    const date = $XZPv$$interop$default.d().format('YYYYMMDD')
    const site = $('#currentSite').text().trim()
    $th8A$var$saveBlob(blob, `[${date}] [${site}] ${name}.csv`)
  }

  function $th8A$var$saveBlob(blob, fileName) {
    const url = URL.createObjectURL(blob)
    $('<a/>')
      .attr('download', fileName)
      .prop('href', url)
      .appendTo('body')
      .each((_, a) => a.click())
      .remove()
    URL.revokeObjectURL(url)
  }

  function $th8A$var$createExcelCsvBlob(rows) {
    const value = $th8A$var$csvStringify(rows)
    const bom = new Uint8Array([0xef, 0xbb, 0xbf])
    return new Blob([bom, value], {
      type: 'text/csv',
    })
  }

  function $th8A$var$csvStringify(rows) {
    return rows.map(cells => cells.map($th8A$var$quoteForCsv).join(',')).join('\r\n')
  }

  function $th8A$var$quoteForCsv(value) {
    return `"${$th8A$var$convertValue(value).replace(/"/g, '""')}"`
  }

  function $th8A$var$convertValue(value) {
    if (Array.isArray(value)) {
      return value.map($th8A$var$convertValue).join('\n')
    }

    if (value instanceof Object) {
      return JSON.stringify(value)
    }

    return String(value ?? '')
  }

  class $hR3q$export$Modal {
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

  class $hR3q$export$AlertModal extends $hR3q$export$Modal {
    constructor(options) {
      super({ ...options, closeOnClick: true })
      this.body.text(this.options.message).css({
        fontSize: '2vw',
      })
    }
  }

  class $hR3q$export$ProgressModal extends $hR3q$export$Modal {
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

  const $o294$var$columns = [
    ['id', 'ID'],
    ['name', '名前'],
    ['pageId', 'ページ ID'],
    ['pageName', 'ページ名'],
    ['dbe', 'データバインディングエクスプレッション'],
    ['createdAt', '作成日'],
    ['modifiedAt', '更新日'],
  ]

  async function $o294$var$exportData() {
    const items = await $LVu9$export$getDataList()
    const modal = $hR3q$export$ProgressModal.open({
      maxValue: items.length,
    })
    const itemsWithInputs = await Promise.all(
      items.map(async item => {
        const inputs = await $LVu9$export$getDataInputs(item.id)
        modal.increment()
        return {
          item,
          inputs,
        }
      }),
    )
    const rows = itemsWithInputs.flatMap(({ item, inputs }) => {
      item.createdAt = $XZPv$$interop$default.d(item.createdAt).format('llll')
      item.modifiedAt = $XZPv$$interop$default.d(item.modifiedAt).format('llll')
      return inputs.map(input => [...$o294$var$columns.map(([key]) => input[key] || item[key])])
    })
    const header = $o294$var$columns.map(c => c[1])
    rows.unshift(header)
    $th8A$export$saveAsCsv(rows, 'カスタムデータエレメント一覧')
  }

  function $o294$export$registerDataExporter() {
    GM_registerMenuCommand('カスタムデータエレメントをエクスポート', $o294$var$exportData)
  }

  async function $YOqM$export$waitAll(promises, progress) {
    return Promise.all(promises.map(p => p.then($YOqM$export$tap(progress))))
  }

  function $YOqM$export$unique(arr) {
    return arr.filter((value, i) => arr.indexOf(value) === i)
  }

  function $YOqM$export$tap(fn) {
    return arg => (fn(arg), arg)
  }

  function $YOqM$export$arrayToMapByItemId(arr) {
    const res = {}
    arr.forEach(item => {
      res[item.id] = item
    })
    return res
  }

  function $YOqM$export$convertPatterns(urlPatterns) {
    return {
      includes: urlPatterns?.includes?.map(item => item.pattern ?? '(不明なデータ)') ?? [],
      excludes: urlPatterns?.excludes?.map(item => item.pattern ?? '(不明なデータ)') ?? [],
    }
  }

  const $pMWy$var$columns = [
    ['id', 'ID'],
    ['name', '名前'],
    ['includes', '対象 URL パターン'],
    ['excludes', '対象外 URL パターン'],
    ['caseInsensitiveUrls', 'URL の大文字/小文字を区別'],
    ['archived', '削除済'],
    ['createdAt', '作成日'],
    ['modifiedAt', '更新日'],
  ]

  async function $pMWy$var$exportPage() {
    const resources = [$LVu9$export$getPages()]
    const modal = $hR3q$export$ProgressModal.open({
      maxValue: resources.length,
    })
    const [pages] = await $YOqM$export$waitAll(resources, () => modal.increment())
    const rows = pages.map(item => {
      const { includes, excludes } = $YOqM$export$convertPatterns(item.urlPatterns)
      item.includes = includes
      item.excludes = excludes
      item.createdAt = $XZPv$$interop$default.d(item.createdAt).format('llll')
      item.modifiedAt = $XZPv$$interop$default.d(item.modifiedAt).format('llll')
      return [...$pMWy$var$columns.map(column => item[column[0]])]
    })
    const header = $pMWy$var$columns.map(c => c[1])
    rows.unshift(header)
    $th8A$export$saveAsCsv(rows, 'ページ一覧')
  }

  function $pMWy$export$registerPageExporter() {
    GM_registerMenuCommand('ページをエクスポート', $pMWy$var$exportPage)
  }

  const $GzEd$var$itemProps = [
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
  const $GzEd$var$header = [
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

  async function $GzEd$var$exportScript() {
    const resources = [$LVu9$export$getPages(), $LVu9$export$getTags(), $LVu9$export$getScripts()]
    const modal = $hR3q$export$ProgressModal.open({
      maxValue: resources.length,
    })
    const [pages, tags, scripts] = await $YOqM$export$waitAll(resources, () => modal.increment())
    const pageById = $YOqM$export$arrayToMapByItemId(pages)
    const tagById = $YOqM$export$arrayToMapByItemId(tags)
    const rows = scripts.map(item => {
      const tagIds = item.tagsId?.filter(id => id in tagById) || []
      const pageIds = item.pagesId?.filter(id => id in pageById) || []
      item.tagIds = tagIds
      item.pageIds = pageIds
      item.tagNames = tagIds.map(id => tagById[id]?.name)
      item.pageNames = pageIds.map(id => pageById[id]?.name)
      return [...$GzEd$var$itemProps.map(k => item[k])]
    })
    rows.unshift($GzEd$var$header)
    $th8A$export$saveAsCsv(rows, 'スクリプト一覧')
  }

  function $GzEd$export$registerScriptExporter() {
    GM_registerMenuCommand('スクリプトをエクスポート', $GzEd$var$exportScript)
  }

  const $FbcY$var$columns = [
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

  async function $FbcY$var$exportTag() {
    const tagIds = Array.from($('.row-selected')).map(el => el.dataset.tagId)

    if (tagIds.findIndex(id => !id) !== -1) {
      throw new Error('不正な選択アイテムがあります')
    }

    if (!tagIds.length) {
      $hR3q$export$AlertModal.open({
        message: 'エクスポートするタグを選択してください',
      })
      return
    }

    const modal = $hR3q$export$ProgressModal.open({
      maxValue: tagIds.length * 2,
    })
    const rows = await Promise.all(
      tagIds.map(async id => {
        const [tag, pages] = await $YOqM$export$waitAll(
          [$LVu9$export$getTagAttributes(id), $LVu9$export$getTagPageAssignments(id)],
          () => modal.increment(),
        )
        tag.pageIds = pages.map(p => p.id)
        tag.pageNames = pages.map(p => p.name)
        const patterns = pages.map(p => $YOqM$export$convertPatterns(p.urlPatterns))
        tag.includes = $YOqM$export$unique(patterns.flatMap(item => item.includes).sort())
        tag.excludes = $YOqM$export$unique(patterns.flatMap(item => item.excludes).sort())
        const fields = tag.fields.reduce((o, p) => ((o[p.key] = p.value), o), {})

        if (tag.tagDefinitionId === 'custom_markup_parsing_tag') {
          tag.tag = fields.markup
        } else {
          tag.catalog = fields
        }

        tag.status =
          {
            ACTIVE: '有効',
            INACTIVE: '無効',
          }[tag.status] || tag.status
        tag.createdAt = $XZPv$$interop$default.d(tag.createdAt).format('llll')
        tag.modifiedAt = $XZPv$$interop$default.d(tag.modifiedAt).format('llll')
        return [...$FbcY$var$columns.map(column => tag[column[0]])]
      }),
    )
    const header = $FbcY$var$columns.map(c => c[1])
    rows.unshift(header)
    $th8A$export$saveAsCsv(rows, 'サービスタグ')
  }

  function $FbcY$export$registerTagExporter() {
    GM_registerMenuCommand('タグをエクスポート', $FbcY$var$exportTag)
  }

  {
  } // https://control.theyjtag.jp/sites/*/tags
  // https://control.theyjtag.jp/sites/*/pages/*/tag-assignments

  if (/^\/sites\/[^/]+\/(?:tags|pages\/[^/]+\/tag-assignments)$/.test(location.pathname)) {
    $FbcY$export$registerTagExporter()
  }

  $o294$export$registerDataExporter()
  $pMWy$export$registerPageExporter()
  $GzEd$export$registerScriptExporter()
})()
