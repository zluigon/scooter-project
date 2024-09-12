const Scooter = require("../src/Scooter");
const User = require("../src/User");

const scooter = new Scooter();
const user = new User("Joe Bloggs", "test123", 21);

// typeof scooter === object
describe("scooter object", () => {
  test("Scooter class should create Scooter instance", () => {
    expect(scooter).toBeInstanceOf(Scooter);
  });
});

// Method tests
describe("scooter methods", () => {
  // tests here!

  const consoleLog = console.log;

  beforeAll(() => {
    console.log = jest.fn();
  });

  // rent method
  it("should assign user to scooter", () => {
    scooter.rent(user);
    expect(scooter.user).toEqual(user);
    expect(scooter.station).toBe(null);
  });

  // dock method
  it("should update station and remove user", () => {
    scooter.dock("s1");
    expect(scooter.station).toBe("s1");
    expect(scooter.user).toBe(null);
  });

  // requestRepair method
  it("should repair the scooter", async () => {
    scooter.isBroken = true;
    await scooter.requestRepair();
    expect(scooter.isBroken).toBe(false);
  }, 6000);

  // charge method
  it("should charge the scooter", () => {
    jest.useFakeTimers();
    scooter.charge = 0;
    scooter.recharge();
    jest.advanceTimersByTime(5000);
    expect(scooter.charge).toBe(100);
  });

  afterAll(() => {
    console.log = consoleLog;
  })
});
