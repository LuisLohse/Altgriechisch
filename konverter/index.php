<!DOCTYPE html>
<html lang="de" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
    <link rel="icon" href="Flagge2.png" type="image/gif" sizes="32x32">
    <title>Der Griechisch Konverter</title>
    <style>
      .centric {
        display: flex;
        justify-content: space-around;
      }

      #version_number {
        position: fixed;
        right: 10px;
        bottom: 6px;
        font-size: 1.5rem;
        color: grey;
      }
    </style>
  </head>
  <body>

    <div id="app" class="container text-center">
      <h1 class="">Der Griechisch Konverter</h1>
      <h3><small>by Luis Lohse</small></h3>
      <!-- <div class="alert alert-danger" role="alert">
        Großes Update: Jetzt mit Großbuchstaben, Diphthongen und Iota Subscripta
      </div> -->
      <hr><br>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-5 col-md-4 col-sm-12 col-xs-12">
            <label>Hier Text eingeben:</label>
            <input type="text" class="form-control" v-model="userInput"><br>
          </div>
          <div class="col-lg-5 col-md-4 col-sm-12 col-xs-12">
            <label>Hier griechischen Text bekommen:</label>
            <input type="text" class="form-control" readonly :value="userInput | greek" id="copyfield"><br>
          </div>
          <div class="col-lg-2 col-md-4 col-sm-12 col-xs-12">
            <label style="color: white;">c</label><br>
            <button type="button" class="btn btn-primary" @click="copy">In die Zwischenablage kopieren</button>
          </div>
        </div>
        <div class="row">
          <div class="col-12 centric">
            <div class="btn btn-success" @click="searchGemoll">Im Gemoll nachschlagen</div>
            <?php if ($_GET["passwort"] == "taubenboy"): ?>
              <div class="btn btn-warning" @click="searchHansi">Hansi Methode aktivieren</div>
            <?php endif ?>
          </div>
        </div>
      </div>
      <br><hr>
      <h3>Wie funktioniert das Ganze?</h3>
      <p class="container">Alle eingegebenen Zeichen werden dynamisch in die polytonischen altgriechischen Buchstaben umgewandelt,
      auch das Setzen von Akzenten wird unterstützt. Die meisten Griechischen Buchstaben werden so geschrieben, wie sie gesprochen werden,
       also wird f zu einem φ, g zu einem γ, usw. <br> Die Anleitungen zum Setzen der Akzente und aller Buchstaben sind hier aufgeführt:
      </p><hr>
      <div class="container">
        <div class="row">
          <div class="col-xs-3">Einfacher Kleinbuchstabe</div>
          <div class="col-xs-3">a</div>
          <div class="col-xs-3">wird zu</div>
          <div class="col-xs-3">α</div>
        </div><br>
        <div class="row">
          <div class="col-xs-3">Einfacher Großbuchtabe</div>
          <div class="col-xs-3">A</div>
          <div class="col-xs-3">wird zu akzentiertem</div>
          <div class="col-xs-3">ά</div>
        </div><br>
        <div class="row">
          <div class="col-xs-3"># + Einfacher Kleinbuchtabe</div>
          <div class="col-xs-3">#i</div>
          <div class="col-xs-3">fügt Zirkumflex hinzu:</div>
          <div class="col-xs-3">ῖ</div>
        </div><br>
        <div class="row">
          <div class="col-xs-3"># + Einfacher Großbuchtabe</div>
          <div class="col-xs-3">#E</div>
          <div class="col-xs-3">fügt Gravis hinzu:</div>
          <div class="col-xs-3">ὲ</div>
        </div><br>
        <div class="row">
          <div class="col-xs-3">* als erstes Zeichen</div>
          <div class="col-xs-3">*a</div>
          <div class="col-xs-3">aspiriert</div>
          <div class="col-xs-3">ἁ</div>
        </div><br>
        <div class="row">
          <div class="col-xs-3">_ nach einem Zeichen</div>
          <div class="col-xs-3">ö_</div>
          <div class="col-xs-3">setzt ein Iota Subscriptum</div>
          <div class="col-xs-3">ῳ</div>
        </div><br>
        <div class="row">
          <div class="col-xs-3">Diphthonge</div>
          <div class="col-xs-3">*aI</div>
          <div class="col-xs-3">funktionieren:</div>
          <div class="col-xs-3">αἵ</div>
        </div><br>
        <div class="row">
          <div class="col-xs-3">- im Diphthong</div>
          <div class="col-xs-3">*a-I</div>
          <div class="col-xs-3">separiert ihn</div>
          <div class="col-xs-3">ἁί</div>
        </div><br>
        <div class="row">
          <div class="col-xs-3">+ vor einem Ausdruck</div>
          <div class="col-xs-3">+*#Ö</div>
          <div class="col-xs-3">macht ihn zu einem Großbuchstaben</div>
          <div class="col-xs-3">Ὣ</div>
        </div><br>
        <div class="row">
          <div class="col-xs-3">(trema) nach ι/ί oder υ/ύ</div>
          <div class="col-xs-3">i(trema)</div>
          <div class="col-xs-3">setzt ein Trema:</div>
          <div class="col-xs-3">ϊ</div>
        </div><br>
        <hr>
        <h4>Alle Zeichen:</h4>
        <hr>

        <div class="row">
          <div class="col-xs-2">α</div>
          <div class="col-xs-2">β</div>
          <div class="col-xs-2">γ</div>
          <div class="col-xs-2">δ</div>
          <div class="col-xs-2">ε</div>
          <div class="col-xs-2">ζ</div>
        </div>
        <div class="row">
          <div class="col-xs-2">a</div>
          <div class="col-xs-2">b</div>
          <div class="col-xs-2">g</div>
          <div class="col-xs-2">d</div>
          <div class="col-xs-2">e</div>
          <div class="col-xs-2">z</div>
        </div><br>
        <div class="row">
          <div class="col-xs-2">η</div>
          <div class="col-xs-2">θ</div>
          <div class="col-xs-2">ι</div>
          <div class="col-xs-2">κ</div>
          <div class="col-xs-2">λ</div>
          <div class="col-xs-2">μ</div>
        </div>
        <div class="row">
          <div class="col-xs-2">ä</div>
          <div class="col-xs-2">th</div>
          <div class="col-xs-2">i</div>
          <div class="col-xs-2">k</div>
          <div class="col-xs-2">l</div>
          <div class="col-xs-2">m</div>
        </div><br>
        <div class="row">
          <div class="col-xs-2">ν</div>
          <div class="col-xs-2">ξ</div>
          <div class="col-xs-2">ο</div>
          <div class="col-xs-2">π</div>
          <div class="col-xs-2">ρ</div>
          <div class="col-xs-2">σ</div>
        </div>
        <div class="row">
          <div class="col-xs-2">n</div>
          <div class="col-xs-2">x</div>
          <div class="col-xs-2">o</div>
          <div class="col-xs-2">p</div>
          <div class="col-xs-2">r</div>
          <div class="col-xs-2">s</div>
        </div><br>
        <div class="row">
          <div class="col-xs-2">τ</div>
          <div class="col-xs-2">υ</div>
          <div class="col-xs-2">φ</div>
          <div class="col-xs-2">χ</div>
          <div class="col-xs-2">ψ</div>
          <div class="col-xs-2">ω</div>
        </div>
        <div class="row">
          <div class="col-xs-2">t</div>
          <div class="col-xs-2">y</div>
          <div class="col-xs-2">f</div>
          <div class="col-xs-2">ch</div>
          <div class="col-xs-2">#p</div>
          <div class="col-xs-2">ö</div>
        </div><br>
      </div>
    </div>
    <hr>
    <div class="container" style="color: grey">
      <h4 class="text-center">Veraltete Buchstaben:</h4><br>
      <div class="row">
        <div class="col-xs-3">
          w [Digamma]
        </div>
        <div class="col-xs-3">
          ϝ
        </div>
        <div class="col-xs-3">
          (stigma)
        </div>
        <div class="col-xs-3">
          ϛ
        </div>
      </div><br>
      <div class="row">
        <div class="col-xs-3">
          (heta)
        </div>
        <div class="col-xs-3">
          ͱ
        </div>
        <div class="col-xs-3">
          (san)
        </div>
        <div class="col-xs-3">
          ϻ
        </div>
      </div><br>
      <div class="row">
        <div class="col-xs-3">
          (koppa)
        </div>
        <div class="col-xs-3">
          ϟ
        </div>
        <div class="col-xs-3">
          (sampi)
        </div>
        <div class="col-xs-3">
          ϡ
        </div>
      </div><br>
      <div class="row">
        <div class="col-xs-3">
          (scho)
        </div>
        <div class="col-xs-3">
          ϸ
        </div>
      </div>
    </div><br><br>

    <footer>
       <small id="version_number">(v3.8)</small>
    </footer>
  </body>
  <script src="App.js" charset="utf-8"></script>
</html>
