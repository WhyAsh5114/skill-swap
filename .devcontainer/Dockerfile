FROM node:20-bookworm

ARG USER_UID=1000
ARG USER_GID=1000

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    postgresql-client \
    git \
    curl \
    vim \
    nano \
    ca-certificates \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
    groupmod --gid $USER_GID node \
    && usermod --uid $USER_UID --gid $USER_GID node \
    && chown -R $USER_UID:$USER_GID /home/node; \
    fi

RUN npm install -g npm@latest pnpm@latest

USER node

WORKDIR /workspace

ENV PATH="/home/node/.local/bin:${PATH}"

EXPOSE 3000
