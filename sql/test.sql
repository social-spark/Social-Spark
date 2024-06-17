
INSERT INTO prompt (prompt_id, prompt_category, prompt_body, prompt_date)
VALUES
(gen_random_uuid(), 'Entertainment', 'Discuss the impact of streaming services on traditional cable TV.', now()),
(gen_random_uuid(), 'Entertainment', 'How do you think virtual reality will change the future of entertainment?', now()),
(gen_random_uuid(), 'Fashion', 'What are the latest fashion trends for this season?', now()),
(gen_random_uuid(), 'Fashion', 'What role does sustainability play in the fashion industry today?', now()),
(gen_random_uuid(), 'Food', 'How has the rise of food delivery apps changed the restaurant industry?', now()),
(gen_random_uuid(), 'Food', 'Discuss the benefits of a plant-based diet.', now()),
(gen_random_uuid(), 'Health', 'What role does genetics play in personal health?', now()),
(gen_random_uuid(), 'Health', 'What are some natural remedies for common illnesses?', now()),
(gen_random_uuid(), 'Technology', 'How can technology help address climate change?', now()),
(gen_random_uuid(), 'Technology', 'How is technology transforming education?', now()),
(gen_random_uuid(), 'Travel', 'What are the top destinations on your travel bucket list?', now()),
(gen_random_uuid(), 'Travel', 'What are some must-have items for any traveler?', now());

INSERT INTO profile (profile_id, profile_activation_token, profile_bio, profile_date_created, profile_email,
                     profile_full_name, profile_image, profile_hash, profile_username)
values (gen_random_uuid(), '1234567890abcdef1234567890abcdef', 'Im a full-stack developer', now(),'smendez22@cnm.edu',
        'Monica Mendez', 'https://example.com/avatar.jpg', '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1','myblahblah');


SELECT profile_id, profile_bio, profile_image, profile_full_name, profile_date_created, profile_username FROM profile
WHERE profile_id = '1c2240b0-13b2-443e-9be7-ab020d41a565';

INSERT INTO post (post_id, post_image, post_body, post_date, post_profile_id, post_prompt_id)
VALUES (gen_random_uuid(), 'https://example.com/image.jpg', 'How has the music industry changed with the rise of digital platforms?',  now(), 'f3c1b16d-8904-46fd-b9d3-03fb4553eebe', 'dfd2a246-c563-4564-ba51-c62c6c59220c');