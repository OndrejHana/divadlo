import { AddEventFormObject, Event } from "@/types/event";

export async function dbGetEvents(): Promise<Event[]> {
    // TODO: Fetch events from the database

    const mockEvents: Event[] = [
        {
            id: 1,
            time: new Date("2021-10-01T12:00:00"),
            hall: {
                id: 1,
                name: "Main Hall",
                numberOfSeats: 100,
            },
            play: {
                id: 1,
                name: "The Phantom of the Opera",
                author: "Andrew Lloyd Webber",
                description:
                    "A disfigured musical genius, hidden away in the Paris Opera House, terrorizes the opera company for the unwitting benefit of a young protégée whom he trains and loves.",
                yearOfRelease: 1986,
            },
        },
        {
            id: 2,
            time: new Date("2021-10-01T18:00:00"),
            hall: {
                id: 1,
                name: "Main Hall",
                numberOfSeats: 100,
            },
            play: {
                id: 2,
                name: "The Lion King",
                author: "Elton John",
                description:
                    "Lion cub and future king Simba searches for his identity. His eagerness to please others and penchant for testing his boundaries sometimes gets him into trouble.",
                yearOfRelease: 1994,
            },
        },
        {
            id: 3,
            time: new Date("2021-10-02T12:00:00"),
            hall: {
                id: 1,
                name: "Main Hall",
                numberOfSeats: 100,
            },
            play: {
                id: 3,
                name: "Cats",
                author: "Andrew Lloyd Webber",
                yearOfRelease: 1981,
                description:
                    "A tribe of cats called the Jellicles must decide yearly which one will ascend to the Heaviside Layer and come back to a new Jellicle life.",
            },
        },
        {
            id: 4,
            time: new Date("2021-10-02T18:00:00"),
            hall: {
                id: 1,
                name: "Main Hall",
                numberOfSeats: 100,
            },
            play: {
                id: 4,
                name: "The Phantom of the Opera",
                description:
                    "A disfigured musical genius, hidden away in the Paris Opera House, terrorizes the opera company for the unwitting benefit of a young protégée whom he trains and loves.",
                yearOfRelease: 1986,
                author: "Andrew Lloyd Webber",
            },
        },
    ];

    return mockEvents;
}

export async function dbGetEvent(id: number): Promise<Event | null> {
    return null;
}

export async function dbAddEvent(event: AddEventFormObject): Promise<Event> {
}

export async function dbDeleteEvent(id: number): Promise<void> {
}
