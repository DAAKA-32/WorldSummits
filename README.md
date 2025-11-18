# 🏔️ WorldSummits

Une application web moderne et immersive pour explorer les plus hautes montagnes du monde avec des données interactives, des effets visuels professionnels et un design haut de gamme.

## ✨ Fonctionnalités

### 🌍 Exploration Complète
- **20+ montagnes** répertoriées couvrant **6 continents**
- Filtrage par continent, altitude, difficulté et dangerosité
- Recherche intelligente par nom ou pays
- Vue détaillée pour chaque montagne avec statistiques complètes

### 📊 Visualisations Interactives
- Graphiques dynamiques avec **Recharts**
- Comparateur visuel de tailles entre montagnes
- Statistiques en temps réel (altitude, taux de réussite, mortalité)
- Carrousels animés par continent

### 🎯 Planification d'Expédition
- **Simulateur d'expédition** interactif
- Timeline détaillée avec étapes d'ascension
- Checklist d'équipement personnalisée
- Informations sur budget, durée et meilleures saisons

### 🎨 Design Moderne
- **Mode clair/sombre** avec transitions fluides
- Palette orange/noir/blanc (#F97316, #0F0F0F, #FFFFFF)
- Animations **Framer Motion** (parallax, fade, hover)
- Design responsive (mobile, tablet, desktop)

## 🛠️ Stack Technique

- **Next.js 14+** avec App Router
- **TypeScript** pour le typage
- **Tailwind CSS** pour le styling
- **ShadCN UI** pour les composants
- **Framer Motion** pour les animations
- **Recharts** pour les graphiques
- **Lucide React** pour les icônes

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Pages Principales

- `/` - Page d'accueil avec hero et carrousels
- `/mountains` - Liste des montagnes avec filtres
- `/mountains/[id]` - Détails d'une montagne
- `/comparator` - Comparateur de montagnes
- `/expedition/[id]` - Simulateur d'expédition
- `/about` - À propos du projet

## 📊 Structure des Données

Les données des montagnes sont dans `data/mountains.json` avec :
- Informations géographiques (altitude, pays, continent)
- Statistiques (taux de réussite, mortalité, durée moyenne)
- Informations d'expédition (difficulté, budget, équipement)
- Histoire (première ascension, alpinistes)
- Dangers spécifiques

## 🎨 Palette de Couleurs

- Orange : `#F97316`
- Noir : `#0F0F0F`
- Blanc : `#FFFFFF`

---

**WorldSummits** - Explorez les plus hauts sommets du monde 🏔️
