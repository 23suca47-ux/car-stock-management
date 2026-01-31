const API_URL = "http://localhost:8085/api/cars";
let editId = null;

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
                            <button onclick="editCar(${car.id})">Edit</button>
                            <button onclick="deleteCar(${car.id})">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(err => console.error("Error loading cars:", err));
}

function editCar(id) {
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(car => {
            document.getElementById("brand").value = car.brand;
            document.getElementById("model").value = car.model;
            document.getElementById("manufactureYear").value = car.manufactureYear;
            document.getElementById("price").value = car.price;
            document.getElementById("stock").value = car.stock;
            editId = id; // store id for update
        });
}

document.getElementById("carForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const car = {
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        manufactureYear: parseInt(document.getElementById("manufactureYear").value),
        price: parseFloat(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value)
    };

    if(editId) {
        // Update existing car
        fetch(`${API_URL}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(car)
        }).then(() => {
            loadCars();
            this.reset();
            editId = null;
        });
    } else {
        // Add new car
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(car)
        }).then(() => {
            loadCars();
            this.reset();
        });
    }
});

function deleteCar(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadCars());
}
