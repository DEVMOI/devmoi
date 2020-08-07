FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ../openssl/certs/cert.pem /etc/nginx/conf.d/cert.pem
COPY ../openssl/certs/key.pem /etc/nginx/conf.d/key.pem
