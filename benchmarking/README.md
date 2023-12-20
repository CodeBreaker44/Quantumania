# Benchmarking

This directory contains all the files we need to benchmark different implementation of nginx http server (default RSA, liboqs and liboqs with fpga)

## default NGINX (RSA)

This is the default nginx server that uses RSA for TLS/SSL handshake. We created a docker image with nginx that runs using generated self signed keys during build time.

- check `RSA/Dockerfile` for how it was built.
- check `RSA/docker-compose.yml` for how it was deployed.

with a shell inside `RSA` directory

Deploy

```bash
docker-compose up -d
```

Benchmark

```bash
docker run --rm -it --network host svagi/h2load -n 1000 -c 1000 https://localhost:4433
```

## NGINX (liboqs)

This is a modified nginx server that uses liboqs for TLS/SSL handshake.

- check `liboqs/docker-compose.yml` for how it was deployed.

with a shell inside `liboqs` directory

Deploy

```bash
docker-compose up -d
```

Benchmark

```bash
docker run --rm -it --network host openquantumsafe/h2load h2load -n 1000 -c 1000 https://localhost:443
```

## NGINX (liboqs-fpga)

This is a modified nginx server that uses liboqs for TLS/SSL handshake. It uses hardware acceleration using FPGA.

- check `liboqs/docker-compose.yml` for how it was deployed.

with a shell inside `liboqs-fpga` directory

### Deploy

```bash
docker-compose up -d
```

### Benchmark

```bash
docker run -it --rm --network liboqs_fpga_h2load-benchmark openquantumsafe/h2load h2load -n 1000 -c 10 https://YOUR_IP:4432
```

I will merge all these docker compose files into one for easier comparison.
