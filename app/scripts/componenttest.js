const authToken = "xAqO541unK52OdXpnfSGWZUW/c3EZy+ANcMO3rJFepzrhy/p8j7zK6DcFC1J98i35zRsH8hPG2qzbMyDshSBmw==";
const occurrenceTemplate = {
  template: `<div class="instance-container">
        <label>
          <span>Name</span><input type="text" id="occcurrence" value=""/>
        </label><br>

        <label>
          <span>Start Year</span><input type="text" id="startyear" value=""/>
        </label><br>

        <label>
          <span>End Year</span><input type="text" id="endyear" value=""/>
        </label><br>
    </div>`
}

const trendTemplate = {
  template: `<div id="trend-instance-container">
    <label for="trend"><h2>Trend Name</h2></label>
    <input type="text" name="trend" id="trend" value=""/>
  </div>`
}

const vm = new Vue({
  el: '#app',
  data: {
    //data?
  },
  methods: {
    addOcc: function(){
      $('form').append(occurrenceTemplate);
    },
    submitData: function(){
      var trendName = document.getElementById('trend').value;
      //  DO SOME GODDAMN VALIDATION, HANNAH
      //        if (!$.trim(trendName)) {
      //            alert("Trend name is empty");
      //            return false;
      //        }
      var trendId;
      console.log(JSON.stringify({trend: { name: trendName, user_id: "1" }}));
      var jqxhr = $.ajax({
        type: "POST",
        url: "https://flat-circle-app.herokuapp.com/api/trends",
        headers: {'X-Auth-Token' : authToken },
        data: JSON.stringify({trend: { name: trendName, user_id: "1" }}),
        contentType: "application/json; charset=UTF-8",
        success: function(response){
          trendId = response.id;
          $('.instance-container').each(function(i, obj){
            var name = obj.getElementsByTagName('input')[0].value;
            var startYear = obj.getElementsByTagName('input')[1].value;
            var endYear = obj.getElementsByTagName('input')[2].value;
            console.log(JSON.stringify({occurrence: { name: name, startYear: startYear, endYear: endYear, trend_id: trendId}}));
            $.ajax({
              type: "POST",
              url: "https://flat-circle-app.herokuapp.com/api/trends/" + trendId + "/occurrences",
              headers: {'X-Auth-Token' : authToken },
              data: JSON.stringify({occurrence: { name: name, startYear: startYear, endYear: endYear, trend_id: trendId}}),
              contentType: "application/json; charset=UTF-8"
            })
          })
        }
      })
      console.log(jqxhr);
    }
  },
  components: {
    'occurrence': occurrenceTemplate,
    'trend': trendTemplate
  }
})
