document.getElementById("rentalForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const carType = document.getElementById("carType").value;
    const days = parseInt(document.getElementById("days").value);
    const insurance = document.getElementById("insurance").checked;

    // Detalles de los carros
    const carDetails = {
        bmw: { name: "BMW Azul", color: "blue", images: ["bmw.jpg"], price: 650000 },
        mercedes: { name: "Mercedes Negro", color: "black", images: ["mercedes.jpg"], price: 700000 },
        twingo: { name: "Twingo Verde", color: "green", images: ["download.jpg"], price: 100000 },
        megane: { name: "Megane Rojo", color: "red", images: ["megane.jpg"], price: 120000 },
        chevrolet: { name: "Chevrolet Gris", color: "gray", images: ["chevrolet.jpg"], price: 150000 },
    };

    const selectedCar = carDetails[carType];
    let backgroundClass = "";

    // Calcular el descuento según el número de días
    let discount = 0;
    if (days >= 3 && days <= 5) discount = 0.10;
    else if (days >= 6 && days <= 10) discount = 0.15;
    else if (days > 10) discount = 0.20;

    // Calcular el precio base
    const basePrice = selectedCar.price * days;

    // Calcular descuento
    const discountAmount = basePrice * discount;

    // Precio total con descuento
    let totalPrice = basePrice - discountAmount;

    // Agregar costo del seguro si se seleccionó
    if (insurance) {
        const insuranceFee = 50000 * days; // $50,000 por día
        totalPrice += insuranceFee;
    }

    // Cambiar el color de fondo según los días
    if (days <= 2) backgroundClass = "orange";
    else if (days <= 5) backgroundClass = "yellow";
    else if (days <= 10) backgroundClass = "green";
    else backgroundClass = "blue";

    // Mostrar los resultados
    const resultDiv = document.getElementById("result");
    resultDiv.className = backgroundClass;
    resultDiv.innerHTML = `
        <div style="background-color:${selectedCar.color}; padding:10px; border-radius:5px;">
            <img src="IMAGENES/${selectedCar.images[0]}" alt="${selectedCar.name}" style="max-width:100%; height:auto;">
            <p>Carro seleccionado: ${selectedCar.name}</p>
        </div>
        <p><strong>Precio base:</strong> $${basePrice.toLocaleString()}</p>
        <p><strong>Descuento aplicado:</strong> $${discountAmount.toLocaleString()} (${(discount * 100).toFixed(0)}%)</p>
        <p><strong>Seguro:</strong> ${insurance ? "Sí (incluido)" : "No"}</p>
        <p><strong>Total a pagar:</strong> $${totalPrice.toLocaleString()}</p>
    `;
});
