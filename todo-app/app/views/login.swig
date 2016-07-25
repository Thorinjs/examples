<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <title>TODO SPA</title>
   <meta name="description" content="">
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
   <link href="{{ asset('/css/styles.css', true) }}" rel="stylesheet" media="screen">
   <script type="text/javascript" src="{{ asset('js/fetcher.js') }}"></script>
   <script type="text/javascript" src="{{ asset('js/jquery.min.js') }}"></script>
</head>
<body>
<div>
   <script type="text/javascript">
      api = fetcher('api', {
         url: 'http://localhost:3000/dispatch'
      });
      $(document).ready(function() {
         $("#loginForm").submit(function(e) {
            e.preventDefault();
            e.stopPropagation();
            var payload = {
               email: $("#email").val(),
               password: $("#pass").val()
            };
            api('account.login', payload).then(function(res) {
               window.location = '/account';
            }).catch(function(e) {
               console.log(e);
            });
            return false;
         });
         $("#registerForm").submit(function(e) {
            e.preventDefault();
            e.stopPropagation();
            var payload = {
               email: $("#remail").val(),
               password: $("#rpass").val(),
               first_name: $("#first_name").val(),
               last_name: $("#last_name").val()
            };
            api('account.register', payload).then(function(res) {
               window.location = '/account';
            }).catch(function(e) {
               console.log(e);
            });
            return false;
         });
      });
   </script>
   <form id="loginForm" method="post">
      <h1>Login page</h1>
      <input type="text" name="email" id="email" />
      <input type="password" name="password" id="pass" />
      <button type="submit">Login</button>
   </form>
   <br />
   <form id="registerForm" method="post">
      <h1>Register page</h1>
      <input type="text" name="email" id="remail" />
      <input type="password" name="password" id="rpass" />
      <input type="text" name="first_name" id="first_name" />
      <input type="text" name="last_name" id="last_name" />
      <button type="submit">Login</button>
   </form>
</div>
</body>
</html>