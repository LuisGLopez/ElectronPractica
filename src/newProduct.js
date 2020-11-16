const { ipcRenderer } = require('electron');

const form = document.querySelector('form');
form.addEventListener('submit', e => {
    const nameProduct = document.querySelector('#name').value;
    const priceProduct = document.querySelector('#price').value;
    const descProduct = document.querySelector('#description').value;

    const newProduct = {
        name: nameProduct,
        price: priceProduct,
        description: descProduct,
    }
    
    ipcRenderer.send('productToAdd', newProduct);

    e.preventDefault();
});