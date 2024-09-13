const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");
const Scooter = require("../src/Scooter");

// ScooterApp tests here
const consoleLog = console.log;

// register user
describe("registerUser method tests", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });

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

  test("Register should throw generic error", () => {
    expect(scooterApp.registerUser).toThrow(Error);
  });

  afterAll(() => {
    console.log = consoleLog;
  });
});

// log in
describe("login user", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });

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

  test("Login user throw generic error", () => {
    expect(scooterApp.loginUser).toThrow(Error);
  });

  afterAll(() => {
    console.log = consoleLog;
  });
});

// log out
describe("logout user", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });

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

  test("Logout user should throw generic error", () => {
    expect(scooterApp.logoutUser).toThrow(Error);
  });

  afterAll(() => {
    console.log = consoleLog;
  });
});

// rent scooter
describe("rent scooter", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });

  const scooterApp = new ScooterApp();

  test("Scooters can be created", () => {
    const user = scooterApp.registerUser("Joe Bloogs", "test123", 21);
    const scooter = scooterApp.createScooter("station1");
    expect(scooterApp.stations["station1"][0]).toBeInstanceOf(Scooter);
  });

  test("Throws error if no station exists when creating", () => {
    expect(() => {
      scooterApp.createScooter("station4").toThrow("no such station");
    });
  });

  test("Create should throw error", () => {
    expect(scooterApp.createScooter).toThrow(Error);
  });

  test("Removes scooter from station when rented", () => {
    const user = scooterApp.registerUser("Joe Bloogss", "test123", 21);
    const scooter = scooterApp.createScooter("station1");
    scooterApp.rentScooter(scooter, user);
    expect(scooterApp.stations["station1"].length).toBe(1);
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

  test("Rent should throw a generic error", () => {
    expect(scooterApp.rentScooter).toThrow(Error);
  });

  afterAll(() => {
    console.log = consoleLog;
  });
});

// dock scooter
describe("dock scooter", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });

  const scooterApp = new ScooterApp();

  test("Docks scooter at specified station", () => {
    const user = scooterApp.registerUser("Joe Bloogs", "test123", 21);
    const scooter = scooterApp.createScooter("station1");
    scooterApp.rentScooter(scooter, user);
    scooterApp.dockScooter(scooter, "station3");
    expect(scooter.user).toBe(null);
    expect(scooterApp.stations["station3"].length).toBe(1);
  });

  test("Throws error scooter is already at station", () => {
    expect(() => {
      scooterApp
        .dockScooter(scooter, "station3")
        .toThrow("scooter already at staion");
    });
  });

  test("Docking should throw a generic error", () => {
    expect(scooterApp.dockScooter).toThrow(Error);
  });

  afterAll(() => {
    console.log = consoleLog;
  });
});

//print
describe("prints users and scooters", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });

  const scooterApp = new ScooterApp();

  test("logs users and scooters to the console", () => {
    const logSpy = jest.spyOn(console, "log");

    const user = scooterApp.registerUser("Joe Bloogs", "test123", 21);
    const scooter = scooterApp.createScooter("station1");

    scooterApp.print();

    expect(logSpy.mock.calls[2][0]).toBe("Registered Users:");

    expect(logSpy.mock.calls[3][0]).toBe(
      '{"Joe Bloogs":{"username":"Joe Bloogs","password":"test123","age":21,"loggedIn":false}}'
    );

    expect(logSpy.mock.calls[4][0]).toBe("Stations : Scooters");

    expect(logSpy.mock.calls[5][0]).toBe(
      'station1 : [{"station":"station1","user":null,"charge":100,"isBroken":false,"serial":4}]'
    );

    expect(logSpy.mock.calls[6][0]).toBe("station2 : []");

    expect(logSpy.mock.calls[7][0]).toBe("station3 : []");
  });

  afterAll(() => {
    console.log = consoleLog;
  });
});
