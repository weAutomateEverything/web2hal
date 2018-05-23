FROM nginx:latest
# Now just add the binary
COPY /dist/ /usr/share/nginx/html

