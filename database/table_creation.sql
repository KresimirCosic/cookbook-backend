CREATE TABLE user (
	user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(256) NOT NULL,
    date_registered DATETIME NOT NULL,
    verified BOOL NOT NULL DEFAULT 0,
    last_login DATETIME,
    login_session_key VARCHAR(256),
    PRIMARY KEY (user_id)
);

CREATE TABLE measure (
	measure_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    PRIMARY KEY (measure_id)
);

CREATE TABLE ingredient_measure (
	ingredient_measure_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    measure_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (ingredient_measure_id),
    FOREIGN KEY (measure_id) REFERENCES measure(measure_id)
);

CREATE TABLE user_ingredient (
	user_ingredient_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    ingredient_measure_id INT UNSIGNED NOT NULL,
    amount_available INT NOT NULL,
    PRIMARY KEY (user_ingredient_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (ingredient_measure_id) REFERENCES ingredient_measure(ingredient_measure_id)
);

CREATE TABLE recipe_user (
	recipe_user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    recipe_name VARCHAR(256) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (recipe_user_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE recipe_ingredient (
	recipe_ingredient_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    recipe_user_id INT UNSIGNED NOT NULL,
    ingredient_measure_id INT UNSIGNED NOT NULL,
    amount_required INT UNSIGNED NOT NULL,
    PRIMARY KEY (recipe_ingredient_id),
    FOREIGN KEY (recipe_user_id) REFERENCES recipe_user(recipe_user_id),
    FOREIGN KEY (ingredient_measure_id) REFERENCES ingredient_measure(ingredient_measure_id)
);