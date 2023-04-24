<script lang="ts">
    import type { PageData } from "./$types";
    import { Card } from 'flowbite-svelte';

    export let data: PageData;
</script>


<div class="bs5-row">
    <div class="bs5-col-12">
        <Card size="sm" >
            Utilisateurs: { data.usersCount }
        </Card>

        <Card size="sm" >
            Cartes délivrées: { data.cardsCount }
        </Card>

        <Card size="sm" >
            Demandes en attentes: { data.requestsCount }
        </Card>

        <Card size="sm" >
            Agents Admin: { data.agentsCount }
        </Card>

        <Card size="sm" >
            Stations: { data.stationsCount } <br>
            Points de Passages: { data.passesCount }
        </Card>

       
    </div>
</div>



<div class="bs5-row">
    <div class="bs5-col">
        <Card size="sm" >
            Total Passages: { data.usagesCount } <br>
            Passages Par Heure: { data.agentsCount } <br>
            Passages Par Jour: { data.agentsCount }
        </Card>
    </div>
</div>