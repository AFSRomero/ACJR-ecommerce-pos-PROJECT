<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
        <div style="border: 3px solid black;">
        <h1>Home</h1>
    <p> Congrats you are logged in as {{ auth()->user()->name }}</p>
        <form action="/logout" method="POST">
        @csrf
        <button type="submit">Logout</button>
        </form>
    </div>
</body>
</html>