<script>
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte'
</script>

<style>
    form{
        width: 350px;
    }
</style>

<div>
    <form class="flex flex-col space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
        <Label class="space-y-2">
        <span>Numéro Tél.</span>
        <Input type="number" name="email" placeholder="988 055 088" required />
        </Label>
        <Label class="space-y-2">
        <span>Mot de passe</span>
        <Input type="password" name="password" placeholder="•••••" required />
        </Label>
        <div class="flex items-start">
            <Checkbox>Remember me</Checkbox>
            <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost password?</a>
        </div>
        <Button type="submit" class="w-full1">Login to your account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="/" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
        </div>
    </form>
</div>