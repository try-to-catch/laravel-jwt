<template>
    <form class="w-50">
        <div class="mb-3">
        <div v-if="error" class="text-danger">{{ error }}</div>
            <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email address">
        </div>
        <div class="mb-3">
            <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Password">
        </div>
        <button @click.prevent="login" :disabled="isDisabled" type="submit" class="btn btn-primary">Submit</button>

    </form>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            user: {
                email: null,
                password: null
            },
            error: null
        }
    },
    computed: {
        isDisabled() {
            return !(this.user.email && this.user.password)
        }
    },
    methods: {
        login() {
            axios.post('/api/auth/login', this.user)
                .then((res) => {
                    localStorage.setItem('access_token', res.data.access_token)
                    this.$router.push({name: 'product.index'})
                })
                .catch((error) => {
                    this.error = error.response.data.error
                });
        }
    }
}
</script>
