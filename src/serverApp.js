const { createServer } = require('http');

const port = 3000;
const createApp = () => {
const processId = process.pid; // ID del proceso actual
const server = createServer((req, res) => {
    // Generar un retraso artificial antes de enviar la respuesta al cliente
    for (let index = 0; index < 1e7; index++); // bucle vacío que simplemente itera 10 millones de veces (1e7 es una forma científica de escribir 10,000,000)
    res.end(`handled by pid: ${processId}`)
});
process.on('exit', (signal) => {
    console.log('exit recibido.');
    handle(signal);
});
server.listen(port, () => {
    console.log('Server listen on Process id # ', processId);
});
function handle(signal) {
    console.log(`Received ${signal}`);
    server.close(() => {
        process.exit();
    });
}
// Escuchar la señal SIGTERM 
process.on('SIGTERM', (signal) => {
    console.log('SIGTERM recibido.');
    handle(signal);
});
// Escuchar la señal SIGINT (Ctrl+C) 
process.on('SIGINT', (signal) => {
    console.log('SIGINT recibido.');
    handle(signal);
});
// Des comentar setTimeout para generar errores y llevar el servidor al limite y forzar el inicio de los servicios
// setTimeout(() => {
//     process.exit(1);
// }, Math.random() * 1e4); // 10.000

}
module.exports = createApp;