![logo](https://user-images.githubusercontent.com/44912347/202296600-c5f247d6-9616-49db-88f0-38433429d781.jpg)

# Scooter Project
You are a Software Engineer for the city of Baltimore, and you have been asked to design, test, and code the backend for an Electric Scooter Hire app system. Since the city already has front-end developers, you won’t need to design the UI, just the back-end!

In this challenge, you will be required to 
1. Create the UML Diagrams for the app
2. Write tests for your Classes, including their properties and methods
3. Build the system using JavaScript Classes

## Getting Started
```bash
npm install
```

## Running Tests
To run tests in "watch" mode
```bash
npm test
```

To get a coverage report
```bash
npm run coverage
```

## Projects Specifications
The company has provided you with some specs that the front end developers want for their Scooter App. **You should refer back to this page as you build your UML design and code.**

### Class: Scooter
This class represents the individual scooters that users will rent from stations. 

When each Scooter object is created in the program (i.e. the constructor), it should be initialized with the following properties:
- Station the scooter is checked out from
- User that checked out the Scooter

Each Scooter should have the following properties
- `station`: populated by the argument of station 
- `user`: populated by the argument of user 
- `serial`: a random number from 1 to 1000
- `charge`: a random number from 1 to 100 
- `isBroken`: set to false 
- `docked`: set to true

Each Scooter should have the following methods
- `rent()`
    - If `isBroken` is set to `false`, and charge is > 20, then set `docked` to `false` and log to the console, `“Enjoy the ride!”`.
    - If charge is <= 20, throw an error that messages: `“Scooter low on battery, please charge.”`
    - If none of these are applicable, you should throw an error that states that: `“Scooter is broken, please send a repair request.”`
- `dock(station)`
    - Sets the station property of the Scooter to the argument passed in
        - If no argument is passed in, you should throw an error: `“Docking station required!”`
    - Set `docked` to `true`
    - Set `user` to an empty string
- `recharge()`
    - This method should update the Scooter’s charge to 100.

- `requestRepair()`
    - Uses a `setInterval` timer to log a message that the repair has been complete
    - Sets `isBroken` to `false` after the repair has been complete.

**NOTE**: The `recharge()` and `requaestRepair()` methods require that you deliver a message after a certain interval of time. In JavaScript, to simulate waiting for a scooter to charge you can make use of the `setTimeout` call for example in `src/Scooter.js`:
```js
async charge() {
    console.log('Starting charge');
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100

    console.log('Charge complete');   
}
```

The associated Jest test in `tests/Scooter.test.js` will look as follows:
```javascript
test("charge", async () => {
    const scooter = new Scooter();
    await scooter.charge(); // we need to wait for the charge!
    expect(newScooter.charge).toBe(100);
});
```

## Class: User
When each User object is created in the program (i.e. the constructor), it should be initialized with the following properties:
- `username`
- `password`
- `age`

Each User should have the following properties
- `username`: populated by the argument of username
- `password`: populated by the argument of password
- `age`: populated by the argument of age

## Class: ScooterApp
Should include **NO** parameters in the constructor

Each ScooterApp should include the following properties 
- `stations`: This should contain the stations that the Scooter can be checked out from. **One possible approach**: This can be an object or an array. One possibility is to make it an object with the following keys: Manhattan, Brooklyn, Queens, Bronx, StatenIsland.  Each key should have a value of an empty array.
- `registeredUsers`: populated by an empty object or array 
- **BONUS**: A Static property called scooterSessions which should hold an empty array
- **BONUS**: Each time a ScooterApp object is created/instantiated, it should automatically be added to the scooterSessions array 

Each ScooterApp should include the following methods 
- `register(user)`
    - Check to see if the user is not already registered, if they ARE, log to the console that they are `“already registered!”`. 
    - Check to see if the user is older than 17, if they ARE NOT, log to the console that they are `“too young to register!”`
    - **ONLY** if both of these checks pass: 
        - Add the user to the `registeredUsers` object
        - The object key should be the user’s username 
        - This object key should contain the following key value pairs: 
            - `password`: the user’s password 
            `age`: the user’s age 
            `loggedIn`: false 
            `accountChange`: 0 
        - Finally, log to the console that the ”user has been registered”. 

- `logIn(username, password)`
    - Check to see that the user is in the `registeredUsers` object, and then check to see that their password or matches the password argument, if either of these matches are false, throw an error: `“Username or password is incorrect.”`
    - If the previous checks pass, mark the correct user in the `registeredUsers` object `loggedIn` property to `true`.
    - Log to the console that the user has logged in successfully.

- `addScooter(location, scooter)`
    - **NOTE**: location is a string and scooter is a Scooter object 
    - Set the Scooter’s `station` property to the `location` argument
    - Add the `scooter` argument to the stations 

- `removeScooter(scooterToRemove)`
    - **NOTE**: `scooterToRemove` is a Scooter object 
    - Identify the `scooterToRemove`’s value for `serial` number 
    - **BONUS**: Use this serial number to remove the Scooter object from the correct location list 
        - **NOTE**: You’ll need to do some digging here into nested objects and/or lists
    - Log to the console that the scooter has successfully been removed 
    - Throw an error if the scooter serial number is not located - this means that the `scooterToRemove` object has not previously been added.
