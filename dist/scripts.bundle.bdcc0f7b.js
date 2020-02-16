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
})({"assets/demo/demo3/base/scripts.bundle.js":[function(require,module,exports) {
"use strict";
/**
 * @class KUtil  base utilize class that privides helper functions
 */
// Polyfill
// matches polyfill

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

this.Element && function (ElementPrototype) {
  ElementPrototype.matches = ElementPrototype.matches || ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.msMatchesSelector || function (selector) {
    var node = this,
        nodes = (node.parentNode || node.document).querySelectorAll(selector),
        i = -1;

    while (nodes[++i] && nodes[i] != node) {
      ;
    }

    return !!nodes[i];
  };
}(Element.prototype); // closest polyfill

this.Element && function (ElementPrototype) {
  ElementPrototype.closest = ElementPrototype.closest || function (selector) {
    var el = this;

    while (el.matches && !el.matches(selector)) {
      el = el.parentNode;
    }

    return el.matches ? el : null;
  };
}(Element.prototype); // matches polyfill

this.Element && function (ElementPrototype) {
  ElementPrototype.matches = ElementPrototype.matches || ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.msMatchesSelector || function (selector) {
    var node = this,
        nodes = (node.parentNode || node.document).querySelectorAll(selector),
        i = -1;

    while (nodes[++i] && nodes[i] != node) {
      ;
    }

    return !!nodes[i];
  };
}(Element.prototype); //
// requestAnimationFrame polyfill by Erik Möller.
//  With fixes from Paul Irish and Tino Zijdel
//
//  http://paulirish.com/2011/requestanimationframe-for-smart-animating/
//  http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
//
//  MIT license
//

(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
})(); // Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md


(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }

    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]); // Global variables 


window.KUtilElementDataStore = {};
window.KUtilElementDataStoreID = 0;
window.KUtilDelegatedEventHandlers = {};

var KUtil = function () {
  var resizeHandlers = [];
  /** @type {object} breakpoints The device width breakpoints **/

  var breakpoints = {
    sm: 544,
    // Small screen / phone           
    md: 768,
    // Medium screen / tablet            
    lg: 1024,
    // Large screen / desktop        
    xl: 1200 // Extra large screen / wide desktop

  };
  /**
   * Handle window resize event with some 
   * delay to attach event handlers upon resize complete 
   */

  var _windowResizeHandler = function _windowResizeHandler() {
    var _runResizeHandlers = function _runResizeHandlers() {
      // reinitialize other subscribed elements
      for (var i = 0; i < resizeHandlers.length; i++) {
        var each = resizeHandlers[i];
        each.call();
      }
    };

    var timeout = false; // holder for timeout id

    var delay = 250; // delay after event is "complete" to run callback

    window.addEventListener('resize', function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        _runResizeHandlers();
      }, delay); // wait 50ms until window resize finishes.
    });
  };

  return {
    /**
     * Class main initializer.
     * @param {object} options.
     * @returns null
     */
    //main function to initiate the theme
    init: function init(options) {
      if (options && options.breakpoints) {
        breakpoints = options.breakpoints;
      }

      _windowResizeHandler();
    },

    /**
     * Adds window resize event handler.
     * @param {function} callback function.
     */
    addResizeHandler: function addResizeHandler(callback) {
      resizeHandlers.push(callback);
    },

    /**
     * Removes window resize event handler.
     * @param {function} callback function.
     */
    removeResizeHandler: function removeResizeHandler(callback) {
      for (var i = 0; i < resizeHandlers.length; i++) {
        if (callback === resizeHandlers[i]) {
          delete resizeHandlers[i];
        }
      }
    },

    /**
     * Trigger window resize handlers.
     */
    runResizeHandlers: function runResizeHandlers() {
      _runResizeHandlers();
    },
    resize: function resize() {
      if (typeof Event === 'function') {
        // modern browsers
        window.dispatchEvent(new Event('resize'));
      } else {
        // for IE and other old browsers
        // causes deprecation warning on modern browsers
        var evt = window.document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
      }
    },

    /**
     * Get GET parameter value from URL.
     * @param {string} paramName Parameter name.
     * @returns {string}  
     */
    getURLParam: function getURLParam(paramName) {
      var searchString = window.location.search.substring(1),
          i,
          val,
          params = searchString.split("&");

      for (i = 0; i < params.length; i++) {
        val = params[i].split("=");

        if (val[0] == paramName) {
          return unescape(val[1]);
        }
      }

      return null;
    },

    /**
     * Checks whether current device is mobile touch.
     * @returns {boolean}  
     */
    isMobileDevice: function isMobileDevice() {
      return this.getViewPort().width < this.getBreakpoint('lg') ? true : false;
    },

    /**
     * Checks whether current device is desktop.
     * @returns {boolean}  
     */
    isDesktopDevice: function isDesktopDevice() {
      return KUtil.isMobileDevice() ? false : true;
    },

    /**
     * Gets browser window viewport size. Ref:
     * http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
     * @returns {object}  
     */
    getViewPort: function getViewPort() {
      var e = window,
          a = 'inner';

      if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
      }

      return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
      };
    },

    /**
     * Checks whether given device mode is currently activated.
     * @param {string} mode Responsive mode name(e.g: desktop,
     *     desktop-and-tablet, tablet, tablet-and-mobile, mobile)
     * @returns {boolean}  
     */
    isInResponsiveRange: function isInResponsiveRange(mode) {
      var breakpoint = this.getViewPort().width;

      if (mode == 'general') {
        return true;
      } else if (mode == 'desktop' && breakpoint >= this.getBreakpoint('lg') + 1) {
        return true;
      } else if (mode == 'tablet' && breakpoint >= this.getBreakpoint('md') + 1 && breakpoint < this.getBreakpoint('lg')) {
        return true;
      } else if (mode == 'mobile' && breakpoint <= this.getBreakpoint('md')) {
        return true;
      } else if (mode == 'desktop-and-tablet' && breakpoint >= this.getBreakpoint('md') + 1) {
        return true;
      } else if (mode == 'tablet-and-mobile' && breakpoint <= this.getBreakpoint('lg')) {
        return true;
      } else if (mode == 'minimal-desktop-and-below' && breakpoint <= this.getBreakpoint('xl')) {
        return true;
      }

      return false;
    },

    /**
     * Generates unique ID for give prefix.
     * @param {string} prefix Prefix for generated ID
     * @returns {boolean}  
     */
    getUniqueID: function getUniqueID(prefix) {
      return prefix + Math.floor(Math.random() * new Date().getTime());
    },

    /**
     * Gets window width for give breakpoint mode.
     * @param {string} mode Responsive mode name(e.g: xl, lg, md, sm)
     * @returns {number}  
     */
    getBreakpoint: function getBreakpoint(mode) {
      return breakpoints[mode];
    },

    /**
     * Checks whether object has property matchs given key path.
     * @param {object} obj Object contains values paired with given key path
     * @param {string} keys Keys path seperated with dots
     * @returns {object}  
     */
    isset: function isset(obj, keys) {
      var stone;
      keys = keys || '';

      if (keys.indexOf('[') !== -1) {
        throw new Error('Unsupported object path notation.');
      }

      keys = keys.split('.');

      do {
        if (obj === undefined) {
          return false;
        }

        stone = keys.shift();

        if (!obj.hasOwnProperty(stone)) {
          return false;
        }

        obj = obj[stone];
      } while (keys.length);

      return true;
    },

    /**
     * Gets highest z-index of the given element parents
     * @param {object} el jQuery element object
     * @returns {number}  
     */
    getHighestZindex: function getHighestZindex(el) {
      var elem = KUtil.get(el),
          position,
          value;

      while (elem && elem !== document) {
        // Ignore z-index if position is set to a value where z-index is ignored by the browser
        // This makes behavior of this function consistent across browsers
        // WebKit always returns auto if the element is positioned
        position = KUtil.css(elem, 'position');

        if (position === "absolute" || position === "relative" || position === "fixed") {
          // IE returns 0 when zIndex is not specified
          // other browsers return a string
          // we ignore the case of nested elements with an explicit value of 0
          // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
          value = parseInt(KUtil.css(elem, 'z-index'));

          if (!isNaN(value) && value !== 0) {
            return value;
          }
        }

        elem = elem.parentNode;
      }

      return null;
    },

    /**
     * Checks whether the element has any parent with fixed positionfreg
     * @param {object} el jQuery element object
     * @returns {boolean}  
     */
    hasFixedPositionedParent: function hasFixedPositionedParent(el) {
      while (el && el !== document) {
        position = KUtil.css(el, 'position');

        if (position === "fixed") {
          return true;
        }

        el = el.parentNode;
      }

      return false;
    },

    /**
     * Simulates delay
     */
    sleep: function sleep(milliseconds) {
      var start = new Date().getTime();

      for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
          break;
        }
      }
    },

    /**
     * Gets randomly generated integer value within given min and max range
     * @param {number} min Range start value
     * @param {number} min Range end value
     * @returns {number}  
     */
    getRandomInt: function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Checks whether Angular library is included
     * @returns {boolean}  
     */
    isAngularVersion: function isAngularVersion() {
      return window.Zone !== undefined ? true : false;
    },
    // jQuery Workarounds
    // Deep extend:  $.extend(true, {}, objA, objB);
    deepExtend: function deepExtend(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj) continue;

        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (_typeof(obj[key]) === 'object') out[key] = KUtil.deepExtend(out[key], obj[key]);else out[key] = obj[key];
          }
        }
      }

      return out;
    },
    // extend:  $.extend({}, objA, objB); 
    extend: function extend(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i]) continue;

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
        }
      }

      return out;
    },
    get: function get(query) {
      var el;

      if (query === document) {
        return document;
      }

      if (!!(query && query.nodeType === 1)) {
        return query;
      }

      if (el = document.getElementById(query)) {
        return el;
      } else if (el = document.getElementsByTagName(query)) {
        return el[0];
      } else if (el = document.getElementsByClassName(query)) {
        return el[0];
      } else {
        return null;
      }
    },
    getByID: function getByID(query) {
      if (!!(query && query.nodeType === 1)) {
        return query;
      }

      return document.getElementById(query);
    },
    getByClass: function getByClass(query) {
      var el;

      if (el = document.getElementsByClassName(query)) {
        return el[0];
      } else {
        return null;
      }
    },

    /**
     * Checks whether the element has given classes
     * @param {object} el jQuery element object
     * @param {string} Classes string
     * @returns {boolean}  
     */
    hasClasses: function hasClasses(el, classes) {
      if (!el) {
        return;
      }

      var classesArr = classes.split(" ");

      for (var i = 0; i < classesArr.length; i++) {
        if (KUtil.hasClass(el, KUtil.trim(classesArr[i])) == false) {
          return false;
        }
      }

      return true;
    },
    hasClass: function hasClass(el, className) {
      if (!el) {
        return;
      }

      return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
    },
    addClass: function addClass(el, className) {
      if (!el || typeof className === 'undefined') {
        return;
      }

      var classNames = className.split(' ');

      if (el.classList) {
        for (var i = 0; i < classNames.length; i++) {
          if (classNames[i] && classNames[i].length > 0) {
            el.classList.add(KUtil.trim(classNames[i]));
          }
        }
      } else if (!KUtil.hasClass(el, className)) {
        for (var i = 0; i < classNames.length; i++) {
          el.className += ' ' + KUtil.trim(classNames[i]);
        }
      }
    },
    removeClass: function removeClass(el, className) {
      if (!el || typeof className === 'undefined') {
        return;
      }

      var classNames = className.split(' ');

      if (el.classList) {
        for (var i = 0; i < classNames.length; i++) {
          el.classList.remove(KUtil.trim(classNames[i]));
        }
      } else if (KUtil.hasClass(el, className)) {
        for (var i = 0; i < classNames.length; i++) {
          el.className = el.className.replace(new RegExp('\\b' + KUtil.trim(classNames[i]) + '\\b', 'g'), '');
        }
      }
    },
    triggerCustomEvent: function triggerCustomEvent(el, eventName, data) {
      if (window.CustomEvent) {
        var event = new CustomEvent(eventName, {
          detail: data
        });
      } else {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, data);
      }

      el.dispatchEvent(event);
    },
    triggerEvent: function triggerEvent(node, eventName) {
      // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
      var doc;

      if (node.ownerDocument) {
        doc = node.ownerDocument;
      } else if (node.nodeType == 9) {
        // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
        doc = node;
      } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
      }

      if (node.dispatchEvent) {
        // Gecko-style approach (now the standard) takes more work
        var eventClass = ""; // Different events have different event classes.
        // If this switch statement can't map an eventName to an eventClass,
        // the event firing is going to fail.

        switch (eventName) {
          case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.

          case "mouseenter":
          case "mouseleave":
          case "mousedown":
          case "mouseup":
            eventClass = "MouseEvents";
            break;

          case "focus":
          case "change":
          case "blur":
          case "select":
            eventClass = "HTMLEvents";
            break;

          default:
            throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
            break;
        }

        var event = doc.createEvent(eventClass);
        var bubbles = eventName == "change" ? false : true;
        event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.

        event.synthetic = true; // allow detection of synthetic events
        // The second parameter says go ahead with the default action

        node.dispatchEvent(event, true);
      } else if (node.fireEvent) {
        // IE-old school style
        var event = doc.createEventObject();
        event.synthetic = true; // allow detection of synthetic events

        node.fireEvent("on" + eventName, event);
      }
    },
    index: function index(elm) {
      elm = KUtil.get(elm);
      var c = elm.parentNode.children,
          i = 0;

      for (; i < c.length; i++) {
        if (c[i] == elm) return i;
      }
    },
    trim: function trim(string) {
      return string.trim();
    },
    eventTriggered: function eventTriggered(e) {
      if (e.currentTarget.dataset.triggered) {
        return true;
      } else {
        e.currentTarget.dataset.triggered = true;
        return false;
      }
    },
    remove: function remove(el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    },
    find: function find(parent, query) {
      parent = KUtil.get(parent);

      if (parent) {
        return parent.querySelector(query);
      }
    },
    findAll: function findAll(parent, query) {
      parent = KUtil.get(parent);

      if (parent) {
        return parent.querySelectorAll(query);
      }
    },
    insertAfter: function insertAfter(el, referenceNode) {
      return referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    },
    parents: function parents(el, query) {
      function collectionHas(a, b) {
        //helper function (see below)
        for (var i = 0, len = a.length; i < len; i++) {
          if (a[i] == b) return true;
        }

        return false;
      }

      function findParentBySelector(el, selector) {
        var all = document.querySelectorAll(selector);
        var cur = el.parentNode;

        while (cur && !collectionHas(all, cur)) {
          //keep going up until you find a match
          cur = cur.parentNode; //go up
        }

        return cur; //will return null if not found
      }

      return findParentBySelector(el, query);
    },
    children: function children(el, selector, log) {
      if (!el || !el.childNodes) {
        return;
      }

      var result = [],
          i = 0,
          l = el.childNodes.length;

      for (var i; i < l; ++i) {
        if (el.childNodes[i].nodeType == 1 && KUtil.matches(el.childNodes[i], selector, log)) {
          result.push(el.childNodes[i]);
        }
      }

      return result;
    },
    child: function child(el, selector, log) {
      var children = KUtil.children(el, selector, log);
      return children ? children[0] : null;
    },
    matches: function matches(el, selector, log) {
      var p = Element.prototype;

      var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };

      if (el && el.tagName) {
        return f.call(el, selector);
      } else {
        return false;
      }
    },
    data: function data(element) {
      element = KUtil.get(element);
      return {
        set: function set(name, data) {
          if (element === undefined) {
            return;
          }

          if (element.customDataTag === undefined) {
            KUtilElementDataStoreID++;
            element.customDataTag = KUtilElementDataStoreID;
          }

          if (KUtilElementDataStore[element.customDataTag] === undefined) {
            KUtilElementDataStore[element.customDataTag] = {};
          }

          KUtilElementDataStore[element.customDataTag][name] = data;
        },
        get: function get(name) {
          if (element === undefined) {
            return;
          }

          if (element.customDataTag === undefined) {
            return null;
          }

          return this.has(name) ? KUtilElementDataStore[element.customDataTag][name] : null;
        },
        has: function has(name) {
          if (element === undefined) {
            return false;
          }

          if (element.customDataTag === undefined) {
            return false;
          }

          return KUtilElementDataStore[element.customDataTag] && KUtilElementDataStore[element.customDataTag][name] ? true : false;
        },
        remove: function remove(name) {
          if (element && this.has(name)) {
            delete KUtilElementDataStore[element.customDataTag][name];
          }
        }
      };
    },
    outerWidth: function outerWidth(el, margin) {
      var width;

      if (margin === true) {
        var width = parseFloat(el.offsetWidth);
        width += parseFloat(KUtil.css(el, 'margin-left')) + parseFloat(KUtil.css(el, 'margin-right'));
        return parseFloat(width);
      } else {
        var width = parseFloat(el.offsetWidth);
        return width;
      }
    },
    offset: function offset(elem) {
      var rect, win;
      elem = KUtil.get(elem);

      if (!elem) {
        return;
      } // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
      // Support: IE <=11 only
      // Running getBoundingClientRect on a
      // disconnected node in IE throws an error


      if (!elem.getClientRects().length) {
        return {
          top: 0,
          left: 0
        };
      } // Get document-relative position by adding viewport scroll to viewport-relative gBCR


      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      };
    },
    height: function height(el) {
      return KUtil.css(el, 'height');
    },
    visible: function visible(el) {
      return !(el.offsetWidth === 0 && el.offsetHeight === 0);
    },
    attr: function attr(el, name, value) {
      el = KUtil.get(el);

      if (el == undefined) {
        return;
      }

      if (value !== undefined) {
        el.setAttribute(name, value);
      } else {
        return el.getAttribute(name);
      }
    },
    hasAttr: function hasAttr(el, name) {
      el = KUtil.get(el);

      if (el == undefined) {
        return;
      }

      return el.getAttribute(name) ? true : false;
    },
    removeAttr: function removeAttr(el, name) {
      el = KUtil.get(el);

      if (el == undefined) {
        return;
      }

      el.removeAttribute(name);
    },
    animate: function animate(from, to, duration, update, easing, done) {
      /**
       * TinyAnimate.easings
       *  Adapted from jQuery Easing
       */
      var easings = {};
      var easing;

      easings.linear = function (t, b, c, d) {
        return c * t / d + b;
      };

      easing = easings.linear; // Early bail out if called incorrectly

      if (typeof from !== 'number' || typeof to !== 'number' || typeof duration !== 'number' || typeof update !== 'function') {
        return;
      } // Create mock done() function if necessary


      if (typeof done !== 'function') {
        done = function done() {};
      } // Pick implementation (requestAnimationFrame | setTimeout)


      var rAF = window.requestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 50);
      }; // Animation loop


      var canceled = false;
      var change = to - from;

      function loop(timestamp) {
        var time = (timestamp || +new Date()) - start;

        if (time >= 0) {
          update(easing(time, from, change, duration));
        }

        if (time >= 0 && time >= duration) {
          update(to);
          done();
        } else {
          rAF(loop);
        }
      }

      update(from); // Start animation loop

      var start = window.performance && window.performance.now ? window.performance.now() : +new Date();
      rAF(loop);
    },
    actualCss: function actualCss(el, prop, cache) {
      el = KUtil.get(el);
      var css = '';

      if (el instanceof HTMLElement === false) {
        return;
      }

      if (!el.getAttribute('k-hidden-' + prop) || cache === false) {
        var value; // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden

        css = el.style.cssText;
        el.style.cssText = 'position: absolute; visibility: hidden; display: block;';

        if (prop == 'width') {
          value = el.offsetWidth;
        } else if (prop == 'height') {
          value = el.offsetHeight;
        }

        el.style.cssText = css; // store it in cache

        el.setAttribute('k-hidden-' + prop, value);
        return parseFloat(value);
      } else {
        // store it in cache
        return parseFloat(el.getAttribute('k-hidden-' + prop));
      }
    },
    actualHeight: function actualHeight(el, cache) {
      return KUtil.actualCss(el, 'height', cache);
    },
    actualWidth: function actualWidth(el, cache) {
      return KUtil.actualCss(el, 'width', cache);
    },
    getScroll: function getScroll(element, method) {
      // The passed in `method` value should be 'Top' or 'Left'
      method = 'scroll' + method;
      return element == window || element == document ? self[method == 'scrollTop' ? 'pageYOffset' : 'pageXOffset'] || browserSupportsBoxModel && document.documentElement[method] || document.body[method] : element[method];
    },
    css: function css(el, styleProp, value) {
      el = KUtil.get(el);

      if (!el) {
        return;
      }

      if (value !== undefined) {
        el.style[styleProp] = value;
      } else {
        var value,
            defaultView = (el.ownerDocument || document).defaultView; // W3C standard way:

        if (defaultView && defaultView.getComputedStyle) {
          // sanitize property name to css notation
          // (hyphen separated words eg. font-Size)
          styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
          return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
        } else if (el.currentStyle) {
          // IE
          // sanitize property name to camelCase
          styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
            return letter.toUpperCase();
          });
          value = el.currentStyle[styleProp]; // convert other units to pixels on IE

          if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return function (value) {
              var oldLeft = el.style.left,
                  oldRsLeft = el.runtimeStyle.left;
              el.runtimeStyle.left = el.currentStyle.left;
              el.style.left = value || 0;
              value = el.style.pixelLeft + "px";
              el.style.left = oldLeft;
              el.runtimeStyle.left = oldRsLeft;
              return value;
            }(value);
          }

          return value;
        }
      }
    },
    slide: function slide(el, dir, speed, callback, recalcMaxHeight) {
      if (!el || dir == 'up' && KUtil.visible(el) === false || dir == 'down' && KUtil.visible(el) === true) {
        return;
      }

      speed = speed ? speed : 600;
      var calcHeight = KUtil.actualHeight(el);
      var calcPaddingTop = false;
      var calcPaddingBottom = false;

      if (KUtil.css(el, 'padding-top') && KUtil.data(el).has('slide-padding-top') !== true) {
        KUtil.data(el).set('slide-padding-top', KUtil.css(el, 'padding-top'));
      }

      if (KUtil.css(el, 'padding-bottom') && KUtil.data(el).has('slide-padding-bottom') !== true) {
        KUtil.data(el).set('slide-padding-bottom', KUtil.css(el, 'padding-bottom'));
      }

      if (KUtil.data(el).has('slide-padding-top')) {
        calcPaddingTop = parseInt(KUtil.data(el).get('slide-padding-top'));
      }

      if (KUtil.data(el).has('slide-padding-bottom')) {
        calcPaddingBottom = parseInt(KUtil.data(el).get('slide-padding-bottom'));
      }

      if (dir == 'up') {
        // up          
        el.style.cssText = 'display: block; overflow: hidden;';

        if (calcPaddingTop) {
          KUtil.animate(0, calcPaddingTop, speed, function (value) {
            el.style.paddingTop = calcPaddingTop - value + 'px';
          }, 'linear');
        }

        if (calcPaddingBottom) {
          KUtil.animate(0, calcPaddingBottom, speed, function (value) {
            el.style.paddingBottom = calcPaddingBottom - value + 'px';
          }, 'linear');
        }

        KUtil.animate(0, calcHeight, speed, function (value) {
          el.style.height = calcHeight - value + 'px';
        }, 'linear', function () {
          callback();
          el.style.height = '';
          el.style.display = 'none';
        });
      } else if (dir == 'down') {
        // down
        el.style.cssText = 'display: block; overflow: hidden;';

        if (calcPaddingTop) {
          KUtil.animate(0, calcPaddingTop, speed, function (value) {
            el.style.paddingTop = value + 'px';
          }, 'linear', function () {
            el.style.paddingTop = '';
          });
        }

        if (calcPaddingBottom) {
          KUtil.animate(0, calcPaddingBottom, speed, function (value) {
            el.style.paddingBottom = value + 'px';
          }, 'linear', function () {
            el.style.paddingBottom = '';
          });
        }

        KUtil.animate(0, calcHeight, speed, function (value) {
          el.style.height = value + 'px';
        }, 'linear', function () {
          callback();
          el.style.height = '';
          el.style.display = '';
          el.style.overflow = '';
        });
      }
    },
    slideUp: function slideUp(el, speed, callback) {
      KUtil.slide(el, 'up', speed, callback);
    },
    slideDown: function slideDown(el, speed, callback) {
      KUtil.slide(el, 'down', speed, callback);
    },
    show: function show(el, display) {
      el.style.display = display ? display : 'block';
    },
    hide: function hide(el) {
      el.style.display = 'none';
    },
    addEvent: function addEvent(el, type, handler, one) {
      el = KUtil.get(el);

      if (typeof el !== 'undefined') {
        el.addEventListener(type, handler);
      }
    },
    removeEvent: function removeEvent(el, type, handler) {
      el = KUtil.get(el);
      el.removeEventListener(type, handler);
    },
    on: function on(element, selector, event, handler) {
      if (!selector) {
        return;
      }

      var eventId = KUtil.getUniqueID('event');

      KUtilDelegatedEventHandlers[eventId] = function (e) {
        var targets = element.querySelectorAll(selector);
        var target = e.target;

        while (target && target !== element) {
          for (var i = 0, j = targets.length; i < j; i++) {
            if (target === targets[i]) {
              handler.call(target, e);
            }
          }

          target = target.parentNode;
        }
      };

      KUtil.addEvent(element, event, KUtilDelegatedEventHandlers[eventId]);
      return eventId;
    },
    off: function off(element, event, eventId) {
      if (!element || !KUtilDelegatedEventHandlers[eventId]) {
        return;
      }

      KUtil.removeEvent(element, event, KUtilDelegatedEventHandlers[eventId]);
      delete KUtilDelegatedEventHandlers[eventId];
    },
    one: function onetime(el, type, callback) {
      el = KUtil.get(el);
      el.addEventListener(type, function callee(e) {
        // remove event
        if (e.target && e.target.removeEventListener) {
          e.target.removeEventListener(e.type, callee);
        } // call handler


        return callback(e);
      });
    },
    hash: function hash(str) {
      var hash = 0,
          i,
          chr;
      if (str.length === 0) return hash;

      for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
      }

      return hash;
    },
    animateClass: function animateClass(el, animationName, callback) {
      var animation;
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
        msAnimation: 'msAnimationEnd'
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          animation = animations[t];
        }
      }

      KUtil.addClass(el, 'animated ' + animationName);
      KUtil.one(el, animation, function () {
        KUtil.removeClass(el, 'animated ' + animationName);
      });

      if (callback) {
        KUtil.one(el, animation, callback);
      }
    },
    transitionEnd: function transitionEnd(el, callback) {
      var transition;
      var transitions = {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'mozTransitionEnd',
        WebkitTransition: 'webkitTransitionEnd',
        msTransition: 'msTransitionEnd'
      };

      for (var t in transitions) {
        if (el.style[t] !== undefined) {
          transition = transitions[t];
        }
      }

      KUtil.one(el, transition, callback);
    },
    animationEnd: function animationEnd(el, callback) {
      var animation;
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
        msAnimation: 'msAnimationEnd'
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          animation = animations[t];
        }
      }

      KUtil.one(el, animation, callback);
    },
    animateDelay: function animateDelay(el, value) {
      var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''];

      for (var i = 0; i < vendors.length; i++) {
        KUtil.css(el, vendors[i] + 'animation-delay', value);
      }
    },
    animateDuration: function animateDuration(el, value) {
      var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''];

      for (var i = 0; i < vendors.length; i++) {
        KUtil.css(el, vendors[i] + 'animation-duration', value);
      }
    },
    scrollTo: function scrollTo(target, offset, duration) {
      var duration = duration ? duration : 500;
      var target = KUtil.get(target);
      var targetPos = target ? KUtil.offset(target).top : 0;
      var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var from, to;

      if (targetPos > scrollPos) {
        from = targetPos;
        to = scrollPos;
      } else {
        from = scrollPos;
        to = targetPos;
      }

      if (offset) {
        to += offset;
      }

      KUtil.animate(from, to, duration, function (value) {
        document.documentElement.scrollTop = value;
        document.body.parentNode.scrollTop = value;
        document.body.scrollTop = value;
      }); //, easing, done
    },
    scrollTop: function scrollTop(offset, duration) {
      KUtil.scrollTo(null, offset, duration);
    },
    isArray: function isArray(obj) {
      return obj && Array.isArray(obj);
    },
    ready: function ready(callback) {
      if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        callback();
      } else {
        document.addEventListener('DOMContentLoaded', callback);
      }
    },
    isEmpty: function isEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }

      return true;
    },
    numberString: function numberString(nStr) {
      nStr += '';
      var x = nStr.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;

      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }

      return x1 + x2;
    },
    detectIE: function detectIE() {
      var ua = window.navigator.userAgent; // Test values; Uncomment to check result …
      // IE 10
      // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
      // IE 11
      // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
      // Edge 12 (Spartan)
      // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
      // Edge 13
      // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

      var msie = ua.indexOf('MSIE ');

      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('Trident/');

      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('Edge/');

      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      } // other browser


      return false;
    },
    isRTL: function isRTL() {
      return KUtil.attr(KUtil.get('html'), 'direction') == 'rtl';
    },
    // Scroller
    scrollInit: function scrollInit(element, options) {
      if (!element) return; // Define init function

      function init() {
        var ps;
        var height;

        if (options.height instanceof Function) {
          height = parseInt(options.height.call());
        } else {
          height = parseInt(options.height);
        } // Destroy scroll on table and mobile modes


        if (options.disableForMobile && KUtil.isInResponsiveRange('tablet-and-mobile')) {
          if (ps = KUtil.data(element).get('ps')) {
            if (options.resetHeightOnDestroy) {
              KUtil.css(element, 'height', 'auto');
            } else {
              KUtil.css(element, 'overflow', 'auto');

              if (height > 0) {
                KUtil.css(element, 'height', height + 'px');
              }
            }

            ps.destroy();
            ps = KUtil.data(element).remove('ps');
          } else if (height > 0) {
            KUtil.css(element, 'overflow', 'auto');
            KUtil.css(element, 'height', height + 'px');
          }

          return;
        }

        if (height > 0) {
          KUtil.css(element, 'height', height + 'px');
        }

        KUtil.css(element, 'overflow', 'hidden'); // Init scroll

        if (ps = KUtil.data(element).get('ps')) {
          ps.update();
        } else {
          KUtil.addClass(element, 'k-scroll');
          ps = new PerfectScrollbar(element, {
            wheelSpeed: 0.5,
            swipeEasing: true,
            wheelPropagation: false,
            minScrollbarLength: 40,
            maxScrollbarLength: 300,
            suppressScrollX: KUtil.attr(element, 'data-scroll-x') != 'true' ? true : false
          });
          KUtil.data(element).set('ps', ps);
        }
      } // Init


      init(); // Handle window resize

      if (options.handleWindowResize) {
        KUtil.addResizeHandler(function () {
          init();
        });
      }
    },
    scrollUpdate: function scrollUpdate(element) {
      var ps;

      if (ps = KUtil.data(element).get('ps')) {
        ps.update();
      }
    },
    scrollUpdateAll: function scrollUpdateAll(parent) {
      var scrollers = KUtil.findAll(parent, '.ps');

      for (var i = 0, len = scrollers.length; i < len; i++) {
        KUtil.scrollerUpdate(scrollers[i]);
      }
    },
    scrollDestroy: function scrollDestroy(element) {
      var ps;

      if (ps = KUtil.data(element).get('ps')) {
        ps.destroy();
        ps = KUtil.data(element).remove('ps');
      }
    },
    setHTML: function setHTML(el, html) {
      if (KUtil.get(el)) {
        KUtil.get(el).innerHTML = html;
      }
    },
    getHTML: function getHTML(el) {
      if (KUtil.get(el)) {
        return KUtil.get(el).innerHTML;
      }
    }
  };
}(); // Initialize KUtil class on document ready


KUtil.ready(function () {
  KUtil.init();
}); // CSS3 Transitions only after page load(.k-page-loading class added to body tag and remove with JS on page load)

window.onload = function () {
  KUtil.removeClass(KUtil.get('body'), 'k-page--loading');
};

"use strict";
/**
 * @class KApp
 */


var KApp = function () {
  /** @type {object} colors State colors **/
  var colors = {};

  var _initTooltip = function initTooltip(el) {
    var skin = el.data('skin') ? 'tooltip-' + el.data('skin') : '';
    var width = el.data('width') == 'auto' ? 'tooltop-auto-width' : '';
    var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';
    var placement = el.data('placement') ? el.data('placement') : 'left';
    el.tooltip({
      trigger: triggerValue,
      template: '<div class="tooltip ' + skin + ' ' + width + '" role="tooltip">\
                <div class="arrow"></div>\
                <div class="tooltip-inner"></div>\
            </div>'
    });
  };

  var _initTooltips = function initTooltips() {
    // init bootstrap tooltips
    $('[data-toggle="k-tooltip"]').each(function () {
      _initTooltip($(this));
    });
  };

  var _initPopover = function initPopover(el) {
    var skin = el.data('skin') ? 'popover-' + el.data('skin') : '';
    var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';
    el.popover({
      trigger: triggerValue,
      template: '\
            <div class="popover ' + skin + '" role="tooltip">\
                <div class="arrow"></div>\
                <h3 class="popover-header"></h3>\
                <div class="popover-body"></div>\
            </div>'
    });
  };

  var _initPopovers = function initPopovers() {
    // init bootstrap popover
    $('[data-toggle="k-popover"]').each(function () {
      _initPopover($(this));
    });
  };

  var initFileInput = function initFileInput() {
    // init bootstrap popover
    $('.custom-file-input').on('change', function () {
      var fileName = $(this).val();
      $(this).next('.custom-file-label').addClass("selected").html(fileName);
    });
  };

  var _initPortlet = function initPortlet(el, options) {
    // init portlet tools
    var el = $(el);
    var portlet = new KPortlet(el[0], options);
  };

  var _initPortlets = function initPortlets() {
    // init portlet tools
    $('[data-kportlet="true"]').each(function () {
      var el = $(this);

      if (el.data('data-kportlet-initialized') !== true) {
        _initPortlet(el, {});

        el.data('data-kportlet-initialized', true);
      }
    });
  };

  var initScroll = function initScroll() {
    $('[data-scroll="true"]').each(function () {
      var el = $(this);
      KUtil.scrollInit(this, {
        disableForMobile: true,
        handleWindowResize: true,
        height: function height() {
          if (KUtil.isInResponsiveRange('tablet-and-mobile') && el.data('mobile-height')) {
            return el.data('mobile-height');
          } else {
            return el.data('height');
          }
        }
      });
    });
  };

  var initAlerts = function initAlerts() {
    // init bootstrap popover
    $('body').on('click', '[data-close=alert]', function () {
      $(this).closest('.alert').hide();
    });
  };

  var _initSticky = function initSticky() {
    var sticky = new Sticky('[data-sticky="true"]');
  };

  var _initAbsoluteDropdown = function initAbsoluteDropdown(dropdown) {
    var dropdownMenu;

    if (!dropdown) {
      return;
    }

    dropdown.on('show.bs.dropdown', function (e) {
      dropdownMenu = $(e.target).find('.dropdown-menu');
      $('body').append(dropdownMenu.detach());
      dropdownMenu.css('display', 'block');
      dropdownMenu.position({
        'my': 'right top',
        'at': 'right bottom',
        'of': $(e.relatedTarget)
      });
    });
    dropdown.on('hide.bs.dropdown', function (e) {
      $(e.target).append(dropdownMenu.detach());
      dropdownMenu.hide();
    });
  };

  return {
    init: function init(options) {
      if (options && options.colors) {
        colors = options.colors;
      }

      KApp.initComponents();
    },
    initComponents: function initComponents() {
      initScroll();

      _initTooltips();

      _initPopovers();

      initAlerts();

      _initPortlets();

      initFileInput();

      _initSticky();
    },
    initTooltips: function initTooltips() {
      _initTooltips();
    },
    initTooltip: function initTooltip(el) {
      _initTooltip(el);
    },
    initPopovers: function initPopovers() {
      _initPopovers();
    },
    initPopover: function initPopover(el) {
      _initPopover(el);
    },
    initPortlet: function initPortlet(el, options) {
      _initPortlet(el, options);
    },
    initPortlets: function initPortlets() {
      _initPortlets();
    },
    initSticky: function initSticky() {
      _initSticky();
    },
    initAbsoluteDropdown: function initAbsoluteDropdown(dropdown) {
      _initAbsoluteDropdown(dropdown);
    },
    block: function block(target, options) {
      var el = $(target);
      options = $.extend(true, {
        opacity: 0.03,
        overlayColor: '#000000',
        type: '',
        size: '',
        state: 'brand',
        centerX: true,
        centerY: true,
        message: '',
        shadow: true,
        width: 'auto'
      }, options);
      var html;
      var version = options.type ? 'k-spinner--' + options.type : '';
      var state = options.state ? 'k-spinner--' + options.state : '';
      var size = options.size ? 'k-spinner--' + options.size : '';
      var spinner = '<div class="k-spinner ' + version + ' ' + state + ' ' + size + '"></div';

      if (options.message && options.message.length > 0) {
        var classes = 'blockui ' + (options.shadow === false ? 'blockui' : '');
        html = '<div class="' + classes + '"><span>' + options.message + '</span><span>' + spinner + '</span></div>';
        var el = document.createElement('div');
        KUtil.get('body').prepend(el);
        KUtil.addClass(el, classes);
        el.innerHTML = '<span>' + options.message + '</span><span>' + spinner + '</span>';
        options.width = KUtil.actualWidth(el) + 10;
        KUtil.remove(el);

        if (target == 'body') {
          html = '<div class="' + classes + '" style="margin-left:-' + options.width / 2 + 'px;"><span>' + options.message + '</span><span>' + spinner + '</span></div>';
        }
      } else {
        html = spinner;
      }

      var params = {
        message: html,
        centerY: options.centerY,
        centerX: options.centerX,
        css: {
          top: '30%',
          left: '50%',
          border: '0',
          padding: '0',
          backgroundColor: 'none',
          width: options.width
        },
        overlayCSS: {
          backgroundColor: options.overlayColor,
          opacity: options.opacity,
          cursor: 'wait',
          zIndex: '10'
        },
        onUnblock: function onUnblock() {
          if (el && el[0]) {
            KUtil.css(el[0], 'position', '');
            KUtil.css(el[0], 'zoom', '');
          }
        }
      };

      if (target == 'body') {
        params.css.top = '50%';
        $.blockUI(params);
      } else {
        var el = $(target);
        el.block(params);
      }
    },
    unblock: function unblock(target) {
      if (target && target != 'body') {
        $(target).unblock();
      } else {
        $.unblockUI();
      }
    },
    blockPage: function blockPage(options) {
      return KApp.block('body', options);
    },
    unblockPage: function unblockPage() {
      return KApp.unblock('body');
    },
    progress: function progress(target, options) {
      var skin = options && options.skin ? options.skin : 'light';
      var alignment = options && options.alignment ? options.alignment : 'right';
      var size = options && options.size ? 'k-spinner--' + options.size : '';
      var classes = 'k-loader ' + 'k-loader--' + skin + ' k-loader--' + alignment + ' k-loader--' + size;
      KApp.unprogress(target);
      $(target).addClass(classes);
      $(target).data('progress-classes', classes);
    },
    unprogress: function unprogress(target) {
      $(target).removeClass($(target).data('progress-classes'));
    },
    getStateColor: function getStateColor(name) {
      return colors["state"][name];
    },
    getBaseColor: function getBaseColor(type, level) {
      return colors["base"][type][level - 1];
    }
  };
}(); // Initialize KApp class on document ready


$(document).ready(function () {
  KApp.init(KAppOptions);
});
'use strict';

(function ($) {
  var pluginName = 'KDatatable';
  var pfx = 'k-';
  var util = KUtil;
  var app = KApp;
  if (typeof util === 'undefined') throw new Error('Util class is required and must be included before ' + pluginName); // plugin setup

  $.fn[pluginName] = function (options) {
    if ($(this).length === 0) {
      console.log('No ' + pluginName + ' element exist.');
      return;
    } // global variables


    var datatable = this; // debug enabled?
    // 1) state will be cleared on each refresh
    // 2) enable some logs
    // 3) etc.

    datatable.debug = false;
    datatable.API = {
      record: null,
      value: null,
      params: null
    };
    var Plugin = {
      /********************
       ** PRIVATE METHODS
       ********************/
      isInit: false,
      cellOffset: 110,
      iconOffset: 15,
      stateId: 'meta',
      ajaxParams: {},
      init: function init(options) {
        var isHtmlTable = false; // data source option empty is normal table

        if (options.data.source === null) {
          Plugin.extractTable();
          isHtmlTable = true;
        }

        Plugin.setupBaseDOM.call();
        Plugin.setupDOM(datatable.table); // Plugin.spinnerCallback(true);
        // set custom query from options

        Plugin.setDataSourceQuery(Plugin.getOption('data.source.read.params.query')); // on event after layout had done setup, show datatable

        $(datatable).on(pfx + 'datatable--on-layout-updated', Plugin.afterRender);
        if (datatable.debug) Plugin.stateRemove(Plugin.stateId); // initialize extensions

        $.each(Plugin.getOption('extensions'), function (extName, extOptions) {
          if (typeof $.fn[pluginName][extName] === 'function') new $.fn[pluginName][extName](datatable, extOptions);
        }); // get data

        if (options.data.type === 'remote' || options.data.type === 'local') {
          if (options.data.saveState === false || options.data.saveState.cookie === false && options.data.saveState.webstorage === false) {
            Plugin.stateRemove(Plugin.stateId);
          } // get data for local datatable and local table


          if (options.data.type === 'local' && _typeof(options.data.source) === 'object') {
            datatable.dataSet = datatable.originalDataSet = Plugin.dataMapCallback(options.data.source);
          }

          Plugin.dataRender();
        }

        if (!isHtmlTable) {
          // if not a html table, setup header
          Plugin.setHeadTitle();

          if (Plugin.getOption('layout.footer')) {
            Plugin.setHeadTitle(datatable.tableFoot);
          }
        } // hide header


        if (typeof options.layout.header !== 'undefined' && options.layout.header === false) {
          $(datatable.table).find('thead').remove();
        } // hide footer


        if (typeof options.layout.footer !== 'undefined' && options.layout.footer === false) {
          $(datatable.table).find('tfoot').remove();
        } // for normal and local data type, run layoutUpdate


        if (options.data.type === null || options.data.type === 'local') {
          Plugin.setupCellField.call();
          Plugin.setupTemplateCell.call(); // setup nested datatable, if option enabled

          Plugin.setupSubDatatable.call(); // setup extra system column properties

          Plugin.setupSystemColumn.call();
          Plugin.redraw();
        }

        var width;
        var initialWidth = false;
        $(window).resize(function () {
          // get initial width
          if (!initialWidth) {
            width = $(this).width();
            initialWidth = true;
          } // issue: URL Bar Resizing on mobile, https://developers.google.com/web/updates/2016/12/url-bar-resizing
          // trigger datatable resize on width change only


          if ($(this).width() !== width) {
            width = $(this).width();
            Plugin.fullRender();
          }
        });
        $(datatable).height('');
        $(Plugin.getOption('search.input')).on('keyup', function (e) {
          if (Plugin.getOption('search.onEnter') && e.which !== 13) return;
          Plugin.search($(this).val());
        });
        return datatable;
      },

      /**
       * Extract static HTML table content into datasource
       */
      extractTable: function extractTable() {
        var columns = [];
        var headers = $(datatable).find('tr:first-child th').get().map(function (cell, i) {
          var field = $(cell).data('field');

          if (typeof field === 'undefined') {
            field = $(cell).text().trim();
          }

          var column = {
            field: field,
            title: field
          };

          for (var ii in options.columns) {
            if (options.columns[ii].field === field) {
              column = $.extend(true, {}, options.columns[ii], column);
            }
          }

          columns.push(column);
          return field;
        }); // auto create columns config

        options.columns = columns;
        var rowProp = [];
        var source = [];
        $(datatable).find('tr').each(function () {
          if ($(this).find('td').length) {
            rowProp.push($(this).prop('attributes'));
          }

          var td = {};
          $(this).find('td').each(function (i, cell) {
            td[headers[i]] = cell.innerHTML.trim();
          });

          if (!util.isEmpty(td)) {
            source.push(td);
          }
        });
        options.data.attr.rowProps = rowProp;
        options.data.source = source;
      },

      /**
       * One time layout update on init
       */
      layoutUpdate: function layoutUpdate() {
        // setup nested datatable, if option enabled
        Plugin.setupSubDatatable.call(); // setup extra system column properties

        Plugin.setupSystemColumn.call(); // setup cell hover event

        Plugin.setupHover.call();

        if (typeof options.detail === 'undefined' // temporary disable lock column in subtable
        && Plugin.getDepth() === 1) {
          // lock columns handler
          Plugin.lockTable.call();
        } // Plugin.columnHide.call();


        Plugin.resetScroll();

        if (!Plugin.isInit) {
          // run once dropdown inside datatable
          Plugin.dropdownFix();
          $(datatable).trigger(pfx + 'datatable--on-init', {
            table: $(datatable.wrap).attr('id'),
            options: options
          });
          Plugin.isInit = true;
        }

        $(datatable).trigger(pfx + 'datatable--on-layout-updated', {
          table: $(datatable.wrap).attr('id')
        });
      },
      lockTable: function lockTable() {
        var lock = {
          lockEnabled: false,
          init: function init() {
            // check if table should be locked columns
            lock.lockEnabled = Plugin.lockEnabledColumns();

            if (lock.lockEnabled.left.length === 0 && lock.lockEnabled.right.length === 0) {
              return;
            }

            lock.enable();
          },
          enable: function enable() {
            var enableLock = function enableLock(tablePart) {
              // check if already has lock column
              if ($(tablePart).find('.' + pfx + 'datatable__lock').length > 0) {
                Plugin.log('Locked container already exist in: ', tablePart);
                return;
              } // check if no rows exists


              if ($(tablePart).find('.' + pfx + 'datatable__row').length === 0) {
                Plugin.log('No row exist in: ', tablePart);
                return;
              } // locked div container


              var lockLeft = $('<div/>').addClass(pfx + 'datatable__lock ' + pfx + 'datatable__lock--left');
              var lockScroll = $('<div/>').addClass(pfx + 'datatable__lock ' + pfx + 'datatable__lock--scroll');
              var lockRight = $('<div/>').addClass(pfx + 'datatable__lock ' + pfx + 'datatable__lock--right');
              $(tablePart).find('.' + pfx + 'datatable__row').each(function () {
                var rowLeft = $('<tr/>').addClass(pfx + 'datatable__row').appendTo(lockLeft);
                var rowScroll = $('<tr/>').addClass(pfx + 'datatable__row').appendTo(lockScroll);
                var rowRight = $('<tr/>').addClass(pfx + 'datatable__row').appendTo(lockRight);
                $(this).find('.' + pfx + 'datatable__cell').each(function () {
                  var locked = $(this).data('locked');

                  if (typeof locked !== 'undefined') {
                    if (typeof locked.left !== 'undefined' || locked === true) {
                      // default locked to left
                      $(this).appendTo(rowLeft);
                    }

                    if (typeof locked.right !== 'undefined') {
                      $(this).appendTo(rowRight);
                    }
                  } else {
                    $(this).appendTo(rowScroll);
                  }
                }); // remove old row

                $(this).remove();
              });

              if (lock.lockEnabled.left.length > 0) {
                $(datatable.wrap).addClass(pfx + 'datatable--lock');
                $(lockLeft).appendTo(tablePart);
              }

              if (lock.lockEnabled.left.length > 0 || lock.lockEnabled.right.length > 0) {
                $(lockScroll).appendTo(tablePart);
              }

              if (lock.lockEnabled.right.length > 0) {
                $(datatable.wrap).addClass(pfx + 'datatable--lock');
                $(lockRight).appendTo(tablePart);
              }
            };

            $(datatable.table).find('thead,tbody,tfoot').each(function () {
              var tablePart = this;

              if ($(this).find('.' + pfx + 'datatable__lock').length === 0) {
                $(this).ready(function () {
                  enableLock(tablePart);
                });
              }
            });
          }
        };
        lock.init();
        return lock;
      },

      /**
       * Render everything for resize
       */
      fullRender: function fullRender() {
        $(datatable.tableHead).empty();
        Plugin.setHeadTitle();

        if (Plugin.getOption('layout.footer')) {
          $(datatable.tableFoot).empty();
          Plugin.setHeadTitle(datatable.tableFoot);
        }

        Plugin.spinnerCallback(true);
        $(datatable.wrap).removeClass(pfx + 'datatable--loaded');
        Plugin.insertData();
      },
      lockEnabledColumns: function lockEnabledColumns() {
        var screen = $(window).width();
        var columns = options.columns;
        var enabled = {
          left: [],
          right: []
        };
        $.each(columns, function (i, column) {
          if (typeof column.locked !== 'undefined') {
            if (typeof column.locked.left !== 'undefined') {
              if (util.getBreakpoint(column.locked.left) <= screen) {
                enabled['left'].push(column.locked.left);
              }
            }

            if (typeof column.locked.right !== 'undefined') {
              if (util.getBreakpoint(column.locked.right) <= screen) {
                enabled['right'].push(column.locked.right);
              }
            }
          }
        });
        return enabled;
      },

      /**
       * After render event, called by '+pfx+'-datatable--on-layout-updated
       * @param e
       * @param args
       */
      afterRender: function afterRender(e, args) {
        if (args.table == $(datatable.wrap).attr('id')) {
          $(datatable).ready(function () {
            if (!Plugin.isLocked()) {
              Plugin.redraw(); // work on non locked columns

              if (!Plugin.isSubtable() && Plugin.getOption('rows.autoHide') === true) {
                Plugin.autoHide();
              } // reset row


              $(datatable.table).find('.' + pfx + 'datatable__row').css('height', '');
            }

            Plugin.rowEvenOdd.call(); // redraw locked columns table

            if (Plugin.isLocked()) Plugin.redraw();
            $(datatable.tableBody).css('visibility', '');
            $(datatable.wrap).addClass(pfx + 'datatable--loaded');
            Plugin.scrollbar.call();
            Plugin.spinnerCallback(false);
            Plugin.sorting.call();
          });
        }
      },
      dropdownFix: function dropdownFix() {
        var dropdownMenu;
        $('body').on('show.bs.dropdown', '.' + pfx + 'datatable .' + pfx + 'datatable__body', function (e) {
          dropdownMenu = $(e.target).find('.dropdown-menu');
          $('body').append(dropdownMenu.detach());
          dropdownMenu.css('display', 'block');
          dropdownMenu.position({
            'my': 'right top',
            'at': 'right bottom',
            'of': $(e.relatedTarget)
          }); // if datatable is inside modal

          if (datatable.closest('.modal').length) {
            // increase dropdown z-index
            dropdownMenu.css('z-index', '2000');
          }
        }).on('hide.bs.dropdown', '.' + pfx + 'datatable .' + pfx + 'datatable__body', function (e) {
          $(e.target).append(dropdownMenu.detach());
          dropdownMenu.hide();
        });
      },
      hoverTimer: 0,
      isScrolling: false,
      setupHover: function setupHover() {
        $(window).scroll(function (e) {
          // stop hover when scrolling
          clearTimeout(Plugin.hoverTimer);
          Plugin.isScrolling = true;
        });
        $(datatable.tableBody).find('.' + pfx + 'datatable__cell').off('mouseenter', 'mouseleave').on('mouseenter', function () {
          // reset scroll timer to hover class
          Plugin.hoverTimer = setTimeout(function () {
            Plugin.isScrolling = false;
          }, 200);
          if (Plugin.isScrolling) return; // normal table

          var row = $(this).closest('.' + pfx + 'datatable__row').addClass(pfx + 'datatable__row--hover');
          var index = $(row).index() + 1; // lock table

          $(row).closest('.' + pfx + 'datatable__lock').parent().find('.' + pfx + 'datatable__row:nth-child(' + index + ')').addClass(pfx + 'datatable__row--hover');
        }).on('mouseleave', function () {
          // normal table
          var row = $(this).closest('.' + pfx + 'datatable__row').removeClass(pfx + 'datatable__row--hover');
          var index = $(row).index() + 1; // look table

          $(row).closest('.' + pfx + 'datatable__lock').parent().find('.' + pfx + 'datatable__row:nth-child(' + index + ')').removeClass(pfx + 'datatable__row--hover');
        });
      },

      /**
       * Adjust width of locked table containers by resize handler
       * @returns {number}
       */
      adjustLockContainer: function adjustLockContainer() {
        if (!Plugin.isLocked()) return 0; // refer to head dimension

        var containerWidth = $(datatable.tableHead).width();
        var lockLeft = $(datatable.tableHead).find('.' + pfx + 'datatable__lock--left').width();
        var lockRight = $(datatable.tableHead).find('.' + pfx + 'datatable__lock--right').width();
        if (typeof lockLeft === 'undefined') lockLeft = 0;
        if (typeof lockRight === 'undefined') lockRight = 0;
        var lockScroll = Math.floor(containerWidth - lockLeft - lockRight);
        $(datatable.table).find('.' + pfx + 'datatable__lock--scroll').css('width', lockScroll);
        return lockScroll;
      },

      /**
       * todo; not in use
       */
      dragResize: function dragResize() {
        var pressed = false;
        var start = undefined;
        var startX, startWidth;
        $(datatable.tableHead).find('.' + pfx + 'datatable__cell').mousedown(function (e) {
          start = $(this);
          pressed = true;
          startX = e.pageX;
          startWidth = $(this).width();
          $(start).addClass(pfx + 'datatable__cell--resizing');
        }).mousemove(function (e) {
          if (pressed) {
            var i = $(start).index();
            var tableBody = $(datatable.tableBody);
            var ifLocked = $(start).closest('.' + pfx + 'datatable__lock');

            if (ifLocked) {
              var lockedIndex = $(ifLocked).index();
              tableBody = $(datatable.tableBody).find('.' + pfx + 'datatable__lock').eq(lockedIndex);
            }

            $(tableBody).find('.' + pfx + 'datatable__row').each(function (tri, tr) {
              $(tr).find('.' + pfx + 'datatable__cell').eq(i).width(startWidth + (e.pageX - startX)).children().width(startWidth + (e.pageX - startX));
            });
            $(start).children().css('width', startWidth + (e.pageX - startX));
          }
        }).mouseup(function () {
          $(start).removeClass(pfx + 'datatable__cell--resizing');
          pressed = false;
        });
        $(document).mouseup(function () {
          $(start).removeClass(pfx + 'datatable__cell--resizing');
          pressed = false;
        });
      },

      /**
       * To prepare placeholder for table before content is loading
       */
      initHeight: function initHeight() {
        if (options.layout.height && options.layout.scroll) {
          var theadHeight = $(datatable.tableHead).find('.' + pfx + 'datatable__row').outerHeight();
          var tfootHeight = $(datatable.tableFoot).find('.' + pfx + 'datatable__row').outerHeight();
          var bodyHeight = options.layout.height;

          if (theadHeight > 0) {
            bodyHeight -= theadHeight;
          }

          if (tfootHeight > 0) {
            bodyHeight -= tfootHeight;
          } // scrollbar offset


          bodyHeight -= 2;
          $(datatable.tableBody).css('max-height', bodyHeight); // set scrollable area fixed height

          $(datatable.tableBody).find('.' + pfx + 'datatable__lock--scroll').css('height', bodyHeight);
        }
      },

      /**
       * Setup base DOM (table, thead, tbody, tfoot) and create if not exist.
       */
      setupBaseDOM: function setupBaseDOM() {
        // keep original state before datatable initialize
        datatable.initialDatatable = $(datatable).clone(); // main element

        if ($(datatable).prop('tagName') === 'TABLE') {
          // if main init element is <table>, wrap with div
          datatable.table = $(datatable).removeClass(pfx + 'datatable').addClass(pfx + 'datatable__table');

          if ($(datatable.table).parents('.' + pfx + 'datatable').length === 0) {
            datatable.table.wrap($('<div/>').addClass(pfx + 'datatable').addClass(pfx + 'datatable--' + options.layout.theme));
            datatable.wrap = $(datatable.table).parent();
          }
        } else {
          // create table
          datatable.wrap = $(datatable).addClass(pfx + 'datatable').addClass(pfx + 'datatable--' + options.layout.theme);
          datatable.table = $('<table/>').addClass(pfx + 'datatable__table').appendTo(datatable);
        }

        if (typeof options.layout.class !== 'undefined') {
          $(datatable.wrap).addClass(options.layout.class);
        }

        $(datatable.table).removeClass(pfx + 'datatable--destroyed').css('display', 'block'); // force disable save state

        if (typeof $(datatable).attr('id') === 'undefined') {
          Plugin.setOption('data.saveState', false);
          $(datatable.table).attr('id', util.getUniqueID(pfx + 'datatable--'));
        } // predefine table height


        if (Plugin.getOption('layout.minHeight')) $(datatable.table).css('min-height', Plugin.getOption('layout.minHeight'));
        if (Plugin.getOption('layout.height')) $(datatable.table).css('max-height', Plugin.getOption('layout.height')); // for normal table load

        if (options.data.type === null) {
          $(datatable.table).css('width', '').css('display', '');
        } // create table head element


        datatable.tableHead = $(datatable.table).find('thead');

        if ($(datatable.tableHead).length === 0) {
          datatable.tableHead = $('<thead/>').prependTo(datatable.table);
        } // create table head element


        datatable.tableBody = $(datatable.table).find('tbody');

        if ($(datatable.tableBody).length === 0) {
          datatable.tableBody = $('<tbody/>').appendTo(datatable.table);
        }

        if (typeof options.layout.footer !== 'undefined' && options.layout.footer) {
          // create table foot element
          datatable.tableFoot = $(datatable.table).find('tfoot');

          if ($(datatable.tableFoot).length === 0) {
            datatable.tableFoot = $('<tfoot/>').appendTo(datatable.table);
          }
        }
      },

      /**
       * Set column data before table manipulation.
       */
      setupCellField: function setupCellField(tableParts) {
        if (typeof tableParts === 'undefined') tableParts = $(datatable.table).children();
        var columns = options.columns;
        $.each(tableParts, function (part, tablePart) {
          $(tablePart).find('.' + pfx + 'datatable__row').each(function (tri, tr) {
            // prepare data
            $(tr).find('.' + pfx + 'datatable__cell').each(function (tdi, td) {
              if (typeof columns[tdi] !== 'undefined') {
                $(td).data(columns[tdi]);
              }
            });
          });
        });
      },

      /**
       * Set column template callback
       * @param tablePart
       */
      setupTemplateCell: function setupTemplateCell(tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
        var columns = options.columns;
        $(tablePart).find('.' + pfx + 'datatable__row').each(function (tri, tr) {
          // row data object, if any
          var obj = $(tr).data('obj') || {}; // @deprecated in v5.0.6
          // obj['getIndex'] = function() {
          // 	return tri;
          // };
          // @deprecated in v5.0.6
          // obj['getDatatable'] = function() {
          // 	return datatable;
          // };
          // @deprecated in v5.0.6

          var rowCallback = Plugin.getOption('rows.callback');

          if (typeof rowCallback === 'function') {
            rowCallback($(tr), obj, tri);
          } // before template row callback


          var beforeTemplate = Plugin.getOption('rows.beforeTemplate');

          if (typeof beforeTemplate === 'function') {
            beforeTemplate($(tr), obj, tri);
          } // if data object is undefined, collect from table


          if (typeof obj === 'undefined') {
            obj = {};
            $(tr).find('.' + pfx + 'datatable__cell').each(function (tdi, td) {
              // get column settings by field
              var column = $.grep(columns, function (n, i) {
                return $(td).data('field') === n.field;
              })[0];

              if (typeof column !== 'undefined') {
                obj[column['field']] = $(td).text();
              }
            });
          }

          $(tr).find('.' + pfx + 'datatable__cell').each(function (tdi, td) {
            // get column settings by field
            var column = $.grep(columns, function (n, i) {
              return $(td).data('field') === n.field;
            })[0];

            if (typeof column !== 'undefined') {
              // column template
              if (typeof column.template !== 'undefined') {
                var finalValue = ''; // template string

                if (typeof column.template === 'string') {
                  finalValue = Plugin.dataPlaceholder(column.template, obj);
                } // template callback function


                if (typeof column.template === 'function') {
                  finalValue = column.template(obj, tri, datatable);
                } // sanitize using DOMPurify if installed


                if (typeof DOMPurify !== 'undefined') {
                  finalValue = DOMPurify.sanitize(finalValue);
                }

                var span = document.createElement('span');
                span.innerHTML = finalValue; // insert to cell, wrap with span

                $(td).html(span); // set span overflow

                if (typeof column.overflow !== 'undefined') {
                  $(span).css('overflow', column.overflow);
                  $(span).css('position', 'relative');
                }
              }
            }
          }); // after template row callback

          var afterTemplate = Plugin.getOption('rows.afterTemplate');

          if (typeof afterTemplate === 'function') {
            afterTemplate($(tr), obj, tri);
          }
        });
      },

      /**
       * Setup extra system column properties
       * Note: selector checkbox, subtable toggle
       */
      setupSystemColumn: function setupSystemColumn() {
        datatable.dataSet = datatable.dataSet || []; // no records available

        if (datatable.dataSet.length === 0) return;
        var columns = options.columns;
        $(datatable.tableBody).find('.' + pfx + 'datatable__row').each(function (tri, tr) {
          $(tr).find('.' + pfx + 'datatable__cell').each(function (tdi, td) {
            // get column settings by field
            var column = $.grep(columns, function (n, i) {
              return $(td).data('field') === n.field;
            })[0];

            if (typeof column !== 'undefined') {
              var value = $(td).text(); // enable column selector

              if (typeof column.selector !== 'undefined' && column.selector !== false) {
                // check if checkbox exist
                if ($(td).find('.' + pfx + 'checkbox [type="checkbox"]').length > 0) return;
                $(td).addClass(pfx + 'datatable__cell--check'); // append checkbox

                var chk = $('<label/>').addClass(pfx + 'checkbox ' + pfx + 'checkbox--single').append($('<input/>').attr('type', 'checkbox').attr('value', value).on('click', function () {
                  if ($(this).is(':checked')) {
                    // add checkbox active row class
                    Plugin.setActive(this);
                  } else {
                    // add checkbox active row class
                    Plugin.setInactive(this);
                  }
                })).append('&nbsp;<span></span>'); // checkbox selector has outline style

                if (typeof column.selector.class !== 'undefined') {
                  $(chk).addClass(column.selector.class);
                }

                $(td).children().html(chk);
              } // enable column subtable toggle


              if (typeof column.subtable !== 'undefined' && column.subtable) {
                // check if subtable toggle exist
                if ($(td).find('.' + pfx + 'datatable__toggle-subtable').length > 0) return; // append subtable toggle

                $(td).children().html($('<a/>').addClass(pfx + 'datatable__toggle-subtable').attr('href', '#').attr('data-value', value).append($('<i/>').addClass(Plugin.getOption('layout.icons.rowDetail.collapse'))));
              }
            }
          });
        }); // init checkbox for header/footer

        var initCheckbox = function initCheckbox(tr) {
          // get column settings by field
          var column = $.grep(columns, function (n, i) {
            return typeof n.selector !== 'undefined' && n.selector !== false;
          })[0];

          if (typeof column !== 'undefined') {
            // enable column selector
            if (typeof column.selector !== 'undefined' && column.selector !== false) {
              var td = $(tr).find('[data-field="' + column.field + '"]'); // check if checkbox exist

              if ($(td).find('.' + pfx + 'checkbox [type="checkbox"]').length > 0) return;
              $(td).addClass(pfx + 'datatable__cell--check'); // append checkbox

              var chk = $('<label/>').addClass(pfx + 'checkbox ' + pfx + 'checkbox--single ' + pfx + 'checkbox--all').append($('<input/>').attr('type', 'checkbox').on('click', function () {
                if ($(this).is(':checked')) {
                  Plugin.setActiveAll(true);
                } else {
                  Plugin.setActiveAll(false);
                }
              })).append('&nbsp;<span></span>'); // checkbox selector has outline style

              if (typeof column.selector.class !== 'undefined') {
                $(chk).addClass(column.selector.class);
              }

              $(td).children().html(chk);
            }
          }
        };

        if (options.layout.header) {
          initCheckbox($(datatable.tableHead).find('.' + pfx + 'datatable__row').first());
        }

        if (options.layout.footer) {
          initCheckbox($(datatable.tableFoot).find('.' + pfx + 'datatable__row').first());
        }
      },

      /**
       * Adjust width to match container size
       */
      adjustCellsWidth: function adjustCellsWidth() {
        // get table width
        var containerWidth = $(datatable.tableBody).innerWidth() - Plugin.iconOffset; // get total number of columns

        var columns = $(datatable.tableBody).find('.' + pfx + 'datatable__row:first-child').find('.' + pfx + 'datatable__cell'). // exclude expand icon
        not('.' + pfx + 'datatable__toggle-detail').not(':hidden').length;

        if (columns > 0) {
          //  remove reserved sort icon width
          containerWidth = containerWidth - Plugin.iconOffset * columns;
          var minWidth = Math.floor(containerWidth / columns); // minimum width

          if (minWidth <= Plugin.cellOffset) {
            minWidth = Plugin.cellOffset;
          }

          $(datatable.table).find('.' + pfx + 'datatable__row').find('.' + pfx + 'datatable__cell'). // exclude expand icon
          not('.' + pfx + 'datatable__toggle-detail').not(':hidden').each(function (tdi, td) {
            var width = minWidth;
            var dataWidth = $(td).data('width');

            if (typeof dataWidth !== 'undefined') {
              width = dataWidth;
            }

            $(td).children().css('width', Math.ceil(width));
          });
        }

        return datatable;
      },

      /**
       * Adjust height to match container size
       */
      adjustCellsHeight: function adjustCellsHeight() {
        $.each($(datatable.table).children(), function (part, tablePart) {
          var totalRows = $(tablePart).find('.' + pfx + 'datatable__row').first().parent().find('.' + pfx + 'datatable__row').length;

          for (var i = 1; i <= totalRows; i++) {
            var rows = $(tablePart).find('.' + pfx + 'datatable__row:nth-child(' + i + ')');

            if ($(rows).length > 0) {
              var maxHeight = Math.max.apply(null, $(rows).map(function () {
                return $(this).outerHeight();
              }).get());
              $(rows).css('height', Math.ceil(maxHeight));
            }
          }
        });
      },

      /**
       * Setup table DOM and classes
       */
      setupDOM: function setupDOM(table) {
        // set table classes
        $(table).find('> thead').addClass(pfx + 'datatable__head');
        $(table).find('> tbody').addClass(pfx + 'datatable__body');
        $(table).find('> tfoot').addClass(pfx + 'datatable__foot');
        $(table).find('tr').addClass(pfx + 'datatable__row');
        $(table).find('tr > th, tr > td').addClass(pfx + 'datatable__cell');
        $(table).find('tr > th, tr > td').each(function (i, td) {
          if ($(td).find('span').length === 0) {
            $(td).wrapInner($('<span/>').css('width', Plugin.cellOffset));
          }
        });
      },

      /**
       * Default scrollbar
       * @returns {{tableLocked: null, init: init, onScrolling: onScrolling}}
       */
      scrollbar: function scrollbar() {
        var scroll = {
          scrollable: null,
          tableLocked: null,
          initPosition: null,
          init: function init() {
            var screen = util.getViewPort().width; // setup scrollable datatable

            if (options.layout.scroll) {
              // add scrollable datatable class
              $(datatable.wrap).addClass(pfx + 'datatable--scroll');
              var scrollable = $(datatable.tableBody).find('.' + pfx + 'datatable__lock--scroll'); // check if scrollable area have rows

              if ($(scrollable).find('.' + pfx + 'datatable__row').length > 0 && $(scrollable).length > 0) {
                scroll.scrollHead = $(datatable.tableHead).find('> .' + pfx + 'datatable__lock--scroll > .' + pfx + 'datatable__row');
                scroll.scrollFoot = $(datatable.tableFoot).find('> .' + pfx + 'datatable__lock--scroll > .' + pfx + 'datatable__row');
                scroll.tableLocked = $(datatable.tableBody).find('.' + pfx + 'datatable__lock:not(.' + pfx + 'datatable__lock--scroll)');

                if (Plugin.getOption('layout.customScrollbar') && util.detectIE() != 10 && screen > util.getBreakpoint('lg')) {
                  scroll.initCustomScrollbar(scrollable[0]);
                } else {
                  scroll.initDefaultScrollbar(scrollable);
                }
              } else if ($(datatable.tableBody).find('.' + pfx + 'datatable__row').length > 0) {
                scroll.scrollHead = $(datatable.tableHead).find('> .' + pfx + 'datatable__row');
                scroll.scrollFoot = $(datatable.tableFoot).find('> .' + pfx + 'datatable__row');

                if (Plugin.getOption('layout.customScrollbar') && util.detectIE() != 10 && screen > util.getBreakpoint('lg')) {
                  scroll.initCustomScrollbar(datatable.tableBody);
                } else {
                  scroll.initDefaultScrollbar(datatable.tableBody);
                }
              }
            }
          },
          initDefaultScrollbar: function initDefaultScrollbar(scrollable) {
            // get initial scroll position
            scroll.initPosition = $(scrollable).scrollLeft();
            $(scrollable).css('overflow', 'auto').off().on('scroll', scroll.onScrolling);
          },
          onScrolling: function onScrolling(e) {
            var left = $(this).scrollLeft();
            var top = $(this).scrollTop();

            if (util.isRTL()) {
              // deduct initial position for RTL
              left = left - scroll.initPosition;
            }

            $(scroll.scrollHead).css('left', -left);
            $(scroll.scrollFoot).css('left', -left);
            $(scroll.tableLocked).each(function (i, table) {
              if (Plugin.isLocked()) {
                // scrollbar offset
                top -= 1;
              }

              $(table).css('top', -top);
            });
          },
          initCustomScrollbar: function initCustomScrollbar(scrollable) {
            scroll.scrollable = scrollable; // create a new instance for table body with scrollbar

            Plugin.initScrollbar(scrollable); // get initial scroll position

            scroll.initPosition = $(scrollable).scrollLeft();
            $(scrollable).off().on('scroll', scroll.onScrolling);
          }
        };
        scroll.init();
        return scroll;
      },

      /**
       * Init custom scrollbar and reset position
       * @param element
       * @param options
       */
      initScrollbar: function initScrollbar(element, options) {
        $(datatable.tableBody).css('overflow', '');

        if (util.hasClass(element, 'ps')) {
          $(element).data('ps').update();
        } else {
          var ps = new PerfectScrollbar(element);
          $(element).data('ps', ps); // reset perfect scrollbar on resize

          $(window).resize(function () {
            ps.update();
          });
        }
      },

      /**
       * Set column title from options.columns settings
       */
      setHeadTitle: function setHeadTitle(tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableHead;
        tablePart = $(tablePart)[0];
        var columns = options.columns;
        var row = tablePart.getElementsByTagName('tr')[0];
        var ths = tablePart.getElementsByTagName('td');

        if (typeof row === 'undefined') {
          row = document.createElement('tr');
          tablePart.appendChild(row);
        }

        $.each(columns, function (i, column) {
          var th = ths[i];

          if (typeof th === 'undefined') {
            th = document.createElement('th');
            row.appendChild(th);
          } // set column title


          if (typeof column['title'] !== 'undefined') {
            th.innerHTML = column.title;
            th.setAttribute('data-field', column.field);
            util.addClass(th, column.class); // set disable autoHide or force enable

            if (typeof column.autoHide !== 'undefined') {
              if (column.autoHide !== true) {
                th.setAttribute('data-autohide-disabled', column.autoHide);
              } else {
                th.setAttribute('data-autohide-enabled', column.autoHide);
              }
            }

            $(th).data(column);
          } // set header attr option


          if (typeof column.attr !== 'undefined') {
            $.each(column.attr, function (key, val) {
              th.setAttribute(key, val);
            });
          } // apply text align to thead/tfoot


          if (typeof column.textAlign !== 'undefined') {
            var align = typeof datatable.textAlign[column.textAlign] !== 'undefined' ? datatable.textAlign[column.textAlign] : '';
            util.addClass(th, align);
          }
        });
        Plugin.setupDOM(tablePart);
      },

      /**
       * Initiate to get remote or local data via ajax
       */
      dataRender: function dataRender(action) {
        $(datatable.table).siblings('.' + pfx + 'datatable__pager').removeClass(pfx + 'datatable--paging-loaded');

        var buildMeta = function buildMeta() {
          datatable.dataSet = datatable.dataSet || [];
          Plugin.localDataUpdate(); // local pagination meta

          var meta = Plugin.getDataSourceParam('pagination');

          if (meta.perpage === 0) {
            meta.perpage = options.data.pageSize || 10;
          }

          meta.total = datatable.dataSet.length;
          var start = Math.max(meta.perpage * (meta.page - 1), 0);
          var end = Math.min(start + meta.perpage, meta.total);
          datatable.dataSet = $(datatable.dataSet).slice(start, end);
          return meta;
        };

        var afterGetData = function afterGetData(result) {
          var localPagingCallback = function localPagingCallback(ctx, meta) {
            if (!$(ctx.pager).hasClass(pfx + 'datatable--paging-loaded')) {
              $(ctx.pager).remove();
              ctx.init(meta);
            }

            $(ctx.pager).off().on(pfx + 'datatable--on-goto-page', function (e) {
              $(ctx.pager).remove();
              ctx.init(meta);
            });
            var start = Math.max(meta.perpage * (meta.page - 1), 0);
            var end = Math.min(start + meta.perpage, meta.total);
            Plugin.localDataUpdate();
            datatable.dataSet = $(datatable.dataSet).slice(start, end); // insert data into table content

            Plugin.insertData();
          };

          $(datatable.wrap).removeClass(pfx + 'datatable--error'); // pagination enabled

          if (options.pagination) {
            if (options.data.serverPaging && options.data.type !== 'local') {
              // server pagination
              var serverMeta = Plugin.getObject('meta', result || null);

              if (serverMeta !== null) {
                Plugin.paging(serverMeta);
              } else {
                // no meta object from server response, fallback to local pagination
                Plugin.paging(buildMeta(), localPagingCallback);
              }
            } else {
              // local pagination can be used by remote data also
              Plugin.paging(buildMeta(), localPagingCallback);
            }
          } else {
            // pagination is disabled
            Plugin.localDataUpdate();
          } // insert data into table content


          Plugin.insertData();
        }; // get local datasource


        if (options.data.type === 'local' // for remote json datasource
        // || typeof options.data.source.read === 'undefined' && datatable.dataSet !== null
        // for remote datasource, server sorting is disabled and data already received from remote
        || options.data.serverSorting === false && action === 'sort' || options.data.serverFiltering === false && action === 'search') {
          afterGetData();
          return;
        } // getting data from remote only


        Plugin.getData().done(afterGetData);
      },

      /**
       * Process ajax data
       */
      insertData: function insertData() {
        datatable.dataSet = datatable.dataSet || [];
        var params = Plugin.getDataSourceParam(); // get row attributes

        var pagination = params.pagination;
        var start = (Math.max(pagination.page, 1) - 1) * pagination.perpage;
        var end = Math.min(pagination.page, pagination.pages) * pagination.perpage;
        var rowProps = {};

        if (typeof options.data.attr.rowProps !== 'undefined' && options.data.attr.rowProps.length) {
          rowProps = options.data.attr.rowProps.slice(start, end);
        }

        var tableBody = document.createElement('tbody');
        tableBody.style.visibility = 'hidden';
        var colLength = options.columns.length;
        $.each(datatable.dataSet, function (rowIndex, row) {
          var tr = document.createElement('tr');
          tr.setAttribute('data-row', rowIndex); // keep data object to row

          $(tr).data('obj', row);

          if (typeof rowProps[rowIndex] !== 'undefined') {
            $.each(rowProps[rowIndex], function () {
              tr.setAttribute(this.name, this.value);
            });
          }

          var cellIndex = 0;
          var tds = [];

          for (var a = 0; a < colLength; a += 1) {
            var column = options.columns[a];
            var classes = []; // add sorted class to cells

            if (Plugin.getObject('sort.field', params) === column.field) {
              classes.push(pfx + 'datatable__cell--sorted');
            } // apply text align


            if (typeof column.textAlign !== 'undefined') {
              var align = typeof datatable.textAlign[column.textAlign] !== 'undefined' ? datatable.textAlign[column.textAlign] : '';
              classes.push(align);
            } // var classAttr = '';


            if (typeof column.class !== 'undefined') {
              classes.push(column.class);
            }

            var td = document.createElement('td');
            util.addClass(td, classes.join(' '));
            td.setAttribute('data-field', column.field); // set disable autoHide or force enable

            if (typeof column.autoHide !== 'undefined') {
              if (column.autoHide !== true) {
                td.setAttribute('data-autohide-disabled', column.autoHide);
              } else {
                td.setAttribute('data-autohide-enabled', column.autoHide);
              }
            }

            td.innerHTML = Plugin.getObject(column.field, row);
            tr.appendChild(td);
          }

          tableBody.appendChild(tr);
        }); // display no records message

        if (datatable.dataSet.length === 0) {
          var errorSpan = document.createElement('span');
          util.addClass(errorSpan, pfx + 'datatable--error');
          errorSpan.innerHTML = Plugin.getOption('translate.records.noRecords');
          tableBody.appendChild(errorSpan);
          $(datatable.wrap).addClass(pfx + 'datatable--error ' + pfx + 'datatable--loaded');
          Plugin.spinnerCallback(false);
        } // replace existing table body


        $(datatable.tableBody).replaceWith(tableBody);
        datatable.tableBody = tableBody; // layout update

        Plugin.setupDOM(datatable.table);
        Plugin.setupCellField([datatable.tableBody]);
        Plugin.setupTemplateCell(datatable.tableBody);
        Plugin.layoutUpdate();
      },
      updateTableComponents: function updateTableComponents() {
        datatable.tableHead = $(datatable.table).children('thead');
        datatable.tableBody = $(datatable.table).children('tbody');
        datatable.tableFoot = $(datatable.table).children('tfoot');
      },

      /**
       * Call ajax for raw JSON data
       */
      getData: function getData() {
        // Plugin.spinnerCallback(true);
        var ajaxParams = {
          dataType: 'json',
          method: 'GET',
          data: {},
          timeout: Plugin.getOption('data.source.read.timeout') || 30000
        };

        if (options.data.type === 'local') {
          ajaxParams.url = options.data.source;
        }

        if (options.data.type === 'remote') {
          ajaxParams.url = Plugin.getOption('data.source.read.url');
          if (typeof ajaxParams.url !== 'string') ajaxParams.url = Plugin.getOption('data.source.read');
          if (typeof ajaxParams.url !== 'string') ajaxParams.url = Plugin.getOption('data.source');
          ajaxParams.headers = Plugin.getOption('data.source.read.headers');
          ajaxParams.method = Plugin.getOption('data.source.read.method') || 'POST';
          var data = Plugin.getDataSourceParam(); // remove if server params is not enabled

          if (!Plugin.getOption('data.serverPaging')) {
            delete data['pagination'];
          }

          if (!Plugin.getOption('data.serverSorting')) {
            delete data['sort'];
          }

          ajaxParams.data = $.extend({}, ajaxParams.data, data, Plugin.getOption('data.source.read.params'));
        }

        return $.ajax(ajaxParams).done(function (response, textStatus, jqXHR) {
          datatable.lastResponse = response; // extendible data map callback for custom datasource

          datatable.dataSet = datatable.originalDataSet = Plugin.dataMapCallback(response);
          Plugin.setAutoColumns();
          $(datatable).trigger(pfx + 'datatable--on-ajax-done', [datatable.dataSet]);
        }).fail(function (jqXHR, textStatus, errorThrown) {
          $(datatable).trigger(pfx + 'datatable--on-ajax-fail', [jqXHR]);
          $(datatable.tableBody).html($('<span/>').addClass(pfx + 'datatable--error').html(Plugin.getOption('translate.records.noRecords')));
          $(datatable.wrap).addClass(pfx + 'datatable--error ' + pfx + 'datatable--loaded');
          Plugin.spinnerCallback(false);
        }).always(function () {});
      },

      /**
       * Pagination object
       * @param meta if null, local pagination, otherwise remote pagination
       * @param callback for update data when navigating page
       */
      paging: function paging(meta, callback) {
        var pg = {
          meta: null,
          pager: null,
          paginateEvent: null,
          pagerLayout: {
            pagination: null,
            info: null
          },
          callback: null,
          init: function init(meta) {
            pg.meta = meta; // parse pagination meta to integer

            pg.meta.page = parseInt(pg.meta.page);
            pg.meta.pages = parseInt(pg.meta.pages);
            pg.meta.perpage = parseInt(pg.meta.perpage);
            pg.meta.total = parseInt(pg.meta.total); // always recount total pages

            pg.meta.pages = Math.max(Math.ceil(pg.meta.total / pg.meta.perpage), 1); // current page must be not over than total pages

            if (pg.meta.page > pg.meta.pages) pg.meta.page = pg.meta.pages; // set unique event name between tables

            pg.paginateEvent = Plugin.getTablePrefix();
            pg.pager = $(datatable.table).siblings('.' + pfx + 'datatable__pager');
            if ($(pg.pager).hasClass(pfx + 'datatable--paging-loaded')) return; // if class .'+pfx+'datatable--paging-loaded not exist, recreate pagination

            $(pg.pager).remove(); // if no pages available

            if (pg.meta.pages === 0) return; // update datasource params

            Plugin.setDataSourceParam('pagination', {
              page: pg.meta.page,
              pages: pg.meta.pages,
              perpage: pg.meta.perpage,
              total: pg.meta.total
            }); // default callback function, contains remote pagination handler

            pg.callback = pg.serverCallback; // custom callback function

            if (typeof callback === 'function') pg.callback = callback;
            pg.addPaginateEvent();
            pg.populate();
            pg.meta.page = Math.max(pg.meta.page || 1, pg.meta.page);
            $(datatable).trigger(pg.paginateEvent, pg.meta);
            pg.pagingBreakpoint.call();
            $(window).resize(pg.pagingBreakpoint);
          },
          serverCallback: function serverCallback(ctx, meta) {
            Plugin.dataRender();
          },
          populate: function populate() {
            var icons = Plugin.getOption('layout.icons.pagination');
            var title = Plugin.getOption('translate.toolbar.pagination.items.default'); // pager root element

            pg.pager = $('<div/>').addClass(pfx + 'datatable__pager ' + pfx + 'datatable--paging-loaded clearfix'); // numbering links

            var pagerNumber = $('<ul/>').addClass(pfx + 'datatable__pager-nav');
            pg.pagerLayout['pagination'] = pagerNumber; // pager first/previous button

            $('<li/>').append($('<a/>').attr('title', title.first).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--first').append($('<i/>').addClass(icons.first)).on('click', pg.gotoMorePage).attr('data-page', 1)).appendTo(pagerNumber);
            $('<li/>').append($('<a/>').attr('title', title.prev).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--prev').append($('<i/>').addClass(icons.prev)).on('click', pg.gotoMorePage)).appendTo(pagerNumber); // more previous pages

            $('<li/>').append($('<a/>').attr('title', title.more).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--more-prev').html($('<i/>').addClass(icons.more)).on('click', pg.gotoMorePage)).appendTo(pagerNumber);
            $('<li/>').append($('<input/>').attr('type', 'text').addClass(pfx + 'pager-input form-control').attr('title', title.input).on('keyup', function () {
              // on keyup update [data-page]
              $(this).attr('data-page', Math.abs($(this).val()));
            }).on('keypress', function (e) {
              // on keypressed enter button
              if (e.which === 13) pg.gotoMorePage(e);
            })).appendTo(pagerNumber);
            var pagesNumber = Plugin.getOption('toolbar.items.pagination.pages.desktop.pagesNumber');
            var end = Math.ceil(pg.meta.page / pagesNumber) * pagesNumber;
            var start = end - pagesNumber;

            if (end > pg.meta.pages) {
              end = pg.meta.pages;
            }

            for (var x = start; x < end; x++) {
              var pageNumber = x + 1;
              $('<li/>').append($('<a/>').addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link-number').text(pageNumber).attr('data-page', pageNumber).attr('title', pageNumber).on('click', pg.gotoPage)).appendTo(pagerNumber);
            } // more next pages


            $('<li/>').append($('<a/>').attr('title', title.more).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--more-next').html($('<i/>').addClass(icons.more)).on('click', pg.gotoMorePage)).appendTo(pagerNumber); // pager next/last button

            $('<li/>').append($('<a/>').attr('title', title.next).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--next').append($('<i/>').addClass(icons.next)).on('click', pg.gotoMorePage)).appendTo(pagerNumber);
            $('<li/>').append($('<a/>').attr('title', title.last).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--last').append($('<i/>').addClass(icons.last)).on('click', pg.gotoMorePage).attr('data-page', pg.meta.pages)).appendTo(pagerNumber); // page info

            if (Plugin.getOption('toolbar.items.info')) {
              pg.pagerLayout['info'] = $('<div/>').addClass(pfx + 'datatable__pager-info').append($('<span/>').addClass(pfx + 'datatable__pager-detail'));
            }

            $.each(Plugin.getOption('toolbar.layout'), function (i, layout) {
              $(pg.pagerLayout[layout]).appendTo(pg.pager);
            }); // page size select

            var pageSizeSelect = $('<select/>').addClass('selectpicker ' + pfx + 'datatable__pager-size').attr('title', Plugin.getOption('translate.toolbar.pagination.items.default.select')).attr('data-width', '70px').val(pg.meta.perpage).on('change', pg.updatePerpage).prependTo(pg.pagerLayout['info']);
            var pageSizes = Plugin.getOption('toolbar.items.pagination.pageSizeSelect'); // default value here, to fix override option by user

            if (pageSizes.length == 0) pageSizes = [10, 20, 30, 50, 100];
            $.each(pageSizes, function (i, size) {
              var display = size;
              if (size === -1) display = Plugin.getOption('translate.toolbar.pagination.items.default.all');
              $('<option/>').attr('value', size).html(display).appendTo(pageSizeSelect);
            }); // init selectpicker to dropdown

            $(datatable).ready(function () {
              $('.selectpicker').selectpicker().on('hide.bs.select', function () {
                // fix dropup arrow icon on hide
                $(this).closest('.bootstrap-select').removeClass('dropup');
              }).siblings('.dropdown-toggle').attr('title', Plugin.getOption('translate.toolbar.pagination.items.default.select'));
            });
            pg.paste();
          },
          paste: function paste() {
            // insert pagination based on placement position, top|bottom
            $.each($.unique(Plugin.getOption('toolbar.placement')), function (i, position) {
              if (position === 'bottom') {
                $(pg.pager).clone(true).insertAfter(datatable.table);
              }

              if (position === 'top') {
                // pager top need some extra space
                $(pg.pager).clone(true).addClass(pfx + 'datatable__pager--top').insertBefore(datatable.table);
              }
            });
          },
          gotoMorePage: function gotoMorePage(e) {
            e.preventDefault(); // $(this) is a link of .'+pfx+'datatable__pager-link

            if ($(this).attr('disabled') === 'disabled') return false;
            var page = $(this).attr('data-page'); // event from text input

            if (typeof page === 'undefined') {
              page = $(e.target).attr('data-page');
            }

            pg.openPage(parseInt(page));
            return false;
          },
          gotoPage: function gotoPage(e) {
            e.preventDefault(); // prevent from click same page number

            if ($(this).hasClass(pfx + 'datatable__pager-link--active')) return;
            pg.openPage(parseInt($(this).data('page')));
          },
          openPage: function openPage(page) {
            // currentPage is 1-based index
            pg.meta.page = parseInt(page);
            $(datatable).trigger(pg.paginateEvent, pg.meta);
            pg.callback(pg, pg.meta); // update page callback function

            $(pg.pager).trigger(pfx + 'datatable--on-goto-page', pg.meta);
          },
          updatePerpage: function updatePerpage(e) {
            e.preventDefault(); // if (Plugin.getOption('layout.height') === null) {
            // fix white space, when perpage is set from many records to less records
            // $('html, body').animate({scrollTop: $(datatable).position().top});
            // }

            pg.pager = $(datatable.table).siblings('.' + pfx + 'datatable__pager').removeClass(pfx + 'datatable--paging-loaded'); // on change select page size

            if (e.originalEvent) {
              pg.meta.perpage = parseInt($(this).val());
            }

            $(pg.pager).find('select.' + pfx + 'datatable__pager-size').val(pg.meta.perpage).attr('data-selected', pg.meta.perpage); // update datasource params

            Plugin.setDataSourceParam('pagination', {
              page: pg.meta.page,
              pages: pg.meta.pages,
              perpage: pg.meta.perpage,
              total: pg.meta.total
            }); // update page callback function

            $(pg.pager).trigger(pfx + 'datatable--on-update-perpage', pg.meta);
            $(datatable).trigger(pg.paginateEvent, pg.meta);
            pg.callback(pg, pg.meta); // update pagination info

            pg.updateInfo.call();
          },
          addPaginateEvent: function addPaginateEvent(e) {
            // pagination event
            $(datatable).off(pg.paginateEvent).on(pg.paginateEvent, function (e, meta) {
              Plugin.spinnerCallback(true);
              pg.pager = $(datatable.table).siblings('.' + pfx + 'datatable__pager');
              var pagerNumber = $(pg.pager).find('.' + pfx + 'datatable__pager-nav'); // set sync active page class

              $(pagerNumber).find('.' + pfx + 'datatable__pager-link--active').removeClass(pfx + 'datatable__pager-link--active');
              $(pagerNumber).find('.' + pfx + 'datatable__pager-link-number[data-page="' + meta.page + '"]').addClass(pfx + 'datatable__pager-link--active'); // set next and previous link page number

              $(pagerNumber).find('.' + pfx + 'datatable__pager-link--prev').attr('data-page', Math.max(meta.page - 1, 1));
              $(pagerNumber).find('.' + pfx + 'datatable__pager-link--next').attr('data-page', Math.min(meta.page + 1, meta.pages)); // current page input value sync

              $(pg.pager).each(function () {
                $(this).find('.' + pfx + 'pager-input[type="text"]').prop('value', meta.page);
              });
              $(pg.pager).find('.' + pfx + 'datatable__pager-nav').show();

              if (meta.pages <= 1) {
                // hide pager if has 1 page
                $(pg.pager).find('.' + pfx + 'datatable__pager-nav').hide();
              } // update datasource params


              Plugin.setDataSourceParam('pagination', {
                page: pg.meta.page,
                pages: pg.meta.pages,
                perpage: pg.meta.perpage,
                total: pg.meta.total
              });
              $(pg.pager).find('select.' + pfx + 'datatable__pager-size').val(meta.perpage).attr('data-selected', meta.perpage); // clear active rows

              $(datatable.table).find('.' + pfx + 'checkbox > [type="checkbox"]').prop('checked', false);
              $(datatable.table).find('.' + pfx + 'datatable__row--active').removeClass(pfx + 'datatable__row--active');
              pg.updateInfo.call();
              pg.pagingBreakpoint.call(); // Plugin.resetScroll();
            });
          },
          updateInfo: function updateInfo() {
            var start = Math.max(pg.meta.perpage * (pg.meta.page - 1) + 1, 1);
            var end = Math.min(start + pg.meta.perpage - 1, pg.meta.total); // page info update

            $(pg.pager).find('.' + pfx + 'datatable__pager-info').find('.' + pfx + 'datatable__pager-detail').html(Plugin.dataPlaceholder(Plugin.getOption('translate.toolbar.pagination.items.info'), {
              start: start,
              end: pg.meta.perpage === -1 ? pg.meta.total : end,
              pageSize: pg.meta.perpage === -1 || pg.meta.perpage >= pg.meta.total ? pg.meta.total : pg.meta.perpage,
              total: pg.meta.total
            }));
          },

          /**
           * Update pagination layout breakpoint
           */
          pagingBreakpoint: function pagingBreakpoint() {
            // keep page links reference
            var pagerNumber = $(datatable.table).siblings('.' + pfx + 'datatable__pager').find('.' + pfx + 'datatable__pager-nav');
            if ($(pagerNumber).length === 0) return;
            var currentPage = Plugin.getCurrentPage();
            var pagerInput = $(pagerNumber).find('.' + pfx + 'pager-input').closest('li'); // reset

            $(pagerNumber).find('li').show(); // pagination update

            $.each(Plugin.getOption('toolbar.items.pagination.pages'), function (mode, option) {
              if (util.isInResponsiveRange(mode)) {
                switch (mode) {
                  case 'desktop':
                  case 'tablet':
                    var end = Math.ceil(currentPage / option.pagesNumber) * option.pagesNumber;
                    var start = end - option.pagesNumber;
                    $(pagerInput).hide();
                    pg.meta = Plugin.getDataSourceParam('pagination');
                    pg.paginationUpdate();
                    break;

                  case 'mobile':
                    $(pagerInput).show();
                    $(pagerNumber).find('.' + pfx + 'datatable__pager-link--more-prev').closest('li').hide();
                    $(pagerNumber).find('.' + pfx + 'datatable__pager-link--more-next').closest('li').hide();
                    $(pagerNumber).find('.' + pfx + 'datatable__pager-link-number').closest('li').hide();
                    break;
                }

                return false;
              }
            });
          },

          /**
           * Update pagination number and button display
           */
          paginationUpdate: function paginationUpdate() {
            var pager = $(datatable.table).siblings('.' + pfx + 'datatable__pager').find('.' + pfx + 'datatable__pager-nav'),
                pagerMorePrev = $(pager).find('.' + pfx + 'datatable__pager-link--more-prev'),
                pagerMoreNext = $(pager).find('.' + pfx + 'datatable__pager-link--more-next'),
                pagerFirst = $(pager).find('.' + pfx + 'datatable__pager-link--first'),
                pagerPrev = $(pager).find('.' + pfx + 'datatable__pager-link--prev'),
                pagerNext = $(pager).find('.' + pfx + 'datatable__pager-link--next'),
                pagerLast = $(pager).find('.' + pfx + 'datatable__pager-link--last'); // get visible page

            var pagerNumber = $(pager).find('.' + pfx + 'datatable__pager-link-number'); // get page before of first visible

            var morePrevPage = Math.max($(pagerNumber).first().data('page') - 1, 1);
            $(pagerMorePrev).each(function (i, prev) {
              $(prev).attr('data-page', morePrevPage);
            }); // show/hide <li>

            if (morePrevPage === 1) {
              $(pagerMorePrev).parent().hide();
            } else {
              $(pagerMorePrev).parent().show();
            } // get page after of last visible


            var moreNextPage = Math.min($(pagerNumber).last().data('page') + 1, pg.meta.pages);
            $(pagerMoreNext).each(function (i, prev) {
              $(pagerMoreNext).attr('data-page', moreNextPage).show();
            }); // show/hide <li>

            if (moreNextPage === pg.meta.pages // missing dot fix when last hidden page is one left
            && moreNextPage === $(pagerNumber).last().data('page')) {
              $(pagerMoreNext).parent().hide();
            } else {
              $(pagerMoreNext).parent().show();
            } // begin/end of pages


            if (pg.meta.page === 1) {
              $(pagerFirst).attr('disabled', true).addClass(pfx + 'datatable__pager-link--disabled');
              $(pagerPrev).attr('disabled', true).addClass(pfx + 'datatable__pager-link--disabled');
            } else {
              $(pagerFirst).removeAttr('disabled').removeClass(pfx + 'datatable__pager-link--disabled');
              $(pagerPrev).removeAttr('disabled').removeClass(pfx + 'datatable__pager-link--disabled');
            }

            if (pg.meta.page === pg.meta.pages) {
              $(pagerNext).attr('disabled', true).addClass(pfx + 'datatable__pager-link--disabled');
              $(pagerLast).attr('disabled', true).addClass(pfx + 'datatable__pager-link--disabled');
            } else {
              $(pagerNext).removeAttr('disabled').removeClass(pfx + 'datatable__pager-link--disabled');
              $(pagerLast).removeAttr('disabled').removeClass(pfx + 'datatable__pager-link--disabled');
            } // display more buttons


            var nav = Plugin.getOption('toolbar.items.pagination.navigation');
            if (!nav.first) $(pagerFirst).remove();
            if (!nav.prev) $(pagerPrev).remove();
            if (!nav.next) $(pagerNext).remove();
            if (!nav.last) $(pagerLast).remove();
          }
        };
        pg.init(meta);
        return pg;
      },

      /**
       * Hide/show table cell defined by
       * options[columns][i][responsive][visible/hidden]
       */
      columnHide: function columnHide() {
        var screen = util.getViewPort().width; // foreach columns setting

        $.each(options.columns, function (i, column) {
          if (typeof column.responsive !== 'undefined') {
            var field = column.field;
            var tds = $.grep($(datatable.table).find('.' + pfx + 'datatable__cell'), function (n, i) {
              return field === $(n).data('field');
            });

            if (util.getBreakpoint(column.responsive.hidden) >= screen) {
              $(tds).hide();
            } else {
              $(tds).show();
            }

            if (util.getBreakpoint(column.responsive.visible) <= screen) {
              $(tds).show();
            } else {
              $(tds).hide();
            }
          }
        });
      },

      /**
       * Setup sub datatable
       */
      setupSubDatatable: function setupSubDatatable() {
        var subTableCallback = Plugin.getOption('detail.content');
        if (typeof subTableCallback !== 'function') return; // subtable already exist

        if ($(datatable.table).find('.' + pfx + 'datatable__subtable').length > 0) return;
        $(datatable.wrap).addClass(pfx + 'datatable--subtable');
        options.columns[0]['subtable'] = true; // toggle on open sub table

        var toggleSubTable = function toggleSubTable(e) {
          e.preventDefault(); // get parent row of this subtable

          var parentRow = $(this).closest('.' + pfx + 'datatable__row'); // get subtable row for sub table

          var subTableRow = $(parentRow).next('.' + pfx + 'datatable__row-subtable');

          if ($(subTableRow).length === 0) {
            // prepare DOM for sub table, each <tr> as parent and add <tr> as child table
            subTableRow = $('<tr/>').addClass(pfx + 'datatable__row-subtable ' + pfx + 'datatable__row-loading').hide().append($('<td/>').addClass(pfx + 'datatable__subtable').attr('colspan', Plugin.getTotalColumns()));
            $(parentRow).after(subTableRow); // add class to even row

            if ($(parentRow).hasClass(pfx + 'datatable__row--even')) {
              $(subTableRow).addClass(pfx + 'datatable__row-subtable--even');
            }
          }

          $(subTableRow).toggle();
          var subTable = $(subTableRow).find('.' + pfx + 'datatable__subtable'); // get id from first column of parent row

          var primaryKey = $(this).closest('[data-field]:first-child').find('.' + pfx + 'datatable__toggle-subtable').data('value');
          var icon = $(this).find('i').removeAttr('class'); // prevent duplicate datatable init

          if ($(parentRow).hasClass(pfx + 'datatable__row--subtable-expanded')) {
            $(icon).addClass(Plugin.getOption('layout.icons.rowDetail.collapse')); // remove expand class from parent row

            $(parentRow).removeClass(pfx + 'datatable__row--subtable-expanded'); // trigger event on collapse

            $(datatable).trigger(pfx + 'datatable--on-collapse-subtable', [parentRow]);
          } else {
            // expand and run callback function
            $(icon).addClass(Plugin.getOption('layout.icons.rowDetail.expand')); // add expand class to parent row

            $(parentRow).addClass(pfx + 'datatable__row--subtable-expanded'); // trigger event on expand

            $(datatable).trigger(pfx + 'datatable--on-expand-subtable', [parentRow]);
          } // prevent duplicate datatable init


          if ($(subTable).find('.' + pfx + 'datatable').length === 0) {
            // get data by primary id
            $.map(datatable.dataSet, function (n, i) {
              // primary id must be at the first column, otherwise e.data will be undefined
              if (primaryKey === n[options.columns[0].field]) {
                e.data = n;
                return true;
              }

              return false;
            }); // deprecated in v5.0.6

            e.detailCell = subTable;
            e.parentRow = parentRow;
            e.subTable = subTable; // run callback with event

            subTableCallback(e);
            $(subTable).children('.' + pfx + 'datatable').on(pfx + 'datatable--on-init', function (e) {
              $(subTableRow).removeClass(pfx + 'datatable__row-loading');
            });

            if (Plugin.getOption('data.type') === 'local') {
              $(subTableRow).removeClass(pfx + 'datatable__row-loading');
            }
          }
        };

        var columns = options.columns;
        $(datatable.tableBody).find('.' + pfx + 'datatable__row').each(function (tri, tr) {
          $(tr).find('.' + pfx + 'datatable__cell').each(function (tdi, td) {
            // get column settings by field
            var column = $.grep(columns, function (n, i) {
              return $(td).data('field') === n.field;
            })[0];

            if (typeof column !== 'undefined') {
              var value = $(td).text(); // enable column subtable toggle

              if (typeof column.subtable !== 'undefined' && column.subtable) {
                // check if subtable toggle exist
                if ($(td).find('.' + pfx + 'datatable__toggle-subtable').length > 0) return; // append subtable toggle

                $(td).html($('<a/>').addClass(pfx + 'datatable__toggle-subtable').attr('href', '#').attr('data-value', value).attr('title', Plugin.getOption('detail.title')).on('click', toggleSubTable).append($('<i/>').css('width', $(td).data('width')).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'))));
              }
            }
          });
        }); // $(datatable.tableHead).find('.'+pfx+'-datatable__row').first()
      },

      /**
       * Datasource mapping callback
       */
      dataMapCallback: function dataMapCallback(raw) {
        // static dataset array
        var dataSet = raw; // dataset mapping callback

        if (typeof Plugin.getOption('data.source.read.map') === 'function') {
          return Plugin.getOption('data.source.read.map')(raw);
        } else {
          // default data mapping fallback
          if (typeof raw !== 'undefined' && typeof raw.data !== 'undefined') {
            dataSet = raw.data;
          }
        }

        return dataSet;
      },
      isSpinning: false,

      /**
       * BlockUI spinner callback
       * @param block
       * @param target
       */
      spinnerCallback: function spinnerCallback(block, target) {
        if (typeof target === 'undefined') target = datatable; // get spinner options

        var spinnerOptions = Plugin.getOption('layout.spinner'); // spinner is disabled

        if (typeof spinnerOptions === 'undefined' || !spinnerOptions) {
          return;
        }

        if (block) {
          if (!Plugin.isSpinning) {
            if (typeof spinnerOptions.message !== 'undefined' && spinnerOptions.message === true) {
              // use default spinner message from translation
              spinnerOptions.message = Plugin.getOption('translate.records.processing');
            }

            Plugin.isSpinning = true;

            if (typeof app !== 'undefined') {
              app.block(target, spinnerOptions);
            }
          }
        } else {
          Plugin.isSpinning = false;

          if (typeof app !== 'undefined') {
            app.unblock(target);
          }
        }
      },

      /**
       * Default sort callback function
       * @param data
       * @param sort
       * @param column
       * @returns {*|Array.<T>|{sort, field}|{asc, desc}}
       */
      sortCallback: function sortCallback(data, sort, column) {
        var type = column['type'] || 'string';
        var format = column['format'] || '';
        var field = column['field'];
        return $(data).sort(function (a, b) {
          var aField = a[field];
          var bField = b[field];

          switch (type) {
            case 'date':
              if (typeof moment === 'undefined') {
                throw new Error('Moment.js is required.');
              }

              var diff = moment(aField, format).diff(moment(bField, format));

              if (sort === 'asc') {
                return diff > 0 ? 1 : diff < 0 ? -1 : 0;
              } else {
                return diff < 0 ? 1 : diff > 0 ? -1 : 0;
              }

              break;

            case 'number':
              if (isNaN(parseFloat(aField)) && aField != null) {
                aField = Number(aField.replace(/[^0-9\.-]+/g, ''));
              }

              if (isNaN(parseFloat(bField)) && bField != null) {
                bField = Number(bField.replace(/[^0-9\.-]+/g, ''));
              }

              aField = parseFloat(aField);
              bField = parseFloat(bField);

              if (sort === 'asc') {
                return aField > bField ? 1 : aField < bField ? -1 : 0;
              } else {
                return aField < bField ? 1 : aField > bField ? -1 : 0;
              }

              break;

            case 'string':
            default:
              if (sort === 'asc') {
                return aField > bField ? 1 : aField < bField ? -1 : 0;
              } else {
                return aField < bField ? 1 : aField > bField ? -1 : 0;
              }

              break;
          }
        });
      },

      /**
       * Custom debug log
       * @param text
       * @param obj
       */
      log: function log(text, obj) {
        if (typeof obj === 'undefined') obj = '';

        if (datatable.debug) {
          console.log(text, obj);
        }
      },

      /**
       * Auto hide columnds overflow in row
       */
      autoHide: function autoHide() {
        var hiddenExist = false;
        $(datatable.table).find('.' + pfx + 'datatable__cell').show(); // force hide enabled

        var hidDefault = $(datatable.table).find('[data-autohide-enabled]');

        if (hidDefault.length) {
          hiddenExist = true;
          hidDefault.hide();
        }

        $(datatable.tableBody).each(function () {
          while ($(this)[0].offsetWidth < $(this)[0].scrollWidth) {
            $(datatable.table).find('.' + pfx + 'datatable__row').each(function (i) {
              var cell = $(this).find('.' + pfx + 'datatable__cell').not(':hidden').not('[data-autohide-disabled]').last();
              $(cell).hide();
              hiddenExist = true;
            });
          }
        });

        if (!hiddenExist) {
          // no column is hidden, skip expand icons
          return;
        }

        var toggleHiddenColumns = function toggleHiddenColumns(e) {
          e.preventDefault();
          var row = $(this).closest('.' + pfx + 'datatable__row');
          var detailRow = $(row).next();

          if (!$(detailRow).hasClass(pfx + 'datatable__row-detail')) {
            $(this).find('i').removeClass(Plugin.getOption('layout.icons.rowDetail.collapse')).addClass(Plugin.getOption('layout.icons.rowDetail.expand'));
            var hidden = $(row).find('.' + pfx + 'datatable__cell:hidden').clone().show();
            detailRow = $('<tr/>').addClass(pfx + 'datatable__row-detail').insertAfter(row);
            var detailRowTd = $('<td/>').addClass(pfx + 'datatable__detail').attr('colspan', Plugin.getTotalColumns()).appendTo(detailRow);
            var detailSubTable = $('<table/>');
            $(hidden).each(function () {
              var field = $(this).data('field');
              var column = $.grep(options.columns, function (n, i) {
                return field === n.field;
              })[0];
              $(detailSubTable).append($('<tr class="' + pfx + 'datatable__row"></tr>').append($('<td class="' + pfx + 'datatable__cell"></td>').append($('<span/>').append(column.title))).append(this));
            });
            $(detailRowTd).append(detailSubTable);
          } else {
            $(this).find('i').removeClass(Plugin.getOption('layout.icons.rowDetail.expand')).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'));
            $(detailRow).remove();
          }
        }; // toggle show hidden columns


        $(datatable.tableBody).find('.' + pfx + 'datatable__row').each(function () {
          $(this).prepend($('<td/>').addClass(pfx + 'datatable__cell ' + pfx + 'datatable__toggle-detail').append($('<a/>').addClass(pfx + 'datatable__toggle-detail').attr('href', '').on('click', toggleHiddenColumns).append('<i class="' + Plugin.getOption('layout.icons.rowDetail.collapse') + '"></i>'))); // check if subtable toggle exist

          if ($(datatable.tableHead).find('.' + pfx + 'datatable__toggle-detail').length === 0) {
            $(datatable.tableHead).find('.' + pfx + 'datatable__row').first().prepend('<th class="' + pfx + 'datatable__cell ' + pfx + 'datatable__toggle-detail"><span></span></th>');
            $(datatable.tableFoot).find('.' + pfx + 'datatable__row').first().prepend('<th class="' + pfx + 'datatable__cell ' + pfx + 'datatable__toggle-detail"><span></span></th>');
          } else {
            $(datatable.tableHead).find('.' + pfx + 'datatable__toggle-detail').find('span');
          }
        });
        Plugin.adjustCellsWidth.call();
      },

      /**
       * To enable auto columns features for remote data source
       */
      setAutoColumns: function setAutoColumns() {
        if (Plugin.getOption('data.autoColumns')) {
          $.each(datatable.dataSet[0], function (k, v) {
            var found = $.grep(options.columns, function (n, i) {
              return k === n.field;
            });

            if (found.length === 0) {
              options.columns.push({
                field: k,
                title: k
              });
            }
          });
          $(datatable.tableHead).find('.' + pfx + 'datatable__row').remove();
          Plugin.setHeadTitle();

          if (Plugin.getOption('layout.footer')) {
            $(datatable.tableFoot).find('.' + pfx + 'datatable__row').remove();
            Plugin.setHeadTitle(datatable.tableFoot);
          }
        }
      },

      /********************
       ** HELPERS
       ********************/

      /**
       * Check if table is a locked colums table
       */
      isLocked: function isLocked() {
        return util.hasClass(datatable.wrap[0], pfx + 'datatable--lock') || false;
      },
      isSubtable: function isSubtable() {
        return util.hasClass(datatable.wrap[0], pfx + 'datatable--subtable') || false;
      },

      /**
       * Get total extra space of an element for width calculation, including
       * padding, margin, border
       * @param element
       * @returns {number}
       */
      getExtraSpace: function getExtraSpace(element) {
        var padding = parseInt($(element).css('paddingRight')) + parseInt($(element).css('paddingLeft'));
        var margin = parseInt($(element).css('marginRight')) + parseInt($(element).css('marginLeft'));
        var border = Math.ceil($(element).css('border-right-width').replace('px', ''));
        return padding + margin + border;
      },

      /**
       * Insert data of array into {{ }} template placeholder
       * @param template
       * @param data
       * @returns {*}
       */
      dataPlaceholder: function dataPlaceholder(template, data) {
        var result = template;
        $.each(data, function (key, val) {
          result = result.replace('{{' + key + '}}', val);
        });
        return result;
      },

      /**
       * Get table unique ID
       * Note: table unique change each time refreshed
       * @param suffix
       * @returns {*}
       */
      getTableId: function getTableId(suffix) {
        if (typeof suffix === 'undefined') suffix = '';
        var id = $(datatable).attr('id');

        if (typeof id === 'undefined') {
          id = $(datatable).attr('class').split(' ')[0];
        }

        return id + suffix;
      },

      /**
       * Get table prefix with depth number
       */
      getTablePrefix: function getTablePrefix(suffix) {
        if (typeof suffix !== 'undefined') suffix = '-' + suffix;
        return Plugin.getTableId() + '-' + Plugin.getDepth() + suffix;
      },

      /**
       * Get current table depth of sub table
       * @returns {number}
       */
      getDepth: function getDepth() {
        var depth = 0;
        var table = datatable.table;

        do {
          table = $(table).parents('.' + pfx + 'datatable__table');
          depth++;
        } while ($(table).length > 0);

        return depth;
      },

      /**
       * Keep state item
       * @param key
       * @param value
       */
      stateKeep: function stateKeep(key, value) {
        key = Plugin.getTablePrefix(key);
        if (Plugin.getOption('data.saveState') === false) return;

        if (Plugin.getOption('data.saveState.webstorage') && localStorage) {
          localStorage.setItem(key, JSON.stringify(value));
        }

        if (Plugin.getOption('data.saveState.cookie')) {
          Cookies.set(key, JSON.stringify(value));
        }
      },

      /**
       * Get state item
       * @param key
       * @param defValue
       */
      stateGet: function stateGet(key, defValue) {
        key = Plugin.getTablePrefix(key);
        if (Plugin.getOption('data.saveState') === false) return;
        var value = null;

        if (Plugin.getOption('data.saveState.webstorage') && localStorage) {
          value = localStorage.getItem(key);
        } else {
          value = Cookies.get(key);
        }

        if (typeof value !== 'undefined' && value !== null) {
          return JSON.parse(value);
        }
      },

      /**
       * Update data in state without clear existing
       * @param key
       * @param value
       */
      stateUpdate: function stateUpdate(key, value) {
        var ori = Plugin.stateGet(key);
        if (typeof ori === 'undefined' || ori === null) ori = {};
        Plugin.stateKeep(key, $.extend({}, ori, value));
      },

      /**
       * Remove state item
       * @param key
       */
      stateRemove: function stateRemove(key) {
        key = Plugin.getTablePrefix(key);

        if (localStorage) {
          localStorage.removeItem(key);
        }

        Cookies.remove(key);
      },

      /**
       * Get total columns.
       */
      getTotalColumns: function getTotalColumns(tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
        return $(tablePart).find('.' + pfx + 'datatable__row').first().find('.' + pfx + 'datatable__cell').length;
      },

      /**
       * Get table row. Useful to get row when current table is in lock mode.
       * Can be used for both lock and normal table mode.
       * By default, returning result will be in a list of <td>.
       * @param tablePart
       * @param row 1-based index
       * @param tdOnly Optional. Default true
       * @returns {*}
       */
      getOneRow: function getOneRow(tablePart, row, tdOnly) {
        if (typeof tdOnly === 'undefined') tdOnly = true; // get list of <tr>

        var result = $(tablePart).find('.' + pfx + 'datatable__row:not(.' + pfx + 'datatable__row-detail):nth-child(' + row + ')');

        if (tdOnly) {
          // get list of <td> or <th>
          result = result.find('.' + pfx + 'datatable__cell');
        }

        return result;
      },

      /**
       * Check if element has vertical overflow
       * @param element
       * @returns {boolean}
       */
      hasOverflowY: function hasOverflowY(element) {
        var children = $(element).find('.' + pfx + 'datatable__row');
        var maxHeight = 0;

        if (children.length > 0) {
          $(children).each(function (tdi, td) {
            maxHeight += Math.floor($(td).innerHeight());
          });
          return maxHeight > $(element).innerHeight();
        }

        return false;
      },

      /**
       * Sort table row at HTML level by column index.
       * todo; Not in use.
       * @param header Header sort clicked
       * @param sort asc|desc. Optional. Default asc
       * @param int Boolean. Optional. Comparison value parse to integer.
       *     Default false
       */
      sortColumn: function sortColumn(header, sort, int) {
        if (typeof sort === 'undefined') sort = 'asc'; // desc

        if (typeof int === 'undefined') int = false;
        var column = $(header).index();
        var rows = $(datatable.tableBody).find('.' + pfx + 'datatable__row');
        var hIndex = $(header).closest('.' + pfx + 'datatable__lock').index();

        if (hIndex !== -1) {
          rows = $(datatable.tableBody).find('.' + pfx + 'datatable__lock:nth-child(' + (hIndex + 1) + ')').find('.' + pfx + 'datatable__row');
        }

        var container = $(rows).parent();
        $(rows).sort(function (a, b) {
          var tda = $(a).find('td:nth-child(' + column + ')').text();
          var tdb = $(b).find('td:nth-child(' + column + ')').text();

          if (int) {
            // useful for integer type sorting
            tda = parseInt(tda);
            tdb = parseInt(tdb);
          }

          if (sort === 'asc') {
            return tda > tdb ? 1 : tda < tdb ? -1 : 0;
          } else {
            return tda < tdb ? 1 : tda > tdb ? -1 : 0;
          }
        }).appendTo(container);
      },

      /**
       * Perform sort remote and local
       */
      sorting: function sorting() {
        var sortObj = {
          init: function init() {
            if (options.sortable) {
              $(datatable.tableHead).find('.' + pfx + 'datatable__cell:not(.' + pfx + 'datatable__cell--check)').addClass(pfx + 'datatable__cell--sort').off('click').on('click', sortObj.sortClick); // first init

              sortObj.setIcon();
            }
          },
          setIcon: function setIcon() {
            var meta = Plugin.getDataSourceParam('sort');
            if ($.isEmptyObject(meta)) return;
            var column = Plugin.getColumnByField(meta.field); // sort is disabled for this column

            if (typeof column !== 'undefined' && typeof column.sortable !== 'undefined' && column.sortable === false) return; // sort icon beside column header

            var td = $(datatable.tableHead).find('.' + pfx + 'datatable__cell[data-field="' + meta.field + '"]').attr('data-sort', meta.sort);
            var sorting = $(td).find('span');
            var icon = $(sorting).find('i');
            var icons = Plugin.getOption('layout.icons.sort'); // update sort icon; desc & asc

            if ($(icon).length > 0) {
              $(icon).removeAttr('class').addClass(icons[meta.sort]);
            } else {
              $(sorting).append($('<i/>').addClass(icons[meta.sort]));
            } // set sorted class to header on init


            $(td).addClass(pfx + 'datatable__cell--sorted');
          },
          sortClick: function sortClick(e) {
            var meta = Plugin.getDataSourceParam('sort');
            var field = $(this).data('field');
            var column = Plugin.getColumnByField(field); // sort is disabled for this column

            if (typeof column.sortable !== 'undefined' && column.sortable === false) return; // set sorted class to header

            $(datatable.tableHead).find('th').removeClass(pfx + 'datatable__cell--sorted');
            util.addClass(this, pfx + 'datatable__cell--sorted');
            $(datatable.tableHead).find('.' + pfx + 'datatable__cell > span > i').remove();

            if (options.sortable) {
              Plugin.spinnerCallback(true);
              var sort = 'desc';

              if (Plugin.getObject('field', meta) === field) {
                sort = Plugin.getObject('sort', meta);
              } // toggle sort


              sort = typeof sort === 'undefined' || sort === 'desc' ? 'asc' : 'desc'; // update field and sort params

              meta = {
                field: field,
                sort: sort
              };
              Plugin.setDataSourceParam('sort', meta);
              sortObj.setIcon();
              setTimeout(function () {
                Plugin.dataRender('sort');
                $(datatable).trigger(pfx + 'datatable--on-sort', meta);
              }, 300);
            }
          }
        };
        sortObj.init();
      },

      /**
       * Update JSON data list linked with sort, filter and pagination.
       * Call this method, before using dataSet variable.
       * @returns {*|null}
       */
      localDataUpdate: function localDataUpdate() {
        var params = Plugin.getDataSourceParam();

        if (typeof datatable.originalDataSet === 'undefined') {
          datatable.originalDataSet = datatable.dataSet;
        }

        var field = Plugin.getObject('sort.field', params);
        var sort = Plugin.getObject('sort.sort', params);
        var column = Plugin.getColumnByField(field);

        if (typeof column !== 'undefined' && Plugin.getOption('data.serverSorting') !== true) {
          if (typeof column.sortCallback === 'function') {
            datatable.dataSet = column.sortCallback(datatable.originalDataSet, sort, column);
          } else {
            datatable.dataSet = Plugin.sortCallback(datatable.originalDataSet, sort, column);
          }
        } else {
          datatable.dataSet = datatable.originalDataSet;
        } // if server filter enable, don't pass local filter


        if (_typeof(params.query) === 'object' && !Plugin.getOption('data.serverFiltering')) {
          params.query = params.query || {};

          var nestedSearch = function nestedSearch(obj) {
            for (var field in obj) {
              if (!obj.hasOwnProperty(field)) continue;

              if (typeof obj[field] === 'string') {
                if (obj[field].toLowerCase() == search || obj[field].toLowerCase().indexOf(search) !== -1) {
                  return true;
                }
              } else if (typeof obj[field] === 'number') {
                if (obj[field] === search) {
                  return true;
                }
              } else if (_typeof(obj[field]) === 'object') {
                if (nestedSearch(obj[field])) {
                  return true;
                }
              }
            }

            return false;
          };

          var search = $(Plugin.getOption('search.input')).val();

          if (typeof search !== 'undefined' && search !== '') {
            search = search.toLowerCase();
            datatable.dataSet = $.grep(datatable.dataSet, nestedSearch); // remove generalSearch as we don't need this for next columns filter

            delete params.query[Plugin.getGeneralSearchKey()];
          } // remove empty element from array


          $.each(params.query, function (k, v) {
            if (v === '') {
              delete params.query[k];
            }
          }); // filter array by query

          datatable.dataSet = Plugin.filterArray(datatable.dataSet, params.query); // reset array index

          datatable.dataSet = datatable.dataSet.filter(function () {
            return true;
          });
        }

        return datatable.dataSet;
      },

      /**
       * Utility helper to filter array by object pair of {key:value}
       * @param list
       * @param args
       * @param operator
       * @returns {*}
       */
      filterArray: function filterArray(list, args, operator) {
        if (_typeof(list) !== 'object') {
          return [];
        }

        if (typeof operator === 'undefined') operator = 'AND';

        if (_typeof(args) !== 'object') {
          return list;
        }

        operator = operator.toUpperCase();

        if ($.inArray(operator, ['AND', 'OR', 'NOT']) === -1) {
          return [];
        }

        var count = Object.keys(args).length;
        var filtered = [];
        $.each(list, function (key, obj) {
          var to_match = obj;
          var matched = 0;
          $.each(args, function (m_key, m_value) {
            m_value = m_value instanceof Array ? m_value : [m_value];
            var match_property = Plugin.getObject(m_key, to_match);

            if (typeof match_property !== 'undefined') {
              var lhs = match_property.toString().toLowerCase();
              m_value.forEach(function (item, index) {
                if (item.toString().toLowerCase() == lhs || lhs.indexOf(item.toString().toLowerCase()) !== -1) {
                  matched++;
                }
              });
            }
          });

          if ('AND' == operator && matched == count || 'OR' == operator && matched > 0 || 'NOT' == operator && 0 == matched) {
            filtered[key] = obj;
          }
        });
        list = filtered;
        return list;
      },

      /**
       * Reset lock column scroll to 0 when resize
       */
      resetScroll: function resetScroll() {
        if (typeof options.detail === 'undefined' && Plugin.getDepth() === 1) {
          $(datatable.table).find('.' + pfx + 'datatable__row').css('left', 0);
          $(datatable.table).find('.' + pfx + 'datatable__lock').css('top', 0);
          $(datatable.tableBody).scrollTop(0);
        }
      },

      /**
       * Get column options by field
       * @param field
       * @returns {boolean}
       */
      getColumnByField: function getColumnByField(field) {
        if (typeof field === 'undefined') return;
        var result;
        $.each(options.columns, function (i, column) {
          if (field === column.field) {
            result = column;
            return false;
          }
        });
        return result;
      },

      /**
       * Get default sort column
       */
      getDefaultSortColumn: function getDefaultSortColumn() {
        var result;
        $.each(options.columns, function (i, column) {
          if (typeof column.sortable !== 'undefined' && $.inArray(column.sortable, ['asc', 'desc']) !== -1) {
            result = {
              sort: column.sortable,
              field: column.field
            };
            return false;
          }
        });
        return result;
      },

      /**
       * Helper to get element dimensions, when the element is hidden
       * @param element
       * @param includeMargin
       * @returns {{width: number, height: number, innerWidth: number,
       *     innerHeight: number, outerWidth: number, outerHeight: number}}
       */
      getHiddenDimensions: function getHiddenDimensions(element, includeMargin) {
        var props = {
          position: 'absolute',
          visibility: 'hidden',
          display: 'block'
        },
            dim = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        },
            hiddenParents = $(element).parents().addBack().not(':visible');
        includeMargin = typeof includeMargin === 'boolean' ? includeMargin : false;
        var oldProps = [];
        hiddenParents.each(function () {
          var old = {};

          for (var name in props) {
            old[name] = this.style[name];
            this.style[name] = props[name];
          }

          oldProps.push(old);
        });
        dim.width = $(element).width();
        dim.outerWidth = $(element).outerWidth(includeMargin);
        dim.innerWidth = $(element).innerWidth();
        dim.height = $(element).height();
        dim.innerHeight = $(element).innerHeight();
        dim.outerHeight = $(element).outerHeight(includeMargin);
        hiddenParents.each(function (i) {
          var old = oldProps[i];

          for (var name in props) {
            this.style[name] = old[name];
          }
        });
        return dim;
      },
      getGeneralSearchKey: function getGeneralSearchKey() {
        var searchInput = $(Plugin.getOption('search.input'));
        return $(searchInput).prop('name') || $(searchInput).prop('id');
      },

      /**
       * Get value by dot notation path string and to prevent undefined errors
       * @param path String Dot notation path in string
       * @param object Object to iterate
       * @returns {*}
       */
      getObject: function getObject(path, object) {
        return path.split('.').reduce(function (obj, i) {
          return obj !== null && typeof obj[i] !== 'undefined' ? obj[i] : null;
        }, object);
      },

      /**
       * Extend object
       * @param obj
       * @param path
       * @param value
       * @returns {*}
       */
      extendObj: function extendObj(obj, path, value) {
        var levels = path.split('.'),
            i = 0;

        function createLevel(child) {
          var name = levels[i++];

          if (typeof child[name] !== 'undefined' && child[name] !== null) {
            if (_typeof(child[name]) !== 'object' && typeof child[name] !== 'function') {
              child[name] = {};
            }
          } else {
            child[name] = {};
          }

          if (i === levels.length) {
            child[name] = value;
          } else {
            createLevel(child[name]);
          }
        }

        createLevel(obj);
        return obj;
      },
      rowEvenOdd: function rowEvenOdd() {
        // row even class
        $(datatable.tableBody).find('.' + pfx + 'datatable__row').removeClass(pfx + 'datatable__row--even');

        if ($(datatable.wrap).hasClass(pfx + 'datatable--subtable')) {
          $(datatable.tableBody).find('.' + pfx + 'datatable__row:not(.' + pfx + 'datatable__row-detail):even').addClass(pfx + 'datatable__row--even');
        } else {
          $(datatable.tableBody).find('.' + pfx + 'datatable__row:nth-child(even)').addClass(pfx + 'datatable__row--even');
        }
      },

      /********************
       ** PUBLIC API METHODS
       ********************/
      // delay timer
      timer: 0,

      /**
       * Redraw datatable by recalculating its DOM elements, etc.
       * @returns {jQuery}
       */
      redraw: function redraw() {
        Plugin.adjustCellsWidth.call();

        if (Plugin.isLocked()) {
          // fix hiding cell width issue
          Plugin.scrollbar();
          Plugin.resetScroll();
          Plugin.adjustCellsHeight.call();
        }

        Plugin.adjustLockContainer.call();
        Plugin.initHeight.call();
        return datatable;
      },

      /**
       * Shortcode to reload
       * @returns {jQuery}
       */
      load: function load() {
        Plugin.reload();
        return datatable;
      },

      /**
       * Datasource reload
       * @returns {jQuery}
       */
      reload: function reload() {
        var delay = function () {
          return function (callback, ms) {
            clearTimeout(Plugin.timer);
            Plugin.timer = setTimeout(callback, ms);
          };
        }();

        delay(function () {
          // local only. remote pagination will skip this block
          if (!options.data.serverFiltering) {
            Plugin.localDataUpdate();
          }

          Plugin.dataRender();
          $(datatable).trigger(pfx + 'datatable--on-reloaded');
        }, Plugin.getOption('search.delay'));
        return datatable;
      },

      /**
       * Get record by record ID
       * @param id
       * @returns {jQuery}
       */
      getRecord: function getRecord(id) {
        if (typeof datatable.tableBody === 'undefined') datatable.tableBody = $(datatable.table).children('tbody');
        $(datatable.tableBody).find('.' + pfx + 'datatable__cell:first-child').each(function (i, cell) {
          if (id == $(cell).text()) {
            var rowNumber = $(cell).closest('.' + pfx + 'datatable__row').index() + 1;
            datatable.API.record = datatable.API.value = Plugin.getOneRow(datatable.tableBody, rowNumber);
            return datatable;
          }
        });
        return datatable;
      },

      /**
       * @deprecated in v5.0.6
       * Get column of current record ID
       * @param columnName
       * @returns {jQuery}
       */
      getColumn: function getColumn(columnName) {
        Plugin.setSelectedRecords();
        datatable.API.value = $(datatable.API.record).find('[data-field="' + columnName + '"]');
        return datatable;
      },

      /**
       * Destroy datatable to original DOM state before datatable was
       * initialized
       * @returns {jQuery}
       */
      destroy: function destroy() {
        $(datatable).parent().find('.' + pfx + 'datatable__pager').remove();
        var initialDatatable = $(datatable.initialDatatable).addClass(pfx + 'datatable--destroyed').show();
        $(datatable).replaceWith(initialDatatable);
        datatable = initialDatatable;
        $(datatable).trigger(pfx + 'datatable--on-destroy');
        Plugin.isInit = false;
        initialDatatable = null;
        return initialDatatable;
      },

      /**
       * Sort by column field
       * @param field
       * @param sort
       */
      sort: function sort(field, _sort) {
        // toggle sort
        _sort = typeof _sort === 'undefined' ? 'asc' : _sort;
        Plugin.spinnerCallback(true); // update field and sort params

        var meta = {
          field: field,
          sort: _sort
        };
        Plugin.setDataSourceParam('sort', meta);
        setTimeout(function () {
          Plugin.dataRender('sort');
          $(datatable).trigger(pfx + 'datatable--on-sort', meta);
          $(datatable.tableHead).find('.' + pfx + 'datatable__cell > span > i').remove();
        }, 300);
        return datatable;
      },

      /**
       * @deprecated in v5.0.6
       * Get current selected column value
       * @returns {jQuery}
       */
      getValue: function getValue() {
        return $(datatable.API.value).text();
      },

      /**
       * Set checkbox active
       * @param cell JQuery selector or checkbox ID
       */
      setActive: function setActive(cell) {
        if (typeof cell === 'string') {
          // set by checkbox id
          cell = $(datatable.tableBody).find('.' + pfx + 'checkbox--single > [type="checkbox"][value="' + cell + '"]');
        }

        $(cell).prop('checked', true); // normal table

        var row = $(cell).closest('.' + pfx + 'datatable__row').addClass(pfx + 'datatable__row--active');
        var index = $(row).index() + 1; // lock table

        $(row).closest('.' + pfx + 'datatable__lock').parent().find('.' + pfx + 'datatable__row:nth-child(' + index + ')').addClass(pfx + 'datatable__row--active');
        var ids = [];
        $(row).each(function (i, td) {
          var id = $(td).find('.' + pfx + 'checkbox--single:not(.' + pfx + 'checkbox--all) > [type="checkbox"]').val();

          if (typeof id !== 'undefined') {
            ids.push(id);
          }
        });
        $(datatable).trigger(pfx + 'datatable--on-check', [ids]);
      },

      /**
       * Set checkbox inactive
       * @param cell JQuery selector or checkbox ID
       */
      setInactive: function setInactive(cell) {
        if (typeof cell === 'string') {
          // set by checkbox id
          cell = $(datatable.tableBody).find('.' + pfx + 'checkbox--single > [type="checkbox"][value="' + cell + '"]');
        }

        $(cell).prop('checked', false); // normal table

        var row = $(cell).closest('.' + pfx + 'datatable__row').removeClass(pfx + 'datatable__row--active');
        var index = $(row).index() + 1; // lock table

        $(row).closest('.' + pfx + 'datatable__lock').parent().find('.' + pfx + 'datatable__row:nth-child(' + index + ')').removeClass(pfx + 'datatable__row--active');
        var ids = [];
        $(row).each(function (i, td) {
          var id = $(td).find('.' + pfx + 'checkbox--single:not(.' + pfx + 'checkbox--all) > [type="checkbox"]').val();

          if (typeof id !== 'undefined') {
            ids.push(id);
          }
        });
        $(datatable).trigger(pfx + 'datatable--on-uncheck', [ids]);
      },

      /**
       * Set all checkboxes active or inactive
       * @param active
       */
      setActiveAll: function setActiveAll(active) {
        var checkboxes = $(datatable.table).find('> tbody, > thead').find('> tr:not(.' + pfx + 'datatable__row-subtable)').find('.' + pfx + 'datatable__cell--check [type="checkbox"]');

        if (active) {
          Plugin.setActive(checkboxes);
        } else {
          Plugin.setInactive(checkboxes);
        }
      },

      /**
       * @deprecated in v5.0.6
       * Get selected rows which are active
       * @returns {jQuery}
       */
      setSelectedRecords: function setSelectedRecords() {
        datatable.API.record = $(datatable.tableBody).find('.' + pfx + 'datatable__row--active');
        return datatable;
      },

      /**
       * Get selected records
       * @returns {null}
       */
      getSelectedRecords: function getSelectedRecords() {
        // support old method
        Plugin.setSelectedRecords();
        datatable.API.record = datatable.rows('.' + pfx + 'datatable__row--active').nodes();
        return datatable.API.record;
      },

      /**
       * Get options by dots notation path
       * @param path String Dot notation path in string
       * @returns {*}
       */
      getOption: function getOption(path) {
        return Plugin.getObject(path, options);
      },

      /**
       * Set global options nodes by dots notation path
       * @param path
       * @param object
       */
      setOption: function setOption(path, object) {
        options = Plugin.extendObj(options, path, object);
      },

      /**
       * Search filter for local & remote
       * @param value
       * @param columns. Optional list of columns to be filtered.
       */
      search: function search(value, columns) {
        if (typeof columns !== 'undefined') columns = $.makeArray(columns);

        var delay = function () {
          return function (callback, ms) {
            clearTimeout(Plugin.timer);
            Plugin.timer = setTimeout(callback, ms);
          };
        }();

        delay(function () {
          // get query parameters
          var query = Plugin.getDataSourceQuery(); // search not by columns

          if (typeof columns === 'undefined' && typeof value !== 'undefined') {
            var key = Plugin.getGeneralSearchKey();
            query[key] = value;
          } // search by columns, support multiple columns


          if (_typeof(columns) === 'object') {
            $.each(columns, function (k, column) {
              query[column] = value;
            }); // remove empty element from arrays

            $.each(query, function (k, v) {
              if (v === '' || $.isEmptyObject(v)) {
                delete query[k];
              }
            });
          }

          Plugin.setDataSourceQuery(query); // local filter only. remote pagination will skip this block

          if (!options.data.serverFiltering) {
            Plugin.localDataUpdate();
          }

          Plugin.dataRender('search');
        }, Plugin.getOption('search.delay'));
      },

      /**
       * Set datasource params extract
       * @param param
       * @param value
       */
      setDataSourceParam: function setDataSourceParam(param, value) {
        datatable.API.params = $.extend({}, {
          pagination: {
            page: 1,
            perpage: Plugin.getOption('data.pageSize')
          },
          sort: Plugin.getDefaultSortColumn(),
          query: {}
        }, datatable.API.params, Plugin.stateGet(Plugin.stateId));
        datatable.API.params = Plugin.extendObj(datatable.API.params, param, value);
        Plugin.stateKeep(Plugin.stateId, datatable.API.params);
      },

      /**
       * Get datasource params
       * @param param
       */
      getDataSourceParam: function getDataSourceParam(param) {
        datatable.API.params = $.extend({}, {
          pagination: {
            page: 1,
            perpage: Plugin.getOption('data.pageSize')
          },
          sort: Plugin.getDefaultSortColumn(),
          query: {}
        }, datatable.API.params, Plugin.stateGet(Plugin.stateId));

        if (typeof param === 'string') {
          return Plugin.getObject(param, datatable.API.params);
        }

        return datatable.API.params;
      },

      /**
       * Shortcode to datatable.getDataSourceParam('query');
       * @returns {*}
       */
      getDataSourceQuery: function getDataSourceQuery() {
        return Plugin.getDataSourceParam('query') || {};
      },

      /**
       * Shortcode to datatable.setDataSourceParam('query', query);
       * @param query
       */
      setDataSourceQuery: function setDataSourceQuery(query) {
        Plugin.setDataSourceParam('query', query);
      },

      /**
       * Get current page number
       * @returns {number}
       */
      getCurrentPage: function getCurrentPage() {
        return $(datatable.table).siblings('.' + pfx + 'datatable__pager').last().find('.' + pfx + 'datatable__pager-nav').find('.' + pfx + 'datatable__pager-link.' + pfx + 'datatable__pager-link--active').data('page') || 1;
      },

      /**
       * Get selected dropdown page size
       * @returns {*|number}
       */
      getPageSize: function getPageSize() {
        return $(datatable.table).siblings('.' + pfx + 'datatable__pager').last().find('select.' + pfx + 'datatable__pager-size').val() || 10;
      },

      /**
       * Get total rows
       */
      getTotalRows: function getTotalRows() {
        return datatable.API.params.pagination.total;
      },

      /**
       * Get full dataset in grid
       * @returns {*|null|Array}
       */
      getDataSet: function getDataSet() {
        return datatable.originalDataSet;
      },

      /**
       * @deprecated in v5.0.6
       * Hide column by column's field name
       * @param fieldName
       */
      hideColumn: function hideColumn(fieldName) {
        // add hide option for this column
        $.map(options.columns, function (column) {
          if (fieldName === column.field) {
            column.responsive = {
              hidden: 'xl'
            };
          }

          return column;
        }); // hide current displayed column

        var tds = $.grep($(datatable.table).find('.' + pfx + 'datatable__cell'), function (n, i) {
          return fieldName === $(n).data('field');
        });
        $(tds).hide();
      },

      /**
       * @deprecated in v5.0.6
       * Show column by column's field name
       * @param fieldName
       */
      showColumn: function showColumn(fieldName) {
        // add hide option for this column
        $.map(options.columns, function (column) {
          if (fieldName === column.field) {
            delete column.responsive;
          }

          return column;
        }); // hide current displayed column

        var tds = $.grep($(datatable.table).find('.' + pfx + 'datatable__cell'), function (n, i) {
          return fieldName === $(n).data('field');
        });
        $(tds).show();
      },
      nodeTr: [],
      nodeTd: [],
      nodeCols: [],
      recentNode: [],
      table: function table() {
        if (typeof datatable.table !== 'undefined') {
          return datatable.table;
        }
      },

      /**
       * Select a single row from the table
       * @param selector
       * @returns {jQuery}
       */
      row: function row(selector) {
        Plugin.rows(selector);
        Plugin.nodeTr = Plugin.recentNode = $(Plugin.nodeTr).first();
        return datatable;
      },

      /**
       * Select multiple rows from the table
       * @param selector
       * @returns {jQuery}
       */
      rows: function rows(selector) {
        Plugin.nodeTr = Plugin.recentNode = $(datatable.tableBody).find(selector).filter('.' + pfx + 'datatable__row');
        return datatable;
      },

      /**
       * Select a single column from the table
       * @param index zero-based index
       * @returns {jQuery}
       */
      column: function column(index) {
        Plugin.nodeCols = Plugin.recentNode = $(datatable.tableBody).find('.' + pfx + 'datatable__cell:nth-child(' + (index + 1) + ')');
        return datatable;
      },

      /**
       * Select multiple columns from the table
       * @param selector
       * @returns {jQuery}
       */
      columns: function columns(selector) {
        var context = datatable.table;

        if (Plugin.nodeTr === Plugin.recentNode) {
          context = Plugin.nodeTr;
        }

        var columns = $(context).find('.' + pfx + 'datatable__cell[data-field="' + selector + '"]');

        if (columns.length > 0) {
          Plugin.nodeCols = Plugin.recentNode = columns;
        } else {
          Plugin.nodeCols = Plugin.recentNode = $(context).find(selector).filter('.' + pfx + 'datatable__cell');
        }

        return datatable;
      },
      cell: function cell(selector) {
        Plugin.cells(selector);
        Plugin.nodeTd = Plugin.recentNode = $(Plugin.nodeTd).first();
        return datatable;
      },
      cells: function cells(selector) {
        var cells = $(datatable.tableBody).find('.' + pfx + 'datatable__cell');

        if (typeof selector !== 'undefined') {
          cells = $(cells).filter(selector);
        }

        Plugin.nodeTd = Plugin.recentNode = cells;
        return datatable;
      },

      /**
       * Delete the selected row from the table
       * @returns {jQuery}
       */
      remove: function remove() {
        if ($(Plugin.nodeTr.length) && Plugin.nodeTr === Plugin.recentNode) {
          $(Plugin.nodeTr).remove();
        }

        Plugin.layoutUpdate();
        return datatable;
      },

      /**
       * Show or hide the columns or rows
       */
      visible: function visible(bool) {
        if ($(Plugin.recentNode.length)) {
          var locked = Plugin.lockEnabledColumns();

          if (Plugin.recentNode === Plugin.nodeCols) {
            var index = Plugin.recentNode.index();

            if (Plugin.isLocked()) {
              var scrollColumns = $(Plugin.recentNode).closest('.' + pfx + 'datatable__lock--scroll').length;

              if (scrollColumns) {
                // is at center of scrollable area
                index += locked.left.length + 1;
              } else if ($(Plugin.recentNode).closest('.' + pfx + 'datatable__lock--right').length) {
                // is at the right locked table
                index += locked.left.length + scrollColumns + 1;
              }
            }
          }

          if (bool) {
            if (Plugin.recentNode === Plugin.nodeCols) {
              delete options.columns[index].responsive;
            }

            $(Plugin.recentNode).show();
          } else {
            if (Plugin.recentNode === Plugin.nodeCols) {
              Plugin.setOption('columns.' + index + '.responsive', {
                hidden: 'xl'
              });
            }

            $(Plugin.recentNode).hide();
          }

          Plugin.redraw();
        }
      },

      /**
       * Get the the DOM element for the selected rows or columns
       * @returns {Array}
       */
      nodes: function nodes() {
        return Plugin.recentNode;
      },

      /**
       * will be implemented soon
       * @returns {jQuery}
       */
      dataset: function dataset() {
        return datatable;
      }
    };
    /**
     * Public API methods can be used directly by datatable
     */

    $.each(Plugin, function (funcName, func) {
      datatable[funcName] = func;
    }); // initialize main datatable plugin

    if (typeof options !== 'undefined') {
      if (typeof options === 'string') {
        var method = options;
        datatable = $(this).data(pluginName);

        if (typeof datatable !== 'undefined') {
          options = datatable.options;
          Plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
      } else {
        if (!datatable.data(pluginName) && !$(this).hasClass(pfx + 'datatable--loaded')) {
          datatable.dataSet = null;
          datatable.textAlign = {
            left: pfx + 'datatable__cell--left',
            center: pfx + 'datatable__cell--center',
            right: pfx + 'datatable__cell--right'
          }; // merge default and user defined options

          options = $.extend(true, {}, $.fn[pluginName].defaults, options);
          datatable.options = options; // init plugin process

          Plugin.init.apply(this, [options]);
          $(datatable.wrap).data(pluginName, datatable);
        }
      }
    } else {
      // get existing instance datatable
      datatable = $(this).data(pluginName);

      if (typeof datatable === 'undefined') {
        $.error(pluginName + ' not initialized');
      }

      options = datatable.options;
    }

    return datatable;
  }; // default options


  $.fn[pluginName].defaults = {
    // datasource definition
    data: {
      type: 'local',
      source: null,
      pageSize: 10,
      // display records per page
      saveState: {
        // save datatable state(pagination, filtering, sorting, etc) in cookie or browser webstorage
        cookie: false,
        webstorage: true
      },
      serverPaging: false,
      serverFiltering: false,
      serverSorting: false,
      autoColumns: false,
      attr: {
        rowProps: []
      }
    },
    // layout definition
    layout: {
      theme: 'default',
      // datatable will support multiple themes and designs
      class: pfx + 'datatable--brand',
      // custom wrapper class
      scroll: false,
      // enable/disable datatable scroll both horizontal and vertical when needed.
      height: null,
      // datatable's body's fixed height
      minHeight: 300,
      footer: false,
      // display/hide footer
      header: true,
      // display/hide header
      customScrollbar: true,
      // set false to disable custom scrollbar
      // datatable spinner
      spinner: {
        overlayColor: '#000000',
        opacity: 0,
        type: 'loader',
        state: 'brand',
        message: true
      },
      // datatable UI icons
      icons: {
        sort: {
          asc: 'la la-arrow-up',
          desc: 'la la-arrow-down'
        },
        pagination: {
          next: 'la la-angle-right',
          prev: 'la la-angle-left',
          first: 'la la-angle-double-left',
          last: 'la la-angle-double-right',
          more: 'la la-ellipsis-h'
        },
        rowDetail: {
          expand: 'fa fa-caret-down',
          collapse: 'fa fa-caret-right'
        }
      }
    },
    // column sorting
    sortable: true,
    // resize column size with mouse drag coming soon)
    resizable: false,
    // column based filtering (coming soon)
    filterable: false,
    pagination: true,
    // inline and bactch editing (cooming soon)
    editable: false,
    // columns definition
    columns: [],
    search: {
      // enable trigger search by keyup enter
      onEnter: false,
      // input text for search
      input: null,
      // search delay in milliseconds
      delay: 400
    },
    rows: {
      // deprecated
      callback: function callback() {},
      // call before row template
      beforeTemplate: function beforeTemplate() {},
      // call after row template
      afterTemplate: function afterTemplate() {},
      autoHide: true
    },
    // toolbar
    toolbar: {
      // place pagination and displayInfo blocks according to the array order
      layout: ['pagination', 'info'],
      // toolbar placement can be at top or bottom or both top and bottom repeated
      placement: ['bottom'],
      //'top', 'bottom'
      // toolbar items
      items: {
        // pagination
        pagination: {
          // pagination type(default or scroll)
          type: 'default',
          // number of pages to display by breakpoints
          pages: {
            desktop: {
              layout: 'default',
              pagesNumber: 5
            },
            tablet: {
              layout: 'default',
              pagesNumber: 3
            },
            mobile: {
              layout: 'compact'
            }
          },
          // navigation buttons
          navigation: {
            prev: true,
            // display prev link
            next: true,
            // display next link
            first: true,
            // display first link
            last: true // display last link

          },
          // page size select
          pageSizeSelect: [] // display dropdown to select pagination size. -1 is used for "ALl" option

        },
        // records info
        info: true
      }
    },
    // here we will keep all strings and message used by datatable UI so developer can easiliy translate to any language.
    // By default the stirngs will be in the plugin source and here can override it
    translate: {
      records: {
        processing: 'Please wait...',
        noRecords: 'No records found'
      },
      toolbar: {
        pagination: {
          items: {
            default: {
              first: 'First',
              prev: 'Previous',
              next: 'Next',
              last: 'Last',
              more: 'More pages',
              input: 'Page number',
              select: 'Select page size',
              all: 'all'
            },
            info: 'Showing {{start}} - {{end}} of {{total}}'
          }
        }
      }
    },
    extensions: {}
  };
})(jQuery);

"use strict";

(function ($) {
  var pluginName = 'KDatatable';
  var pfx = 'k-';
  $.fn[pluginName] = $.fn[pluginName] || {};
  /**
   * @param datatable Main datatable plugin instance
   * @param options Extension options
   * @returns {*}
   */

  $.fn[pluginName].checkbox = function (datatable, options) {
    var Extension = {
      selectedAllRows: false,
      selectedRows: [],
      unselectedRows: [],
      init: function init() {
        if (Extension.selectorEnabled()) {
          // reset
          datatable.setDataSourceParam(options.vars.selectedAllRows, false);
          datatable.stateRemove('checkbox'); // requestIds is not null

          if (options.vars.requestIds) {
            // request ids in response
            datatable.setDataSourceParam(options.vars.requestIds, true);
          } // remove selected checkbox on datatable reload


          $(datatable).on(pfx + 'datatable--on-reloaded', function () {
            datatable.stateRemove('checkbox');
            datatable.setDataSourceParam(options.vars.selectedAllRows, false);
            Extension.selectedAllRows = false;
            Extension.selectedRows = [];
            Extension.unselectedRows = [];
          }); // select all on extension init

          Extension.selectedAllRows = datatable.getDataSourceParam(options.vars.selectedAllRows);
          $(datatable).on(pfx + 'datatable--on-layout-updated', function (e, args) {
            if (args.table != $(datatable.wrap).attr('id')) {
              return;
            }

            datatable.ready(function () {
              Extension.initVars();
              Extension.initEvent();
              Extension.initSelect();
            });
          });
          $(datatable).on(pfx + 'datatable--on-check', function (e, ids) {
            ids.forEach(function (id) {
              Extension.selectedRows.push(id); // // remove from unselected rows

              Extension.unselectedRows = Extension.remove(Extension.unselectedRows, id);
            });
            var storage = {};
            storage['selectedRows'] = $.unique(Extension.selectedRows);
            storage['unselectedRows'] = $.unique(Extension.unselectedRows);
            datatable.stateKeep('checkbox', storage);
          });
          $(datatable).on(pfx + 'datatable--on-uncheck', function (e, ids) {
            ids.forEach(function (id) {
              Extension.unselectedRows.push(id); // // remove from selected rows

              Extension.selectedRows = Extension.remove(Extension.selectedRows, id);
            });
            var storage = {};
            storage['selectedRows'] = $.unique(Extension.selectedRows);
            storage['unselectedRows'] = $.unique(Extension.unselectedRows);
            datatable.stateKeep('checkbox', storage);
          });
        }
      },

      /**
       * Init checkbox clicks event
       */
      initEvent: function initEvent() {
        // select all checkbox click
        $(datatable.tableHead).find('.' + pfx + 'checkbox--all > [type="checkbox"]').click(function (e) {
          // clear selected and unselected rows
          Extension.selectedRows = Extension.unselectedRows = [];
          datatable.stateRemove('checkbox'); // select all rows

          if ($(this).is(':checked')) {
            Extension.selectedAllRows = true;
          } else {
            Extension.selectedAllRows = false;
          } // local select all current page rows


          if (!options.vars.requestIds) {
            if ($(this).is(':checked')) {
              Extension.selectedRows = $.makeArray($(datatable.tableBody).find('.' + pfx + 'checkbox--single > [type="checkbox"]').map(function (i, chk) {
                return $(chk).val();
              }));
            }

            var storage = {};
            storage['selectedRows'] = $.unique(Extension.selectedRows);
            datatable.stateKeep('checkbox', storage);
          } // keep selectedAllRows in datasource params


          datatable.setDataSourceParam(options.vars.selectedAllRows, Extension.selectedAllRows);
          $(datatable).trigger(pfx + 'datatable--on-click-checkbox', [$(this)]);
        }); // single row checkbox click

        $(datatable.tableBody).find('.' + pfx + 'checkbox--single > [type="checkbox"]').click(function (e) {
          var id = $(this).val();

          if ($(this).is(':checked')) {
            Extension.selectedRows.push(id); // remove from unselected rows

            Extension.unselectedRows = Extension.remove(Extension.unselectedRows, id);
          } else {
            Extension.unselectedRows.push(id); // remove from selected rows

            Extension.selectedRows = Extension.remove(Extension.selectedRows, id);
          } // local checkbox header check


          if (!options.vars.requestIds && Extension.selectedRows.length < 1) {
            // remove select all checkbox, if there is no checked checkbox left
            $(datatable.tableHead).find('.' + pfx + 'checkbox--all > [type="checkbox"]').prop('checked', false);
          }

          var storage = {};
          storage['selectedRows'] = $.unique(Extension.selectedRows);
          storage['unselectedRows'] = $.unique(Extension.unselectedRows);
          datatable.stateKeep('checkbox', storage);
          $(datatable).trigger(pfx + 'datatable--on-click-checkbox', [$(this)]);
        });
      },
      initSelect: function initSelect() {
        // selected all rows from server
        if (Extension.selectedAllRows && options.vars.requestIds) {
          if (!datatable.hasClass(pfx + 'datatable--error')) {
            // set header select all checkbox checked
            $(datatable.tableHead).find('.' + pfx + 'checkbox--all > [type="checkbox"]').prop('checked', true);
          } // set all checkbox in table body


          datatable.setActiveAll(true); // remove unselected rows

          Extension.unselectedRows.forEach(function (id) {
            datatable.setInactive(id);
          });
        } else {
          // single check for server and local
          Extension.selectedRows.forEach(function (id) {
            datatable.setActive(id);
          }); // local checkbox; check if all checkboxes of currect page are checked

          if (!datatable.hasClass(pfx + 'datatable--error') && $(datatable.tableBody).find('.' + pfx + 'checkbox--single > [type="checkbox"]').not(':checked').length < 1) {
            // set header select all checkbox checked
            $(datatable.tableHead).find('.' + pfx + 'checkbox--all > [type="checkbox"]').prop('checked', true);
          }
        }
      },

      /**
       * Check if selector is enabled from options
       */
      selectorEnabled: function selectorEnabled() {
        return $.grep(datatable.options.columns, function (n, i) {
          return n.selector || false;
        })[0];
      },
      initVars: function initVars() {
        // get single select/unselect from localstorage
        var storage = datatable.stateGet('checkbox');

        if (typeof storage !== 'undefined') {
          Extension.selectedRows = storage['selectedRows'] || [];
          Extension.unselectedRows = storage['unselectedRows'] || [];
        }
      },
      getSelectedId: function getSelectedId(path) {
        Extension.initVars(); // server selected all rows

        if (Extension.selectedAllRows && options.vars.requestIds) {
          if (typeof path === 'undefined') {
            path = options.vars.rowIds;
          } // if selected all rows, return id from response meta


          var selectedAllRows = datatable.getObject(path, datatable.lastResponse) || [];

          if (selectedAllRows.length > 0) {
            // remove single unselected rows from selectedAllRows ids from server response emta
            Extension.unselectedRows.forEach(function (id) {
              selectedAllRows = Extension.remove(selectedAllRows, parseInt(id));
            });
          }

          return selectedAllRows;
        } // else return single checked selected rows


        return Extension.selectedRows;
      },
      remove: function remove(array, element) {
        return array.filter(function (e) {
          return e !== element;
        });
      }
    }; // make the extension accessible from datatable init

    datatable.checkbox = function () {
      return Extension;
    };

    if (_typeof(options) === 'object') {
      options = $.extend(true, {}, $.fn[pluginName].checkbox.default, options);
      Extension.init.apply(this, [options]);
    }

    return datatable;
  };

  $.fn[pluginName].checkbox.default = {
    vars: {
      // select all rows flag to be sent to the server
      selectedAllRows: 'selectedAllRows',
      // request id parameter's name
      requestIds: 'requestIds',
      // response path to all rows id
      rowIds: 'meta.rowIds'
    }
  };
})(jQuery);

var defaults = {
  layout: {
    icons: {
      pagination: {
        next: 'la la-angle-right',
        prev: 'la la-angle-left',
        first: 'la la-angle-double-left',
        last: 'la la-angle-double-right',
        more: 'la la-ellipsis-h'
      },
      rowDetail: {
        expand: 'fa fa-caret-down',
        collapse: 'fa fa-caret-right'
      }
    }
  }
};

if (KUtil.isRTL()) {
  defaults = {
    layout: {
      icons: {
        pagination: {
          next: 'la la-angle-left',
          prev: 'la la-angle-right',
          last: 'la la-angle-double-left',
          first: 'la la-angle-double-right'
        },
        rowDetail: {
          collapse: 'fa fa-caret-down',
          expand: 'fa fa-caret-right'
        }
      }
    }
  };
}

$.extend(true, $.fn.KDatatable.defaults, defaults);
"use strict";

var KHeader = function KHeader(elementId, options) {
  // Main object
  var the = this;
  var init = false; // Get element object

  var element = KUtil.get(elementId);
  var body = KUtil.get('body');

  if (element === undefined) {
    return;
  } // Default options


  var defaultOptions = {
    classic: false,
    offset: {
      mobile: 150,
      desktop: 200
    },
    minimize: {
      mobile: false,
      desktop: false
    }
  }; ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Run plugin
     * @returns {KHeader}
     */
    construct: function construct(options) {
      if (KUtil.data(element).has('header')) {
        the = KUtil.data(element).get('header');
      } else {
        // reset header
        Plugin.init(options); // build header

        Plugin.build();
        KUtil.data(element).set('header', the);
      }

      return the;
    },

    /**
     * Handles subheader click toggle
     * @returns {KHeader}
     */
    init: function init(options) {
      the.events = []; // merge default and user defined options

      the.options = KUtil.deepExtend({}, defaultOptions, options);
    },

    /**
     * Reset header
     * @returns {KHeader}
     */
    build: function build() {
      var lastScrollTop = 0;
      var eventTriggerState = true;
      var viewportHeight = KUtil.getViewPort().height;

      if (the.options.minimize.mobile === false && the.options.minimize.desktop === false) {
        return;
      }

      window.addEventListener('scroll', function () {
        var offset = 0,
            on,
            off,
            st;

        if (KUtil.isInResponsiveRange('desktop')) {
          offset = the.options.offset.desktop;
          on = the.options.minimize.desktop.on;
          off = the.options.minimize.desktop.off;
        } else if (KUtil.isInResponsiveRange('tablet-and-mobile')) {
          offset = the.options.offset.mobile;
          on = the.options.minimize.mobile.on;
          off = the.options.minimize.mobile.off;
        }

        st = window.pageYOffset;

        if (KUtil.isInResponsiveRange('tablet-and-mobile') && the.options.classic && the.options.classic.mobile || KUtil.isInResponsiveRange('desktop') && the.options.classic && the.options.classic.desktop) {
          if (st > offset) {
            // down scroll mode
            KUtil.addClass(body, on);
            KUtil.removeClass(body, off);

            if (eventTriggerState) {
              Plugin.eventTrigger('minimizeOn', the);
              eventTriggerState = false;
            }
          } else {
            // back scroll mode
            KUtil.addClass(body, off);
            KUtil.removeClass(body, on);

            if (eventTriggerState == false) {
              Plugin.eventTrigger('minimizeOff', the);
              eventTriggerState = true;
            }
          }
        } else {
          if (st > offset && lastScrollTop < st) {
            // down scroll mode
            KUtil.addClass(body, on);
            KUtil.removeClass(body, off);

            if (eventTriggerState) {
              Plugin.eventTrigger('minimizeOn', the);
              eventTriggerState = false;
            }
          } else {
            // back scroll mode
            KUtil.addClass(body, off);
            KUtil.removeClass(body, on);

            if (eventTriggerState == false) {
              Plugin.eventTrigger('minimizeOff', the);
              eventTriggerState = true;
            }
          }

          lastScrollTop = st;
        }
      });
    },

    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];

        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the, args);
            }
          } else {
            event.handler.call(this, the, args);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    }
  }; //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };
  /**
   * Register event
   */


  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  }; ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////
  // Run plugin


  Plugin.construct.apply(the, [options]); // Init done

  init = true; // Return plugin instance

  return the;
};

"use strict";

var KMenu = function KMenu(elementId, options) {
  // Main object
  var the = this;
  var init = false; // Get element object

  var element = KUtil.get(elementId);
  var body = KUtil.get('body');

  if (!element) {
    return;
  } // Default options


  var defaultOptions = {
    // accordion submenu mode
    accordion: {
      slideSpeed: 200,
      // accordion toggle slide speed in milliseconds
      autoScroll: false,
      // enable auto scrolling(focus) to the clicked menu item
      autoScrollSpeed: 1200,
      expandAll: true // allow having multiple expanded accordions in the menu

    },
    // dropdown submenu mode
    dropdown: {
      timeout: 500 // timeout in milliseconds to show and hide the hoverable submenu dropdown

    }
  }; ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Run plugin
     * @returns {KMenu}
     */
    construct: function construct(options) {
      if (KUtil.data(element).has('menu')) {
        the = KUtil.data(element).get('menu');
      } else {
        // reset menu
        Plugin.init(options); // reset menu

        Plugin.reset(); // build menu

        Plugin.build();
        KUtil.data(element).set('menu', the);
      }

      return the;
    },

    /**
     * Handles submenu click toggle
     * @returns {KMenu}
     */
    init: function init(options) {
      the.events = [];
      the.eventHandlers = {}; // merge default and user defined options

      the.options = KUtil.deepExtend({}, defaultOptions, options); // pause menu

      the.pauseDropdownHoverTime = 0;
      the.uid = KUtil.getUniqueID();
    },
    update: function update(options) {
      // merge default and user defined options
      the.options = KUtil.deepExtend({}, defaultOptions, options); // pause menu

      the.pauseDropdownHoverTime = 0; // reset menu

      Plugin.reset();
      the.eventHandlers = {}; // build menu

      Plugin.build();
      KUtil.data(element).set('menu', the);
    },
    reload: function reload() {
      // reset menu
      Plugin.reset(); // build menu

      Plugin.build(); // reset submenu props

      Plugin.resetSubmenuProps();
    },

    /**
     * Reset menu
     * @returns {KMenu}
     */
    build: function build() {
      // General accordion submenu toggle
      the.eventHandlers['event_1'] = KUtil.on(element, '.k-menu__toggle', 'click', Plugin.handleSubmenuAccordion); // Dropdown mode(hoverable)

      if (Plugin.getSubmenuMode() === 'dropdown' || Plugin.isConditionalSubmenuDropdown()) {
        // dropdown submenu - hover toggle
        the.eventHandlers['event_2'] = KUtil.on(element, '[data-kmenu-submenu-toggle="hover"]', 'mouseover', Plugin.handleSubmenuDrodownHoverEnter);
        the.eventHandlers['event_3'] = KUtil.on(element, '[data-kmenu-submenu-toggle="hover"]', 'mouseout', Plugin.handleSubmenuDrodownHoverExit); // dropdown submenu - click toggle

        the.eventHandlers['event_4'] = KUtil.on(element, '[data-kmenu-submenu-toggle="click"] > .k-menu__toggle, [data-kmenu-submenu-toggle="click"] > .k-menu__link .k-menu__toggle', 'click', Plugin.handleSubmenuDropdownClick);
        the.eventHandlers['event_5'] = KUtil.on(element, '[data-kmenu-submenu-toggle="tab"] > .k-menu__toggle, [data-kmenu-submenu-toggle="tab"] > .k-menu__link .k-menu__toggle', 'click', Plugin.handleSubmenuDropdownTabClick);
      } // General link click
      // the.eventHandlers['event_6'] = KUtil.on(element, '.k-menu__item:not(.k-menu__item--submenu) > .k-menu__link:not(.k-menu__toggle):not(.k-menu__link--toggle-skip)', 'click', Plugin.handleLinkClick);
      // Init scrollable menu


      if (the.options.scroll && the.options.scroll.height) {
        Plugin.scrollInit();
      }
    },

    /**
     * Reset menu
     * @returns {KMenu}
     */
    reset: function reset() {
      KUtil.off(element, 'click', the.eventHandlers['event_1']); // dropdown submenu - hover toggle

      KUtil.off(element, 'mouseover', the.eventHandlers['event_2']);
      KUtil.off(element, 'mouseout', the.eventHandlers['event_3']); // dropdown submenu - click toggle

      KUtil.off(element, 'click', the.eventHandlers['event_4']);
      KUtil.off(element, 'click', the.eventHandlers['event_5']);
      KUtil.off(element, 'click', the.eventHandlers['event_6']);
    },

    /**
     * Init scroll menu
     *
    */
    scrollInit: function scrollInit() {
      if (the.options.scroll && the.options.scroll.height) {
        KUtil.scrollDestroy(element);
        KUtil.scrollInit(element, {
          disableForMobile: true,
          resetHeightOnDestroy: true,
          handleWindowResize: true,
          height: the.options.scroll.height
        });
      } else {
        KUtil.scrollDestroy(element);
      }
    },

    /**
     * Update scroll menu
    */
    scrollUpdate: function scrollUpdate() {
      if (the.options.scroll && the.options.scroll.height) {
        KUtil.scrollUpdate(element);
      }
    },

    /**
     * Scroll top
    */
    scrollTop: function scrollTop() {
      if (the.options.scroll && the.options.scroll.height) {
        KUtil.scrollTop(element);
      }
    },

    /**
     * Get submenu mode for current breakpoint and menu state
     * @returns {KMenu}
     */
    getSubmenuMode: function getSubmenuMode(el) {
      if (KUtil.isInResponsiveRange('desktop')) {
        if (el && KUtil.hasAttr(el, 'data-kmenu-submenu-toggle')) {
          return KUtil.attr(el, 'data-kmenu-submenu-toggle');
        }

        if (KUtil.isset(the.options.submenu, 'desktop.state.body')) {
          if (KUtil.hasClass(body, the.options.submenu.desktop.state.body)) {
            return the.options.submenu.desktop.state.mode;
          } else {
            return the.options.submenu.desktop.default;
          }
        } else if (KUtil.isset(the.options.submenu, 'desktop')) {
          return the.options.submenu.desktop;
        }
      } else if (KUtil.isInResponsiveRange('tablet') && KUtil.isset(the.options.submenu, 'tablet')) {
        return the.options.submenu.tablet;
      } else if (KUtil.isInResponsiveRange('mobile') && KUtil.isset(the.options.submenu, 'mobile')) {
        return the.options.submenu.mobile;
      } else {
        return false;
      }
    },

    /**
     * Get submenu mode for current breakpoint and menu state
     * @returns {KMenu}
     */
    isConditionalSubmenuDropdown: function isConditionalSubmenuDropdown() {
      if (KUtil.isInResponsiveRange('desktop') && KUtil.isset(the.options.submenu, 'desktop.state.body')) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * Reset submenu attributes
     * @returns {KMenu}
     */
    resetSubmenuProps: function resetSubmenuProps(e) {
      var submenus = KUtil.findAll(element, '.k-menu__submenu');

      if (submenus) {
        for (var i = 0, len = submenus.length; i < len; i++) {
          KUtil.css(submenus[0], 'display', '');
          KUtil.css(submenus[0], 'overflow', '');
        }
      }
    },

    /**
     * Handles submenu hover toggle
     * @returns {KMenu}
     */
    handleSubmenuDrodownHoverEnter: function handleSubmenuDrodownHoverEnter(e) {
      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }

      if (the.resumeDropdownHover() === false) {
        return;
      }

      var item = this;

      if (item.getAttribute('data-hover') == '1') {
        item.removeAttribute('data-hover');
        clearTimeout(item.getAttribute('data-timeout'));
        item.removeAttribute('data-timeout'); //Plugin.hideSubmenuDropdown(item, false);
      } // console.log('test!');


      Plugin.showSubmenuDropdown(item);
    },

    /**
     * Handles submenu hover toggle
     * @returns {KMenu}
     */
    handleSubmenuDrodownHoverExit: function handleSubmenuDrodownHoverExit(e) {
      if (the.resumeDropdownHover() === false) {
        return;
      }

      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }

      var item = this;
      var time = the.options.dropdown.timeout;
      var timeout = setTimeout(function () {
        if (item.getAttribute('data-hover') == '1') {
          Plugin.hideSubmenuDropdown(item, true);
        }
      }, time);
      item.setAttribute('data-hover', '1');
      item.setAttribute('data-timeout', timeout);
    },

    /**
     * Handles submenu click toggle
     * @returns {KMenu}
     */
    handleSubmenuDropdownClick: function handleSubmenuDropdownClick(e) {
      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }

      var item = this.closest('.k-menu__item');

      if (item.getAttribute('data-kmenu-submenu-mode') == 'accordion') {
        return;
      }

      if (KUtil.hasClass(item, 'k-menu__item--hover') === false) {
        KUtil.addClass(item, 'k-menu__item--open-dropdown');
        Plugin.showSubmenuDropdown(item);
      } else {
        KUtil.removeClass(item, 'k-menu__item--open-dropdown');
        Plugin.hideSubmenuDropdown(item, true);
      }

      e.preventDefault();
    },

    /**
     * Handles tab click toggle
     * @returns {KMenu}
     */
    handleSubmenuDropdownTabClick: function handleSubmenuDropdownTabClick(e) {
      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }

      var item = this.closest('.k-menu__item');

      if (item.getAttribute('data-kmenu-submenu-mode') == 'accordion') {
        return;
      }

      if (KUtil.hasClass(item, 'k-menu__item--hover') == false) {
        KUtil.addClass(item, 'k-menu__item--open-dropdown');
        Plugin.showSubmenuDropdown(item);
      }

      e.preventDefault();
    },

    /**
     * Handles submenu dropdown close on link click
     * @returns {KMenu}
     */
    handleSubmenuDropdownClose: function handleSubmenuDropdownClose(e, el) {
      // exit if its not submenu dropdown mode
      if (Plugin.getSubmenuMode(el) === 'accordion') {
        return;
      }

      var shown = element.querySelectorAll('.k-menu__item.k-menu__item--submenu.k-menu__item--hover:not(.k-menu__item--tabs)'); // check if currently clicked link's parent item ha

      if (shown.length > 0 && KUtil.hasClass(el, 'k-menu__toggle') === false && el.querySelectorAll('.k-menu__toggle').length === 0) {
        // close opened dropdown menus
        for (var i = 0, len = shown.length; i < len; i++) {
          Plugin.hideSubmenuDropdown(shown[0], true);
        }
      }
    },

    /**
     * helper functions
     * @returns {KMenu}
     */
    handleSubmenuAccordion: function handleSubmenuAccordion(e, el) {
      var query;
      var item = el ? el : this;

      if (Plugin.getSubmenuMode(el) === 'dropdown' && (query = item.closest('.k-menu__item'))) {
        if (query.getAttribute('data-kmenu-submenu-mode') != 'accordion') {
          e.preventDefault();
          return;
        }
      }

      var li = item.closest('.k-menu__item');
      var submenu = KUtil.child(li, '.k-menu__submenu, .k-menu__inner');

      if (KUtil.hasClass(item.closest('.k-menu__item'), 'k-menu__item--open-always')) {
        return;
      }

      if (li && submenu) {
        e.preventDefault();
        var speed = the.options.accordion.slideSpeed;
        var hasClosables = false;

        if (KUtil.hasClass(li, 'k-menu__item--open') === false) {
          // hide other accordions                    
          if (the.options.accordion.expandAll === false) {
            var subnav = item.closest('.k-menu__nav, .k-menu__subnav');
            var closables = KUtil.children(subnav, '.k-menu__item.k-menu__item--open.k-menu__item--submenu:not(.k-menu__item--here):not(.k-menu__item--open-always)');

            if (subnav && closables) {
              for (var i = 0, len = closables.length; i < len; i++) {
                var el_ = closables[0];
                var submenu_ = KUtil.child(el_, '.k-menu__submenu');

                if (submenu_) {
                  KUtil.slideUp(submenu_, speed, function () {
                    Plugin.scrollUpdate();
                    KUtil.removeClass(el_, 'k-menu__item--open');
                  });
                }
              }
            }
          }

          KUtil.slideDown(submenu, speed, function () {
            Plugin.scrollToItem(item);
            Plugin.scrollUpdate();
            Plugin.eventTrigger('submenuToggle', submenu);
          });
          KUtil.addClass(li, 'k-menu__item--open');
        } else {
          KUtil.slideUp(submenu, speed, function () {
            Plugin.scrollToItem(item);
            Plugin.eventTrigger('submenuToggle', submenu);
          });
          KUtil.removeClass(li, 'k-menu__item--open');
        }
      }
    },

    /**
     * scroll to item function
     * @returns {KMenu}
     */
    scrollToItem: function scrollToItem(item) {
      // handle auto scroll for accordion submenus
      if (KUtil.isInResponsiveRange('desktop') && the.options.accordion.autoScroll && element.getAttribute('data-kmenu-scroll') !== '1') {
        KUtil.scrollTo(item, the.options.accordion.autoScrollSpeed);
      }
    },

    /**
     * helper functions
     * @returns {KMenu}
     */
    hideSubmenuDropdown: function hideSubmenuDropdown(item, classAlso) {
      // remove submenu activation class
      if (classAlso) {
        KUtil.removeClass(item, 'k-menu__item--hover');
        KUtil.removeClass(item, 'k-menu__item--active-tab');
      } // clear timeout


      item.removeAttribute('data-hover');

      if (item.getAttribute('data-kmenu-dropdown-toggle-class')) {
        KUtil.removeClass(body, item.getAttribute('data-kmenu-dropdown-toggle-class'));
      }

      var timeout = item.getAttribute('data-timeout');
      item.removeAttribute('data-timeout');
      clearTimeout(timeout);
    },

    /**
     * helper functions
     * @returns {KMenu}
     */
    showSubmenuDropdown: function showSubmenuDropdown(item) {
      // close active submenus
      var list = element.querySelectorAll('.k-menu__item--submenu.k-menu__item--hover, .k-menu__item--submenu.k-menu__item--active-tab');

      if (list) {
        for (var i = 0, len = list.length; i < len; i++) {
          var el = list[i];

          if (item !== el && el.contains(item) === false && item.contains(el) === false) {
            Plugin.hideSubmenuDropdown(el, true);
          }
        }
      } // add submenu activation class


      KUtil.addClass(item, 'k-menu__item--hover');

      if (item.getAttribute('data-kmenu-dropdown-toggle-class')) {
        KUtil.addClass(body, item.getAttribute('data-kmenu-dropdown-toggle-class'));
      }
    },

    /**
     * Handles submenu slide toggle
     * @returns {KMenu}
     */
    createSubmenuDropdownClickDropoff: function createSubmenuDropdownClickDropoff(el) {
      var query;
      var zIndex = (query = KUtil.child(el, '.k-menu__submenu') ? KUtil.css(query, 'z-index') : 0) - 1;
      var dropoff = document.createElement('<div class="k-menu__dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + zIndex + '"></div>');
      body.appendChild(dropoff);
      KUtil.addEvent(dropoff, 'click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        KUtil.remove(this);
        Plugin.hideSubmenuDropdown(el, true);
      });
    },

    /**
     * Handles submenu hover toggle
     * @returns {KMenu}
     */
    pauseDropdownHover: function pauseDropdownHover(time) {
      var date = new Date();
      the.pauseDropdownHoverTime = date.getTime() + time;
    },

    /**
     * Handles submenu hover toggle
     * @returns {KMenu}
     */
    resumeDropdownHover: function resumeDropdownHover() {
      var date = new Date();
      return date.getTime() > the.pauseDropdownHoverTime ? true : false;
    },

    /**
     * Reset menu's current active item
     * @returns {KMenu}
     */
    resetActiveItem: function resetActiveItem(item) {
      var list;
      var parents;
      list = element.querySelectorAll('.k-menu__item--active');

      for (var i = 0, len = list.length; i < len; i++) {
        var el = list[0];
        KUtil.removeClass(el, 'k-menu__item--active');
        KUtil.hide(KUtil.child(el, '.k-menu__submenu'));
        parents = KUtil.parents(el, '.k-menu__item--submenu');

        for (var i_ = 0, len_ = parents.length; i_ < len_; i_++) {
          var el_ = parents[i];
          KUtil.removeClass(el_, 'k-menu__item--open');
          KUtil.hide(KUtil.child(el_, '.k-menu__submenu'));
        }
      } // close open submenus


      if (the.options.accordion.expandAll === false) {
        if (list = element.querySelectorAll('.k-menu__item--open')) {
          for (var i = 0, len = list.length; i < len; i++) {
            KUtil.removeClass(parents[0], 'k-menu__item--open');
          }
        }
      }
    },

    /**
     * Sets menu's active item
     * @returns {KMenu}
     */
    setActiveItem: function setActiveItem(item) {
      // reset current active item
      Plugin.resetActiveItem();
      KUtil.addClass(item, 'k-menu__item--active');
      var parents = KUtil.parents(item, '.k-menu__item--submenu');

      for (var i = 0, len = parents.length; i < len; i++) {
        KUtil.addClass(parents[i], 'k-menu__item--open');
      }
    },

    /**
     * Returns page breadcrumbs for the menu's active item
     * @returns {KMenu}
     */
    getBreadcrumbs: function getBreadcrumbs(item) {
      var query;
      var breadcrumbs = [];
      var link = KUtil.child(item, '.k-menu__link');
      breadcrumbs.push({
        text: query = KUtil.child(link, '.k-menu__link-text') ? query.innerHTML : '',
        title: link.getAttribute('title'),
        href: link.getAttribute('href')
      });
      var parents = KUtil.parents(item, '.k-menu__item--submenu');

      for (var i = 0, len = parents.length; i < len; i++) {
        var submenuLink = KUtil.child(parents[i], '.k-menu__link');
        breadcrumbs.push({
          text: query = KUtil.child(submenuLink, '.k-menu__link-text') ? query.innerHTML : '',
          title: submenuLink.getAttribute('title'),
          href: submenuLink.getAttribute('href')
        });
      }

      return breadcrumbs.reverse();
    },

    /**
     * Returns page title for the menu's active item
     * @returns {KMenu}
     */
    getPageTitle: function getPageTitle(item) {
      var query;
      return query = KUtil.child(item, '.k-menu__link-text') ? query.innerHTML : '';
    },

    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];

        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the, args);
            }
          } else {
            event.handler.call(this, the, args);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    },
    removeEvent: function removeEvent(name) {
      if (the.events[name]) {
        delete the.events[name];
      }
    }
  }; //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };
  /**
   * Update scroll
   */


  the.scrollUpdate = function () {
    return Plugin.scrollUpdate();
  };
  /**
   * Re-init scroll
   */


  the.scrollReInit = function () {
    return Plugin.scrollInit();
  };
  /**
   * Scroll top
   */


  the.scrollTop = function () {
    return Plugin.scrollTop();
  };
  /**
   * Set active menu item
   */


  the.setActiveItem = function (item) {
    return Plugin.setActiveItem(item);
  };

  the.reload = function () {
    return Plugin.reload();
  };

  the.update = function (options) {
    return Plugin.update(options);
  };
  /**
   * Set breadcrumb for menu item
   */


  the.getBreadcrumbs = function (item) {
    return Plugin.getBreadcrumbs(item);
  };
  /**
   * Set page title for menu item
   */


  the.getPageTitle = function (item) {
    return Plugin.getPageTitle(item);
  };
  /**
   * Get submenu mode
   */


  the.getSubmenuMode = function (el) {
    return Plugin.getSubmenuMode(el);
  };
  /**
   * Hide dropdown submenu
   * @returns {jQuery}
   */


  the.hideDropdown = function (item) {
    Plugin.hideSubmenuDropdown(item, true);
  };
  /**
   * Disable menu for given time
   * @returns {jQuery}
   */


  the.pauseDropdownHover = function (time) {
    Plugin.pauseDropdownHover(time);
  };
  /**
   * Disable menu for given time
   * @returns {jQuery}
   */


  the.resumeDropdownHover = function () {
    return Plugin.resumeDropdownHover();
  };
  /**
   * Register event
   */


  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  the.off = function (name) {
    return Plugin.removeEvent(name);
  };

  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  }; ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////
  // Run plugin


  Plugin.construct.apply(the, [options]); // Handle plugin on window resize

  KUtil.addResizeHandler(function () {
    if (init) {
      the.reload();
    }
  }); // Init done

  init = true; // Return plugin instance

  return the;
}; // Plugin global lazy initialization


document.addEventListener("click", function (e) {
  var body = KUtil.get('body');
  var query;

  if (query = body.querySelectorAll('.k-menu__nav .k-menu__item.k-menu__item--submenu.k-menu__item--hover:not(.k-menu__item--tabs)[data-kmenu-submenu-toggle="click"]')) {
    for (var i = 0, len = query.length; i < len; i++) {
      var element = query[i].closest('.k-menu__nav').parentNode;

      if (element) {
        var the = KUtil.data(element).get('menu');

        if (!the) {
          break;
        }

        if (!the || the.getSubmenuMode() !== 'dropdown') {
          break;
        }

        if (e.target !== element && element.contains(e.target) === false) {
          var items;

          if (items = element.querySelectorAll('.k-menu__item--submenu.k-menu__item--hover:not(.k-menu__item--tabs)[data-kmenu-submenu-toggle="click"]')) {
            for (var j = 0, cnt = items.length; j < cnt; j++) {
              the.hideDropdown(items[j]);
            }
          }
        }
      }
    }
  }
});
"use strict";

var KOffcanvas = function KOffcanvas(elementId, options) {
  // Main object
  var the = this;
  var init = false; // Get element object

  var element = KUtil.get(elementId);
  var body = KUtil.get('body');

  if (!element) {
    return;
  } // Default options


  var defaultOptions = {}; ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    construct: function construct(options) {
      if (KUtil.data(element).has('offcanvas')) {
        the = KUtil.data(element).get('offcanvas');
      } else {
        // reset offcanvas
        Plugin.init(options); // build offcanvas

        Plugin.build();
        KUtil.data(element).set('offcanvas', the);
      }

      return the;
    },
    init: function init(options) {
      the.events = []; // merge default and user defined options

      the.options = KUtil.deepExtend({}, defaultOptions, options);
      the.overlay;
      the.classBase = the.options.baseClass;
      the.classShown = the.classBase + '--on';
      the.classOverlay = the.classBase + '-overlay';
      the.state = KUtil.hasClass(element, the.classShown) ? 'shown' : 'hidden';
    },
    build: function build() {
      // offcanvas toggle
      if (the.options.toggleBy) {
        if (typeof the.options.toggleBy === 'string') {
          KUtil.addEvent(the.options.toggleBy, 'click', function (e) {
            e.preventDefault();
            Plugin.toggle();
          });
        } else if (the.options.toggleBy && the.options.toggleBy[0] && the.options.toggleBy[0].target) {
          for (var i in the.options.toggleBy) {
            KUtil.addEvent(the.options.toggleBy[i].target, 'click', function (e) {
              e.preventDefault();
              Plugin.toggle();
            });
          }
        } else if (the.options.toggleBy && the.options.toggleBy.target) {
          KUtil.addEvent(the.options.toggleBy.target, 'click', function (e) {
            e.preventDefault();
            Plugin.toggle();
          });
        }
      } // offcanvas close


      var closeBy = KUtil.get(the.options.closeBy);

      if (closeBy) {
        KUtil.addEvent(closeBy, 'click', function (e) {
          e.preventDefault();
          Plugin.hide();
        });
      }
    },
    isShown: function isShown(target) {
      return the.state == 'shown' ? true : false;
    },
    toggle: function toggle() {
      ;
      Plugin.eventTrigger('toggle');

      if (the.state == 'shown') {
        Plugin.hide(this);
      } else {
        Plugin.show(this);
      }
    },
    show: function show(target) {
      if (the.state == 'shown') {
        return;
      }

      Plugin.eventTrigger('beforeShow');
      Plugin.togglerClass(target, 'show'); // Offcanvas panel

      KUtil.addClass(body, the.classShown);
      KUtil.addClass(element, the.classShown);
      the.state = 'shown';

      if (the.options.overlay) {
        the.overlay = KUtil.insertAfter(document.createElement('DIV'), element);
        KUtil.addClass(the.overlay, the.classOverlay);
        KUtil.addEvent(the.overlay, 'click', function (e) {
          e.stopPropagation();
          e.preventDefault();
          Plugin.hide(target);
        });
      }

      Plugin.eventTrigger('afterShow');
    },
    hide: function hide(target) {
      if (the.state == 'hidden') {
        return;
      }

      Plugin.eventTrigger('beforeHide');
      Plugin.togglerClass(target, 'hide');
      KUtil.removeClass(body, the.classShown);
      KUtil.removeClass(element, the.classShown);
      the.state = 'hidden';

      if (the.options.overlay && the.overlay) {
        KUtil.remove(the.overlay);
      }

      Plugin.eventTrigger('afterHide');
    },
    togglerClass: function togglerClass(target, mode) {
      // Toggler
      var id = KUtil.attr(target, 'id');
      var toggleBy;

      if (the.options.toggleBy && the.options.toggleBy[0] && the.options.toggleBy[0].target) {
        for (var i in the.options.toggleBy) {
          if (the.options.toggleBy[i].target === id) {
            toggleBy = the.options.toggleBy[i];
          }
        }
      } else if (the.options.toggleBy && the.options.toggleBy.target) {
        toggleBy = the.options.toggleBy;
      }

      if (toggleBy) {
        var el = KUtil.get(toggleBy.target);

        if (mode === 'show') {
          KUtil.addClass(el, toggleBy.state);
        }

        if (mode === 'hide') {
          KUtil.removeClass(el, toggleBy.state);
        }
      }
    },
    eventTrigger: function eventTrigger(name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];

        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the, args);
            }
          } else {
            event.handler.call(this, the, args);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    }
  }; //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  the.isShown = function () {
    return Plugin.isShown();
  };

  the.hide = function () {
    return Plugin.hide();
  };

  the.show = function () {
    return Plugin.show();
  };

  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  }; ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////
  // Run plugin


  Plugin.construct.apply(the, [options]); // Init done

  init = true; // Return plugin instance

  return the;
};

"use strict"; // plugin setup


var KPortlet = function KPortlet(elementId, options) {
  // Main object
  var the = this;
  var init = false; // Get element object

  var element = KUtil.get(elementId);
  var body = KUtil.get('body');

  if (!element) {
    return;
  } // Default options


  var defaultOptions = {
    bodyToggleSpeed: 400,
    tooltips: true,
    tools: {
      toggle: {
        collapse: 'Collapse',
        expand: 'Expand'
      },
      reload: 'Reload',
      remove: 'Remove',
      fullscreen: {
        on: 'Fullscreen',
        off: 'Exit Fullscreen'
      }
    },
    sticky: {
      offset: 300,
      zIndex: 101
    }
  }; ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */
    construct: function construct(options) {
      if (KUtil.data(element).has('portlet')) {
        the = KUtil.data(element).get('portlet');
      } else {
        // reset menu
        Plugin.init(options); // build menu

        Plugin.build();
        KUtil.data(element).set('portlet', the);
      }

      return the;
    },

    /**
     * Init portlet
     */
    init: function init(options) {
      the.element = element;
      the.events = []; // merge default and user defined options

      the.options = KUtil.deepExtend({}, defaultOptions, options);
      the.head = KUtil.child(element, '.k-portlet__head');
      the.foot = KUtil.child(element, '.k-portlet__foot');

      if (KUtil.child(element, '.k-portlet__body')) {
        the.body = KUtil.child(element, '.k-portlet__body');
      } else if (KUtil.child(element, '.k-form').length !== 0) {
        the.body = KUtil.child(element, '.k-form');
      }
    },

    /**
     * Build Form Wizard
     */
    build: function build() {
      // Remove
      var remove = KUtil.find(the.head, '[data-kportlet-tool=remove]');

      if (remove) {
        KUtil.addEvent(remove, 'click', function (e) {
          e.preventDefault();
          Plugin.remove();
        });
      } // Reload


      var reload = KUtil.find(the.head, '[data-kportlet-tool=reload]');

      if (reload) {
        KUtil.addEvent(reload, 'click', function (e) {
          e.preventDefault();
          Plugin.reload();
        });
      } // Toggle


      var toggle = KUtil.find(the.head, '[data-kportlet-tool=toggle]');

      if (toggle) {
        KUtil.addEvent(toggle, 'click', function (e) {
          e.preventDefault();
          Plugin.toggle();
        });
      } //== Fullscreen


      var fullscreen = KUtil.find(the.head, '[data-kportlet-tool=fullscreen]');

      if (fullscreen) {
        KUtil.addEvent(fullscreen, 'click', function (e) {
          e.preventDefault();
          Plugin.fullscreen();
        });
      }

      Plugin.setupTooltips();
    },

    /**
     * Enable stickt mode
     */
    initSticky: function initSticky() {
      var lastScrollTop = 0;
      var offset = the.options.sticky.offset;

      if (!the.head) {
        return;
      }

      window.addEventListener('scroll', Plugin.onScrollSticky);
    },

    /**
     * Window scroll handle event for sticky portlet
     */
    onScrollSticky: function onScrollSticky(e) {
      var offset = the.options.sticky.offset;
      if (isNaN(offset)) return;
      var st = document.documentElement.scrollTop;

      if (st >= offset && KUtil.hasClass(body, 'k-portlet--sticky') === false) {
        Plugin.eventTrigger('stickyOn');
        KUtil.addClass(body, 'k-portlet--sticky');
        KUtil.addClass(element, 'k-portlet--sticky');
        Plugin.updateSticky();
      } else if (st * 1.5 <= offset && KUtil.hasClass(body, 'k-portlet--sticky')) {
        // back scroll mode
        Plugin.eventTrigger('stickyOff');
        KUtil.removeClass(body, 'k-portlet--sticky');
        KUtil.removeClass(element, 'k-portlet--sticky');
        Plugin.resetSticky();
      }
    },
    updateSticky: function updateSticky() {
      if (!the.head) {
        return;
      }

      var top;

      if (KUtil.hasClass(body, 'k-portlet--sticky')) {
        if (the.options.sticky.position.top instanceof Function) {
          top = parseInt(the.options.sticky.position.top.call());
        } else {
          top = parseInt(the.options.sticky.position.top);
        }

        var left;

        if (the.options.sticky.position.left instanceof Function) {
          left = parseInt(the.options.sticky.position.left.call());
        } else {
          left = parseInt(the.options.sticky.position.left);
        }

        var right;

        if (the.options.sticky.position.right instanceof Function) {
          right = parseInt(the.options.sticky.position.right.call());
        } else {
          right = parseInt(the.options.sticky.position.right);
        }

        KUtil.css(the.head, 'z-index', the.options.sticky.zIndex);
        KUtil.css(the.head, 'top', top + 'px');
        KUtil.css(the.head, 'left', left + 'px');
        KUtil.css(the.head, 'right', right + 'px');
      }
    },
    resetSticky: function resetSticky() {
      if (!the.head) {
        return;
      }

      if (KUtil.hasClass(body, 'k-portlet--sticky') === false) {
        KUtil.css(the.head, 'z-index', '');
        KUtil.css(the.head, 'top', '');
        KUtil.css(the.head, 'left', '');
        KUtil.css(the.head, 'right', '');
      }
    },

    /**
     * Remove portlet
     */
    remove: function remove() {
      if (Plugin.eventTrigger('beforeRemove') === false) {
        return;
      }

      if (KUtil.hasClass(body, 'k-portlet--fullscreen') && KUtil.hasClass(element, 'k-portlet--fullscreen')) {
        Plugin.fullscreen('off');
      }

      Plugin.removeTooltips();
      KUtil.remove(element);
      Plugin.eventTrigger('afterRemove');
    },

    /**
     * Set content
     */
    setContent: function setContent(html) {
      if (html) {
        the.body.innerHTML = html;
      }
    },

    /**
     * Get body
     */
    getBody: function getBody() {
      return the.body;
    },

    /**
     * Get self
     */
    getSelf: function getSelf() {
      return element;
    },

    /**
     * Setup tooltips
     */
    setupTooltips: function setupTooltips() {
      if (the.options.tooltips) {
        var collapsed = KUtil.hasClass(element, 'k-portlet--collapse') || KUtil.hasClass(element, 'k-portlet--collapsed');
        var fullscreenOn = KUtil.hasClass(body, 'k-portlet--fullscreen') && KUtil.hasClass(element, 'k-portlet--fullscreen'); //== Remove

        var remove = KUtil.find(the.head, '[data-kportlet-tool=remove]');

        if (remove) {
          var placement = fullscreenOn ? 'bottom' : 'top';
          var tip = new Tooltip(remove, {
            title: the.options.tools.remove,
            placement: placement,
            offset: fullscreenOn ? '0,10px,0,0' : '0,5px',
            trigger: 'hover',
            template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-' + placement + '" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
          });
          KUtil.data(remove).set('tooltip', tip);
        } //== Reload


        var reload = KUtil.find(the.head, '[data-kportlet-tool=reload]');

        if (reload) {
          var placement = fullscreenOn ? 'bottom' : 'top';
          var tip = new Tooltip(reload, {
            title: the.options.tools.reload,
            placement: placement,
            offset: fullscreenOn ? '0,10px,0,0' : '0,5px',
            trigger: 'hover',
            template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-' + placement + '" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
          });
          KUtil.data(reload).set('tooltip', tip);
        } //== Toggle


        var toggle = KUtil.find(the.head, '[data-kportlet-tool=toggle]');

        if (toggle) {
          var placement = fullscreenOn ? 'bottom' : 'top';
          var tip = new Tooltip(toggle, {
            title: collapsed ? the.options.tools.toggle.expand : the.options.tools.toggle.collapse,
            placement: placement,
            offset: fullscreenOn ? '0,10px,0,0' : '0,5px',
            trigger: 'hover',
            template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-' + placement + '" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
          });
          KUtil.data(toggle).set('tooltip', tip);
        } //== Fullscreen


        var fullscreen = KUtil.find(the.head, '[data-kportlet-tool=fullscreen]');

        if (fullscreen) {
          var placement = fullscreenOn ? 'bottom' : 'top';
          var tip = new Tooltip(fullscreen, {
            title: fullscreenOn ? the.options.tools.fullscreen.off : the.options.tools.fullscreen.on,
            placement: placement,
            offset: fullscreenOn ? '0,10px,0,0' : '0,5px',
            trigger: 'hover',
            template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-' + placement + '" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
          });
          KUtil.data(fullscreen).set('tooltip', tip);
        }
      }
    },

    /**
     * Setup tooltips
     */
    removeTooltips: function removeTooltips() {
      if (the.options.tooltips) {
        //== Remove
        var remove = KUtil.find(the.head, '[data-kportlet-tool=remove]');

        if (remove && KUtil.data(remove).has('tooltip')) {
          KUtil.data(remove).get('tooltip').dispose();
        } //== Reload


        var reload = KUtil.find(the.head, '[data-kportlet-tool=reload]');

        if (reload && KUtil.data(reload).has('tooltip')) {
          KUtil.data(reload).get('tooltip').dispose();
        } //== Toggle


        var toggle = KUtil.find(the.head, '[data-kportlet-tool=toggle]');

        if (toggle && KUtil.data(toggle).has('tooltip')) {
          KUtil.data(toggle).get('tooltip').dispose();
        } //== Fullscreen


        var fullscreen = KUtil.find(the.head, '[data-kportlet-tool=fullscreen]');

        if (fullscreen && KUtil.data(fullscreen).has('tooltip')) {
          KUtil.data(fullscreen).get('tooltip').dispose();
        }
      }
    },

    /**
     * Reload
     */
    reload: function reload() {
      Plugin.eventTrigger('reload');
    },

    /**
     * Toggle
     */
    toggle: function toggle() {
      if (KUtil.hasClass(element, 'k-portlet--collapse') || KUtil.hasClass(element, 'k-portlet--collapsed')) {
        Plugin.expand();
      } else {
        Plugin.collapse();
      }
    },

    /**
     * Collapse
     */
    collapse: function collapse() {
      if (Plugin.eventTrigger('beforeCollapse') === false) {
        return;
      }

      KUtil.slideUp(the.body, the.options.bodyToggleSpeed, function () {
        Plugin.eventTrigger('afterCollapse');
      });
      KUtil.addClass(element, 'k-portlet--collapse');
      var toggle = KUtil.find(the.head, '[data-kportlet-tool=toggle]');

      if (toggle && KUtil.data(toggle).has('tooltip')) {
        KUtil.data(toggle).get('tooltip').updateTitleContent(the.options.tools.toggle.expand);
      }
    },

    /**
     * Expand
     */
    expand: function expand() {
      if (Plugin.eventTrigger('beforeExpand') === false) {
        return;
      }

      KUtil.slideDown(the.body, the.options.bodyToggleSpeed, function () {
        Plugin.eventTrigger('afterExpand');
      });
      KUtil.removeClass(element, 'k-portlet--collapse');
      KUtil.removeClass(element, 'k-portlet--collapsed');
      var toggle = KUtil.find(the.head, '[data-kportlet-tool=toggle]');

      if (toggle && KUtil.data(toggle).has('tooltip')) {
        KUtil.data(toggle).get('tooltip').updateTitleContent(the.options.tools.toggle.collapse);
      }
    },

    /**
     * fullscreen
     */
    fullscreen: function fullscreen(mode) {
      var d = {};
      var speed = 300;

      if (mode === 'off' || KUtil.hasClass(body, 'k-portlet--fullscreen') && KUtil.hasClass(element, 'k-portlet--fullscreen')) {
        Plugin.eventTrigger('beforeFullscreenOff');
        KUtil.removeClass(body, 'k-portlet--fullscreen');
        KUtil.removeClass(element, 'k-portlet--fullscreen');
        Plugin.removeTooltips();
        Plugin.setupTooltips();

        if (the.foot) {
          KUtil.css(the.body, 'margin-bottom', '');
          KUtil.css(the.foot, 'margin-top', '');
        }

        Plugin.eventTrigger('afterFullscreenOff');
      } else {
        Plugin.eventTrigger('beforeFullscreenOn');
        KUtil.addClass(element, 'k-portlet--fullscreen');
        KUtil.addClass(body, 'k-portlet--fullscreen');
        Plugin.removeTooltips();
        Plugin.setupTooltips();

        if (the.foot) {
          var height1 = parseInt(KUtil.css(the.foot, 'height'));
          var height2 = parseInt(KUtil.css(the.foot, 'height')) + parseInt(KUtil.css(the.head, 'height'));
          KUtil.css(the.body, 'margin-bottom', height1 + 'px');
          KUtil.css(the.foot, 'margin-top', '-' + height2 + 'px');
        }

        Plugin.eventTrigger('afterFullscreenOn');
      }
    },

    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name) {
      //KUtil.triggerCustomEvent(name);
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];

        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the);
            }
          } else {
            event.handler.call(this, the);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
      return the;
    }
  }; //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };
  /**
   * Remove portlet
   * @returns {KPortlet}
   */


  the.remove = function () {
    return Plugin.remove(html);
  };
  /**
   * Remove portlet
   * @returns {KPortlet}
   */


  the.initSticky = function () {
    return Plugin.initSticky();
  };
  /**
   * Remove portlet
   * @returns {KPortlet}
   */


  the.updateSticky = function () {
    return Plugin.updateSticky();
  };
  /**
   * Remove portlet
   * @returns {KPortlet}
   */


  the.resetSticky = function () {
    return Plugin.resetSticky();
  };
  /**
   * Destroy sticky portlet
   */


  the.destroySticky = function () {
    Plugin.resetSticky();
    window.removeEventListener('scroll', Plugin.onScrollSticky);
  };
  /**
   * Reload portlet
   * @returns {KPortlet}
   */


  the.reload = function () {
    return Plugin.reload();
  };
  /**
   * Set portlet content
   * @returns {KPortlet}
   */


  the.setContent = function (html) {
    return Plugin.setContent(html);
  };
  /**
   * Toggle portlet
   * @returns {KPortlet}
   */


  the.toggle = function () {
    return Plugin.toggle();
  };
  /**
   * Collapse portlet
   * @returns {KPortlet}
   */


  the.collapse = function () {
    return Plugin.collapse();
  };
  /**
   * Expand portlet
   * @returns {KPortlet}
   */


  the.expand = function () {
    return Plugin.expand();
  };
  /**
   * Fullscreen portlet
   * @returns {MPortlet}
   */


  the.fullscreen = function () {
    return Plugin.fullscreen('on');
  };
  /**
   * Fullscreen portlet
   * @returns {MPortlet}
   */


  the.unFullscreen = function () {
    return Plugin.fullscreen('off');
  };
  /**
   * Get portletbody
   * @returns {jQuery}
   */


  the.getBody = function () {
    return Plugin.getBody();
  };
  /**
   * Get portletbody
   * @returns {jQuery}
   */


  the.getSelf = function () {
    return Plugin.getSelf();
  };
  /**
   * Attach event
   */


  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };
  /**
   * Attach event that will be fired once
   */


  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  }; // Construct plugin


  Plugin.construct.apply(the, [options]);
  return the;
};

"use strict";

var KScrolltop = function KScrolltop(elementId, options) {
  // Main object
  var the = this;
  var init = false; // Get element object

  var element = KUtil.get(elementId);
  var body = KUtil.get('body');

  if (!element) {
    return;
  } // Default options


  var defaultOptions = {
    offset: 300,
    speed: 600,
    toggleClass: 'k-scrolltop--on'
  }; ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Run plugin
     * @returns {mscrolltop}
     */
    construct: function construct(options) {
      if (KUtil.data(element).has('scrolltop')) {
        the = KUtil.data(element).get('scrolltop');
      } else {
        // reset scrolltop
        Plugin.init(options); // build scrolltop

        Plugin.build();
        KUtil.data(element).set('scrolltop', the);
      }

      return the;
    },

    /**
     * Handles subscrolltop click toggle
     * @returns {mscrolltop}
     */
    init: function init(options) {
      the.events = []; // merge default and user defined options

      the.options = KUtil.deepExtend({}, defaultOptions, options);
    },
    build: function build() {
      // handle window scroll
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        window.addEventListener('touchend', function () {
          Plugin.handle();
        });
        window.addEventListener('touchcancel', function () {
          Plugin.handle();
        });
        window.addEventListener('touchleave', function () {
          Plugin.handle();
        });
      } else {
        window.addEventListener('scroll', function () {
          Plugin.handle();
        });
      } // handle button click 


      KUtil.addEvent(element, 'click', Plugin.scroll);
    },

    /**
     * Handles scrolltop click scrollTop
     */
    handle: function handle() {
      var pos = window.pageYOffset; // current vertical position

      if (pos > the.options.offset) {
        KUtil.addClass(body, the.options.toggleClass);
      } else {
        KUtil.removeClass(body, the.options.toggleClass);
      }
    },

    /**
     * Handles scrolltop click scrollTop
     */
    scroll: function scroll(e) {
      e.preventDefault();
      KUtil.scrollTop(0, the.options.speed);
    },

    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];

        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the, args);
            }
          } else {
            event.handler.call(this, the, args);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    }
  }; //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };
  /**
   * Get subscrolltop mode
   */


  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };
  /**
   * Set scrolltop content
   * @returns {mscrolltop}
   */


  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  }; ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////
  // Run plugin


  Plugin.construct.apply(the, [options]); // Init done

  init = true; // Return plugin instance

  return the;
};

"use strict"; // plugin setup


var KToggle = function KToggle(elementId, options) {
  // Main object
  var the = this;
  var init = false; // Get element object

  var element = KUtil.get(elementId);
  var body = KUtil.get('body');

  if (!element) {
    return;
  } // Default options


  var defaultOptions = {
    togglerState: '',
    targetState: ''
  }; ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */
    construct: function construct(options) {
      if (KUtil.data(element).has('toggle')) {
        the = KUtil.data(element).get('toggle');
      } else {
        // reset menu
        Plugin.init(options); // build menu

        Plugin.build();
        KUtil.data(element).set('toggle', the);
      }

      return the;
    },

    /**
     * Handles subtoggle click toggle
     */
    init: function init(options) {
      the.element = element;
      the.events = []; // merge default and user defined options

      the.options = KUtil.deepExtend({}, defaultOptions, options);
      the.target = KUtil.get(the.options.target);
      the.targetState = the.options.targetState;
      the.togglerState = the.options.togglerState;
      the.state = KUtil.hasClasses(the.target, the.targetState) ? 'on' : 'off';
    },

    /**
     * Setup toggle
     */
    build: function build() {
      KUtil.addEvent(element, 'mouseup', Plugin.toggle);
    },

    /**
     * Handles offcanvas click toggle
     */
    toggle: function toggle(e) {
      Plugin.eventTrigger('beforeToggle');

      if (the.state == 'off') {
        Plugin.toggleOn();
      } else {
        Plugin.toggleOff();
      }

      Plugin.eventTrigger('afterToggle');
      e.preventDefault();
      return the;
    },

    /**
     * Handles toggle click toggle
     */
    toggleOn: function toggleOn() {
      Plugin.eventTrigger('beforeOn');
      KUtil.addClass(the.target, the.targetState);

      if (the.togglerState) {
        KUtil.addClass(element, the.togglerState);
      }

      the.state = 'on';
      Plugin.eventTrigger('afterOn');
      Plugin.eventTrigger('toggle');
      return the;
    },

    /**
     * Handles toggle click toggle
     */
    toggleOff: function toggleOff() {
      Plugin.eventTrigger('beforeOff');
      KUtil.removeClass(the.target, the.targetState);

      if (the.togglerState) {
        KUtil.removeClass(element, the.togglerState);
      }

      the.state = 'off';
      Plugin.eventTrigger('afterOff');
      Plugin.eventTrigger('toggle');
      return the;
    },

    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];

        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the);
            }
          } else {
            event.handler.call(this, the);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
      return the;
    }
  }; //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };
  /**
   * Get toggle state 
   */


  the.getState = function () {
    return the.state;
  };
  /**
   * Toggle 
   */


  the.toggle = function () {
    return Plugin.toggle();
  };
  /**
   * Toggle on 
   */


  the.toggleOn = function () {
    return Plugin.toggleOn();
  };
  /**
   * Toggle off 
   */


  the.toggleOff = function () {
    return Plugin.toggleOff();
  };
  /**
   * Attach event
   * @returns {KToggle}
   */


  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };
  /**
   * Attach event that will be fired once
   * @returns {KToggle}
   */


  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  }; // Construct plugin


  Plugin.construct.apply(the, [options]);
  return the;
}; // plugin setup


var KWizard = function KWizard(elementId, options) {
  // Main object
  var the = this;
  var init = false; // Get element object

  var element = KUtil.get(elementId);
  var body = KUtil.get('body');

  if (!element) {
    return;
  } // Default options


  var defaultOptions = {
    startStep: 1,
    manualStepForward: false
  }; ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */
    construct: function construct(options) {
      if (KUtil.data(element).has('wizard')) {
        the = KUtil.data(element).get('wizard');
      } else {
        // reset menu
        Plugin.init(options); // build menu

        Plugin.build();
        KUtil.data(element).set('wizard', the);
      }

      return the;
    },

    /**
     * Init wizard
     */
    init: function init(options) {
      the.element = element;
      the.events = []; // merge default and user defined options

      the.options = KUtil.deepExtend({}, defaultOptions, options); // Elements

      the.steps = KUtil.findAll(element, '[data-kwizard-type="step"]');
      the.btnSubmit = KUtil.find(element, '[data-kwizard-type="action-submit"]');
      the.btnNext = KUtil.find(element, '[data-kwizard-type="action-next"]');
      the.btnPrev = KUtil.find(element, '[data-kwizard-type="action-prev"]');
      the.btnLast = KUtil.find(element, '[data-kwizard-type="action-last"]');
      the.btnFirst = KUtil.find(element, '[data-kwizard-type="action-first"]'); // Variables

      the.events = [];
      the.currentStep = 1;
      the.stopped = false;
      the.totalSteps = the.steps.length; // Init current step

      if (the.options.startStep > 1) {
        Plugin.goTo(the.options.startStep);
      } // Init UI


      Plugin.updateUI();
    },

    /**
     * Build Form Wizard
     */
    build: function build() {
      // Next button event handler
      KUtil.addEvent(the.btnNext, 'click', function (e) {
        e.preventDefault();
        Plugin.goNext();
      }); // Prev button event handler

      KUtil.addEvent(the.btnPrev, 'click', function (e) {
        e.preventDefault();
        Plugin.goPrev();
      }); // First button event handler

      KUtil.addEvent(the.btnFirst, 'click', function (e) {
        e.preventDefault();
        Plugin.goFirst();
      }); // Last button event handler

      KUtil.addEvent(the.btnLast, 'click', function (e) {
        e.preventDefault();
        Plugin.goLast();
      });
      KUtil.on(element, 'a[data-kwizard-type="step"]', 'click', function () {
        var index = KUtil.index(this) + 1;

        if (index !== the.currentStep) {
          Plugin.goTo(index);
        }
      });
    },

    /**
     * Handles wizard click wizard
     */
    goTo: function goTo(number) {
      // Skip if this step is already shown
      if (number === the.currentStep || number > the.totalSteps || number < 0) {
        return;
      } // Validate step number


      if (number) {
        number = parseInt(number);
      } else {
        number = Plugin.getNextStep();
      } // Before next and prev events


      var callback;

      if (number > the.currentStep) {
        callback = Plugin.eventTrigger('beforeNext');
      } else {
        callback = Plugin.eventTrigger('beforePrev');
      } // Skip if stopped


      if (the.stopped === true) {
        the.stopped = false;
        return;
      } // Continue if no exit


      if (callback !== false) {
        // Before change
        Plugin.eventTrigger('beforeChange'); // Set current step 

        the.currentStep = number;
        Plugin.updateUI(); // Trigger change event

        Plugin.eventTrigger('change');
      } // After next and prev events


      if (number > the.startStep) {
        Plugin.eventTrigger('afterNext');
      } else {
        Plugin.eventTrigger('afterPrev');
      }

      return the;
    },

    /**
     * Cancel
     */
    stop: function stop() {
      the.stopped = true;
    },

    /**
     * Resume
     */
    start: function start() {
      the.stopped = false;
    },

    /**
     * Check last step
     */
    isLastStep: function isLastStep() {
      return the.currentStep === the.totalSteps;
    },

    /**
     * Check first step
     */
    isFirstStep: function isFirstStep() {
      return the.currentStep === 1;
    },

    /**
     * Check between step
     */
    isBetweenStep: function isBetweenStep() {
      return Plugin.isLastStep() === false && Plugin.isFirstStep() === false;
    },

    /**
     * Go to the next step
     */
    goNext: function goNext() {
      return Plugin.goTo(Plugin.getNextStep());
    },

    /**
     * Go to the prev step
     */
    goPrev: function goPrev() {
      return Plugin.goTo(Plugin.getPrevStep());
    },

    /**
     * Go to the last step
     */
    goLast: function goLast() {
      return Plugin.goTo(the.totalSteps);
    },

    /**
     * Go to the first step
     */
    goFirst: function goFirst() {
      return Plugin.goTo(1);
    },

    /**
     * Go to the first step
     */
    updateUI: function updateUI() {
      var stepType = '';
      var index = the.currentStep - 1;

      if (Plugin.isLastStep()) {
        stepType = 'last';
      } else if (Plugin.isFirstStep()) {
        stepType = 'first';
      } else {
        stepType = 'between';
      }

      KUtil.attr(the.element, 'data-kwizard-state', stepType); // Steps

      var steps = KUtil.findAll(the.element, '[data-kwizard-type="step"]');

      if (steps && steps.length > 0) {
        for (var i = 0, len = steps.length; i < len; i++) {
          if (i == index) {
            KUtil.attr(steps[i], 'data-kwizard-state', 'current');
          } else {
            if (i < index) {
              KUtil.attr(steps[i], 'data-kwizard-state', 'done');
            } else {
              KUtil.attr(steps[i], 'data-kwizard-state', 'pending');
            }
          }
        }
      } // Steps Info


      var stepsInfo = KUtil.findAll(the.element, '[data-kwizard-type="step-info"]');

      if (stepsInfo && stepsInfo.length > 0) {
        for (var i = 0, len = stepsInfo.length; i < len; i++) {
          if (i == index) {
            KUtil.attr(stepsInfo[i], 'data-kwizard-state', 'current');
          } else {
            KUtil.removeAttr(stepsInfo[i], 'data-kwizard-state');
          }
        }
      } // Steps Content


      var stepsContent = KUtil.findAll(the.element, '[data-kwizard-type="step-content"]');

      if (stepsContent && stepsContent.length > 0) {
        for (var i = 0, len = stepsContent.length; i < len; i++) {
          if (i == index) {
            KUtil.attr(stepsContent[i], 'data-kwizard-state', 'current');
          } else {
            KUtil.removeAttr(stepsContent[i], 'data-kwizard-state');
          }
        }
      }
    },

    /**
     * Get next step
     */
    getNextStep: function getNextStep() {
      if (the.totalSteps >= the.currentStep + 1) {
        return the.currentStep + 1;
      } else {
        return the.totalSteps;
      }
    },

    /**
     * Get prev step
     */
    getPrevStep: function getPrevStep() {
      if (the.currentStep - 1 >= 1) {
        return the.currentStep - 1;
      } else {
        return 1;
      }
    },

    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name) {
      //KUtil.triggerCustomEvent(name);
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];

        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the);
            }
          } else {
            event.handler.call(this, the);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
      return the;
    }
  }; //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };
  /**
   * Go to the next step 
   */


  the.goNext = function () {
    return Plugin.goNext();
  };
  /**
   * Go to the prev step 
   */


  the.goPrev = function () {
    return Plugin.goPrev();
  };
  /**
   * Go to the last step 
   */


  the.goLast = function () {
    return Plugin.goLast();
  };
  /**
   * Cancel step 
   */


  the.stop = function () {
    return Plugin.stop();
  };
  /**
   * Resume step 
   */


  the.start = function () {
    return Plugin.start();
  };
  /**
   * Go to the first step 
   */


  the.goFirst = function () {
    return Plugin.goFirst();
  };
  /**
   * Go to a step
   */


  the.goTo = function (number) {
    return Plugin.goTo(number);
  };
  /**
   * Get current step number 
   */


  the.getStep = function () {
    return the.currentStep;
  };
  /**
   * Check last step 
   */


  the.isLastStep = function () {
    return Plugin.isLastStep();
  };
  /**
   * Check first step 
   */


  the.isFirstStep = function () {
    return Plugin.isFirstStep();
  };
  /**
   * Attach event
   */


  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };
  /**
   * Attach event that will be fired once
   */


  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  }; // Construct plugin


  Plugin.construct.apply(the, [options]);
  return the;
}; // plugin setup


var KAvatar = function KAvatar(elementId, options) {
  // Main object
  var the = this;
  var init = false; // Get element object

  var element = KUtil.get(elementId);
  var body = KUtil.get('body');

  if (!element) {
    return;
  } // Default options


  var defaultOptions = {}; ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */
    construct: function construct(options) {
      if (KUtil.data(element).has('avatar')) {
        the = KUtil.data(element).get('avatar');
      } else {
        // reset menu
        Plugin.init(options); // build menu

        Plugin.build();
        KUtil.data(element).set('avatar', the);
      }

      return the;
    },

    /**
     * Init avatar
     */
    init: function init(options) {
      the.element = element;
      the.events = [];
      the.input = KUtil.find(element, 'input[type="file"]');
      the.holder = KUtil.find(element, '.k-avatar__holder');
      the.cancel = KUtil.find(element, '.k-avatar__cancel');
      the.src = KUtil.css(the.holder, 'backgroundImage'); // merge default and user defined options

      the.options = KUtil.deepExtend({}, defaultOptions, options);
    },

    /**
     * Build Form Wizard
     */
    build: function build() {
      // Handle avatar change
      KUtil.addEvent(the.input, 'change', function (e) {
        e.preventDefault();

        if (the.input && the.input.files && the.input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
            KUtil.css(the.holder, 'background-image', 'url(' + e.target.result + ')');
          };

          reader.readAsDataURL(the.input.files[0]);
          KUtil.addClass(the.element, 'k-avatar--changed');
        }
      }); // Handle avatar cancel

      KUtil.addEvent(the.cancel, 'click', function (e) {
        e.preventDefault();
        KUtil.removeClass(the.element, 'k-avatar--changed');
        KUtil.css(the.holder, 'background-image', the.src);
        the.input.value = "";
      });
    },

    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name) {
      //KUtil.triggerCustomEvent(name);
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];

        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the);
            }
          } else {
            event.handler.call(this, the);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
      return the;
    }
  }; //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };
  /**
   * Attach event
   */


  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };
  /**
   * Attach event that will be fired once
   */


  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  }; // Construct plugin


  Plugin.construct.apply(the, [options]);
  return the;
};

"use strict";

var KLayout = function () {
  var body;
  var header;
  var headerMenu;
  var headerMenuOffcanvas;
  var mobileHeaderTopbarToggle;
  var asideMenu;
  var asideMenuOffcanvas;
  var scrollTop;
  var pageStickyPortlet; // Header

  var _initHeader = function initHeader() {
    var tmp;
    var headerEl = KUtil.get('k_header');
    var options = {
      classic: {
        desktop: true,
        mobile: false
      },
      offset: {},
      minimize: {}
    };
    options.minimize.mobile = false;

    if (KUtil.attr(headerEl, 'data-kheader-minimize') == 'on') {
      options.minimize.desktop = {};
      options.minimize.desktop.on = 'k-header--minimize';
      options.offset.desktop = parseInt(KUtil.css(headerEl, 'height')) - 10;
    } else {
      options.minimize.desktop = false;
    }

    header = new KHeader('k_header', options);

    if (asideMenu) {
      header.on('minimizeOn', function () {
        asideMenu.scrollReInit();
      });
      header.on('minimizeOff', function () {
        asideMenu.scrollReInit();
      });
    }
  }; // Header Menu


  var initHeaderMenu = function initHeaderMenu() {
    // init aside left offcanvas
    headerMenuOffcanvas = new KOffcanvas('k_header_menu_wrapper', {
      overlay: true,
      baseClass: 'k-header-menu-wrapper',
      closeBy: 'k_header_menu_mobile_close_btn',
      toggleBy: {
        target: 'k_header_mobile_toggler',
        state: 'k-header-mobile__toolbar-toggler--active'
      }
    });
    headerMenu = new KMenu('k_header_menu', {
      submenu: {
        desktop: 'dropdown',
        tablet: 'accordion',
        mobile: 'accordion'
      },
      accordion: {
        slideSpeed: 200,
        // accordion toggle slide speed in milliseconds
        expandAll: false // allow having multiple expanded accordions in the menu

      }
    });
  }; // Header Topbar


  var initHeaderTopbar = function initHeaderTopbar() {
    mobileHeaderTopbarToggle = new KToggle('k_header_mobile_topbar_toggler', {
      target: 'body',
      targetState: 'k-header__topbar--mobile-on',
      togglerState: 'k-header-mobile__toolbar-topbar-toggler--active'
    });
  }; // Aside


  var _initAside = function initAside() {
    // init aside left offcanvas
    var asidBrandHover = false;
    var aside = KUtil.get('k_aside');
    var asideBrand = KUtil.get('k_aside_brand');
    var asideOffcanvasClass = KUtil.hasClass(aside, 'k-aside--offcanvas-default') ? 'k-aside--offcanvas-default' : 'k-aside';
    asideMenuOffcanvas = new KOffcanvas('k_aside', {
      baseClass: asideOffcanvasClass,
      overlay: true,
      closeBy: 'k_aside_close_btn',
      toggleBy: {
        target: 'k_aside_mobile_toggler',
        state: 'k-header-mobile__toolbar-toggler--active'
      }
    }); // Handle minimzied aside hover

    if (KUtil.hasClass(body, 'k-aside--fixed')) {
      var insideTm;
      var outsideTm;
      KUtil.addEvent(aside, 'mouseenter', function (e) {
        e.preventDefault();

        if (KUtil.isInResponsiveRange('desktop') === false) {
          return;
        }

        if (outsideTm) {
          clearTimeout(outsideTm);
          outsideTm = null;
        }

        insideTm = setTimeout(function () {
          if (KUtil.hasClass(body, 'k-aside--minimize') && KUtil.isInResponsiveRange('desktop')) {
            KUtil.removeClass(body, 'k-aside--minimize'); // Minimizing class

            KUtil.addClass(body, 'k-aside--minimizing');
            KUtil.transitionEnd(body, function () {
              KUtil.removeClass(body, 'k-aside--minimizing');
            }); // Hover class

            KUtil.addClass(body, 'k-aside--minimize-hover');
            asideMenu.scrollUpdate();
            asideMenu.scrollTop();
          }
        }, 50);
      });
      KUtil.addEvent(aside, 'mouseleave', function (e) {
        e.preventDefault();

        if (KUtil.isInResponsiveRange('desktop') === false) {
          return;
        }

        if (insideTm) {
          clearTimeout(insideTm);
          insideTm = null;
        }

        outsideTm = setTimeout(function () {
          if (KUtil.hasClass(body, 'k-aside--minimize-hover') && KUtil.isInResponsiveRange('desktop')) {
            KUtil.removeClass(body, 'k-aside--minimize-hover');
            KUtil.addClass(body, 'k-aside--minimize'); // Minimizing class

            KUtil.addClass(body, 'k-aside--minimizing');
            KUtil.transitionEnd(body, function () {
              KUtil.removeClass(body, 'k-aside--minimizing');
            }); // Hover class

            asideMenu.scrollUpdate();
            asideMenu.scrollTop();
          }
        }, 100);
      });
    }
  }; // Aside menu


  var initAsideMenu = function initAsideMenu() {
    // Init aside menu
    var menu = KUtil.get('k_aside_menu');
    var menuDesktopMode = KUtil.attr(menu, 'data-kmenu-dropdown') === '1' ? 'dropdown' : 'accordion'; // Init scrollable menu container

    var scroll;

    if (KUtil.attr(menu, 'data-kmenu-scroll') === '1') {
      scroll = {
        height: function height() {
          var height;

          if (KUtil.isInResponsiveRange('desktop')) {
            height = parseInt(KUtil.getViewPort().height) - parseInt(KUtil.actualHeight('k_header', false)) - parseInt(KUtil.actualHeight('k_footer', false));
            height = height - parseInt(KUtil.css(menu, 'marginTop')) - parseInt(KUtil.css(menu, 'marginBottom'));
          } else {
            height = parseInt(KUtil.getViewPort().height);
          }

          return height;
        }
      };
    } // Init aside menu


    asideMenu = new KMenu('k_aside_menu', {
      // vertical scroll
      scroll: scroll,
      // submenu setup
      submenu: {
        desktop: {
          // by default the menu mode set to accordion in desktop mode
          default: menuDesktopMode,
          // whenever body has this class switch the menu mode to dropdown
          state: {
            body: 'k-aside--minimize',
            mode: 'dropdown'
          }
        },
        tablet: 'accordion',
        // menu set to accordion in tablet mode
        mobile: 'accordion' // menu set to accordion in mobile mode

      },
      //accordion setup
      accordion: {
        expandAll: false // allow having multiple expanded accordions in the menu

      }
    });
  }; // Scrolltop


  var initScrolltop = function initScrolltop() {
    var scrolltop = new KScrolltop('k_scrolltop', {
      offset: 200,
      speed: 400
    });
  }; // Init page sticky portlet


  var _initPageStickyPortlet = function initPageStickyPortlet() {
    return new KPortlet('k_page_portlet', {
      sticky: {
        offset: parseInt(KUtil.css(KUtil.get('k_header'), 'height')) + 200,
        zIndex: 90,
        position: {
          top: function top() {
            var h = 0;

            if (KUtil.isInResponsiveRange('desktop')) {
              if (KUtil.hasClass(body, 'k-header--fixed')) {
                h = h + parseInt(KUtil.css(KUtil.get('k_header'), 'height'));
              }
            } else {
              if (KUtil.hasClass(body, 'k-header-mobile--fixed')) {
                h = h + parseInt(KUtil.css(KUtil.get('k_header_mobile'), 'height'));
              }
            }

            return h;
          },
          left: function left() {
            if (KUtil.isInResponsiveRange('tablet-and-mobile')) {
              return parseInt(KUtil.css(KUtil.get('k_body'), 'paddingLeft'));
            }

            return;
          },
          right: function right() {
            if (KUtil.isInResponsiveRange('tablet-and-mobile')) {
              return parseInt(KUtil.css(KUtil.get('k_body'), 'paddingRight'));
            }

            return;
          }
        }
      }
    });
  };

  return {
    init: function init() {
      body = KUtil.get('body');
      this.initHeader();
      this.initAside();
      this.initPageStickyPortlet(); // Non functional links notice(can be removed in production)

      $('#k_aside_menu, #k_header_menu').on('click', '.k-menu__link[href="#"]', function (e) {
        swal("", "You have clicked on a non-functional dummy link!");
        e.preventDefault();
      });
    },
    initHeader: function initHeader() {
      _initHeader();

      initHeaderMenu();
      initHeaderTopbar();
      initScrolltop();
    },
    initAside: function initAside() {
      _initAside();

      initAsideMenu();
    },
    getAsideMenu: function getAsideMenu() {
      return asideMenu;
    },
    initPageStickyPortlet: function initPageStickyPortlet() {
      if (!KUtil.get('k_page_portlet')) {
        return;
      }

      pageStickyPortlet = _initPageStickyPortlet();
      pageStickyPortlet.initSticky();
      KUtil.addResizeHandler(function () {
        pageStickyPortlet.updateSticky();
      });

      _initPageStickyPortlet();
    },
    closeMobileAsideMenuOffcanvas: function closeMobileAsideMenuOffcanvas() {
      if (KUtil.isMobileDevice()) {
        asideMenuOffcanvas.hide();
      }
    },
    closeMobileHeaderMenuOffcanvas: function closeMobileHeaderMenuOffcanvas() {
      if (KUtil.isMobileDevice()) {
        headerMenuOffcanvas.hide();
      }
    }
  };
}();

$(document).ready(function () {
  KLayout.init();
});
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
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/demo/demo3/base/scripts.bundle.js"], null)
//# sourceMappingURL=/scripts.bundle.bdcc0f7b.js.map