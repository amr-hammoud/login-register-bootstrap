document.getElementById("login-form").addEventListener("submit", loginUser);

const base_url = "http://localhost/fsw/login-register-bootstrap/backend/"

function loginUser(e) {
	e.preventDefault();

	const email_text = document.getElementById("login-email").value.trim();
	const password_text = document.getElementById("login-password").value.trim();

	if(checkInput(email_text, password_text)){
		const login_info = {
			email: email_text,
			password: password_text,
		};
	
		const login_url = base_url + "login.php"
		console.log(login_url)
		console.log(JSON.stringify(login_info))
		fetch(login_url, {
			method: "POST",
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(login_info),
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json["success"] === true) {
					console.log("Login Success");
					localStorage.setItem("name", json["name"]);
					window.location.href = "dashboard.html"
				} else {
					console.log("Login Failed");
				}
			})
			.catch((error) => console.log(error));
	}

}

function checkInput(email, password){
    let email_valid = false
    let password_valid = false

    if(email != "" && password != ""){
        const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(emailregex.test(email))
            email_valid = true
        
        }
        if (password.length >=8){
            password_valid = true
        }
    
    return email_valid && password_valid
}