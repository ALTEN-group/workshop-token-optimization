ARG NODE_VERSION
FROM node:${NODE_VERSION}

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG TZ
ENV TZ=${TZ}

# Create a new simple user 
ARG UID
ARG GID
RUN deluser --remove-home node && addgroup -S usergroup -g ${GID} && adduser -G usergroup -S user -u ${UID}
USER user

WORKDIR /usr/src/app
COPY --chown=user:usergroup --chmod=640 ./package*.json ./

RUN npm i --loglevel=error --ignore-scripts --no-fund

CMD [ "node", "--run", "dev" ]