Vue.component('last-fm-user', {
    props: ['user', 'tracks'],
    template: `
    <li>
        <div class="collapsible-header">
            <div class="friend-row">
                <img :src="user.imageUrl" class="profile-image circle">
                <span class="name">{{ user.realname ? user.realname : user.name }}</span>
                <span class="username" v-if="user.realname">{{ user.name }}</span>
            </div>
            <span v-if="tracks && tracks.length > 0" class="latest-track">
                <span>
                    <now-playing v-if="tracks[0].nowplaying"></now-playing>
                    {{ tracks[0].name }}
                </span>
                <span class="artist">{{ tracks[0].artist }}</span>
            </span>
        </div>
        <div class="collapsible-body">
            <track-list :tracks="tracks"></track-list>
        </div>
    </li>`
});
