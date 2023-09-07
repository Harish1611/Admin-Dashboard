let userDetails = [] ;
let updateId ;

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

    const userToEdit = userDetails[index];
    updateId = userDetails[index];

  document.getElementById('fname').value = userToEdit.name;
  document.getElementById('email').value = userToEdit.email;
  document.getElementById('pNumber').value = userToEdit.phone;
  document.getElementById('callDate').value = userToEdit.callDate;
  document.getElementById('callTime').value = userToEdit.callTime;

  document.getElementById('editIndex').value = index;
    
 }

 // Display data on Console and Store in CRUD CRUD
 function getACall(event) {
     event.preventDefault(); // Prevent the form from refreshing the page

     const editIndex = parseInt(document.getElementById('editIndex').value);

     if (editIndex !== -1) {
       // Editing an existing user

        
       const updatedUser = {
         name: event.target.fname.value,
         email: event.target.email.value,
         phone: event.target.pNumber.value,
         callDate: event.target.callDate.value,
         callTime: event.target.callTime.value
       };
       

       axios.put(urlLink + updateId._id , updatedUser ).
       then( response => {
            console.log(response);

       })
       .catch( err => {
        console.log(err);

       })
       // Update the user details in userDetails array
       userDetails[editIndex] = updatedUser;
       displayUserDetails()

       
   
       // Clear the edit index
       document.getElementById('editIndex').value = -1;
     } else {
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



     console.log("User details stored successfully:", newUser);
     }
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