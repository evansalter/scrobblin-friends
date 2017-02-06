Vue.component('friend-list', {
    props: ['friends', 'recenttracks'],
    template: `
    <div>
        <ul class="collapsible popout" data-collapsible="accordion">
            <li v-for="friend in friends" :key="friend.name">
                <last-fm-user :user="friend" :tracks="recenttracks[friend.name]"></last-fm-user>
            </li>
        </ul>
        <div v-if="friends.length == 0" class="row top-margin jumbo-text">
            Follow some users on <a href="https://last.fm" target="_blank">Last.fm</a> to keep track of their listening here!
        </div>
    </div>
    `
});
