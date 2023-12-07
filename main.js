let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');



let mode = 'create';
let temp;
// get total price

function getTotal() {
    if (!price.value == '') {

        let result = (+price.value + +taxes.value + +ads.value) + -discount.value;

        total.innerHTML = result;
        total.style.backgroundColor = 'green'

    }
    else {
        total.innerHTML = '';
        total.style.backgroundColor = 'tomato'
    }

}




// create product
let dataproduct;
if (localStorage.product != null) {
    dataproduct = JSON.parse(localStorage.product);
}
else {
    dataproduct = [];

}

submit.onclick = function () {

    let newproduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,


    }

    if (mode === 'create') {
        if (newproduct.count > 1) {
            for (let i = 0; i < newproduct.count; i++) {
                dataproduct.push(newproduct);

            }


        }
        else {

            dataproduct.push(newproduct);
        }

    } else {
        dataproduct[temp] = newproduct;
        mode = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';

    }
    // save in local storge
    localStorage.setItem('product', JSON.stringify(dataproduct));
    clearInput();
    showData()

}


// clear inputs
function clearInput() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read


function showData() {
    getTotal();
    let tabel = '';

    dataproduct.forEach((product, index) => {

        tabel += `

<tr>

<td>${index}</td>
<td>${product.title}</td>
<td>${product.price}</td>
<td>${product.taxes}</td>
<td>${product.ads}</td>
<td>${product.discount}</td>
<td>${product.total}</td>
<td>${product.category}</td>


<td><button id="update" onclick="updateProduct(${index})">update</button></td>
<td><button id="delete" onclick="deleteProduct(${index})">delete</button></td>
</tr>
        `

    });

    document.getElementById('tbody').innerHTML = tabel;


    btndeleteAll = document.getElementById('deleteAll');

    if (dataproduct.length > 0) {
        btndeleteAll.innerHTML = `<button  onclick="deleteAllProducts()">delete All(${dataproduct.length})</button>`

    }
    else {
        btndeleteAll.innerHTML = '';

    }


}

// count add many products in one time
// delete
function deleteProduct(i) {

    dataproduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataproduct);
    showData()
}


function deleteAllProducts() {
    dataproduct.splice(0);
    localStorage.clear();
    showData()

}

// update 


function updateProduct(i) {
    mode = 'update';
    title.value = dataproduct[i].title;
    price.value = dataproduct[i].price;
    taxes.value = dataproduct[i].taxes;
    ads.value = dataproduct[i].ads;
    discount.value = dataproduct[i].discount;
    getTotal();
    count.style.display = 'none'
    title.category = dataproduct[i].category;
    submit.innerHTML = 'update';
    temp = i;
    scroll(
        {
            top: 0,
            behavior: "smooth",
        }
    )

}




//search

let searchMode = 'title';

function getSearchMode(id) {

    let search = document.getElementById('search');


    if (id == 'searchTitle') {
        searchMode = 'title';


    }
    else {

        searchMode = 'category';

    }
    search.placeholder = 'search By ' + searchMode;

    search.focus();
    search.value = '';
}


function searchData(value) {
    var number = 0;
    var tableRows = '';
    var tableBody = document.getElementById('tbody');
    var btndeleteAll = document.getElementById('btndeleteAll');

    for (let i = 0; i < dataproduct.length; i++) {
        if ((searchMode === 'title' && dataproduct[i].title.includes(value)) ||
            (searchMode !== 'title' && dataproduct[i].category.includes(value))) {

            number++;
            tableRows += `
                <tr>
                    <td>${i}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                </tr>`;
        }
    }

    tableBody.innerHTML = tableRows;
    btndeleteAll.innerHTML = `<button onclick="deleteAllProducts()">delete All(${number})</button>`;
}



// clean data 


