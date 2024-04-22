<script lang="ts">
    import type { PageData } from "./$types";
    import { Card, Button, Alert, Badge } from "flowbite-svelte";
    import { goto } from "$app/navigation";
    import { showIdWarnModal } from "../../../app-store";
    
    export let data: PageData;

    async function makeCardRequest(){
        if(!data.fullUser?.lastName || !data.fullUser.firstName || !data.fullUser.address)
        {
            $showIdWarnModal = true;
            return;
        }

        const response = await fetch('/api/requests', {
            method: 'POST',
            body: JSON.stringify({ username: data.user?.username })
        })

        if(response.ok){
            const { ticket } = await response.json()
            data.fullUser!.cardRequest!.requestStatus = 'Pending';
            data.fullUser!.cardRequest!.requestTicket = ticket;
           
            window.location = window.location
        }
        else
        {
            alert("Demande non enregistrée, veuillez réessayer")
        }

    }
</script>


<div class='bs5-row'>
    <div class="text-center">
        <div class="bs5-offset-lg-2 bs5-col-lg-8 bs5-offset-sm-1 bs5-col-sm-10 bs5-offset-md-2 bs5-col-lg-8">
            {#if data.fullUser?.cardRequest}
                {#if data.fullUser.cardRequest.requestStatus === 'Accepted' && data.fullUser.userCard != null}
                    <Card horizontal color="green" size='lg'>
                        <h5 class="mb-2 ">
                            <div class="bs5-row">
                                <div class="bs5-col-2">
                                    <span class="far fa-id-card text-yellow-700 fa-3x"></span>
                                </div>
                                <div class="bs5-col bs5-text-start bs5-ms-3">
                                  <span class="bs5-d-block">
                                    <span class="bs5-fw-bold">Numéro de Carte: </span> {data.fullUser.userCard.cardID}
                                  </span>
                                  <span class="bs5-d-block">
                                    <span class="bs5-fw-bold">Statut: </span> 
                                    {#if data.fullUser.userCard.isActivated}
                                        <Badge color="green">Active</Badge>
                                    {:else}
                                        <Badge color="red">désactivée</Badge>
                                    {/if}
                                  </span>
                                  <span class="bs5-d-block">
                                    <span class="bs5-fw-bold">Délivrée le: </span> { new Date(data.fullUser.userCard.creationDate).toLocaleDateString('fr-FR') }
                                  </span>

                                  <div class="bs5-mt-3">
                                    <Button color="dark" size="xs">
                                        Bloquer
                                    </Button>
                                  </div>
                                </div>
                            </div>
                        </h5>
                    </Card>
                {:else if data.fullUser.cardRequest.requestStatus == 'Rejected'}
                    <Alert color="red">
                        <span slot="icon">
                            <span class="fas fa-info-circle bs5-text-primary fa-2x"></span>
                        </span>
                        <span class="text-lg font-medium">Statut Ticket: #{data.fullUser.cardRequest.requestTicket}</span>
                        <div slot="extra" class="">
                            <div class="mt-2 mb-4 text-sm">Votre demande de carte à été rejetée.</div>
                            <div class="">
                                <Button on:click={() => { makeCardRequest(); }} size="md" outline color="blue" class="bs5-rounded-0">
                                    Refaire une demande
                                </Button>
                            </div>
                        </div>
                    </Alert>
                {:else if data.fullUser.cardRequest.requestStatus == 'Pending'}
                    <Alert color="blue">
                        <span slot="icon">
                            <span class="fas fa-info-circle bs5-text-primary fa-2x"></span>
                        </span>
                        <span class="text-lg font-medium">
                                Statut Ticket: #<span class="bs5-text-danger">{data.fullUser.cardRequest.requestTicket.toUpperCase()}</span> 
                        </span>
                        <div slot="extra" class="">
                            <div class="mt-2 mb-4 text-sm">Votre demande de carte est en cours de traitement, veillez patienter.</div>
                            <div class="">
                                <Button on:click={() => { window.location = window.location }} size="xs" outline color="blue" class="bs5-rounded-0">
                                <span class="fas fa-redo bs5-me-1"></span> Actualiser
                                </Button>
                            </div>
                        </div>
                    </Alert>
                {/if}
            {:else}
                <Alert color="white" class="bg-yellow-100">
                    <span slot="icon">
                        <span class="fas fa-info-circle bs5-text-primary fa-2x"></span>
                    </span>
                    <span class="text-lg font-medium bs5-text-black">Statut Ticket: N/A</span>
                    <div slot="extra">
                        <div class="mt-2 mb-4 text-sm"> Vous n'avez fait aucune demande de carte.</div>
                        <div class="">
                            <Button on:click={() => makeCardRequest()} size="lg" color="dark" class="bs5-rounded-0">
                                Faire une demande Maintenant
                            </Button>
                        </div>
                    </div>
                </Alert>
            {/if}
        </div>
    </div>
</div>

<hr class="bs5-my-3">

<div class="bs5-row">
    <div class="bs5-col">
        <center>
           <div class="text-yellow-700" style="font-size: 25px;">
                15 Dernières Transactions
           </div>
            
            <div>
                {#if data.last15Transactions}
                    <ul>
                        {#each data.last15Transactions as transact}
                            <li>{transact.hash} - {transact.id}</li>
                        {:else}
                            Aucune Transaction effectuée
                        {/each}
                    </ul>
                {:else}
                    <span>Aucune Transaction Effectuée</span>
            {/if}
            </div>
        </center>
    </div>
</div>