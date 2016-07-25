{% extends "./layout.swig" %}

{% block content %}
   HELLO, Welcome,<br/>
   {{ account | dump }}
{% endblock %}