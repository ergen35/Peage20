<script lang="ts">
    import RegistrationForm from '$lib/components/RegistrationForm.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;

    async function handleRegistration(e: CustomEvent<{ username: string; password: string }>) {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(e.detail),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            //TODO: signal that registration failed
            return;
        }

        //navigate to dashboard
        (window as Window).location = "/dashboard";
    }
</script>


<div class="bs5-row">
    <div class="bs5-offset-lg-3 bs5-col-lg-6
                bs5-offset-md-2 bs5-col-md-8 
                bs5-offset-sm-1 bs5-col-sm-10">
        <RegistrationForm on:loginsubmit={handleRegistration} />
    </div>
</div>