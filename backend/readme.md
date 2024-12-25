## Add the below comment to all PRs to track the JIRA ticket
```
## Ticket
[JIRA-x](https://sl-urban.atlassian.net/browse/SDP-x)
```

### Setup Django
1. You need python 3.7.0 or higher
2. `pip install -r requirements.txt`
3. `python manage.py migrate`
4. `python manage.py createsuperuser`
5. `python manage.py runserver` 

### Run project with uvicron if the websocket is to be used <-- for realtime shipment updates
ex: `uvicorn project.asgi:application --host 127.0.0.1 --port 8000`