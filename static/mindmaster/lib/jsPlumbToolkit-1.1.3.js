(function() {
	"use strict";
	var a = this
	  , b = a.Farahey = {};
	"undefined" != typeof exports && (exports.Farahey = b);
	var c = function(a, b, c) {
		for (var d = 0, e = a.length, f = -1, g = 0; e > d; )
			if (f = parseInt((d + e) / 2),
			g = c(a[f], b),
			0 > g)
				d = f + 1;
			else {
				if (!(g > 0))
					return f;
				e = f
			}
		return d
	}
	  , d = a.Biltong
	  , e = function(a, b, d) {
		var e = c(a, b, d);
		a.splice(e, 0, b)
	}
	  , f = function(a, b) {
		var c = a
		  , e = {}
		  , f = function(a) {
			if (!e[a[1]]) {
				var c = b(a[2]);
				e[a[1]] = {
					l: a[0][0],
					t: a[0][1],
					w: c[0],
					h: c[1],
					center: [a[0][0] + c[0] / 2, a[0][1] + c[1] / 2]
				}
			}
			return e[a[1]]
		};
		this.setOrigin = function(a) {
			c = a,
			e = {}
		}
		,
		this.compare = function(a, b) {
			var e = d.lineLength(c, f(a).center)
			  , g = d.lineLength(c, f(b).center);
			return g > e ? -1 : e == g ? 0 : 1
		}
	}
	  , g = function(a, b, c, d) {
		return a[b] <= d && d <= a[b] + a[c]
	}
	  , h = [function(a, b) {
		return a.x + a.w - b.x
	}
	, function(a, b) {
		return a.x - (b.x + b.w)
	}
	]
	  , i = [function(a, b) {
		return a.y + a.h - b.y
	}
	, function(a, b) {
		return a.y - (b.y + b.h)
	}
	]
	  , j = [null , [h[0], i[1]], [h[0], i[0]], [h[1], i[0]], [h[1], i[1]]]
	  , k = function(a, b, c, d, e) {
		isNaN(c) && (c = 0);
		var f, h, i, k = b.y + b.h, l = c == 1 / 0 || c == -(1 / 0) ? b.x + b.w / 2 : (k - d) / c, m = Math.atan(c);
		return g(b, "x", "w", l) ? (f = j[e][1](a, b),
		h = f / Math.sin(m),
		i = h * Math.cos(m),
		{
			left: i,
			top: f
		}) : (i = j[e][0](a, b),
		h = i / Math.cos(m),
		f = h * Math.sin(m),
		{
			left: i,
			top: f
		})
	}
	  , l = b.calculateSpacingAdjustment = function(a, b) {
		var c = a.center || [a.x + a.w / 2, a.y + a.h / 2]
		  , e = b.center || [b.x + b.w / 2, b.y + b.h / 2]
		  , f = d.gradient(c, e)
		  , g = d.quadrant(c, e)
		  , h = f == 1 / 0 || f == -(1 / 0) || isNaN(f) ? 0 : c[1] - f * c[0];
		return k(a, b, f, h, g)
	}
	  , m = b.paddedRectangle = function(a, b, c) {
		return {
			x: a[0] - c[0],
			y: a[1] - c[1],
			w: b[0] + 2 * c[0],
			h: b[1] + 2 * c[1]
		}
	}
	  , n = function(a, b, c, e, f, g, h, i, j, k) {
		g = g || [0, 0],
		k = k || function() {}
		;
		var n, o, p = m(g, [1, 1], e), q = 100, r = 1, s = !0, t = {}, u = function(a, b, c, d) {
			t[a] = !0,
			b[0] += c,
			b[1] += d
		}, v = function() {
			for (var g = 0; g < a.length; g++) {
				var t = b[a[g][1]]
				  , w = a[g][1]
				  , x = (a[g][2],
				c[a[g][1]])
				  , y = m(t, x, e);
				h(a[g][1]) && d.intersects(p, y) && (n = l(p, y),
				o = f(a[g][1], t, n),
				u(w, t, o.left, o.top)),
				y = m(t, x, e);
				for (var z = 0; z < a.length; z++)
					if (g != z && h(a[z][1])) {
						var A = b[a[z][1]]
						  , B = c[a[z][1]]
						  , C = m(A, B, e);
						d.intersects(y, C) && (s = !0,
						n = l(y, C),
						o = f(a[z][1], A, n),
						u(a[z][1], A, o.left, o.top))
					}
			}
			i && k(),
			s && q > r && (s = !1,
			r++,
			i ? window.setTimeout(v, j) : v())
		};
		return v(),
		t
	}
	  , o = function(a) {
		if (null == a)
			return null ;
		if ("[object Array]" === Object.prototype.toString.call(a)) {
			var b = [];
			return b.push.apply(b, a),
			b
		}
		var c = [];
		for (var d in a)
			c.push(a[d]);
		return c
	}
	  , p = function(a) {
		var b, c, d, g, h, i = a.getPosition, j = a.getSize, k = a.getId, l = a.setPosition, m = a.padding || [20, 20], p = a.constrain || function(a, b, c) {
			return c
		}
		, q = [], r = {}, s = {}, t = o(a.elements || []), u = a.origin || [0, 0], v = a.executeNow, w = (this.getOrigin = function() {
			return u
		}
		,
		a.filter || function(a) {
			return !0
		}
		), x = a.orderByDistanceFromOrigin, y = new f(u,j), z = a.updateOnStep, A = a.stepInterval || 350, B = a.debug, C = function() {
			var a = document.createElement("div");
			a.style.position = "absolute",
			a.style.width = "10px",
			a.style.height = "10px",
			a.style.backgroundColor = "red",
			document.body.appendChild(a),
			h = a
		}, D = function(a) {
			x && 0 != q.length ? e(q, a, y.compare) : q.push(a)
		}, E = function() {
			y.setOrigin(u),
			q = [],
			r = {},
			s = {},
			b = c = 1 / 0,
			d = g = -(1 / 0);
			for (var a = 0; a < t.length; a++) {
				var e = i(t[a])
				  , f = j(t[a])
				  , h = k(t[a]);
				r[h] = [e.left, e.top],
				D([[e.left, e.top], h, t[a]]),
				s[h] = f,
				b = Math.min(b, e.left),
				c = Math.min(c, e.top),
				d = Math.max(d, e.left + f[0]),
				g = Math.max(g, e.top + f[1])
			}
		}, F = function() {
			if (t.length > 1) {
				var a = n(q, r, s, m, p, u, w, z, A, G);
				G(a)
			}
		}, G = function(a) {
			for (var b = 0; b < t.length; b++) {
				var c = k(t[b]);
				a[c] && l(t[b], {
					left: r[c][0],
					top: r[c][1]
				})
			}
		}, H = function(a) {
			null != a && (u = a,
			y.setOrigin(a))
		};
		return this.execute = function(a) {
			H(a),
			E(),
			F()
		}
		,
		this.executeAtCenter = function() {
			E(),
			H([(b + d) / 2, (c + g) / 2]),
			F()
		}
		,
		this.executeAtEvent = function(b) {
			var c = a.container
			  , d = a.getContainerPosition(c)
			  , e = b.pageX - d.left + c[0].scrollLeft
			  , f = b.pageY - d.top + c[0].scrollTop;
			B && (h.style.left = b.pageX + "px",
			h.style.top = b.pageY + "px"),
			this.execute([e, f])
		}
		,
		this.setElements = function(a) {
			return t = o(a),
			this
		}
		,
		this.addElement = function(a, b) {
			return null == a || !b && -1 !== t.indexOf(a) || t.push(a),
			this
		}
		,
		this.addElements = function(a, b) {
			if (b)
				Array.prototype.push.apply(t, a);
			else
				for (var c = 0; c < a.length; c++)
					this.addElement(a[c]);
			return this
		}
		,
		this.getElements = function() {
			return t
		}
		,
		this.removeElement = function(a) {
			for (var b = -1, c = 0; c < t.length; c++)
				if (t[c] == a) {
					b = c;
					break
				}
			return -1 != b && t.splice(b, 1),
			this
		}
		,
		this.setPadding = function(a) {
			m = a
		}
		,
		this.setConstrain = function(a) {
			p = a
		}
		,
		this.setFilter = function(a) {
			w = a
		}
		,
		this.reset = function() {
			t.length = 0
		}
		,
		B && C(),
		v && this.execute(),
		this
	};
	b.getInstance = function(a) {
		return new p(a)
	}
}
).call("undefined" != typeof window ? window : this),
function() {
	var a = this;
	"undefined" != typeof global && (a = global),
	Array.prototype.peek = function() {
		return this.length > 0 ? this[this.length - 1] : null
	}
	;
	var b = "undefined" != typeof navigator && /MSIE\s([\d.]+)/.test(navigator.userAgent) ? new Number(RegExp.$1) : -1
	  , c = b > -1 && 9 > b
	  , d = function(a, b, c) {
		var d = function(b, c) {
			for (var d = [], e = 0; e < b.length; e++) {
				var g = f({}, b[e]);
				d.push(g),
				f(g.atts, c.atts, function(b, c) {
					o(b, c, g, null , a)
				})
			}
			return d
		}
		.bind(this);
		this.template = c.template,
		this.getFunctionBody = function(b) {
			return a.compile(d(a.parse(c.template, null , {
				originalCustomTag: b.tag,
				context: b.context
			}), b), !1, !0, !0)
		}
		.bind(this),
		this.getFunctionEnd = function() {
			return ";_els.pop();"
		}
		,
		this.rendered = c.rendered || function() {}
		,
		this.updated = c.updated || function() {}
	}
	  , e = function(a, b) {
		for (var c = 0; c < a.length; c++) {
			var d = a[c];
			null != d && 0 != d.length && b(c, d)
		}
	}
	  , f = function(a, b, c) {
		for (var d in b)
			a[d] = b[d],
			c && c(d, a[d]);
		return a
	}
	  , g = function(a, b, c) {
		if (null == a)
			return null ;
		if ("$data" === b || null == b)
			return a;
		var d = b.match(/^\{(.*)\}$/);
		if (d) {
			for (var e = {}, f = d[1].split(","), h = 0; h < f.length; h++) {
				var i = f[h].split(":")
				  , j = g(a, i[1]);
				e[m(i[0])] = j || i[1].replace(/'/g, "")
			}
			return e
		}
		b = b.replace(/\['([^']*)'\]/g, ".$1");
		var k = a
		  , l = k
		  , n = null ;
		return b.replace(/([^\.])+/g, function(a, b, d, e) {
			if (null == n) {
				var f = a.match(/([^\[0-9]+){1}(\[)([0-9+])/)
				  , g = d + a.length >= e.length
				  , h = function() {
					return l[f[1]] || function() {
						return l[f[1]] = [],
						l[f[1]]
					}()
				};
				if (g)
					if (f) {
						var i = h()
						  , j = f[3];
						null == c ? n = i[j] : i[j] = c
					} else
						null == c ? n = l[a] : l[a] = c;
				else if (f) {
					var k = h();
					l = k[f[3]] || function() {
						return k[f[3]] = {},
						k[f[3]]
					}()
				} else
					l = l[a] || function() {
						return l[a] = {},
						l[a]
					}()
			}
		}),
		n
	}
	  , h = function(b) {
		var c = a.document.getElementById(b);
		return null != c ? c.innerHTML : null
	}
	  , i = function(a) {
		return "[object Array]" === Object.prototype.toString.call(a)
	}
	  , j = function(a) {
		for (var b = [], c = 0; c < a.length; c++)
			i(a[c]) ? b.push.apply(b, j(a[c])) : b[b.length] = a[c];
		return b
	}
	  , k = function(a, b) {
		for (var c = [], d = 0, e = a.length; e > d; d++)
			c.push(b(a[d]));
		return j(c)
	}
	  , l = function(a, b) {
		for (var c = [], d = 0, e = a.length; e > d; d++)
			b(a[d]) && c.push(a[d]);
		return c
	}
	  , m = function(a) {
		if (null == a)
			return a;
		for (var b = a.replace(/^\s\s*/, ""), c = /\s/, d = b.length; c.test(b.charAt(--d)); )
			;
		return b.slice(0, d + 1)
	}
	  , n = function(a, b, c, d, e) {
		var f = q()
		  , g = {
			w: b,
			e: [],
			u: f
		};
		e.bindings[f] = g;
		var h = function() {
			return null != d ? "try {  if(" + d + ") { out = out.replace(this.e[k][0], eval(this.e[k][1])); } else out=''; } catch(__) { out='';}" : "try { out = out.replace(this.e[k][0], eval(this.e[k][1])); } catch(__) { out=out.replace(this.e[k][0], '');}"
		}
		  , i = function() {
			return null != d ? "var out='';try { with($data) { if (" + d + ") out = this.w; else return null; }}catch(_){return null;}" : "var out = this.w;"
		};
		return g.reapply = new Function("$data",i() + "for (var k = 0; k < this.e.length; k++) { with($data) { " + h() + " }} return out;"),
		c.bindings[a] = g,
		b.replace(/\$\{([^\}]*)\}/g, function(a, b, c, d) {
			g.e.push([a, b])
		}),
		f
	}
	  , o = function(a, b, c, d, e) {
		c.atts[a] = b,
		n(a, b, c, d, e)
	}
	  , p = function(a, b) {
		function c(a, c) {
			var d = a.match(/([^=]+)=['"](.*)['"]/);
			return null == d && null == c ? e.atts[a] = "" : null == d ? o(a, "", e, c, b) : o(d[1], d[2], e, c, b),
			d
		}
		for (var d = b.parseAttributes(a), e = {
			el: m(d[0]),
			atts: {},
			bindings: {}
		}, f = 1; f < d.length; f++) {
			var g = m(d[f]);
			if (null != g && g.length > 0) {
				var h = g.match(b.inlineIfRe);
				if (h)
					for (var i = h[2].split(b.attributesRe), j = 0; j < i.length; j++) {
						var k = m(i[j]);
						null != k && k.length > 0 && c(k, h[1])
					}
				else
					c(g)
			}
		}
		return e
	}
	  , q = function(a) {
		var b = a ? "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx" : "xxxxxxxx-xxxx-4xxx";
		return b.replace(/[xy]/g, function(a) {
			var b = 16 * Math.random() | 0
			  , c = "x" == a ? b : 3 & b | 8;
			return c.toString(16)
		})
	}
	  , r = function(a) {
		if (null == a || 0 == a.length)
			return !1;
		for (var b = a.length - 1; b > -1; b--)
			if ("each" === a[b].type)
				return !0;
		return !1
	}
	  , s = function(a, b) {
		var c = this.bindings[b];
		return null == c ? "" : c.reapply(a)
	}
	  , t = function(a, b) {
		this.uuid = q(),
		this.children = [],
		this.instance = b,
		b.entries[this.uuid] = this
	}
	  , u = function(a, b) {
		t.apply(this, arguments);
		var c = p(a, b)
		  , d = c.el.split(":");
		this.tag = c.el,
		2 == d.length && (this.namespace = d[0]),
		this.atts = c.atts,
		this.bindings = c.bindings,
		this.type = "element",
		this.compile = function(a, b) {
			var c = a.customTags[this.tag] || a.globalTags[this.tag];
			if (c) {
				for (var d = c.getFunctionBody(this), e = a.customTags[this.tag] ? "_rotors.customTags['" + this.tag + "'].rendered(_le, _rotors);" : "_rotors.globalTags['" + this.tag + "'].rendered(_le, _rotors);", f = 0; f < this.children.length; f++)
					this.children[f].precompile && (d += this.children[f].precompile(a)),
					d += this.children[f].compile(a),
					this.children[f].postcompile && (d += this.children[f].postcompile(a));
				return d += "_le=_els.pop();" + e + "_rotors.pet(_eid,'" + this.uuid + "');"
			}
			var g = "/* element entry " + this.uuid + " */;";
			if (this.remove !== !0) {
				g += a.getExecutionContent(this.tag, this.uuid, !1, this.namespace);
				for (var h in this.atts)
					if (this.atts.hasOwnProperty(h)) {
						var i;
						i = null != this.bindings[h] ? "_rotors.bind(data[0], '" + this.bindings[h].u + "');" : "'" + this.atts[h] + "'",
						g += "__a=" + i + ";if(__a!=null) {_rotors.setAttribute(e,'" + h + "',__a || '');}"
					}
			}
			for (var j = 0; j < this.children.length; j++)
				this.children[j].precompile && (g += this.children[j].precompile(a)),
				g += this.children[j].compile(a),
				this.children[j].postcompile && (g += this.children[j].postcompile(a));
			return this.remove === !0 || b || (g += "_le=_els.pop();",
			g += "_rotors.pet(_eid, '" + this.uuid + "');"),
			g
		}
		;
		var e = function(a, c) {
			b.each(c.split(";"), function(b) {
				var c = b.indexOf(":")
				  , d = b.substring(0, c);
				a.style[d] = b.substring(c + 1)
			})
		};
		this.update = function(a, c) {
			for (var d in this.atts)
				if (this.atts.hasOwnProperty(d) && "class" !== d) {
					var f;
					f = null != this.bindings[d] ? this.bindings[d].reapply(c) : "'" + this.atts[d] + "'",
					null != f && ("style" === d && null != a.style ? e(a, f) : a.setAttribute(d, f))
				}
			if (this.originalCustomTag) {
				var g = b.customTags[this.originalCustomTag] || b.globalTags[this.originalCustomTag];
				g && g.updated(a, c)
			}
		}
	}
	  , v = function(a) {
		this.uuid = q(),
		this.comment = a,
		this.compile = function() {
			return ""
		}
	}
	  , w = function(a, b) {
		t.apply(this, arguments),
		this.value = a.value,
		this.type = "text",
		this.bindings = {};
		var c = function() {
			return "_rotors.bind(data[0], '" + this.bindings.__element.u + "', typeof $key !== 'undefined' ? $key : null, typeof $value !== 'undefined' ? $value : null)"
		}
		.bind(this);
		this.compile = function(a) {
			return a.getExecutionContent(c(), this.uuid, !0) + ";_rotors.pet(_eid, '" + this.uuid + "');"
		}
		,
		this.update = function(a, b) {
			a.nodeValue = this.bindings.__element.reapply(b)
		}
	}
	  , x = function() {
		this.childNodes = [],
		this.appendChild = function(a) {
			this.childNodes.push(a)
		}
		,
		this.toString = function() {
			for (var a = "", b = 0; b < this.childNodes.length; b++)
				a += this.childNodes[b].toString();
			return a
		}
	}
	  , y = function(a) {
		x.apply(this),
		this.tag = a;
		var b = {};
		this.setAttribute = function(a, c) {
			b[a] = c
		}
		,
		this.getAttribute = function(a) {
			return b[a]
		}
		,
		this.setAttributeNS = function(a, c, d) {
			b[a + ":" + c] = d
		}
		,
		this.toString = function() {
			var a = "<" + this.tag
			  , c = "";
			for (var d in b)
				c += " " + d + '="' + b[d] + '"';
			a = a + c + ">";
			for (var e = 0; e < this.childNodes.length; e++)
				a += this.childNodes[e].toString();
			return a + "</" + this.tag + ">"
		}
	}
	  , z = function(a) {
		this.nodeValue = a,
		this.toString = function() {
			return this.nodeValue
		}
	}
	  , A = function(a) {
		return a.isBrowser ? h : null
	}
	  , B = function(a, b, c) {
		return function(d) {
			var e = c ? null : a.cache[d];
			return null == e && (e = b(d)),
			null == e && (e = a.defaultTemplate),
			null != e && (a.cache[d] = e),
			e
		}
	}
	  , C = function(a) {
		a = a || {},
		this.cache = {},
		this.templateCache = {},
		this.customTags = {},
		null != a.defaultTemplate && this.setDefaultTemplate(a.defaultTemplate),
		this.templateResolver = a.templateResolver ? a.templateResolver : a.templates ? function(b) {
			return a.templates[b]
		}
		: A(this)
	}
	  , D = function(a, b) {
		for (var c in b)
			b.hasOwnProperty(c) && (a[c] = b[c])
	};
	D(C.prototype, {
		bindings: {},
		entries: {},
		executions: {},
		bind: s,
		defaultTemplate: "<div></div>",
		defaultCompiledTemplate: null ,
		setDefaultTemplate: function(a) {
			null != a ? (this.defaultTemplate = a,
			this.defaultCompiledTemplate = this.compile(this.parse(a))) : this.clearDefaultTemplate()
		},
		clearDefaultTemplate: function() {
			this.defaultTemplate = null ,
			this.defaultCompiledTemplate = null
		},
		clearCache: function() {
			this.cache = {},
			this.templateCache = {}
		},
		namespaceHandlers: {
			svg: function(a) {
				return "e = document.createElementNS('http://www.w3.org/2000/svg', '" + a.split(":")[1] + "');e.setAttribute('version', '1.1');e.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');"
			}
		},
		namespaces: {
			xlink: "http://www.w3.org/1999/xlink"
		},
		each: function(a, b, c, d) {
			var e;
			if (i(a))
				for (e = 0; e < a.length; e++)
					b(a[e], c, e, d);
			else
				for (e in a)
					a.hasOwnProperty(e) && b({
						$key: e,
						$value: a[e]
					}, c, e, d)
		},
		openRe: new RegExp("<([^/>]*?)>$|<([^/].*[^/])>$"),
		closeRe: new RegExp("^</([^>]+)>"),
		openCloseRe: new RegExp("<(.*)(/>$)"),
		tokenizerRe: /(<[^\^>]+\/>)|(<!--[\s\S]*?-->)|(<[\/a-zA-Z0-9\-:]+(?:\s*[a-zA-Z\-]+=\"[^\"]*\"|\s*[a-zA-Z\-]+='[^']+'|\s*[a-zA-Z\-]|\s*\{\{.*\}\})*>)/,
		commentRe: /<!--[\s\S]*?-->/,
		attributesRe: /([a-zA-Z0-9\-_:]+="[^"]*")|(\{\{if [^(?:\}\})]+\}\}.*\{\{\/if\}\})/,
		inlineIfRe: /\{\{if ([^\}]+)\}\}(.*)\{\{\/if\}\}/,
		singleExpressionRe: /^[\s]*\$\{([^\}]*)\}[\s]*$/,
		parseAttributes: function(a) {
			return null == a ? a : this.filterEmpty(a.replace("/>", ">").split(/^<|>$/)[1].split(this.attributesRe))
		},
		map: k,
		flatten: j,
		filter: l,
		data: g,
		uuid: q,
		filterEmpty: function(a) {
			return l(a, function(a) {
				return null != a && m(a).length > 0
			})
		},
		isBrowser: function() {
			return "undefined" != typeof navigator
		}(),
		isOldIE: function() {
			return c
		},
		cf: function() {
			return this.isBrowser ? this.isOldIE() ? a.document.createElement("div") : a.document.createDocumentFragment() : new x
		},
		ctn: function(b) {
			return this.isBrowser ? a.document.createTextNode(b) : new z(b)
		},
		ce: function(b) {
			return this.isBrowser ? a.document.createElement(b) : new y(b)
		},
		customElements: {
			"r-each": {
				parse: function(a, b, c, d) {
					a.context = a.atts["in"],
					a.type = "each"
				},
				compile: function(a) {
					var b = function() {
						var b = "function(item, _rotorsLoopId, _rotorsLoopIndex, _rotorsLoopContext) { ";
						b += "data.unshift(item);$value=item;$key=_rotorsLoopIndex;";
						for (var c = 0; c < this.children.length; c++)
							b += this.children[c].compile(a);
						return b += "data.splice(0,1);",
						b += "}"
					}
					.bind(this)
					  , c = ";_rotors.te(null, _eid, '" + this.uuid + "');"
					  , d = this.context ? ';data.unshift(_rotors.data(data[0], "' + this.context + '"));' : ""
					  , e = "_rotors.each(data[0], " + b() + ",'" + this.uuid + "', '" + this.context.replace(/'/g, "\\'") + "');"
					  , f = this.context ? ";data.splice(0, 1);" : ""
					  , g = ";_rotors.pet(_eid, '" + this.uuid + "');";
					return c + d + e + f + g
				}
			},
			"r-if": {
				parse: function(a, b, c, d) {
					a.test = a.atts.test
				},
				compile: function(a) {
					var b, c = "", d = "", e = this.happyFlowChildren || this.children;
					for (b = 0; b < e.length; b++)
						c += e[b].compile(a) + ";";
					if (null != this.happyFlowChildren) {
						for (d = "else {",
						b = 0; b < this.children.length; b++)
							d += this.children[b].compile(a) + ";";
						d += "}"
					}
					return ";with (data[0]) { if(" + this.test + ") { " + c + " }" + d + "}"
				}
			},
			"r-else": {
				remove: !0,
				parse: function(a, b, c, d, e) {
					var f = e.peek();
					null != f && "r-if" === f.tag && (f.happyFlowChildren = f.children,
					f.children = [])
				},
				compile: function(a) {}
			},
			"r-for": {
				parse: function(a, b, c, d, e) {
					a.loop = a.atts.loop
				},
				compile: function(a) {
					var b = "";
					b += "var __limit; with(data[0]){__limit=(" + this.loop + ");}",
					b += "for(var $index=0;$index<__limit;$index++){data[0].$index=$index;";
					for (var c = 0; c < this.children.length; c++)
						b += this.children[c].compile(a) + ";";
					return b += "}delete data[0].$index;"
				}
			},
			"r-tmpl": {
				remove: !0,
				parse: function(a, b, c, d, e, f) {
					if (a.type = "template",
					a.context = a.atts.context,
					a.atts.lookup)
						a.lookup = a.atts.lookup,
						a["default"] = a.atts["default"] || "",
						a.compile = function(b) {
							return ';with(data[0]){var tlid=eval("' + a.lookup.replace(/[\$\{\}]/g, "") + '");}if (_rotors.templateCache[tlid] == null){var ___t = _rotors.templateResolver(tlid) || _rotors.templateResolver("' + a["default"] + '");_rotors.templateCache[tlid]=_rotors.compile(_rotors.parse(___t));} eval(_rotors.templateCache[tlid].functionBody);'
						}
						;
					else {
						a.templateId = a.atts.id;
						var g = r(e);
						if (-1 !== f.indexOf(a.templateId)) {
							if (!g)
								throw new TypeError("recursive template call [" + a.templateId + "]");
							a.compile = function(b) {
								return ";eval(_rotors.templateCache['" + a.templateId + "'].functionBody);"
							}
						} else {
							var h = c(a.templateId);
							f.push(a.templateId);
							var i = d.parse(h, c, null , f);
							null == d.templateCache[a.templateId] && (d.templateCache[a.templateId] = d.compile(i));
							for (var j = 0; j < i.length; j++)
								i[j].context = a.context;
							d.debug("nested ast", i),
							a.children = i,
							f.pop()
						}
					}
				},
				precompile: function(a) {
					return this.context ? ';data.unshift(_rotors.data(data[0], "' + this.context + '"));' : ""
				},
				postcompile: function(a) {
					return this.context ? ";data.splice(0, 1);" : ""
				}
			},
			"r-html": {
				parse: function(a, b, c, d) {},
				compile: function(a) {
					return ";var __hp=_rotors.parse(data[0].value),__hc=_rotors.compile(__hp,true);var __f=__hc(data[0], _rotors);_els.peek().appendChild(__f.childNodes[0]);"
				}
			}
		},
		globalTags: {},
		registerTag: function(a, b, c) {
			this[c ? "globalTags" : "customTags"][a] = new d(this,a,b)
		},
		setAttribute: function(a, b, c) {
			var d = b.split(":");
			1 === d.length || null == this.namespaces[d[0]] ? a.setAttribute(d[0], c) : a.setAttributeNS(this.namespaces[d[0]], d[1], c)
		},
		debugEnabled: !1,
		debug: function() {
			this.debugEnabled && console.log.apply(console, arguments)
		},
		maybeDebug: function() {
			this.debugEnabled && arguments[0] && console.log.apply(console, arguments)
		},
		parse: function(a, b, c, d) {
			d = d || [],
			b = B(this, b || this.templateResolver, null );
			var f = []
			  , g = []
			  , h = this
			  , i = function(a, b) {
				var c = a.match(b);
				return null == c ? !1 : c
			}
			  , j = function() {
				return f.length > 0 ? f[f.length - 1] : null
			}
			  , k = function(a) {
				var b = j();
				return null != b && b.tag == a
			}
			  , l = function(a, b) {
				f.length > 0 && j().children.push(a),
				b ? 0 == f.length && g.push(a) : f.push(a)
			}
			  , o = function(a) {
				l(a, !0)
			}
			  , p = function() {
				var a = f.pop();
				return 0 == f.length && g.push(a),
				a
			}
			  , q = function(a, b, c, d, e) {
				var g = new u(a,d)
				  , h = d.customElements[g.tag];
				return h && (h.parse(g, b, c, d, f, e),
				h.compile && (g.compile = h.compile),
				g.precompile = h.precompile,
				g.postcompile = h.postcompile,
				g.custom = !0,
				g.remove = h.remove,
				d.debug("  element is a custom element"),
				d.maybeDebug(g.remove, "  element's root should not appear in output")),
				g
			}
			  , r = [{
				re: h.commentRe,
				handler: function(a, b, c, d) {
					d.debug("comment", a, b),
					l(new v(a), !0)
				}
			}, {
				re: h.openRe,
				handler: function(a, b, c, d, e) {
					d.debug("open element", a, b);
					var f = q(a, b, c, d, e);
					l(f, f.remove)
				}
			}, {
				re: h.closeRe,
				handler: function(a, b, c, d) {
					d.debug("close element", a, b);
					var e = d.customElements[b[1]];
					if (null == e || !e.remove) {
						if (!k(b[1]))
							throw new TypeError("Unbalanced closing tag '" + b[1] + "'; opening tag was '" + p().tag + "'");
						p()
					}
				}
			}, {
				re: h.openCloseRe,
				handler: function(a, b, c, d, e) {
					d.debug("open and close element", a, b);
					var f = q(a, b, c, d, e);
					l(f, !0)
				}
			}, {
				re: /.*/,
				handler: function(a, b, c, d) {
					d.debug("text node", a);
					var e = new w({
						value: a
					},d);
					o(e),
					n("__element", a, e, null , d)
				}
			}];
			if (e(m(a).split(this.tokenizerRe), function(a, c) {
				for (var e = m(c), f = 0; f < r.length; f++) {
					var g = i(e, r[f].re);
					if (g) {
						r[f].handler(c, g, b, this, d);
						break
					}
				}
			}
			.bind(this)),
			g.length > 0 && c)
				for (var s in c)
					g[0][s] = c[s];
			return g
		},
		compile: function(a, b, c, d) {
			for (var e = "data=[data||{}];var frag=_rotors.cf(),_els=[],e,_le,__a,$value,$key,_eid = _rotors.nec();_els.push(frag);", f = "return frag;", g = [], h = 0; h < a.length; h++) {
				var i = "";
				a[h].precompile && (i += a[h].precompile(this)),
				i += a[h].compile(this, d),
				a[h].postcompile && (i += a[h].postcompile(this)),
				g.push(i)
			}
			var j = g.join("");
			if (this.debug("function body :", j),
			c)
				return j;
			var k = new Function("data,_rotors",e + j + f)
			  , l = this;
			if (b)
				return k;
			var m = function(a) {
				return k.apply(this, [a, l])
			};
			return m.functionBody = j,
			m
		},
		nec: function() {
			var a = this.uuid();
			return this.executions[a] = {
				current: [{
					children: []
				}]
			},
			a
		},
		te: function(a, b, c, d) {
			var e = {
				el: a,
				children: [],
				id: c,
				index: d
			};
			this.executions[b].current[0].children.push(e);
			var f = c + (null != d ? "-" + d : "");
			this.executions[b][f] = e,
			this.executions[b].current.unshift(e)
		},
		pet: function(a, b) {
			this.executions[a].current = this.executions[a].current.splice(1)
		},
		getExecutionContent: function(a, b, c, d, e) {
			var f = null != d ? this.namespaceHandlers[d](a) : c ? "e=_rotors.ctn(" + a + ");" : "e=_rotors.ce('" + a + "');";
			return f + "_els.peek().appendChild(e);" + (c ? "" : "_els.push(e);") + "e._rotors=_rotors.entries['" + b + "'];e._rotorsEid=_eid;if(typeof _rotorsLoopId !== 'undefined') {e._rotorsLoopId=_rotorsLoopId;e._rotorsLoopIndex=_rotorsLoopIndex;e._rotorsLoopContext=_rotorsLoopContext;}_rotors.te(e, _eid, '" + b + "', typeof _rotorsLoopIndex != 'undefined' ? _rotorsLoopIndex : null);"
		},
		updaters: {},
		onUpdate: function(a, b) {
			if (null != a._rotors) {
				var c = a._rotors.instance;
				a._RotorsUpdate = a._RotorsUpdate || q(),
				c.updaters[a._RotorsUpdate] = c.updaters[a._RotorsUpdate] || [],
				c.updaters[a._RotorsUpdate].push(b)
			}
		},
		update: function(a, b) {
			var c, d, e, f = [], g = a._rotorsEid;
			if (null != g && null != a._rotors) {
				e = a._rotors.instance,
				c = e.executions[g];
				var h = a._rotorsLoopIndex
				  , i = a._rotors.uuid + (null != h ? "-" + h : "");
				d = c[i];
				var j = function(a, b, c) {
					null != a && (a._rotors.update(a, b),
					a._RotorsUpdate && e.updaters[a._RotorsUpdate] && f.push([a, e.updaters[a._RotorsUpdate], b]));
					for (var d = 0; d < c.children.length; d++) {
						var g = e.entries[c.children[d].id]
						  , h = "each" === e.entries[c.id].type
						  , i = h && null != c.children[d].el && null != c.children[d].el._rotorsLoopIndex ? b[c.children[d].el._rotorsLoopIndex] : e.data(b, g.context);
						j(c.children[d].el, i, c.children[d])
					}
				};
				j(a, b, d);
				for (var k = 0; k < f.length; k++)
					for (var l = f[k], m = 0; m < l[1].length; m++)
						try {
							l[1][m](l[0], l[2])
						} catch (n) {}
			}
		},
		updateExternal: function(a, b) {
			b = b || {};
			var c, d, e, f = function(a) {
				if (a.nodeType === Node.ELEMENT_NODE) {
					for (var h = 0, i = a.attributes.length; i > h; h++)
						c = a.attributes[h],
						"rotors" === c.name ? (d = c.value,
						a.innerHTML = g(b, d)) : 0 === c.name.indexOf("rotors-") && (d = c.value,
						e = c.name.substring(7),
						a.setAttribute(e, g(b, d)));
					for (h = 0; h < a.childNodes.length; h++)
						f(a.childNodes[h])
				}
			};
			f(a)
		},
		remove: function(a) {
			a._RotorsUpdate && this.updaters[a._RotorsUpdate] && delete this.updaters[a._RotorsUpdate],
			a._rotorsEid && this.executions[a._rotorsEid] && delete this.executions[a._rotorsEid]
		},
		template: function(a, b, c, d) {
			var e, f = d ? null : this.templateCache[a];
			if (null != f)
				return e = f(b),
				this.isOldIE() ? e.childNodes[0] : e;
			c = B(this, c || this.templateResolver, d);
			var g = c(a);
			if (null != g) {
				var h = this.parse(g, c, null , [a])
				  , i = this.compile(h);
				return this.templateCache[a] = i,
				e = i(b),
				this.isOldIE() ? e.childNodes[0] : e
			}
			return this.cf()
		},
		precompileTemplate: function(a, b) {
			var c = this.parse(a, b || this.templateResolver);
			return this.compile(c, !0)
		},
		precompileTemplates: function(a, b) {
			var c = function(c) {
				var d = a[c];
				return d || (b || this.templateResolver)(c)
			}
			  , d = {};
			for (var e in a)
				d[e] = this.precompileTemplate(a[e], c);
			return d
		},
		importTemplate: function(a, b) {
			var c = this;
			b = "string" == typeof b ? Function("data", "_rotors", b) : b,
			this.templateCache[a] = function(a) {
				return b.apply(c, [a, c])
			}
		},
		importTemplates: function(a) {
			for (var b in a)
				this.importTemplate(b, a[b])
		},
		importBindings: function(a) {
			this.bindings = this.bindings || {};
			for (var b in a) {
				var c = a[b];
				this.bindings[b] = {
					e: c.e,
					u: c.u,
					w: c.w,
					reapply: Function("$data", c.reapply)
				}
			}
		}
	});
	var E = function(a) {
		return new C(a)
	}
	  , F = function(a) {
		var b = {};
		for (var c in a.bindings) {
			var d = a.bindings[c];
			b[c] = {
				e: d.e,
				u: d.u,
				w: d.w,
				reapply: String(d.reapply).replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, "")
			}
		}
		return b
	}
	  , G = function(b, c) {
		c = c || "rotors";
		var d, e = a.Rotors.newInstance(), f = {}, g = new RegExp("<script type=['\"]" + c + "['\"] id=['\"]([^'\"]+)['\"]>((.*\n)*?)</script>","g");
		d = b.replace(g, function(a, b, c) {
			return f[b] = c,
			""
		});
		var h = [{}, null , d];
		for (var i in f)
			h[0][i] = String(e.precompileTemplate(f[i], function(a) {
				return f[a]
			})).replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, "");
		return h[1] = F(e),
		h
	}
	  , H = a.Rotors = {
		newInstance: E,
		precompile: G,
		data: g
	};
	"undefined" != typeof exports && (exports.Rotors = H,
	exports.RotorsInstance = C)
}
.call("undefined" != typeof window ? window : this),
function() {
	var a = this;
	a.jsPlumbToolkitUtil = a.jsPlumbToolkitUtil || {};
	var b = a.jsPlumbToolkitUtil
	  , c = function(a, b) {
		return function() {
			return a.apply(b, arguments)
		}
	};
	b.requestAnimationFrame = c(a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(b, c) {
		a.setTimeout(b, 10)
	}
	, a);
	b.ajax = function(a) {
		var b = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")
		  , c = a.type || "GET";
		if (b) {
			var d = "json" === a.dataType ? function(a) {
				return JSON.parse(a)
			}
			: function(a) {
				return a
			}
			;
			b.open(c, a.url, !0);
			var e = a.headers || {};
			for (var f in e)
				b.setRequestHeader(f, e[f]);
			b.onreadystatechange = function() {
				4 == b.readyState && ("2" === ("" + b.status)[0] ? a.success(d(b.responseText)) : a.error && a.error(b.responseText, b.status))
			}
			,
			b.send(a.data ? JSON.stringify(a.data) : null )
		} else
			a.error && a.error("ajax not supported")
	}
	,
	b.debounce = function(a, b) {
		b = b || 150;
		var c = null ;
		return function() {
			window.clearTimeout(c),
			c = window.setTimeout(a, b)
		}
	}
	,
	b.xml = {
		setNodeText: function(a, b) {
			a.text = b;
			try {
				a.textContent = b
			} catch (c) {}
		},
		getNodeText: function(a) {
			return null != a ? a.text || a.textContent : ""
		},
		getChild: function(a, b) {
			for (var c = null , d = 0; d < a.childNodes.length; d++)
				if (1 == a.childNodes[d].nodeType && a.childNodes[d].nodeName == b) {
					c = a.childNodes[d];
					break
				}
			return c
		},
		getChildren: function(a, b) {
			for (var c = [], d = 0; d < a.childNodes.length; d++)
				1 == a.childNodes[d].nodeType && a.childNodes[d].nodeName == b && c.push(a.childNodes[d]);
			return c
		},
		xmlToString: function(a) {
			try {
				return (new XMLSerializer).serializeToString(a).replace(/\s*xmlns=\"http\:\/\/www.w3.org\/1999\/xhtml\"/g, "")
			} catch (b) {
				try {
					return a.xml
				} catch (c) {
					throw new Error("Cannot serialize XML " + c)
				}
			}
			return !1
		},
		createElement: function(a, b, c) {
			var d;
			try {
				d = new ActiveXObject("Microsoft.XMLDOM").createNode(1, a, "")
			} catch (e) {
				d = document.createElement(a)
			}
			if (c && jsPlumbToolkitUtil.xml.setNodeText(d, c),
			b)
				for (var f in b)
					d.setAttribute(f, b[f]);
			return d
		}
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this;
	a.jsPlumbToolkitUtil = a.jsPlumbToolkitUtil || {};
	var b = a.jsPlumbToolkitUtil
	  , c = a.jsPlumbUtil;
	b.fastTrim = function(a) {
		for (var b = a.replace(/^\s\s*/, ""), c = /\s/, d = b.length; c.test(b.charAt(--d)); )
			;
		return b.slice(0, d + 1)
	}
	,
	b.uuid = function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
			var b = 16 * Math.random() | 0
			  , c = "x" == a ? b : 3 & b | 8;
			return c.toString(16)
		})
	}
	,
	b.each = function(a, b) {
		a = null == a.length || "string" == typeof a ? [a] : a;
		for (var c = 0; c < a.length; c++)
			b(a[c])
	}
	,
	b.populate = function(a, b) {
		var d = function(a) {
			var c = a.match(/(\${.*?})/g);
			if (null != c)
				for (var d = 0; d < c.length; d++) {
					var e = b[c[d].substring(2, c[d].length - 1)];
					e && (a = a.replace(c[d], e))
				}
			return a
		}
		  , e = function(a) {
			if (null != a) {
				if (c.isString(a))
					return d(a);
				if (c.isArray(a)) {
					for (var b = [], f = 0; f < a.length; f++)
						b.push(e(a[f]));
					return b
				}
				if (c.isObject(a)) {
					var b = {};
					for (var f in a)
						b[f] = e(a[f]);
					return b
				}
				return a
			}
		};
		return e(a)
	}
	,
	b.mergeWithParents = function(a, b, d) {
		d = d || "parent";
		var e = function(a) {
			return a ? b[a] : null
		}
		  , f = function(a) {
			return a ? e(a[d]) : null
		}
		  , g = function(a, b) {
			if (null == a)
				return b;
			var d = c.merge(a, b);
			return g(f(a), d)
		}
		  , h = function(a) {
			if (null == a)
				return {};
			if ("string" == typeof a)
				return e(a);
			if (a.length) {
				for (var b, c = !1, d = 0; !c && d < a.length; )
					b = h(a[d]),
					b ? c = !0 : d++;
				return b
			}
		}
		  , i = h(a);
		return i ? g(f(i), i) : {}
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	var a = this
	  , b = a.jsPlumb
	  , c = a.jsPlumbUtil
	  , d = {
		nodeTraverseStart: "startNodeTraversal",
		nodeTraverseEnd: "endNodeTraversal",
		start: "startOverlayAnimation",
		end: "endOverlayAnimation"
	}
	  , e = {
		nodeTraversing: "jtk-animate-node-traversing",
		edgeTraversing: "jtk-animate-edge-traversing",
		nodeTraversable: "jtk-animate-node-traversable",
		edgeTraversable: "jtk-animate-edge-traversable"
	};
	b.Connection.prototype.animateOverlay = function(a, f) {
		var g = this
		  , h = new c.EventGenerator
		  , i = g.getConnector().getLength();
		f = f || {};
		var j, k, l, m = c.uuid(), n = f.forwards !== !1, o = f.rate || 30, p = f.dwell || 250, q = f.speed || 100, r = i / q * 1e3, s = r / o, t = 1 / s * (n ? 1 : -1), u = f.isFinal !== !1, v = n ? 0 : 1, w = function() {
			return n ? z >= 1 : 0 >= z
		}, x = n ? g.source : g.target, y = n ? g.target : g.source, z = v, A = function() {
			z += t,
			w() ? E() : (k.loc = z,
			g.repaint())
		};
		if ("string" == typeof a)
			l = [a, {
				location: v,
				id: m
			}];
		else {
			var B = b.extend({}, a[1]);
			B.location = v,
			B.id = m,
			l = [a[0], B]
		}
		var C = function() {
			h.fire(d.start, g),
			k = g.addOverlay(l),
			j = window.setInterval(A, o)
		}
		  , D = function() {
			h.fire(d.nodeTraverseStart, {
				connection: g,
				element: x
			}),
			b.addClass(x, e.nodeTraversing),
			g.addClass(e.edgeTraversing),
			window.setTimeout(function() {
				b.removeClass(x, e.nodeTraversing),
				h.fire(d.nodeTraverseEnd, {
					connection: g,
					element: x
				}),
				C()
			}, p)
		}
		  , E = function() {
			g.removeOverlay(m),
			window.clearInterval(j),
			u ? (b.addClass(y, e.nodeTraversing),
			window.setTimeout(function() {
				b.removeClass(y, e.nodeTraversing),
				g.removeClass(e.edgeTraversing),
				h.fire(d.end, g)
			}, p)) : (g.removeClass(e.edgeTraversing),
			h.fire(d.end, g))
		};
		return f.previous ? f.previous.bind(d.end, D) : D(),
		h
	}
}
.call("undefined" == typeof window ? this : window),
function() {
	"use strict";
	var a = this
	  , b = ["node", "port", "edge", "group"]
	  , c = ["Refreshed", "Added", "Removed", "Updated", "Moved"]
	  , d = ["edge"]
	  , e = ["Source", "Target"]
	  , f = function(a, b, c, d) {
		for (var e = 0; e < a.length; e++)
			for (var f = 0; f < b.length; f++)
				c.bind(a[e] + b[f], d)
	};
	a.jsPlumbToolkitUtil.AutoSaver = function(a, g, h, i, j) {
		var k = !1
		  , l = function() {
			k || a.save({
				url: g,
				success: i,
				error: j,
				headers: h
			})
		};
		a.bind("dataLoadStart", function() {
			k = !0
		}),
		a.bind("dataLoadEnd", function() {
			k = !1
		}),
		f(b, c, a, l),
		f(d, e, a, l)
	}
	,
	a.jsPlumbToolkitUtil.CatchAllEventHandler = function(a) {
		var g = function() {
			a.fire("dataUpdated")
		};
		f(b, c, a, g),
		f(d, e, a, g)
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	var a = this
	  , b = a.jsPlumbToolkitUtil
	  , c = a.jsPlumbUtil;
	b.Selection = function(a) {
		c.EventGenerator.apply(this, arguments);
		var d, e = a.toolkit, f = [], g = [], h = [], i = Math.Infinity, j = Math.Infinity, k = Math.Infinity, l = a.generator, m = {}, n = this, o = a.onClear || function() {}
		, p = function(a) {
			return "Edge" === a.objectType ? h : "Node" === a.objectType ? f : g
		}, q = function(a) {
			var c = []
			  , e = p(a)
			  , f = "Edge" === a.objectType ? j : "Node" === a.objectType ? i : k;
			if (e.length >= f) {
				if (d === b.Selection.DISCARD_NEW)
					return !1;
				c = e.splice(0, 1),
				r(c[0], "Removed"),
				delete m[c[0].getFullId()]
			}
			return e.push(a),
			r(a, "Added"),
			c
		}, r = function(a, b) {
			var c = a.objectType.toLowerCase() + b
			  , d = {
				Group: {
					data: a.data,
					group: a
				},
				Node: {
					data: a.data,
					node: a
				},
				Port: {
					data: a.data,
					node: a.node,
					port: a
				},
				Edge: {
					data: a.data,
					edge: a
				}
			};
			n.fire(c, d[a.objectType])
		};
		this.getModel = e.getModel,
		this.setSuspendGraph = e.setSuspendGraph,
		this.getNodeId = e.getNodeId,
		this.getGroupId = e.getNodeId,
		this.getEdgeId = e.getEdgeId,
		this.getPortId = e.getPortId,
		this.getNodeType = e.getNodeType,
		this.getGroupType = e.getNodeType,
		this.getEdgeType = e.getEdgeType,
		this.getPortType = e.getPortType,
		this.getObjectInfo = e.getObjectInfo,
		this.isDebugEnabled = e.isDebugEnabled;
		var s = function(a, b) {
			if (!m[a.getFullId()]) {
				var c = q(a);
				return c === !1 ? [[], []] : (m[a.getFullId()] = a,
				b && b(a, !0),
				[[a], c])
			}
			return [[], []]
		}
		  , t = function(a, b) {
			var d = c.removeWithFunction(p(a), function(b) {
				return b.id == a.id
			});
			return d && r(a, "Removed"),
			delete m[a.getFullId()],
			b && b(a, !1),
			[[], []]
		}
		  , u = function(a, b) {
			return m[a.getFullId()] ? t(a, b) : s(a, b)
		}
		  , v = function(a, b, d) {
			var f, g = [], h = [];
			if (null == a)
				return g;
			var i = function(a) {
				var j;
				if (c.isString(a))
					j = e.getNode(a) || e.getEdge(a) || e.getGroup(a),
					null != j && (f = b(j, d),
					g.push.apply(g, f[0]),
					h.push.apply(h, f[1]));
				else if (a.eachNode && a.eachEdge)
					a.eachNode(function(a, b) {
						i(b)
					}),
					a.eachEdge(function(a, b) {
						i(b)
					}),
					a.eachGroup && a.eachGroup(function(a, b) {
						i(b)
					});
				else if (a.each)
					a.each(function(a, b) {
						i(b.vertex || b)
					});
				else if (null != a.length)
					for (var k = 0; k < a.length; k++)
						i(a[k], d);
				else
					f = b(a, d),
					g.push.apply(g, f[0]),
					h.push.apply(h, f[1])
			};
			return i(a),
			[g, h]
		}
		.bind(this);
		e.bind("nodeRemoved", function(a) {
			t(a.node)
		}),
		e.bind("groupRemoved", function(a) {
			t(a.group)
		}),
		e.bind("portRemoved", function(a) {
			t(a.port)
		}),
		e.bind("edgeRemoved", function(a) {
			t(a.edge)
		}),
		e.bind("edgeTarget", function(a) {
			m[a.edge.getFullId()] && n.fire("edgeTarget", a)
		}),
		e.bind("edgeSource", function(a) {
			m[a.edge.getFullId()] && n.fire("edgeSource", a)
		}),
		e.bind("nodeUpdated", function(a) {
			m[a.node.getFullId()] && n.fire("nodeUpdated", a)
		}),
		e.bind("groupUpdated", function(a) {
			m[a.group.getFullId()] && n.fire("groupUpdated", a)
		}),
		e.bind("edgeUpdated", function(a) {
			m[a.edge.getFullId()] && n.fire("edgeUpdated", a)
		}),
		e.bind("portUpdated", function(a) {
			m[a.port.getFullId()] && n.fire("portUpdated", a)
		}),
		this.remove = function(a, b) {
			return v(a, t, b)
		}
		,
		this.append = function(a, b) {
			return v(a, s, b)
		}
		,
		this.toggle = function(a, b) {
			return v(a, u, b)
		}
		,
		this.setMaxNodes = function(a) {
			i = a
		}
		,
		this.setMaxEdges = function(a) {
			j = a
		}
		,
		this.setCapacityPolicy = function(a) {
			d = a
		}
		,
		this.clear = function(a) {
			f.length = 0,
			h.length = 0,
			g.length = 0,
			m = {},
			a || o(this)
		}
		,
		this.reload = function() {
			if (null != l) {
				this.clear();
				var a;
				for (this.fire("dataLoadStart"),
				l(this, e),
				a = 0; a < g.length; a++)
					n.fire("groupAdded", g[a]);
				for (a = 0; a < f.length; a++)
					n.fire("nodeAdded", f[a]);
				for (a = 0; a < h.length; a++)
					n.fire("edgeAdded", h[a]);
				this.fire("dataLoadEnd")
			}
		}
		,
		this.each = function(a, b) {
			for (var d = "Edge" === b ? h : "Group" === b ? g : f, e = 0; e < d.length; e++)
				try {
					a(e, d[e])
				} catch (i) {
					c.log("Selection iterator function failed", i)
				}
		}
		,
		this.eachNode = this.each,
		this.eachGroup = function(a) {
			this.each(a, "Group")
		}
		,
		this.eachNodeOrGroup = function(a) {
			this.each(a, "Node"),
			this.each(a, "Group")
		}
		,
		this.eachEdge = function(a) {
			this.each(a, "Edge")
		}
		,
		this.getNodeCount = function() {
			return f.length
		}
		,
		this.getNodeAt = function(a) {
			return f[a]
		}
		,
		this.getNodes = function() {
			return f
		}
		,
		this.getNode = e.getNode,
		this.getGroupAt = function(a) {
			return g[a]
		}
		,
		this.getGroups = function() {
			return g
		}
		,
		this.getGroup = e.getGroup,
		this.getGroupCount = function() {
			return g.length
		}
		,
		this.getAll = function() {
			var a = [];
			return Array.prototype.push.apply(a, f),
			Array.prototype.push.apply(a, h),
			Array.prototype.push.apply(a, g),
			a
		}
		,
		this.getAllEdgesFor = function(a) {
			for (var b = a.getAllEdges(), c = [], d = 0; d < b.length; d++)
				null != m[b[d].getId()] && c.push(b[d]);
			return c
		}
		,
		this.getEdgeCount = function() {
			return h.length
		}
		,
		this.get = this.getNodeAt = function(a) {
			return f[a]
		}
		,
		this.getEdge = this.getEdgeAt = function(a) {
			return h[a]
		}
		,
		this.setCapacityPolicy(b.Selection.DISCARD_EXISTING)
	}
	,
	b.Selection.DISCARD_EXISTING = "discardExisting",
	b.Selection.DISCARD_NEW = "discardNew"
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbGraph = {};
	b.version = "0.1",
	b.name = "jsPlumbGraph";
	var c = function(a, b) {
		var c = {};
		this.setAttribute = function(a, b) {
			c[a] = b
		}
		,
		this.getAttribute = function(a) {
			return c[a]
		}
		;
		var d = b.getType(a || {});
		this.getType = function() {
			return d
		}
		,
		this.setType = function(a) {
			d = a
		}
		,
		this.graph = b
	}
	  , d = function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
			var b = 16 * Math.random() | 0
			  , c = "x" == a ? b : 3 & b | 8;
			return c.toString(16)
		})
	}
	  , e = function(a, b, c) {
		if (null == a)
			return d();
		if ("string" == typeof a)
			return a;
		var e = b || c.getIdFunction();
		return e(a) || d()
	}
	  , f = function(a) {
		return "string" == typeof a ? {
			id: a
		} : a
	}
	  , g = b.Vertex = b.Node = function(a, d, g) {
		c.apply(this, [a, g]),
		this.objectType = "Node",
		this.id = e(a, d, g),
		this.data = f(a),
		this.getFullId = function() {
			return this.id
		}
		;
		var i = []
		  , j = 0
		  , k = 0
		  , l = []
		  , m = []
		  , n = {};
		this.getEdges = function(a) {
			if (null == a || null == a.filter)
				return i;
			for (var b = [], c = 0; c < i.length; c++)
				a.filter(i[c]) && b.push(i[c]);
			return b
		}
		,
		this.getSourceEdges = function() {
			return this.getEdges({
				filter: function(a) {
					return a.source == this
				}
				.bind(this)
			})
		}
		,
		this.getTargetEdges = function() {
			return this.getEdges({
				filter: function(a) {
					return a.target == this
				}
				.bind(this)
			})
		}
		,
		this.addEdge = function(a) {
			i.push(a),
			a.source !== this && a.isDirected() || k++,
			a.target !== this && a.isDirected() || j++
		}
		,
		this.deleteEdge = function(a) {
			for (var b = -1, c = 0; c < i.length; c++)
				if (i[c].getId() === a.getId()) {
					b = c;
					break
				}
			return b > -1 ? (i.splice(b, 1),
			a.source !== this && a.isDirected() || k--,
			a.target !== this && a.isDirected() || j--,
			!0) : !1
		}
		,
		this.getAllEdges = function(a) {
			for (var b = this.getEdges(a).slice(0), c = 0; c < l.length; c++)
				b.push.apply(b, l[c].getEdges(a));
			return b
		}
		,
		this.addGraph = function(a) {
			return a = "string" == typeof a ? new b.Graph({
				id: a
			}) : a,
			m.push(a),
			a.id || (a.id = "" + m.length),
			a
		}
		,
		this.getGraph = function(a) {
			for (var b = 0; b < m.length; b++)
				if (m[b].id === a)
					return m[b]
		}
		,
		this.getIndegreeCentrality = function() {
			for (var a = 0, b = 0; b < l.length; b++)
				a += l[b].getIndegreeCentrality();
			return j + a
		}
		,
		this.getOutdegreeCentrality = function() {
			for (var a = 0, b = 0; b < l.length; b++)
				a += l[b].getOutdegreeCentrality();
			return k + a
		}
		,
		this.getPorts = function() {
			return l
		}
		,
		this.addPort = function(a, b) {
			var c = e(a, b, g)
			  , d = this.getPort(c);
			return null == d && (d = new h(a,b,this),
			l.push(d),
			n[d.id] = d),
			d
		}
		,
		this.setPort = function(a, b) {
			var c = this.getPort(a);
			return c || (c = this.addPort({
				id: a
			})),
			c.data = b,
			c.setType(this.graph.getType(b)),
			c
		}
		,
		this.getPort = function(a) {
			return n[a]
		}
		;
		var o = function(a) {
			return a.constructor == b.Port ? a.id : a
		};
		this.removePort = function(a) {
			if (a) {
				for (var b = o(a), c = -1, d = !1, e = 0; e < l.length; e++)
					if (l[e].id === b) {
						c = e;
						break
					}
				-1 != c && (l.splice(c, 1),
				d = !0),
				delete n[b]
			}
			return d
		}
		;
		var p = 0
		  , q = {};
		this.setDefaultInternalCost = function(a) {
			p = a
		}
		,
		this.getInternalEdge = function(a, b) {
			var c = o(a)
			  , d = o(b)
			  , e = {
				source: n[c],
				target: n[d],
				cost: 1 / 0
			};
			if (e.source && e.target) {
				var f = q[c + "-" + d] || {
					cost: p,
					directed: !1
				};
				for (var g in f)
					e[g] = f[g]
			}
			return e
		}
		,
		this.setInternalEdge = function(a, b, c, d) {
			var e = o(a)
			  , f = o(b);
			return q[e + "-" + f] = {
				cost: c || p,
				directed: d
			},
			this.getInternalEdge(a, b)
		}
		,
		this.inspect = function() {
			for (var a = "{ id:" + this.id + ", edges:[\n", b = 0; b < i.length; b++)
				a += i[b].inspect() + "\n";
			return a += "]}"
		}
	}
	  , h = b.Port = function(a, b, c) {
		g.apply(this, [a, b, c.graph]),
		this.objectType = "Port",
		this.getNode = function() {
			return c
		}
		,
		this.getFullId = function() {
			return c.id + this.graph.getPortSeparator() + this.id
		}
		,
		this.isChildOf = function(a) {
			return c == a
		}
		,
		this.getPorts = this.addPort = this.deletePort = this.getPort = null
	}
	  , i = b.Edge = function(a) {
		c.call(this, a.data, a.graph),
		this.source = a.source,
		this.target = a.target,
		this.objectType = "Edge";
		var b = a.cost || 1
		  , d = !(a.directed === !1)
		  , e = a.id
		  , f = null ;
		this.data = a.data || {},
		this.getCost = function() {
			return b
		}
		,
		this.setCost = function(a) {
			b = a
		}
		,
		this.getId = this.getFullId = function() {
			return null === e ? this.source.id + "_" + this.target.id : e
		}
		,
		this.setId = function(a) {
			e = a
		}
		,
		this.isDirected = function() {
			return d
		}
		,
		this.setDirected = function(a) {
			d = a
		}
		,
		this.inspect = function() {
			return null != e ? "{ id:" + e + ", connectionId:" + f + ", cost:" + b + ", directed:" + d + ", source:" + this.source.id + ", target:" + this.target.id + "}" : void 0
		}
	}
	  , j = b.Group = function(a, b, c) {
		g.apply(this, arguments),
		this.objectType = "Group";
		var d = []
		  , e = {};
		this.addVertex = this.addNode = function(a) {
			d.push(a),
			e[a.id] = a,
			a.group = this
		}
		,
		this.getVertexCount = this.getNodeCount = function() {
			return d.length
		}
		,
		this.getVertices = this.getNodes = function() {
			return d
		}
		,
		this.deleteVertex = this.deleteNode = function(a) {
			if (a = "string" == typeof a ? e[a] : a) {
				var b = d.indexOf(a);
				-1 != b && (d.splice(b, 1),
				delete e[a.id]),
				delete a.group
			}
		}
		,
		this.cleanup = function(a) {
			for (var b = d.length, e = 0; b > e; e++)
				a ? c.deleteVertex(d[0]) : delete d[0].group;
			d.length = 0
		}
		,
		this.getAllEdges = function(a) {
			for (var b = [], c = {}, e = 0; e < d.length; e++)
				Array.prototype.push.apply(b, d[e].getAllEdges(a).filter(function(a) {
					var b = a.getId()
					  , d = null == c[b];
					return c[b] = !0,
					d
				}));
			b.push.apply(b, this.getEdges(a).slice(0));
			var f = this.getPorts();
			for (e = 0; e < f.length; e++)
				b.push.apply(b, f[e].getEdges(a));
			return b
		}
	}
	  , k = (b.Graph = function(a) {
		a = a || {},
		this.vertices = [],
		this.edges = [],
		this.groups = [],
		this.id = a.id;
		var c = {}
		  , d = 0
		  , f = {}
		  , h = 0
		  , k = {}
		  , l = 0
		  , m = !(a.defaultDirected === !1)
		  , p = a.defaultCost || 1
		  , q = a.idFunction || function(a) {
			return a.id
		}
		  , r = a.typeFunction || function(a) {
			return a.type || "default"
		}
		  , s = a.enableSubgraphs === !0
		  , t = a.portSeparator || "."
		  , u = {}
		  , v = function(a) {
			delete u[a.id]
		}
		  , w = function(a) {
			u[a.id] = a
		}
		  , x = function() {
			u = {}
		};
		this.setIdFunction = function(a) {
			q = a
		}
		,
		this.getIdFunction = function() {
			return q
		}
		,
		this.setTypeFunction = function(a) {
			r = a
		}
		,
		this.getType = function(a) {
			return r(a)
		}
		,
		this.getTopLevelElements = function() {
			return u
		}
		,
		this.setEnableSubgraphs = function(a) {
			s = a
		}
		,
		this.setPortSeparator = function(a) {
			t = a
		}
		,
		this.getPortSeparator = function() {
			return t
		}
		;
		var y = function(a, d) {
			if (null == a)
				return null ;
			if ("string" != typeof a) {
				if (a.constructor == b.Port || a.constructor == b.Node || a.constructor == b.Group)
					return a;
				var e = a;
				if (a = q(a),
				"string" != typeof a)
					return e
			}
			var f = s ? a.split("/") : [a]
			  , g = function(a) {
				if (c[a])
					return c[a];
				if (k[a])
					return k[a];
				var b = a.split(t)
				  , e = b[0]
				  , f = c[e] || k[e];
				if (2 === b.length && null != f) {
					var g = f.getPort(b[1]);
					return null == g && d && (g = f.addPort(b[1])),
					g
				}
				return f
			};
			if (1 == f.length)
				return g(f[0]);
			if (f.length > 1 && f % 2 == 0)
				throw "Subgraph path format error.";
			for (var h = null , i = null , j = 0; j < f.length - 1; j += 2)
				h = g(f[j]),
				i = h.getGraph(f[j + 1]);
			return i.getVertex(f[f.length - 1])
		};
		this.clear = function() {
			this.vertices.length = 0,
			this.groups.length = 0,
			d = 0,
			h = 0,
			c = {},
			f = {},
			k = {},
			x()
		}
		,
		this.getVertices = this.getNodes = function() {
			return this.vertices
		}
		,
		this.getVertexCount = this.getNodeCount = function() {
			return this.vertices.length
		}
		,
		this.getVertexAt = this.getNodeAt = function(a) {
			return this.vertices[a]
		}
		,
		this.getEdgeCount = function() {
			return h
		}
		,
		this.addEdge = function(a, b, c) {
			var d = null == a.directed ? m === !0 : !(a.directed === !1)
			  , g = a.cost || p
			  , j = e(a.data, b, this)
			  , k = y(a.source, !0)
			  , l = y(a.target, !0);
			if (null == k || null == k.objectType)
				throw new TypeError("Unknown source node [" + a.source + "]");
			if (null == l || null == l.objectType)
				throw new TypeError("Unknown target node [" + a.target + "]");
			if (c && !c(k, l))
				return null ;
			var n = new i({
				source: k,
				target: l,
				cost: g,
				directed: d,
				data: a.data || {},
				id: j,
				graph: this
			});
			return n.source.addEdge(n),
			n.source !== n.target && n.target.addEdge(n),
			f[j] = n,
			h++,
			n
		}
		,
		this.addVertex = this.addNode = function(a, b) {
			var e = new g(a,b || q,this);
			return c[e.id] ? null : (this.vertices.push(e),
			c[e.id] = e,
			e._id = d++,
			w(e),
			e)
		}
		,
		this.addVertices = this.addNodes = function(a, b) {
			for (var c = 0; c < a.length; c++)
				this.addVertex(a[c], b || q)
		}
		,
		this.addGroup = function(a, b) {
			var c = new j(a,b || q,this);
			return k[c.id] ? k[c.id] : (this.groups.push(c),
			k[c.id] = c,
			c._id = l++,
			w(c),
			c)
		}
		,
		this.getGroupCount = function() {
			return this.groups.length
		}
		,
		this.getGroupAt = function(a) {
			return this.groups[a]
		}
		,
		this.addVertexToGroup = function(a, b) {
			b = "string" == typeof b ? k[b] : b,
			a = y(a),
			a && b && (b.addVertex(a),
			v(a))
		}
		,
		this.addVerticesToGroup = function(a, b) {
			for (var c = 0; c < a.length; c++)
				this.addVertexToGroup(a[c], b)
		}
		,
		this.deleteVertexFromGroup = function(a) {
			a = y(a),
			a && a.group && (a.group.deleteVertex(a),
			w(a))
		}
		,
		this.deleteVerticesFromGroup = function(a, b) {
			for (var c = 0; c < a.length; c++)
				this.deleteVertexFromGroup(a[c], b)
		}
		,
		this.deleteGroup = function(a, b) {
			if (a = "string" == typeof a ? k[a] : a) {
				a.cleanup(b),
				delete k[a.id];
				for (var c = -1, d = 0; d < this.groups.length; d++)
					if (this.groups[d].id === a.id) {
						c = d;
						break
					}
				return c > -1 && this.groups.splice(c, 1),
				v(a),
				a
			}
		}
		,
		this.getGroup = function(a) {
			return "string" == typeof a ? k[a] : a
		}
		,
		this.deleteVertex = this.deleteNode = function(a) {
			var b = y(a);
			if (b) {
				for (var e = -1, f = 0; f < this.vertices.length; f++)
					if (this.vertices[f].id === b.id) {
						e = f;
						break
					}
				e > -1 && (this.vertices.splice(e, 1),
				null != b.group && b.group.deleteVertex(b));
				for (var g = b.getEdges(), i = 0; i < g.length; i++)
					this.deleteEdge(g[i]);
				if (h -= g.length,
				b.getPorts)
					for (var j = b.getPorts(), k = 0; k < j.length; k++)
						this.deleteVertex(j[k]);
				delete c[b.id],
				d--,
				v(b)
			}
		}
		,
		this.deleteEdge = function(a) {
			if (a = this.getEdge(a),
			null != a) {
				var b = y(a.source);
				b && b.deleteEdge(a) && h--;
				var c = y(a.target);
				c && c.deleteEdge(a),
				delete f[a.getId()]
			}
		}
		,
		this.getEdge = function(a) {
			if (null != a) {
				if ("string" != typeof a) {
					if (a.constructor == b.Edge)
						return a;
					var c = a;
					if (a = q(a),
					"string" != typeof a)
						return c
				}
				return f[a]
			}
		}
		,
		this.getEdges = function(a) {
			a = a || {};
			var b, c = a.source, d = a.target, e = a.filter || function() {
				return !0
			}
			, g = function(a) {
				return !(null != c && a.source == j !== c || null != d && a.target == j !== d)
			}, h = [], i = function(a) {
				e(a) && g(a) && h.push(a)
			};
			if (a.node) {
				var j = y(a.node)
				  , k = j.getAllEdges();
				for (b = 0; b < k.length; b++)
					i(k[b])
			} else
				for (b in f)
					i(f[b]);
			return h
		}
		,
		this.getAllEdges = function() {
			var a = [];
			for (var b in f)
				a.push(f[b]);
			return a
		}
		,
		this.findPath = function(a, b, c, d, e) {
			return a = y(a),
			b = y(b),
			o.compute({
				graph: this,
				source: a,
				target: b,
				strict: !(c === !1),
				nodeFilter: d,
				edgeFilter: e
			})
		}
		,
		this.getDistance = function(a, b, c) {
			var d = this.findPath(a, b, c);
			return d.pathDistance
		}
		,
		this.getVertex = this.getNode = y,
		this.setTarget = function(a, b) {
			if (b = y(b),
			null == b)
				return {
					success: !1
				};
			var c = a.target;
			return a.target.deleteEdge(a),
			a.target = b,
			b.addEdge(a),
			{
				old: c,
				edge: a,
				"new": b,
				success: !0
			}
		}
		,
		this.setSource = function(a, b) {
			if (b = y(b),
			null == b)
				return {
					success: !1
				};
			var c = a.source;
			return a.source.deleteEdge(a),
			a.source = b,
			b.addEdge(a),
			{
				old: c,
				edge: a,
				"new": b,
				success: !0
			}
		}
		,
		this.printPath = function(a, b) {
			a = y(a),
			b = y(b);
			for (var c = this.findPath(a, b).path, d = "[" + a.id + " - " + b.id + "] : ", e = 0; e < c.length; e++)
				d = d + "{ vertex:" + c[e].vertex.id + ", cost:" + c[e].cost + ", edge: " + (c[e].edge && c[e].edge.getId()) + " } ";
			return d
		}
		,
		this.getDiameter = function(a) {
			for (var b = 0, c = 0; c < this.vertices.length; c++)
				for (var d = 0; d < this.vertices.length; d++)
					if (d != c) {
						var e = o.compute({
							graph: this,
							source: this.vertices[c],
							target: this.vertices[d]
						});
						if (null == e.path || 0 == e.path.length) {
							if (!a)
								return 1 / 0
						} else
							b = Math.max(b, e.pathDistance)
					}
			return b
		}
		,
		this.diameter = this.getDiameter,
		this.getCentrality = function(a) {
			return a = y(a),
			(a.getIndegreeCentrality() + a.getOutdegreeCentrality()) / (this.getVertexCount() - 1)
		}
		,
		this.getDegreeCentrality = this.getCentrality,
		this.getIndegreeCentrality = function(a) {
			return a = y(a),
			a.getIndegreeCentrality() / (this.getVertexCount() - 1)
		}
		,
		this.getOutdegreeCentrality = function(a) {
			return a = y(a),
			a.getOutdegreeCentrality() / (this.getVertexCount() - 1)
		}
		,
		this.getCloseness = function(a) {
			return 1 / this.getFarness(a)
		}
		,
		this.getFarness = function(a) {
			a = y(a);
			var b = o.compute({
				graph: this,
				source: a,
				target: a,
				processAll: !0
			})
			  , c = 0;
			for (var d in b.dist)
				c += b.dist[d];
			return c / (this.getVertexCount() - 1)
		}
		,
		this.getBetweenness = function(a) {
			var b = this.getVertexCount()
			  , c = (b - 1) * (b - 2) / 2
			  , d = 0
			  , e = 0
			  , f = function(a, b, c, d, e) {
				var g = c.parents[a][b];
				if (0 == g.length) {
					var h = d.slice();
					h.unshift(a),
					e.push(h)
				} else
					for (var i = 0; i < g.length; i++)
						if (-1 == d.indexOf(g[i][0].id)) {
							var h = d.slice();
							h.unshift(g[i][0].id),
							f(a, g[i][0].id, c, h, e)
						}
			};
			a = y(a);
			var g = n.compute({
				graph: this,
				focus: a
			});
			for (var h in g.paths)
				for (var i in g.paths[h])
					if (h != i) {
						var j = []
						  , k = 0;
						f(h, i, g, [i], j);
						for (var l = 0; l < j.length; l++) {
							var m = j[l].indexOf(a.id);
							m > 0 && m < j[l].length - 1 && k++
						}
						d += k / j.length,
						e += k
					}
			return d / c
		}
		,
		this.inspect = function() {
			for (var a = "", b = 0; b < this.vertices.length; b++)
				a += this.vertices[b].inspect() + "\n";
			return a
		}
		,
		this.serialize = function() {
			for (var a = {
				nodes: [],
				edges: [],
				ports: [],
				groups: []
			}, b = 0; b < this.vertices.length; b++) {
				var c = this.vertices[b];
				a.nodes.push(c.data);
				for (var d = c.getAllEdges(), e = c.getPorts(), f = 0; f < d.length; f++)
					if (d[f].source == c || "Port" === d[f].source.objectType && d[f].source.getNode() == c) {
						var g = {
							source: d[f].source.getFullId(),
							target: d[f].target.getFullId()
						};
						d[f].data && (g.data = d[f].data),
						a.edges.push(g)
					}
				for (var h = 0; h < e.length; h++) {
					var i = {};
					for (var j in e[h].data)
						i[j] = e[h].data[j];
					i.id = e[h].getFullId(),
					a.ports.push(i)
				}
			}
			for (b = 0; b < this.groups.length; b++)
				a.groups.push(this.groups[b].data);
			return a
		}
	}
	,
	function(a, b, c, d, e) {
		for (var f = -1, g = null , h = 1 / 0, i = 0; i < a.length; i++)
			if (!b[i]) {
				var j = e(a[i]);
				h > j && (h = j,
				f = i,
				g = a[i])
			}
		return {
			node: g,
			index: f
		}
	}
	)
	  , l = function(a, b) {
		var c = b.getFullId()
		  , d = a[c];
		return null == d && (c = b.getNode ? b.getNode().id : b.id,
		d = a[c]),
		null == d ? null : {
			p: d,
			id: c
		}
	}
	  , m = function(a, b, c, d, e, f) {
		for (var g = [], h = d, i = l(b, h); null != i; )
			g.splice(0, 0, {
				vertex: h,
				cost: a[i.id],
				edge: c[i.id]
			}),
			h = i.p,
			i = l(b, h);
		return g.splice(0, 0, {
			vertex: h,
			cost: 0,
			edge: null
		}),
		g
	}
	  , n = {
		getPath: function(a, b, c, d) {
			if (a[c.id][d.id] == 1 / 0)
				return null ;
			var e = b[c.id][d.id];
			return null == e ? " " : n.getPath(a, b, c, e) + " " + e.id + " " + n.getPath(a, b, e, d)
		},
		getPaths: function(a, b, c, d, e) {
			if (a[c.id][d.id] == 1 / 0)
				return null ;
			var f = b[c.id][d.id];
			return 0 == f.length ? " " : n.getPaths(a, b, c, f[0]) + " " + f[0].id + " " + n.getPaths(a, b, f[0], d)
		},
		compute: function(a) {
			var b, c, d, e = a.graph, f = e.getVertexCount(), g = {}, h = {};
			for (b = 0; f > b; b++) {
				var i = e.getVertexAt(b);
				for (g[i.id] || (g[i.id] = {}),
				h[i.id] || (h[i.id] = {}),
				g[i.id][i.id] = 0,
				c = 0; f > c; c++)
					if (b != c) {
						var j = e.getVertexAt(c);
						g[i.id][j.id] || (g[i.id][j.id] = 1 / 0),
						h[i.id][j.id] || (h[i.id][j.id] = [])
					}
				var k = i.getEdges();
				for (d = 0; d < k.length; d++)
					k[d].source == i ? g[i.id][k[d].target.id] = k[d].getCost() : (g[k[d].source.id] || (g[k[d].source.id] = {},
					h[k[d].source.id] = {}),
					g[i.id][k[d].source.id] = k[d].getCost())
			}
			for (d = 0; f > d; d++)
				for (b = 0; f > b; b++)
					for (c = 0; f > c; c++)
						if (b != c && c != d && b != d) {
							var l = e.getVertexAt(b).id
							  , m = e.getVertexAt(c).id
							  , n = e.getVertexAt(d).id;
							g[l][n] + g[n][m] <= g[l][m] && g[l][n] + g[n][m] != 1 / 0 && (g[l][m] = g[l][n] + g[n][m],
							h[l][m] || (h[l][m] = []),
							h[l][m].unshift([e.getVertexAt(d), g[l][m]]))
						}
			return {
				paths: g,
				parents: h
			}
		}
	}
	  , o = {
		compute: function(a) {
			for (var b = a.graph, c = a.source, d = a.target, e = a.nodeFilter, f = a.edgeFilter, g = {}, h = {}, i = {}, j = {
				dist: g,
				previous: h,
				edges: i,
				path: []
			}, l = a.processAll, n = {}, o = {}, p = !(a.strict === !1), q = function(a) {
				return a.getFullId ? a.getFullId() : a.id
			}, r = [], s = function(a) {
				var b = o[a.getFullId()];
				return n[b.v.id]
			}, t = function(a, b) {
				var c, d;
				if ("Port" === a.objectType) {
					for (g[a.getFullId()] = b,
					c = s(a),
					d = 0; d < c.length; d++)
						c[d].p != a && (g[c[d].p.getFullId()] = b + a.getNode().getInternalEdge(a, c[d].p).cost);
					p || (g[a.getNode().id] = b)
				} else
					for (g[a.id] = b,
					c = n[a.id],
					d = 0; d < c.length; d++)
						g[c[d].p.getFullId()] = b
			}, u = function(a) {
				return e && !e(a) ? 1 / 0 : g[q(a)]
			}, v = function(a, b, c) {
				if ("Port" === a.objectType) {
					for (var d = s(a), e = 0; e < d.length; e++)
						h[d[e].p.getFullId()] = c.node;
					p || (h[a.getNode().id] = c.node)
				}
				h[b] = c.node
			}, w = function(a, b, c) {
				if ("Port" === a.objectType) {
					for (var d = s(a), e = 0; e < d.length; e++)
						i[d[e].p.getFullId()] = c;
					p || (i[a.getNode().id] = c)
				}
				i[b] = c
			}, x = 0; x < b.vertices.length; x++) {
				var y = b.vertices[x]
				  , z = y.getPorts();
				r.push(y);
				var A = {
					v: y,
					i: r.length - 1
				};
				n[y.id] = [],
				t(y, 1 / 0);
				for (var B = 0; B < z.length; B++)
					r.push(z[B]),
					o[z[B].getFullId()] = A,
					n[y.id].push({
						p: z[B],
						i: r.length - 1
					}),
					t(z[B], 1 / 0)
			}
			if (null == c && (c = b.getVertex(a.sourceId)),
			null == d && (d = b.getVertex(a.targetId)),
			null == c || null == d)
				return j;
			var C = c
			  , D = d;
			c.getNode && (C = c.getNode()),
			d.getNode && (D = d.getNode()),
			t(c, 0);
			for (var E = new Array(b.vertices.length), F = 0, G = function(a, b, c, d) {
				for (var e = 0; e < b.length; e++) {
					var f = b[e];
					if (c(f)) {
						var g = d(f)
						  , h = g.tp || g.tn
						  , i = q(h)
						  , j = u(a.node) + f.getCost()
						  , k = u(h);
						k > j && (t(h, j),
						v(h, i, a),
						w(h, i, f))
					}
				}
			}; F < r.length; ) {
				var H = k(r, E, g, q, u)
				  , I = H.node ? q(H.node) : null ;
				if (!H.node || u(H.node) == 1 / 0)
					break;
				if (d && (I == q(d) || !p && H.node.isChildOf && H.node.isChildOf(d)) && (j.path = m(g, h, i, d, q),
				j.pathDistance = j.path[j.path.length - 1].cost,
				!l))
					break;
				E[H.index] = !0,
				F += 1,
				G(H, H.node.getAllEdges(), function(a) {
					return f && !f(a) ? !1 : !a.isDirected() || H.node == a.source || !p && a.source.isChildOf && a.source.isChildOf(H.node)
				}, function(a) {
					var b = a.source.getNode ? a.source.getNode() : a.source
					  , c = a.source.getNode ? a.source : null
					  , d = a.target.getNode ? a.target.getNode() : a.target
					  , e = a.target.getNode ? a.target : null ;
					return a.source == H.node || !p && a.source.isChildOf && a.source.isChildOf(H.node) ? {
						tn: d,
						tp: e
					} : {
						tn: b,
						tp: c
					}
				})
			}
			return j
		}
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbUtil
	  , c = a.jsPlumb
	  , d = a.jsPlumbToolkitUtil
	  , e = a.jsPlumbGraph
	  , f = "type"
	  , g = "default"
	  , h = function(a) {
		return a.id
	};
	a.jsPlumbToolkitInstance = function(i) {
		i = i || {};
		var j = i.idFunction || h
		  , k = i.typeProperty || f
		  , l = i.edgeTypeProperty || f
		  , m = i.portTypeProperty || f
		  , n = i.typeFunction || function(a) {
			return a[k] || g
		}
		  , o = i.edgeIdFunction || j
		  , p = i.edgeTypeFunction || function(a) {
			return a[l] || g
		}
		  , q = i.portIdFunction || j
		  , r = i.portTypeFunction || function(a) {
			return a[m] || g
		}
		  , s = i.portExtractor
		  , t = this
		  , u = !1
		  , v = !1
		  , w = i.model || {}
		  , x = function(a, c, e) {
			c = null != c && b.isObject(c) ? c : {},
			c = b.clone(c),
			c.id = c.id || d.uuid(),
			c.type = c.type || (null == a ? null : a.type || a),
			e(c)
		}
		  , y = i.nodeFactory || x
		  , z = i.edgeFactory || x
		  , A = i.portFactory || x
		  , B = i.groupFactory || x
		  , C = i.autoSave && i.saveUrl
		  , D = i.saveUrl
		  , E = i.saveHeaders
		  , F = i.onAutoSaveSuccess || function() {}
		  , G = i.onAutoSaveError || function() {}
		  , H = i.doNotUpdateOriginalData === !0
		  , I = {
			portSeparator: i.portSeparator,
			defaultCost: i.defaultCost,
			defaultDirected: i.defaultDirected,
			enableSubgraphs: i.enableSubgraphs
		}
		  , J = i.createMissingGroups === !0;
		b.EventGenerator.apply(this, arguments);
		var K = new e.Graph(I);
		C && new d.AutoSaver(this,D,E,F,G),
		new d.CatchAllEventHandler(this),
		this.getNodeFactory = function() {
			return y
		}
		,
		this.getGroupFactory = function() {
			return B
		}
		,
		this.getEdgeFactory = function() {
			return z
		}
		,
		this.getPortFactory = function() {
			return A
		}
		,
		this.setNodeFactory = function(a) {
			y = a
		}
		,
		this.setGroupFactory = function(a) {
			B = a
		}
		,
		this.setEdgeFactory = function(a) {
			z = a
		}
		,
		this.setPortFactory = function(a) {
			A = a
		}
		,
		this.setDebugEnabled = function(a) {
			v = a
		}
		,
		this.isDebugEnabled = function() {
			return v
		}
		,
		this.getModel = function() {
			return w || {}
		}
		;
		var L, M = function() {
			return null == L && (L = new a.jsPlumbToolkit.Model(w || {})),
			L
		}, N = function(a, b) {
			if (null == w)
				return !0;
			var c = this.getType(a)
			  , d = this.getType(b)
			  , e = M()
			  , f = a.getNode ? a.getNode() : a
			  , g = b.getNode ? b.getNode() : b
			  , h = "Node" == a.objectType ? e.getNodeDefinition(c) : e.getPortDefinition(c)
			  , i = "Node" == b.objectType ? e.getNodeDefinition(d) : e.getPortDefinition(d)
			  , j = this.getNodeType(f)
			  , k = this.getNodeType(g)
			  , l = e.getNodeDefinition(j)
			  , m = e.getNodeDefinition(k);
			return null != h.maxConnections && a.getEdges().length >= h.maxConnections ? !1 : null != i.maxConnections && b.getEdges().length >= i.maxConnections ? !1 : a == b ? !(l.allowLoopback === !1 || h.allowLoopback === !1 || i.allowLoopback === !1 || m.allowLoopback === !1) : f == g ? !(l.allowNodeLoopback === !1 || h.allowNodeLoopback === !1 || i.allowNodeLoopback === !1 || m.allowNodeLoopback === !1) : !0
		}
		.bind(this);
		this.beforeConnect = i.beforeConnect || N,
		this.beforeMoveConnection = i.beforeMoveConnection || N,
		this.beforeStartConnect = i.beforeStartConnect || function(a, b) {
			return {}
		}
		,
		this.beforeDetach = i.beforeDetach || function(a, b, c) {
			return !0
		}
		,
		this.beforeStartDetach = i.beforeStartDetach || function(a, b) {
			return !0
		}
		,
		this.setSuspendGraph = function(a) {
			u = a
		}
		,
		this.setDoNotUpdateOriginalData = function(a) {
			H = a
		}
		,
		this.getTypeFunction = function() {
			return n
		}
		,
		this.connect = function(a) {
			a = a || {};
			var b;
			if (!u) {
				var d = K.getVertex(a.source)
				  , e = K.getVertex(a.target)
				  , f = a.cost
				  , g = a.directed;
				if (!d) {
					if (a.doNotCreateMissingNodes)
						return;
					d = K.addVertex(a.source),
					t.fire("nodeAdded", {
						data: {},
						node: d
					})
				}
				if (!e) {
					if (a.doNotCreateMissingNodes)
						return;
					e = K.addVertex(a.target),
					t.fire("nodeAdded", {
						data: {},
						node: e
					})
				}
				var h = this.beforeStartConnect(d, p(a.data || {}));
				if (h) {
					var i = a.data || {};
					"object" == typeof h && c.extend(i, h);
					var j = this.beforeConnect(d, e, i);
					j !== !1 && (b = K.addEdge({
						source: d,
						target: e,
						cost: f,
						directed: g,
						data: i
					}),
					t.fire("edgeAdded", {
						edge: b
					}))
				}
			}
			return b
		}
		,
		this.clear = function() {
			return K.clear(),
			this.fire("graphCleared"),
			this
		}
		,
		this.getGraph = function() {
			return K
		}
		,
		this.getNodeCount = function() {
			return K.getVertexCount()
		}
		,
		this.getNodeAt = function(a) {
			return K.getVertexAt(a)
		}
		,
		this.getNodes = function() {
			return K.getVertices()
		}
		,
		this.eachNode = function(a) {
			for (var b, c = 0, d = K.getVertexCount(); d > c; c++)
				b = K.getVertexAt(c),
				a(c, b)
		}
		,
		this.eachGroup = function(a) {
			for (var b, c = 0, d = K.getGroupCount(); d > c; c++)
				b = K.getGroupAt(c),
				a(c, b)
		}
		,
		this.eachEdge = function(a) {
			for (var b = K.getEdges(), c = 0, d = b.length; d > c; c++)
				a(c, b[c])
		}
		,
		this.getEdgeCount = function() {
			return K.getEdgeCount()
		}
		,
		this.getGroupCount = function() {
			return K.getGroupCount()
		}
		,
		this.getGroupAt = function(a) {
			return K.getGroupAt(a)
		}
		,
		this.getNodeId = function(a) {
			return b.isObject(a) ? j(a) : a
		}
		,
		this.getNodeType = function(a) {
			return n(a) || "default"
		}
		,
		this.getEdgeId = function(a) {
			return b.isObject(a) ? o(a) : a
		}
		,
		this.getEdgeType = function(a) {
			return p(a) || "default"
		}
		,
		this.getPortId = function(a) {
			return b.isObject(a) ? q(a) : a
		}
		,
		this.getPortType = function(a) {
			return r(a) || "default"
		}
		,
		this.getType = function(a) {
			var b = "Node" === a.objectType ? n : "Port" === a.objectType ? r : p;
			return b(a.data) || "default"
		}
		,
		this.setType = function(a, b) {
			var c = this.getType(a);
			if (c !== b) {
				var d = "Node" === a.objectType ? k : "Port" === a.objectType ? m : l
				  , e = a.objectType.charAt(0).toLowerCase() + a.objectType.substring(1) + "TypeChanged";
				a.data[d] = b,
				this.fire(e, {
					obj: a,
					previousType: c,
					newType: b
				})
			}
		}
		,
		this.addNode = function(b, c, e) {
			var f = j(b);
			null == f && "string" != typeof b && (b.id = d.uuid());
			var g = K.addNode(b, j);
			if (null != g) {
				if (null != s) {
					var h = s(g.data, g);
					if (null != h)
						for (var i = 0; i < h.length; i++)
							g.addPort(h[i])
				}
				if ("string" != typeof b && null != b.group) {
					var k = this.getGroup(b.group);
					null == k && J && (k = K.addGroup(b.group)),
					null != k && k.addVertex(g)
				}
				return T || H || a.jsPlumbToolkitIO.manage("addNode", R, S, g, j || K.getIdFunction(), t),
				e || t.fire("nodeAdded", {
					data: b,
					node: g,
					eventInfo: c
				}),
				g
			}
			return K.getNode(f)
		}
		,
		this.addFactoryNode = function(a, b, c) {
			b = 2 != arguments.length || null != arguments[1] && "object" != typeof arguments[1] ? {} : arguments[1],
			c = 3 == arguments.length ? arguments[2] : "function" == typeof arguments[1] ? arguments[1] : null ,
			b.type = b.type || a,
			y(a, b, function(a) {
				var b = this.addNode(a);
				c && c(b)
			}
			.bind(this))
		}
		,
		this.addNodes = function(a) {
			for (var b = 0; b < a.length; b++)
				t.addNode.apply(t, [a[b]]);
			return t
		}
		,
		this.addGroup = function(b, c, e) {
			var f = j(b);
			null == f && "string" != typeof b && (b.id = d.uuid());
			var g = K.addGroup(b, j);
			return T || H || a.jsPlumbToolkitIO.manage("addGroup", R, S, g, j || K.getIdFunction(), t),
			e || t.fire("groupAdded", {
				data: b,
				group: g,
				eventInfo: c
			}),
			g
		}
		,
		this.addToGroup = function(a, b, c) {
			return a = t.getNode(a),
			b = t.getGroup(b),
			a && b && (b.addVertex(a),
			a.data.group = b.id,
			c || t.fire("group:addMember", {
				node: a,
				group: this.getGroup(b)
			}),
			t.fire("dataUpdated")),
			b
		}
		,
		this.removeFromGroup = function(a, b) {
			a = t.getNode(a);
			var c;
			return a && a.group && (c = a.group,
			c.deleteVertex(a),
			delete a.data.group,
			b || t.fire("group:removeMember", {
				node: a,
				group: c
			}),
			t.fire("dataUpdated")),
			c
		}
		,
		this.removeGroup = function(b, c, d) {
			var e = K.deleteGroup(b, c);
			e && (T || H || a.jsPlumbToolkitIO.manage("removeGroup", R, S, e, j || K.getIdFunction(), t),
			d || t.fire("groupRemoved", {
				group: e,
				removeChildNodes: c
			}))
		}
		,
		this.getNode = function(a) {
			return K.getVertex(a)
		}
		,
		this.getEdge = function(a) {
			return K.getEdge(a)
		}
		,
		this.getGroup = function(a) {
			return K.getGroup(a)
		}
		,
		this.exists = function(a) {
			for (var b = 0; b < arguments.length; b++)
				if (null == K.getVertex(arguments[b]))
					return !1;
			return !0
		}
		,
		this.removeNode = function(b, c) {
			b = b.constructor == e.Vertex || b.constructor == e.Port ? b : K.getVertex(b);
			for (var d = b.getAllEdges() || [], f = 0; f < d.length; f++)
				t.removeEdge(d[f]);
			return K.deleteVertex(b.id),
			T || H || a.jsPlumbToolkitIO.manage("removeNode", R, S, b, j || K.getIdFunction(), t),
			c || t.fire("nodeRemoved", {
				node: b,
				nodeId: b.id,
				edges: d
			}),
			t
		}
		,
		this.addEdge = function(b, c, d) {
			var e = K.addEdge(b, o, this.beforeConnect);
			return T || H || a.jsPlumbToolkitIO.manage("addEdge", R, S, e, o || K.getIdFunction(), t),
			d || t.fire("edgeAdded", {
				edge: e,
				source: c,
				geometry: b.geometry,
				addedByMouse: b.addedByMouse
			}, null ),
			e
		}
		,
		this.removeEdge = function(b, c) {
			return b = K.getEdge(b),
			null != b && (K.deleteEdge(b),
			T || H || a.jsPlumbToolkitIO.manage("removeEdge", R, S, b, o || K.getIdFunction(), t),
			t.fire("edgeRemoved", {
				edge: b,
				source: c
			}, null )),
			t
		}
		,
		this.edgeMoved = function(a, b, c) {
			var d = (a[0 === c ? "source" : "target"],
			0 == c ? "setSource" : "setTarget");
			return this[d](a, b)
		}
		,
		this.setTarget = function(a, b, c) {
			var d = K.setTarget.apply(K, arguments);
			return d.success === !1 || c || t.fire("edgeTarget", d),
			d
		}
		,
		this.setSource = function(a, b, c) {
			var d = K.setSource.apply(K, arguments);
			return d.success === !1 || c || t.fire("edgeSource", d),
			d
		}
		,
		this.addNewPort = function(b, c, d, e) {
			b = K.getVertex(b),
			A({
				node: b,
				type: c
			}, d, function(c) {
				var d = q(c)
				  , f = b.addPort(d);
				f.data = c,
				T || H || a.jsPlumbToolkitIO.manage("addPort", R, S, {
					node: b,
					port: f
				}, q || K.getIdFunction(), t),
				e || t.fire("portAdded", {
					node: b,
					data: c,
					port: f
				}, null )
			})
		}
		,
		this.addPort = function(b, c, d) {
			var e = b.addPort(c, q);
			return T || H || a.jsPlumbToolkitIO.manage("addPort", R, S, {
				node: b,
				port: e
			}, q || K.getIdFunction(), t),
			d || t.fire("portAdded", {
				node: b,
				data: c,
				port: e
			}, null ),
			e
		}
		,
		this.removePort = function(a, b, c) {
			var d = !1;
			a = a.constructor == e.Vertex || a.constructor == e.Port ? a : K.getVertex(a);
			var f = a.getPort(b);
			if (f) {
				var g = f.getAllEdges();
				if (d = a.removePort(f),
				d && !c) {
					t.fire("portRemoved", {
						node: a,
						port: f,
						edges: g
					}, null );
					for (var h = 0; h < g.length; h++)
						t.removeEdge(g[h])
				}
			}
			return d
		}
		,
		this.remove = function(a) {
			if (null != a) {
				var b = t.getObjectInfo(a);
				t.setSuspendRendering(!0);
				try {
					if (!b.obj || "Node" != b.type && "Edge" != b.type && "Group" !== b.type) {
						for (; a.getNodeCount() > 0; )
							t.removeNode(a.getNodeAt(0));
						for (; a.getEdgeCount() > 0; )
							t.removeEdge(a.getEdgeAt(0));
						for (; a.getGroupCount() > 0; )
							t.removeGroup(a.getGroupAt(0))
					} else
						t["remove" + b.type](b.obj)
				} finally {
					t.setSuspendRendering(!1, !0)
				}
			}
		}
		,
		this.setSuspendRendering = function(a, b) {
			for (var c in _)
				_[c].setSuspendRendering(a, b)
		}
		,
		this.batch = function(a) {
			t.setSuspendRendering(!0);
			try {
				a()
			} catch (b) {
				jsPlumbUtil.log("Error in transaction " + b)
			} finally {
				t.setSuspendRendering(!1, !0)
			}
		}
		;
		var O = function(a, c, d, e, f) {
			var g = K.getNode(a);
			if (g && g.objectType) {
				if (c)
					for (var h in c)
						b.replace(g.data, h, c[h]);
				t.fire(d, e(g), null )
			}
		}
		.bind(this);
		this.updateNode = function(a, b) {
			O(a, b, "nodeUpdated", function(a) {
				return {
					node: a,
					updates: b || {}
				}
			})
		}
		,
		this.updatePort = function(a, b) {
			O(a, b, "portUpdated", function(a) {
				return {
					port: a,
					node: a.getNode(),
					updates: b || {}
				}
			})
		}
		,
		this.updateEdge = function(a, c) {
			var d = K.getEdge(a);
			if (d) {
				if (c)
					for (var e in c)
						null == d.data[e] ? d.data[e] = c[e] : b.replace(d.data, e, c[e]);
				t.fire("edgeUpdated", {
					edge: d,
					updates: c || {}
				}, null )
			}
		}
		,
		this.update = function(a, c) {
			return b.isString(a) && (a = this.getNode(a)),
			a && a.objectType && this["update" + a.objectType](a, c),
			a
		}
		,
		this.getPath = function(b) {
			return new a.jsPlumbToolkit.Path(this,b)
		}
		;
		var P = this.findGraphObject = function(a) {
			return null == a ? null : "*" === a ? K : a.constructor == e.Vertex || a.constructor == e.Port ? a : b.isString(a) || b.isObject(a) ? K.getVertex(a) : null
		}
		  , Q = function(a, b, c) {
			a = a || {};
			var d = []
			  , f = {}
			  , g = function(a) {
				f[a.getId()] || (d.push(a),
				f[a.getId()] = !0)
			}
			  , h = function(d, f, h, i) {
				if (null != d)
					for (var j = d[b]({
						filter: a.filter
					}), k = 0; k < j.length; k++) {
						var l = f && d == K || j[k].source == d || c && j[k].source.constructor == e.Port && j[k].source.getNode() == d
						  , m = h && d == K || j[k].target == d || c && j[k].target.constructor == e.Port && j[k].target.getNode() == d;
						(f && l || h && m || i && (l || m)) && g(j[k])
					}
			};
			return h(P(a.source), !0, !1, !1),
			h(P(a.target), !1, !0, !1),
			h(P(a.element), !1, !1, !0),
			d
		};
		this.getEdges = function(a) {
			return Q(a, "getEdges", !1)
		}
		,
		this.getAllEdges = function() {
			return K.getAllEdges()
		}
		,
		this.getAllEdgesFor = function(a, b) {
			return a.getAllEdges({
				filter: b
			})
		}
		,
		this.selectAllEdges = function() {
			return this.filter(function(a) {
				return "Edge" === a.objectType
			})
		}
		,
		this.addAllEdgesToSelection = function() {
			this.addToSelection(this.getAllEdges())
		}
		;
		var R, S, T, U = function(b, c, e) {
			b = b || {};
			var f = b.type || "json"
			  , g = b.data
			  , h = b.url
			  , i = b.jsonp
			  , j = b.onload
			  , k = b.parameters || {}
			  , l = b.error || function() {}
			;
			if (null == g && null == h)
				throw new TypeError("You must supply either data or url to load.");
			var m = function(b) {
				R = b,
				S = f,
				T = !0,
				t.fire(c),
				a.jsPlumbToolkitIO.parse(f, b, t, k),
				$(e),
				j && j(t, b),
				t.fire("graphChanged")
			};
			if (g)
				m(g);
			else if (h) {
				if (i) {
					var n = -1 === h.indexOf("?") ? "?" : "&";
					h = h + n + "callback=?"
				}
				var o = "json" === f ? f : b.dataType
				  , p = b.headers || {
					Accept: "application/json"
				};
				d.ajax({
					url: h,
					success: m,
					dataType: o,
					error: l,
					headers: p
				})
			}
			return t
		};
		this.load = function(a) {
			return U(a, "dataLoadStart", "dataLoadEnd")
		}
		,
		this.append = function(a) {
			return U(a, "dataAppendStart", "dataAppendEnd")
		}
		,
		this.save = function(a) {
			a = a || {};
			var b = this.exportData(a)
			  , e = {
				"Content-Type": "application/json"
			};
			return c.extend(e, a.headers || {}),
			d.ajax({
				url: a.url,
				type: "POST",
				data: b,
				success: a.success || function() {}
				,
				error: a.error || function() {}
				,
				headers: e
			}),
			t
		}
		,
		this.exportData = function(b) {
			return b = b || {},
			a.jsPlumbToolkitIO.exportData(b.type || "json", t, b.parameters)
		}
		;
		var V = function(a) {
			return new d.Selection({
				toolkit: t,
				onClear: a || function() {}
			})
		}
		  , W = V(function(a) {
			t.fire("selectionCleared", {
				selection: a
			})
		});
		i.maxSelectedNodes && W.setMaxNodes(i.maxSelectedNodes),
		i.maxSelectedEdges && W.setMaxEdges(i.maxSelectedEdges),
		i.selectionCapacityPolicy && W.setCapacityPolicy(i.selectionCapacityPolicy);
		var X = function(a, b, c, d) {
			return b || c.clear(!0),
			c.append(a, function(a) {
				d && t.fire("select", {
					append: b,
					obj: a,
					selection: c
				})
			})
		};
		this.setSelection = function(a) {
			X(a, !1, W, !0)
		}
		,
		this.select = function(a, b) {
			var c = V()
			  , d = X(a, !0, c);
			if (b)
				for (var e = 0; e < d[0].length; e++) {
					var f = d[0][e];
					if ("Node" == f.objectType || "Port" == f.objectType)
						for (var g = f.getAllEdges(), h = 0; h < g.length; h++)
							c.append(g[h])
				}
			return c
		}
		;
		var Y = function(a, b, c, d) {
			for (var e = a.getAllEdges(), f = 0, g = e.length; g > f; f++)
				if (e[f].source === a || e[f].getNode && e[f].getNode() === a) {
					var h = e[f].target
					  , i = h.getFullId();
					d[i] || (b.append(h),
					c && b.append(e[f]),
					d[i] = !0,
					Y(h, b, c, d))
				}
		};
		this.selectDescendants = function(a, b, c) {
			var d = t.getObjectInfo(a)
			  , e = V();
			if (d.obj && "Node" === d.obj.objectType) {
				b && X(d.obj, !0, e);
				var f = {};
				f[d.obj.getFullId()] = !0,
				Y(d.obj, e, c, f)
			}
			return e
		}
		,
		this.filter = function(a, b) {
			var c = "function" == typeof a ? a : function(c) {
				var d = c.data
				  , e = !1;
				for (var f in a) {
					var g = a[f] === d[f];
					if (!g && !b)
						return !1;
					e = e || g
				}
				return e
			}
			  , d = V();
			return this.eachNode(function(a, b) {
				c(b) && d.append(b);
				for (var e = b.getPorts(), f = 0; f < e.length; f++)
					c(e[f]) && d.append(e[f])
			}),
			this.eachEdge(function(a, b) {
				c(b) && d.append(b)
			}),
			this.eachGroup(function(a, b) {
				c(b) && d.append(b)
			}),
			d
		}
		,
		this.addToSelection = function(a) {
			var b = this.getObjectInfo(a);
			if (b) {
				var c = X(b.obj, !0, W, !0);
				Z("deselect", c[1]),
				Z("select", c[0])
			}
		}
		;
		var Z = function(a, b) {
			for (var c = 0; c < b.length; c++)
				t.fire(a, {
					obj: b[c],
					selection: W
				})
		};
		this.toggleSelection = function(a) {
			var b = this.getObjectInfo(a);
			if (b) {
				var c = []
				  , d = W.toggle(b.obj, function(a, b) {
					b || c.push(a)
				});
				Z("deselect", d[1]),
				Z("deselect", c),
				Z("select", d[0])
			}
		}
		,
		this.removeFromSelection = function(a) {
			var b = this.getObjectInfo(a);
			b && W.remove(b.obj, function(a) {
				t.fire("deselect", {
					obj: a,
					selection: W
				})
			})
		}
		,
		this.addPathToSelection = function(a) {
			this.addToSelection(this.getPath(a))
		}
		,
		this.selectAll = function() {
			throw new TypeError("not implemented")
		}
		,
		this.clearSelection = W.clear,
		this.getSelection = function() {
			return W
		}
		,
		this.setMaxSelectedNodes = function(a) {
			W.setMaxNodes(a)
		}
		,
		this.setMaxSelectedEdges = function(a) {
			W.setMaxEdges(a)
		}
		,
		this.setSelectionCapacityPolicy = function(a) {
			W.setCapacityPolicy(a)
		}
		;
		var $ = function(a) {
			t.setSuspendGraph(!0),
			t.fire(a),
			t.setSuspendGraph(!1),
			T = !1
		}
		  , _ = {};
		if (this.render = function(e, f) {
			var g = c.extend({}, f || {});
			c.extend(g, e),
			g.toolkit = t,
			null != e.selection && (e.selection.constructor === d.Selection ? g.toolkit = e.selection : g.toolkit = new d.Selection({
				generator: e.selection,
				toolkit: t
			}));
			var h = g.type || a.jsPlumbToolkit.DefaultRendererType
			  , i = new a.jsPlumbToolkit.Renderers[h](g)
			  , j = g.id || b.uuid();
			return _[j] = i,
			i.id = j,
			i
		}
		,
		this.getRenderer = function(a) {
			return _[a]
		}
		,
		this.getRenderers = function() {
			return _
		}
		,
		this.getObjectInfo = function(a, d) {
			var e = {
				els: {},
				obj: null ,
				type: null ,
				id: null ,
				el: null
			}
			  , f = function(a) {
				return null != a ? a.jtk ? a : f(a.parentNode) : void 0
			}
			  , g = function(a) {
				var b = {};
				for (var c in _)
					b[c] = [_[c], _[c].getRenderedElement(a)];
				return b
			};
			if (null != a) {
				if (a.eachNode && a.eachEdge)
					return {
						obj: a
					};
				if (b.isArray(a))
					return {
						obj: a
					};
				var h = c.getElement(a);
				if (null != h && h.jtk)
					e.el = h,
					e.obj = h.jtk.port || h.jtk.node;
				else if (null != a.tagName) {
					var i = f(h);
					null != i && (e.el = i,
					e.obj = i.jtk.port || i.jtk.node || i.jtk.group)
				} else {
					if ("string" == typeof a ? a = this.getNode(a) : "object" == typeof a && "undefined" == typeof a.objectType && (a = this.getNode(j(a))),
					null == a)
						return e;
					e.obj = a,
					null != d && (e.el = d(a))
				}
				null == d && (e.els = g(e.obj)),
				null != e.obj && (e.id = e.obj.id,
				e.type = e.obj.objectType)
			}
			return e
		}
		,
		i.data) {
			var aa = i.dataType || "json";
			t.load({
				data: i.data,
				type: aa
			})
		}
	}
	,
	b.extend(a.jsPlumbToolkitInstance, b.EventGenerator),
	a.jsPlumbToolkit = new a.jsPlumbToolkitInstance({}),
	a.jsPlumbToolkit.DefaultRendererType = null ,
	a.jsPlumbToolkit.ready = c.ready,
	a.jsPlumbToolkit.Renderers = {},
	a.jsPlumbToolkit.Widgets = {};
	var i = function(b) {
		return new a.jsPlumbToolkitInstance(b)
	};
	a.jsPlumbToolkit.newInstance = i,
	"undefined" != typeof exports && (exports.jsPlumbToolkit = a.jsPlumbToolkit,
	exports.newInstance = i)
}
.call("undefined" != typeof window ? window : this),
function() {
	var a = this
	  , b = a.jsPlumbToolkit
	  , c = a.jsPlumbToolkitUtil
	  , d = a.jsPlumbUtil;
	b.Model = function(a, e) {
		a = a || {},
		a.nodes = a.nodes || {},
		a.edges = a.edges || {},
		a.ports = a.ports || {},
		a.groups = a.groups || {};
		var f, g, h = {}, i = function(b) {
			var d = c.mergeWithParents([b, "default"], a.nodes);
			return delete d.parent,
			d
		}, j = function(b) {
			var d = c.mergeWithParents([b, "default"], a.edges);
			return delete d.parent,
			d
		}, k = function(b, d) {
			var e = d && d.ports ? c.mergeWithParents([b, "default"], d.ports) : c.mergeWithParents([b, "default"], a.ports);
			return delete e.parent,
			e
		}, l = function(b) {
			var d = c.mergeWithParents([b, "default"], a.groups);
			return delete d.parent,
			d
		};
		if ("undefined" != typeof e) {
			for (var m in a.edges) {
				if (f = j(m),
				f.overlays)
					for (g = 0; g < f.overlays.length; g++)
						if (d.isArray(f.overlays[g]) && f.overlays[g][1].events)
							for (var n in f.overlays[g][1].events)
								f.overlays[g][1].events[n] = function(a, b) {
									return function(c, d) {
										a.call(b, {
											overlay: c,
											e: d,
											component: c.component,
											edge: c.component.edge
										})
									}
								}(f.overlays[g][1].events[n], f.overlays[g]);
				e.registerConnectionType(m, f)
			}
			for (g in a.ports)
				f = k(g),
				e.registerEndpointType(g, f);
			if (a.states)
				for (var o in a.states)
					h[o] = new b.UIState(o,a.states[o],e)
		}
		return {
			getNodeDefinition: i,
			getEdgeDefinition: j,
			getPortDefinition: k,
			getGroupDefinition: l,
			getState: function(a) {
				return h[a]
			}
		}
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	var a = jsPlumbToolkit.ready
	  , b = function(a) {
		var b = 0
		  , c = function() {
			b--,
			0 >= b && e()
		};
		this.add = function(d) {
			b++,
			jsPlumbToolkitUtil.ajax({
				url: d,
				success: function(b) {
					var d = a.innerHTML;
					d += b,
					a.innerHTML = d,
					c()
				},
				error: function(a) {
					c()
				}
			})
		}
		,
		this.ensureNotEmpty = function() {
			0 >= b && e()
		}
	}
	  , c = []
	  , d = !1
	  , e = function() {
		d = !0;
		for (var b = 0; b < c.length; b++)
			a.call(a, c[b])
	};
	jsPlumbToolkit.ready = function(b) {
		d ? a.call(a, b) : c.push(b)
	}
	,
	jsPlumb.ready(function() {
		var a = document.getElementById("jsPlumbToolkitTemplates");
		if (a)
			e();
		else {
			a = document.createElement("div"),
			a.style.display = "none",
			a.id = "jsPlumbToolkitTemplates",
			document.body.appendChild(a);
			for (var c = new b(a), d = document.getElementsByTagName("script"), f = 0; f < d.length; f++) {
				var g = d[f].getAttribute("type")
				  , h = d[f].getAttribute("src");
				"text/x-jtk-templates" == g && c.add(h)
			}
			c.ensureNotEmpty()
		}
	})
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	this.jsPlumbToolkit.Classes = {
		LASSO: "jtk-lasso",
		LASSO_SELECT_DEFEAT: "jtk-lasso-select-defeat",
		MINIVIEW: "jtk-miniview",
		MINIVIEW_CANVAS: "jtk-miniview-canvas",
		MINIVIEW_PANNER: "jtk-miniview-panner",
		MINIVIEW_ELEMENT: "jtk-miniview-element",
		MINIVIEW_GROUP_ELEMENT: "jtk-miniview-group-element",
		MINIVIEW_PANNING: "jtk-miniview-panning",
		MINIVIEW_COLLAPSE: "jtk-miniview-collapse",
		MINIVIEW_COLLAPSED: "jtk-miniview-collapsed",
		NODE: "jtk-node",
		PORT: "jtk-port",
		GROUP: "jtk-group",
		SELECT_DEFEAT: "jtk-drag-select-defeat",
		SURFACE: "jtk-surface",
		SURFACE_NO_PAN: "jtk-surface-nopan",
		SURFACE_CANVAS: "jtk-surface-canvas",
		SURFACE_PAN: "jtk-surface-pan",
		SURFACE_PAN_LEFT: "jtk-surface-pan-left",
		SURFACE_PAN_TOP: "jtk-surface-pan-top",
		SURFACE_PAN_RIGHT: "jtk-surface-pan-right",
		SURFACE_PAN_BOTTOM: "jtk-surface-pan-bottom",
		SURFACE_PAN_ACTIVE: "jtk-surface-pan-active",
		SURFACE_SELECTED_ELEMENT: "jtk-surface-selected-element",
		SURFACE_SELECTED_CONNECTION: "jtk-surface-selected-connection",
		SURFACE_PANNING: "jtk-surface-panning",
		SURFACE_ELEMENT_DRAGGING: "jtk-surface-element-dragging",
		SURFACE_DROPPABLE_NODE: "jtk-surface-droppable-node",
		TOOLBAR: "jtk-toolbar",
		TOOLBAR_TOOL: "jtk-tool",
		TOOLBAR_TOOL_SELECTED: "jtk-tool-selected",
		TOOLBAR_TOOL_ICON: "jtk-tool-icon"
	},
	this.jsPlumbToolkit.Constants = {
		click: "click",
		start: "start",
		stop: "stop",
		drop: "drop",
		disabled: "disabled",
		pan: "pan",
		select: "select",
		drag: "drag",
		left: "left",
		right: "right",
		top: "top",
		bottom: "bottom",
		width: "width",
		height: "height",
		leftmin: "leftmin",
		leftmax: "leftmax",
		topmin: "topmin",
		topmax: "topmax",
		min: "min",
		max: "max",
		nominalSize: "50px",
		px: "px",
		onepx: "1px",
		nopx: "0px",
		em: "em",
		absolute: "absolute",
		relative: "relative",
		none: "none",
		block: "block",
		hidden: "hidden",
		div: "div",
		id: "id",
		plusEquals: "+=",
		minusEquals: "-=",
		dot: ".",
		transform: "transform",
		transformOrigin: "transform-origin",
		nodeType: "Node",
		portType: "Port",
		edgeType: "Edge",
		groupType: "Group",
		surfaceNodeDragScope: "surfaceNodeDrag",
		mistletoeLayoutType: "Mistletoe",
		surfaceType: "Surface",
		jtkStatePrefix: "jtk-state-",
		msgCannotSaveState: "Cannot save state",
		msgCannotRestoreState: "Cannot restore state"
	},
	this.jsPlumbToolkit.Attributes = {
		jtkNodeId: "jtk-node-id",
		relatedNodeId: "related-node-id"
	},
	this.jsPlumbToolkit.Methods = {
		addClass: "addClass",
		removeClass: "removeClass"
	},
	this.jsPlumbToolkit.Events = {
		beforeDrop: "beforeDrop",
		beforeDetach: "beforeDetach",
		click: "click",
		canvasClick: "canvasClick",
		canvasDblClick: "canvasDblClick",
		connection: "connection",
		connectionAborted: "connectionAborted",
		connectionDetached: "connectionDetached",
		connectionMoved: "connectionMoved",
		connectionDragStop: "connectionDragStop",
		contentDimensions: "contentDimensions",
		contextmenu: "contextmenu",
		dataLoadStart: "dataLoadStart",
		dataAppendStart: "dataAppendStart",
		dataLoadEnd: "dataLoadEnd",
		dataAppendEnd: "dataAppendEnd",
		dblclick: "dblclick",
		drag: "drag",
		drop: "drop",
		dragover: "dragover",
		dragend: "dragend",
		edgeAdded: "edgeAdded",
		edgeRemoved: "edgeRemoved",
		edgeTypeChanged: "edgeTypeChanged",
		elementDragged: "elementDragged",
		elementAdded: "elementAdded",
		elementRemoved: "elementRemoved",
		endOverlayAnimation: "endOverlayAnimation",
		graphCleared: "graphCleared",
		groupAdded: "groupAdded",
		groupDragStop: "groupDragStop",
		groupExpand: "group:expand",
		groupCollapse: "group:collapse",
		groupRemoved: "groupRemoved",
		groupMemberAdded: "group:addMember",
		groupMemberRemoved: "group:removeMember",
		groupMoveEnd: "groupMoveEnd",
		groupUpdated: "groupUpdated",
		modeChanged: "modeChanged",
		mousedown: "mousedown",
		mousemove: "mousemove",
		mouseout: "mouseout",
		mouseup: "mouseup",
		mouseenter: "mouseenter",
		mouseleave: "mouseleave",
		mouseover: "mouseover",
		nodeAdded: "nodeAdded",
		nodeDropped: "nodeDropped",
		nodeMoveStart: "nodeMoveStart",
		nodeMoveEnd: "nodeMoveEnd",
		nodeRemoved: "nodeRemoved",
		edgeTarget: "edgeTarget",
		nodeTypeChanged: "nodeTypeChanged",
		edgeSource: "edgeSource",
		objectRepainted: "objectRepainted",
		pan: "pan",
		portAdded: "portAdded",
		portRemoved: "portRemoved",
		portTypeChanged: "portTypeChanged",
		redraw: "redraw",
		start: "start",
		startOverlayAnimation: "startOverlayAnimation",
		stateRestored: "stateRestored",
		stop: "stop",
		tap: "tap",
		touchend: "touchend",
		touchmove: "touchmove",
		touchstart: "touchstart",
		unload: "unload",
		portRefreshed: "portRefreshed",
		nodeRefreshed: "nodeRefreshed",
		edgeRefreshed: "edgeRefreshed",
		nodeRendered: "nodeRendered",
		nodeUpdated: "nodeUpdated",
		portUpdated: "portUpdated",
		edgeUpdated: "edgeUpdated",
		zoom: "zoom",
		relayout: "relayout",
		deselect: "deselect",
		selectionCleared: "selectionCleared",
		resize: "resize",
		anchorChanged: "anchorChanged"
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this;
	a.jsPlumbToolkit.util = {
		Cookies: {
			get: function(a) {
				document.cookie.match(new RegExp(a + "=[a-zA-Z0-9.()=|%/_]+($|;)","g"));
				return val && 0 != val.length ? unescape(val[0].substring(a.length + 1, val[0].length).replace(";", "")) || null : null
			},
			set: function(a, b, c, d) {
				var e = [a + "=" + escape(b), "/", window.location.host]
				  , f = function() {
					if ("NaN" == parseInt(d))
						return "";
					var a = new Date;
					return a.setTime(a.getTime() + 60 * parseInt(d) * 60 * 1e3),
					a.toGMTString()
				};
				return d && e.push(f(d)),
				document.cookie = e.join("; ")
			},
			unset: function(b, c, d) {
				c = c && "string" == typeof c ? c : "",
				d = d && "string" == typeof d ? d : "",
				a.jsPlumbToolkit.util.Cookies.get(b) && a.jsPlumbToolkit.util.Cookies.set(b, "", "Thu, 01-Jan-70 00:00:01 GMT", c, d)
			}
		},
		Storage: {
			set: function(b, c) {
				"undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.set(b, c) : localStorage.setItem(b, c)
			},
			get: function(b) {
				return "undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.read(b) : localStorage.getItem(b)
			},
			clear: function(b) {
				"undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.unset(b) : localStorage.removeItem(b)
			},
			clearAll: function() {
				if ("undefined" == typeof localStorage)
					;
				else
					for (; localStorage.length > 0; ) {
						var a = localStorage.key(0);
						localStorage.removeItem(a)
					}
			},
			setJSON: function(b, c) {
				if ("undefined" == typeof JSON)
					throw new TypeError("JSON undefined. Cannot store value.");
				a.jsPlumbToolkit.util.Storage.set(b, JSON.stringify(c))
			},
			getJSON: function(b) {
				if ("undefined" == typeof JSON)
					throw new TypeError("JSON undefined. Cannot retrieve value.");
				return JSON.parse(a.jsPlumbToolkit.util.Storage.get(b))
			}
		}
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbToolkit
	  , c = b
	  , d = a.jsPlumbUtil;
	c.Path = function(a, b) {
		this.bind = a.bind,
		this.getModel = a.getModel,
		this.setSuspendGraph = a.setSuspendGraph,
		this.getNodeId = a.getNodeId,
		this.getEdgeId = a.getEdgeId,
		this.getPortId = a.getPortId,
		this.getNodeType = a.getNodeType,
		this.getEdgeType = a.getEdgeType,
		this.getPortType = a.getPortType;
		for (var c = a.getGraph().findPath(b.source, b.target, b.strict, b.nodeFilter, b.edgeFilter), e = function() {
			for (var b = 0; b < c.path.length; b++)
				c.path[b].edge && a.removeEdge(c.path[b].edge);
			return this
		}
		.bind(this), f = function() {
			for (var b = 0; b < c.path.length; b++)
				a.removeNode(c.path[b].vertex);
			return this
		}
		.bind(this), g = function(b, d) {
			var e = a.findGraphObject(b)
			  , f = !1;
			if (e)
				for (var g = 0; g < c.path.length; g++)
					if (c.path[g].vertex == e || c.path[g].edge == e || !d && "Port" == c.path[g].vertex.objectType && c.path[g].vertex.isChildOf(e)) {
						f = !0;
						break
					}
			return f
		}, h = [], i = {}, j = 0; j < c.path.length; j++)
			h.push(c.path[j].vertex),
			i[a.getNodeId(c.path[j].vertex)] = [c.path[j].vertex, j];
		this.getNodes = function() {
			return h
		}
		,
		this.getNode = function(a) {
			return i["string" == typeof a ? a : a.id][0]
		}
		,
		this.getAllEdgesFor = function(a) {
			var b = i[a.id][1];
			return b < c.path.length - 1 ? [c.path[b + 1].edge] : []
		}
		;
		var k = function(a, b) {
			for (var e = b || 0; e < c.path.length; e++)
				try {
					a(e, c.path[e])
				} catch (f) {
					d.log("Path iterator function failed", f)
				}
		};
		this.each = function(a) {
			k(function(b, c) {
				a(b, c)
			})
		}
		,
		this.eachNode = function(a) {
			k(function(b, c) {
				a(b, c.vertex)
			})
		}
		,
		this.eachEdge = function(a) {
			k(function(b, c) {
				a(b, c.edge)
			}, 1)
		}
		,
		this.getNodeCount = function() {
			return c.path.length
		}
		,
		this.getNodeAt = function(a) {
			return c.path[a].vertex
		}
		,
		this.getEdgeCount = function() {
			return 0 == c.path.length ? 0 : c.path.length - 1
		}
		,
		this.path = c,
		this.deleteEdges = e,
		this.deleteNodes = f,
		this.deleteAll = f,
		this.isEmpty = function() {
			return 0 == c.path.length
		}
		,
		this.getCost = function() {
			return c.pathDistance
		}
		,
		this.contains = g,
		this.exists = function() {
			return null != c.pathDistance
		}
		,
		this.selectEdges = function(a) {
			return _selectEdges(a, "getEdges", !1)
		}
		,
		this.selectAllEdges = function(a) {
			return _selectEdges(a, "getAllEdges", !0)
		}
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbToolkitIO = {}
	  , c = a.jsPlumbUtil
	  , d = a.jsPlumb
	  , e = function(a, b, c) {
		for (var d = a.nodes || [], e = a.edges || [], f = a.ports || [], g = a.groups || [], h = 0; h < g.length; h++)
			b.addGroup(g[h]);
		for (var i = 0; i < d.length; i++)
			b.addNode(d[i]);
		for (var j = 0; j < f.length; j++)
			if (f[j].nodeId) {
				var k = b.getNode(f[j].nodeId);
				if (null == k)
					throw new TypeError("Unknown node [" + f[j].nodeId + "]");
				k.addPort(f[j])
			}
		for (var l = 0; l < e.length; l++) {
			var m = {
				source: e[l].source,
				target: e[l].target,
				cost: e[l].cost || 1,
				directed: e[l].directed,
				data: e[l].data
			};
			e[l].geometry && (m.geometry = e[l].geometry),
			b.addEdge(m)
		}
	}
	  , f = function(a, b) {
		return a.getGraph().serialize()
	}
	  , g = function(a, b, c) {
		var d = function(a) {
			var c = b.addNode(a);
			if (a.children)
				for (var e = 0; e < a.children.length; e++) {
					var f = b.addNode(a.children[e]);
					b.addEdge({
						source: c,
						target: f
					}),
					d(a.children[e])
				}
		};
		d(a)
	};
	b.exporters = {
		json: f
	},
	b.parsers = {
		json: e,
		"hierarchical-json": g
	},
	b.managers = {
		json: {
			removeNode: function(a, b, d) {
				var e = d(b.data);
				c.removeWithFunction(a.nodes, function(a) {
					return a.id == e
				})
			},
			removeEdge: function(a, b, d) {
				var e = d(b.data);
				c.removeWithFunction(a.edges, function(a) {
					return a.data && a.data.id == e
				})
			},
			addNode: function(a, b, c) {
				a.nodes = a.nodes || [],
				a.nodes.push(b.data)
			},
			addEdge: function(a, b, c) {
				var d = {
					source: b.source.getFullId(),
					target: b.target.getFullId(),
					data: b.data || {}
				};
				a.edges = a.edges || [],
				a.edges.push(d)
			},
			addPort: function(a, b, c) {
				a.ports = a.ports || [];
				var e = d.extend({}, b.port.data || {});
				e.id = b.port.getFullId(),
				a.ports.push(e)
			},
			removePort: function(a, b, d) {
				var e = b.port.getFullId();
				c.removeWithFunction(a.ports, function(a) {
					return a.id == e
				})
			}
		}
	},
	b.parse = function(a, c, d, e) {
		var f = b.parsers[a];
		if (null == f)
			throw new Error("jsPlumb Toolkit - parse - [" + a + "] is an unsupported type");
		return f(c, d, e)
	}
	,
	b.exportData = function(a, c, d) {
		var e = b.exporters[a];
		if (null === e)
			throw new Error("jsPlumb Toolkit - exportData - [" + a + "]  is an unsupported type");
		return e(c, d)
	}
	,
	b.manage = function(a, c, d, e, f, g) {
		b.managers[d] && b.managers[d][a] && b.managers[d][a](c, e, f)
	}
	,
	"undefined" != typeof exports && (exports.jsPlumbToolkitIO = b)
}
.call("undefined" != typeof window ? window : this),
function() {
	var a = this
	  , b = a.jsPlumbToolkit
	  , c = b;
	c.Support = {
		ingest: function(c) {
			var d = c.jsPlumb || a.jsPlumb;
			if (!d.getContainer())
				throw new TypeError("No Container set on jsPlumb instance. Cannot continue.");
			var e = b.newInstance()
			  , f = d.select()
			  , g = {}
			  , h = function() {
				return "default"
			}
			  , i = c.idFunction || function(a) {
				return d.getId(a)
			}
			  , j = c.typeFunction || h
			  , k = c.idFunction || function(a) {
				return a.id
			}
			  , l = c.edgeTypeFunction || h
			  , m = c.render !== !1
			  , n = function(a) {
				var b = i(a)
				  , c = j(a)
				  , f = d.getId(a);
				null == g[f] && (g[f] = e.addNode({
					id: b,
					type: c
				}, null , !0),
				a.jtk = {
					node: g[f]
				})
			}
			  , o = function(a) {
				var b = g[a.sourceId]
				  , c = g[a.targetId]
				  , d = k(a)
				  , f = l(a);
				a.edge = e.addEdge({
					source: b,
					target: c,
					data: {
						id: d,
						type: f
					}
				}, null , !0)
			};
			if (c.nodeSelector)
				for (var p = d.getContainer().querySelectorAll(c.nodeSelector), q = 0; q < p.length; q++) {
					var r = d.getId(p[q]);
					n(p[q], r),
					d.manage(r, p[q])
				}
			var s = d.getManagedElements();
			for (var r in s)
				n(s[r].el, r);
			if (f.each(function(a) {
				o(a)
			}),
			m) {
				var t = a.jsPlumb.extend({}, c.renderParams || {});
				t.jsPlumbInstance = d,
				t.container = d.getContainer();
				var u = e.render(t);
				return u.ingest = function(a) {
					n(a),
					u.importNode(a, i(a))
				}
				,
				u
			}
			return e
		}
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbToolkit
	  , c = b.Layouts = {
		Decorators: {}
	}
	  , d = a.jsPlumbUtil
	  , e = function(a) {
		var b = 1 / 0
		  , c = 1 / 0
		  , d = -(1 / 0)
		  , e = -(1 / 0);
		for (var f in a)
			b = Math.min(b, a[f][0]),
			d = Math.max(d, a[f][0]),
			c = Math.min(c, a[f][1]),
			e = Math.max(e, a[f][1]);
		return [[b, c], [d, e], Math.abs(b - d), Math.abs(c - e)]
	}
	  , f = function(a, b, e) {
		if (null == a)
			return [];
		for (var f = [], g = function(a) {
			var f = "string" == typeof a ? a : a[0]
			  , g = c.Decorators[f]
			  , h = "string" == typeof a ? {} : a[1];
			return g ? new g(h,b,e) : (d.log("Decorator [" + f + "] nor registered on jsPlumbToolkit.Layouts.Decorators. Not fatal."),
			null )
		}, h = 0; h < a.length; h++) {
			var i = g(a[h]);
			i && f.push(i)
		}
		return f
	};
	c.AbstractLayout = function(b) {
		function c() {
			var a, c, d, e, f = function(a) {
				return [a.data.left, a.data.top]
			}, g = function(a, c) {
				return (b.locationFunction || f)(a)
			}, h = o.getGroupCount();
			for (c = 0; h > c; c++)
				for (e = o.getGroupAt(c),
				a = e.getVertices(),
				d = 0; d < a.length; d++) {
					var i = g(a[d]);
					H(a[d].id, i[0], i[1])
				}
		}
		b = b || {};
		var d = this
		  , g = function() {
			return {
				padding: [0, 0]
			}
		}
		  , h = function() {
			var b = a.jsPlumb.extend(g(), d.defaultParameters || {});
			a.jsPlumb.extend(b, j || {}),
			j = b
		}
		  , i = b.adapter
		  , j = b.parameters || {}
		  , k = b.getElementForNode
		  , l = a.Farahey.getInstance({
			getPosition: function(a) {
				var b = p[a.id];
				return {
					left: b[0],
					top: b[1]
				}
			},
			getSize: function(a) {
				return x[a.id]
			},
			getId: function(a) {
				return a.id
			},
			setPosition: function(a, b) {
				H(a.id, b.left, b.top)
			},
			padding: j.padding,
			filter: function(a) {
				return v[a] && v[a].group ? !1 : d.canMagnetize ? d.canMagnetize(a) : !0
			}
		})
		  , m = b.magnetized === !1 ? !1 : d.defaultMagnetized || b.magnetize === !0;
		this.decorators = f(b.decorators, b.adapter, b.container),
		this.adapter = b.adapter;
		var n = b.jsPlumb || a.jsPlumb
		  , o = b.jsPlumbToolkit
		  , p = {}
		  , q = []
		  , r = 1 / 0
		  , s = 1 / 0
		  , t = -(1 / 0)
		  , u = -(1 / 0)
		  , v = {}
		  , w = {}
		  , x = {}
		  , y = b.container
		  , z = n.getSize(y)
		  , A = b.width || z[0]
		  , B = b.height || z[1]
		  , C = !1
		  , D = function() {
			C = !1,
			r = 1 / 0,
			t = -(1 / 0),
			s = 1 / 0,
			u = -(1 / 0);
			for (var a = 0; a < d.decorators.length; a++)
				d.decorators[a].reset({
					remove: n.remove
				});
			p = {},
			q.splice(0),
			x = {},
			l.reset(),
			d.reset && d.reset()
		};
		this.getMagnetizedElements = function() {
			return l.getElements()
		}
		,
		this.magnetize = function(a) {
			a = a || {};
			var b = a.event ? "executeAtEvent" : a.origin ? "execute" : "executeAtCenter"
			  , c = a.event ? [a.event, a.options] : a.origin ? [a.origin, a.options] : [a.options];
			l[b].apply(l, c),
			L(n.repaintEverything)
		}
		,
		this.nodeAdded = function(a, b) {
			var c = b && b.position ? b.position : a.node.data && a.node.data.left && a.node.data.top ? a.node.data : d.adapter.getOffset(a.el);
			if (this._nodeAdded) {
				var e = this._nodeAdded(a, b);
				e && (c.left = e[0],
				c.top = e[1])
			}
			v[a.node.id] = a.node,
			H(a.node.id, c.left, c.top),
			E(a.node.id, a.el),
			l.addElement(a.node)
		}
		,
		this.nodeRemoved = function(a) {
			delete p[a],
			delete x[a],
			delete v[a],
			this._nodeRemoved && this._nodeRemoved(a),
			l.removeElement(b.node)
		}
		,
		this.groupAdded = function(a, b) {
			var c = b && b.position ? b.position : a.group.data && a.group.data.left && a.group.data.top ? a.group.data : d.adapter.getOffset(a.el);
			if (this._groupAdded) {
				var e = this._groupAdded(a, b);
				e && (c.left = e[0],
				c.top = e[1])
			}
			w[a.group.id] = a.group,
			H(a.group.id, c.left, c.top),
			E(a.group.id, a.el),
			l.addElement(a.group)
		}
		,
		this.groupRemoved = function(a) {
			delete p[a],
			delete x[a],
			delete w[a],
			this._groupRemoved && this._groupRemoved(a),
			l.removeElement(b.group)
		}
		;
		var E = function(a, b) {
			var c = x[a];
			return c || (b = b || k(a),
			null != b ? (c = n.getSize(b),
			x[a] = c) : c = [0, 0]),
			c
		}
		  , F = function(a, b, c, d) {
			var e = p[a];
			if (!e) {
				if (null != b && null != c)
					e = [b, c];
				else {
					if (d)
						return null ;
					e = [Math.floor(Math.random() * (A + 1)), Math.floor(Math.random() * (B + 1))]
				}
				H(a, e[0], e[1])
			}
			return e
		}
		  , G = function(a) {
			r = Math.min(r, a[0]),
			s = Math.min(s, a[1]),
			t = Math.max(t, a[0]),
			u = Math.max(u, a[1])
		}
		  , H = this.setPosition = function(a, b, c, e) {
			var f = p[a];
			f ? (f[0] = parseFloat(b),
			f[1] = parseFloat(c)) : (f = p[a] = [parseFloat(b), parseFloat(c)],
			q.push([f, a])),
			G(f),
			e && (v[a] && d._nodeMoved ? d._nodeMoved(a, b, c) : w[a] && d._groupMoved && d._groupMoved(a, b, c))
		}
		  , I = function(a, b, c) {
			b = b || 10,
			c = c || 10;
			var d = p[a];
			return d || (d = p[a] = []),
			d[0] = Math.floor(Math.random() * b),
			d[1] = Math.floor(Math.random() * c),
			G(d),
			d
		}
		  , J = function() {
			for (var a in p)
				console.log(a, p[a][0], p[a][1])
		}
		  , K = function(a, b) {
			var c = k(a);
			if (null != c) {
				var e = p[a];
				return d.adapter.setPosition(c, e[0], e[1], b),
				O[a] = [e[0], e[1]],
				e.concat(E(a))
			}
			return null
		}
		.bind(this)
		  , L = this.draw = function(a) {
			for (var b in p) {
				var c = K(b);
				null != c && (r = Math.min(c[0], r),
				s = Math.min(c[1], s),
				t = Math.max(c[0] + c[2], t),
				u = Math.max(c[1] + c[3], u))
			}
			for (var e = 0; e < d.decorators.length; e++)
				d.decorators[e].decorate({
					adapter: d.adapter,
					layout: d,
					append: function(a, b, c) {
						d.adapter.append(a, b, c, !0)
					},
					setAbsolutePosition: d.adapter.setAbsolutePosition,
					toolkit: o,
					jsPlumb: n,
					bounds: [r, s, t, u],
					floatElement: d.adapter.floatElement,
					fixElement: d.adapter.fixElement
				});
			a && a()
		}
		  , M = function(a) {
			console.log(a);
			var b = e(p, E, k);
			J(),
			console.log(b[0], b[1], b[2], b[3])
		};
		this.bb = M;
		var N = this.getPositions = function() {
			return p
		}
		  , O = (this.getPosition = function(a) {
			return p[a]
		}
		,
		{})
		  , P = (this.getSize = function(a) {
			return x[a]
		}
		,
		this.setSize = function(a, b) {
			x[a] = b
		}
		);
		this.begin = function(a, b) {}
		,
		this.end = function(a, b) {}
		;
		var Q = function(a) {
			if (null != o) {
				h(),
				l.setElements(i.getNodes()).addElements(i.getGroups(), !0),
				this.begin && this.begin(o, j);
				for (var b = function() {
					L(function() {
						m && d.magnetize(),
						d.end && d.end(o, j),
						a && a()
					})
				}; !C; )
					this.step(o, j);
				b()
			}
		}
		.bind(this);
		return this.relayout = function(a, b) {
			D(),
			null != a && (j = a),
			Q(b)
		}
		,
		this.layout = function(a) {
			C = !1,
			Q(a)
		}
		,
		this.clear = function() {
			D()
		}
		,
		{
			adapter: b.adapter,
			jsPlumb: n,
			toolkit: o,
			getPosition: F,
			setPosition: H,
			getRandomPosition: I,
			getSize: E,
			setSize: P,
			getPositions: N,
			setPositions: function(a) {
				p = a
			},
			width: A,
			height: B,
			reset: D,
			draw: L,
			setDone: function(a) {
				C = a,
				c()
			}
		}
	}
	,
	c.EmptyLayout = function(a) {
		var b = {};
		this.refresh = this.relayout = this.layout = function() {
			this.clear();
			for (var c = a.getNodeCount(), d = 0; c > d; d++) {
				var e = a.getNodeAt(d);
				b[e.getFullId()] = [0, 0]
			}
			for (c = a.getGroupCount(),
			d = 0; c > d; d++)
				e = a.getGroupAt(d),
				b[e.id] = [0, 0]
		}
		,
		this.nodeRemoved = this.groupRemoved = function(a) {
			delete b[a.id]
		}
		,
		this.nodeAdded = this.groupAdded = function(a) {
			b[a.id] = !1
		}
		,
		this.getPositions = function() {
			return b
		}
		,
		this.getPosition = function(a) {
			return b[a]
		}
		,
		this.setPosition = function(a, c, d) {
			b[a] = [c, d]
		}
		,
		this.clear = function() {}
		,
		this.getMagnetizedElements = function() {
			return []
		}
	}
	,
	c.Mistletoe = function(b) {
		if (!b.parameters.layout)
			throw "No layout specified for MistletoeLayout";
		var e = {}
		  , f = a.jsPlumb.extend({}, b);
		f.getElementForNode = function(a) {
			return e[a]
		}
		;
		var g, h, i, j = c.AbstractLayout.apply(this, [f]), k = b.parameters.layout, l = function() {
			j.setPositions(k.getPositions()),
			j.draw(),
			this.fire("redraw")
		}
		.bind(this);
		d.EventGenerator.apply(this, arguments),
		this.map = function(a, b) {
			e[a] = b
		}
		;
		var m = function() {
			e = {},
			g = k.layout,
			h = k.relayout,
			i = k.clear,
			k.layout = function() {
				g.apply(k, arguments),
				l()
			}
			,
			k.relayout = function() {
				j.reset(),
				h.apply(k, arguments),
				l()
			}
			,
			k.clear = function() {
				i.apply(k, arguments),
				j.reset()
			}
		};
		m(),
		this.setHostLayout = function(a) {
			k = a,
			m()
		}
	}
	;
	var g = c.AbsoluteBackedLayout = function(a) {
		a = a || {};
		var b = c.AbstractLayout.apply(this, arguments)
		  , d = function(a) {
			return [a.data.left, a.data.top]
		}
		  , e = function(b, c) {
			return (a.locationFunction || d)(b)
		}
		  , f = function(a, c, d, f) {
			for (var g = b.adapter[a](), h = 0; g > h; h++) {
				var i = b.adapter[c](h)
				  , j = i.getFullId()
				  , k = b.getPosition(j, null , null , !0);
				null == k && (k = e(i, f)),
				this.setPosition(j, k[0], k[1], !0)
			}
		}
		.bind(this);
		return this.begin = function(a, b) {
			f("getNodeCount", "getNodeAt", a, b),
			f("getGroupCount", "getGroupAt", a, b)
		}
		,
		this._nodeAdded = function(b, c) {
			return e(b.node, a.parameters || {})
		}
		,
		this._groupAdded = function(b, c) {
			return e(b.group, a.parameters || {})
		}
		,
		this.getAbsolutePosition = function(a, b) {
			return e(a, b)
		}
		,
		this.step = function() {
			b.setDone(!0)
		}
		,
		b
	}
	;
	d.extend(g, c.AbstractLayout),
	c.Absolute = function(a) {
		c.AbsoluteBackedLayout.apply(this, arguments)
	}
	,
	d.extend(c.Absolute, c.AbsoluteBackedLayout);
	var h = c.AbstractHierarchicalLayout = function(a) {
		var b = this
		  , d = c.AbstractLayout.apply(this, arguments);
		return b.begin = function(b, c) {
			c.ignoreLoops = !(a.ignoreLoops === !1),
			c.getRootNode = c.getRootNode || function(b) {
				return a.multipleRoots !== !1 ? b.filter(function(a) {
					return "Node" === a.objectType && 0 == a.getTargetEdges().length && null == a.group || "Group" === a.objectType && 0 == a.getTargetEdges().length
				}).getAll() : d.adapter.getNodeCount() > 0 ? d.adapter.getNodeAt(0) : null
			}
			,
			c.getChildEdges = c.getChildEdges || function(b, c) {
				return d.toolkit.getAllEdgesFor(b, function(c) {
					return c.source === b || a.ignorePorts !== !0 && c.source.getNode && c.source.getNode() === b
				})
			}
			,
			c.rootNode = c.getRootNode(b),
			c.rootNode || d.setDone(!0)
		}
		,
		d
	}
	;
	d.extend(h, c.AbstractLayout)
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbToolkit
	  , c = b.Layouts
	  , d = a.Farahey;
	c.Circular = function(a) {
		function b(a) {
			for (var b = [], c = 0; c < a.length; c++)
				a[c].group || b.push(a[c]);
			return b
		}
		a = a || {};
		var e = c.AbstractLayout.apply(this, arguments);
		this.defaultParameters = {
			padding: 30,
			locationFunction: a.locationFunction
		},
		this.step = function(a, c) {
			var f = [];
			if (Array.prototype.push.apply(f, b(e.adapter.getNodes())),
			Array.prototype.push.apply(f, e.adapter.getGroups()),
			0 === f.length)
				return void e.setDone(!0);
			var g, h, i = 0, j = 0, k = 10, l = 2 * Math.PI / f.length, m = -Math.PI / 2;
			for (g = 0; g < f.length; g++)
				if (h = f[g],
				e.setPosition(h.id, i + Math.sin(m) * k, j + Math.cos(m) * k, !0),
				m += l,
				g > 0) {
					var n = f[g - 1]
					  , o = e.getSize(n.id)
					  , p = e.getPosition(n.id)
					  , q = {
						x: p[0] - c.padding,
						y: p[1] - c.padding,
						w: o[0] + 2 * c.padding,
						h: o[1] + 2 * c.padding
					}
					  , r = f[g]
					  , s = e.getSize(r.id)
					  , t = e.getPosition(r.id)
					  , u = {
						x: t[0] - c.padding,
						y: t[1] - c.padding,
						w: s[0] + 2 * c.padding,
						h: s[1] + 2 * c.padding
					}
					  , v = d.calculateSpacingAdjustment(q, u)
					  , w = [p[0] + o[0] / 2, p[1] + o[1] / 2]
					  , x = [t[0] + v.left + s[0] / 2, t[1] + v.top + +(s[1] / 2)]
					  , y = Math.sqrt(Math.pow(w[0] - x[0], 2) + Math.pow(w[1] - x[1], 2));
					k = Math.max(k, y / 2 / Math.sin(l / 2))
				}
			for (g = 0; g < f.length; g++)
				h = f[g],
				e.setPosition(h.id, i + Math.sin(m) * k, j + Math.cos(m) * k, !0),
				m += l;
			e.setDone(!0)
		}
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbToolkit
	  , c = b.Layouts
	  , d = a.jsPlumbUtil;
	c.Hierarchical = function(a) {
		var b, e, f, g, h, i, j, k = c.AbstractHierarchicalLayout.apply(this, arguments), l = [], m = null != a.parameters ? a.parameters.compress : !1, n = [], o = [], p = k.toolkit.getNodeId, q = function(a) {
			var b = n[a];
			return b || (b = {
				nodes: [],
				pointer: 0
			},
			n[a] = b),
			b
		}, r = function(a, b, c, d, e) {
			var g = q(c)
			  , i = {
				node: a,
				parent: d,
				childGroup: e,
				loc: g.pointer,
				index: g.nodes.length,
				dimensions: b,
				size: b[f]
			}
			  , j = b[0 == f ? 1 : 0];
			return null == l[c] ? l[c] = j : l[c] = Math.max(l[c], j),
			g.pointer += b[f] + h[f],
			g.nodes.push(i),
			i
		}, s = function(a, b) {
			var c = o[b];
			c || (c = [],
			o[b] = c),
			a.index = c.length,
			c.push(a)
		}, t = function(a) {
			if (a.size > 0) {
				var b = a.parent.loc + a.parent.size / 2 - (a.size - h[f]) / 2
				  , c = o[a.depth]
				  , d = -(1 / 0)
				  , e = 0;
				if (null != c && c.length > 0) {
					var g = c[c.length - 1]
					  , i = g.nodes[g.nodes.length - 1];
					d = i.loc + i.size + h[f]
				}
				b >= d ? a.loc = b : (e = d - b,
				a.loc = d);
				for (var j = a.loc, k = 0; k < a.nodes.length; k++)
					a.nodes[k].loc = j,
					j += a.nodes[k].size,
					j += h[f];
				e > 0 && v(a),
				s(a, a.depth)
			}
		}, u = function(a) {
			var b = a.nodes[0].loc
			  , c = a.nodes[a.nodes.length - 1].loc + a.nodes[a.nodes.length - 1].size
			  , d = (b + c) / 2
			  , e = d - a.parent.size / 2
			  , f = e - a.parent.loc;
			if (a.parent.loc = e,
			!a.parent.root)
				for (var g = a.parent.childGroup, h = a.parent.childGroupIndex + 1; h < g.nodes.length; h++)
					g.nodes[h].loc += f
		}, v = function(a) {
			for (var b = a; null != b; )
				u(b),
				b = b.parent.childGroup
		}, w = function(a, b) {
			return b.source === a || b.source.getNode && b.source.getNode() === a
		}, x = function(a, b) {
			if (!i[a.node.id]) {
				i[a.node.id] = !0;
				var c, d = j(a.node, k.toolkit), e = {
					nodes: [],
					loc: 0,
					size: 0,
					parent: a,
					depth: b + 1
				}, g = [], l = {};
				for (c = 0; c < d.length; c++) {
					var m = w(a.node, d[c]) ? d[c].target : d[c].source;
					if (m.getNode && (m = m.getNode()),
					m = k.toolkit.getNode(m),
					null != m && m !== a.node && !l[m.id]) {
						var n = k.getSize(p(m))
						  , o = r(m, n, b + 1, a, e);
						o.childGroupIndex = e.nodes.length,
						e.nodes.push(o),
						e.size += n[f] + h[f],
						g.push(o),
						l[m.id] = !0
					}
				}
				for (t(e),
				c = 0; c < g.length; c++)
					x(g[c], b + 1)
			}
		};
		this.defaultParameters = {
			padding: [60, 60],
			orientation: "horizontal",
			border: 0,
			locationFunction: a.locationFunction
		};
		var y = this.begin;
		this.begin = function(a, c) {
			y.apply(this, arguments),
			b = c.orientation,
			e = "horizontal" === b,
			f = e ? 0 : 1,
			g = e ? "width" : "height",
			h = c.padding,
			n.length = 0,
			o.length = 0,
			i = {},
			j = c.getChildEdges
		}
		,
		this.step = function(a, b) {
			for (var c, e, g, i = d.isArray(b.rootNode) ? b.rootNode : [b.rootNode], j = 0; j < i.length; j++) {
				c = i[j];
				var o = k.getSize(c.id)
				  , q = r(c, o, 0, null , null );
				q.root = !0,
				x(q, 0, null );
				var s, t, u = 0, v = function(a, b) {
					var c = 0 == f ? 1 : 0;
					return m && a.parent ? k.getPosition(p(a.parent.node))[c] + a.parent.dimensions[c] + h[c] : b
				};
				for (e = 0; e < n.length; e++) {
					for (n[e].otherAxis = u,
					g = 0; g < n[e].nodes.length; g++)
						s = 0 == f ? n[e].nodes[g].loc : v(n[e].nodes[g], u),
						n[e].nodes[g].parent && k.getPosition(p(n[e].nodes[g].parent.node)),
						t = 1 == f ? n[e].nodes[g].loc : v(n[e].nodes[g], u),
						k.setPosition(p(n[e].nodes[g].node), s, t, !0);
					n[e].otherAxisSize = l[e] + h[0 == f ? 1 : 0],
					u += n[e].otherAxisSize
				}
			}
			k.setDone(!0)
		}
		,
		this.getHierarchy = function() {
			return n
		}
		,
		this.getOrientation = function() {
			return b
		}
		;
		var z = this.nodeRemoved;
		this.nodeRemoved = function() {
			n = [],
			z.apply(this, arguments)
		}
		,
		this.getPadding = function() {
			return h
		}
	}
	,
	d.extend(c.Hierarchical, c.AbstractHierarchicalLayout)
}
.call("undefined" != typeof window ? window : this),
function() {
	var a = this
	  , b = a.jsPlumbToolkit;
	b.Layouts.Decorators.Hierarchy = function(a) {
		var b, c, d = [];
		this.reset = function(a) {
			for (var c = 0; c < d.length; c++)
				a.remove(d[c]);
			b && a.remove(b),
			d.length = 0
		}
		,
		this.decorate = function(a) {
			if (a.bounds[0] != 1 / 0) {
				var b = a.layout.getHierarchy();
				c = (a.layout.getPadding() || [60, 60])["horizontal" === d ? 0 : 1];
				for (var d = a.layout.getOrientation(), e = "horizontal" === d ? ["width", "height", a.bounds[2] - a.bounds[0]] : ["height", "width", a.bounds[3] - a.bounds[1]], f = 0; f < b.length; f++) {
					var g = document.createElement("div");
					a.append(g),
					g.className = "level " + (f % 2 ? "odd" : "even"),
					g.style[e[0]] = e[2] + 2 * c + "px",
					g.style[e[1]] = b[f].otherAxisSize + "px";
					var h = "horizontal" === d ? [a.bounds[0] - c, b[f].otherAxis - c / 2] : [b[f].otherAxis - c / 2, a.bounds[1] - c];
					a.setAbsolutePosition(g, h)
				}
			}
		}
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbToolkit
	  , c = b.Layouts
	  , d = a.jsPlumbUtil;
	c.Spring = function(a) {
		this.defaultMagnetized = !0;
		var b = c.AbsoluteBackedLayout.apply(this, arguments);
		this.defaultParameters = {
			padding: [50, 50],
			iterations: 500,
			maxRepulsiveForceDistance: 6,
			k: 2,
			c: .01,
			maxVertexMovement: .5,
			locationFunction: a.locationFunction
		};
		var d, e = this.defaultParameters, f = {}, g = a.absoluteBacked !== !1, h = 0, i = 1 / 0, j = -(1 / 0), k = 1 / 0, l = -(1 / 0), m = 1, n = 1, o = 0, p = function(a) {
			a.getNode && (a = a.getNode());
			var c = f[a.id];
			if (!c) {
				var d = b.getRandomPosition(a.id, .5, .5);
				c = f[a.id] = {
					id: a.id,
					n: a,
					sp: d,
					p: [d[0], d[1]],
					f: [0, 0]
				}
			}
			return c
		}, q = function(a, b, c) {
			i = Math.min(i, b),
			k = Math.min(k, c),
			j = Math.max(j, b),
			l = Math.max(l, c),
			a.p[0] = b,
			a.p[1] = c
		}, r = function(a, b) {
			if (!a.locked || !b.locked) {
				var c = b.p[0] - a.p[0]
				  , d = b.p[1] - a.p[1]
				  , f = c * c + d * d;
				.01 > f && (c = .1 * Math.random() + .1,
				d = .1 * Math.random() + .1,
				f = c * c + d * d);
				var g = Math.sqrt(f);
				if (g < e.maxRepulsiveForceDistance) {
					o++;
					var h = e.k * e.k / g
					  , i = h * c / g
					  , j = h * d / g;
					b.f[0] += b.locked ? 0 : (a.locked ? 2 : 1) * i,
					b.f[1] += b.locked ? 0 : (a.locked ? 2 : 1) * j,
					a.f[0] -= a.locked ? 0 : (b.locked ? 2 : 1) * i,
					a.f[1] -= a.locked ? 0 : (b.locked ? 2 : 1) * j
				}
			}
		}, s = function(a, b) {
			var c = p(b.target);
			if (!a.locked || !c.locked) {
				o++;
				var d = c.p[0] - a.p[0]
				  , f = c.p[1] - a.p[1]
				  , g = d * d + f * f;
				.01 > g && (d = .1 * Math.random() + .1,
				f = .1 * Math.random() + .1,
				g = d * d + f * f);
				var h = Math.sqrt(g);
				h > e.maxRepulsiveForceDistance && (h = e.maxRepulsiveForceDistance,
				g = h * h);
				var i = (g - e.k * e.k) / e.k;
				(void 0 == b.weight || b.weight < 1) && (b.weight = 1),
				i *= .5 * Math.log(b.weight) + 1;
				var j = i * d / h
				  , k = i * f / h;
				c.f[0] -= c.locked ? 0 : (a.locked ? 2 : 1) * j,
				c.f[1] -= c.locked ? 0 : (a.locked ? 2 : 1) * k,
				a.f[0] += a.locked ? 0 : (c.locked ? 2 : 1) * j,
				a.f[1] += a.locked ? 0 : (c.locked ? 2 : 1) * k
			}
		}, t = function() {
			m = b.width / (j - i) * .62,
			n = b.height / (l - k) * .62;
			for (var a in f) {
				var c = f[a];
				c.locked || (c.sp = v(c.p),
				b.setPosition(c.id, c.sp[0], c.sp[1], !0))
			}
		}, u = function(a) {
			return [i + (a[0] - .19 * b.width) / m, k + (a[1] - .19 * b.height) / n]
		}, v = function(a) {
			return [.19 * b.width + (a[0] - i) * m, .19 * b.height + (a[1] - k) * n]
		};
		this._nodeMoved = this._groupMoved = function(a, b, c) {
			var d = f[a];
			d && (d.sp = [b, c],
			d.p = u(d.sp))
		}
		,
		this.canMagnetize = function(a) {
			return f[a] && f[a].locked !== !0
		}
		,
		this.reset = function() {
			f = {},
			h = 0,
			i = k = 1 / 0,
			j = l = -(1 / 0)
		}
		,
		this._nodeRemoved = this._groupRemoved = function(a) {
			delete f[a]
		}
		,
		this._nodeAdded = this._groupAdded = function(a, c) {
			if (c && c.position) {
				var d = p(a.node || a.group);
				d && (d.locked = !0,
				b.setPosition(d.id, c.position.left, c.position.top, !0))
			}
		}
		,
		this.begin = function(a, c) {
			h = 0,
			d = [],
			Array.prototype.push.apply(d, b.adapter.getNodes()),
			Array.prototype.push.apply(d, b.adapter.getGroups())
		}
		,
		this.step = function(a, c) {
			var f, i = [], j = function(a) {
				return i[a] ? i[a] : function() {
					return i[a] = p(d[a]),
					i[a]
				}()
			};
			for (o = 0,
			f = 0; f < d.length; f++) {
				var k = j(f);
				if (!k.group) {
					if (g && !k.locked) {
						var l = this.getAbsolutePosition(k.n, c);
						if (null != l && 2 == l.length && !isNaN(l[0]) && !isNaN(l[1])) {
							q(k, l[0], l[1]),
							k.sp = k.p,
							b.setPosition(k.id, l[0], l[1], !0),
							k.locked = !0;
							continue
						}
					}
					for (var m = f + 1; m < d.length; m++) {
						var n = j(m);
						r(k, n)
					}
					for (var u = b.toolkit.getAllEdgesFor(k.n), v = 0; v < u.length; v++)
						s(k, u[v])
				}
			}
			if (0 != o)
				for (f = 0; f < d.length; f++) {
					var w = j(f);
					if (!w.group) {
						var x = e.c * w.f[0]
						  , y = e.c * w.f[1]
						  , z = e.maxVertexMovement;
						x > z && (x = z),
						-z > x && (x = -z),
						y > z && (y = z),
						-z > y && (y = -z),
						q(w, w.p[0] + x, w.p[1] + y),
						w.f[0] = 0,
						w.f[1] = 0
					}
				}
			h++,
			(0 == o || h >= e.iterations) && (t(),
			b.setDone(!0))
		}
		,
		this.end = function() {
			for (var a in f)
				f[a].locked = !0
		}
	}
	,
	d.extend(c.Spring, c.AbsoluteBackedLayout)
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = (a.jsPlumb,
	a.jsPlumbToolkit);
	b.UI = b.UI || {};
	var c = b.UI;
	c.ActiveDragFilter = function(a, b, c) {
		var d = {};
		b.bind("connectionDrag", function(b) {
			function e(b, e) {
				f = c.beforeConnect(b, e),
				j = e.getFullId(),
				f === !1 && null == d[j] && (d[j] = a.setTargetEnabled(e, !1))
			}
			var f, g, h, i, j, k = b.source.jtk.port, l = k ? k.getNode() : b.source.jtk.node, m = c.getNodeCount();
			if (k)
				for (e(k, l),
				g = l.getPorts(),
				h = 0; h < g.length; h++)
					e(k, g[h]);
			for (h = 0; m > h; h++) {
				var n = c.getNodeAt(h);
				for (e(k, n),
				g = n.getPorts(),
				i = 0; i < g.length; i++)
					e(k, g[i])
			}
		}),
		b.bind("connectionDragStop", function() {
			function b(b) {
				d[b.getFullId()] === !0 && a.setTargetEnabled(b, !0)
			}
			for (var e = c.getNodeCount(), f = 0; e > f; f++) {
				var g = c.getNodeAt(f);
				b(g);
				for (var h = g.getPorts(), i = 0; i < h.length; i++)
					b(h[i])
			}
			d = {}
		})
	}
}
.call(this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbToolkit.Renderers
	  , c = a.jsPlumbToolkit
	  , d = a.jsPlumbToolkitUtil
	  , e = a.jsPlumbUtil
	  , f = a.jsPlumb
	  , g = a.Rotors;
	c.UIState = function(a, b, c) {
		for (var d in b)
			if (b.hasOwnProperty(d)) {
				var e = "*" === d ? "e-state-" + a : "e-state-" + a + "-" + d
				  , f = "*" === d ? "c-state-" + a : "c-state-" + a + "-" + d;
				c.registerEndpointType(e, b[d]),
				c.registerConnectionType(f, b[d])
			}
		this.activate = function(d, e, f) {
			d.eachEdge(function(c, d) {
				var h = e.getRenderedConnection(d.getId())
				  , i = f.getEdgeType(d.data)
				  , j = i ? "c-state-" + a + "-" + i : null ;
				j && h.addType(j, d.data),
				b["*"] && h.addType("c-state-" + a, d.data),
				g(d, h, d.source, 0, "addType", f),
				g(d, h, d.target, 1, "addType", f)
			}),
			d.eachNode(function(a, d) {
				var g = f.getNodeType(d.data)
				  , h = g ? b[g] : null
				  , i = e.getRenderedNode(d.id);
				h && h.cssClass && c.addClass(i, h.cssClass),
				b["*"] && c.addClass(i, b["*"].cssClass)
			})
		}
		;
		var g = function(b, c, d, e, f, g) {
			var h = c.endpoints[e]
			  , i = g.getPortType(d.data);
			h[f]("e-state-" + a + "-" + i),
			h[f]("e-state-" + a)
		};
		this.deactivate = function(d, e, f) {
			d.eachEdge(function(c, d) {
				var h = e.getRenderedConnection(d.getId())
				  , i = f.getEdgeType(d.data)
				  , j = i ? "c-state-" + a + "-" + i : null ;
				j && h.removeType(j, d.data),
				b["*"] && h.removeType("c-state-" + a),
				g(d, h, d.source, 0, "removeType", f),
				g(d, h, d.target, 1, "removeType", f)
			}),
			d.eachNode(function(a, d) {
				var g = f.getNodeType(d.data)
				  , h = g ? b[g] : null
				  , i = e.getRenderedNode(d.id);
				h && h.cssClass && c.removeClass(i, h.cssClass),
				b["*"] && c.removeClass(i, b["*"].cssClass)
			})
		}
	}
	;
	var h = b.atts = {
		NODE: "data-jtk-node-id",
		PORT: "data-jtk-port-id",
		GROUP: "data-jtk-group-id"
	}
	  , i = b.els = {
		SOURCE: "JTK-SOURCE",
		PORT: "JTK-PORT",
		TARGET: "JTK-TARGET"
	}
	  , j = c.Classes
	  , k = c.Constants
	  , l = c.Events;
	b.mouseEvents = ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave", "mouseover"],
	b.createElement = function(a, b) {
		var c = {
			width: a.width,
			height: a.height,
			position: a.position || k.absolute
		}
		  , d = {};
		a.display && (c.display = a.display),
		a.id && (d.id = a.id),
		a.top && (c.top = a.top + "px"),
		a.left && (c.left = a.left + "px"),
		a.right && (c.right = a.right + "px"),
		a.bottom && (c.bottom = a.bottom + "px");
		var e = f.createElement(a.type || k.div, c, a.clazz, d);
		return null != b && f.appendElement(e, b),
		e
	}
	;
	var m = b.DOMElementAdapter = function(a) {
		var b = this.getJsPlumb()
		  , c = b.getElement(a.container);
		this.getWidth = function() {
			return b.getSize(c)[0]
		}
		,
		this.getHeight = function() {
			return b.getSize(c)[1]
		}
		,
		this.append = function(a) {
			var d = b.getElement(a);
			b.appendElement(d, c)
		}
		,
		this.remove = function(a) {
			var c = b.getElement(a);
			b.removeElement(c)
		}
		,
		this.setAbsolutePosition = f.setAbsolutePosition,
		this.getOffset = function(a, c) {
			return b.getOffset(a, c)
		}
	}
	  , n = b.AbstractRenderer = function(a) {
		a = a || {};
		var b = function(a, b) {
			var c = f.createElement("div", {
				border: "1px solid #456",
				position: "absolute"
			}, j.NODE);
			return c.innerHTML = a.name || a.id,
			c
		}
		  , m = '<div data-jtk-node-id="${id}" class="' + j.NODE + '"></div>'
		  , n = {
			rotors: {
				render: function(a, b) {
					return p.template(a, b).childNodes[0]
				}
			}
		}
		  , o = "rotors"
		  , p = g.newInstance({
			defaultTemplate: m,
			templateResolver: a.templateResolver,
			templates: a.templates
		})
		  , q = this
		  , r = a.toolkit
		  , s = new c.Layouts.EmptyLayout(q)
		  , t = f.getElement(a.container)
		  , u = !(a.elementsDraggable === !1)
		  , v = a.elementsDroppable === !0
		  , w = !1
		  , x = a.refreshAutomatically !== !1
		  , y = a.templateRenderer ? e.isString(a.templateRenderer) ? n[a.templateRenderer] : {
			render: a.templateRenderer
		} : n[o]
		  , z = a.enhancedView !== !1
		  , A = a.assignPosse || function() {
			return null
		}
		  , B = a.modelLeftAttribute || "left"
		  , C = a.modelTopAttribute || "top"
		  , D = a.storePositionsInModel !== !1
		  , E = e.merge(a.jsPlumb || {})
		  , F = a.jsPlumbInstance || f.getInstance(E, a.overrideFns)
		  , G = F.getId(t);
		F.bind("beforeDrop", function(a) {
			var b = a.connection
			  , c = b.endpoints[0].graph || b.source.jtk
			  , d = b.endpoints[1].graph || b.target.jtk
			  , e = c.port || c.node
			  , f = d.port || d.node
			  , g = a.connection.edge;
			return null == g ? r.beforeConnect(e, f, a.connection.getData()) : r.beforeMoveConnection(e, f, g)
		}),
		F.bind("beforeDrag", function(a) {
			var b = a.endpoint.graph || a.source.jtk
			  , c = b.port || b.node
			  , d = a.endpoint.connectionType
			  , e = r.beforeStartConnect(c, d);
			return e === !1 && a.endpoint.isTemporarySource && a.endpoint._deleteOnDetach && F.deleteEndpoint(a.endpoint),
			e
		}),
		F.bind("beforeDetach", function(a, b) {
			var c = a.endpoints[0].graph || a.source.jtk
			  , d = a.endpoints[1].graph || a.target.jtk
			  , e = c.port || c.node
			  , f = d.port || d.node
			  , g = a.edge;
			return r.beforeDetach(e, f, g, b)
		}),
		F.bind("beforeStartDetach", function(a) {
			var b = a.endpoint.graph || a.source.jtk
			  , c = b.port || b.node
			  , d = a.connection.edge;
			return r.beforeStartDetach(c, d)
		}),
		F.bind("connectionEdit", function(a) {
			a.edge && (a.edge.geometry = a.getConnector().getGeometry())
		}),
		e.EventGenerator.apply(this, arguments),
		a.activeFiltering && new c.UI.ActiveDragFilter(q,F,r),
		this.getJsPlumb = function() {
			return F
		}
		,
		this.getToolkit = function() {
			return r
		}
		;
		var H = [l.canvasClick, l.canvasDblClick, l.nodeAdded, l.nodeDropped, l.nodeRemoved, l.nodeRendered, l.groupAdded, l.groupRemoved, l.groupMoveEnd, l.groupMemberAdded, l.groupMemberRemoved, l.groupCollapse, l.groupExpand, l.nodeMoveStart, l.nodeMoveEnd, l.portAdded, l.portRemoved, l.edgeAdded, l.edgeRemoved, l.edgeTypeChanged, l.nodeTypeChanged, l.portTypeChanged, l.dataLoadEnd, l.anchorChanged, l.objectRepainted, l.modeChanged, l.pan, l.zoom, l.relayout, l.click, l.tap, l.stateRestored, l.startOverlayAnimation, l.endOverlayAnimation]
		  , I = q.bind
		  , J = F.bind;
		if (this.setHoverSuspended = F.setHoverSuspended,
		this.isHoverSuspended = F.isHoverSuspended,
		this.setJsPlumbDefaults = function(a) {
			delete a.Container,
			F.restoreDefaults(),
			F.importDefaults(a)
		}
		,
		this.bind = function(a, b) {
			-1 == H.indexOf(a) ? J(a, b) : I(a, b)
		}
		,
		a.events)
			for (var K in a.events)
				this.bind(K, a.events[K]);
		if (a.interceptors)
			for (var L in a.interceptors)
				this.bind(L, a.interceptors[L]);
		var M = !1;
		J(l.connection, function(a) {
			if (null == a.connection.edge) {
				M = !0,
				a.sourceEndpoint.getParameter("nodeId") || a.sourceEndpoint.setParameter("nodeId", O[a.sourceEndpoint.elementId].id),
				a.targetEndpoint.getParameter("nodeId") || a.targetEndpoint.setParameter("nodeId", O[a.targetEndpoint.elementId].id);
				var b = a.sourceEndpoint.getParameter("portType")
				  , c = la.getPortDefinition(b)
				  , d = null != c && c.edgeType ? c.edgeType : a.sourceEndpoint.getParameter("edgeType") || "default"
				  , e = a.sourceEndpoint.getParameter("nodeId")
				  , f = a.sourceEndpoint.getParameter("portId")
				  , g = a.targetEndpoint.getParameter("nodeId")
				  , h = a.targetEndpoint.getParameter("portId")
				  , i = e + (f ? "." + f : "")
				  , j = g + (h ? "." + h : "")
				  , k = {
					sourceNodeId: e,
					sourcePortId: f,
					targetNodeId: g,
					targetPortId: h,
					type: d,
					source: r.getNode(i),
					target: r.getNode(j),
					sourceId: i,
					targetId: j
				}
				  , m = r.getEdgeFactory()(d, a.connection.getData() || {}, function(b) {
					k.edge = r.addEdge({
						source: i,
						target: j,
						cost: a.connection.getCost(),
						directed: a.connection.isDirected(),
						data: b,
						addedByMouse: !0
					}, q),
					W[k.edge.getId()] = a.connection,
					a.connection.edge = k.edge,
					$(d, k.edge, a.connection),
					k.addedByMouse = !0,
					q.fire(l.edgeAdded, k)
				});
				m === !1 && F.detach(a.connection),
				M = !1
			}
		}),
		J(l.connectionMoved, function(a) {
			var b = 0 == a.index ? a.newSourceEndpoint : a.newTargetEndpoint;
			M = !0,
			r.edgeMoved(a.connection.edge, b.element.jtk.port || b.element.jtk.node, a.index),
			M = !1
		}),
		J(l.connectionDetached, function(a) {
			M = !0,
			r.removeEdge(a.connection.edge),
			M = !1;
			var b = a.sourceEndpoint.getParameters()
			  , c = a.targetEndpoint.getParameters()
			  , d = b.nodeId + (b.portId ? "." + b.portId : "")
			  , e = c.nodeId + (c.portId ? "." + c.portId : "");
			q.fire(l.edgeRemoved, {
				sourceNodeId: b.nodeId,
				targetNodeId: c.nodeId,
				sourcePortId: b.portId,
				targetPortId: c.portId,
				sourceId: d,
				targetId: e,
				source: r.getNode(d),
				target: r.getNode(e),
				edge: a.connection.edge
			})
		}),
		J(l.groupDragStop, function(a) {
			q.getLayout().setPosition(a.group.id, a.pos[0], a.pos[1], !0),
			a.uigroup = a.group,
			q.fire(l.groupMoveEnd, f.extend(a, {
				group: r.getGroup(a.uigroup.id)
			}))
		}),
		J(l.groupMemberAdded, function(a) {
			if (!w && a.el.jtk.node) {
				var b = r.addToGroup(a.el.jtk.node, a.group.id, !0);
				b && q.fire(l.groupMemberAdded, {
					node: a.el.jtk.node,
					group: b,
					uigroup: a.group
				}),
				ga()
			}
		}),
		J(l.groupMemberRemoved, function(a) {
			if (!w && a.el.jtk.node) {
				var b = r.removeFromGroup(a.el.jtk.node);
				b && (q.nodeRemovedFromGroup(a.el),
				q.fire(l.groupMemberRemoved, {
					node: a.el.jtk.node,
					ugroup: b,
					igroup: a.group
				})),
				ga()
			}
		}),
		J(l.groupCollapse, function(a) {
			var b = r.getGroup(a.group.id);
			b && q.fire(l.groupCollapse, {
				group: b,
				uigroup: a.group
			})
		}),
		J(l.groupExpand, function(a) {
			var b = r.getGroup(a.group.id);
			b && q.fire(l.groupExpand, {
				group: b,
				uigroup: a.group
			})
		});
		var N = {}
		  , O = {}
		  , P = {}
		  , Q = {}
		  , R = []
		  , S = {}
		  , T = []
		  , U = function(a) {
			T.push(a)
		}
		  , V = function(a) {
			var b = T.indexOf(a);
			-1 != b && T.splice(b, 1)
		};
		this.getNodeCount = function() {
			return T.length
		}
		,
		this.getNodeAt = function(a) {
			return T[a]
		}
		,
		this.getNodes = function() {
			return T
		}
		,
		this.getNode = function(a) {
			return N[a]
		}
		,
		this.getGroupCount = function() {
			return R.length
		}
		,
		this.getGroupAt = function(a) {
			return R[a]
		}
		,
		this.getGroups = function() {
			return R
		}
		;
		var W = {}
		  , X = function(a) {
			return W[a.getId()]
		}
		  , Y = function(a) {
			for (var b = [], c = 0; c < a.length; c++)
				b.push(W[a[c].getId()]);
			return b
		}
		  , Z = function(a, b, c, d) {
			d.bind(a, function(a, e) {
				b.apply(b, [{
					edge: c,
					e: e,
					connection: d,
					toolkit: r,
					renderer: q
				}])
			})
		}
		  , $ = function(a, b, c) {
			if (!c.getParameter("edge")) {
				var d = la.getEdgeDefinition(a);
				if (d && d.events)
					for (var e in d.events)
						Z(e, d.events[e], b, c)
			}
		}
		  , _ = function(a, b) {
			var c = a.endpoints[0].getParameters()
			  , d = a.endpoints[1].getParameters()
			  , e = c.nodeId + (c.portId ? "." + c.portId : "")
			  , f = d.nodeId + (d.portId ? "." + d.portId : "");
			q.fire(l.edgeRemoved, {
				sourceNodeId: c.nodeId,
				targetNodeId: d.nodeId,
				sourcePortId: c.portId,
				targetPortId: d.portId,
				sourceId: e,
				targetId: f,
				source: r.getNode(e),
				target: r.getNode(f),
				edge: b
			})
		};
		this.setSuspendRendering = function(a, b) {
			w = a,
			F.setSuspendDrawing(a),
			b && this.refresh()
		}
		,
		this.batch = function(a) {
			this.setSuspendEvents(!0),
			r.batch(a),
			this.setSuspendEvents(!1)
		}
		;
		var aa = function(a, b) {
			if (w)
				ca.push([a, b]);
			else {
				var c = A(b);
				if (null != c) {
					var d = e.isArray(c) ? c : [c];
					d.unshift(a),
					F.addToPosse.apply(F, d)
				}
			}
		}
		  , ba = function() {
			for (var a = 0; a < ca.length; a++)
				aa.apply(this, ca[a])
		}
		  , ca = [];
		if (this.bindToolkitEvents !== !1) {
			var da = function() {
				ca.length = 0,
				F.setSuspendDrawing(!0),
				this.setSuspendRendering(!0)
			}
			.bind(this);
			r.bind(l.dataLoadStart, da),
			r.bind(l.dataAppendStart, da),
			r.bind(l.dataLoadEnd, function() {
				this.setSuspendRendering(!1),
				ba(),
				q.relayout(),
				F.getGroupManager().refreshAllGroups(),
				ja(),
				F.setSuspendDrawing(!1, !0),
				s && q.fire(l.dataLoadEnd)
			}
			.bind(this)),
			r.bind(l.dataAppendEnd, function() {
				this.setSuspendRendering(!1),
				ba(),
				q.refresh(),
				F.setSuspendDrawing(!1, !0),
				s && q.fire(l.dataAppendEnd)
			}
			.bind(this));
			var ea = function(a, b, c) {
				var d = Q[c.id];
				if (d) {
					var e = d.querySelector("[jtk-group-content]") || d;
					e.appendChild(a),
					F.addToGroup(c.id, a, !0),
					q.nodeAppendedToGroup(a, d, c)
				}
			}
			  , fa = function(a, b) {
				var c = N[a.id];
				if (null == c) {
					var d = la.getNodeDefinition(r.getNodeType(a.data));
					if (d.ignore === !0)
						return !1;
					if (c = qa(a, a.data, a),
					!c)
						throw new Error("Cannot render node");
					var e = F.getId(c);
					N[a.id] = c,
					O[e] = a,
					U(a),
					c.jtk = {
						node: a
					},
					null == a.group ? q.append(c, e, b ? b.position : null ) : ea(c, a, a.group),
					aa(c, a),
					wa(c, a, a.id);
					var f = {
						node: a,
						el: c,
						id: a.id
					};
					q.getLayout().nodeAdded(f, b),
					q.fire(l.nodeAdded, f)
				}
				return c
			};
			r.bind(l.nodeAdded, function(a) {
				var b, c = a.node, d = fa(c, a.eventInfo);
				if (null != d) {
					var e = F.getSelector(d, "[data-port-id]");
					for (b = 0; b < e.length; b++) {
						var f = e[b].getAttribute("data-port-id");
						P[c.id + "." + f] = e[b],
						e[b].jtk = e[b].jtk || {
							node: c,
							port: c.getPort(f)
						}
					}
					q.refresh(!0)
				}
			}),
			r.bind(l.nodeRemoved, function(a) {
				q.getLayout().nodeRemoved(a.nodeId);
				var b = N[a.nodeId];
				q.fire(l.nodeRemoved, {
					node: a.nodeId,
					el: b
				});
				var c = F.getId(b);
				p.remove(b),
				F.remove(b),
				delete N[a.nodeId],
				delete O[c],
				V(a.node),
				delete b.jtk,
				q.refresh(!0)
			});
			var ga = function() {
				a.relayoutOnGroupUpdate && q.relayout()
			};
			r.bind("group:addMember", ga),
			r.bind("group:removeMember", ga);
			var ha = function(b, c) {
				var d = Q[b.id];
				if (null == d) {
					var g = la.getGroupDefinition(r.getNodeType(b.data));
					if (g.ignore === !0)
						return !1;
					if (d = sa(b, b.data, b),
					!d)
						throw new Error("Cannot render Group");
					var h = F.getId(d);
					Q[b.id] = d,
					R.push(b),
					S[h] = b,
					d.jtk = {
						group: b
					},
					q.append(d, h, c ? c.position : null ),
					aa(d, b);
					var i = {
						node: b,
						el: d
					}
					  , j = {
						el: d,
						id: b.id
					};
					f.extend(j, {
						dragOptions: a.dragOptions || {}
					}),
					j.dragOptions[f.dragEvents[k.stop]] = e.wrap(j.dragOptions[f.dragEvents[k.stop]], function(a) {
						a.el.jtk && a.el.jtk.group && (q.getLayout().setPosition(a.el.jtk.group.id, a.pos[0], a.pos[1], !0),
						D !== !1 && (q.storePositionInModel({
							id: a.el.jtk.group.id,
							group: !0,
							leftAttribute: B,
							topAttribute: C
						}),
						r.fire(l.groupUpdated, {
							group: a.el.jtk.group
						}, null )),
						q.fire(l.groupMoveEnd, {
							el: a.el,
							group: a.el.jtk.group,
							pos: a.pos,
							e: a.e,
							eventPosition: a.pos
						}))
					}),
					F.addGroup(f.extend(j, g)),
					q.getLayout().groupAdded({
						group: b,
						el: d,
						id: b.id
					}, c),
					q.fire(l.groupAdded, i)
				}
				return d
			};
			r.bind(l.groupAdded, function(a) {
				var b = a.group
				  , c = ha(b, a.eventInfo);
				null != c && q.refresh(!0)
			}),
			r.bind(l.groupRemoved, function(a) {
				var b = a.group;
				q.getLayout().groupRemoved(b.id);
				var c = Q[b.id]
				  , d = F.getId(c);
				F.removeGroup(b.id, a.removeChildNodes, !0, !1),
				delete Q[b.id],
				delete S[d],
				delete c.jtk,
				q.refresh(!0)
			}),
			this.expandGroup = function(a) {
				F.expandGroup("string " == typeof a ? a : a.id)
			}
			,
			this.collapseGroup = function(a) {
				F.collapseGroup("string " == typeof a ? a : a.id)
			}
			,
			this.toggleGroup = function(a) {
				F.toggleGroup("string " == typeof a ? a : a.id)
			}
			;
			var ia = function(a, b, c) {
				for (var d, e, f = a.getNodes(), g = 0, h = 0, i = q.getLayout(), j = 0; j < f.length; j++)
					d = i.getPosition(f[j].id),
					isNaN(d[0]) || isNaN(d[1]) || (e = i.getSize(f[j].id),
					g = Math.max(g, d[0] + e[0]),
					h = Math.max(h, d[1] + e[1]));
				g = c.maxSize ? Math.min(c.maxSize[0], g) : g,
				h = c.maxSize ? Math.min(c.maxSize[1], h) : h,
				b.style.width = g + "px",
				b.style.height = h + "px",
				i.setSize(a.id, [g, h])
			}
			  , ja = function() {
				for (var a in Q) {
					var b = r.getGroup(a);
					if (b) {
						var c = la.getGroupDefinition(r.getNodeType(b.data));
						c.autoSize && ia(b, Q[a], c)
					}
				}
			};
			q.autoSizeGroups = ja;
			var ka = function(a, b) {
				return function() {
					var c = oa(a);
					c.doNotFireConnectionEvent = !0,
					b && (c.geometry = b),
					r.isDebugEnabled() && console.log("Renderer", "adding edge with params", c);
					var d = F.connect(c);
					d.edge = a,
					W[a.getId()] = d,
					$(c.type, a, d),
					q.fire(l.edgeAdded, {
						source: a.source,
						target: a.target,
						connection: d,
						edge: a,
						geometry: b
					}),
					q.refresh(!0)
				}
			};
			r.bind(l.edgeAdded, function(b) {
				if (!M && b.source !== q) {
					var c = b.edge
					  , d = la.getEdgeDefinition(r.getEdgeType(c.data || {}));
					if (d && d.ignore === !0)
						return;
					var e = ka(c, b.geometry);
					a.connectionHandler ? a.connectionHandler(c, e) : e()
				}
			}),
			r.bind(l.edgeRemoved, function(a) {
				if (!M && a.source !== q) {
					var b = a.edge
					  , c = W[b.getId()];
					c && (r.isDebugEnabled() && console.log("Renderer", "removing edge", b),
					_(c, b),
					F.detach({
						connection: W[b.getId()],
						fireEvent: !1
					}),
					delete W[b.getId()])
				}
			}),
			r.bind(l.edgeTypeChanged, function(a) {
				if (!M && a.source !== q) {
					var b = a.obj
					  , c = W[b.getId()];
					if (c) {
						var d = la.getEdgeDefinition(a.newType);
						if (d && d.ignore === !0)
							return;
						c.setType(a.newType),
						d.connector && c.setConnector(d.connector)
					}
				}
			}),
			r.bind(l.edgeTarget, function(a) {
				if (!M) {
					var b = a.edge
					  , c = W[b.getId()]
					  , d = N[b.target.getFullId()];
					c ? F.silently(function() {
						null != d ? (r.isDebugEnabled() && console.log("target change", c),
						F.setTarget(c, d)) : (delete W[b.getId()],
						F.detach({
							connection: c,
							forceDetach: !0,
							fireEvent: !1
						}))
					}) : null != d && r.isDebugEnabled() && e.log("Target for Edge " + b.getId() + " changed to Node " + d.id + "; we have no valid connection.")
				}
			}),
			r.bind(l.edgeSource, function(a) {
				if (!M) {
					var b = a.edge
					  , c = W[b.getId()]
					  , d = N[b.source.getFullId()];
					c ? F.silently(function() {
						null != d ? F.setSource(c, d) : (delete W[b.getId()],
						F.detach({
							connection: c,
							forceDetach: !0,
							fireEvent: !1
						}))
					}) : null != d && r.isDebugEnabled() && e.log("Source for Edge " + b.getId() + " changed to Node " + d.id + "; we have no valid connection.")
				}
			}),
			r.bind("graphCleared", function() {
				for (var a in N)
					"undefined" != typeof N[a]._rotors && p.remove(N[a]),
					F.remove(N[a], !0),
					delete N[a].jtk;
				s && s.clear(),
				F.setSuspendEvents(!0),
				F.batch(F.deleteEveryEndpoint, !0),
				F.setSuspendEvents(!1),
				T.length = 0,
				R.length = 0,
				W = {},
				N = {},
				O = {},
				S = {},
				P = {},
				ua = {}
			}),
			r.bind(l.portAdded, function(a) {
				var b = N[a.node.id]
				  , c = ra(a.port, a.data, a.node);
				P[a.node.id + r.getGraph().getPortSeparator() + a.port.id] = c,
				wa(F.getElement(c), a.node, a.node.id),
				q.fire(l.portAdded, {
					node: a.node,
					nodeEl: b,
					port: a.port,
					portEl: c
				}),
				F.recalculateOffsets(b),
				q.refresh(!0)
			}),
			r.bind(l.portRemoved, function(a) {
				var b = N[a.node.id]
				  , c = a.node.id + "." + a.port.id
				  , d = P[c];
				F.setSuspendEvents(!0),
				F.remove(d),
				F.setSuspendEvents(!1),
				delete P[c],
				q.fire(l.portRemoved, {
					node: a.node,
					port: a.port,
					portEl: d,
					nodeEl: b
				}),
				F.recalculateOffsets(b),
				q.refresh(!0)
			}),
			r.bind(l.edgeUpdated, function(a) {
				var b = W[a.edge.getId()];
				if (b) {
					var c = oa(a.edge);
					b.setType(c.type, c.data)
				}
			}),
			r.bind(l.portUpdated, function(a) {
				var b = P[a.port.getFullId()];
				b && (p.update(b, a.port.data),
				q.repaint(N[a.node.id]))
			}),
			r.bind(l.nodeUpdated, function(a) {
				var b = N[a.node.getFullId()];
				if (b) {
					p.update(b, a.node.data),
					wa(b, a.node, a.node.id);
					var c = A(a.node);
					if (null != c) {
						var d = e.isArray(c) ? c : [c];
						d.unshift(b),
						F.setPosse.apply(F, d)
					} else
						F.removeFromAllPosses(b);
					q.repaint(b)
				}
			})
		}
		var la;
		this.setView = function(a) {
			var b = e.merge(r.getModel(), a || {});
			la = new c.Model(b,F)
		}
		,
		this.setView(a.view),
		this.getView = function() {
			return la
		}
		;
		var ma = []
		  , na = function(a) {
			return null == a ? r : "string" == typeof a ? r.select(a, !0) : a.jtk ? r.select(a.jtk.port || a.jtk.node, !0) : a
		};
		this.activateState = function(a, b) {
			var c = la.getState(a);
			c && (b = na(b),
			c.activate(b, q, r),
			ma.push(c))
		}
		,
		this.deactivateState = function(a, b) {
			var c = la.getState(a);
			c && (b = na(b),
			c.deactivate(b, q, r),
			e.removeWithFunction(ma, function(a) {
				return a == c
			}))
		}
		,
		this.resetState = function() {
			for (var a = 0; a < ma.length; a++)
				ma[a].deactivate(r, q, r);
			ma.length = 0
		}
		;
		var oa = function(a) {
			var b = r.getEdgeType(a.data)
			  , c = {
				type: b,
				connectionType: b,
				data: a.data,
				cost: a.getCost(),
				directed: a.isDirected()
			}
			  , d = la.getEdgeDefinition(b);
			!function(a) {
				if (d)
					for (var b = 0; b < a.length; b++)
						d[a[b]] && (c[a[b]] = d[a[b]])
			}(["connector", "endpoints", "endpoint", "endpointStyles", "endpointStyle"]);
			var e = function(b) {
				if (a[b].getNode) {
					var d = a[b].getNode()
					  , e = a[b].getFullId()
					  , f = ua[e] || P[e];
					null != f ? c[b] = f : c[b] = P[e],
					null == c[b] && (c[b] = N[r.getNodeId(d.data)])
				} else {
					var g = r.getNodeId(a[b].data);
					c[b] = N[g] || Q[g]
				}
			};
			return e("source"),
			e("target"),
			c
		}
		  , pa = function(a, b, c, d, e, g, h, i) {
			return function(j, k, l) {
				var m, n = b(k), o = null , p = c(k), q = la[d](p), s = k;
				if (z) {
					s = f.extend({}, q ? q.parameters || {} : {}),
					f.extend(s, k);
					var t = {};
					for (m in s)
						s.hasOwnProperty(m) && null != s[m] && (s[m].constructor == Function ? t[m] = s[m](k) : t[m] = s[m]);
					s = t
				}
				if (q) {
					var w = q.template || "jtk-template-" + p;
					o = q.templateRenderer ? q.templateRenderer(w, s, r, a) : y.render(w, s, r, a)
				} else
					o = e(s, n);
				o = F.getElement(o),
				o.setAttribute(i, n),
				f.addClass(o, h),
				o.jtk = o.jtk || {},
				o.jtk[a] = j,
				o.jtk.node = l,
				g && u && za.makeDraggable && za.makeDraggable(o, q.dragOptions),
				v && za.makeDroppable && za.makeDroppable(o, q.dropOptions);
				var x = function(a) {
					F.on(o, a, function(b) {
						q.events[a]({
							node: l,
							el: o,
							e: b
						})
					})
				};
				if (q && q.events)
					for (m in q.events)
						x(m);
				return o
			}
		}
		  , qa = pa("node", r.getNodeId, r.getNodeType, "getNodeDefinition", b, !0, j.NODE, h.NODE)
		  , ra = pa("port", r.getPortId, r.getPortType, "getPortDefinition", b, !1, j.PORT, h.PORT)
		  , sa = pa("group", r.getNodeId, r.getNodeType, "getGroupDefinition", b, !1, j.GROUP, h.GROUP);
		this.initialize = function() {
			var b, c, d, e, f;
			if (r.setSuspendGraph(!0),
			F.setSuspendDrawing(!0),
			a.jsPlumbInstance) {
				var g = a.jsPlumbInstance.select();
				g.each(function(a) {
					W[a.edge.getId()] = a
				}),
				c = a.jsPlumbInstance.getManagedElements();
				for (var h in c) {
					var i = c[h].el;
					N[i.jtk.node.id] = i,
					O[a.jsPlumbInstance.getId(i)] = i.jtk.node
				}
				za.doImport && za.doImport(N, W)
			} else {
				for (b = 0,
				d = r.getGroupCount(); d > b; b++)
					e = r.getGroupAt(b),
					ha(e);
				for (b = 0,
				d = r.getNodeCount(); d > b; b++)
					c = r.getNodeAt(b),
					fa(c);
				for (b = 0,
				d = r.getNodeCount(); d > b; b++)
					if (c = r.getNodeAt(b),
					N[c.id]) {
						var j = r.getAllEdgesFor(c);
						for (f = 0; f < j.length; f++)
							if (j[f].source == c || j[f].source.getNode && j[f].source.getNode() == c) {
								var k = la.getEdgeDefinition(r.getNodeType(j[f].data));
								if (k && k.ignore === !0)
									continue;
								var l = oa(j[f]);
								l.doNotFireConnectionEvent = !0;
								var m = F.connect(l);
								null != m && (m.edge = j[f],
								W[j[f].getId()] = m,
								$(l.type, j[f], m))
							}
					}
			}
			ja(),
			this.relayout(),
			F.setSuspendDrawing(!1, !0),
			r.setSuspendGraph(!1)
		}
		,
		this.getContainer = function() {
			return t
		}
		,
		this.getContainerId = function() {
			return G
		}
		,
		this.getRenderedElement = function(a) {
			if (null == a)
				return null ;
			var b = a.getFullId();
			return "Port" === a.objectType ? P[b] : "Group" === a.objectType ? Q[b] : N[b]
		}
		,
		this.getRenderedNode = function(a) {
			return N[a]
		}
		,
		this.getRenderedGroup = function(a) {
			return Q[a]
		}
		,
		this.getRenderedPort = function(a) {
			return P[a]
		}
		,
		this.getRenderedConnection = function(a) {
			return W[a]
		}
		,
		this.getRenderedEndpoint = function(a) {
			var b = ya(a)
			  , c = null ;
			return b && b.obj && "Port" === b.obj.objectType && F.selectEndpoints({
				element: b.el
			}).each(function(a) {
				a.graph && a.graph.port && a.graph.port === b.obj && (c = a)
			}),
			c
		}
		;
		var ta = function(a) {
			var b = F.extend({
				container: t,
				getElementForNode: function(a) {
					return N[a] || Q[a]
				}
			}, a);
			if (b.jsPlumbToolkit = r,
			b.adapter = q,
			!c.Layouts[b.type])
				throw "no such layout [" + b.type + "]";
			return b.locationFunction || (b.locationFunction = function(a) {
				return [g.data(a.data, B), g.data(a.data, C)]
			}
			),
			new c.Layouts[b.type](b)
		};
		this.adHocLayout = function(a) {
			if (a) {
				var b = s;
				this.setLayout(a),
				s = b
			}
		}
		,
		this.setLayout = function(a, b) {
			if (a) {
				var c = f.extend({
					jsPlumb: this.getJsPlumb()
				}, a);
				s = ta(c),
				b || q.refresh()
			}
		}
		,
		this.getLayout = function() {
			return s
		}
		,
		this.getMagnetizedElements = function() {
			return null != s ? s.getMagnetizedElements() : []
		}
		,
		this.magnetize = function(a) {
			null != s && s.magnetize(a)
		}
		,
		this.refresh = function(a) {
			w || a && !x || (s ? s.layout(function() {
				"undefined" != typeof window ? window.setTimeout(F.repaintEverything, 0) : F.repaintEverything()
			}) : F.repaintEverything())
		}
		,
		this.setRefreshAutomatically = function(a) {
			x = a
		}
		,
		this.relayout = function(a) {
			w || (s ? s.relayout(a, function() {
				F.repaintEverything(),
				this.fire("relayout", this.getBoundsInfo())
			}
			.bind(this)) : F.repaintEverything())
		}
		,
		this.getPath = function(a) {
			var b = r.getPath(a);
			return b && (b.setVisible = function(a) {
				q.setVisible(b, a)
			}
			,
			b.addNodeClass = function(a) {
				b.eachNode(function(b, c) {
					F.addClass(N[c.id], a)
				})
			}
			,
			b.removeNodeClass = function(a) {
				b.eachNode(function(b, c) {
					F.removeClass(N[c.id], a)
				})
			}
			,
			b.addEdgeClass = function(a) {
				b.eachEdge(function(b, c) {
					W[c.getId()].addClass(a)
				})
			}
			,
			b.removeEdgeClass = function(a) {
				b.eachEdge(function(b, c) {
					W[c.getId()].removeClass(a)
				})
			}
			,
			b.addClass = function(a) {
				this.addNodeClass(a),
				this.addEdgeClass(a)
			}
			,
			b.removeClass = function(a) {
				this.removeNodeClass(a),
				this.removeEdgeClass(a)
			}
			),
			b
		}
		,
		this.getPosition = function(a) {
			var b = this.getLayout();
			if (b) {
				var c = ya(a).id;
				return b.getPosition(c)
			}
		}
		,
		this.getSize = function(a) {
			return F.getSize(ya(a).el)
		}
		,
		this.getCoordinates = function(a) {
			var b = this.getLayout();
			if (b) {
				var c = ya(a)
				  , d = b.getPosition(c.id)
				  , e = F.getSize(c.el);
				return {
					x: d[0],
					y: d[1],
					w: e[0],
					h: e[1]
				}
			}
		}
		;
		var ua = {}
		  , va = function(a, b, c) {
			var f = a.getAttribute("port-id")
			  , g = a.getAttribute("port-type") || "default"
			  , h = a.getAttribute("scope") || F.getDefaultScope()
			  , i = r.getNodeType(b)
			  , j = la.getNodeDefinition(i)
			  , k = la.getPortDefinition(f, j)
			  , l = la.getPortDefinition(g, j)
			  , m = e.merge(l, k)
			  , n = null == m ? {} : d.populate(m, b.data)
			  , o = function(a) {
				return function(d) {
					var e = b.getPort(f)
					  , h = [{
						portId: f,
						nodeId: c,
						port: e,
						node: b,
						portType: g,
						endpoint: d.endpoint,
						anchor: d.anchor
					}];
					a.apply(a, h)
				}
			}
			  , p = function(a) {
				return function(b) {
					var c = [{
						connection: b.connection || b,
						source: ya(b.source),
						target: ya(b.target),
						scope: b.scope
					}];
					return a.apply(a, c)
				}
			}
			  , s = n.edgeType || a.getAttribute("edge-type") || "default"
			  , t = {
				paintStyle: "connectorStyle",
				hoverPaintStyle: "connectorHoverStyle",
				overlays: "connectorOverlays",
				endpointStyle: "paintStyle"
			}
			  , u = la.getEdgeDefinition(s);
			if (u)
				for (var v in u) {
					var w = t[v] || v;
					n[w] = u[v]
				}
			if (n.connectionType = s,
			n.portId = f,
			n.portType = g,
			n.scope = h,
			n.parameters = n.parameters || {},
			n.parameters.portId = f,
			n.parameters.portType = g,
			n.parameters.edgeType = s,
			n.parameters.scope = h,
			n.parameters.nodeId = c,
			n.events = {},
			m.events)
				for (v in m.events)
					n.events[v] = o(m.events[v]);
			if (m.interceptors)
				for (v in m.interceptors)
					n[v] = p(m.interceptors[v]);
			return n.events.anchorChanged = function(a) {
				q.fire("anchorChanged", {
					portId: f,
					nodeId: c,
					portType: g,
					node: b,
					port: b.getPort(f),
					endpoint: a.endpoint,
					anchor: a.anchor
				})
			}
			,
			n
		}
		  , wa = function(a, b, c, d) {
			d = d || 0;
			var e;
			if (a.childNodes) {
				var g, h = [];
				for (e = 0; e < a.childNodes.length; e++)
					if (3 != a.childNodes[e].nodeType && 8 != a.childNodes[e].nodeType) {
						if (a.childNodes[e].tagName.toUpperCase() == i.PORT && null == a.childNodes[e].getAttribute("jtk-processed")) {
							g = va(a.childNodes[e], b, c);
							var j = F.addEndpoint(a, g);
							ua[c + "." + g.portId] = j;
							var k = b.addPort({
								id: g.portId
							});
							a.childNodes[e].setAttribute("jtk-processed", !0),
							j.graph = {
								node: b,
								port: k
							},
							p.onUpdate(a, function(a, b) {})
						}
						if (a.childNodes[e].tagName.toUpperCase() == i.SOURCE && null == a.childNodes[e].getAttribute("jtk-processed")) {
							var l = a.childNodes[e];
							g = va(l, b, c);
							var m = l.getAttribute("filter");
							if (null != g.portId && (P[c + "." + g.portId] = a,
							a.jtk = a.jtk || {},
							a.jtk.port = r.addPort(b, {
								id: g.portId
							}, !0)),
							m) {
								var n = l.getAttribute("filter-exclude")
								  , o = "true" === n;
								g.filter = m,
								g.filterExclude = o
							}
							var q = l.getAttribute("is-source");
							"true" === q && (g.isSource = !0),
							delete g.uniqueEndpoint,
							g.extract = {};
							for (var s = 0; s < l.attributes.length; s++) {
								var t = l.attributes[s];
								0 === t.name.indexOf("data-") && (g.extract[t.value] = t.name.split("-")[1])
							}
							var u, v = a._katavorioDrop ? a._katavorioDrop.length : 0;
							F.makeSource(a, g);
							var w = a._katavorioDrop ? a._katavorioDrop.length : 0;
							w > v && (u = a._katavorioDrop[a._katavorioDrop.length - 1]),
							a.childNodes[e].setAttribute("jtk-processed", !0),
							p.onUpdate(a, function(a, d) {
								var e = f.getSelector(a, "jtk-source");
								if (1 == e.length) {
									var g = va(e[0], b, c);
									g.scope && (F.setSourceScope(a, g.scope, g.edgeType),
									u && u.k.setDropScope(u, g.scope))
								}
							})
						}
						if (a.childNodes[e].tagName.toUpperCase() == i.TARGET && null == a.childNodes[e].getAttribute("jtk-processed")) {
							g = va(a.childNodes[e], b, c),
							0 != d && (P[c + "." + g.portId] = a,
							a.jtk = a.jtk || {},
							a.jtk.port = r.addPort(b, {
								id: g.portId
							}, !0));
							var x = a.childNodes[e].getAttribute("is-target");
							"true" === x && (g.isTarget = !0),
							F.makeTarget(a, g);
							var y = a._katavorioDrop[a._katavorioDrop.length - 1];
							a.childNodes[e].setAttribute("jtk-processed", !0),
							p.onUpdate(a, function(a, d) {
								var e = f.getSelector(a, "jtk-target");
								if (1 == e.length) {
									var g = va(e[0], b, c);
									g.scope && (y.targetDef.def.scope = g.scope,
									y.k.setDropScope(y, g.scope))
								}
							})
						}
						wa(a.childNodes[e], b, c, d + 1)
					}
				for (e = 0; e < h.length; e++)
					h[e].parentNode.removeChild(h[e])
			}
		};
		this.setLayout(a.layout, !0),
		this.storePositionsInModel = function(a) {
			a = a || {};
			var b = a.leftAttribute || "left"
			  , c = a.topAttribute || "top"
			  , d = s.getPositions();
			for (var e in d) {
				var f = r.getNode(e) || r.getGroup(e);
				f && (g.data(f.data, b, d[e][0]),
				g.data(f.data, c, d[e][1]))
			}
		}
		,
		this.storePositionInModel = function(a) {
			var b = "string" == typeof a ? a : a.id
			  , c = "string" == typeof a ? "left" : a.leftAttribute || "left"
			  , d = "string" == typeof a ? "top" : a.topAttribute || "top"
			  , e = s.getPosition(b)
			  , f = r[a.group ? "getGroup" : "getNode"](b);
			return f && (g.data(f.data, c, e[0]),
			g.data(f.data, d, e[1])),
			e
		}
		;
		var xa = function(a, b, c, d, e, f, g) {
			return a = a || ya(b),
			a && (s.setPosition(a.id, c, d),
			e || (F.setAbsolutePosition(a.el, [c, d], f, g),
			F.revalidate(a.el))),
			a
		};
		this.setPosition = function(a, b, c, d) {
			return xa(null , a, b, c, d)
		}
		,
		this.animateToPosition = function(a, b, c, d) {
			var e = ya(a);
			if (e) {
				var f = s.getPosition(e.id);
				xa(e, a, b, c, !1, [f[0], f[1]], d)
			}
		}
		,
		this.setVisible = function(a, b, c) {
			function d(a) {
				return a.endpoints[0].element._jtkVisible !== !1 && a.endpoints[1].element._jtkVisible !== !1
			}
			if (null != a) {
				var e = function(a) {
					var e = X(a);
					if (e) {
						var f = !b || d(e);
						f && (e.setVisible(b),
						c || (e.endpoints[0].setVisible(b),
						e.endpoints[1].setVisible(b)))
					}
				}
				  , f = function(a, d) {
					if (d && (d.style.display = b ? "block" : "none",
					d._jtkVisible = b,
					!c))
						for (var f = r.getAllEdgesFor(a), g = 0; g < f.length; g++)
							e(f[g])
				}
				  , g = function(a) {
					var c = a.getFullId()
					  , d = ua[c];
					d.setVisible(b)
				}
				  , h = function(a) {
					var b = ya(a);
					switch (b.type) {
					case "Edge":
						e(b.obj);
						break;
					case "Node":
						f(b.obj, b.el);
						break;
					case "Port":
						g(b.obj)
					}
				};
				if (a.eachNode && a.eachEdge)
					a.eachNode(function(a, b) {
						h(b)
					}),
					a.eachEdge(function(a, b) {
						h(b)
					});
				else if (a.length && "string" != typeof a)
					for (var i = 0; i < a.length; i++)
						h(a[i]);
				else
					h(a)
			}
		}
		;
		var ya = function(a) {
			return a instanceof F.getDefaultConnectionType() && (a = a.edge),
			r.getObjectInfo(a, function(a) {
				return a.getNode ? P[a.getFullId()] || N[a.getNode().id] : N[a.id]
			})
		};
		this.addToPosse = function(a, b, c) {
			d.each(a, function(a) {
				var d = ya(a);
				d.el && F.addToPosse(d.el, {
					id: b,
					active: c !== !1
				})
			})
		}
		,
		this.setPosse = function(a, b) {
			d.each(a, function(a) {
				var c = ya(a);
				c.el && F.setPosse(c.el, b)
			})
		}
		,
		this.removeFromPosse = function(a, b) {
			d.each(a, function(a) {
				var c = ya(a);
				c.el && F.removeFromPosse(c.el, b)
			})
		}
		,
		this.removeFromAllPosses = function(a) {
			d.each(a, function(a) {
				var b = ya(a);
				b.el && F.removeFromAllPosses(b.el)
			})
		}
		,
		this.setPosseState = function(a, b, c) {
			d.each(a, function(a) {
				var d = ya(a);
				d.el && F.setPosseState(d.el, b, c)
			})
		}
		;
		var za = {
			jsPlumb: F,
			toolkit: r,
			container: t,
			containerId: G,
			getConnectionsForEdges: Y,
			getConnectionForEdge: X,
			getElement: function(a) {
				return N[a] || Q[a]
			},
			getNodeForElementId: function(a) {
				return O[a]
			},
			getGroupForElementId: function(a) {
				return S[a]
			},
			getObjectInfo: ya,
			nodeMap: N,
			portMap: P,
			reverseNodeMap: O
		};
		return za
	}
	;
	b.DOM = function(a) {
		n.apply(this, arguments),
		m.apply(this, arguments)
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	function a(a, b) {
		b = b || {};
		var c = "<" + a;
		for (var d in b)
			c += " " + d + '="' + b[d] + '"';
		return c + "/>"
	}
	var b = this
	  , c = b.jsPlumbInstance
	  , d = b.jsPlumb
	  , e = b.jsPlumbToolkit
	  , f = b.jsPlumbUtil
	  , g = function() {
		this.render = function(b, c, d, e, f, g, h) {
			return {
				xml: a("rect", {
					x: c,
					y: d,
					width: e,
					height: f,
					stroke: "black",
					"stroke-width": 1,
					fill: "transparent"
				}),
				bounds: [c, d, c + e, d + f]
			}
		}
	}
	  , h = function(a, b) {
		function c(a) {
			o[0] = Math.min(o[0], a.x),
			o[1] = Math.min(o[1], a.y),
			o[2] = Math.max(o[2], a.x + a.w),
			o[3] = Math.max(o[3], a.y + a.h)
		}
		a = a || {};
		var d, e, f, g, h, i, j = a.jsPlumb || this, k = j.getManagedElements(), l = j.select(), m = j.selectEndpoints(), n = {
			nodes: [],
			edges: [],
			endpoints: []
		}, o = [1 / 0, 1 / 0, -(1 / 0), -(1 / 0)], p = a.padding || 10, q = function(a, b, c, d, e) {
			this.el = a,
			this.x = b,
			this.y = c,
			this.w = d,
			this.h = e
		}, r = function(a, b, c) {
			this.x = b,
			this.y = c,
			this.conn = a
		}, s = function(a, b, c) {
			this.x = b,
			this.y = c,
			this.endpoint = a
		};
		for (d in k)
			e = j.getPosition(k[d].el),
			f = j.getSize(k[d].el),
			g = parseInt(e.left),
			h = parseInt(e.top),
			c({
				x: g,
				y: h,
				w: f[0] + p,
				h: f[1] + p
			}),
			n.nodes.push(new q(k[d].el,g,h,f[0],f[1]));
		for (d = 0; d < l.length; d++) {
			i = l.get(d);
			var t = i.getConnector();
			g = t.x,
			h = t.y,
			c({
				x: g,
				y: h,
				w: 0,
				h: 0
			}),
			n.edges.push(new r(i,g,h)),
			c({
				x: g + t.bounds.minX,
				y: h + t.bounds.minY,
				w: t.bounds.maxX - t.bounds.minX,
				h: t.bounds.maxY - t.bounds.minY
			})
		}
		for (d = 0; d < m.length; d++) {
			var u = m.get(d);
			e = j.getPosition(u.canvas),
			g = parseInt(e.left),
			h = parseInt(e.top),
			n.endpoints.push(new s(u,g,h))
		}
		var v = o[0] < 0 ? -o[0] + p : -o[0] + p
		  , w = o[1] < 0 ? -o[1] + p : -o[1] + p;
		for (d = 0; d < n.nodes.length; d++)
			n.nodes[d].x += v,
			n.nodes[d].y += w;
		for (d = 0; d < n.edges.length; d++)
			n.edges[d].x += v,
			n.edges[d].y += w;
		for (d = 0; d < n.endpoints.length; d++)
			n.endpoints[d].x += v,
			n.endpoints[d].y += w;
		var x = o[0] < 0 && o[2] < 0 ? o[2] - o[0] : o[0] < 0 && o[2] > 0 ? o[2] - o[0] : o[2]
		  , y = o[1] < 0 && o[3] < 0 ? o[3] - o[1] : o[1] < 0 && o[3] > 0 ? o[3] - o[1] : o[3]
		  , z = b.start(o, x, y, j);
		for (d = 0; d < n.nodes.length; d++) {
			var A = b.renderNode(n.nodes[d], z, o, j);
			c.apply(null , [A])
		}
		for (d = 0; d < n.edges.length; d++)
			b.renderEdge(n.edges[d], z, o, j);
		for (d = 0; d < n.endpoints.length; d++)
			b.renderEndpoint(n.endpoints[d], z, o, j);
		return b.end(z)
	}
	  , i = function() {
		return {
			"stroke-width": 2,
			stroke: "none",
			fill: "#CCC"
		}
	}
	  , j = function(a, b) {
		return {
			"stroke-width": 2,
			stroke: "#CCC",
			fill: "none"
		}
	}
	  , k = function(a, b, c) {
		return {
			"stroke-width": 2,
			stroke: "#CCC",
			fill: "#CCC"
		}
	}
	  , l = function(b) {
		function c(b, c, e, f) {
			var g = b.conn.getConnector()
			  , h = g.getPathData();
			h && (r += a("path", d.extend({
				d: h,
				transform: "translate(" + [b.x, b.y].join(",") + ")"
			}, u(b.conn, g))));
			var i, j = b.conn.getOverlays();
			for (var k in j)
				if (i = j[k],
				i.path) {
					var l = v(b.conn, g, i);
					r += a("path", d.extend({
						d: i.path.getAttribute("d") + " Z",
						transform: "translate(" + [b.x, b.y].join(",") + ")"
					}, l))
				}
		}
		function e(a) {
			var b = "";
			w[a.endpoint.type] && (b = w[a.endpoint.type](a.endpoint, a.x, a.y)),
			s += b
		}
		function f(a, b, c, d) {
			var e = {
				x: a.x,
				y: a.y,
				w: a.w,
				h: a.h
			}
			  , f = o.render(a.el, e, a.el.jtk.node.data, d);
			return q += f.xml || f,
			f.bounds || e
		}
		function l(a, b, c, d) {
			return n = "0 0 " + (b + 2 * p) + " " + (c + 2 * p),
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + n + '">'
		}
		function m(a) {
			return a + q + r + s + "</svg>"
		}
		b = b || {};
		var n, o = b.nodeRenderer || new g, p = b.padding || 10, q = "", r = "", s = "", t = b.getEndpointStyle || i, u = b.getConnectorStyle || j, v = b.getOverlayStyle || k, w = {
			Dot: function(b, c, e) {
				return a("circle", d.extend({
					cx: b.endpoint.radius + c,
					cy: b.endpoint.radius + e,
					r: b.endpoint.radius
				}, t(b)))
			},
			Rectangle: function(b, c, e) {
				return a("rect", d.extend({
					x: c,
					y: e,
					width: b.endpoint.width,
					height: b.endpoint.height
				}, t(b)))
			}
		};
		return h.apply(this, [b, {
			defaultRenderer: g,
			start: l,
			renderNode: f,
			renderEdge: c,
			renderEndpoint: e,
			end: m
		}])
	};
	c.prototype.toSvg = l,
	e.Renderers.AbstractRenderer.prototype.toSvg = function(a) {
		var b = this.getToolkit()
		  , c = this.getView();
		a = a || {};
		var e = a.stroke || "#CCC"
		  , f = a.fill || "#CCC"
		  , g = a.strokeWidth || "2"
		  , h = a.lineJoin || "round";
		return this.getJsPlumb().toSvg({
			getConnectorStyle: a.getConnectorStyle || function(a, f) {
				var h = b.getEdgeType(a.edge.data)
				  , i = c.getEdgeDefinition(h);
				return d.extend({
					stroke: e,
					fill: "none",
					"stroke-width": g
				}, i.paintStyle || {})
			}
			,
			getEndpointStyle: a.getEndpointStyle || function() {
				return {
					fill: e,
					stroke: "none"
				}
			}
			,
			getOverlayStyle: a.getOverlayStyle || function(a, b, c) {
				return {
					fill: f,
					stroke: e,
					"stroke-width": g,
					"stroke-linejoin": h
				}
			}
			,
			nodeRenderer: a.nodeRenderer
		})
	}
	;
	var m = function(a) {
		function b(a, b, c, d) {
			k = document.createElement("canvas"),
			k.width = b + n,
			k.height = c + n,
			g = k.getContext("2d"),
			g.save(),
			g.fillStyle = m,
			g.fillRect(0, 0, b + n, c + n),
			g.restore(),
			k.style.position = "fixed",
			k.style.left = "0",
			k.style.width = a[2] + "px",
			k.style.top = "0",
			k.style.height = a[3] + "px",
			k.style.zIndex = 5e4,
			document.body.appendChild(k)
		}
		function c(a, b, c, d) {
			g.save(),
			g.fillStyle = l,
			g.fillRect(a.x, a.y, a.w, a.h),
			g.restore()
		}
		function d(a) {
			g.save();
			var b = a.conn.getConnector()
			  , c = p(b);
			g.fillStyle = c.fill,
			g.strokeStyle = c.stroke,
			g.lineWidth = c.strokeWidth;
			var d = b.pathTranslate || [0, 0];
			g.translate(a.x + d[0], a.y + d[1]);
			var e = new Path2D(b.pathData);
			g.stroke(e),
			g.restore()
		}
		function e(a) {
			q[a.endpoint.type] && (g.save(),
			q[a.endpoint.type](a.endpoint, a.x, a.y),
			g.restore())
		}
		function f() {
			return k
		}
		a = a || {};
		var g, k, l = a.fill || "#CCCCCC", m = (a.stroke || "#CCCCCC",
		a.backgroundColor || "wheat"), n = a.padding || 10, o = (a.strokeWidth || 1,
		a.getEndpointStyle || i), p = a.getConnectorStyle || j, q = {
			Dot: function(a, b, c) {
				g.save();
				var d = o(a);
				g.fillStyle = d.fill,
				g.strokeStyle = d.stroke,
				g.lineWidth = d.strokeWidth,
				g.beginPath(),
				g.arc(b + a.endpoint.radius / 2, c + a.endpoint.radius / 2, a.endpoint.radius, 0, 2 * Math.PI, !1),
				g.fill(),
				g.restore()
			},
			Rectangle: function(a, b, c) {
				g.save();
				var d = o(a);
				g.fillStyle = d.fill,
				g.strokeStyle = d.stroke,
				g.lineWidth = d.strokeWidth,
				g.fillRect(b, c, a.endpoint.width, a.endpoint.height),
				g.restore()
			}
		};
		return h.apply(this, [a, {
			start: b,
			end: f,
			renderNode: c,
			renderEdge: d,
			renderEndpoint: e
		}])
	};
	e.Renderers.Headless = function(a) {
		a = a || {};
		var b = [a.width || 500, a.height || 500]
		  , c = (a.toolkit,
		a.container);
		c || (c = d.createElement(),
		c.dim = b);
		var f = d.extend(a, {
			templateRenderer: function(a, b, c) {
				var e = d.createElement();
				return e.data = b,
				e
			},
			container: c,
			overrideFns: a.getSize ? {
				getSize: function(b) {
					var c = {
						el: b
					};
					return b.jtk ? (c.obj = b.jtk.node || b.jtk.port,
					c.id = c.obj.getFullId(),
					a.getSize(c)) : this.Defaults.NodeSize
				}
			} : null
		})
		  , g = {};
		e.Renderers.AbstractRenderer.apply(this, [f]);
		this.getWidth = function() {
			return c.dim[0]
		}
		,
		this.getHeight = function() {
			return c.dim[1]
		}
		,
		this.append = function(a, b) {
			g[b] = a
		}
		,
		this.remove = function(a) {
			delete g[a.id]
		}
		,
		this.setAbsolutePosition = function(a, b) {
			a.pos = b
		}
		,
		this.getOffset = function(a, b) {
			return this.getJsPlumb().getOffset(a, b)
		}
		,
		this.getBoundsInfo = function() {
			return {
				w: 0,
				h: 0,
				x: 0,
				y: 0,
				vw: c.dim[0],
				vh: c.dim[1],
				padding: 0,
				z: 1,
				zoom: 1
			}
		}
	}
	,
	f.extend(e.Renderers.Headless, e.Renderers.AbstractRenderer),
	"undefined" != typeof window && (window.s = function() {
		var a = document.createElement("div");
		a.innerHTML = renderer.toSvg({
			css: "*{fill:#7591a0;}"
		}),
		a.style.position = "fixed",
		a.style.left = "0",
		a.style.width = "400px",
		a.style.top = "0",
		a.style.height = "400px",
		a.style.zIndex = 5e4,
		a.style.backgroundColor = "wheat",
		document.body.appendChild(a)
	}
	,
	window.c = function() {
		var a = new m({
			jsPlumb: renderer.getJsPlumb(),
			fillStyle: "#89bcde",
			backgroundColor: "wheat"
		})
		  , b = document.createElement("a");
		b.setAttribute("href", a.toDataURL()),
		b.setAttribute("download", "jsplumb.png"),
		b.setAttribute("target", "_blank"),
		renderer.getJsPlumb().trigger(b, "click")
	}
	)
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = {
		webkit: {
			mac: function(a) {
				return a.deltaY / 120
			},
			win: function(a) {
				return a.deltaY / 100
			}
		},
		safari: function(a) {
			return a.wheelDeltaY / 120
		},
		firefox: {
			mac: function(a) {
				return -1 * a.deltaY * (1 == a.deltaMode ? 25 : 1) / 120
			},
			win: function(a) {
				return -1 * a.deltaY / 3
			}
		},
		ie: function(a) {
			return a.wheelDelta / 120
		},
		"default": function(a) {
			return a.deltaY || a.wheelDelta
		}
	}
	  , c = /Mac/.test(navigator.userAgent) ? "mac" : "win"
	  , d = -1 != navigator.userAgent.indexOf("Firefox") ? "firefox" : /Chrome/.test(navigator.userAgent) ? "webkit" : /Safari/.test(navigator.userAgent) ? "safari" : /WebKit/.test(navigator.userAgent) ? "webkit" : /Trident/.test(navigator.userAgent) ? "ie" : "default"
	  , e = "function" == typeof b[d] ? b[d] : b[d][c]
	  , f = function(a) {
		return e(a || event)
	}
	  , g = function(a, b, c) {
		return function(d) {
			b && null != d.mozInputSource && 1 !== d.mozInputSource || (d.normalizedWheelDelta = f(d),
			(!c || d.metaKey || d.ctrlKey) && a(d))
		}
	}
	  , h = "onwheel"in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
	a.addWheelListener = function(a, b, c, d) {
		var e = g(b, c, d);
		a.addEventListener ? a.addEventListener(h, e, !1) : a.attachEvent && a.attachEvent("onmousewheel", e)
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	var a = this;
	a.PinchListener = function(a) {
		var b = "onpointerdown"in document.documentElement
		  , c = "ontouchstart"in document.documentElement
		  , d = [0, 0]
		  , e = 0
		  , f = 0
		  , g = function(b) {
			a[b](d, f, e, e / f)
		}
		  , h = function() {
			a.onPinchEnd()
		}
		  , i = "onPinchStart"
		  , j = "onPinch"
		  , k = "pointerdown"
		  , l = "pointermove"
		  , m = "pointerup"
		  , n = "touchstart"
		  , o = "touchmove"
		  , p = "touchend"
		  , q = function(a, b, c, d) {
			return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2))
		}
		  , r = {
			pointer: function() {
				var b = {}
				  , c = []
				  , n = 0
				  , o = !1
				  , p = function() {
					2 == n && (d = [(c[1].p[0] + c[0].p[0]) / 2, (c[1].p[1] + c[0].p[1]) / 2],
					e = q(c[1].p[0], c[1].p[1], c[0].p[0], c[0].p[1]))
				}
				  , r = function(a) {
					n >= 2 || o || (c[n] = {
						e: a,
						p: [a.pageX, a.pageY]
					},
					b["" + a.pointerId] = n,
					n++,
					p(),
					2 == n && (f = e,
					g(i)))
				}
				  , s = function(a) {
					var c = b["" + a.pointerId];
					null != c && (delete b["" + a.pointerId],
					n--,
					o = 0 !== n,
					h())
				}
				  , t = function(a) {
					if (!o && 2 == n) {
						var d = b[a.pointerId];
						null != d && (c[d].p = [a.pageX, a.pageY],
						p(),
						g(j))
					}
				};
				a.bind(a.el, k, r),
				a.bind(document, m, s),
				a.bind(document, l, t)
			},
			touch: function(a) {
				var b = function(a) {
					return a.touches || []
				}
				  , c = function(a, b) {
					return a.item ? a.item(b) : a[b]
				}
				  , k = function(a) {
					var b = c(a, 0)
					  , d = c(a, 1);
					return q(b.pageX, b.pageY, d.pageX, d.pageY)
				}
				  , l = function(a) {
					var b = c(a, 0)
					  , d = c(a, 1);
					return [(b.pageX + d.pageX) / 2, (b.pageY + d.pageY) / 2]
				}
				  , m = !1
				  , r = function(c) {
					var h = b(c);
					2 == h.length && a.enableWheelZoom !== !1 && (d = l(h),
					e = f = k(h),
					m = !0,
					a.bind(document, o, t),
					a.bind(document, p, s),
					g(i))
				}
				  , s = function(b) {
					m = !1,
					a.unbind(document, o, t),
					a.unbind(document, p, s),
					h()
				}
				  , t = function(a) {
					if (m) {
						var c = b(a);
						2 == c.length && (e = k(c),
						d = l(c),
						g(j))
					}
				};
				a.bind(a.el, n, r)
			}
		};
		b ? r.pointer(a) : c && r.touch(a)
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumb;
	this.ZoomWidget = function(a) {
		function d(b, c) {
			if (g())
				return {
					w: 0,
					h: 0,
					x: 0,
					y: 0,
					vw: a.width(u),
					vh: a.height(u),
					padding: b,
					z: 1,
					zoom: 1
				};
			b = b || 0,
			c = c || .9;
			var d = Math.abs(la.maxx[0][0][0] + la.maxx[0][1] - la.minx[0][0][0])
			  , e = Math.abs(la.maxy[0][0][1] + la.maxy[0][2] - la.miny[0][0][1])
			  , f = a.width(u)
			  , h = a.height(u)
			  , i = f / ((d + 2 * b) / c)
			  , j = h / ((e + 2 * b) / c)
			  , k = Math.min(i, j);
			return {
				w: d,
				h: e,
				x: la.minx[0][0][0],
				y: la.miny[0][0][1],
				vw: f,
				vh: h,
				padding: b,
				z: k,
				zoom: ba
			}
		}
		function g() {
			for (var a in ma)
				return !1;
			return !0
		}
		function h(a) {
			for (var b in la)
				if (la.hasOwnProperty(b)) {
					for (var c = -1, d = 0; d < la[b].length; d++)
						if (la[b][d][3] === a) {
							c = d;
							break
						}
					-1 != c && la[b].splice(c, 1)
				}
		}
		a.events = a.events || {};
		var i, j, k, l, m, n, o = this, p = function() {}, q = a.canvas, r = a.domElement || function(a) {
			return a
		}
		, s = r(q), t = a.viewport, u = r(t), v = a.events.zoom || p, w = (a.events.maybeZoom || function() {
			return !0
		}
		,
		a.events.pan || p), x = a.events.mousedown || p, y = a.events.mouseup || p, z = a.events.mousemove || p, A = a.events.transformOrigin || p, B = !(a.clamp === !1), C = a.clampZoom !== !1, D = a.panDistance || 50, E = a.enablePan !== !1, F = a.enableWheelZoom !== !1, G = a.enableAnimation !== !1, H = a.wheelFilter || function() {
			return !0
		}
		, I = a.wheelZoomMetaKey === !0, J = a.wheelSensitivity || 10, K = a.enablePanButtons !== !1, L = a.padding || [0, 0], M = a.consumeRightClick !== !1, N = a.smartMinimumZoom, O = !1, P = "mousedown", Q = "mouseup", R = "mousemove", S = ["webkit", "Moz", "ms"], T = a.bind, U = a.unbind, V = !(a.enabled === !1), W = a.clampToBackground, X = a.clampToBackgroundExtents, Y = a.filter || function(a) {
			return !1
		}
		, Z = a.width, $ = a.height, _ = 0, aa = 0, ba = a.zoom || 1, ca = [0, 0], da = !1, ea = !1, fa = !1, ga = !1, ha = a.zoomRange || [.05, 3], ia = 150, ja = -1, ka = -1, la = {
			minx: [],
			maxx: [],
			miny: [],
			maxy: []
		}, ma = {}, na = {}, oa = {}, pa = !1, qa = function() {
			la.minx.sort(function(a, b) {
				return a[0][0] < b[0][0] ? -1 : 1
			}),
			la.miny.sort(function(a, b) {
				return a[0][1] < b[0][1] ? -1 : 1
			}),
			la.maxx.sort(function(a, b) {
				return a[0][0] + a[1] > b[0][0] + b[1] ? -1 : 1
			}),
			la.maxy.sort(function(a, b) {
				return a[0][1] + a[2] > b[0][1] + b[2] ? -1 : 1
			})
		}, ra = function(a, b, c, d) {
			null == ma[a] && (ma[a] = [],
			la.minx.push(ma[a]),
			la.miny.push(ma[a]),
			la.maxx.push(ma[a]),
			la.maxy.push(ma[a])),
			ma[a][0] = b,
			ma[a][1] = c,
			ma[a][2] = d,
			ma[a][3] = a,
			O ? pa = !0 : qa()
		};
		this.setBoundsFor = ra,
		this.setSuspendRendering = function(a) {
			O = a,
			!a && pa && qa(),
			pa = !1
		}
		;
		var sa = function(a, b) {
			return function(c) {
				Ta(s, a * D, b * D, null , !0, function(a) {
					w(a[0], a[1], ba, ba, c),
					i && i.pan(),
					cb.pan()
				})
			}
		}
		  , ta = 150
		  , ua = 60
		  , va = 10
		  , wa = null
		  , xa = null
		  , ya = null
		  , za = function(b, c, d) {
			return function() {
				ya = d,
				a.addClass(ya, "jtk-surface-pan-active"),
				a.bind(document, "mouseup", Aa),
				wa = window.setTimeout(function() {
					a.bind(document, Q, Ca),
					xa = window.setInterval(Ba(b, c), ua)
				}, ta)
			}
		}
		  , Aa = function() {
			window.clearTimeout(wa),
			ya && a.removeClass(ya, "jtk-surface-pan-active"),
			ya = null
		}
		  , Ba = function(a, b) {
			return function(c) {
				var d = Ta(s, a * va, b * va, null );
				w(d[0], d[1], ba, ba, c),
				i && i.pan(),
				cb.pan()
			}
		}
		  , Ca = function() {
			window.clearTimeout(xa)
		}
		  , Da = function(b, c, d, e, f) {
			var g = document.createElement("div");
			g.innerHTML = f || "",
			g.style.position = "absolute";
			for (var h in c)
				g.style[h] = c[h];
			return g.className = "jtk-surface-pan jtk-surface-pan-" + b,
			u.appendChild(g),
			a.bind(g, "click", sa(d, e)),
			a.bind(g, "mousedown", za(d, e, g)),
			g
		};
		K && (Da("top", {
			left: "0px",
			top: "0px"
		}, 0, -1, "&#8593;"),
		Da("bottom", {
			left: "0px",
			bottom: "0px"
		}, 0, 1, "&#8595;"),
		Da("left", {
			left: "0px",
			top: "0px"
		}, -1, 0, "&#8592;"),
		Da("right", {
			right: "0px",
			top: "0px"
		}, 1, 0, "&#8594;"));
		var Ea = function(a, b, c) {
			c = c || s;
			for (var d = 0; d < S.length; d++) {
				var e = a.replace(/([a-z]){1}/, function(a) {
					return S[d] + a.toUpperCase()
				});
				c.style[e] = b
			}
			c.style[a] = b
		}
		  , Fa = function(a) {
			Ea("transformOrigin", ca[0] + "% " + ca[1] + "%", a)
		}
		  , Ga = function(b, c) {
			var d = Ua()
			  , e = a.offset(u, !0)
			  , f = Sa(s)
			  , g = a.width(q)
			  , h = a.height(q)
			  , i = [(b - (e.left + f[0]) - d[0]) / ba, (c - (e.top + f[1]) - d[1]) / ba];
			return {
				w: g,
				h: h,
				xy: i,
				xScale: i[0] / g,
				yScale: i[1] / h,
				o: [i[0] / g * 100, i[1] / h * 100]
			}
		}
		  , Ha = function(a, b, c, d) {
			var e, f, g, h, i = ca[0] / 100 * b, j = ca[1] / 100 * c;
			e = -(i * (1 - ba)),
			f = -(j * (1 - ba)),
			ca = a,
			Fa(),
			i = ca[0] / 100 * b,
			j = ca[1] / 100 * c,
			g = -(i * (1 - ba)),
			h = -(j * (1 - ba));
			var k = Ta(s, g - e, h - f, d);
			A && A(ca, k)
		}
		  , Ia = function(a, b, c) {
			var d = Ga(a, b);
			Ha(d.o, d.w, d.h, c)
		}
		  , Ja = function(a) {
			var b = La(a);
			Ia(b[0], b[1], a)
		}
		  , Ka = function(b, c) {
			var d = a.width(q)
			  , e = a.height(q);
			Ha([b / d * 100, c / e * 100], d, e)
		}
		  , La = this.pageLocation = function(a) {
			if (null != a.pageX)
				return [a.pageX, a.pageY];
			var b = Ma(Na(a), 0);
			return b ? [b.pageX, b.pageY] : [0, 0]
		}
		  , Ma = function(a, b) {
			return a.item ? a.item(b) : a[b]
		}
		  , Na = function(a) {
			return a.touches || []
		}
		  , Oa = function(a, b, c, e, f) {
			if (!(null == a || isNaN(a) || 0 > a)) {
				var g = ha[0];
				if (N) {
					g = .5;
					var h = d().z
					  , j = a / h;
					g > j && (a = h * g)
				} else
					g > a && (a = g);
				if (a > ha[1] && (a = ha[1]),
				e) {
					var k = a > ba ? .05 : -.05
					  , l = ba
					  , m = ba > a
					  , n = window.setInterval(function() {
						l = Oa(l + k),
						m && a >= l && window.clearInterval(n),
						!m && l >= a && window.clearInterval(n)
					});
					return ba
				}
				Ea("transform", "scale(" + a + ")");
				var o = ba;
				if (ba = a,
				f || v(_, aa, ba, o, b, c),
				null != i && i.setZoom(a),
				cb && cb.pan(),
				C) {
					var p = Sa(s)
					  , q = Ra(p[0], p[1]);
					(q[0] != p[0] || q[1] != p[1]) && Sa(s, q[0], q[1], null , !e)
				}
				return ba
			}
		}
		  , Pa = function(a, b, c, d) {
			-ia > b && (b = -ia),
			b > ia && (b = ia),
			Qa(k, b, -ia, ia, c, d)
		}
		  , Qa = function(a, b, c, d, e, f) {
			var g = b / (b >= 0 ? d : c)
			  , h = b >= 0 ? 1 : 0
			  , i = a + g * (ha[h] - a);
			Oa(i, e, f)
		}
		  , Ra = function(b, c, e) {
			if (B || W || X) {
				var f = Ua()
				  , g = b
				  , h = c
				  , j = B ? d() : {
					x: 0,
					y: 0,
					w: 0,
					h: 0,
					vw: a.width(u),
					vh: a.height(u),
					padding: e,
					z: 1
				};
				if (e = (e || 20) * ba,
				(W || X) && null != i) {
					var k = i.getWidth()
					  , l = i.getHeight()
					  , m = Math.max(j.x + j.w, k)
					  , n = Math.max(j.y + j.h, l);
					j.w = m - j.w,
					j.h = n - j.h;
					var o = j.vw / j.w
					  , p = j.vh / j.h;
					j.z = Math.min(o, p),
					X && (e = Math.max(j.vw, j.vh))
				}
				var q = [j.x + j.w, j.y + j.h];
				i && (q[0] = Math.max(q[0], i.getWidth()),
				q[1] = Math.max(q[1], i.getHeight()));
				var r = b + f[0] + q[0] * ba - e
				  , s = c + f[1] + q[1] * ba - e
				  , t = b + f[0] + j.x * ba + e
				  , v = c + f[1] + j.y * ba + e;
				return 0 > r && (g -= r),
				t > j.vw && (g -= t - j.vw),
				0 > s && (h -= s),
				v > j.vh && (h -= v - j.vh),
				[g, h]
			}
			return [b, c]
		}
		  , Sa = function(b, c, d, e, f, g, h) {
			if (1 == arguments.length)
				return [parseInt(b.style.left, 10) || 0, parseInt(b.style.top, 10) || 0];
			var i = Ra(c, d);
			return G && !f && a.animate ? a.animate(b, {
				left: i[0],
				top: i[1]
			}, {
				step: h,
				complete: function() {
					g && g(i)
				}
			}) : (b.style.left = i[0] + "px",
			b.style.top = i[1] + "px",
			g && g(i)),
			i
		};
		s.style.left = "0px",
		s.style.top = "0px";
		var Ta = function(a, b, c, d, e, f) {
			var g = Sa(a);
			return Sa(a, g[0] + b, g[1] + c, d, !e, f)
		}
		  , Ua = function() {
			var b = a.width(q)
			  , c = a.height(q)
			  , d = ca[0] / 100 * b
			  , e = ca[1] / 100 * c;
			return [d * (1 - ba), e * (1 - ba)]
		}
		  , Va = {
			start: function(b, c) {
				if (!ea) {
					var d = b.srcElement || b.target;
					V && (d == s || d == u || d._jtkDecoration || i && i.owns(d) || Y(d, b) === !0) && (ga = !1,
					ja = -1,
					ka = -1,
					3 !== b.which || a.enableWheelZoom === !1 || null != b.mozInputSource && 1 !== b.mozInputSource ? c.length <= 1 && (da = !0,
					j = La(b),
					n = Sa(s)) : (fa = !0,
					j = La(b),
					Ja(b),
					n = Sa(s),
					k = ba)),
					x(b, o)
				}
			},
			move: function(a, b) {
				var c, d, e;
				if (ga = !1,
				!ea) {
					if (fa)
						e = La(a),
						c = e[0] - j[0],
						d = e[1] - j[1],
						Pa(c, d, a);
					else if (da && E && null != j) {
						e = La(a),
						c = e[0] - j[0],
						d = e[1] - j[1];
						var f = Sa(s, n[0] + c, n[1] + d, a, !0);
						w(f[0], f[1], ba, ba, a),
						i && i.pan(),
						cb && cb.pan()
					}
					z(a, o)
				}
			},
			end: function(a, b) {
				ea || (fa = !1,
				j = null ,
				da = !1,
				ga = !1,
				U(document, R, Xa),
				U(document, Q, Ya),
				T(document, R, Za),
				y(a, o))
			},
			contextmenu: function(a) {}
		}
		  , Wa = function(a, b) {
			"contextmenu" == a && M && b.preventDefault && b.preventDefault();
			var c = Na(b);
			Va[a](b, c)
		}
		  , Xa = function(a) {
			Wa("move", a)
		}
		  , Ya = function(a) {
			Wa("end", a)
		}
		  , Za = function(a) {
			ga = !1
		};
		T(document, R, Za);
		var $a = this.start = function(a) {
			V && null != a && (U(document, R, Za),
			T(document, R, Xa),
			T(document, Q, Ya),
			Va.start(a, Na(a)))
		}
		;
		if (T(t, P, $a),
		T(t, "contextmenu", function(a) {
			Wa("contextmenu", a)
		}),
		F) {
			var _a = function(a) {
				H(a) && (a.preventDefault && a.preventDefault(),
				a.stopPropagation && a.stopPropagation(),
				k = ba,
				ga || (Ja(a),
				ga = !0),
				Pa(0, a.normalizedWheelDelta * J, a, !0))
			};
			addWheelListener(u, _a, !0, I)
		}
		new PinchListener({
			el: t,
			bind: T,
			unbind: U,
			enableWheelZoom: a.enableWheelZoom,
			onPinch: function(a, b, c, d) {
				Oa(d * k);
				var e = a[0] - j[0]
				  , f = a[1] - j[1];
				Sa(s, n[0] + e, n[1] + f, null , !0)
			},
			onPinchStart: function(a, b) {
				ea = !0,
				j = a,
				l = m = b,
				k = ba,
				Ia(j[0], j[1]),
				n = Sa(s)
			},
			onPinchEnd: function() {
				ea = !1,
				j = null
			}
		}),
		Oa(ba, null , !1, !1, !0),
		Fa(),
		this.positionChanged = function(b, c, d) {
			d = d || a.id(b);
			var e = c || Sa(b)
			  , f = a.width(b)
			  , g = a.height(b);
			na[d] = b,
			ra(d, e, f, g)
		}
		,
		this.add = function(a, b, c, d) {
			this.positionChanged(a, c, b),
			d && (T(a, P, $a),
			a._jtkDecoration = !0)
		}
		,
		this.suspend = function(b) {
			var c = "string" == typeof b ? b : a.id(b);
			oa[c] = !0,
			h(c)
		}
		,
		this.isSuspended = function(b) {
			var c = "string" == typeof b ? b : a.id(b);
			return oa[c] === !0
		}
		,
		this.restore = function(b) {
			var c = "string" == typeof b ? b : a.id(b);
			delete oa[c],
			this.positionChanged(b, null , c)
		}
		,
		this.remove = function(b) {
			b = r(b);
			var c = a.id(b);
			delete ma[c],
			delete na[c],
			delete oa[c],
			h(c)
		}
		,
		this.reset = function() {
			la.minx.length = 0,
			la.miny.length = 0,
			la.maxx.length = 0,
			la.maxy.length = 0,
			ma = {},
			na = {},
			oa = {},
			Sa(s, 0, 0, null , !0)
		}
		,
		this.getBoundsInfo = d,
		this.zoomToFit = function(a) {
			a = a || {};
			var b = d(a.padding, a.fill);
			a.doNotZoomIfVisible && b.z > ba || Oa(b.z),
			o.centerContent({
				bounds: b,
				doNotAnimate: a.doNotAnimate !== !1,
				onComplete: a.onComplete,
				onStep: a.onStep,
				doNotFirePanEvent: a.doNotFirePanEvent
			})
		}
		,
		this.zoomToFitIfNecessary = function(a) {
			var c = b.extend(a || {});
			c.doNotZoomIfVisible = !0,
			this.zoomToFit(c)
		}
		,
		this.zoomToElements = function(b) {
			for (var c = {
				x: 1 / 0,
				y: 1 / 0,
				xMax: -(1 / 0),
				yMax: -(1 / 0),
				z: 1,
				vw: a.width(u),
				vh: a.height(u)
			}, d = 0; d < b.elements.length; d++) {
				var e = b.elements[d]
				  , f = a.offset(e)
				  , g = a.width(e)
				  , h = a.height(e);
				c.x = Math.min(c.x, f.left),
				c.y = Math.min(c.y, f.top),
				c.xMax = Math.max(c.xMax, f.left + g),
				c.yMax = Math.max(c.yMax, f.top + h)
			}
			var i = a.fill || .9;
			c.w = i * (c.xMax - c.x),
			c.h = i * (c.yMax - c.y),
			c.z = Math.min(c.vw / c.w, c.vh / c.h),
			b.doNotZoomIfVisible && c.z > ba || Oa(c.z),
			o.centerContent({
				bounds: c,
				doNotAnimate: b.doNotAnimate !== !1,
				onComplete: b.onComplete,
				onStep: b.onStep,
				doNotFirePanEvent: b.doNotFirePanEvent
			})
		}
		,
		this.zoomToBackground = function(a) {
			if (a = a || {},
			null != i) {
				var b = i.getWidth()
				  , c = i.getHeight()
				  , d = Z(u)
				  , e = $(u)
				  , f = d / b
				  , g = e / c
				  , h = Math.min(f, g)
				  , j = {
					w: b,
					h: c,
					x: 0,
					y: 0,
					vw: d,
					vh: e,
					padding: 0,
					z: h
				};
				Oa(j.z),
				o.centerContent({
					bounds: j,
					doNotAnimate: a.doNotAnimate,
					onComplete: a.onComplete,
					onStep: a.onStep
				})
			}
		}
		,
		this.setFilter = function(a) {
			Y = a || function(a) {
				return !1
			}
		}
		,
		this.centerBackground = function() {
			if (null != i) {
				var c = b.extend({}, d());
				c.x = i.getWidth() / 2,
				c.y = i.getHeight() / 2,
				c.w = 1,
				c.h = 1,
				o.centerContent({
					bounds: c,
					doNotAnimate: a.doNotAnimate,
					onComplete: a.onComplete,
					onStep: a.onStep,
					vertical: !0,
					horizontal: !0
				})
			}
		}
		,
		this.alignBackground = function(a) {
			if (null != i) {
				var b = a.split(" ")
				  , c = b[0] || "left"
				  , e = b[1] || "top"
				  , f = d()
				  , g = "left" === c ? 0 : f.vw - i.getWidth() * ba
				  , h = "top" === e ? 0 : f.vh - i.getHeight() * ba
				  , j = Ua();
				Sa(s, g - j[0], h - j[1]),
				i.pan(),
				cb && cb.pan()
			}
		}
		,
		this.positionElementAt = function(b, c, d, e, f, g) {
			e = e || 0,
			f = f || 0;
			var h = Ua()
			  , i = Sa(s)
			  , j = r(b)
			  , k = j.parentNode
			  , l = a.offset(k)
			  , m = a.offset(t)
			  , n = m.left - l.left + (i[0] + h[0]) + c * ba + e
			  , o = m.top - l.top + (i[1] + h[1]) + d * ba + f;
			g && 0 > n && (n = 0),
			g && 0 > o && (o = 0),
			j.style.left = n + "px",
			j.style.top = o + "px"
		}
		,
		this.positionElementAtPageLocation = function(a, b, c, d, e) {
			var f = this.mapLocation(b, c);
			this.positionElementAt(a, f.left, f.top, d, e)
		}
		,
		this.positionElementAtEventLocation = function(a, b, c, d) {
			var e = this.mapEventLocation(b);
			this.positionElementAt(a, e.left, e.top, c, d)
		}
		,
		this.zoomToEvent = function(a, b) {
			Ja(a),
			Oa(ba + b, a)
		}
		,
		this.relayout = function(b, c) {
			if (a.enablePan === !1) {
				Sa(s, -b.x + L[0], -b.y + L[1], null , c);
				var d = b.w + (b.x < 0 ? b.x : 0) + L[0]
				  , e = b.h + (b.y < 0 ? b.y : 0) + L[1];
				s.style.width = d + "px",
				s.style.height = e + "px";
				var f = 0 == d ? 0 : (b.x - L[0]) / d * 100
				  , g = 0 == e ? 0 : (b.y - L[1]) / e * 100;
				this.setTransformOrigin(f, g)
			}
		}
		,
		this.nudgeZoom = function(b, c) {
			var d = a.offset(u, !0)
			  , e = d.left + a.width(u) / 2
			  , f = d.top + a.height(u) / 2;
			return Ia(e, f),
			Oa(ba + b, c)
		}
		,
		this.nudgeWheelZoom = function(a, b) {
			k = ba,
			Pa(0, a, b, !0)
		}
		,
		this.centerContent = function(a) {
			a = a || {};
			var b = a.bounds || d()
			  , c = Ua()
			  , e = b.x * ba + b.w * ba / 2
			  , f = b.y * ba + b.h * ba / 2
			  , g = b.vw / 2 - e
			  , h = b.vh / 2 - f
			  , j = Sa(s);
			Sa(s, a.horizontal !== !1 ? g - c[0] : j[0], a.vertical !== !1 ? h - c[1] : j[1], null , a.doNotAnimate, function() {
				a.doNotFirePanEvent || w(a.horizontal !== !1 ? g - j[0] : 0, a.vertical !== !1 ? h - j[1] : 0, ba, ba),
				i && i.pan(),
				cb && cb.pan(),
				a.onComplete && a.onComplete()
			}, a.onStep)
		}
		,
		this.centerContentHorizontally = function(a) {
			this.centerContent(b.extend({
				horizontal: !0,
				vertical: !1
			}, a))
		}
		,
		this.centerContentVertically = function(a) {
			this.centerContent(b.extend({
				vertical: !0,
				horizontal: !1
			}, a))
		}
		,
		this.centerOn = function(a, c) {
			c = c || {};
			var e = b.extend({}, d())
			  , f = Sa(a)
			  , g = Z(a)
			  , h = $(a);
			e.x = f[0],
			e.y = f[1],
			e.w = g,
			e.h = h;
			var i = function() {
				Ka(f[0] + g / 2, f[1] + h / 2),
				c.onComplete && c.onComplete()
			};
			this.centerContent({
				bounds: e,
				doNotAnimate: c.doNotAnimate,
				onComplete: i,
				onStep: c.onStep,
				vertical: c.vertical !== !1,
				horizontal: c.horizontal !== !1
			})
		}
		,
		this.centerOnHorizontally = function(a) {
			this.centerOn(a, {
				vertical: !1
			})
		}
		,
		this.centerOnVertically = function(a) {
			this.centerOn(a, {
				horizontal: !1
			})
		}
		,
		this.centerOnAndZoom = function(a, b) {
			b = b || .6;
			var c = {
				w: Z(a),
				h: $(a)
			}
			  , e = Sa(a)
			  , f = d()
			  , g = f.vw < f.vh ? [f.vw, "w"] : [f.vh, "h"]
			  , h = b * g[0]
			  , i = h / c[g[1]];
			i < ha[0] && (i = ha[0]),
			i > ha[1] && (i = ha[1]);
			var j = ba
			  , k = i - ba;
			Ka(e[0] + c.w / 2, e[1] + c.h / 2),
			this.centerOn(a, {
				onStep: function(a, b) {
					Oa(j + a / b * k)
				},
				onComplete: function() {
					Oa(i)
				}
			})
		}
		,
		this.getViewportCenter = function() {
			var a = b.extend({}, d())
			  , c = Ua()
			  , e = Sa(s)
			  , f = [a.vw / 2, a.vh / 2];
			return [(f[0] - (e[0] + c[0])) / ba, (f[1] - (e[1] + c[1])) / ba]
		}
		,
		this.setViewportCenter = function(a) {
			var c = b.extend({}, d())
			  , e = Ua()
			  , f = [c.vw / 2, c.vh / 2]
			  , g = [e[0] + (ba * a[0] + f[0]), e[1] + (ba * a[1] + f[1])];
			Sa(s, g[0], g[1])
		}
		,
		this.setClamping = function(a) {
			B = a
		}
		,
		this.setZoom = function(a, b, c) {
			return Oa(a, null , null , b, c)
		}
		,
		this.setZoomRange = function(a, b) {
			return null != a && 2 == a.length && a[0] < a[1] && null != a[0] && null != a[1] && a[0] > 0 && a[1] > 0 && (ha = a,
			b || (ba < ha[0] || ba > ha[1]) && Oa(ba)),
			this
		}
		,
		this.getZoomRange = function() {
			return ha
		}
		,
		this.getZoom = function() {
			return ba
		}
		,
		this.getPan = function() {
			return Sa(s)
		}
		,
		this.pan = function(a, b, c) {
			Ta(s, a, b, null , c, function(a) {
				w(a[0], a[1], ba, ba),
				i && i.pan(),
				cb && cb.pan()
			})
		}
		,
		this.setPan = function(a, b, c, d, e) {
			return Sa(s, a, b, null , !c, d, e)
		}
		,
		this.setTransformOrigin = function(a, b) {
			ca = [a, b],
			Fa()
		}
		,
		this.mapLocation = function(b, c, d) {
			var e = Ua()
			  , f = Sa(s)
			  , g = u.scrollLeft
			  , h = u.scrollTop
			  , i = d ? {
				left: 0,
				top: 0
			} : a.offset(u);
			return {
				left: (b - (f[0] + e[0]) - i.left + g) / ba,
				top: (c - (f[1] + e[1]) - i.top + h) / ba
			}
		}
		,
		this.mapEventLocation = function(a, b) {
			var c = La(a);
			return this.mapLocation(c[0], c[1], b)
		}
		,
		this.setEnabled = function(a) {
			V = a
		}
		,
		this.showElementAt = function(b, c, d) {
			var e = r(b)
			  , f = e.parentNode
			  , g = a.offset(f)
			  , h = a.offset(t)
			  , i = Ua()
			  , j = g.left - h.left + i[0] + c
			  , k = g.top - h.top + i[1] + d;
			a.offset(b, {
				left: j,
				top: k
			})
		}
		,
		this.getApparentCanvasLocation = function() {
			var a = Ua()
			  , b = Sa(s);
			return [b[0] + a[0], b[1] + a[1]]
		}
		,
		this.setApparentCanvasLocation = function(a, b) {
			var c = Ua()
			  , d = Sa(s, a - c[0], b - c[1], null , !0);
			return i && i.pan(),
			cb && cb.pan(),
			d
		}
		,
		this.applyZoomToElement = function(a, b) {
			b = b || ba,
			Ea("transform", "scale(" + b + ")", a)
		}
		,
		this.setTransformOriginForElement = function(a, b) {
			Ea("transformOrigin", b[0] + " " + b[1], a)
		}
		,
		this.getTransformOrigin = function() {
			return ca
		}
		,
		this.floatElement = function(a, b) {
			null != a && (a.style.position = "absolute",
			a.style.left = b[0] + "px",
			a.style.top = b[1] + "px",
			u.appendChild(a))
		}
		;
		var ab = {}
		  , bb = function(a) {
			var b = o.getApparentCanvasLocation();
			for (var c in ab)
				if (ab.hasOwnProperty(c)) {
					if (null != a && a != c)
						continue;
					var d = ab[c]
					  , e = function(a, c) {
						d[a] && (b[c] / ba + d.pos[c] < 0 ? d.el.style[a] = -(b[c] / ba) + "px" : d.el.style[a] = d.pos[c] + "px")
					};
					e("left", 0),
					e("top", 1)
				}
		}
		  , cb = {
			pan: bb
		};
		this.fixElement = function(b, c, d) {
			if (null != b) {
				var e = a.id(b);
				ab[e] = {
					el: b,
					left: c.left,
					top: c.top,
					pos: d
				},
				b.style.position = "absolute",
				b.style.left = d[0] + "px",
				b.style.top = d[1] + "px",
				s.appendChild(b),
				bb(e)
			}
		}
		,
		this.findIntersectingNodes = function(b, c, d, e) {
			var f = this.getApparentCanvasLocation()
			  , g = a.offset(u)
			  , h = u.scrollLeft
			  , i = u.scrollTop
			  , j = []
			  , k = {
				x: b[0],
				y: b[1],
				w: c[0],
				h: c[1]
			}
			  , l = d ? Biltong.encloses : Biltong.intersects
			  , m = [g.left + f[0] - h, g.top + f[1] - i];
			for (var n in ma)
				if (!oa[n]) {
					var o = ma[n]
					  , p = {
						x: m[0] + o[0][0] * ba,
						y: m[1] + o[0][1] * ba,
						w: o[1] * ba,
						h: o[2] * ba
					};
					l(k, p) && (null == e || e(n, na[n], p)) && j.push({
						id: n,
						el: na[n],
						r: p
					})
				}
			return j
		}
		,
		this.findNearbyNodes = function(a, b, c, d) {
			var e = [];
			if (!c || this.isInViewport(a[0], a[1])) {
				e = this.findIntersectingNodes([a[0] - b, a[1] - b], [2 * b, 2 * b], !1, d);
				var f = this.mapLocation(a[0], a[1]);
				e.sort(function(a, b) {
					var c = [a.x + a.w / 2, a.y + a.h / 2]
					  , d = [b.x + b.w / 2, b.y + b.h / 2]
					  , e = Biltong.lineLength(f, c)
					  , g = Biltong.lineLength(f, d);
					return g > e ? -1 : e > g ? 1 : 0
				})
			}
			return e
		}
		,
		this.isInViewport = function(b, c) {
			var d = a.offset(u)
			  , e = a.width(u)
			  , f = a.height(u);
			return d.left <= b && b <= d.left + e && d.top <= c && c <= d.top + f
		}
		,
		this.getElementPositions = function() {
			return ma
		}
		,
		this.setFilter = function(a) {
			Y = a || function(a) {
				return !1
			}
		}
		,
		this.setWheelFilter = function(a) {
			H = a || function(a) {
				return !0
			}
		}
		,
		this.setBackground = function(a) {
			var b = a.type || "simple"
			  , d = {
				simple: c,
				tiled: "absolute" == a.tiling ? f : e
			};
			i = new d[b]({
				canvas: s,
				viewport: u,
				getWidth: Z,
				getHeight: $,
				url: a.url,
				zoomWidget: o,
				onBackgroundReady: a.onBackgroundReady,
				options: a,
				img: a.img,
				resolver: a.resolver
			})
		}
		,
		a.background && this.setBackground(a.background),
		this.getBackground = function() {
			return i
		}
	}
	;
	var c = function(a) {
		var b = a.canvas
		  , c = a.onBackgroundReady || function() {}
		  , d = new Image;
		d.onload = function() {
			b.style.backgroundImage = "url('" + d.src + "')",
			b.style.backgroundRepeat = "no-repeat",
			b.style.width = d.width + "px",
			b.style.height = d.height + "px",
			c(this)
		}
		,
		d.src = a.img ? a.img.src : a.url,
		this.owns = function(a) {
			return a == b
		}
		,
		this.getWidth = function() {
			return d.width || 0
		}
		,
		this.getHeight = function() {
			return d.height || 0
		}
		,
		this.setZoom = this.pan = function(a) {}
	}
	  , d = function(a) {
		var b = this
		  , c = a.canvas
		  , d = a.viewport;
		if (null == a.options.maxZoom)
			throw new TypeError("Parameter `maxZoom` not set; cannot initialize TiledBackground");
		if (!a.options.tileSize)
			throw new TypeError("Parameter `tileSize not set; cannot initialize TiledBackground. It should be an array of [x,y] values.");
		if (!a.options.width || !a.options.height)
			throw new TypeError("Parameters `width` and `height` must be set");
		for (var e = function(c) {
			var d = document.createElement("div");
			d.style.position = "relative",
			d.style.height = "100%",
			d.style.width = "100%",
			d.style.display = "none",
			a.canvas.appendChild(d),
			this.zoom = c;
			var e = b.getTileSpecs(c)
			  , f = []
			  , g = function(b, c, d) {
				return a.url.replace("{z}", b).replace("{x}", c).replace("{y}", d)
			}
			  , h = function(b, c, d) {
				return null == a.resolver ? g(b, c, d) : a.resolver(b, c, d)
			};
			this.apparentZoom = Math.min(e[2], e[3]),
			this.setActive = function(a) {
				d.style.display = a ? "block" : "none"
			}
			,
			this.xTiles = e[0],
			this.yTiles = e[1];
			for (var i = 0; i < this.xTiles; i++) {
				f[i] = f[i] || [];
				for (var j = 0; j < this.yTiles; j++) {
					var k = document.createElement("img");
					k._tiledBg = !0,
					k.className = "jtk-surface-tile",
					k.ondragstart = function() {
						return !1
					}
					,
					d.appendChild(k),
					k.style.position = "absolute",
					k.style.opacity = 0,
					f[i][j] = [k, new Image, !1]
				}
			}
			var l = Math.pow(2, a.options.maxZoom - c) * a.options.tileSize[0]
			  , m = Math.pow(2, a.options.maxZoom - c) * a.options.tileSize[1];
			this.scaledImageSize = l,
			this.scaledImageSizeH = m;
			var n = function(a, b, d, e) {
				a.style.left = d * l + "px",
				a.style.top = e * m + "px",
				a.style.width = l + "px",
				a.style.height = m + "px",
				b.onload = function() {
					a.setAttribute("src", b.src),
					a.style.opacity = 1
				}
				,
				b.src = h(c, d, e)
			};
			this.ensureLoaded = function(a, b, c, d) {
				for (var e = a; c >= e; e++)
					for (var g = b; d >= g; g++)
						null != f[e] && null != f[e][g] && (f[e][g][2] || (n(f[e][g][0], f[e][g][1], e, g),
						f[e][g][2] = !0))
			}
		}
		.bind(this), f = [], g = null , h = 0; h <= a.options.maxZoom; h++)
			f.push(new e(h));
		c.style.width = a.options.width + "px",
		c.style.height = a.options.height + "px";
		var i, j = function() {
			if (i <= f[0].apparentZoom)
				return 0;
			if (i >= f[f.length - 1].apparentZoom)
				return f.length - 1;
			for (var a = f.length - 1; a > 0; a--)
				if (f[a].apparentZoom >= i && i >= f[a - 1].apparentZoom)
					return a
		}, k = function(a) {
			var b = f[a];
			null != g && g != b && g.setActive(!1),
			b.setActive(!0),
			g = b
		}, l = function() {
			var b = a.zoomWidget.getApparentCanvasLocation()
			  , c = a.getWidth(d)
			  , e = a.getHeight(d)
			  , f = g.scaledImageSize * i
			  , h = g.scaledImageSizeH * i
			  , j = b[0] < 0 ? Math.floor(-b[0] / f) : b[0] < c ? 0 : null
			  , k = b[1] < 0 ? Math.floor(-b[1] / h) : b[1] < e ? 0 : null
			  , l = Math.min(g.xTiles, Math.floor((c - b[0]) / f))
			  , m = Math.min(g.yTiles, Math.floor((e - b[1]) / h));
			null != j && null != k && g.ensureLoaded(j, k, l, m)
		};
		this.getCurrentLayer = function() {
			return g
		}
		,
		this.getWidth = function() {
			return a.options.width
		}
		,
		this.getHeight = function() {
			return a.options.height
		}
		;
		var m = a.options.panDebounceTimeout || 50
		  , n = a.options.zoomDebounceTimeout || 120
		  , o = function(a, b) {
			b = b || 150;
			var c = null ;
			return function() {
				window.clearTimeout(c),
				c = window.setTimeout(a, b)
			}
		}
		  , p = function() {
			k(j()),
			l()
		}
		  , q = o(p, n)
		  , r = o(l, m);
		this.setZoom = function(a, b) {
			i = a,
			b ? p() : q()
		}
		,
		this.pan = r,
		this.owns = function(a) {
			return a == c || 1 == a._tiledBg
		}
		,
		this.setZoom(a.zoomWidget.getZoom(), !0),
		null != a.onBackgroundReady && setTimeout(a.onBackgroundReady, 0)
	}
	  , e = function(a) {
		var b = a.options.width
		  , c = a.options.height
		  , e = a.options.tileSize;
		this.getTileSpecs = function(a) {
			var d = b > c ? 1 : b / c
			  , f = c > b ? 1 : c / b
			  , g = Math.pow(2, a + 1) * e[0] * d
			  , h = Math.pow(2, a + 1) * e[1] * f
			  , i = Math.ceil(g / e[0])
			  , j = Math.ceil(h / e[1]);
			return [i, j, g / b, h / c]
		}
		,
		d.apply(this, arguments)
	}
	  , f = function(a) {
		var b = a.options.maxZoom
		  , c = a.options.width
		  , e = a.options.height
		  , f = a.options.tileSize;
		this.getTileSpecs = function(a) {
			var d = Math.pow(2, b - a)
			  , g = Math.ceil(c / d / f[0])
			  , h = Math.ceil(e / d / f[1]);
			return [g, h, g * f[0] / c, h * f[1] / e]
		}
		,
		d.apply(this, arguments)
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbToolkit
	  , c = b.Renderers
	  , d = a.jsPlumb
	  , e = a.jsPlumbUtil
	  , f = d.getSelector
	  , g = b.Classes
	  , h = b.Constants
	  , i = b.Events;
	c.Surface = function(a) {
		function j(a) {
			return null == a ? null : "string" == typeof a ? this.getRenderedConnection(a) : a.constructor == d.Connection ? a : l.getRenderedConnection(a.getId())
		}
		function k() {
			if (!m.jsPlumb.startEditing)
				throw new TypeError("Connection editors not available.")
		}
		var l = this;
		c.Surface.SELECT = h.select,
		c.Surface.PAN = h.pan,
		c.Surface.DISABLED = h.disabled;
		var m = c.AbstractRenderer.apply(this, arguments);
		c.DOMElementAdapter.apply(this, arguments),
		this.getObjectInfo = m.getObjectInfo,
		a = a || {};
		var n, o = d.getElement(a.container), p = c.createElement({
			position: h.relative,
			width: h.nominalSize,
			height: h.nominalSize,
			left: 0,
			top: 0,
			clazz: g.SURFACE_CANVAS
		}, o), q = !(a.elementsDraggable === !1), r = a.elementsDroppable === !0, s = a.dragOptions || {}, t = a.dropOptions || {}, u = a.stateHandle, v = a.storePositionsInModel !== !1, w = a.modelLeftAttribute, x = a.modelTopAttribute, y = new ZoomWidget({
			viewport: o,
			canvas: p,
			domElement: m.jsPlumb.getElement,
			addClass: m.jsPlumb.addClass,
			removeClass: m.jsPlumb.removeClass,
			offset: this.getOffset,
			consumeRightClick: a.consumeRightClick,
			bind: function() {
				m.jsPlumb.on.apply(m.jsPlumb, arguments)
			},
			unbind: function() {
				m.jsPlumb.off.apply(m.jsPlumb, arguments)
			},
			width: function(a) {
				return m.jsPlumb.getWidth(m.jsPlumb.getElement(a))
			},
			height: function(a) {
				return m.jsPlumb.getHeight(m.jsPlumb.getElement(a))
			},
			id: m.jsPlumb.getId,
			animate: function() {
				m.jsPlumb.animate.apply(m.jsPlumb, arguments)
			},
			dragEvents: {
				stop: d.dragEvents[h.stop],
				start: d.dragEvents[h.start],
				drag: d.dragEvents[h.drag]
			},
			background: a.background,
			padding: a.padding,
			panDistance: a.panDistance,
			enablePan: a.enablePan,
			enableWheelZoom: a.enableWheelZoom,
			wheelSensitivity: a.wheelSensitivity,
			wheelZoomMetaKey: a.wheelZoomMetaKey,
			enablePanButtons: a.enablePanButtons,
			enableAnimation: a.enableAnimation,
			clamp: a.clamp,
			clampZoom: a.clampZoom,
			clampToBackground: a.clampToBackground,
			clampToBackgroundExtents: a.clampToBackgroundExtents,
			zoom: a.zoom,
			zoomRange: a.zoomRange,
			extend: m.jsPlumb.extend,
			events: {
				pan: function(a, b, c, d, e) {
					l.fire(i.pan, {
						x: a,
						y: b,
						zoom: c,
						oldZoom: d,
						event: e
					})
				},
				zoom: function(a, b, c, d, e) {
					m.jsPlumb.setZoom(c),
					l.fire(i.zoom, {
						x: a,
						y: b,
						zoom: c,
						oldZoom: d,
						event: e
					})
				},
				mousedown: function() {
					d.addClass(o, g.SURFACE_PANNING),
					d.addClass(document.body, g.SELECT_DEFEAT)
				},
				mouseup: function() {
					d.removeClass(o, g.SURFACE_PANNING),
					d.removeClass(document.body, g.SELECT_DEFEAT)
				}
			}
		}), z = [], A = a.lassoSelectionFilter, B = a.autoExitSelectMode !== !1, C = new b.Widgets.Lasso({
			on: function() {
				m.jsPlumb.on.apply(m.jsPlumb, arguments)
			},
			off: function() {
				m.jsPlumb.off.apply(m.jsPlumb, arguments)
			},
			invert: a.lassoInvert,
			pageLocation: y.pageLocation,
			canvas: o,
			onStart: function() {
				l.setHoverSuspended(!0),
				z.length = 0
			},
			onSelect: function(a, b, c, d) {
				function e(a) {
					return a.el.jtk.node || a.el.jtk.group
				}
				var f = []
				  , g = y.findIntersectingNodes(a, b, !c[0]);
				m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(),
				m.toolkit.clearSelection(),
				d && z.length > 0 && m.toolkit.removeFromSelection(z);
				for (var h = 0; h < g.length; h++)
					(null == A || A(e(g[h])) !== !1) && (f.push(e(g[h])),
					m.jsPlumb.addToDragSelection && m.jsPlumb.addToDragSelection(g[h].el));
				z = f,
				m.toolkit.addToSelection(f, d)
			},
			onEnd: function() {
				l.setHoverSuspended(!1),
				B && l.setMode(h.pan)
			},
			filter: a.lassoFilter
		}), D = {
			pan: function() {
				C.setEnabled(!1),
				y.setEnabled(!0)
			},
			select: function() {
				m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(),
				C.setEnabled(!0),
				y.setEnabled(!1)
			},
			disabled: function() {
				m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(),
				C.setEnabled(!0),
				y.setEnabled(!1)
			}
		}, E = a.mode || h.pan;
		l.bind(i.relayout, function(a) {
			y.relayout(a, !0)
		}),
		l.bind(i.nodeRemoved, function(a) {
			y.remove(a.el)
		}),
		m.toolkit.bind(i.graphCleared, function() {
			y.reset()
		}),
		m.toolkit.bind(i.dataLoadStart, function() {
			y.setSuspendRendering(!0)
		}),
		m.toolkit.bind(i.dataLoadEnd, function() {
			y.setSuspendRendering(!1),
			n && n.setVisible(!0),
			a.zoomToFit && l.zoomToFit()
		}),
		m.toolkit.bind(i.groupMemberAdded, function(a) {
			var b = m.nodeMap[a.node.id];
			if (b) {
				var c = l.getJsPlumb().getGroup(a.group.id)
				  , d = l.getSize(c.getDragArea())
				  , e = l.getSize(b);
				l.setPosition(a.node.id, (d[0] - e[0]) / 2, (d[1] - e[1]) / 2),
				y.suspend(b),
				l.fire(i.groupMemberAdded, a),
				m.jsPlumb.addToGroup(a.group.id, b, !0)
			}
		}),
		m.toolkit.bind(i.groupMemberRemoved, function(a) {
			var b = m.nodeMap[a.node.id];
			b && (y.restore(b),
			l.fire(i.groupMemberRemoved, a),
			m.jsPlumb.removeFromGroup(a.group.id, b, !0))
		}),
		m.jsPlumb.setContainer(p),
		d.addClass(o, g.SURFACE),
		a.enablePan === !1 && d.addClass(o, g.SURFACE_NO_PAN);
		var F = function(a, b) {
			var c = function(a) {
				var c = a.srcElement || a.target;
				(c == o || c == p) && l.fire(b, a)
			};
			m.jsPlumb.on(p, a, c),
			m.jsPlumb.on(o, a, c)
		};
		F(i.tap, i.canvasClick),
		F(i.dblclick, i.canvasDblClick);
		var G = null ;
		m.makeDraggable = function(a, b) {
			if (q) {
				var c = d.getElement(a)
				  , f = m.jsPlumb.getId(c)
				  , j = m.jsPlumb.extend({}, s)
				  , k = d.dragEvents[h.stop]
				  , n = d.dragEvents[h.start]
				  , p = function(a) {
					var b = d.getDragObject(a)
					  , c = d.getElement(b);
					return {
						node: c.jtk.node,
						el: b
					}
				};
				null != b && m.jsPlumb.extend(j, b),
				j[n] = e.wrap(j[n], function() {
					G = y.getBoundsInfo();
					var a = p(arguments);
					a.elementId = f,
					a.pos = d.getAbsolutePosition(c),
					a.domEl = c,
					d.addClass(o, g.SURFACE_ELEMENT_DRAGGING),
					l.fire(i.nodeMoveStart, a)
				}),
				j[k] = e.wrap(j[k], function(a) {
					for (var b = function(b) {
						y.positionChanged(b[0]),
						d.removeClass(o, g.SURFACE_ELEMENT_DRAGGING);
						var c = {
							el: b[0],
							node: b[0].jtk.node || b[0].jtk.group,
							pos: [b[1].left, b[1].top],
							e: a.e,
							eventPosition: a.pos
						};
						l.getLayout().setPosition(c.node.id, c.pos[0], c.pos[1], !0),
						v !== !1 && (l.storePositionInModel({
							id: c.node.id,
							leftAttribute: w,
							topAttribute: x
						}),
						m.toolkit.fire("nodeUpdated", {
							node: c.node
						}, null )),
						l.fire(i.nodeMoveEnd, c)
					}, c = 0; c < a.selection.length; c++)
						b(a.selection[c])
				}),
				j.canDrag = function() {
					return !C.isActive()
				}
				,
				j.force = !0,
				m.jsPlumb.draggable(c, j, !1, m.jsPlumb)
			}
		}
		,
		m.makeDroppable = function(a, b) {
			if (r) {
				var c = d.getElement(a)
				  , f = (m.jsPlumb.getId(c),
				m.jsPlumb.extend({}, t));
				null != b && m.jsPlumb.extend(f, b),
				f.drop = e.wrap(f.drop, function(a) {
					var b = {
						source: a.drag.el.jtk.node,
						sourceElement: a.drag.el,
						target: a.drop.el.jtk.node,
						targetElement: a.drop.el,
						e: a.e
					};
					l.fire(i.nodeDropped, b)
				}),
				m.jsPlumb.droppable(c, f)
			}
		}
		,
		m.doImport = function(b) {
			a.jsPlumbInstance.setContainer(p);
			var c = a.jsPlumbInstance.getManagedElements();
			for (var d in c) {
				var e = c[d].el;
				H(e, d)
			}
		}
		;
		var H = this.importNode = function(b, c) {
			var e = a.jsPlumbInstance.getOffset(b)
			  , f = a.jsPlumbInstance.getId(b);
			b.style.left = e.left + h.px,
			b.style.top = e.top + h.px,
			d.addClass(b, g.NODE),
			y.add(b, f, [e.left, e.top], !1),
			this.getLayout().setPosition(c, e.left, e.top),
			d.isAlreadyDraggable(b) && m.makeDraggable(b),
			m.nodeMap[c] = b,
			m.reverseNodeMap[f] = b.jtk.node,
			null != n && n.registerNode({
				el: b,
				node: b.jtk.node,
				pos: d.getAbsolutePosition(b)
			})
		}
		.bind(this);
		this.zoomToFit = y.zoomToFit,
		this.zoomToFitIfNecessary = y.zoomToFitIfNecessary,
		this.zoomToSelection = function(a) {
			a = a || {};
			var b = a.selection || m.toolkit.getSelection()
			  , c = [];
			b.eachNode(function(a, b) {
				c.push(m.getElement(b.id))
			}),
			c.length > 0 && y.zoomToElements({
				elements: c,
				fill: a.fill
			})
		}
		,
		this.zoomToBackground = y.zoomToBackground,
		this.centerOn = function(a, b) {
			var c = this.getObjectInfo(a);
			c && c.el && y.centerOn(c.el, b)
		}
		,
		this.centerOnHorizontally = function(a) {
			this.centerOn(a, {
				vertical: !1
			})
		}
		,
		this.centerOnVertically = function(a) {
			this.centerOn(a, {
				horizontal: !1
			})
		}
		,
		this.centerOnAndZoom = function(a, b) {
			var c = this.getObjectInfo(a);
			c && c.el && y.centerOnAndZoom(c.el, b)
		}
		,
		this.centerContent = y.centerContent,
		this.centerContentHorizontally = y.centerContentHorizontally,
		this.centerContentVertically = y.centerContentVertically,
		this.getViewportCenter = y.getViewportCenter,
		this.setViewportCenter = y.setViewportCenter,
		this.setStateHandle = function(a) {
			u = a
		}
		,
		this.getStateHandle = function() {
			return u
		}
		,
		this.setLassoSelectionFilter = function(a) {
			A = a
		}
		,
		this.getApparentCanvasLocation = y.getApparentCanvasLocation,
		this.setApparentCanvasLocation = y.setApparentCanvasLocation,
		this.getBoundsInfo = y.getBoundsInfo,
		this.setZoom = y.setZoom,
		this.setZoomRange = y.setZoomRange,
		this.getZoomRange = y.getZoomRange,
		this.getZoom = y.getZoom,
		this.nudgeZoom = y.nudgeZoom,
		this.nudgeWheelZoom = y.nudgeWheelZoom,
		this.pageLocation = y.pageLocation,
		this.getPan = y.getPan,
		this.pan = y.pan,
		this.setPan = y.setPan,
		this.startEditing = function(a, b) {
			k();
			var c = j(a);
			null != c && m.jsPlumb.startEditing(c, b)
		}
		,
		this.stopEditing = function(a) {
			k();
			var b = j(a);
			null != b && m.jsPlumb.stopEditing(b)
		}
		,
		this.clearEdits = function(a) {
			k();
			var b = j(a);
			null != b && m.jsPlumb.clearEdits(b)
		}
		,
		this.setPanAndZoom = function(a, b, c, d) {
			this.setPan(a, b, !d),
			this.setZoom(c, !d)
		}
		,
		this.setPanFilter = function(a) {
			y.setFilter(a ? function(b, c) {
				return "function" == typeof a ? a.apply(a, [c]) : e.matchesSelector(b, a)
			}
			: null )
		}
		,
		this.setWheelFilter = function(a) {
			y.setWheelFilter(function(b) {
				if (a) {
					var c = b.srcElement || b.target;
					return !e.matchesSelector(c, a)
				}
				return !0
			})
		}
		,
		this.setWheelFilter(a.wheelFilter),
		this.setPanFilter(a.panFilter),
		this.mapLocation = y.mapLocation,
		this.mapEventLocation = y.mapEventLocation,
		this.findNearbyNodes = y.findNearbyNodes,
		this.findIntersectingNodes = y.findIntersectingNodes,
		this.isInViewport = y.isInViewport,
		this.positionElementAt = y.positionElementAt,
		this.positionElementAtEventLocation = y.positionElementAtEventLocation,
		this.positionElementAtPageLocation = y.positionElementAtPageLocation,
		this.setFilter = y.setFilter,
		this.floatElement = y.floatElement,
		this.fixElement = y.fixElement;
		var I = this.setPosition
		  , J = this.animateToPosition
		  , K = function(a, b, c) {
			a && (y.positionChanged(a.el, [b, c]),
			l.fire(i.nodeMoveEnd, {
				el: a.el,
				id: a.id,
				pos: [b, c],
				node: a.obj || (a.el.jtk ? a.el.jtk.node || a.el.jtk.group : {}),
				bounds: y.getBoundsInfo()
			}))
		};
		this.setPosition = function(a, b, c, d) {
			var e = I.apply(this, arguments);
			K(e, b, c)
		}
		,
		this.animateToPosition = function(a, b, c, d) {
			var e = J.apply(this, arguments);
			K(e, b, c)
		}
		,
		this.tracePath = function(a) {
			var b = a.path || function() {
				var b = m.getObjectInfo(a.source)
				  , c = m.getObjectInfo(a.target);
				return m.toolkit.getPath({
					source: b,
					target: c
				})
			}();
			if (b.exists()) {
				for (var c = function(b, c) {
					this.fire(b, {
						edge: c.edge,
						connection: c,
						options: a.options
					})
				}
				.bind(this), e = [], f = null , g = null , h = b.path.path.length, i = 1; h > i; i++) {
					var j = b.path.path[i].vertex.id
					  , k = b.path.previous[j]
					  , l = !0
					  , n = b.path.path[i].edge;
					null != k && (l = k === n.source),
					f = m.getConnectionForEdge(n),
					g = f.animateOverlay(a.overlay, d.extend(a.options || {}, {
						previous: g,
						isFinal: i === h - 1,
						forwards: l
					})),
					e.push({
						handler: g,
						connection: f
					})
				}
				return e.length > 0 && (e[0].handler.bind(jsPlumbToolkit.Events.startOverlayAnimation, function() {
					c(jsPlumbToolkit.Events.startOverlayAnimation, e[0].connection)
				}),
				e[e.length - 1].handler.bind(jsPlumbToolkit.Events.endOverlayAnimation, function() {
					c(jsPlumbToolkit.Events.endOverlayAnimation, e[e.length - 1].connection)
				})),
				!0
			}
			return m.toolkit.isDebugEnabled() && jsPlumbUtil.log("Cannot trace non existent path"),
			!1
		}
		,
		this.getNodePositions = function() {
			var a = {}
			  , b = y.getElementPositions();
			for (var c in b) {
				var d = m.getNodeForElementId(c) || m.getGroupForElementId(c);
				d && (a[d.id] = [b[c][0][0], b[c][0][1]])
			}
			return a
		}
		,
		this.append = function(a, b, c, d) {
			p.appendChild(a),
			c && (c = [c.left, c.top]),
			y.add(a, b, c, d)
		}
		,
		this.nodeAppendedToGroup = function(a, b, c) {
			y.suspend(a)
		}
		,
		this.nodeRemovedFromGroup = function(a) {
			y.restore(a)
		}
		;
		var L = this.setLayout;
		this.setLayout = function(a, b) {
			L.apply(this, [a, b]),
			n && n.setHostLayout(this.getLayout())
		}
		;
		for (var M = function(a) {
			m.jsPlumb.on(p, a, ".jtk-node, .jtk-node *", function(b) {
				var c = b.srcElement || b.target;
				if (null == c && (b = d.getOriginalEvent(b),
				c = b.srcElement || b.target),
				null != c && c.jtk) {
					var e = d.extend({
						e: b,
						el: c
					}, c.jtk);
					l.fire(a, e, b)
				}
			})
		}, N = 0; N < c.mouseEvents.length; N++)
			M(c.mouseEvents[N]);
		m.toolkit.bind(h.select, function(a) {
			if (a.obj.objectType == h.nodeType || a.obj.objectType == h.groupType) {
				var b = m.getElement(a.obj.id);
				b && (d.addClass(b, g.SURFACE_SELECTED_ELEMENT),
				m.jsPlumb.addToDragSelection && m.jsPlumb.addToDragSelection(b))
			} else if (a.obj.objectType == h.edgeType) {
				var c = m.getConnectionForEdge(a.obj);
				c && c.addClass(g.SURFACE_SELECTED_CONNECTION)
			}
		}),
		m.toolkit.bind(i.selectionCleared, function() {
			m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(),
			d.removeClass(f("." + g.SURFACE_SELECTED_CONNECTION), g.SURFACE_SELECTED_CONNECTION),
			d.removeClass(f("." + g.SURFACE_SELECTED_ELEMENT), g.SURFACE_SELECTED_ELEMENT)
		}),
		m.toolkit.bind(i.deselect, function(a) {
			if (a.obj.objectType == h.nodeType) {
				var b = m.getElement(a.obj.id);
				b && (d.removeClass(b, g.SURFACE_SELECTED_ELEMENT),
				m.jsPlumb.removeFromDragSelection && m.jsPlumb.removeFromDragSelection(b))
			} else if (a.obj.objectType == h.edgeType) {
				var c = m.getConnectionForEdge(a.obj);
				c && c.removeClass(g.SURFACE_SELECTED_CONNECTION)
			}
		});
		var O = this.setOffset;
		this.setOffset = function(a, b) {
			O.apply(this, arguments),
			y.positionChanged(a, [b.left, b.top])
		}
		,
		this.setMode = function(a, b, c) {
			if (!D[a])
				throw new TypeError("Surface: unknown mode '" + a + "'");
			E = a,
			D[a](),
			a !== h.select || b || m.toolkit.clearSelection(),
			c && a === h.select && c.lassoSelectionFilter && (A = c.lassoSelectionFilter),
			l.fire(i.modeChanged, a)
		}
		;
		var P = function(a, b) {
			var c = d.extend({}, a);
			c.source = m.getObjectInfo(a.source).obj,
			c.target = m.getObjectInfo(a.target).obj,
			c.element = m.getObjectInfo(a.element).obj;
			var e = m.toolkit[b](c)
			  , f = m.getConnectionsForEdges(e);
			return m.jsPlumb.select({
				connections: f
			})
		};
		this.selectEdges = function(a) {
			return P(a, "getEdges")
		}
		,
		this.selectAllEdges = function(a) {
			return P(a, "getAllEdges")
		}
		,
		this.repaint = function(a) {
			var b = m.getObjectInfo(a);
			b.el && (m.jsPlumb.recalculateOffsets(b.el),
			m.jsPlumb.revalidate(m.jsPlumb.getId(b.el)),
			l.fire(i.objectRepainted, b))
		}
		,
		this.repaintEverything = m.jsPlumb.repaintEverything,
		this.setElementsDraggable = function(a) {
			q = a !== !1
		}
		;
		var Q = function(a) {
			function b(a) {
				m.jsPlumb.hasClass(a, g.SURFACE_DROPPABLE_NODE) || (m.jsPlumb.addClass(a, g.SURFACE_DROPPABLE_NODE),
				m.jsPlumb.initDraggable(a, p, h.surfaceNodeDragScope, m.jsPlumb))
			}
			if (!(a && (a.droppables || a.source && a.selector || a.allowNative === !0)))
				throw new TypeError("Cannot configure droppables: you must specify either `droppables`, `source` + `selector` or `allowNative:true`");
			var c, f = a.dataGenerator || function() {
				return {}
			}
			, j = a.typeExtractor, k = a.locationSetter || function(a, b, c) {
				c.left = a,
				c.top = b
			}
			, n = a.droppables ? a.droppables : a.source ? a.source.querySelectorAll(a.selector) : [], p = a.dragOptions || {}, q = a.dropOptions || {}, r = "scope_" + (new Date).getTime(), s = function(b, c, d) {
				var e = !0;
				if (a.drop && (e = a.drop.apply(this, arguments) !== !1),
				e) {
					var g = m.jsPlumb.getDragObject(arguments)
					  , h = l.getJsPlumb().getOffset(d ? C : g, !0)
					  , i = y.mapLocation(h.left, h.top)
					  , n = j ? j(g, b, d, i) : null
					  , o = f ? f(n, g, b, i) : {}
					  , p = "true" === g.getAttribute("jtk-group");
					o = o || {};
					var q = l.getObjectInfo(b.e.srcElement || b.e.target);
					if (null != n && (o.type = n),
					null != q && !p && "Group" === q.type) {
						var r = l.getJsPlumb().getGroup(q.id)
						  , s = l.getOffset(r ? r.getDragArea() : q.el);
						i.left -= s.left,
						i.top -= s.top
					}
					k(i.left, i.top, o),
					p ? m.toolkit.getGroupFactory()(n, o, function(c) {
						var d = m.toolkit.addGroup(c, {
							position: i
						});
						a.onDrop && a.onDrop(d, b, i)
					}, b, d) : m.toolkit.getNodeFactory()(n, o, function(c) {
						var d = m.toolkit.addNode(c, {
							position: i
						});
						null != q.obj && "Group" === q.type && (m.toolkit.addToGroup(d, q.obj),
						l.repaint(d)),
						a.onDrop && a.onDrop(d, b, i)
					}, b, d)
				}
			}, t = d.dragEvents[h.start], u = d.dragEvents[h.drag], v = d.dragEvents[h.stop], w = d.dragEvents[h.drop], x = function() {}, z = a.nativeFilter || [], A = a.allowNative, B = {};
			if (p[t] = e.wrap(p[t], a.start || x),
			p[u] = e.wrap(p[u], a.drag || x),
			p[v] = e.wrap(p[v], a.stop || x),
			q.scope = r,
			q[w] = e.wrap(q[w], s),
			A) {
				var C = document.createElement(h.div);
				for (C.style.position = h.absolute,
				c = 0; c < z.length; c++)
					B[z[c]] = !0;
				var D = function(a) {
					return null != a.dataTransfer && 1 === a.dataTransfer.items.length ? 0 == z.length || B[a.dataTransfer.items[0].type] : !1
				};
				document.addEventListener(i.dragover, function(a) {
					a.stopPropagation(),
					a.preventDefault(),
					D(a) && (d.setAbsolutePosition(C, [a.pageX, a.pageY]),
					p[u].apply(null , [a, {
						helper: C,
						offset: {
							left: a.pageX,
							top: a.pageY
						}
					}, !0]))
				}, !1),
				document.addEventListener(i.drop, function(a) {
					a.stopPropagation(),
					a.preventDefault(),
					D(a) && (q[w].apply(null , [a, {
						helper: C,
						offset: {
							left: a.pageX,
							top: a.pageY
						}
					}, !0]),
					p[v].apply(null ))
				}, !1),
				document.addEventListener(i.dragend, function(a) {})
			}
			for (m.jsPlumb.initDroppable(o, q, h.surfaceNodeDragScope),
			p.scope = r,
			p.ignoreZoom = !0,
			p.doNotRemoveHelper = !0,
			c = 0; c < n.length; c++) {
				var E = m.jsPlumb.getElement(n[c]);
				b(E)
			}
			return {
				refresh: function() {
					if (!a.source || !a.selector)
						throw new TypeError("Cannot refresh droppables; `source` and `selector` required in constructor.");
					for (var c = a.source.querySelectorAll(a.selector), d = 0; d < c.length; d++)
						b(c[d])
				}
			}
		};
		this.registerDroppableNodes = function(a) {
			return new Q(a)
		}
		,
		this.createMiniview = function(a) {
			if (null != n) {
				var c = m.jsPlumb.getId(m.jsPlumb.getElement(a.container));
				if (n.getContainerId() == c)
					return !1
			}
			var e = d.extend({
				surface: l,
				toolkit: m.toolkit,
				surfaceContainerElement: o,
				bounds: y.getBoundsInfo(),
				visible: a.initiallyVisible !== !1 || m.toolkit.getNodeCount() > 0,
				layout: {
					type: h.mistletoeLayoutType,
					parameters: {
						layout: l.getLayout()
					}
				},
				typeFunction: a.typeFunction
			}, a);
			n = new b.Renderers.Miniview(e);
			for (var f in m.nodeMap) {
				var g = m.nodeMap[f];
				n.registerNode({
					el: g,
					node: g.jtk.node,
					pos: d.getAbsolutePosition(g)
				})
			}
			for (var f in m.groupMap) {
				var g = m.groupMap[f];
				n.registerNode({
					el: g,
					node: g.jtk.group,
					pos: d.getAbsolutePosition(g)
				})
			}
			return n
		}
		,
		a.miniview && this.createMiniview(a.miniview),
		this.getMiniview = function() {
			return n
		}
		;
		var R = function(a, b, c) {
			var d = m.getObjectInfo(b)
			  , e = null ;
			if (d.el && ("Port" === !d.obj.objectType || !function() {
				var a = l.getRenderedEndpoint(d.obj);
				return a ? (e = a.setEnabled(c),
				!0) : void 0
			}())) {
				var f = "set" + a + "Enabled";
				e = m.jsPlumb[f](d.el, c)
			}
			return e
		};
		this.setTargetEnabled = R.bind(this, "Target"),
		this.setSourceEnabled = R.bind(this, "Source"),
		this.setEnabled = function(a, b) {
			this.setTargetEnabled(a, b),
			this.setSourceEnabled(a, b)
		}
		,
		this.State = {
			save: function(a, c) {
				if (a = 2 == arguments.length ? arguments[0] : 1 == arguments.length && "string" == typeof arguments[0] ? arguments[0] : u,
				c = 2 == arguments.length ? arguments[1] : 1 == arguments.length && "function" == typeof arguments[0] ? arguments[0] : function(a, b) {
					return b(a)
				}
				,
				a)
					try {
						c(l.State.serialize(), function(c) {
							b.util.Storage.set(h.jtkStatePrefix + a, c)
						})
					} catch (d) {
						e.log(g.msgCannotSaveState, d)
					}
			},
			serialize: function() {
				var a = y.getPan();
				a.push(y.getZoom()),
				a.push.apply(a, y.getTransformOrigin());
				var b = a.join(",")
				  , c = l.getLayout().getPositions()
				  , d = [];
				for (var e in c)
					d.push(e + " " + c[e][0] + " " + c[e][1]);
				return b += "," + d.join("|")
			},
			restore: function(a, c) {
				if (a = 2 == arguments.length ? arguments[0] : 1 == arguments.length && "string" == typeof arguments[0] ? arguments[0] : u,
				c = 2 == arguments.length ? arguments[1] : 1 == arguments.length && "function" == typeof arguments[0] ? arguments[0] : function(a, b) {
					return b(a)
				}
				,
				a)
					try {
						var d = b.util.Storage.get(h.jtkStatePrefix + a);
						d && c(d, l.State.deserialize)
					} catch (f) {
						e.log(g.msgCannotRestoreState, f)
					}
			},
			deserialize: function(a) {
				for (var b = a.split(","), c = b[5].split("|"), d = l.getLayout(), e = 0; e < c.length; e++) {
					var f = c[e].split(" ");
					try {
						l.setPosition(f[0], parseFloat(f[1]), parseFloat(f[2]))
					} catch (g) {}
				}
				d.draw()
			},
			clear: function(a) {
				a = a || u,
				a && b.util.Storage.clear(h.jtkStatePrefix + a)
			},
			clearAll: function() {
				b.util.Storage.clearAll()
			}
		},
		l.saveState = l.State.save,
		l.store = b.util.Storage.set,
		l.retrieve = b.util.Storage.get,
		l.storeJSON = b.util.Storage.setJSON,
		l.retrieveJSON = b.util.Storage.getJSON,
		l.restoreState = function(a) {
			l.State.restore(a),
			l.getJsPlumb().repaintEverything(),
			l.fire(i.stateRestored)
		}
		,
		l.clearState = function(a) {
			l.state.clear(a)
		}
		,
		l.initialize(),
		a.zoomToFitIfNecessary ? l.zoomToFitIfNecessary() : a.zoomToFit && l.zoomToFit()
	}
	,
	b.DefaultRendererType = h.surfaceType
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbToolkit
	  , c = b.Renderers
	  , d = a.jsPlumbUtil
	  , e = a.jsPlumb
	  , f = b.Classes
	  , g = b.Constants
	  , h = b.Events
	  , i = b.Attributes
	  , j = b.Methods;
	c.Miniview = function(a) {
		function b(a) {
			if (o && z && !t) {
				s = o.getBoundsInfo();
				var b = o.getApparentCanvasLocation()
				  , c = z.getApparentCanvasLocation()
				  , d = z.getZoom()
				  , f = d / s.zoom;
				r.style.width = s.vw + g.px,
				r.style.height = s.vh + g.px,
				z.applyZoomToElement(r, f);
				var h = [b[0] * f, b[1] * f];
				n = [c[0] - h[0], c[1] - h[1]],
				e.setAbsolutePosition(r, n)
			}
		}
		function k(a) {
			if (null != z) {
				s = o.getBoundsInfo(),
				a = a || e.getAbsolutePosition(r);
				var b = z.getApparentCanvasLocation()
				  , c = z.getZoom()
				  , d = c / s.zoom
				  , f = (b[0] - a[0]) / d
				  , g = (b[1] - a[1]) / d
				  , h = o.setApparentCanvasLocation(f, g);
				return [b[0] - h[0] * d, b[1] - h[1] * d]
			}
		}
		this.bindToolkitEvents = !1;
		var l = c.AbstractRenderer.apply(this, arguments)
		  , m = this;
		c.DOMElementAdapter.apply(this, arguments);
		var n, o = a.surface, p = e.getElement(a.container), q = c.createElement({
			position: g.relative,
			width: g.nominalSize,
			height: g.nominalSize,
			left: 0,
			top: 0,
			clazz: f.MINIVIEW_CANVAS
		}, p), r = c.createElement({
			position: g.absolute,
			width: g.nominalSize,
			height: g.nominalSize,
			left: 0,
			top: 0,
			clazz: f.MINIVIEW_PANNER
		}, p), s = a.bounds, t = a.suspended === !0, u = a.collapsible !== !1, v = a.typeFunction, w = null , x = !1, y = a.wheelSensitivity || 10, z = new ZoomWidget({
			viewport: p,
			canvas: q,
			domElement: e.getElement,
			offset: this.getOffset,
			bind: function() {
				l.jsPlumb.on.apply(l.jsPlumb, arguments)
			},
			unbind: function() {
				l.jsPlumb.off.apply(l.jsPlumb, arguments)
			},
			enableWheelZoom: !1,
			enablePanButtons: !1,
			enablePan: !1,
			enableAnimation: !1,
			width: function(a) {
				return l.jsPlumb.getWidth(l.jsPlumb.getElement(a))
			},
			height: function(a) {
				return l.jsPlumb.getHeight(l.jsPlumb.getElement(a))
			},
			id: l.jsPlumb.getId,
			animate: l.jsPlumb.animate,
			dragEvents: {
				stop: e.dragEvents[g.stop],
				start: e.dragEvents[g.start],
				drag: e.dragEvents[g.drag]
			},
			extend: e.extend,
			events: {
				pan: function() {
					k()
				},
				mousedown: function() {
					e.addClass(r, f.MINIVIEW_PANNING)
				},
				mouseup: function() {
					e.removeClass(r, f.MINIVIEW_PANNING)
				}
			},
			zoomRange: [-(1 / 0), 1 / 0]
		}), A = !1, B = null , C = null , D = !1, E = a.elementFilter || function() {
			return !0
		}
		, F = function(a) {
			A = !0,
			B = z.pageLocation(a),
			C = e.getAbsolutePosition(r),
			e.on(document, h.mouseup, H),
			e.on(document, h.mousemove, G),
			d.consume(a)
		}, G = function(a) {
			if (D = !1,
			A) {
				var b = z.pageLocation(a)
				  , c = b[0] - B[0]
				  , d = b[1] - B[1]
				  , f = [C[0] + c, C[1] + d];
				k(f);
				e.setAbsolutePosition(r, f)
			}
		}, H = function(a) {
			A = !1,
			B = null ,
			e.off(document, h.mouseup, H),
			e.off(document, h.mousemove, G)
		}, I = !0, J = function(a) {
			d.consume(a),
			o.nudgeWheelZoom(a.normalizedWheelDelta * y, a)
		};
		e.on(window, h.resize, jsPlumbToolkitUtil.debounce(function() {
			b()
		}, 100)),
		a.enableWheelZoom !== !1 && addWheelListener(p, J),
		z.setTransformOriginForElement(r, [0, 0]),
		e.addClass(p, f.MINIVIEW),
		e.on(r, h.mousedown, F),
		u && (w = e.createElement("div"),
		w.className = f.MINIVIEW_COLLAPSE,
		p.appendChild(w),
		e.on(w, g.click, function(a) {
			x = !x,
			e[x ? j.addClass : j.removeClass](p, f.MINIVIEW_COLLAPSED),
			K(!0)
		}));
		var K = function(a) {
			z.zoomToFit({
				onComplete: b,
				onStep: b,
				doNotFirePanEvent: a
			})
		};
		a.toolkit.bind(h.dataLoadEnd, K);
		var L = function(a) {
			var b = a.node || a.group;
			b && E(b) === !1 || (s = a.bounds,
			z.positionChanged(a.el, a.pos),
			e.setAbsolutePosition(a.el || l.nodeMap[(a.node || a.group).id], a.pos),
			K(!0),
			this.fire(h.nodeMoveEnd, a))
		}
		.bind(this)
		  , M = function(a, b) {
			for (var c = a.getNodes(), d = 0; d < c.length; d++) {
				var e = l.nodeMap[c[d].id];
				e && b.appendChild(e)
			}
		}
		  , N = function(a, d) {
			if (!a.node || E(a.node) !== !1) {
				var h = e.getSize(a.el)
				  , j = c.createElement({
					position: g.absolute,
					width: h[0] + g.px,
					height: h[1] + g.px,
					left: 0,
					top: 0,
					clazz: f.MINIVIEW_ELEMENT + (d ? " " + d : "")
				});
				if (v && j.setAttribute("jtk-miniview-type", v(a.node)),
				j.relatedElement = a.el,
				j.jtk = a.node,
				s = o.getBoundsInfo(),
				j.setAttribute(i.jtkNodeId, a.node.id),
				j.setAttribute(i.relatedNodeId, a.el.getAttribute(g.id)),
				q.appendChild(j),
				z.add(j),
				l.nodeMap[(a.node || a.group).id] = j,
				a.group)
					M(a.group, j);
				else if (a.node.group) {
					var k = l.nodeMap[a.node.group.id];
					k && (k.appendChild(j),
					z.suspend(a.el))
				}
				m.getLayout().map(a.node.id, j),
				b()
			}
		};
		this.registerNode = function(a) {
			N(a, "Group" === a.node.objectType ? f.MINIVIEW_GROUP_ELEMENT : ""),
			L(a)
		}
		;
		var O = this.setOffset;
		this.setOffset = function(a, b) {
			O.apply(this, arguments),
			z.positionChanged(a, [b.left, b.top])
		}
		;
		var P = this.setAbsolutePosition;
		this.setAbsolutePosition = function(a, b) {
			P.call(this, a, b),
			z.positionChanged(a, b)
		}
		,
		this.setVisible = function(a) {
			I = a,
			p.style.display = a ? g.block : g.none
		}
		,
		this.setVisible(a.visible !== !1),
		this.getPan = z.getPan;
		var Q = function(a, b) {
			for (var c = a.getNodes(), d = 0; d < c.length; d++)
				l.nodeMap[c[d].id].style.display = b ? "block" : "none"
		}
		  , R = function(a) {
			var c = l.nodeMap[a.id];
			if (c) {
				var d = e.getSize(c.relatedElement);
				c.style.width = d[0] + g.px,
				c.style.height = d[1] + g.px,
				b(),
				v && c.setAttribute("jtk-miniview-type", v(a.obj))
			}
		};
		this.invalidate = function(a) {
			if (a)
				R({
					id: a
				});
			else
				for (var b in l.nodeMap)
					R({
						id: b
					})
		}
		,
		this.setSuspended = function(a, b) {
			t = a,
			b && this.update()
		}
		,
		this.update = b;
		var S = function(a) {
			var c = a.node
			  , d = l.nodeMap[c];
			d && (z.remove(d),
			delete l.nodeMap[c],
			l.jsPlumb.removeElement(d)),
			a.dontUpdatePanner || b()
		}
		  , T = function() {
			for (var a in l.nodeMap)
				S({
					node: a,
					dontUpdatePanner: !0
				});
			b()
		};
		o.bind(h.pan, b),
		o.bind(h.zoom, b),
		o.bind(h.nodeMoveEnd, L),
		o.bind(h.nodeRemoved, S),
		o.bind(h.nodeAdded, N),
		o.bind(h.nodeRendered, N),
		o.bind(h.groupMoveEnd, L),
		o.bind(h.groupAdded, function(a) {
			N(a, f.MINIVIEW_GROUP_ELEMENT)
		}),
		o.bind(h.groupMoveEnd, L),
		o.bind(h.groupMemberAdded, function(a) {
			var b = l.nodeMap[a.group.id]
			  , c = l.nodeMap[a.node.id];
			b && c && b.appendChild(c)
		}),
		o.bind(h.groupMemberRemoved, function(a) {
			var b = l.nodeMap[a.node.id];
			b && q.appendChild(b)
		}),
		o.bind(h.groupCollapse, function(a) {
			Q(a.group, !1),
			R({
				id: a.group.id
			})
		}),
		o.bind(h.groupExpand, function(a) {
			Q(a.group, !0),
			R({
				id: a.group.id
			})
		}),
		o.bind(h.relayout, b),
		o.bind(h.objectRepainted, R),
		o.bind(h.stateRestored, b),
		a.toolkit.bind(h.graphCleared, T);
		var U = function() {
			K(!0)
		};
		m.getLayout().bind(h.redraw, U),
		this.setHostLayout = function(a) {
			var b = m.getLayout();
			b && b.setHostLayout(a)
		}
		,
		this.setZoom = z.setZoom,
		this.getZoom = z.getZoom,
		this.getTransformOrigin = z.getTransformOrigin
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this
	  , b = a.jsPlumbToolkit
	  , c = b.Widgets
	  , d = a.jsPlumbUtil
	  , e = "ontouchstart"in document.documentElement
	  , f = e ? "touchstart" : "mousedown"
	  , g = e ? "touchend" : "mouseup"
	  , h = e ? "touchmove" : "mousemove"
	  , i = function(a, b) {
		a.style.width = b[0] + "px",
		a.style.height = b[1] + "px"
	}
	  , j = {
		SELECT_DEFEAT: "jtk-lasso-select-defeat",
		LASSO: "jtk-lasso",
		LASSO_MASK: "jtk-lasso-mask",
		LASSO_MASK_LEFT: "jtk-lasso-mask-left",
		LASSO_MASK_TOP: "jtk-lasso-mask-top",
		LASSO_MASK_RIGHT: "jtk-lasso-mask-right",
		LASSO_MASK_BOTTOM: "jtk-lasso-mask-bottom"
	}
	  , k = {
		SELECT_START: "onselectstart"
	}
	  , l = function() {};
	c.Lasso = function(a) {
		var b, c = a.canvas, e = !1, m = {}, n = [0, 0], o = a.onStart || l, p = a.onEnd || l, q = a.onSelect || l, r = !1, s = !1, t = a.invert === !0, u = function(a, c) {
			if (t) {
				var d = window.innerWidth
				  , e = window.innerHeight
				  , f = window.scrollX
				  , g = window.scrollY
				  , h = e - a[1] + g
				  , j = e - h + c[1]
				  , k = d - a[0] + f
				  , l = d - k + c[0];
				m.top.style.bottom = h + "px",
				m.bottom.style.top = j + "px",
				m.left.style.right = k + "px",
				m.right.style.left = l + "px",
				m.top.style.left = d - k + "px",
				m.top.style.right = d - l + "px",
				m.bottom.style.left = d - k + "px",
				m.bottom.style.right = d - l + "px"
			} else
				jsPlumb.setAbsolutePosition(b, a),
				i(b, c)
		}, v = function(a) {
			var c = a ? "block" : "none";
			t ? (m.top.style.display = c,
			m.left.style.display = c,
			m.right.style.display = c,
			m.bottom.style.display = c) : b.style.display = c,
			jsPlumb[a ? "addClass" : "removeClass"](document.body, j.SELECT_DEFEAT)
		}, w = function(b) {
			e && !A(b) && (d.consume(b),
			r = !0,
			a.on(document, g, y),
			a.on(document, h, x),
			a.on(document, k.SELECT_START, z),
			n = a.pageLocation(b),
			u(n, [1, 1]),
			o(n, b.shiftKey))
		}, x = function(b) {
			if (r) {
				s || (v(!0),
				s = !0),
				d.consume(b);
				var c = a.pageLocation(b)
				  , e = [Math.abs(c[0] - n[0]), Math.abs(c[1] - n[1])]
				  , f = [Math.min(n[0], c[0]), Math.min(n[1], c[1])];
				u(f, e),
				q(f, e, [n[0] < c[0], n[1] < c[1]], b.shiftKey)
			}
		}, y = function(b) {
			r && (r = !1,
			s = !1,
			d.consume(b),
			a.off(document, g, y),
			a.off(document, h, x),
			a.off(document, k.SELECT_START, z),
			v(!1),
			p())
		}, z = function() {
			return !1
		}, A = a.filter ? function(b) {
			var c = b.srcElement || b.target;
			return d.matchesSelector(c, a.filter)
		}
		: function() {
			return !1
		}
		, B = function(a) {
			var b = document.createElement("div");
			return b.className = a.join(" "),
			document.body.appendChild(b),
			b
		}, C = function() {
			m.top = B([j.LASSO_MASK, j.LASSO_MASK_TOP]),
			m.bottom = B([j.LASSO_MASK, j.LASSO_MASK_BOTTOM]),
			m.left = B([j.LASSO_MASK, j.LASSO_MASK_LEFT]),
			m.right = B([j.LASSO_MASK, j.LASSO_MASK_RIGHT])
		};
		t ? C() : b = B([j.LASSO]),
		a.on(c, f, w),
		this.isActive = function() {
			return r
		}
		,
		this.setEnabled = function(a) {
			e = a
		}
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a, b, c, d, e, f, g, h, i, j, k, l, m, n = this, o = n.jsPlumb, p = n.Rotors, q = {}, r = {
		ok: "OK",
		cancel: "Cancel"
	}, s = document.body, t = !1, u = p.newInstance({
		templateResolver: function(a) {
			return x[a] || document.getElementById(a).innerHTML
		}
	}), v = {}, w = !0, x = {};
	o.ready(function() {
		b = document.createElement("div"),
		b.className = "jtk-dialog-underlay",
		o.on(b, "click", function() {
			L(!0)
		}),
		c = document.createElement("div"),
		c.className = "jtk-dialog-overlay",
		d = document.createElement("div"),
		d.className = "jtk-dialog-title",
		c.appendChild(d),
		e = document.createElement("div"),
		e.className = "jtk-dialog-content",
		c.appendChild(e),
		f = document.createElement("div"),
		f.className = "jtk-dialog-buttons",
		c.appendChild(f)
	});
	var y = function() {
		f.innerHTML = "",
		l = document.createElement("button"),
		l.className = "jtk-dialog-button jtk-dialog-button-ok",
		l.innerHTML = r.ok,
		f.appendChild(l),
		o.on(l, "click", function() {
			L()
		}),
		m = document.createElement("button"),
		m.className = "jtk-dialog-button jtk-dialog-button-cancel",
		m.innerHTML = r.cancel,
		f.appendChild(m),
		o.on(m, "click", function() {
			L(!0)
		})
	}
	  , z = {
		x: function(a, b, d) {
			var e = s.clientWidth
			  , f = (e - d[0]) / 2
			  , g = window.pageXOffset || a.scrollLeft || document.body.scrollLeft;
			0 > f && (f = 10),
			g = b ? g : s.scrollLeft,
			c.style.left = f + g + "px"
		},
		y: function(a, b, d) {
			var e = s.clientHeight
			  , f = .1 * e
			  , g = window.pageYOffset || a.scrollTop || document.body.scrollTop;
			0 > f && (f = 10),
			g = b ? g : s.scrollTop,
			c.style.top = f + g + "px"
		}
	}
	  , A = function() {
		if (t) {
			var a = document.documentElement
			  , d = o.getSize(c)
			  , e = s == document.body
			  , f = c.getAttribute("data-axis");
			b.style.position = e ? "fixed" : "absolute",
			z[f](a, e, d)
		}
	}
	  , B = function(a) {
		27 == a.keyCode && L(!0)
	}
	  , C = function(a) {
		return null == a ? document.body : "string" == typeof a ? document.getElementById(a) : a
	}
	  , D = function(a) {
		if (a.id && q[a.id]) {
			w = a.reposition !== !1,
			g = a.onOK,
			h = a.onCancel,
			i = a.onOpen,
			j = a.onMaybeClose,
			k = a.onClose;
			var f = a.position || "top"
			  , n = "jtk-dialog-overlay-" + f
			  , p = "top" === f || "bottom" === f ? "x" : "y"
			  , x = "jtk-dialog-overlay-" + p;
			y(),
			l.innerHTML = a.labels ? a.labels.ok || r.ok : r.ok,
			m.innerHTML = a.labels ? a.labels.cancel || r.cancel : r.cancel,
			s = C(a.container);
			var z = a.data || {}
			  , D = u.template(a.id, z);
			d.innerHTML = a.title || q[a.id].title || "",
			e.innerHTML = "";
			for (var F = D.childNodes.length, G = 0; F > G; G++)
				e.appendChild(D.childNodes[0]);
			s.appendChild(b),
			s.appendChild(c),
			o.addClass(c, n),
			o.addClass(c, x),
			b.style.display = "block",
			c.style.display = "block",
			c.setAttribute("data-position", f),
			c.setAttribute("data-axis", p),
			m.style.visibility = q[a.id].cancelable ? "visible" : "hidden",
			t = !0,
			A(),
			E(z),
			v.onOpen && v.onOpen(c),
			i && i(c),
			o.addClass(c, "jtk-dialog-overlay-visible"),
			o.on(document, "keyup", B),
			w && (o.on(window, "resize", A),
			o.on(window, "scroll", A)),
			o.on(c, "click", "[jtk-clear]", function(a) {
				var b = this.getAttribute("jtk-att");
				b && I(c.querySelectorAll("[jtk-att='" + b + "']:not([jtk-clear])"), this)
			}),
			o.on(c, "click", "[jtk-clear-all]", function(a) {
				I(c.querySelectorAll("[jtk-att]:not([jtk-clear])"), this)
			});
			try {
				var H = e.querySelector("[jtk-focus]");
				H && setTimeout(function() {
					H.focus()
				}, 0)
			} catch (J) {}
		}
	}
	  , E = function(a) {
		for (var b = e.querySelectorAll("[jtk-att]"), c = 0; c < b.length; c++) {
			var d = b[c].tagName.toUpperCase()
			  , f = "INPUT" === d ? (b[c].getAttribute("type") || "TEXT").toUpperCase() : d
			  , g = b[c].getAttribute("jtk-att")
			  , h = u.data(a, g);
			null != h && F[f](b[c], h),
			b[c].getAttribute("jtk-commit") && ("INPUT" === d ? o.on(b[c], "keyup", function(a) {
				(10 == a.keyCode || 13 == a.keyCode) && L()
			}) : "TEXTAREA" === d && o.on(b[c], "keyup", function(a) {
				!a.ctrlKey || 10 != a.keyCode && 13 != a.keyCode || L()
			}))
		}
	}
	  , F = {
		TEXT: function(a, b) {
			a.value = b
		},
		RADIO: function(a, b) {
			a.checked = a.value == b
		},
		CHECKBOX: function(a, b) {
			a.checked = 1 == b
		},
		SELECT: function(a, b) {
			for (var c = 0; c < a.options.length; c++)
				if (a.options[c].value == b)
					return void (a.selectedIndex = c)
		},
		TEXTAREA: function(a, b) {
			a.value = b
		}
	}
	  , G = {
		TEXT: function(a) {
			return a.value
		},
		RADIO: function(a) {
			return a.checked ? a.value : void 0
		},
		CHECKBOX: function(a) {
			return a.checked ? !0 : void 0
		},
		SELECT: function(a) {
			return -1 != a.selectedIndex ? a.options[a.selectedIndex].value : null
		},
		TEXTAREA: function(a) {
			return a.value
		}
	}
	  , H = {
		TEXT: function(a) {
			a.value = ""
		},
		RADIO: function(a) {
			a.checked = !1
		},
		CHECKBOX: function(a) {
			a.checked = !1
		},
		SELECT: function(a) {
			a.selectedIndex = -1
		},
		TEXTAREA: function(a) {
			a.value = ""
		}
	}
	  , I = function(a, b) {
		for (var c = 0; c < a.length; c++)
			if (a[c] !== b) {
				var d = a[c].tagName.toUpperCase()
				  , e = "INPUT" === d ? (a[c].getAttribute("type") || "TEXT").toUpperCase() : d
				  , f = H[e];
				f && f(a[c])
			}
	}
	  , J = function() {
		for (var a = e.querySelectorAll("[jtk-att]"), b = {}, c = 0; c < a.length; c++) {
			var d = a[c].tagName.toUpperCase()
			  , f = "INPUT" === d ? (a[c].getAttribute("type") || "TEXT").toUpperCase() : d
			  , g = G[f](a[c])
			  , h = a[c].getAttribute("jtk-att");
			if (null != g) {
				var i = u.data(b, h);
				null != i ? (jsPlumbUtil.isArray(i) || u.data(b, h, [i]),
				i.push(g)) : u.data(b, h, g)
			}
		}
		return b
	}
	  , K = function(a, b) {
		try {
			null != a && a.apply(a, Array.prototype.slice.apply(arguments, [1]))
		} catch (c) {}
	}
	  , L = function(d) {
		var f = d ? null : J();
		(d || null == j || j(f) !== !1) && (t = !1,
		b.style.display = "none",
		c.style.display = "none",
		o.off(document, "keyup", B),
		o.off(window, "resize", A),
		o.off(window, "scroll", A),
		o.removeClass(c, "jtk-dialog-overlay-visible"),
		o.removeClass(c, "jtk-dialog-overlay-top"),
		o.removeClass(c, "jtk-dialog-overlay-bottom"),
		o.removeClass(c, "jtk-dialog-overlay-left"),
		o.removeClass(c, "jtk-dialog-overlay-right"),
		o.removeClass(c, "jtk-dialog-overlay-x"),
		o.removeClass(c, "jtk-dialog-overlay-y"),
		c.setAttribute("data-position", ""),
		c.setAttribute("data-axis", ""),
		s.removeChild(b),
		s.removeChild(c),
		l.parentNode.removeChild(l),
		m.parentNode.removeChild(m),
		d ? (K(v.onCancel, e),
		K(h, e)) : (K(v.onOK, f, e),
		K(g, f, e)),
		K(v.onClose),
		K(k),
		g = h = i = k = j = a = null )
	};
	n.jsPlumbToolkit.Dialogs = {
		initialize: function(a) {
			if (a = a || {},
			q = {},
			a.dialogs)
				for (var b in a.dialogs)
					x[b] = a.dialogs[b][0],
					q[b] = {
						content: x[b],
						title: a.dialogs[b][1] || "",
						cancelable: a.dialogs[b][2] !== !1
					};
			else
				for (var c = a.selector || ".jtk-dialog", d = o.getSelector(c), e = 0; e < d.length; e++) {
					var f = d[e].getAttribute("id");
					null != f && (q[f] = {
						content: d[e].innerHTML,
						title: d[e].getAttribute("title") || "",
						el: d[e],
						cancelable: "false" !== d[e].getAttribute("cancel")
					})
				}
			a.labels && o.extend(r, a.labels),
			a.globals && o.extend(v, a.globals)
		},
		show: D,
		hide: function() {
			L(!0)
		},
		clear: I
	}
}
.call("undefined" != typeof window ? window : this),
function() {
	"use strict";
	var a = this;
	a.jsPlumbToolkit.DrawingTools = function(a) {
		var b, c, d, e, f, g, h, i, j, k = a.renderer, l = k.getToolkit(), m = k.getJsPlumb(), n = {}, o = a.widthAttribute || "w", p = a.heightAttribute || "h", q = a.leftAttribute || "left", r = a.topAttribute || "top", s = function() {
			for (var a in n) {
				var b = n[a];
				b[0] && b[0].parentNode && b[0].parentNode.removeChild(b[0]),
				delete n[a]
			}
		}, t = function(a, b, c, d) {
			var e = document.createElement(a);
			if (b && (e.className = b),
			c && c.appendChild(e),
			d)
				for (var f in d)
					e.setAttribute(f, d[f]);
			return e
		}, u = function(a) {
			var b = n[a];
			b && b[0] && b[0].parentNode && b[0].parentNode.removeChild(b[0]),
			delete n[a]
		}, v = function(a, b) {
			var c = b.getRenderedNode(a.id);
			return u(a.id),
			c
		}, w = function(a, b) {
			var c = v(a, b);
			if (null != c) {
				var d = t("div", "jtk-draw-skeleton", c)
				  , e = c.getAttribute("jtk-x-resize")
				  , f = c.getAttribute("jtk-y-resize");
				t("div", "jtk-draw-drag", d),
				t("div", "jtk-draw-handle jtk-draw-handle-tl", d, {
					"data-dir": "tl",
					"data-node-id": a.id
				}),
				t("div", "jtk-draw-handle jtk-draw-handle-tr", d, {
					"data-dir": "tr",
					"data-node-id": a.id
				}),
				t("div", "jtk-draw-handle jtk-draw-handle-bl", d, {
					"data-dir": "bl",
					"data-node-id": a.id
				}),
				t("div", "jtk-draw-handle jtk-draw-handle-br", d, {
					"data-dir": "br",
					"data-node-id": a.id
				}),
				n[a.id] = [d, "false" !== e, "false" !== f]
			}
		}, x = function(a, d, e, f) {
			var k = {};
			return k[o] = b ? e : h - g,
			k[p] = c ? f : j - i,
			k[q] = b ? a : g,
			k[r] = c ? d : i,
			k
		}, y = {
			tl: function(a, b) {
				var c = g + a
				  , d = i + b
				  , e = h - c
				  , f = j - d;
				return c >= h && (e = c - h,
				c = h),
				d >= j && (f = d - j,
				d = j),
				x(c, d, e, f)
			},
			tr: function(a, b) {
				var c = h - g + a
				  , d = i + b
				  , e = j - d
				  , f = g;
				return 0 >= c && (f = g + c,
				c *= -1),
				d >= j && (e = d - j,
				d = j),
				x(f, d, c, e)
			},
			bl: function(a, b) {
				var c = g + a
				  , d = j - i + b
				  , e = h - c
				  , f = i;
				return c >= h && (e = c - h,
				c = h),
				0 >= d && (f += d,
				d *= -1),
				x(c, f, e, d)
			},
			br: function(a, b) {
				var c = h - g + a
				  , d = j - i + b
				  , e = g
				  , f = i;
				return 0 >= c && (e = g + c,
				c *= -1),
				0 >= d && (f += d,
				d *= -1),
				x(e, f, c, d)
			}
		};
		l.bind("selectionCleared", function() {
			s()
		}),
		l.bind("select", function(a) {
			w(a.obj, k)
		}),
		l.bind("deselect", function(a) {
			v(a.obj, k)
		});
		var z = function(a) {
			var b = k.mapEventLocation(a)
			  , c = b.left - d.left
			  , g = b.top - d.top
			  , h = e(c, g, "");
			l.updateNode(f, h),
			k.setPosition(f, h[q], h[r], !0)
		}
		  , A = function(a) {
			k.storePositionInModel(f.id),
			m.removeClass(document.body, "jtk-drag-select-defeat"),
			m.off(document, "mousemove", z),
			m.off(document, "mouseup", A),
			jsPlumbUtil.consume(a)
		};
		m.on(document, "mousedown", ".jtk-draw-handle", function(a) {
			var o = this.getAttribute("data-dir")
			  , p = this.getAttribute("data-node-id");
			f = l.getNode(p),
			b = n[p][1],
			c = n[p][2],
			d = k.mapEventLocation(a);
			var q = k.getCoordinates(f);
			g = q.x,
			i = q.y,
			h = g + q.w,
			j = i + q.h,
			e = y[o],
			m.addClass(document.body, "jtk-drag-select-defeat"),
			m.on(document, "mousemove", z),
			m.on(document, "mouseup", A)
		})
	}
}
.call("undefined" != typeof window ? window : this);
