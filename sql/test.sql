insert into public.profile (profile_id, profile_activation_token, profile_bio, profile_date_created, profile_email,
                            profile_full_name, profile_image, profile_hash, profile_user_name) values (gen_random_uuid(), '1234567890abcdef1234567890abcdef', 'Im a full-stack developer', now(),'jamie@gmail.com',
    'Monica Mendez', 'https://example.com/avatar.jpg', '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1','mmendez');