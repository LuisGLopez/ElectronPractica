const {ipcRenderer} = require('electron');

const products = document.querySelector('#products');

ipcRenderer.on('productToAdd', (e, newProduct) => {
    const newProductTemplate = `
    <div class="col-xs-4 p-2">
        <div class="card text-center">
            <div class="card-header">
                <h5 class="card-title">${newProduct.name}</h5>
            </div>
            <div class="card-body">
                ${newProduct.description}
                <hr/>
                Precio: ${newProduct.price}
            </div>
            <div class="card-footer">
                <button class="btn btn-danger btn-sm">
                    Eliminar producto
                </button>
            </div>
        </div>
    </div>
    `;

    products.innerHTML += newProductTemplate;
    const btns = document.querySelectorAll('.btn.btn-danger');
    btns.forEach(element => {
        element.addEventListener('click', e => {
            e.target.parentElement.parentElement.parentElement.remove();
        })
    });

    ipcRenderer.on('productsRemoveAll', e => {
        products.innerHTML = '';
    });

});