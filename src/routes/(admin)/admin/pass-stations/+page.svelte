<script lang="ts">
    import type { PageData } from './$types';
    import { Button, Modal, Input, Card, Spinner } from 'flowbite-svelte';
    import * as Joi from 'joi'
    // import { PassStation } from '$lib/data-sources';

    export let data: PageData;

    let addStationModalOpened = false;
    let stationDataName =  '';
    let stationDataPrice = 0;
    let isRegisteringStation = false;

    const schema = Joi.object({
        name: Joi.string().min(6),
        price: Joi.number().positive().greater(99)        
    })

    async function addStation()
    {
        isRegisteringStation = true;
        const validationResult = schema.validate({ name: stationDataName, price: stationDataPrice  })
        if(validationResult.error)
        {
            alert("Veillez fournir toutes les informations dans un format correct.")
            isRegisteringStation = false;
            return;
        }

        const response = await fetch("/api/stations/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: stationDataName, price: stationDataPrice })
        })

        if(response.ok)
        {
            const stationData = await response.json();
            data.stations.push({ id: stationData.id, price: stationData.price, name: stationData.name, passPoints: [] });
            data.stations = data.stations;
        }
        else
        {
            alert("La station n'a pas pu être enregistrée")
        }

        isRegisteringStation = false;
    }

    async function deleteStation(stationId: string)
    {
        const response = await fetch('/api/stations/delete?stationId=' + stationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.ok)
        {
            const sIndex = data.stations.findIndex(s => s.id == stationId);
            if(sIndex >= 0)
            {
                data.stations.splice(sIndex, 1);
                data.stations = data.stations; 
            }
        }
        else
        {
            alert("La ressource n'a pas été supprimée, veuillez recommencer")
        }
    }
</script>

<div class="bs5-row">
    <div class="bs5-col-10 bs5-text-center">
        <span style="font-size: 35px;" class="bs5-fw-bold">
            <span class="fas fa-compass bs5-me-2"></span> Stations
        </span>
    </div>
    <div class="bs5-col-2 bs5-text-end">
        <Button color="dark" on:click={() => { addStationModalOpened = true }}>
            <span class="fas fa-plus-square bs5-me-2"></span> Ajouter
        </Button>
    </div>

    <hr class="bs5-mb-3 bs5-mt-2">
</div>

<div class="bs5-row">
   {#each data.stations as station}
        <div class="bs5-col-4 bs5-mt-3">
            <Card color="dark">
                <div class="">
                    <b> Id:</b> {station.Id}
                 </div>
                <div class="">
                   <b> Nom:</b> {station.name}
                </div>
                <div class="">
                    <b> Prix:</b> {station.price}
                </div>
                <div class="">
                    <b>Pts. de Passage:</b> {station.passPoints?.length}
                </div>
                <hr class="bs5-my-2">
                <div class="bs5-d-flex bs5-justify-content-around">
                    <Button href="/admin/pass-stations/{station.id}/pass-points" color="dark" outline>Passages</Button>
                    <Button on:click={ () => { deleteStation(station.id) } } color="red" outline>Supprimer</Button>
                </div>
            </Card>
        </div>
   {:else}
        <div class="text-center">
            <span style="font-size: 35px;" class="text-teal-700">Aucune station enregistrée</span>
        </div>
   {/each}
</div>

<!-- Modals -->
<Modal bind:open={addStationModalOpened} autoclose={false} >
    <div>
        <span class="bs5-d-block bs5-mx-2 bs5-mt-4 bs5-mb-2 text-yellow-800" style="font-size: 18px;">
            Enregistrer une nouvelle Station de Passage
        </span>
        <form on:submit|preventDefault={() => { addStation(); }}>
            <span class="bs5-d-block bs5-small bs5-text-muted">Nom</span>
            <Input type="text" bind:value={stationDataName} placeholder="Nom de la nouvelle Station"  style="font-size: 18px; text-align: center;" />
            
            <span class="bs5-d-block bs5-small bs5-text-muted bs5-mt-3">Prix</span>
            <Input type="number" bind:value={stationDataPrice} step="0.1" placeholder="Prix du passage (ex: 300)" style="font-size: 18px; text-align: center;" class="mb-3" />
          <div class="bs5-text-center">
            <Button type="submit" class="bs5-mt-3" color="dark">
                {#if isRegisteringStation}
                    <Spinner />
                {:else}
                     Enregistrer
                {/if}    
            </Button>
          </div>
        </form>
    
    </div>
</Modal>