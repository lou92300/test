# Introduction aux traitements des données d'un formulaire

Les données d'un formulaire sont envoyé sous chaîne de caractères vers le serveur avec type MIME `application/x-www-form-urlencoded` (qui est définit par défaut).
Pour un envoi de fichier ça sera le type MIME `multipart/form-data` et il faudra le définir via l'attribut `enctype` du formulaire

```html
    <!-- sans envoi de fichier -->
    <form action="/blog" method="post">
        <label for="author">Auteur :</label>
            <input type="text" name="author" id="author">
        <!-- ... -->

    <!-- avec envoi de fichier -->
    <form action="/blog" method="post" enctype="multipart/form-data">
        <label for="image">Fichier :</label>
        <input type="file" name="image" id="image">
        <!-- ... -->
```

Dans les 2 cas, une requête sera effectué sur notre serveur sur la route `/blog` avec la méthode `post`

donc notre serveur s'attends à trouver l'instruction suivante:

```js
app.post("/blog", (req, res) => {/*...*/});
```

Ok très bien, mais comment récupérer ces données ?
Il va falloir convertir(parser) ces données dans un format manipulable en JS (un objet).

Pour ça on va mettre en place un middleware fournit par Express `express.urlencoded`.

*il fallait avant la version 4.16 d'Express installer le module body-parser, il est maintenant intégré à Express*

```js
app.use(express.urlencoded({extended: true}));
// extended à true permet d'utiliser la librairie "qs" qui gère les tableaux et les objets, plus complet, plus lourd
// extended à false permet d'utiliser la librairie "querystring" qui gère les chaînes de caractères et les tableaux, plus léger, moins complet
```

Ceci va activer une propriété `body` dans l'objet `req`.
Et si nous avons un input avec un attribut name qui a pour valeur author comme ça :
```html
<input type="text" name="author" id="author"> 
ça va créer une paire clé/valeur envoyer sur la route
```
Alors nous pouvons récupérer la valeur de l'input :
```js
console.log(req.body.author); 
```

ce qui donnerai dans la route post :
```js
app.post("/blog", (req, res) => {
    console.log(req.body.author);    
});
```

Donc si l'utilisateur écris Jako:
- author devient la clé
- Jako devient sa valeur
- l'ensemble devient une propriété de l'objet `body`