<script lang="ts">
    // your script goes here
    export let value: string;
    export let label: string;

    export let height = 120;
    export let width = 120;

    export let cardbg = "bg-red-700";
    export let labelColor = "text-white";
    export let valueColor = "text-white";
</script>

<div style="height: {height}px; width: {width}px;" class="bs5-card bs5-shadow-sm bs5-rounded-circle bs5-p-3 bs5-border {cardbg}">
    <div class="bs5-card-body bs5-text-center bs5-mt-2">
        <h5 class="mb-2 text-2xl font-bold tracking-tight {valueColor} dark:text-white">{value}</h5>
        <p class="font-normal {labelColor} dark:text-gray-400 leading-tight">
            {label}
        </p>
    </div>
</div>