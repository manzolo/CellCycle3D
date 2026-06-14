# ---------- Build stage ----------
FROM node:22-alpine AS build
WORKDIR /app

# Allow overriding the public base path (e.g. "/CellCycle3D/" for GitHub Pages).
ARG VITE_BASE=/
ENV VITE_BASE=${VITE_BASE}

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
