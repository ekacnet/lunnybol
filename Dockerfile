FROM node:18

WORKDIR /lunnybol

COPY *.sh /lunnybol/
COPY server.js /lunnybol/
COPY package* /lunnybol/

RUN npm install

ADD static /lunnybol/static/
ADD src /lunnybol/src/

COPY .[^g]* /lunnybol/

COPY index.html /lunnybol/


EXPOSE 3000

RUN ./build.sh

CMD [ "./run.sh" ]
