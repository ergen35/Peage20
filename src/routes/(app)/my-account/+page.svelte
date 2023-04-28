<script lang="ts">
    import { Button, Input, Label, Textarea } from "flowbite-svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    //get userdata first
    let userData = data.userData

    async function saveUsersInfo() {
        if (userData.firstName && userData.lastName) {
            
            const response = await fetch("/api/users/infos", {
                method: "POST",
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert("Information sauvegardées");
            } else {
                alert("Une erreur s'est produite, veuillez recommencer");
            }
        }
    }

    const errorIndicator =
        '<span class="font-medium fas fa-times text-red-500 me-2"></span>';
    const successIndicator =
        '<span class="font-medium fas fa-check-circle text-green-500 me-2"></span>';
</script>

<form on:submit|preventDefault={saveUsersInfo}>
    <div class="bs5-row">
        <div class="bs5-col-md-6 bs5-col-sm-12">
            <div class="mb-4">
                <Label for="firstName" class="block mb-2">
                    <span
                        class="font-medium fas fa-check-circle text-green-500 me-2"/>
                    Prénoms
                </Label>
                <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Prénom(s)"
                    bind:value={userData.firstName}
                />
            </div>
        </div>
        <div class="bs5-col-md-6 bs5-col-sm-12">
            <div class="mb-4">
                <Label for="lastName" class="block mb-2">
                    <span
                        class="font-medium fas fa-check-circle text-green-500 me-2"
                    />
                    Nom
                </Label>
                <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Nom"
                    bind:value={userData.lastName}
                />
            </div>
        </div>
    </div>

    <div class="bs5-row">
        <div class="bs5-col-md-6 bs5-col-sm-12">
            <div class="mb-4">
                <Label for="firstname" class="block mb-2">
                    <span
                        class="font-medium fas fa-check-circle text-green-500 me-2"
                    />
                    Tél.
                </Label>
                <Input
                    id="firstname"
                    placeholder="Success input"
                    value={userData.phoneNumber}
                    disabled
                />
            </div>
        </div>
    </div>

    <div class="bs5-row">
        <div class="bs5-col">
            <div class="mb-4">
                <Label for="address" class="block mb-2">
                    <span
                        class="font-medium fas fa-check-circle text-green-500 me-2"
                    />
                    Adresse
                </Label>
                <Textarea
                    id="address"
                    label="Adresse"
                    placeholder="Adresse du domicile"
                    rows={3} bind:value={userData.address}
                />
            </div>
        </div>
    </div>

    <Button type="submit">Enregistrer</Button>
</form>
