<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
@auth
<body>
    <div style="border: 3px solid black;">
        <h2>Register</h2>
        <form action="/register" method="POST">
            @csrf
            <input name="name" type="text" placeholder="Username"><br>
            <input name="email" type="email" placeholder="Email"><br>
            <input name="password" type="password" placeholder="Password"><br>
            <button>Register</button>
        </form>
    </div>
</body>
</html>