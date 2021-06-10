
<template>
    <div>
        <h2>GENERAL TERMS OF USE , MULTIPARTS AGREEMENT</h2>
        <router-link to="/signin" class="nav-link" id="nav-link">
            Switch to signin <font-awesome-icon icon="user-plus" /> 
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
h2 {
    font-size: 1.75rem;
    margin: 2rem 1rem;
}
.nav-link {
    display: inline-block;
    color: black;
    border-bottom: 2px dotted black;
    margin-left: 2rem;
    &:hover {
        background: white;
        color: blue;
        border-radius: 0.5rem;
        border-bottom: none;
        margin-bottom: 2px;
    }
}
</style>