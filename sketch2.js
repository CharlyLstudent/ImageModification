var s = 600; // taille du canvas
var img; 
var slider; // mon slider qui va gérer la quantité de rouge à mettre dans l'image
let checkbox;
let checkbox2;
let checkbox3;
var imageBlackWHite;

function preload() { // fonction qui permet de pré charger l'image
  img = loadImage('assets/tourbillon.jpg');
}

function setup(){   
  createCanvas(2*s,s); 
  pixelDensity(1); // pour ne pas qu'il y ait de bug d'affichage

  slider = createSlider(0,255, 1); // création du slider avec valeur min, max, et valeur initiale
  slider.position(200,650); // position du slider dans la page
  slider.style('width', '200px'); // largeur du slider (css)

  checkbox = createCheckbox('Black & White', false);
  checkbox2 = createCheckbox('Négatif', false);
  checkbox3 = createCheckbox('Sepia', false);
  imageBlackWHite = createImage(s,s);
}

function draw(){ //
  background(128);
  img.resize(s,s); // on déforme l'image pour s'adapter au canvas (on peut faire l'inverse)
  let facteur =  slider.value(); // récuopération de la valeur du slider
  loadPixels(); // chargement de la variable "pixels" du canvas
  img.loadPixels(); // charge de la variable img.pixels de l'image
  imageBlackWHite.loadPixels();
  // on boucle sur les lignes et les colonnes de l'image
  if(!checkbox.checked() && !checkbox2.checked() && !checkbox3.checked()){
    copyImage();
  }
  if (checkbox.checked()) {
    blackWhite();
  } 

 if (checkbox2.checked()){
  negatif();
 }

 if(checkbox3.checked()){
  sepia();
 }

  imageBlackWHite.updatePixels();   // mise à jour de la valeur des pixels du canvas
  image(imageBlackWHite, 0, 0);
  image(img, s, 0);
}

function blackWhite(){
  for (var ligne = 0; ligne < s; ligne++) { 
    for (var col = 0; col < s; col++) {
        let index = (s * ligne + col)*4;
        let moyenne = ( img.pixels[index + 0] + img.pixels[index + 1] + img.pixels[index + 2]) /3   // correspondance entre la 2D et la 1D 
        imageBlackWHite.pixels[index + 0] = moyenne ; // on multiplie la composante rouge grâce au slider
        imageBlackWHite.pixels[index + 1] = moyenne; // on recoopie la composante verte de l'image
        imageBlackWHite.pixels[index + 2] = moyenne ; // on recoopie la composante bleue de l'image
        imageBlackWHite.pixels[index + 3] = 255; // on recoopie la composante alpha de l'image
      }
  }
}

function negatif(){
  for (var ligne = 0; ligne < s; ligne++) { 
    for (var col = 0; col < s; col++) {
        let index = (s * ligne + col)*4;
        let cyan = img.pixels[index + 1] + img.pixels[index + 2];
        let magenta = img.pixels[index + 2] + img.pixels[index + 0];
        let jaune = img.pixels[index + 0] + img.pixels[index + 1];
        imageBlackWHite.pixels[index + 0] = cyan; // on multiplie la composante rouge grâce au slider
        imageBlackWHite.pixels[index + 1] = magenta; // on recoopie la composante verte de l'image
        imageBlackWHite.pixels[index + 2] = jaune; // on recoopie la composante bleue de l'image
        imageBlackWHite.pixels[index + 3] = 255; // on recoopie la composante alpha de l'image
      }
  }
}

function copyImage(){
  for (var ligne = 0; ligne < s; ligne++) { 
    for (var col = 0; col < s; col++) {
        let index = (s * ligne + col)*4;
        imageBlackWHite.pixels[index + 0] = img.pixels[index + 0] ; // on multiplie la composante rouge grâce au slider
        imageBlackWHite.pixels[index + 1] = img.pixels[index + 1]; // on recoopie la composante verte de l'image
        imageBlackWHite.pixels[index + 2] = img.pixels[index + 2] ; // on recoopie la composante bleue de l'image
        imageBlackWHite.pixels[index + 3] = 255; // on recoopie la composante alpha de l'image
      }
  }
}

function sepia(){
  for (var ligne = 0; ligne < s; ligne++) { 
    for (var col = 0; col < s; col++) {
        let index = (s * ligne + col)*4;
        let sepia= img.pixels[index + 0] / 4;
        let moyenne = ( img.pixels[index + 0] + img.pixels[index + 1] + img.pixels[index + 2]) /3
        imageBlackWHite.pixels[index + 0] = moyenne + sepia; // on multiplie la composante rouge grâce au slider
        imageBlackWHite.pixels[index + 1] = moyenne; // on recoopie la composante verte de l'image
        imageBlackWHite.pixels[index + 2] = moyenne; // on recoopie la composante bleue de l'image
        imageBlackWHite.pixels[index + 3] = 255; // on recoopie la composante alpha de l'image
     }
  }
}