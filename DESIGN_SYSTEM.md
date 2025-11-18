# Système de Design - WorldSummits

## 🎨 Palette de Couleurs (Inspirée d'Elite Exped)

### Couleurs Principales

#### Backgrounds - Noirs et Gris Foncés
- **Background Principal**: `#000000` (Noir pur)
- **Card Background**: `#141414` (Gris charbon foncé)
- **Popover Background**: `#1A1A1A` (Gris anthracite)
- **Input Background**: `#1F1F1F` (Gris très foncé)

#### Textes
- **Foreground Principal**: `#F2F2F2` (Blanc cassé pour le texte principal)
- **Muted Foreground**: `#999999` (Gris moyen pour texte secondaire)

#### Couleurs d'Accent - Orange
- **Primary (Orange principal)**: `#FF7A00` - Utilisé pour les boutons primaires, les icônes importantes
- **Accent (Orange clair)**: `#FF8C1A` - États hover, accents secondaires
- **Primary sur fond sombre**: Texte noir `#000000`

#### Couleurs Secondaires
- **Secondary Background**: `#2C2C2C` (Anthracite)
- **Muted Background**: `#262626` (Gris foncé)

#### Bordures
- **Border**: `#333333` (Gris subtil pour les bordures)

### Variables CSS (HSL)

```css
/* Backgrounds */
--background: 0 0% 0%;           /* #000000 */
--foreground: 0 0% 95%;          /* #F2F2F2 */

/* Cards */
--card: 0 0% 8%;                 /* #141414 */
--card-foreground: 0 0% 95%;

/* Primary - Orange */
--primary: 24 100% 50%;          /* #FF7A00 */
--primary-foreground: 0 0% 0%;

/* Secondary */
--secondary: 0 0% 17%;           /* #2C2C2C */
--secondary-foreground: 0 0% 95%;

/* Muted */
--muted: 0 0% 15%;               /* #262626 */
--muted-foreground: 0 0% 60%;    /* #999999 */

/* Accent */
--accent: 24 100% 55%;           /* #FF8C1A */

/* Borders */
--border: 0 0% 20%;              /* #333333 */
```

## 🎯 Principes d'Utilisation

### Texte
- **Titres principaux**: Blanc (`text-white`) ou Foreground (`text-foreground`)
- **Accents dans les titres**: Orange (`text-primary`)
- **Texte secondaire**: Muted Foreground (`text-muted-foreground`)
- **Texte sur fond orange**: Noir (`text-black`)

### Boutons
- **Primaire**: Fond orange (`bg-primary`), texte noir (`text-black`)
- **Secondaire**: Fond gris foncé (`bg-secondary`), texte clair
- **Outline**: Bordure subtile, fond transparent, hover orange

### Cards
- **Fond**: `bg-card` (gris foncé #141414)
- **Bordure**: `border-border` (gris subtil)
- **Hover**: `hover:border-primary/50` + `hover:shadow-primary/10`

### Icons
- **Icons importantes**: Orange (`text-primary`)
- **Icons secondaires**: Muted (`text-muted-foreground`)

## 🚀 Ambiance Générale

**Style**: Sombre, élégant, premium, immersif

**Inspiration**: Elite Exped - Alpinisme haut de gamme

**Caractéristiques**:
- Dominance de noir et gris foncé
- Accents orange pour l'énergie et la chaleur
- Contrastes nets et design épuré
- Esprit montagne, altitude, performance

## ✅ À Faire / À Éviter

### ✅ À Faire
- Utiliser l'orange avec parcimonie (accents uniquement)
- Privilégier le texte blanc/gris clair sur fond sombre
- Maintenir des contrastes élevés pour la lisibilité
- Utiliser des ombres subtiles avec teinte orange

### ❌ À Éviter
- Trop d'orange (éviter texte orange partout)
- Fonds blancs (sauf exceptions très justifiées)
- Couleurs vives autres que l'orange
- Tons froids (bleu, vert, violet)

## 📱 Exemples d'Utilisation

### Titre de Section
```tsx
<h1 className="text-5xl font-bold text-foreground">
  Titre <span className="text-primary">Accent</span>
</h1>
```

### Bouton Principal
```tsx
<Button className="bg-primary hover:bg-accent text-black">
  Action
</Button>
```

### Card
```tsx
<Card className="bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
  <CardContent>
    <h3 className="text-foreground">Titre</h3>
    <p className="text-muted-foreground">Description</p>
  </CardContent>
</Card>
```

### Badge
```tsx
<Badge variant="default" className="bg-primary text-black">
  Important
</Badge>

<Badge variant="outline" className="border-border text-foreground">
  Secondaire
</Badge>
```
