const fs = require("fs");

module.exports = function (app) {
  app.get("/blog", async (req, res) => {
    const blogData = fs.readFileSync("./blog.json", "utf8");
    const blog = JSON.parse(blogData);
    res.json({ data: blog });
  });
};
