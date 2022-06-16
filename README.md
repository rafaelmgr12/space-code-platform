<h1 align="center">Space Code Plataform</h1>
<p align = "center"> An application to manage the transport fleet of goods through the galaxy, including four planets.</p>


<p align="center">
  <a href="#-technology">Technology</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-execute">How to Run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">
</p>

## ✨ Technology

The Project was develop as using the following techs:
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)


## 💻 Project
The project is a challenge proposed by Codeminer42, in which we construct an API for an Intergalactic Empire. The purpose of the Empire is to manage delivery made by the pilots that are registered in the system with the respective ships. To make the deliveries, the Empire opened transportation contracts where the pilot can accept it and make the delivery.

Also, there are rules to make the deliveries for example the routes. Some routes are not possible to make, and it is also possible for a pilot to refill the fuel of a ship. And last, it is also possible to generate the transaction history and summary of the transportation statistics.

###  📓 Requirements 
The basis of this API is to manage information about pilots,ships contracts and cargo. The initial features implement is the following

1. Add Pilot and their ships to the system
2. Publish transport contracts
3. Travel between planets
4. List open contracts
5. Accept transport Contracts
6. Grant credits to their pilot after fulfilling the contracts
7. Register a refill of the fuel
8. Reports
    
    *As a government system, they want to know what\`s going on. So a report about the contract, pilot and ships is required* 
    
**Total weight in tons of each resource sent and received by each planet.**

```json
[
  {...},
  "calas": {
    "sent": {
      "food": 140,
      "minerals": 10,
      "water": 5
    },
    "received": {
	    ...
    }
  },
  {...}
]
```

**Percentage of resource type transported by each pilot.**

```json
[
  {...},
  "pilot 2": {
    "food": 35,
    "water": 65
  },
  {...},
]
```

**Intergalactic Federation transactions ledger sorted by date (oldest to newest).**

```json
[
  "…",
  "Contract 2 Description paid: -₭936",
  "Contract 3 Description paid: -₭1200",
  "Han Solo bought fuel: +₭210",
  "…",
]
```

### Rules for Travels
Travel between planets has different distances and durations, reflecting on fuel consumption for each route. The table below shows these fuel costs.

|         	|         	|    To   	|      	|       	|
|---------	|:--------:	|:--------:	|:----:	|:------:	|
| From    	| Andvari 	| Demeter 	| Aqua 	| Calas 	|
| Andvari 	|    -    	|    X    	|  13  	|   23  	|
| Demeter 	|    X    	|    -    	|  22  	|   25  	|
| Aqua    	|    X    	|    30   	|   -  	|   12  	|
| Calas   	|    20   	|    25   	|  15  	|   -   	|

This table shows the X means the route between those planets is blocked by problems like an asteroid belt or a scrapyard. Please note that the route can be blocked from A to B while still open from B to A. As example follows:

Travel from Aqua to Andvari is not possible. But starting from Aqua is possible to travel to Calas using just 12 fuel units.

The _user_ of the system is responsible for making each travel between planets, but the system should validate if every travel is valid, as well as taking into account the effects of each travel in the database.

### Attributes description
#### Pilot
- pilot certification: the identification document permission to fly a ship. It uses Luhn validation similar to Brazilian CPF, composed by 6 digits and 1 check digit. Validation is optional.
- name: the pilot name.
- age: the pilot age. The minimum age to ride a ship is 18 years.
- credits: amount of credits owned by the pilot. It’s money, be aware.
- location planet: name the current planet where the fly is.

#### Ship
- fuel capacity: ships have a maximum capacity of fuel they can hold.
- fuel level: current fuel level of the ship.  
- weight capacity: ships have a maximum of tons they can handle (considering just the cargo) 

#### Contracts
- description: a description of what that contract is for. (e.g water and food to calas)
- payload: the actual cargo to be transported. ` are listed here.
- origin planet: planet where the container should be taken.
- destination planet: planet where the pilot should take the container
- value: quantity of credits offered as payment for the contract

#### Resource
- name: the name of the resource. The possible values are minerals, water or food.
- weight: how many tons of that resource.



## 🚀 How to Run

To run the this project 

- Clone the repo and access the directory;
- Use the `npm` or `yarn` to install the dependencies;
- Run the migrations with `npx prisma migrate dev` or `yarn prisma migrate dev`;
- Init the server with `yarn dev` or `npm run dev`;


The application runs in the [`localhost:3000`](http://localhost:3000).

It possible to acces the API documentation using 
- [`localhost:3000/api-docs`](http://localhost:3000/api-docs).

## 📄 License
The projects is under the MIT license. See the file [LICENSE](LICENSE) fore more details

---

Made with ♥ by Rafael 👋🏻


[![Linkedin Badge](https://img.shields.io/badge/-Rafael-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/rafael-mgr/)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-red?style=flat-square&link=mailto:nelsonsantosaraujo@hotmail.com)](mailto:ribeirorafaelmatehus@gmail.com)
