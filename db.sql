CREATE TABLE saved_projects (
  id serial PRIMARY KEY,
  user_identification VARCHAR (50) NOT NULL,
  project_contentful_id VARCHAR (50) NOT NULL
);

CREATE INDEX ON saved_projects (user_identification);

CREATE TABLE saved_floor_plans (
  id serial PRIMARY KEY,
  user_identification VARCHAR (50) NOT NULL,
  project_contentful_id VARCHAR (50) NOT NULL,
  floor_plan_contentful_id VARCHAR (50) NOT NULL
);

CREATE INDEX ON saved_floor_plans (user_identification);