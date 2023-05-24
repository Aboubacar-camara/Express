const express = require('express');
const app = express();

// Middleware pour vérifier les heures de travail
const middlewareHeuresTravail = (req, res, next) => {
  const jourActuel = new Date().getDay(); // 0 est dimanche, 6 est samedi
  const heureActuelle = new Date().getHours();

  if (jourActuel >= 1 && jourActuel <= 5 && heureActuelle >= 9 && heureActuelle < 17) {
    // C'est un jour ouvrable et les heures de travail, continuer vers le prochain middleware
    next();
  } else {
    res.send('L\'application web est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9h à 17h).');
  }
};

// Servir les fichiers statiques du répertoire "public"
app.use(express.static('public'));

// Appliquer le middleware des heures de travail à toutes les routes
app.use(middlewareHeuresTravail);

// Page d'accueil
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

// Page Nos Services
app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/public/services.html');
});

// Page Contactez-nous
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Le serveur fonctionne sur le port 3000');
});
