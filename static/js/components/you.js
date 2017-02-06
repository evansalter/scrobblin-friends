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
        <li>
            <div class="collapsible-header">
                <div class="friend-row">
                    <img v-bind:src="yourinfo.imageUrl" class="profile-image circle">
                    <span class="name">{{ yourinfo.realname ? yourinfo.realname : yourinfo.name }}</span>
                    <span class="username" v-if="yourinfo.realname">{{ yourinfo.name }}</span>
                </div>
                <span v-if="tracks.length > 0" class="latest-track">
                    <span>
                        <i v-if="tracks[0].nowplaying" class="play-arrow material-icons">play_arrow</i>
                        {{ tracks[0].name }}
                    </span>
                    <span class="artist">{{ tracks[0].artist }}</span>
                </span>
            </div>
            <div class="collapsible-body">
                <track-list v-bind:tracks="tracks"></track-list>
            </div>
        </li>
    </ul>
    `
});
