import { logout } from "./logout.js";
import localStorageMock from "../../storage/localStorage.mock.js";

global.localStorage = localStorageMock;

const validProfileCredentials = {
  email: "workflow@stud.noroff.no",
  password: "test1234",
  avatar: "https://picsum.photos/200/300",
  accessToken: "validAccessToken",
};

describe("Logout", () => {
  afterEach(() => {
    localStorageMock.clear();
  });

  it("removes token and profile from the localStorage", async () => {
    localStorageMock.setItem("token", validProfileCredentials.accessToken);
    localStorageMock.setItem(
      "profile",
      JSON.stringify(validProfileCredentials),
    );

    console.log("The token after login:", localStorageMock.getItem("token"));
    console.log(
      "The profile is logged in:",
      localStorageMock.getItem("profile"),
    );

    logout();

    expect(localStorageMock.getItem("token")).toBeNull();
    expect(localStorageMock.getItem("profile")).toBeNull();

    console.log(
      "The token is removed after logout:",
      localStorageMock.getItem("token"),
    );
    console.log(
      "The profile is logged out:",
      localStorageMock.getItem("profile"),
    );
  });
});
