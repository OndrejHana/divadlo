-- INSERT STORAGE
((bucket_id = 'theatre-images'::text) AND ((storage.foldername(name))[1] = 'public'::text) AND (SELECT
        CASE
            WHEN (EXISTS ( SELECT 1
               FROM visitor visitor_1
              WHERE ((visitor_1.user_id = auth.uid()) AND (visitor_1.role = 'Admin'::role)))) THEN true
            ELSE false
        END AS "case"
   FROM visitor
 LIMIT 1))

