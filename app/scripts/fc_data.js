$(document).ready(function() {
    var currentYear = new Date().getFullYear();
    $.ajax({
        url: "http://localhost:3000/api/predictions?year=1973",
        headers: {
        'X-Auth-Token' : "xAqO541unK52OdXpnfSGWZUW/c3EZy+ANcMO3rJFepzrhy/p8j7zK6DcFC1J98i35zRsH8hPG2qzbMyDshSBmw==" 
        }
    }).then(function(data) {
        for(var i = 0; i < data.length; i++){
            console.log(data[i]);
        }
    });
});