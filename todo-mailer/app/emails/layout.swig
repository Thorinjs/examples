<!DOCTYPE html>
<html>
<head>
   <title>{% block title %}{% endblock %}</title>
   <style>
      @import url(http://fonts.googleapis.com/css?family=Roboto);
   </style>
</head>
<body>
<div class="container">
   <div class="content">
      {% block content %}{% endblock %}
   </div>
</div>
<div class="footer">
   <div>
      {% block footer %}{% endblock %}
   </div>
</div>
</body>
</html>