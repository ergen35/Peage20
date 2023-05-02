<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores"; 

  export let data: PageData;
</script>


Traiter la demande #{ $page.params.requestId } ici.
