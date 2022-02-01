const Router = require('express')
const process = require('process');
const {gzip, ungzip} = require('node-gzip');
const logger = require('../../utils/logger');

const infoRouter = new Router;

infoRouter.get('/info', async(req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: response success`);
    
    //console.log("CODIGO SINCRONICO (DEMORA TODO)")

    const result = {
        'Carpeta del proyecto' : process.cwd(),
        'Process Id' : process.pid,
        'Versión de node.js' : process.version,
        'Nombre de la Plataforma (Sistema Operativo)' : process.platform,
        'Argumento de Entrada' : process.argv[0],
        'Path de Ejecución': process.Path,
        'Total de Memoria Reservda (rss)':process.memoryUsage().rss
    };
    /* USO DEL GZIP PARA COMPRESIÓN */
    const compressed = await gzip(JSON.stringify(result))
    const decompressed = await ungzip(compressed)
    res.send(
        decompressed.toString()
)});

module.exports = infoRouter