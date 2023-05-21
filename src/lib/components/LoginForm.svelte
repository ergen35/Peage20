<script lang="ts">
    import { Button, Input, Label, Spinner } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let password: string;
    let username: string;

    export let hasErrorsOnUsername = false;
    export let hasErrorsOnPassword = false;
    export let isLoging = false;

    let usernameInputColor: "base" | "red" | "green" | undefined = "base";
    let pwdInputColor: "base" | "red" | "green" | undefined = "base";

    function logIn(){
        isLoging = true;
        if(!(password && username))
        {
            isLoging = false;
            return;
        }
        dispatch('loginsubmit', { username, password })
    }

    $: {
        
        if(!username)
            usernameInputColor = "base";
        if(username && hasErrorsOnUsername)
            usernameInputColor = "red"
        if(username && !hasErrorsOnUsername)
            usernameInputColor = "green"

        if(!password)
            pwdInputColor = "base";
        if(password && hasErrorsOnPassword)
            pwdInputColor = "red"
        if(password && !hasErrorsOnPassword)
            pwdInputColor = "green"
    }
    
</script>

<div class="bs5-pt-5">
    <div class="bs5-p-0 bs5-pt-2 bg-white bs5-shadow-lg bs5-rounded-3">
        <form on:submit|preventDefault={() => logIn()} class="bs5-px-3 text-center" >
            <h3 class="bs5-mb-4 bs5-text-center font-medium">
                <span class="bs5-fst-italic" style="font-size: 35px;">Connexion</span>
            </h3>
            <Label class="bs5-mt-5">
                <span class="bs5-d-block bs5-mb-2" style="font-size: 18px;">Numéro Téléphone</span>
                <Input type="text" name="email" class="bs5-border-1"  bind:color={usernameInputColor} bind:value={username} placeholder="988 055 088" required />
            </Label>
            
            <Label class="bs5-mt-4">
                <span class="bs5-d-block bs5-mb-2" style="font-size: 18px;">Mot de passe</span>
                <Input type="password" class="bs5-border-1" bind:color={pwdInputColor}  name="password" bind:value={password} placeholder="•••••" required />
            </Label>

            <Button type="submit" color="purple" class="bs5-mt-5 bs5-w-50 bs5-shadow-lg" size="lg">
                {#if isLoging}
                    <Spinner color="yellow" />
                {:else}
                    <span class="fas fa-shield-alt bs5-me-2"></span> Connexion
                {/if}
            </Button>
        </form>
        <hr class="mt-3">
        <div class="text-center bs5-my-3">
            <span class="bs5-d-block bs5-display-5 fw-bold bs5-mb-1">Ou</span>
            <Button type="button" href="/account/register" color="yellow" class="bs5-rounded-2 bs5-shadow-lg" size="md">
                <span class="fas fa-sign-in-alt bs5-me-2"></span> S'inscrire
            </Button>
        </div>
        <div class="bs5-text-center mt-2">
            <a class="text-sm text-blue-700 hover:underline dark:text-blue-500">Mot de passe oublié <span class="fas fa-question-circle text-blue-800"></span></a>
        </div>
    </div>
</div>