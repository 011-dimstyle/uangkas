import Database, { type QueryResult } from "@tauri-apps/plugin-sql"

export async function initdb(){
    const conn = await Database.load("sqlite:listname.db")
    conn.execute(`
        CREATE TABLE bill (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )    
    `)
    conn.close()
}

export async function readalldb(db: string, table: string , condition: string = ""): Promise<QueryResult>{
    const conn = await Database.load(`sqlite:${db}`)
    const result = await conn.execute(`
        SELECT * FROM ${table} 
        ${condition? `WHERE ${condition}` : ""}    
    `)
    
    conn.close();
    return result;
}
