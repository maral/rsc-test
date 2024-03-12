import { types } from 'react-bricks/rsc'

interface PokemonProps {
  id: number
  name: string
  height: number
  weight: number
  imageUrl: string
}

const Pokemon: types.Brick<PokemonProps> = ({
  id,
  name,
  height,
  weight,
  imageUrl,
}) => {
  if (!id || !name || !height || !weight || !imageUrl) {
    return (
      <div className="text-center text-red-500 underline text-xl">
        Pokemon not found!
      </div>
    )
  }
  return (
    <div className="container max-w-3xl mx-auto">
      <img src={imageUrl} alt={name} className="mx-auto w-36 mb-4" />

      <h1 className="text-5xl font-extrabold text-center mb-6">{name}</h1>

      <p className="text-center">
        #{id} - Height {height / 10} m - Weight {weight / 10} Kg
      </p>
    </div>
  )
}

Pokemon.schema = {
  name: 'pokemon',
  label: 'Pokemon',
  getData: async (page) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${page.slug}`
    )
    const data = await response.json()

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      imageUrl: `https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
    }
  },

  // Sidebar Edit controls for props
  sideEditProps: [],
}

export default Pokemon
