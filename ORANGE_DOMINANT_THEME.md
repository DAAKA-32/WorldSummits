# 🔥 Thème Orange Dominant - WorldSummits

## Vision de Design

**Le orange est LA couleur centrale de l'identité visuelle de WorldSummits.**

L'objectif est de créer une expérience immersive où le orange domine l'interface : dans les textes, les titres, les icônes et tous les éléments visuels. Le design évoque la **chaleur**, la **puissance** et l'**énergie** des sommets, dans un style montagne / expédition haut de gamme.

---

## 🎨 Palette de Couleurs Orange Dominant

### Couleurs Principales

#### Orange - Couleur Centrale Omniprésente
- **Primary**: `#FF7A00` (HSL: `24 100% 50%`) - Orange vibrant
- **Accent**: `#FF9933` (HSL: `24 100% 60%`) - Orange plus clair pour emphasis
- **Secondary Foreground**: `#FF8C1A` (HSL: `24 100% 55%`) - Orange moyen

#### Textes - Majoritairement Orange
- **Foreground (texte principal)**: `#FF7A00` - ORANGE (pas de blanc !)
- **Card Foreground**: `#FF7A00` - Orange sur toutes les cartes
- **Muted Foreground**: `#FFA647` (HSL: `24 100% 65%`) - Orange clair pour texte secondaire

#### Backgrounds - Noir Profond
- **Background**: `#000000` - Noir pur pour contraste maximal
- **Card**: `#0D0D0D` - Charcoal très foncé
- **Secondary**: `#1F1F1F` - Gris très sombre

#### Bordures - Orange Teinté
- **Border**: Orange teinté `#993D00` (HSL: `24 80% 25%`)

---

## 🔥 Principes d'Utilisation du Orange

### 1. Titres et Headers
✅ **TOUJOURS en orange**
- H1, H2, H3 → `text-primary` ou `text-accent`
- Mots-clés importants → `text-primary font-semibold`
- Exemple: `<h1 className="text-primary">Titre Principal</h1>`

### 2. Textes et Paragraphes
✅ **Orange pour tout texte important**
- Texte principal → `text-foreground` (qui est orange maintenant)
- Texte secondaire → `text-primary/80` ou `text-primary/70`
- Mots-clés → `<span className="font-semibold text-primary">`

### 3. Boutons et Actions
✅ **Fond orange, hover plus clair**
- Primaire: `bg-primary hover:bg-accent text-black`
- Outline: `border-2 border-primary text-primary hover:bg-primary hover:text-black`

### 4. Badges et Labels
✅ **Bordures orange, texte orange**
- Default: `bg-primary text-black`
- Outline: `border-2 border-primary text-primary`

### 5. Icons
✅ **Toutes en orange**
- Icons importantes: `text-primary`
- Icons hover: `hover:text-accent`

### 6. Bordures et Séparateurs
✅ **Bordures orange-tintées**
- Cartes: `border-2 border-primary/40 hover:border-primary`
- Séparateurs: `border-t-2 border-primary/30`

### 7. Inputs et Formulaires
✅ **Bordures orange, texte orange**
- Input: `border-2 border-primary/40 text-primary placeholder:text-primary/60`
- Focus: `focus:border-primary`

---

## 📋 Variables CSS (globals.css)

```css
:root {
  /* ORANGE DOMINANT THEME */
  --foreground: 24 100% 50%;              /* Orange comme couleur de texte principale */
  --card-foreground: 24 100% 50%;          /* Orange sur cartes */
  --popover-foreground: 24 100% 50%;       /* Orange dans popover */

  --primary: 24 100% 50%;                  /* #FF7A00 */
  --accent: 24 100% 60%;                   /* #FF9933 */
  --secondary-foreground: 24 100% 55%;     /* #FF8C1A */
  --muted-foreground: 24 100% 65%;         /* #FFA647 */

  --border: 24 80% 25%;                    /* Orange-tinted borders */

  /* Backgrounds - Noir profond */
  --background: 0 0% 0%;                   /* #000000 */
  --card: 0 0% 5%;                         /* #0D0D0D */
  --secondary: 0 0% 12%;                   /* #1F1F1F */
}
```

---

## 💡 Exemples de Code

### Titre Principal
```tsx
<h1 className="text-5xl font-black text-primary">
  Titre <span className="text-accent">Accent</span>
</h1>
```

### Paragraphe avec Mots-clés
```tsx
<p className="text-primary/80">
  Texte normal avec <span className="font-semibold text-primary">mots-clés importants</span> en orange.
</p>
```

### Carte Orange Dominant
```tsx
<Card className="border-2 border-primary/40 hover:border-primary hover:shadow-xl hover:shadow-primary/20">
  <CardHeader>
    <CardTitle className="text-primary">Titre</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-primary/70">Description</p>
  </CardContent>
</Card>
```

### Bouton Orange
```tsx
<Button className="bg-primary hover:bg-accent text-black">
  Action Principale
</Button>
```

### Badge Orange
```tsx
<Badge className="bg-primary text-black">Important</Badge>
<Badge className="border-2 border-primary text-primary">Outline</Badge>
```

### Input Orange
```tsx
<Input
  className="border-2 border-primary/40 focus:border-primary text-primary placeholder:text-primary/60"
  placeholder="Rechercher..."
/>
```

---

## ✅ Checklist de Cohérence Orange

### Pages Mises à Jour
- ✅ [Hero Section](components/home/hero-section.tsx) - Titres orange, stats orange
- ✅ [Continent Section](components/home/continent-section.tsx) - Titres orange
- ✅ [Stats Section](components/home/stats-section.tsx) - Tout en orange
- ✅ [Mountain Cards](components/mountain-card.tsx) - Noms, badges, textes orange
- ✅ [Mountains Page](app/mountains/page.tsx) - Filtres, titres, compteurs orange
- ✅ [About Page](app/about/page.tsx) - Headers, features orange
- ✅ [Header](components/header.tsx) - Logo, nav orange
- ✅ [Footer](components/footer.tsx) - Tous les liens et textes orange

### Composants UI
- ✅ Buttons - Fond orange par défaut
- ✅ Badges - Orange primaire
- ✅ Cards - Bordures orange, texte orange
- ✅ Inputs - Bordures et texte orange

---

## 🚀 Impact Visuel

Le résultat final est une interface où:
- 🔥 **Le orange DOMINE** visuellement à tous les niveaux
- 📝 **Les textes participent activement** à l'identité orange
- ⚫ **Le noir crée le contraste** maximal
- 💎 **L'ambiance est premium, énergique et cohérente**
- 🏔️ **Le style évoque la montagne, la puissance et l'aventure**

---

## 📊 Avant vs Après

### Avant (Thème Subtil)
- Textes: Blanc/gris majoritaire
- Orange: Uniquement accents ponctuels
- Ambiance: Neutre, sobre

### Après (Thème Orange Dominant)
- Textes: Orange PARTOUT
- Orange: Couleur centrale de l'identité
- Ambiance: Énergique, chaleureuse, distinctive

---

## 🎯 Résultat Final

**WorldSummits respire désormais le orange à chaque pixel.**

L'identité visuelle est immédiatement reconnaissable, avec une cohérence totale entre tous les éléments. Le orange n'est plus un simple accent : c'est LA couleur qui définit l'expérience utilisateur.

Le contraste noir/orange crée une esthétique premium et moderne, parfaitement adaptée à un site d'alpinisme haut de gamme.
