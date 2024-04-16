-- function to create a user in the Visitor table when a user is created in the auth.users table
-- DECLARE
--   user_id_var int;
--   person_id_var int;
--   email_var varchar(255);
-- BEGIN
--    SELECT INTO email_var, user_id_var
--       email, id
--    FROM Event
--    ORDER BY id DESC
--    LIMIT 1;

--     INSERT INTO Person (first_name, last_name)
--     VALUES ('', '');

--     SELECT INTO person_id_var
--       id
--     FROM Person
--     ORDER BY id DESC
--     LIMIT 1;

--     INSERT INTO Visitor (id, email, user_id)
--     VALUES (person_id_var, email_var, user_id_var);
-- END;


-- -- SQL Triggers
-- CREATE FUNCTION trigger_create_user() RETURNS trigger AS $$
-- BEGIN
--   PERFORM create_user();
--   RETURN NULL;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER trigger_on_users
-- AFTER INSERT ON auth.users
-- FOR EACH ROW
-- EXECUTE PROCEDURE trigger_create_user();
