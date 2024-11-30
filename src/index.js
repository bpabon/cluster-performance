const os = require('os');
const cluster = require('cluster');
const createApp = require('./serverApp');
// Proceso principal
const runPrimaryProcess = () => {
    const processCount = os.cpus().length * 2; // Array con la información de cada núcleo físicos de la CPU multiplicado * 2

    console.log('Primary  ',process.pid, 'Is running');
    console.log('Server esclavos o forking ',processCount);
    for (let index = 0; index < processCount; index++){
        cluster.fork();
    }
    cluster.on('exit', (worker,code,signal)=>{
        if(code !== 0 && !worker.exitedAfterDisconnect){
            console.log(`Worker ${worker.process.pid} died... scheduling another one!`)
            cluster.fork()
        }
    })
};
// Procesos esclavos o secundarios
const runWorkerProcess = async() => {
    createApp();
};
// Verificar si el cluster es primary o isWorker 
cluster.isMaster ? runPrimaryProcess() : runWorkerProcess();