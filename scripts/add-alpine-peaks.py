#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour ajouter les 82 sommets de 4000m des Alpes
Basé sur des données historiques réelles
"""

import json
import re
from datetime import datetime

# Données des 82 sommets de 4000m des Alpes
alpine_peaks_data = [
    # Rang 1-10
    {
        "rank": 1,
        "altitude": 4806,
        "name": "Mont Blanc",
        "range": "Massif du Mont-Blanc",
        "first_ascent_date": "1786-08-08",
        "climbers": "Jacques Balmat et Michel Paccard",
        "coords": "45° 49′ 57″ N, 6° 51′ 52″ E",
        "countries": ["France", "Italie"]
    },
    {
        "rank": 2,
        "altitude": 4765,
        "name": "Mont Blanc de Courmayeur",
        "range": "Massif du Mont-Blanc",
        "first_ascent_date": "1877-07-31",
        "climbers": "James Eccles avec Michel-Clément Payot et Alphonse Payot",
        "coords": "45° 49′ 44″ N, 6° 52′ 10″ E",
        "countries": ["France", "Italie"]
    },
    {
        "rank": 3,
        "altitude": 4634,
        "name": "Pointe Dufour",
        "range": "Alpes pennines",
        "first_ascent_date": "1855-08-01",
        "climbers": "Charles Hudson, J. Birkbeck, C. Smyth, J. G. Smyth, E. J. Stevenson avec Ulrich Lauener",
        "coords": "45° 56′ 13″ N, 7° 52′ 04″ E",
        "countries": ["Suisse"]
    },
    {
        "rank": 4,
        "altitude": 4610,
        "name": "Nordend",
        "range": "Alpes pennines",
        "first_ascent_date": "1861-08-26",
        "climbers": "T.F. et Edward N. Buxton, John Jermyn Cowell avec Michel-Ambroise Payot",
        "coords": "45° 56′ 30″ N, 7° 52′ 12″ E",
        "countries": ["Suisse", "Italie"]
    },
    {
        "rank": 5,
        "altitude": 4563,
        "name": "Pointe Zumstein",
        "range": "Alpes pennines",
        "first_ascent_date": "1820-08-01",
        "climbers": "Joseph Zumstein, Molinatti, Marty, Castel",
        "coords": "45° 55′ 55″ N, 7° 52′ 17″ E",
        "countries": ["Suisse", "Italie"]
    },
    {
        "rank": 6,
        "altitude": 4554,
        "name": "Pointe Gnifetti",
        "range": "Alpes pennines",
        "first_ascent_date": "1842-08-09",
        "climbers": "Giovanni Gnifetti, G. Farinetti, C. Grober",
        "coords": "45° 55′ 38″ N, 7° 52′ 37″ E",
        "countries": ["Suisse", "Italie"]
    },
    {
        "rank": 7,
        "altitude": 4545,
        "name": "Dom des Mischabel",
        "range": "Alpes pennines",
        "first_ascent_date": "1858-09-11",
        "climbers": "L. Davies avec Johann Zumtaugwald, Johann Kronig",
        "coords": "46° 05′ 52″ N, 7° 51′ 36″ E",
        "countries": ["Suisse"]
    },
    {
        "rank": 8,
        "altitude": 4533,
        "name": "Liskamm Oriental",
        "range": "Alpes pennines",
        "first_ascent_date": "1861-08-19",
        "climbers": "William Edward Hall et expédition britannique",
        "coords": "45° 55′ 21″ N, 7° 50′ 08″ E",
        "countries": ["Suisse", "Italie"]
    },
    {
        "rank": 9,
        "altitude": 4506,
        "name": "Weisshorn",
        "range": "Alpes pennines",
        "first_ascent_date": "1861-08-19",
        "climbers": "John Tyndall avec Johann Joseph Bennen et Ulrich Wenger",
        "coords": "46° 06′ 05″ N, 7° 42′ 58″ E",
        "countries": ["Suisse"]
    },
    {
        "rank": 10,
        "altitude": 4491,
        "name": "Täschhorn",
        "range": "Alpes pennines",
        "first_ascent_date": "1862-07-31",
        "climbers": "Llewelyn Davies et J.H. Hayward avec Stefan et Johann Zumtaugwald",
        "coords": "46° 05′ 01″ N, 7° 51′ 26″ E",
        "countries": ["Suisse"]
    },
    # Rang 11-20
    {
        "rank": 11,
        "altitude": 4481,
        "name": "Liskamm Occidental",
        "range": "Alpes pennines",
        "first_ascent_date": "1864-08-16",
        "climbers": "Leslie Stephen et E.N.Buxton avec Jakob Anderegg et Franz Biner",
        "coords": "45° 55′ 37″ N, 7° 49′ 15″ E",
        "countries": ["Suisse", "Italie"]
    },
    {
        "rank": 12,
        "altitude": 4478,
        "name": "Cervin",
        "range": "Alpes pennines",
        "first_ascent_date": "1865-07-14",
        "climbers": "Edward Whymper, Charles Hudson, Douglas Hadow, Lord Francis Douglas avec Michel Croz",
        "coords": "45° 58′ 35″ N, 7° 39′ 30″ E",
        "countries": ["Suisse", "Italie"]
    },
    {
        "rank": 13,
        "altitude": 4470,
        "name": "Pointe Louis-Amédée",
        "range": "Massif du Mont-Blanc",
        "first_ascent_date": "1901-07-20",
        "climbers": "G.B. et G.F. Gugliermina avec Joseph Brocherel",
        "coords": "45° 49′ 19″ N, 6° 51′ 55″ E",
        "countries": ["Italie"]
    },
    {
        "rank": 14,
        "altitude": 4468,
        "name": "Mont Maudit",
        "range": "Massif du Mont-Blanc",
        "first_ascent_date": "1878-09-12",
        "climbers": "Henry Seymour Hoare et William Edward Davidson",
        "coords": "45° 50′ 52″ N, 6° 52′ 33″ E",
        "countries": ["France", "Italie"]
    },
    {
        "rank": 15,
        "altitude": 4436,
        "name": "Pointe Parrot",
        "range": "Alpes pennines",
        "first_ascent_date": "1863-08-16",
        "climbers": "Reginald S. Macdonald, Florence Crauford Grove",
        "coords": "45° 55′ 11″ N, 7° 52′ 17″ E",
        "countries": ["Suisse", "Italie"]
    },
    {
        "rank": 16,
        "altitude": 4358,
        "name": "Dent Blanche",
        "range": "Alpes pennines",
        "first_ascent_date": "1862-07-18",
        "climbers": "William Wigram et Thomas Stuart Kennedy",
        "coords": "46° 02′ 03″ N, 7° 36′ 43″ E",
        "countries": ["Suisse"]
    },
    {
        "rank": 17,
        "altitude": 4342,
        "name": "Ludwigshöhe",
        "range": "Alpes pennines",
        "first_ascent_date": "1822-08-25",
        "climbers": "Franz Ludwig von Welden",
        "coords": "45° 55′ 00″ N, 7° 51′ 50″ E",
        "countries": ["Suisse", "Italie"]
    },
    {
        "rank": 18,
        "altitude": 4327,
        "name": "Nadelhorn",
        "range": "Alpes pennines",
        "first_ascent_date": "1858-09-16",
        "climbers": "Franz Andenmatten, B. Epiney, Aloys Supersaxo",
        "coords": "46° 06′ 32″ N, 7° 51′ 50″ E",
        "countries": ["Suisse"]
    },
    {
        "rank": 19,
        "altitude": 4322,
        "name": "Tête Noire",
        "range": "Alpes pennines",
        "first_ascent_date": "1873-08-18",
        "climbers": "Marco Maglionini, Albert de Rothschild",
        "coords": "45° 54′ 54″ N, 7° 51′ 43″ E",
        "countries": ["Italie"]
    },
    {
        "rank": 20,
        "altitude": 4314,
        "name": "Grand Combin de Grafeneire",
        "range": "Alpes pennines",
        "first_ascent_date": "1859-07-30",
        "climbers": "C. Sainte Claire de Ville avec Daniel, Emanuel et Gaspard Ballay",
        "coords": "45° 56′ 15″ N, 7° 17′ 57″ E",
        "countries": ["Suisse"]
    },
]

def generate_mountain_id(name):
    """Génère un ID unique à partir du nom de la montagne"""
    # Enlever les accents et caractères spéciaux
    id_str = name.lower()
    id_str = id_str.replace('é', 'e').replace('è', 'e').replace('ê', 'e')
    id_str = id_str.replace('à', 'a').replace('â', 'a')
    id_str = id_str.replace('ô', 'o').replace('ö', 'o')
    id_str = id_str.replace('î', 'i').replace('ï', 'i')
    id_str = id_str.replace('ü', 'u').replace('û', 'u')
    id_str = re.sub(r'[^a-z0-9]+', '-', id_str)
    id_str = id_str.strip('-')
    return id_str

def get_difficulty_for_altitude(altitude, range_name):
    """Détermine la difficulté basée sur l'altitude et le massif"""
    if "Mont-Blanc" in range_name:
        if altitude >= 4800:
            return "Extreme"
        elif altitude >= 4400:
            return "Very Hard"
        else:
            return "Hard"
    else:  # Alpes pennines, bernoises, etc.
        if altitude >= 4600:
            return "Extreme"
        elif altitude >= 4400:
            return "Very Hard"
        else:
            return "Hard"

def get_success_rate(altitude, difficulty):
    """Estime le taux de réussite"""
    if difficulty == "Extreme":
        return round(25 + (5000 - altitude) * 0.01, 1)
    elif difficulty == "Very Hard":
        return round(35 + (5000 - altitude) * 0.015, 1)
    else:
        return round(50 + (5000 - altitude) * 0.02, 1)

def get_death_rate(difficulty):
    """Estime le taux de mortalité"""
    rates = {
        "Extreme": 2.5,
        "Very Hard": 1.8,
        "Hard": 1.2,
        "Moderate": 0.5
    }
    return rates.get(difficulty, 1.0)

def parse_first_ascent(data):
    """Parse les données de première ascension"""
    climbers_text = data.get("climbers", "")
    climbers_list = []

    # Extraire les noms principaux
    if "avec" in climbers_text.lower():
        main_climbers = climbers_text.split("avec")[0].strip()
    else:
        main_climbers = climbers_text

    # Séparer les noms
    names = re.split(r',|\set\s', main_climbers)
    for name in names[:3]:  # Max 3 grimpeurs principaux
        name = name.strip()
        if name and len(name) > 2:
            climbers_list.append({
                "name": name,
                "nationality": "Unknown"
            })

    return climbers_list

def get_country_string(countries):
    """Convertit la liste de pays en string"""
    if len(countries) == 1:
        return countries[0]
    return "/".join(countries)

def get_dangers_for_range(range_name):
    """Retourne les dangers typiques selon le massif"""
    if "Mont-Blanc" in range_name:
        return [
            "Avalanches",
            "Crevasses",
            "Sérac",
            "Chutes de pierres",
            "Conditions météo changeantes"
        ]
    elif "pennines" in range_name.lower():
        return [
            "Avalanches",
            "Arêtes exposées",
            "Crevasses",
            "Chutes de pierres",
            "Foudre en été"
        ]
    else:
        return [
            "Avalanches",
            "Crevasses",
            "Chutes de pierres",
            "Conditions météo"
        ]

def get_best_seasons(range_name):
    """Retourne les meilleures saisons"""
    return ["Summer", "Early Autumn"]

def generate_description(name, altitude, range_name, rank):
    """Génère une description"""
    if rank == 1:
        return f"Le {name}, point culminant des Alpes avec ses {altitude} mètres, est un sommet mythique de l'alpinisme. Première ascension en 1786, il marque le début de l'alpinisme moderne."
    elif rank <= 10:
        return f"Le {name} ({altitude}m) est l'un des sommets les plus prestigieux des Alpes, situé dans le {range_name}. C'est un objectif majeur pour les alpinistes expérimentés."
    elif rank <= 30:
        return f"Culminant à {altitude} mètres dans le {range_name}, le {name} est un sommet technique des Alpes offrant des voies d'escalade variées."
    else:
        return f"Le {name} ({altitude}m) est un sommet alpin situé dans le {range_name}, réservé aux alpinistes confirmés."

def get_unsplash_query(name, range_name):
    """Génère une requête Unsplash"""
    if "Blanc" in name:
        return "mont blanc alpine peak snow"
    elif "Cervin" in name or "Matterhorn" in name:
        return "matterhorn alpine switzerland"
    elif "Rose" in range_name:
        return "monte rosa alpine italy"
    else:
        return f"{name.replace(' ', '+').lower()}+alpine+peak"

print("Génération des données pour les 20 premiers sommets...")
print(f"Nombre de sommets: {len(alpine_peaks_data)}")

# Cette première partie sera suivie de la suite du script
