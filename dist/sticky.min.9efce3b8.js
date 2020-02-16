// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/vendors/general/sticky-js/dist/sticky.min.js":[function(require,module,exports) {
var define;
function _classCallCheck(t, i) {
  if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var Sticky = function () {
  function t() {
    var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    _classCallCheck(this, t), this.selector = i, this.elements = [], this.version = "1.2.0", this.vp = this.getViewportSize(), this.body = document.querySelector("body"), this.options = {
      wrap: e.wrap || !1,
      marginTop: e.marginTop || 0,
      stickyFor: e.stickyFor || 0,
      stickyClass: e.stickyClass || null,
      stickyContainer: e.stickyContainer || "body"
    }, this.updateScrollTopPosition = this.updateScrollTopPosition.bind(this), this.updateScrollTopPosition(), window.addEventListener("load", this.updateScrollTopPosition), window.addEventListener("scroll", this.updateScrollTopPosition), this.run();
  }

  return t.prototype.run = function () {
    var t = this,
        i = setInterval(function () {
      if ("complete" === document.readyState) {
        clearInterval(i);
        var e = document.querySelectorAll(t.selector);
        t.forEach(e, function (i) {
          return t.renderElement(i);
        });
      }
    }, 10);
  }, t.prototype.renderElement = function (t) {
    var i = this;
    t.sticky = {}, t.sticky.active = !1, t.sticky.marginTop = parseInt(t.getAttribute("data-margin-top")) || this.options.marginTop, t.sticky.stickyFor = parseInt(t.getAttribute("data-sticky-for")) || this.options.stickyFor, t.sticky.stickyClass = t.getAttribute("data-sticky-class") || this.options.stickyClass, t.sticky.wrap = !!t.hasAttribute("data-sticky-wrap") || this.options.wrap, t.sticky.stickyContainer = this.options.stickyContainer, t.sticky.container = this.getStickyContainer(t), t.sticky.container.rect = this.getRectangle(t.sticky.container), t.sticky.rect = this.getRectangle(t), "img" === t.tagName.toLowerCase() && (t.onload = function () {
      return t.sticky.rect = i.getRectangle(t);
    }), t.sticky.wrap && this.wrapElement(t), this.activate(t);
  }, t.prototype.wrapElement = function (t) {
    t.insertAdjacentHTML("beforebegin", "<span></span>"), t.previousSibling.appendChild(t);
  }, t.prototype.activate = function (t) {
    t.sticky.rect.top + t.sticky.rect.height < t.sticky.container.rect.top + t.sticky.container.rect.height && t.sticky.stickyFor < this.vp.width && !t.sticky.active && (t.sticky.active = !0), this.elements.indexOf(t) < 0 && this.elements.push(t), t.sticky.resizeEvent || (this.initResizeEvents(t), t.sticky.resizeEvent = !0), t.sticky.scrollEvent || (this.initScrollEvents(t), t.sticky.scrollEvent = !0), this.setPosition(t);
  }, t.prototype.initResizeEvents = function (t) {
    var i = this;
    t.sticky.resizeListener = function () {
      return i.onResizeEvents(t);
    }, window.addEventListener("resize", t.sticky.resizeListener);
  }, t.prototype.destroyResizeEvents = function (t) {
    window.removeEventListener("resize", t.sticky.resizeListener);
  }, t.prototype.onResizeEvents = function (t) {
    this.vp = this.getViewportSize(), t.sticky.rect = this.getRectangle(t), t.sticky.container.rect = this.getRectangle(t.sticky.container), t.sticky.rect.top + t.sticky.rect.height < t.sticky.container.rect.top + t.sticky.container.rect.height && t.sticky.stickyFor < this.vp.width && !t.sticky.active ? t.sticky.active = !0 : (t.sticky.rect.top + t.sticky.rect.height >= t.sticky.container.rect.top + t.sticky.container.rect.height || t.sticky.stickyFor >= this.vp.width && t.sticky.active) && (t.sticky.active = !1), this.setPosition(t);
  }, t.prototype.initScrollEvents = function (t) {
    var i = this;
    t.sticky.scrollListener = function () {
      return i.onScrollEvents(t);
    }, window.addEventListener("scroll", t.sticky.scrollListener);
  }, t.prototype.destroyScrollEvents = function (t) {
    window.removeEventListener("scroll", t.sticky.scrollListener);
  }, t.prototype.onScrollEvents = function (t) {
    t.sticky.active && this.setPosition(t);
  }, t.prototype.setPosition = function (t) {
    this.css(t, {
      position: "",
      width: "",
      top: "",
      left: ""
    }), this.vp.height < t.sticky.rect.height || !t.sticky.active || (t.sticky.rect.width || (t.sticky.rect = this.getRectangle(t)), t.sticky.wrap && this.css(t.parentNode, {
      display: "block",
      width: t.sticky.rect.width + "px",
      height: t.sticky.rect.height + "px"
    }), 0 === t.sticky.rect.top && t.sticky.container === this.body ? this.css(t, {
      position: "fixed",
      top: t.sticky.rect.top + "px",
      left: t.sticky.rect.left + "px",
      width: t.sticky.rect.width + "px"
    }) : this.scrollTop > t.sticky.rect.top - t.sticky.marginTop ? (this.css(t, {
      position: "fixed",
      width: t.sticky.rect.width + "px",
      left: t.sticky.rect.left + "px"
    }), this.scrollTop + t.sticky.rect.height + t.sticky.marginTop > t.sticky.container.rect.top + t.sticky.container.offsetHeight ? (t.sticky.stickyClass && t.classList.remove(t.sticky.stickyClass), this.css(t, {
      top: t.sticky.container.rect.top + t.sticky.container.offsetHeight - (this.scrollTop + t.sticky.rect.height) + "px"
    })) : (t.sticky.stickyClass && t.classList.add(t.sticky.stickyClass), this.css(t, {
      top: t.sticky.marginTop + "px"
    }))) : (t.sticky.stickyClass && t.classList.remove(t.sticky.stickyClass), this.css(t, {
      position: "",
      width: "",
      top: "",
      left: ""
    }), t.sticky.wrap && this.css(t.parentNode, {
      display: "",
      width: "",
      height: ""
    })));
  }, t.prototype.update = function () {
    var t = this;
    this.forEach(this.elements, function (i) {
      i.sticky.rect = t.getRectangle(i), i.sticky.container.rect = t.getRectangle(i.sticky.container), t.activate(i), t.setPosition(i);
    });
  }, t.prototype.destroy = function () {
    var t = this;
    this.forEach(this.elements, function (i) {
      t.destroyResizeEvents(i), t.destroyScrollEvents(i), delete i.sticky;
    });
  }, t.prototype.getStickyContainer = function (t) {
    for (var i = t.parentNode; !i.hasAttribute("data-sticky-container") && !i.parentNode.querySelector(t.sticky.stickyContainer) && i !== this.body;) {
      i = i.parentNode;
    }

    return i;
  }, t.prototype.getRectangle = function (t) {
    this.css(t, {
      position: "",
      width: "",
      top: "",
      left: ""
    });
    var i = Math.max(t.offsetWidth, t.clientWidth, t.scrollWidth),
        e = Math.max(t.offsetHeight, t.clientHeight, t.scrollHeight),
        s = 0,
        o = 0;

    do {
      s += t.offsetTop || 0, o += t.offsetLeft || 0, t = t.offsetParent;
    } while (t);

    return {
      top: s,
      left: o,
      width: i,
      height: e
    };
  }, t.prototype.getViewportSize = function () {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    };
  }, t.prototype.updateScrollTopPosition = function () {
    this.scrollTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;
  }, t.prototype.forEach = function (t, i) {
    for (var e = 0, s = t.length; e < s; e++) {
      i(t[e]);
    }
  }, t.prototype.css = function (t, i) {
    for (var e in i) {
      i.hasOwnProperty(e) && (t.style[e] = i[e]);
    }
  }, t;
}();

!function (t, i) {
  "undefined" != typeof exports ? module.exports = i : "function" == typeof define && define.amd ? define([], i) : t.Sticky = i;
}(this, Sticky);
},{}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50869" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/vendors/general/sticky-js/dist/sticky.min.js"], null)
//# sourceMappingURL=/sticky.min.9efce3b8.js.map