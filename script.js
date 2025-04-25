let inventory = [];
let currentId = 1;

// Load inventory from localStorage if available
if (localStorage.getItem('inventory')) {
    inventory = JSON.parse(localStorage.getItem('inventory'));
    if (inventory.length > 0) {
        currentId = Math.max(...inventory.map(item => item.id)) + 1;
    }
    renderInventory();
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);

    if (name && !isNaN(price) && !isNaN(quantity)) {
        const product = {
            id: currentId++,
            name,
            price,
            quantity
        };

        inventory.push(product);
        saveInventory();
        renderInventory();

        // Clear inputs
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productQuantity').value = '';
    } else {
        alert('Please fill all fields with valid values');
    }
}

function deleteProduct(id) {
    inventory = inventory.filter(product => product.id !== id);
    saveInventory();
    renderInventory();
}

function editProduct(id) {
    const product = inventory.find(p => p.id === id);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productQuantity').value = product.quantity;
        
        // Remove the product being edited
        inventory = inventory.filter(p => p.id !== id);
        saveInventory();
    }
}

function saveInventory() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

function renderInventory() {
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';

    inventory.forEach(product => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}