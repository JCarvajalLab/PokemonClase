const { createApp } = Vue;

createApp({
    data() {
        return {
            pokemons: [],
            loading: false,
            error: null
        };
    },
    methods: {
        async fetchPokemons() {
            this.loading = true;  // Inicia el estado de carga
            this.error = null;    // Resetea el mensaje de error
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                
                // Obtener detalles de cada Pokémon
                this.pokemons = await Promise.all(data.results.map(async (pokemon) => {
                    const pokemonResponse = await fetch(pokemon.url);
                    return pokemonResponse.json();
                }));
            } catch (error) {
                this.error = 'Error al cargar los Pokémon: ' + error.message;
            } finally {
                this.loading = false; // Finaliza el estado de carga
            }
        }
    }
}).mount('#app');