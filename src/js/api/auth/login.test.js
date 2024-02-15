import { login } from "./login.js";
import localStorageMock from "../../storage/localStorage.mock.js";

global.localStorage = localStorageMock;

const validCredentials = {
  email: "validEmail@noroff.no",
  password: "ValidPassword1234",
  avatar: "validAvatar.img",
  accessToken: "validAccessToken",
};

const invalidCredentials = {
  email: "invalidlEmail@email.com",
  password: "InvalidPassword1234",
};

function loginSuccessful() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "Login successful",
    json: () => Promise.resolve(validCredentials),
  });
}

function loginFailure() {
  return Promise.resolve({
    ok: false,
    status: 404,
    statusText: "Login failed",
    json: () => Promise.resolve(invalidCredentials),
  });
}

describe("Login", () => {
  //   beforeEach(() => {
  //     localStorageMock.clear();
  //   });

  it("Stores a token when provided with valid credentials", async () => {
    global.fetch = jest.fn(() => loginSuccessful());
    await login(validCredentials.email, validCredentials.password);

    const storedToken = localStorage.getItem("token");
    expect(storedToken).toBeTruthy();
    console.log("Stored token after login:", storedToken);
  });

  it("throws an error when provided with invalid credentials and login fails", async () => {
    global.fetch = jest.fn(() => loginFailure());
    await expect(
      login(invalidCredentials.email, invalidCredentials.password),
    ).rejects.toThrow("Login failed");

    const unStoredToken = localStorageMock.getItem("token");
    expect(unStoredToken).toBeNull();
    console.log("The stored token after failed to login login", unStoredToken);
  });
});
