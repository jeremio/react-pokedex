export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
        slot: number;
    }[];
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
        };
        is_hidden: boolean;
    }[];
    moves: {
        move: {
            name: string;
            url: string;
        };
    }[];
}

export interface PokemonSpecies {
    id: number;
    name: string;
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        };
    }[];
    habitat: {
        name: string;
    } | null;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
}
