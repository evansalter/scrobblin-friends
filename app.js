const baseUrl = 'http://ws.audioscrobbler.com/2.0/?api_key=90efff8e1fb86f79142c7ca8ad1d39a1&format=json';

new Vue({
    el: "#app",
    data: {
        friends: []
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
                        realName: friend.realName
                    });
                }
            });
        },
        buildUrl: function(params) {
            var queryString = '';
            for (var param in params) {
                queryString += '&' + encodeURIComponent(param) + '=' + encodeURIComponent(params[param]);
            }
            return baseUrl + queryString;
        }
    }
});