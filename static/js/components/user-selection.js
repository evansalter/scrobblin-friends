Vue.component('user-selection', {
    template: `
    <div>
        <div v-show="error" class="row error-message z-depth-2"><i class="material-icons">error_outline</i>{{ error }}</div>
        <div class="row top-margin">
            <form v-on:submit.prevent="formSubmitted()" action="">
                <div class="input-field">
                    <input v-model="username" placeholder="Last.fm Username" id="username" type="text" class="validate">
                    <label for="username">Enter your Last.fm username:</label>
                    <button class="btn waves-effect waves-light" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
    `,
    data: function() {
        return {
            username: '',
            error: ''
        }
    },
    methods: {
        formSubmitted (){
            if (this.username) {
                router.replace('/' + this.username)
            } else {
                this.error = 'You must enter a valid Last.fm username';
            }
        }
    }
})