let products = [];
let count = 1;

module.exports.products = {};

module.exports.products.getAll = () => {
    return products;
}

module.exports.products.add = (product) => {
    product.id = count++;
    products.push(product);
}

module.exports.products.findByName = (name) => {
    let p = null;

    for (product of object) {
        if(product.name === name){
            p = product;
        }
    }

    return product;
}







