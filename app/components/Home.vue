<template>
  <Page class="bg-slate-800 text-white">
    <ActionBar class="bg-slate-800">
      <Label text="Test App"/>
    </ActionBar>
    <ScrollView>
      <FlexboxLayout class="max-w-none mx-auto px-4" flexDirection="column">
        <Button class="rounded-full bg-blue-700 font-bold my-4" @tap="fetchUsers">Load</Button>
        <ActivityIndicator v-if="isBusy == true" :busy="isBusy"/>
        <FlexboxLayout class="flex flex-col my-2" v-for="user in users" :key="user.id">
          <StackLayout class="flex flex-col p-2 border-2 border-white text-lg">
            <Label><Span class="text-blue-500">Name: </Span> <Span>{{ user.name }}</Span></Label>
            <Label><Span class="text-blue-500">Username: </Span> <Span>{{ user.username }}</Span></Label>
            <Label><Span class="text-blue-500">Email: </Span> <Span>{{ user.email }}</Span></Label>
            <Label><Span class="text-blue-500">City: </Span> <Span>{{ user.address.city }}</Span></Label>
            <Label><Span class="text-blue-500">Street: </Span> <Span>{{ user.address.street }}</Span></Label>
            <Label><Span class="text-blue-500">Phone: </Span> <Span>{{ user.phone }}</Span></Label>
          </StackLayout>
        </FlexboxLayout>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      isBusy: false
    }
  },
  methods: {
    async fetchUsers() {
      try {
        this.isBusy = true
        let response = await fetch("https://jsonplaceholder.typicode.com/users")
        let result = await response.json()
        this.users = result
      } catch (error) {
        console.log("Error")
      } finally {
        this.isBusy = false
      }
    },
  }
}
</script>

<style scoped lang="scss">

.textField {
  font-size: 20px;
}
</style>
