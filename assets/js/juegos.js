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

// Función para crear un nuevo deck
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
  // console.log(deck); // Mostrar el deck
  deckAleatoria = _.shuffle(deck); // Mezclar el deck
  console.log(deckAleatoria); // Mostrar el deck mezclado
  return deckAleatoria; // Retornar el deck mezclado
}

crearDeck();

// Función para pedir una carta
const pedirCarta = () => {
  if (deckAleatoria.length === 0) { // Verificar si el deck está vacío
    throw 'No hay cartas en el deck'; // Mostrar un error
  }
  const carta = deckAleatoria.pop(); // Sacar la última carta del deck
  console.log(deckAleatoria); // Mostrar el deck sin la última carta
  console.log(carta);
}

pedirCarta();

