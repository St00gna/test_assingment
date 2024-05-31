<template>
    <div class="input-group">
        <input 
            :type="this.type"
            :value="this.value" 
            class="input-group__input" 
            :class="this.value.length > 0 ? ' filled' : ''" 
            :name="this.name"
            :required="required" 
            @input="changeClass($event)"
            :id="this.id"
        >
        <label class="input-group__placeholder" :style="this.placeholderStyle">{{ this.placeholder }}</label>
    </div>
</template>

<script>
export default {
    props: ['placeholderStyle', 'type', 'value', 'name', 'placeholder', 'required', 'id'],
    methods: {
        changeClass(event) {
            // dynamic input condition
            if(event.target.value.length > 0) {
                event.srcElement.classList.add('filled')
            } else {
                event.srcElement.classList.remove('filled')
            }

            this.$emit('newText', this.name, event.target.value)
        }
    }
}
</script>