const baseUrl = 'http://ws.audioscrobbler.com/2.0/?api_key=90efff8e1fb86f79142c7ca8ad1d39a1&format=json';

new Vue({
    el: "#app",
    data: {
        friends: [],
        recenttracks: {}
    },
    mounted: function() {
        this.getFriends()
    },
    methods: {
        getFriends: function() {
            var params = {
                method: 'user.getfriends',
                user: 'esalter1'
            }
            var url = this.buildUrl(params);
            this.$http.get(url).then((response) => {
                for (let friend of response.body.friends.user) {
                    console.log(friend);
                    this.friends.push({
                        name: friend.name,
                        realname: friend.realname,
                        imageUrl: friend.image[1]['#text']
                    });
                    this.getRecentTracks(friend.name);
                }
            });
        },
        getRecentTracks: function(username) {
            var params = {
                method: 'user.getRecentTracks',
                user: username,
                limit: 4
            }
            this.httpGet(params).then(response => {
                var tracks = [];
                for (let track of response.body.recenttracks.track) {
                    var trackObj = {
                        album: this.getItemValue(track.album),
                        artist: this.getItemValue(track.artist),
                        date: this.getItemValue(track.date),
                        name: track.name
                    }
                    if (track["@attr"]) {
                        trackObj['nowplaying'] = track["@attr"].nowplaying || false
                    }
                    tracks.push(trackObj);
                }
                Vue.set(this.recenttracks, username, tracks);
            })
        },
        getItemValue: function(item) {
            return item['#text']
        },
        buildUrl: function(params) {
            var queryString = '';
            for (var param in params) {
                queryString += '&' + encodeURIComponent(param) + '=' + encodeURIComponent(params[param]);
            }
            return baseUrl + queryString;
        },
        httpGet: function(params) {
            var url = this.buildUrl(params);
            return this.$http.get(url);
        }
    }
});