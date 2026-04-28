var enterState = "correct"

document.addEventListener("keypress", (e) => {

    if (e.keyCode == 13) {
        if (enterState == "correct") {
          document.querySelector("#submit_button").click()

          enterState = "new"
        } else {
          document.querySelector("#new_button").click()

          enterState = "correct"
        }
    }

})
