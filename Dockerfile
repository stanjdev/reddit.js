# The step by step commands (list of instructions) to set up, build the entire docker image

FROM node:latest
ENV NODE_ENV production
ADD . /app
WORKDIR /app
COPY package.json /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
COPY . /app
# EXPOSE 80 3000
CMD [ "npm", "start", "--host=0.0.0.0" ]


# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
# COPY ./default.conf /etc/nginx/conf.d/
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80 3000
CMD ["nginx", "-g", "daemon off;"]
