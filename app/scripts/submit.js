const authToken = "xAqO541unK52OdXpnfSGWZUW/c3EZy+ANcMO3rJFepzrhy/p8j7zK6DcFC1J98i35zRsH8hPG2qzbMyDshSBmw==";
const occurrenceTemplate = {
  template: `
    <div class="instance-container">
        <label>
          <span>Name</span><input type="text" id="occcurrence" value=""/>
        </label><br>

        <label>
          <span>Start Year</span><input type="text" id="startyear" value=""/>
        </label><br>

        <label>
          <span>End Year</span>
          <input type="text" id="endyear" value=""/>
        </label><br>
    </div>`
}

const trendTemplate = {
  template: `<div class="trend-container">
    <label>
      <span>Name</span><input type="text" name="trend" id="trend" value=""/>
    </label>
  </div>`
}

const vm = new Vue({
  el: '#app',
  data: {
    occurrences: [
      {"occ1": ""},
      {"occ2": ""}
    ],
    message: "",
    unknownError: `Sorry buddy! Something went wrong. Please check your form and try again?`
  },
  methods: {
    validateNum: function(value) {
      var valid = !isNaN(value) &&
             parseInt(Number(value)) == value &&
             !isNaN(parseInt(value, 10));
      if(valid){
        return valid;
      } else if(!valid) {
        this.message = `'${value}' is not a valid year`;
      } else {
        this.message = this.unknownError;
      }
    },
    validateName: function(name) {
      var valid = !(!$.trim(name)) && name.length <= 32;
      if (valid) {
        return valid;
      } else if (!valid) {
        this.message = `The name '${name}' is invalid`;
      } else {
        this.message = this.unknownError;
      }
    },
    addOcc: function(){
      this.occurrences.push({ "occ": "" });
    },
    submitData: function(){
      var trendName = document.getElementById('trend').value;
      var trendId;
      if (vm.validateName(trendName)) {
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
              var startYear = parseInt(obj.getElementsByTagName('input')[1].value);
              var endYear = parseInt(obj.getElementsByTagName('input')[2].value);
              if (name && startYear && endYear) {
                if (vm.validateNum(endYear) && vm.validateNum(startYear) && vm.validateName(name)) {
                  var jqxhr2 = $.ajax({
                    type: "POST",
                    url: "https://flat-circle-app.herokuapp.com/api/trends/" + trendId + "/occurrences",
                    headers: {'X-Auth-Token' : authToken },
                    data: JSON.stringify({occurrence: { name: name, startyear: startYear, endyear: endYear, trend_id: trendId}}),
                    contentType: "application/json; charset=UTF-8",
                    success: function(response){
                      alert("Thanks for your help!");
                    }
                  })
                  console.log(jqxhr2);
                }
              }
            })
          }
        })
        console.log(jqxhr);
      }
    }
  },
  components: {
    'occurrence': occurrenceTemplate,
    'trend': trendTemplate
  }
})
