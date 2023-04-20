<script lang="ts">
    import "../app.css";
    import type { LayoutData } from './$types';
    import { Navbar, NavLi, NavUl, NavBrand, NavHamburger, Button } from 'flowbite-svelte';
    
    export let data: LayoutData;
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
                <Button color="red" size="lg"> <span class="fas fa-user bs5-me-2"></span> Commencer</Button>
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
    <slot></slot>
</div>

