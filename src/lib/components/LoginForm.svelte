<script lang="ts">
    import { Button, Card, Input, Label } from 'flowbite-svelte';
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

</style>

<div class="bs5-pt-5">
    <div class="bs5-p-0 bs5-pt-2 bg-white  bs5-rounded-3">
        <form on:submit|preventDefault={() => logIn()} class="bs5-px-3 text-center" >
            <h3 class="bs5-mb-4 bs5-text-center font-medium">
                <span class="bs5-fst-italic" style="font-size: 35px;">Connexion</span>
            </h3>
            <Label class="bs5-mt-5">
                <span class="bs5-d-block bs5-mb-2" style="font-size: 18px;">Numéro Téléphone</span>
                <Input type="number" name="email" class="" bind:value={username} placeholder="988 055 088" required />
            </Label>
            
            <Label class="bs5-mt-4">
                <span class="bs5-d-block bs5-mb-2" style="font-size: 18px;">Mot de passe</span>
                <Input type="password" name="password" class="" bind:value={password} placeholder="•••••" required />
            </Label>

            <Button type="submit" color="blue" class="bs5-mt-5 bs5-w-100" size="lg">
                <span class="fas fa-shield-alt bs5-me-2"></span> Connexion
            </Button>
        </form>
        <hr class="bs5-mt-5 ">
        <div class="bs5-text-center mt-2">
            <a class="text-sm text-blue-700 hover:underline dark:text-blue-500">Mot de passe oublié ?</a>
        </div>
    </div>
</div>