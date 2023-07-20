<?php
    include ("connection.php");

    if(isset($_POST["email"]) && $_POST["email"] != ""){
        $email = trim($_POST["email"]);
        $query = $conn -> prepare("SELECT * FROM users WHERE email = ?");
        $query -> bind_param("s", $email);
        $query->execute();

        $array = $query->get_result();
        $response = [];
        $users = [];
        while($article = $array->fetch_assoc()){
            $users[] = $article;
        }
        
        if($users){
            if(isset($_POST["password"]) && $_POST["password"] != ""){
                $password = trim($_POST["password"]);
                if($users[0]["password"] == $password){
                    $response["success"] = true;
                    echo json_encode($response);
                }
                else{
                    $response["success"] = "wrong password";
                    echo json_encode($response);
                }
            }
        }
        else{
            $response["success"] = "no user found";
            echo json_encode($response);
        }

    }
    else{
        $response = [];
        $response["success"] = false;   
        echo json_encode($response);
        return;
    }
?>