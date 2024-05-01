<template>
    <div class="component">

        <div class="card">
            <div class="card-header">
                <h3>Generate</h3>
            </div>
            <div class="card-body">
                <p>Generate a new template</p>
            </div>

        </div>

    </div>
</template>

<script setup>

const fetchData = async () => {
    const { data } = await useFetch('/api/template')
    console.log(data)
}
</script>

<style scoped>
.component {

    width: 100%;
    background-color: #f0f0f0;
}
</style>