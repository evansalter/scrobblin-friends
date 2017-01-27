Vue.component('track-list', {
    props: ['tracks'],
    template: `
    <ul class="collection">
        <li v-for="track of tracks" class="collection-item avatar">
            <img v-if="track.image" v-bind:src="track.image" class="circle">
            <span class="title">
                <i v-if="track.nowplaying" class="material-icons">play_arrow</i>
                {{ track.name }}
            </span>
            <p>
                {{ track.artist }}<br>
                {{ track.date }}
            </p>
        </li>
    </ul>
    `
})