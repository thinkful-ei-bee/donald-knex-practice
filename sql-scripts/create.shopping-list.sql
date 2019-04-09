DROP TYPE IF EXISTS category;

CREATE TYPE category as ENUM (
    'Main',
    'Snack',
    'Lunch',
    'Breakfast'
);

CREATE TABLE IF NOT EXISTS shopping_list (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price NUMERIC(4,2) NOT NULL,
    date_added TIMESTAMP DEFAULT now() NOT NULL,
    checked BOOLEAN DEFAULT FALSE NOT NULL,
    category category NOT NULL
);