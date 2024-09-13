const User = require("../src/User");

const user = new User("Joe Bloggs", "test123", 21);

const consoleLog = console.log;

// User tests here
describe("User property tests", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });
  const user = new User("Joe Bloggs", "test123", 21);
  // test username
  test("username should be a string", () => {
    expect(typeof user.username).toBe("string");
  });
  // test password
  it("password should be a string", () => {
    expect(typeof user.password).toBe("string");
  });
  // test age
  it("age should be a number", () => {
    expect(typeof user.age).toBe("number");
  });

  afterAll(() => {
    console.log = consoleLog;
  });
});

// test login
describe("User login test", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });
  const user = new User("Joe Bloggs", "test123", 21);

  it("should log the user in", () => {
    user.login("test123");
    expect(user.loggedIn).toBe(true);
  });

  it("should throw error w/ incorrect password", () => {
    expect(() => {
      user.login("123test").toThrow("incorrect password");
    });
  });

  it("should throw an error w/o input", () => {
    expect(() => {
      user.login().toThrow("incorrect password");
    });
  });

  it("should throw error", () => {
    expect(user.login).toThrow(Error);
  });

  afterAll(() => {
    console.log = consoleLog;
  });
});

// test logout
describe("User logout test", () => {
  const user = new User("Joe Bloggs", "test123", 21);
  it("should log the user out", () => {
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});
