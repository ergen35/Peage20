<script lang="ts">
    import { goto } from '$app/navigation';
    import { Badge, BottomNav, BottomNavItem, Button, Sidebar, SidebarDropdownItem, SidebarDropdownWrapper, SidebarGroup, SidebarItem, SidebarWrapper, Tooltip } from 'flowbite-svelte';
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;

</script>

<div class="bs5-container-fluid">
    <div class="bs5-row">
      <!-- Side bar -->
        <div class="bs5-col-sm-auto bs5-bg-light bs5-sticky-top">
            <div class="bs5-d-flex bs5-flex-sm-column bs5-flex-row bs5-flex-nowrap bs5-bg-light bs5-align-items-center bs5-sticky-top">
                <Sidebar>
                  <SidebarWrapper divClass='overflow-y-auto py-4 px-3 rounded dark:bg-gray-800'>
                    <div class="text-center">
                        <span class="bs5-fs-3 bs5-fw-bold bs5-fst-italic text-dark">Peage20 - Admin</span>
                    </div>
                    <hr class="mt-3 mb-2">
                    <SidebarGroup>
                      <SidebarItem label="Tableau de Bord" href="/admin">
                        <svelte:fragment slot="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                        </svelte:fragment>
                      </SidebarItem>

                      <SidebarItem label="Demandes de Carte" href="/admin/card-requests" spanClass='flex-1 ml-3 whitespace-nowrap'>
                            <svelte:fragment slot="icon">
                                <span class="fas fa-list fa-fw bs5-fs-5"></span>
                            </svelte:fragment>
                            <svelte:fragment slot="subtext">
                            <span class="inline-flex justify-center items-center p-4 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                              {#if data.reqCount > 99}
                                <span>99+</span>  
                              {:else}
                                { data.reqCount }
                              {/if}
                            </span>
                            </svelte:fragment>
                      </SidebarItem>

                      <SidebarDropdownWrapper label="Cartes">
                        <svelte:fragment slot="icon">
                          <span class="fas fa-id-card fa-fw bs5-fs-5"></span>
                        </svelte:fragment>
                        <SidebarDropdownItem label="Liste" href="/admin/pass-cards/list" />
                        <SidebarDropdownItem label="Enregistrement" href="/admin/pass-cards/register" />
                      </SidebarDropdownWrapper>
                      
                      <SidebarItem label="Utilisateurs" href="/admin/users/list">
                        <svelte:fragment slot="icon">
                          <span class="fas fa-users fa-fw bs5-fs-5"></span>
                        </svelte:fragment>
                      </SidebarItem>


                      {#if data.user}
                        {#if data.user.userType === 'super-admin'}
                            <SidebarDropdownWrapper label="Comptes Admin">
                                <svelte:fragment slot="icon">
                                    <span class="fas fa-user-cog fa-fw bs5-fs-5"></span>
                                </svelte:fragment>
                                <SidebarDropdownItem label="Lister" href="/admin/list-accounts" />
                                <SidebarDropdownItem label="Ajouter" href="/admin/add-new" />
                            </SidebarDropdownWrapper>
                        {/if} 
                      {/if}


                      <SidebarItem label="Déconnexion" href="##">
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
            <slot></slot>
          </div>
        </div>
    </div>
</div>


<!-- Modals -->