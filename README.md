# Mèche — site vitrine

Même principe que Brasier : un seul dossier, prêt à mettre en ligne, avec le formulaire de rendez-vous déjà connecté (pas besoin de le rajouter après).

## Ce que contient ce dossier

```
package.json        ← obligatoire, indique à Vercel comment lancer le site
app/
  layout.js
  globals.css
  page.js            ← tout le contenu du site + le formulaire de RDV
```

## Avant de mettre en ligne : récupère ta clé Web3Forms

1. Va sur [web3forms.com](https://web3forms.com)
2. Entre l'adresse email où tu veux recevoir les demandes de rendez-vous
3. Clique **Create Access Key**, va voir ta boîte mail, copie la clé reçue
4. Ouvre `app/page.js` avec un éditeur de texte, remplace `COLLE_TA_CLE_ICI` (tout en haut du fichier) par ta vraie clé, entre guillemets

## Étapes pour le mettre en ligne (identiques à Brasier)

1. Va sur [github.com](https://github.com), connecte-toi
2. **+** en haut à droite → **New repository** → nomme-le `meche` → **Create repository**
3. Ne coche ni README, ni .gitignore, ni licence (on a déjà les nôtres)
4. Sur la page du repo, clique **uploading an existing file**
5. Ouvre le dossier de ce projet sur ton ordinateur, sélectionne tout ce qu'il contient (Ctrl+A / Cmd+A) et glisse-le dans la zone d'upload — y compris le dossier `app` tel quel
6. Descends en bas, clique **Commit changes**
7. Va sur [vercel.com](https://vercel.com), **Continue with GitHub**
8. **Add New** → **Project** → trouve `meche` dans la liste → **Import**
9. Laisse les réglages par défaut, clique **Deploy**
10. Après 1-2 minutes, ton site est en ligne

## Vérifie qu'il n'y a pas de traduction automatique

Avant de toucher à GitHub, désactive la traduction automatique de ton navigateur (icône dans la barre d'adresse → "Afficher la page d'origine" ou "Ne jamais traduire ce site"). Sinon le contenu des fichiers peut être abîmé pendant l'envoi.

## Si le build échoue sur Vercel

Copie-colle le message d'erreur complet affiché sur Vercel (depuis "Running build in..." jusqu'à la fin) — les erreurs les plus courantes sont : fichiers `page.js`/`layout.js`/`globals.css` pas dans le dossier `app`, ou contenu abîmé par la traduction automatique du navigateur.
