import { login } from "./login.js";
import localStorageMock from "../../storage/localStorage.mock.js";

global.localStorage = localStorageMock;

const validProfileCredentials = {
  email: "workflow@stud.noroff.no",
  password: "test1234",
  avatar: "https://picsum.photos/200/300",
  accessToken: "validAccessToken",
};

const invalidProfileCredentials = {
  email: "invalidlEmail@email.com",
  password: "InvalidPassword1234",
};

const loginResponse = {
  successful: {
    ok: true,
    status: 200,
    statusText: "Login successful",
    json: () => Promise.resolve(validProfileCredentials),
  },
  failure: {
    ok: false,
    status: 404,
    statusText: "Login failed",
    json: () => Promise.resolve(invalidProfileCredentials),
  },
};

describe("Login", () => {
  beforeEach(() => {
    localStorageMock.clear("token", "profile");
  });

  it("Stores a token when provided with valid credentials", async () => {
    global.fetch = jest.fn(() => loginResponse.successful);
    await login(
      validProfileCredentials.email,
      invalidProfileCredentials.password,
    );

    const storedToken = localStorage.getItem("token");
    expect(storedToken).toBeTruthy();
    expect(storedToken.length).toBeGreaterThan(0);
    console.log("Lenght of stored token:", storedToken);
    console.log("Stored token after login:", storedToken);
  });

  it("throws an error when provided with invalid credentials and login fails", async () => {
    global.fetch = jest.fn(() => loginResponse.failure);
    await expect(
      login(
        invalidProfileCredentials.email,
        invalidProfileCredentials.password,
      ),
    ).rejects.toThrow(loginResponse.failure.statusText);

    const unStoredToken = localStorageMock.getItem("token");
    expect(unStoredToken).toBeNull();
    console.log("The stored token after failed to login login", unStoredToken);

    let errorMessage = loginResponse.failure.statusText;
    expect(typeof errorMessage).toBe("string");
    expect(errorMessage.length).toBeGreaterThan(0);
    console.log("Type of error message:", typeof errorMessage);
    console.log("Length of errorMessage:", errorMessage.length);
    console.log("Error message when login fails", errorMessage);
  });
});
