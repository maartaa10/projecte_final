# Zelda BOTW API & Frontend (Materials i Monstres)

Aquest projecte inclou una **API RESTful** i un **frontend interactiu** que simula una **GameBoy** per gestionar informació de **materials** i **monstres** del joc *The Legend of Zelda: Breath of the Wild*. També inclou funcionalitats avançades com la valoració amb estrelles, la selecció automàtica de categories i la gestió de vots.

---
## 📁 Contingut
- [Zelda BOTW API \& Frontend (Materials i Monstres)](#zelda-botw-api--frontend-materials-i-monstres)
  - [📁 Contingut](#-contingut)
  - [🎮 Com utilitzar la interfície (GameBoy)](#-com-utilitzar-la-interfície-gameboy)
  - [✨ Característiques](#-característiques)
  - [📚 Backend (API)](#-backend-api)
    - [Endpoints de l'API](#endpoints-de-lapi)
      - [Materials](#materials)
      - [Monstres](#monstres)
      - [Vots](#vots)
  - [💻 Frontend](#-frontend)
    - [Estructura del projecte](#estructura-del-projecte)
    - [Funcionalitats del frontend](#funcionalitats-del-frontend)
  - [✨ Validacions](#-validacions)
    - [Validacions generals](#validacions-generals)
    - [Validacions específiques per a **materials**](#validacions-específiques-per-a-materials)
    - [Validacions específiques per a **monstres**](#validacions-específiques-per-a-monstres)
    - [Comportament en cas d'errors](#comportament-en-cas-derrors)
  - [🔧 Millores](#-millores)
  - [| **Selecció automàtica de categories** | Quan es crea un nou element, la categoria es defineix automàticament segons si l'usuari està a la vista de materials o monstres. | - La categoria es selecciona automàticament en funció del context (materials o monstres).            |](#-selecció-automàtica-de-categories--quan-es-crea-un-nou-element-la-categoria-es-defineix-automàticament-segons-si-lusuari-està-a-la-vista-de-materials-o-monstres----la-categoria-es-selecciona-automàticament-en-funció-del-context-materials-o-monstres------------)
  - [🐳 Instal·lació amb Docker](#-installació-amb-docker)
    - [🔧 Requisits](#-requisits)
    - [📖 Instruccions](#-instruccions)
    - [📖](#)
  - [💻 Instal·lació en local](#-installació-en-local)
    - [🔧 Requisits](#-requisits-1)
    - [📖 Instruccions](#-instruccions-1)
  - [📝 Notes](#-notes)


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



---

## ✨ Característiques

| Característica                  | Descripció                                                                 |
|---------------------------------|-----------------------------------------------------------------------------|
| **Base de dades**               | MongoDB                                                                    |
| **CRUD complet**                | Per a materials i monstres                                                 |
| **Frontend interactiu**         | React.js amb funcionalitats avançades                                      |
| **Valoració amb estrelles**     | Permet als usuaris valorar materials i monstres                            |
| **Gestió de vots**              | Inclou càlcul de la suma                                                   |
| **Selecció automàtica**         | La categoria es defineix automàticament segons el context                  |
| **Camps específics**            | Mostra camps diferents segons si és un material o un monstre               |
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

---

## 💻 Frontend

### Estructura del projecte

El frontend està desenvolupat amb **React.js** i té la següent estructura:

```
src/
├── api.js                # Funcions per interactuar amb l'API
├── App.js                # Component principal de l'aplicació
├── components/           # Carpeta que conté tots els components React
│   ├── ElementModal.jsx  # Modal per crear/editar elements
│   ├── DeleteModal.jsx   # Modal per confirmar eliminacions
│   ├── ImageModal.jsx    # Modal per mostrar imatges i gestionar vots
│   ├── GameBoy.jsx       # Component visual inspirat en una GameBoy
├── styles.css            # Estils globals
├── docu/                 # Carpeta que conté la documentació
│   ├── docu.pdf          # Documentació en format PDF
    ├── docu.md          # Documentació en format md
```

### Funcionalitats del frontend

| Funcionalitat                  | Descripció                                                                 |
|--------------------------------|-----------------------------------------------------------------------------|
| **Llistat d'elements**         | Mostra materials i monstres en targetes                                    |
| **Creació/edició d'elements**  | Permet afegir o editar materials i monstres mitjançant un modal            |
| **Eliminació d'elements**      | Mostra un modal de confirmació abans d'eliminar un element                 |
| **Valoració amb estrelles**    | Els usuaris poden valorar elements amb un sistema d'estrelles             |
| **Càlcul de la suma**          | La suma dels vots es calcula i es mostra en temps real                     |
| **Selecció automàtica**        | La categoria es defineix automàticament segons el context (materials/monstres) |
| **Camps específics**           | Mostra camps diferents segons si és un material o un monstre               |

---

## ✨ Validacions

El projecte inclou diverses validacions per assegurar que les dades introduïdes pels usuaris siguin correctes abans de guardar-les. A continuació es detallen les validacions aplicades:

### Validacions generals

| **Camp**       | **Validació**                                                                 | **Missatge d'error**                                   |
|----------------|-------------------------------------------------------------------------------|-------------------------------------------------------|
| **Nom**        | Ha de tenir almenys **3 caràcters** després d'eliminar els espais inicials i finals. Es permeten espais intermedis (exemple: `"Nom Exemple"`). | `"El nom ha de tenir almenys 3 caràcters."`          |
| **Descripció** | Ha de tenir almenys **3 caràcters** després d'eliminar els espais inicials i finals. Es permeten espais intermedis (exemple: `"Aquesta és una descripció."`). | `"La descripció ha de tenir almenys 3 caràcters."`   |

### Validacions específiques per a **materials**

| **Camp**            | **Validació**                                      | **Missatge d'error**                                   |
|---------------------|----------------------------------------------------|-------------------------------------------------------|
| **Hearts Recovered** | Ha de ser un **número positiu**.                   | `"Els cors recuperats han de ser un número positiu."` |
|          |

### Validacions específiques per a **monstres**

| **Camp**  | **Validació**                                                                 | **Missatge d'error**                                   |
|-----------|-------------------------------------------------------------------------------|-------------------------------------------------------|
| **Drops** | Ha d'existir almenys **un drop**. Cada drop ha de tenir almenys **1 caràcter** (no pot estar buit). | `"Els monstres han de tenir almenys un drop."` <br> `"Els drops no poden estar buits."` |


---

### Comportament en cas d'errors

Quan es detecta un error en el formulari:
- Es mostra un missatge d'error en **color vermell** sota el camp corresponent.
- L'usuari no pot guardar l'element fins que es resolguin tots els errors.

---
## 🔧 Millores

Aquí tens les millores en format de taula:

| **Nom**                        | **Descripció**                                                                 | **Implementació**                                                                                     |
|--------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| **Valoració amb estrelles**    | Els usuaris poden valorar materials i monstres amb un sistema d'estrelles (1 a 5). | - Els vots es guarden al backend i es mostren al frontend. <br> - Es calcula el **total** de vots per a cada element. |
| **Càlcul de la suma**          | La suma dels vots es calcula al frontend per representar millor les valoracions. | - Els vots es processen en un array, s'ordenen i es calcula la suma.                                 |
| **Selecció automàtica de categories** | Quan es crea un nou element, la categoria es defineix automàticament segons si l'usuari està a la vista de materials o monstres. | - La categoria es selecciona automàticament en funció del context (materials o monstres).            |
---

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

### 📖

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


