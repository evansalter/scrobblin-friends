Vue.component('friend-list', {
    props: ['friends', 'recenttracks'],
    template: `
    <ul class="collapsible popout" data-collapsible="accordion">
        <li v-for="friend in friends">
            <div class="collapsible-header">
                <img v-bind:src="friend.imageUrl" class="profile-image circle">
                <span class="name">{{ friend.realname ? friend.realname : friend.name }}</span>
                <span class="username" v-if="friend.realname">{{ friend.name }}</span>
                <span v-if="recenttracks[friend.name]" class="latest-track">
                    <i v-if="recenttracks[friend.name][0].nowplaying" class="material-icons">play_arrow</i>
                    {{ recenttracks[friend.name][0].name }}<br>
                    <span class="artist">{{ recenttracks[friend.name][0].artist }}</span>
                </span>
            </div>
            <div class="collapsible-body">
                <track-list v-bind:tracks="recenttracks[friend.name]"></track-list>
            </div>
        </li>
    </ul>
    `
});