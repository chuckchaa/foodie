document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(document.location.search)
  const id = params.get('id')
  const data = await (
    await fetch(`http://localhost:8080/api/recipe/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json()

  refreshRecipe(data)

  const updateForm = document.forms['update-form']
  updateForm.addEventListener('submit', async function (e) {
    e.preventDefault()
    const data = await (
      await fetch(`http://localhost:8080/api/recipe/${id}`, {
        method: 'PUT',
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
    ).json()

    refreshRecipe(data)
  })
})

function refreshRecipe(recipe) {
  const recipeContainer = document.getElementById('recipe').querySelector('div')
  recipeContainer.innerHTML = `<section>
    <div class="container">
        <h2>${recipe.name}</h2>
        <p>${recipe.description}</p>
        <h3>Інструкція:</h3>
        <p>${recipe.instruction}</p>
    </div>
  </section>
  
  <section>
    <div class="container">
        <h2>Відео рецепту</h2>
        <iframe width="100%" height="315" src="${
          recipe.videourl.startsWith('https://www.youtube.com/embed/')
            ? recipe.videourl
            : 'https://www.youtube.com/embed/vQ8lF-OLl3s?si=Xiief1yvAzBAs5Y9'
        }"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
    </div>
  </section>`

  const updateForm = document.forms['update-form']
  updateForm.name.value = recipe.name
  updateForm.description.value = recipe.description
  updateForm.instruction.value = recipe.instruction
  updateForm.videourl.value = recipe.videourl
}
