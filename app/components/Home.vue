<template>
  <Page>
    <ActionBar>
      <Label text="Test App"/>
    </ActionBar>

    <FlexboxLayout flexDirection="column">
      <TextField v-model="textFieldValue" hint="Enter text..." />
      <Label class="textField" :text="textFieldValue"></Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      message: 10,
      textFieldValue: ""
    }
  },
}
</script>

<style scoped lang="scss">
@import '@nativescript/theme/scss/variables/blue';

.textField{
  font-size: 20px;
}
</style>
