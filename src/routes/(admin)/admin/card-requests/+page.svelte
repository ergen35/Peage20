<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div>
    {#if data.requests}
        <p> 
            <b>
                { data.requests.length } 
            </b> 
            demandes en Attente
        </p>
    {:else}
        <p>Aucune demande en attente</p>
    {/if}
</div>