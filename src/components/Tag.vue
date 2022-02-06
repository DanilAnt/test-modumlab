<template>
  <div :class="{ active: isActive }" class="tag">
    {{ tag.name }}
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    tag: Object,
    isActive: Boolean,
  },
};
</script>

<style scoped lang="scss">
.tag {
    padding: 8px 12px;
    margin: 3px 5px;
    border: 1px solid rgb(216, 164, 31);
    border-radius: 12px;
    background-color: rgba(230, 177, 45, 0.1);
    color: rgba(0, 0, 0, 0.542);
    transition: all 0.3s linear;
}
.tag.active {
background-color: rgb(230, 178, 45);
    color: rgb(255, 255, 255)
}
</style>