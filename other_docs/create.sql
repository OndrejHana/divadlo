drop TABLE Address, Hall, Person, Actor, Visitor, Play, Event, Casting, Ticket;

CREATE TABLE Address (
  id SERIAL PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  house_number INT NOT NULL,
  zip_code VARCHAR(10) NOT NULL
);

CREATE TABLE Person (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
);

-- Create Actor table
CREATE TABLE Actor (
  id INT PRIMARY KEY REFERENCES Person(id),
  description VARCHAR(255)
);

-- Create Visitor table
CREATE TABLE Visitor (
  id INT PRIMARY KEY REFERENCES Person(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address_id INT REFERENCES Address(id),
  user_id VARCHAR(255) UNIQUE NOT NULL;
);

-- Create Play table
CREATE TABLE Play (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  description VARCHAR(255),
  year_of_release INT,
  duration_minutes INT
);

-- Create Hall table
CREATE TABLE Hall (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  number_of_seats INT NOT NULL
);

-- Create Event table
CREATE TABLE Event (
  id SERIAL PRIMARY KEY,
  time TIMESTAMP NOT NULL,
  description VARCHAR,
  play_id INT REFERENCES Play(id),
  hall_id INT REFERENCES Hall(id) NOT NULL
);

-- Create Casting table
CREATE TABLE Casting (
  character VARCHAR(255),
  actor_id INT REFERENCES Actor(id) NOT NULL,
  event_id INT REFERENCES Event(id) NOT NULL,
  PRIMARY KEY (actor_id, event_id)
);

-- Create Ticket table
CREATE TABLE Ticket (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES Event(id) NOT NULL,
  visitor_id INT REFERENCES Visitor(id),
  seat INT NOT NULL,
  price INT NOT NULL
);

CREATE UNIQUE INDEX play_name_idx ON play (name);
