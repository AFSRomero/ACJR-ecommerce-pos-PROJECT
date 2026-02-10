<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
@auth
<div style="border: 3px solid black;">
        <h2>Login</h2>
        <form action="/login" method="POST">
            @csrf
            <input name="loginname" type="text" placeholder="Username"><br>
            <input name="loginpassword" type="password" placeholder="Password"><br>
            <button>Log in</button>
        </form>
</div>
@endauth

    
</body>
</html>