const API_URL = "http://localhost:8085/api/cars";

document.addEventListener("DOMContentLoaded", loadCars);

function loadCars() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById("carTableBody");
            tableBody.innerHTML = "";

            data.forEach(car => {
                const row = `
                    <tr>
                        <td>${car.id}</td>
                        <td>${car.brand}</td>
                        <td>${car.model}</td>
                        <td>${car.manufactureYear}</td>
                        <td>${car.price}</td>
                        <td>${car.stock}</td>
                        <td>
                            <button onclick="deleteCar(${car.id})">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(err => console.error("Error:", err));
}

document.getElementById("carForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const car = {
        brand: brand.value,
        model: model.value,
        manufactureYear: manufactureYear.value,
        price: price.value,
        stock: stock.value
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car)
    })
        .then(() => {
            loadCars();
            this.reset();
        });
});

function deleteCar(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadCars());
}
