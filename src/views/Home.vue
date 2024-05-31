<template>
    <Header></Header>
    <Main :roles="positions"></Main>
    <Footer></Footer>
</template>

<script>
import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue'
import Footer from '@/components/Footer.vue'

export default {
    data() {

    },
    components: {
        Header,
        Main, 
        Footer
    },
}
</script>