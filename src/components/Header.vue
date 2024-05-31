<template>
    <header class="header">
        <img class="header__img logo" src="../assets/images/Logo.svg">
        <div class="header_button-group button-group">
            <Button class="header_button-group__button button" msg="Users" type="yellow" @click="openUsers"></Button>
            <Button class="header_button-group__button button" msg="Sign up" type="yellow" @click="signUpAnchor"></Button>
        </div>
        <!-- 2nd, default option -->
        <!-- 
            <button class="header__button button button-yellow" @click="openUsers">Users</button>
            <button class="header__button button button-yellow" @click="signUp">Sign up</button> 
        -->
        <!-- 2nd, default option -->
    </header>
</template>

<script>
import Button from './Button.vue'

export default {
    data() {

    },
    components: {
        Button
    },
    methods: {
        signUpAnchor() {
            location.hash = 'post-section'
        },
        openUsers() {
            location.hash = 'get-section'
        }
    }
}
</script>