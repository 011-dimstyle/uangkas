use sqlx::{self ,SqlitePool};

#[tauri::command]
pub async fn init(db: &str, table: &str) -> Result<(), String>{
    let pool = match SqlitePool::connect(format!("sqlite:{}", db).as_str()).await{
        Ok(pool) => pool,
        Err(e) => return Err(e.to_string())
    };
    if let Err(e) = sqlx::query(format!("CREATE TABLE {} (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    )",table).as_str()).execute(&pool).await{
        return Err(e.to_string())
    };
    Ok(())
}
