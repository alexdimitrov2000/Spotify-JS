const songService = (() => {
    function createSong(song) {
        return kinvey.post("appdata", "songs", "kinvey", song);
    }

    function getMySongs(userId) {
        return kinvey.get("appdata", `songs?query={"_acl.creator":"${userId}"}`, "kinvey");
    }

    function getAllSongs() {
        return kinvey.get("appdata", 'songs?query={}&sort={"likes": -1}', "kinvey");
    }

    function sortMySongs(mySongs) {
        return mySongs.sort((a, b) => {
            if (a.likes > b.likes) {
                return -1;
            } else if (a.likes < b.likes) {
                return 1;
            }
            
            return b.listened - a.listened;
        });
    }

    function getById(songId) {
        return kinvey.get("appdata", `songs/${songId}`, "kinvey");
    }

    function likeSong(songId, song) {
        return kinvey.update("appdata", `songs/${songId}`, "kinvey", song);
    }

    function listenSong(songId, song) {
        return kinvey.update("appdata", `songs/${songId}`, "kinvey", song);
    }

    function removeSong(songId) {
        return kinvey.remove("appdata", `songs/${songId}`, "kinvey");
    }

    return {
        createSong,
        getMySongs,
        getAllSongs,
        sortMySongs,
        getById,
        likeSong,
        listenSong,
        removeSong
    }
})();