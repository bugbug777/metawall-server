const swaggerAutogen = require("swagger-autogen")({openapi: '3.0.0'});

const doc = {
  info: {
    title: "Metawall",
    description: "Metawall RESTful API Docs.",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: '使用 JWT 進行驗證！'
    },
  },
  definitions: {
    addUser: {
      $name: "sihle",
      $email: "gubug777@gmail.com",
      $password: "qwe12345",
    },
    registerSuccess: {
      status: "success",
      data: {
        name: "sihle",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjZkN2EyZTEyNWQ3YjNhYTBlYTdkYiIsImlhdCI6MTY1NjE0OTkyMywiZXhwIjoxNjU4NzQxOTIzfQ.J60uNuIFO2AIBciQbsayVjY6wCpHHYPjxMqnIIFxvsM",
      },
    },
    userLogin: {
      $email: "gubug777@gmail.com",
      $password: "qwe12345",
    },
    loginSuccess: { $ref: "#/definitions/registerSuccess" },
    authSuccess: {
      status: "success",
      data: {
        _id: "62b6d7a2e125d7b3aa0ea7db",
        name: "sihle",
        email: "gubug777@gmail.com",
        gender: "male",
        avatar: "",
        followers: [],
        following: [],
      },
    },
    updateProfile: {
      $name: "sihle",
      $gender: "male",
      avatar: "",
    },
    updateProfileSuccess: {
      status: "success",
      data: {
        _id: "62b6d7a2e125d7b3aa0ea7db",
        name: "sihle",
        email: "gubug777@gmail.com",
        gender: "male",
        avatar: "",
        followers: [],
        following: [],
      },
    },
    updatePassword: {
      $password: "qwe12345",
      $confirmedPassword: "qwe12345",
    },
    updatePasswordSuccess: { $ref: "#/definitions/registerSuccess" },
    getLikeList: {
      status: "success",
      data: [
        {
          _id: "62b7bfde5958884ffb45af1e",
          user: {
            _id: "62b6d7a2e125d7b3aa0ea7db",
            name: "sihle",
          },
          content: "The post is created by Sihle",
          photo:
            "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
          likes: ["62b6d7a2e125d7b3aa0ea7db"],
          createdAt: "2022-06-26T02:09:34.486Z",
        },
      ],
    },
    getFollowingList: {
      status: "success",
      data: [
        {
          user: {
            _id: "62b72f22f56ed60ce3d0ea02",
            name: "sihle12",
          },
          _id: "62b7bf1c5e439f74d01607e0",
          createdAt: "2022-06-26T02:06:20.467Z",
        },
      ],
    },
    getUsers: {
      status: "success",
      data: [
        {
          _id: "62b6d7a2e125d7b3aa0ea7db",
          name: "sihle",
          email: "gubug777@gmail.com",
          gender: "male",
          avatar: "",
          followers: [],
          following: [
            {
              user: "62b72f22f56ed60ce3d0ea02",
              _id: "62b7bf1c5e439f74d01607e0",
              createdAt: "2022-06-26T02:06:20.467Z",
            },
          ],
        },
      ],
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
