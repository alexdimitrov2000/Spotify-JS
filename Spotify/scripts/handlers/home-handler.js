handlers.getHome = function(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    ctx.loadPartials({
        header: "../../views/common/header.hbs",
        footer: "../../views/common/footer.hbs"
    }).then(function() {
        this.partial("../../views/home/homePage.hbs")
    }).catch(function(err) {
        notify.handleError(err);
    });
}