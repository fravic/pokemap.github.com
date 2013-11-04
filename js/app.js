// Generated by CoffeeScript 1.6.2
(function() {
  var App, Link, Place, Route, app, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Link = (function() {
    var BULBAPEDIA_BASE;

    BULBAPEDIA_BASE = "http://bulbapedia.bulbagarden.net/wiki/";

    function Link(g) {
      this.g = g;
      this.onClick = __bind(this.onClick, this);
      this.g.attr({
        cursor: "pointer"
      });
      this.g.mouseover(this.onMouseover);
      this.g.mouseout(this.onMouseout);
      this.g.click(this.onClick);
      this.renderHitArea();
    }

    Link.prototype.renderHitArea = function() {
      var e, ha, _i, _len, _ref, _results;

      ha = this.g.selectAll("#hitarea");
      _ref = ha.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        _results.push(e.attr({
          cursor: "pointer"
        }));
      }
      return _results;
    };

    Link.prototype.url = function() {
      return this.g.node.id;
    };

    Link.prototype.onClick = function() {
      return window.open(BULBAPEDIA_BASE + this.url(), '_blank');
    };

    return Link;

  })();

  Place = (function(_super) {
    __extends(Place, _super);

    function Place() {
      this.onMouseout = __bind(this.onMouseout, this);
      this.onMouseover = __bind(this.onMouseover, this);      _ref = Place.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Place.prototype.url = function() {
      var name;

      name = this.g.node.id;
      if (name.indexOf("City") === 0) {
        return name.slice("City_".length) + "_City";
      } else if (name.indexOf("Town") === 0) {
        return name.slice("Town_".length) + "_Town";
      } else if (name.indexOf("Place") === 0) {
        return name.slice("Place_".length);
      }
    };

    Place.prototype.onMouseover = function() {
      var circle, line, t, _i, _j, _len, _len1, _ref1, _ref2, _results;

      _ref1 = this.g.selectAll("line");
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        line = _ref1[_i];
        line.animate({
          stroke: "#2d9fee"
        }, 100);
      }
      if (circle = this.g.select("circle")) {
        circle.animate({
          stroke: "#2d9fee"
        }, 100);
      }
      this.g.select("text").animate({
        fill: "#2d9fee"
      }, 100);
      _ref2 = this.g.selectAll("tspan");
      _results = [];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        t = _ref2[_j];
        _results.push(t.animate({
          fill: "#2d9fee"
        }, 100));
      }
      return _results;
    };

    Place.prototype.onMouseout = function() {
      var circle, line, t, _i, _j, _len, _len1, _ref1, _ref2, _results;

      _ref1 = this.g.selectAll("line");
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        line = _ref1[_i];
        line.animate({
          stroke: "#444444"
        }, 100);
      }
      if (circle = this.g.select("circle")) {
        circle.animate({
          stroke: "#444444"
        }, 100);
      }
      this.g.select("text").animate({
        fill: "#444444"
      }, 100);
      _ref2 = this.g.selectAll("tspan");
      _results = [];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        t = _ref2[_j];
        _results.push(t.animate({
          fill: "#444444"
        }, 100));
      }
      return _results;
    };

    return Place;

  })(Link);

  Route = (function(_super) {
    __extends(Route, _super);

    function Route() {
      this.onMouseout = __bind(this.onMouseout, this);
      this.onMouseover = __bind(this.onMouseover, this);      _ref1 = Route.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Route.prototype.url = function() {
      return "Kalos_" + this.g.node.id;
    };

    Route.prototype.onMouseover = function() {
      this.g.select("line").animate({
        stroke: "#2d9fee"
      }, 100);
      return this.g.select("path").animate({
        fill: "#2d9fee"
      }, 100);
    };

    Route.prototype.onMouseout = function() {
      this.g.select("line").animate({
        stroke: "#444444"
      }, 100);
      return this.g.select("path").animate({
        fill: "#444444"
      }, 100);
    };

    return Route;

  })(Link);

  App = (function() {
    function App() {
      this.resizeMap = __bind(this.resizeMap, this);
      this.render = __bind(this.render, this);
      this.isPlace = __bind(this.isPlace, this);
      this.isRoute = __bind(this.isRoute, this);
    }

    App.prototype.isRoute = function(name) {
      return name.indexOf("Route") === 0;
    };

    App.prototype.isPlace = function(name) {
      return name.indexOf("City") === 0 || name.indexOf("Town") === 0 || name.indexOf("Place") === 0;
    };

    App.prototype.render = function() {
      var _this = this;

      mixpanel.track("view");
      this.snap = Snap("#map");
      Snap.load("img/map.svg", function(f) {
        var g, groups, _i, _len, _results;

        groups = f.selectAll("g");
        _this.snap.append(f);
        _results = [];
        for (_i = 0, _len = groups.length; _i < _len; _i++) {
          g = groups[_i];
          if (_this.isRoute(g.node.id)) {
            _results.push(new Route(g));
          } else if (_this.isPlace(g.node.id)) {
            _results.push(new Place(g));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
      this.resizeMap();
      return $(window).on("resize", this.resizeMap);
    };

    App.prototype.resizeMap = function() {
      var RATIO, w;

      RATIO = 625 / 1000;
      w = Math.max($("BODY").width(), 1000);
      $("#map").width(w);
      return $("#map").height(w * RATIO);
    };

    return App;

  })();

  app = new App();

  $(app.render);

}).call(this);
