<script lang="ts">
    import { LoginForm, RegistrationForm } from "$lib/components";
    import { Modal, TabItem, Tabs } from "flowbite-svelte";
    import { isAuthModalOn } from "../app-store";
    import "../app.css";
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;

    function handleLoginSubmit(e: CustomEvent<{ username: string; password: string }> ) {
        alert(e.detail.username);
    }

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
        (window as Window).location = "/app";
    }
</script>

<slot />

<Modal bind:open={$isAuthModalOn}>
    <Tabs>
        <TabItem open title="Connexion">
            <LoginForm on:loginsubmit={handleLoginSubmit} />
        </TabItem>
        <TabItem title="Inscription">
            <RegistrationForm on:submitregistration={handleRegistration} />
        </TabItem>
    </Tabs>
</Modal>
