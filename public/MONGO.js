

# si la base de données n'est pas dans /data/db on doit spécifier le chemin avec --dbpath
mongod --dbpath db/

# afficher toutes les base de données
show dbs

# utiliser la base "madatabase"
use madatabase

# voir dans quelle base on est
db

# afficher les collections
show collections

# renommer une collection
db.oldname.renameCollection("newname")

# effacer une collection
db.contacts.drop()

# effacer la base dans laquelle on est
db.dropDatabase()

# insertion
db.contacts.insert({ first: 'Quentin', last: 'Busuttil' })

# sélection
db.contacts.find()
db.contacts.find({ first: 'quentin' })
db.contacts.find({ first: 'quentin', last: 'busuttil' })

# OR sélectionner selon une condition ou une autre
# il faut utiliser $or avec un array dont chaque élément est un objet littéral de sélection
db.users.find({ $or: [{ _id:ObjectId("558d0b395fa02e7e218b4587") }, { _id:ObjectId("558d0b395fa02e7e218b4574") }] })

# récupérer seulement certains champs d'un document
db.users.find({}, { _id: 0, fild1: 1, fild2: 0 })

# type == food || snacks
db.inventory.find({ type: { $in: ['food', 'snacks'] } })

# sélectionner les documents comportant un champ particulier
db.users.find({ birthyear: { $exists: true } })

# sélectionner les documents dont la valeur est différente de
db.users.find({ birthyear: { $ne: 2000 } })

# ne récupérer que le sous-document (récup le sous-document d'id x dans le doc d'id z)
db.users.find({ _id: z, "contacts._id": x }, { "contacts.$._id" : 1 })

# ordonner la sélection
# 1 = croissant/alphabétique et -1 = décroissant/alphabétique inversé
db.users.find().sort({ addedOn: 1 })


# update
# on peut utiliser { multi: true } pour modifier plusieurs documents à la fois
# l'option { upsert: true } permet de créer le document s'il n'existe pas
db.users.update({ _id: x }, { $set: { "firstname": "Baboo" } })

# update en remplaçant le document par un nouvel objet
db.users.update({ _id: 'azert' }, obj)

# update un sous-document d'id y du doc d'id x (dans un tableau de sous-documents appelé contacts),
# on remplace le sous-doc par un autre objet
# le document à modifier resemble ici à
#{
#  _id: x,
#  name: azerty,
#  contacts: [
#    {
#      _id: y,
#      name: 'qwerty',
#      email: 'qwerty@heymail.fr'
#    }
#  ]
#}
db.users.update({ _id: x, "contacts._id": y }, { $set: { "contacts.$":myNewDocument } })

# effacer un champ
db.users.update({ _id: x }, { $unset: { contacts: "" } })

# renommer un champ
db.users.update({}, { $rename: { "ancien_nom": "nouveau_nom" } }, { multi: true })

# effacer un champ de tous les document d'une collection
# correspond à ALTER TABLE users DROP COLUMN zorglub
db.users.update({}, { $unset: { zorglub: "" } }; {multi: true} )

# effacer un document
db.contacts.remove({ _id: ObjectId("55accc6c039c97c5db42f192") })

# effacer tous les documents d'une collection
db.contacts.remove({})

# effacer un sous-document d'id y du doc d'id x (dans un tableau de sous-documents)
db.users.update({ _id: x }, { $pull: { contacts: { _id: y } } })

# dans le même genre $pop permet d'enlever le dernier ou le premier élément d'un tableau
# respectivement en lui passant les valeurs 1 et -1
db.users.update({ _id: x }, { $pop: { contacts: -1 } })
Il est assez lourd de devoir taper à chaque fois db.users.commande, la console Mongo est aussi un shell JavaScript, il est donc tout à fait possible d’enregistrer des choses dans des variables !

// on enregistre la collection dans une variable
t = db.users

// nous pouvons maintenant faire comme ceci
t.find().pretty()
Elle est pas belle la vie ?

De la même manière, pour mettre à jour un objet, détaillons un peu ce que nous faisons ici db.users.update({_id: 'azert'}, obj) :

// on récupère un objet
obj = t.find({ _id: 'azert' });

// on le met à jour comme n'importe quel objet js
obj.city = "Lyon"

// et on en enregistre les modifs
db.users.update({ _id: 'azert' }, obj)
Les dates

JS oblige, les dates sont un peu à part entière. Dans la mesure où nous avons souvent besoin de les traiter, faisons rapidement le tour du propriétaire !

Lorsque l’on veut requêter une date dans Mongo, il faut créer un objet de type Date. Cela se fait soit directement via le constructeur Date de JavaScript, soit via le wrapper Mongo ISODate.

La fonction Date() appelée sans new retourne simplement la date courante en tant que chaine de caractères. Les autres formes, c’est à dire new Date(xxx), new ISODate(xxx) et ISODate(xxx) sont équivalentes et font toutes appel au wrapper ISODate. Il ne s’agit donc que d’une question de préférence personnelle.

Maintenant que nous avons levé l’ambiguïté qu’il peut y avoir entre ces différentes méthodes, utilisons-les. Pour l’exemple, nous allons récupérer les utilisateurs créés depuis le 15 septembre 2015.

db.users.find({ signupDate: { $gte: ISODate("2015-09-15") } })
Évidemment, qui dit date dit aussi heure. Franchissons le cap de la précision, les utilisateurs qui se sont enregistrés après le 15 septembre 2015 à 13h20.

db.users.find({ signupDate: { $gte: ISODate("2015-09-15T13:20:00.000Z") } })
Vous vous apercevez certainement que la précision va jusqu’à la milliseconde… En effet, le moteur de Mongo stocke et traite les dates en nombre de millisecondes depuis l’époque Unix (sous la forme d’un entier de 64 bits, si ça vous intéresse). Nous héritons donc de la précision de ce format.

Vous notez peut-être également que deux lettres viennent s’ajouter à notre équation. Le T vient simplement faire office de séparateur et indique Time, tandis que le Z signifie que nous traitons du temps en Zulu Time [en], autrement dit, l’heure UTC.

La présence ou l’absence du Z est importante. Mongo stocke dans tous les cas la date au format UTC. Cependant, si vous omettez le Z, Mongo considère qu’il s’agit du fuseau horaire courant, donc UTC+1 si vous êtes sur le fuseau horaire de Paris, ou plus généralement CET (Central European Time), autrement dit l’heure d’Europe Centrale.

Vous le comprenez, en l’absence du Z, Mongo fera l’opération pour ajouter ou retrancher des heures à UTC avant de la stocker, tandis que si vous le préciser, il stocke tel quel.

Administration

Sécurité

Gestion des utilisateurs

Par défaut, Mongo est accessible sans authentification et permet toutes les actions sur la base. Il est évident que dès lorsque que votre base est sur un serveur connecté sur Internet et que vous passez en production, cette configuration par défaut manque de sécurité. Ça devient même clairement du suicide si vous permettez de vous connecter à la base depuis le réseau… Réglage à effectuer dans /etc/mongod.conf :

# network interfaces
net:
  port: 27017
  # n'autorise que l'ip localhost (réglage par défaut)
  bindIp: 127.0.0.1
De manière similaire à MySQL, vous ajoutez des utilisateurs et leur attribuez des droits (ici des rôles, sur divers bases). Nous allons pour l’exemple créer un utilisateur « buzut » qui peut lire et écrire dans la base « blog_buzut » :

# on se place dans la base de données "buzut_blog"
use buzut_blog
db.createUser(
    {
      user: "buzut",
      pwd: "azertyytreza",
      roles: [
         { role: "readWrite", db: "buzut_blog" },

         # on peut ajouter d'autres rôles sur d'autres bases
         { role: "read", db: "buzut_shop" }
      ]
    }
)
Une fois vos utilisateurs créés, il faut que vous configuriez mongo pour qu’il demande les accès. Pour cela, dans le fichier de config – situé dans /etc/mongod.conf – il faut ajouter le paramètre de sécurité correspondant :

# sécurity est normalement commenté, il faut le décommenter
# ou l'ajouter s'il n'existe pas
# et ajouter la ligne suivante
security:
  authorization: enabled

# vous pouvez aussi démarrer mongo avec le mode auth directement depuis la ligne de commande
mongod --auth
Si vous avez modifié le fichier de config, il faut que vous redémarriez mongo pour que les changements s’appliquent. Pour cela, faites sudo service mongod restart.

Attention, si vous créez un utilisateur non administrateur et que vous activez ensuite l’authentification, vous ne pourrez plus créer d’autres utilisateurs. Pour créer un utilisateur avec les droits administrateur :

db.createUser(
    {
      user: "admin",
      pwd: "azertyytreza",
      roles: [
         { role: "dbOwner", db: "blog_buzut" }
      ]
    }
)
Bien pratique, vous trouverez la liste des rôles dans la doc et vous pouvez même créer des rôles sur mesure pour plus de souplesse.

Les utilisateurs sont stockés dans admin.system.users, vous pouvez donc listez l’ensemble des utilisateurs en affichant cette collection ou en utilisant la commande show users.

Vous pouvez changer le mot de passe d’un utilisateur avec db.changeUserPassword("username", "newPass") et effacer un utilisateur avec db.dropUser("username"). Ces deux commandes nécessitent les privilèges administrateur et elles doivent être exécutées depuis la base à laquelle les utilisateurs sont liés.

Enfin, il est également possible d’ajouter et révoquer des droits ultérieurement. Nous utiliserons pour cela les commandes db.grantRolesToUser et db.revokeRolesFromUser :

# il faut être placé dans la bonne base…
# vous commencez à avoir l'habitude

# pour ajouter des droits
db.grantRolesToUser(
    "buzut",
    [
      { role: "readWrite", db: "logs" }
    ]
)

# et pour enlever des droits
db.revokeRolesFromUser(
    "buzut",
    [
      { role: "readWrite", db: "logs" }
    ]
)
Connexion

Une fois les utilisateurs créés et la base paramétrée pour passer en mode « authorization », il faudra que vous vous connectiez avec vos identifiants, sinon, vous serez jetés ! Pour ce faire, il faut préciser le login et le mot de passe ainsi que la base à laquelle l’utilisateur est rattaché :

mongo -u buzut -p azertyyterza --authenticationDatabase blog_buzut

# il est aussi possible de se logger après la connexion
mongo
use blog_buzut
db.auth("buzut", "azertyyterza")
Chiffrement

Je ne parlerai pas ici de chiffrer la base en elle-même – cette fonction n’est disponible que pour WiredTigger dans la version enterprise de Mongo. Sans avoir la version entreprise, vous pouvez chiffrer vos partitions Linux [en] afin de garantir un niveau de sécurité encore plus élevé. Cependant, ce n’est pas spécifique à Mongo donc nous n’en parlerons pas ici.

Nous aborderons ici la question de chiffrer la transmission de données. En effet, bien que vous ayez configuré une authentification, si vous vous connectez à votre base de données mongo depuis un client distant, tout transite en clair. En d’autres termes, il est d’une simplicité déconcertante « d’écouter » toutes les données qui transitent entre vos machines. Pour contrez cela, nous allons utiliser SSL/TLS, le même protocole de chiffrement qu’utilisent certains site web.

Nous générons d’abord une clef auto-signée pour 365 jours :

cd /etc/ssl/
openssl req -newkey rsa:4096 -new -x509 -days 365 -nodes -out mongodb-cert.crt -keyout mongodb-cert.key

# on créer ensuite un fichier pem en concaténant la clef et le certificat
cat mongodb-cert.key mongodb-cert.crt > mongodb.pem
Il faut évidemment configurer mongo pour qu’il requiert des connexions chiffrées et lui indiquer l’emplacement du certificat. Comme d’habitude, on se dirige vers /etc/mongod.conf et on ajoute les infos liées au ssl dans la partie net.

net:
   ssl:
      mode: requireSSL
      PEMKeyFile: /etc/ssl/mongodb.pem
Il est également possible d’accepter à la fois les connexions sécurisées et non sécurisées. Pour cela, il faudra renseigner le paramètre allowSSL ou preferSSL en lieu et place de requireSSL. Le premier est le plus permissif puisqu’il laisse le choix, tandis que le second peut s’avérer être un bon compromis. En effet, il laisse le choix aux client du SSL ou non, mais il l’impose aux connexions entre serveurs.

Enfin, côté client, vous devrez spécifier qu’il faut se connecter via SSL. En outre, comme nous avons ici auto-signé notre certificat et que nous ne requérons pas l’authentification via SSL, nous demanderons à Mongo d’ignorer la validation du certificat. Le SSL – qui permet à la fois de chiffrer et d’authentifier – sera ici uniquement utilisé pour le chiffrement. Pour plus d’information là dessus, n’hésitez pas à lire la doc pour la sécurisation du serveur et du client.

mongo --ssl --sslAllowInvalidCertificates --host mongo.buzut.fr -u buzut -p azertyytreza --authenticationDatabase buzut_blog
Sauvegarde et restauration

Enfin, une base de données doit parfois être sauvegardée et restaurée. De la même manière que mysqldump permet de faire cela chez MySQL, il est extrêmement facile de le faire avec Mongo. Dans sa forme la plus simple il suffit d’appeler mongodump et c’est tout ! Le dump est par défaut situé dans le dossier courant. Évidemment, quelques options bien pratiques sont à connaître :

-u
Préciser le nom d’utilisateur.
-p
Préciser le mot de passe.
-d
Indiquer la base de données à sauvegarder. Par défaut, le dump contient toutes les bases.
-c
Indiquer une ou plusieurs collections à sauvegarder.
-o
Préciser un chemin pour l’export. - envoie les données sur la sortie standard.
Pas de sauvegarde sans restauration, nous sommes d’accord ! On utilisera pour ça mongorestore adresse_du_dump. Les options sont les mêmes que mongodump. -c permet de ne récupérer qu’une seule collection. -d indique la base de données dans laquelle importer les données. Si elle n’existe pas, elle sera créé. Si vous importez dans une base de données existante et qui n’est pas vide, mongorestore insère les nouvelles données sans modifier celles existantes. Et dans le cas où un document à importer possède le même _id qu’un document existant, ce dernier ne sera pas remplacé. Pour vider la base de données cible avant import, il existe l’option --drop.

Index

Comme dans MySQL, les index permettent d’accélérer les requêtes en évitant au moteur de base de données de devoir scanner tous les documents de la collection afin de trouver ceux correspondant à la requête.

Voici les commandes les plus courantes :

# créer un index
db.users.createIndex({ username: 1 })

# créer un index et préciser que la valeur doit être unique
db.users.createIndex({ email: 1 }, { unique: true })
L’index ci-dessus considérera une absence de valeur comme une valeur. Il n’y a donc qu’un email qui pourra être vide ensuite mongo considérera les autres email sans valeur comme dupliqués et refusera de les ajouter. Pour empêcher ce comportement, on peut utiliser l’option sparse.

db.users.createIndex({ email: 1 }, { unique: true, sparse: true })

# pour rechercher en mode fulltext et non en exact match
# il est possible d'utiliser l'index de type text
db.users.createIndex({ firstname: "text" })

# il ne peut y avoir qu'un seul index text par collection
# cependant, on peut les combiner
db.users.createIndex({ firstname: "text", lastname: "text" })

# afficher les index d'une collection
db.collection.getIndexes()

# supprimer un index (le nom de l'index est fourni par getIndexes)
db.collection.dropIndex("indexName")
Données et statistiques

Il est intéressant de savoir ce qui se passe dans sa base. Quel moteur de stockage est utilisé, quels sont les indexes, combien il y en a, quelle taille font les collections… Voici quelques commandes bien pratiques :

# pour avoir toute sorte d'infos sur le serveur (paramètres de config etc)
db.serverStatus()

# connaître en un clin d'œil le moteur de stockage
db.serverStatus().storageEngine

# connaître la taille des indexes en mémoire (mieux vaut que ça rentre dans la RAM)
db.collection.totalIndexSize()
Pour la route, la doc de php propose une table des correspondances entre les commandes SQL et Mongo.

Et vous, comment s’est passée la transition du SQL à Mongo ? Lequel préférez-vous ?

Déjà 13 réponses, rejoignez la discussion !

julien dit  :
10 juillet 2015 à 12 h 19 min
Merci pour ce tutot

Répondre
Buzut dit  :
10 juillet 2015 à 13 h 35 min
Merci de ton commentaire Julien.

Répondre
Tisha dit  :
18 novembre 2016 à 14 h 34 min
You write so honsetly about this. Thanks for sharing!

Répondre
Tom dit  :
4 décembre 2015 à 10 h 27 min
Merci pour ce tuto.
Par contre je ne suis pas certain que parler d’export/import soit souhaitable. Sauvegarde/Restauration serait plus juste d’autant plus que cela peut apporter de la confusion avec l’utilitaire mongoexport, même s’il n’est pas mentionné.

Répondre
Buzut dit  :
4 décembre 2015 à 10 h 46 min
Très juste, c’est corrigé !

Répondre
KO dit  :
14 décembre 2015 à 18 h 26 min
Merci pour ce tuto
j’ai une petit problème :j’ai appliqué la création de user et mot de passe pour madatabase mais qu’on j’essaye de se connecter a cette base depuis rebomongo il m’affiche le message d’erreur : cannot connect to mongodb (54.165.245.132:27017) error unable to connect to mongodb

merci d’avance

Répondre
Buzut dit  :
14 décembre 2015 à 18 h 47 min
Je n’ai jamais utilisé robomongo. Mais vérifies que ton utilisateur est bien créé dans la bonne base de données et qu’il possède un rôle suffisant pour les actions dont tu as besoin. Tentes aussi de t’y connecter via le shell mongo. Si oui, c’est que le problème vient de robomongo et non de mongoDB !

Répondre
Fred dit  :
28 mars 2016 à 0 h 02 min
Super tuto merci :)
J’ai cependant un problème: impossible d’afficher (pour pouvoir le modifier par la suite) le fichier /etc/mongod/conf depuis le shell. Quelqu’un peut m’éclairer? Merci d’avance

Répondre
Buzut dit  :
30 mars 2016 à 16 h 53 min
Le fichier mongod.conf est directement dans /etc, il n’y a pas de dossier intermédiaire !

Répondre
Gael dit  :
20 juillet 2016 à 12 h 57 min
Bonjour,
Est ce que en MongoDB il existe cette fonctionnalité de pouvoir faire un fichier de commandes et l’executer sur le prompt de Mongo comme on le fait avec Mysql et un fichier .sql ?
Merci d’avance pour ton retour

Répondre
Buzut dit  :
20 juillet 2016 à 14 h 05 min
Oui c’est tout à fait possible. Tu auras plus d’infos ici https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/

Répondre
Elliot dit  :
17 octobre 2016 à 20 h 42 min
Merci pour cet article

Répondre
Pascal dit  :
23 novembre 2016 à 7 h 01 min
Super tuto très intéressant. Il regroupe l essentiel des commandes mongodb à connaître

Répondre
Laisser un commentaire

Votre adresse de messagerie ne sera pas publiée. Les champs obligatoires sont indiqués avec *

Que souhaitez-vous dire ? *

Commentaire

Quel est votre nom ? *

Nom

Quel est votre email ? *

Email

Vous avez un site web ? Partagez-le !

url

Notifiez-moi des commentaires à venir via e-mail. Vous pouvez aussi vous abonner sans commenter.
Notifications :

Laisser un commentaire

Catégories

Linux
Serveur
JavaScript
HTML/CSS
PHP
WordPress
Marketing
Quentin Busuttil – Licence Creative Commons BY-NC-ND


