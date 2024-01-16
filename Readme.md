# TEMP-VIDEO-STREAM

#### Temp-video-stream est un utilitaire permettant l'échange rapide de vidéos.
#### Il permet de rendre une vidéo streamble en créant un serveur web temporaire diffusant la vidéos.
#### L'utilisation d'un mot de passe pour accéder à la vidéo est possible et décrite dans les options de commande.


Utilisation : 
```bash
git clone https://github.com/enzosln/Temp-video-stream.git
cd Temp-video-stream
npm i
node index.js [OPTIONS]

```

```
Options :
      --help      Affiche l'aide                                       [booléen]
      --version   Affiche le numéro de version                         [booléen]
  -p, --port      Le port à utiliser                           [nombre] [requis]
  -f, --filepath  Le chemin du fichier           [chaîne de caractères] [requis]
  -P, --password  Le mot de passe (optionnel)             [chaîne de caractères]
```
#### Lors de l'utilisation d'un mot de passe, l'utilisateur devra passer le bon mot de passe dans l'url directement en méthode GET. Exemple :

http://localhost:3000/?password=monsupermotdepasse

