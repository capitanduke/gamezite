export interface Game {
    background_image: string;
    name: string;
    id: number,
    released: string;
    metacritic_url: string;
    website: string;
    description_raw: string;
    developers: Array<Developers>;
    metacritic: number;
    genres: Array<Genre>;
    parent_platforms: Array<ParentPlatform>;
    publishers: Array<Publishers>;
    ratings: Array<Rating>;
    screenshots: Array<Screenshots>;
  }

  export interface GameTrailer {
    results: Array<Trailer>;
  }
  
  export interface APIResponse<T> {
      results: Array<T>;
      next: string;
      previous: string;
  }
  
  interface Genre {
    name: string;
  }

  interface Developers {
    name: string
  }
  
  interface ParentPlatform {
    platform: {
      slug: string;
    };
  }
  
  interface Publishers {
    name: string;
  }
  
  interface Rating {
    id: number;
    count: number;
    title: string;
  }
  
  interface Screenshots {
    image: string;
  }
  
  interface Trailer {
    data: {
      max: string;
    };
    preview: string;
  } 