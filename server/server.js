require("dotenv/config")
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
