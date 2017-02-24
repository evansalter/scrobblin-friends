Vue.component('now-playing', {
    template: `
    <svg height="20px" width="20px">
        <rect v-for="i in 3" class="bar"></rect>
    </svg>
    `
});
