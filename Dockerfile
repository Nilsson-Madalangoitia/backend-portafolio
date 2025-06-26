FROM node:18.18.0
WORKDIR /app
COPY . .
RUN npm install -g typescript@5.2.2
RUN yarn install --legacy-peer-deps
EXPOSE 3000
CMD ["yarn", "dev"]