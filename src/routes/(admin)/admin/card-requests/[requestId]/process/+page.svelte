<script lang="ts">
    import type { PageData } from "./$types";
    import { Card, Badge, Button, Modal, Input } from 'flowbite-svelte';
    import * as Joi from 'joi'

    export let data: PageData;

    let cardId = "";
    let showCardIDModal = false;

    const schema = Joi.object({
        cardId: Joi.number()
                .positive().
                min(9999).integer()
    });

    async function rejectCardRequest(requestId: string)
    {
        const response = await fetch(`/api/requests/reject?requestId=${requestId}`, {
            method: "POST"
        });

        if(response.ok)
          window.location = window.location
    }

    async function acceptCardRequest(requestId: string)
    {
       if(!cardId)
        alert("Veillez fournir le numéro de la carte")
      else
      {
        var validationResult = schema.validate({ cardId: cardId })
        if(validationResult.error)
        {
          cardId = "";
          alert("Veuillez entrer un numéro de carte Valide");
        }
        
        const response = await fetch(`/api/requests/accept?requestId=${requestId}`, {
            method: "POST",
            body: JSON.stringify({ cardId: cardId })
        });

        if(response.ok)
          window.location = window.location
        else if(response.status == 400)
        {
            const body: string = await response.json()
            if(body.includes("exists"))
            {
              alert("Veillez fournir un autre Numéro de Carte.")
            }
        }
      }
    }
</script>

<div class="bs5-col">
  <Card>
    <div class="bs5-row text-center">
      <span style="font-size: 25px;" class="text-yellow-600">
        <span class="fas fa-user"></span> Infos. Utilisateur
      </span>
    </div>
    <hr class="bs5-mt-2 bs5-mb-3">
    <div class="bs5-row">
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Nom Complet:</span> {`${data.request.requestMaker.lastName} ${data.request.requestMaker.firstName}`}
      </span>
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Nom: </span> {data.request.requestMaker.lastName}
      </span>
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Prénoms: </span> {data.request.requestMaker.firstName}
      </span>
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Date Inscription: </span> { new Date(data.request.requestMaker.registrationDate).toLocaleDateString("fr-FR") }
      </span>
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Statut Compte: </span> 
        {#if data.request.requestMaker.accountActivated }
           <Badge color="green">activé</Badge>
        {:else}
           <Badge color="red">non activé</Badge>
        {/if}
      </span>
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Solde: </span> { data.request.requestMaker.accountBalance.toLocaleString("fr-FR") } Fcfa
      </span>
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Adresse: </span> { data.request.requestMaker.address }
      </span>
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Date dernier accès: </span> {  new Date(data.request.requestMaker.lastAccessDate).toLocaleDateString("fr-FR") }
      </span>
    </div>
  </Card>
</div>
<div class="bs5-col bs5-text-start">
  <Card>
    <div class="bs5-row text-center">
      <span style="font-size: 25px;" class="text-teal-600">
        <span class="fas fa-user"></span> Demande
      </span>
    </div>
    <hr class="bs5-mt-2 bs5-mb-3">
    <div class="bs5-row">
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Numéro Ticket:</span> #{data.request.requestTicket.toUpperCase()}
      </span>
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Date Demande:</span> { new Date(data.request.requestDate).toLocaleDateString("fr-FR") }
      </span>
      <span class="bs5-d-block">
        <span class="bs5-fw-bold">Statut:</span>
        {#if  data.request.requestStatus == 'accepted'}
          <Badge color="green">Acceptée</Badge>
        {:else if data.request.requestStatus == 'pending'}
          <Badge color="blue">En Cours de Traitement</Badge>
        {:else if data.request.requestStatus == 'rejected'}
          <Badge color="red">Rejetée</Badge>
        {:else}
          <Badge color="dark">non spécifié</Badge>
        {/if}
      </span>
      <span class="bs5-d-block bs5-mt-4">
        <div class="text-center text-blue-600" style="font-size: 18px;"> <span class="fas fa-tools"></span> Actions</div>
        <hr class="bs5-mb-3">
        {#if data.request.requestStatus != "pending"}
          <div class="text-center">Aucune Action</div>
        {:else}
            <div class="bs5-d-flex bs5-justify-content-around">
              <Button on:click={ () => { showCardIDModal = true } } color="green"> <span class="fas fa-check-circle text-white bs5-me-2"></span> Accepter</Button>
              <Button on:click={ () => { rejectCardRequest(data.request.id) } } color="red"> <span class="fas fa-times-circle text-white bs5-me-2"></span> Rejeter</Button>
            </div>
            {/if}
      </span>
    </div>
  </Card>
</div>

<!-- Modals -->
<Modal bind:open={showCardIDModal} autoclose={false}  >
  <div>
    <span class="bs5-d-block bs5-mx-2 bs5-mt-3 bs5-mb-2">
    <span class="fas fa-info-circle bs5-text-primary bs5-me-2"></span> Veuillez entrer un numéro de carte valide, et non utilisé
    </span>
    <form on:submit|preventDefault={() => { acceptCardRequest(data.request.id); }}>
      <Input type="text" bind:value={cardId} placeholder="ex: 235466788" style="font-size: 18px; text-align: center;" />
      
      <div class="bs5-text-center">
        <Button type="submit" class="bs5-mt-3" color="dark">Confirmer</Button>
      </div>
    </form>

  </div>
</Modal>