const valeursFinales = new Map(); // Map de tous les channes trouvés dans le json (Outils["TikTok"] = 100)
var stepBarreNav = 0; // Calculé à l'initialisation (100 / nombre de questions -1)
var myChart = {};     // référence au graph.
const influenceurs = new Map();   // stock les influenceurs (temps, argent)
const MAX_STARS = 6;


// *** Fonction qui crée les étoiles ***
// On crée les étoiles en fonction de la réponse courante

function creationEtoiles(reponseActuelle) {
  if (reponseActuelle != null) {
    reponseActuelle = eval(reponseActuelle);
  }
  var html = "";
  for ($i = MAX_STARS; $i > 0; $i--) {
    var checked = reponseActuelle == $i ? " checked " : ""
    html += '<input class="star star-' + $i + '" id="star-' + $i + '" type="radio" ' + checked + ' value="' + $i + '" name="star" />';
    html += '<label class="star star-' + $i + '" for="star-' + $i + '"></label>';
  }
  return html;
}


// *** Fonction qui affiche la question ***
// On récupère la question actuelle, on affiche le texte, on récupère les réponses, on les affiche.
// Si la question est de type "text" ou "influenceurs", on crée une liste de réponses
// Si la question est de type "etoiles", on crée les étoiles

function afficheQuestion(no) {
  var questionActuelle = questions[no];
  // On fait en sorte qu'a la question 2, la réponse de la question 1 soit biffé
  // On empèche ainis une réponse indentique pour le public actuel et le public cible
  var aBiffer = null;
  if (no == 1) {
    aBiffer = questions[no - 1].reponse;
  }
  document.querySelector(".question").innerHTML = "<h1>" + questionActuelle.text + "</h1>";

  var toutesLesReponses = questionActuelle.reponses;
  // Si on y a déja répondu, la réponse est dans reponseActuelle
  var reponseActuelle = questionActuelle.reponse;
  var displayType = questionActuelle.type;
  if (displayType == "text" || displayType == "influenceurs") {

    // On crée un "<ul id = "optionList"/>" (object)
    var listeReponseUL = '<ul class="reponses" id = "optionList">';
    // listeReponseUL.setAttribute('id', 'optionList');
    for (var i = 0; i < toutesLesReponses.length; i++) {
      // Si reponseActuelle est la réponse courante, on la check
      var checked = (toutesLesReponses[i].text == reponseActuelle) ? " checked " : "";
      // Si reponseActuelle est la réponse de la question 1, on la biffe
      var disabled = (toutesLesReponses[i].text == aBiffer) ? " disabled " : "";
      var text = toutesLesReponses[i].text;
      var uneReponseHtml = '<li class="myoptions">' +
        '<input value="' + text + '"' + checked + disabled + ' name="optRdBtn" type="radio" id="' + i + '">' +
        '<label class="oneanswer ' + disabled + '" for="' + i + '">' + text + '</label>' +
        '<div class="bullet">' +
        '</div>' +
        '</li>';
      listeReponseUL += uneReponseHtml;
    }
    listeReponseUL += "</ul>";
    document.querySelector(".stars").innerHTML = '';
    document.querySelector(".reponses").innerHTML = listeReponseUL;
  } else {
    var startsCode = creationEtoiles(reponseActuelle);
    console.log(startsCode);
    document.querySelector(".reponses").innerHTML = '';
    document.querySelector(".stars").innerHTML = startsCode;
  }
}


// *** Fonction qui change la valeur de la barre de progression ***
// On ajoute ou on retire la valeur de la barre de progression

function changeValeurPogress(index, forward) {
  var progressVal = document.querySelector('progress').value;
  if (forward) {
    progressVal += stepBarreNav;
  } else {
    progressVal -= stepBarreNav;
  }
  document.querySelector('progress').value = progressVal;
  // On change le look de la barre de progression en utilisant la classe "active"
  if (forward) {
    document.querySelector('.my-progress-indicator.progress_' + (index + 1))
      .classList.add('active');

  } else {
    document.querySelector('.my-progress-indicator.progress_' + (index + 2))
      .classList.remove('active');
  }
}


// *** FUNCTION INIT() ***

// STEP 1 : INITIALISATION
function init() {
  // Calcul de la distance entre chaque point de la barre de progression (100 / nombre)
  stepBarreNav = 100 / (questions.length - 1);
  questions.forEach(uneQuestion => {
    // Si structure de code avec "reponses", on parcour toutes les reponses
    if (uneQuestion.reponses != null) {
      uneQuestion.reponses.forEach(uneReponse => {
        // si une reponse à des impacts, on parcour toutes les clés des impact (outil)
        if (uneReponse.impacts != null) {
          Object.keys(uneReponse.impacts).forEach(unImpact => {
            // On prépare la map des résultats (outil = valeur) et on les met tous à 0 (point de départ)
            valeursFinales[unImpact] = 0;
          })
        }
      })
    } else if (uneQuestion.impacts != null) {
      Object.keys(uneQuestion.impacts).forEach(unImpact => {
        // On prépare la "map" des résultats (outil = valeur) et on les met tous à 0
        valeursFinales[unImpact] = 0;
      })

    }
  })

  // STEP 2 : CREATION DU GRAPH
  const monGraphCanvas = document.getElementById('myChart');
  // Documentation de Chart.js : 
  // https://www.chartjs.org/docs/latest/charts/polar.html
  myChart = new Chart(monGraphCanvas, {
    type: 'polarArea',
    data: {
      labels: Object.keys(valeursFinales),
      datasets: [{
      data: Object.values(valeursFinales)
      }],
    },

    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100,
          display: true,
        }
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Outils - pertinence'
        }
      }
    },
  });

  // Mise à jour du graph
  myChart.update();


  // STEP 3 : PRPARATION DE LA BARRE DE PROGRESSION
  var length = questions.length;
  var progressbarhtml = '<progress class="my-progress-bar" min="0" max="100" value="0" step="' + length + '"></progress>';
  var pos = 0;
  for (var i = 0; i < length; i++) {
    progressbarhtml += '<div class="my-progress-indicator progress_' + (i + 1) + ' ' + ((i == 0) ? "active" : "") + '" style="left:' + pos + '%"></div>';
    pos += stepBarreNav;
  }
  document.querySelector(".my-progress").innerHTML = progressbarhtml;
  afficheData();

}


// *** FUNCTION TRAITEMENTREPONSE() ***

function traitementReponse(noQuestion, reponse) {
  // Stockage de la réponse dans la question
  questions[noQuestion].reponse = reponse;
  // Réinitialisation des valeurs finales et des influenceurs
  Object.keys(valeursFinales).forEach(key => {
    valeursFinales[key] = 0;
  });
  Object.keys(influenceurs).forEach(key => {
    influenceurs[key] = 0;
  });
  // Re-clacul des valeurs finales
  questions.forEach(uneQuestion => {
    if (uneQuestion.type == "text") {
      traitementRepText(uneQuestion);
    } else if (uneQuestion.type == "influenceurs") {
      traitementRepInfluenceurs(uneQuestion);
    }
  });

  // Appel de la fonction qui traite les valeurs (etoiles)
  traitementRepEtoiles();
  // Mise à jour du graph
  majGraph();
  // Mise à jour du tableau
  afficheData();
  // Gestion des boutons en fonction de la question courante
  majButtons(noQuestion);

}

// *** Fonction qui retourne la dernière question ***

// Si on a pas encore répondu à la question "temps disponible" ou si on a du temps
// On retourne la dernière question
// Sinon, on retourne la dernière question qui n'est pas du type "étoile"

function getLastQuestion() {
  if (influenceurs["$time"] == null || influenceurs["$time"] > 0) {
    // On a pas encore repondu au temps disponnible OU on a du temps
    return questions.length - 1;
  }
  var ret = 0;
  while (questions[ret].type != "etoiles") {
    ret++;
  }
  return ret - 1;
}

// *** Fonction qui met à jour les boutons en fonction de la question actuelle ***
// Si la question actuelle est la dernière, on active le bouton "envoyer"
// La dernière peut varié en fonction de la réponse à la question "temps disponible"

function majButtons(noQuestion) {
  var lastQuestion = getLastQuestion();
  // Si la question courante est la dernière, on active le bouton "envoyer"
  if (questions[lastQuestion].reponse != null) {
    document.querySelector("#submit").classList.remove('disabled');
    document.querySelector("#submit").disabled = false;
  } else {
    document.querySelector("#submit").classList.add('disabled');
    document.querySelector("#submit").disabled = true;
  }
  // Si la question courante est inférieure à la dernière et que la réponse est différente de null, on active le bouton "suivant"
  if (noQuestion < lastQuestion && questions[noQuestion].reponse != null) {
    document.querySelector("#next").classList.remove("disabled");
    document.querySelector("#next").disabled = false;
  } else {
    document.querySelector("#next").classList.add("disabled");
    document.querySelector("#next").disabled = true;
  }
  // Si la question courante est supérieure à 0, on active le bouton "précédent"
  if (noQuestion > 0) {
    document.querySelector("#previous").classList.remove("disabled");
    document.querySelector("#previous").disabled = false;
  } else {
    document.querySelector("#previous").classList.add("disabled");
    document.querySelector("#previous").disabled = true;
  }
}


// *** Fonction qui traite les réponses de type "etoiles" ***

// Parcours des questions, si la question est de type "etoiles", on calcule les impacts
// On parcours les impacts, on calcule le facteur final, on le multiplie par le coef.
// On met à jour les valeurs finales

function traitementRepEtoiles() {
  // On récupère les valeurs des influenceurs
  var timeAvailable = influenceurs["$time"] != null ? influenceurs["$time"] : 0;
  var money = influenceurs["$money"] != null ? influenceurs["$money"] : 0;
  // On récupère les canaux, on les parcours et on calcule les impacts
  var outils = Object.keys(valeursFinales);
  outils.forEach(unOutil => {
    var nbValeurs = 0;
    var facteurFinal = 0;

    questions.forEach(uneQuestion => {
      if (uneQuestion.type == "etoiles") {
        var impactOutils = Object.keys(uneQuestion.impacts);
        if (impactOutils.includes(unOutil)) {
          // Pour chaque question de type "etoiles", on récupère la réponse, on la stock dans "reponse"
          var reponse = uneQuestion.reponse;
          if (reponse == null) {
            reponse = 0;
          }

          var etoileSelect = Math.max(eval(reponse) - 1, 0);
          if (timeAvailable == 0) {
            etoileSelect = 0;
          } else {
            etoileSelect += timeAvailable;
          }

          etoileSelect += money;
          if (etoileSelect <= 0) {
            return; // Rien a faire
          }

          etoileSelect = Math.min(etoileSelect, (MAX_STARS - 1));
          var facteur = (100 + etoileSelect / (MAX_STARS - 1) * 100) / 100;
          var coef = uneQuestion.impacts[unOutil];

          facteurFinal += facteur * coef;
          nbValeurs++;

        }
      }
    })

    // On calcule la moyenne des facteurs pour chaque canal et on met à jour les valeurs finales
    if (nbValeurs > 0) {
      var moyenneFacteur = facteurFinal / nbValeurs;
      valeursFinales[unOutil] *= moyenneFacteur;
      //console.log(unOutil + " : Facteur = " + moyenneFacteur + ", nb impacts : " + nbValeurs);
    }
  })
  //console.log("---------------------------");
}


// *** Fonction qui traite les réponses de type "influenceurs" ***

// Parcours des réponses, si la réponse est trouvée, on stock la valeur à modifier dans la map "infuenceurs"
// sinon on quitte la boucle

function traitementRepInfluenceurs(question) {
  var reponse = question.reponse;
  if (reponse == null) {
    return;
  }
  var variable = question.variable; // eg "$time" ou "$money"
  question.reponses.forEach(uneReponse => {
    if (uneReponse.text == reponse) {
      var modif = uneReponse.value;
      influenceurs[variable] = modif;  // stock la valeur à modifier dans le tableau "influenceurs" 
      return;  // quitte la boucle
    }
  })
}

// *** Fonction qui traite les réponses de type "text" ***

// Parcours des réponses, si la réponse est trouvée, on applique les impacts, 
// sinon on quitte la boucle
function traitementRepText(question) {
  var reponse = question.reponse;
  if (reponse == null) {
    return;
  }
  question.reponses.forEach(uneReponse => {
    if (uneReponse.text == reponse) {
      if (uneReponse.impacts != null) {
        Object.entries(uneReponse.impacts).forEach(impact => {
          var outil = impact[0];
          var modif = impact[1];
          valeursFinales[outil] += modif;
        })
      }
      return;
    }
  })

}

// *** Fonction qui met à jour le graph ***

// Parcours des valeurs finales, on les met à jour dans le graph

function majGraph() {
  var scaledData = scaleOn0to100(valeursFinales);
  //var scaledData = valeursFinales;
  var values = Object.values(scaledData);
  for (var i = 0; i < values.length; i++) {
    myChart.data.datasets[0].data[i] = values[i];
  }
  myChart.update();
}


// *** Fonction qui met à jour les valeurs sur une échelle de 0 à 100 ***
// (Permet de les afficher dans le tableau sans que des valeurs négatives ou trop grandes ne faussent le tableau)

// Copie des valeurs, on les met sur une échelle de 0 à 100,
// on cherche le min et le max des valeurs, on les met sur une base 0,
// puis, on calcule le ratio pour les mettre sur une base 100
// On retourne les valeurs

function scaleOn0to100(outils) {
  // Pas modifier les tables original
  var clone = Object.assign({}, outils);
  var values = Object.values(clone);
  var names = Object.keys(clone);
  var min = Number.MAX_VALUE;
  var max = Number.MIN_VALUE;
  for ($i = 0; $i < values.length; $i++) {
    if (min > values[$i]) {
      min = values[$i];
    }
    if (max < values[$i]) {
      max = values[$i];
    }
  }

  // Tout sur une base 0
  if (min < 0) {
    max -= min;
    names.forEach($key => {
      clone[$key] -= min;
    });
  }
  // Tout sur une base 100
  if (max > 100) {
    var ratio = 100 / max;
    if (ratio != 1) {
      names.forEach($key => {
        clone[$key] = Math.round(clone[$key] * ratio);

      });
    }
  }
  return clone;
}


// *** Fonction qui affiche les données dans le tableau ***

// Permet de voir les valeurs finales des canaux
// Parcours des valeurs et affichagee dans le tableau

function afficheData() {
  var html = '<table border="0">';
  html += "<th></th>";
  html += "<th align='right'>&nbsp;Valeur</th>";
  html += "<th align='right'>&nbsp;Graph</th>";

  var noms = Object.keys(valeursFinales)
  var valeurs = Object.values(valeursFinales)
  // map remise sur une echelle de 0 a 100
  var scaledData = scaleOn0to100(valeursFinales);
  // que les valeurs
  var valeurSur100 = Object.values(scaledData)

  for ($i = 0; $i < noms.length; $i++) {
    html += "<tr>";
    html += "<td>" + noms[$i] + "</td>";
    html += "<td align='right'>" + Math.round(valeurs[$i]) + "</td>";
    html += "<td align='right'>" + Math.round(valeurSur100[$i]) + "</td>";
    // html += "<td class='red' align='right'>" + (variance[$i] != 0 ? variance[$i] : "") + "</td>";
    html += "</tr>";
    // console.log(html);
  }
  html += "</table>";
  // (jQuery) identique à innerHTML = ...
  document.querySelector(".dataArea").innerHTML = html;
}




// *** POINT D'ENTREE ***
//Le DOM est pret, tout est loadé  

function setupPage() {
  init();
  var noQuestion = 0;
  afficheQuestion(noQuestion);

  document.querySelector(".reponses").onclick = function (e) {
    const input = e.target.closest('.myoptions>input');
    var reponse = input.value;
    traitementReponse(noQuestion, reponse);
  }

  // Au click sur une étoile ;
  document.querySelector(".stars").onclick = function (e) {
    const input = e.target.closest('input');
    var reponse = input.value;
    traitementReponse(noQuestion, reponse);
  };

  // Au click sur le bouton "suivant" ;
  document.querySelector("#next").onclick = function (e) {
    noQuestion++;
    majButtons(noQuestion);
    while (questions[noQuestion].type == "etoiles" && influenceurs["$time"] == 0) {
      noQuestion++;
    }
    afficheQuestion(noQuestion);
    changeValeurPogress(noQuestion, true);
  };

  // Au click sur le bouton "précédent" ;
  document.querySelector("#previous").onclick = function (e) {
    noQuestion--;
    majButtons(noQuestion);
    while (questions[noQuestion].type == "etoiles" && influenceurs["$time"] == 0) {
      noQuestion--;
    }
    afficheQuestion(noQuestion);
    changeValeurPogress(noQuestion, false);
  };

  // Au click sur le bouton "envoyé" ;
  document.querySelector("#submit").onclick = function (e) {
    creeRapport(); // dans rapport.js
    document.querySelector(".pageQuestions").classList.add("hidden");
    document.querySelector(".pageRapport").classList.remove("hidden");
  };

  // Au click sur le bouton "retour" du rapport ;
  document.querySelector("#retour").onclick = function (e) {
    document.querySelector(".pageQuestions").classList.remove("hidden");
    document.querySelector(".pageRapport").classList.add("hidden");
  };
};





