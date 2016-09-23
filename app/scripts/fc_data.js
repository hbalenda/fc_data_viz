$(document).ready(function() {
    var currentYear = new Date().getFullYear();
    var year = 1973;
    $.ajax({
        url: "http://localhost:3000/api/predictions?year=" + year,
        headers: {
        'X-Auth-Token' : "xAqO541unK52OdXpnfSGWZUW/c3EZy+ANcMO3rJFepzrhy/p8j7zK6DcFC1J98i35zRsH8hPG2qzbMyDshSBmw==" 
        }
    }).then(function(data) {
        for(var i = 0; i < data.length; i++){
            if(data[i]){
                var arcLength = data[i].endyear - data[i].startyear;
                var point = currentYear - data[i].endyear;
                var vis = d3.select("body").append("svg");
                var pi = Math.PI;
                var arc = d3.svg.arc()
                    .innerRadius(arcLength)
                    .outerRadius(arcLength + 10)
                    .startAngle(.5 * pi) //radians
                    .endAngle(-.5 * pi) 
                vis.attr("width", "400").attr("height", "400") // Added height and width so arc is visible
                    .append("path")
                    .attr("d", arc)
                    .attr("fill", "white")
                    .attr("transform", "translate(200,200)");
            }
        }
    });

});