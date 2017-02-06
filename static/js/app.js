const appComponent = {
    template: `
    <div>
        <you :yourname="yourname"></you>
        <friend-list :friends="friends" :recenttracks="recenttracks"></friend-list>
    </div>
    `,
    data: function() {
        return {
            friends: [],
            recenttracks: {},
            yourname: this.$route.params.username
        }
    },
    mounted: function() {
        this.getFriends();

        setInterval(
            (function(scope) {
                return function() {
                    for (friend of scope.friends) {
                        getRecentTracks(friend.name, scope.recentTracksCallback, scope);
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

            httpGet(params, this).then((response) => {
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
                    getRecentTracks(friend.name, this.recentTracksCallback, this);
                }
            });
        },
        recentTracksCallback: function(username, tracks) {
            Vue.set(this.recenttracks, username, tracks);
            this.friends = this.friends.sort((a, b) => {
                var aNowPlaying = this.isNowPlaying(a);
                var bNowPlaying = this.isNowPlaying(b);
                var aName = this.getName(a).toLowerCase();
                var bName = this.getName(b).toLowerCase();
                if (aNowPlaying === bNowPlaying) return aName > bName ? 1 : aName < bName ? -1 : 0;
                if (aNowPlaying && !bNowPlaying) return -1;
                if (bNowPlaying && !aNowPlaying) return 1;
            });
        },
        isNowPlaying: function(friend) {
            var recentTracks = this.recenttracks[friend.name];
            if (recentTracks && recentTracks.length > 0) {
                if (recentTracks[0].nowplaying) {
                    return true;
                }
            }
            return false;
        },
        getName: function(friend) {
            if (friend.realname) {
                return friend.realname;
            }
            return friend.name;
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
