import { 
    AddHallFormObject, 
    Hall, 
    UpdateHallFormObject 
} from "@/types/hall";

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
if(!supabaseUrl || !supabaseKey) { throw new Error('Supabase URL or key is missing.') }
const supabase = createClient(supabaseUrl, supabaseKey)

export async function dbGetHalls(): Promise<Hall[]> {
    // select hall data from the database
    const { data, error } = await supabase
        .from('hall')
        .select('*');

    if(data === null) { throw new Error("Error getting halls");}
    const halls: Hall[] = data?.map((hall: any) => {
        const Hall: Hall = {
            id: hall.id,
            name: hall.name,
            numberOfSeats: hall.number_of_seats,
        }
        return Hall
    }) 
    return halls
}

export async function dbGetHall(id: number): Promise<Hall | undefined> {
    const { data, error } = await supabase
        .from('hall')
        .select('*')
        .eq('id', id)
        .limit(1);

    if (data) {
        const hall = data[0];
        return {
            id: hall.id,
            name: hall.name,
            numberOfSeats: hall.number_of_seats,
        };
    }
    else { throw new Error("Hall not found"); }
}

export async function dbAddHall(addHallData: AddHallFormObject): Promise<Hall> {
    console.log("já jsem tady");
    const { data, error } = await supabase
        .from('hall')
        .insert([
            {
                name: addHallData.name,
                number_of_seats: addHallData.numberOfSeats,
            }
        ])
        .select();

    if(error !== null || data === null) { throw new Error("Hall not added");}
    return {
        id: data[0].id,
        name: data[0].name,
        numberOfSeats: data[0].number_of_seats,
    };
}

export async function dbUpdateHall(
    updateHallData: UpdateHallFormObject,
): Promise<Hall> {
    const { data, error } = await supabase
        .from('hall')
        .update({
            name: updateHallData.name,
            number_of_seats: updateHallData.numberOfSeats,
        })
        .eq('id', updateHallData.id)
        .select();

    if (error) { throw new Error("Hall not updated");}
    return {
        id: updateHallData.id,
        name: updateHallData.name,
        numberOfSeats: updateHallData.numberOfSeats,
    };
}

export async function dbDeleteHall(id: number): Promise<void> {
    console.log("jsem tady");
    console.log(id);
    const { data, error } = await supabase
        .from('hall')
        .delete()
        .eq('id', id);
    if (error) {
        console.log(error);
        throw new Error("Hall not deleted");
    }
}
