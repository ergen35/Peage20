<script lang="ts">
    import { goto } from '$app/navigation';
    import { Badge, BottomNav, Modal, BottomNavItem, Button, Sidebar, SidebarDropdownItem, SidebarDropdownWrapper, SidebarGroup, SidebarItem, SidebarWrapper, Tooltip } from 'flowbite-svelte';
    import type { LayoutData } from './$types';
    import { onMount } from 'svelte';
    import { showIdWarnModal } from '../../app-store';
    import { IdWarnModal } from '$lib/components';

    export let data: LayoutData;

    //fetch user data

    onMount(async () => {
      const res = await fetch('/api/checks/user-infos',
        {
          method: 'POST',
          body: JSON.stringify({ username: data.user?.username }),
          headers: {
                  "Content-Type": "application/json",
              },
        })

      if(res.ok){
        const { isUserOk } = await res.json();
        if(isUserOk == false){
          $showIdWarnModal = true
        }
      }
    })
</script>

<div class="bs5-container-fluid">

    <div class="bs5-row">
      <!-- Side bar -->
        <div class="bs5-col-sm-auto bs5-bg-light bs5-sticky-top bs5-d-none bs5-d-md-block">
            <div class="bs5-d-flex bs5-flex-sm-column bs5-flex-row bs5-flex-nowrap bs5-bg-light bs5-align-items-center bs5-sticky-top">
                <Sidebar>
                  <SidebarWrapper divClass='overflow-y-auto py-4 px-3 rounded dark:bg-gray-800'>
                    <SidebarGroup>
                      <SidebarItem label="Tableau de Bord" href="/dashboard">
                        <svelte:fragment slot="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                        </svelte:fragment>
                      </SidebarItem>
                     <SidebarDropdownWrapper label="Mon Compte">
                        <svelte:fragment slot="icon">
                          <span class="far fa-user fa-fw bs5-fs-5"></span>
                        </svelte:fragment>
                        <SidebarDropdownItem label="Infos." href="/my-account" />
                        <SidebarDropdownItem label="Vérification" href="/my-account/kyc"/>
                      </SidebarDropdownWrapper>
                      
                      <SidebarItem label="Transactions" href="/transactions">
                        <svelte:fragment slot="icon">
                          <span class="far fa-chart-bar fa-fw bs5-fs-5"></span>
                        </svelte:fragment>
                      </SidebarItem>

                      <SidebarItem label="Notifications" spanClass='flex-1 ml-3 whitespace-nowrap'>
                        <svelte:fragment slot="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" /></svg>
                        </svelte:fragment>
                        <svelte:fragment slot="subtext">
                          <span class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                        </svelte:fragment>
                      </SidebarItem>

                      <SidebarItem label="Déconnexion" href="/account/logout">
                        <svelte:fragment slot="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                        </svelte:fragment>
                      </SidebarItem>

                    </SidebarGroup>
                  </SidebarWrapper>
                </Sidebar>
            </div>
        </div>

        <!-- Main content -->
        <div class="bs5-col-sm bs5-p-3 bs5-min-vh-100">
          <div class="bs5-row">
              <div class="bs5-col bs5-text-end mb-4">
                   {#if data.user}
                      <Button rounded={0} color="dark" shadow="lime" href="/dashboard">
                        <span>XOF &nbsp;{data.user.accountBalance}</span>
                        <Badge rounded class="w-4 h-4 ml-2 !p-0 !font-semibold bg-green-700 dark:text-blue-800 dark:bg-blue-200">
                            <span class="fas fa-plus text-white" />
                        </Badge>
                      </Button>
                   {/if}
              </div>
          </div>
          <div class="bs5-row">
            <slot></slot>
          </div>

          <div class="bs5-d-md-block bs5-d-md-none">
            <BottomNav position="absolute" navType="application" innerDiv="grid-cols-5">
                <BottomNavItem btnName="Home" appBtnPosition="left" on:click={() => goto('/')}>
                    <span class="fas fa-home fa-fw bs5-fs-5"></span>
                    <Tooltip arrow={false}>Accueil</Tooltip>
                </BottomNavItem>
                <BottomNavItem btnName="Wallet" appBtnPosition="middle"on:click={() => goto('/my-account')}>
                    <span class="far fa-user fa-fw bs5-fs-5"></span>
                    <Tooltip arrow={false}>Mon Compte</Tooltip>
                </BottomNavItem>
                <div class="flex items-center justify-center">
                  <BottomNavItem btnName="Recharger Carte"
                                appBtnPosition="custom" btnDefault="inline-flex items-center justify-center w-10 h-10 font-medium bs5-bg-dark rounded-full hover:bg-grey-500 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                    </svg>
                    <Tooltip arrow={false}>Recharger</Tooltip>
                  </BottomNavItem>
                </div>
                <BottomNavItem btnName="Tableau de bord" appBtnPosition="middle" on:click={() => goto('/dashboard')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                  <Tooltip arrow={false}>Tableau de bord</Tooltip>
                </BottomNavItem>
                <BottomNavItem btnName="Sign-Out" appBtnPosition="right">
                    <span class="fas fa-power-off text-red-600"></span>
                    <Tooltip arrow={false}>Déconnexion</Tooltip>
                </BottomNavItem>
            </BottomNav>
          </div>

        </div>
    </div>
</div>


<!-- Modals -->
<Modal bind:open={ $showIdWarnModal } autoclose={false}  >
  <IdWarnModal redirectLink='/my-account' />
</Modal>