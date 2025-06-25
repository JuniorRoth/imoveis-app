const router = require('express').Router();
const { 
  createProperty, 
  getAllProperties, 
  getPropertyById, 
  updatePropertyStatus 
} = require('../controllers/property.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { checkRole } = require('../middleware/role.middleware');

// Get all properties (public)
router.get('/', getAllProperties);

// Get single property (public)
router.get('/:id', getPropertyById);

// Create property (sellers only)
router.post('/', 
  authMiddleware, 
  checkRole('SELLER'), 
  createProperty
);

// Update property status (buyers only)
router.patch('/:id/buy', 
  authMiddleware, 
  checkRole('BUYER'), 
  updatePropertyStatus
);

module.exports = router;
