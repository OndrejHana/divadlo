import { AddPlayFormObject, Play, UpdatePlayFormObject } from "@/types/play";

export async function dbGetPlays(): Promise<Play[]> {
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

export async function dbGetPlay(id: number): Promise<Play | undefined> {
    return {
        id: 1,
        name: "The Phantom of the Opera",
        description:
            "A disfigured musical genius, hidden away in the Paris Opera House, terrorizes the opera company for the unwitting benefit of a young protégée whom he trains and loves.",
        author: "Andrew Lloyd Webber",
        yearOfRelease: 1986,
    };
}

export async function dbAddPlay(addPlayData: AddPlayFormObject): Promise<Play> {
    return {
        id: 1,
        name: addPlayData.name,
        description: addPlayData.description,
        yearOfRelease: addPlayData.yearOfRelease,
        author: addPlayData.author,
    };
}

export async function dbUpdatePlay(
    updatePlayData: UpdatePlayFormObject,
): Promise<Play> {
    return {
        id: updatePlayData.id,
        name: updatePlayData.name,
        description: updatePlayData.description,
        yearOfRelease: updatePlayData.yearOfRelease,
        author: updatePlayData.author,
    };
}

export async function dbDeletePlay(id: number): Promise<void> {
    return;
}
