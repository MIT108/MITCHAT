<template>
    <div class="loading-box">

        <div class="lds-dual-ring"></div>

        <div>{{ text }}</div>

    </div>
</template>

<script>
export default {
    props: {
        text: {
            required: false,
            type: String,
            default: "Loading",
        },
    },
};
</script>

<style scoped>
.loading-box {
    position: fixed;
    top: 30%;
    padding: 10px;
    left: 0px;
    right: 0px;
    width: 25%;
    margin: auto;
    background: #fff;
    text-align: center;
    /* box-shadow: 0px 0px 9px -2px #000; */
    z-index: 999;
}

.lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
}

.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #000;
    border-color: #000 transparent #000 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
