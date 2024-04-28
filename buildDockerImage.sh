cd backend
npm run build
cd ..
docker build . --platform=linux/amd64 -t kryq/fullstack-template
docker run -p 3000:3000 kryq/fullstack-template