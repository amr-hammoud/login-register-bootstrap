<?php
    include ("connection.php");

    header("Content-Type: application/json");
    $data = json_decode(file_get_contents('php://input'), true);

    $response = [];
    if(isset($data["email"]) && $data["email"] != ""){
        $email = trim($data["email"]);
        $password = trim($data["password"]);
        $query = $conn -> prepare("SELECT * FROM users WHERE email = ?");
        $query -> bind_param("s", $email);
        $query->execute();

        $query->store_result();
        $query->bind_result($id, $email, $hashed_password, $name);
        $query->fetch();

        $num_rows = $query->num_rows();
        if ($num_rows == 0) {
            $response["success"] = false;
            $response['message'] = "User Not Found";
        } else {
            if (password_verify($password,$hashed_password)) {
                $response["success"] = true;
                $response['message'] = 'Logged In';
                $response['user_id'] = $id;
                $response['email'] = $email;
                $response['name'] = $name;
            } else {
                $response["success"] = false;
                $response['message'] = "Wrong Password";
            }
        }
    }
    else{
        $response["success"] = false;
        $response['message'] = "Empty Request";
    }

    echo json_encode($response);
?>