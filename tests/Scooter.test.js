const Scooter = require("../src/Scooter");
const User = require("../src/User");

const consoleLog = console.log;

// typeof scooter === object
describe("scooter object", () => {
  const scooter = new Scooter("station1");
  test("Scooter class should create Scooter instance", () => {
    expect(scooter).toBeInstanceOf(Scooter);
  });

  test("Should assign propeties", () => {
    expect(scooter.station).toBe("station1");
    expect(scooter.user).toBe(null);
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
    expect(scooter.serial).toEqual(1);
  });
});

// Method tests
describe("scooter methods", () => {
  // tests here!

  beforeAll(() => {
    console.log = jest.fn();
  });

  const scooter = new Scooter("station1");
  const scooter2 = new Scooter("station1");
  const user = new User("Joe Bloggs", "test123", 21);

  // rent method
  it("should assign user to scooter", () => {
    scooter.rent(user);
    expect(scooter.user).toEqual(user);
    expect(scooter.station).toBe(null);
  });

  it("Rent should throw an error", () => {
    scooter2.charge = 18;
    expect(() => {
      scooter2.rent(user);
    }).toThrow("scooter needs to charge or scooter needs repair");
  });

  it("Rent should throw generic error", () => {
    expect(scooter2.rent).toThrow(Error);
  });

  // dock method
  it("should update station and remove user", () => {
    scooter.dock("station2");
    expect(scooter.station).toBe("station2");
    expect(scooter.user).toBe(null);
  });

  // requestRepair method
  it("should repair the scooter", async () => {
    scooter.isBroken = true;
    await scooter.requestRepair();
    expect(scooter.isBroken).toBe(false);
  }, 6000);

  // charge method
  it("should charge the scooter", async () => {
    jest.useFakeTimers();
    scooter.charge = 0;
    scooter.recharge();

    expect(scooter.charge).toBe(0);
    jest.advanceTimersByTime(1000);
    expect(scooter.charge).toBe(20);
    jest.advanceTimersByTime(2000);
    expect(scooter.charge).toBe(60);
    jest.advanceTimersByTime(2000);
    expect(scooter.charge).toBe(100);

    jest.advanceTimersByTime(5000);
    expect(scooter.charge).toBe(100);
    
    jest.useRealTimers();
  });

  afterAll(() => {
    console.log = consoleLog;
  });
});
