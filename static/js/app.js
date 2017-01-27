const baseUrl = 'https://ws.audioscrobbler.com/2.0/?api_key=90efff8e1fb86f79142c7ca8ad1d39a1&format=json';

const appComponent = {
    template: `
    <friend-list v-bind:friends="friends" v-bind:recenttracks="recenttracks"></friend-list>
    `,
    data: function() {
        return {
            friends: [],
            recenttracks: {}
        }
    },
    mounted: function() {
        this.getFriends();

        setInterval(
            (function(scope) {
                return function() {
                    for (friend of scope.friends) {
                        scope.getRecentTracks(friend.name);
                    }
                }
            })(this), 10000
        );
    },
    methods: {
        getFriends: function() {
            var params = {
                method: 'user.getfriends',
                user: this.$route.params.username
            }
            var url = this.buildUrl(params);
            this.$http.get(url).then((response) => {
                if (response.body.error) {
                    this.handleError(response.body.message);
                    router.replace('/');
                    return;
                }
                for (let friend of response.body.friends.user) {
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
                        image: this.getItemValue(track.image[1]),
                        name: track.name
                    }
                    if (track.date) {
                        trackObj['date'] = this.getItemValue(track.date);
                    }
                    if (track["@attr"]) {
                        trackObj['nowplaying'] = track["@attr"].nowplaying || false
                    }
                    tracks.push(trackObj);
                }
                if (tracks.length < 1) {
                    tracks = null;
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
        },
        handleError: function(errorMessage) {
            alert(errorMessage);
        }
    }
};

const routes = [
    { 
        path: '/:username',
        component: appComponent
    },
    {
        path: '*',
        component: {
            template: `
            <user-selection></user-selection>
            `
        }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    el: "#app",
    router
}).$mount(router);