<script>
</script>
<template>
  <section class="categories">
    <div class="container categoriesContaier">
      <div class="categorie">
        <img class="categorieImage" src="../assets/landingImage/CategoriesImg.jpg" alt="Categories">
        <p class="categoriesName">Осень <img src="../assets/landingImage/LeftMore.svg" alt="More"></p>
      </div>
      <div class="categorie">
        <img class="categorieImage" src="../assets/landingImage/CategoriesImg.jpg" alt="Categories">
        <p class="categoriesName">Зима <img src="../assets/landingImage/LeftMore.svg" alt="More"></p>
      </div>
      <div class="categorie">
        <img class="categorieImage" src="../assets/landingImage/CategoriesImg.jpg" alt="Categories">
        <p class="categoriesName">Весна <img src="../assets/landingImage/LeftMore.svg" alt="More"></p>
      </div>
      <div class="categorie">
        <img class="categorieImage" src="../assets/landingImage/CategoriesImg.jpg" alt="Categories">
        <p class="categoriesName">Лето <img src="../assets/landingImage/LeftMore.svg" alt="More"></p>
      </div>
    </div>
  </section>
</template>
<style>
  .categoriesContaier{
    padding-bottom: 80px !important; 
    display: flex;
    gap: 8px;
  }
  .categorie{
    cursor: pointer;
  }
  .categorieImage{
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .categoriesName{
    margin-top: 15px;
    font-weight: 600;
    color: #123026;
  }
</style>