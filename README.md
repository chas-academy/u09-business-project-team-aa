Installationsanvisningar

1. Klona repositoryt
git clone https://github.com/yourusername/recipe-saver-app.git

2. Backend
cd backend
npm install

Skapa en .env-fil med följande variabler:
MONGO_URI=din_mongodb_connection_string
JWT_SECRET=din_jwt_secret

Starta servern:
npm start

3. Frontend
cd frontend
npm install
npm run dev
Öppna webbläsaren på http://localhost:5173.
----------------------------------------------------------------------------------------------------------------
Problem som kodbasen löser
Den här applikationen möjliggör för användare att söka recept via ett externt API och spara sina favoritrecept i en personlig lista. Utan denna app skulle användare inte ha möjlighet att skapa ett personligt favoritreceptsregister kopplat till API:et.
--------------------------------------------------------------------------------------------------------------
Exempel på användning
1. Registrera ett nytt konto.
2. Logga in med ditt konto.
3. Sök efter recept på receptsidan.
4. Klicka på Spara för att lägga till recept i din profil.
5. Gå till Profil för att se och ta bort sparade recept.
------------------------------------------------------------------------------------
Dokumentation / Referenser
https://spoonacular.com/food-api/docs

-----------------------------------------------------------------------------------
Gruppmedlemmar
* Atilla
* Alex