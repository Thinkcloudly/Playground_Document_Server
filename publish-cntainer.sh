docker build -t document-server . --platform linux/amd64     
docker image rm 654202376781.dkr.ecr.us-east-1.amazonaws.com/document-server:latest  
docker tag document-server:latest 654202376781.dkr.ecr.us-east-1.amazonaws.com/document-server:latest
docker push 654202376781.dkr.ecr.us-east-1.amazonaws.com/document-server:latest