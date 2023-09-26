FROM node:18.18.0

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN curl -sSf https://temporal.download/cli.sh | sh
RUN echo export PATH="\$PATH:/root/.temporalio/bin" >> ~/.bashrc
EXPOSE 3778

CMD ["node", "index.js"]
