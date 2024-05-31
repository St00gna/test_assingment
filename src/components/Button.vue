<template>
    <button :class="this.chooseType()" :disabled="this.type == 'disabled'">{{ msg }}</button>
</template>

<script>
export default {
    data() {

    },
    props: {
        class: String,
        msg: String,
        type: String
    },
    methods: {
        chooseType(){
            return this.class + ' button-' + this.type
        }   
    }
}
</script>