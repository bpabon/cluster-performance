# Node.js Cluster Performance and High Availability

Este proyecto crea un servidor HTTP en Node.js que responde a las solicitudes utilizando el módulo `cluster`, el cual distribuye el trabajo entre varios procesos (workers) que se ejecutan en paralelo. Esta arquitectura permite aprovechar de manera óptima los múltiples núcleos de la CPU, mejorando la escalabilidad y el rendimiento del servidor, especialmente en entornos con alta carga de tráfico.

Para evaluar el comportamiento y la capacidad de manejo de carga del servidor, se realizaron pruebas de rendimiento utilizando **Autocannon**, una herramienta de benchmarking. Se realizaron tres comparaciones en distintos escenarios:

## Escenarios de Prueba

### 1. **Caso 1**: Servidor básico sin `process` ni `cluster`
Este caso representa un servidor sin optimizaciones, donde una única instancia maneja todas las solicitudes. El rendimiento de este servidor es limitado ya que solo se aprovecha un solo núcleo de la CPU.

### 2. **Caso 2**: Servidor con `process` y `cluster`
En este escenario, se aprovecha el módulo `cluster` de Node.js para crear varios procesos (workers) que se distribuyen entre los núcleos de la CPU. Esto mejora significativamente la escalabilidad y el manejo de múltiples solicitudes simultáneas, ya que cada worker puede manejar conexiones de manera independiente.

### 3. **Caso 3**: Escalabilidad y alta disponibilidad
En este caso, se simula un entorno de alta disponibilidad donde el servidor está diseñado para reiniciar automáticamente los servicios si alguno de los workers falla. Esto se logra mediante el uso de señales del sistema, como `SIGTERM` y `SIGINT`, y permite que la aplicación se recupere de caídas de manera automática para mantener la disponibilidad del servicio en todo momento.

Los resultados de estas pruebas proporcionan una comparación directa entre los diferentes enfoques, ayudando a entender cómo cada uno afecta el rendimiento, la escalabilidad y la disponibilidad del sistema bajo carga.


## Comparación Resultados de las Pruebas con Autocannon

| **Métrica**                 | **Caso 1**        | **Caso 2**                     | **Caso 3**                     |
|-----------------------------|--------------------------------|--------------------------------|--------------------------------|
| **Latencia Promedio**        | 3231.02 ms                     | 5177.02 ms                     | 9711.73 ms                    |
| **Latencia Máxima**          | 8200 ms                        | 29,550 ms                      | 30,902 ms                     |
| **Latencia al 50%**          | 3140 ms                        | 1167 ms                        | 11,160 ms                     |
| **Requests por segundo**     | 56.9 RPS                       | **567.38 RPS**                 | 228.66 RPS                    |
| **Bytes por segundo**        | 8.2 kB/s                       | **81.5 kB/s**                  | 32.9 kB/s                     |
| **Errores Totales**          | 95,000 errores                 | **7,000 errores**              | **50,000 errores**            |
| **Timeouts**                 | 278 timeouts                   | **4 timeouts**                 | **54 timeouts**               |

## Conclusiones

- **Caso 2**: El más óptimo en términos de **requests por segundo** (567.38 RPS) y **bytes por segundo** (81.5 kB/s). Aunque la **latencia máxima** es alta (29,550 ms), el servidor maneja bien la carga en comparación con los otros casos.
- **Caso 3**: Tiene un rendimiento intermedio en solicitudes por segundo (228.66 RPS), pero la **latencia** y los **errores** son relativamente altos, lo que sugiere que el servidor tiene dificultades en picos de carga.
- **Caso 1**: El servidor tiene el peor rendimiento con **56.9 RPS** y una tasa de **95,000 errores**. La **latencia promedio** es intermedia, pero el servidor no maneja bien la carga y necesita optimización.

**Recomendación**: El **Caso 2** es el más eficiente y escalable, mientras que el **Caso 1** debería ser optimizado para mejorar su rendimiento.

## Estructura del Proyecto

El proyecto consta de tres archivos principales:

1. **`index.js`**: Archivo de entrada que inicializa el clúster y controla la cantidad de procesos que se van a ejecutar.
2. **`serverApp.js`**: Archivo que define la configuración del servidor HTTP.
3. **`package.json`**: Archivo de configuración de dependencias de Node.js, con scripts definidos para ejecutar el servidor.

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org) (versión 14 o superior)
### Instalación de dependencias

Clona este repositorio y navega al directorio del proyecto. Luego, instala las dependencias:

```bash
git clone <url-del-repositorio>
cd <directorio-del-proyecto>
npm install
```

### Ejecución de proyecto

Para iniciar el proyecto 

```bash
  npm run start
```

### Ejecución de Pruebas de rendimiento

Correr Pruebas de rendimiento Autocannon

```bash
  npm run test
```
### Ver resultados ejecutados

- Resultados del caso 1 (./resultados/1. Caso.txt)
- Resultados del caso 1 (./resultados/2. Caso.txt)
- Resultados del caso 1 (./resultados/3. Caso.txt)