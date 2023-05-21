<script lang="ts">
    import type { PageData } from "./$types";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge } from 'flowbite-svelte';

    export let data: PageData;
</script>


<div class="bs5-row mb-5">
    <center class="bs5-fw-bold bs5-fs-2">Cartes Délivrées</center>
</div>

<div class="bs5-row mx-2">
    <Table shadow>
        <TableHead>
            <TableHeadCell>Numéro de Série</TableHeadCell>
            <TableHeadCell>Date Délivrance</TableHeadCell>
            <TableHeadCell>Statut</TableHeadCell>
            <TableHeadCell>Usages</TableHeadCell>
            <TableHeadCell>Propriétaire</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
            {#each data.allCards as card}
                <TableBodyRow>
                    <TableBodyCell>{ card.cardID }</TableBodyCell>
                    <TableBodyCell>{ new Date(card.creationDate).toLocaleDateString("fr-FR") }</TableBodyCell>
                    <TableBodyCell>
                        {#if card.isActivated }
                            <Badge color="green">active</Badge>
                        {:else}
                            <Badge color="red">inactive</Badge>
                        {/if}
                    </TableBodyCell>
                    <TableBodyCell>{ card.usageRecords.length }</TableBodyCell>
                    <TableBodyCell>{`${card.cardOwner.firstName} ${card.cardOwner.lastName} `}</TableBodyCell>
                </TableBodyRow>
            {:else}
                <div class="text-center">
                    <span class="bs5-fs-3 bs5-fw-bold">Aucune carte trouvée</span>
                </div>
            {/each}
        </TableBody>
    </Table>
</div>