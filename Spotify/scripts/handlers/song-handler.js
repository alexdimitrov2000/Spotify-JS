handlers.getAllSongsPage = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    let userId = userService.getCurrentUserId();

    songService.getAllSongs().then(function (res) {
        let mySongs = res.filter(s => s._acl.creator === userId);
        mySongs.forEach(s => s.isCreator = true);

        let foreignSongs = res.filter(s => s._acl.creator !== userId);
        foreignSongs.forEach(s => s.isCreator = false);

        ctx.nonUserSongs = foreignSongs;
        ctx.userSongs = songService.sortMySongs(mySongs);

        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs",
            song: "../../views/song/song.hbs"
        }).then(function () {
            this.partial("../../views/song/allSongsPage.hbs");
        }).catch(notify.handleError);
    });
}

handlers.getMySongsPage = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    let userId = userService.getCurrentUserId();

    songService.getMySongs(userId).then(function (res) {
        res.forEach(s => s.isCreator = true);
        ctx.songs = songService.sortMySongs(res);

        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs",
            song: "../../views/song/song.hbs"
        }).then(function () {
            this.partial("../../views/song/mySongsPage.hbs");
        }).catch(notify.handleError);
    });
}

handlers.getCreateSongPage = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    ctx.loadPartials({
        header: "../../views/common/header.hbs",
        footer: "../../views/common/footer.hbs"
    }).then(function () {
        this.partial("../../views/song/createSongPage.hbs");
    }).catch(notify.handleError);
}

handlers.createSong = function (ctx) {
    let { title, artist, imageURL } = { ...ctx.params };

    if (title.length < 6) {
        notify.showError("Song title must be at least 6 characters long.");
        return;
    } else if (artist.length < 3) {
        notify.showError("Song artist must be at least 3 characters long.");
        return;
    } else if (!/^(https|http):\/\//.test(imageURL)) {
        notify.showError("Song image URL must start with either 'https://' or 'http://'.");
        return;
    }

    let newSong = {
        title: title,
        artist: artist,
        imageURL: imageURL,
        likes: 0,
        listened: 0
    }

    songService.createSong(JSON.stringify(newSong)).then(function () {
        notify.showInfo("Song created successfully");
        ctx.redirect("#/allSongs");
    }).catch(notify.handleError);
}

handlers.likeSong = async function (ctx) {
    let songId = ctx.params.id;

    try {
        let song = await songService.getById(songId);
        song.likes += 1;

        songService.likeSong(song._id, JSON.stringify(song)).then(function () {
            notify.showInfo("Liked!");
            ctx.redirect("#/allSongs");
        }).catch(notify.handleError);
    } catch (err) {
        notify.handleError(err);
    }
}

handlers.listenSong = async function (ctx) {
    let songId = ctx.params.id;

    try {
        let song = await songService.getById(songId);
        song.listened += 1;

        songService.listenSong(songId, JSON.stringify(song)).then(function (res) {
            notify.showInfo(`You just listened ${res.title}`);
            ctx.redirect("#/mySongs");
        }).catch(notify.handleError);
    } catch (err) {
        notify.handleError(err);
    }
}

handlers.removeSong = function (ctx) {
    let songId = ctx.params.id;

    songService.removeSong(songId).then(function () {
        notify.showInfo("Song removed successfully!");
        ctx.redirect("#/allSongs");
    }).catch(notify.handleError);
}