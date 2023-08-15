const fs = require('node:fs/promises');
const express = require('express');
const path = require('path');
const gm = require('gm').subClass({imageMagick: '7+'})

const app = express();
const router = express.Router();

const port = process.env.BUNNYPORT || 3000;
const name = process.env.BUNNYNAME || "LunnyBOL";
const longname = process.env.BUNNYNAME || "LunnyBOL the search";
const proto= process.env.PROTO || "http";
const hostname = process.env.HOSTNAME || "localhost";
const faviconPath = "static/images/favicon.ico";
const searchXMLPath = "static/xml/firefox/opensearch.xml";

async function readFile(filePath, enc) {
  try {
    const data = await fs.readFile(filePath, {encoding: enc});
    return data;
  } catch (error) {
    console.error(`Got an error trying to read the file ${error.message}`);
  }
}

async function writeFile(filePath, content, enc) {
  try {
    const data = await fs.writeFile(filePath, content, {encoding: enc});
  } catch (error) {
    onsole.log(`Got an error trying to write the file ${error}`);
  }
}


async function genSearchXML(callback) {
  f = function setValue(err, data) {
    if (!err) {
      callback(data)
    }
  }
  await gm(faviconPath).size(f)
}

async function genSearchXMLFile(size) {
  xml = await readFile(`${searchXMLPath}.tmpl`, 'utf-8');
  favicon = await readFile(faviconPath, null);
  base64 = Buffer.from(favicon).toString('base64');
  xml = xml.replaceAll('$NAME', name).replaceAll('$PORT', port).replaceAll('$PROTO', proto).replaceAll('$HOSTNAME', hostname).replaceAll('$SIZE', size.width).replace('$FAVICONBASE64', base64).replace('$FAVICONPATH', `${proto}://${hostname}:${port}/${faviconPath}`).replaceAll('$LONGNAME', longname)
  await writeFile(searchXMLPath, xml, 'utf-8')
}

async function mainLoop() {
  await genSearchXML(genSearchXMLFile);
  router.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
  });

  router.get('/main.js',function(req, res){
  res.sendFile(path.join(__dirname+'/main.js'));
  });

  app.use('/', router);
  app.use('/static', express.static(path.join(__dirname, 'static')));
  app.use('/lib', express.static(path.join(__dirname, 'lib')))
  app.listen(port);

  console.log('Running at port: ' + port + ', can be tweaked by settting BUNNYPORT in the environment');
}

mainLoop();
