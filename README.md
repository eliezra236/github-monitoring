# Welcome

This is a simple tool to monitor Pull Requests of github repo, store it in DB (MongoDB) and display it with GUI to the
user - using Bootstrap-table for easy navigation

## Instructions:

1. Create a database in mongodb to store your pull requests

2. Create .env file like the following example:

```
   DB_NAME=git-monitoring
   MONITORED_APP_NAME=eliezra236/app-to-monitor
   WEBHOOK_ADDRESS=http://something.ngrok.io
   WEBHOOK_PORT=3000
   WEBHOOK_SECRET=GtyP#4%2&g4taT5k
```

If you don't have your own domain u can use ngrok (instruction on the guide bellow)

3. Set up your webhook using the following
   guide: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks


3. Run node app.js

4. You're all set, you're pull requests will be recorded and u can easily monitor them at your front-page (you can
   change the route trought app.js) for example: ```http://localhost:3000/```

5. Enjoy :)


