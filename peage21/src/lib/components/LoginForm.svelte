<script>
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte'
</script>

<style>
    form{
        width: 350px;
    }
</style>

<div>
    <form class="flex flex-col space-y-4" >
        <h3 class="mb-2 text-xl bs5-text-center font-medium text-gray-900 dark:text-white">
            👋<span class="bs5-fst-italic">Hey!</span>
        </h3>
        <Label class="space-y-2">
            <span>Numéro Tél.</span>
            <Input type="number" name="email" placeholder="988 055 088" required />
        </Label>
        <Label class="space-y-2">
            <span>Mot de passe</span>
            <Input type="password" name="password" placeholder="•••••" required />
        </Label>
        <Button type="submit" color="red" class="w-full1">Connexion</Button>
    </form>
</div>