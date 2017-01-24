Vue.component('friend-list', {
    props: ['friends'],
    template: `
    <ul class="collapsible popout" data-collapsible="accordion">
        <li v-for="friend in friends">
            <div class="collapsible-header">{{ friend.name }}</div>
            <div class="collapsible-body"><p>{{ friend.realName }}</p></div>
        </li>
    </ul>
    `
});