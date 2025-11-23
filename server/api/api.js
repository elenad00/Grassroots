import { otp_router } from "./routes/otp-routes.js";
import { oauth_router } from "./routes/oauth-routes.js";
import config from "../utils/config.js";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import constructLog from "../utils/logger.js";

const log = constructLog("API Core");

const api = express();

// Middleware
api.use(express.json());
api.use(helmet());
api.use(cors({
  origin: config.server.allowed_origin,
  methods: ["GET", "POST"]
}));

// Routes
api.use('/api/v1/auth/sign-in/oauth', oauth_router);
api.use('/api/v1/auth/sign-in/otp', otp_router);
// api.use('/api/v1/user', userRouter);
// api.use('/api/v1/artists', artistRouter);
// api.use('/api/v1/venues', venueRoutes);
// api.use('/api/v1/events', eventRoutes);

// Create Server
api.listen(config.server.port, () => {
  log.info("API listening on port "+config.server.port)
});