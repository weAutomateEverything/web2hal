<template>
    <v-flex>
      <callout-group></callout-group>
      &nbsp;
      <default-callout></default-callout>
    </v-flex>
</template>

<script>
    import CalloutGroup from "./calloutGroup";
    import DefaultCallout from "./defaultCallout";
    export default {
        name: "callout",
      components: {DefaultCallout, CalloutGroup}
    }
</script>

<style scoped>

</style>
