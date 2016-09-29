$(document).ready(function() {
    document.getElementById("submit-button").onclick = function (){
        var trendName = document.getElementById('trend').value;
        
        $('.instance-container').each(function(i, obj){
            var name = obj.getElementsByTagName('input')[0].value;
            var startYear = obj.getElementsByTagName('input')[1].value;
            var endYear = obj.getElementsByTagName('input')[2].value;
        });
        var trendId;
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/trends",
            headers: {'X-Auth-Token' : "xAqO541unK52OdXpnfSGWZUW/c3EZy+ANcMO3rJFepzrhy/p8j7zK6DcFC1J98i35zRsH8hPG2qzbMyDshSBmw==" },
            data: JSON.stringify({trend: { name: trendName, user_id: "1" }}),
            contentType: "application/json; charset=UTF-8",
            success: function(response){
                trendId = response.id;
            }
        });
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/trends/" + trendId + "/occurrences",
            headers: {'X-Auth-Token' : "xAqO541unK52OdXpnfSGWZUW/c3EZy+ANcMO3rJFepzrhy/p8j7zK6DcFC1J98i35zRsH8hPG2qzbMyDshSBmw==" },
            data: JSON.stringify({occurrence: { name: name, startYear: startYear, endYear: endYear, trend_id: trendId}}),
            contentType: "application/json; charset=UTF-8"
        });
    document.getElementById("add-button").onclick = function addAnother(){
        document.getElementById("extra1").style.display = 'block';
    }
    }
});    