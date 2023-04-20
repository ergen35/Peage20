<script lang="ts">
    import { Button, Input, Label } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let password: string;
    let username: string;

    function logIn(){
        if(!(password && username)) return;
        dispatch('loginsubmit', { username, password })
    }
</script>

<style>
    form{
        width: 350px;
    }
</style>

<div>
    <form on:submit|preventDefault={() => logIn()} class="flex flex-col space-y-4" >
        <h3 class="mb-2 text-xl bs5-text-center font-medium text-gray-900 dark:text-white">
            👋<span class="bs5-fst-italic">Hey!</span>
        </h3>
        <Label class="space-y-2">
            <span>Numéro Tél.</span>
            <Input type="number" name="email" bind:value={username} placeholder="988 055 088" required />
        </Label>
        <Label class="space-y-2">
            <span>Mot de passe</span>
            <Input type="password" name="password" bind:value={password} placeholder="•••••" required />
        </Label>
        <Button type="submit" color="red" class="w-full1">Connexion</Button>
    </form>
    <hr class="my-2">
    <div class="bs5-text-center mt-2">
        <a href="/" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Mot de passe oublié ?</a>
    </div>
</div>