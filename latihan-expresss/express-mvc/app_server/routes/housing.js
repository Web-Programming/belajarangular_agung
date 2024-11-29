const express = require("express");
const router = express.Router();
const housingController = require("../controllers/controllerHousing");
// Fungsi dan Rute Index Kita Gunakan Untuk Memanggil Semua Data Dalam Database MongoDB
router.get("/", housingController.Index);
module.exports = router;