// Update your main.js file
// Define the showLoginModal function
function showLoginModal() {
   $('#loginModal').modal('show');
}


// Example function that handles the response from the server
function handleResponse(response) {
   if (response.success) {
       // If the response is successful, check if showModal is true
       if (response.showModal) {
           // If showModal is true, show the login modal
           showLoginModal();
       }
   } else {
       // Handle other cases or display an error message
       console.error('Error: ' + response.message);
   }
}

$(document).ready(function () {
   // Example event listener for a button click
   $('#loginButton').on('click', function () {
       // Simulate an asynchronous request
       setTimeout(function () {
           // Assuming this is the response from your server
           var fakeResponse = {
               success: true,
               message: 'Login successful!',
               showModal: true, // Add showModal information
           };

           // Handle the response
           handleResponse(fakeResponse);
       }, 10000000); // Simulating a delay
   });
});
