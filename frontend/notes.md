## [ TODO ]
- ! suppressHydrationWarning on Layout.tsx
- **refactor** 👇


- feature flag avec une variable .env
- Characters Galery vérifier pourquoi ne se charge pas à l'affichage de la page
- Add og SEO tags

# construire l’image
docker build -t comboss-frontend .

# Exécuter le conteneur Docker :
docker run -p 3000:3000 comboss-frontend

# Exécuter avec Docker Compose :
docker-compose up --build

# Construire et démarrer les conteneurs
docker-compose up --build

# Pour arrêter les conteneurs
docker-compose down
