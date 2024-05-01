<template>
    <div class="products">
        <div class="product">
            <h3>Product 1</h3>
            <p>This is product 1</p>
        </div>
        <div class="product">
            <h3>Product 1</h3>
            <p>This is product 1</p>
        </div>
        <div class="product">
            <h3>Product 1</h3>
            <p>This is product 1</p>
        </div>
        <div class="product">
            <h3>Product 1</h3>
            <p>This is product 1</p>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.products {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.product {
    background-color: var(--secondary);
    color: white;
    padding: 1rem;
}
</style>