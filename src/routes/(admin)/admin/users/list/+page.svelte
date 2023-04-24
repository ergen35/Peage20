<script lang="ts">
    import {
        Indicator,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from "flowbite-svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="bs5-row mb-5">
    <center class="bs5-fw-bold bs5-fs-2">Cartes Délivrées</center>
</div>

<div class="bs5-row mx-2">
    <Table shadow>
        <TableHead>
            <TableHeadCell>Nom & Prénoms</TableHeadCell>
            <TableHeadCell>Date Délivrance</TableHeadCell>
            <TableHeadCell>Statut</TableHeadCell>
            <TableHeadCell>Usages</TableHeadCell>
            <TableHeadCell>Propriétaire</TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
            {#each data.allUsers as user}
                <TableBodyRow>
                    <TableBodyCell
                        >{`${user.firstname} ${user.lastname}`}</TableBodyCell
                    >
                    <TableBodyCell
                        >{new Date(
                            user.registrationDate
                        ).getDate()}</TableBodyCell
                    >
                    <TableBodyCell>
                        {#if user.isActivated}
                            <Indicator color="green" />
                        {:else}
                            <Indicator color="red" />
                        {/if}
                    </TableBodyCell>
                    <TableBodyCell>{user.usageRecords.length}</TableBodyCell>
                    <!-- <TableBodyCell>{`${user.cardOwner.fisrtName} ${card.cardOwner.lastName} `}</TableBodyCell> -->
                </TableBodyRow>
            {:else}
                <div class="text-center">
                    <span class="bs5-fs-3 bs5-fw-bold"
                        >Aucune carte trouvée</span
                    >
                </div>
            {/each}
        </TableBody>
    </Table>
</div>
