-- Create new user(s) via the application to correctly hash the password and change the verified field to enable user to log in

-- Measures
INSERT INTO measures VALUES 
(null, 'gram'),
(null, 'milliliter'),
(null, 'piece');

-- Ingredient measures
INSERT INTO ingredient_measure VALUES 
(null, 'oil', 2),
(null, 'egg', 3),
(null, 'flour', 1),
(null, 'salt', 1);

-- User specific ingredients
INSERT INTO user_ingredient VALUES 
(null, 1, 1, 5000),
(null, 1, 2, 50),
(null, 1, 3, 10000),
(null, 1, 4, 500),
(null, 2, 1, 500),
(null, 2, 2, 25),
(null, 2, 3, 2500),
(null, 2, 4, 125);