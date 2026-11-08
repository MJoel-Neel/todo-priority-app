# 📝 Todo Priority App

Une application de gestion de tâches (To-Do List) moderne, réactive et esthétique. Conçue pour vous aider à organiser vos journées efficacement grâce à un système de priorités, de catégories et de minuteurs intégrés.

## ✨ Fonctionnalités

* **Ajout et suppression de tâches** : Interface simple et intuitive.
* **Système de priorités** : Classez vos tâches en *Urgent*, *Moyenne* ou *Basse*.
* **Catégories** : Organisez vos tâches par contexte (*Travail*, *Personnel*, *Courses*).
* **Minuteur personnalisable** : Assignez un compte à rebours (de 1 à 30 minutes) à une tâche spécifique. Un badge animé vous avertit lorsque le temps est écoulé !
* **Glisser-déposer (Drag & Drop)** : Réorganisez l'ordre de vos tâches manuellement en les faisant glisser.
* **Filtres dynamiques** : Affichez uniquement les tâches correspondant à une priorité donnée.
* **Sauvegarde automatique** : Toutes vos tâches sont sauvegardées dans le `localStorage` de votre navigateur. Vos données restent intactes même après avoir actualisé ou fermé la page.
* **Sélection multiple** : Sélectionnez plusieurs tâches pour les marquer comme terminées en un seul clic.
* **Thème sombre** : Profitez d'une interface agréable pour les yeux grâce au thème `night` de DaisyUI.
* **100% Responsive** : L'application s'adapte parfaitement aux téléphones, tablettes et ordinateurs.

## 🛠️ Technologies utilisées

Ce projet a été construit avec les technologies suivantes :

* **React 19** (via Vite)
* **TypeScript** (pour un code robuste et typé)
* **Tailwind CSS v4** (pour le style utilitaire)
* **DaisyUI v5** (composants UI et thème `night`)
* **Lucide React** (pour les icônes SVG)

## 🚀 Installation et Lancement

Pour exécuter ce projet localement sur votre machine, suivez ces étapes :

### Prérequis
* [Node.js](https://nodejs.org/) (version 20.19+ ou 22.12+ recommandée)
* Un gestionnaire de paquets (npm, pnpm ou yarn)

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/MJoel-Neel/todo-priority-app.git
   ```

2. **Se déplacer dans le dossier du projet :**
   ```bash
   cd todo-priority-app
   ```

3. **Installer les dépendances :**
   ```bash
   npm install
   ```

4. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```

5. **Ouvrir l'application :**
   Ouvrez votre navigateur et rendez-vous sur [http://localhost:5173](http://localhost:5173).

## 💡 Comment utiliser l'application ?

1. **Ajouter une tâche** : Tapez votre tâche, choisissez sa priorité, sa catégorie et (optionnellement) un minuteur, puis cliquez sur **Ajoutez**.
2. **Charger les exemples** : Si votre liste est vide, cliquez sur le bouton **"Charger les 5 tâches d'exemple"** pour découvrir l'application avec des données pré-remplies.
3. **Réorganiser** : Cliquez et maintenez le clic sur l'icône `⋮⋮` à gauche d'une tâche pour la faire glisser vers le haut ou le bas.
4. **Terminer** : Cochez la case à gauche d'une tâche pour la sélectionner, puis cliquez sur **"Finir la sélection"** en haut à droite.

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, de le modifier et de le distribuer.

---
*Développé avec ❤️ par [Neel / MJoel-Neel]*
***