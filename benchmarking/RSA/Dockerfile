FROM alpine/openssl as key_generator

RUN openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 && \
    openssl rsa -passin pass:x -in server.pass.key -out /nginx-selfsigned.key && \
    rm server.pass.key && \
    openssl req -new -key /nginx-selfsigned.key -out server.csr \
        -subj "/C=UK/ST=Warwickshire/L=Leamington/O=OrgName/OU=IT Department/CN=example.com" && \
    openssl x509 -req -days 365 -in server.csr -signkey /nginx-selfsigned.key -out /nginx-selfsigned.crt


FROM nginx:1.25.2

COPY --from=key_generator /nginx-selfsigned.crt /etc/nginx/ssl/nginx-selfsigned.crt
COPY --from=key_generator /nginx-selfsigned.key /etc/nginx/ssl/nginx-selfsigned.key

COPY nginx.conf /etc/nginx/nginx.conf