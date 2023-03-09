# gtUrlShortener

Project has been deployed on vercel(frontend, backend applicaton) and planetscale(database for persistence)
View it on : https://gt-url-shortener-frontend.vercel.app

To Run Locally : 
  Prerequisites- Docker 
  1) Go to url-shortener-backend/src/app.module.ts and uncomment the section for docker compose and comment off the section for planetscale
  2) Go to url-shortener-backend/src/url/url.service.ts and uncomment the section for localhost and comment off the section for website
  3) Go to url-shortener-web/src/components/SignIn.jsx and uncomment the section for localhost and comment off the section for vercel
  4) At the directory level of url-shortener, in the terminal run: docker compose up --build 
  5) Now visit localhost:5173

To tear down: 
in the terminal run : docker compose down 