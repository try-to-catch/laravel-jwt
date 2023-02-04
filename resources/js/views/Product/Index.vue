<template>
    <table v-if="products" class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
            <th scope="row">{{ product.id }}</th>
            <td>{{ product.name }}</td>
            <td>{{ product.price }} $</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import API from "./../../api";

export default {
    name: "Index",
    data() {
        return {
            products: null,
        };
    },
    methods: {
        getProducts() {
                API.get('/api/auth/products').then((res) => {
                    if (res) {
                        this.products = res.data.data;
                    }
                });

        }
    },
    created() {
        this.getProducts();
    }
}
</script>
