module.exports = {
  hrPool: {
    user: process.env.HR_USER, // || "myuser",
    host: process.env.HR_HOST || "192.168.100.16", //"postgres",
    database: process.env.HR_DATABASE || "myapp",
    password: process.env.HR_PASSWORD || "passwd",
    port: process.env.HR_PORT || 5432,
    ssl: false,
  },
};

/*
module.exports = {
  hrPool: {
    user: "myuser",
    host: "192.168.100.16", //"postgres",
    database: "myapp",
    password: "passwd",
    port: 5432,
    ssl: false,
  },
};
*/
