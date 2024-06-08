DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS "like";
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS prompt;
DROP TABLE IF EXISTS profile;


CREATE TABLE profile
(
    profile_id               uuid                     not null,
    profile_activation_token char(32),
    profile_bio              varchar(200),
    profile_date_created     timestamp with time zone not null,
    profile_email            varchar(256)             not null unique,
    profile_full_name        varchar(40)              not null,
    profile_image            varchar(255),
    profile_hash             char(97)                 not null,
    profile_username         varchar(32)              not null unique,
    Primary Key (profile_id)
);


CREATE TABLE prompt(
prompt_id uuid not null,
prompt_body varchar(128) not null,
prompt_category varchar(32) not null,
Primary Key (prompt_id)
);

CREATE TABLE post (
post_id uuid not null,
post_profile_id uuid not null,
post_prompt_id uuid not null,
post_body varchar(200),
post_date timestamp with time zone not null,
post_image varchar,
Primary Key (post_id),
Foreign Key (post_profile_id) references profile(profile_id),
Foreign Key (post_prompt_id) references prompt(prompt_id)
);
Create Index on post(post_profile_id);
Create Index on post(post_prompt_id);

CREATE TABLE follow(
following_profile_id uuid not null,
followed_profile_id uuid not null,
follow_date_created timestamp with time zone not null,
Primary Key (following_profile_id, followed_profile_id),
Foreign Key (following_profile_id) references profile(profile_id),
Foreign Key (followed_profile_id) references profile(profile_id)
);
Create Index on follow(following_profile_id);
Create Index on follow(followed_profile_id);

CREATE TABLE  "like" (
like_post_id uuid not null,
like_profile_id uuid not null,
like_date timestamp with time zone not null,
Primary Key (like_post_id, like_profile_id),
Foreign Key (like_post_id) references post(post_id),
Foreign Key (like_profile_id) references profile(profile_id)
);
Create Index on "like"(like_post_id);
Create Index on "like"(like_profile_id);


CREATE TABLE notification (
notification_like_post_id uuid not null,
notification_profile_id uuid not null,
notification_like_profile_id uuid not null,
notification_date timestamp with time zone not null,
notification_read boolean not null,
Primary Key (notification_like_post_id, notification_profile_id, notification_like_profile_id),
Foreign Key (notification_profile_id) references profile(profile_id),
Foreign Key (notification_like_profile_id, notification_like_post_id) references "like"(like_profile_id, like_post_id)
);
Create Index on notification(notification_profile_id);
Create Index on notification(notification_like_profile_id, notification_like_post_id);

-- ALTER TABLE profile ALTER COLUMN profile_full_name TYPE varchar(40);
-- ALTER TABLE profile ALTER COLUMN profile_username TYPE varchar(32);
-- ALTER TABLE profile ALTER COLUMN profile_email TYPE varchar(256);