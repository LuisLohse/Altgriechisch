var correct_answers = {}
var user_answers = {
  person: "",
  casus: "",
  numerus: "",
  genus: "",
  tempus: "",
  modus: "",
  genusV: ""
}
const color = {
  base: "black",
  wrong: "red",
  moreWrong: "#f77",
  lessWrong: "#faa",
  correct: "lightgreen"
}
const ansFields = [
{
  person: document.getElementById("ans_person"),
  casus: document.getElementById("ans_casus"),
  numerus: document.getElementById("ans_numerus"),
  genus: document.getElementById("ans_genus"),
  tempus: document.getElementById("ans_tempus"),
  modus: document.getElementById("ans_modus"),
  genV: document.getElementById("ans_genV"),
},
{
  person: document.getElementById("ans2_person"),
  casus: document.getElementById("ans2_casus"),
  numerus: document.getElementById("ans2_numerus"),
  genus: document.getElementById("ans2_genus"),
  tempus: document.getElementById("ans2_tempus"),
  modus: document.getElementById("ans2_modus"),
  genV: document.getElementById("ans2_genV"),
},
{
  person: document.getElementById("ans3_person"),
  casus: document.getElementById("ans3_casus"),
  numerus: document.getElementById("ans3_numerus"),
  genus: document.getElementById("ans3_genus"),
  tempus: document.getElementById("ans3_tempus"),
  modus: document.getElementById("ans3_modus"),
  genV: document.getElementById("ans3_genV"),
},
]

function isEven(n) {
   return n % 2 == 0;
}

function getAnswers() {
  
  user_answers = {
    person: "",
    casus: "",
    numerus: "",
    genus: "",
    tempus: "",
    modus: "",
    genusV: ""
  }

  //Person
  let radios = document.getElementsByName("a_person")

  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      user_answers.person = radios[i].value

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  //Casus
  radios = document.getElementsByName("a_casus")

  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      user_answers.casus = radios[i].value

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  //Numerus
  radios = document.getElementsByName("a_numerus")

  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      user_answers.numerus = radios[i].value

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  //Genus
  radios = document.getElementsByName("a_genus")

  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      user_answers.genus = radios[i].value

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  //Time
  radios = document.getElementsByName("a_time")

  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      user_answers.tempus = radios[i].value

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  //Modus
  radios = document.getElementsByName("a_modus")

  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      user_answers.modus = radios[i].value

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  //Genus Verbi
  radios = document.getElementsByName("a_genV")

  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      user_answers.genusV = radios[i].value

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
}

function paintTable(num) {
  let elems = document.querySelectorAll("tr td:nth-of-type("+num+")")

  for (let elem in elems) {
    if (elems[elem].style == undefined) {
      continue
    }
         
    if (isEven(elem)) {
      elems[elem].style.backgroundColor = color.moreWrong
    } else {
      elems[elem].style.backgroundColor = color.lessWrong
    }
  }
}

function resetTable() {
  let elems = document.querySelectorAll("tr td")

  for (let elem in elems) {
    if (elems[elem].style == undefined) {
      continue
    }
         
    if ((elem % 14) < 7) {
      elems[elem].style.backgroundColor = "#dddddd"
    } else {
      elems[elem].style.backgroundColor = "white"
    }
  }
}

function correcting() {
    getAnswers()


    //Determine Answers and paint red if needed
         
    //All styles black
    ansFields[0].person.style.color = color.base
    ansFields[0].casus.style.color = color.base
    ansFields[0].numerus.style.color = color.base
    ansFields[0].genus.style.color = color.base
    ansFields[0].tempus.style.color = color.base
    ansFields[0].modus.style.color = color.base
    ansFields[0].genV.style.color = color.base

    //Populate Answer Fields
    ansFields[0].person.innerText = correct_answers.Person == "" ? "" : correct_answers.Person + ". Ps."
    ansFields[0].casus.innerText = correct_answers.Kasus
    ansFields[0].numerus.innerText = correct_answers.Numerus == "" ? "" : correct_answers.Numerus + "."
    ansFields[0].genus.innerText = correct_answers.Genus == "" ? "" : correct_answers.Genus + "."
    ansFields[0].tempus.innerText = correct_answers.Zeit
    ansFields[0].modus.innerText = correct_answers.Modus
    ansFields[0].genV.innerText = correct_answers.GenusVerbi

    //Reset Table
    resetTable()

    let isWrong = false

    if (correct_answers.hasMultiple == "0") {
      
    // Here's the code for only one correct answer
    if (user_answers.person != correct_answers.Person) {
        isWrong = true
        ansFields[0].person.style.color = color.wrong

        paintTable(1)
    }

    if (user_answers.casus != correct_answers.Kasus) {
        isWrong = true
        ansFields[0].casus.style.color = color.wrong

        paintTable(2)
    }

    if (user_answers.numerus != correct_answers.Numerus) {
        isWrong = true
        ansFields[0].numerus.style.color = color.wrong

        paintTable(3)
    }

    if (user_answers.genus != correct_answers.Genus) {
        isWrong = true
        ansFields[0].genus.style.color = color.wrong

        paintTable(4)
    }

    if (user_answers.tempus != correct_answers.Zeit) {
        isWrong = true
        ansFields[0].tempus.style.color = color.wrong

        paintTable(5)
    }

    if (user_answers.modus != correct_answers.Modus) {
        isWrong = true
        ansFields[0].modus.style.color = color.wrong

        paintTable(6)
    }

    if (user_answers.genusV != correct_answers.GenusVerbi) {
        isWrong = true
        ansFields[0].genV.style.color = color.wrong

        paintTable(7)
    }

    } else {
      //CODE FOR MULTIMPLE CORRECT ANSWERS
      let mult_correct_answers = {
        genus: correct_answers.Genus.split(";"),
        genV: correct_answers.GenusVerbi.split(";"),
        casus: correct_answers.Kasus.split(";"),
        modus: correct_answers.Modus.split(";"),
        numerus: correct_answers.Numerus.split(";"),
        person: correct_answers.Person.split(";"),
        tempus: correct_answers.Zeit.split(";"),
      } 


      //Check user answers for each anser
      let scores = []

      for (let i in mult_correct_answers.numerus) {
        let isCorrect = true
        if (user_answers.person != mult_correct_answers.person[i]) {
          isCorrect = false
        }

        if (user_answers.casus != mult_correct_answers.casus[i]) {
          isCorrect = false
        }

        if (user_answers.numerus != mult_correct_answers.numerus[i]) {
          isCorrect = false
        }

        if (user_answers.genus != mult_correct_answers.genus[i]) {
          isCorrect = false
        }

        if (user_answers.tempus != mult_correct_answers.tempus[i]) {
          isCorrect = false
        }

        if (user_answers.modus != mult_correct_answers.modus[i]) {
          isCorrect = false
        }

        if (user_answers.genusV != mult_correct_answers.genV[i]) {
          isCorrect = false
        }

        if (isCorrect) {
          scores.push("richtig")
        } else {
          scores.push("falsch")
        }


        //Populate answer fields
        ansFields[i].person.innerText = mult_correct_answers.person[i] == "" ? "" : mult_correct_answers.person[i] + ". Ps."
        ansFields[i].casus.innerText = mult_correct_answers.casus[i]
        ansFields[i].numerus.innerText = mult_correct_answers.numerus[i] == "" ? "" : mult_correct_answers.numerus[i] + "."
        ansFields[i].genus.innerText = mult_correct_answers.genus[i] == "" ? "" : mult_correct_answers.genus[i] + "."
        ansFields[i].tempus.innerText = mult_correct_answers.tempus[i]
        ansFields[i].modus.innerText = mult_correct_answers.modus[i]
        ansFields[i].genV.innerText = mult_correct_answers.genV[i]

      }


      isWrong = true
      for (let score of scores) {
        if (score == "richtig") {
          isWrong = false
        }
      }
    }



    if (isWrong) {
      document.getElementById("card").style.backgroundColor = color.moreWrong
    } else {
      document.getElementById("card").style.backgroundColor = color.correct
    }

    document.getElementById("submit_button").style.display = "none"
    document.getElementById("new_button").style.display = "block"
}

function newWord() {
    resetTable()
    

    getWord()
}

setTimeout(() => {
  newWord()
}, 100)
