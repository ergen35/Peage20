<script lang="ts">
    import type { PageData } from "./$types";
    import { Card, Toggle } from "flowbite-svelte";
    
        
    export let data: PageData;
</script>


<div class='bs5-row'>
 <div class="col">
     <Card horizontal  size='lg'>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <!-- Noteworthy technology acquisitions 2021 -->
        <span class="far fa-user fa-4x"></span>
        Numéro de Carte: DAA62538-B8BD-425F-B84D-089B81949D84
    </h5>
    <div class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight ms-2">
        <p class="mb-2">
            reverse chronological order.
        </p>

    </div>
  </Card>
 </div>
</div>

<div class="bs5-row">
    <div class="bs5-col bs5-mt-5">
        <center>
            Short list of transactions
        </center>
    </div>
</div>