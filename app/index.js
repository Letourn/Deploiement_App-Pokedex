/**
 * Serveur BackEnd Pokedex
 */

const fs = require('fs');
console.log ("Sadey");

//Définir l'emplacement des fichiers bases de données

const POKEDEX = './DATA/pokedex.json';

//Définir l'emplacement des images 
const IMAGES = './FILES/images';

//Définir un port 
const PORT = 5001;

// Lancer un serveur sur un port 
const express = require('express'); //Oblige qu'il y est la dépendance 'express' d'installé
const app = express();

//C'est pour l'image
app.use(express.static('FILES'));

// Pour éviter d'avoir des erreurs CORS
const cors= require('cors');
app.use(cors());

//Lancement du serveur et attente d'une requête du client
app.listen(
    PORT,           //Port
    '0.0.0.0',    //Adresse
    () => {         //Fonction de callback (n'a pas de nom)
        console.log('Serveur Pokedex is listening on ' + PORT);
    }
);

// Créer la route qui renvoit tout 
app.get(
    '/all',
    findAllPokemon
)

// Fonction de lecture de tous les Pokemons
function findAllPokemon(request, response) {

    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX);

    // 2. Analyse du JSON (on a un tableau nommé pokedex contenant tout le JSON)
    let pokedex = JSON.parse(data);

    // 3. Retour de tout le JSON
    response.send(pokedex);
}

app.get(
    '/hasard',
    findRandPokemon
)


//Fonction qui affiche un pokemon aléatoire du pokedex
function findRandPokemon(request, response) {

    let data = fs.readFileSync(POKEDEX);

    let pokedex = JSON.parse(data);

    //Création d'une variable qui prend un nombre aléatoire entre 1 et la taille du tableau
    let random = Math.floor(Math.random() * pokedex.length) + 1;
    
    response.send(pokedex[random]);
}

app.get(
    '/pokemon/:id',
    findPokemonByID
)

//Fonction qui affiche un pokemon selon l'ID entré dans le path
function findPokemonByID(request, response) {
    console.log(request.params.id);

    let data = fs.readFileSync(POKEDEX);

    let pokedex = JSON.parse(data);

    //Variable contenant l'ID entré par l'utilisateur
    let pokemon = request.params.id - 1;

    if (pokemon > pokedex.length -1) {
        response.send('ID trop grand');
    }

    else if (pokemon <= -1){
        response.send('ID trop petit');
    }

    else {
        response.send(pokedex[pokemon]);
    }
    
}

app.get (
    '/pokemon/nom/:name',
    findPokemonByName
)

//Fonction qui affiche un pokemon selon le nom entré dans le path
function findPokemonByName(request, response) {
    console.log(request.params.name);

    let data = fs.readFileSync(POKEDEX);

    let pokedex = JSON.parse(data);

    //Variable contenant le nom entré par l'utilisateur
    let name = request.params.name;

    const nameFR = pokedex.filter((pokemon) => pokemon.name.french === name);

    response.send(nameFR);
}


