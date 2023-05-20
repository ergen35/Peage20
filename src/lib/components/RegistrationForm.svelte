<script lang="ts">
    import { Button, Input, Label, Spinner } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let username: string;
    let password: string;
    let confirmPassword: string;
    export let isRegistering = false;

    function registerUser()
    {
        isRegistering = true;

        if((username && password && confirmPassword))
        {
            if(password === confirmPassword)
            {
                dispatch('submitregistration', {username, password})
                return;
            }
            
            alert("Les mots de passe ne sont pas identiques")
            isRegistering = false;
            return;
        }

        alert("Veillez remplir tous les champs")
        isRegistering = false;
    }
</script>

<div class="bs5-pt-5">
    <div class="bs5-p-3 bs5-pt-2 bg-white bs5-shadow-lg bs5-rounded-3">
        <form on:submit|preventDefault={() => registerUser()} class="bs5-px-3 text-center">
            <div class="bs5-text-center">
                <h3 class="bs5-mb-4 bs5-text-center font-medium">
                    <span class="bs5-fst-italic" style="font-size: 35px;">Inscrivez-vous Ici</span>
                </h3>
            </div>
            <Label class="bs5-mt-2">
                <span class="bs5-d-block bs5-mb-2" style="font-size: 18px;">Numéro Tél.</span>
                <Input type="number" class="bs5-border-dark bs5-border-1" name="email" bind:value={username} placeholder="exemple: 988 055 088" required />
            </Label>
            <Label class="bs5-mt-4">
                <span class="bs5-d-block bs5-mb-2" style="font-size: 18px;">Mot de passe</span>
                <Input type="password" class="bs5-border-dark bs5-border-1" name="password" bind:value={password} placeholder="Mot de passe" required />
            </Label>
            <Label class="bs5-mt-4">
                <span class="bs5-d-block bs5-mb-2" style="font-size: 18px;">Confirmer mot de passe</span>
                <Input type="password" class="bs5-border-dark bs5-border-1" name="confirm_password" bind:value={confirmPassword} placeholder="Confirm. Mot de passe" required />
            </Label>

            <div class="bs5-mt-5">
                <Button type="submit" color="dark" size="lg" class="bs5-w-75 bs5-shadow-lg">
                    {#if isRegistering}
                        <Spinner color="white"/>
                    {:else}
                        <span class="fas fa-sign-in-alt bs5-me-2"></span> Inscription
                    {/if}
                </Button>
            </div>
        </form>
        <hr class="mt-2">
        <div class="text-center bs5-mt-3">
            <span class="bs5-d-block bs5-display-5 fw-bold bs5-mb-1">Ou</span>
            <Button type="button" href="/account/login" color="yellow" class="bs5-rounded-2 bs5-shadow-lg" size="md">
                <span class="fas fa-user bs5-me-2"></span> Se Connecter
            </Button>
        </div>
        <div class="bs5-text-center mt-2">
            <a class="text-sm text-blue-700 hover:underline dark:text-blue-500">Mot de passe oublié <span class="fas fa-question-circle text-blue-800"></span></a>
        </div>
    </div>
</div>