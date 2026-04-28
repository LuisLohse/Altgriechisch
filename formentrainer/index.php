<!DOCTYPE html>
<html lang="de" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
        <link rel="stylesheet" href="./css/master.css">
        <link rel="stylesheet" href="./css/card.css">
        <link rel="stylesheet" href="./css/table.css">
        <link rel="stylesheet" href="./css/button.css">
        <link rel="stylesheet" href="./css/answerText.css">
        <link rel="stylesheet" href="./css/selectors.css">
        <link rel="stylesheet" href="./css/title.css">
        <link rel="stylesheet" href="./css/help.css">
        <link rel="icon" href="./src/favicon.png">

        <title>Der Altgriechisch-Formentrainer</title>
    </head>

    <body>
        <h1>Der Altgriechisch-Formentrainer</h1>


        <!-- RANGE SLIDER AND STUFF -->
        <div id="selector">
          <div id="range_over">
            <div id="section_lection_text">
              <span>Lektion: </span>
            </div>
            <div id="range_contain">
              <input type="range" min="6" max="90" value="90" onchange="alterLectionSpan()" oninput="alterLectionSpan()">
              <span>&gt; 90</span>
            </div>
          </div>
          <div id="narrow_contain">
            <form>
              <input type="radio" name="narrow" value="all"><span>Alle Wörter</span>
              <input type="radio" name="narrow" value="verb"><span>Nur Verben</span>
              <input type="radio" name="narrow" value="nomen"><span>Nur Nomen-ähnliche Wörter</span>
            </form>
          </div>
        </div>

        <!--VOCABULARY CARD-->
        <div id="card">
          <span id="greek_word">
          </span>
        </div>

        <!-- TABLE -->
        <form id="table_form">
          <table>
              <tr>
                  <th>Person</th>
                  <th>Kasus</th>
                  <th>Numerus</th>
                  <th>Genus</th>
                  <th>Tempus</th>
                  <th>Modus</th>
                  <th>Genus Verbi</th>
              </tr>
              <tr>
                  <td><input class="input_table" type="radio" name="a_person" value="1"> 1. Ps.</td>
                  <td><input class="input_table" type="radio" name="a_casus" value="Nominativ"> Nominativ</td>
                  <td><input class="input_table" type="radio" name="a_numerus" value="Sg"> Sg</td>
                  <td><input class="input_table" type="radio" name="a_genus" value="m"> m.</td>
                  <td><input class="input_table" type="radio" name="a_time" value="Präsens"> Präsens</td>
                  <td><input class="input_table" type="radio" name="a_modus" value="Indikativ"> Indikativ</td>
                  <td><input class="input_table" type="radio" name="a_genV" value="Aktiv"> Aktiv</td>
              </tr>
              <tr>
                  <td><input class="input_table" type="radio" name="a_person" value="2"> 2. Ps.</td>
                  <td><input class="input_table" type="radio" name="a_casus" value="Genitiv"> Genitiv</td>
                  <td><input class="input_table" type="radio" name="a_numerus" value="Pl"> Pl</td>
                  <td><input class="input_table" type="radio" name="a_genus" value="f"> f.</td>
                  <td><input class="input_table" type="radio" name="a_time" value="Imperfekt"> Imperfekt</td>
                  <td><input class="input_table" type="radio" name="a_modus" value="Konjunktiv"> Konjunktiv</td>
                  <td><input class="input_table" type="radio" name="a_genV" value="Medium"> Medium</td>
              </tr>
              <tr>
                  <td><input class="input_table" type="radio" name="a_person" value="3"> 3. Ps.</td>
                  <td><input class="input_table" type="radio" name="a_casus" value="Dativ"> Dativ</td>
                  <td></td>
                  <td><input class="input_table" type="radio" name="a_genus" value="n"> n.</td>
                  <td><input class="input_table" type="radio" name="a_time" value="Aorist"> Aorist</td>
                  <td><input class="input_table" type="radio" name="a_modus" value="Imperativ"> Imperativ</td>
                  <td><input class="input_table" type="radio" name="a_genV" value="Passiv"> Passiv</td>
              </tr>
              <tr>
                  <td></td>
                  <td><input class="input_table" type="radio" name="a_casus" value="Akkusativ"> Akkusativ</td>
                  <td></td>
                  <td></td>
                  <td><input class="input_table" type="radio" name="a_time" value="Perfekt"> Perfekt</td>
                  <td><input class="input_table" type="radio" name="a_modus" value="Optativ"> Optativ</td>
                  <td></td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><input class="input_table" type="radio" name="a_time" value="Plusquamperfekt"> Plusquamperfekt</td>
                  <td><input class="input_table" type="radio" name="a_modus" value="Infinitiv"> Infinitiv</td>
                  <td></td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><input class="input_table" type="radio" name="a_time" value="Futur"> Futur</td>
                  <td><input class="input_table" type="radio" name="a_modus" value="Partizip"> Partizip</td>
                  <td></td>
              </tr>
          </table>
        </form>

        <!-- Button -->
        <div id="button_container">
          <div id="submit_button" class="btn btn-primary" onclick="correcting()">
            Überprüfen!
          </div>
          <div id="new_button" class="btn btn-success" onclick="newWord()">
            Neues Wort!
          </div>
        </div>

        <!-- Text -->
        <div id="ans_field">
          <p>
          <span id="ans_person"></span> <span id="ans_casus"></span> <span id="ans_numerus"></span> <span id="ans_genus"></span> <span id="ans_tempus"></span> <span id="ans_modus"></span> <span id="ans_genV"></span>
          </p>

          <p>
          <span id="ans2_person"></span> <span id="ans2_casus"></span> <span id="ans2_numerus"></span> <span id="ans2_genus"></span> <span id="ans2_tempus"></span> <span id="ans2_modus"></span> <span id="ans2_genV"></span>
          </p>

          <p>
          <span id="ans3_person"></span> <span id="ans3_casus"></span> <span id="ans3_numerus"></span> <span id="ans3_genus"></span> <span id="ans3_tempus"></span> <span id="ans3_modus"></span> <span id="ans3_genV"></span>
          </p>
        </div>
        <br><br>

        <div id="help_field">
          <span>?</span>
        </div>

        <div id="help_popUp">
          <div id="inner_popUp">
            <h2 style="text-align: center">Etwas Hilfe gefällig?</h2>
            <span>Funktioniert etwas nicht richtig? Stimmt eine Form nicht?
              Hast du Vorschläge zur Verbesserung dieses Projekts? <br>
              Melde dich gerne bei mir, damit ich mich darum kümmern kann!
              Am besten schreibst du mir auf Teams (Luis Lohse), oder eine E-Mail
              (lohse.luis@yahoo.com). <br><br>

              Du kannst keine Formen auswählen? Klick hier: <br>
              <a href="https://www.altgriechisch-lohse.de/formentrainer/index.php?v=a">Alternativ-version</a>
            </span>
          </div>
        </div>

    </body>

    <footer>
        <!-- Scripts -->
        <?php if ($_GET['v'] == "a"): ?>

        <?php else: ?>
          <script src="./js/radio.js"></script>
        <?php endif ?>
        <script src="./js/request.js"></script>
        <script src="./js/app.js"></script>
        <script src="./js/populate.js"></script>
        <script src="./js/selectors.js"></script>
        <script src="./js/enterControl.js"></script>
        <script src="./js/helpField.js"></script>
        <?php include "./php/viewCount.php"?>

        <!-- Info -->
        <!-- Author: Luis Lohse, lohse.luis@yahoo.com, https://lohse-und-lohse.de -->
    </footer>
</html>
