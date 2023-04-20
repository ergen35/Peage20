<script lang="ts">
    import { LoginForm, RegistrationForm } from "$lib/components";
    import {
        Button,
        Footer,
        FooterCopyright,
        FooterLink,
        FooterLinkGroup,
        Modal,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl,
        Navbar,
        TabItem,
        Tabs,} 
    from "flowbite-svelte";
    import "../app.css";
    import { isAuthModalOn } from "../app-store";
    import type { LayoutData } from "./$types";

    export let data: LayoutData;

    function handleLoginSubmit(e: CustomEvent<{username: string, password: string}>)
    {
        alert(e.detail.username)
    }

    function handleRegistration(e: CustomEvent<{username: string, password: string}>)
    {
        alert(e.detail.username)
    }
</script>

<div class="bs5-container-fluid">
    <div class="bs5-row">
        <Navbar let:hidden let:toggle>
            <NavBrand href="/">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    class="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Peage20
                </span>
            </NavBrand>
            <!-- <NavHamburger on:click={toggle} /> -->
            <div class="flex md:order-2">
                <Button
                    on:click={() => {
                        $isAuthModalOn = true;
                    }}
                    color="red"
                    size="lg"
                >
                    <span class="fas fa-user bs5-me-2" /> Commencer</Button
                >
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

<Modal bind:open={$isAuthModalOn}>
    <Tabs>
        <TabItem open title="Connexion">
            <LoginForm on:loginsubmit={handleLoginSubmit} />
        </TabItem>
        <TabItem title="Inscription">
            <RegistrationForm on:submitregistration={handleRegistration}/>
        </TabItem>
    </Tabs>
</Modal>
