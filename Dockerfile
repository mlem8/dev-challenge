FROM node:5.3

MAINTAINER hello@matthewlem.com

#use mirrors for faster apt downloads no matter where the machine that builds the image is
RUN echo "deb mirror://mirrors.ubuntu.com/mirrors.txt trusty main restricted universe multiverse" > /etc/apt/sources.list; \
    echo "deb mirror://mirrors.ubuntu.com/mirrors.txt trusty-updates main restricted universe multiverse" >> /etc/apt/sources.list; \
    echo "deb mirror://mirrors.ubuntu.com/mirrors.txt trusty-backports main restricted universe multiverse" >> /etc/apt/sources.list; \
    echo "deb mirror://mirrors.ubuntu.com/mirrors.txt trusty-security main restricted universe multiverse" >> /etc/apt/sources.list

ENV appDir /usr/src/app

# Prepare app directory
RUN mkdir -p /usr/src/app
WORKDIR ${appDir}

# Install dependencies
ADD package.json /usr/src/app
RUN npm install --production

# Install process manager globally
RUN npm install pm2 -g

# Add app files
ADD . /usr/src/app

# Build the app in production mode
RUN npm run build -- --release

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["pm2", "start", "processes.json", "--no-daemon"]
