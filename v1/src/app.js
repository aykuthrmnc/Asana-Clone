import express, { json } from "express";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import config from "./config/index.js";
import { ProjectRoutes, UserRoutes, SectionRoutes, TaskRoutes } from "./routes/index.js";
import loaders from "./loaders/index.js";
import events from "./scripts/events/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "./middlewares/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config();
loaders();
events();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(json());
app.use(helmet());
app.use(fileUpload());

app.listen(process.env.APP_PORT, () => {
  console.log("Sunucu çalıştırıldı.");
  app.use("/projects", ProjectRoutes);
  app.use("/users", UserRoutes);
  app.use("/sections", SectionRoutes);
  app.use("/tasks", TaskRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: "Aradığınız sayfa bulunmamaktadır." });
  });

  //! ERROR HANDLER
  app.use(errorHandler);
});
