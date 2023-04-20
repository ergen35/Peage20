<script lang="ts">
    import { RoundedStatCard } from "$lib/components";
    import {
        Button,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch,}
    from "flowbite-svelte";
    import { isAuthModalOn } from "../app-store";
    import type { PageData } from "./$types";

    let stats = {
        users: 5000,
    };

    let searchTerm = "";
    let items = [
        { id: 1, maker: "Toyota", type: "ABC", make: 2017 },
        { id: 2, maker: "Ford", type: "CDE", make: 2018 },
        { id: 3, maker: "Volvo", type: "FGH", make: 2019 },
        { id: 4, maker: "Saab", type: "IJK", make: 2020 },
    ];

    $: filteredItems = items.filter(
        (item) => item.maker.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );

    export let data: PageData;
</script>

<div class="bs5-row">
    <div class="bs5-col bs5-col-sm-12 bs5-col-md-6">
        <div class="bs5-fs-3 bs5-mt-5">
            <p>
                Obtenez une carte de passage pour votre véhicule. <br />
                Ne perdez plus votre temps.
            </p>
        </div>
    </div>
    <div class="bs5-col-lg-6 bs5-col-sm-12 bs5-col-md-6 bs5-col">
        <img src="images/svg/autonomous-car-pana.svg" alt="car" />
    </div>
</div>

<div class="bs5-row">
    <div class="bs5-col-12 bs5-text-center bs5-mt-3">
        <Button on:click={() => { $isAuthModalOn = true }} color="red" size="lg">
            <span class="fas fa-user bs5-me-2" /> Commencer</Button>
    </div>
    <div class="bs5-mt-2" />
</div>
<div class="bs5-row">
    <center class="bs5-mt-5">
        <span class="bs5-fs-3 bs5-fw-bold text-red-700">
            <span class="fas fa-list bs5-text-dark" /> Prix en temps réel des Stations</span
        >
        <hr class="bs5-w-50" />
        <div class="bs5-w-75 bs5-mt-3">
            <TableSearch
                placeholder="Rechercher par nom"
                hoverable={true}
                bind:inputValue={searchTerm}>
                <TableHead>
                    <TableHeadCell>Nom</TableHeadCell>
                    <TableHeadCell>Ville</TableHeadCell>
                    <TableHeadCell>Géo-Adresse</TableHeadCell>
                    <TableHeadCell>Prix Actuel</TableHeadCell>
                </TableHead>
                <TableBody tableBodyClass="divide-y">
                    {#each filteredItems as item}
                        <TableBodyRow>
                            <TableBodyCell>{item.id}</TableBodyCell>
                            <TableBodyCell>{item.maker}</TableBodyCell>
                            <TableBodyCell>{item.type}</TableBodyCell>
                            <TableBodyCell>{item.make}</TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </TableSearch>
        </div>
    </center>
</div>

<div class="bs5-container">
    <div class="bs5-row">
        <center class="bs5-mt-5">
            <div class="bs5-fs-3 bs5-fw-bold text-red-700">
                <span class="fas fa-chart-pie bs5-text-dark" /> Nos Stats
                <hr class="bs5-w-50" />
            </div>
        </center>

        <div class="bs5-col-3 mt-2">
            <RoundedStatCard value="+{stats.users}" label="Utilisateurs" />
        </div>

        <div class="bs5-col-3 mt-2">
            <RoundedStatCard value="+5900" label="Véhicules" />
        </div>

        <div class="bs5-col-3 mt-2">
            <RoundedStatCard value="+7223" label="Cartes" />
        </div>

        <div class="bs5-col-3 mt-2">
            <RoundedStatCard value="284031" label="Passages" />
        </div>
    </div>
</div>
