# Práctica 01 - Red de Sensores de Calidad del Aire

## 1. Comprender el problema

### ¿Quién utilizará estos datos?
* **El personal del Ayuntamiento encargado del tráfico:** para saber si hay que cortar calles o reducir la velocidad cuando el aire esté muy sucio.
* **Los servicios de salud pública:** para avisar a hospitales, colegios o residencias de ancianos si respirar el aire de la calle es peligroso ese día.
* **Los técnicos de mantenimiento:** para revisar si algún sensor se ha estropeado o no manda datos.
* **Los vecinos y vecinas:** para consultar en una web o aplicación móvil cómo está el aire en su barrio antes de salir a pasear o hacer deporte.

### ¿Qué decisiones se pueden tomar con ellos?
* **Decisiones rápidas (del día a día):**
  * Activar el protocolo de contaminación y avisar a la gente para que no haga deporte intenso fuera.
  * Desviar el tráfico de camiones o coches si una calle concreta se llena de humo.
* **Decisiones a largo plazo:**
  * Decidir dónde poner una Zona de Bajas Emisiones o dónde plantar más árboles para limpiar el aire.
  * Comprobar con los años si los planes para reducir el tráfico realmente están funcionando.

### ¿Qué diferencia hay entre una alerta inmediata y un informe histórico?
* **Una alerta inmediata** es un aviso urgente. Necesita que los datos lleguen al momento para que el Ayuntamiento pueda actuar ya si el aire se vuelve peligroso.
* **Un informe histórico** es un resumen de lo que ha pasado en semanas, meses o años. No corre prisa; lo importante es revisar todos los datos con calma, limpiarlos de errores y ver cómo evoluciona la contaminación a lo largo del tiempo.

## 2. Analizar cobertura y calidad

### Dos problemas de calidad y sus consecuencias
1. **Lecturas congeladas (el sensor S008 repite datos durante 2 horas):**
   * **Qué pasó:** El sensor marcó exactamente la misma temperatura y humedad durante 120 minutos seguidos sin variar ni un decimal.
   * **Consecuencia:** Si el aire en esa zona empeora de repente, el sensor no se entera y no saltará ninguna alarma. Al revés, si se queda atascado en un valor alto, asustará a la gente sin motivo.

2. **Unidades incorrectas (14 lecturas en grados Fahrenheit):**
   * **Qué pasó:** En vez de guardar la temperatura en grados normales (Celsius), mandó valores alrededor de 70 (grados Fahrenheit).
   * **Consecuencia:** 70 grados Fahrenheit son unos 21 grados centígrados normales. Si el sistema no lo detecta y piensa que hacen 70 grados de calor, creerá que la ciudad se está quemando y arruinará todas las medias del día.

### ¿Qué distrito necesita mayor atención y por qué?
El distrito que necesita más atención es el **D4 (Sur Industrial)** por tres razones muy claras:
* **Es donde vive más gente:** tiene 180.000 habitantes, casi la mitad de toda la ciudad.
* **Es la zona más contaminada:** junta mucha gente, mucho tráfico y fábricas a la vez.
* **Tiene muy pocos sensores para lo grande y poblada que es:** solo tiene 2,8 sensores por cada 100.000 habitantes. Si lo comparamos con el Centro Histórico (D1), que tiene 7,5 sensores por cada 100.000 habitantes y es mucho más pequeño, vemos que el distrito con más peligro es el que peor vigilado está.

### Elige una anomalía y explica si la corregirías, la marcarías como dudosa o la excluirías.
* **Anomalía elegida:** Valores extremos. Mediciones de partículas PM10 con números negativos.
* **Qué haría:** Excluiría esos datos del cálculo de la contaminación y avisaría al equipo técnico.
* **Por qué:** En la vida real no pueden existir "menos de cero" motas de polvo en el aire. No tiene sentido corregirlo a ojo ni inventarse el número. Lo más seguro es apartar esas lecturas para que no estropeen la media y pedir que revisen el sensor.

## 3. Comparar arquitecturas

### Tabla comparativa

| Criterio | Batch (Por lotes) | Streaming (En tiempo real) |
| :--- | :--- | :--- |
| **Rapidez para generar alertas** | **Lenta:** Tarda minutos u horas en procesar el grupo de datos. No sirve para avisos urgentes. | **Muy rápida:** Procesa cada dato según entra (en segundos). Ideal para alertas inmediatas. |
| **Coste y complejidad** | **Bajo y sencillo:** Es más fácil de programar, mantener y resulta más barato en servidores. | **Alto y complejo:** Es más caro, necesita programas más avanzados y vigilar que el flujo no se corte. |
| **Informes históricos** | **Muy adecuado:** Es la mejor opción para procesar meses enteros de datos y sacar gráficos con calma. | **Adecuado, pero más complicado:** Se puede hacer, pero es complicarse la vida para algo que no corre prisa. |
| **Picos de datos** | Si entran muchos datos de golpe, simplemente tarda un poco más en terminar la tanda sin romperse. | Aguanta bien las ráfagas, pero si se desborda puede atascar el sistema si no está bien configurado. |

### ¿Qué alternativa usar para cada caso?
* **Para las alertas inmediatas:** usaría **Streaming**, porque si hay un escape de humo o una nube tóxica necesitamos avisar a la gente en segundos, no esperar horas a que termine un lote.
* **Para los informes históricos:** usaría **Batch**, porque es más barato, más sencillo y permite limpiar errores tranquilamente a final de mes sin gastar dinero de más.

## 4. Elaborar una recomendación

### El riesgo más urgente
El problema más grave es que en el **Distrito D4 (Sur Industrial)** viven 180.000 personas rodeadas de fábricas y coches, pero solo tienen 5 sensores (2,8 por cada 100.000 habitantes). Si hay un pico grave de contaminación, la red actual puede tardar en enterarse o no detectarlo bien.

### La actuación propuesta
Propongo dos cosas muy sencillas:
1. **Mover o añadir al menos 3 o 4 sensores más al Distrito D4**, quitando alguno de zonas que tienen muchos para el poco tamaño que tienen (como el Centro).
2. **Poner un filtro automático de limpieza** en el ordenador para que no acepte datos imposibles (como temperaturas de 70 grados o partículas negativas) antes de calcular la calidad del aire.

### Dos razones basadas en el dossier
1. **Por población y peligro:** D4 concentra 180.000 habitantes, tráfico pesado e industria, pero es de los barrios con peor cobertura de toda la ciudad.
2. **Por los fallos que ya hemos visto:** En solo dos días de prueba ya aparecieron 21 registros negativos, datos en Fahrenheit y sensores congelados durante dos horas; si no filtramos eso, las decisiones del Ayuntamiento estarán basadas en números equivocados.

### Un problema que seguiría pendiente
Seguiría sin resolverse la situación del **Distrito D6 (Parque Natural)**, que tiene 30 km² de superficie y **cero sensores**. Aunque viva menos gente (25.000 personas), al ser un parque natural no sabemos si el aire limpio de allí se está ensuciando por culpa de las fábricas cercanas ni tendríamos aviso temprano en caso de incendio forestal.

### Una medida de privacidad
Como los sensores móviles van registrando por dónde se mueven, **no debemos guardar las coordenadas GPS exactas de cada segundo**, ya que se podría saber la ruta que hace una persona o qué furgoneta se mueve por la ciudad. La solución es **agrupar las ubicaciones por barrios o zonas grandes** y borrar los identificadores que permitan rastrear a un vehículo concreto.