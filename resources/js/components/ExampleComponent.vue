<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        I'm an example component.
                    </div>

                    <button @click="state.count++">Add {{ state.count }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref } from '@vue/reactivity'
    import { onMounted, watch } from '@vue/runtime-core';
    
    const state = reactive({count : 0});

    onMounted(() => {
        console.log("entra");
    })

    watch(
        () => state.count,
        (count, prevCount) => {
            console.log(count, prevCount);
        }
    )
    
</script>
