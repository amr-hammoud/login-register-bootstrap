<?php
    include ("connection.php");

    header("Content-Type: application/json");
    $data = json_decode(file_get_contents("php://input"), true);

    $response = [];
    if(isset($data["email"]) && $data["email"] != ""){
        $name = trim($data["name"]);
        $email = trim($data["email"]);
        $password = trim($data["password"]);

        $check_email = $conn->prepare("select email from users where email=?");
        $check_email->bind_param("s", $email);
        $check_email->execute();
        $check_email->store_result();
        $user_exists = $check_email->num_rows();
    
        if ($user_exists == 0) {
            $hashed_password = password_hash($password, PASSWORD_BCRYPT);
            $query = $conn->prepare("insert into users(email,password,name) values(?,?,?)");
            $query->bind_param("sss", $email, $hashed_password, $name);
            $query->execute();
    
            $response["success"] = true;
            $response["message"] = "Account Created Successfully";
        } else {
            $response["success"] = false;
            $response["message"] = "Email Already Registered";
        }
    }
    else{
        $response["success"] = false;
        $response['message'] = "Please Input Email";
    }

    echo json_encode($response);
?>