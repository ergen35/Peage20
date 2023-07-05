<script lang="ts">
    import RegistrationForm from '$lib/components/RegistrationForm.svelte';
    import type { PageData } from './$types';
    import * as Joi from "joi";
    
    export let data: PageData;


    let isRegistering = false;

    const schema = Joi.object({
        username: Joi.string()
                .min(6).max(15),

        password: Joi.string()
                    .min(6)
    });

    async function handleRegistration(e: CustomEvent<{ username: string; password: string }>) {

        var validationResult = schema.validate({ username: e.detail.username, password: e.detail.password })
        
        if(validationResult.error)
        {
            return;
        }

        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(e.detail),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            isRegistering = false;
            alert("L'Inscription a échoué")
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
        <RegistrationForm on:submitregistration={handleRegistration} bind:isRegistering />
    </div>
</div>