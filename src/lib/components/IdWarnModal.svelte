<script lang="ts">
	import { Button } from 'flowbite-svelte';
    export let redirectLink: string;
    import { showIdWarnModal } from '../../app-store';
    // your script goes here
</script>

<style>
    /* your styles go here */
</style>

<div class="text-center mt-3 p-3">
    <div class="bs5-fw-bold bs5-text-dark fs-3">
        Veillez renseigner vos informations
    </div>
    <div class="mt-3">
        <Button outline size="sm" color="red" href="{redirectLink}" on:click={() => { $showIdWarnModal = false } }>
            Go <span class="fas fa-arrow-right bs5-ms-1"></span>
        </Button>
    </div>
</div>