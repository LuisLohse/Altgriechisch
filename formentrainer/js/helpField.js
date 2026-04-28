var popUpField = document.getElementById("help_popUp")
var popUpInner = document.getElementById("inner_popUp")

document.getElementById("help_field").addEventListener("click", getHelp)
popUpField.addEventListener("click", removeHelp)
popUpInner.addEventListener("click", (e) => {
  e.stopPropagation()
})

function getHelp() {
    popUpField.style.display = "flex"
    setTimeout(() => {
      popUpField.style.opacity = "1"
    }, 50)
}

function removeHelp() {
  popUpField.style.opacity = "0"
  setTimeout(() => {
    popUpField.style.display = "none"
  }, 600)
}
