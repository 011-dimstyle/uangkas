import Database, { type QueryResult } from "@tauri-apps/plugin-sql"

interface valuesdb{
    name: string, 
    amount: number
}

export async function initdb(tablename: string){
    const conn = await Database.load("sqlite:listname.db")
    await conn.execute(`
        CREATE TABLE ${tablename} (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            amount INTEGER NOT NULL
        )    
    `)
    conn.close()
}

export async function readalldb(tablename: string): Promise<QueryResult>{
    const conn = await Database.load("sqlite:listname.db")
    const result = await conn.execute(`
        SELECT * FROM ${tablename}   
    `)
    
    conn.close();
    return result;
}

export async function adddatadb(tablename: string, data: valuesdb){
    const conn = await Database.load("sqlite:listname.db");
    await conn.execute(`
        INSERT INTO ${tablename}(name, amount) 
        VALUES ("${data.name}",${data.amount})
    `)
    conn.close()
}
