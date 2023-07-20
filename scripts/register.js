document.getElementById("register-form").addEventListener("submit", registerUser);

const base_url = "http://localhost/fsw/login-register-bootstrap/backend/"

function registerUser(e) {
	e.preventDefault();

	const name_text = document.getElementById("register-name").value.trim();
	const email_text = document.getElementById("register-email").value.trim();
	const password_text = document.getElementById("register-password").value.trim();
	const confirm_password_text = document.getElementById("register-confirm-password").value.trim();

    if(password_text === confirm_password_text){
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
                    console.log("Register Failed");
                }
            })
            .catch((error) => console.log(error));
    }

	
}
