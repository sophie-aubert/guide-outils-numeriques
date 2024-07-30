function creeRapport() {
	var rapport = "";
	// On ajoute des paragraphes "Accueil" et "Résultat
	rapport += "<p>" + resultat1 + "</p>";
	rapport += '<ul class="listoutils">';
	rapport += '<li class="rapport"><button class = "rapport" onclick="showPopup(\'siteweb\')">Site Web</button></li><br><br><br>';
	rapport += "</ul>"
	rapport += "<p>" + resultat2 + "</p>";
	rapport += '<ul class="listoutils">';
	rapport += '<li class="rapport"><button class = "rapport" onclick="showPopup(\'googleBusinessProfile\')"> Google Business Profile </button></li><br><br><br>';
	rapport += "</ul>"

	// On met les valeurs sur 100
	var resultatSur100 = scaleOn0to100(valeursFinales);
	// On affiche les différents textes en fonction des valeurs
	if (resultatSur100["Newsletter"] >= 70) {
		rapport += "<p>" + newsletters + "</p>";
		rapport += '<ul class="listoutils">';
		rapport += '<li class="rapport"><button onclick="showPopup(\'Newsletter\')"> Newsletter </button></li><br><br><br>';
	}
	rapport += "<p>" + mediaSociaux + "</p>";
	if (influenceurs["$temps"] >0  || influenceurs["$money"] > 0) {
		rapport += "<p>" + ifCapacite + "</p>";
	} else {
		rapport += "<p>" + ifPasCapacite + "</p>";
	}
	// On trie les valeurs pour afficher les canaux les plus importants en premier
	// https://stackoverflow.com/questions/37982476/how-to-sort-a-map-by-value-in-javascript
	const valeursFinalesTriee = new Map([...Object.entries(resultatSur100)].sort((a, b) => b[1] - a[1]));
	// On crée une liste pour afficher les canaux les plus importants
	rapport += '<ul class="listoutils">';
	valeursFinalesTriee.forEach((value, key) => {
		if (value >= 70 && key != "Newsletter") {
			rapport += '<li><button onclick="showPopup(\'' + key + '\')">' + key + '</button></li>'
		}
	})
	rapport += "</ul>"
	// On affiche les conseils
	rapport += "<p>" + conseils + "</p>";
	// On met le résultat dans le document
	document.querySelector(".rapport").innerHTML = rapport;
}


// Gestion des pop-ups
var popup = document.getElementById('popup-wrapper');
var close = document.getElementById("close");

function showPopup(cannal) {
	// On obtient le contenu d'une check-list pour un canal donné
	var contents =  checkList[cannal];
	document.getElementById("popup-text").innerHTML =   contents 
	popup.classList.add('show');
}
// fermer le popup (croix)
close.onclick = function () {
	popup.classList.remove('show');
}
// fermer le popup en cliquant en dehors
window.onclick = function (event) {
	if (event.target == popup) {
		popup.classList.remove('show');
	}
}


const resultat1 = `<h1 class = "rapport"> Merci d’avoir pris le temps de répondre aux différentes questions de ce guide !<br>
  Vous trouverez ci-dessous le résumé et les explications des outils numériques que vous devriez utiliser pour votre commerce : </h1><br>
  <h2 class = "rapport"> Site web </h2>
  <p class = "rapport"> Ce canal vous est proposé indépendamment de vos réponses en raison de son importance ! <br><br>
  Investir dans un site internet est primordial pour votre commerce car il constitue votre vitrine numérique. Imaginez votre site web comme la devanture de votre boutique, toujours accessible, ouverte 24 heures sur 24 et 7 jours sur 7. <br><br>
  83% des consommateurs suisses réalisent leurs achats à l’aide d’appareils numériques. Cela signifie que depuis leur ordinateur ou leur téléphone, ces derniers recherchent diverses informations telles que les produits que vous proposez, \
  l’adresse de votre commerce ou encore vos horaires d’ouverture. Sans site Internet, vous passez à côté d'une énorme opportunité d’informer et d’attirer ces clients. 
  <br><br>Un site web (bien conçu !) permet alors de présenter vos produits, de partager des informations importantes, et de répondre aux questions des clients potentiels, le tout dans un espace où vous avez un contrôle total sur l'image de votre marque.
 <br>
  </p>`;

const resultat2 = `<h2 class = "rapport"> Google Business Profile </h2>\
<p class = "rapport"> Ce canal vous est proposé indépendamment de vos réponse en raison de son importance <br><br>\
Tout comme le site internet, « Google Business Profile » est un canal gratuit et incontournable pour votre commerce.\
Ce dernier permet de mettre en avant les informations importantes concernant votre commerce (site web, adresse, contact, …) \
selon les recherches des utilisateurs. <br><br> De plus, « Google » est le moteur de recherche le plus utilisé en Suisse avec 91,66 % d’utilisation en 2022 ! \
Il serait bien dommage de ne pas profiter de cet impact pour mettre en avant votre commerce.<br>\
<br><br> Il est également important de savoir que la création de votre fiche peut se faire automatiquement et sans votre accord. En prenant en compte les informations disponibles sur Internet et \
« Google Maps », il est possible que « Google » vous génère automatiquement un profil. L’importance de prendre vous-même en main la gestion de cet outil est\
 alors primordiale pour garder le contrôle de vos informations ! 
  <br>
  </p>`;

//****************************
//IF : Newsletter score à plus de 70
//****************************
const newsletters = `<h2 class = "rapport"> Newsletter </h2>\
<p class = "rapport"> Une newsletter est un e-mail envoyé afin de diffuser des informations relatives à son activité. Cet outil s'adresse à une liste de destinataires ayant souscrit à l'envoi d'e-mails marketing volontairement et\
 est un outil puissant pour maintenir le contact avec eux, partager des informations importantes, et promouvoir vos produits.\
 Elles permettent ainsi d’encourager vos clients à revenir en boutique et de les fidéliser. Selon vos résultats, vous avez les capacités à profiter pleinement de cet outil. 
<br>
</p>`;

//****************************
//GÉNÉRÉ DE TOUTE FACON
//****************************
const mediaSociaux = `<h2 class = "rapport"> Médias Sociaux </h2>\
<p class = "rapport"> 75% des Suisses utiliseraient les médias sociaux au quotidien ! Imaginez alors tous les avantages que cela pourrait offrir à votre commerce.\
 Entre attirer de nouveaux clients, fidéliser ceux déjà acquis, interagir avec eux ou encore engager de nouveaux collaborateurs, tous ces outils peuvent vous offrir une réelle plus-value.\
  </p>`

//****************************
//IF temps (donc capacités) OU Budget (donc capacités)
//****************************
const ifCapacite = `<p class = "rapport">L’âge de votre clientèle (et/ou de votre clientèle cible)\
 est le facteur principal définissant les outils numérique à adopter. De plus, selon le temps que\
  vous pouvez mettre à disposition et/ou le budget que vous êtes prêt(e) à investir, vous avez les\
   capacités de profiter pleinement de : </p>`

//[Liste des canaux dépassant score de 70] + bouton à chaque :  Voir la check-list


//****************************
//IF Pas temps pas ET pas budget :
//****************************			
const ifPasCapacite = `<p class = "rapport"> Cependant, le temps et le budget pouvant \
être mis à disposition de ces différents outils influent directement sur les capacités à tirer\
 pleinement de leurs avantages. Selon vos réponses, l’utilisation des médias sociaux pour votre\
  commerce n’est peut-être pas pertinent. S'il est possible pour vous de déléguer la gestion de ces outils ou de \
  vous libérer du temps pour les gérer, alors l'outil le plus pertinent serait : \
  </p>`


//****************************
//GÉNÉRÉ DE TOUTE FACON
//****************************
const conseils = `<h2 class = "rapport"> Commerce en ligne ? </h2>\
<p class = "rapport">Mettre en place un site e-commerce, c’est comme ouvrir une nouvelle boutique. Cela peut être \
un réel avantage mais ce guide ne peut malheureusement pas vous conseiller (ou non) la mise en place\
 d’un tel outils. En effet plusieurs éléments importants doivent être prise en considération tels que : <br><br>\

1.	La concurrence et les géants du web<br>\
Le marché Suisse est petit et déjà âprement disputé par la concurrence du commerce en ligne. \
De plus, des géants tels que « Zalando », « Amazon » ou encore « Galaxus » arrosent le marché avec des \
retours « offerts » et de gros rabais. Un analyse plus poussée sur le marché actuel est nécessaire. <br>\
<br>\
2.	S’adapter aux prix<br>\
Les géants de la vente en ligne ont un avantage sur les prix de leurs produits \
ce qui n’est pas négligeable pour les clients. Ce phénomène est facilité par les salaires\
 relativement bas de la branche logistique, mais également grâce aux effets d’échelle à l’achat.\
  Alors que vous devez prendre en compte tous les frais variables et fixes de votre commerce, les\
   grandes structures qui ne vendent qu’en ligne, peuvent quant à elles, proposer des prix plus bas \
   pour attirer toujours plus de clients. Une analyse est encore une fois nécessaire pour comprendre les prix du marché.<br>\
<br>\
3.	La mise en place et la gestion d’un e-commerce<br>\
Vendre ses articles en ligne signifie : faire des photos de qualité de chaque produit, \
créer des descriptions pertinentes, déployer toute une infrastructure informatique, gérer\
 en temps réel les stocks et sans parlé de… la sécurité de votre plateforme ou encore des\
  modalité de paiement. La mise en place d’un commerce en ligne nécessite beaucoup de compétences\
   et les prix demandés varient grandement d’un prestataire externe à un autre. <br><br>\
Vous l’aurez compris, mettre en place un site e-commerce nécessite beaucoup de réflexion, beaucoup\
 de temps et le plus souvent … beaucoup d’argent quand une agence externe est mandatée pour faire le travail.\
 Cependant ! Si vos produits sont suffisamment unique et ne sont pas intégrés dans les catalogues de vente des géants en ligne\
  à -50%, que la concurrence est faible et que vous avec le temps, les compétence et/ou les finances nécessaire pour vous lancer,\
   alors la création d’un site e-commerce peut être un réel avantage pour votre commerce.</p>`


//****************************************
//Les check-list
//****************************************

const checkList = {
	"siteweb": `<h2 class = "popup"> La check-list du site web </h2>\
<p class = "popup"> Voici les éléments à vérifier pour votre site web : </p>\
<ul>\
<li class = "popup"> Votre site est attrayant et moderne</li>\
<li class = "popup"> Votre site reflète visuellement votre commerce</li>\
<li class = "popup"> Vos informations sont correctes et facilement trouvables</li>\
<li class = "popup"> Vos textes sont concis et accrocheurs</li>\
<li class = "popup"> Votre nom de domaine et court et mémorable</li>\
<li class = "popup"> Votre site peut-être utilisé sur différentes plateformes (mobile, tablette, …)</li>\
<li class = "popup"> Votre site est rapide et stable</li>\
<li class = "popup"> Votre SEO est optimisé </li>`,

	"googleBusinessProfile": `<h2 class = "popup"> La check-list de Google Business Profile </h2>\
	<p class = "popup"> Voici les éléments à vérifier régulièrement avec cet outil : </p>\
	<ul>\
	<li class = "popup">Nom de la boutique</li>\
	<li class = "popup">Adresse physique</li>\
	<li class = "popup">Horaires d’ouverture</li>\
	<li class = "popup">Téléphone</li>\
	<li class = "popup">Lien sur votre site internet</li>\
	<li class = "popup">Catégorie du commerce</li>`,
	


	"Facebook": `<h2 class = "popup"> La check-list de Facebook</h2>\
	<p class = "popup"> Voici les éléments connaître pour profiter des avantages de cet outil  : </p>\
	<ul>\
 <li class = "popup">Vos visuels (photos / illustrations) sont beaux, attirant et de bonne qualité </li>\
 <li class = "popup">Vos textes n’ont pas pour but de vendre mais d’informer, de divertir et d’être ludique </li>\
 <li class = "popup">Les publications sont faite de manière régulière (minimum 2 fois par semaine)</li>\
 <li class = "popup">Vous répondez aux commentaires et créez un lien avec vos clients</li>\
 <li class = "popup"> Votre commerce est décrit de manière attractive</li>\
 <li class = "popup">Votre nom est facile à retenir</li></ul>`,



 "Instagram": `<h2 class="popup">La check-list d'Instagram</h2>
 <p class="popup">Voici les éléments à vérifier pour profiter des avantages de cet outil :</p>
 <ul>
	 <li class="popup">Vos visuels (photos / illustrations) sont beaux, attirants et de bonne qualité</li>
	 <li class="popup">Vos textes n’ont pas pour but de vendre mais d’informer, de divertir et d’être ludiques</li>
	 <li class="popup">Les publications sont faites de manière régulière (minimum 2 fois par semaine)</li>
	 <li class="popup">Vous répondez aux commentaires et créez un lien avec vos clients</li>
	 <li class="popup">Votre commerce est décrit de manière attractive</li>
	 <li class="popup">Votre nom est facile à retenir</li>
	 <li class="popup">Vous utilisez des hashtags pertinents pour augmenter la portée de vos publications</li>
	 <li class="popup">Vous utilisez des stories interactives, des sondages et des questions pour engager votre audience</li>
 </ul>`,


"TikTok": `<h2 class="popup">La check-list de TikTok</h2>
               <p class="popup">Voici les éléments à vérifier pour profiter des avantages de cet outil :</p>
               <ul>
                   <li class="popup">Vos vidéos doivent être courtes, attrayantes et de bonne qualité</li>
                   <li class="popup">Vous devez utiliser des hashtags pertinents pour augmenter la portée de vos vidéos</li>
                   <li class="popup">Vous devez participer à des challenges et suivre les tendances</li>
                   <li class="popup">Les publications doivent se faire de manière régulière (minimum 3 fois par semaine)</li>
               </ul>`,

    "Youtube": `<h2 class="popup">La check-list de YouTube</h2>
                <p class="popup">Voici les éléments à vérifier pour profiter des avantages de cet outil :</p>
                <ul>
                    <li class="popup">Vos vidéos sont de haute qualité, intéressantes et engageantes</li>
                    <li class="popup">La durée est entre 5 et 15 minutes</li>
                    <li class="popup">Vos titres correspondent aux recherches les plus effectuées sur « Google »</li>
                    <li class="popup">Votre miniature (image de présentation) est attrayante</li>
                    <li class="popup">Vos textes sont informatifs, divertissants et pertinents</li>
                    <li class="popup">Les publications sont faites de manière régulière (minimum 2 fois par mois)</li>
                    <li class="popup">Vous interagissez avec vos abonnés et répondez à leurs commentaires</li>
                    <li class="popup">Votre chaîne est bien structurée avec des playlists pertinentes</li>
                </ul>`,

				"Snapchat": `<h2 class="popup">La check-list de Snapchat</h2>
				<p class="popup">Voici les éléments à vérifier pour profiter des avantages de cet outil :</p>
				<ul>
					<li class="popup">Votre profil est un profil public</li>
					<li class="popup">Vos snaps doivent être attrayants, authentiques et de bonne qualité</li>
					<li class="popup">Vous faites la promotion de votre compte sur d’autres outils (site web, Instagram, ...)</li>
					<li class="popup">Vos textes sont informatifs, divertissants et engageants</li>
					<li class="popup">Vous utilisez des filtres et des « géofiltres » pour rendre vos snaps plus attractifs</li>
					<li class="popup">Les publications se font de manière régulière (minimum 2 fois par semaine)</li>
					<li class="popup">Vous interagissez avec vos abonnés et répondez à leurs messages</li>
					<li class="popup">Vous utilisez des stories pour des coulisses, des promotions exclusives et engagez directement avec vos abonnés via des messages privés</li>
				</ul>`,

   "Newsletter": `<h2 class="popup">La check-list de la Newsletter</h2>
				  <p class="popup">Voici les éléments à vérifier pour profiter des avantages de cet outil :</p>
				  <ul>
					  <li class="popup">Vous avez une base d’abonnés à jour</li>
					  <li class="popup">Vos newsletters sont informatives, attrayantes et pertinentes pour vos abonnés</li>
					  <li class="popup">Vous utilisez des objets accrocheurs pour augmenter le taux d’ouverture</li>
					  <li class="popup">Vous personnalisez vos emails avec le nom de l’abonné</li>
					  <li class="popup">Vous utilisez un design professionnel et adapté aux mobiles pour vos newsletters</li>
					  <li class="popup">Vous incluez des appels à l’action clairs et engageants</li>
					  <li class="popup">Vous envoyez des newsletters de manière régulière, sans surcharger vos abonnés (par exemple, une fois par mois)</li>
					  <li class="popup">Vous suivez les performances de vos newsletters (taux d’ouverture, taux de clics, taux de conversion) et ajustez votre stratégie en conséquence</li>
					  <li class="popup">Vous respectez les réglementations sur la protection des données et incluez toujours une option de désinscription claire</li>
				  </ul>`
};
