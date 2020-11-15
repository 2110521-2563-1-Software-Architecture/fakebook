const httpStatus = require("http-status");
const User = require("../../models/user");
const session = require("supertest-session");
const app = require("../../app");

let testSession = null;

let createdUserId = null;
let mockUser = {
  username: "name123123",
  email: "e@e.com",
  password: "123",
  fullname: "Test fullname",
};

const baseUrl = "/api";

beforeAll(async () => {
  testSession = session(app);
  const res = await testSession.post(`${baseUrl}/user/register`).send(mockUser);
  createdUserId = res.body._id;
});

afterAll(async () => {
  if (createdUserId) await User.findByIdAndDelete(createdUserId);
});

describe(`Create User API (POST ${baseUrl}/user/register)`, () => {
  it("should create a user if all fields is provided.", async () => {
    const res = await testSession
      .post(`${baseUrl}/user/register`)
      .send({
        username: "nametest",
        email: "test@e.com",
        password: "123",
        fullname: "Test Fullname",
      })
      .expect(httpStatus.CREATED);
    await User.findByIdAndDelete(res.body._id);
  });
  it("should not create a user if some fields are missing", async () => {
    await testSession
      .post(`${baseUrl}/user/register`)
      .send({ username: "name" })
      .expect(httpStatus.BAD_REQUEST);
  });
});

describe(`Get Current User API (GET ${baseUrl}/user/me)`, () => {
  it("should not return the current user if there is not any", async () => {
    await testSession.get(`${baseUrl}/user/me`).expect(httpStatus.UNAUTHORIZED);
  });
  it("should return the current user they are logged in", async () => {
    await testSession.post(`${baseUrl}/auth/login`).send({
      username: "name123123",
      password: "123",
    });
    await testSession.get(`${baseUrl}/user/me`).expect(httpStatus.OK);
  });
  it("should not return the password", async () => {
    await testSession.post(`${baseUrl}/auth/login`).send({
      username: "name123123",
      password: "123",
    });
    const res = await testSession.get(`${baseUrl}/user/me`);
    expect(res.body.password).toBeUndefined();
  });
});

describe(`Login (POST ${baseUrl}/user/login)`, () => {
  it("should login if the credentials are correct", async () => {
    await testSession
      .post(`${baseUrl}/auth/login`)
      .send({ username: "name123123", password: "123" })
      .expect(httpStatus.OK);
  });
  it("should not login if the credentials are incorrect", async () => {
    await testSession
      .post(`${baseUrl}/auth/login`)
      .send({ username: "name123123", password: "12345" })
      .expect(httpStatus.UNAUTHORIZED);
  });
});

describe(`Logout (POST ${baseUrl}/user/logout)`, () => {
  it("should logout the user", async () => {
    await testSession
      .post(`${baseUrl}/auth/login`)
      .send({ username: "name123123", password: "123" });
    await testSession.post(`${baseUrl}/auth/logout`);
    await testSession.get(`${baseUrl}/user/me`).expect(httpStatus.UNAUTHORIZED);
  });
});

describe(`Edit User (PUT ${baseUrl}/user/edit)`, () => {
  it("should edit user data as provided", async () => {
    await testSession
      .post(`${baseUrl}/auth/login`)
      .send({ username: "name123123", password: "123" });
    const res = await testSession
      .put(`${baseUrl}/user/edit`)
      .send({ fullname: "Test 2" });
    expect(res.body.user.fullname === "Test 2").toBeTruthy();
    expect(res.body.user.email === "e@e.com").toBeTruthy();
    await testSession
      .put(`${baseUrl}/user/edit`)
      .send({ fullname: "Test fullname" });
    await testSession.post(`${baseUrl}/auth/logout`);
  });
});
