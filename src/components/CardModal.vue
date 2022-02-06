<template>
  <div class="cardModal" @click="closeModal" data-modal="close">
    <div class="cardModal__container">
      <div class="cardModal__close" data-modal="close"></div>
      <div class="cardModal__picture">
        <img class="cardModal__img" :src="image" alt="" />
      </div>
      <div class="cardModal__content">
        <div class="cardModal__name" v-html="name"></div>
        <div class="cardModal__description" v-html="description"></div>
        <div
          class="cardModal__author"
          v-html="author + ', ' + year + 'г.'"
        ></div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "CardModal",

  props: {
    image: String,
    name: String,
    description: String,
    author: String,
    year: String,
  },
  data() {
    return {};
  },
  methods: {
    closeModal(e) {
    //   console.log("e", e);
      if (e.target.getAttribute("data-modal") === "close") {
        this.$emit("closeModal");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.cardModal {
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  padding: 30px 20px;
  .cardModal__container {
    display: flex;
    margin: 0 auto;
    padding: 25px 20px;
    border-radius: 25px;
    max-width: 800px;
    position: relative;
    overflow-y: scroll;
     @media (max-width:576px){
    flex-direction: column;
  }
    &::-webkit-scrollbar {
      /* chrome based */
      width: 0px; /* ширина scrollbar'a */
      background: transparent; /* опционально */
    }

    background-color: rgba(255, 255, 255, 0.9);
    color: black;
  }
  .cardModal__close {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 15px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
    &:hover {
      opacity: 1;
    }
    &::before,
    &::after {
      position: absolute;
      left: 15px;
      content: "";
      height: 33px;
      width: 2px;
      background-color: #333;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
  .cardModal__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 25px;
    @media (max-width:576px){
   margin-left: 0;
  }
    .cardModal__name {
      font-size: 25px;
      font-weight: bold;
      color: rgb(216, 164, 31);
      margin-bottom: 10px;
      margin-right: 30px;
    }
    .cardModal__description {
      margin-bottom: 15px;
      text-align: justify;
      padding: 0 3px;
      line-height: 1.5;
      word-break: break-word;
    }
    .cardModal__author {
      padding-bottom: 25px;
    }
  }
  .cardModal__picture {
    min-width: 35%;
    height: 100%;
     @media (max-width:576px){
    height: 300px;
    margin-bottom: 20px;
  }
    .cardModal__img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>