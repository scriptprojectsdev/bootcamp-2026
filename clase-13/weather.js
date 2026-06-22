//Esperar que cargue la pagina
document.addEventListener("DOMContentLoaded", () => {
  //Event listener del buton buscar
  document.querySelector("#buscar").addEventListener("click", clickHandler);
});

//Handle button click "buscar"
const clickHandler = async () => {
  //Agarar texto que escribio el usuario
  const texto = document.getElementById("ciudad");
  console.log("Calling https://api.latlng.work/api?q=", texto.value);

  //Llamando el API
  const response = await fetch("https://api.latlng.work/api?q=" + texto.value, {
    headers: {
      "X-Api-Key": "latlng_t1i34kffewua9qemii7mxadr2sepwb7u",
    },
  });

  //Chequeamos si hubo un error
  if (!response.ok) {
    console.error(response.error);
  } else {
    //Convierte el resultado en un objecto de javascript
    const json = await response.json();
    const primerResultado = json.features[0];
    const coords = primerResultado.geometry.coordinates.join(", ");
    const name = primerResultado.properties.name;
    console.log(`${name} esta en las coordenadas [${coords}]`);

    //Llamas API Clima con las coordenadas obtenidas
  }
};
