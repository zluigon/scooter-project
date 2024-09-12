const User = require("../src/User");

const user = new User("Joe Bloggs", "test123", 21);

// User tests here
describe("User property tests", () => {
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
});

// test login
describe("User login test", () => {
  it("should log the user in", () => {
    user.login("test123");
    expect(user.loggedIn).toBe(true);
  });

  it("should throw error w/ incorrect password", () => {
    expect(() => {
      user.login("123test").toThrow("incorrect password");
    });
  });
});
// test logout
describe("User logout test", () => {
  it("should log the user out", () => {
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});
