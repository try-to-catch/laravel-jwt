<template>
    <form class="w-50">
        <div class="mb-2">
            <label for="name" class="form-label">Name</label>
            <input v-model="user.name" type="text" class="form-control" id="name">
        </div>

        <div class="mb-2">
            <div v-if="error" class="text-danger">{{ error }}</div>
            <input v-model="user.email" type="email" class="form-control" id="email" placeholder="Email address">
        </div>

        <div class="mb-2">
            <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Password">
        </div>

        <div class="mb-2">
            <input v-model="user.password_confirmation" type="password" class="form-control" id="password_confirmation"
                   placeholder="Confirm Password">
        </div>

        <button @click.prevent="add" type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
export default {
    name: "SignUp",
    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null,
            },
            error: null
        }
    },
    methods: {
        add() {
            axios.post('/api/sign-up', this.user)
                .then((res) => {
                    localStorage.setItem('access_token', res.data.access_token)
                    this.$router.push({name: 'home'})
                    console.log(res);
                })
                .catch((error) => {
                    this.error = error.response.data.error
                });
        }
    }
}
</script>
