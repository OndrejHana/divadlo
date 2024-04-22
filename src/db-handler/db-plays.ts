import { supabase } from "@/lib/supabase";
import { DbAddPlayFormObject, Play, UpdatePlayFormObject } from "@/types/play";
import { File } from "buffer";

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
            durationMinutes: number;
            playImage: string;
        }[]
    ).map((play: any) => {
        const Play: Play = {
            id: play.id,
            name: play.name,
            description: play.description,
            yearOfRelease: play.year_of_release,
            author: play.author,
            durationMinutes: play.duration_minutes,
            playImage: play.play_image,
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
        durationMinutes: data[0].duration_minutes,
        playImage: data[0].play_image,
    };

    return play;
}

export async function dbAddPlay(
    addPlayData: DbAddPlayFormObject,
): Promise<Play> {
    const { data, error } = await supabase
        .from("play")
        .insert([
            {
                name: addPlayData.name,
                description: addPlayData.description,
                year_of_release: addPlayData.yearOfRelease,
                author: addPlayData.author,
                duration_minutes: addPlayData.durationMinutes,
                play_image: addPlayData.playImage,
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
        durationMinutes: data[0].duration_minutes,
        playImage: data[0].play_image,
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
            duration_minutes: updatePlayData.durationMinutes,
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
        durationMinutes: data[0].duration_minutes,
        playImage: data[0].play_image,
    };

    return play;
}

export async function dbDeletePlay(id: number): Promise<void> {
    const { error } = await supabase.from("play").delete().eq("id", id);

    if (error !== null) {
        throw new Error(error.message);
    }
}

export async function uploadPlayImage(
    imageName: string,
    image: File,
): Promise<string> {
    const { data: imageData, error: imageError } = await supabase.storage
        .from("theatre-images")
        .upload(`public/plays/${imageName}`, image as any, { upsert: true });

    if (imageError) {
        throw new Error(imageError.message);
    }

    const { data } = supabase.storage
        .from("theatre-images")
        .getPublicUrl(imageData.path);

    return data.publicUrl;
}
