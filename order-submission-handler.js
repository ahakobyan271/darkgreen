
(function () {
  function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }

  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    console.log(elements)

    var fields = Object.keys(elements).filter(function (k) {
      //console.log(Object.keys(elements))

      return (elements[k].name !== "honeypot");
    }).map(function (k) {
      if (elements[k].name !== undefined) {
        return elements[k].name;

        // special case for Edge's html collection
      } else if (elements[k].length > 0) {
        return elements[k].item(0).name;
      }
    }).filter(function (item, pos, self) {
      return self.indexOf(item) == pos && item;
    });
    // console.log(elements[0].name)
    var formData = {};
    console.log(formData)
    console.log(fields)

    fields.forEach(function (name) {
      var element = elements[name];
      console.log(elements[name])

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');

      }
    });


    console.log(formData)
    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    console.log(formData);
    return formData;
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var data = getFormData(form);         // get the values submitted in the form

    /* OPTION: Remove this comment to enable SPAM prevention, see README.md
    if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
      return false;
    }
    */

    if (data.email && !validEmail(data.email)) {   // if email is not valid show error
      var invalidEmail = form.querySelector(".email-invalid");
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } else {
      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        console.log(xhr.status, xhr.statusText);
        console.log(xhr.responseText);
        var formElements = form.querySelector(".form-elements")
        if (formElements) {
          formElements.style.display = "none"; // hide form
        }
        var thankYouMessage = form.querySelector(".thankyou_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
        return;
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }
  }

  function loaded() {
    console.log("Contact form submission handler loaded successfully.");
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();







//data transition from user to us


function getimgls() {  //send image to us
  var retrieved = localStorage.getItem('img')
  //console.log(retrieved)
  document.getElementById('image').value = retrieved
  document.getElementById('ordereditem').src = retrieved


}

getimgls()

function gotprice() {  //send totalprice to us
  var gotprice = localStorage.getItem('total price')
  //console.log(retrieved)
  document.getElementById('price').value = gotprice+" amd"
  document.getElementById('ordereditemprice').innerHTML = "Total price: "  + gotprice+" amd"
  document.getElementById('price without promo discount').value =  gotprice+" amd"


  //make discount based on promocode

  var promo = document.getElementById('promo')

  var promoarray = ["Anush", "janna", "mher"]

  promo.addEventListener('input', makediscount)

  function makediscount() {
    //console.log(promo.value)

    for (var item in promoarray) {
      if (promoarray[item].toLowerCase() === promo.value.toLowerCase()) {
        // alert("it workerd")
        gotprice = Math.round((gotprice - gotprice * 0.05) * 100) / 100
        //console.log(gotprice)
        document.getElementById('price').value = gotprice+" amd"
        document.getElementById('ordereditemprice').innerHTML = "Total price: " + gotprice+" amd"

      }
    }
  }



}
gotprice()





function getidner() {  //send idner to us
  var gotidner = localStorage.getItem('idner')
  //console.log(retrieved)
  document.getElementById('idner').value = gotidner


}

getidner()


//alert are you sure you want to leave?
//var back = false;
//back = true; //Somewhere, the condition is set to true
/*window.onbeforeunload = function (e) {
  //if (back == true)
  return "Are you sure to exit?";
}*/





