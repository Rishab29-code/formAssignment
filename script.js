function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
        document.getElementById("error-message").innerText = "All fields are required.";
    } 
    else if (!emailRegex.test(email)) {
        document.getElementById("error-message").innerText = "Invalid email address.";
    } 
    else if (password !== confirmPassword) {
        document.getElementById("error-message").innerText = "Passwords do not match.";
    } else {
        document.getElementById("error-message").innerText = "";
        submitForm(firstName, lastName, email, password);
    }
    

   
}

function submitForm(firstName, lastName, email, password) {
    var formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };
    console.log("formData", formData)

    fetch('http://localhost:4000/submitForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            console.log("data",data)
            if(data.success==true){
                document.getElementById("firstName").value=" ";
                document.getElementById("lastName").value=" ";
                document.getElementById("email").value=" ";
                document.getElementById("password").value="";
                document.getElementById("confirmPassword").value="";
                window.alert("Data saved")



                
            }

        })
        .catch((error) => {
            console.error('Error:', error);

        });
}
