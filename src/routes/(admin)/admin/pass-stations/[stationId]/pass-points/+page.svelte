<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    
    export let data: PageData;
</script>


Points de passage Pour la station {$page.params.stationId}