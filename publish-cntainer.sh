docker build -t document-server . --platform linux/amd64     
docker image rm 071688540161.dkr.ecr.us-east-1.amazonaws.com/document-server:latest  
docker tag document-server:latest 071688540161.dkr.ecr.us-east-1.amazonaws.com/document-server:latest
docker push 071688540161.dkr.ecr.us-east-1.amazonaws.com/document-server:latest