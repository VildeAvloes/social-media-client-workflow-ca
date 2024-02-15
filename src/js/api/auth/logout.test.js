import { logout } from "./logout.js";
import localStorageMock from "../../storage/localStorage.mock.js";

global.localStorage = localStorageMock;

const profileCredentials = {
  email: "profile@test.com",
  name: "ProfileName",
  avatar: "profileAvatar.img",
  accessToken: "validAccessToken",
};

describe("Logout", () => {
  afterEach(() => {
    localStorageMock.clear();
  });

  it("removes token and profile from the localStorage", async () => {
    localStorageMock.setItem("token", profileCredentials.accessToken);
    localStorageMock.setItem("profile", JSON.stringify(profileCredentials));

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