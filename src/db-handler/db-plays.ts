import { supabase } from "@/lib/supabase";
import { AddPlayFormObject, Play, UpdatePlayFormObject } from "@/types/play";

export async function dbGetPlays(): Promise<Play[]> {
    const { data, error } = await supabase.from("play").select("*");

    if (data === undefined) return [];
    if (error !== null) {
        throw new Error(error.message);
    }

    const plays: Play[] = (
        data as {
            id: number;
            description: string;
            name: string;
            author: string;
            yearOfRelease: number;
        }[]
    ).map((play: any) => {
        const Play: Play = {
            id: play.id,
            name: play.name,
            description: play.description,
            yearOfRelease: play.year_of_release,
            author: play.author,
        };
        return Play;
    });
    return plays;
}

export async function dbGetPlay(id: number): Promise<Play | undefined> {
    const { data, error } = await supabase
        .from("play")
        .select("*")
        .eq("id", id);

    if (data === undefined || data?.length === 0) return undefined;
    if (error !== null) {
        throw new Error(error.message);
    }

    const play: Play = {
        id: data[0].id,
        name: data[0].name,
        description: data[0].description,
        yearOfRelease: data[0].year_of_release,
        author: data[0].author,
    };

    return play;
}

export async function dbAddPlay(addPlayData: AddPlayFormObject): Promise<Play> {
    const { data, error } = await supabase
        .from("play")
        .insert([
            {
                name: addPlayData.name,
                description: addPlayData.description,
                year_of_release: addPlayData.yearOfRelease,
                author: addPlayData.author,
            },
        ])
        .select();

    if (data === undefined) {
        throw new Error("Error adding play");
    }
    if (error !== null) {
        throw new Error(error.message);
    }

    const play: Play = {
        id: data[0].id,
        name: data[0].name,
        description: data[0].description,
        yearOfRelease: data[0].year_of_release,
        author: data[0].author,
    };

    return play;
}

export async function dbUpdatePlay(
    updatePlayData: UpdatePlayFormObject,
): Promise<Play> {
    const { data, error } = await supabase
        .from("play")
        .update({
            name: updatePlayData.name,
            description: updatePlayData.description,
            year_of_release: updatePlayData.yearOfRelease,
            author: updatePlayData.author,
        })
        .eq("id", updatePlayData.id)
        .select();

    if (data === undefined) {
        throw new Error("Error updating play");
    }
    if (error !== null) {
        throw new Error(error.message);
    }

    const play: Play = {
        id: data[0].id,
        name: data[0].name,
        description: data[0].description,
        yearOfRelease: data[0].year_of_release,
        author: data[0].author,
    };

    return play;
}

export async function dbDeletePlay(id: number): Promise<void> {
    const { error } = await supabase.from("play").delete().eq("id", id);

    if (error !== null) {
        throw new Error(error.message);
    }
}
