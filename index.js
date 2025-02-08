import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import scanRoutes from "./src/routes/scanRoutes.js";
import scanDataRoutes from "./src/routes/scanDataRoutes.js";
import setupSwagger from "./src/config/swagger.js";

const app = express();

// JSON parsing
app.use(express.json());
// Swagger setup
setupSwagger(app);

app.use("/users", userRoutes);
app.use("/scan", scanRoutes);
app.use(scanDataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
