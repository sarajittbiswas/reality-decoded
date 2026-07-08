DROP TABLE IF EXISTS videos;

CREATE TABLE videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    category TEXT DEFAULT 'Documentary',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO videos (title, description, youtube_id) 
VALUES ('The Silicon Horizon', 'An immersive investigation into the rapid advancement of neural networks.', 'dQw4w9WgXcQ');