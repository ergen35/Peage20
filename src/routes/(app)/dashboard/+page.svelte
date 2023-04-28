<script lang="ts">
    import type { PageData } from "./$types";
    import { Card, Button } from "flowbite-svelte";
    
    export let data: PageData;
</script>


<div class='bs5-row'>
 <div class="col">
    {#if data.fullUser?.cardRequest}
        {#if data.fullUser.cardRequest.requestStatus === 'accepted' && data.fullUser.userCard != null}
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
        {:else if data.fullUser.cardRequest.requestStatus == 'pending'}
            <p>
                Vous n'avez fait aucune demande de carte ou votre demande de carte à été rejetée <br>
                <Button>
                    Faire une demande
                </Button>
            </p>
        {:else if data.fullUser.cardRequest.requestStatus == 'rejected'}
            <p>
                Votre demande de carte est en cours de traitement, veillez patienter. <br>
                <Button>
                    Faire une demande
                </Button>
            </p>
        {/if}
    {:else}
        <p>
            Vous n'avez fait aucune demande de carte. <br>
            <Button>
                Faire une demande
            </Button>
        </p>
    {/if}
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