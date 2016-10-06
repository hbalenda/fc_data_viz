$(document).ready(function() {
    var currentYear = new Date().getFullYear();
    var year;
    document.getElementById("year-button").onclick = function (){
        year = document.getElementById("year-input").value;
        $.ajax({
            url: "http://localhost:3000/api/predictions?year=" + year,
            headers: {
            'X-Auth-Token' : "xAqO541unK52OdXpnfSGWZUW/c3EZy+ANcMO3rJFepzrhy/p8j7zK6DcFC1J98i35zRsH8hPG2qzbMyDshSBmw==" 
            }
        }).then(function(data) {
            var trendData = [];
            console.log(data);
            data.forEach(function(trend){
                if(trend){
                    trendData.push(trend);
                }
            });
            
            var total = trendData.length;
            var interval = 255 / total;

            trendData.forEach(function(trend, index) {
                var arcLength = trend.endyear - trend.startyear;
                var trendColor = index * interval;
                var arcColor = "rgb(" + trendColor + "," + trendColor + "," + trendColor + ")";
                var point = currentYear - trend.endyear;
                var vis = d3.select("body").selectAll("#trend-container").append("svg");
                var pi = Math.PI;
                var arc = d3.svg.arc()
                    .innerRadius(2*arcLength)
                    .outerRadius(2*(arcLength + 10))
                    .startAngle(.5 * pi)
                    .endAngle(-.5 * pi) 
                vis.attr("width", "500").attr("height", "500").attr("viewbox", "0 0 500 500") 
                    .classed("trend-arc", true)
                    .append("path")
                    .attr("d", arc)
                    .attr("fill", arcColor)
                    .attr("transform", "translate(400,400)");

            })
        });
    }
});