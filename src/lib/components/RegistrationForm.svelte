<script lang="ts">
    import { Button, Input, Label } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let username: string;
    let password: string;
    let confirmPassword: string;

    function registerUser(){
        if((username && password && confirmPassword))
        {
            if(password === confirmPassword)
            {
                dispatch('submitregistration', {username, password})
            }
        }
    }
</script>

<style>
    form{
        width: 350px;
    }
</style>

<div>
    <form on:submit|preventDefault={() => registerUser()} class="flex flex-col space-y-6" action="#">
        <div class=" bs5-text-center">
            <h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Inscrivez-vous Ici</h3>
        </div>
        <Label class="space-y-2">
            <span>Numéro Tél.</span>
            <Input type="number" name="email" bind:value={username} placeholder="exemple: 988 055 088" required />
        </Label>
        <Label class="space-y-2">
            <Input type="password" name="password" bind:value={password} placeholder="Mot de passe" required />
        </Label>
        <Label class="space-y-2">
            <Input type="password" name="confirm_password" bind:value={confirmPassword} placeholder="Confirm. Mot de passe" required />
        </Label>

        <Button type="submit" color="dark" class="w-full">Inscription</Button>
    </form>
</div>