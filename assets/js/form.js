$('form').submit(function(event) {
  event.preventDefault();
  if($('form').attr('data-element') == "caravel-form") {
    var formName = $('form').attr('name');
    var resultJson = {
      "name": formName,
      "fields": {},
      "owner": 1
    }

    var jsonstring = JSON.stringify($(this).serializeArray());
    var json = JSON.parse(jsonstring);

    var output = [];
    json.forEach(function(value) {
      var existing = output.filter(function(v, i) {
        return v.name == value.name;
      });
      if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].value = output[existingIndex].value.concat(value.value);
      } else {
        if (typeof value.value == 'string')
          value.value = [value.value];
        output.push(value);
      }
    });

    for(var i=0;i<output.length;i++) {
      var name = output[i].name
      if(output[i].value.length > 1) {
        var value = output[i].value
      } else {
        var value = output[i].value[0]
      }
      resultJson.fields[name] = value
    }

    console.log(resultJson)

    // POST a user Data
    var url = "https://forme-api.herokuapp.com/api/forms/";
    var jsonData = JSON.stringify(resultJson);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
      if (xhr.readyState == 4 && xhr.status == "201") {
        alert('your form is submitted successfully');
        window.location.href = "/partnership#contact";
      } else {
        alert('your form is not submitted');
      }    
    }
    xhr.send(jsonData);
  }
});