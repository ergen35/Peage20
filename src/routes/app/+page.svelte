<script lang="ts">
    import type { PageData } from "./$types";
    import { onMount,  } from "svelte";

    export let data: PageData;


</script>

<span>
    Helloo: {JSON.stringify(data.thisPP)}
</span>
