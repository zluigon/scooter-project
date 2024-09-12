const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");
const Scooter = require("../src/Scooter");

// ScooterApp tests here

// register user
describe("registerUser method tests", () => {
  const scooterApp = new ScooterApp();
  test("Should return instance of User", () => {
    const response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });

  test("Should throw error if user already exists", () => {
    expect(() => {
      scooterApp
        .registerUser("Joe Blogs", "test321", 22)
        .toThrow("already registered");
    });
  });

  test("Should throw error if user is too young", () => {
    expect(() => {
      scooterApp
        .registerUser("Joe Dirt", "test321", 17)
        .toThrow("too young to register");
    });
  });
});

// log in
describe("login user", () => {
  const scooterApp = new ScooterApp();
  test("Should login in user", () => {
    const user = scooterApp.registerUser("Joe Bloogs", "test123", 21);
    scooterApp.loginUser("Joe Bloogs", "test123");
    expect(user.loggedIn).toBe(true);
  });

  test("Should throw error if incorrect password", () => {
    expect(() => {
      scooterApp
        .loginUser("Joe Bloogs", "test321")
        .toThrow("username or password is incorrect");
    });
  });

  test("Should throw error if incorrect username", () => {
    expect(() => {
      scooterApp
        .loginUser("Joe Bloog", "test123")
        .toThrow("username or password is incorrect");
    });
  });
});

// log out
describe("logout user", () => {
  const scooterApp = new ScooterApp();
  test("Should logout user", () => {
    const user = scooterApp.registerUser("Joe Bloogs", "test123", 21);
    scooterApp.loginUser("Joe Bloogs", "test123");
    scooterApp.logoutUser("Joe Bloogs");
    expect(user.loggedIn).toBe(false);
  });

  test("Should throw error if user is not logged in", () => {
    expect(() => {
      scooterApp.logoutUser("Joe Bloogs").toThrow("no such user in logged in");
    });
  });
});

// rent scooter
describe("rent scooter", () => {
  const scooterApp = new ScooterApp();
  const user = scooterApp.registerUser("Joe Bloogs", "test123", 21);
  const scooter = scooterApp.createScooter("station1");

  test("Scooters can be created", () => {
    expect(scooterApp.stations["station1"][0]).toBeInstanceOf(Scooter);
  });

  test("Throws error if no station exists when creating", () => {
    expect(() => {
      scooterApp.createScooter("station4").toThrow("no such station");
    });
  });

  test("Removes scooter from station when rented", () => {
    scooterApp.rentScooter(scooter, user);
    expect(scooterApp.stations["station1"].length).toBe(0);
    expect(scooter.user).toEqual(user);
  });

  test("Throws error is scooter is already rented", () => {
    const user2 = scooterApp.registerUser("Joe Blogs", "test321", 22);
    expect(() => {
      scooterApp
        .rentScooter(scooter, user2)
        .toThrow("scooter is already rented");
    });
  });
});

// dock scooter
describe("dock scooter", () => {
  const scooterApp = new ScooterApp();
  const user = scooterApp.registerUser("Joe Bloogs", "test123", 21);
  const scooter = scooterApp.createScooter("station1");

  test("Docks scooter at specified station", () => {
    scooterApp.rentScooter(scooter, user);
    scooterApp.dockScooter(scooter, "station3");
    expect(scooter.user).toBe(null);
    expect(scooterApp.stations["station3"].length).toBe(1);
  });

  test("Throws error is scooter is already at station", () => {
    expect(() => {
      scooterApp
        .dockScooter(scooter, "station3")
        .toThrow("scooter already at staion");
    });
  });
});

//print
describe("prints users and scooters", () => {
  const scooterApp = new ScooterApp();
  const user = scooterApp.registerUser("Joe Bloogs", "test123", 21);
  const scooter = scooterApp.createScooter("station1");

  test("logs users and scooters to the console", () => {
    const logSpy = jest.spyOn(console, "log");

    scooterApp.print();

    expect(logSpy.mock.calls[0][0]).toBe("Registered Users:");

    expect(logSpy.mock.calls[1][0]).toBe(
      '{"Joe Bloogs":{"username":"Joe Bloogs","password":"test123","age":21,"loggedIn":false}}'
    );

    expect(logSpy.mock.calls[2][0]).toBe("Stations : Scooters");

    expect(logSpy.mock.calls[3][0]).toBe(
      'station1 : [{"station":"station1","user":null,"charge":100,"isBroken":false,"serial":3}]'
    );

    expect(logSpy.mock.calls[4][0]).toBe("station2 : []");

    expect(logSpy.mock.calls[5][0]).toBe("station3 : []");
  });
});
