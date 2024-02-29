require("dotenv/config")
const mysql = require("mysql")
const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library")
const app = express()

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
)
app.use(express.json())

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_schema",
})

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    return { payload: ticket.getPayload() }
  } catch (error) {
    return { error: "Unable to find user account. Please try again" }
  }
}

app.get("/seed-employees", (req, res) => {
  try {
    const deleteQuery = "DELETE FROM Employees "

    const query = `INSERT INTO employee_schema.Employees (name, email, role, department) VALUES
  ('John Doe', 'john.doe@example.com', 'Manager', 'HR'),
  ('Jane Smith', 'jane.smith@example.com', 'Developer', 'IT'),
    ('Michael Johnson', 'michael.johnson@example.com', 'Analyst', 'Finance'),
    ('Emily Williams', 'emily.williams@example.com', 'Designer', 'Marketing'),
    ('Christopher Brown', 'christopher.brown@example.com', 'Engineer', 'Engineering'),
    ('Jessica Garcia', 'jessica.garcia@example.com', 'Accountant', 'Finance'),
    ('David Martinez', 'david.martinez@example.com', 'Sales Associate', 'Sales'),
    ('Jennifer Rodriguez', 'jennifer.rodriguez@example.com', 'HR Assistant', 'HR'),
    ('Daniel Hernandez', 'daniel.hernandez@example.com', 'Quality Assurance', 'IT'),
    ('Lisa Gonzalez', 'lisa.gonzalez@example.com', 'Marketing Coordinator', 'Marketing'),
    ('Matthew Perez', 'matthew.perez@example.com', 'Customer Support', 'Support'),
    ('Ashley Wilson', 'ashley.wilson@example.com', 'Operations Manager', 'Operations'),
    ('Joshua Taylor', 'joshua.taylor@example.com', 'Business Analyst', 'Finance'),
    ('Amanda Anderson', 'amanda.anderson@example.com', 'Software Engineer', 'IT'),
    ('James Thomas', 'james.thomas@example.com', 'Product Manager', 'Product Management');`

    database.query(deleteQuery)
    database.query(query)

    res.status(200).send("Seeded successfully")
  } catch (error) {
    res.status(500).send("Error reseeding data")
  }
})

// Fetches all employees
app.get("/employees", (req, res) => {
  const query = "SELECT * FROM Employees"

  database.query(query, (error, data) => {
    if (error) return res.json(error)
    return res.json(data)
  })
})

// Deletes a employee
app.delete("/employee/:id", (req, res) => {
  const id = req.params.id
  const query = "DELETE FROM Employees WHERE id = ?"

  database.query(query, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Error deleting employee" })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" })
    }
    return res.status(200).json({ message: "Employee deleted successfully" })
  })
})

// Modify's an existing employee
app.put("/employee/:id", (req, res) => {
  const id = req.params.id
  const { name, email, role, department } = req.body

  if (!name || !email || !role || !department) {
    return res
      .status(400)
      .json({ error: "Please provide the name, email, role, and department." })
  }

  const query =
    "UPDATE Employees SET name = ?, email = ?, role = ?, department = ? WHERE id = ?"

  database.query(
    query,
    [name, email, role, department, id],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error updating employee information" })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Employee not found" })
      }
      return res
        .status(200)
        .json({ message: "Employee information updated successfully" })
    }
  )
})

// Adds a new employee
app.post("/employee", (req, res) => {
  const { name, department, role, email } = req.body

  if (!name || !department || !role || !email) {
    return res.status(400).json({
      error:
        "Please provide name, department, role, and email for the employee",
    })
  }

  const query =
    "INSERT INTO Employees (name, department, role, email) VALUES (?, ?, ?, ?)"

  database.query(query, [name, department, role, email], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Error adding employee" })
    }
    return res.status(200).json({
      message: "Employee added successfully",
      employeeId: result.insertId,
    })
  })
})
// Authenticates the user with Google
app.post("/authenticate", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential)

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        })
      }

      const user = verificationResponse?.payload
      const { given_name, family_name, email } = user

      res.status(201).json({
        message: "Register success!",
        user: {
          firstName: given_name,
          lastName: family_name,
          email: email,
          token: jwt.sign({ email: email }, process.env.JWT_TOKEN, {
            expiresIn: "1d",
          }),
        },
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    })
  }
})

app.listen("5152", () => console.log("Server running on port 5152"))
