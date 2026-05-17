# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS production

RUN apk add --no-cache gettext

COPY nginx.conf.template /etc/nginx/conf.d/configfile.template
COPY --from=build /app/dist /usr/share/nginx/html

# Zeabur 會注入 PORT；本機預設 8080
ENV HOST=0.0.0.0

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD /bin/sh -c "wget -qO- http://127.0.0.1:${PORT:-8080}/ || exit 1"

CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
