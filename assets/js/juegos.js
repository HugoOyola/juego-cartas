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
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

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
  console.log(deck); // Mostrar el deck
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
  // console.log(deckAleatoria); // Mostrar el deck sin la última carta
  // console.log(carta);
  return carta; // Retornar la carta
}

// pedirCarta();

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1); // Obtener el valor de la carta sin el tipo de carta
  return (isNaN(valor)) ? // Verificar si el valor es un número
    (valor === 'A') ? 11 : 10 // Verificar si el valor es A, si es A regresar 11, si no regresar 10
    : valor * 1; // Si no es A, regresar el valor multiplicado por 1
}

// Turno Computadora
const turnoComputadora = (puntosMinimos) => {
  do {
  const carta = pedirCarta(); // Pedir una carta
  puntosComputadora = puntosComputadora + valorCarta(carta); // Sumar el valor de la carta a los puntos del jugador
  console.log(puntosComputadora);
  puntosHTML[1].innerText = puntosComputadora; // Mostrar los puntos del jugador en el HTML

  const imgCarta = document.createElement('img'); // Crear una imagen
  imgCarta.src = `assets/cartas/${carta}.png`; // Agregar la ruta de la imagen
  imgCarta.classList.add('carta'); // Agregar la clase de la imagen
  divCartasComputadora.append(imgCarta); // Agregar la imagen al div de cartas del jugador

  if(puntosMinimos > 21) {
    break;
  }

  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

  // Tiempo de espera para mostrar el resultado
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert('Nadie gana');
    } else if (puntosMinimos > 21) {
      alert('Computadora gana');
    } else if (puntosComputadora > 21) {
      alert('Jugador gana');
    } else {
      alert('Computadora gana');
    }
  }, 100);
}
// valor = valorCarta(pedirCarta());
// console.log({valor})


// Eventos
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta(); // Pedir una carta
  puntosJugador = puntosJugador + valorCarta(carta); // Sumar el valor de la carta a los puntos del jugador
  console.log(puntosJugador);

  puntosHTML[0].innerText = puntosJugador; // Mostrar los puntos del jugador en el HTML

  const imgCarta = document.createElement('img'); // Crear una imagen
  imgCarta.src = `assets/cartas/${carta}.png`; // Agregar la ruta de la imagen
  imgCarta.classList.add('carta'); // Agregar la clase de la imagen
  divCartasJugador.append(imgCarta); // Agregar la imagen al div de cartas del jugador

  // Verificar si los puntos del jugador son mayores a 21
  if(puntosJugador > 21) {
    btnPedir.disabled = true; // Deshabilitar el botón de pedir carta
    btnDetener.disabled = true; // Deshabilitar el botón de detener
    turnoComputadora(puntosJugador); // Turno de la computadora
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true; // Deshabilitar el botón de pedir carta
    btnDetener.disabled = true; // Deshabilitar el botón de detener
    turnoComputadora(puntosJugador); // Turno de la computadora
  }
})

// Evento para detener el juego
btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true; // Deshabilitar el botón de pedir carta
  btnDetener.disabled = true; // Deshabilitar el botón de detener
  turnoComputadora(puntosJugador); // Turno de la computadora
})

// Evento para reiniciar el juego
btnNuevo.addEventListener('click', () => {
  console.clear(); // Limpiar la consola
  deck = []; // Limpiar el deck
  deck = crearDeck(); // Crear un nuevo deck
  puntosJugador = 0; // Reiniciar los puntos del jugador
  puntosComputadora = 0; // Reiniciar los puntos de la computadora
  puntosHTML[0].innerText = 0; // Mostrar los puntos del jugador en el HTML
  puntosHTML[1].innerText = 0; // Mostrar los puntos de la computadora en el HTML
  divCartasJugador.innerHTML = ''; // Limpiar las cartas del jugador
  divCartasComputadora.innerHTML = ''; // Limpiar las cartas de la computadora
  btnPedir.disabled = false; // Habilitar el botón de pedir carta
  btnDetener.disabled = false; // Habilitar el botón de detener
})