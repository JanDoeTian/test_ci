## Trigger

```
create trigger on_auth_user_created
after insert on auth.users for each row execute procedure public.handle_new_user();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin

    INSERT INTO public.User (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;  -- Avoid inserting duplicate users

    return new;
end;
$$;
```
