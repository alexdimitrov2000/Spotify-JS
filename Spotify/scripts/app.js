const handlers = {};

$(() => {
    const app = Sammy("#container", function() {
        this.use("Handlebars", "hbs");

        // home page routes
        this.get("/", handlers.getHome);
        this.get("#/home", handlers.getHome);
        this.get("/index.html", handlers.getHome);

        // user pages GET routes
        this.get("#/login", handlers.getLoginPage);
        this.get("#/register", handlers.getRegisterPage);
        this.get("#/logout", handlers.logoutUser);

        // user pages POST routes
        this.post("#/login", handlers.logUser);
        this.post("#/register", handlers.registerUser);
    })

    app.run("/")
});