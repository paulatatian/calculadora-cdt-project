

function calcular() {
  const capital = parseFloat(document.getElementById("capital").value);
  const tasa = parseFloat(document.getElementById("tasa").value) / 100;
  const tiempo = parseFloat(document.getElementById("tiempo").value);
  const tipo = document.getElementById("tipo").value;

  if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo)) {
    alert("Por favor llena todos los campos con valores válidos.");
    return;
  }

  let montoFinal = 0;

  if (tipo === "simple") {
    // Fórmula interés simple: A = C * (1 + r * t)
    montoFinal = capital * (1 + tasa * tiempo);
  } else {
    // Fórmula interés compuesto (capitalización anual): A = C * (1 + r)^t
    montoFinal = capital * Math.pow((1 + tasa), tiempo);
  }

  const interesGanado = montoFinal - capital;

  document.getElementById("montoFinal").textContent = 
    "Monto Final: $" + montoFinal.toFixed(2);
  document.getElementById("interesGanado").textContent = 
    "Interés Ganado: $" + interesGanado.toFixed(2);
}
