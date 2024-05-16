document.addEventListener('DOMContentLoaded', async () => {
  const recipesContainer = document.getElementById('recipes')
  recipesContainer.addEventListener('click', async e => {
    if (e.target.tagName === 'BUTTON' && e.target.dataset['idRecipe']) {
      const res = await fetch(
        `http://localhost:8080/api/recipe/${e.target.dataset['idRecipe']}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      resfreshList()
    }
  })

  document.forms['add-form'].addEventListener('submit', async function (e) {
    e.preventDefault()
    const res = await fetch('http://localhost:8080/api/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.name.value,
        description: this.description.value,
        instruction: this.instruction.value,
        videourl: this.videourl.value,
      }),
    })

    if (res.ok) {
      await resfreshList()

      this.name.value = ''
      this.description.value = ''
      this.instruction.value = ''
      this.videourl.value = ''
    }
  })
  await resfreshList()
})

async function resfreshList() {
  const recipesContainer = document.getElementById('recipes')

  const data = await (await fetch('http://localhost:8080/api/recipe')).json()

  if (data.length) {
    recipesContainer.innerHTML = ''
    data.forEach(recipe => {
      const recipeItem = document.createElement('li')
      recipeItem.classList.add('recipe__item')

      const recipeLink = document.createElement('a')
      recipeLink.textContent = recipe.name
      recipeLink.href = `recipe.html?id=${recipe._id}`

      const recipeDeleteButton = document.createElement('button')
      recipeDeleteButton.dataset['idRecipe'] = recipe._id
      recipeDeleteButton.textContent = 'Видалити'
      recipeDeleteButton.style.marginLeft = '10px'
      recipeItem.append(recipeLink)
      recipeItem.append(recipeDeleteButton)
      recipesContainer.append(recipeItem)
    })
  } else {
    recipesContainer.innerHTML = '<p>Рецепти відсутні</p>'
  }
}
