
CREATE TABLE IF NOT EXISTS bicis (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL 
);
INSERT INTO usuarios (username, password) VALUES ('lauu', 'churrito');
INSERT INTO usuarios (username, password) VALUES ('churro', 'lauu');