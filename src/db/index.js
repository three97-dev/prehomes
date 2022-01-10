const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

pool.connect(err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Successfully connected to host");
  }
});

const getSavedProjects = async ({ user_identification }) => {
  try {
    const query = `SELECT * FROM saved_projects WHERE user_identification = $1`;
    const result = await pool.query(query, [user_identification]);

    return result.rows;
  } catch (err) {
    console.log(err.stack);
  }
};

const saveProject = async ({ user_identification, project_contentful_id }) => {
  try {
    const values = [user_identification, project_contentful_id];

    const queryCheck = `SELECT * FROM saved_projects WHERE user_identification = $1 AND project_contentful_id = $2`;
    const checkResult = await pool.query(queryCheck, values);

    if (checkResult.rowCount !== 0) {
      return checkResult.rows;
    }

    const query = `INSERT INTO saved_projects(user_identification, project_contentful_id) VALUES ($1, $2)`;
    const result = await pool.query(query, values);

    return result.rows;
  } catch (err) {
    console.log(err.stack);
  }
};

const deleteProject = async ({ user_identification, project_contentful_id }) => {
  try {
    const values = [user_identification, project_contentful_id];

    const queryCheck = `SELECT * FROM saved_projects WHERE user_identification = $1 AND project_contentful_id = $2`;
    const checkResult = await pool.query(queryCheck, values);

    if (checkResult.rowCount === 0) {
      return;
    }

    const query = `DELETE FROM saved_projects WHERE user_identification = $1 AND project_contentful_id = $2`;
    await pool.query(query, values);
  } catch (err) {
    console.log(err.stack);
  }
};

const getSavedFloorPlans = async ({ user_identification }) => {
  try {
    const query = `SELECT * FROM saved_floor_plans WHERE user_identification = $1`;
    const result = await pool.query(query, [user_identification]);

    return result.rows;
  } catch (err) {
    console.log(err.stack);
  }
};

const saveFloorPlan = async ({ user_identification, project_contentful_id, floor_plan_contentful_id }) => {
  try {
    const values = [user_identification, project_contentful_id, floor_plan_contentful_id];

    const queryCheck = `SELECT * FROM saved_floor_plans WHERE user_identification = $1 AND project_contentful_id = $2 AND floor_plan_contentful_id = $3`;
    const checkResult = await pool.query(queryCheck, values);

    if (checkResult.rowCount !== 0) {
      return checkResult.rows;
    }

    const query = `INSERT INTO saved_floor_plans(user_identification, project_contentful_id, floor_plan_contentful_id) VALUES ($1, $2, $3)`;
    const result = await pool.query(query, values);

    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

const deleteFloorPlan = async ({ user_identification, project_contentful_id, floor_plan_contentful_id }) => {
  try {
    const values = [user_identification, project_contentful_id, floor_plan_contentful_id];

    const queryCheck = `SELECT * FROM saved_floor_plans WHERE user_identification = $1 AND project_contentful_id = $2 AND floor_plan_contentful_id = $3`;
    const checkResult = await pool.query(queryCheck, values);

    if (checkResult.rowCount === 0) {
      return;
    }

    const query = `DELETE FROM saved_floor_plans WHERE user_identification = $1 AND project_contentful_id = $2 AND floor_plan_contentful_id = $3`;
    await pool.query(query, values);
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = {
  getSavedProjects,
  getSavedFloorPlans,
  saveProject,
  deleteProject,
  saveFloorPlan,
  deleteFloorPlan,
};
