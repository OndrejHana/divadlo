-- Insert sample data into the tables;
insert into
  Address (city, street, house_number, zip_code)
values
  ('New York City', 'Main St.', 123, '10001'),
  ('Nová Paka', 'Partyzánská', 558, '50901'),
  ('Liberec', 'Na kopci', 111, '58799');


insert into
  Person (first_name, last_name)
values
  ('John', 'Doe'),
  ('Jane', 'Smith'),
  ('Michael', 'Jordan'),
  ('Pepa', 'Smith'),
  ('Gabriela', 'Jordan');


insert into
  Actor (description, id)
values
  ('Award-winning actor', 1),
  ('Rising star', 2);

insert into
  Visitor (id, email, phone, address_id, user_id)
values
  (3, 'johndoe@example.com', '+420732777888', 1, '93e523aa-3ae5-4d22-b2e5-67e0ff99d372'),
  (4, 'janesmith@example.com', '+420732777888', 2, 'd8b341de-0b1b-4527-ae98-6542f75d4ac5'),
  (5, 'michal.jordan@seznam.com', null, 3, '3413d0a0-305a-4f94-b2c5-eb500d2082d0');

insert into
  Play (
    name,
    author,
    description,
    year_of_release,
    duration_minutes
  )
values
  (
    'Hamlet',
    'William Shakespeare',
    'Classic tragedy',
    1603,
    180
  ),
  (
    'Sherlock Holmes',
    'Arthur Conan Doyle',
    'Detective mystery',
    1887,
    120
  ),
  (
    'The Comedy of Errors',
    'William Shakespeare',
    'Farcical comedy',
    1595,
    100
  );

insert into
  Hall (name, number_of_seats)
values
  ('Main Hall', 500),
  ('Studio Theatre', 100),
  ('Black Box Theatre', 80);

insert into
  event (time, description, play_id, hall_id)
values
  ('2024-05-10 19:00:00', 'Opening night', 1, 1),
  (
    '2024-05-11 15:00:00',
    'Matinee performance',
    1,
    1
  ),
  ('2024-05-12 19:00:00', 'Closing night', 2, 2);

insert into
  Casting (character, actor_id, event_id)
values
  ('Prince Hamlet', 1, 1),
  ('Claudius', 2, 1),
  ('Sherlock Holmes', 2, 3);

insert into
  Ticket (event_id, visitor_id, seat, price)
values
  (1, 3, 101, 50),
  (1, 4, 102, 50),
  (3, 5, 25, 30);
