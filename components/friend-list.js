Vue.component('friend-list', {
    props: ['friends'],
    template: `
    <ul class="collapsible popout" data-collapsible="accordion">
        <li v-for="friend in friends">
            <div class="collapsible-header">
                <img v-bind:src="friend.imageUrl" class="profile-image circle">
                <span class="name">{{ friend.realname ? friend.realname : friend.name }}</span>
                <span class="username" v-if="friend.realname">{{ friend.name }}</span>
            </div>
            <div class="collapsible-body"><p>{{ friend.realName }}</p></div>
        </li>
    </ul>
    `
});