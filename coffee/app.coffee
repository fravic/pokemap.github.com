class Link
  BULBAPEDIA_BASE = "http://bulbapedia.bulbagarden.net/wiki/"

  constructor: (@g) ->
    @g.attr {cursor: "pointer"}
    @g.mouseover @onMouseover
    @g.mouseout @onMouseout
    @g.click @onClick
    @renderHitArea()

  renderHitArea: () ->
    ha = @g.selectAll("#hitarea")
    for e in ha.items
      e.attr {cursor: "pointer"}

  url: () ->
    @g.node.id

  onClick: () =>
    window.open(BULBAPEDIA_BASE + @url(), '_blank')

class Place extends Link
  url: () ->
    name = @g.node.id
    if name.indexOf("City") is 0
      name.slice("City_".length) + "_City"
    else if name.indexOf("Town") is 0
      name.slice("Town_".length) + "_Town"
    else if name.indexOf("Place") is 0
      name.slice("Place_".length)

  onMouseover: =>
    @g.select("circle").animate({stroke: "#2d9fee"}, 100)

  onMouseout: =>
    @g.select("circle").animate({stroke: "#444444"}, 100)

class Route extends Link
  url: () ->
    "Kalos_" + @g.node.id

  onMouseover: =>
    @g.select("line").animate({stroke: "#2d9fee"}, 100)

  onMouseout: =>
    @g.select("line").animate({stroke: "#444444"}, 100)    

  onClick: =>
    @g.select("line").animate({stroke: "#ff00ff"}, 100)
    super

class App
  isRoute: (name) =>
    name.indexOf("Route") is 0

  isPlace: (name) =>
    name.indexOf("City") is 0 or
    name.indexOf("Town") is 0 or
    name.indexOf("Place") is 0

  render: =>
    @snap = Snap "#map"

    Snap.load "img/map.svg", (f) =>
      groups = f.selectAll("g")
      @snap.append f

      console.log groups
      for g in groups
        console.log g.node.id
        if @isRoute(g.node.id)
          new Route(g)
        else if @isPlace(g.node.id)
          new Place(g)

app = new App()
$ app.render