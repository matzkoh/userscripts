// ==UserScript==
// @name         YTM Exporter
// @namespace    https://github.com/matzkoh
// @version      1.1.1
// @description  Export to excel for YTM console
// @author       matzkoh
// @include      https://control.theyjtag.jp/sites/*
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
  var $XZPv$exports,
    $XZPv$var$define,
    $XZPv$executed = false

  function $XZPv$init() {
    if ($XZPv$executed) return
    $XZPv$executed = true
    $XZPv$exports = {}
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
        o = 'quarter',
        a = 'year',
        h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
        f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
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
                y: a,
                w: s,
                d: i,
                h: r,
                m: e,
                s: n,
                ms: t,
                Q: o,
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
          return t instanceof v
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
          return (r.date = t), new v(r)
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

      var v = (function() {
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
            return this.$g(t, '$y', a)
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
          (d.startOf = function(t, o) {
            var h = this,
              f = !!D.u(o) || o,
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
              case a:
                return f ? d(1, 0) : d(31, 11)

              case u:
                return f ? d(1, m) : d(0, m + 1)

              case s:
                var g = this.$locale().weekStart || 0,
                  v = (l < g ? l + 7 : l) - g
                return d(f ? y - v : y + (6 - v), m)

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
          (d.$set = function(s, o) {
            var h,
              f = D.p(s),
              c = 'set' + (this.$u ? 'UTC' : ''),
              d = ((h = {}),
              (h[i] = c + 'Date'),
              (h.date = c + 'Date'),
              (h[u] = c + 'Month'),
              (h[a] = c + 'FullYear'),
              (h[r] = c + 'Hours'),
              (h[e] = c + 'Minutes'),
              (h[n] = c + 'Seconds'),
              (h[t] = c + 'Milliseconds'),
              h)[f],
              $ = f === i ? this.$D + (o - this.$W) : o

            if (f === u || f === a) {
              var l = this.clone().set('date', 1)
              l.$d[d]($), l.init(), (this.$d = l.set('date', Math.min(this.$D, l.daysInMonth())).toDate())
            } else d && this.$d[d]($)

            return this.init(), this
          }),
          (d.set = function(t, n) {
            return this.clone().$set(t, n)
          }),
          (d.get = function(t) {
            return this[D.p(t)]()
          }),
          (d.add = function(t, o) {
            var h,
              f = this
            t = Number(t)

            var c = D.p(o),
              d = function(n) {
                var e = g(f)
                return D.w(e.date(e.date() + Math.round(n * t)), f)
              }

            if (c === u) return this.set(u, this.$M + t)
            if (c === a) return this.set(a, this.$y + t)
            if (c === i) return d(1)
            if (c === s) return d(7)
            var $ = ((h = {}), (h[e] = 6e4), (h[r] = 36e5), (h[n] = 1e3), h)[c] || 1,
              l = this.valueOf() + t * $
            return D.w(l, this)
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
              s = this.$H,
              u = this.$m,
              o = this.$M,
              a = i.weekdays,
              h = i.months,
              c = function(t, r, i, s) {
                return (t && (t[r] || t(n, e))) || i[r].substr(0, s)
              },
              d = function(t) {
                return D.s(s % 12 || 12, t, '0')
              },
              $ =
                i.meridiem ||
                function(t, n, e) {
                  var r = t < 12 ? 'AM' : 'PM'
                  return e ? r.toLowerCase() : r
                },
              l = {
                YY: String(this.$y).slice(-2),
                YYYY: this.$y,
                M: o + 1,
                MM: D.s(o + 1, 2, '0'),
                MMM: c(i.monthsShort, o, h, 3),
                MMMM: h[o] || h(this, e),
                D: this.$D,
                DD: D.s(this.$D, 2, '0'),
                d: String(this.$W),
                dd: c(i.weekdaysMin, this.$W, a, 2),
                ddd: c(i.weekdaysShort, this.$W, a, 3),
                dddd: a[this.$W],
                H: String(s),
                HH: D.s(s, 2, '0'),
                h: d(1),
                hh: d(2),
                a: $(s, u, !0),
                A: $(s, u, !1),
                m: String(u),
                mm: D.s(u, 2, '0'),
                s: String(this.$s),
                ss: D.s(this.$s, 2, '0'),
                SSS: D.s(this.$ms, 3, '0'),
                Z: r,
              }

            return e.replace(f, function(t, n) {
              return n || l[t] || r.replace(':', '')
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
                (c[a] = y / 12),
                (c[u] = y),
                (c[o] = y / 3),
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
        (g.prototype = v.prototype),
        (g.extend = function(t, n) {
          return t(n, v, g), g
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
  }

  $XZPv$init()
  // ASSET: ../../../node_modules/dayjs/locale/ja.js
  var $tgU2$exports = {}
  var $tgU2$var$define
  !(function(e, _) {
    'object' == typeof $tgU2$exports && 'undefined' != 'object'
      ? ($tgU2$exports = _(($XZPv$init(), $XZPv$exports)))
      : 'function' == typeof $tgU2$var$define && $tgU2$var$define.amd
      ? $tgU2$var$define(['dayjs'], _)
      : (e.dayjs_locale_ja = _(e.dayjs))
  })($tgU2$exports, function(e) {
    e = e && e.hasOwnProperty('default') ? e.default : e
    var _ = {
      name: 'ja',
      weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
      weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
      weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
      months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
      ordinal: function(e) {
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
      meridiem: function(e) {
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
    return e.locale(_, null, !0), _
  })
  var $rsYp$export$FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ'
  var $rsYp$export$REGEX_PARSE = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/
  var $rsYp$export$REGEX_FORMAT = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g

  var $kx9$export$default = function(o, c, d) {
    var proto = c.prototype
    var oldFormat = proto.format
    var englishFormats = {
      LTS: 'h:mm:ss A',
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A',
    }
    d.en.formats = englishFormats

    var t = function t(format) {
      return format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(_, a, b) {
        return a || b.slice(1)
      })
    }

    proto.format = function(formatStr) {
      if (formatStr === void 0) {
        formatStr = $rsYp$export$FORMAT_DEFAULT
      }

      var _this$$locale = this.$locale(),
        _this$$locale$formats = _this$$locale.formats,
        formats = _this$$locale$formats === void 0 ? {} : _this$$locale$formats

      var result = formatStr.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(_, a, b) {
        var B = b && b.toUpperCase()
        return a || formats[b] || englishFormats[b] || t(formats[B])
      })
      return oldFormat.call(this, result)
    }
  }

  var $XZPv$$interop$default = $parcel$interopDefault($XZPv$exports)
  $XZPv$$interop$default.d.locale('ja')
  $XZPv$$interop$default.d.extend($kx9$export$default)

  /* global $:false */
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

  async function $YOq$export$getAll(urls, progress) {
    return Promise.all(
      urls.map(async url => {
        const res = await $.get(url)
        progress()
        return res
      }),
    )
  }

  async function $YOq$export$waitAll(promises, progress) {
    var _promises$map

    return (_promises$map = promises.map(p => p.then($YOq$export$tap(progress)))), Promise.all(_promises$map)
  }

  function $YOq$export$tap(fn) {
    return function(arg) {
      fn(arg)
      return arg
    }
  }

  function $YOq$export$arrayToMapByItemId(arr) {
    const res = {}
    arr.forEach(item => {
      res[item.id] = item
    })
    return res
  }

  function $th8$export$saveAsCsv(rows, name) {
    const blob = $th8$var$createExcelCsvBlob(rows)
    const date = $XZPv$$interop$default.d().format('YYYYMMDD')
    const site = $('#currentSite')
      .text()
      .trim()
    $th8$var$saveBlob(blob, `[${date}] [${site}] ${name}.csv`)
  }

  function $th8$var$saveBlob(blob, fileName) {
    const url = URL.createObjectURL(blob)
    $('<a/>')
      .attr('download', fileName)
      .prop('href', url)
      .appendTo('body')
      .each((_, a) => a.click())
      .remove()
    URL.revokeObjectURL(url)
  }

  function $th8$var$createExcelCsvBlob(rows) {
    const value = $th8$var$csvStringify(rows)
    const bom = new Uint8Array([0xef, 0xbb, 0xbf])
    return new Blob([bom, value], {
      type: 'text/csv',
    })
  }

  function $th8$var$csvStringify(rows) {
    return rows.map(cells => cells.map($th8$var$quoteForCsv).join(',')).join('\r\n')
  }

  function $th8$var$quoteForCsv(value) {
    var _value

    return `"${String((_value = value) !== null && _value !== void 0 ? _value : '').replace(/"/g, '""')}"`
  }

  const $Fbc$var$tagProps = [
    'id',
    'status',
    'name',
    'vendorName',
    'createdAt',
    'modifiedAt',
    'tag',
    'catalog',
    'conditionalFiring',
  ]
  const $Fbc$var$csvHeader = [
    'ID',
    'ステータス',
    'タグ名',
    'サービス提供元',
    '作成日',
    '更新日',
    'カスタムタグ',
    'カタログタグ',
    'タグ実行条件',
    '実行ページ',
  ]

  async function $Fbc$var$tagDetailToRow({ tag, urlPatterns }) {
    tag.status =
      {
        ACTIVE: '有効',
        INACTIVE: '無効',
      }[tag.status] || tag.status
    tag.createdAt = $XZPv$$interop$default.d(tag.createdAt).format('llll')
    tag.modifiedAt = $XZPv$$interop$default.d(tag.modifiedAt).format('llll')
    const fields = tag.fields.reduce((o, p) => ((o[p.key] = p.value), o), {})

    if (tag.defaultTagCategoryName === 'Functional') {
      tag.tag = fields.markup
    } else {
      tag.catalog = JSON.stringify(fields)
    }

    const pageUrl = urlPatterns.join('\n')
    return [...$Fbc$var$tagProps.map(k => tag[k]), pageUrl]
  }

  async function $Fbc$var$exportTag() {
    const urls = Array.from($('.row-selected .tag-detail-link')).map(a => [
      new URL('attributes', a.href),
      new URL('page-assignments', a.href),
    ])
    const totalCount = urls.length

    if (!totalCount) {
      $hR3q$export$AlertModal.open({
        message: 'エクスポートするタグを選択してください',
      })
      return
    }

    const modal = $hR3q$export$ProgressModal.open({
      maxValue: totalCount * 2,
    })
    const rows = await Promise.all(
      urls.map(async urls => {
        var _page$, _page$$urlPatterns, _page$$urlPatterns$in

        const [{ tag }, page] = await $YOq$export$getAll(urls, () => modal.increment())
        const urlPatterns =
          ((_page$ = page[0]) === null || _page$ === void 0
            ? void 0
            : (_page$$urlPatterns = _page$.urlPatterns) === null || _page$$urlPatterns === void 0
            ? void 0
            : (_page$$urlPatterns$in = _page$$urlPatterns.includes) === null || _page$$urlPatterns$in === void 0
            ? void 0
            : _page$$urlPatterns$in.map(item => item.pattern)) || []
        return $Fbc$var$tagDetailToRow({
          tag,
          urlPatterns,
        })
      }),
    )
    rows.unshift($Fbc$var$csvHeader)
    $th8$export$saveAsCsv(rows, 'サービスタグ')
  }

  function $Fbc$export$registerTagExporter() {
    GM_registerMenuCommand('タグをエクスポート', $Fbc$var$exportTag)
  }

  const $LVu9$var$baseUrl = location.pathname
    .split('/')
    .slice(0, 3)
    .join('/')

  async function $LVu9$export$getPages() {
    return $.get(`${$LVu9$var$baseUrl}/pages-json`)
  }

  async function $LVu9$export$getTags() {
    return $.get(`${$LVu9$var$baseUrl}/tags`)
  }

  async function $LVu9$export$getScripts() {
    return $.get(`${$LVu9$var$baseUrl}/libraries-json`)
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
    const [pages, tags, scripts] = await $YOq$export$waitAll(resources, () => modal.increment())
    const pageById = $YOq$export$arrayToMapByItemId(pages)
    const tagById = $YOq$export$arrayToMapByItemId(tags)
    const rows = scripts.map(item => {
      var _item$tagsId, _item$pagesId

      const tagIds =
        ((_item$tagsId = item.tagsId) === null || _item$tagsId === void 0
          ? void 0
          : _item$tagsId.filter(id => id in tagById)) || []
      const pageIds =
        ((_item$pagesId = item.pagesId) === null || _item$pagesId === void 0
          ? void 0
          : _item$pagesId.filter(id => id in pageById)) || []
      item.tagIds = tagIds.join('\n')
      item.pageIds = pageIds.join('\n')
      item.tagNames = tagIds
        .map(id => {
          var _tagById$id

          return (_tagById$id = tagById[id]) === null || _tagById$id === void 0 ? void 0 : _tagById$id.name
        })
        .join('\n')
      item.pageNames = pageIds
        .map(id => {
          var _pageById$id

          return (_pageById$id = pageById[id]) === null || _pageById$id === void 0 ? void 0 : _pageById$id.name
        })
        .join('\n')
      return [...$GzEd$var$itemProps.map(k => item[k])]
    })
    rows.unshift($GzEd$var$header)
    $th8$export$saveAsCsv(rows, 'スクリプト一覧')
  }

  function $GzEd$export$registerScriptExporter() {
    GM_registerMenuCommand('スクリプトをエクスポート', $GzEd$var$exportScript)
  }

  {
  }
  // https://control.theyjtag.jp/sites/*/tags
  // https://control.theyjtag.jp/sites/*/pages/*/tag-assignments

  if (/^\/sites\/[^/]+\/(?:tags|pages\/[^/]+\/tag-assignments)$/.test(location.pathname)) {
    $Fbc$export$registerTagExporter()
  }

  $GzEd$export$registerScriptExporter()
})()
