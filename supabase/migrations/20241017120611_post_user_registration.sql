set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin

    insert into "public"."User" (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;  -- Avoid inserting duplicate users

    return new;
end;
$function$
;


create trigger on_auth_user_created
after insert on auth.users for each row execute procedure public.handle_new_user();
