# Cypress test project
This project was created for Knowde to show cypress test automation 
## Setup
1. git clone https://github.com/maciejStruminski12/Knowde.git
2. cd to `Knowde` folder and run `npm install`
## Run test
1 You can open Cypres GUI

* The long way with the full path

   `./node_modules/.bin/cypress open`
* Or by using npx (for nmp >v5.2)

   `npx cypress open`
   
 2 You can run test from command line
 
 * `./node_modules/.bin/cypress run` or `npx cypress run` (for nmp >v5.2)

## Information

Test are located in `cypress/integration` folder

Custom commands are located in `cypress/support` folder

Fixed set of data are located in `cypress/fixtures` folder (.json file)

`cypress.json` - Main config file where default behavior of Cypress can be modified.
