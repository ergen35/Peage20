<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="text-center">
    <kkiapay-widget amount="<montant-a-preleve-chez-le-client>" 
        key="7e1c6d50fdba11ed976703e23fcc8506"
        position="center"
        sandbox="true"
        data={data.user?.userCard}
        callback="http://localhost:5173/api/payments/callback">
</kkiapay-widget>
</div>