 <script lang="ts">
    import { LoginForm } from '$lib/components';
    import * as Joi from 'joi';
    import type { PageData } from './$types';
    
    
    export let data: PageData;

    const schema = Joi.object({
        username: Joi.string()
                .min(6).max(15),

        password: Joi.string()
                    .min(6)
    });

    let passwordError = false;
    let usernameError = false;
    let isLoging = false;

    async function handleLoginSubmit(e: CustomEvent<{ username: string; password: string }>) {
        let result = schema.validate({ username: e.detail.username, password: e.detail.password })
        if(result.error)
        {
            if(result.error.details.find((ed) => ed.path.includes("username")))
                usernameError = true;
            if(result.error.details.find((ed) => ed.path.includes("password")))
                passwordError = true;
            
            alert("Veuillez corriger les erreurs et recommencer" + JSON.stringify(result.error.details))
            isLoging = false;
        }
        else
        {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(e.detail),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if(response.ok)
            {
                (window as Window).location = "/dashboard";
            }
            else
            {
                alert("Nom d'utilisateur ou mot de passe incorrect, veuillez recommencer");
                isLoging = false;
            }
        }
    }
</script>


<div class="bs5-row">
    <div class="bs5-offset-lg-3 bs5-col-lg-6
                bs5-offset-md-2 bs5-col-md-8 
                bs5-offset-sm-1 bs5-col-sm-10">
        <LoginForm on:loginsubmit={handleLoginSubmit} bind:isLoging
                    bind:hasErrorsOnPassword={passwordError}  
                    bind:hasErrorsOnUsername={usernameError}/>
    </div>
</div>