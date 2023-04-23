<script lang="ts">
    import type { PageData } from "./$types";
    import { Card, Toggle } from "flowbite-svelte";
    
        
    export let data: PageData;
</script>


<div>
  <Card horizontal  size='lg'>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <!-- Noteworthy technology acquisitions 2021 -->
        <span class="far fa-user fa-4x"></span>
    </h5>
    <div class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight ms-2">
        <p class="mb-2">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
         <p class="mb-2">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
    </div>
  </Card>
</div>