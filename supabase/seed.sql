INSERT INTO
  auth.users (
    id,
    instance_id,
    ROLE,
    aud,
    email,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    encrypted_password,
    created_at,
    updated_at,
    last_sign_in_at,
    email_confirmed_at,
    confirmation_sent_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
  )
VALUES
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'fake_user@adgent.com',
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    crypt('Pa55word!', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );

INSERT INTO
  auth.identities (
    id,
    provider,
    provider_id,
    user_id,
    identity_data,
    last_sign_in_at,
    created_at,
    updated_at
  )
VALUES
  (
    (
      SELECT
        id
      FROM
        auth.users
      WHERE
        email = 'fake_user@adgent.com'
    ),
    'email',
    (
      SELECT
        id
      FROM
        auth.users
      WHERE
        email = 'fake_user@adgent.com'
    ),
        (
      SELECT
        id
      FROM
        auth.users
      WHERE
        email = 'fake_user@adgent.com'
    ),
    json_build_object(
      'sub',
      (
        SELECT
          id
        FROM
          auth.users
        WHERE
          email = 'fake_user@adgent.com'
      )
    ),
    NOW(),
    NOW(),
    NOW()
  );