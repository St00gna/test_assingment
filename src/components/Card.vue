<template>
    <div class="card">
        <div class="card-header">
            <img class="card-header__img" :src="this.info.photo">
        </div>
        <div class="card-main">
            <p class="card-main__name tooltip-custom" :data-tooltip="this.info.name">
                {{ this.info.name }}
            </p>
        </div>
        <div class="card-footer">
            <p class="card-footer__position tooltip-custom" :data-tooltip="this.info.position">
                {{ this.info.position }}
            </p>
            <p class="card-footer__email tooltip-custom" :data-tooltip="this.info.email">
                {{ this.info.email }}
            </p>
            <p class="card-footer__number tooltip-custom" :data-tooltip="this.info.phone">
                {{ this.info.phone }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        info: Object
    },
}
</script>