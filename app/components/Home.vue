<template>
  <Page class="bg-slate-800 text-white">
    <ActionBar class="bg-slate-800">
      <Label text="Test App"/>
    </ActionBar>

    <FlexboxLayout v-if="!isOpen" class="max-w-none mx-auto px-4" flexDirection="column">
      <TextField v-model="textFieldValue" hint="Enter text..."/>
      <Label class="textField py-6" :text="textFieldValue"/>
      <Button class="px-2 py-1 text-center bg-blue-400 rounded-full" text="Open Modal" @tap="isOpen = !isOpen"/>
    </FlexboxLayout>

    <FlexboxLayout v-if="isOpen"
                   class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <FlexboxLayout flexDirection="column" class="bg-slate-700 px-16 py-14 rounded-md text-center">
        <Label v-if="textFieldValue.length > 0" class="text-xl mb-4 font-bold" :text="`Hello, ${textFieldValue}`"></Label>
        <Button @tap="isOpen = !isOpen" class="px-2 py-1 text-center text-blue-600 bg-blue-200 rounded-full"
                text="Close"/>
      </FlexboxLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      message: 10,
      textFieldValue: "",
      testString: "Jamal",
      isOpen: false
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">

.textField {
  font-size: 20px;
}
</style>
