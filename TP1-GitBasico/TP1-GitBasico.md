# TP 1 - Git Básico
Este trabajo práctico corresponde a la unidad Nº: 1

#### Objetivos de Aprendizaje
 - [x] Utilizar herramientas de control de configuración de software
 - [x] Familiarizarse con los comandos más utilizados
 - [x] Configurar el repositorio principal de cada alumno para la materia

#### Consignas a desarrollar en el trabajo práctico:
  - Los ejercicios representan casos concretos y rutinarios en uso de este tipo de herramientas
  - En los puntos donde corresponda, proveer los comandos de git necesarios para llevar a cabo el punto.
  - Cuando se especifique alguna descripción, realizarlo de la manera más clara posible y con ejemplos cuando sea necesario.

## Desarrollo:

### 1- Instalar Git ✅

### 2- Crear un repositorio local y agregar archivos 
  - Crear un repositorio local en un nuevo directorio. Agregar un archivo Readme.md, agregar algunas líneas con texto a dicho archivo. Crear un commit y proveer un mensaje descriptivo.

  ![](Capturas/2.png) 

### 3- Configuración del Editor Predeterminado ✅
En mi caso, utilice un editor llamado nano que puedo abrir simplemente con el comando con dicho nombre sumado al nombre del archivo desde la misma terminal de Ubuntu.

### 4- Creación de Repos 01 -> Crearlo en GitHub, clonarlo localmente y subir cambios
  - [x] Crear una cuenta en https://github.com
  - Crear un nuevo repositorio en dicha página con el Readme.md por defecto

    ![](Capturas/4a.png) 
  - Clonar el repo remoto en un nuevo directorio local
    
    ![](Capturas/4b.png) 
      
    ![](Capturas/4c.png) 
  - Editar archivo Readme.md agregando algunas lineas de texto
    
    ![](Capturas/4e.png) 
  - Editar (o crear si no existe) el archivo .gitignore agregando los archivos *.bak
    
    ![](Capturas/4g.png)
      
    ![](Capturas/4f.png)  
  - Crear un commit y proveer un mensaje descriptivo, Intentar un push al repo remoto
    
    ![](Capturas/4h.png)  
  - [x] En caso de ser necesario configurar las claves SSH requeridas y reintentar el push.

### 5- Creación de Repos 02-> Crearlo localmente y subirlo a GitHub
  - Crear un repo local

    ![](Capturas/5a.png) 
  - Agregar archivo Readme.md con algunas lineas de texto

    ![](Capturas/5c.png) 

    ![](Capturas/5b.png) 
  - Crear archivo .gitignore
    
    ![](Capturas/5d.png)
  - Crear un commit y proveer un mensaje descriptivo
  
    ![](Capturas/5e.png)
  - Crear repo remoto en GitHub

    ![](Capturas/5f.png) 
  - Asociar repo local con remoto, Subir cambios.

    ![](Capturas/5g.png)
  - **Vista del Repo en Git**

    ![](Capturas/5h.png)   
  

### 6- Ramas
  - Crear una nueva rama, Cambiarse a esa rama

    ![](Capturas/6a.png)
  - Hacer un cambio en el archivo Readme.md6b

    ![](Capturas/6b.png)
  - Hacer commit y revisar la diferencia entre ramas

    ![](Capturas/6c.png)

### 7- Merges
  - Hacer un merge FF

    ![](Capturas/7a.png)

  Como no hay commits en el main desde que cree la nueva rama, este será un merge Fast-Forward.  
  - Borrar la rama creada, Ver el log de commits
 
    ![](Capturas/7b.png) 
  - Repetir el ejercicio 6 para poder hacer un merge con No-FF

    ![](Capturas/7c.png)

    ![](Capturas/7d.png)
  - **Log de los commits y el merge**

    ![](Capturas/7e.png)

### 8- Resolución de Conflictos
  - Instalar alguna herramienta de comparación. Idealmente una 3-Way:
    
    Me instalé esta llamada Meld

    ![](Capturas/8a.png)
  - Crear una nueva rama conflictBranch, Realizar una modificación en la linea 1 del Readme.md desde main y commitear

    ![](Capturas/8b.png)
  - En la conflictBranch modificar la misma línea del Readme.md y commitear

    ![](Capturas/8c.png)
  - Ver las diferencias con git difftool main conflictBranch

    ![](Capturas/8d.png)
  - Cambiarse a la rama main e intentar mergear con la rama conflictBranch

    ![](Capturas/8e.png)
  - Resolver el conflicto con git mergetool

    ![](Capturas/8f.png)

    ![](Capturas/8g.png)

    ![](Capturas/8h.png)
  - Agregar .orig al .gitignore

    ![](Capturas/8i.png)
  - Hacer commit y push

    ![](Capturas/8j.png)
  -**Vista Final del Repo de Git**

    ![](Capturas/8k.png)

### 9- Familiarizarse con el concepto de Pull Request

  - Explicar que es un pull request.
  **Definición de Chat GPT:**
  Un Pull Request (PR) es una función en sistemas de control de versiones como GitHub que permite a los desarrolladores notificar a otros miembros del equipo que han completado un cambio en su rama y que les gustaría que ese cambio se integrara en la rama principal (como main o master).
  - Crear un branch local y agregar cambios a dicho branch.
   
    ![](Capturas/9a.png) 
  - Subir el cambio a dicho branch y crear un pull request.

    ![](Capturas/9b.png) 

    ![](Capturas/9c.png) 
  - Completar el proceso de revisión en github y mergear el PR al branch master.

    ![](Capturas/9d.png) 

    ![](Capturas/9e.png)
    
    ![](Capturas/9f.png)  


### 10- Algunos ejercicios online
  - [x] Entrar a la página https://learngitbranching.js.org/
  - Completar los ejercicios **Introduction Sequence**

    ![](Capturas/10.png)  
  

### 11- Crear Repositorio de la materia
  - [x] Crear un repositorio para la materia en github. 
  Lo llamé **IngSoftIII**
  - [x] Subir archivo(s) .md con los resultados e imágenes de este trabajo práctico. 
  Se encuentran en una subcarpeta **TP1-GitBasico**
