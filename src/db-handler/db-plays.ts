import { Play } from "@/types/play";

export async function getPlays(): Promise<Play[]> {
    return [
        {
            id: 1,
            name: "The Phantom of the Opera",
            description:
                "A disfigured musical genius, hidden away in the Paris Opera House, terrorizes the opera company for the unwitting benefit of a young protégée whom he trains and loves.",
            yearOfRelease: 1986,
            author: "Andrew Lloyd Webber",
        },
        {
            id: 2,
            name: "The Lion King",
            description:
                "Lion cub and future king Simba searches for his identity. His eagerness to please others and penchant for testing his boundaries sometimes gets him into trouble.",
            yearOfRelease: 1994,
            author: "Elton John",
        },
        {
            id: 3,
            name: "Cats",
            author: "Andrew Lloyd Webber",
            yearOfRelease: 1981,
            description:
                "A tribe of cats called the Jellicles must decide yearly which one will ascend to the Heaviside Layer and come back to a new Jellicle life.",
        },
    ];
}
