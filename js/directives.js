var accountChartdefinition = {
  restrict: 'EA',
  replace : true,
  scope   : {
    initial     : '=',
    tobucket    : '=',
    frombucket  : '=',
  },
  link    : function(scope, element, attrs) {

    var color = ['#65C752','#CECECE','#FF9F46'];
    var width = height = 200;

    var min   = Math.min(width, height);
    var svg   = d3.select(element[0]).append('svg');
    var pie   = d3.layout.pie().sort(null);
    var arc   = d3.svg.arc()
                  .outerRadius(min / 2 * 0.2)
                  .innerRadius(min / 2 * 0.9);

    pie.value(function(d){ return d.value; });
    svg.attr({width: width, height: height});

    var graph = svg
                .append('g')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var arcs  = graph.selectAll('path');

    scope.$watch('[tobucket, frombucket]', 
      function() {

        if( scope.initial-scope.tobucket >= 0 ){            
            values = [
              { value: scope.initial-scope.tobucket }, 
              { value: scope.tobucket },
              { value: scope.frombucket },
            ];

            arcs = arcs.data( pie(values) );
            arcs
              .enter()
              .append('path')
                  .style('stroke', 'white')
              .attr('fill', 
                  function(d, i){ return color[i] });
            arcs.exit().remove();
            arcs.attr('d', arc);
        }
      }, true);
  }
};

mainApp.directive('accountChart', function(){
  return accountChartdefinition;
});