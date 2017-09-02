// Parallel Sets by Jason Davies, http://www.jasondavies.com/
// Functionality based on http://eagereyes.org/parallel-sets
//Edited by Adi Perlov and Reut Mizrachi
(function() {

//array that holds all tests names
var testsNames = [
"fear of unknown places",
"Sensitivity to noise",
"Fear of unfamiliar objects",
"Fear of change in walking surface",
"Fear of dogs",
"Fear of stairs",
"Fear of traffic",
"Separation anxiety",
"Emotional attachment to the owner",
"Anxiety from strangers",
"Fear of being handled",
"Retreating when approched",
"Sensitivity to leash",
"Fan avoidance",
"Physical sensitivity to contact with objects",
"Fear of traveling by car",
"Avoidance and delay due to stress",
"Excessive activity due to stress",
"Overly excited",
"Poor self-regulation",
"Discomfort when the coach is inactive",
"Fear of hights",
"Barks incessantly",
"High energy level",
"Inability to concentration",
"Excitement from movement",
"Chasing animals",
"destraction by other dogs",
"Sniffing",
"Snooping",
"Misbehavior at home",
"Lack of initiative",
"Lack of desire to please",
"Aggressive aggression towards people",
"Aggression towards strangers",
"Property aggression towards dogs",
"Disinfection in the route",
"Inappropriate social behavior towards people",
"instability",
"Quality of work in a couple",
"The dog's abilities",
"Comparative rating",
"Inappropriate social behavior with dogs",
"Response to thunder",
"Difficulty adjusting to the kennel",
"Escape from car exhaust pipe",
"Desire to work",
"Disinfection a home",
"Limping"
];

  //Golbal arrays and variable
  var tests = [];
  var testsArray;
  var isTestChart = Boolean(0);
  var currentHighlite = 0;
  d3.parsets = function() {

    //This function create the failed test visualization when the user click on parants path
    function createVis2(d) {
    isTestChart = Boolean(1);
    //Sets the dimantions
    var chart2 = d3.parsets()
        .dimensions(["Status","Test"]);
        chart2.width(1250);
        chart2.height(500);

    //Sets the width and height of the chart
    var vis2 = d3.select("#vis2").append("svg")
        .attr("width", 1250)
        .attr("height", chart2.height());
    chart2.spacing(20);
    var partition2 = d3.layout.partition()
        .sort(null)
        .size([chart.width() + 500, chart.height() * 5 / 4])
        .children(function(d) { return d.children ? d3.values(d.children) : null; })
        .value(function(d) { return d.count; });

      var testToShow = [];
      var statusTest = [];
      var indexStatusTest = 0;
      //reorganize tests array
      //checks which dimantion we are dealing
      if (d.dimension == "Mother"){
          var mother = d.name;
          var father = d.parent.name;
          //add more info for current visualization
          document.getElementById('vis2Names').innerHTML = "The failed tests of <b>" +  mother + "</b> and <b>" + father + "</b>" + " offsprings.";

          //search for only unsuitable dogs from the DB
          var index = 0;
          for (var i = 0  ; i< testsArray.length ; i++) {
              if (testsArray[i].Father_name == father && testsArray[i].Mother_name == mother 
                  && testsArray[i].main_status == "unsuitable")
              {
                testToShow[index] = testsArray[i];
                index++;
              }
          }

      }

      //Change the titles for the second view
      document.getElementById('vi2InfoTitle').innerHTML = "Information:";
      if (index == 1)
      {
        document.getElementById('vis2data').innerHTML = "The following data refer to <b> one </b> dog."
      }
      else
      {
        document.getElementById('vis2data').innerHTML = "The following data refer to <b>" + index + "</b> different dogs."
      }
      
      //add go back button
      document.getElementById('goback').innerHTML = "<button type='button' class='button' onclick='goBack()'>Go Back</button>"

      //Create the dictionary for the relevent tests
     var testLenght = testToShow.length;
     var numDictianary = 1;

    //go over all offsprings and sets the status
     for (var i = 0  ; i< testLenght ; i++) {
          
          var tmpStatus;
          if(testToShow[i].substatus == "" || testToShow[i].substatus == "died" || testToShow[i].substatus == "family")
          {
            tmpStatus = "unsuitable";
            testToShow[i].Status = "unsuitable";
          }
          else if(testToShow[i].substatus == "special_needs")
          {
            tmpStatus = "specialneeds";
            testToShow[i].Status = "specialneeds";
          }

          var isTestExist = Boolean(0);

          //go over all test and take only the failed
          for (var j=1 ; j<= 51 ; j++)
          {
            var tmpReason = "reason" + j;
            if(testToShow[i][tmpReason] == "1")
            {
              isTestExist = Boolean(1);
              statusTest[indexStatusTest] = [];
              statusTest[indexStatusTest].Status = testToShow[i].Status;
              statusTest[indexStatusTest].Test = "Test " + j;
              indexStatusTest++;

              if(document.getElementById('Test' + j) == null)
              {
                  var dictionary = document.getElementById('triple').innerHTML += "<li id='Test" + j + "'>" + "<b>" + j + ". " +testsNames[j-1] + "</b>" + "</li>";
              }

            }
          }

          if (!isTestExist){
              statusTest[indexStatusTest] = [];
              statusTest[indexStatusTest].Status = testToShow[i].Status;
              statusTest[indexStatusTest].Test = "Other"
              indexStatusTest++;
          }
     }

      vis2.datum(statusTest).call(chart2);

      //show and hide elemnts for dynamic view
      var x = document.getElementById('vis');
      var y = document.getElementById('vis2');
      var z = document.getElementById('predict');
      document.getElementById('goback').style.display = "block";
      document.getElementById('dictionary').style.display = "block";
      document.getElementById('instactionid').style.display = "none";
      document.getElementById('vis2Names').style.display = "block";
      document.getElementById('vi2InfoTitle').style.display = "block";
      document.getElementById('vis2data').style.display = "block";
       document.getElementById('title-vis1').innerHTML = "";
       document.getElementById('subtitle-vis1').innerHTML = "";
       document.getElementById('title-vis1').innerHTML = "The offsprings failed tests depending on their parents";
       document.getElementById('subtitle-vis1').innerHTML = "Visualization of the linkage between offsprings failed tests and specific parents.";
      x.style.display = 'none';
      y.style.display = 'block';
      z.style.display = 'none';
      hideTooltip();

      //scroll to top page
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    var event = d3.dispatch("sortDimensions", "sortCategories"),
        dimensions_ = autoDimensions,
        dimensionFormat = String,
        tooltip_ = defaultTooltip,
        categoryTooltip = defaultCategoryTooltip,
        value_,
        spacing = 20,
        width,
        height,
        tension = 1,
        tension0,
        duration = 500;

    function parsets(selection) {

    d3.csv("tests.csv", function(error, csv) {
      testsArray = csv;
    });

      selection.each(function(data, i) {
        var g = d3.select(this),
            ordinal = d3.scale.ordinal(),
            dragging = false,
            dimensionNames = dimensions_.call(this, data, i),
            dimensions = [],
            tree = {children: {}, count: 0},
            nodes,
            total,
            ribbon;

        d3.select(window).on("mousemove.parsets." + ++parsetsId, unhighlight);

        if (tension0 == null) tension0 = tension;
        g.selectAll(".ribbon, .ribbon-mouse")
            .data(["ribbon", "ribbon-mouse"], String)
          .enter().append("g")
            .attr("class", String);
        updateDimensions();
        if (tension != tension0) {
          var t = d3.transition(g);
          if (t.tween) t.tween("ribbon", tensionTween);
          else tensionTween()(1);
        }

        function tensionTween() {
          var i = d3.interpolateNumber(tension0, tension);
          return function(t) {
            tension0 = i(t);
            ribbon.attr("d", ribbonPath);
          };
        }

        function updateDimensions() {
          // Cache existing bound dimensions to preserve sort order.
          var dimension = g.selectAll("g.dimension"),
              cache = {};
          dimension.each(function(d) { cache[d.name] = d; });
          dimensionNames.forEach(function(d) {
            if (!cache.hasOwnProperty(d)) {
              cache[d] = {name: d, categories: []};
            }
            dimensions.push(cache[d]);
          });
          dimensions.sort(compareY);
          // Populate tree with existing nodes.
          g.select(".ribbon").selectAll("path")
              .each(function(d) {
                var path = d.path.split("\0"),
                    node = tree,
                    n = path.length - 1;
                for (var i = 0; i < n; i++) {
                  var p = path[i];
                  node = node.children.hasOwnProperty(p) ? node.children[p]
                      : node.children[p] = {children: {}, count: 0};
                }
                node.children[d.name] = d;
              });
          tree = buildTree(tree, data, dimensions.map(dimensionName), value_);
          cache = dimensions.map(function(d) {
            var t = {};
            d.categories.forEach(function(c) {
              t[c.name] = c;
            });
            return t;
          });
          (function categories(d, i) {
            if (!d.children) return;
            var dim = dimensions[i],
                t = cache[i];
            for (var k in d.children) {
              if (!t.hasOwnProperty(k)) {
                dim.categories.push(t[k] = {name: k});
              }
              categories(d.children[k], i + 1);
            }
          })(tree, 0);
          ordinal.domain([]).range(d3.range(dimensions[0].categories.length));
          nodes = layout(tree, dimensions, ordinal);
          total = getTotal(dimensions);
          dimensions.forEach(function(d) {
            d.count = total;
          });
          dimension = dimension.data(dimensions, dimensionName);

          var dEnter = dimension.enter().append("g")
              .attr("class", "dimension")
              .attr("transform", function(d) { return "translate(0," + d.y + ")"; })
              .on("mousedown.parsets", cancelEvent);
          dimension.each(function(d) {
                d.y0 = d.y;
                d.categories.forEach(function(d) { d.x0 = d.x; });
              });
          dEnter.append("rect")
              .attr("width", width)
              .attr("y", -45)
              .attr("height", 45);
          var textEnter = dEnter.append("text")
              .attr("class", "dimension")
              .attr("transform", "translate(0,-25)")
              .attr("dy", "5");
          textEnter.append("tspan")
              .attr("class", "name")
              .attr("dy", function(d){
                    if(d.name == "Mother" || d.name == "Test"){
                       return "-30";
                    }
              })
              .text(dimensionFormatName);
          textEnter.append("tspan")
              .attr("class", "sort alpha")
              .attr("dx", "2em")
              .text("alpha »")
              .on("mousedown.parsets", cancelEvent);
          textEnter.append("tspan")
              .attr("class", "sort size")
              .attr("dx", "2em")
              .text("size »")
              .on("mousedown.parsets", cancelEvent);

          dimension.select("text").select("tspan.sort.alpha")
              .on("click.parsets", sortBy("alpha", function(a, b) { return a.name < b.name ? 1 : -1; }, dimension));
          dimension.select("text").select("tspan.sort.size")
              .on("click.parsets", sortBy("size", function(a, b) { return a.count - b.count; }, dimension));
          dimension.transition().duration(duration)
              .attr("transform", function(d) { return "translate(0," + d.y + ")"; })
              .tween("ribbon", ribbonTweenY);
          dimension.exit().remove();

          updateCategories(dimension);
          updateRibbons();
        }

        function sortBy(type, f, dimension) {
          return function(d) {
            var direction = this.__direction = -(this.__direction || 1);
            d3.select(this).text(direction > 0 ? type + " »" : "« " + type);
            d.categories.sort(function() { return direction * f.apply(this, arguments); });
            nodes = layout(tree, dimensions, ordinal);
            updateCategories(dimension);
            updateRibbons();
            event.sortCategories();
          };
        }

        function updateRibbons() {
          ribbon = g.select(".ribbon").selectAll("path")
              .data(nodes, function(d) { return d.path; });
          ribbon.enter().append("path")
              .each(function(d) {
                d.source.x0 = d.source.x;
                d.target.x0 = d.target.x;
              })
              .attr("class", function(d) { return "category-" + d.major; })
              .attr("d", ribbonPath);
          ribbon.sort(function(a, b) { return b.count - a.count; });
          ribbon.exit().remove();
          var mouse = g.select(".ribbon-mouse").selectAll("path")
              .data(nodes, function(d) { return d.path; });

          mouse.enter().append("path")
              .on("mousemove.parsets", function(d) {
                  ribbon.classed("active", false);
                  if (dragging) return;
                  highlight(d = d.node, true);
                  showTooltip(tooltip_.call(this, d));
                  d3.event.stopPropagation();
               
              }).on("click.parsets" , function(d) {
                    if (d.dimension == "Mother")
                    {
                      if(d.parent.parent.name == "unsuitable" || d.parent.parent.name == "specialneeds")
                      {
                        createVis2(d);
                      }
                   }
              });
          mouse
              .sort(function(a, b) { return b.count - a.count; })
              .attr("d", ribbonPathStatic);
          mouse.exit().remove();
        }

        // Animates the x-coordinates only of the relevant ribbon paths.
        function ribbonTweenX(d) {
          var nodes = [d],
              r = ribbon.filter(function(r) {
                var s, t;
                if (r.source.node === d) nodes.push(s = r.source);
                if (r.target.node === d) nodes.push(t = r.target);
                return s || t;
              }),
              i = nodes.map(function(d) { return d3.interpolateNumber(d.x0, d.x); }),
              n = nodes.length;
          return function(t) {
            for (var j = 0; j < n; j++) nodes[j].x0 = i[j](t);
            r.attr("d", ribbonPath);
          };
        }

        // Animates the y-coordinates only of the relevant ribbon paths.
        function ribbonTweenY(d) {
          var r = ribbon.filter(function(r) { return r.source.dimension.name == d.name || r.target.dimension.name == d.name; }),
              i = d3.interpolateNumber(d.y0, d.y);
          return function(t) {
            d.y0 = i(t);
            r.attr("d", ribbonPath);
          };
        }

        // Highlight a node and its descendants, and optionally its ancestors.
        function highlight(d, ancestors) {


          if (d.dimension == "Mother")
          {
              var myPath = document.getElementsByTagName("path"); // get all p elements

              if(d.parent.parent.name == "unsuitable" || d.parent.parent.name == "specialneeds")
              {
                  // this loops through them until it finds one with the class 'icontitle' then it assigns the style to it
                  var i = 0;
                  while(i < myPath.length) {
                        myPath[i].style.cursor = "pointer";
                        i++;
                  }
              }
              else
              {
                  var i = 0;
                  while(i < myPath.length) {
                        myPath[i].style.cursor = "default";
                        i++;
                  }
              }
          }

          if (dragging) return;
          var highlight = [];
          (function recurse(d) {
            highlight.push(d);
            for (var k in d.children) recurse(d.children[k]);
          })(d);
          highlight.shift();
          if (ancestors) while (d) highlight.push(d), d = d.parent;
          ribbon.filter(function(d) {
            var active = highlight.indexOf(d.node) >= 0;
            if (active) this.parentNode.appendChild(this);
            return active;
          }).classed("active", true);
        }

        // Unhighlight all nodes.
        function unhighlight() {
          if (dragging) return;
          ribbon.classed("active", false);
          var myPath = document.getElementsByTagName("path"); // get all p elements
          hideTooltip();
          if (currentHighlite != 0 && currentHighlite != "Other")
          {
            document.getElementById(currentHighlite).style.backgroundColor = "";
            currentHighlite = 0;
          }

          //should be in function
          // this loops through them until it finds one with the class 'icontitle' then it assigns the style to it
          var i = 0;
          while(i < myPath.length) {
                myPath[i].style.cursor = "default";
                i++;
          }
        }

        function updateCategories(g) {
          var category = g.selectAll("g.category")
              .data(function(d) { return d.categories; }, function(d) { return d.name; });
          var categoryEnter = category.enter().append("g")
              .attr("class", "category")
              .attr("transform", function(d) { return "translate(" + d.x + ")"; });
          category.exit().remove();
          category
              .on("mousemove.parsets", function(d) {
                ribbon.classed("active", false);
                if (dragging) return;
                d.nodes.forEach(function(d) { highlight(d); });
                showTooltip(categoryTooltip.call(this, d));
                if(d.dimension.name == "Test")
                {
                  currentHighlite = d.name.replace(" ", "");
                  if(currentHighlite != 0 && currentHighlite != "Other")
                  {
                     document.getElementById(currentHighlite).style.backgroundColor = "#fff659";
                  }
                  
                }
                d3.event.stopPropagation();
              })
              .on("mouseout.parsets", unhighlight);
              
          category.transition().duration(duration)
              .attr("transform", function(d) { return "translate(" + d.x + ")"; })
              .tween("ribbon", ribbonTweenX);

          categoryEnter.append("rect")
              .attr("width", function(d) { return d.dx; })
              .attr("y", -20)
              .attr("height", 20);
          categoryEnter.append("line")
              .style("stroke-width", 2);
          categoryEnter.append("text").
          attr("transform", function(d){
            if(d.dimension.name == "Mother" || d.dimension.name == "Test"){

                var x =  d.dx / 2;
                if (x < 10)
                {
                  x = 12;
                }
                return "translate (" + x + " -4) rotate (-70 0 0)";
              }
          }).attr("dy", "-4");
          category.select("rect")
              .attr("width", function(d) { return d.dx; })
              .attr("class", function(d) {
                return "category-" + (d.dimension === dimensions[0] ? ordinal(d.name) : "background");
              });
          category.select("line")
              .attr("x2", function(d) { return d.dx; });
          category.select("text")
              .text(function(d) { return d.name; }, function(d) { return d.dx; });
        }
      });
    }

    parsets.dimensionFormat = function(_) {
      if (!arguments.length) return dimensionFormat;
      dimensionFormat = _;
      return parsets;
    };

    parsets.dimensions = function(_) {
      if (!arguments.length) return dimensions_;
      dimensions_ = d3.functor(_);
      return parsets;
    };

    parsets.value = function(_) {
      if (!arguments.length) return value_;
      value_ = d3.functor(_);
      return parsets;
    };

    parsets.width = function(_) {
      if (!arguments.length) return width;
      width = +_;
      return parsets;
    };

    parsets.height = function(_) {
      if (!arguments.length) return height;
      height = +_;
      return parsets;
    };

    parsets.spacing = function(_) {
      if (!arguments.length) return spacing;
      spacing = +_;
      return parsets;
    };

    parsets.tension = function(_) {
      if (!arguments.length) return tension;
      tension = +_;
      return parsets;
    };

    parsets.duration = function(_) {
      if (!arguments.length) return duration;
      duration = +_;
      return parsets;
    };

    parsets.tooltip = function(_) {
      if (!arguments.length) return tooltip;
      tooltip = _ == null ? defaultTooltip : _;
      return parsets;
    };

    parsets.categoryTooltip = function(_) {
      if (!arguments.length) return categoryTooltip;
      categoryTooltip = _ == null ? defaultCategoryTooltip : _;
      return parsets;
    };

    var body = d3.select("body");
    var tooltip = body.append("div")
        .style("display", "none")
        .attr("class", "parsets tooltip");

    return d3.rebind(parsets, event, "on").value(1).width(960).height(600);

    function dimensionFormatName(d, i) {
      return dimensionFormat.call(this, d.name, i);
    }

    function showTooltip(html) {
      var m = d3.mouse(body.node());
      tooltip
          .style("display", null)
          .style("left", m[0] + 30 + "px")
          .style("top", m[1] - 20 + "px")
          .html(html);
    }

    function hideTooltip() {
      tooltip.style("display", "none");
    }

    function transition(g) {
      return duration ? g.transition().duration(duration).ease(parsetsEase) : g;
    }

    function layout(tree, dimensions, ordinal) {
      var nodes = [],
          nd = dimensions.length,
          y0 = 45,
          dy = (height - y0 - 2) / (nd - 1);
      dimensions.forEach(function(d, i) {
        d.categories.forEach(function(c) {
          c.dimension = d;
          c.count = 0;
          c.nodes = [];
        });
        d.y = y0 + i * dy;
      });

      // Compute per-category counts.
      var total = (function rollup(d, i) {
        if (!d.children) return d.count;
        var dim = dimensions[i],
            total = 0;
        dim.categories.forEach(function(c) {
          var child = d.children[c.name];
          if (!child) return;
          c.nodes.push(child);
          var count = rollup(child, i + 1);
          c.count += count;
          total += count;
        });
        return total;
      })(tree, 0);

      // Stack the counts.
      dimensions.forEach(function(d) {
        d.categories = d.categories.filter(function(d) { return d.count; });
        var x = 0,
            p = spacing / (d.categories.length - 1);
        d.categories.forEach(function(c) {
          c.x = x;
          c.dx = c.count / total * (width - spacing);
          c.in = {dx: 0};
          c.out = {dx: 0};
          x += c.dx + p;
        });
      });

      var dim = dimensions[0];
      dim.categories.forEach(function(c) {
        var k = c.name;
        if (tree.children.hasOwnProperty(k)) {
          recurse(c, {node: tree.children[k], path: k}, 1,  ordinal(k));
        }
      });

      function recurse(p, d, depth, major) {
        var node = d.node,
            dimension = dimensions[depth];
        dimension.categories.forEach(function(c) {
          var k = c.name;
          if (!node.children.hasOwnProperty(k)) return;
          var child = node.children[k];
          child.path = d.path + "\0" + k;
          var target = child.target || {node: c, dimension: dimension};
          target.x = c.in.dx;
          target.dx = child.count / total * (width - spacing);
          c.in.dx += target.dx;
          var source = child.source || {node: p, dimension: dimensions[depth - 1]};
          source.x = p.out.dx;
          source.dx = target.dx;
          p.out.dx += source.dx;

          child.node = child;
          child.source = source;
          child.target = target;
          child.major = major;
          if(isTestChart)
          {
            if (d.path == "unsuitable")
            {
               child.major = 2;
            }
            else if (d.path == "specialneeds")
            {
               child.major = 1;
            }
          }

          nodes.push(child);
          if (depth + 1 < dimensions.length) recurse(c, child, depth + 1, major);
        });
      }
      return nodes;
    }

    // Dynamic path string for transitions.
    function ribbonPath(d) {
      var s = d.source,
          t = d.target;
      return ribbonPathString(s.node.x0 + s.x0, s.dimension.y0, s.dx, t.node.x0 + t.x0, t.dimension.y0, t.dx, tension0);
    }

    // Static path string for mouse handlers.
    function ribbonPathStatic(d) {
      var s = d.source,
          t = d.target;
      return ribbonPathString(s.node.x + s.x, s.dimension.y, s.dx, t.node.x + t.x, t.dimension.y, t.dx, tension);
    }

    function ribbonPathString(sx, sy, sdx, tx, ty, tdx, tension) {
      var m0, m1;
      return (tension === 1 ? [
          "M", [sx, sy],
          "L", [tx, ty],
          "h", tdx,
          "L", [sx + sdx, sy],
          "Z"]
       : ["M", [sx, sy],
          "C", [sx, m0 = tension * sy + (1 - tension) * ty], " ",
               [tx, m1 = tension * ty + (1 - tension) * sy], " ", [tx, ty],
          "h", tdx,
          "C", [tx + tdx, m1], " ", [sx + sdx, m0], " ", [sx + sdx, sy],
          "Z"]).join("");
    }

    function compareY(a, b) {
      a = height * a.y, b = height * b.y;
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : a <= a ? -1 : b <= b ? 1 : NaN;
    }
  };
  d3.parsets.tree = buildTree;

  function autoDimensions(d) {
    return d.length ? d3.keys(d[0]).sort() : [];
  }

  function cancelEvent() {
    d3.event.stopPropagation();
    d3.event.preventDefault();
  }

  function dimensionName(d) { return d.name; }

  function getTotal(dimensions) {
    return dimensions[0].categories.reduce(function(a, d) {
      return a + d.count;
    }, 0);
  }

  // Given a text function and width function, truncates the text if necessary to
  // fit within the given width.
  function truncateText(text, width) {
    return function(d, i) {
      var t = this.textContent = text(d, i),
          w = width(d, i);
      if (this.getComputedTextLength() < w) return t;
      this.textContent = "…" + t;
      var lo = 0,
          hi = t.length + 1,
          x;
      while (lo < hi) {
        var mid = lo + hi >> 1;
        if ((x = this.getSubStringLength(0, mid)) < w) lo = mid + 1;
        else hi = mid;
      }
      return lo > 1 ? t.substr(0, lo - 2) + "…" : "";
    };
  }

  var percent = d3.format("%"),
      comma = d3.format(",f"),
      parsetsEase = "elastic",
      parsetsId = 0;

  // Construct tree of all category counts for a given ordered list of
  // dimensions.  Similar to d3.nest, except we also set the parent.
  function buildTree(root, data, dimensions, value) {
    zeroCounts(root);
    var n = data.length,
        nd = dimensions.length;
    for (var i = 0; i < n; i++) {
      var d = data[i],
          v = value(d, i),
          node = root;
      for (var j = 0; j < nd; j++) {
        var dimension = dimensions[j],
            category = d[dimension],
            children = node.children;
        node.count += v;
        node = children.hasOwnProperty(category) ? children[category]
            : children[category] = {
              children: j === nd - 1 ? null : {},
              count: 0,
              parent: node,
              dimension: dimension,
              name: category
            };
      }
      node.count += v;
    }
    return root;
  }

  function zeroCounts(d) {
    d.count = 0;
    if (d.children) {
      for (var k in d.children) zeroCounts(d.children[k]);
    }
  }

  function identity(d) { return d; }

  function translateY(d) { return "translate(0," + d.y + ")"; }

  function defaultTooltip(d) {
    var count = d.count,
        path = [];
    while (d.parent) {
      if (d.name) path.unshift(d.name);
      d = d.parent;
    }
    return path.join(" → ") + "<br>" + comma(count) + " (" + percent(count / d.count) + ")";
  }

  function defaultCategoryTooltip(d) {
    return d.name + "<br>" + comma(d.count) + " (" + percent(d.count / d.dimension.count) + ")";
  }
})();
