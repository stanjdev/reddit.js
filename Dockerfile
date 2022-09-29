# The step by step commands (list of instructions) to set up, build the entire docker image

FROM node:latest
ENV NODE_ENV production
ARG MONGODB_URI=$MONGODB_URI
ENV SECRET=$SECRET
ARG MONGODB_URI=$MONGODB_URI
ENV SECRET=$SECRET
ADD . /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 80 3000
CMD [ "npm", "start", "--host=0.0.0.0" ]
