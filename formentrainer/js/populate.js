var fields = {
  word: document.getElementById("greek_word"),
  wordField: document.getElementById("card")
}

function flip() {
  card.style.transform = "rotateY(90deg)"

  setTimeout(() => {
    card.style.transitionTimingFunction = "ease-out"
  }, 400)

  setTimeout(() => {
    card.style.transform = "rotateY(0deg)"
  }, 600)

  setTimeout(() => {
    card.style.transitionTimingFunction = "ease-in"
  })
}

function populate() {
  flip()

  setTimeout(() => {
    card.style.backgroundColor = "white"  
    fields.word.innerText = correct_answers.Wort
  }, 500)


  document.getElementById("submit_button").style.display = "block"
  document.getElementById("new_button").style.display = "none"

  for (let i = 0; i < 3; i++) {
    ansFields[i].person.innerText = ""
    ansFields[i].casus.innerText = "" 
    ansFields[i].numerus.innerText = "" 
    ansFields[i].genus.innerText = "" 
    ansFields[i].tempus.innerText = "" 
    ansFields[i].modus.innerText = "" 
    ansFields[i].genV.innerText = "" 
  }

  let radio_nodes = document.getElementsByClassName('input_table');
  for (let radio_node of radio_nodes) {
    radio_node.checked = false
  }
}
