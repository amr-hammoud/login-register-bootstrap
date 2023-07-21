document.getElementById("register-form").addEventListener("submit", registerUser);

const base_url = "http://localhost/fsw/login-register-bootstrap/backend/"

function registerUser(e) {
	e.preventDefault();

	const name_text = document.getElementById("register-name").value.trim();
	const email_text = document.getElementById("register-email").value.trim();
	const password_text = document.getElementById("register-password").value.trim();
	const confirm_password_text = document.getElementById("register-confirm-password").value.trim();

    if(checkInput(name_text,email_text,password_text,confirm_password_text)){
            const register_info = {
                name: name_text,
                email: email_text,
                password: password_text,
            };
        
            const register_url = base_url + "register.php"
            fetch(register_url, {
                method: "POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register_info),
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json["success"] === true) {
                        localStorage.setItem("name", json["name"]);
                        window.location.href = "index.html"
                    } else {
                        console.log(json["message"]);
                    }
                })
                .catch((error) => console.log(error));
        
    }

}

function checkInput(name, email, password, confirm_password){
    let name_valid = false
    let email_valid = false
    let password_valid = false

    if(name != "" && email != "" && password != "" && confirm_password != ""){
        const nameregex = /^[A-Za-z\s]*$/
        const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(nameregex.test(name))
            name_valid = true
        
        if(emailregex.test(email))
            email_valid = true
        
        }
        if (password.length() >=8 && password === confirm_password){
            password_valid = true
        }
    
    return name_valid && email_valid && password_valid
}