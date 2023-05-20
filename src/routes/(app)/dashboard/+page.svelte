<script lang="ts">
    import type { PageData } from "./$types";
    import { Card, Button, Alert } from "flowbite-svelte";
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
            data.fullUser!.cardRequest.requestStatus = 'pending';
            data.fullUser!.cardRequest.requestTicket = ticket;
        }

        window.location = window.location
    }
</script>


<div class='bs5-row'>
    <div class="text-center">
        <div class="bs5-offset-lg-2 bs5-col-lg-8 bs5-offset-sm-1 bs5-col-sm-10 bs5-offset-md-2 bs5-col-lg-8">
            {#if data.fullUser?.cardRequest}
                {#if data.fullUser.cardRequest.requestStatus === 'accepted' && data.fullUser.userCard != null}
                    <Card horizontal  size='lg'>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <span class="far fa-user fa-4x"></span>
                            Numéro de Carte: DAA62538-B8BD-425F
                        </h5>
                        <div class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight ms-2">
                            <p class="mb-2">
                                reverse chronological order.
                            </p>
                        </div>
                    </Card>
                {:else if data.fullUser.cardRequest.requestStatus == 'rejected'}
                    <Alert color="red">
                        <span slot="icon">
                            <span class="fas fa-info-circle bs5-text-primary fa-2x"></span>
                        </span>
                        <span class="text-lg font-medium">Statut Ticket: #{data.fullUser.cardRequest.requestTicket}</span>
                        <div slot="extra" class="">
                            <div class="mt-2 mb-4 text-sm">Votre demande de carte à été rejetée.</div>
                            <div class="">
                                <Button on:click={makeCardRequest} size="xs" outline color="blue" class="bs5-rounded-0">
                                    Faire une demande
                                </Button>
                            </div>
                        </div>
                    </Alert>
                {:else if data.fullUser.cardRequest.requestStatus == 'pending'}
                    <Alert color="blue">
                        <span slot="icon">
                            <span class="fas fa-info-circle bs5-text-primary fa-2x"></span>
                        </span>
                        <span class="text-lg font-medium">Statut Ticket: #{data.fullUser.cardRequest.requestTicket}</span>
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
                <Alert color="white" class="bg-gray-300">
                    <span slot="icon">
                        <span class="fas fa-info-circle bs5-text-primary fa-2x"></span>
                    </span>
                    <span class="text-lg font-medium bs5-text-primary">Statut Ticket: N/A</span>
                    <div slot="extra">
                        <div class="mt-2 mb-4 text-sm"> Vous n'avez fait aucune demande de carte.</div>
                        <div class="">
                            <Button  on:click={makeCardRequest} size="lg" outline color="blue" class="bs5-rounded-0">
                                Faire une demande Maintenant
                            </Button>
                        </div>
                    </div>
                </Alert>
            {/if}
        </div>
    </div>
</div>

<div class="bs5-row">
    <div class="bs5-col bs5-mt-5">
        <center>
            Short list of transactions
        </center>

        {#if data.last15Transactions}
            Theses are { data.last15Transactions.length } Transaction
            <ul>
                {#each data.last15Transactions as transact}
                    <li>{transact.hash} - {transact.id}</li>
                {:else}
                    No transaction available
                {/each}
            </ul>
        {:else}
            No transaction available
        {/if}
    </div>
</div>