<script lang="ts">
    import type { PageData } from './$types';
    import { Button } from 'flowbite-svelte';
    
    export let data: PageData;
</script>

<div class="bs5-row">
    <div class="bs5-offset-10 bs5-col-2 bs5-text-end">
        <Button color="dark">
            <span class="fas fa-plus-square bs5-me-2"></span> Ajouter
        </Button>
    </div>
</div>

<div class="bs5-row">
    Toutes les stations
</div>