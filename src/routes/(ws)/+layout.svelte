<script lang="ts">
    import {
        Badge,
        Button,
        Footer,
        FooterCopyright,
        FooterLink,
        FooterLinkGroup,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl,
        Navbar,
    } from "flowbite-svelte";
    import type { LayoutData } from "./$types";
     import { LoginForm, RegistrationForm } from "$lib/components";
    import { Modal, TabItem, Tabs } from "flowbite-svelte";

    import { isAuthModalOn } from "../../app-store";

    export let data: LayoutData;


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
        (window as Window).location = "/dashboard";
    }
</script>


<style>
    .hero-present{
        background-image: url(/images/bg/bsh.svg);
        background-size: cover;
    }
</style>

<div class="hero-present">
    <div class="bs5-container-fluid">
        <div class="bs5-row">
            <Navbar fluid let:hidden let:toggle>
                <NavBrand href="/">
                    <img
                        src="/favicon.png"
                        class="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span
                        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
                    >
                        Peage20
                    </span>
                </NavBrand>
                <div class="flex md:order-2">
                    {#if data.user}
                        <Button color="red" href="/dashboard">
                            <span>XOF &nbsp;{data.user.accountBalance}</span>
                            <Badge
                                rounded
                                class="w-4 h-4 ml-2 !p-0 !font-semibold text-red-800 bg-red-200 dark:text-blue-800 dark:bg-blue-200"
                            >
                                <span class="fas fa-user" />
                            </Badge>
                        </Button>
                    {:else}
                        <Button
                            on:click={() => {
                                $isAuthModalOn = true;
                            }}
                            color="red"
                            size="lg"
                        >
                            <span class="fas fa-user bs5-me-2" /> Commencer</Button
                        >
                    {/if}
                    <NavHamburger on:click={toggle} />
                </div>
                <NavUl {hidden}>
                    <NavLi href="/" active={true}>Accueil</NavLi>
                    <NavLi href="/services">Services</NavLi>
                    <NavLi href="/pricing">Prix</NavLi>
                    <NavLi href="/contact">Contact</NavLi>
                </NavUl>
            </Navbar>
        </div>
    </div>

    <div class="bs5-container-fluid">
        <slot />
    </div>

    <div class="bs5-container-fluid mt-8">
        <Footer customClass="bg-blue-100">
            <FooterCopyright
                href="/"
                by="Peage20"
                year={2023}
                copyrightMessage=""
            />
            <FooterLinkGroup
                ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
            >
                <FooterLink href="/">About</FooterLink>
                <FooterLink href="/">Privacy Policy</FooterLink>
                <FooterLink href="/">Licensing</FooterLink>
                <FooterLink href="/">Contact</FooterLink>
            </FooterLinkGroup>
        </Footer>
    </div>
</div>


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