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
        <ListView for="film in films" @itemTap="onItemTap" style="height:20000px">
          <v-template>
            <FlexboxLayout class="py-4" flexDirection="column">
              <Image class="rounded-t-lg object-cover h-max w-full" :src="film.Poster"/>
              <StackLayout class="bg-blue-400 text-white p-2">
                <Label class="text-xl">{{ film.Title }}</Label>
                <Label class="text-lg">{{ film.Year }}</Label>
                <Label>{{ film.Type }}</Label>
              </StackLayout>
            </FlexboxLayout>
          </v-template>
        </ListView>
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
    },
    onItemTap: function (args) {
      const detailsProps = {
        filmTitle: args.item.Title,
      }
      this.$navigateTo(details, {
        props: detailsProps
      })

    },
  },
}


const details = {
  data() {
    return {
      api_key: '6f60f9ad',
      film_details: [],
      isBusy: false,
    }
  },
  mounted() {
    this.fetchDetails()
  },
  props: {
    filmTitle: {
      type: String,
      required: true
    },
  },
  computed: {

  },
  methods: {
    goBack() {
      this.$navigateBack()
    },
    async fetchDetails() {
      try {
        this.isBusy = true
        let filmResponse = await fetch(`https://www.omdbapi.com/?apikey=${this.api_key}&t=${this.filmTitle}`)
        let filmResult = await filmResponse.json()
        this.film_details = filmResult
      } catch (err) {
        console.log("error")
      } finally {
        this.isBusy = false
      }
    }
  },

  template: `
    <Page class="bg-slate-800 text-white">
    <ActionBar class="bg-slate-800">
      <Label>Details</Label>
      <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
    </ActionBar>
    <ScrollView>
      <FlexboxLayout class="px-4 my-4" flexDirection="column">
        <FlexboxLayout class="py-4" flexDirection="column">
        <ActivityIndicator v-if="this.isBusy" :busy="isBusy"/>
          <Image class="my-4" :src="this.film_details.Poster"/>
          <Label textWrap="true" class="text-xl" :text="this.filmTitle"/>
          <Label :text="this.film_details.Year"/>
          <Label :text="this.film_details.Rated"/>
          <Label :text="this.film_details.Released"/>
          <Label :text="this.film_details.Runtime"/>
          <Label textWrap="true" :text="this.film_details.Plot"/>
          <Label>Director: {{this.film_details.Director}}</Label>
          <Label>Country: {{this.film_details.Country}}</Label>
          <Label class="text-lg underline" :text="this.film_details.Genre"/>
        </FlexboxLayout>
        <Button class="py-4 bg-indigo-700 text-white rounded-full" @tap="goBack">Back</Button>
      </FlexboxLayout>
    </ScrollView>
    </Page>
  `
}
</script>
