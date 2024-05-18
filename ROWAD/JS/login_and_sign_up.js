const login_btn = document.querySelector("#login-btn");
const signup_btn = document.querySelector("#signup-btn");
const container = document.querySelector(".container");

signup_btn.addEventListener('click', () => {
    container.classList.add("signup-mode");
});

login_btn.addEventListener('click', () => {
    container.classList.remove("signup-mode");
});


let logoutbtn = document.getElementById('logoutAction');


logoutbtn?.addEventListener('click', async function() {
   
    let response = await fetch('http://localhost:3001/api/v1/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    let data = await response.json();
  
    // Handle the response here. For example:
    try {
      if (data.success) {
        localStorage.removeItem('token');
        document.cookie = "token="+null;
        alert("Logged out successfully");
      }
    } catch (error) {
      alert("Error: " + error)
      alert(error.message);
    }
});
// let logoutbtn1 = document.getElementById('logoutAction1');

// logoutbtn1?.addEventListener('click', async function() {
//    alert('Hello ')
//     let response = await fetch('http://localhost:3001/api/v1/logout', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     });
  
//     let data = await response.json();
  
//     // Handle the response here. For example:
//     try {
//       if (data.success) {
//         localStorage.removeItem('token');
//         document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//         alert("Logged out successfully");
//       }
//     } catch (error) {
//       alert("Error: " + error)
//       alert(error.message);
//     }
// });

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    let email = event.target.elements.email.value;
    let password = event.target.elements.password.value;
  
    let response = await fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
  
    // Handle the response here. For example:
    if (data.success==true) {
      alert("Login successful");
      localStorage.setItem('token', data.token);
      // document.cookie = "token="+(localStorage.getItem('token'));
       event.target.elements.email.value="";
       event.target.elements.password.value="";
       window.location.href = "/ROWAD/HTML/BusinessRecommendation.html";
    } else {
      // Login failed   
      alert(data.message)
    }
  });

let signupform = document.getElementById('signupForm')

signupform?.addEventListener('submit', async function(event) {
    event.preventDefault();
  
    let name = event.target.elements.name.value;
    let username = event.target.elements.username.value;
    let PhoneNo = event.target.elements.PhoneNo.value;
    let Address = event.target.elements.Address.value;
    let email = event.target.elements.email.value;
    let password = event.target.elements.password.value;
  
    let response = await fetch('http://localhost:3001/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password,name,username,PhoneNo,Address })
    });
  
    let data = await response.json();
  
    // Handle the response here. For example:

      if (data.success) {
        alert("Signup successful");
        event.target.elements.email.value="";
        event.target.elements.password.value="";
        event.target.elements.name.value="";
        event.target.elements.username.value="";
        event.target.elements.PhoneNo.value="";
        event.target.elements.Address.value="";
        login_btn.click();
      }else{
        alert(data.message)
      }
  });