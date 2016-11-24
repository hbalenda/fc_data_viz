Vue.component('trend', {
  template: `
  <div id="trend-instance-container">
    <label for="trend"><h2>Trend Name</h2></label>
    <input type="text" name="trend"/>
  </div>
  `
})

Vue.component('occurrence', {
  template: `<div class="instance-container">
      <label>
        <span>Name</span><input type="text" name="name" />
      </label><br>

      <label>
        <span>Start Year</span><input type="text" name="startyear" />
      </label><br>

      <label>
        <span>End Year</span><input type="text" name="endyear" />
      </label><br>
  </div>
  `
})

new Vue({
  el: '#trendForm'
})
