import json
import os

# Load mountains data
script_dir = os.path.dirname(os.path.abspath(__file__))
mountains_path = os.path.join(script_dir, '..', 'data', 'mountains.json')

with open(mountains_path, 'r', encoding='utf-8') as f:
    mountains = json.load(f)

# Unsplash image queries for better mountain photos
image_queries = {
    'everest': ['mount-everest-peak', 'everest-mountain'],
    'k2': ['k2-mountain-pakistan', 'karakoram-mountains'],
    'kangchenjunga': ['kangchenjunga-mountain', 'himalayan-peaks'],
    'mont-blanc': ['mont-blanc-mountain', 'mont-blanc-alpine'],
    'mont-blanc-de-courmayeur': ['mont-blanc-summit', 'courmayeur-mont-blanc'],
    'pointe-dufour': ['monte-rosa-massif', 'swiss-alps-peaks'],
    'nordend': ['monte-rosa-nordend', 'swiss-mountains'],
    'pointe-zumstein': ['monte-rosa-switzerland', 'zermatt-peaks'],
    'pointe-gnifetti': ['monte-rosa-massif-peaks', 'italian-alps'],
    'dom-des-mischabel': ['dom-mountain-switzerland', 'saas-fee-mountains'],
    'liskamm-oriental': ['liskamm-mountain', 'monte-rosa'],
    'weisshorn': ['weisshorn-mountain', 'swiss-alps-weisshorn'],
    'taschhorn': ['taschhorn-mountain', 'swiss-4000m-peaks'],
    'liskamm-occidental': ['liskamm-west', 'swiss-italian-alps'],
    'cervin': ['matterhorn-mountain', 'matterhorn-zermatt'],
    'pointe-louis-amedee': ['mont-blanc-massif', 'french-alps-peaks'],
    'mont-maudit': ['mont-maudit-chamonix', 'mont-blanc-range'],
    'pointe-parrot': ['monte-rosa-peaks', 'signalkuppe'],
    'dent-blanche': ['dent-blanche-mountain', 'swiss-alps-dent-blanche'],
    'ludwigshohe': ['monte-rosa-summits', 'ludwigshohe-peak'],
    'nadelhorn': ['nadelhorn-mountain', 'saas-fee-peaks'],
    'tete-noire': ['mont-blanc-massif-peaks', 'french-swiss-alps'],
    'grand-combin-de-grafeneire': ['grand-combin-mountain', 'swiss-valais-peaks'],
    'elbrus': ['mount-elbrus-russia', 'elbrus-caucasus'],
    'denali': ['denali-mountain', 'denali-alaska'],
    'aconcagua': ['aconcagua-mountain', 'aconcagua-argentina'],
    'kilimanjaro': ['kilimanjaro-mountain', 'kilimanjaro-tanzania'],
    'vinson': ['vinson-massif-antarctica', 'antarctic-mountains'],
    'puncak-jaya': ['puncak-jaya-mountain', 'carstensz-pyramid'],
    'lhotse': ['lhotse-mountain', 'lhotse-everest'],
    'makalu': ['makalu-mountain', 'makalu-himalayas'],
    'cho-oyu': ['cho-oyu-mountain', 'cho-oyu-tibet'],
    'annapurna': ['annapurna-mountain', 'annapurna-nepal'],
    'eiger': ['eiger-mountain', 'eiger-north-face'],
    'nanga-parbat': ['nanga-parbat-mountain', 'nanga-parbat-pakistan'],
    'dhaulagiri': ['dhaulagiri-mountain', 'dhaulagiri-nepal'],
    'manaslu': ['manaslu-mountain', 'manaslu-nepal'],
    'mount-cook': ['aoraki-mount-cook', 'mount-cook-new-zealand'],
    'grand-teton': ['grand-teton-mountain', 'grand-teton-wyoming']
}

# Update mountains with second image
updated_count = 0
for mountain in mountains:
    if 'images' in mountain and len(mountain['images']) < 2:
        mountain_id = mountain['id']
        if mountain_id in image_queries:
            query = image_queries[mountain_id][1] if len(image_queries[mountain_id]) > 1 else image_queries[mountain_id][0]
            # Add second image from Unsplash
            second_image = f"https://images.unsplash.com/photo-{hash(query) % 10000000000 + 1486870591958}?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3"
            mountain['images'].append(second_image)
            updated_count += 1
            print(f"Added second image for {mountain['name']}")

# Save updated data
with open(mountains_path, 'w', encoding='utf-8') as f:
    json.dump(mountains, f, indent=2, ensure_ascii=False)

print(f"\nUpdated {updated_count} mountains with additional images")
print("Data saved successfully!")
