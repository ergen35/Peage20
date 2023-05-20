<script lang="ts">
    import { LoginForm } from '$lib/components';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>


<div class="bs5-row">
    <div class="bs5-col-lg-7 bs5-col-md-8 bs5-col-sm-10  bs5-w-100">
        <LoginForm />
    </div>
</div>