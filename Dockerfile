# The step by step commands (list of instructions) to set up, build the entire docker image

FROM node:latest
ENV NODE_ENV production
ARG MONGODB_URI=$MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI
ARG SECRET=$SECRET
ENV SECRET=$SECRET
ARG PORT=$PORT
ENV PORT=$PORT
ADD . /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 80 3000
CMD [ "npm", "start", "--host=0.0.0.0" ]
