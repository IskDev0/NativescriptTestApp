<template>
  <Page class="bg-slate-800 text-white">
    <ActionBar class="bg-slate-800">
      <Label text="Test App"/>
    </ActionBar>
    <ScrollView>
      <FlexboxLayout class="max-w-none mx-auto px-4" flexDirection="column">
        <FlexboxLayout flexDirection="column">
          <SearchBar
              class="w-full rounded-full"
              textFieldHintColor="#fff"
              color="#fff"
              textProperty="#fff"
              v-model="search"
              hint="Search..."
              @submit="fetchData"/>
          <ActivityIndicator v-if="isBusy" :busy="isBusy"/>
        </FlexboxLayout>
        <StackLayout
            class="text-white px-4 py-4"
            v-for="film in this.films"
            :key="film.imdbID">
          <Image class="rounded-t-lg object-cover h-max w-full" :src="film.Poster"/>
          <StackLayout class="bg-blue-400 text-white p-2">
            <Label class="text-xl">{{ film.Title }}</Label>
            <Label class="text-lg">{{ film.Year }}</Label>
            <Label>{{ film.Type }}</Label>
          </StackLayout>
        </StackLayout>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      api_key: '6f60f9ad',
      films: [],
      search: "",
      isBusy: false
    }
  },
  methods: {
    async fetchData() {
      try {
        this.isBusy = true
        let response = await fetch(`https://www.omdbapi.com/?apikey=${this.api_key}&s=${this.search}`)
        let result = await response.json()
        this.films = result.Search
        this.search = ""
      } catch (err) {
        console.log("error")
      } finally {
        this.isBusy = false
      }
      if (this.films == null) {
        this.error()
      }

    },
    error() {
      alert({
        title: "Error",
        message: "This film does not exist",
        okButtonText: "OK"
      })
    }
  },
}
</script>
