/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 * */

// Variables
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

const crearDeck = () => {
  // Crear un deck de cartas
  for (let i = 2; i <= 10; i++) { // Ciclo para las cartas del 2 al 10
    for (let tipo of tipos) { // For of para recorrer el array de tipos
      deck.push(i + tipo); // Agregar la carta al deck
    }
  }

  for (let tipo of tipos) { // For of para recorrer el array de tipos
    for (let especial of especiales) { // For of para recorrer el array de especiales
      deck.push(especial + tipo); // Agregar la carta al deck
    }
  }
  console.log(deck);
}

crearDeck();

