App.directive("linechart",function (){
  return {
    restrict: "E", 
    link: function (scope, element, attrs){
      var svg = d3.select("#"+element[0].id).append("svg") 
        .attr("width", scope.width + scope.margin.left + scope.margin.right)
        .attr("height", scope.height + scope.margin.top + scope.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + scope.margin.left + "," + scope.margin.top + ")");

      svg.append("defs").append("clipPath")
          .attr("id", "clip")
          .append("rect")
          .attr("width", scope.width)
          .attr("height", scope.height);

      var path = svg.append("g")
          .attr("clip-path", "url(#clip)")
          .append("path")
          .data([scope.chartdata])
          .attr("class", "line")
          .attr("d", scope.line);

      scope.$on("data-update", function (event, value){
        scope.chartdata.push(value);  
        path.attr("d", scope.line)
          .attr("transform", null)
          .transition()
          .duration(100)
          .ease("linear")
          .attr("transform", "translate(" + scope.x(-1) + ")")
        // clear the off-screen values since we do not need to display them
        scope.chartdata.shift()

      });
    }
  }
}) // end directive

App.directive("stat", function () {
  return {
    restrict: "A",
    template: '{{value}}',
    scope: {
      value : "="
    },
    link: function (scope, element, attrs){
      scope.$watch("value", function(newval){
        if (newval){
          newval = parseFloat(newval)
          if (newval > attrs.highlight){
            element.addClass(attrs.highlightClass);
          } else {
            element.removeClass(attrs.highlightClass);
          }
        }
      }); // end $watch
    }
  }
}); // end directive

App.directive("hbar", function (){
  return {
    restrict: "E",
    template: '<div class="hbar"></div>',
    scope: {
      value: "="
    },
    replace: true,
    link: function (scope, element, attrs){
      scope.$watch("value", function(newval){
        if (newval){
          newval =  parseFloat(newval)
          width = newval * 10  + 10
          if (width > attrs.maxWidth){
            width = attrs.maxWidth;
          }
          $(element).attr("width", width);
          if (newval > parseFloat(attrs.highlight)){
            $(element).addClass(attrs.highlightClass);
          } else {
            $(element).removeClass(attrs.highlightClass);
          }
        }
      }); // end scope
    } // end link
  }
}); // end directive
