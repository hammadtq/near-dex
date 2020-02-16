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
})({"assets/app/scripts/bundle/app.bundle.js":[function(require,module,exports) {
var KDemoPanel = function () {
  var demoPanel = KUtil.getByID('k_demo_panel');
  var offcanvas;

  var _init = function init() {
    offcanvas = new KOffcanvas(demoPanel, {
      overlay: true,
      baseClass: 'k-demo-panel',
      closeBy: 'k_demo_panel_close',
      toggleBy: 'k_demo_panel_toggle'
    });
    var head = KUtil.find(demoPanel, '.k-demo-panel__head');
    var body = KUtil.find(demoPanel, '.k-demo-panel__body');
    KUtil.scrollInit(body, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        var height = parseInt(KUtil.getViewPort().height);

        if (head) {
          height = height - parseInt(KUtil.actualHeight(head));
          height = height - parseInt(KUtil.css(head, 'marginBottom'));
        }

        height = height - parseInt(KUtil.css(demoPanel, 'paddingTop'));
        height = height - parseInt(KUtil.css(demoPanel, 'paddingBottom'));
        return height;
      }
    });

    if (typeof offcanvas !== 'undefined') {// offcanvas.on('hide', function() {
      //     alert(1);
      //     var expires = new Date(new Date().getTime() + 60 * 60 * 1000); // expire in 60 minutes from now
      //     Cookies.set('k_demo_panel_shown', 1, { expires: expires });
      // });
    }
  };

  var remind = function remind() {
    if (!(encodeURI(window.location.hostname) == 'keenthemes.com' || encodeURI(window.location.hostname) == 'www.keenthemes.com')) {
      return;
    }

    setTimeout(function () {
      if (!Cookies.get('k_demo_panel_shown')) {
        var expires = new Date(new Date().getTime() + 15 * 60 * 1000); // expire in 15 minutes from now

        Cookies.set('k_demo_panel_shown', 1, {
          expires: expires
        });
        offcanvas.show();
      }
    }, 4000);
  };

  return {
    init: function init() {
      _init();

      remind();
    }
  };
}();

$(document).ready(function () {
  KDemoPanel.init();
}); // Class definition

var KLib = function () {
  return {
    initMiniChart: function initMiniChart(src, data, color, border, fill, tooltip) {
      if (src.length == 0) {
        return;
      } // set default values


      fill = typeof fill !== 'undefined' ? fill : false;
      tooltip = typeof tooltip !== 'undefined' ? tooltip : false;
      var config = {
        type: 'line',
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
          datasets: [{
            label: "",
            borderColor: color,
            borderWidth: border,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 4,
            pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
            pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
            pointHoverBackgroundColor: KApp.getStateColor('brand'),
            pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
            fill: fill,
            backgroundColor: color,
            data: data
          }]
        },
        options: {
          title: {
            display: false
          },
          tooltips: tooltip ? {
            enabled: true,
            intersect: false,
            mode: 'nearest',
            bodySpacing: 5,
            yPadding: 10,
            xPadding: 10,
            caretPadding: 0,
            displayColors: false,
            backgroundColor: KApp.getStateColor('brand'),
            titleFontColor: '#ffffff',
            cornerRadius: 4,
            footerSpacing: 0,
            titleSpacing: 0
          } : false,
          legend: {
            display: false,
            labels: {
              usePointStyle: false
            }
          },
          responsive: false,
          maintainAspectRatio: true,
          hover: {
            mode: 'index'
          },
          scales: {
            xAxes: [{
              display: false,
              gridLines: false,
              scaleLabel: {
                display: false,
                labelString: 'Month'
              }
            }],
            yAxes: [{
              display: false,
              gridLines: false,
              scaleLabel: {
                display: false,
                labelString: 'Month'
              }
            }]
          },
          elements: {
            line: {
              tension: 0.5
            },
            point: {
              radius: 2,
              borderWidth: 4
            }
          },
          layout: {
            padding: {
              left: 6,
              right: 0,
              top: 4,
              bottom: 0
            }
          }
        }
      };
      var chart = new Chart(src, config);
    },
    initMediumChart: function initMediumChart(src, data, max, color, border) {
      if (!document.getElementById(src)) {
        return;
      }

      var border = border ? border : 2; // Main chart

      var ctx = document.getElementById(src).getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, 100);
      gradient.addColorStop(0, Chart.helpers.color(color).alpha(0.3).rgbString());
      gradient.addColorStop(1, Chart.helpers.color(color).alpha(0).rgbString());
      var mainConfig = {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
          datasets: [{
            label: 'Orders',
            borderColor: color,
            borderWidth: border,
            backgroundColor: gradient,
            pointBackgroundColor: KApp.getStateColor('brand'),
            data: data
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: false,
            text: 'Stacked Area'
          },
          tooltips: {
            enabled: true,
            intersect: false,
            mode: 'nearest',
            bodySpacing: 5,
            yPadding: 10,
            xPadding: 10,
            caretPadding: 0,
            displayColors: false,
            backgroundColor: KApp.getStateColor('brand'),
            titleFontColor: '#ffffff',
            cornerRadius: 4,
            footerSpacing: 0,
            titleSpacing: 0
          },
          legend: {
            display: false,
            labels: {
              usePointStyle: false
            }
          },
          hover: {
            mode: 'index'
          },
          scales: {
            xAxes: [{
              display: false,
              scaleLabel: {
                display: false,
                labelString: 'Month'
              },
              ticks: {
                display: false,
                beginAtZero: true
              }
            }],
            yAxes: [{
              display: false,
              scaleLabel: {
                display: false,
                labelString: 'Value'
              },
              gridLines: {
                color: '#eef2f9',
                drawBorder: false,
                offsetGridLines: true,
                drawTicks: false
              },
              ticks: {
                max: max,
                display: false,
                beginAtZero: true
              }
            }]
          },
          elements: {
            point: {
              radius: 0,
              borderWidth: 0,
              hoverRadius: 0,
              hoverBorderWidth: 0
            }
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          }
        }
      };
      var chart = new Chart(ctx, mainConfig); // Update chart on window resize

      KUtil.addResizeHandler(function () {
        chart.update();
      });
    }
  };
}();

var KOffcanvasPanel = function () {
  var notificationPanel = KUtil.get('k_offcanvas_toolbar_notifications');
  var quickActionsPanel = KUtil.get('k_offcanvas_toolbar_quick_actions');
  var profilePanel = KUtil.get('k_offcanvas_toolbar_profile');
  var searchPanel = KUtil.get('k_offcanvas_toolbar_search');

  var initNotifications = function initNotifications() {
    var head = KUtil.find(notificationPanel, '.k-offcanvas-panel__head');
    var body = KUtil.find(notificationPanel, '.k-offcanvas-panel__body');
    var offcanvas = new KOffcanvas(notificationPanel, {
      overlay: true,
      baseClass: 'k-offcanvas-panel',
      closeBy: 'k_offcanvas_toolbar_notifications_close',
      toggleBy: 'k_offcanvas_toolbar_notifications_toggler_btn'
    });
    KUtil.scrollInit(body, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        var height = parseInt(KUtil.getViewPort().height);

        if (head) {
          height = height - parseInt(KUtil.actualHeight(head));
          height = height - parseInt(KUtil.css(head, 'marginBottom'));
        }

        height = height - parseInt(KUtil.css(notificationPanel, 'paddingTop'));
        height = height - parseInt(KUtil.css(notificationPanel, 'paddingBottom'));
        return height;
      }
    });
  };

  var initQucikActions = function initQucikActions() {
    var head = KUtil.find(quickActionsPanel, '.k-offcanvas-panel__head');
    var body = KUtil.find(quickActionsPanel, '.k-offcanvas-panel__body');
    var offcanvas = new KOffcanvas(quickActionsPanel, {
      overlay: true,
      baseClass: 'k-offcanvas-panel',
      closeBy: 'k_offcanvas_toolbar_quick_actions_close',
      toggleBy: 'k_offcanvas_toolbar_quick_actions_toggler_btn'
    });
    KUtil.scrollInit(body, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        var height = parseInt(KUtil.getViewPort().height);

        if (head) {
          height = height - parseInt(KUtil.actualHeight(head));
          height = height - parseInt(KUtil.css(head, 'marginBottom'));
        }

        height = height - parseInt(KUtil.css(quickActionsPanel, 'paddingTop'));
        height = height - parseInt(KUtil.css(quickActionsPanel, 'paddingBottom'));
        return height;
      }
    });
  };

  var initProfile = function initProfile() {
    var head = KUtil.find(profilePanel, '.k-offcanvas-panel__head');
    var body = KUtil.find(profilePanel, '.k-offcanvas-panel__body');
    var offcanvas = new KOffcanvas(profilePanel, {
      overlay: true,
      baseClass: 'k-offcanvas-panel',
      closeBy: 'k_offcanvas_toolbar_profile_close',
      toggleBy: 'k_offcanvas_toolbar_profile_toggler_btn'
    });
    KUtil.scrollInit(body, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        var height = parseInt(KUtil.getViewPort().height);

        if (head) {
          height = height - parseInt(KUtil.actualHeight(head));
          height = height - parseInt(KUtil.css(head, 'marginBottom'));
        }

        height = height - parseInt(KUtil.css(profilePanel, 'paddingTop'));
        height = height - parseInt(KUtil.css(profilePanel, 'paddingBottom'));
        return height;
      }
    });
  };

  var initSearch = function initSearch() {
    var head = KUtil.find(searchPanel, '.k-offcanvas-panel__head');
    var body = KUtil.find(searchPanel, '.k-offcanvas-panel__body');
    var search = KUtil.get('k_quick_search_offcanvas');
    var form = KUtil.find(search, '.k-quick-search__form');
    var wrapper = KUtil.find(search, '.k-quick-search__wrapper');
    var offcanvas = new KOffcanvas(searchPanel, {
      overlay: true,
      baseClass: 'k-offcanvas-panel',
      closeBy: 'k_offcanvas_toolbar_search_close',
      toggleBy: 'k_offcanvas_toolbar_search_toggler_btn'
    });
    KUtil.scrollInit(wrapper, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        var height = parseInt(KUtil.getViewPort().height);
        height = height - parseInt(KUtil.actualHeight(form));
        height = height - parseInt(KUtil.css(form, 'marginBottom'));

        if (head) {
          height = height - parseInt(KUtil.actualHeight(head));
          height = height - parseInt(KUtil.css(head, 'marginBottom'));
        }

        height = height - parseInt(KUtil.css(searchPanel, 'paddingTop'));
        height = height - parseInt(KUtil.css(searchPanel, 'paddingBottom'));
        return height;
      }
    });
  };

  return {
    init: function init() {
      initNotifications();
      initQucikActions();
      initProfile();
      initSearch();
    }
  };
}();

$(document).ready(function () {
  KOffcanvasPanel.init();
});

var KQuickPanel = function () {
  var panel = KUtil.get('k_quick_panel');
  var notificationPanel = KUtil.get('k_quick_panel_tab_notifications');
  var actionsPanel = KUtil.get('k_quick_panel_tab_actions');
  var settingsPanel = KUtil.get('k_quick_panel_tab_settings');

  var getContentHeight = function getContentHeight() {
    var height;
    var nav = KUtil.find(panel, '.k-offcanvas-panel__nav');
    var content = KUtil.find(panel, '.k-offcanvas-panel__body');
    height = parseInt(KUtil.getViewPort().height) - parseInt(KUtil.actualHeight(nav)) - parseInt(KUtil.css(nav, 'margin-bottom')) - 2 * parseInt(KUtil.css(nav, 'padding-top')) - 10;
    return height;
  };

  var initOffcanvas = function initOffcanvas() {
    var offcanvas = new KOffcanvas(panel, {
      overlay: true,
      baseClass: 'k-offcanvas-panel',
      closeBy: 'k_quick_panel_close_btn',
      toggleBy: 'k_quick_panel_toggler_btn'
    });
  };

  var initNotifications = function initNotifications() {
    KUtil.scrollInit(notificationPanel, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        return getContentHeight();
      }
    });
  };

  var initActions = function initActions() {
    KUtil.scrollInit(actionsPanel, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        return getContentHeight();
      }
    });
  };

  var initSettings = function initSettings() {
    KUtil.scrollInit(settingsPanel, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        return getContentHeight();
      }
    });
  };

  var updatePerfectScrollbars = function updatePerfectScrollbars() {
    $(panel).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      KUtil.scrollUpdate(notificationPanel);
      KUtil.scrollUpdate(actionsPanel);
      KUtil.scrollUpdate(settingsPanel);
    });
  };

  return {
    init: function init() {
      initOffcanvas();
      initNotifications();
      initActions();
      initSettings();
      updatePerfectScrollbars();
    }
  };
}();

$(document).ready(function () {
  KQuickPanel.init();
});
"use strict";

var KQuickSearch = function KQuickSearch() {
  var target;
  var form;
  var input;
  var closeIcon;
  var resultWrapper;
  var resultDropdown;
  var resultDropdownToggle;
  var inputGroup;
  var query = '';
  var hasResult = false;
  var timeout = false;
  var isProcessing = false;
  var requestTimeout = 200; // ajax request fire timeout in milliseconds

  var spinnerClass = 'k-spinner k-spinner--input k-spinner--sm k-spinner--brand k-spinner--right';
  var resultClass = 'k-quick-search--has-result';
  var minLength = 2;

  var showProgress = function showProgress() {
    isProcessing = true;
    KUtil.addClass(inputGroup, spinnerClass);

    if (closeIcon) {
      KUtil.hide(closeIcon);
    }
  };

  var hideProgress = function hideProgress() {
    isProcessing = false;
    KUtil.removeClass(inputGroup, spinnerClass);

    if (closeIcon) {
      if (input.value.length < minLength) {
        KUtil.hide(closeIcon);
      } else {
        KUtil.show(closeIcon, 'flex');
      }
    }
  };

  var showDropdown = function showDropdown() {
    if (resultDropdownToggle && !KUtil.hasClass(resultDropdown, 'show')) {
      $(resultDropdownToggle).dropdown('toggle');
      $(resultDropdownToggle).dropdown('update');
    }
  };

  var hideDropdown = function hideDropdown() {
    if (resultDropdownToggle && KUtil.hasClass(resultDropdown, 'show')) {
      $(resultDropdownToggle).dropdown('toggle');
    }
  };

  var processSearch = function processSearch() {
    if (hasResult && query === input.value) {
      hideProgress();
      KUtil.addClass(target, resultClass);
      showDropdown();
      KUtil.scrollUpdate(resultWrapper);
      return;
    }

    query = input.value;
    KUtil.removeClass(target, resultClass);
    showProgress();
    hideDropdown();
    setTimeout(function () {
      $.ajax({
        url: 'inc/api/quick_search.php',
        data: {
          query: query
        },
        dataType: 'html',
        success: function success(res) {
          hasResult = true;
          hideProgress();
          KUtil.addClass(target, resultClass);
          KUtil.setHTML(resultWrapper, res);
          showDropdown();
          KUtil.scrollUpdate(resultWrapper);
        },
        error: function error(res) {
          hasResult = false;
          hideProgress();
          KUtil.addClass(target, resultClass);
          KUtil.setHTML(resultWrapper, '<span class="k-quick-search__message">Connection error. Pleae try again later.</div>');
          showDropdown();
          KUtil.scrollUpdate(resultWrapper);
        }
      });
    }, 1000);
  };

  var handleCancel = function handleCancel(e) {
    input.value = '';
    query = '';
    hasResult = false;
    KUtil.hide(closeIcon);
    KUtil.removeClass(target, resultClass);
    hideDropdown();
  };

  var handleSearch = function handleSearch() {
    if (input.value.length < minLength) {
      hideProgress();
      hideDropdown();
      return;
    }

    if (isProcessing == true) {
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      processSearch();
    }, requestTimeout);
  };

  return {
    init: function init(element) {
      // Init
      target = element;
      form = KUtil.find(target, '.k-quick-search__form');
      input = KUtil.find(target, '.k-quick-search__input');
      closeIcon = KUtil.find(target, '.k-quick-search__close');
      resultWrapper = KUtil.find(target, '.k-quick-search__wrapper');
      resultDropdown = KUtil.find(target, '.dropdown-menu');
      resultDropdownToggle = KUtil.find(target, '[data-toggle="dropdown"]');
      inputGroup = KUtil.find(target, '.input-group'); // Attach input keyup handler

      KUtil.addEvent(input, 'keyup', handleSearch);
      KUtil.addEvent(input, 'focus', handleSearch); // Prevent enter click

      form.onkeypress = function (e) {
        var key = e.charCode || e.keyCode || 0;

        if (key == 13) {
          e.preventDefault();
        }
      };

      KUtil.addEvent(closeIcon, 'click', handleCancel);
    }
  };
};

var KQuickSearchMobile = KQuickSearch;
$(document).ready(function () {
  if (KUtil.get('k_quick_search_dropdown')) {
    KQuickSearch().init(KUtil.get('k_quick_search_dropdown'));
  }

  if (KUtil.get('k_quick_search_inline')) {
    KQuickSearchMobile().init(KUtil.get('k_quick_search_inline'));
  }

  if (KUtil.get('k_quick_search_offcanvas')) {
    KQuickSearchMobile().init(KUtil.get('k_quick_search_offcanvas'));
  }
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
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/app/scripts/bundle/app.bundle.js"], null)
//# sourceMappingURL=/app.bundle.2d786eb0.js.map