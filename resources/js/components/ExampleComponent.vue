<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        Name: <strong>{{ name }}({{wordCount}})</strong>
                    </div>

                    <button @click="add">Add {{ count }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";

export default defineComponent({
  components: {
  },
  setup() {
    const count = ref(0);
    const name = ref<string>("Bijaya");
    const add = () => { count.value++; }

    const wordCount = computed(() => name.value.length);

    return {
      name,
      count,
      add,
      wordCount,
    };
  },
});
</script>
