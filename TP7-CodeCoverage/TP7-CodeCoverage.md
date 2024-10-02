# TP 7 - Code Coverage, Análisis estático de Código y Pruebas de Integración
Este trabajo práctico corresponde a la unidad Nº: 5 (Libro Ingeniería de Software: Cap 8)

### Objetivos de Aprendizaje

1. **Evaluar la cobertura de pruebas (Code Coverage)**:
   - [x] Explicar el concepto de cobertura de pruebas y su relevancia para asegurar la calidad del software.
   - [x] Medir y analizar el porcentaje de código cubierto por pruebas automatizadas mediante herramientas específicas.
   - [x] Mejorar la cobertura de pruebas para asegurar que los casos críticos y excepcionales están adecuadamente testeados.

2. **Comprender el análisis estático de código**:
   - [x] Definir qué es el análisis estático de código y su importancia en el ciclo de desarrollo de software.
   - [x] Identificar cómo el análisis estático ayuda a detectar errores, vulnerabilidades de seguridad y malas prácticas en el código sin necesidad de ejecutarlo.
   - [x] Utilizar herramientas como **SonarCloud** para realizar análisis estático y generar reportes de calidad de código.

3. **Aplicar pruebas de integración**:
   - [x] Definir qué son las pruebas de integración y cómo garantizan que los módulos de una aplicación interactúen correctamente.
   - [x] Implementar pruebas de integración que simulen escenarios reales y validen la comunicación entre diferentes componentes de una aplicación.
   - [x] Usar herramientas como **Cypress** para realizar pruebas de integración en aplicaciones web.

4. **Integrar análisis estático, cobertura de pruebas y pruebas de integración en un pipeline de CI/CD**:
   - [x] Combinar el uso de SonarCloud, herramientas de cobertura de pruebas y Cypress en un flujo de integración continua para asegurar la calidad global del software.
   - [x] Interpretar los resultados de estos análisis para tomar decisiones de mejora y refactorización del código.

### Desarrollo:
#### Prerequisitos:

- **4.1** Agregar Code Coverage a nuestras pruebas unitarias de backend y front-end e integrarlas junto con sus resultados en nuestro pipeline de build.

	- **4.1.1** En el directorio raiz de nuestro proyecto Angular instalar el siguiente paquete: `npm install karma-coverage --save-dev`
  ![](Capturas/4.1.1.png)
  
  - **4.1.2** Editar nuestro archivo karma.conf.js para que incluya reporte de cobertura
  
  ![](Capturas/4.1.2.png)

  - **4.1.3** En el dir raiz del proyecto EmployeeCrudApi.Tests ejecutar: `dotnet add package coverlet.collector`

  ![](Capturas/4.1.3.png)

  - **4.1.4** Agregar a nuestro pipeline ANTES del Build de Back la tarea de test con los argumentos especificados y la de publicación de resultados de cobertura y **4.1.5** Agregar a nuestro pipeline ANTES del Build de front la tarea de test y la de publicación de los resultados.
	
  ![](Capturas/4.1.4a.png)
  ![](Capturas/4.1.4b.png)

	
	- **4.1.6** Ejecutar el pipeline y analizar el resultado de las pruebas unitarias y la cobertura de código.

 	![](Capturas/4.1.6a.png)
  ![](Capturas/4.1.6b.png)
  ![](Capturas/4.1.6c.png)  


- **4.2** Agregar Análisis Estático de Código con SonarCloud:
	
	- **4.2.1** Integraremos SonarCloud para analizar el código fuente. 
  
  > Configuré SonarCloud en nuestro pipeline siguiendo instructivo 5.1
  ![](Capturas/4.2.1a.png)
  
    - Build del Back:
		
    ![](Capturas/4.2.1b.png)

  - **4.2.2** Vemos el resultado de nuestro pipeline, en extensions tenemos un link al análisis realizado por SonarCloud

    ![](Capturas/4.2.2.png)
  
	- **4.2.3** Ir al link y analizar toda la información obtenida. Detallar en la entrega del TP los puntos más relevantes del informe, qué significan y para qué sirven.

    ![](Capturas/4.2.3a.png)

    - Main Branch Summary:
      > Quality Gate: Indicador más importante que muestra que el código cumple con los estándares de calidad y seguridad definidos en el análisis. No presenta problemas críticos que deban corregirse inmediatamente.

    ![](Capturas/4.2.3b.png)

    - Security Hotspots - Revisión de Seguridad:
      > 0% Security Hotspots Revisados: Indica que aún no se han revisado los posibles problemas de seguridad detectados. Los Security Hotspots no son necesariamente vulnerabilidades, pero sí áreas del código que pueden necesitar revisión por su potencial riesgo.
      > 4 Security Hotspots to review: Existen 4 posibles problemas de seguridad a revisar. Estos puntos son categorizados según su prioridad de revisión. 

- **4.3** Pruebas de Integración con Cypress:
 
	- **4.3.1** En el directorio raiz de nuestro proyecto Angular instalar el siguiente paquete: `npm install cypress --save-dev`
  
  ![](Capturas/4.3.1.png)

  - **4.3.2** Abrir Cypress: `npx cypress open`

  ![](Capturas/4.3.2a.png)

  ![](Capturas/4.3.2b.png)

	- **4.3.3** Inicializar Cypress en nuestro proyecto como se indica en el instructivo 5.2
   	Esto creará automáticamente una estructura de carpetas dentro de tu proyecto. 
	
    ![](Capturas/4.3.3.png)

  - **4.3.4** Crear nuestra primera prueba navegando a nuestro front.
 	En la carpeta cypress/e2e, crear un archivo con el nombre primer_test.js y agregar el siguiente código para probar la página de inicio de nuestro front:
 
    ![](Capturas/4.3.4.png)

  - **4.3.5** Correr nuestra primera prueba
 	Si está abierta la interfaz gráfica de Cypress, aparecerá el archivo primer_test.cy.js en la lista de pruebas. Clic en el archivo para ejecutar la prueba.
  	
    ![](Capturas/4.3.5a.png)
	  ![](Capturas/4.3.5b.png)

	También es posible ejecutar Cypress en modo "headless" (sin interfaz gráfica) utilizando el siguiente comando: `npx cypress run`
 	
    ![](Capturas/4.3.5c.png)

  - **4.3.6** Modificar nuestra prueba para que falle.
	  > Editamos el archivo primer_test.cy.js y hacemos que espere otra cosa en el título
    ![](Capturas/4.3.6a.png)

	  > Ejecutamos cypress en modo headless
	  ![](Capturas/4.3.6b.png)
	
    > Cypress captura automáticamente pantallas cuando una prueba falla. Las capturas de pantalla se guardan en la carpeta `cypress/screenshots`.
	  ![](Capturas/4.3.6c.png)

  - **4.3.6** Grabar nuestras pruebas para que Cypress genere código automático y genere reportes:
	  > Editamos el archivo cypress.config.ts incluyendo la propiedad **experimentalStudio** en true y la configuración de reportería.
	  ![](Capturas/4.3.6d.png)
   
    > Corremos nuevamente Cypress con npx cypress open, una vez que se ejecute nuestra prueba tendremos la opción de "Add Commands to Test". Esto permitirá interactuar con la aplicación y generar automáticamente comandos de prueba basados en las interacciones con la página:
    ![](Capturas/4.3.6e.png)

  - **4.3.7** Hacemos prueba de editar un empleado
    > Creamos en cypress/e2e/ un archivo editEmployee_test.cy.js con el siguiente contenido, guardamos y aparecerá en Cypress:
  	![](Capturas/4.3.7a.png)
    ![](Capturas/4.3.7b.png)
  	
    > Hacemos algunos ajustes al código generado:
    ![](Capturas/4.3.7c.png)

#### 4.4 Desafíos:

- Integrar en el pipeline SonarCloud para nuestro proyecto Angular, mostrar el resultado obtenido en SonarCloud

    ![](Capturas/4.4.1a.png)
    ![](Capturas/4.4.1b.png)

- Implementar en Cypress pruebas de integración que incluya los casos desarrollados como pruebas unitarias del front en el TP06.

    ![](Capturas/4.4.2a.png)
    ![](Capturas/4.4.2b.png)
    ![](Capturas/4.4.2c.png)
    ![](Capturas/4.4.2d.png)
    ![](Capturas/4.4.2e.png)

    > Vemos que aparezcan al correr `npx cypress open`
    ![](Capturas/4.4.2f.png)
    
    ![](Capturas/4.4.2g.png)
    ![](Capturas/4.4.2h.png)  
    ![](Capturas/4.4.2i.png)
    ![](Capturas/4.4.2j.png)
    ![](Capturas/4.4.2k.png)

- **Resultado esperado**:
    > Dos Stages: Una para Build, Test Unitarios, Code Coverage y SonarCloud y otra para el Deploy a QA con Tests de Integración
    ![](Capturas/4.4.1c.png)
    ![](Capturas/4.4.1g.png)

    > En la pestaña Test, poder visualizar los Test Unitarios de Front y Back y los Test de Integracion:
    ![](Capturas/4.4.1d.png)

    > En la pestaña Code Coverage, visualizar la cobertura de las pruebas unitarias de Back y de Front:
    ![](Capturas/4.4.1f.png)

    > En la pestaña Extensions, ver el análisis de SonarCloud en verde
    ![](Capturas/4.4.1e.png)

- **Análisis**
  - Cobertura de Código:
    > La cobertura total es del 66.24% con 10 módulos y 157 líneas de código, de las cuales 104 están cubiertas por pruebas.
    > Los módulos con cobertura completa (100%) incluyen controladores, modelos y algunos servicios.
    > Otros módulos presentan una cobertura parcial, por ejemplo, el componente `addemployee.component.ts` tiene una cobertura del 87.50% y otros módulos como `employee.service.ts` tienen una cobertura más baja, como 46.15%.
    > La cobertura en componentes críticos del sistema es adecuada, pero algunos módulos importantes, como servicios o el punto de entrada (Program.cs), requieren más atención en pruebas.

  - Análisis de SonarCloud:
    > El informe de SonarCloud muestra que se ha pasado el Quality Gate, lo que indica que los estándares de calidad definidos para el proyecto han sido cumplidos. En un principio, no lo pasaba, pero se creó un nuevo Quality Gate en donde no se incluía más del 80% de Code Coverage.
    > No se identificaron problemas de seguridad graves, ya que no se reportan "hotspots" de seguridad.
    > Se detectaron duplicaciones de código del 0.3%, lo que sugiere que hay oportunidades para mejorar la mantenibilidad del código eliminando código repetido.
    > En cuanto a nuevas incidencias, hay 7 nuevas que se deben revisar, pero ninguna ha sido aceptada aún.
    > Las métricas de fiabilidad y mantenibilidad del código muestran algunos problemas que podrían impactar en el largo plazo.

- **Conclusión General**:
El proyecto muestra un buen estado general, con una cobertura de código aceptable y sin grandes problemas de seguridad.
Las áreas de mejora están principalmente en la cobertura de pruebas en algunos módulos y la reducción de duplicaciones de código para mejorar la mantenibilidad.
Las incidencias reportadas por SonarCloud deben ser monitoreadas y resueltas, especialmente en lo que respecta a fiabilidad y mantenibilidad, para mantener la calidad del proyecto en el tiempo.

### 6-  Presentación del trabajo práctico.
- Subir un doc al repo de GitHub con las capturas de pantalla de los pasos realizados. Debe ser un documento (md, word, o pdf), no videos. Y el documento debe seguir los pasos indicados en el Desarrollo del TP.
- Acceso al repo de Azure Devops para revisar el trabajo realizado.

### 7-  Criterio de Calificación
Los pasos 4.1 al 4.3 representan un 60% de la nota total, los pasos 4.4 y subsiguientes representan el 40% restante.
