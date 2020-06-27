var path = require("path")

module.exports = app => {

    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
      });
    
      // If no matching route is found default to home page
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      })

}