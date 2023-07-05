<script lang="ts">

    import type { LayoutData } from "./$types";
    export let data: LayoutData;
</script>


<style>
    .hero-present {
        background-image: url(/images/gen/genbg1.jpg);        
        background-size: cover;
        height: 100vh;
    }
</style>

<div class="hero-present bs5-container-fluid">
    <slot />
</div>