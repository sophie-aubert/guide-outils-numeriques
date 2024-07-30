const questions = [
	{
		"text": "Dans quelle tranche d'âge se situe votre clientèle principale ?",
		"type": "text",
		"reponses": [
			{
				"text": "Baby boomer (entre 60 ans et plus)",
				"impacts":
				{
					"Facebook": 84,
					"Instagram": 34,
					"Snapchat": 17,
					"Youtube": 52,
					"TikTok": 14
				}

			},
			{
				"text": "Génération X (45 à 59 ans)",
				"impacts":
				{
					"Facebook": 83,
					"Instagram": 47,
					"Snapchat": 27,
					"Youtube": 56,
					"TikTok": 26
				}

			},
			{
				"text": "Génération Y (30 à 44 ans)",
				"impacts": {
					"Facebook": 81,
					"Instagram": 59,
					"Snapchat": 41,
					"Youtube": 61,
					"TikTok": 37
				}
			},

			{
				"text": "Génération Z (< 18 à 29ans)",
				"impacts": {
					"Facebook": 54,
					"Instagram": 78,
					"Snapchat": 66,
					"Youtube": 69,
					"TikTok": 60

				}
			}
		]
	}, {
		"text": "Aimeriez-vous attirer une clientèle d'une autre tranche d'âge ? ",
		"type": "text",
		"reponses": [
			{
				"text": "Non"
			},
			{
				"text": "Baby boomer (entre 60 ans et plus)",
				"impacts": {
					"Facebook": 15,
				}

			},
			{
				"text": "Génération X (45 à 59 ans)",
				"impacts":
				{
					"Facebook": 5,
					"Instagram": 10,
				}
			},
			{
				"text": "Génération Y (30 à 44 ans)",
				"impacts":
				{
					"Facebook": 5,
					"Instagram": 30,
					
				}
			},
			{
				"text": "Génération Z (< 18 à 29ans)",
				"impacts":
				{
					"Instagram": 40,
					"Snapchat": 30,
					"Youtube": 10,
					"TikTok": 20

				}
			}
		]
	}, {
		"text": "Sur l'année, combien de promotion faites-vous en moyenne sur vos produits ? ",
		"type": "text",
		"reponses": [
			{
				"text": "Je ne fais pas de promotion",
				"impacts": {
					"Newsletter": +10
				}
			}, {
				"text": "Je fais rarement de promotion (1 à 4 par an)",
				"impacts":
				{
					"Newsletter": 30
				}

			}, {
				"text": "Je fais quelques promotions (5 à 10 par an)",
				"impacts": {
					"Newsletter": 50
				}
			}, {
				"text": "Je fais régulièrement des promotions (plus de 10 par an)",
				"impacts": {
					"Newsletter": 70
				}

			}
		]
	}, {
		"text": "Combien d'heure par semaine êtes vous prêt à consacrer à vos outils numériques ?",
		"type": "influenceurs",
		"variable": "$time",
		"reponses": [
			{
				"text": "Je n'ai pas de temps à consacrer à mes outils numériques",
				"value": 0
			}, {
				"text": "Je peux consacrer 1 à 2 heures par semaine <br>(soit, 10 à 20 minutes par jour)",
				"value": 1
			}, {
				"text": "Je suis prêt à consacrer 2 à 4 heures par semaine <br>(soit, 20 à 40 minutes par jour)",
				"value": 2
			}, {
				"text": "Je suis prêt à consacrer 4 à 8 heures par semaine voir plus <br>(soit 40 à 80 minutes par jour)",
				"value": 3
			},
		]
	}, {
		"text": "Seriez-vous prêt à financer une entreprise ou une personne externe <br> pour la gestion de vos outils numériques (création de contenu, rédaction de textes, publication …) ?",
		"type": "influenceurs",
		"variable": "$money",
		"reponses": [
			{
				"text": "Non",
				"value": 0
			}, {
				"text": "Oui, entre chf 100 et 500 / mois",
				"value": 1
			}, {
				"text": "Oui, pour entre chf 500 et 1000 / mois",
				"value": 2
			}, {
				"text": "Oui, pour entre chf 1000 et 2000 / mois",
				"value": 4
			}, {
				"text": "Oui, plus de 2000 / mois",
				"value": 6

			}
		]
	}, {
		"text": "Quelle note vous semble la plus proche de vos compétences en photographie ? \
		<br> (Exemple : faire une photo nette, bien cadrée, lumineuse, etc.) <br>\
		 <p class='infoNote'>Note : 1 étoile = débutant, 6 étoiles = expert</p>",
		"type": "etoiles",
		"impacts": {
			"Facebook" : 0.5,
			"Instagram": 2,
			"Newsletter": 0.5,
			"Snapchat": 1,
			"Newsletter": 0.5
		}
	}, {
		"text": "Quelle note vous semble la plus proche de vos compétences en termes de modification de photo ?\
		<br> (Exemple : détourer une photo, modifier les couleurs, ajouter des filtres, etc.)\
		<br> <p class='infoNote'>Note : 1 étoile = débutant, 6 étoiles = expert</p>",
		"type": "etoiles",
		"impacts": {
			"Facebook" : 1,
			"Instagram": 1,
			"Newsletter": 1,
			"Snapchat": 1.5
		}

	}, {
		"text": "Quelle note vous semble la plus proche de vos compétences en termes de création d’illustrations ?\
		 (Exemple : rechercher des illustrations, modifier les couleurs, intégrer un texte, etc.)\
		 <br> <p class='infoNote'>Note : 1 étoile = débutant, 6 étoiles = expert</p>",
		"type": "etoiles",
		"impacts": {
			"Facebook" : 1,
			"Instagram": 2,
			"Newsletter": 1,
			"Snapchat": 1.5
		}
	}, {
		"text": "Quelle note vous semble la plus proche de vos compétences en termes de création et montage vidéo ?\
		(Exemple : filmer des scènes, faire un montage, ajouter des effets, etc.)\
		<br> <p class='infoNote'>Note : 1 étoile = débutant, 6 étoiles = expert</p>",
		"type": "etoiles",
		"impacts": {
			"Instagram": 0.5,
			"Youtube" : 1.1,
			"TikTok":1
		}
	}, {
		"text": "Quelle note vous semble la plus proche de vos compétences en termes de rédaction de textes ?\
        <br> (Exemple : rédiger un texte ludique et engageant sur des domaines liés à votre commerce)\
		<br> <p class='infoNote'>Note : 1 étoile = débutant, 6 étoiles = expert</p>",
		"type": "etoiles",
		"impacts": {
			"Facebook": 1,
			"Instagram": 0,
			"Newsletter": 2,
		}
	},

]





