# kogito-serverless-workflow-demo-start

Serverless workflow project to start your first serverless workflow.
Create your serverless workflow file (*.sw.json) under folder src/main/resources.

# Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```
./mvnw quarkus:dev
```

It runs locally on port 8080.

Open up http://localhost:8080 to get a web page that allows you to send a CloudEvent to start the workflow.

## Building an image

This is meant to produce a knative image, to be pushed to quay.io/krisv/kogito-demo-workflow:1.0-SNAPSHOT.  Update application.properties to use your own repository.

To build your image, run:
```
./mvnw package -Dquarkus.container-image.build=true
```
You can push your image using:
```
docker push quay.io/{YOUR_USERNAME}/kogito-demo-workflow:1.0-SNAPSHOT
```