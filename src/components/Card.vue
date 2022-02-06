<template>
  <div class="card">
    <div class="card__container" @click="cardClickHandler">
      <div class="card__name" v-html="name"></div>
      <div
        class="card__description"
        v-html="
          description.split('.')[0].length > 100
            ? description.split('.')[0] + '.'
            : description.split('.')[0] + '.' + description.split('.')[1] + '.'
        "
      ></div>
      <div class="card__author" v-html="author + ', ' + year + 'г.'"></div>
      <CardModal
        @close-modal="closeModal"
        v-if="showModal"
        :image="card.image"
        :name="name"
        :description="description"
        :author="author"
        :year="year"
      />
    </div>
  </div>
</template>

<script>
import CardModal from "./CardModal.vue";
export default {
  name: "Card",

  components: {
    CardModal,
  },
  props: {
    card: Object,
    isActive: Boolean,
    search: String,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    cardClickHandler() {
      this.showModal = true;
    },
    closeModal() {
      setTimeout(() => {
        this.showModal = false;
      }, 0);
    },
    markText(text, search) {
      let cardStr = text;
      let startIndex = cardStr.toLowerCase().indexOf(search);
      let length = search.length;

      //   console.log("startIndex", startIndex, length);
      if (startIndex >= 0 && length > 0) {
        cardStr = cardStr.split("");

        cardStr.splice(startIndex + length, 0, "</mark>");
        cardStr.splice(startIndex, 0, "<mark>");
        // console.log('afterSplice', cardStr);
        cardStr = cardStr.join("");
      }
      return cardStr;
    },
  },
  computed: {
    name() {
      return this.markText(this.card.name, this.search);
    },
    description() {
      return this.markText(this.card.description, this.search);
    },
    author() {
      return this.markText(this.card.author, this.search);
    },
    year() {
      return this.markText(this.card.year, this.search);
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  padding: 0 15px;
  width: 33%;
  margin-bottom: 25px;
  @media (max-width:992px){
    width: 50%;
    padding: 0 8px;
  }
  @media (max-width:576px){
    width: 100%;
  }
  
  .card__container {
    border-radius: 15px;
    border: 2px solid rgb(216, 164, 31);
    padding: 15px 12px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .card__name {
    font-size: 20px;
    font-weight: bold;
    color: rgb(216, 164, 31);
    margin-bottom: 10px;
  }
  .card__description {
    margin-bottom: 15px;
    text-align: justify;
    padding: 0 3px;
   word-break: break-word;
  }
}
</style>