<script lang="ts">
    import type { PageData } from './$types';
    import { Button, Modal, Input, Card, Spinner, Badge } from 'flowbite-svelte';
    import * as Joi from 'joi'

    export let data: PageData;

    let addPassPointModalOpened = false;
   
    let passPointName =  '';
    let passPointDirection: 'returning' | 'going' = 'going' 
    let passPointGeoAddress = '';
   
    let isRegisteringPP = false;

    const schema = Joi.object({
        name: Joi.string().min(6),
        direction: Joi.string().allow('returning').allow('going'),
    })

    async function addPassPoint()
    {
        isRegisteringPP = true;
        const validationResult = schema.validate({ name: passPointName, direction: passPointDirection  })
        if(validationResult.error)
        {
            alert("Veillez fournir toutes les informations dans un format correct.")
            isRegisteringPP = false;
            return;
        }

        const response = await fetch("/api/passpoints/add?stationId=" + data.station.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: passPointName, direction: passPointDirection, geoAddress: passPointGeoAddress })
        });

        if(response.ok)
        {
            const passPointData = await response.json();
           
            data.passPoints.push(
                {  id: passPointData.id, 
                    passDirection: passPointData.passDirection, 
                    name: passPointData.name, 
                    passStation: data.station,
                    geoAddress: passPointData.geoAddress, 
                    usageRecords: []
                });
            data.passPoints = data.passPoints;
        }
        else
        {
            alert("La ressource n'a pas pu être enregistrée")
        }

        isRegisteringPP = false;
    }

    async function deletePassPoint(ppId: string)
    {
        const response = await fetch('/api/passpoints/delete?ppId=' + ppId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.ok)
        {
            const sIndex = data.passPoints.findIndex(s => s.id == ppId);
            if(sIndex >= 0)
            {
                data.passPoints.splice(sIndex, 1);
                data.passPoints = data.passPoints; 
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
        <span style="font-size: 25px;" class="bs5-fw-bold bs5-text-wrap">
            <span class="fas fa-compass bs5-me-2"></span> Point de passages (Station {data.station.name})
        </span>
    </div>
    <div class="bs5-col-2 bs5-text-end">
        <Button color="dark" on:click={() => { addPassPointModalOpened = true }}>
            <span class="fas fa-plus-square bs5-me-2"></span> Ajouter
        </Button>
    </div>

    <hr class="bs5-mb-3 bs5-mt-2">
</div>

<div class="bs5-row">
   {#each data.passPoints as passPoint}
        <div class="bs5-col-4 bs5-mt-3">
            <Card color="dark">
                <div class="">
                   <b> Nom:</b> {passPoint.name}
                </div>
                <div class="">
                    <b> Sens:</b> 
                    {#if passPoint.passDirection == 'going'}
                         <Badge color="green">Aller</Badge>
                    {:else}
                         <Badge color="purple">Retour</Badge>
                    {/if}
                </div>
                <hr class="bs5-my-2">
                <div class="bs5-d-flex bs5-justify-content-around">
                    <Button on:click={ () => { deletePassPoint(passPoint.id) } } color="red" outline>Supprimer</Button>
                </div>
            </Card>
        </div>
   {:else}
        <div class="text-center">
            <span style="font-size: 35px;" class="text-teal-700">Aucun Point de Passage enregistré</span>
        </div>
   {/each}
</div>

<!-- Modals -->
<Modal bind:open={addPassPointModalOpened} autoclose={false} >
    <div>
        <span class="bs5-d-block bs5-mx-2 bs5-mt-4 bs5-mb-2 text-yellow-800" style="font-size: 18px;">
            Enregistrer une nouvelle Station de Passage
        </span>
        <form on:submit|preventDefault={() => { addPassPoint(); }}>
            <span class="bs5-d-block bs5-small bs5-text-muted">Nom</span>
            <Input type="text" bind:value={passPointName} placeholder="Nom du point de passage"  style="font-size: 18px; text-align: center;" />
            
            <span class="bs5-d-block bs5-small bs5-text-muted bs5-mt-3">Direction</span>
            <select bind:value={passPointDirection} 
                    class="block w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 
                            focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm p-2.5">
                <option selected disabled value="Définissez un Sens">Sens</option>
                <option value="going">Aller</option>
                <option value="returning">Retour</option>
            </select>

            <span class="bs5-d-block bs5-small bs5-text-muted bs5-mt-3"><span class="fas fa-map-marker-alt"></span> Adresse Géo.</span>
            <Input type="text" bind:value={passPointGeoAddress} placeholder="Adresse Géographique"  style="font-size: 18px; text-align: center;" />

            <div class="bs5-text-center">
                <Button type="submit" class="bs5-mt-3" color="dark">
                    {#if isRegisteringPP}
                        <Spinner />
                {:else}
                     Enregistrer
                {/if}    
            </Button>
          </div>
        </form>
    
    </div>
</Modal>