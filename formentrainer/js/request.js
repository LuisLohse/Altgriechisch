const Http = new XMLHttpRequest();
const url='./php/getWord.php';

function getWord() {
  let lection = document.querySelector("#range_contain input").value
  let narrow = document.querySelector("#narrow_contain input:checked").value

  Http.open("GET", url + "?lection=" + lection + "&narrow=" + narrow);
  Http.send();

  Http.onreadystatechange = (e) => {
   if (Http.responseText != "") {
    //CODE
    let resp = JSON.parse(Http.responseText)[0]

    correct_answers = resp

    populate()
   }
  }
}

