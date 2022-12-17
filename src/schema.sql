DROP TABLE IF EXISTS urlbindings;
-- CREATE TABLE IF NOT EXISTS comments (  id integer PRIMARY KEY AUTOINCREMENT,  author text NOT NULL,  body text NOT NULL,  post_slug text NOT NULL
-- );
-- CREATE INDEX idx_comments_post_slug ON comments (post_slug);

CREATE TABLE IF NOT EXISTS urlbindings (  id integer PRIMARY KEY AUTOINCREMENT,  expandedLink url NOT NULL );
CREATE INDEX idx_urlBingings ON urlbindings (expandedLink);
INSERT INTO URLBINDINGS (expandedLink) VALUES ("https://www.viranchee.com")
-- Optionally, uncomment the below query to create data

-- INSERT INTO COMMENTS (author, body, post_slug) VALUES ("Kristian", "Great post!", "hello-world");
