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

        // song pages GET routes
        this.get("#/allSongs", handlers.getAllSongsPage);
        this.get("#/mySongs", handlers.getMySongsPage);
        this.get("#/createSong", handlers.getCreateSongPage);
        this.get("#/like/:id", handlers.likeSong);
        this.get("#/listen/:id", handlers.listenSong);
        this.get("#/remove/:id", handlers.removeSong);

        // song pages POST routes
        this.post("#/createSong", handlers.createSong);
    });

    app.run("/")
});