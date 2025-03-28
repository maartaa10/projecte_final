# Zelda BOTW API & Frontend (Materials i Monstres)

Aquest projecte inclou una **API RESTful** i un **frontend interactiu** que simula una **GameBoy** per gestionar informació de **materials** i **monstres** del joc *The Legend of Zelda: Breath of the Wild*. També inclou funcionalitats avançades com la valoració amb estrelles, la selecció automàtica de categories i la gestió de vots.

---

## 🎮 Com utilitzar la interfície (GameBoy)

El frontend està dissenyat per simular una **GameBoy**, amb botons interactius que permeten navegar i gestionar els elements. A continuació es detallen els botons i les seves funcions:

| Botó       | Funció                                                                 |
|------------|------------------------------------------------------------------------|
| **▲ / ▼**  | Navegar entre els elements (anterior/següent).                         |
| **◀ / ▶**  | Navegar entre els elements (anterior/següent).                         |
| **E**      | Editar l'element seleccionat.                                          |
| **A**      | Afegir un nou element (material o monstre, segons la vista actual).    |
| **D**      | Eliminar l'element seleccionat (mostra un modal de confirmació).       |
| **Materials** | Canviar a la vista de materials.                                    |
| **Monsters**  | Canviar a la vista de monstres.                                     |

---

## 📁 Contingut
- [Zelda BOTW API \& Frontend (Materials i Monstres)](#zelda-botw-api--frontend-materials-i-monstres)
  - [🎮 Com utilitzar la interfície (GameBoy)](#-com-utilitzar-la-interfície-gameboy)
  - [📁 Contingut](#-contingut)
  - [✨ Característiques](#-característiques)
  - [📚 Backend (API)](#-backend-api)
    - [Endpoints de l'API](#endpoints-de-lapi)
      - [Materials](#materials)
      - [Monstres](#monstres)
      - [Vots](#vots)
  - [💻 Frontend](#-frontend)
    - [Estructura del projecte](#estructura-del-projecte)
    - [Funcionalitats del frontend](#funcionalitats-del-frontend)
  - [🔧 Millores](#-millores)
    - [1. **Valoració amb estrelles**](#1-valoració-amb-estrelles)
    - [2. **Càlcul de la suma**](#2-càlcul-de-la-suma)
    - [3. **Selecció automàtica de categories**](#3-selecció-automàtica-de-categories)
  - [🐳 Instal·lació amb Docker](#-installació-amb-docker)
    - [🔧 Requisits](#-requisits)
    - [📖 Instruccions](#-instruccions)
  - [💻 Instal·lació en local](#-installació-en-local)
    - [🔧 Requisits](#-requisits-1)
    - [📖 Instruccions](#-instruccions-1)
  - [📝 Notes](#-notes)

---

## ✨ Característiques

| Característica                  | Descripció                                                                 |
|---------------------------------|-----------------------------------------------------------------------------|
| **Base de dades**               | MongoDB                                                                    |
| **CRUD complet**                | Per a materials i monstres                                                 |
| **Frontend interactiu**         | React.js amb funcionalitats avançades                                      |
| **Valoració amb estrelles**     | Permet als usuaris valorar materials i monstres                            |
| **Gestió de vots**              | Inclou càlcul de la suma i reinici dels vots                            |
| **Selecció automàtica**         | La categoria es defineix automàticament segons el context                  |
| **Backend**                     | Node.js + Express                                                          |
| **Documentació interactiva**    | Swagger disponible a [http://localhost:3001/api-docs](http://localhost:3001/api-docs) |

---

## 📚 Backend (API)

### Endpoints de l'API

#### Materials
| Mètode | Endpoint           | Descripció                              |
|--------|---------------------|------------------------------------------|
| GET    | `/materials`        | Obté tots els materials                 |
| GET    | `/materials/:id`    | Obté un material específic              |
| POST   | `/materials`        | Crea un nou material                    |
| PUT    | `/materials/:id`    | Actualitza un material existent         |
| DELETE | `/materials/:id`    | Elimina un material                     |

#### Monstres
| Mètode | Endpoint           | Descripció                              |
|--------|---------------------|------------------------------------------|
| GET    | `/monsters`         | Obté tots els monstres                  |
| GET    | `/monsters/:id`     | Obté un monstre específic               |
| POST   | `/monsters`         | Crea un nou monstre                     |
| PUT    | `/monsters/:id`     | Actualitza un monstre existent          |
| DELETE | `/monsters/:id`     | Elimina un monstre                      |

#### Vots
| Mètode | Endpoint           | Descripció                              |
|--------|---------------------|------------------------------------------|
| GET    | `/votes`            | Obté el total de vots per element       |
| POST   | `/votes`            | Afegeix un vot a un element             |
| DELETE | `/votes/:id_num`    | Reinicia els vots d'un element          |


## 💻 Frontend

### Estructura del projecte

El frontend està desenvolupat amb **React.js** i té la següent estructura:

```
src/
├── api.js                # Funcions per interactuar amb l'API
├── App.js                # Component principal de l'aplicació
├── ElementModal.jsx      # Modal per crear/editar elements
├── DeleteModal.jsx       # Modal per confirmar eliminacions
├── ImageModal.jsx        # Modal per mostrar imatges i gestionar vots
├── GameBoy.jsx           # Component visual inspirat en una GameBoy
├── styles.css            # Estils globals
```

### Funcionalitats del frontend

| Funcionalitat                  | Descripció                                                                 |
|--------------------------------|-----------------------------------------------------------------------------|
| **Llistat d'elements**         | Mostra materials i monstres en targetes                                    |
| **Creació/edició d'elements**  | Permet afegir o editar materials i monstres mitjançant un modal            |
| **Eliminació d'elements**      | Mostra un modal de confirmació abans d'eliminar un element                 |
| **Valoració amb estrelles**    | Els usuaris poden valorar elements amb un sistema d'estrelles             |
| **Càlcul de la suma**       | La suma dels vots es calcula i es mostra en temps real                  |
| **Reinici dels vots**          | Botó per reiniciar els vots d'un element específic                         |
| **Selecció automàtica**        | La categoria es defineix automàticament segons el context (materials/monstres) |

---

## 🔧 Millores

### 1. **Valoració amb estrelles**
- **Descripció**: Els usuaris poden valorar materials i monstres amb un sistema d'estrelles (1 a 5).
- **Implementació**:
  - Els vots es guarden al backend i es mostren al frontend.
  - Es calcula el **total** de vots per a cada element.


### 2. **Càlcul de la suma**
- **Descripció**: La suma dels vots es calcula al frontend per representar millor les valoracions.
- **Implementació**:
  - Els vots es processen en un array, s'ordenen i es calcula la suma.



### 3. **Selecció automàtica de categories**
- **Descripció**: Quan es crea un nou element, la categoria es defineix automàticament segons si l'usuari està a la vista de materials o monstres.


## 🐳 Instal·lació amb Docker

### 🔧 Requisits
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 📖 Instruccions

1. Clona el repositori:
   ```bash
   git clone https://github.com/usuari/zelda-botw-api.git
   cd zelda-botw-api
   ```

2. Executa el projecte amb Docker Compose:
   ```bash
   docker compose up --build
   ```

3. Accedeix a l'API a [http://localhost:3001](http://localhost:3001).

---

## 💻 Instal·lació en local

### 🔧 Requisits
- [Node.js](https://nodejs.org/) (versió 14 o superior)
- [MongoDB](https://www.mongodb.com/)

### 📖 Instruccions

1. Clona el repositori:
   ```bash
   git clone https://github.com/usuari/zelda-botw-api.git
   cd zelda-botw-api
   ```

2. Instal·la les dependències:
   ```bash
   npm install
   ```

3. Inicia el servidor:
   ```bash
   npm start
   ```

4. Accedeix a l'API a [http://localhost:3001](http://localhost:3001).



## 📝 Notes

- Pots fer servir Swagger a [http://localhost:3001/api-docs](http://localhost:3001/api-docs) per explorar i provar els endpoints.
- Les dades de materials i monstres estan basades en l’API original: [https://botw-compendium.herokuapp.com](https://botw-compendium.herokuapp.com).


