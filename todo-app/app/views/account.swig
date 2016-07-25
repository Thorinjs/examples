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
   <h1>Welcome,{{ intent.session.account.first_name }}</h1>
   <h4>{{ intent.result('title') }}</h4>
   <pre>
      {{ intent.input() | dump }}
   </pre>
   <div>
      <h2>Add todo</h2>
      <form id="addTodo">
         Name: <input type="text" name="name" /> <br />
         Things to do: <input type="text" name="text" /> <br />
         Is done?: <input type="text" name="is_done" /> <br />
         <button type="submit">Create doto</button>
      </form>
   </div>
   <script type="text/javascript">
      api = fetcher('api', {
         url: 'http://localhost:3000/dispatch'
      });
   </script>
   <script>
      $(document).ready(function() {
         $("#addTodo").submit(function(e) {
            e.preventDefault();
            e.stopPropagation();

            var payload = {
               name: $("input[name='name']").val(),
               text: $("input[name='text']").val(),
               is_done: $("input[name='is_done']").val(),
               account_id: 2
            };
            api('todo.create', payload).then(function(e) {
               window.location.reload();
            }).catch(function(e) {console.log(e)});

            return false;
         });
      })
   </script>
</div>
</body>
</html>