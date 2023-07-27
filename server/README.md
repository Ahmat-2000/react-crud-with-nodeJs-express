Tout d'abord on creer le fichier package.json avec la commande : 

    npm init -y

Dependances à installer pour utiliser node avec express et mysql:

1- installer express avec la commande : npm install express
2- installer mysql avec la commande : npm install mysql2
3- installer cors avec la commande : npm install cors
3- installer bcrypt avec la commande :npm install bcryptjs
4- installer jsonwebtoken avec la commande : npm install jsonwebtoken

#-------------------------------------------------------------
Cors c'est un middleware pour se protèger contre la vulnerabilité cross-site request forgery (CSRF).

#-------------------------------------------------------------

bcryptjs c'est un module pour hasher les mots de passe de nos utilisateur.

on peut installer les trois avec la commande : npm install express cors mysql2 bcrypt
#------------------------------------------------------------

jsonwebtoken nous permet de générer un jeton pour l'autentification des utilisatuers.
#--------------------------------------------------------

Dependances à installer pour mysql2:

    npm install sequelize sequelize-cli

    Ce module nous permet d'écrire nos requettes sous forme
    d'objets javaScript pour les bases de données relationnelles

    Il fonctionne qu'avec mysql2
#---------------------------------------------------------

installer nodemon pour faciliter la mise à jour du server : 
    
    npm install nodemon

    il faut aussi modifier le fichier package.json en ajoutant
    "start": "nodemon index.js" à l'objet script

    -- pour lancer le server, utiliser : npm start