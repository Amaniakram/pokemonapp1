// src/api/userAPI.ts

export interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
    favoritePokemon: string;
    team: string[];
  }
  
  const mockUsers: UserData[] = [
    {
      id: 1,
      name: "Ash Ketchum",
      username: "ashk",
      email: "ash@example.com",
      favoritePokemon: "Pikachu",
      team: ["Pikachu", "Charizard", "Bulbasaur", "Squirtle", "Snorlax", "Kingler"]
    },
    {
      id: 2,
      name: "Misty",
      username: "mistywater",
      email: "misty@example.com",
      favoritePokemon: "Starmie",
      team: ["Staryu", "Starmie", "Psyduck", "Togepi", "Corsola", "Gyarados"]
    },
    {
      id: 3,
      name: "Brock",
      username: "brockrock",
      email: "brock@example.com",
      favoritePokemon: "Onix",
      team: ["Onix", "Geodude", "Vulpix", "Crobat", "Ludicolo", "Marshtomp"]
    }
  ];
  
  export const retrieveUsers = (): Promise<UserData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 500);
    });
  };
  