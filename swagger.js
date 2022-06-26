const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Metawall",
    description: "Metawall RESTful API Docs.",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: 'header',
      name: 'Authorization',
      description: '在 JWT 前加上 Bearer 以利授權驗證。'
    }
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
    getPosts: {
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
          comments: [],
        },
      ],
    },
    getPost: {
      status: "success",
      data: {
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
        comments: [],
      },
    },
    addPost: {
      $content: "The post is created by Sihle",
      photo:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    },
    addPostSuccess: {
      status: "success",
      data: {
        user: "62b6d7a2e125d7b3aa0ea7db",
        content: "The post is created by Sihle",
        photo:
          "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        likes: [],
        _id: "62b7ec2a4cd2c43695d3cacf",
        createdAt: "2022-06-26T05:18:34.915Z",
      },
    },
    addLikeSuccess: {
      status: "success",
      data: {
        _id: "62b7bfde5958884ffb45af1e",
        user: "62b6d7a2e125d7b3aa0ea7db",
        content: "The post is created by Sihle",
        photo:
          "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        likes: ["62b6d7a2e125d7b3aa0ea7db"],
        createdAt: "2022-06-26T02:09:34.486Z",
      },
    },
    unlikeSuccess: { $ref: "#/definitions/addLikeSuccess" },
    addCommentSuccess: {
      status: "success",
      data: {
        comment: "Today is a good day today!",
        post: "62b7bfde5958884ffb45af1e",
        user: "62b6d7a2e125d7b3aa0ea7db",
        _id: "62b7f0da58344f2199dac8a5",
        createdAt: "2022-06-26T05:38:34.115Z",
      },
    },
    getPersonalPostsSuccess: {
      status: "success",
      data: [
        {
          _id: "62b7ec2a4cd2c43695d3cacf",
          user: "62b6d7a2e125d7b3aa0ea7db",
          content: "The post is created by Sihle",
          photo:
            "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
          likes: [],
          createdAt: "2022-06-26T05:18:34.915Z",
          comments: [],
        },
      ],
    },
    editPostSuccess: {
      status: "success",
      data: {
        _id: "62b7f41beaf61b673bdd3b70",
        user: "62b6d7a2e125d7b3aa0ea7db",
        content: "修改過的貼文！",
        photo:
          "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        likes: [],
        createdAt: "2022-06-26T05:52:27.804Z",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
