<script lang="ts">
    import { goto } from '$app/navigation';
    import { Badge, Card, Dropdown, DropdownItem, Indicator, Listgroup, ListgroupItem, MenuButton } from 'flowbite-svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    async function rejectCardRequest(requestId: number)
    {
        const response = await fetch(`/api/requests/reject?requestId=${requestId}`, {
            method: "POST"
        });

        if(response.ok){
            //remove from list
            const req = data.requests.findIndex(el => el.id == requestId);
            if(req > 0)
                data.requests.splice(req, 1);
            
            data.requests = data.requests;
        }
    }
</script>

<div class="bs5-row">
  <div class="bs5-col-12 bs5-mt-4">
    <Listgroup class="">
      <h3 class="text-xl font-medium bs5-text-end text-gray-900 bs5-p-3">
        Demandes en Attente:
        <span class="bs5-text-primary bs5-fw-bold bs5-fst-italic">
          {data.requests.length}
        </span>
      </h3>
      {#each data.requests as cardReq}
        {#key cardReq.id}
          <ListgroupItem class="text-base font-semibold">
            <Card class="bs5-w-100 bs5-p-3" size="none" padding="none">
              <div class="bs5-row">
                <div class="bs5-col-2">
                  <span class="bs5-text-primary"> #{cardReq.requestTicket}</span>
                </div>
                <div class="bs5-col-2">
                  <span class="fas fa-clock" />
                  {new Date(cardReq.requestDate).toLocaleDateString("fr-FR")}
                </div>
                <div class="bs5-col-2">
                  <span class="fas fa-user" />
                  {`${cardReq.requestMaker.firstName} ${cardReq.requestMaker.lastName}`}
                </div>
                <div class="bs5-col-2">
                  <span class="fas fa-phone fa-rotate-90 bs5-me-1" />
                  {cardReq.requestMaker.phoneNumber}
                </div>
                <div class="bs5-col-3">
                  <Badge color="red">
                    <Indicator color="red" />
                    <span class="ms-2"> Nouv., Renouv.</span>
                  </Badge>
                </div>
                <div class="bs5-col-1">
                  <div style="margin-top: -8px;">
                    <MenuButton class="dots-menu dark:text-white" />
                  </div>
                  <Dropdown triggeredBy=".dots-menu">
                    <DropdownItem on:click={() => goto(`/admin/card-requests/${cardReq.id}/process`)}>
                      <span class="fas fa-check-circle bs5-text-success bs5-me-1" /> Traiter
                    </DropdownItem>
                    <DropdownItem on:click={() => rejectCardRequest(cardReq.id)}>
                      <span class="fas fa-times-circle bs5-text-danger bs5-me-1" /> Rejeter
                    </DropdownItem>
                  </Dropdown>
                </div>
              </div>
            </Card>
          </ListgroupItem>
        {/key}
      {:else}
        <ListgroupItem>
          <div class="text-center bs5-text-danger">
            <span>Aucune demande en attente de traitement</span>
          </div>
        </ListgroupItem>
      {/each}
    </Listgroup>
  </div>
</div>
