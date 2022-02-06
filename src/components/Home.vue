<template>
  <div class="home">
    <div class="home__tags">
      <Tag
        @click="tagClickHandler(tag)"
        v-for="tag in tags"
        :tag="tag"
        :key="tag.id"
        :isActive="isActive(tag.id)"
      />
    </div>
    <div class="home__search">
      Поиск:
      <input
        class="home__input"
        placeholder="Введите название, описание, автора или год книги"
        type="text"
        v-model="filterInput"
        @input="changeFilterHandler"
      />
    </div>

    <div class="home__cards">
      <Card
        v-for="(card, index) in computedCards.slice(0, this.showCount)"
        :card="card"
        :key="index"
        :search="filterInput.trim().toLowerCase()"
      />
    </div>
    <button
      @click="loadMoreButtonHandler"
      class="home__button"
      v-if="existNextPage || computedCards.length > showCount"
    >
      Загрузить ещё
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tag from "./Tag.vue";
import Card from "./Card.vue";

export default {
  name: "Home",
  components: {
    Tag,
    Card,
  },
  props: {
    // msg: String
  },
  data() {
    return {
      selectedTags: [],
      filterInput: "",
      showCount: 10,
    };
  },
  computed: {
    ...mapGetters({
      tags: "TAGS",
      cards: "CARDS",
      existNextPage: "GET_EXIST_NEXT_PAGE",
    }),
    computedCards() {
      let cards = this.cards.filter((card) => {
        return (
          card.name
            .toLowerCase()
            .includes(this.filterInput.trim().toLowerCase()) ||
          card.description
            .toLowerCase()
            .includes(this.filterInput.trim().toLowerCase()) ||
          card.author
            .toLowerCase()
            .includes(this.filterInput.trim().toLowerCase()) ||
          card.year
            .toLowerCase()
            .includes(this.filterInput.trim().toLowerCase())
        );
      });
      // console.log(cards.slice(0,this.showCount), this.showCount,222);
      return cards;
    },
  },
  methods: {
    pushHystory() {
      history.pushState(
        {},
        "",
        "?categories=" +
          this.selectedTags
            .map((t) => {
              return t.id;
            })
            .join(",") +
          "&search=" +
          this.filterInput
      );
    },
    changeFilterHandler() {
      this.showCount = 10;
      this.pushHystory();
    },
    // souldShowCard() {},

    tagClickHandler(tag) {
      let index = this.selectedTags.findIndex((t) => {
        return t.id === tag.id;
      });
      if (index >= 0) {
        this.selectedTags = this.selectedTags.filter((t) => {
          return t.id !== tag.id;
        });
      } else {
        this.selectedTags = [...this.selectedTags, tag];
      }
      this.pushHystory();
    },
    loadMoreButtonHandler() {
      this.showCount = this.showCount + 10;
      this.loadMoreCards();
    },
    async loadMoreCards() {
      let data = {
        categories: this.selectedTags.map((tag) => {
          return tag.id;
        }),
        page: null,
      };
      await this.$store.dispatch("LOAD_MORE_CARDS", data);
    },
    isActive(id) {
      if (
        this.selectedTags.find((tag) => {
          return tag.id === id;
        })
      ) {
        return true;
      } else {
        return false;
      }
    },
    getHystoryConfigs() {
      try{
const searchString = new URLSearchParams(window.location.search);
      const search = searchString.get("search");
      const categories = searchString.get("categories").split(",");
      // console.log(search, categories);
      this.filterInput = search;
      this.selectedTags = this.tags.filter((t) => {
        return categories.find((c) => {
          return +c === t.id;
        });
      });
      }catch{return true}
      
    },
  },
  watch: {
    selectedTags: function (val) {
      let data = {
        categories: val.map((tag) => {
          return tag.id;
        }),
        page: 1,
      };
      this.$store.dispatch("GET_CARDS", data);
    },
  },

  async mounted() {
    await this.$store.dispatch("GET_TAGS");
    this.selectedTags = this.tags;
    let data = {
      categories: this.tags.map((tag) => {
        return tag.id;
      }),
      page: 1,
    };
    await this.$store.dispatch("GET_CARDS", data);
    // console.log("tags", this.tags);
    // console.log("cards", this.cards);
    setInterval(() => {
      if (this.computedCards.length < this.showCount) {
        this.loadMoreCards();
      }
    }, 300);
    this.getHystoryConfigs();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  .home__tags {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 25px 0 5px 0;
  }
  .home__search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    padding: 0 10px;
    .home__input {
      margin: 0 5px;
      width: 100%;
      max-width: 400px;
      height: 30px;
      border: none;
      border-bottom: 1px solid rgb(216, 164, 31);
    }
  }
  .home__cards{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .home__button{
      padding: 8px 12px;
    // margin: 3px 5px;
    margin-bottom: 30px;
    font-size: 22px;
    border: 1px solid rgb(216, 164, 31);
    border-radius: 12px;
    background-color: rgba(230, 177, 45, 0.1);
    color: rgba(0, 0, 0, 0.542);
    transition: all 0.3s linear;
    &:hover{
      background-color: rgb(230, 178, 45);
    color: rgb(255, 255, 255)
    }
  }
}
</style>
