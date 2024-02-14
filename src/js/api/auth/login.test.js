import { login } from "./login.js";
import localStorageMock from "../../storage/localStorage.mock.js";

global.localStorage = localStorageMock;

const validEmailCredentials = "validEmail@noroff.no";
const validPasswordCredentials = "ValidPassword1234";

const validCredentials = {
  email: validEmailCredentials,
  password: validPasswordCredentials,
};

const invalidEmailCredentials = "invalidlEmail@email.com";
const invalidPassword = "InvalidPassword1234";

const invalidCredentials = {
  email: invalidEmailCredentials,
  password: invalidPassword,
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
  it("Stores a token when provided with valid credentials", async () => {
    global.fetch = jest.fn(() => loginSuccessful());
    const profileData = await login(validCredentials);
    await expect(profileData).toEqual(validCredentials);
  });

  it("throws an error when provided with invalid credentials and login fails", async () => {
    global.fetch = jest.fn(() => loginFailure());
    await expect(login(invalidCredentials)).rejects.toThrow("Login failed");
  });
});
