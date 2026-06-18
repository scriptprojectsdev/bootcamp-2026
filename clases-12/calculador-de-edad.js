document.addEventListener("DOMContentLoaded", () => {
  // Elejimos los elementos
  let elementoFecha = document.getElementById("fecha");
  let elementoResultado = document.getElementById("divResult");

  // Escuchamos los cambios
  elementoFecha.addEventListener("change", () => {
    //Calculamos el resultado
    console.log(elementoFecha.value);
    let ahora = new Date();
    let antes = new Date(elementoFecha.value);
    let diff = ahora - antes;
    let dias = Math.floor(diff / 1000 / 60 / 60 / 24);
    console.log(dias);

    if (dias > 30) {
      let meses = Math.floor(dias / 30);
      if (meses > 12) {
        let year = Math.floor(meses / 12);
        elementoResultado.textContent = String(year) + " a\u00F1o(s)";
      } else {
        elementoResultado.textContent = String(meses) + " mes(es)";
      }
    } else {
      //Lo mostramos al usuario
      elementoResultado.textContent = String(dias) + " dia(s)";
    }
  });
});
