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

    async function deleteUser(id: string)
    {
        const reponse = await fetch("/api/users/delete?id=" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(reponse.ok)
        {
            const uid = data.allUsers.findIndex(u => u.id.toString() == id)
            if(uid >= 0)
            {
                data.allUsers.splice(uid, 1);
                data.allUsers = data.allUsers;
            }
            
            alert("utilisateur supprimé!")
        }

    }

</script>


<div class="bs5-row mb-5">
    <center class="bs5-fw-bold bs5-fs-2">Utilisateurs Enregistrés</center>
</div>

<div class="bs5-row mx-2">
    <!-- {#each items as item,(key)} -->
         <!-- content here -->
    <!-- {/each} -->
    <TableSearch placeholder="rechercher par nom, prénoms, tél. ou numéro carte" bind:inputValue={searchInput} hoverable shadow>
        <TableHead>
            <TableHeadCell>Nom & Prénoms</TableHeadCell>
            <TableHeadCell>Tél.</TableHeadCell>
            <TableHeadCell>Date Enr.</TableHeadCell>
            <TableHeadCell>Numéro Carte</TableHeadCell>
            <TableHeadCell>Demande de Carte</TableHeadCell>
            <TableHeadCell> <span class="fas fa-tools bs5-me-1"></span> Actions</TableHeadCell>
        </TableHead>
        <TableBody  tableBodyClass="divide-y">
            {#each filteredItems as _user}
                {#key _user.id}
                    <TableBodyRow>
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
                        {#if _user.cardRequest.requestStatus != "accepted"}
                            <TableBodyCell>
                                {#if _user.cardRequest }
                                    {#if _user.cardRequest.requestStatus == 'no-status' }
                                        <Badge color="red" rounded class="px-2.5 py-0.5">
                                            <Indicator color="red" size="xs" class="mr-1"/>Aucune Demande.
                                        </Badge>
                                    {:else if _user.cardRequest.requestStatus == 'pending' }
                                        <div class="text-center">
                                            <Button href={ `/admin/card-requests/${_user.cardRequest.id}/process` } outline color="dark" class="border-0"> <span class="fas fa-external-link-square-alt bs5-me-2"></span> Voir</Button>
                                        </div>
                                    {:else}
                                        <Badge color="red" rounded class="px-2.5 py-0.5">
                                                <Indicator color="red" size="xs" class="mr-1"/>Aucune Demande.
                                        </Badge>
                                    {/if}
                                {/if}
                            </TableBodyCell>
                        {/if}
                        <TableBodyCell >
                            <Button size="sm" color="red" on:click={() => { deleteUser(_user.id.toString()) }}>
                                <span class="fas fa-trash"></span> 
                            </Button> |
                            <Button size="sm" >
                                <span class="fas fa-list"></span>
                            </Button>
                        </TableBodyCell>
                    </TableBodyRow>
                {/key}
            {:else}
                <div class="text-center mt-8">
                    <span class="bs5-fs-3 bs5-fw-bold">Aucune donnée</span>
                </div>
            {/each}
        </TableBody>
    </TableSearch>
</div>