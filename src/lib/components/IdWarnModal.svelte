<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
    export let redirectLink: string;
    // your script goes here
</script>

<style>
    /* your styles go here */
</style>

<Card size="sm">
    <div class="text-center">
        <span>Veuillez renseigner vos infos</span> <br>
        <Button size="sm" color="red" href="{redirectLink}">
            Go!
        </Button>
    </div>
</Card>