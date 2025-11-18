import json

# URLs Unsplash pour chaque montagne (images HD de montagnes)
mountain_images = {
    "everest": ["https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1920", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920"],
    "k2": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920"],
    "kangchenjunga": ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920"],
    "mont-blanc": ["https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1920", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920"],
    "elbrus": ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920"],
    "denali": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920", "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1920"],
    "aconcagua": ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920"],
    "kilimanjaro": ["https://images.unsplash.com/photo-1589182337358-2cb63099350c?q=80&w=1920", "https://images.unsplash.com/photo-1650668302197-7f556c34cb91?q=80&w=1920"],
    "vinson": ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920"],
    "puncak-jaya": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920"],
    "lhotse": ["https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1920"],
    "makalu": ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920"],
    "cho-oyu": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920"],
    "matterhorn": ["https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1920", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920"],
    "annapurna": ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920"],
    "eiger": ["https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1920"],
    "nanga-parbat": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920"],
    "dhaulagiri": ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920"],
    "manaslu": ["https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1920"],
    "mount-cook": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920"],
    "grand-teton": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920"]
}

# Lire le fichier JSON
with open('data/mountains.json', 'r', encoding='utf-8') as f:
    mountains = json.load(f)

# Mettre à jour les images
for mountain in mountains:
    if mountain['id'] in mountain_images:
        mountain['images'] = mountain_images[mountain['id']]

# Sauvegarder
with open('data/mountains.json', 'w', encoding='utf-8') as f:
    json.dump(mountains, f, ensure_ascii=False, indent=2)

print("Images mises a jour avec succes!")
