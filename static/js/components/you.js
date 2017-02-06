Vue.component('you', {
    props: ['yourname'],
    data: function () {
        return {
            tracks: [],
            yourinfo: {}
        }
    },
    methods: {
        updateTracklist() {
            getRecentTracks(this.yourname, (_, tracks) => {
                this.tracks = tracks;
            }, this);
        }
    },
    mounted: function () {
        getUserInfo(this.yourname, (userInfo) => {
            this.yourinfo = userInfo;
        }, this);
        this.updateTracklist();

        // Auto-update tracklist
        setInterval(this.updateTracklist.bind(this), 10000);
    },
    template: `
    <ul class="collapsible popout" data-collapsible="accordion">
        <last-fm-user :user="yourinfo" :tracks="tracks"></last-fm-user>
    </ul>
    `
});
