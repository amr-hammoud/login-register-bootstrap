document.getElementById("login-form").addEventListener("submit", loginUser);

const base_url = "http://localhost/fsw/login-register-bootstrap/backend/"

function loginUser(e) {
	e.preventDefault();

	const email_text = document.getElementById("login-email").value;
	const password_text = document.getElementById("login-password").value;

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
                window.location.href = "dashboard.html"
            } else {
                console.log("Login Failed");
            }
		})
		.catch((error) => console.log(error));
}
