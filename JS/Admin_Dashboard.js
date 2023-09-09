let productDetails = [] ;
let updateId ;

const urlLink = 'https://crudcrud.com/api/c994d057b7d3408ea81b53556fd0e72e/Products/'

 

 // Display product details in the UI
 function displayProductDetails( ) {
     const electronicsProductList = document.getElementById('electronicsProductList');
     electronicsProductList.innerHTML = '';
     const skincareProductList = document.getElementById('skincareProductList');
     skincareProductList.innerHTML = '';
     const foodProductList = document.getElementById('foodProductList');
     foodProductList.innerHTML = '';
    
     productDetails.forEach((product, index) => {

         if( product.productCategory == 'electronics'){
         const electronicsProductDiv = document.createElement('div');
         electronicsProductDiv.className = 'mb-3';
         
         const electronicsProductInfo = document.createElement('p');
         electronicsProductInfo.innerText = `Product Name: ${product.productName}, Price: ${product.price}, Category: ${product.productCategory}`;

        

         const deleteButton = document.createElement('button');
         deleteButton.className = 'btn btn-danger';
         deleteButton.innerText = 'Delete Product';
         deleteButton.addEventListener('click', () => deleteProduct(index));

         electronicsProductDiv.appendChild(electronicsProductInfo);
         electronicsProductDiv.appendChild(deleteButton);
         electronicsProductList.appendChild(electronicsProductDiv);

         }
         else if( product.productCategory == 'food'){
            const foodProductDiv = document.createElement('div');
            foodProductDiv.className = 'mb-3';
            
            const foodProductInfo = document.createElement('p');
            foodProductInfo.innerText = `Product Name: ${product.productName}, Price: ${product.price}, Category: ${product.productCategory}`;
   
           
   
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.innerText = 'Delete Product';
            deleteButton.addEventListener('click', () => deleteProduct(index));
   
            foodProductDiv.appendChild(foodProductInfo);
            foodProductDiv.appendChild(deleteButton);
            foodProductList.appendChild(foodProductDiv);
   
            }
         else if( product.productCategory == 'skincare'){

                const skincareProductDiv = document.createElement('div');
                skincareProductDiv.className = 'mb-3';
                
                const skincareProductInfo = document.createElement('p');
                skincareProductInfo.innerText = `Product Name: ${product.productName}, Price: ${product.price}, Category: ${product.productCategory}`;
       
               
       
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger';
                deleteButton.innerText = 'Delete Product';
                deleteButton.addEventListener('click', () => deleteProduct(index));
       
                skincareProductDiv.appendChild(skincareProductInfo);
                skincareProductDiv.appendChild(deleteButton);
                skincareProductList.appendChild(skincareProductDiv);
       
                }
     });
 }



 // Delete a product from the product details array and update the UI
 function deleteProduct(index) {

    const deleteId = productDetails[index];

    axios.delete(urlLink + deleteId._id )
    .then( (response) => {
             console.log(response);
    })
    .catch( err => console.log(err));

    productDetails.splice(index, 1);
     displayProductDetails();
    
 }

 
 // Display data on Console and Store in CRUD CRUD
 function addProduct(event) {
     event.preventDefault(); // Prevent the form from refreshing the page

    
     // Create a new product object with the details entered by the user
     const newProduct = {
        productName: event.target.pname.value,
        price: event.target.price.value,
        productCategory: event.target.productCategory.value,
     };
     
     axios.post( urlLink, newProduct ).then((response) => {
        console.log( response )
        productDetails.push( response.data)
        displayProductDetails()
      } ).catch( err => {
        console.log(err);
        alert("Something Went Wrong");

    }
        );



     console.log("Product details stored successfully:", newProduct);
          // Clear the form inputs
     event.target.pname.value = '';
     event.target.price.value = '';

     // Refresh the displayed product details
     displayProductDetails();
 }


window.addEventListener("DOMContentLoaded", () => {

    axios.get(urlLink)
    .then( (response) =>{
         console.log(response)

         if( response.data.length > 0 ){

         for( var i = 0; i< response.data.length; i++){        
             productDetails.push(response.data[i])
             displayProductDetails()
            

        
         }
     
        
        }
       })
    .catch((err) => {
        console.log(err)
    })

   

})