# Ejercicios practicos de Async/Await

## 1. Creando un cargador del perfil de un usuario

Copia el código que se encuentra más abajo y crea un archivo `html` con este código. Al abrirlo en el navegador verás el mensaje de "Cargando perfil del usuario..." (en inglés) y luego verás la información del perfil del usuario donde estaba el mensaje de carga.  

La única parte que no hemos cubierto en la clase es la última línea `document.addEventListener('DOMContentLoaded', displayUserProfile);`.
Ya habíamos visto `addEventListener` que se utiliza para añadirle un "listener" a un elemento de HTML para responder al evento que pasamos en el primer parámetro (`DOMContentLoaded` en este caso).
La diferencia es que estamos añadiendo el listener al documento en sí, en vez de un elemento del documento. Y el evento `DOMContentLoaded` se dispara cuando se carga todo el contenido de la página.  

Así que esto es lo que sucede cuando se carga la página:
1. Se llama la función `displayUserProfile`
2. Se llama nuestra función asincrónica `fetchUserProfile`, la cual nos devuelve los datos del usuario después de 2 segundos.
3. Seleccionamos el elemento con el id `userProfile`
4. Modificamos el elemento con los datos que nos dio la función asincrónica
5. Si hay algún error imprimimos a la consola el error y le mostramos un error al usuario

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile Loader</title>
    <script>
        async function fetchUserProfile() {
            return await new Promise((resolve, reject) => {
              setTimeout(() => {
                const userData = {
                    name: "John Doe",
                    age: 30,
                    email: "john@example.com"
                };
                resolve(userData)
              }, 2000)
            });
        }
        
        async function displayUserProfile() {
            try {
                const userProfile = await fetchUserProfile();
        
                const userProfileElement = document.getElementById('userProfile');
                userProfileElement.innerHTML = `
                    <h2>User Profile</h2>
                    <p><strong>Name:</strong> ${userProfile.name}</p>
                    <p><strong>Age:</strong> ${userProfile.age}</p>
                    <p><strong>Email:</strong> ${userProfile.email}</p>
                `;
            } catch (error) {
                console.error("Error fetching user profile:", error);
                const userProfileElement = document.getElementById('userProfile');
                userProfileElement.innerHTML = "<h2>Error loading user profile</h2>";
            }
        }
        
        document.addEventListener('DOMContentLoaded', displayUserProfile);
    </script>
</head>
<body>

    <div id="userProfile">
        <h2>Loading user profile...</h2>
    </div>

</body>
</html>
```
## 2. Mostrando datos en tiempo real

En este ejemplo usaremos dos archivos, uno para el `html` y otro para el `javascript`. Asegúrate de que **los dos archivos estén en el mismo folder**.
El API que se usa en el video no está funcionando, así que la cambié por otra y por ende tuve que cambiar el código un poco.  

Similar al primer ejercicio, el html tiene un mensaje donde dice "Cargando datos..." (en inglés), y este mensaje se reemplaza con los datos cuando los recibimos.
La única diferencia es que el API que estamos usando manda diferentes datos cada vez que la llamamos, por eso usamos la función `setInterval` para llamar el API cada 5 segundos.
Así que el mensaje en la página debe cambia cada 5 segundos.

`ejercicio-2.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-Time Data Display</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            text-align: center;
            margin: 0;
            padding: 0;
        }
        .data-container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            margin-bottom: 20px;
        }
        p {
            margin: 10px 0;
        }
    </style>
    <script src="ejercicio-2.js"></script>
</head>
<body>
    <div class="data-container">
        <h1>Real-Time Data Display</h1>
        <div id="dataInfo">
            <p>Loading data...</p>
        </div>
    </div>
</body>
</html>
```

`ejercicio-2.js`
```javascript
async function fetchData(callback) {
    const apiUrl = 'https://catfact.ninja/fact';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        callback(null, data);
    } catch (error) {
        callback(error, null);
    }
}

const handleData = (error, data) => {
    const dataInfoElement = document.getElementById('dataInfo');

    if (error) {
        dataInfoElement.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    } else {

        dataInfoElement.innerHTML = `
            <p>Cat Fact: ${data.fact}</p>
        `;
    }
};

const updateData = () => {
    fetchData(handleData);
};

updateData();

setInterval(updateData, 5000);
```
