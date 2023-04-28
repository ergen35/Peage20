<script lang="ts">
    import { Badge, Button, Indicator, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
    import type { PageData } from "./$types";

    export let data: PageData;

    let searchInput = '';
    let filteredItems  = data.allUsers;


    $: filteredItems = data.allUsers.filter((item) => 
    {
        return item.firstName.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
            || item.lastName.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
            || item.phoneNumber.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
    });

</script>


<div class="bs5-row mb-5">
    <center class="bs5-fw-bold bs5-fs-2">Utilisateurs Enregistrés</center>
</div>

<div class="bs5-row mx-2">
    <TableSearch placeholder="rechercher par nom, prénoms, tél. ou numéro carte" bind:inputValue={searchInput} hoverable shadow>
        <TableHead>
            <TableHeadCell>Nom & Prénoms</TableHeadCell>
            <TableHeadCell>Tél.</TableHeadCell>
            <TableHeadCell>Date Enr.</TableHeadCell>
            <TableHeadCell>Numéro Carte</TableHeadCell>
            <TableHeadCell>Demande de Carte</TableHeadCell>
            <TableHeadCell></TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
            {#each filteredItems as _user}
                <TableBodyRow >
                    <TableBodyCell>
                        {#if (_user.firstName && _user.lastName)}
                             { `${_user.firstName} ${_user.lastName}` }
                        {:else}
                            <Badge color="red" rounded class="px-2.5 py-0.5">
                                <Indicator color="red" size="xs" class="mr-1"/>Non Renseigné.
                            </Badge>
                        {/if}
                    </TableBodyCell>
                    <TableBodyCell>{ _user.phoneNumber }</TableBodyCell>
                    <TableBodyCell>{ new Date(_user.registrationDate).toLocaleString('fr-FR') }</TableBodyCell>
                    <TableBodyCell>
                        {#if _user.userCard }
                            { _user.userCard.cardID }
                        {:else}
                            <div class="">
                                <Badge color="red" rounded class="px-2.5 py-0.5">
                                    <Indicator color="red" size="xs" class="mr-1"/>Non Assigné.
                                </Badge>
                            </div>
                        {/if}
                    </TableBodyCell>
                    <TableBodyCell>
                        {#if _user.cardRequest }
                            {#if _user.cardRequest.requestStatus == 'no-status' }
                                <Badge color="red" rounded class="px-2.5 py-0.5">
                                    <Indicator color="red" size="xs" class="mr-1"/>Aucune Demande.
                                </Badge>
                            {:else if _user.cardRequest.requestStatus == 'pending' }
                                <Button>Traiter</Button>
                            {:else if _user.cardRequest.requestStatus == 'accepted' }
                                <Badge color="green" rounded class="px-2.5 py-0.5">
                                    <Indicator color="green" size="xs" class="mr-1"/>Carte Délivrée.
                                </Badge>
                            {/if}
                        {:else}
                            <Badge color="red" rounded class="px-2.5 py-0.5">
                                    <Indicator color="red" size="xs" class="mr-1"/>Aucune Demande.
                            </Badge>
                        {/if}
                    </TableBodyCell>
                    <TableBodyCell>
                        <Button size="sm" color="red">
                            <span class="fas fa-trash"></span> 
                        </Button> |
                        <Button size="sm" >
                            <span class="fas fa-list"></span>
                        </Button>
                    </TableBodyCell>
                </TableBodyRow>
            {:else}
                <div class="text-center mt-8">
                    <span class="bs5-fs-3 bs5-fw-bold">Aucune donnée</span>
                </div>
            {/each}
        </TableBody>
    </TableSearch>
</div>