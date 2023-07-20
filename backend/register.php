<?php
    include ("connection.php");

    header("Content-Type: application/json");
    $data = json_decode(file_get_contents('php://input'), true);

    $response = [];
    if(isset($data["email"]) && $data["email"] != ""){
        $name = trim($data["name"]);
        $email = trim($data["email"]);
        $password = trim($data["password"]);

        $check_email = $conn->prepare('select email from users where email=?');
        $check_email->bind_param('s', $email);
        $check_email->execute();
        $check_email->store_result();
        $user_exists = $check_email->num_rows();
    
        if ($user_exists == 0) {
            $hashed_password = password_hash($password, PASSWORD_BCRYPT);
            $query = $conn->prepare('insert into users(email,password,name) values(?,?,?)');
            $query->bind_param('sss', $email, $hashed_password, $name);
            $query->execute();
    
            $response['status'] = "success";
            $response['message'] = "another message in success";
        } else {
            $response['status'] = "failed";
            $response['message'] = "another message in fail";
        }
    }
    else{
        $response["success"] = false;
        $response['status'] = "Empty";
    }

    echo json_encode($response);
?>