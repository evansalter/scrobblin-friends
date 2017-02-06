const baseUrl = 'https://ws.audioscrobbler.com/2.0/?api_key=90efff8e1fb86f79142c7ca8ad1d39a1&format=json';

getItemValue = function(item) {
    return item['#text']
}

buildUrl = function(params) {
    var queryString = '';
    for (var param in params) {
        queryString += '&' + encodeURIComponent(param) + '=' + encodeURIComponent(params[param]);
    }
    return baseUrl + queryString;
}

httpGet = function(params, vm) {
    var url = buildUrl(params);
    return vm.$http.get(url);
}

getRecentTracks = function(username, cb, vm) {
    var params = {
        method: 'user.getRecentTracks',
        user: username,
        limit: 4
    }
    httpGet(params, vm).then(response => {
        var tracks = [];
        for (let track of response.body.recenttracks.track) {
            var trackObj = {
                album: getItemValue(track.album),
                artist: getItemValue(track.artist),
                image: getItemValue(track.image[1]),
                name: track.name
            }
            if (track.date) {
                trackObj['date'] = getItemValue(track.date);
            }
            if (track["@attr"]) {
                trackObj['nowplaying'] = track["@attr"].nowplaying || false
            }
            tracks.push(trackObj);
        }
        if (tracks.length < 1) {
            tracks = null;
        }

        cb(username, tracks);
    })
}

getUserInfo = function (username, cb, vm) {
    const params = {
        method: 'user.getinfo',
        user: username
    }
    httpGet(params, vm).then(response => {
        const user = response.data.user;
        user.imageUrl = user.image[1]['#text'];
        cb(user);
    });
}
