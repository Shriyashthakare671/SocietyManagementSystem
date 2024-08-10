const express = require("express");
const cors = require("cors");
const utils = require("./utils");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Import and use route handlers
const adminRouter = require("./routes/admin");
const secretaryRouter = require("./routes/Secretary");
const societyRouter = require("./routes/society");
const amenitiesRouter = require("./routes/amenities");
const servicesRouter = require("./routes/services");
const announcementRouter = require("./routes/announcements")
const ownerRouter = require("./routes/owner")

app.use("/admin", adminRouter);
app.use("/secretary", secretaryRouter);
app.use("/society", societyRouter);
app.use("/amenities", amenitiesRouter);
app.use("/services", servicesRouter);
app.use("/announcements", announcementRouter)
app.use("/owner", ownerRouter)

const PORT = 9898;
app.listen(PORT, () => {
  console.log(`Server is running on http://51.210.156.152:${PORT}`);
});
