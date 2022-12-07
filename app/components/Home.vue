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
        <ListView for="film in this.films" @itemTap="onItemTap" style="height:20000px">
          <v-template>
            <FlexboxLayout class="py-4" flexDirection="column">
              <Image class="rounded-t-lg object-cover h-max w-full" :src="film.Poster"/>
              -->
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
      this.$navigateTo(details, {
        context: {
          propsData: {
            imageSrc: args.item.Poster,
            filmTitle: args.item.Title
          }
        }
      })
      console.log(args.item.Title + ' tapped');

    },
  },
}


const details = {
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    filmTitle: {
      type: String,
      required: true
    }
  },
  methods: {
    goBack() {
      this.$navigateBack()
    },
  },

  template: `
    <Page class="bg-slate-800 text-white">
    <ActionBar class="bg-slate-800">
      <Label text="Details"/>
    </ActionBar>
    <ScrollView>
      <FlexboxLayout flexDirection="column">
        <Image :src="this.imageSrc"/>
        <Label :text="this.imageSrc"></Label>
        <Button class="py-4 bg-indigo-700 text-white rounded-full" @tap="goBack">Back</Button>
      </FlexboxLayout>
    </ScrollView>
    </Page>
  `
}
</script>
