<script lang="ts">
    import type { PageData } from "./$types";
    import { Card, Button } from 'flowbite-svelte';
    import { onMount } from "svelte";


    //TODO: Install ChartJs as npm package
    // onMount(() => {
    //     var barChartData = {
    //         labels : ["Jan","Feb","Mar","Apr","May","Jun","jul"],
    //         datasets : [
    //             {
    //                 fillColor : "#FC8213",
    //                 data : [65,59,90,81,56,55,40]
    //             },
    //             {
    //                 fillColor : "#337AB7",
    //                 data : [28,48,40,19,96,27,100]
    //             }
    //         ]

    //     };
    //     new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);
    // })

    export let data: PageData;
</script>


<div class="bs5-row">
    <div class="bs5-col-4 mb-4">
        <Card color="purple" href="/admin/users/list" >
            <div class="bs5-row">
                <div class="bs5-col-8">
                    <h3 class="bs5-fs-1">{ data.usersCount }</h3>
                    <h4 class="bs5-fs-4">Utilisateurs</h4>
                    <p style="font-size: 13px;">{ data.usersCount } actif(s)</p>
                </div>
                <div class="bs5-col-4 text-center bs5-my-auto bs5-bg-white p-2 bs5-rounded-circle" style="height:90px; width: 90px;">
                    <i class="fas fa-users fa-3x text-blue-800 mt-2"> </i>
                </div>
            </div>
        </Card>
    </div>

    <div class="bs5-col-4 mb-4">
        <Card color="blue" href="/admin/pass-cards/list">
            <div class="bs5-row">
                <div class="bs5-col-8">
                    <h3 class="bs5-fs-1"> { data.cardsCount }</h3>
                    <h4 class="bs5-fs-4">Cartes Délivrées</h4>
                    <p style="font-size: 13px;">{ data.cardsCount } actives(s)</p>
                </div>
                <div class="bs5-col-4 text-center bs5-my-auto bs5-bg-white p-2 bs5-rounded-circle" style="height:90px; width: 90px;">
                    <i class="fas fa-id-card fa-3x text-indigo-800 mt-2"> </i>
                </div>
            </div>
        </Card>
    </div>

    <div class="bs5-col-4 mb-4">
        <Card color="yellow" href="/admin/card-requests">
            <div class="bs5-row">
                <div class="bs5-col-8">
                    <h3 class="bs5-fs-1">{ data.requestsCount }</h3>
                    <h4 class="bs5-fs-4">Demandes</h4>
                    <p style="font-size: 13px;">2 ren.  |  6 nouv</p>
                </div>
                <div class="bs5-col-4 text-center bs5-my-auto bs5-bg-white p-2 bs5-rounded-circle" style="height:90px; width: 90px;">
                    <i class="fas fa-list-alt fa-3x text-yellow-800 mt-2"> </i>
                </div>
            </div>
        </Card>
    </div>
</div>

<div class="bs5-row">

    <div class="bs5-col-2">
        <Card size="sm" color="green" padding="none" class="bs5-rounded-0">
            <div class="text-center">
                <span class="bs5-d-block bs5-fs-2">{data.stationsCount}</span>
                <span class="bs5-d-block">
                    Sations
                </span>
                <hr>
                <span class="bs5-d-block bs5-fs-6">
                    { data.passesCount } Pts. Pass.
                </span>
            </div>
        </Card>
    </div>

    <div class="bs5-col-2">
        <Card size="sm" color="red" padding="none" class="bs5-rounded-0">
            <div class="text-center">
                <span class="bs5-d-block bs5-fs-2">{data.usagesCount}</span>
                <span class="bs5-d-block">
                    Passages
                </span>
                <hr>
                <span class="bs5-d-block bs5-fs-6">
                    Total
                </span>
            </div>
        </Card>
    </div>

    <div class="bs5-col-2">
        <Card size="sm" color="dark" padding="none"  class="bs5-rounded-0">
            <div class="text-center">
                <span class="bs5-d-block bs5-fs-2">{data.usagesCount}</span>
                <span class="bs5-d-block">
                    Passages
                </span>
                <hr>
                <span class="bs5-d-block bs5-fs-6">
                    Aujourd'hui
                </span>
            </div>
        </Card>
    </div>

    <div class="bs5-col-2">
        <Card size="sm" color="dark" padding="none"  class="bs5-rounded-0">
            <div class="text-center">
                <span class="bs5-d-block bs5-fs-2">{data.usagesCount}</span>
                <span class="bs5-d-block">
                    Passages
                </span>
                <hr>
                <span class="bs5-d-block bs5-fs-6">
                    Ce Mois
                </span>
            </div>
        </Card>
    </div>

     <div class="bs5-col-4">
        <Card size="sm" color="navbar" padding="none"  class="bs5-rounded-0">
            <div class="text-center">
                <span class="bs5-d-block bs5-fs-2">{1 + data.agentsCount}</span>
                <span class="bs5-d-block">
                    Agent(s)
                </span>
                <hr>
                <span class="bs5-d-block bs5-fs-6">
                    Autres Statistiques
                </span>
            </div>
        </Card>
    </div>

</div>

<hr class="bs5-mt-4">

<div class="bs5-row">
    <div class="bs5-col-12">
       <div class="text-center bs5-mt-2">
            <Button color="dark" size="lg" outline class="bs5-rounded-0"> 
                <span class="fas fa-chart-bar me-2 fa-2x"></span>
                <span class="bs5-fs-4">Voir toutes les Stats.</span>
            </Button>
       </div>
    </div>
</div>

<!-- TODO: waiting for chartJS /|\ <canvas id="bar" height="300" width="400" style="width: 400px; height: 300px;"></canvas> -->