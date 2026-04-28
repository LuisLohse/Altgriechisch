let x = new Vue({
  el: "#app",
  data: {
    userInput: "mäd#Ev Agan kai gn#ö#ti seaytOn"
  },
  filters: {
    greek: function(text) {

      //Pre Convert some Stuff
      let pre = text
        .replace(/\(stigma\)/g, "ϛ")
        .replace(/\(heta\)/g, "ͱ")
        .replace(/\(san\)/g, "ϻ")
        .replace(/\(koppa\)/g, "ϟ")
        .replace(/\(sampi\)/g, "ϡ")
        .replace(/\(scho\)/g, "ϸ")

      // Convert Letters to Greek
      let words = firstConvert(pre).split(" ")

      // Transform into apserised letters
      let aspered = asperConversion(words)

      let tremad = tremaMaker(aspered)

      // Correct for Diphtongs
      let res = diphtongConversion(tremad)

      // Filter out seperation signs
      res = res.replace(/-/g, "")

      // Add Iota Subscripta
      let low = iotaAddition(res)

      // Filter out underscores
      low = low.replace(/_/g, "")

      // Capitalize when needed
      let final = capitalize(low).replace(/[+]/g, "")

      // let tremad = tremaMaker(final)

      // Properly Format Stuff
      filtered = format(final)

      // Change sigmas accordingly
      let sigmad = sigmaCorr(filtered)

      // Return the final result as string
      return sigmad
    }
  },
  methods: {
    copy: function() {
      var copyText = document.getElementById("copyfield");

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");
    },
    searchGemoll: function() {
      var text = document.getElementById("copyfield").value;

      window.open("https://gemoll.eu/?q=" + text)
    },
    searchHansi: function() {
      var text = document.getElementById("copyfield").value;

      window.open("http://www.perseus.tufts.edu/hopper/morph?l=" + text + "&la=greek")
    }
  },
  watch: {
    userInput: (text) => {
      if (text == "oo soookrates") {
        alert("OOOOOO SOOOOKRATEEES")
      }
    }
  }
})

// FUNCTIONS

function firstConvert(text) {
  var ar = text.trim().split("")
  var mod = false

  var newAR = []
  for (elem of ar) {
    if (!mod) {
      switch (elem) {
        case "#":
          mod = true
          continue;
          break;
        case "a":
          elem = "α"
          break;
        case "A":
            elem = "ά"
            break;
        case "u":
          elem = "υ"
          break;
        case "U":
            elem = "ύ"
            break;
        case "b":
            elem = "β"
            break;
        case "g":
            elem = "γ"
            break;
        case "d":
            elem = "δ"
            break;
        case "e":
            elem = "ε"
            break;
        case "E":
            elem = "έ"
            break;
        case "z":
          elem = "ζ"
          break;
        case "ä":
            elem = "η"
            break;
        case "Ä":
            elem = "ή"
            break;
        case "i":
            elem = "ι"
            break;
        case "I":
            elem = "ί"
            break;
        case "k":
            elem = "κ"
            break;
        case "l":
            elem = "λ"
            break;
        case "m":
            elem = "μ"
            break;
        case "n":
            elem = "ν"
            break;
        case "x":
            elem = "ξ"
            break;
        case "o":
            elem = "ο"
            break;
        case "O":
            elem = "ό"
            break;
        case "p":
            elem = "π"
            break;
        case "r":
            elem = "ρ"
            break;
        case "s":
            elem = "σ"
            break;
        case "t":
            elem = "τ"
            break;
        case "y":
            elem = "υ"
            break;
        case "Y":
            elem = "ύ"
            break;
        case "ö":
            elem = "ω"
            break;
        case "Ö":
            elem = "ώ"
            break;
        case "f":
            elem = "φ"
            break;
        case "w":
            elem = "ϝ"
            break;
      }
    } else {
      switch (elem) {
        case "#":
          mod = true
          continue;
        case "a":
          elem = "ᾶ"
          break;
        case "A":
          elem = "ὰ"
          break;
        case "u":
          elem = "ῦ"
          break;
        case "U":
          elem = "ὺ"
          break;
        case "e":
            elem = "ὲ"
            break;
        case "E":
            elem = "ὲ"
            break;
        case "ä":
            elem = "ῆ"
            break;
        case "Ä":
            elem = "ὴ"
            break;
        case "t":
            elem = "θ"
            break;
        case "i":
            elem = "ῖ"
            break;
        case "I":
            elem = "ὶ"
            break;
        case "o":
            elem = "ὸ"
            break;
        case "O":
            elem = "ὸ"
            break;
        case "y":
            elem = "ῦ"
            break;
        case "Y":
            elem = "ὺ"
            break;
        case "ö":
            elem = "ῶ"
            break;
        case "Ö":
            elem = "ὼ"
            break;
        case "c":
            elem = "χ"
            break;
        case "p":
            elem = "ψ"
            break;
        default:
          break;
      }
    }
    mod = false
    newAR.push(elem)
  }
  result = newAR.join("")
  return result
}

function asperConversion(words) {
  let newWords = []
  for (singleWord of words) {
    let word = singleWord.split("")

    // PARSE +
    let plusException = false
    if (word[0] == "+") {
      plusException = true
      word[0] = ""
      let comp = word.join("")
      word = comp.split("")
    }

          // CHANGE TO ASPER
          if (word[0] == "*") {
            switch (word[1]) {
              case "ρ":
                word[1] = "ῥ"
                break;
              case "ε":
                word[1] = "ἑ"
                break;
              case "υ":
                word[1] = "ὑ"
                break;
              case "ι":
                word[1] = "ἱ"
                break;
              case "ο":
                word[1] = "ὁ"
                break;
              case "α":
                word[1] = "ἁ"
                break;
              case "η":
                word[1] = "ἡ"
                break;
              case "ω":
                word[1] = "ὡ"
                break;
              case "έ":
                word[1] = "ἕ"
                break;
              case "ύ":
                word[1] = "ὕ"
                break;
              case "ί":
                word[1] = "ἵ"
                break;
              case "ό":
                word[1] = "ὅ"
                break;
              case "ά":
                word[1] = "ἅ"
                break;
              case "ή":
                word[1] = "ἥ"
                break;
              case "ώ":
                word[1] = "ὥ"
                break;
              case "ὲ":
                word[1] = "ἓ"
                break;
              case "ὺ":
                word[1] = "ὓ"
                break;
              case "ὶ":
                word[1] = "ἳ"
                break;
              case "ὸ":
                word[1] = "ὃ"
                break;
              case "ὰ":
                word[1] = "ἃ"
                break;
              case "ὴ":
                word[1] = "ἣ"
                break;
              case "ὼ":
                word[1] = "ὣ"
                break;
              case "ῦ":
                word[1] = "ὗ"
                break;
              case "ῖ":
                word[1] = "ἷ"
                break;
              case "ᾶ":
                word[1] = "ἇ"
                break;
              case "ῆ":
                word[1] = "ἧ"
                break;
              case "ῶ":
                word[1] = "ὧ"
                break;
              default:
            }
          } else {
            switch (word[0]) {
              case "ρ":
                word[0] = "ῥ"
                break;
              case "ε":
                word[0] = "ἐ"
                break;
              case "υ":
                word[0] = "ὐ"
                break;
              case "ι":
                word[0] = "ἰ"
                break;
              case "ο":
                word[0] = "ὀ"
                break;
              case "α":
                word[0] = "ἀ"
                break;
              case "η":
                word[0] = "ἠ"
                break;
              case "ω":
                word[0] = "ὠ"
                break;
              case "έ":
                word[0] = "ἔ"
                break;
              case "ύ":
                word[0] = "ὔ"
                break;
              case "ί":
                word[0] = "ἴ"
                break;
              case "ό":
                word[0] = "ὄ"
                break;
              case "ά":
                word[0] = "ἄ"
                break;
              case "ή":
                word[0] = "ἤ"
                break;
              case "ώ":
                word[0] = "ὤ"
                break;
              case "ὲ":
                word[0] = "ἒ"
                break;
              case "ὺ":
                word[0] = "ὒ"
                break;
              case "ὶ":
                word[0] = "ἲ"
                break;
              case "ὸ":
                word[0] = "ὂ"
                break;
              case "ὰ":
                word[0] = "ἂ"
                break;
              case "ὴ":
                word[0] = "ἢ"
                break;
              case "ὼ":
                word[0] = "ὢ"
                break;
              case "ῦ":
                word[0] = "ὖ"
                break;
              case "ῖ":
                word[0] = "ἶ"
                break;
              case "ᾶ":
                word[0] = "ἆ"
                break;
              case "ῆ":
                word[0] = "ἦ"
                break;
              case "ῶ":
                word[0] = "ὦ"
                break;
              default:
            }
          }

          if (word[0] == "*") {
            word[0] = ""
          }

          if (word[word.length - 1] == "σ") {
            word[word.length - 1] = "ς"
          }


          singleWord = word.join("")

          if (plusException) {
            singleWord = "+" + singleWord
          }

          newWords.push(singleWord)
  }
  let res = newWords.join(" ")
  return res
}

function diphtongConversion(text) {
  let words = text.split(" ")

  let newWords = []


  for (singleWord of words) {
    let resWord = ""
    if (singleWord[1] == undefined) {
      resWord = singleWord
    } else {
      let dip = singleWord[0] + singleWord[1]
      // Dip is a string of the first to letters

      // === Switch Converts these to Diphtongs (Test for ALL possible diphtongs)
      switch (dip) {
        // Alpha lenis
        // (alpha)
        case "ἀα":
          dip = "αἀ"
          break;
        case "ἀά":
          dip = "αἄ"
          break;
        case "ἀᾶ":
          dip = "αἆ"
          break;
        case "ἀὰ":
          dip = "αἂ"
          break;
        // (epsilon)
        case "ἀε":
          dip = "αἐ"
          break;
        case "ἀέ":
          dip = "αἔ"
          break;
        case "ἀὲ":
          dip = "αἒ"
          break;
        case "ἀὲ":
          dip = "αἒ"
          break;
        // (iota)
        case "ἀι":
          dip = "αἰ"
          break;
        case "ἀί":
          dip = "αἴ"
          break;
        case "ἀῖ":
          dip = "αἶ"
          break;
        case "ἀὶ":
          dip = "αἲ"
          break;
        // (eta)
        case "ἀη":
          dip = "αἠ"
          break;
        case "ἀή":
          dip = "αἤ"
          break;
        case "ἀῆ":
          dip = "αἦ"
          break;
        case "ἀὴ":
          dip = "αἢ"
          break;
        // (omega)
        case "ἀω":
          dip = "αὠ"
          break;
        case "ἀώ":
          dip = "αὤ"
          break;
        case "ἀῶ":
          dip = "αὦ"
          break;
        case "ἀὼ":
          dip = "αὢ"
        // (omikron)
        case "ἀο":
          dip = "αὀ"
          break;
        case "ἀό":
          dip = "αὄ"
          break;
        case "ἀὸ":
          dip = "αὂ"
          break;
        // (ypsilon)
        case "ἀυ":
          dip = "αὐ"
          break;
        case "ἀύ":
          dip = "αὔ"
          break;
        case "ἀῦ":
          dip = "αὖ"
          break;
        case "ἀὺ":
          dip = "αὒ"
          break;
        // Alpha asper
        // (alpha)
        case "ἁα":
          dip = "αἁ"
          break;
        case "ἁά":
          dip = "αἅ"
          break;
        case "ἁᾶ":
          dip = "αἇ"
          break;
        case "ἁὰ":
          dip = "αἃ"
          break;
        // (epsilon)
        case "ἁε":
          dip = "αἑ"
          break;
        case "ἁέ":
          dip = "αἕ"
          break;
        case "ἁὲ":
          dip = "αἓ"
          break;
        case "ἁὲ":
          dip = "αἓ"
          break;
        // (iota)
        case "ἁι":
          dip = "αἱ"
          break;
        case "ἁί":
          dip = "αἵ"
          break;
        case "ἁῖ":
          dip = "αἷ"
          break;
        case "ἁὶ":
          dip = "αἳ"
          break;
        // (eta)
        case "ἁη":
          dip = "αἡ"
          break;
        case "ἁή":
          dip = "αἥ"
          break;
        case "ἁῆ":
          dip = "αἧ"
          break;
        case "ἁὴ":
          dip = "αἣ"
          break;
        // (omega)
        case "ἁω":
          dip = "αὡ"
          break;
        case "ἁώ":
          dip = "αὥ"
          break;
        case "ἁῶ":
          dip = "αὧ"
          break;
        case "ἁὼ":
          dip = "αὣ"
          break;
        // (omikron)
        case "ἁο":
          dip = "αὁ"
          break;
        case "ἁό":
          dip = "αὅ"
          break;
        case "ἁὸ":
          dip = "αὃ"
          break;
        // (ypsilon)
        case "ἁυ":
          dip = "αὑ"
          break;
        case "ἁύ":
          dip = "αὕ"
          break;
        case "ἁῦ":
          dip = "αὗ"
          break;
        case "ἁὺ":
          dip = "αὓ"
          break;
        // Epsilon lenis
        // (alpha)
        case "ἐα":
          dip = "εἀ"
          break;
        case "ἐά":
          dip = "εἄ"
          break;
        case "ἐᾶ":
          dip = "εἆ"
          break;
        case "ἐὰ":
          dip = "εἂ"
          break;
        // (epsilon)
        case "ἐε":
          dip = "εἐ"
          break;
        case "ἐέ":
          dip = "εἔ"
          break;
        case "ἐὲ":
          dip = "εἒ"
          break;
        case "ἐὲ":
          dip = "εἒ"
          break;
        // (iota)
        case "ἐι":
          dip = "εἰ"
          break;
        case "ἐί":
          dip = "εἴ"
          break;
        case "ἐῖ":
          dip = "εἶ"
          break;
        case "ἐὶ":
          dip = "εἲ"
          break;
        // (eta)
        case "ἐη":
          dip = "εἠ"
          break;
        case "ἐή":
          dip = "εἤ"
          break;
        case "ἐῆ":
          dip = "εἦ"
          break;
        case "ἐὴ":
          dip = "εἢ"
          break;
        // (omega)
        case "ἐω":
          dip = "εὠ"
          break;
        case "ἐώ":
          dip = "εὤ"
          break;
        case "ἐῶ":
          dip = "εὦ"
          break;
        case "ἐὼ":
          dip = "εὢ"
          break;
        // (omikron)
        case "ἐο":
          dip = "εὀ"
          break;
        case "ἐό":
          dip = "εὄ"
          break;
        case "ἐὸ":
          dip = "εὂ"
          break;
        // (ypsilon)
        case "ἐυ":
          dip = "εὐ"
          break;
        case "ἐύ":
          dip = "εὔ"
          break;
        case "ἐῦ":
          dip = "εὖ"
          break;
        case "ἐὺ":
          dip = "εὒ"
          break;
        // Epsilon asper
        // (alpha)
        case "ἑα":
          dip = "εἁ"
          break;
        case "ἑά":
          dip = "εἅ"
          break;
        case "ἑᾶ":
          dip = "εἇ"
          break;
        case "ἑὰ":
          dip = "εἃ"
          break;
        // (epsilon)
        case "ἑε":
          dip = "εἑ"
          break;
        case "ἑέ":
          dip = "εἕ"
          break;
        case "ἑὲ":
          dip = "εἓ"
          break;
        case "ἑὲ":
          dip = "εἓ"
          break;
        // (iota)
        case "ἑι":
          dip = "εἱ"
          break;
        case "ἑί":
          dip = "εἵ"
          break;
        case "ἑῖ":
          dip = "εἷ"
          break;
        case "ἑὶ":
          dip = "εἳ"
          break;
        // (eta)
        case "ἑη":
          dip = "εἡ"
          break;
        case "ἑή":
          dip = "εἥ"
          break;
        case "ἑῆ":
          dip = "εἧ"
          break;
        case "ἑὴ":
          dip = "εἣ"
          break;
        // (omega)
        case "ἑω":
          dip = "εὡ"
          break;
        case "ἑώ":
          dip = "εὥ"
          break;
        case "ἑῶ":
          dip = "εὧ"
          break;
        case "ἑὼ":
          dip = "εὣ"
          break;
        // (omikron)
        case "ἑο":
          dip = "εὁ"
          break;
        case "ἑό":
          dip = "εὅ"
          break;
        case "ἑὸ":
          dip = "εὃ"
          break;
        // (ypsilon)
        case "ἑυ":
          dip = "εὑ"
          break;
        case "ἑύ":
          dip = "εὕ"
          break;
        case "ἑῦ":
          dip = "εὗ"
          break;
        case "ἑὺ":
          dip = "εὓ"
          break;
        // Iota lenis
        // (alpha)
        case "ἰα":
          dip = "ιἀ"
          break;
        case "ἰά":
          dip = "ιἄ"
          break;
        case "ἰᾶ":
          dip = "ιἆ"
          break;
        case "ἰὰ":
          dip = "ιἂ"
          break;
        // (epsilon)
        case "ἰε":
          dip = "ιἐ"
          break;
        case "ἰέ":
          dip = "ιἔ"
          break;
        case "ἰὲ":
          dip = "ιἒ"
          break;
        case "ἰὲ":
          dip = "ιἒ"
          break;
        // (iota)
        case "ἰι":
          dip = "ιἰ"
          break;
        case "ἰί":
          dip = "ιἴ"
          break;
        case "ἰῖ":
          dip = "ιἶ"
          break;
        case "ἰὶ":
          dip = "ιἲ"
          break;
        // (eta)
        case "ἰη":
          dip = "ιἠ"
          break;
        case "ἰή":
          dip = "ιἤ"
          break;
        case "ἰῆ":
          dip = "ιἦ"
          break;
        case "ἰὴ":
          dip = "ιἢ"
          break;
        // (omega)
        case "ἰω":
          dip = "ιὠ"
          break;
        case "ἰώ":
          dip = "ιὤ"
          break;
        case "ἰῶ":
          dip = "ιὦ"
          break;
        case "ἰὼ":
          dip = "ιὢ"
          break;
        // (omikron)
        case "ἰο":
          dip = "ιὀ"
          break;
        case "ἰό":
          dip = "ιὄ"
          break;
        case "ἰὸ":
          dip = "ιὂ"
          break;
        // (ypsilon)
        case "ἰυ":
          dip = "ιὐ"
          break;
        case "ἰύ":
          dip = "ιὔ"
          break;
        case "ἰῦ":
          dip = "ιὖ"
          break;
        case "ἰὺ":
          dip = "ιὒ"
          break;
        // Iota asper
        // (alpha)
        case "ἱα":
          dip = "ιἁ"
          break;
        case "ἱά":
          dip = "ιἅ"
          break;
        case "ἱᾶ":
          dip = "ιἇ"
          break;
        case "ἱὰ":
          dip = "ιἃ"
          break;
        // (epsilon)
        case "ἱε":
          dip = "ιἑ"
          break;
        case "ἱέ":
          dip = "ιἕ"
          break;
        case "ἱὲ":
          dip = "ιἓ"
          break;
        case "ἱὲ":
          dip = "ιἓ"
          break;
        // (iota)
        case "ἱι":
          dip = "ιἱ"
          break;
        case "ἱί":
          dip = "ιἵ"
          break;
        case "ἱῖ":
          dip = "ιἷ"
          break;
        case "ἱὶ":
          dip = "ιἳ"
          break;
        // (eta)
        case "ἱη":
          dip = "ιἡ"
          break;
        case "ἱή":
          dip = "ιἥ"
          break;
        case "ἱῆ":
          dip = "ιἧ"
          break;
        case "ἱὴ":
          dip = "ιἣ"
          break;
        // (omega)
        case "ἱω":
          dip = "ιὡ"
          break;
        case "ἱώ":
          dip = "ιὥ"
          break;
        case "ἱῶ":
          dip = "ιὧ"
          break;
        case "ἱὼ":
          dip = "ιὣ"
          break;
        // (omikron)
        case "ἱο":
          dip = "ιὁ"
          break;
        case "ἱό":
          dip = "ιὅ"
          break;
        case "ἱὸ":
          dip = "ιὃ"
          break;
        // (ypsilon)
        case "ἱυ":
          dip = "ιὑ"
          break;
        case "ἱύ":
          dip = "ιὕ"
          break;
        case "ἱῦ":
          dip = "ιὗ"
          break;
        case "ἱὺ":
          dip = "ιὓ"
          break;
        // Eta lenis
        // (alpha)
        case "ἠα":
          dip = "ηἀ"
          break;
        case "ἠά":
          dip = "ηἄ"
          break;
        case "ἠᾶ":
          dip = "ηἆ"
          break;
        case "ἠὰ":
          dip = "ηἂ"
          break;
        // (epsilon)
        case "ἠε":
          dip = "ηἐ"
          break;
        case "ἠέ":
          dip = "ηἔ"
          break;
        case "ἠὲ":
          dip = "ηἒ"
          break;
        case "ἠὲ":
          dip = "ηἒ"
          break;
        // (iota)
        case "ἠι":
          dip = "ηἰ"
          break;
        case "ἠί":
          dip = "ηἴ"
          break;
        case "ἠῖ":
          dip = "ηἶ"
          break;
        case "ἠὶ":
          dip = "ηἲ"
          break;
        // (eta)
        case "ἠη":
          dip = "ηἠ"
          break;
        case "ἠή":
          dip = "ηἤ"
          break;
        case "ἠῆ":
          dip = "ηἦ"
          break;
        case "ἠὴ":
          dip = "ηἢ"
          break;
        // (omega)
        case "ἠω":
          dip = "ηὠ"
          break;
        case "ἠώ":
          dip = "ηὤ"
          break;
        case "ἠῶ":
          dip = "ηὦ"
          break;
        case "ἠὼ":
          dip = "ηὢ"
          break;
        // (omikron)
        case "ἠο":
          dip = "ηὀ"
          break;
        case "ἠό":
          dip = "ηὄ"
          break;
        case "ἠὸ":
          dip = "ηὂ"
          break;
        // (ypsilon)
        case "ἠυ":
          dip = "ηὐ"
          break;
        case "ἠύ":
          dip = "ηὔ"
          break;
        case "ἠῦ":
          dip = "ηὖ"
          break;
        case "ἠὺ":
          dip = "ηὒ"
          break;
        // Eta asper
        // (alpha)
        case "ἡα":
          dip = "ηἁ"
          break;
        case "ἡά":
          dip = "ηἅ"
          break;
        case "ἡᾶ":
          dip = "ηἇ"
          break;
        case "ἡὰ":
          dip = "ηἃ"
          break;
        // (epsilon)
        case "ἡε":
          dip = "ηἑ"
          break;
        case "ἡέ":
          dip = "ηἕ"
          break;
        case "ἡὲ":
          dip = "ηἓ"
          break;
        case "ἡὲ":
          dip = "ηἓ"
          break;
        // (iota)
        case "ἡι":
          dip = "ηἱ"
          break;
        case "ἡί":
          dip = "ηἵ"
          break;
        case "ἡῖ":
          dip = "ηἷ"
          break;
        case "ἡὶ":
          dip = "ηἳ"
          break;
        // (eta)
        case "ἡη":
          dip = "ηἡ"
          break;
        case "ἡή":
          dip = "ηἥ"
          break;
        case "ἡῆ":
          dip = "ηἧ"
          break;
        case "ἡὴ":
          dip = "ηἣ"
          break;
        // (omega)
        case "ἡω":
          dip = "ηὡ"
          break;
        case "ἡώ":
          dip = "ηὥ"
          break;
        case "ἡῶ":
          dip = "ηὧ"
          break;
        case "ἡὼ":
          dip = "ηὣ"
          break;
        // (omikron)
        case "ἡο":
          dip = "ηὁ"
          break;
        case "ἡό":
          dip = "ηὅ"
          break;
        case "ἡὸ":
          dip = "ηὃ"
          break;
        // (ypsilon)
        case "ἡυ":
          dip = "ηὑ"
          break;
        case "ἡύ":
          dip = "ηὕ"
          break;
        case "ἡῦ":
          dip = "ηὗ"
          break;
        case "ἡὺ":
          dip = "ηὓ"
          break;
        // Omega lenis
        // (alpha)
        case "ὠα":
          dip = "ωἀ"
          break;
        case "ὠά":
          dip = "ωἄ"
          break;
        case "ὠᾶ":
          dip = "ωἆ"
          break;
        case "ὠὰ":
          dip = "ωἂ"
          break;
        // (epsilon)
        case "ὠε":
          dip = "ωἐ"
          break;
        case "ὠέ":
          dip = "ωἔ"
          break;
        case "ὠὲ":
          dip = "ωἒ"
          break;
        case "ὠὲ":
          dip = "ωἒ"
          break;
        // (iota)
        case "ὠι":
          dip = "ωἰ"
          break;
        case "ὠί":
          dip = "ωἴ"
          break;
        case "ὠῖ":
          dip = "ωἶ"
          break;
        case "ὠὶ":
          dip = "ωἲ"
          break;
        // (eta)
        case "ὠη":
          dip = "ωἠ"
          break;
        case "ὠή":
          dip = "ωἤ"
          break;
        case "ὠῆ":
          dip = "ωἦ"
          break;
        case "ὠὴ":
          dip = "ωἢ"
          break;
        // (omega)
        case "ὠω":
          dip = "ωὠ"
          break;
        case "ὠώ":
          dip = "ωὤ"
          break;
        case "ὠῶ":
          dip = "ωὦ"
          break;
        case "ὠὼ":
          dip = "ωὢ"
          break;
        // (omikron)
        case "ὠο":
          dip = "ωὀ"
          break;
        case "ὠό":
          dip = "ωὄ"
          break;
        case "ὠὸ":
          dip = "ωὂ"
          break;
        // (ypsilon)
        case "ὠυ":
          dip = "ωὐ"
          break;
        case "ὠύ":
          dip = "ωὔ"
          break;
        case "ὠῦ":
          dip = "ωὖ"
          break;
        case "ὠὺ":
          dip = "ωὒ"
          break;
        // Omega asper
        // (alpha)
        case "ὡα":
          dip = "ωἁ"
          break;
        case "ὡά":
          dip = "ωἅ"
          break;
        case "ὡᾶ":
          dip = "ωἇ"
          break;
        case "ὡὰ":
          dip = "ωἃ"
          break;
        // (epsilon)
        case "ὡε":
          dip = "ωἑ"
          break;
        case "ὡέ":
          dip = "ωἕ"
          break;
        case "ὡὲ":
          dip = "ωἓ"
          break;
        case "ὡὲ":
          dip = "ωἓ"
          break;
        // (iota)
        case "ὡι":
          dip = "ωἱ"
          break;
        case "ὡί":
          dip = "ωἵ"
          break;
        case "ὡῖ":
          dip = "ωἷ"
          break;
        case "ὡὶ":
          dip = "ωἳ"
          break;
        // (eta)
        case "ὡη":
          dip = "ωἡ"
          break;
        case "ὡή":
          dip = "ωἥ"
          break;
        case "ὡῆ":
          dip = "ωἧ"
          break;
        case "ὡὴ":
          dip = "ωἣ"
          break;
        // (omega)
        case "ὡω":
          dip = "ωὡ"
          break;
        case "ὡώ":
          dip = "ωὥ"
          break;
        case "ὡῶ":
          dip = "ωὧ"
          break;
        case "ὡὼ":
          dip = "ωὣ"
          break;
        // (omikron)
        case "ὡο":
          dip = "ωὁ"
          break;
        case "ὡό":
          dip = "ωὅ"
          break;
        case "ὡὸ":
          dip = "ωὃ"
          break;
        // (ypsilon)
        case "ὡυ":
          dip = "ωὑ"
          break;
        case "ὡύ":
          dip = "ωὕ"
          break;
        case "ὡῦ":
          dip = "ωὗ"
          break;
        case "ὡὺ":
          dip = "ωὓ"
          break;
        // Omikron lenis
        // (alpha)
        case "ὀα":
          dip = "οἀ"
          break;
        case "ὀά":
          dip = "οἄ"
          break;
        case "ὀᾶ":
          dip = "οἆ"
          break;
        case "ὀὰ":
          dip = "οἂ"
          break;
        // (epsilon)
        case "ὀε":
          dip = "οἐ"
          break;
        case "ὀέ":
          dip = "οἔ"
          break;
        case "ὀὲ":
          dip = "οἒ"
          break;
        case "ὀὲ":
          dip = "οἒ"
          break;
        // (iota)
        case "ὀι":
          dip = "οἰ"
          break;
        case "ὀί":
          dip = "οἴ"
          break;
        case "ὀῖ":
          dip = "οἶ"
          break;
        case "ὀὶ":
          dip = "οἲ"
          break;
        // (eta)
        case "ὀη":
          dip = "οἠ"
          break;
        case "ὀή":
          dip = "οἤ"
          break;
        case "ὀῆ":
          dip = "οἦ"
          break;
        case "ὀὴ":
          dip = "οἢ"
          break;
        // (omega)
        case "ὀω":
          dip = "οὠ"
          break;
        case "ὀώ":
          dip = "οὤ"
          break;
        case "ὀῶ":
          dip = "οὦ"
          break;
        case "ὀὼ":
          dip = "οὢ"
          break;
        // (omikron)
        case "ὀο":
          dip = "οὀ"
          break;
        case "ὀό":
          dip = "οὄ"
          break;
        case "ὀὸ":
          dip = "οὂ"
          break;
        // (ypsilon)
        case "ὀυ":
          dip = "οὐ"
          break;
        case "ὀύ":
          dip = "οὔ"
          break;
        case "ὀῦ":
          dip = "οὖ"
          break;
        case "ὀὺ":
          dip = "οὒ"
          break;
        // Omikron asper
        // (alpha)
        case "ὁα":
          dip = "οἁ"
          break;
        case "ὁά":
          dip = "οἅ"
          break;
        case "ὁᾶ":
          dip = "οἇ"
          break;
        case "ὁὰ":
          dip = "οἃ"
          break;
        // (epsilon)
        case "ὁε":
          dip = "οἑ"
          break;
        case "ὁέ":
          dip = "οἕ"
          break;
        case "ὁὲ":
          dip = "οἓ"
          break;
        case "ὁὲ":
          dip = "οἓ"
          break;
        // (iota)
        case "ὁι":
          dip = "οἱ"
          break;
        case "ὁί":
          dip = "οἵ"
          break;
        case "ὁῖ":
          dip = "οἷ"
          break;
        case "ὁὶ":
          dip = "οἳ"
          break;
        // (eta)
        case "ὁη":
          dip = "οἡ"
          break;
        case "ὁή":
          dip = "οἥ"
          break;
        case "ὁῆ":
          dip = "οἧ"
          break;
        case "ὁὴ":
          dip = "οἣ"
          break;
        // (omega)
        case "ὁω":
          dip = "οὡ"
          break;
        case "ὁώ":
          dip = "οὥ"
          break;
        case "ὁῶ":
          dip = "οὧ"
          break;
        case "ὁὼ":
          dip = "οὣ"
          break;
        // (omikron)
        case "ὁο":
          dip = "οὁ"
          break;
        case "ὁό":
          dip = "οὅ"
          break;
        case "ὁὸ":
          dip = "οὃ"
          break;
        // (ypsilon)
        case "ὁυ":
          dip = "οὑ"
          break;
        case "ὁύ":
          dip = "οὕ"
          break;
        case "ὁῦ":
          dip = "οὗ"
          break;
        case "ὁὺ":
          dip = "οὓ"
          break;
        // Ypsilon lenis
        // (alpha)
        case "ὐα":
          dip = "υἀ"
          break;
        case "ὐά":
          dip = "υἄ"
          break;
        case "ὐᾶ":
          dip = "υἆ"
          break;
        case "ὐὰ":
          dip = "υἂ"
          break;
        // (epsilon)
        case "ὐε":
          dip = "υἐ"
          break;
        case "ὐέ":
          dip = "υἔ"
          break;
        case "ὐὲ":
          dip = "υἒ"
          break;
        case "ὐὲ":
          dip = "υἒ"
          break;
        // (iota)
        case "ὐι":
          dip = "υἰ"
          break;
        case "ὐί":
          dip = "υἴ"
          break;
        case "ὐῖ":
          dip = "υἶ"
          break;
        case "ὐὶ":
          dip = "υἲ"
          break;
        // (eta)
        case "ὐη":
          dip = "υἠ"
          break;
        case "ὐή":
          dip = "υἤ"
          break;
        case "ὐῆ":
          dip = "υἦ"
          break;
        case "ὐὴ":
          dip = "υἢ"
          break;
        // (omega)
        case "ὐω":
          dip = "υὠ"
          break;
        case "ὐώ":
          dip = "υὤ"
          break;
        case "ὐῶ":
          dip = "υὦ"
          break;
        case "ὐὼ":
          dip = "υὢ"
          break;
        // (omikron)
        case "ὐο":
          dip = "υὀ"
          break;
        case "ὐό":
          dip = "υὄ"
          break;
        case "ὐὸ":
          dip = "υὂ"
          break;
        // (ypsilon)
        case "ὐυ":
          dip = "υὐ"
          break;
        case "ὐύ":
          dip = "υὔ"
          break;
        case "ὐῦ":
          dip = "υὖ"
          break;
        case "ὐὺ":
          dip = "υὒ"
          break;
        // Ypsilon asper
        // (alpha)
        case "ὑα":
          dip = "υἁ"
          break;
        case "ὑά":
          dip = "υἅ"
          break;
        case "ὑᾶ":
          dip = "υἇ"
          break;
        case "ὑὰ":
          dip = "υἃ"
          break;
        // (epsilon)
        case "ὑε":
          dip = "υἑ"
          break;
        case "ὑέ":
          dip = "υἕ"
          break;
        case "ὑὲ":
          dip = "υἓ"
          break;
        case "ὑὲ":
          dip = "υἓ"
          break;
        // (iota)
        case "ὑι":
          dip = "υἱ"
          break;
        case "ὑί":
          dip = "υἵ"
          break;
        case "ὑῖ":
          dip = "υἷ"
          break;
        case "ὑὶ":
          dip = "υἳ"
          break;
        // (eta)
        case "ὑη":
          dip = "υἡ"
          break;
        case "ὑή":
          dip = "υἥ"
          break;
        case "ὑῆ":
          dip = "υἧ"
          break;
        case "ὑὴ":
          dip = "υἣ"
          break;
        // (omega)
        case "ὑω":
          dip = "υὡ"
          break;
        case "ὑώ":
          dip = "υὥ"
          break;
        case "ὑῶ":
          dip = "υὧ"
          break;
        case "ὑὼ":
          dip = "υὣ"
          break;
        // (omikron)
        case "ὑο":
          dip = "υὁ"
          break;
        case "ὑό":
          dip = "υὅ"
          break;
        case "ὑὸ":
          dip = "υὃ"
          break;
        // (ypsilon)
        case "ὑυ":
          dip = "υὑ"
          break;
        case "ὑύ":
          dip = "υὕ"
          break;
        case "ὑῦ":
          dip = "υὗ"
          break;
        case "ὑὺ":
          dip = "υὓ"
          break;

      }
      // ===
      // Joins the transformed diphtong to the new Word
      let wop = singleWord.split("")
      wop[0] = ""
      wop[1] = dip

      resWord = wop.join("")
    }
    // EITHER WAY, THE RESWORD WILL BE ADDED
    newWords.push(resWord)
  }


  // HERE THE LOOP HAS FINISHED
  let res = newWords.join(" ")
  return res
}

function iotaAddition(text) {
 let letters = text.split("")

 for (i in letters) {
   if (letters[i] == "_" && letters[i - 1] !== undefined) {
     switch (letters[i - 1]) {
       // Alpha blank
       case "α":
          letters[i - 1] = "ᾳ"
         break;
       case "ά":
          letters[i - 1] = "ᾴ"
         break;
       case "ᾶ":
          letters[i - 1] = "ᾷ"
         break;
       case "ὰ":
          letters[i - 1] = "ᾲ"
         break;
       // Alpha lenis
       case "ἀ":
          letters[i - 1] = "ᾀ"
         break;
       case "ἄ":
          letters[i - 1] = "ᾄ"
         break;
       case "ἆ":
          letters[i - 1] = "ᾆ"
         break;
       case "ἂ":
          letters[i - 1] = "ᾂ"
         break;
       // Alpha asper
       case "ἁ":
          letters[i - 1] = "ᾁ"
         break;
       case "ἅ":
          letters[i - 1] = "ᾅ"
         break;
       case "ἇ":
          letters[i - 1] = "ᾇ"
         break;
       case "ἃ":
          letters[i - 1] = "ᾃ"
         break;
       // Eta blank
       case "η":
          letters[i - 1] = "ῃ"
         break;
       case "ή":
          letters[i - 1] = "ῄ"
         break;
       case "ῆ":
          letters[i - 1] = "ῇ"
         break;
       case "ὴ":
          letters[i - 1] = "ῂ"
         break;
       // Eta lenis
       case "ἠ":
          letters[i - 1] = "ᾐ"
         break;
       case "ἤ":
          letters[i - 1] = "ᾔ"
         break;
       case "ἦ":
          letters[i - 1] = "ᾖ"
         break;
       case "ἢ":
          letters[i - 1] = "ᾒ"
         break;
       // Eta asper
       case "ἡ":
          letters[i - 1] = "ᾑ"
         break;
       case "ἥ":
          letters[i - 1] = "ᾕ"
         break;
       case "ἧ":
          letters[i - 1] = "ᾗ"
         break;
       case "ἣ":
          letters[i - 1] = "ᾓ"
         break;
       // Omega blank
       case "ω":
          letters[i - 1] = "ῳ"
         break;
       case "ώ":
          letters[i - 1] = "ῴ"
         break;
       case "ῶ":
          letters[i - 1] = "ῷ"
         break;
       case "ὼ":
          letters[i - 1] = "ῲ"
         break;
       // Omega lenis
       case "ὠ":
          letters[i - 1] = "ᾠ"
         break;
       case "ὤ":
          letters[i - 1] = "ᾤ"
         break;
       case "ὦ":
          letters[i - 1] = "ᾦ"
         break;
       case "ὢ":
          letters[i - 1] = "ᾢ"
         break;
       // Omega asper
       case "ὡ":
          letters[i - 1] = "ᾡ"
         break;
       case "ὥ":
          letters[i - 1] = "ᾥ"
         break;
       case "ὧ":
          letters[i - 1] = "ᾧ"
         break;
       case "ὣ":
          letters[i - 1] = "ᾣ"
         break;
     }
   }
 }

 res = letters.join("")
 return res
}

function format(text) {

  let res = text.replace(/[:;]/g, "·")
    .replace(/\?/g, ";")
    .replace(/τh/g, "θ")
    .replace(/ch/g, "χ")

  return res
}

function capitalize(text) {
  // Split text into letters
  let letters = text.split("")

  for (letter in letters) {
    if (letters[letter - 1] == "+" && letters[letter] !== undefined) {
      // Switch case transforming letters
      switch (letters[letter]) {
        // ALPHA
        // (no spirit)
        case "α":
          letters[letter] = "Α"
          break;
        case "ά":
          letters[letter] = "Ά"
          break;
        case "ᾶ":
          letters[letter] = "῀Α"
          break;
        case "ὰ":
          letters[letter] = "Ὰ"
          break;
        // Iota
        case "ᾳ":
          letters[letter] = "Αι"
          break;
        case "ᾴ":
          letters[letter] = "Άι"
          break;
        case "ᾷ":
          letters[letter] = "῀Αι"
          break;
        case "ᾲ":
          letters[letter] = "Ὰι"
          break;
        // (lenis)
        case "ἀ":
          letters[letter] = "Ἀ"
          break;
        case "ἄ":
          letters[letter] = "Ἄ"
          break;
        case "ἆ":
          letters[letter] = "Ἆ"
          break;
        case "ἂ":
          letters[letter] = "Ἂ"
          break;
        // Iota
        case "ᾀ":
          letters[letter] = "Ἀι"
          break;
        case "ᾄ":
          letters[letter] = "Ἄι"
          break;
        case "ᾆ":
          letters[letter] = "Ἆι"
          break;
        case "ᾂ":
          letters[letter] = "Ἂι"
          break;
        // (asper)
        case "ἁ":
          letters[letter] = "Ἁ"
          break;
        case "ἅ":
          letters[letter] = "Ἅ"
          break;
        case "ἇ":
          letters[letter] = "Ἇ"
          break;
        case "ἃ":
          letters[letter] = "Ἃ"
          break;
        // Iota
        case "ᾁ":
          letters[letter] = "Ἁι"
          break;
        case "ᾅ":
          letters[letter] = "Ἅι"
          break;
        case "ᾇ":
          letters[letter] = "Ἇι"
          break;
        case "ᾃ":
          letters[letter] = "Ἃι"
          break;
        // EPSILON
        // (no spirit)
        case "ε":
          letters[letter] = "Ε"
          break;
        case "έ":
          letters[letter] = "Έ"
          break;
        case "ὲ":
          letters[letter] = "Ὲ"
          break;
        case "ὲ":
          letters[letter] = "Ὲ"
          break;
        // (lenis)
        case "ἐ":
          letters[letter] = "Ἐ"
          break;
        case "ἔ":
          letters[letter] = "Ἔ"
          break;
        case "ἒ":
          letters[letter] = "Ἒ"
          break;
        case "ἒ":
          letters[letter] = "Ἒ"
          break;
        // (asper)
        case "ἑ":
          letters[letter] = "Ἑ"
          break;
        case "ἕ":
          letters[letter] = "Ἕ"
          break;
        case "ἒ":
          letters[letter] = "Ἓ"
          break;
        case "ἒ":
          letters[letter] = "Ἓ"
          break;
        // ΙΟΤΑ
        // (no spirit)
        case "ι":
          letters[letter] = "Ι"
          break;
        case "ί":
          letters[letter] = "Ί"
          break;
        case "ῖ":
          letters[letter] = "῀Ι"
          break;
        case "ὶ":
          letters[letter] = "Ὶ"
          break;
        // (lenis)
        case "ἰ":
          letters[letter] = "Ἰ"
          break;
        case "ἴ":
          letters[letter] = "Ἴ"
          break;
        case "ἶ":
          letters[letter] = "Ἶ"
          break;
        case "ἲ":
          letters[letter] = "Ἲ"
          break;
        // (asper)
        case "ἱ":
          letters[letter] = "Ἱ"
          break;
        case "ἵ":
          letters[letter] = "Ἴ"
          break;
        case "ἷ":
          letters[letter] = "Ἷ"
          break;
        case "ἳ":
          letters[letter] = "Ἳ"
          break;
        // OMIKRON
        // (no spirit)
        case "ο":
          letters[letter] = "Ο"
          break;
        case "ό":
          letters[letter] = "Ό"
          break;
        case "ὸ":
          letters[letter] = "Ὸ"
          break;
        case "ὸ":
          letters[letter] = "Ὸ"
          break;
        // (lenis)
        case "ὀ":
          letters[letter] = "Ὀ"
          break;
        case "ὄ":
          letters[letter] = "Ὄ"
          break;
        case "ὂ":
          letters[letter] = "Ὂ"
          break;
        case "ὂ":
          letters[letter] = "Ὂ"
          break;
        // (asper)
        case "ὁ":
          letters[letter] = "Ὁ"
          break;
        case "ὅ":
          letters[letter] = "Ὅ"
          break;
        case "ὃ":
          letters[letter] = "Ὃ"
          break;
        case "ὃ":
          letters[letter] = "Ὃ"
          break;
        // YPSILON
        // (no spirit)
        case "υ":
          letters[letter] = "Υ"
          break;
        case "ύ":
          letters[letter] = "Ύ"
          break;
        case "ῦ":
          letters[letter] = "῀Υ"
          break;
        case "ὺ":
          letters[letter] = "Ὺ"
          break;
        // (lenis)
        case "ὐ":
          letters[letter] = "᾽Υ"
          break;
        case "ὔ":
          letters[letter] = "῎Υ"
          break;
        case "ὖ":
          letters[letter] = "῏Υ"
          break;
        case "ὒ":
          letters[letter] = "῍Υ"
          break;
        // (asper)
        case "ὑ":
          letters[letter] = "Ὑ"
          break;
        case "ὕ":
          letters[letter] = "Ὕ"
          break;
        case "ὗ":
          letters[letter] = "Ὗ"
          break;
        case "ὓ":
          letters[letter] = "Ὓ"
          break;
        // OMEGA
        // (no spirit)
        case "ω":
          letters[letter] = "Ω"
          break;
        case "ώ":
          letters[letter] = "Ώ"
          break;
        case "ῶ":
          letters[letter] = "῀Ω"
          break;
        case "ὼ":
          letters[letter] = "Ὼ"
          break;
        // Iota
        case "ῳ":
          letters[letter] = "Ωι"
          break;
        case "ῴ":
          letters[letter] = "Ώι"
          break;
        case "ῷ":
          letters[letter] = "῀Ωι"
          break;
        case "ῲ":
          letters[letter] = "Ὼι"
          break;
        // (lenis)
        case "ὠ":
          letters[letter] = "Ὠ"
          break;
        case "ὤ":
          letters[letter] = "Ὤ"
          break;
        case "ὦ":
          letters[letter] = "Ὦ"
          break;
        case "ὢ":
          letters[letter] = "Ὤ"
          break;
        // Iota
        case "ᾠ":
          letters[letter] = "Ὠι"
          break;
        case "ᾤ":
          letters[letter] = "Ὤι"
          break;
        case "ᾦ":
          letters[letter] = "Ὦι"
          break;
        case "ᾢ":
          letters[letter] = "Ὤι"
          break;
        // (asper)
        case "ὡ":
          letters[letter] = "Ὡ"
          break;
        case "ὥ":
          letters[letter] = "Ὥ"
          break;
        case "ὧ":
          letters[letter] = "Ὧ"
          break;
        case "ὣ":
          letters[letter] = "Ὣ"
          break;
        // Iota
        case "ᾡ":
          letters[letter] = "Ὡι"
          break;
        case "ᾥ":
          letters[letter] = "Ὥι"
          break;
        case "ᾧ":
          letters[letter] = "Ὧι"
          break;
        case "ᾣ":
          letters[letter] = "Ὣι"
          break;
        // ΕΤΑ
        // (no spirit)
        case "η":
          letters[letter] = "Η"
          break;
        case "ή":
          letters[letter] = "Ή"
          break;
        case "ῆ":
          letters[letter] = "῀Η"
          break;
        case "ὴ":
          letters[letter] = "Ὴ"
          break;
        // Iota
        case "ῃ":
          letters[letter] = "Ηι"
          break;
        case "ῄ":
          letters[letter] = "Ήι"
          break;
        case "ῇ":
          letters[letter] = "῀Ηι"
          break;
        case "ῂ":
          letters[letter] = "Ὴι"
          break;
        // (lenis)
        case "ἠ":
          letters[letter] = "Ἠ"
          break;
        case "ἤ":
          letters[letter] = "Ἤ"
          break;
        case "ἦ":
          letters[letter] = "Ἦ"
          break;
        case "ἢ":
          letters[letter] = "Ἢ"
          break;
        // Iota
        case "ᾐ":
          letters[letter] = "Ἠι"
          break;
        case "ᾔ":
          letters[letter] = "Ἤι"
          break;
        case "ᾖ":
          letters[letter] = "Ἦι"
          break;
        case "ᾒ":
          letters[letter] = "Ἢι"
          break;
        // (asper)
        case "ἡ":
          letters[letter] = "Ἡ"
          break;
        case "ἥ":
          letters[letter] = "Ἥ"
          break;
        case "ἧ":
          letters[letter] = "Ἧ"
          break;
        case "ἣ":
          letters[letter] = "Ἣ"
          break;
        // Iota
        case "ᾑ":
          letters[letter] = "Ἡι"
          break;
        case "ᾕ":
          letters[letter] = "Ἥι"
          break;
        case "ᾗ":
          letters[letter] = "Ἧι"
          break;
        case "ᾓ":
          letters[letter] = "Ἣι"
          break;
        // END OF ALL VOWELS
        // START ALL
        case "β":
          letters[letter] = "Β"
          break;
        case "γ":
          letters[letter] = "Γ"
          break;
        case "δ":
          letters[letter] = "Δ"
          break;
        case "ζ":
          letters[letter] = "Ζ"
          break;
        case "θ":
          letters[letter] = "Θ"
          break;
        case "κ":
          letters[letter] = "Κ"
          break;
        case "λ":
          letters[letter] = "Λ"
          break;
        case "μ":
          letters[letter] = "Μ"
          break;
        case "ν":
          letters[letter] = "Ν"
          break;
        case "ξ":
          letters[letter] = "Ξ"
          break;
        case "π":
          letters[letter] = "Π"
          break;
        case "ρ":
          letters[letter] = "Ρ"
          break;
        case "ῥ":
          letters[letter] = "Ῥ"
          break;
        case "σ":
          letters[letter] = "Σ"
          break;
        case "ς":
          letters[letter] = "Σ"
          break;
        case "τ":
          letters[letter] = "Τ"
          break;
        case "φ":
          letters[letter] = "Φ"
          break;
        case "χ":
          letters[letter] = "Χ"
          break;
        case "ψ":
          letters[letter] = "Ψ"
          break;
        case "ϝ":
          letters[letter] = "Ϝ"
          break;
        case "ϛ":
          letters[letter] = "Ϛ"
          break;
        case "ͱ":
          letters[letter] = "Ͱ"
          break;
        case "ϻ":
          letters[letter] = "Ϻ"
          break;
        case "ϟ":
          letters[letter] = "Ϟ"
          break;
        case "ϡ":
          letters[letter] = "Ϡ"
          break;
        case "ϸ":
          letters[letter] = "Ϸ"
          break;
      }
    }
  }


  let res = letters.join("")
  return res
}

function tremaMaker(text) {

  let res = text
    .replace(/ι\(τρεμα\)/g, "ϊ")
    .replace(/ί\(τρεμα\)/g, "ΐ")
    .replace(/υ\(τρεμα\)/g, "ϋ")
    .replace(/ύ\(τρεμα\)/g, "ΰ")
    .replace(/\(τρεμα\)/g, "")

  return res
}

function sigmaCorr(text) {

  let res = text
    .replace(/σ\./g, "ς.")
    .replace(/σ·/g, "ς·")
    .replace(/σ;/g, "ς;")
    .replace(/σ\"/g, "ς\"")
    .replace(/σ'/g, "ς'")
    .replace(/σ!/g, "ς!")
    .replace(/σ,/g, "ς,")

  return res
}


document.addEventListener("keydown", (event) => {
  // alert(event.keyCode)
  if (event.keyCode == 13 || event.keyCode == 9) {
    event.preventDefault()
    var text = document.getElementById("copyfield").value;

    window.open("https://gemoll.eu/?q=" + text)
  }
})
