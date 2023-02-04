import router from "./router";

const api = axios.create();

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('access_token')

    if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`
    }

    return config
})

api.interceptors.response.use({}, error => {
    const accessToken = localStorage.getItem('access_token')

    if (error.response.data.message === 'Token has expired') {
        axios.post('/api/auth/refresh', {}, {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => {
                const newAccessToken = res.data.access_token

                localStorage.setItem('access_token', newAccessToken)

                error.config.headers.authorization = `Bearer ${newAccessToken}`

                return api.request(error.config)
            })
    } else if (error.response.status === 401) {
        router.push({name: 'user.login'})
    }
})

export default api
