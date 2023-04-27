<script lang="ts">
    import type { PageData } from "./$types";
    import { Label, Input, Helper, Button, Textarea } from 'flowbite-svelte'
    import { createForm } from "felte";

    export let data: PageData;

    //get userdata first
    let userData = {
        firstName: '',
        lastName: '',
        phoneNumber: data.user?.username,
        address: ''
    }

    const { form } = createForm({
        // validate: (values) => {
        //     const errors = { 
        //         firstName: new Array<string>(),
        //         lastName: new Array<string>(),
        //     }

        //     errors.firstName = [ "malaria", "avocado" ]
        //     errors.lastName = ['noval', "anti-val"]

        //    return errors;
        // },

        

        onSubmit(values, context) {
            
        },

        onSuccess(response, context) {
            //save data
            
        },

        onError(error, context){

        }
    })

    const errorIndicator = '<span class="font-medium fas fa-times text-red-500 me-2"></span>'
    const successIndicator = '<span class="font-medium fas fa-check-circle text-green-500 me-2"></span>'
</script>

<form use:form>

    <div class="bs5-row">
        <div class='bs5-col-md-6 bs5-col-sm-12'>
            <div class="mb-4">
                <Label for='firstName' class='block mb-2'>
                    <span class="font-medium fas fa-check-circle text-green-500 me-2"></span>
                    Prénoms
                </Label>
                <Input id='firstName' name='firstName' placeholder="Prénom(s)" bind:value={userData.firstName}/>
            </div>
        </div>
        <div class='bs5-col-md-6 bs5-col-sm-12'>
            <div class="mb-4">
                <Label for='lastName' class='block mb-2'>
                    <span class="font-medium fas fa-check-circle text-green-500 me-2"></span>
                    Nom
                </Label>
                <Input id='lastName' name="lastName" placeholder="Nom" bind:value={userData.lastName} />
            </div>
        </div>
    </div>

    <div class="bs5-row">
        <div class='bs5-col-md-6 bs5-col-sm-12'>
            <div class="mb-4">
                <Label for='firstname' class='block mb-2'>
                    <span class="font-medium fas fa-check-circle text-green-500 me-2"></span>
                    Tél.
                </Label>
                <Input id='firstname' placeholder="Success input" value={userData.phoneNumber} disabled />
            </div>
        </div>
    </div>

    <div class="bs5-row">
        <div class="bs5-col">
            <div class="mb-4">
                <Label for='address' class='block mb-2'>
                    <span class="font-medium fas fa-check-circle text-green-500 me-2"></span>
                    Adresse
                </Label>
                <Textarea id='address' label="Adresse" placeholder="Adresse du domicile"  rows={3} />
            </div>
        </div>
    </div>

    <Button type="submit">Enregistrer</Button>
</form>
