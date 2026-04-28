function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

if (!iOS()) {
  let radios = document.getElementsByClassName('input_table');
  for(i = 0; i < radios.length; i++) {
    radios[i].onclick = function(e) {
      e.preventDefault()

      setTimeout(() => {
         this.checked = !this.checked
      }, 10)
    }
  }
}
