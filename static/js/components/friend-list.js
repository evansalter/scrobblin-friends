Vue.component('friend-list', {
    props: ['friends', 'recenttracks'],
    template: `
    <div>
        <ul class="collapsible popout" data-collapsible="accordion">
            <li v-for="friend in friends" :key="friend.name">
                <div class="collapsible-header">
                    <div class="friend-row">
                        <img v-bind:src="friend.imageUrl" class="profile-image circle">
                        <span class="name">{{ friend.realname ? friend.realname : friend.name }}</span>
                        <span class="username" v-if="friend.realname">{{ friend.name }}</span>
                    </div>
                    <span v-if="recenttracks[friend.name]" class="latest-track">
                        <span>
                            <i v-if="recenttracks[friend.name][0].nowplaying" class="play-arrow material-icons">play_arrow</i>
                            {{ recenttracks[friend.name][0].name }}
                        </span>
                        <span class="artist">{{ recenttracks[friend.name][0].artist }}</span>
                    </span>
                </div>
                <div class="collapsible-body">
                    <track-list v-bind:tracks="recenttracks[friend.name]"></track-list>
                </div>
            </li>
        </ul>
        <div v-if="friends.length == 0" class="row top-margin jumbo-text">
            Follow some users on <a href="https://last.fm" target="_blank">Last.fm</a> to keep track of their listening here!
        </div>
    </div>
    `
});