let userDetails = [] ;

const urlLink = 'https://crudcrud.com/api/ca0f93a66c384ee58413f0d638afd045/appointmentDatas/'

 // Retrieve existing user details from local storage
//  let userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];


 // Display user details in the UI
 function displayUserDetails( ) {
     const userList = document.getElementById('userList');
     userList.innerHTML = '';

     userDetails.forEach((user, index) => {
         const userDiv = document.createElement('div');
         userDiv.className = 'mb-3';
         
         const userInfo = document.createElement('p');
         userInfo.innerText = `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}, Call Time: ${user.callDate} ${user.callTime}`;

         const editButton = document.createElement('button');
         editButton.className = 'btn btn-primary me-2';
         editButton.innerText = 'Edit';
         editButton.addEventListener('click', () => editUser(index));

         const deleteButton = document.createElement('button');
         deleteButton.className = 'btn btn-danger';
         deleteButton.innerText = 'Delete';
         deleteButton.addEventListener('click', () => deleteUser(index));

         userDiv.appendChild(userInfo);
         userDiv.appendChild(editButton);
         userDiv.appendChild(deleteButton);
         userList.appendChild(userDiv);
     });
 }

 // Update local storage with the updated user details array
//  function updateLocalStorage() {
//      localStorage.setItem('userDetails',  .stringify(userDetails));
//  }

 // Delete a user from the user details array and update the UI
 function deleteUser(index) {

    const deleteId = userDetails[index];

    axios.delete(urlLink + deleteId._id )
    .then( (response) => {
             console.log(response);
    })
    .catch( err => console.log(err));

     userDetails.splice(index, 1);
     displayUserDetails();
    
 }

 // Edit a user's details and update the UI
 function editUser(index) {
     const user = userDetails[index];
     const newName = prompt('Enter the new name:', user.name);
     const newEmail = prompt('Enter the new email:', user.email);
     const newPhone = prompt('Enter the new phone number:', user.phone);

     if (newName && newEmail && newPhone) {
         user.name = newName;
         user.email = newEmail;
         user.phone = newPhone;

         updateLocalStorage();
         displayUserDetails();
     } else {
         alert('Invalid input! Please try again.');
     }
 }

 // Display data on Console and Store in CRUD CRUD
 function getACall(event) {
     event.preventDefault(); // Prevent the form from refreshing the page

     // Create a new user object with the details entered by the user
     const newUser = {
         name: event.target.fname.value,
         email: event.target.email.value,
         phone: event.target.pNumber.value,
         callDate: event.target.callDate.value,
         callTime: event.target.callTime.value
     };
     
     axios.post( urlLink, newUser ).then((response) => {
        console.log( response )
        // displayUserDetails ( response.data )
        userDetails.push( response.data)
        displayUserDetails()
      } ).catch( err => {
        console.log(err);
        alert("Something Went Wrong");

    }
        );

      

     // Push the new user object into the array of existing user details
     //userDetails.push(newUser);
    // userDetails.push ( response.data)

     
     


    // Store the updated array of user details in the local storage
    //updateLocalStorage();

     // Display a success message or perform any desired actions
     console.log("User details stored successfully:", newUser);

     // Clear the form inputs
     event.target.fname.value = '';
     event.target.email.value = '';
     event.target.pNumber.value = '';

     // Refresh the displayed user details
     displayUserDetails();
 }

 // Initial display of user details
//  displayUserDetails();

window.addEventListener("DOMContentLoaded", () => {

    axios.get(urlLink)
    .then( (response) =>{
         console.log(response)

         if( response.data.length > 0 ){

         for( var i = 0; i< response.data.length; i++){        
             userDetails.push(response.data[i])
             displayUserDetails()
            

        
         }
        //  console.log(userDetails[0])
        //  console.log(userDetails[1]._id)
        
        }
       })
    .catch((err) => {
        console.log(err)
    })

   

})