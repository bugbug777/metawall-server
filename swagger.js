const swaggerAutogen = require("swagger-autogen")();

// host: "https://enigmatic-thicket-59722.herokuapp.com",
// schemes: ["https", "http"],
const doc = {
  info: {
    title: "Metawall",
    description: "Metawall RESTful API Docs.",
  },
  host: "localhost:3000",
  schemes: ["http"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "在 JWT 前加上 Bearer 以利授權驗證。",
    },
  },
  definitions: {
    // parameters
    registerParams: {
      $name: "sihle",
      $email: "gubug777@gmail.com",
      $password: "qwe12345",
    },
    signinParams: {
      $email: "gubug777@gmail.com",
      $password: "qwe12345",
    },
    updateProfileParams: {
      $name: "sihle",
      $gender: "male",
      avatar: "",
    },
    updatePasswordParams: {
      $password: "qwe12345",
      $confirmedPassword: "qwe12345",
    },
    postParams: {
      $content: "The post is created by Sihle",
      photo:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    },
    // Responses
    userSchema: {
      status: true,
      user: {
        _id: "62bbaacc9e32281c5465543a",
        name: "Sihle",
        avatar: "https://i.imgur.com/cowpqg2.jpg",
      },
    },
    userTokenSchema: {
      status: true,
      user: {
        name: "sihle",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjZkN2EyZTEyNWQ3YjNhYTBlYTdkYiIsImlhdCI6MTY1NjE0OTkyMywiZXhwIjoxNjU4NzQxOTIzfQ.J60uNuIFO2AIBciQbsayVjY6wCpHHYPjxMqnIIFxvsM",
      },
    },
    profileSchema: {
      status: true,
      user: {
        _id: "62b6d7a2e125d7b3aa0ea7db",
        name: "sihle",
        email: "gubug777@gmail.com",
        gender: "male",
        avatar: "",
        followers: [],
        following: [],
      },
    },
    postsSchema: {
      status: true,
      posts: [
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
    followingUsersSchema: {
      status: true,
      users: [
        {
          user: {
            _id: "62bdff925ca6daaa1dad266c",
            name: "Laura",
            avatar: "https://i.imgur.com/uFT7s7e.jpg",
          },
          _id: "62be026a5ca6daaa1dad2754",
          createdAt: "2022-06-30T20:07:06.400Z",
        },
      ],
    },
    usersSchema: {
      status: true,
      users: [
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
    postsSchema: {
      status: true,
      posts: [
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
    postSchema: {
      status: true,
      post: {
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
    newPostSchema: {
      status: true,
      post: {
        user: "62bbaacc9e32281c5465543a",
        content: "The post is created by Sihle",
        imageUrl:
          "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        likes: [],
        _id: "62be663230cbd1503221a0aa",
        createdAt: "2022-07-01T03:12:50.104Z",
      },
    },
    likePostSchema: {
      status: true,
      post: {
        _id: "62b7bfde5958884ffb45af1e",
        user: "62b6d7a2e125d7b3aa0ea7db",
        content: "The post is created by Sihle",
        photo:
          "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        likes: ["62b6d7a2e125d7b3aa0ea7db"],
        createdAt: "2022-06-26T02:09:34.486Z",
      },
    },
    commentSchema: {
      status: true,
      data: {
        comment: "Today is a good day today!",
        post: "62b7bfde5958884ffb45af1e",
        user: "62b6d7a2e125d7b3aa0ea7db",
        _id: "62b7f0da58344f2199dac8a5",
        createdAt: "2022-06-26T05:38:34.115Z",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
