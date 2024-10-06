(() => {
  "use strict";
  // Variables
  let deck = [];
  const tipos = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];

  let puntosJugador = 0;
  let puntosComputadora = 0;

  // Referencias HTML
  const btnPedir = document.querySelector("#btnPedir");
  const btnDetener = document.querySelector("#btnDetener");
  const btnNuevo = document.querySelector("#btnNuevo");

  const divCartasJugador = document.querySelector("#jugador-cartas");
  const divCartasComputadora = document.querySelector("#computadora-cartas");

  const puntosHTML = document.querySelectorAll("small");

  // Función para crear un nuevo deck
  const crearDeck = () => {
    // Crear un deck de cartas
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let especial of especiales) {
        deck.push(especial + tipo);
      }
    }
    // console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deckAleatoria);
    return deck;
  };

  crearDeck();

  // Función para pedir una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    const carta = deck.pop();
    return carta;
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // Turno Computadora
  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = pedirCarta();
      puntosComputadora = puntosComputadora + valorCarta(carta);
      console.log(puntosComputadora);
      puntosHTML[1].innerText = puntosComputadora;

      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartasComputadora.append(imgCarta);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    // Tiempo de espera para mostrar el resultado
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador gana");
      } else {
        alert("Computadora gana");
      }
    }, 100);
  };

  // Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log(puntosJugador);

    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    // Verificar si los puntos del jugador son mayores a 21
    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  // Evento para detener el juego
  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  });

  // Evento para reiniciar el juego
  btnNuevo.addEventListener("click", () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  });
})();
