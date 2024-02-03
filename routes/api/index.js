const router = require('express').Router();
const userRoutes = require('./userRoutes');
const studentRoutes = require('./studentRoutes');
const thoughtRoutes = require('./thoughtRoutes')

router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/thought', thoughtRoutes)

module.exports = router;
