<script lang="ts">
    import { Button } from "flowbite-svelte";
    import type { PageData } from "./$types";

    let actionButtonsVisible = false;

    $: actionsBtnVisibility = actionButtonsVisible ? 'visible': "invisible";

    export let data: PageData;
</script>

<style>
    .neonText{
            color: #fff;
            text-shadow: 
                0 0 7px #fff,
                0 0 10px #fff,
                0 0 21px #fff,
                0 0 42px #0fa,
                0 0 82px #0fa,
                0 0 92px #0fa,
                0 0 102px #0fa,
                0 0 151px #0fa;
        }

        .neonText{
            animation: flicker 1.5s infinite;
        }

        /* Flickering animation */

        @keyframes flicker{
            0%, 18%, 22%, 25%, 53%, 57%, 100%{
               text-shadow: 
                0 0 4px #fff,
                0 0 11px #fff,
                0 0 19px #fff,
                0 0 30px rgb(241, 142, 28),
                0 0 30px rgb(241, 142, 28),
                0 0 30px rgb(241, 142, 28),
                0 0 30px rgb(241, 142, 28),
                0 0 30px rgb(241, 142, 28);
            }

            20%, 24%, 44%{
                text-shadow: none;
            }
        }
</style>

<div class="bs5-row text-center">
    <div class="text-white text-5xl mt-3">
        <i class="text-gray-500 text-6xl neonText">Peage20</i>
    </div>

    <div class="bs5-d-flex bs5-justify-content-center">
        <div class="bs5-col-sm-12 bs5-col-md-10 bs5-col-lg-5">
            <div class="bs5-fs-3 bs5-mt-5">
               
                <p class="text-white">
                    <span class="bs5-fs-1 bs5-text-wrap">
                        Obtenez une carte de passage pour votre véhicule.
                    </span> 
                <ul class="bs5-mt-5">
                    <li class="animate__animated animate__slideInLeft">
                        <span class="text-purple-600"><span class="fas fa-hand-point-right fa-fw"></span> Ne perdez plus votre temps.</span>
                    </li>
                    <li class="bs5-mt-3 animate__animated animate__delay-1s animate__zoomIn">
                        <span class="text-orange-200"> <span class="fas fa-hand-point-right  fa-fw"></span> Plus de soucis de monnaie.</span>
                    </li>
                    <li class="bs5-mt-3 animate__animated animate__zoomIn animate__delay-2s">
                        <span class="text-green-200"><span class="fas fa-hand-point-right  fa-fw"></span> Recharge Rapide</span>
                    </li>
                </ul>
            </div>
    
            <div class="bs5-mb-auto bs5-mt-5 animate__animated animate__bounceIn">
                <Button on:click={() => { actionButtonsVisible = !actionButtonsVisible; }}  color="blue" size="lg">
                    <span class="fas fa-play-circle bs5-me-2" /> Commencer</Button>
            </div>

            <div class="action-buttons bs5-mt-5 bs5-d-flex bs5-justify-content-evenly bs5-mt-5 {actionsBtnVisibility}">
                <Button href="/account/register" color="purple" size="lg">
                    <span class="fas fa-sign-in-alt bs5-me-2"></span> Inscription
                </Button>

                <Button href="/account/login" color="green" size="lg">
                    <span class="fas fa-user-alt bs5-me-2"></span> Connexion
                </Button>
            </div>
        </div>
    </div>
</div>