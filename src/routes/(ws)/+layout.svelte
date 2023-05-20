<script lang="ts">

    import type { LayoutData } from "./$types";
    export let data: LayoutData;
    
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


<style>
    .hero-present {
        background-image: url(/images/gen/genbg1.jpg);        
        background-size: cover;
        height: 100vh;
    }
</style>

<div class="hero-present bs5-container-fluid">
    <slot />
</div>