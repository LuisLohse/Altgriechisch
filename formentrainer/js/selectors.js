const range_selector = document.querySelector("#range_contain input") 

function alterLectionSpan() {
  document.querySelector("#range_contain span").innerText = range_selector.value == "90" ? "> 90" : range_selector.value
}

document.querySelector("#narrow_contain form input").checked = true
