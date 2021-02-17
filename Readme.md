# **Delilah Resto**
Proyecto del curso "Desarollo Web Full Stack"

&nbsp; 
## **Sistema de gestión de pedidos de un restaurante**
Este es el proyecto Delilah resto, un backend orientado a micro-servicios pensado para un negocio restaurante con una aplicación web para administrar los productos del sistema y sus pedidos


---
&nbsp; 
## **Configuraciones** 

Para poder correr ésta aplicación es necesario instalar algunas librerías de node.js. 

En el archivo package.json se encuentra el listado de "dependencies" que se deben instalar

url base de datos:
https://remotemysql.com/phpmyadmin/index.php
Usuario: 1J9EQO0eZ5
Contraseña: TyVbvWKgbK

&nbsp;
En la terminal de nuestro IDE y ubicados en el directorio del proyecto, ejecutamos el siguiente comando:

```bash
   .../Delilah-Resto>npm install
``` 

---
&nbsp; 
## **Inicio** 

Para iniciar el servidor y ponerlo a la escucha, ejecutamos:

```bash
   .../Delilah-Resto>npm start
``` 

_*Nota: El servidor iniciará por defecto en el puerto 5000 y si éste no se encontrara disponible en el puerto 3000*_

---

## Condición 1: Registrar usuario
&nbsp; 
## **Sign up** 
Para iniciar en la aplicación se debe registrar como usuario y posteriormente loguear. En el caso del registro se hace una petición de tipo GET a la ruta '/sign-up' y ahí nos devolverá como respuesta los datos que debemos enviar al servidor para poder completarlo. 

Para poder registrarte envia los siguientes datos
[GET] http://localhost:5000/sign-up

user:
password:
full_name:
email:
phone:
address:


Luego con una petición POST enviamos los datos en formato JSON: 

[POST] http://localhost:5000/sign-up

{
"user":"",
"password":"",
"full_name":"",
"email":"",
"phone":"",
"address":""
}


Como respuesta si todo sale correctamente nos redireccionará al endpoint '/log-in'. 

_*Importante: No es posible crear usuarios con rol de administrador. Éste ya fue creado. Sus datos son: "email":"adm@gmail.com", "password":"adm" y su "id":"1"*_

---
&nbsp; 
## **Log in**
De esa manera se habrá completado el registro y nos redirigirá hacia el endpoint de '/log-in'. De igual manera el servidor nos provee la información sobre los datos que debemos enviar.

![POST] http://localhost:5000/log-in



{
"email":"anaranjo0@gmail.com",
"password":"123"
}


&nbsp; 

>### Token

Cuando enviamos la petición el servidor nos devolverá un {token} el cual debemos copiar y pegar en la cabecera de nuestras futuras peticiones con la clave "Authorization" y valor "Bearer {token}" de lo contrario no podremos acceder a los servicios.

![log-in-POST]http://localhost:5000/sign-up


---
# Condición 2: Listar productos
&nbsp; 
## **Menu**
Una vez autenticado con nuestro token el próximo paso lógico es obtener el menu para ver que plato podemos ordenar. Se puede visualizar el menú completo del restaurante en el endpoint '/menu'. 

![GET]http://localhost:5000/menu



_*Nota: Se puede visualizar un solo plato del menu en el endpoint '/menu/:id'_

[GET]http://localhost:5000/menu/2

&nbsp; 

# Condición 3: Generar pedido

---
&nbsp; 
## **Orden**

Para realizar una orden debemos enviar al endpoint '/orders/:userId' un array y dentro un objeto por _cada plato_ que queramos ordenar. Dentro de éste objeto debe tener el "id" del plato y la cantidad "qty" deseada. **Siempre como último elemento de éste array debemos especificar la manera en que haremos el pago.** Para esto se debio haber cumplico los pasos anteriores del logueo y el token.

Ejm.

[POST] http://localhost:5000/orders/1

[
	{
	  "id": "3",
	  "qty" : 1
	},

	{
	  "id": "4",
	  "qty" : 2
	},
    "tarjeta"
]

Resutaldo

¡Recibimos tu pedido!
adm, gracias por pedir en 'Delilah Resto'
puedes seguir tu pedido en:

/orders/tracking/1/1

El sistema nos mostrara el endpoint '/orders/:userId/:orderId', donde obtendremos una confirmación de la recepción del pedido como respuesta, y además nos brindará el endpoint al cuál debemos acceder para realizar el seguimiento de nuestra orden. Si enviamos dicha petición el servidor nos mostrará el estado de nuestro pedido.


![GET] http://localhost:5000/orders/tracking/1/1

El estado del pedido es:

recibido correctamente

Para ver un registro de todas las ordenes realizadas por un usuario podemos hacer una petición GET al endpoint '/orders/:userId'. 

![GET]http://localhost:5000/orders/1

[
    {
        "state": "recibido correctamente",
        "id": 4,
        "detail": "Hamburguesa x 1 Churrasco argentino x 2 Lasagna x 2 ",
        "total": 200000,
        "payment_method": "tarjeta",
        "user": "alexis",
        "address": "calle"
    },
    {
        "state": "recibido correctamente",
        "id": 1,
        "detail": "Bandeja Paisa x 1 ",
        "total": 30000,
        "payment_method": "[object Object]",
        "user": "alexis",
        "address": "calle"
    }
]

También podemos ver una sola orden en el endpoint '/orders/:userId/:orderId'

_Importante: en éste endpoint se podrán ver datos de contacto del usuario_

![GET]http://localhost:5000/orders/1/4

[
    {
        "detail": "Hamburguesa x 1 Churrasco argentino x 2 Lasagna x 2 ",
        "total": 200000,
        "state": "recibido correctamente",
        "payment_method": "tarjeta",
        "address": "calle",
        "full_name": "Alexis Naranjo",
        "user": "alexis",
        "email": "anaranjo0@gmail.com",
        "phone": "123456"
    }
]


# Condición 4: Actualizar estado pedido (Administrador)

**Actualizar estado ordenes**

En el endpoint '/orders

errores /:userId/:orderId' podremos editar el estado de la orden, **no la orden en si misma**. Debemos enviar un solo dato y es el estado con una petición PUT e inmediatamente el servidor nos responderá con el detalle de la orden ésta vez con el nuevo estado actualizado por el administrador.

[PUT]http://localhost:5000/orders/1/4

[
    {
        "detail": "Hamburguesa x 1 Churrasco argentino x 2 Lasagna x 2 ",
        "total": 200000,
        "state": "enviado",
        "payment_method": "tarjeta",
        "address": "calle",
        "full_name": "Alexis Naranjo",
        "user": "alexis",
        "email": "anaranjo0@gmail.com",
        "phone": "123456"
    }
]





# Condición 5: CRUD de productos (Administrador)

> ### usuario ADM
#### **Ingresar, editar y eliminar nuevo plato**
El usuario con rol ADM puede ingresar, editar y eliminar platos del menu haciendo uso de las peticiones POST, PUT y DELETE respectivamente.

&nbsp;

#### **Ingresar plato**

En el endpoint '/menu' ingresar todos los datos necesarios, como pueden verse en el resto de platos que figuran en el menú.
Como respuesta por parte del servidor obtendremos el nuevo plato con un "id" asignado automáticamente.



![POST] http://localhost:5000/menu

 {
        "id": 2,
        "description": "Churrasco argentino",
        "price": 50000,
        "photo": "Churrasco"
    }

_*Nota: El campo de "photo" se creó para ingresar la url de la imagen del plato. En éste trabajo práctico no es requisito trabajar el diseño front-end de la app por eso se le asigna un string*_

#### **Editar plato**

En el endpoint '/menu/:id'. Ingresando todos los datos nuevamente.
Como respuesta por parte del servidor obtendremos el plato con las nuevas modificaciones.

![PUT]http://localhost:5000/menu/2

 {
        "id": 2,
        "description": "Churrasco argentino",
        "price": 50000,
        "photo": "Churrasco"
    }


#### **Eliminar plato**

Haciendo la petición DELETE a éste endpoint '/menu/:id' se habrá eliminado el mismo. 
Como respuesta por parte del servidor se redirigirá al endpoint '/menu'.

![DELETE]http://localhost:5000/menu/2


# Condición 6: Control de acciones usuario no Administrador


&nbsp; 
>### usuario ADMIN
#### **Ver todas las ordenes, editar y eliminar una orden**
El usuario con rol ADMIN puede ver todas las ordenes ingresadas, actualizar el estado y eliminar las mismas haciendo uso de las peticiones GET, PUT y DELETE respectivamente.

**Ver ordenes**

En el endpoint '/orders' podemos ver todas las ordenes ordenadas decrecientemente, es decir, las más recientes primero.

[GET] http://localhost:5000/orders

**Eliminar ordenes**

En el endpoint '/orders/:userId/:orderId' también podemos eliminar la orden. En éste caso como confirmación nos redirigirá a las ordenes que tiene en el historial el usuario y si no posee otras un array vacio.

**Consulta de datos de un usurio especifico**

para poder consultar un usuario especifico se puede hacer uso del endpoint 'sign-up/:id' debe estar logueado como administrador para poder visualizar la informacion del usuario consultado.

[GET] http://localhost:5000/sign-up/1

 {
        "id": 1,
        "user": "alexis",
        "password": "$2b$10$wiRDhpLgk9JGFIiWBxKXK.NVpVCng/e8TENwm1n/C9ol5rSCWFRMO",
        "full_name": "Alexis Naranjo",
        "email": "anaranjo0@gmail.com",
        "phone": "123456",
        "address": "calle",
        "role": "0"
    }
