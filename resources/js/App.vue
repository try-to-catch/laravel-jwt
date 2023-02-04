<template>
    <div class="container">
        <nav class="d-flex flex-row justify-content-between">
            <router-link v-if="accessToken" :to="{ name: 'product.index' }">Catalog</router-link>

            <template v-if="!accessToken">
                <router-link :to="{ name: 'user.login' }">LogIn</router-link>
                <router-link :to="{ name: 'user.signup' }">Sign Up</router-link>
            </template>

            <router-link :to="{ name: 'home' }">Home</router-link>
            <a v-if="accessToken" @click.prevent="logout" href="#">LogOut</a>
        </nav>

        <main class="mt-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import api from "./api";

export default {
    name: "App",
    data() {
        return {
            accessToken: null
        }
    },
    methods: {
        setAccessToken() {
            this.accessToken = localStorage.getItem('access_token')
        },

        logout() {
            api.post('/api/auth/logout').then(() => {
                localStorage.removeItem('access_token')
                this.$router.push({name: 'home'})
            })
        }
    },

    created() {
        this.setAccessToken()
    },
    computed: {
        routerPath() {
            return this.$route.path
        }
    },
    watch: {
        routerPath() {
            this.setAccessToken()
        }
    }
}
</script>

